"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { NativeSelect } from "@/components/ui/native-select"

import { BUCKETS, markUsd, priceOf, sellableView, settleDaysOf } from "../../lib/engine"
import { days, pct, price, qty, usdShort } from "../../lib/format"
import css from "../../waterline.module.css"
import { KeyValue, Label, Mono, Note, Panel, Prov } from "../bits"
import type { Ctx } from "../ctx"
import { poolSiblings } from "../ctx"
import { AssetDrawer } from "../asset-drawer"

type SortKey = "haircut" | "mark" | "realisable" | "settle"

export function HoldingsView({ ctx }: { ctx: Ctx }) {
  const [sort, setSort] = React.useState<SortKey>("haircut")
  const [bucketFilter, setBucketFilter] = React.useState<string>("all")
  const [classFilter, setClassFilter] = React.useState<string>("all")
  const [openId, setOpenId] = React.useState<string | null>(null)

  const snap = ctx.snapshot.id

  const rows = React.useMemo(() => {
    const realisableFor = (id: string) =>
      ctx.coverage.supply.filter((l) => l.holdingId === id).reduce((s, l) => s + l.totalUsd, 0)

    return ctx.org.holdings
      .map((h) => {
        const view = sellableView(h, snap, ctx.policy)
        const mv = markUsd(h, snap)
        const realisable = realisableFor(h.id)
        return {
          h,
          view,
          mv,
          realisable,
          haircut: mv > 0 ? (1 - realisable / mv) * 100 : 0,
          settle: settleDaysOf(h, snap),
        }
      })
      .filter((r) => bucketFilter === "all" || r.view.bucket === bucketFilter)
      .filter((r) => classFilter === "all" || r.h.assetClass === classFilter)
      .sort((a, b) => {
        if (sort === "mark") return b.mv - a.mv
        if (sort === "realisable") return b.realisable - a.realisable
        if (sort === "settle") return b.settle - a.settle
        return b.haircut - a.haircut || b.mv - a.mv
      })
  }, [ctx.org.holdings, ctx.coverage.supply, ctx.policy, snap, sort, bucketFilter, classFilter])

  const classes = React.useMemo(
    () => [...new Set(ctx.org.holdings.map((h) => h.assetClass))],
    [ctx.org.holdings]
  )
  const restricted = ctx.org.holdings.filter((h) => h.restriction)
  const openHolding = ctx.org.holdings.find((h) => h.id === openId) ?? null

  if (ctx.empty) {
    return (
      <Panel title="No holdings yet">
        <Note>
          Add a watched address on the Readiness tab and every holding will appear here with its
          mark value, its realisable value, and how many days it takes to become cash.
        </Note>
      </Panel>
    )
  }

  return (
    <div className={css.grid} style={{ gap: "var(--wl-gap)" }}>
      <Panel
        title="Holdings"
        subtitle="Sorted by effective haircut, because the biggest gap between what a holding is worth and what it converts to is the thing most worth knowing. Select a row for the exit-cost curve behind it."
        aside={
          <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", alignItems: "center" }}>
            <NativeSelect
              aria-label="Filter by settlement bucket"
              value={bucketFilter}
              onChange={(e) => setBucketFilter(e.currentTarget.value)}
              className="h-8 text-xs"
            >
              <option value="all">All settlement times</option>
              {BUCKETS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </NativeSelect>
            <NativeSelect
              aria-label="Filter by asset class"
              value={classFilter}
              onChange={(e) => setClassFilter(e.currentTarget.value)}
              className="h-8 text-xs"
            >
              <option value="all">All asset classes</option>
              {classes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </NativeSelect>
          </div>
        }
      >
        <div className={css.tableWrap} data-collapsible="true">
          <table className={css.dataTable}>
            <thead>
              <tr>
                <th>Holding</th>
                <th>Position</th>
                <th data-align="right">
                  <SortBtn active={sort === "mark"} onClick={() => setSort("mark")}>
                    Mark
                  </SortBtn>
                </th>
                <th data-align="right">
                  <SortBtn active={sort === "realisable"} onClick={() => setSort("realisable")}>
                    Realisable
                  </SortBtn>
                </th>
                <th data-align="right">
                  <SortBtn active={sort === "haircut"} onClick={() => setSort("haircut")}>
                    Haircut
                  </SortBtn>
                </th>
                <th data-align="right">
                  <SortBtn active={sort === "settle"} onClick={() => setSort("settle")}>
                    Time to cash
                  </SortBtn>
                </th>
                <th>Limited by</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const line = ctx.coverage.supply.find((l) => l.holdingId === r.h.id)
                return (
                  <tr key={r.h.id}>
                    <td>
                      <button
                        type="button"
                        className={css.rowBtn}
                        onClick={() => setOpenId(r.h.id)}
                        aria-label={`Open details for ${r.h.symbol}`}
                      >
                        <strong>{r.h.symbol}</strong>
                      </button>
                      <div style={{ fontSize: "0.6875rem", color: "var(--color-muted-foreground)" }}>
                        {r.h.assetClass}
                        {r.h.restriction ? " · restricted" : ""}
                        {r.h.debt ? " · pledged" : ""}
                      </div>
                    </td>
                    <td>
                      <Mono>{qty(r.h.qty, r.h.unit)}</Mono>
                      <div style={{ fontSize: "0.6875rem", color: "var(--color-muted-foreground)" }}>
                        {`at ${price(priceOf(r.h, snap))}`}
                      </div>
                    </td>
                    <td data-align="right" className={css.mono} style={{ color: "var(--color-muted-foreground)" }}>
                      {usdShort(r.mv)}
                    </td>
                    <td data-align="right" className={css.mono} style={{ color: "var(--wl-liquid)", fontWeight: 600 }}>
                      {usdShort(r.realisable)}
                    </td>
                    <td
                      data-align="right"
                      className={css.mono}
                      style={{ color: r.haircut > 50 ? "var(--wl-breach)" : undefined }}
                    >
                      {pct(r.haircut, 0)}
                    </td>
                    <td data-align="right" className={css.mono}>
                      {r.h.restriction ? (
                        <span style={{ color: "var(--wl-breach)" }}>
                          {`locked to ${r.h.restriction.lapseDate}`}
                        </span>
                      ) : (
                        days(r.settle)
                      )}
                    </td>
                    <td style={{ fontSize: "0.6875rem", color: "var(--color-muted-foreground)", maxWidth: "13rem", whiteSpace: "normal" }}>
                      {reasonFor(r.h, line?.constrainedBy)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile: one card per holding, no horizontal scrolling. */}
        <div className={css.cards}>
          {rows.map((r) => {
            const line = ctx.coverage.supply.find((l) => l.holdingId === r.h.id)
            return (
              <button
                type="button"
                key={r.h.id}
                className={css.card}
                onClick={() => setOpenId(r.h.id)}
                style={{ textAlign: "left", cursor: "pointer" }}
              >
                <div className={css.cardHead}>
                  <strong>{r.h.symbol}</strong>
                  <Badge variant="outline">{r.h.assetClass}</Badge>
                </div>
                <KeyValue
                  rows={[
                    { k: "Position", v: qty(r.h.qty, r.h.unit) },
                    { k: "Mark", v: usdShort(r.mv) },
                    { k: "Realisable", v: usdShort(r.realisable) },
                    { k: "Haircut", v: pct(r.haircut, 0) },
                    {
                      k: "Time to cash",
                      v: r.h.restriction ? `locked to ${r.h.restriction.lapseDate}` : days(r.settle),
                    },
                    { k: "Limited by", v: reasonFor(r.h, line?.constrainedBy) },
                  ]}
                />
              </button>
            )
          })}
        </div>

        {rows.length === 0 && (
          <Note>No holdings match those filters. Clear one of them to see the rest.</Note>
        )}
      </Panel>

      <div className={`${css.grid} ${css.g12}`}>
        <div style={{ gridColumn: "span 7" }}>
          <Panel
            title="Concentration"
            subtitle="Share of mark value by asset family, against the policy limit marked on each bar."
            aside={
              <Prov
                tier="derived"
                source="Mark values"
                asOf={ctx.snapshot.asOf}
                method="Native token, staked native and native-side liquidity positions are counted as one family, because they are one market."
              />
            }
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {ctx.exposure.map((row) => (
                <div key={row.key}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", fontSize: "0.75rem", marginBottom: "0.25rem" }}>
                    <span style={{ minWidth: 0 }}>{row.label}</span>
                    <Mono style={{ color: row.breach ? "var(--wl-breach)" : undefined }}>
                      {`${pct(row.pct)} of ${usdShort(ctx.markTotal)}`}
                    </Mono>
                  </div>
                  <div className={css.meter}>
                    <div
                      className={css.meterFill}
                      style={{ width: `${Math.min(100, row.pct)}%` }}
                      data-breach={row.breach ? "true" : undefined}
                    />
                    {row.limitPct !== undefined && (
                      <div className={css.meterLimit} style={{ left: `${Math.min(100, row.limitPct)}%` }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <KeyValue
                rows={[
                  {
                    k: "Herfindahl index (0–10,000)",
                    v: `${ctx.hhi.toFixed(0)}${ctx.hhi > 2500 ? " · concentrated" : ""}`,
                  },
                ]}
              />
            </div>
          </Panel>
        </div>

        <div style={{ gridColumn: "span 5" }}>
          <Panel
            title="Restricted holdings schedule"
            subtitle="Fair value, nature of the restriction, remaining duration and lapse condition — the four things ASU 2023-08 asks for in the notes to the accounts."
          >
            {restricted.length === 0 ? (
              <Note>No contractual sale restrictions in this workspace.</Note>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {restricted.map((h) => (
                  <div key={h.id}>
                    <Label>{h.symbol}</Label>
                    <KeyValue
                      rows={[
                        { k: "Fair value", v: usdShort(markUsd(h, snap)) },
                        { k: "Nature", v: h.restriction?.kind ?? "—" },
                        { k: "Lapses", v: h.restriction?.lapseDate ?? "—" },
                        { k: "Condition", v: h.restriction?.condition ?? "—" },
                      ]}
                    />
                  </div>
                ))}
                <Note>
                  Under fair-value rules this is still carried at price × quantity. The restriction
                  is disclosed in a note, not deducted from the number — which is exactly why a
                  treasury needs a separate view of what it can spend.
                </Note>
              </div>
            )}
          </Panel>
        </div>
      </div>

      <AssetDrawer
        holding={openHolding}
        siblings={openHolding ? poolSiblings(ctx.org, openHolding) : []}
        snapshot={ctx.snapshot}
        policy={ctx.policy}
        coverage={ctx.coverage}
        onClose={() => setOpenId(null)}
      />
    </div>
  )
}

/** Why a holding converts to less than its mark value — in words, never a colour. */
function reasonFor(h: { restriction?: unknown; capacityGroup?: string }, constrainedBy?: string) {
  if (constrainedBy) return constrainedBy
  if (h.restriction) return "contractual lock-up"
  if (h.capacityGroup)
    return `queued behind other ${h.capacityGroup} inventory — one market, one daily capacity`
  return "—"
}

function SortBtn({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      className={css.sortBtn}
      data-active={active ? "true" : undefined}
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
      {active ? " ↓" : ""}
    </button>
  )
}
