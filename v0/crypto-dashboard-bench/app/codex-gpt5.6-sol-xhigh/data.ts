export const DATA_AS_OF = "2026-07-16 08:42 UTC"
export const REPORTING_CURRENCY = "USD"
export const TOTAL_TREASURY = 4_860_000
export const BOOK_RUNWAY_MONTHS = 12.9
export const BASELINE_READY_DAYS = 83
export const POLICY_READY_DAYS = 90
export const DAILY_CRITICAL_OUTFLOW = 12_500

export type DemoMode = "baseline" | "volatile" | "outage" | "empty"
export type ExposureGroup = "asset" | "venue" | "chain"
export type ExposureStatus = "healthy" | "watch" | "breach" | "conditional"
export type ShockKey = "usdc" | "coinbase" | "base"

export type ShockState = Record<ShockKey, boolean>

export type ExposureRow = {
  id: string
  name: string
  short: string
  type: string
  value: number
  share: number
  ready: string
  status: ExposureStatus
  policy: string
  age: string
  detail: string
  lineage: string
  source: string
}

export type ActionItem = {
  id: string
  severity: "Priority" | "Policy" | "Watch"
  title: string
  summary: string
  impact: string
  evidence: string
  policy: string
  next: string
  tags: string[]
}

export type SourceItem = {
  id: string
  name: string
  supplies: string
  permission: string
  observed: string
  healthy: boolean
  staleInOutage?: boolean
  effect: string
}

export const defaultShocks: ShockState = {
  usdc: true,
  coinbase: false,
  base: true,
}

export const shockDefinitions: Record<
  ShockKey,
  {
    title: string
    label: string
    description: string
    dayImpact: number
    unavailable: number
  }
> = {
  usdc: {
    title: "USDC market price -4%",
    label: "Issuer / price",
    description:
      "Applies a 4% market-value haircut to all seeded USDC positions. It does not assume a failed redemption.",
    dayImpact: 7,
    unavailable: 83_200,
  },
  coinbase: {
    title: "Coinbase Prime unavailable 7d",
    label: "Venue",
    description:
      "Treats the seeded Coinbase Prime balance as unavailable for seven days; $225K was counted in immediate ready coverage.",
    dayImpact: 18,
    unavailable: 225_000,
  },
  base: {
    title: "Base unavailable 48h",
    label: "Network",
    description:
      "Delays the seeded Base Ops Safe; $187.5K assigned to near-term payroll is removed from immediate ready coverage.",
    dayImpact: 15,
    unavailable: 187_500,
  },
}

export function getScenarioResult(shocks: ShockState) {
  const keys = (Object.keys(shocks) as ShockKey[]).filter((key) => shocks[key])
  const dayImpact = keys.reduce(
    (sum, key) => sum + shockDefinitions[key].dayImpact,
    0
  )
  const unavailable = keys.reduce(
    (sum, key) => sum + shockDefinitions[key].unavailable,
    0
  )
  const days = Math.max(18, BASELINE_READY_DAYS - dayImpact)
  const shortfall = (POLICY_READY_DAYS - days) * DAILY_CRITICAL_OUTFLOW
  const range = keys.length === 0 ? 2 : Math.min(8, 3 + keys.length)

  return {
    keys,
    days,
    low: Math.max(0, days - range),
    high: days + range,
    shortfall,
    unavailable,
    firstExposed:
      days >= 76
        ? "Q4 payroll · Oct 07"
        : days >= 56
          ? "Tax reserve · Sep 10"
          : "September payroll · Aug 30",
  }
}

export const readinessBuckets = [
  { label: "Ready now", value: 1_040_000, tone: "ready" },
  { label: "≤1 business day", value: 1_760_000, tone: "soon" },
  { label: "2–7 days", value: 1_180_000, tone: "later" },
  { label: "Conditional", value: 880_000, tone: "conditional" },
] as const

export const exposureData: Record<ExposureGroup, ExposureRow[]> = {
  asset: [
    {
      id: "usdc",
      name: "USD Coin",
      short: "USDC",
      type: "Fiat-backed stablecoin",
      value: 2_080_000,
      share: 42.8,
      ready: "Now → 1d",
      status: "breach",
      policy: "42.8% / 35% issuer cap",
      age: "18 sec",
      detail:
        "Held across the Ethereum Safe, Base Ops Safe, Coinbase Prime, and Aave v3.",
      lineage:
        "Native USDC positions remain separated by chain, account, and withdrawal path.",
      source: "Seeded balances + seeded reference rate · fixed snapshot",
    },
    {
      id: "usdt",
      name: "Tether",
      short: "USDT",
      type: "Fiat-backed stablecoin",
      value: 880_000,
      share: 18.1,
      ready: "Now → 1d",
      status: "healthy",
      policy: "Within 30% issuer cap",
      age: "21 sec",
      detail: "Split between the Ethereum Safe, Kraken, and a Solana wallet.",
      lineage:
        "Chain-specific contracts are normalised only for the grouped view.",
      source: "Seeded balances + seeded reference rate · fixed snapshot",
    },
    {
      id: "usds",
      name: "USDS",
      short: "USDS",
      type: "Crypto-collateralised stablecoin",
      value: 540_000,
      share: 11.1,
      ready: "≤1 day",
      status: "watch",
      policy: "Protocol dependency reviewed",
      age: "44 sec",
      detail: "Direct balance plus a seeded Aave v3 position.",
      lineage:
        "Protocol claim and direct token balance are not double counted.",
      source: "Seeded position model · fixed snapshot",
    },
    {
      id: "eth",
      name: "Ether",
      short: "ETH",
      type: "Native volatile asset",
      value: 720_000,
      share: 14.8,
      ready: "≤1 day",
      status: "watch",
      policy: "35% valuation haircut for readiness",
      age: "16 sec",
      detail: "Liquid holdings on Ethereum, Base, and Arbitrum.",
      lineage: "Native balances remain distinct from stETH.",
      source: "Seeded units + seeded reference rate · fixed snapshot",
    },
    {
      id: "wbtc",
      name: "Wrapped Bitcoin",
      short: "WBTC",
      type: "Wrapped volatile asset",
      value: 350_000,
      share: 7.2,
      ready: "1–2 days",
      status: "conditional",
      policy: "Wrapper + venue review",
      age: "1 min",
      detail: "Held in the Ethereum Safe and at Coinbase Prime.",
      lineage: "Wrapper issuer and custody venue are separate dependencies.",
      source: "Seeded units + seeded reference rate · fixed snapshot",
    },
    {
      id: "steth",
      name: "Staked Ether",
      short: "stETH",
      type: "Liquid staking token",
      value: 290_000,
      share: 6,
      ready: "3–5 days",
      status: "conditional",
      policy: "Excluded from immediate coverage",
      age: "52 sec",
      detail: "Seeded Lido position held by the Ethereum Safe.",
      lineage: "Withdrawal timing and secondary-market liquidity are modelled.",
      source: "Seeded protocol position · fixed snapshot",
    },
  ],
  venue: [
    {
      id: "eth-safe",
      name: "Ethereum Treasury Safe",
      short: "SAFE",
      type: "2-of-3 self-custody",
      value: 1_680_000,
      share: 34.6,
      ready: "Now → 1d",
      status: "healthy",
      policy: "2 of 3 signers available",
      age: "22 sec",
      detail: "Primary reserve account with an allowlisted payment route.",
      lineage: "0x71F2…9A40 · Ethereum · Safe threshold 2/3",
      source: "Seeded public-chain and Safe configuration snapshot",
    },
    {
      id: "base-safe",
      name: "Base Ops Safe",
      short: "OPS",
      type: "2-of-3 operating wallet",
      value: 840_000,
      share: 17.3,
      ready: "Now",
      status: "watch",
      policy: "Single-chain payroll dependency",
      age: "19 sec",
      detail: "Prefunds payroll and recurring operating payments.",
      lineage: "0x92C4…18D1 · Base · Safe threshold 2/3",
      source: "Seeded public-chain and Safe configuration snapshot",
    },
    {
      id: "coinbase",
      name: "Coinbase Prime",
      short: "CB",
      type: "Custodied venue",
      value: 920_000,
      share: 18.9,
      ready: "≤1 day",
      status: "watch",
      policy: "Within 25% venue cap",
      age: "3 min",
      detail:
        "Seeded read-only export; withdrawal availability is assumed normal.",
      lineage: "Off-chain account ledger · no transfer authority in Holdfast",
      source: "Seeded venue export · fixed snapshot",
    },
    {
      id: "kraken",
      name: "Kraken",
      short: "KR",
      type: "Exchange venue",
      value: 580_000,
      share: 11.9,
      ready: "≤1 day",
      status: "healthy",
      policy: "Within 20% venue cap",
      age: "4 min",
      detail: "Seeded read-only balance export.",
      lineage: "Off-chain account ledger · no transfer authority in Holdfast",
      source: "Seeded venue export · fixed snapshot",
    },
    {
      id: "aave",
      name: "Aave v3",
      short: "AAVE",
      type: "DeFi protocol position",
      value: 550_000,
      share: 11.3,
      ready: "1–2 days",
      status: "conditional",
      policy: "Liquidity check required",
      age: "48 sec",
      detail:
        "USDC and USDS supplied positions with seeded withdrawal assumptions.",
      lineage: "Protocol claims map to underlying assets and chain contracts.",
      source: "Seeded protocol position · fixed snapshot",
    },
    {
      id: "lido",
      name: "Lido",
      short: "LIDO",
      type: "Staking protocol",
      value: 290_000,
      share: 6,
      ready: "3–5 days",
      status: "conditional",
      policy: "Excluded from immediate coverage",
      age: "52 sec",
      detail: "stETH position with a conservative withdrawal window.",
      lineage: "Protocol + secondary-market exit dependencies retained.",
      source: "Seeded protocol position · fixed snapshot",
    },
  ],
  chain: [
    {
      id: "ethereum",
      name: "Ethereum",
      short: "ETH",
      type: "Settlement network",
      value: 1_940_000,
      share: 39.9,
      ready: "Now → 5d",
      status: "healthy",
      policy: "Within 45% network cap",
      age: "22 sec",
      detail: "Treasury Safe, Aave v3, and Lido positions.",
      lineage: "Finality, gas, contract, and signer dependencies are retained.",
      source: "Seeded chain snapshot · fixed block",
    },
    {
      id: "offchain",
      name: "Off-chain venue ledgers",
      short: "CEX",
      type: "Custodian / exchange dependency",
      value: 1_500_000,
      share: 30.9,
      ready: "≤1 day",
      status: "watch",
      policy: "Two independent venues",
      age: "3–4 min",
      detail: "Coinbase Prime and Kraken seeded balances.",
      lineage: "Not attributed to an on-chain network until withdrawal.",
      source: "Seeded venue exports · fixed snapshot",
    },
    {
      id: "base",
      name: "Base",
      short: "BASE",
      type: "L2 settlement network",
      value: 840_000,
      share: 17.3,
      ready: "Now",
      status: "breach",
      policy: "Payroll continuity gap",
      age: "19 sec",
      detail: "Base Ops Safe is the primary seeded payroll rail.",
      lineage:
        "Network availability and bridge route are separate dependencies.",
      source: "Seeded chain snapshot · fixed block",
    },
    {
      id: "arbitrum",
      name: "Arbitrum",
      short: "ARB",
      type: "L2 settlement network",
      value: 360_000,
      share: 7.4,
      ready: "≤1 day",
      status: "healthy",
      policy: "Within 25% network cap",
      age: "26 sec",
      detail: "Liquid ETH and USDT operating reserve.",
      lineage: "Native and bridged token lineage retained.",
      source: "Seeded chain snapshot · fixed block",
    },
    {
      id: "solana",
      name: "Solana",
      short: "SOL",
      type: "Settlement network",
      value: 220_000,
      share: 4.5,
      ready: "≤1 day",
      status: "healthy",
      policy: "Within 20% network cap",
      age: "31 sec",
      detail: "Seeded USDT payment reserve.",
      lineage: "Token mint and account owner retained in the position record.",
      source: "Seeded chain snapshot · fixed slot",
    },
  ],
}

export const actionItems: ActionItem[] = [
  {
    id: "coverage-gap",
    severity: "Priority",
    title: "Seven-day policy gap before Q4 payroll",
    summary:
      "Ready liquidity covers 83 days; treasury policy requires 90 days.",
    impact: "$87.5K estimated gap · first exposed Oct 07",
    evidence:
      "$1.04M is immediately payment-ready after seeded price, availability, and policy haircuts.",
    policy: "Minimum payment-ready coverage: 90 days",
    next: "Stress the gap, then review a draft coverage plan.",
    tags: ["Coverage", "Payroll"],
  },
  {
    id: "issuer-cap",
    severity: "Policy",
    title: "USDC issuer exposure is 7.8 points above policy",
    summary:
      "USDC is 42.8% of marked treasury value across four account paths.",
    impact: "$379K above the 35% issuer cap",
    evidence:
      "Exposure includes direct balances and underlying protocol claims; no wrapped position is double counted.",
    policy: "Single issuer concentration: 35% maximum",
    next: "Review policy-compliant diversification options and payment rails.",
    tags: ["USDC", "Issuer"],
  },
  {
    id: "base-payroll",
    severity: "Watch",
    title: "September payroll relies on one settlement network",
    summary:
      "The Base Ops Safe is the only pre-funded payroll route in the seeded workspace.",
    impact: "$246K critical obligation · due Aug 30",
    evidence:
      "A 48-hour Base interruption reduces estimated payment-ready coverage by 15 days.",
    policy: "Critical payroll requires two independent settlement paths",
    next: "Review an Ethereum contingency reserve and signer availability.",
    tags: ["Base", "Continuity"],
  },
]

export const obligations = [
  {
    date: "Jul 25",
    relative: "9 days",
    title: "Team payroll",
    amount: 246_000,
    rail: "USDC · Base",
    state: "Covered",
  },
  {
    date: "Aug 01",
    relative: "16 days",
    title: "Cloud & infrastructure",
    amount: 92_000,
    rail: "USD / USDC",
    state: "Covered",
  },
  {
    date: "Aug 15",
    relative: "30 days",
    title: "Contractor batch",
    amount: 188_000,
    rail: "USDT / USDC",
    state: "Covered",
  },
  {
    date: "Aug 30",
    relative: "45 days",
    title: "Team payroll",
    amount: 246_000,
    rail: "USDC · Base",
    state: "Exposed in stress",
  },
]

export const sourceItems: SourceItem[] = [
  {
    id: "chain",
    name: "Public-chain snapshot",
    supplies: "Wallet balances, contracts, blocks",
    permission: "Public read",
    observed: "22 sec ago",
    healthy: true,
    effect: "Direct on-chain positions",
  },
  {
    id: "safe",
    name: "Safe configuration snapshot",
    supplies: "Owners, threshold, account labels",
    permission: "Public read",
    observed: "1 min ago",
    healthy: true,
    effect: "Approval availability",
  },
  {
    id: "venue",
    name: "Venue balance exports",
    supplies: "Coinbase Prime and Kraken balances",
    permission: "Seeded read-only export",
    observed: "3–4 min ago",
    healthy: true,
    staleInOutage: true,
    effect: "Venue availability and concentration",
  },
  {
    id: "prices",
    name: "Reference-rate sample",
    supplies: "USD reference prices",
    permission: "Seeded market observation",
    observed: "18 sec ago",
    healthy: true,
    effect: "Marked value and price haircuts",
  },
  {
    id: "liquidity",
    name: "Liquidity-depth sample",
    supplies: "Size-aware exit haircuts",
    permission: "Seeded market observation",
    observed: "2 min ago",
    healthy: true,
    staleInOutage: true,
    effect: "Readiness and scenario range",
  },
]

export const planItems = [
  {
    id: "plan-1",
    amount: "$180,000 USDC",
    route: "Base Ops Safe → Ethereum Treasury Safe",
    chain: "Base → Ethereum",
    rationale:
      "Create a second settlement path for the Aug 30 payroll reserve.",
    impact: "Adds ~11 days of contingency coverage",
    approval: "Draft bridge/transfer intent · 2-of-3 Safe review",
  },
  {
    id: "plan-2",
    amount: "$220,000 USDT",
    route: "Kraken → Ethereum Treasury Safe",
    chain: "Off-chain venue → Ethereum",
    rationale:
      "Reduce venue dependency while keeping issuer concentration inside policy.",
    impact: "Moves Coinbase + Kraken dependency below 27%",
    approval: "Withdrawal allowlist + finance reviewer",
  },
  {
    id: "plan-3",
    amount: "$380,000 USDC equivalent",
    route: "Issuer concentration review",
    chain: "No execution route selected",
    rationale:
      "Bring the seeded USDC exposure toward the 35% policy threshold.",
    impact: "Closes the illustrative issuer-policy breach",
    approval: "CFO policy decision required before any proposal",
  },
]
