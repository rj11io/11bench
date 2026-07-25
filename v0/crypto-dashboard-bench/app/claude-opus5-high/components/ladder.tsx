"use client"

import * as React from "react"

import type { LadderRow } from "../lib/engine"
import { pct, usdShort } from "../lib/format"
import css from "../waterline.module.css"
import { ChartSummary, Label, Legend, Mono } from "./bits"

/**
 * The time-to-cash ladder.
 *
 * Each bucket is drawn twice, nested: the hatched outer length is mark value,
 * the solid inner length is realisable value. The gap between them is the
 * effective haircut, expressed as distance rather than as a percentage nobody
 * reads. Built in CSS rather than a charting library so the nesting is exact
 * and the labels reflow on a narrow screen.
 */
export function TimeToCashLadder({
  rows,
  onPickBucket,
}: {
  rows: LadderRow[]
  onPickBucket?: (bucket: string) => void
}) {
  const [open, setOpen] = React.useState<string | null>(null)
  const shown = rows.filter((r) => r.markUsd > 0)
  const max = Math.max(1, ...shown.map((r) => r.markUsd))
  const totalMark = shown.reduce((s, r) => s + r.markUsd, 0)
  const totalReal = shown.reduce((s, r) => s + r.realisableUsd, 0)

  if (shown.length === 0) {
    return (
      <p className={css.panelSub}>
        No holdings yet. Add a watched address and the ladder will show how many days
        each part of the treasury takes to become spendable.
      </p>
    )
  }

  return (
    <div>
      <ChartSummary>
        {`Treasury of ${usdShort(totalMark)} at accounting mark value converts to ${usdShort(totalReal)} of cash inside the twelve-month horizon. ` +
          shown
            .map(
              (r) =>
                `${r.label}: ${usdShort(r.markUsd)} mark, ${usdShort(r.realisableUsd)} realisable.`
            )
            .join(" ")}
      </ChartSummary>

      <div className={css.ladder} aria-hidden="true">
        {shown.map((row) => {
          const isOpen = open === row.bucket
          const haircut = row.markUsd > 0 ? (1 - row.realisableUsd / row.markUsd) * 100 : 0
          return (
            <div key={row.bucket}>
              <button
                type="button"
                className={css.ladderRow}
                data-open={isOpen ? "true" : undefined}
                data-locked={row.bucket === "locked" ? "true" : undefined}
                onClick={() => {
                  setOpen(isOpen ? null : row.bucket)
                  onPickBucket?.(row.bucket)
                }}
                aria-expanded={isOpen}
              >
                <span className={css.ladderBucket}>{row.short}</span>
                <span className={css.ladderTrack}>
                  <span
                    className={css.ladderMark}
                    style={{ width: `${(row.markUsd / max) * 100}%` }}
                  />
                  <span
                    className={css.ladderReal}
                    style={{ width: `${(row.realisableUsd / max) * 100}%` }}
                  />
                </span>
                <span className={css.ladderNums}>
                  <Mono>
                    <strong style={{ color: "var(--wl-liquid)" }}>
                      {usdShort(row.realisableUsd)}
                    </strong>
                    <span style={{ color: "var(--color-muted-foreground)" }}>
                      {` / ${usdShort(row.markUsd)}`}
                    </span>
                  </Mono>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      color: haircut > 50 ? "var(--wl-breach)" : "var(--color-muted-foreground)",
                    }}
                  >
                    {`${pct(haircut, 0)} haircut`}
                  </span>
                </span>
              </button>
              {isOpen && (
                <div className={css.ladderDetail}>
                  <Label>{row.label}</Label>
                  <ul style={{ margin: "0.375rem 0 0", padding: 0, listStyle: "none" }}>
                    {row.holdings.map((h, i) => (
                      <li
                        key={`${h.symbol}-${i}`}
                        style={{ display: "flex", gap: "0.5rem", justifyContent: "space-between" }}
                      >
                        <span style={{ minWidth: 0 }}>
                          {h.symbol}
                          {h.note ? (
                            <span style={{ color: "var(--color-muted-foreground)" }}>
                              {` — ${h.note}`}
                            </span>
                          ) : null}
                        </span>
                        <Mono style={{ whiteSpace: "nowrap" }}>
                          {`${usdShort(h.realisableUsd)} / ${usdShort(h.markUsd)}`}
                        </Mono>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: "0.75rem" }}>
        <Legend
          items={[
            { colour: "var(--wl-liquid)", label: "realisable cash" },
            { colour: "var(--wl-mark)", label: "mark value only (hatched)", dashed: true },
          ]}
        />
      </div>
    </div>
  )
}
