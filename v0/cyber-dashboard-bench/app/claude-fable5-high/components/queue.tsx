"use client"

import * as React from "react"
import {
  CableIcon,
  CheckCircle2Icon,
  FilterXIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { formatCount } from "../lib/format"
import { useStore } from "../lib/store"
import type { ScoredPack, Severity } from "../lib/types"
import {
  Countdown,
  EvidenceChips,
  OwnerBadge,
  ScoreBadge,
  SeverityTag,
  StatusTag,
} from "./bits"
import styles from "../patchbay.module.css"

type Attention = "breached" | "due" | "changed" | "unassigned" | null
type StatusFilter = "active" | "all" | "closed"

const DAY = 24 * 60 * 60 * 1000

function isActive(p: ScoredPack) {
  return p.status !== "verified" && p.status !== "accepted"
}

export function QueueView({
  onOpenPack,
}: {
  onOpenPack: (id: string) => void
}) {
  const { state, dispatch, packs, now } = useStore()
  const [attention, setAttention] = React.useState<Attention>(null)
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("active")
  const [severityFilter, setSeverityFilter] = React.useState<Severity | "all">("all")

  if (state.scenario === "first-run") {
    return <FirstRunEmpty onLoadSample={() => dispatch({ type: "set-scenario", scenario: "steady" })} />
  }

  const active = packs.filter(isActive)
  const counts = {
    breached: active.filter((p) => p.breached).length,
    due: active.filter((p) => !p.breached && p.dueAt - now < 3 * DAY).length,
    changed: packs.filter((p) => p.evidenceChanged).length,
    unassigned: active.filter((p) => !p.ownerId).length,
  }
  const totalFindings = packs.reduce((s, p) => s + p.findingCount, 0)

  const visible = packs.filter((p) => {
    if (statusFilter === "active" && !isActive(p)) return false
    if (statusFilter === "closed" && isActive(p)) return false
    if (severityFilter !== "all" && p.severity !== severityFilter) return false
    if (attention === "breached" && !p.breached) return false
    if (attention === "due" && (p.breached || !isActive(p) || p.dueAt - now >= 3 * DAY))
      return false
    if (attention === "changed" && !p.evidenceChanged) return false
    if (attention === "unassigned" && (p.ownerId || !isActive(p))) return false
    return true
  })

  const hasFilters =
    attention !== null || statusFilter !== "active" || severityFilter !== "all"

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="font-heading text-lg font-semibold">Fix Queue</h1>
          <p className="text-[13px] text-muted-foreground">
            <span className="font-mono font-medium text-foreground">
              {formatCount(totalFindings)}
            </span>{" "}
            raw findings became{" "}
            <span className="font-mono font-medium text-foreground">
              {packs.length}
            </span>{" "}
            fixes · {active.length} still active
          </p>
        </div>
        <p className="text-[11px] text-muted-foreground/70">
          Ranked by evidence — open any row to see its receipts
        </p>
      </header>

      {state.scenario === "kev-morning" && counts.changed > 0 && (
        <div
          role="status"
          className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-[#ff5d5d]/30 bg-[#ff5d5d]/8 px-3 py-2.5"
        >
          <span aria-hidden className={cn("size-2 rounded-full bg-[#ff5d5d]", styles.pulse)} />
          <p className="min-w-0 flex-1 text-[13px]">
            <span className="font-semibold text-[#ff8a8a]">Overnight evidence change.</span>{" "}
            CISA added 2 CVEs affecting you to the KEV catalog and one EPSS score moved
            sharply. {counts.changed} fixes re-ranked — nothing else about your
            environment changed, only the evidence.
          </p>
          <Button
            size="xs"
            variant="outline"
            onClick={() => setAttention(attention === "changed" ? null : "changed")}
          >
            {attention === "changed" ? "Show all" : "Show re-ranked"}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4" role="group" aria-label="Attention filters">
        <AttentionTile
          label="SLA breached"
          count={counts.breached}
          tone="danger"
          active={attention === "breached"}
          onClick={() => setAttention(attention === "breached" ? null : "breached")}
        />
        <AttentionTile
          label="Due within 3 days"
          count={counts.due}
          tone="warn"
          active={attention === "due"}
          onClick={() => setAttention(attention === "due" ? null : "due")}
        />
        <AttentionTile
          label="Evidence changed"
          count={counts.changed}
          tone={counts.changed > 0 ? "danger" : "neutral"}
          active={attention === "changed"}
          onClick={() => setAttention(attention === "changed" ? null : "changed")}
        />
        <AttentionTile
          label="Unassigned"
          count={counts.unassigned}
          tone="neutral"
          active={attention === "unassigned"}
          onClick={() => setAttention(attention === "unassigned" ? null : "unassigned")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-lg border border-border p-0.5" role="group" aria-label="Status filter">
          {(
            [
              ["active", "Active"],
              ["all", "All"],
              ["closed", "Closed & accepted"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setStatusFilter(id)}
              aria-pressed={statusFilter === id}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                statusFilter === id
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex rounded-lg border border-border p-0.5" role="group" aria-label="Severity filter">
          {(
            [
              ["all", "All severities"],
              ["critical", "Critical"],
              ["high", "High"],
              ["medium", "Medium"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setSeverityFilter(id as Severity | "all")}
              aria-pressed={severityFilter === id}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                severityFilter === id
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        {hasFilters && (
          <Button
            size="xs"
            variant="ghost"
            onClick={() => {
              setAttention(null)
              setStatusFilter("active")
              setSeverityFilter("all")
            }}
          >
            <FilterXIcon aria-hidden />
            Clear filters
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div
          aria-hidden
          className="hidden border-b border-border px-3 py-2 text-[10.5px] font-semibold tracking-wider text-muted-foreground/80 uppercase lg:grid lg:grid-cols-[74px_44px_minmax(0,1fr)_88px_106px_92px_112px] lg:gap-3"
        >
          <span>Severity</span>
          <span>Score</span>
          <span>Fix</span>
          <span>Findings</span>
          <span>Owner</span>
          <span>SLA</span>
          <span>Status</span>
        </div>
        {visible.length === 0 ? (
          hasFilters ? (
            <EmptyRow
              icon={FilterXIcon}
              title="Nothing matches these filters"
              body="Clear the filters to see the full queue."
            />
          ) : (
            <EmptyRow
              icon={CheckCircle2Icon}
              title="Queue clear"
              body="Every fix is verified or accepted. This is the product working — enjoy it while it lasts."
              tone="ok"
            />
          )
        ) : (
          <ul className="divide-y divide-border">
            {visible.map((pack) => (
              <li key={pack.id}>
                <PackRow pack={pack} now={now} onOpen={() => onOpenPack(pack.id)} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-center text-[11px] text-muted-foreground/60">
        All findings, assets, and integrations shown are fictional demo data.
      </p>
    </div>
  )
}

function AttentionTile({
  label,
  count,
  tone,
  active,
  onClick,
}: {
  label: string
  count: number
  tone: "danger" | "warn" | "neutral"
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`Filter: ${label} (${count})`}
      className={cn(
        "flex items-baseline justify-between gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "border-[#4cc2ff]/50 bg-[#4cc2ff]/8"
          : "border-border bg-card hover:bg-accent/50"
      )}
    >
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={cn(
          "font-mono text-xl font-semibold tabular-nums",
          count === 0
            ? "text-muted-foreground/50"
            : tone === "danger"
              ? "text-[#ff8a8a]"
              : tone === "warn"
                ? "text-[#ffbe7d]"
                : "text-foreground"
        )}
      >
        {count}
      </span>
    </button>
  )
}

function PackRow({
  pack,
  now,
  onOpen,
}: {
  pack: ScoredPack
  now: number
  onOpen: () => void
}) {
  const closed = pack.status === "verified" || pack.status === "accepted"
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onOpen()
        }
      }}
      aria-label={`Open fix: ${pack.title}`}
      className={cn(
        styles.row,
        "cursor-pointer px-3 py-2.5 lg:grid lg:grid-cols-[74px_44px_minmax(0,1fr)_88px_106px_92px_112px] lg:items-center lg:gap-3",
        closed && "opacity-55"
      )}
    >
      {/* mobile layout is a stacked card; desktop is the grid above */}
      <div className="flex items-center justify-between lg:contents">
        <span className="lg:contents">
          <SeverityTag severity={pack.severity} />
        </span>
        <span className="lg:contents">
          <ScoreBadge score={pack.score} severity={pack.severity} />
        </span>
      </div>
      <div className="mt-1.5 min-w-0 lg:mt-0">
        <p className="truncate text-[13px] font-medium text-foreground">
          {pack.evidenceChanged && (
            <span
              className="mr-1.5 inline-flex items-center gap-1 rounded bg-[#ff5d5d]/12 px-1 py-px align-middle font-mono text-[10px] font-semibold text-[#ff8a8a]"
              title="Ranking evidence changed overnight"
            >
              <ZapIcon aria-hidden className="size-2.5" />
              re-ranked
            </span>
          )}
          {pack.title}
        </p>
        <p className="mt-0.5 hidden lg:block">
          <EvidenceChips pack={pack} />
        </p>
      </div>
      <span className="hidden font-mono text-xs text-muted-foreground tabular-nums lg:inline">
        {formatCount(pack.findingCount)}
      </span>
      <span className="hidden min-w-0 lg:inline-flex">
        <OwnerBadge ownerId={pack.ownerId} />
      </span>
      <span className="hidden lg:inline-flex">
        <Countdown pack={pack} now={now} />
      </span>
      <span className="hidden lg:inline-flex">
        <StatusTag status={pack.status} />
      </span>

      {/* mobile secondary line */}
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 lg:hidden">
        <EvidenceChips pack={pack} max={3} />
        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
          {formatCount(pack.findingCount)} findings
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 lg:hidden">
        <span className="flex items-center gap-3">
          <OwnerBadge ownerId={pack.ownerId} />
          <Countdown pack={pack} now={now} />
        </span>
        <StatusTag status={pack.status} />
      </div>
    </div>
  )
}

function EmptyRow({
  icon: Icon,
  title,
  body,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
  tone?: "ok"
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
      <Icon
        aria-hidden
        className={cn("size-7", tone === "ok" ? "text-[#3ecf8e]" : "text-muted-foreground/60")}
      />
      <p className="text-sm font-medium">{title}</p>
      <p className="max-w-sm text-[13px] text-muted-foreground">{body}</p>
    </div>
  )
}

function FirstRunEmpty({ onLoadSample }: { onLoadSample: () => void }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-5 rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center lg:py-24">
      <span className="flex size-12 items-center justify-center rounded-xl border border-border bg-secondary">
        <CableIcon aria-hidden className="size-6 text-muted-foreground" />
      </span>
      <div className="max-w-md space-y-2">
        <h1 className="font-heading text-lg font-semibold">
          Connect a scanner to build your Fix Queue
        </h1>
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          Patchbay reads findings from the scanners you already run, removes
          duplicates, groups them into fixes, and ranks each fix with evidence
          you can inspect. Nothing is installed on your systems and connectors
          are read-only.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {["Tenable", "Qualys", "Wiz", "Snyk", "Trivy", "Intruder"].map((s) => (
          <span
            key={s}
            className="rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button onClick={onLoadSample}>
          <SparklesIcon aria-hidden />
          Explore with the sample workspace
        </Button>
        <p className="text-[11px] text-muted-foreground/70">
          This is a product demo — connectors are illustrative and no live data is used.
        </p>
      </div>
    </div>
  )
}
