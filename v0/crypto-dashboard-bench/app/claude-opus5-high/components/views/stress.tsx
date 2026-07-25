"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { computeCoverage, runPolicy, timeToCashLadder } from "../../lib/engine"
import { SCENARIOS, applyScenario, scenarioById } from "../../lib/seed"
import { ratio, usdShort } from "../../lib/format"
import type { ViewId } from "../../lib/store"
import { setState } from "../../lib/store"
import css from "../../waterline.module.css"
import { ChartSummary, Legend, Mono, Note, Panel, Stat, VerdictTag } from "../bits"
import { CushionChart } from "../charts"
import type { Ctx } from "../ctx"
import { TimeToCashLadder } from "../ladder"

export function StressView({ ctx, go }: { ctx: Ctx; go: (v: ViewId) => void }) {
  const { state, policy } = ctx

  const primary = scenarioById(state.scenarioId)
  const compare = scenarioById(state.compareScenarioId)

  const run = React.useCallback(
    (id: string) => {
      const def = scenarioById(id)
      const org = applyScenario(ctx.org, def)
      const cov = computeCoverage(org, "calm", policy, [])
      return {
        def,
        org,
        cov,
        checks: runPolicy(org, "calm", policy, cov, []),
        ladder: timeToCashLadder(org, "calm", policy, cov),
      }
    },
    [ctx.org, policy]
  )

  const a = React.useMemo(() => run(primary.id), [run, primary.id])
  const b = React.useMemo(() => run(compare.id), [run, compare.id])
  const base = React.useMemo(() => run("base"), [run])

  if (ctx.empty || ctx.needsObligations) {
    return (
      <Panel title="Nothing to stress yet">
        <Note>
          Scenarios run against the same engine as the main view, so they need holdings and
          committed spend first. Finish setting up the workspace on the Readiness tab.
        </Note>
      </Panel>
    )
  }

  const worseThanBase = a.cov.totalAvailable - base.cov.totalAvailable
  const failA = a.checks.filter((c) => c.verdict !== "pass")

  return (
    <div className={css.grid} style={{ gap: "var(--wl-gap)" }}>
      <Panel
        title="Scenarios"
        subtitle="Each scenario layers shocks onto a seeded snapshot and re-runs the whole engine. Magnitudes come from events that actually happened, and each one links to the reporting it is taken from."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {SCENARIOS.map((s) => {
            const on = s.id === primary.id
            const isCompare = s.id === compare.id
            return (
              <div
                key={s.id}
                className={css.actionRow}
                data-on={on ? "true" : undefined}
                style={{ cursor: "default" }}
              >
                <button
                  type="button"
                  className={css.tick}
                  onClick={() => setState({ scenarioId: s.id })}
                  aria-label={`Run ${s.name}`}
                  aria-pressed={on}
                  style={{ cursor: "pointer" }}
                >
                  {on ? "●" : ""}
                </button>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", alignItems: "baseline" }}>
                    <strong style={{ fontSize: "0.8125rem" }}>{s.name}</strong>
                    {isCompare && <Badge variant="outline">comparison</Badge>}
                  </div>
                  <p style={{ margin: "0.1875rem 0 0", fontSize: "0.75rem", lineHeight: 1.55 }}>
                    {s.summary}
                  </p>
                  <p style={{ margin: "0.25rem 0 0", fontSize: "0.6875rem", lineHeight: 1.55, color: "var(--color-muted-foreground)" }}>
                    {s.anchorUrl ? (
                      <a className={css.linkish} href={s.anchorUrl} target="_blank" rel="noreferrer noopener">
                        {s.anchor}
                      </a>
                    ) : (
                      s.anchor
                    )}
                  </p>
                </div>
                <div className={css.actionCost} style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-end" }}>
                  {!on && (
                    <Button size="sm" variant="outline" onClick={() => setState({ scenarioId: s.id })}>
                      Run
                    </Button>
                  )}
                  {!isCompare && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setState({ compareScenarioId: s.id })}
                    >
                      Compare
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Panel>

      <div className={css.statGrid}>
        <Stat
          label="Coverage under this scenario"
          tone={a.cov.minRatio >= policy.minCoverageRatio ? "surplus" : "breach"}
          value={ratio(a.cov.minRatio)}
          note={`Base case ${ratio(base.cov.minRatio)} · floor ${ratio(policy.minCoverageRatio)}`}
        />
        <Stat
          label="Cash runs short"
          tone={a.cov.firstBreachMonth !== null ? "breach" : "surplus"}
          value={
            a.cov.firstBreachMonth !== null ? a.cov.months[a.cov.firstBreachMonth] : "not in 12 mo"
          }
          note={
            base.cov.firstBreachMonth !== null
              ? `Base case ${base.cov.months[base.cov.firstBreachMonth]}`
              : "Base case holds all 12 months"
          }
        />
        <Stat
          label="Realisable value"
          tone="liquid"
          value={usdShort(a.cov.totalAvailable)}
          note={`${usdShort(worseThanBase)} against the base case`}
        />
        <Stat
          label="Worst shortfall"
          tone={a.cov.worstShortfallUsd > 0 ? "breach" : "surplus"}
          value={usdShort(a.cov.worstShortfallUsd)}
          note={`Buffer ${a.cov.bufferMonths.toFixed(1)} months against a ${policy.minBufferMonths.toFixed(0)}-month floor`}
        />
      </div>

      <Panel
        title="Two scenarios, one set of axes"
        subtitle={`Solid line: ${primary.name}. Dashed line: ${compare.name}. Both are cumulative cash raisable less cash owed.`}
      >
        <ChartSummary>
          {`Under ${primary.name}, the liquidity cushion ends at ${usdShort(a.cov.cushion[a.cov.cushion.length - 1])}. Under ${compare.name} it ends at ${usdShort(b.cov.cushion[b.cov.cushion.length - 1])}.`}
        </ChartSummary>
        <CushionChart cov={a.cov} compareCov={b.cov} compareLabel={compare.name} height={260} />
        <div style={{ marginTop: "0.5rem" }}>
          <Legend
            items={[
              { colour: "var(--wl-liquid)", label: primary.name },
              { colour: "var(--wl-modelled)", label: compare.name, dashed: true },
            ]}
          />
        </div>
      </Panel>

      <div className={`${css.grid} ${css.g12}`}>
        <div style={{ gridColumn: "span 7" }}>
          <Panel
            title="Where the money moves to"
            subtitle="The same ladder, recomputed under this scenario. Watch holdings change bucket as queues stretch."
          >
            <TimeToCashLadder rows={a.ladder} />
          </Panel>
        </div>
        <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "var(--wl-gap)" }}>
          <Panel
            title="Policy under this scenario"
            subtitle={
              failA.length === 0
                ? "Every rule still passes."
                : `${failA.length} rule${failA.length === 1 ? "" : "s"} stop passing.`
            }
          >
            {a.checks.map((c) => (
              <div key={c.id} className={css.checkRow}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 500 }}>{c.rule}</div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--color-muted-foreground)" }}>
                    <Mono>{c.actual}</Mono>
                    {" against "}
                    <Mono>{c.limit}</Mono>
                  </div>
                </div>
                <VerdictTag verdict={c.verdict} />
              </div>
            ))}
          </Panel>

          <Panel title="What this tells you">
            <Note kind={a.cov.worstShortfallUsd > 0 ? "danger" : "info"}>
              {a.cov.worstShortfallUsd > 0 ? (
                <>
                  {`This scenario opens a ${usdShort(a.cov.worstShortfallUsd)} hole, ${usdShort(a.cov.worstShortfallUsd - base.cov.worstShortfallUsd)} wider than the base case. `}
                  Every lever that closes it takes time to work, which is the argument for acting
                  before the scenario happens rather than during it.
                </>
              ) : (
                "Coverage survives this scenario without action. That is worth recording, because it is the case a council will ask about."
              )}
            </Note>
            <div style={{ marginTop: "0.625rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <Button size="sm" onClick={() => go("plan")}>
                Build a plan
              </Button>
              <Button size="sm" variant="outline" onClick={() => setState({ scenarioId: "base" })}>
                Back to base case
              </Button>
            </div>
          </Panel>
        </div>
      </div>

      <Note>
        <strong>What a scenario is not.</strong> These are not forecasts and they carry no
        probability. Each one is a question of the form &ldquo;if this happened again, would we
        cope?&rdquo;, with the magnitude taken from the last time something like it did. The
        stressed order books are thinner by design, because quoted liquidity is exactly what
        disappears when it is needed —
        {" "}
        <a
          className={css.linkish}
          href="https://www.kaiko.com/resources/moving-markets-liquidity-and-large-sell-orders"
          target="_blank"
          rel="noreferrer noopener"
        >
          slippage on major venues tripled within hours on 5 August 2024
        </a>
        . Every number here remains seeded demo data.
      </Note>
    </div>
  )
}
