export type Severity = "Critical" | "High" | "Medium" | "Low"

export type FindingStatus =
  | "Needs triage"
  | "Assigned"
  | "Fix in progress"
  | "Awaiting verification"
  | "Verified"

export type FactorTone = "danger" | "warning" | "info" | "neutral" | "success"

export type PriorityFactor = {
  label: string
  value: string
  detail: string
  tone: FactorTone
}

export type Finding = {
  id: string
  title: string
  cve: string
  source: string
  sourceUpdated: string
  severity: Severity
  score: number
  riskWeight: number
  ssvcOutcome: "Act" | "Attend" | "Track*"
  exploitSignal: string
  exploitLabel: string
  kev: boolean
  reachability: string
  asset: string
  service: string
  environment: string
  criticality: string
  dataClass: string
  owner: string
  ownerInitials: string
  ownerTeam: string
  status: FindingStatus
  due: string
  dueDays: number
  discovered: string
  lastSeen: string
  ticket: string
  comments: number
  priorityFactors: PriorityFactor[]
  remediation: string[]
  riskReduction: number
}

export type TeamMember = {
  name: string
  initials: string
  tone: "blue" | "green" | "orange" | "purple"
}

export type ActivityItem = {
  id: string
  actor: string
  initials: string
  message: string
  time: string
  tone: "blue" | "green" | "amber" | "gray"
}

export const owners: TeamMember[] = [
  { name: "Mia Park", initials: "MP", tone: "blue" },
  { name: "Sam Osei", initials: "SO", tone: "green" },
  { name: "Noah Chen", initials: "NC", tone: "orange" },
  { name: "Ava Patel", initials: "AP", tone: "purple" },
]

export const seedFindings: Finding[] = [
  {
    id: "exposure-jenkins",
    title: "Jenkins CLI command injection",
    cve: "CVE-2024-23897",
    source: "Demo import · VM scanner",
    sourceUpdated: "9 min ago",
    severity: "Critical",
    score: 9.8,
    riskWeight: 6.2,
    ssvcOutcome: "Act",
    exploitSignal: "KEV",
    exploitLabel: "Known exploited",
    kev: true,
    reachability: "Internet reachable",
    asset: "build-control-01",
    service: "CI/CD control plane",
    environment: "Production",
    criticality: "Mission critical",
    dataClass: "Build secrets",
    owner: "Mia Park",
    ownerInitials: "MP",
    ownerTeam: "Platform",
    status: "Needs triage",
    due: "Today · 17:00",
    dueDays: 0,
    discovered: "14 Jul 2026",
    lastSeen: "16 Jul 2026 · 08:44",
    ticket: "Not created",
    comments: 4,
    priorityFactors: [
      { label: "Exploit", value: "KEV", detail: "Known exploitation is recorded in the source snapshot.", tone: "danger" },
      { label: "Reachability", value: "Public", detail: "Asset is reachable from the public internet.", tone: "danger" },
      { label: "Criticality", value: "Mission critical", detail: "The service controls production build and release paths.", tone: "warning" },
      { label: "Impact", value: "High integrity", detail: "Successful exploitation could alter build outputs.", tone: "info" },
      { label: "Controls", value: "Partial", detail: "WAF coverage exists, but does not cover the CLI endpoint.", tone: "neutral" },
    ],
    remediation: [
      "Upgrade Jenkins core to the vendor-fixed release.",
      "Restrict the CLI endpoint to the platform-admin network segment.",
      "Re-run the authenticated check and attach the scan result before closing.",
    ],
    riskReduction: 3.4,
  },
  {
    id: "exposure-ivanti",
    title: "Ivanti gateway command injection",
    cve: "CVE-2024-21887",
    source: "Demo import · VM scanner",
    sourceUpdated: "9 min ago",
    severity: "Critical",
    score: 9.4,
    riskWeight: 5.4,
    ssvcOutcome: "Act",
    exploitSignal: "KEV",
    exploitLabel: "Known exploited",
    kev: true,
    reachability: "Internet reachable",
    asset: "edge-vpn-01",
    service: "Remote access gateway",
    environment: "Production",
    criticality: "Business critical",
    dataClass: "Identity plane",
    owner: "Sam Osei",
    ownerInitials: "SO",
    ownerTeam: "Network",
    status: "Assigned",
    due: "Today · 19:00",
    dueDays: 0,
    discovered: "15 Jul 2026",
    lastSeen: "16 Jul 2026 · 08:41",
    ticket: "SEC-418",
    comments: 2,
    priorityFactors: [
      { label: "Exploit", value: "KEV", detail: "The source snapshot marks this CVE as actively exploited.", tone: "danger" },
      { label: "Reachability", value: "Public", detail: "The remote access gateway is exposed at the perimeter.", tone: "danger" },
      { label: "Criticality", value: "Business critical", detail: "Gateway compromise can affect workforce access.", tone: "warning" },
      { label: "Impact", value: "High availability", detail: "Remote access disruption would affect customer support operations.", tone: "info" },
      { label: "Controls", value: "Monitored", detail: "EDR coverage is present on the management appliance.", tone: "neutral" },
    ],
    remediation: [
      "Apply the vendor mitigation package in the approved maintenance window.",
      "Review gateway accounts created since the source snapshot.",
      "Verify the exposed interface is no longer vulnerable after the next scan.",
    ],
    riskReduction: 3.0,
  },
  {
    id: "exposure-confluence",
    title: "Confluence OGNL injection",
    cve: "CVE-2022-26134",
    source: "Demo import · VM scanner",
    sourceUpdated: "9 min ago",
    severity: "High",
    score: 9.1,
    riskWeight: 4.8,
    ssvcOutcome: "Act",
    exploitSignal: "KEV",
    exploitLabel: "Known exploited",
    kev: true,
    reachability: "Internet reachable",
    asset: "wiki-prod-02",
    service: "Knowledge base",
    environment: "Production",
    criticality: "Business critical",
    dataClass: "Internal documents",
    owner: "Unassigned",
    ownerInitials: "—",
    ownerTeam: "Productivity",
    status: "Needs triage",
    due: "Tomorrow · 12:00",
    dueDays: 1,
    discovered: "16 Jul 2026",
    lastSeen: "16 Jul 2026 · 08:39",
    ticket: "Not created",
    comments: 1,
    priorityFactors: [
      { label: "Exploit", value: "KEV", detail: "The source snapshot includes active exploitation evidence.", tone: "danger" },
      { label: "Reachability", value: "Public", detail: "The workspace is reachable through the customer support edge.", tone: "danger" },
      { label: "Criticality", value: "Business critical", detail: "The service holds internal operating procedures and customer notes.", tone: "warning" },
      { label: "Impact", value: "High confidentiality", detail: "A compromise could expose internal documents.", tone: "info" },
      { label: "Controls", value: "Unknown", detail: "The imported record has no compensating-control metadata.", tone: "neutral" },
    ],
    remediation: [
      "Upgrade the Confluence deployment to the approved fixed release.",
      "Temporarily restrict access to the corporate identity proxy.",
      "Confirm the application and edge logs show no suspicious post-exploitation activity.",
    ],
    riskReduction: 2.7,
  },
  {
    id: "exposure-openssh",
    title: "OpenSSH regreSSHion signal",
    cve: "CVE-2024-6387",
    source: "Demo import · EDR posture",
    sourceUpdated: "18 min ago",
    severity: "High",
    score: 8.1,
    riskWeight: 4.2,
    ssvcOutcome: "Attend",
    exploitSignal: "Public PoC",
    exploitLabel: "Proof of concept",
    kev: false,
    reachability: "Privileged path",
    asset: "bastion-02",
    service: "Admin access",
    environment: "Production",
    criticality: "Business critical",
    dataClass: "Privileged access",
    owner: "Noah Chen",
    ownerInitials: "NC",
    ownerTeam: "Platform",
    status: "Assigned",
    due: "18 Jul · 12:00",
    dueDays: 2,
    discovered: "15 Jul 2026",
    lastSeen: "16 Jul 2026 · 08:31",
    ticket: "PLAT-902",
    comments: 3,
    priorityFactors: [
      { label: "Exploit", value: "Public PoC", detail: "A proof-of-concept signal is present in the imported threat snapshot.", tone: "warning" },
      { label: "Reachability", value: "Privileged path", detail: "The host is reachable from the admin network and controls production access.", tone: "warning" },
      { label: "Criticality", value: "Business critical", detail: "Bastion access can expose downstream production systems.", tone: "warning" },
      { label: "Impact", value: "High privilege", detail: "Successful exploitation could enable unauthorized access.", tone: "info" },
      { label: "Controls", value: "MFA enforced", detail: "Strong authentication reduces the likelihood of direct takeover.", tone: "success" },
    ],
    remediation: [
      "Update the OpenSSH package in the hardened bastion image.",
      "Keep the bastion behind the admin VPN until the new image is verified.",
      "Record the image digest and verification result in the workstream.",
    ],
    riskReduction: 2.4,
  },
  {
    id: "exposure-gitlab",
    title: "GitLab password reset bypass",
    cve: "CVE-2023-7028",
    source: "Demo import · VM scanner",
    sourceUpdated: "9 min ago",
    severity: "High",
    score: 8.5,
    riskWeight: 3.6,
    ssvcOutcome: "Attend",
    exploitSignal: "KEV",
    exploitLabel: "Known exploited",
    kev: true,
    reachability: "Internet reachable",
    asset: "gitlab-prod",
    service: "Source control",
    environment: "Production",
    criticality: "Mission critical",
    dataClass: "Source code",
    owner: "Mia Park",
    ownerInitials: "MP",
    ownerTeam: "Platform",
    status: "Fix in progress",
    due: "18 Jul · 17:00",
    dueDays: 2,
    discovered: "14 Jul 2026",
    lastSeen: "16 Jul 2026 · 08:42",
    ticket: "PLAT-894",
    comments: 6,
    priorityFactors: [
      { label: "Exploit", value: "KEV", detail: "Active exploitation is present in the imported source snapshot.", tone: "danger" },
      { label: "Reachability", value: "Public", detail: "The source-control portal is internet accessible for contractors.", tone: "danger" },
      { label: "Criticality", value: "Mission critical", detail: "The service contains build and deployment source code.", tone: "warning" },
      { label: "Impact", value: "High confidentiality", detail: "Account takeover could expose source and pipeline definitions.", tone: "info" },
      { label: "Controls", value: "MFA partial", detail: "MFA is enforced for employees but not all external identities.", tone: "neutral" },
    ],
    remediation: [
      "Apply the fixed GitLab release to the production cluster.",
      "Force reset for accounts with password-reset activity since discovery.",
      "Verify the reset path with a test account and attach the result.",
    ],
    riskReduction: 2.1,
  },
  {
    id: "exposure-tomcat",
    title: "Apache Tomcat path traversal",
    cve: "CVE-2024-50379",
    source: "Demo import · VM scanner",
    sourceUpdated: "9 min ago",
    severity: "High",
    score: 8.0,
    riskWeight: 3.0,
    ssvcOutcome: "Attend",
    exploitSignal: "No exploit signal",
    exploitLabel: "No known activity",
    kev: false,
    reachability: "Internal reachable",
    asset: "billing-api-07",
    service: "Billing API",
    environment: "Production",
    criticality: "Business critical",
    dataClass: "Payment metadata",
    owner: "Unassigned",
    ownerInitials: "—",
    ownerTeam: "Payments",
    status: "Needs triage",
    due: "22 Jul · 17:00",
    dueDays: 6,
    discovered: "16 Jul 2026",
    lastSeen: "16 Jul 2026 · 08:25",
    ticket: "Not created",
    comments: 0,
    priorityFactors: [
      { label: "Exploit", value: "No signal", detail: "No KEV or public PoC signal is present in the demo snapshot.", tone: "neutral" },
      { label: "Reachability", value: "Internal", detail: "The service is behind the service mesh and not public.", tone: "info" },
      { label: "Criticality", value: "Business critical", detail: "Billing is a sensitive internal dependency.", tone: "warning" },
      { label: "Impact", value: "Moderate", detail: "The imported finding has no confirmed customer-data path.", tone: "info" },
      { label: "Controls", value: "Mesh policy", detail: "Service-to-service access is constrained by identity policy.", tone: "success" },
    ],
    remediation: [
      "Upgrade the shared Tomcat base image in the billing service.",
      "Confirm the service mesh policy still limits lateral access.",
      "Schedule verification after the next deployment window.",
    ],
    riskReduction: 1.7,
  },
  {
    id: "exposure-nginx",
    title: "Nginx resolver configuration drift",
    cve: "CFG-2026-041",
    source: "Demo import · Cloud posture",
    sourceUpdated: "27 min ago",
    severity: "Medium",
    score: 6.5,
    riskWeight: 2.3,
    ssvcOutcome: "Track*",
    exploitSignal: "Configuration drift",
    exploitLabel: "Control gap",
    kev: false,
    reachability: "Internet reachable",
    asset: "partner-gateway",
    service: "Partner API edge",
    environment: "Production",
    criticality: "Important",
    dataClass: "Partner traffic",
    owner: "Ava Patel",
    ownerInitials: "AP",
    ownerTeam: "Edge",
    status: "Awaiting verification",
    due: "19 Jul · 12:00",
    dueDays: 3,
    discovered: "13 Jul 2026",
    lastSeen: "16 Jul 2026 · 08:02",
    ticket: "EDGE-221",
    comments: 2,
    priorityFactors: [
      { label: "Exploit", value: "Control gap", detail: "The issue is a configuration drift signal, not a known exploited CVE.", tone: "neutral" },
      { label: "Reachability", value: "Public", detail: "The gateway is reachable by partner traffic.", tone: "warning" },
      { label: "Criticality", value: "Important", detail: "The service supports partner integrations but not the control plane.", tone: "info" },
      { label: "Impact", value: "Moderate", detail: "The misconfiguration could widen outbound resolution paths.", tone: "info" },
      { label: "Controls", value: "Fix applied", detail: "A configuration change is staged; a fresh posture check is due.", tone: "success" },
    ],
    remediation: [
      "Deploy the approved resolver configuration to the partner gateway.",
      "Run the cloud posture check against the active load balancer.",
      "Attach the policy diff as verification evidence.",
    ],
    riskReduction: 1.2,
  },
  {
    id: "exposure-kubernetes",
    title: "Kubernetes dashboard anonymous access",
    cve: "CFG-2026-038",
    source: "Demo import · Cloud posture",
    sourceUpdated: "27 min ago",
    severity: "Medium",
    score: 6.1,
    riskWeight: 1.9,
    ssvcOutcome: "Attend",
    exploitSignal: "Internet exposure",
    exploitLabel: "Reachability signal",
    kev: false,
    reachability: "Internet reachable",
    asset: "ops-cluster-01",
    service: "Kubernetes admin",
    environment: "Staging",
    criticality: "Important",
    dataClass: "Operational metadata",
    owner: "Noah Chen",
    ownerInitials: "NC",
    ownerTeam: "Platform",
    status: "Assigned",
    due: "24 Jul · 12:00",
    dueDays: 8,
    discovered: "12 Jul 2026",
    lastSeen: "16 Jul 2026 · 07:58",
    ticket: "PLAT-899",
    comments: 1,
    priorityFactors: [
      { label: "Exploit", value: "Reachability", detail: "The control is exposed, but no exploitation signal is present.", tone: "warning" },
      { label: "Reachability", value: "Public", detail: "The staging endpoint is currently discoverable from the internet.", tone: "warning" },
      { label: "Criticality", value: "Important", detail: "Staging shares limited deployment credentials with production.", tone: "info" },
      { label: "Impact", value: "Moderate", detail: "The environment contains operational metadata and deploy hooks.", tone: "info" },
      { label: "Controls", value: "Namespace limits", detail: "RBAC limits cluster actions, but anonymous access remains a gap.", tone: "success" },
    ],
    remediation: [
      "Disable anonymous dashboard access in the cluster policy.",
      "Rotate the shared deployment token after the change.",
      "Verify an unauthenticated request is rejected from outside the admin VPN.",
    ],
    riskReduction: 1.0,
  },
  {
    id: "exposure-postgres",
    title: "Postgres extension privilege drift",
    cve: "CFG-2026-027",
    source: "Demo import · Cloud posture",
    sourceUpdated: "27 min ago",
    severity: "Low",
    score: 4.8,
    riskWeight: 0,
    ssvcOutcome: "Track*",
    exploitSignal: "No exploit signal",
    exploitLabel: "No known activity",
    kev: false,
    reachability: "Internal only",
    asset: "orders-db-03",
    service: "Orders database",
    environment: "Production",
    criticality: "Important",
    dataClass: "Order metadata",
    owner: "Ava Patel",
    ownerInitials: "AP",
    ownerTeam: "Data",
    status: "Verified",
    due: "Verified · 15 Jul",
    dueDays: -1,
    discovered: "09 Jul 2026",
    lastSeen: "15 Jul 2026 · 15:20",
    ticket: "DATA-122",
    comments: 3,
    priorityFactors: [
      { label: "Exploit", value: "No signal", detail: "No known exploitation signal is present.", tone: "neutral" },
      { label: "Reachability", value: "Internal", detail: "The database is not reachable from the public network.", tone: "info" },
      { label: "Criticality", value: "Important", detail: "The service supports ordering but has no direct admin exposure.", tone: "info" },
      { label: "Impact", value: "Low", detail: "The drift was scoped to a non-production extension role.", tone: "success" },
      { label: "Controls", value: "Verified", detail: "A posture check confirmed the role is now least-privileged.", tone: "success" },
    ],
    remediation: [
      "Revoke the extension role’s create privilege.",
      "Attach the successful policy check to the data workstream.",
    ],
    riskReduction: 0.9,
  },
]

export const activitySeed: ActivityItem[] = [
  {
    id: "activity-1",
    actor: "Mia Park",
    initials: "MP",
    message: "Moved GitLab password reset bypass to fixing",
    time: "18 min ago",
    tone: "blue",
  },
  {
    id: "activity-2",
    actor: "Ava Patel",
    initials: "AP",
    message: "Submitted verification for Nginx resolver drift",
    time: "42 min ago",
    tone: "green",
  },
  {
    id: "activity-3",
    actor: "Clearline",
    initials: "CL",
    message: "Refreshed 128 observations from demo sources",
    time: "1 hr ago",
    tone: "amber",
  },
  {
    id: "activity-4",
    actor: "Sam Osei",
    initials: "SO",
    message: "Claimed Ivanti gateway command injection",
    time: "2 hr ago",
    tone: "gray",
  },
]
