export type ExposureStatus = "new" | "triaged" | "assigned" | "accepted" | "mitigated"
export type Owner = "Platform" | "Identity" | "Payments" | "IT Ops" | "Unassigned"

export type Exposure = {
  id: string
  title: string
  asset: string
  service: string
  owner: Owner
  status: ExposureStatus
  risk: number
  epss: number
  cvss: number
  internetFacing: boolean
  kev: boolean
  ransomware: boolean
  sensitiveData: boolean
  blastRadius: number
  due: string
  lastSeen: string
  cves: string[]
  attackPath: string[]
  evidence: string[]
  recommendation: string
  ticket: string
}

export const owners: Owner[] = [
  "Unassigned",
  "Platform",
  "Identity",
  "Payments",
  "IT Ops",
]

export const exposures: Exposure[] = [
  {
    id: "EXP-1048",
    title: "Public VPN appliance with KEV remote-code-execution chain",
    asset: "vpn-edge-02.prod.example",
    service: "Remote access",
    owner: "IT Ops",
    status: "new",
    risk: 96,
    epss: 0.94,
    cvss: 9.8,
    internetFacing: true,
    kev: true,
    ransomware: true,
    sensitiveData: false,
    blastRadius: 2200,
    due: "Today 18:00",
    lastSeen: "7 min ago",
    cves: ["CVE-2025-24813", "CVE-2024-3400"],
    attackPath: ["Internet", "VPN appliance", "Domain sync service", "Employee laptops"],
    evidence: [
      "Observed on CISA KEV input and scanner plugin Q-9012.",
      "Asset accepts traffic from 0.0.0.0/0 and terminates privileged remote sessions.",
      "Exploit chatter and ransomware association raise emergency patch priority.",
    ],
    recommendation:
      "Apply vendor hotfix, rotate VPN service credentials, and temporarily restrict source networks until validation scan passes.",
    ticket: "SEC-4219",
  },
  {
    id: "EXP-1039",
    title: "Payment API container exposes critical library with reachable route",
    asset: "pay-api-us-east-1",
    service: "Checkout",
    owner: "Payments",
    status: "triaged",
    risk: 89,
    epss: 0.81,
    cvss: 9.1,
    internetFacing: true,
    kev: false,
    ransomware: false,
    sensitiveData: true,
    blastRadius: 640000,
    due: "Tomorrow 12:00",
    lastSeen: "28 min ago",
    cves: ["CVE-2025-29927"],
    attackPath: ["Internet", "API gateway", "Payment service", "Token vault"],
    evidence: [
      "Runtime inventory confirms vulnerable package is loaded in the production pod.",
      "Route trace reaches checkout callback without authentication before validation.",
      "Service tag maps to PCI revenue path and customer payment metadata.",
    ],
    recommendation:
      "Deploy patched base image, verify callback auth middleware, and run a focused route regression before release.",
    ticket: "SEC-4198",
  },
  {
    id: "EXP-1027",
    title: "Overprivileged CI role can read production secrets",
    asset: "github-actions-prod-deploy",
    service: "Build pipeline",
    owner: "Platform",
    status: "assigned",
    risk: 82,
    epss: 0.42,
    cvss: 8.8,
    internetFacing: false,
    kev: false,
    ransomware: false,
    sensitiveData: true,
    blastRadius: 84,
    due: "Fri 15:00",
    lastSeen: "1 hr ago",
    cves: [],
    attackPath: ["Developer account", "CI role", "Secrets manager", "Production deploy"],
    evidence: [
      "Identity graph shows wildcard secretsmanager:GetSecretValue permission.",
      "Role is assumable from pull-request automation with broad repository scope.",
      "No production break-glass approval event was found in the last 30 days.",
    ],
    recommendation:
      "Split deploy and secret-read roles, scope secret ARNs by service, and require approval for production assumption.",
    ticket: "SEC-4144",
  },
  {
    id: "EXP-1018",
    title: "Legacy admin portal lacks MFA for privileged users",
    asset: "admin-legacy.internal",
    service: "Back office",
    owner: "Identity",
    status: "new",
    risk: 74,
    epss: 0.18,
    cvss: 7.5,
    internetFacing: false,
    kev: false,
    ransomware: false,
    sensitiveData: true,
    blastRadius: 190,
    due: "Mon 17:00",
    lastSeen: "2 hr ago",
    cves: [],
    attackPath: ["Compromised employee", "Admin portal", "Customer support records"],
    evidence: [
      "SSO policy exemption allows password-only login for 14 privileged accounts.",
      "Application contains customer support notes and refund controls.",
      "Identity provider logs show two dormant accounts still enabled.",
    ],
    recommendation:
      "Remove SSO exemption, force MFA enrollment, and disable dormant privileged accounts after owner confirmation.",
    ticket: "SEC-4086",
  },
  {
    id: "EXP-1006",
    title: "Development database snapshot remains publicly addressable",
    asset: "dev-analytics-snapshot",
    service: "Analytics",
    owner: "Unassigned",
    status: "new",
    risk: 67,
    epss: 0.09,
    cvss: 6.5,
    internetFacing: true,
    kev: false,
    ransomware: false,
    sensitiveData: false,
    blastRadius: 26,
    due: "Wed 11:00",
    lastSeen: "3 hr ago",
    cves: [],
    attackPath: ["Internet", "Database snapshot", "Synthetic analytics data"],
    evidence: [
      "Cloud posture scanner found public security group ingress on port 5432.",
      "Data classifier reports synthetic data only, but asset lacks an owner tag.",
      "No backup retention exception is attached to the resource.",
    ],
    recommendation:
      "Close public ingress, attach analytics owner tag, and expire the snapshot if it is not tied to an active test plan.",
    ticket: "SEC-4012",
  },
]

export const riskTrend = [
  { day: "Mon", critical: 18, accepted: 4 },
  { day: "Tue", critical: 22, accepted: 5 },
  { day: "Wed", critical: 20, accepted: 7 },
  { day: "Thu", critical: 15, accepted: 8 },
  { day: "Fri", critical: 12, accepted: 6 },
  { day: "Sat", critical: 11, accepted: 5 },
  { day: "Sun", critical: 9, accepted: 5 },
]

export const integrations = [
  { name: "Tenable VM", state: "Demo import", freshness: "9 min" },
  { name: "CISA KEV", state: "Demo import", freshness: "1 hr" },
  { name: "ServiceNow CMDB", state: "Demo import", freshness: "18 min" },
  { name: "Jira", state: "Demo writeback", freshness: "4 min" },
]
