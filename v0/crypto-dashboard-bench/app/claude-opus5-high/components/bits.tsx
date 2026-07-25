"use client"

import * as React from "react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import type { Tier, Verdict } from "../lib/engine"
import { stamp } from "../lib/format"
import css from "../waterline.module.css"

export function Label({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <span id={id} className={[css.label, className].filter(Boolean).join(" ")}>
      {children}
    </span>
  )
}

export function Panel({
  title,
  subtitle,
  aside,
  children,
  bodyClassName,
  style,
  id,
}: {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  aside?: React.ReactNode
  children: React.ReactNode
  bodyClassName?: string
  style?: React.CSSProperties
  id?: string
}) {
  return (
    <section className={css.panel} style={style} aria-labelledby={id ? `${id}-t` : undefined}>
      {(title || aside) && (
        <header className={css.panelHead}>
          <div style={{ minWidth: 0 }}>
            {title && (
              <h2 id={id ? `${id}-t` : undefined} className={css.panelTitle}>
                {title}
              </h2>
            )}
            {subtitle && <p className={css.panelSub}>{subtitle}</p>}
          </div>
          {aside}
        </header>
      )}
      <div className={[css.panelBody, bodyClassName].filter(Boolean).join(" ")}>{children}</div>
    </section>
  )
}

export function Stat({
  label,
  value,
  note,
  tone,
}: {
  label: React.ReactNode
  value: React.ReactNode
  note?: React.ReactNode
  tone?: "liquid" | "breach" | "latency" | "mark" | "surplus"
}) {
  const colour =
    tone === "breach"
      ? "var(--wl-breach)"
      : tone === "latency"
        ? "var(--wl-latency)"
        : tone === "liquid"
          ? "var(--wl-liquid)"
          : tone === "surplus"
            ? "var(--wl-surplus)"
            : tone === "mark"
              ? "var(--color-muted-foreground)"
              : undefined
  return (
    <div className={css.stat}>
      <Label>{label}</Label>
      <div className={css.statValue} style={colour ? { color: colour } : undefined}>
        {value}
      </div>
      {note && <div className={css.statNote}>{note}</div>}
    </div>
  )
}

const TIER_COPY: Record<Tier, { name: string; meaning: string }> = {
  observed: { name: "Observed", meaning: "Read from a price feed or an order book." },
  derived: { name: "Derived", meaning: "Arithmetic on observed values." },
  modelled: {
    name: "Modelled",
    meaning:
      "An assumption, not an observation. Impact beyond the visible order book is extrapolated with a square-root law.",
  },
  input: { name: "Entered", meaning: "A person typed this, or negotiated it. Not verifiable against a public quote." },
}

/** Small evidence chip: where a number came from, when, and how sure we are. */
export function Prov({
  tier,
  source,
  asOf,
  refreshMins,
  stale,
  method,
}: {
  tier: Tier
  source: string
  asOf?: string
  refreshMins?: number
  stale?: boolean
  method?: string
}) {
  const copy = TIER_COPY[tier]
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span className={css.chip} data-tier={tier} data-stale={stale ? "true" : undefined} />
        }
      >
        {copy.name.toLowerCase()}
        {stale ? " · stale" : ""}
      </TooltipTrigger>
      <TooltipContent className="max-w-[19rem]">
        <div className="space-y-1">
          <div className="font-medium">
            {copy.name} · {source}
          </div>
          <div className="text-muted-foreground">{copy.meaning}</div>
          {asOf && <div className="text-muted-foreground">As of {stamp(asOf)}</div>}
          {refreshMins !== undefined && (
            <div className="text-muted-foreground">
              {`Expected to refresh every ${refreshMins < 60 ? `${refreshMins} min` : `${Math.round(refreshMins / 60)} h`}.`}
              {stale ? " Older than that, so treat it as degraded." : ""}
            </div>
          )}
          {method && <div className="text-muted-foreground">{method}</div>}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}

const VERDICT_LABEL: Record<Verdict, string> = { pass: "pass", warn: "watch", fail: "breach" }

export function VerdictTag({ verdict }: { verdict: Verdict }) {
  return (
    <span className={css.verdict} data-v={verdict}>
      {VERDICT_LABEL[verdict]}
    </span>
  )
}

export function Swatch({ colour, dashed }: { colour: string; dashed?: boolean }) {
  return (
    <span
      className={css.dot}
      style={
        dashed
          ? { border: `1px dashed ${colour}`, background: "transparent" }
          : { background: colour }
      }
      aria-hidden="true"
    />
  )
}

export function Legend({ items }: { items: { colour: string; label: string; dashed?: boolean }[] }) {
  return (
    <div className={css.legend}>
      {items.map((i) => (
        <span key={i.label} className={css.legendItem}>
          <Swatch colour={i.colour} dashed={i.dashed} />
          {i.label}
        </span>
      ))}
    </div>
  )
}

export function Note({
  kind = "info",
  children,
}: {
  kind?: "info" | "warn" | "danger" | "plain"
  children: React.ReactNode
}) {
  return (
    <p className={css.note} data-kind={kind}>
      {children}
    </p>
  )
}

export function Meter({
  value,
  max,
  limit,
  breach,
}: {
  value: number
  max: number
  limit?: number
  breach?: boolean
}) {
  const pctOf = (n: number) => `${Math.max(0, Math.min(100, (n / Math.max(max, 1e-9)) * 100))}%`
  return (
    <div className={css.meter}>
      <div className={css.meterFill} style={{ width: pctOf(value) }} data-breach={breach ? "true" : undefined} />
      {limit !== undefined && <div className={css.meterLimit} style={{ left: pctOf(limit) }} />}
    </div>
  )
}

/** A chart's conclusion in words, placed before the chart, for screen readers
 *  and for anyone who would rather read it. */
export function ChartSummary({ children }: { children: React.ReactNode }) {
  return <p className={css.srOnlySummary}>{children}</p>
}

export function Mono({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <span className={[css.mono, className].filter(Boolean).join(" ")} style={style}>
      {children}
    </span>
  )
}

export function KeyValue({ rows }: { rows: { k: React.ReactNode; v: React.ReactNode }[] }) {
  return (
    <dl className={css.kv}>
      {rows.map((r, i) => (
        <React.Fragment key={i}>
          <dt>{r.k}</dt>
          <dd>{r.v}</dd>
        </React.Fragment>
      ))}
    </dl>
  )
}
