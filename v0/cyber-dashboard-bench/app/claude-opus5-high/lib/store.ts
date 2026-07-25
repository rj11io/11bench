"use client"

/**
 * One external store, read with useSyncExternalStore.
 *
 * Only mutations are persisted — decisions, acceptances, audit entries, role,
 * density, filters, the service-level target and acknowledgements. The seed is
 * never written, so a schema change to the fixtures cannot be shadowed by stale
 * local storage.
 *
 * Hydration happens on first subscribe (after mount), so the server render and
 * the first client render agree and the route logs no hydration error.
 */

import * as React from "react"

import {
  ANALYTICS,
  CURRENT_USER,
  DAY,
  LOG_SOURCES,
  NOW,
  SEED_ACCEPTANCES,
  SEED_AUDIT,
  TACTICS,
  TECHNIQUES,
  VALIDATIONS,
} from "./seed"
import {
  compareFindings,
  deriveFinding,
  summarise,
} from "./scoring"
import type {
  Acceptance,
  AcceptanceReason,
  AssuranceState,
  AuditEvent,
  Density,
  DerivedFinding,
  FindingStatus,
  LogSource,
  LogSourceStatus,
  Role,
  TabId,
  Tier,
  Validation,
  ValidationMethod,
  ValidationResult,
} from "./types"

const STORAGE_KEY = "assay.demo.v1"

export interface QueueFilters {
  tier: "all" | Tier
  state: "all" | AssuranceState
  tactic: "all" | string
  query: string
  onlyMine: boolean
  blockedBy: string | null
}

export interface Mutations {
  role: Role
  density: Density
  tab: TabId
  targetPct: number
  ackIncidents: string[]
  filters: QueueFilters
  findings: Record<
    string,
    { status?: FindingStatus; owner?: string | null; dueAt?: number | null }
  >
  validations: Validation[]
  acceptances: Record<string, Acceptance>
  audit: AuditEvent[]
  logSources: Record<string, { status: LogSourceStatus; lastEventAt: number }>
  seq: number
  scenario: string
  registerFilter: "active" | "expiring" | "expired"
}

export const DEFAULT_FILTERS: QueueFilters = {
  tier: "all",
  state: "all",
  tactic: "all",
  query: "",
  onlyMine: false,
  blockedBy: null,
}

function initialMutations(): Mutations {
  return {
    role: "engineer",
    density: "comfortable",
    tab: "assurance",
    targetPct: 85,
    ackIncidents: [],
    filters: { ...DEFAULT_FILTERS },
    findings: {
      "F-T1027": { status: "assigned", owner: "J. Alvarez", dueAt: NOW + 4 * DAY },
      "F-T1550.001": {
        status: "assigned",
        owner: "P. Raman",
        dueAt: NOW + 2 * DAY,
      },
    },
    validations: [],
    acceptances: Object.fromEntries(
      SEED_ACCEPTANCES.map((a) => [a.findingId, a])
    ),
    audit: [],
    logSources: {},
    seq: 0,
    scenario: "identity-cloud",
    registerFilter: "active",
  }
}

let state: Mutations = initialMutations()
let hydrated = false
const listeners = new Set<() => void>()
/** Undo is offered only where undoing is honest. */
let undoStack: { label: string; snapshot: Mutations }[] = []

function emit() {
  for (const l of listeners) l()
}

function persist() {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* private browsing or quota — the demo still works, just without memory */
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return
  hydrated = true
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw) as Partial<Mutations>
    const base = initialMutations()
    state = {
      ...base,
      ...parsed,
      filters: { ...base.filters, ...(parsed.filters ?? {}) },
      findings: parsed.findings ?? base.findings,
      acceptances: parsed.acceptances ?? base.acceptances,
      validations: parsed.validations ?? [],
      audit: parsed.audit ?? [],
      logSources: parsed.logSources ?? {},
    }
    emit()
  } catch {
    /* corrupt payload — fall back to the seed */
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (!hydrated) {
    queueMicrotask(hydrate)
  }
  return () => {
    listeners.delete(listener)
  }
}

const serverSnapshot = state

function getSnapshot() {
  return state
}

function getServerSnapshot() {
  return serverSnapshot
}

export function useMutations(): Mutations {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

function commit(next: Mutations, undoLabel?: string) {
  if (undoLabel) {
    undoStack = [{ label: undoLabel, snapshot: state }, ...undoStack].slice(0, 5)
  }
  state = next
  persist()
  emit()
}

function nextId(prefix: string, seq: number) {
  return `${prefix}${String(seq + 1).padStart(4, "0")}`
}

function audited(
  base: Mutations,
  entry: Omit<AuditEvent, "id" | "at">
): Mutations {
  const seq = base.seq + 1
  const event: AuditEvent = {
    ...entry,
    id: nextId("A", 100 + seq),
    // The demo clock advances one minute per recorded action so the trail reads
    // in order without ever calling Date.now().
    at: NOW + seq * 60_000,
  }
  return { ...base, seq, audit: [event, ...base.audit] }
}

export function actorFor(role: Role) {
  return CURRENT_USER[role]
}

/* -------------------------------------------------------------------------- */
/* Actions                                                                    */
/* -------------------------------------------------------------------------- */

export const actions = {
  setRole(role: Role) {
    commit({ ...state, role })
  },
  setDensity(density: Density) {
    commit({ ...state, density })
  },
  setTab(tab: TabId) {
    commit({ ...state, tab })
  },
  setScenario(scenario: string) {
    commit({ ...state, scenario })
  },
  setRegisterFilter(registerFilter: Mutations["registerFilter"]) {
    commit({ ...state, registerFilter })
  },
  setFilters(patch: Partial<QueueFilters>) {
    commit({ ...state, filters: { ...state.filters, ...patch } })
  },
  clearFilters() {
    commit({ ...state, filters: { ...DEFAULT_FILTERS } })
  },
  acknowledge(id: string) {
    if (state.ackIncidents.includes(id)) return
    commit({ ...state, ackIncidents: [...state.ackIncidents, id] })
  },
  setTarget(targetPct: number, role: Role) {
    const clamped = Math.max(50, Math.min(100, Math.round(targetPct)))
    commit(
      audited({ ...state, targetPct: clamped }, {
        actor: actorFor(role),
        role,
        action: "service-level.edited",
        targetType: "service-level",
        targetId: "tier-1",
        detail: `Tier-1 assurance target set to ${clamped}% verified within the freshness window.`,
      })
    )
  },

  assign(
    findingIds: string[],
    owner: string,
    dueAt: number,
    role: Role,
    labels: Record<string, string>
  ) {
    let next = { ...state, findings: { ...state.findings } }
    for (const id of findingIds) {
      next.findings[id] = {
        ...next.findings[id],
        status: "assigned",
        owner,
        dueAt,
      }
    }
    next = audited(next, {
      actor: actorFor(role),
      role,
      action: "fix.assigned",
      targetType: "finding",
      targetId: findingIds[0],
      detail:
        findingIds.length === 1
          ? `Assigned ${labels[findingIds[0]] ?? findingIds[0]} to ${owner}.`
          : `Assigned ${findingIds.length} findings to ${owner}.`,
      fanOut: findingIds.length > 1 ? findingIds : undefined,
    })
    commit(next, `Assignment to ${owner}`)
  },

  recordValidation(
    input: {
      techniqueId: string
      analyticId: string | null
      method: ValidationMethod
      testId: string
      result: ValidationResult
    },
    role: Role
  ) {
    const seq = state.seq + 1
    const validation: Validation = {
      id: nextId("V", 3000 + seq),
      techniqueId: input.techniqueId,
      analyticId: input.analyticId,
      method: input.method,
      testId: input.testId,
      operator: actorFor(role),
      ranAt: NOW + seq * 60_000,
      result: input.result,
      evidenceRef: `evidence/${input.techniqueId}/demo-${String(seq).padStart(3, "0")}.json`,
      notes: "Recorded in the demo. No test was executed anywhere.",
    }
    let next: Mutations = {
      ...state,
      validations: [...state.validations, validation],
      findings: {
        ...state.findings,
        [`F-${input.techniqueId}`]: {
          ...state.findings[`F-${input.techniqueId}`],
          status: input.result === "alerted" ? "resolved" : "open",
        },
      },
    }
    next = audited(next, {
      actor: actorFor(role),
      role,
      action: "validation.recorded",
      targetType: "technique",
      targetId: input.techniqueId,
      detail: `${input.testId} — result: ${input.result}. Evidence ${validation.evidenceRef}.`,
    })
    commit(next)
  },

  requestAcceptance(
    input: {
      findingId: string
      techniqueId: string
      reason: AcceptanceReason
      justification: string
      expiresAt: number
    },
    role: Role
  ) {
    const acceptance: Acceptance = {
      findingId: input.findingId,
      techniqueId: input.techniqueId,
      reason: input.reason,
      justification: input.justification,
      requestedBy: actorFor(role),
      requestedAt: NOW + (state.seq + 1) * 60_000,
      approvedBy: null,
      approvedAt: null,
      expiresAt: input.expiresAt,
    }
    let next: Mutations = {
      ...state,
      acceptances: { ...state.acceptances, [input.findingId]: acceptance },
    }
    next = audited(next, {
      actor: actorFor(role),
      role,
      action: "acceptance.requested",
      targetType: "finding",
      targetId: input.findingId,
      detail: `Requested acceptance of ${input.techniqueId} — ${input.reason}. Awaiting a second approver.`,
    })
    commit(next)
  },

  approveAcceptance(findingId: string, role: Role) {
    const pending = state.acceptances[findingId]
    if (!pending || pending.approvedBy) return
    const actor = actorFor(role)
    if (actor === pending.requestedBy) return
    let next: Mutations = {
      ...state,
      acceptances: {
        ...state.acceptances,
        [findingId]: {
          ...pending,
          approvedBy: actor,
          approvedAt: NOW + (state.seq + 1) * 60_000,
        },
      },
    }
    next = audited(next, {
      actor,
      role,
      action: "acceptance.approved",
      targetType: "finding",
      targetId: findingId,
      detail: `Approved until ${new Date(pending.expiresAt).toISOString().slice(0, 10)}. Requester was ${pending.requestedBy}; separation of duties satisfied.`,
    })
    commit(next)
  },

  withdrawAcceptance(findingId: string, role: Role) {
    const pending = state.acceptances[findingId]
    if (!pending) return
    const rest = { ...state.acceptances }
    delete rest[findingId]
    let next: Mutations = { ...state, acceptances: rest }
    next = audited(next, {
      actor: actorFor(role),
      role,
      action: "acceptance.withdrawn",
      targetType: "finding",
      targetId: findingId,
      detail: `Acceptance withdrawn. ${pending.techniqueId} returns to its underlying state.`,
    })
    commit(next)
  },

  restoreLogSource(logSourceId: string, affected: string[], role: Role) {
    let next: Mutations = {
      ...state,
      logSources: {
        ...state.logSources,
        [logSourceId]: { status: "healthy", lastEventAt: NOW },
      },
    }
    next = audited(next, {
      actor: actorFor(role),
      role,
      action: "telemetry.restored",
      targetType: "log-source",
      targetId: logSourceId,
      detail: `Telemetry restored. ${affected.length} ${affected.length === 1 ? "finding" : "findings"} cleared by this single fix.`,
      fanOut: affected,
    })
    commit(next, "Telemetry restore")
  },

  undo() {
    const [top, ...rest] = undoStack
    if (!top) return
    undoStack = rest
    state = top.snapshot
    persist()
    emit()
  },

  canUndo() {
    return undoStack.length > 0
  },

  reset() {
    undoStack = []
    state = initialMutations()
    persist()
    emit()
  },
}

/* -------------------------------------------------------------------------- */
/* Selectors                                                                  */
/* -------------------------------------------------------------------------- */

const tacticById = new Map(TACTICS.map((t) => [t.id, t]))
const analyticsByTechnique = new Map<string, typeof ANALYTICS>()
for (const a of ANALYTICS) {
  const list = analyticsByTechnique.get(a.techniqueId) ?? []
  list.push(a)
  analyticsByTechnique.set(a.techniqueId, list)
}

export function selectLogSources(m: Mutations): LogSource[] {
  return LOG_SOURCES.map((s) => {
    const patch = m.logSources[s.id]
    if (!patch) return s
    return {
      ...s,
      status: patch.status,
      lastEventAt: patch.lastEventAt,
      volume14d:
        patch.status === "healthy" && s.status === "silent"
          ? s.volume14d.map((v, i) =>
              v === 0 ? Math.round(s.volume14d[Math.max(0, i - 8)] || 0) : v
            )
          : s.volume14d,
      note:
        patch.status === "healthy" && s.status === "silent"
          ? "Restored in this demo session. Heartbeat inside its expected window."
          : s.note,
    }
  })
}

export function selectFindings(m: Mutations): DerivedFinding[] {
  const logSources = selectLogSources(m)
  const logSourceById = new Map(logSources.map((s) => [s.id, s]))
  const allValidations = [...VALIDATIONS, ...m.validations]
  const byTechnique = new Map<string, Validation[]>()
  for (const v of allValidations) {
    const list = byTechnique.get(v.techniqueId) ?? []
    list.push(v)
    byTechnique.set(v.techniqueId, list)
  }

  return TECHNIQUES.map((technique) => {
    const override = m.findings[`F-${technique.id}`] ?? {}
    return deriveFinding({
      technique,
      tactic: tacticById.get(technique.tacticId)!,
      analytics: analyticsByTechnique.get(technique.id) ?? [],
      logSourceById,
      validations: byTechnique.get(technique.id) ?? [],
      acceptance: m.acceptances[`F-${technique.id}`] ?? null,
      status: override.status ?? "open",
      owner: override.owner ?? null,
      dueAt: override.dueAt ?? null,
      now: NOW,
    })
  }).sort(compareFindings)
}

export function selectOpenQueue(findings: DerivedFinding[]): DerivedFinding[] {
  return findings.filter(
    (f) =>
      f.state !== "verified" && f.state !== "accepted" && f.status !== "resolved"
  )
}

export function applyFilters(
  queue: DerivedFinding[],
  filters: QueueFilters,
  actor: string
): DerivedFinding[] {
  const q = filters.query.trim().toLowerCase()
  return queue.filter((f) => {
    if (filters.tier !== "all" && f.technique.tier !== filters.tier) return false
    if (filters.state !== "all" && f.state !== filters.state) return false
    if (filters.tactic !== "all" && f.tactic.id !== filters.tactic) return false
    if (filters.onlyMine && f.owner !== actor) return false
    if (
      filters.blockedBy &&
      !f.blockingLogSourceIds.includes(filters.blockedBy)
    ) {
      return false
    }
    if (q) {
      const haystack = `${f.technique.id} ${f.technique.name} ${f.tactic.name} ${f.fixClass}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
}

export function selectSummary(m: Mutations, findings: DerivedFinding[]) {
  return summarise(findings, selectLogSources(m), m.targetPct)
}

export function selectAudit(m: Mutations): AuditEvent[] {
  return [...m.audit, ...SEED_AUDIT].sort((a, b) => b.at - a.at)
}

export function selectAcceptances(m: Mutations): Acceptance[] {
  return Object.values(m.acceptances).sort((a, b) => a.expiresAt - b.expiresAt)
}

/** Findings whose only failing dependency is this log source. */
export function findingsBlockedBy(
  findings: DerivedFinding[],
  logSourceId: string
): DerivedFinding[] {
  return findings.filter((f) => f.blockingLogSourceIds.includes(logSourceId))
}

export const PERMISSIONS: Record<
  Role,
  { write: boolean; approve: boolean; editServiceLevel: boolean; label: string }
> = {
  engineer: {
    write: true,
    approve: false,
    editServiceLevel: false,
    label: "Detection engineer",
  },
  manager: {
    write: true,
    approve: true,
    editServiceLevel: true,
    label: "Security operations manager",
  },
  auditor: {
    write: false,
    approve: false,
    editServiceLevel: false,
    label: "Internal audit (read-only)",
  },
}
