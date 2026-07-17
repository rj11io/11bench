export type AssetClass = "stable" | "major" | "staked" | "own"
export type LiquidityTier = "deep" | "moderate" | "thin"
export type RiskKind = "issuer" | "contract" | "market" | "concentration"

export interface RiskTag {
  kind: RiskKind
  text: string
}

export interface Asset {
  id: string
  symbol: string
  name: string
  cls: AssetClass
  /** Stablecoin issuer, when the asset is a stablecoin. */
  issuer?: string
  /** Plain-language regulatory context shown on stablecoin rows. */
  regNote?: string
  /** Seeded demo price at the fixed demo clock. */
  basePrice: number
  /** Seeded 24h change, in percent, before any scenario is applied. */
  change24hPct: number
  pegTarget?: number
  liquidity: LiquidityTier
  riskTags: RiskTag[]
}

export type CustodyKind = "safe" | "exchange"

export interface CustodyAccount {
  id: string
  name: string
  kind: CustodyKind
  chain: string
  /** First and last characters of the checksummed address (never the full string). */
  addressShort?: string
  /** Multisig signer threshold, e.g. "3 of 5". */
  threshold?: string
  feed: {
    source: string
    asOfLabel: string
    stale?: boolean
  }
}

export interface Position {
  accountId: string
  assetId: string
  qty: number
}

export type OrgId = "meridian" | "fresh"

export interface Org {
  id: OrgId
  name: string
  burnMonthlyUsd: number
  accounts: CustodyAccount[]
  positions: Position[]
}

export type ScenarioPreset = "none" | "correction" | "crisis" | "custom"

export interface Scenario {
  preset: ScenarioPreset
  /** Percent drop applied to majors + staked assets (0–80). */
  majorsDrawdownPct: number
  /** Percent drop applied to the org's own token (0–90). */
  ownDrawdownPct: number
  /** When true, USDT trades at $0.985 in the scenario. */
  usdtDepeg: boolean
  /** Multiplier on monthly net burn (0.5–2). */
  burnMultiplier: number
}

export interface PolicyConfig {
  /** Stablecoins must cover at least this many months of burn. */
  stableFloorMonths: number
  /** No single issuer may back more than this share of stablecoins (%). */
  issuerCapPct: number
  /** Volatile assets (majors + staked) may be at most this share of treasury (%). */
  volatileCapPct: number
  /** The org's own token may be at most this share of treasury (%). */
  ownTokenCapPct: number
  /** No single exchange account may hold more than this share of treasury (%). */
  venueCapPct: number
}

export type PolicyStatus = "pass" | "warn" | "fail"

export interface PolicyResult {
  id: string
  name: string
  status: PolicyStatus
  /** Plain sentence explaining the current state. */
  detail: string
  /** Measured value and limit, in the rule's own unit, for meters/labels. */
  measured: number
  limit: number
  unit: "months" | "%"
}

export interface Move {
  id: string
  fromAssetId: string
  toAssetId: string
  usd: number
}

export interface Proposal {
  id: string
  title: string
  createdAtLabel: string
  moves: Move[]
  status: "pending"
  sigHave: number
  sigTotal: number
  /** Signer-readable summary lines. */
  summary: string[]
}

export interface PositionRow {
  position: Position
  asset: Asset
  account: CustodyAccount
  price: number
  change24hPct: number
  valueUsd: number
  shareOfTreasuryPct: number
}

export interface StressCase {
  label: string
  /** Additional fractional drop applied to volatile spendable value (0, 0.3, 0.6). */
  extraDrawdown: number
  runwayMonths: number
}

export interface Snapshot {
  rows: PositionRow[]
  totalUsd: number
  byClass: Record<AssetClass, number>
  stablesUsd: number
  spendableUsd: number
  burnMonthlyUsd: number
  runwayMonths: number
  stressCases: StressCase[]
  stableFloorMonths: number
  issuerShares: { issuer: string; usd: number; pct: number }[]
  venueShares: { account: CustodyAccount; usd: number; pct: number }[]
  policyResults: PolicyResult[]
}
