"use client"

import * as React from "react"
import { Toaster } from "sonner"
import {
  ActivityIcon,
  FlaskConicalIcon,
  LayersIcon,
  ListChecksIcon,
  RotateCcwIcon,
  ServerIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { TooltipProvider } from "@/components/ui/tooltip"

import { SLA_POLICY } from "../lib/data"
import { StoreProvider, useStore } from "../lib/store"
import type { Scenario, ViewId } from "../lib/types"
import { AssetsView } from "./assets"
import { PackSheet } from "./pack-sheet"
import { QueueView } from "./queue"
import { ReportsView } from "./reports"
import styles from "../patchbay.module.css"

const emptySubscribe = () => () => {}

export default function PatchbayApp() {
  // Render after mount: demo state lives in localStorage and SLA countdowns
  // depend on the client clock, so the server render is a skeleton.
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  return (
    <div className={cn(styles.theme, styles.root)}>
      {mounted ? (
        <StoreProvider>
          <TooltipProvider delay={150}>
            <Shell />
          </TooltipProvider>
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#151b26",
                border: "1px solid rgba(226,236,255,0.12)",
                color: "#e8ecf4",
              },
            }}
          />
        </StoreProvider>
      ) : (
        <ShellSkeleton />
      )}
    </div>
  )
}

const NAV: { id: ViewId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "queue", label: "Fix Queue", icon: ListChecksIcon },
  { id: "reports", label: "Reports", icon: ActivityIcon },
  { id: "assets", label: "Assets", icon: ServerIcon },
]

const SCENARIOS: { id: Scenario; label: string; hint: string }[] = [
  { id: "first-run", label: "First run", hint: "Empty workspace, before any connector" },
  { id: "steady", label: "Steady state", hint: "A normal week: 18 fixes, healthy SLAs" },
  { id: "kev-morning", label: "KEV morning", hint: "High attention: overnight evidence change re-ranked the queue" },
]

function Shell() {
  const { state, dispatch } = useStore()
  const [view, setView] = React.useState<ViewId>("queue")
  const [openPackId, setOpenPackId] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const switchScenario = (scenario: Scenario) => {
    if (scenario === state.scenario) return
    setOpenPackId(null)
    setLoading(true)
    dispatch({ type: "set-scenario", scenario })
    window.setTimeout(() => setLoading(false), 550)
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1600px] flex-col lg:flex-row">
      {/* ——— Sidebar (desktop) / top bar (mobile) ——— */}
      <aside className="flex shrink-0 flex-col gap-3 border-b border-border bg-[#0d111a] px-4 py-3 lg:min-h-dvh lg:w-60 lg:border-r lg:border-b-0 lg:px-4 lg:py-5">
        <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="flex size-7 items-center justify-center rounded-lg bg-[#4cc2ff]/12 text-[#4cc2ff] ring-1 ring-[#4cc2ff]/30"
            >
              <LayersIcon className="size-4" />
            </span>
            <span>
              <span className="block font-heading text-[15px] leading-none font-semibold tracking-tight">
                Patchbay
              </span>
              <span className="mt-0.5 block text-[10px] text-muted-foreground">
                remediation operations
              </span>
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#e8c547]/35 bg-[#e8c547]/10 px-2 py-1 font-mono text-[10px] font-semibold text-[#e8c547]">
            <FlaskConicalIcon aria-hidden className="size-3" />
            DEMO DATA
          </span>
        </div>

        <nav aria-label="Main" className="flex gap-1 lg:mt-2 lg:flex-col">
          {NAV.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                aria-current={view === item.id ? "page" : undefined}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex-none lg:justify-start lg:py-2",
                  view === item.id
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <Icon aria-hidden className="size-4" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="hidden lg:mt-4 lg:block">
          <p className="text-[10.5px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
            SLA policy
          </p>
          <ul className="mt-2 space-y-1 font-mono text-[11px] text-muted-foreground">
            <li className="flex justify-between">
              <span className="text-[#ff5d5d]">Critical</span>
              <span>{SLA_POLICY.critical} days</span>
            </li>
            <li className="flex justify-between">
              <span className="text-[#ff9f43]">High</span>
              <span>{SLA_POLICY.high} days</span>
            </li>
            <li className="flex justify-between">
              <span className="text-[#e8c547]">Medium</span>
              <span>{SLA_POLICY.medium} days</span>
            </li>
            <li className="flex justify-between">
              <span className="text-[#8b95a7]">Low</span>
              <span>{SLA_POLICY.low} days</span>
            </li>
          </ul>
        </div>

        <div className="lg:mt-auto">
          <p className="text-[10.5px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
            Demo scenario
          </p>
          <div className="mt-2 flex gap-1 lg:flex-col">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => switchScenario(s.id)}
                aria-pressed={state.scenario === s.id}
                aria-label={`Demo scenario: ${s.label}`}
                title={s.hint}
                className={cn(
                  "flex-1 rounded-lg border px-2.5 py-1.5 text-left text-xs transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex-none",
                  state.scenario === s.id
                    ? "border-[#4cc2ff]/50 bg-[#4cc2ff]/8 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="block font-medium">{s.label}</span>
                <span className="mt-0.5 hidden text-[10.5px] leading-snug text-muted-foreground lg:block">
                  {s.hint}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => dispatch({ type: "reset" })}
            className="mt-2 inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-[11px] text-muted-foreground/70 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcwIcon aria-hidden className="size-3" />
            Reset my demo changes
          </button>
        </div>
      </aside>

      {/* ——— Main ——— */}
      <main className="flex min-w-0 flex-1 flex-col p-4 lg:p-6">
        {loading ? (
          <ViewSkeleton />
        ) : view === "queue" ? (
          // Keyed by scenario so filter state resets when the demo scenario switches.
          <QueueView key={state.scenario} onOpenPack={setOpenPackId} />
        ) : view === "reports" ? (
          <ReportsView />
        ) : (
          <AssetsView />
        )}
      </main>

      <PackSheet packId={openPackId} onClose={() => setOpenPackId(null)} />
    </div>
  )
}

function ViewSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4" aria-label="Loading" role="status">
      <div className="space-y-2">
        <Skeleton className="h-6 w-40 bg-muted" />
        <Skeleton className="h-4 w-64 bg-muted" />
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-14 bg-muted" />
        ))}
      </div>
      <div className="space-y-px overflow-hidden rounded-xl border border-border">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-none bg-card" />
        ))}
      </div>
      <span className="sr-only">Loading demo data</span>
    </div>
  )
}

function ShellSkeleton() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1600px] flex-col lg:flex-row">
      <div className="shrink-0 border-b border-border bg-[#0d111a] px-4 py-3 lg:min-h-dvh lg:w-60 lg:border-r lg:border-b-0 lg:py-5">
        <Skeleton className="h-8 w-36 bg-muted" />
      </div>
      <div className="flex-1 p-4 lg:p-6">
        <ViewSkeleton />
      </div>
    </div>
  )
}
