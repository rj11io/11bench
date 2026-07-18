"use client"

import * as React from "react"
import { ChevronDown, Layers, ShieldCheck, Wallet } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

import { PRICE_FEED_ASOF, PRICE_FEED_SOURCE, pegHistory } from "../../lib/data"
import { LIQUIDITY_LABEL, slippageBps } from "../../lib/calc"
import { fmtBps, fmtPct, fmtPrice, fmtQty, fmtUsd, fmtUsdFull } from "../../lib/format"
import { useGlidepath } from "../../lib/store"
import type { AssetClass, PositionRow, Snapshot } from "../../lib/types"
import styles from "../../glidepath.module.css"
import { Delta, EmptyState, Provenance, SectionTitle } from "../bits"
import { PegSparkline } from "../charts"

const CLASS_LABEL: Record<AssetClass, string> = {
  stable: "Stablecoin",
  major: "Major",
  staked: "Staked",
  own: "Own token",
}

const RISK_KIND_LABEL: Record<string, string> = {
  issuer: "Issuer",
  contract: "Contract",
  market: "Market",
  concentration: "Concentration",
}

function rowKey(r: PositionRow): string {
  return `${r.account.id}:${r.asset.id}`
}

function RowDetail({ row }: { row: PositionRow }) {
  const bps100k = slippageBps(row.asset.liquidity, 100_000)
  return (
    <div className="grid gap-4 py-1 text-xs sm:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-1.5">
        <div className="font-medium text-foreground">Custody</div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <ShieldCheck aria-hidden className="size-3.5" />
          {row.account.name}
          {row.account.threshold ? ` · ${row.account.threshold} signers` : " · read-only API"}
        </div>
        {row.account.addressShort ? (
          <div className="font-mono text-muted-foreground">
            {row.account.addressShort}{" "}
            <span className="font-sans">(named address-book entry — never copy from history)</span>
          </div>
        ) : null}
        <Provenance
          source={row.account.feed.source}
          asOf={row.account.feed.asOfLabel}
          stale={row.account.feed.stale}
        />
      </div>

      <div className="space-y-1.5">
        <div className="font-medium text-foreground">Liquidity & price</div>
        <div className="text-muted-foreground">
          {LIQUIDITY_LABEL[row.asset.liquidity]} liquidity — selling $100k moves the price
          about {fmtBps(bps100k)} (simulated depth).
        </div>
        <Provenance source={PRICE_FEED_SOURCE} asOf={PRICE_FEED_ASOF} />
        {row.asset.cls === "stable" && row.asset.pegTarget ? (
          <div className="pt-1">
            <div className="mb-1 text-muted-foreground">
              Peg, 30 days (gray band = ±50 bps tolerance):
            </div>
            <PegSparkline data={pegHistory(row.asset.id, row.price)} />
          </div>
        ) : null}
        {row.asset.regNote ? (
          <div className="text-muted-foreground">{row.asset.regNote}</div>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <div className="font-medium text-foreground">Risk notes</div>
        {row.asset.riskTags.map((t) => (
          <div key={t.kind + t.text} className="text-muted-foreground">
            <Badge variant="outline" className="mr-1.5 align-middle text-[10px]">
              {RISK_KIND_LABEL[t.kind]}
            </Badge>
            {t.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export function PositionsView({ snap }: { snap: Snapshot }) {
  const { org, seedFresh } = useGlidepath()
  const [accountFilter, setAccountFilter] = React.useState("all")
  const [chainFilter, setChainFilter] = React.useState("all")
  const [classFilter, setClassFilter] = React.useState("all")
  const [expanded, setExpanded] = React.useState<string | null>(null)

  if (org.accounts.length === 0) {
    return (
      <EmptyState
        icon={Layers}
        title="No positions to show"
        body="Once a custody account is added, every position appears here with its price source, liquidity, and risk notes."
        action={
          <Button onClick={seedFresh}>
            <Wallet aria-hidden data-icon="inline-start" />
            Load sample custody accounts (demo)
          </Button>
        }
      />
    )
  }

  const chains = [...new Set(org.accounts.map((a) => a.chain))]
  const rows = snap.rows.filter(
    (r) =>
      (accountFilter === "all" || r.account.id === accountFilter) &&
      (chainFilter === "all" || r.account.chain === chainFilter) &&
      (classFilter === "all" || r.asset.cls === classFilter)
  )
  const filteredTotal = rows.reduce((s, r) => s + r.valueUsd, 0)
  const filtering = accountFilter !== "all" || chainFilter !== "all" || classFilter !== "all"

  const toggle = (key: string) => setExpanded((e) => (e === key ? null : key))

  return (
    <Card>
      <CardHeader className="space-y-3">
        <SectionTitle
          title="Positions"
          hint={`${rows.length} position${rows.length === 1 ? "" : "s"} · ${fmtUsd(filteredTotal)}${
            filtering ? " (filtered)" : ""
          } · prices at ${PRICE_FEED_ASOF}`}
        />
        <div className="flex flex-wrap items-center gap-2">
          <NativeSelect
            size="sm"
            aria-label="Filter by custody account"
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value)}
          >
            <NativeSelectOption value="all">All custody</NativeSelectOption>
            {org.accounts.map((a) => (
              <NativeSelectOption key={a.id} value={a.id}>
                {a.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <NativeSelect
            size="sm"
            aria-label="Filter by chain"
            value={chainFilter}
            onChange={(e) => setChainFilter(e.target.value)}
          >
            <NativeSelectOption value="all">All chains</NativeSelectOption>
            {chains.map((c) => (
              <NativeSelectOption key={c} value={c}>
                {c}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <NativeSelect
            size="sm"
            aria-label="Filter by asset class"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <NativeSelectOption value="all">All classes</NativeSelectOption>
            {(Object.keys(CLASS_LABEL) as AssetClass[]).map((c) => (
              <NativeSelectOption key={c} value={c}>
                {CLASS_LABEL[c]}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          {filtering ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setAccountFilter("all")
                setChainFilter("all")
                setClassFilter("all")
              }}
            >
              Clear filters
            </Button>
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <EmptyState
            icon={Layers}
            title="Nothing matches these filters"
            body="Try clearing a filter — the positions are still here."
            className="py-8"
          />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <Table className={styles.nums}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Custody</TableHead>
                    <TableHead>Chain</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">24h</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">Share</TableHead>
                    <TableHead className="w-8" aria-label="Expand" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => {
                    const key = rowKey(r)
                    const isOpen = expanded === key
                    return (
                      <React.Fragment key={key}>
                        <TableRow
                          className="cursor-pointer"
                          onClick={() => toggle(key)}
                          aria-expanded={isOpen}
                        >
                          <TableCell>
                            <span className="font-medium">{r.asset.symbol}</span>{" "}
                            <span className="text-xs text-muted-foreground">{r.asset.name}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-[10px]">
                              {CLASS_LABEL[r.asset.cls]}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{r.account.name}</TableCell>
                          <TableCell className="text-muted-foreground">{r.account.chain}</TableCell>
                          <TableCell className="text-right font-mono">{fmtQty(r.position.qty)}</TableCell>
                          <TableCell className="text-right font-mono">{fmtPrice(r.price)}</TableCell>
                          <TableCell className="text-right">
                            <Delta pct={r.change24hPct} dp={Math.abs(r.change24hPct) < 0.1 ? 2 : 1} />
                          </TableCell>
                          <TableCell className="text-right font-mono" title={fmtUsdFull(r.valueUsd)}>
                            {fmtUsd(r.valueUsd)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-muted-foreground">
                            {fmtPct(r.shareOfTreasuryPct)}
                          </TableCell>
                          <TableCell>
                            <ChevronDown
                              aria-hidden
                              className={cn(
                                "size-4 text-muted-foreground transition-transform",
                                isOpen && "rotate-180"
                              )}
                            />
                          </TableCell>
                        </TableRow>
                        {isOpen ? (
                          <TableRow className="bg-muted/40 hover:bg-muted/40">
                            <TableCell colSpan={10} className="whitespace-normal">
                              {/* w-0 + min-w-full keeps this wide cell from inflating the table's layout */}
                              <div className="w-0 min-w-full">
                                <RowDetail row={r} />
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : null}
                      </React.Fragment>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Mobile stacked cards */}
            <div className="space-y-2 md:hidden">
              {rows.map((r) => {
                const key = rowKey(r)
                const isOpen = expanded === key
                return (
                  <div key={key} className="rounded-lg border">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
                      onClick={() => toggle(key)}
                      aria-expanded={isOpen}
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">
                          {r.asset.symbol}{" "}
                          <Badge variant="secondary" className="ml-1 align-middle text-[10px]">
                            {CLASS_LABEL[r.asset.cls]}
                          </Badge>
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {r.account.name} · {r.account.chain}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="text-right">
                          <span className={cn(styles.nums, "block font-mono text-sm")}>
                            {fmtUsd(r.valueUsd)}
                          </span>
                          <Delta pct={r.change24hPct} dp={Math.abs(r.change24hPct) < 0.1 ? 2 : 1} />
                        </span>
                        <ChevronDown
                          aria-hidden
                          className={cn(
                            "size-4 text-muted-foreground transition-transform",
                            isOpen && "rotate-180"
                          )}
                        />
                      </span>
                    </button>
                    {isOpen ? (
                      <div className="border-t px-3 py-2">
                        <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className={styles.nums}>
                            Qty <span className="font-mono">{fmtQty(r.position.qty)}</span>
                          </span>
                          <span className={styles.nums}>
                            Price <span className="font-mono">{fmtPrice(r.price)}</span>
                          </span>
                          <span className={styles.nums}>
                            Share <span className="font-mono">{fmtPct(r.shareOfTreasuryPct)}</span>
                          </span>
                        </div>
                        <RowDetail row={r} />
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
