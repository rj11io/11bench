export type Scenario = "first-run" | "steady" | "kev-morning"

export type ViewId = "queue" | "reports" | "assets"

export type Severity = "critical" | "high" | "medium" | "low"

export type PackStatus =
  | "open"
  | "in_progress"
  | "submitted"
  | "verified"
  | "accepted"

export type AssetKind = "service" | "host" | "database" | "repo" | "fleet"

export type Criticality = "crown" | "standard" | "low"

export interface Asset {
  id: string
  name: string
  kind: AssetKind
  environment: "prod" | "staging" | "corp"
  internetFacing: boolean
  criticality: Criticality
  criticalityReason: string
  owner: string
}

export interface Finding {
  cve: string
  title: string
  source: string
  cvss: number
  epss: number
  kev: boolean
}

export interface ScoreFactor {
  id: "kev" | "epss" | "exposure" | "criticality" | "blast"
  label: string
  weight: number
  /** 0..1 — how much of the weight this pack earns */
  value: number
  contribution: number
  evidence: string
  source: string
}

export interface FixPack {
  id: string
  title: string
  action: string
  packageOrArea: string
  findingCount: number
  findings: Finding[]
  assetIds: string[]
  /** days ago the pack was first assembled */
  firstSeenDaysAgo: number
  kev: boolean
  kevAddedDaysAgo?: number
  epss: number
  remediation: string[]
  verification: string
  /** set by the kev-morning scenario when new evidence re-ranked this pack */
  evidenceChanged?: string
  defaultStatus: PackStatus
  defaultOwnerId?: string
}

export interface Person {
  id: string
  name: string
  team: string
  initials: string
}

export interface ActivityEvent {
  at: number
  actor: string
  action: string
  detail?: string
}

export interface PackOverride {
  status?: PackStatus
  ownerId?: string | null
  acceptedReason?: string
  acceptedUntil?: string
  activity: ActivityEvent[]
}

export interface DemoState {
  scenario: Scenario
  overrides: Record<string, PackOverride>
}

export interface SlaPolicy {
  critical: number
  high: number
  medium: number
  low: number
}

export interface ScoredPack extends FixPack {
  score: number
  severity: Severity
  factors: ScoreFactor[]
  status: PackStatus
  ownerId: string | null
  activity: ActivityEvent[]
  acceptedReason?: string
  acceptedUntil?: string
  slaDays: number
  /** ms timestamp the fix is due */
  dueAt: number
  breached: boolean
}
