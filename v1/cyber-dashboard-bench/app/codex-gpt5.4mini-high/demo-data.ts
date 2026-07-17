export type ExposureStatus =
  | "open"
  | "assigned"
  | "mitigating"
  | "resolved"
  | "suppressed"

export type Exposure = {
  id: string
  title: string
  asset: string
  environment: string
  team: string
  owner: string
  status: ExposureStatus
  source: string
  kev: boolean
  epss: number
  internetFacing: boolean
  criticality: number
  attackPathDepth: number
  ageDays: number
  dueInHours: number
  control: string
  cve: string
  blastRadius: string
  firstSeen: string
  lastSeen: string
  signals: string[]
  fixes: string[]
  summary: string
  history: Array<{
    at: string
    actor: string
    action: string
    detail: string
  }>
}

export type OwnerBacklog = {
  owner: string
  team: string
  open: number
  overdue: number
  nextDue: string
  theme: string
}

export type TrendPoint = {
  day: string
  open: number
  resolved: number
  risk: number
}

export const filterPills = [
  { id: "all", label: "All exposure" },
  { id: "kev", label: "KEV-linked" },
  { id: "internet", label: "Internet-facing" },
  { id: "unowned", label: "No owner" },
  { id: "breach", label: "SLA breach" },
  { id: "critical", label: "Critical only" },
] as const

export const ownerOptions = [
  "Unassigned",
  "Ava Chen",
  "Maya Patel",
  "Jonah Silva",
  "Noah Kim",
  "Elena Rossi",
  "Priya Iyer",
  "Theo Bennett",
] as const

export const baseExposures: Exposure[] = [
  {
    id: "exp-01",
    title: "Public payroll export bucket can be enumerated from the internet",
    asset: "s3://northstar-payroll-prod",
    environment: "AWS prod",
    team: "Data Platform",
    owner: "Unassigned",
    status: "open",
    source: "Cloud posture + attack surface",
    kev: true,
    epss: 0.94,
    internetFacing: true,
    criticality: 97,
    attackPathDepth: 4,
    ageDays: 12,
    dueInHours: -18,
    control: "External data storage exposure",
    cve: "CVE-2025-7419",
    blastRadius: "Customer payroll records, finance exports, and recovery snapshots",
    firstSeen: "2026-07-01T09:20:00.000Z",
    lastSeen: "2026-07-16T10:40:00.000Z",
    signals: ["KEV", "EPSS 94%", "Internet-facing", "No owner"],
    fixes: [
      "Block public ACLs and confirm bucket policy inheritance.",
      "Rotate the export delivery path to a signed internal transfer.",
      "Validate the bucket against the data classification policy.",
    ],
    summary:
      "This bucket combines active exploitation evidence with external reachability and a high-value data set.",
    history: [
      {
        at: "2026-07-16T08:15:00.000Z",
        actor: "Scanner",
        action: "Opened",
        detail: "New exposure import matched an internet-facing storage asset.",
      },
      {
        at: "2026-07-16T09:30:00.000Z",
        actor: "System",
        action: "Ranked",
        detail: "Composite score lifted by KEV membership and missing owner metadata.",
      },
    ],
  },
  {
    id: "exp-02",
    title: "VPN appliance management port remains reachable on the public edge",
    asset: "edge-vpn-2",
    environment: "Hybrid edge",
    team: "IT Ops",
    owner: "Theo Bennett",
    status: "assigned",
    source: "Network exposure + KEV",
    kev: true,
    epss: 0.88,
    internetFacing: true,
    criticality: 89,
    attackPathDepth: 3,
    ageDays: 6,
    dueInHours: 14,
    control: "Remote admin exposure",
    cve: "CVE-2025-6421",
    blastRadius: "Remote foothold into the employee identity network",
    firstSeen: "2026-07-10T11:00:00.000Z",
    lastSeen: "2026-07-16T09:55:00.000Z",
    signals: ["KEV", "EPSS 88%", "Internet-facing", "Assigned"],
    fixes: [
      "Remove public management access and restrict to bastion-only access.",
      "Confirm firmware patch and device reboot window.",
      "Attach the change record to the ticket before closure.",
    ],
    summary:
      "Public reachability plus KEV membership makes this a likely near-term intrusion path.",
    history: [
      {
        at: "2026-07-15T14:10:00.000Z",
        actor: "Aegis",
        action: "Assigned",
        detail: "The issue was routed to IT Ops with a 24-hour fix target.",
      },
    ],
  },
  {
    id: "exp-03",
    title: "GitHub Actions runner token can reach the production registry",
    asset: "gha-runner-east-1",
    environment: "CI/CD",
    team: "DevEx",
    owner: "Ava Chen",
    status: "mitigating",
    source: "Identity + pipeline graph",
    kev: false,
    epss: 0.72,
    internetFacing: false,
    criticality: 85,
    attackPathDepth: 5,
    ageDays: 9,
    dueInHours: 36,
    control: "Credential scope and build trust",
    cve: "CVE-2025-5530",
    blastRadius: "Unsigned artifacts can reach release infrastructure and container registry",
    firstSeen: "2026-07-07T12:00:00.000Z",
    lastSeen: "2026-07-16T08:20:00.000Z",
    signals: ["EPSS 72%", "Attack path depth 5", "Mitigating"],
    fixes: [
      "Reduce runner token scope to the build namespace.",
      "Rotate credentials and pin the registry trust boundary.",
      "Require review for deploy-tagged workflows.",
    ],
    summary:
      "This item is less obviously public, but the attack-path depth makes it highly actionable.",
    history: [
      {
        at: "2026-07-14T16:05:00.000Z",
        actor: "Aegis",
        action: "Mitigation started",
        detail: "DevEx accepted the change list and limited the runner credential scope.",
      },
    ],
  },
  {
    id: "exp-04",
    title: "Kubernetes dashboard is exposed to the shared operations network",
    asset: "prod-k8s-dashboard",
    environment: "GKE prod",
    team: "Platform Infra",
    owner: "Maya Patel",
    status: "open",
    source: "Cloud config + network exposure",
    kev: false,
    epss: 0.67,
    internetFacing: false,
    criticality: 91,
    attackPathDepth: 4,
    ageDays: 4,
    dueInHours: 60,
    control: "Internal admin exposure",
    cve: "CVE-2025-4982",
    blastRadius: "Cluster administration and workload secret access",
    firstSeen: "2026-07-12T10:10:00.000Z",
    lastSeen: "2026-07-16T09:05:00.000Z",
    signals: ["EPSS 67%", "Crown-jewel workload", "Shared network exposure"],
    fixes: [
      "Move the dashboard behind authenticated access.",
      "Bind the service to the admin subnet only.",
      "Confirm RBAC roles for cluster viewers.",
    ],
    summary:
      "The service is not public, but it sits close enough to privileged infrastructure to be worth immediate attention.",
    history: [
      {
        at: "2026-07-13T13:45:00.000Z",
        actor: "Scanner",
        action: "Opened",
        detail: "Shared-network reachability detected during the latest environment sweep.",
      },
    ],
  },
  {
    id: "exp-05",
    title: "Privileged IAM role can be escalated through wildcard object permissions",
    asset: "prod-ingest-role",
    environment: "AWS prod",
    team: "Identity",
    owner: "Priya Iyer",
    status: "assigned",
    source: "Identity graph + data path",
    kev: true,
    epss: 0.86,
    internetFacing: false,
    criticality: 96,
    attackPathDepth: 5,
    ageDays: 15,
    dueInHours: -4,
    control: "Privilege escalation path",
    cve: "CVE-2025-6114",
    blastRadius: "Write access to internal data lake and regulated reports",
    firstSeen: "2026-07-01T13:05:00.000Z",
    lastSeen: "2026-07-16T10:50:00.000Z",
    signals: ["KEV", "EPSS 86%", "Privileged path", "Overdue"],
    fixes: [
      "Replace wildcard object access with a constrained prefix policy.",
      "Review all sessions using the role in the last 7 days.",
      "Update the change record and re-run the policy test.",
    ],
    summary:
      "The exposure is not external, but it can unlock a regulated data path with very little friction.",
    history: [
      {
        at: "2026-07-14T10:00:00.000Z",
        actor: "Priya Iyer",
        action: "Accepted",
        detail: "Identity team acknowledged the escalation path and requested a review window.",
      },
    ],
  },
  {
    id: "exp-06",
    title: "Customer support SaaS admin account lacks MFA on a delegated role",
    asset: "support-admin-saas",
    environment: "SaaS",
    team: "Identity",
    owner: "Elena Rossi",
    status: "open",
    source: "Identity posture + SaaS export",
    kev: false,
    epss: 0.63,
    internetFacing: true,
    criticality: 83,
    attackPathDepth: 3,
    ageDays: 7,
    dueInHours: 22,
    control: "Identity assurance",
    cve: "CVE-2025-4471",
    blastRadius: "Customer support case data and account recovery workflows",
    firstSeen: "2026-07-09T15:25:00.000Z",
    lastSeen: "2026-07-16T08:55:00.000Z",
    signals: ["Internet-facing", "Identity gap", "High criticality"],
    fixes: [
      "Require MFA for the delegated admin role.",
      "Reissue the session tokens and audit recent logins.",
      "Document the exception if the vendor cannot enforce MFA.",
    ],
    summary:
      "This issue is a classic ownership-and-authentication gap that can be closed quickly if routed correctly.",
    history: [
      {
        at: "2026-07-15T09:15:00.000Z",
        actor: "Support Ops",
        action: "Flagged",
        detail: "The delegated role was confirmed as active during the support audit.",
      },
    ],
  },
  {
    id: "exp-07",
    title: "A container image retains a known vulnerable base layer, but is already patched downstream",
    asset: "api-service-image",
    environment: "Kubernetes",
    team: "AppSec",
    owner: "Noah Kim",
    status: "suppressed",
    source: "Container scan + policy exception",
    kev: false,
    epss: 0.27,
    internetFacing: false,
    criticality: 71,
    attackPathDepth: 2,
    ageDays: 28,
    dueInHours: 120,
    control: "False-positive or accepted risk",
    cve: "CVE-2025-3321",
    blastRadius: "Low because the vulnerable package is not reachable in runtime",
    firstSeen: "2026-06-18T08:00:00.000Z",
    lastSeen: "2026-07-15T12:30:00.000Z",
    signals: ["Suppressed", "Policy exception", "Low EPSS"],
    fixes: [
      "Keep the exception note linked to the build digest.",
      "Revisit on the next base-image refresh.",
      "Leave the runtime runtime path untouched unless the exposure changes.",
    ],
    summary:
      "This item exists so the queue can demonstrate a suppressed state with context, not as a fix priority.",
    history: [
      {
        at: "2026-07-11T17:30:00.000Z",
        actor: "AppSec",
        action: "Suppressed",
        detail: "The team accepted the risk because the vulnerable layer is not reachable at runtime.",
      },
    ],
  },
  {
    id: "exp-08",
    title: "Legacy bastion node still exposes SSH from the analytics subnet",
    asset: "bastion-analytics-legacy",
    environment: "AWS shared services",
    team: "Platform Infra",
    owner: "Maya Patel",
    status: "resolved",
    source: "Network exposure + change record",
    kev: false,
    epss: 0.15,
    internetFacing: false,
    criticality: 62,
    attackPathDepth: 2,
    ageDays: 20,
    dueInHours: 220,
    control: "Legacy access cleanup",
    cve: "CVE-2025-2104",
    blastRadius: "Limited to the shared analytics subnet after the change",
    firstSeen: "2026-06-26T16:10:00.000Z",
    lastSeen: "2026-07-14T14:40:00.000Z",
    signals: ["Resolved", "Change approved", "Low EPSS"],
    fixes: [
      "Keep the cleanup record attached for the next audit cycle.",
      "Verify the rule does not reappear in the next baseline import.",
      "Retire the node after the analytics cutover.",
    ],
    summary:
      "This item demonstrates a closed loop: the exposure has been cleaned up and should fall out of the active queue.",
    history: [
      {
        at: "2026-07-14T15:00:00.000Z",
        actor: "Maya Patel",
        action: "Resolved",
        detail: "The SSH rule was removed and the bastion was moved into retirement.",
      },
    ],
  },
]

export const trendSeries: TrendPoint[] = [
  { day: "Mon", open: 42, resolved: 11, risk: 88 },
  { day: "Tue", open: 39, resolved: 14, risk: 86 },
  { day: "Wed", open: 36, resolved: 19, risk: 83 },
  { day: "Thu", open: 34, resolved: 21, risk: 81 },
  { day: "Fri", open: 31, resolved: 24, risk: 79 },
  { day: "Sat", open: 29, resolved: 27, risk: 77 },
  { day: "Sun", open: 27, resolved: 30, risk: 74 },
]

export const signalCoverage = [
  { name: "KEV-linked", value: 3 },
  { name: "Internet-facing", value: 3 },
  { name: "No owner", value: 1 },
  { name: "Attack-path depth 4+", value: 3 },
  { name: "SLA breach", value: 2 },
] as const

export const ownerBacklogSeed: OwnerBacklog[] = [
  {
    owner: "Theo Bennett",
    team: "IT Ops",
    open: 1,
    overdue: 0,
    nextDue: "Today",
    theme: "Edge hardening",
  },
  {
    owner: "Ava Chen",
    team: "DevEx",
    open: 1,
    overdue: 0,
    nextDue: "Tomorrow",
    theme: "Build trust",
  },
  {
    owner: "Maya Patel",
    team: "Platform Infra",
    open: 2,
    overdue: 0,
    nextDue: "In 3 days",
    theme: "Network exposure",
  },
  {
    owner: "Priya Iyer",
    team: "Identity",
    open: 1,
    overdue: 1,
    nextDue: "Past due",
    theme: "Privilege control",
  },
  {
    owner: "Elena Rossi",
    team: "Identity",
    open: 1,
    overdue: 0,
    nextDue: "In 22h",
    theme: "MFA enforcement",
  },
  {
    owner: "Noah Kim",
    team: "AppSec",
    open: 0,
    overdue: 0,
    nextDue: "Closed",
    theme: "Exception management",
  },
]

