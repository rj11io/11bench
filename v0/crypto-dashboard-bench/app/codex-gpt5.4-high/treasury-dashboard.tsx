"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Filter,
  Landmark,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import {
  controlPosture,
  defaultPolicies,
  provenanceNotes,
  scenarios,
  type LiquidityBucket,
  type PolicyState,
  type ScenarioData,
  type ScenarioId,
  type Severity,
} from "./data";
import styles from "./treasury.module.css";

const scenarioOrder: ScenarioId[] = ["normal", "bridge", "exchange", "drill"];
const bucketOptions: Array<{
  id: LiquidityBucket | "all";
  label: string;
}> = [
  { id: "all", label: "All positions" },
  { id: "instant", label: "Instant" },
  { id: "same-day", label: "Same-day" },
  { id: "t+1", label: "T+1" },
];

const storageKeys = {
  scenario: "helm-treasury-scenario",
  policies: "helm-treasury-policies",
  acknowledged: "helm-treasury-acknowledged",
  completed: "helm-treasury-completed-actions",
};

type PolicyBreach = {
  id: string;
  title: string;
  summary: string;
  severity: Severity;
  source: string;
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function severityLabel(severity: Severity) {
  if (severity === "high") return "High";
  if (severity === "medium") return "Medium";
  return "Low";
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);

  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function clampPolicies(candidate: Partial<PolicyState>): PolicyState {
  return {
    maxVenueConcentration:
      candidate.maxVenueConcentration ?? defaultPolicies.maxVenueConcentration,
    maxBridgedExposure:
      candidate.maxBridgedExposure ?? defaultPolicies.maxBridgedExposure,
    minInstantLiquidity:
      candidate.minInstantLiquidity ?? defaultPolicies.minInstantLiquidity,
    maxSingleStablecoin:
      candidate.maxSingleStablecoin ?? defaultPolicies.maxSingleStablecoin,
    minRunwayDays: candidate.minRunwayDays ?? defaultPolicies.minRunwayDays,
  };
}

function createPolicyBreaches(
  data: ScenarioData,
  policies: PolicyState
): PolicyBreach[] {
  const breaches: PolicyBreach[] = [];

  if (data.metrics.venueConcentrationPct > policies.maxVenueConcentration) {
    breaches.push({
      id: "policy-venue",
      title: "Venue concentration exceeds policy",
      summary: `Largest venue share is ${data.metrics.venueConcentrationPct}% against a ${policies.maxVenueConcentration}% ceiling.`,
      severity: "high",
      source: "Policy engine",
    });
  }

  if (data.metrics.bridgedExposurePct > policies.maxBridgedExposure) {
    breaches.push({
      id: "policy-bridged",
      title: "Bridged stablecoin exposure exceeds policy",
      summary: `Bridged share is ${data.metrics.bridgedExposurePct}% against a ${policies.maxBridgedExposure}% ceiling.`,
      severity: "high",
      source: "Policy engine",
    });
  }

  if (data.metrics.instantLiquidityPct < policies.minInstantLiquidity) {
    breaches.push({
      id: "policy-instant",
      title: "Instant-liquidity floor is breached",
      summary: `Instant liquidity is ${data.metrics.instantLiquidityPct}% against a ${policies.minInstantLiquidity}% floor.`,
      severity: "high",
      source: "Policy engine",
    });
  }

  if (data.metrics.singleStablecoinPct > policies.maxSingleStablecoin) {
    breaches.push({
      id: "policy-stablecoin",
      title: "Single-stablecoin concentration exceeds policy",
      summary: `Largest stablecoin share is ${data.metrics.singleStablecoinPct}% against a ${policies.maxSingleStablecoin}% ceiling.`,
      severity: "high",
      source: "Policy engine",
    });
  }

  if (data.metrics.runwayDays < policies.minRunwayDays) {
    breaches.push({
      id: "policy-runway",
      title: "Runway coverage is below policy",
      summary: `Runway is ${data.metrics.runwayDays} days against a ${policies.minRunwayDays}-day floor.`,
      severity: "medium",
      source: "Policy engine",
    });
  }

  return breaches;
}

function buildLinePath(points: Array<{ actual: number }>, width: number, height: number) {
  const max = Math.max(...points.map((point) => point.actual), 1);
  const step = points.length === 1 ? 0 : width / (points.length - 1);

  return points
    .map((point, index) => {
      const x = index * step;
      const y = height - (point.actual / max) * height;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function buildAreaPath(points: Array<{ actual: number }>, width: number, height: number) {
  const line = buildLinePath(points, width, height);
  return `${line} L ${width} ${height} L 0 ${height} Z`;
}

function getToneClass(severity: Severity) {
  if (severity === "high") return styles.high;
  if (severity === "medium") return styles.medium;
  return styles.low;
}

export function TreasuryDashboard() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId>(() =>
    readJson<ScenarioId>(storageKeys.scenario, "normal")
  );
  const [policies, setPolicies] = useState<PolicyState>(() =>
    clampPolicies(readJson<Partial<PolicyState>>(storageKeys.policies, defaultPolicies))
  );
  const [acknowledged, setAcknowledged] = useState<Record<string, string[]>>(() =>
    readJson<Record<string, string[]>>(storageKeys.acknowledged, {})
  );
  const [completedActions, setCompletedActions] = useState<Record<string, string[]>>(
    () => readJson<Record<string, string[]>>(storageKeys.completed, {})
  );
  const [selectedBucket, setSelectedBucket] = useState<LiquidityBucket | "all">("all");
  const [selectedHoldingId, setSelectedHoldingId] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(storageKeys.scenario, JSON.stringify(selectedScenario));
  }, [selectedScenario]);

  useEffect(() => {
    window.localStorage.setItem(storageKeys.policies, JSON.stringify(policies));
  }, [policies]);

  useEffect(() => {
    window.localStorage.setItem(
      storageKeys.acknowledged,
      JSON.stringify(acknowledged)
    );
  }, [acknowledged]);

  useEffect(() => {
    window.localStorage.setItem(
      storageKeys.completed,
      JSON.stringify(completedActions)
    );
  }, [completedActions]);

  const scenario = scenarios[selectedScenario];
  const policyBreaches = createPolicyBreaches(scenario, policies);
  const acknowledgedIds = acknowledged[selectedScenario] ?? [];
  const combinedAlerts = [...scenario.alerts, ...policyBreaches];
  const openAlerts = combinedAlerts.filter(
    (alert) => !acknowledgedIds.includes(alert.id)
  );
  const filteredHoldings =
    selectedBucket === "all"
      ? scenario.holdings
      : scenario.holdings.filter(
          (holding) => holding.liquidityBucket === selectedBucket
        );

  const selectedHolding =
    filteredHoldings.find((holding) => holding.id === selectedHoldingId) ??
    filteredHoldings[0] ??
    null;

  const completedIds = completedActions[selectedScenario] ?? [];

  const venueChains = Array.from(
    new Set(scenario.holdings.map((holding) => holding.chain))
  );
  const venues = Array.from(
    new Set(scenario.holdings.map((holding) => holding.venue))
  );

  const maxHoldingAmount = Math.max(
    ...scenario.holdings.map((holding) => holding.amountUsd),
    1
  );

  const latencyPath = buildLinePath(scenario.latencySeries, 320, 120);
  const latencyArea = buildAreaPath(scenario.latencySeries, 320, 120);
  const latencyMax = Math.max(
    ...scenario.latencySeries.map((point) => Math.max(point.actual, point.policy)),
    1
  );

  return (
    <main className={styles.shell}>
      <div className={styles.aurora} />
      <section className={styles.frame}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Helm Treasury</p>
            <h1 className={styles.title}>Policy-led stablecoin treasury cockpit</h1>
            <p className={styles.lede}>
              A focused crypto dashboard for treasury and finance operators who
              need to decide whether their reserve mix is still safe, liquid, and
              within policy before money moves.
            </p>
          </div>
          <div className={styles.headerMeta}>
            <span className={styles.metaPill}>Seeded demo</span>
            <span className={styles.metaPill}>No live wallets</span>
            <span className={styles.metaPill}>Local state persists in this browser</span>
          </div>
        </header>

        <section className={styles.heroGrid}>
          <article className={styles.heroCard}>
            <div className={styles.heroTopline}>
              <span className={`${styles.stateBadge} ${getToneClass(scenario.tone)}`}>
                {scenario.stage}
              </span>
              <span className={styles.timestamp}>{scenario.timestamp}</span>
            </div>
            <h2 className={styles.heroHeadline}>{scenario.headline}</h2>
            <p className={styles.heroSummary}>{scenario.summary}</p>
            <div className={styles.promptBox}>
              <span className={styles.promptLabel}>Decision loop</span>
              <p>{scenario.decisionPrompt}</p>
            </div>
            <div className={styles.scenarioStrip}>
              {scenarioOrder.map((scenarioId) => {
                const item = scenarios[scenarioId];
                const isActive = selectedScenario === scenarioId;

                return (
                  <button
                    key={scenarioId}
                    type="button"
                    className={`${styles.scenarioButton} ${
                      isActive ? styles.scenarioButtonActive : ""
                    }`}
                    onClick={() => setSelectedScenario(scenarioId)}
                  >
                    <span>{item.label}</span>
                    <small>{item.stage}</small>
                  </button>
                );
              })}
            </div>
          </article>

          <aside className={styles.sideCard}>
            <div className={styles.cardHeading}>
              <h2>Trust and provenance</h2>
              <ShieldCheck size={18} />
            </div>
            <p className={styles.sideCopy}>
              The route models a production product, but every balance, control
              state, and incident here is seeded. The UI makes that explicit so
              nothing looks live when it is not.
            </p>
            <div className={styles.sideList}>
              {controlPosture.map((item) => (
                <div key={item.label} className={styles.sideListRow}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className={styles.metricsGrid} aria-label="Key treasury metrics">
          {scenario.topMetrics.map((metric) => (
            <article key={metric.label} className={styles.metricCard}>
              <p className={styles.metricLabel}>{metric.label}</p>
              <p
                className={`${styles.metricValue} ${
                  metric.tone ? getToneClass(metric.tone) : ""
                }`}
              >
                {metric.value}
              </p>
              <p className={styles.metricNote}>{metric.note}</p>
            </article>
          ))}
        </section>

        <section className={styles.mainGrid}>
          <article className={styles.policyCard}>
            <div className={styles.cardHeading}>
              <h2>Policy board</h2>
              <BadgeDollarSign size={18} />
            </div>
            <p className={styles.cardCopy}>
              Thresholds below are local, route-only demo controls. They
              immediately re-score the seeded scenario and persist in
              <code>localStorage</code>.
            </p>

            <div className={styles.policyControls}>
              <label className={styles.policyControl}>
                <span>
                  Max venue concentration
                  <strong>{policies.maxVenueConcentration}%</strong>
                </span>
                <input
                  aria-label="Max venue concentration"
                  type="range"
                  min="15"
                  max="45"
                  value={policies.maxVenueConcentration}
                  onChange={(event) =>
                    setPolicies((current) => ({
                      ...current,
                      maxVenueConcentration: Number(event.target.value),
                    }))
                  }
                />
              </label>

              <label className={styles.policyControl}>
                <span>
                  Max bridged exposure
                  <strong>{policies.maxBridgedExposure}%</strong>
                </span>
                <input
                  aria-label="Max bridged exposure"
                  type="range"
                  min="0"
                  max="20"
                  value={policies.maxBridgedExposure}
                  onChange={(event) =>
                    setPolicies((current) => ({
                      ...current,
                      maxBridgedExposure: Number(event.target.value),
                    }))
                  }
                />
              </label>

              <label className={styles.policyControl}>
                <span>
                  Minimum instant liquidity
                  <strong>{policies.minInstantLiquidity}%</strong>
                </span>
                <input
                  aria-label="Minimum instant liquidity"
                  type="range"
                  min="20"
                  max="60"
                  value={policies.minInstantLiquidity}
                  onChange={(event) =>
                    setPolicies((current) => ({
                      ...current,
                      minInstantLiquidity: Number(event.target.value),
                    }))
                  }
                />
              </label>

              <label className={styles.policyControl}>
                <span>
                  Max single stablecoin
                  <strong>{policies.maxSingleStablecoin}%</strong>
                </span>
                <input
                  aria-label="Max single stablecoin"
                  type="range"
                  min="30"
                  max="80"
                  value={policies.maxSingleStablecoin}
                  onChange={(event) =>
                    setPolicies((current) => ({
                      ...current,
                      maxSingleStablecoin: Number(event.target.value),
                    }))
                  }
                />
              </label>
            </div>

            <div className={styles.policySummary}>
              <div className={styles.stackBar}>
                <div
                  className={styles.stackInstant}
                  style={{ width: `${scenario.liquidityMix.instant}%` }}
                />
                <div
                  className={styles.stackSameDay}
                  style={{ width: `${scenario.liquidityMix["same-day"]}%` }}
                />
                <div
                  className={styles.stackT1}
                  style={{ width: `${scenario.liquidityMix["t+1"]}%` }}
                />
                <div
                  className={styles.stackTarget}
                  style={{ left: `${policies.minInstantLiquidity}%` }}
                />
              </div>
              <div className={styles.stackLegend}>
                <span>
                  <CircleDashed size={14} />
                  Instant {scenario.liquidityMix.instant}%
                </span>
                <span>
                  <Clock3 size={14} />
                  Same-day {scenario.liquidityMix["same-day"]}%
                </span>
                <span>
                  <Landmark size={14} />
                  T+1 {scenario.liquidityMix["t+1"]}%
                </span>
                <span>
                  Target {policies.minInstantLiquidity}%
                </span>
              </div>
            </div>

            <div className={styles.alertsPanel}>
              <div className={styles.alertsHeader}>
                <h3>Open findings</h3>
                <button
                  type="button"
                  className={styles.resetButton}
                  onClick={() => setPolicies(defaultPolicies)}
                >
                  Reset defaults
                </button>
              </div>

              {openAlerts.length === 0 ? (
                <div className={styles.emptyState}>
                  <CheckCircle2 size={20} />
                  <div>
                    <strong>No open breach</strong>
                    <p>
                      This scenario is inside the current local policy settings,
                      or every seeded alert has already been acknowledged.
                    </p>
                  </div>
                </div>
              ) : (
                <div className={styles.alertList}>
                  {openAlerts.map((alert) => (
                    <article
                      key={alert.id}
                      className={`${styles.alertCard} ${getToneClass(alert.severity)}`}
                    >
                      <div className={styles.alertHeader}>
                        <div>
                          <p className={styles.alertTitle}>{alert.title}</p>
                          <p className={styles.alertSource}>{alert.source}</p>
                        </div>
                        <span className={styles.alertSeverity}>
                          {severityLabel(alert.severity)}
                        </span>
                      </div>
                      <p className={styles.alertSummary}>{alert.summary}</p>
                      <button
                        type="button"
                        className={styles.ackButton}
                        onClick={() =>
                          setAcknowledged((current) => ({
                            ...current,
                            [selectedScenario]: [
                              ...(current[selectedScenario] ?? []),
                              alert.id,
                            ],
                          }))
                        }
                      >
                        Acknowledge
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </article>

          <aside className={styles.actionsCard}>
            <div className={styles.cardHeading}>
              <h2>Recommended moves</h2>
              <ArrowRight size={18} />
            </div>
            <p className={styles.cardCopy}>
              Each move is a seeded operator action, not an executable workflow.
              The product promise is to reduce time-to-decision, not to simulate
              signing.
            </p>

            <div className={styles.actionList}>
              {scenario.actions.map((action) => {
                const isDone = completedIds.includes(action.id);

                return (
                  <label key={action.id} className={styles.actionRow}>
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() =>
                        setCompletedActions((current) => {
                          const currentIds = current[selectedScenario] ?? [];
                          const nextIds = isDone
                            ? currentIds.filter((id) => id !== action.id)
                            : [...currentIds, action.id];

                          return {
                            ...current,
                            [selectedScenario]: nextIds,
                          };
                        })
                      }
                    />
                    <div>
                      <strong>{action.title}</strong>
                      <p>
                        {action.amount} · {action.from} <ArrowRight size={14} />{" "}
                        {action.to}
                      </p>
                      <small>
                        {action.eta} · {action.impact}
                      </small>
                    </div>
                  </label>
                );
              })}
            </div>
          </aside>
        </section>

        <section className={styles.analysisGrid}>
          <article className={styles.chartCard}>
            <div className={styles.cardHeading}>
              <h2>Settlement latency trend</h2>
              <Clock3 size={18} />
            </div>
            <p className={styles.cardCopy}>
              The chart shows seeded weighted settlement minutes across the last
              seven review windows. The dotted baseline is a 20-minute policy
              band for the demo.
            </p>
            <svg
              className={styles.chart}
              viewBox="0 0 320 160"
              role="img"
              aria-label="Weighted settlement latency over time"
            >
              <line
                x1="0"
                x2="320"
                y1={120 - (20 / latencyMax) * 120}
                y2={120 - (20 / latencyMax) * 120}
                className={styles.chartTarget}
              />
              <path d={latencyArea} className={styles.chartArea} />
              <path d={latencyPath} className={styles.chartLine} />
              {scenario.latencySeries.map((point, index) => {
                const x = scenario.latencySeries.length === 1 ? 0 : (320 / (scenario.latencySeries.length - 1)) * index;
                const y = 120 - (point.actual / latencyMax) * 120;

                return (
                  <g key={point.label}>
                    <circle cx={x} cy={y} r="4" className={styles.chartDot} />
                    <text x={x} y="148" textAnchor="middle" className={styles.chartLabel}>
                      {point.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </article>

          <article className={styles.mixCard}>
            <div className={styles.cardHeading}>
              <h2>Reserve mix</h2>
              <WalletCards size={18} />
            </div>
            <p className={styles.cardCopy}>
              The dashboard separates asset mix from liquidity mix so treasury
              can see that a nominally stable reserve can still be operationally
              brittle.
            </p>
            <div className={styles.mixBar}>
              {scenario.stablecoinMix.map((item) => (
                <div
                  key={item.asset}
                  className={styles.mixSegment}
                  style={{ width: `${item.pct}%`, background: item.color }}
                />
              ))}
            </div>
            <div className={styles.mixList}>
              {scenario.stablecoinMix.map((item) => (
                <div key={item.asset} className={styles.mixItem}>
                  <span
                    className={styles.mixSwatch}
                    style={{ background: item.color }}
                  />
                  <span>{item.asset}</span>
                  <strong>{item.pct}%</strong>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className={styles.holdingsGrid}>
          <article className={styles.positionsCard}>
            <div className={styles.cardHeading}>
              <h2>Position register</h2>
              <Filter size={18} />
            </div>
            <div className={styles.filterStrip}>
              {bucketOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`${styles.filterButton} ${
                    selectedBucket === option.id ? styles.filterButtonActive : ""
                  }`}
                  onClick={() => setSelectedBucket(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className={styles.desktopTable}>
              <table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Amount</th>
                    <th>Liquidity</th>
                    <th>Settlement</th>
                    <th>Control</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHoldings.map((holding) => (
                    <tr
                      key={holding.id}
                      className={
                        selectedHoldingId === holding.id ? styles.rowSelected : ""
                      }
                      onClick={() => setSelectedHoldingId(holding.id)}
                    >
                      <td>
                        <strong>{holding.label}</strong>
                        <span>
                          {holding.asset} · {holding.chain} · {holding.venue}
                        </span>
                      </td>
                      <td>{formatMoney(holding.amountUsd)}</td>
                      <td>{holding.liquidityBucket}</td>
                      <td>{holding.settlementMins} min</td>
                      <td>{holding.control}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.mobileCards}>
              {filteredHoldings.map((holding) => (
                <button
                  key={holding.id}
                  type="button"
                  className={`${styles.mobilePosition} ${
                    selectedHoldingId === holding.id ? styles.mobilePositionActive : ""
                  }`}
                  onClick={() => setSelectedHoldingId(holding.id)}
                >
                  <strong>{holding.label}</strong>
                  <p>
                    {holding.asset} · {holding.chain} · {holding.venue}
                  </p>
                  <span>
                    {formatMoney(holding.amountUsd)} · {holding.liquidityBucket}
                  </span>
                </button>
              ))}
            </div>
          </article>

          <aside className={styles.detailCard}>
            <div className={styles.cardHeading}>
              <h2>Selected position</h2>
              <Building2 size={18} />
            </div>

            {selectedHolding ? (
              <>
                <div className={styles.detailHeader}>
                  <div>
                    <p className={styles.detailLabel}>{selectedHolding.venueType}</p>
                    <h3>{selectedHolding.label}</h3>
                  </div>
                  <span className={styles.detailRisk}>{selectedHolding.riskLabel}</span>
                </div>

                <div className={styles.detailAmountWrap}>
                  <p className={styles.detailAmount}>
                    {formatMoney(selectedHolding.amountUsd)}
                  </p>
                  <div className={styles.amountBar}>
                    <div
                      className={styles.amountFill}
                      style={{
                        width: `${(selectedHolding.amountUsd / maxHoldingAmount) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className={styles.detailMetaGrid}>
                  <div>
                    <span>Asset</span>
                    <strong>{selectedHolding.asset}</strong>
                  </div>
                  <div>
                    <span>Asset type</span>
                    <strong>{selectedHolding.assetType}</strong>
                  </div>
                  <div>
                    <span>Chain</span>
                    <strong>{selectedHolding.chain}</strong>
                  </div>
                  <div>
                    <span>Liquidity bucket</span>
                    <strong>{selectedHolding.liquidityBucket}</strong>
                  </div>
                  <div>
                    <span>Settlement assumption</span>
                    <strong>{selectedHolding.settlementMins} min</strong>
                  </div>
                  <div>
                    <span>Control</span>
                    <strong>{selectedHolding.control}</strong>
                  </div>
                </div>

                <div className={styles.noteBlock}>
                  <span>Provenance</span>
                  <strong>{selectedHolding.provenance}</strong>
                  <p>{selectedHolding.note}</p>
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <AlertTriangle size={20} />
                <div>
                  <strong>No position in this filter</strong>
                  <p>Choose another liquidity bucket to inspect seeded holdings.</p>
                </div>
              </div>
            )}
          </aside>
        </section>

        <section className={styles.matrixGrid}>
          <article className={styles.matrixCard}>
            <div className={styles.cardHeading}>
              <h2>Venue × chain exposure matrix</h2>
              <WalletCards size={18} />
            </div>
            <p className={styles.cardCopy}>
              This view is the product differentiator: treasury sees not just how
              much value exists, but where asset provenance and operational
              optionality intersect.
            </p>
            <div className={styles.matrixTableWrap}>
              <table className={styles.matrixTable}>
                <thead>
                  <tr>
                    <th>Venue</th>
                    {venueChains.map((chain) => (
                      <th key={chain}>{chain}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {venues.map((venue) => (
                    <tr key={venue}>
                      <td>{venue}</td>
                      {venueChains.map((chain) => {
                        const total = scenario.holdings
                          .filter(
                            (holding) =>
                              holding.venue === venue && holding.chain === chain
                          )
                          .reduce((sum, holding) => sum + holding.amountUsd, 0);
                        const pct = total === 0 ? 0 : Math.round((total / scenario.metrics.treasuryUsd) * 100);

                        return (
                          <td key={`${venue}-${chain}`}>
                            <div
                              className={styles.matrixCell}
                              style={{
                                opacity: total === 0 ? 0.1 : Math.min(0.95, pct / 20),
                              }}
                            >
                              {total === 0 ? "—" : `${pct}%`}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <aside className={styles.logCard}>
            <div className={styles.cardHeading}>
              <h2>Live-model wiring plan</h2>
              <Landmark size={18} />
            </div>
            <div className={styles.provenanceList}>
              {provenanceNotes.map((item) => (
                <div key={item.label} className={styles.provenanceItem}>
                  <strong>{item.label}</strong>
                  <p>
                    <span>Live input:</span> {item.live}
                  </p>
                  <p>
                    <span>Demo substitute:</span> {item.demo}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className={styles.footerGrid}>
          <article className={styles.logCard}>
            <div className={styles.cardHeading}>
              <h2>Event log</h2>
              <Clock3 size={18} />
            </div>
            <div className={styles.timeline}>
              {scenario.eventLog.map((item) => (
                <div key={`${item.time}-${item.note}`} className={styles.timelineRow}>
                  <span className={`${styles.timelineDot} ${getToneClass(item.severity)}`} />
                  <div>
                    <strong>
                      {item.time} · {item.source}
                    </strong>
                    <p>{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.logCard}>
            <div className={styles.cardHeading}>
              <h2>Product fit</h2>
              <ShieldCheck size={18} />
            </div>
            <div className={styles.fitList}>
              <div>
                <strong>Primary user</strong>
                <p>
                  Treasury lead or finance-ops manager at a crypto-native company
                  or stablecoin payment operator.
                </p>
              </div>
              <div>
                <strong>Core habit</strong>
                <p>
                  Morning reserve review, pre-payout risk check, and event-driven
                  rebalance decisions.
                </p>
              </div>
              <div>
                <strong>Why this wedge</strong>
                <p>
                  It turns crypto complexity into a clear treasury question:
                  which obligations still clear if issuer, venue, or chain
                  conditions degrade.
                </p>
              </div>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
