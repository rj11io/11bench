"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  Database,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Gauge,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  PanelLeftClose,
  Search,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  WalletCards,
  X,
} from "lucide-react"
import styles from "./styles.module.css"

type ViewKey = "overview" | "positions" | "flows" | "policies" | "reports"
type ScenarioKey = "base" | "ethDown" | "tokenDown"
type RangeKey = "30D" | "90D" | "180D"
type Severity = "action" | "watch" | "clear"

type Asset = {
  id: string
  symbol: string
  name: string
  chain: string
  location: string
  amount: number
  price: number
  value: number
  allocation: number
  change: number
  source: string
  observed: string
  confidence: "High" | "Medium" | "Review"
  status: "Recognized" | "Manual" | "Needs review"
  bucket: "Stable" | "Core" | "Protocol"
  color: "mint" | "blue" | "amber" | "coral"
  contract?: string
}

type Alert = {
  id: string
  title: string
  description: string
  severity: Severity
  policy: string
  source: string
  observed: string
  evidence: string
  action: string
}

type ScenarioMetrics = {
  nav: number
  deployable: number
  runway: number
  stressRunway: number
  policy: number
  coverage: number
  delta: number
}

type Point = { x: number; y: number }

const navItems = [
  { key: "overview" as ViewKey, label: "Overview", icon: <LayoutDashboard size={16} /> },
  { key: "positions" as ViewKey, label: "Positions", icon: <WalletCards size={16} /> },
  { key: "flows" as ViewKey, label: "Flows", icon: <Activity size={16} /> },
  { key: "policies" as ViewKey, label: "Policies", icon: <ShieldCheck size={16} /> },
  { key: "reports" as ViewKey, label: "Reports", icon: <FileText size={16} /> },
]

const assets: Asset[] = [
  {
    id: "usdc-safe",
    symbol: "USDC",
    name: "USD Coin",
    chain: "Ethereum",
    location: "Safe 2/3",
    amount: 1260000,
    price: 1,
    value: 1260000,
    allocation: 16.1,
    change: 0.01,
    source: "Safe Transaction Service",
    observed: "14:27 UTC",
    confidence: "High",
    status: "Recognized",
    bucket: "Stable",
    color: "mint",
    contract: "0xA0b8…eB48",
  },
  {
    id: "eth-safe",
    symbol: "ETH",
    name: "Ether",
    chain: "Ethereum",
    location: "Safe 2/3",
    amount: 520.4,
    price: 3344,
    value: 1741222,
    allocation: 22.2,
    change: 4.8,
    source: "Ethereum RPC",
    observed: "14:30 UTC",
    confidence: "High",
    status: "Recognized",
    bucket: "Core",
    color: "blue",
    contract: "Native asset",
  },
  {
    id: "btc-custodian",
    symbol: "BTC",
    name: "Bitcoin",
    chain: "Bitcoin",
    location: "Copper Vault",
    amount: 18.4,
    price: 102800,
    value: 1891520,
    allocation: 24.1,
    change: 2.1,
    source: "Copper read-only API",
    observed: "14:18 UTC",
    confidence: "High",
    status: "Recognized",
    bucket: "Core",
    color: "amber",
  },
  {
    id: "arb-safe",
    symbol: "ARB",
    name: "Arbitrum",
    chain: "Arbitrum",
    location: "Safe 2/3",
    amount: 3960000,
    price: 0.447,
    value: 1770120,
    allocation: 22.6,
    change: -9.4,
    source: "Dune curated balances",
    observed: "13:56 UTC",
    confidence: "Medium",
    status: "Recognized",
    bucket: "Protocol",
    color: "coral",
    contract: "0x912C…6548",
  },
  {
    id: "sol-ops",
    symbol: "SOL",
    name: "Solana",
    chain: "Solana",
    location: "Ops wallet",
    amount: 4200,
    price: 147.2,
    value: 618240,
    allocation: 7.9,
    change: 6.2,
    source: "Solana RPC",
    observed: "14:31 UTC",
    confidence: "High",
    status: "Recognized",
    bucket: "Core",
    color: "mint",
    contract: "Native asset",
  },
  {
    id: "rune-manual",
    symbol: "RUNE",
    name: "Runestone token",
    chain: "Ethereum",
    location: "Manual balance",
    amount: 132000,
    price: 2.18,
    value: 287760,
    allocation: 3.7,
    change: -18.4,
    source: "Manual CSV · treasury@northstar",
    observed: "12 Jul 2026",
    confidence: "Review",
    status: "Needs review",
    bucket: "Protocol",
    color: "coral",
    contract: "0x4B3A…01D2",
  },
]

const alerts: Alert[] = [
  {
    id: "arb-concentration",
    title: "Protocol token concentration",
    description: "ARB is 22.6% of covered NAV, above the 20% policy cap.",
    severity: "action",
    policy: "Volatile asset cap · 20%",
    source: "Dune curated balances",
    observed: "13:56 UTC · 36m ago",
    evidence: "3.96M ARB across Safe 2/3 · 22.6% of $7.84M covered NAV",
    action: "Review treasury allocation before the next unlock window.",
  },
  {
    id: "rune-source",
    title: "Manual position needs review",
    description: "RUNE valuation is a 4-day-old manual CSV observation.",
    severity: "watch",
    policy: "Data coverage · 98% target",
    source: "Manual CSV",
    observed: "12 Jul 2026 · 4d ago",
    evidence: "$287.8k manual position · contract identity not verified",
    action: "Confirm token identity and replace the manual value with a read-only source.",
  },
  {
    id: "outflow-window",
    title: "Large outflow window ahead",
    description: "$640k of committed grants and payroll land in the next 30 days.",
    severity: "watch",
    policy: "Reserve floor · $3.2M",
    source: "Cashflow plan · Ops",
    observed: "16 Jul 2026 · 14:32 UTC",
    evidence: "Payroll $340k · grants $220k · vendors $80k",
    action: "Recheck deployable capital after the next scheduled snapshot.",
  },
]

const scenarioMetrics: Record<ScenarioKey, ScenarioMetrics> = {
  base: {
    nav: 7840122,
    deployable: 4840000,
    runway: 14.2,
    stressRunway: 14.2,
    policy: 92,
    coverage: 96,
    delta: 1.7,
  },
  ethDown: {
    nav: 6977111,
    deployable: 3977000,
    runway: 11.7,
    stressRunway: 11.7,
    policy: 84,
    coverage: 96,
    delta: -9.1,
  },
  tokenDown: {
    nav: 6870112,
    deployable: 4315000,
    runway: 12.6,
    stressRunway: 12.6,
    policy: 88,
    coverage: 96,
    delta: -7.5,
  },
}

const scenarioCopy: Record<ScenarioKey, { label: string; helper: string }> = {
  base: { label: "Base case", helper: "Current seeded assumptions" },
  ethDown: { label: "ETH −30%", helper: "Modelled price shock" },
  tokenDown: { label: "Token −50%", helper: "Modelled protocol-token shock" },
}

const chartSeries: Record<RangeKey, number[]> = {
  "30D": [7.55, 7.42, 7.61, 7.48, 7.66, 7.58, 7.84],
  "90D": [7.18, 7.31, 7.06, 7.38, 7.54, 7.42, 7.84],
  "180D": [6.91, 7.24, 7.04, 7.51, 7.36, 7.62, 7.84],
}

const flowRows = [
  { label: "Payroll & contractors", value: 340000, cadence: "Monthly", status: "Committed" },
  { label: "Grants / incentives", value: 220000, cadence: "30D window", status: "Committed" },
  { label: "Vendors & ops", value: 80000, cadence: "Monthly", status: "Committed" },
  { label: "Protocol revenue", value: 145000, cadence: "30D average", status: "Variable" },
]

const policyRows = [
  { label: "Stable reserve floor", current: "$3.20M", target: "≥ $3.20M", value: 100, status: "clear" as Severity, detail: "Current liquid reserve is $4.84M before near-term commitments." },
  { label: "Volatile asset cap", current: "22.6%", target: "≤ 20.0%", value: 113, status: "action" as Severity, detail: "ARB is above the cap by 2.6 percentage points." },
  { label: "Venue concentration", current: "38%", target: "≤ 50.0%", value: 76, status: "clear" as Severity, detail: "Largest venue is the Copper Vault custody account." },
  { label: "30-day outflow limit", current: "$640k", target: "≤ $750k", value: 85, status: "watch" as Severity, detail: "Upcoming grants and payroll leave a tighter buffer." },
]

function formatUsd(value: number, decimals = 2) {
  if (Math.abs(value) >= 1000000) return `$${(value / 1000000).toFixed(decimals)}M`
  if (Math.abs(value) >= 1000) return `$${Math.round(value / 1000)}k`
  return `$${Math.round(value)}`
}

function formatAmount(value: number) {
  return value >= 100000 ? `${(value / 1000000).toFixed(2)}M` : value.toLocaleString("en-US", { maximumFractionDigits: 2 })
}

function makeChartPoints(values: number[]): Point[] {
  const min = Math.min(...values) - 0.2
  const max = Math.max(...values) + 0.2
  return values.map((value, index) => ({
    x: 20 + (index / (values.length - 1)) * 420,
    y: 150 - ((value - min) / (max - min)) * 116,
  }))
}

function makePath(points: Point[]) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ")
}

function severityLabel(severity: Severity) {
  if (severity === "action") return "Action"
  if (severity === "watch") return "Watch"
  return "Clear"
}

function SeverityIcon({ severity }: { severity: Severity }) {
  if (severity === "clear") return <CheckCircle2 size={15} />
  if (severity === "watch") return <CircleAlert size={15} />
  return <AlertTriangle size={15} />
}

function SignalTag({ severity, children }: { severity: Severity; children: React.ReactNode }) {
  return (
    <span className={`${styles.signalTag} ${styles[`signal${severity[0].toUpperCase()}${severity.slice(1)}`]}`}>
      <SeverityIcon severity={severity} />
      {children}
    </span>
  )
}

function MetricCard({
  label,
  value,
  context,
  trend,
  icon,
  tone = "neutral",
}: {
  label: string
  value: string
  context: string
  trend?: "up" | "down" | "neutral"
  icon: React.ReactNode
  tone?: "neutral" | "mint" | "amber" | "coral"
}) {
  return (
    <article className={`${styles.metricCard} ${styles[`tone${tone[0].toUpperCase()}${tone.slice(1)}`]}`}>
      <div className={styles.metricHeader}>
        <span>{label}</span>
        <span className={styles.metricIcon}>{icon}</span>
      </div>
      <div className={styles.metricValue}>{value}</div>
      <div className={styles.metricContext}>
        {trend === "up" ? <ArrowUpRight size={13} /> : trend === "down" ? <ArrowDownRight size={13} /> : null}
        {context}
      </div>
    </article>
  )
}

function Chart({ range, scenario }: { range: RangeKey; scenario: ScenarioKey }) {
  const basePoints = makeChartPoints(chartSeries[range])
  const factor = scenario === "base" ? 1 : scenario === "ethDown" ? 0.89 : 0.925
  const stressValues = chartSeries[range].map((value, index) => value * (index === chartSeries[range].length - 1 ? factor : 1))
  const stressPoints = makeChartPoints(stressValues)
  const basePath = makePath(basePoints)
  const stressPath = makePath(stressPoints)
  const areaPath = `${basePath} L 440 168 L 20 168 Z`

  return (
    <div className={styles.chartArea}>
      <svg className={styles.chartSvg} viewBox="0 0 460 190" role="img" aria-labelledby="nav-chart-title nav-chart-desc">
        <title id="nav-chart-title">Covered NAV over the selected time range</title>
        <desc id="nav-chart-desc">
          Seeded treasury value history with a selected scenario line. Values are in millions of US dollars.
        </desc>
        {[34, 78, 122, 166].map((y) => (
          <line key={y} x1="20" x2="440" y1={y} y2={y} className={styles.chartGrid} />
        ))}
        <path d={areaPath} className={styles.chartAreaFill} />
        <path d={basePath} className={styles.chartBaseLine} />
        {scenario !== "base" ? <path d={stressPath} className={styles.chartStressLine} /> : null}
        <circle cx={basePoints[basePoints.length - 1].x} cy={basePoints[basePoints.length - 1].y} r="4" className={styles.chartDot} />
        <text x="20" y="184" className={styles.chartLabel}>30d ago</text>
        <text x="410" y="184" className={styles.chartLabel}>today</text>
        <text x="4" y="38" className={styles.chartAxis}>$8M</text>
        <text x="4" y="166" className={styles.chartAxis}>$7M</text>
      </svg>
      <div className={styles.chartSummary}>
        <span><i className={styles.legendDotMint} /> Base path · covered NAV</span>
        {scenario !== "base" ? <span><i className={styles.legendDotCoral} /> {scenarioCopy[scenario].label} at horizon</span> : <span>Source: seeded snapshot</span>}
      </div>
    </div>
  )
}

function PageHeader({
  activeView,
  reviewed,
  onMarkReviewed,
  onReadOnly,
}: {
  activeView: ViewKey
  reviewed: boolean
  onMarkReviewed: () => void
  onReadOnly: () => void
}) {
  const copy: Record<ViewKey, { title: string; description: string }> = {
    overview: { title: "Treasury health", description: "A decision-ready view of liquidity, policy drift, and what changed." },
    positions: { title: "Positions", description: "Exact holdings across wallets, venues, and manual sources." },
    flows: { title: "Flows & runway", description: "Committed burn and upcoming outflows mapped against deployable capital." },
    policies: { title: "Policy controls", description: "Named limits make treasury risk inspectable before a signer is asked to act." },
    reports: { title: "Reports", description: "A concise weekly pulse for finance leads, signers, and governance." },
  }
  const current = copy[activeView]

  return (
    <section className={styles.pageHeader}>
      <div>
        <div className={styles.eyebrow}>NORTHSTAR PROTOCOL · TREASURY</div>
        <h1>{current.title}</h1>
        <p>{current.description}</p>
      </div>
      <div className={styles.headerActions}>
        <button className={styles.outlineButton} onClick={onReadOnly}>
          <LockKeyhole size={15} /> Read-only scope
        </button>
        <button className={styles.primaryButton} onClick={onMarkReviewed}>
          {reviewed ? <Check size={15} /> : <CalendarClock size={15} />}
          {reviewed ? "Reviewed just now" : "Mark reviewed"}
        </button>
      </div>
    </section>
  )
}

function DecisionQueue({
  selectedAlert,
  acknowledged,
  onSelect,
}: {
  selectedAlert: string | null
  acknowledged: string[]
  onSelect: (id: string) => void
}) {
  const openCount = alerts.filter((alert) => !acknowledged.includes(alert.id)).length

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <div className={styles.panelEyebrow}>REVIEW QUEUE</div>
          <h2>Decision queue</h2>
        </div>
        <span className={styles.queueCount}>{openCount} open</span>
      </div>
      <div className={styles.queueList}>
        {alerts.map((alert) => {
          const isAcknowledged = acknowledged.includes(alert.id)
          return (
            <button
              className={`${styles.alertRow} ${selectedAlert === alert.id ? styles.alertSelected : ""} ${isAcknowledged ? styles.alertAcknowledged : ""}`}
              key={alert.id}
              onClick={() => onSelect(alert.id)}
              aria-pressed={selectedAlert === alert.id}
            >
              <span className={`${styles.alertSignal} ${styles[`signal${alert.severity[0].toUpperCase()}${alert.severity.slice(1)}`]}`}>
                <SeverityIcon severity={alert.severity} />
              </span>
              <span className={styles.alertCopy}>
                <span className={styles.alertTitle}>{alert.title}</span>
                <span className={styles.alertDescription}>{alert.description}</span>
                <span className={styles.alertMeta}>{isAcknowledged ? "Acknowledged" : `${severityLabel(alert.severity)} · ${alert.observed}`}</span>
              </span>
              <ArrowUpRight size={15} className={styles.alertArrow} />
            </button>
          )
        })}
      </div>
    </section>
  )
}

function AlertInspector({
  alert,
  acknowledged,
  onAcknowledge,
  onClose,
}: {
  alert: Alert | null
  acknowledged: boolean
  onAcknowledge: () => void
  onClose: () => void
}) {
  if (!alert) return null

  return (
    <section className={styles.inspector} aria-live="polite">
      <div className={styles.inspectorHeader}>
        <div className={styles.panelEyebrow}>SELECTED SIGNAL</div>
        <button className={styles.iconButton} aria-label="Close selected signal" onClick={onClose}>
          <X size={16} />
        </button>
      </div>
      <div className={styles.inspectorTitleRow}>
        <h2>{alert.title}</h2>
        <SignalTag severity={alert.severity}>{severityLabel(alert.severity)}</SignalTag>
      </div>
      <p className={styles.inspectorDescription}>{alert.description}</p>
      <div className={styles.evidenceBox}>
        <div className={styles.evidenceLabel}>WHY IT MATTERS</div>
        <p>{alert.action}</p>
      </div>
      <dl className={styles.detailList}>
        <div><dt>Policy</dt><dd>{alert.policy}</dd></div>
        <div><dt>Evidence</dt><dd>{alert.evidence}</dd></div>
        <div><dt>Source</dt><dd>{alert.source}</dd></div>
        <div><dt>Observed</dt><dd>{alert.observed}</dd></div>
      </dl>
      <div className={styles.inspectorActions}>
        <button className={styles.primaryButtonSmall} onClick={onAcknowledge} disabled={acknowledged}>
          {acknowledged ? <Check size={14} /> : <ShieldCheck size={14} />}
          {acknowledged ? "Acknowledged" : "Acknowledge"}
        </button>
        <button className={styles.ghostButton} onClick={onClose}>Keep open</button>
      </div>
    </section>
  )
}

function EvidenceLedger() {
  const rows = [
    { source: "Ethereum RPC", dataset: "Native balances", time: "14:30 UTC", age: "2m", coverage: "42% NAV", status: "Current", severity: "clear" as Severity },
    { source: "Safe Transaction Service", dataset: "Safe positions", time: "14:27 UTC", age: "5m", coverage: "16% NAV", status: "Current", severity: "clear" as Severity },
    { source: "Dune curated balances", dataset: "Protocol token", time: "13:56 UTC", age: "36m", coverage: "23% NAV", status: "Derived", severity: "watch" as Severity },
    { source: "Manual CSV", dataset: "RUNE position", time: "12 Jul 2026", age: "4d", coverage: "3.7% NAV", status: "Review", severity: "action" as Severity },
  ]

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <div className={styles.panelEyebrow}>PROVENANCE</div>
          <h2>Evidence ledger</h2>
        </div>
        <button className={styles.textButton}><Database size={14} /> View source map</button>
      </div>
      <div className={styles.evidenceTable} role="table" aria-label="Seeded data provenance">
        <div className={styles.evidenceTableHead} role="row">
          <span>Source</span><span>Dataset</span><span>Observed</span><span>Age</span><span>Covered value</span><span>Status</span>
        </div>
        {rows.map((row) => (
          <div className={styles.evidenceTableRow} role="row" key={row.dataset}>
            <strong>{row.source}</strong><span>{row.dataset}</span><span className={styles.mono}>{row.time}</span><span className={styles.mono}>{row.age}</span><span>{row.coverage}</span><SignalTag severity={row.severity}>{row.status}</SignalTag>
          </div>
        ))}
      </div>
      <div className={styles.ledgerFooter}><span><span className={styles.statusDot} /> Demo data · not connected to a live provider</span><span>Coverage {scenarioMetrics.base.coverage}% · refreshed manually for this snapshot</span></div>
    </section>
  )
}

function TreasuryMix() {
  const mix = [
    { label: "Stable reserve", value: 16.1, color: "var(--mint)", status: "Above floor" },
    { label: "BTC / ETH core", value: 54.2, color: "var(--blue)", status: "Within band" },
    { label: "Protocol tokens", value: 29.7, color: "var(--coral)", status: "Watch cap" },
  ]

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <div><div className={styles.panelEyebrow}>EXPOSURE</div><h2>Treasury mix</h2></div>
        <button className={styles.iconButton} aria-label="Treasury mix options"><MoreHorizontal size={17} /></button>
      </div>
      <div className={styles.mixBar} aria-label="Treasury mix stacked bar">
        {mix.map((item) => <span key={item.label} className={styles.mixSegment} style={{ width: `${item.value}%`, background: item.color }} />)}
      </div>
      <div className={styles.mixList}>
        {mix.map((item) => (
          <div className={styles.mixRow} key={item.label}>
            <span className={styles.mixName}><i style={{ background: item.color }} />{item.label}</span>
            <span className={styles.mixValue}>{item.value.toFixed(1)}%</span>
            <span className={item.status === "Watch cap" ? styles.mixStatusWatch : styles.mixStatus}>{item.status}</span>
          </div>
        ))}
      </div>
      <div className={styles.panelNote}><ShieldAlert size={14} /> Protocol tokens exceed policy cap by 2.6pp.</div>
    </section>
  )
}

function RunwayCard({ metrics }: { metrics: ScenarioMetrics }) {
  const baseWidth = Math.min((metrics.runway / 18) * 100, 100)
  const stressWidth = Math.min((metrics.stressRunway / 18) * 100, 100)

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <div><div className={styles.panelEyebrow}>LIQUIDITY PLAN</div><h2>Runway & burn</h2></div>
        <span className={styles.inlineBadge}><Gauge size={14} /> 18 mo target</span>
      </div>
      <div className={styles.runwayHero}><span className={styles.runwayNumber}>{metrics.runway.toFixed(1)}</span><span className={styles.runwayUnit}>months<br />base runway</span></div>
      <div className={styles.runwayBars}>
        <div className={styles.barRow}><div className={styles.barLabel}><span>Base case</span><b>{metrics.runway.toFixed(1)} mo</b></div><div className={styles.barTrack}><span className={styles.barFillMint} style={{ width: `${baseWidth}%` }} /></div></div>
        <div className={styles.barRow}><div className={styles.barLabel}><span>Selected stress</span><b>{metrics.stressRunway.toFixed(1)} mo</b></div><div className={styles.barTrack}><span className={styles.barFillCoral} style={{ width: `${stressWidth}%` }} /></div></div>
      </div>
      <div className={styles.runwayStats}><div><span>Monthly net burn</span><strong>$342k</strong></div><div><span>Next 30D outflow</span><strong>$640k</strong></div><div><span>Reserve floor</span><strong>$3.20M</strong></div></div>
      <div className={styles.panelNote}><CalendarClock size={14} /> Assumptions last reviewed 08 Jul 2026.</div>
    </section>
  )
}

function Overview({
  metrics,
  range,
  scenario,
  selectedAlert,
  acknowledged,
  onRangeChange,
  onScenarioChange,
  onAlertSelect,
  onAlertAcknowledge,
  onAlertClose,
}: {
  metrics: ScenarioMetrics
  range: RangeKey
  scenario: ScenarioKey
  selectedAlert: Alert | null
  acknowledged: string[]
  onRangeChange: (range: RangeKey) => void
  onScenarioChange: (scenario: ScenarioKey) => void
  onAlertSelect: (id: string) => void
  onAlertAcknowledge: () => void
  onAlertClose: () => void
}) {
  return (
    <>
      <section className={styles.metricStrip} aria-label="Treasury summary">
        <MetricCard label="Covered NAV" value={formatUsd(metrics.nav)} context={`${metrics.delta > 0 ? "+" : ""}${metrics.delta.toFixed(1)}% vs 30D snapshot`} trend={metrics.delta > 0 ? "up" : "down"} icon={<WalletCards size={16} />} />
        <MetricCard label="Deployable capital" value={formatUsd(metrics.deployable)} context="after reserve floor + 30D outflow" icon={<ArrowUpRight size={16} />} tone="mint" />
        <MetricCard label="Runway" value={`${metrics.runway.toFixed(1)} mo`} context={`${metrics.stressRunway.toFixed(1)} mo in selected stress`} icon={<Gauge size={16} />} tone={metrics.runway < 12 ? "amber" : "neutral"} />
        <MetricCard label="Policy coverage" value={`${metrics.policy}%`} context={`${metrics.coverage}% value has current source`} icon={<ShieldCheck size={16} />} tone={metrics.policy < 90 ? "amber" : "mint"} />
      </section>

      <section className={styles.dashboardGrid}>
        <section className={`${styles.panel} ${styles.chartPanel}`}>
          <div className={styles.panelHeader}>
            <div><div className={styles.panelEyebrow}>CAPITAL HISTORY</div><h2>Covered NAV</h2></div>
            <div className={styles.panelControls}>
              <div className={styles.segmented} aria-label="Time range">
                {(["30D", "90D", "180D"] as RangeKey[]).map((item) => <button key={item} className={range === item ? styles.segmentActive : styles.segmentButton} onClick={() => onRangeChange(item)} aria-pressed={range === item}>{item}</button>)}
              </div>
              <button className={styles.iconButton} aria-label="Chart options"><MoreHorizontal size={17} /></button>
            </div>
          </div>
          <div className={styles.scenarioLab}>
            <div><span className={styles.panelEyebrow}>SCENARIO LAB</span><span className={styles.scenarioHelper}>{scenarioCopy[scenario].helper} · not a forecast</span></div>
            <div className={styles.scenarioButtons}>
              {(Object.keys(scenarioCopy) as ScenarioKey[]).map((item) => <button key={item} className={scenario === item ? styles.scenarioActive : styles.scenarioButton} onClick={() => onScenarioChange(item)} aria-pressed={scenario === item}>{scenarioCopy[item].label}</button>)}
            </div>
          </div>
          <Chart range={range} scenario={scenario} />
          <div className={styles.chartFooter}><span><span className={styles.liveDot} /> Seeded snapshot · 16 Jul 2026, 14:32 UTC</span><span>6 positions · 96% value coverage</span></div>
        </section>
        <div className={styles.rightRail}>
          <DecisionQueue selectedAlert={selectedAlert?.id ?? null} acknowledged={acknowledged} onSelect={onAlertSelect} />
          <AlertInspector alert={selectedAlert} acknowledged={selectedAlert ? acknowledged.includes(selectedAlert.id) : false} onAcknowledge={onAlertAcknowledge} onClose={onAlertClose} />
        </div>
        <TreasuryMix />
        <RunwayCard metrics={metrics} />
      </section>
      <EvidenceLedger />
    </>
  )
}

function AssetDetail({ asset }: { asset: Asset | null }) {
  if (!asset) {
    return <div className={styles.emptyDetail}><SlidersHorizontal size={18} /><span>Select a position to inspect its source, custody, and policy contribution.</span></div>
  }
  return (
    <div className={styles.assetDetail}>
      <div className={styles.assetDetailHeader}><div><div className={styles.panelEyebrow}>POSITION DETAIL</div><h2>{asset.name} <span>{asset.symbol}</span></h2></div><SignalTag severity={asset.status === "Needs review" ? "action" : asset.confidence === "Medium" ? "watch" : "clear"}>{asset.status}</SignalTag></div>
      <div className={styles.assetDetailGrid}>
        <div><span>Amount</span><strong>{formatAmount(asset.amount)} {asset.symbol}</strong></div>
        <div><span>Value</span><strong>{formatUsd(asset.value)}</strong></div>
        <div><span>Allocation</span><strong>{asset.allocation.toFixed(1)}% of NAV</strong></div>
        <div><span>Source age</span><strong>{asset.observed}</strong></div>
      </div>
      <div className={styles.detailSource}><Database size={14} /><span>{asset.source}</span><span>·</span><span>{asset.chain}</span><span>·</span><span>{asset.location}</span><button className={styles.textButton}><ExternalLink size={13} /> Source details</button></div>
    </div>
  )
}

function PositionsView({ query, onSelectAsset, selectedAsset }: { query: string; onSelectAsset: (id: string) => void; selectedAsset: Asset | null }) {
  const filteredAssets = useMemo(() => assets.filter((asset) => `${asset.symbol} ${asset.name} ${asset.chain} ${asset.location}`.toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <>
      <section className={styles.panel}>
        <div className={styles.panelHeader}><div><div className={styles.panelEyebrow}>COVERED POSITIONS</div><h2>Exact holdings</h2></div><div className={styles.headerStat}><span>6 assets</span><b>$7.84M</b></div></div>
        <div className={styles.filterBar}><label className={styles.inlineSearch}><Search size={15} /><input value={query} readOnly aria-label="Search positions" placeholder="Search positions" /></label><button className={styles.ghostButton}><Filter size={14} /> All chains <ChevronDown size={14} /></button><button className={styles.ghostButton}><SlidersHorizontal size={14} /> Columns</button></div>
        <div className={styles.positionList} role="table" aria-label="Treasury positions">
          <div className={styles.positionHead} role="row"><span>Asset</span><span>Location</span><span>Amount</span><span>Value</span><span>30D</span><span>Source</span></div>
          {filteredAssets.map((asset) => <button key={asset.id} className={`${styles.positionRow} ${selectedAsset?.id === asset.id ? styles.positionSelected : ""}`} onClick={() => onSelectAsset(asset.id)} aria-pressed={selectedAsset?.id === asset.id}><span className={styles.assetName}><i className={`${styles.assetOrb} ${styles[`orb${asset.color[0].toUpperCase()}${asset.color.slice(1)}`]}`}>{asset.symbol.slice(0, 1)}</i><span><strong>{asset.symbol}</strong><small>{asset.name} · {asset.chain}</small></span></span><span className={styles.locationCell}><strong>{asset.location}</strong><small>{asset.status}</small></span><span className={styles.mono}>{formatAmount(asset.amount)} {asset.symbol}</span><span className={styles.valueCell}><strong>{formatUsd(asset.value)}</strong><small>{asset.allocation.toFixed(1)}% of NAV</small></span><span className={asset.change < 0 ? styles.negativeChange : styles.positiveChange}>{asset.change > 0 ? "+" : ""}{asset.change.toFixed(1)}%</span><span className={styles.sourceCell}><strong>{asset.observed}</strong><small>{asset.confidence} confidence</small></span></button>)}
          {filteredAssets.length === 0 ? <div className={styles.emptyState}><Search size={18} /><strong>No positions match</strong><span>Try a symbol, chain, or custody location.</span></div> : null}
        </div>
      </section>
      <AssetDetail asset={selectedAsset} />
    </>
  )
}

function FlowsView({ metrics }: { metrics: ScenarioMetrics }) {
  return (
    <>
      <section className={styles.flowHero}>
        <div className={styles.flowHeroCopy}><div className={styles.panelEyebrow}>90-DAY CASH PLAN</div><h2>Runway is a cashflow model.</h2><p>Committed outflows are visible before price movement so the team can decide how much capital needs to stay liquid.</p></div>
        <div className={styles.flowHeroStat}><span>Net monthly burn</span><strong>$342k</strong><small>after $145k variable revenue</small></div>
        <div className={styles.flowHeroStat}><span>Deployable capital</span><strong>{formatUsd(metrics.deployable)}</strong><small>policy-adjusted base case</small></div>
      </section>
      <section className={styles.flowGrid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}><div><div className={styles.panelEyebrow}>COMMITTED CASHFLOW</div><h2>Next 30 days</h2></div><span className={styles.inlineBadge}><CalendarClock size={14} /> Review 22 Jul</span></div>
          <div className={styles.flowStack}>{flowRows.map((row) => <div className={styles.flowRow} key={row.label}><div className={styles.flowIcon}>{row.status === "Variable" ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}</div><div className={styles.flowRowCopy}><strong>{row.label}</strong><span>{row.cadence}</span></div><b className={row.status === "Variable" ? styles.positiveChange : styles.flowValue}>{row.status === "Variable" ? "+" : "−"}{formatUsd(row.value)}</b><span className={row.status === "Variable" ? styles.variableTag : styles.committedTag}>{row.status}</span></div>)}</div>
          <div className={styles.flowTotal}><span>Net 30D commitment</span><strong>$495k outflow</strong><span>after variable revenue</span></div>
        </section>
        <section className={styles.panel}>
          <div className={styles.panelHeader}><div><div className={styles.panelEyebrow}>BUFFER</div><h2>Reserve coverage</h2></div><ShieldCheck size={17} className={styles.iconMint} /></div>
          <div className={styles.bufferNumber}><strong>14.2</strong><span>months</span></div>
          <div className={styles.bufferTrack}><span style={{ width: "79%" }} /></div>
          <div className={styles.bufferLabels}><span>0 mo</span><span>18 mo policy target</span></div>
          <div className={styles.bufferCallout}><Sparkles size={14} /><span>Stable reserve covers 4.7 months of the plan before volatile assets are considered.</span></div>
        </section>
      </section>
    </>
  )
}

function PoliciesView() {
  return (
    <>
      <section className={styles.policyIntro}><div><div className={styles.panelEyebrow}>POLICY ENGINE</div><h2>Named limits, inspectable exceptions.</h2><p>Policies turn “treasury health” into rules a finance lead can review with signers.</p></div><button className={styles.outlineButton}><Settings2 size={15} /> Policy settings</button></section>
      <section className={styles.policyGrid}>{policyRows.map((policy) => <article className={styles.policyCard} key={policy.label}><div className={styles.policyCardHeader}><SignalTag severity={policy.status}>{severityLabel(policy.status)}</SignalTag><button className={styles.iconButton} aria-label={`${policy.label} options`}><MoreHorizontal size={16} /></button></div><h3>{policy.label}</h3><div className={styles.policyValues}><strong>{policy.current}</strong><span>{policy.target}</span></div><div className={styles.policyTrack}><span className={policy.status === "action" ? styles.policyFillCoral : policy.status === "watch" ? styles.policyFillAmber : styles.policyFillMint} style={{ width: `${Math.min(policy.value, 100)}%` }} /></div><p>{policy.detail}</p></article>)}</section>
      <section className={styles.policyFootnote}><ShieldAlert size={16} /><div><strong>Policy is advisory in this demo.</strong><span>It flags review work but cannot prevent or execute an on-chain transaction. A production version would map this state to Safe thresholds and signer workflows.</span></div></section>
    </>
  )
}

function ReportsView({ onPrepare }: { onPrepare: () => void }) {
  return (
    <>
      <section className={styles.reportHeader}><div><div className={styles.panelEyebrow}>WEEKLY TREASURY PULSE</div><h2>Prepared for signer review.</h2><p>Snapshot-based reporting keeps the as-of time, assumptions, open exceptions, and evidence together.</p></div><div className={styles.reportActions}><button className={styles.outlineButton} onClick={onPrepare}><Download size={15} /> Prepare export</button><button className={styles.primaryButton}><ExternalLink size={15} /> Share preview</button></div></section>
      <section className={styles.reportGrid}><article className={styles.reportPreview}><div className={styles.reportPreviewTop}><div className={styles.logoMarkSmall}><span /><span /><span /></div><div><strong>Cairn / Northstar Protocol</strong><span>Treasury Pulse · Week 29, 2026</span></div><span className={styles.demoPill}>SEEDED</span></div><div className={styles.reportSummary}><div><span>Covered NAV</span><strong>$7.84M</strong></div><div><span>Deployable</span><strong>$4.84M</strong></div><div><span>Runway</span><strong>14.2 mo</strong></div></div><div className={styles.reportBody}><div><span className={styles.reportLabel}>EXECUTIVE READOUT</span><p>Liquidity remains above the reserve floor in the base case. ARB concentration is 2.6pp over policy and one manual token position needs source review before the next signer round.</p></div><div><span className={styles.reportLabel}>OPEN ITEMS</span><div className={styles.reportBullet}><span className={styles.dotCoral} />Protocol token concentration</div><div className={styles.reportBullet}><span className={styles.dotAmber} />Manual position source review</div></div></div><div className={styles.reportFooter}><span>As of 16 Jul 2026 · 14:32 UTC</span><span>Source coverage 96%</span><span>Calculation v0.3-demo</span></div></article><aside className={styles.reportAside}><div className={styles.panelEyebrow}>REPORT CONTROLS</div><h3>Make every number defensible.</h3><p>Production exports will include source ids, observation timestamps, policy version, scenario inputs, and unresolved data gaps.</p><div className={styles.reportChecklist}><span><CheckCircle2 size={15} /> Snapshot timestamp</span><span><CheckCircle2 size={15} /> Evidence ledger</span><span><CheckCircle2 size={15} /> Scenario label</span><span><CircleAlert size={15} /> 2 open review items</span></div></aside></section>
    </>
  )
}

export default function CairnPage() {
  const [activeView, setActiveView] = useState<ViewKey>("overview")
  const [scenario, setScenario] = useState<ScenarioKey>("base")
  const [range, setRange] = useState<RangeKey>("30D")
  const [selectedAlert, setSelectedAlert] = useState<string | null>("arb-concentration")
  const [acknowledged, setAcknowledged] = useState<string[]>([])
  const [reviewed, setReviewed] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    let cancelled = false
    const restore = () => {
      try {
        const saved = window.localStorage.getItem("cairn-demo-review")
        if (saved && !cancelled) {
          const parsed = JSON.parse(saved) as { acknowledged?: string[]; reviewed?: boolean }
          setAcknowledged(Array.isArray(parsed.acknowledged) ? parsed.acknowledged : [])
          setReviewed(Boolean(parsed.reviewed))
        }
      } catch {
        // A seeded demo should remain usable even if storage is unavailable.
      } finally {
        if (!cancelled) setHydrated(true)
      }
    }
    const timeout = window.setTimeout(restore, 0)
    return () => {
      cancelled = true
      window.clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem("cairn-demo-review", JSON.stringify({ acknowledged, reviewed }))
    } catch {
      // Persistence is best-effort for the demo.
    }
  }, [acknowledged, hydrated, reviewed])

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(null), 3200)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const metrics = scenarioMetrics[scenario]
  const activeAlert = alerts.find((alert) => alert.id === selectedAlert) ?? null
  const selectedAsset = assets.find((asset) => asset.id === selectedAssetId) ?? null

  const announce = (message: string) => setNotice(message)
  const markReviewed = () => {
    setReviewed(true)
    announce("Workspace marked reviewed. The state is saved locally for this demo.")
  }
  const acknowledgeAlert = () => {
    if (!activeAlert) return
    setAcknowledged((current) => current.includes(activeAlert.id) ? current : [...current, activeAlert.id])
    announce("Signal acknowledged. It remains in the evidence ledger.")
  }

  return (
    <div className={styles.appShell}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.brandRow}><div className={styles.logoMark}><span /><span /><span /><span /></div><div><strong>cairn</strong><span>treasury control room</span></div><button className={`${styles.iconButton} ${styles.sidebarClose}`} onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><PanelLeftClose size={16} /></button></div>
        <button className={styles.workspaceSelect}><span className={styles.workspaceAvatar}>N</span><span><strong>Northstar Protocol</strong><small>Core treasury</small></span><ChevronDown size={15} /></button>
        <div className={styles.sideLabel}>WORKSPACE</div>
        <nav className={styles.nav} aria-label="Primary navigation">
          {navItems.map((item) => <button key={item.key} className={`${styles.navItem} ${activeView === item.key ? styles.navItemActive : ""}`} onClick={() => { setActiveView(item.key); setSidebarOpen(false) }} aria-current={activeView === item.key ? "page" : undefined}>{item.icon}<span>{item.label}</span>{item.key === "overview" && <span className={styles.navBadge}>2</span>}</button>)}
        </nav>
        <div className={styles.sideLabel}>TOOLS</div>
        <button className={styles.navItem} onClick={() => announce("Data source map is read-only in this demo.")}><Database size={16} /><span>Data sources</span></button>
        <button className={styles.navItem} onClick={() => announce("Settings are represented in the production PRD; no account data is changed here.")}><Settings2 size={16} /><span>Settings</span></button>
        <div className={styles.sidebarBottom}><div className={styles.securityCallout}><ShieldCheck size={16} /><div><strong>Read-only by default</strong><span>No keys or wallet access are requested.</span></div></div><div className={styles.sidebarUser}><span className={styles.userAvatar}>AL</span><div><strong>Alex Lee</strong><span>Finance lead</span></div><MoreHorizontal size={16} /></div></div>
      </aside>

      <div className={styles.mainArea}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}><button className={`${styles.iconButton} ${styles.mobileMenu}`} onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={18} /></button><div className={styles.mobileBrand}><div className={styles.logoMarkSmall}><span /><span /><span /></div><strong>cairn</strong></div><div className={styles.demoPill}><span className={styles.liveDot} /> SEEDED DEMO</div><span className={styles.topbarDivider} /><span className={styles.topbarTime}><Clock3 size={14} /> As of 16 Jul 2026 · 14:32 UTC</span></div>
          <div className={styles.topbarRight}><label className={styles.globalSearch}><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search assets, wallets…" aria-label="Search assets and wallets" /></label><button className={styles.topbarIcon} onClick={() => announce("2 open review items in the seeded snapshot.")} aria-label="View alerts"><Bell size={17} /><span>2</span></button><button className={styles.topbarReadOnly} onClick={() => announce("Read-only demo scope: public / seeded data only.")}><LockKeyhole size={14} /> Read-only</button><span className={styles.userAvatar}>AL</span></div>
        </header>

        <main className={styles.content}>
          <PageHeader activeView={activeView} reviewed={reviewed} onMarkReviewed={markReviewed} onReadOnly={() => announce("No wallet connection was made. This workspace is seeded and read-only.")} />
          {activeView === "overview" ? <Overview metrics={metrics} range={range} scenario={scenario} selectedAlert={activeAlert} acknowledged={acknowledged} onRangeChange={setRange} onScenarioChange={setScenario} onAlertSelect={setSelectedAlert} onAlertAcknowledge={acknowledgeAlert} onAlertClose={() => setSelectedAlert(null)} /> : null}
          {activeView === "positions" ? <PositionsView query={query} selectedAsset={selectedAsset} onSelectAsset={setSelectedAssetId} /> : null}
          {activeView === "flows" ? <FlowsView metrics={metrics} /> : null}
          {activeView === "policies" ? <PoliciesView /> : null}
          {activeView === "reports" ? <ReportsView onPrepare={() => announce("Demo export staged. No file was downloaded or shared.")} /> : null}
        </main>
      </div>
      {notice ? <div className={styles.toast} role="status"><Sparkles size={15} /><span>{notice}</span><button className={styles.toastClose} onClick={() => setNotice(null)} aria-label="Dismiss message"><X size={14} /></button></div> : null}
    </div>
  )
}
