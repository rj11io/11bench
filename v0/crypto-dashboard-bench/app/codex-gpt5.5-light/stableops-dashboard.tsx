"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Database,
  FileCheck2,
  Filter,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  WalletCards,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { asOf, exposureSeries, invoices, rails, riskEvents, type Corridor, type Invoice, type RiskLevel } from "./data"
import styles from "./stableops.module.css"

const storageKey = "stableops-prepared-batch-v1"
const defaultReadyInvoiceIds = invoices.filter((invoice) => invoice.status !== "blocked").map((invoice) => invoice.id)

type SavedBatch = {
  selectedIds: string[]
  railName: Corridor
  preparedAt: string | null
}

function savedBatch(): SavedBatch {
  const fallback = {
    selectedIds: defaultReadyInvoiceIds.slice(0, 3),
    railName: rails[0].name,
    preparedAt: null,
  }

  if (typeof window === "undefined") return fallback

  const saved = window.localStorage.getItem(storageKey)
  if (!saved) return fallback

  try {
    const parsed = JSON.parse(saved) as Partial<SavedBatch>
    return {
      selectedIds: Array.isArray(parsed.selectedIds) ? parsed.selectedIds : fallback.selectedIds,
      railName: parsed.railName && rails.some((rail) => rail.name === parsed.railName) ? parsed.railName : fallback.railName,
      preparedAt: parsed.preparedAt ?? null,
    }
  } catch {
    window.localStorage.removeItem(storageKey)
    return fallback
  }
}

function money(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

function compact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

function riskLabel(risk: RiskLevel) {
  if (risk === "low") return "Within policy"
  if (risk === "watch") return "Watch"
  if (risk === "elevated") return "Needs approval"
  return "Blocked"
}

function invoiceRisk(invoice: Invoice): RiskLevel {
  if (invoice.status === "blocked") return "blocked"
  if (invoice.status === "missing-kyc") return "elevated"
  if (invoice.status === "liquidity-watch") return "watch"
  return "low"
}

export function StableOpsDashboard() {
  const [initialBatch] = useState<SavedBatch>(() => savedBatch())
  const [selectedIds, setSelectedIds] = useState<string[]>(initialBatch.selectedIds)
  const [scenario, setScenario] = useState<"normal" | "volatile" | "empty">("normal")
  const [railName, setRailName] = useState<Corridor>(initialBatch.railName)
  const [preparedAt, setPreparedAt] = useState<string | null>(initialBatch.preparedAt)

  const selectedInvoices = useMemo(
    () => invoices.filter((invoice) => selectedIds.includes(invoice.id) && invoice.status !== "blocked"),
    [selectedIds]
  )

  const activeRail = rails.find((rail) => rail.name === railName) ?? rails[0]
  const volatile = scenario === "volatile"
  const visibleInvoices = scenario === "empty" ? [] : invoices
  const batchTotal = selectedInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const watchCount = selectedInvoices.filter((invoice) => invoiceRisk(invoice) !== "low").length
  const policyBlocked = selectedInvoices.some((invoice) => invoiceRisk(invoice) === "elevated") || activeRail.risk === "elevated"
  const liquidityAfter = activeRail.balance - batchTotal
  const effectiveSpread = activeRail.spreadBps + (volatile ? 19 : 0)
  const estimatedCost = activeRail.feeUsd + (batchTotal * effectiveSpread) / 10000
  const canPrepare = selectedInvoices.length > 0 && !policyBlocked && liquidityAfter > 0

  function toggleInvoice(id: string) {
    const invoice = invoices.find((item) => item.id === id)
    if (!invoice || invoice.status === "blocked") return
    setSelectedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
    setPreparedAt(null)
  }

  function prepareBatch() {
    if (!canPrepare) return
    const timestamp = new Date().toISOString()
    const payload = { selectedIds, railName, preparedAt: timestamp }
    window.localStorage.setItem(storageKey, JSON.stringify(payload))
    setPreparedAt(timestamp)
  }

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>StableOps Treasury Console</p>
          <h1>Approve stablecoin settlement batches with liquidity, provenance, and policy risk in one loop.</h1>
          <p className={styles.subhead}>
            Seeded demo for finance teams using stablecoins for cross-border payables. No wallet is connected and no data is live.
          </p>
        </div>
        <div className={styles.trustPanel} aria-label="Demo status">
          <div><Database size={18} /> Demo data as of {new Date(asOf).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</div>
          <div><LockKeyhole size={18} /> Read-only simulation</div>
          <div><ShieldCheck size={18} /> Policy checks shown before approval</div>
        </div>
      </section>

      <section className={styles.toolbar} aria-label="Scenario controls">
        {(["normal", "volatile", "empty"] as const).map((item) => (
          <button
            key={item}
            className={scenario === item ? styles.activePill : styles.pill}
            onClick={() => {
              setScenario(item)
              if (item === "empty") setSelectedIds([])
            }}
            type="button"
          >
            {item === "normal" ? "Normal close" : item === "volatile" ? "Volatile market" : "No payable batch"}
          </button>
        ))}
        <button className={styles.iconButton} type="button" aria-label="Refresh seeded data">
          <RefreshCw size={17} />
        </button>
      </section>

      <section className={styles.kpiGrid}>
        <Metric label="Selected batch" value={money(batchTotal)} detail={`${selectedInvoices.length} payable${selectedInvoices.length === 1 ? "" : "s"}`} icon={<WalletCards size={19} />} />
        <Metric label="Estimated cost" value={money(estimatedCost)} detail={`${effectiveSpread} bps spread + network fee`} icon={<ArrowRight size={19} />} />
        <Metric label="Liquidity after" value={money(liquidityAfter)} detail={liquidityAfter < 0 ? "Insufficient on selected rail" : `${compact(activeRail.capacity24h)} 24h capacity`} icon={<Clock3 size={19} />} />
        <Metric label="Policy status" value={policyBlocked ? "Review" : watchCount ? "Watch" : "Clear"} detail={watchCount ? `${watchCount} selected exception${watchCount === 1 ? "" : "s"}` : "No selected exceptions"} icon={<FileCheck2 size={19} />} tone={policyBlocked ? "elevated" : watchCount ? "watch" : "low"} />
      </section>

      <section className={styles.mainGrid}>
        <div className={styles.workspace}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Settlement queue</p>
              <h2>Choose today&apos;s batch</h2>
            </div>
            <span><Filter size={16} /> due first</span>
          </div>

          {visibleInvoices.length === 0 ? (
            <div className={styles.emptyState}>
              <CheckCircle2 size={28} />
              <h3>No eligible payables in this scenario</h3>
              <p>Empty states keep the treasury close calm: finance sees the last sync time and avoids approving a stale or accidental batch.</p>
            </div>
          ) : (
            <div className={styles.invoiceList}>
              {visibleInvoices.map((invoice) => {
                const disabled = invoice.status === "blocked"
                const checked = selectedIds.includes(invoice.id)
                const risk = invoiceRisk(invoice)
                return (
                  <button
                    className={`${styles.invoiceRow} ${checked ? styles.selectedRow : ""}`}
                    disabled={disabled}
                    key={invoice.id}
                    onClick={() => toggleInvoice(invoice.id)}
                    type="button"
                  >
                    <span className={styles.check}>{checked ? <CheckCircle2 size={18} /> : disabled ? <LockKeyhole size={17} /> : null}</span>
                    <span>
                      <strong>{invoice.counterparty}</strong>
                      <small>{invoice.id} · {invoice.region} · due in {invoice.dueInHours}h</small>
                    </span>
                    <span className={styles.amount}>{money(invoice.amount, invoice.currency)}</span>
                    <span className={`${styles.riskBadge} ${styles[risk]}`}>{riskLabel(risk)}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <aside className={styles.sidePanel}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Rail decision</p>
              <h2>Route and approve</h2>
            </div>
          </div>
          <label className={styles.selectLabel} htmlFor="rail">Settlement rail</label>
          <select id="rail" className={styles.select} value={railName} onChange={(event) => setRailName(event.target.value as Corridor)}>
            {rails.map((rail) => <option key={rail.name}>{rail.name}</option>)}
          </select>
          <div className={styles.routeCard}>
            <div>
              <strong>{activeRail.issuer}</strong>
              <span>{activeRail.chain} · updated {activeRail.updatedAt}</span>
            </div>
            <span className={`${styles.riskBadge} ${styles[activeRail.risk]}`}>{riskLabel(activeRail.risk)}</span>
          </div>
          <dl className={styles.decisionList}>
            <div><dt>Peg deviation</dt><dd>{volatile ? activeRail.pegBps + 11 : activeRail.pegBps} bps</dd></div>
            <div><dt>Network ETA</dt><dd>{activeRail.etaMinutes} min</dd></div>
            <div><dt>Available balance</dt><dd>{money(activeRail.balance)}</dd></div>
            <div><dt>Provenance</dt><dd>{activeRail.provenance}</dd></div>
          </dl>
          <button className={canPrepare ? styles.primaryAction : styles.disabledAction} disabled={!canPrepare} onClick={prepareBatch} type="button">
            Prepare approval packet
          </button>
          {preparedAt ? (
            <p className={styles.savedNote}>Prepared packet saved locally at {new Date(preparedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}.</p>
          ) : (
            <p className={styles.savedNote}>{policyBlocked ? "Resolve approval exceptions before packet creation." : "Packet includes demo-only batch IDs, rail assumptions, and policy notes."}</p>
          )}
        </aside>
      </section>

      <section className={styles.analyticsGrid}>
        <div className={styles.chartPanel}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Exposure</p>
              <h2>Stablecoin balances by issuer</h2>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={exposureSeries}>
              <CartesianGrid stroke="rgba(15, 23, 42, 0.08)" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(value) => `$${Number(value) / 1000000}M`} tickLine={false} axisLine={false} width={48} />
              <Tooltip formatter={(value) => money(Number(value ?? 0))} />
              <Area type="monotone" dataKey="usdc" stackId="1" stroke="#2563eb" fill="#93c5fd" name="USDC" />
              <Area type="monotone" dataKey="usdt" stackId="1" stroke="#0f766e" fill="#99f6e4" name="USDT" />
              <Area type="monotone" dataKey="eurc" stackId="1" stroke="#a16207" fill="#fde68a" name="EURC" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartPanel}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Liquidity</p>
              <h2>24h route capacity</h2>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={rails}>
              <CartesianGrid stroke="rgba(15, 23, 42, 0.08)" vertical={false} />
              <XAxis dataKey="chain" tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(value) => `$${Number(value) / 1000000}M`} tickLine={false} axisLine={false} width={48} />
              <Tooltip formatter={(value) => money(Number(value ?? 0))} />
              <Bar dataKey="capacity24h" fill="#1d4ed8" radius={[6, 6, 0, 0]} name="24h capacity" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.riskPanel}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Risk tape</p>
              <h2>Exceptions before release</h2>
            </div>
          </div>
          {riskEvents.map((event) => (
            <article className={styles.riskEvent} key={event.title}>
              <span className={`${styles.eventIcon} ${styles[event.severity]}`}><AlertTriangle size={16} /></span>
              <div>
                <strong>{event.title}</strong>
                <p>{event.detail}</p>
                <small>{event.time}</small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function Metric({
  label,
  value,
  detail,
  icon,
  tone = "low",
}: {
  label: string
  value: string
  detail: string
  icon: React.ReactNode
  tone?: RiskLevel
}) {
  return (
    <article className={styles.metric}>
      <span className={`${styles.metricIcon} ${styles[tone]}`}>{icon}</span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
    </article>
  )
}
