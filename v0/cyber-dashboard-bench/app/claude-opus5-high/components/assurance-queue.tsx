"use client"

import * as React from "react"

import styles from "../assay.module.css"
import { formatDate, plural, relative } from "../lib/format"
import { FIX_META, STATE_META } from "../lib/scoring"
import { NOW, TACTICS } from "../lib/seed"
import { DEFAULT_FILTERS, type QueueFilters } from "../lib/store"
import type { AssuranceState, DerivedFinding, Tier } from "../lib/types"
import { Btn, Empty, StateChip, cx, stateClass } from "./primitives"

/** Only states a finding can hold while it is still open. Verified and accepted
 *  findings leave the queue, so offering them here would be a dead end. */
const STATES: AssuranceState[] = ["broken", "blind", "assumed", "decaying"]

export function AssuranceQueue({
  rows,
  totalOpen,
  filters,
  onFilters,
  onClearFilters,
  cursor,
  onCursor,
  selected,
  onToggleSelect,
  onClearSelection,
  onOpen,
  onBulkAssign,
  settling,
  canWrite,
  hydrated,
}: {
  rows: DerivedFinding[]
  totalOpen: number
  filters: QueueFilters
  onFilters: (patch: Partial<QueueFilters>) => void
  onClearFilters: () => void
  cursor: number
  onCursor: (index: number) => void
  selected: string[]
  onToggleSelect: (id: string) => void
  onClearSelection: () => void
  onOpen: (finding: DerivedFinding) => void
  onBulkAssign: () => void
  settling: string[]
  canWrite: boolean
  hydrated: boolean
}) {
  const filtersActive =
    filters.tier !== DEFAULT_FILTERS.tier ||
    filters.state !== DEFAULT_FILTERS.state ||
    filters.tactic !== DEFAULT_FILTERS.tactic ||
    filters.query !== "" ||
    filters.onlyMine ||
    filters.blockedBy !== null

  return (
    <section className={styles.panel} aria-labelledby="queue-title">
      <div className={styles.panelHead}>
        <h2 className={styles.panelTitle} id="queue-title">
          Assurance queue
          <span className={styles.micro}>
            {`${plural(rows.length, "finding")} · ranked by priority`}
          </span>
        </h2>
        <span className={styles.micro}>
          <kbd className={styles.kbd}>↑</kbd> <kbd className={styles.kbd}>↓</kbd>{" "}
          move · <kbd className={styles.kbd}>↵</kbd> open ·{" "}
          <kbd className={styles.kbd}>x</kbd> select
        </span>
      </div>

      <div className={styles.toolbar}>
        <label className={cx(styles.field, styles.searchField)}>
          <span aria-hidden="true">⌕</span>
          <span className={styles.srOnly}>Search findings</span>
          <input
            type="search"
            value={filters.query}
            placeholder="Technique, ID, tactic…"
            onChange={(e) => onFilters({ query: e.target.value })}
          />
        </label>

        <label className={styles.field}>
          <span>Tier</span>
          <select
            value={String(filters.tier)}
            onChange={(e) =>
              onFilters({
                tier:
                  e.target.value === "all"
                    ? "all"
                    : (Number(e.target.value) as Tier),
              })
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
            value={filters.state}
            onChange={(e) =>
              onFilters({ state: e.target.value as QueueFilters["state"] })
            }
          >
            <option value="all">All</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {STATE_META[s].label}
              </option>
            ))}
          </select>
        </label>

        <label className={cx(styles.field, styles.hideSm)}>
          <span>Tactic</span>
          <select
            value={filters.tactic}
            onChange={(e) => onFilters({ tactic: e.target.value })}
          >
            <option value="all">All</option>
            {TACTICS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.short}
              </option>
            ))}
          </select>
        </label>

        <label className={cx(styles.field, styles.hideSm)}>
          <input
            type="checkbox"
            className={styles.check}
            aria-label="Only findings assigned to me"
            checked={filters.onlyMine}
            onChange={(e) => onFilters({ onlyMine: e.target.checked })}
          />
          <span>Mine</span>
        </label>

        {filters.blockedBy ? (
          <button
            type="button"
            className={styles.iconBtn}
            data-active="true"
            onClick={() => onFilters({ blockedBy: null })}
          >
            {`blocked by ${filters.blockedBy} ✕`}
          </button>
        ) : null}

        {filtersActive ? (
          <button type="button" className={styles.iconBtn} onClick={onClearFilters}>
            Clear filters
          </button>
        ) : null}
      </div>

      {!hydrated ? (
        <SkeletonQueue />
      ) : rows.length === 0 ? (
        filters.onlyMine ? (
          <Empty
            glyph="◇"
            title="Nothing is assigned to you"
            action={
              <Btn
                variant="accent"
                onClick={() => onFilters({ onlyMine: false })}
              >
                Show the whole queue
              </Btn>
            }
          >
            {`${plural(totalOpen, "finding")} ${totalOpen === 1 ? "is" : "are"} open across the team, none of them owned by you. Unowned work is the normal starting state — pick one and assign it to yourself.`}
          </Empty>
        ) : filtersActive ? (
          <Empty
            glyph="⌕"
            title="No findings match these filters"
            action={
              <Btn variant="accent" onClick={onClearFilters}>
                Clear filters
              </Btn>
            }
          >
            {`The queue holds ${plural(totalOpen, "open finding")}, but none of them match the current tier, state, tactic and search combination.`}
          </Empty>
        ) : (
          <Empty glyph="✓" title="Queue clear — every gap is decided">
            Nothing is open. That is a moment, not a finish line: evidence decays
            on a clock, so techniques will return to this queue as their
            freshness windows expire. Check the coverage map to see what is
            closest to the edge.
          </Empty>
        )
      ) : (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className={styles.srOnly}>
                Assurance findings, ranked by priority. Each row gives the
                priority score, technique, assurance state, evidence age, fix
                class and owner.
              </caption>
              <thead>
                <tr>
                  <th scope="col" className={styles.checkCell}>
                    <span className={styles.srOnly}>Select</span>
                  </th>
                  <th scope="col">Priority</th>
                  <th scope="col">Technique</th>
                  <th scope="col">State</th>
                  <th scope="col" className={styles.hideMd}>
                    Why
                  </th>
                  <th scope="col">Fix</th>
                  <th scope="col" className={styles.hideMd}>
                    Owner
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((f, i) => (
                  <tr
                    key={f.id}
                    className={cx(styles.row, stateClass(f.state))}
                    data-cursor={i === cursor ? "true" : undefined}
                    data-selected={selected.includes(f.id) ? "true" : undefined}
                    data-settling={settling.includes(f.id) ? "true" : undefined}
                    onClick={() => {
                      onCursor(i)
                      onOpen(f)
                    }}
                  >
                    <td className={styles.checkCell}>
                      <input
                        type="checkbox"
                        className={styles.check}
                        checked={selected.includes(f.id)}
                        aria-label={`Select ${f.technique.id}`}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => onToggleSelect(f.id)}
                      />
                    </td>
                    <td className={styles.scoreCell}>
                      <span className={styles.score}>
                        <span className={styles.scoreNum}>{f.priority}</span>
                        <TermBar finding={f} />
                      </span>
                    </td>
                    <td className={styles.techCell}>
                      <span className={styles.techId}>{f.technique.id}</span>{" "}
                      <span className={styles.tierTag} data-tier={f.technique.tier}>
                        {`T${f.technique.tier}`}
                      </span>
                      <button
                        type="button"
                        className={styles.rowOpen}
                        aria-label={`Open evidence for ${f.technique.id} ${f.technique.name} — ${STATE_META[f.state].label}, priority ${f.priority}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onCursor(i)
                          onOpen(f)
                        }}
                      >
                        <span className={styles.techName}>
                          {f.technique.name}
                        </span>
                      </button>
                    </td>
                    <td>
                      <StateChip state={f.state} ageDays={f.evidenceAgeDays} />
                    </td>
                    <td className={cx(styles.reasonCell, styles.hideMd)}>
                      {f.reason}
                    </td>
                    <td>
                      <span className={styles.micro}>
                        {FIX_META[f.fixClass].label}
                      </span>
                    </td>
                    <td className={cx(styles.ownerCell, styles.hideMd)}>
                      {f.owner ? (
                        <>
                          {f.owner}
                          {f.dueAt ? (
                            <span className={styles.techId}>
                              {` · ${relative(f.dueAt, NOW)}`}
                            </span>
                          ) : null}
                        </>
                      ) : (
                        <span className={styles.techId}>unassigned</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.cards}>
            {rows.map((f, i) => (
              <button
                type="button"
                key={f.id}
                className={styles.card}
                data-cursor={i === cursor ? "true" : undefined}
                onClick={() => {
                  onCursor(i)
                  onOpen(f)
                }}
              >
                <span className={cx(styles.cardTop, stateClass(f.state))}>
                  <span className={styles.scoreNum}>{f.priority}</span>
                  <StateChip state={f.state} ageDays={f.evidenceAgeDays} />
                </span>
                <span>
                  <span className={styles.techId}>{f.technique.id}</span>{" "}
                  <span className={styles.tierTag} data-tier={f.technique.tier}>
                    {`T${f.technique.tier}`}
                  </span>
                  <span style={{ display: "block", fontWeight: 500 }}>
                    {f.technique.name}
                  </span>
                </span>
                <span className={styles.cardMeta}>
                  <span>{FIX_META[f.fixClass].label}</span>
                  <span aria-hidden="true">·</span>
                  <span>{f.owner ?? "unassigned"}</span>
                  {f.dueAt ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{`due ${formatDate(f.dueAt)}`}</span>
                    </>
                  ) : null}
                </span>
              </button>
            ))}
          </div>

          <div className={styles.queueFoot}>
            {selected.length > 0 ? (
              <div className={styles.bulkBar}>
                <strong>{plural(selected.length, "finding")} selected</strong>
                <Btn
                  variant="accent"
                  disabled={!canWrite}
                  aria-disabled={!canWrite}
                  title={canWrite ? undefined : "Read-only role"}
                  onClick={onBulkAssign}
                >
                  Assign in bulk
                </Btn>
                <Btn onClick={onClearSelection}>Clear selection</Btn>
              </div>
            ) : (
              <span>
                {`Showing ${rows.length} of ${totalOpen} open findings. Ties break by state severity, then evidence age, so the order is stable across reloads.`}
              </span>
            )}
          </div>
        </>
      )}
    </section>
  )
}

/** Four segments, widths proportional to each term. A profile, not decoration. */
function TermBar({ finding }: { finding: DerivedFinding }) {
  return (
    <span
      className={styles.termBar}
      role="img"
      aria-label={finding.terms
        .map((t) => `${t.label} ${t.display}`)
        .join(", ")}
    >
      {finding.terms.map((t) => (
        <span
          key={t.label}
          className={styles.termSeg}
          style={{ flex: `${Math.max(0.08, Math.min(1, t.value))} 1 0` }}
        />
      ))}
    </span>
  )
}

function SkeletonQueue() {
  const widths = [34, 52, 41, 60, 38, 47, 44, 55]
  return (
    <div aria-hidden="true">
      {widths.map((w, i) => (
        <div className={styles.skelRow} key={i}>
          <span className={styles.skelBar} style={{ width: "2.5rem" }} />
          <span className={styles.skelBar} style={{ width: `${w}%` }} />
        </div>
      ))}
    </div>
  )
}
