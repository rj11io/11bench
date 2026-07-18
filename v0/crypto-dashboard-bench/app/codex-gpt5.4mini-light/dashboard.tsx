"use client"

import { useEffect, useMemo, useState } from "react"
import {
  AlertTriangle,
  ArrowRightLeft,
  CircleDollarSign,
  DatabaseZap,
  FileClock,
  Lock,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Wallet,
} from "lucide-react"

import { riskFilters, timeRanges, timeline, transfers, treasury, wallets, type RiskLevel } from "./data"

const storageKey = "codex-gpt5.4mini-light"

type StoredState = {
  selectedWalletId: string
  selectedRange: string
  riskFilter: string
  transferStates: Record<string, TransferState>
}

type TransferState = "Pending" | "Escalated" | "Approved" | "Blocked"

const initialState: StoredState = {
  selectedWalletId: wallets[0]?.id ?? "",
  selectedRange: "7d",
  riskFilter: "all",
  transferStates: Object.fromEntries(transfers.map((t) => [t.id, t.state])),
}

function riskLabel(risk: RiskLevel) {
  return risk === "clear" ? "Clear" : risk === "review" ? "Review" : risk === "escalated" ? "Escalated" : "Blocked"
}

function riskClass(risk: RiskLevel) {
  switch (risk) {
    case "clear":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
    case "review":
      return "border-amber-500/30 bg-amber-500/10 text-amber-300"
    case "escalated":
      return "border-orange-500/30 bg-orange-500/10 text-orange-300"
    case "blocked":
      return "border-rose-500/30 bg-rose-500/10 text-rose-300"
  }
}

function statusClass(state: TransferState) {
  switch (state) {
    case "Approved":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
    case "Pending":
      return "border-sky-500/30 bg-sky-500/10 text-sky-300"
    case "Escalated":
      return "border-amber-500/30 bg-amber-500/10 text-amber-300"
    case "Blocked":
      return "border-rose-500/30 bg-rose-500/10 text-rose-300"
  }
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

function Sparkline({ values }: { values: number[] }) {
  const points = values
    .map((value, index) => `${(index / (values.length - 1)) * 100},${100 - value}`)
    .join(" ")
  return (
    <svg viewBox="0 0 100 100" className="h-16 w-full">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        points={points}
        className="text-cyan-300/90"
      />
    </svg>
  )
}

function stackedBars(items: Array<{ label: string; share: number; tone: string }>) {
  return (
    <div className="flex h-4 overflow-hidden rounded-full bg-white/5">
      {items.map((item) => (
        <div
          key={item.label}
          className={item.tone}
          style={{ width: `${Math.max(item.share * 100, 4)}%` }}
          title={`${item.label} ${Math.round(item.share * 100)}%`}
        />
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [state, setState] = useState<StoredState>(() => {
    if (typeof window === "undefined") return initialState

    const raw = localStorage.getItem(storageKey)
    if (!raw) return initialState

    try {
      const parsed = JSON.parse(raw) as Partial<StoredState>
      return {
        ...initialState,
        ...parsed,
        transferStates: { ...initialState.transferStates, ...(parsed.transferStates ?? {}) },
      }
    } catch {
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state))
  }, [state])

  const selectedWallet = useMemo(
    () => wallets.find((wallet) => wallet.id === state.selectedWalletId) ?? wallets[0],
    [state.selectedWalletId]
  )

  const visibleWallets = useMemo(
    () =>
      wallets.filter((wallet) => state.riskFilter === "all" || wallet.risk === state.riskFilter),
    [state.riskFilter]
  )

  const rangeNote =
    state.selectedRange === "24h"
      ? "24h snapshot"
      : state.selectedRange === "7d"
        ? "7d review window"
        : state.selectedRange === "30d"
          ? "30d operating view"
          : "90d treasury trend"

  return (
    <div className="min-h-svh overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.12),transparent_24%),linear-gradient(180deg,#091018_0%,#0a0f15_55%,#06080c_100%)] text-slate-100">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-white/10 bg-slate-950/65 p-4 shadow-2xl shadow-cyan-950/10 backdrop-blur xl:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono uppercase tracking-[0.24em] text-cyan-200">
                  Treasury Risk Cockpit
                </span>
                <span>{treasury.workspace}</span>
                <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-1 text-amber-200">
                  Seeded demo data
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Decide what can move before anyone signs.
                </h1>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-300 sm:text-[15px]">
                  One view for treasury composition, policy state, wallet risk, and audit-ready provenance.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Treasury", value: money(treasury.totalValueUsd), icon: CircleDollarSign },
                { label: "Runway", value: `${treasury.runwayDays} days`, icon: FileClock },
                { label: "Alerts", value: `${treasury.alertCount}`, icon: ShieldAlert },
                { label: "Freshness", value: "8 min ago", icon: DatabaseZap },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[1.35fr_0.95fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-4 backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {timeRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setState((current) => ({ ...current, selectedRange: range }))}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
                        state.selectedRange === range
                          ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-100"
                          : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/8"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Metric label="Stablecoin coverage" value={`${Math.round((treasury.stablecoinValueUsd / treasury.totalValueUsd) * 100)}%`} sublabel="Funding reserve" />
                  <Metric label="Top wallet concentration" value={`${Math.round(treasury.topWalletShare * 100)}%`} sublabel="Exposure risk" />
                  <Metric label="Monthly burn" value={money(treasury.monthlyBurnUsd)} sublabel={rangeNote} />
                </div>
              </div>
              <div className="min-w-[280px] rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-50">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  Decision note
                </div>
                <p className="mt-2 text-sm leading-6 text-amber-100/90">
                  {treasury.riskSummary}
                </p>
                <p className="mt-3 text-xs text-amber-100/70">
                  {treasury.source}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-medium text-white">Treasury mix</h2>
                    <p className="text-xs text-slate-400">Seeded snapshot of stablecoins, majors, and yield positions.</p>
                  </div>
                  <div className="text-xs text-slate-400">{treasury.freshness}</div>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { label: "Stablecoins", share: 0.67, tone: "bg-emerald-400" },
                    { label: "Majors", share: 0.16, tone: "bg-cyan-400" },
                    { label: "Yield / staking", share: 0.12, tone: "bg-amber-400" },
                    { label: "Operational tokens", share: 0.05, tone: "bg-orange-400" },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300">{item.label}</span>
                        <span className="font-mono text-slate-400">{Math.round(item.share * 100)}%</span>
                      </div>
                      {stackedBars([
                        { label: item.label, share: item.share, tone: item.tone },
                      ])}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-medium text-white">Runway trend</h2>
                    <p className="text-xs text-slate-400">Stablecoin runway indexed from the seeded burn forecast.</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-slate-400">
                    {state.selectedRange}
                  </span>
                </div>
                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                  <Sparkline values={treasury.sparkline} />
                  <div className="mt-2 flex items-end justify-between text-xs text-slate-400">
                    <span>Momentum index</span>
                    <span className="font-mono text-slate-300">90 / 100</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                    <div className="text-slate-400">Coverage status</div>
                    <div className="mt-1 font-medium text-emerald-300">Adequate, but tightening</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                    <div className="text-slate-400">Primary risk</div>
                    <div className="mt-1 font-medium text-amber-300">Concentration + screening</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-slate-950/55 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-white">Transfer review</h2>
                <p className="text-xs text-slate-400">Decision queue with state persistence.</p>
              </div>
              <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-4 space-y-3">
              {transfers.map((transfer) => {
                const currentState = (state.transferStates[transfer.id] ?? transfer.state) as TransferState
                return (
                  <div
                    key={transfer.id}
                    className={`w-full rounded-2xl border p-4 text-left transition ${statusClass(currentState)}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-medium text-white">
                          {transfer.asset} {transfer.amount}
                        </div>
                        <div className="text-xs text-slate-300">
                          {transfer.source} → {transfer.destination}
                        </div>
                      </div>
                      <span className={`rounded-full border px-2 py-1 font-mono text-[11px] ${statusClass(currentState)}`}>
                        {currentState}
                      </span>
                    </div>
                    <div className="mt-3 text-xs leading-5 text-slate-300">{transfer.reason}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        ["Screening", transfer.screening],
                        ["Policy", transfer.policy],
                      ].map(([label, risk]) => (
                        <span
                          key={label}
                          className={`rounded-full border px-2 py-1 font-mono text-[11px] ${riskClass(risk as RiskLevel)}`}
                        >
                          {label}: {riskLabel(risk as RiskLevel)}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(["Pending", "Escalated", "Approved", "Blocked"] as TransferState[]).map((nextState) => (
                        <button
                          key={nextState}
                          onClick={() =>
                            setState((current) => ({
                              ...current,
                              transferStates: { ...current.transferStates, [transfer.id]: nextState },
                            }))
                          }
                          className={`rounded-full border px-3 py-1.5 text-[11px] transition ${
                            currentState === nextState
                              ? "border-white/20 bg-white/15 text-white"
                              : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                          }`}
                        >
                          {nextState}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </aside>
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-4 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-medium text-white">Wallets</h2>
                <p className="text-xs text-slate-400">Filter by operational risk, then drill into a wallet.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {riskFilters.map((risk) => (
                  <button
                    key={risk}
                    onClick={() => setState((current) => ({ ...current, riskFilter: risk }))}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      state.riskFilter === risk
                        ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-100"
                        : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/8"
                    }`}
                  >
                    {risk}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {visibleWallets.map((wallet) => {
                const isActive = wallet.id === selectedWallet.id
                return (
                  <button
                    key={wallet.id}
                    onClick={() => setState((current) => ({ ...current, selectedWalletId: wallet.id }))}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      isActive
                        ? "border-cyan-400/35 bg-cyan-400/10"
                        : "border-white/10 bg-white/5 hover:bg-white/8"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-4 w-4 text-cyan-300" />
                          <h3 className="font-medium text-white">{wallet.name}</h3>
                        </div>
                        <p className="text-xs text-slate-400">
                          {wallet.chain} · {wallet.custody} · {wallet.signerCoverage}
                        </p>
                      </div>
                      <span className={`rounded-full border px-2 py-1 font-mono text-[11px] ${riskClass(wallet.risk)}`}>
                        {riskLabel(wallet.risk)}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                      <MiniStat label="Value" value={money(wallet.valueUsd)} />
                      <MiniStat label="Freshness" value={wallet.freshness} />
                      <MiniStat label="Share" value={`${Math.round(wallet.concentration * 100)}%`} />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-4 backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Lock className="h-3.5 w-3.5" />
                  Wallet detail and custody posture
                </div>
                <h2 className="mt-1 text-xl font-semibold text-white">{selectedWallet.name}</h2>
                <p className="mt-1 text-sm text-slate-300">
                  {selectedWallet.chain} · {selectedWallet.custody} custody · {selectedWallet.signerCoverage}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedWallet.labels.map((label) => (
                    <span key={label} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-right">
                <div className="text-xs text-slate-400">Treasury value</div>
                <div className="mt-1 text-2xl font-semibold text-white">{money(selectedWallet.valueUsd)}</div>
                <div className={`mt-2 inline-flex rounded-full border px-2 py-1 font-mono text-[11px] ${riskClass(selectedWallet.risk)}`}>
                  {riskLabel(selectedWallet.risk)}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.95fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">Asset exposure</h3>
                  <span className="text-xs text-slate-400">{selectedWallet.freshness}</span>
                </div>
                <div className="mt-4 space-y-3">
                  {selectedWallet.balances.map((asset) => (
                    <div key={asset.symbol} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-200">{asset.symbol}</span>
                        <span className="font-mono text-slate-400">
                          {money(asset.valueUsd)} · {Math.round(asset.share * 100)}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <div
                          className={`h-full rounded-full ${
                            asset.volatility === "low" ? "bg-emerald-400" : asset.volatility === "medium" ? "bg-amber-400" : "bg-orange-400"
                          }`}
                          style={{ width: `${Math.max(asset.share * 100, 5)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">Counterparty risk</h3>
                  <span className="text-xs text-slate-400">Decision trace</span>
                </div>
                <div className="mt-4 space-y-3">
                  {selectedWallet.counterparties.map((counterparty) => (
                    <div key={counterparty.label} className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-sm font-medium text-white">{counterparty.label}</div>
                          <div className="text-xs text-slate-400">Last seen {counterparty.lastSeen}</div>
                        </div>
                        <span className={`rounded-full border px-2 py-1 font-mono text-[11px] ${riskClass(counterparty.risk)}`}>
                          {riskLabel(counterparty.risk)}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-slate-300">Exposure {counterparty.exposure}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.95fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-medium text-white">Recent activity</h3>
                <div className="mt-3 space-y-2">
                  {selectedWallet.activity.map((entry) => (
                    <div key={`${entry.action}-${entry.time}`} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2.5">
                      <div>
                        <div className="text-sm text-slate-100">{entry.action}</div>
                        <div className="text-xs text-slate-400">{entry.counterparty}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm text-slate-100">{entry.amount}</div>
                        <div className="text-xs text-slate-400">{entry.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">Governance note</h3>
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  This wallet is visible through a seeded snapshot only. Signing, custody movement, and policy enforcement are
                  represented as product states, not live operations.
                </p>
                <div className="mt-4 grid gap-2 text-xs text-slate-300">
                  <div className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2">
                    Freshness: {selectedWallet.freshness}
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2">
                    Source class: Wallet + policy + screening + activity snapshot
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2">
                    Compliance posture: review counterparty exposure before approving transfer requests
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-4 backdrop-blur">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-300" />
              <h2 className="text-sm font-medium text-white">Operational timeline</h2>
            </div>
            <div className="mt-4 space-y-3">
              {timeline.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-white">{item.title}</div>
                      <div className="mt-1 text-xs text-slate-400">{item.time}</div>
                    </div>
                    <span className={`rounded-full border px-2 py-1 font-mono text-[11px] ${riskClass(item.severity as RiskLevel)}`}>
                      {riskLabel(item.severity as RiskLevel)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-4 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-medium text-white">Product semantics</h2>
                <p className="text-xs text-slate-400">Why this wedge is not a generic price wall.</p>
              </div>
              <ArrowRightLeft className="h-4 w-4 text-cyan-300" />
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                ["Decision loop", "Triage balances, approve transfers, and document exceptions."],
                ["Trust model", "Show custody posture, signer coverage, and freshness for every wallet."],
                ["Risk semantics", "Use screening, policy, and counterparty exposure as first-class states."],
                ["Buyer story", "Sell to treasury and compliance teams that need audit-ready decisions."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-medium text-white">{title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="rounded-3xl border border-white/10 bg-slate-950/55 p-4 text-sm text-slate-400 backdrop-blur">
          Demo uses seeded values only. No wallet connection, live pricing, custody actions, or signing are required or implied.
        </footer>
      </div>
    </div>
  )
}

function Metric({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{sublabel}</div>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-1 text-xs text-slate-100">{value}</div>
    </div>
  )
}
