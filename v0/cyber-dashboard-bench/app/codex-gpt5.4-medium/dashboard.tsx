"use client"

import { useEffect, useState, type ReactNode } from "react"
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Filter,
  Flame,
  ShieldAlert,
  Target,
} from "lucide-react"

import {
  environmentLabels,
  ownerLabels,
  scenarios,
  statusLabels,
  type Campaign,
  type CampaignStatus,
  type EnvironmentId,
  type OwnerId,
  type ScenarioId,
} from "./data"
import styles from "./dashboard.module.css"

type TabId = "operate" | "campaigns" | "proof"

type CampaignMemory = Record<
  string,
  {
    status?: CampaignStatus
    note?: string
  }
>

type ReviewMemory = Record<ScenarioId, string>

const campaignStorageKey = "chokepoint-campaign-memory"
const reviewStorageKey = "chokepoint-review-memory"

const tabs: { id: TabId; label: string }[] = [
  { id: "operate", label: "Operate" },
  { id: "campaigns", label: "Campaigns" },
  { id: "proof", label: "Proof" },
]

export function ChokepointDashboard() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("normal")
  const [activeTab, setActiveTab] = useState<TabId>("operate")
  const [environmentFilter, setEnvironmentFilter] =
    useState<EnvironmentId>("all")
  const [ownerFilter, setOwnerFilter] = useState<OwnerId>("all")
  const [selectedExposureId, setSelectedExposureId] = useState<string | null>(
    null
  )
  const [campaignMemory, setCampaignMemory] = useState<CampaignMemory>(() =>
    readJsonStorage<CampaignMemory>(campaignStorageKey, {})
  )
  const [reviewMemory, setReviewMemory] = useState<ReviewMemory>(() =>
    readJsonStorage<ReviewMemory>(reviewStorageKey, {
      normal: "",
      surge: "",
      quiet: "",
    })
  )

  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0]

  useEffect(() => {
    window.localStorage.setItem(
      campaignStorageKey,
      JSON.stringify(campaignMemory)
    )
  }, [campaignMemory])

  useEffect(() => {
    window.localStorage.setItem(reviewStorageKey, JSON.stringify(reviewMemory))
  }, [reviewMemory])

  const filteredExposures = scenario.exposures.filter((exposure) => {
    const environmentMatch =
      environmentFilter === "all" || exposure.environment === environmentFilter
    const ownerMatch = ownerFilter === "all" || exposure.owner === ownerFilter
    return environmentMatch && ownerMatch
  })

  const selectedExposureIdValue =
    filteredExposures.find((exposure) => exposure.id === selectedExposureId)?.id ??
    filteredExposures[0]?.id ??
    null

  const selectedExposure =
    filteredExposures.find((exposure) => exposure.id === selectedExposureIdValue) ??
    null

  const campaigns = scenario.campaigns.map((campaign) => ({
    ...campaign,
    status: campaignMemory[campaign.id]?.status ?? campaign.status,
    note: campaignMemory[campaign.id]?.note ?? "",
  }))

  const linkedCampaign = selectedExposure
    ? campaigns.find(
        (campaign) => campaign.id === selectedExposure.linkedCampaignId
      ) ?? null
    : null

  const lastReviewed = reviewMemory[scenario.id]

  return (
    <main className={styles.page}>
      <div className={styles.backdrop} />
      <section className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.heroBlock}>
            <div className={styles.kickerRow}>
              <span className={styles.kicker}>Exposure operations demo</span>
              <span className={styles.demoBadge}>Demo data only</span>
            </div>
            <h1 className={styles.title}>Chokepoint</h1>
            <p className={styles.subtitle}>
              A campaign-based workspace that turns findings into accountable
              remediation moves and proof that risk actually dropped.
            </p>
          </div>

          <div className={styles.controlRail}>
            <label className={styles.selectWrap}>
              <span>Scenario</span>
              <select
                value={scenarioId}
                onChange={(event) => setScenarioId(event.target.value as ScenarioId)}
              >
                {scenarios.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.selectWrap}>
              <span>Environment</span>
              <select
                value={environmentFilter}
                onChange={(event) =>
                  setEnvironmentFilter(event.target.value as EnvironmentId)
                }
              >
                <option value="all">All</option>
                <option value="prod">Production</option>
                <option value="shared">Shared services</option>
                <option value="preview">Preview</option>
              </select>
            </label>

            <label className={styles.selectWrap}>
              <span>Owner</span>
              <select
                value={ownerFilter}
                onChange={(event) => setOwnerFilter(event.target.value as OwnerId)}
              >
                <option value="all">All</option>
                <option value="platform">Platform</option>
                <option value="identity">Identity</option>
                <option value="payments">Payments</option>
                <option value="data">Data</option>
              </select>
            </label>
          </div>
        </header>

        <section className={styles.topline}>
          <p>{scenario.tone}</p>
          <button
            className={styles.reviewButton}
            type="button"
            onClick={() =>
              setReviewMemory((current) => ({
                ...current,
                [scenario.id]: new Date().toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                }),
              }))
            }
          >
            <BadgeCheck size={16} />
            {lastReviewed ? `Reviewed ${lastReviewed}` : "Mark session reviewed"}
          </button>
        </section>

        {scenario.banner ? (
          <section className={styles.alertBanner}>
            <ShieldAlert size={18} />
            <p>{scenario.banner}</p>
          </section>
        ) : null}

        <section className={styles.metricRow}>
          <MetricCard
            icon={<Flame size={18} />}
            label="Open paths"
            value={scenario.snapshot.openPaths}
            detail={`${scenario.delta.newItems} new / ${scenario.delta.worsenedItems} worsened`}
          />
          <MetricCard
            icon={<AlertTriangle size={18} />}
            label="KEV-backed"
            value={scenario.snapshot.kevPaths}
            detail="Exploited-in-the-wild pressure"
          />
          <MetricCard
            icon={<CheckCircle2 size={18} />}
            label="Verified this week"
            value={scenario.snapshot.verifiedThisWeek}
            detail={`${scenario.delta.resolvedItems} recent closures`}
          />
          <MetricCard
            icon={<Clock3 size={18} />}
            label="SLA at risk"
            value={scenario.snapshot.atRiskSla}
            detail="Needs owner attention"
          />
        </section>

        <nav className={styles.tabs} aria-label="Primary view">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={tab.id === activeTab ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === "operate" ? (
          <section className={styles.workspace}>
            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.sectionEyebrow}>Ranked inbox</p>
                  <h2>Exposure paths</h2>
                </div>
                <div className={styles.headerChip}>
                  <Filter size={14} />
                  {filteredExposures.length} visible
                </div>
              </div>

              {filteredExposures.length === 0 ? (
                <div className={styles.emptyState}>
                  <BadgeCheck size={28} />
                  <h3>No active paths in this slice</h3>
                  <p>
                    Quiet mode is intentional. Use the proof view to confirm the
                    burn-down and review verified closures.
                  </p>
                </div>
              ) : (
                <div className={styles.exposureList}>
                  {filteredExposures.map((exposure, index) => (
                    <button
                      key={exposure.id}
                      type="button"
                      className={
                        selectedExposure?.id === exposure.id
                          ? styles.exposureCardActive
                          : styles.exposureCard
                      }
                      onClick={() => setSelectedExposureId(exposure.id)}
                    >
                      <div className={styles.exposureTopline}>
                        <span className={styles.rank}>#{index + 1}</span>
                        <span
                          className={`${styles.stateBadge} ${styles[`state${capitalize(exposure.state)}`]}`}
                        >
                          {exposure.state}
                        </span>
                      </div>
                      <h3>{exposure.title}</h3>
                      <p>{exposure.narrative}</p>
                      <dl className={styles.exposureMeta}>
                        <div>
                          <dt>Score</dt>
                          <dd>{exposure.score}</dd>
                        </div>
                        <div>
                          <dt>Service</dt>
                          <dd>{exposure.service}</dd>
                        </div>
                        <div>
                          <dt>Owner</dt>
                          <dd>{ownerLabels[exposure.owner]}</dd>
                        </div>
                        <div>
                          <dt>Env</dt>
                          <dd>{environmentLabels[exposure.environment]}</dd>
                        </div>
                      </dl>
                    </button>
                  ))}
                </div>
              )}
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.sectionEyebrow}>Explainability</p>
                  <h2>{selectedExposure ? "Selected path" : "Risk context"}</h2>
                </div>
                {selectedExposure?.kev ? (
                  <div className={`${styles.headerChip} ${styles.criticalChip}`}>
                    <ShieldAlert size={14} />
                    KEV-backed
                  </div>
                ) : null}
              </div>

              {selectedExposure ? (
                <div className={styles.detailStack}>
                  <div className={styles.detailHero}>
                    <div>
                      <span
                        className={`${styles.severityBadge} ${styles[`severity${capitalize(selectedExposure.severity)}`]}`}
                      >
                        {selectedExposure.severity}
                      </span>
                      <h3>{selectedExposure.title}</h3>
                    </div>
                    <div className={styles.scoreBubble}>
                      <span>Risk score</span>
                      <strong>{selectedExposure.score}</strong>
                    </div>
                  </div>

                  <p className={styles.attackPath}>{selectedExposure.attackPath}</p>

                  <div className={styles.inlineStats}>
                    <div>
                      <span>EPSS</span>
                      <strong>{Math.round(selectedExposure.epss * 100)}%</strong>
                    </div>
                    <div>
                      <span>CVSS</span>
                      <strong>{selectedExposure.cvss}</strong>
                    </div>
                    <div>
                      <span>Assets</span>
                      <strong>{selectedExposure.assets}</strong>
                    </div>
                    <div>
                      <span>Identities</span>
                      <strong>{selectedExposure.identities}</strong>
                    </div>
                  </div>

                  <div className={styles.scoreBreakdown}>
                    {selectedExposure.scoreParts.map((part) => (
                      <div key={part.label} className={styles.scoreRow}>
                        <div className={styles.scoreLabelLine}>
                          <span>{part.label}</span>
                          <strong>{part.value}</strong>
                        </div>
                        <div className={styles.scoreTrack}>
                          <div
                            className={styles.scoreFill}
                            style={{ width: `${part.value * 3}%` }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.guidanceCard}>
                    <div className={styles.guidanceTitle}>
                      <BookOpenText size={16} />
                      Why now
                    </div>
                    <ul>
                      {selectedExposure.findings.map((finding) => (
                        <li key={finding}>{finding}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.guidanceCard}>
                    <div className={styles.guidanceTitle}>
                      <Target size={16} />
                      Recommended fix motion
                    </div>
                    <p>{selectedExposure.recommendedAction}</p>
                  </div>
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <FileText size={28} />
                  <h3>No exposure selected</h3>
                  <p>Adjust the filters or switch back to a scenario with active work.</p>
                </div>
              )}
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.sectionEyebrow}>Execution container</p>
                  <h2>{linkedCampaign ? "Linked campaign" : "Campaign state"}</h2>
                </div>
                {linkedCampaign ? (
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => setActiveTab("campaigns")}
                  >
                    Open campaigns <ChevronRight size={16} />
                  </button>
                ) : null}
              </div>

              {linkedCampaign ? (
                <CampaignPanel
                  campaign={linkedCampaign}
                  onStatusChange={(status) =>
                    setCampaignMemory((current) => ({
                      ...current,
                      [linkedCampaign.id]: {
                        ...current[linkedCampaign.id],
                        status,
                      },
                    }))
                  }
                  onNoteChange={(note) =>
                    setCampaignMemory((current) => ({
                      ...current,
                      [linkedCampaign.id]: {
                        ...current[linkedCampaign.id],
                        note,
                      },
                    }))
                  }
                  onPromote={() =>
                    setCampaignMemory((current) => ({
                      ...current,
                      [linkedCampaign.id]: {
                        ...current[linkedCampaign.id],
                        status:
                          linkedCampaign.status === "draft"
                            ? "planned"
                            : linkedCampaign.status,
                      },
                    }))
                  }
                />
              ) : (
                <div className={styles.emptyState}>
                  <CalendarClock size={28} />
                  <h3>No campaign linked</h3>
                  <p>
                    In the real product, this is where security would create the
                    first execution container from the ranked path.
                  </p>
                </div>
              )}
            </article>
          </section>
        ) : null}

        {activeTab === "campaigns" ? (
          <section className={styles.campaignGrid}>
            {campaigns.map((campaign) => (
              <article key={campaign.id} className={styles.campaignCard}>
                <div className={styles.campaignHeader}>
                  <div>
                    <p className={styles.sectionEyebrow}>Campaign</p>
                    <h2>{campaign.title}</h2>
                  </div>
                  <span
                    className={`${styles.statusPill} ${styles[`status${statusClassName(campaign.status)}`]}`}
                  >
                    {statusLabels[campaign.status]}
                  </span>
                </div>

                <p className={styles.campaignProof}>{campaign.proof}</p>

                <dl className={styles.campaignMeta}>
                  <div>
                    <dt>Owner</dt>
                    <dd>{campaign.owner}</dd>
                  </div>
                  <div>
                    <dt>Due</dt>
                    <dd>{campaign.dueDate}</dd>
                  </div>
                  <div>
                    <dt>Window</dt>
                    <dd>{campaign.changeWindow}</dd>
                  </div>
                  <div>
                    <dt>Validation</dt>
                    <dd>{campaign.validation}</dd>
                  </div>
                </dl>

                <div className={styles.progressWrap}>
                  <div className={styles.scoreLabelLine}>
                    <span>Progress</span>
                    <strong>{campaign.progress}%</strong>
                  </div>
                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${campaign.progress}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className={styles.campaignActions}>
                  {(
                    [
                      "draft",
                      "planned",
                      "in-change",
                      "validating",
                      "verified",
                      "stalled",
                    ] as CampaignStatus[]
                  ).map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={
                        campaign.status === status
                          ? styles.statusButtonActive
                          : styles.statusButton
                      }
                      onClick={() =>
                        setCampaignMemory((current) => ({
                          ...current,
                          [campaign.id]: {
                            ...current[campaign.id],
                            status,
                          },
                        }))
                      }
                    >
                      {statusLabels[status]}
                    </button>
                  ))}
                </div>

                <textarea
                  className={styles.noteBox}
                  placeholder="Operator note, change rationale, or proof reminder"
                  value={campaign.note}
                  onChange={(event) =>
                    setCampaignMemory((current) => ({
                      ...current,
                      [campaign.id]: {
                        ...current[campaign.id],
                        note: event.target.value,
                      },
                    }))
                  }
                />
              </article>
            ))}
          </section>
        ) : null}

        {activeTab === "proof" ? (
          <section className={styles.proofGrid}>
            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.sectionEyebrow}>Burn-down</p>
                  <h2>Attack-path trend</h2>
                </div>
                <div className={styles.headerChip}>
                  <ArrowRight size={14} />
                  Direction over six weeks
                </div>
              </div>

              <p className={styles.chartSummary}>
                The seeded demo shows a downward trend in active exposure paths,
                with surge mode intentionally representing a short-term reversal
                that still preserves long-term improvement.
              </p>

              <div className={styles.chartBars} aria-hidden="true">
                {scenario.trends.map((point) => (
                  <div key={point.label} className={styles.chartColumn}>
                    <div
                      className={styles.chartBar}
                      style={{ height: `${Math.max(point.value, 1) * 18}px` }}
                    />
                    <span>{point.value}</span>
                    <small>{point.label}</small>
                  </div>
                ))}
              </div>

              <table className={styles.srOnlyTable}>
                <caption>Attack-path trend over six weekly periods</caption>
                <thead>
                  <tr>
                    {scenario.trends.map((point) => (
                      <th key={point.label} scope="col">
                        {point.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {scenario.trends.map((point) => (
                      <td key={point.label}>{point.value}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.sectionEyebrow}>Backlog composition</p>
                  <h2>Severity mix</h2>
                </div>
              </div>

              <p className={styles.chartSummary}>
                Critical items matter most, but Chokepoint keeps medium-severity
                repeat debt visible when it is cheap to eliminate and likely to
                reopen.
              </p>

              <div className={styles.mixList}>
                {scenario.severityMix.map((item) => (
                  <div key={item.label} className={styles.mixRow}>
                    <div className={styles.scoreLabelLine}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                    <div className={styles.scoreTrack}>
                      <div
                        className={styles.mixFill}
                        style={{ width: `${item.value * 20}%` }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className={`${styles.panel} ${styles.fullWidthPanel}`}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.sectionEyebrow}>Operational proof</p>
                  <h2>Remediation queue</h2>
                </div>
                <div className={styles.headerChip}>
                  <FileText size={14} />
                  Accessible table
                </div>
              </div>

              {filteredExposures.length === 0 ? (
                <div className={styles.emptyStateInline}>
                  <p>
                    No queue items remain in this filtered view. Verified
                    closures and proof points are still available above.
                  </p>
                </div>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.queueTable}>
                    <caption className={styles.tableCaption}>
                      Ranked exposure operations queue
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Exposure</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Path score</th>
                        <th scope="col">Campaign</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExposures.map((exposure) => {
                        const campaign = campaigns.find(
                          (item) => item.id === exposure.linkedCampaignId
                        )
                        return (
                          <tr key={exposure.id}>
                            <th scope="row">{exposure.title}</th>
                            <td>{ownerLabels[exposure.owner]}</td>
                            <td>{exposure.score}</td>
                            <td>{campaign?.title ?? "Unassigned"}</td>
                            <td>{campaign ? statusLabels[campaign.status] : "None"}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          </section>
        ) : null}
      </section>
    </main>
  )
}

function MetricCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode
  label: string
  value: number
  detail: string
}) {
  return (
    <article className={styles.metricCard}>
      <div className={styles.metricLabel}>
        <span className={styles.metricIcon}>{icon}</span>
        <span>{label}</span>
      </div>
      <strong className={styles.metricValue}>{value}</strong>
      <p className={styles.metricDetail}>{detail}</p>
    </article>
  )
}

function CampaignPanel({
  campaign,
  onStatusChange,
  onNoteChange,
  onPromote,
}: {
  campaign: Campaign & { note: string }
  onStatusChange: (status: CampaignStatus) => void
  onNoteChange: (note: string) => void
  onPromote: () => void
}) {
  return (
    <div className={styles.detailStack}>
      <div className={styles.campaignHeaderCompact}>
        <div>
          <span
            className={`${styles.statusPill} ${styles[`status${statusClassName(campaign.status)}`]}`}
          >
            {statusLabels[campaign.status]}
          </span>
          <h3>{campaign.title}</h3>
        </div>
        <button type="button" className={styles.promoteButton} onClick={onPromote}>
          Move to campaign
        </button>
      </div>

      <dl className={styles.campaignMeta}>
        <div>
          <dt>Owner</dt>
          <dd>{campaign.owner}</dd>
        </div>
        <div>
          <dt>Due</dt>
          <dd>{campaign.dueDate}</dd>
        </div>
        <div>
          <dt>Window</dt>
          <dd>{campaign.changeWindow}</dd>
        </div>
        <div>
          <dt>Validation</dt>
          <dd>{campaign.validation}</dd>
        </div>
      </dl>

      <div className={styles.progressWrap}>
        <div className={styles.scoreLabelLine}>
          <span>Progress</span>
          <strong>{campaign.progress}%</strong>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${campaign.progress}%` }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className={styles.statusToggle}>
        {(
          [
            "draft",
            "planned",
            "in-change",
            "validating",
            "verified",
            "stalled",
          ] as CampaignStatus[]
        ).map((status) => (
          <button
            key={status}
            type="button"
            className={
              campaign.status === status
                ? styles.statusButtonActive
                : styles.statusButton
            }
            onClick={() => onStatusChange(status)}
          >
            {statusLabels[status]}
          </button>
        ))}
      </div>

      <div className={styles.guidanceCard}>
        <div className={styles.guidanceTitle}>
          <CheckCircle2 size={16} />
          Proof target
        </div>
        <p>{campaign.proof}</p>
      </div>

      <label className={styles.noteLabel}>
        <span>Operator note</span>
        <textarea
          className={styles.noteBox}
          placeholder="Add change context, owner guidance, or verification evidence."
          value={campaign.note}
          onChange={(event) => onNoteChange(event.target.value)}
        />
      </label>
    </div>
  )
}

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}

function statusClassName(status: CampaignStatus) {
  return status
    .split("-")
    .map((part) => capitalize(part))
    .join("")
}

function readJsonStorage<T>(key: string, fallback: T) {
  if (typeof window === "undefined") {
    return fallback
  }

  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue ? (JSON.parse(storedValue) as T) : fallback
  } catch {
    return fallback
  }
}
