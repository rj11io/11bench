'use client'

import { useMemo, useState } from "react"
import {
  ArrowRight,
  BadgeAlert,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Copy,
  Filter,
  Search,
  ShieldAlert,
  Sparkles,
  TimerReset,
  UserRound,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import type {
  Exposure,
  ExposureStatus,
  Lens,
  SortMode,
  Surface,
  WorkspaceState,
} from "./data"
import {
  exposureTrend,
  exposures,
  lensOptions,
  sortOptions,
  surfaceOptions,
  workflowStages,
} from "./data"

const STORAGE_KEY = "exposure-desk-workspace-v1"
const STATUS_LABELS: Record<ExposureStatus, string> = {
  open: "Open",
  planned: "Planned",
  in_progress: "In progress",
  accepted: "Accepted",
  resolved: "Resolved",
}

const STATUS_COLORS: Record<ExposureStatus, string> = {
  open: "#fb7185",
  planned: "#f59e0b",
  in_progress: "#22d3ee",
  accepted: "#4ade80",
  resolved: "#94a3b8",
}

const SURFACE_LABELS: Record<Surface, string> = {
  cloud: "Cloud",
  identity: "Identity",
  endpoint: "Endpoint",
  edge: "Edge",
  saas: "SaaS",
}

const sortLabels: Record<SortMode, string> = {
  priority: "Priority",
  risk: "Risk score",
  due: "Due date",
  owner: "Owner",
}

function loadWorkspaceSnapshot(initialWorkspace: WorkspaceState) {
  if (typeof window === "undefined") {
    return {
      workspace: initialWorkspace,
      storageState: "loading" as const,
    }
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return {
        workspace: initialWorkspace,
        storageState: "ready" as const,
      }
    }

    const parsed = JSON.parse(stored) as Partial<WorkspaceState>
    return {
      workspace: {
        ...initialWorkspace,
        ...parsed,
        ownerOverrides: parsed.ownerOverrides ?? initialWorkspace.ownerOverrides,
        statusOverrides: parsed.statusOverrides ?? initialWorkspace.statusOverrides,
        notes: parsed.notes ?? initialWorkspace.notes,
      },
      storageState: "ready" as const,
    }
  } catch {
    return {
      workspace: initialWorkspace,
      storageState: "error" as const,
    }
  }
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

function getStatus(state: WorkspaceState, exposure: Exposure): ExposureStatus {
  return state.statusOverrides[exposure.id] ?? exposure.status
}

function getOwner(state: WorkspaceState, exposure: Exposure) {
  return state.ownerOverrides[exposure.id] ?? exposure.owner
}

function matchesLens(
  lens: Lens,
  exposure: Exposure,
  status: ExposureStatus,
  owner: string
) {
  if (lens === "critical") return exposure.severity === "critical"
  if (lens === "due_soon") return status !== "resolved" && exposure.dueDays <= 7
  if (lens === "unowned") return owner === "Unassigned"
  if (lens === "accepted") return status === "accepted"
  if (lens === "resolved") return status === "resolved"
  return true
}

function compareExposures(
  sort: SortMode,
  left: Exposure,
  right: Exposure,
  leftStatus: ExposureStatus,
  rightStatus: ExposureStatus,
  leftOwner: string,
  rightOwner: string
) {
  if (sort === "risk") return right.riskScore - left.riskScore
  if (sort === "due") return left.dueDays - right.dueDays || right.riskScore - left.riskScore
  if (sort === "owner") {
    return (
      leftOwner.localeCompare(rightOwner) ||
      right.riskScore - left.riskScore ||
      left.title.localeCompare(right.title)
    )
  }

  const severityRank = { critical: 3, high: 2, medium: 1 } as const
  return (
    severityRank[right.severity] - severityRank[left.severity] ||
    (leftStatus === "resolved" ? 1 : 0) - (rightStatus === "resolved" ? 1 : 0) ||
    left.dueDays - right.dueDays ||
    right.riskScore - left.riskScore
  )
}

function statusBucketCounts(items: Array<{ status: ExposureStatus }>) {
  return [
    "open",
    "planned",
    "in_progress",
    "accepted",
    "resolved",
  ].map((status) => ({
    status,
    label: STATUS_LABELS[status as ExposureStatus],
    count: items.filter((item) => item.status === status).length,
  }))
}

function buildBrief(exposure: Exposure, owner: string, status: ExposureStatus) {
  return [
    exposure.title,
    `Asset: ${exposure.asset}`,
    `Owner: ${owner}`,
    `Status: ${STATUS_LABELS[status]}`,
    `Risk: ${exposure.riskScore}/100`,
    `Next steps: ${exposure.actions.join(" | ")}`,
  ].join("\n")
}

function chipTone(
  tone: "slate" | "amber" | "rose" | "emerald",
  active: boolean
) {
  const tones = {
    slate: active
      ? "border-slate-200/20 bg-slate-200/10 text-slate-100"
      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10",
    amber: active
      ? "border-amber-300/30 bg-amber-300/15 text-amber-50"
      : "border-amber-300/15 bg-amber-300/8 text-amber-100/80 hover:border-amber-300/25 hover:bg-amber-300/12",
    rose: active
      ? "border-rose-300/30 bg-rose-300/15 text-rose-50"
      : "border-rose-300/15 bg-rose-300/8 text-rose-100/80 hover:border-rose-300/25 hover:bg-rose-300/12",
    emerald: active
      ? "border-emerald-300/30 bg-emerald-300/15 text-emerald-50"
      : "border-emerald-300/15 bg-emerald-300/8 text-emerald-100/80 hover:border-emerald-300/25 hover:bg-emerald-300/12",
  }
  return tones[tone]
}

function badgeTone(status: ExposureStatus) {
  switch (status) {
    case "open":
      return "border-rose-300/25 bg-rose-300/10 text-rose-100"
    case "planned":
      return "border-amber-300/25 bg-amber-300/10 text-amber-100"
    case "in_progress":
      return "border-cyan-300/25 bg-cyan-300/10 text-cyan-100"
    case "accepted":
      return "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
    case "resolved":
      return "border-slate-300/20 bg-slate-200/10 text-slate-200"
    default:
      return "border-white/10 bg-white/5 text-slate-100"
  }
}

function surfaceTone(surface: Surface) {
  switch (surface) {
    case "cloud":
      return "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
    case "identity":
      return "border-sky-300/20 bg-sky-300/10 text-sky-100"
    case "endpoint":
      return "border-amber-300/20 bg-amber-300/10 text-amber-100"
    case "edge":
      return "border-rose-300/20 bg-rose-300/10 text-rose-100"
    case "saas":
      return "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
    default:
      return "border-white/10 bg-white/5 text-slate-100"
  }
}

function scoreClass(value: number) {
  if (value >= 90) return "bg-rose-400"
  if (value >= 75) return "bg-amber-400"
  if (value >= 60) return "bg-cyan-400"
  return "bg-slate-500"
}

export function ExposureDesk({
  initialWorkspace,
}: {
  initialWorkspace: WorkspaceState
}) {
  const initialSnapshot = loadWorkspaceSnapshot(initialWorkspace)
  const [workspace, setWorkspace] = useState<WorkspaceState>(
    initialSnapshot.workspace
  )
  const [storageState, setStorageState] = useState<
    "loading" | "ready" | "error"
  >(initialSnapshot.storageState)
  const [noteDraft, setNoteDraft] = useState("")
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle")

  const decorated = useMemo(() => {
    return exposures.map((exposure) => {
      const status = getStatus(workspace, exposure)
      const owner = getOwner(workspace, exposure)
      const notes = workspace.notes[exposure.id] ?? []
      return { ...exposure, status, owner, notes }
    })
  }, [workspace])

  const visible = useMemo(() => {
    const term = workspace.search.trim().toLowerCase()
    const filtered = decorated.filter((exposure) => {
      const matchesSurface =
        workspace.surface === "all" || exposure.surface === workspace.surface
      const matchesSearch =
        term.length === 0 ||
        [
          exposure.title,
          exposure.asset,
          exposure.businessUnit,
          exposure.owner,
          exposure.source,
          ...exposure.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(term)
      return (
        matchesSurface &&
        matchesSearch &&
        matchesLens(workspace.lens, exposure, exposure.status, exposure.owner)
      )
    })

    return [...filtered].sort((a, b) =>
      compareExposures(
        workspace.sort,
        a,
        b,
        a.status,
        b.status,
        a.owner,
        b.owner
      )
    )
  }, [decorated, workspace.lens, workspace.search, workspace.sort, workspace.surface])

  const selected = useMemo(() => {
    return visible.find((item) => item.id === workspace.selectedId) ?? visible[0] ?? null
  }, [visible, workspace.selectedId])

  const statusCounts = useMemo(() => statusBucketCounts(visible), [visible])
  const criticalCount = visible.filter((item) => item.severity === "critical").length
  const dueSoonCount = visible.filter(
    (item) => item.status !== "resolved" && item.dueDays <= 7
  ).length
  const acceptedCount = visible.filter((item) => item.status === "accepted").length
  const avgRisk =
    visible.length === 0
      ? 0
      : Math.round(
          visible.reduce((sum, exposure) => sum + exposure.riskScore, 0) / visible.length
        )

  const attentionState =
    workspace.lens === "critical" || criticalCount >= 4
      ? "critical"
      : workspace.lens === "due_soon" || dueSoonCount >= 4
        ? "elevated"
        : "normal"

  const queueSummary = useMemo(
    () => [
      {
        label: "Visible items",
        value: visible.length.toString().padStart(2, "0"),
        note: "Current queue after filters",
      },
      {
        label: "Critical",
        value: criticalCount.toString().padStart(2, "0"),
        note: "Severity + exploitability",
      },
      {
        label: "Due in 7d",
        value: dueSoonCount.toString().padStart(2, "0"),
        note: "SLA window pressure",
      },
      {
        label: "Accepted risk",
        value: acceptedCount.toString().padStart(2, "0"),
        note: "Waiting for expiry or revisit",
      },
    ],
    [acceptedCount, criticalCount, dueSoonCount, visible.length]
  )

  const mixSeries = useMemo(() => {
    return statusCounts.map((item) => ({
      ...item,
      fill: STATUS_COLORS[item.status as ExposureStatus],
    }))
  }, [statusCounts])

  const postureLabel = {
    normal: "Normal review",
    elevated: "Elevated attention",
    critical: "Critical lane",
  }[attentionState]

  const postureCopy = {
    normal: "No immediate escalations. The queue is ready for routine review.",
    elevated:
      "The queue includes several due-soon items and at least one KEV-linked exposure.",
    critical:
      "Critical mode is engaged. Focus on exploitable, internet-facing, and unowned items first.",
  }[attentionState]

  function updateWorkspace(
    patch:
      | Partial<WorkspaceState>
      | ((current: WorkspaceState) => WorkspaceState)
  ) {
    const next =
      typeof patch === "function" ? patch(workspace) : { ...workspace, ...patch }

    setWorkspace(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setStorageState("ready")
    } catch {
      setStorageState("error")
    }
  }

  function selectExposure(id: string) {
    updateWorkspace((current) => ({ ...current, selectedId: id }))
  }

  function setLens(lens: Lens) {
    updateWorkspace((current) => ({ ...current, lens }))
  }

  function setSurface(surface: Surface | "all") {
    updateWorkspace((current) => ({ ...current, surface }))
  }

  function setSort(sort: SortMode) {
    updateWorkspace((current) => ({ ...current, sort }))
  }

  function setStatus(id: string, status: ExposureStatus) {
    updateWorkspace((current) => ({
      ...current,
      selectedId: id,
      statusOverrides: { ...current.statusOverrides, [id]: status },
    }))
  }

  function setOwner(id: string, owner: string) {
    updateWorkspace((current) => ({
      ...current,
      selectedId: id,
      ownerOverrides: { ...current.ownerOverrides, [id]: owner },
    }))
  }

  function addNote() {
    if (!selected || !noteDraft.trim()) return

    const note = {
      id: `note-${Date.now()}`,
      author: "You",
      when: "Just now",
      body: noteDraft.trim(),
    }

    updateWorkspace((current) => ({
      ...current,
      notes: {
        ...current.notes,
        [selected.id]: [...(current.notes[selected.id] ?? []), note],
      },
    }))
    setNoteDraft("")
  }

  async function copyBrief() {
    if (!selected) return
    try {
      await navigator.clipboard.writeText(
        buildBrief(selected, selected.owner, selected.status)
      )
      setCopyState("copied")
      window.setTimeout(() => setCopyState("idle"), 1400)
    } catch {
      setCopyState("idle")
    }
  }

  function resetWorkspace() {
    setWorkspace(initialWorkspace)
    setNoteDraft("")
    setCopyState("idle")
    setStorageState("ready")
    window.localStorage.removeItem(STORAGE_KEY)
  }

  const surfaceBreakdown = useMemo(() => {
    return surfaceOptions
      .filter((option) => option.value !== "all")
      .map((option) => ({
        label: option.label,
        count: visible.filter((item) => item.surface === option.value).length,
      }))
  }, [visible])

  const detailScore = selected?.scoreDrivers ?? []

  return (
    <div className="space-y-6" suppressHydrationWarning>
      <section className="rounded-[32px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_90px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-cyan-100">
                Weekly exposure review
              </span>
              <span
                className={cx(
                  "rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.22em]",
                  attentionState === "critical"
                    ? "border-rose-300/30 bg-rose-300/15 text-rose-100"
                    : attentionState === "elevated"
                      ? "border-amber-300/30 bg-amber-300/15 text-amber-100"
                      : "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
                )}
              >
                {postureLabel}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Turn scanner noise into a remediation plan the team can actually
              execute.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Exposure Desk sits between scanners, cloud posture tools, identity
              signals, and ticketing. It explains why each exposure matters,
              who owns it, and what the next action should be.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:w-[420px]">
            <MetaPill label="Assets in scope" value="382" />
            <MetaPill label="Teams mapped" value="14" />
            <MetaPill label="Last synced" value="14m ago" />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {queueSummary.map((item) => (
            <div
              key={item.label}
              className="rounded-[24px] border border-white/10 bg-slate-950/55 p-4"
            >
              <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                {item.label}
              </div>
              <div className="mt-3 flex items-end justify-between gap-3">
                <span className="font-mono text-3xl font-semibold text-white">
                  {item.value}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-300">
                  live demo
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-400">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {lensOptions.map((lens) => {
              const active = workspace.lens === lens.value
              return (
                <button
                  key={lens.value}
                  type="button"
                  onClick={() => setLens(lens.value)}
                  className={cx(
                    "rounded-full border px-4 py-2 text-sm transition",
                    chipTone(lens.tone, active)
                  )}
                >
                  {lens.label}
                </button>
              )
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative min-w-[220px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={workspace.search}
                onChange={(event) =>
                  updateWorkspace((current) => ({
                    ...current,
                    search: event.target.value,
                  }))
                }
                placeholder="Search asset, owner, business unit, or source"
                className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/70 pl-10 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
              />
            </label>

            <select
              value={workspace.sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
              className="h-11 rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-100 outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort: {option.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={resetWorkspace}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10"
            >
              <TimerReset className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <Filter className="h-3.5 w-3.5 text-slate-500" />
          <span>Surface:</span>
          {surfaceOptions.map((option) => {
            const active = workspace.surface === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSurface(option.value)}
                className={cx(
                  "rounded-full border px-3 py-1.5 transition",
                  active
                    ? "border-cyan-300/30 bg-cyan-300/15 text-cyan-50"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
                )}
              >
                {option.label}
              </button>
            )
          })}
          <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-300">
            Sorted by {sortLabels[workspace.sort]}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-300">
            {storageState === "loading"
              ? "Restoring local workspace..."
              : storageState === "error"
                ? "Saved workspace reset after a parse error"
                : "Workspace saved locally"}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-400">
            Demo actions update local state only
          </span>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.9fr)]">
        <div className="space-y-6">
          <section className="rounded-[32px] border border-white/10 bg-slate-950/70 p-4 shadow-[0_25px_90px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                  <ShieldAlert className="h-3.5 w-3.5 text-amber-200" />
                  Prioritized queue
                </div>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  {postureLabel}
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">
                  {postureCopy}
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-300">
                {visible.length} items visible
              </div>
            </div>

            {visible.length === 0 ? (
              <EmptyState
                title="No exposures match this filter set"
                description="Try a different surface lens, change the priority bucket, or clear the search field."
                actionLabel="Clear filters"
                onAction={resetWorkspace}
              />
            ) : (
              <div className="mt-5 space-y-3">
                {visible.map((exposure) => {
                  const isSelected = exposure.id === selected?.id
                  const status = exposure.status
                  return (
                    <button
                      key={exposure.id}
                      type="button"
                      onClick={() => selectExposure(exposure.id)}
                      className={cx(
                        "w-full rounded-[24px] border p-4 text-left transition",
                        isSelected
                          ? "border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                      )}
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={cx("rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.2em]", badgeTone(status))}>
                              {STATUS_LABELS[status]}
                            </span>
                            <span
                              className={cx(
                                "rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.2em]",
                                surfaceTone(exposure.surface)
                              )}
                            >
                              {SURFACE_LABELS[exposure.surface]}
                            </span>
                            {exposure.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 font-mono text-sm font-semibold text-white">
                              {exposure.riskScore}
                            </div>
                            <div className="min-w-0">
                              <h3 className="truncate text-base font-semibold text-white">
                                {exposure.title}
                              </h3>
                              <p className="mt-1 text-sm text-slate-400">
                                {exposure.asset} · {exposure.businessUnit} · {exposure.source}
                              </p>
                            </div>
                          </div>

                          <div className="grid gap-2 sm:grid-cols-3">
                            <MetricPair label="Owner" value={exposure.owner} />
                            <MetricPair label="Due" value={`in ${exposure.dueDays}d`} />
                            <MetricPair label="Source" value={exposure.sourceTag} />
                          </div>
                        </div>

                        <div className="flex shrink-0 flex-col items-start gap-2 lg:items-end">
                          <span className="font-mono text-2xl font-semibold text-white">
                            {exposure.riskScore}
                          </span>
                          <div className="h-2 w-32 overflow-hidden rounded-full bg-white/8">
                            <div
                              className={cx("h-full rounded-full", scoreClass(exposure.riskScore))}
                              style={{ width: `${exposure.riskScore}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-500">
                            {exposure.summary}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-[32px] border border-white/10 bg-slate-950/70 p-4 shadow-[0_25px_90px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                    <BarChart3 className="h-3.5 w-3.5 text-cyan-200" />
                    Exposure pressure
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    Eight-week risk trend
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-300">
                  avg risk {avgRisk}
                </span>
              </div>
              <div className="mt-4 h-[260px]">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <AreaChart data={exposureTrend}>
                    <defs>
                      <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(148,163,184,0.18)" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#020617",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "16px",
                        color: "#e2e8f0",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#22d3ee"
                      strokeWidth={2}
                      fill="url(#trendFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <MiniStat label="Critical" value="3" tone="rose" />
                <MiniStat label="Accepted" value="1" tone="emerald" />
                <MiniStat label="Closed" value="1" tone="slate" />
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-slate-950/70 p-4 shadow-[0_25px_90px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                    <BarChart3 className="h-3.5 w-3.5 text-amber-200" />
                    Queue mix
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    Visible items by state
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-300">
                  dynamic
                </span>
              </div>
              <div className="mt-4 h-[260px]">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <BarChart data={mixSeries}>
                    <CartesianGrid stroke="rgba(148,163,184,0.18)" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#020617",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "16px",
                        color: "#e2e8f0",
                      }}
                    />
                    <Bar dataKey="count" radius={[12, 12, 4, 4]}>
                      {mixSeries.map((entry) => (
                        <Cell key={entry.status} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </section>

          <section className="rounded-[32px] border border-white/10 bg-slate-950/70 p-4 shadow-[0_25px_90px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-200" />
                  Exposure lifecycle
                </div>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  How this queue moves from discovery to mobilization
                </h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-300">
                explainable scoring
              </span>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-4">
              {workflowStages.map((stage) => (
                <div
                  key={stage.label}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-white">{stage.label}</span>
                    <span className="font-mono text-2xl font-semibold text-white">
                      {stage.value}
                    </span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white/8">
                    <div
                      className={cx(
                        "h-full rounded-full",
                        stage.accent === "cyan"
                          ? "bg-cyan-300"
                          : stage.accent === "amber"
                            ? "bg-amber-300"
                            : stage.accent === "emerald"
                              ? "bg-emerald-300"
                              : "bg-rose-300"
                      )}
                      style={{ width: `${Math.min(92, stage.value / 5)}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          {selected ? (
            <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-4 shadow-[0_25px_90px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cx("rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.2em]", badgeTone(selected.status))}>
                      {STATUS_LABELS[selected.status]}
                    </span>
                    <span
                      className={cx(
                        "rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.2em]",
                        surfaceTone(selected.surface)
                      )}
                    >
                      {SURFACE_LABELS[selected.surface]}
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    {selected.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {selected.asset} · {selected.businessUnit} · {selected.source}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="font-mono text-4xl font-semibold text-white">
                    {selected.riskScore}
                  </span>
                  <div className="h-2.5 w-28 overflow-hidden rounded-full bg-white/8">
                    <div
                      className={cx("h-full rounded-full", scoreClass(selected.riskScore))}
                      style={{ width: `${selected.riskScore}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                      Explainability
                    </div>
                    <h3 className="mt-1 text-base font-medium text-white">
                      Risk score drivers
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-300">
                    why now
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {detailScore.map((driver) => (
                    <div key={driver.label}>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-slate-300">{driver.label}</span>
                        <span className="font-mono text-slate-100">{driver.value}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-white/8">
                        <div
                          className={cx(
                            "h-full rounded-full",
                            driver.label === "Exploitability"
                              ? "bg-rose-300"
                              : driver.label === "Business impact"
                                ? "bg-amber-300"
                                : driver.label === "Exposure"
                                  ? "bg-cyan-300"
                                  : "bg-emerald-300"
                          )}
                          style={{ width: `${driver.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                    <ArrowRight className="h-3.5 w-3.5 text-cyan-200" />
                    Attack path
                  </div>
                  <ol className="mt-4 space-y-3">
                    {selected.attackPath.map((step, index) => (
                      <li key={step} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono text-xs text-slate-100">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm leading-6 text-slate-300">{step}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                    <BookOpen className="h-3.5 w-3.5 text-emerald-200" />
                    Evidence
                  </div>
                  <ul className="mt-4 space-y-2">
                    {selected.evidence.map((entry) => (
                      <li
                        key={entry}
                        className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm leading-6 text-slate-300"
                      >
                        {entry}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                      Ownership and action
                    </div>
                    <h3 className="mt-1 text-base font-medium text-white">
                      Update the remediation path
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={copyBrief}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                  >
                    <Copy className="h-4 w-4" />
                    {copyState === "copied" ? "Copied" : "Copy brief"}
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus(selected.id, "open")}
                    className="rounded-full border border-rose-300/20 bg-rose-300/10 px-3 py-2 text-sm text-rose-100 transition hover:bg-rose-300/15"
                  >
                    Back to open
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(selected.id, "planned")}
                    className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-sm text-amber-100 transition hover:bg-amber-300/15"
                  >
                    Mark planned
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(selected.id, "in_progress")}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100 transition hover:bg-cyan-300/15"
                  >
                    In progress
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(selected.id, "accepted")}
                    className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100 transition hover:bg-emerald-300/15"
                  >
                    Accept risk
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(selected.id, "resolved")}
                    className="rounded-full border border-slate-300/20 bg-slate-300/10 px-3 py-2 text-sm text-slate-100 transition hover:bg-slate-300/15"
                  >
                    Mark resolved
                  </button>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-[1.3fr_1fr]">
                  <label className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.22em] text-slate-400">
                      Owner
                    </span>
                    <select
                      value={selected.owner}
                      onChange={(event) => setOwner(selected.id, event.target.value)}
                      className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-100 outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
                    >
                      <option>Unassigned</option>
                      <option>Core Infrastructure</option>
                      <option>Network Operations</option>
                      <option>Third Party Risk</option>
                      <option>Platform Security</option>
                      <option>Platform Engineering</option>
                      <option>Identity Engineering</option>
                      <option>IAM</option>
                      <option>End User Computing</option>
                      <option>Desktop Ops</option>
                      <option>DevEx</option>
                      <option>Risk Operations</option>
                      <option>Finance Systems</option>
                    </select>
                  </label>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      Due window
                    </div>
                    <div className="mt-2 flex items-end justify-between gap-3">
                      <span className="font-mono text-2xl font-semibold text-white">
                        {selected.dueDays}d
                      </span>
                      <span className="text-sm text-slate-400">
                        {selected.dueDays <= 3
                          ? "This is a fast-moving item."
                          : "Track this in the weekly review."}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-sm font-medium text-white">
                      Recommended remediation steps
                    </h4>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                      audit trail
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                    {selected.actions.map((action) => (
                      <li key={action} className="flex gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-sm font-medium text-white">
                      Add a collaboration note
                    </h4>
                    <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      visible to reviewers
                    </span>
                  </div>
                  <textarea
                    value={noteDraft}
                    onChange={(event) => setNoteDraft(event.target.value)}
                    rows={3}
                    placeholder="Example: Need the app owner to confirm whether the feature flag can be disabled before patching."
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
                  />
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-xs leading-5 text-slate-500">
                      Notes are persisted locally and attached to the selected
                      exposure.
                    </p>
                    <button
                      type="button"
                      onClick={addNote}
                      className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100 transition hover:bg-cyan-300/15"
                    >
                      <BadgeAlert className="h-4 w-4" />
                      Add note
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-5 shadow-[0_25px_90px_rgba(2,6,23,0.45)] backdrop-blur-xl">
              <EmptyState
                title="No exposure selected"
                description="Choose an item from the prioritized queue to inspect its attack path, evidence, and remediation plan."
                actionLabel="Reset filters"
                onAction={resetWorkspace}
              />
            </section>
          )}

          <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-5 shadow-[0_25px_90px_rgba(2,6,23,0.45)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                  <UserRound className="h-3.5 w-3.5 text-amber-200" />
                  Collaboration log
                </div>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  Recent notes on the selected item
                </h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-300">
                local only
              </span>
            </div>

            {selected ? (
              <div className="mt-4 space-y-3">
                {(selected.notes ?? []).length === 0 ? (
                  <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-400">
                    No notes yet. Add context, assign follow-ups, or record an
                    exception decision.
                  </div>
                ) : (
                  selected.notes.map((note) => (
                    <article
                      key={note.id}
                      className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-medium text-white">
                          {note.author}
                        </div>
                        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          {note.when}
                        </div>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {note.body}
                      </p>
                    </article>
                  ))
                )}
              </div>
            ) : (
              <EmptyState
                title="No item available"
                description="Use the queue or clear the current filters to view notes."
                actionLabel="Clear filters"
                onAction={resetWorkspace}
              />
            )}
          </section>

          <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-5 shadow-[0_25px_90px_rgba(2,6,23,0.45)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                  <BookOpen className="h-3.5 w-3.5 text-cyan-200" />
                  Coverage matrix
                </div>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  Visible queue by surface
                </h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-300">
                contextual
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {surfaceBreakdown.map((item) => {
                const maxCount = Math.max(
                  1,
                  ...surfaceBreakdown.map((surface) => surface.count)
                )
                return (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="font-mono text-slate-100">{item.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
                        style={{ width: `${(item.count / maxCount) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-slate-950/60 px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 font-mono text-lg font-semibold text-white">{value}</div>
    </div>
  )
}

function MetricPair({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/55 px-3 py-2">
      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 truncate text-sm font-medium text-white">{value}</div>
    </div>
  )
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "rose" | "emerald" | "slate"
}) {
  return (
    <div
      className={cx(
        "rounded-[18px] border p-3",
        tone === "rose"
          ? "border-rose-300/20 bg-rose-300/10"
          : tone === "emerald"
            ? "border-emerald-300/20 bg-emerald-300/10"
            : "border-white/10 bg-white/5"
      )}
    >
      <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
        {label}
      </div>
      <div className="mt-2 font-mono text-2xl font-semibold text-white">{value}</div>
    </div>
  )
}

function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string
  description: string
  actionLabel: string
  onAction: () => void
}) {
  return (
    <div className="grid min-h-[280px] place-items-center rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] p-6 text-center">
      <div className="max-w-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:border-white/20 hover:bg-white/10"
        >
          <ShieldAlert className="h-4 w-4" />
          {actionLabel}
        </button>
      </div>
    </div>
  )
}
