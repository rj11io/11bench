export type TabKey = "overview" | "missions" | "owners" | "audit"

export type WorkflowState =
  | "new"
  | "notified"
  | "in_progress"
  | "resolved"
  | "accepted"

export type FilterKey =
  | "all"
  | "breached"
  | "unassigned"
  | WorkflowState

export type Severity = "critical" | "high" | "medium"

export type PathNodeKind =
  | "entry"
  | "application"
  | "identity"
  | "compute"
  | "control"
  | "data"
  | "service"
  | "network"
  | "software"

export type EvidenceSignalType =
  | "kev"
  | "reachability"
  | "identity"
  | "data"
  | "control_gap"
  | "software"
  | "secret"

export type ControlStatus = "strong" | "partial" | "missing"

export type TargetType = "data_store" | "service" | "identity" | "network"

export interface AuditEvent {
  id: string
  timestamp: string
  actor: string
  action: string
  details: string
}

export interface ScoreFactor {
  label: string
  score: number
  description: string
}

export interface EvidenceSignal {
  type: EvidenceSignalType
  label: string
  impactLabel: string
}

export interface AttackPathNode {
  id: string
  label: string
  detail: string
  kind: PathNodeKind
}

export interface RemediationStep {
  id: string
  title: string
  ownerHint: string
  reduction: number
}

export interface ControlStatusItem {
  id: string
  label: string
  status: ControlStatus
  note: string
}

export interface OwnerTeam {
  id: string
  name: string
  lead: string
  domain: string
  coverageConfidence: number
  defaultSlaDays: number
}

export interface ExposureMission {
  id: string
  title: string
  summary: string
  severity: Severity
  riskScore: number
  workflowState: WorkflowState
  ownerTeamId: string
  businessService: string
  crownJewel: string
  dueDate: string
  lastValidatedAt: string
  findingCount: number
  targetType: TargetType
  attackPath: {
    entryPoint: string
    chokePoint: string
    target: string
    simulationLabel: string
    nodes: AttackPathNode[]
  }
  evidence: EvidenceSignal[]
  scoreFactors: ScoreFactor[]
  remediationSteps: RemediationStep[]
  controls: ControlStatusItem[]
  sourceSystems: string[]
  timeline: AuditEvent[]
}

export interface PersistedDashboardState {
  version: number
  activeTab: TabKey
  activeFilter: FilterKey
  search: string
  selectedMissionId: string
  missions: ExposureMission[]
}
