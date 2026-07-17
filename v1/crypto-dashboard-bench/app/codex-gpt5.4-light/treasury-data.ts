export type TreasuryBucket = {
  id: string
  rail: string
  issuer: string
  chain: string
  venue: string
  balance: number
  availableNow: number
  targetMin: number
  settlementTime: string
  risk: "low" | "medium" | "high"
}

export type ReserveSnapshot = {
  symbol: string
  issuer: string
  backingMix: string
  attestationLag: string
  redemptionWindow: string
  concentration: string
  policy: "approved" | "watch" | "restricted"
}

export type NetworkHealth = {
  rail: string
  costBasis: string
  eta: string
  status: "healthy" | "degraded" | "volatile"
  note: string
}

export type Payout = {
  id: string
  counterparty: string
  corridor: string
  amount: number
  currency: string
  dueBy: string
  requestedRail: string
  suggestedRail: string
  sanctionsScreen: "clear" | "review"
  reservePreference: "top-tier" | "standard"
  status: "ready" | "review" | "queued"
  note: string
}

export type Alert = {
  id: string
  severity: "critical" | "elevated" | "info"
  title: string
  detail: string
  action: string
}

export const demoTreasuryBuckets: TreasuryBucket[] = [
  {
    id: "bucket-usdc-eth",
    rail: "USDC",
    issuer: "Circle",
    chain: "Ethereum",
    venue: "Qualified custody",
    balance: 7_850_000,
    availableNow: 5_100_000,
    targetMin: 4_000_000,
    settlementTime: "~11 min with current queue",
    risk: "low",
  },
  {
    id: "bucket-usdc-base",
    rail: "USDC",
    issuer: "Circle",
    chain: "Base",
    venue: "Ops hot wallet",
    balance: 2_150_000,
    availableNow: 1_600_000,
    targetMin: 2_000_000,
    settlementTime: "~20 sec",
    risk: "medium",
  },
  {
    id: "bucket-usdt-tron",
    rail: "USDT",
    issuer: "Tether",
    chain: "Tron",
    venue: "Regional omnibus",
    balance: 4_420_000,
    availableNow: 4_000_000,
    targetMin: 3_500_000,
    settlementTime: "~45 sec",
    risk: "high",
  },
  {
    id: "bucket-eurc-eth",
    rail: "EURC",
    issuer: "Circle",
    chain: "Ethereum",
    venue: "Treasury reserve",
    balance: 980_000,
    availableNow: 860_000,
    targetMin: 500_000,
    settlementTime: "~12 min",
    risk: "low",
  },
]

export const demoReserves: ReserveSnapshot[] = [
  {
    symbol: "USDC",
    issuer: "Circle",
    backingMix: "Cash, SI bank deposits, reverse repo, <3M Treasuries",
    attestationLag: "Reserve composition dated Jul 13, 2026",
    redemptionWindow: "Weekday issuer redemption, venue dependent after-hours liquidity",
    concentration: "Primary operating rail across US and EU corridors",
    policy: "approved",
  },
  {
    symbol: "EURC",
    issuer: "Circle",
    backingMix: "Euro cash equivalents and short-duration reserves",
    attestationLag: "Reserve composition dated Jul 13, 2026",
    redemptionWindow: "Business-day redemption with thinner corridor coverage",
    concentration: "Used only for euro-denominated supplier flows",
    policy: "approved",
  },
  {
    symbol: "USDT",
    issuer: "Tether",
    backingMix: "Issuer disclosures vary; treated as higher policy scrutiny",
    attestationLag: "Use only under corridor exception policy in this demo",
    redemptionWindow: "Liquidity often strong on exchange venues, direct redemption access varies",
    concentration: "Operationally useful for select APAC corridors",
    policy: "watch",
  },
]

export const demoNetworkHealth: NetworkHealth[] = [
  {
    rail: "Ethereum / USDC",
    costBasis: "$4.80 median gas / payout",
    eta: "8-14 min finality",
    status: "healthy",
    note: "Highest internal policy score. Preferred for large-value regulated counterparties.",
  },
  {
    rail: "Base / USDC",
    costBasis: "$0.07 median fee / payout",
    eta: "15-30 sec",
    status: "healthy",
    note: "Best cost profile for routine distributor settlements under internal threshold.",
  },
  {
    rail: "Tron / USDT",
    costBasis: "$0.90 median fee / payout",
    eta: "30-60 sec",
    status: "volatile",
    note: "Fast corridor coverage but elevated policy scrutiny and lower reserve comfort.",
  },
]

export const demoPayouts: Payout[] = [
  {
    id: "PO-1842",
    counterparty: "Manila merchant acquirer",
    corridor: "US -> PH",
    amount: 640_000,
    currency: "USD stablecoin",
    dueBy: "2026-07-16 16:00 UTC",
    requestedRail: "USDT / Tron",
    suggestedRail: "USDC / Base",
    sanctionsScreen: "clear",
    reservePreference: "top-tier",
    status: "ready",
    note: "Counterparty accepts USDC this week. Switch removes watchlist exception.",
  },
  {
    id: "PO-1847",
    counterparty: "LATAM treasury partner",
    corridor: "US -> BR",
    amount: 1_850_000,
    currency: "USD stablecoin",
    dueBy: "2026-07-16 18:30 UTC",
    requestedRail: "USDC / Ethereum",
    suggestedRail: "USDC / Ethereum",
    sanctionsScreen: "clear",
    reservePreference: "top-tier",
    status: "ready",
    note: "High-value corridor. Keep qualified custody exit and higher assurance rail.",
  },
  {
    id: "PO-1851",
    counterparty: "OTC inventory vendor",
    corridor: "EU -> AE",
    amount: 420_000,
    currency: "EUR stablecoin",
    dueBy: "2026-07-16 20:00 UTC",
    requestedRail: "EURC / Ethereum",
    suggestedRail: "EURC / Ethereum",
    sanctionsScreen: "review",
    reservePreference: "top-tier",
    status: "review",
    note: "Name match unresolved. Hold until sanctions reviewer clears beneficiary.",
  },
  {
    id: "PO-1858",
    counterparty: "Regional payout partner",
    corridor: "US -> NG",
    amount: 310_000,
    currency: "USD stablecoin",
    dueBy: "2026-07-17 08:00 UTC",
    requestedRail: "USDT / Tron",
    suggestedRail: "USDT / Tron",
    sanctionsScreen: "clear",
    reservePreference: "standard",
    status: "queued",
    note: "Approved corridor exception because recipient local off-ramp still USDT-first.",
  },
]

export const demoAlerts: Alert[] = [
  {
    id: "alert-1",
    severity: "critical",
    title: "One payout blocked on sanctions review",
    detail:
      "PO-1851 cannot release until the beneficiary screening ambiguity is resolved and logged.",
    action: "Escalate to compliance reviewer",
  },
  {
    id: "alert-2",
    severity: "elevated",
    title: "Base working capital below target floor",
    detail:
      "Base/USDC available balance is $400k below internal target after today’s queued settlements.",
    action: "Rebalance from Ethereum custody",
  },
  {
    id: "alert-3",
    severity: "info",
    title: "Tron corridor still policy-watch only",
    detail:
      "Treasury can use Tron/USDT where corridor acceptance requires it, but every release needs exception logging.",
    action: "Review issuer concentration weekly",
  },
]
