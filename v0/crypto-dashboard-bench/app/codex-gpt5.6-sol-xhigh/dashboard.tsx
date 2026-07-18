"use client"

import { useEffect, useMemo, useState } from "react"
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Database,
  Download,
  Eye,
  FileCheck2,
  FlaskConical,
  Info,
  Landmark,
  Layers3,
  LockKeyhole,
  Network,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  WalletCards,
  X,
} from "lucide-react"

import {
  actionItems,
  BASELINE_READY_DAYS,
  BOOK_RUNWAY_MONTHS,
  DATA_AS_OF,
  defaultShocks,
  type DemoMode,
  type ExposureGroup,
  exposureData,
  getScenarioResult,
  obligations,
  planItems,
  POLICY_READY_DAYS,
  readinessBuckets,
  REPORTING_CURRENCY,
  shockDefinitions,
  type ShockKey,
  type ShockState,
  sourceItems,
  TOTAL_TREASURY,
} from "./data"
import styles from "./dashboard.module.css"

const STORAGE = {
  shocks: "holdfast-demo-shocks",
  planReviewed: "holdfast-demo-plan-reviewed",
  reviewedActions: "holdfast-demo-reviewed-actions",
} as const

type Overlay = "scenario" | "sources" | "plan" | null
type SectionKey = "overview" | "exposure" | "scenario" | "sources"

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function formatUsd(value: number, decimals = 0) {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(decimals || 2)}M`
  }
  if (value >= 1_000) {
    return `$${Math.round(value / 1_000)}K`
  }
  return `$${value.toFixed(0)}`
}

function getStatusLabel(status: string) {
  if (status === "breach") return "Policy breach"
  if (status === "watch") return "Review"
  if (status === "conditional") return "Conditional"
  return "Within policy"
}

function scrollToSection(section: SectionKey) {
  const id = section === "scenario" ? "overview" : section
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

function BrandMark() {
  return (
    <span className={styles.brandMark} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  )
}

function ModeSwitcher({
  mode,
  onChange,
}: {
  mode: DemoMode
  onChange: (mode: DemoMode) => void
}) {
  const modes: Array<{
    id: DemoMode
    label: string
    detail: string
  }> = [
    { id: "baseline", label: "Baseline", detail: "Normal" },
    { id: "volatile", label: "Volatility", detail: "Stress" },
    { id: "outage", label: "Source outage", detail: "Error" },
    { id: "empty", label: "New workspace", detail: "Empty" },
  ]

  return (
    <div className={styles.modeControl} aria-label="Demo state">
      {modes.map((item) => (
        <button
          type="button"
          key={item.id}
          className={cx(
            styles.modeButton,
            mode === item.id && styles.modeButtonActive
          )}
          aria-pressed={mode === item.id}
          onClick={() => onChange(item.id)}
        >
          <span>{item.label}</span>
          <small>{item.detail}</small>
        </button>
      ))}
    </div>
  )
}

function CoverageChart({
  mode,
  stressedDays,
}: {
  mode: DemoMode
  stressedDays: number
}) {
  const width = 720
  const height = 252
  const pad = { top: 18, right: 20, bottom: 34, left: 52 }
  const plotWidth = width - pad.left - pad.right
  const plotHeight = height - pad.top - pad.bottom
  const axisDays = [0, 14, 28, 42, 56, 70, 84, 90]
  const labels = ["Now", "W2", "W4", "W6", "W8", "W10", "W12", "D90"]
  const pathDays = Array.from(
    new Set([
      ...axisDays,
      BASELINE_READY_DAYS,
      ...(mode === "volatile" ? [stressedDays] : []),
    ])
  ).sort((a, b) => a - b)
  const maxValue = 1_100
  const ticks = [0, 250, 500, 750, 1_000]

  const x = (day: number) => pad.left + (day / 90) * plotWidth
  const y = (value: number) => pad.top + (1 - value / maxValue) * plotHeight

  const valuesForDays = (coverageDays: number, initial: number) =>
    pathDays.map((day) =>
      Math.max(0, initial * (1 - day / Math.max(coverageDays, 1)))
    )

  const baselineValues = valuesForDays(BASELINE_READY_DAYS, 1_040)
  const scenarioInitial = Math.max(
    460,
    1_040 - (BASELINE_READY_DAYS - stressedDays) * 9
  )
  const stressValues = valuesForDays(stressedDays, scenarioInitial)

  const makePath = (values: number[]) =>
    values
      .map(
        (value, index) =>
          `${index === 0 ? "M" : "L"} ${x(pathDays[index]).toFixed(1)} ${y(
            value
          ).toFixed(1)}`
      )
      .join(" ")

  const baselinePath = makePath(baselineValues)
  const baselineArea = `${baselinePath} L ${x(90)} ${y(0)} L ${x(0)} ${y(0)} Z`
  const stressPath = makePath(stressValues)
  const showStress = mode === "volatile"

  return (
    <div
      className={styles.chartWrap}
      role="img"
      aria-label={
        showStress
          ? `Seeded chart of payment-ready liquidity over 90 days. Baseline coverage reaches zero at day ${BASELINE_READY_DAYS}. The active stress scenario reaches zero at day ${stressedDays}.`
          : `Seeded chart of payment-ready liquidity over 90 days. Baseline coverage reaches zero at day ${BASELINE_READY_DAYS}, seven days before policy.`
      }
    >
      <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
        <defs>
          <linearGradient id="holdfast-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2b7a70" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#2b7a70" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={y(tick)}
              y2={y(tick)}
              className={styles.chartGrid}
            />
            <text
              x={pad.left - 10}
              y={y(tick) + 4}
              textAnchor="end"
              className={styles.chartAxis}
            >
              {tick === 1_000 ? "$1.0M" : tick === 0 ? "$0" : `$${tick}K`}
            </text>
          </g>
        ))}

        {axisDays.map((day, index) => (
          <g key={day}>
            <line
              x1={x(day)}
              x2={x(day)}
              y1={height - pad.bottom}
              y2={height - pad.bottom + 5}
              className={styles.chartTick}
            />
            <text
              x={x(day)}
              y={height - 10}
              textAnchor={
                index === 0
                  ? "start"
                  : index === axisDays.length - 1
                    ? "end"
                    : "middle"
              }
              className={styles.chartAxis}
            >
              {labels[index]}
            </text>
          </g>
        ))}

        <path d={baselineArea} fill="url(#holdfast-area)" />
        <path d={baselinePath} className={styles.chartBaseline} />

        {showStress ? (
          <path d={stressPath} className={styles.chartStress} />
        ) : null}

        <line
          x1={x(BASELINE_READY_DAYS)}
          x2={x(BASELINE_READY_DAYS)}
          y1={pad.top + 12}
          y2={height - pad.bottom}
          className={styles.chartGapLine}
        />
        <text
          x={x(BASELINE_READY_DAYS) - 7}
          y={pad.top + 8}
          textAnchor="end"
          className={styles.chartAnnotation}
        >
          Baseline gap · day 83
        </text>

        {showStress ? (
          <>
            <circle
              cx={x(stressedDays)}
              cy={y(0)}
              r="4"
              className={styles.chartStressPoint}
            />
            <text
              x={Math.max(pad.left + 60, x(stressedDays))}
              y={height - pad.bottom - 10}
              textAnchor="middle"
              className={styles.chartStressLabel}
            >
              Stress gap · day {stressedDays}
            </text>
          </>
        ) : null}
      </svg>
    </div>
  )
}

function SourceStatusButton({
  mode,
  onClick,
}: {
  mode: DemoMode
  onClick: () => void
}) {
  const outage = mode === "outage"
  const empty = mode === "empty"
  return (
    <button
      type="button"
      className={cx(styles.sourceStatus, outage && styles.sourceStatusWarning)}
      onClick={onClick}
      aria-label={
        empty
          ? "Open source model. No sources have been added."
          : outage
            ? "Open source health. Three of five sources healthy and two stale."
            : "Open source health. Five of five sources healthy."
      }
    >
      {empty ? (
        <Database size={16} />
      ) : outage ? (
        <ShieldAlert size={16} />
      ) : (
        <ShieldCheck size={16} />
      )}
      <span>
        {empty ? "0/5 sources" : outage ? "3/5 · 2 stale" : "5/5 healthy"}
      </span>
    </button>
  )
}

function OverlayShell({
  title,
  eyebrow,
  children,
  onClose,
  wide = false,
}: {
  title: string
  eyebrow: string
  children: React.ReactNode
  onClose: () => void
  wide?: boolean
}) {
  return (
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className={cx(styles.drawer, wide && styles.drawerWide)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="holdfast-dialog-title"
      >
        <header className={styles.drawerHeader}>
          <div>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 id="holdfast-dialog-title">{title}</h2>
          </div>
          <button
            type="button"
            className={styles.iconButton}
            onClick={onClose}
            aria-label={`Close ${title}`}
            autoFocus
          >
            <X size={19} />
          </button>
        </header>
        <div className={styles.drawerBody}>{children}</div>
      </section>
    </div>
  )
}

function ScenarioDrawer({
  shocks,
  onChange,
  onReset,
  onRun,
  onPlan,
  onClose,
}: {
  shocks: ShockState
  onChange: (key: ShockKey) => void
  onReset: () => void
  onRun: () => void
  onPlan: () => void
  onClose: () => void
}) {
  const result = getScenarioResult(shocks)

  return (
    <OverlayShell
      title="Stress lab"
      eyebrow="Seeded what-if · deterministic"
      onClose={onClose}
      wide
    >
      <div className={styles.scenarioIntro}>
        <FlaskConical size={20} />
        <p>
          Combine dependency shocks to see when critical obligations become
          uncovered. This is a what-if estimate, not a forecast or advice.
        </p>
      </div>

      <div className={styles.shockList}>
        {(Object.keys(shockDefinitions) as ShockKey[]).map((key) => {
          const shock = shockDefinitions[key]
          return (
            <button
              type="button"
              key={key}
              className={cx(
                styles.shockOption,
                shocks[key] && styles.shockOptionActive
              )}
              aria-pressed={shocks[key]}
              onClick={() => onChange(key)}
            >
              <span
                className={cx(
                  styles.switch,
                  shocks[key] && styles.switchActive
                )}
                aria-hidden="true"
              >
                <span />
              </span>
              <span className={styles.shockCopy}>
                <span className={styles.shockMeta}>{shock.label}</span>
                <strong>{shock.title}</strong>
                <small>{shock.description}</small>
              </span>
              <span className={styles.shockImpact}>−{shock.dayImpact}d</span>
            </button>
          )
        })}
      </div>

      <section className={styles.scenarioResult}>
        <div className={styles.scenarioMetric}>
          <span>Stressed coverage</span>
          <strong>{result.days} days</strong>
          <small>
            Modelled {result.low}–{result.high} days from seeded settlement
            timing
          </small>
        </div>
        <div className={styles.scenarioFacts}>
          <div>
            <span>Shortfall to policy</span>
            <strong>{formatUsd(result.shortfall)}</strong>
          </div>
          <div>
            <span>Ready value impact</span>
            <strong>{formatUsd(result.unavailable)}</strong>
          </div>
          <div>
            <span>First exposed</span>
            <strong>{result.firstExposed}</strong>
          </div>
        </div>
      </section>

      <div className={styles.assumptionBox}>
        <Info size={17} />
        <p>
          Result uses the fixed {DATA_AS_OF} snapshot, a $12.5K seeded daily
          critical outflow, and no assumed emergency credit or new inflows.
        </p>
      </div>

      <footer className={styles.drawerActions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onReset}
        >
          <RotateCcw size={16} />
          Reset
        </button>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onRun}
        >
          Save scenario
        </button>
        <button type="button" className={styles.primaryButton} onClick={onPlan}>
          Review coverage plan
          <ArrowRight size={16} />
        </button>
      </footer>
    </OverlayShell>
  )
}

function SourcesDrawer({
  mode,
  onClose,
}: {
  mode: DemoMode
  onClose: () => void
}) {
  return (
    <OverlayShell
      title="Source health & provenance"
      eyebrow="Seeded data lineage"
      onClose={onClose}
      wide
    >
      <div
        className={cx(
          styles.provenanceSummary,
          mode === "outage" && styles.provenanceSummaryWarning
        )}
      >
        {mode === "empty" ? (
          <Database size={22} />
        ) : mode === "outage" ? (
          <ShieldAlert size={22} />
        ) : (
          <ShieldCheck size={22} />
        )}
        <div>
          <strong>
            {mode === "empty"
              ? "No sources have been added"
              : mode === "outage"
                ? "Coverage precision is reduced"
                : "All seeded sources are inside their freshness limits"}
          </strong>
          <p>
            {mode === "empty"
              ? "These example rows preview the least-privilege source classes used by a configured workspace."
              : mode === "outage"
                ? "Venue exports and liquidity depth are stale. Last-known values remain visible for context but are excluded from high-confidence stress output."
                : "This fixed demo snapshot illustrates source classes and health states. No external API is called."}
          </p>
        </div>
      </div>

      <div className={styles.sourceList}>
        {sourceItems.map((source) => {
          const stale = mode === "outage" && source.staleInOutage
          return (
            <article className={styles.sourceRow} key={source.id}>
              <div
                className={cx(
                  styles.sourceIcon,
                  stale && styles.sourceIconWarning
                )}
              >
                {mode === "empty" ? (
                  <Database size={17} />
                ) : stale ? (
                  <AlertTriangle size={17} />
                ) : (
                  <Check size={17} />
                )}
              </div>
              <div className={styles.sourceMain}>
                <strong>{source.name}</strong>
                <span>{source.supplies}</span>
                <small>{source.effect}</small>
              </div>
              <div className={styles.sourceMeta}>
                <span>{source.permission}</span>
                <strong>
                  {mode === "empty"
                    ? "Example"
                    : stale
                      ? "Stale · 47 min"
                      : source.observed}
                </strong>
              </div>
            </article>
          )
        })}
      </div>

      <div className={styles.methodGrid}>
        <div>
          <span>Snapshot</span>
          <strong>{DATA_AS_OF}</strong>
        </div>
        <div>
          <span>Reporting currency</span>
          <strong>{REPORTING_CURRENCY}</strong>
        </div>
        <div>
          <span>Calculation</span>
          <strong>Readiness model v0.3 demo</strong>
        </div>
        <div>
          <span>Data status</span>
          <strong>Seeded · no live connection</strong>
        </div>
      </div>
    </OverlayShell>
  )
}

function PlanDrawer({
  reviewed,
  onReviewed,
  onExport,
  exported,
  onClose,
}: {
  reviewed: boolean
  onReviewed: () => void
  onExport: () => void
  exported: boolean
  onClose: () => void
}) {
  return (
    <OverlayShell
      title="Coverage plan"
      eyebrow="Draft · non-executable"
      onClose={onClose}
      wide
    >
      <div className={styles.planWarning}>
        <LockKeyhole size={20} />
        <div>
          <strong>Review only. Holdfast cannot move funds.</strong>
          <p>
            Verify destination, price, fees, liquidity, permissions, and policy
            inside your execution system before preparing any proposal.
          </p>
        </div>
      </div>

      <div className={styles.planList}>
        {planItems.map((item, index) => (
          <article className={styles.planItem} key={item.id}>
            <span className={styles.planNumber}>{index + 1}</span>
            <div className={styles.planMain}>
              <div className={styles.planTopline}>
                <strong>{item.amount}</strong>
                <span>{item.chain}</span>
              </div>
              <h3>{item.route}</h3>
              <p>{item.rationale}</p>
              <div className={styles.planFoot}>
                <span>
                  <ShieldCheck size={14} />
                  {item.impact}
                </span>
                <span>
                  <FileCheck2 size={14} />
                  {item.approval}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.planAudit}>
        <div>
          <span>Prepared from</span>
          <strong>{DATA_AS_OF}</strong>
        </div>
        <div>
          <span>Plan status</span>
          <strong>
            {reviewed ? "Reviewed locally" : "Draft · not reviewed"}
          </strong>
        </div>
      </div>

      {exported ? (
        <div className={styles.exportNotice} role="status">
          <CheckCircle2 size={17} />
          Demo plan exported with assumptions and seeded-data labels.
        </div>
      ) : null}

      <footer className={styles.drawerActions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onExport}
        >
          <Download size={16} />
          Export JSON
        </button>
        <button
          type="button"
          className={cx(
            styles.primaryButton,
            reviewed && styles.reviewedButton
          )}
          onClick={onReviewed}
        >
          {reviewed ? <Check size={16} /> : <FileCheck2 size={16} />}
          {reviewed ? "Reviewed" : "Mark reviewed"}
        </button>
      </footer>
    </OverlayShell>
  )
}

function EmptyWorkspace({
  onLoad,
  onSources,
}: {
  onLoad: () => void
  onSources: () => void
}) {
  const steps = [
    {
      icon: WalletCards,
      title: "Add public wallets",
      copy: "Start with addresses and Safe accounts. No signature required.",
    },
    {
      icon: Eye,
      title: "Add read-only sources",
      copy: "Use least-privilege exports or API credentials for venues.",
    },
    {
      icon: CalendarClock,
      title: "Import obligations",
      copy: "Add the next 30–90 days of payroll, vendors, and tax.",
    },
    {
      icon: SlidersHorizontal,
      title: "Set policy",
      copy: "Choose minimum ready days and concentration limits.",
    },
  ]

  return (
    <section className={styles.emptyState}>
      <div className={styles.emptyHero}>
        <span className={styles.emptyIcon}>
          <ShieldCheck size={30} />
        </span>
        <p className={styles.eyebrow}>Safe onboarding</p>
        <h1>Start read-only.</h1>
        <p>
          Holdfast needs positions and dated obligations—not a wallet
          connection—to calculate a first coverage view.
        </p>
        <div className={styles.emptyActions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onLoad}
          >
            Load seeded workspace
            <ArrowRight size={16} />
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onSources}
          >
            <Database size={16} />
            Preview source model
          </button>
        </div>
      </div>

      <div className={styles.onboardingGrid}>
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <article key={step.title}>
              <span>{index + 1}</span>
              <Icon size={20} />
              <h2>{step.title}</h2>
              <p>{step.copy}</p>
            </article>
          )
        })}
      </div>

      <div className={styles.emptyTrust}>
        <LockKeyhole size={18} />
        <span>
          Never share a seed phrase. Production onboarding accepts public
          addresses and scoped read-only access only.
        </span>
      </div>
    </section>
  )
}

export function HoldfastDashboard() {
  const [mode, setMode] = useState<DemoMode>("baseline")
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [activeSection, setActiveSection] = useState<SectionKey>("overview")
  const [group, setGroup] = useState<ExposureGroup>("asset")
  const [selectedExposure, setSelectedExposure] = useState("usdc")
  const [selectedAction, setSelectedAction] = useState(actionItems[0].id)
  const [shocks, setShocks] = useState<ShockState>(defaultShocks)
  const [planReviewed, setPlanReviewed] = useState(false)
  const [reviewedActions, setReviewedActions] = useState<string[]>([])
  const [exported, setExported] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedShocks = window.localStorage.getItem(STORAGE.shocks)
        if (savedShocks) {
          const parsed = JSON.parse(savedShocks) as Partial<ShockState>
          setShocks({
            usdc:
              typeof parsed.usdc === "boolean"
                ? parsed.usdc
                : defaultShocks.usdc,
            coinbase:
              typeof parsed.coinbase === "boolean"
                ? parsed.coinbase
                : defaultShocks.coinbase,
            base:
              typeof parsed.base === "boolean"
                ? parsed.base
                : defaultShocks.base,
          })
        }
        setPlanReviewed(
          window.localStorage.getItem(STORAGE.planReviewed) === "true"
        )
        const savedReviewed = window.localStorage.getItem(
          STORAGE.reviewedActions
        )
        if (savedReviewed) {
          const parsed = JSON.parse(savedReviewed)
          if (Array.isArray(parsed)) {
            setReviewedActions(
              parsed.filter((item): item is string => typeof item === "string")
            )
          }
        }
      } catch {
        // A blocked or malformed localStorage should not block the demo.
      }
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!overlay) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOverlay(null)
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [overlay])

  const scenario = useMemo(() => getScenarioResult(shocks), [shocks])
  const exposureRows = exposureData[group]
  const selectedExposureRow =
    exposureRows.find((row) => row.id === selectedExposure) ?? exposureRows[0]
  const selectedActionItem =
    actionItems.find((item) => item.id === selectedAction) ?? actionItems[0]

  const changeGroup = (nextGroup: ExposureGroup) => {
    setGroup(nextGroup)
    setSelectedExposure(exposureData[nextGroup][0].id)
  }

  const navigate = (section: SectionKey) => {
    setActiveSection(section)
    if (section === "scenario") {
      setOverlay("scenario")
      return
    }
    if (section === "sources") {
      setOverlay("sources")
      return
    }
    scrollToSection(section)
  }

  const saveScenario = () => {
    try {
      window.localStorage.setItem(STORAGE.shocks, JSON.stringify(shocks))
    } catch {
      // Persistence is a convenience, not a dependency.
    }
    setMode("volatile")
    setOverlay(null)
  }

  const markPlanReviewed = () => {
    const next = !planReviewed
    setPlanReviewed(next)
    try {
      window.localStorage.setItem(STORAGE.planReviewed, String(next))
    } catch {
      // Persistence is a convenience, not a dependency.
    }
  }

  const toggleActionReviewed = (id: string) => {
    const next = reviewedActions.includes(id)
      ? reviewedActions.filter((item) => item !== id)
      : [...reviewedActions, id]
    setReviewedActions(next)
    try {
      window.localStorage.setItem(STORAGE.reviewedActions, JSON.stringify(next))
    } catch {
      // Persistence is a convenience, not a dependency.
    }
  }

  const exportPlan = () => {
    const payload = {
      product: "Holdfast",
      data_status: "seeded_demo",
      data_as_of: DATA_AS_OF,
      reporting_currency: REPORTING_CURRENCY,
      executable: false,
      reviewed: planReviewed,
      scenario: {
        shocks,
        estimated_ready_days: scenario.days,
        estimated_range_days: [scenario.low, scenario.high],
        shortfall_to_90_day_policy_usd: scenario.shortfall,
      },
      assumptions: [
        "Fixed seeded snapshot; no live wallet, market, or venue connection.",
        "Deterministic what-if model; not a forecast or recommendation.",
        "Verify destination, price, liquidity, fees, permissions, and policy before execution elsewhere.",
      ],
      items: planItems,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "holdfast-seeded-coverage-plan.json"
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    setExported(true)
  }

  const navItems: Array<{
    id: SectionKey
    label: string
    icon: typeof ShieldCheck
  }> = [
    { id: "overview", label: "Overview", icon: Layers3 },
    { id: "exposure", label: "Exposure", icon: WalletCards },
    { id: "scenario", label: "Scenarios", icon: FlaskConical },
    { id: "sources", label: "Sources", icon: Database },
  ]

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <BrandMark />
          <div>
            <strong>Holdfast</strong>
            <span>Treasury readiness</span>
          </div>
        </div>

        <div className={styles.workspaceCard}>
          <span className={styles.workspaceInitial}>
            {mode === "empty" ? "+" : "N"}
          </span>
          <div>
            <strong>
              {mode === "empty" ? "New workspace" : "Northstar Labs"}
            </strong>
            <small>
              {mode === "empty" ? "No sources yet" : "Seeded workspace"}
            </small>
          </div>
          <ChevronRight size={16} />
        </div>

        <nav className={styles.sideNav} aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                type="button"
                key={item.id}
                className={cx(
                  styles.navItem,
                  activeSection === item.id && styles.navItemActive
                )}
                onClick={() => navigate(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className={styles.sidebarDivider} />

        <div className={styles.policyMini}>
          <div className={styles.policyMiniHeader}>
            <span>Coverage policy</span>
            <ShieldAlert size={15} />
          </div>
          <strong>
            {mode === "empty"
              ? "No policy"
              : `${mode === "volatile" ? scenario.days : 83} / 90 days`}
          </strong>
          <div className={styles.miniTrack}>
            <span
              style={{
                width:
                  mode === "empty"
                    ? "0%"
                    : `${
                        (Math.min(
                          mode === "volatile" ? scenario.days : 83,
                          90
                        ) /
                          90) *
                        100
                      }%`,
              }}
            />
          </div>
          <small>
            {mode === "empty"
              ? "Add obligations and limits"
              : `${90 - (mode === "volatile" ? scenario.days : 83)}-day ${
                  mode === "volatile" ? "stress " : ""
                }gap`}
          </small>
        </div>

        <div className={styles.sidebarFoot}>
          <LockKeyhole size={15} />
          <p>
            Read-only demo.
            <br />
            No signing or execution.
          </p>
        </div>
      </aside>

      <div className={styles.shell}>
        <header className={styles.topbar}>
          <div className={styles.mobileBrand}>
            <BrandMark />
            <strong>Holdfast</strong>
          </div>
          <div className={styles.pageTitle}>
            <p>
              Finance / {mode === "empty" ? "New workspace" : "Northstar Labs"}
            </p>
            <strong>Treasury readiness</strong>
          </div>
          <div className={styles.topbarActions}>
            <span className={styles.demoBadge}>Seeded demo</span>
            <span className={styles.snapshot}>
              <Clock3 size={14} />
              {DATA_AS_OF}
            </span>
            <SourceStatusButton
              mode={mode}
              onClick={() => setOverlay("sources")}
            />
            <span
              className={styles.avatar}
              role="img"
              aria-label="Northstar finance team"
            >
              {mode === "empty" ? "NW" : "NF"}
            </span>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.mobileContext}>
            <div>
              <span className={styles.demoBadge}>Seeded demo</span>
              <span>{DATA_AS_OF}</span>
            </div>
            <SourceStatusButton
              mode={mode}
              onClick={() => setOverlay("sources")}
            />
          </div>

          <section className={styles.stateBar} aria-label="Demo states">
            <div className={styles.stateBarCopy}>
              <span>Explore product states</span>
              <p>
                Fixed inputs make normal, volatile, stale, and empty states
                comparable.
              </p>
            </div>
            <ModeSwitcher mode={mode} onChange={setMode} />
          </section>

          {mode === "empty" ? (
            <EmptyWorkspace
              onLoad={() => setMode("baseline")}
              onSources={() => setOverlay("sources")}
            />
          ) : (
            <>
              {mode === "outage" ? (
                <section className={styles.outageBanner} role="status">
                  <AlertTriangle size={20} />
                  <div>
                    <strong>Coverage precision is reduced.</strong>
                    <p>
                      Venue exports and liquidity depth are outside freshness
                      limits. Last-known values are visible for context.
                    </p>
                  </div>
                  <button type="button" onClick={() => setOverlay("sources")}>
                    Review sources
                    <ChevronRight size={16} />
                  </button>
                </section>
              ) : mode === "volatile" ? (
                <section className={styles.volatilityBanner} role="status">
                  <FlaskConical size={20} />
                  <div>
                    <strong>
                      Active scenario: {scenario.keys.length} seeded shock
                      {scenario.keys.length === 1 ? "" : "s"}
                    </strong>
                    <p>
                      Estimated coverage falls to {scenario.days} days; modelled
                      range {scenario.low}–{scenario.high} from settlement
                      timing.
                    </p>
                  </div>
                  <button type="button" onClick={() => setOverlay("scenario")}>
                    Edit scenario
                    <ChevronRight size={16} />
                  </button>
                </section>
              ) : null}

              <section
                className={styles.heroGrid}
                id="overview"
                aria-labelledby="readiness-heading"
              >
                <article className={styles.coverageCard}>
                  <div className={styles.cardTop}>
                    <div>
                      <p className={styles.eyebrow}>Payment-ready coverage</p>
                      <h1 id="readiness-heading">
                        {mode === "volatile"
                          ? scenario.days
                          : BASELINE_READY_DAYS}
                        <span> days</span>
                      </h1>
                    </div>
                    <span
                      className={cx(
                        styles.metricStatus,
                        mode === "volatile" && styles.metricStatusRisk
                      )}
                    >
                      <ShieldAlert size={15} />
                      {mode === "volatile"
                        ? `${POLICY_READY_DAYS - scenario.days} below policy`
                        : "7 below policy"}
                    </span>
                  </div>

                  <p className={styles.coverageLead}>
                    {mode === "volatile"
                      ? `${formatUsd(
                          scenario.shortfall
                        )} would restore the seeded 90-day policy under this scenario.`
                      : "$87.5K of additional payment-ready value closes the policy gap before Q4 payroll."}
                  </p>

                  <div className={styles.coverageTrackWrap}>
                    <div className={styles.coverageTrackLabels}>
                      <span>0 days</span>
                      <span>Policy · 90 days</span>
                    </div>
                    <div className={styles.coverageTrack}>
                      <span
                        className={cx(
                          styles.coverageFill,
                          mode === "volatile" && styles.coverageFillRisk
                        )}
                        style={{
                          width: `${Math.min(
                            100,
                            ((mode === "volatile"
                              ? scenario.days
                              : BASELINE_READY_DAYS) /
                              POLICY_READY_DAYS) *
                              100
                          )}%`,
                        }}
                      />
                      <i aria-hidden="true" />
                    </div>
                    <div className={styles.coverageTrackMeta}>
                      <span>{formatUsd(1_040_000)} ready now</span>
                      <span>{formatUsd(TOTAL_TREASURY, 2)} marked value</span>
                    </div>
                  </div>

                  <div className={styles.heroFacts}>
                    <div>
                      <span>Book runway</span>
                      <strong>{BOOK_RUNWAY_MONTHS} months</strong>
                      <small>Market value ÷ seeded monthly burn</small>
                    </div>
                    <div>
                      <span>First uncovered</span>
                      <strong>
                        {mode === "volatile"
                          ? scenario.firstExposed
                          : "Q4 payroll · Oct 07"}
                      </strong>
                      <small>Critical obligations only</small>
                    </div>
                    <div>
                      <span>Confidence</span>
                      <strong>
                        {mode === "outage" ? "Reduced" : "Modelled range"}
                      </strong>
                      <small>
                        {mode === "outage"
                          ? "2 sources stale"
                          : "Settlement timing ±5d"}
                      </small>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className={styles.primaryButton}
                      onClick={() => setOverlay("scenario")}
                    >
                      <FlaskConical size={16} />
                      Stress this gap
                    </button>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() => setOverlay("plan")}
                    >
                      Review plan
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  <div className={styles.methodNote}>
                    <Info size={14} />
                    <span>
                      Applies seeded price, availability, approval, and policy
                      haircuts. It is not an accounting classification.
                    </span>
                  </div>
                </article>

                <article className={styles.actionCard}>
                  <div className={styles.sectionHeading}>
                    <div>
                      <p className={styles.eyebrow}>Action queue</p>
                      <h2>Needs review today</h2>
                    </div>
                    <span>{actionItems.length}</span>
                  </div>

                  <div className={styles.actionList}>
                    {actionItems.map((item) => {
                      const reviewed = reviewedActions.includes(item.id)
                      return (
                        <button
                          type="button"
                          key={item.id}
                          className={cx(
                            styles.actionItem,
                            selectedAction === item.id &&
                              styles.actionItemActive
                          )}
                          aria-pressed={selectedAction === item.id}
                          onClick={() => setSelectedAction(item.id)}
                        >
                          <span
                            className={cx(
                              styles.actionSeverity,
                              item.severity === "Priority" &&
                                styles.actionSeverityPriority,
                              item.severity === "Policy" &&
                                styles.actionSeverityPolicy
                            )}
                          >
                            {reviewed ? (
                              <Check size={14} />
                            ) : (
                              <AlertTriangle size={14} />
                            )}
                            {reviewed ? "Reviewed" : item.severity}
                          </span>
                          <strong>{item.title}</strong>
                          <small>{item.impact}</small>
                        </button>
                      )
                    })}
                  </div>

                  <div className={styles.actionDetail}>
                    <div className={styles.actionTags}>
                      {selectedActionItem.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <p>{selectedActionItem.summary}</p>
                    <dl>
                      <div>
                        <dt>Evidence</dt>
                        <dd>{selectedActionItem.evidence}</dd>
                      </div>
                      <div>
                        <dt>Policy</dt>
                        <dd>{selectedActionItem.policy}</dd>
                      </div>
                    </dl>
                    <div className={styles.actionDetailButtons}>
                      <button
                        type="button"
                        className={styles.textButton}
                        onClick={() =>
                          toggleActionReviewed(selectedActionItem.id)
                        }
                      >
                        {reviewedActions.includes(selectedActionItem.id) ? (
                          <>
                            <Check size={15} />
                            Reviewed
                          </>
                        ) : (
                          <>
                            <FileCheck2 size={15} />
                            Mark reviewed
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className={styles.textButton}
                        onClick={() =>
                          setOverlay(
                            selectedActionItem.id === "coverage-gap"
                              ? "scenario"
                              : "plan"
                          )
                        }
                      >
                        {selectedActionItem.next}
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              </section>

              <section className={styles.analysisGrid}>
                <article className={styles.chartCard}>
                  <div className={styles.sectionHeading}>
                    <div>
                      <p className={styles.eyebrow}>90-day view</p>
                      <h2>Payment-ready liquidity remaining</h2>
                    </div>
                    <div className={styles.chartLegend} aria-hidden="true">
                      <span>
                        <i className={styles.legendBaseline} />
                        Baseline
                      </span>
                      {mode === "volatile" ? (
                        <span>
                          <i className={styles.legendStress} />
                          Stress
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {mode === "outage" ? (
                    <div className={styles.chartUnavailable}>
                      <Database size={26} />
                      <strong>Precise stress path withheld</strong>
                      <p>
                        Liquidity-depth and venue observations are stale. The
                        last baseline remains available in the overview, but a
                        new scenario should wait for refreshed evidence.
                      </p>
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={() => setOverlay("sources")}
                      >
                        Review stale sources
                      </button>
                    </div>
                  ) : (
                    <CoverageChart mode={mode} stressedDays={scenario.days} />
                  )}

                  <div className={styles.readinessStrip}>
                    {readinessBuckets.map((bucket) => (
                      <div key={bucket.label}>
                        <span
                          className={cx(
                            styles.readinessDot,
                            styles[`readiness_${bucket.tone}`]
                          )}
                        />
                        <p>{bucket.label}</p>
                        <strong>{formatUsd(bucket.value)}</strong>
                      </div>
                    ))}
                  </div>
                </article>

                <article className={styles.obligationsCard}>
                  <div className={styles.sectionHeading}>
                    <div>
                      <p className={styles.eyebrow}>Critical flows</p>
                      <h2>Next obligations</h2>
                    </div>
                    <CalendarClock size={19} />
                  </div>

                  <div className={styles.obligationList}>
                    {obligations.map((item) => (
                      <article key={`${item.date}-${item.title}`}>
                        <div className={styles.obligationDate}>
                          <strong>{item.date}</strong>
                          <span>{item.relative}</span>
                        </div>
                        <div className={styles.obligationMain}>
                          <strong>{item.title}</strong>
                          <span>{item.rail}</span>
                        </div>
                        <div className={styles.obligationAmount}>
                          <strong>{formatUsd(item.amount)}</strong>
                          <span
                            className={cx(
                              item.state === "Exposed in stress" &&
                                styles.obligationExposed
                            )}
                          >
                            {item.state}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={styles.fullTextButton}
                    onClick={() => setOverlay("scenario")}
                  >
                    See first exposed obligation
                    <ArrowRight size={16} />
                  </button>
                </article>
              </section>

              <section
                className={styles.exposureCard}
                id="exposure"
                aria-labelledby="exposure-heading"
              >
                <div className={styles.exposureHeader}>
                  <div>
                    <p className={styles.eyebrow}>Dependency map</p>
                    <h2 id="exposure-heading">Where liquidity can fail</h2>
                    <p>
                      Marked value grouped by the dependency you are reviewing.
                    </p>
                  </div>
                  <div
                    className={styles.groupControl}
                    aria-label="Group exposure"
                  >
                    {(["asset", "venue", "chain"] as ExposureGroup[]).map(
                      (item) => (
                        <button
                          type="button"
                          key={item}
                          aria-pressed={group === item}
                          className={cx(
                            group === item && styles.groupControlActive
                          )}
                          onClick={() => changeGroup(item)}
                        >
                          {item === "asset"
                            ? "Asset"
                            : item === "venue"
                              ? "Venue"
                              : "Network"}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className={styles.exposureTable}>
                  <div className={styles.exposureTableHead} aria-hidden="true">
                    <span>Dependency</span>
                    <span>Marked value</span>
                    <span>Share</span>
                    <span>Readiness</span>
                    <span>Policy</span>
                    <span>Age</span>
                  </div>
                  {exposureRows.map((row) => (
                    <button
                      type="button"
                      key={row.id}
                      className={cx(
                        styles.exposureRow,
                        selectedExposureRow.id === row.id &&
                          styles.exposureRowActive
                      )}
                      aria-pressed={selectedExposureRow.id === row.id}
                      onClick={() => setSelectedExposure(row.id)}
                    >
                      <span className={styles.exposureName}>
                        <i>{row.short}</i>
                        <span>
                          <strong>{row.name}</strong>
                          <small>{row.type}</small>
                        </span>
                      </span>
                      <span className={styles.exposureValue}>
                        <strong>{formatUsd(row.value)}</strong>
                        <small>{row.value.toLocaleString("en-US")} USD</small>
                      </span>
                      <span className={styles.exposureShare}>
                        <span>
                          <i style={{ width: `${row.share}%` }} />
                        </span>
                        <strong>{row.share.toFixed(1)}%</strong>
                      </span>
                      <span className={styles.exposureReady}>{row.ready}</span>
                      <span
                        className={cx(
                          styles.exposurePolicy,
                          styles[`status_${row.status}`]
                        )}
                      >
                        <i />
                        {getStatusLabel(row.status)}
                      </span>
                      <span className={styles.exposureAge}>{row.age}</span>
                      <ChevronRight
                        size={16}
                        className={styles.exposureChevron}
                      />
                    </button>
                  ))}
                </div>

                <div className={styles.exposureDetail}>
                  <div className={styles.exposureDetailLead}>
                    <span
                      className={cx(
                        styles.exposureDetailIcon,
                        styles[`statusBg_${selectedExposureRow.status}`]
                      )}
                    >
                      {group === "asset" ? (
                        <CircleDollarSign size={20} />
                      ) : group === "venue" ? (
                        <Landmark size={20} />
                      ) : (
                        <Network size={20} />
                      )}
                    </span>
                    <div>
                      <p className={styles.eyebrow}>Selected dependency</p>
                      <h3>{selectedExposureRow.name}</h3>
                      <span>{selectedExposureRow.policy}</span>
                    </div>
                  </div>
                  <div className={styles.exposureDetailBody}>
                    <p>{selectedExposureRow.detail}</p>
                    <dl>
                      <div>
                        <dt>Lineage</dt>
                        <dd>{selectedExposureRow.lineage}</dd>
                      </div>
                      <div>
                        <dt>Provenance</dt>
                        <dd>{selectedExposureRow.source}</dd>
                      </div>
                    </dl>
                  </div>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() =>
                      setOverlay(
                        selectedExposureRow.status === "breach"
                          ? "plan"
                          : "scenario"
                      )
                    }
                  >
                    {selectedExposureRow.status === "breach"
                      ? "Review related plan"
                      : "Stress dependency"}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </section>

              <section className={styles.provenanceFooter} id="sources">
                <div>
                  <Database size={18} />
                  <p>
                    Fixed seeded snapshot · {DATA_AS_OF} · {REPORTING_CURRENCY}{" "}
                    · no live connections
                  </p>
                </div>
                <button type="button" onClick={() => setOverlay("sources")}>
                  View provenance
                  <ArrowRight size={15} />
                </button>
              </section>
            </>
          )}
        </main>

        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                type="button"
                key={item.id}
                className={cx(
                  activeSection === item.id && styles.mobileNavActive
                )}
                onClick={() => navigate(item.id)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {overlay === "scenario" ? (
        <ScenarioDrawer
          shocks={shocks}
          onChange={(key) =>
            setShocks((current) => ({ ...current, [key]: !current[key] }))
          }
          onReset={() => setShocks(defaultShocks)}
          onRun={saveScenario}
          onPlan={() => setOverlay("plan")}
          onClose={() => setOverlay(null)}
        />
      ) : null}

      {overlay === "sources" ? (
        <SourcesDrawer mode={mode} onClose={() => setOverlay(null)} />
      ) : null}

      {overlay === "plan" ? (
        <PlanDrawer
          reviewed={planReviewed}
          onReviewed={markPlanReviewed}
          onExport={exportPlan}
          exported={exported}
          onClose={() => setOverlay(null)}
        />
      ) : null}
    </div>
  )
}
