"use client"

import * as React from "react"
import {
  ArrowRight,
  Banknote,
  BarChart3,
  CheckCircle2,
  CircleCheckBig,
  Clock3,
  Copy,
  Filter,
  Info,
  Layers3,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  TriangleAlert,
  Wallet as WalletIcon,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import {
  bucketIds,
  bucketMeta,
  kindMeta,
  severityMeta,
  snapshotOptions,
  snapshots,
  timeRangeOptions,
  type PolicyItem,
  type Wallet,
  type Snapshot,
  type SnapshotId,
  type LiquidityBucket,
  type AssetKind,
  type Severity,
  type TimeRangeId,
} from "./data"

type DashboardTab = "overview" | "actions" | "ledger"
type LedgerFilter = "all" | LiquidityBucket

const runwayChartConfig = {
  observed: {
    label: "Observed runway",
    color: "#5eead4",
  },
  stressed: {
    label: "Stress runway",
    color: "#fb7185",
  },
}

const kindChartConfig = {
  stablecoin: {
    label: kindMeta.stablecoin.label,
    color: kindMeta.stablecoin.color,
  },
  btcEth: {
    label: kindMeta.btcEth.label,
    color: kindMeta.btcEth.color,
  },
  yield: {
    label: kindMeta.yield.label,
    color: kindMeta.yield.color,
  },
  fiat: {
    label: kindMeta.fiat.label,
    color: kindMeta.fiat.color,
  },
}

const bucketSortOrder: Record<LiquidityBucket, number> = {
  immediate: 0,
  "same-day": 1,
  delayed: 2,
  restricted: 3,
}

const timeRangeSlices: Record<TimeRangeId, number> = {
  "7d": 3,
  "30d": 5,
  "90d": 7,
}

const severityWeights: Record<Severity, number> = {
  low: 1,
  medium: 2,
  high: 4,
  critical: 7,
}

const EMPTY_STRING_ARRAY: string[] = []

const compactUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
})

const detailedUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function formatUsdCompact(value: number) {
  if (!Number.isFinite(value)) {
    return "—"
  }

  return compactUsd.format(value)
}

function formatUsdDetailed(value: number) {
  if (!Number.isFinite(value)) {
    return "—"
  }

  return detailedUsd.format(value)
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) {
    return "—"
  }

  return `${value.toFixed(1)}%`
}

function formatMonths(value: number | null) {
  if (value == null || !Number.isFinite(value)) {
    return "—"
  }

  return `${value.toFixed(1)} mo`
}

function formatUtc(iso: string) {
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso))

  return `${time} UTC`
}

function usePersistentState<T>(key: string, fallback: T) {
  const getSnapshot = React.useCallback(() => {
    if (typeof window === "undefined") {
      return fallback
    }

    try {
      const raw = window.localStorage.getItem(key)
      return raw == null ? fallback : (JSON.parse(raw) as T)
    } catch {
      return fallback
    }
  }, [fallback, key])

  const subscribe = React.useCallback(
    (callback: () => void) => {
      if (typeof window === "undefined") {
        return () => {}
      }

      const storageEventName = `reserve-scope:${key}`
      const onStorage = (event: StorageEvent) => {
        if (event.storageArea !== window.localStorage || event.key !== key) {
          return
        }

        callback()
      }
      const onCustom = () => {
        callback()
      }

      window.addEventListener("storage", onStorage)
      window.addEventListener(storageEventName, onCustom)

      return () => {
        window.removeEventListener("storage", onStorage)
        window.removeEventListener(storageEventName, onCustom)
      }
    },
    [key]
  )

  const value = React.useSyncExternalStore(subscribe, getSnapshot, () => fallback)

  const setValue = React.useCallback<React.Dispatch<React.SetStateAction<T>>>(
    (update) => {
      if (typeof window === "undefined") {
        return
      }

      const current = getSnapshot()
      const next =
        typeof update === "function"
          ? (update as (currentValue: T) => T)(current)
          : update

      window.localStorage.setItem(key, JSON.stringify(next))
      window.dispatchEvent(new Event(`reserve-scope:${key}`))
    },
    [getSnapshot, key]
  )

  return [value, setValue] as const
}

function toggleArrayValue(current: string[], value: string) {
  return current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value]
}

function getWalletTotals(wallets: Wallet[]) {
  return wallets.reduce(
    (acc, wallet) => {
      acc.totalUsd += wallet.balanceUsd
      acc.liquidUsd += wallet.availableUsd
      acc.stablecoinUsd += wallet.kind === "stablecoin" ? wallet.balanceUsd : 0
      acc.atRiskUsd += wallet.riskState === "healthy" ? 0 : wallet.balanceUsd
      acc.kindTotals[wallet.kind] += wallet.balanceUsd
      acc.bucketTotals[wallet.bucket] += wallet.balanceUsd

      return acc
    },
    {
      totalUsd: 0,
      liquidUsd: 0,
      stablecoinUsd: 0,
      atRiskUsd: 0,
      kindTotals: {
        stablecoin: 0,
        btcEth: 0,
        yield: 0,
        fiat: 0,
      } satisfies Record<AssetKind, number>,
      bucketTotals: {
        immediate: 0,
        "same-day": 0,
        delayed: 0,
        restricted: 0,
      } satisfies Record<LiquidityBucket, number>,
    }
  )
}

function sortWallets(wallets: Wallet[]) {
  return [...wallets].sort((a, b) => {
    const bucketDelta = bucketSortOrder[a.bucket] - bucketSortOrder[b.bucket]
    if (bucketDelta !== 0) {
      return bucketDelta
    }

    return b.availableUsd - a.availableUsd
  })
}

function buildBoardNote(
  snapshot: Snapshot,
  policyHealth: number,
  runwayMonths: number | null,
  stressRunwayMonths: number | null,
  openAlertCount: number,
  capitalAtRisk: number,
  selectedWallet: Wallet | undefined
) {
  const selected = selectedWallet
    ? `Selected wallet: ${selectedWallet.label} (${selectedWallet.bucket})`
    : "Selected wallet: none"

  return [
    "ReserveScope board note",
    `${snapshot.label} · ${snapshot.stateLabel}`,
    `Liquid runway: ${formatMonths(runwayMonths)}`,
    `Stress runway: ${formatMonths(stressRunwayMonths)}`,
    `Policy health: ${policyHealth}%`,
    `Open alerts: ${openAlertCount}`,
    `Capital at risk: ${formatUsdCompact(capitalAtRisk)}`,
    selected,
    snapshot.demoNote,
  ].join("\n")
}

function statusTone(state: "ok" | "watch" | "breach") {
  switch (state) {
    case "ok":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
    case "watch":
      return "border-amber-400/20 bg-amber-400/10 text-amber-200"
    case "breach":
      return "border-rose-400/20 bg-rose-400/10 text-rose-200"
  }
}

function severityTone(severity: Severity) {
  switch (severity) {
    case "low":
      return "border-slate-500/20 bg-slate-500/10 text-slate-200"
    case "medium":
      return "border-amber-400/20 bg-amber-400/10 text-amber-200"
    case "high":
      return "border-rose-400/20 bg-rose-400/10 text-rose-200"
    case "critical":
      return "border-rose-500/30 bg-rose-500/15 text-rose-100"
  }
}

function riskTone(state: "healthy" | "watch" | "breach") {
  switch (state) {
    case "healthy":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
    case "watch":
      return "border-amber-400/20 bg-amber-400/10 text-amber-200"
    case "breach":
      return "border-rose-400/20 bg-rose-400/10 text-rose-200"
  }
}

function firstCharacters(value: string) {
  return value
    .split(/\s+/)
    .slice(0, 3)
    .join(" ")
}

export function TreasuryDashboard() {
  const [snapshotId, setSnapshotId] = usePersistentState<SnapshotId>(
    "reserve-scope-snapshot",
    "normal"
  )
  const snapshot =
    snapshots.find((entry) => entry.id === snapshotId) ?? snapshots[0]
  const [activeTab, setActiveTab] = usePersistentState<DashboardTab>(
    "reserve-scope-tab",
    "overview"
  )
  const [timeRange, setTimeRange] = usePersistentState<TimeRangeId>(
    "reserve-scope-range",
    "30d"
  )
  const [selectedWalletId, setSelectedWalletId] = usePersistentState<
    string | null
  >(`reserve-scope-wallet-${snapshotId}`, null)
  const [resolvedAlertIds, setResolvedAlertIds] = usePersistentState<string[]>(
    `reserve-scope-alerts-${snapshotId}`,
    EMPTY_STRING_ARRAY
  )
  const [queuedActionIds, setQueuedActionIds] = usePersistentState<string[]>(
    `reserve-scope-actions-${snapshotId}`,
    EMPTY_STRING_ARRAY
  )
  const [ledgerFilter, setLedgerFilter] =
    React.useState<LedgerFilter>("all")
  const [stressLevel, setStressLevel] = usePersistentState<number>(
    `reserve-scope-stress-${snapshotId}`,
    snapshot.defaultStress
  )
  const [copyState, setCopyState] = React.useState<"idle" | "copied" | "error">(
    "idle"
  )

  const sortedWallets = React.useMemo(
    () => sortWallets(snapshot.wallets),
    [snapshot.wallets]
  )

  const filteredWallets = React.useMemo(() => {
    if (snapshot.id === "empty") {
      return []
    }

    if (ledgerFilter === "all") {
      return sortedWallets
    }

    return sortedWallets.filter((wallet) => wallet.bucket === ledgerFilter)
  }, [ledgerFilter, sortedWallets, snapshot.id])

  const openAlerts = React.useMemo(() => {
    return snapshot.alerts.filter((alert) => !resolvedAlertIds.includes(alert.id))
  }, [resolvedAlertIds, snapshot.alerts])

  const queuedActions = React.useMemo(() => {
    return snapshot.actions.filter((action) =>
      queuedActionIds.includes(action.id)
    )
  }, [queuedActionIds, snapshot.actions])

  const totals = React.useMemo(() => getWalletTotals(snapshot.wallets), [snapshot.wallets])

  const runwayMonths =
    snapshot.burnUsdPerMonth > 0 ? totals.liquidUsd / snapshot.burnUsdPerMonth : null

  const stressPenalty = (stressLevel / 100) * snapshot.stressRunwayDragAt100
  const stressRunwayMonths =
    runwayMonths == null ? null : Math.max(0, runwayMonths - stressPenalty)

  const capitalAtRisk =
    totals.atRiskUsd + (stressLevel / 100) * snapshot.stressCapitalAt100

  const policyPenalty = openAlerts.reduce(
    (sum, alert) => sum + severityWeights[alert.severity],
    0
  )

  const policyHealth =
    snapshot.id === "empty"
      ? 0
      : clamp(
          snapshot.basePolicyScore - policyPenalty - Math.round(stressLevel * 0.06),
          0,
          100
        )

  const stablecoinShare =
    totals.totalUsd > 0 ? (totals.stablecoinUsd / totals.totalUsd) * 100 : 0

  const runwayHistoryWindow = snapshot.runwayHistory.slice(
    Math.max(0, snapshot.runwayHistory.length - timeRangeSlices[timeRange])
  )

  const runwayChartData = runwayHistoryWindow.map((point) => ({
    label: point.label,
    observed: point.observed,
    stressed: Math.max(0, point.observed - stressPenalty),
  }))

  const kindMixData = (Object.keys(kindChartConfig) as AssetKind[])
    .map((kind) => ({
      kind,
      label: kindChartConfig[kind].label,
      value: totals.kindTotals[kind],
      share:
        totals.totalUsd > 0 ? (totals.kindTotals[kind] / totals.totalUsd) * 100 : 0,
      fill: kindChartConfig[kind].color,
    }))
    .filter((entry) => entry.value > 0)

  const selectedWallet =
    filteredWallets.find((wallet) => wallet.id === selectedWalletId) ??
    filteredWallets[0] ??
    sortedWallets[0] ??
    null

  React.useEffect(() => {
    if (copyState !== "copied") {
      return
    }

    const timer = window.setTimeout(() => setCopyState("idle"), 1800)
    return () => window.clearTimeout(timer)
  }, [copyState])

  function resolveAlert(id: string) {
    setResolvedAlertIds((current) => toggleArrayValue(current, id))
  }

  function queueAction(id: string) {
    setQueuedActionIds((current) => toggleArrayValue(current, id))
  }

  async function copyBoardSummary() {
    try {
      await navigator.clipboard.writeText(
        buildBoardNote(
          snapshot,
          policyHealth,
          runwayMonths,
          stressRunwayMonths,
          openAlerts.length,
          capitalAtRisk,
          selectedWallet ?? undefined
        )
      )
      setCopyState("copied")
    } catch {
      setCopyState("error")
    }
  }

  function resetView() {
    setActiveTab("overview")
    setTimeRange("30d")
    setLedgerFilter("all")
    setResolvedAlertIds([])
    setQueuedActionIds([])
    setStressLevel(snapshot.defaultStress)
    setSelectedWalletId(snapshot.wallets[0]?.id ?? null)
    setCopyState("idle")
  }

  return (
    <TooltipProvider delay={150}>
      <main className="flex min-h-screen flex-col gap-6 px-4 pb-8 pt-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
                ReserveScope
              </Badge>
              <Badge className="border-sky-400/20 bg-sky-400/10 text-sky-200">
                Seeded demo data
              </Badge>
              <Badge className="border-amber-400/20 bg-amber-400/10 text-amber-200">
                No live wallets
              </Badge>
              <Badge className="border-white/10 bg-white/5 text-slate-200">
                Last sync {formatUtc(snapshot.updatedAt)}
              </Badge>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
                Treasury risk cockpit
              </p>
              <div className="flex flex-wrap items-end gap-3">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {snapshot.label}
                </h1>
                <Badge className={cn("border-white/10 bg-white/5", statusTone(
                  snapshot.id === "empty" ? "watch" : policyHealth >= 80 ? "ok" : policyHealth >= 50 ? "watch" : "breach"
                ))}>
                  {snapshot.stateLabel}
                </Badge>
              </div>
              <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                {snapshot.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Segment {snapshot.segment}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Stablecoin mix {formatPercent(stablecoinShare)}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Burn {formatUsdCompact(snapshot.burnUsdPerMonth)}/mo
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {snapshot.demoNote}
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[480px] xl:grid-cols-2">
            <MetricCard
              icon={<BarChart3 className="h-4 w-4" />}
              label="Liquid runway"
              value={formatMonths(runwayMonths)}
              caption={
                runwayMonths == null
                  ? "No liquidity yet"
                  : `Observed from ${formatUsdCompact(totals.liquidUsd)} liquid capital`
              }
              help="Liquid runway = available capital divided by monthly burn."
              tone="emerald"
            />
            <MetricCard
              icon={<Banknote className="h-4 w-4" />}
              label="Liquid balance"
              value={snapshot.id === "empty" ? "—" : formatUsdCompact(totals.liquidUsd)}
              caption="Available now, excluding delayed and restricted capital"
              help="Liquid capital is the balance that can move now or same day."
              tone="sky"
            />
            <MetricCard
              icon={<CheckCircle2 className="h-4 w-4" />}
              label="Policy health"
              value={snapshot.id === "empty" ? "—" : `${policyHealth}%`}
              caption={`${openAlerts.length} open alerts, stress-adjusted`}
              help="The score falls when alerts stay open or stress rises."
              tone="amber"
            />
            <MetricCard
              icon={<TriangleAlert className="h-4 w-4" />}
              label="At-risk capital"
              value={snapshot.id === "empty" ? "—" : formatUsdCompact(capitalAtRisk)}
              caption="Flagged, delayed, restricted, or stressed capital"
              help="This number grows when policy exceptions or stress assumptions increase."
              tone="rose"
            />
          </div>
        </header>

        <section className="grid gap-3 rounded-3xl border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_auto]">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400">
              Demo snapshot
            </p>
            <Select
              value={snapshotId}
              onValueChange={(value) => setSnapshotId(value as SnapshotId)}
            >
              <SelectTrigger className="w-full min-w-0 border-white/10 bg-white/5 text-left text-white">
                <SelectValue placeholder="Select snapshot" />
              </SelectTrigger>
              <SelectContent>
                {snapshotOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label} · {option.helper}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400">
              History window
            </p>
            <ToggleGroup
              aria-label="History window"
              value={[timeRange]}
              onValueChange={(value) => {
                const next = value[0] as TimeRangeId | undefined
                if (next) {
                  setTimeRange(next)
                }
              }}
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-1"
            >
              {timeRangeOptions.map((option) => (
                <ToggleGroupItem
                  key={option.id}
                  aria-label={option.label}
                  value={option.id}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-white/10 text-slate-300 data-[pressed=true]:border-cyan-400/30 data-[pressed=true]:bg-cyan-400/15 data-[pressed=true]:text-white"
                >
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="flex flex-wrap items-end gap-2 lg:justify-end">
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
              onClick={resetView}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset view
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="bg-cyan-300 text-slate-950 hover:bg-cyan-200"
              onClick={copyBoardSummary}
            >
              <Copy className="h-3.5 w-3.5" />
              {copyState === "copied" ? "Copied" : "Copy board note"}
            </Button>
            {copyState === "error" ? (
              <Badge className="border-rose-400/20 bg-rose-400/10 text-rose-200">
                Copy unavailable
              </Badge>
            ) : (
              <Badge className="border-white/10 bg-white/5 text-slate-200">
                {activeTab} · {snapshot.stateLabel}
              </Badge>
            )}
          </div>
        </section>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as DashboardTab)}
          className="w-full"
        >
          <TabsList
            variant="line"
            className="mb-6 w-full justify-start gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1"
          >
            <TabsTrigger
              value="overview"
              className="rounded-xl px-4 py-2.5 text-sm text-slate-300 data-active:bg-white/10 data-active:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="actions"
              className="rounded-xl px-4 py-2.5 text-sm text-slate-300 data-active:bg-white/10 data-active:text-white"
            >
              Actions
            </TabsTrigger>
            <TabsTrigger
              value="ledger"
              className="rounded-xl px-4 py-2.5 text-sm text-slate-300 data-active:bg-white/10 data-active:text-white"
            >
              Ledger
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {snapshot.id === "empty" ? (
              <EmptyPanel
                title="No treasury data connected yet"
                description="This demo route is intentionally blank until watch-only wallets, address labels, and policy rules are configured."
                steps={snapshot.setupSteps}
              />
            ) : (
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                <div className="space-y-6">
                  <Card className="border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
                    <CardHeader className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-white">
                            <BarChart3 className="h-4 w-4 text-cyan-300" />
                            Runway trajectory
                          </CardTitle>
                          <CardDescription className="text-slate-400">
                            Observed runway versus stress-adjusted runway over the selected window.
                          </CardDescription>
                        </div>
                        <Badge className="border-white/10 bg-white/5 text-slate-200">
                          {timeRange.toUpperCase()} window
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={runwayChartConfig}
                        className="h-[280px] w-full"
                      >
                        <AreaChart data={runwayChartData} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                          <defs>
                            <linearGradient id="runwayObserved" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--color-observed)" stopOpacity={0.35} />
                              <stop offset="95%" stopColor="var(--color-observed)" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="runwayStressed" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--color-stressed)" stopOpacity={0.28} />
                              <stop offset="95%" stopColor="var(--color-stressed)" stopOpacity={0.02} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.15)" />
                          <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            fontSize={12}
                            stroke="#94a3b8"
                          />
                          <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            width={42}
                            fontSize={12}
                            stroke="#94a3b8"
                            tickFormatter={(value) => `${value}m`}
                          />
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                indicator="line"
                                labelFormatter={(label) => `Week of ${label}`}
                                formatter={(value, name) => {
                                  const numeric = Number(value)
                                  return (
                                    <div className="flex w-full items-center justify-between gap-6">
                                      <span className="text-slate-300">
                                        {name === "observed" ? "Observed" : "Stress"}
                                      </span>
                                      <span className="font-mono tabular-nums text-white">
                                        {formatMonths(numeric)}
                                      </span>
                                    </div>
                                  )
                                }}
                              />
                            }
                          />
                          <ReferenceLine
                            y={12}
                            stroke="#fbbf24"
                            strokeDasharray="4 4"
                            strokeOpacity={0.8}
                            label={{
                              value: "12-mo target",
                              position: "insideTopRight",
                              fill: "#fbbf24",
                              fontSize: 11,
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="observed"
                            stroke="var(--color-observed)"
                            strokeWidth={2}
                            fill="url(#runwayObserved)"
                            dot={false}
                          />
                          <Area
                            type="monotone"
                            dataKey="stressed"
                            stroke="var(--color-stressed)"
                            strokeWidth={2}
                            strokeDasharray="6 4"
                            fill="url(#runwayStressed)"
                            dot={false}
                          />
                        </AreaChart>
                      </ChartContainer>
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          Observed runway = liquid capital ÷ burn
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          Stress runway uses the slider assumption
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
                    <CardHeader className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-white">
                            <Layers3 className="h-4 w-4 text-teal-300" />
                            Asset mix
                          </CardTitle>
                          <CardDescription className="text-slate-400">
                            Composition of total treasury by asset class.
                          </CardDescription>
                        </div>
                        <Badge className="border-white/10 bg-white/5 text-slate-200">
                          {formatUsdCompact(totals.totalUsd)} total
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="grid gap-6 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
                      <ChartContainer
                        config={kindChartConfig}
                        className="mx-auto h-[250px] w-full max-w-[280px]"
                      >
                        <PieChart>
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                hideLabel={false}
                                formatter={(value, name) => (
                                  <div className="flex w-full items-center justify-between gap-6">
                                    <span className="text-slate-300">
                                      {kindChartConfig[name as keyof typeof kindChartConfig]?.label ??
                                        firstCharacters(String(name))}
                                    </span>
                                    <span className="font-mono tabular-nums text-white">
                                      {formatUsdCompact(Number(value))}
                                    </span>
                                  </div>
                                )}
                              />
                            }
                          />
                          <Pie
                            data={kindMixData}
                            dataKey="value"
                            nameKey="kind"
                            innerRadius={68}
                            outerRadius={98}
                            paddingAngle={3}
                            stroke="rgba(2,6,23,0.8)"
                            strokeWidth={2}
                          >
                            {kindMixData.map((entry) => (
                              <Cell key={entry.kind} fill={entry.fill} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ChartContainer>

                      <div className="space-y-3">
                        {kindMixData.map((entry) => (
                          <div
                            key={entry.kind}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <span
                                  className="h-2.5 w-2.5 rounded-full"
                                  style={{ backgroundColor: entry.fill }}
                                />
                                <span className="text-sm font-medium text-white">
                                  {entry.label}
                                </span>
                              </div>
                              <span className="font-mono text-sm tabular-nums text-slate-200">
                                {formatPercent(entry.share)}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                              <span>{formatUsdCompact(entry.value)} in treasury</span>
                              <span>{Math.round(entry.share)}% of total</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
                    <CardHeader className="space-y-2">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Banknote className="h-4 w-4 text-emerald-300" />
                        Liquidity readiness
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Balance share by movement speed, not by cosmetic account type.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {bucketIds.map((bucket) => {
                        const amount = totals.bucketTotals[bucket]
                        const share =
                          totals.totalUsd > 0 ? (amount / totals.totalUsd) * 100 : 0
                        const bucketStyle = bucketMeta[bucket]

                        return (
                          <div key={bucket} className="space-y-2">
                            <div className="flex items-center justify-between gap-3 text-sm">
                              <span className="font-medium text-white">
                                {bucketStyle.label}
                              </span>
                              <span className="font-mono tabular-nums text-slate-300">
                                {formatPercent(share)} · {formatUsdCompact(amount)}
                              </span>
                            </div>
                            <Progress value={share}>
                              <span className="sr-only">{bucketStyle.label}</span>
                            </Progress>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>

                  <Card className="border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
                    <CardHeader className="space-y-2">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <ShieldCheck className="h-4 w-4 text-cyan-300" />
                        Policy stack
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Readiness and control-plane status for treasury execution.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {snapshot.policyStack.map((item) => (
                        <PolicyRow key={item.label} item={item} />
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
                    <CardHeader className="space-y-2">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Clock3 className="h-4 w-4 text-slate-300" />
                        Latest movement
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Recent treasury activity and the provenance source.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {snapshot.events.map((event) => (
                        <EventRow key={`${event.when}-${event.title}`} event={event} />
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            {snapshot.id === "empty" ? (
              <EmptyPanel
                title="No alerts yet"
                description="The action center comes alive once watch-only wallets and beneficiary data are connected."
                steps={snapshot.setupSteps}
              />
            ) : (
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400">
                        Open alerts
                      </p>
                      <h2 className="mt-2 text-lg font-semibold tracking-tight text-white">
                        {openAlerts.length === 0 ? "No open alerts" : `${openAlerts.length} items need review`}
                      </h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                      <Badge className="border-white/10 bg-white/5 text-slate-200">
                        {snapshot.alerts.length - openAlerts.length} resolved
                      </Badge>
                      <Badge className="border-white/10 bg-white/5 text-slate-200">
                        {queuedActions.length} queued actions
                      </Badge>
                    </div>
                  </div>

                  {openAlerts.length === 0 ? (
                    <Card className="border-white/10 bg-white/[0.035]">
                      <CardContent className="py-10">
                        <Empty
                          className="border-white/10 bg-white/[0.02]"
                          aria-label="All alerts resolved"
                        >
                          <EmptyHeader>
                            <EmptyMedia variant="icon" className="bg-emerald-400/10 text-emerald-200">
                              <CircleCheckBig className="h-4 w-4" />
                            </EmptyMedia>
                            <EmptyTitle>All alerts are clear</EmptyTitle>
                            <EmptyDescription>
                              Resolve state persists locally, so the queue can be reviewed as a real operating list.
                            </EmptyDescription>
                          </EmptyHeader>
                        </Empty>
                      </CardContent>
                    </Card>
                  ) : (
                    openAlerts.map((alert) => {
                      const resolved = resolvedAlertIds.includes(alert.id)
                      const alertMeta = severityMeta[alert.severity]
                      return (
                        <Alert
                          key={alert.id}
                          variant="default"
                          className={cn(
                            "border-white/10 bg-white/[0.035] p-0",
                            resolved && "opacity-70"
                          )}
                        >
                          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
                            <div className={cn("mt-1 h-2.5 w-2.5 rounded-full", alertMeta.color)} />
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <AlertTitle className="text-sm font-medium text-white">
                                  {alert.title}
                                </AlertTitle>
                                <Badge className={cn("border-white/10", severityTone(alert.severity))}>
                                  {alertMeta.label}
                                </Badge>
                                {resolved ? (
                                  <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
                                    Resolved
                                  </Badge>
                                ) : null}
                              </div>
                              <AlertDescription className="mt-2 text-sm text-slate-300">
                                {alert.detail}
                              </AlertDescription>
                              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">
                                  Impact {formatUsdCompact(alert.impactUsd)}
                                </span>
                                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">
                                  Source {alert.source}
                                </span>
                              </div>
                              <p className="mt-3 text-sm text-slate-300">
                                <span className="text-slate-400">Recommended move:</span>{" "}
                                {alert.recommendation}
                              </p>
                            </div>
                            <div className="flex shrink-0 flex-wrap gap-2">
                              <Button
                                variant={resolved ? "secondary" : "outline"}
                                size="sm"
                                className={cn(
                                  "border-white/10",
                                  resolved
                                    ? "bg-emerald-300 text-slate-950 hover:bg-emerald-200"
                                    : "bg-white/5 text-slate-200 hover:bg-white/10"
                                )}
                                onClick={() => resolveAlert(alert.id)}
                              >
                                {resolved ? "Undo" : "Resolve"}
                              </Button>
                            </div>
                          </div>
                        </Alert>
                      )
                    })
                  )}
                </div>

                <div className="space-y-6">
                  <Card className="border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
                    <CardHeader className="space-y-2">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <TriangleAlert className="h-4 w-4 text-amber-300" />
                        Shock model
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Adjust the stress assumption to see runway and capital-at-risk move.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-white">
                          Stress assumption
                        </span>
                        <Badge className="border-white/10 bg-white/5 text-slate-200">
                          {stressLevel}%
                        </Badge>
                      </div>
                      <Slider
                        value={[stressLevel]}
                        min={0}
                        max={100}
                        onValueChange={(value) => {
                          const next = Array.isArray(value) ? value[0] : value
                          setStressLevel(next ?? snapshot.defaultStress)
                        }}
                      />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
                            Projected runway
                          </p>
                          <p className="mt-2 font-mono text-2xl tabular-nums text-white">
                            {formatMonths(stressRunwayMonths)}
                          </p>
                          <p className="mt-1 text-sm text-slate-400">
                            After applying the current shock assumption
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
                            Capital at risk
                          </p>
                          <p className="mt-2 font-mono text-2xl tabular-nums text-white">
                            {formatUsdCompact(capitalAtRisk)}
                          </p>
                          <p className="mt-1 text-sm text-slate-400">
                            Flagged, restricted, or stressed capital
                          </p>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300">
                        The slider does not execute trades. It only changes the simulated stress assumptions for board and risk review.
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
                    <CardHeader className="space-y-2">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <ArrowRight className="h-4 w-4 text-cyan-300" />
                        Suggested actions
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Queue the next move. Queue state persists locally for demo review.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {snapshot.actions.map((action) => {
                        const queued = queuedActionIds.includes(action.id)

                        return (
                          <div
                            key={action.id}
                            className={cn(
                              "rounded-2xl border border-white/10 bg-white/[0.03] p-3",
                              queued && "border-cyan-400/30 bg-cyan-400/10"
                            )}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-medium text-white">{action.title}</p>
                                <p className="mt-1 text-sm text-slate-400">
                                  {action.detail}
                                </p>
                              </div>
                              <Button
                                variant={queued ? "secondary" : "outline"}
                                size="sm"
                                className={cn(
                                  "border-white/10",
                                  queued
                                    ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200"
                                    : "bg-white/5 text-slate-200 hover:bg-white/10"
                                )}
                                onClick={() => queueAction(action.id)}
                              >
                                {queued ? "Queued" : "Queue"}
                              </Button>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                              <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">
                                {action.impact}
                              </span>
                              <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">
                                {action.confidence}
                              </span>
                              <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">
                                ETA {action.eta}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ledger" className="space-y-6">
            {snapshot.id === "empty" ? (
              <EmptyPanel
                title="Wallet ledger not connected"
                description="Start with watch-only addresses, labels, and approvals before any balances appear here."
                steps={snapshot.setupSteps}
              />
            ) : (
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400">
                        Wallet ledger
                      </p>
                      <h2 className="mt-2 text-lg font-semibold tracking-tight text-white">
                        {filteredWallets.length} wallet
                        {filteredWallets.length === 1 ? "" : "s"}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="border-white/10 bg-white/5 text-slate-200">
                        <Filter className="mr-1 h-3 w-3" />
                        Readiness filter
                      </Badge>
                    </div>
                  </div>

                  <ToggleGroup
                    aria-label="Readiness filter"
                    value={[ledgerFilter]}
                    onValueChange={(value) => {
                      const next = value[0] as LedgerFilter | undefined
                      if (next) {
                        setLedgerFilter(next)
                      }
                    }}
                    className="w-full flex-wrap rounded-2xl border border-white/10 bg-white/[0.03] p-1"
                  >
                    <ToggleGroupItem
                      value="all"
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-slate-300 data-[pressed=true]:border-cyan-400/30 data-[pressed=true]:bg-cyan-400/15 data-[pressed=true]:text-white"
                    >
                      All
                    </ToggleGroupItem>
                    {bucketIds.map((bucket) => (
                      <ToggleGroupItem
                        key={bucket}
                        value={bucket}
                        variant="outline"
                        size="sm"
                        className="border-white/10 text-slate-300 data-[pressed=true]:border-cyan-400/30 data-[pressed=true]:bg-cyan-400/15 data-[pressed=true]:text-white"
                      >
                        {bucketMeta[bucket].label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>

                  <Card className="border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
                    <CardContent className="p-0">
                      <Table className="border-separate border-spacing-0">
                        <TableHeader>
                          <TableRow className="border-white/10 bg-white/[0.02]">
                            <TableHead className="px-4 py-3 text-[11px] uppercase tracking-[0.28em] text-slate-400">
                              Wallet
                            </TableHead>
                            <TableHead className="px-4 py-3 text-[11px] uppercase tracking-[0.28em] text-slate-400">
                              Readiness
                            </TableHead>
                            <TableHead className="px-4 py-3 text-[11px] uppercase tracking-[0.28em] text-slate-400">
                              Balance
                            </TableHead>
                            <TableHead className="px-4 py-3 text-[11px] uppercase tracking-[0.28em] text-slate-400">
                              Available
                            </TableHead>
                            <TableHead className="hidden md:table-cell px-4 py-3 text-[11px] uppercase tracking-[0.28em] text-slate-400">
                              Risk
                            </TableHead>
                            <TableHead className="hidden lg:table-cell px-4 py-3 text-[11px] uppercase tracking-[0.28em] text-slate-400">
                              Source
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredWallets.map((wallet) => {
                            const selected = wallet.id === selectedWallet?.id
                            const bucketStyle = bucketMeta[wallet.bucket]
                            return (
                              <TableRow
                                key={wallet.id}
                                data-state={selected ? "selected" : undefined}
                                tabIndex={0}
                                role="button"
                                onClick={() => setSelectedWalletId(wallet.id)}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault()
                                    setSelectedWalletId(wallet.id)
                                  }
                                }}
                                className={cn(
                                  "cursor-pointer border-white/10 transition-colors hover:bg-white/[0.03]",
                                  selected && "bg-cyan-400/10"
                                )}
                              >
                                <TableCell className="px-4 py-4 align-top">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                        <WalletIcon className="h-4 w-4 text-slate-300" />
                                      <span className="font-medium text-white">
                                        {wallet.label}
                                      </span>
                                    </div>
                                    <p className="max-w-[16rem] truncate font-mono text-xs text-slate-400">
                                      {wallet.address}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                      {wallet.chain} · {wallet.custody}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell className="px-4 py-4 align-top">
                                  <Badge
                                    className={cn(
                                      "border-white/10",
                                      riskTone(wallet.riskState)
                                    )}
                                  >
                                    {bucketStyle.label}
                                  </Badge>
                                </TableCell>
                                <TableCell className="px-4 py-4 align-top font-mono text-sm tabular-nums text-slate-200">
                                  {formatUsdDetailed(wallet.balanceUsd)}
                                </TableCell>
                                <TableCell className="px-4 py-4 align-top font-mono text-sm tabular-nums text-slate-200">
                                  {formatUsdDetailed(wallet.availableUsd)}
                                </TableCell>
                                <TableCell className="hidden md:table-cell px-4 py-4 align-top">
                                  <Badge
                                    className={cn(
                                      "border-white/10",
                                      riskTone(wallet.riskState)
                                    )}
                                  >
                                    {wallet.riskState}
                                  </Badge>
                                </TableCell>
                                <TableCell className="hidden lg:table-cell px-4 py-4 align-top text-sm text-slate-400">
                                  <span className="block max-w-[14rem] truncate">
                                    {wallet.provenance}
                                  </span>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {selectedWallet ? (
                    <Card className="border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
                      <CardHeader className="space-y-2">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="space-y-2">
                            <CardTitle className="text-white">
                              {selectedWallet.label}
                            </CardTitle>
                            <CardDescription className="text-slate-400">
                              {selectedWallet.role} · {selectedWallet.chain}
                            </CardDescription>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={cn("border-white/10", riskTone(selectedWallet.riskState))}>
                              {selectedWallet.riskState}
                            </Badge>
                            <Badge className="border-white/10 bg-white/5 text-slate-200">
                              {bucketMeta[selectedWallet.bucket].label}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <ValueTile label="Balance" value={formatUsdDetailed(selectedWallet.balanceUsd)} />
                          <ValueTile label="Available" value={formatUsdDetailed(selectedWallet.availableUsd)} />
                          <ValueTile label="Freshness" value={selectedWallet.freshness} />
                          <ValueTile label="Last move" value={selectedWallet.lastMovement} />
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
                            Provenance
                          </p>
                          <p className="mt-2 text-sm text-slate-200">
                            {selectedWallet.provenance}
                          </p>
                          <p className="mt-2 text-sm text-slate-400">
                            Screening: {selectedWallet.screening}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
                              Counterparties
                            </p>
                            <Badge className="border-white/10 bg-white/5 text-slate-200">
                              {selectedWallet.kind}
                            </Badge>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {selectedWallet.counterparties.map((party) => (
                              <Badge
                                key={party}
                                className="border-white/10 bg-white/[0.02] text-slate-200"
                              >
                                {party}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-300">
                          <span className="text-slate-400">Notes:</span>{" "}
                          {selectedWallet.notes}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <EmptyPanel
                      title="No wallet selected"
                      description="Pick a wallet row to inspect its provenance, screening status, and liquidity readiness."
                      steps={[
                        "Choose a readiness bucket or keep all wallets visible.",
                        "Click a row to inspect the wallet.",
                        "Check provenance, screening, and counterparty labels.",
                      ]}
                    />
                  )}

                  <Card className="border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
                    <CardHeader className="space-y-2">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <ShieldCheck className="h-4 w-4 text-cyan-300" />
                        Trust notes
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        The demo models the controls treasury teams usually ask about first.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {snapshot.policyStack.map((item) => (
                        <PolicyRow key={item.label} item={item} compact />
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <footer className="pb-2 pt-4 text-xs text-slate-500">
          <p>
            Seeded demo snapshot. No live wallet, price, or transfer connection.
            Last sync {formatUtc(snapshot.updatedAt)}.
          </p>
        </footer>
      </main>
    </TooltipProvider>
  )
}

function MetricCard({
  icon,
  label,
  value,
  caption,
  help,
  tone,
}: {
  icon: React.ReactNode
  label: string
  value: string
  caption: string
  help: string
  tone: "emerald" | "sky" | "amber" | "rose"
}) {
  const toneClasses = {
    emerald: "from-emerald-400/10 to-transparent text-emerald-200",
    sky: "from-sky-400/10 to-transparent text-sky-200",
    amber: "from-amber-400/10 to-transparent text-amber-200",
    rose: "from-rose-400/10 to-transparent text-rose-200",
  }[tone]

  return (
    <Card className="border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
      <CardContent className={cn("space-y-3 bg-gradient-to-br p-4", toneClasses)}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-slate-400">
              <span>{label}</span>
              <MetricHelp text={help} />
            </div>
            <p className="font-mono text-2xl font-semibold tabular-nums text-white">
              {value}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2 text-white">
            {icon}
          </div>
        </div>
        <p className="text-sm text-slate-300">{caption}</p>
      </CardContent>
    </Card>
  )
}

function MetricHelp({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        aria-label={text}
        className="inline-flex size-4 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
      >
        <Info className="h-3 w-3" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs border border-white/10 bg-slate-950/95 text-xs text-slate-200 shadow-2xl shadow-black/40">
        {text}
      </TooltipContent>
    </Tooltip>
  )
}

function PolicyRow({
  item,
  compact = false,
}: {
  item: PolicyItem
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2",
        compact && "bg-white/[0.025]"
      )}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{item.label}</p>
        <p className="mt-0.5 text-xs text-slate-400">{item.value}</p>
      </div>
      <Badge className={cn("shrink-0 border-white/10", statusTone(item.state))}>
        {item.state}
      </Badge>
    </div>
  )
}

function EventRow({ event }: { event: Snapshot["events"][number] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200">
          <Clock3 className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium text-white">{event.title}</p>
            <Badge className="border-white/10 bg-white/5 text-slate-200">
              {event.when}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-slate-300">{event.detail}</p>
          <p className="mt-2 text-xs text-slate-400">{event.source}</p>
        </div>
      </div>
    </div>
  )
}

function ValueTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  )
}

function EmptyPanel({
  title,
  description,
  steps,
}: {
  title: string
  description: string
  steps: string[]
}) {
  return (
    <Card className="border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
      <CardContent className="p-4">
        <Empty className="border-white/10 bg-white/[0.025] px-6 py-12">
          <EmptyHeader className="max-w-lg">
            <EmptyMedia variant="icon" className="bg-cyan-400/10 text-cyan-200">
              <Sparkles className="h-4 w-4" />
            </EmptyMedia>
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyDescription>{description}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="max-w-xl">
            <div className="mt-4 grid w-full gap-3 text-left">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-200"
                >
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono text-xs text-slate-300">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
