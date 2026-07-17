export type ActionTier = "Immediate" | "Attend" | "Scheduled"

export type WorkflowStatus =
  | "New"
  | "Assigned"
  | "In progress"
  | "Fixed"
  | "Accepted"

export type SignalTone = "danger" | "warning" | "good" | "info" | "neutral"

export type PathNodeKind = "entry" | "exposure" | "identity" | "asset" | "impact"

export type ExposurePackage = {
  id: string
  rank: number
  title: string
  businessService: string
  environment: string
  actionTier: ActionTier
  defaultStatus: WorkflowStatus
  defaultOwner: string
  ownerOptions: string[]
  score: number
  riskDelta: number
  dueDate: string
  lastSeen: string
  confidence: number
  summary: string
  recommendedFix: string
  validationPlan: string
  compensatingControl: string
  signals: {
    kev: boolean
    epss: number | null
    cvss: number | null
    external: boolean
    assetCriticality: number
    paths: number
    chokePoint: boolean
    identityReach: string
  }
  blastRadius: {
    services: number
    assets: number
    identities: number
    records: string
  }
  tags: string[]
  evidence: Array<{
    label: string
    value: string
    tone: SignalTone
  }>
  path: Array<{
    label: string
    meta: string
    kind: PathNodeKind
  }>
  pathEdges: string[]
  attackTechniques: string[]
  timeline: Array<{
    time: string
    event: string
  }>
}

export const demoExposures: ExposurePackage[] = [
  {
    id: "EDGE-001",
    rank: 1,
    title: "Public ADC KEV path to payment identity store",
    businessService: "Checkout and billing",
    environment: "Production edge",
    actionTier: "Immediate",
    defaultStatus: "New",
    defaultOwner: "Network Edge",
    ownerOptions: ["Network Edge", "Identity Platform", "Payments SRE"],
    score: 96,
    riskDelta: 34,
    dueDate: "2026-07-18",
    lastSeen: "18 min ago",
    confidence: 94,
    summary:
      "An internet-facing application delivery controller matches a known-exploited vulnerability and has a validated path to the privileged payment identity store.",
    recommendedFix:
      "Apply vendor mitigation on the ADC pair, rotate the bound service account token, and verify the edge policy blocks legacy management traffic.",
    validationPlan:
      "Re-scan the ADC, confirm the management interface is unreachable externally, and verify no active sessions remain for the rotated service account.",
    compensatingControl:
      "If patching waits for the maintenance window, restrict management traffic to the bastion CIDR and disable token reuse on the service account.",
    signals: {
      kev: true,
      epss: 0.94,
      cvss: 9.8,
      external: true,
      assetCriticality: 9,
      paths: 18,
      chokePoint: true,
      identityReach: "Privileged service account reaches payment vault",
    },
    blastRadius: {
      services: 4,
      assets: 37,
      identities: 12,
      records: "3.8M payment records",
    },
    tags: ["KEV", "External", "Identity path", "Choke point"],
    evidence: [
      { label: "CISA KEV", value: "Listed", tone: "danger" },
      { label: "EPSS", value: "94%", tone: "danger" },
      { label: "CVSS", value: "9.8 critical", tone: "warning" },
      { label: "Asset tier", value: "Tier 0", tone: "danger" },
      { label: "Source freshness", value: "18 min", tone: "good" },
    ],
    path: [
      { label: "Internet", meta: "443 open", kind: "entry" },
      { label: "ADC pair", meta: "Known exploited CVE", kind: "exposure" },
      { label: "Svc-pay-sync", meta: "Reusable token", kind: "identity" },
      { label: "Payment vault", meta: "Tier 0", kind: "asset" },
      { label: "Checkout outage", meta: "Revenue impact", kind: "impact" },
    ],
    pathEdges: ["Exploit", "Steal token", "Read vault", "Disrupt"],
    attackTechniques: [
      "Initial Access: Exploit Public-Facing Application",
      "Credential Access: Steal Application Access Token",
      "Impact: Service Stop",
    ],
    timeline: [
      { time: "08:12", event: "External reachability confirmed by ASM scan" },
      { time: "08:19", event: "KEV match enriched from threat intel feed" },
      { time: "08:26", event: "Identity graph found reusable token path" },
    ],
  },
  {
    id: "ID-014",
    rank: 2,
    title: "Dormant OAuth admin app reaches finance workspace",
    businessService: "Finance close",
    environment: "SaaS identity",
    actionTier: "Immediate",
    defaultStatus: "New",
    defaultOwner: "Identity Platform",
    ownerOptions: ["Identity Platform", "Finance Apps", "Security Engineering"],
    score: 89,
    riskDelta: 27,
    dueDate: "2026-07-19",
    lastSeen: "41 min ago",
    confidence: 88,
    summary:
      "A dormant OAuth application has admin consent, stale credentials, and delegated access to finance files that support month-end close.",
    recommendedFix:
      "Revoke admin consent, rotate the app credential, and require owner re-attestation before the app can request finance scopes again.",
    validationPlan:
      "Confirm the app cannot enumerate finance workspace files and that no active refresh tokens remain.",
    compensatingControl:
      "Conditional access block on the application while finance validates whether the integration is still required.",
    signals: {
      kev: false,
      epss: null,
      cvss: null,
      external: false,
      assetCriticality: 8,
      paths: 11,
      chokePoint: true,
      identityReach: "Admin consent grants finance file read/write",
    },
    blastRadius: {
      services: 2,
      assets: 19,
      identities: 44,
      records: "FY26 close package",
    },
    tags: ["Identity", "SaaS", "Dormant app", "Choke point"],
    evidence: [
      { label: "Consent age", value: "411 days", tone: "warning" },
      { label: "Credential age", value: "386 days", tone: "warning" },
      { label: "Owner", value: "Unconfirmed", tone: "danger" },
      { label: "Finance scope", value: "Read/write", tone: "danger" },
      { label: "Source freshness", value: "41 min", tone: "good" },
    ],
    path: [
      { label: "Stale app secret", meta: "No owner", kind: "entry" },
      { label: "OAuth admin app", meta: "Admin consent", kind: "identity" },
      { label: "Finance workspace", meta: "Read/write", kind: "asset" },
      { label: "Close package", meta: "Sensitive", kind: "impact" },
    ],
    pathEdges: ["Reuse", "Consent grants", "Modify"],
    attackTechniques: [
      "Credential Access: Unsecured Credentials",
      "Persistence: Valid Accounts",
      "Collection: Data from Cloud Storage",
    ],
    timeline: [
      { time: "07:44", event: "Identity inventory marked app inactive" },
      { time: "07:59", event: "Finance workspace scope discovered" },
      { time: "08:31", event: "Owner attestation expired" },
    ],
  },
  {
    id: "CLOUD-022",
    rank: 3,
    title: "Public artifact bucket exposes deploy key material",
    businessService: "Developer platform",
    environment: "AWS production tooling",
    actionTier: "Attend",
    defaultStatus: "Assigned",
    defaultOwner: "Platform Engineering",
    ownerOptions: ["Platform Engineering", "Developer Experience", "Security Engineering"],
    score: 82,
    riskDelta: 22,
    dueDate: "2026-07-23",
    lastSeen: "1 hr ago",
    confidence: 91,
    summary:
      "A public bucket contains historical CI artifacts with deploy key fragments that can be combined with a permissive role trust policy.",
    recommendedFix:
      "Make the bucket private, purge exposed artifacts, rotate deploy keys, and tighten role trust to the current CI provider identity.",
    validationPlan:
      "Confirm public access block is enabled, verify rotated keys are active, and run a cloud identity simulation against the CI role.",
    compensatingControl:
      "Temporarily deny all object reads except from the current CI role while artifact owners confirm retention requirements.",
    signals: {
      kev: false,
      epss: null,
      cvss: null,
      external: true,
      assetCriticality: 7,
      paths: 9,
      chokePoint: true,
      identityReach: "Deploy role can push to production cluster",
    },
    blastRadius: {
      services: 5,
      assets: 28,
      identities: 7,
      records: "Build secrets",
    },
    tags: ["Cloud", "Secrets", "External", "CI/CD"],
    evidence: [
      { label: "Public read", value: "Confirmed", tone: "danger" },
      { label: "Secret pattern", value: "Deploy key", tone: "danger" },
      { label: "Role trust", value: "Broad", tone: "warning" },
      { label: "Asset tier", value: "Tier 1", tone: "warning" },
      { label: "Source freshness", value: "1 hr", tone: "good" },
    ],
    path: [
      { label: "Public bucket", meta: "Artifact history", kind: "entry" },
      { label: "Deploy key", meta: "Recoverable", kind: "exposure" },
      { label: "CI deploy role", meta: "Broad trust", kind: "identity" },
      { label: "Prod cluster", meta: "Tier 1", kind: "asset" },
      { label: "Pipeline takeover", meta: "Integrity risk", kind: "impact" },
    ],
    pathEdges: ["Download", "Combine", "Assume", "Deploy"],
    attackTechniques: [
      "Credential Access: Unsecured Credentials",
      "Lateral Movement: Cloud Service Dashboard",
      "Impact: Data Manipulation",
    ],
    timeline: [
      { time: "06:58", event: "Cloud posture found public object listing" },
      { time: "07:04", event: "Secret detector matched deploy key fragment" },
      { time: "07:20", event: "IAM simulator found production deploy route" },
    ],
  },
  {
    id: "WEB-104",
    rank: 4,
    title: "Partner upload service retains exploitable Log4j package",
    businessService: "Partner intake",
    environment: "Kubernetes production",
    actionTier: "Attend",
    defaultStatus: "New",
    defaultOwner: "Partner Apps",
    ownerOptions: ["Partner Apps", "Platform Engineering", "Security Engineering"],
    score: 78,
    riskDelta: 18,
    dueDate: "2026-07-26",
    lastSeen: "2 hr ago",
    confidence: 79,
    summary:
      "Runtime inventory still observes a vulnerable logging package in the partner upload service. External reachability is blocked, but partner VPN ingress can reach the workload.",
    recommendedFix:
      "Upgrade the base image, redeploy the upload service, and remove the temporary JNDI mitigation after validation.",
    validationPlan:
      "Confirm package inventory no longer reports the vulnerable library and replay the partner VPN reachability test.",
    compensatingControl:
      "Keep egress deny rules and JNDI mitigation active until the upgraded image is running in every production replica.",
    signals: {
      kev: true,
      epss: 0.97,
      cvss: 10,
      external: false,
      assetCriticality: 6,
      paths: 6,
      chokePoint: false,
      identityReach: "Workload service account can write partner archive",
    },
    blastRadius: {
      services: 1,
      assets: 14,
      identities: 3,
      records: "Partner file archive",
    },
    tags: ["KEV", "Runtime", "Partner VPN", "Image update"],
    evidence: [
      { label: "CISA KEV", value: "Listed", tone: "danger" },
      { label: "EPSS", value: "97%", tone: "danger" },
      { label: "External", value: "Blocked", tone: "good" },
      { label: "Runtime", value: "Observed", tone: "warning" },
      { label: "Source freshness", value: "2 hr", tone: "good" },
    ],
    path: [
      { label: "Partner VPN", meta: "Restricted ingress", kind: "entry" },
      { label: "Upload API", meta: "Vulnerable package", kind: "exposure" },
      { label: "Workload SA", meta: "Archive write", kind: "identity" },
      { label: "Partner archive", meta: "Tier 2", kind: "asset" },
    ],
    pathEdges: ["Reach", "Exploit", "Write"],
    attackTechniques: [
      "Initial Access: Exploit Public-Facing Application",
      "Persistence: Server Software Component",
      "Collection: Data from Information Repositories",
    ],
    timeline: [
      { time: "05:52", event: "Runtime inventory detected vulnerable package" },
      { time: "06:20", event: "External ASM confirms public block" },
      { time: "06:47", event: "Partner VPN path remains reachable" },
    ],
  },
  {
    id: "END-238",
    rank: 5,
    title: "Privileged VPN client fleet misses local escalation patch",
    businessService: "Remote workforce",
    environment: "Managed endpoints",
    actionTier: "Scheduled",
    defaultStatus: "New",
    defaultOwner: "Endpoint Operations",
    ownerOptions: ["Endpoint Operations", "IT Service Desk", "Security Engineering"],
    score: 64,
    riskDelta: 13,
    dueDate: "2026-08-02",
    lastSeen: "3 hr ago",
    confidence: 83,
    summary:
      "A subset of privileged admin laptops is missing a VPN client patch for local escalation. Exploitation requires local access, but the users administer production systems.",
    recommendedFix:
      "Pilot the VPN client update with the admin cohort, then enforce the patch through device management before the next remote maintenance window.",
    validationPlan:
      "Confirm patched version across the privileged device group and verify no failed update rollbacks remain.",
    compensatingControl:
      "Require step-up authentication for privileged remote sessions until all admin endpoints are patched.",
    signals: {
      kev: false,
      epss: 0.34,
      cvss: 7.8,
      external: false,
      assetCriticality: 7,
      paths: 3,
      chokePoint: false,
      identityReach: "Admin devices can reach production jump hosts",
    },
    blastRadius: {
      services: 3,
      assets: 21,
      identities: 18,
      records: "Privileged endpoint group",
    },
    tags: ["Endpoint", "Privileged users", "Patch"],
    evidence: [
      { label: "EPSS", value: "34%", tone: "neutral" },
      { label: "CVSS", value: "7.8 high", tone: "warning" },
      { label: "Exploit", value: "Local access", tone: "neutral" },
      { label: "Admin cohort", value: "18 users", tone: "warning" },
      { label: "Source freshness", value: "3 hr", tone: "good" },
    ],
    path: [
      { label: "Admin laptop", meta: "Unpatched VPN", kind: "entry" },
      { label: "Local privilege", meta: "Escalation", kind: "exposure" },
      { label: "Jump host", meta: "Privileged", kind: "identity" },
      { label: "Prod admin", meta: "Tier 1", kind: "asset" },
    ],
    pathEdges: ["Exploit", "Elevate", "Administer"],
    attackTechniques: [
      "Privilege Escalation: Exploitation for Privilege Escalation",
      "Lateral Movement: Remote Services",
      "Persistence: Valid Accounts",
    ],
    timeline: [
      { time: "04:39", event: "Endpoint inventory found outdated VPN client" },
      { time: "05:12", event: "Privileged device tag applied from CMDB" },
      { time: "06:10", event: "Patch ring scheduled for admin pilot" },
    ],
  },
]

export const riskTrend = [
  { day: "Jul 10", actual: 141, planned: 141 },
  { day: "Jul 11", actual: 136, planned: 132 },
  { day: "Jul 12", actual: 133, planned: 123 },
  { day: "Jul 13", actual: 128, planned: 111 },
  { day: "Jul 14", actual: 122, planned: 103 },
  { day: "Jul 15", actual: 116, planned: 92 },
  { day: "Jul 16", actual: 114, planned: 86 },
]

export const ownerBaselines = [
  { team: "Network Edge", load: 78, openRisk: 34 },
  { team: "Identity Platform", load: 66, openRisk: 27 },
  { team: "Platform Engineering", load: 72, openRisk: 22 },
  { team: "Partner Apps", load: 52, openRisk: 18 },
  { team: "Endpoint Operations", load: 46, openRisk: 13 },
]

export const sourceFreshness = [
  { source: "Vulnerability scanner", status: "Fresh", age: "18 min" },
  { source: "Cloud posture", status: "Fresh", age: "1 hr" },
  { source: "Identity graph", status: "Fresh", age: "41 min" },
  { source: "Business service catalog", status: "Stale", age: "2 days" },
  { source: "ITSM sync", status: "Demo stub", age: "local only" },
]

