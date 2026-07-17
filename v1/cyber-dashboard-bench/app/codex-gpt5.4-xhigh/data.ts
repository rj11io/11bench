import type {
  ExposureMission,
  FilterKey,
  OwnerTeam,
  PersistedDashboardState,
  TabKey,
  WorkflowState,
} from "./types"

export const DEMO_DATE = "2026-07-16"
export const DEMO_REFRESH = "Every 6 hours"
export const STORAGE_KEY = "chokepoint-demo-v1"
export const STORAGE_VERSION = 1
export const DEMO_OPERATOR = "A. Rivera"

export const OWNER_TEAMS: OwnerTeam[] = [
  {
    id: "unassigned",
    name: "Unassigned",
    lead: "Route pending",
    domain: "Needs service ownership mapping",
    coverageConfidence: 28,
    defaultSlaDays: 2,
  },
  {
    id: "platform-core",
    name: "Platform Core",
    lead: "M. Chen",
    domain: "Kubernetes, IAM boundaries, edge controls",
    coverageConfidence: 94,
    defaultSlaDays: 3,
  },
  {
    id: "identity-foundation",
    name: "Identity Foundation",
    lead: "S. Patel",
    domain: "SSO, privileged access, MFA policy",
    coverageConfidence: 91,
    defaultSlaDays: 2,
  },
  {
    id: "developer-platform",
    name: "Developer Platform",
    lead: "R. Gomez",
    domain: "CI, release systems, build secrets",
    coverageConfidence: 87,
    defaultSlaDays: 4,
  },
  {
    id: "trust-apps",
    name: "Trust Apps",
    lead: "L. Brooks",
    domain: "Support tooling, tenant controls, app auth",
    coverageConfidence: 81,
    defaultSlaDays: 4,
  },
]

export const FILTER_OPTIONS: Array<{
  id: FilterKey
  label: string
}> = [
  { id: "all", label: "All missions" },
  { id: "breached", label: "Breached" },
  { id: "unassigned", label: "Unassigned" },
  { id: "new", label: "Queued" },
  { id: "notified", label: "Owner notified" },
  { id: "in_progress", label: "Fix in progress" },
  { id: "resolved", label: "Resolved" },
  { id: "accepted", label: "Accepted" },
]

export const TAB_LABELS: Record<TabKey, string> = {
  overview: "Overview",
  missions: "Missions",
  owners: "Owners",
  audit: "Audit",
}

export const WORKFLOW_LABELS: Record<WorkflowState, string> = {
  new: "Queued",
  notified: "Owner notified",
  in_progress: "Fix in progress",
  resolved: "Resolved",
  accepted: "Accepted exception",
}

export const BURN_DOWN_BASELINE = [446, 422, 401, 387, 374]

const MISSION_SEED: ExposureMission[] = [
  {
    id: "EXP-118",
    title: "Billing API pod can pivot into the invoices archive through the ci-deployer role",
    summary:
      "Twelve findings collapse into one exposed path from a public workload to invoice data. The highest-risk move is the wildcard trust on ci-deployer@prod.",
    severity: "critical",
    riskScore: 98,
    workflowState: "new",
    ownerTeamId: "unassigned",
    businessService: "Billing Graph",
    crownJewel: "Invoices archive (PII + payment artifacts)",
    dueDate: "2026-07-15",
    lastValidatedAt: "2026-07-16T07:10:00Z",
    findingCount: 12,
    targetType: "data_store",
    attackPath: {
      entryPoint: "Public billing API",
      chokePoint: "ci-deployer@prod",
      target: "Invoices archive",
      simulationLabel: "Simulated exposure path. No active attack evidence.",
      nodes: [
        {
          id: "n1",
          label: "Public API",
          detail: "GraphQL billing pod accepts public traffic",
          kind: "entry",
        },
        {
          id: "n2",
          label: "SSRF foothold",
          detail: "Runtime route can reach metadata path",
          kind: "application",
        },
        {
          id: "n3",
          label: "ci-deployer@prod",
          detail: "Wildcard trust and secrets read",
          kind: "identity",
        },
        {
          id: "n4",
          label: "Prod cluster secret",
          detail: "Bucket token mounted in build namespace",
          kind: "control",
        },
        {
          id: "n5",
          label: "Invoices archive",
          detail: "Sensitive customer invoice records",
          kind: "data",
        },
      ],
    },
    evidence: [
      { type: "reachability", label: "Internet reachable", impactLabel: "+30" },
      { type: "secret", label: "Mounted secret on path", impactLabel: "+21" },
      { type: "identity", label: "Wildcard trust policy", impactLabel: "+24" },
      { type: "data", label: "PII and payment artifacts", impactLabel: "+18" },
      { type: "control_gap", label: "No service-level owner mapped", impactLabel: "+5" },
    ],
    scoreFactors: [
      {
        label: "Exploitability",
        score: 92,
        description: "Public edge plus reachable SSRF path and credentialed pivot.",
      },
      {
        label: "Blast radius",
        score: 88,
        description: "One role fans into multiple production namespaces and the archive bucket.",
      },
      {
        label: "Business impact",
        score: 96,
        description: "Invoices archive supports refunds, disputes, and customer trust workflows.",
      },
      {
        label: "Control gap",
        score: 74,
        description: "Guardrails exist, but least-privilege and owner mapping are missing.",
      },
    ],
    remediationSteps: [
      {
        id: "r1",
        title: "Scope ci-deployer@prod to build-only namespaces and remove wildcard trust.",
        ownerHint: "Platform Core",
        reduction: 36,
      },
      {
        id: "r2",
        title: "Move archive credentials out of the build namespace and rotate the token.",
        ownerHint: "Developer Platform",
        reduction: 24,
      },
      {
        id: "r3",
        title: "Add bucket condition keys so only the billing service can read invoice objects.",
        ownerHint: "Platform Core",
        reduction: 22,
      },
      {
        id: "r4",
        title: "Map the Billing Graph service owner for automatic future routing.",
        ownerHint: "Trust Apps",
        reduction: 16,
      },
    ],
    controls: [
      {
        id: "c1",
        label: "WAF on public API",
        status: "partial",
        note: "Helps on direct exploit volume, not on role abuse after foothold.",
      },
      {
        id: "c2",
        label: "Bucket encryption",
        status: "strong",
        note: "Protects at rest, not against authorized token misuse.",
      },
      {
        id: "c3",
        label: "Namespace least privilege",
        status: "missing",
        note: "Current trust boundary is too broad for the build role.",
      },
    ],
    sourceSystems: ["Wiz", "AWS Security Hub", "GitHub owners"],
    timeline: [
      {
        id: "exp118-1",
        timestamp: "2026-07-15T08:15:00Z",
        actor: "Chokepoint",
        action: "Mission created",
        details: "Grouped 12 findings into one toxic combination path.",
      },
      {
        id: "exp118-2",
        timestamp: "2026-07-16T07:10:00Z",
        actor: "Chokepoint",
        action: "Path revalidated",
        details: "Simulation still reaches the invoice archive through ci-deployer@prod.",
      },
    ],
  },
  {
    id: "EXP-104",
    title: "Dormant Okta super admin with MFA bypass can reach payroll export workflows",
    summary:
      "Identity compromise remains the primary concern. A dormant privileged account plus MFA exemption leaves a direct administrative path into payroll export controls.",
    severity: "critical",
    riskScore: 91,
    workflowState: "notified",
    ownerTeamId: "identity-foundation",
    businessService: "Workforce Identity",
    crownJewel: "Payroll export vault",
    dueDate: "2026-07-14",
    lastValidatedAt: "2026-07-16T06:55:00Z",
    findingCount: 7,
    targetType: "identity",
    attackPath: {
      entryPoint: "Dormant privileged identity",
      chokePoint: "Okta MFA bypass policy",
      target: "Payroll export vault",
      simulationLabel: "Simulated privileged-access path. No payroll data access observed live.",
      nodes: [
        {
          id: "n1",
          label: "Dormant admin",
          detail: "Unused for 43 days",
          kind: "entry",
        },
        {
          id: "n2",
          label: "MFA bypass",
          detail: "Legacy exception remains active",
          kind: "identity",
        },
        {
          id: "n3",
          label: "Okta super admin",
          detail: "Global policy write access",
          kind: "identity",
        },
        {
          id: "n4",
          label: "SCIM token route",
          detail: "Can reset downstream access policy",
          kind: "control",
        },
        {
          id: "n5",
          label: "Payroll export vault",
          detail: "Stores HR export credentials",
          kind: "data",
        },
      ],
    },
    evidence: [
      { type: "identity", label: "Dormant privileged account", impactLabel: "+26" },
      { type: "control_gap", label: "MFA bypass policy", impactLabel: "+24" },
      { type: "data", label: "HR PII target", impactLabel: "+22" },
      { type: "reachability", label: "Remote admin portal path", impactLabel: "+19" },
    ],
    scoreFactors: [
      {
        label: "Exploitability",
        score: 85,
        description: "Credential-focused path with no second factor enforcement.",
      },
      {
        label: "Blast radius",
        score: 81,
        description: "Admin policy changes would affect workforce-wide identity flows.",
      },
      {
        label: "Business impact",
        score: 94,
        description: "Payroll and HR trust impact is immediate and executive visible.",
      },
      {
        label: "Control gap",
        score: 79,
        description: "Exception policy stayed alive after migration cutover.",
      },
    ],
    remediationSteps: [
      {
        id: "r1",
        title: "Disable the dormant super admin and force break-glass account rotation.",
        ownerHint: "Identity Foundation",
        reduction: 31,
      },
      {
        id: "r2",
        title: "Remove the MFA bypass policy and require phishing-resistant MFA for admin sign-in.",
        ownerHint: "Identity Foundation",
        reduction: 33,
      },
      {
        id: "r3",
        title: "Move payroll export credentials into a dedicated workload identity.",
        ownerHint: "Platform Core",
        reduction: 17,
      },
    ],
    controls: [
      {
        id: "c1",
        label: "Privileged access review",
        status: "partial",
        note: "Review cadence exists but did not catch dormant exception drift.",
      },
      {
        id: "c2",
        label: "SSO logging",
        status: "strong",
        note: "Strong for detection, not preventative for this path.",
      },
      {
        id: "c3",
        label: "Phishing-resistant MFA",
        status: "missing",
        note: "Required for standard admins but bypassed here.",
      },
    ],
    sourceSystems: ["Microsoft Exposure Management", "Okta export", "AWS Security Hub"],
    timeline: [
      {
        id: "exp104-1",
        timestamp: "2026-07-14T09:20:00Z",
        actor: "A. Rivera",
        action: "Owner notified",
        details: "Identity Foundation acknowledged the legacy bypass policy.",
      },
      {
        id: "exp104-2",
        timestamp: "2026-07-16T06:55:00Z",
        actor: "Chokepoint",
        action: "Path revalidated",
        details: "Dormant admin still has super admin reach with bypass active.",
      },
    ],
  },
  {
    id: "EXP-096",
    title: "Internet-exposed Jenkins can reach the artifact-signing key path",
    summary:
      "A legacy plugin chain leaves the release pipeline one step away from signing-key abuse. The issue is already in progress but still concentrates material deployment risk.",
    severity: "high",
    riskScore: 87,
    workflowState: "in_progress",
    ownerTeamId: "developer-platform",
    businessService: "Release Engineering",
    crownJewel: "Artifact signing key",
    dueDate: "2026-07-18",
    lastValidatedAt: "2026-07-16T05:40:00Z",
    findingCount: 9,
    targetType: "service",
    attackPath: {
      entryPoint: "Internet-facing Jenkins",
      chokePoint: "Legacy plugin admin",
      target: "Artifact signing service",
      simulationLabel: "Simulated build-system path. No malicious artifact observed.",
      nodes: [
        {
          id: "n1",
          label: "Jenkins edge",
          detail: "Legacy public maintenance endpoint",
          kind: "entry",
        },
        {
          id: "n2",
          label: "Plugin RCE chain",
          detail: "Reachable from the maintenance path",
          kind: "software",
        },
        {
          id: "n3",
          label: "Release admin",
          detail: "Can request artifact-signing jobs",
          kind: "identity",
        },
        {
          id: "n4",
          label: "Signing service",
          detail: "Trusted for production deploys",
          kind: "service",
        },
      ],
    },
    evidence: [
      { type: "reachability", label: "Public maintenance edge", impactLabel: "+24" },
      { type: "software", label: "Legacy plugin chain", impactLabel: "+25" },
      { type: "identity", label: "Release admin pivot", impactLabel: "+20" },
      { type: "control_gap", label: "Build system not isolated", impactLabel: "+18" },
    ],
    scoreFactors: [
      {
        label: "Exploitability",
        score: 83,
        description: "Known reachable plugin chain plus public maintenance path.",
      },
      {
        label: "Blast radius",
        score: 78,
        description: "Compromised signing could affect all deployment artifacts.",
      },
      {
        label: "Business impact",
        score: 88,
        description: "Release integrity affects customer trust and rollback burden.",
      },
      {
        label: "Control gap",
        score: 71,
        description: "The cleanup is underway but separation is not complete.",
      },
    ],
    remediationSteps: [
      {
        id: "r1",
        title: "Remove the internet-facing maintenance path and retire the plugin.",
        ownerHint: "Developer Platform",
        reduction: 34,
      },
      {
        id: "r2",
        title: "Move signing approvals to a separate workload identity with no Jenkins trust.",
        ownerHint: "Platform Core",
        reduction: 29,
      },
      {
        id: "r3",
        title: "Rotate the signing token after cutover completes.",
        ownerHint: "Developer Platform",
        reduction: 15,
      },
    ],
    controls: [
      {
        id: "c1",
        label: "Code review gates",
        status: "strong",
        note: "Protects source quality, not build-node compromise.",
      },
      {
        id: "c2",
        label: "Build network isolation",
        status: "partial",
        note: "Segmentation exists but the maintenance path crosses it.",
      },
      {
        id: "c3",
        label: "Signing key split trust",
        status: "missing",
        note: "Current service trust still allows Jenkins pathing.",
      },
    ],
    sourceSystems: ["Rapid7 Exposure Command", "GitHub owners", "Internal CMDB"],
    timeline: [
      {
        id: "exp096-1",
        timestamp: "2026-07-13T10:05:00Z",
        actor: "R. Gomez",
        action: "Fix started",
        details: "Plugin retirement and edge path closure added to sprint work.",
      },
      {
        id: "exp096-2",
        timestamp: "2026-07-16T05:40:00Z",
        actor: "Chokepoint",
        action: "Path revalidated",
        details: "Signing path persists until edge path is removed.",
      },
    ],
  },
  {
    id: "EXP-083",
    title: "Shared support role can jump from a staging snapshot into prod tenant tokens",
    summary:
      "A support convenience role bridges staging data and production tenant secrets. The blast radius is narrower than the top two missions but still exposes customer trust paths.",
    severity: "high",
    riskScore: 82,
    workflowState: "new",
    ownerTeamId: "unassigned",
    businessService: "Support Console",
    crownJewel: "Prod tenant session tokens",
    dueDate: "2026-07-20",
    lastValidatedAt: "2026-07-16T05:15:00Z",
    findingCount: 6,
    targetType: "data_store",
    attackPath: {
      entryPoint: "Shared support role",
      chokePoint: "SupportSnapshotRole",
      target: "Tenant session tokens",
      simulationLabel: "Simulated cross-environment pivot. No production token use observed.",
      nodes: [
        {
          id: "n1",
          label: "Support role",
          detail: "Shared by on-call support engineers",
          kind: "entry",
        },
        {
          id: "n2",
          label: "Staging snapshot",
          detail: "Contains masked but still linked tenant metadata",
          kind: "compute",
        },
        {
          id: "n3",
          label: "SupportSnapshotRole",
          detail: "Can read prod token path for troubleshooting",
          kind: "identity",
        },
        {
          id: "n4",
          label: "Tenant token store",
          detail: "Session and impersonation tokens",
          kind: "data",
        },
      ],
    },
    evidence: [
      { type: "identity", label: "Shared support identity", impactLabel: "+22" },
      { type: "control_gap", label: "Cross-env trust", impactLabel: "+20" },
      { type: "data", label: "Customer session tokens", impactLabel: "+24" },
      { type: "reachability", label: "Always-on support path", impactLabel: "+16" },
    ],
    scoreFactors: [
      {
        label: "Exploitability",
        score: 74,
        description: "Requires support-role misuse, but the path is always present.",
      },
      {
        label: "Blast radius",
        score: 76,
        description: "Could impact multiple tenants if the token path is abused.",
      },
      {
        label: "Business impact",
        score: 88,
        description: "Session-token exposure would be a severe trust event.",
      },
      {
        label: "Control gap",
        score: 73,
        description: "Debugging convenience outweighed environment separation.",
      },
    ],
    remediationSteps: [
      {
        id: "r1",
        title: "Replace shared support role with just-in-time per-user elevation.",
        ownerHint: "Trust Apps",
        reduction: 29,
      },
      {
        id: "r2",
        title: "Remove production token read from SupportSnapshotRole.",
        ownerHint: "Platform Core",
        reduction: 26,
      },
      {
        id: "r3",
        title: "Move staging troubleshooting to synthetic tenant records only.",
        ownerHint: "Trust Apps",
        reduction: 19,
      },
    ],
    controls: [
      {
        id: "c1",
        label: "Support access logging",
        status: "strong",
        note: "High-fidelity audit exists if the path is used.",
      },
      {
        id: "c2",
        label: "Per-user elevation",
        status: "missing",
        note: "Support still relies on a shared convenience role.",
      },
      {
        id: "c3",
        label: "Cross-environment boundaries",
        status: "partial",
        note: "Mostly present, except for the legacy troubleshooting read.",
      },
    ],
    sourceSystems: ["Tenable One", "Support CMDB", "Internal IAM diff"],
    timeline: [
      {
        id: "exp083-1",
        timestamp: "2026-07-15T14:05:00Z",
        actor: "Chokepoint",
        action: "Mission created",
        details: "Merged support-role, token-store, and staging snapshot findings.",
      },
    ],
  },
  {
    id: "EXP-061",
    title: "Legacy VPN appliance KEV path into the finance subnet has been closed",
    summary:
      "This mission shows the expected resolved state after a KEV-linked internet edge was patched, segmented, and revalidated.",
    severity: "high",
    riskScore: 73,
    workflowState: "resolved",
    ownerTeamId: "platform-core",
    businessService: "Network Edge",
    crownJewel: "Finance subnet",
    dueDate: "2026-07-10",
    lastValidatedAt: "2026-07-15T22:10:00Z",
    findingCount: 5,
    targetType: "network",
    attackPath: {
      entryPoint: "Legacy VPN appliance",
      chokePoint: "Internet VPN edge",
      target: "Finance subnet",
      simulationLabel: "Resolved mission. Path no longer reaches the finance subnet.",
      nodes: [
        {
          id: "n1",
          label: "Legacy VPN",
          detail: "Former internet edge",
          kind: "entry",
        },
        {
          id: "n2",
          label: "KEV vulnerability",
          detail: "Previously exploitable and on CISA KEV",
          kind: "control",
        },
        {
          id: "n3",
          label: "Finance subnet",
          detail: "Now blocked by segmentation change",
          kind: "network",
        },
      ],
    },
    evidence: [
      { type: "kev", label: "CISA KEV listed", impactLabel: "+28" },
      { type: "reachability", label: "Internet edge", impactLabel: "+21" },
      { type: "control_gap", label: "Legacy segmentation", impactLabel: "+18" },
    ],
    scoreFactors: [
      {
        label: "Exploitability",
        score: 77,
        description: "Urgent while open because the path was public and KEV-backed.",
      },
      {
        label: "Blast radius",
        score: 69,
        description: "Finance subnet access created high escalation potential.",
      },
      {
        label: "Business impact",
        score: 81,
        description: "Finance outage or compromise would be materially visible.",
      },
      {
        label: "Control gap",
        score: 52,
        description: "The fix removed the exploitable edge and tightened routing.",
      },
    ],
    remediationSteps: [
      {
        id: "r1",
        title: "Patch and retire the legacy VPN edge.",
        ownerHint: "Platform Core",
        reduction: 31,
      },
      {
        id: "r2",
        title: "Add subnet guardrail to block lateral movement from the VPN zone.",
        ownerHint: "Platform Core",
        reduction: 24,
      },
    ],
    controls: [
      {
        id: "c1",
        label: "Patch applied",
        status: "strong",
        note: "Validated on July 15.",
      },
      {
        id: "c2",
        label: "Subnet segmentation",
        status: "strong",
        note: "Finance subnet no longer reachable from the edge zone.",
      },
    ],
    sourceSystems: ["CISA KEV mirror", "Rapid7 Exposure Command"],
    timeline: [
      {
        id: "exp061-1",
        timestamp: "2026-07-12T18:20:00Z",
        actor: "M. Chen",
        action: "Resolved",
        details: "Patched VPN edge, rotated config, and blocked the finance route.",
      },
      {
        id: "exp061-2",
        timestamp: "2026-07-15T22:10:00Z",
        actor: "Chokepoint",
        action: "Revalidated closed",
        details: "Simulation no longer reaches the finance subnet.",
      },
    ],
  },
  {
    id: "EXP-039",
    title: "Research sandbox egress exception remains accepted with guardrails",
    summary:
      "This lower-priority path shows accepted risk. It remains visible because accepted exceptions need traceability and periodic review.",
    severity: "medium",
    riskScore: 42,
    workflowState: "accepted",
    ownerTeamId: "platform-core",
    businessService: "Research Sandbox",
    crownJewel: "Telemetry sink",
    dueDate: "2026-07-11",
    lastValidatedAt: "2026-07-15T16:45:00Z",
    findingCount: 3,
    targetType: "service",
    attackPath: {
      entryPoint: "Research sandbox",
      chokePoint: "Approved egress exception",
      target: "Telemetry sink",
      simulationLabel: "Accepted exception. Path is documented and bounded.",
      nodes: [
        {
          id: "n1",
          label: "Sandbox workload",
          detail: "Bounded research environment",
          kind: "compute",
        },
        {
          id: "n2",
          label: "Egress exception",
          detail: "Approved outbound route",
          kind: "control",
        },
        {
          id: "n3",
          label: "Telemetry sink",
          detail: "Low-sensitivity data only",
          kind: "service",
        },
      ],
    },
    evidence: [
      { type: "control_gap", label: "Approved exception", impactLabel: "+14" },
      { type: "reachability", label: "Restricted outbound path", impactLabel: "+11" },
      { type: "data", label: "Low-sensitivity telemetry", impactLabel: "+5" },
    ],
    scoreFactors: [
      {
        label: "Exploitability",
        score: 41,
        description: "Reachable but heavily bounded and low-value.",
      },
      {
        label: "Blast radius",
        score: 35,
        description: "Sandbox isolation limits lateral movement.",
      },
      {
        label: "Business impact",
        score: 28,
        description: "Telemetry sink holds no customer-secret material.",
      },
      {
        label: "Control gap",
        score: 52,
        description: "Exception is intentional but still requires review.",
      },
    ],
    remediationSteps: [
      {
        id: "r1",
        title: "Review the exception on the next quarterly sandbox audit.",
        ownerHint: "Platform Core",
        reduction: 9,
      },
    ],
    controls: [
      {
        id: "c1",
        label: "Approved exception record",
        status: "strong",
        note: "Exception approved and time-bounded.",
      },
      {
        id: "c2",
        label: "Sandbox isolation",
        status: "strong",
        note: "Traffic is confined to the telemetry sink path.",
      },
    ],
    sourceSystems: ["Internal exception register"],
    timeline: [
      {
        id: "exp039-1",
        timestamp: "2026-07-11T11:30:00Z",
        actor: "Security Lead",
        action: "Accepted exception",
        details: "Approved until next quarterly review because the sink is low sensitivity.",
      },
    ],
  },
]

export function buildSeedMissions(): ExposureMission[] {
  return structuredClone(MISSION_SEED)
}

export function buildInitialState(): PersistedDashboardState {
  return {
    version: STORAGE_VERSION,
    activeTab: "overview",
    activeFilter: "all",
    search: "",
    selectedMissionId: MISSION_SEED[0].id,
    missions: buildSeedMissions(),
  }
}

export function getOwnerTeam(teamId: string): OwnerTeam | undefined {
  return OWNER_TEAMS.find((team) => team.id === teamId)
}

export function isOpenWorkflowState(state: WorkflowState): boolean {
  return state === "new" || state === "notified" || state === "in_progress"
}

export function getSlaState(mission: ExposureMission) {
  if (!isOpenWorkflowState(mission.workflowState)) {
    return "closed"
  }

  if (mission.dueDate < DEMO_DATE) {
    return "breached"
  }

  if (mission.dueDate === DEMO_DATE) {
    return "due_today"
  }

  return "healthy"
}

export function sortMissions(missions: ExposureMission[]) {
  const stateRank = {
    breached: 0,
    due_today: 1,
    healthy: 2,
    closed: 3,
  } as const

  return [...missions].sort((left, right) => {
    const leftSla = stateRank[getSlaState(left)]
    const rightSla = stateRank[getSlaState(right)]

    if (leftSla !== rightSla) {
      return leftSla - rightSla
    }

    if (left.riskScore !== right.riskScore) {
      return right.riskScore - left.riskScore
    }

    return left.id.localeCompare(right.id)
  })
}
