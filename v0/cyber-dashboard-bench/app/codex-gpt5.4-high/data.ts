import type {
  ExposurePath,
  PathStatus,
  PersistedState,
  Priority,
  StepStatus,
} from "./types"

export const storageKey = "breakline-demo:v1"

export const seedPaths: ExposurePath[] = [
  {
    id: "ap-114",
    title: "Public analytics VM -> inherited service account -> PHI warehouse",
    summary:
      "A runtime-validated chain links an internet-facing analytics node to a service account with inherited read access into regulated data.",
    narrative:
      "This is the highest-value chain because one identity fix removes the cleanest route into protected health data and collapses two sibling paths at once.",
    priority: "critical",
    environment: "Hybrid",
    businessService: "Patient outreach and demand forecasting",
    targetAsset: "Snowflake PHI warehouse",
    entryPoint: "Ubuntu analytics VM on public subnet",
    crownJewel: true,
    blastRadius: "2 production datasets, 18 downstream analysts, PHI exposure",
    exploitEvidence: "CISA KEV-linked ingress path plus runtime validation",
    lastUpdated: "2026-07-16 09:14",
    pathCount: 3,
    assetsAtRisk: 12,
    exposureScore: 96,
    validationScore: 89,
    steps: [
      {
        id: "s1",
        title:
          "Rotate legacy key and move workload to short-lived identity federation",
        owner: "Platform IAM",
        due: "Jul 18",
        domain: "Identity",
        riskCut: "-58%",
        status: "in_progress",
      },
      {
        id: "s2",
        title: "Remove inherited PHI read on the shared analytics role",
        owner: "Data Platform",
        due: "Jul 19",
        domain: "Data",
        riskCut: "-24%",
        status: "todo",
      },
      {
        id: "s3",
        title: "Close 8443 ingress path from edge VPC to analytics subnet",
        owner: "Cloud SecOps",
        due: "Jul 20",
        domain: "Cloud",
        riskCut: "-18%",
        status: "in_review",
      },
    ],
    nodes: [
      {
        id: "n1",
        label: "Internet edge",
        kind: "entry",
        detail: "Public ingress discovered by external scanner",
      },
      {
        id: "n2",
        label: "Analytics VM",
        kind: "asset",
        detail: "Runtime package with exposed management port",
      },
      {
        id: "n3",
        label: "Service account key",
        kind: "identity",
        detail: "377-day-old key mounted in job runner",
        chokePoint: true,
      },
      {
        id: "n4",
        label: "Inherited reader role",
        kind: "control",
        detail: "Broad warehouse read granted through shared group",
      },
      {
        id: "n5",
        label: "PHI warehouse",
        kind: "data",
        detail: "Regulated dataset tagged as crown jewel",
      },
    ],
    evidence: [
      "The exposed VM maps to a CISA KEV-backed vulnerable package family.",
      "The service account key has not rotated in 377 days and is still mounted in a scheduled job.",
      "The same choke point appears in three attack paths leading to regulated data.",
    ],
    owners: ["Platform IAM", "Data Platform", "Cloud SecOps"],
    signals: [
      { label: "Exposure score", value: "96 / 100", tone: "critical" },
      { label: "Runtime validation", value: "Confirmed", tone: "critical" },
      { label: "Paths collapsed if fixed", value: "3", tone: "good" },
      { label: "Ownership confidence", value: "High", tone: "good" },
    ],
    baseEvents: [
      {
        id: "e1",
        at: "08:42",
        actor: "System",
        detail:
          "Runtime validation confirmed the vulnerable service is reachable from the internet.",
      },
      {
        id: "e2",
        at: "09:01",
        actor: "Platform IAM",
        detail: "Key rotation campaign opened with the owning team.",
      },
      {
        id: "e3",
        at: "09:14",
        actor: "Data Platform",
        detail:
          "Warehouse entitlement review requested for inherited reader role.",
      },
    ],
    note: "Focus on the service-account choke point first. It breaks the chain faster than waiting on the network review.",
  },
  {
    id: "ap-131",
    title:
      "Jenkins plugin CVE -> build secret exposure -> production cluster admin",
    summary:
      "A legacy CI plugin exposes build credentials that can assume a production Kubernetes admin role.",
    narrative:
      "This chain is a classic handoff gap between AppSec and platform teams: the vulnerability itself matters less than the identity reach it enables.",
    priority: "high",
    environment: "AWS",
    businessService: "Payments API deployment pipeline",
    targetAsset: "Production EKS admin role",
    entryPoint: "Legacy Jenkins controller",
    crownJewel: true,
    blastRadius: "Full cluster admin across 6 namespaces",
    exploitEvidence: "Exploit path validated by scanner and CI token inventory",
    lastUpdated: "2026-07-16 08:51",
    pathCount: 2,
    assetsAtRisk: 9,
    exposureScore: 87,
    validationScore: 74,
    steps: [
      {
        id: "s1",
        title:
          "Patch or disable the vulnerable Jenkins plugin on the shared controller",
        owner: "Developer Platform",
        due: "Jul 21",
        domain: "Application",
        riskCut: "-31%",
        status: "todo",
      },
      {
        id: "s2",
        title:
          "Rotate exposed build token and reduce cluster-admin assumption path",
        owner: "Cloud SecOps",
        due: "Jul 18",
        domain: "Identity",
        riskCut: "-44%",
        status: "in_progress",
      },
      {
        id: "s3",
        title: "Move prod deployment job to dedicated runner with scoped IAM",
        owner: "Developer Platform",
        due: "Jul 24",
        domain: "Cloud",
        riskCut: "-25%",
        status: "todo",
      },
    ],
    nodes: [
      {
        id: "n1",
        label: "Plugin CVE",
        kind: "entry",
        detail: "Unauthenticated plugin issue on shared CI host",
      },
      {
        id: "n2",
        label: "Build controller",
        kind: "asset",
        detail: "Handles prod and staging release jobs",
      },
      {
        id: "n3",
        label: "Leaked deploy token",
        kind: "identity",
        detail: "Token stored in older freestyle job",
        chokePoint: true,
      },
      {
        id: "n4",
        label: "Assumable admin role",
        kind: "control",
        detail: "Broad federation trust into production cluster",
      },
      {
        id: "n5",
        label: "EKS admin",
        kind: "data",
        detail: "Privileged production control plane access",
      },
    ],
    evidence: [
      "The token is referenced by three jobs and still valid in the secret store.",
      "The affected plugin has public exploit coverage and the host is reachable from the engineering VPN.",
      "Reducing the trust path removes the production-admin blast radius even before patching completes.",
    ],
    owners: ["Developer Platform", "Cloud SecOps"],
    signals: [
      { label: "Exposure score", value: "87 / 100", tone: "warning" },
      { label: "Exploitability", value: "Validated", tone: "critical" },
      { label: "Crown-jewel target", value: "Yes", tone: "critical" },
      { label: "Fix ownership", value: "Split", tone: "warning" },
    ],
    baseEvents: [
      {
        id: "e1",
        at: "07:55",
        actor: "System",
        detail:
          "New path assembled after CI inventory sync mapped the old token to the prod role.",
      },
      {
        id: "e2",
        at: "08:11",
        actor: "Cloud SecOps",
        detail: "Privileged role trust policy queued for reduction.",
      },
    ],
    note: "Do not wait on the full plugin patch cycle; collapsing the role trust is the faster risk reduction move.",
  },
  {
    id: "ap-089",
    title:
      "Contractor laptop -> synced admin group -> Okta super admin session",
    summary:
      "A stale contractor endpoint still syncs into a privileged group that can mint a high-privilege Okta session.",
    narrative:
      "The attack path is short, but the ownership trail is messy. This is exactly where an accountability-first dashboard beats another pile of alerts.",
    priority: "high",
    environment: "Azure",
    businessService: "Identity and access platform",
    targetAsset: "Okta super admin privilege path",
    entryPoint: "Dormant contractor laptop",
    crownJewel: true,
    blastRadius: "Tenant-wide identity admin",
    exploitEvidence: "Identity graph plus stale-device evidence",
    lastUpdated: "2026-07-15 18:22",
    pathCount: 1,
    assetsAtRisk: 4,
    exposureScore: 82,
    validationScore: 63,
    steps: [
      {
        id: "s1",
        title: "Disable the stale device and revoke cached session artifacts",
        owner: "Endpoint Ops",
        due: "Jul 17",
        domain: "Endpoint",
        riskCut: "-41%",
        status: "todo",
      },
      {
        id: "s2",
        title: "Remove contractor sync rule from privileged admin group",
        owner: "Identity Ops",
        due: "Jul 17",
        domain: "Identity",
        riskCut: "-39%",
        status: "todo",
      },
      {
        id: "s3",
        title:
          "Require phishing-resistant re-auth for super-admin session creation",
        owner: "Identity Ops",
        due: "Jul 22",
        domain: "Identity",
        riskCut: "-20%",
        status: "in_review",
      },
    ],
    nodes: [
      {
        id: "n1",
        label: "Dormant laptop",
        kind: "entry",
        detail: "No check-in for 46 days; contractor HR status expired",
      },
      {
        id: "n2",
        label: "Device certificate",
        kind: "asset",
        detail: "Still trusted in device inventory",
      },
      {
        id: "n3",
        label: "Privileged sync rule",
        kind: "identity",
        detail: "Contractor OU mapped into admin helper group",
        chokePoint: true,
      },
      {
        id: "n4",
        label: "Session minting path",
        kind: "control",
        detail: "Eligible to request super-admin approval flow",
      },
      {
        id: "n5",
        label: "Okta super admin",
        kind: "data",
        detail: "Identity crown jewel",
      },
    ],
    evidence: [
      "The user left 32 days ago but the device certificate remains trusted.",
      "The admin helper group is inherited from a sync rule rather than a manual exception.",
      "Re-auth hardening reduces residual risk even if the device disable slips.",
    ],
    owners: ["Endpoint Ops", "Identity Ops"],
    signals: [
      { label: "Exposure score", value: "82 / 100", tone: "warning" },
      { label: "Identity choke point", value: "1", tone: "critical" },
      { label: "HR mismatch", value: "Confirmed", tone: "warning" },
      { label: "Ownership confidence", value: "Medium", tone: "neutral" },
    ],
    baseEvents: [
      {
        id: "e1",
        at: "17:43",
        actor: "System",
        detail:
          "HR roster flagged the contractor as inactive while the endpoint remained trusted.",
      },
      {
        id: "e2",
        at: "18:22",
        actor: "Identity Ops",
        detail:
          "Approval workflow hardening moved to review after test success.",
      },
    ],
    note: "This is an ownership failure more than a detection failure. The sync rule should become a control exception with named approval.",
  },
  {
    id: "ap-076",
    title: "Vendor VPN account -> finance share -> cached payroll export",
    summary:
      "A low-complexity path reaches a sensitive file share through a vendor VPN account that outlived its project window.",
    narrative:
      "Lower technical depth, high operational credibility. This is the kind of path buyers expect to clear quickly with a visible owner and due date.",
    priority: "medium",
    environment: "Hybrid",
    businessService: "Finance operations",
    targetAsset: "Payroll export share",
    entryPoint: "Third-party VPN account",
    crownJewel: false,
    blastRadius: "Monthly payroll export and 2 finance scripts",
    exploitEvidence: "Dormant account plus file-share permission graph",
    lastUpdated: "2026-07-15 16:08",
    pathCount: 1,
    assetsAtRisk: 3,
    exposureScore: 66,
    validationScore: 52,
    steps: [
      {
        id: "s1",
        title:
          "Disable the expired vendor account and close standing VPN entitlement",
        owner: "Identity Ops",
        due: "Jul 18",
        domain: "Identity",
        riskCut: "-48%",
        status: "done",
      },
      {
        id: "s2",
        title:
          "Move the payroll export to managed transfer with short-lived access",
        owner: "Finance IT",
        due: "Jul 23",
        domain: "Data",
        riskCut: "-32%",
        status: "in_progress",
      },
      {
        id: "s3",
        title: "Add quarterly attestation for third-party finance access",
        owner: "Governance",
        due: "Jul 30",
        domain: "Identity",
        riskCut: "-20%",
        status: "todo",
      },
    ],
    nodes: [
      {
        id: "n1",
        label: "Vendor VPN",
        kind: "entry",
        detail: "Account retained after project close",
      },
      {
        id: "n2",
        label: "Shared finance jump host",
        kind: "asset",
        detail: "Legacy access path to internal shares",
      },
      {
        id: "n3",
        label: "Static share ACL",
        kind: "identity",
        detail: "Long-lived group permission",
        chokePoint: true,
      },
      {
        id: "n4",
        label: "Payroll export folder",
        kind: "data",
        detail: "Monthly CSV drop zone",
      },
    ],
    evidence: [
      "The vendor account shows no legitimate activity in 21 days.",
      "One technique is already fixed, so the chain is partly broken.",
      "The remaining risk is operational: the data flow still uses static access instead of managed transfer.",
    ],
    owners: ["Identity Ops", "Finance IT", "Governance"],
    signals: [
      { label: "Exposure score", value: "66 / 100", tone: "neutral" },
      { label: "Chain status", value: "Partly broken", tone: "good" },
      { label: "Control debt", value: "Process", tone: "warning" },
      { label: "External party", value: "Yes", tone: "warning" },
    ],
    baseEvents: [
      {
        id: "e1",
        at: "15:40",
        actor: "Identity Ops",
        detail: "Vendor account disabled after project-end review.",
      },
      {
        id: "e2",
        at: "16:08",
        actor: "Finance IT",
        detail:
          "Managed transfer migration opened as the preferred residual-risk fix.",
      },
    ],
    note: "Good example of a chain-prevented path that should stay visible until the data workflow is fully modernized.",
  },
  {
    id: "ap-041",
    title: "Sandbox DB snapshot exposure -> archived and verified closed",
    summary:
      "A previously internet-exposed sandbox database snapshot was removed and verified in the last review cycle.",
    narrative:
      "Closed paths stay visible for trust and auditability, but they stop competing with open work by default.",
    priority: "low",
    environment: "AWS",
    businessService: "Data science sandbox",
    targetAsset: "Sandbox snapshot bucket",
    entryPoint: "Public object ACL",
    crownJewel: false,
    blastRadius: "No production data; limited non-sensitive sample set",
    exploitEvidence: "Historical finding now closed",
    lastUpdated: "2026-07-14 13:26",
    pathCount: 1,
    assetsAtRisk: 1,
    exposureScore: 18,
    validationScore: 12,
    steps: [
      {
        id: "s1",
        title: "Remove public ACL from the snapshot bucket",
        owner: "Cloud SecOps",
        due: "Jul 10",
        domain: "Cloud",
        riskCut: "-55%",
        status: "done",
      },
      {
        id: "s2",
        title: "Rotate shared access credential used by the export job",
        owner: "Data Platform",
        due: "Jul 11",
        domain: "Identity",
        riskCut: "-25%",
        status: "done",
      },
      {
        id: "s3",
        title: "Add preventive policy for future public snapshot creation",
        owner: "Governance",
        due: "Jul 12",
        domain: "Cloud",
        riskCut: "-20%",
        status: "done",
      },
    ],
    nodes: [
      {
        id: "n1",
        label: "Public ACL",
        kind: "entry",
        detail: "Historical issue removed",
      },
      {
        id: "n2",
        label: "Snapshot bucket",
        kind: "asset",
        detail: "Now blocked by preventive policy",
      },
      {
        id: "n3",
        label: "Closed path",
        kind: "control",
        detail: "Retained for audit trail",
      },
    ],
    evidence: [
      "All remediation steps were completed and verified.",
      "The preventive policy now blocks recurrence at create time.",
      "Closed paths stay available for trust, trend, and audit reporting.",
    ],
    owners: ["Cloud SecOps", "Data Platform", "Governance"],
    signals: [
      { label: "Exposure score", value: "18 / 100", tone: "good" },
      { label: "Verification", value: "Closed", tone: "good" },
      { label: "Audit trail", value: "Retained", tone: "neutral" },
      { label: "Priority", value: "Low", tone: "neutral" },
    ],
    baseEvents: [
      {
        id: "e1",
        at: "12:41",
        actor: "Cloud SecOps",
        detail: "Public access removed and rechecked by external scan.",
      },
      {
        id: "e2",
        at: "13:26",
        actor: "Governance",
        detail: "Preventive policy approved; path marked closed.",
      },
    ],
    note: "Retain as a clean example of resolved work and policy hardening.",
  },
]

export const defaultState: PersistedState = {
  crownOnly: false,
  environmentFilter: "all",
  scopeFilter: "open",
  search: "",
  selectedPathId: seedPaths[0].id,
  paths: seedPaths.map((path) => ({
    id: path.id,
    note: path.note,
    steps: path.steps.map((step) => ({
      id: step.id,
      owner: step.owner,
      status: step.status,
    })),
  })),
}

export function cloneSeedPaths() {
  return seedPaths.map((path) => ({
    ...path,
    steps: path.steps.map((step) => ({ ...step })),
    nodes: path.nodes.map((node) => ({ ...node })),
    evidence: [...path.evidence],
    owners: [...path.owners],
    signals: path.signals.map((signal) => ({ ...signal })),
    baseEvents: path.baseEvents.map((event) => ({ ...event })),
  }))
}

export function derivePathStatus(
  steps: Array<{ status: StepStatus }>
): PathStatus {
  if (steps.every((step) => step.status === "done")) {
    return "resolved"
  }

  if (
    steps.every(
      (step) => step.status === "accepted" || step.status === "done"
    ) &&
    steps.some((step) => step.status === "accepted")
  ) {
    return "accepted"
  }

  if (steps.some((step) => step.status === "done")) {
    return "chain_prevented"
  }

  if (steps.some((step) => step.status === "accepted")) {
    return "accepted"
  }

  if (steps.some((step) => step.status === "in_review")) {
    return "in_review"
  }

  if (steps.some((step) => step.status === "in_progress")) {
    return "in_progress"
  }

  return "active"
}

export function getPathStatusLabel(status: PathStatus) {
  switch (status) {
    case "active":
      return "Open"
    case "in_progress":
      return "In progress"
    case "in_review":
      return "In review"
    case "chain_prevented":
      return "Chain prevented"
    case "accepted":
      return "Accepted"
    case "resolved":
      return "Resolved"
    default:
      return status
  }
}

export function getStepStatusLabel(status: StepStatus) {
  switch (status) {
    case "todo":
      return "To do"
    case "in_progress":
      return "In progress"
    case "in_review":
      return "In review"
    case "done":
      return "Done"
    case "accepted":
      return "Accepted"
    default:
      return status
  }
}

export function isClosedStatus(status: PathStatus) {
  return status === "accepted" || status === "resolved"
}

export function matchesScope(
  status: PathStatus,
  scope: PersistedState["scopeFilter"]
) {
  if (scope === "all") {
    return true
  }

  if (scope === "closed") {
    return isClosedStatus(status)
  }

  if (scope === "worked") {
    return (
      status === "in_progress" ||
      status === "in_review" ||
      status === "chain_prevented"
    )
  }

  return !isClosedStatus(status)
}

export function priorityRank(priority: Priority) {
  switch (priority) {
    case "critical":
      return 0
    case "high":
      return 1
    case "medium":
      return 2
    case "low":
      return 3
    default:
      return 4
  }
}

export function mergePersistedPaths(state: PersistedState) {
  const base = cloneSeedPaths()

  return base.map((path) => {
    const persisted = state.paths.find((entry) => entry.id === path.id)

    if (!persisted) {
      return path
    }

    return {
      ...path,
      note: persisted.note,
      steps: path.steps.map((step) => {
        const override = persisted.steps.find((entry) => entry.id === step.id)
        if (!override) {
          return step
        }
        return {
          ...step,
          owner: override.owner,
          status: override.status,
        }
      }),
    }
  })
}

export const ownerOptions = [
  "Cloud SecOps",
  "Data Platform",
  "Developer Platform",
  "Endpoint Ops",
  "Finance IT",
  "Governance",
  "Identity Ops",
  "Platform IAM",
]
