"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleGauge,
  Clock3,
  Database,
  Download,
  Eye,
  EyeOff,
  FileCheck2,
  Filter,
  Landmark,
  LayoutDashboard,
  Layers3,
  LockKeyhole,
  RotateCcw,
  Save,
  Search,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  WalletCards,
  X,
  Zap,
} from "lucide-react"

import styles from "./dashboard.module.css"

type View = "command" | "positions" | "activity" | "controls"
type ScenarioPreset = "base" | "shock" | "custom"
type DecisionStatus = "open" | "reviewing"
type LiquidityTier = "T0" | "T1" | "T2" | "Restricted"

type Scenario = {
  depeg: number
  drawdown: number
  outflow: number
}

type Decision = {
  id: string
  severity: "high" | "watch" | "info"
  title: string
  description: string
  impact: string
  due: string
  source: string
  action: string
}

type Position = {
  asset: string
  name: string
  issuer: string
  account: string
  address: string
  chain: string
  quantity: string
  value: number
  share: number
  change: number
  tier: LiquidityTier
  eligible: number
  sourceAge: string
  accent: string
}

const NAV_ITEMS = [
  { id: "command" as const, label: "Command", icon: LayoutDashboard },
  { id: "positions" as const, label: "Positions", icon: WalletCards },
  { id: "activity" as const, label: "Activity", icon: Activity },
  { id: "controls" as const, label: "Controls", icon: ShieldCheck },
]

const DECISIONS: Decision[] = [
  {
    id: "issuer-concentration",
    severity: "high",
    title: "USDC issuer exposure is above policy",
    description:
      "64% of operating liquidity is linked to one issuer; policy maximum is 50%.",
    impact: "$676k above limit",
    due: "Review today",
    source: "Balances 42s · price 36s",
    action: "Model a $650k diversification",
  },
  {
    id: "payroll-window",
    severity: "watch",
    title: "Payroll funding window opens in 8 days",
    description:
      "$480k is committed. The Ops Safe has $312k of T0 liquidity on Base.",
    impact: "$168k funding gap",
    due: "Due 24 Jul",
    source: "Obligations synced 18m",
    action: "Prepare internal transfer",
  },
  {
    id: "stale-feed",
    severity: "info",
    title: "One enrichment source is degraded",
    description:
      "The Solana vesting estimate is 74 minutes old and excluded from liquid value.",
    impact: "$86k excluded",
    due: "Watching",
    source: "Last good snapshot 07:26 UTC",
    action: "Inspect source status",
  },
]

const POSITIONS: Position[] = [
  {
    asset: "USDC",
    name: "USD Coin",
    issuer: "Circle",
    account: "Operating Safe",
    address: "0x71F2…9A40",
    chain: "Base",
    quantity: "1,842,000.00",
    value: 1842000,
    share: 38.2,
    change: 0.01,
    tier: "T0",
    eligible: 100,
    sourceAge: "42 sec",
    accent: "#6fe7c8",
  },
  {
    asset: "USDC",
    name: "USD Coin",
    issuer: "Circle",
    account: "Reserve Safe",
    address: "0xA884…D032",
    chain: "Ethereum",
    quantity: "1,244,000.00",
    value: 1244000,
    share: 25.8,
    change: 0.01,
    tier: "T0",
    eligible: 100,
    sourceAge: "1 min",
    accent: "#6fe7c8",
  },
  {
    asset: "USDT",
    name: "Tether USD",
    issuer: "Tether",
    account: "Vendor Safe",
    address: "0x18C2…10BE",
    chain: "Arbitrum",
    quantity: "712,400.00",
    value: 712400,
    share: 14.8,
    change: -0.03,
    tier: "T0",
    eligible: 90,
    sourceAge: "58 sec",
    accent: "#55c8a3",
  },
  {
    asset: "ETH",
    name: "Ether",
    issuer: "Native",
    account: "Reserve Safe",
    address: "0xA884…D032",
    chain: "Ethereum",
    quantity: "148.27",
    value: 476200,
    share: 9.9,
    change: -2.84,
    tier: "T0",
    eligible: 65,
    sourceAge: "36 sec",
    accent: "#9e98ff",
  },
  {
    asset: "USDC",
    name: "Aave USDC supply",
    issuer: "Circle / Aave",
    account: "Reserve Safe",
    address: "0xA884…D032",
    chain: "Base",
    quantity: "328,000.00",
    value: 328000,
    share: 6.8,
    change: 0.01,
    tier: "T1",
    eligible: 85,
    sourceAge: "11 min",
    accent: "#75d7ee",
  },
  {
    asset: "ARB",
    name: "Arbitrum",
    issuer: "Arbitrum DAO",
    account: "Grants Safe",
    address: "0x90E4…7B2C",
    chain: "Arbitrum",
    quantity: "326,000.00",
    value: 132300,
    share: 2.7,
    change: -4.16,
    tier: "T2",
    eligible: 40,
    sourceAge: "2 min",
    accent: "#68a8ef",
  },
  {
    asset: "STRM",
    name: "Vested ecosystem token",
    issuer: "Stream Labs",
    account: "Foundation",
    address: "7YpQ…fH8d",
    chain: "Solana",
    quantity: "410,000.00",
    value: 86000,
    share: 1.8,
    change: -6.2,
    tier: "Restricted",
    eligible: 0,
    sourceAge: "74 min",
    accent: "#d7a85c",
  },
]

const ACTIVITY_ITEMS = [
  {
    time: "08:39",
    title: "Policy measurement refreshed",
    detail: "Issuer concentration recalculated from 7 positions",
    type: "system",
  },
  {
    time: "08:22",
    title: "Payroll obligation updated",
    detail: "People Ops · Jul payroll · $480,000 committed",
    type: "obligation",
  },
  {
    time: "Yesterday",
    title: "Transaction executed",
    detail: "Operating Safe → Vendor Safe · 86,500 USDC · Base",
    type: "transaction",
  },
  {
    time: "Yesterday",
    title: "Scenario saved",
    detail: "Board downside case · 8% market drawdown · $250k outflow",
    type: "scenario",
  },
  {
    time: "14 Jul",
    title: "Signer threshold changed",
    detail: "Grants Safe · 2/4 → 3/5 · confirmed on Arbitrum",
    type: "security",
  },
]

const POLICIES = [
  {
    name: "Single issuer concentration",
    scope: "Operating liquidity",
    threshold: "≤ 50%",
    current: "64%",
    state: "Breached",
    changed: "Edited 12 Jun by Maya",
  },
  {
    name: "90-day committed coverage",
    scope: "T0–T2 eligible assets",
    threshold: "≥ 1.5×",
    current: "2.7×",
    state: "Passing",
    changed: "Template · Core treasury",
  },
  {
    name: "Wallet signer resilience",
    scope: "All material Safes",
    threshold: "≥ 3 owners / threshold ≥ 2",
    current: "4 of 4 pass",
    state: "Passing",
    changed: "Checked 1 min ago",
  },
  {
    name: "Critical source freshness",
    scope: "Balances and prices",
    threshold: "< 5 minutes",
    current: "42 seconds",
    state: "Passing",
    changed: "Checked 42 sec ago",
  },
  {
    name: "Enriched position freshness",
    scope: "DeFi and vesting",
    threshold: "< 60 minutes",
    current: "74 minutes",
    state: "Watching",
    changed: "Solana enrichment degraded",
  },
]

const BASE_SERIES = [4.23, 4.17, 4.11, 3.79, 3.63, 3.44, 3.29]

function money(value: number, decimals = 2) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(decimals)}m`
  if (value >= 1_000) return `$${Math.round(value / 1_000)}k`
  return `$${Math.round(value)}`
}

function pct(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`
}

function scenarioFromPreset(preset: ScenarioPreset): Scenario {
  if (preset === "shock") return { depeg: 4, drawdown: 18, outflow: 350 }
  return { depeg: 0.4, drawdown: 8, outflow: 120 }
}

export default function Dashboard() {
  const [view, setView] = useState<View>("command")
  const [scenarioOpen, setScenarioOpen] = useState(false)
  const [preset, setPreset] = useState<ScenarioPreset>("base")
  const [scenario, setScenario] = useState<Scenario>(scenarioFromPreset("base"))
  const [decisionStatuses, setDecisionStatuses] = useState<
    Record<string, DecisionStatus>
  >({})
  const [riskFocus, setRiskFocus] = useState(false)
  const [positionFilter, setPositionFilter] = useState("All positions")
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    const restore = window.setTimeout(() => {
      try {
        const savedScenario = window.localStorage.getItem("northstar-scenario")
        const savedStatuses = window.localStorage.getItem("northstar-decisions")
        if (savedScenario) {
          const parsed = JSON.parse(savedScenario) as {
            scenario: Scenario
            savedAt: string
          }
          setScenario(parsed.scenario)
          setSavedAt(parsed.savedAt)
          setPreset("custom")
        }
        if (savedStatuses) {
          setDecisionStatuses(
            JSON.parse(savedStatuses) as Record<string, DecisionStatus>
          )
        }
      } catch {
        // The seeded demo remains fully usable if storage is unavailable.
      }
    }, 0)
    return () => window.clearTimeout(restore)
  }, [])

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(null), 2600)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const metrics = useMemo(() => {
    const stablecoinValue = 4.1264
    const volatileValue = 0.6085
    const restricted = 0.086
    const eligibleBase = 4.23
    const depegLoss = stablecoinValue * (scenario.depeg / 100)
    const drawdownLoss = volatileValue * (scenario.drawdown / 100)
    const outflowLoss = scenario.outflow / 1000
    const stressed = Math.max(
      0,
      eligibleBase - depegLoss - drawdownLoss - outflowLoss
    )
    const runway = stressed / 0.381
    const coverage = stressed / 1.41
    const delta = eligibleBase - stressed
    const health = Math.max(
      34,
      Math.round(
        78 -
          scenario.depeg * 2.2 -
          scenario.drawdown * 0.18 -
          scenario.outflow * 0.018
      )
    )
    const stressSeries = BASE_SERIES.map((value, index) => {
      const fraction = index / (BASE_SERIES.length - 1)
      return Math.max(0.2, value - delta * (0.25 + fraction * 0.75))
    })
    return {
      observed: stablecoinValue + volatileValue + restricted,
      eligibleBase,
      stressed,
      runway,
      coverage,
      delta,
      health,
      stressSeries,
    }
  }, [scenario])

  const filteredDecisions = riskFocus
    ? DECISIONS.filter((item) => item.severity !== "info")
    : DECISIONS

  const filteredPositions = POSITIONS.filter((position) => {
    if (positionFilter === "All positions") return true
    if (positionFilter === "Stablecoins")
      return position.asset === "USDC" || position.asset === "USDT"
    if (positionFilter === "T0 liquid") return position.tier === "T0"
    if (positionFilter === "Attention")
      return position.eligible < 80 || position.sourceAge.includes("74")
    return true
  })

  function choosePreset(next: ScenarioPreset) {
    setPreset(next)
    if (next !== "custom") setScenario(scenarioFromPreset(next))
  }

  function updateScenario(key: keyof Scenario, value: number) {
    setPreset("custom")
    setScenario((current) => ({ ...current, [key]: value }))
  }

  function saveScenario() {
    const timestamp = new Date().toISOString()
    setSavedAt(timestamp)
    try {
      window.localStorage.setItem(
        "northstar-scenario",
        JSON.stringify({ scenario, savedAt: timestamp })
      )
    } catch {
      // Do not block the workflow when browser storage is unavailable.
    }
    setNotice("Custom scenario saved locally")
  }

  function resetScenario() {
    setPreset("base")
    setScenario(scenarioFromPreset("base"))
    setSavedAt(null)
    try {
      window.localStorage.removeItem("northstar-scenario")
    } catch {
      // Keep the visible reset even when storage is unavailable.
    }
    setNotice("Scenario reset to seeded base")
  }

  function reviewDecision(id: string) {
    const updated = { ...decisionStatuses, [id]: "reviewing" as const }
    setDecisionStatuses(updated)
    try {
      window.localStorage.setItem(
        "northstar-decisions",
        JSON.stringify(updated)
      )
    } catch {
      // Visible state still updates for the current session.
    }
    setNotice("Decision marked as reviewing")
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>
            <Sparkles size={17} strokeWidth={2.2} />
          </div>
          <div>
            <strong>Northstar</strong>
            <span>Treasury command</span>
          </div>
        </div>

        <nav className={styles.sideNav} aria-label="Primary">
          <span className={styles.navLabel}>Workspace</span>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <button
                className={`${styles.navItem} ${
                  view === item.id ? styles.navItemActive : ""
                }`}
                key={item.id}
                onClick={() => setView(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.id === "command" && (
                  <span className={styles.navCount}>3</span>
                )}
              </button>
            )
          })}
        </nav>

        <div className={styles.sidebarFoot}>
          <div className={styles.sourcePulse}>
            <span className={styles.pulseDot} />
            <div>
              <strong>4 of 5 sources fresh</strong>
              <span>1 enrichment delayed</span>
            </div>
          </div>
          <button className={styles.orgSwitcher}>
            <span className={styles.orgAvatar}>NL</span>
            <span>
              <strong>Northstar Labs</strong>
              <small>Core treasury</small>
            </span>
            <ChevronDown size={15} />
          </button>
          <div className={styles.demoFoot}>
            <LockKeyhole size={13} />
            Read-only seeded workspace
          </div>
        </div>
      </aside>

      <div className={styles.page}>
        <header className={styles.topbar}>
          <div className={styles.mobileBrand}>
            <span className={styles.brandMark}>
              <Sparkles size={16} />
            </span>
            <strong>Northstar</strong>
          </div>
          <div className={styles.breadcrumb}>
            <span>Northstar Labs</span>
            <span>/</span>
            <strong>{NAV_ITEMS.find((item) => item.id === view)?.label}</strong>
          </div>
          <div className={styles.topActions}>
            <button className={styles.searchButton} aria-label="Search">
              <Search size={16} />
              <span>Search</span>
              <kbd>⌘ K</kbd>
            </button>
            <button
              className={`${styles.iconButton} ${styles.bellButton}`}
              aria-label="Notifications"
            >
              <Bell size={17} />
              <span />
            </button>
            <button
              className={styles.stressButton}
              onClick={() => setScenarioOpen(true)}
            >
              <SlidersHorizontal size={16} />
              Stress lab
            </button>
            <span className={styles.userAvatar}>MC</span>
          </div>
        </header>

        <div className={styles.contextBar}>
          <div className={styles.demoBadge}>
            <span />
            Seeded demo
          </div>
          <span>Snapshot 16 Jul 2026 · 08:40 UTC</span>
          <span className={styles.contextDivider} />
          <button className={styles.contextLink}>
            <Database size={13} />
            Sources &amp; freshness
          </button>
          {preset !== "base" && (
            <span className={styles.modeBadge}>
              <Zap size={12} />
              Modeled stress active
            </span>
          )}
        </div>

        <main className={styles.main}>
          {view === "command" && (
            <CommandView
              metrics={metrics}
              scenario={scenario}
              preset={preset}
              choosePreset={choosePreset}
              scenarioOpen={scenarioOpen}
              setScenarioOpen={setScenarioOpen}
              updateScenario={updateScenario}
              saveScenario={saveScenario}
              resetScenario={resetScenario}
              savedAt={savedAt}
              decisions={filteredDecisions}
              decisionStatuses={decisionStatuses}
              reviewDecision={reviewDecision}
              riskFocus={riskFocus}
              setRiskFocus={setRiskFocus}
            />
          )}
          {view === "positions" && (
            <PositionsView
              positions={filteredPositions}
              filter={positionFilter}
              setFilter={setPositionFilter}
            />
          )}
          {view === "activity" && <ActivityView />}
          {view === "controls" && <ControlsView />}
        </main>
      </div>

      <nav className={styles.bottomNav} aria-label="Mobile primary">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <button
              className={view === item.id ? styles.bottomNavActive : ""}
              key={item.id}
              onClick={() => setView(item.id)}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {notice && (
        <div className={styles.toast} role="status">
          <CheckCircle2 size={17} />
          {notice}
        </div>
      )}
    </div>
  )
}

function CommandView({
  metrics,
  scenario,
  preset,
  choosePreset,
  scenarioOpen,
  setScenarioOpen,
  updateScenario,
  saveScenario,
  resetScenario,
  savedAt,
  decisions,
  decisionStatuses,
  reviewDecision,
  riskFocus,
  setRiskFocus,
}: {
  metrics: {
    observed: number
    eligibleBase: number
    stressed: number
    runway: number
    coverage: number
    delta: number
    health: number
    stressSeries: number[]
  }
  scenario: Scenario
  preset: ScenarioPreset
  choosePreset: (preset: ScenarioPreset) => void
  scenarioOpen: boolean
  setScenarioOpen: (open: boolean) => void
  updateScenario: (key: keyof Scenario, value: number) => void
  saveScenario: () => void
  resetScenario: () => void
  savedAt: string | null
  decisions: Decision[]
  decisionStatuses: Record<string, DecisionStatus>
  reviewDecision: (id: string) => void
  riskFocus: boolean
  setRiskFocus: (focus: boolean) => void
}) {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Today&apos;s operating position
          </div>
          <h1>
            Treasury can fund <span>{metrics.runway.toFixed(1)} months</span>{" "}
            under this scenario.
          </h1>
          <p>
            Base runway is 14.2 months. The selected assumptions reduce eligible
            resources by <strong>{money(metrics.delta * 1_000_000)}</strong>,
            while the next 90 days remain covered at{" "}
            <strong>{metrics.coverage.toFixed(1)}×</strong>.
          </p>
          <div className={styles.heroActions}>
            <button
              className={styles.primaryButton}
              onClick={() => setScenarioOpen(true)}
            >
              <SlidersHorizontal size={16} />
              Test assumptions
            </button>
            <button className={styles.secondaryButton}>
              <Download size={16} />
              Export brief
            </button>
          </div>
        </div>
        <div className={styles.healthCard}>
          <div className={styles.healthTop}>
            <div>
              <span>Control posture</span>
              <strong>{metrics.health}</strong>
              <small>/100</small>
            </div>
            <HealthGauge value={metrics.health} />
          </div>
          <div className={styles.healthRows}>
            <span>
              <CheckCircle2 size={14} /> 90-day coverage passes
            </span>
            <span className={styles.healthWarn}>
              <AlertTriangle size={14} /> 1 concentration breach
            </span>
            <span>
              <ShieldCheck size={14} /> 4 signer sets resilient
            </span>
          </div>
          <button className={styles.textButton}>
            How this is scored <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <section className={styles.metricGrid} aria-label="Treasury summary">
        <MetricCard
          label="Observed treasury"
          value={money(metrics.observed * 1_000_000)}
          note="Across 4 accounts · 3 chains"
          icon={<Landmark size={17} />}
        />
        <MetricCard
          label="Policy-adjusted liquid"
          value={money(metrics.stressed * 1_000_000)}
          note={`${money(metrics.delta * 1_000_000)} modeled reduction`}
          icon={<Layers3 size={17} />}
          trend="down"
        />
        <MetricCard
          label="90-day commitments"
          value="$1.41m"
          note="Payroll · grants · vendors"
          icon={<CalendarClock size={17} />}
        />
        <MetricCard
          label="Next funding action"
          value="$168k"
          note="Move to Ops Safe by 24 Jul"
          icon={<ArrowUpRight size={17} />}
          action
        />
      </section>

      <section className={styles.commandGrid}>
        <div className={`${styles.panel} ${styles.decisionsPanel}`}>
          <div className={styles.panelHeader}>
            <div>
              <div className={styles.panelTitleRow}>
                <h2>Decision queue</h2>
                <span className={styles.countBadge}>{decisions.length}</span>
              </div>
              <p>Ranked by policy impact and time sensitivity</p>
            </div>
            <button
              className={`${styles.focusToggle} ${
                riskFocus ? styles.focusToggleActive : ""
              }`}
              aria-pressed={riskFocus}
              onClick={() => setRiskFocus(!riskFocus)}
            >
              {riskFocus ? <EyeOff size={14} /> : <Eye size={14} />}
              Risk focus
            </button>
          </div>

          <div className={styles.decisionList}>
            {decisions.map((decision) => {
              const reviewing = decisionStatuses[decision.id] === "reviewing"
              return (
                <article className={styles.decision} key={decision.id}>
                  <div
                    className={`${styles.severityIcon} ${
                      styles[`severity_${decision.severity}`]
                    }`}
                  >
                    {decision.severity === "high" ? (
                      <ShieldAlert size={17} />
                    ) : decision.severity === "watch" ? (
                      <Clock3 size={17} />
                    ) : (
                      <Database size={16} />
                    )}
                  </div>
                  <div className={styles.decisionBody}>
                    <div className={styles.decisionTop}>
                      <div>
                        <div className={styles.decisionTitleRow}>
                          <h3>{decision.title}</h3>
                          {reviewing && (
                            <span className={styles.reviewingBadge}>
                              <Check size={11} /> Reviewing
                            </span>
                          )}
                        </div>
                        <p>{decision.description}</p>
                      </div>
                      <span
                        className={`${styles.severityLabel} ${
                          styles[`label_${decision.severity}`]
                        }`}
                      >
                        {decision.severity}
                      </span>
                    </div>
                    <div className={styles.decisionMeta}>
                      <strong>{decision.impact}</strong>
                      <span>{decision.due}</span>
                      <span>{decision.source}</span>
                    </div>
                    <div className={styles.decisionActions}>
                      <button className={styles.actionLink}>
                        {decision.action} <ArrowRight size={14} />
                      </button>
                      {!reviewing && (
                        <button
                          className={styles.reviewButton}
                          onClick={() => reviewDecision(decision.id)}
                        >
                          Mark reviewing
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className={`${styles.panel} ${styles.chartPanel}`}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Liquidity trajectory</h2>
              <p>Policy-adjusted resources after scheduled obligations</p>
            </div>
            <div className={styles.rangePicker}>
              <button>30d</button>
              <button className={styles.rangeActive}>90d</button>
              <button>180d</button>
            </div>
          </div>
          <LiquidityChart stressSeries={metrics.stressSeries} />
          <div className={styles.chartFooter}>
            <div>
              <span className={styles.legendBase} />
              Base plan
              <strong>$3.29m</strong>
            </div>
            <div>
              <span className={styles.legendStress} />
              Selected stress
              <strong>{money(metrics.stressSeries[6] * 1_000_000)}</strong>
            </div>
            <span>Minimum buffer: $1.25m</span>
          </div>
        </div>
      </section>

      <section className={styles.lowerGrid}>
        <div className={`${styles.panel} ${styles.liquidityPanel}`}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Liquidity ladder</h2>
              <p>How quickly operating resources can be mobilized</p>
            </div>
            <button className={styles.iconButton} aria-label="More options">
              <Settings2 size={16} />
            </button>
          </div>
          <div className={styles.liquidityTotal}>
            <div>
              <span>Eligible within 7 days</span>
              <strong>$4.23m</strong>
            </div>
            <span className={styles.passBadge}>
              <CheckCircle2 size={12} /> 3.0× commitments
            </span>
          </div>
          <div className={styles.liquidityBar} aria-label="Liquidity by tier">
            <span style={{ width: "72%" }} />
            <span style={{ width: "13%" }} />
            <span style={{ width: "10%" }} />
            <span style={{ width: "5%" }} />
          </div>
          <div className={styles.liquidityLegend}>
            <LiquidityLegend label="T0 · now" value="$3.04m" color="mint" />
            <LiquidityLegend label="T1 · ≤1 day" value="$548k" color="blue" />
            <LiquidityLegend
              label="T2 · ≤7 days"
              value="$421k"
              color="violet"
            />
            <LiquidityLegend label="Restricted" value="$221k" color="gray" />
          </div>
        </div>

        <div className={`${styles.panel} ${styles.concentrationPanel}`}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Stablecoin concentration</h2>
              <p>Grouped by canonical asset and issuer</p>
            </div>
            <span className={styles.policyPill}>Policy max 50%</span>
          </div>
          <div className={styles.assetRows}>
            <AssetBar
              symbol="USDC"
              issuer="Circle · fiat-backed"
              value="$3.09m"
              share={64}
              tone="coral"
              price="$0.9998"
            />
            <AssetBar
              symbol="USDT"
              issuer="Tether · fiat-backed"
              value="$712k"
              share={14.8}
              tone="mint"
              price="$0.9993"
            />
            <AssetBar
              symbol="Other"
              issuer="Non-stable operating assets"
              value="$1.02m"
              share={21.2}
              tone="violet"
              price="Market-priced"
            />
          </div>
          <div className={styles.provenanceNote}>
            <Database size={14} />
            Demo prices are seeded observations, not live quotes.
          </div>
        </div>
      </section>

      <ScenarioPanel
        open={scenarioOpen}
        setOpen={setScenarioOpen}
        scenario={scenario}
        preset={preset}
        choosePreset={choosePreset}
        updateScenario={updateScenario}
        metrics={metrics}
        saveScenario={saveScenario}
        resetScenario={resetScenario}
        savedAt={savedAt}
      />
    </>
  )
}

function MetricCard({
  label,
  value,
  note,
  icon,
  trend,
  action,
}: {
  label: string
  value: string
  note: string
  icon: React.ReactNode
  trend?: "down"
  action?: boolean
}) {
  return (
    <article className={styles.metricCard}>
      <div className={styles.metricTop}>
        <span className={styles.metricIcon}>{icon}</span>
        {trend && (
          <span className={styles.metricTrend}>
            <ArrowDownRight size={13} /> scenario
          </span>
        )}
        {action && <span className={styles.actionBadge}>Action</span>}
      </div>
      <span className={styles.metricLabel}>{label}</span>
      <strong className={styles.metricValue}>{value}</strong>
      <span className={styles.metricNote}>{note}</span>
    </article>
  )
}

function HealthGauge({ value }: { value: number }) {
  const radius = 31
  const circumference = 2 * Math.PI * radius
  const progress = (value / 100) * circumference
  return (
    <svg
      className={styles.gauge}
      viewBox="0 0 80 80"
      role="img"
      aria-label={`Control posture score ${value} out of 100`}
    >
      <circle cx="40" cy="40" r={radius} className={styles.gaugeTrack} />
      <circle
        cx="40"
        cy="40"
        r={radius}
        className={styles.gaugeValue}
        strokeDasharray={`${progress} ${circumference - progress}`}
      />
      <CircleGauge x="31" y="31" width="18" height="18" />
    </svg>
  )
}

function LiquidityChart({ stressSeries }: { stressSeries: number[] }) {
  const width = 660
  const height = 250
  const padX = 42
  const padY = 22
  const min = 0.8
  const max = 4.5
  const labels = ["Now", "14d", "30d", "45d", "60d", "75d", "90d"]
  const pointsFor = (series: number[]) =>
    series
      .map((value, index) => {
        const x = padX + (index / (series.length - 1)) * (width - padX * 2)
        const y =
          padY + ((max - value) / (max - min)) * (height - padY * 2 - 20)
        return `${x},${y}`
      })
      .join(" ")
  const stressPoints = pointsFor(stressSeries)
  const basePoints = pointsFor(BASE_SERIES)
  const stressArea = `${padX},${height - 32} ${stressPoints} ${
    width - padX
  },${height - 32}`
  const bufferY = padY + ((max - 1.25) / (max - min)) * (height - padY * 2 - 20)

  return (
    <div className={styles.chartWrap}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby="liquidity-title liquidity-desc"
      >
        <title id="liquidity-title">Ninety-day liquidity trajectory</title>
        <desc id="liquidity-desc">
          Base resources decline from 4.23 million dollars to 3.29 million. The
          stress line is lower according to the selected scenario.
        </desc>
        <defs>
          <linearGradient id="stress-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#e6a96f" stopOpacity=".22" />
            <stop offset="100%" stopColor="#e6a96f" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[1.25, 2, 3, 4].map((value) => {
          const y =
            padY + ((max - value) / (max - min)) * (height - padY * 2 - 20)
          return (
            <g key={value}>
              <line
                x1={padX}
                x2={width - padX}
                y1={y}
                y2={y}
                className={styles.gridLine}
              />
              <text x="4" y={y + 4} className={styles.chartAxis}>
                ${value}m
              </text>
            </g>
          )
        })}
        <line
          x1={padX}
          x2={width - padX}
          y1={bufferY}
          y2={bufferY}
          className={styles.bufferLine}
        />
        <polygon points={stressArea} fill="url(#stress-fill)" />
        <polyline points={basePoints} className={styles.baseLine} />
        <polyline points={stressPoints} className={styles.stressLine} />
        {stressSeries.map((value, index) => {
          const x =
            padX + (index / (stressSeries.length - 1)) * (width - padX * 2)
          const y =
            padY + ((max - value) / (max - min)) * (height - padY * 2 - 20)
          return (
            <circle
              key={labels[index]}
              cx={x}
              cy={y}
              r={index === stressSeries.length - 1 ? 4 : 2.4}
              className={styles.chartPoint}
            />
          )
        })}
        {labels.map((label, index) => {
          const x = padX + (index / (labels.length - 1)) * (width - padX * 2)
          return (
            <text
              key={label}
              x={x}
              y={height - 9}
              textAnchor="middle"
              className={styles.chartAxis}
            >
              {label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

function LiquidityLegend({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  return (
    <div className={styles.liquidityLegendItem}>
      <span className={styles[`dot_${color}`]} />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  )
}

function AssetBar({
  symbol,
  issuer,
  value,
  share,
  tone,
  price,
}: {
  symbol: string
  issuer: string
  value: string
  share: number
  tone: string
  price: string
}) {
  return (
    <div className={styles.assetRow}>
      <div className={styles.assetIdentity}>
        <span className={styles.assetCoin}>{symbol.slice(0, 1)}</span>
        <div>
          <strong>{symbol}</strong>
          <span>{issuer}</span>
        </div>
      </div>
      <div className={styles.assetNumbers}>
        <strong>{value}</strong>
        <span>
          {share}% · {price}
        </span>
      </div>
      <div className={styles.assetTrack}>
        <span
          className={styles[`bar_${tone}`]}
          style={{ width: `${Math.min(100, share)}%` }}
        />
        <i style={{ left: "50%" }} />
      </div>
    </div>
  )
}

function ScenarioPanel({
  open,
  setOpen,
  scenario,
  preset,
  choosePreset,
  updateScenario,
  metrics,
  saveScenario,
  resetScenario,
  savedAt,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  scenario: Scenario
  preset: ScenarioPreset
  choosePreset: (preset: ScenarioPreset) => void
  updateScenario: (key: keyof Scenario, value: number) => void
  metrics: {
    stressed: number
    runway: number
    coverage: number
    delta: number
    health: number
  }
  saveScenario: () => void
  resetScenario: () => void
  savedAt: string | null
}) {
  if (!open) {
    return (
      <button
        className={styles.scenarioRail}
        onClick={() => setOpen(true)}
        aria-label="Open stress lab"
      >
        <Zap size={15} />
        <span>
          Selected stress
          <strong>{metrics.runway.toFixed(1)} mo runway</strong>
        </span>
        <ArrowUpRight size={14} />
      </button>
    )
  }

  return (
    <>
      <button
        className={styles.drawerBackdrop}
        aria-label="Close stress lab"
        onClick={() => setOpen(false)}
      />
      <aside className={styles.scenarioPanel} aria-label="Stress lab">
        <div className={styles.scenarioHeader}>
          <div>
            <span className={styles.scenarioEyebrow}>
              <Zap size={13} /> Modeled, not observed
            </span>
            <h2>Stress lab</h2>
            <p>Test operating resilience without changing seeded balances.</p>
          </div>
          <button
            className={styles.iconButton}
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>

        <div className={styles.presetTabs}>
          {(["base", "shock", "custom"] as ScenarioPreset[]).map((item) => (
            <button
              key={item}
              className={preset === item ? styles.presetActive : ""}
              onClick={() => choosePreset(item)}
              aria-pressed={preset === item}
            >
              {item === "base"
                ? "Planning"
                : item === "shock"
                  ? "Market shock"
                  : "Custom"}
            </button>
          ))}
        </div>

        <div className={styles.scenarioResult} aria-live="polite">
          <div>
            <span>Policy-adjusted liquid</span>
            <strong>{money(metrics.stressed * 1_000_000)}</strong>
            <small>−{money(metrics.delta * 1_000_000)} vs observed plan</small>
          </div>
          <div className={styles.runwayOrb}>
            <span>Runway</span>
            <strong>{metrics.runway.toFixed(1)}</strong>
            <small>months</small>
          </div>
        </div>

        <div className={styles.assumptions}>
          <ScenarioSlider
            label="Stablecoin depeg"
            detail="Applied to USDC and USDT exposure"
            value={scenario.depeg}
            min={0}
            max={12}
            step={0.2}
            suffix="%"
            onChange={(value) => updateScenario("depeg", value)}
          />
          <ScenarioSlider
            label="Market drawdown"
            detail="Applied to volatile liquid assets"
            value={scenario.drawdown}
            min={0}
            max={45}
            step={1}
            suffix="%"
            onChange={(value) => updateScenario("drawdown", value)}
          />
          <ScenarioSlider
            label="Unexpected 30-day outflow"
            detail="Incremental to scheduled obligations"
            value={scenario.outflow}
            min={0}
            max={800}
            step={10}
            prefix="$"
            suffix="k"
            onChange={(value) => updateScenario("outflow", value)}
          />
        </div>

        <div className={styles.scenarioChecks}>
          <div>
            <span>90-day coverage</span>
            <strong>{metrics.coverage.toFixed(1)}×</strong>
            <small
              className={
                metrics.coverage >= 1.5 ? styles.checkPass : styles.checkFail
              }
            >
              {metrics.coverage >= 1.5 ? "Passes ≥1.5×" : "Below 1.5× policy"}
            </small>
          </div>
          <div>
            <span>Control posture</span>
            <strong>{metrics.health}/100</strong>
            <small>Modeled score</small>
          </div>
        </div>

        <div className={styles.scenarioDisclosure}>
          <AlertTriangle size={15} />
          <p>
            This simplified demo does not model market depth, redemption queues,
            bridge availability, taxes or price correlation.
          </p>
        </div>

        <div className={styles.scenarioFooter}>
          <button className={styles.resetButton} onClick={resetScenario}>
            <RotateCcw size={15} /> Reset
          </button>
          <button className={styles.saveButton} onClick={saveScenario}>
            <Save size={15} /> Save scenario
          </button>
        </div>
        {savedAt && (
          <span className={styles.savedStamp}>
            Saved locally {new Date(savedAt).toLocaleString()}
          </span>
        )}
      </aside>
    </>
  )
}

function ScenarioSlider({
  label,
  detail,
  value,
  min,
  max,
  step,
  prefix = "",
  suffix,
  onChange,
}: {
  label: string
  detail: string
  value: number
  min: number
  max: number
  step: number
  prefix?: string
  suffix: string
  onChange: (value: number) => void
}) {
  const progress = ((value - min) / (max - min)) * 100
  return (
    <label className={styles.sliderGroup}>
      <div className={styles.sliderHeader}>
        <span>
          <strong>{label}</strong>
          <small>{detail}</small>
        </span>
        <output>
          {prefix}
          {value}
          {suffix}
        </output>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ "--range-progress": `${progress}%` } as React.CSSProperties}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className={styles.sliderLimits}>
        <span>
          {prefix}
          {min}
          {suffix}
        </span>
        <span>
          {prefix}
          {max}
          {suffix}
        </span>
      </div>
    </label>
  )
}

function PositionsView({
  positions,
  filter,
  setFilter,
}: {
  positions: Position[]
  filter: string
  setFilter: (filter: string) => void
}) {
  const filters = ["All positions", "Stablecoins", "T0 liquid", "Attention"]
  return (
    <section className={styles.viewSection}>
      <div className={styles.viewHeading}>
        <div>
          <span className={styles.eyebrow}>Canonical exposure</span>
          <h1>Positions</h1>
          <p>
            Seven seeded positions normalized across accounts, chains and
            liquidity constraints.
          </p>
        </div>
        <button className={styles.secondaryButton}>
          <Download size={15} /> Export snapshot
        </button>
      </div>

      <div className={styles.positionSummary}>
        <div>
          <span>Observed value</span>
          <strong>$4.82m</strong>
          <small>Seeded snapshot</small>
        </div>
        <div>
          <span>Stablecoin exposure</span>
          <strong>85.6%</strong>
          <small>Across 3 accounts</small>
        </div>
        <div>
          <span>Immediately liquid</span>
          <strong>$3.96m</strong>
          <small>T0 before policy haircuts</small>
        </div>
        <div>
          <span>Excluded / restricted</span>
          <strong>$86k</strong>
          <small>Stale enrichment</small>
        </div>
      </div>

      <div className={`${styles.panel} ${styles.positionsPanel}`}>
        <div className={styles.tableToolbar}>
          <div className={styles.filterTabs}>
            {filters.map((item) => (
              <button
                key={item}
                className={filter === item ? styles.filterActive : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <button className={styles.toolbarButton}>
            <Filter size={14} /> More filters
          </button>
        </div>
        <div className={styles.positionTable} role="table">
          <div className={styles.positionHead} role="row">
            <span>Asset / position</span>
            <span>Location</span>
            <span>Quantity</span>
            <span>Value</span>
            <span>Liquidity</span>
            <span>Eligibility</span>
            <span>Source</span>
          </div>
          {positions.map((position, index) => (
            <div
              className={styles.positionRow}
              role="row"
              key={`${position.asset}-${position.account}-${index}`}
            >
              <div className={styles.positionAsset}>
                <span
                  style={{
                    background: `${position.accent}18`,
                    color: position.accent,
                  }}
                >
                  {position.asset.slice(0, 1)}
                </span>
                <div>
                  <strong>{position.asset}</strong>
                  <small>
                    {position.name} · {position.issuer}
                  </small>
                </div>
              </div>
              <div className={styles.locationCell}>
                <strong>{position.account}</strong>
                <small>
                  {position.chain} · {position.address}
                </small>
              </div>
              <div data-label="Quantity">
                <strong>{position.quantity}</strong>
                <small>{position.asset}</small>
              </div>
              <div data-label="Value">
                <strong>{money(position.value)}</strong>
                <small
                  className={
                    position.change >= 0 ? styles.positive : styles.negative
                  }
                >
                  {position.change >= 0 ? (
                    <ArrowUpRight size={11} />
                  ) : (
                    <ArrowDownRight size={11} />
                  )}
                  {pct(position.change)} 24h
                </small>
              </div>
              <div data-label="Liquidity">
                <span
                  className={`${styles.tierBadge} ${styles[`tier_${position.tier}`]}`}
                >
                  {position.tier}
                </span>
              </div>
              <div data-label="Eligibility">
                <strong>{position.eligible}%</strong>
                <small>Policy weight</small>
              </div>
              <div data-label="Source">
                <strong
                  className={
                    position.sourceAge.includes("74") ? styles.staleText : ""
                  }
                >
                  {position.sourceAge}
                </strong>
                <small>
                  {position.sourceAge.includes("74") ? "Stale" : "Fresh"}
                </small>
              </div>
            </div>
          ))}
        </div>
        {positions.length === 0 && (
          <div className={styles.emptyState}>
            <Search size={22} />
            <strong>No positions match this filter</strong>
            <span>Clear filters to restore the seeded portfolio.</span>
          </div>
        )}
      </div>
    </section>
  )
}

function ActivityView() {
  return (
    <section className={styles.viewSection}>
      <div className={styles.viewHeading}>
        <div>
          <span className={styles.eyebrow}>Traceable operations</span>
          <h1>Activity</h1>
          <p>
            A unified record of onchain events, obligations, policy measurements
            and modeled decisions.
          </p>
        </div>
        <button className={styles.secondaryButton}>
          <FileCheck2 size={15} /> Audit export
        </button>
      </div>
      <div className={styles.activityLayout}>
        <div className={`${styles.panel} ${styles.activityPanel}`}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Recent record</h2>
              <p>Observed and user-created events remain distinct</p>
            </div>
            <button className={styles.toolbarButton}>
              <Filter size={14} /> All types
            </button>
          </div>
          <div className={styles.timeline}>
            {ACTIVITY_ITEMS.map((item) => (
              <article key={`${item.time}-${item.title}`}>
                <span className={styles.timelineTime}>{item.time}</span>
                <span
                  className={`${styles.timelineDot} ${styles[`activity_${item.type}`]}`}
                >
                  {item.type === "security" ? (
                    <ShieldCheck size={13} />
                  ) : item.type === "transaction" ? (
                    <ArrowUpRight size={13} />
                  ) : item.type === "obligation" ? (
                    <CalendarClock size={13} />
                  ) : item.type === "scenario" ? (
                    <SlidersHorizontal size={13} />
                  ) : (
                    <Database size={13} />
                  )}
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <span className={styles.activityTag}>
                    {item.type === "transaction"
                      ? "Observed onchain"
                      : "Workspace event"}
                  </span>
                </div>
                <button
                  className={styles.iconButton}
                  aria-label={`Open ${item.title}`}
                >
                  <ArrowRight size={15} />
                </button>
              </article>
            ))}
          </div>
        </div>
        <aside className={`${styles.panel} ${styles.evidencePanel}`}>
          <div className={styles.evidenceIcon}>
            <FileCheck2 size={22} />
          </div>
          <h2>Evidence integrity</h2>
          <p>
            This demo separates observed blockchain events from calculated
            measurements and user-authored scenarios.
          </p>
          <div className={styles.evidenceStats}>
            <span>
              <strong>5</strong> source types
            </span>
            <span>
              <strong>42s</strong> freshest balance
            </span>
            <span>
              <strong>1</strong> degraded source
            </span>
          </div>
          <button className={styles.primaryButton}>
            View source map <ArrowRight size={14} />
          </button>
        </aside>
      </div>
    </section>
  )
}

function ControlsView() {
  return (
    <section className={styles.viewSection}>
      <div className={styles.viewHeading}>
        <div>
          <span className={styles.eyebrow}>Organization policy</span>
          <h1>Controls</h1>
          <p>
            Advisory thresholds turn treasury posture into a review workflow.
            They do not execute or guarantee safety.
          </p>
        </div>
        <button className={styles.primaryButton}>
          <Settings2 size={15} /> Edit policy
        </button>
      </div>

      <div className={styles.controlOverview}>
        <div className={styles.controlScore}>
          <HealthGauge value={72} />
          <div>
            <span>Current posture</span>
            <strong>72 / 100</strong>
            <small>1 breached · 1 watching · 3 passing</small>
          </div>
        </div>
        <div className={styles.advisoryNote}>
          <LockKeyhole size={18} />
          <div>
            <strong>Advisory mode</strong>
            <span>
              No policy can block, sign or execute a transaction in this demo.
            </span>
          </div>
        </div>
      </div>

      <div className={`${styles.panel} ${styles.policyPanel}`}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Active policy set</h2>
            <p>Core treasury · reporting currency USD</p>
          </div>
          <span className={styles.policyVersion}>v1.4 · effective 12 Jun</span>
        </div>
        <div className={styles.policyList}>
          {POLICIES.map((policy) => (
            <article key={policy.name}>
              <div className={styles.policyStateIcon}>
                {policy.state === "Passing" ? (
                  <CheckCircle2 size={18} />
                ) : policy.state === "Breached" ? (
                  <ShieldAlert size={18} />
                ) : (
                  <Clock3 size={18} />
                )}
              </div>
              <div className={styles.policyName}>
                <strong>{policy.name}</strong>
                <span>{policy.scope}</span>
              </div>
              <div>
                <span>Threshold</span>
                <strong>{policy.threshold}</strong>
              </div>
              <div>
                <span>Current</span>
                <strong>{policy.current}</strong>
              </div>
              <span
                className={`${styles.policyState} ${
                  styles[`policy${policy.state}`]
                }`}
              >
                {policy.state}
              </span>
              <small>{policy.changed}</small>
              <button
                className={styles.iconButton}
                aria-label={`Open ${policy.name}`}
              >
                <ArrowRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
