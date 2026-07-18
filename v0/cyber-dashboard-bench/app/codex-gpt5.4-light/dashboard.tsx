"use client"

import { useEffect, useState } from "react"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Filter,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import styles from "./dashboard.module.css"
import {
  activity as seededActivity,
  campaigns as seededCampaigns,
  exposures as seededExposures,
  type ActivityItem,
  type Campaign,
  type Exposure,
  type ExposureStatus,
} from "./data"

type Role = "Exposure Lead" | "Analyst" | "Exec"
type FilterMode = "all" | "priority" | "active" | "done"

type StoredState = {
  exposures: Exposure[]
  campaigns: Campaign[]
  activity: ActivityItem[]
  notes: Record<string, string>
  role: Role
}

const storageKey = "strata-demo-state"

const roles: Role[] = ["Exposure Lead", "Analyst", "Exec"]
const filters: FilterMode[] = ["all", "priority", "active", "done"]

function readStoredState(): StoredState | null {
  if (typeof window === "undefined") return null

  const raw = window.localStorage.getItem(storageKey)
  if (!raw) return null

  return JSON.parse(raw) as StoredState
}

function formatStatus(status: ExposureStatus) {
  switch (status) {
    case "queued":
      return "Ready to mobilize"
    case "active":
      return "Campaign active"
    case "verification":
      return "Awaiting verification"
    case "mitigated":
      return "Mitigated"
    case "snoozed":
      return "Suppressed"
  }
}

function scoreLabel(score: number) {
  if (score >= 90) return "Critical leverage"
  if (score >= 75) return "High leverage"
  return "Backlog candidate"
}

export function Dashboard() {
  const stored = readStoredState()
  const [exposures, setExposures] = useState<Exposure[]>(stored?.exposures ?? seededExposures)
  const [campaigns, setCampaigns] = useState<Campaign[]>(stored?.campaigns ?? seededCampaigns)
  const [activity, setActivity] = useState<ActivityItem[]>(stored?.activity ?? seededActivity)
  const [notes, setNotes] = useState<Record<string, string>>(stored?.notes ?? {})
  const [role, setRole] = useState<Role>(stored?.role ?? "Exposure Lead")
  const [filter, setFilter] = useState<FilterMode>("all")
  const [selectedId, setSelectedId] = useState<string>(
    stored?.exposures[0]?.id ?? seededExposures[0]?.id ?? ""
  )

  useEffect(() => {
    const payload: StoredState = { exposures, campaigns, activity, notes, role }
    window.localStorage.setItem(storageKey, JSON.stringify(payload))
  }, [activity, campaigns, exposures, notes, role])

  const visibleExposures = exposures.filter((exposure) => {
    if (filter === "priority") return exposure.score >= 80 && exposure.status !== "mitigated"
    if (filter === "active") return exposure.status === "active" || exposure.status === "verification"
    if (filter === "done") return exposure.status === "mitigated" || exposure.status === "snoozed"
    return true
  })

  const selected =
    visibleExposures.find((exposure) => exposure.id === selectedId) ??
    exposures.find((exposure) => exposure.id === selectedId) ??
    visibleExposures[0] ??
    exposures[0]

  const openCritical = exposures.filter(
    (item) => item.score >= 80 && item.status !== "mitigated" && item.status !== "snoozed"
  ).length
  const crownJewelPaths = exposures
    .filter((item) => item.status !== "mitigated")
    .reduce((sum, item) => sum + item.attackPaths, 0)
  const activeCampaigns = campaigns.filter((item) => item.state !== "done").length
  const slaRisk = exposures.filter((item) => item.dueLabel.includes("Due") || item.dueLabel.includes("Breached"))
    .length

  function addActivity(action: string, target: string) {
    setActivity((current) => [
      {
        id: `ACT-${current.length + 10}`,
        actor: role,
        action,
        target,
        timestamp: "Now",
      },
      ...current,
    ])
  }

  function updateExposure(nextStatus: ExposureStatus) {
    if (!selected) return
    setExposures((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              status: nextStatus,
            }
          : item
      )
    )
    addActivity(`set exposure to ${nextStatus}`, selected.title)
  }

  function launchCampaign() {
    if (!selected) return
    const existing = campaigns.find((campaign) => campaign.exposureId === selected.id)
    if (existing) return

    const created: Campaign = {
      id: `CMP-${campaigns.length + 40}`,
      exposureId: selected.id,
      title: `${selected.service} containment sprint`,
      owner: selected.owner,
      dueLabel: "Jul 21",
      state: "active",
      tasksCompleted: 0,
      tasksTotal: selected.fixPlan.length,
      projectedReduction: selected.blastRadius * 6,
      updatedAt: "Now",
    }

    setCampaigns((current) => [created, ...current])
    setExposures((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              status: "active",
            }
          : item
      )
    )
    addActivity("launched remediation campaign", created.title)
  }

  function advanceCampaign(campaign: Campaign) {
    const nextState = campaign.state === "active" ? "verification" : "done"

    setCampaigns((current) =>
      current.map((item) =>
        item.id === campaign.id
          ? {
              ...item,
              state: nextState,
              tasksCompleted: nextState === "done" ? item.tasksTotal : item.tasksTotal,
              updatedAt: "Now",
            }
          : item
      )
    )

    setExposures((current) =>
      current.map((item) =>
        item.id === campaign.exposureId
          ? {
              ...item,
              status: nextState === "done" ? "mitigated" : "verification",
            }
          : item
      )
    )

    addActivity(
      nextState === "done" ? "closed campaign" : "moved campaign to verification",
      campaign.title
    )
  }

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Strata / Exposure Ops</p>
          <h1 className={styles.title}>Attack-path remediation, not widget sprawl.</h1>
          <p className={styles.subtitle}>
            Demo data only. Strata compresses scanner noise into a weekly operating surface for
            reducing reachable risk to crown-jewel services.
          </p>
        </div>
        <div className={styles.heroControls}>
          <div className={styles.snapshotCard}>
            <span>Snapshot</span>
            <strong>2026-07-16 09:14 UTC</strong>
            <small>Cloud, vuln, identity connectors seeded for demo</small>
          </div>
          <div className={styles.roleSwitch} aria-label="Role switcher">
            {roles.map((item) => (
              <button
                key={item}
                className={item === role ? styles.roleActive : styles.roleButton}
                onClick={() => setRole(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.metrics}>
        <MetricCard
          label="Open choke points"
          value={String(openCritical)}
          note="Exploit and business context applied"
          tone="danger"
          icon={<ShieldAlert size={18} />}
        />
        <MetricCard
          label="Reachable crown-jewel paths"
          value={String(crownJewelPaths)}
          note="Across payments, identity, analytics"
          tone="signal"
          icon={<Sparkles size={18} />}
        />
        <MetricCard
          label="Active campaigns"
          value={String(activeCampaigns)}
          note="Cross-team remediation in flight"
          tone="safe"
          icon={<CheckCircle2 size={18} />}
        />
        <MetricCard
          label="SLA pressure"
          value={String(slaRisk)}
          note="Items due or already breached"
          tone="neutral"
          icon={<Clock3 size={18} />}
        />
      </section>

      <section className={styles.workspace}>
        <div className={styles.queuePane}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionEyebrow}>Priority queue</p>
              <h2>Fix packages ranked by leverage</h2>
            </div>
            <div className={styles.filterRow}>
              <span className={styles.filterIcon}>
                <Filter size={14} />
              </span>
              {filters.map((item) => (
                <button
                  key={item}
                  className={item === filter ? styles.filterActive : styles.filterButton}
                  onClick={() => setFilter(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.cardList}>
            {visibleExposures.length === 0 ? (
              <div className={styles.emptyState}>
                <ShieldCheck size={20} />
                <div>
                  <h3>No exposures in this view</h3>
                  <p>All matching items are already mitigated or suppressed in this demo state.</p>
                </div>
              </div>
            ) : null}

            {visibleExposures.map((exposure) => (
              <button
                key={exposure.id}
                className={exposure.id === selected?.id ? styles.queueCardActive : styles.queueCard}
                onClick={() => setSelectedId(exposure.id)}
                type="button"
              >
                <div className={styles.cardTopline}>
                  <span className={styles.cardId}>{exposure.id}</span>
                  <span className={styles.cardStatus}>{formatStatus(exposure.status)}</span>
                </div>
                <h3>{exposure.title}</h3>
                <p>{exposure.service}</p>
                <div className={styles.scoreRow}>
                  <strong>{exposure.score}</strong>
                  <span>{scoreLabel(exposure.score)}</span>
                  <ChevronRight size={16} />
                </div>
                <div className={styles.tagRow}>
                  <span>{exposure.exploitSignal}</span>
                  <span>{exposure.attackPaths} paths</span>
                  <span>{exposure.assetCount} assets</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.detailPane}>
          {selected ? (
            <>
              <div className={styles.detailCard}>
                <div className={styles.detailHeader}>
                  <div>
                    <p className={styles.sectionEyebrow}>Selected choke point</p>
                    <h2>{selected.title}</h2>
                  </div>
                  <div className={styles.detailScore}>
                    <span>Priority score</span>
                    <strong>{selected.score}</strong>
                  </div>
                </div>

                <div className={styles.reasonGrid}>
                  {selected.rationale.map((reason) => (
                    <div className={styles.reasonPill} key={reason}>
                      {reason}
                    </div>
                  ))}
                </div>

                <div className={styles.pathCard}>
                  <div className={styles.pathHeading}>
                    <span>Attack path narrative</span>
                    <small>{selected.blastRadius} systems in blast radius</small>
                  </div>
                  <div className={styles.pathFlow}>
                    {selected.path.map((node, index) => (
                      <div className={styles.pathNode} key={node}>
                        <span>{node}</span>
                        {index < selected.path.length - 1 ? <ArrowRight size={14} /> : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.columns}>
                  <div className={styles.subCard}>
                    <h3>Recommended fix package</h3>
                    <ul>
                      {selected.fixPlan.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.subCard}>
                    <h3>Control context</h3>
                    <ul>
                      {selected.controls.map((control) => (
                        <li key={control}>{control}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={styles.detailMeta}>
                  <div>
                    <span>Owner</span>
                    <strong>{selected.owner}</strong>
                  </div>
                  <div>
                    <span>Environment</span>
                    <strong>{selected.environment}</strong>
                  </div>
                  <div>
                    <span>Exposure age</span>
                    <strong>{selected.ageDays} days</strong>
                  </div>
                  <div>
                    <span>Target date</span>
                    <strong>{selected.dueLabel}</strong>
                  </div>
                </div>

                <div className={styles.actionRow}>
                  <button className={styles.primaryButton} onClick={launchCampaign} type="button">
                    Launch campaign
                  </button>
                  <button
                    className={styles.secondaryButton}
                    onClick={() => updateExposure("verification")}
                    type="button"
                  >
                    Move to verification
                  </button>
                  <button
                    className={styles.secondaryButton}
                    onClick={() => updateExposure("snoozed")}
                    type="button"
                  >
                    Suppress
                  </button>
                </div>
              </div>

              <div className={styles.notesCard}>
                <div className={styles.sectionHeader}>
                  <div>
                    <p className={styles.sectionEyebrow}>Operator note</p>
                    <h2>Trust and handoff context</h2>
                  </div>
                </div>
                <textarea
                  className={styles.notesInput}
                  onChange={(event) =>
                    setNotes((current) => ({
                      ...current,
                      [selected.id]: event.target.value,
                    }))
                  }
                  placeholder="Document why this path is real, what owner agreed to, or what still blocks remediation."
                  value={notes[selected.id] ?? ""}
                />
              </div>
            </>
          ) : null}
        </div>
      </section>

      <section className={styles.bottomGrid}>
        <div className={styles.detailCard}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionEyebrow}>Campaign rail</p>
              <h2>Active remediation work</h2>
            </div>
          </div>

          <div className={styles.campaignList}>
            {campaigns.map((campaign) => (
              <div className={styles.campaignCard} key={campaign.id}>
                <div className={styles.campaignTopline}>
                  <strong>{campaign.title}</strong>
                  <span>{campaign.state}</span>
                </div>
                <p>
                  {campaign.owner} · due {campaign.dueLabel} · projected risk reduction{" "}
                  {campaign.projectedReduction}%
                </p>
                <div className={styles.progressBar} aria-hidden="true">
                  <span
                    style={{
                      width: `${(campaign.tasksCompleted / campaign.tasksTotal) * 100}%`,
                    }}
                  />
                </div>
                <div className={styles.campaignFooter}>
                  <small>
                    {campaign.tasksCompleted}/{campaign.tasksTotal} tasks complete · updated{" "}
                    {campaign.updatedAt}
                  </small>
                  <button
                    className={styles.inlineButton}
                    onClick={() => advanceCampaign(campaign)}
                    type="button"
                  >
                    {campaign.state === "active" ? "Send to verify" : "Mark done"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.detailCard}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionEyebrow}>Activity</p>
              <h2>Audit-friendly timeline</h2>
            </div>
          </div>
          <ul className={styles.activityList}>
            {activity.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.actor}</strong>
                  <span>{item.action}</span>
                  <p>{item.target}</p>
                </div>
                <small>{item.timestamp}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

function MetricCard({
  label,
  value,
  note,
  tone,
  icon,
}: {
  label: string
  value: string
  note: string
  tone: "danger" | "signal" | "safe" | "neutral"
  icon: React.ReactNode
}) {
  return (
    <article className={styles.metricCard} data-tone={tone}>
      <div className={styles.metricLabel}>
        <span>{icon}</span>
        <p>{label}</p>
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  )
}
