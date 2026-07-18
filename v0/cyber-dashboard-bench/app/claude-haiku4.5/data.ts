export type Alert = {
  id: string
  ruleId: string
  severity: "critical" | "high" | "medium" | "low"
  timestamp: Date
  title: string
  description: string
  sourceId: string
  riskScore: number
  status: "new" | "investigating" | "false_positive" | "resolved"
  context: {
    asset: {
      hostname: string
      os: string
      ip: string
      criticality: "critical" | "high" | "medium" | "low"
    }
    user?: {
      username: string
      email: string
      department: string
      isPrivileged: boolean
    }
    threatIntel?: string[]
    relatedEventCount: number
  }
  assignedTo?: string
  notes?: string
}

export type Incident = {
  id: string
  title: string
  status: "open" | "in_progress" | "resolved" | "false_positive"
  severity: "critical" | "high" | "medium" | "low"
  alertIds: string[]
  timelineEvents: TimelineEvent[]
  assignedTo?: string
  notes: string
  createdAt: Date
  updatedAt: Date
}

export type TimelineEvent = {
  id: string
  timestamp: Date
  type: "process_execution" | "network_connection" | "file_access" | "login" | "lateral_movement"
  source: string
  details: string
  severity: "critical" | "high" | "medium" | "low"
}

export type Rule = {
  id: string
  name: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  enabled: boolean
  alertCount24h: number
  falsePositiveRate: number
  lastAdjustedAt: Date
}

// Demo Alerts
export const demoAlerts: Alert[] = [
  {
    id: "alert-001",
    ruleId: "rule-failed-logins",
    severity: "high",
    timestamp: new Date(Date.now() - 5 * 60000),
    title: "Failed Login Attempts from Unusual IP",
    description: "User john.doe@company.com attempted to log in 15 times from IP 185.220.100.45 (Tor exit node) within 5 minutes at 2:47 AM",
    sourceId: "azure_ad",
    riskScore: 88,
    status: "new",
    context: {
      asset: {
        hostname: "login.company.com",
        os: "Linux",
        ip: "10.0.1.25",
        criticality: "critical",
      },
      user: {
        username: "john.doe",
        email: "john.doe@company.com",
        department: "Engineering",
        isPrivileged: false,
      },
      threatIntel: ["Tor exit node", "Previous failed login patterns"],
      relatedEventCount: 24,
    },
  },
  {
    id: "alert-002",
    ruleId: "rule-suspicious-process",
    severity: "critical",
    timestamp: new Date(Date.now() - 12 * 60000),
    title: "Suspicious Process Execution: psexec.exe",
    description: "Process psexec.exe executed from System32 directory by SYSTEM account on PROD-DB-01. Command line: psexec.exe \\\\10.0.2.15 -s cmd.exe",
    sourceId: "crowdstrike",
    riskScore: 95,
    status: "new",
    context: {
      asset: {
        hostname: "PROD-DB-01",
        os: "Windows Server 2022",
        ip: "10.0.2.18",
        criticality: "critical",
      },
      user: {
        username: "SYSTEM",
        email: "system@company.local",
        department: "System",
        isPrivileged: true,
      },
      threatIntel: ["Lateral movement indicator", "T1021.006 - Remote Service Session Initiation (PsExec)"],
      relatedEventCount: 42,
    },
  },
  {
    id: "alert-003",
    ruleId: "rule-data-exfil",
    severity: "high",
    timestamp: new Date(Date.now() - 18 * 60000),
    title: "Unusual Data Transfer Volume Detected",
    description: "Host DEV-LAPTOP-08 transferred 2.3GB of data to IP 203.0.113.44 (external, non-whitelisted) over HTTPS on port 443 within 1 hour. Average transfer for this host is 50MB/day.",
    sourceId: "datadog",
    riskScore: 82,
    status: "new",
    context: {
      asset: {
        hostname: "DEV-LAPTOP-08",
        os: "Windows 11",
        ip: "192.168.1.108",
        criticality: "medium",
      },
      user: {
        username: "sarah.chen",
        email: "sarah.chen@company.com",
        department: "Development",
        isPrivileged: false,
      },
      threatIntel: ["External IP has no reputation", "Data exfiltration pattern"],
      relatedEventCount: 8,
    },
  },
  {
    id: "alert-004",
    ruleId: "rule-privilege-escalation",
    severity: "high",
    timestamp: new Date(Date.now() - 25 * 60000),
    title: "Privilege Escalation Attempt Detected",
    description: "Process cmd.exe executed by user mike.johnson with attempt to call whoami /groups to enumerate privileges on host APP-SERVER-03. This user does not typically execute administrative commands.",
    sourceId: "crowdstrike",
    riskScore: 79,
    status: "new",
    context: {
      asset: {
        hostname: "APP-SERVER-03",
        os: "Windows Server 2022",
        ip: "10.0.3.42",
        criticality: "high",
      },
      user: {
        username: "mike.johnson",
        email: "mike.johnson@company.com",
        department: "Operations",
        isPrivileged: false,
      },
      threatIntel: ["Privilege escalation indicator", "T1033 - System Owner/User Discovery"],
      relatedEventCount: 12,
    },
  },
  {
    id: "alert-005",
    ruleId: "rule-failed-logins",
    severity: "medium",
    timestamp: new Date(Date.now() - 35 * 60000),
    title: "Multiple Failed Login Attempts",
    description: "User emily.wilson@company.com failed to log in 4 times within 10 minutes from IP 192.168.1.50. Failed logins due to incorrect password.",
    sourceId: "azure_ad",
    riskScore: 42,
    status: "new",
    context: {
      asset: {
        hostname: "login.company.com",
        os: "Linux",
        ip: "10.0.1.25",
        criticality: "critical",
      },
      user: {
        username: "emily.wilson",
        email: "emily.wilson@company.com",
        department: "Finance",
        isPrivileged: false,
      },
      threatIntel: [],
      relatedEventCount: 4,
    },
  },
  {
    id: "alert-006",
    ruleId: "rule-malware-signature",
    severity: "medium",
    timestamp: new Date(Date.now() - 42 * 60000),
    title: "File Created Matching Known Malware Signature",
    description: "File mimikatz.exe detected on host SEC-TEST-01 in C:\\\\Temp directory. File signature matches known attack tool (Mimikatz credential dumper). This host is in the security testing lab.",
    sourceId: "crowdstrike",
    riskScore: 38,
    status: "new",
    context: {
      asset: {
        hostname: "SEC-TEST-01",
        os: "Windows 10",
        ip: "10.0.4.201",
        criticality: "low",
      },
      threatIntel: ["Mimikatz - credential dumper", "Known testing tool"],
      relatedEventCount: 2,
    },
  },
  {
    id: "alert-007",
    ruleId: "rule-backup-sync",
    severity: "low",
    timestamp: new Date(Date.now() - 52 * 60000),
    title: "Large File Sync to Cloud Storage",
    description: "Host BACKUP-SERVER-01 synced 15GB to AWS S3 bucket 's3://company-backups/' at 01:30 AM. This is the scheduled daily backup. Expected and normal activity.",
    sourceId: "datadog",
    riskScore: 18,
    status: "new",
    context: {
      asset: {
        hostname: "BACKUP-SERVER-01",
        os: "Linux",
        ip: "10.0.5.10",
        criticality: "high",
      },
      threatIntel: [],
      relatedEventCount: 1,
    },
  },
  {
    id: "alert-008",
    ruleId: "rule-vuln-scan",
    severity: "low",
    timestamp: new Date(Date.now() - 65 * 60000),
    title: "Network Scanner Detected",
    description: "Nessus vulnerability scanner (10.0.1.100) performed network scan of subnet 10.0.3.0/24. This is scheduled weekly vulnerability assessment. Expected activity.",
    sourceId: "datadog",
    riskScore: 15,
    status: "new",
    context: {
      asset: {
        hostname: "NESSUS-SCANNER",
        os: "Linux",
        ip: "10.0.1.100",
        criticality: "medium",
      },
      threatIntel: [],
      relatedEventCount: 0,
    },
  },
]

// Demo Incidents
export const demoIncidents: Incident[] = [
  {
    id: "incident-001",
    title: "Potential Account Compromise: john.doe@company.com",
    status: "in_progress",
    severity: "high",
    alertIds: ["alert-001"],
    timelineEvents: [
      {
        id: "event-001",
        timestamp: new Date(Date.now() - 25 * 60000),
        type: "login",
        source: "Azure AD",
        details: "Failed login attempt from 185.220.100.45 (Tor exit node)",
        severity: "high",
      },
      {
        id: "event-002",
        timestamp: new Date(Date.now() - 24 * 60000),
        type: "login",
        source: "Azure AD",
        details: "Failed login attempt from 185.220.100.45",
        severity: "high",
      },
      {
        id: "event-003",
        timestamp: new Date(Date.now() - 23 * 60000),
        type: "login",
        source: "Azure AD",
        details: "Failed login attempt from 185.220.100.45",
        severity: "high",
      },
      {
        id: "event-004",
        timestamp: new Date(Date.now() - 20 * 60000),
        type: "login",
        source: "Azure AD",
        details: "Successful login from 192.168.1.50 (office IP) - normal location",
        severity: "low",
      },
      {
        id: "event-005",
        timestamp: new Date(Date.now() - 18 * 60000),
        type: "file_access",
        source: "Crowdstrike",
        details: "Access to sensitive documents in /Finance/Budget folder",
        severity: "medium",
      },
    ],
    assignedTo: "Security Team",
    notes: "User credential may be compromised. Failed login attempts from Tor node at 2:47 AM. Recommend password reset and review recent file access.",
    createdAt: new Date(Date.now() - 25 * 60000),
    updatedAt: new Date(Date.now() - 5 * 60000),
  },
]

// Demo Rules
export const demoRules: Rule[] = [
  {
    id: "rule-failed-logins",
    name: "Failed Login Attempts > 3 in 5 min",
    description: "Alerts when a user fails to log in more than 3 times within 5 minutes",
    severity: "high",
    enabled: true,
    alertCount24h: 24,
    falsePositiveRate: 0.78,
    lastAdjustedAt: new Date(Date.now() - 3 * 24 * 60 * 60000),
  },
  {
    id: "rule-suspicious-process",
    name: "Suspicious Process Execution: psexec.exe",
    description: "Alerts when psexec or other lateral movement tools are executed",
    severity: "critical",
    enabled: true,
    alertCount24h: 1,
    falsePositiveRate: 0.05,
    lastAdjustedAt: new Date(Date.now() - 7 * 24 * 60 * 60000),
  },
  {
    id: "rule-data-exfil",
    name: "Unusual Data Transfer Volume",
    description: "Alerts when data transfer volume exceeds baseline by 10x for a host",
    severity: "high",
    enabled: true,
    alertCount24h: 3,
    falsePositiveRate: 0.33,
    lastAdjustedAt: new Date(Date.now() - 5 * 24 * 60 * 60000),
  },
  {
    id: "rule-privilege-escalation",
    name: "Privilege Escalation Attempt",
    description: "Alerts when non-admin users attempt to check or escalate privileges",
    severity: "high",
    enabled: true,
    alertCount24h: 5,
    falsePositiveRate: 0.4,
    lastAdjustedAt: new Date(Date.now() - 2 * 24 * 60 * 60000),
  },
  {
    id: "rule-malware-signature",
    name: "File Matching Known Malware Signature",
    description: "Alerts when files matching known malware signatures are detected",
    severity: "medium",
    enabled: true,
    alertCount24h: 2,
    falsePositiveRate: 0.25,
    lastAdjustedAt: new Date(Date.now() - 10 * 24 * 60 * 60000),
  },
  {
    id: "rule-backup-sync",
    name: "Large File Sync to Cloud Storage",
    description: "Alerts when file transfers to cloud storage exceed 5GB",
    severity: "low",
    enabled: true,
    alertCount24h: 8,
    falsePositiveRate: 0.95,
    lastAdjustedAt: new Date(Date.now() - 1 * 24 * 60 * 60000),
  },
  {
    id: "rule-vuln-scan",
    name: "Network Scanner Detected",
    description: "Alerts when network scanning tools are detected",
    severity: "low",
    enabled: true,
    alertCount24h: 2,
    falsePositiveRate: 0.8,
    lastAdjustedAt: new Date(Date.now() - 14 * 24 * 60 * 60000),
  },
]

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "text-red-600 bg-red-50 border-red-200"
    case "high":
      return "text-orange-600 bg-orange-50 border-orange-200"
    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "low":
      return "text-blue-600 bg-blue-50 border-blue-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

export const getRiskColor = (riskScore: number) => {
  if (riskScore >= 80) return "#dc2626" // red
  if (riskScore >= 60) return "#ea580c" // orange
  if (riskScore >= 40) return "#eab308" // yellow
  return "#3b82f6" // blue
}

export const formatTime = (date: Date) => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return "just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
  return `${Math.floor(diffMins / 1440)}d ago`
}
