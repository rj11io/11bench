"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

import { computeCoverage } from "../../lib/engine"
import { days, pct, ratio, stamp, usdShort } from "../../lib/format"
import type { ViewId } from "../../lib/store"
import { setOnboarding, setState } from "../../lib/store"
import css from "../../waterline.module.css"
import { ChartSummary, Label, Legend, Meter, Mono, Note, Panel, Prov, Stat, VerdictTag } from "../bits"
import { CushionChart, SupplyStack, supplyLegend } from "../charts"
import type { Ctx } from "../ctx"
import { TimeToCashLadder } from "../ladder"

export function ReadinessView({ ctx, go }: { ctx: Ctx; go: (v: ViewId) => void }) {
  if (ctx.empty) return <Onboarding ctx={ctx} step={1} />
  if (ctx.needsObligations) return <Onboarding ctx={ctx} step={2} />

  const { coverage: cov, policy, snapshot, markTotal } = ctx
  const breach = cov.firstBreachMonth
  const breachMonth = breach !== null ? cov.months[breach] : null
  const covered = cov.minRatio >= policy.minCoverageRatio
  const haircut = markTotal > 0 ? (1 - cov.totalAvailable / markTotal) * 100 : 0

  // The same treasury read against the other snapshot, so "what changed" is
  // answerable without leaving the page.
  const other = snapshot.id === "calm" ? "stressed" : "calm"
  const otherCov = computeCoverage(ctx.org, other, policy, [])

  const failing = ctx.checks.filter((c) => c.verdict !== "pass")

  return (
    <div className={css.grid} style={{ gap: "var(--wl-gap)" }}>
      {/* ---------------------------------------------------- the answer */}
      <div className={`${css.grid} ${css.g12}`}>
        <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "var(--wl-gap)" }}>
          <Panel>
            <Label>Realisable coverage · tightest month in the next 12</Label>
            <div
              className={css.hero}
              style={{ color: covered ? "var(--wl-surplus)" : "var(--wl-breach)", marginTop: "0.375rem" }}
            >
              {ratio(cov.minRatio)}
            </div>
            <p style={{ marginTop: "0.5rem", fontSize: "0.8125rem", lineHeight: 1.55 }}>
              {covered ? (
                <>
                  Committed spend is covered by cash the treasury can actually raise, with the
                  tightest point in <strong>{cov.months[cov.minRatioMonth]}</strong>.
                </>
              ) : (
                <>
                  Committed spend is <strong>not</strong> covered. Cash runs short in{" "}
                  <strong style={{ color: "var(--wl-breach)" }}>{breachMonth}</strong>, and the
                  worst gap is <strong>{usdShort(cov.worstShortfallUsd)}</strong>.
                </>
              )}
            </p>
            <div style={{ marginTop: "0.75rem" }}>
              <Meter
                value={Math.min(cov.minRatio, 2)}
                max={2}
                limit={policy.minCoverageRatio}
                breach={!covered}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.3125rem", fontSize: "0.625rem", color: "var(--color-muted-foreground)" }}>
                <span>0×</span>
                <span>{`policy floor ${ratio(policy.minCoverageRatio)}`}</span>
                <span>2×</span>
              </div>
            </div>
            <div style={{ marginTop: "0.875rem", display: "flex", flexWrap: "wrap", gap: "0.375rem", alignItems: "center" }}>
              <Prov
                tier="derived"
                source="Coverage engine"
                asOf={snapshot.asOf}
                method="Cumulative realisable cash divided by cumulative committed spend, month by month, on the seeded snapshot."
              />
              <span style={{ fontSize: "0.625rem", color: "var(--color-muted-foreground)" }}>
                {stamp(snapshot.asOf)}
              </span>
            </div>
            {!covered && (
              <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <Button size="sm" onClick={() => go("plan")}>
                  Build a plan
                </Button>
                <Button size="sm" variant="outline" onClick={() => go("holdings")}>
                  See what is holding it back
                </Button>
              </div>
            )}
          </Panel>

          <Panel
            title="Time to cash"
            subtitle="Treasury value grouped by how long it takes to become spendable. The hatched length is mark value; the solid length is what it converts to."
            aside={
              <Prov
                tier="derived"
                source="Settlement model"
                asOf={snapshot.asOf}
                method="Queue lengths, challenge windows and redemption cycles per holding, from protocol documentation. Restricted holdings use their lapse date."
              />
            }
          >
            <TimeToCashLadder rows={ctx.ladder} />
          </Panel>
        </div>

        <div style={{ gridColumn: "span 7" }}>
          <div className={css.statGrid}>
            <Stat
              label="Accounting mark"
              tone="mark"
              value={usdShort(markTotal)}
              note="Price × quantity, no size discount. This is the number a balance sheet reports, by rule."
            />
            <Stat
              label="Realisable in 12 months"
              tone="liquid"
              value={usdShort(cov.totalAvailable)}
              note={`What policy limits allow the treasury to convert. Effective haircut ${pct(haircut, 0)}.`}
            />
            <Stat
              label="Committed spend, 12 months"
              value={usdShort(cov.totalObligations)}
              note={`Average burn ${usdShort(cov.burnPerMonth)} a month.`}
            />
            <Stat
              label={`Buffer within ${days(policy.bufferDays)}`}
              tone={cov.bufferMonths >= policy.minBufferMonths ? "surplus" : "latency"}
              value={`${cov.bufferMonths.toFixed(1)} mo`}
              note={`Cash raisable inside the window, in months of burn. Floor ${policy.minBufferMonths.toFixed(0)} months.`}
            />
          </div>

          <div style={{ marginTop: "var(--wl-gap)" }}>
            <Panel
              title="Liquidity cushion by month"
              subtitle="Cash the treasury can raise, less cash it owes, cumulative. Above the line is surplus; below it, the treasury cannot pay from assets it can convert."
              aside={
                <Prov
                  tier="derived"
                  source="Coverage engine"
                  asOf={snapshot.asOf}
                  method="Deviation from zero. Realisable proceeds credited in the month they settle."
                />
              }
            >
              <ChartSummary>
                {`Liquidity cushion starts at ${usdShort(cov.cushion[0])} and ends at ${usdShort(cov.cushion[cov.cushion.length - 1])}. ` +
                  (breachMonth
                    ? `It crosses zero in ${breachMonth}, and the deepest shortfall is ${usdShort(cov.worstShortfallUsd)}.`
                    : "It stays positive across the whole horizon.")}
              </ChartSummary>
              <CushionChart cov={cov} height={306} />
              <div style={{ marginTop: "0.5rem" }}>
                <Legend
                  items={[
                    { colour: "var(--wl-liquid)", label: "surplus" },
                    { colour: "var(--wl-breach)", label: "shortfall" },
                  ]}
                />
              </div>
            </Panel>
          </div>
        </div>
      </div>

      {/* ------------------------------------------- what the other snapshot says */}
      <div className={css.deltaStrip}>
        <div>
          <Label>{`If the book were ${other === "stressed" ? "stressed" : "calm"} instead`}</Label>
          <div className={css.statValue} style={{ fontSize: "1rem" }}>
            {ratio(otherCov.minRatio)}
          </div>
          <div className={css.statNote}>
            {`vs ${ratio(cov.minRatio)} now · both seeded snapshots`}
          </div>
        </div>
        <div>
          <Label>Cash runs short</Label>
          <div className={css.statValue} style={{ fontSize: "1rem" }}>
            {otherCov.firstBreachMonth !== null ? otherCov.months[otherCov.firstBreachMonth] : "not in 12 months"}
          </div>
          <div className={css.statNote}>
            {breachMonth ? `vs ${breachMonth} now` : "vs not in 12 months now"}
          </div>
        </div>
        <div>
          <Label>Realisable value</Label>
          <div className={css.statValue} style={{ fontSize: "1rem" }}>
            {usdShort(otherCov.totalAvailable)}
          </div>
          <div className={css.statNote}>
            {`${usdShort(otherCov.totalAvailable - cov.totalAvailable)} against the current snapshot`}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setState({ snapshotId: other as "calm" | "stressed" })}
          >
            {`Switch to the ${other} book`}
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------- ladder + alerts */}
      <div className={`${css.grid} ${css.g12}`}>
        <div style={{ gridColumn: "span 7" }}>
          <Panel
            title="Where each month's cash comes from"
            subtitle="Realisable proceeds by source. A tall first column and short ones after it means the treasury is living on what it already holds in cash."
          >
            <ChartSummary>
              {cov.supply
                .slice(0, 5)
                .map((l) => `${l.symbol} contributes ${usdShort(l.totalUsd)} over the horizon.`)
                .join(" ")}
            </ChartSummary>
            <SupplyStack cov={cov} />
            <div style={{ marginTop: "0.5rem" }}>
              <Legend items={supplyLegend(cov)} />
            </div>
          </Panel>
        </div>

        <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "var(--wl-gap)" }}>
          <Panel
            title="What needs attention"
            subtitle={
              failing.length === 0
                ? "Every policy rule is passing on this snapshot."
                : `${failing.length} of ${ctx.checks.length} policy rules are not passing.`
            }
            aside={<VerdictTag verdict={ctx.verdict} />}
          >
            {failing.length === 0 ? (
              <Note>
                Nothing to act on. The checks still run on every change, so this is a statement
                about right now, not a permanent condition.
              </Note>
            ) : (
              <div>
                {failing.map((c) => (
                  <div key={c.id} className={css.checkRow}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 500 }}>{c.rule}</div>
                      <div style={{ fontSize: "0.6875rem", color: "var(--color-muted-foreground)" }}>
                        <Mono>{c.actual}</Mono>
                        {` against a limit of `}
                        <Mono>{c.limit}</Mono>
                      </div>
                    </div>
                    <VerdictTag verdict={c.verdict} />
                  </div>
                ))}
                <div style={{ marginTop: "0.625rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <Button size="sm" variant="outline" onClick={() => go("policy")}>
                    Review the rules
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => go("stress")}>
                    Stress it
                  </Button>
                </div>
              </div>
            )}
          </Panel>
        </div>
      </div>

      <Note>
        <strong>How to read this.</strong> The mark value is what the accounts report: price times
        quantity, with no discount for position size, because US fair-value rules forbid one. The
        realisable figure is what the treasury could convert inside its own policy limits — a
        slippage cap per slice, a cap on the share of daily volume it takes, and the days each asset
        needs to settle. The difference between the two is not an error in either number. It is the
        thing this product exists to show.
      </Note>
    </div>
  )
}

/* ---------------------------------------------------------------- empty state */

function Onboarding({ ctx, step }: { ctx: Ctx; step: 1 | 2 }) {
  const ob = ctx.state.onboarding[ctx.org.id] ?? {
    addressAdded: false,
    obligationsAdded: false,
    policyAdopted: false,
  }

  const steps = [
    {
      n: 1,
      title: "Add watched addresses",
      done: ob.addressAdded,
      body: "Paste an address or a Safe URL. Read-only: Waterline never asks for a key, a seed phrase or a signature, and there is no connect-wallet button anywhere in the product.",
      cta: "Add the demo address",
      act: () => setOnboarding(ctx.org.id, { addressAdded: true }),
    },
    {
      n: 2,
      title: "Import committed spend",
      done: ob.obligationsAdded,
      body: "Payroll, infrastructure, grants and any signed one-off commitments, with the month each falls due. This is the step that makes a coverage answer possible — without it, a dashboard can only show what you hold.",
      cta: "Import the demo schedule",
      act: () => setOnboarding(ctx.org.id, { obligationsAdded: true }),
    },
    {
      n: 3,
      title: "Adopt a policy",
      done: ob.policyAdopted,
      body: "Start from the default guardrails and adjust the two that matter most: the slippage cap per slice and the share of daily volume you are willing to take. Everything recalculates as you move them.",
      cta: "Adopt the default policy",
      act: () => setOnboarding(ctx.org.id, { policyAdopted: true }),
    },
  ]

  return (
    <div className={css.grid} style={{ gap: "var(--wl-gap)", maxWidth: "46rem" }}>
      <Panel
        title={`Set up ${ctx.org.name}`}
        subtitle="Three steps, no wallet connection, under a minute in this demo. Each step says what it does and what it will never do."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {steps.map((s) => (
            <div
              key={s.n}
              className={css.actionRow}
              data-on={s.done ? "true" : undefined}
              style={{ cursor: "default" }}
            >
              <span className={css.tick} aria-hidden="true">
                {s.done ? "✓" : s.n}
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "0.8125rem", fontWeight: 500 }}>{s.title}</div>
                <p style={{ margin: "0.1875rem 0 0", fontSize: "0.75rem", lineHeight: 1.55, color: "var(--color-muted-foreground)" }}>
                  {s.body}
                </p>
              </div>
              <div className={css.actionCost}>
                {s.done ? (
                  <span className={css.verdict} data-v="pass">
                    done
                  </span>
                ) : (
                  <Button size="sm" variant="outline" onClick={s.act}>
                    {s.cta}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Note kind={step === 2 ? "warn" : "info"}>
        {step === 1
          ? "Nothing is showing yet because there is nothing to show. A dashboard full of zeros would imply we had looked and found nothing."
          : "Holdings are in, but coverage stays locked until committed spend is imported. A coverage number without obligations would be arithmetic on an empty set, and we would rather say so than print a reassuring 0.00×."}
      </Note>

      <Panel title="What appears once this is done">
        <ul style={{ margin: 0, paddingLeft: "1rem", fontSize: "0.75rem", lineHeight: 1.7 }}>
          <li>A coverage figure for the next 12 months, and the month cash runs short.</li>
          <li>A time-to-cash ladder, so a 21-day exit queue never hides inside &ldquo;liquid assets&rdquo;.</li>
          <li>An exit-cost curve per holding, drawn from order-book depth.</li>
          <li>Stress scenarios anchored to events that actually happened.</li>
          <li>A costed de-risking plan, a policy check, and a decision log.</li>
        </ul>
      </Panel>
    </div>
  )
}
