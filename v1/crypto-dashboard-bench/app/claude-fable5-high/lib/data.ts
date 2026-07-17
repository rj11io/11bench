import type { Asset, Org, PolicyConfig, Scenario } from "./types"

/**
 * Everything in this file is SEEDED, FICTIONAL demo data.
 * Nothing here is a live price, balance, or transaction.
 * The demo runs on a fixed clock so timestamps are stable and honest.
 */
export const DEMO_CLOCK_LABEL = "2026-07-17 09:41 UTC"
export const PRICE_FEED_ASOF = "09:40 UTC · simulated"
export const PRICE_FEED_SOURCE = "Aggregated feed (VWAP-style) — simulated"

export const ASSETS: Asset[] = [
  {
    id: "usdc",
    symbol: "USDC",
    name: "USD Coin",
    cls: "stable",
    issuer: "Circle",
    regNote:
      "Issuer regulated under the US GENIUS Act framework (demo note, not legal advice).",
    basePrice: 1.0002,
    change24hPct: 0.01,
    pegTarget: 1,
    liquidity: "deep",
    riskTags: [
      {
        kind: "issuer",
        text: "This token depends on Circle honoring 1:1 redemptions.",
      },
    ],
  },
  {
    id: "usdt",
    symbol: "USDT",
    name: "Tether USD",
    cls: "stable",
    issuer: "Tether",
    regNote:
      "Offshore issuer; restricted for EU distribution under MiCA (demo note, not legal advice).",
    basePrice: 0.9997,
    change24hPct: -0.02,
    pegTarget: 1,
    liquidity: "deep",
    riskTags: [
      {
        kind: "issuer",
        text: "This token depends on Tether's reserves and redemption process.",
      },
    ],
  },
  {
    id: "usds",
    symbol: "USDS",
    name: "Sky Dollar",
    cls: "stable",
    issuer: "Sky",
    regNote:
      "Decentralized issuer; not covered by GENIUS licensing (demo note, not legal advice).",
    basePrice: 0.9995,
    change24hPct: -0.03,
    pegTarget: 1,
    liquidity: "moderate",
    riskTags: [
      {
        kind: "issuer",
        text: "Backed by crypto collateral, not bank reserves; peg relies on protocol mechanics.",
      },
      {
        kind: "contract",
        text: "Value depends on the Sky protocol's smart contracts behaving correctly.",
      },
    ],
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ether",
    cls: "major",
    basePrice: 3412.55,
    change24hPct: -2.4,
    liquidity: "deep",
    riskTags: [
      {
        kind: "market",
        text: "Price can move 30%+ in a month; runway math must assume drawdowns.",
      },
    ],
  },
  {
    id: "steth",
    symbol: "stETH",
    name: "Lido Staked ETH",
    cls: "staked",
    basePrice: 3401.18,
    change24hPct: -2.6,
    liquidity: "moderate",
    riskTags: [
      {
        kind: "contract",
        text: "Wraps ETH inside Lido's staking contracts; a contract failure would hit this position.",
      },
      {
        kind: "market",
        text: "Usually trades near ETH, but can trade below it when many holders exit at once.",
      },
    ],
  },
  {
    id: "meri",
    symbol: "MERI",
    name: "Meridian Token (own token)",
    cls: "own",
    basePrice: 0.84,
    change24hPct: -6.8,
    liquidity: "thin",
    riskTags: [
      {
        kind: "market",
        text: "Thin order books: selling size moves the price against you.",
      },
      {
        kind: "concentration",
        text: "The org's own token — selling it is a governance and signaling event, so it is excluded from spendable runway by default.",
      },
    ],
  },
]

export const ASSET_BY_ID: Record<string, Asset> = Object.fromEntries(
  ASSETS.map((a) => [a.id, a])
)

export const MERIDIAN: Org = {
  id: "meridian",
  name: "Meridian Protocol Foundation",
  burnMonthlyUsd: 260_000,
  accounts: [
    {
      id: "ops",
      name: "Ops Safe",
      kind: "safe",
      chain: "Ethereum",
      addressShort: "0x4E2a…9c1B",
      threshold: "3 of 5",
      feed: { source: "Chain indexer — simulated", asOfLabel: "09:39 UTC · simulated" },
    },
    {
      id: "longterm",
      name: "Long-term Safe",
      kind: "safe",
      chain: "Ethereum",
      addressShort: "0xB70d…44Ae",
      threshold: "4 of 7",
      feed: { source: "Chain indexer — simulated", asOfLabel: "09:39 UTC · simulated" },
    },
    {
      id: "grants",
      name: "Grants Safe",
      kind: "safe",
      chain: "Arbitrum",
      addressShort: "0x91cF…D203",
      threshold: "2 of 4",
      feed: { source: "Chain indexer — simulated", asOfLabel: "09:40 UTC · simulated" },
    },
    {
      id: "cex",
      name: "Exchange account",
      kind: "exchange",
      chain: "Off-chain (CEX)",
      threshold: undefined,
      feed: {
        source: "Read-only exchange API — simulated",
        asOfLabel: "09:06 UTC · simulated",
        stale: true,
      },
    },
  ],
  positions: [
    { accountId: "ops", assetId: "usdc", qty: 1_000_000 },
    { accountId: "ops", assetId: "usdt", qty: 500_000 },
    { accountId: "ops", assetId: "eth", qty: 220 },
    { accountId: "longterm", assetId: "steth", qty: 310 },
    { accountId: "longterm", assetId: "eth", qty: 150 },
    { accountId: "longterm", assetId: "meri", qty: 1_800_000 },
    { accountId: "grants", assetId: "usdc", qty: 250_000 },
    { accountId: "grants", assetId: "usds", qty: 400_000 },
    { accountId: "cex", assetId: "usdc", qty: 200_000 },
    { accountId: "cex", assetId: "eth", qty: 60 },
  ],
}

/** The "New workspace" org starts empty; seeding it adds these starter accounts. */
export const FRESH_EMPTY: Org = {
  id: "fresh",
  name: "New workspace",
  burnMonthlyUsd: 0,
  accounts: [],
  positions: [],
}

export const FRESH_SEEDED: Org = {
  id: "fresh",
  name: "New workspace",
  burnMonthlyUsd: 90_000,
  accounts: [
    {
      id: "fresh-ops",
      name: "Ops Safe",
      kind: "safe",
      chain: "Ethereum",
      addressShort: "0x7aD1…03fE",
      threshold: "2 of 3",
      feed: { source: "Chain indexer — simulated", asOfLabel: "09:40 UTC · simulated" },
    },
  ],
  positions: [
    { accountId: "fresh-ops", assetId: "usdc", qty: 400_000 },
    { accountId: "fresh-ops", assetId: "eth", qty: 45 },
  ],
}

export const DEFAULT_POLICY: PolicyConfig = {
  stableFloorMonths: 9,
  issuerCapPct: 50,
  volatileCapPct: 40,
  ownTokenCapPct: 30,
  venueCapPct: 15,
}

export const NO_SCENARIO: Scenario = {
  preset: "none",
  majorsDrawdownPct: 0,
  ownDrawdownPct: 0,
  usdtDepeg: false,
  burnMultiplier: 1,
}

export const SCENARIO_PRESETS: Record<
  "correction" | "crisis",
  { label: string; description: string; scenario: Scenario }
> = {
  correction: {
    label: "Correction",
    description: "Majors −30%, own token −45%. A bad quarter.",
    scenario: {
      preset: "correction",
      majorsDrawdownPct: 30,
      ownDrawdownPct: 45,
      usdtDepeg: false,
      burnMultiplier: 1,
    },
  },
  crisis: {
    label: "Crisis",
    description: "Majors −60%, own token −75%, USDT wobbles to $0.985.",
    scenario: {
      preset: "crisis",
      majorsDrawdownPct: 60,
      ownDrawdownPct: 75,
      usdtDepeg: true,
      burnMultiplier: 1,
    },
  },
}

/** Deterministic PRNG so seeded series are identical on server and client. */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** 90 days of seeded treasury-value history ending at ~the base total. */
export function treasuryHistory(endValue: number, seed = 7): { day: number; value: number }[] {
  const rand = mulberry32(seed)
  const points: number[] = []
  let v = endValue * 0.92
  for (let i = 0; i < 90; i++) {
    const drift = (rand() - 0.47) * 0.018
    v = Math.max(v * (1 + drift), endValue * 0.72)
    points.push(v)
  }
  // Blend toward the actual current value so the series ends exactly on it.
  const scale = endValue / points[points.length - 1]
  return points.map((p, i) => ({
    day: i - 89,
    value: Math.round(p * (1 + (scale - 1) * (i / 89))),
  }))
}

/** 30 days of seeded peg history for a stablecoin, in dollars. */
export function pegHistory(assetId: string, pegNow: number): { day: number; value: number }[] {
  const rand = mulberry32(assetId.length * 31 + assetId.charCodeAt(0))
  const out: { day: number; value: number }[] = []
  for (let i = 0; i < 30; i++) {
    const wobble = (rand() - 0.5) * 0.002
    out.push({ day: i - 29, value: +(1 + wobble).toFixed(4) })
  }
  out[out.length - 1] = { day: 0, value: +pegNow.toFixed(4) }
  return out
}
