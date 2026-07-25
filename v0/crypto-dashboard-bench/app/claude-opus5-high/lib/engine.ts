/**
 * Waterline — liquidity engine.
 *
 * Pure arithmetic. No imports, no React, no I/O, so it can be compiled and
 * checked on its own. Every exported function is deterministic: given the same
 * seeded snapshot it returns the same numbers on the server and in the browser.
 *
 * Vocabulary used throughout:
 *   bps            basis point — one hundredth of a percent.
 *   mark value     quantity x quoted price. What an accounting fair-value
 *                  measurement reports (ASC 820 forbids a size discount).
 *   realisable     what a sale would actually put in the bank, after price
 *                  impact and fees, and only for the part that can be sold
 *                  inside the policy limits.
 *   time to cash   days from "decide" to "spendable", including queues,
 *                  challenge windows and redemption cycles.
 */

/* ------------------------------------------------------------------ types */

export type Tier = "observed" | "derived" | "modelled" | "input"

export type BucketId = "t0" | "t1_2" | "t3_7" | "t8_30" | "t31_90" | "locked"

export type AssetClass =
  | "stable"
  | "major"
  | "native"
  | "lst"
  | "staked"
  | "lp"
  | "rwa"
  | "bridged"
  | "collateral"

export interface Source {
  label: string
  url?: string
}

/** One rung of an order-book depth ladder, in Kaiko's documented shape: the
 *  cumulative notional sellable within `bps` of the best bid. */
export interface DepthBand {
  bps: number
  cumUsd: number
}

export interface Route {
  id: string
  venue: string
  kind: "cex" | "amm" | "otc" | "redemption"
  feeBps: number
  advUsd: number
  depth: DepthBand[]
  depthStress: DepthBand[]
  tier: Tier
  asOf: string
  note?: string
}

export interface Restriction {
  kind: string
  lapseDate: string
  lapseMonth: number
  condition: string
}

export interface DebtLeg {
  protocol: string
  symbol: string
  amountUsd: number
  liquidationThreshold: number
}

export interface Holding {
  id: string
  symbol: string
  name: string
  assetClass: AssetClass
  chain: string
  custody: string
  qty: number
  unit: string
  markPrice: number
  markPriceStress: number
  priceSource: Source
  priceAsOf: string
  priceHeartbeatMins: number
  /** Minutes this source lags behind the snapshot it belongs to. A snapshot is
   *  a point in time, so most sources are as of the snapshot itself; a lag is
   *  how a genuinely slow feed is expressed. */
  priceLagMins?: number
  /** Days from decision to spendable cash on the default route. */
  settleDays: number
  settleDaysStress: number
  settleNote: string
  settleSource?: Source
  /** False for assets that redeem at par (stables, tokenised T-bills): no book
   *  to walk, so no price impact and no participation limit. */
  saleConstrained: boolean
  /** Holdings sharing a group compete for the same market capacity. A treasury
   *  cannot sell its liquid native token and its unstaked native token as if
   *  they were two independent markets. */
  capacityGroup?: string
  routes: Route[]
  restriction?: Restriction
  debt?: DebtLeg
  reserveDisclosure?: "monthly-attested" | "quarterly-unattested" | "none"
  pegBps?: number
  pegBpsStress?: number
  notes?: string[]
}

export type ObligationCategory =
  | "payroll"
  | "infra"
  | "grants"
  | "legal"
  | "incentives"
  | "partnership"
  | "brand"

export interface Obligation {
  id: string
  label: string
  category: ObligationCategory
  amountUsd: number
  /** Inclusive month range within the 12-month horizon, 0 = first month. */
  fromMonth: number
  toMonth: number
  /** Only pay in months where (month - fromMonth) % everyMonths === 0. */
  everyMonths: number
  commitment: "contracted" | "approved" | "discretionary"
  counterparty?: string
}

export interface Policy {
  minCoverageRatio: number
  /** Months of burn that must sit in assets reachable within `bufferDays`. */
  minBufferMonths: number
  bufferDays: number
  maxSingleAssetPct: number
  maxNativePct: number
  /** Per-slice price-impact ceiling. */
  maxSlippageBps: number
  /** Share of a venue's average daily volume the treasury may take per day. */
  maxAdvParticipationPct: number
  minHealthFactor: number
  /** Slices per day when working an order, following CoW's TWAP example. */
  twapSlicesPerDay: number
  allowOtc: boolean
  maxLowDisclosureStablePct: number
  dualApprovalAboveUsd: number
}

export type ActionKind =
  | "otc_block"
  | "raise_participation"
  | "trim_spend"
  | "defer_spend"
  | "switch_route"
  | "repay_debt"

export interface PlanAction {
  id: string
  kind: ActionKind
  label: string
  rationale: string
  /** Explicit cost of taking the action, in USD. Discounts, extra slippage,
   *  fees. Never hidden. */
  costUsd: number
  reversible: boolean
  policyNote?: string
  requiresConsentFrom?: string
  target?: string
  /** otc_block */
  notionalUsd?: number
  discountBps?: number
  settleDays?: number
  /** raise_participation */
  participationPct?: number
  windowMonths?: number
  /** trim_spend / defer_spend */
  obligationId?: string
  pctReduction?: number
  fromMonth?: number
  deferByMonths?: number
  /** repay_debt */
  repayUsd?: number
}

export interface Snapshot {
  id: "calm" | "stressed"
  label: string
  asOf: string
  note: string
}

export interface Org {
  id: string
  name: string
  kind: string
  safe: string
  signers: string
  horizonStart: string
  holdings: Holding[]
  obligations: Obligation[]
  policy: Policy
  actions: PlanAction[]
}

/* --------------------------------------------------------------- constants */

export const HORIZON_MONTHS = 12
export const TRADING_DAYS_PER_MONTH = 21
const DAYS_PER_MONTH = 30.44

export const BUCKETS: { id: BucketId; label: string; short: string; maxDays: number }[] = [
  { id: "t0", label: "Same day", short: "T+0", maxDays: 0 },
  { id: "t1_2", label: "1–2 days", short: "T+2", maxDays: 2 },
  { id: "t3_7", label: "3–7 days", short: "T+7", maxDays: 7 },
  { id: "t8_30", label: "8–30 days", short: "30d", maxDays: 30 },
  { id: "t31_90", label: "31–90 days", short: "90d", maxDays: 90 },
  { id: "locked", label: "Locked / >90 days", short: ">90d", maxDays: Infinity },
]

export function bucketForDays(days: number): BucketId {
  for (const b of BUCKETS) if (days <= b.maxDays) return b.id
  return "locked"
}

/* ----------------------------------------------------------- price / depth */

export function priceOf(h: Holding, snap: Snapshot["id"]): number {
  return snap === "stressed" ? h.markPriceStress : h.markPrice
}

export function markUsd(h: Holding, snap: Snapshot["id"]): number {
  return h.qty * priceOf(h, snap)
}

export function settleDaysOf(h: Holding, snap: Snapshot["id"]): number {
  return snap === "stressed" ? h.settleDaysStress : h.settleDays
}

export function depthOf(r: Route, snap: Snapshot["id"]): DepthBand[] {
  return snap === "stressed" ? r.depthStress : r.depth
}

/** Several holdings can quote the same venue — liquid, staked and pooled units
 *  of one token all trade on the same books. Counting a venue once per holding
 *  would multiply the market's real capacity, so routes are deduplicated by id
 *  before any depth or volume arithmetic. */
export function tradableRoutes(holdings: Holding[]): Route[] {
  const byId = new Map<string, Route>()
  for (const h of holdings) {
    for (const r of h.routes) {
      if (r.kind === "otc" || r.kind === "redemption") continue
      if (!byId.has(r.id)) byId.set(r.id, r)
    }
  }
  return [...byId.values()]
}

/** Merge several venues' ladders into one book by summing cumulative notional
 *  at each band. Venues are independent, so at a given price distance the
 *  treasury can take liquidity from all of them at once. */
export function mergeDepth(routes: Route[], snap: Snapshot["id"]): DepthBand[] {
  const bandSet = new Set<number>()
  for (const r of routes) for (const b of depthOf(r, snap)) bandSet.add(b.bps)
  const bps = [...bandSet].sort((a, b) => a - b)
  return bps.map((x) => ({
    bps: x,
    cumUsd: routes.reduce((sum, r) => sum + cumAt(depthOf(r, snap), x), 0),
  }))
}

function cumAt(bands: DepthBand[], bps: number): number {
  if (bands.length === 0) return 0
  let prev = { bps: 0, cumUsd: 0 }
  for (const b of bands) {
    if (bps <= b.bps) {
      const span = b.bps - prev.bps
      if (span <= 0) return b.cumUsd
      const t = (bps - prev.bps) / span
      return prev.cumUsd + t * (b.cumUsd - prev.cumUsd)
    }
    prev = b
  }
  // Past the observed book: square-root extrapolation (see impactForSize).
  const top = bands[bands.length - 1]
  return top.cumUsd * Math.pow(bps / top.bps, 2)
}

export interface ImpactResult {
  /** Volume-weighted average price concession across the whole order. */
  avgBps: number
  /** Concession on the last unit — what the policy cap is tested against. */
  marginalBps: number
  tier: Tier
  /** True when part of the order sits beyond the observed book. */
  extrapolated: boolean
}

/**
 * Walk a cumulative depth ladder to price an order of `usd`.
 *
 * Inside the observed book, each rung is filled at the average of its two
 * band edges. Beyond the deepest observed band the book is unknown, so the
 * marginal concession is extended with a square-root law — the standard
 * practitioner convention — and the result is tagged `modelled` so the
 * interface can say out loud that it is an assumption, not an observation.
 */
export function impactForSize(bands: DepthBand[], usd: number): ImpactResult {
  if (usd <= 0) return { avgBps: 0, marginalBps: 0, tier: "observed", extrapolated: false }
  if (bands.length === 0)
    return { avgBps: 0, marginalBps: 0, tier: "modelled", extrapolated: true }

  let remaining = usd
  let cost = 0
  let prev = { bps: 0, cumUsd: 0 }
  let marginal = 0

  for (const band of bands) {
    const rung = band.cumUsd - prev.cumUsd
    if (rung <= 0) {
      prev = band
      continue
    }
    const take = Math.min(remaining, rung)
    const t = take / rung
    cost += take * (prev.bps + (prev.bps + (band.bps - prev.bps) * t)) / 2
    remaining -= take
    if (remaining <= 1e-9) {
      marginal = prev.bps + (band.bps - prev.bps) * t
      return { avgBps: cost / usd, marginalBps: marginal, tier: "observed", extrapolated: false }
    }
    prev = band
  }

  // Tail beyond the observed book: marginal(q) = topBps * sqrt(q / topCum).
  const top = prev
  const k = top.bps / Math.sqrt(top.cumUsd)
  const tailCost = k * (2 / 3) * (Math.pow(usd, 1.5) - Math.pow(top.cumUsd, 1.5))
  cost += tailCost
  marginal = k * Math.sqrt(usd)
  return { avgBps: cost / usd, marginalBps: marginal, tier: "modelled", extrapolated: true }
}

/** Largest order whose marginal concession stays at or below `capBps`. */
export function sizeAtCap(bands: DepthBand[], capBps: number): number {
  return cumAt(bands, capBps)
}

/* ------------------------------------------------------------- collateral */

export interface CollateralView {
  healthFactor: number
  collateralUsd: number
  debtUsd: number
  withdrawableUsd: number
  pinnedUsd: number
}

/**
 * Aave publishes health factor as
 *   (collateral x weighted average liquidation threshold) / total borrowed,
 * with liquidation once it falls below 1. A treasury cannot spend collateral
 * down to that line, so the policy floor decides how much may leave.
 */
export function collateralView(h: Holding, snap: Snapshot["id"], minHf: number): CollateralView | null {
  if (!h.debt) return null
  const collateralUsd = markUsd(h, snap)
  const debtUsd = h.debt.amountUsd
  const lt = h.debt.liquidationThreshold
  const healthFactor = debtUsd > 0 ? (collateralUsd * lt) / debtUsd : Infinity
  const required = (debtUsd * minHf) / lt
  const withdrawableUsd = Math.max(0, collateralUsd - required)
  return {
    healthFactor,
    collateralUsd,
    debtUsd,
    withdrawableUsd,
    pinnedUsd: collateralUsd - withdrawableUsd,
  }
}

/* ------------------------------------------------------- sellable notional */

export interface SellableView {
  /** Mark value of the whole holding. */
  markUsd: number
  /** Mark value the treasury is free to sell in this horizon. */
  freeUsd: number
  /** Mark value held back by a lock, a lending position or an exclusion. */
  heldBackUsd: number
  heldBackReason?: string
  /** Month the held-back part becomes free, if it does. */
  freeFromMonth: number
  settleDays: number
  bucket: BucketId
}

export function sellableView(h: Holding, snap: Snapshot["id"], policy: Policy): SellableView {
  const mv = markUsd(h, snap)
  const settle = settleDaysOf(h, snap)
  const base: SellableView = {
    markUsd: mv,
    freeUsd: mv,
    heldBackUsd: 0,
    freeFromMonth: monthFromDays(settle),
    settleDays: settle,
    bucket: bucketForDays(settle),
  }

  if (h.restriction) {
    return {
      ...base,
      freeUsd: 0,
      heldBackUsd: mv,
      heldBackReason: h.restriction.kind,
      freeFromMonth: h.restriction.lapseMonth,
      bucket: "locked",
    }
  }

  const cv = collateralView(h, snap, policy.minHealthFactor)
  if (cv) {
    return {
      ...base,
      markUsd: cv.collateralUsd - cv.debtUsd,
      freeUsd: cv.withdrawableUsd,
      heldBackUsd: cv.pinnedUsd,
      heldBackReason: `Pinned by ${formatUsdShort(cv.debtUsd)} of ${h.debt?.symbol} debt at a ${policy.minHealthFactor.toFixed(2)} health-factor floor`,
    }
  }

  return base
}

function monthFromDays(days: number): number {
  return Math.floor(days / DAYS_PER_MONTH)
}

/* ------------------------------------------------------------- obligations */

export function obligationSchedule(
  obligations: Obligation[],
  actions: PlanAction[]
): { months: number[]; byId: Record<string, number[]> } {
  const months = new Array<number>(HORIZON_MONTHS).fill(0)
  const byId: Record<string, number[]> = {}

  for (const o of obligations) {
    const row = new Array<number>(HORIZON_MONTHS).fill(0)
    for (let m = o.fromMonth; m <= Math.min(o.toMonth, HORIZON_MONTHS - 1); m++) {
      if ((m - o.fromMonth) % o.everyMonths !== 0) continue
      row[m] += o.amountUsd
    }
    byId[o.id] = row
    for (let m = 0; m < HORIZON_MONTHS; m++) months[m] += row[m]
  }

  // Plan actions that change the spend side.
  for (const a of actions) {
    if (a.kind === "trim_spend" && a.obligationId && byId[a.obligationId]) {
      const row = byId[a.obligationId]
      const from = a.fromMonth ?? 0
      const pct = (a.pctReduction ?? 0) / 100
      for (let m = from; m < HORIZON_MONTHS; m++) {
        const cut = row[m] * pct
        row[m] -= cut
        months[m] -= cut
      }
    }
    if (a.kind === "defer_spend" && a.obligationId && byId[a.obligationId]) {
      const row = byId[a.obligationId]
      const by = a.deferByMonths ?? 0
      const moved = new Array<number>(HORIZON_MONTHS).fill(0)
      for (let m = 0; m < HORIZON_MONTHS; m++) {
        const to = m + by
        months[m] -= row[m]
        if (to < HORIZON_MONTHS) {
          moved[to] += row[m]
          months[to] += row[m]
        }
      }
      byId[a.obligationId] = moved
    }
  }

  return { months, byId }
}

/* --------------------------------------------------------------- capacity */

export interface CapacityView {
  /** Cash a group's market can absorb per day inside policy. */
  perDayUsd: number
  perMonthUsd: number
  /** Which rule binds: the participation cap or the slippage cap. */
  binding: "participation" | "slippage" | "none"
  participationUsd: number
  slippageUsd: number
  advUsd: number
  sliceUsd: number
  avgBpsAtSlice: number
  marginalBpsAtSlice: number
  feeBps: number
  participationPct: number
}

export function capacityFor(
  holdings: Holding[],
  snap: Snapshot["id"],
  policy: Policy,
  participationPctOverride?: number
): CapacityView {
  const routes = tradableRoutes(holdings)
  if (routes.length === 0) {
    return {
      perDayUsd: 0,
      perMonthUsd: 0,
      binding: "none",
      participationUsd: 0,
      slippageUsd: 0,
      advUsd: 0,
      sliceUsd: 0,
      avgBpsAtSlice: 0,
      marginalBpsAtSlice: 0,
      feeBps: 0,
      participationPct: participationPctOverride ?? policy.maxAdvParticipationPct,
    }
  }
  const pct = (participationPctOverride ?? policy.maxAdvParticipationPct) / 100
  const adv = routes.reduce((s, r) => s + r.advUsd, 0)
  const participationUsd = adv * pct

  const book = mergeDepth(routes, snap)
  const perSlice = sizeAtCap(book, policy.maxSlippageBps)
  const slippageUsd = perSlice * policy.twapSlicesPerDay

  const perDayUsd = Math.min(participationUsd, slippageUsd)
  const slice = perDayUsd / policy.twapSlicesPerDay
  const impact = impactForSize(book, slice)
  const feeBps =
    routes.reduce((s, r) => s + r.feeBps * r.advUsd, 0) / Math.max(adv, 1)

  return {
    perDayUsd,
    perMonthUsd: perDayUsd * TRADING_DAYS_PER_MONTH,
    binding: participationUsd <= slippageUsd ? "participation" : "slippage",
    participationUsd,
    slippageUsd,
    advUsd: adv,
    sliceUsd: slice,
    avgBpsAtSlice: impact.avgBps,
    marginalBpsAtSlice: impact.marginalBps,
    feeBps,
    participationPct: pct * 100,
  }
}

/**
 * Cash the treasury could raise inside `days` calendar days.
 *
 * This is the operating buffer, and it is deliberately not "everything that
 * settles quickly". A twelve-month selling programme credits cash every month;
 * only the slice of it that fits inside the window counts here.
 */
export function bufferWithin(
  org: Org,
  snap: Snapshot["id"],
  policy: Policy,
  days: number
): number {
  let total = 0
  const groups = new Map<string, Holding[]>()

  for (const h of org.holdings) {
    const view = sellableView(h, snap, policy)
    if (view.freeUsd <= 0) continue
    if (view.settleDays > days) continue
    if (!h.saleConstrained) {
      total += view.freeUsd * (1 - (h.routes[0]?.feeBps ?? 0) / 10_000)
      continue
    }
    const group = h.capacityGroup ?? h.id
    groups.set(group, [...(groups.get(group) ?? []), h])
  }

  const tradingDaysInWindow = Math.max(0, (days * TRADING_DAYS_PER_MONTH) / DAYS_PER_MONTH)
  for (const holdings of groups.values()) {
    const cap = capacityFor(holdings, snap, policy)
    const inventory = holdings.reduce(
      (s, h) => s + sellableView(h, snap, policy).freeUsd,
      0
    )
    const raisable = Math.min(inventory, cap.perDayUsd * tradingDaysInWindow)
    total += raisable * (1 - (cap.avgBpsAtSlice + cap.feeBps) / 10_000)
  }
  return total
}

/* ------------------------------------------------------- availability plan */

export interface SupplyLine {
  holdingId: string
  symbol: string
  label: string
  /** Realisable proceeds credited per month. */
  months: number[]
  totalUsd: number
  markUsd: number
  frictionUsd: number
  tier: Tier
  bucket: BucketId
  constrainedBy?: string
}

export interface Coverage {
  months: string[]
  obligations: number[]
  cumObligations: number[]
  available: number[]
  cumAvailable: number[]
  cushion: number[]
  ratio: number[]
  minRatio: number
  minRatioMonth: number
  firstBreachMonth: number | null
  worstShortfallUsd: number
  runwayMonths: number
  totalObligations: number
  totalAvailable: number
  supply: SupplyLine[]
  bufferMonths: number
  bufferUsd: number
  burnPerMonth: number
}

interface Pool {
  group: string
  holdings: Holding[]
  /** Inventory as [readyMonth, markUsd] queued oldest-ready first. */
  queue: { readyMonth: number; usd: number; holdingId: string; symbol: string }[]
}

export function computeCoverage(
  org: Org,
  snap: Snapshot["id"],
  policy: Policy,
  actions: PlanAction[]
): Coverage {
  const { months: oblig } = obligationSchedule(org.obligations, actions)
  const monthLabels = monthLabelsFrom(org.horizonStart, HORIZON_MONTHS)

  const supply: SupplyLine[] = []

  const repaid = actions
    .filter((a) => a.kind === "repay_debt")
    .reduce((s, a) => s + (a.repayUsd ?? 0), 0)

  // 1. Unconstrained holdings: par redemption or a book so deep the treasury's
  //    size does not register. Credited in full once settlement clears.
  const pools = new Map<string, Pool>()

  for (const h of org.holdings) {
    const view = sellableView(adjustForRepay(h, repaid), snap, policy)
    const routeSwitch = actions.find(
      (a) => a.kind === "switch_route" && a.target === h.id
    )
    const readyMonth = routeSwitch
      ? monthFromDays(routeSwitch.settleDays ?? view.settleDays)
      : view.freeFromMonth

    if (view.freeUsd <= 0 && view.heldBackUsd > 0 && h.restriction && h.saleConstrained) {
      // Locked stock still joins its market pool, but only once it unlocks —
      // and unlocking adds inventory, never capacity.
      const group = h.capacityGroup ?? h.id
      pushPool(pools, group, h, { readyMonth: h.restriction.lapseMonth, usd: view.heldBackUsd })
      continue
    }

    if (!h.saleConstrained) {
      const fee = h.routes[0]?.feeBps ?? 0
      const proceeds = view.freeUsd * (1 - fee / 10_000)
      const row = new Array<number>(HORIZON_MONTHS).fill(0)
      if (readyMonth < HORIZON_MONTHS && proceeds > 0) row[readyMonth] += proceeds
      if (proceeds > 0) {
        supply.push({
          holdingId: h.id,
          symbol: h.symbol,
          label: h.name,
          months: row,
          totalUsd: proceeds,
          markUsd: view.freeUsd,
          frictionUsd: view.freeUsd - proceeds,
          tier: "derived",
          bucket: bucketForDays(routeSwitch?.settleDays ?? view.settleDays),
          constrainedBy: h.routes[0]?.kind === "redemption" ? "Redemption at par" : undefined,
        })
      }
      continue
    }

    const group = h.capacityGroup ?? h.id
    pushPool(pools, group, h, { readyMonth, usd: view.freeUsd })
  }

  // 2. Constrained pools: draw down at the policy-limited rate per month.
  for (const pool of pools.values()) {
    const bump = actions.find(
      (a) => a.kind === "raise_participation" && a.target === pool.group
    )
    const baseCap = capacityFor(pool.holdings, snap, policy)
    const bumpCap = bump
      ? capacityFor(pool.holdings, snap, policy, bump.participationPct)
      : baseCap

    const book = mergeDepth(tradableRoutes(pool.holdings), snap)
    const queue = [...pool.queue].sort((a, b) => a.readyMonth - b.readyMonth)
    const rows = new Map<string, number[]>()
    const marks = new Map<string, number>()
    let tier: Tier = "derived"

    for (let m = 0; m < HORIZON_MONTHS; m++) {
      const cap = bump && m < (bump.windowMonths ?? HORIZON_MONTHS) ? bumpCap : baseCap
      let budget = cap.perMonthUsd
      if (budget <= 0) continue
      const impact = impactForSize(book, cap.perDayUsd / policy.twapSlicesPerDay)
      if (impact.tier === "modelled") tier = "modelled"
      const frictionBps = impact.avgBps + cap.feeBps

      for (const item of queue) {
        if (budget <= 0) break
        if (item.readyMonth > m) continue
        if (item.usd <= 0) continue
        const take = Math.min(item.usd, budget)
        item.usd -= take
        budget -= take
        const proceeds = take * (1 - frictionBps / 10_000)
        const row = rows.get(item.holdingId) ?? new Array<number>(HORIZON_MONTHS).fill(0)
        row[m] += proceeds
        rows.set(item.holdingId, row)
        marks.set(item.holdingId, (marks.get(item.holdingId) ?? 0) + take)
      }
    }

    for (const [holdingId, row] of rows) {
      const h = pool.holdings.find((x) => x.id === holdingId)
      if (!h) continue
      const mark = marks.get(holdingId) ?? 0
      const total = row.reduce((a, b) => a + b, 0)
      supply.push({
        holdingId,
        symbol: h.symbol,
        label: h.name,
        months: row,
        totalUsd: total,
        markUsd: mark,
        frictionUsd: mark - total,
        tier,
        bucket: bucketForDays(settleDaysOf(h, snap)),
        constrainedBy:
          baseCap.binding === "participation"
            ? `${baseCap.participationPct.toFixed(0)}% of ${formatUsdShort(baseCap.advUsd)} daily volume`
            : `${policy.maxSlippageBps} bps slippage cap`,
      })
    }
  }

  // 3. Repaying debt frees collateral above the health-factor floor, but the
  //    repayment itself is cash out of the door this month. Both sides count.
  for (const a of actions) {
    if (a.kind !== "repay_debt" || !a.repayUsd) continue
    const row = new Array<number>(HORIZON_MONTHS).fill(0)
    row[0] = -a.repayUsd
    supply.push({
      holdingId: a.target ?? a.id,
      symbol: "Repay",
      label: a.label,
      months: row,
      totalUsd: -a.repayUsd,
      markUsd: -a.repayUsd,
      frictionUsd: 0,
      tier: "input",
      bucket: "t0",
      constrainedBy: "Cash out now to release collateral",
    })
  }

  // 4. Off-market blocks bypass the book entirely.
  for (const a of actions) {
    if (a.kind !== "otc_block" || !a.notionalUsd) continue
    const readyMonth = monthFromDays(a.settleDays ?? 7)
    const proceeds = a.notionalUsd * (1 - (a.discountBps ?? 0) / 10_000)
    const row = new Array<number>(HORIZON_MONTHS).fill(0)
    if (readyMonth < HORIZON_MONTHS) row[readyMonth] += proceeds
    supply.push({
      holdingId: a.target ?? a.id,
      symbol: "OTC",
      label: a.label,
      months: row,
      totalUsd: proceeds,
      markUsd: a.notionalUsd,
      frictionUsd: a.notionalUsd - proceeds,
      tier: "input",
      bucket: bucketForDays(a.settleDays ?? 7),
      constrainedBy: "Negotiated block, off-book",
    })
  }

  // Every credit lives on exactly one supply line, so the monthly totals are
  // just the column sums. One source of truth, nothing double-counted.
  const available = new Array<number>(HORIZON_MONTHS).fill(0)
  for (const line of supply) {
    for (let m = 0; m < HORIZON_MONTHS; m++) available[m] += line.months[m]
  }

  const cumAvailable: number[] = []
  const cumObligations: number[] = []
  const cushion: number[] = []
  const ratio: number[] = []
  let ca = 0
  let co = 0
  for (let m = 0; m < HORIZON_MONTHS; m++) {
    ca += available[m]
    co += oblig[m]
    cumAvailable.push(ca)
    cumObligations.push(co)
    cushion.push(ca - co)
    ratio.push(co > 0 ? ca / co : Infinity)
  }

  let minRatio = Infinity
  let minRatioMonth = 0
  let firstBreachMonth: number | null = null
  let worstShortfallUsd = 0
  for (let m = 0; m < HORIZON_MONTHS; m++) {
    if (ratio[m] < minRatio) {
      minRatio = ratio[m]
      minRatioMonth = m
    }
    if (cushion[m] < 0) {
      if (firstBreachMonth === null) firstBreachMonth = m
      worstShortfallUsd = Math.max(worstShortfallUsd, -cushion[m])
    }
  }
  const runwayMonths = firstBreachMonth === null ? HORIZON_MONTHS : firstBreachMonth

  const burnPerMonth = co / HORIZON_MONTHS
  const bufferUsd = bufferWithin(org, snap, policy, policy.bufferDays)

  return {
    months: monthLabels,
    obligations: oblig,
    cumObligations,
    available,
    cumAvailable,
    cushion,
    ratio,
    minRatio,
    minRatioMonth,
    firstBreachMonth,
    worstShortfallUsd,
    runwayMonths,
    totalObligations: co,
    totalAvailable: ca,
    supply: supply.sort((a, b) => b.totalUsd - a.totalUsd),
    bufferMonths: burnPerMonth > 0 ? bufferUsd / burnPerMonth : 0,
    bufferUsd,
    burnPerMonth,
  }
}

function adjustForRepay(h: Holding, repaidUsd: number): Holding {
  if (!h.debt || repaidUsd <= 0) return h
  return {
    ...h,
    debt: { ...h.debt, amountUsd: Math.max(0, h.debt.amountUsd - repaidUsd) },
  }
}

function pushPool(
  pools: Map<string, Pool>,
  group: string,
  h: Holding,
  item: { readyMonth: number; usd: number }
) {
  const pool = pools.get(group) ?? { group, holdings: [], queue: [] }
  if (!pool.holdings.some((x) => x.id === h.id)) pool.holdings.push(h)
  if (item.usd > 0)
    pool.queue.push({ readyMonth: item.readyMonth, usd: item.usd, holdingId: h.id, symbol: h.symbol })
  pools.set(group, pool)
}

/* ------------------------------------------------------------ ladder view */

export interface LadderRow {
  bucket: BucketId
  label: string
  short: string
  markUsd: number
  realisableUsd: number
  holdings: { symbol: string; markUsd: number; realisableUsd: number; note?: string }[]
}

export function timeToCashLadder(
  org: Org,
  snap: Snapshot["id"],
  policy: Policy,
  coverage: Coverage
): LadderRow[] {
  const rows: LadderRow[] = BUCKETS.map((b) => ({
    bucket: b.id,
    label: b.label,
    short: b.short,
    markUsd: 0,
    realisableUsd: 0,
    holdings: [],
  }))
  const byBucket = new Map<BucketId, LadderRow>(rows.map((r) => [r.bucket, r]))

  for (const h of org.holdings) {
    const view = sellableView(h, snap, policy)
    const realisable = coverage.supply
      .filter((l) => l.holdingId === h.id)
      .reduce((s, l) => s + l.totalUsd, 0)

    if (view.heldBackUsd > 0) {
      const locked = byBucket.get(h.restriction ? "locked" : view.bucket)
      if (locked) {
        locked.markUsd += view.heldBackUsd
        locked.holdings.push({
          symbol: h.symbol,
          markUsd: view.heldBackUsd,
          realisableUsd: 0,
          note: view.heldBackReason,
        })
      }
    }
    if (view.freeUsd > 0) {
      const row = byBucket.get(view.bucket)
      if (row) {
        row.markUsd += view.freeUsd
        row.realisableUsd += realisable
        row.holdings.push({ symbol: h.symbol, markUsd: view.freeUsd, realisableUsd: realisable })
      }
    }
  }
  return rows
}

/* ------------------------------------------------------------ concentration */

export interface ExposureRow {
  key: string
  label: string
  markUsd: number
  pct: number
  limitPct?: number
  breach: boolean
}

export function concentration(org: Org, snap: Snapshot["id"], policy: Policy): ExposureRow[] {
  const total = org.holdings.reduce((s, h) => s + markUsd(h, snap), 0)
  if (total <= 0) return []

  const byAsset = new Map<string, number>()
  for (const h of org.holdings) {
    const key = h.assetClass === "native" || h.assetClass === "staked" || h.assetClass === "lp" ? "native" : h.symbol
    byAsset.set(key, (byAsset.get(key) ?? 0) + markUsd(h, snap))
  }

  const rows: ExposureRow[] = []
  for (const [key, usd] of byAsset) {
    const pct = (usd / total) * 100
    const limit = key === "native" ? policy.maxNativePct : policy.maxSingleAssetPct
    rows.push({
      key,
      label: key === "native" ? "Native token family" : key,
      markUsd: usd,
      pct,
      limitPct: limit,
      breach: pct > limit,
    })
  }
  return rows.sort((a, b) => b.markUsd - a.markUsd)
}

/** Herfindahl index on mark value, 0–10,000. Above 2,500 reads as concentrated. */
export function herfindahl(org: Org, snap: Snapshot["id"]): number {
  const total = org.holdings.reduce((s, h) => s + markUsd(h, snap), 0)
  if (total <= 0) return 0
  const shares = new Map<string, number>()
  for (const h of org.holdings) {
    const key = h.assetClass === "native" || h.assetClass === "staked" || h.assetClass === "lp" ? "native" : h.symbol
    shares.set(key, (shares.get(key) ?? 0) + markUsd(h, snap) / total)
  }
  return [...shares.values()].reduce((s, x) => s + x * x, 0) * 10_000
}

/* ----------------------------------------------------------- policy checks */

export type Verdict = "pass" | "warn" | "fail"

export interface PolicyCheck {
  id: string
  rule: string
  detail: string
  verdict: Verdict
  actual: string
  limit: string
  /** Can this rule be enforced on-chain, or is it advisory only? */
  enforcement: "safe-guard" | "safe-allowance" | "advisory"
}

export function runPolicy(
  org: Org,
  snap: Snapshot["id"],
  policy: Policy,
  coverage: Coverage,
  actions: PlanAction[]
): PolicyCheck[] {
  const checks: PolicyCheck[] = []
  const total = org.holdings.reduce((s, h) => s + markUsd(h, snap), 0)

  checks.push({
    id: "coverage",
    rule: "Realisable coverage never falls below the floor",
    detail:
      "Cumulative realisable cash divided by cumulative committed spend, at its tightest month in the 12-month horizon.",
    verdict:
      coverage.minRatio >= policy.minCoverageRatio
        ? "pass"
        : coverage.minRatio >= policy.minCoverageRatio * 0.95
          ? "warn"
          : "fail",
    actual: `${coverage.minRatio.toFixed(2)}x in ${coverage.months[coverage.minRatioMonth] ?? "—"}`,
    limit: `${policy.minCoverageRatio.toFixed(2)}x`,
    enforcement: "advisory",
  })

  checks.push({
    id: "buffer",
    rule: `Operating buffer reachable within ${policy.bufferDays} days`,
    detail:
      "Months of average committed spend covered by assets that settle inside the buffer window.",
    verdict:
      coverage.bufferMonths >= policy.minBufferMonths
        ? "pass"
        : coverage.bufferMonths >= policy.minBufferMonths * 0.8
          ? "warn"
          : "fail",
    actual: `${coverage.bufferMonths.toFixed(1)} months`,
    limit: `${policy.minBufferMonths.toFixed(1)} months`,
    enforcement: "advisory",
  })

  for (const row of concentration(org, snap, policy)) {
    if (row.key !== "native" && row.pct < policy.maxSingleAssetPct * 0.6) continue
    checks.push({
      id: `conc-${row.key}`,
      rule: `${row.label} share of treasury`,
      detail: "Share of total mark value held in a single asset or asset family.",
      verdict: row.breach ? "fail" : row.pct > (row.limitPct ?? 100) * 0.9 ? "warn" : "pass",
      actual: `${row.pct.toFixed(1)}%`,
      limit: `${(row.limitPct ?? 100).toFixed(0)}%`,
      enforcement: "advisory",
    })
  }

  for (const h of org.holdings) {
    const cv = collateralView(h, snap, policy.minHealthFactor)
    if (!cv) continue
    checks.push({
      id: `hf-${h.id}`,
      rule: `${h.debt?.protocol} health factor floor`,
      detail: "Collateral x liquidation threshold, divided by debt. Liquidation begins below 1.00.",
      verdict:
        cv.healthFactor >= policy.minHealthFactor
          ? "pass"
          : cv.healthFactor >= 1.2
            ? "warn"
            : "fail",
      actual: cv.healthFactor === Infinity ? "no debt" : `${cv.healthFactor.toFixed(2)}`,
      limit: `${policy.minHealthFactor.toFixed(2)}`,
      enforcement: "safe-guard",
    })
  }

  const lowDisclosure = org.holdings
    .filter((h) => h.assetClass === "stable" && h.reserveDisclosure !== "monthly-attested")
    .reduce((s, h) => s + markUsd(h, snap), 0)
  if (total > 0) {
    const pct = (lowDisclosure / total) * 100
    checks.push({
      id: "stable-disclosure",
      rule: "Stablecoins without a monthly attested reserve report",
      detail:
        "Both the US GENIUS Act and MiCA require permitted issuers to publish reserve composition on a monthly cycle. Holdings from issuers that do not are capped.",
      verdict: pct > policy.maxLowDisclosureStablePct ? "fail" : pct > policy.maxLowDisclosureStablePct * 0.7 ? "warn" : "pass",
      actual: `${pct.toFixed(1)}%`,
      limit: `${policy.maxLowDisclosureStablePct.toFixed(0)}%`,
      enforcement: "advisory",
    })
  }

  const otc = actions.filter((a) => a.kind === "otc_block")
  if (otc.length > 0) {
    checks.push({
      id: "otc-allowed",
      rule: "Off-market block sales permitted",
      detail: "Blocks trade away from the public book, so the price is negotiated, not observed.",
      verdict: policy.allowOtc ? "warn" : "fail",
      actual: `${otc.length} block${otc.length === 1 ? "" : "s"} in plan`,
      limit: policy.allowOtc ? "allowed with disclosure" : "not permitted",
      enforcement: "safe-guard",
    })
  }

  const bumps = actions.filter((a) => a.kind === "raise_participation")
  for (const b of bumps) {
    checks.push({
      id: `part-${b.id}`,
      rule: "Daily volume participation cap",
      detail:
        "Share of a venue's average daily volume the treasury may take per day. Raising it trades slippage for speed.",
      verdict: (b.participationPct ?? 0) > policy.maxAdvParticipationPct * 2 ? "fail" : "warn",
      actual: `${b.participationPct}% for ${b.windowMonths} months`,
      limit: `${policy.maxAdvParticipationPct}% standing`,
      enforcement: "safe-allowance",
    })
  }

  const planValue = actions.reduce((s, a) => s + (a.notionalUsd ?? 0), 0)
  if (planValue > 0) {
    checks.push({
      id: "dual-approval",
      rule: "Second approver required above threshold",
      detail: "Plans above the threshold need a second named approver before a signing packet is produced.",
      verdict: planValue > policy.dualApprovalAboveUsd ? "warn" : "pass",
      actual: formatUsdShort(planValue),
      limit: formatUsdShort(policy.dualApprovalAboveUsd),
      enforcement: "safe-guard",
    })
  }

  return checks
}

export function worstVerdict(checks: PolicyCheck[]): Verdict {
  if (checks.some((c) => c.verdict === "fail")) return "fail"
  if (checks.some((c) => c.verdict === "warn")) return "warn"
  return "pass"
}

/* ------------------------------------------------------------ plan costing */

export interface PlanSummary {
  actions: PlanAction[]
  costUsd: number
  gapClosedUsd: number
  before: Coverage
  after: Coverage
  costPerDollar: number
}

export function summarisePlan(
  org: Org,
  snap: Snapshot["id"],
  policy: Policy,
  selected: PlanAction[]
): PlanSummary {
  const before = computeCoverage(org, snap, policy, [])
  const after = computeCoverage(org, snap, policy, selected)
  const costUsd = selected.reduce((s, a) => s + a.costUsd, 0)
  const gapClosedUsd = Math.max(0, before.worstShortfallUsd - after.worstShortfallUsd)
  return {
    actions: selected,
    costUsd,
    gapClosedUsd,
    before,
    after,
    costPerDollar: gapClosedUsd > 0 ? costUsd / gapClosedUsd : 0,
  }
}

/**
 * Cheapest-first search for a set of actions that clears the shortfall.
 * Greedy: at each step take the action with the lowest cost per dollar of
 * shortfall removed, and stop as soon as coverage clears its floor.
 */
export function suggestPlan(
  org: Org,
  snap: Snapshot["id"],
  policy: Policy,
  catalogue: PlanAction[]
): PlanAction[] {
  const chosen: PlanAction[] = []
  let current = computeCoverage(org, snap, policy, chosen)

  for (let step = 0; step < catalogue.length; step++) {
    if (current.worstShortfallUsd <= 0 && current.minRatio >= policy.minCoverageRatio) break

    let best: { action: PlanAction; score: number; cov: Coverage } | null = null
    for (const a of catalogue) {
      if (chosen.some((c) => c.id === a.id)) continue
      const cov = computeCoverage(org, snap, policy, [...chosen, a])
      const gain =
        current.worstShortfallUsd - cov.worstShortfallUsd + (cov.minRatio - current.minRatio) * 1_000_000
      if (gain <= 1) continue
      const score = (a.costUsd + 1) / gain
      if (!best || score < best.score) best = { action: a, score, cov }
    }
    if (!best) break
    chosen.push(best.action)
    current = best.cov
  }
  // Present the plan in the order the playbook is authored, not the order the
  // search happened to find it. Cheapest-first is how it was chosen; readable
  // is how it should be read.
  return catalogue.filter((a) => chosen.some((c) => c.id === a.id))
}

/** When this holding's price was actually struck, given the snapshot it is
 *  being read in. */
export function priceAsOfFor(h: Holding, snapshotAsOf: string): string {
  const lag = h.priceLagMins ?? 0
  if (lag <= 0) return snapshotAsOf
  return new Date(Date.parse(snapshotAsOf) - lag * 60_000).toISOString()
}

/* ------------------------------------------------------------- provenance */

export interface FreshnessResult {
  ageMins: number
  stale: boolean
  label: string
}

/**
 * Chainlink's guidance for consuming a price feed, applied to a dashboard:
 * check how old the answer is against how often it is meant to refresh, and
 * change behaviour instead of showing a confident stale number.
 */
export function freshness(asOf: string, nowIso: string, heartbeatMins: number): FreshnessResult {
  const ageMins = Math.max(0, (Date.parse(nowIso) - Date.parse(asOf)) / 60_000)
  const stale = ageMins > heartbeatMins
  return {
    ageMins,
    stale,
    label: ageMins < 1 ? "just now" : ageMins < 60 ? `${Math.round(ageMins)} min ago` : `${(ageMins / 60).toFixed(1)} h ago`,
  }
}

/* ---------------------------------------------------------------- helpers */

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

export function monthLabelsFrom(startIso: string, count: number): string[] {
  const d = new Date(startIso)
  const out: string[] = []
  let y = d.getUTCFullYear()
  let m = d.getUTCMonth()
  for (let i = 0; i < count; i++) {
    out.push(`${MONTH_NAMES[m]} ${String(y).slice(2)}`)
    m += 1
    if (m > 11) {
      m = 0
      y += 1
    }
  }
  return out
}

export function formatUsdShort(usd: number): string {
  const abs = Math.abs(usd)
  const sign = usd < 0 ? "-" : ""
  if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(2)}bn`
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(abs >= 10_000_000 ? 1 : 2)}m`
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(0)}k`
  return `${sign}$${abs.toFixed(0)}`
}
