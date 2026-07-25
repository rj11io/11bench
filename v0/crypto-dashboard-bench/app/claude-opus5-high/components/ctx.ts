"use client"

/** Everything the views need, computed once per render from the store. */

import type {
  Coverage,
  ExposureRow,
  Holding,
  LadderRow,
  Org,
  PlanAction,
  PlanSummary,
  Policy,
  PolicyCheck,
  Snapshot,
  Verdict,
} from "../lib/engine"
import {
  computeCoverage,
  concentration,
  freshness,
  herfindahl,
  markUsd,
  priceAsOfFor,
  runPolicy,
  summarisePlan,
  timeToCashLadder,
  worstVerdict,
} from "../lib/engine"
import { SNAPSHOTS, applyScenario, nowFor, scenarioById } from "../lib/seed"
import type { AppState, ViewId } from "../lib/store"
import { orgFor, policyFor, selectedActionsFor } from "../lib/store"

export interface SourceHealth {
  key: string
  label: string
  scope: string
  asOf: string
  refreshMins: number
  ageMins: number
  stale: boolean
}

export interface Ctx {
  state: AppState
  view: ViewId
  org: Org
  policy: Policy
  snapshot: Snapshot
  nowIso: string
  markTotal: number
  coverage: Coverage
  ladder: LadderRow[]
  checks: PolicyCheck[]
  verdict: Verdict
  exposure: ExposureRow[]
  hhi: number
  catalogue: PlanAction[]
  selected: PlanAction[]
  plan: PlanSummary
  sources: SourceHealth[]
  degraded: boolean
  /** True when the workspace has nothing to show yet. */
  empty: boolean
  needsObligations: boolean
}

export function buildCtx(state: AppState): Ctx {
  const org = orgFor(state, state.orgId)
  const policy = policyFor(state, state.orgId)
  const snapshot = SNAPSHOTS.find((s) => s.id === state.snapshotId) ?? SNAPSHOTS[0]
  const nowIso = nowFor(snapshot.id)

  const markTotal = org.holdings.reduce((s, h) => s + markUsd(h, snapshot.id), 0)
  const coverage = computeCoverage(org, snapshot.id, policy, [])
  const ladder = timeToCashLadder(org, snapshot.id, policy, coverage)
  const checks = runPolicy(org, snapshot.id, policy, coverage, [])
  const exposure = concentration(org, snapshot.id, policy)

  const catalogue = org.actions
  const selectedIds = selectedActionsFor(state, state.orgId)
  const selected = catalogue.filter((a) => selectedIds.includes(a.id))
  const plan = summarisePlan(org, snapshot.id, policy, selected)

  const sources = collectSources(org, snapshot, nowIso)

  return {
    state,
    view: state.view,
    org,
    policy,
    snapshot,
    nowIso,
    markTotal,
    coverage,
    ladder,
    checks,
    verdict: worstVerdict(checks),
    exposure,
    hhi: herfindahl(org, snapshot.id),
    catalogue,
    selected,
    plan,
    sources,
    degraded: sources.some((s) => s.stale),
    empty: org.holdings.length === 0,
    needsObligations: org.holdings.length > 0 && org.obligations.length === 0,
  }
}

function collectSources(org: Org, snapshot: Snapshot, nowIso: string): SourceHealth[] {
  const out: SourceHealth[] = []
  const seen = new Set<string>()

  for (const h of org.holdings) {
    const asOf = priceAsOfFor(h, snapshot.asOf)
    const key = `price:${h.priceSource.label}:${asOf}`
    if (!seen.has(key)) {
      seen.add(key)
      const f = freshness(asOf, nowIso, h.priceHeartbeatMins)
      out.push({
        key,
        label: h.priceSource.label,
        scope: `${h.symbol} price`,
        asOf,
        refreshMins: h.priceHeartbeatMins,
        ageMins: f.ageMins,
        stale: f.stale,
      })
    }
    for (const r of h.routes) {
      if (r.kind === "redemption") continue
      const rk = `depth:${r.id}`
      if (seen.has(rk)) continue
      seen.add(rk)
      // Depth arrives as 30-second snapshots, struck with the snapshot itself.
      const f = freshness(snapshot.asOf, nowIso, 5)
      out.push({
        key: rk,
        label: `${r.venue} · order-book depth`,
        scope: "depth ladder",
        asOf: snapshot.asOf,
        refreshMins: 5,
        ageMins: f.ageMins,
        stale: f.stale,
      })
    }
  }

  out.push({
    key: "obligations",
    label: "Committed spend schedule (entered by the treasury)",
    scope: "obligations",
    asOf: snapshot.asOf,
    refreshMins: 60 * 24 * 30,
    ageMins: 0,
    stale: false,
  })

  return out.sort((a, b) => Number(b.stale) - Number(a.stale) || b.ageMins - a.ageMins)
}

/** Holdings that share a market pool with the given holding. */
export function poolSiblings(org: Org, h: Holding): Holding[] {
  if (!h.capacityGroup) return []
  return org.holdings.filter((x) => x.capacityGroup === h.capacityGroup)
}

export function scenarioOrg(org: Org, scenarioId: string): { org: Org; snapshotId: "calm" } {
  return { org: applyScenario(org, scenarioById(scenarioId)), snapshotId: "calm" }
}
