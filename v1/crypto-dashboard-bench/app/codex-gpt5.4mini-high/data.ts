export type ScenarioId = "normal" | "watch" | "stress"
export type BalanceMode = "reported" | "calculated"
export type ViewId = "overview" | "wallets" | "protocols" | "risk" | "evidence"
export type RangeId = "7d" | "30d" | "90d"
export type WalletId = "ops" | "reserve" | "yield" | "bridge"
export type ProtocolId = "aave" | "morpho" | "curve"
export type AlertSeverity = "info" | "warning" | "critical"
export type SourceStatus = "current" | "stale" | "degraded"
export type TrustState = "healthy" | "watch" | "risk"

export interface WalletMeta {
  id: WalletId
  name: string
  chain: string
  custody: string
  purpose: string
  policy: string
  tags: string[]
}

export interface WalletState {
  reported: number
  calculated: number
  freshness: string
  confidence: "high" | "medium" | "low"
  status: TrustState
  note: string
}

export interface ProtocolMeta {
  id: ProtocolId
  name: string
  chain: string
  category: string
  tokens: string
  guardrail: string
}

export interface ProtocolState {
  value: number
  apy: number
  tvlShare: number
  freshness: string
  risk: TrustState
  lock: string
  status: TrustState
  note: string
}

export interface AlertItem {
  id: string
  severity: AlertSeverity
  title: string
  detail: string
  action: string
  source: string
}

export interface SourceRow {
  name: string
  method: string
  freshness: string
  powers: string
  basis: string
  status: SourceStatus
}

export interface TrendPoint {
  label: string
  reported: number
  calculated: number
}

export interface CoveragePoint {
  label: string
  coverage: number
  target: number
}

export interface ScenarioView {
  label: string
  tone: "calm" | "watch" | "critical"
  snapshot: string
  treasuryReported: number
  treasuryCalculated: number
  liquidCoverageReported: number
  liquidCoverageCalculated: number
  riskScore: number
  openCount: number
  summary: string
  headline: string
  wallets: Record<WalletId, WalletState>
  protocols: Record<ProtocolId, ProtocolState>
  alerts: AlertItem[]
  sources: SourceRow[]
  treasurySeries: TrendPoint[]
  coverageSeries: CoveragePoint[]
  protocolMix: Array<{
    id: ProtocolId
    name: string
    value: number
    share: number
    status: TrustState
  }>
}

export const workspaceMeta = {
  name: "Northstar Reserve",
  product: "Reserve Desk",
  domain: "stablecoin treasury risk review",
  decisionWindow: "Daily 08:30 UTC review",
  liabilities30d: 9_800_000,
  liabilities90d: 28_400_000,
  monthlyBurn: 8_900_000,
  targetCoverage: 1.25,
  posture:
    "Read-only. No custody, no trade execution, no wallet permissions, no live API dependency.",
}

export const walletMeta: WalletMeta[] = [
  {
    id: "ops",
    name: "Operations hot wallet",
    chain: "Ethereum + Base",
    custody: "Custodian API",
    purpose: "Fees, vendor payouts, and bridge flow",
    policy: "Daily spend cap $5m",
    tags: ["fee buffer", "payments"],
  },
  {
    id: "reserve",
    name: "Reserve cold storage",
    chain: "Bitcoin + Ethereum",
    custody: "Multisig",
    purpose: "Core reserve backing and capital preservation",
    policy: "2-of-3 approvals required",
    tags: ["proof of reserves", "core backing"],
  },
  {
    id: "yield",
    name: "Yield sleeve",
    chain: "Ethereum",
    custody: "DeFi vault",
    purpose: "Stablecoin yield and liquidity management",
    policy: "Exit if APY drops below 3.0%",
    tags: ["yield", "protocol exposure"],
  },
  {
    id: "bridge",
    name: "Settlement bridge",
    chain: "Base + Solana",
    custody: "Read-only wallet",
    purpose: "Cross-chain inventory and transfer routing",
    policy: "Manual release only",
    tags: ["bridge", "settlement"],
  },
]

export const protocolMeta: ProtocolMeta[] = [
  {
    id: "aave",
    name: "Aave v3",
    chain: "Ethereum",
    category: "Lending",
    tokens: "USDC, USDT",
    guardrail: "Prefer if depth and borrow rates stay within policy",
  },
  {
    id: "morpho",
    name: "Morpho Blue",
    chain: "Ethereum",
    category: "Optimized lending",
    tokens: "USDC",
    guardrail: "Exit if concentration exceeds 40% of the yield sleeve",
  },
  {
    id: "curve",
    name: "Curve 3Pool",
    chain: "Ethereum",
    category: "Liquidity",
    tokens: "USDC, USDT, DAI",
    guardrail: "Maintain as the fastest unwind path",
  },
]

const SNAPSHOT = new Date("2026-07-16T08:30:00Z")

const utcDayLabel = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date)

const roundUsd = (value: number) => Math.round(value / 1_000) * 1_000

const roundRatio = (value: number) => Math.round(value * 100) / 100

function buildTrendSeries({
  days,
  startReported,
  endReported,
  startCalculated,
  endCalculated,
  reportedWave,
  calculatedWave,
  phase = 0,
}: {
  days: number
  startReported: number
  endReported: number
  startCalculated: number
  endCalculated: number
  reportedWave: number
  calculatedWave: number
  phase?: number
}) {
  return Array.from({ length: days }, (_, index) => {
    const progress = days === 1 ? 1 : index / (days - 1)
    const date = new Date(SNAPSHOT)
    date.setUTCDate(date.getUTCDate() - (days - 1 - index))

    const reportedBase =
      startReported + (endReported - startReported) * progress
    const calculatedBase =
      startCalculated + (endCalculated - startCalculated) * progress
    const reported = roundUsd(
      reportedBase +
        Math.sin(progress * Math.PI * 2.4 + phase) * reportedWave
    )
    const calculated = roundUsd(
      calculatedBase +
        Math.sin(progress * Math.PI * 2.6 + phase + 0.25) * calculatedWave
    )

    return {
      label: utcDayLabel(date),
      reported,
      calculated,
    }
  })
}

function buildCoverageSeries({
  days,
  startCoverage,
  endCoverage,
  wave,
  target,
  phase = 0,
}: {
  days: number
  startCoverage: number
  endCoverage: number
  wave: number
  target: number
  phase?: number
}) {
  return Array.from({ length: days }, (_, index) => {
    const progress = days === 1 ? 1 : index / (days - 1)
    const date = new Date(SNAPSHOT)
    date.setUTCDate(date.getUTCDate() - (days - 1 - index))

    const coverage = roundRatio(
      startCoverage +
        (endCoverage - startCoverage) * progress +
        Math.sin(progress * Math.PI * 2 + phase) * wave
    )

    return {
      label: utcDayLabel(date),
      coverage,
      target,
    }
  })
}

const protocolMix = {
  normal: [
    { id: "aave" as const, name: "Aave v3", value: 61_800_000, share: 44.7, status: "healthy" as const },
    { id: "morpho" as const, name: "Morpho Blue", value: 44_900_000, share: 32.5, status: "watch" as const },
    { id: "curve" as const, name: "Curve 3Pool", value: 31_500_000, share: 22.8, status: "healthy" as const },
  ],
  watch: [
    { id: "aave" as const, name: "Aave v3", value: 57_600_000, share: 43.5, status: "healthy" as const },
    { id: "morpho" as const, name: "Morpho Blue", value: 42_200_000, share: 31.9, status: "watch" as const },
    { id: "curve" as const, name: "Curve 3Pool", value: 32_600_000, share: 24.6, status: "healthy" as const },
  ],
  stress: [
    { id: "aave" as const, name: "Aave v3", value: 54_100_000, share: 45.6, status: "watch" as const },
    { id: "morpho" as const, name: "Morpho Blue", value: 34_500_000, share: 29.1, status: "risk" as const },
    { id: "curve" as const, name: "Curve 3Pool", value: 30_100_000, share: 25.3, status: "healthy" as const },
  ],
} satisfies Record<ScenarioId, ScenarioView["protocolMix"]>

const scenarioViews: Record<ScenarioId, ScenarioView> = {
  normal: {
    label: "Calm",
    tone: "calm",
    snapshot: "16 Jul 2026 · 08:30 UTC",
    treasuryReported: 487_000_000,
    treasuryCalculated: 486_200_000,
    liquidCoverageReported: 1.46,
    liquidCoverageCalculated: 1.41,
    riskScore: 28,
    openCount: 4,
    summary:
      "Treasury is inside policy. The only real work is to keep the small balance gap and a few freshness windows under observation.",
    headline: "Ready for daily review",
    wallets: {
      ops: {
        reported: 42_300_000,
        calculated: 42_100_000,
        freshness: "2m",
        confidence: "high",
        status: "healthy",
        note: "Gas and vendor payouts are reconciled.",
      },
      reserve: {
        reported: 267_800_000,
        calculated: 267_800_000,
        freshness: "3m",
        confidence: "high",
        status: "healthy",
        note: "Core reserve bucket is fully matched.",
      },
      yield: {
        reported: 138_200_000,
        calculated: 137_100_000,
        freshness: "9m",
        confidence: "medium",
        status: "watch",
        note: "Accrual timing is slightly behind the ledger.",
      },
      bridge: {
        reported: 37_900_000,
        calculated: 37_900_000,
        freshness: "4m",
        confidence: "high",
        status: "healthy",
        note: "Bridge inventory stays inside release policy.",
      },
    },
    protocols: {
      aave: {
        value: 61_800_000,
        apy: 4.2,
        tvlShare: 44.7,
        freshness: "11m",
        risk: "healthy",
        lock: "No lock-up",
        status: "healthy",
        note: "Primary stablecoin lending sleeve.",
      },
      morpho: {
        value: 44_900_000,
        apy: 5.8,
        tvlShare: 32.5,
        freshness: "13m",
        risk: "watch",
        lock: "Withdrawal available with normal settlement delay",
        status: "watch",
        note: "Concentration is within guardrails, but it is the largest sleeve.",
      },
      curve: {
        value: 31_500_000,
        apy: 3.1,
        tvlShare: 22.8,
        freshness: "7m",
        risk: "healthy",
        lock: "Fast unwind path",
        status: "healthy",
        note: "Liquidity buffer is the cleanest exit path.",
      },
    },
    alerts: [
      {
        id: "normal-gap",
        severity: "warning",
        title: "Yield sleeve is $1.1m apart between reported and calculated basis",
        detail: "Likely accrual timing or a staking receipt that has not rolled into the ledger yet.",
        action: "Review the accrual source before the committee call.",
        source: "Custodian + ledger",
      },
      {
        id: "normal-freshness",
        severity: "info",
        title: "DeFiLlama protocol context is 11m old",
        detail: "Fresh enough for a routine review, but not ideal if the market starts moving.",
        action: "Refresh the risk view before any rebalance.",
        source: "DeFiLlama",
      },
      {
        id: "normal-screening",
        severity: "info",
        title: "One counterparty label is informational only",
        detail: "The address has a watchlist-style label in the demo seed, but no blocked-property claim.",
        action: "Open the source note if you want more context.",
        source: "OFAC-style screening",
      },
      {
        id: "normal-policy",
        severity: "info",
        title: "Policy headroom remains above the daily spend cap",
        detail: "Current operational outflows stay comfortably under the configured limit.",
        action: "No action needed unless the payment queue grows.",
        source: "Treasury policy",
      },
    ],
    sources: [
      {
        name: "CoinGecko price feed",
        method: "Contract-address pricing",
        freshness: "2m",
        powers: "Spot marks, market cap, and daily change",
        basis: "Demo FMV",
        status: "current",
      },
      {
        name: "Custodian API",
        method: "Reported balances",
        freshness: "3m",
        powers: "Wallet snapshots and operational balances",
        basis: "Reported",
        status: "current",
      },
      {
        name: "Ledger reconciliation",
        method: "Calculated balances",
        freshness: "8m",
        powers: "Reconciled balances and mismatch detection",
        basis: "Calculated",
        status: "current",
      },
      {
        name: "DeFiLlama protocol feed",
        method: "TVL, fees, and revenue",
        freshness: "11m",
        powers: "Protocol context and sleeve ranking",
        basis: "Protocol TVL",
        status: "current",
      },
      {
        name: "Compliance review queue",
        method: "Seeded sanctions context",
        freshness: "1440m",
        powers: "Address review and manual escalation",
        basis: "Manual review",
        status: "current",
      },
    ],
    treasurySeries: buildTrendSeries({
      days: 90,
      startReported: 468_000_000,
      endReported: 487_000_000,
      startCalculated: 467_100_000,
      endCalculated: 486_200_000,
      reportedWave: 800_000,
      calculatedWave: 600_000,
      phase: 0.1,
    }),
    coverageSeries: buildCoverageSeries({
      days: 90,
      startCoverage: 1.33,
      endCoverage: 1.41,
      wave: 0.03,
      target: workspaceMeta.targetCoverage,
      phase: 0.3,
    }),
    protocolMix: protocolMix.normal,
  },
  watch: {
    label: "Watch",
    tone: "watch",
    snapshot: "16 Jul 2026 · 08:30 UTC",
    treasuryReported: 479_400_000,
    treasuryCalculated: 473_800_000,
    liquidCoverageReported: 1.24,
    liquidCoverageCalculated: 1.16,
    riskScore: 53,
    openCount: 5,
    summary:
      "Liquidity is still acceptable, but the yield sleeve has drifted enough that the next decision should be a review, not a guess.",
    headline: "Needs attention before the next move",
    wallets: {
      ops: {
        reported: 42_100_000,
        calculated: 41_700_000,
        freshness: "4m",
        confidence: "high",
        status: "healthy",
        note: "Operational funds are intact, with a small ledger lag.",
      },
      reserve: {
        reported: 261_500_000,
        calculated: 261_500_000,
        freshness: "5m",
        confidence: "high",
        status: "healthy",
        note: "Core reserve still reconciles cleanly.",
      },
      yield: {
        reported: 139_200_000,
        calculated: 134_500_000,
        freshness: "12m",
        confidence: "medium",
        status: "watch",
        note: "Accrual lag and protocol concentration both widened.",
      },
      bridge: {
        reported: 36_600_000,
        calculated: 36_100_000,
        freshness: "8m",
        confidence: "medium",
        status: "watch",
        note: "Bridge inventory is still valid, but below preferred buffer.",
      },
    },
    protocols: {
      aave: {
        value: 57_600_000,
        apy: 4.0,
        tvlShare: 43.5,
        freshness: "14m",
        risk: "healthy",
        lock: "No lock-up",
        status: "healthy",
        note: "Still the most liquid sleeve.",
      },
      morpho: {
        value: 42_200_000,
        apy: 6.1,
        tvlShare: 31.9,
        freshness: "16m",
        risk: "watch",
        lock: "Settlement delay on exit",
        status: "watch",
        note: "Concentration is nearing the internal guardrail.",
      },
      curve: {
        value: 32_600_000,
        apy: 2.9,
        tvlShare: 24.6,
        freshness: "10m",
        risk: "healthy",
        lock: "Fast unwind path",
        status: "healthy",
        note: "Most conservative unwind path remains in place.",
      },
    },
    alerts: [
      {
        id: "watch-gap",
        severity: "warning",
        title: "Yield wallet gap widened to $4.7m",
        detail: "The ledger and reported snapshot are now far enough apart to require a fresh reconciliation check.",
        action: "Open the accrual and staking receipts.",
        source: "Ledger + custodian",
      },
      {
        id: "watch-concentration",
        severity: "warning",
        title: "Morpho sleeve is approaching the concentration guardrail",
        detail: "The protocol sleeve is still usable, but the allocation has become the dominant growth path.",
        action: "Consider reducing the sleeve before the next committee review.",
        source: "Protocol allocation",
      },
      {
        id: "watch-liquidity",
        severity: "warning",
        title: "USDC liquidity depth sits below the 7d median",
        detail: "Demo pricing shows thinner top-of-book depth than the treasury policy prefers.",
        action: "Leave more operating buffer in the fastest unwind path.",
        source: "Market/liquidity feed",
      },
      {
        id: "watch-screening",
        severity: "info",
        title: "A counterparty label needs manual review",
        detail: "The seed includes a watchlist-style label, but not a blocked-property assertion.",
        action: "Add a note to the evidence log.",
        source: "Compliance queue",
      },
      {
        id: "watch-freshness",
        severity: "info",
        title: "DeFiLlama feed is outside the preferred freshness band",
        detail: "The protocol context is still usable, but it is not a perfect same-minute view.",
        action: "Refresh before any rebalance decision.",
        source: "DeFiLlama",
      },
    ],
    sources: [
      {
        name: "CoinGecko price feed",
        method: "Contract-address pricing",
        freshness: "3m",
        powers: "Marks and daily change",
        basis: "Demo FMV",
        status: "current",
      },
      {
        name: "Custodian API",
        method: "Reported balances",
        freshness: "4m",
        powers: "Wallet snapshots",
        basis: "Reported",
        status: "current",
      },
      {
        name: "Ledger reconciliation",
        method: "Calculated balances",
        freshness: "9m",
        powers: "Mismatch detection",
        basis: "Calculated",
        status: "current",
      },
      {
        name: "DeFiLlama protocol feed",
        method: "TVL, fees, and revenue",
        freshness: "18m",
        powers: "Sleeve risk and protocol ranking",
        basis: "Protocol TVL",
        status: "stale",
      },
      {
        name: "Compliance review queue",
        method: "Seeded sanctions context",
        freshness: "1440m",
        powers: "Manual counterparty review",
        basis: "Manual review",
        status: "current",
      },
    ],
    treasurySeries: buildTrendSeries({
      days: 90,
      startReported: 471_500_000,
      endReported: 479_400_000,
      startCalculated: 468_900_000,
      endCalculated: 473_800_000,
      reportedWave: 1_100_000,
      calculatedWave: 900_000,
      phase: 0.55,
    }),
    coverageSeries: buildCoverageSeries({
      days: 90,
      startCoverage: 1.21,
      endCoverage: 1.16,
      wave: 0.04,
      target: workspaceMeta.targetCoverage,
      phase: 0.6,
    }),
    protocolMix: protocolMix.watch,
  },
  stress: {
    label: "Stress",
    tone: "critical",
    snapshot: "16 Jul 2026 · 08:30 UTC",
    treasuryReported: 456_400_000,
    treasuryCalculated: 448_400_000,
    liquidCoverageReported: 0.97,
    liquidCoverageCalculated: 0.89,
    riskScore: 83,
    openCount: 6,
    summary:
      "Coverage has slipped under target and one protocol sleeve is effectively frozen. Preserve liquidity and escalate the review immediately.",
    headline: "Escalate to CFO and treasury committee",
    wallets: {
      ops: {
        reported: 41_800_000,
        calculated: 40_900_000,
        freshness: "6m",
        confidence: "medium",
        status: "watch",
        note: "The operational wallet is still available, but the balance gap widened.",
      },
      reserve: {
        reported: 251_400_000,
        calculated: 251_400_000,
        freshness: "7m",
        confidence: "high",
        status: "healthy",
        note: "Reserve backing is still matched, but it is doing more of the work now.",
      },
      yield: {
        reported: 118_700_000,
        calculated: 114_000_000,
        freshness: "22m",
        confidence: "low",
        status: "risk",
        note: "The yield sleeve is the source of most of the report gap.",
      },
      bridge: {
        reported: 44_500_000,
        calculated: 41_900_000,
        freshness: "16m",
        confidence: "low",
        status: "risk",
        note: "Bridge inventory has slipped below the preferred minimum buffer.",
      },
    },
    protocols: {
      aave: {
        value: 54_100_000,
        apy: 3.8,
        tvlShare: 45.6,
        freshness: "18m",
        risk: "watch",
        lock: "No lock-up",
        status: "watch",
        note: "Still open, but the sleeve is carrying more risk than usual.",
      },
      morpho: {
        value: 34_500_000,
        apy: 6.4,
        tvlShare: 29.1,
        freshness: "24m",
        risk: "risk",
        lock: "Exit delayed; protocol paused",
        status: "risk",
        note: "This sleeve is paused in the seeded stress case.",
      },
      curve: {
        value: 30_100_000,
        apy: 2.6,
        tvlShare: 25.3,
        freshness: "14m",
        risk: "healthy",
        lock: "Fast unwind path",
        status: "healthy",
        note: "Curve remains the least complicated exit path.",
      },
    },
    alerts: [
      {
        id: "stress-coverage",
        severity: "critical",
        title: "Liquid coverage is below the 1.0x target",
        detail: "Operating assets no longer fully cover near-term obligations at the configured policy threshold.",
        action: "Preserve liquidity and escalate the review.",
        source: "Coverage model",
      },
      {
        id: "stress-paused",
        severity: "critical",
        title: "One protocol sleeve is paused",
        detail: "The seeded stress view assumes the largest yield sleeve can no longer be unwound normally.",
        action: "Avoid adding exposure until the pause clears.",
        source: "Protocol status",
      },
      {
        id: "stress-gap",
        severity: "warning",
        title: "Reported and calculated balances diverged by $8.0m",
        detail: "The biggest gap sits in the yield wallet and bridge inventory.",
        action: "Freeze assumptions until reconciliation completes.",
        source: "Ledger + custodian",
      },
      {
        id: "stress-screening",
        severity: "warning",
        title: "Counterparty review requires manual escalation",
        detail: "The compliance queue has a seeded watchlist-style label in the stress scenario.",
        action: "Document the review path and the source of the label.",
        source: "Compliance queue",
      },
      {
        id: "stress-liquidity",
        severity: "warning",
        title: "Top-of-book liquidity is thinner than policy wants",
        detail: "The execution benchmark is more fragile in the stress case.",
        action: "Use the most liquid unwind path first.",
        source: "Market/liquidity feed",
      },
      {
        id: "stress-source",
        severity: "info",
        title: "Primary market feed fell back to cached pricing",
        detail: "The seeded demo uses a cached value in the fallback state instead of pretending the feed is live.",
        action: "Recompute once the source recovers.",
        source: "Price feed",
      },
    ],
    sources: [
      {
        name: "CoinGecko price feed",
        method: "Contract-address pricing",
        freshness: "5m",
        powers: "Cached fallback marks",
        basis: "Demo FMV",
        status: "degraded",
      },
      {
        name: "Custodian API",
        method: "Reported balances",
        freshness: "6m",
        powers: "Wallet snapshots",
        basis: "Reported",
        status: "current",
      },
      {
        name: "Ledger reconciliation",
        method: "Calculated balances",
        freshness: "12m",
        powers: "Mismatch detection",
        basis: "Calculated",
        status: "current",
      },
      {
        name: "DeFiLlama protocol feed",
        method: "TVL, fees, and revenue",
        freshness: "24m",
        powers: "Protocol risk and pause state",
        basis: "Protocol TVL",
        status: "stale",
      },
      {
        name: "Compliance review queue",
        method: "Seeded sanctions context",
        freshness: "1440m",
        powers: "Manual escalation and address review",
        basis: "Manual review",
        status: "current",
      },
    ],
    treasurySeries: buildTrendSeries({
      days: 90,
      startReported: 468_600_000,
      endReported: 456_400_000,
      startCalculated: 464_200_000,
      endCalculated: 448_400_000,
      reportedWave: 1_600_000,
      calculatedWave: 1_300_000,
      phase: 0.95,
    }),
    coverageSeries: buildCoverageSeries({
      days: 90,
      startCoverage: 1.08,
      endCoverage: 0.89,
      wave: 0.05,
      target: workspaceMeta.targetCoverage,
      phase: 0.9,
    }),
    protocolMix: protocolMix.stress,
  },
}

export const scenarioOptions: Array<{ id: ScenarioId; label: string; help: string }> = [
  {
    id: "normal",
    label: "Calm",
    help: "Routine review with minor reconciliation drift.",
  },
  {
    id: "watch",
    label: "Watch",
    help: "Liquidity and concentration deserve closer attention.",
  },
  {
    id: "stress",
    label: "Stress",
    help: "Coverage has slipped and the escalation path matters.",
  },
]

export const rangeOptions: Array<{ id: RangeId; label: string }> = [
  { id: "7d", label: "7d" },
  { id: "30d", label: "30d" },
  { id: "90d", label: "90d" },
]

export const balanceModeOptions: Array<{
  id: BalanceMode
  label: string
  help: string
}> = [
  {
    id: "reported",
    label: "Reported",
    help: "Source balance snapshots as received from custodians and APIs.",
  },
  {
    id: "calculated",
    label: "Calculated",
    help: "Reconciled balances derived from the ledger and transaction history.",
  },
]

export const sectionOptions: Array<{
  id: ViewId
  label: string
}> = [
  { id: "overview", label: "Overview" },
  { id: "wallets", label: "Wallets" },
  { id: "protocols", label: "Protocols" },
  { id: "risk", label: "Risk" },
  { id: "evidence", label: "Evidence" },
]

export function getScenarioView(scenario: ScenarioId) {
  return scenarioViews[scenario]
}

export function rangeToDays(range: RangeId) {
  switch (range) {
    case "7d":
      return 7
    case "30d":
      return 30
    case "90d":
      return 90
  }
}

export function sliceSeries<T>(series: T[], range: RangeId) {
  return series.slice(-rangeToDays(range))
}
