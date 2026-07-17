"use client"

import { useMemo, useState, useSyncExternalStore } from "react"
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Database,
  FileCheck2,
  LockKeyhole,
  Radio,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  TrendingDown,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  assetCategories,
  scenarioById,
  scenarios,
  tabs,
  type Alert,
  type AssetCategory,
  type ScenarioId,
  type Status,
  type TabId,
} from "./data"
import styles from "./treasury-risk-dashboard.module.css"

type SavedRunbook = {
  id: string
  scenarioId: ScenarioId
  scenarioLabel: string
  alertTitle: string
  stepLabels: string[]
  impact: number
  note: string
  createdAt: string
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
})

const percent = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
})

const storageKey = "codex-gpt55-xhigh-runbooks"
const runbookEvent = "codex-gpt55-xhigh-runbooks-updated"

function subscribeRunbooks(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined
  const handler = () => onStoreChange()
  window.addEventListener("storage", handler)
  window.addEventListener(runbookEvent, handler)
  return () => {
    window.removeEventListener("storage", handler)
    window.removeEventListener(runbookEvent, handler)
  }
}

function getRunbookSnapshot() {
  if (typeof window === "undefined") return "[]"
  return window.localStorage.getItem(storageKey) ?? "[]"
}

function getRunbookServerSnapshot() {
  return "[]"
}

function parseRunbooks(raw: string): SavedRunbook[] {
  try {
    const parsed = JSON.parse(raw) as SavedRunbook[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeRunbooks(runbooks: SavedRunbook[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(runbooks))
  window.dispatchEvent(new Event(runbookEvent))
}

function statusLabel(status: Status) {
  if (status === "ok") return "OK"
  if (status === "monitor") return "Monitor"
  if (status === "warning") return "Warning"
  return "Critical"
}

function statusClass(status: Status) {
  return `${styles.statusPill} ${styles[status]}`
}

function severityIcon(status: Status) {
  if (status === "critical") return <AlertTriangle aria-hidden="true" />
  if (status === "warning") return <TrendingDown aria-hidden="true" />
  if (status === "monitor") return <Clock3 aria-hidden="true" />
  return <CheckCircle2 aria-hidden="true" />
}

export function TreasuryRiskDashboard() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("normal")
  const [activeTab, setActiveTab] = useState<TabId>("control")
  const [assetFilter, setAssetFilter] = useState<"All" | AssetCategory>("All")
  const [selectedAlertByScenario, setSelectedAlertByScenario] = useState<
    Partial<Record<ScenarioId, string>>
  >({})
  const [stepOverrides, setStepOverrides] = useState<
    Partial<Record<ScenarioId, string[]>>
  >({})
  const [note, setNote] = useState("")
  const runbookSnapshot = useSyncExternalStore(
    subscribeRunbooks,
    getRunbookSnapshot,
    getRunbookServerSnapshot
  )

  const scenario = scenarioById[scenarioId]
  const selectedAlertId =
    selectedAlertByScenario[scenarioId] ?? scenario.alerts[0]?.id ?? null
  const defaultSelectedSteps = useMemo(
    () =>
      scenario.runbookSteps
        .filter((step) => step.defaultSelected)
        .map((step) => step.id),
    [scenario.runbookSteps]
  )
  const selectedSteps = stepOverrides[scenarioId] ?? defaultSelectedSteps
  const savedRunbooks = useMemo(
    () => parseRunbooks(runbookSnapshot),
    [runbookSnapshot]
  )

  const selectedAlert =
    scenario.alerts.find((alert) => alert.id === selectedAlertId) ??
    scenario.alerts[0] ??
    null

  const filteredAssets = useMemo(() => {
    if (assetFilter === "All") return scenario.assets
    return scenario.assets.filter((asset) => asset.category === assetFilter)
  }, [assetFilter, scenario.assets])

  const selectedRunbookSteps = scenario.runbookSteps.filter((step) =>
    selectedSteps.includes(step.id)
  )
  const runbookImpact = selectedRunbookSteps.reduce(
    (sum, step) => sum + step.riskReduced,
    0
  )

  function toggleStep(stepId: string) {
    setStepOverrides((current) => {
      const existing = current[scenarioId] ?? defaultSelectedSteps
      const next = existing.includes(stepId)
        ? existing.filter((id) => id !== stepId)
        : [...existing, stepId]
      return { ...current, [scenarioId]: next }
    })
  }

  function selectAlert(id: string) {
    setSelectedAlertByScenario((current) => ({
      ...current,
      [scenarioId]: id,
    }))
    setNote("")
  }

  function changeScenario(id: ScenarioId) {
    setScenarioId(id)
    setNote("")
  }

  function changeTab(id: TabId) {
    setActiveTab(id)
  }

  function clearSavedRunbooks() {
    writeRunbooks([])
    setNote("")
  }

  function persistRunbook(record: SavedRunbook) {
    writeRunbooks([record, ...savedRunbooks].slice(0, 5))
  }

  function saveRunbook() {
    if (!selectedAlert || selectedRunbookSteps.length === 0) return
    persistRunbook(
      {
        id: `${scenario.id}-${Date.now()}`,
        scenarioId: scenario.id,
        scenarioLabel: scenario.shortLabel,
        alertTitle: selectedAlert.title,
        stepLabels: selectedRunbookSteps.map((step) => step.label),
        impact: runbookImpact,
        note,
        createdAt: new Date().toISOString(),
      }
    )
  }

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar} aria-label="Product navigation">
        <div className={styles.brandBlock}>
          <div className={styles.brandMark}>TR</div>
          <div>
            <p className={styles.eyebrow}>Seeded demo</p>
            <h1>Treasury Risk Control Room</h1>
          </div>
        </div>

        <nav className={styles.navRail}>
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                type="button"
                className={`${styles.navButton} ${
                  activeTab === tab.id ? styles.navButtonActive : ""
                }`}
                aria-pressed={activeTab === tab.id}
                onClick={() => changeTab(tab.id)}
              >
                <Icon aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        <div className={styles.trustPanel}>
          <LockKeyhole aria-hidden="true" />
          <div>
            <strong>No wallet connection</strong>
            <span>Read-only seeded balances. No extension, keys, or API.</span>
          </div>
        </div>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div>
            <p className={styles.eyebrow}>Protocol treasury operations</p>
            <h2>Approval-ready risk triage, not a wall of token prices</h2>
          </div>
          <div className={styles.topbarMeta}>
            <span>
              <Radio aria-hidden="true" />
              Demo snapshot
            </span>
            <span>{scenario.asOf}</span>
          </div>
        </header>

        <section className={styles.scenarioBand} aria-label="Scenario controls">
          <div className={styles.scenarioIntro}>
            <SlidersHorizontal aria-hidden="true" />
            <div>
              <strong>Market state</strong>
              <span>{scenario.description}</span>
            </div>
          </div>
          <div className={styles.segmented}>
            {scenarios.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={scenarioId === item.id}
                className={`${styles.segmentButton} ${
                  scenarioId === item.id ? styles.segmentButtonActive : ""
                }`}
                onClick={() => changeScenario(item.id)}
              >
                <span>{item.shortLabel}</span>
                <small>{item.tone}</small>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.metricsGrid} aria-label="Treasury summary">
          <article className={styles.healthCard}>
            <div className={styles.cardHeader}>
              <span>Control health</span>
              <span className={statusClass(scenario.health < 55 ? "critical" : scenario.health < 70 ? "warning" : scenario.health < 85 ? "monitor" : "ok")}>
                {scenario.health > 0 ? `${scenario.health}/100` : "No data"}
              </span>
            </div>
            <div className={styles.healthDial}>
              <div
                className={styles.healthFill}
                style={{ width: `${Math.max(scenario.health, 8)}%` }}
              />
            </div>
            <p>
              Composite of liquidity, concentration, signer readiness, source
              freshness, and policy exceptions.
            </p>
          </article>

          {scenario.metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <article className={styles.metricCard} key={metric.label}>
                <div className={styles.metricIcon}>
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <small>{metric.detail}</small>
                </div>
                <span className={statusClass(metric.status)}>
                  {statusLabel(metric.status)}
                </span>
              </article>
            )
          })}
        </section>

        {activeTab === "control" && (
          <ControlRoom
            selectedAlert={selectedAlert}
            selectedAlertId={selectedAlertId}
            setSelectedAlertId={selectAlert}
            selectedSteps={selectedSteps}
            toggleStep={toggleStep}
            note={note}
            setNote={setNote}
            saveRunbook={saveRunbook}
            resetRunbooks={clearSavedRunbooks}
            savedRunbooks={savedRunbooks}
            runbookImpact={runbookImpact}
            scenario={scenario}
          />
        )}

        {activeTab === "exposure" && (
          <ExposureView
            assetFilter={assetFilter}
            setAssetFilter={setAssetFilter}
            filteredAssets={filteredAssets}
            scenario={scenario}
          />
        )}

        {activeTab === "stablecoins" && <StablecoinView scenario={scenario} />}

        {activeTab === "evidence" && (
          <EvidenceView selectedAlert={selectedAlert} scenario={scenario} />
        )}
      </section>
    </main>
  )
}

function ControlRoom({
  selectedAlert,
  selectedAlertId,
  setSelectedAlertId,
  selectedSteps,
  toggleStep,
  note,
  setNote,
  saveRunbook,
  resetRunbooks,
  savedRunbooks,
  runbookImpact,
  scenario,
}: {
  selectedAlert: Alert | null
  selectedAlertId: string | null
  setSelectedAlertId: (id: string) => void
  selectedSteps: string[]
  toggleStep: (id: string) => void
  note: string
  setNote: (value: string) => void
  saveRunbook: () => void
  resetRunbooks: () => void
  savedRunbooks: SavedRunbook[]
  runbookImpact: number
  scenario: (typeof scenarios)[number]
}) {
  return (
    <section className={styles.mainGrid}>
      <div className={styles.leftStack}>
        <article className={styles.panel}>
          <div className={styles.panelTitle}>
            <div>
              <p className={styles.eyebrow}>Risk queue</p>
              <h3>Prioritized decisions</h3>
            </div>
            <span className={styles.countBadge}>{scenario.alerts.length}</span>
          </div>

          {scenario.alerts.length === 0 ? (
            <EmptyState
              title="No active risk alerts"
              body="This onboarding entity has no imported wallets, so the queue is empty by design."
            />
          ) : (
            <div className={styles.alertList}>
              {scenario.alerts.map((alert) => (
                <button
                  key={alert.id}
                  type="button"
                  className={`${styles.alertButton} ${
                    selectedAlertId === alert.id ? styles.alertButtonActive : ""
                  }`}
                  onClick={() => setSelectedAlertId(alert.id)}
                >
                  <span className={statusClass(alert.severity)}>
                    {severityIcon(alert.severity)}
                    {statusLabel(alert.severity)}
                  </span>
                  <strong>{alert.title}</strong>
                  <small>
                    {alert.time} - {alert.source}
                  </small>
                </button>
              ))}
            </div>
          )}
        </article>

        <article className={styles.panel}>
          <div className={styles.panelTitle}>
            <div>
              <p className={styles.eyebrow}>Runway model</p>
              <h3>Base vs stress liquidity</h3>
            </div>
            <span className={styles.demoPill}>Months</span>
          </div>
          {scenario.runway.length === 0 ? (
            <EmptyState
              title="Runway unavailable"
              body="Import wallet balances and monthly burn assumptions to populate the model."
            />
          ) : (
            <div className={styles.chartFrame}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scenario.runway} margin={{ left: 2, right: 8 }}>
                  <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={34} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="liquidity"
                    name="Liquidity ceiling"
                    stroke="var(--blue)"
                    fill="var(--blue-soft)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="runway"
                    name="Base runway"
                    stroke="var(--teal)"
                    fill="var(--teal-soft)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="stress"
                    name="Stress runway"
                    stroke="var(--rose)"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </article>
      </div>

      <article className={styles.decisionPanel}>
        <div className={styles.panelTitle}>
          <div>
            <p className={styles.eyebrow}>Selected decision</p>
            <h3>{selectedAlert ? selectedAlert.title : "No selected alert"}</h3>
          </div>
          {selectedAlert && (
            <span className={statusClass(selectedAlert.severity)}>
              {severityIcon(selectedAlert.severity)}
              {statusLabel(selectedAlert.severity)}
            </span>
          )}
        </div>

        {selectedAlert ? (
          <>
            <p className={styles.summaryText}>{selectedAlert.summary}</p>
            <div className={styles.policyBox}>
              <ShieldCheck aria-hidden="true" />
              <div>
                <span>Policy</span>
                <strong>{selectedAlert.policy}</strong>
              </div>
            </div>
            <div className={styles.decisionBox}>
              <span>Recommended decision</span>
              <p>{selectedAlert.decision}</p>
            </div>

            <div className={styles.stepHeader}>
              <strong>Approval runbook</strong>
              <span>{runbookImpact} pts risk reduction</span>
            </div>
            <div className={styles.stepList}>
              {scenario.runbookSteps.map((step) => (
                <label className={styles.stepItem} key={step.id}>
                  <input
                    type="checkbox"
                    checked={selectedSteps.includes(step.id)}
                    onChange={() => toggleStep(step.id)}
                  />
                  <span>
                    <strong>{step.label}</strong>
                    <small>
                      {step.route}
                      {step.estimatedUsd > 0
                        ? ` - ${currency.format(step.estimatedUsd)}`
                        : ""}
                    </small>
                  </span>
                </label>
              ))}
            </div>

            <label className={styles.noteField}>
              <span>Signer note</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Add context for owners. Stored locally in this browser only."
              />
            </label>

            <div className={styles.actionRow}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={saveRunbook}
                disabled={selectedSteps.length === 0}
              >
                <FileCheck2 aria-hidden="true" />
                Save runbook
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={resetRunbooks}
              >
                <RotateCcw aria-hidden="true" />
                Clear saved
              </button>
            </div>

            <div className={styles.savedList}>
              <div className={styles.stepHeader}>
                <strong>Local approvals draft</strong>
                <span>{savedRunbooks.length} saved</span>
              </div>
              {savedRunbooks.length === 0 ? (
                <p className={styles.mutedText}>
                  Saved runbooks appear here and persist with localStorage.
                </p>
              ) : (
                savedRunbooks.map((runbook) => (
                  <div className={styles.savedItem} key={runbook.id}>
                    <span>
                      {new Date(runbook.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <strong>{runbook.alertTitle}</strong>
                    <small>
                      {runbook.scenarioLabel} - {runbook.stepLabels.length}{" "}
                      steps - {runbook.impact} pts
                    </small>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <EmptyState
            title="No decision selected"
            body="Import data or switch scenarios to review policy alerts."
          />
        )}
      </article>
    </section>
  )
}

function ExposureView({
  assetFilter,
  setAssetFilter,
  filteredAssets,
  scenario,
}: {
  assetFilter: "All" | AssetCategory
  setAssetFilter: (category: "All" | AssetCategory) => void
  filteredAssets: Array<(typeof scenarios)[number]["assets"][number]>
  scenario: (typeof scenarios)[number]
}) {
  return (
    <section className={styles.fullPanel}>
      <div className={styles.panelTitle}>
        <div>
          <p className={styles.eyebrow}>Exposure map</p>
          <h3>Assets, wallets, and counterparty limits</h3>
        </div>
        <div className={styles.filterRow} aria-label="Asset category filter">
          {assetCategories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={assetFilter === category}
              className={`${styles.filterButton} ${
                assetFilter === category ? styles.filterButtonActive : ""
              }`}
              onClick={() => setAssetFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {scenario.assets.length === 0 ? (
        <EmptyState
          title="No imported exposure"
          body="This empty state keeps the setup workflow honest: no seeded wallet rows means no hidden values."
        />
      ) : (
        <div className={styles.exposureGrid}>
          <div className={styles.assetTableWrap}>
            <table className={styles.assetTable}>
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Value</th>
                  <th>Share</th>
                  <th>24h</th>
                  <th>Source</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset.symbol}>
                    <td>
                      <strong>{asset.symbol}</strong>
                      <span>{asset.name}</span>
                    </td>
                    <td>{currency.format(asset.value)}</td>
                    <td>{percent.format(asset.share)}%</td>
                    <td className={asset.change24h < 0 ? styles.negative : styles.positive}>
                      {asset.change24h > 0 ? "+" : ""}
                      {asset.change24h.toFixed(2)}%
                    </td>
                    <td>{asset.source}</td>
                    <td>
                      <span className={statusClass(asset.status)}>
                        {statusLabel(asset.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.sideStack}>
            <article className={styles.panel}>
              <div className={styles.panelTitle}>
                <div>
                  <p className={styles.eyebrow}>Wallet inventory</p>
                  <h3>Custody and liquidity</h3>
                </div>
              </div>
              <div className={styles.walletList}>
                {scenario.wallets.map((wallet) => (
                  <div className={styles.walletItem} key={wallet.name}>
                    <div>
                      <strong>{wallet.name}</strong>
                      <span>
                        {wallet.custody} - {wallet.chain}
                      </span>
                    </div>
                    <div className={styles.walletNumbers}>
                      <strong>{currency.format(wallet.value)}</strong>
                      <span>{currency.format(wallet.liquid24h)} liquid 24h</span>
                    </div>
                    <div className={styles.limitBar} aria-hidden="true">
                      <span
                        style={{
                          width: `${Math.min(wallet.exposure, wallet.policyLimit)}%`,
                        }}
                      />
                      <i style={{ left: `${wallet.policyLimit}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.panel}>
              <div className={styles.panelTitle}>
                <div>
                  <p className={styles.eyebrow}>Counterparty limits</p>
                  <h3>Current share vs policy cap</h3>
                </div>
              </div>
              <div className={styles.chartFrameSmall}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scenario.counterparties} layout="vertical">
                    <CartesianGrid stroke="var(--chart-grid)" horizontal={false} />
                    <XAxis type="number" domain={[0, 40]} hide />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={92}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip />
                    <Bar dataKey="share" name="Share %">
                      {scenario.counterparties.map((item) => (
                        <Cell
                          key={item.name}
                          fill={
                            item.status === "critical"
                              ? "var(--rose)"
                              : item.status === "warning"
                                ? "var(--amber)"
                                : "var(--teal)"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
          </div>
        </div>
      )}
    </section>
  )
}

function StablecoinView({ scenario }: { scenario: (typeof scenarios)[number] }) {
  return (
    <section className={styles.mainGrid}>
      <article className={styles.panel}>
        <div className={styles.panelTitle}>
          <div>
            <p className={styles.eyebrow}>Peg monitor</p>
            <h3>Stablecoin price bands</h3>
          </div>
          <span className={styles.demoPill}>Seeded prices</span>
        </div>
        {scenario.peg.length === 0 ? (
          <EmptyState
            title="Peg chart unavailable"
            body="Stablecoin prices appear after a market source is mapped."
          />
        ) : (
          <div className={styles.chartFrameTall}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scenario.peg} margin={{ left: 2, right: 10 }}>
                <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} />
                <YAxis
                  domain={[0.975, 1.005]}
                  tickLine={false}
                  axisLine={false}
                  width={48}
                />
                <ReferenceLine y={0.985} stroke="var(--rose)" strokeDasharray="4 4" />
                <ReferenceLine y={1} stroke="var(--line-strong)" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="usdc"
                  name="USDC"
                  stroke="var(--blue)"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="usdt"
                  name="USDT"
                  stroke="var(--teal)"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="dai"
                  name="DAI"
                  stroke="var(--amber)"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </article>

      <article className={styles.panel}>
        <div className={styles.panelTitle}>
          <div>
            <p className={styles.eyebrow}>Stablecoin semantics</p>
            <h3>Risk rules shown in-product</h3>
          </div>
        </div>
        <div className={styles.ruleList}>
          {scenario.policyChecks.map((check) => (
            <div className={styles.ruleItem} key={check.label}>
              <span className={statusClass(check.status)}>
                {statusLabel(check.status)}
              </span>
              <div>
                <strong>{check.label}</strong>
                <small>
                  Current: {check.current} - Limit: {check.limit}
                </small>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.disclosureBox}>
          <AlertTriangle aria-hidden="true" />
          <p>
            Stablecoins are not rendered as cash equivalents by default. The demo
            separates peg, issuer, redemption, venue, and protocol-dependency
            risks so signers can approve or reject a concrete response.
          </p>
        </div>
      </article>
    </section>
  )
}

function EvidenceView({
  selectedAlert,
  scenario,
}: {
  selectedAlert: Alert | null
  scenario: (typeof scenarios)[number]
}) {
  return (
    <section className={styles.mainGrid}>
      <article className={styles.panel}>
        <div className={styles.panelTitle}>
          <div>
            <p className={styles.eyebrow}>Data provenance</p>
            <h3>Freshness and uncertainty</h3>
          </div>
        </div>
        <div className={styles.sourceList}>
          {scenario.sources.map((source) => (
            <div className={styles.sourceItem} key={source.label}>
              <Database aria-hidden="true" />
              <div>
                <strong>{source.label}</strong>
                <span>{source.freshness}</span>
                <small>{source.provenance}</small>
              </div>
              <span className={statusClass(source.status)}>
                {statusLabel(source.status)}
              </span>
            </div>
          ))}
        </div>
      </article>

      <article className={styles.panel}>
        <div className={styles.panelTitle}>
          <div>
            <p className={styles.eyebrow}>Alert evidence</p>
            <h3>{selectedAlert ? selectedAlert.title : "No selected alert"}</h3>
          </div>
        </div>
        {selectedAlert ? (
          <>
            <div className={styles.affectedRow}>
              {selectedAlert.affected.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <ol className={styles.evidenceList}>
              {selectedAlert.evidence.map((item) => (
                <li key={item}>
                  <ArrowRight aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </>
        ) : (
          <EmptyState
            title="No evidence yet"
            body="Evidence appears when a policy alert is selected."
          />
        )}
      </article>
    </section>
  )
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className={styles.emptyState}>
      <ShieldCheck aria-hidden="true" />
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  )
}
