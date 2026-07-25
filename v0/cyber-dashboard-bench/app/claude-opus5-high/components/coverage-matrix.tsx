"use client"

import * as React from "react"

import styles from "../assay.module.css"
import { STATE_META, STATE_ORDER } from "../lib/scoring"
import { TACTICS } from "../lib/seed"
import type { AssuranceState, DerivedFinding, Tier } from "../lib/types"
import { Panel, cx, stateClass } from "./primitives"

export function CoverageMatrix({
  findings,
  tier,
  onTier,
  stateFilter,
  onStateFilter,
  onOpen,
}: {
  findings: DerivedFinding[]
  tier: "all" | Tier
  onTier: (tier: "all" | Tier) => void
  stateFilter: "all" | AssuranceState
  onStateFilter: (state: "all" | AssuranceState) => void
  onOpen: (finding: DerivedFinding) => void
}) {
  const visible = findings.filter(
    (f) =>
      (tier === "all" || f.technique.tier === tier) &&
      (stateFilter === "all" || f.state === stateFilter)
  )
  const byTactic = new Map<string, DerivedFinding[]>()
  for (const f of visible) {
    const list = byTactic.get(f.tactic.id) ?? []
    list.push(f)
    byTactic.set(f.tactic.id, list)
  }

  const counts = STATE_ORDER.map((state) => ({
    state,
    count: visible.filter((f) => f.state === state).length,
  }))

  return (
    <Panel
      id="matrix"
      title="Technique landscape"
      meta={`${visible.length} techniques · coloured by assurance state`}
      actions={
        <div className={styles.chromeGroup}>
          <label className={styles.field}>
            <span>Tier</span>
            <select
              value={String(tier)}
              onChange={(e) =>
                onTier(
                  e.target.value === "all" ? "all" : (Number(e.target.value) as Tier)
                )
              }
            >
              <option value="all">All</option>
              <option value="1">Tier 1</option>
              <option value="2">Tier 2</option>
              <option value="3">Tier 3</option>
            </select>
          </label>
          <label className={styles.field}>
            <span>State</span>
            <select
              value={stateFilter}
              onChange={(e) =>
                onStateFilter(e.target.value as "all" | AssuranceState)
              }
            >
              <option value="all">All</option>
              {STATE_ORDER.map((s) => (
                <option key={s} value={s}>
                  {STATE_META[s].label}
                </option>
              ))}
            </select>
          </label>
        </div>
      }
    >
      <div className={cx(styles.legend, styles.legendInline)}>
        {counts.map((c) => (
          <button
            type="button"
            key={c.state}
            className={cx(styles.legendItem, stateClass(c.state))}
            data-active={stateFilter === c.state ? "true" : undefined}
            onClick={() =>
              onStateFilter(stateFilter === c.state ? "all" : c.state)
            }
            title={STATE_META[c.state].blurb}
          >
            <span className={styles.legendSwatch} aria-hidden="true" />
            <span className={styles.glyph} aria-hidden="true">
              {STATE_META[c.state].glyph}
            </span>
            {STATE_META[c.state].label}
            <span className={styles.legendCount}>{c.count}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className={styles.emptyText}>
          No techniques match this tier and state combination. Clear the state
          filter to see the whole landscape.
        </p>
      ) : (
        <table className={styles.matrix}>
          <caption>
            Techniques grouped by ATT&amp;CK tactic. Each cell carries its
            technique ID and the glyph for its assurance state, so the grid reads
            without colour. A hatched cell means no detection content exists at
            all. A bar across the top of a cell marks a tier-1 technique.
          </caption>
          <tbody>
            {TACTICS.filter((t) => (byTactic.get(t.id) ?? []).length > 0).map(
              (tactic) => {
                const list = (byTactic.get(tactic.id) ?? []).slice().sort(
                  (a, b) =>
                    a.technique.tier - b.technique.tier ||
                    a.technique.id.localeCompare(b.technique.id)
                )
                const tacticCounts = STATE_ORDER.map((state) => ({
                  state,
                  count: list.filter((f) => f.state === state).length,
                }))
                const verified = tacticCounts.find(
                  (c) => c.state === "verified"
                )!.count
                return (
                  <tr key={tactic.id}>
                    <th scope="row">
                      <span className={styles.tacticName}>{tactic.name}</span>
                      <span
                        className={styles.tacticBar}
                        role="img"
                        aria-label={`${verified} of ${list.length} verified`}
                      >
                        {tacticCounts
                          .filter((c) => c.count > 0)
                          .map((c) => (
                            <span
                              key={c.state}
                              className={cx(styles.compSeg, stateClass(c.state))}
                              data-state={c.state}
                              style={{ flex: `${c.count} 1 0` }}
                            />
                          ))}
                      </span>
                      <span className={styles.tacticCount}>
                        {`${verified}/${list.length} verified`}
                      </span>
                    </th>
                    <td>
                      <div className={styles.cellStrip}>
                        {list.map((f) => (
                          <button
                            type="button"
                            key={f.id}
                            className={cx(styles.cell, stateClass(f.state))}
                            data-state={f.state}
                            data-tier={f.technique.tier}
                            onClick={() => onOpen(f)}
                            aria-label={`${f.technique.id} ${f.technique.name} — ${STATE_META[f.state].label}, ${
                              f.evidenceAgeDays === null
                                ? "never validated"
                                : `last validated ${f.evidenceAgeDays} days ago`
                            }. Tier ${f.technique.tier}.`}
                          >
                            <span className={styles.cellId} aria-hidden="true">
                              {f.technique.id}
                            </span>
                            <span className={styles.cellGlyph} aria-hidden="true">
                              {STATE_META[f.state].glyph}
                            </span>
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      )}
    </Panel>
  )
}
