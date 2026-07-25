"use client"

import * as React from "react"
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ChartContainer } from "@/components/ui/chart"

import type { Coverage, DepthBand } from "../lib/engine"
import { impactForSize } from "../lib/engine"
import { bps as fmtBps, usdShort } from "../lib/format"
import css from "../waterline.module.css"

/* Chart animation is off everywhere: an operational panel should not redraw
 * itself from zero every time a policy slider moves. */
const NO_ANIM = { isAnimationActive: false } as const

const AXIS = {
  stroke: "var(--wl-grid)",
  tick: { fontSize: 10, fill: "var(--color-muted-foreground)" },
  tickLine: false,
} as const

function TipShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid var(--wl-hair)",
        borderRadius: 8,
        background: "var(--wl-panel)",
        padding: "0.5rem 0.625rem",
        fontSize: "0.6875rem",
        lineHeight: 1.5,
        boxShadow: "0 6px 20px oklch(0 0 0 / 0.12)",
        maxWidth: "16rem",
      }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------- cushion (deviation) */

export interface CushionDatum {
  month: string
  cushion: number
  obligations: number
  available: number
  ratio: number
}

export function cushionData(cov: Coverage): CushionDatum[] {
  return cov.months.map((m, i) => ({
    month: m,
    cushion: cov.cushion[i],
    obligations: cov.cumObligations[i],
    available: cov.cumAvailable[i],
    ratio: cov.ratio[i],
  }))
}

/**
 * The hero chart. Cumulative realisable cash minus cumulative committed spend,
 * per month, on a zero baseline: surplus above, shortfall below. A deviation
 * chart, because the question is "surplus or shortfall against zero".
 */
export function CushionChart({
  cov,
  height = 232,
  compareCov,
  compareLabel,
}: {
  cov: Coverage
  height?: number
  compareCov?: Coverage
  compareLabel?: string
}) {
  const data = React.useMemo(() => {
    const base = cushionData(cov)
    if (!compareCov) return base
    return base.map((d, i) => ({ ...d, compare: compareCov.cushion[i] }))
  }, [cov, compareCov])

  const values = data.flatMap((d) => [
    d.cushion,
    ...(compareCov ? [(d as { compare?: number }).compare ?? 0] : []),
  ])
  const max = Math.max(0, ...values)
  const min = Math.min(0, ...values)
  const gradientOffset = max - min === 0 ? 1 : max / (max - min)
  const breachMonth = cov.firstBreachMonth

  return (
    <ChartContainer
      config={{ cushion: { label: "Liquidity cushion" } }}
      className={`${css.chartFrame} aspect-auto`}
      style={{ height }}
      initialDimension={{ width: 640, height }}
    >
      <ComposedChart data={data} margin={{ top: 6, right: 8, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="wl-cushion" x1="0" y1="0" x2="0" y2="1">
            <stop offset={0} stopColor="var(--wl-liquid)" stopOpacity={0.34} />
            <stop offset={gradientOffset} stopColor="var(--wl-liquid)" stopOpacity={0.06} />
            <stop offset={gradientOffset} stopColor="var(--wl-breach)" stopOpacity={0.22} />
            <stop offset={1} stopColor="var(--wl-breach)" stopOpacity={0.42} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--wl-grid)" strokeDasharray="2 4" />
        <XAxis dataKey="month" {...AXIS} interval="preserveStartEnd" minTickGap={12} />
        <YAxis
          {...AXIS}
          width={52}
          tickFormatter={(v: number) => usdShort(v, 0)}
          axisLine={false}
        />
        <ReferenceLine y={0} stroke="var(--color-foreground)" strokeOpacity={0.45} />
        {breachMonth !== null && (
          <ReferenceLine
            x={cov.months[breachMonth]}
            stroke="var(--wl-breach)"
            strokeDasharray="3 3"
            label={{
              value: "cash runs short",
              position: "insideTopRight",
              fill: "var(--wl-breach)",
              fontSize: 10,
            }}
          />
        )}
        <Tooltip
          cursor={{ stroke: "var(--wl-grid)" }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null
            const d = payload[0].payload as CushionDatum & { compare?: number }
            return (
              <TipShell>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{String(label)}</div>
                <div>
                  Cushion{" "}
                  <strong style={{ color: d.cushion < 0 ? "var(--wl-breach)" : "var(--wl-liquid)" }}>
                    {usdShort(d.cushion)}
                  </strong>
                </div>
                {d.compare !== undefined && (
                  <div style={{ color: "var(--color-muted-foreground)" }}>
                    {`${compareLabel ?? "Comparison"}: ${usdShort(d.compare)}`}
                  </div>
                )}
                <div style={{ color: "var(--color-muted-foreground)", marginTop: 3 }}>
                  {`Realisable to date ${usdShort(d.available)} · owed to date ${usdShort(d.obligations)}`}
                </div>
                <div style={{ color: "var(--color-muted-foreground)" }}>
                  {`Coverage ${Number.isFinite(d.ratio) ? d.ratio.toFixed(2) : "—"}×`}
                </div>
              </TipShell>
            )
          }}
        />
        <Area
          {...NO_ANIM}
          type="monotone"
          dataKey="cushion"
          stroke="var(--wl-liquid)"
          strokeWidth={1.75}
          fill="url(#wl-cushion)"
        />
        {compareCov && (
          <Line
            {...NO_ANIM}
            type="monotone"
            dataKey="compare"
            stroke="var(--wl-modelled)"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            dot={false}
          />
        )}
      </ComposedChart>
    </ChartContainer>
  )
}

/* ---------------------------------------------------- monthly cash by source */

const SERIES_COLOURS = [
  "var(--wl-liquid)",
  "var(--wl-surplus)",
  "var(--wl-latency)",
  "var(--wl-modelled)",
  "var(--wl-mark)",
  "color-mix(in oklab, var(--wl-liquid) 55%, var(--wl-modelled))",
]

export function SupplyStack({ cov, height = 176 }: { cov: Coverage; height?: number }) {
  const lines = React.useMemo(
    () => cov.supply.filter((l) => l.totalUsd > 0).slice(0, 6),
    [cov.supply]
  )
  const data = React.useMemo(
    () =>
      cov.months.map((m, i) => {
        const row: Record<string, string | number> = { month: m }
        for (const l of lines) row[l.symbol] = (row[l.symbol] as number | undefined ?? 0) + l.months[i]
        return row
      }),
    [cov.months, lines]
  )
  const keys = React.useMemo(() => [...new Set(lines.map((l) => l.symbol))], [lines])

  return (
    <ChartContainer
      config={{}}
      className={`${css.chartFrame} aspect-auto`}
      style={{ height }}
      initialDimension={{ width: 560, height }}
    >
      <BarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--wl-grid)" strokeDasharray="2 4" />
        <XAxis dataKey="month" {...AXIS} interval="preserveStartEnd" minTickGap={10} />
        <YAxis {...AXIS} width={48} tickFormatter={(v: number) => usdShort(v, 0)} axisLine={false} />
        <Tooltip
          cursor={{ fill: "var(--wl-grid)" }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null
            const total = payload.reduce((s, p) => s + (Number(p.value) || 0), 0)
            return (
              <TipShell>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{String(label)}</div>
                {payload
                  .filter((p) => Number(p.value) > 0)
                  .map((p) => (
                    <div key={String(p.dataKey)}>
                      {`${String(p.dataKey)} ${usdShort(Number(p.value))}`}
                    </div>
                  ))}
                <div style={{ marginTop: 3, borderTop: "1px solid var(--wl-hair)", paddingTop: 3 }}>
                  {`Total ${usdShort(total)}`}
                </div>
              </TipShell>
            )
          }}
        />
        {keys.map((k, i) => (
          <Bar
            key={k}
            {...NO_ANIM}
            dataKey={k}
            stackId="cash"
            fill={SERIES_COLOURS[i % SERIES_COLOURS.length]}
            radius={i === keys.length - 1 ? [2, 2, 0, 0] : undefined}
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}

export function supplyLegend(cov: Coverage) {
  const keys = [...new Set(cov.supply.filter((l) => l.totalUsd > 0).slice(0, 6).map((l) => l.symbol))]
  return keys.map((k, i) => ({ colour: SERIES_COLOURS[i % SERIES_COLOURS.length], label: k }))
}

/* ------------------------------------------------------------- exit curve */

export interface ExitPoint {
  size: number
  marginal: number
  avg: number
  extrapolated: boolean
}

export function exitCurve(book: DepthBand[], maxSize: number, steps = 26): ExitPoint[] {
  const out: ExitPoint[] = []
  for (let i = 1; i <= steps; i++) {
    const size = (maxSize * i) / steps
    const r = impactForSize(book, size)
    out.push({ size, marginal: r.marginalBps, avg: r.avgBps, extrapolated: r.extrapolated })
  }
  return out
}

/**
 * Price concession against order size, read off the merged depth ladder. The
 * segment past the deepest observed band is drawn dashed, because it is
 * extrapolated rather than observed.
 */
export function ExitCurve({
  book,
  maxSize,
  capBps,
  markers,
  height = 190,
}: {
  book: DepthBand[]
  maxSize: number
  capBps: number
  markers?: { size: number; label: string }[]
  height?: number
}) {
  const data = React.useMemo(() => {
    const pts = exitCurve(book, maxSize)
    return pts.map((p) => ({
      size: p.size,
      observed: p.extrapolated ? null : p.marginal,
      modelled: p.extrapolated ? p.marginal : null,
      avg: p.avg,
    }))
  }, [book, maxSize])

  // Bridge the two series so the line does not break at the handover point.
  const bridged = React.useMemo(() => {
    const rows = data.map((d) => ({ ...d }))
    const firstModelled = rows.findIndex((r) => r.modelled !== null)
    if (firstModelled > 0) rows[firstModelled - 1].modelled = rows[firstModelled - 1].observed
    return rows
  }, [data])

  return (
    <ChartContainer
      config={{}}
      className={`${css.chartFrame} aspect-auto`}
      style={{ height }}
      initialDimension={{ width: 460, height }}
    >
      <LineChart data={bridged} margin={{ top: 8, right: 10, bottom: 2, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--wl-grid)" strokeDasharray="2 4" />
        <XAxis
          dataKey="size"
          type="number"
          domain={[0, maxSize]}
          {...AXIS}
          tickFormatter={(v: number) => usdShort(v, 0)}
          minTickGap={22}
        />
        <YAxis
          {...AXIS}
          width={46}
          axisLine={false}
          tickFormatter={(v: number) => `${Math.round(v)}`}
          label={{
            value: "bps",
            angle: -90,
            position: "insideLeft",
            fontSize: 9,
            fill: "var(--color-muted-foreground)",
          }}
        />
        <ReferenceLine
          y={capBps}
          stroke="var(--wl-breach)"
          strokeDasharray="4 3"
          label={{
            value: `policy cap ${capBps} bps`,
            position: "insideBottomRight",
            fill: "var(--wl-breach)",
            fontSize: 9,
          }}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            const d = payload[0].payload as {
              size: number
              observed: number | null
              modelled: number | null
              avg: number
            }
            const marginal = d.observed ?? d.modelled ?? 0
            return (
              <TipShell>
                <div style={{ fontWeight: 600 }}>{`Sell ${usdShort(d.size)}`}</div>
                <div>{`Last unit gives up ${fmtBps(marginal)}`}</div>
                <div style={{ color: "var(--color-muted-foreground)" }}>
                  {`Average across the order ${fmtBps(d.avg)} · cost ${usdShort((d.avg / 10_000) * d.size)}`}
                </div>
                {d.observed === null && (
                  <div style={{ color: "var(--wl-modelled)", marginTop: 3 }}>
                    Beyond the visible book — modelled, not observed.
                  </div>
                )}
              </TipShell>
            )
          }}
        />
        <Line
          {...NO_ANIM}
          type="monotone"
          dataKey="observed"
          stroke="var(--wl-liquid)"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
        <Line
          {...NO_ANIM}
          type="monotone"
          dataKey="modelled"
          stroke="var(--wl-modelled)"
          strokeWidth={2}
          strokeDasharray="5 3"
          dot={false}
          connectNulls={false}
        />
        {markers?.map((m) => (
          <ReferenceLine
            key={m.label}
            x={m.size}
            stroke="var(--color-foreground)"
            strokeOpacity={0.35}
            strokeDasharray="2 2"
            label={{
              value: m.label,
              position: "insideTopLeft",
              fontSize: 9,
              fill: "var(--color-muted-foreground)",
            }}
          />
        ))}
        {markers?.[0] && (
          <ReferenceDot
            x={markers[0].size}
            y={impactForSize(book, markers[0].size).marginalBps}
            r={3}
            fill="var(--wl-liquid)"
            stroke="var(--wl-panel)"
          />
        )}
      </LineChart>
    </ChartContainer>
  )
}
