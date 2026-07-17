"use client"

import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  Bell,
  Boxes,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  Cloud,
  Crosshair,
  Database,
  FileText,
  Filter,
  GitBranch,
  Globe2,
  KeyRound,
  LayoutDashboard,
  Network,
  Plug,
  RefreshCw,
  RotateCcw,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  UserRound,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react"

import styles from "./dashboard.module.css"

type Icon = LucideIcon
type View = "command" | "missions" | "coverage" | "reports"
type Scenario = "attention" | "normal" | "clear"
type MissionStatus = "proposed" | "in-progress" | "in-review" | "verified"
type MissionFilter =
  | "all"
  | "act"
  | "in-progress"
  | "needs-owner"
  | "verified"
type DetailTab = "why" | "path" | "fix" | "evidence"
type Decision = "Act now" | "Schedule" | "Track"
type GraphNodeType = "external" | "workload" | "identity" | "service" | "data"

type Factor = {
  label: string
  value: number
  state: string
  detail: string
  source: string
  freshness: string
}

type GraphNode = {
  type: GraphNodeType
  label: string
  meta: string
  technique?: string
}

type Evidence = {
  source: string
  value: string
  observed: string
  state: "fresh" | "stale" | "inferred"
}

type Mission = {
  id: string
  title: string
  summary: string
  service: string
  environment: string
  decision: Decision
  priority: number
  paths: number
  targets: number
  effort: string
  owner: string
  suggestedOwner: string
  due: string
  dueTone: "overdue" | "soon" | "normal" | "verified"
  status: MissionStatus
  signals: string[]
  factors: Factor[]
  graph: GraphNode[]
  edgeLabels: string[]
  breakPointIndex: number
  fixTitle: string
  fixSummary: string
  fixSteps: string[]
  rollback: string
  verification: string
  alternatives: { title: string; tradeoff: string }[]
  evidence: Evidence[]
}

type MissionOverride = {
  status?: MissionStatus
  owner?: string
}

const STORAGE_KEY = "breakline-demo-state-v1"

const navItems: { id: View; label: string; icon: Icon }[] = [
  { id: "command", label: "Command", icon: LayoutDashboard },
  { id: "missions", label: "Missions", icon: Crosshair },
  { id: "coverage", label: "Coverage", icon: Boxes },
  { id: "reports", label: "Reports", icon: FileText },
]

const scenarioCopy: Record<
  Scenario,
  {
    label: string
    eyebrow: string
    support: string
    strip: string
    stripAction: string
  }
> = {
  attention: {
    label: "High attention",
    eyebrow: "AWS production · action policy v3.2",
    support:
      "Two critical services are reachable through shared break points. The queue is ranked by verified leverage, not finding volume.",
    strip:
      "One mission crossed its 8-hour action policy. Evidence is fresh and an owner is available.",
    stripAction: "Open overdue mission",
  },
  normal: {
    label: "Normal",
    eyebrow: "AWS production · operating within policy",
    support:
      "No action deadline is breached. Three scheduled fixes continue to reduce reachable cloud exposure.",
    strip:
      "All action decisions are within policy. Next source refresh is expected in 18 minutes.",
    stripAction: "Review coverage",
  },
  clear: {
    label: "All clear",
    eyebrow: "AWS production · no active priority missions",
    support:
      "Every currently modeled priority path has an owner decision. Keep source coverage fresh and watch for recurrence.",
    strip:
      "No active Act-now or Schedule missions in this seeded scenario.",
    stripAction: "View verified work",
  },
}

const seedMissions: Mission[] = [
  {
    id: "M-1042",
    title: "Patch the public checkout workload",
    summary:
      "A known-exploited library on api-edge-prod can reach the payments role and customer ledger.",
    service: "Checkout edge",
    environment: "prod · us-east-1",
    decision: "Act now",
    priority: 94,
    paths: 11,
    targets: 2,
    effort: "90 min",
    owner: "Edge Platform",
    suggestedOwner: "Edge Platform",
    due: "2h overdue",
    dueTone: "overdue",
    status: "proposed",
    signals: ["KEV snapshot", "Internet exposed", "Tier 0"],
    factors: [
      {
        label: "Exploit evidence",
        value: 96,
        state: "Observed exploitation",
        detail:
          "The seeded CVE appears in the demo CISA KEV snapshot and carries high modeled exploit probability.",
        source: "CISA KEV + FIRST EPSS",
        freshness: "Demo snapshot · 14 min ago",
      },
      {
        label: "Reachability",
        value: 91,
        state: "Public and reachable",
        detail:
          "The workload accepts public HTTPS traffic and can query the instance metadata endpoint.",
        source: "AWS config graph",
        freshness: "Observed 14 min ago",
      },
      {
        label: "Privilege path",
        value: 83,
        state: "Role pivot available",
        detail:
          "The workload service account can assume payments-prod-role through an overly broad trust condition.",
        source: "AWS IAM effective access",
        freshness: "Observed 22 min ago",
      },
      {
        label: "Business impact",
        value: 95,
        state: "Tier-0 customer data",
        detail:
          "The final path reaches the customer-ledger cluster and the payment-token service.",
        source: "Critical service registry",
        freshness: "Confirmed by Maya · 3 days ago",
      },
    ],
    graph: [
      {
        type: "external",
        label: "Internet",
        meta: "Untrusted origin",
      },
      {
        type: "workload",
        label: "api-edge-prod",
        meta: "EKS workload",
        technique: "T1190",
      },
      {
        type: "identity",
        label: "checkout-sa",
        meta: "Service account",
      },
      {
        type: "identity",
        label: "payments-prod-role",
        meta: "AWS IAM role",
        technique: "T1078.004",
      },
      {
        type: "data",
        label: "customer-ledger",
        meta: "Tier-0 Aurora",
        technique: "T1530",
      },
    ],
    edgeLabels: ["public HTTPS", "metadata", "AssumeRole", "read/write"],
    breakPointIndex: 1,
    fixTitle: "Patch Log4j and deny workload metadata access",
    fixSummary:
      "Update the api-edge-prod image and enforce IMDSv2 with hop limit 1. This removes the shared initial foothold for all 11 modeled paths.",
    fixSteps: [
      "Deploy the approved api-edge image digest to the checkout production namespace.",
      "Require IMDSv2 and set the instance metadata response hop limit to 1 on the node group.",
      "Run the checkout smoke suite and confirm payment authorization latency remains within SLO.",
    ],
    rollback:
      "Restore the previous signed image digest; retain the IMDSv2 change unless the node bootstrap validation fails.",
    verification:
      "A fresh collection must show the vulnerable package absent and metadata credentials unreachable from the workload.",
    alternatives: [
      {
        title: "Narrow the payments role trust",
        tradeoff: "Breaks 7 paths · 3–5 hours · higher application-change risk",
      },
      {
        title: "Isolate the customer ledger",
        tradeoff: "Breaks 5 paths · maintenance window required",
      },
    ],
    evidence: [
      {
        source: "AWS configuration graph",
        value: "Public ALB → api-edge-prod",
        observed: "14 min ago",
        state: "fresh",
      },
      {
        source: "CISA KEV snapshot",
        value: "Known exploitation signal",
        observed: "Demo snapshot",
        state: "fresh",
      },
      {
        source: "FIRST EPSS snapshot",
        value: "High 30-day exploit probability",
        observed: "Demo snapshot",
        state: "fresh",
      },
      {
        source: "Service ownership",
        value: "Edge Platform via service tag",
        observed: "2 days ago",
        state: "inferred",
      },
    ],
  },
  {
    id: "M-1038",
    title: "Remove wildcard role assumption from the CI runner",
    summary:
      "The shared deployment runner can assume production roles outside its declared service boundary.",
    service: "Delivery platform",
    environment: "prod · global",
    decision: "Act now",
    priority: 89,
    paths: 7,
    targets: 2,
    effort: "45 min",
    owner: "Dev Productivity",
    suggestedOwner: "Dev Productivity",
    due: "Due in 5h",
    dueTone: "soon",
    status: "in-progress",
    signals: ["Wildcard trust", "Active identity", "Tier 0"],
    factors: [
      {
        label: "Exploit evidence",
        value: 58,
        state: "Credential abuse plausible",
        detail:
          "No CVE is involved; prioritization comes from an active identity with broad trust and accessible runner secrets.",
        source: "GitHub + AWS identity graph",
        freshness: "Observed 31 min ago",
      },
      {
        label: "Reachability",
        value: 78,
        state: "Shared runner reachable",
        detail:
          "The runner is reachable from 23 repositories, including two with external contribution workflows.",
        source: "GitHub repository graph",
        freshness: "Observed 31 min ago",
      },
      {
        label: "Privilege path",
        value: 97,
        state: "Wildcard role assumption",
        detail:
          "The runner role can assume any role matching prod-deploy-* across six accounts.",
        source: "AWS IAM effective access",
        freshness: "Observed 22 min ago",
      },
      {
        label: "Business impact",
        value: 92,
        state: "Production deploy control",
        detail:
          "The path reaches checkout and identity production deploy roles.",
        source: "Critical service registry",
        freshness: "Confirmed 3 days ago",
      },
    ],
    graph: [
      {
        type: "external",
        label: "Contributor PR",
        meta: "Untrusted input",
      },
      {
        type: "service",
        label: "shared-runner-07",
        meta: "GitHub runner",
      },
      {
        type: "identity",
        label: "ci-runner-role",
        meta: "AWS IAM role",
      },
      {
        type: "identity",
        label: "prod-deploy-*",
        meta: "Wildcard trust",
        technique: "T1078.004",
      },
      {
        type: "service",
        label: "checkout-prod",
        meta: "Tier-0 service",
      },
    ],
    edgeLabels: ["workflow input", "OIDC token", "AssumeRole", "deploy"],
    breakPointIndex: 3,
    fixTitle: "Replace wildcard trust with repository-bound roles",
    fixSummary:
      "Scope each production deployment role to an explicit repository and environment claim. The existing workflow remains unchanged.",
    fixSteps: [
      "Create repository-specific trust statements for checkout, identity, and ledger deploy roles.",
      "Remove the prod-deploy-* resource wildcard from ci-runner-role.",
      "Run dry-run deployments from approved and unapproved repositories.",
    ],
    rollback:
      "Restore the previous trust-policy version from the signed infrastructure repository.",
    verification:
      "An unapproved repository token must receive AccessDenied while approved production workflows continue to assume their exact roles.",
    alternatives: [
      {
        title: "Move production to dedicated runners",
        tradeoff: "Breaks 7 paths · 2–3 days · best long-term isolation",
      },
      {
        title: "Require manual environment approval",
        tradeoff: "Compensating control · path remains modeled",
      },
    ],
    evidence: [
      {
        source: "AWS IAM graph",
        value: "Resource: arn:aws:iam::*:role/prod-deploy-*",
        observed: "22 min ago",
        state: "fresh",
      },
      {
        source: "GitHub ownership",
        value: "23 repositories use the shared runner",
        observed: "31 min ago",
        state: "fresh",
      },
      {
        source: "CloudTrail activity",
        value: "Role used 19 times in 7 days",
        observed: "46 min ago",
        state: "fresh",
      },
    ],
  },
  {
    id: "M-1029",
    title: "Block public access to the analytics snapshot",
    summary:
      "A production database snapshot is publicly restorable and contains customer behavior exports.",
    service: "Growth analytics",
    environment: "prod · eu-west-1",
    decision: "Schedule",
    priority: 82,
    paths: 3,
    targets: 1,
    effort: "20 min",
    owner: "Needs owner",
    suggestedOwner: "Data Platform",
    due: "Due tomorrow",
    dueTone: "normal",
    status: "proposed",
    signals: ["Public snapshot", "Restricted data", "Needs owner"],
    factors: [
      {
        label: "Exploit evidence",
        value: 35,
        state: "No software exploit required",
        detail:
          "The exposure is a configuration path; exploitation probability signals do not apply.",
        source: "Breakline policy",
        freshness: "Policy v3.2",
      },
      {
        label: "Reachability",
        value: 100,
        state: "Publicly restorable",
        detail:
          "The snapshot restore attribute includes the all-accounts principal.",
        source: "AWS RDS configuration",
        freshness: "Observed 14 min ago",
      },
      {
        label: "Privilege path",
        value: 42,
        state: "Direct data exposure",
        detail:
          "No lateral movement is needed, but restoration still requires an AWS account.",
        source: "AWS relationship graph",
        freshness: "Observed 14 min ago",
      },
      {
        label: "Business impact",
        value: 84,
        state: "Restricted analytics data",
        detail:
          "The snapshot includes pseudonymous customer behavior and experiment assignments.",
        source: "Data classification tag",
        freshness: "Confirmed 12 days ago",
      },
    ],
    graph: [
      {
        type: "external",
        label: "Any AWS account",
        meta: "External principal",
      },
      {
        type: "data",
        label: "growth-snapshot-41",
        meta: "RDS snapshot",
      },
      {
        type: "data",
        label: "analytics-export",
        meta: "Restricted data",
      },
    ],
    edgeLabels: ["restore allowed", "contains"],
    breakPointIndex: 1,
    fixTitle: "Remove the public restore attribute",
    fixSummary:
      "Set the snapshot restore scope to the analytics recovery account only and confirm the recovery runbook still succeeds.",
    fixSteps: [
      "Remove the all-accounts restore attribute from growth-snapshot-41.",
      "Add the analytics recovery account explicitly.",
      "Test a metadata-only restore authorization check from the recovery account.",
    ],
    rollback:
      "Re-add only an approved recovery account if disaster-recovery validation fails; never restore public scope.",
    verification:
      "A fresh RDS snapshot observation must show no public restore principal.",
    alternatives: [
      {
        title: "Delete the obsolete snapshot",
        tradeoff: "Breaks all paths · requires retention-owner approval",
      },
      {
        title: "Copy to a new encrypted snapshot",
        tradeoff: "40 min · improves key isolation as well",
      },
    ],
    evidence: [
      {
        source: "AWS RDS configuration",
        value: "restore = all",
        observed: "14 min ago",
        state: "fresh",
      },
      {
        source: "Data classification",
        value: "restricted / customer analytics",
        observed: "12 days ago",
        state: "stale",
      },
      {
        source: "Ownership inference",
        value: "Data Platform from Terraform path",
        observed: "6 hours ago",
        state: "inferred",
      },
    ],
  },
  {
    id: "M-1018",
    title: "Rotate the dormant identity-admin access key",
    summary:
      "A long-lived key for a former automation path still has organization-wide identity permissions.",
    service: "Workforce identity",
    environment: "prod · global",
    decision: "Schedule",
    priority: 74,
    paths: 2,
    targets: 2,
    effort: "15 min",
    owner: "Identity Platform",
    suggestedOwner: "Identity Platform",
    due: "Due in 2d",
    dueTone: "normal",
    status: "proposed",
    signals: ["Key age 286d", "Unused 91d", "Privileged"],
    factors: [
      {
        label: "Exploit evidence",
        value: 44,
        state: "No observed compromise",
        detail:
          "The key is not known to be exposed, but age and legacy storage increase uncertainty.",
        source: "Identity hygiene policy",
        freshness: "Policy v3.2",
      },
      {
        label: "Reachability",
        value: 55,
        state: "Legacy secret store",
        detail:
          "The key remains in a deprecated build secret store with broad reader access.",
        source: "Secrets inventory",
        freshness: "Observed 2 hours ago",
      },
      {
        label: "Privilege path",
        value: 93,
        state: "Organization-wide admin",
        detail:
          "The principal can modify identity-provider synchronization and emergency access groups.",
        source: "AWS + IdP permission graph",
        freshness: "Observed 28 min ago",
      },
      {
        label: "Business impact",
        value: 88,
        state: "Identity control plane",
        detail:
          "Compromise could change access to every critical cloud service.",
        source: "Critical service registry",
        freshness: "Confirmed 3 days ago",
      },
    ],
    graph: [
      {
        type: "service",
        label: "legacy-build",
        meta: "Deprecated pipeline",
      },
      {
        type: "identity",
        label: "AKIA…7R2D",
        meta: "286-day key",
      },
      {
        type: "identity",
        label: "identity-admin",
        meta: "Privileged principal",
        technique: "T1078.004",
      },
      {
        type: "service",
        label: "workforce-idp",
        meta: "Tier-0 control",
      },
    ],
    edgeLabels: ["secret read", "authenticates", "admin API"],
    breakPointIndex: 1,
    fixTitle: "Disable the dormant key and migrate the final job",
    fixSummary:
      "Disable the key, monitor for failed calls, and move the remaining scheduled job to short-lived OIDC credentials.",
    fixSteps: [
      "Disable the access key without deleting it.",
      "Monitor CloudTrail and the legacy job for 24 hours.",
      "Migrate the final job to OIDC and delete the disabled key after review.",
    ],
    rollback:
      "Re-enable the key for a maximum of one hour if a documented production job fails, then record the dependency.",
    verification:
      "The key must be inactive and no successful API call may use it after the disable timestamp.",
    alternatives: [
      {
        title: "Reduce the principal permissions first",
        tradeoff: "Breaks one path · preserves credential risk",
      },
      {
        title: "Delete the key immediately",
        tradeoff: "Fastest · higher risk of an undocumented job failure",
      },
    ],
    evidence: [
      {
        source: "AWS credential report",
        value: "Active · created 286 days ago",
        observed: "28 min ago",
        state: "fresh",
      },
      {
        source: "CloudTrail",
        value: "Last used 91 days ago",
        observed: "46 min ago",
        state: "fresh",
      },
      {
        source: "Legacy secret inventory",
        value: "1 remaining reference",
        observed: "2 hours ago",
        state: "fresh",
      },
    ],
  },
  {
    id: "M-1008",
    title: "Restrict the support export bucket",
    summary:
      "The cross-account support export path was narrowed to the approved analytics principal.",
    service: "Customer support",
    environment: "prod · us-west-2",
    decision: "Track",
    priority: 62,
    paths: 4,
    targets: 1,
    effort: "35 min",
    owner: "Support Systems",
    suggestedOwner: "Support Systems",
    due: "Verified yesterday",
    dueTone: "verified",
    status: "verified",
    signals: ["Verified", "4 paths prevented", "Fresh evidence"],
    factors: [
      {
        label: "Exploit evidence",
        value: 20,
        state: "Configuration exposure",
        detail: "No software exploit was involved.",
        source: "Breakline policy",
        freshness: "Policy v3.2",
      },
      {
        label: "Reachability",
        value: 12,
        state: "No longer public",
        detail: "The bucket policy now names only the approved principal.",
        source: "AWS S3 configuration",
        freshness: "Verified yesterday",
      },
      {
        label: "Privilege path",
        value: 15,
        state: "Cross-account edge removed",
        detail: "The prior external account can no longer list or read objects.",
        source: "AWS effective access",
        freshness: "Verified yesterday",
      },
      {
        label: "Business impact",
        value: 78,
        state: "Restricted support data",
        detail: "The target remains a tier-1 service, but the modeled path is prevented.",
        source: "Critical service registry",
        freshness: "Confirmed 3 days ago",
      },
    ],
    graph: [
      {
        type: "external",
        label: "External account",
        meta: "Removed principal",
      },
      {
        type: "data",
        label: "support-export",
        meta: "S3 bucket",
      },
      {
        type: "service",
        label: "support-insights",
        meta: "Tier-1 service",
      },
    ],
    edgeLabels: ["denied", "approved read"],
    breakPointIndex: 1,
    fixTitle: "Narrow the bucket policy principal",
    fixSummary:
      "The public/cross-account statement was replaced with an explicit analytics role.",
    fixSteps: [
      "Replace the wildcard principal with the analytics export role.",
      "Validate the support export job.",
      "Run an access simulation from the removed account.",
    ],
    rollback:
      "Restore the prior policy version only under incident approval.",
    verification:
      "Access simulation from the removed account returns an explicit deny.",
    alternatives: [
      {
        title: "Move exports to a separate account",
        tradeoff: "Stronger isolation · multi-day migration",
      },
    ],
    evidence: [
      {
        source: "AWS S3 configuration",
        value: "Explicit analytics role only",
        observed: "Yesterday",
        state: "fresh",
      },
      {
        source: "IAM access simulation",
        value: "Removed account denied",
        observed: "Yesterday",
        state: "fresh",
      },
    ],
  },
]

const viewTitles: Record<View, string> = {
  command: "Remediation command",
  missions: "Remediation missions",
  coverage: "Evidence coverage",
  reports: "Outcome reports",
}

const filterOptions: { id: MissionFilter; label: string }[] = [
  { id: "all", label: "All active" },
  { id: "act", label: "Act now" },
  { id: "in-progress", label: "In progress" },
  { id: "needs-owner", label: "Needs owner" },
  { id: "verified", label: "Verified" },
]

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function statusLabel(status: MissionStatus) {
  if (status === "proposed") return "Ready"
  if (status === "in-progress") return "In progress"
  if (status === "in-review") return "In review"
  return "Verified"
}

function statusClass(status: MissionStatus) {
  if (status === "in-progress") return styles.statusProgress
  if (status === "in-review") return styles.statusReview
  if (status === "verified") return styles.statusVerified
  return styles.statusReady
}

function decisionClass(decision: Decision) {
  if (decision === "Act now") return styles.decisionAct
  if (decision === "Schedule") return styles.decisionSchedule
  return styles.decisionTrack
}

function graphIcon(type: GraphNodeType): Icon {
  if (type === "external") return Globe2
  if (type === "workload") return Server
  if (type === "identity") return KeyRound
  if (type === "data") return Database
  return Cloud
}

export default function BreaklineDashboard() {
  const [view, setView] = useState<View>("command")
  const [scenario, setScenario] = useState<Scenario>("attention")
  const [missionFilter, setMissionFilter] = useState<MissionFilter>("all")
  const [search, setSearch] = useState("")
  const [overrides, setOverrides] = useState<Record<string, MissionOverride>>({})
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [detailTab, setDetailTab] = useState<DetailTab>("why")
  const [toast, setToast] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const toastTimerRef = useRef<number | null>(null)

  const missions = useMemo(
    () =>
      seedMissions.map((mission) => ({
        ...mission,
        ...overrides[mission.id],
      })),
    [overrides]
  )

  const selectedMission =
    missions.find((mission) => mission.id === selectedId) ?? null

  useEffect(() => {
    let cancelled = false
    let storedOverrides: Record<string, MissionOverride> | undefined
    let storedScenario: Scenario | undefined
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as {
          overrides?: Record<string, MissionOverride>
          scenario?: Scenario
        }
        storedOverrides = parsed.overrides
        if (
          parsed.scenario === "attention" ||
          parsed.scenario === "normal" ||
          parsed.scenario === "clear"
        ) {
          storedScenario = parsed.scenario
        }
      }
    } catch {
      // A corrupt local demo state should not block the seeded experience.
    }

    queueMicrotask(() => {
      if (cancelled) return
      if (storedOverrides) setOverrides(storedOverrides)
      if (storedScenario) setScenario(storedScenario)
      setHydrated(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ overrides, scenario })
    )
  }, [hydrated, overrides, scenario])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
    }
  }, [])

  function notify(message: string) {
    setToast(message)
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
    toastTimerRef.current = window.setTimeout(() => setToast(null), 3200)
  }

  function changeView(nextView: View) {
    setView(nextView)
    if (nextView !== "missions") {
      setMissionFilter("all")
      setSearch("")
    }
  }

  function openSearch() {
    setView("missions")
    window.setTimeout(() => searchRef.current?.focus(), 0)
  }

  function openMission(id: string, trigger?: HTMLElement) {
    returnFocusRef.current =
      trigger ??
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null)
    setSelectedId(id)
    setDetailTab("why")
  }

  function closeMission() {
    setSelectedId(null)
    window.setTimeout(() => returnFocusRef.current?.focus(), 0)
  }

  function updateMission(id: string, update: MissionOverride) {
    setOverrides((current) => ({
      ...current,
      [id]: { ...current[id], ...update },
    }))
  }

  function advanceMission(mission: Mission) {
    if (mission.status === "verified") return
    const nextStatus: MissionStatus =
      mission.status === "proposed"
        ? "in-progress"
        : mission.status === "in-progress"
          ? "in-review"
          : "verified"
    updateMission(mission.id, { status: nextStatus })
    notify(`${mission.id} moved to ${statusLabel(nextStatus)}.`)
    if (nextStatus === "verified") setDetailTab("evidence")
  }

  function assignSuggestedOwner(mission: Mission) {
    updateMission(mission.id, { owner: mission.suggestedOwner })
    notify(`${mission.id} assigned to ${mission.suggestedOwner}.`)
  }

  function resetDemo() {
    setOverrides({})
    setScenario("attention")
    setMissionFilter("all")
    setSearch("")
    window.localStorage.removeItem(STORAGE_KEY)
    notify("Seeded demo state restored.")
  }

  const scenarioActiveMissions = useMemo(() => {
    const active = missions.filter((mission) => mission.status !== "verified")
    if (scenario === "attention") return active
    if (scenario === "normal") {
      return active.filter((mission) => mission.id !== "M-1042")
    }
    return []
  }, [missions, scenario])

  const queueMissions = useMemo(() => {
    let pool: Mission[]
    if (missionFilter === "verified") {
      pool = missions.filter((mission) => mission.status === "verified")
    } else {
      pool = scenarioActiveMissions
    }

    if (missionFilter === "act") {
      pool = pool.filter((mission) => mission.decision === "Act now")
    }
    if (missionFilter === "in-progress") {
      pool = pool.filter(
        (mission) =>
          mission.status === "in-progress" || mission.status === "in-review"
      )
    }
    if (missionFilter === "needs-owner") {
      pool = pool.filter((mission) => mission.owner === "Needs owner")
    }

    const query = search.trim().toLowerCase()
    if (query) {
      pool = pool.filter((mission) =>
        [
          mission.id,
          mission.title,
          mission.summary,
          mission.service,
          mission.owner,
          mission.signals.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    }

    return [...pool].sort((a, b) => b.priority - a.priority)
  }, [missionFilter, missions, scenarioActiveMissions, search])

  const expectedPaths = scenarioActiveMissions.reduce(
    (total, mission) => total + mission.paths,
    0
  )
  const newlyVerifiedTargets = missions
    .filter(
      (mission) =>
        mission.status === "verified" &&
        seedMissions.find((seed) => seed.id === mission.id)?.status !==
          "verified"
    )
    .reduce((total, mission) => total + mission.targets, 0)
  const baseReachable = scenario === "attention" ? 8 : scenario === "normal" ? 4 : 0
  const reachableTargets = Math.max(0, baseReachable - newlyVerifiedTargets)
  const hasAssignedGap = missions.some(
    (mission) => mission.owner !== "Needs owner" && mission.id === "M-1029"
  )
  const ownershipCoverage = hasAssignedGap ? 96 : 92
  const heroTitle =
    scenarioActiveMissions.length === 0
      ? "Every priority path has an owner decision"
      : `${scenarioActiveMissions.length} fixes can break ${expectedPaths} attack paths`

  return (
    <div className={styles.appShell}>
      <a className={styles.skipLink} href="#breakline-main">
        Skip to main content
      </a>

      <Sidebar
        activeView={view}
        onViewChange={changeView}
        onReset={resetDemo}
      />

      <div className={styles.workspace}>
        <TopBar
          title={viewTitles[view]}
          onSearch={openSearch}
          onNotify={() => notify("No unread demo notifications.")}
        />

        <main id="breakline-main" className={styles.main}>
          {view === "command" && (
            <>
              <AttentionStrip
                scenario={scenario}
                onAction={() => {
                  if (scenario === "attention") {
                    const overdue = missions.find(
                      (mission) => mission.id === "M-1042"
                    )
                    if (overdue) openMission(overdue.id)
                  } else if (scenario === "normal") {
                    setView("coverage")
                  } else {
                    setView("missions")
                    setMissionFilter("verified")
                  }
                }}
              />

              <Hero
                scenario={scenario}
                title={heroTitle}
                onScenarioChange={(nextScenario) => {
                  setScenario(nextScenario)
                  setMissionFilter("all")
                  setSearch("")
                }}
                onOpenMissions={() => setView("missions")}
              />

              <section className={styles.kpiGrid} aria-label="Key outcomes">
                <KpiCard
                  icon={Crosshair}
                  label="Critical targets reachable"
                  value={String(reachableTargets)}
                  trend={
                    reachableTargets === 0
                      ? "No active modeled route"
                      : "3 fewer than last week"
                  }
                  tone={reachableTargets === 0 ? "good" : "neutral"}
                  spark={[13, 13, 11, 12, 10, 9, reachableTargets]}
                />
                <KpiCard
                  icon={Wrench}
                  label="Missions in action"
                  value={String(
                    scenarioActiveMissions.filter(
                      (mission) =>
                        mission.status === "in-progress" ||
                        mission.status === "in-review"
                    ).length
                  )}
                  trend={`${scenarioActiveMissions.length} active decisions`}
                  tone="neutral"
                  spark={[2, 3, 2, 4, 3, 4, 4]}
                />
                <KpiCard
                  icon={Users}
                  label="Ownership coverage"
                  value={`${ownershipCoverage}%`}
                  trend={
                    ownershipCoverage === 96
                      ? "Gap resolved in demo"
                      : "7 resources need an owner"
                  }
                  tone={ownershipCoverage === 96 ? "good" : "warn"}
                  progress={ownershipCoverage}
                />
                <KpiCard
                  icon={Clock3}
                  label="Median time to verify"
                  value="18h"
                  trend="6h faster than target"
                  tone="good"
                  spark={[28, 25, 27, 22, 21, 19, 18]}
                />
              </section>

              <section className={styles.commandGrid}>
                <MissionPanel
                  title="Priority missions"
                  description="Ranked by path leverage, evidence, deadline, and change effort."
                  missions={queueMissions.slice(0, 4)}
                  filter={missionFilter}
                  search={search}
                  searchRef={searchRef}
                  scenario={scenario}
                  onFilterChange={setMissionFilter}
                  onSearchChange={setSearch}
                  onOpenMission={openMission}
                  onViewAll={() => setView("missions")}
                />

                <div className={styles.sideStack}>
                  <TrendPanel scenario={scenario} />
                  <TeamFocus missions={scenarioActiveMissions} />
                </div>
              </section>
            </>
          )}

          {view === "missions" && (
            <section className={styles.pageSection}>
              <PageHeading
                eyebrow="Exposure remediation queue"
                title="Every mission has a defensible break point"
                description="Compare expected path reduction, owner, effort, and policy deadline. Open a mission to challenge the evidence or advance the simulated workflow."
              >
                <ScenarioControl
                  value={scenario}
                  onChange={(nextScenario) => {
                    setScenario(nextScenario)
                    setMissionFilter("all")
                  }}
                />
              </PageHeading>

              <MissionPanel
                title="Mission queue"
                description={`${queueMissions.length} ${
                  missionFilter === "verified" ? "verified" : "matching"
                } mission${queueMissions.length === 1 ? "" : "s"}.`}
                missions={queueMissions}
                filter={missionFilter}
                search={search}
                searchRef={searchRef}
                scenario={scenario}
                onFilterChange={setMissionFilter}
                onSearchChange={setSearch}
                onOpenMission={openMission}
              />
            </section>
          )}

          {view === "coverage" && (
            <CoverageView onOpenMissions={() => setView("missions")} />
          )}

          {view === "reports" && (
            <ReportsView
              reachableTargets={reachableTargets}
              ownershipCoverage={ownershipCoverage}
              onOpenMission={(id) => openMission(id)}
            />
          )}
        </main>
      </div>

      <MobileNav activeView={view} onViewChange={changeView} />

      {selectedMission && (
        <MissionDrawer
          mission={selectedMission}
          tab={detailTab}
          onTabChange={setDetailTab}
          onClose={closeMission}
          onAdvance={advanceMission}
          onAssign={assignSuggestedOwner}
        />
      )}

      <div
        className={cx(styles.toast, toast && styles.toastVisible)}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 size={17} aria-hidden="true" />
        <span>{toast}</span>
      </div>
    </div>
  )
}

function Sidebar({
  activeView,
  onViewChange,
  onReset,
}: {
  activeView: View
  onViewChange: (view: View) => void
  onReset: () => void
}) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandMark} aria-hidden="true">
          <Shield size={19} />
          <span />
        </div>
        <div>
          <div className={styles.brandName}>Breakline</div>
          <div className={styles.brandSub}>Exposure command</div>
        </div>
      </div>

      <div className={styles.demoBadge}>
        <Sparkles size={13} aria-hidden="true" />
        <span>Seeded demo data</span>
      </div>

      <nav className={styles.primaryNav} aria-label="Primary navigation">
        <div className={styles.navSectionLabel}>Workspace</div>
        {navItems.map((item) => {
          const ItemIcon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              className={cx(
                styles.navItem,
                activeView === item.id && styles.navItemActive
              )}
              aria-current={activeView === item.id ? "page" : undefined}
              onClick={() => onViewChange(item.id)}
            >
              <ItemIcon size={18} aria-hidden="true" />
              <span>{item.label}</span>
              {item.id === "missions" && (
                <span className={styles.navCount}>4</span>
              )}
            </button>
          )
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.scopeCard}>
          <div className={styles.scopeIcon}>
            <Cloud size={16} aria-hidden="true" />
          </div>
          <div>
            <strong>Aperture Labs</strong>
            <span>AWS production</span>
          </div>
          <ChevronRight size={15} aria-hidden="true" />
        </div>
        <button type="button" className={styles.resetButton} onClick={onReset}>
          <RotateCcw size={15} aria-hidden="true" />
          Reset seeded state
        </button>
      </div>
    </aside>
  )
}

function MobileNav({
  activeView,
  onViewChange,
}: {
  activeView: View
  onViewChange: (view: View) => void
}) {
  return (
    <nav className={styles.mobileNav} aria-label="Mobile navigation">
      {navItems.map((item) => {
        const ItemIcon = item.icon
        return (
          <button
            key={item.id}
            type="button"
            className={cx(
              styles.mobileNavItem,
              activeView === item.id && styles.mobileNavItemActive
            )}
            aria-current={activeView === item.id ? "page" : undefined}
            onClick={() => onViewChange(item.id)}
          >
            <ItemIcon size={19} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

function TopBar({
  title,
  onSearch,
  onNotify,
}: {
  title: string
  onSearch: () => void
  onNotify: () => void
}) {
  return (
    <header className={styles.topBar}>
      <div className={styles.mobileBrand}>
        <div className={styles.brandMark} aria-hidden="true">
          <Shield size={17} />
          <span />
        </div>
        <strong>Breakline</strong>
      </div>
      <div className={styles.topBarTitle}>
        <span className={styles.topBarEyebrow}>Aperture Labs</span>
        <strong>{title}</strong>
      </div>
      <div className={styles.topBarActions}>
        <button
          type="button"
          className={styles.searchButton}
          onClick={onSearch}
        >
          <Search size={16} aria-hidden="true" />
          <span>Search missions</span>
          <kbd>⌘ K</kbd>
        </button>
        <div className={styles.syncStatus}>
          <span className={styles.syncDot} />
          <span>Demo sync · 14m</span>
        </div>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Open notifications"
          onClick={onNotify}
        >
          <Bell size={18} aria-hidden="true" />
        </button>
        <div className={styles.avatar} aria-label="Signed in as Maya Chen">
          MC
        </div>
      </div>
    </header>
  )
}

function AttentionStrip({
  scenario,
  onAction,
}: {
  scenario: Scenario
  onAction: () => void
}) {
  const isAttention = scenario === "attention"
  const isClear = scenario === "clear"
  const Icon = isAttention ? TriangleAlert : isClear ? ShieldCheck : Activity
  return (
    <section
      className={cx(
        styles.attentionStrip,
        isAttention && styles.attentionStripCritical,
        isClear && styles.attentionStripClear
      )}
      aria-label={`${scenarioCopy[scenario].label} scenario status`}
    >
      <div className={styles.attentionMessage}>
        <Icon size={17} aria-hidden="true" />
        <span>{scenarioCopy[scenario].strip}</span>
      </div>
      <button type="button" onClick={onAction}>
        {scenarioCopy[scenario].stripAction}
        <ArrowRight size={15} aria-hidden="true" />
      </button>
    </section>
  )
}

function Hero({
  scenario,
  title,
  onScenarioChange,
  onOpenMissions,
}: {
  scenario: Scenario
  title: string
  onScenarioChange: (scenario: Scenario) => void
  onOpenMissions: () => void
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <div className={styles.heroEyebrow}>
          <span>{scenarioCopy[scenario].eyebrow}</span>
          <span className={styles.heroFreshness}>
            <RefreshCw size={12} aria-hidden="true" />
            Evidence refreshed 14m ago
          </span>
        </div>
        <h1>{title}</h1>
        <p>{scenarioCopy[scenario].support}</p>
      </div>
      <div className={styles.heroActions}>
        <div>
          <span className={styles.controlLabel}>Demo scenario</span>
          <ScenarioControl value={scenario} onChange={onScenarioChange} />
        </div>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={onOpenMissions}
        >
          Open mission queue
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}

function ScenarioControl({
  value,
  onChange,
}: {
  value: Scenario
  onChange: (scenario: Scenario) => void
}) {
  const options: { id: Scenario; label: string }[] = [
    { id: "attention", label: "High attention" },
    { id: "normal", label: "Normal" },
    { id: "clear", label: "All clear" },
  ]
  return (
    <div className={styles.scenarioControl} aria-label="Demo scenario">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={value === option.id ? styles.scenarioActive : undefined}
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function KpiCard({
  icon: Icon,
  label,
  value,
  trend,
  tone,
  spark,
  progress,
}: {
  icon: Icon
  label: string
  value: string
  trend: string
  tone: "good" | "warn" | "neutral"
  spark?: number[]
  progress?: number
}) {
  return (
    <article className={styles.kpiCard}>
      <div className={styles.kpiTop}>
        <div
          className={cx(
            styles.kpiIcon,
            tone === "good" && styles.kpiIconGood,
            tone === "warn" && styles.kpiIconWarn
          )}
        >
          <Icon size={17} aria-hidden="true" />
        </div>
        {spark && <MiniSparkline values={spark} tone={tone} />}
      </div>
      <div className={styles.kpiLabel}>{label}</div>
      <div className={styles.kpiValue}>{value}</div>
      {typeof progress === "number" && (
        <div
          className={styles.kpiProgress}
          role="progressbar"
          aria-label={`${label}: ${progress}%`}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      )}
      <div
        className={cx(
          styles.kpiTrend,
          tone === "good" && styles.kpiTrendGood,
          tone === "warn" && styles.kpiTrendWarn
        )}
      >
        {tone === "good" && <ArrowDownRight size={14} aria-hidden="true" />}
        {tone === "warn" && <CircleAlert size={13} aria-hidden="true" />}
        <span>{trend}</span>
      </div>
    </article>
  )
}

function MiniSparkline({
  values,
  tone,
}: {
  values: number[]
  tone: "good" | "warn" | "neutral"
}) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = Math.max(1, max - min)
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(1, values.length - 1)) * 62 + 1
      const y = 22 - ((value - min) / range) * 17
      return `${x},${y}`
    })
    .join(" ")
  return (
    <svg
      className={cx(
        styles.sparkline,
        tone === "good" && styles.sparklineGood,
        tone === "warn" && styles.sparklineWarn
      )}
      viewBox="0 0 64 26"
      aria-hidden="true"
    >
      <polyline points={points} fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function MissionPanel({
  title,
  description,
  missions,
  filter,
  search,
  searchRef,
  scenario,
  onFilterChange,
  onSearchChange,
  onOpenMission,
  onViewAll,
}: {
  title: string
  description: string
  missions: Mission[]
  filter: MissionFilter
  search: string
  searchRef: React.RefObject<HTMLInputElement | null>
  scenario: Scenario
  onFilterChange: (filter: MissionFilter) => void
  onSearchChange: (search: string) => void
  onOpenMission: (id: string, trigger?: HTMLElement) => void
  onViewAll?: () => void
}) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {onViewAll && (
          <button type="button" className={styles.textButton} onClick={onViewAll}>
            View all
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className={styles.missionTools}>
        <label className={styles.missionSearch}>
          <Search size={15} aria-hidden="true" />
          <span className={styles.visuallyHidden}>Search missions</span>
          <input
            ref={searchRef}
            type="search"
            value={search}
            placeholder="Search mission, owner, service…"
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>
        <div className={styles.filterRow} aria-label="Mission filters">
          <Filter size={14} aria-hidden="true" />
          {filterOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={filter === option.id ? styles.filterActive : undefined}
              aria-pressed={filter === option.id}
              onClick={() => onFilterChange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {missions.length > 0 ? (
        <div className={styles.missionTable}>
          <div className={styles.missionHeader} aria-hidden="true">
            <span>Mission</span>
            <span>Leverage</span>
            <span>Effort</span>
            <span>Owner</span>
            <span>Policy</span>
            <span>Status</span>
            <span />
          </div>
          <div className={styles.missionRows}>
            {missions.map((mission) => (
              <MissionRow
                key={mission.id}
                mission={mission}
                onOpen={onOpenMission}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyQueue
          isClear={scenario === "clear" && !search}
          hasSearch={Boolean(search)}
          onClear={() => {
            onSearchChange("")
            onFilterChange("all")
          }}
          onVerified={() => onFilterChange("verified")}
        />
      )}
    </section>
  )
}

function MissionRow({
  mission,
  onOpen,
}: {
  mission: Mission
  onOpen: (id: string, trigger?: HTMLElement) => void
}) {
  return (
    <button
      type="button"
      className={styles.missionRow}
      onClick={(event) => onOpen(mission.id, event.currentTarget)}
      aria-label={`Open ${mission.id}: ${mission.title}`}
    >
      <span className={styles.missionIdentity}>
        <span className={styles.missionTopline}>
          <span
            className={cx(styles.decisionBadge, decisionClass(mission.decision))}
          >
            {mission.decision}
          </span>
          <span className={styles.missionId}>{mission.id}</span>
          <span className={styles.priorityScore}>{mission.priority}</span>
        </span>
        <strong>{mission.title}</strong>
        <span className={styles.missionSub}>
          {mission.service} · {mission.environment}
        </span>
        <span className={styles.mobileSignals}>
          {mission.signals.slice(0, 2).map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </span>
      </span>

      <span className={styles.missionMetric}>
        <strong>{mission.paths}</strong>
        <span>paths</span>
      </span>
      <span className={styles.missionMetric}>
        <strong>{mission.effort}</strong>
        <span>estimate</span>
      </span>
      <span
        className={cx(
          styles.ownerCell,
          mission.owner === "Needs owner" && styles.ownerMissing
        )}
      >
        <span className={styles.ownerAvatar}>
          {mission.owner === "Needs owner"
            ? "?"
            : mission.owner
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
        </span>
        <span>{mission.owner}</span>
      </span>
      <span
        className={cx(
          styles.dueCell,
          mission.dueTone === "overdue" && styles.dueOverdue,
          mission.dueTone === "soon" && styles.dueSoon,
          mission.dueTone === "verified" && styles.dueVerified
        )}
      >
        {mission.dueTone === "overdue" && (
          <TriangleAlert size={13} aria-hidden="true" />
        )}
        {mission.dueTone === "verified" && (
          <Check size={13} aria-hidden="true" />
        )}
        {mission.due}
      </span>
      <span className={cx(styles.statusBadge, statusClass(mission.status))}>
        <span />
        {statusLabel(mission.status)}
      </span>
      <ChevronRight
        className={styles.rowChevron}
        size={17}
        aria-hidden="true"
      />
    </button>
  )
}

function EmptyQueue({
  isClear,
  hasSearch,
  onClear,
  onVerified,
}: {
  isClear: boolean
  hasSearch: boolean
  onClear: () => void
  onVerified: () => void
}) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        {isClear ? (
          <ShieldCheck size={27} aria-hidden="true" />
        ) : (
          <Search size={24} aria-hidden="true" />
        )}
      </div>
      <h3>
        {isClear
          ? "No active missions in this scenario"
          : "No missions match this view"}
      </h3>
      <p>
        {isClear
          ? "All currently modeled priority paths have an owner decision. Verified work remains available for review."
          : hasSearch
            ? "Try a different mission, service, owner, or signal."
            : "Clear the selected filter to return to the active queue."}
      </p>
      <div className={styles.emptyActions}>
        <button type="button" className={styles.secondaryButton} onClick={onClear}>
          Clear filters
        </button>
        {isClear && (
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onVerified}
          >
            View verified work
          </button>
        )}
      </div>
    </div>
  )
}

function TrendPanel({ scenario }: { scenario: Scenario }) {
  const values =
    scenario === "attention"
      ? [18, 17, 15, 16, 12, 11, 8]
      : scenario === "normal"
        ? [12, 11, 10, 8, 7, 6, 4]
        : [7, 6, 4, 3, 2, 1, 0]
  const current = values[values.length - 1]
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <h2>Reachable critical targets</h2>
          <p>Unique tier-0 and tier-1 assets with a modeled route.</p>
        </div>
        <span className={styles.timePill}>7 weeks</span>
      </div>
      <div className={styles.trendSummary}>
        <strong>{current}</strong>
        <span>
          <ArrowDownRight size={14} aria-hidden="true" />
          {18 - current} fewer since Jun 2
        </span>
      </div>
      <TrendChart values={values} target={3} />
      <div className={styles.chartLegend} aria-hidden="true">
        <span>
          <i className={styles.legendActual} /> Reachable targets
        </span>
        <span>
          <i className={styles.legendTarget} /> Quarterly target
        </span>
      </div>
      <p className={styles.chartSummaryText}>
        Current: {current}. Seven-week high: {Math.max(...values)}. Quarterly
        target: 3.
      </p>
    </section>
  )
}

function TrendChart({ values, target }: { values: number[]; target: number }) {
  const width = 320
  const height = 124
  const left = 16
  const right = 306
  const top = 12
  const bottom = 93
  const max = Math.max(20, ...values)
  const pointList = values.map((value, index) => {
    const x = left + (index / (values.length - 1)) * (right - left)
    const y = bottom - (value / max) * (bottom - top)
    return { x, y, value }
  })
  const points = pointList.map((point) => `${point.x},${point.y}`).join(" ")
  const area = `M ${pointList
    .map((point) => `${point.x} ${point.y}`)
    .join(" L ")} L ${right} ${bottom} L ${left} ${bottom} Z`
  const targetY = bottom - (target / max) * (bottom - top)
  const labels = ["Jun 2", "9", "16", "23", "30", "Jul 7", "14"]

  return (
    <svg
      className={styles.trendChart}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Reachable critical targets changed from ${values[0]} to ${
        values[values.length - 1]
      } over seven weeks. Target is ${target}.`}
    >
      {[0, 1, 2, 3].map((line) => {
        const y = top + (line / 3) * (bottom - top)
        return (
          <line
            key={line}
            className={styles.chartGrid}
            x1={left}
            x2={right}
            y1={y}
            y2={y}
          />
        )
      })}
      <line
        className={styles.chartTarget}
        x1={left}
        x2={right}
        y1={targetY}
        y2={targetY}
      />
      <path className={styles.chartArea} d={area} />
      <polyline className={styles.chartLine} points={points} fill="none" />
      {pointList.map((point, index) => (
        <circle
          key={`${point.x}-${point.value}`}
          className={styles.chartPoint}
          cx={point.x}
          cy={point.y}
          r={index === pointList.length - 1 ? 4 : 2.5}
        >
          <title>{`${labels[index]}: ${point.value} reachable critical targets`}</title>
        </circle>
      ))}
      {labels.map((label, index) => {
        const x = left + (index / (labels.length - 1)) * (right - left)
        return (
          <text
            key={label}
            className={styles.chartAxisLabel}
            x={x}
            y={116}
            textAnchor={
              index === 0 ? "start" : index === labels.length - 1 ? "end" : "middle"
            }
          >
            {label}
          </text>
        )
      })}
    </svg>
  )
}

function TeamFocus({ missions }: { missions: Mission[] }) {
  const teamData = [
    { name: "Edge Platform", initials: "EP", count: 1, state: "Overdue" },
    { name: "Dev Productivity", initials: "DP", count: 1, state: "In progress" },
    { name: "Data Platform", initials: "DA", count: 1, state: "Owner suggested" },
  ].filter((team) =>
    missions.some(
      (mission) =>
        mission.owner === team.name || mission.suggestedOwner === team.name
    )
  )

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <h2>Team focus</h2>
          <p>Active ownership and decision state.</p>
        </div>
      </div>
      {teamData.length ? (
        <div className={styles.teamList}>
          {teamData.map((team) => (
            <div className={styles.teamRow} key={team.name}>
              <div className={styles.teamAvatar}>{team.initials}</div>
              <div className={styles.teamName}>
                <strong>{team.name}</strong>
                <span>
                  {team.count} active mission{team.count === 1 ? "" : "s"}
                </span>
              </div>
              <span
                className={cx(
                  styles.teamState,
                  team.state === "Overdue" && styles.teamStateOverdue
                )}
              >
                {team.state}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.compactEmpty}>
          <CheckCircle2 size={20} aria-hidden="true" />
          <span>No team has an active priority mission.</span>
        </div>
      )}
    </section>
  )
}

function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children?: React.ReactNode
}) {
  return (
    <header className={styles.pageHeading}>
      <div>
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children && <div className={styles.pageHeadingActions}>{children}</div>}
    </header>
  )
}

function CoverageView({
  onOpenMissions,
}: {
  onOpenMissions: () => void
}) {
  const sources: {
    icon: Icon
    name: string
    scope: string
    status: string
    detail: string
    tone: "healthy" | "stale" | "off"
  }[] = [
    {
      icon: Cloud,
      name: "AWS organization",
      scope: "42 accounts · 18,430 resources",
      status: "Healthy",
      detail: "Last complete collection 14 minutes ago",
      tone: "healthy",
    },
    {
      icon: ShieldCheck,
      name: "AWS Security Hub",
      scope: "37 enabled accounts · 6,204 findings",
      status: "Healthy",
      detail: "Finding import completed 11 minutes ago",
      tone: "healthy",
    },
    {
      icon: GitBranch,
      name: "GitHub ownership",
      scope: "118 repositories · 24 teams",
      status: "Stale",
      detail: "Two CODEOWNERS files have not refreshed in 26 hours",
      tone: "stale",
    },
    {
      icon: Plug,
      name: "Azure and GCP",
      scope: "No demo scope configured",
      status: "Not connected",
      detail: "This product demo is intentionally AWS-first",
      tone: "off",
    },
  ]

  return (
    <section className={styles.pageSection}>
      <PageHeading
        eyebrow="Trust and source health"
        title="Evidence coverage is separate from security posture"
        description="See exactly which demo sources support a decision, when they were observed, and where missing data lowers confidence."
      >
        <button
          type="button"
          className={styles.primaryButton}
          onClick={onOpenMissions}
        >
          Review affected missions
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </PageHeading>

      <section className={styles.coverageStats} aria-label="Coverage metrics">
        <div>
          <span>Cloud scope</span>
          <strong>96%</strong>
          <p>42 of 44 expected accounts reporting.</p>
        </div>
        <div>
          <span>Ownership</span>
          <strong>92%</strong>
          <p>7 critical resources need confirmation.</p>
        </div>
        <div>
          <span>Fresh evidence</span>
          <strong>98.4%</strong>
          <p>Within the policy freshness window.</p>
        </div>
        <div>
          <span>Path confidence</span>
          <strong>High</strong>
          <p>3 routes include inferred ownership only.</p>
        </div>
      </section>

      <section className={styles.coverageLayout}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Source connections</h2>
              <p>All connectors and observations shown here are seeded.</p>
            </div>
            <span className={styles.demoPill}>Demo connections</span>
          </div>
          <div className={styles.sourceList}>
            {sources.map((source) => {
              const SourceIcon = source.icon
              return (
                <article className={styles.sourceCard} key={source.name}>
                  <div
                    className={cx(
                      styles.sourceIcon,
                      source.tone === "stale" && styles.sourceIconStale,
                      source.tone === "off" && styles.sourceIconOff
                    )}
                  >
                    <SourceIcon size={19} aria-hidden="true" />
                  </div>
                  <div className={styles.sourceInfo}>
                    <div>
                      <h3>{source.name}</h3>
                      <span
                        className={cx(
                          styles.sourceStatus,
                          source.tone === "stale" && styles.sourceStatusStale,
                          source.tone === "off" && styles.sourceStatusOff
                        )}
                      >
                        <i />
                        {source.status}
                      </span>
                    </div>
                    <strong>{source.scope}</strong>
                    <p>{source.detail}</p>
                  </div>
                  <ChevronRight size={17} aria-hidden="true" />
                </article>
              )
            })}
          </div>
        </div>

        <div className={styles.sideStack}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h2>Ownership confidence</h2>
                <p>How responsible teams were resolved.</p>
              </div>
            </div>
            <div className={styles.coverageBars}>
              {[
                ["Cloud service tags", 68],
                ["Repository ownership", 21],
                ["Manual confirmation", 7],
                ["Missing", 4],
              ].map(([label, value]) => (
                <div className={styles.coverageBar} key={String(label)}>
                  <div>
                    <span>{label}</span>
                    <strong>{value}%</strong>
                  </div>
                  <span>
                    <i style={{ width: `${value}%` }} />
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className={cx(styles.panel, styles.coverageWarning)}>
            <div className={styles.warningIcon}>
              <TriangleAlert size={19} aria-hidden="true" />
            </div>
            <div>
              <h2>Two AWS accounts are outside scope</h2>
              <p>
                The demo keeps prior observations visible but does not call them
                fresh. A production recommendation would show reduced confidence.
              </p>
              <button type="button" onClick={() => undefined}>
                Review missing scope
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </section>
        </div>
      </section>
    </section>
  )
}

function ReportsView({
  reachableTargets,
  ownershipCoverage,
  onOpenMission,
}: {
  reachableTargets: number
  ownershipCoverage: number
  onOpenMission: (id: string) => void
}) {
  const outcomes = [
    { label: "Paths prevented", value: 31, max: 40, tone: "teal" },
    { label: "Paths opened", value: 12, max: 40, tone: "coral" },
    { label: "Accepted paths", value: 5, max: 40, tone: "amber" },
    { label: "Reopened paths", value: 2, max: 40, tone: "blue" },
  ]

  return (
    <section className={styles.pageSection}>
      <PageHeading
        eyebrow="Jul 1–16 · seeded outcome period"
        title="Verified reduction, not ticket closure"
        description="Leadership metrics distinguish prevented, accepted, and still-reachable paths. Every number links back to mission evidence."
      >
        <button type="button" className={styles.secondaryButton}>
          <FileText size={15} aria-hidden="true" />
          Export demo brief
        </button>
      </PageHeading>

      <section className={styles.reportHero}>
        <div className={styles.reportLead}>
          <span>Net path reduction</span>
          <strong>−19</strong>
          <p>
            31 paths prevented, 12 newly opened. Two tier-0 targets are no longer
            reachable through the verified break points.
          </p>
        </div>
        <div className={styles.reportMetric}>
          <span>Critical targets reachable</span>
          <strong>{reachableTargets}</strong>
          <small>Target ≤ 3</small>
        </div>
        <div className={styles.reportMetric}>
          <span>Ownership coverage</span>
          <strong>{ownershipCoverage}%</strong>
          <small>Target ≥ 95%</small>
        </div>
        <div className={styles.reportMetric}>
          <span>p50 / p90 verify</span>
          <strong>18h / 3.1d</strong>
          <small>Policy target 24h / 5d</small>
        </div>
      </section>

      <section className={styles.reportGrid}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Path outcomes</h2>
              <p>Comparable path-engine cohort for this seeded period.</p>
            </div>
          </div>
          <div className={styles.outcomeBars}>
            {outcomes.map((outcome) => (
              <div className={styles.outcomeBar} key={outcome.label}>
                <div>
                  <span>{outcome.label}</span>
                  <strong>{outcome.value}</strong>
                </div>
                <span>
                  <i
                    className={styles[`bar${outcome.tone}`]}
                    style={{ width: `${(outcome.value / outcome.max) * 100}%` }}
                  />
                </span>
              </div>
            ))}
          </div>
          <div className={styles.reportNote}>
            <ShieldCheck size={17} aria-hidden="true" />
            <p>
              Prevented means the expected condition was absent in a fresh
              observation. Accepted paths remain visible and are not counted as
              reduction.
            </p>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Recent verified work</h2>
              <p>Evidence-backed outcomes with accountable owners.</p>
            </div>
          </div>
          <div className={styles.verifiedList}>
            <button type="button" onClick={() => onOpenMission("M-1008")}>
              <span className={styles.verifiedIcon}>
                <Check size={15} aria-hidden="true" />
              </span>
              <span>
                <strong>Restrict the support export bucket</strong>
                <small>Support Systems · 4 paths prevented</small>
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
            <div>
              <span className={styles.verifiedIcon}>
                <Check size={15} aria-hidden="true" />
              </span>
              <span>
                <strong>Disable legacy build administrator</strong>
                <small>Identity Platform · 6 paths prevented</small>
              </span>
              <span className={styles.reportDate}>Jul 12</span>
            </div>
            <div>
              <span className={styles.verifiedIcon}>
                <Check size={15} aria-hidden="true" />
              </span>
              <span>
                <strong>Narrow production database security group</strong>
                <small>Data Platform · 3 paths prevented</small>
              </span>
              <span className={styles.reportDate}>Jul 9</span>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

function MissionDrawer({
  mission,
  tab,
  onTabChange,
  onClose,
  onAdvance,
  onAssign,
}: {
  mission: Mission
  tab: DetailTab
  onTabChange: (tab: DetailTab) => void
  onClose: () => void
  onAdvance: (mission: Mission) => void
  onAssign: (mission: Mission) => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== "Tab" || !dialogRef.current) return

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    )
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const primaryLabel =
    mission.status === "proposed"
      ? "Start mission"
      : mission.status === "in-progress"
        ? "Submit for verification"
        : mission.status === "in-review"
          ? "Verify demo fix"
          : "Verified"

  return (
    <div
      className={styles.drawerOverlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mission-title"
        aria-describedby="mission-summary"
        onKeyDown={handleKeyDown}
      >
        <header className={styles.drawerHeader}>
          <div className={styles.drawerUtility}>
            <div className={styles.drawerCrumb}>
              <span className={styles.missionId}>{mission.id}</span>
              <span>Seeded mission</span>
            </div>
            <button
              ref={closeRef}
              type="button"
              className={styles.iconButton}
              aria-label="Close mission details"
              onClick={onClose}
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>
          <div className={styles.drawerBadges}>
            <span
              className={cx(
                styles.decisionBadge,
                decisionClass(mission.decision)
              )}
            >
              {mission.decision}
            </span>
            <span className={cx(styles.statusBadge, statusClass(mission.status))}>
              <span />
              {statusLabel(mission.status)}
            </span>
          </div>
          <h2 id="mission-title">{mission.title}</h2>
          <p id="mission-summary">{mission.summary}</p>
          <div className={styles.drawerMeta}>
            <span>
              <Cloud size={14} aria-hidden="true" />
              {mission.environment}
            </span>
            <span>
              <UserRound size={14} aria-hidden="true" />
              {mission.owner}
            </span>
            <span
              className={mission.dueTone === "overdue" ? styles.metaOverdue : ""}
            >
              <Clock3 size={14} aria-hidden="true" />
              {mission.due}
            </span>
          </div>
        </header>

        <section className={styles.impactCallout}>
          <div className={styles.impactIcon}>
            <Wrench size={18} aria-hidden="true" />
          </div>
          <div>
            <span>Recommended break</span>
            <strong>{mission.fixTitle}</strong>
            <p>
              Expected to break <b>{mission.paths} paths</b> to{" "}
              <b>
                {mission.targets} critical target
                {mission.targets === 1 ? "" : "s"}
              </b>{" "}
              · {mission.effort}
            </p>
          </div>
        </section>

        <div className={styles.drawerTabs} role="tablist" aria-label="Mission detail">
          {(
            [
              ["why", "Why now"],
              ["path", "Attack path"],
              ["fix", "Fix plan"],
              ["evidence", "Evidence"],
            ] as [DetailTab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={tab === id ? styles.drawerTabActive : undefined}
              onClick={() => onTabChange(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles.drawerBody}>
          {tab === "why" && <WhyTab mission={mission} />}
          {tab === "path" && <PathTab mission={mission} />}
          {tab === "fix" && <FixTab mission={mission} />}
          {tab === "evidence" && <EvidenceTab mission={mission} />}
        </div>

        <footer className={styles.drawerFooter}>
          <p>
            <Sparkles size={13} aria-hidden="true" />
            Demo actions update local state only.
          </p>
          <div>
            {mission.owner === "Needs owner" && (
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => onAssign(mission)}
              >
                Assign {mission.suggestedOwner}
              </button>
            )}
            <button
              type="button"
              className={styles.primaryButton}
              disabled={mission.status === "verified"}
              onClick={() => onAdvance(mission)}
            >
              {mission.status === "verified" && (
                <Check size={15} aria-hidden="true" />
              )}
              {primaryLabel}
              {mission.status !== "verified" && (
                <ArrowRight size={15} aria-hidden="true" />
              )}
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

function WhyTab({ mission }: { mission: Mission }) {
  return (
    <div className={styles.detailStack}>
      <section>
        <div className={styles.detailHeading}>
          <div>
            <span>Decision factors</span>
            <h3>Why this mission is prioritized</h3>
          </div>
          <span className={styles.scoreBox}>
            <small>Priority</small>
            <strong>{mission.priority}</strong>
          </span>
        </div>
        <div className={styles.factorList}>
          {mission.factors.map((factor) => (
            <article className={styles.factor} key={factor.label}>
              <div className={styles.factorTop}>
                <span>{factor.label}</span>
                <strong>{factor.value}</strong>
              </div>
              <div
                className={styles.factorBar}
                role="progressbar"
                aria-label={`${factor.label}: ${factor.value} out of 100`}
                aria-valuenow={factor.value}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span style={{ width: `${factor.value}%` }} />
              </div>
              <div className={styles.factorState}>{factor.state}</div>
              <p>{factor.detail}</p>
              <div className={styles.factorSource}>
                <span>{factor.source}</span>
                <span>{factor.freshness}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.policyCard}>
        <div className={styles.policyIcon}>
          <GitBranch size={18} aria-hidden="true" />
        </div>
        <div>
          <span>How this was decided</span>
          <h3>Cloud action policy v3.2</h3>
          <p>
            {mission.decision} because high-confidence reachability and
            critical-target impact exceed the action threshold. Effort is used
            to rank the break point, not to hide risk.
          </p>
          <button type="button">
            Inspect policy logic
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className={styles.infoCallout}>
        <CircleAlert size={17} aria-hidden="true" />
        <p>
          <strong>Why above the next mission:</strong> this fix protects{" "}
          {mission.targets} critical target{mission.targets === 1 ? "" : "s"} and
          removes {mission.paths} paths with a {mission.effort} estimated change.
          Raw source values remain visible above.
        </p>
      </section>
    </div>
  )
}

function PathTab({ mission }: { mission: Mission }) {
  return (
    <div className={styles.detailStack}>
      <section>
        <div className={styles.detailHeading}>
          <div>
            <span>Selected plausible route</span>
            <h3>Origin to critical target</h3>
          </div>
          <span className={styles.pathCount}>{mission.paths} related paths</span>
        </div>
        <div
          className={styles.attackGraph}
          aria-label={`Attack path with ${mission.graph.length} steps. Recommended break is ${mission.graph[mission.breakPointIndex].label}.`}
        >
          {mission.graph.map((node, index) => {
            const NodeIcon = graphIcon(node.type)
            const isBreak = index === mission.breakPointIndex
            return (
              <Fragment key={`${node.label}-${index}`}>
                <div
                  className={cx(
                    styles.graphNode,
                    styles[`graphNode${node.type}`],
                    isBreak && styles.graphNodeBreak
                  )}
                >
                  {isBreak && (
                    <span className={styles.breakLabel}>Fastest break</span>
                  )}
                  <div>
                    <NodeIcon size={17} aria-hidden="true" />
                  </div>
                  <strong>{node.label}</strong>
                  <span>{node.meta}</span>
                  {node.technique && <code>{node.technique}</code>}
                </div>
                {index < mission.graph.length - 1 && (
                  <div className={styles.graphEdge} aria-hidden="true">
                    <span>{mission.edgeLabels[index]}</span>
                    <ArrowRight size={18} />
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>
      </section>

      <section className={styles.breakSummary}>
        <div className={styles.breakSummaryIcon}>
          <Network size={18} aria-hidden="true" />
        </div>
        <div>
          <span>Shared choke point</span>
          <h3>{mission.graph[mission.breakPointIndex].label}</h3>
          <p>
            This condition appears in {mission.paths} modeled paths. Removing it
            is expected to protect {mission.targets} critical target
            {mission.targets === 1 ? "" : "s"} without changing downstream
            services.
          </p>
        </div>
      </section>

      <section>
        <div className={styles.detailHeading}>
          <div>
            <span>Path vocabulary</span>
            <h3>Techniques and conditions</h3>
          </div>
        </div>
        <div className={styles.techniqueList}>
          {mission.graph
            .filter((node) => node.technique)
            .map((node) => (
              <div key={`${node.label}-${node.technique}`}>
                <code>{node.technique}</code>
                <span>{node.label}</span>
                <small>MITRE ATT&CK label · demo path evidence</small>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}

function FixTab({ mission }: { mission: Mission }) {
  return (
    <div className={styles.detailStack}>
      <section className={styles.fixIntro}>
        <span>Recommended change</span>
        <h3>{mission.fixTitle}</h3>
        <p>{mission.fixSummary}</p>
        <div className={styles.fixMetrics}>
          <div>
            <strong>{mission.paths}</strong>
            <span>paths removed</span>
          </div>
          <div>
            <strong>{mission.targets}</strong>
            <span>critical targets</span>
          </div>
          <div>
            <strong>{mission.effort}</strong>
            <span>estimated effort</span>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.detailHeading}>
          <div>
            <span>Owner-ready plan</span>
            <h3>Implementation steps</h3>
          </div>
        </div>
        <ol className={styles.stepList}>
          {mission.fixSteps.map((step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.rollbackCard}>
        <div>
          <RefreshCw size={17} aria-hidden="true" />
        </div>
        <div>
          <span>Rollback guidance</span>
          <p>{mission.rollback}</p>
        </div>
      </section>

      <section className={styles.verificationCard}>
        <div>
          <ShieldCheck size={18} aria-hidden="true" />
        </div>
        <div>
          <span>Verification predicate</span>
          <h3>What “verified” means</h3>
          <p>{mission.verification}</p>
        </div>
      </section>

      <section>
        <div className={styles.detailHeading}>
          <div>
            <span>Alternatives</span>
            <h3>Other valid break points</h3>
          </div>
        </div>
        <div className={styles.alternativeList}>
          {mission.alternatives.map((alternative) => (
            <button type="button" key={alternative.title}>
              <span>
                <strong>{alternative.title}</strong>
                <small>{alternative.tradeoff}</small>
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function EvidenceTab({ mission }: { mission: Mission }) {
  const timeline = [
    {
      label: "Mission created",
      detail: "Break point grouped from correlated demo paths",
      complete: true,
    },
    {
      label: "Owner ready",
      detail:
        mission.owner === "Needs owner"
          ? `Suggested: ${mission.suggestedOwner}`
          : mission.owner,
      complete: mission.owner !== "Needs owner",
    },
    {
      label: "Work started",
      detail:
        mission.status === "proposed" ? "Waiting for owner action" : "Recorded locally",
      complete: mission.status !== "proposed",
    },
    {
      label: "Submitted for review",
      detail:
        mission.status === "in-review" || mission.status === "verified"
          ? "Verification predicate ready"
          : "Not submitted",
      complete: mission.status === "in-review" || mission.status === "verified",
    },
    {
      label: "Verified",
      detail:
        mission.status === "verified"
          ? `${mission.paths} demo paths marked prevented`
          : "Requires fresh evidence",
      complete: mission.status === "verified",
    },
  ]

  return (
    <div className={styles.detailStack}>
      <section>
        <div className={styles.detailHeading}>
          <div>
            <span>Source provenance</span>
            <h3>Evidence supporting this mission</h3>
          </div>
        </div>
        <div className={styles.evidenceList}>
          {mission.evidence.map((evidence) => (
            <article key={`${evidence.source}-${evidence.value}`}>
              <div
                className={cx(
                  styles.evidenceState,
                  evidence.state === "stale" && styles.evidenceStateStale,
                  evidence.state === "inferred" && styles.evidenceStateInferred
                )}
              >
                {evidence.state === "fresh" ? (
                  <Check size={13} aria-hidden="true" />
                ) : evidence.state === "stale" ? (
                  <Clock3 size={13} aria-hidden="true" />
                ) : (
                  <Sparkles size={13} aria-hidden="true" />
                )}
              </div>
              <div>
                <span>{evidence.source}</span>
                <strong>{evidence.value}</strong>
              </div>
              <small>{evidence.observed}</small>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className={styles.detailHeading}>
          <div>
            <span>Audit-ready lifecycle</span>
            <h3>Mission timeline</h3>
          </div>
        </div>
        <ol className={styles.timeline}>
          {timeline.map((item) => (
            <li key={item.label}>
              <span
                className={item.complete ? styles.timelineComplete : undefined}
              >
                {item.complete && <Check size={11} aria-hidden="true" />}
              </span>
              <div>
                <strong>{item.label}</strong>
                <small>{item.detail}</small>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        className={cx(
          styles.verificationResult,
          mission.status === "verified" && styles.verificationResultPass
        )}
      >
        <div>
          {mission.status === "verified" ? (
            <CheckCircle2 size={20} aria-hidden="true" />
          ) : (
            <Activity size={20} aria-hidden="true" />
          )}
        </div>
        <div>
          <span>Automated verification</span>
          <h3>
            {mission.status === "verified"
              ? "Demo predicate passed"
              : "Waiting for submitted change"}
          </h3>
          <p>
            {mission.status === "verified"
              ? `${mission.paths} demo paths are marked prevented from a simulated fresh observation.`
              : mission.verification}
          </p>
        </div>
      </section>
    </div>
  )
}
