"use client"

import * as React from "react"

import { getScenarioPacks, PEOPLE } from "./data"
import { scorePack, sortPacks } from "./scoring"
import type {
  ActivityEvent,
  DemoState,
  PackStatus,
  Scenario,
  ScoredPack,
} from "./types"

const STORAGE_KEY = "patchbay-demo-v1"

const INITIAL: DemoState = { scenario: "steady", overrides: {} }

type Action =
  | { type: "set-scenario"; scenario: Scenario }
  | { type: "assign"; packId: string; ownerId: string | null }
  | { type: "set-status"; packId: string; status: PackStatus }
  | {
      type: "accept-risk"
      packId: string
      reason: string
      until: string
    }
  | { type: "reset" }

const ACTOR = "Maya Chen (you)"

function withEvent(
  state: DemoState,
  packId: string,
  patch: Partial<Omit<DemoState["overrides"][string], "activity">>,
  event: ActivityEvent
): DemoState {
  const prev = state.overrides[packId] ?? { activity: [] }
  return {
    ...state,
    overrides: {
      ...state.overrides,
      [packId]: {
        ...prev,
        ...patch,
        activity: [event, ...prev.activity],
      },
    },
  }
}

function reducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case "set-scenario":
      return { ...state, scenario: action.scenario }
    case "assign": {
      const owner = PEOPLE.find((p) => p.id === action.ownerId)
      return withEvent(
        state,
        action.packId,
        { ownerId: action.ownerId },
        {
          at: Date.now(),
          actor: ACTOR,
          action: owner ? `Assigned to ${owner.name} (${owner.team})` : "Owner cleared",
        }
      )
    }
    case "set-status": {
      const labels: Record<PackStatus, string> = {
        open: "Reopened",
        in_progress: "Moved to In progress",
        submitted: "Marked Fix submitted",
        verified: "Marked Verified — closed",
        accepted: "Risk accepted",
      }
      return withEvent(
        state,
        action.packId,
        { status: action.status },
        { at: Date.now(), actor: ACTOR, action: labels[action.status] }
      )
    }
    case "accept-risk":
      return withEvent(
        state,
        action.packId,
        {
          status: "accepted",
          acceptedReason: action.reason,
          acceptedUntil: action.until,
        },
        {
          at: Date.now(),
          actor: ACTOR,
          action: "Risk accepted",
          detail: `Until ${action.until}: ${action.reason}`,
        }
      )
    case "reset":
      return { ...INITIAL, scenario: state.scenario }
    default:
      return state
  }
}

interface StoreValue {
  state: DemoState
  dispatch: React.Dispatch<Action>
  /** scored + sorted packs for the current scenario; empty for first-run */
  packs: ScoredPack[]
  now: number
}

const StoreContext = React.createContext<StoreValue | null>(null)

export function useStore() {
  const value = React.useContext(StoreContext)
  if (!value) throw new Error("useStore outside provider")
  return value
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL, () => {
    if (typeof window === "undefined") return INITIAL
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return INITIAL
      const parsed = JSON.parse(raw) as DemoState
      if (parsed && parsed.scenario && parsed.overrides) return parsed
    } catch {
      // corrupted storage falls back to the seed
    }
    return INITIAL
  })

  React.useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // storage may be unavailable (private mode); demo still works in memory
    }
  }, [state])

  // A stable "now" keeps countdowns consistent without ticking re-renders; it
  // refreshes when the user switches scenario (an event, so impurity is fine).
  const [now, setNow] = React.useState(() => Date.now())
  const dispatchWithClock = React.useCallback((action: Action) => {
    if (action.type === "set-scenario") setNow(Date.now())
    dispatch(action)
  }, [])

  const packs = React.useMemo(() => {
    if (state.scenario === "first-run") return []
    return sortPacks(
      getScenarioPacks(state.scenario).map((p) => scorePack(p, state, now))
    )
  }, [state, now])

  const value = React.useMemo(
    () => ({ state, dispatch: dispatchWithClock, packs, now }),
    [state, dispatchWithClock, packs, now]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
