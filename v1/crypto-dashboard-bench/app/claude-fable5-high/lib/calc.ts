import { ASSET_BY_ID } from "./data"
import { fmtMonths, fmtPct, fmtUsd } from "./format"
import type {
  Asset,
  AssetClass,
  LiquidityTier,
  Move,
  Org,
  PolicyConfig,
  PolicyResult,
  Position,
  Scenario,
  Snapshot,
  StressCase,
} from "./types"

/** Price of an asset once the active scenario's shocks are applied. */
export function scenarioPrice(asset: Asset, s: Scenario): number {
  if (asset.cls === "stable") {
    if (asset.id === "usdt" && s.usdtDepeg) return 0.985
    return asset.basePrice
  }
  if (asset.cls === "own") return asset.basePrice * (1 - s.ownDrawdownPct / 100)
  return asset.basePrice * (1 - s.majorsDrawdownPct / 100)
}

/** 24h change to display: seeded base change combined with today's scenario shock. */
export function scenarioChange24h(asset: Asset, s: Scenario): number {
  const yesterday = asset.basePrice / (1 + asset.change24hPct / 100)
  return (scenarioPrice(asset, s) / yesterday - 1) * 100
}

/** Slippage in basis points for selling `usd` of an asset, by liquidity tier. */
export function slippageBps(tier: LiquidityTier, usd: number): number {
  const m = usd / 1_000_000
  if (tier === "deep") return 2 + m * 6
  if (tier === "moderate") return 8 + m * 25
  return 60 + m * 220
}

export function slippageCostUsd(tier: LiquidityTier, usd: number): number {
  return (usd * slippageBps(tier, usd)) / 10_000
}

export const LIQUIDITY_LABEL: Record<LiquidityTier, string> = {
  deep: "Deep",
  moderate: "Moderate",
  thin: "Thin",
}

/**
 * Apply proposal moves to a position set (for previews).
 * A move sells `usd` of one asset and buys another with the proceeds minus
 * slippage. Sales draw from the account holding the most of that asset, and
 * the bought asset lands in the same account.
 */
export function applyMoves(positions: Position[], moves: Move[], s: Scenario): Position[] {
  const next = positions.map((p) => ({ ...p }))
  for (const move of moves) {
    const from = ASSET_BY_ID[move.fromAssetId]
    const to = ASSET_BY_ID[move.toAssetId]
    if (!from || !to || move.usd <= 0 || from.id === to.id) continue
    const fromPrice = scenarioPrice(from, s)
    const toPrice = scenarioPrice(to, s)
    if (fromPrice <= 0 || toPrice <= 0) continue

    let usdRemaining = move.usd
    const holders = next
      .filter((p) => p.assetId === from.id && p.qty > 0)
      .sort((a, b) => b.qty - a.qty)
    for (const holder of holders) {
      if (usdRemaining <= 0) break
      const availableUsd = holder.qty * fromPrice
      const takeUsd = Math.min(availableUsd, usdRemaining)
      usdRemaining -= takeUsd
      holder.qty -= takeUsd / fromPrice
      const proceeds = takeUsd - slippageCostUsd(from.liquidity, takeUsd)
      const existing = next.find(
        (p) => p.accountId === holder.accountId && p.assetId === to.id
      )
      const boughtQty = proceeds / toPrice
      if (existing) existing.qty += boughtQty
      else next.push({ accountId: holder.accountId, assetId: to.id, qty: boughtQty })
    }
  }
  return next.filter((p) => p.qty > 1e-9)
}

/** How much of a move is actually fillable given current holdings. */
export function sellableUsd(positions: Position[], assetId: string, s: Scenario): number {
  const asset = ASSET_BY_ID[assetId]
  if (!asset) return 0
  const price = scenarioPrice(asset, s)
  return positions
    .filter((p) => p.assetId === assetId)
    .reduce((sum, p) => sum + p.qty * price, 0)
}

function statusFor(
  breached: boolean,
  headroomFraction: number
): "pass" | "warn" | "fail" {
  if (breached) return "fail"
  return headroomFraction < 0.1 ? "warn" : "pass"
}

/** Full derived state for an org under a scenario and policy, with optional preview moves. */
export function buildSnapshot(
  org: Org,
  scenario: Scenario,
  policy: PolicyConfig,
  previewMoves?: Move[]
): Snapshot {
  const positions = previewMoves?.length
    ? applyMoves(org.positions, previewMoves, scenario)
    : org.positions

  const rows = positions
    .map((position) => {
      const asset = ASSET_BY_ID[position.assetId]
      const account = org.accounts.find((a) => a.id === position.accountId)
      if (!asset || !account) return null
      const price = scenarioPrice(asset, scenario)
      return {
        position,
        asset,
        account,
        price,
        change24hPct: scenarioChange24h(asset, scenario),
        valueUsd: position.qty * price,
        shareOfTreasuryPct: 0,
      }
    })
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .sort((a, b) => b.valueUsd - a.valueUsd)

  const totalUsd = rows.reduce((s, r) => s + r.valueUsd, 0)
  for (const r of rows) r.shareOfTreasuryPct = totalUsd > 0 ? (r.valueUsd / totalUsd) * 100 : 0

  const byClass: Record<AssetClass, number> = { stable: 0, major: 0, staked: 0, own: 0 }
  for (const r of rows) byClass[r.asset.cls] += r.valueUsd

  const stablesUsd = byClass.stable
  const volatileSpendableUsd = byClass.major + byClass.staked
  // The org's own token is excluded from spendable value on purpose: it is
  // thinly traded and selling it is a governance decision, not a cash decision.
  const spendableUsd = stablesUsd + volatileSpendableUsd

  const burnMonthlyUsd = org.burnMonthlyUsd * scenario.burnMultiplier
  const runwayMonths = burnMonthlyUsd > 0 ? spendableUsd / burnMonthlyUsd : Infinity
  const stableFloorMonths = burnMonthlyUsd > 0 ? stablesUsd / burnMonthlyUsd : Infinity

  const stressCases: StressCase[] = [0.3, 0.6].map((extraDrawdown) => ({
    label: `−${extraDrawdown * 100}%`,
    extraDrawdown,
    runwayMonths:
      burnMonthlyUsd > 0
        ? (stablesUsd + volatileSpendableUsd * (1 - extraDrawdown)) / burnMonthlyUsd
        : Infinity,
  }))

  const issuerTotals = new Map<string, number>()
  for (const r of rows) {
    if (r.asset.cls === "stable" && r.asset.issuer) {
      issuerTotals.set(r.asset.issuer, (issuerTotals.get(r.asset.issuer) ?? 0) + r.valueUsd)
    }
  }
  const issuerShares = [...issuerTotals.entries()]
    .map(([issuer, usd]) => ({
      issuer,
      usd,
      pct: stablesUsd > 0 ? (usd / stablesUsd) * 100 : 0,
    }))
    .sort((a, b) => b.pct - a.pct)

  const venueShares = org.accounts
    .filter((a) => a.kind === "exchange")
    .map((account) => {
      const usd = rows
        .filter((r) => r.account.id === account.id)
        .reduce((s, r) => s + r.valueUsd, 0)
      return { account, usd, pct: totalUsd > 0 ? (usd / totalUsd) * 100 : 0 }
    })

  const policyResults: PolicyResult[] = []
  const hasHoldings = totalUsd > 0 && burnMonthlyUsd > 0

  // 1. Stable floor (≥ N months of burn in stablecoins)
  {
    const measured = hasHoldings ? stableFloorMonths : 0
    const limit = policy.stableFloorMonths
    const breached = hasHoldings && measured < limit
    const headroom = limit > 0 ? (measured - limit) / limit : 1
    policyResults.push({
      id: "stable-floor",
      name: "Stable floor",
      status: hasHoldings ? statusFor(breached, headroom) : "warn",
      detail: hasHoldings
        ? `Stablecoins cover ${fmtMonths(measured)} of burn (policy: at least ${limit} mo).`
        : "No holdings or burn set yet — the floor can't be checked.",
      measured,
      limit,
      unit: "months",
    })
  }

  // 2. Issuer cap (≤ X% of stablecoins with any single issuer)
  {
    const top = issuerShares[0]
    const measured = top?.pct ?? 0
    const limit = policy.issuerCapPct
    const breached = measured > limit
    const headroom = limit > 0 ? (limit - measured) / limit : 1
    policyResults.push({
      id: "issuer-cap",
      name: "Issuer cap",
      status: top ? statusFor(breached, headroom) : "pass",
      detail: top
        ? `${top.issuer} backs ${fmtPct(measured)} of stablecoins (limit ${limit}%).`
        : "No stablecoin holdings to check.",
      measured,
      limit,
      unit: "%",
    })
  }

  // 3. Volatile cap (≤ Y% of treasury in majors + staked)
  {
    const measured = totalUsd > 0 ? (volatileSpendableUsd / totalUsd) * 100 : 0
    const limit = policy.volatileCapPct
    const breached = measured > limit
    const headroom = limit > 0 ? (limit - measured) / limit : 1
    policyResults.push({
      id: "volatile-cap",
      name: "Volatile cap",
      status: totalUsd > 0 ? statusFor(breached, headroom) : "pass",
      detail: `Volatile assets (ETH, stETH) are ${fmtPct(measured)} of the treasury (limit ${limit}%).`,
      measured,
      limit,
      unit: "%",
    })
  }

  // 4. Own-token cap (≤ share of treasury in the org's own token)
  {
    const measured = totalUsd > 0 ? (byClass.own / totalUsd) * 100 : 0
    const limit = policy.ownTokenCapPct
    const breached = measured > limit
    const headroom = limit > 0 ? (limit - measured) / limit : 1
    policyResults.push({
      id: "own-cap",
      name: "Own-token cap",
      status: totalUsd > 0 ? statusFor(breached, headroom) : "pass",
      detail: `The org's own token is ${fmtPct(measured)} of the treasury (limit ${limit}%).`,
      measured,
      limit,
      unit: "%",
    })
  }

  // 5. Venue cap (≤ Z% of treasury on any single exchange)
  {
    const top = venueShares.sort((a, b) => b.pct - a.pct)[0]
    const measured = top?.pct ?? 0
    const limit = policy.venueCapPct
    const breached = measured > limit
    const headroom = limit > 0 ? (limit - measured) / limit : 1
    policyResults.push({
      id: "venue-cap",
      name: "Venue cap",
      status: top ? statusFor(breached, headroom) : "pass",
      detail: top
        ? `${top.account.name} holds ${fmtPct(measured)} of the treasury (${fmtUsd(top.usd)}; limit ${limit}%).`
        : "No exchange accounts to check.",
      measured,
      limit,
      unit: "%",
    })
  }

  return {
    rows,
    totalUsd,
    byClass,
    stablesUsd,
    spendableUsd,
    burnMonthlyUsd,
    runwayMonths,
    stressCases,
    stableFloorMonths,
    issuerShares,
    venueShares,
    policyResults,
  }
}
