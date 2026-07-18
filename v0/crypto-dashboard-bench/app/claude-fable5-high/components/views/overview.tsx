"use client"

import * as React from "react"
import {
  AlertTriangle,
  ArrowRight,
  CircleAlert,
  Info,
  Landmark,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { DEMO_CLOCK_LABEL, PRICE_FEED_ASOF, PRICE_FEED_SOURCE, treasuryHistory } from "../../lib/data"
import { fmtMonths, fmtPct, fmtUsd, fmtUsdFull } from "../../lib/format"
import { scenarioIsActive, useGlidepath } from "../../lib/store"
import { useVizPalette } from "../../lib/theme"
import type { Snapshot } from "../../lib/types"
import styles from "../../glidepath.module.css"
import { Delta, EmptyState, Provenance, SectionTitle, StatTile, StatusPill, LimitMeter } from "../bits"
import { AllocationBar, HistoryChart, ProjectionChart } from "../charts"

function Alerts({ snap }: { snap: Snapshot }) {
  const { scenario, setView } = useGlidepath()
  const { palette } = useVizPalette()

  const items: {
    id: string
    tone: "critical" | "warning" | "info"
    text: string
    action?: { label: string; onClick: () => void }
  }[] = []

  for (const r of snap.policyResults) {
    if (r.status === "fail") {
      items.push({
        id: `policy-${r.id}`,
        tone: "critical",
        text: `Policy breached — ${r.name}: ${r.detail}`,
        action: { label: "Plan a fix", onClick: () => setView("proposals") },
      })
    } else if (r.status === "warn") {
      items.push({
        id: `policy-${r.id}`,
        tone: "warning",
        text: `Near limit — ${r.name}: ${r.detail}`,
      })
    }
  }
  const staleFeeds = new Set(
    snap.rows.filter((r) => r.account.feed.stale).map((r) => r.account.name)
  )
  for (const name of staleFeeds) {
    items.push({
      id: `stale-${name}`,
      tone: "warning",
      text: `${name} balances are 35 minutes old (target: 15 min). Figures from this account may lag.`,
    })
  }
  if (scenarioIsActive(scenario)) {
    items.push({
      id: "scenario",
      tone: "info",
      text: "A stress scenario is applied — every figure on this page is repriced under it, not at seeded market prices.",
      action: { label: "Adjust scenario", onClick: () => setView("stress") },
    })
  }
  if (!items.length) return null

  const toneStyles = {
    critical: { color: palette.critical, icon: CircleAlert },
    warning: { color: palette.warning, icon: AlertTriangle },
    info: { color: palette.s1, icon: Info },
  } as const

  return (
    <div className="space-y-2" aria-label="Active alerts">
      {items.map((a) => {
        const t = toneStyles[a.tone]
        const Icon = t.icon
        return (
          <div
            key={a.id}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border px-3 py-2 text-sm"
            style={{
              borderColor: `color-mix(in oklch, ${t.color} 35%, transparent)`,
              backgroundColor: `color-mix(in oklch, ${t.color} 7%, transparent)`,
            }}
          >
            <Icon aria-hidden className="size-4 shrink-0" style={{ color: t.color }} />
            <span className="min-w-0 flex-1">{a.text}</span>
            {a.action ? (
              <Button size="xs" variant="outline" onClick={a.action.onClick}>
                {a.action.label}
                <ArrowRight aria-hidden data-icon="inline-end" />
              </Button>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export function OverviewView({ snap }: { snap: Snapshot }) {
  const { org, setView, seedFresh, scenario, policy } = useGlidepath()
  const history = React.useMemo(
    () => treasuryHistory(Math.round(snap.totalUsd)),
    [snap.totalUsd]
  )

  if (org.accounts.length === 0) {
    return (
      <EmptyState
        icon={Wallet}
        title="No custody accounts yet"
        body="Glidepath watches your existing wallets and exchange accounts read-only. Add one to see runway, policy checks, and stress tests. In this demo, one click loads a seeded sample."
        action={
          <Button onClick={seedFresh}>
            <Wallet aria-hidden data-icon="inline-start" />
            Load sample custody accounts (demo)
          </Button>
        }
      />
    )
  }

  const change24h =
    history.length > 1
      ? ((history[history.length - 1].value - history[history.length - 2].value) /
          history[history.length - 2].value) *
        100
      : 0
  const failing = snap.policyResults.filter((r) => r.status === "fail").length
  const warning = snap.policyResults.filter((r) => r.status === "warn").length

  return (
    <div className="space-y-4">
      <Alerts snap={snap} />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Runway hero */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Runway</CardTitle>
            <CardDescription>
              Spendable value (stablecoins + ETH + stETH; own token excluded) divided by
              monthly net burn of {fmtUsd(snap.burnMonthlyUsd)}
              {scenario.burnMultiplier !== 1 ? " (scenario-adjusted)" : ""}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div aria-live="polite" className="flex flex-wrap items-end gap-x-6 gap-y-2">
              <div>
                <div
                  className={cn(styles.nums, "font-mono text-5xl font-semibold tracking-tight")}
                >
                  {fmtMonths(snap.runwayMonths)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  at {scenarioIsActive(scenario) ? "scenario" : "current"} prices
                </div>
              </div>
              {snap.stressCases.map((c) => (
                <div key={c.label}>
                  <div className={cn(styles.nums, "font-mono text-2xl font-medium text-muted-foreground")}>
                    {fmtMonths(c.runwayMonths)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    if volatile assets fall {c.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <ProjectionChart snap={snap} floorMonths={policy.stableFloorMonths} />
            </div>
            <Provenance className="mt-3" source={PRICE_FEED_SOURCE} asOf={PRICE_FEED_ASOF} />
          </CardContent>
        </Card>

        {/* Right rail: policy + value */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Policy status</CardTitle>
              <CardDescription>
                {failing > 0
                  ? `${failing} rule${failing > 1 ? "s" : ""} breached`
                  : warning > 0
                    ? "All rules pass, some are near their limit"
                    : "All rules pass"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {snap.policyResults.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-2 text-sm">
                  <span>{r.name}</span>
                  <StatusPill status={r.status} />
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="mt-1 w-full"
                onClick={() => setView("policy")}
              >
                Review policy
                <ArrowRight aria-hidden data-icon="inline-end" />
              </Button>
            </CardContent>
          </Card>

          <StatTile
            label="Treasury value"
            value={fmtUsd(snap.totalUsd)}
            sub={
              <span className="inline-flex items-center gap-1.5">
                {fmtUsdFull(snap.totalUsd)} · 24h <Delta pct={change24h} />
              </span>
            }
          >
            <div className="mt-2">
              <HistoryChart data={history} />
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">
              90-day seeded history · ends at the demo clock ({DEMO_CLOCK_LABEL})
            </div>
          </StatTile>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <SectionTitle
              title="Allocation by asset class"
              hint="Share of total treasury value at scenario prices."
            />
          </CardHeader>
          <CardContent>
            <AllocationBar snap={snap} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionTitle
              title="Stablecoin issuer mix"
              hint={`Policy: no single issuer above ${policy.issuerCapPct}% of stablecoins.`}
            />
          </CardHeader>
          <CardContent className="space-y-3">
            {snap.issuerShares.length === 0 ? (
              <EmptyState
                icon={Landmark}
                title="No stablecoins"
                body="Issuer concentration applies once the treasury holds stablecoins."
                className="py-8"
              />
            ) : (
              snap.issuerShares.map((s) => (
                <LimitMeter
                  key={s.issuer}
                  label={s.issuer}
                  valuePct={s.pct}
                  limitPct={policy.issuerCapPct}
                  valueLabel={`${fmtPct(s.pct)} · ${fmtUsd(s.usd)}`}
                />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
