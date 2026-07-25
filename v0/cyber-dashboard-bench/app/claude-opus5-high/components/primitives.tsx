"use client"

import * as React from "react"

import styles from "../assay.module.css"
import { STATE_META } from "../lib/scoring"
import type { AssuranceState } from "../lib/types"

const noopSubscribe = () => () => {}

/**
 * True once the client has taken over. Written with useSyncExternalStore rather
 * than the usual effect-plus-setState because this project's lint config bans
 * setting state inside an effect.
 */
export function useHydrated() {
  return React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )
}

export function stateClass(state: AssuranceState) {
  return styles[`st-${state}`]
}

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ")
}

/* -------------------------------------------------------------------------- */

export function StateChip({
  state,
  ageDays,
  size = "sm",
  showLabel = true,
}: {
  state: AssuranceState
  ageDays?: number | null
  size?: "sm" | "lg"
  showLabel?: boolean
}) {
  const meta = STATE_META[state]
  return (
    <span
      className={cx(styles.chip, stateClass(state))}
      data-size={size}
      data-dashed={state === "accepted" ? "true" : undefined}
    >
      <span className={styles.glyph} aria-hidden="true">
        {meta.glyph}
      </span>
      {showLabel ? meta.label : <span className={styles.srOnly}>{meta.label}</span>}
      {ageDays !== null && ageDays !== undefined ? (
        <span className={styles.chipAge}>{`${ageDays}d`}</span>
      ) : null}
    </span>
  )
}

/** Four-step freshness indicator. Confidence 1 fills all four. */
export function FreshnessPips({
  confidence,
  state,
}: {
  confidence: number
  state: AssuranceState
}) {
  const on = Math.round(confidence * 4)
  return (
    <span
      className={cx(styles.pips, stateClass(state))}
      role="img"
      aria-label={`Evidence confidence ${on} of 4`}
    >
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={styles.pip} data-on={i < on ? "true" : "false"} />
      ))}
    </span>
  )
}

/* -------------------------------------------------------------------------- */

export function Panel({
  title,
  meta,
  actions,
  children,
  bodyless,
  id,
}: {
  title: React.ReactNode
  meta?: React.ReactNode
  actions?: React.ReactNode
  children: React.ReactNode
  bodyless?: boolean
  id?: string
}) {
  const headingId = id ? `${id}-title` : undefined
  return (
    <section className={styles.panel} aria-labelledby={headingId}>
      <div className={styles.panelHead}>
        <h2 className={styles.panelTitle} id={headingId}>
          {title}
          {meta ? <span className={styles.micro}>{meta}</span> : null}
        </h2>
        {actions}
      </div>
      {bodyless ? children : <div className={styles.panelBody}>{children}</div>}
    </section>
  )
}

export function Btn({
  variant,
  size,
  children,
  ...rest
}: React.ComponentProps<"button"> & {
  variant?: "primary" | "accent" | "caution"
  size?: "lg"
}) {
  return (
    <button
      type="button"
      className={styles.btn}
      data-variant={variant}
      data-size={size}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Empty({
  glyph,
  title,
  children,
  action,
}: {
  glyph: string
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className={styles.empty}>
      <span className={styles.emptyGlyph} aria-hidden="true">
        {glyph}
      </span>
      <p className={styles.emptyTitle}>{title}</p>
      <p className={styles.emptyText}>{children}</p>
      {action}
    </div>
  )
}

export function SkeletonRows({ rows = 6 }: { rows?: number }) {
  const widths = [30, 46, 38, 52, 34, 44, 40, 48]
  return (
    <div aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div className={styles.skelRow} key={i}>
          <span className={styles.skelBar} style={{ width: "2.25rem" }} />
          <span
            className={styles.skelBar}
            style={{ width: `${widths[i % widths.length]}%` }}
          />
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Hand-drawn sparkline. A silent source reads as a flat tail — a shape, which
 * the eye catches without reading a number.
 */
export function Sparkline({
  values,
  width = 52,
  height = 16,
  tone,
  label,
}: {
  values: number[]
  width?: number
  height?: number
  tone: string
  label: string
}) {
  const max = Math.max(...values, 1)
  const step = values.length > 1 ? width / (values.length - 1) : width
  const points = values
    .map((v, i) => {
      const x = i * step
      const y = height - 1 - (v / max) * (height - 2)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")
  const last = values[values.length - 1]
  const lastY = height - 1 - (last / max) * (height - 2)
  return (
    <svg
      className={styles.spark}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={label}
    >
      <polyline
        points={points}
        fill="none"
        stroke={tone}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <circle cx={width} cy={lastY} r="1.75" fill={tone} />
    </svg>
  )
}
