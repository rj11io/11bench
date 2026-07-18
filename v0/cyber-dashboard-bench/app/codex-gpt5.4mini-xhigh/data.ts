export type Surface = "cloud" | "identity" | "endpoint" | "edge" | "saas"
export type ExposureStatus =
  | "open"
  | "planned"
  | "in_progress"
  | "accepted"
  | "resolved"
export type Lens = "all" | "critical" | "due_soon" | "unowned" | "accepted" | "resolved"
export type SortMode = "priority" | "risk" | "due" | "owner"

export type TimelineEntry = {
  when: string
  label: string
}

export type NoteEntry = {
  id: string
  author: string
  when: string
  body: string
}

export type ScoreDriver = {
  label: string
  value: number
}

export type Exposure = {
  id: string
  title: string
  asset: string
  businessUnit: string
  owner: string
  surface: Surface
  source: string
  severity: "critical" | "high" | "medium"
  status: ExposureStatus
  riskScore: number
  dueDays: number
  sourceTag: string
  summary: string
  rationale: string[]
  evidence: string[]
  attackPath: string[]
  actions: string[]
  scoreDrivers: ScoreDriver[]
  timeline: TimelineEntry[]
  tags: string[]
}

export type WorkspaceState = {
  lens: Lens
  surface: Surface | "all"
  sort: SortMode
  search: string
  selectedId: string
  ownerOverrides: Record<string, string>
  statusOverrides: Record<string, ExposureStatus>
  notes: Record<string, NoteEntry[]>
}

export const surfaceOptions: Array<{
  value: Surface | "all"
  label: string
}> = [
  { value: "all", label: "All" },
  { value: "cloud", label: "Cloud" },
  { value: "identity", label: "Identity" },
  { value: "edge", label: "Edge" },
  { value: "endpoint", label: "Endpoint" },
  { value: "saas", label: "SaaS" },
]

export const lensOptions: Array<{
  value: Lens
  label: string
  tone: "slate" | "amber" | "rose" | "emerald"
}> = [
  { value: "all", label: "All items", tone: "slate" },
  { value: "critical", label: "Critical", tone: "rose" },
  { value: "due_soon", label: "Due soon", tone: "amber" },
  { value: "unowned", label: "Unowned", tone: "amber" },
  { value: "accepted", label: "Accepted", tone: "emerald" },
  { value: "resolved", label: "Resolved", tone: "emerald" },
]

export const sortOptions: Array<{
  value: SortMode
  label: string
}> = [
  { value: "priority", label: "Priority" },
  { value: "risk", label: "Risk score" },
  { value: "due", label: "Due date" },
  { value: "owner", label: "Owner" },
]

export const workflowStages = [
  {
    label: "Discovered",
    value: 382,
    accent: "cyan",
    description: "Assets and exposures normalized from scanners and CMDB.",
  },
  {
    label: "Prioritized",
    value: 47,
    accent: "amber",
    description: "Findings in the active weekly review queue.",
  },
  {
    label: "Validated",
    value: 18,
    accent: "emerald",
    description: "Issues with attack-path, exploitability, or ownership evidence.",
  },
  {
    label: "Mobilized",
    value: 9,
    accent: "rose",
    description: "Tasks assigned and moving through remediation.",
  },
] as const

export const exposureTrend = [
  { label: "Wk 1", score: 88, critical: 5, accepted: 2 },
  { label: "Wk 2", score: 86, critical: 5, accepted: 2 },
  { label: "Wk 3", score: 84, critical: 4, accepted: 3 },
  { label: "Wk 4", score: 81, critical: 4, accepted: 3 },
  { label: "Wk 5", score: 80, critical: 4, accepted: 4 },
  { label: "Wk 6", score: 78, critical: 3, accepted: 4 },
  { label: "Wk 7", score: 75, critical: 3, accepted: 5 },
  { label: "Wk 8", score: 72, critical: 3, accepted: 5 },
]

export const exposures: Exposure[] = [
  {
    id: "payroll-api",
    title: "Payroll API accepts a legacy auth bypass on the public edge",
    asset: "payroll-api.prod.example.com",
    businessUnit: "Finance Systems",
    owner: "Unassigned",
    surface: "cloud",
    source: "CrowdStrike Falcon Exposure Management",
    severity: "critical",
    status: "open",
    riskScore: 96,
    dueDays: 2,
    sourceTag: "attack path",
    summary:
      "The API is internet-facing, sits on a payment workflow, and chains into a database that also serves finance exports.",
    rationale: [
      "Internet-facing asset with no owner mapped",
      "Exploit path reaches payroll data within two hops",
      "Active exploit pattern surfaced by the source feed",
    ],
    evidence: [
      "Exposed on port 443 with no compensating proxy",
      "CISA KEV correlation matched the adjacent edge service",
      "No asset owner in CMDB; ticket ownership is blocked",
    ],
    attackPath: [
      "Public API endpoint",
      "Auth bypass into service account",
      "Payroll database read access",
      "Sensitive payroll export",
    ],
    actions: [
      "Block unauthenticated requests at the edge",
      "Patch the gateway service and rotate credentials",
      "Assign owner before Friday's review",
    ],
    scoreDrivers: [
      { label: "Exploitability", value: 42 },
      { label: "Business impact", value: 30 },
      { label: "Exposure", value: 16 },
      { label: "SLA pressure", value: 12 },
    ],
    timeline: [
      { when: "08:10", label: "Imported from edge exposure feed" },
      { when: "08:21", label: "Matched to payroll data path" },
      { when: "09:05", label: "Queued for CISO review" },
    ],
    tags: ["KEV", "internet-facing", "no owner", "crown jewel"],
  },
  {
    id: "edge-gateway",
    title: "Remote access gateway appears in the KEV catalog",
    asset: "edge-gateway-04",
    businessUnit: "Core Infrastructure",
    owner: "Network Operations",
    surface: "edge",
    source: "Tenable Exposure Management",
    severity: "critical",
    status: "planned",
    riskScore: 93,
    dueDays: 1,
    sourceTag: "known exploited",
    summary:
      "The gateway is stable but vulnerable, with an operational workaround in place and a fixed maintenance window tomorrow morning.",
    rationale: [
      "Known exploited vulnerability with a fixed due date",
      "Edge appliance protects several internal applications",
      "Patch window is the only safe remediation path",
    ],
    evidence: [
      "KEV entry added this week",
      "Appliance still exposes admin interface externally",
      "Maintenance owner already approved the patch plan",
    ],
    attackPath: [
      "External admin portal",
      "Session token theft",
      "Privileged VPN foothold",
      "Internal application network",
    ],
    actions: [
      "Apply vendor patch during maintenance window",
      "Disable direct admin access until validated",
      "Run a post-patch verification scan",
    ],
    scoreDrivers: [
      { label: "Exploitability", value: 40 },
      { label: "Business impact", value: 24 },
      { label: "Exposure", value: 20 },
      { label: "SLA pressure", value: 16 },
    ],
    timeline: [
      { when: "09:18", label: "Detected in daily KEV sync" },
      { when: "09:40", label: "Mapped to Network Operations" },
      { when: "10:12", label: "Planned for next maintenance window" },
    ],
    tags: ["KEV", "edge", "maintenance", "owned"],
  },
  {
    id: "finance-bucket",
    title: "Finance export bucket is publicly reachable through a stale policy",
    asset: "s3://fin-export-archive",
    businessUnit: "Finance",
    owner: "Platform Security",
    surface: "cloud",
    source: "Wiz Security Graph",
    severity: "critical",
    status: "open",
    riskScore: 91,
    dueDays: 4,
    sourceTag: "public exposure",
    summary:
      "The bucket holds monthly exports and a stale allow policy exposes it outside the business boundary.",
    rationale: [
      "Sensitive data lives in a reachable cloud bucket",
      "Attack path crosses from public exposure into finance exports",
      "The bucket is a crown-jewel system with no short-term exception",
    ],
    evidence: [
      "Policy still allows wildcard access from legacy analytics",
      "Classification labels mark the data as finance confidential",
      "Wiz issue correlates public exposure with sensitive data access",
    ],
    attackPath: [
      "Public bucket policy",
      "Object listing",
      "Finance export download",
      "PII exposure",
    ],
    actions: [
      "Tighten bucket policy and remove wildcard access",
      "Confirm no workflows depend on anonymous reads",
      "Notify Finance owner and attach evidence",
    ],
    scoreDrivers: [
      { label: "Exploitability", value: 35 },
      { label: "Business impact", value: 33 },
      { label: "Exposure", value: 18 },
      { label: "SLA pressure", value: 14 },
    ],
    timeline: [
      { when: "08:33", label: "Correlated with finance data classification" },
      { when: "08:56", label: "No approved exception found" },
      { when: "09:22", label: "Queued for remediation packet" },
    ],
    tags: ["public", "finance", "crown jewel", "cloud"],
  },
  {
    id: "entra-service-account",
    title: "Service account has excessive Graph permissions",
    asset: "svc-mail-export@corp.example",
    businessUnit: "Identity Engineering",
    owner: "IAM",
    surface: "identity",
    source: "Microsoft Exposure Management",
    severity: "high",
    status: "in_progress",
    riskScore: 84,
    dueDays: 6,
    sourceTag: "identity risk",
    summary:
      "The identity is over-privileged and can enumerate mail and files well beyond its intended application boundary.",
    rationale: [
      "Identity permissions exceed the business use case",
      "Mailbox and file access would enable lateral movement",
      "Work item is already in progress and needs a close-out date",
    ],
    evidence: [
      "Exposure Management flagged the identity as critical-capable",
      "Last permissions review is older than the policy window",
      "Owner exists but has not attached a remediation ETA",
    ],
    attackPath: [
      "Compromised service token",
      "Mail and file enumeration",
      "Credential harvest",
      "Internal lateral movement",
    ],
    actions: [
      "Replace broad Graph permissions with scoped app roles",
      "Validate with a least-privilege test account",
      "Record the change in the audit trail",
    ],
    scoreDrivers: [
      { label: "Exploitability", value: 28 },
      { label: "Business impact", value: 32 },
      { label: "Exposure", value: 18 },
      { label: "SLA pressure", value: 22 },
    ],
    timeline: [
      { when: "07:58", label: "Permissions drift detected" },
      { when: "08:26", label: "Assigned to IAM queue" },
      { when: "09:11", label: "Remediation work started" },
    ],
    tags: ["identity", "least privilege", "workflow", "owned"],
  },
  {
    id: "github-token",
    title: "GitHub secret token appears in a build log",
    asset: "ci-build-logs / release pipeline",
    businessUnit: "Developer Experience",
    owner: "DevEx",
    surface: "saas",
    source: "Wiz Exposure Management",
    severity: "critical",
    status: "open",
    riskScore: 90,
    dueDays: 3,
    sourceTag: "secret exposure",
    summary:
      "A live token was captured in the build pipeline and can be used to reach the deployment workflow if not revoked.",
    rationale: [
      "Secret exposure spans code, SaaS, and production deployment",
      "Path leads from a token to CI privileges and release rights",
      "Fresh exposure; exploitability window is still open",
    ],
    evidence: [
      "Token pattern observed in the redacted build log",
      "Matching repo has deployment permissions",
      "No rotation event has been recorded yet",
    ],
    attackPath: [
      "Build log leak",
      "Token reuse",
      "CI credential access",
      "Deployment pipeline control",
    ],
    actions: [
      "Revoke the token and rotate the pipeline secret",
      "Scan adjacent logs for secondary exposure",
      "Verify no unauthorized deployments occurred",
    ],
    scoreDrivers: [
      { label: "Exploitability", value: 38 },
      { label: "Business impact", value: 27 },
      { label: "Exposure", value: 20 },
      { label: "SLA pressure", value: 15 },
    ],
    timeline: [
      { when: "09:03", label: "Secret detected in build log" },
      { when: "09:17", label: "Ownership assigned to DevEx" },
      { when: "09:30", label: "Queued for token rotation" },
    ],
    tags: ["secret", "CI/CD", "code-to-cloud", "critical"],
  },
  {
    id: "browser-plugin",
    title: "Legacy browser plugin still runs on executive laptops",
    asset: "euc-laptop-ring",
    businessUnit: "End User Computing",
    owner: "Desktop Ops",
    surface: "endpoint",
    source: "Microsoft Defender Vulnerability Management",
    severity: "medium",
    status: "accepted",
    riskScore: 67,
    dueDays: 11,
    sourceTag: "accepted risk",
    summary:
      "The issue is being tolerated temporarily because the plugin is tied to a legacy reporting site, but the acceptance needs an expiry.",
    rationale: [
      "Risk is currently accepted but still visible",
      "Executive devices magnify any compromise impact",
      "Acceptance should carry an expiry date and control owner",
    ],
    evidence: [
      "Plugin inventory remains present on 43 devices",
      "No patch is available from the vendor yet",
      "Compensating control is the browser isolation policy",
    ],
    attackPath: [
      "Malicious web content",
      "Plugin execution",
      "Endpoint foothold",
      "Credential theft",
    ],
    actions: [
      "Document the exception expiry date",
      "Apply browser isolation to the affected cohort",
      "Re-evaluate in the next review cycle",
    ],
    scoreDrivers: [
      { label: "Exploitability", value: 21 },
      { label: "Business impact", value: 24 },
      { label: "Exposure", value: 18 },
      { label: "SLA pressure", value: 37 },
    ],
    timeline: [
      { when: "08:44", label: "Risk acceptance requested" },
      { when: "09:02", label: "Compensating control approved" },
      { when: "09:35", label: "Acceptance awaiting expiry date" },
    ],
    tags: ["accepted", "endpoint", "exception", "audit"],
  },
  {
    id: "vendor-portal",
    title: "Third-party vendor portal uses a legacy SSO path",
    asset: "vendor-portal.shared.example",
    businessUnit: "Third Party Risk",
    owner: "Risk Operations",
    surface: "saas",
    source: "ServiceNow Vulnerability Response",
    severity: "high",
    status: "open",
    riskScore: 79,
    dueDays: 5,
    sourceTag: "workflow gap",
    summary:
      "The portal is a business-critical dependency, but the SSO path has not been reassessed since a vendor change in Q2.",
    rationale: [
      "Third-party workflow affects multiple internal teams",
      "Ownership sits across security, procurement, and IT",
      "Resolution requires an explicit vendor action plan",
    ],
    evidence: [
      "Portal still references the old SAML endpoint",
      "Ticket chain shows one deferred remediation already",
      "Vendor contact list is current but unused",
    ],
    attackPath: [
      "Third-party login flow",
      "Legacy assertion handling",
      "Session hijack",
      "Partner data exposure",
    ],
    actions: [
      "Open a vendor remediation task with deadline",
      "Confirm whether MFA is enforced on the new path",
      "Record cross-team ownership in the workspace",
    ],
    scoreDrivers: [
      { label: "Exploitability", value: 27 },
      { label: "Business impact", value: 28 },
      { label: "Exposure", value: 19 },
      { label: "SLA pressure", value: 26 },
    ],
    timeline: [
      { when: "08:06", label: "Vendor path imported from workflow feed" },
      { when: "08:55", label: "Ownership split across two teams" },
      { when: "09:25", label: "Follow-up task queued" },
    ],
    tags: ["third party", "vendor", "SSO", "open"],
  },
  {
    id: "branch-vpn",
    title: "Branch office VPN appliance still exposes a weak cipher suite",
    asset: "vpn-branch-07",
    businessUnit: "Network Operations",
    owner: "Network Operations",
    surface: "edge",
    source: "Tenable Exposure Management",
    severity: "high",
    status: "planned",
    riskScore: 74,
    dueDays: 7,
    sourceTag: "legacy configuration",
    summary:
      "The appliance is reachable from the public internet and still advertises an obsolete cipher that should be retired.",
    rationale: [
      "Publicly reachable edge service with known weak configuration",
      "Patch is straightforward but requires maintenance coordination",
      "A plan already exists, so the focus is execution and verification",
    ],
    evidence: [
      "Configuration baseline still flags the weak cipher",
      "Outbound traffic shows the branch office still in use",
      "Scheduled maintenance window is approved for next week",
    ],
    attackPath: [
      "Public VPN login",
      "Weak cipher negotiation",
      "Session establishment",
      "Branch network access",
    ],
    actions: [
      "Remove obsolete cipher from the configuration set",
      "Confirm no dependent client versions will break",
      "Recheck the service after change control",
    ],
    scoreDrivers: [
      { label: "Exploitability", value: 24 },
      { label: "Business impact", value: 22 },
      { label: "Exposure", value: 18 },
      { label: "SLA pressure", value: 36 },
    ],
    timeline: [
      { when: "08:24", label: "Configuration drift detected" },
      { when: "08:49", label: "Change window tentatively booked" },
      { when: "09:19", label: "Planned for next patch cycle" },
    ],
    tags: ["VPN", "edge", "planned", "network"],
  },
  {
    id: "container-secret",
    title: "Container image exposes a secret path to the production database",
    asset: "payments-service:1.8.4",
    businessUnit: "Platform Security",
    owner: "Platform Engineering",
    surface: "cloud",
    source: "Wiz Security Graph",
    severity: "high",
    status: "resolved",
    riskScore: 61,
    dueDays: 0,
    sourceTag: "remediated",
    summary:
      "The build was rebuilt after a secret was detected, and the production deploy now points to a clean image tag.",
    rationale: [
      "Issue is already remediated but kept visible for auditability",
      "Useful as a closed-loop example in the demo queue",
      "Shows how the workspace records closure evidence",
    ],
    evidence: [
      "Image rebuild is attached to the release ticket",
      "Secret was rotated and invalidated",
      "Follow-up validation scan came back clean",
    ],
    attackPath: [
      "Build artifact",
      "Container runtime",
      "Database secret",
      "Production database",
    ],
    actions: [
      "Keep the closure evidence attached",
      "Track any related tags in a follow-up scan",
      "No further remediation required",
    ],
    scoreDrivers: [
      { label: "Exploitability", value: 18 },
      { label: "Business impact", value: 22 },
      { label: "Exposure", value: 11 },
      { label: "SLA pressure", value: 10 },
    ],
    timeline: [
      { when: "07:40", label: "Image rebuilt and retagged" },
      { when: "08:03", label: "Clean validation completed" },
      { when: "08:32", label: "Marked resolved for audit" },
    ],
    tags: ["resolved", "container", "evidence", "audit"],
  },
]

export const seedWorkspace: WorkspaceState = {
  lens: "all",
  surface: "all",
  sort: "priority",
  search: "",
  selectedId: exposures[0]?.id ?? "",
  ownerOverrides: {},
  statusOverrides: {},
  notes: {
    "payroll-api": [
      {
        id: "note-1",
        author: "Alicia M.",
        when: "08:48",
        body: "Need Finance Systems owner before we can bind the patch task.",
      },
    ],
    "vendor-portal": [
      {
        id: "note-2",
        author: "Risk Ops",
        when: "08:59",
        body: "Vendor contact is responsive, but the old SAML endpoint still needs proof of removal.",
      },
    ],
    "container-secret": [
      {
        id: "note-3",
        author: "Platform Eng",
        when: "09:04",
        body: "Resolved after image rebuild; keep the closure evidence attached to the release ticket.",
      },
    ],
  },
}
