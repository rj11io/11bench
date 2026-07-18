"use client"

import {
  AlertTriangle,
  ArrowRightLeft,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  Clock3,
  Database,
  FileCheck2,
  Filter,
  Info,
  RefreshCcw,
  ShieldAlert,
  WalletCards,
} from "lucide-react"
import { useMemo, useState, useSyncExternalStore } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  asOf,
  entities,
  evidenceItems,
  obligations,
  positions,
  riskSignals,
  routes,
  runwaySeries,
  scenarios,
  type Confidence,
  type ScenarioId,
  type Severity,
  type WindowId,
} from "./data"
import styles from "./treasury.module.css"

const severityRank: Record<Severity, number> = {
  clear: 0,
  watch: 1,
  unknown: 2,
  high: 3,
  critical: 4,
}

const confidenceScore: Record<Confidence, number> = {
  high: 94,
  medium: 78,
  low: 58,
  unknown: 36,
}

const barColors = ["#247c6d", "#5186c2", "#c68d35", "#9a4f4f", "#725e91"]
const memoStorageKey = "treasury-sentinel-memo"
const memoStorageEvent = "treasury-sentinel-memo-change"
const defaultMemoState = {
  status: "Draft",
  owner: "Treasury Ops",
  note: "Review route capacity, then approve same-chain funding before payout cutoff.",
}
const defaultMemoSnapshot = JSON.stringify(defaultMemoState)

function money(value: number, compact = true) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value)
}

function percent(value: number) {
  return `${Math.round(value * 100)}%`
}

function severityLabel(severity: Severity) {
  if (severity === "clear") return "Clear"
  if (severity === "watch") return "Watch"
  if (severity === "high") return "High"
  if (severity === "critical") return "Critical"
  return "Unknown"
}

function confidenceLabel(confidence: Confidence) {
  if (confidence === "high") return "High confidence"
  if (confidence === "medium") return "Medium confidence"
  if (confidence === "low") return "Low confidence"
  return "Unknown confidence"
}

function includesEntity(entityId: string, itemEntityId: string) {
  return entityId === "all" || entityId === itemEntityId
}

function readMemoSnapshot() {
  if (typeof window === "undefined") return defaultMemoSnapshot
  return window.localStorage.getItem(memoStorageKey) || defaultMemoSnapshot
}

function parseMemoSnapshot(snapshot: string) {
  try {
    const parsed = JSON.parse(snapshot) as Partial<typeof defaultMemoState>
    return {
      status: parsed.status || defaultMemoState.status,
      owner: parsed.owner || defaultMemoState.owner,
      note: parsed.note || defaultMemoState.note,
    }
  } catch {
    return defaultMemoState
  }
}

function subscribeMemoState(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener(memoStorageEvent, callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener(memoStorageEvent, callback)
  }
}

function writeMemoState(next: typeof defaultMemoState) {
  window.localStorage.setItem(memoStorageKey, JSON.stringify(next))
  window.dispatchEvent(new Event(memoStorageEvent))
}

function clearMemoState() {
  window.localStorage.removeItem(memoStorageKey)
  window.dispatchEvent(new Event(memoStorageEvent))
}

export function TreasuryDashboard() {
  const [entityId, setEntityId] = useState("all")
  const [scenarioId, setScenarioId] = useState<ScenarioId>("base")
  const [windowId, setWindowId] = useState<WindowId>("7d")
  const [signalFilter, setSignalFilter] = useState<"open" | "critical" | "resolved">(
    "open"
  )
  const memoSnapshot = useSyncExternalStore(
    subscribeMemoState,
    readMemoSnapshot,
    () => defaultMemoSnapshot
  )
  const memoState = useMemo(() => parseMemoSnapshot(memoSnapshot), [memoSnapshot])

  const selectedScenario = scenarios.find((scenario) => scenario.id === scenarioId)!
  const selectedEntity = entities.find((entity) => entity.id === entityId)!

  const filteredPositions = useMemo(
    () => positions.filter((position) => includesEntity(entityId, position.entityId)),
    [entityId]
  )

  const filteredObligations = useMemo(
    () =>
      obligations.filter((obligation) => includesEntity(entityId, obligation.entityId)),
    [entityId]
  )

  const filteredRoutes = useMemo(
    () => routes.filter((route) => includesEntity(entityId, route.entityId)),
    [entityId]
  )

  const treasury = useMemo(() => {
    const total = filteredPositions.reduce((sum, position) => sum + position.amountUsd, 0)
    const eligible = filteredPositions.reduce(
      (sum, position) => sum + position.eligibleUsd,
      0
    )
    const stressLoss = filteredPositions.reduce((sum, position) => {
      const bps = selectedScenario.bps[position.asset] ?? 20
      return sum + position.amountUsd * (bps / 10000)
    }, 0)
    const avgConfidence =
      filteredPositions.reduce(
        (sum, position) => sum + confidenceScore[position.confidence],
        0
      ) / Math.max(filteredPositions.length, 1)
    const adjustedConfidence = Math.max(
      0,
      Math.round(avgConfidence - selectedScenario.confidencePenalty)
    )
    return { total, eligible, stressLoss, adjustedConfidence }
  }, [filteredPositions, selectedScenario])

  const corridorRows = useMemo(() => {
    return filteredObligations.map((obligation) => {
      const sameRail = filteredPositions.filter(
        (position) =>
          position.asset === obligation.asset && position.chain === obligation.chain
      )
      const available = sameRail.reduce((sum, position) => sum + position.eligibleUsd, 0)
      const due = windowId === "7d" ? obligation.due7Usd : obligation.due30Usd
      const coverage = due > 0 ? available / due : 1
      const status: Severity =
        coverage < 0.85
          ? "critical"
          : coverage < 1
            ? "high"
            : coverage < 1.18
              ? "watch"
              : "clear"
      return { ...obligation, available, due, coverage, status }
    })
  }, [filteredObligations, filteredPositions, windowId])

  const signalRows = useMemo(() => {
    return riskSignals
      .filter((signal) => includesEntity(entityId, signal.entityId))
      .map((signal) => ({ ...signal, activeSeverity: signal.severity[scenarioId] }))
      .filter((signal) => {
        if (signalFilter === "resolved") return signal.status === "Reviewed"
        if (signalFilter === "critical") {
          return severityRank[signal.activeSeverity] >= severityRank.high
        }
        return signal.status !== "Reviewed"
      })
      .sort(
        (a, b) =>
          severityRank[b.activeSeverity] - severityRank[a.activeSeverity] ||
          a.title.localeCompare(b.title)
      )
  }, [entityId, scenarioId, signalFilter])

  const exposureRows = useMemo(() => {
    const grouped = new Map<
      string,
      {
        key: string
        issuer: string
        asset: string
        chain: string
        amountUsd: number
        eligibleUsd: number
        reserveAgeDays: number
        confidence: Confidence
        jurisdiction: string
      }
    >()
    for (const position of filteredPositions) {
      const key = `${position.issuer}-${position.asset}-${position.chain}`
      const current = grouped.get(key)
      if (current) {
        current.amountUsd += position.amountUsd
        current.eligibleUsd += position.eligibleUsd
        current.reserveAgeDays = Math.max(current.reserveAgeDays, position.reserveAgeDays)
        if (confidenceScore[position.confidence] < confidenceScore[current.confidence]) {
          current.confidence = position.confidence
        }
      } else {
        grouped.set(key, {
          key,
          issuer: position.issuer,
          asset: position.asset,
          chain: position.chain,
          amountUsd: position.amountUsd,
          eligibleUsd: position.eligibleUsd,
          reserveAgeDays: position.reserveAgeDays,
          confidence: position.confidence,
          jurisdiction: position.jurisdiction,
        })
      }
    }
    return [...grouped.values()].sort((a, b) => b.amountUsd - a.amountUsd)
  }, [filteredPositions])

  const routeRows = useMemo(() => {
    return filteredRoutes.map((route) => {
      const scenarioCapacity =
        route.bridgeSensitive && scenarioId === "bridge"
          ? route.capacityUsd * 0.22
          : route.capacityUsd * selectedScenario.liquidityFactor
      const slippage =
        route.slippageBps *
        (scenarioId === "base" ? 1 : scenarioId === "bridge" && route.bridgeSensitive ? 3 : 1.8)
      const routeSeverity: Severity =
        route.confidence === "unknown"
          ? "unknown"
          : scenarioCapacity < 300000
            ? "high"
            : slippage > 55
              ? "high"
              : slippage > 28
                ? "watch"
                : "clear"
      return { ...route, scenarioCapacity, slippage, routeSeverity }
    })
  }, [filteredRoutes, scenarioId, selectedScenario])

  const chartExposure = useMemo(
    () =>
      exposureRows.map((row) => ({
        name: `${row.asset} ${row.chain}`,
        value: Math.round(row.amountUsd / 1000),
      })),
    [exposureRows]
  )

  const highSignalCount = riskSignals
    .filter((signal) => includesEntity(entityId, signal.entityId))
    .filter((signal) => severityRank[signal.severity[scenarioId]] >= severityRank.high)
    .length
  const underfundedCount = corridorRows.filter(
    (row) => severityRank[row.status] >= severityRank.high
  ).length
  const runwayDays = runwaySeries[runwaySeries.length - 1][scenarioId]

  const topRecommendation = useMemo(() => {
    const worstCorridor = [...corridorRows].sort(
      (a, b) => severityRank[b.status] - severityRank[a.status] || a.coverage - b.coverage
    )[0]
    const worstRoute = [...routeRows].sort(
      (a, b) =>
        severityRank[b.routeSeverity] - severityRank[a.routeSeverity] ||
        a.scenarioCapacity - b.scenarioCapacity
    )[0]
    const worstSignal = riskSignals
      .filter((signal) => includesEntity(entityId, signal.entityId))
      .map((signal) => ({ ...signal, activeSeverity: signal.severity[scenarioId] }))
      .sort((a, b) => severityRank[b.activeSeverity] - severityRank[a.activeSeverity])[0]

    if (worstCorridor && severityRank[worstCorridor.status] >= severityRank.high) {
      return {
        title: `Fund ${worstCorridor.rail}`,
        amount: Math.max(0, worstCorridor.due - worstCorridor.available),
        body: `Coverage is ${percent(worstCorridor.coverage)} for the selected ${windowId} window. Prepare a same-chain top-up before payout approval.`,
        severity: worstCorridor.status,
      }
    }
    if (worstRoute && severityRank[worstRoute.routeSeverity] >= severityRank.high) {
      return {
        title: `Review ${worstRoute.asset} route capacity`,
        amount: worstRoute.scenarioCapacity,
        body: `${worstRoute.path} is below the preferred capacity or confidence threshold under ${selectedScenario.short}.`,
        severity: worstRoute.routeSeverity,
      }
    }
    if (worstSignal && severityRank[worstSignal.activeSeverity] >= severityRank.high) {
      return {
        title: worstSignal.title,
        amount: treasury.stressLoss,
        body: worstSignal.detail,
        severity: worstSignal.activeSeverity,
      }
    }
    return {
      title: "Approve payout window with watchlist",
      amount: treasury.stressLoss,
      body: "Same-chain coverage is adequate. Keep watchlist evidence attached and review route capacity before cutoff.",
      severity: "watch" as Severity,
    }
  }, [
    corridorRows,
    entityId,
    routeRows,
    scenarioId,
    selectedScenario.short,
    treasury.stressLoss,
    windowId,
  ])

  function resetMemo() {
    clearMemoState()
  }

  return (
    <main className={styles.shell}>
      <section className={styles.header}>
        <div className={styles.titleBlock}>
          <div className={styles.eyebrow}>
            <ShieldAlert size={16} aria-hidden="true" />
            Seeded demo data - not live
          </div>
          <h1>Treasury Sentinel</h1>
          <p>
            Stablecoin treasury risk cockpit for funding, pause, rebalance, and
            evidence decisions before money moves.
          </p>
        </div>
        <div className={styles.headerPanel} aria-label="Data status">
          <span>As of {new Date(asOf).toLocaleString("en-US", { timeZone: "UTC" })} UTC</span>
          <strong>No wallet, price, or transaction feed is connected.</strong>
        </div>
      </section>

      <section className={styles.controls} aria-label="Dashboard controls">
        <label className={styles.controlGroup}>
          <span>Entity</span>
          <select value={entityId} onChange={(event) => setEntityId(event.target.value)}>
            {entities.map((entity) => (
              <option key={entity.id} value={entity.id}>
                {entity.name}
              </option>
            ))}
          </select>
        </label>

        <div className={styles.segmentGroup} aria-label="Obligation window">
          {(["7d", "30d"] as WindowId[]).map((window) => (
            <button
              key={window}
              className={windowId === window ? styles.segmentActive : styles.segment}
              onClick={() => setWindowId(window)}
              type="button"
            >
              {window === "7d" ? "7 days" : "30 days"}
            </button>
          ))}
        </div>

        <div className={styles.scenarios} aria-label="Risk scenario">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              className={scenarioId === scenario.id ? styles.scenarioActive : styles.scenario}
              onClick={() => setScenarioId(scenario.id)}
              type="button"
            >
              <span>{scenario.short}</span>
              <small>{scenario.description}</small>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.kpiGrid} aria-label="Decision summary">
        <MetricCard
          icon={<WalletCards size={18} />}
          label="Liquid treasury"
          value={money(treasury.eligible)}
          detail={`${money(treasury.total)} total seeded exposure`}
          tone="good"
        />
        <MetricCard
          icon={<Clock3 size={18} />}
          label="Scenario runway"
          value={`${runwayDays} days`}
          detail={`${selectedScenario.short} stress after policy reserves`}
          tone={runwayDays < 10 ? "bad" : runwayDays < 14 ? "watch" : "good"}
        />
        <MetricCard
          icon={<AlertTriangle size={18} />}
          label="Underfunded rails"
          value={String(underfundedCount)}
          detail={`${windowId === "7d" ? "7-day" : "30-day"} payout window`}
          tone={underfundedCount > 0 ? "bad" : "good"}
        />
        <MetricCard
          icon={<ShieldAlert size={18} />}
          label="High signals"
          value={String(highSignalCount)}
          detail="Open or reviewed policy signals"
          tone={highSignalCount > 0 ? "bad" : "good"}
        />
        <MetricCard
          icon={<FileCheck2 size={18} />}
          label="Evidence confidence"
          value={`${treasury.adjustedConfidence}%`}
          detail="Weighted seeded source coverage"
          tone={
            treasury.adjustedConfidence < 65
              ? "bad"
              : treasury.adjustedConfidence < 82
                ? "watch"
                : "good"
          }
        />
      </section>

      <section className={styles.mainGrid}>
        <div className={styles.leftStack}>
          <section className={styles.panel}>
            <PanelTitle
              icon={<BarChart3 size={18} />}
              title="Payout Readiness"
              meta={`${selectedEntity.region} - ${windowId}`}
            />
            <div className={styles.readinessGrid}>
              {corridorRows.map((row) => (
                <article key={row.id} className={styles.corridorCard}>
                  <div>
                    <StatusPill severity={row.status} />
                    <h3>{row.rail}</h3>
                    <p>
                      {row.asset} on {row.chain} - source: {row.source}
                    </p>
                  </div>
                  <div className={styles.coverageBar} aria-label={`${row.rail} coverage`}>
                    <span style={{ width: `${Math.min(row.coverage * 100, 130)}%` }} />
                  </div>
                  <div className={styles.cardNumbers}>
                    <span>
                      <strong>{money(row.available)}</strong>
                      Available
                    </span>
                    <span>
                      <strong>{money(row.due)}</strong>
                      Due
                    </span>
                    <span>
                      <strong>{percent(row.coverage)}</strong>
                      Coverage
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.panel}>
            <PanelTitle
              icon={<Database size={18} />}
              title="Exposure and Runway"
              meta={`Peg stress impact ${money(treasury.stressLoss, false)}`}
            />
            <div className={styles.chartGrid}>
              <div className={styles.chartBox}>
                <h3>Runway under scenario</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={runwaySeries} margin={{ left: -18, right: 12, top: 12 }}>
                    <CartesianGrid stroke="#d8ded8" strokeDasharray="3 3" />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey={scenarioId}
                      name={`${selectedScenario.short} days`}
                      stroke="#247c6d"
                      fill="#98c7b5"
                      fillOpacity={0.55}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className={styles.chartBox}>
                <h3>Exposure by issuer and chain</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={chartExposure} margin={{ left: -18, right: 8, top: 12 }}>
                    <CartesianGrid stroke="#d8ded8" strokeDasharray="3 3" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} interval={0} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip formatter={(value) => [`$${value}k`, "Exposure"]} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {chartExposure.map((entry, index) => (
                        <Cell key={entry.name} fill={barColors[index % barColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>

        <aside className={styles.memoPanel} aria-label="Action memo">
          <PanelTitle
            icon={<FileCheck2 size={18} />}
            title="Action Memo"
            meta="Persisted locally"
          />
          <div className={styles.recommendation}>
            <StatusPill severity={topRecommendation.severity} />
            <h2>{topRecommendation.title}</h2>
            <p>{topRecommendation.body}</p>
            <div className={styles.recommendationAmount}>
              <span>Impacted amount</span>
              <strong>{money(topRecommendation.amount, false)}</strong>
            </div>
          </div>

          <label className={styles.field}>
            <span>Status</span>
            <select
              value={memoState.status}
              onChange={(event) =>
                writeMemoState({ ...memoState, status: event.target.value })
              }
            >
              <option>Draft</option>
              <option>Ready for approval</option>
              <option>Approved</option>
              <option>Paused pending review</option>
            </select>
          </label>
          <label className={styles.field}>
            <span>Owner</span>
            <input
              value={memoState.owner}
              onChange={(event) =>
                writeMemoState({ ...memoState, owner: event.target.value })
              }
            />
          </label>
          <label className={styles.field}>
            <span>Decision note</span>
            <textarea
              value={memoState.note}
              onChange={(event) =>
                writeMemoState({ ...memoState, note: event.target.value })
              }
              rows={5}
            />
          </label>

          <div className={styles.evidenceList}>
            <h3>Evidence checklist</h3>
            {evidenceItems.map((item) => (
              <div key={item.id} className={styles.evidenceItem}>
                <CheckCircle2 size={17} aria-hidden="true" />
                <div>
                  <strong>{item.label}</strong>
                  <span>
                    {item.source} - {item.timestamp} - {confidenceLabel(item.confidence)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.memoActions}>
            <button type="button" className={styles.primaryButton}>
              <BadgeCheck size={17} aria-hidden="true" />
              Save memo state
            </button>
            <button type="button" className={styles.secondaryButton} onClick={resetMemo}>
              <RefreshCcw size={17} aria-hidden="true" />
              Reset
            </button>
          </div>
        </aside>
      </section>

      <section className={styles.panel}>
        <PanelTitle
          icon={<Database size={18} />}
          title="Stablecoin Exposure Matrix"
          meta="Seeded issuer, chain, report age, and stress semantics"
        />
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Issuer / asset</th>
                <th>Chain</th>
                <th>Exposure</th>
                <th>Liquid eligible</th>
                <th>Stress impact</th>
                <th>Reserve age</th>
                <th>Confidence</th>
                <th>Jurisdiction status</th>
              </tr>
            </thead>
            <tbody>
              {exposureRows.map((row) => {
                const stress = row.amountUsd * ((selectedScenario.bps[row.asset] ?? 20) / 10000)
                return (
                  <tr key={row.key}>
                    <td>
                      <strong>{row.issuer}</strong>
                      <span>{row.asset}</span>
                    </td>
                    <td>{row.chain}</td>
                    <td>{money(row.amountUsd, false)}</td>
                    <td>{money(row.eligibleUsd, false)}</td>
                    <td>{money(stress, false)}</td>
                    <td>{row.reserveAgeDays} days</td>
                    <td>{confidenceLabel(row.confidence)}</td>
                    <td>{row.jurisdiction}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.splitGrid}>
        <section className={styles.panel}>
          <PanelTitle
            icon={<ArrowRightLeft size={18} />}
            title="Liquidity Routes"
            meta="Capacity uses selected scenario"
          />
          <div className={styles.routeList}>
            {routeRows.map((route) => (
              <article key={route.id} className={styles.routeCard}>
                <div className={styles.routeHead}>
                  <StatusPill severity={route.routeSeverity} />
                  <strong>{route.asset}</strong>
                  <span>{route.eta}</span>
                </div>
                <h3>
                  {route.from} <span>to</span> {route.to}
                </h3>
                <p>{route.path}</p>
                <dl>
                  <div>
                    <dt>Capacity</dt>
                    <dd>{money(route.scenarioCapacity, false)}</dd>
                  </div>
                  <div>
                    <dt>Slippage</dt>
                    <dd>{Math.round(route.slippage)} bps</dd>
                  </div>
                  <div>
                    <dt>Limit</dt>
                    <dd>{route.limit}</dd>
                  </div>
                  <div>
                    <dt>Source</dt>
                    <dd>
                      {route.source}; {confidenceLabel(route.confidence)}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.panel}>
          <PanelTitle icon={<Filter size={18} />} title="Risk Signals" meta={signalFilter} />
          <div className={styles.signalTabs} aria-label="Signal filters">
            {[
              ["open", "Open"],
              ["critical", "High+"],
              ["resolved", "Reviewed"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={signalFilter === value ? styles.segmentActive : styles.segment}
                onClick={() => setSignalFilter(value as "open" | "critical" | "resolved")}
              >
                {label}
              </button>
            ))}
          </div>
          {signalRows.length === 0 ? (
            <div className={styles.emptyState}>
              <Info size={20} aria-hidden="true" />
              <strong>No signals match this filter.</strong>
              <span>Try Open or High+ to review seeded exceptions.</span>
            </div>
          ) : (
            <div className={styles.signalList}>
              {signalRows.map((signal) => (
                <article key={signal.id} className={styles.signalItem}>
                  <StatusPill severity={signal.activeSeverity} />
                  <div>
                    <h3>{signal.title}</h3>
                    <p>{signal.detail}</p>
                    <span>
                      {signal.target} - owner: {signal.owner} - {signal.firstSeen}
                    </span>
                    <small>{signal.evidence}</small>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>

      <section className={styles.provenance}>
        <Database size={18} aria-hidden="true" />
        <div>
          <strong>Demo provenance</strong>
          <p>
            All balances, obligations, risk scores, route capacities, prices, reserve ages,
            and compliance statuses are seeded fixtures in this route. Production sources
            would include read-only wallet/indexer data, custodian exports, market depth,
            issuer disclosures, screening imports, ERP obligations, and audit logs.
          </p>
        </div>
      </section>
    </main>
  )
}

function MetricCard({
  icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: React.ReactNode
  label: string
  value: string
  detail: string
  tone: "good" | "watch" | "bad"
}) {
  return (
    <article className={`${styles.metricCard} ${styles[tone]}`}>
      <div className={styles.metricIcon}>{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  )
}

function PanelTitle({
  icon,
  title,
  meta,
}: {
  icon: React.ReactNode
  title: string
  meta: string
}) {
  return (
    <div className={styles.panelTitle}>
      <div>
        {icon}
        <h2>{title}</h2>
      </div>
      <span>{meta}</span>
    </div>
  )
}

function StatusPill({ severity }: { severity: Severity }) {
  return (
    <span className={`${styles.statusPill} ${styles[`status${severity}`]}`}>
      {severityLabel(severity)}
    </span>
  )
}
