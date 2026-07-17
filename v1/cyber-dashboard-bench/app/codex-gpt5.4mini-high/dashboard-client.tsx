"use client"

import * as React from "react"
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Filter,
  Globe2,
  Layers3,
  LockKeyhole,
  Search,
  ShieldAlert,
  Sparkles,
  TriangleAlert,
  Undo2,
  Users,
  Zap,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import { format, parseISO } from "date-fns"
import { toast } from "sonner"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Button,
} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import {
  baseExposures,
  filterPills,
  ownerBacklogSeed,
  ownerOptions,
  signalCoverage,
  trendSeries,
  type Exposure,
  type ExposureStatus,
} from "./demo-data"
import { Toaster } from "@/components/ui/sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type FilterId = (typeof filterPills)[number]["id"]

type ExposureView = Exposure & {
  note: string
  queueScore: number
}

const STORAGE_KEY = "aegis-exposure-board-state"

type PersistedState = {
  selectedId: string
  filterId: FilterId
  search: string
  showClosed: boolean
  statusOverrides: Record<string, ExposureStatus>
  ownerOverrides: Record<string, string>
  noteOverrides: Record<string, string>
  historyOverrides: Record<string, Exposure["history"]>
}

const defaultState: PersistedState = {
  selectedId: baseExposures[0]?.id ?? "",
  filterId: "all",
  search: "",
  showClosed: false,
  statusOverrides: {},
  ownerOverrides: {},
  noteOverrides: {},
  historyOverrides: {},
}

const stateLabels: Record<ExposureStatus, string> = {
  open: "Open",
  assigned: "Assigned",
  mitigating: "Mitigating",
  resolved: "Resolved",
  suppressed: "Suppressed",
}

const statusTone: Record<
  ExposureStatus,
  "default" | "secondary" | "outline" | "destructive" | "ghost"
> = {
  open: "destructive",
  assigned: "secondary",
  mitigating: "outline",
  resolved: "default",
  suppressed: "ghost",
}

function loadState(): PersistedState {
  if (typeof window === "undefined") {
    return defaultState
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return defaultState
    }
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    return {
      ...defaultState,
      ...parsed,
      statusOverrides: parsed.statusOverrides ?? {},
      ownerOverrides: parsed.ownerOverrides ?? {},
      noteOverrides: parsed.noteOverrides ?? {},
      historyOverrides: parsed.historyOverrides ?? {},
    }
  } catch {
    return defaultState
  }
}

function formatDateLabel(dateString: string) {
  return format(parseISO(dateString), "MMM d, HH:mm")
}

function computeQueueScore(exposure: Exposure, status: ExposureStatus) {
  const risk =
    exposure.criticality * 0.32 +
    exposure.epss * 37 +
    (exposure.kev ? 18 : 0) +
    (exposure.internetFacing ? 11 : 0) +
    exposure.attackPathDepth * 4.8 +
    (exposure.owner === "Unassigned" ? 8 : 0) +
    Math.max(0, (14 - exposure.ageDays) * 0.7)

  const statePenalty = {
    open: 0,
    assigned: -4,
    mitigating: -10,
    resolved: -30,
    suppressed: -26,
  }[status]

  return Math.max(0, Math.round(risk + statePenalty))
}

function exposureReasonChips(exposure: Exposure, status: ExposureStatus) {
  const chips = [...exposure.signals]
  chips.push(stateLabels[status])
  chips.push(`${exposure.criticality} criticality`)
  return chips
}

function exposurePathText(exposure: Exposure) {
  if (exposure.attackPathDepth >= 5) {
    return "Internet or identity gap -> reachable workload -> privileged path -> crown-jewel asset"
  }
  if (exposure.internetFacing) {
    return "External reachability -> exposed service -> privileged context -> data or control plane"
  }
  return "Internal foothold -> lateral move -> privileged asset -> sensitive resource"
}

function ownerSummary(items: Exposure[]) {
  const entries = Object.entries(
    items.reduce<Record<string, { owner: string; team: string; open: number; overdue: number }>>(
      (acc, item) => {
        const key = item.owner
        if (!acc[key]) {
          acc[key] = { owner: item.owner, team: item.team, open: 0, overdue: 0 }
        }
        if (item.status !== "resolved" && item.status !== "suppressed") {
          acc[key].open += 1
        }
        if (item.dueInHours < 0 && item.status !== "resolved" && item.status !== "suppressed") {
          acc[key].overdue += 1
        }
        return acc
      },
      {}
    )
  )
    .map(([, value]) => value)
    .sort((a, b) => b.open - a.open || a.owner.localeCompare(b.owner))

  return ownerBacklogSeed.map((seed) => {
    const found = entries.find((entry) => entry.owner === seed.owner)
    return found
      ? {
          owner: seed.owner,
          team: found.team,
          open: found.open,
          overdue: found.overdue,
          nextDue: seed.nextDue,
          theme: seed.theme,
        }
      : seed
  })
}

function severityLabel(score: number) {
  if (score >= 90) return "Critical"
  if (score >= 75) return "High"
  if (score >= 55) return "Elevated"
  return "Moderate"
}

function scoreTone(score: number) {
  if (score >= 90) return "text-rose-300"
  if (score >= 75) return "text-amber-300"
  if (score >= 55) return "text-cyan-300"
  return "text-emerald-300"
}

function chipClass(color: string) {
  return cn(
    "rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide",
    color
  )
}

export default function DashboardClient() {
  const [state, setState] = React.useState<PersistedState>(() => loadState())
  const [detailTab, setDetailTab] = React.useState("overview")

  React.useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Demo storage is best effort.
    }
  }, [state])

  const exposures = React.useMemo<ExposureView[]>(() => {
    return baseExposures.map((exposure) => {
      const status = state.statusOverrides[exposure.id] ?? exposure.status
      const owner = state.ownerOverrides[exposure.id] ?? exposure.owner
      const note = state.noteOverrides[exposure.id] ?? ""
      return {
        ...exposure,
        status,
        owner,
        note,
        queueScore: computeQueueScore({ ...exposure, owner }, status),
      }
    })
  }, [state.noteOverrides, state.ownerOverrides, state.statusOverrides])

  const filtered = React.useMemo(() => {
    const search = state.search.trim().toLowerCase()
    return exposures
      .filter((item) => (state.showClosed ? true : item.status !== "resolved" && item.status !== "suppressed"))
      .filter((item) => {
        if (state.filterId === "kev") return item.kev
        if (state.filterId === "internet") return item.internetFacing
        if (state.filterId === "unowned") return item.owner === "Unassigned"
        if (state.filterId === "breach") return item.dueInHours < 0 && item.status !== "resolved" && item.status !== "suppressed"
        if (state.filterId === "critical") return item.queueScore >= 90
        return true
      })
      .filter((item) => {
        if (!search) return true
        return [item.title, item.asset, item.owner, item.team, item.source, item.control, item.summary]
          .join(" ")
          .toLowerCase()
          .includes(search)
      })
      .sort((a, b) => b.queueScore - a.queueScore || a.title.localeCompare(b.title))
  }, [exposures, state.filterId, state.search, state.showClosed])

  const selectedId = React.useMemo(() => {
    if (filtered.some((item) => item.id === state.selectedId)) {
      return state.selectedId
    }
    return filtered[0]?.id ?? exposures[0]?.id ?? ""
  }, [exposures, filtered, state.selectedId])

  const selected = React.useMemo<ExposureView | undefined>(
    () => exposures.find((item) => item.id === selectedId) ?? exposures[0],
    [exposures, selectedId]
  )

  const selectedHistory = selected
    ? [...selected.history, ...(state.historyOverrides[selected.id] ?? [])]
    : []

  const criticalUnresolved = exposures.filter(
    (item) => item.queueScore >= 90 && item.status !== "resolved" && item.status !== "suppressed"
  )
  const overdue = exposures.filter(
    (item) => item.dueInHours < 0 && item.status !== "resolved" && item.status !== "suppressed"
  )
  const openCount = exposures.filter((item) => item.status !== "resolved" && item.status !== "suppressed").length
  const ownerCoverage =
    Math.round(
      (exposures.filter((item) => item.owner !== "Unassigned").length / Math.max(1, exposures.length)) * 100
    )
  const resolutionRate = Math.round(
    (exposures.filter((item) => item.status === "resolved").length / Math.max(1, exposures.length)) * 100
  )
  const medianRisk = Math.round(
    exposures
      .filter((item) => item.status !== "resolved" && item.status !== "suppressed")
      .reduce((sum, item) => sum + item.queueScore, 0) / Math.max(1, openCount)
  )
  const ownerRows = ownerSummary(exposures)
  const openBySignal = [
    { name: "KEV", value: exposures.filter((item) => item.kev && item.status !== "resolved" && item.status !== "suppressed").length },
    { name: "Internet", value: exposures.filter((item) => item.internetFacing && item.status !== "resolved" && item.status !== "suppressed").length },
    { name: "Unowned", value: exposures.filter((item) => item.owner === "Unassigned" && item.status !== "resolved" && item.status !== "suppressed").length },
    { name: "SLA breach", value: overdue.length },
  ]

  const chartConfig = {
    open: { label: "Open queue", color: "hsl(199 89% 48%)" },
    resolved: { label: "Resolved", color: "hsl(142 71% 45%)" },
    risk: { label: "Risk", color: "hsl(38 92% 50%)" },
  } as const

  function persistPatch(patch: Partial<PersistedState>) {
    setState((current) => ({ ...current, ...patch }))
  }

  function updateExposure(id: string, patch: Partial<{ status: ExposureStatus; owner: string; note: string }>, message: string) {
    const action =
      patch.status === "resolved"
        ? "Resolved"
        : patch.status === "suppressed"
          ? "Suppressed"
          : patch.status === "mitigating"
            ? "Mitigation started"
            : patch.status === "assigned"
              ? "Assigned"
              : "Updated"

    const detail = [
      patch.owner ? `Owner set to ${patch.owner}.` : null,
      patch.status ? `Status moved to ${stateLabels[patch.status]}.` : null,
      patch.note ? "A new note was saved to the audit trail." : null,
    ]
      .filter(Boolean)
      .join(" ")

    setState((current) => ({
      ...current,
      statusOverrides:
        patch.status === undefined
          ? current.statusOverrides
          : { ...current.statusOverrides, [id]: patch.status },
      ownerOverrides:
        patch.owner === undefined
          ? current.ownerOverrides
          : { ...current.ownerOverrides, [id]: patch.owner },
      noteOverrides:
        patch.note === undefined
          ? current.noteOverrides
          : { ...current.noteOverrides, [id]: patch.note },
      historyOverrides: {
        ...current.historyOverrides,
        [id]: [
          ...(current.historyOverrides[id] ?? []),
          {
            at: new Date().toISOString(),
            actor: "Aegis operator",
            action,
            detail,
          },
        ],
      },
    }))
    toast.success(message)
  }

  function resetDemo() {
    setState(defaultState)
    setDetailTab("overview")
    window.localStorage.removeItem(STORAGE_KEY)
    toast.info("Demo state reset to the seeded backlog.")
  }

  return (
    <main className="relative flex flex-1 flex-col gap-5">
      <Toaster position="top-right" richColors closeButton />

      <section className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/70 p-5 shadow-[0_24px_80px_rgba(2,6,23,0.55)] backdrop-blur md:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-cyan-400/30 bg-cyan-400/10 text-cyan-100">
                Demo data only
              </Badge>
              <Badge variant="outline" className="border-amber-400/30 bg-amber-400/10 text-amber-100">
                Exposure management
              </Badge>
              <Badge variant="outline" className="border-white/15 bg-white/5 text-slate-200">
                No live integrations
              </Badge>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-200/70">
                Aegis Exposure Board
              </p>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl xl:text-5xl">
                Fix the exposures that are already exploitable, externally reachable, and attached to critical assets.
              </h1>
              <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                One queue for cloud posture, vulnerability, and identity exposures. Every item is ranked by exploitability, explained in plain language, and routed to an owner with an auditable trail.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={resetDemo}>
                <Undo2 className="size-3.5" />
                Reset demo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.message("Snapshot copied as a demo action.")}
              >
                <Sparkles className="size-3.5" />
                Executive snapshot
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  persistPatch({ filterId: "kev", showClosed: false })
                  toast.info("Showing only KEV-linked unresolved exposures.")
                }}
              >
                <ShieldAlert className="size-3.5" />
                Show KEV only
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:w-[460px] xl:grid-cols-1">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Current posture</p>
                <Activity className="size-4 text-cyan-300" />
              </div>
              <div className="mt-3 flex items-end gap-2">
                <span className={cn("text-4xl font-semibold tabular-nums", scoreTone(medianRisk))}>{medianRisk}</span>
                <span className="pb-1 text-sm text-slate-400">median queue score</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                {criticalUnresolved.length} critical unresolved items and {overdue.length} overdue exposures need owner action.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Owner coverage</p>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-4xl font-semibold tabular-nums text-emerald-300">{ownerCoverage}%</span>
                <span className="pb-1 text-sm text-slate-400">named</span>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Coverage</span>
                  <span>{ownerCoverage}%</span>
                </div>
                <Progress value={ownerCoverage} />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Closed loop</p>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-4xl font-semibold tabular-nums text-cyan-300">{resolutionRate}%</span>
                <span className="pb-1 text-sm text-slate-400">resolved</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                Resolved items fall out of the active queue and stay in the audit trail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {criticalUnresolved.length > 0 && (
        <Alert variant="destructive" className="border-rose-400/30 bg-rose-500/10 text-rose-50">
          <TriangleAlert className="size-4" />
          <AlertTitle>
            {criticalUnresolved.length} unresolved critical exposures are still in the queue
          </AlertTitle>
          <AlertDescription className="text-rose-100/90">
            The top item is past due. Aegis keeps the reason code visible so the analyst can defend the rank and route it to the right team.
          </AlertDescription>
        </Alert>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Open exposures"
          value={openCount}
          detail={`${criticalUnresolved.length} critical, ${overdue.length} overdue`}
          icon={<Layers3 className="size-4 text-cyan-300" />}
          tone="text-white"
        />
        <MetricCard
          title="Highest queue score"
          value={filtered[0]?.queueScore ?? 0}
          detail={filtered[0] ? severityLabel(filtered[0].queueScore) : "No matches"}
          icon={<Zap className="size-4 text-amber-300" />}
          tone={scoreTone(filtered[0]?.queueScore ?? 0)}
        />
        <MetricCard
          title="KEV-linked items"
          value={exposures.filter((item) => item.kev && item.status !== "resolved" && item.status !== "suppressed").length}
          detail="Prioritized using active exploitation"
          icon={<ShieldAlert className="size-4 text-rose-300" />}
          tone="text-rose-200"
        />
        <MetricCard
          title="Queue freshness"
          value={`${Math.max(...exposures.map((item) => item.ageDays))}d`}
          detail="Oldest unresolved exposure"
          icon={<Clock3 className="size-4 text-emerald-300" />}
          tone="text-emerald-200"
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.18fr)_minmax(0,1fr)_minmax(300px,0.8fr)]">
        <Card className="border-white/10 bg-slate-950/70 shadow-[0_18px_70px_rgba(2,6,23,0.35)]">
          <CardHeader className="border-b border-white/10 pb-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="text-white">Prioritized queue</CardTitle>
                <CardDescription className="text-slate-400">
                  Ranked by active exploitation, exposure, criticality, and owner quality.
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <Filter className="size-3.5 text-slate-400" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Filters</span>
                </div>
                <Select
                  value={state.filterId}
                  onValueChange={(value) => persistPatch({ filterId: value as FilterId })}
                >
                  <SelectTrigger size="sm" className="border-white/10 bg-white/5 text-slate-200">
                    <SelectValue placeholder="All exposure" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterPills.map((pill) => (
                      <SelectItem key={pill.id} value={pill.id}>
                        {pill.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <Switch
                    checked={state.showClosed}
                    onCheckedChange={(checked) => persistPatch({ showClosed: checked })}
                  />
                  <span className="text-xs text-slate-300">Show closed</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                <Input
                  value={state.search}
                  onChange={(event) => persistPatch({ search: event.target.value })}
                  placeholder="Search title, asset, owner, or signal"
                  className="h-9 border-white/10 bg-white/5 pl-9 text-slate-100 placeholder:text-slate-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {filterPills.slice(1).map((pill) => {
                  const active = state.filterId === pill.id
                  return (
                    <Button
                      key={pill.id}
                      size="sm"
                      variant={active ? "default" : "outline"}
                      className={cn(
                        "justify-start border-white/10",
                        active ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300" : "bg-white/5 text-slate-200"
                      )}
                      onClick={() => persistPatch({ filterId: pill.id })}
                    >
                      {pill.label}
                    </Button>
                  )
                })}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center p-10 text-center">
                <div className="rounded-full border border-dashed border-white/15 bg-white/5 p-4">
                  <Filter className="size-6 text-slate-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">No exposures match this view</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  Clear the search, switch filters, or turn on closed items to bring the backlog back into view.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                  onClick={() => persistPatch({ search: "", filterId: "all", showClosed: false })}
                >
                  Reset queue
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-[560px]">
                <div className="grid gap-3 p-4">
                  {filtered.map((exposure, index) => {
                    const selectedRow = exposure.id === selectedId
                    return (
                      <button
                        key={exposure.id}
                        type="button"
                        onClick={() => setState((current) => ({ ...current, selectedId: exposure.id }))}
                        className={cn(
                          "group rounded-2xl border p-4 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60",
                          selectedRow
                            ? "border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_0_1px_rgba(34,211,238,0.35)]"
                            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                        )}
                        aria-pressed={selectedRow}
                      >
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-medium text-white">
                                {index + 1}. {exposure.title}
                              </span>
                              <Badge variant={statusTone[exposure.status]} className="capitalize">
                                {stateLabels[exposure.status]}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                              <span>{exposure.asset}</span>
                              <span>•</span>
                              <span>{exposure.team}</span>
                              <span>•</span>
                              <span>{exposure.source}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {exposureReasonChips(exposure, exposure.status).map((chip) => (
                                <span key={chip} className={chipClass("border-white/10 bg-white/5 text-slate-200")}>
                                  {chip}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="min-w-[160px] space-y-2 lg:text-right">
                            <div>
                              <div className={cn("text-2xl font-semibold tabular-nums", scoreTone(exposure.queueScore))}>
                                {exposure.queueScore}
                              </div>
                              <div className="text-xs uppercase tracking-[0.22em] text-slate-500">queue score</div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs text-slate-400">
                                <span>{severityLabel(exposure.queueScore)}</span>
                                <span>
                                  due{" "}
                                  {exposure.dueInHours < 0
                                    ? `${Math.abs(exposure.dueInHours)}h overdue`
                                    : `in ${exposure.dueInHours}h`}
                                </span>
                              </div>
                              <Progress value={Math.min(100, exposure.queueScore)} />
                            </div>
                            <p className="text-xs text-slate-400">
                              {exposure.owner}
                              <span className="mx-1 text-slate-600">•</span>
                              {exposure.internetFacing ? "Externally reachable" : "Internal only"}
                            </p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-slate-950/70 shadow-[0_18px_70px_rgba(2,6,23,0.35)]">
          <CardHeader className="border-b border-white/10 pb-4">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-white">Exposure detail</CardTitle>
              <CardDescription className="text-slate-400">
                Why this item ranks here, what it touches, and what to do next.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            {selected ? (
              <>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={statusTone[selected.status]} className="capitalize">
                          {stateLabels[selected.status]}
                        </Badge>
                        <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                          {selected.environment}
                        </Badge>
                        <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                          {selected.source}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-white">{selected.title}</h3>
                      <p className="max-w-2xl text-sm leading-6 text-slate-300">{selected.summary}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 text-right">
                      <div className="text-3xl font-semibold tabular-nums text-white">{selected.queueScore}</div>
                      <div className="text-xs uppercase tracking-[0.22em] text-slate-500">selected score</div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    {[
                      ["Owner", selected.owner],
                      ["Asset", selected.asset],
                      ["Team", selected.team],
                      ["Control", selected.control],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
                        <p className="mt-1 text-sm text-slate-100">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Tabs value={detailTab} onValueChange={setDetailTab}>
                  <TabsList className="w-full justify-start bg-white/5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="evidence">Evidence</TabsTrigger>
                    <TabsTrigger value="remediation">Remediation</TabsTrigger>
                    <TabsTrigger value="audit">Audit</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-4 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Why this is first</p>
                          <p className="mt-1 text-sm text-slate-300">
                            Aegis blends active exploitation, internet exposure, criticality, and ownership quality.
                          </p>
                        </div>
                        <Badge variant="outline" className="border-rose-400/30 bg-rose-500/10 text-rose-100">
                          {selected.dueInHours < 0 ? "Past due" : "Within SLA"}
                        </Badge>
                      </div>

                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Risk breakdown</p>
                          <div className="mt-3 space-y-2">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs text-slate-400">
                                <span>Composite score</span>
                                <span>{selected.queueScore}/100</span>
                              </div>
                              <Progress value={selected.queueScore} />
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {exposureReasonChips(selected, selected.status).map((chip) => (
                                <span key={chip} className={chipClass("border-cyan-400/15 bg-cyan-400/10 text-cyan-100")}>
                                  {chip}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Attack path</p>
                          <p className="mt-2 text-sm leading-6 text-slate-300">{exposurePathText(selected)}</p>
                          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                            <Globe2 className="size-4 text-cyan-300" />
                            {selected.internetFacing ? "Externally reachable" : "Reachable only from internal networks"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="grid gap-3 md:grid-cols-3">
                        {[
                          ["EPSS", `${Math.round(selected.epss * 100)}%`],
                          ["Criticality", `${selected.criticality}/100`],
                          ["Blast radius", selected.blastRadius],
                        ].map(([label, value]) => (
                          <div key={label} className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
                            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{label}</p>
                            <p className="mt-1 text-sm text-slate-100">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="evidence" className="mt-4 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Evidence snapshot</p>
                      <div className="mt-3 grid gap-3">
                        {[
                          ["CVE", selected.cve],
                          ["First seen", formatDateLabel(selected.firstSeen)],
                          ["Last seen", formatDateLabel(selected.lastSeen)],
                          ["Source", selected.source],
                        ].map(([label, value]) => (
                          <div key={label} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm">
                            <span className="text-slate-400">{label}</span>
                            <span className="font-mono text-slate-100">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Current signals</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {selected.signals.map((signal) => (
                          <span key={signal} className={chipClass("border-white/10 bg-white/5 text-slate-200")}>
                            {signal}
                          </span>
                        ))}
                      </div>
                      <Separator className="my-4 bg-white/10" />
                      <div className="space-y-2 text-sm leading-6 text-slate-300">
                        {selected.fixes.map((fix) => (
                          <div key={fix} className="flex items-start gap-2">
                            <ArrowRight className="mt-1 size-4 text-cyan-300" />
                            <span>{fix}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="remediation" className="mt-4 space-y-4">
                    <RemediationForm
                      key={selected.id}
                      selected={selected}
                      onSave={updateExposure}
                    />
                  </TabsContent>

                  <TabsContent value="audit" className="mt-4 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Audit trail</p>
                      <div className="mt-3 space-y-3">
                        {selectedHistory.map((entry) => (
                          <div key={`${entry.at}-${entry.action}`} className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                                  {entry.action}
                                </Badge>
                                <span className="text-sm text-slate-100">{entry.actor}</span>
                              </div>
                              <span className="text-xs text-slate-500">{formatDateLabel(entry.at)}</span>
                            </div>
                            <p className="mt-2 text-sm leading-6 text-slate-300">{entry.detail}</p>
                          </div>
                        ))}
                        {selected.note ? (
                          <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3">
                            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Latest note</p>
                            <p className="mt-2 text-sm leading-6 text-slate-100">{selected.note}</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div className="flex min-h-[560px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 p-6 text-center">
                <div className="rounded-full border border-white/10 bg-slate-950/70 p-4">
                  <ShieldAlert className="size-6 text-amber-300" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">Pick an exposure to inspect</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  The detail panel keeps the evidence, remediation plan, and audit trail in one place so the analyst can defend the ranking.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-5">
          <Card className="border-white/10 bg-slate-950/70 shadow-[0_18px_70px_rgba(2,6,23,0.35)]">
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-white">Exposure trend</CardTitle>
              <CardDescription className="text-slate-400">
                Burn-down is the headline metric. Scores are synthetic, but the workflow mirrors a live program.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer
                config={chartConfig}
                className="h-[220px] w-full"
              >
                <AreaChart data={trendSeries} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={30} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <Area
                    type="monotone"
                    dataKey="open"
                    stroke="var(--color-open)"
                    fill="var(--color-open)"
                    fillOpacity={0.22}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    stroke="var(--color-resolved)"
                    fill="var(--color-resolved)"
                    fillOpacity={0.18}
                    strokeWidth={2}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-950/70 shadow-[0_18px_70px_rgba(2,6,23,0.35)]">
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-white">Signal mix</CardTitle>
              <CardDescription className="text-slate-400">
                The queue is driven by exploitation and ownership signals, not by raw count alone.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer
                config={{
                  value: { label: "Open items", color: "hsl(38 92% 55%)" },
                }}
                className="h-[220px] w-full"
              >
                <BarChart data={openBySignal} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} width={30} />
                  <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
                  <Bar dataKey="value" radius={[10, 10, 10, 10]} fill="var(--color-value)" />
                </BarChart>
              </ChartContainer>
              <div className="mt-3 flex flex-wrap gap-2">
                {signalCoverage.map((signal) => (
                  <span key={signal.name} className={chipClass("border-white/10 bg-white/5 text-slate-200")}>
                    {signal.name}: {signal.value}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-950/70 shadow-[0_18px_70px_rgba(2,6,23,0.35)]">
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-white">Owner backlog</CardTitle>
              <CardDescription className="text-slate-400">
                The queue only becomes actionable when exposures are routed to people with ownership.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-slate-400">Owner</TableHead>
                    <TableHead className="text-slate-400">Team</TableHead>
                    <TableHead className="text-slate-400">Open</TableHead>
                    <TableHead className="text-slate-400">Overdue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ownerRows.map((row) => (
                    <TableRow key={row.owner} className="border-white/10">
                      <TableCell className="text-slate-100">
                        <div className="font-medium">{row.owner}</div>
                        <div className="text-xs text-slate-500">{row.theme}</div>
                      </TableCell>
                      <TableCell className="text-slate-300">{row.team}</TableCell>
                      <TableCell className="text-slate-100">{row.open}</TableCell>
                      <TableCell className={cn(row.overdue > 0 ? "text-rose-300" : "text-slate-100")}>
                        {row.overdue}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Card className="border-white/10 bg-slate-950/70 shadow-[0_18px_70px_rgba(2,6,23,0.35)]">
          <CardHeader className="border-b border-white/10 pb-4">
            <CardTitle className="text-white">What the queue must answer</CardTitle>
            <CardDescription className="text-slate-400">
              This surfaces the security conversation the product is built to support.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 p-4 md:grid-cols-2">
            {[
              {
                icon: <CheckCircle2 className="size-4 text-emerald-300" />,
                title: "Which item should we fix first?",
                body: "The queue ranks by active exploitation, internet exposure, criticality, and ownership quality.",
              },
              {
                icon: <CircleAlert className="size-4 text-amber-300" />,
                title: "Why did this outrank everything else?",
                body: "Each item exposes its reason code, not just a composite score.",
              },
              {
                icon: <Users className="size-4 text-cyan-300" />,
                title: "Who owns it?",
                body: "Assignment, status, and notes persist so teams can work the backlog collaboratively.",
              },
              {
                icon: <LockKeyhole className="size-4 text-rose-300" />,
                title: "What proves it is fixed?",
                body: "The audit trail and evidence panel stay attached to the selected exposure.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <h3 className="text-sm font-medium text-white">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-slate-950/70 shadow-[0_18px_70px_rgba(2,6,23,0.35)]">
          <CardHeader className="border-b border-white/10 pb-4">
            <CardTitle className="text-white">Program notes</CardTitle>
            <CardDescription className="text-slate-400">
              Production intent, but fully seeded and local for evaluation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-4 text-sm leading-6 text-slate-300">
            <p>
              This demo intentionally blends the cues that modern exposure platforms emphasize: exploitability, attack path depth, ownership, and remediation proof.
            </p>
            <p>
              The product is designed to land as a focused module and expand into ticketing, policy exceptions, executive exports, and broader attack-path analytics.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Current selected item</p>
              <p className="mt-2 text-base font-medium text-white">{selected?.title}</p>
              <p className="mt-2 text-sm text-slate-400">
                {selected?.owner} • {selected?.team} • {selected?.environment}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

function MetricCard({
  title,
  value,
  detail,
  icon,
  tone,
}: {
  title: string
  value: number | string
  detail: string
  icon: React.ReactNode
  tone: string
}) {
  return (
    <Card className="border-white/10 bg-slate-950/70 shadow-[0_18px_70px_rgba(2,6,23,0.35)]">
      <CardContent className="flex items-start justify-between gap-4 p-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{title}</p>
          <div className={cn("text-3xl font-semibold tabular-nums", tone)}>{value}</div>
          <p className="text-sm text-slate-400">{detail}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">{icon}</div>
      </CardContent>
    </Card>
  )
}

function RemediationForm({
  selected,
  onSave,
}: {
  selected: ExposureView
  onSave: (
    id: string,
    patch: Partial<{ status: ExposureStatus; owner: string; note: string }>,
    message: string
  ) => void
}) {
  const [owner, setOwner] = React.useState<string>(selected.owner)
  const [status, setStatus] = React.useState<ExposureStatus>(selected.status)
  const [note, setNote] = React.useState(selected.note ?? "")

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Assign owner</p>
          <Select
            value={owner}
            onValueChange={(value) => setOwner((value ?? "Unassigned") as string)}
          >
            <SelectTrigger className="mt-2 w-full border-white/10 bg-slate-950/60 text-slate-100">
              <SelectValue placeholder="Choose owner" />
            </SelectTrigger>
            <SelectContent>
              {ownerOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Set state</p>
          <Select value={status} onValueChange={(value) => setStatus(value as ExposureStatus)}>
            <SelectTrigger className="mt-2 w-full border-white/10 bg-slate-950/60 text-slate-100">
              <SelectValue placeholder="Choose status" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(stateLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Note</p>
        <Textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Add context for the owner, the evidence, or the verification step."
          className="mt-2 min-h-28 border-white/10 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          onClick={() => {
            onSave(
              selected.id,
              { owner, status, note },
              "Owner, status, and note saved."
            )
          }}
        >
          Save changes
        </Button>
        <Button
          variant="outline"
          className="border-white/10 bg-white/5 text-slate-100"
          onClick={() => {
            onSave(
              selected.id,
              { status: "mitigating", owner, note },
              "Exposure moved to mitigation."
            )
          }}
        >
          Start mitigation
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            onSave(
              selected.id,
              { status: "resolved", owner, note },
              "Exposure marked resolved."
            )
          }}
        >
          Mark resolved
        </Button>
        <Button
          variant="ghost"
          className="text-slate-200 hover:bg-white/10 hover:text-white"
          onClick={() => {
            onSave(
              selected.id,
              { status: "suppressed", note },
              "Exposure suppressed with context."
            )
          }}
        >
          Suppress
        </Button>
      </div>
    </div>
  )
}
