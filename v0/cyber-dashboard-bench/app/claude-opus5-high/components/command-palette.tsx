"use client"

import * as React from "react"

import styles from "../assay.module.css"
import { STATE_META } from "../lib/scoring"
import type { DerivedFinding } from "../lib/types"
import { cx } from "./primitives"

export interface Command {
  id: string
  label: string
  kind: string
  run: () => void
}

export function CommandPalette({
  open,
  onClose,
  commands,
  findings,
  onOpenFinding,
}: {
  open: boolean
  onClose: () => void
  commands: Command[]
  findings: DerivedFinding[]
  onOpenFinding: (finding: DerivedFinding) => void
}) {
  const [query, setQuery] = React.useState("")
  const [cursor, setCursor] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  const q = query.trim().toLowerCase()
  const items: Command[] = React.useMemo(() => {
    const techniqueItems: Command[] = findings
      .filter((f) =>
        q
          ? `${f.technique.id} ${f.technique.name}`.toLowerCase().includes(q)
          : false
      )
      .slice(0, 8)
      .map((f) => ({
        id: `open-${f.id}`,
        label: `${f.technique.id} — ${f.technique.name}`,
        kind: STATE_META[f.state].label,
        run: () => onOpenFinding(f),
      }))
    const cmdItems = commands.filter((c) =>
      q ? c.label.toLowerCase().includes(q) : true
    )
    return [...techniqueItems, ...cmdItems]
  }, [commands, findings, onOpenFinding, q])

  const clamped = Math.min(cursor, Math.max(0, items.length - 1))

  if (!open) return null

  return (
    <div
      className={styles.paletteWrap}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={styles.palette}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <input
          ref={inputRef}
          className={styles.paletteInput}
          value={query}
          placeholder="Jump to a technique, switch tab or role, toggle density…"
          aria-label="Search commands and techniques"
          onChange={(e) => {
            setQuery(e.target.value)
            setCursor(0)
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setCursor((c) => Math.min(c + 1, items.length - 1))
            } else if (e.key === "ArrowUp") {
              e.preventDefault()
              setCursor((c) => Math.max(c - 1, 0))
            } else if (e.key === "Enter") {
              e.preventDefault()
              items[clamped]?.run()
              onClose()
            } else if (e.key === "Escape") {
              e.preventDefault()
              onClose()
            }
          }}
        />
        <ul className={styles.paletteList}>
          {items.length === 0 ? (
            <li>
              <span className={styles.paletteItem}>No match</span>
            </li>
          ) : (
            items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={cx(styles.paletteItem)}
                  data-cursor={i === clamped ? "true" : undefined}
                  onClick={() => {
                    item.run()
                    onClose()
                  }}
                  onMouseEnter={() => setCursor(i)}
                >
                  {item.label}
                  <span className={styles.paletteKind}>{item.kind}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
