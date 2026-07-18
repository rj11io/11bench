"use client"

import { startTransition, useDeferredValue, useEffect, useState } from "react"

import {
  defaultState,
  derivePathStatus,
  getPathStatusLabel,
  getStepStatusLabel,
  isClosedStatus,
  matchesScope,
  mergePersistedPaths,
  ownerOptions,
  priorityRank,
  storageKey,
} from "./data"
import styles from "./page.module.css"
import type {
  ExposurePath,
  PersistedState,
  RemediationStep,
  StepStatus,
} from "./types"

export function Dashboard() {
  const [uiState, setUiState] = useState<PersistedState>(defaultState)
  const [paths, setPaths] = useState<ExposurePath[]>(() =>
    mergePersistedPaths(defaultState)
  )
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey)

    queueMicrotask(() => {
      if (!raw) {
        setReady(true)
        return
      }

      try {
        const parsed = JSON.parse(raw) as PersistedState
        const mergedUi = {
          ...defaultState,
          ...parsed,
        }

        setUiState(mergedUi)
        setPaths(mergePersistedPaths(mergedUi))
      } catch {
        setUiState(defaultState)
        setPaths(mergePersistedPaths(defaultState))
      } finally {
        setReady(true)
      }
    })
  }, [])

  useEffect(() => {
    if (!ready) {
      return
    }

    const persisted: PersistedState = {
      ...uiState,
      paths: paths.map((path) => ({
        id: path.id,
        note: path.note,
        steps: path.steps.map((step) => ({
          id: step.id,
          owner: step.owner,
          status: step.status,
        })),
      })),
    }

    window.localStorage.setItem(storageKey, JSON.stringify(persisted))
  }, [paths, ready, uiState])

  const deferredSearch = useDeferredValue(uiState.search)

  const orderedPaths = [...paths].sort((left, right) => {
    const leftStatus = derivePathStatus(left.steps)
    const rightStatus = derivePathStatus(right.steps)
    const leftOpen = isClosedStatus(leftStatus) ? 1 : 0
    const rightOpen = isClosedStatus(rightStatus) ? 1 : 0

    if (leftOpen !== rightOpen) {
      return leftOpen - rightOpen
    }

    const priorityDelta =
      priorityRank(left.priority) - priorityRank(right.priority)
    if (priorityDelta !== 0) {
      return priorityDelta
    }

    return right.exposureScore - left.exposureScore
  })

  const filteredPaths = orderedPaths.filter((path) => {
    const status = derivePathStatus(path.steps)
    const matchesEnvironment =
      uiState.environmentFilter === "all" ||
      path.environment === uiState.environmentFilter
    const matchesCrown = uiState.crownOnly ? path.crownJewel : true
    const matchesSearch =
      deferredSearch.trim().length === 0 ||
      [path.title, path.summary, path.targetAsset, path.businessService]
        .join(" ")
        .toLowerCase()
        .includes(deferredSearch.trim().toLowerCase())

    return (
      matchesEnvironment &&
      matchesCrown &&
      matchesSearch &&
      matchesScope(status, uiState.scopeFilter)
    )
  })

  const selectedPath =
    filteredPaths.find((path) => path.id === uiState.selectedPathId) ??
    filteredPaths[0]

  const allStatuses = orderedPaths.map((path) => derivePathStatus(path.steps))
  const openCount = allStatuses.filter(
    (status) => !isClosedStatus(status)
  ).length
  const crownCount = orderedPaths.filter(
    (path) => path.crownJewel && !isClosedStatus(derivePathStatus(path.steps))
  ).length
  const brokenCount = allStatuses.filter(
    (status) => status === "chain_prevented" || status === "resolved"
  ).length
  const dueSoonCount = orderedPaths.reduce((count, path) => {
    const activeSteps = path.steps.filter((step) => step.status !== "done")
    return (
      count +
      activeSteps.filter(
        (step) => step.due === "Jul 17" || step.due === "Jul 18"
      ).length
    )
  }, 0)

  const ownerLoad = ownerOptions
    .map((owner) => {
      const openSteps = orderedPaths.reduce((count, path) => {
        return (
          count +
          path.steps.filter(
            (step) =>
              step.owner === owner &&
              step.status !== "done" &&
              step.status !== "accepted"
          ).length
        )
      }, 0)

      return { owner, openSteps }
    })
    .filter((entry) => entry.openSteps > 0)
    .sort((left, right) => right.openSteps - left.openSteps)
    .slice(0, 5)

  const signalMix = [
    {
      label: "Identity",
      value: orderedPaths.reduce(
        (count, path) =>
          count +
          path.steps.filter((step) => step.domain === "Identity").length,
        0
      ),
    },
    {
      label: "Cloud",
      value: orderedPaths.reduce(
        (count, path) =>
          count + path.steps.filter((step) => step.domain === "Cloud").length,
        0
      ),
    },
    {
      label: "Data",
      value: orderedPaths.reduce(
        (count, path) =>
          count + path.steps.filter((step) => step.domain === "Data").length,
        0
      ),
    },
    {
      label: "Endpoint",
      value: orderedPaths.reduce(
        (count, path) =>
          count +
          path.steps.filter((step) => step.domain === "Endpoint").length,
        0
      ),
    },
  ]

  function updateUi<K extends keyof PersistedState>(
    key: K,
    value: PersistedState[K]
  ) {
    setUiState((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function updateStep(
    pathId: string,
    stepId: string,
    patch: Partial<RemediationStep>
  ) {
    startTransition(() => {
      setPaths((current) =>
        current.map((path) => {
          if (path.id !== pathId) {
            return path
          }

          return {
            ...path,
            steps: path.steps.map((step) =>
              step.id === stepId
                ? {
                    ...step,
                    ...patch,
                  }
                : step
            ),
          }
        })
      )
    })
  }

  function updateNote(pathId: string, value: string) {
    setPaths((current) =>
      current.map((path) =>
        path.id === pathId
          ? {
              ...path,
              note: value,
            }
          : path
      )
    )
  }

  function advanceSelectedPath(mode: "kickoff" | "break") {
    if (!selectedPath) {
      return
    }

    const candidates =
      mode === "kickoff"
        ? selectedPath.steps.filter((step) => step.status === "todo")
        : selectedPath.steps.filter(
            (step) =>
              step.status === "todo" ||
              step.status === "in_progress" ||
              step.status === "in_review"
          )

    const target = candidates[0]

    if (!target) {
      return
    }

    updateStep(selectedPath.id, target.id, {
      status: mode === "kickoff" ? "in_progress" : "done",
    })
  }

  function resetDemo() {
    setUiState(defaultState)
    setPaths(mergePersistedPaths(defaultState))
    window.localStorage.removeItem(storageKey)
  }

  const executiveSummary = selectedPath
    ? `${selectedPath.title} is ${getPathStatusLabel(
        derivePathStatus(selectedPath.steps)
      ).toLowerCase()}. The fastest reduction move is to fix ${
        selectedPath.steps.find((step) => step.status !== "done")?.owner ??
        "the assigned owner"
      }'s current choke point because it removes access to ${selectedPath.targetAsset} and affects ${
        selectedPath.pathCount
      } related path${selectedPath.pathCount === 1 ? "" : "s"}.`
    : ""

  return (
    <main className={styles.shell}>
      <div className={styles.backgroundGlow} />
      <div className={styles.frame}>
        <header className={styles.topbar}>
          <div>
            <p className={styles.kicker}>Breakline</p>
            <h1 className={styles.title}>
              Attack-path operations for lean hybrid security teams
            </h1>
            <p className={styles.subtitle}>
              Demo data only. Break the smallest number of choke points, prove
              why they matter, and keep ownership visible until risk is actually
              gone.
            </p>
          </div>
          <div className={styles.topbarAside}>
            <div className={styles.pill}>Demo org: Northstar Health</div>
            <button
              className={styles.ghostButton}
              onClick={resetDemo}
              type="button"
            >
              Reset demo
            </button>
          </div>
        </header>

        <section className={styles.overview}>
          <article className={styles.metricCard}>
            <span className={styles.metricLabel}>Open attack paths</span>
            <strong className={styles.metricValue}>{openCount}</strong>
            <span className={styles.metricMeta}>
              Noise reduced to accountable work
            </span>
          </article>
          <article className={styles.metricCard}>
            <span className={styles.metricLabel}>Crown-jewel paths</span>
            <strong className={styles.metricValue}>{crownCount}</strong>
            <span className={styles.metricMeta}>
              Identity or regulated-data targets
            </span>
          </article>
          <article className={styles.metricCard}>
            <span className={styles.metricLabel}>
              Broken chains this sprint
            </span>
            <strong className={styles.metricValue}>{brokenCount}</strong>
            <span className={styles.metricMeta}>
              Visible even before every fix closes
            </span>
          </article>
          <article className={styles.metricCard}>
            <span className={styles.metricLabel}>Near-term owner SLAs</span>
            <strong className={styles.metricValue}>{dueSoonCount}</strong>
            <span className={styles.metricMeta}>Steps due Jul 17-18</span>
          </article>
        </section>

        <section className={styles.filters}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Search paths</span>
            <input
              className={styles.input}
              onChange={(event) => updateUi("search", event.target.value)}
              placeholder="Search asset, service, or scenario"
              type="search"
              value={uiState.search}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Environment</span>
            <select
              className={styles.select}
              onChange={(event) =>
                updateUi(
                  "environmentFilter",
                  event.target.value as PersistedState["environmentFilter"]
                )
              }
              value={uiState.environmentFilter}
            >
              <option value="all">All</option>
              <option value="Hybrid">Hybrid</option>
              <option value="AWS">AWS</option>
              <option value="Azure">Azure</option>
            </select>
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Portfolio view</span>
            <select
              className={styles.select}
              onChange={(event) =>
                updateUi(
                  "scopeFilter",
                  event.target.value as PersistedState["scopeFilter"]
                )
              }
              value={uiState.scopeFilter}
            >
              <option value="open">Open only</option>
              <option value="worked">Worked paths</option>
              <option value="closed">Closed only</option>
              <option value="all">All paths</option>
            </select>
          </label>

          <label className={styles.checkbox}>
            <input
              checked={uiState.crownOnly}
              onChange={(event) => updateUi("crownOnly", event.target.checked)}
              type="checkbox"
            />
            <span>Only crown-jewel targets</span>
          </label>
        </section>

        <section className={styles.workspace}>
          <aside className={styles.queuePane}>
            <div className={styles.paneHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Priority queue</h2>
                <p className={styles.sectionCopy}>
                  Sorted by business impact, exploitability, and whether the
                  chain is already partly broken.
                </p>
              </div>
              <span className={styles.countBadge}>{filteredPaths.length}</span>
            </div>

            {filteredPaths.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>No paths match this view</h3>
                <p>
                  Try widening the portfolio scope or clearing search. Closed
                  work stays available for audit, but open work is the default
                  queue.
                </p>
                <button
                  className={styles.primaryButton}
                  onClick={() => {
                    setUiState((current) => ({
                      ...current,
                      crownOnly: false,
                      environmentFilter: "all",
                      scopeFilter: "all",
                      search: "",
                    }))
                  }}
                  type="button"
                >
                  Show all paths
                </button>
              </div>
            ) : (
              <div className={styles.queueList}>
                {filteredPaths.map((path) => {
                  const status = derivePathStatus(path.steps)
                  const active = path.id === selectedPath?.id

                  return (
                    <button
                      key={path.id}
                      className={
                        active ? styles.queueItemActive : styles.queueItem
                      }
                      onClick={() => updateUi("selectedPathId", path.id)}
                      type="button"
                    >
                      <div className={styles.queueHeading}>
                        <span
                          className={`${styles.priority} ${styles[path.priority]}`}
                        >
                          {path.priority}
                        </span>
                        <span
                          className={`${styles.statusBadge} ${styles[status]}`}
                        >
                          {getPathStatusLabel(status)}
                        </span>
                      </div>
                      <strong className={styles.queueTitle}>
                        {path.title}
                      </strong>
                      <p className={styles.queueSummary}>{path.summary}</p>
                      <div className={styles.queueMeta}>
                        <span>{path.environment}</span>
                        <span>{path.targetAsset}</span>
                      </div>
                      <div className={styles.queueBars}>
                        <div>
                          <span>Exposure</span>
                          <strong>{path.exposureScore}</strong>
                        </div>
                        <div>
                          <span>Validated</span>
                          <strong>{path.validationScore}</strong>
                        </div>
                        <div>
                          <span>Paths</span>
                          <strong>{path.pathCount}</strong>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </aside>

          <section className={styles.detailPane}>
            {!selectedPath ? (
              <div className={styles.detailEmpty}>
                <h2>Nothing selected</h2>
                <p>Adjust the filters to bring a path back into view.</p>
              </div>
            ) : (
              <>
                {selectedPath.priority === "critical" &&
                !isClosedStatus(derivePathStatus(selectedPath.steps)) ? (
                  <div className={styles.alertBanner}>
                    <div>
                      <p className={styles.alertEyebrow}>
                        High-attention state
                      </p>
                      <strong>Validated route to a crown jewel</strong>
                    </div>
                    <p>
                      The current path combines live reachability, stale
                      identity material, and a regulated-data target. Break the
                      identity choke point before the full patch cycle finishes.
                    </p>
                  </div>
                ) : null}

                <div className={styles.detailHero}>
                  <div>
                    <div className={styles.heroRow}>
                      <span
                        className={`${styles.priority} ${styles[selectedPath.priority]}`}
                      >
                        {selectedPath.priority}
                      </span>
                      <span
                        className={`${styles.statusBadge} ${
                          styles[derivePathStatus(selectedPath.steps)]
                        }`}
                      >
                        {getPathStatusLabel(
                          derivePathStatus(selectedPath.steps)
                        )}
                      </span>
                      <span className={styles.demoTag}>
                        Demo path {selectedPath.id}
                      </span>
                    </div>
                    <h2 className={styles.detailTitle}>{selectedPath.title}</h2>
                    <p className={styles.detailCopy}>
                      {selectedPath.narrative}
                    </p>
                  </div>

                  <div className={styles.heroActions}>
                    <button
                      className={styles.primaryButton}
                      onClick={() => advanceSelectedPath("break")}
                      type="button"
                    >
                      Break next choke point
                    </button>
                    <button
                      className={styles.secondaryButton}
                      onClick={() => advanceSelectedPath("kickoff")}
                      type="button"
                    >
                      Kick off next owner
                    </button>
                  </div>
                </div>

                <div className={styles.signalRow}>
                  {selectedPath.signals.map((signal) => (
                    <article key={signal.label} className={styles.signalCard}>
                      <span className={styles.signalLabel}>{signal.label}</span>
                      <strong
                        className={`${styles.signalValue} ${styles[signal.tone]}`}
                      >
                        {signal.value}
                      </strong>
                    </article>
                  ))}
                </div>

                <section className={styles.mapCard}>
                  <div className={styles.mapHeader}>
                    <div>
                      <h3 className={styles.sectionTitle}>Attack path view</h3>
                      <p className={styles.sectionCopy}>
                        The graph is intentionally compact: entry point, key
                        pivots, choke point, and target.
                      </p>
                    </div>
                    <div className={styles.mapStats}>
                      <div>
                        <span>Target</span>
                        <strong>{selectedPath.targetAsset}</strong>
                      </div>
                      <div>
                        <span>Blast radius</span>
                        <strong>{selectedPath.blastRadius}</strong>
                      </div>
                    </div>
                  </div>

                  <div className={styles.nodeTrack}>
                    {selectedPath.nodes.map((node, index) => (
                      <div className={styles.nodeWrap} key={node.id}>
                        <article
                          className={`${styles.node} ${styles[node.kind]} ${
                            node.chokePoint ? styles.nodeChoke : ""
                          }`}
                        >
                          <span className={styles.nodeLabel}>{node.label}</span>
                          <span className={styles.nodeDetail}>
                            {node.detail}
                          </span>
                        </article>
                        {index < selectedPath.nodes.length - 1 ? (
                          <div
                            className={styles.nodeConnector}
                            aria-hidden="true"
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </section>

                <div className={styles.detailGrid}>
                  <section className={styles.panel}>
                    <h3 className={styles.sectionTitle}>
                      Why this path wins attention
                    </h3>
                    <ul className={styles.bulletList}>
                      {selectedPath.evidence.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className={styles.executiveSummary}>
                      <span className={styles.fieldLabel}>
                        Executive summary
                      </span>
                      <p>{executiveSummary}</p>
                    </div>
                  </section>

                  <section className={styles.panel}>
                    <h3 className={styles.sectionTitle}>Operator brief</h3>
                    <p className={styles.sectionCopy}>
                      Persisted locally so the demo keeps team context between
                      refreshes.
                    </p>
                    <textarea
                      className={styles.textarea}
                      onChange={(event) =>
                        updateNote(selectedPath.id, event.target.value)
                      }
                      value={selectedPath.note}
                    />
                  </section>
                </div>

                <section className={styles.tableCard}>
                  <div className={styles.tableHeader}>
                    <div>
                      <h3 className={styles.sectionTitle}>Remediation plan</h3>
                      <p className={styles.sectionCopy}>
                        Status follows attack-path workflow semantics: open,
                        worked, chain prevented, closed.
                      </p>
                    </div>
                    <div className={styles.smallMeta}>
                      <span>Entry point: {selectedPath.entryPoint}</span>
                      <span>Updated: {selectedPath.lastUpdated}</span>
                    </div>
                  </div>

                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <caption className={styles.srOnly}>
                        Remediation steps for the selected attack path
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Action</th>
                          <th scope="col">Domain</th>
                          <th scope="col">Owner</th>
                          <th scope="col">Due</th>
                          <th scope="col">Risk cut</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPath.steps.map((step) => (
                          <tr key={step.id}>
                            <th scope="row">{step.title}</th>
                            <td>{step.domain}</td>
                            <td>
                              <select
                                className={styles.tableSelect}
                                onChange={(event) =>
                                  updateStep(selectedPath.id, step.id, {
                                    owner: event.target.value,
                                  })
                                }
                                value={step.owner}
                              >
                                {ownerOptions.map((owner) => (
                                  <option key={owner} value={owner}>
                                    {owner}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>{step.due}</td>
                            <td>{step.riskCut}</td>
                            <td>
                              <select
                                className={styles.tableSelect}
                                onChange={(event) =>
                                  updateStep(selectedPath.id, step.id, {
                                    status: event.target.value as StepStatus,
                                  })
                                }
                                value={step.status}
                              >
                                <option value="todo">
                                  {getStepStatusLabel("todo")}
                                </option>
                                <option value="in_progress">
                                  {getStepStatusLabel("in_progress")}
                                </option>
                                <option value="in_review">
                                  {getStepStatusLabel("in_review")}
                                </option>
                                <option value="done">
                                  {getStepStatusLabel("done")}
                                </option>
                                <option value="accepted">
                                  {getStepStatusLabel("accepted")}
                                </option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <div className={styles.bottomGrid}>
                  <section className={styles.panel}>
                    <h3 className={styles.sectionTitle}>Owner pressure</h3>
                    <p className={styles.sectionCopy}>
                      Workload concentration is part of prioritization. If the
                      queue piles up on one team, MTTR stalls even when the
                      findings are correct.
                    </p>
                    <div className={styles.barList}>
                      {ownerLoad.map((entry) => (
                        <div key={entry.owner} className={styles.barRow}>
                          <div className={styles.barLabel}>
                            <span>{entry.owner}</span>
                            <strong>{entry.openSteps}</strong>
                          </div>
                          <div className={styles.barTrack}>
                            <div
                              className={styles.barFill}
                              style={{
                                width: `${Math.max(18, entry.openSteps * 22)}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className={styles.panel}>
                    <h3 className={styles.sectionTitle}>Exposure mix</h3>
                    <p className={styles.sectionCopy}>
                      The portfolio leans identity-first, which supports the
                      product wedge rather than pretending every control domain
                      is equally urgent.
                    </p>
                    <div className={styles.mixGrid}>
                      {signalMix.map((item) => (
                        <article key={item.label} className={styles.mixCard}>
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                        </article>
                      ))}
                    </div>
                  </section>
                </div>

                <section className={styles.timelineCard}>
                  <div className={styles.tableHeader}>
                    <div>
                      <h3 className={styles.sectionTitle}>
                        Activity and trust trail
                      </h3>
                      <p className={styles.sectionCopy}>
                        Each path keeps human-readable rationale so teams can
                        trust why it is here and what changed.
                      </p>
                    </div>
                  </div>

                  <ol className={styles.timeline}>
                    {selectedPath.baseEvents.map((event) => (
                      <li className={styles.timelineItem} key={event.id}>
                        <span className={styles.timelineTime}>{event.at}</span>
                        <div>
                          <strong>{event.actor}</strong>
                          <p>{event.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              </>
            )}
          </section>
        </section>
      </div>
    </main>
  )
}
