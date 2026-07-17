"use client"

import * as React from "react"

import { DEFAULT_POLICY, FRESH_EMPTY, FRESH_SEEDED, MERIDIAN, NO_SCENARIO } from "./data"
import type { Org, OrgId, PolicyConfig, Proposal, Scenario } from "./types"

export type ViewId = "overview" | "positions" | "stress" | "policy" | "proposals"

interface PersistedState {
  orgId: OrgId
  policy: PolicyConfig
  scenario: Scenario
  proposals: Proposal[]
  freshSeeded: boolean
}

const STORAGE_KEY = "glidepath:v1"

const DEFAULT_PERSISTED: PersistedState = {
  orgId: "meridian",
  policy: DEFAULT_POLICY,
  scenario: NO_SCENARIO,
  proposals: [],
  freshSeeded: false,
}

function loadPersisted(): PersistedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PERSISTED
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    return {
      orgId: parsed.orgId === "fresh" ? "fresh" : "meridian",
      policy: { ...DEFAULT_POLICY, ...parsed.policy },
      scenario: { ...NO_SCENARIO, ...parsed.scenario },
      proposals: Array.isArray(parsed.proposals) ? parsed.proposals : [],
      freshSeeded: Boolean(parsed.freshSeeded),
    }
  } catch {
    return DEFAULT_PERSISTED
  }
}

interface GlidepathStore extends PersistedState {
  hydrated: boolean
  view: ViewId
  setView: (v: ViewId) => void
  org: Org
  setOrgId: (id: OrgId) => void
  setPolicy: (p: PolicyConfig) => void
  setScenario: (s: Scenario) => void
  saveProposal: (p: Proposal) => void
  deleteProposal: (id: string) => void
  seedFresh: () => void
}

const StoreContext = React.createContext<GlidepathStore | null>(null)

const emptySubscribe = () => () => {}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // True after hydration; false during SSR. Avoids setState-in-effect.
  const hydrated = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const [view, setView] = React.useState<ViewId>("overview")
  // Until the user changes something, state comes from localStorage (or defaults).
  const persisted = React.useMemo(
    () => (hydrated ? loadPersisted() : DEFAULT_PERSISTED),
    [hydrated]
  )
  const [override, setOverride] = React.useState<PersistedState | null>(null)
  const state = override ?? persisted

  const setState = React.useCallback(
    (updater: (s: PersistedState) => PersistedState) => {
      setOverride((prev) => updater(prev ?? persisted))
    },
    [persisted]
  )

  React.useEffect(() => {
    if (!hydrated || !override) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(override))
    } catch {
      // localStorage unavailable (private mode etc.) — the demo still works, it just won't persist.
    }
  }, [override, hydrated])

  const org = React.useMemo<Org>(() => {
    if (state.orgId === "meridian") return MERIDIAN
    return state.freshSeeded ? FRESH_SEEDED : FRESH_EMPTY
  }, [state.orgId, state.freshSeeded])

  const store = React.useMemo<GlidepathStore>(
    () => ({
      ...state,
      hydrated,
      view,
      setView,
      org,
      setOrgId: (orgId) => setState((s) => ({ ...s, orgId })),
      setPolicy: (policy) => setState((s) => ({ ...s, policy })),
      setScenario: (scenario) => setState((s) => ({ ...s, scenario })),
      saveProposal: (p) => setState((s) => ({ ...s, proposals: [p, ...s.proposals] })),
      deleteProposal: (id) =>
        setState((s) => ({ ...s, proposals: s.proposals.filter((x) => x.id !== id) })),
      seedFresh: () => setState((s) => ({ ...s, freshSeeded: true })),
    }),
    [state, hydrated, view, org, setState]
  )

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useGlidepath(): GlidepathStore {
  const ctx = React.useContext(StoreContext)
  if (!ctx) throw new Error("useGlidepath must be used inside StoreProvider")
  return ctx
}

export function scenarioIsActive(s: Scenario): boolean {
  return (
    s.majorsDrawdownPct !== 0 ||
    s.ownDrawdownPct !== 0 ||
    s.usdtDepeg ||
    s.burnMultiplier !== 1
  )
}
