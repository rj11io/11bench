import type { Asset, FixPack, Person, SlaPolicy } from "./types"

/**
 * All data in this module is fictional demo data, seeded for the Patchbay
 * product demo. CVE identifiers in the 2026 range are invented for the demo;
 * a few well-known historical CVEs (e.g. Log4Shell) appear because they are
 * still commonly found in real environments, which makes the demo honest
 * about what a queue looks like.
 */

export const SLA_POLICY: SlaPolicy = {
  critical: 7,
  high: 30,
  medium: 90,
  low: 180,
}

export const SCORE_WEIGHTS = {
  kev: 35,
  epss: 25,
  exposure: 15,
  criticality: 15,
  blast: 10,
} as const

export const PEOPLE: Person[] = [
  { id: "maya", name: "Maya Chen", team: "Security", initials: "MC" },
  { id: "jonas", name: "Jonas Weber", team: "Platform", initials: "JW" },
  { id: "priya", name: "Priya Sharma", team: "Payments", initials: "PS" },
  { id: "sam", name: "Sam Ortiz", team: "Web", initials: "SO" },
  { id: "lena", name: "Lena Fischer", team: "Data", initials: "LF" },
  { id: "marcus", name: "Marcus Reid", team: "IT Ops", initials: "MR" },
]

export const ASSETS: Asset[] = [
  {
    id: "api-gateway",
    name: "api-gateway",
    kind: "service",
    environment: "prod",
    internetFacing: true,
    criticality: "crown",
    criticalityReason: "Fronts all customer API traffic; auth tokens transit here",
    owner: "Platform",
  },
  {
    id: "payments-service",
    name: "payments-service",
    kind: "service",
    environment: "prod",
    internetFacing: false,
    criticality: "crown",
    criticalityReason: "Processes card transactions; PCI scope",
    owner: "Payments",
  },
  {
    id: "customer-db",
    name: "customer-db (primary)",
    kind: "database",
    environment: "prod",
    internetFacing: false,
    criticality: "crown",
    criticalityReason: "Holds all customer PII and account records",
    owner: "Data",
  },
  {
    id: "auth-service",
    name: "auth-service",
    kind: "service",
    environment: "prod",
    internetFacing: true,
    criticality: "crown",
    criticalityReason: "Issues and validates sessions for every product surface",
    owner: "Platform",
  },
  {
    id: "vpn-appliance",
    name: "edge-vpn-01",
    kind: "host",
    environment: "prod",
    internetFacing: true,
    criticality: "standard",
    criticalityReason: "Remote access path into corp network",
    owner: "IT Ops",
  },
  {
    id: "billing-portal",
    name: "billing-portal",
    kind: "service",
    environment: "prod",
    internetFacing: true,
    criticality: "standard",
    criticalityReason: "Customer-facing invoices; reads from payments data",
    owner: "Web",
  },
  {
    id: "marketing-site",
    name: "marketing-site",
    kind: "service",
    environment: "prod",
    internetFacing: true,
    criticality: "low",
    criticalityReason: "Static content; no customer data behind it",
    owner: "Web",
  },
  {
    id: "k8s-prod",
    name: "k8s-prod node fleet (23 nodes)",
    kind: "fleet",
    environment: "prod",
    internetFacing: false,
    criticality: "standard",
    criticalityReason: "Runs all production workloads; lateral-movement surface",
    owner: "Platform",
  },
  {
    id: "ci-runners",
    name: "ci-runner fleet (8 hosts)",
    kind: "fleet",
    environment: "corp",
    internetFacing: false,
    criticality: "standard",
    criticalityReason: "Holds deploy credentials and signs release artifacts",
    owner: "Platform",
  },
  {
    id: "data-warehouse",
    name: "data-warehouse",
    kind: "database",
    environment: "prod",
    internetFacing: false,
    criticality: "standard",
    criticalityReason: "Aggregated analytics; contains pseudonymized usage data",
    owner: "Data",
  },
  {
    id: "corp-laptops",
    name: "corp laptop fleet (214 devices)",
    kind: "fleet",
    environment: "corp",
    internetFacing: false,
    criticality: "standard",
    criticalityReason: "Employee endpoints; phishing landing surface",
    owner: "IT Ops",
  },
  {
    id: "internal-wiki",
    name: "internal-wiki",
    kind: "service",
    environment: "corp",
    internetFacing: false,
    criticality: "low",
    criticalityReason: "Internal docs; no production credentials stored",
    owner: "IT Ops",
  },
  {
    id: "legacy-reporting",
    name: "legacy-reporting",
    kind: "service",
    environment: "prod",
    internetFacing: false,
    criticality: "low",
    criticalityReason: "Scheduled for decommission Q4; read-only mirrors",
    owner: "Data",
  },
  {
    id: "object-storage",
    name: "object-storage buckets",
    kind: "service",
    environment: "prod",
    internetFacing: true,
    criticality: "standard",
    criticalityReason: "Serves customer file uploads and exports",
    owner: "Data",
  },
]

export const STEADY_PACKS: FixPack[] = [
  {
    id: "fp-openssl",
    title: "Upgrade OpenSSL to 3.0.17 on internet-facing services",
    action: "Bump base image openssl package and redeploy",
    packageOrArea: "openssl 3.0.x",
    findingCount: 214,
    findings: [
      { cve: "CVE-2026-20142", title: "OpenSSL TLS handshake memory corruption", source: "Trivy", cvss: 9.1, epss: 0.89, kev: true },
      { cve: "CVE-2026-20177", title: "OpenSSL X.509 verification bypass", source: "Trivy", cvss: 7.4, epss: 0.31, kev: false },
      { cve: "CVE-2025-9944", title: "OpenSSL DoS via crafted session ticket", source: "Qualys", cvss: 5.9, epss: 0.08, kev: false },
    ],
    assetIds: ["api-gateway", "auth-service", "billing-portal"],
    firstSeenDaysAgo: 3,
    kev: true,
    kevAddedDaysAgo: 3,
    epss: 0.89,
    remediation: [
      "Bump openssl to 3.0.17 in the shared base image (platform/base-images repo)",
      "Rebuild and roll api-gateway, auth-service, billing-portal via standard deploy",
      "Rotate TLS session ticket keys after rollout as a precaution",
    ],
    verification: "Rescan the three services; the 214 member findings should close on next Trivy run",
    defaultStatus: "in_progress",
    defaultOwnerId: "jonas",
  },
  {
    id: "fp-vpn",
    title: "Patch edge VPN appliance to firmware 22.3.4",
    action: "Apply vendor firmware update during maintenance window",
    packageOrArea: "edge-vpn firmware",
    findingCount: 6,
    findings: [
      { cve: "CVE-2026-21311", title: "VPN gateway pre-auth RCE via crafted SAML response", source: "Tenable", cvss: 9.8, epss: 0.94, kev: true },
      { cve: "CVE-2026-21315", title: "VPN admin console auth bypass", source: "Tenable", cvss: 8.2, epss: 0.42, kev: false },
    ],
    assetIds: ["vpn-appliance"],
    firstSeenDaysAgo: 5,
    kev: true,
    kevAddedDaysAgo: 4,
    epss: 0.94,
    remediation: [
      "Schedule 30-min maintenance window; notify remote employees",
      "Apply vendor firmware 22.3.4 (fixes both CVEs), reboot appliance",
      "Invalidate all active VPN sessions and force re-auth",
    ],
    verification: "Tenable rescan of edge-vpn-01 shows firmware ≥22.3.4 and both CVEs closed",
    defaultStatus: "open",
    defaultOwnerId: "marcus",
  },
  {
    id: "fp-postgres",
    title: "Apply PostgreSQL 16.6 minor upgrade to customer-db",
    action: "Rolling minor-version upgrade via replica promotion",
    packageOrArea: "postgresql 16.x",
    findingCount: 11,
    findings: [
      { cve: "CVE-2026-20455", title: "PostgreSQL privilege escalation via crafted extension", source: "Qualys", cvss: 8.8, epss: 0.12, kev: false },
      { cve: "CVE-2025-8811", title: "PostgreSQL row-security policy bypass", source: "Qualys", cvss: 6.5, epss: 0.04, kev: false },
    ],
    assetIds: ["customer-db"],
    firstSeenDaysAgo: 9,
    kev: false,
    epss: 0.12,
    remediation: [
      "Upgrade standby replica to 16.6 and verify replication health",
      "Promote replica during low-traffic window; upgrade former primary",
    ],
    verification: "pg_version reports 16.6 on both nodes; Qualys rescan clean",
    defaultStatus: "open",
    defaultOwnerId: "lena",
  },
  {
    id: "fp-log4j",
    title: "Remove legacy Log4j 2.14 from legacy-reporting",
    action: "Upgrade bundled Log4j or decommission the service early",
    packageOrArea: "log4j-core 2.14.1",
    findingCount: 3,
    findings: [
      { cve: "CVE-2021-44228", title: "Log4Shell — JNDI lookup remote code execution", source: "Snyk", cvss: 10.0, epss: 0.97, kev: true },
    ],
    assetIds: ["legacy-reporting"],
    firstSeenDaysAgo: 38,
    kev: true,
    kevAddedDaysAgo: 1600,
    epss: 0.97,
    remediation: [
      "Preferred: pull decommission forward — service is read-only mirrors",
      "Otherwise: bump log4j-core to 2.24.x in the reporting fat-jar and redeploy",
    ],
    verification: "Snyk rescan shows no log4j-core <2.17 anywhere in the artifact",
    defaultStatus: "open",
    defaultOwnerId: "lena",
  },
  {
    id: "fp-node",
    title: "Upgrade Node.js runtime to 22.14 on web services",
    action: "Bump runtime in Dockerfiles and redeploy",
    packageOrArea: "node 22.x",
    findingCount: 312,
    findings: [
      { cve: "CVE-2026-20871", title: "Node.js HTTP/2 request smuggling", source: "Trivy", cvss: 7.5, epss: 0.22, kev: false },
      { cve: "CVE-2026-20903", title: "Node.js path traversal in fs.realpath", source: "Trivy", cvss: 6.1, epss: 0.05, kev: false },
    ],
    assetIds: ["billing-portal", "marketing-site"],
    firstSeenDaysAgo: 12,
    kev: false,
    epss: 0.22,
    remediation: [
      "Bump FROM node:22.14-slim in billing-portal and marketing-site Dockerfiles",
      "Run smoke suite; deploy via standard pipeline",
    ],
    verification: "Trivy image scans show node ≥22.14; all 312 member findings close",
    defaultStatus: "submitted",
    defaultOwnerId: "sam",
  },
  {
    id: "fp-k8s",
    title: "Patch kubelet on k8s-prod nodes to 1.31.6",
    action: "Rolling node pool upgrade",
    packageOrArea: "kubernetes 1.31.x",
    findingCount: 391,
    findings: [
      { cve: "CVE-2026-20510", title: "kubelet symlink-follow allows container escape read", source: "Wiz", cvss: 8.1, epss: 0.09, kev: false },
    ],
    assetIds: ["k8s-prod"],
    firstSeenDaysAgo: 15,
    kev: false,
    epss: 0.09,
    remediation: [
      "Upgrade node pool image to k8s 1.31.6 (managed upgrade, 3 batches)",
      "Verify workload health between batches",
    ],
    verification: "kubectl get nodes shows v1.31.6 fleet-wide; Wiz rescan clean",
    defaultStatus: "in_progress",
    defaultOwnerId: "jonas",
  },
  {
    id: "fp-chrome",
    title: "Force Chrome update across corp laptop fleet",
    action: "Push managed browser update via MDM",
    packageOrArea: "chrome stable",
    findingCount: 1497,
    findings: [
      { cve: "CVE-2026-21055", title: "Chrome V8 type-confusion (exploited in the wild)", source: "MDM inventory", cvss: 8.8, epss: 0.71, kev: true },
      { cve: "CVE-2026-21060", title: "Chrome sandbox escape via IPC", source: "MDM inventory", cvss: 8.4, epss: 0.18, kev: false },
    ],
    assetIds: ["corp-laptops"],
    firstSeenDaysAgo: 2,
    kev: true,
    kevAddedDaysAgo: 2,
    epss: 0.71,
    remediation: [
      "Set MDM policy to force-restart Chrome fleet-wide within 24h",
      "Report devices still below target version after 48h",
    ],
    verification: "MDM inventory shows ≥99% of 214 devices on patched build",
    defaultStatus: "in_progress",
    defaultOwnerId: "marcus",
  },
  {
    id: "fp-django",
    title: "Upgrade Django to 5.1.8 on billing-portal",
    action: "Dependency bump + regression run",
    packageOrArea: "django 5.1.x",
    findingCount: 19,
    findings: [
      { cve: "CVE-2026-20633", title: "Django SQL injection via JSONField lookups", source: "Snyk", cvss: 8.2, epss: 0.35, kev: false },
      { cve: "CVE-2026-20641", title: "Django DoS in multipart parser", source: "Snyk", cvss: 5.3, epss: 0.03, kev: false },
    ],
    assetIds: ["billing-portal"],
    firstSeenDaysAgo: 7,
    kev: false,
    epss: 0.35,
    remediation: [
      "Bump django to 5.1.8 in billing-portal requirements",
      "Run payments regression suite (JSONField lookups are used in invoice search)",
    ],
    verification: "Snyk PR check green; rescan closes 19 findings",
    defaultStatus: "open",
    defaultOwnerId: "sam",
  },
  {
    id: "fp-s3acl",
    title: "Close public-list ACL on two object-storage buckets",
    action: "Tighten bucket policy; enable block-public-access",
    packageOrArea: "object-storage config",
    findingCount: 2,
    findings: [
      { cve: "—", title: "Bucket allows anonymous ListObjects (exports-eu)", source: "Wiz", cvss: 7.5, epss: 0, kev: false },
      { cve: "—", title: "Bucket allows anonymous ListObjects (exports-us)", source: "Wiz", cvss: 7.5, epss: 0, kev: false },
    ],
    assetIds: ["object-storage"],
    firstSeenDaysAgo: 4,
    kev: false,
    epss: 0.28,
    remediation: [
      "Enable account-level block-public-access for the exports account",
      "Replace anonymous list with signed-URL access in the export flow",
    ],
    verification: "Wiz config rescan shows no public-list buckets",
    defaultStatus: "open",
    defaultOwnerId: "lena",
  },
  {
    id: "fp-runner",
    title: "Rotate exposed CI runner registration tokens",
    action: "Rotate tokens and pin runner version",
    packageOrArea: "ci-runner 17.x",
    findingCount: 9,
    findings: [
      { cve: "CVE-2026-20719", title: "CI runner token disclosure in debug logs", source: "Qualys", cvss: 6.5, epss: 0.07, kev: false },
    ],
    assetIds: ["ci-runners"],
    firstSeenDaysAgo: 21,
    kev: false,
    epss: 0.07,
    remediation: [
      "Upgrade runner fleet to 17.8 (fixes log disclosure)",
      "Rotate all registration tokens; audit recent job logs for token strings",
    ],
    verification: "Qualys rescan clean; old tokens revoked in admin panel",
    defaultStatus: "open",
    defaultOwnerId: "jonas",
  },
  {
    id: "fp-nginx",
    title: "Upgrade nginx ingress controller to 1.12.2",
    action: "Helm chart bump on k8s-prod",
    packageOrArea: "ingress-nginx 1.12.x",
    findingCount: 33,
    findings: [
      { cve: "CVE-2026-20988", title: "ingress-nginx annotation injection to config", source: "Wiz", cvss: 7.1, epss: 0.16, kev: false },
    ],
    assetIds: ["k8s-prod", "api-gateway"],
    firstSeenDaysAgo: 11,
    kev: false,
    epss: 0.16,
    remediation: [
      "Bump ingress-nginx Helm chart to 4.12.2 (controller 1.12.2)",
      "Validate custom annotations against the new strict-validation mode",
    ],
    verification: "Controller pods report 1.12.2; Wiz rescan clean",
    defaultStatus: "open",
    defaultOwnerId: "jonas",
  },
  {
    id: "fp-wordpress",
    title: "Update marketing-site CMS plugins (4 outdated)",
    action: "Update plugins and remove the unused two",
    packageOrArea: "cms plugins",
    findingCount: 27,
    findings: [
      { cve: "CVE-2026-21122", title: "CMS gallery plugin arbitrary file upload", source: "Intruder", cvss: 8.1, epss: 0.44, kev: false },
      { cve: "CVE-2026-21130", title: "CMS form plugin stored XSS", source: "Intruder", cvss: 6.1, epss: 0.09, kev: false },
    ],
    assetIds: ["marketing-site"],
    firstSeenDaysAgo: 6,
    kev: false,
    epss: 0.44,
    remediation: [
      "Update gallery and form plugins to latest; delete the two unused plugins",
      "Enable auto-update for minor plugin versions",
    ],
    verification: "Intruder rescan shows 0 outdated plugins on marketing-site",
    defaultStatus: "open",
    defaultOwnerId: "sam",
  },
  {
    id: "fp-openssh",
    title: "Patch OpenSSH on data-warehouse hosts",
    action: "OS package update via config management",
    packageOrArea: "openssh 9.x",
    findingCount: 57,
    findings: [
      { cve: "CVE-2026-20344", title: "OpenSSH pre-auth timing side channel", source: "Qualys", cvss: 5.9, epss: 0.02, kev: false },
    ],
    assetIds: ["data-warehouse"],
    firstSeenDaysAgo: 30,
    kev: false,
    epss: 0.02,
    remediation: [
      "Apply openssh-server update in the next weekly patch run",
    ],
    verification: "Qualys authenticated scan shows patched package",
    defaultStatus: "open",
    defaultOwnerId: "lena",
  },
  {
    id: "fp-wiki",
    title: "Upgrade internal-wiki to current LTS",
    action: "Container image bump",
    packageOrArea: "wiki 2.x",
    findingCount: 68,
    findings: [
      { cve: "CVE-2025-7702", title: "Wiki markdown renderer XSS", source: "Trivy", cvss: 5.4, epss: 0.03, kev: false },
    ],
    assetIds: ["internal-wiki"],
    firstSeenDaysAgo: 44,
    kev: false,
    epss: 0.03,
    remediation: [
      "Bump wiki container to current LTS image; run migration job",
    ],
    verification: "Trivy image scan closes all 41 findings",
    defaultStatus: "accepted",
    defaultOwnerId: "marcus",
  },
  {
    id: "fp-grafana",
    title: "Upgrade Grafana on data-warehouse monitoring",
    action: "Helm chart bump",
    packageOrArea: "grafana 11.x",
    findingCount: 22,
    findings: [
      { cve: "CVE-2026-20477", title: "Grafana viewer→editor privilege escalation", source: "Trivy", cvss: 6.3, epss: 0.06, kev: false },
    ],
    assetIds: ["data-warehouse"],
    firstSeenDaysAgo: 18,
    kev: false,
    epss: 0.06,
    remediation: [
      "Bump grafana chart; verify dashboards render post-upgrade",
    ],
    verification: "Trivy rescan clean",
    defaultStatus: "verified",
    defaultOwnerId: "lena",
  },
  {
    id: "fp-redis",
    title: "Patch Redis on payments cache tier",
    action: "Minor version bump with failover",
    packageOrArea: "redis 7.4.x",
    findingCount: 8,
    findings: [
      { cve: "CVE-2026-20560", title: "Redis Lua sandbox escape (auth required)", source: "Qualys", cvss: 7.0, epss: 0.11, kev: false },
    ],
    assetIds: ["payments-service"],
    firstSeenDaysAgo: 8,
    kev: false,
    epss: 0.11,
    remediation: [
      "Upgrade replica, fail over, upgrade former primary",
      "Confirm Lua scripts inventory — only rate-limiter script is registered",
    ],
    verification: "redis-server --version shows 7.4.3; Qualys rescan clean",
    defaultStatus: "open",
    defaultOwnerId: "priya",
  },
  {
    id: "fp-git",
    title: "Update git on ci-runner fleet",
    action: "OS package update",
    packageOrArea: "git 2.x",
    findingCount: 64,
    findings: [
      { cve: "CVE-2026-20290", title: "git clone path handling code execution (needs malicious repo)", source: "Qualys", cvss: 6.8, epss: 0.04, kev: false },
    ],
    assetIds: ["ci-runners"],
    firstSeenDaysAgo: 25,
    kev: false,
    epss: 0.04,
    remediation: ["Apply git package update in weekly patch run"],
    verification: "Qualys authenticated scan shows patched version",
    defaultStatus: "verified",
    defaultOwnerId: "jonas",
  },
  {
    id: "fp-tls-legacy",
    title: "Disable TLS 1.0/1.1 on legacy-reporting listener",
    action: "Config change",
    packageOrArea: "tls config",
    findingCount: 4,
    findings: [
      { cve: "—", title: "Legacy TLS protocol enabled", source: "Intruder", cvss: 4.8, epss: 0, kev: false },
    ],
    assetIds: ["legacy-reporting"],
    firstSeenDaysAgo: 52,
    kev: false,
    epss: 0.01,
    remediation: ["Set min TLS 1.2 in listener config; confirm the two legacy consumers upgraded"],
    verification: "Intruder rescan shows TLS 1.2+ only",
    defaultStatus: "open",
    defaultOwnerId: "lena",
  },
]

/**
 * The kev-morning scenario: overnight, CISA added CVE-2026-20633 (Django
 * JSONField SQL injection) to the KEV catalog and EPSS jumped. One new pack
 * also arrives from the overnight scan.
 */
export const KEV_MORNING_CHANGES: {
  changedPacks: Record<string, Partial<FixPack>>
  newPacks: FixPack[]
} = {
  changedPacks: {
    "fp-django": {
      kev: true,
      kevAddedDaysAgo: 0,
      epss: 0.91,
      findings: [
        { cve: "CVE-2026-20633", title: "Django SQL injection via JSONField lookups", source: "Snyk", cvss: 8.2, epss: 0.91, kev: true },
        { cve: "CVE-2026-20641", title: "Django DoS in multipart parser", source: "Snyk", cvss: 5.3, epss: 0.03, kev: false },
      ],
      evidenceChanged:
        "CVE-2026-20633 was added to the CISA KEV catalog overnight (Jul 16) and its EPSS moved 35% → 91%. This pack re-ranked from Low (38) to Critical (87) — the flaw didn't change, the evidence did.",
    },
    "fp-vpn": {
      evidenceChanged:
        "EPSS for CVE-2026-21311 rose 94% → 97% after public proof-of-concept code was released (Jul 16). Rank unchanged — still at the top of the queue.",
      epss: 0.97,
    },
  },
  newPacks: [
    {
      id: "fp-exchange",
      title: "Apply emergency mail-gateway hotfix KB-2026-071",
      action: "Vendor hotfix for actively exploited deserialization flaw",
      packageOrArea: "mail-gateway",
      findingCount: 1,
      findings: [
        { cve: "CVE-2026-21847", title: "Mail gateway deserialization RCE (exploited in the wild)", source: "Tenable", cvss: 9.4, epss: 0.87, kev: true },
      ],
      assetIds: ["vpn-appliance", "corp-laptops"],
      firstSeenDaysAgo: 0,
      kev: true,
      kevAddedDaysAgo: 0,
      epss: 0.87,
      remediation: [
        "Apply vendor hotfix KB-2026-071 to the mail gateway",
        "Search 30 days of gateway logs for the published exploit indicator",
      ],
      verification: "Tenable rescan shows hotfix applied; log search results attached to this pack",
      evidenceChanged:
        "New overnight: CVE-2026-21847 entered the CISA KEV catalog on Jul 16, the day it was published. No prior finding existed for this pack.",
      defaultStatus: "open",
    },
  ],
}

export function getScenarioPacks(scenario: "steady" | "kev-morning"): FixPack[] {
  if (scenario === "steady") return STEADY_PACKS
  const changed = STEADY_PACKS.map((p) => {
    const delta = KEV_MORNING_CHANGES.changedPacks[p.id]
    return delta ? { ...p, ...delta } : p
  })
  return [...KEV_MORNING_CHANGES.newPacks, ...changed]
}

/** 12-week open critical+high exposure trend for the reports view. */
export const BURNDOWN_STEADY = [
  { week: "Apr 27", critical: 14, high: 31 },
  { week: "May 4", critical: 13, high: 29 },
  { week: "May 11", critical: 15, high: 28 },
  { week: "May 18", critical: 12, high: 26 },
  { week: "May 25", critical: 10, high: 27 },
  { week: "Jun 1", critical: 9, high: 24 },
  { week: "Jun 8", critical: 9, high: 21 },
  { week: "Jun 15", critical: 7, high: 20 },
  { week: "Jun 22", critical: 6, high: 18 },
  { week: "Jun 29", critical: 5, high: 16 },
  { week: "Jul 6", critical: 4, high: 14 },
  { week: "Jul 13", critical: 3, high: 12 },
]

export const BURNDOWN_KEV = BURNDOWN_STEADY.slice(0, 11).concat([
  { week: "Jul 13", critical: 6, high: 13 },
])

export const SLA_BY_TEAM = [
  { team: "Data", compliance: 95, open: 6 },
  { team: "Platform", compliance: 92, open: 5 },
  { team: "Payments", compliance: 88, open: 1 },
  { team: "Web", compliance: 71, open: 3 },
  { team: "IT Ops", compliance: 64, open: 3 },
]

export const AGING_BUCKETS = [
  { bucket: "0–7d", critical: 2, high: 3, medium: 2 },
  { bucket: "8–30d", critical: 1, high: 4, medium: 3 },
  { bucket: "31–90d", critical: 0, high: 1, medium: 4 },
  { bucket: "90d+", critical: 0, high: 0, medium: 1 },
]
