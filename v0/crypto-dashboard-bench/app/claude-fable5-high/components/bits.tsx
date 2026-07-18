"use client"

import * as React from "react"
import {
  AlertTriangle,
  CheckCircle2,
  CircleAlert,
  Clock,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { fmtSignedPct } from "../lib/format"
import { useVizPalette } from "../lib/theme"
import type { PolicyStatus } from "../lib/types"
import styles from "../glidepath.module.css"

/** Status is never color alone: icon + word, colors from the reserved status palette. */
export function StatusPill({
  status,
  className,
}: {
  status: PolicyStatus
  className?: string
}) {
  const { palette } = useVizPalette()
  const map: Record<PolicyStatus, { icon: LucideIcon; label: string; color: string }> = {
    pass: { icon: CheckCircle2, label: "Pass", color: palette.good },
    warn: { icon: AlertTriangle, label: "Near limit", color: palette.warning },
    fail: { icon: CircleAlert, label: "Breached", color: palette.critical },
  }
  const { icon: Icon, label, color } = map[status]
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium text-foreground",
        className
      )}
      style={{ backgroundColor: `color-mix(in oklch, ${color} 14%, transparent)` }}
    >
      <Icon aria-hidden className="size-3.5" style={{ color }} />
      {label}
    </span>
  )
}

/** Where a number came from and when. Every aggregate on screen carries one. */
export function Provenance({
  source,
  asOf,
  stale,
  className,
}: {
  source: string
  asOf: string
  stale?: boolean
  className?: string
}) {
  const { palette } = useVizPalette()
  return (
    <span
      className={cn(
        "inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] leading-4 text-muted-foreground",
        className
      )}
    >
      <Clock aria-hidden className="size-3 shrink-0" />
      <span>
        {source} · as of {asOf}
      </span>
      {stale ? (
        <span
          className="inline-flex items-center gap-1 rounded-full px-1.5 py-px font-medium text-foreground"
          style={{
            backgroundColor: `color-mix(in oklch, ${palette.warning} 18%, transparent)`,
          }}
        >
          <AlertTriangle aria-hidden className="size-3" style={{ color: palette.warning }} />
          Stale
        </span>
      ) : null}
    </span>
  )
}

/** Signed percent with direction color. Pass upIsGood={false} for costs. */
export function Delta({
  pct,
  upIsGood = true,
  className,
  dp = 1,
}: {
  pct: number
  upIsGood?: boolean
  className?: string
  dp?: number
}) {
  const { palette } = useVizPalette()
  const good = upIsGood ? pct >= 0 : pct <= 0
  const color = Math.abs(pct) < 0.005 ? undefined : good ? palette.up : palette.down
  return (
    <span className={cn(styles.nums, "font-mono text-xs", className)} style={{ color }}>
      {fmtSignedPct(pct, dp)}
    </span>
  )
}

export function StatTile({
  label,
  value,
  sub,
  children,
  className,
}: {
  label: string
  value: React.ReactNode
  sub?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("rounded-xl border bg-card p-4", className)}>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className={cn(styles.nums, "mt-1 font-mono text-xl font-semibold tracking-tight")}>
        {value}
      </div>
      {sub ? <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div> : null}
      {children}
    </div>
  )
}

export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
  className,
}: {
  icon: LucideIcon
  title: string
  body: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-card px-6 py-12 text-center",
        className
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
        <Icon aria-hidden className="size-5 text-muted-foreground" />
      </div>
      <div className="text-sm font-semibold">{title}</div>
      <p className="max-w-sm text-sm text-muted-foreground">{body}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  )
}

export function SectionTitle({
  title,
  hint,
  right,
}: {
  title: string
  hint?: string
  right?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <div>
        <h2 className="text-sm font-semibold">{title}</h2>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      {right}
    </div>
  )
}

/** A ratio against a limit: track, fill, and a visible limit tick. */
export function LimitMeter({
  label,
  valuePct,
  limitPct,
  valueLabel,
  breachedLabel = "Over limit",
}: {
  label: string
  valuePct: number
  limitPct: number
  valueLabel: string
  breachedLabel?: string
}) {
  const { palette } = useVizPalette()
  const breached = valuePct > limitPct
  const max = Math.max(100, valuePct, limitPct)
  const fillPct = Math.min((valuePct / max) * 100, 100)
  const tickPct = Math.min((limitPct / max) * 100, 100)
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <span className="font-medium">{label}</span>
        <span className={cn(styles.nums, "font-mono text-muted-foreground")}>
          {valueLabel}
          {breached ? (
            <span className="ml-1.5 font-sans font-medium text-foreground">
              · {breachedLabel}
            </span>
          ) : null}
        </span>
      </div>
      <div
        className="relative mt-1.5 h-2 overflow-visible rounded-full bg-muted"
        role="img"
        aria-label={`${label}: ${valueLabel}, limit ${limitPct}%`}
      >
        <div
          className="h-full rounded-full transition-[width]"
          style={{
            width: `${fillPct}%`,
            backgroundColor: breached ? palette.critical : palette.s1,
          }}
        />
        <div
          aria-hidden
          className="absolute -top-1 h-4 w-0.5 rounded bg-foreground/70"
          style={{ left: `${tickPct}%` }}
          title={`Limit: ${limitPct}%`}
        />
      </div>
    </div>
  )
}
