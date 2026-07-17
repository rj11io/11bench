import type { Severity } from "./types"

const DAY = 24 * 60 * 60 * 1000

export const SEVERITY_LABEL: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
}

/** Hex tokens for severity — always rendered next to a text label (a11y). */
export const SEVERITY_COLOR: Record<Severity, string> = {
  critical: "#ff5d5d",
  high: "#ff9f43",
  medium: "#e8c547",
  low: "#8b95a7",
}

export const OK_COLOR = "#3ecf8e"
export const ACCENT_COLOR = "#4cc2ff"
export const VIOLET_COLOR = "#a78bfa"

export function formatCountdown(dueAt: number, now: number): {
  text: string
  tone: "breached" | "urgent" | "ok"
} {
  const diff = dueAt - now
  const days = Math.floor(Math.abs(diff) / DAY)
  if (diff < 0) {
    return {
      text: days === 0 ? "due today" : `${days}d over`,
      tone: "breached",
    }
  }
  if (days === 0) return { text: "due today", tone: "urgent" }
  if (days <= 3) return { text: `${days}d left`, tone: "urgent" }
  return { text: `${days}d left`, tone: "ok" }
}

export function formatDueDate(dueAt: number): string {
  return new Date(dueAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatTime(at: number): string {
  return new Date(at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export function formatCount(n: number): string {
  return n.toLocaleString("en-US")
}
