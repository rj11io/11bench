"use client"

import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Clock3,
  Cloud,
  Database,
  FileText,
  Fingerprint,
  KeyRound,
  LayoutDashboard,
  Radar,
  RefreshCw,
  RotateCcw,
  Route,
  Scissors,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
  X,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  baseActivity,
  criticalAssets,
  ownerOptions,
  scenarios,
  type BreachPath,
  type ControlCut,
  type PathStatus,
  type ScenarioKey,
} from "./data"
import styles from "./dashboard.module.css"
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

type NavKey = "mission" | "paths" | "cuts" | "assets" | "activity"

interface StoredWorkflow {
  statuses: Record<string, PathStatus>
  owners: Record<string, string>
  startedAt: Record<string, string>
}

const STORAGE_KEY = "breakline-demo-workflow-v1"

const navItems: Array<{
  id: NavKey
  label: string
  shortLabel: string
  icon: LucideIcon
}> = [
  {
    id: "mission",
    label: "Mission Control",
    shortLabel: "Mission",
    icon: LayoutDashboard,
  },
  { id: "paths", label: "Breach paths", shortLabel: "Paths", icon: Route },
  {
    id: "cuts",
    label: "Control cuts",
    shortLabel: "Cuts",
    icon: Scissors,
  },
  {
    id: "assets",
    label: "Critical assets",
    shortLabel: "Assets",
    icon: Database,
  },
  { id: "activity", label: "Activity", shortLabel: "Activity", icon: Activity },
]

const scenarioOrder: ScenarioKey[] = ["high", "steady", "cleared"]

const statusLabels: Record<PathStatus, string> = {
  needs_decision: "Needs decision",
  planned: "Planned",
  in_progress: "In progress",
  verified: "Verified",
}

function statusClass(status: PathStatus) {
  if (status === "in_progress") return styles.statusProgress
  if (status === "planned") return styles.statusPlanned
  if (status === "verified") return styles.statusVerified
  return styles.statusDecision
}

function actionClass(action: BreachPath["action"]) {
  if (action === "Act now") return styles.actionCritical
  if (action === "Attend") return styles.actionAttend
  return styles.actionTrack
}

function stepIcon(kind: BreachPath["steps"][number]["kind"]) {
  if (kind === "entry") return Wifi
  if (kind === "secret") return KeyRound
  if (kind === "identity") return Fingerprint
  if (kind === "target") return Database
  return Server
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: LucideIcon
  label: string
  value: string | number
  detail: string
  tone: "critical" | "amber" | "cyan" | "lime"
}) {
  return (
    <article className={`${styles.metricCard} ${styles[`metric_${tone}`]}`}>
      <div className={styles.metricHead}>
        <span>{label}</span>
        <Icon size={16} aria-hidden="true" />
      </div>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  )
}

function TrendChart({ values, label }: { values: number[]; label: string }) {
  const width = 640
  const height = 172
  const padding = 18
  const max = Math.max(...values, 1)
  const points = values
    .map((value, index) => {
      const x = padding + (index * (width - padding * 2)) / (values.length - 1)
      const y = height - padding - (value / max) * (height - padding * 2)
      return `${x},${y}`
    })
    .join(" ")
  const area = `${padding},${height - padding} ${points} ${
    width - padding
  },${height - padding}`

  return (
    <div className={styles.chartWrap}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${label}. Seven day values: ${values.join(", ")}.`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="breaklineArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#b7f34a" stopOpacity=".24" />
            <stop offset="100%" stopColor="#b7f34a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((position) => (
          <line
            key={position}
            x1={padding}
            x2={width - padding}
            y1={padding + (height - padding * 2) * position}
            y2={padding + (height - padding * 2) * position}
            className={styles.chartGrid}
          />
        ))}
        <polygon points={area} fill="url(#breaklineArea)" />
        <polyline points={points} className={styles.chartLine} />
        {values.map((value, index) => {
          const [x, y] = points.split(" ")[index].split(",")
          return (
            <circle
              key={`${value}-${index}`}
              cx={x}
              cy={y}
              r={index === values.length - 1 ? 5 : 3}
              className={styles.chartPoint}
            />
          )
        })}
      </svg>
      <div className={styles.chartLabels} aria-hidden="true">
        <span>Jul 10</span>
        <span>Today</span>
      </div>
    </div>
  )
}

function PathRow({
  path,
  selected,
  status,
  owner,
  onSelect,
}: {
  path: BreachPath
  selected: boolean
  status: PathStatus
  owner: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      className={`${styles.pathRow} ${selected ? styles.pathRowSelected : ""}`}
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
    >
      <span className={styles.priorityCell}>
        <span className={`${styles.actionLabel} ${actionClass(path.action)}`}>
          {path.action}
        </span>
        <strong>{path.priority}</strong>
      </span>
      <span className={styles.pathMain}>
        <strong>{path.title}</strong>
        <small>
          <Database size={13} aria-hidden="true" />
          {path.target}
        </small>
      </span>
      <span className={styles.evidenceCell}>
        {path.evidenceTags.slice(0, 2).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </span>
      <span className={styles.ownerCell}>
        <small>{owner}</small>
        <span className={`${styles.statusPill} ${statusClass(status)}`}>
          {statusLabels[status]}
        </span>
      </span>
      <span className={styles.changeCell}>
        {path.change}
        <ChevronRight size={16} aria-hidden="true" />
      </span>
    </button>
  )
}

function EmptyState({ onReviewAssets }: { onReviewAssets: () => void }) {
  return (
    <section className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        <ShieldCheck size={30} aria-hidden="true" />
      </div>
      <span className={styles.eyebrow}>MODELED PATHS // 0 OPEN</span>
      <h2>No path currently reaches a confirmed critical asset.</h2>
      <p>
        That is not an “all secure” claim. Source coverage is 96%, two changes
        are still awaiting fresh evidence, and critical-asset ownership should
        remain under review.
      </p>
      <div className={styles.emptyActions}>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={onReviewAssets}
        >
          Review critical assets
          <ArrowRight size={16} aria-hidden="true" />
        </button>
        <button type="button" className={styles.secondaryButton}>
          Inspect verification queue
        </button>
      </div>
      <div className={styles.emptyChecks}>
        <span>
          <Check size={14} aria-hidden="true" />5 sources fresh
        </span>
        <span>
          <Clock3 size={14} aria-hidden="true" />2 changes verifying
        </span>
        <span>
          <Shield size={14} aria-hidden="true" />
          Last refresh 6m ago
        </span>
      </div>
    </section>
  )
}

function PathGraph({
  path,
  selectedCutIds,
  evidenceOpen,
  onEvidenceToggle,
}: {
  path: BreachPath
  selectedCutIds: string[]
  evidenceOpen: string | null
  onEvidenceToggle: (id: string) => void
}) {
  const cutStepIds = path.cuts
    .filter((cut) => selectedCutIds.includes(cut.id))
    .map((cut) => cut.stepId)

  return (
    <div className={styles.pathGraphWrap}>
      <div className={styles.previewLabel}>
        <Sparkles size={14} aria-hidden="true" />
        {selectedCutIds.length
          ? "Modeled preview — no production change"
          : "Current modeled path"}
      </div>
      <ol
        className={styles.pathGraph}
        aria-label={`Modeled path: ${path.steps
          .map((step) => step.label)
          .join(" to ")}`}
      >
        {path.steps.map((step, index) => {
          const Icon = stepIcon(step.kind)
          const isCut = cutStepIds.includes(step.id)
          const expanded = evidenceOpen === step.id
          return (
            <li
              key={step.id}
              className={`${styles.graphStep} ${
                isCut ? styles.graphStepCut : ""
              }`}
            >
              <button
                type="button"
                className={styles.graphNode}
                onClick={() => onEvidenceToggle(step.id)}
                aria-expanded={expanded}
              >
                <span className={styles.graphIcon}>
                  {isCut ? (
                    <Scissors size={17} aria-hidden="true" />
                  ) : (
                    <Icon size={17} aria-hidden="true" />
                  )}
                </span>
                <span>
                  <small>{step.technique}</small>
                  <strong>{step.label}</strong>
                  <code>{step.meta}</code>
                </span>
                <span className={styles.evidenceState}>{step.state}</span>
              </button>
              {index < path.steps.length - 1 && (
                <span className={styles.graphConnector} aria-hidden="true">
                  <ArrowRight size={15} />
                </span>
              )}
              {expanded && (
                <div className={styles.evidencePopover}>
                  <strong>{step.evidenceTitle}</strong>
                  <p>{step.evidenceDetail}</p>
                  <span>
                    {step.source} · {step.freshness}
                  </span>
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function CutCard({
  cut,
  checked,
  onToggle,
}: {
  cut: ControlCut
  checked: boolean
  onToggle: () => void
}) {
  return (
    <label
      className={`${styles.cutCard} ${checked ? styles.cutCardSelected : ""}`}
    >
      <input type="checkbox" checked={checked} onChange={onToggle} />
      <span className={styles.cutCheck} aria-hidden="true">
        {checked && <Check size={14} />}
      </span>
      <span className={styles.cutBody}>
        <span className={styles.cutTitleLine}>
          <strong>{cut.title}</strong>
          {cut.recommended && <em>Best cut</em>}
        </span>
        <span className={styles.cutDescription}>{cut.description}</span>
        <span className={styles.cutStats}>
          <span>
            <Scissors size={13} aria-hidden="true" />
            {cut.pathsBroken} paths
          </span>
          <span>
            <Shield size={13} aria-hidden="true" />
            {cut.assetsIsolated} targets
          </span>
          <span>
            <Clock3 size={13} aria-hidden="true" />
            {cut.effort}
          </span>
          <span>{cut.confidence}% confidence</span>
        </span>
      </span>
    </label>
  )
}

function PathWorkspace({
  path,
  scenarioPaths,
  selectedCutIds,
  onToggleCut,
  evidenceOpen,
  onEvidenceToggle,
  owner,
  onOwnerChange,
  status,
  startedAt,
  onStartRemediation,
}: {
  path: BreachPath
  scenarioPaths: number
  selectedCutIds: string[]
  onToggleCut: (cutId: string) => void
  evidenceOpen: string | null
  onEvidenceToggle: (id: string) => void
  owner: string
  onOwnerChange: (owner: string) => void
  status: PathStatus
  startedAt?: string
  onStartRemediation: () => void
}) {
  const selectedCuts = path.cuts.filter((cut) =>
    selectedCutIds.includes(cut.id)
  )
  const pathsBroken = Math.min(
    scenarioPaths,
    selectedCuts.reduce((total, cut) => total + cut.pathsBroken, 0)
  )
  const assetsIsolated = Math.min(
    path.criticalAssets,
    selectedCuts.reduce((total, cut) => total + cut.assetsIsolated, 0)
  )
  const beforeExposure = path.priority
  const effort = selectedCuts.reduce(
    (total, cut) => total + cut.effortMinutes,
    0
  )
  const afterExposure = selectedCuts.length
    ? Math.max(
        8,
        beforeExposure -
          Math.round(pathsBroken * 11 + assetsIsolated * 16 - effort / 28)
      )
    : beforeExposure
  const primaryCut = selectedCuts[0] ?? path.cuts[0]

  return (
    <section className={styles.workspace} aria-labelledby="workspace-title">
      <div className={styles.workspaceHeader}>
        <div>
          <span className={styles.eyebrow}>SELECTED BREACH PATH</span>
          <h2 id="workspace-title">{path.title}</h2>
          <p>{path.summary}</p>
        </div>
        <div className={styles.workspaceScore}>
          <span>Priority index</span>
          <strong>{path.priority}</strong>
          <small>{path.action} · ordering aid, not probability</small>
        </div>
      </div>

      <div className={styles.workspaceTopGrid}>
        <PathGraph
          path={path}
          selectedCutIds={selectedCutIds}
          evidenceOpen={evidenceOpen}
          onEvidenceToggle={onEvidenceToggle}
        />
        <aside className={styles.whyPanel} aria-label="Priority explanation">
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.eyebrow}>WHY THIS IS FIRST</span>
              <h3>Transparent priority</h3>
            </div>
            <Radar size={18} aria-hidden="true" />
          </div>
          <div className={styles.factorList}>
            {path.factors.map((factor) => (
              <div className={styles.factor} key={factor.label}>
                <div>
                  <span>{factor.label}</span>
                  <strong>{factor.value}</strong>
                </div>
                <span className={styles.factorTrack} aria-hidden="true">
                  <span
                    style={
                      {
                        "--factor-width": `${factor.value}%`,
                      } as CSSProperties
                    }
                  />
                </span>
                <p>{factor.reason}</p>
              </div>
            ))}
          </div>
          <button type="button" className={styles.textButton}>
            View score version & sources
            <ChevronRight size={15} aria-hidden="true" />
          </button>
        </aside>
      </div>

      <div className={styles.workspaceBottomGrid}>
        <section className={styles.cutsPanel}>
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.eyebrow}>CONTROL CUTS</span>
              <h3>Choose the smallest effective change</h3>
            </div>
            <span className={styles.panelHint}>
              {selectedCutIds.length} selected
            </span>
          </div>
          <div className={styles.cutList}>
            {path.cuts.map((cut) => (
              <CutCard
                key={cut.id}
                cut={cut}
                checked={selectedCutIds.includes(cut.id)}
                onToggle={() => onToggleCut(cut.id)}
              />
            ))}
          </div>
        </section>

        <aside className={styles.remediationPanel}>
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.eyebrow}>DECISION PREVIEW</span>
              <h3>Expected modeled reduction</h3>
            </div>
            <BarChart3 size={18} aria-hidden="true" />
          </div>

          <div className={styles.compareGrid}>
            <div>
              <span>Before</span>
              <strong>{beforeExposure}</strong>
              <small>weighted exposure</small>
            </div>
            <ArrowDownRight size={22} aria-hidden="true" />
            <div className={selectedCuts.length ? styles.afterValue : ""}>
              <span>After</span>
              <strong>{afterExposure}</strong>
              <small>
                {selectedCuts.length ? "modeled preview" : "select a cut"}
              </small>
            </div>
          </div>

          <div className={styles.outcomeRows}>
            <div>
              <span>Critical paths open</span>
              <strong>
                {scenarioPaths} → {Math.max(0, scenarioPaths - pathsBroken)}
              </strong>
            </div>
            <div>
              <span>Critical targets isolated</span>
              <strong>{assetsIsolated}</strong>
            </div>
            <div>
              <span>Estimated change effort</span>
              <strong>{selectedCuts.length ? `${effort} min` : "—"}</strong>
            </div>
          </div>

          <div className={styles.briefPreview}>
            <div>
              <FileText size={16} aria-hidden="true" />
              <strong>Owner-ready brief</strong>
            </div>
            <p>{primaryCut.description}</p>
            <details>
              <summary>
                Validation & rollback
                <ChevronDown size={14} aria-hidden="true" />
              </summary>
              <p>
                <b>Validate:</b> {primaryCut.validation}
              </p>
              <p>
                <b>Rollback:</b> {primaryCut.rollback}
              </p>
            </details>
          </div>

          <label className={styles.selectLabel}>
            Remediation owner
            <select
              value={owner}
              onChange={(event) => onOwnerChange(event.target.value)}
            >
              {ownerOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={onStartRemediation}
            disabled={status === "in_progress"}
          >
            {status === "in_progress" ? (
              <>
                <CheckCircle2 size={16} aria-hidden="true" />
                In progress
              </>
            ) : (
              <>
                Start remediation
                <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>
          <p className={styles.demoActionNote}>
            {status === "in_progress"
              ? `Assigned to ${owner}${startedAt ? ` · ${startedAt}` : ""}.`
              : "Demo only: this records local state and creates no external ticket."}
          </p>
        </aside>
      </div>
    </section>
  )
}

function ViewHeading({
  eyebrow,
  title,
  description,
  trailing,
}: {
  eyebrow: string
  title: string
  description: string
  trailing?: ReactNode
}) {
  return (
    <header className={styles.viewHeading}>
      <div>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {trailing}
    </header>
  )
}

export default function BreaklineDashboard() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>("high")
  const [activeNav, setActiveNav] = useState<NavKey>("mission")
  const [selectedPathId, setSelectedPathId] = useState("path-ci-ledger")
  const [selectedCutIds, setSelectedCutIds] = useState<string[]>(["cut-trust"])
  const [evidenceOpen, setEvidenceOpen] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<
    "all" | "decision" | "owned"
  >("all")
  const [workflow, setWorkflow] = useState<StoredWorkflow>({
    statuses: {},
    owners: {},
    startedAt: {},
  })
  const [toast, setToast] = useState("")
  const workspaceRef = useRef<HTMLDivElement>(null)
  const storageReadyRef = useRef(false)

  useEffect(() => {
    let storedWorkflow: StoredWorkflow | null = null
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        storedWorkflow = JSON.parse(stored) as StoredWorkflow
      }
    } catch {
      // The demo remains usable when storage is unavailable.
    }

    const timer = window.setTimeout(() => {
      if (storedWorkflow) setWorkflow(storedWorkflow)
      storageReadyRef.current = true
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!storageReadyRef.current) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(workflow))
  }, [workflow])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(""), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const scenario = scenarios[scenarioKey]
  const scenarioPaths = useMemo(
    () =>
      scenario.paths.map((path) => ({
        ...path,
        status: workflow.statuses[path.id] ?? path.status,
        owner: workflow.owners[path.id] ?? path.owner,
      })),
    [scenario.paths, workflow.owners, workflow.statuses]
  )

  const filteredPaths = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return scenarioPaths.filter((path) => {
      const matchesQuery =
        !normalizedQuery ||
        [path.title, path.target, path.owner, ...path.evidenceTags].some(
          (value) => value.toLowerCase().includes(normalizedQuery)
        )
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "decision" && path.status === "needs_decision") ||
        (statusFilter === "owned" && path.owner !== "Unassigned")
      return matchesQuery && matchesStatus
    })
  }, [query, scenarioPaths, statusFilter])

  const selectedPath =
    scenarioPaths.find((path) => path.id === selectedPathId) ?? scenarioPaths[0]

  const topCut = scenario.paths[0]?.cuts[0]

  const dynamicActivity = useMemo(() => {
    const entries = Object.entries(workflow.startedAt)
      .sort((a, b) => b[1].localeCompare(a[1]))
      .map(([pathId, time]) => {
        const path = pathsafeFind(pathId)
        return {
          time,
          title: "Remediation started",
          detail: path
            ? `${workflow.owners[pathId] ?? "Security Engineering"} accepted ${path.cuts[0].title.toLowerCase()}.`
            : "A remediation brief was assigned.",
          actor: "Local demo",
        }
      })
    return [...entries, ...baseActivity]
  }, [workflow.owners, workflow.startedAt])

  function changeScenario(key: ScenarioKey) {
    setScenarioKey(key)
    const firstPath = scenarios[key].paths[0]
    setSelectedPathId(firstPath?.id ?? "")
    setSelectedCutIds(firstPath?.cuts[0] ? [firstPath.cuts[0].id] : [])
    setEvidenceOpen(null)
  }

  function selectPath(path: BreachPath) {
    setSelectedPathId(path.id)
    setSelectedCutIds(path.cuts[0] ? [path.cuts[0].id] : [])
    setEvidenceOpen(null)
    window.setTimeout(() => {
      workspaceRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 20)
  }

  function toggleCut(cutId: string) {
    setSelectedCutIds((current) =>
      current.includes(cutId)
        ? current.filter((id) => id !== cutId)
        : [...current, cutId]
    )
  }

  function startRemediation() {
    if (!selectedPath) return
    const owner =
      workflow.owners[selectedPath.id] ??
      selectedPath.cuts[0]?.owner ??
      "Security Engineering"
    const time = new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date())
    setWorkflow((current) => ({
      statuses: { ...current.statuses, [selectedPath.id]: "in_progress" },
      owners: { ...current.owners, [selectedPath.id]: owner },
      startedAt: { ...current.startedAt, [selectedPath.id]: time },
    }))
    setToast(
      `Remediation assigned to ${owner}. No external ticket was created.`
    )
  }

  function resetWorkflow() {
    setWorkflow({ statuses: {}, owners: {}, startedAt: {} })
    window.localStorage.removeItem(STORAGE_KEY)
    setToast("Local demo workflow reset.")
  }

  const scenarioControl = (
    <div className={styles.scenarioControl} aria-label="Demo estate state">
      {scenarioOrder.map((key) => (
        <button
          type="button"
          key={key}
          onClick={() => changeScenario(key)}
          aria-pressed={scenarioKey === key}
        >
          {scenarios[key].shortLabel}
        </button>
      ))}
    </div>
  )

  const pathList = (
    <div className={styles.pathList}>
      {filteredPaths.map((path) => (
        <PathRow
          key={path.id}
          path={path}
          selected={selectedPath?.id === path.id}
          status={path.status}
          owner={path.owner}
          onSelect={() => selectPath(path)}
        />
      ))}
    </div>
  )

  function renderMission() {
    return (
      <>
        <ViewHeading
          eyebrow="THURSDAY // JUL 16"
          title={
            scenarioKey === "cleared"
              ? "Hold the line. Verify the evidence."
              : "Your next best move is already ranked."
          }
          description={
            scenarioKey === "high"
              ? "Breakline found one identity change that disconnects four modeled paths from two critical services."
              : scenarioKey === "steady"
                ? "The open exposure set is owned. Focus on finishing the changes and validating the graph."
                : "No open path reaches a confirmed critical asset; keep coverage and verification honest."
          }
          trailing={scenarioControl}
        />

        <section className={styles.metricsGrid} aria-label="Exposure outcomes">
          <MetricCard
            icon={Route}
            label="Critical paths open"
            value={scenario.metrics.paths}
            detail={
              scenarioKey === "high"
                ? "1 new decision today"
                : scenarioKey === "cleared"
                  ? "2 changes verifying"
                  : "down 3 this week"
            }
            tone="critical"
          />
          <MetricCard
            icon={Database}
            label="Critical assets reachable"
            value={scenario.metrics.assets}
            detail={`${scenario.coverage}% graph coverage`}
            tone="amber"
          />
          <MetricCard
            icon={Users}
            label="Paths with an owner"
            value={
              scenario.metrics.paths
                ? `${scenario.metrics.owned}/${scenario.metrics.paths}`
                : "—"
            }
            detail={
              scenario.metrics.overdue
                ? `${scenario.metrics.overdue} decision overdue`
                : "No ownership gaps"
            }
            tone="cyan"
          />
          <MetricCard
            icon={ShieldCheck}
            label="Weighted exposure"
            value={scenario.metrics.weightedExposure}
            detail={
              scenarioKey === "cleared"
                ? "residual / verification"
                : "ordering index · 7 day view"
            }
            tone="lime"
          />
        </section>

        {scenarioKey === "cleared" ? (
          <EmptyState onReviewAssets={() => setActiveNav("assets")} />
        ) : (
          <>
            <section className={styles.dashboardGrid}>
              <article className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <span className={styles.eyebrow}>SEVEN DAY OUTCOME</span>
                    <h2>Paths to critical assets</h2>
                  </div>
                  <span className={styles.deltaGood}>
                    <ArrowDownRight size={15} aria-hidden="true" />
                    {scenario.trend[0] - scenario.trend.at(-1)!} removed
                  </span>
                </div>
                <TrendChart
                  values={scenario.trend}
                  label="Open modeled paths to critical assets"
                />
                <div className={styles.chartFooter}>
                  <span>
                    <span className={styles.legendLine} />
                    Open critical paths
                  </span>
                  <span>Verified changes only</span>
                </div>
              </article>

              {topCut && (
                <article className={`${styles.card} ${styles.bestCutCard}`}>
                  <div className={styles.cardHeader}>
                    <div>
                      <span className={styles.eyebrow}>BEST CONTROL CUT</span>
                      <h2>One change, four paths</h2>
                    </div>
                    <span className={styles.bestBadge}>94% confidence</span>
                  </div>
                  <div className={styles.cutHeroIcon}>
                    <Scissors size={22} aria-hidden="true" />
                  </div>
                  <h3>{topCut.title}</h3>
                  <p>{topCut.description}</p>
                  <div className={styles.bestCutStats}>
                    <span>
                      <strong>{topCut.pathsBroken}</strong>
                      paths broken
                    </span>
                    <span>
                      <strong>{topCut.assetsIsolated}</strong>
                      targets isolated
                    </span>
                    <span>
                      <strong>{topCut.effort}</strong>
                      est. effort
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={() => {
                      const topPath = scenarioPaths[0]
                      if (topPath) selectPath(topPath)
                    }}
                  >
                    Review this cut
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </article>
              )}
            </section>

            <section className={styles.queueSection}>
              <div className={styles.sectionHeader}>
                <div>
                  <span className={styles.eyebrow}>DECISION QUEUE</span>
                  <h2>Modeled breach paths</h2>
                </div>
                <div className={styles.filterGroup}>
                  {(
                    [
                      ["all", "All paths"],
                      ["decision", "Needs decision"],
                      ["owned", "Owned"],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      type="button"
                      key={value}
                      className={
                        statusFilter === value ? styles.filterActive : ""
                      }
                      onClick={() => setStatusFilter(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {pathList}
              {filteredPaths.length === 0 && (
                <div className={styles.noResults}>
                  <Search size={20} aria-hidden="true" />
                  <strong>No paths match this view.</strong>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("")
                      setStatusFilter("all")
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>

            {selectedPath && (
              <div ref={workspaceRef}>
                <PathWorkspace
                  path={selectedPath}
                  scenarioPaths={scenario.metrics.paths}
                  selectedCutIds={selectedCutIds}
                  onToggleCut={toggleCut}
                  evidenceOpen={evidenceOpen}
                  onEvidenceToggle={(id) =>
                    setEvidenceOpen((current) => (current === id ? null : id))
                  }
                  owner={
                    workflow.owners[selectedPath.id] ??
                    selectedPath.cuts[0]?.owner ??
                    ownerOptions[0]
                  }
                  onOwnerChange={(owner) =>
                    setWorkflow((current) => ({
                      ...current,
                      owners: { ...current.owners, [selectedPath.id]: owner },
                    }))
                  }
                  status={
                    workflow.statuses[selectedPath.id] ?? selectedPath.status
                  }
                  startedAt={workflow.startedAt[selectedPath.id]}
                  onStartRemediation={startRemediation}
                />
              </div>
            )}
          </>
        )}
      </>
    )
  }

  function renderPaths() {
    return (
      <>
        <ViewHeading
          eyebrow="EXPOSURE GRAPH"
          title="Breach paths"
          description="Review modeled routes from plausible entry conditions to confirmed critical assets."
          trailing={scenarioControl}
        />
        {scenarioKey === "cleared" ? (
          <EmptyState onReviewAssets={() => setActiveNav("assets")} />
        ) : (
          <>
            <section className={styles.libraryCard}>
              <div className={styles.libraryToolbar}>
                <div className={styles.searchBox}>
                  <Search size={16} aria-hidden="true" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search target, owner, evidence…"
                    aria-label="Search breach paths"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                <span>{filteredPaths.length} modeled paths</span>
              </div>
              {pathList}
            </section>
            {selectedPath && (
              <div ref={workspaceRef}>
                <PathWorkspace
                  path={selectedPath}
                  scenarioPaths={scenario.metrics.paths}
                  selectedCutIds={selectedCutIds}
                  onToggleCut={toggleCut}
                  evidenceOpen={evidenceOpen}
                  onEvidenceToggle={(id) =>
                    setEvidenceOpen((current) => (current === id ? null : id))
                  }
                  owner={
                    workflow.owners[selectedPath.id] ??
                    selectedPath.cuts[0]?.owner ??
                    ownerOptions[0]
                  }
                  onOwnerChange={(owner) =>
                    setWorkflow((current) => ({
                      ...current,
                      owners: { ...current.owners, [selectedPath.id]: owner },
                    }))
                  }
                  status={
                    workflow.statuses[selectedPath.id] ?? selectedPath.status
                  }
                  startedAt={workflow.startedAt[selectedPath.id]}
                  onStartRemediation={startRemediation}
                />
              </div>
            )}
          </>
        )}
      </>
    )
  }

  function renderCuts() {
    const allCuts = scenarioPaths.flatMap((path) =>
      path.cuts.map((cut) => ({ cut, path }))
    )
    return (
      <>
        <ViewHeading
          eyebrow="REMEDIATION PORTFOLIO"
          title="Control cuts"
          description="Deduplicated changes ranked by modeled paths broken, critical targets isolated, effort, and confidence."
          trailing={scenarioControl}
        />
        {allCuts.length ? (
          <section className={styles.cutPortfolio}>
            {allCuts.map(({ cut, path }, index) => (
              <article
                className={styles.portfolioCard}
                key={`${path.id}-${cut.id}`}
              >
                <div className={styles.portfolioRank}>
                  <span>#{index + 1}</span>
                  {cut.recommended && <em>Recommended</em>}
                </div>
                <div className={styles.portfolioIcon}>
                  <Scissors size={19} aria-hidden="true" />
                </div>
                <h2>{cut.title}</h2>
                <p>{cut.description}</p>
                <div className={styles.portfolioTarget}>
                  <Route size={14} aria-hidden="true" />
                  {path.title}
                </div>
                <div className={styles.portfolioStats}>
                  <span>
                    <strong>{cut.pathsBroken}</strong> paths
                  </span>
                  <span>
                    <strong>{cut.assetsIsolated}</strong> targets
                  </span>
                  <span>
                    <strong>{cut.effort}</strong> effort
                  </span>
                </div>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => {
                    setSelectedPathId(path.id)
                    setSelectedCutIds([cut.id])
                    setActiveNav("paths")
                  }}
                >
                  Open decision workspace
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </article>
            ))}
          </section>
        ) : (
          <EmptyState onReviewAssets={() => setActiveNav("assets")} />
        )}
      </>
    )
  }

  function renderAssets() {
    return (
      <>
        <ViewHeading
          eyebrow="BUSINESS CONTEXT"
          title="Critical assets"
          description="Confirmed services and data targets that anchor path priority and remediation outcomes."
          trailing={scenarioControl}
        />
        <section className={styles.assetGrid}>
          {criticalAssets.map((asset) => {
            const openPaths =
              scenarioKey === "cleared"
                ? 0
                : scenarioPaths.filter((path) =>
                    path.target.includes(asset.name)
                  ).length
            return (
              <article className={styles.assetCard} key={asset.name}>
                <div className={styles.assetTop}>
                  <span className={styles.assetIcon}>
                    <Database size={18} aria-hidden="true" />
                  </span>
                  <span
                    className={`${styles.statusPill} ${
                      openPaths ? styles.statusDecision : styles.statusVerified
                    }`}
                  >
                    {openPaths ? `${openPaths} open path` : "No open path"}
                  </span>
                </div>
                <h2>{asset.name}</h2>
                <p>{asset.type}</p>
                <dl>
                  <div>
                    <dt>Owner</dt>
                    <dd>{asset.owner}</dd>
                  </div>
                  <div>
                    <dt>Environment</dt>
                    <dd>{asset.environment}</dd>
                  </div>
                  <div>
                    <dt>Coverage</dt>
                    <dd>{scenario.coverage}%</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className={styles.textButton}
                  onClick={() => {
                    const matching = scenarioPaths.find((path) =>
                      path.target.includes(asset.name)
                    )
                    if (matching) {
                      setSelectedPathId(matching.id)
                      setSelectedCutIds([matching.cuts[0].id])
                      setActiveNav("paths")
                    } else {
                      setToast(
                        "No open modeled path for this asset in the selected state."
                      )
                    }
                  }}
                >
                  Inspect asset evidence
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              </article>
            )
          })}
        </section>
      </>
    )
  }

  function renderActivity() {
    return (
      <>
        <ViewHeading
          eyebrow="AUDITABLE DECISIONS"
          title="Activity"
          description="A compact record of evidence changes, ownership, simulations, and verified reductions."
          trailing={
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={resetWorkflow}
            >
              <RotateCcw size={15} aria-hidden="true" />
              Reset local workflow
            </button>
          }
        />
        <section className={styles.activityCard}>
          <div className={styles.activitySummary}>
            <div>
              <strong>{dynamicActivity.length}</strong>
              <span>recent events</span>
            </div>
            <div>
              <strong>{Object.keys(workflow.startedAt).length}</strong>
              <span>local demo assignments</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>source-attributed</span>
            </div>
          </div>
          <ol className={styles.timeline}>
            {dynamicActivity.map((event, index) => (
              <li key={`${event.time}-${event.title}-${index}`}>
                <span className={styles.timelineMarker}>
                  <CircleDot size={15} aria-hidden="true" />
                </span>
                <time>{event.time}</time>
                <div>
                  <strong>{event.title}</strong>
                  <p>{event.detail}</p>
                  <span>{event.actor}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </>
    )
  }

  return (
    <div className={styles.appShell}>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>

      <aside className={styles.sideRail}>
        <button
          type="button"
          className={styles.brand}
          aria-label="Open Breakline Mission Control"
          onClick={() => setActiveNav("mission")}
        >
          <span>
            <Shield size={20} aria-hidden="true" />
          </span>
          <strong>Breakline</strong>
        </button>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                type="button"
                key={item.id}
                className={activeNav === item.id ? styles.navActive : ""}
                onClick={() => setActiveNav(item.id)}
                aria-current={activeNav === item.id ? "page" : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
        <div className={styles.railFooter}>
          <button
            type="button"
            className={styles.sourceButton}
            onClick={() =>
              setToast(`${scenario.sourceStatus}. ${scenario.sourceDetail}.`)
            }
          >
            <span className={styles.sourcePulse} />
            <span>
              <strong>{scenario.coverage}% covered</strong>
              <small>Demo graph</small>
            </span>
          </button>
          <div className={styles.userChip}>
            <span>MC</span>
            <div>
              <strong>Maya Chen</strong>
              <small>Security Engineering</small>
            </div>
          </div>
        </div>
      </aside>

      <div className={styles.appSurface}>
        <header className={styles.topBar}>
          <div className={styles.mobileBrand}>
            <span>
              <Shield size={18} aria-hidden="true" />
            </span>
            <strong>Breakline</strong>
          </div>
          <div className={styles.breadcrumb}>
            <span>Northstar Labs</span>
            <ChevronRight size={14} aria-hidden="true" />
            <strong>
              {navItems.find((item) => item.id === activeNav)?.label}
            </strong>
          </div>
          <div className={styles.topActions}>
            <label className={styles.globalSearch}>
              <Search size={15} aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search graph"
                aria-label="Search graph"
              />
            </label>
            <button
              type="button"
              className={styles.healthButton}
              onClick={() =>
                setToast(`${scenario.sourceStatus}. ${scenario.sourceDetail}.`)
              }
            >
              <Cloud size={15} aria-hidden="true" />
              <span>{scenario.sourceStatus}</span>
            </button>
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Notifications"
            >
              <Bell size={17} />
              {scenario.metrics.overdue > 0 && <span />}
            </button>
          </div>
        </header>

        <main id="main-content" className={styles.mainContent}>
          <section className={styles.contextStrip} aria-label="Demo context">
            <div>
              <Sparkles size={15} aria-hidden="true" />
              <strong>Seeded demo data</strong>
              <span>No live systems or production controls are connected.</span>
            </div>
            <div>
              <AlertTriangle size={15} aria-hidden="true" />
              <span>{scenario.attention}</span>
            </div>
          </section>

          {activeNav === "mission" && renderMission()}
          {activeNav === "paths" && renderPaths()}
          {activeNav === "cuts" && renderCuts()}
          {activeNav === "assets" && renderAssets()}
          {activeNav === "activity" && renderActivity()}

          <footer className={styles.pageFooter}>
            <span>
              Breakline product concept · data is seeded and intentionally
              fictional
            </span>
            <button type="button" onClick={resetWorkflow}>
              <RefreshCw size={13} aria-hidden="true" />
              Reset demo state
            </button>
          </footer>
        </main>
      </div>

      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              type="button"
              key={item.id}
              className={activeNav === item.id ? styles.mobileNavActive : ""}
              onClick={() => setActiveNav(item.id)}
              aria-current={activeNav === item.id ? "page" : undefined}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{item.shortLabel}</span>
            </button>
          )
        })}
      </nav>

      <div className={styles.liveRegion} aria-live="polite" aria-atomic="true">
        {toast && (
          <div className={styles.toast}>
            <CheckCircle2 size={17} aria-hidden="true" />
            <span>{toast}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function pathsafeFind(id: string) {
  return scenarios.high.paths.find((path) => path.id === id)
}
