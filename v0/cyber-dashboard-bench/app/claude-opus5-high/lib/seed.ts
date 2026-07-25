/**
 * Seeded demo fixtures for Assay.
 *
 * EVERYTHING IN THIS FILE IS FAKE. No alert, log source, validation record or
 * connector here corresponds to a real system. Technique IDs and names are the
 * real MITRE ATT&CK identifiers so the vocabulary is recognisable; the state
 * attached to them is invented.
 *
 * Determinism matters: the demo renders on the server and again on the client,
 * so every value here is either a literal or produced by the seeded generator
 * below. Nothing calls Date.now() or Math.random().
 */

import type {
  Acceptance,
  Analytic,
  AuditEvent,
  Connector,
  DetectionStrategy,
  LogSource,
  Scenario,
  Tactic,
  Technique,
  Validation,
} from "./types"

/** The demo clock. Shown in the interface so the fixed dates make sense. */
export const NOW = Date.UTC(2026, 6, 24, 9, 12, 0)

export const DAY = 86_400_000
export const HOUR = 3_600_000
export const MIN = 60_000

export const TENANT = "Northwind Financial"
export const CURRENT_USER: Record<string, string> = {
  engineer: "P. Raman",
  manager: "M. Okonjo",
  auditor: "D. Whitfield",
}

/** Crown-jewel asset groups. Blast radius counts how many a technique reaches. */
export const ASSET_GROUPS = [
  "payments-core",
  "customer-pii",
  "corp-identity",
  "prod-cloud",
  "developer-estate",
] as const

export const FRESHNESS_WINDOW_DAYS: Record<number, number> = {
  1: 30,
  2: 60,
  3: 90,
}

/* -------------------------------------------------------------------------- */
/* Deterministic pseudorandom generator (mulberry32)                          */
/* -------------------------------------------------------------------------- */

function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Builds a 14-day volume series. `silentFromDay` drops the tail to zero so a
 * silent source reads as a shape, not a number.
 */
function volumeSeries(
  seed: number,
  base: number,
  jitter: number,
  silentFromDay?: number
): number[] {
  const next = rng(seed)
  const out: number[] = []
  for (let day = 0; day < 14; day += 1) {
    const weekend = day % 7 === 5 || day % 7 === 6
    const scale = weekend ? 0.55 : 1
    const value = Math.round(base * scale * (1 + (next() - 0.5) * jitter))
    out.push(
      silentFromDay !== undefined && day >= silentFromDay ? 0 : Math.max(0, value)
    )
  }
  return out
}

/* -------------------------------------------------------------------------- */
/* Tactics                                                                    */
/* -------------------------------------------------------------------------- */

export const TACTICS: Tactic[] = [
  { id: "TA0001", name: "Initial Access", short: "Initial Access" },
  { id: "TA0002", name: "Execution", short: "Execution" },
  { id: "TA0003", name: "Persistence", short: "Persistence" },
  { id: "TA0004", name: "Privilege Escalation", short: "Priv. Escalation" },
  { id: "TA0005", name: "Defense Evasion", short: "Defense Evasion" },
  { id: "TA0006", name: "Credential Access", short: "Credential Access" },
  { id: "TA0007", name: "Discovery", short: "Discovery" },
  { id: "TA0008", name: "Lateral Movement", short: "Lateral Movement" },
  { id: "TA0009", name: "Collection", short: "Collection" },
  { id: "TA0011", name: "Command and Control", short: "Command & Control" },
  { id: "TA0010", name: "Exfiltration", short: "Exfiltration" },
  { id: "TA0040", name: "Impact", short: "Impact" },
]

/* -------------------------------------------------------------------------- */
/* Log sources                                                                */
/* -------------------------------------------------------------------------- */

const RC_2025 = "Red Canary Threat Detection Report 2025 — top techniques"
const INTERNAL = "Northwind threat profile, Q2 2026 (fixture)"

export const LOG_SOURCES: LogSource[] = [
  {
    id: "okta-system-log",
    name: "Okta System Log",
    vendor: "Okta",
    kind: "identity",
    status: "silent",
    lastEventAt: NOW - 6 * DAY - 4 * HOUR,
    expectedIntervalMin: 5,
    parseErrorRate: 0,
    volume14d: volumeSeries(101, 184_000, 0.22, 8),
    owner: "Identity platform",
    note: "Event hook stopped after the 18 Jul tenant migration. No error was raised.",
  },
  {
    id: "entra-signin",
    name: "Entra ID sign-in logs",
    vendor: "Microsoft",
    kind: "identity",
    status: "healthy",
    lastEventAt: NOW - 3 * MIN,
    expectedIntervalMin: 5,
    parseErrorRate: 0.002,
    volume14d: volumeSeries(102, 96_000, 0.18),
    owner: "Identity platform",
  },
  {
    id: "edr-crowdstrike",
    name: "CrowdStrike Falcon telemetry",
    vendor: "CrowdStrike",
    kind: "endpoint",
    status: "healthy",
    lastEventAt: NOW - 1 * MIN,
    expectedIntervalMin: 2,
    parseErrorRate: 0.001,
    volume14d: volumeSeries(103, 2_400_000, 0.12),
    owner: "Endpoint team",
  },
  {
    id: "win-security-4688",
    name: "Windows Security 4688",
    vendor: "Microsoft",
    kind: "endpoint",
    status: "degraded",
    lastEventAt: NOW - 6 * MIN,
    expectedIntervalMin: 10,
    parseErrorRate: 0.041,
    volume14d: volumeSeries(104, 640_000, 0.3),
    owner: "Endpoint team",
    note: "4.1% parse failures since the 21 Jul agent update. Command line field is truncated.",
  },
  {
    id: "sysmon",
    name: "Sysmon operational",
    vendor: "Microsoft / Sysinternals",
    kind: "endpoint",
    status: "healthy",
    lastEventAt: NOW - 2 * MIN,
    expectedIntervalMin: 5,
    parseErrorRate: 0.004,
    volume14d: volumeSeries(105, 1_150_000, 0.15),
    owner: "Endpoint team",
  },
  {
    id: "aws-cloudtrail",
    name: "AWS CloudTrail (3 accounts)",
    vendor: "Amazon Web Services",
    kind: "cloud-audit",
    status: "healthy",
    lastEventAt: NOW - 4 * MIN,
    expectedIntervalMin: 15,
    parseErrorRate: 0.0,
    volume14d: volumeSeries(106, 310_000, 0.2),
    owner: "Cloud platform",
  },
  {
    id: "k8s-audit",
    name: "Kubernetes API audit",
    vendor: "Amazon EKS",
    kind: "cloud-audit",
    status: "silent",
    lastEventAt: NOW - 21 * DAY,
    expectedIntervalMin: 10,
    parseErrorRate: 0,
    volume14d: volumeSeries(107, 74_000, 0.25, 0),
    owner: "Cloud platform",
    note: "Silent for 21 days. Nobody noticed — this is the failure mode Assay exists for.",
  },
  {
    id: "gws-admin-audit",
    name: "Google Workspace admin audit",
    vendor: "Google",
    kind: "saas",
    status: "degraded",
    lastEventAt: NOW - 22 * MIN,
    expectedIntervalMin: 30,
    parseErrorRate: 0.008,
    volume14d: volumeSeries(108, 21_000, 0.35),
    owner: "Workplace IT",
    note: "Two of three domains reporting. The acquired-entity domain was never onboarded.",
  },
  {
    id: "m365-ual",
    name: "Microsoft 365 unified audit log",
    vendor: "Microsoft",
    kind: "email",
    status: "healthy",
    lastEventAt: NOW - 8 * MIN,
    expectedIntervalMin: 15,
    parseErrorRate: 0.003,
    volume14d: volumeSeries(109, 430_000, 0.18),
    owner: "Workplace IT",
  },
  {
    id: "zscaler-web",
    name: "Zscaler web proxy",
    vendor: "Zscaler",
    kind: "network",
    status: "silent",
    lastEventAt: NOW - 2 * DAY - 7 * HOUR,
    expectedIntervalMin: 5,
    parseErrorRate: 0,
    volume14d: volumeSeries(110, 880_000, 0.2, 12),
    owner: "Network team",
    note: "Log streaming service stopped after a certificate rotation on 22 Jul.",
  },
  {
    id: "netflow-core",
    name: "Core NetFlow",
    vendor: "Cisco",
    kind: "network",
    status: "healthy",
    lastEventAt: NOW - 1 * MIN,
    expectedIntervalMin: 5,
    parseErrorRate: 0.011,
    volume14d: volumeSeries(111, 5_200_000, 0.1),
    owner: "Network team",
  },
]

/* -------------------------------------------------------------------------- */
/* Techniques                                                                 */
/* -------------------------------------------------------------------------- */

type TechniqueSeed = [
  id: string,
  name: string,
  tacticId: string,
  tier: 1 | 2 | 3,
  threatWeight: number,
  assets: string[],
  platforms: string[],
  threatRank?: number,
]

const TECHNIQUE_SEED: TechniqueSeed[] = [
  // Initial Access
  ["T1078.004", "Valid Accounts: Cloud Accounts", "TA0001", 1, 1.0, ["corp-identity", "prod-cloud", "customer-pii", "payments-core"], ["IaaS", "SaaS", "Identity Provider"], 1],
  ["T1566.001", "Phishing: Spearphishing Attachment", "TA0001", 1, 0.82, ["corp-identity", "developer-estate"], ["Windows", "macOS"]],
  ["T1566.002", "Phishing: Spearphishing Link", "TA0001", 1, 0.84, ["corp-identity", "customer-pii"], ["Windows", "macOS", "SaaS"]],
  ["T1190", "Exploit Public-Facing Application", "TA0001", 1, 0.78, ["payments-core", "customer-pii", "prod-cloud"], ["Linux", "Windows", "Containers"]],
  ["T1133", "External Remote Services", "TA0001", 2, 0.61, ["corp-identity", "prod-cloud"], ["Windows", "Linux"]],
  ["T1195.002", "Supply Chain Compromise: Software Supply Chain", "TA0001", 3, 0.44, ["developer-estate"], ["Linux", "Windows"]],

  // Execution
  ["T1059.001", "Command and Scripting Interpreter: PowerShell", "TA0002", 1, 0.96, ["corp-identity", "developer-estate", "payments-core"], ["Windows"], 2],
  ["T1059.003", "Command and Scripting Interpreter: Windows Command Shell", "TA0002", 1, 0.92, ["corp-identity", "developer-estate"], ["Windows"], 3],
  ["T1047", "Windows Management Instrumentation", "TA0002", 1, 0.79, ["corp-identity", "developer-estate"], ["Windows"], 7],
  ["T1204.004", "User Execution: Malicious Copy and Paste", "TA0002", 1, 0.76, ["corp-identity"], ["Windows", "macOS"], 8],
  ["T1059.004", "Command and Scripting Interpreter: Unix Shell", "TA0002", 2, 0.58, ["prod-cloud", "developer-estate"], ["Linux", "macOS"]],
  ["T1053.005", "Scheduled Task/Job: Scheduled Task", "TA0002", 2, 0.55, ["corp-identity"], ["Windows"]],

  // Persistence
  ["T1098.001", "Account Manipulation: Additional Cloud Credentials", "TA0003", 1, 0.86, ["prod-cloud", "corp-identity", "payments-core"], ["IaaS", "SaaS"]],
  ["T1136.003", "Create Account: Cloud Account", "TA0003", 2, 0.63, ["prod-cloud", "corp-identity"], ["IaaS", "SaaS"]],
  ["T1547.001", "Boot or Logon Autostart: Registry Run Keys", "TA0003", 2, 0.5, ["corp-identity"], ["Windows"]],
  ["T1505.003", "Server Software Component: Web Shell", "TA0003", 2, 0.66, ["payments-core", "prod-cloud"], ["Linux", "Windows"]],

  // Privilege Escalation
  ["T1548.002", "Abuse Elevation Control: Bypass User Account Control", "TA0004", 2, 0.52, ["corp-identity"], ["Windows"]],
  ["T1068", "Exploitation for Privilege Escalation", "TA0004", 2, 0.6, ["prod-cloud", "payments-core"], ["Windows", "Linux"]],
  ["T1484.002", "Domain or Tenant Policy Modification: Trust Modification", "TA0004", 2, 0.64, ["corp-identity"], ["Identity Provider", "Windows"]],

  // Defense Evasion
  ["T1027", "Obfuscated Files or Information", "TA0005", 1, 0.72, ["corp-identity", "developer-estate"], ["Windows", "Linux", "macOS"], 10],
  ["T1562.001", "Impair Defenses: Disable or Modify Tools", "TA0005", 1, 0.8, ["corp-identity", "prod-cloud", "payments-core"], ["Windows", "Linux"]],
  ["T1556.006", "Modify Authentication Process: Multi-Factor Authentication", "TA0005", 1, 0.83, ["corp-identity", "payments-core"], ["Identity Provider", "SaaS"]],
  ["T1564.008", "Hide Artifacts: Email Hiding Rules", "TA0005", 1, 0.7, ["customer-pii", "corp-identity"], ["Office Suite"], 9],
  ["T1218.005", "System Binary Proxy Execution: Mshta", "TA0005", 2, 0.54, ["corp-identity"], ["Windows"]],
  ["T1070.004", "Indicator Removal: File Deletion", "TA0005", 3, 0.4, ["corp-identity"], ["Windows", "Linux"]],

  // Credential Access
  ["T1003.001", "OS Credential Dumping: LSASS Memory", "TA0006", 1, 0.88, ["corp-identity", "payments-core"], ["Windows"]],
  ["T1555.003", "Credentials from Password Stores: Web Browsers", "TA0006", 1, 0.81, ["corp-identity", "customer-pii"], ["Windows", "macOS"]],
  ["T1621", "Multi-Factor Authentication Request Generation", "TA0006", 1, 0.77, ["corp-identity"], ["Identity Provider", "SaaS"]],
  ["T1110.003", "Brute Force: Password Spraying", "TA0006", 2, 0.62, ["corp-identity"], ["Identity Provider", "SaaS"]],
  ["T1552.001", "Unsecured Credentials: Credentials In Files", "TA0006", 2, 0.57, ["developer-estate", "prod-cloud"], ["Linux", "Windows", "IaaS"]],

  // Discovery
  ["T1087.004", "Account Discovery: Cloud Account", "TA0007", 2, 0.5, ["prod-cloud", "corp-identity"], ["IaaS", "SaaS"]],
  ["T1526", "Cloud Service Discovery", "TA0007", 2, 0.47, ["prod-cloud"], ["IaaS", "SaaS"]],
  ["T1069.003", "Permission Groups Discovery: Cloud Groups", "TA0007", 3, 0.38, ["prod-cloud", "corp-identity"], ["IaaS", "SaaS"]],
  ["T1018", "Remote System Discovery", "TA0007", 3, 0.35, ["corp-identity"], ["Windows", "Linux"]],

  // Lateral Movement
  ["T1021.001", "Remote Services: Remote Desktop Protocol", "TA0008", 1, 0.74, ["corp-identity", "payments-core"], ["Windows"]],
  ["T1550.001", "Alternate Authentication Material: Application Access Token", "TA0008", 1, 0.79, ["prod-cloud", "corp-identity", "customer-pii"], ["SaaS", "IaaS"]],
  ["T1021.007", "Remote Services: Cloud Services", "TA0008", 2, 0.6, ["prod-cloud"], ["IaaS", "SaaS"]],
  ["T1570", "Lateral Tool Transfer", "TA0008", 3, 0.36, ["corp-identity"], ["Windows", "Linux"]],

  // Collection
  ["T1530", "Data from Cloud Storage", "TA0009", 1, 0.9, ["customer-pii", "payments-core", "prod-cloud"], ["IaaS", "SaaS"], 4],
  ["T1114.003", "Email Collection: Email Forwarding Rule", "TA0009", 1, 0.85, ["customer-pii", "corp-identity"], ["Office Suite"], 6],
  ["T1213.002", "Data from Information Repositories: SharePoint", "TA0009", 2, 0.56, ["customer-pii"], ["Office Suite"]],
  ["T1119", "Automated Collection", "TA0009", 3, 0.34, ["customer-pii"], ["Windows", "Linux"]],

  // Command and Control
  ["T1105", "Ingress Tool Transfer", "TA0011", 1, 0.87, ["corp-identity", "developer-estate", "prod-cloud"], ["Windows", "Linux", "macOS"], 5],
  ["T1071.001", "Application Layer Protocol: Web Protocols", "TA0011", 2, 0.65, ["corp-identity", "prod-cloud"], ["Windows", "Linux"]],
  ["T1219", "Remote Access Software", "TA0011", 2, 0.68, ["corp-identity"], ["Windows", "macOS"]],

  // Exfiltration
  ["T1567.002", "Exfiltration Over Web Service: Cloud Storage", "TA0010", 1, 0.75, ["customer-pii", "payments-core"], ["Windows", "Linux", "macOS"]],
  ["T1048.003", "Exfiltration Over Alternative Protocol: Unencrypted", "TA0010", 3, 0.37, ["customer-pii"], ["Windows", "Linux"]],

  // Impact
  ["T1486", "Data Encrypted for Impact", "TA0040", 1, 0.71, ["payments-core", "customer-pii", "prod-cloud"], ["Windows", "Linux"]],
  ["T1490", "Inhibit System Recovery", "TA0040", 2, 0.59, ["payments-core"], ["Windows"]],
  ["T1485", "Data Destruction", "TA0040", 3, 0.39, ["prod-cloud"], ["Windows", "Linux", "IaaS"]],
]

export const TECHNIQUES: Technique[] = TECHNIQUE_SEED.map(
  ([id, name, tacticId, tier, threatWeight, assetGroups, platforms, threatRank], i) => ({
    id,
    name,
    tacticId,
    tier,
    platforms,
    threatWeight,
    threatRank,
    threatSource: threatRank ? RC_2025 : INTERNAL,
    assetGroups,
    strategyId: `DET${String(4000 + i * 7).padStart(4, "0")}`,
  })
)

export const STRATEGIES: DetectionStrategy[] = TECHNIQUES.map((t) => ({
  id: t.strategyId,
  name: `${t.name.split(":").pop()?.trim() ?? t.name} — behavioural strategy`,
  techniqueId: t.id,
}))

/* -------------------------------------------------------------------------- */
/* Analytics                                                                  */
/* -------------------------------------------------------------------------- */

type AnalyticSeed = [
  techniqueId: string,
  title: string,
  platform: string,
  logSourceIds: string[],
  fires: number,
  tp: number,
  fp: number,
  opts?: {
    enabled?: boolean
    missingFields?: string[]
    system?: Analytic["sourceSystem"]
    lastFiredDaysAgo?: number | null
  },
]

const ANALYTIC_SEED: AnalyticSeed[] = [
  // T1078.004 — the technique at the centre of the seeded incident
  ["T1078.004", "Impossible travel on privileged cloud account", "Identity Provider", ["okta-system-log"], 12, 4, 8, { lastFiredDaysAgo: 9 }],
  ["T1078.004", "New cloud account sign-in from unmanaged device", "Identity Provider", ["okta-system-log", "entra-signin"], 31, 6, 25, { lastFiredDaysAgo: 7 }],
  ["T1078.004", "Root/break-glass account console login", "IaaS", ["aws-cloudtrail"], 3, 3, 0, { lastFiredDaysAgo: 11 }],

  ["T1566.001", "Attachment spawning script interpreter", "Windows", ["edr-crowdstrike", "sysmon"], 22, 5, 17, { lastFiredDaysAgo: 2 }],
  ["T1566.002", "Credential-harvest domain click-through", "SaaS", ["zscaler-web", "m365-ual"], 64, 9, 55, { lastFiredDaysAgo: 3 }],
  ["T1190", "Web application exploitation pattern on edge service", "Linux", ["netflow-core", "k8s-audit"], 8, 2, 6, { lastFiredDaysAgo: 6 }],
  ["T1133", "VPN authentication from new autonomous system", "Windows", ["entra-signin", "netflow-core"], 41, 3, 38, { lastFiredDaysAgo: 1 }],

  ["T1059.001", "Encoded PowerShell command line", "Windows", ["sysmon", "win-security-4688"], 318, 6, 312, { lastFiredDaysAgo: 0 }],
  ["T1059.001", "PowerShell downloading remote content", "Windows", ["sysmon", "edr-crowdstrike"], 47, 11, 36, { lastFiredDaysAgo: 1 }],
  ["T1059.003", "cmd.exe spawned by Office application", "Windows", ["edr-crowdstrike", "sysmon"], 29, 7, 22, { lastFiredDaysAgo: 1 }],
  ["T1047", "WMI process creation from remote host", "Windows", ["win-security-4688"], 0, 0, 0, { missingFields: ["ProcessCommandLine"], lastFiredDaysAgo: null }],
  ["T1204.004", "Clipboard-sourced run dialog execution", "Windows", ["sysmon", "edr-crowdstrike"], 6, 4, 2, { lastFiredDaysAgo: 4 }],
  ["T1059.004", "Reverse shell pattern in container exec", "Linux", ["k8s-audit"], 0, 0, 0, { lastFiredDaysAgo: null }],
  ["T1053.005", "Scheduled task created with encoded payload", "Windows", ["sysmon"], 14, 3, 11, { lastFiredDaysAgo: 5 }],

  ["T1098.001", "Service principal credential added outside change window", "SaaS", ["okta-system-log", "aws-cloudtrail"], 9, 5, 4, { lastFiredDaysAgo: 8 }],
  ["T1136.003", "Cloud account created by non-provisioning identity", "SaaS", ["okta-system-log"], 4, 2, 2, { lastFiredDaysAgo: 14 }],
  ["T1547.001", "Run key written by unsigned binary", "Windows", ["sysmon"], 19, 2, 17, { lastFiredDaysAgo: 2 }],
  ["T1505.003", "Web server process writing executable content", "Linux", ["edr-crowdstrike"], 2, 1, 1, { lastFiredDaysAgo: 17 }],

  ["T1548.002", "UAC bypass via auto-elevating binary", "Windows", ["sysmon"], 11, 1, 10, { lastFiredDaysAgo: 3 }],
  ["T1068", "Kernel exploit indicator on server estate", "Windows", ["edr-crowdstrike"], 1, 1, 0, { lastFiredDaysAgo: 22 }],
  ["T1484.002", "Federation trust modified in identity tenant", "Identity Provider", ["okta-system-log", "entra-signin"], 1, 1, 0, { lastFiredDaysAgo: 30 }],

  ["T1027", "High-entropy command line on endpoint", "Windows", ["win-security-4688", "sysmon"], 402, 3, 399, { lastFiredDaysAgo: 0 }],
  ["T1562.001", "Security agent stopped or uninstalled", "Windows", ["edr-crowdstrike"], 7, 6, 1, { lastFiredDaysAgo: 5 }],
  ["T1556.006", "MFA factor deactivated for privileged user", "Identity Provider", ["okta-system-log"], 5, 4, 1, { lastFiredDaysAgo: 10 }],
  ["T1564.008", "Inbox rule hiding security notifications", "Office Suite", ["m365-ual"], 13, 8, 5, { lastFiredDaysAgo: 2 }],
  ["T1218.005", "mshta.exe executing remote script", "Windows", ["sysmon"], 3, 2, 1, { lastFiredDaysAgo: 12 }],

  ["T1003.001", "LSASS handle access by unexpected process", "Windows", ["edr-crowdstrike", "sysmon"], 16, 9, 7, { lastFiredDaysAgo: 1 }],
  ["T1555.003", "Browser credential store read by non-browser process", "Windows", ["edr-crowdstrike"], 24, 6, 18, { lastFiredDaysAgo: 2 }],
  ["T1621", "Repeated MFA push denials then acceptance", "Identity Provider", ["okta-system-log"], 8, 5, 3, { lastFiredDaysAgo: 7 }],
  ["T1110.003", "Password spray across many accounts, one password", "Identity Provider", ["entra-signin"], 21, 12, 9, { lastFiredDaysAgo: 0 }],
  ["T1552.001", "Secret pattern read from source tree", "Linux", ["edr-crowdstrike"], 5, 1, 4, { lastFiredDaysAgo: 9 }],

  ["T1087.004", "Bulk directory enumeration by single identity", "SaaS", ["okta-system-log", "aws-cloudtrail"], 6, 1, 5, { lastFiredDaysAgo: 13 }],
  ["T1526", "Cloud service inventory API sweep", "IaaS", ["aws-cloudtrail"], 12, 0, 12, { lastFiredDaysAgo: 4 }],

  ["T1021.001", "RDP session from workstation to server segment", "Windows", ["win-security-4688", "netflow-core"], 55, 4, 51, { lastFiredDaysAgo: 0 }],
  ["T1550.001", "OAuth token replay from new address", "SaaS", ["okta-system-log", "m365-ual"], 10, 6, 4, { lastFiredDaysAgo: 8 }],
  ["T1021.007", "Cross-account role assumption outside baseline", "IaaS", ["aws-cloudtrail"], 18, 3, 15, { lastFiredDaysAgo: 2 }],

  ["T1530", "Mass object read from customer data bucket", "IaaS", ["aws-cloudtrail"], 4, 3, 1, { lastFiredDaysAgo: 6 }],
  ["T1530", "Storage bucket policy opened to public", "IaaS", ["aws-cloudtrail"], 2, 2, 0, { lastFiredDaysAgo: 19 }],
  ["T1114.003", "External forwarding rule created on mailbox", "Office Suite", ["m365-ual", "gws-admin-audit"], 11, 7, 4, { lastFiredDaysAgo: 3 }],
  ["T1213.002", "Anomalous SharePoint bulk download", "Office Suite", ["m365-ual"], 9, 2, 7, { lastFiredDaysAgo: 5 }],

  ["T1105", "Binary downloaded to disk by script interpreter", "Windows", ["sysmon", "zscaler-web"], 38, 9, 29, { lastFiredDaysAgo: 3 }],
  ["T1071.001", "Beacon-like periodicity to rare destination", "Windows", ["netflow-core"], 27, 4, 23, { lastFiredDaysAgo: 3 }],
  ["T1219", "Unsanctioned remote access tool executed", "Windows", ["edr-crowdstrike"], 33, 14, 19, { lastFiredDaysAgo: 1 }],

  ["T1567.002", "Large upload to consumer cloud storage", "Windows", ["zscaler-web"], 15, 5, 10, { lastFiredDaysAgo: 3 }],

  ["T1486", "Rapid file rename and encryption pattern", "Windows", ["edr-crowdstrike", "sysmon"], 2, 2, 0, { lastFiredDaysAgo: 26 }],
  ["T1490", "Shadow copy deletion command", "Windows", ["sysmon", "win-security-4688"], 4, 3, 1, { lastFiredDaysAgo: 15 }],
]

function slugFor(techniqueId: string, title: string) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .split("-")
    .slice(0, 5)
    .join("-")
  return `detections/${techniqueId.toLowerCase()}/${slug}.yml`
}

const DATA_COMPONENTS: Record<string, string[]> = {
  identity: ["DC0113 Logon Session Creation", "DC0025 API Call"],
  endpoint: ["DC0009 Process Creation", "DC0017 Command Execution"],
  "cloud-audit": ["DC0025 API Call", "DC0055 Cloud Service Modification"],
  network: ["DC0078 Network Traffic Flow", "DC0085 Network Connection Creation"],
  email: ["DC0025 API Call", "DC0061 Application Log Content"],
  saas: ["DC0025 API Call", "DC0061 Application Log Content"],
}

export const ANALYTICS: Analytic[] = ANALYTIC_SEED.map((seed, i) => {
  const [techniqueId, title, platform, logSourceIds, fires, tp, fp, opts] = seed
  const technique = TECHNIQUES.find((t) => t.id === techniqueId)
  const kinds = new Set(
    logSourceIds.map(
      (id) => LOG_SOURCES.find((s) => s.id === id)?.kind ?? "endpoint"
    )
  )
  const components = new Set<string>()
  kinds.forEach((k) => DATA_COMPONENTS[k]?.forEach((c) => components.add(c)))
  const lastFiredDaysAgo: number | null =
    opts && "lastFiredDaysAgo" in opts ? (opts.lastFiredDaysAgo ?? null) : 3
  return {
    id: `AN${String(10 + i * 3).padStart(4, "0")}`,
    title,
    strategyId: technique?.strategyId ?? "DET0000",
    techniqueId,
    platform,
    enabled: opts?.enabled ?? true,
    sourceSystem: opts?.system ?? (i % 5 === 0 ? "sigma" : "siem-native"),
    repoPath: slugFor(techniqueId, title),
    logSourceIds,
    dataComponents: Array.from(components).slice(0, 3),
    missingFields: opts?.missingFields ?? [],
    fires30d: fires,
    truePositives30d: tp,
    falsePositives30d: fp,
    lastFiredAt:
      lastFiredDaysAgo === null
        ? null
        : NOW - lastFiredDaysAgo * DAY - 5 * HOUR,
  }
})

/* -------------------------------------------------------------------------- */
/* Validation records                                                         */
/* -------------------------------------------------------------------------- */

type ValidationSeed = [
  techniqueId: string,
  daysAgo: number,
  result: Validation["result"],
  method: Validation["method"],
  operator: string,
  testSuffix?: string,
]

const VALIDATION_SEED: ValidationSeed[] = [
  ["T1078.004", 41, "alerted", "atomic", "P. Raman", "3"],
  ["T1078.004", 96, "alerted", "purple", "External — Halberd Labs", "1"],
  ["T1566.001", 12, "alerted", "bas", "Scheduled run", "2"],
  ["T1566.002", 26, "alerted", "bas", "Scheduled run", "4"],
  ["T1190", 74, "logged-only", "purple", "External — Halberd Labs", "1"],
  ["T1133", 58, "alerted", "atomic", "J. Alvarez", "2"],

  ["T1059.001", 9, "alerted", "atomic", "J. Alvarez", "5"],
  ["T1059.003", 11, "alerted", "atomic", "J. Alvarez", "1"],
  ["T1047", 47, "missed", "atomic", "P. Raman", "2"],
  ["T1204.004", 18, "alerted", "manual", "P. Raman", "1"],
  ["T1053.005", 63, "alerted", "atomic", "Scheduled run", "3"],

  ["T1098.001", 34, "alerted", "atomic", "P. Raman", "1"],
  ["T1136.003", 88, "alerted", "atomic", "J. Alvarez", "2"],
  ["T1547.001", 21, "alerted", "atomic", "Scheduled run", "1"],

  ["T1548.002", 55, "alerted", "atomic", "Scheduled run", "6"],
  ["T1484.002", 71, "alerted", "purple", "External — Halberd Labs", "1"],

  ["T1027", 15, "alerted", "atomic", "J. Alvarez", "4"],
  ["T1562.001", 8, "alerted", "bas", "Scheduled run", "1"],
  ["T1556.006", 37, "alerted", "manual", "P. Raman", "1"],
  ["T1564.008", 6, "alerted", "atomic", "Scheduled run", "1"],
  ["T1218.005", 44, "alerted", "atomic", "Scheduled run", "2"],

  ["T1003.001", 4, "alerted", "atomic", "J. Alvarez", "1"],
  ["T1555.003", 13, "alerted", "bas", "Scheduled run", "2"],
  ["T1621", 29, "alerted", "manual", "P. Raman", "1"],
  ["T1110.003", 19, "alerted", "atomic", "Scheduled run", "1"],

  ["T1087.004", 82, "alerted", "atomic", "J. Alvarez", "1"],
  ["T1526", 51, "detected", "atomic", "J. Alvarez", "1"],

  ["T1021.001", 7, "alerted", "atomic", "Scheduled run", "3"],
  ["T1550.001", 39, "alerted", "purple", "External — Halberd Labs", "2"],
  ["T1021.007", 24, "alerted", "atomic", "P. Raman", "1"],

  ["T1530", 33, "alerted", "atomic", "P. Raman", "2"],
  ["T1114.003", 5, "alerted", "atomic", "Scheduled run", "1"],
  ["T1213.002", 66, "alerted", "manual", "J. Alvarez", "1"],

  ["T1105", 10, "alerted", "bas", "Scheduled run", "6"],
  ["T1071.001", 28, "alerted", "bas", "Scheduled run", "2"],
  ["T1219", 3, "alerted", "atomic", "Scheduled run", "1"],

  ["T1567.002", 22, "alerted", "atomic", "P. Raman", "3"],

  ["T1486", 16, "alerted", "bas", "Scheduled run", "1"],
  ["T1490", 49, "alerted", "atomic", "Scheduled run", "1"],
]

export const VALIDATIONS: Validation[] = VALIDATION_SEED.map(
  ([techniqueId, daysAgo, result, method, operator, testSuffix], i) => {
    const analytic = ANALYTICS.find((a) => a.techniqueId === techniqueId)
    return {
      id: `V${String(2100 + i).padStart(4, "0")}`,
      techniqueId,
      analyticId: analytic?.id ?? null,
      method,
      testId:
        method === "atomic"
          ? `${techniqueId}-${testSuffix ?? "1"}`
          : method === "bas"
            ? `BAS-${techniqueId.replace(".", "-")}`
            : method === "purple"
              ? `PT-2026-${String(i + 11).padStart(3, "0")}`
              : `MAN-${techniqueId}`,
      operator,
      ranAt: NOW - daysAgo * DAY - 3 * HOUR,
      result,
      evidenceRef: `evidence/${techniqueId}/${result}-${String(i).padStart(3, "0")}.json`,
      notes:
        result === "logged-only"
          ? "Telemetry captured the behaviour. No alert was generated — the analytic threshold was never reached."
          : result === "missed"
            ? "No telemetry and no alert. The analytic references a field the current schema does not emit."
            : undefined,
    }
  }
)

/* -------------------------------------------------------------------------- */
/* Seeded acceptances, audit trail, scenarios, connectors                     */
/* -------------------------------------------------------------------------- */

export const SEED_ACCEPTANCES: Acceptance[] = [
  {
    findingId: "F-T1195.002",
    techniqueId: "T1195.002",
    reason: "telemetry-unavailable",
    justification:
      "No build-pipeline telemetry reaches the SIEM until the CI migration completes. Reviewed with platform engineering; revisit once the new runner ships audit events.",
    requestedBy: "P. Raman",
    requestedAt: NOW - 62 * DAY,
    approvedBy: "M. Okonjo",
    approvedAt: NOW - 61 * DAY,
    expiresAt: NOW + 3 * DAY,
  },
  {
    findingId: "F-T1119",
    techniqueId: "T1119",
    reason: "compensating-control",
    justification:
      "Data-loss prevention blocks bulk collection at the egress point and is independently monitored. Detection depth here is not worth the analyst cost.",
    requestedBy: "J. Alvarez",
    requestedAt: NOW - 20 * DAY,
    approvedBy: "M. Okonjo",
    approvedAt: NOW - 19 * DAY,
    expiresAt: NOW + 68 * DAY,
  },
]

export const SEED_AUDIT: AuditEvent[] = [
  {
    id: "A0001",
    at: NOW - 62 * DAY,
    actor: "P. Raman",
    role: "engineer",
    action: "acceptance.requested",
    targetType: "finding",
    targetId: "F-T1195.002",
    detail: "Requested acceptance of T1195.002 — telemetry unavailable, 90 days.",
  },
  {
    id: "A0002",
    at: NOW - 61 * DAY,
    actor: "M. Okonjo",
    role: "manager",
    action: "acceptance.approved",
    targetType: "finding",
    targetId: "F-T1195.002",
    detail: "Approved. Requester was P. Raman; separation of duties satisfied.",
  },
  {
    id: "A0003",
    at: NOW - 47 * DAY,
    actor: "P. Raman",
    role: "engineer",
    action: "validation.recorded",
    targetType: "technique",
    targetId: "T1047",
    detail: "Atomic test T1047-2 — result: missed. Analytic references ProcessCommandLine, which 4688 no longer emits.",
  },
  {
    id: "A0004",
    at: NOW - 41 * DAY,
    actor: "P. Raman",
    role: "engineer",
    action: "validation.recorded",
    targetType: "technique",
    targetId: "T1078.004",
    detail: "Atomic test T1078.004-3 — result: alerted. Impossible-travel analytic fired in 94 seconds.",
  },
  {
    id: "A0005",
    at: NOW - 34 * DAY,
    actor: "M. Okonjo",
    role: "manager",
    action: "service-level.edited",
    targetType: "service-level",
    targetId: "tier-1",
    detail: "Tier-1 assurance target set to 85% verified within 30 days.",
  },
  {
    id: "A0006",
    at: NOW - 20 * DAY,
    actor: "J. Alvarez",
    role: "engineer",
    action: "acceptance.requested",
    targetType: "finding",
    targetId: "F-T1119",
    detail: "Requested acceptance of T1119 — compensating control at egress.",
  },
  {
    id: "A0007",
    at: NOW - 19 * DAY,
    actor: "M. Okonjo",
    role: "manager",
    action: "acceptance.approved",
    targetType: "finding",
    targetId: "F-T1119",
    detail: "Approved for 88 days. Requester was J. Alvarez.",
  },
  {
    id: "A0008",
    at: NOW - 11 * DAY,
    actor: "J. Alvarez",
    role: "engineer",
    action: "fix.assigned",
    targetType: "finding",
    targetId: "F-T1027",
    detail: "Assigned to J. Alvarez — tune. Analytic fires 402 times per 30 days with 3 true positives.",
  },
  {
    id: "A0009",
    at: NOW - 6 * DAY - 3 * HOUR,
    actor: "system",
    role: "engineer",
    action: "telemetry.silent",
    targetType: "log-source",
    targetId: "okta-system-log",
    detail:
      "Okta System Log passed its 5-minute heartbeat window with no events. 9 analytics depend on it.",
  },
  {
    id: "A0010",
    at: NOW - 2 * DAY - 6 * HOUR,
    actor: "system",
    role: "engineer",
    action: "telemetry.silent",
    targetType: "log-source",
    targetId: "zscaler-web",
    detail:
      "Zscaler web proxy passed its 5-minute heartbeat window with no events. 3 analytics depend on it.",
  },
  {
    id: "A0011",
    at: NOW - 30 * HOUR,
    actor: "P. Raman",
    role: "engineer",
    action: "fix.assigned",
    targetType: "finding",
    targetId: "F-T1550.001",
    detail: "Assigned to P. Raman — restore telemetry. Blocked by okta-system-log.",
  },
  {
    id: "A0012",
    at: NOW - 4 * HOUR,
    actor: "D. Whitfield",
    role: "auditor",
    action: "report.exported",
    targetType: "demo",
    targetId: "assurance-report",
    detail: "Assurance report exported for the Q3 PCI DSS 10.7 evidence pack.",
  },
]

export const SCENARIOS: Scenario[] = [
  {
    id: "identity-cloud",
    name: "Identity-led cloud intrusion",
    summary:
      "The pattern behind the top-ranked techniques of 2025: steal a session, add your own credential, look around, take the data.",
    sourceLabel:
      "Chain assembled from Red Canary Threat Detection Report 2025 top-ten techniques",
    sourceUrl: "https://redcanary.com/threat-detection-report/techniques/",
    steps: [
      { techniqueId: "T1621", label: "Push-notification fatigue against a privileged user" },
      { techniqueId: "T1078.004", label: "Sign in with the stolen cloud session" },
      { techniqueId: "T1098.001", label: "Add a second credential to the service principal" },
      { techniqueId: "T1087.004", label: "Enumerate accounts and roles" },
      { techniqueId: "T1530", label: "Read the customer data bucket" },
      { techniqueId: "T1567.002", label: "Upload it to consumer cloud storage" },
    ],
  },
  {
    id: "bec",
    name: "Business email compromise",
    summary:
      "Quiet, cheap, and the reason two of the 2025 top ten are mailbox techniques. The whole chain can run without malware.",
    sourceLabel:
      "Chain assembled from Red Canary Threat Detection Report 2025 (email forwarding and hiding rules)",
    sourceUrl: "https://redcanary.com/threat-detection-report/techniques/",
    steps: [
      { techniqueId: "T1566.002", label: "Credential-harvest link to a look-alike portal" },
      { techniqueId: "T1621", label: "Approve the MFA prompt through fatigue" },
      { techniqueId: "T1114.003", label: "Create an external forwarding rule" },
      { techniqueId: "T1564.008", label: "Hide the security notifications" },
      { techniqueId: "T1213.002", label: "Pull the finance folder from SharePoint" },
    ],
  },
  {
    id: "ransomware",
    name: "Ransomware precursor chain",
    summary:
      "The stage before encryption, which is the only stage where detection still helps.",
    sourceLabel: "Chain assembled from common ATT&CK ransomware precursor techniques",
    sourceUrl: "https://attack.mitre.org/tactics/TA0040/",
    steps: [
      { techniqueId: "T1190", label: "Exploit the edge service" },
      { techniqueId: "T1105", label: "Pull tooling down to disk" },
      { techniqueId: "T1003.001", label: "Dump credentials from memory" },
      { techniqueId: "T1021.001", label: "Move laterally over RDP" },
      { techniqueId: "T1562.001", label: "Disable the endpoint agent" },
      { techniqueId: "T1490", label: "Delete the shadow copies" },
      { techniqueId: "T1486", label: "Encrypt" },
    ],
  },
]

export const CONNECTORS: Connector[] = [
  {
    id: "siem",
    name: "SIEM rule inventory",
    vendor: "Splunk ES",
    purpose: "Analytic content, enabled state, 30-day fire counts",
    fixtureOf: "Rule export, 24 Jul 2026",
    records: ANALYTICS.length,
  },
  {
    id: "repo",
    name: "Detection-as-code repository",
    vendor: "GitHub",
    purpose: "Rule files, ATT&CK mapping, commit history",
    fixtureOf: "Snapshot of a sample repository tree",
    records: ANALYTICS.length,
  },
  {
    id: "ingest",
    name: "Ingest health",
    vendor: "Splunk ES",
    purpose: "Per-source event counts, last event time, parse errors",
    fixtureOf: "14-day rollup, generated series",
    records: LOG_SOURCES.length,
  },
  {
    id: "aev",
    name: "Attack simulation",
    vendor: "Atomic Red Team runner",
    purpose: "Test catalogue and graded results",
    fixtureOf: "Validation records, invented",
    records: VALIDATIONS.length,
  },
  {
    id: "tickets",
    name: "Ticketing",
    vendor: "Jira",
    purpose: "Create and link remediation tickets",
    fixtureOf: "Not simulated — assignment stays inside Assay",
    records: 0,
  },
  {
    id: "idp",
    name: "Identity provider",
    vendor: "Okta",
    purpose: "Users and group-to-role mapping",
    fixtureOf: "Three fixed roles, switchable in the header",
    records: 3,
  },
]

/**
 * Twelve-week history for the burn-down and the composition trend. Written out
 * rather than generated so the story it tells is deliberate: assumed shrinks as
 * verified grows, then verified dips in the last two weeks as telemetry breaks.
 */
export const HISTORY: {
  week: string
  verifiedPct: number
  verified: number
  decaying: number
  assumed: number
  broken: number
  blind: number
  accepted: number
}[] = [
  { week: "2 May", verifiedPct: 21, verified: 5, decaying: 3, assumed: 9, broken: 2, blind: 4, accepted: 1 },
  { week: "9 May", verifiedPct: 24, verified: 6, decaying: 3, assumed: 8, broken: 2, blind: 4, accepted: 1 },
  { week: "16 May", verifiedPct: 30, verified: 7, decaying: 2, assumed: 8, broken: 2, blind: 4, accepted: 1 },
  { week: "23 May", verifiedPct: 33, verified: 8, decaying: 2, assumed: 7, broken: 2, blind: 4, accepted: 1 },
  { week: "30 May", verifiedPct: 38, verified: 9, decaying: 3, assumed: 6, broken: 1, blind: 4, accepted: 1 },
  { week: "6 Jun", verifiedPct: 44, verified: 10, decaying: 3, assumed: 5, broken: 1, blind: 4, accepted: 1 },
  { week: "13 Jun", verifiedPct: 49, verified: 11, decaying: 2, assumed: 5, broken: 1, blind: 4, accepted: 2 },
  { week: "20 Jun", verifiedPct: 55, verified: 13, decaying: 2, assumed: 4, broken: 1, blind: 3, accepted: 2 },
  { week: "27 Jun", verifiedPct: 61, verified: 14, decaying: 2, assumed: 3, broken: 1, blind: 3, accepted: 2 },
  { week: "4 Jul", verifiedPct: 64, verified: 15, decaying: 2, assumed: 3, broken: 1, blind: 2, accepted: 2 },
  { week: "11 Jul", verifiedPct: 66, verified: 15, decaying: 3, assumed: 2, broken: 1, blind: 2, accepted: 2 },
  { week: "18 Jul", verifiedPct: 52, verified: 12, decaying: 3, assumed: 2, broken: 4, blind: 2, accepted: 2 },
]
