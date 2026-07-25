"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { stamp } from "../../lib/format"
import { clearLog } from "../../lib/store"
import css from "../../waterline.module.css"
import { KeyValue, Label, Note, Panel } from "../bits"
import type { Ctx } from "../ctx"

const KIND_LABEL: Record<string, string> = {
  "plan-approved": "plan approved",
  "policy-changed": "policy changed",
  "snapshot-noted": "snapshot recorded",
  "workspace-setup": "workspace set up",
}

export function LogView({ ctx }: { ctx: Ctx }) {
  const entries = ctx.state.log.filter((e) => e.orgId === ctx.org.id)

  return (
    <div className={css.grid} style={{ gap: "var(--wl-gap)", maxWidth: "60rem" }}>
      <Panel
        title="Decision log"
        subtitle="Append-only. Each entry keeps the numbers as they stood at the moment of the decision, together with the assumptions and sources behind them, so a later reader can tell what was known rather than what turned out to be true."
        aside={
          entries.length > 0 ? (
            <Button size="sm" variant="ghost" onClick={() => clearLog(ctx.org.id)}>
              Clear demo log
            </Button>
          ) : null
        }
      >
        {entries.length === 0 ? (
          <div>
            <Note>
              Nothing recorded yet. Approve a plan on the Plan tab, or reset the policy template,
              and the entry will appear here and survive a page reload.
            </Note>
            <p style={{ marginTop: "0.75rem", fontSize: "0.75rem", lineHeight: 1.65, color: "var(--color-muted-foreground)" }}>
              An empty log is the honest first state of this view. Most products would seed it with
              invented history to make the screen look inhabited; that would also make the audit
              trail a lie on its first day.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {entries.map((e) => (
              <article key={e.id} className={css.panel} style={{ padding: "0.875rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "baseline", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: "0.875rem" }}>{e.title}</strong>
                  <Badge variant="outline">{KIND_LABEL[e.kind] ?? e.kind}</Badge>
                </div>
                <p style={{ margin: "0.375rem 0 0", fontSize: "0.75rem", lineHeight: 1.6 }}>{e.body}</p>

                <div className={`${css.grid} ${css.g12}`} style={{ marginTop: "0.75rem" }}>
                  <div style={{ gridColumn: "span 6" }}>
                    <Label>Numbers at the time</Label>
                    <div style={{ marginTop: "0.3125rem" }}>
                      <KeyValue rows={e.evidence.map((x) => ({ k: x.label, v: x.value }))} />
                    </div>
                  </div>
                  <div style={{ gridColumn: "span 6" }}>
                    <Label>Assumptions and sources</Label>
                    <div style={{ marginTop: "0.3125rem" }}>
                      <KeyValue rows={e.provenance.map((x) => ({ k: x.label, v: x.value }))} />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "0.75rem", paddingTop: "0.5rem", borderTop: "1px solid var(--wl-hair)", fontSize: "0.6875rem", color: "var(--color-muted-foreground)", lineHeight: 1.6 }}>
                  {`Recorded ${stamp(e.at)} · approved by ${e.approver}`}
                  {e.secondApprover ? ` · second approver ${e.secondApprover}` : ""}
                </div>
              </article>
            ))}
          </div>
        )}
      </Panel>

      <Note>
        <strong>Nothing here was executed.</strong> Approving a plan in Waterline records a decision
        and produces a document. Moving money happens in the treasury&rsquo;s own wallet, signed by
        its own people, and Waterline has no way to do it. In production this log is exportable and
        each entry keeps a hash of the snapshot it was taken against, so a reader can check that the
        numbers were not edited after the fact.
      </Note>
    </div>
  )
}
