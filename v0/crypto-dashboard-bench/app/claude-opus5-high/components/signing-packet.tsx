"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import type { PlanAction, PlanSummary, Policy, PolicyCheck } from "../lib/engine"
import { worstVerdict } from "../lib/engine"
import { days, ratio, stamp, usdShort } from "../lib/format"
import css from "../waterline.module.css"
import { KeyValue, Label, Note, Panel, VerdictTag } from "./bits"

/** A call a signer would be asked to approve, decoded into words. */
interface DecodedCall {
  step: number
  title: string
  target: string
  /** 0 = call, 1 = delegatecall. Named in words, never left as a number. */
  operation: 0 | 1
  functionSig: string
  plain: string
  valueUsd: number
  warning?: string
}

function decodePlan(actions: PlanAction[]): DecodedCall[] {
  const calls: DecodedCall[] = []
  let step = 0
  for (const a of actions) {
    step += 1
    switch (a.kind) {
      case "otc_block":
        calls.push({
          step,
          title: "Escrow the block for settlement",
          target: "0xDEMO…a71c  (escrow, fictional)",
          operation: 0,
          functionSig: "transfer(address to, uint256 amount)",
          plain: `Move ${usdShort(a.notionalUsd ?? 0)} of the token to a settlement escrow. Cash arrives in ${days(a.settleDays ?? 7)}, at ${((a.discountBps ?? 0) / 100).toFixed(1)}% below the screen price.`,
          valueUsd: a.notionalUsd ?? 0,
          warning:
            "Off-market price. It cannot be checked against a public quote, so the counterparty term sheet is the only evidence.",
        })
        break
      case "raise_participation":
        calls.push({
          step,
          title: "Widen the trading allowance for a fixed window",
          target: "0xDEMO…3f90  (allowance module, fictional)",
          operation: 0,
          functionSig: "setAllowance(address delegate, uint96 amount, uint16 resetMinutes)",
          plain: `Let the execution delegate work up to ${a.participationPct}% of daily volume for ${a.windowMonths} months, then expire automatically. Above the ${"standing"} policy cap, so it is logged as a time-boxed exception.`,
          valueUsd: 0,
        })
        break
      case "repay_debt":
        calls.push({
          step,
          title: "Repay debt to release pinned collateral",
          target: "0xDEMO…5c02  (lending pool, fictional)",
          operation: 0,
          functionSig: "repay(address asset, uint256 amount, uint256 rateMode, address onBehalfOf)",
          plain: `Repay ${usdShort(a.repayUsd ?? 0)} of debt. The health factor rises and collateral above the floor becomes withdrawable.`,
          valueUsd: a.repayUsd ?? 0,
        })
        break
      case "switch_route":
        calls.push({
          step,
          title: "Queue a redemption instead of selling",
          target: "0xDEMO…8b44  (withdrawal queue, fictional)",
          operation: 0,
          functionSig: "requestWithdrawals(uint256[] amounts, address owner)",
          plain: `Join the redemption queue rather than selling into the secondary market. Full value, ${days(a.settleDays ?? 3)} of waiting.`,
          valueUsd: 0,
        })
        break
      case "trim_spend":
      case "defer_spend":
        // Spend changes are not transactions. Saying so is the point.
        break
    }
  }
  return calls
}

export function SigningPacket({
  open,
  onOpenChange,
  plan,
  checks,
  policy,
  approver,
  nowIso,
  degraded,
  onApprove,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan: PlanSummary
  checks: PolicyCheck[]
  policy: Policy
  approver: string
  nowIso: string
  degraded: boolean
  onApprove: (secondApprover: string | undefined) => void
}) {
  const [second, setSecond] = React.useState("")
  const [ack, setAck] = React.useState(false)

  const calls = React.useMemo(() => decodePlan(plan.actions), [plan.actions])
  const offChain = plan.actions.filter((a) => a.kind === "trim_spend" || a.kind === "defer_spend")
  const notional = plan.actions.reduce((s, a) => s + (a.notionalUsd ?? 0) + (a.repayUsd ?? 0), 0)
  const needsSecond = notional > policy.dualApprovalAboveUsd
  const verdict = worstVerdict(checks)
  const hasDelegatecall = calls.some((c) => c.operation === 1)
  // A stable, obviously fake digest. Deterministic so the demo never changes it.
  const digest = React.useMemo(() => {
    let acc = 0x9e3779b9
    const src = plan.actions.map((a) => a.id).join("|") + notional.toFixed(0)
    for (let i = 0; i < src.length; i++) acc = (acc ^ src.charCodeAt(i)) * 0x01000193 >>> 0
    const hex = acc.toString(16).padStart(8, "0")
    return `0x${hex}${hex.split("").reverse().join("")}…${hex.slice(0, 4)}`
  }, [plan.actions, notional])

  const canApprove = (!needsSecond || second.trim().length > 1) && (!degraded || ack)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={`${css.tokens} gap-3 data-[side=right]:sm:max-w-[36rem]`}
      >
        <SheetHeader className="gap-1 pb-0">
          <div className="flex flex-wrap items-center gap-2">
            <SheetTitle className="text-base">Signing packet</SheetTitle>
            <VerdictTag verdict={verdict} />
            <Badge variant="outline">demo · nothing is submitted</Badge>
          </div>
          <SheetDescription className="text-xs">
            What a signer would be asked to approve, in words, before they open their wallet.
          </SheetDescription>
        </SheetHeader>

        <div className={css.drawerScroll}>
          <Note kind="info">
            <strong>Waterline holds no keys and cannot move money.</strong> It produces this
            document; your own wallet executes. There is no connect-wallet button in this product
            and there never will be — that is the point. In February 2025 attackers took $1.5bn from
            a multisig without stealing a key, by changing what the signers were shown.
          </Note>

          <Panel title="What this plan does" subtitle="Frozen at the moment the packet was produced.">
            <KeyValue
              rows={[
                { k: "Coverage before", v: ratio(plan.before.minRatio) },
                { k: "Coverage after", v: ratio(plan.after.minRatio) },
                { k: "Shortfall closed", v: usdShort(plan.gapClosedUsd) },
                { k: "Cost of the plan", v: usdShort(plan.costUsd) },
                {
                  k: "Cost per dollar recovered",
                  v: plan.costPerDollar > 0 ? `$${plan.costPerDollar.toFixed(3)}` : "—",
                },
                { k: "On-chain notional", v: usdShort(notional) },
                { k: "Produced at", v: stamp(nowIso) },
              ]}
            />
          </Panel>

          {hasDelegatecall && (
            <Note kind="danger">
              <strong>One call uses delegatecall.</strong> That lets another contract run as your
              wallet and rewrite its own implementation pointer — the exact field used in the
              February 2025 theft. Do not approve unless you can explain why this call needs it.
            </Note>
          )}

          <Panel
            title={`Calls to sign (${calls.length})`}
            subtitle="Each call decoded: where it goes, what it runs, and what it moves. The operation type is named in words, never left as a number."
          >
            {calls.length === 0 ? (
              <p className={css.panelSub}>
                Nothing to sign. Every lever in this plan changes committed spend, which is a
                decision and a conversation, not a transaction.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {calls.map((c) => (
                  <div key={c.step} className={css.panel} style={{ padding: "0.6875rem" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "baseline", justifyContent: "space-between" }}>
                      <strong style={{ fontSize: "0.8125rem" }}>
                        {c.step}. {c.title}
                      </strong>
                      <Badge variant={c.operation === 1 ? "destructive" : "secondary"}>
                        {c.operation === 1 ? "delegatecall (operation 1)" : "call (operation 0)"}
                      </Badge>
                    </div>
                    <p style={{ margin: "0.375rem 0", fontSize: "0.75rem", lineHeight: 1.55 }}>
                      {c.plain}
                    </p>
                    <div className={css.codeBlock}>
                      {`to        ${c.target}\noperation ${c.operation}  (${c.operation === 1 ? "delegatecall" : "call"})\nfunction  ${c.functionSig}\nvalue     ${usdShort(c.valueUsd)}`}
                    </div>
                    {c.warning && <Note kind="warn">{c.warning}</Note>}
                  </div>
                ))}
              </div>
            )}
          </Panel>

          {offChain.length > 0 && (
            <Panel
              title="Not transactions"
              subtitle="These levers change what the treasury owes. They need people to agree, not signatures."
            >
              <ul style={{ margin: 0, paddingLeft: "1rem", fontSize: "0.75rem", lineHeight: 1.6 }}>
                {offChain.map((a) => (
                  <li key={a.id} style={{ marginBottom: "0.25rem" }}>
                    {a.label}
                    {a.requiresConsentFrom ? (
                      <span style={{ color: "var(--color-muted-foreground)" }}>
                        {` — needs ${a.requiresConsentFrom}`}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          <Panel
            title="Verify before you sign"
            subtitle="Compare this digest on your hardware device screen, not in a browser. A compromised interface can change what a browser shows; it cannot change what the device displays."
          >
            <div className={css.codeBlock}>{digest}</div>
            <p style={{ marginTop: "0.5rem", fontSize: "0.6875rem", color: "var(--color-muted-foreground)", lineHeight: 1.6 }}>
              Demo digest, derived from the plan contents so it stays stable. In production this is
              the transaction hash, and the packet also lists the typed-data structure so a device
              that supports it can render the fields rather than an opaque hash.
            </p>
          </Panel>

          <Panel title={`Policy check (${checks.length} rules)`}>
            {checks.map((c) => (
              <div key={c.id} className={css.checkRow}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 500 }}>{c.rule}</div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--color-muted-foreground)" }}>
                    {`${c.actual} against a limit of ${c.limit} · `}
                    {c.enforcement === "advisory"
                      ? "advisory, checked here only"
                      : c.enforcement === "safe-guard"
                        ? "enforceable on-chain as a transaction guard"
                        : "enforceable on-chain as a spending allowance"}
                  </div>
                </div>
                <VerdictTag verdict={c.verdict} />
              </div>
            ))}
            {verdict !== "pass" && (
              <Note kind={verdict === "fail" ? "danger" : "warn"}>
                This packet still prints with a failing check, and the failure is printed on it. The
                product does not block a decision the treasury is entitled to make — it makes sure
                nobody can claim they did not know.
              </Note>
            )}
          </Panel>

          {degraded && (
            <Panel title="Data health">
              <Note kind="warn">
                At least one input is older than its expected refresh. Following the standard
                guidance for stale price feeds, the product will not produce an approval on degraded
                data without someone saying so out loud.
              </Note>
              <label style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginTop: "0.5rem", fontSize: "0.75rem" }}>
                <input
                  type="checkbox"
                  checked={ack}
                  onChange={(e) => setAck(e.currentTarget.checked)}
                  style={{ marginTop: "0.1875rem" }}
                />
                <span>
                  I have read the data-health panel and accept that this plan was modelled on stale
                  inputs.
                </span>
              </label>
            </Panel>
          )}

          <Panel title="Approval">
            <KeyValue rows={[{ k: "First approver", v: approver }]} />
            {needsSecond ? (
              <div style={{ marginTop: "0.625rem" }}>
                <Label>
                  {`Second approver required above ${usdShort(policy.dualApprovalAboveUsd)}`}
                </Label>
                <Input
                  value={second}
                  onChange={(e) => setSecond(e.currentTarget.value)}
                  placeholder="Name of a second approver who is not the author"
                  className="mt-1.5 h-9 text-xs"
                />
              </div>
            ) : (
              <p style={{ marginTop: "0.5rem", fontSize: "0.6875rem", color: "var(--color-muted-foreground)" }}>
                {`Below the ${usdShort(policy.dualApprovalAboveUsd)} dual-approval threshold, so one approver is enough.`}
              </p>
            )}
          </Panel>
        </div>

        <SheetFooter className="border-t pt-3">
          <div className="flex w-full flex-wrap items-center gap-2">
            <Button
              size="sm"
              disabled={!canApprove}
              onClick={() => {
                onApprove(needsSecond ? second.trim() : undefined)
                setSecond("")
                setAck(false)
              }}
            >
              Record approval
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <span style={{ fontSize: "0.625rem", color: "var(--color-muted-foreground)" }}>
              Records a decision-log entry. Submits nothing anywhere.
            </span>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
