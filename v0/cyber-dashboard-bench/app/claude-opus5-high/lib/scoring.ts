/**
 * Derivation: turns the four inputs into one assurance state per technique, and
 * into an explainable priority. Nothing here is stored — it is recomputed on
 * every render so the ledger can never disagree with its own evidence.
 *
 * Order of checks matters and is the product's argument:
 *   1. content    — is there an enabled analytic at all?
 *   2. telemetry  — are its log sources alive and parsing?
 *   3. validation — did a test actually produce an alert, and how long ago?
 *   4. fidelity   — when it fires for real, is it useful?
 */

import {
  ASSET_GROUPS,
  DAY,
  FRESHNESS_WINDOW_DAYS,
  NOW,
} from "./seed"
import type {
  Acceptance,
  Analytic,
  AnalyticHealth,
  AssuranceState,
  CoverageSummary,
  DerivedFinding,
  FidelityFlag,
  FindingStatus,
  FixClass,
  LogSource,
  PriorityTerm,
  Tactic,
  Technique,
  Validation,
} from "./types"

export const STATE_ORDER: AssuranceState[] = [
  "verified",
  "decaying",
  "assumed",
  "broken",
  "blind",
  "accepted",
]

export const STATE_META: Record<
  AssuranceState,
  { label: string; glyph: string; blurb: string; deficit: number }
> = {
  verified: {
    label: "Verified",
    glyph: "✓",
    blurb: "Tested inside its freshness window, evidence on file.",
    deficit: 0,
  },
  decaying: {
    label: "Decaying",
    glyph: "◗",
    blurb: "Was proven. The evidence is now past its freshness window.",
    deficit: 0.55,
  },
  assumed: {
    label: "Assumed",
    glyph: "○",
    blurb: "A rule exists. Nothing has ever tested it. This is not coverage.",
    deficit: 0.75,
  },
  broken: {
    label: "Broken",
    glyph: "✕",
    blurb: "Content exists but a dependency has failed.",
    deficit: 0.9,
  },
  blind: {
    label: "Blind",
    glyph: "⋯",
    blurb: "No detection content is mapped to this technique.",
    deficit: 1,
  },
  accepted: {
    label: "Accepted",
    glyph: "▣",
    blurb: "A named person accepted this gap until a named date.",
    deficit: 0,
  },
}

export const FIX_META: Record<
  FixClass,
  { label: string; effort: number; verb: string }
> = {
  validate: { label: "Validate", effort: 1, verb: "Run a first test" },
  revalidate: { label: "Re-validate", effort: 1, verb: "Re-run the test" },
  "restore-telemetry": {
    label: "Restore telemetry",
    effort: 0.88,
    verb: "Bring the log source back",
  },
  "repair-mapping": {
    label: "Repair mapping",
    effort: 0.8,
    verb: "Fix the field reference",
  },
  tune: { label: "Tune", effort: 0.7, verb: "Cut the noise" },
  "author-analytic": {
    label: "Author analytic",
    effort: 0.55,
    verb: "Write a detection",
  },
}

export const REASON_LABEL: Record<string, string> = {
  "compensating-control": "Compensating control in place",
  "telemetry-unavailable": "Telemetry not available",
  "not-applicable": "Not applicable to our estate",
  "accepted-business-risk": "Accepted business risk",
  "vendor-limitation": "Vendor limitation",
}

export const METHOD_LABEL: Record<string, string> = {
  atomic: "Atomic test",
  bas: "Attack simulation",
  purple: "Purple team",
  manual: "Manual check",
}

export const RESULT_LABEL: Record<string, string> = {
  alerted: "Alerted",
  detected: "Detected, no alert",
  "logged-only": "Logged only",
  missed: "Missed",
}

export function daysBetween(from: number, to: number) {
  return Math.max(0, Math.floor((to - from) / DAY))
}

/* -------------------------------------------------------------------------- */
/* Per-analytic health — the telemetry input                                  */
/* -------------------------------------------------------------------------- */

export function analyticHealth(
  analytic: Analytic,
  logSourceById: Map<string, LogSource>,
  now: number
): AnalyticHealth {
  const deps = analytic.logSourceIds
    .map((id) => logSourceById.get(id))
    .filter((s): s is LogSource => Boolean(s))
  const precision =
    analytic.fires30d > 0
      ? analytic.truePositives30d / analytic.fires30d
      : null

  if (!analytic.enabled) {
    return {
      analytic,
      status: "broken",
      reason: "The analytic is disabled in the SIEM.",
      blockingLogSourceIds: [],
      precision,
    }
  }

  if (analytic.missingFields.length > 0) {
    return {
      analytic,
      status: "broken",
      reason: `References ${analytic.missingFields.join(", ")}, which the current schema does not emit. It cannot fire.`,
      blockingLogSourceIds: [],
      precision,
    }
  }

  const silent = deps.filter((s) => s.status === "silent")
  if (silent.length > 0) {
    const worst = silent[0]
    return {
      analytic,
      status: "broken",
      reason: `${worst.name} has been silent for ${daysBetween(worst.lastEventAt, now)} days, past its ${worst.expectedIntervalMin}-minute heartbeat window.`,
      blockingLogSourceIds: silent.map((s) => s.id),
      precision,
    }
  }

  const degraded = deps.filter((s) => s.status === "degraded")
  if (degraded.length > 0) {
    const worst = degraded[0]
    return {
      analytic,
      status: "degraded",
      reason: `${worst.name} is degraded — ${(worst.parseErrorRate * 100).toFixed(1)}% of events fail to parse.`,
      blockingLogSourceIds: [],
      precision,
    }
  }

  return {
    analytic,
    status: "healthy",
    reason: "Content enabled, every dependency reporting.",
    blockingLogSourceIds: [],
    precision,
  }
}

/* -------------------------------------------------------------------------- */
/* Fidelity — the fourth input                                                */
/* -------------------------------------------------------------------------- */

const NOISE_FIRE_FLOOR = 20
const NOISE_PRECISION_CEILING = 0.05

export function fidelityOf(analytics: AnalyticHealth[]): {
  flag: FidelityFlag
  note: string
} {
  const enabled = analytics.filter((a) => a.analytic.enabled)
  if (enabled.length === 0) {
    return { flag: "unknown", note: "No enabled analytic to measure." }
  }
  const noisy = enabled.find(
    (a) =>
      a.analytic.fires30d >= NOISE_FIRE_FLOOR &&
      a.precision !== null &&
      a.precision < NOISE_PRECISION_CEILING
  )
  if (noisy) {
    return {
      flag: "noisy",
      note: `${noisy.analytic.id} fired ${noisy.analytic.fires30d} times in 30 days for ${noisy.analytic.truePositives30d} true positives (${((noisy.precision ?? 0) * 100).toFixed(1)}% precision). A detection this noisy is not a working detection.`,
    }
  }
  const allSilent = enabled.every((a) => a.analytic.fires30d === 0)
  if (allSilent) {
    return {
      flag: "never-fired",
      note: "Enabled, and has not fired once in 30 days. That may be correct, or it may be broken in a way no test has caught. Assay does not guess.",
    }
  }
  const totalFires = enabled.reduce((n, a) => n + a.analytic.fires30d, 0)
  const totalTp = enabled.reduce((n, a) => n + a.analytic.truePositives30d, 0)
  return {
    flag: "ok",
    note: `${totalFires} fires in 30 days, ${totalTp} true positives across ${enabled.length} ${enabled.length === 1 ? "analytic" : "analytics"}.`,
  }
}

/* -------------------------------------------------------------------------- */
/* State derivation                                                           */
/* -------------------------------------------------------------------------- */

interface DeriveInput {
  technique: Technique
  tactic: Tactic
  analytics: Analytic[]
  logSourceById: Map<string, LogSource>
  validations: Validation[]
  acceptance: Acceptance | null
  status: FindingStatus
  owner: string | null
  dueAt: number | null
  now: number
}

export function deriveFinding({
  technique,
  tactic,
  analytics,
  logSourceById,
  validations,
  acceptance,
  status,
  owner,
  dueAt,
  now,
}: DeriveInput): DerivedFinding {
  const health = analytics.map((a) => analyticHealth(a, logSourceById, now))
  const enabled = health.filter((h) => h.analytic.enabled)
  const fidelity = fidelityOf(health)
  const window = FRESHNESS_WINDOW_DAYS[technique.tier]
  const mine = [...validations].sort((a, b) => b.ranAt - a.ranAt)
  const latest = mine[0] ?? null
  const latestPass = mine.find((v) => v.result === "alerted") ?? null
  const evidenceAgeDays = latestPass ? daysBetween(latestPass.ranAt, now) : null

  let state: AssuranceState
  let reason: string
  let failingInput: DerivedFinding["failingInput"] = "none"
  let fixClass: FixClass

  const activeAcceptance =
    acceptance && acceptance.approvedBy && acceptance.expiresAt > now
      ? acceptance
      : null

  if (activeAcceptance) {
    state = "accepted"
    reason = `Accepted by ${activeAcceptance.approvedBy} until ${new Date(activeAcceptance.expiresAt).toISOString().slice(0, 10)} — ${REASON_LABEL[activeAcceptance.reason]}.`
    fixClass = analytics.length === 0 ? "author-analytic" : "validate"
  } else if (analytics.length === 0) {
    state = "blind"
    failingInput = "content"
    reason = "No analytic is mapped to this technique. Nothing would fire."
    fixClass = "author-analytic"
  } else if (enabled.length === 0) {
    state = "broken"
    failingInput = "content"
    reason = `All ${analytics.length} mapped ${analytics.length === 1 ? "analytic is" : "analytics are"} disabled in the SIEM.`
    fixClass = "repair-mapping"
  } else if (enabled.some((h) => h.status === "broken")) {
    const bad = enabled.filter((h) => h.status === "broken")
    state = "broken"
    failingInput = bad[0].blockingLogSourceIds.length > 0 ? "telemetry" : "content"
    reason = bad[0].reason
    fixClass =
      failingInput === "telemetry" ? "restore-telemetry" : "repair-mapping"
  } else if (latest && latest.result !== "alerted") {
    state = "broken"
    failingInput = "validation"
    reason =
      latest.result === "logged-only"
        ? `Last test (${latest.testId}, ${daysBetween(latest.ranAt, now)} days ago) found the behaviour in the logs but no alert fired. The telemetry is fine; the analytic is not.`
        : latest.result === "detected"
          ? `Last test (${latest.testId}, ${daysBetween(latest.ranAt, now)} days ago) was detected by the tool but never reached an analyst. Not coverage.`
          : `Last test (${latest.testId}, ${daysBetween(latest.ranAt, now)} days ago) was missed outright.`
    fixClass = "repair-mapping"
  } else if (!latestPass) {
    state = "assumed"
    failingInput = "validation"
    reason =
      "A rule exists and its telemetry is healthy, but nothing has ever tested it. Assay does not count this as coverage."
    fixClass = "validate"
  } else if (fidelity.flag === "noisy") {
    state = "decaying"
    failingInput = "fidelity"
    reason = fidelity.note
    fixClass = "tune"
  } else if (evidenceAgeDays !== null && evidenceAgeDays > window * 2) {
    state = "assumed"
    failingInput = "validation"
    reason = `The last passing test was ${evidenceAgeDays} days ago — more than twice the ${window}-day window for tier ${technique.tier}. The evidence no longer supports a claim.`
    fixClass = "revalidate"
  } else if (evidenceAgeDays !== null && evidenceAgeDays > window) {
    state = "decaying"
    failingInput = "validation"
    reason = `Last proven ${evidenceAgeDays} days ago, past the ${window}-day freshness window for tier ${technique.tier}.`
    fixClass = "revalidate"
  } else {
    state = "verified"
    reason = `Proven ${evidenceAgeDays} days ago by ${latestPass.testId} (${METHOD_LABEL[latestPass.method].toLowerCase()}), inside the ${window}-day window.`
    fixClass = "revalidate"
  }

  const confidence =
    evidenceAgeDays === null
      ? 0
      : Math.max(0, Math.min(1, 1 - evidenceAgeDays / (window * 2)))

  const blockingLogSourceIds = Array.from(
    new Set(enabled.flatMap((h) => h.blockingLogSourceIds))
  )

  const terms = priorityTerms(technique, state, fixClass)
  const priority = terms.length > 0 ? terms[terms.length - 1].running : 0

  return {
    id: `F-${technique.id}`,
    technique,
    tactic,
    state,
    reason,
    failingInput,
    status: activeAcceptance ? "resolved" : status,
    priority,
    terms,
    fixClass,
    analytics: health,
    validations: mine,
    latestPass,
    evidenceAgeDays,
    freshnessWindowDays: window,
    confidence,
    fidelity: fidelity.flag,
    fidelityNote: fidelity.note,
    blockingLogSourceIds,
    owner,
    dueAt,
    acceptance,
  }
}

/* -------------------------------------------------------------------------- */
/* Priority — a multiplicative chain, shown term by term                      */
/* -------------------------------------------------------------------------- */

export function priorityTerms(
  technique: Technique,
  state: AssuranceState,
  fixClass: FixClass
): PriorityTerm[] {
  const blast = technique.assetGroups.length / ASSET_GROUPS.length
  const deficit = STATE_META[state].deficit
  const effort = FIX_META[fixClass].effort

  const t1: PriorityTerm = {
    label: "Threat weight",
    value: technique.threatWeight,
    display: technique.threatWeight.toFixed(2),
    source: technique.threatRank
      ? `Ranked #${technique.threatRank} in the Red Canary Threat Detection Report 2025`
      : technique.threatSource,
    note: "How often this behaviour actually shows up in real intrusions.",
    running: 0,
  }
  const t2: PriorityTerm = {
    label: "Blast radius",
    value: blast,
    display: `${technique.assetGroups.length}/${ASSET_GROUPS.length}`,
    source: technique.assetGroups.join(", "),
    note: "Share of crown-jewel asset groups this technique can reach.",
    running: 0,
  }
  const t3: PriorityTerm = {
    label: "Assurance deficit",
    value: deficit,
    display: deficit.toFixed(2),
    source: `State: ${STATE_META[state].label.toLowerCase()}`,
    note: "How far this is from proven. Verified is zero; blind is one.",
    running: 0,
  }
  const t4: PriorityTerm = {
    label: "Effort factor",
    value: effort,
    display: effort.toFixed(2),
    source: `Fix class: ${FIX_META[fixClass].label.toLowerCase()}`,
    note: "Cheap fixes rank higher, so quick wins are not buried.",
    running: 0,
  }

  const terms = [t1, t2, t3, t4]
  let running = 100
  for (const term of terms) {
    running = running * term.value
    term.running = Math.round(running * 10) / 10
  }
  return terms
}

/* -------------------------------------------------------------------------- */
/* Roll-up                                                                    */
/* -------------------------------------------------------------------------- */

export function summarise(
  findings: DerivedFinding[],
  logSources: LogSource[],
  targetPct: number
): CoverageSummary {
  const count = (state: AssuranceState) =>
    findings.filter((f) => f.state === state).length
  const tierOne = findings.filter((f) => f.technique.tier === 1)
  const tierOneVerified = tierOne.filter((f) => f.state === "verified").length
  const withContent = findings.filter((f) =>
    f.analytics.some((a) => a.analytic.enabled)
  ).length
  const verified = count("verified")
  const total = findings.length || 1

  const claimedPct = Math.round((withContent / total) * 100)
  const verifiedPct = Math.round((verified / total) * 100)

  const requiredVerified = Math.ceil((targetPct / 100) * tierOne.length)
  const budgetTotal = Math.max(0, tierOne.length - requiredVerified)
  const budgetUsed = tierOne.length - tierOneVerified

  const brokenAnalytics = findings.reduce(
    (n, f) =>
      n +
      f.analytics.filter((a) => a.status === "broken" && a.analytic.enabled)
        .length,
    0
  )

  return {
    scopedTotal: findings.length,
    tierOneTotal: tierOne.length,
    verified,
    decaying: count("decaying"),
    assumed: count("assumed"),
    broken: count("broken"),
    blind: count("blind"),
    accepted: count("accepted"),
    tierOneVerified,
    claimedPct,
    verifiedPct,
    gapPoints: claimedPct - verifiedPct,
    tierOneVerifiedPct: Math.round(
      (tierOneVerified / (tierOne.length || 1)) * 100
    ),
    budgetTotal,
    budgetUsed,
    brokenAnalytics,
    brokenLogSources: logSources.filter((s) => s.status === "silent").length,
  }
}

/** Stable ordering: priority, then state severity, then evidence age, then id. */
export function compareFindings(a: DerivedFinding, b: DerivedFinding) {
  if (b.priority !== a.priority) return b.priority - a.priority
  const severity = ["blind", "broken", "assumed", "decaying", "verified", "accepted"]
  const sa = severity.indexOf(a.state)
  const sb = severity.indexOf(b.state)
  if (sa !== sb) return sa - sb
  const aa = a.evidenceAgeDays ?? 9999
  const ba = b.evidenceAgeDays ?? 9999
  if (aa !== ba) return ba - aa
  return a.technique.id.localeCompare(b.technique.id)
}

export const DEMO_NOW = NOW
