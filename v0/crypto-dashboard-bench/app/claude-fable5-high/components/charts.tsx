"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { fmtMonths, fmtPct, fmtUsd, fmtUsdFull } from "../lib/format"
import { useVizPalette, type VizPalette } from "../lib/theme"
import type { AssetClass, Snapshot } from "../lib/types"
import styles from "../glidepath.module.css"

interface TooltipEntry {
  name?: string
  value?: number | string
  color?: string
  dataKey?: string | number
}

function ChartTooltip({
  active,
  payload,
  label,
  palette,
  labelFormatter,
  valueFormatter,
}: {
  active?: boolean
  payload?: TooltipEntry[]
  label?: string | number
  palette: VizPalette
  labelFormatter?: (label: string | number | undefined) => string
  valueFormatter?: (value: number) => string
}) {
  if (!active || !payload?.length) return null
  const fmt = valueFormatter ?? ((v: number) => fmtUsdFull(v))
  return (
    <div
      className="rounded-lg border px-2.5 py-1.5 text-xs shadow-md"
      style={{
        backgroundColor: palette.tooltipBg,
        borderColor: palette.tooltipBorder,
        color: palette.ink,
      }}
    >
      {labelFormatter ? (
        <div className="mb-1 font-medium" style={{ color: palette.mutedInk }}>
          {labelFormatter(label)}
        </div>
      ) : null}
      <div className="space-y-0.5">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-block size-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span className={`${styles.nums} font-mono`}>
              {typeof entry.value === "number" ? fmt(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LegendRow({
  items,
}: {
  items: { label: string; color: string; note?: string; dashed?: boolean }[]
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center gap-1.5">
          {it.dashed ? (
            <span
              aria-hidden
              className="inline-block h-0.5 w-4 rounded"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, ${it.color} 0 4px, transparent 4px 7px)`,
              }}
            />
          ) : (
            <span
              aria-hidden
              className="inline-block size-2.5 rounded-[3px]"
              style={{ backgroundColor: it.color }}
            />
          )}
          <span className="text-foreground">{it.label}</span>
          {it.note ? <span className={`${styles.nums} font-mono`}>{it.note}</span> : null}
        </span>
      ))}
    </div>
  )
}

/**
 * 24-month projection of spendable value (stables + majors + staked; own token
 * excluded) under the current prices and two further stress paths.
 */
export function ProjectionChart({
  snap,
  floorMonths,
  height = 240,
}: {
  snap: Snapshot
  floorMonths: number
  height?: number
}) {
  const { palette } = useVizPalette()
  const volatile = snap.byClass.major + snap.byClass.staked
  const burn = snap.burnMonthlyUsd
  const data = React.useMemo(() => {
    const start = (extra: number) => snap.stablesUsd + volatile * (1 - extra)
    const out: { m: number; base: number; s30: number; s60: number }[] = []
    for (let m = 0; m <= 24; m++) {
      out.push({
        m,
        base: Math.max(start(0) - burn * m, 0),
        s30: Math.max(start(0.3) - burn * m, 0),
        s60: Math.max(start(0.6) - burn * m, 0),
      })
    }
    return out
  }, [snap.stablesUsd, volatile, burn])

  return (
    <div>
      <div
        role="img"
        aria-label={`Projected spendable treasury value over 24 months. Runway is ${fmtMonths(
          snap.runwayMonths
        )} at current prices, ${fmtMonths(
          snap.stressCases[0].runwayMonths
        )} after a further 30% drop, and ${fmtMonths(
          snap.stressCases[1].runwayMonths
        )} after a further 60% drop.`}
        style={{ height }}
      >
        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 120 }}>
          <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
            <CartesianGrid stroke={palette.grid} strokeWidth={1} vertical={false} />
            <XAxis
              dataKey="m"
              ticks={[0, 6, 12, 18, 24]}
              tickFormatter={(m: number) => `${m} mo`}
              tick={{ fill: palette.mutedInk, fontSize: 11 }}
              axisLine={{ stroke: palette.baseline }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v: number) => fmtUsd(v)}
              tick={{ fill: palette.mutedInk, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip
              cursor={{ stroke: palette.baseline, strokeWidth: 1 }}
              content={
                <ChartTooltip
                  palette={palette}
                  labelFormatter={(l) => `Month ${l}`}
                />
              }
            />
            <ReferenceLine y={0} stroke={palette.baseline} strokeWidth={1} />
            <ReferenceLine
              x={Math.min(Math.round(floorMonths), 24)}
              stroke={palette.mutedInk}
              strokeDasharray="3 3"
              label={{
                value: `Stable-floor policy: ${floorMonths} mo`,
                position: "insideTopRight",
                fill: palette.mutedInk,
                fontSize: 11,
              }}
            />
            <Line
              type="monotone"
              dataKey="base"
              name="At scenario prices"
              stroke={palette.s1}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="s30"
              name="Further −30% on volatile"
              stroke={palette.gray1}
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="s60"
              name="Further −60% on volatile"
              stroke={palette.gray2}
              strokeWidth={2}
              strokeDasharray="2 4"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <LegendRow
        items={[
          {
            label: "At scenario prices",
            color: palette.s1,
            note: fmtMonths(snap.runwayMonths),
          },
          {
            label: "Further −30%",
            color: palette.gray1,
            note: fmtMonths(snap.stressCases[0].runwayMonths),
            dashed: true,
          },
          {
            label: "Further −60%",
            color: palette.gray2,
            note: fmtMonths(snap.stressCases[1].runwayMonths),
            dashed: true,
          },
        ]}
      />
    </div>
  )
}

/** 90-day seeded history of total treasury value. Single series — no legend. */
export function HistoryChart({
  data,
  height = 120,
}: {
  data: { day: number; value: number }[]
  height?: number
}) {
  const { palette } = useVizPalette()
  return (
    <div role="img" aria-label="Treasury value over the last 90 days (seeded demo history)." style={{ height }}>
      <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 120 }}>
        <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="gp-history-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.s1} stopOpacity={0.22} />
              <stop offset="100%" stopColor={palette.s1} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" hide />
          <YAxis hide domain={["dataMin * 0.96", "dataMax * 1.02"]} />
          <Tooltip
            cursor={{ stroke: palette.baseline, strokeWidth: 1 }}
            content={
              <ChartTooltip
                palette={palette}
                labelFormatter={(l) => (Number(l) === 0 ? "Today (demo clock)" : `${Math.abs(Number(l))} days ago`)}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="value"
            name="Treasury value"
            stroke={palette.s1}
            strokeWidth={2}
            fill="url(#gp-history-fill)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

const CLASS_META: { key: AssetClass; label: string }[] = [
  { key: "stable", label: "Stablecoins" },
  { key: "major", label: "Majors" },
  { key: "staked", label: "Staked" },
  { key: "own", label: "Own token" },
]

/** Part-to-whole allocation: one horizontal stacked bar, categorical slots 1–4. */
export function AllocationBar({ snap }: { snap: Snapshot }) {
  const { palette } = useVizPalette()
  const colors: Record<AssetClass, string> = {
    stable: palette.s1,
    major: palette.s2,
    staked: palette.s3,
    own: palette.s4,
  }
  const data = [
    {
      name: "Allocation",
      stable: snap.byClass.stable,
      major: snap.byClass.major,
      staked: snap.byClass.staked,
      own: snap.byClass.own,
    },
  ]
  return (
    <div>
      <div
        role="img"
        aria-label={CLASS_META.map(
          (c) =>
            `${c.label}: ${fmtUsd(snap.byClass[c.key])} (${fmtPct(
              snap.totalUsd > 0 ? (snap.byClass[c.key] / snap.totalUsd) * 100 : 0
            )})`
        ).join("; ")}
        style={{ height: 56 }}
      >
        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 120 }}>
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 0, bottom: 8, left: 0 }}>
            <XAxis type="number" hide domain={[0, snap.totalUsd || 1]} />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip
              cursor={false}
              content={<ChartTooltip palette={palette} />}
            />
            {CLASS_META.map((c) => (
              <Bar
                key={c.key}
                dataKey={c.key}
                name={c.label}
                stackId="alloc"
                fill={colors[c.key]}
                stroke={palette.cardBg}
                strokeWidth={2}
                radius={3}
                isAnimationActive={false}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <LegendRow
        items={CLASS_META.map((c) => ({
          label: c.label,
          color: colors[c.key],
          note: `${fmtUsd(snap.byClass[c.key])} · ${fmtPct(
            snap.totalUsd > 0 ? (snap.byClass[c.key] / snap.totalUsd) * 100 : 0
          )}`,
        }))}
      />
    </div>
  )
}

/** 30-day peg sparkline for a stablecoin, with the ±50 bps tolerance band. */
export function PegSparkline({
  data,
  height = 48,
}: {
  data: { day: number; value: number }[]
  height?: number
}) {
  const { palette } = useVizPalette()
  const last = data[data.length - 1]?.value ?? 1
  const breach = Math.abs(last - 1) > 0.005
  return (
    <div
      role="img"
      aria-label={`Peg over 30 days; currently $${last.toFixed(4)}${breach ? " — outside the ±50 bps band" : ""}.`}
      style={{ height, width: 160 }}
    >
      <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 120 }}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 2, left: 4 }}>
          <XAxis dataKey="day" hide />
          <YAxis hide domain={[Math.min(0.982, last - 0.004), 1.008]} />
          <ReferenceArea y1={0.995} y2={1.005} fill={palette.grid} fillOpacity={0.5} stroke="none" />
          <ReferenceLine y={1} stroke={palette.baseline} strokeWidth={1} />
          <Tooltip
            cursor={{ stroke: palette.baseline, strokeWidth: 1 }}
            content={
              <ChartTooltip
                palette={palette}
                valueFormatter={(v) => `$${v.toFixed(4)}`}
                labelFormatter={(l) => (Number(l) === 0 ? "Today" : `${Math.abs(Number(l))}d ago`)}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="value"
            name="Price"
            stroke={breach ? palette.critical : palette.mutedInk}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
