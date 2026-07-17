"use client"

import { useEffect, useMemo, useState } from "react"

import {
  policyDefaults,
  scenarios,
  tabs,
  type ActionItem,
  type PolicyDefaults,
  type ScenarioId,
  type TabId,
} from "./data"
import styles from "./sentinel.module.css"

const STORAGE_KEY = "sentinel-treasury-demo-state"

type PersistedState = {
  scenario: ScenarioId
  tab: TabId
  completedActionIds: string[]
  acknowledgedRiskIds: string[]
  policy: PolicyDefaults
}

const defaultState: PersistedState = {
  scenario: "steady",
  tab: "command",
  completedActionIds: [],
  acknowledgedRiskIds: [],
  policy: policyDefaults,
}

function getSeverityWeight(severity: string) {
  if (severity === "Critical") return 4
  if (severity === "High") return 3
  if (severity === "Moderate") return 2
  return 1
}

function getToneClass(tone: "neutral" | "good" | "warn" | "bad") {
  if (tone === "good") return styles.good
  if (tone === "warn") return styles.warn
  if (tone === "bad") return styles.bad
  return styles.neutral
}

export function SentinelDashboard() {
  const [state, setState] = useState<PersistedState>(() => {
    if (typeof window === "undefined") {
      return defaultState
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return defaultState
      const parsed = JSON.parse(raw) as Partial<PersistedState>

      return {
        scenario: parsed.scenario ?? defaultState.scenario,
        tab: parsed.tab ?? defaultState.tab,
        completedActionIds: parsed.completedActionIds ?? [],
        acknowledgedRiskIds: parsed.acknowledgedRiskIds ?? [],
        policy: {
          maxIssuerShare:
            parsed.policy?.maxIssuerShare ?? defaultState.policy.maxIssuerShare,
          minReserveScore:
            parsed.policy?.minReserveScore ?? defaultState.policy.minReserveScore,
          maxVenueShare:
            parsed.policy?.maxVenueShare ?? defaultState.policy.maxVenueShare,
        },
      }
    } catch {
      return defaultState
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [state])

  const scenario = scenarios[state.scenario]

  const derived = useMemo(() => {
    const issuerBreaches = scenario.issuers.filter(
      (issuer) =>
        issuer.share > state.policy.maxIssuerShare ||
        issuer.reserveScore < state.policy.minReserveScore
    )
    const venueBreaches = scenario.venues.filter(
      (venue) => venue.share > state.policy.maxVenueShare
    )
    const unresolvedCritical = scenario.risks.filter(
      (risk) =>
        getSeverityWeight(risk.severity) >= 3 &&
        !state.acknowledgedRiskIds.includes(risk.id)
    )
    const completionRatio = scenario.actions.length
      ? state.completedActionIds.filter((id) =>
          scenario.actions.some((action) => action.id === id)
        ).length / scenario.actions.length
      : 0

    return {
      issuerBreaches,
      venueBreaches,
      unresolvedCritical,
      completionRatio,
    }
  }, [scenario, state.acknowledgedRiskIds, state.completedActionIds, state.policy])

  const activeTab = tabs.find((tab) => tab.id === state.tab) ?? tabs[0]

  const toggleAction = (action: ActionItem) => {
    setState((current) => {
      const done = current.completedActionIds.includes(action.id)
      return {
        ...current,
        completedActionIds: done
          ? current.completedActionIds.filter((id) => id !== action.id)
          : [...current.completedActionIds, action.id],
      }
    })
  }

  const toggleRisk = (riskId: string) => {
    setState((current) => {
      const done = current.acknowledgedRiskIds.includes(riskId)
      return {
        ...current,
        acknowledgedRiskIds: done
          ? current.acknowledgedRiskIds.filter((id) => id !== riskId)
          : [...current.acknowledgedRiskIds, riskId],
      }
    })
  }

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroTopline}>
          <span className={styles.kicker}>Sentinel Treasury</span>
          <span className={styles.demoPill}>Seeded demo data</span>
        </div>
        <div className={styles.heroCopy}>
          <div>
            <p className={styles.eyebrow}>Stablecoin treasury risk cockpit</p>
            <h1>{scenario.treasuryName}</h1>
            <p className={styles.summary}>{scenario.summary}</p>
          </div>
          <div className={styles.heroMeta}>
            <div>
              <span className={styles.metaLabel}>Snapshot</span>
              <strong>{scenario.snapshotTime}</strong>
            </div>
            <div>
              <span className={styles.metaLabel}>Desk state</span>
              <strong>{scenario.status}</strong>
            </div>
            <div>
              <span className={styles.metaLabel}>Action progress</span>
              <strong>{Math.round(derived.completionRatio * 100)}%</strong>
            </div>
          </div>
        </div>
        <p className={styles.banner}>{scenario.banner}</p>
      </section>

      <section className={styles.toolbar}>
        <div className={styles.scenarioPicker}>
          {Object.values(scenarios).map((item) => (
            <button
              key={item.id}
              className={item.id === state.scenario ? styles.scenarioActive : styles.scenarioButton}
              onClick={() =>
                setState((current) => ({
                  ...current,
                  scenario: item.id,
                }))
              }
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={tab.id === activeTab.id ? styles.tabActive : styles.tabButton}
              onClick={() => setState((current) => ({ ...current, tab: tab.id }))}
              type="button"
            >
              <span>{tab.label}</span>
              <small>{tab.blurb}</small>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.metricsGrid}>
        {scenario.metrics.map((metric) => (
          <article className={styles.metricCard} key={metric.label}>
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
            <span className={`${styles.delta} ${getToneClass(metric.tone)}`}>
              {metric.delta}
            </span>
            <small>{metric.note}</small>
          </article>
        ))}
      </section>

      {activeTab.id === "command" ? (
        <section className={styles.contentGrid}>
          <article className={styles.primaryPanel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelKicker}>Risk queue</p>
                <h2>What needs operator attention</h2>
              </div>
              <div className={styles.scoreBox}>
                <span>Unacknowledged high-severity alerts</span>
                <strong>{derived.unresolvedCritical.length}</strong>
              </div>
            </div>

            <div className={styles.riskList}>
              {scenario.risks.map((risk) => {
                const acknowledged = state.acknowledgedRiskIds.includes(risk.id)
                return (
                  <article className={styles.riskCard} key={risk.id}>
                    <div className={styles.riskHeader}>
                      <div>
                        <span className={styles.severity}>{risk.severity}</span>
                        <h3>{risk.title}</h3>
                      </div>
                      <button
                        className={acknowledged ? styles.acknowledgedButton : styles.ackButton}
                        onClick={() => toggleRisk(risk.id)}
                        type="button"
                      >
                        {acknowledged ? "Acknowledged" : "Acknowledge"}
                      </button>
                    </div>
                    <p>{risk.detail}</p>
                    <div className={styles.riskMeta}>
                      <span>Signal: {risk.signal}</span>
                      <span>Impact: {risk.impact}</span>
                    </div>
                  </article>
                )
              })}
            </div>
          </article>

          <aside className={styles.sideColumn}>
            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.panelKicker}>Recommended actions</p>
                  <h2>Contain or rebalance</h2>
                </div>
              </div>
              <div className={styles.actionList}>
                {scenario.actions.map((action) => {
                  const done = state.completedActionIds.includes(action.id)
                  return (
                    <label className={done ? styles.actionDone : styles.actionItem} key={action.id}>
                      <input
                        checked={done}
                        onChange={() => toggleAction(action)}
                        type="checkbox"
                      />
                      <div>
                        <span className={styles.actionType}>{action.type}</span>
                        <strong>{action.title}</strong>
                        <small>
                          {action.owner} · {action.eta}
                        </small>
                        <p>{action.effect}</p>
                      </div>
                    </label>
                  )
                })}
              </div>
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.panelKicker}>Activity tape</p>
                  <h2>Latest flow events</h2>
                </div>
              </div>
              <div className={styles.flowList}>
                {scenario.flows.map((flow) => (
                  <article className={styles.flowItem} key={`${flow.time}-${flow.title}`}>
                    <span className={`${styles.flowDot} ${getToneClass(flow.tone)}`} />
                    <div>
                      <strong>{flow.title}</strong>
                      <small>{flow.time}</small>
                      <p>{flow.note}</p>
                    </div>
                  </article>
                ))}
              </div>
            </article>
          </aside>
        </section>
      ) : null}

      {activeTab.id === "exposures" ? (
        <section className={styles.contentGrid}>
          <article className={styles.primaryPanel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelKicker}>Issuer stack</p>
                <h2>Cash-equivalent concentration</h2>
              </div>
            </div>
            {scenario.issuers.length ? (
              <div className={styles.exposureList}>
                {scenario.issuers.map((issuer) => {
                  const issuerBreach =
                    issuer.share > state.policy.maxIssuerShare ||
                    issuer.reserveScore < state.policy.minReserveScore
                  return (
                    <article className={styles.exposureRow} key={issuer.name}>
                      <div className={styles.exposureHeading}>
                        <div>
                          <strong>{issuer.name}</strong>
                          <small>{issuer.redeemability}</small>
                        </div>
                        <div className={styles.exposureStats}>
                          <span>{issuer.share}% share</span>
                          <span>Reserve score {issuer.reserveScore}</span>
                        </div>
                      </div>
                      <div className={styles.barTrack}>
                        <span
                          className={styles.barFill}
                          style={{
                            width: `${issuer.share}%`,
                            background: issuer.color,
                          }}
                        />
                      </div>
                      <p className={issuerBreach ? styles.breachText : styles.supportText}>
                        {issuerBreach
                          ? "Outside current policy tolerance."
                          : "Inside current policy tolerance."}
                      </p>
                    </article>
                  )
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <h3>No issuer exposure yet</h3>
                <p>Connect custody and venue sources before concentration analysis appears.</p>
              </div>
            )}
          </article>

          <aside className={styles.sideColumn}>
            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.panelKicker}>Chain mix</p>
                  <h2>Settlement map</h2>
                </div>
              </div>
              {scenario.chains.length ? (
                <div className={styles.miniList}>
                  {scenario.chains.map((chain) => (
                    <article className={styles.miniRow} key={chain.chain}>
                      <div>
                        <strong>{chain.chain}</strong>
                        <small>{chain.settlement}</small>
                      </div>
                      <div className={styles.miniMeta}>
                        <span>{chain.allocation}%</span>
                        <small>{chain.risk}</small>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>No chain allocation until wallets are configured.</p>
                </div>
              )}
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.panelKicker}>Venue map</p>
                  <h2>Counterparty concentration</h2>
                </div>
              </div>
              {scenario.venues.length ? (
                <div className={styles.miniList}>
                  {scenario.venues.map((venue) => {
                    const breach = venue.share > state.policy.maxVenueShare
                    return (
                      <article className={styles.miniRow} key={venue.venue}>
                        <div>
                          <strong>{venue.venue}</strong>
                          <small>
                            {venue.type} · {venue.amount}
                          </small>
                        </div>
                        <div className={styles.miniMeta}>
                          <span>{venue.share}%</span>
                          <small className={breach ? styles.breachText : styles.supportText}>
                            {venue.status}
                          </small>
                        </div>
                      </article>
                    )
                  })}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>No venue concentration until counterparties are registered.</p>
                </div>
              )}
            </article>
          </aside>
        </section>
      ) : null}

      {activeTab.id === "controls" ? (
        <section className={styles.contentGrid}>
          <article className={styles.primaryPanel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelKicker}>Policy sandbox</p>
                <h2>Adjust internal limits</h2>
              </div>
            </div>
            <div className={styles.sliderGrid}>
              <label className={styles.sliderCard}>
                <span>Max issuer share</span>
                <strong>{state.policy.maxIssuerShare}%</strong>
                <input
                  max={60}
                  min={20}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      policy: {
                        ...current.policy,
                        maxIssuerShare: Number(event.target.value),
                      },
                    }))
                  }
                  type="range"
                  value={state.policy.maxIssuerShare}
                />
              </label>
              <label className={styles.sliderCard}>
                <span>Minimum reserve score</span>
                <strong>{state.policy.minReserveScore}</strong>
                <input
                  max={95}
                  min={50}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      policy: {
                        ...current.policy,
                        minReserveScore: Number(event.target.value),
                      },
                    }))
                  }
                  type="range"
                  value={state.policy.minReserveScore}
                />
              </label>
              <label className={styles.sliderCard}>
                <span>Max venue share</span>
                <strong>{state.policy.maxVenueShare}%</strong>
                <input
                  max={40}
                  min={10}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      policy: {
                        ...current.policy,
                        maxVenueShare: Number(event.target.value),
                      },
                    }))
                  }
                  type="range"
                  value={state.policy.maxVenueShare}
                />
              </label>
            </div>
          </article>

          <aside className={styles.sideColumn}>
            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.panelKicker}>Resulting alerts</p>
                  <h2>Policy impact</h2>
                </div>
              </div>
              <div className={styles.signalCard}>
                <strong>{derived.issuerBreaches.length}</strong>
                <span>issuer breaches</span>
              </div>
              <div className={styles.signalCard}>
                <strong>{derived.venueBreaches.length}</strong>
                <span>venue breaches</span>
              </div>
              <div className={styles.signalCard}>
                <strong>{derived.unresolvedCritical.length}</strong>
                <span>high-severity items still unacknowledged</span>
              </div>
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.panelKicker}>Trust boundaries</p>
                  <h2>What this demo makes explicit</h2>
                </div>
              </div>
              <ul className={styles.boundaryList}>
                <li>All balances, spreads, and alerts are seeded demo values, not live market data.</li>
                <li>Liquidity labels represent internal confidence bands, not guaranteed redemption.</li>
                <li>Connected site access is separate from token approvals; wallet actions are not simulated here.</li>
                <li>Policy thresholds persist locally in this browser only via `localStorage`.</li>
              </ul>
            </article>
          </aside>
        </section>
      ) : null}

      <footer className={styles.footer}>
        <p>{scenario.provenance}</p>
        <button
          className={styles.resetButton}
          onClick={() => setState(defaultState)}
          type="button"
        >
          Reset demo state
        </button>
      </footer>
    </main>
  )
}
