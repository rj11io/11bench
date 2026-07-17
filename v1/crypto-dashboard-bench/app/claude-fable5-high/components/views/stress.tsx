"use client"

import * as React from "react"
import { ArrowRight, RefreshCw, TrendingDown, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

import { buildSnapshot } from "../../lib/calc"
import { NO_SCENARIO, SCENARIO_PRESETS } from "../../lib/data"
import { fmtMonths, fmtUsd } from "../../lib/format"
import { scenarioIsActive, useGlidepath } from "../../lib/store"
import type { Scenario, Snapshot } from "../../lib/types"
import styles from "../../glidepath.module.css"
import { EmptyState, SectionTitle, StatusPill } from "../bits"
import { ProjectionChart } from "../charts"

function ScenarioSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 80,
  suffix = "%",
  prefix = "−",
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  suffix?: string
  prefix?: string
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <Label className="text-xs">{label}</Label>
        <span className={cn(styles.nums, "font-mono text-sm font-medium")}>
          {value === 0 && prefix === "−" ? "0" : `${prefix}${value}`}
          {suffix}
        </span>
      </div>
      <Slider
        value={value}
        min={min}
        max={max}
        step={5}
        aria-label={label}
        onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : (v as number))}
      />
    </div>
  )
}

export function StressView({ snap }: { snap: Snapshot }) {
  const { org, policy, scenario, setScenario, seedFresh, setView } = useGlidepath()
  const baseSnap = React.useMemo(
    () => buildSnapshot(org, NO_SCENARIO, policy),
    [org, policy]
  )

  if (org.accounts.length === 0) {
    return (
      <EmptyState
        icon={TrendingDown}
        title="Nothing to stress-test yet"
        body="Add a custody account first — then you can reprice the whole treasury under drawdowns, a stablecoin depeg, or a higher burn."
        action={
          <Button onClick={seedFresh}>
            <Wallet aria-hidden data-icon="inline-start" />
            Load sample custody accounts (demo)
          </Button>
        }
      />
    )
  }

  const set = (patch: Partial<Scenario>) =>
    setScenario({ ...scenario, ...patch, preset: "custom" })

  const active = scenarioIsActive(scenario)
  const runwayDelta = snap.runwayMonths - baseSnap.runwayMonths
  const valueDelta = snap.totalUsd - baseSnap.totalUsd
  const flipped = snap.policyResults.filter(
    (r) =>
      r.status === "fail" &&
      baseSnap.policyResults.find((b) => b.id === r.id)?.status !== "fail"
  )

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Scenario</CardTitle>
          <CardDescription>
            Reprices every figure in the app — the scenario follows you across all views
            until you reset it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={!active ? "default" : "outline"}
              onClick={() => setScenario(NO_SCENARIO)}
            >
              None
            </Button>
            {(["correction", "crisis"] as const).map((k) => (
              <Button
                key={k}
                size="sm"
                variant={scenario.preset === k ? "default" : "outline"}
                onClick={() => setScenario(SCENARIO_PRESETS[k].scenario)}
                title={SCENARIO_PRESETS[k].description}
              >
                {SCENARIO_PRESETS[k].label}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Correction: {SCENARIO_PRESETS.correction.description} Crisis:{" "}
            {SCENARIO_PRESETS.crisis.description}
          </p>

          <ScenarioSlider
            label="Majors drawdown (ETH, stETH)"
            value={scenario.majorsDrawdownPct}
            onChange={(v) => set({ majorsDrawdownPct: v })}
          />
          <ScenarioSlider
            label="Own-token drawdown (MERI)"
            value={scenario.ownDrawdownPct}
            max={90}
            onChange={(v) => set({ ownDrawdownPct: v })}
          />
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="depeg-switch" className="text-xs">
              USDT depeg to $0.985 (−150 bps)
            </Label>
            <Switch
              id="depeg-switch"
              checked={scenario.usdtDepeg}
              onCheckedChange={(checked) => set({ usdtDepeg: checked })}
            />
          </div>
          <ScenarioSlider
            label="Monthly burn multiplier"
            value={Math.round(scenario.burnMultiplier * 100)}
            min={50}
            max={200}
            prefix=""
            suffix="%"
            onChange={(v) => set({ burnMultiplier: v / 100 })}
          />

          {active ? (
            <Button variant="outline" size="sm" onClick={() => setScenario(NO_SCENARIO)}>
              <RefreshCw aria-hidden data-icon="inline-start" />
              Reset to seeded prices
            </Button>
          ) : null}
        </CardContent>
      </Card>

      <div className="space-y-4 lg:col-span-3">
        <Card>
          <CardHeader>
            <SectionTitle
              title="Impact"
              hint={
                active
                  ? "Scenario prices versus seeded prices."
                  : "No scenario applied — move a slider or pick a preset to see the impact."
              }
            />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <div className="text-xs text-muted-foreground">Runway</div>
                <div className={cn(styles.nums, "mt-0.5 font-mono text-2xl font-semibold")}>
                  {fmtMonths(snap.runwayMonths)}
                </div>
                {active ? (
                  <div className="text-xs text-muted-foreground">
                    was {fmtMonths(baseSnap.runwayMonths)} ({runwayDelta >= 0 ? "+" : ""}
                    {runwayDelta.toFixed(1)})
                  </div>
                ) : null}
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Treasury value</div>
                <div className={cn(styles.nums, "mt-0.5 font-mono text-2xl font-semibold")}>
                  {fmtUsd(snap.totalUsd)}
                </div>
                {active ? (
                  <div className="text-xs text-muted-foreground">
                    {valueDelta >= 0 ? "+" : "−"}
                    {fmtUsd(Math.abs(valueDelta))} vs seeded
                  </div>
                ) : null}
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Stable floor</div>
                <div className={cn(styles.nums, "mt-0.5 font-mono text-2xl font-semibold")}>
                  {fmtMonths(snap.stableFloorMonths)}
                </div>
                <div className="text-xs text-muted-foreground">
                  policy: ≥ {policy.stableFloorMonths} mo
                </div>
              </div>
            </div>

            <div className="mt-5">
              <ProjectionChart snap={snap} floorMonths={policy.stableFloorMonths} height={200} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionTitle
              title="Policy under this scenario"
              hint={
                flipped.length > 0
                  ? `${flipped.length} rule${flipped.length > 1 ? "s" : ""} newly breached under this scenario.`
                  : "Rules re-checked at scenario prices."
              }
            />
          </CardHeader>
          <CardContent className="space-y-2.5">
            {snap.policyResults.map((r) => (
              <div key={r.id} className="flex items-start justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.detail}</div>
                </div>
                <StatusPill status={r.status} />
              </div>
            ))}
            {snap.policyResults.some((r) => r.status === "fail") ? (
              <Button size="sm" variant="outline" onClick={() => setView("proposals")}>
                Plan a fix
                <ArrowRight aria-hidden data-icon="inline-end" />
              </Button>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
