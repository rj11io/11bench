"use client"

import * as React from "react"
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Bell,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Layers3,
  LineChart as LineChartIcon,
  Loader2,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Wallet,
  Waves,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
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
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

import styles from "./page.module.css"
import {
  balanceModeOptions,
  getScenarioView,
  protocolMeta,
  rangeOptions,
  rangeToDays,
  scenarioOptions,
  sectionOptions,
  walletMeta,
  workspaceMeta,
  type AlertItem,
  type BalanceMode,
  type RangeId,
  type ScenarioId,
  type ViewId,
} from "./data"

type PersistedState = {
  scenario: ScenarioId
  range: RangeId
  balanceMode: BalanceMode
  section: ViewId
  query: string
  reviewedAlerts: Record<string, boolean>
}

const STORAGE_KEY = "reserve-desk-state-v1"

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const currencyCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
})

const shortNumber = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
})

function formatUsd(value: number) {
  if (Math.abs(value) >= 1_000_000) {
    return currencyCompact.format(value)
  }

  return currency.format(value)
}

function formatRatio(value: number) {
  return `${shortNumber.format(value)}x`
}

function formatPct(value: number) {
  return `${shortNumber.format(value)}%`
}

function severityTone(severity: AlertItem["severity"]) {
  switch (severity) {
    case "critical":
      return "border-rose-400/30 bg-rose-500/10 text-rose-200"
    case "warning":
      return "border-amber-400/30 bg-amber-500/10 text-amber-100"
    case "info":
      return "border-sky-400/30 bg-sky-500/10 text-sky-100"
  }
}

function stateTone(state: "healthy" | "watch" | "risk") {
  switch (state) {
    case "healthy":
      return "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
    case "watch":
      return "border-amber-400/30 bg-amber-500/10 text-amber-100"
    case "risk":
      return "border-rose-400/30 bg-rose-500/10 text-rose-100"
  }
}

function sourceTone(status: "current" | "stale" | "degraded") {
  switch (status) {
    case "current":
      return "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
    case "stale":
      return "border-amber-400/30 bg-amber-500/10 text-amber-100"
    case "degraded":
      return "border-rose-400/30 bg-rose-500/10 text-rose-100"
  }
}

function basisTone(mode: BalanceMode) {
  return mode === "reported"
    ? "border-amber-400/30 bg-amber-500/10 text-amber-100"
    : "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
}

function matchesQuery(parts: Array<string | number>, query: string) {
  if (!query.trim()) {
    return true
  }

  const needle = query.trim().toLowerCase()
  return parts
    .map((part) => String(part).toLowerCase())
    .some((part) => part.includes(needle))
}

function usePersistentState(defaultState: PersistedState) {
  const [state, setState] = React.useState<PersistedState>(() => {
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
        reviewedAlerts: parsed.reviewedAlerts ?? defaultState.reviewedAlerts,
      }
    } catch {
      return defaultState
    }
  })
  const hydratedRef = React.useRef(false)

  React.useEffect(() => {
    if (!hydratedRef.current) {
      hydratedRef.current = true
      return
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  return [state, setState, true] as const
}

function MetricCard({
  label,
  value,
  hint,
  badge,
  icon,
  progress,
}: {
  label: string
  value: string
  hint: string
  badge?: string
  icon: React.ReactNode
  progress?: number
}) {
  return (
    <Card className="border-white/10 bg-white/[0.05] shadow-[0_20px_70px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
      <CardContent className="flex h-full flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-1">
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {label}
            </div>
            <div className="font-mono text-2xl font-semibold tracking-tight text-foreground tabular-nums">
              {value}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 text-foreground/90">
            {icon}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{hint}</p>
        {badge ? (
          <Badge variant="outline" className="w-fit border-white/10 bg-white/[0.04] text-[11px]">
            {badge}
          </Badge>
        ) : null}
        {typeof progress === "number" ? (
          <Progress
            value={Math.max(0, Math.min(progress, 100))}
            className="grid gap-2"
          />
        ) : null}
      </CardContent>
    </Card>
  )
}

function SectionButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      size="sm"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-3",
        active
          ? "border border-white/10 bg-white/10 text-foreground"
          : "text-muted-foreground"
      )}
    >
      {children}
    </Button>
  )
}

function SectionPill({
  tone,
  children,
}: {
  tone: string
  children: React.ReactNode
}) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full border px-2.5 py-1 text-[11px]", tone)}
    >
      {children}
    </Badge>
  )
}

function AlertRow({
  alert,
  reviewed,
  onToggleReviewed,
}: {
  alert: AlertItem
  reviewed: boolean
  onToggleReviewed: (id: string) => void
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3 transition-colors",
        reviewed
          ? "border-white/10 bg-white/[0.03] opacity-70"
          : "border-white/10 bg-white/[0.05]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                "rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]",
                severityTone(alert.severity)
              )}
            >
              {alert.severity}
            </Badge>
            <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {alert.source}
            </span>
          </div>
          <h4 className="mt-2 font-medium leading-5 text-foreground">
            {alert.title}
          </h4>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {alert.detail}
          </p>
        </div>
        <Button
          variant={reviewed ? "outline" : "secondary"}
          size="sm"
          onClick={() => onToggleReviewed(alert.id)}
          className="shrink-0 rounded-full"
        >
          {reviewed ? (
            <CheckCircle2 className="mr-1 size-4" />
          ) : (
            <ShieldAlert className="mr-1 size-4" />
          )}
          {reviewed ? "Reviewed" : "Review"}
        </Button>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>{alert.action}</span>
        {reviewed ? (
          <span className="inline-flex items-center gap-1 text-emerald-200">
            <BadgeCheck className="size-3.5" />
            Saved locally
          </span>
        ) : (
          <span className="inline-flex items-center gap-1">
            <AlertCircle className="size-3.5" />
            Open item
          </span>
        )}
      </div>
    </div>
  )
}

function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string
  description: string
  icon: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <Empty className="border border-dashed border-white/10 bg-white/[0.03]">
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action ? <EmptyContent>{action}</EmptyContent> : null}
    </Empty>
  )
}

export default function TreasuryDeskClient() {
  const [state, setState] = usePersistentState({
    scenario: "normal",
    range: "30d",
    balanceMode: "calculated",
    section: "overview",
    query: "",
    reviewedAlerts: {},
  })
  const [filtersOpen, setFiltersOpen] = React.useState(false)
  const [boardOpen, setBoardOpen] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false)

  const view = React.useMemo(
    () => getScenarioView(state.scenario),
    [state.scenario]
  )

  const query = state.query.trim().toLowerCase()

  const visibleWallets = React.useMemo(() => {
    return walletMeta
      .map((wallet) => ({
        ...wallet,
        ...view.wallets[wallet.id],
        gap: view.wallets[wallet.id].reported - view.wallets[wallet.id].calculated,
      }))
      .filter((wallet) =>
        matchesQuery(
          [
            wallet.name,
            wallet.chain,
            wallet.custody,
            wallet.purpose,
            wallet.policy,
            wallet.tags.join(" "),
            wallet.note,
          ],
          query
        )
      )
  }, [view.wallets, query])

  const visibleProtocols = React.useMemo(() => {
    return protocolMeta
      .map((protocol) => ({
        ...protocol,
        ...view.protocols[protocol.id],
      }))
      .filter((protocol) =>
        matchesQuery(
          [
            protocol.name,
            protocol.chain,
            protocol.category,
            protocol.tokens,
            protocol.guardrail,
            protocol.note,
          ],
          query
        )
      )
  }, [view.protocols, query])

  const visibleAlerts = React.useMemo(() => {
    return view.alerts.filter((alert) =>
      matchesQuery(
        [alert.title, alert.detail, alert.action, alert.source, alert.severity],
        query
      )
    )
  }, [view.alerts, query])

  const visibleSources = React.useMemo(() => {
    return view.sources.filter((source) =>
      matchesQuery(
        [source.name, source.method, source.freshness, source.powers, source.basis, source.status],
        query
      )
    )
  }, [view.sources, query])

  const openCount = view.alerts.filter((alert) => !state.reviewedAlerts[alert.id])
    .length
  const reviewedCount = view.alerts.length - openCount
  const basisLabel =
    state.balanceMode === "reported" ? "Reported basis" : "Calculated basis"
  const treasuryValue =
    state.balanceMode === "reported"
      ? view.treasuryReported
      : view.treasuryCalculated
  const coverageValue =
    state.balanceMode === "reported"
      ? view.liquidCoverageReported
      : view.liquidCoverageCalculated
  const gapUsd = Math.abs(view.treasuryReported - view.treasuryCalculated)
  const coverageProgress = Math.max(
    0,
    Math.min((coverageValue / workspaceMeta.targetCoverage) * 100, 100)
  )

  const chartTreasury = React.useMemo(() => {
    return view.treasurySeries.slice(-rangeToDays(state.range))
  }, [view.treasurySeries, state.range])

  const chartCoverage = React.useMemo(() => {
    return view.coverageSeries.slice(-rangeToDays(state.range))
  }, [view.coverageSeries, state.range])

  const totalProtocolValue = visibleProtocols.reduce(
    (sum, protocol) => sum + protocol.value,
    0
  )

  const maxWalletGap = visibleWallets.reduce(
    (max, wallet) => Math.max(max, Math.abs(wallet.gap)),
    0
  )

  const toggleReviewed = (id: string) => {
    setState((current) => ({
      ...current,
      reviewedAlerts: {
        ...current.reviewedAlerts,
        [id]: !current.reviewedAlerts[id],
      },
    }))
  }

  const resetDemo = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setState({
      scenario: "normal",
      range: "30d",
      balanceMode: "calculated",
      section: "overview",
      query: "",
      reviewedAlerts: {},
    })
  }

  const refreshSnapshot = () => {
    setRefreshing(true)
    window.setTimeout(() => setRefreshing(false), 900)
  }

  const activeSection = state.section

  return (
    <main className={cn(styles.fadeIn, "relative mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8 lg:py-6")}>
      <header className="grid gap-4">
        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_35px_120px_-55px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="rounded-full border-emerald-400/20 bg-emerald-500/10 text-[11px] uppercase tracking-[0.18em] text-emerald-100"
                >
                  {workspaceMeta.product}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full text-[11px] uppercase tracking-[0.18em]",
                    basisTone(state.balanceMode)
                  )}
                >
                  {basisLabel}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full text-[11px] uppercase tracking-[0.18em]",
                    stateTone(view.tone === "calm" ? "healthy" : view.tone === "watch" ? "watch" : "risk")
                  )}
                >
                  {view.label}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {view.snapshot}
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Treasury posture, not just portfolio value.
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
                Reserve Desk turns wallets, protocol sleeves, and source feeds
                into a daily review loop with explicit provenance, balance
                reconciliation, and board-pack ready evidence.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <SectionPill tone="border-white/10 bg-white/[0.04] text-white/80">
                  {workspaceMeta.domain}
                </SectionPill>
                <SectionPill tone="border-amber-400/20 bg-amber-500/10 text-amber-100">
                  {view.headline}
                </SectionPill>
                <SectionPill tone="border-white/10 bg-white/[0.04] text-white/80">
                  No live wallet connection
                </SectionPill>
                <SectionPill tone="border-white/10 bg-white/[0.04] text-white/80">
                  Seeded demo data
                </SectionPill>
              </div>
            </div>

            <div className="grid gap-3 rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.55),rgba(12,17,25,0.9))] p-4 lg:w-[22rem]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    Review status
                  </div>
                  <div className="mt-1 font-mono text-2xl font-semibold tabular-nums text-foreground">
                    {formatUsd(treasuryValue)}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Selected basis for the summary card
                  </div>
                </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 text-foreground/80">
                  <Sparkles className="size-5" />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Liquid coverage
                  </span>
                  <span className="font-mono text-sm tabular-nums text-foreground">
                    {formatRatio(coverageValue)} vs{" "}
                    {formatRatio(workspaceMeta.targetCoverage)}
                  </span>
                </div>
                <Progress value={coverageProgress} className="grid gap-2" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={cn("rounded-full border px-2.5 py-1 text-[11px]", stateTone(view.tone === "calm" ? "healthy" : view.tone === "watch" ? "watch" : "risk"))}>
                  Risk {view.riskScore}/100
                </Badge>
                <Badge variant="outline" className="rounded-full border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/80">
                  {openCount} open items
                </Badge>
                <Badge variant="outline" className="rounded-full border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/80">
                  {reviewedCount} reviewed
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Treasury value"
              value={formatUsd(treasuryValue)}
              hint={`Reported ${formatUsd(view.treasuryReported)} / calculated ${formatUsd(view.treasuryCalculated)}.`}
              badge={`Gap ${formatUsd(gapUsd)}`}
              icon={<CircleDollarSign className="size-5" />}
            />
            <MetricCard
              label="Coverage"
              value={formatRatio(coverageValue)}
              hint={`Target ${formatRatio(workspaceMeta.targetCoverage)} against ${formatUsd(workspaceMeta.liabilities30d)} of 30d obligations.`}
              badge={state.balanceMode === "reported" ? "Reported basis" : "Calculated basis"}
              icon={<Waves className="size-5" />}
              progress={coverageProgress}
            />
            <MetricCard
              label="Open items"
              value={`${openCount}`}
              hint={`Review queue has ${reviewedCount} locally resolved items.`}
              badge={view.headline}
              icon={<Bell className="size-5" />}
            />
            <MetricCard
              label="Data freshness"
              value={view.sources
                .filter((source) => source.status === "current")
                .length
                .toString()}
              hint={`All sources shown with freshness stamps. Oldest active feed is ${view.sources.reduce((oldest, source) => {
                const value = parseInt(source.freshness, 10)
                if (Number.isNaN(value)) {
                  return oldest
                }
                return value > oldest ? value : oldest
              }, 0)}m old.`}
              badge="Source provenance"
              icon={<Clock3 className="size-5" />}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {sectionOptions.map((option) => (
                <SectionButton
                  key={option.id}
                  active={activeSection === option.id}
                  onClick={() =>
                    setState((current) => ({ ...current, section: option.id }))
                  }
                >
                  {option.label}
                </SectionButton>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={state.query}
                  onChange={(event) =>
                    setState((current) => ({ ...current, query: event.target.value }))
                  }
                  placeholder="Search wallets, protocols, sources"
                  className="h-9 rounded-full border-white/10 bg-white/[0.04] pl-8 text-sm placeholder:text-muted-foreground"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFiltersOpen(true)}
                className="rounded-full border-white/10 bg-white/[0.04] md:hidden"
              >
                <SlidersHorizontal className="mr-1.5 size-4" />
                Filters
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetDemo}
                className="rounded-full border-white/10 bg-white/[0.04]"
              >
                Reset
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setBoardOpen(true)}
                className="rounded-full"
              >
                <ClipboardList className="mr-1.5 size-4" />
                Board pack
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
              <ShieldCheck className="size-3.5 text-emerald-300" />
              Read-only posture
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
              <BadgeCheck className="size-3.5 text-sky-300" />
              Reported and calculated balances shown together
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
              <ShieldAlert className="size-3.5 text-amber-300" />
              Trust signals are informational only
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge
              variant="outline"
              className="rounded-full border-white/10 bg-white/[0.04] text-[11px]"
            >
              {workspaceMeta.name}
            </Badge>
            <span>{workspaceMeta.decisionWindow}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshSnapshot}
              className="rounded-full border-white/10 bg-white/[0.04]"
            >
              {refreshing ? (
                <Loader2 className="mr-1.5 size-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-1.5 size-4" />
              )}
              Refresh seeded snapshot
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setBoardOpen(true)}
              className="rounded-full"
            >
              <ClipboardList className="mr-1.5 size-4" />
              Board pack
            </Button>
          </div>
        </div>
      </header>

      {activeSection === "overview" ? (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.85fr)]">
          <Card className="border-white/10 bg-white/[0.05] shadow-[0_30px_100px_-60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="size-4 text-emerald-300" />
                    Treasury trend
                  </CardTitle>
                  <CardDescription>
                    Reported vs calculated values over the selected review window.
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SectionPill tone="border-white/10 bg-white/[0.04] text-white/80">
                    {rangeOptions.find((option) => option.id === state.range)?.label}
                  </SectionPill>
                  <SectionPill tone={basisTone(state.balanceMode)}>
                    {basisLabel}
                  </SectionPill>
                  <SectionPill tone="border-white/10 bg-white/[0.04] text-white/80">
                    Snapshot {view.snapshot}
                  </SectionPill>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer
                config={{
                  reported: {
                    label: "Reported",
                    color: "rgb(245 158 11 / 0.95)",
                  },
                  calculated: {
                    label: "Calculated",
                    color: "rgb(16 185 129 / 0.95)",
                  },
                }}
                className="h-[320px]"
              >
                <LineChart data={chartTreasury} margin={{ left: 8, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }}
                    minTickGap={18}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }}
                    tickFormatter={(value) => `${Math.round(Number(value) / 1_000_000)}M`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => `Day ${String(value)}`}
                        formatter={(value, name) => [
                          formatUsd(Number(value)),
                          String(name),
                        ]}
                      />
                    }
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="reported"
                    stroke="var(--color-reported)"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="calculated"
                    stroke="var(--color-calculated)"
                    strokeWidth={2.5}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Balance gap
                  </div>
                  <div className="mt-1 font-mono text-xl font-semibold tabular-nums text-foreground">
                    {formatUsd(gapUsd)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Reported minus calculated on the selected snapshot.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Liquidity coverage
                  </div>
                  <div className="mt-1 font-mono text-xl font-semibold tabular-nums text-foreground">
                    {formatRatio(coverageValue)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Against {formatUsd(workspaceMeta.liabilities30d)} of 30d obligations.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Oldest active feed
                  </div>
                  <div className="mt-1 font-mono text-xl font-semibold tabular-nums text-foreground">
                    {view.sources.reduce((oldest, source) => {
                      const freshness = parseInt(source.freshness, 10)
                      if (Number.isNaN(freshness)) {
                        return oldest
                      }
                      return freshness > oldest ? freshness : oldest
                    }, 0)}
                    m
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    The review copy always labels stale data instead of hiding it.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.05] shadow-[0_30px_100px_-60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                <Bell className="size-4 text-amber-300" />
                Decision queue
              </CardTitle>
              <CardDescription>
                Review the items that are still open in this session.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              {visibleAlerts.filter((alert) => !state.reviewedAlerts[alert.id]).length === 0 ? (
                <EmptyState
                  title="No open items"
                  description="Everything in the current queue is marked reviewed locally. Reset the demo to reopen the review path."
                  icon={<CheckCircle2 className="size-4" />}
                  action={
                    <Button variant="outline" size="sm" onClick={resetDemo}>
                      Reset reviewed state
                    </Button>
                  }
                />
              ) : (
                <div className="grid gap-3">
                  {visibleAlerts
                    .filter((alert) => !state.reviewedAlerts[alert.id])
                    .slice(0, 4)
                    .map((alert) => (
                      <AlertRow
                        key={alert.id}
                        alert={alert}
                        reviewed={Boolean(state.reviewedAlerts[alert.id])}
                        onToggleReviewed={toggleReviewed}
                      />
                    ))}
                </div>
              )}

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ShieldCheck className="size-4 text-emerald-300" />
                  Trust boundary
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  This demo is read-only, uses seeded data, and never implies
                  live custody, execution, or guaranteed safety. Trust signals
                  are review prompts only.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : null}

      {activeSection === "wallets" ? (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
          <Card className="border-white/10 bg-white/[0.05] backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="size-4 text-cyan-300" />
                Wallet reconciliation
              </CardTitle>
              <CardDescription>
                Reported and calculated balances stay visible side by side.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  label="Wallets in scope"
                  value={`${visibleWallets.length}`}
                  hint="All wallets remain read-only in the seeded demo."
                  badge="Scope"
                  icon={<Wallet className="size-5" />}
                />
                <MetricCard
                  label="Largest gap"
                  value={formatUsd(maxWalletGap)}
                  hint="The biggest reported/calculated spread in the current filter."
                  badge="Mismatch"
                  icon={<AlertCircle className="size-5" />}
                />
                <MetricCard
                  label="Selected basis"
                  value={state.balanceMode === "reported" ? "Reported" : "Calculated"}
                  hint="The summary card follows the chosen basis."
                  badge="View mode"
                  icon={<BadgeCheck className="size-5" />}
                />
                <MetricCard
                  label="Policy headroom"
                  value="72%"
                  hint="Demo headroom indicates the spend buffer is still safe."
                  badge="Daily limit"
                  icon={<ShieldCheck className="size-5" />}
                />
              </div>

              <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                {visibleWallets.length === 0 ? (
                  <div className="p-4">
                    <EmptyState
                      title="No wallets match the current search"
                      description="Try a broader query or clear the search field to bring the treasury accounts back."
                      icon={<Search className="size-4" />}
                      action={
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setState((current) => ({ ...current, query: "" }))
                          }
                        >
                          Clear search
                        </Button>
                      }
                    />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Wallet</TableHead>
                        <TableHead>Chain</TableHead>
                        <TableHead>Reported</TableHead>
                        <TableHead>Calculated</TableHead>
                        <TableHead>Gap</TableHead>
                        <TableHead>Freshness</TableHead>
                        <TableHead>Policy</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visibleWallets.map((wallet) => (
                        <TableRow key={wallet.id}>
                          <TableCell className="min-w-56">
                            <div className="grid gap-1">
                              <div className="font-medium text-foreground">
                                {wallet.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {wallet.custody} · {wallet.purpose}
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {wallet.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="rounded-full border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/80"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="rounded-full border-white/10 bg-white/[0.04] text-[11px] text-white/80"
                            >
                              {wallet.chain}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono tabular-nums text-foreground">
                            {formatUsd(wallet.reported)}
                          </TableCell>
                          <TableCell className="font-mono tabular-nums text-foreground">
                            {formatUsd(wallet.calculated)}
                          </TableCell>
                          <TableCell className="font-mono tabular-nums">
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-xs",
                                Math.abs(wallet.gap) > 2_000_000
                                  ? "border-rose-400/30 bg-rose-500/10 text-rose-100"
                                  : "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                              )}
                            >
                              {wallet.gap >= 0 ? "+" : "-"}
                              {formatUsd(Math.abs(wallet.gap))}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="grid gap-1">
                              <span className="font-mono text-xs text-white/80">
                                {wallet.freshness}
                              </span>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "w-fit rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]",
                                  stateTone(wallet.status)
                                )}
                              >
                                {wallet.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="min-w-48 text-sm text-muted-foreground">
                            {wallet.policy}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.05] backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                <BadgeCheck className="size-4 text-emerald-300" />
                Reconciliation notes
              </CardTitle>
              <CardDescription>
                Why the dashboard separates reported and calculated balances.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 p-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Selected basis
                </div>
                <div className="mt-2 text-lg font-medium text-foreground">
                  {state.balanceMode === "reported"
                    ? "Use the source snapshot"
                    : "Use the ledger-derived view"}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The summary card follows the chosen basis, but the wallet table
                  keeps both values visible so the team can see where the gap
                  came from.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Common causes
                </div>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground">
                  <li>• staking receipts that have not flowed into the ledger yet</li>
                  <li>• bridge inventory or settlement timing differences</li>
                  <li>• stale source feeds or source-side snapshot delays</li>
                  <li>• manual entry or missed transaction history</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <BadgeCheck className="size-4 text-sky-300" />
                  Trust note
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Trust signals are review aids. They never claim the wallet is
                  safe, blocked, or compliant by themselves.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : null}

      {activeSection === "protocols" ? (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <Card className="border-white/10 bg-white/[0.05] backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                <Layers3 className="size-4 text-cyan-300" />
                Protocol exposure
              </CardTitle>
              <CardDescription>
                Sleeve values are already embedded in the treasury total. They are
                shown separately here to make exit risk explicit.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer
                config={{
                  aave: {
                    label: "Aave v3",
                    color: "rgb(16 185 129 / 0.95)",
                  },
                  morpho: {
                    label: "Morpho Blue",
                    color: "rgb(245 158 11 / 0.95)",
                  },
                  curve: {
                    label: "Curve 3Pool",
                    color: "rgb(56 189 248 / 0.95)",
                  },
                }}
                className="h-[320px]"
              >
                <BarChart
                  data={visibleProtocols}
                  layout="vertical"
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid
                    horizontal={false}
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.08)"
                  />
                  <XAxis
                    type="number"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }}
                    tickFormatter={(value) => `${Math.round(Number(value) / 1_000_000)}M`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 11 }}
                    width={108}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => String(value)}
                        formatter={(value, name) => [
                          formatUsd(Number(value)),
                          String(name),
                        ]}
                      />
                    }
                  />
                  <Bar dataKey="value" radius={[0, 12, 12, 0]}>
                    {visibleProtocols.map((entry, index) => (
                      <Cell
                        key={entry.id}
                        fill={
                          index === 0
                            ? "rgba(16,185,129,0.9)"
                            : index === 1
                              ? "rgba(245,158,11,0.9)"
                              : "rgba(56,189,248,0.9)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Sleeve total
                  </div>
                  <div className="mt-1 font-mono text-xl font-semibold tabular-nums text-foreground">
                    {formatUsd(totalProtocolValue)}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Fast unwind path
                  </div>
                  <div className="mt-1 font-medium text-foreground">Curve 3Pool</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Largest sleeve
                  </div>
                  <div className="mt-1 font-medium text-foreground">Aave v3</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.05] backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                <Waves className="size-4 text-emerald-300" />
                Protocol sleeves
              </CardTitle>
              <CardDescription>
                Value, APY, freshness, and exit context are shown together.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 p-4">
              {visibleProtocols.length === 0 ? (
                <EmptyState
                  title="No protocol sleeves match the current search"
                  description="Use a broader query or clear the filter to restore the protocol breakdown."
                  icon={<Search className="size-4" />}
                  action={
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setState((current) => ({ ...current, query: "" }))
                      }
                    >
                      Clear search
                    </Button>
                  }
                />
              ) : (
                visibleProtocols.map((protocol) => (
                  <div
                    key={protocol.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium text-foreground">{protocol.name}</h3>
                          <Badge
                            variant="outline"
                            className={cn(
                              "rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]",
                              stateTone(protocol.status)
                            )}
                          >
                            {protocol.status}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {protocol.category} · {protocol.chain} · {protocol.tokens}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-lg font-semibold tabular-nums text-foreground">
                          {formatUsd(protocol.value)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatPct(protocol.apy)} APY · {formatPct(protocol.tvlShare)} of sleeve
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="rounded-full border-white/10 bg-white/[0.04] text-[11px] text-white/80"
                      >
                        {protocol.freshness} freshness
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-[11px]",
                          stateTone(protocol.risk)
                        )}
                      >
                        {protocol.risk} risk
                      </Badge>
                      <Badge
                        variant="outline"
                        className="rounded-full border-white/10 bg-white/[0.04] text-[11px] text-white/80"
                      >
                        {protocol.lock}
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {protocol.note}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Guardrail: {protocol.guardrail}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </section>
      ) : null}

      {activeSection === "risk" ? (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <Card className="border-white/10 bg-white/[0.05] backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                <LineChartIcon className="size-4 text-sky-300" />
                Coverage and confidence
              </CardTitle>
              <CardDescription>
                A declining coverage line is the clearest reason to escalate a
                treasury review.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer
                config={{
                  coverage: {
                    label: "Coverage",
                    color: "rgb(56 189 248 / 0.95)",
                  },
                  target: {
                    label: "Target",
                    color: "rgb(245 158 11 / 0.95)",
                  },
                }}
                className="h-[300px]"
              >
                <AreaChart data={chartCoverage} margin={{ left: 8, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }}
                    minTickGap={18}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }}
                    tickFormatter={(value) => `${Number(value).toFixed(1)}x`}
                  />
                  <ReferenceLine
                    y={workspaceMeta.targetCoverage}
                    stroke="rgba(245,158,11,0.75)"
                    strokeDasharray="4 4"
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => String(value)}
                        formatter={(value, name) => [
                          String(name) === "Target"
                            ? formatRatio(Number(value))
                            : formatRatio(Number(value)),
                          String(name),
                        ]}
                      />
                    }
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area
                    type="monotone"
                    dataKey="coverage"
                    stroke="var(--color-coverage)"
                    fill="rgba(56,189,248,0.15)"
                    fillOpacity={1}
                    strokeWidth={2.5}
                  />
                </AreaChart>
              </ChartContainer>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Selected coverage
                  </div>
                  <div className="mt-1 font-mono text-xl font-semibold tabular-nums text-foreground">
                    {formatRatio(coverageValue)}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Risk score
                  </div>
                  <div className="mt-1 font-mono text-xl font-semibold tabular-nums text-foreground">
                    {view.riskScore}/100
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Policy path
                  </div>
                  <div className="mt-1 font-medium text-foreground">
                    {view.tone === "critical"
                      ? "Escalate"
                      : view.tone === "watch"
                        ? "Review"
                        : "Hold"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.05] backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="size-4 text-amber-300" />
                Review queue
              </CardTitle>
              <CardDescription>
                The queue is structured so the finance team can review and then
                export the evidence path.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 p-4">
              {visibleAlerts.length === 0 ? (
                <EmptyState
                  title="No risk items match the current search"
                  description="The queue is still there, but the current filter removed every item."
                  icon={<Search className="size-4" />}
                  action={
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setState((current) => ({ ...current, query: "" }))
                      }
                    >
                      Clear search
                    </Button>
                  }
                />
              ) : (
                visibleAlerts.map((alert) => (
                  <AlertRow
                    key={alert.id}
                    alert={alert}
                    reviewed={Boolean(state.reviewedAlerts[alert.id])}
                    onToggleReviewed={toggleReviewed}
                  />
                ))
              )}

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <BadgeCheck className="size-4 text-sky-300" />
                  Risk semantics
                </div>
                <div className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground">
                  <p>Healthy means the item is in policy and easy to unwind.</p>
                  <p>Watch means the item deserves attention before the next move.</p>
                  <p>Risk means the item should be escalated or frozen in review.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : null}

      {activeSection === "evidence" ? (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
          <Card className="border-white/10 bg-white/[0.05] backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="size-4 text-emerald-300" />
                Source chain
              </CardTitle>
              <CardDescription>
                Provenance is part of the product, not an afterthought.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              {visibleSources.length === 0 ? (
                <EmptyState
                  title="No sources match the current search"
                  description="Clear the search input to restore the provenance table."
                  icon={<Search className="size-4" />}
                  action={
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setState((current) => ({ ...current, query: "" }))
                      }
                    >
                      Clear search
                    </Button>
                  }
                />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Freshness</TableHead>
                      <TableHead>Powers</TableHead>
                      <TableHead>Basis</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleSources.map((source) => (
                      <TableRow key={source.name}>
                        <TableCell className="min-w-56">
                          <div className="grid gap-1">
                            <span className="font-medium text-foreground">
                              {source.name}
                            </span>
                            <Badge
                              variant="outline"
                              className={cn(
                                "w-fit rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]",
                                sourceTone(source.status)
                              )}
                            >
                              {source.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {source.method}
                        </TableCell>
                        <TableCell>
                          <span className="font-mono text-xs text-foreground">
                            {source.freshness}
                          </span>
                        </TableCell>
                        <TableCell className="min-w-56 text-sm text-muted-foreground">
                          {source.powers}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {source.basis}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.05] backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="size-4 text-amber-300" />
                Board-pack snapshot
              </CardTitle>
              <CardDescription>
                The snapshot is seeded, repeatable, and clearly not live.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 p-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Current basis
                </div>
                <div className="mt-2 text-xl font-semibold text-foreground">
                  {basisLabel}
                </div>
                <div className="mt-2 text-sm leading-6 text-muted-foreground">
                  The board pack carries the selected basis, scenario, and a
                  snapshot timestamp so the team can cite one consistent review.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  What is included
                </div>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground">
                  <li>• treasury value and liquidity coverage</li>
                  <li>• wallet reconciliation table</li>
                  <li>• protocol sleeve breakdown</li>
                  <li>• risk queue and review states</li>
                  <li>• source freshness and provenance</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <BadgeCheck className="size-4 text-emerald-300" />
                  Product boundary
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The app never suggests it can sign transactions, custody keys,
                  or perform compliance determinations automatically.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : null}

      <Dialog open={boardOpen} onOpenChange={setBoardOpen}>
        <DialogContent className="max-w-3xl border-white/10 bg-[#0b1016]/95 text-foreground backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle>Board-pack snapshot</DialogTitle>
            <DialogDescription>
              A seeded, read-only export view based on the current review
              settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Current snapshot
              </div>
              <div className="mt-2 text-lg font-medium text-foreground">
                {view.snapshot}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {view.headline}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Open items
              </div>
              <div className="mt-2 text-lg font-medium text-foreground">
                {openCount} open / {reviewedCount} reviewed
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                The review state is stored locally in this browser only.
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Included evidence
            </div>
            <div className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground">
              <p>• reported and calculated treasury values</p>
              <p>• source freshness stamps and status labels</p>
              <p>• wallet mismatches and protocol sleeve notes</p>
              <p>• compliance review prompts and provenance breadcrumbs</p>
            </div>
          </div>
          <DialogFooter className="border-white/10 bg-white/[0.03]">
            <Button variant="outline" onClick={() => setBoardOpen(false)}>
              Close
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setBoardOpen(false)
                setState((current) => ({
                  ...current,
                  reviewedAlerts: { ...current.reviewedAlerts },
                }))
              }}
            >
              Keep as review state
              <ArrowRight className="ml-1.5 size-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="right" className="border-white/10 bg-[#0b1016]/95 text-foreground backdrop-blur-2xl">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Scenario, range, and balance basis for the mobile layout.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 p-4">
            <div className="grid gap-1.5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Scenario
              </div>
              <Select
                value={state.scenario}
                onValueChange={(value) =>
                  setState((current) => ({
                    ...current,
                    scenario: value as ScenarioId,
                  }))
                }
              >
                <SelectTrigger className="w-full border-white/10 bg-white/[0.04] text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {scenarioOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      <span className="grid">
                        <span>{option.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {option.help}
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Range
              </div>
              <Select
                value={state.range}
                onValueChange={(value) =>
                  setState((current) => ({
                    ...current,
                    range: value as RangeId,
                  }))
                }
              >
                <SelectTrigger className="w-full border-white/10 bg-white/[0.04] text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {rangeOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Balance basis
              </div>
              <div className="grid grid-cols-2 gap-2">
                {balanceModeOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={
                      state.balanceMode === option.id ? "secondary" : "outline"
                    }
                    onClick={() =>
                      setState((current) => ({ ...current, balanceMode: option.id }))
                    }
                    className="h-auto rounded-2xl border-white/10 px-3 py-3 text-left"
                  >
                    <span className="grid gap-1">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {option.help}
                      </span>
                    </span>
                  </Button>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setState((current) => ({ ...current, query: "" }))}
              className="border-white/10 bg-white/[0.04]"
            >
              Clear search filter
            </Button>
            <Button variant="secondary" onClick={resetDemo}>
              Reset demo state
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  )
}
