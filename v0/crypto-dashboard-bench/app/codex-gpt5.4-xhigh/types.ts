export type ScenarioKey = "steady" | "liquidityShock" | "usdcStress"
export type LensKey = "all" | "breaches" | "stablecoins" | "protocols"
export type SegmentKey = "issuer" | "chain" | "venue" | "wallet"
export type WorkspaceMode = "liveDemo" | "empty"
export type Severity = "low" | "medium" | "high" | "critical"
export type PolicyStatus = "pass" | "warn" | "breach"

export interface Position {
  id: string
  asset: string
  issuer: string
  chain: string
  venue: string
  wallet: string
  walletType: "Safe" | "Watch-only" | "Custody"
  kind: "spot" | "vault" | "lending" | "collateral"
  valueUsd: number
  change24hPct: number
  liquidityBucket: "T+0" | "T+1" | "T+3"
  riskLevel: Severity
  notes: string
  tags: string[]
  source: string
  updatedAt: string
  underlying?: string
  healthFactor?: number
}

export interface PolicyCheck {
  id: string
  name: string
  owner: string
  target: string
  current: string
  status: PolicyStatus
  note: string
}

export interface AlertItem {
  id: string
  title: string
  detail: string
  severity: Severity
  source: string
  time: string
}

export interface ActionPlan {
  id: string
  title: string
  summary: string
  severity: Severity
  owner: string
  signerPolicy: string
  delivery: string
  impact: string
  deltaT0Usd: number
  deltaIssuerPct: number
  breachesResolved: number
  tags: string[]
}

export interface SourceItem {
  id: string
  name: string
  category: "On-chain" | "Market" | "Reserve" | "Compliance" | "Protocol"
  updatedAt: string
  freshness: string
  confidence: "Confirmed" | "Estimated" | "Attested" | "Screened"
  detail: string
}

export interface LiquidityBucket {
  label: string
  valueUsd: number
  settlement: string
  haircut: string
}

export interface TrendPoint {
  label: string
  totalRunway: number
  immediateRunway: number
  policyFloor: number
}

export interface ScenarioSnapshot {
  key: ScenarioKey
  label: string
  banner: string
  incident: string
  asOf: string
  syncedAt: string
  metrics: {
    treasuryUsd: number
    t0Usd: number
    t1Usd: number
    monthlyBurnUsd: number
    totalRunwayMonths: number
    immediateRunwayMonths: number
    policyBreaches: number
    atRiskUsd: number
    netChange24hPct: number
    coveragePct: number
    wallets: number
    chains: number
  }
  trend: TrendPoint[]
  liquidity: LiquidityBucket[]
  positions: Position[]
  policies: PolicyCheck[]
  alerts: AlertItem[]
  actions: ActionPlan[]
  sources: SourceItem[]
}

export interface DemoWorkspace {
  name: string
  entity: string
  signers: number
  chains: string[]
  policyTemplate: string
  upcoming: string[]
  onboarding: string[]
  scenarios: Record<ScenarioKey, ScenarioSnapshot>
}
