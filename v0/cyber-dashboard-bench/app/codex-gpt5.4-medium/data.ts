export type ScenarioId = "normal" | "surge" | "quiet"
export type CampaignStatus =
  | "draft"
  | "planned"
  | "in-change"
  | "validating"
  | "verified"
  | "stalled"
export type EnvironmentId = "all" | "prod" | "shared" | "preview"
export type OwnerId = "all" | "platform" | "identity" | "payments" | "data"

export type Exposure = {
  id: string
  title: string
  service: string
  environment: Exclude<EnvironmentId, "all">
  owner: Exclude<OwnerId, "all">
  severity: "critical" | "high" | "medium"
  score: number
  kev: boolean
  epss: number
  cvss: number
  assets: number
  identities: number
  effort: "low" | "medium" | "high"
  narrative: string
  attackPath: string
  recommendedAction: string
  findings: string[]
  scoreParts: {
    label: string
    value: number
  }[]
  linkedCampaignId: string
  state: "new" | "worsened" | "steady"
}

export type Campaign = {
  id: string
  title: string
  owner: string
  dueDate: string
  status: CampaignStatus
  progress: number
  validation: string
  changeWindow: string
  proof: string
  exposureIds: string[]
}

export type ProofPoint = {
  label: string
  value: number
}

export type Scenario = {
  id: ScenarioId
  label: string
  tone: string
  banner?: string
  snapshot: {
    openPaths: number
    kevPaths: number
    verifiedThisWeek: number
    atRiskSla: number
  }
  delta: {
    newItems: number
    worsenedItems: number
    resolvedItems: number
  }
  trends: ProofPoint[]
  severityMix: ProofPoint[]
  exposures: Exposure[]
  campaigns: Campaign[]
}

export const ownerLabels: Record<Exclude<OwnerId, "all">, string> = {
  platform: "Platform",
  identity: "Identity",
  payments: "Payments",
  data: "Data",
}

export const environmentLabels: Record<Exclude<EnvironmentId, "all">, string> = {
  prod: "Production",
  shared: "Shared services",
  preview: "Preview",
}

export const statusLabels: Record<CampaignStatus, string> = {
  draft: "Draft",
  planned: "Planned",
  "in-change": "In change",
  validating: "Validating",
  verified: "Verified",
  stalled: "Stalled",
}

const baseCampaigns: Campaign[] = [
  {
    id: "camp-payments-edge",
    title: "Break the payments internet-to-admin path",
    owner: "Platform + Payments",
    dueDate: "Jul 19",
    status: "planned",
    progress: 42,
    validation: "Connector refresh + ALB policy diff",
    changeWindow: "Thu 19:00-21:00 UTC",
    proof: "Expected to remove one KEV-backed path into `payments-api`.",
    exposureIds: ["exp-alb-kev", "exp-vpn-admin"],
  },
  {
    id: "camp-lake-role",
    title: "Cut analyst-to-lake privilege chaining",
    owner: "Identity",
    dueDate: "Jul 23",
    status: "validating",
    progress: 78,
    validation: "IAM diff + role assumption test",
    changeWindow: "Already deployed, awaiting rescan",
    proof: "Should remove lateral movement into customer event storage.",
    exposureIds: ["exp-lake-role"],
  },
  {
    id: "camp-preview-drain",
    title: "Drain preview backlog without paging the platform team",
    owner: "Platform",
    dueDate: "Jul 26",
    status: "draft",
    progress: 18,
    validation: "Weekly patch roll-up",
    changeWindow: "Batch with Tuesday patch train",
    proof: "Bundles low-effort preview exposures to protect engineer focus.",
    exposureIds: ["exp-k8s-preview"],
  },
]

export const scenarios: Scenario[] = [
  {
    id: "normal",
    label: "Normal",
    tone: "The team is under control, but three attack paths still deserve action this week.",
    snapshot: {
      openPaths: 6,
      kevPaths: 2,
      verifiedThisWeek: 4,
      atRiskSla: 3,
    },
    delta: {
      newItems: 2,
      worsenedItems: 1,
      resolvedItems: 4,
    },
    trends: [
      { label: "Week -5", value: 13 },
      { label: "Week -4", value: 12 },
      { label: "Week -3", value: 11 },
      { label: "Week -2", value: 9 },
      { label: "Week -1", value: 8 },
      { label: "This week", value: 6 },
    ],
    severityMix: [
      { label: "Critical", value: 2 },
      { label: "High", value: 3 },
      { label: "Medium", value: 1 },
    ],
    exposures: [
      {
        id: "exp-alb-kev",
        title: "Public admin edge retains a KEV-backed path into `payments-api`",
        service: "Payments API",
        environment: "prod",
        owner: "platform",
        severity: "critical",
        score: 94,
        kev: true,
        epss: 0.93,
        cvss: 9.8,
        assets: 3,
        identities: 2,
        effort: "medium",
        narrative:
          "A public edge host with a KEV-linked patch gap still terminates admin traffic and reaches a critical service.",
        attackPath:
          "Internet -> ALB admin listener -> legacy bastion role -> payments-api maintenance path",
        recommendedAction:
          "Remove the admin listener, rotate the legacy role, and force access through the private maintenance entrypoint.",
        findings: [
          "CISA KEV match on legacy edge component",
          "External reachability confirmed",
          "Privileged maintenance role still trustable from the bastion",
        ],
        scoreParts: [
          { label: "Exploitability", value: 28 },
          { label: "Reachability", value: 24 },
          { label: "Service criticality", value: 22 },
          { label: "Identity chaining", value: 14 },
          { label: "Remediation effort", value: 6 },
        ],
        linkedCampaignId: "camp-payments-edge",
        state: "worsened",
      },
      {
        id: "exp-lake-role",
        title: "Analyst support role can still bridge into the customer event lake",
        service: "Customer Event Lake",
        environment: "shared",
        owner: "identity",
        severity: "high",
        score: 81,
        kev: false,
        epss: 0.41,
        cvss: 8.1,
        assets: 6,
        identities: 4,
        effort: "low",
        narrative:
          "Permissions drift keeps a human support role one step away from production event storage with PII and payment metadata.",
        attackPath:
          "Support analyst role -> shared observability account -> cross-account lake read access",
        recommendedAction:
          "Tighten trust policy, remove the lake read action from the observability bridge, and validate with an assumption test.",
        findings: [
          "Cross-account trust overly broad",
          "Lake read grant still attached after the June migration",
          "Asset criticality elevated due to regulated data",
        ],
        scoreParts: [
          { label: "Exploitability", value: 16 },
          { label: "Reachability", value: 13 },
          { label: "Service criticality", value: 24 },
          { label: "Identity chaining", value: 21 },
          { label: "Remediation effort", value: 7 },
        ],
        linkedCampaignId: "camp-lake-role",
        state: "steady",
      },
      {
        id: "exp-vpn-admin",
        title: "Emergency VPN group still grants admin path into card-processing nodes",
        service: "Card Processor",
        environment: "prod",
        owner: "payments",
        severity: "high",
        score: 76,
        kev: true,
        epss: 0.67,
        cvss: 8.7,
        assets: 11,
        identities: 8,
        effort: "high",
        narrative:
          "Emergency access stayed open after an incident drill, leaving a broad operator group with a short path to sensitive workloads.",
        attackPath:
          "VPN emergency group -> jump subnet -> card-processing admin nodes",
        recommendedAction:
          "Expire the emergency group, replace with just-in-time access, and validate node isolation from the jump subnet.",
        findings: [
          "Broad membership on emergency VPN group",
          "Jump subnet still trusted by card-processing nodes",
          "KEV exposure increases urgency of adjacent patch gaps",
        ],
        scoreParts: [
          { label: "Exploitability", value: 21 },
          { label: "Reachability", value: 17 },
          { label: "Service criticality", value: 20 },
          { label: "Identity chaining", value: 13 },
          { label: "Remediation effort", value: 5 },
        ],
        linkedCampaignId: "camp-payments-edge",
        state: "new",
      },
      {
        id: "exp-k8s-preview",
        title: "Preview cluster image drift is creating recyclable patch debt",
        service: "Preview Cluster",
        environment: "preview",
        owner: "platform",
        severity: "medium",
        score: 54,
        kev: false,
        epss: 0.13,
        cvss: 6.3,
        assets: 18,
        identities: 1,
        effort: "low",
        narrative:
          "The preview cluster is not critical, but repeated image drift is generating noisy backlog and avoidable reopen risk.",
        attackPath:
          "Outdated preview node image -> inherited package exposure -> repeat backlog",
        recommendedAction:
          "Move preview node pools to the weekly image train and auto-expire stale namespaces.",
        findings: [
          "Repeated reappearance across two patch cycles",
          "Low direct business impact",
          "Good candidate for batching",
        ],
        scoreParts: [
          { label: "Exploitability", value: 10 },
          { label: "Reachability", value: 8 },
          { label: "Service criticality", value: 9 },
          { label: "Identity chaining", value: 4 },
          { label: "Remediation effort", value: 23 },
        ],
        linkedCampaignId: "camp-preview-drain",
        state: "steady",
      },
    ],
    campaigns: baseCampaigns,
  },
  {
    id: "surge",
    label: "Surge",
    tone: "A fresh exploited path and an overdue change window push the team into high attention mode.",
    banner:
      "High-attention mode: one KEV-backed exposure path crossed its SLA buffer and should be treated as the next change window priority.",
    snapshot: {
      openPaths: 9,
      kevPaths: 4,
      verifiedThisWeek: 2,
      atRiskSla: 5,
    },
    delta: {
      newItems: 4,
      worsenedItems: 3,
      resolvedItems: 1,
    },
    trends: [
      { label: "Week -5", value: 12 },
      { label: "Week -4", value: 12 },
      { label: "Week -3", value: 11 },
      { label: "Week -2", value: 10 },
      { label: "Week -1", value: 8 },
      { label: "This week", value: 9 },
    ],
    severityMix: [
      { label: "Critical", value: 4 },
      { label: "High", value: 3 },
      { label: "Medium", value: 2 },
    ],
    exposures: [
      {
        id: "exp-alb-kev",
        title: "Public admin edge retains a KEV-backed path into `payments-api`",
        service: "Payments API",
        environment: "prod",
        owner: "platform",
        severity: "critical",
        score: 97,
        kev: true,
        epss: 0.96,
        cvss: 9.8,
        assets: 3,
        identities: 2,
        effort: "medium",
        narrative:
          "Active exploit evidence plus overdue remediation keeps this path as the most urgent operational item.",
        attackPath:
          "Internet -> ALB admin listener -> legacy bastion role -> payments-api maintenance path",
        recommendedAction:
          "Use the emergency change window tonight; disable the listener first, then rotate the legacy role.",
        findings: [
          "CISA KEV match",
          "SLA buffer crossed",
          "Change can be split into containment and hardening steps",
        ],
        scoreParts: [
          { label: "Exploitability", value: 30 },
          { label: "Reachability", value: 24 },
          { label: "Service criticality", value: 22 },
          { label: "Identity chaining", value: 15 },
          { label: "Remediation effort", value: 6 },
        ],
        linkedCampaignId: "camp-payments-edge",
        state: "worsened",
      },
      {
        id: "exp-ci-signing",
        title: "CI signing runner can still publish to the production artifact channel",
        service: "Release Pipeline",
        environment: "shared",
        owner: "platform",
        severity: "critical",
        score: 88,
        kev: false,
        epss: 0.37,
        cvss: 8.8,
        assets: 5,
        identities: 3,
        effort: "medium",
        narrative:
          "A non-production runner retained production publish capability after the pipeline split, creating a high-impact supply-chain path.",
        attackPath:
          "Preview CI runner -> artifact signing role -> production artifact channel",
        recommendedAction:
          "Split the signing role, rotate the production token, and pin publish rights to the dedicated runner pool.",
        findings: [
          "Cross-environment publish permission",
          "Production artifact impact",
          "Role inheritance regression after pipeline migration",
        ],
        scoreParts: [
          { label: "Exploitability", value: 15 },
          { label: "Reachability", value: 18 },
          { label: "Service criticality", value: 28 },
          { label: "Identity chaining", value: 20 },
          { label: "Remediation effort", value: 7 },
        ],
        linkedCampaignId: "camp-payments-edge",
        state: "new",
      },
      {
        id: "exp-lake-role",
        title: "Analyst support role can still bridge into the customer event lake",
        service: "Customer Event Lake",
        environment: "shared",
        owner: "identity",
        severity: "high",
        score: 82,
        kev: false,
        epss: 0.41,
        cvss: 8.1,
        assets: 6,
        identities: 4,
        effort: "low",
        narrative:
          "The path remains one change away from verified closure, but it has not fully dropped out of the graph yet.",
        attackPath:
          "Support analyst role -> shared observability account -> cross-account lake read access",
        recommendedAction:
          "Complete verification and capture the assumption test result as proof.",
        findings: [
          "Validation pending",
          "Data sensitivity remains high",
          "Good candidate for fast proof win",
        ],
        scoreParts: [
          { label: "Exploitability", value: 16 },
          { label: "Reachability", value: 13 },
          { label: "Service criticality", value: 24 },
          { label: "Identity chaining", value: 22 },
          { label: "Remediation effort", value: 7 },
        ],
        linkedCampaignId: "camp-lake-role",
        state: "steady",
      },
      {
        id: "exp-preview-token",
        title: "Preview support token can still reach shared operational APIs",
        service: "Ops Shared APIs",
        environment: "preview",
        owner: "data",
        severity: "medium",
        score: 58,
        kev: false,
        epss: 0.09,
        cvss: 6.1,
        assets: 8,
        identities: 5,
        effort: "low",
        narrative:
          "Not the top business risk, but a classic source of reopen noise if not batched cleanly.",
        attackPath:
          "Preview support token -> shared operational APIs",
        recommendedAction:
          "Expire the token and move preview support into environment-scoped credentials.",
        findings: [
          "Legacy token not rotated",
          "Shared API reachability retained",
          "Low-cost fix",
        ],
        scoreParts: [
          { label: "Exploitability", value: 9 },
          { label: "Reachability", value: 14 },
          { label: "Service criticality", value: 12 },
          { label: "Identity chaining", value: 8 },
          { label: "Remediation effort", value: 15 },
        ],
        linkedCampaignId: "camp-preview-drain",
        state: "new",
      },
    ],
    campaigns: [
      {
        ...baseCampaigns[0],
        status: "in-change",
        progress: 61,
        proof:
          "Containment step started. Verification still needed before the KEV-backed path can be considered broken.",
      },
      baseCampaigns[1],
      {
        ...baseCampaigns[2],
        status: "stalled",
        progress: 18,
        proof: "Stalled while the Tuesday patch train waits for image signing approval.",
      },
    ],
  },
  {
    id: "quiet",
    label: "Quiet",
    tone: "No critical exposure paths are active right now. The operator view shifts from triage to proof and hygiene.",
    snapshot: {
      openPaths: 0,
      kevPaths: 0,
      verifiedThisWeek: 6,
      atRiskSla: 0,
    },
    delta: {
      newItems: 0,
      worsenedItems: 0,
      resolvedItems: 6,
    },
    trends: [
      { label: "Week -5", value: 6 },
      { label: "Week -4", value: 4 },
      { label: "Week -3", value: 3 },
      { label: "Week -2", value: 2 },
      { label: "Week -1", value: 1 },
      { label: "This week", value: 0 },
    ],
    severityMix: [
      { label: "Critical", value: 0 },
      { label: "High", value: 0 },
      { label: "Medium", value: 0 },
    ],
    exposures: [],
    campaigns: [
      {
        id: "camp-proof-closeout",
        title: "Close audit loop on last week’s payments path",
        owner: "Security",
        dueDate: "Jul 18",
        status: "verified",
        progress: 100,
        validation: "Rescan complete",
        changeWindow: "Completed",
        proof: "Evidence package ready for leadership review and audit retention.",
        exposureIds: [],
      },
    ],
  },
]
