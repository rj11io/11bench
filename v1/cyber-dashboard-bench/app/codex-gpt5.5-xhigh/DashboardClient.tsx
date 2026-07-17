"use client"

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Database,
  Filter,
  KeyRound,
  Network,
  RefreshCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  UserRoundCheck,
} from "lucide-react"
import { useMemo, useState, useSyncExternalStore } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  demoExposures,
  ownerBaselines,
  riskTrend,
  sourceFreshness,
  type ActionTier,
  type ExposurePackage,
  type SignalTone,
  type WorkflowStatus,
} from "./data"
import styles from "./dashboard.module.css"

const STORAGE_KEY = "breachpath-command-demo-v1"

type FilterMode = "All" | "Immediate" | "Assigned" | "Fixed"

type StoredExposureState = {
  status?: WorkflowStatus
  owner?: string
  note?: string
  ticketCreated?: boolean
  acceptedUntil?: string
  lastAction?: string
}

type StoredState = Record<string, StoredExposureState>

type RuntimeExposure = ExposurePackage & {
  runtimeStatus: WorkflowStatus
  runtimeOwner: string
  runtimeNote: string
  ticketCreated: boolean
  acceptedUntil?: string
  lastAction?: string
}

const closedStatuses: WorkflowStatus[] = ["Fixed", "Accepted"]

const filterOptions: FilterMode[] = ["All", "Immediate", "Assigned", "Fixed"]

const storageListeners = new Set<() => void>()

function getStatusClass(status: WorkflowStatus) {
  if (status === "Fixed") return styles.statusFixed
  if (status === "Accepted") return styles.statusAccepted
  if (status === "In progress") return styles.statusProgress
  if (status === "Assigned") return styles.statusAssigned
  return styles.statusNew
}

function getTierClass(tier: ActionTier) {
  if (tier === "Immediate") return styles.tierImmediate
  if (tier === "Attend") return styles.tierAttend
  return styles.tierScheduled
}

function getToneClass(tone: SignalTone) {
  if (tone === "danger") return styles.toneDanger
  if (tone === "warning") return styles.toneWarning
  if (tone === "good") return styles.toneGood
  if (tone === "info") return styles.toneInfo
  return styles.toneNeutral
}

function formatDue(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T12:00:00Z`))
}

function isClosed(status: WorkflowStatus) {
  return closedStatuses.includes(status)
}

function parseStoredState(raw: string | null): StoredState {
  if (!raw) return {}

  try {
    return JSON.parse(raw) as StoredState
  } catch {
    return {}
  }
}

function readStoredSnapshot() {
  if (typeof window === "undefined") return "{}"
  return window.localStorage.getItem(STORAGE_KEY) ?? "{}"
}

function readServerStoredSnapshot() {
  return "{}"
}

function subscribeStoredState(listener: () => void) {
  storageListeners.add(listener)

  if (typeof window === "undefined") {
    return () => {
      storageListeners.delete(listener)
    }
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener()
  }

  window.addEventListener("storage", handleStorage)

  return () => {
    storageListeners.delete(listener)
    window.removeEventListener("storage", handleStorage)
  }
}

function writeStoredState(next: StoredState) {
  if (typeof window === "undefined") return

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  storageListeners.forEach((listener) => listener())
}

function updateStoredState(updater: (current: StoredState) => StoredState) {
  writeStoredState(updater(parseStoredState(readStoredSnapshot())))
}

export default function DashboardClient() {
  const [selectedId, setSelectedId] = useState(demoExposures[0]?.id ?? "")
  const [filter, setFilter] = useState<FilterMode>("All")
  const [query, setQuery] = useState("")
  const [announcement, setAnnouncement] = useState("")
  const storedSnapshot = useSyncExternalStore(
    subscribeStoredState,
    readStoredSnapshot,
    readServerStoredSnapshot
  )
  const stored = useMemo(
    () => parseStoredState(storedSnapshot),
    [storedSnapshot]
  )

  const exposures = useMemo<RuntimeExposure[]>(
    () =>
      demoExposures.map((exposure) => {
        const runtime = stored[exposure.id] ?? {}
        return {
          ...exposure,
          runtimeStatus: runtime.status ?? exposure.defaultStatus,
          runtimeOwner: runtime.owner ?? exposure.defaultOwner,
          runtimeNote: runtime.note ?? "",
          ticketCreated: Boolean(runtime.ticketCreated),
          acceptedUntil: runtime.acceptedUntil,
          lastAction: runtime.lastAction,
        }
      }),
    [stored]
  )

  const selected =
    exposures.find((exposure) => exposure.id === selectedId) ?? exposures[0]

  const filteredExposures = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return exposures.filter((exposure) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Immediate" && exposure.actionTier === "Immediate") ||
        (filter === "Assigned" &&
          ["Assigned", "In progress"].includes(exposure.runtimeStatus)) ||
        (filter === "Fixed" && exposure.runtimeStatus === "Fixed")

      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          exposure.id,
          exposure.title,
          exposure.businessService,
          exposure.runtimeOwner,
          exposure.environment,
          exposure.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesFilter && matchesQuery
    })
  }, [exposures, filter, query])

  const openRisk = exposures.reduce(
    (total, exposure) =>
      isClosed(exposure.runtimeStatus) ? total : total + exposure.riskDelta,
    0
  )
  const fixedRisk = exposures.reduce(
    (total, exposure) =>
      exposure.runtimeStatus === "Fixed" ? total + exposure.riskDelta : total,
    0
  )
  const immediateOpen = exposures.filter(
    (exposure) =>
      exposure.actionTier === "Immediate" && !isClosed(exposure.runtimeStatus)
  ).length
  const dueThisWeek = exposures
    .filter((exposure) => !isClosed(exposure.runtimeStatus))
    .reduce((total, exposure) => total + exposure.riskDelta, 0)
  const fixedCount = exposures.filter(
    (exposure) => exposure.runtimeStatus === "Fixed"
  ).length
  const mttrForecast = Math.max(3.2, 7.4 - fixedCount * 0.9).toFixed(1)

  const riskSeries = useMemo(
    () =>
      riskTrend.map((point, index) =>
        index === riskTrend.length - 1
          ? {
              ...point,
              actual: Math.max(0, point.actual - fixedRisk),
              planned: Math.max(0, point.planned - Math.round(fixedRisk * 0.6)),
            }
          : point
      ),
    [fixedRisk]
  )

  const ownerLoad = useMemo(
    () =>
      ownerBaselines.map((owner) => {
        const activeRisk = exposures
          .filter(
            (exposure) =>
              exposure.runtimeOwner === owner.team &&
              !isClosed(exposure.runtimeStatus)
          )
          .reduce((total, exposure) => total + exposure.riskDelta, 0)

        return {
          ...owner,
          openRisk: activeRisk,
          load: Math.min(100, owner.load + Math.round(activeRisk / 5)),
        }
      }),
    [exposures]
  )

  function updateSelected(update: StoredExposureState, verb: string) {
    if (!selected) return

    const timestamp = new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date())

    updateStoredState((previous) => ({
      ...previous,
      [selected.id]: {
        ...previous[selected.id],
        ...update,
        lastAction: `${verb} by demo analyst at ${timestamp}`,
      },
    }))

    setAnnouncement(`${selected.id}: ${verb}.`)
  }

  function resetDemo() {
    writeStoredState({})
    setQuery("")
    setFilter("All")
    setSelectedId(demoExposures[0]?.id ?? "")
    setAnnouncement("Demo state reset.")
  }

  if (!selected) {
    return null
  }

  return (
    <main className={styles.shell}>
      <div className={styles.statusLive} aria-live="polite">
        {announcement}
      </div>

      <header className={styles.appHeader}>
        <div className={styles.brandBlock}>
          <div className={styles.brandMark} aria-hidden="true">
            <Network size={20} />
          </div>
          <div>
            <p className={styles.eyebrow}>Exposure remediation command</p>
            <h1>BreachPath Command</h1>
          </div>
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.demoBadge}>
            <Sparkles size={14} aria-hidden="true" />
            Seeded demo data
          </span>
          <span className={styles.workspaceBadge}>Acme Cloud Workspace</span>
          <button className={styles.ghostButton} type="button" onClick={resetDemo}>
            <RefreshCcw size={15} aria-hidden="true" />
            Reset demo
          </button>
        </div>
      </header>

      <section className={styles.notice} aria-label="Demo data notice">
        <ShieldAlert size={17} aria-hidden="true" />
        All findings, integrations, users, paths, and tickets shown here are
        synthetic demo data. No live security control or external system is
        connected.
      </section>

      <section className={styles.metricGrid} aria-label="Exposure summary">
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>Open exposure debt</span>
          <strong>{openRisk}</strong>
          <span className={styles.metricHint}>{fixedRisk} points reduced in demo</span>
        </article>
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>Immediate packages</span>
          <strong>{immediateOpen}</strong>
          <span className={styles.metricHint}>KEV, open path, or Tier 0 reach</span>
        </article>
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>Risk due this week</span>
          <strong>{dueThisWeek}</strong>
          <span className={styles.metricHint}>Unclosed risk delta before SLA</span>
        </article>
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>MTTR forecast</span>
          <strong>{mttrForecast}d</strong>
          <span className={styles.metricHint}>Modeled from current queue state</span>
        </article>
      </section>

      <section className={styles.workspace} aria-label="Remediation workbench">
        <aside className={styles.panel} aria-label="Ranked fix queue">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.eyebrow}>Ranked fix queue</p>
              <h2>Collapse these paths first</h2>
            </div>
            <Filter size={18} aria-hidden="true" />
          </div>

          <div className={styles.toolbar}>
            <label className={styles.searchLabel}>
              <span>Search packages</span>
              <span className={styles.searchControl}>
                <Search size={15} aria-hidden="true" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="CVE, service, owner"
                />
              </span>
            </label>
            <div className={styles.segmented} aria-label="Queue filters">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={
                    filter === option
                      ? `${styles.segmentButton} ${styles.segmentButtonActive}`
                      : styles.segmentButton
                  }
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {filteredExposures.length === 0 ? (
            <div className={styles.emptyState}>
              <ClipboardList size={28} aria-hidden="true" />
              <h3>No matching fix packages</h3>
              <p>
                Change the search or filter. Production would also show whether
                this is due to missing connector data.
              </p>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => {
                  setQuery("")
                  setFilter("All")
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className={styles.queueList}>
              {filteredExposures.map((exposure) => (
                <button
                  key={exposure.id}
                  type="button"
                  className={
                    exposure.id === selected.id
                      ? `${styles.queueItem} ${styles.queueItemActive}`
                      : styles.queueItem
                  }
                  onClick={() => setSelectedId(exposure.id)}
                >
                  <span className={styles.queueTopLine}>
                    <span className={styles.rank}>#{exposure.rank}</span>
                    <span
                      className={`${styles.tierPill} ${getTierClass(
                        exposure.actionTier
                      )}`}
                    >
                      {exposure.actionTier}
                    </span>
                    <span
                      className={`${styles.statusPill} ${getStatusClass(
                        exposure.runtimeStatus
                      )}`}
                    >
                      {exposure.runtimeStatus}
                    </span>
                  </span>
                  <span className={styles.queueTitle}>{exposure.title}</span>
                  <span className={styles.queueMeta}>
                    <span>{exposure.businessService}</span>
                    <span>{exposure.runtimeOwner}</span>
                    <span>Due {formatDue(exposure.dueDate)}</span>
                  </span>
                  <span className={styles.queueFooter}>
                    <span>Score {exposure.score}</span>
                    <span>-{exposure.riskDelta} risk</span>
                    <span>{exposure.signals.paths} paths</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </aside>

        <section className={styles.panel} aria-labelledby="exposure-title">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.eyebrow}>{selected.id}</p>
              <h2 id="exposure-title">{selected.title}</h2>
            </div>
            <span className={`${styles.scoreDial} ${getTierClass(selected.actionTier)}`}>
              {selected.score}
            </span>
          </div>

          <div className={styles.detailSummary}>
            <p>{selected.summary}</p>
            <div className={styles.detailStats}>
              <span>
                <Database size={15} aria-hidden="true" />
                {selected.blastRadius.records}
              </span>
              <span>
                <KeyRound size={15} aria-hidden="true" />
                {selected.blastRadius.identities} identities
              </span>
              <span>
                <Clock3 size={15} aria-hidden="true" />
                Last seen {selected.lastSeen}
              </span>
            </div>
          </div>

          <div className={styles.signalGrid} aria-label="Ranking evidence">
            {selected.evidence.map((signal) => (
              <span
                className={`${styles.signalChip} ${getToneClass(signal.tone)}`}
                key={`${selected.id}-${signal.label}`}
              >
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </span>
            ))}
          </div>

          <section className={styles.pathSection} aria-label="Attack path">
            <div className={styles.subHeader}>
              <h3>Attack path to impact</h3>
              <span>{selected.signals.paths} paths, {selected.confidence}% confidence</span>
            </div>
            <ol className={styles.pathGraph}>
              {selected.path.map((node, index) => (
                <li className={styles.pathStep} key={`${selected.id}-${node.label}`}>
                  <div className={`${styles.pathNode} ${styles[`node-${node.kind}`]}`}>
                    <span>{node.label}</span>
                    <small>{node.meta}</small>
                  </div>
                  {index < selected.path.length - 1 ? (
                    <div className={styles.pathConnector} aria-hidden="true">
                      <span>{selected.pathEdges[index]}</span>
                      <ArrowRight size={18} />
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.reasonGrid} aria-label="Decision explanation">
            <div>
              <h3>Why ranked now</h3>
              <ul>
                <li>
                  {selected.signals.kev
                    ? "Known exploited signal is present."
                    : "No KEV match, but contextual exposure still drives risk."}
                </li>
                <li>
                  {selected.signals.external
                    ? "Entry point is reachable from an untrusted network."
                    : "External access is blocked; path remains internal or partner-scoped."}
                </li>
                <li>{selected.signals.identityReach}</li>
                <li>
                  Fixing this package removes {selected.riskDelta} risk points and
                  cuts {selected.signals.paths} modeled paths.
                </li>
              </ul>
            </div>
            <div>
              <h3>ATT&CK language</h3>
              <ul>
                {selected.attackTechniques.map((technique) => (
                  <li key={technique}>{technique}</li>
                ))}
              </ul>
            </div>
          </section>
        </section>

        <aside className={styles.sideStack} aria-label="Remediation and metrics">
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.eyebrow}>Remediation workflow</p>
                <h2>Owner-ready fix</h2>
              </div>
              <UserRoundCheck size={18} aria-hidden="true" />
            </div>

            <label className={styles.fieldLabel}>
              Owner
              <select
                value={selected.runtimeOwner}
                onChange={(event) =>
                  updateSelected({ owner: event.target.value }, "Owner changed")
                }
              >
                {selected.ownerOptions.map((owner) => (
                  <option key={owner} value={owner}>
                    {owner}
                  </option>
                ))}
              </select>
            </label>

            <div className={styles.fixBox}>
              <h3>Recommended fix</h3>
              <p>{selected.recommendedFix}</p>
              <h3>Validation</h3>
              <p>{selected.validationPlan}</p>
            </div>

            <div className={styles.actionGrid}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() =>
                  updateSelected(
                    { status: "Assigned", ticketCreated: true },
                    "Fix brief created"
                  )
                }
              >
                <TicketCheck size={15} aria-hidden="true" />
                Create fix brief
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() =>
                  updateSelected({ status: "In progress" }, "Work started")
                }
              >
                <ClipboardCheck size={15} aria-hidden="true" />
                Start work
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => updateSelected({ status: "Fixed" }, "Marked fixed")}
              >
                <CheckCircle2 size={15} aria-hidden="true" />
                Mark fixed
              </button>
              <button
                type="button"
                className={styles.warningButton}
                onClick={() =>
                  updateSelected(
                    {
                      status: "Accepted",
                      acceptedUntil: "2026-07-30",
                      ticketCreated: true,
                    },
                    "Risk accepted for 14 days"
                  )
                }
              >
                <AlertTriangle size={15} aria-hidden="true" />
                Accept 14d
              </button>
            </div>

            <label className={styles.fieldLabel}>
              Decision note
              <textarea
                value={selected.runtimeNote}
                onChange={(event) =>
                  updateSelected({ note: event.target.value }, "Note updated")
                }
                placeholder="Record compensating control, rollout concern, or owner response."
                rows={4}
              />
            </label>

            <div className={styles.receipt}>
              <h3>Decision receipt</h3>
              <p>
                Status: <strong>{selected.runtimeStatus}</strong>
                {selected.ticketCreated ? " with fix brief prepared" : " without ticket yet"}.
              </p>
              {selected.acceptedUntil ? (
                <p>Exception expiry: {formatDue(selected.acceptedUntil)}</p>
              ) : null}
              <p>
                Control if delayed: <span>{selected.compensatingControl}</span>
              </p>
              <p>{selected.lastAction ?? "No local workflow action recorded yet."}</p>
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.eyebrow}>Risk burndown</p>
                <h2>Fixes should change the curve</h2>
              </div>
              <ShieldCheck size={18} aria-hidden="true" />
            </div>
            <p className={styles.chartSummary}>
              Actual open risk is compared with planned risk after the top fix
              packages close.
            </p>
            <div className={styles.chartBox}>
              <ResponsiveContainer width="100%" height={190}>
                <AreaChart data={riskSeries} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke="var(--bp-line)" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} />
                  <YAxis tickLine={false} axisLine={false} fontSize={11} width={30} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--bp-panel)",
                      border: "1px solid var(--bp-line)",
                      borderRadius: 8,
                      color: "var(--bp-ink)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    name="Actual risk"
                    stroke="var(--bp-danger)"
                    fill="var(--bp-danger-soft)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="planned"
                    name="Planned risk"
                    stroke="var(--bp-info)"
                    fill="var(--bp-info-soft)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.eyebrow}>Owner load</p>
                <h2>Doable remediation plan</h2>
              </div>
            </div>
            <div className={styles.chartBox}>
              <ResponsiveContainer width="100%" height={170}>
                <BarChart data={ownerLoad} layout="vertical" margin={{ left: 2, right: 12, top: 2, bottom: 2 }}>
                  <CartesianGrid stroke="var(--bp-line)" horizontal={false} />
                  <XAxis type="number" hide domain={[0, 120]} />
                  <YAxis dataKey="team" type="category" width={112} fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--bp-panel)",
                      border: "1px solid var(--bp-line)",
                      borderRadius: 8,
                      color: "var(--bp-ink)",
                    }}
                  />
                  <Bar dataKey="openRisk" name="Open risk" fill="var(--bp-warning)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.eyebrow}>Evidence freshness</p>
                <h2>Trust inputs</h2>
              </div>
            </div>
            <ul className={styles.freshnessList}>
              {sourceFreshness.map((source) => (
                <li key={source.source}>
                  <span>{source.source}</span>
                  <strong>{source.status}</strong>
                  <small>{source.age}</small>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </section>
    </main>
  )
}
