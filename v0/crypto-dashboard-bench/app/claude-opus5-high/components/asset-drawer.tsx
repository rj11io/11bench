"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import type { Coverage, Holding, Policy, Snapshot } from "../lib/engine"
import {
  capacityFor,
  collateralView,
  depthOf,
  impactForSize,
  markUsd,
  mergeDepth,
  priceAsOfFor,
  priceOf,
  sellableView,
  settleDaysOf,
  sizeAtCap,
  tradableRoutes,
} from "../lib/engine"
import { bps, days, pct, price, qty, stamp, usdShort } from "../lib/format"
import css from "../waterline.module.css"
import { ChartSummary, KeyValue, Label, Legend, Mono, Note, Panel, Prov } from "./bits"
import { ExitCurve } from "./charts"

export function AssetDrawer({
  holding,
  siblings,
  snapshot,
  policy,
  coverage,
  onClose,
}: {
  holding: Holding | null
  /** Other holdings sharing this one's market capacity. */
  siblings: Holding[]
  snapshot: Snapshot
  policy: Policy
  coverage: Coverage
  onClose: () => void
}) {
  const open = holding !== null

  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent
        side="right"
        className={`${css.tokens} gap-3 data-[side=right]:sm:max-w-[34rem]`}
      >
        {holding && (
          <Body
            holding={holding}
            siblings={siblings}
            snapshot={snapshot}
            policy={policy}
            coverage={coverage}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}

function Body({
  holding: h,
  siblings,
  snapshot,
  policy,
  coverage,
}: {
  holding: Holding
  siblings: Holding[]
  snapshot: Snapshot
  policy: Policy
  coverage: Coverage
}) {
  const snap = snapshot.id
  const view = sellableView(h, snap, policy)
  const mv = markUsd(h, snap)
  const realisable = coverage.supply
    .filter((l) => l.holdingId === h.id)
    .reduce((s, l) => s + l.totalUsd, 0)
  const haircut = mv > 0 ? (1 - realisable / mv) * 100 : 0

  const group = h.capacityGroup ?? h.id
  const pool = h.capacityGroup ? [h, ...siblings.filter((s) => s.id !== h.id)] : [h]
  const routes = tradableRoutes(pool)
  const book = routes.length > 0 ? mergeDepth(routes, snap) : []
  const cap = capacityFor(pool, snap, policy)
  const cv = collateralView(h, snap, policy.minHealthFactor)

  const poolInventory = pool.reduce((s, x) => s + markUsd(x, snap), 0)
  const curveMax = book.length > 0 ? Math.max(book[book.length - 1].cumUsd * 1.9, mv * 0.06) : 0
  const wholePosition = book.length > 0 ? impactForSize(book, mv) : null
  const capSize = book.length > 0 ? sizeAtCap(book, policy.maxSlippageBps) : 0

  return (
    <>
      <SheetHeader className="gap-1 pb-0">
        <div className="flex flex-wrap items-center gap-2">
          <SheetTitle className="text-base">{h.symbol}</SheetTitle>
          <Badge variant="outline">{h.assetClass}</Badge>
          <Badge variant="ghost">{h.chain}</Badge>
        </div>
        <SheetDescription className="text-xs">
          {h.name} · {h.custody} · seeded demo holding
        </SheetDescription>
      </SheetHeader>

      <div className={css.drawerScroll}>
        {/* --- the two numbers, side by side, always ------------------------ */}
        <div className={css.statGrid}>
          <div className={css.stat}>
            <Label>Accounting mark</Label>
            <div className={css.statValue} style={{ color: "var(--color-muted-foreground)" }}>
              {usdShort(mv)}
            </div>
            <div className={css.statNote}>
              {`${qty(h.qty, h.unit)} × ${price(priceOf(h, snap))}`}
              <br />
              No size discount, per ASC 820.
            </div>
          </div>
          <div className={css.stat}>
            <Label>Realisable in 12 months</Label>
            <div className={css.statValue} style={{ color: "var(--wl-liquid)" }}>
              {usdShort(realisable)}
            </div>
            <div className={css.statNote}>
              {`After impact and fees, inside policy limits. Effective haircut ${pct(haircut, 0)}.`}
            </div>
          </div>
        </div>

        <Panel title="Time to cash" subtitle={h.settleNote}>
          <KeyValue
            rows={[
              { k: "Settlement on the default route", v: days(settleDaysOf(h, snap)) },
              {
                k: "Bucket",
                v: view.bucket === "locked" ? "locked / over 90 days" : view.bucket.replace("t", "T+").replace("_", "–"),
              },
              ...(h.restriction
                ? [
                    { k: "Restriction", v: h.restriction.kind },
                    { k: "Lapses", v: h.restriction.lapseDate },
                    { k: "Lapse condition", v: h.restriction.condition },
                  ]
                : []),
            ]}
          />
          {h.settleSource?.url && (
            <p style={{ marginTop: "0.5rem", fontSize: "0.6875rem" }}>
              <span style={{ color: "var(--color-muted-foreground)" }}>Modelled on: </span>
              <a
                className={css.linkish}
                href={h.settleSource.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {h.settleSource.label}
              </a>
            </p>
          )}
          {h.restriction && (
            <Note kind="warn">
              This is the shape ASU 2023-08 asks for in the notes to the accounts: fair value,
              nature of the restriction, remaining duration, and what makes it lapse.
            </Note>
          )}
        </Panel>

        {/* --- exit cost ---------------------------------------------------- */}
        {book.length > 0 ? (
          <Panel
            title="What selling costs"
            subtitle="Price given up on the last unit, against order size, read off the merged depth ladder below."
            aside={
              <Prov
                tier="observed"
                source={`${routes.length} venue${routes.length === 1 ? "" : "s"} · depth ladder`}
                asOf={snapshot.asOf}
                refreshMins={1}
                method="Order-book depth in basis-point bands, the shape Kaiko's market-depth endpoint returns (30-second snapshots)."
              />
            }
          >
            <ChartSummary>
              {`Selling ${usdShort(capSize)} in one go stays inside the ${policy.maxSlippageBps} basis point policy cap. ` +
                (wholePosition
                  ? `Selling the whole ${usdShort(mv)} position at once would give up about ${bps(wholePosition.avgBps)} on average${wholePosition.extrapolated ? ", a modelled figure because it goes beyond the visible order book" : ""}.`
                  : "")}
            </ChartSummary>
            <ExitCurve
              book={book}
              maxSize={curveMax}
              capBps={policy.maxSlippageBps}
              markers={[{ size: Math.min(capSize, curveMax), label: "largest slice inside the cap" }]}
            />
            <div style={{ marginTop: "0.5rem" }}>
              <Legend
                items={[
                  { colour: "var(--wl-liquid)", label: "observed book" },
                  { colour: "var(--wl-modelled)", label: "modelled beyond the book", dashed: true },
                ]}
              />
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <KeyValue
                rows={[
                  {
                    k: `Largest slice inside the ${policy.maxSlippageBps} bps cap`,
                    v: usdShort(capSize),
                  },
                  {
                    k: `Per day (${policy.twapSlicesPerDay} slices, ${cap.participationPct.toFixed(0)}% of volume)`,
                    v: usdShort(cap.perDayUsd),
                  },
                  { k: "Per month (21 trading days)", v: usdShort(cap.perMonthUsd) },
                  { k: "Binding rule", v: cap.binding === "participation" ? "participation cap" : "slippage cap" },
                  {
                    k: "Whole position at once",
                    v: wholePosition
                      ? `${bps(wholePosition.avgBps)}${wholePosition.extrapolated ? " (modelled)" : ""}`
                      : "—",
                  },
                ]}
              />
            </div>
            {h.capacityGroup && (
              <Note kind="warn">
                {`${h.symbol} shares one market with every other unit of the same token — liquid, staked, locked and pooled. Total inventory in that pool is ${usdShort(poolInventory)} against ${usdShort(cap.perMonthUsd)} a month of capacity, so it takes about ${Math.ceil(poolInventory / Math.max(cap.perMonthUsd, 1))} months to clear. Unstaking or unlocking adds inventory, not capacity.`}
              </Note>
            )}
          </Panel>
        ) : (
          <Panel
            title="How this converts"
            subtitle="No order book is involved, so there is no price impact to model."
          >
            <KeyValue
              rows={[
                { k: "Route", v: h.routes[0]?.venue ?? "—" },
                { k: "Fee", v: bps(h.routes[0]?.feeBps ?? 0) },
                { k: "Settlement", v: days(settleDaysOf(h, snap)) },
              ]}
            />
            <Note>
              Redeeming at par removes market risk and replaces it with issuer and counterparty
              risk. That is a different risk, not a smaller one.
            </Note>
          </Panel>
        )}

        {/* --- routes ------------------------------------------------------- */}
        <Panel
          title="Routes"
          subtitle="Every venue this holding can leave through, with its own fee, volume and depth."
        >
          <div className={css.tableWrap}>
            <table className={css.dataTable}>
              <thead>
                <tr>
                  <th>Venue</th>
                  <th>Kind</th>
                  <th data-align="right">Fee</th>
                  <th data-align="right">Daily volume</th>
                  <th data-align="right">Depth ≤ 100 bps</th>
                </tr>
              </thead>
              <tbody>
                {h.routes.map((r) => {
                  const d = depthOf(r, snap)
                  const at100 = d.find((b) => b.bps === 100)?.cumUsd
                  return (
                    <tr key={r.id}>
                      <td>{r.venue}</td>
                      <td style={{ color: "var(--color-muted-foreground)" }}>{r.kind}</td>
                      <td data-align="right" className={css.mono}>
                        {bps(r.feeBps)}
                      </td>
                      <td data-align="right" className={css.mono}>
                        {r.advUsd > 0 ? usdShort(r.advUsd) : "—"}
                      </td>
                      <td data-align="right" className={css.mono}>
                        {at100 !== undefined ? usdShort(at100) : "—"}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {h.routes.some((r) => r.note) && (
            <ul style={{ margin: "0.625rem 0 0", paddingLeft: "1rem", fontSize: "0.6875rem", color: "var(--color-muted-foreground)", lineHeight: 1.55 }}>
              {h.routes
                .filter((r) => r.note)
                .map((r) => (
                  <li key={r.id}>
                    <strong>{r.venue}:</strong> {r.note}
                  </li>
                ))}
            </ul>
          )}
        </Panel>

        {/* --- depth ladder ------------------------------------------------- */}
        {book.length > 0 && (
          <Panel
            title="Depth ladder"
            subtitle="Cumulative notional available on the bid side within each distance from the best bid, summed across allowlisted venues."
          >
            <div className={css.tableWrap}>
              <table className={css.dataTable}>
                <thead>
                  <tr>
                    <th data-align="right">Within</th>
                    <th data-align="right">Cumulative bids</th>
                    <th data-align="right">Days of capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {book.map((b) => (
                    <tr key={b.bps}>
                      <td data-align="right" className={css.mono}>
                        {bps(b.bps)}
                      </td>
                      <td data-align="right" className={css.mono}>
                        {usdShort(b.cumUsd)}
                      </td>
                      <td data-align="right" className={css.mono} style={{ color: "var(--color-muted-foreground)" }}>
                        {cap.perDayUsd > 0 ? (b.cumUsd / cap.perDayUsd).toFixed(1) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )}

        {/* --- collateral --------------------------------------------------- */}
        {cv && (
          <Panel
            title="Pledged collateral"
            subtitle="Only the part above the health-factor floor can leave. The rest is pinned by the debt."
          >
            <KeyValue
              rows={[
                { k: "Collateral", v: usdShort(cv.collateralUsd) },
                { k: `Debt (${h.debt?.symbol})`, v: usdShort(cv.debtUsd) },
                { k: "Liquidation threshold", v: pct((h.debt?.liquidationThreshold ?? 0) * 100, 0) },
                {
                  k: "Health factor",
                  v: Number.isFinite(cv.healthFactor) ? cv.healthFactor.toFixed(2) : "no debt",
                },
                { k: `Policy floor`, v: policy.minHealthFactor.toFixed(2) },
                { k: "Withdrawable", v: usdShort(cv.withdrawableUsd) },
                { k: "Pinned", v: usdShort(cv.pinnedUsd) },
              ]}
            />
            <Note kind={cv.healthFactor < policy.minHealthFactor ? "danger" : "info"}>
              Health factor is collateral × liquidation threshold ÷ debt, and liquidation begins
              below 1.00 (
              <a
                className={css.linkish}
                href="https://aave.com/help/borrowing/liquidations"
                target="_blank"
                rel="noreferrer noopener"
              >
                Aave&rsquo;s published definition
              </a>
              ). Raising the floor in Policy reduces what can be withdrawn, immediately.
            </Note>
          </Panel>
        )}

        {/* --- stablecoin specifics ---------------------------------------- */}
        {h.assetClass === "stable" && (
          <Panel title="Peg and reserve disclosure">
            <KeyValue
              rows={[
                {
                  k: "Trading against par",
                  v: `${(snap === "stressed" ? (h.pegBpsStress ?? 0) : (h.pegBps ?? 0)).toFixed(0)} bps`,
                },
                {
                  k: "Reserve report",
                  v:
                    h.reserveDisclosure === "monthly-attested"
                      ? "monthly, accountant-examined"
                      : h.reserveDisclosure === "quarterly-unattested"
                        ? "quarterly, not examined"
                        : "none published",
                },
              ]}
            />
            <Note kind={h.reserveDisclosure === "monthly-attested" ? "info" : "danger"}>
              Both the US GENIUS Act and MiCA require permitted issuers to publish reserve
              composition on a monthly cycle. An issuer that does not is a concentration risk with
              its own policy limit, however close to a dollar it happens to trade today.
            </Note>
          </Panel>
        )}

        {/* --- provenance and notes ---------------------------------------- */}
        <Panel title="Provenance">
          <KeyValue
            rows={[
              { k: "Price source", v: h.priceSource.label },
              { k: "Price as of", v: stamp(priceAsOfFor(h, snapshot.asOf)) },
              {
                k: "Expected refresh",
                v:
                  h.priceHeartbeatMins < 60
                    ? `${h.priceHeartbeatMins} min`
                    : `${Math.round(h.priceHeartbeatMins / 60)} h`,
              },
              { k: "Snapshot", v: `${snapshot.label} (seeded)` },
            ]}
          />
          {h.notes && h.notes.length > 0 && (
            <ul style={{ margin: "0.625rem 0 0", paddingLeft: "1rem", fontSize: "0.75rem", lineHeight: 1.6 }}>
              {h.notes.map((n, i) => (
                <li key={i} style={{ marginBottom: "0.25rem" }}>
                  {n}
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <p style={{ fontSize: "0.625rem", color: "var(--color-muted-foreground)", lineHeight: 1.6 }}>
          <Mono>{group}</Mono>
          {" market pool · every figure on this panel is seeded demo data, not a live quote."}
        </p>
      </div>
    </>
  )
}
