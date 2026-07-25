"use client"

import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import styles from "../assay.module.css"
import { compact, plural, relative } from "../lib/format"
import { STATE_META, STATE_ORDER } from "../lib/scoring"
import { CONNECTORS, HISTORY, NOW } from "../lib/seed"
import type {
  AssuranceState,
  CoverageSummary,
  LogSource,
} from "../lib/types"
import { Btn, Panel, Sparkline, cx, stateClass } from "./primitives"

/* -------------------------------------------------------------------------- */
/* KPI row                                                                    */
/* -------------------------------------------------------------------------- */

export function KpiRow({
  summary,
  hydrated,
  onFilterState,
  onShowBroken,
}: {
  summary: CoverageSummary
  hydrated: boolean
  onFilterState: (state: AssuranceState) => void
  onShowBroken: () => void
}) {
  const ph = (value: string) => (hydrated ? value : "––")
  return (
    <div className={styles.kpiRow}>
      <div className={styles.kpi} style={{ "--kpi-accent": "var(--verified)" } as React.CSSProperties}>
        <span className={styles.kpiLabel}>
          <span aria-hidden="true">✓</span> Verified coverage
        </span>
        <span className={styles.kpiValue} data-placeholder={!hydrated}>
          {ph(`${summary.verifiedPct}%`)}
        </span>
        <span className={styles.kpiMeta}>
          {`${summary.verified} of ${summary.scopedTotal} techniques proven inside their freshness window`}
        </span>
      </div>

      <div className={styles.kpi} style={{ "--kpi-accent": "var(--assumed)" } as React.CSSProperties}>
        <span className={styles.kpiLabel}>
          <span aria-hidden="true">△</span> Assurance gap
        </span>
        <span className={styles.kpiValue} data-placeholder={!hydrated}>
          {ph(`${summary.gapPoints} pts`)}
        </span>
        <div className={styles.compareBar}>
          <span className={styles.compareRow}>
            <span style={{ width: "3.5rem" }}>claimed</span>
            <span className={styles.compareTrack}>
              <span
                className={styles.compareFill}
                style={{
                  width: `${summary.claimedPct}%`,
                  background: "var(--assumed)",
                }}
              />
            </span>
            <span className={styles.compareNum}>{`${summary.claimedPct}%`}</span>
          </span>
          <span className={styles.compareRow}>
            <span style={{ width: "3.5rem" }}>verified</span>
            <span className={styles.compareTrack}>
              <span
                className={styles.compareFill}
                style={{
                  width: `${summary.verifiedPct}%`,
                  background: "var(--verified)",
                }}
              />
            </span>
            <span className={styles.compareNum}>{`${summary.verifiedPct}%`}</span>
          </span>
        </div>
      </div>

      <div className={styles.kpi} style={{ "--kpi-accent": "var(--broken)" } as React.CSSProperties}>
        <span className={styles.kpiLabel}>
          <span aria-hidden="true">✕</span> Broken dependencies
        </span>
        <span className={styles.kpiValue} data-placeholder={!hydrated}>
          {ph(String(summary.brokenAnalytics))}
        </span>
        <span className={styles.kpiMeta}>
          {`analytics that cannot fire · ${plural(summary.brokenLogSources, "silent log source")}`}
          <button type="button" className={styles.linkBtn} onClick={onShowBroken}>
            show
          </button>
        </span>
      </div>

      <div className={styles.kpi} style={{ "--kpi-accent": summary.budgetUsed > summary.budgetTotal ? "var(--broken)" : "var(--decaying)" } as React.CSSProperties}>
        <span className={styles.kpiLabel}>
          <span aria-hidden="true">◷</span> Assurance budget
        </span>
        <span className={styles.kpiValue} data-placeholder={!hydrated}>
          {ph(
            summary.budgetUsed > summary.budgetTotal
              ? `${summary.budgetUsed - summary.budgetTotal} over`
              : `${summary.budgetTotal - summary.budgetUsed} left`
          )}
        </span>
        <span className={styles.kpiMeta}>
          {`${summary.budgetUsed} of ${summary.tierOneTotal} tier-1 techniques unverified · budget allows ${summary.budgetTotal}`}
          <button
            type="button"
            className={styles.linkBtn}
            onClick={() => onFilterState("assumed")}
          >
            triage
          </button>
        </span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Service level + burn-down                                                  */
/* -------------------------------------------------------------------------- */

export function ServiceLevelPanel({
  summary,
  targetPct,
  onTarget,
  canEdit,
}: {
  summary: CoverageSummary
  targetPct: number
  onTarget: (value: number) => void
  canEdit: boolean
}) {
  const [draft, setDraft] = React.useState(String(targetPct))
  const data = React.useMemo(
    () => [
      ...HISTORY.map((h) => ({ week: h.week, verified: h.verifiedPct })),
      { week: "now", verified: summary.tierOneVerifiedPct },
    ],
    [summary.tierOneVerifiedPct]
  )
  const met = summary.tierOneVerifiedPct >= targetPct
  const over = summary.budgetUsed > summary.budgetTotal

  return (
    <Panel
      id="sl"
      title="Assurance service level"
      meta="tier 1 · 30-day window"
    >
      <div className={styles.slHead}>
        <span
          className={cx(styles.slValue, stateClass(met ? "verified" : "broken"))}
          style={{ color: "var(--s)" }}
        >
          {`${summary.tierOneVerifiedPct}%`}
        </span>
        <span className={styles.slTarget}>
          <label htmlFor="sl-target">target</label>
          <input
            id="sl-target"
            type="number"
            min={50}
            max={100}
            step={5}
            value={draft}
            disabled={!canEdit}
            title={
              canEdit
                ? undefined
                : "Only the security operations manager role can change the target"
            }
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => {
              const n = Number(draft)
              if (Number.isFinite(n) && n !== targetPct) onTarget(n)
              else setDraft(String(targetPct))
            }}
          />
          <span>%</span>
        </span>
      </div>
      <p className={styles.panelNote}>
        {`${summary.tierOneVerified} of ${summary.tierOneTotal} tier-1 techniques are verified. `}
        {met
          ? "The commitment is being met."
          : `To reach ${targetPct}% you need ${Math.ceil((targetPct / 100) * summary.tierOneTotal) - summary.tierOneVerified} more verified.`}
      </p>

      <div className={styles.budget}>
        <span className={styles.micro}>Budget</span>
        <span className={styles.budgetPips}>
          {Array.from({
            length: Math.max(summary.budgetTotal, summary.budgetUsed),
          }).map((_, i) => (
            <span
              key={i}
              className={styles.budgetPip}
              data-used={i < Math.min(summary.budgetUsed, summary.budgetTotal) ? "true" : undefined}
              data-over={i >= summary.budgetTotal ? "true" : undefined}
            />
          ))}
        </span>
        <span style={{ marginLeft: "auto", color: over ? "var(--broken)" : "var(--dim)" }}>
          {over ? "exhausted" : "in budget"}
        </span>
      </div>

      <div className={styles.chartBox}>
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 300, height: 132 }}
        >
          <LineChart
            data={data}
            margin={{ top: 6, right: 8, bottom: 0, left: -22 }}
          >
            <CartesianGrid
              stroke="var(--line)"
              strokeDasharray="2 3"
              vertical={false}
            />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 9, fill: "var(--faint)" }}
              tickLine={false}
              axisLine={{ stroke: "var(--line-2)" }}
              interval={2}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 50, 100]}
              tick={{ fontSize: 9, fill: "var(--faint)" }}
              tickLine={false}
              axisLine={false}
            />
            <ReferenceLine
              y={targetPct}
              stroke="var(--accent)"
              strokeDasharray="4 3"
              strokeWidth={1.5}
              label={{
                value: `target ${targetPct}%`,
                position: "insideTopRight",
                fill: "var(--accent)",
                fontSize: 9,
              }}
            />
            <Tooltip
              contentStyle={{
                background: "var(--panel)",
                border: "1px solid var(--line-2)",
                borderRadius: 6,
                fontSize: 11,
                color: "var(--text)",
              }}
              labelStyle={{ color: "var(--dim)" }}
              formatter={(value) => [`${String(value)}%`, "verified"]}
            />
            <Line
              type="monotone"
              dataKey="verified"
              isAnimationActive={false}
              stroke="var(--verified)"
              strokeWidth={2}
              dot={{ r: 1.5, fill: "var(--verified)" }}
              activeDot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className={styles.kpiSub}>
        Twelve weeks of tier-1 verified coverage against the target. The drop in
        the last two weeks is the telemetry failures, not a change of scope.
      </p>
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Composition                                                                */
/* -------------------------------------------------------------------------- */

export function CompositionPanel({
  summary,
  activeState,
  onPick,
}: {
  summary: CoverageSummary
  activeState: "all" | AssuranceState
  onPick: (state: AssuranceState) => void
}) {
  const counts: { state: AssuranceState; count: number }[] = STATE_ORDER.map(
    (state) => ({
      state,
      count:
        state === "verified"
          ? summary.verified
          : state === "decaying"
            ? summary.decaying
            : state === "assumed"
              ? summary.assumed
              : state === "broken"
                ? summary.broken
                : state === "blind"
                  ? summary.blind
                  : summary.accepted,
    })
  )
  const total = counts.reduce((n, c) => n + c.count, 0) || 1

  return (
    <Panel id="comp" title="State composition" meta={`${total} in scope`}>
      <div
        className={styles.composition}
        role="img"
        aria-label={counts
          .map((c) => `${STATE_META[c.state].label} ${c.count}`)
          .join(", ")}
      >
        {counts
          .filter((c) => c.count > 0)
          .map((c) => (
            <span
              key={c.state}
              className={cx(styles.compSeg, stateClass(c.state))}
              data-state={c.state}
              style={{ flex: `${c.count} 1 0` }}
            />
          ))}
      </div>
      <div className={styles.legend}>
        {counts.map((c) => (
          <button
            type="button"
            key={c.state}
            className={cx(styles.legendItem, stateClass(c.state))}
            data-active={activeState === c.state ? "true" : undefined}
            onClick={() => onPick(c.state)}
            title={STATE_META[c.state].blurb}
          >
            <span className={styles.legendSwatch} aria-hidden="true" />
            <span className={styles.glyph} aria-hidden="true">
              {STATE_META[c.state].glyph}
            </span>
            {STATE_META[c.state].label}
            <span className={styles.legendCount}>{c.count}</span>
          </button>
        ))}
      </div>
      <p className={styles.kpiSub}>
        Only the first bar counts as coverage. Decaying is never rounded up, and
        assumed — a rule with no test behind it — is what most dashboards paint
        green.
      </p>
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Telemetry health                                                           */
/* -------------------------------------------------------------------------- */

export function TelemetryPanel({
  sources,
  dependents,
  onPick,
}: {
  sources: LogSource[]
  dependents: Record<string, number>
  onPick: (id: string) => void
}) {
  const ordered = [...sources].sort((a, b) => {
    const rank = { silent: 0, degraded: 1, healthy: 2 }
    return rank[a.status] - rank[b.status] || a.name.localeCompare(b.name)
  })
  const silent = ordered.filter((s) => s.status === "silent").length
  return (
    <Panel
      id="telemetry"
      title="Telemetry health"
      meta={silent > 0 ? `${silent} silent` : "all reporting"}
    >
      <div className={styles.sourceList}>
        {ordered.map((s) => {
          const tone =
            s.status === "silent"
              ? "var(--broken)"
              : s.status === "degraded"
                ? "var(--decaying)"
                : "var(--verified)"
          return (
            <button
              type="button"
              key={s.id}
              className={cx(
                styles.source,
                stateClass(
                  s.status === "healthy"
                    ? "verified"
                    : s.status === "degraded"
                      ? "decaying"
                      : "broken"
                )
              )}
              onClick={() => onPick(s.id)}
              aria-label={`${s.name}: ${s.status}, last event ${relative(s.lastEventAt, NOW)}, ${dependents[s.id] ?? 0} techniques depend on it. Filter the queue by this source.`}
            >
              <span>
                <span className={styles.sourceName}>{s.name}</span>
                <span className={styles.sourceMeta}>
                  {`${relative(s.lastEventAt, NOW)} · ${compact(s.volume14d[13])}/d · ${dependents[s.id] ?? 0} tech`}
                </span>
              </span>
              <Sparkline
                values={s.volume14d}
                tone={tone}
                label={`14-day volume for ${s.name}`}
              />
              <span className={styles.statusDot} data-status={s.status}>
                <span className={styles.hideMd}>{s.status}</span>
              </span>
            </button>
          )
        })}
      </div>
      <p className={styles.kpiSub}>
        A source that stops feeding raises no error anywhere. Assay compares each
        last-event time against the source&apos;s expected heartbeat, and flips every
        analytic that depends on it.
      </p>
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Connectors — the honest empty state                                        */
/* -------------------------------------------------------------------------- */

export function ConnectorsPanel({ onReset }: { onReset: () => void }) {
  return (
    <Panel
      id="connectors"
      title="Data sources"
      meta="nothing is connected"
      actions={<Btn onClick={onReset}>Reset demo</Btn>}
    >
      <div className={styles.blockNote}>
        <span aria-hidden="true">◆</span>
        <span>
          <strong>No integration is live.</strong> Every number in this demo comes
          from a fixture in the route&apos;s own source. Assay is read-only against a
          customer&apos;s systems by design — it never asks for write access to a SIEM
          and never ingests raw logs.
        </span>
      </div>
      <div>
        {CONNECTORS.map((c) => (
          <div className={styles.connector} key={c.id}>
            <span className={styles.fixtureTag}>fixture</span>
            <span>
              <strong>{c.name}</strong>
              <span className={styles.techId}>{` · ${c.vendor}`}</span>
              <span style={{ display: "block", color: "var(--dim)" }}>
                {c.purpose}
              </span>
              <span className={styles.pathTag}>
                {`${c.fixtureOf}${c.records > 0 ? ` · ${c.records} records` : ""}`}
              </span>
            </span>
          </div>
        ))}
      </div>
    </Panel>
  )
}
