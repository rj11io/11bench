import { ASSETS, SCORE_WEIGHTS, SLA_POLICY } from "./data"
import type {
  Criticality,
  DemoState,
  FixPack,
  ScoredPack,
  ScoreFactor,
  Severity,
} from "./types"

const DAY = 24 * 60 * 60 * 1000

const CRIT_VALUE: Record<Criticality, number> = {
  crown: 1,
  standard: 0.6,
  low: 0.25,
}

function assetById(id: string) {
  return ASSETS.find((a) => a.id === id)
}

export function severityForScore(score: number): Severity {
  if (score >= 80) return "critical"
  if (score >= 60) return "high"
  if (score >= 40) return "medium"
  return "low"
}

export function computeFactors(pack: FixPack): ScoreFactor[] {
  const assets = pack.assetIds.map(assetById).filter(Boolean)
  const exposed = assets.some((a) => a!.internetFacing)
  const maxCrit = Math.max(...assets.map((a) => CRIT_VALUE[a!.criticality]))
  const critAsset = assets.find(
    (a) => CRIT_VALUE[a!.criticality] === maxCrit
  )!
  // Blast radius: log-scaled finding volume, capped at 1 around 250 findings.
  const blast = Math.min(1, Math.log10(pack.findingCount + 1) / 2.4)

  const kevEvidence = pack.kev
    ? pack.kevAddedDaysAgo === 0
      ? "In CISA KEV — added overnight (confirmed exploited in the wild)"
      : pack.kevAddedDaysAgo && pack.kevAddedDaysAgo > 365
        ? "In CISA KEV since 2021 (confirmed exploited in the wild)"
        : `In CISA KEV — added ${pack.kevAddedDaysAgo}d ago (confirmed exploited)`
    : "Not in the CISA KEV catalog (no confirmed exploitation)"

  return [
    {
      id: "kev",
      label: "Confirmed exploitation",
      weight: SCORE_WEIGHTS.kev,
      value: pack.kev ? 1 : 0,
      contribution: pack.kev ? SCORE_WEIGHTS.kev : 0,
      evidence: kevEvidence,
      source: "CISA Known Exploited Vulnerabilities catalog",
    },
    {
      id: "epss",
      label: "Exploitation probability",
      weight: SCORE_WEIGHTS.epss,
      value: pack.epss,
      contribution: Math.round(SCORE_WEIGHTS.epss * pack.epss),
      evidence: `Highest EPSS in pack: ${Math.round(pack.epss * 100)}% chance of exploitation within 30 days`,
      source: "FIRST.org EPSS, daily feed",
    },
    {
      id: "exposure",
      label: "Internet exposure",
      weight: SCORE_WEIGHTS.exposure,
      value: exposed ? 1 : 0,
      contribution: exposed ? SCORE_WEIGHTS.exposure : 0,
      evidence: exposed
        ? `Reachable from the internet: ${assets.filter((a) => a!.internetFacing).map((a) => a!.name).join(", ")}`
        : "No affected asset is directly reachable from the internet",
      source: "Asset inventory (exposure flag)",
    },
    {
      id: "criticality",
      label: "Asset criticality",
      weight: SCORE_WEIGHTS.criticality,
      value: maxCrit,
      contribution: Math.round(SCORE_WEIGHTS.criticality * maxCrit),
      evidence: `${critAsset!.name}: ${critAsset!.criticalityReason}`,
      source: "Asset inventory (criticality tier)",
    },
    {
      id: "blast",
      label: "Blast radius",
      weight: SCORE_WEIGHTS.blast,
      value: blast,
      contribution: Math.round(SCORE_WEIGHTS.blast * blast),
      evidence: `${pack.findingCount} findings across ${assets.length} asset${assets.length === 1 ? "" : "s"} close with this one fix`,
      source: "Patchbay grouping engine",
    },
  ]
}

export function scorePack(pack: FixPack, state: DemoState, now: number): ScoredPack {
  const factors = computeFactors(pack)
  const score = factors.reduce((sum, f) => sum + f.contribution, 0)
  const severity = severityForScore(score)
  const slaDays = SLA_POLICY[severity]
  const firstSeenAt = now - pack.firstSeenDaysAgo * DAY
  const dueAt = firstSeenAt + slaDays * DAY

  const override = state.overrides[pack.id]
  const status = override?.status ?? pack.defaultStatus
  const ownerId =
    override?.ownerId !== undefined ? override.ownerId : (pack.defaultOwnerId ?? null)

  return {
    ...pack,
    score,
    severity,
    factors,
    status,
    ownerId,
    activity: override?.activity ?? [],
    acceptedReason:
      override?.acceptedReason ??
      (pack.defaultStatus === "accepted"
        ? "Internal-only wiki, no production credentials; compensating WAF rule in place. Re-review at expiry."
        : undefined),
    acceptedUntil: override?.acceptedUntil,
    slaDays,
    dueAt,
    breached: status !== "verified" && status !== "accepted" && dueAt < now,
  }
}

const BAND_RANK: Record<Severity, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
}

/** Rank by severity band; SLA-breached fixes float to the top of their band. */
export function sortPacks(packs: ScoredPack[]): ScoredPack[] {
  return [...packs].sort((a, b) => {
    if (a.severity !== b.severity)
      return BAND_RANK[a.severity] - BAND_RANK[b.severity]
    if (a.breached !== b.breached) return a.breached ? -1 : 1
    return b.score - a.score
  })
}
