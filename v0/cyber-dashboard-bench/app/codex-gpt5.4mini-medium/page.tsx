"use client"

import { useEffect, useRef, useState } from "react"
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  GitBranch,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import { demoData, type Exposure, type ExposureStatus } from "./demo-data"
import styles from "./styles.module.css"

const STORAGE_KEY = "breakchain-demo-state-v1"

type FilterKey = "all" | "open" | "in_progress" | "accepted" | "done"

type PersistedState = {
  selectedId: string
  filter: FilterKey
  statuses: Record<string, ExposureStatus>
  notes: Record<string, string>
}

const filterOptions: { value: FilterKey; label: string; helper: string }[] = [
  { value: "all", label: "All work", helper: "Everything still in view" },
  { value: "open", label: "Open queue", helper: "Queued, active, and review items" },
  { value: "in_progress", label: "In progress", helper: "Work actively being handled" },
  { value: "accepted", label: "Accepted", helper: "Approved risk with reason" },
  { value: "done", label: "Resolved", helper: "Verified and closed items" },
]

function getInitialStatuses(exposures: Exposure[]) {
  return exposures.reduce<Record<string, ExposureStatus>>((acc, exposure) => {
    acc[exposure.id] = exposure.status
    return acc
  }, {})
}

function getRiskTone(severity: Exposure["severity"]) {
  if (severity === "critical") return "text-rose-300"
  if (severity === "high") return "text-amber-300"
  return "text-sky-300"
}

function getStatusLabel(status: ExposureStatus) {
  switch (status) {
    case "queued":
      return "Queued"
    case "in_progress":
      return "In progress"
    case "review":
      return "In review"
    case "accepted":
      return "Accepted"
    case "done":
      return "Done"
  }
}

function getStatusTone(status: ExposureStatus) {
  switch (status) {
    case "queued":
      return "outline"
    case "in_progress":
      return "secondary"
    case "review":
      return "outline"
    case "accepted":
      return "ghost"
    case "done":
      return "default"
  }
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function formatExposureMetric(exposure: Exposure) {
  const band = exposure.severity === "critical" ? "Critical" : exposure.severity === "high" ? "High" : "Medium"
  return `${band} · ${exposure.priorityScore}/100`
}

function StatusDot({ status }: { status: ExposureStatus }) {
  const color =
    status === "done"
      ? "bg-emerald-400"
      : status === "accepted"
        ? "bg-slate-400"
        : status === "review"
          ? "bg-amber-400"
          : status === "in_progress"
            ? "bg-sky-400"
            : "bg-rose-400"

  return <span className={cn("inline-block size-2 rounded-full", color)} />
}

export default function Page() {
  const exposures = demoData.exposures
  const initialStatuses = getInitialStatuses(exposures)
  const hydratedRef = useRef(false)
  const [filter, setFilter] = useState<FilterKey>("open")
  const [selectedId, setSelectedId] = useState(exposures[0]?.id ?? "")
  const [statuses, setStatuses] = useState<Record<string, ExposureStatus>>(initialStatuses)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [draftNote, setDraftNote] = useState("")
  const [search, setSearch] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        hydratedRef.current = true
        return
      }
      const parsed = JSON.parse(raw) as Partial<PersistedState>

      const timeout = window.setTimeout(() => {
        if (parsed.filter && filterOptions.some((item) => item.value === parsed.filter)) {
          setFilter(parsed.filter)
        }
        if (parsed.selectedId) {
          setSelectedId(parsed.selectedId)
        }
        if (parsed.statuses) {
          setStatuses((current) => ({ ...current, ...parsed.statuses }))
        }
        if (parsed.notes) {
          setNotes(parsed.notes)
        }
        hydratedRef.current = true
      }, 0)

      return () => window.clearTimeout(timeout)
    } catch {
      // Ignore corrupted demo state and keep the seeded values.
      hydratedRef.current = true
    }
  }, [])

  useEffect(() => {
    if (!hydratedRef.current) return
    const payload: PersistedState = {
      selectedId,
      filter,
      statuses,
      notes,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }, [filter, notes, selectedId, statuses])

  const exposuresWithState = exposures.map((exposure) => ({
    ...exposure,
    status: statuses[exposure.id] ?? exposure.status,
    noteDraft: notes[exposure.id] ?? "",
  }))

  const visibleExposures = exposuresWithState.filter((exposure) => {
    const matchesSearch =
      search.trim().length === 0 ||
      [exposure.title, exposure.asset, exposure.team, exposure.owner, exposure.attackPath, exposure.businessImpact]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "open"
          ? exposure.status === "queued" || exposure.status === "in_progress" || exposure.status === "review"
          : exposure.status === filter

    return matchesSearch && matchesFilter
  })

  const selectedExposure =
    visibleExposures.find((item) => item.id === selectedId) ??
    visibleExposures[0] ??
    exposuresWithState[0]

  const queueMetrics = {
    critical: exposuresWithState.filter((item) => item.severity === "critical" && item.status !== "done").length,
    inProgress: exposuresWithState.filter((item) => item.status === "in_progress" || item.status === "review").length,
    accepted: exposuresWithState.filter((item) => item.status === "accepted").length,
    done: exposuresWithState.filter((item) => item.status === "done").length,
  }

  const topRisk = [...exposuresWithState]
    .filter((item) => item.status !== "done")
    .sort((a, b) => b.priorityScore - a.priorityScore)[0]

  const currentNote = notes[selectedExposure?.id ?? ""]
  const selectedTraceNotes = selectedExposure
    ? [
        ...selectedExposure.notes,
        ...(currentNote
          ? [
              {
                author: "Local note",
                role: "Saved in demo state",
                at: "Now",
                note: currentNote,
              },
            ]
          : []),
      ]
    : []

  function updateStatus(id: string, status: ExposureStatus) {
    setStatuses((current) => ({ ...current, [id]: status }))
  }

  function addNote() {
    if (!selectedExposure || !draftNote.trim()) return
    const note = draftNote.trim()
    setNotes((current) => ({
      ...current,
      [selectedExposure.id]: current[selectedExposure.id]
        ? `${current[selectedExposure.id]}\n${note}`
        : note,
    }))
    setDraftNote("")
  }

  async function copyBriefing() {
    if (!selectedExposure) return
    const summary = [
      `Exposure: ${selectedExposure.title}`,
      `Asset: ${selectedExposure.asset}`,
      `Priority: ${selectedExposure.priorityScore}/100`,
      `Why now: ${selectedExposure.whyNow}`,
      `Recommended fix: ${selectedExposure.recommendedFixes[0]}`,
    ].join("\n")
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    }
  }

  function resetDemo() {
    setStatuses(initialStatuses)
    setNotes({})
    setFilter("open")
    setSearch("")
    setSelectedId(exposures[0]?.id ?? "")
    window.localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 pb-10 pt-4 text-slate-100 sm:px-6 lg:px-8">
      <header className="panelGlow overflow-hidden rounded-[28px] border border-white/10 bg-[#07111b]/88 shadow-[0_20px_80px_rgba(2,6,23,0.4)] backdrop-blur-xl">
        <div className="noise grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.35fr_0.85fr] lg:gap-8 lg:p-8">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
                Demo data only
              </Badge>
              <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                Exposure management
              </Badge>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.28em] text-slate-300">
                BreakChain
              </span>
            </div>

            <div className="max-w-3xl space-y-3">
              <p className="text-xs uppercase tracking-[0.36em] text-slate-400">
                {demoData.orgName} / {demoData.segment}
              </p>
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Prioritized exposure remediation with attack-path context and audit trail.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                {demoData.mission} The queue explains every ranking decision, groups work by owner,
                and keeps accepted risk visible instead of burying it.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {demoData.metrics.map((metric) => (
                <Card
                  key={metric.label}
                  className="dataCard border-white/10 bg-white/5 text-slate-100 shadow-none"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{metric.label}</p>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-medium",
                          metric.tone === "danger"
                            ? "bg-rose-500/15 text-rose-200"
                            : metric.tone === "warn"
                              ? "bg-amber-500/15 text-amber-200"
                              : "bg-emerald-500/15 text-emerald-200"
                        )}
                      >
                        {metric.delta}
                      </span>
                    </div>
                    <div className="mt-4 text-3xl font-semibold tracking-tight">{metric.value}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{metric.hint}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Card className="dataCard border-white/10 bg-white/5 text-slate-100">
              <CardHeader className="space-y-3 border-b border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-white">Operational controls</CardTitle>
                    <CardDescription className="text-slate-400">
                      Filter the queue, switch focus, and preserve state locally.
                    </CardDescription>
                  </div>
                  <Workflow className="size-5 text-teal-300" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Queue view</span>
                    <Select value={filter} onValueChange={(value) => setFilter(value as FilterKey)}>
                      <SelectTrigger className="w-full border-white/10 bg-slate-950/60 text-slate-100">
                        <SelectValue placeholder="Select a queue" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex flex-col items-start gap-0.5">
                              <span>{option.label}</span>
                              <span className="text-xs text-muted-foreground">{option.helper}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Search exposures</span>
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                      <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Asset, owner, path, or fix"
                        className="border-white/10 bg-slate-950/60 pl-9 text-slate-100 placeholder:text-slate-500"
                      />
                    </div>
                  </label>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-teal-400/15 text-teal-100 hover:bg-teal-400/25"
                    onClick={copyBriefing}
                  >
                    <Sparkles className="size-3.5" />
                    {copied ? "Briefing copied" : "Copy briefing"}
                  </Button>
                  <Button size="sm" variant="outline" className="border-white/10 bg-transparent text-slate-100" onClick={resetDemo}>
                    Reset demo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="dataCard border-white/10 bg-white/5 text-slate-100">
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Top priority</p>
                  <p className="mt-1 text-sm font-medium text-white">{topRisk?.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{topRisk?.whyNow}</p>
                </div>
                <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-right">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-rose-200">Priority score</p>
                  <p className="text-2xl font-semibold text-rose-100">{topRisk?.priorityScore ?? 0}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.45fr_0.95fr]">
        <Card className="dataCard border-white/10 bg-[#0a1523]/95 text-slate-100 shadow-[0_20px_60px_rgba(2,6,23,0.3)]">
          <CardHeader className="border-b border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-white">Exposure queue</CardTitle>
                <CardDescription className="text-slate-400">
                  Ordered by exploitability, asset criticality, and downstream blast radius.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                <SlidersHorizontal className="size-3.5 text-teal-300" />
                {visibleExposures.length} visible
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="queue" className="gap-0">
              <div className="border-b border-white/10 px-4 pt-4 sm:px-5">
                <TabsList variant="line" className="w-full justify-start gap-1 overflow-x-auto pb-3">
                  <TabsTrigger value="queue">Queue</TabsTrigger>
                  <TabsTrigger value="paths">Attack paths</TabsTrigger>
                  <TabsTrigger value="board">Remediation board</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="queue" className="p-4 sm:p-5">
                {visibleExposures.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
                    <AlertCircle className="mx-auto size-10 text-slate-400" />
                    <p className="mt-4 text-lg font-medium text-white">No exposures match the current filter.</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Try widening the queue view or clearing the search term. This state matters because
                      operators need to trust the empty result as much as the prioritized one.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {visibleExposures
                      .sort((a, b) => b.priorityScore - a.priorityScore)
                      .map((exposure) => (
                        <button
                          key={exposure.id}
                          onClick={() => setSelectedId(exposure.id)}
                          className={cn(
                            "group rounded-2xl border p-4 text-left transition-all duration-200",
                            exposure.id === selectedExposure?.id
                              ? "border-teal-400/40 bg-teal-400/10 shadow-[0_0_0_1px_rgba(45,212,191,0.12)]"
                              : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.06]"
                          )}
                        >
                          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                            <div className="space-y-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge
                                  variant={getStatusTone(exposure.status)}
                                  className="bg-white/5 text-slate-100"
                                >
                                  <StatusDot status={exposure.status} />
                                  {getStatusLabel(exposure.status)}
                                </Badge>
                                <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                                  {exposure.type}
                                </Badge>
                                <span className={cn("text-sm font-semibold", getRiskTone(exposure.severity))}>
                                  {formatExposureMetric(exposure)}
                                </span>
                              </div>

                              <div>
                                <h3 className="text-lg font-semibold text-white">{exposure.title}</h3>
                                <p className="mt-1 text-sm leading-6 text-slate-400">
                                  {exposure.attackPath}
                                </p>
                              </div>

                              <div className="grid gap-2 sm:grid-cols-3">
                                <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Asset</p>
                                  <p className="mt-1 text-sm text-slate-100">{exposure.asset}</p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Owner</p>
                                  <p className="mt-1 text-sm text-slate-100">{exposure.owner}</p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Due</p>
                                  <p className="mt-1 text-sm text-slate-100">{exposure.due}</p>
                                </div>
                              </div>
                            </div>

                            <div className="min-w-[180px] rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Why now</p>
                              <p className="mt-2 text-sm leading-6 text-slate-300">{exposure.whyNow}</p>
                              <div className="mt-4 flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                    Score
                                  </p>
                                  <p className="text-2xl font-semibold text-white">{exposure.priorityScore}</p>
                                </div>
                                <ArrowRight className="size-4 text-slate-500 transition-transform group-hover:translate-x-1" />
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="paths" className="p-4 sm:p-5">
                {selectedExposure ? (
                  <div className="space-y-5">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Selected path</p>
                          <h3 className="mt-1 text-xl font-semibold text-white">{selectedExposure.title}</h3>
                        </div>
                        <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                          {selectedExposure.attackPath}
                        </Badge>
                      </div>

                      <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                        <div className={styles.pathLine} />
                        <div className="grid gap-5 md:grid-cols-4">
                          {selectedExposure.path.map((hop) => (
                            <div
                              key={hop.label}
                              className={cn(
                                styles.pathNode,
                                hop.kind === "source"
                                  ? styles.source
                                  : hop.kind === "control"
                                    ? styles.control
                                    : hop.kind === "risk"
                                      ? styles.risk
                                      : styles.target
                              )}
                            >
                              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{hop.label}</p>
                                <p className="mt-2 text-sm leading-6 text-slate-200">{hop.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <Card className="dataCard border-white/10 bg-white/[0.04]">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white">Evidence bundle</CardTitle>
                          <CardDescription className="text-slate-400">
                            The queue shows the proof behind the ranking, not just the score.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {selectedExposure.evidence.map((item) => (
                            <div
                              key={item}
                              className="flex items-start gap-2 rounded-xl border border-white/10 bg-slate-950/45 p-3 text-sm text-slate-300"
                            >
                              <ShieldAlert className="mt-0.5 size-4 text-amber-300" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card className="dataCard border-white/10 bg-white/[0.04]">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white">Controls and context</CardTitle>
                          <CardDescription className="text-slate-400">
                            Distinguish a fixable risk from one that is already mitigated.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {selectedExposure.controls.map((control) => (
                            <div
                              key={control.label}
                              className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/45 px-3 py-2.5"
                            >
                              <span className="text-sm text-slate-200">{control.label}</span>
                              <Badge
                                variant={control.state === "present" ? "default" : control.state === "partial" ? "secondary" : "outline"}
                                className="bg-white/5 text-slate-100"
                              >
                                {control.state}
                              </Badge>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : null}
              </TabsContent>

              <TabsContent value="board" className="p-4 sm:p-5">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {(
                    [
                      ["Queued", exposuresWithState.filter((item) => item.status === "queued")],
                      ["In progress", exposuresWithState.filter((item) => item.status === "in_progress" || item.status === "review")],
                      ["Accepted / done", exposuresWithState.filter((item) => item.status === "accepted" || item.status === "done")],
                    ] as const
                  ).map(([title, items]) => (
                    <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">{title}</h3>
                        <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                          {items.length}
                        </Badge>
                      </div>

                      <div className="mt-4 space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-medium text-white">{item.title}</p>
                                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                                  {item.asset}
                                </p>
                              </div>
                              <StatusDot status={item.status} />
                            </div>

                            <p className="mt-3 text-sm leading-6 text-slate-400">{item.recommendedFixes[0]}</p>
                            <div className="mt-3 flex items-center justify-between gap-2">
                              <span className="text-xs text-slate-500">{item.owner}</span>
                              <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                                {item.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="metrics" className="p-4 sm:p-5">
                <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
                  <Card className="dataCard border-white/10 bg-white/[0.04]">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white">Risk trend</CardTitle>
                      <CardDescription className="text-slate-400">
                        Demo trend over the last seven days. Lower is better.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[290px] p-3">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={demoData.trend} margin={{ left: 0, right: 10, top: 8, bottom: 0 }}>
                          <CartesianGrid stroke="rgba(148,163,184,0.16)" vertical={false} />
                          <XAxis dataKey="day" stroke="#94a3b8" tickLine={false} axisLine={false} />
                          <YAxis
                            stroke="#94a3b8"
                            tickLine={false}
                            axisLine={false}
                            width={28}
                          />
                          <Tooltip
                            contentStyle={{
                              background: "rgba(8,17,26,0.94)",
                              border: "1px solid rgba(148,163,184,0.18)",
                              borderRadius: 16,
                              color: "#e2e8f0",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="exposure"
                            stroke="#2dd4bf"
                            strokeWidth={3}
                            dot={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="prioritised"
                            stroke="#f59e0b"
                            strokeWidth={2.5}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="dataCard border-white/10 bg-white/[0.04]">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white">Queue summary</CardTitle>
                      <CardDescription className="text-slate-400">
                        What the current state tells the team at a glance.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { label: "Critical exposures still open", value: queueMetrics.critical, tone: "danger" },
                        { label: "Items in progress or review", value: queueMetrics.inProgress, tone: "warn" },
                        { label: "Accepted risks", value: queueMetrics.accepted, tone: "ok" },
                        { label: "Resolved items", value: queueMetrics.done, tone: "ok" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3"
                        >
                          <span className="text-sm text-slate-300">{item.label}</span>
                          <span
                            className={cn(
                              "text-xl font-semibold",
                              item.tone === "danger"
                                ? "text-rose-200"
                                : item.tone === "warn"
                                  ? "text-amber-200"
                                  : "text-emerald-200"
                            )}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}

                      <Separator className="bg-white/10" />

                      <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Collaboration trace</p>
                        <div className="mt-3 space-y-3">
                          {selectedTraceNotes.map((note) => (
                            <div key={`${note.author}-${note.at}`} className="flex items-start gap-3">
                              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-400/12 text-xs font-semibold text-teal-100">
                                {initials(note.author)}
                              </div>
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                  <span className="text-sm font-medium text-white">{note.author}</span>
                                  <span className="text-xs text-slate-500">{note.role}</span>
                                  <span className="text-xs text-slate-500">{note.at}</span>
                                </div>
                                <p className="mt-1 text-sm leading-6 text-slate-400">{note.note}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <aside className="space-y-5">
          {selectedExposure ? (
            <Card className="dataCard border-white/10 bg-[#0a1523]/95 text-slate-100 shadow-[0_20px_60px_rgba(2,6,23,0.28)]">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-white">Selected exposure</CardTitle>
                    <CardDescription className="text-slate-400">
                      Change state, document a reason, and keep the audit trail visible.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                    {selectedExposure.due}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 p-5">
                <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{selectedExposure.type}</p>
                      <h2 className="mt-1 text-xl font-semibold text-white">{selectedExposure.title}</h2>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Exposure score</p>
                      <p className="text-2xl font-semibold text-white">{selectedExposure.exposureScore}</p>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Asset</p>
                      <p className="mt-1 text-sm text-white">{selectedExposure.asset}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Owner</p>
                      <p className="mt-1 text-sm text-white">{selectedExposure.owner}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Team</p>
                      <p className="mt-1 text-sm text-white">{selectedExposure.team}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Status</p>
                      <p className="mt-1 text-sm text-white">{getStatusLabel(selectedExposure.status)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex items-center gap-2">
                    <GitBranch className="size-4 text-teal-300" />
                    <p className="text-sm font-semibold text-white">Attack story</p>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">{selectedExposure.businessImpact}</p>
                  <p className="text-sm leading-6 text-slate-300">{selectedExposure.whyNow}</p>
                </div>

                <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-300" />
                    <p className="text-sm font-semibold text-white">Recommended fix</p>
                  </div>
                  <ul className="space-y-2 text-sm leading-6 text-slate-300">
                    {selectedExposure.recommendedFixes.map((step) => (
                      <li key={step} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-300" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">State change</p>
                      <p className="text-sm text-slate-400">
                        Update the queue item and record the action in the demo audit trail.
                      </p>
                    </div>
                    <Clock3 className="size-4 text-slate-500" />
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 bg-white/5 text-slate-100"
                      onClick={() => updateStatus(selectedExposure.id, "in_progress")}
                    >
                      Start work
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 bg-white/5 text-slate-100"
                      onClick={() => updateStatus(selectedExposure.id, "review")}
                    >
                      Send to review
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 bg-white/5 text-slate-100"
                      onClick={() => updateStatus(selectedExposure.id, "accepted")}
                    >
                      Accept risk
                    </Button>
                    <Button
                      size="sm"
                      className="bg-teal-500 text-slate-950 hover:bg-teal-400"
                      onClick={() => updateStatus(selectedExposure.id, "done")}
                    >
                      Mark done
                    </Button>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-sky-300" />
                    <p className="text-sm font-semibold text-white">Add note</p>
                  </div>
                  <Textarea
                    value={draftNote}
                    onChange={(event) => setDraftNote(event.target.value)}
                    placeholder="Document owner feedback, compensating controls, or verification status."
                    className="mt-3 min-h-28 border-white/10 bg-slate-900/70 text-slate-100 placeholder:text-slate-500"
                  />
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-xs text-slate-500">
                      Notes persist locally for the demo and feed the collaboration trace.
                    </p>
                    <Button
                      size="sm"
                      className="bg-white text-slate-950 hover:bg-slate-200"
                      onClick={addNote}
                    >
                      Save note
                    </Button>
                  </div>
                  {currentNote ? (
                    <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm leading-6 text-slate-300">
                      {currentNote}
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ) : null}

          <Card className="dataCard border-white/10 bg-[#0a1523]/95 text-slate-100 shadow-[0_20px_60px_rgba(2,6,23,0.28)]">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-white">Product wedge</CardTitle>
              <CardDescription className="text-slate-400">
                Why this dashboard exists and who it serves.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-5 text-sm leading-6 text-slate-300">
              <p>
                This demo targets a security lead at a cloud-first SaaS company who needs a single
                queue for exposures that can become incidents, audit findings, or board questions.
              </p>
              <div className="grid gap-3">
                {[
                  ["Primary user", "Security lead / exposure manager"],
                  ["Secondary users", "Platform owner, identity admin, IT ops"],
                  ["Buying trigger", "Known exploited vuln, audit pressure, or board request"],
                  ["Packaging", "Per asset band plus executive reporting add-on"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/55 p-3">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
                    <p className="mt-1 text-slate-100">{value}</p>
                  </div>
                ))}
              </div>
              <p className="text-slate-400">
                The differentiator is explainable prioritization: every row shows the evidence,
                the attack path, the control gap, and the audit state.
              </p>
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  )
}
