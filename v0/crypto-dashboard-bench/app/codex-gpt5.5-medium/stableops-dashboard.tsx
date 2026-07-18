"use client"

import {
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Database,
  Filter,
  LockKeyhole,
  Radar,
  ShieldCheck,
  SlidersHorizontal,
  WalletCards,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import {
  corridors,
  issuerColors,
  scenarios,
  severityRank,
  type Corridor,
  type Issuer,
  type Scenario,
  type ScenarioId,
  type Severity,
  type TreasuryPosition,
} from "./data"
import styles from "./stableops.module.css"

type Thresholds = {
  maxPegBps: number
  minLiquidityUsd: number
  maxRiskScore: number
}

const defaultThresholds: Thresholds = {
  maxPegBps: 25,
  minLiquidityUsd: 10000000,
  maxRiskScore: 70,
}

const scenarioIds: ScenarioId[] = ["normal", "volatile", "incident", "empty"]

function readSavedThresholds() {
  if (typeof window === "undefined") {
    return defaultThresholds
  }

  const saved = window.localStorage.getItem("stableops-thresholds")
  return saved ? { ...defaultThresholds, ...JSON.parse(saved) } : defaultThresholds
}

function readSavedAlerts() {
  if (typeof window === "undefined") {
    return []
  }

  const saved = window.localStorage.getItem("stableops-acked-alerts")
  return saved ? JSON.parse(saved) : []
}

function usd(value: number) {
  if (Math.abs(value) >= 1000000) {
    return `$${(value / 1000000).toFixed(value >= 10000000 ? 1 : 2)}M`
  }
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
}

function pct(value: number) {
  return `${Math.round(value * 100)}%`
}

function severityLabel(severity: Severity) {
  return severity.charAt(0).toUpperCase() + severity.slice(1)
}

function maxSeverity(positions: TreasuryPosition[]) {
  return positions.reduce<Severity>(
    (highest, position) =>
      severityRank[position.status] > severityRank[highest]
        ? position.status
        : highest,
    "low"
  )
}

function positionBreaches(position: TreasuryPosition, thresholds: Thresholds) {
  const breaches = []
  if (Math.abs(position.pegBasisPoints) > thresholds.maxPegBps) {
    breaches.push("peg")
  }
  if (position.liquidityDepthUsd < thresholds.minLiquidityUsd) {
    breaches.push("liquidity")
  }
  if (position.riskScore > thresholds.maxRiskScore) {
    breaches.push("risk")
  }
  return breaches
}

function scenarioById(id: ScenarioId) {
  return scenarios.find((scenario) => scenario.id === id) ?? scenarios[0]
}

export function StableOpsDashboard() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("volatile")
  const [selectedCorridorId, setSelectedCorridorId] = useState(corridors[0].id)
  const [selectedIssuer, setSelectedIssuer] = useState<Issuer | "all">("all")
  const [thresholds, setThresholds] =
    useState<Thresholds>(readSavedThresholds)
  const [acknowledgedAlerts, setAcknowledgedAlerts] =
    useState<string[]>(readSavedAlerts)
  const [draftPlan, setDraftPlan] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(
      "stableops-thresholds",
      JSON.stringify(thresholds)
    )
  }, [thresholds])

  useEffect(() => {
    window.localStorage.setItem(
      "stableops-acked-alerts",
      JSON.stringify(acknowledgedAlerts)
    )
  }, [acknowledgedAlerts])

  const scenario = scenarioById(scenarioId)
  const selectedCorridor =
    corridors.find((corridor) => corridor.id === selectedCorridorId) ??
    corridors[0]

  const filteredPositions = useMemo(() => {
    return scenario.positions.filter((position) => {
      if (selectedIssuer !== "all" && position.issuer !== selectedIssuer) {
        return false
      }
      return true
    })
  }, [scenario.positions, selectedIssuer])

  const eligiblePositions = useMemo(() => {
    return filteredPositions
      .filter((position) => {
        return (
          selectedCorridor.preferredRails.includes(position.chain) &&
          !selectedCorridor.blockedVenues.includes(position.venue) &&
          position.liquidityDepthUsd >= selectedCorridor.minLiquidityUsd &&
          position.availableNowUsd > 0
        )
      })
      .sort((a, b) => a.riskScore - b.riskScore)
  }, [filteredPositions, selectedCorridor])

  const totalBalance = filteredPositions.reduce(
    (sum, position) => sum + position.balanceUsd,
    0
  )
  const availableNow = filteredPositions.reduce(
    (sum, position) => sum + position.availableNowUsd,
    0
  )
  const riskWeighted = totalBalance
    ? Math.round(
        filteredPositions.reduce(
          (sum, position) => sum + position.riskScore * position.balanceUsd,
          0
        ) / totalBalance
      )
    : 0
  const coverage = selectedCorridor.needUsd
    ? Math.min(1, availableNow / selectedCorridor.needUsd)
    : 0
  const eligibleCoverage = selectedCorridor.needUsd
    ? Math.min(
        1,
        eligiblePositions.reduce(
          (sum, position) => sum + position.availableNowUsd,
          0
        ) / selectedCorridor.needUsd
      )
    : 0

  const activeAlerts = scenario.alerts.filter(
    (alert) => !acknowledgedAlerts.includes(alert.id)
  )
  const plannedSources = eligiblePositions.slice(0, 3)
  const planTotal = plannedSources.reduce(
    (sum, position) => sum + Math.min(position.availableNowUsd, 6400000),
    0
  )

  function updateThreshold(key: keyof Thresholds, value: number) {
    setThresholds((current) => ({ ...current, [key]: value }))
  }

  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.brandCluster}>
          <div className={styles.logoMark} aria-hidden="true">
            <Radar size={22} />
          </div>
          <div>
            <p className={styles.eyebrow}>Seeded demo, not live data</p>
            <h1>StableOps Radar</h1>
          </div>
        </div>
        <div className={styles.statusStrip}>
          <span>
            <Database size={16} /> Snapshot {formatTime(scenario.generatedAt)}
          </span>
          <span>
            <ShieldCheck size={16} /> Read-only wallet model
          </span>
          <span className={styles.statusLive}>Demo</span>
        </div>
      </header>

      <section className={styles.heroBand}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Treasury risk cockpit</p>
          <h2>{scenario.headline}</h2>
          <p>
            Decide whether today&apos;s stablecoin balances can fund a corridor
            without breaching peg, liquidity, concentration, sanctions, or
            operational policy.
          </p>
        </div>
        <div className={styles.controlPanel} aria-label="Scenario controls">
          <div className={styles.segmented}>
            {scenarioIds.map((id) => (
              <button
                key={id}
                type="button"
                className={scenarioId === id ? styles.activeSegment : ""}
                onClick={() => {
                  setScenarioId(id)
                  setDraftPlan(false)
                }}
              >
                {scenarioById(id).label}
              </button>
            ))}
          </div>
          <label className={styles.selectLabel}>
            Corridor
            <select
              value={selectedCorridorId}
              onChange={(event) => setSelectedCorridorId(event.target.value)}
            >
              {corridors.map((corridor) => (
                <option key={corridor.id} value={corridor.id}>
                  {corridor.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className={styles.kpiGrid} aria-label="Treasury summary">
        <MetricCard
          icon={<CircleDollarSign size={18} />}
          label="Total monitored"
          value={totalBalance ? usd(totalBalance) : "No data"}
          detail={`${usd(availableNow)} immediately available`}
        />
        <MetricCard
          icon={<WalletCards size={18} />}
          label="Corridor coverage"
          value={scenario.positions.length ? pct(coverage) : "Empty"}
          detail={`${pct(eligibleCoverage)} passes current policy`}
          tone={eligibleCoverage < 1 ? "warning" : "good"}
        />
        <MetricCard
          icon={<AlertTriangle size={18} />}
          label="Active alerts"
          value={String(activeAlerts.length)}
          detail={`${scenario.alerts.length - activeAlerts.length} acknowledged`}
          tone={activeAlerts.some((alert) => alert.severity === "critical")
            ? "danger"
            : activeAlerts.length
              ? "warning"
              : "good"}
        />
        <MetricCard
          icon={<LockKeyhole size={18} />}
          label="Weighted risk"
          value={scenario.positions.length ? String(riskWeighted) : "--"}
          detail={`Max position ${severityLabel(maxSeverity(filteredPositions))}`}
          tone={riskWeighted > 70 ? "danger" : riskWeighted > 45 ? "warning" : "good"}
        />
      </section>

      <section className={styles.workbench}>
        <aside className={styles.leftRail}>
          <div className={styles.panel}>
            <div className={styles.panelTitle}>
              <Filter size={17} />
              <h3>Focus</h3>
            </div>
            <div className={styles.tokenFilter}>
              {(["all", "USDC", "USDT", "PYUSD", "USDP"] as const).map(
                (issuer) => (
                  <button
                    type="button"
                    key={issuer}
                    className={selectedIssuer === issuer ? styles.activeChip : ""}
                    onClick={() => setSelectedIssuer(issuer)}
                  >
                    {issuer}
                  </button>
                )
              )}
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelTitle}>
              <SlidersHorizontal size={17} />
              <h3>Policy thresholds</h3>
            </div>
            <ThresholdSlider
              label="Max peg move"
              value={thresholds.maxPegBps}
              min={5}
              max={100}
              suffix="bps"
              onChange={(value) => updateThreshold("maxPegBps", value)}
            />
            <ThresholdSlider
              label="Min depth"
              value={thresholds.minLiquidityUsd / 1000000}
              min={1}
              max={80}
              suffix="M"
              onChange={(value) =>
                updateThreshold("minLiquidityUsd", value * 1000000)
              }
            />
            <ThresholdSlider
              label="Max risk score"
              value={thresholds.maxRiskScore}
              min={20}
              max={95}
              suffix=""
              onChange={(value) => updateThreshold("maxRiskScore", value)}
            />
          </div>

          <div className={styles.panel}>
            <div className={styles.panelTitle}>
              <Clock3 size={17} />
              <h3>Corridor policy</h3>
            </div>
            <dl className={styles.policyList}>
              <div>
                <dt>Need</dt>
                <dd>{usd(selectedCorridor.needUsd)}</dd>
              </div>
              <div>
                <dt>Deadline</dt>
                <dd>{selectedCorridor.deadline}</dd>
              </div>
              <div>
                <dt>Rails</dt>
                <dd>{selectedCorridor.preferredRails.join(", ")}</dd>
              </div>
            </dl>
          </div>
        </aside>

        <section className={styles.mainGrid}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.eyebrow}>Decision queue</p>
                <h3>Position health and provenance</h3>
              </div>
              <span className={styles.helpText}>Rows are seeded demo data.</span>
            </div>
            {filteredPositions.length ? (
              <div className={styles.positionTable}>
                {filteredPositions.map((position) => (
                  <PositionRow
                    key={position.id}
                    position={position}
                    breaches={positionBreaches(position, thresholds)}
                    corridor={selectedCorridor}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>

          <div className={styles.splitGrid}>
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.eyebrow}>Flow forecast</p>
                  <h3>Buffer by hour</h3>
                </div>
                <span className={styles.helpText}>USD millions</span>
              </div>
              {scenario.flow.length ? <FlowChart scenario={scenario} /> : <EmptyState />}
            </div>

            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.eyebrow}>Exposure</p>
                  <h3>Issuer mix</h3>
                </div>
              </div>
              {filteredPositions.length ? (
                <IssuerMix positions={filteredPositions} />
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        </section>

        <aside className={styles.rightRail}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.eyebrow}>Action center</p>
                <h3>Alerts</h3>
              </div>
            </div>
            <div className={styles.alertStack}>
              {activeAlerts.length ? (
                activeAlerts.map((alert) => (
                  <article
                    key={alert.id}
                    className={`${styles.alertCard} ${styles[alert.severity]}`}
                  >
                    <div>
                      <span>{severityLabel(alert.severity)}</span>
                      <span>{alert.age}</span>
                    </div>
                    <h4>{alert.title}</h4>
                    <p>{alert.detail}</p>
                    <small>{alert.source}</small>
                    <button
                      type="button"
                      onClick={() =>
                        setAcknowledgedAlerts((current) => [
                          ...current,
                          alert.id,
                        ])
                      }
                    >
                      Acknowledge
                    </button>
                  </article>
                ))
              ) : (
                <div className={styles.quietState}>
                  <CheckCircle2 size={22} />
                  <p>No active alerts in this scenario.</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.eyebrow}>Workflow</p>
                <h3>Rebalance plan</h3>
              </div>
            </div>
            {eligiblePositions.length ? (
              <div className={styles.planBox}>
                <p>
                  Suggested policy-safe capacity:{" "}
                  <strong>{usd(Math.min(planTotal, selectedCorridor.needUsd))}</strong>
                </p>
                <ul>
                  {plannedSources.map((position) => (
                    <li key={position.id}>
                      <span>
                        {position.issuer} on {position.chain}
                      </span>
                      <strong>{usd(Math.min(position.availableNowUsd, 6400000))}</strong>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={styles.primaryAction}
                  onClick={() => setDraftPlan(true)}
                >
                  <ArrowRightLeft size={16} />
                  Draft approval
                </button>
                {draftPlan ? (
                  <p className={styles.confirmation}>
                    Draft saved locally for demo review. No transaction was
                    created or submitted.
                  </p>
                ) : null}
              </div>
            ) : (
              <div className={styles.quietState}>
                <AlertTriangle size={22} />
                <p>No eligible source clears this corridor and policy set.</p>
              </div>
            )}
          </div>
        </aside>
      </section>
    </main>
  )
}

function MetricCard({
  icon,
  label,
  value,
  detail,
  tone = "neutral",
}: {
  icon: React.ReactNode
  label: string
  value: string
  detail: string
  tone?: "neutral" | "good" | "warning" | "danger"
}) {
  return (
    <article className={`${styles.metricCard} ${styles[tone]}`}>
      <div className={styles.metricIcon}>{icon}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
    </article>
  )
}

function ThresholdSlider({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  suffix: string
  onChange: (value: number) => void
}) {
  return (
    <label className={styles.sliderRow}>
      <span>
        {label}
        <strong>
          {Math.round(value)}
          {suffix}
        </strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  )
}

function PositionRow({
  position,
  breaches,
  corridor,
}: {
  position: TreasuryPosition
  breaches: string[]
  corridor: Corridor
}) {
  const corridorEligible =
    corridor.preferredRails.includes(position.chain) &&
    !corridor.blockedVenues.includes(position.venue) &&
    position.liquidityDepthUsd >= corridor.minLiquidityUsd

  return (
    <article className={styles.positionRow}>
      <div className={styles.assetCell}>
        <span
          className={styles.assetDot}
          style={{ background: issuerColors[position.issuer] }}
        />
        <div>
          <strong>{position.issuer}</strong>
          <span>
            {position.chain} · {position.venue}
          </span>
        </div>
      </div>
      <div className={styles.numberCell}>
        <span>Balance</span>
        <strong>{usd(position.balanceUsd)}</strong>
      </div>
      <div className={styles.numberCell}>
        <span>Peg</span>
        <strong>{position.pegPrice.toFixed(4)}</strong>
        <small>{position.pegBasisPoints} bps</small>
      </div>
      <div className={styles.numberCell}>
        <span>Depth</span>
        <strong>{usd(position.liquidityDepthUsd)}</strong>
        <small>{position.settlementMinutes}m settle</small>
      </div>
      <div className={styles.riskCell}>
        <span className={`${styles.badge} ${styles[position.status]}`}>
          {position.riskScore}
        </span>
        <small>{breaches.length ? breaches.join(", ") : "inside policy"}</small>
      </div>
      <div className={styles.provenanceCell}>
        <span>{corridorEligible ? "Eligible" : "Blocked"}</span>
        <small title={position.provenance}>{position.provenance}</small>
      </div>
    </article>
  )
}

function FlowChart({ scenario }: { scenario: Scenario }) {
  const max = Math.max(
    ...scenario.flow.flatMap((point) => [
      point.inflow,
      point.outflow,
      Math.abs(point.buffer),
    ])
  )

  return (
    <div className={styles.flowChart}>
      {scenario.flow.map((point) => (
        <div key={point.hour} className={styles.flowColumn}>
          <div className={styles.bars} aria-label={`${point.hour} flow`}>
            <span
              className={styles.inflow}
              style={{ height: `${Math.max(6, (point.inflow / max) * 100)}%` }}
            />
            <span
              className={styles.outflow}
              style={{ height: `${Math.max(6, (point.outflow / max) * 100)}%` }}
            />
            <span
              className={point.buffer < 0 ? styles.negativeBuffer : styles.buffer}
              style={{
                height: `${Math.max(6, (Math.abs(point.buffer) / max) * 100)}%`,
              }}
            />
          </div>
          <span>{point.hour}</span>
        </div>
      ))}
      <div className={styles.legend}>
        <span className={styles.legendIn}>In</span>
        <span className={styles.legendOut}>Out</span>
        <span className={styles.legendBuffer}>Buffer</span>
      </div>
    </div>
  )
}

function IssuerMix({ positions }: { positions: TreasuryPosition[] }) {
  const totals = positions.reduce<Record<string, number>>((acc, position) => {
    acc[position.issuer] = (acc[position.issuer] ?? 0) + position.balanceUsd
    return acc
  }, {})
  const total = Object.values(totals).reduce((sum, value) => sum + value, 0)

  return (
    <div className={styles.mixBox}>
      <div className={styles.mixBar}>
        {(Object.entries(totals) as [Issuer, number][]).map(([issuer, value]) => (
          <span
            key={issuer}
            style={{
              width: `${(value / total) * 100}%`,
              background: issuerColors[issuer],
            }}
            title={`${issuer} ${usd(value)}`}
          />
        ))}
      </div>
      <ul>
        {(Object.entries(totals) as [Issuer, number][]).map(([issuer, value]) => (
          <li key={issuer}>
            <span>
              <i style={{ background: issuerColors[issuer] }} />
              {issuer}
            </span>
            <strong>{pct(value / total)}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <Database size={24} />
      <p>No matching seeded records.</p>
      <span>Change scenario, token focus, or corridor policy.</span>
    </div>
  )
}

function formatTime(timestamp: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(new Date(timestamp))
}
