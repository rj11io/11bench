"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NativeSelect } from "@/components/ui/native-select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TooltipProvider } from "@/components/ui/tooltip"

import { SEED_ORGS, SNAPSHOTS } from "../lib/seed"
import { ratio, stamp, usdShort } from "../lib/format"
import type { ViewId } from "../lib/store"
import { resetDemo, setState, useAppState } from "../lib/store"
import css from "../waterline.module.css"
import { Label, Mono, VerdictTag } from "./bits"
import { buildCtx } from "./ctx"
import { HoldingsView } from "./views/holdings"
import { LogView } from "./views/log"
import { PlanView } from "./views/plan"
import { PolicyView } from "./views/policy"
import { ReadinessView } from "./views/readiness"
import { StressView } from "./views/stress"

const NAV: { id: ViewId; name: string; hint: string }[] = [
  { id: "readiness", name: "Readiness", hint: "Can we cover it?" },
  { id: "holdings", name: "Holdings", hint: "What holds it back?" },
  { id: "stress", name: "Stress", hint: "What breaks it?" },
  { id: "plan", name: "Plan", hint: "What do we do?" },
  { id: "policy", name: "Policy", hint: "What are our rules?" },
  { id: "log", name: "Log", hint: "What did we decide?" },
]

export function WaterlineApp() {
  const state = useAppState()
  const ctx = React.useMemo(() => buildCtx(state), [state])
  const go = React.useCallback((v: ViewId) => setState({ view: v }), [])

  const staleCount = ctx.sources.filter((s) => s.stale).length

  return (
    <TooltipProvider delay={120}>
      <div className={`${css.tokens} ${css.app}`} data-density={state.density}>
        <header className={css.header}>
          <div className={css.brand}>
            <span className={css.brandGlyph} aria-hidden="true">
              ≈
            </span>
            <span>Waterline</span>
          </div>

          <NativeSelect
            aria-label="Workspace"
            value={state.orgId}
            onChange={(e) =>
              setState({ orgId: e.currentTarget.value, view: "readiness", scenarioId: "base" })
            }
            className="h-8 w-auto text-xs"
          >
            {SEED_ORGS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </NativeSelect>

          <span className={css.demoBadge} title="Nothing in this product is live.">
            Seeded demo data
          </span>

          <div className={css.headerSpacer} />

          <NativeSelect
            aria-label="Market snapshot"
            value={state.snapshotId}
            onChange={(e) =>
              setState({ snapshotId: e.currentTarget.value as "calm" | "stressed" })
            }
            className="h-8 w-auto text-xs"
          >
            {SNAPSHOTS.map((s) => (
              <option key={s.id} value={s.id}>
                {`${s.label} (seeded)`}
              </option>
            ))}
          </NativeSelect>

          <Popover>
            <PopoverTrigger
              render={
                <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-normal" />
              }
            >
              <span
                className={css.dot}
                style={{
                  background: staleCount > 0 ? "var(--wl-latency)" : "var(--wl-surplus)",
                  borderRadius: "50%",
                }}
                aria-hidden="true"
              />
              <span className={css.mono}>{stamp(ctx.snapshot.asOf)}</span>
              {staleCount > 0 && <Badge variant="destructive">{`${staleCount} stale`}</Badge>}
            </PopoverTrigger>
            <PopoverContent className={`${css.tokens} w-[22rem] max-w-[92vw]`} align="end">
              <div>
                <Label>Data health</Label>
                <p style={{ margin: "0.3125rem 0 0.5rem", fontSize: "0.6875rem", lineHeight: 1.55, color: "var(--color-muted-foreground)" }}>
                  {ctx.snapshot.note}
                </p>
                <div style={{ maxHeight: "17rem", overflowY: "auto" }}>
                  {ctx.sources.map((s) => (
                    <div
                      key={s.key}
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        padding: "0.3125rem 0",
                        borderBottom: "1px solid var(--wl-hair)",
                        fontSize: "0.6875rem",
                        opacity: s.stale ? 0.85 : 1,
                      }}
                    >
                      <span style={{ minWidth: 0, textDecoration: s.stale ? "line-through" : undefined }}>
                        {s.label}
                        <span style={{ display: "block", color: "var(--color-muted-foreground)" }}>
                          {s.scope}
                        </span>
                      </span>
                      <span style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                        <Mono style={{ color: s.stale ? "var(--wl-latency)" : undefined }}>
                          {s.ageMins < 1
                            ? "current"
                            : s.ageMins < 60
                              ? `${Math.round(s.ageMins)} min old`
                              : `${(s.ageMins / 60).toFixed(1)} h old`}
                        </Mono>
                        <span style={{ display: "block", color: "var(--color-muted-foreground)" }}>
                          {s.stale ? "past its refresh" : "within refresh"}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                {staleCount > 0 && (
                  <p style={{ marginTop: "0.5rem", fontSize: "0.6875rem", lineHeight: 1.55, color: "var(--wl-latency)" }}>
                    A source older than its expected refresh is treated as degraded rather than
                    trusted. The plan builder will ask for an explicit acknowledgement before it
                    produces an approval on inputs like these.
                  </p>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs font-normal"
            onClick={() =>
              setState({ density: state.density === "compact" ? "comfortable" : "compact" })
            }
          >
            {state.density === "compact" ? "Comfortable" : "Compact"}
          </Button>
        </header>

        {/* Mobile navigation */}
        <nav className={css.tabs} aria-label="Sections">
          {NAV.map((n) => (
            <button
              key={n.id}
              type="button"
              className={css.tab}
              data-active={state.view === n.id ? "true" : undefined}
              aria-current={state.view === n.id ? "page" : undefined}
              onClick={() => go(n.id)}
            >
              {n.name}
            </button>
          ))}
        </nav>

        <div className={css.shell}>
          <nav className={css.rail} aria-label="Sections">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                className={css.railItem}
                aria-label={`${n.name} — ${n.hint}`}
                data-active={state.view === n.id ? "true" : undefined}
                aria-current={state.view === n.id ? "page" : undefined}
                onClick={() => go(n.id)}
              >
                <span className={css.railName}>
                  {n.name}
                  {n.id === "readiness" && !ctx.empty && !ctx.needsObligations && (
                    <VerdictTag verdict={ctx.verdict} />
                  )}
                  {n.id === "plan" && ctx.selected.length > 0 && (
                    <Badge variant="secondary">{ctx.selected.length}</Badge>
                  )}
                </span>
                <span className={css.railHint}>{n.hint}</span>
              </button>
            ))}

            <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
              <Label>Workspace</Label>
              <p style={{ margin: "0.3125rem 0 0", fontSize: "0.6875rem", lineHeight: 1.55, color: "var(--color-muted-foreground)" }}>
                {ctx.org.kind}
                <br />
                <Mono>{ctx.org.safe}</Mono>
                <br />
                {ctx.org.signers}
              </p>
              {!ctx.empty && (
                <p style={{ margin: "0.5rem 0 0", fontSize: "0.6875rem", lineHeight: 1.55, color: "var(--color-muted-foreground)" }}>
                  {`Mark ${usdShort(ctx.markTotal)} · realisable ${usdShort(ctx.coverage.totalAvailable)} · coverage ${ratio(ctx.coverage.minRatio)}`}
                </p>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 h-7 px-2 text-[0.6875rem] font-normal"
                onClick={resetDemo}
              >
                Reset the demo
              </Button>
            </div>
          </nav>

          <main className={css.main}>
            <PageHead ctx={ctx} />
            {state.view === "readiness" && <ReadinessView ctx={ctx} go={go} />}
            {state.view === "holdings" && <HoldingsView ctx={ctx} />}
            {state.view === "stress" && <StressView ctx={ctx} go={go} />}
            {state.view === "plan" && <PlanView ctx={ctx} />}
            {state.view === "policy" && <PolicyView ctx={ctx} />}
            {state.view === "log" && <LogView ctx={ctx} />}

            <footer className={css.footer}>
              <p>
                <strong>Waterline is a demo.</strong> Every organisation, token, venue, balance,
                order book and counterparty on this page is invented. No price is live, no balance
                is read from a chain, no wallet is connected and nothing updates. The product holds
                no keys and cannot submit a transaction — by design, not by omission.
              </p>
              <p style={{ marginTop: "0.5rem" }}>
                Settlement times, order-book shapes, the health-factor formula, the reserve
                disclosure cycle and the stress magnitudes are modelled on primary documentation and
                reported events, cited in <Mono>research.md</Mono> alongside this route.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}

function PageHead({ ctx }: { ctx: ReturnType<typeof buildCtx> }) {
  const nav = NAV.find((n) => n.id === ctx.view)
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "baseline" }}>
        <h1 style={{ fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.015em" }}>
          {nav?.name}
        </h1>
        <span style={{ fontSize: "0.75rem", color: "var(--color-muted-foreground)" }}>
          {nav?.hint}
        </span>
        {ctx.snapshot.id === "stressed" && (
          <Badge variant="destructive">stressed snapshot · seeded</Badge>
        )}
      </div>
      <p style={{ margin: "0.25rem 0 0", fontSize: "0.75rem", color: "var(--color-muted-foreground)", maxWidth: "78ch", lineHeight: 1.55 }}>
        {ctx.org.name} · treasury liquidity assurance · mark value says what you own, this says what
        you can spend and when.
      </p>
    </div>
  )
}
