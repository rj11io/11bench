"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Database,
  Filter,
  GitBranch,
  KeyRound,
  Network,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  UserRoundCheck,
} from "lucide-react"

import { exposures, riskTrend, rootCauses, type Exposure, type ExposureStatus } from "./data"
import styles from "./page.module.css"

type FilterKey = "all" | "act" | "unassigned" | "exceptions" | "verified"
type PersistedState = Record<string, ExposureStatus>

const storageKey = "resolvepoint-demo-status-v1"

const filterLabels: Record<FilterKey, string> = {
  all: "All",
  act: "Act now",
  unassigned: "Unassigned",
  exceptions: "Exceptions",
  verified: "Verified",
}

function statusLabel(status: ExposureStatus) {
  if (status === "in-progress") return "In progress"
  if (status === "exception") return "Exception"
  if (status === "verified") return "Verified"
  return "New"
}

function statusClass(status: ExposureStatus) {
  if (status === "verified") return styles.statusVerified
  if (status === "exception") return styles.statusException
  if (status === "in-progress") return styles.statusProgress
  return styles.statusNew
}

function bucketClass(bucket: string) {
  if (bucket === "Act now") return styles.bucketAct
  if (bucket === "Verified") return styles.bucketVerified
  if (bucket === "Exception review") return styles.bucketException
  if (bucket === "Investigate") return styles.bucketInvestigate
  return styles.bucketSchedule
}

function applyStatus(overrides: PersistedState): Exposure[] {
  return exposures.map((exposure) => {
    const status = overrides[exposure.id] ?? exposure.status
    return {
      ...exposure,
      status,
      actionBucket:
        status === "verified"
          ? "Verified"
          : status === "exception"
            ? "Exception review"
            : exposure.actionBucket,
    }
  })
}

export default function Dashboard() {
  const [filter, setFilter] = useState<FilterKey>("all")
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(exposures[0].id)
  const [statusOverrides, setStatusOverrides] = useState<PersistedState>(() => {
    if (typeof window === "undefined") return {}
    try {
      const stored = window.localStorage.getItem(storageKey)
      return stored ? (JSON.parse(stored) as PersistedState) : {}
    } catch {
      return {}
    }
  })

  const data = useMemo(() => applyStatus(statusOverrides), [statusOverrides])

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return data
      .filter((item) => {
        if (filter === "act") return item.actionBucket === "Act now"
        if (filter === "exceptions") return item.status === "exception"
        if (filter === "verified") return item.status === "verified"
        if (filter === "unassigned") return item.owner === "Unassigned"
        return true
      })
      .filter((item) => {
        if (!normalizedQuery) return true
        return [
          item.title,
          item.cve,
          item.owner,
          item.businessUnit,
          item.businessService,
          item.rootCause,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      })
      .sort((a, b) => b.score - a.score)
  }, [data, filter, query])

  const effectiveSelectedId =
    filtered.length > 0 && !filtered.some((item) => item.id === selectedId)
      ? filtered[0].id
      : selectedId
  const selected =
    data.find((item) => item.id === effectiveSelectedId) ?? filtered[0] ?? data[0]

  const metrics = useMemo(() => {
    const active = data.filter((item) => item.status !== "verified")
    const actNow = data.filter((item) => item.actionBucket === "Act now").length
    const verified = data.filter((item) => item.status === "verified").length
    const exceptions = data.filter((item) => item.status === "exception").length
    const avgConfidence = Math.round(
      data.reduce((total, item) => total + item.confidence, 0) / data.length
    )

    return { active: active.length, actNow, verified, exceptions, avgConfidence }
  }, [data])

  function updateStatus(id: string, status: ExposureStatus) {
    setStatusOverrides((current) => {
      const next = { ...current, [id]: status }
      window.localStorage.setItem(storageKey, JSON.stringify(next))
      return next
    })
  }

  function resetDemo() {
    window.localStorage.removeItem(storageKey)
    setStatusOverrides({})
    setFilter("all")
    setQuery("")
    setSelectedId(exposures[0].id)
  }

  return (
    <main className={styles.shell}>
      <aside className={styles.rail} aria-label="Product navigation">
        <div className={styles.brandMark}>RP</div>
        {[
          ["Command", ShieldAlert],
          ["Assets", Network],
          ["Risk", GitBranch],
          ["Exceptions", AlertTriangle],
          ["Audit", TicketCheck],
        ].map(([label, Icon], index) => (
          <button
            className={`${styles.navItem} ${index === 0 ? styles.navItemActive : ""}`}
            key={String(label)}
            type="button"
            aria-current={index === 0 ? "page" : undefined}
          >
            <Icon aria-hidden="true" size={17} />
            <span>{String(label)}</span>
          </button>
        ))}
      </aside>

      <section className={styles.workspace}>
        <header className={styles.header}>
          <div>
            <div className={styles.eyebrow}>ResolvePoint Exposure Command</div>
            <h1>Owner-ready fixes for exploitable business risk</h1>
            <p>
              Demo data only. This experience simulates exposure prioritization,
              assignment, exception review, and verification without live integrations.
            </p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.trustBadge}>
              <ShieldCheck aria-hidden="true" size={18} />
              <span>{metrics.avgConfidence}% source confidence</span>
            </div>
            <button className={styles.secondaryButton} type="button" onClick={resetDemo}>
              <RefreshCw aria-hidden="true" size={16} />
              Reset demo
            </button>
          </div>
        </header>

        <section className={styles.metricGrid} aria-label="Exposure summary">
          <Metric icon={ShieldAlert} label="Active exposure packs" value={String(metrics.active)} detail="Deduped from 1,842 raw findings" tone="red" />
          <Metric icon={Clock3} label="Act-now decisions" value={String(metrics.actNow)} detail="KEV, public path, or SLA pressure" tone="amber" />
          <Metric icon={CheckCircle2} label="Verified reductions" value={String(metrics.verified)} detail="Retested or source-confirmed" tone="teal" />
          <Metric icon={AlertTriangle} label="Governed exceptions" value={String(metrics.exceptions)} detail="Review dates and residual risk" tone="violet" />
        </section>

        <section className={styles.overviewGrid}>
          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h2>Risk movement</h2>
                <p>Composite demo risk has dropped 27% over 30 days while verified closures increased.</p>
              </div>
              <span className={styles.delta}>-27%</span>
            </div>
            <div className={styles.chartFrame}>
              <RiskTrendChart />
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h2>Root causes</h2>
                <p>Grouped fixes reveal where backlog reduction should become platform work.</p>
              </div>
            </div>
            <div className={styles.chartFrame}>
              <RootCauseChart />
            </div>
          </article>
        </section>

        <section className={styles.commandGrid}>
          <article className={styles.queuePanel}>
            <div className={styles.queueToolbar}>
              <div>
                <h2>Focus queue</h2>
                <p>Ranked remediation packs, not raw scanner alerts.</p>
              </div>
              <div className={styles.searchWrap}>
                <label className={styles.srOnly} htmlFor="exposure-search">
                  Search exposures
                </label>
                <Search aria-hidden="true" size={16} />
                <input
                  id="exposure-search"
                  type="search"
                  value={query}
                  placeholder="Search CVE, owner, service"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </div>

            <div className={styles.filterRow} aria-label="Queue filters">
              {(Object.keys(filterLabels) as FilterKey[]).map((key) => (
                <button
                  key={key}
                  className={`${styles.filterButton} ${filter === key ? styles.filterButtonActive : ""}`}
                  type="button"
                  onClick={() => setFilter(key)}
                >
                  {key === "all" ? <Filter aria-hidden="true" size={14} /> : null}
                  {filterLabels[key]}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className={styles.emptyState}>
                <Sparkles aria-hidden="true" size={20} />
                <h3>No exposure packs match this view</h3>
                <p>Adjust the filter or search query. In production this state would also show stale-source warnings.</p>
              </div>
            ) : (
              <div className={styles.queueList}>
                {filtered.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.queueItem} ${selected.id === item.id ? styles.queueItemActive : ""} ${item.actionBucket === "Act now" ? styles.queueItemHot : ""}`}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <div className={styles.queueTop}>
                      <span className={`${styles.bucket} ${bucketClass(item.actionBucket)}`}>{item.actionBucket}</span>
                      <span className={`${styles.status} ${statusClass(item.status)}`}>{statusLabel(item.status)}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <div className={styles.queueMeta}>
                      <span>{item.cve}</span>
                      <span>{item.businessService}</span>
                      <span>{item.owner}</span>
                    </div>
                    <div className={styles.scoreRow}>
                      <strong>{item.score}</strong>
                      <div className={styles.scoreTrack}>
                        <span style={{ width: `${item.score}%` }} />
                      </div>
                      <span>{item.due}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </article>

          <ExposureDetail exposure={selected} onStatus={updateStatus} />
        </section>
      </section>
    </main>
  )
}

function RiskTrendChart() {
  const width = 540
  const height = 178
  const pad = 26
  const riskValues = riskTrend.map((point) => point.risk)
  const verifiedValues = riskTrend.map((point) => point.verified)
  const riskMin = Math.min(...riskValues) - 24
  const riskMax = Math.max(...riskValues) + 24
  const verifiedMax = Math.max(...verifiedValues) + 18

  const xFor = (index: number) =>
    pad + (index * (width - pad * 2)) / (riskTrend.length - 1)
  const riskY = (value: number) =>
    height - pad - ((value - riskMin) / (riskMax - riskMin)) * (height - pad * 2)
  const verifiedY = (value: number) =>
    height - pad - (value / verifiedMax) * (height - pad * 2)
  const riskPoints = riskTrend.map((point, index) => `${xFor(index)},${riskY(point.risk)}`)
  const verifiedPoints = riskTrend.map(
    (point, index) => `${xFor(index)},${verifiedY(point.verified)}`
  )
  const areaPath = `M ${riskPoints[0]} L ${riskPoints.slice(1).join(" L ")} L ${xFor(
    riskTrend.length - 1
  )},${height - pad} L ${pad},${height - pad} Z`

  return (
    <figure className={styles.chartFigure}>
      <svg
        className={styles.inlineChart}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Risk trend fell from 731 to 536 while verified closures rose from 24 to 108."
      >
        <defs>
          <linearGradient id="localRiskFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#d34d4d" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#d34d4d" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => (
          <line
            key={line}
            x1={pad}
            x2={width - pad}
            y1={pad + line * 38}
            y2={pad + line * 38}
            stroke="#26313a"
            strokeDasharray="4 5"
          />
        ))}
        <path d={areaPath} fill="url(#localRiskFill)" />
        <polyline points={riskPoints.join(" ")} fill="none" stroke="#d34d4d" strokeWidth="3" />
        <polyline
          points={verifiedPoints.join(" ")}
          fill="none"
          stroke="#38b99f"
          strokeWidth="3"
        />
        {riskTrend.map((point, index) => (
          <g key={point.day}>
            <circle cx={xFor(index)} cy={riskY(point.risk)} r="3.5" fill="#d34d4d" />
            <circle cx={xFor(index)} cy={verifiedY(point.verified)} r="3.5" fill="#38b99f" />
            {index === 0 || index === riskTrend.length - 1 ? (
              <text x={xFor(index)} y={height - 5} textAnchor="middle" fill="#8b98a5" fontSize="11">
                {point.day}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
      <figcaption className={styles.chartLegend}>
        <span><i className={styles.riskDot} /> Risk score</span>
        <span><i className={styles.verifiedDot} /> Verified closures</span>
      </figcaption>
    </figure>
  )
}

function RootCauseChart() {
  const width = 540
  const height = 178
  const pad = 28
  const maxValue = Math.max(...rootCauses.flatMap((point) => [point.active, point.verified]))
  const groupWidth = (width - pad * 2) / rootCauses.length
  const scale = (value: number) => (value / (maxValue + 5)) * (height - pad * 2)

  return (
    <figure className={styles.chartFigure}>
      <svg
        className={styles.inlineChart}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Root cause bars compare active and verified remediation packs."
      >
        {[0, 1, 2].map((line) => (
          <line
            key={line}
            x1={pad}
            x2={width - pad}
            y1={pad + line * 48}
            y2={pad + line * 48}
            stroke="#26313a"
            strokeDasharray="4 5"
          />
        ))}
        {rootCauses.map((point, index) => {
          const x = pad + index * groupWidth + 16
          const activeHeight = scale(point.active)
          const verifiedHeight = scale(point.verified)
          return (
            <g key={point.label}>
              <rect
                x={x}
                y={height - pad - activeHeight}
                width="24"
                height={activeHeight}
                rx="4"
                fill="#d6a548"
              />
              <rect
                x={x + 30}
                y={height - pad - verifiedHeight}
                width="24"
                height={verifiedHeight}
                rx="4"
                fill="#38b99f"
              />
              <text x={x + 27} y={height - 7} textAnchor="middle" fill="#8b98a5" fontSize="10">
                {point.label}
              </text>
            </g>
          )
        })}
      </svg>
      <figcaption className={styles.chartLegend}>
        <span><i className={styles.activeDot} /> Active</span>
        <span><i className={styles.verifiedDot} /> Verified</span>
      </figcaption>
    </figure>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: typeof ShieldAlert
  label: string
  value: string
  detail: string
  tone: "red" | "amber" | "teal" | "violet"
}) {
  return (
    <article className={`${styles.metricCard} ${styles[`metric-${tone}`]}`}>
      <div className={styles.metricIcon}>
        <Icon aria-hidden="true" size={18} />
      </div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
    </article>
  )
}

function ExposureDetail({
  exposure,
  onStatus,
}: {
  exposure: Exposure
  onStatus: (id: string, status: ExposureStatus) => void
}) {
  return (
    <article className={styles.detailPanel}>
      <div className={styles.detailHeader}>
        <div>
          <span className={`${styles.bucket} ${bucketClass(exposure.actionBucket)}`}>{exposure.actionBucket}</span>
          <h2>{exposure.title}</h2>
          <p>
            {exposure.businessUnit} / {exposure.businessService} / {exposure.environment}
          </p>
        </div>
        <div className={styles.priorityScore}>
          <span>Priority</span>
          <strong>{exposure.score}</strong>
        </div>
      </div>

      <div className={styles.actionBar} aria-label="Exposure actions">
        <button type="button" onClick={() => onStatus(exposure.id, "in-progress")}>
          <UserRoundCheck aria-hidden="true" size={16} />
          Assign owner
        </button>
        <button type="button" onClick={() => onStatus(exposure.id, "exception")}>
          <AlertTriangle aria-hidden="true" size={16} />
          Mark exception
        </button>
        <button type="button" onClick={() => onStatus(exposure.id, "verified")}>
          <CheckCircle2 aria-hidden="true" size={16} />
          Mark verified
        </button>
      </div>

      <div className={styles.factGrid}>
        <Fact label="Owner" value={`${exposure.owner} / ${exposure.team}`} icon={UserRoundCheck} />
        <Fact label="Affected assets" value={`${exposure.affectedAssets} ${exposure.assetType}`} icon={Database} />
        <Fact label="EPSS" value={`${Math.round(exposure.epss * 100)}% (${exposure.epssPercentile}th)`} icon={ArrowUpRight} />
        <Fact label="Ticket" value={exposure.ticket} icon={TicketCheck} />
      </div>

      <section className={styles.signalSection}>
        <h3>Evidence and trust</h3>
        <div className={styles.chipRow}>
          {exposure.signals.map((signal) => (
            <span key={signal} className={styles.signalChip}>
              {signal}
            </span>
          ))}
        </div>
        <ul className={styles.cleanList}>
          {exposure.evidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.pathSection}>
        <h3>Attack path context</h3>
        <div className={styles.pathRail} aria-label={`Attack path: ${exposure.path.join(" to ")}`}>
          {exposure.path.map((step, index) => (
            <div className={styles.pathNode} key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
        <p>{exposure.blastRadius}</p>
      </section>

      <section className={styles.twoColumn}>
        <div>
          <h3>Why this priority</h3>
          <ul className={styles.cleanList}>
            {exposure.reasoning.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Remediation action pack</h3>
          <ol className={styles.stepList}>
            {exposure.remediation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.verification}>
        <div>
          <h3>Verification</h3>
          <p>{exposure.verification}</p>
        </div>
        <div>
          <h3>Compensating control</h3>
          <p>{exposure.compensatingControl}</p>
        </div>
      </section>

      <div className={styles.mitreRow}>
        <KeyRound aria-hidden="true" size={16} />
        {exposure.mitre.map((technique) => (
          <span key={technique}>{technique}</span>
        ))}
      </div>
    </article>
  )
}

function Fact({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: typeof ShieldAlert
}) {
  return (
    <div className={styles.fact}>
      <Icon aria-hidden="true" size={16} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
