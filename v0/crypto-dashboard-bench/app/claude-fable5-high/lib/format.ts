/** Compact USD: $4.21M, $404k, $842. Full values belong in tooltips/tables. */
export function fmtUsd(n: number): string {
  const abs = Math.abs(n)
  const sign = n < 0 ? "-" : ""
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`
  if (abs >= 10_000) return `${sign}$${Math.round(abs / 1_000)}k`
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(1)}k`
  return `${sign}$${abs.toFixed(0)}`
}

export function fmtUsdFull(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
}

export function fmtPrice(n: number): string {
  if (n >= 1000)
    return n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    })
  if (n >= 0.98 && n <= 1.02) return `$${n.toFixed(4)}`
  return `$${n.toFixed(2)}`
}

export function fmtPct(n: number, dp = 1): string {
  return `${n.toFixed(dp)}%`
}

export function fmtSignedPct(n: number, dp = 1): string {
  const s = n > 0 ? "+" : ""
  return `${s}${n.toFixed(dp)}%`
}

export function fmtMonths(n: number): string {
  if (!isFinite(n)) return "—"
  return `${n.toFixed(1)} mo`
}

export function fmtQty(n: number): string {
  if (n >= 10_000) return n.toLocaleString("en-US", { maximumFractionDigits: 0 })
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 })
}

export function fmtBps(n: number): string {
  return `${Math.round(n)} bps`
}
