export type ScenarioId = "normal" | "volatile" | "incident" | "empty"
export type Severity = "low" | "medium" | "high" | "critical"
export type Rail = "ethereum" | "base" | "solana" | "tron" | "polygon"
export type Issuer = "USDC" | "USDT" | "PYUSD" | "USDP"

export type TreasuryPosition = {
  id: string
  issuer: Issuer
  chain: Rail
  venue: string
  balanceUsd: number
  share: number
  availableNowUsd: number
  settlementMinutes: number
  pegPrice: number
  pegBasisPoints: number
  liquidityDepthUsd: number
  concentration: number
  complianceScore: number
  riskScore: number
  status: Severity
  provenance: string
  updatedAt: string
}

export type Corridor = {
  id: string
  label: string
  needUsd: number
  deadline: string
  preferredRails: Rail[]
  minLiquidityUsd: number
  blockedVenues: string[]
}

export type Alert = {
  id: string
  title: string
  severity: Severity
  source: string
  detail: string
  action: string
  positionIds: string[]
  age: string
}

export type FlowPoint = {
  hour: string
  inflow: number
  outflow: number
  buffer: number
}

export type Scenario = {
  id: ScenarioId
  label: string
  headline: string
  generatedAt: string
  positions: TreasuryPosition[]
  alerts: Alert[]
  flow: FlowPoint[]
}

const normalPositions: TreasuryPosition[] = [
  {
    id: "pos-usdc-base-fireblocks",
    issuer: "USDC",
    chain: "base",
    venue: "Fireblocks Vault A",
    balanceUsd: 14200000,
    share: 0.27,
    availableNowUsd: 12100000,
    settlementMinutes: 4,
    pegPrice: 0.9998,
    pegBasisPoints: -2,
    liquidityDepthUsd: 53000000,
    concentration: 0.18,
    complianceScore: 94,
    riskScore: 18,
    status: "low",
    provenance: "Seeded from internal ledger + CoinGecko-style price snapshot",
    updatedAt: "2026-07-16T08:20:00Z",
  },
  {
    id: "pos-usdc-eth-coinbase",
    issuer: "USDC",
    chain: "ethereum",
    venue: "Coinbase Prime",
    balanceUsd: 16800000,
    share: 0.32,
    availableNowUsd: 14800000,
    settlementMinutes: 14,
    pegPrice: 1.0001,
    pegBasisPoints: 1,
    liquidityDepthUsd: 118000000,
    concentration: 0.21,
    complianceScore: 97,
    riskScore: 12,
    status: "low",
    provenance: "Seeded from custodian report + market-data adapter",
    updatedAt: "2026-07-16T08:19:00Z",
  },
  {
    id: "pos-usdt-tron-ops",
    issuer: "USDT",
    chain: "tron",
    venue: "Ops Hot Wallet",
    balanceUsd: 9400000,
    share: 0.18,
    availableNowUsd: 9000000,
    settlementMinutes: 2,
    pegPrice: 0.9994,
    pegBasisPoints: -6,
    liquidityDepthUsd: 87000000,
    concentration: 0.34,
    complianceScore: 76,
    riskScore: 46,
    status: "medium",
    provenance: "Seeded from wallet index + Chainalysis-style risk labels",
    updatedAt: "2026-07-16T08:18:00Z",
  },
  {
    id: "pos-pyusd-solana-payments",
    issuer: "PYUSD",
    chain: "solana",
    venue: "Payments Float",
    balanceUsd: 6100000,
    share: 0.12,
    availableNowUsd: 5200000,
    settlementMinutes: 1,
    pegPrice: 1.0004,
    pegBasisPoints: 4,
    liquidityDepthUsd: 16500000,
    concentration: 0.42,
    complianceScore: 88,
    riskScore: 34,
    status: "medium",
    provenance: "Seeded from ledger + DEX depth estimate",
    updatedAt: "2026-07-16T08:15:00Z",
  },
  {
    id: "pos-usdp-polygon-backup",
    issuer: "USDP",
    chain: "polygon",
    venue: "Backup Wallet",
    balanceUsd: 5600000,
    share: 0.11,
    availableNowUsd: 2800000,
    settlementMinutes: 22,
    pegPrice: 0.9991,
    pegBasisPoints: -9,
    liquidityDepthUsd: 7400000,
    concentration: 0.56,
    complianceScore: 82,
    riskScore: 57,
    status: "high",
    provenance: "Seeded from ledger + thin-market liquidity model",
    updatedAt: "2026-07-16T08:08:00Z",
  },
]

const volatilePositions: TreasuryPosition[] = normalPositions.map((position) => {
  if (position.id === "pos-usdt-tron-ops") {
    return {
      ...position,
      pegPrice: 0.9968,
      pegBasisPoints: -32,
      liquidityDepthUsd: 49000000,
      complianceScore: 69,
      riskScore: 71,
      status: "high",
      updatedAt: "2026-07-16T08:24:00Z",
    }
  }
  if (position.id === "pos-usdp-polygon-backup") {
    return {
      ...position,
      pegPrice: 0.9979,
      pegBasisPoints: -21,
      liquidityDepthUsd: 3300000,
      riskScore: 78,
      status: "high",
      updatedAt: "2026-07-16T08:22:00Z",
    }
  }
  return { ...position, riskScore: Math.min(99, position.riskScore + 7) }
})

const incidentPositions: TreasuryPosition[] = volatilePositions.map((position) => {
  if (position.id === "pos-usdt-tron-ops") {
    return {
      ...position,
      pegPrice: 0.9926,
      pegBasisPoints: -74,
      liquidityDepthUsd: 21000000,
      complianceScore: 52,
      riskScore: 92,
      status: "critical",
      updatedAt: "2026-07-16T08:26:00Z",
    }
  }
  if (position.id === "pos-pyusd-solana-payments") {
    return {
      ...position,
      liquidityDepthUsd: 6200000,
      concentration: 0.61,
      riskScore: 64,
      status: "high",
    }
  }
  return position
})

export const corridors: Corridor[] = [
  {
    id: "latam-payout",
    label: "LATAM creator payouts",
    needUsd: 12800000,
    deadline: "Today 16:00 UTC",
    preferredRails: ["base", "solana", "tron"],
    minLiquidityUsd: 15000000,
    blockedVenues: ["Backup Wallet"],
  },
  {
    id: "exchange-margin",
    label: "Exchange margin top-up",
    needUsd: 18700000,
    deadline: "Next 90 minutes",
    preferredRails: ["ethereum", "base"],
    minLiquidityUsd: 50000000,
    blockedVenues: ["Ops Hot Wallet", "Backup Wallet"],
  },
  {
    id: "weekend-buffer",
    label: "Weekend redemption buffer",
    needUsd: 9200000,
    deadline: "Friday 20:00 UTC",
    preferredRails: ["ethereum", "base", "polygon"],
    minLiquidityUsd: 10000000,
    blockedVenues: [],
  },
]

export const scenarios: Scenario[] = [
  {
    id: "normal",
    label: "Normal",
    headline: "Treasury is inside policy; one thin backup rail needs trimming.",
    generatedAt: "2026-07-16T08:20:00Z",
    positions: normalPositions,
    alerts: [
      {
        id: "thin-usdp",
        title: "USDP Polygon depth below corridor policy",
        severity: "medium",
        source: "Liquidity model",
        detail:
          "Available depth is $7.4M against a $10M minimum for weekend buffer routing.",
        action: "Move $2.1M to USDC Base before Friday cutoff.",
        positionIds: ["pos-usdp-polygon-backup"],
        age: "12m",
      },
    ],
    flow: [
      { hour: "08:00", inflow: 2.8, outflow: 1.9, buffer: 28.4 },
      { hour: "10:00", inflow: 1.4, outflow: 4.2, buffer: 25.6 },
      { hour: "12:00", inflow: 3.1, outflow: 5.6, buffer: 23.1 },
      { hour: "14:00", inflow: 4.8, outflow: 7.2, buffer: 20.7 },
      { hour: "16:00", inflow: 6.2, outflow: 8.4, buffer: 18.5 },
    ],
  },
  {
    id: "volatile",
    label: "Volatile",
    headline: "USDT and thin-market rails are degrading; route urgent flows to USDC.",
    generatedAt: "2026-07-16T08:24:00Z",
    positions: volatilePositions,
    alerts: [
      {
        id: "usdt-peg-watch",
        title: "USDT Tron peg moved beyond 25 bps watch band",
        severity: "high",
        source: "Market data adapter",
        detail:
          "Seeded demo price shows $0.9968 with depth down 44% from normal scenario.",
        action: "Pause new payout allocations to Tron and pre-stage USDC Base.",
        positionIds: ["pos-usdt-tron-ops"],
        age: "3m",
      },
      {
        id: "polygon-liquidity",
        title: "Polygon backup rail cannot cover weekend buffer",
        severity: "high",
        source: "DEX depth estimate",
        detail: "Depth estimate fell to $3.3M and concentration rose above 50%.",
        action: "Reduce dependency or split across Ethereum and Base.",
        positionIds: ["pos-usdp-polygon-backup"],
        age: "9m",
      },
    ],
    flow: [
      { hour: "08:00", inflow: 2.2, outflow: 2.1, buffer: 27.9 },
      { hour: "10:00", inflow: 1.1, outflow: 5.7, buffer: 23.3 },
      { hour: "12:00", inflow: 2.6, outflow: 7.4, buffer: 18.5 },
      { hour: "14:00", inflow: 3.4, outflow: 8.1, buffer: 13.8 },
      { hour: "16:00", inflow: 5.2, outflow: 9.6, buffer: 9.4 },
    ],
  },
  {
    id: "incident",
    label: "Incident",
    headline: "Policy breach: depeg, sanctions-risk drift, and liquidity compression.",
    generatedAt: "2026-07-16T08:26:00Z",
    positions: incidentPositions,
    alerts: [
      {
        id: "critical-usdt",
        title: "USDT Tron requires immediate risk-off plan",
        severity: "critical",
        source: "Policy engine",
        detail:
          "Peg deviation, risk score, and compliance score all breached configured thresholds.",
        action: "Freeze non-essential sends and execute USDC replacement plan.",
        positionIds: ["pos-usdt-tron-ops"],
        age: "1m",
      },
      {
        id: "solana-depth",
        title: "PYUSD Solana depth no longer clears payout policy",
        severity: "high",
        source: "DEX depth estimate",
        detail: "Liquidity depth is $6.2M against a $15M LATAM payout policy.",
        action: "Route payout batch to Base and split tail traffic.",
        positionIds: ["pos-pyusd-solana-payments"],
        age: "4m",
      },
    ],
    flow: [
      { hour: "08:00", inflow: 1.9, outflow: 3.2, buffer: 26.7 },
      { hour: "10:00", inflow: 0.8, outflow: 6.8, buffer: 20.7 },
      { hour: "12:00", inflow: 1.6, outflow: 8.9, buffer: 13.4 },
      { hour: "14:00", inflow: 2.1, outflow: 10.4, buffer: 5.1 },
      { hour: "16:00", inflow: 3.3, outflow: 8.7, buffer: -0.3 },
    ],
  },
  {
    id: "empty",
    label: "No data",
    headline: "No eligible treasury wallets are in this filtered demo state.",
    generatedAt: "2026-07-16T08:26:00Z",
    positions: [],
    alerts: [],
    flow: [],
  },
]

export const issuerColors: Record<Issuer, string> = {
  USDC: "#2563eb",
  USDT: "#0f9f6e",
  PYUSD: "#7c3aed",
  USDP: "#d97706",
}

export const severityRank: Record<Severity, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
}
