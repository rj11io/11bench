"use client"

import { useEffect, useMemo, useState } from "react"

import styles from "./treasury.module.css"
import type {
  Alert,
  NetworkHealth,
  Payout,
  ReserveSnapshot,
  TreasuryBucket,
} from "./treasury-data"

type Props = {
  alerts: Alert[]
  networkHealth: NetworkHealth[]
  payouts: Payout[]
  reserves: ReserveSnapshot[]
  treasuryBuckets: TreasuryBucket[]
}

type DensityMode = "operations" | "risk"
type PayoutFilter = "all" | "ready" | "review" | "queued"

const storageKey = "harbor-treasury-demo:v1"

function readStoredState() {
  if (typeof window === "undefined") {
    return null
  }

  const saved = window.localStorage.getItem(storageKey)

  if (!saved) {
    return null
  }

  try {
    return JSON.parse(saved) as {
      density?: DensityMode
      filter?: PayoutFilter
      selectedPayoutId?: string
      acknowledgedAlerts?: string[]
    }
  } catch {
    window.localStorage.removeItem(storageKey)
    return null
  }
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function TreasuryDemo({
  alerts,
  networkHealth,
  payouts,
  reserves,
  treasuryBuckets,
}: Props) {
  const storedState = readStoredState()
  const [density, setDensity] = useState<DensityMode>(
    storedState?.density ?? "operations"
  )
  const [filter, setFilter] = useState<PayoutFilter>(storedState?.filter ?? "all")
  const [selectedPayoutId, setSelectedPayoutId] = useState(
    storedState?.selectedPayoutId ?? payouts[0]?.id ?? ""
  )
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<string[]>(
    storedState?.acknowledgedAlerts ?? []
  )

  useEffect(() => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        density,
        filter,
        selectedPayoutId,
        acknowledgedAlerts,
      })
    )
  }, [acknowledgedAlerts, density, filter, selectedPayoutId])

  const filteredPayouts = useMemo(() => {
    return payouts.filter((payout) => filter === "all" || payout.status === filter)
  }, [filter, payouts])

  const selectedPayout =
    filteredPayouts.find((payout) => payout.id === selectedPayoutId) ??
    filteredPayouts[0] ??
    payouts[0]

  const availableCapital = treasuryBuckets.reduce(
    (total, bucket) => total + bucket.availableNow,
    0
  )
  const atRiskCapital = treasuryBuckets
    .filter((bucket) => bucket.risk !== "low")
    .reduce((total, bucket) => total + bucket.balance, 0)
  const readyValue = payouts
    .filter((payout) => payout.status === "ready")
    .reduce((total, payout) => total + payout.amount, 0)
  const unresolvedAlerts = alerts.filter(
    (alert) => !acknowledgedAlerts.includes(alert.id)
  )

  return (
    <main className={styles.pageShell}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Harbor Treasury / seeded demo / not live</p>
          <h1 className={styles.title}>Operate stablecoin payouts with treasury-grade controls.</h1>
          <p className={styles.subtitle}>
            A control tower for finance and operations teams who need to route
            stablecoin payouts across issuers and chains without hiding reserve,
            sanctions, or liquidity risk.
          </p>
        </div>

        <div className={styles.heroPanel}>
          <span className={styles.heroLabel}>Why this product</span>
          <p>
            Most crypto dashboards stop at balances. Treasury teams need a release
            decision: which rail is acceptable right now, for this counterparty,
            with this policy posture.
          </p>
        </div>
      </section>

      <section className={styles.metricsGrid} aria-label="Treasury summary metrics">
        <article className={styles.metricCard}>
          <span>Available operating capital</span>
          <strong>{formatMoney(availableCapital)}</strong>
          <p>Seeded balances across custody, hot wallets, and regional omnibus accounts.</p>
        </article>
        <article className={styles.metricCard}>
          <span>Ready-to-release volume</span>
          <strong>{formatMoney(readyValue)}</strong>
          <p>Queue value already cleared by policy and sanctions checks.</p>
        </article>
        <article className={styles.metricCard}>
          <span>Capital under elevated scrutiny</span>
          <strong>{formatMoney(atRiskCapital)}</strong>
          <p>Funds on watch or medium-risk rails that require tighter policy review.</p>
        </article>
        <article className={styles.metricCard}>
          <span>Unresolved exceptions</span>
          <strong>{unresolvedAlerts.length}</strong>
          <p>Alerts stay visible until acknowledged. State persists in local storage.</p>
        </article>
      </section>

      <section className={styles.controlBar}>
        <div className={styles.segmented}>
          <span className={styles.controlLabel}>View density</span>
          <button
            className={density === "operations" ? styles.activeChip : styles.chip}
            onClick={() => setDensity("operations")}
            type="button"
          >
            Operations
          </button>
          <button
            className={density === "risk" ? styles.activeChip : styles.chip}
            onClick={() => setDensity("risk")}
            type="button"
          >
            Risk
          </button>
        </div>
        <div className={styles.segmented}>
          <span className={styles.controlLabel}>Queue filter</span>
          {(["all", "ready", "review", "queued"] as const).map((value) => (
            <button
              key={value}
              className={filter === value ? styles.activeChip : styles.chip}
              onClick={() => setFilter(value)}
              type="button"
            >
              {value}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.workspace}>
        <div className={styles.leftColumn}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelKicker}>Core workflow</p>
                <h2>Payout release board</h2>
              </div>
              <span className={styles.panelHint}>Every recommendation is seeded and explicitly non-live.</span>
            </div>

            <div className={styles.payoutList}>
              {filteredPayouts.map((payout) => (
                <button
                  key={payout.id}
                  className={
                    payout.id === selectedPayout?.id
                      ? styles.payoutItemActive
                      : styles.payoutItem
                  }
                  onClick={() => setSelectedPayoutId(payout.id)}
                  type="button"
                >
                  <div className={styles.payoutTopline}>
                    <strong>{payout.id}</strong>
                    <span className={styles.statusBadge} data-status={payout.status}>
                      {payout.status}
                    </span>
                  </div>
                  <p>{payout.counterparty}</p>
                  <div className={styles.payoutMeta}>
                    <span>{formatMoney(payout.amount)}</span>
                    <span>{payout.corridor}</span>
                    <span>{payout.dueBy}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelKicker}>Treasury topology</p>
                <h2>Liquidity by rail and custody context</h2>
              </div>
            </div>
            <div className={styles.bucketGrid}>
              {treasuryBuckets.map((bucket) => {
                const fill = Math.max(
                  6,
                  Math.min(100, (bucket.availableNow / bucket.targetMin) * 100)
                )

                return (
                  <article className={styles.bucketCard} key={bucket.id}>
                    <div className={styles.bucketHeader}>
                      <div>
                        <strong>
                          {bucket.rail} / {bucket.chain}
                        </strong>
                        <p>
                          {bucket.issuer} · {bucket.venue}
                        </p>
                      </div>
                      <span className={styles.riskPill} data-risk={bucket.risk}>
                        {bucket.risk} risk
                      </span>
                    </div>

                    <div className={styles.bucketAmountRow}>
                      <span>{formatMoney(bucket.availableNow)} available</span>
                      <span>{formatMoney(bucket.balance)} total</span>
                    </div>
                    <div className={styles.progressTrack} aria-hidden="true">
                      <div className={styles.progressFill} style={{ width: `${fill}%` }} />
                    </div>
                    <div className={styles.bucketFootnote}>
                      <span>Target floor {formatMoney(bucket.targetMin)}</span>
                      <span>{bucket.settlementTime}</span>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelKicker}>Decision detail</p>
                <h2>Release recommendation</h2>
              </div>
            </div>

            {selectedPayout ? (
              <div className={styles.recommendation}>
                <div className={styles.recommendationHero}>
                  <div>
                    <strong>{selectedPayout.counterparty}</strong>
                    <p>{selectedPayout.id}</p>
                  </div>
                  <span className={styles.statusBadge} data-status={selectedPayout.status}>
                    {selectedPayout.status}
                  </span>
                </div>

                <dl className={styles.definitionGrid}>
                  <div>
                    <dt>Requested rail</dt>
                    <dd>{selectedPayout.requestedRail}</dd>
                  </div>
                  <div>
                    <dt>Suggested rail</dt>
                    <dd>{selectedPayout.suggestedRail}</dd>
                  </div>
                  <div>
                    <dt>Reserve preference</dt>
                    <dd>{selectedPayout.reservePreference}</dd>
                  </div>
                  <div>
                    <dt>Screening state</dt>
                    <dd>{selectedPayout.sanctionsScreen}</dd>
                  </div>
                </dl>

                <p className={styles.recommendationText}>{selectedPayout.note}</p>

                <div className={styles.actionRow}>
                  <button className={styles.primaryAction} type="button">
                    {selectedPayout.status === "review"
                      ? "Hold for compliance"
                      : "Approve seeded release"}
                  </button>
                  <button className={styles.secondaryAction} type="button">
                    Export decision log
                  </button>
                </div>
              </div>
            ) : null}
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelKicker}>Exceptions</p>
                <h2>Alert stack</h2>
              </div>
            </div>
            <div className={styles.alertStack}>
              {alerts.map((alert) => {
                const acknowledged = acknowledgedAlerts.includes(alert.id)

                return (
                  <article
                    className={styles.alertCard}
                    data-severity={alert.severity}
                    data-acknowledged={acknowledged}
                    key={alert.id}
                  >
                    <div className={styles.alertHeader}>
                      <strong>{alert.title}</strong>
                      <button
                        className={styles.linkAction}
                        onClick={() =>
                          setAcknowledgedAlerts((current) =>
                            current.includes(alert.id)
                              ? current.filter((id) => id !== alert.id)
                              : [...current, alert.id]
                          )
                        }
                        type="button"
                      >
                        {acknowledged ? "Re-open" : "Acknowledge"}
                      </button>
                    </div>
                    <p>{alert.detail}</p>
                    <span>{alert.action}</span>
                  </article>
                )
              })}
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelKicker}>Trust inputs</p>
                <h2>{density === "operations" ? "Rail health" : "Reserve posture"}</h2>
              </div>
            </div>
            {density === "operations" ? (
              <div className={styles.healthList}>
                {networkHealth.map((item) => (
                  <article className={styles.healthItem} key={item.rail}>
                    <div className={styles.healthHeader}>
                      <strong>{item.rail}</strong>
                      <span className={styles.healthDot} data-status={item.status} />
                    </div>
                    <p>{item.note}</p>
                    <div className={styles.healthMeta}>
                      <span>{item.costBasis}</span>
                      <span>{item.eta}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className={styles.reserveList}>
                {reserves.map((reserve) => (
                  <article className={styles.reserveCard} key={reserve.symbol}>
                    <div className={styles.reserveHeader}>
                      <strong>{reserve.symbol}</strong>
                      <span className={styles.policyBadge} data-policy={reserve.policy}>
                        {reserve.policy}
                      </span>
                    </div>
                    <p>{reserve.backingMix}</p>
                    <ul className={styles.reserveFacts}>
                      <li>{reserve.attestationLag}</li>
                      <li>{reserve.redemptionWindow}</li>
                      <li>{reserve.concentration}</li>
                    </ul>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  )
}
