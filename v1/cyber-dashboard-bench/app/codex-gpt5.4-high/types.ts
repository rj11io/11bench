export type Priority = "critical" | "high" | "medium" | "low"

export type StepStatus =
  "todo" | "in_progress" | "in_review" | "done" | "accepted"

export type PathStatus =
  | "active"
  | "in_progress"
  | "in_review"
  | "chain_prevented"
  | "accepted"
  | "resolved"

export type Environment = "Hybrid" | "AWS" | "Azure"

export interface PathNode {
  id: string
  label: string
  kind: "entry" | "asset" | "identity" | "control" | "data"
  detail: string
  chokePoint?: boolean
}

export interface RemediationStep {
  id: string
  title: string
  owner: string
  due: string
  domain: "Identity" | "Cloud" | "Endpoint" | "Data" | "Application"
  riskCut: string
  status: StepStatus
}

export interface ActivityEvent {
  id: string
  at: string
  actor: string
  detail: string
}

export interface SignalCard {
  label: string
  value: string
  tone: "critical" | "warning" | "good" | "neutral"
}

export interface ExposurePath {
  id: string
  title: string
  summary: string
  narrative: string
  priority: Priority
  environment: Environment
  businessService: string
  targetAsset: string
  entryPoint: string
  crownJewel: boolean
  blastRadius: string
  exploitEvidence: string
  lastUpdated: string
  pathCount: number
  assetsAtRisk: number
  exposureScore: number
  validationScore: number
  steps: RemediationStep[]
  nodes: PathNode[]
  evidence: string[]
  owners: string[]
  signals: SignalCard[]
  baseEvents: ActivityEvent[]
  note: string
}

export interface PersistedState {
  crownOnly: boolean
  environmentFilter: "all" | Environment
  scopeFilter: "open" | "worked" | "closed" | "all"
  search: string
  selectedPathId: string
  paths: Array<{
    id: string
    note: string
    steps: Array<{
      id: string
      owner: string
      status: StepStatus
    }>
  }>
}
