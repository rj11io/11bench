/**
 * Assay — detection assurance domain model.
 *
 * The shape follows MITRE ATT&CK v18: technique -> detection strategy ->
 * analytic -> log source / data component. Each link can fail on its own, and
 * the assurance state names which one did.
 *
 * All data in this module is a demo fixture. Nothing here is connected to a
 * real security product.
 */

export type Role = "engineer" | "manager" | "auditor"

export type TabId = "assurance" | "coverage" | "scenarios" | "report"

export type Density = "comfortable" | "compact"

/** Ordered by how much is actually known. See prd.md section 4.2. */
export type AssuranceState =
  | "verified"
  | "decaying"
  | "assumed"
  | "broken"
  | "blind"
  | "accepted"

export type LogSourceStatus = "healthy" | "degraded" | "silent"

export type LogSourceKind =
  | "identity"
  | "endpoint"
  | "cloud-audit"
  | "network"
  | "email"
  | "saas"

export type ValidationMethod = "atomic" | "bas" | "purple" | "manual"

/** A graded ladder, not a pass/fail. "logged-only" is a different defect. */
export type ValidationResult = "alerted" | "detected" | "logged-only" | "missed"

export type FixClass =
  | "validate"
  | "revalidate"
  | "restore-telemetry"
  | "repair-mapping"
  | "tune"
  | "author-analytic"

export type FindingStatus = "open" | "assigned" | "validating" | "resolved"

export type AcceptanceReason =
  | "compensating-control"
  | "telemetry-unavailable"
  | "not-applicable"
  | "accepted-business-risk"
  | "vendor-limitation"

export type Tier = 1 | 2 | 3

export interface Tactic {
  id: string
  name: string
  short: string
}

export interface Technique {
  id: string
  name: string
  tacticId: string
  tier: Tier
  platforms: string[]
  /** 0..1 — where it came from is always cited on screen. */
  threatWeight: number
  threatRank?: number
  threatSource: string
  /** Crown-jewel asset groups this technique can reach. */
  assetGroups: string[]
  strategyId: string
}

export interface DetectionStrategy {
  id: string
  name: string
  techniqueId: string
}

export interface Analytic {
  id: string
  title: string
  strategyId: string
  techniqueId: string
  platform: string
  enabled: boolean
  sourceSystem: "siem-native" | "sigma" | "mdr"
  repoPath: string
  logSourceIds: string[]
  dataComponents: string[]
  /** Fields the rule references that no longer exist in the schema. */
  missingFields: string[]
  fires30d: number
  truePositives30d: number
  falsePositives30d: number
  lastFiredAt: number | null
}

export interface LogSource {
  id: string
  name: string
  vendor: string
  kind: LogSourceKind
  status: LogSourceStatus
  lastEventAt: number
  expectedIntervalMin: number
  parseErrorRate: number
  /** Daily event volume, oldest first. Deterministic fixture. */
  volume14d: number[]
  owner: string
  note?: string
}

export interface Validation {
  id: string
  techniqueId: string
  analyticId: string | null
  method: ValidationMethod
  testId: string
  operator: string
  ranAt: number
  result: ValidationResult
  evidenceRef: string
  notes?: string
}

export interface Acceptance {
  findingId: string
  techniqueId: string
  reason: AcceptanceReason
  justification: string
  requestedBy: string
  requestedAt: number
  approvedBy: string | null
  approvedAt: number | null
  expiresAt: number
}

export interface AuditEvent {
  id: string
  at: number
  actor: string
  role: Role
  action: string
  targetType: "finding" | "technique" | "log-source" | "service-level" | "demo"
  targetId: string
  detail: string
  fanOut?: string[]
}

export interface ScenarioStep {
  techniqueId: string
  label: string
}

export interface Scenario {
  id: string
  name: string
  summary: string
  sourceLabel: string
  sourceUrl: string
  steps: ScenarioStep[]
}

export interface Connector {
  id: string
  name: string
  vendor: string
  purpose: string
  /** Every connector in the demo is a fixture. There is no live integration. */
  fixtureOf: string
  records: number
}

/* ---------------------------------------------------------------------- */
/* Derived shapes — computed, never stored. See prd.md section 7.          */
/* ---------------------------------------------------------------------- */

export interface AnalyticHealth {
  analytic: Analytic
  status: "healthy" | "degraded" | "broken"
  reason: string
  blockingLogSourceIds: string[]
  precision: number | null
}

export type FidelityFlag = "ok" | "noisy" | "never-fired" | "unknown"

export interface PriorityTerm
  extends Record<"label" | "source" | "note", string> {
  value: number
  display: string
  running: number
}

export interface DerivedFinding {
  id: string
  technique: Technique
  tactic: Tactic
  state: AssuranceState
  /** Plain sentence naming the link that failed. */
  reason: string
  /** Which of the four inputs is the problem. */
  failingInput: "content" | "telemetry" | "validation" | "fidelity" | "none"
  status: FindingStatus
  priority: number
  terms: PriorityTerm[]
  fixClass: FixClass
  analytics: AnalyticHealth[]
  validations: Validation[]
  latestPass: Validation | null
  evidenceAgeDays: number | null
  freshnessWindowDays: number
  confidence: number
  fidelity: FidelityFlag
  fidelityNote: string
  blockingLogSourceIds: string[]
  owner: string | null
  dueAt: number | null
  acceptance: Acceptance | null
}

export interface StateCount {
  state: AssuranceState
  count: number
}

export interface CoverageSummary {
  scopedTotal: number
  tierOneTotal: number
  verified: number
  decaying: number
  assumed: number
  broken: number
  blind: number
  accepted: number
  tierOneVerified: number
  /** Anything with a mapped, enabled analytic — what other tools call coverage. */
  claimedPct: number
  verifiedPct: number
  gapPoints: number
  tierOneVerifiedPct: number
  budgetTotal: number
  budgetUsed: number
  brokenAnalytics: number
  brokenLogSources: number
}
