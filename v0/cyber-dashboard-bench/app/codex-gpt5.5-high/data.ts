export type ExposureStatus =
  | "new"
  | "in-progress"
  | "exception"
  | "verified"

export type ActionBucket =
  | "Act now"
  | "Schedule"
  | "Investigate"
  | "Exception review"
  | "Verified"

export type Exposure = {
  id: string
  title: string
  cve: string
  actionBucket: ActionBucket
  status: ExposureStatus
  score: number
  severity: "Critical" | "High" | "Medium"
  owner: string
  team: string
  businessUnit: string
  businessService: string
  rootCause: string
  assetType: string
  environment: string
  due: string
  firstSeen: string
  affectedAssets: number
  blastRadius: string
  cvss: number
  epss: number
  epssPercentile: number
  assetCriticality: number
  confidence: number
  ticket: string
  signals: string[]
  evidence: string[]
  reasoning: string[]
  remediation: string[]
  verification: string
  compensatingControl: string
  mitre: string[]
  path: string[]
}

export type TrendPoint = {
  day: string
  risk: number
  verified: number
}

export type RootCausePoint = {
  label: string
  active: number
  verified: number
}

export const exposures: Exposure[] = [
  {
    id: "rp-001",
    title: "GeoServer XXE reachable from customer upload service",
    cve: "CVE-2025-58360",
    actionBucket: "Act now",
    status: "new",
    score: 96,
    severity: "Critical",
    owner: "Platform Cloud",
    team: "Atlas",
    businessUnit: "Revenue Systems",
    businessService: "Customer Uploads",
    rootCause: "Outdated container image",
    assetType: "Kubernetes workload",
    environment: "Production",
    due: "Today 18:00",
    firstSeen: "36 minutes ago",
    affectedAssets: 7,
    blastRadius: "Public upload tier can reach invoice object storage",
    cvss: 9.8,
    epss: 0.81,
    epssPercentile: 99,
    assetCriticality: 5,
    confidence: 94,
    ticket: "SEC-1842",
    signals: ["KEV", "Internet exposed", "Sensitive data", "No WAF rule"],
    evidence: [
      "CISA KEV match with active exploitation evidence",
      "External ASM confirms HTTPS exposure through uploads.example.test",
      "Cloud graph shows write path to regulated invoice bucket",
      "Container digest is 4 releases behind vendor patched image",
    ],
    reasoning: [
      "Known exploited vulnerability outranks scanner severity alone.",
      "Internet reachability and sensitive data path make delay high impact.",
      "Single image rebuild remediates all seven affected pods.",
    ],
    remediation: [
      "Rebuild customer-upload image with GeoServer 2.26.4 or later.",
      "Deploy temporary WAF rule blocking external entity payload patterns.",
      "Rotate service account token after patched rollout completes.",
      "Run scanner retest and confirm object storage access path is removed.",
    ],
    verification: "Container scanner clean plus cloud graph no longer shows object-storage write path.",
    compensatingControl:
      "Temporary WAF rule can reduce exposure for 24 hours but does not remove the vulnerable parser.",
    mitre: ["T1190 Exploit Public-Facing Application", "T1552 Unsecured Credentials"],
    path: ["Internet", "Upload API", "GeoServer parser", "Service account", "Invoice bucket"],
  },
  {
    id: "rp-002",
    title: "Privileged Okta workflow token on unpatched build runner",
    cve: "CVE-2025-33053",
    actionBucket: "Act now",
    status: "in-progress",
    score: 91,
    severity: "Critical",
    owner: "Developer Productivity",
    team: "Buildkite",
    businessUnit: "Engineering",
    businessService: "CI/CD Platform",
    rootCause: "Long-lived identity token",
    assetType: "macOS build runner",
    environment: "Production",
    due: "Tomorrow 12:00",
    firstSeen: "4 hours ago",
    affectedAssets: 12,
    blastRadius: "Runner token can trigger production deployment workflow",
    cvss: 8.8,
    epss: 0.67,
    epssPercentile: 98,
    assetCriticality: 5,
    confidence: 89,
    ticket: "SEC-1839",
    signals: ["KEV", "Privileged identity", "CI/CD", "Ransomware associated"],
    evidence: [
      "Endpoint inventory shows vulnerable WebDAV component on runner image",
      "Identity graph maps local token to production deploy workflow",
      "EDR has no active exploit telemetry on these hosts",
      "Patch package is approved for managed runners",
    ],
    reasoning: [
      "Privileged deployment path increases business impact.",
      "Patch is available and affected hosts are cattle-style runners.",
      "No active local exploit telemetry lowers urgency below rp-001.",
    ],
    remediation: [
      "Drain vulnerable runners from the production queue.",
      "Apply July cumulative OS update to runner image.",
      "Replace long-lived workflow token with short-lived OIDC credential.",
      "Re-register runners and confirm EDR agent check-in.",
    ],
    verification: "All runners report patched OS build and OIDC token policy in identity inventory.",
    compensatingControl:
      "Runner drain removes immediate execution capacity but does not fix the base image.",
    mitre: ["T1190 Exploit Public-Facing Application", "T1098 Account Manipulation"],
    path: ["Developer PR", "Build runner", "Workflow token", "Deploy job", "Production cluster"],
  },
  {
    id: "rp-003",
    title: "Externally exposed VPN appliance missing vendor hotfix",
    cve: "CVE-2026-11742",
    actionBucket: "Schedule",
    status: "new",
    score: 84,
    severity: "High",
    owner: "Network Operations",
    team: "Edge",
    businessUnit: "Corporate IT",
    businessService: "Remote Access",
    rootCause: "Delayed maintenance window",
    assetType: "VPN appliance",
    environment: "Production",
    due: "Jul 18",
    firstSeen: "1 day ago",
    affectedAssets: 3,
    blastRadius: "Remote access gateway serving all employees",
    cvss: 9.1,
    epss: 0.34,
    epssPercentile: 93,
    assetCriticality: 4,
    confidence: 87,
    ticket: "SEC-1816",
    signals: ["Internet exposed", "High CVSS", "Patch available"],
    evidence: [
      "Scanner confirms vulnerable firmware on all three appliances",
      "Vendor advisory includes fixed firmware and mitigation header",
      "No KEV listing or confirmed exploitation in customer telemetry",
    ],
    reasoning: [
      "Internet exposure requires prompt scheduling.",
      "No confirmed exploitation keeps this below the Act now threshold.",
      "Maintenance window is already available this weekend.",
    ],
    remediation: [
      "Apply vendor firmware 14.7.2 during scheduled edge window.",
      "Enable vendor-recommended pre-auth mitigation until patch completes.",
      "Confirm HA pair failover before and after upgrade.",
    ],
    verification: "Authenticated scan shows firmware 14.7.2 and mitigation retired.",
    compensatingControl:
      "Pre-auth mitigation header is enabled on all appliances until the maintenance window.",
    mitre: ["T1133 External Remote Services"],
    path: ["Internet", "VPN edge", "Pre-auth endpoint", "Employee network"],
  },
  {
    id: "rp-004",
    title: "Payment analytics database accepts legacy TLS ciphers",
    cve: "CFG-TLS-014",
    actionBucket: "Investigate",
    status: "new",
    score: 72,
    severity: "High",
    owner: "Data Platform",
    team: "Ledger",
    businessUnit: "Finance",
    businessService: "Payment Analytics",
    rootCause: "Legacy compatibility exception",
    assetType: "Managed database",
    environment: "Production",
    due: "Jul 21",
    firstSeen: "2 days ago",
    affectedAssets: 2,
    blastRadius: "Internal analytics data path with PCI-derived metadata",
    cvss: 7.4,
    epss: 0.09,
    epssPercentile: 81,
    assetCriticality: 5,
    confidence: 76,
    ticket: "SEC-1802",
    signals: ["Sensitive data", "Internal only", "Possible exception"],
    evidence: [
      "Cloud posture rule detected TLS 1.0 compatibility setting",
      "Network graph shows private subnet only",
      "Prior exception expired 19 days ago without review",
    ],
    reasoning: [
      "Sensitive data keeps this visible despite lower exploit likelihood.",
      "Internal-only exposure requires owner confirmation before fix.",
      "Expired exception means risk governance is incomplete.",
    ],
    remediation: [
      "Confirm whether legacy BI connector still requires TLS 1.0.",
      "Disable TLS 1.0 and TLS 1.1 on analytics database listener.",
      "Update BI connector trust store if compatibility testing fails.",
      "Renew or reject exception with Finance risk approver.",
    ],
    verification: "Cloud posture rule passes and BI connector health checks stay green.",
    compensatingControl:
      "Private subnet and database firewall reduce reachability but do not justify an expired exception.",
    mitre: ["T1040 Network Sniffing"],
    path: ["Internal app", "Legacy TLS listener", "Payment analytics DB"],
  },
  {
    id: "rp-005",
    title: "Dormant admin accounts lack phishing-resistant MFA",
    cve: "ID-MFA-022",
    actionBucket: "Exception review",
    status: "exception",
    score: 68,
    severity: "High",
    owner: "Identity Governance",
    team: "Access",
    businessUnit: "Shared Services",
    businessService: "Corporate Identity",
    rootCause: "Break-glass process drift",
    assetType: "Privileged identities",
    environment: "Production",
    due: "Review Jul 24",
    firstSeen: "5 days ago",
    affectedAssets: 5,
    blastRadius: "Domain and cloud tenant administrative roles",
    cvss: 8.2,
    epss: 0.12,
    epssPercentile: 85,
    assetCriticality: 5,
    confidence: 91,
    ticket: "SEC-1771",
    signals: ["Privileged identity", "Exception", "No recent login"],
    evidence: [
      "Identity inventory finds five break-glass accounts without FIDO2 enforcement",
      "No interactive login observed in 90 days",
      "Prior risk acceptance expires next week",
    ],
    reasoning: [
      "Privilege level keeps this on the board even without active exploitation.",
      "Exception must be reviewed because accepted risk is expiring.",
      "Compensating monitoring exists but does not replace MFA hardening.",
    ],
    remediation: [
      "Enroll break-glass accounts in FIDO2 security-key policy.",
      "Store recovery keys in sealed emergency access process.",
      "Create alert for any interactive login or role activation.",
    ],
    verification: "Identity policy inventory shows FIDO2 required and emergency login alert is active.",
    compensatingControl:
      "Current exception permits temporary delay if monitoring and vault controls remain active.",
    mitre: ["T1078 Valid Accounts", "T1098 Account Manipulation"],
    path: ["Stolen credential", "Break-glass admin", "Tenant admin roles", "Cloud estate"],
  },
  {
    id: "rp-006",
    title: "Log4j scanner residue closed on retail API fleet",
    cve: "CVE-2021-44228",
    actionBucket: "Verified",
    status: "verified",
    score: 18,
    severity: "Medium",
    owner: "Commerce API",
    team: "Checkout",
    businessUnit: "Digital Commerce",
    businessService: "Checkout API",
    rootCause: "Scanner duplicate",
    assetType: "Container workload",
    environment: "Production",
    due: "Closed",
    firstSeen: "19 days ago",
    affectedAssets: 0,
    blastRadius: "No remaining vulnerable runtime package detected",
    cvss: 10,
    epss: 0.95,
    epssPercentile: 100,
    assetCriticality: 4,
    confidence: 96,
    ticket: "SEC-1698",
    signals: ["Verified", "Duplicate collapsed", "Retest clean"],
    evidence: [
      "Runtime scanner and SCA both report patched dependency",
      "Ticket closed by service owner with build artifact link",
      "No vulnerable image digest observed in last seven days",
    ],
    reasoning: [
      "Historically severe issue remains visible as verified risk reduction.",
      "Retest confidence is high across two sources.",
      "No action required unless recurrence appears.",
    ],
    remediation: [
      "No current remediation required.",
      "Keep dependency policy gate enabled for new checkout images.",
    ],
    verification: "Two independent scans clean for seven days.",
    compensatingControl: "Not applicable; exposure is verified closed.",
    mitre: ["T1190 Exploit Public-Facing Application"],
    path: ["Internet", "Checkout API", "Patched runtime"],
  },
]

export const riskTrend: TrendPoint[] = [
  { day: "Jun 17", risk: 731, verified: 24 },
  { day: "Jun 22", risk: 702, verified: 31 },
  { day: "Jun 27", risk: 684, verified: 45 },
  { day: "Jul 02", risk: 628, verified: 63 },
  { day: "Jul 07", risk: 602, verified: 72 },
  { day: "Jul 12", risk: 558, verified: 94 },
  { day: "Jul 16", risk: 536, verified: 108 },
]

export const rootCauses: RootCausePoint[] = [
  { label: "Patch lag", active: 22, verified: 13 },
  { label: "Identity drift", active: 16, verified: 6 },
  { label: "Config", active: 14, verified: 9 },
  { label: "Scanner dupes", active: 7, verified: 28 },
]
