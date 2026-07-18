"use client"

import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Database,
  Download,
  ExternalLink,
  FileCheck2,
  FlaskConical,
  Gauge,
  Info,
  Landmark,
  LayoutDashboard,
  LockKeyhole,
  Save,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Users,
  WalletCards,
  X,
} from "lucide-react"
import { useMemo, useState, useEffect } from "react"

import styles from "./tideguard.module.css"

type View = "command" | "stress" | "controls" | "sources"
type BriefFilter = "attention" | "all" | "cleared"
type Preset = "operating" | "board" | "severe" | "custom"

type Scenario = {
  usdcShock: number
  ethShock: number
  burnIncrease: number
  bridgeDays: number
  custodianFreeze: boolean
}

type ControlState = Record<string, boolean>

const TOTAL_TREASURY = 4_820_000
const MONTHLY_BURN = 376_000
const NEXT_30D_OBLIGATIONS = 880_000
const SAME_DAY_LIQUIDITY = 2_660_000
const USDC_EXPOSURE = 2_250_000
const BRIDGED_USDC = 470_000
const ETH_EXPOSURE = 850_000
const CUSTODIAN_EXPOSURE = 580_000
const SNAPSHOT = "2026-07-16 09:42 UTC"

const scenarioPresets: Record<Exclude<Preset, "custom">, Scenario> = {
  operating: {
    usdcShock: 1,
    ethShock: 15,
    burnIncrease: 10,
    bridgeDays: 7,
    custodianFreeze: false,
  },
  board: {
    usdcShock: 3,
    ethShock: 30,
    burnIncrease: 20,
    bridgeDays: 30,
    custodianFreeze: true,
  },
  severe: {
    usdcShock: 8,
    ethShock: 50,
    burnIncrease: 35,
    bridgeDays: 90,
    custodianFreeze: true,
  },
}

const defaultControls: ControlState = {
  bridge: false,
  signer: false,
  reserve: true,
  evidence: false,
}

const navItems = [
  { id: "command" as const, label: "Command", icon: LayoutDashboard },
  { id: "stress" as const, label: "Stress lab", icon: FlaskConical },
  { id: "controls" as const, label: "Controls", icon: ShieldCheck },
  { id: "sources" as const, label: "Sources", icon: Database },
]

const decisionItems = [
  {
    id: "bridge",
    severity: "critical",
    title: "$470K depends on one bridge path",
    copy: "USDC.e on Arbitrum is available for payroll only while the bridge and exit path remain operational.",
    amount: "$470K",
    timing: "Before Aug payroll",
    tag: "Bridge",
  },
  {
    id: "issuer",
    severity: "attention",
    title: "Circle exposure is 6.7 pts above policy",
    copy: "Native and bridged USDC together represent 46.7% of treasury against a 40% issuer limit.",
    amount: "$2.25M",
    timing: "Review in 5 days",
    tag: "Issuer",
  },
  {
    id: "signer",
    severity: "attention",
    title: "Payments wallet has a single control path",
    copy: "The card-funding wallet is 1-of-1 and holds enough to cover 18 days of operating spend.",
    amount: "$224K",
    timing: "Owner due Fri",
    tag: "Control",
  },
]

const policies = [
  {
    title: "Issuer concentration",
    current: "46.7% Circle",
    limit: "≤ 40%",
    status: "Breach",
    tone: "critical",
    fill: 93,
    detail: "$2.25M across native USDC and USDC.e",
  },
  {
    title: "90-day operating reserve",
    current: "76 days",
    limit: "≥ 90 days",
    status: "Attention",
    tone: "warning",
    fill: 84,
    detail: "$940K target; $794K currently eligible",
  },
  {
    title: "Single-chain exposure",
    current: "43% Ethereum",
    limit: "≤ 50%",
    status: "Within policy",
    tone: "success",
    fill: 86,
    detail: "Largest chain exposure includes native assets only",
  },
  {
    title: "Treasury signer threshold",
    current: "2 of 3",
    limit: "≥ 2 signers",
    status: "Within policy",
    tone: "success",
    fill: 67,
    detail: "One signer has not confirmed activity in 21 days",
  },
]

const controlItems = [
  {
    id: "bridge",
    title: "Replace $250K of USDC.e with native USDC",
    owner: "Maya · Finance",
    due: "Jul 21",
    approver: "2-of-3 Safe",
    impact: "Bridge exposure → 4.6%",
  },
  {
    id: "signer",
    title: "Move card reserve into a policy-controlled Safe",
    owner: "Jon · Ops",
    due: "Jul 18",
    approver: "CFO + Security",
    impact: "Removes $224K single-signer path",
  },
  {
    id: "reserve",
    title: "Document 90-day reserve policy",
    owner: "Maya · Finance",
    due: "Completed",
    approver: "Board observer",
    impact: "Policy baseline established",
  },
  {
    id: "evidence",
    title: "Refresh Aave withdrawal evidence",
    owner: "Leo · Security",
    due: "Jul 17",
    approver: "Finance",
    impact: "Restores source confidence",
  },
]

const sources = [
  {
    name: "Ethereum + Arbitrum index",
    type: "On-chain balances",
    scope: "5 addresses · 17 positions",
    observed: "09:41 UTC",
    status: "Current",
    tone: "success",
    caveat: "Fixed seeded block snapshot",
  },
  {
    name: "Safe Transaction Service",
    type: "Owners + threshold",
    scope: "2 Safe accounts",
    observed: "09:39 UTC",
    status: "Current",
    tone: "success",
    caveat: "Read-only configuration snapshot",
  },
  {
    name: "Coin Metrics methodology",
    type: "Reference prices",
    scope: "USDC · USDT · ETH",
    observed: "09:40 UTC",
    status: "Demo proxy",
    tone: "demo",
    caveat: "Values are seeded, not API-fetched",
  },
  {
    name: "Aperture forecast v12.csv",
    type: "Obligations + burn",
    scope: "90-day operating plan",
    observed: "Jul 15 · 16:20",
    status: "Current",
    tone: "success",
    caveat: "Manual source · owner Maya",
  },
  {
    name: "Aave position evidence",
    type: "Withdrawal horizon",
    scope: "$240K wstETH position",
    observed: "24 min old",
    status: "Aging",
    tone: "warning",
    caveat: "Confidence reduced until refreshed",
  },
  {
    name: "Circle reserve evidence",
    type: "Issuer evidence",
    scope: "$2.25M Circle exposure",
    observed: "Monthly report",
    status: "Periodic",
    tone: "neutral",
    caveat: "Attestation is not real-time reserves",
  },
]

function formatMoney(value: number) {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }
  return `$${Math.round(value / 1_000)}K`
}

function formatMonths(value: number) {
  return `${value.toFixed(1)} mo`
}

function calculateScenario(scenario: Scenario) {
  const valuationLoss =
    USDC_EXPOSURE * (scenario.usdcShock / 100) +
    ETH_EXPOSURE * (scenario.ethShock / 100)
  const bridgeUnavailable =
    scenario.bridgeDays >= 30
      ? BRIDGED_USDC * (1 - scenario.usdcShock / 100)
      : scenario.bridgeDays >= 7
        ? (BRIDGED_USDC / 2) * (1 - scenario.usdcShock / 100)
        : 0
  const custodianUnavailable = scenario.custodianFreeze
    ? CUSTODIAN_EXPOSURE
    : 0
  const accessible = Math.max(
    0,
    TOTAL_TREASURY -
      valuationLoss -
      bridgeUnavailable -
      custodianUnavailable
  )
  const stressedBurn = MONTHLY_BURN * (1 + scenario.burnIncrease / 100)
  const runway = accessible / stressedBurn
  const liquidShock =
    USDC_EXPOSURE * 0.55 * (scenario.usdcShock / 100) +
    ETH_EXPOSURE * 0.2 * (scenario.ethShock / 100)
  const sameDayAvailable = Math.max(
    0,
    SAME_DAY_LIQUIDITY -
      liquidShock -
      custodianUnavailable -
      (scenario.bridgeDays >= 7 ? BRIDGED_USDC / 2 : 0)
  )
  const coverage = sameDayAvailable / NEXT_30D_OBLIGATIONS
  const confidence = Math.max(
    72,
    94 -
      (scenario.bridgeDays > 0 ? 2 : 0) -
      (scenario.custodianFreeze ? 1 : 0)
  )

  return {
    valuationLoss,
    bridgeUnavailable,
    custodianUnavailable,
    inaccessible: bridgeUnavailable + custodianUnavailable,
    accessible,
    stressedBurn,
    runway,
    coverage,
    sameDayAvailable,
    confidence,
  }
}

export default function TideguardApp() {
  const [activeView, setActiveView] = useState<View>("command")
  const [briefFilter, setBriefFilter] = useState<BriefFilter>("attention")
  const [preset, setPreset] = useState<Preset>("board")
  const [scenario, setScenario] = useState<Scenario>(scenarioPresets.board)
  const [controls, setControls] = useState<ControlState>(defaultControls)
  const [toast, setToast] = useState<string | null>(null)
  const [savedAt, setSavedAt] = useState<string | null>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const storedControls = window.localStorage.getItem(
        "tideguard-demo-controls"
      )
      const storedScenario = window.localStorage.getItem(
        "tideguard-demo-scenario"
      )

      if (storedControls) {
        try {
          setControls(JSON.parse(storedControls) as ControlState)
        } catch {
          window.localStorage.removeItem("tideguard-demo-controls")
        }
      }

      if (storedScenario) {
        try {
          const parsed = JSON.parse(storedScenario) as {
            scenario: Scenario
            savedAt: string
          }
          setScenario(parsed.scenario)
          setPreset("custom")
          setSavedAt(parsed.savedAt)
        } catch {
          window.localStorage.removeItem("tideguard-demo-scenario")
        }
      }
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  const impact = useMemo(() => calculateScenario(scenario), [scenario])
  const baseRunway = TOTAL_TREASURY / MONTHLY_BURN
  const completedControls = Object.values(controls).filter(Boolean).length

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(null), 2600)
  }

  function choosePreset(nextPreset: Exclude<Preset, "custom">) {
    setPreset(nextPreset)
    setScenario(scenarioPresets[nextPreset])
  }

  function updateScenario<K extends keyof Scenario>(
    key: K,
    value: Scenario[K]
  ) {
    setPreset("custom")
    setScenario((current) => ({ ...current, [key]: value }))
  }

  function saveScenario() {
    const timestamp = new Date().toISOString()
    window.localStorage.setItem(
      "tideguard-demo-scenario",
      JSON.stringify({ scenario, savedAt: timestamp })
    )
    setSavedAt(timestamp)
    notify("Scenario saved on this device")
  }

  function toggleControl(id: string) {
    setControls((current) => {
      const next = { ...current, [id]: !current[id] }
      window.localStorage.setItem(
        "tideguard-demo-controls",
        JSON.stringify(next)
      )
      return next
    })
  }

  function navigate(view: View) {
    setActiveView(view)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>
            <span />
            <span />
            <span />
          </div>
          <div>
            <strong>Tideguard</strong>
            <small>Treasury resilience</small>
          </div>
        </div>

        <div className={styles.workspaceCard}>
          <div className={styles.workspaceLogo}>A</div>
          <div>
            <strong>Aperture Labs</strong>
            <span>Operations treasury · USD</span>
          </div>
          <ChevronRight size={16} aria-hidden="true" />
        </div>

        <nav className={styles.sideNav} aria-label="Product navigation">
          <span className={styles.navEyebrow}>Workspace</span>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                type="button"
                key={item.id}
                className={activeView === item.id ? styles.navActive : ""}
                onClick={() => navigate(item.id)}
                aria-current={activeView === item.id ? "page" : undefined}
              >
                <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                <span>{item.label}</span>
                {item.id === "controls" && (
                  <span className={styles.navCount}>3</span>
                )}
              </button>
            )
          })}
        </nav>

        <div className={styles.sidebarBottom}>
          <div className={styles.demoPanel}>
            <div className={styles.demoPanelTop}>
              <span className={styles.demoDot} />
              <strong>Seeded demo</strong>
            </div>
            <p>Fixed data · no wallet connected</p>
            <span>{SNAPSHOT}</span>
          </div>
          <div className={styles.readOnly}>
            <LockKeyhole size={14} aria-hidden="true" />
            Read-only analysis
          </div>
        </div>
      </aside>

      <header className={styles.mobileHeader}>
        <div className={styles.mobileBrand}>
          <div className={styles.brandMark}>
            <span />
            <span />
            <span />
          </div>
          <strong>Tideguard</strong>
        </div>
        <span className={styles.demoBadge}>Seeded demo</span>
      </header>

      <main className={styles.main}>
        {activeView === "command" && (
          <CommandView
            briefFilter={briefFilter}
            setBriefFilter={setBriefFilter}
            impact={impact}
            baseRunway={baseRunway}
            navigate={navigate}
            onExport={() => notify("Board brief prepared from seeded data")}
          />
        )}
        {activeView === "stress" && (
          <StressView
            preset={preset}
            choosePreset={choosePreset}
            scenario={scenario}
            updateScenario={updateScenario}
            impact={impact}
            baseRunway={baseRunway}
            saveScenario={saveScenario}
            savedAt={savedAt}
            navigate={navigate}
          />
        )}
        {activeView === "controls" && (
          <ControlsView
            controls={controls}
            toggleControl={toggleControl}
            completedControls={completedControls}
            onExport={() => notify("Approval packet prepared — no transaction created")}
          />
        )}
        {activeView === "sources" && <SourcesView />}
      </main>

      <nav className={styles.mobileNav} aria-label="Mobile product navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              type="button"
              key={item.id}
              className={activeView === item.id ? styles.mobileNavActive : ""}
              onClick={() => navigate(item.id)}
              aria-current={activeView === item.id ? "page" : undefined}
            >
              <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {toast && (
        <div className={styles.toast} role="status">
          <CheckCircle2 size={17} aria-hidden="true" />
          {toast}
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Dismiss message"
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <header className={styles.pageHeader}>
      <div>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </header>
  )
}

function CommandView({
  briefFilter,
  setBriefFilter,
  impact,
  baseRunway,
  navigate,
  onExport,
}: {
  briefFilter: BriefFilter
  setBriefFilter: (filter: BriefFilter) => void
  impact: ReturnType<typeof calculateScenario>
  baseRunway: number
  navigate: (view: View) => void
  onExport: () => void
}) {
  const visibleItems =
    briefFilter === "cleared"
      ? []
      : briefFilter === "attention"
        ? decisionItems
        : [
            ...decisionItems,
            {
              id: "cleared",
              severity: "cleared",
              title: "Ethereum chain concentration remains within policy",
              copy: "The largest chain holds 43% of treasury against a configured 50% limit.",
              amount: "$2.07M",
              timing: "Reviewed today",
              tag: "Chain",
            },
          ]

  return (
    <div className={styles.view}>
      <PageHeader
        eyebrow="Aperture Labs · USD"
        title="Treasury command"
        description={`Operating resilience based on fixed seeded data as of ${SNAPSHOT}.`}
        action={
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onExport}
          >
            <Download size={16} aria-hidden="true" />
            Export board brief
          </button>
        }
      />

      <section className={styles.statusHero} aria-labelledby="status-heading">
        <div className={styles.statusHeroCopy}>
          <div className={styles.statusIcon}>
            <TriangleAlert size={21} aria-hidden="true" />
          </div>
          <div>
            <span className={styles.statusLabel}>Action needed</span>
            <h2 id="status-heading">
              Payroll is covered, but board stress cuts runway by{" "}
              {(baseRunway - impact.runway).toFixed(1)} months.
            </h2>
            <p>
              $1.05M becomes unavailable before price losses. Two control
              changes restore the 90-day reserve target.
            </p>
          </div>
        </div>
        <div className={styles.heroRunway}>
          <div>
            <span>Base</span>
            <strong>{formatMonths(baseRunway)}</strong>
          </div>
          <ArrowRight size={20} aria-hidden="true" />
          <div className={styles.heroStressValue}>
            <span>Board stress</span>
            <strong>{formatMonths(impact.runway)}</strong>
          </div>
        </div>
        <button
          type="button"
          className={styles.heroButton}
          onClick={() => navigate("stress")}
        >
          Inspect stress
          <ChevronRight size={17} aria-hidden="true" />
        </button>
      </section>

      <section className={styles.metricsGrid} aria-label="Treasury metrics">
        <MetricCard
          icon={<Clock3 size={18} aria-hidden="true" />}
          label="Operating runway"
          value={formatMonths(baseRunway)}
          meta="Base case · $376K monthly burn"
          change={`${formatMonths(impact.runway)} under board stress`}
          tone="warning"
        />
        <MetricCard
          icon={<CircleDollarSign size={18} aria-hidden="true" />}
          label="30-day coverage"
          value={`${impact.coverage.toFixed(1)}×`}
          meta={`${formatMoney(impact.sameDayAvailable)} accessible`}
          change={`${formatMoney(NEXT_30D_OBLIGATIONS)} due`}
          tone={impact.coverage < 1.5 ? "critical" : "success"}
        />
        <MetricCard
          icon={<WalletCards size={18} aria-hidden="true" />}
          label="Same-day liquidity"
          value={formatMoney(SAME_DAY_LIQUIDITY)}
          meta="55.2% of treasury"
          change="$235K bridge-dependent"
          tone="neutral"
        />
        <MetricCard
          icon={<Database size={18} aria-hidden="true" />}
          label="Data confidence"
          value="92%"
          meta="5 of 6 sources current"
          change="Aave evidence is aging"
          tone="warning"
        />
      </section>

      <div className={styles.commandGrid}>
        <section className={styles.card} aria-labelledby="brief-heading">
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Decision loop</span>
              <h2 id="brief-heading">Decision brief</h2>
              <p>Material findings tied to operating impact.</p>
            </div>
            <div className={styles.filterTabs} aria-label="Decision filter">
              {(["attention", "all", "cleared"] as BriefFilter[]).map(
                (filter) => (
                  <button
                    type="button"
                    key={filter}
                    onClick={() => setBriefFilter(filter)}
                    className={
                      briefFilter === filter ? styles.filterActive : ""
                    }
                  >
                    {filter[0].toUpperCase() + filter.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          <div className={styles.briefList}>
            {visibleItems.length > 0 ? (
              visibleItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={styles.briefItem}
                  onClick={() =>
                    navigate(item.id === "cleared" ? "controls" : "stress")
                  }
                >
                  <span
                    className={`${styles.briefSignal} ${
                      item.severity === "critical"
                        ? styles.signalCritical
                        : item.severity === "cleared"
                          ? styles.signalSuccess
                          : styles.signalWarning
                    }`}
                  >
                    {item.severity === "critical" ? (
                      <AlertTriangle size={16} aria-hidden="true" />
                    ) : item.severity === "cleared" ? (
                      <Check size={16} aria-hidden="true" />
                    ) : (
                      <Gauge size={16} aria-hidden="true" />
                    )}
                  </span>
                  <span className={styles.briefBody}>
                    <span className={styles.briefTopline}>
                      <span className={styles.itemTag}>{item.tag}</span>
                      <span>{item.timing}</span>
                    </span>
                    <strong>{item.title}</strong>
                    <span>{item.copy}</span>
                  </span>
                  <span className={styles.briefAmount}>
                    <strong>{item.amount}</strong>
                    <ChevronRight size={16} aria-hidden="true" />
                  </span>
                </button>
              ))
            ) : (
              <div className={styles.emptyState}>
                <div>
                  <CheckCircle2 size={22} aria-hidden="true" />
                </div>
                <strong>No cleared items in this sample</strong>
                <p>
                  Complete a control to populate this view. Filters never hide
                  unknown or active risks by default.
                </p>
                <button type="button" onClick={() => navigate("controls")}>
                  Open controls
                </button>
              </div>
            )}
          </div>
        </section>

        <section className={styles.card} aria-labelledby="exposure-heading">
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Concentration</span>
              <h2 id="exposure-heading">Asset exposure</h2>
              <p>{formatMoney(TOTAL_TREASURY)} seeded treasury value.</p>
            </div>
            <span className={styles.fixedBadge}>Fixed snapshot</span>
          </div>

          <div
            className={styles.allocationBar}
            aria-label="USDC 46.7%, USDT 24.5%, ETH and wstETH 17.6%, EURC 8.7%, bank USD 2.5%"
          >
            <span className={styles.allocUsdc} style={{ width: "46.7%" }} />
            <span className={styles.allocUsdt} style={{ width: "24.5%" }} />
            <span className={styles.allocEth} style={{ width: "17.6%" }} />
            <span className={styles.allocEurc} style={{ width: "8.7%" }} />
            <span className={styles.allocBank} style={{ width: "2.5%" }} />
          </div>

          <div className={styles.allocationList}>
            <AllocationRow
              color="usdc"
              name="USDC · Circle"
              detail="Native $1.78M · bridged $470K"
              value="$2.25M"
              share="46.7%"
              warning
            />
            <AllocationRow
              color="usdt"
              name="USDT · Tether"
              detail="Ethereum + Tron"
              value="$1.18M"
              share="24.5%"
            />
            <AllocationRow
              color="eth"
              name="ETH + wstETH"
              detail="$240K in protocol position"
              value="$850K"
              share="17.6%"
            />
            <AllocationRow
              color="eurc"
              name="EURC · Circle"
              detail="Native Ethereum"
              value="$420K"
              share="8.7%"
            />
            <AllocationRow
              color="bank"
              name="USD · Bank"
              detail="Manual balance source"
              value="$120K"
              share="2.5%"
            />
          </div>

          <button
            type="button"
            className={styles.textButton}
            onClick={() => navigate("sources")}
          >
            Inspect asset identity and sources
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </section>
      </div>

      <div className={styles.bottomGrid}>
        <section className={styles.card} aria-labelledby="liquidity-heading">
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Access timeline</span>
              <h2 id="liquidity-heading">Liquidity ladder</h2>
              <p>Value grouped by operational time-to-access.</p>
            </div>
            <span className={styles.infoBadge}>
              <Info size={13} aria-hidden="true" /> Value ≠ access
            </span>
          </div>
          <div className={styles.liquidityChart}>
            <LiquidityBar
              label="Same day"
              value="$2.66M"
              width="100%"
              obligation="$880K due"
              tone="strong"
            />
            <LiquidityBar
              label="1–7 days"
              value="$1.13M"
              width="42.5%"
              obligation="$146K due"
              tone="medium"
            />
            <LiquidityBar
              label="8–30 days"
              value="$610K"
              width="22.9%"
              obligation="$0 due"
              tone="soft"
            />
            <LiquidityBar
              label="> 30 days"
              value="$420K"
              width="15.8%"
              obligation="Excluded from runway"
              tone="muted"
            />
          </div>
        </section>

        <section className={`${styles.card} ${styles.controlPreview}`}>
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Policy posture</span>
              <h2>Controls at a glance</h2>
              <p>2 within policy · 1 attention · 1 breach.</p>
            </div>
            <span className={styles.scoreRing}>68</span>
          </div>
          <div className={styles.miniPolicyList}>
            <MiniPolicy
              label="Issuer concentration"
              value="46.7 / 40%"
              tone="critical"
            />
            <MiniPolicy
              label="90-day reserve"
              value="76 / 90d"
              tone="warning"
            />
            <MiniPolicy
              label="Chain concentration"
              value="43 / 50%"
              tone="success"
            />
          </div>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => navigate("controls")}
          >
            Review controls
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </section>
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  meta,
  change,
  tone,
}: {
  icon: React.ReactNode
  label: string
  value: string
  meta: string
  change: string
  tone: "neutral" | "success" | "warning" | "critical"
}) {
  return (
    <article className={styles.metricCard}>
      <div className={styles.metricTop}>
        <span className={styles.metricIcon}>{icon}</span>
        <span>{label}</span>
      </div>
      <strong>{value}</strong>
      <div className={styles.metricBottom}>
        <span>{meta}</span>
        <span className={styles[`tone_${tone}`]}>{change}</span>
      </div>
    </article>
  )
}

function AllocationRow({
  color,
  name,
  detail,
  value,
  share,
  warning = false,
}: {
  color: "usdc" | "usdt" | "eth" | "eurc" | "bank"
  name: string
  detail: string
  value: string
  share: string
  warning?: boolean
}) {
  return (
    <div className={styles.allocationRow}>
      <span
        className={`${styles.legendDot} ${styles[`legend_${color}`]}`}
        aria-hidden="true"
      />
      <div>
        <strong>
          {name}
          {warning && <AlertTriangle size={13} aria-label="Policy breach" />}
        </strong>
        <span>{detail}</span>
      </div>
      <div>
        <strong>{value}</strong>
        <span>{share}</span>
      </div>
    </div>
  )
}

function LiquidityBar({
  label,
  value,
  width,
  obligation,
  tone,
}: {
  label: string
  value: string
  width: string
  obligation: string
  tone: "strong" | "medium" | "soft" | "muted"
}) {
  return (
    <div className={styles.liquidityRow}>
      <div className={styles.liquidityLabel}>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className={styles.liquidityTrack}>
        <span
          className={`${styles.liquidityFill} ${styles[`liquidity_${tone}`]}`}
          style={{ width }}
        />
      </div>
      <span className={styles.obligationLabel}>{obligation}</span>
    </div>
  )
}

function MiniPolicy({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "success" | "warning" | "critical"
}) {
  return (
    <div className={styles.miniPolicy}>
      <span className={`${styles.statusDot} ${styles[`dot_${tone}`]}`} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function StressView({
  preset,
  choosePreset,
  scenario,
  updateScenario,
  impact,
  baseRunway,
  saveScenario,
  savedAt,
  navigate,
}: {
  preset: Preset
  choosePreset: (preset: Exclude<Preset, "custom">) => void
  scenario: Scenario
  updateScenario: <K extends keyof Scenario>(
    key: K,
    value: Scenario[K]
  ) => void
  impact: ReturnType<typeof calculateScenario>
  baseRunway: number
  saveScenario: () => void
  savedAt: string | null
  navigate: (view: View) => void
}) {
  const severity =
    impact.runway < 6 ? "Critical" : impact.runway < 9 ? "Action needed" : "Watch"

  return (
    <div className={styles.view}>
      <PageHeader
        eyebrow="Scenario workspace"
        title="Stress lab"
        description="Change one failure surface at a time, or use a finance-reviewed preset."
        action={
          <button
            type="button"
            className={styles.primaryButton}
            onClick={saveScenario}
          >
            <Save size={16} aria-hidden="true" />
            Save scenario
          </button>
        }
      />

      <div className={styles.scenarioNotice}>
        <FlaskConical size={17} aria-hidden="true" />
        <span>
          <strong>User-configured stress · not a forecast.</strong> Temporary
          inaccessibility is shown separately from valuation loss.
        </span>
        {savedAt && (
          <span className={styles.savedLabel}>
            Saved {new Date(savedAt).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className={styles.stressLayout}>
        <section className={`${styles.card} ${styles.scenarioPanel}`}>
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Assumptions</span>
              <h2>Scenario controls</h2>
              <p>Every input names the seeded exposure it affects.</p>
            </div>
          </div>

          <div className={styles.presetTabs}>
            <button
              type="button"
              className={preset === "operating" ? styles.presetActive : ""}
              onClick={() => choosePreset("operating")}
            >
              Operating plan
            </button>
            <button
              type="button"
              className={preset === "board" ? styles.presetActive : ""}
              onClick={() => choosePreset("board")}
            >
              Board stress
            </button>
            <button
              type="button"
              className={preset === "severe" ? styles.presetActive : ""}
              onClick={() => choosePreset("severe")}
            >
              Severe event
            </button>
          </div>
          {preset === "custom" && (
            <span className={styles.customScenario}>
              <Sparkles size={13} aria-hidden="true" />
              Custom scenario
            </span>
          )}

          <div className={styles.sliderList}>
            <ScenarioSlider
              label="USDC price shock"
              value={scenario.usdcShock}
              min={0}
              max={10}
              suffix="%"
              exposure="$2.25M Circle exposure"
              onChange={(value) => updateScenario("usdcShock", value)}
            />
            <ScenarioSlider
              label="ETH + wstETH shock"
              value={scenario.ethShock}
              min={0}
              max={60}
              step={5}
              suffix="%"
              exposure="$850K market exposure"
              onChange={(value) => updateScenario("ethShock", value)}
            />
            <ScenarioSlider
              label="Monthly burn increase"
              value={scenario.burnIncrease}
              min={0}
              max={50}
              step={5}
              suffix="%"
              exposure="$376K baseline burn"
              onChange={(value) => updateScenario("burnIncrease", value)}
            />
          </div>

          <div className={styles.choiceGroup}>
            <div className={styles.choiceLabel}>
              <div>
                <span>Bridge unavailable</span>
                <small>$470K USDC.e exit path</small>
              </div>
              <strong>{scenario.bridgeDays} days</strong>
            </div>
            <div className={styles.dayChoices}>
              {[0, 7, 30, 90].map((days) => (
                <button
                  type="button"
                  key={days}
                  className={
                    scenario.bridgeDays === days ? styles.dayActive : ""
                  }
                  onClick={() => updateScenario("bridgeDays", days)}
                >
                  {days === 0 ? "None" : `${days}d`}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.toggleRow} ${
              scenario.custodianFreeze ? styles.toggleOn : ""
            }`}
            aria-pressed={scenario.custodianFreeze}
            onClick={() =>
              updateScenario(
                "custodianFreeze",
                !scenario.custodianFreeze
              )
            }
          >
            <span className={styles.toggleCopy}>
              <Landmark size={17} aria-hidden="true" />
              <span>
                <strong>Custodian withdrawal freeze</strong>
                <small>$580K temporarily inaccessible</small>
              </span>
            </span>
            <span className={styles.toggleSwitch}>
              <span />
            </span>
          </button>
        </section>

        <div className={styles.impactColumn}>
          <section
            className={`${styles.card} ${styles.impactCard}`}
            aria-labelledby="impact-heading"
          >
            <div className={styles.impactHeader}>
              <div>
                <span className={styles.sectionEyebrow}>Operating impact</span>
                <h2 id="impact-heading">{severity}</h2>
              </div>
              <span
                className={`${styles.impactStatus} ${
                  severity === "Critical"
                    ? styles.impactCritical
                    : styles.impactWarning
                }`}
              >
                {impact.runway < 9 ? (
                  <AlertTriangle size={15} aria-hidden="true" />
                ) : (
                  <Gauge size={15} aria-hidden="true" />
                )}
                {impact.runway < 9 ? "Below reserve target" : "Inside buffer"}
              </span>
            </div>

            <div className={styles.impactMain}>
              <div>
                <span>Stressed operating runway</span>
                <strong>{formatMonths(impact.runway)}</strong>
                <small>
                  {(baseRunway - impact.runway).toFixed(1)} months below base
                </small>
              </div>
              <div className={styles.impactGauge} aria-hidden="true">
                <span
                  style={{
                    width: `${Math.min(100, (impact.runway / baseRunway) * 100)}%`,
                  }}
                />
              </div>
            </div>

            <div className={styles.runwayCompare}>
              <CompareBar
                label="Base case"
                value={baseRunway}
                max={baseRunway}
                display={formatMonths(baseRunway)}
                tone="base"
              />
              <CompareBar
                label="This scenario"
                value={impact.runway}
                max={baseRunway}
                display={formatMonths(impact.runway)}
                tone="stress"
              />
              <span className={styles.reserveMarker}>
                <span />
                9-month reserve target
              </span>
            </div>

            <div className={styles.impactMetrics}>
              <div>
                <span>Accessible funds</span>
                <strong>{formatMoney(impact.accessible)}</strong>
                <small>
                  {formatMoney(impact.inaccessible)} unavailable
                </small>
              </div>
              <div>
                <span>30-day coverage</span>
                <strong>{impact.coverage.toFixed(1)}×</strong>
                <small>{formatMoney(NEXT_30D_OBLIGATIONS)} due</small>
              </div>
              <div>
                <span>Data confidence</span>
                <strong>{impact.confidence}%</strong>
                <small>Completeness, not probability</small>
              </div>
            </div>
          </section>

          <section className={styles.card} aria-labelledby="attribution-heading">
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.sectionEyebrow}>Explain the delta</span>
                <h2 id="attribution-heading">Impact attribution</h2>
                <p>Loss, access, and higher spend remain distinct.</p>
              </div>
            </div>
            <div className={styles.attributionGrid}>
              <AttributionItem
                label="Valuation loss"
                value={formatMoney(impact.valuationLoss)}
                detail={`${scenario.usdcShock}% USDC · ${scenario.ethShock}% ETH`}
                tone="critical"
              />
              <AttributionItem
                label="Temporarily inaccessible"
                value={formatMoney(impact.inaccessible)}
                detail={`${scenario.bridgeDays}d bridge · ${
                  scenario.custodianFreeze ? "freeze on" : "no freeze"
                }`}
                tone="warning"
              />
              <AttributionItem
                label="Stressed monthly burn"
                value={formatMoney(impact.stressedBurn)}
                detail={`+${scenario.burnIncrease}% vs baseline`}
                tone="neutral"
              />
            </div>
            <div className={styles.methodNote}>
              <Info size={15} aria-hidden="true" />
              Inaccessible value is not counted as permanent loss. Price shocks
              are applied before accessibility constraints.
            </div>
          </section>
        </div>
      </div>

      <section className={styles.card} aria-labelledby="actions-heading">
        <div className={styles.cardHeader}>
          <div>
            <span className={styles.sectionEyebrow}>Stress → control</span>
            <h2 id="actions-heading">Recommended control plan</h2>
            <p>Based on Aperture&apos;s configured policy, not investment advice.</p>
          </div>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => navigate("controls")}
          >
            Open controls
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
        <div className={styles.recommendationGrid}>
          <Recommendation
            priority="01"
            title="Remove one bridge dependency"
            description="Replace $250K of USDC.e with native USDC before the next payroll funding window."
            effect="Restores 0.6 mo"
            meta="Finance · 2-of-3 approval"
          />
          <Recommendation
            priority="02"
            title="Separate operating reserve"
            description="Hold 90 days of policy-eligible liquidity outside the custodian and protocol positions."
            effect="Coverage → 2.8×"
            meta="CFO · board policy"
          />
          <Recommendation
            priority="03"
            title="Close the 1-of-1 control path"
            description="Move card funding into a Safe and apply the routine-spend approval tier."
            effect="$224K protected"
            meta="Ops + Security"
          />
        </div>
      </section>
    </div>
  )
}

function ScenarioSlider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  exposure,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix: string
  exposure: string
  onChange: (value: number) => void
}) {
  const fill = ((value - min) / (max - min)) * 100
  return (
    <label className={styles.sliderField}>
      <span className={styles.sliderHeading}>
        <span>
          <strong>{label}</strong>
          <small>{exposure}</small>
        </span>
        <output>
          −{value}
          {suffix}
        </output>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          background: `linear-gradient(90deg, #5147d9 ${fill}%, #e1e4df ${fill}%)`,
        }}
      />
      <span className={styles.sliderEnds}>
        <span>0{suffix}</span>
        <span>
          −{max}
          {suffix}
        </span>
      </span>
    </label>
  )
}

function CompareBar({
  label,
  value,
  max,
  display,
  tone,
}: {
  label: string
  value: number
  max: number
  display: string
  tone: "base" | "stress"
}) {
  return (
    <div className={styles.compareRow}>
      <span>{label}</span>
      <div>
        <span
          className={styles[`compare_${tone}`]}
          style={{ width: `${Math.max(4, (value / max) * 100)}%` }}
        />
      </div>
      <strong>{display}</strong>
    </div>
  )
}

function AttributionItem({
  label,
  value,
  detail,
  tone,
}: {
  label: string
  value: string
  detail: string
  tone: "neutral" | "warning" | "critical"
}) {
  return (
    <div className={styles.attributionItem}>
      <span>{label}</span>
      <strong className={styles[`tone_${tone}`]}>{value}</strong>
      <small>{detail}</small>
    </div>
  )
}

function Recommendation({
  priority,
  title,
  description,
  effect,
  meta,
}: {
  priority: string
  title: string
  description: string
  effect: string
  meta: string
}) {
  return (
    <article className={styles.recommendation}>
      <div className={styles.recommendationNumber}>{priority}</div>
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <div className={styles.recommendationFooter}>
        <span>{meta}</span>
        <strong>{effect}</strong>
      </div>
    </article>
  )
}

function ControlsView({
  controls,
  toggleControl,
  completedControls,
  onExport,
}: {
  controls: ControlState
  toggleControl: (id: string) => void
  completedControls: number
  onExport: () => void
}) {
  return (
    <div className={styles.view}>
      <PageHeader
        eyebrow="Policy + ownership"
        title="Treasury controls"
        description="Translate findings into limits, accountable work, and approval-ready evidence."
        action={
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onExport}
          >
            <FileCheck2 size={16} aria-hidden="true" />
            Prepare approval packet
          </button>
        }
      />

      <section className={styles.controlsHero}>
        <div className={styles.policyScore}>
          <div>
            <span>Policy coverage</span>
            <strong>68</strong>
            <small>of 100 configured points</small>
          </div>
          <div className={styles.scoreVisual} aria-hidden="true">
            <span style={{ height: "68%" }} />
          </div>
        </div>
        <div className={styles.controlsSummary}>
          <span className={styles.summaryCritical}>
            <AlertTriangle size={17} aria-hidden="true" />
            <strong>1 breach</strong>
            <small>Issuer concentration</small>
          </span>
          <span className={styles.summaryWarning}>
            <Gauge size={17} aria-hidden="true" />
            <strong>1 attention</strong>
            <small>Operating reserve</small>
          </span>
          <span className={styles.summarySuccess}>
            <CheckCircle2 size={17} aria-hidden="true" />
            <strong>2 within policy</strong>
            <small>Chain + threshold</small>
          </span>
        </div>
        <div className={styles.nextReview}>
          <Clock3 size={18} aria-hidden="true" />
          <div>
            <span>Next policy review</span>
            <strong>Jul 21 · before payroll funding</strong>
          </div>
        </div>
      </section>

      <section className={styles.card} aria-labelledby="policy-heading">
        <div className={styles.cardHeader}>
          <div>
            <span className={styles.sectionEyebrow}>Limits</span>
            <h2 id="policy-heading">Policy health</h2>
            <p>Current evidence compared with Aperture&apos;s configured limits.</p>
          </div>
          <span className={styles.fixedBadge}>Demo policy pack</span>
        </div>
        <div className={styles.policyTable}>
          <div className={styles.policyTableHeader}>
            <span>Control</span>
            <span>Current / limit</span>
            <span>Evidence</span>
            <span>Status</span>
          </div>
          {policies.map((policy) => (
            <div className={styles.policyRow} key={policy.title}>
              <div>
                <strong>{policy.title}</strong>
                <span>{policy.detail}</span>
              </div>
              <div className={styles.policyMeasure}>
                <strong>{policy.current}</strong>
                <span>{policy.limit}</span>
                <div className={styles.policyTrack}>
                  <span
                    className={styles[`policy_${policy.tone}`]}
                    style={{ width: `${policy.fill}%` }}
                  />
                </div>
              </div>
              <span className={styles.policyEvidence}>
                {policy.title.includes("Signer") ? (
                  <Users size={15} aria-hidden="true" />
                ) : policy.title.includes("reserve") ? (
                  <CircleDollarSign size={15} aria-hidden="true" />
                ) : (
                  <Database size={15} aria-hidden="true" />
                )}
                {policy.title.includes("Signer")
                  ? "Safe config"
                  : policy.title.includes("reserve")
                    ? "Forecast + balances"
                    : "Position registry"}
              </span>
              <span
                className={`${styles.policyStatus} ${
                  styles[`policyStatus_${policy.tone}`]
                }`}
              >
                {policy.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.controlsGrid}>
        <section className={styles.card} aria-labelledby="checklist-heading">
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Remediation</span>
              <h2 id="checklist-heading">Control checklist</h2>
              <p>
                {completedControls} of {controlItems.length} workflow items
                complete.
              </p>
            </div>
            <span className={styles.completionBadge}>
              {Math.round((completedControls / controlItems.length) * 100)}%
            </span>
          </div>
          <div className={styles.progressTrack}>
            <span
              style={{
                width: `${(completedControls / controlItems.length) * 100}%`,
              }}
            />
          </div>
          <div className={styles.checklist}>
            {controlItems.map((item) => (
              <label
                className={`${styles.checkItem} ${
                  controls[item.id] ? styles.checkItemComplete : ""
                }`}
                key={item.id}
              >
                <input
                  type="checkbox"
                  checked={controls[item.id] ?? false}
                  onChange={() => toggleControl(item.id)}
                />
                <span className={styles.customCheck}>
                  {controls[item.id] && <Check size={14} aria-hidden="true" />}
                </span>
                <span className={styles.checkBody}>
                  <strong>{item.title}</strong>
                  <span>
                    {item.owner} · {item.due}
                  </span>
                  <small>
                    {item.approver} · {item.impact}
                  </small>
                </span>
              </label>
            ))}
          </div>
          <div className={styles.methodNote}>
            <Info size={15} aria-hidden="true" />
            Checklist completion is stored on this device. It does not verify
            an on-chain transfer or approval.
          </div>
        </section>

        <section className={`${styles.card} ${styles.approvalCard}`}>
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Handoff preview</span>
              <h2>Approval packet</h2>
              <p>Human-readable effects for existing custody workflows.</p>
            </div>
            <span className={styles.readOnlyBadge}>
              <LockKeyhole size={13} aria-hidden="true" />
              No execution
            </span>
          </div>
          <div className={styles.packetFlow}>
            <div>
              <span>From</span>
              <strong>Arbitrum Reserve Safe</strong>
              <small>0x71B4…91A2 · 2 of 3</small>
            </div>
            <ArrowRight size={19} aria-hidden="true" />
            <div>
              <span>Control intent</span>
              <strong>Reduce bridge exposure</strong>
              <small>Replace $250K USDC.e</small>
            </div>
          </div>
          <div className={styles.packetFacts}>
            <div>
              <span>Policy effect</span>
              <strong>Bridge exposure 9.8% → 4.6%</strong>
            </div>
            <div>
              <span>Required approval</span>
              <strong>Finance preparer · 2 Safe signers</strong>
            </div>
            <div>
              <span>Evidence attached</span>
              <strong>Position IDs · source times · scenario</strong>
            </div>
          </div>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onExport}
          >
            <FileCheck2 size={16} aria-hidden="true" />
            Prepare packet
          </button>
          <p className={styles.packetFootnote}>
            Production would deep-link to the approved custody system after
            destination verification and transaction simulation.
          </p>
        </section>
      </div>
    </div>
  )
}

function SourcesView() {
  const [method, setMethod] = useState<
    "identity" | "valuation" | "liquidity" | "stress"
  >("identity")

  const methods = {
    identity: {
      title: "Asset identity",
      icon: WalletCards,
      copy: "Chain ID and contract address identify a position. Native USDC and bridged USDC.e remain separate even when both target one dollar.",
      facts: [
        "Ticker is display metadata, not identity",
        "Account labels never replace raw identifiers",
        "Pending and confirmed positions are separate",
      ],
    },
    valuation: {
      title: "Valuation",
      icon: CircleDollarSign,
      copy: "Risk views use observable seeded prices with source and timestamp. Stablecoins are not silently fixed at $1 in the resilience calculation.",
      facts: [
        "Missing price remains value unavailable",
        "Stale observations reduce confidence",
        "Accounting policy is a separate view",
      ],
    },
    liquidity: {
      title: "Liquidity",
      icon: Clock3,
      copy: "Time-to-access includes withdrawal mechanics, bridge path, signer availability, and policy—not only market depth.",
      facts: [
        "Same-day, 1–7d, 8–30d, >30d buckets",
        "Policy-restricted value can be excluded",
        "Inaccessible is not the same as lost",
      ],
    },
    stress: {
      title: "Stress calculation",
      icon: FlaskConical,
      copy: "Price shocks apply first; availability constraints then remove stressed value from runway. Burn shocks change the denominator.",
      facts: [
        "Scenarios are assumptions, not predictions",
        "Impact categories avoid double counting",
        "Confidence measures input completeness",
      ],
    },
  }

  const activeMethod = methods[method]
  const ActiveIcon = activeMethod.icon

  return (
    <div className={styles.view}>
      <PageHeader
        eyebrow="Evidence + lineage"
        title="Sources"
        description="See which clock, method, and caveat sits behind each seeded value."
        action={
          <span className={styles.snapshotBadge}>
            <Clock3 size={15} aria-hidden="true" />
            Snapshot {SNAPSHOT}
          </span>
        }
      />

      <div className={styles.sourceNotice}>
        <Database size={18} aria-hidden="true" />
        <div>
          <strong>These values are fixed demonstration data.</strong>
          <span>
            Source names describe a production data model; no API or wallet is
            connected in this demo.
          </span>
        </div>
      </div>

      <section className={styles.card} aria-labelledby="registry-heading">
        <div className={styles.cardHeader}>
          <div>
            <span className={styles.sectionEyebrow}>Data registry</span>
            <h2 id="registry-heading">Source health</h2>
            <p>Each input retains its own observation time and caveat.</p>
          </div>
          <span className={styles.confidenceBadge}>92% confidence</span>
        </div>
        <div className={styles.sourceTable}>
          <div className={styles.sourceTableHeader}>
            <span>Source</span>
            <span>Scope</span>
            <span>Observed</span>
            <span>Status</span>
            <span>Caveat</span>
          </div>
          {sources.map((source) => (
            <div className={styles.sourceRow} key={source.name}>
              <div>
                <SourceIcon type={source.type} />
                <span>
                  <strong>{source.name}</strong>
                  <small>{source.type}</small>
                </span>
              </div>
              <span>{source.scope}</span>
              <span className={styles.mono}>{source.observed}</span>
              <span
                className={`${styles.sourceStatus} ${
                  styles[`source_${source.tone}`]
                }`}
              >
                <span />
                {source.status}
              </span>
              <span>{source.caveat}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.methodologyGrid}>
        <section className={`${styles.card} ${styles.methodNavCard}`}>
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Calculation notes</span>
              <h2>Methodology</h2>
            </div>
          </div>
          <div className={styles.methodTabs}>
            {(Object.keys(methods) as (keyof typeof methods)[]).map((key) => {
              const MethodIcon = methods[key].icon
              return (
                <button
                  type="button"
                  key={key}
                  className={method === key ? styles.methodActive : ""}
                  onClick={() => setMethod(key)}
                >
                  <MethodIcon size={17} aria-hidden="true" />
                  <span>{methods[key].title}</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              )
            })}
          </div>
        </section>

        <section className={`${styles.card} ${styles.methodDetail}`}>
          <div className={styles.methodIcon}>
            <ActiveIcon size={21} aria-hidden="true" />
          </div>
          <span className={styles.sectionEyebrow}>Active method</span>
          <h2>{activeMethod.title}</h2>
          <p>{activeMethod.copy}</p>
          <ul>
            {activeMethod.facts.map((fact) => (
              <li key={fact}>
                <CheckCircle2 size={16} aria-hidden="true" />
                {fact}
              </li>
            ))}
          </ul>
          <a
            href="https://gitbook-docs.coinmetrics.io/market-data/methodologies/coin-metrics-prices-methodology"
            target="_blank"
            rel="noreferrer"
          >
            Reference methodology example
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </section>

        <section className={`${styles.card} ${styles.trustCard}`}>
          <div className={styles.trustIcon}>
            <ShieldCheck size={21} aria-hidden="true" />
          </div>
          <span className={styles.sectionEyebrow}>Trust boundary</span>
          <h2>What Tideguard does not know</h2>
          <p>
            A current index does not guarantee bridge, issuer, custodian, or
            protocol safety. Evidence can be incomplete or age between reviews.
          </p>
          <div className={styles.unknownList}>
            <span>
              <AlertTriangle size={15} aria-hidden="true" />
              Unknown never renders as green
            </span>
            <span>
              <LockKeyhole size={15} aria-hidden="true" />
              Read access does not grant control
            </span>
            <span>
              <Info size={15} aria-hidden="true" />
              Scenarios are not loss forecasts
            </span>
          </div>
        </section>
      </div>
    </div>
  )
}

function SourceIcon({ type }: { type: string }) {
  if (type.includes("Safe")) {
    return (
      <span className={styles.sourceIcon}>
        <Users size={16} aria-hidden="true" />
      </span>
    )
  }
  if (type.includes("prices") || type.includes("Issuer")) {
    return (
      <span className={styles.sourceIcon}>
        <CircleDollarSign size={16} aria-hidden="true" />
      </span>
    )
  }
  if (type.includes("Obligations")) {
    return (
      <span className={styles.sourceIcon}>
        <FileCheck2 size={16} aria-hidden="true" />
      </span>
    )
  }
  return (
    <span className={styles.sourceIcon}>
      <Database size={16} aria-hidden="true" />
    </span>
  )
}

