/**
 * Seeded demo data for the Waterline demo.
 *
 * EVERYTHING IN THIS FILE IS FICTION. The organisations, tokens, venues,
 * balances, prices, order books and counterparties do not exist. No value here
 * was read from a live market and nothing here updates.
 *
 * What is *not* fiction is the shape of the data and the latency figures it is
 * modelled on. Those come from primary documentation cited in research.md:
 *
 *  - Depth ladders use Kaiko's documented market-depth shape — cumulative
 *    notional inside basis-point bands of the best bid, snapshotted every 30s.
 *  - Liquid-staking redemption of 3 days sits inside Lido's documented "1-5
 *    days", stretching under stress the way Lido describes for Bunker mode.
 *  - Protocol unbonding of 21 days follows the common validator-exit design;
 *    Ethereum documents its own exit queue at 3.5-6.1 days for large queues.
 *  - The optimistic-bridge 7-day challenge window is the standard design.
 *  - Health factor, liquidation threshold and the 1.00 liquidation line follow
 *    Aave's published definition.
 *  - Stress magnitudes are taken from reported history: an 8% liquid-staking
 *    discount (stETH, June 2022) and a stablecoin trading several cents below
 *    par for about three days (USDC, March 2023).
 */

import type { Holding, Obligation, Org, PlanAction, Policy, Route, Snapshot } from "./engine"

export const DATA_AS_OF_CALM = "2026-07-24T16:00:00Z"
export const DATA_AS_OF_STRESS = "2026-07-25T09:20:00Z"
/** Fixed "now" per snapshot, so the demo renders identically on the server and
 *  in the browser and freshness checks mean something. */
export const DEMO_NOW_CALM = "2026-07-24T16:04:00Z"
export const DEMO_NOW_STRESS = "2026-07-25T09:23:00Z"

export function nowFor(snapshot: "calm" | "stressed"): string {
  return snapshot === "stressed" ? DEMO_NOW_STRESS : DEMO_NOW_CALM
}
export const HORIZON_START = "2026-08-01T00:00:00Z"

export const SNAPSHOTS: Snapshot[] = [
  {
    id: "calm",
    label: "Calm book",
    asOf: DATA_AS_OF_CALM,
    note: "Seeded snapshot with orderly two-sided markets. Depth, prices and queue times all at their base values.",
  },
  {
    id: "stressed",
    label: "Stressed book",
    asOf: DATA_AS_OF_STRESS,
    note: "Seeded snapshot modelling a broad risk-off day: native token down 38%, order books thinner by roughly 60%, redemption queues extended, one stablecoin trading below par.",
  },
]

/* -------------------------------------------------------------- helper */

function bands(pairs: [number, number][]) {
  return pairs.map(([bps, cumUsd]) => ({ bps, cumUsd }))
}

function thin(rows: { bps: number; cumUsd: number }[], factor: number) {
  return rows.map((r) => ({ bps: r.bps, cumUsd: Math.round(r.cumUsd * factor) }))
}

/* ----------------------------------------------- Meridian Foundation venues */

const MRD_UNI: Route = {
  id: "mrd-uni",
  venue: "Uniswap v3 · MRD/USDC 0.30%",
  kind: "amm",
  feeBps: 30,
  advUsd: 240_000,
  depth: bands([
    [10, 22_000],
    [25, 55_000],
    [50, 106_000],
    [100, 188_000],
    [200, 325_000],
    [400, 520_000],
    [800, 790_000],
  ]),
  depthStress: thin(
    bands([
      [10, 22_000],
      [25, 55_000],
      [50, 106_000],
      [100, 188_000],
      [200, 325_000],
      [400, 520_000],
      [800, 790_000],
    ]),
    0.36
  ),
  tier: "observed",
  asOf: DATA_AS_OF_CALM,
  note: "Concentrated-liquidity pool. Depth is range-bound: a single tick range leaving the band removes it.",
}

const MRD_CEX_A: Route = {
  id: "mrd-cex-a",
  venue: "Venue A · MRD/USDT spot",
  kind: "cex",
  feeBps: 10,
  advUsd: 300_000,
  depth: bands([
    [10, 30_000],
    [25, 74_000],
    [50, 141_000],
    [100, 248_000],
    [200, 415_000],
    [400, 660_000],
    [800, 990_000],
  ]),
  depthStress: thin(
    bands([
      [10, 30_000],
      [25, 74_000],
      [50, 141_000],
      [100, 248_000],
      [200, 415_000],
      [400, 660_000],
      [800, 990_000],
    ]),
    0.4
  ),
  tier: "observed",
  asOf: DATA_AS_OF_CALM,
}

const MRD_CEX_B: Route = {
  id: "mrd-cex-b",
  venue: "Venue B · MRD/USDT spot",
  kind: "cex",
  feeBps: 12,
  advUsd: 100_000,
  depth: bands([
    [10, 9_000],
    [25, 22_000],
    [50, 42_000],
    [100, 74_000],
    [200, 126_000],
    [400, 200_000],
    [800, 300_000],
  ]),
  depthStress: thin(
    bands([
      [10, 9_000],
      [25, 22_000],
      [50, 42_000],
      [100, 74_000],
      [200, 126_000],
      [400, 200_000],
      [800, 300_000],
    ]),
    0.33
  ),
  tier: "observed",
  asOf: DATA_AS_OF_CALM,
  note: "Thin book. Included in the allowlist but contributes little capacity.",
}

const ETH_ROUTES: Route[] = [
  {
    id: "eth-cex",
    venue: "Venue A · ETH/USD spot",
    kind: "cex",
    feeBps: 6,
    advUsd: 9_400_000_000,
    depth: bands([
      [10, 24_000_000],
      [25, 58_000_000],
      [50, 112_000_000],
      [100, 205_000_000],
      [200, 380_000_000],
      [400, 640_000_000],
      [800, 980_000_000],
    ]),
    depthStress: thin(
      bands([
        [10, 24_000_000],
        [25, 58_000_000],
        [50, 112_000_000],
        [100, 205_000_000],
        [200, 380_000_000],
        [400, 640_000_000],
        [800, 980_000_000],
      ]),
      0.55
    ),
    tier: "observed",
    asOf: DATA_AS_OF_CALM,
  },
]

const PAR: Route[] = [
  {
    id: "par",
    venue: "Issuer redemption at par",
    kind: "redemption",
    feeBps: 0,
    advUsd: 0,
    depth: [],
    depthStress: [],
    tier: "observed",
    asOf: DATA_AS_OF_CALM,
    note: "Redeemed one-for-one with the issuer. No order book, so no price impact — but issuer risk instead.",
  },
]

/* -------------------------------------------------- Meridian Foundation */

const MERIDIAN_HOLDINGS: Holding[] = [
  {
    id: "mrd",
    symbol: "MRD",
    name: "Meridian governance token",
    assetClass: "native",
    chain: "Ethereum",
    custody: "Treasury Safe · 4-of-7",
    qty: 26_000_000,
    unit: "MRD",
    markPrice: 1.86,
    markPriceStress: 1.153,
    priceSource: { label: "Volume-weighted across 3 allowlisted venues", url: undefined },
    priceAsOf: DATA_AS_OF_CALM,
    priceHeartbeatMins: 5,
    settleDays: 0,
    settleDaysStress: 0,
    settleNote:
      "Sellable on the open book today, but only in slices — the constraint is market capacity, not settlement.",
    saleConstrained: true,
    capacityGroup: "MRD",
    routes: [MRD_UNI, MRD_CEX_A, MRD_CEX_B],
    notes: [
      "The token the foundation issued. Accounting measures it at price x quantity with no size discount, which is why mark value and realisable value diverge most here.",
    ],
  },
  {
    id: "mrd-locked",
    symbol: "MRD",
    name: "Meridian token — contractually restricted",
    assetClass: "native",
    chain: "Ethereum",
    custody: "Vesting contract · beneficiary Treasury Safe",
    qty: 6_000_000,
    unit: "MRD",
    markPrice: 1.86,
    markPriceStress: 1.153,
    priceSource: { label: "Same mark as unrestricted MRD" },
    priceAsOf: DATA_AS_OF_CALM,
    priceHeartbeatMins: 5,
    settleDays: 279,
    settleDaysStress: 279,
    settleNote: "Transfer-restricted until the cliff. No route exists before then at any price.",
    saleConstrained: true,
    capacityGroup: "MRD",
    routes: [MRD_UNI, MRD_CEX_A, MRD_CEX_B],
    restriction: {
      kind: "Ecosystem lock-up, transfer-restricted",
      lapseDate: "2027-04-30",
      lapseMonth: 8,
      condition: "Cliff release on 2027-04-30; no early release clause.",
    },
    notes: [
      "Disclosed under ASU 2023-08 as a restricted holding: fair value, nature of the restriction, remaining duration and lapse condition.",
      "Unlocking adds inventory to sell, not capacity to sell it. The market can still only absorb the same amount per day.",
    ],
  },
  {
    id: "stmrd",
    symbol: "stMRD",
    name: "Staked MRD — protocol security module",
    assetClass: "staked",
    chain: "Ethereum",
    custody: "Staking module · Treasury Safe as withdrawer",
    qty: 7_900_000,
    unit: "MRD",
    markPrice: 1.86,
    markPriceStress: 1.153,
    priceSource: { label: "MRD mark; stake accrues 1:1 in units" },
    priceAsOf: DATA_AS_OF_CALM,
    priceHeartbeatMins: 5,
    settleDays: 21,
    settleDaysStress: 28,
    settleNote:
      "21-day unbonding period before tokens are transferable. Under stress the queue lengthens.",
    settleSource: {
      label: "Ethereum exit-queue arithmetic (analogous design)",
      url: "https://ethereum.org/en/staking/withdrawals/",
    },
    saleConstrained: true,
    capacityGroup: "MRD",
    routes: [MRD_UNI, MRD_CEX_A, MRD_CEX_B],
    notes: [
      "Earns staking rewards, but the 21-day exit means it cannot answer a payment due next week.",
      "Shares the MRD market pool: unbonding early does not raise how much the market absorbs.",
    ],
  },
  {
    id: "lp-mrd-usdc",
    symbol: "MRD/USDC LP",
    name: "Uniswap v3 liquidity position · MRD/USDC",
    assetClass: "lp",
    chain: "Ethereum",
    custody: "Position NFT · Treasury Safe",
    qty: 1,
    unit: "position",
    markPrice: 4_350_000,
    markPriceStress: 3_180_000,
    priceSource: { label: "Position value from pool reserves at current tick" },
    priceAsOf: DATA_AS_OF_CALM,
    priceHeartbeatMins: 5,
    settleDays: 0,
    settleDaysStress: 0,
    settleNote:
      "Withdrawable same day, but it comes out as two tokens — roughly half in MRD, which then joins the MRD sale queue.",
    saleConstrained: true,
    capacityGroup: "MRD",
    routes: [MRD_UNI, MRD_CEX_A, MRD_CEX_B],
    notes: [
      "Providing liquidity in your own token is not diversification. Withdrawing returns MRD you still have to sell.",
      "Under stress the position drifts further into MRD as the price falls through its range.",
    ],
  },
  {
    id: "usdc",
    symbol: "USDC",
    name: "USD Coin",
    assetClass: "stable",
    chain: "Ethereum",
    custody: "Treasury Safe · 4-of-7",
    qty: 4_200_000,
    unit: "USDC",
    markPrice: 1.0,
    markPriceStress: 0.9994,
    priceSource: { label: "Issuer redemption at par; secondary mark for reference" },
    priceAsOf: DATA_AS_OF_CALM,
    priceHeartbeatMins: 60,
    settleDays: 0,
    settleDaysStress: 0,
    settleNote: "Spendable immediately.",
    saleConstrained: false,
    routes: PAR,
    reserveDisclosure: "monthly-attested",
    pegBps: 0,
    pegBpsStress: -6,
  },
  {
    id: "usdt",
    symbol: "USDT",
    name: "Tether USD",
    assetClass: "stable",
    chain: "Ethereum",
    custody: "Treasury Safe · 4-of-7",
    qty: 1_250_000,
    unit: "USDT",
    markPrice: 0.9998,
    markPriceStress: 0.9989,
    priceSource: { label: "Secondary market mark" },
    priceAsOf: DATA_AS_OF_CALM,
    priceHeartbeatMins: 60,
    settleDays: 0,
    settleDaysStress: 0,
    settleNote: "Spendable immediately.",
    saleConstrained: false,
    routes: PAR,
    reserveDisclosure: "monthly-attested",
    pegBps: -2,
    pegBpsStress: -11,
  },
  {
    id: "usdx",
    symbol: "USDX",
    name: "USDX (fictional issuer, no attested reserve report)",
    assetClass: "stable",
    chain: "Base",
    custody: "Operations Safe · 3-of-5",
    qty: 1_900_000,
    unit: "USDX",
    markPrice: 0.9962,
    markPriceStress: 0.943,
    priceSource: { label: "Secondary market mark — no issuer redemption facility" },
    priceAsOf: DATA_AS_OF_CALM,
    // Deliberately behind: this fictional issuer publishes nothing and its only
    // venue quotes thinly, so the mark lags roughly seven hours in any
    // snapshot. This is what exercises the degraded-data path.
    priceLagMins: 415,
    priceHeartbeatMins: 60,
    settleDays: 1,
    settleDaysStress: 4,
    settleNote:
      "No direct redemption. Exit is a secondary-market sale, which is exactly the route that fails when a peg is questioned.",
    saleConstrained: false,
    routes: PAR,
    reserveDisclosure: "none",
    pegBps: -38,
    pegBpsStress: -570,
    notes: [
      "Already trading 38 bps below par in the calm snapshot. Neither the GENIUS Act nor MiCA disclosure cycle applies to this fictional issuer, so there is no monthly attested reserve report to check.",
      "Stress magnitude follows the reported March 2023 USDC episode, where a stablecoin traded to roughly $0.88 and took about three days to recover.",
    ],
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ether",
    assetClass: "major",
    chain: "Ethereum",
    custody: "Treasury Safe · 4-of-7",
    qty: 2_950,
    unit: "ETH",
    markPrice: 3_142,
    markPriceStress: 2_608,
    priceSource: { label: "Aggregated price feed", url: "https://docs.chain.link/data-feeds" },
    priceAsOf: DATA_AS_OF_CALM,
    priceHeartbeatMins: 20,
    settleDays: 0,
    settleDaysStress: 0,
    settleNote: "Deep book. The treasury's whole position clears inside the first depth band.",
    saleConstrained: true,
    routes: ETH_ROUTES,
    notes: ["The one holding where mark value and realisable value are effectively the same number."],
  },
  {
    id: "wsteth",
    symbol: "wstETH",
    name: "Wrapped staked ETH",
    assetClass: "lst",
    chain: "Ethereum",
    custody: "Treasury Safe · 4-of-7",
    qty: 1_480,
    unit: "wstETH",
    markPrice: 3_795,
    markPriceStress: 3_052,
    priceSource: { label: "Secondary mark; redemption value tracks underlying ETH" },
    priceAsOf: DATA_AS_OF_CALM,
    priceHeartbeatMins: 20,
    settleDays: 3,
    settleDaysStress: 9,
    settleNote:
      "Redeemed for ETH through the withdrawal queue: 1-5 days normally, longer if the protocol enters its slower processing mode.",
    settleSource: {
      label: "Lido: how long does an Ethereum withdrawal take?",
      url: "https://help.lido.fi/en/articles/7858315-how-long-does-an-ethereum-withdrawal-take",
    },
    saleConstrained: false,
    routes: [
      {
        ...PAR[0],
        id: "wsteth-redeem",
        venue: "Protocol withdrawal queue → ETH",
        feeBps: 4,
        note: "Redemption avoids the secondary-market discount, at the cost of days in a queue.",
      },
    ],
    notes: [
      "Two exits with different prices: redeem through the queue at par in ETH, or sell on the secondary market today at a discount.",
      "In June 2022 that discount reached 8% when redemption was not yet possible. The queue is the safer route when there is time to use it.",
    ],
  },
  {
    id: "tbll",
    symbol: "TBLL",
    name: "Tokenised Treasury-bill fund (fictional)",
    assetClass: "rwa",
    chain: "Ethereum",
    custody: "Whitelisted subscriber account",
    qty: 3_000_000,
    unit: "TBLL",
    markPrice: 1.0,
    markPriceStress: 1.0,
    priceSource: { label: "Fund net asset value, struck daily" },
    priceAsOf: DATA_AS_OF_CALM,
    priceHeartbeatMins: 1_440,
    settleDays: 2,
    settleDaysStress: 3,
    settleNote: "Redemption settles T+2 on business days. No weekend processing.",
    saleConstrained: false,
    routes: PAR,
    notes: ["Stable in price, but it is not cash on a Saturday."],
  },
  {
    id: "usdc-l2",
    symbol: "USDC.e",
    name: "USDC bridged to an optimistic rollup",
    assetClass: "bridged",
    chain: "Rollup",
    custody: "Operations Safe · 3-of-5 (rollup)",
    qty: 1_150_000,
    unit: "USDC.e",
    markPrice: 0.9998,
    markPriceStress: 0.9975,
    priceSource: { label: "Secondary mark on the rollup" },
    priceAsOf: DATA_AS_OF_CALM,
    priceHeartbeatMins: 60,
    settleDays: 8,
    settleDaysStress: 8,
    settleNote:
      "Canonical bridge withdrawal carries a 7-day challenge window before funds land on the parent chain. A fast bridge is quicker but adds a counterparty.",
    saleConstrained: false,
    routes: PAR,
    reserveDisclosure: "monthly-attested",
    notes: [
      "Counted as a stablecoin on most dashboards. It is a stablecoin plus a seven-day wait plus bridge risk.",
    ],
  },
  {
    id: "aave-eth",
    symbol: "aETH",
    name: "ETH supplied to a lending market (against USDC debt)",
    assetClass: "collateral",
    chain: "Ethereum",
    custody: "Treasury Safe · 4-of-7",
    qty: 2_600,
    unit: "ETH",
    markPrice: 3_142,
    markPriceStress: 2_608,
    priceSource: { label: "Protocol oracle price" },
    priceAsOf: DATA_AS_OF_CALM,
    priceHeartbeatMins: 20,
    settleDays: 0,
    settleDaysStress: 0,
    settleNote: "Withdrawable same day, but only down to the health-factor floor.",
    settleSource: {
      label: "Aave: health factor and liquidations",
      url: "https://aave.com/help/borrowing/liquidations",
    },
    saleConstrained: false,
    routes: PAR,
    debt: {
      protocol: "Lending market",
      symbol: "USDC",
      amountUsd: 3_100_000,
      liquidationThreshold: 0.83,
    },
    notes: [
      "Gross collateral is not treasury value. Most dashboards show the full amount; only the part above the health-factor floor can actually leave.",
    ],
  },
]

const MERIDIAN_OBLIGATIONS: Obligation[] = [
  {
    id: "payroll",
    label: "Contributor payroll and benefits",
    category: "payroll",
    amountUsd: 2_040_000,
    fromMonth: 0,
    toMonth: 11,
    everyMonths: 1,
    commitment: "contracted",
    counterparty: "47 contributors, 9 jurisdictions",
  },
  {
    id: "infra",
    label: "Infrastructure, audits and security retainers",
    category: "infra",
    amountUsd: 415_000,
    fromMonth: 0,
    toMonth: 11,
    everyMonths: 1,
    commitment: "contracted",
  },
  {
    id: "incentives-h1",
    label: "Liquidity incentive programme (first half)",
    category: "incentives",
    amountUsd: 780_000,
    fromMonth: 0,
    toMonth: 5,
    everyMonths: 1,
    commitment: "discretionary",
    counterparty: "Governance-approved, cancellable with 30 days' notice",
  },
  {
    id: "incentives-h2",
    label: "Liquidity incentive programme (second half)",
    category: "incentives",
    amountUsd: 390_000,
    fromMonth: 6,
    toMonth: 11,
    everyMonths: 1,
    commitment: "discretionary",
    counterparty: "Governance-approved, cancellable with 30 days' notice",
  },
  {
    id: "grants",
    label: "Ecosystem grants tranche",
    category: "grants",
    amountUsd: 1_150_000,
    fromMonth: 1,
    toMonth: 11,
    everyMonths: 3,
    commitment: "approved",
    counterparty: "14 grantees on milestone schedules",
  },
  {
    id: "legal",
    label: "Legal, statutory audit and insurance",
    category: "legal",
    amountUsd: 340_000,
    fromMonth: 2,
    toMonth: 11,
    everyMonths: 3,
    commitment: "contracted",
  },
  {
    id: "partnership",
    label: "Strategic integration commitment (single payment)",
    category: "partnership",
    amountUsd: 2_500_000,
    fromMonth: 3,
    toMonth: 3,
    everyMonths: 1,
    commitment: "contracted",
    counterparty: "Signed, payable on integration milestone",
  },
  {
    id: "brand",
    label: "Events and brand programme",
    category: "brand",
    amountUsd: 220_000,
    fromMonth: 2,
    toMonth: 8,
    everyMonths: 6,
    commitment: "discretionary",
  },
]

export const DEFAULT_POLICY: Policy = {
  minCoverageRatio: 1.1,
  minBufferMonths: 6,
  bufferDays: 7,
  maxSingleAssetPct: 25,
  maxNativePct: 50,
  maxSlippageBps: 75,
  maxAdvParticipationPct: 6,
  minHealthFactor: 1.6,
  twapSlicesPerDay: 6,
  allowOtc: true,
  maxLowDisclosureStablePct: 2,
  dualApprovalAboveUsd: 2_000_000,
}

const MERIDIAN_ACTIONS: PlanAction[] = [
  {
    id: "act-otc",
    kind: "otc_block",
    label: "Negotiated MRD block sale to a strategic buyer",
    rationale:
      "Moves size off the public book, so it does not consume daily market capacity. The cost is an agreed discount instead of slippage.",
    costUsd: 675_000,
    reversible: false,
    target: "mrd",
    notionalUsd: 7_500_000,
    discountBps: 900,
    settleDays: 7,
    policyNote:
      "Off-book pricing cannot be verified against a public quote. Requires disclosure to the council and a second approver.",
    requiresConsentFrom: "Counterparty term sheet + council disclosure",
  },
  {
    id: "act-participation",
    kind: "raise_participation",
    label: "Raise MRD participation to 9% of daily volume for 6 months",
    rationale:
      "Buys 50% more capacity per day on the same books. Slippage rises with it, so the window is time-boxed and logged as a policy exception.",
    costUsd: 118_000,
    reversible: true,
    target: "MRD",
    participationPct: 9,
    windowMonths: 6,
    policyNote: "Exceeds the 6% standing cap. Time-boxed exception, expires automatically.",
  },
  {
    id: "act-trim-incentives",
    kind: "trim_spend",
    label: "Cut the liquidity incentive programme by 60%",
    rationale:
      "The single largest discretionary line. Cancellable on 30 days' notice, so it is the cheapest lever available.",
    costUsd: 0,
    reversible: true,
    obligationId: "incentives-h1",
    pctReduction: 60,
    fromMonth: 1,
    policyNote:
      "Governance-approved programme. Reducing it needs a council vote, not just a treasury decision.",
    requiresConsentFrom: "Council vote",
  },
  {
    id: "act-trim-incentives-h2",
    kind: "trim_spend",
    label: "Cut the second-half incentive programme by 60%",
    rationale: "Same lever, applied to the second half of the horizon.",
    costUsd: 0,
    reversible: true,
    obligationId: "incentives-h2",
    pctReduction: 60,
    fromMonth: 6,
    policyNote: "Council vote required.",
    requiresConsentFrom: "Council vote",
  },
  {
    id: "act-defer-partnership",
    kind: "defer_spend",
    label: "Defer the strategic integration payment by 4 months",
    rationale:
      "Timing only. It does not create cash, it moves the payment past the tightest month — which is enough when the shortfall is a timing problem.",
    costUsd: 75_000,
    reversible: true,
    obligationId: "partnership",
    deferByMonths: 4,
    policyNote: "Contracted payment. Deferral needs written counterparty agreement.",
    requiresConsentFrom: "Counterparty amendment",
  },
  {
    id: "act-redeem-wsteth",
    kind: "switch_route",
    label: "Redeem wstETH through the withdrawal queue instead of selling",
    rationale:
      "Redemption returns full value in ETH and avoids the secondary-market discount. It costs days, not basis points.",
    costUsd: 0,
    reversible: true,
    target: "wsteth",
    settleDays: 3,
    policyNote: "No exception needed. This is the documented default route.",
  },
  {
    id: "act-repay",
    kind: "repay_debt",
    label: "Repay $1.20m of lending-market debt to free pinned collateral",
    rationale:
      "Repaying lifts the health factor and releases collateral above the floor. Net cash gain is small; the real gain is a thicker margin before liquidation.",
    costUsd: 22_000,
    reversible: true,
    target: "aave-eth",
    repayUsd: 1_200_000,
    policyNote: "Uses buffer cash now to reduce forced-sale risk later.",
  },
]

/* --------------------------------------------------- Northwind (empty org) */

export const NORTHWIND_STARTER_HOLDINGS: Holding[] = [
  {
    id: "nw-usdc",
    symbol: "USDC",
    name: "USD Coin",
    assetClass: "stable",
    chain: "Base",
    custody: "Northwind Safe · 3-of-5",
    qty: 620_000,
    unit: "USDC",
    markPrice: 1.0,
    markPriceStress: 0.9994,
    priceSource: { label: "Issuer redemption at par" },
    priceAsOf: DATA_AS_OF_CALM,
    priceHeartbeatMins: 60,
    settleDays: 0,
    settleDaysStress: 0,
    settleNote: "Spendable immediately.",
    saleConstrained: false,
    routes: PAR,
    reserveDisclosure: "monthly-attested",
  },
  {
    id: "nw-nwd",
    symbol: "NWD",
    name: "Northwind governance token",
    assetClass: "native",
    chain: "Base",
    custody: "Northwind Safe · 3-of-5",
    qty: 5_600_000,
    unit: "NWD",
    markPrice: 0.34,
    markPriceStress: 0.19,
    priceSource: { label: "Single-venue mark" },
    priceAsOf: DATA_AS_OF_CALM,
    priceHeartbeatMins: 15,
    settleDays: 0,
    settleDaysStress: 0,
    settleNote: "One shallow pool. Capacity, not settlement, is the binding constraint.",
    saleConstrained: true,
    capacityGroup: "NWD",
    routes: [
      {
        id: "nwd-pool",
        venue: "Aerodrome · NWD/USDC",
        kind: "amm",
        feeBps: 30,
        advUsd: 46_000,
        depth: bands([
          [10, 3_400],
          [25, 8_200],
          [50, 15_500],
          [100, 27_000],
          [200, 44_000],
          [400, 68_000],
          [800, 96_000],
        ]),
        depthStress: thin(
          bands([
            [10, 3_400],
            [25, 8_200],
            [50, 15_500],
            [100, 27_000],
            [200, 44_000],
            [400, 68_000],
            [800, 96_000],
          ]),
          0.3
        ),
        tier: "observed",
        asOf: DATA_AS_OF_CALM,
      },
    ],
    notes: ["96% of this treasury is one token in one pool. That is the finding, not a rounding note."],
  },
]

export const NORTHWIND_STARTER_OBLIGATIONS: Obligation[] = [
  {
    id: "nw-payroll",
    label: "Core team payroll",
    category: "payroll",
    amountUsd: 96_000,
    fromMonth: 0,
    toMonth: 11,
    everyMonths: 1,
    commitment: "contracted",
  },
  {
    id: "nw-infra",
    label: "Infrastructure and tooling",
    category: "infra",
    amountUsd: 18_000,
    fromMonth: 0,
    toMonth: 11,
    everyMonths: 1,
    commitment: "contracted",
  },
  {
    id: "nw-audit",
    label: "Contract audit, second engagement",
    category: "legal",
    amountUsd: 185_000,
    fromMonth: 2,
    toMonth: 2,
    everyMonths: 1,
    commitment: "approved",
  },
]

export const NORTHWIND_ACTIONS: PlanAction[] = [
  {
    id: "nw-act-trim",
    kind: "trim_spend",
    label: "Reduce infrastructure spend by 30%",
    rationale: "Smallest reversible lever while a diversification plan is agreed.",
    costUsd: 0,
    reversible: true,
    obligationId: "nw-infra",
    pctReduction: 30,
    fromMonth: 1,
  },
  {
    id: "nw-act-otc",
    kind: "otc_block",
    label: "Negotiated NWD block sale",
    rationale: "The pool cannot absorb meaningful size. Off-book is the only route at scale.",
    costUsd: 96_000,
    reversible: false,
    target: "nw-nwd",
    notionalUsd: 800_000,
    discountBps: 1_200,
    settleDays: 10,
    policyNote: "A 12% discount reflects how thin the public market is.",
    requiresConsentFrom: "Counterparty term sheet + council disclosure",
  },
]

/* ------------------------------------------------------------------- orgs */

export const MERIDIAN: Org = {
  id: "meridian",
  name: "Meridian Protocol Foundation",
  kind: "Protocol foundation · demo",
  safe: "eth:0xDEMO…4f21 (fictional)",
  signers: "4-of-7 council signers",
  horizonStart: HORIZON_START,
  holdings: MERIDIAN_HOLDINGS,
  obligations: MERIDIAN_OBLIGATIONS,
  policy: DEFAULT_POLICY,
  actions: MERIDIAN_ACTIONS,
}

export const NORTHWIND: Org = {
  id: "northwind",
  name: "Northwind DAO",
  kind: "New workspace · demo",
  safe: "base:0xDEMO…9c08 (fictional)",
  signers: "3-of-5 signers",
  horizonStart: HORIZON_START,
  holdings: [],
  obligations: [],
  policy: { ...DEFAULT_POLICY, minBufferMonths: 4 },
  actions: NORTHWIND_ACTIONS,
}

export const SEED_ORGS: Org[] = [MERIDIAN, NORTHWIND]

/* ----------------------------------------------------- scenario definitions */

export interface ScenarioDef {
  id: string
  name: string
  summary: string
  anchor: string
  anchorUrl?: string
  /** Snapshot the scenario runs against. */
  snapshot: Snapshot["id"]
  /** Extra shocks layered on top of the snapshot, as multipliers. */
  nativePriceMult?: number
  depthMult?: number
  stableShockBps?: number
  queueDaysAdd?: number
}

export const SCENARIOS: ScenarioDef[] = [
  {
    id: "base",
    name: "Base — calm book",
    summary: "The seeded calm snapshot with no extra shock applied.",
    anchor: "Reference case. Depth, prices and queues at base values.",
    snapshot: "calm",
  },
  {
    id: "risk-off",
    name: "Broad risk-off day",
    summary:
      "Native token down 38%, books thinner by roughly 60%, redemption queues stretched. This is the stressed snapshot.",
    anchor:
      "Magnitude follows Kaiko's finding that slippage for BTC-USD on major US venues tripled within hours on 5 August 2024.",
    anchorUrl: "https://www.kaiko.com/resources/moving-markets-liquidity-and-large-sell-orders",
    snapshot: "stressed",
  },
  {
    id: "lst-discount",
    name: "Liquid-staking discount, June 2022 shape",
    summary:
      "Redemption queues lengthen and the secondary market for staked assets trades at a discount, so selling early costs real value.",
    anchor:
      "stETH's discount to ETH reached a reported record 8% on 13 June 2022 while Celsius held 409,260 stETH and faced weekly redemption requests.",
    anchorUrl:
      "https://www.coindesk.com/markets/2022/06/14/staked-ether-becomes-focus-of-crypto-stress-from-celsius-to-three-arrows",
    snapshot: "stressed",
    queueDaysAdd: 11,
    depthMult: 0.8,
  },
  {
    id: "depeg",
    name: "Stablecoin depeg, March 2023 shape",
    summary:
      "One stablecoin issuer's reserves are questioned. The token trades below par for about three days and its only exit is the secondary market.",
    anchor:
      "USDC broke its peg on 11 March 2023 after Circle disclosed $3.3bn at Silicon Valley Bank, trading to roughly $0.88 and recovering over about three days.",
    anchorUrl:
      "https://www.coindesk.com/business/2023/03/13/usdc-stablecoin-regains-dollar-peg-after-silicon-valley-bank-induced-chaos",
    snapshot: "calm",
    stableShockBps: -1_150,
    queueDaysAdd: 3,
  },
  {
    id: "native-halved",
    name: "Native token halves",
    summary:
      "One variable, so the effect is readable: the token the treasury issued loses half its value, with books and queues unchanged.",
    anchor:
      "A single-variable stress. Governance tokens routinely move this far; keeping other inputs fixed isolates the price effect from the liquidity effect.",
    snapshot: "calm",
    nativePriceMult: 0.5,
  },
  {
    id: "venue-outage",
    name: "Largest venue goes offline",
    summary:
      "The deepest venue stops accepting orders. Remaining capacity is whatever the other books can absorb.",
    anchor:
      "Concentration in one venue is a liquidity risk, not just an operational one. Kaiko's framework treats depth per venue for exactly this reason.",
    anchorUrl:
      "https://docs.kaiko.com/rest-api/data-feeds/level-1-and-level-2-data/level-2-aggregations/market-depth-snapshot",
    snapshot: "calm",
    depthMult: 0.42,
  },
]

/**
 * Layer a scenario's shocks onto a snapshot and return an org whose calm
 * fields already contain the shocked values, so every downstream calculation
 * can be run with a single snapshot id. Nothing is mutated in place.
 */
export function applyScenario(org: Org, def: ScenarioDef): Org {
  const fromStressed = def.snapshot === "stressed"
  const holdings = org.holdings.map((h) => {
    let price = fromStressed ? h.markPriceStress : h.markPrice
    let settle = fromStressed ? h.settleDaysStress : h.settleDays
    const nativeFamily =
      h.assetClass === "native" || h.assetClass === "staked" || h.assetClass === "lp"

    if (def.nativePriceMult && nativeFamily) price *= def.nativePriceMult
    if (
      def.stableShockBps &&
      h.assetClass === "stable" &&
      h.reserveDisclosure !== "monthly-attested"
    ) {
      price *= 1 + def.stableShockBps / 10_000
    }
    // Queues stretch; assets that were already same-day stay same-day.
    if (def.queueDaysAdd && settle > 0 && !h.restriction) settle += def.queueDaysAdd

    const routes = h.routes.map((r) => {
      const base = fromStressed ? r.depthStress : r.depth
      const mult = def.depthMult ?? 1
      const scaled =
        mult === 1 ? base : base.map((b) => ({ bps: b.bps, cumUsd: b.cumUsd * mult }))
      return {
        ...r,
        depth: scaled,
        depthStress: scaled,
        advUsd: r.advUsd * mult,
        asOf: fromStressed ? DATA_AS_OF_STRESS : DATA_AS_OF_CALM,
      }
    })

    return {
      ...h,
      markPrice: price,
      markPriceStress: price,
      settleDays: settle,
      settleDaysStress: settle,
      routes,
    }
  })
  return { ...org, holdings }
}

export function scenarioById(id: string): ScenarioDef {
  return SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0]
}
