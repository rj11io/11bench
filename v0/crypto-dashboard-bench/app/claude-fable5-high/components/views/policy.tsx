"use client"

import * as React from "react"
import { RefreshCw, ShieldCheck, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

import { DEFAULT_POLICY } from "../../lib/data"
import { useGlidepath } from "../../lib/store"
import type { PolicyConfig, Snapshot } from "../../lib/types"
import styles from "../../glidepath.module.css"
import { EmptyState, StatusPill } from "../bits"

interface RuleSpec {
  id: string
  key: keyof PolicyConfig
  name: string
  plain: string
  min: number
  max: number
  step: number
  unit: "months" | "%"
  direction: "at least" | "at most"
}

const RULES: RuleSpec[] = [
  {
    id: "stable-floor",
    key: "stableFloorMonths",
    name: "Stable floor",
    plain:
      "Keep enough stablecoins to cover this many months of payroll and expenses, so a crash never decides whether you can pay people.",
    min: 3,
    max: 24,
    step: 1,
    unit: "months",
    direction: "at least",
  },
  {
    id: "issuer-cap",
    key: "issuerCapPct",
    name: "Issuer cap",
    plain:
      "No single stablecoin issuer (Circle, Tether, Sky…) may back more than this share of your stablecoins. If one issuer fails, the rest still stand.",
    min: 25,
    max: 100,
    step: 5,
    unit: "%",
    direction: "at most",
  },
  {
    id: "volatile-cap",
    key: "volatileCapPct",
    name: "Volatile cap",
    plain:
      "ETH and staked ETH together may be at most this share of the treasury. This caps how much a drawdown can hurt.",
    min: 10,
    max: 80,
    step: 5,
    unit: "%",
    direction: "at most",
  },
  {
    id: "own-cap",
    key: "ownTokenCapPct",
    name: "Own-token cap",
    plain:
      "Your own token may be at most this share of the treasury. It is the asset most correlated with your own failure — the worst thing to depend on.",
    min: 5,
    max: 60,
    step: 5,
    unit: "%",
    direction: "at most",
  },
  {
    id: "venue-cap",
    key: "venueCapPct",
    name: "Venue cap",
    plain:
      "No single exchange may hold more than this share of the treasury. Exchanges are counterparties — they can freeze, fail, or be hacked.",
    min: 5,
    max: 50,
    step: 5,
    unit: "%",
    direction: "at most",
  },
]

export function PolicyView({ snap }: { snap: Snapshot }) {
  const { org, policy, setPolicy, seedFresh } = useGlidepath()

  if (org.accounts.length === 0) {
    return (
      <EmptyState
        icon={ShieldCheck}
        title="Policy has nothing to check yet"
        body="Your rules are ready to edit, but they only mean something once there are holdings to measure them against."
        action={
          <Button onClick={seedFresh}>
            <Wallet aria-hidden data-icon="inline-start" />
            Load sample custody accounts (demo)
          </Button>
        }
      />
    )
  }

  const isDefault = (Object.keys(DEFAULT_POLICY) as (keyof PolicyConfig)[]).every(
    (k) => policy[k] === DEFAULT_POLICY[k]
  )

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <CardTitle>Treasury policy</CardTitle>
              <CardDescription>
                Five rules, checked continuously against live holdings — here, on the
                Overview, and in every proposal preview. Edits apply instantly and persist
                in this browser.
              </CardDescription>
            </div>
            {!isDefault ? (
              <Button variant="outline" size="sm" onClick={() => setPolicy(DEFAULT_POLICY)}>
                <RefreshCw aria-hidden data-icon="inline-start" />
                Restore defaults
              </Button>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {RULES.map((rule, i) => {
            const result = snap.policyResults.find((r) => r.id === rule.id)
            const value = policy[rule.key]
            return (
              <React.Fragment key={rule.id}>
                {i > 0 ? <Separator /> : null}
                <div className="grid gap-3 md:grid-cols-[1fr_240px]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold">{rule.name}</span>
                      {result ? <StatusPill status={result.status} /> : null}
                    </div>
                    <p className="mt-1 max-w-prose text-xs text-muted-foreground">{rule.plain}</p>
                    {result ? (
                      <p className="mt-1.5 text-xs">
                        <span className="text-muted-foreground">Now:</span> {result.detail}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <div className="mb-2 flex items-baseline justify-between">
                      <Label className="text-xs text-muted-foreground">
                        Limit ({rule.direction})
                      </Label>
                      <span className={cn(styles.nums, "font-mono text-sm font-medium")}>
                        {value}
                        {rule.unit === "%" ? "%" : " mo"}
                      </span>
                    </div>
                    <Slider
                      value={value}
                      min={rule.min}
                      max={rule.max}
                      step={rule.step}
                      aria-label={`${rule.name} limit`}
                      onValueChange={(v) =>
                        setPolicy({
                          ...policy,
                          [rule.key]: Array.isArray(v) ? v[0] : (v as number),
                        })
                      }
                    />
                  </div>
                </div>
              </React.Fragment>
            )
          })}
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">
        These rules mirror common practice for crypto-org treasuries (stable floor,
        issuer/venue diversification, volatility caps). They are your rules, not advice —
        Glidepath checks them, it does not choose them.
      </p>
    </div>
  )
}
