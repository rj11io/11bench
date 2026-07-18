export type RiskLevel = "clear" | "review" | "escalated" | "blocked"

export type Wallet = {
  id: string
  name: string
  chain: string
  custody: "multisig" | "custodial" | "smart-wallet"
  signerCoverage: string
  freshness: string
  risk: RiskLevel
  concentration: number
  valueUsd: number
  labels: string[]
  balances: Array<{
    symbol: string
    amount: string
    valueUsd: number
    share: number
    volatility: "low" | "medium" | "high"
  }>
  counterparties: Array<{
    label: string
    exposure: string
    lastSeen: string
    risk: RiskLevel
  }>
  activity: Array<{
    action: string
    amount: string
    counterparty: string
    time: string
    status: "posted" | "pending" | "flagged"
  }>
}

export type Transfer = {
  id: string
  asset: string
  amount: string
  valueUsd: number
  source: string
  destination: string
  freshness: string
  screening: RiskLevel
  policy: RiskLevel
  approvals: string[]
  reason: string
  state: "Pending" | "Escalated" | "Approved" | "Blocked"
}

export const treasury = {
  workspace: "Aurora Treasury / Demo",
  coverage: "7 wallets across 3 chains",
  totalValueUsd: 184200000,
  stablecoinValueUsd: 123800000,
  monthlyBurnUsd: 4820000,
  topWalletShare: 0.28,
  freshness: "Updated 8 min ago • seeded snapshot",
  source: "Seeded demo data modeled after wallet, screening, and portfolio APIs",
  runwayDays: 25,
  riskSummary:
    "One transfer is blocked by policy because the destination has recent mixer exposure; two wallets need freshness review.",
  sparkline: [78, 79, 77, 81, 80, 84, 83, 86, 85, 88, 90, 89],
  alertCount: 3,
}

export const wallets: Wallet[] = [
  {
    id: "ops-core",
    name: "Ops Core Multisig",
    chain: "Ethereum / Base",
    custody: "multisig",
    signerCoverage: "4 of 7 signers active",
    freshness: "6 min ago",
    risk: "review",
    concentration: 0.28,
    valueUsd: 51600000,
    labels: ["Treasury", "Hot path", "Multisig"],
    balances: [
      { symbol: "USDC", amount: "28,400,000", valueUsd: 28400000, share: 0.55, volatility: "low" },
      { symbol: "USDT", amount: "9,200,000", valueUsd: 9200000, share: 0.18, volatility: "low" },
      { symbol: "ETH", amount: "5,420", valueUsd: 16700000, share: 0.32, volatility: "high" },
    ],
    counterparties: [
      { label: "Coinbase Prime", exposure: "$9.8M", lastSeen: "Today", risk: "clear" },
      { label: "Wintermute", exposure: "$3.1M", lastSeen: "2d ago", risk: "review" },
      { label: "Unknown bridge contract", exposure: "$420k", lastSeen: "11h ago", risk: "blocked" },
    ],
    activity: [
      { action: "USDC sweep", amount: "$4.0M", counterparty: "Coinbase Prime", time: "14 min ago", status: "posted" },
      { action: "ETH top-up", amount: "$1.2M", counterparty: "Internal rebalance", time: "1h ago", status: "posted" },
      { action: "Withdrawal request", amount: "$750k", counterparty: "Unknown bridge contract", time: "3h ago", status: "flagged" },
    ],
  },
  {
    id: "yield-vault",
    name: "Stablecoin Yield Vault",
    chain: "Ethereum",
    custody: "smart-wallet",
    signerCoverage: "2 of 3 approvers",
    freshness: "12 min ago",
    risk: "clear",
    concentration: 0.21,
    valueUsd: 38800000,
    labels: ["Yield", "Lending", "Low risk"],
    balances: [
      { symbol: "USDC", amount: "24,500,000", valueUsd: 24500000, share: 0.63, volatility: "low" },
      { symbol: "DAI", amount: "7,300,000", valueUsd: 7300000, share: 0.19, volatility: "low" },
      { symbol: "stETH", amount: "1,820", valueUsd: 7000000, share: 0.18, volatility: "high" },
    ],
    counterparties: [
      { label: "Aave v3", exposure: "$21.7M", lastSeen: "Today", risk: "clear" },
      { label: "Lido", exposure: "$7.0M", lastSeen: "Today", risk: "review" },
      { label: "MakerDAO", exposure: "$6.8M", lastSeen: "Today", risk: "clear" },
    ],
    activity: [
      { action: "Yield accrual", amount: "$31k", counterparty: "Aave v3", time: "23 min ago", status: "posted" },
      { action: "Collateral refresh", amount: "$2.3M", counterparty: "Lido", time: "4h ago", status: "posted" },
      { action: "Risk check", amount: "0 new flags", counterparty: "Screening engine", time: "Today", status: "posted" },
    ],
  },
  {
    id: "market-making",
    name: "Market Making Wallet",
    chain: "Base / Solana",
    custody: "custodial",
    signerCoverage: "Provider-managed",
    freshness: "18 min ago",
    risk: "escalated",
    concentration: 0.19,
    valueUsd: 35100000,
    labels: ["Trading", "High turnover", "Cross-chain"],
    balances: [
      { symbol: "USDC", amount: "13,900,000", valueUsd: 13900000, share: 0.40, volatility: "low" },
      { symbol: "SOL", amount: "96,000", valueUsd: 14400000, share: 0.41, volatility: "high" },
      { symbol: "ARB", amount: "11,200,000", valueUsd: 6700000, share: 0.19, volatility: "high" },
    ],
    counterparties: [
      { label: "Binance", exposure: "$8.1M", lastSeen: "Today", risk: "review" },
      { label: "Bybit", exposure: "$5.4M", lastSeen: "5h ago", risk: "review" },
      { label: "Mexc", exposure: "$1.8M", lastSeen: "1d ago", risk: "escalated" },
    ],
    activity: [
      { action: "Inventory refill", amount: "$2.8M", counterparty: "Binance", time: "41 min ago", status: "posted" },
      { action: "Cross-chain bridge", amount: "$1.0M", counterparty: "Bridge relayer", time: "2h ago", status: "flagged" },
      { action: "Venue settlement", amount: "$900k", counterparty: "Bybit", time: "Today", status: "posted" },
    ],
  },
]

export const transfers: Transfer[] = [
  {
    id: "tx-1834",
    asset: "USDC",
    amount: "$2,400,000",
    valueUsd: 2400000,
    source: "Ops Core Multisig",
    destination: "Coinbase Prime",
    freshness: "Screened 4 min ago",
    screening: "clear",
    policy: "clear",
    approvals: ["Treasury lead", "Risk ops"],
    reason: "Weekly operating sweep to reduce idle balance and maintain runway.",
    state: "Approved",
  },
  {
    id: "tx-1835",
    asset: "ETH",
    amount: "$680,000",
    valueUsd: 680000,
    source: "Market Making Wallet",
    destination: "Bridge relayer",
    freshness: "Screened 11 min ago",
    screening: "review",
    policy: "review",
    approvals: ["Treasury lead", "Compliance"],
    reason: "Cross-chain liquidity rebalance flagged because the destination path has thin provenance.",
    state: "Escalated",
  },
  {
    id: "tx-1836",
    asset: "USDT",
    amount: "$910,000",
    valueUsd: 910000,
    source: "Yield Vault",
    destination: "Unknown bridge contract",
    freshness: "Screened 2 min ago",
    screening: "blocked",
    policy: "blocked",
    approvals: ["Treasury lead", "Compliance", "CFO"],
    reason: "Policy engine blocked the request because the destination inherits recent mixer exposure.",
    state: "Blocked",
  },
]

export const timeline = [
  {
    title: "Stablecoin runway fell below 30 days",
    time: "Today",
    detail: "Monthly burn now covers 25 days of stablecoin runway after the latest payroll forecast.",
    severity: "review",
  },
  {
    title: "Blocked destination matched recent mixer exposure",
    time: "Today",
    detail: "The screening model marked the counterparty as blocked; policy escalation stayed in place.",
    severity: "blocked",
  },
  {
    title: "Aave yield vault refreshed",
    time: "14 min ago",
    detail: "Yield accrual updated and no new counterparties were introduced in the latest snapshot.",
    severity: "clear",
  },
]

export const timeRanges = ["24h", "7d", "30d", "90d"] as const
export const riskFilters = ["all", "clear", "review", "escalated", "blocked"] as const

