"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

import type { Policy } from "../../lib/engine"
import { capacityFor, tradableRoutes } from "../../lib/engine"
import { bps, days, pct, ratio as fmtRatio, usdShort } from "../../lib/format"
import { appendLog, setPolicy } from "../../lib/store"
import css from "../../waterline.module.css"
import { Label, Mono, Note, Panel, Stat, VerdictTag } from "../bits"
import type { Ctx } from "../ctx"

interface Knob {
  key: keyof Policy
  label: string
  help: string
  min: number
  max: number
  step: number
  format: (v: number) => string
  enforcement: "safe-guard" | "safe-allowance" | "advisory"
}

const KNOBS: Knob[] = [
  {
    key: "maxSlippageBps",
    label: "Slippage cap per slice",
    help: "The most price the treasury will give up on any single slice of an order. Tighter means smaller slices and a longer programme.",
    min: 10,
    max: 400,
    step: 5,
    format: (v) => bps(v),
    enforcement: "safe-guard",
  },
  {
    key: "maxAdvParticipationPct",
    label: "Share of daily volume",
    help: "How much of a venue's average daily volume the treasury is willing to be, per day. This is usually the rule that decides how fast a large position can be reduced.",
    min: 1,
    max: 25,
    step: 1,
    format: (v) => pct(v, 0),
    enforcement: "safe-allowance",
  },
  {
    key: "minCoverageRatio",
    label: "Coverage floor",
    help: "The minimum ratio of realisable cash to committed spend, at the tightest month of the horizon.",
    min: 1,
    max: 2,
    step: 0.05,
    format: (v) => fmtRatio(v),
    enforcement: "advisory",
  },
  {
    key: "minBufferMonths",
    label: "Operating buffer",
    help: "Months of average committed spend that must be reachable inside the buffer window.",
    min: 1,
    max: 18,
    step: 0.5,
    format: (v) => `${v.toFixed(1)} months`,
    enforcement: "advisory",
  },
  {
    key: "bufferDays",
    label: "Buffer window",
    help: "How many days count as 'reachable' for the buffer test. Shorter is stricter.",
    min: 1,
    max: 60,
    step: 1,
    format: (v) => days(v),
    enforcement: "advisory",
  },
  {
    key: "minHealthFactor",
    label: "Health-factor floor",
    help: "How far above the liquidation line pledged collateral must stay. Liquidation begins at 1.00, so anything near it is not a floor, it is a hope.",
    min: 1.05,
    max: 3,
    step: 0.05,
    format: (v) => v.toFixed(2),
    enforcement: "safe-guard",
  },
  {
    key: "maxNativePct",
    label: "Native token family limit",
    help: "Share of treasury mark value allowed in the token the organisation issued, counting staked and pooled units.",
    min: 10,
    max: 90,
    step: 5,
    format: (v) => pct(v, 0),
    enforcement: "advisory",
  },
  {
    key: "maxSingleAssetPct",
    label: "Single asset limit",
    help: "Share of treasury mark value allowed in any one other asset.",
    min: 5,
    max: 60,
    step: 5,
    format: (v) => pct(v, 0),
    enforcement: "advisory",
  },
  {
    key: "maxLowDisclosureStablePct",
    label: "Stablecoins without a monthly attested reserve report",
    help: "Both the US GENIUS Act and MiCA require permitted issuers to publish reserve composition monthly, examined by an accounting firm. Holdings from issuers that do not are capped.",
    min: 0,
    max: 20,
    step: 1,
    format: (v) => pct(v, 0),
    enforcement: "advisory",
  },
  {
    key: "twapSlicesPerDay",
    label: "Slices per day",
    help: "How many times a day an order is worked. More slices means smaller slices and less impact each time, at the cost of operational effort.",
    min: 1,
    max: 24,
    step: 1,
    format: (v) => `${v.toFixed(0)} per day`,
    enforcement: "advisory",
  },
  {
    key: "dualApprovalAboveUsd",
    label: "Second approver required above",
    help: "Plans with on-chain notional above this need a second named approver who is not the author.",
    min: 250_000,
    max: 20_000_000,
    step: 250_000,
    format: (v) => usdShort(v),
    enforcement: "safe-guard",
  },
]

const ENFORCEMENT_COPY = {
  "safe-guard": "enforceable on-chain as a transaction guard",
  "safe-allowance": "enforceable on-chain as a spending allowance",
  advisory: "advisory — checked in this product only",
} as const

export function PolicyView({ ctx }: { ctx: Ctx }) {
  const { policy, org, snapshot, coverage } = ctx

  const nativePool = org.holdings.filter((h) => h.capacityGroup)
  const cap = nativePool.length > 0 ? capacityFor(nativePool, snapshot.id, policy) : null
  const routes = tradableRoutes(nativePool)

  return (
    <div className={css.grid} style={{ gap: "var(--wl-gap)" }}>
      <div className={css.statGrid}>
        <Stat
          label="Coverage under these rules"
          tone={coverage.minRatio >= policy.minCoverageRatio ? "surplus" : "breach"}
          value={fmtRatio(coverage.minRatio)}
          note={`Floor ${fmtRatio(policy.minCoverageRatio)}`}
        />
        {cap && (
          <>
            <Stat
              label="Native token capacity per month"
              tone="liquid"
              value={usdShort(cap.perMonthUsd)}
              note={`Limited by the ${cap.binding === "participation" ? "participation" : "slippage"} cap, across ${routes.length} venue${routes.length === 1 ? "" : "s"}`}
            />
            <Stat
              label="Slice size"
              value={usdShort(cap.sliceUsd)}
              note={`${policy.twapSlicesPerDay} slices a day, each giving up about ${bps(cap.marginalBpsAtSlice, 1)} on its last unit`}
            />
          </>
        )}
        <Stat
          label="Rules passing"
          tone={ctx.verdict === "pass" ? "surplus" : ctx.verdict === "warn" ? "latency" : "breach"}
          value={`${ctx.checks.filter((c) => c.verdict === "pass").length}/${ctx.checks.length}`}
          note="Every rule re-evaluates as you move a control."
        />
      </div>

      <div className={`${css.grid} ${css.g12}`}>
        <div style={{ gridColumn: "span 7" }}>
          <Panel
            title="Guardrails"
            subtitle="Change any of these and every figure in the product moves with it. Each rule says whether it can actually be enforced on-chain, or whether it is only checked here — claiming otherwise would be the kind of thing a treasurer catches in the first meeting."
            aside={
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setPolicy(org.id, DEFAULTS)
                  appendLog({
                    orgId: org.id,
                    at: ctx.nowIso,
                    kind: "policy-changed",
                    title: "Policy reset to the default template",
                    body: "All guardrails returned to their starting values.",
                    evidence: [{ label: "Coverage after reset", value: fmtRatio(coverage.minRatio) }],
                    provenance: [{ label: "Snapshot", value: `${snapshot.label} (seeded)` }],
                    approver: "R. Adeyemi · Head of Treasury (demo persona)",
                  })
                }}
              >
                Reset to template
              </Button>
            }
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {KNOBS.map((k) => {
                const value = policy[k.key] as number
                const labelId = `wl-knob-${String(k.key)}`
                return (
                  <div key={String(k.key)} role="group" aria-labelledby={labelId}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "baseline", justifyContent: "space-between" }}>
                      <Label id={labelId}>{k.label}</Label>
                      <Mono style={{ fontWeight: 600, fontSize: "0.8125rem" }}>{k.format(value)}</Mono>
                    </div>
                    <div style={{ marginTop: "0.4375rem" }}>
                      <Slider
                        value={value}
                        min={k.min}
                        max={k.max}
                        step={k.step}
                        aria-labelledby={labelId}
                        onValueChange={(v) => {
                          const next = Array.isArray(v) ? v[0] : v
                          setPolicy(org.id, { [k.key]: next } as Partial<Policy>)
                        }}
                      />
                    </div>
                    <p style={{ margin: "0.375rem 0 0", fontSize: "0.6875rem", lineHeight: 1.55, color: "var(--color-muted-foreground)" }}>
                      {k.help}
                    </p>
                    <p style={{ margin: "0.1875rem 0 0", fontSize: "0.625rem" }}>
                      <Badge variant={k.enforcement === "advisory" ? "ghost" : "outline"}>
                        {ENFORCEMENT_COPY[k.enforcement]}
                      </Badge>
                    </p>
                  </div>
                )
              })}

              <div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ minWidth: 0 }}>
                    <Label>Off-market block sales permitted</Label>
                    <p style={{ margin: "0.25rem 0 0", fontSize: "0.6875rem", lineHeight: 1.55, color: "var(--color-muted-foreground)" }}>
                      Blocks trade away from the public book, so the price is negotiated rather than
                      observed. Allowing them means accepting a number nobody outside the deal can
                      check.
                    </p>
                  </div>
                  <Switch
                    checked={policy.allowOtc}
                    aria-label="Allow off-market block sales"
                    onCheckedChange={(checked) => setPolicy(org.id, { allowOtc: checked })}
                  />
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "var(--wl-gap)" }}>
          <Panel title="Rules, right now" aside={<VerdictTag verdict={ctx.verdict} />}>
            {ctx.checks.map((c) => (
              <div key={c.id} className={css.checkRow}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 500 }}>{c.rule}</div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--color-muted-foreground)", lineHeight: 1.5 }}>
                    {c.detail}
                  </div>
                  <div style={{ marginTop: "0.1875rem", fontSize: "0.6875rem" }}>
                    <Mono>{c.actual}</Mono>
                    {" against a limit of "}
                    <Mono>{c.limit}</Mono>
                  </div>
                </div>
                <VerdictTag verdict={c.verdict} />
              </div>
            ))}
          </Panel>

          <Panel title="Try this">
            <Note kind="info">
              Drag <strong>share of daily volume</strong> from {pct(policy.maxAdvParticipationPct, 0)} up
              to 12% and watch the native token&rsquo;s monthly capacity, the coverage figure and the
              cushion chart all move together. That is the trade at the heart of this product: speed
              is available, and it is not free.
            </Note>
            <Note kind="warn">
              Then drag the <strong>health-factor floor</strong> up. Withdrawable collateral falls
              immediately, because more of it is pinned by the debt. A floor of 1.05 looks generous
              until the collateral moves 5%.
            </Note>
          </Panel>
        </div>
      </div>

      <Note>
        Policy changes here are saved in this browser only, and apply to this seeded workspace. In
        production a policy change is a governed action: versioned, attributed, and recorded in the
        decision log — which is why resetting the template above writes a log entry.
      </Note>
    </div>
  )
}

const DEFAULTS: Partial<Policy> = {
  minCoverageRatio: 1.1,
  minBufferMonths: 6,
  bufferDays: 7,
  maxSingleAssetPct: 25,
  maxNativePct: 50,
  maxSlippageBps: 75,
  maxAdvParticipationPct: 6,
  minHealthFactor: 1.6,
  twapSlicesPerDay: 6,
  allowOtc: true,
  maxLowDisclosureStablePct: 2,
  dualApprovalAboveUsd: 2_000_000,
}
