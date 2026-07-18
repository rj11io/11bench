"use client"

import * as React from "react"
import {
  ArrowRight,
  ClipboardList,
  Lock,
  Plus,
  Sparkles,
  Trash2,
  Wallet,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import {
  buildSnapshot,
  sellableUsd,
  slippageBps,
  slippageCostUsd,
} from "../../lib/calc"
import { ASSETS, ASSET_BY_ID, DEMO_CLOCK_LABEL } from "../../lib/data"
import { fmtBps, fmtMonths, fmtPct, fmtUsd } from "../../lib/format"
import { useGlidepath } from "../../lib/store"
import type { Move, PolicyStatus, Proposal, Snapshot } from "../../lib/types"
import styles from "../../glidepath.module.css"
import { EmptyState, SectionTitle, StatusPill } from "../bits"

let moveCounter = 0
function newMoveId(): string {
  moveCounter += 1
  return `m${moveCounter}-${Math.random().toString(36).slice(2, 8)}`
}

function statusArrow(before: PolicyStatus, after: PolicyStatus): "better" | "worse" | "same" {
  const rank = { pass: 0, warn: 1, fail: 2 }
  if (rank[after] < rank[before]) return "better"
  if (rank[after] > rank[before]) return "worse"
  return "same"
}

export function ProposalsView({ snap }: { snap: Snapshot }) {
  const { org, policy, scenario, proposals, saveProposal, deleteProposal, seedFresh } =
    useGlidepath()
  const [moves, setMoves] = React.useState<Move[]>([])
  const [title, setTitle] = React.useState("")

  const previewSnap = React.useMemo(
    () => (moves.length ? buildSnapshot(org, scenario, policy, moves) : null),
    [org, scenario, policy, moves]
  )

  if (org.accounts.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No proposals yet"
        body="Proposals are rebalance plans: what to sell, what to buy, and what it does to runway and policy — written so multisig signers can read them before signing."
        action={
          <Button onClick={seedFresh}>
            <Wallet aria-hidden data-icon="inline-start" />
            Load sample custody accounts (demo)
          </Button>
        }
      />
    )
  }

  const heldAssetIds = new Set(snap.rows.map((r) => r.asset.id))
  const issuerFail = snap.policyResults.find((r) => r.id === "issuer-cap" && r.status === "fail")

  const suggestFix = () => {
    // Sell enough of the top issuer's stablecoin into USDS to get under the cap.
    const top = snap.issuerShares[0]
    if (!top) return
    const excessUsd = top.usd - (policy.issuerCapPct / 100) * snap.stablesUsd
    if (excessUsd <= 0) return
    const amount = Math.ceil((excessUsd * 1.02) / 10_000) * 10_000
    const fromAsset = snap.rows.find(
      (r) => r.asset.cls === "stable" && r.asset.issuer === top.issuer
    )?.asset
    if (!fromAsset) return
    const toAssetId = fromAsset.id === "usds" ? "usdt" : "usds"
    setMoves([{ id: newMoveId(), fromAssetId: fromAsset.id, toAssetId, usd: amount }])
    if (!title) setTitle(`Reduce ${top.issuer} concentration`)
  }

  const updateMove = (id: string, patch: Partial<Move>) =>
    setMoves((ms) => ms.map((m) => (m.id === id ? { ...m, ...patch } : m)))

  const addMove = () =>
    setMoves((ms) => [
      ...ms,
      { id: newMoveId(), fromAssetId: "eth", toAssetId: "usdc", usd: 100_000 },
    ])

  const totalSlippage = moves.reduce((s, m) => {
    const a = ASSET_BY_ID[m.fromAssetId]
    return a ? s + slippageCostUsd(a.liquidity, m.usd) : s
  }, 0)

  const validMoves = moves.filter(
    (m) => m.usd > 0 && m.fromAssetId !== m.toAssetId
  )

  const save = () => {
    if (!previewSnap || validMoves.length === 0) return
    const summary: string[] = validMoves.map((m) => {
      const from = ASSET_BY_ID[m.fromAssetId]
      const to = ASSET_BY_ID[m.toAssetId]
      const bps = slippageBps(from.liquidity, m.usd)
      return `Sell ${fmtUsd(m.usd)} of ${from.symbol} for ${to.symbol} (est. slippage ${fmtBps(bps)} ≈ ${fmtUsd(
        slippageCostUsd(from.liquidity, m.usd)
      )}).`
    })
    summary.push(
      `Runway: ${fmtMonths(snap.runwayMonths)} → ${fmtMonths(previewSnap.runwayMonths)}.`
    )
    const topBefore = snap.issuerShares[0]
    const topAfter = previewSnap.issuerShares[0]
    if (topBefore && topAfter) {
      summary.push(
        `Largest stablecoin issuer: ${topBefore.issuer} ${fmtPct(topBefore.pct)} → ${topAfter.issuer} ${fmtPct(topAfter.pct)} (cap ${policy.issuerCapPct}%).`
      )
    }
    const signerAccount =
      org.accounts.find((a) => a.kind === "safe") ?? org.accounts[0]
    const sigTotal = signerAccount.threshold
      ? parseInt(signerAccount.threshold, 10) || 3
      : 3
    const proposal: Proposal = {
      id: `p-${Math.random().toString(36).slice(2, 10)}`,
      title: title.trim() || "Untitled rebalance",
      createdAtLabel: DEMO_CLOCK_LABEL,
      moves: validMoves,
      status: "pending",
      sigHave: 0,
      sigTotal,
      summary,
    }
    saveProposal(proposal)
    setMoves([])
    setTitle("")
  }

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Composer */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Plan a rebalance</CardTitle>
          <CardDescription>
            Compose moves, preview what they do to runway and every policy rule, then save
            the plan for your signers. Glidepath never executes — your multisig does.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {issuerFail && moves.length === 0 ? (
            <Button variant="outline" size="sm" onClick={suggestFix}>
              <Sparkles aria-hidden data-icon="inline-start" />
              Suggest a fix for the issuer-cap breach
            </Button>
          ) : null}

          {moves.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No moves yet. Add one, or use the suggestion above.
            </p>
          ) : (
            <div className="space-y-3">
              {moves.map((m) => {
                const from = ASSET_BY_ID[m.fromAssetId]
                const available = sellableUsd(org.positions, m.fromAssetId, scenario)
                const over = m.usd > available
                return (
                  <div key={m.id} className="rounded-lg border p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted-foreground">Sell</span>
                      <NativeSelect
                        size="sm"
                        aria-label="Asset to sell"
                        value={m.fromAssetId}
                        onChange={(e) => updateMove(m.id, { fromAssetId: e.target.value })}
                      >
                        {ASSETS.filter((a) => heldAssetIds.has(a.id)).map((a) => (
                          <NativeSelectOption key={a.id} value={a.id}>
                            {a.symbol}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <Input
                        type="number"
                        inputMode="numeric"
                        min={0}
                        step={10_000}
                        value={m.usd || ""}
                        aria-label="Amount in US dollars"
                        onChange={(e) =>
                          updateMove(m.id, { usd: Math.max(0, Number(e.target.value) || 0) })
                        }
                        className={cn(styles.nums, "h-8 w-32 font-mono")}
                      />
                      <span className="text-xs text-muted-foreground">USD for</span>
                      <NativeSelect
                        size="sm"
                        aria-label="Asset to buy"
                        value={m.toAssetId}
                        onChange={(e) => updateMove(m.id, { toAssetId: e.target.value })}
                      >
                        {ASSETS.filter((a) => a.id !== m.fromAssetId && a.cls !== "own").map(
                          (a) => (
                            <NativeSelectOption key={a.id} value={a.id}>
                              {a.symbol}
                            </NativeSelectOption>
                          )
                        )}
                      </NativeSelect>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        aria-label="Remove move"
                        className="ml-auto"
                        onClick={() => setMoves((ms) => ms.filter((x) => x.id !== m.id))}
                      >
                        <Trash2 aria-hidden />
                      </Button>
                    </div>
                    <div className="mt-1.5 text-xs text-muted-foreground">
                      {from ? (
                        <>
                          Available: {fmtUsd(available)}
                          {over ? (
                            <span className="font-medium text-foreground">
                              {" "}
                              — capped at available balance in the preview
                            </span>
                          ) : null}
                          {" · "}est. slippage {fmtBps(slippageBps(from.liquidity, Math.min(m.usd, available)))} ≈{" "}
                          {fmtUsd(slippageCostUsd(from.liquidity, Math.min(m.usd, available)))} (simulated
                          depth)
                        </>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={addMove}>
              <Plus aria-hidden data-icon="inline-start" />
              Add move
            </Button>
          </div>

          {previewSnap && validMoves.length > 0 ? (
            <>
              <Separator />
              <SectionTitle
                title="Before → after"
                hint={`At ${scenario.preset !== "none" ? "scenario" : "current"} prices · total est. slippage ${fmtUsd(totalSlippage)}`}
              />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    label: "Runway",
                    before: fmtMonths(snap.runwayMonths),
                    after: fmtMonths(previewSnap.runwayMonths),
                  },
                  {
                    label: "Stable floor",
                    before: fmtMonths(snap.stableFloorMonths),
                    after: fmtMonths(previewSnap.stableFloorMonths),
                  },
                  {
                    label: "Stablecoins",
                    before: fmtUsd(snap.stablesUsd),
                    after: fmtUsd(previewSnap.stablesUsd),
                  },
                  {
                    label: "Treasury value",
                    before: fmtUsd(snap.totalUsd),
                    after: fmtUsd(previewSnap.totalUsd),
                  },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="text-xs text-muted-foreground">{row.label}</div>
                    <div className={cn(styles.nums, "mt-0.5 flex items-center gap-1.5 font-mono text-sm")}>
                      <span className="text-muted-foreground">{row.before}</span>
                      <ArrowRight aria-hidden className="size-3 text-muted-foreground" />
                      <span className="font-medium">{row.after}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {previewSnap.policyResults.map((after) => {
                  const before = snap.policyResults.find((b) => b.id === after.id)
                  if (!before) return null
                  const dir = statusArrow(before.status, after.status)
                  return (
                    <div key={after.id} className="flex items-center justify-between gap-3 text-sm">
                      <span className="min-w-0">
                        {after.name}
                        {dir !== "same" ? (
                          <span className="ml-2 text-xs text-muted-foreground">
                            {dir === "better" ? "improves" : "gets worse"}
                          </span>
                        ) : null}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <StatusPill status={before.status} />
                        <ArrowRight aria-hidden className="size-3 text-muted-foreground" />
                        <StatusPill status={after.status} />
                      </span>
                    </div>
                  )
                })}
              </div>
              <Separator />
              <div className="flex flex-wrap items-center gap-2">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Proposal title, e.g. “Reduce USDC concentration”"
                  aria-label="Proposal title"
                  className="h-8 max-w-xs"
                />
                <Button size="sm" onClick={save}>
                  Save proposal
                </Button>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>

      {/* Saved proposals */}
      <div className="space-y-4 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Saved proposals</CardTitle>
            <CardDescription>
              Written for signers: plain words, named accounts, expected effects. Signing
              happens in your own multisig — simulated here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {proposals.length === 0 ? (
              <EmptyState
                icon={ClipboardList}
                title="Nothing saved yet"
                body="Saved proposals appear here and survive a page reload."
                className="py-8"
              />
            ) : (
              proposals.map((p) => (
                <div key={p.id} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{p.title}</div>
                      <div className="text-xs text-muted-foreground">
                        Created {p.createdAtLabel} (demo clock)
                      </div>
                    </div>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label={`Delete proposal ${p.title}`}
                      onClick={() => deleteProposal(p.id)}
                    >
                      <Trash2 aria-hidden />
                    </Button>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                    {p.summary.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="gap-1 text-[10px]">
                      <Lock aria-hidden className="size-3" />
                      Awaiting signatures — {p.sigHave} of {p.sigTotal} (simulated)
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        <p className="text-xs text-muted-foreground">
          Glidepath is read-only by design: it holds no keys and cannot move funds. A
          production version would export this plan as an unsigned transaction batch for
          your Safe; in this demo the hand-off stops here.
        </p>
      </div>
    </div>
  )
}
