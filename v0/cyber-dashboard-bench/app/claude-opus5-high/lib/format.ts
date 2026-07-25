/** Formatting helpers. Deterministic — no locale guessing, no Date.now(). */

import { DAY, HOUR, MIN } from "./seed"

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function pad(n: number) {
  return String(n).padStart(2, "0")
}

/** e.g. "24 Jul 2026" */
export function formatDate(ts: number) {
  const d = new Date(ts)
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

/** e.g. "24 Jul 09:12" */
export function formatDateTime(ts: number) {
  const d = new Date(ts)
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`
}

/** ISO calendar date, for date inputs. */
export function toDateInput(ts: number) {
  return new Date(ts).toISOString().slice(0, 10)
}

export function fromDateInput(value: string) {
  const [y, m, d] = value.split("-").map(Number)
  return Date.UTC(y, (m || 1) - 1, d || 1, 12, 0, 0)
}

/** e.g. "6d ago", "22m ago", "in 3d" */
export function relative(ts: number, now: number) {
  const delta = now - ts
  const abs = Math.abs(delta)
  const suffix = delta >= 0 ? " ago" : ""
  const prefix = delta < 0 ? "in " : ""
  if (abs < MIN) return delta >= 0 ? "just now" : "in under a minute"
  if (abs < HOUR) return `${prefix}${Math.floor(abs / MIN)}m${suffix}`
  if (abs < DAY) return `${prefix}${Math.floor(abs / HOUR)}h${suffix}`
  return `${prefix}${Math.floor(abs / DAY)}d${suffix}`
}

/** 184000 -> "184k", 2400000 -> "2.4M" */
export function compact(n: number) {
  if (n >= 1_000_000) {
    const v = n / 1_000_000
    return `${v >= 10 ? Math.round(v) : v.toFixed(1)}M`
  }
  if (n >= 1_000) {
    const v = n / 1_000
    return `${v >= 10 ? Math.round(v) : v.toFixed(1)}k`
  }
  return String(n)
}

export function plural(n: number, one: string, many?: string) {
  return `${n} ${n === 1 ? one : (many ?? `${one}s`)}`
}
