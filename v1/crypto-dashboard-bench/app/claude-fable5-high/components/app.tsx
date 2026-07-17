"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  Activity,
  ClipboardList,
  Eye,
  LayoutDashboard,
  Moon,
  ShieldCheck,
  Sun,
  Table2,
  X,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

import { buildSnapshot } from "../lib/calc"
import { DEMO_CLOCK_LABEL, NO_SCENARIO, SCENARIO_PRESETS } from "../lib/data"
import { useMounted } from "../lib/theme"
import { StoreProvider, scenarioIsActive, useGlidepath, type ViewId } from "../lib/store"
import type { OrgId } from "../lib/types"
import styles from "../glidepath.module.css"
import { OverviewView } from "./views/overview"
import { PolicyView } from "./views/policy"
import { PositionsView } from "./views/positions"
import { ProposalsView } from "./views/proposals"
import { StressView } from "./views/stress"

const NAV: { id: ViewId; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "positions", label: "Positions", icon: Table2 },
  { id: "stress", label: "Stress test", icon: Activity },
  { id: "policy", label: "Policy", icon: ShieldCheck },
  { id: "proposals", label: "Proposals", icon: ClipboardList },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()
  if (!mounted) return <Button size="icon-sm" variant="ghost" aria-hidden className="opacity-0" />
  const dark = resolvedTheme === "dark"
  return (
    <Button
      size="icon-sm"
      variant="ghost"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <Sun aria-hidden /> : <Moon aria-hidden />}
    </Button>
  )
}

function ScenarioChip() {
  const { scenario, setScenario, setView } = useGlidepath()
  if (!scenarioIsActive(scenario)) return null
  const label =
    scenario.preset === "correction" || scenario.preset === "crisis"
      ? SCENARIO_PRESETS[scenario.preset].label
      : "Custom scenario"
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-foreground/30 bg-muted px-2 py-0.5 text-xs font-medium">
      <Activity aria-hidden className="size-3" />
      <button
        type="button"
        className="hover:underline"
        onClick={() => setView("stress")}
        title="Open the stress-test view"
      >
        Stress: {label}
      </button>
      <button
        type="button"
        aria-label="Clear scenario"
        className="ml-0.5 rounded-full p-0.5 hover:bg-foreground/10"
        onClick={() => setScenario(NO_SCENARIO)}
      >
        <X aria-hidden className="size-3" />
      </button>
    </span>
  )
}

function Shell() {
  const store = useGlidepath()
  const { org, orgId, setOrgId, view, setView, scenario, policy, hydrated } = store

  const snap = React.useMemo(
    () => buildSnapshot(org, scenario, policy),
    [org, scenario, policy]
  )

  const viewEl = {
    overview: <OverviewView snap={snap} />,
    positions: <PositionsView snap={snap} />,
    stress: <StressView snap={snap} />,
    policy: <PolicyView snap={snap} />,
    proposals: <ProposalsView snap={snap} />,
  }[view]

  return (
    <div className={cn(styles.root, "bg-background text-foreground")}>
      {/* Workspace bar */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="flex size-6 items-center justify-center rounded-md bg-primary font-mono text-xs font-bold text-primary-foreground"
            >
              G
            </span>
            <span className="text-sm font-semibold tracking-tight">Glidepath</span>
          </div>
          <NativeSelect
            size="sm"
            aria-label="Workspace"
            value={orgId}
            onChange={(e) => setOrgId(e.target.value as OrgId)}
          >
            <NativeSelectOption value="meridian">
              Meridian Protocol Foundation
            </NativeSelectOption>
            <NativeSelectOption value="fresh">New workspace</NativeSelectOption>
          </NativeSelect>
          <ScenarioChip />
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="outline" className="gap-1 border-dashed text-[10px] font-medium">
              <Eye aria-hidden className="size-3" />
              Demo — seeded data, not live
            </Badge>
            <ThemeToggle />
          </div>
        </div>
        {/* Mobile nav */}
        <nav
          aria-label="Primary"
          className={cn(styles.scrollRow, "flex gap-1 overflow-x-auto px-3 pb-2 md:hidden")}
        >
          {NAV.map((n) => (
            <Button
              key={n.id}
              size="sm"
              variant={view === n.id ? "secondary" : "ghost"}
              aria-current={view === n.id ? "page" : undefined}
              onClick={() => setView(n.id)}
              className="shrink-0"
            >
              <n.icon aria-hidden data-icon="inline-start" />
              {n.label}
            </Button>
          ))}
        </nav>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-4">
        {/* Desktop sidebar */}
        <nav aria-label="Primary" className="hidden w-44 shrink-0 md:block">
          <div className="sticky top-16 space-y-1">
            {NAV.map((n) => (
              <Button
                key={n.id}
                variant={view === n.id ? "secondary" : "ghost"}
                aria-current={view === n.id ? "page" : undefined}
                onClick={() => setView(n.id)}
                className="w-full justify-start"
              >
                <n.icon aria-hidden data-icon="inline-start" />
                {n.label}
              </Button>
            ))}
            <div className="pt-4 text-[11px] leading-4 text-muted-foreground">
              Read-only by design: Glidepath watches addresses, holds no keys, and never
              signs.
            </div>
          </div>
        </nav>

        <main className="min-w-0 flex-1">
          {hydrated ? (
            viewEl
          ) : (
            <div className="space-y-4" aria-busy="true" aria-label="Loading workspace">
              <Skeleton className="h-8 w-64" />
              <div className="grid gap-4 lg:grid-cols-3">
                <Skeleton className="h-80 lg:col-span-2" />
                <Skeleton className="h-80" />
              </div>
            </div>
          )}

          <footer className="mt-8 border-t pt-3 text-[11px] leading-5 text-muted-foreground">
            All data on this page is seeded and simulated for a product demo — prices,
            balances, feeds, and signatures are not live and imply nothing about real
            markets. Demo clock fixed at {DEMO_CLOCK_LABEL}. Simulated price feed follows a
            VWAP-style aggregation model. Not investment, legal, or accounting advice.
          </footer>
        </main>
      </div>
    </div>
  )
}

export function GlidepathApp() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  )
}
