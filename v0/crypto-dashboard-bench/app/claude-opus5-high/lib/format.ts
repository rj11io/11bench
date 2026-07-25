/** Deterministic formatting. Locale is pinned so the server and the browser
 *  always produce the same string. */

const USD0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})
const USD2 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
const NUM = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 })
const NUM4 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 })

export function usd(n: number): string {
  return USD0.format(n)
}

export function usdExact(n: number): string {
  return USD2.format(n)
}

/** Compact money for headline figures: $1.86m, $675k, -$7.18m. */
export function usdShort(n: number, decimals?: number): string {
  const abs = Math.abs(n)
  const sign = n < 0 ? "−" : ""
  if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(decimals ?? 2)}bn`
  if (abs >= 1_000_000)
    return `${sign}$${(abs / 1_000_000).toFixed(decimals ?? (abs >= 10_000_000 ? 1 : 2))}m`
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(decimals ?? 0)}k`
  return `${sign}$${abs.toFixed(0)}`
}

export function qty(n: number, unit?: string): string {
  const s = n < 1_000 ? NUM4.format(n) : NUM.format(n)
  return unit ? `${s} ${unit}` : s
}

export function price(n: number): string {
  if (n >= 1_000) return USD0.format(n)
  if (n >= 1) return `$${n.toFixed(4)}`
  return `$${n.toFixed(4)}`
}

export function pct(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`
}

export function bps(n: number, decimals = 0): string {
  return `${n.toFixed(decimals)} bps`
}

export function ratio(n: number): string {
  if (!Number.isFinite(n)) return "—"
  return `${n.toFixed(2)}×`
}

export function days(n: number): string {
  if (n === 0) return "same day"
  if (n === 1) return "1 day"
  if (n < 60) return `${Math.round(n)} days`
  return `${Math.round(n / 30.44)} months`
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

/** "24 Jul 2026, 16:00 UTC" — explicit zone, because a treasury timestamp
 *  without a zone is a guess. */
export function stamp(iso: string): string {
  const d = new Date(iso)
  const day = d.getUTCDate()
  const mon = MONTHS[d.getUTCMonth()].slice(0, 3)
  const yr = d.getUTCFullYear()
  const hh = String(d.getUTCHours()).padStart(2, "0")
  const mm = String(d.getUTCMinutes()).padStart(2, "0")
  return `${day} ${mon} ${yr}, ${hh}:${mm} UTC`
}

export function dateOnly(iso: string): string {
  const d = new Date(iso)
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()].slice(0, 3)} ${d.getUTCFullYear()}`
}

export function signed(n: number, fmt: (x: number) => string): string {
  return n > 0 ? `+${fmt(n)}` : fmt(n)
}
