export type ExposureStatus =
  | "queued"
  | "active"
  | "verification"
  | "mitigated"
  | "snoozed"

export type Exposure = {
  id: string
  title: string
  service: string
  owner: string
  environment: "prod" | "hybrid" | "identity"
  severity: "Critical" | "High" | "Medium"
  score: number
  blastRadius: number
  assetCount: number
  attackPaths: number
  ageDays: number
  exploitSignal: string
  rationale: string[]
  controls: string[]
  fixPlan: string[]
  path: string[]
  status: ExposureStatus
  dueLabel: string
}

export type Campaign = {
  id: string
  exposureId: string
  title: string
  owner: string
  dueLabel: string
  state: "active" | "verification" | "done"
  tasksCompleted: number
  tasksTotal: number
  projectedReduction: number
  updatedAt: string
}

export type ActivityItem = {
  id: string
  actor: string
  action: string
  target: string
  timestamp: string
}

export const exposures: Exposure[] = [
  {
    id: "EXP-219",
    title: "Public build runner can pivot into payment production VPC",
    service: "Payments API",
    owner: "Cloud Platform",
    environment: "prod",
    severity: "Critical",
    score: 96,
    blastRadius: 6,
    assetCount: 14,
    attackPaths: 4,
    ageDays: 11,
    exploitSignal: "KEV-linked container escape chain",
    rationale: [
      "Internet-reachable runner",
      "Crown-jewel service dependency",
      "Privileged IAM role chained to prod subnet",
    ],
    controls: ["WAF present", "No workload isolation", "MFA on console only"],
    fixPlan: [
      "Rotate runner role and remove wildcard assume-role path",
      "Move runner to isolated build subnet",
      "Block east-west route to payment admin plane",
    ],
    path: ["Public Git runner", "Artifact token", "CI role", "Prod VPC peering", "Payments admin host"],
    status: "queued",
    dueLabel: "Due in 48h",
  },
  {
    id: "EXP-184",
    title: "Dormant Okta admin group opens path to data warehouse",
    service: "Analytics Lake",
    owner: "Identity Security",
    environment: "identity",
    severity: "Critical",
    score: 91,
    blastRadius: 5,
    assetCount: 9,
    attackPaths: 3,
    ageDays: 23,
    exploitSignal: "Privilege escalation path validated",
    rationale: [
      "Stale admin membership",
      "Warehouse tied to executive reporting",
      "Blast radius spans BI and finance",
    ],
    controls: ["Conditional access enabled", "No quarterly entitlement review"],
    fixPlan: [
      "Remove dormant group grants",
      "Enforce access review on admin groups",
      "Split finance warehouse role from broad analyst role",
    ],
    path: ["Phished workforce account", "Dormant Okta admin group", "Warehouse admin role", "Finance dashboards"],
    status: "active",
    dueLabel: "Breached SLA",
  },
  {
    id: "EXP-143",
    title: "Legacy VPN appliance exposes unpatched edge path to domain trust",
    service: "Corp Identity",
    owner: "Network Security",
    environment: "hybrid",
    severity: "Critical",
    score: 88,
    blastRadius: 7,
    assetCount: 22,
    attackPaths: 5,
    ageDays: 6,
    exploitSignal: "Actively scanned externally",
    rationale: [
      "External exposure confirmed",
      "Shared auth path with identity backbone",
      "No compensating segmentation",
    ],
    controls: ["EDR on jump hosts", "Patch deferred to weekend window"],
    fixPlan: [
      "Patch edge appliance",
      "Constrain trust path to jump segment",
      "Add temporary geo restriction until patch verified",
    ],
    path: ["Internet", "VPN appliance", "AD trust bridge", "Admin jump host", "Identity backbone"],
    status: "verification",
    dueLabel: "Verify by today",
  },
  {
    id: "EXP-101",
    title: "Kubernetes secret reuse allows lateral move into support tooling",
    service: "Support Console",
    owner: "Application Security",
    environment: "prod",
    severity: "High",
    score: 74,
    blastRadius: 3,
    assetCount: 7,
    attackPaths: 2,
    ageDays: 17,
    exploitSignal: "No active exploitation seen",
    rationale: [
      "Shared secret across workloads",
      "Support agents can reach customer data workflows",
      "Fix package is low effort",
    ],
    controls: ["Namespace policies in place", "Secret rotation overdue"],
    fixPlan: [
      "Rotate shared secret",
      "Adopt workload-specific service accounts",
      "Add secret age policy alerting",
    ],
    path: ["Compromised pod", "Shared secret", "Support service account", "Support console"],
    status: "queued",
    dueLabel: "Due this week",
  },
  {
    id: "EXP-077",
    title: "Third-party S3 bucket exposure already mitigated by block policy",
    service: "Marketing Assets",
    owner: "Cloud Platform",
    environment: "prod",
    severity: "Medium",
    score: 32,
    blastRadius: 1,
    assetCount: 2,
    attackPaths: 0,
    ageDays: 4,
    exploitSignal: "Suppressed by compensating control",
    rationale: [
      "Public ACL flagged by scanner",
      "Account-level public block prevents exploitation",
      "No crown-jewel linkage",
    ],
    controls: ["S3 public block enforced", "Read-only bucket policy"],
    fixPlan: [
      "Clean ACL finding at source scanner",
      "Keep bucket in monthly hygiene batch",
    ],
    path: ["Third-party sync bucket", "Account public block"],
    status: "snoozed",
    dueLabel: "Suppressed",
  },
]

export const campaigns: Campaign[] = [
  {
    id: "CMP-31",
    exposureId: "EXP-184",
    title: "Identity choke point hardening",
    owner: "Nina Patel",
    dueLabel: "Jul 18",
    state: "active",
    tasksCompleted: 2,
    tasksTotal: 4,
    projectedReduction: 31,
    updatedAt: "8m ago",
  },
  {
    id: "CMP-29",
    exposureId: "EXP-143",
    title: "VPN edge patch and segmentation verify",
    owner: "Luis Romero",
    dueLabel: "Today",
    state: "verification",
    tasksCompleted: 3,
    tasksTotal: 3,
    projectedReduction: 22,
    updatedAt: "21m ago",
  },
]

export const activity: ActivityItem[] = [
  {
    id: "ACT-1",
    actor: "Nina Patel",
    action: "moved campaign to active",
    target: "Identity choke point hardening",
    timestamp: "08:42",
  },
  {
    id: "ACT-2",
    actor: "Luis Romero",
    action: "submitted verification note",
    target: "VPN edge patch and segmentation verify",
    timestamp: "08:26",
  },
  {
    id: "ACT-3",
    actor: "Strata demo",
    action: "suppressed low-confidence finding",
    target: "EXP-077",
    timestamp: "Yesterday",
  },
]
