"use client"

import {
  AlertTriangle,
  ArrowDown,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  Filter,
  Gauge,
  GitBranch,
  Search,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import {
  type Exposure,
  type ExposureStatus,
  type Owner,
  exposures,
  integrations,
  owners,
  riskTrend,
} from "./data"
import styles from "./dashboard.module.css"

type DraftState = Record<string, { status: ExposureStatus; owner: Owner; note: string }>
type ViewMode = "urgent" | "all" | "owned"

const storageKey = "patchline-demo-state-v1"

const statusLabels: Record<ExposureStatus, string> = {
  new: "New",
  triaged: "Triaged",
  assigned: "Assigned",
  accepted: "Risk accepted",
  mitigated: "Mitigated",
}

function getInitialState(): DraftState {
  return Object.fromEntries(
    exposures.map((exposure) => [
      exposure.id,
      {
        status: exposure.status,
        owner: exposure.owner,
        note: "",
      },
    ])
  )
}

function riskBand(risk: number) {
  if (risk > 85) return "riskCritical"
  if (risk > 70) return "riskHigh"
  return "riskElevated"
}

function nextStatus(status: ExposureStatus): ExposureStatus {
  if (status === "new") return "triaged"
  if (status === "triaged") return "assigned"
  if (status === "assigned") return "mitigated"
  return status
}

export function ExposureDashboard() {
  const [draft, setDraft] = useState<DraftState>(() => {
    if (typeof window === "undefined") return getInitialState()

    const saved = window.localStorage.getItem(storageKey)
    if (!saved) return getInitialState()

    try {
      return { ...getInitialState(), ...JSON.parse(saved) }
    } catch {
      return getInitialState()
    }
  })
  const [selectedId, setSelectedId] = useState(exposures[0].id)
  const [view, setView] = useState<ViewMode>("urgent")
  const [query, setQuery] = useState("")
  const [showAccepted, setShowAccepted] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, JSON.stringify(draft))
    }
  }, [draft])

  const merged = useMemo(
    () =>
      exposures.map((exposure) => ({
        ...exposure,
        ...draft[exposure.id],
      })),
    [draft]
  )

  const selected = merged.find((exposure) => exposure.id === selectedId) ?? merged[0]

  const filtered = merged
    .filter((exposure) => showAccepted || exposure.status !== "accepted")
    .filter((exposure) => (view === "urgent" ? exposure.risk >= 75 : true))
    .filter((exposure) => (view === "owned" ? exposure.owner !== "Unassigned" : true))
    .filter((exposure) => {
      const haystack = `${exposure.id} ${exposure.title} ${exposure.asset} ${exposure.owner}`.toLowerCase()
      return haystack.includes(query.toLowerCase())
    })
    .sort((a, b) => b.risk - a.risk)

  const criticalOpen = merged.filter(
    (exposure) => exposure.risk > 85 && exposure.status !== "mitigated"
  ).length
  const assigned = merged.filter((exposure) => exposure.status === "assigned").length
  const mitigated = merged.filter((exposure) => exposure.status === "mitigated").length
  const unowned = merged.filter((exposure) => exposure.owner === "Unassigned").length

  function patchExposure(
    id: string,
    changes: Partial<{ status: ExposureStatus; owner: Owner; note: string }>
  ) {
    setDraft((current) => ({
      ...current,
      [id]: {
        ...current[id],
        ...changes,
      },
    }))
  }

  function applySearchFromInput() {
    const input = document.getElementById("exposure-search")
    if (input instanceof HTMLInputElement) {
      setQuery(input.value)
    }
  }

  function mobilize(exposure: Exposure & DraftState[string]) {
    patchExposure(exposure.id, {
      status: exposure.owner === "Unassigned" ? "triaged" : "assigned",
      note:
        exposure.note ||
        `Demo handoff prepared for ${exposure.owner}. Evidence, recommended fix, and validation criteria attached to ${exposure.ticket}.`,
    })
  }

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar} aria-label="Product navigation">
        <div className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">
            <ShieldCheck size={20} />
          </span>
          <div>
            <strong>Patchline</strong>
            <span>Exposure Command</span>
          </div>
        </div>
        <nav className={styles.nav}>
          <a className={styles.activeNav} href="#exposures">
            <Gauge size={16} /> Exposure queue
          </a>
          <a href="#mobilize">
            <UserRoundCheck size={16} /> Mobilize
          </a>
          <a href="#evidence">
            <GitBranch size={16} /> Evidence graph
          </a>
          <a href="#metrics">
            <ClipboardCheck size={16} /> Program metrics
          </a>
        </nav>
        <section className={styles.demoBox} aria-label="Demo data notice">
          <Sparkles size={16} />
          <p>
            Demo data only. Scores, tickets, findings, and integrations are
            seeded examples, not live security controls.
          </p>
        </section>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Continuous threat exposure management</p>
            <h1>Prioritize the exposures attackers can actually use.</h1>
            <p>
              Explainable risk scoring turns scanner noise into owner-ready
              remediation work with business context and validation criteria.
            </p>
          </div>
          <div className={styles.headerActions}>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() => {
                setDraft(getInitialState())
                setSelectedId(exposures[0].id)
              }}
            >
              Reset demo
            </button>
            <button className={styles.primaryButton} type="button" onClick={() => mobilize(selected)}>
              <UserRoundCheck size={16} /> Mobilize selected
            </button>
          </div>
        </header>

        <section className={styles.kpis} aria-label="Exposure summary">
          <Metric label="Critical open" value={criticalOpen.toString()} intent="critical" />
          <Metric label="Owner handoffs" value={assigned.toString()} intent="good" />
          <Metric label="Mitigated" value={mitigated.toString()} intent="neutral" />
          <Metric label="Unowned" value={unowned.toString()} intent="warning" />
        </section>

        <div className={styles.contentGrid}>
          <section className={styles.queuePanel} id="exposures">
            <div className={styles.panelHeader}>
              <div>
                <h2>Prioritized queue</h2>
                <p>Sorted by exploitability, business impact, exposure, and confidence.</p>
              </div>
              <Filter size={18} aria-hidden="true" />
            </div>

            <div className={styles.controls}>
              <div className={styles.segmented} aria-label="Queue filter">
                {(["urgent", "all", "owned"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={view === item ? styles.segmentActive : ""}
                    onClick={() => setView(item)}
                  >
                    {item === "urgent" ? "Urgent" : item === "owned" ? "Owned" : "All"}
                  </button>
                ))}
              </div>
              <label className={styles.searchLabel}>
                <span>Search exposures</span>
                <input
                  id="exposure-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onInput={(event) => setQuery(event.currentTarget.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") applySearchFromInput()
                  }}
                  placeholder="CVE, asset, owner"
                />
              </label>
              <button
                className={styles.filterButton}
                type="button"
                onClick={applySearchFromInput}
              >
                <Search size={15} /> Apply filter
              </button>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={showAccepted}
                  onChange={(event) => setShowAccepted(event.target.checked)}
                />
                Include accepted risk
              </label>
            </div>

            <div className={styles.queueList}>
              {filtered.length === 0 ? (
                <div className={styles.emptyState}>
                  <CheckCircle2 size={22} />
                  <strong>No matching exposures</strong>
                  <span>Change filters or include accepted risk to widen the queue.</span>
                </div>
              ) : (
                filtered.map((exposure) => (
                  <button
                    key={exposure.id}
                    type="button"
                    className={`${styles.exposureRow} ${
                      selected.id === exposure.id ? styles.selectedRow : ""
                    }`}
                    onClick={() => setSelectedId(exposure.id)}
                  >
                    <span className={`${styles.riskPill} ${styles[riskBand(exposure.risk)]}`}>
                      {exposure.risk}
                    </span>
                    <span className={styles.rowMain}>
                      <strong>{exposure.title}</strong>
                      <span>
                        {exposure.asset} · {exposure.owner}
                      </span>
                    </span>
                    <span className={styles.statusBadge}>{statusLabels[exposure.status]}</span>
                  </button>
                ))
              )}
            </div>
          </section>

          <section className={styles.detailPanel} id="evidence">
            <div className={styles.detailTop}>
              <div>
                <span className={styles.recordId}>{selected.id}</span>
                <h2>{selected.title}</h2>
                <p>
                  {selected.service} · last observed {selected.lastSeen} · due {selected.due}
                </p>
              </div>
              <span className={`${styles.bigRisk} ${styles[riskBand(selected.risk)]}`}>
                {selected.risk}
              </span>
            </div>

            <div className={styles.rationaleGrid}>
              <Driver label="EPSS" value={`${Math.round(selected.epss * 100)}%`} active={selected.epss > 0.7} />
              <Driver label="CVSS" value={selected.cvss.toFixed(1)} active={selected.cvss >= 9} />
              <Driver label="KEV" value={selected.kev ? "Yes" : "No"} active={selected.kev} />
              <Driver
                label="Data"
                value={selected.sensitiveData ? "Sensitive" : "Low"}
                active={selected.sensitiveData}
              />
            </div>

            <section className={styles.attackPath} aria-label="Attack path">
              {selected.attackPath.map((step, index) => (
                <div key={step} className={styles.pathStep}>
                  <span>{step}</span>
                  {index < selected.attackPath.length - 1 ? <ArrowDown size={15} /> : null}
                </div>
              ))}
            </section>

            <div className={styles.twoColumn}>
              <section>
                <h3>Why it is ranked here</h3>
                <ul className={styles.evidenceList}>
                  {selected.evidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>Recommended action</h3>
                <p className={styles.recommendation}>{selected.recommendation}</p>
                <div className={styles.cveWrap}>
                  {selected.cves.length > 0 ? (
                    selected.cves.map((cve) => <span key={cve}>{cve}</span>)
                  ) : (
                    <span>No CVE: identity/configuration exposure</span>
                  )}
                </div>
              </section>
            </div>
          </section>

          <section className={styles.actionPanel} id="mobilize">
            <div className={styles.panelHeader}>
              <div>
                <h2>Mobilization</h2>
                <p>Turn risk into accountable work.</p>
              </div>
              <Clock3 size={18} />
            </div>

            <label className={styles.field}>
              <span>Owner</span>
              <select
                value={selected.owner}
                onChange={(event) =>
                  patchExposure(selected.id, { owner: event.target.value as Owner })
                }
              >
                {owners.map((owner) => (
                  <option key={owner}>{owner}</option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span>Status</span>
              <select
                value={selected.status}
                onChange={(event) =>
                  patchExposure(selected.id, {
                    status: event.target.value as ExposureStatus,
                  })
                }
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span>Decision note</span>
              <textarea
                value={selected.note}
                rows={5}
                placeholder="Add remediation owner context, exception rationale, or validation note."
                onChange={(event) => patchExposure(selected.id, { note: event.target.value })}
                onInput={(event) =>
                  patchExposure(selected.id, { note: event.currentTarget.value })
                }
              />
            </label>

            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => mobilize(selected)}
              >
                <ExternalLink size={16} /> Prepare handoff
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => patchExposure(selected.id, { status: nextStatus(selected.status) })}
              >
                Advance state
              </button>
            </div>

            <div className={styles.ticketPreview}>
              <strong>{selected.ticket}</strong>
              <span>
                {selected.owner === "Unassigned"
                  ? "Needs owner mapping before ticket export"
                  : `Ready for ${selected.owner} with evidence attached`}
              </span>
            </div>
          </section>

          <section className={styles.metricsPanel} id="metrics">
            <div className={styles.panelHeader}>
              <div>
                <h2>Program signal</h2>
                <p>High-attention exposure trend.</p>
              </div>
              <AlertTriangle size={18} />
            </div>
            <div className={styles.barChart} aria-label="Seven day critical exposure trend">
              {riskTrend.map((point) => (
                <div key={point.day} className={styles.barColumn}>
                  <span
                    className={styles.barCritical}
                    style={{ height: `${point.critical * 4}px` }}
                    title={`${point.critical} critical exposures`}
                  />
                  <span
                    className={styles.barAccepted}
                    style={{ height: `${point.accepted * 4}px` }}
                    title={`${point.accepted} accepted risks`}
                  />
                  <small>{point.day}</small>
                </div>
              ))}
            </div>
            <div className={styles.integrations}>
              {integrations.map((integration) => (
                <div key={integration.name}>
                  <strong>{integration.name}</strong>
                  <span>
                    {integration.state} · refreshed {integration.freshness} ago
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

function Metric({
  label,
  value,
  intent,
}: {
  label: string
  value: string
  intent: "critical" | "good" | "neutral" | "warning"
}) {
  return (
    <article className={`${styles.metric} ${styles[intent]}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

function Driver({
  label,
  value,
  active,
}: {
  label: string
  value: string
  active: boolean
}) {
  return (
    <div className={`${styles.driver} ${active ? styles.driverActive : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
