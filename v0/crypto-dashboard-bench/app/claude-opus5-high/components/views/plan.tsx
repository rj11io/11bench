"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { computeCoverage, runPolicy, suggestPlan } from "../../lib/engine"
import { ratio, stamp, usdShort } from "../../lib/format"
import { appendLog, setSelectedActions, setState, toggleAction } from "../../lib/store"
import css from "../../waterline.module.css"
import { ChartSummary, Legend, Mono, Note, Panel, Stat, VerdictTag } from "../bits"
import { CushionChart } from "../charts"
import type { Ctx } from "../ctx"
import { SigningPacket } from "../signing-packet"

const KIND_LABEL: Record<string, string> = {
  otc_block: "off-market block",
  raise_participation: "policy exception",
  trim_spend: "reduce spend",
  defer_spend: "move a payment",
  switch_route: "change route",
  repay_debt: "repay debt",
}

export function PlanView({ ctx }: { ctx: Ctx }) {
  const [packetOpen, setPacketOpen] = React.useState(false)
  const { plan, policy, catalogue, selected, org, snapshot } = ctx

  const planChecks = React.useMemo(
    () => runPolicy(org, snapshot.id, policy, plan.after, selected),
    [org, snapshot.id, policy, plan.after, selected]
  )

  if (ctx.empty || ctx.needsObligations) {
    return (
      <Panel title="Nothing to plan against yet">
        <Note>
          A plan is a response to a shortfall, so the workspace needs holdings and committed spend
          first. Finish the setup on the Readiness tab.
        </Note>
      </Panel>
    )
  }

  const before = plan.before
  const after = plan.after
  const fixed = after.worstShortfallUsd <= 0
  const clearsFloor = after.minRatio >= policy.minCoverageRatio

  return (
    <div className={css.grid} style={{ gap: "var(--wl-gap)" }}>
      <div className={css.statGrid}>
        <Stat
          label="Coverage now"
          tone={before.minRatio >= policy.minCoverageRatio ? "surplus" : "breach"}
          value={ratio(before.minRatio)}
          note={
            before.firstBreachMonth !== null
              ? `Cash runs short in ${before.months[before.firstBreachMonth]}`
              : "No shortfall in the horizon"
          }
        />
        <Stat
          label="Coverage with this plan"
          tone={clearsFloor ? "surplus" : fixed ? "latency" : "breach"}
          value={ratio(after.minRatio)}
          note={
            selected.length === 0
              ? "No levers selected yet"
              : fixed
                ? clearsFloor
                  ? "Shortfall cleared and the policy floor is met"
                  : `Shortfall cleared, but still under the ${ratio(policy.minCoverageRatio)} floor`
                : `Shortfall still ${usdShort(after.worstShortfallUsd)}`
          }
        />
        <Stat
          label="Cost of the plan"
          tone="latency"
          value={usdShort(plan.costUsd)}
          note="Discounts, extra slippage and fees. Stated, never buried."
        />
        <Stat
          label="Cost per dollar recovered"
          value={plan.costPerDollar > 0 ? `$${plan.costPerDollar.toFixed(3)}` : "—"}
          note={
            plan.gapClosedUsd > 0
              ? `${usdShort(plan.gapClosedUsd)} of shortfall removed`
              : "Select levers to see the trade"
          }
        />
      </div>

      <div className={`${css.grid} ${css.g12}`}>
        <div style={{ gridColumn: "span 7" }}>
          <Panel
            title="Playbook"
            subtitle="Each lever states what it costs, whether it can be undone, and whose agreement it needs. Toggle any combination; everything on this page recalculates."
            aside={
              <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                <Button
                  size="sm"
                  onClick={() =>
                    setSelectedActions(
                      org.id,
                      suggestPlan(org, snapshot.id, policy, catalogue).map((a) => a.id)
                    )
                  }
                >
                  Suggest cheapest plan
                </Button>
                {selected.length > 0 && (
                  <Button size="sm" variant="ghost" onClick={() => setSelectedActions(org.id, [])}>
                    Clear
                  </Button>
                )}
              </div>
            }
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {catalogue.map((a) => {
                const on = selected.some((s) => s.id === a.id)
                return (
                  <button
                    type="button"
                    key={a.id}
                    className={css.actionRow}
                    data-on={on ? "true" : undefined}
                    onClick={() => toggleAction(org.id, a.id)}
                    aria-pressed={on}
                  >
                    <span className={css.tick} aria-hidden="true">
                      {on ? "✓" : ""}
                    </span>
                    <span style={{ minWidth: 0, display: "block" }}>
                      <span style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", alignItems: "baseline" }}>
                        <strong style={{ fontSize: "0.8125rem" }}>{a.label}</strong>
                        <Badge variant="outline">{KIND_LABEL[a.kind] ?? a.kind}</Badge>
                        {!a.reversible && <Badge variant="destructive">not reversible</Badge>}
                      </span>
                      <span style={{ display: "block", margin: "0.25rem 0 0", fontSize: "0.75rem", lineHeight: 1.55, color: "var(--color-muted-foreground)" }}>
                        {a.rationale}
                      </span>
                      {a.policyNote && (
                        <span style={{ display: "block", marginTop: "0.25rem", fontSize: "0.6875rem", lineHeight: 1.5, color: "var(--wl-latency)" }}>
                          {a.policyNote}
                        </span>
                      )}
                      {a.requiresConsentFrom && (
                        <span style={{ display: "block", marginTop: "0.1875rem", fontSize: "0.6875rem", color: "var(--color-muted-foreground)" }}>
                          {`Needs: ${a.requiresConsentFrom}`}
                        </span>
                      )}
                    </span>
                    <span className={css.actionCost} style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <Mono style={{ fontWeight: 600, color: a.costUsd > 0 ? "var(--wl-latency)" : "var(--wl-surplus)" }}>
                        {a.costUsd > 0 ? usdShort(a.costUsd) : "no cost"}
                      </Mono>
                    </span>
                  </button>
                )
              })}
            </div>
          </Panel>
        </div>

        <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "var(--wl-gap)" }}>
          <Panel
            title="Before and after"
            subtitle="Solid line is the plan. Dashed line is the treasury without it."
          >
            <ChartSummary>
              {`Without the plan the cushion ends at ${usdShort(before.cushion[before.cushion.length - 1])}. With it, ${usdShort(after.cushion[after.cushion.length - 1])}.`}
            </ChartSummary>
            <CushionChart cov={after} compareCov={before} compareLabel="without the plan" height={210} />
            <div style={{ marginTop: "0.5rem" }}>
              <Legend
                items={[
                  { colour: "var(--wl-liquid)", label: "with the plan" },
                  { colour: "var(--wl-modelled)", label: "without it", dashed: true },
                ]}
              />
            </div>
          </Panel>

          <Panel
            title="Policy check"
            aside={<VerdictTag verdict={worst(planChecks)} />}
            subtitle="Runs before anyone is asked to approve anything."
          >
            {planChecks.map((c) => (
              <div key={c.id} className={css.checkRow}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 500 }}>{c.rule}</div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--color-muted-foreground)" }}>
                    <Mono>{c.actual}</Mono>
                    {" against "}
                    <Mono>{c.limit}</Mono>
                    {c.enforcement !== "advisory" ? " · enforceable on-chain" : " · advisory"}
                  </div>
                </div>
                <VerdictTag verdict={c.verdict} />
              </div>
            ))}
            <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <Button size="sm" disabled={selected.length === 0} onClick={() => setPacketOpen(true)}>
                Prepare signing packet
              </Button>
            </div>
            {selected.length === 0 && (
              <p style={{ marginTop: "0.5rem", fontSize: "0.6875rem", color: "var(--color-muted-foreground)" }}>
                Select at least one lever first.
              </p>
            )}
          </Panel>
        </div>
      </div>

      {selected.length > 0 && (
        <Panel
          title="What each lever contributes"
          subtitle="Marginal effect, measured by removing that one lever from the plan and re-running the engine."
        >
          <div className={css.tableWrap}>
            <table className={css.dataTable}>
              <thead>
                <tr>
                  <th>Lever</th>
                  <th data-align="right">Cost</th>
                  <th data-align="right">Coverage without it</th>
                  <th data-align="right">Shortfall without it</th>
                  <th>Reversible</th>
                </tr>
              </thead>
              <tbody>
                {selected.map((a) => {
                  const withoutIds = selected.filter((s) => s.id !== a.id)
                  const without = ctxRecompute(ctx, withoutIds.map((s) => s.id))
                  return (
                    <tr key={a.id}>
                      <td style={{ whiteSpace: "normal", maxWidth: "22rem" }}>{a.label}</td>
                      <td data-align="right" className={css.mono}>
                        {a.costUsd > 0 ? usdShort(a.costUsd) : "—"}
                      </td>
                      <td data-align="right" className={css.mono}>
                        {ratio(without.minRatio)}
                      </td>
                      <td
                        data-align="right"
                        className={css.mono}
                        style={{ color: without.worstShortfallUsd > 0 ? "var(--wl-breach)" : undefined }}
                      >
                        {usdShort(without.worstShortfallUsd)}
                      </td>
                      <td>{a.reversible ? "yes" : "no"}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Panel>
      )}

      <Note>
        <strong>These are consequences, not advice.</strong> Every lever is modelled against the
        treasury&rsquo;s own policy limits and its own committed spend. Waterline does not recommend
        buying or selling anything, and cannot execute any of it. Large sell programmes are modelled
        as work spread over days rather than single trades, following the standard practice of
        splitting an order so the market has time to recover —{" "}
        <a
          className={css.linkish}
          href="https://docs.cow.fi/cow-protocol/tutorials/cow-swap/twap"
          target="_blank"
          rel="noreferrer noopener"
        >
          for example, $1m over three hours in six parts
        </a>
        .
      </Note>

      <SigningPacket
        open={packetOpen}
        onOpenChange={setPacketOpen}
        plan={plan}
        checks={planChecks}
        policy={policy}
        approver="R. Adeyemi · Head of Treasury (demo persona)"
        nowIso={ctx.nowIso}
        degraded={ctx.degraded}
        onApprove={(second) => {
          appendLog({
            orgId: org.id,
            at: ctx.nowIso,
            kind: "plan-approved",
            title: `De-risking plan approved · ${selected.length} lever${selected.length === 1 ? "" : "s"}`,
            body:
              `Approved on the ${snapshot.label.toLowerCase()} snapshot. Levers: ` +
              selected.map((a) => a.label).join("; ") +
              ".",
            evidence: [
              { label: "Coverage before", value: ratio(before.minRatio) },
              { label: "Coverage after", value: ratio(after.minRatio) },
              {
                label: "First shortfall before",
                value:
                  before.firstBreachMonth !== null
                    ? before.months[before.firstBreachMonth]
                    : "none in horizon",
              },
              {
                label: "First shortfall after",
                value:
                  after.firstBreachMonth !== null
                    ? after.months[after.firstBreachMonth]
                    : "none in horizon",
              },
              { label: "Shortfall closed", value: usdShort(plan.gapClosedUsd) },
              { label: "Cost", value: usdShort(plan.costUsd) },
              { label: "Mark value at decision", value: usdShort(ctx.markTotal) },
              { label: "Realisable with the plan", value: usdShort(after.totalAvailable) },
            ],
            provenance: [
              { label: "Snapshot", value: `${snapshot.label} (seeded), as of ${stamp(snapshot.asOf)}` },
              { label: "Slippage cap", value: `${policy.maxSlippageBps} bps per slice` },
              { label: "Participation cap", value: `${policy.maxAdvParticipationPct}% of daily volume` },
              { label: "Health-factor floor", value: policy.minHealthFactor.toFixed(2) },
              {
                label: "Data health",
                value: ctx.degraded
                  ? "one or more sources older than their expected refresh — acknowledged"
                  : "all sources within their expected refresh",
              },
            ],
            approver: "R. Adeyemi · Head of Treasury (demo persona)",
            secondApprover: second,
          })
          setPacketOpen(false)
          setState({ view: "log" })
        }}
      />
    </div>
  )
}

function worst(checks: { verdict: "pass" | "warn" | "fail" }[]) {
  if (checks.some((c) => c.verdict === "fail")) return "fail" as const
  if (checks.some((c) => c.verdict === "warn")) return "warn" as const
  return "pass" as const
}

/** Re-run coverage with a different set of selected levers, so each lever's
 *  marginal contribution is measured rather than asserted. */
function ctxRecompute(ctx: Ctx, ids: string[]) {
  const actions = ctx.catalogue.filter((a) => ids.includes(a.id))
  return computeCoverage(ctx.org, ctx.snapshot.id, ctx.policy, actions)
}
