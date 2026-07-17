"use client"

import { useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { TooltipProps, TooltipValueType } from "recharts"
import {
  AlertTriangle,
  ArrowRight,
  BadgeAlert,
  Banknote,
  CircleCheckBig,
  CircleDollarSign,
  Clock3,
  LayoutDashboard,
  Layers3,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Trash2,
  Wallet,
} from "lucide-react"

import styles from "./styles.module.css"
import {
  getVaultById,
  provenanceCards,
  timeRanges,
  triageLevels,
  type Activity,
  type Alert,
  type Counterparty,
  type TimeRange,
  type TriageLevel,
  type TreasuryVault,
  type ViewId,
  vaults,
  viewTabs,
} from "./data"

type PersistedState = {
  vaultId: string
  view: ViewId
  timeRange: TimeRange
  triage: TriageLevel
  dismissedByVault: Record<string, string[]>
  feedByVault: Record<string, Activity[]>
}

const storageKey = "treasury-sentinel-state-v1"
const chartColors = ["#4ade80", "#38bdf8", "#c4b5fd", "#f59e0b", "#fb7185"]

function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 10_000_000 ? 0 : 1,
  }).format(value)
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

function formatPercent(value: number) {
  return `${Math.round(value)}%`
}

function triageRank(level: Alert["severity"]) {
  switch (level) {
    case "critical":
      return 3
    case "watch":
      return 2
    default:
      return 1
  }
}

function triageThreshold(level: TriageLevel) {
  switch (level) {
    case "critical":
      return 3
    case "watch":
      return 2
    default:
      return 1
  }
}

function statusTone(status: TreasuryVault["status"]) {
  switch (status) {
    case "Healthy":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
    case "Watch":
      return "border-amber-400/30 bg-amber-400/10 text-amber-200"
    case "Escalated":
      return "border-rose-400/30 bg-rose-400/10 text-rose-200"
  }
}

function riskTone(risk: string) {
  switch (risk) {
    case "Low":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
    case "Medium":
      return "border-amber-400/20 bg-amber-400/10 text-amber-100"
    default:
      return "border-rose-400/20 bg-rose-400/10 text-rose-100"
  }
}

function alertTone(severity: Alert["severity"]) {
  switch (severity) {
    case "critical":
      return "border-rose-400/30 bg-rose-400/10 text-rose-100"
    case "watch":
      return "border-amber-400/30 bg-amber-400/10 text-amber-100"
    default:
      return "border-sky-400/30 bg-sky-400/10 text-sky-100"
  }
}

function rangeCount(range: TimeRange) {
  switch (range) {
    case "24h":
      return 4
    case "7d":
      return 6
    default:
      return 8
  }
}

const treasuryTooltipFormatter: NonNullable<TooltipProps["formatter"]> = (
  value: TooltipValueType | undefined,
  name: string | number | undefined
) => [
  `${Number(value ?? 0).toFixed(1)}M`,
  name === "value" ? "Treasury" : "Emergency floor",
]

const allocationTooltipFormatter: NonNullable<TooltipProps["formatter"]> = (
  value: TooltipValueType | undefined
) => [formatUSD(Number(value ?? 0)), "Treasury value"]

function loadState(): PersistedState {
  return {
    vaultId: vaults[0].id,
    view: "overview",
    timeRange: "7d",
    triage: "all",
    dismissedByVault: {},
    feedByVault: {},
  }
}

function loadStateFromStorage() {
  if (typeof window === "undefined") return loadState()

  try {
    const raw = window.localStorage.getItem(storageKey)
    if (!raw) return loadState()

    const parsed = JSON.parse(raw) as Partial<PersistedState>
    return {
      ...loadState(),
      ...parsed,
      dismissedByVault: parsed.dismissedByVault ?? {},
      feedByVault: parsed.feedByVault ?? {},
    }
  } catch {
    return loadState()
  }
}

function toFeedEvent(message: string): Activity {
  return {
    id: `user-${crypto.randomUUID()}`,
    time: new Date().toISOString(),
    actor: "You",
    action: message,
    outcome: "Persisted in local demo state.",
  }
}

export default function TreasurySentinelPage() {
  const [state, setState] = useState<PersistedState>(() => loadStateFromStorage())
  const [chartsReady, setChartsReady] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setChartsReady(true)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  const selectedVault = useMemo(
    () => getVaultById(state.vaultId),
    [state.vaultId]
  )
  const selectedRange = timeRanges.find((range) => range.id === state.timeRange) ?? timeRanges[1]

  const dismissed = state.dismissedByVault[selectedVault.id] ?? []
  const visibleAlerts = selectedVault.alerts.filter(
    (alert) =>
      triageRank(alert.severity) >= triageThreshold(state.triage) &&
      !dismissed.includes(alert.id)
  )
  const openCritical = visibleAlerts.filter((alert) => alert.severity === "critical")
  const activeFeed = state.feedByVault[selectedVault.id] ?? selectedVault.activity
  const pointCount = rangeCount(state.timeRange)
  const balanceSeries = selectedVault.balanceSeries.slice(-pointCount)
  const riskSeries = selectedVault.riskSeries.slice(-pointCount)
  const latestBalance =
    selectedVault.balanceSeries[selectedVault.balanceSeries.length - 1]!
  const startingBalance = selectedVault.balanceSeries[0]!
  const netChange = latestBalance.value - startingBalance.value
  const totalChainValue = selectedVault.chainSplit.reduce(
    (sum, item) => sum + item.value,
    0
  )

  const setStateAndPersist = (updater: (current: PersistedState) => PersistedState) =>
    setState((current) => updater(current))

  const selectVault = (vaultId: string) => {
    setStateAndPersist((current) => ({
      ...current,
      vaultId,
      view: "overview",
    }))
  }

  const dismissAlert = (alertId: string) => {
    setStateAndPersist((current) => ({
      ...current,
      dismissedByVault: {
        ...current.dismissedByVault,
        [selectedVault.id]: Array.from(
          new Set([...(current.dismissedByVault[selectedVault.id] ?? []), alertId])
        ),
      },
      feedByVault: {
        ...current.feedByVault,
        [selectedVault.id]: [
          toFeedEvent(`Marked ${alertId} as reviewed`),
          ...(current.feedByVault[selectedVault.id] ?? selectedVault.activity),
        ],
      },
    }))
  }

  const appendFeed = (message: string) => {
    setStateAndPersist((current) => ({
      ...current,
      feedByVault: {
        ...current.feedByVault,
        [selectedVault.id]: [
          toFeedEvent(message),
          ...(current.feedByVault[selectedVault.id] ?? selectedVault.activity),
        ],
      },
    }))
  }

  const clearDemoState = () => {
    window.localStorage.removeItem(storageKey)
    setState(loadState())
  }

  return (
    <main className="min-h-screen px-4 py-4 text-slate-50 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-4 lg:gap-5">
        <section className={`${styles.panel} overflow-hidden rounded-[28px]`}>
          <div className="grain flex flex-col gap-4 border-b border-white/8 px-5 py-5 lg:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-4xl space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-slate-400">
                  <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-cyan-100">
                    Demo data only
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    Prices: 1-5m cache window
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    Screening: near-real-time
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    Balances: chain-refresh dependent
                  </span>
                </div>
                <div className="space-y-3">
                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Treasury Sentinel
                  </h1>
                  <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                    A stablecoin treasury risk cockpit for finance teams deciding
                    whether funds are safe to move. It combines vault balances,
                    runway, policy headroom, and screened counterparty exposure
                    instead of another wall of prices.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-100">
                    {selectedVault.status} posture
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">
                    {selectedVault.summary}
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">
                    Updated {selectedVault.updatedAt}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:w-[380px] xl:grid-cols-1">
                <div className={`${styles.panelSoft} rounded-2xl p-4`}>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-300" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Primary promise
                      </p>
                      <p className="mt-1 text-sm text-slate-100">
                        Know if treasury is safe to move before you sign.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`${styles.panelSoft} rounded-2xl p-4`}>
                  <div className="flex items-center gap-3">
                    <BadgeAlert className="h-5 w-5 text-amber-300" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Active cases
                      </p>
                      <p className="mt-1 text-sm text-slate-100">
                        {visibleAlerts.length} open / {openCritical.length} critical
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {provenanceCards.map((card) => (
                <div
                  key={card.label}
                  className={`${styles.panelSoft} rounded-2xl p-4`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {card.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 px-5 py-5 lg:px-6 xl:grid-cols-[296px_minmax(0,1fr)]">
            <aside className="space-y-4">
              <section className={`${styles.panelSoft} rounded-[24px] p-4`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                      Vaults
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-white">
                      Treasury workspaces
                    </h2>
                  </div>
                  <Wallet className="h-5 w-5 text-cyan-300" />
                </div>

                <div className="mt-4 space-y-3">
                  {vaults.map((vault) => {
                    const selected = vault.id === selectedVault.id
                    return (
                      <button
                        key={vault.id}
                        type="button"
                        onClick={() => selectVault(vault.id)}
                        className={`w-full rounded-2xl border p-4 text-left transition duration-150 ${
                          selected
                            ? "border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_0_1px_rgba(34,211,238,0.08)]"
                            : "border-white/8 bg-white/[0.03] hover:border-white/16 hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {vault.name}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              {vault.legalEntity}
                            </p>
                          </div>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] ${statusTone(
                              vault.status
                            )}`}
                          >
                            {vault.status}
                          </span>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300">
                          <div className="rounded-xl border border-white/8 bg-black/10 p-2">
                            <p className="text-slate-500">Runway</p>
                            <p className="mt-1 font-medium text-white">
                              {vault.runwayDays} days
                            </p>
                          </div>
                          <div className="rounded-xl border border-white/8 bg-black/10 p-2">
                            <p className="text-slate-500">Risk</p>
                            <p className="mt-1 font-medium text-white">
                              {vault.riskIndex}/100
                            </p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </section>

              <section className={`${styles.panelSoft} rounded-[24px] p-4`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                      Filter
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-white">
                      Alert sensitivity
                    </h3>
                  </div>
                  <SlidersHorizontal className="h-5 w-5 text-amber-300" />
                </div>
                <div className="mt-4 flex gap-2">
                  {triageLevels.map((level) => {
                    const active = state.triage === level.id
                    return (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() =>
                          setStateAndPersist((current) => ({
                            ...current,
                            triage: level.id,
                          }))
                        }
                        className={`flex-1 rounded-2xl border px-3 py-3 text-left transition ${
                          active
                            ? "border-amber-300/30 bg-amber-300/10 text-amber-50"
                            : "border-white/8 bg-white/[0.03] text-slate-300 hover:border-white/16 hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="text-sm font-medium">{level.label}</div>
                        <div className="mt-1 text-[11px] leading-4 text-slate-400">
                          {level.hint}
                        </div>
                      </button>
                    )
                  })}
                </div>
                <div className="mt-4 rounded-2xl border border-white/8 bg-black/10 p-3 text-xs leading-6 text-slate-300">
                  <span className="font-medium text-slate-100">Demo note:</span>{" "}
                  all data is seeded. No wallet connection, backend, or live
                  transaction system is involved.
                </div>
              </section>

              <button
                type="button"
                onClick={clearDemoState}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <Trash2 className="h-4 w-4" />
                Reset demo state
              </button>
            </aside>

            <section className="space-y-4">
              <div className="flex flex-col gap-3 rounded-[24px] border border-white/8 bg-white/[0.03] p-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                  {viewTabs.map((tab) => {
                    const active = state.view === tab.id
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() =>
                          setStateAndPersist((current) => ({
                            ...current,
                            view: tab.id,
                          }))
                        }
                        className={`rounded-full px-4 py-2 text-sm transition ${
                          active
                            ? "bg-white text-slate-950"
                            : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    )
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-1 rounded-full border border-white/8 bg-black/15 p-1">
                    {timeRanges.map((range) => {
                      const active = state.timeRange === range.id
                      return (
                        <button
                          key={range.id}
                          type="button"
                          onClick={() =>
                            setStateAndPersist((current) => ({
                              ...current,
                              timeRange: range.id,
                            }))
                          }
                          className={`rounded-full px-3 py-1.5 text-xs transition ${
                            active
                              ? "bg-cyan-300 text-slate-950"
                              : "text-slate-300 hover:bg-white/10"
                          }`}
                        >
                          {range.label}
                        </button>
                      )
                    })}
                  </div>
                  <div className="rounded-full border border-white/8 bg-black/15 px-3 py-1.5 text-xs text-slate-300">
                    {selectedRange.window} view
                  </div>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <MetricCard
                      title="Treasury value"
                      value={formatUSD(selectedVault.totalValueUsd)}
                      delta={`+${formatCompact(netChange)}M vs 30-day start`}
                      icon={<CircleDollarSign className="h-4 w-4" />}
                    />
                    <MetricCard
                      title="Runway"
                      value={`${selectedVault.runwayDays} days`}
                      delta={`${formatUSD(selectedVault.dailyBurnUsd)} daily burn`}
                      icon={<Clock3 className="h-4 w-4" />}
                    />
                    <MetricCard
                      title="Policy headroom"
                      value={formatPercent(selectedVault.policyHeadroomPct)}
                      delta={`${selectedVault.concentrationPct}% concentration`}
                      icon={<ShieldCheck className="h-4 w-4" />}
                    />
                    <MetricCard
                      title="Open cases"
                      value={`${visibleAlerts.length}`}
                      delta={`${openCritical.length} critical`}
                      icon={<AlertTriangle className="h-4 w-4" />}
                    />
                  </div>

                  {state.view === "overview" && (
                    <div className="grid gap-4 xl:grid-cols-2">
                      <section className={`${styles.panelSoft} rounded-[24px] p-4`}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                              Balance trajectory
                            </p>
                            <h3 className="mt-1 text-lg font-semibold text-white">
                              Treasury value vs. floor
                            </h3>
                          </div>
                          <Sparkles className="h-5 w-5 text-cyan-300" />
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          Hovering is enough to inspect values. The chart keeps
                          a visible floor line so the team can see how close the
                          vault is to the emergency limit.
                        </p>
                        <div className="mt-4 h-[290px]">
                          {chartsReady ? (
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={balanceSeries}>
                                <defs>
                                  <linearGradient
                                    id="treasuryFill"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                  >
                                    <stop
                                      offset="5%"
                                      stopColor="#38bdf8"
                                      stopOpacity={0.34}
                                    />
                                    <stop
                                      offset="95%"
                                      stopColor="#38bdf8"
                                      stopOpacity={0.02}
                                    />
                                  </linearGradient>
                                </defs>
                                <XAxis
                                  dataKey="label"
                                  axisLine={false}
                                  tickLine={false}
                                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                                />
                                <YAxis
                                  axisLine={false}
                                  tickLine={false}
                                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                                  tickFormatter={(value) => `$${value}M`}
                                  width={60}
                                />
                                <Tooltip
                                  formatter={treasuryTooltipFormatter}
                                  labelStyle={{ color: "#0f172a" }}
                                  contentStyle={{
                                    borderRadius: 16,
                                    border: "1px solid rgba(148,163,184,0.2)",
                                    background: "rgba(255,255,255,0.95)",
                                  }}
                                />
                                <Area
                                  type="monotone"
                                  dataKey="floor"
                                  stroke="#fb7185"
                                  strokeWidth={2}
                                  fillOpacity={0}
                                  dot={false}
                                />
                                <Area
                                  type="monotone"
                                  dataKey="value"
                                  stroke="#38bdf8"
                                  strokeWidth={3}
                                  fill="url(#treasuryFill)"
                                  dot={false}
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          ) : (
                            <ChartPlaceholder label="Treasury value chart" />
                          )}
                        </div>
                      </section>

                      <section className={`${styles.panelSoft} rounded-[24px] p-4`}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                              Risk trajectory
                            </p>
                            <h3 className="mt-1 text-lg font-semibold text-white">
                              Signal score vs policy threshold
                            </h3>
                          </div>
                          <Target className="h-5 w-5 text-amber-300" />
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          The right chart is intentionally explicit about the
                          threshold. This keeps the product honest about when a
                          vault is sliding into watch or escalation territory.
                        </p>
                        <div className="mt-4 h-[290px]">
                          {chartsReady ? (
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={riskSeries}>
                                <XAxis
                                  dataKey="label"
                                  axisLine={false}
                                  tickLine={false}
                                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                                />
                                <YAxis
                                  axisLine={false}
                                  tickLine={false}
                                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                                  domain={[0, 100]}
                                  width={44}
                                />
                                <Tooltip
                                  labelStyle={{ color: "#0f172a" }}
                                  contentStyle={{
                                    borderRadius: 16,
                                    border: "1px solid rgba(148,163,184,0.2)",
                                    background: "rgba(255,255,255,0.95)",
                                  }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="score"
                                  stroke="#f97316"
                                  strokeWidth={3}
                                  dot={false}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="threshold"
                                  stroke="#c084fc"
                                  strokeDasharray="6 6"
                                  strokeWidth={2}
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          ) : (
                            <ChartPlaceholder label="Risk signal chart" />
                          )}
                        </div>
                      </section>
                    </div>
                  )}

                  {state.view === "wallets" && (
                    <section className={`${styles.panelSoft} rounded-[24px] p-4`}>
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                            Chain allocation
                          </p>
                          <h3 className="mt-1 text-lg font-semibold text-white">
                            Value by chain for {selectedVault.name}
                          </h3>
                          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                            The chart uses the same units as the underlying vault
                            balances, so there is no hidden exchange-rate trick.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-sm text-slate-300">
                          <span className="text-slate-500">Source mix: </span>
                          {selectedVault.sourceNote}
                        </div>
                      </div>
                      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)]">
                        <div className="h-[300px]">
                          {chartsReady ? (
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={selectedVault.chainSplit}>
                                <XAxis
                                  dataKey="chain"
                                  axisLine={false}
                                  tickLine={false}
                                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                                />
                                <YAxis
                                  axisLine={false}
                                  tickLine={false}
                                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                                  tickFormatter={(value) => `$${value / 1_000_000}M`}
                                  width={50}
                                />
                                <Tooltip
                                  formatter={allocationTooltipFormatter}
                                  labelStyle={{ color: "#0f172a" }}
                                  contentStyle={{
                                    borderRadius: 16,
                                    border: "1px solid rgba(148,163,184,0.2)",
                                    background: "rgba(255,255,255,0.95)",
                                  }}
                                />
                                <Bar dataKey="value" radius={[14, 14, 0, 0]}>
                                  {selectedVault.chainSplit.map((item, index) => (
                                    <Cell key={item.chain} fill={chartColors[index % chartColors.length]} />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          ) : (
                            <ChartPlaceholder label="Chain allocation chart" />
                          )}
                        </div>

                        <div className="space-y-3">
                          {selectedVault.holdings.map((holding) => (
                            <div
                              key={`${holding.asset}-${holding.chain}-${holding.amount}`}
                              className="rounded-2xl border border-white/8 bg-black/10 p-4"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-sm font-semibold text-white">
                                    {holding.asset} on {holding.chain}
                                  </p>
                                  <p className="mt-1 text-xs text-slate-400">
                                    {holding.issuer} · {holding.provenance}
                                  </p>
                                </div>
                                <span
                                  className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] ${riskTone(
                                    holding.risk
                                  )}`}
                                >
                                  {holding.risk}
                                </span>
                              </div>
                              <div className="mt-3 flex items-end justify-between gap-3">
                                <div>
                                  <p className="text-xs text-slate-500">Amount</p>
                                  <p className="mt-1 text-sm text-slate-200">
                                    {holding.amount}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-slate-500">USD value</p>
                                  <p className="mt-1 text-sm text-white">
                                    {formatUSD(holding.usd)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {state.view === "controls" && (
                    <section className={`${styles.panelSoft} rounded-[24px] p-4`}>
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                            Operational controls
                          </p>
                          <h3 className="mt-1 text-lg font-semibold text-white">
                            Review, rebalance, or pause
                          </h3>
                          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                            These actions are local-only. They simulate the
                            decision loop a treasury team would use to resolve a
                            watch item or escalate a risky route.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              appendFeed("Suggested a 5% rebalance toward cash-like reserves")
                            }
                            className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/15"
                          >
                            Suggest rebalance
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              appendFeed("Escalation note drafted for compliance and finance")
                            }
                            className="rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-400/15"
                          >
                            Draft escalation
                          </button>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 xl:grid-cols-2">
                        <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                                Policy headroom
                              </p>
                              <h4 className="mt-1 text-base font-semibold text-white">
                                How much room is left before a limit trips?
                              </h4>
                            </div>
                            <ShieldAlert className="h-5 w-5 text-rose-300" />
                          </div>
                          <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            <StatPill label="Headroom" value={formatPercent(selectedVault.policyHeadroomPct)} />
                            <StatPill label="Concentration" value={formatPercent(selectedVault.concentrationPct)} />
                            <StatPill label="Runway" value={`${selectedVault.runwayDays}d`} />
                          </div>
                          <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
                            <span className="font-medium text-slate-100">
                              Recommended action:
                            </span>{" "}
                            {selectedVault.decision}
                          </div>
                        </div>

                        <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                                Approval queue
                              </p>
                              <h4 className="mt-1 text-base font-semibold text-white">
                                Pending approvals and system response
                              </h4>
                            </div>
                            <Layers3 className="h-5 w-5 text-cyan-300" />
                          </div>
                          <div className="mt-4 space-y-3">
                            {selectedVault.counterparties.slice(0, 3).map((item) => (
                              <div
                                key={item.name}
                                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                              >
                                <div>
                                  <p className="text-sm font-medium text-white">
                                    {item.name}
                                  </p>
                                  <p className="mt-1 text-xs text-slate-400">
                                    {item.category} · {item.lastTouch}
                                  </p>
                                </div>
                                <span
                                  className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] ${riskTone(
                                    item.risk
                                  )}`}
                                >
                                  {item.risk}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {state.view === "audit" && (
                    <section className={`${styles.panelSoft} rounded-[24px] p-4`}>
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                            Audit and provenance
                          </p>
                          <h3 className="mt-1 text-lg font-semibold text-white">
                            Why this demo should be trusted
                          </h3>
                          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                            Each data source is labeled as seeded. The product
                            design surfaces where live integrations would slot in
                            without pretending a demo has live keys.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-sm text-slate-300">
                          Current vault: <span className="text-white">{selectedVault.name}</span>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 xl:grid-cols-2">
                        <div className="space-y-3">
                          {activeFeed.map((item) => (
                            <div
                              key={item.id}
                              className="rounded-2xl border border-white/8 bg-black/10 p-4"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-sm font-medium text-white">
                                    {item.action}
                                  </p>
                                  <p className="mt-1 text-xs text-slate-400">
                                    {item.actor} · {item.time}
                                  </p>
                                </div>
                                <span className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-300">
                                  audit
                                </span>
                              </div>
                              <p className="mt-3 text-sm leading-6 text-slate-300">
                                {item.outcome}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3">
                          <div className="rounded-2xl border border-white/8 bg-black/10 p-4">
                            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                              Source model
                            </p>
                            <div className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
                              <div className="flex items-start gap-3">
                                <CircleCheckBig className="mt-0.5 h-4 w-4 text-emerald-300" />
                                <p>
                                  Balance and transfer tables are modeled after
                                  Dune-style curated and decoded data, which are
                                  not all equally fresh. The UI keeps the
                                  freshness window visible.
                                </p>
                              </div>
                              <div className="flex items-start gap-3">
                                <CircleCheckBig className="mt-0.5 h-4 w-4 text-emerald-300" />
                                <p>
                                  Price data is treated as cached market data
                                  rather than tick-by-tick execution truth.
                                </p>
                              </div>
                              <div className="flex items-start gap-3">
                                <CircleCheckBig className="mt-0.5 h-4 w-4 text-emerald-300" />
                                <p>
                                  Screening and sanctions checks are shown as
                                  risk signals, not as legal clearance.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-white/8 bg-black/10 p-4">
                            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                              Current vault stats
                            </p>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                              <StatPill label="Last sweep" value={selectedVault.lastSweep} />
                              <StatPill label="Value total" value={formatUSD(totalChainValue)} />
                              <StatPill label="Data freshness" value="Seeded live-like snapshot" />
                              <StatPill label="Open cases" value={`${visibleAlerts.length}`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  <section className={`${styles.panelSoft} rounded-[24px] p-4`}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                          Risk queue
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-white">
                          Open alerts for {selectedVault.name}
                        </h3>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-400" />
                    </div>

                    <div className="mt-4 grid gap-3">
                      {visibleAlerts.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-white/12 bg-black/10 p-6 text-sm leading-7 text-slate-400">
                          No alerts match the current filter for this vault. That
                          empty state is intentional and shows the product can
                          handle a calm treasury without inventing problems.
                        </div>
                      ) : (
                        visibleAlerts.map((alert) => (
                          <div
                            key={alert.id}
                            className="rounded-2xl border border-white/8 bg-black/10 p-4"
                          >
                            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                              <div className="max-w-3xl">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span
                                    className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] ${alertTone(
                                      alert.severity
                                    )}`}
                                  >
                                    {alert.severity}
                                  </span>
                                  <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                                    {alert.source}
                                  </span>
                                  <span className="text-xs text-slate-500">
                                    {alert.timestamp}
                                  </span>
                                </div>
                                <h4 className="mt-3 text-base font-semibold text-white">
                                  {alert.title}
                                </h4>
                                <p className="mt-2 text-sm leading-6 text-slate-300">
                                  {alert.detail}
                                </p>
                                <p className="mt-3 text-sm text-slate-400">
                                  Recommended action:{" "}
                                  <span className="text-slate-100">{alert.action}</span>
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => dismissAlert(alert.id)}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
                              >
                                Mark reviewed
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </section>
                </div>

                <div className="space-y-4">
                  <section className={`${styles.panelSoft} rounded-[24px] p-4`}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                          Selected vault
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-white">
                          {selectedVault.name}
                        </h3>
                      </div>
                      <Banknote className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                      <p>{selectedVault.summary}</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] ${statusTone(
                            selectedVault.status
                          )}`}
                        >
                          {selectedVault.status}
                        </span>
                        <span className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-300">
                          {selectedVault.legalEntity}
                        </span>
                      </div>
                    </div>
                  </section>

                  <section className={`${styles.panelSoft} rounded-[24px] p-4`}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                          Counterparties
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-white">
                          Exposure by venue and route
                        </h3>
                      </div>
                      <LayoutDashboard className="h-5 w-5 text-amber-300" />
                    </div>

                    <div className="mt-4 space-y-3">
                      {selectedVault.counterparties.map((counterparty) => (
                        <CounterpartyCard
                          key={counterparty.name}
                          counterparty={counterparty}
                        />
                      ))}
                    </div>
                  </section>

                  <section className={`${styles.panelSoft} rounded-[24px] p-4`}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                          Snapshot
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-white">
                          Quick facts
                        </h3>
                      </div>
                      <Sparkles className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                      <StatPill label="Cash-like mix" value={formatPercent(selectedVault.cashLikePct)} />
                      <StatPill label="Risk index" value={`${selectedVault.riskIndex}/100`} />
                      <StatPill label="Concentration" value={formatPercent(selectedVault.concentrationPct)} />
                      <StatPill label="Last sweep" value={selectedVault.lastSweep} />
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}

function MetricCard({
  title,
  value,
  delta,
  icon,
}: {
  title: string
  value: string
  delta: string
  icon: ReactNode
}) {
  return (
    <div className={`${styles.panelSoft} rounded-[22px] p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            {title}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
            {value}
          </p>
          <p className="mt-2 text-sm text-slate-400">{delta}</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-2 text-slate-200">
          {icon}
        </div>
      </div>
    </div>
  )
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  )
}

function CounterpartyCard({ counterparty }: { counterparty: Counterparty }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/10 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">{counterparty.name}</p>
          <p className="mt-1 text-xs text-slate-400">
            {counterparty.category} · {counterparty.lastTouch}
          </p>
        </div>
        <span
          className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] ${riskTone(
            counterparty.risk
          )}`}
        >
          {counterparty.risk}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
        <div>
          <p className="text-slate-500">Exposure</p>
          <p className="mt-1 text-slate-100">{formatUSD(counterparty.exposureUsd)}</p>
        </div>
        <div>
          <p className="text-slate-500">Note</p>
          <p className="mt-1 text-slate-100">{counterparty.note}</p>
        </div>
      </div>
    </div>
  )
}

function ChartPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/10 px-4 text-center">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Chart mounts after hydration to avoid false container sizing in the
          server render.
        </p>
      </div>
    </div>
  )
}
