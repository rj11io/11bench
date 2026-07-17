export type ExposureStatus = "queued" | "in_progress" | "review" | "accepted" | "done"

export type ExposureType =
  | "Known exploited vulnerability"
  | "Identity drift"
  | "Cloud misconfiguration"
  | "Privilege escalation"
  | "Endpoint gap"

export type PathHop = {
  label: string
  detail: string
  kind: "source" | "control" | "risk" | "target"
}

export type ExposureNote = {
  author: string
  role: string
  at: string
  note: string
}

export type Exposure = {
  id: string
  title: string
  type: ExposureType
  asset: string
  team: string
  owner: string
  severity: "critical" | "high" | "medium"
  priorityScore: number
  exposureScore: number
  due: string
  status: ExposureStatus
  businessImpact: string
  attackPath: string
  whyNow: string
  evidence: string[]
  controls: { label: string; state: "present" | "missing" | "partial" }[]
  recommendedFixes: string[]
  path: PathHop[]
  notes: ExposureNote[]
}

export type TrendPoint = {
  day: string
  exposure: number
  prioritised: number
  accepted: number
}

export type Metric = {
  label: string
  value: string
  delta: string
  tone: "ok" | "warn" | "danger"
  hint: string
}

export type DemoData = {
  orgName: string
  segment: string
  focus: string
  mission: string
  metrics: Metric[]
  trend: TrendPoint[]
  exposures: Exposure[]
}

const commonNotes = {
  analyst: {
    author: "Maya Chen",
    role: "Security analyst",
    at: "07:40 UTC",
    note: "Confirmed with CISA KEV and internal scan evidence. Waiting for platform owner to verify compensating control coverage.",
  },
  platform: {
    author: "Jordan Lee",
    role: "Platform lead",
    at: "08:05 UTC",
    note: "Patch window is booked for tonight. If the scan rechecks clean, we can close without creating a separate change ticket.",
  },
  secops: {
    author: "Ava Patel",
    role: "Security operations",
    at: "08:22 UTC",
    note: "Queued for daily review. If ownership stays unresolved after the next cycle, escalate to the weekly exposure council.",
  },
}

export const demoData: DemoData = {
  orgName: "Northstar Cloud",
  segment: "B2B SaaS, 740 employees",
  focus: "Lean security team protecting cloud, identity, and build systems",
  mission:
    "Turn known-exploited vulnerabilities, identity drift, and attack paths into one explainable remediation queue.",
  metrics: [
    {
      label: "Open exposures",
      value: "18",
      delta: "-4 from last week",
      tone: "warn",
      hint: "Exposures above the risk threshold with an assigned owner or default team.",
    },
    {
      label: "Critical paths",
      value: "4",
      delta: "2 require patching today",
      tone: "danger",
      hint: "Attack paths that reach crown-jewel assets or privileged identities.",
    },
    {
      label: "Remediation SLA",
      value: "72%",
      delta: "+9 pts month over month",
      tone: "ok",
      hint: "Open work completed within the SLA window for the current queue.",
    },
    {
      label: "Accepted risks",
      value: "3",
      delta: "all with audit reasons",
      tone: "ok",
      hint: "Approved exceptions with permanent rationale and review dates.",
    },
  ],
  trend: [
    { day: "Mon", exposure: 82, prioritised: 31, accepted: 5 },
    { day: "Tue", exposure: 80, prioritised: 30, accepted: 5 },
    { day: "Wed", exposure: 77, prioritised: 28, accepted: 4 },
    { day: "Thu", exposure: 75, prioritised: 26, accepted: 4 },
    { day: "Fri", exposure: 71, prioritised: 22, accepted: 3 },
    { day: "Sat", exposure: 69, prioritised: 21, accepted: 3 },
    { day: "Sun", exposure: 66, prioritised: 18, accepted: 3 },
  ],
  exposures: [
    {
      id: "edge-keeper-01",
      title: "Git server CVE can reach production deploy role",
      type: "Known exploited vulnerability",
      asset: "Git edge gateway",
      team: "Platform",
      owner: "Jordan Lee",
      severity: "critical",
      priorityScore: 98,
      exposureScore: 92,
      due: "Today 17:00",
      status: "queued",
      businessImpact: "Could expose deployment credentials and allow code injection into the release pipeline.",
      attackPath:
        "Internet-facing Git gateway -> build runner -> deployment role -> production secrets",
      whyNow:
        "The CVE is in CISA KEV, the asset is external-facing, and the path lands on a privileged deploy identity.",
      evidence: [
        "CISA KEV listed",
        "No compensating control detected on the gateway",
        "Attack path touches production deploy credentials",
      ],
      controls: [
        { label: "WAF rule", state: "partial" },
        { label: "EDR", state: "present" },
        { label: "MFA on deploy role", state: "present" },
      ],
      recommendedFixes: [
        "Apply vendor patch to the gateway and re-scan within the same maintenance window",
        "Rotate deploy credentials after validation",
        "Attach the fix to the release ticket so ownership stays with Platform",
      ],
      path: [
        {
          label: "Source",
          detail: "Internet-facing gateway receives unauthenticated requests",
          kind: "source",
        },
        {
          label: "Technique",
          detail: "Known exploited flaw enables remote code execution",
          kind: "risk",
        },
        {
          label: "Control",
          detail: "WAF only partially covers the exploit pattern",
          kind: "control",
        },
        {
          label: "Target",
          detail: "Build runner can invoke production deploy role",
          kind: "target",
        },
      ],
      notes: [commonNotes.analyst, commonNotes.platform],
    },
    {
      id: "identity-lace-02",
      title: "Privileged admin account lacks phishing-resistant MFA",
      type: "Identity drift",
      asset: "Okta super-admin",
      team: "Identity",
      owner: "Ava Patel",
      severity: "critical",
      priorityScore: 93,
      exposureScore: 88,
      due: "Today 15:30",
      status: "in_progress",
      businessImpact: "A single credential theft could unlock customer support data and SSO trust settings.",
      attackPath:
        "Phishable admin sign-in -> session hijack -> IdP policy change -> access to SaaS apps",
      whyNow:
        "The account can modify MFA and sign-in policies, which turns an identity loss into a platform-wide trust issue.",
      evidence: [
        "Admin exemption from phishing-resistant MFA",
        "Policy drift detected in last 24 hours",
        "Linked to customer support app permissions",
      ],
      controls: [
        { label: "Conditional access", state: "partial" },
        { label: "Session timeout", state: "present" },
        { label: "Privileged access review", state: "missing" },
      ],
      recommendedFixes: [
        "Move the account into a protected admin role with phishing-resistant MFA",
        "Review all delegated permissions before the next sign-in",
        "Record the exception only if the business owner signs off",
      ],
      path: [
        {
          label: "Source",
          detail: "Admin account is reachable from external identity providers",
          kind: "source",
        },
        {
          label: "Technique",
          detail: "Session theft could bypass weaker MFA",
          kind: "risk",
        },
        {
          label: "Control",
          detail: "Conditional access exists but the admin exception is still active",
          kind: "control",
        },
        {
          label: "Target",
          detail: "Identity policies and SaaS access grants can be rewritten",
          kind: "target",
        },
      ],
      notes: [commonNotes.secops],
    },
    {
      id: "artifact-spill-03",
      title: "Build artifact bucket exposes release metadata",
      type: "Cloud misconfiguration",
      asset: "S3 release bucket",
      team: "Infrastructure",
      owner: "Priya Singh",
      severity: "high",
      priorityScore: 82,
      exposureScore: 71,
      due: "Tomorrow 11:00",
      status: "queued",
      businessImpact: "Release metadata contains references to internal endpoints and token scopes.",
      attackPath:
        "Public bucket listing -> build metadata exposure -> internal endpoint discovery -> follow-on credential theft",
      whyNow:
        "The bucket is public and the object names reveal internal services, making reconnaissance cheap for an attacker.",
      evidence: [
        "Public read access detected",
        "Object paths include internal hostnames",
        "No lifecycle policy for stale artifacts",
      ],
      controls: [
        { label: "Bucket policy", state: "missing" },
        { label: "Object versioning", state: "present" },
        { label: "DLP scan", state: "partial" },
      ],
      recommendedFixes: [
        "Remove public read access and replace with signed URLs",
        "Strip internal hostnames from artifact names",
        "Re-scan for secret leakage once the policy update lands",
      ],
      path: [
        {
          label: "Source",
          detail: "Public bucket listing is available without auth",
          kind: "source",
        },
        {
          label: "Technique",
          detail: "Artifact metadata reveals internal service names",
          kind: "risk",
        },
        {
          label: "Control",
          detail: "Versioning is present, but access policy is missing",
          kind: "control",
        },
        {
          label: "Target",
          detail: "Attackers can pivot toward internal services and secrets",
          kind: "target",
        },
      ],
      notes: [commonNotes.analyst],
    },
    {
      id: "vpn-surge-04",
      title: "Legacy VPN appliance still matches an exploited firmware family",
      type: "Known exploited vulnerability",
      asset: "Remote access VPN",
      team: "Infrastructure",
      owner: "Jordan Lee",
      severity: "critical",
      priorityScore: 90,
      exposureScore: 86,
      due: "Today 19:00",
      status: "review",
      businessImpact: "Remote access could become the easiest initial foothold for a ransomware actor.",
      attackPath:
        "VPN appliance -> privileged session -> lateral movement -> file shares and backups",
      whyNow:
        "The device family appears in recent threat reporting and the appliance fronts a large share of employee access.",
      evidence: [
        "Firmware version below vendor minimum",
        "Spike in external requests over the last 48 hours",
        "Backup subnet reachable from the same trust zone",
      ],
      controls: [
        { label: "Geo-IP allowlist", state: "partial" },
        { label: "NDR", state: "present" },
        { label: "Admin MFA", state: "present" },
      ],
      recommendedFixes: [
        "Patch the appliance or move access to the alternate gateway",
        "Temporarily isolate backup network routes",
        "Validate with a follow-up scan before moving to Done",
      ],
      path: [
        {
          label: "Source",
          detail: "Legacy VPN appliance is directly reachable from the internet",
          kind: "source",
        },
        {
          label: "Technique",
          detail: "Exploit could create a privileged remote session",
          kind: "risk",
        },
        {
          label: "Control",
          detail: "Admin MFA helps, but the exposure still exists",
          kind: "control",
        },
        {
          label: "Target",
          detail: "Lateral movement can reach file shares and backups",
          kind: "target",
        },
      ],
      notes: [commonNotes.platform, commonNotes.secops],
    },
    {
      id: "eda-priv-05",
      title: "Kubernetes namespace allows privileged pod creation",
      type: "Privilege escalation",
      asset: "Production Kubernetes cluster",
      team: "Platform",
      owner: "Maya Chen",
      severity: "high",
      priorityScore: 77,
      exposureScore: 68,
      due: "Friday 10:30",
      status: "accepted",
      businessImpact: "An attacker with workload access could escalate into the node layer and reach secrets.",
      attackPath:
        "Compromised workload -> privileged pod -> node escape -> service-account secrets",
      whyNow:
        "The namespace is used by multiple engineering teams and one policy exception is still open.",
      evidence: [
        "Privileged pod admission rule enabled",
        "One exception approved for legacy build job",
        "No network policy on the namespace",
      ],
      controls: [
        { label: "Admission policy", state: "partial" },
        { label: "Network policy", state: "missing" },
        { label: "Runtime detection", state: "present" },
      ],
      recommendedFixes: [
        "Close the exception after the legacy job migrates",
        "Add namespace network policy and re-scan",
        "Keep the exception on a 30-day review cycle if needed",
      ],
      path: [
        {
          label: "Source",
          detail: "Compromised workload already has cluster access",
          kind: "source",
        },
        {
          label: "Technique",
          detail: "Privileged pod creation can escape the container boundary",
          kind: "risk",
        },
        {
          label: "Control",
          detail: "Runtime detection exists but policy coverage is incomplete",
          kind: "control",
        },
        {
          label: "Target",
          detail: "Service-account secrets and node privileges are reachable",
          kind: "target",
        },
      ],
      notes: [commonNotes.analyst],
    },
    {
      id: "support-consent-06",
      title: "Overbroad OAuth consent exposes support mailbox data",
      type: "Identity drift",
      asset: "Customer support SaaS app",
      team: "Identity",
      owner: "Ava Patel",
      severity: "medium",
      priorityScore: 61,
      exposureScore: 55,
      due: "Next week",
      status: "queued",
      businessImpact: "A stale consent grant allows data access beyond the app’s declared purpose.",
      attackPath:
        "Overbroad OAuth app -> mailbox access -> customer ticket export -> data exfiltration",
      whyNow:
        "Consent drift grows quietly and becomes difficult to explain to auditors once it is left untracked.",
      evidence: [
        "App requested `Mail.ReadWrite` and `offline_access`",
        "Last consent review older than 120 days",
        "No owner attached in the identity inventory",
      ],
      controls: [
        { label: "App allowlist", state: "partial" },
        { label: "Consent review", state: "missing" },
        { label: "CASB alerting", state: "present" },
      ],
      recommendedFixes: [
        "Review the app owner and trim the scopes",
        "Expire the consent if the owner is unresponsive",
        "Add the app to the monthly access review cadence",
      ],
      path: [
        {
          label: "Source",
          detail: "OAuth app has stale broad scopes",
          kind: "source",
        },
        {
          label: "Technique",
          detail: "Mail and file scopes are broader than the workflow needs",
          kind: "risk",
        },
        {
          label: "Control",
          detail: "CASB sees the app, but there is no owner review",
          kind: "control",
        },
        {
          label: "Target",
          detail: "Support mailboxes and ticket exports are reachable",
          kind: "target",
        },
      ],
      notes: [commonNotes.secops],
    },
  ],
}

