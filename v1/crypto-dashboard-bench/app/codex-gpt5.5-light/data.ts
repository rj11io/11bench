export type Corridor = "USDC on Base" | "USDC on Ethereum" | "USDT on Tron" | "EURC on Ethereum"
export type RiskLevel = "low" | "watch" | "elevated" | "blocked"

export type Invoice = {
  id: string
  counterparty: string
  region: string
  amount: number
  currency: "USD" | "EUR"
  dueInHours: number
  corridor: Corridor
  status: "ready" | "missing-kyc" | "liquidity-watch" | "blocked"
  tags: string[]
}

export type Rail = {
  name: Corridor
  issuer: string
  chain: string
  balance: number
  capacity24h: number
  pegBps: number
  spreadBps: number
  feeUsd: number
  etaMinutes: number
  risk: RiskLevel
  provenance: string
  updatedAt: string
}

export const asOf = "2026-07-16T09:30:00-04:00"

export const rails: Rail[] = [
  {
    name: "USDC on Base",
    issuer: "Circle",
    chain: "Base",
    balance: 1180000,
    capacity24h: 840000,
    pegBps: 2,
    spreadBps: 5,
    feeUsd: 18,
    etaMinutes: 4,
    risk: "low",
    provenance: "Seeded from Circle reserve model, DeFiLlama stablecoin chain fields, and internal bank ledger assumptions.",
    updatedAt: "09:26 ET",
  },
  {
    name: "USDC on Ethereum",
    issuer: "Circle",
    chain: "Ethereum",
    balance: 640000,
    capacity24h: 1200000,
    pegBps: 1,
    spreadBps: 8,
    feeUsd: 84,
    etaMinutes: 12,
    risk: "low",
    provenance: "Seeded demo data; modeled from attestation-backed issuer and observed gas cost behavior.",
    updatedAt: "09:21 ET",
  },
  {
    name: "USDT on Tron",
    issuer: "Tether",
    chain: "Tron",
    balance: 910000,
    capacity24h: 530000,
    pegBps: 6,
    spreadBps: 14,
    feeUsd: 7,
    etaMinutes: 3,
    risk: "watch",
    provenance: "Seeded demo data; issuer, chain, and counterparty policy checks are not live.",
    updatedAt: "09:18 ET",
  },
  {
    name: "EURC on Ethereum",
    issuer: "Circle",
    chain: "Ethereum",
    balance: 220000,
    capacity24h: 160000,
    pegBps: 4,
    spreadBps: 18,
    feeUsd: 49,
    etaMinutes: 15,
    risk: "elevated",
    provenance: "Seeded demo data; lower depth and EUR rail cutoff modeled for design evaluation.",
    updatedAt: "09:12 ET",
  },
]

export const invoices: Invoice[] = [
  {
    id: "INV-1048",
    counterparty: "Atlas Components",
    region: "Mexico",
    amount: 186400,
    currency: "USD",
    dueInHours: 5,
    corridor: "USDC on Base",
    status: "ready",
    tags: ["priority", "matched bank memo"],
  },
  {
    id: "INV-1051",
    counterparty: "Nile Logistics",
    region: "Egypt",
    amount: 74200,
    currency: "USD",
    dueInHours: 11,
    corridor: "USDT on Tron",
    status: "liquidity-watch",
    tags: ["recipient prefers USDT", "spread watch"],
  },
  {
    id: "INV-1053",
    counterparty: "Helio Parts GmbH",
    region: "Germany",
    amount: 93000,
    currency: "EUR",
    dueInHours: 20,
    corridor: "EURC on Ethereum",
    status: "missing-kyc",
    tags: ["new wallet", "MiCA review"],
  },
  {
    id: "INV-1056",
    counterparty: "Pacific Freight",
    region: "Philippines",
    amount: 218900,
    currency: "USD",
    dueInHours: 28,
    corridor: "USDC on Ethereum",
    status: "ready",
    tags: ["large transfer", "board limit ok"],
  },
  {
    id: "INV-1059",
    counterparty: "Orion Media",
    region: "Argentina",
    amount: 39500,
    currency: "USD",
    dueInHours: 32,
    corridor: "USDC on Base",
    status: "blocked",
    tags: ["sanctions screen unresolved", "hold"],
  },
]

export const riskEvents = [
  {
    title: "USDT corridor policy review",
    severity: "watch" as const,
    detail: "Finance policy allows USDT only for pre-approved counterparties. Nile Logistics is approved; spread is above the desk target.",
    time: "09:04 ET",
  },
  {
    title: "New EUR recipient wallet",
    severity: "elevated" as const,
    detail: "Helio Parts provided a fresh wallet. Require ownership attestation before settlement.",
    time: "08:47 ET",
  },
  {
    title: "Blocked screening hit",
    severity: "blocked" as const,
    detail: "Orion Media payout remains excluded from the batch until compliance resolves the alert.",
    time: "08:15 ET",
  },
]

export const exposureSeries = [
  { day: "Mon", usdc: 1620000, usdt: 820000, eurc: 190000 },
  { day: "Tue", usdc: 1710000, usdt: 760000, eurc: 210000 },
  { day: "Wed", usdc: 1690000, usdt: 940000, eurc: 205000 },
  { day: "Thu", usdc: 1820000, usdt: 910000, eurc: 220000 },
  { day: "Fri", usdc: 1540000, usdt: 850000, eurc: 175000 },
  { day: "Sat", usdc: 1490000, usdt: 830000, eurc: 170000 },
  { day: "Sun", usdc: 1760000, usdt: 880000, eurc: 215000 },
]
