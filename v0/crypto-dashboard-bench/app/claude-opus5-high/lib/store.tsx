"use client"

/**
 * Route-local state, persisted to localStorage.
 *
 * Deliberately built on an external store read through useSyncExternalStore
 * rather than effects: the repo's lint rules ban setState inside an effect, and
 * this pattern also gives a clean server snapshot so the first paint matches
 * the HTML and then upgrades to whatever the browser had saved.
 */

import * as React from "react"

import type { Holding, Obligation, Org, Policy } from "./engine"
import {
  DEFAULT_POLICY,
  MERIDIAN,
  NORTHWIND,
  NORTHWIND_STARTER_HOLDINGS,
  NORTHWIND_STARTER_OBLIGATIONS,
} from "./seed"

export type ViewId = "readiness" | "holdings" | "stress" | "plan" | "policy" | "log"

export interface LogEntry {
  id: string
  orgId: string
  at: string
  title: string
  kind: "plan-approved" | "policy-changed" | "snapshot-noted" | "workspace-setup"
  body: string
  /** Numbers frozen at the moment the decision was taken. */
  evidence: { label: string; value: string }[]
  provenance: { label: string; value: string }[]
  approver: string
  secondApprover?: string
}

export interface OnboardingState {
  addressAdded: boolean
  obligationsAdded: boolean
  policyAdopted: boolean
}

export interface AppState {
  orgId: string
  view: ViewId
  snapshotId: "calm" | "stressed"
  scenarioId: string
  compareScenarioId: string
  policies: Record<string, Policy>
  selectedActions: Record<string, string[]>
  onboarding: Record<string, OnboardingState>
  log: LogEntry[]
  density: "comfortable" | "compact"
  showMarkOverlay: boolean
}

const KEY = "waterline.demo.v1"

const DEFAULT_STATE: AppState = {
  orgId: MERIDIAN.id,
  view: "readiness",
  snapshotId: "calm",
  scenarioId: "base",
  compareScenarioId: "risk-off",
  policies: { [MERIDIAN.id]: DEFAULT_POLICY, [NORTHWIND.id]: NORTHWIND.policy },
  selectedActions: {},
  onboarding: {
    [NORTHWIND.id]: { addressAdded: false, obligationsAdded: false, policyAdopted: false },
  },
  log: [],
  density: "comfortable",
  showMarkOverlay: true,
}

/* --------------------------------------------------------------- the store */

let state: AppState = DEFAULT_STATE
const listeners = new Set<() => void>()

function hydrateFromStorage() {
  if (typeof window === "undefined") return
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return
    const saved = JSON.parse(raw) as Partial<AppState>
    state = {
      ...DEFAULT_STATE,
      ...saved,
      policies: { ...DEFAULT_STATE.policies, ...(saved.policies ?? {}) },
      onboarding: { ...DEFAULT_STATE.onboarding, ...(saved.onboarding ?? {}) },
      selectedActions: { ...(saved.selectedActions ?? {}) },
      log: Array.isArray(saved.log) ? saved.log : [],
    }
  } catch {
    // A corrupt or unreadable saved state should never break the route.
    state = DEFAULT_STATE
  }
}

hydrateFromStorage()

function persist() {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // Private browsing and full quotas both land here. The demo still works,
    // it just forgets.
  }
}

function emit() {
  for (const l of listeners) l()
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

function getSnapshot() {
  return state
}

function getServerSnapshot() {
  return DEFAULT_STATE
}

export function setState(patch: Partial<AppState>) {
  state = { ...state, ...patch }
  persist()
  emit()
}

export function useAppState(): AppState {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** True once the browser has taken over from the server-rendered markup. */
export function useHydrated(): boolean {
  return React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

export function resetDemo() {
  state = DEFAULT_STATE
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(KEY)
    } catch {
      /* ignore */
    }
  }
  emit()
}

/* ------------------------------------------------------------- derived org */

/** Northwind starts empty and fills up as the user completes onboarding. */
export function orgFor(state: AppState, orgId: string): Org {
  const base = orgId === NORTHWIND.id ? NORTHWIND : MERIDIAN
  const policy = state.policies[orgId] ?? base.policy
  if (orgId !== NORTHWIND.id) return { ...base, policy }

  const ob = state.onboarding[orgId] ?? {
    addressAdded: false,
    obligationsAdded: false,
    policyAdopted: false,
  }
  const holdings: Holding[] = ob.addressAdded ? NORTHWIND_STARTER_HOLDINGS : []
  const obligations: Obligation[] = ob.obligationsAdded ? NORTHWIND_STARTER_OBLIGATIONS : []
  return { ...base, policy, holdings, obligations }
}

export function policyFor(state: AppState, orgId: string): Policy {
  return state.policies[orgId] ?? (orgId === NORTHWIND.id ? NORTHWIND.policy : DEFAULT_POLICY)
}

export function setPolicy(orgId: string, patch: Partial<Policy>) {
  const current = policyFor(state, orgId)
  setState({ policies: { ...state.policies, [orgId]: { ...current, ...patch } } })
}

export function selectedActionsFor(state: AppState, orgId: string): string[] {
  return state.selectedActions[orgId] ?? []
}

export function setSelectedActions(orgId: string, ids: string[]) {
  setState({ selectedActions: { ...state.selectedActions, [orgId]: ids } })
}

export function toggleAction(orgId: string, id: string) {
  const current = selectedActionsFor(state, orgId)
  setSelectedActions(orgId, current.includes(id) ? current.filter((x) => x !== id) : [...current, id])
}

export function setOnboarding(orgId: string, patch: Partial<OnboardingState>) {
  const current =
    state.onboarding[orgId] ?? { addressAdded: false, obligationsAdded: false, policyAdopted: false }
  setState({ onboarding: { ...state.onboarding, [orgId]: { ...current, ...patch } } })
}

export function appendLog(entry: Omit<LogEntry, "id">) {
  const id = `log-${state.log.length + 1}-${entry.kind}`
  setState({ log: [{ ...entry, id }, ...state.log] })
}

export function clearLog(orgId: string) {
  setState({ log: state.log.filter((e) => e.orgId !== orgId) })
}
