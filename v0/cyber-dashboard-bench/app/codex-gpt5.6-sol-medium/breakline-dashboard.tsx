"use client"

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bell,
  Boxes,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clock3,
  Cloud,
  Command,
  Database,
  ExternalLink,
  FileCheck2,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  Menu,
  MoreHorizontal,
  Network,
  RotateCcw,
  Search,
  Server,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserRoundPlus,
  X,
  Zap,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import styles from "./dashboard.module.css"

type ActionState = "Act now" | "Schedule" | "Watch"
type Filter = "All" | "Act now" | "Needs owner" | "Watch"
type DetailTab = "Decision" | "Evidence" | "Activity"

type Decision = {
  id: string
  action: ActionState
  score: number
  title: string
  service: string
  target: string
  recommendation: string
  owner: string | null
  due: string
  tags: string[]
  findings: number
  change: string
}

type StoredDemo = {
  owners: Record<string, string>
  packets: Record<string, boolean>
  strategies: Record<string, string>
}

const decisions: Decision[] = [
  {
    id: "BL-1042",
    action: "Act now",
    score: 92,
    title: "Break public path to patient records",
    service: "Patient Portal",
    target: "patient-data-prod",
    recommendation: "Restrict public ingress on edge-api-prod",
    owner: null,
    due: "Due in 4h",
    tags: ["CISA KEV", "External", "Tier 0"],
    findings: 14,
    change: "KEV evidence added 18m ago",
  },
  {
    id: "BL-1038",
    action: "Act now",
    score: 87,
    title: "Revoke dormant admin path to billing",
    service: "Billing Core",
    target: "stripe-vault",
    recommendation: "Remove inherited BillingAdmin grant",
    owner: "Identity",
    due: "Due today",
    tags: ["Privilege", "Dormant key", "Tier 1"],
    findings: 7,
    change: "New path after IAM sync",
  },
  {
    id: "BL-1031",
    action: "Schedule",
    score: 76,
    title: "Close build runner path to production",
    service: "Release Platform",
    target: "prod-deployer",
    recommendation: "Scope runner role to staging accounts",
    owner: "Developer Platform",
    due: "Due Fri",
    tags: ["Lateral move", "CI/CD"],
    findings: 21,
    change: "Owner confirmed yesterday",
  },
  {
    id: "BL-1027",
    action: "Schedule",
    score: 69,
    title: "Rotate exposed support integration token",
    service: "Customer Support",
    target: "support-export",
    recommendation: "Rotate token and reduce export scope",
    owner: null,
    due: "Due in 3d",
    tags: ["Secret", "PII"],
    findings: 4,
    change: "Repository owner unresolved",
  },
  {
    id: "BL-1019",
    action: "Watch",
    score: 48,
    title: "Monitor legacy image with effective isolation",
    service: "Claims Archive",
    target: "archive-index",
    recommendation: "Refresh segmentation evidence",
    owner: "Infrastructure",
    due: "Review Jul 19",
    tags: ["Compensated", "Evidence stale"],
    findings: 9,
    change: "Network evidence is 8d old",
  },
]

const strategies = [
  {
    id: "ingress",
    title: "Restrict public ingress",
    subtitle: "Allow only gateway and health-check ranges",
    reduction: "14 paths",
    effort: "35 min",
    disruption: "Low",
    verify: "Network policy + graph refresh",
    recommended: true,
  },
  {
    id: "permission",
    title: "Remove role permission",
    subtitle: "Drop patient-data:Read from edge runtime role",
    reduction: "11 paths",
    effort: "2–4 hrs",
    disruption: "Medium",
    verify: "IAM simulator + app smoke test",
    recommended: false,
  },
  {
    id: "patch",
    title: "Patch vulnerable package",
    subtitle: "Upgrade Apache HTTP Server to fixed release",
    reduction: "8 paths",
    effort: "1–2 days",
    disruption: "Medium",
    verify: "Authenticated scan + canary",
    recommended: false,
  },
]

const factors = [
  { label: "Exploit evidence", value: 24, max: 25, detail: "KEV + EPSS 93rd percentile" },
  { label: "Path confidence", value: 23, max: 25, detail: "Validated public route; IAM inferred" },
  { label: "Business impact", value: 25, max: 25, detail: "Tier 0 service · regulated data" },
  { label: "Control gap", value: 12, max: 15, detail: "WAF present; no route restriction" },
  { label: "Urgency", value: 8, max: 10, detail: "SLA 4h · changed 18m ago" },
]

const evidence = [
  {
    name: "Known exploitation",
    value: "CISA KEV",
    source: "CISA catalog",
    age: "Observed 18m ago",
    kind: "Observed",
  },
  {
    name: "Exploit likelihood",
    value: "34.7% · 93rd pct",
    source: "FIRST EPSS",
    age: "Model date Jul 16",
    kind: "Imported",
  },
  {
    name: "External reachability",
    value: "Validated",
    source: "Cloud edge inventory",
    age: "Observed 11m ago",
    kind: "Observed",
  },
  {
    name: "Identity hop",
    value: "82% confidence",
    source: "IAM graph inference",
    age: "Calculated 9m ago",
    kind: "Inferred",
  },
]

const navItems = [
  { label: "Today", icon: LayoutDashboard, active: true },
  { label: "Decisions", icon: ListChecks },
  { label: "Campaigns", icon: Zap, count: "3" },
  { label: "Services", icon: Boxes },
  { label: "Evidence", icon: Database, count: "1" },
]

const initialDemo: StoredDemo = { owners: {}, packets: {}, strategies: {} }

function actionClass(action: ActionState) {
  if (action === "Act now") return styles.actionNow
  if (action === "Schedule") return styles.actionSchedule
  return styles.actionWatch
}

function scoreTone(score: number) {
  if (score >= 85) return styles.scoreCritical
  if (score >= 65) return styles.scoreElevated
  return styles.scoreWatch
}

export default function BreaklineDashboard() {
  const [selectedId, setSelectedId] = useState(decisions[0].id)
  const [filter, setFilter] = useState<Filter>("All")
  const [query, setQuery] = useState("")
  const [detailTab, setDetailTab] = useState<DetailTab>("Decision")
  const [showDetail, setShowDetail] = useState(false)
  const [demo, setDemo] = useState<StoredDemo>(initialDemo)
  const [ownerMenu, setOwnerMenu] = useState(false)
  const [creating, setCreating] = useState(false)
  const [toast, setToast] = useState("")
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem("breakline-demo-v1")
    if (!saved) return
    try {
      const parsed = JSON.parse(saved) as StoredDemo
      const timer = window.setTimeout(() => setDemo(parsed), 0)
      return () => window.clearTimeout(timer)
    } catch {
      window.localStorage.removeItem("breakline-demo-v1")
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("breakline-demo-v1", JSON.stringify(demo))
  }, [demo])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(""), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return decisions.filter((decision) => {
      const owner = demo.owners[decision.id] ?? decision.owner
      const matchesFilter =
        filter === "All" ||
        (filter === "Act now" && decision.action === "Act now") ||
        (filter === "Needs owner" && !owner) ||
        (filter === "Watch" && decision.action === "Watch")
      const matchesQuery =
        !normalized ||
        [
          decision.id,
          decision.title,
          decision.service,
          decision.target,
          decision.tags.join(" "),
          owner ?? "unassigned",
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized)
      return matchesFilter && matchesQuery
    })
  }, [demo.owners, filter, query])

  const selected = decisions.find((decision) => decision.id === selectedId) ?? decisions[0]
  const selectedOwner = demo.owners[selected.id] ?? selected.owner
  const selectedStrategy = demo.strategies[selected.id] ?? "ingress"
  const packetReady = Boolean(demo.packets[selected.id])
  const selectedStrategyData =
    strategies.find((strategy) => strategy.id === selectedStrategy) ?? strategies[0]

  function openDecision(id: string) {
    setSelectedId(id)
    setDetailTab("Decision")
    setShowDetail(true)
  }

  function assignOwner(owner: string) {
    setDemo((current) => ({
      ...current,
      owners: { ...current.owners, [selected.id]: owner },
    }))
    setOwnerMenu(false)
    setToast(`${owner} assigned to ${selected.id}`)
  }

  function selectStrategy(id: string) {
    setDemo((current) => ({
      ...current,
      strategies: { ...current.strategies, [selected.id]: id },
      packets: { ...current.packets, [selected.id]: false },
    }))
  }

  function createPacket() {
    if (!selectedOwner) {
      setOwnerMenu(true)
      setToast("Assign an owner before creating the packet")
      return
    }
    setCreating(true)
    window.setTimeout(() => {
      setDemo((current) => ({
        ...current,
        packets: { ...current.packets, [selected.id]: true },
      }))
      setCreating(false)
      setToast(`Demo packet ${selected.id} is ready — nothing was sent`)
    }, 650)
  }

  function resetDemo() {
    setDemo(initialDemo)
    setFilter("All")
    setQuery("")
    setToast("Demo workflow reset")
  }

  return (
    <div className={styles.appShell}>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>

      <aside className={`${styles.sidebar} ${navOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.brand}>
          <div className={styles.brandMark} aria-hidden="true">
            <span />
            <span />
          </div>
          <div>
            <strong>Breakline</strong>
            <span>Exposure operations</span>
          </div>
          <button
            className={styles.closeNav}
            type="button"
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav className={styles.primaryNav} aria-label="Primary navigation">
          <p className={styles.navLabel}>Workspace</p>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                className={`${styles.navItem} ${item.active ? styles.navItemActive : ""}`}
                key={item.label}
                type="button"
                onClick={() => setNavOpen(false)}
              >
                <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                <span>{item.label}</span>
                {item.count && <small>{item.count}</small>}
              </button>
            )
          })}
        </nav>

        <div className={styles.sidebarBottom}>
          <div className={styles.coverageCard}>
            <div>
              <ShieldCheck size={17} aria-hidden="true" />
              <strong>Evidence coverage</strong>
            </div>
            <div className={styles.coverageValue}>
              <span>72%</span>
              <small>+8% this month</small>
            </div>
            <div className={styles.miniTrack}>
              <span />
            </div>
            <p>1 connector needs attention</p>
          </div>
          <div className={styles.profile}>
            <div className={styles.avatar}>AM</div>
            <div>
              <strong>Alex Morgan</strong>
              <span>Security engineering</span>
            </div>
            <MoreHorizontal size={17} aria-hidden="true" />
          </div>
        </div>
      </aside>

      {navOpen && (
        <button
          type="button"
          className={styles.scrim}
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
        />
      )}

      <div className={styles.mainColumn}>
        <header className={styles.topbar}>
          <button
            className={styles.menuButton}
            type="button"
            aria-label="Open navigation"
            onClick={() => setNavOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className={styles.mobileBrand}>
            <div className={styles.brandMark} aria-hidden="true">
              <span />
              <span />
            </div>
            <strong>Breakline</strong>
          </div>
          <button className={styles.commandButton} type="button">
            <Search size={16} aria-hidden="true" />
            <span>Search services, assets, decisions…</span>
            <kbd>
              <Command size={11} aria-hidden="true" />K
            </kbd>
          </button>
          <div className={styles.topActions}>
            <span className={styles.demoPill}>
              <span />
              Demo environment
            </span>
            <button type="button" aria-label="Notifications" className={styles.iconButton}>
              <Bell size={18} />
              <i />
            </button>
            <button type="button" className={styles.helpButton}>
              Help
            </button>
          </div>
        </header>

        <main id="main-content" className={styles.main}>
          <div className={styles.demoBanner}>
            <Sparkles size={15} aria-hidden="true" />
            <span>
              <strong>Guided demo:</strong> Northstar Health is a fictional environment. No
              integrations are live and no changes or tickets will be sent.
            </span>
            <button type="button" onClick={resetDemo}>
              <RotateCcw size={13} aria-hidden="true" />
              Reset
            </button>
          </div>

          <section className={styles.pageHeader}>
            <div>
              <p className={styles.eyebrow}>Thursday · July 16</p>
              <h1>Three decisions need you</h1>
              <p>Start with the paths that can change business impact today.</p>
            </div>
            <div className={styles.headerMeta}>
              <span>
                <span className={styles.liveDot} />
                Evidence updated 9m ago
              </span>
              <button type="button">
                Last 24 hours <ChevronDown size={14} />
              </button>
            </div>
          </section>

          <section className={styles.metrics} aria-label="Exposure program summary">
            <article className={styles.metricCard}>
              <div className={`${styles.metricIcon} ${styles.metricUrgent}`}>
                <CircleAlert size={17} />
              </div>
              <div>
                <span>Needs a decision</span>
                <strong>3</strong>
              </div>
              <small>2 due today</small>
            </article>
            <article className={styles.metricCard}>
              <div className={`${styles.metricIcon} ${styles.metricIndigo}`}>
                <Network size={17} />
              </div>
              <div>
                <span>Critical-path coverage</span>
                <strong>72%</strong>
              </div>
              <small className={styles.positive}>↑ 8% this month</small>
            </article>
            <article className={styles.metricCard}>
              <div className={`${styles.metricIcon} ${styles.metricAmber}`}>
                <Clock3 size={17} />
              </div>
              <div>
                <span>Median decision time</span>
                <strong>1.8h</strong>
              </div>
              <small className={styles.positive}>↓ 36m vs. June</small>
            </article>
            <article className={styles.metricCard}>
              <div className={`${styles.metricIcon} ${styles.metricGreen}`}>
                <CheckCircle2 size={17} />
              </div>
              <div>
                <span>Verified paths closed</span>
                <strong>43</strong>
              </div>
              <div className={styles.sparkline} aria-label="Upward 30-day trend">
                <svg viewBox="0 0 72 28" role="img">
                  <path d="M2 24 C12 22 12 18 22 19 S35 14 42 16 S52 8 59 10 S67 4 70 5" />
                </svg>
              </div>
            </article>
          </section>

          <section className={styles.workspace} aria-label="Decision workspace">
            <div
              className={`${styles.queuePanel} ${showDetail ? styles.queuePanelMobileHidden : ""}`}
            >
              <div className={styles.panelHeading}>
                <div>
                  <h2>Decision queue</h2>
                  <span>{filtered.length} shown · 55 findings compressed</span>
                </div>
                <button type="button" aria-label="Queue options">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className={styles.queueTools}>
                <div className={styles.filterRow} aria-label="Filter decisions">
                  {(["All", "Act now", "Needs owner", "Watch"] as Filter[]).map((item) => (
                    <button
                      type="button"
                      key={item}
                      aria-pressed={filter === item}
                      className={filter === item ? styles.filterActive : ""}
                      onClick={() => setFilter(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <label className={styles.queueSearch}>
                  <Search size={15} aria-hidden="true" />
                  <span className={styles.srOnly}>Search decision queue</span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Filter this queue"
                  />
                  {query && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => setQuery("")}
                    >
                      <X size={14} />
                    </button>
                  )}
                </label>
              </div>

              <div className={styles.queueList}>
                {filtered.map((decision) => {
                  const owner = demo.owners[decision.id] ?? decision.owner
                  const ready = demo.packets[decision.id]
                  return (
                    <button
                      type="button"
                      key={decision.id}
                      className={`${styles.decisionRow} ${
                        selected.id === decision.id ? styles.decisionRowSelected : ""
                      }`}
                      onClick={() => openDecision(decision.id)}
                    >
                      <div className={styles.rowTop}>
                        <span className={`${styles.actionBadge} ${actionClass(decision.action)}`}>
                          {decision.action}
                        </span>
                        <span className={`${styles.score} ${scoreTone(decision.score)}`}>
                          {decision.score}
                        </span>
                        <span className={styles.decisionId}>{decision.id}</span>
                        <ChevronRight className={styles.rowChevron} size={16} />
                      </div>
                      <h3>{decision.title}</h3>
                      <p className={styles.serviceLine}>
                        <Shield size={13} aria-hidden="true" />
                        {decision.service}
                        <span>→</span>
                        <span>{decision.target}</span>
                      </p>
                      <div className={styles.tagRow}>
                        {decision.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <div className={styles.rowRecommendation}>
                        <span>Best break</span>
                        <strong>{decision.recommendation}</strong>
                      </div>
                      <div className={styles.rowFooter}>
                        <span className={owner ? "" : styles.ownerMissing}>
                          {owner ? (
                            <>
                              <span className={styles.ownerAvatar}>{owner.slice(0, 2)}</span>
                              {owner}
                            </>
                          ) : (
                            <>
                              <UserRoundPlus size={13} />
                              Needs owner
                            </>
                          )}
                        </span>
                        <span>{ready ? "Packet ready" : decision.due}</span>
                      </div>
                    </button>
                  )
                })}

                {filtered.length === 0 && (
                  <div className={styles.emptyState}>
                    <div>
                      <CheckCircle2 size={24} />
                    </div>
                    <h3>No decisions match this view</h3>
                    <p>Try another filter or clear your search. The underlying queue is unchanged.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setFilter("All")
                        setQuery("")
                      }}
                    >
                      Reset filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            <article
              className={`${styles.detailPanel} ${
                !showDetail ? styles.detailPanelMobileHidden : ""
              }`}
            >
              <button
                className={styles.backButton}
                type="button"
                onClick={() => setShowDetail(false)}
              >
                <ArrowLeft size={16} /> Back to queue
              </button>

              <div className={styles.detailHeader}>
                <div className={styles.detailTitleRow}>
                  <div className={styles.riskBadge}>
                    <span>{selected.score}</span>
                    <small>priority</small>
                  </div>
                  <div>
                    <div className={styles.detailKicker}>
                      <span className={`${styles.actionBadge} ${actionClass(selected.action)}`}>
                        {selected.action}
                      </span>
                      <span>{selected.id}</span>
                      <span>Updated 9m ago</span>
                    </div>
                    <h2>{selected.title}</h2>
                  </div>
                </div>
                <button type="button" aria-label="Decision options" className={styles.detailMore}>
                  <MoreHorizontal size={19} />
                </button>
              </div>

              <div className={styles.detailTabs} role="tablist" aria-label="Decision detail">
                {(["Decision", "Evidence", "Activity"] as DetailTab[]).map((tab) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={detailTab === tab}
                    key={tab}
                    onClick={() => setDetailTab(tab)}
                  >
                    {tab}
                    {tab === "Evidence" && <span>8</span>}
                    {tab === "Activity" && <span>4</span>}
                  </button>
                ))}
              </div>

              {detailTab === "Decision" && (
                <div className={styles.detailScroll}>
                  <section className={styles.conclusionCard}>
                    <div className={styles.conclusionIcon}>
                      <Zap size={18} />
                    </div>
                    <div>
                      <span>Recommended decision</span>
                      <h3>Restrict public ingress before the 16:00 change window.</h3>
                      <p>
                        A known-exploited Apache flaw is reachable from the internet and can
                        inherit read access to the Tier 0 patient-data store. Restricting ingress
                        breaks all 14 observed paths with the least production disruption.
                      </p>
                    </div>
                    <span className={styles.confidence}>High confidence</span>
                  </section>

                  <section className={styles.pathSection}>
                    <div className={styles.sectionHeading}>
                      <div>
                        <h3>How the path reaches patient data</h3>
                        <p>One representative path · 14 share this breakpoint</p>
                      </div>
                      <button type="button">
                        Open full graph <ExternalLink size={13} />
                      </button>
                    </div>

                    <div className={styles.attackPath}>
                      <div className={styles.pathNode}>
                        <div className={`${styles.nodeIcon} ${styles.nodeOrigin}`}>
                          <Cloud size={18} />
                        </div>
                        <span>Origin</span>
                        <strong>Public internet</strong>
                        <small>0.0.0.0/0</small>
                      </div>
                      <div className={styles.pathEdge}>
                        <span>HTTPS :443</span>
                        <ArrowRight size={17} />
                        <i className={styles.breakMark}>
                          <X size={12} />
                        </i>
                        <small>Preferred break</small>
                      </div>
                      <div className={styles.pathNode}>
                        <div className={`${styles.nodeIcon} ${styles.nodeServer}`}>
                          <Server size={18} />
                        </div>
                        <span>Workload</span>
                        <strong>edge-api-prod</strong>
                        <small>CVE-2024-38475</small>
                      </div>
                      <div className={styles.pathEdge}>
                        <span>Assumes role</span>
                        <ArrowRight size={17} />
                      </div>
                      <div className={styles.pathNode}>
                        <div className={`${styles.nodeIcon} ${styles.nodeIdentity}`}>
                          <KeyRound size={18} />
                        </div>
                        <span>Identity</span>
                        <strong>portal-runtime</strong>
                        <small>patient-data:Read</small>
                      </div>
                      <div className={styles.pathEdge}>
                        <span>Reads</span>
                        <ArrowRight size={17} />
                      </div>
                      <div className={`${styles.pathNode} ${styles.pathNodeTarget}`}>
                        <div className={`${styles.nodeIcon} ${styles.nodeTarget}`}>
                          <Database size={18} />
                        </div>
                        <span>Crown jewel</span>
                        <strong>patient-data-prod</strong>
                        <small>Tier 0 · regulated</small>
                      </div>
                    </div>
                    <p className={styles.pathSummary}>
                      Text path: public internet reaches <strong>edge-api-prod</strong> over
                      HTTPS; the workload can assume <strong>portal-runtime</strong>, which can
                      read <strong>patient-data-prod</strong>.
                    </p>
                  </section>

                  <section className={styles.breakpointSection}>
                    <div className={styles.sectionHeading}>
                      <div>
                        <h3>Choose the safest breakpoint</h3>
                        <p>Changing the selection updates the owner packet.</p>
                      </div>
                      <span className={styles.policyChip}>
                        <SlidersHorizontal size={12} /> Policy v3.4
                      </span>
                    </div>

                    <div className={styles.strategyGrid} role="radiogroup">
                      {strategies.map((strategy) => (
                        <button
                          type="button"
                          role="radio"
                          aria-checked={selectedStrategy === strategy.id}
                          key={strategy.id}
                          className={`${styles.strategyCard} ${
                            selectedStrategy === strategy.id ? styles.strategySelected : ""
                          }`}
                          onClick={() => selectStrategy(strategy.id)}
                        >
                          <div className={styles.strategyTop}>
                            <span className={styles.radioMark}>
                              {selectedStrategy === strategy.id && <Check size={12} />}
                            </span>
                            {strategy.recommended && <small>Recommended</small>}
                          </div>
                          <h4>{strategy.title}</h4>
                          <p>{strategy.subtitle}</p>
                          <dl>
                            <div>
                              <dt>Path reduction</dt>
                              <dd>{strategy.reduction}</dd>
                            </div>
                            <div>
                              <dt>Effort</dt>
                              <dd>{strategy.effort}</dd>
                            </div>
                            <div>
                              <dt>Disruption</dt>
                              <dd>{strategy.disruption}</dd>
                            </div>
                          </dl>
                          <span className={styles.verifyLine}>
                            <FileCheck2 size={13} />
                            Verify: {strategy.verify}
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className={styles.reasoningGrid}>
                    <div className={styles.factorsCard}>
                      <div className={styles.sectionHeading}>
                        <div>
                          <h3>Why this is ranked 92</h3>
                          <p>Decision priority, not breach probability</p>
                        </div>
                        <button type="button">Formula</button>
                      </div>
                      <div className={styles.hardGate}>
                        <CircleAlert size={15} />
                        <span>
                          <strong>Hard gate:</strong> KEV + reachable path to Tier 0
                        </span>
                      </div>
                      <div className={styles.factorList}>
                        {factors.map((factor) => (
                          <div className={styles.factor} key={factor.label}>
                            <div>
                              <span>{factor.label}</span>
                              <strong>
                                +{factor.value}/{factor.max}
                              </strong>
                            </div>
                            <div className={styles.factorTrack}>
                              <span style={{ width: `${(factor.value / factor.max) * 100}%` }} />
                            </div>
                            <small>{factor.detail}</small>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.evidenceCard}>
                      <div className={styles.sectionHeading}>
                        <div>
                          <h3>Material evidence</h3>
                          <p>Freshness and provenance are part of trust.</p>
                        </div>
                        <button type="button" onClick={() => setDetailTab("Evidence")}>
                          All 8
                        </button>
                      </div>
                      <div className={styles.evidenceList}>
                        {evidence.map((item) => (
                          <div className={styles.evidenceItem} key={item.name}>
                            <div>
                              <span>{item.name}</span>
                              <strong>{item.value}</strong>
                            </div>
                            <div>
                              <span>{item.kind}</span>
                              <small>{item.source}</small>
                              <small>{item.age}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {detailTab === "Evidence" && (
                <div className={`${styles.detailScroll} ${styles.secondaryTab}`}>
                  <div className={styles.tabIntro}>
                    <div className={styles.tabIcon}>
                      <Database size={19} />
                    </div>
                    <div>
                      <h3>Evidence ledger</h3>
                      <p>
                        Observations, imported claims, and calculations remain separate. The
                        ranking last recomputed at 11:36 WEST.
                      </p>
                    </div>
                  </div>
                  {evidence.concat([
                    {
                      name: "Technical severity",
                      value: "CVSS-B 9.1",
                      source: "NVD · vector preserved",
                      age: "Imported 2h ago",
                      kind: "Imported",
                    },
                    {
                      name: "Business service tier",
                      value: "Tier 0",
                      source: "Service catalog",
                      age: "Confirmed Jul 11",
                      kind: "Analyst",
                    },
                    {
                      name: "WAF control",
                      value: "Present · partial",
                      source: "Cloud edge inventory",
                      age: "Observed 11m ago",
                      kind: "Observed",
                    },
                    {
                      name: "Asset ownership",
                      value: selectedOwner ?? "Unresolved",
                      source: selectedOwner ? "Demo assignment" : "3 sources conflict",
                      age: selectedOwner ? "Changed this session" : "Last checked 9m ago",
                      kind: selectedOwner ? "Analyst" : "Inferred",
                    },
                  ]).map((item) => (
                    <article className={styles.ledgerRow} key={item.name}>
                      <div className={styles.ledgerStatus}>
                        <span />
                      </div>
                      <div>
                        <span>{item.kind}</span>
                        <h4>{item.name}</h4>
                        <p>{item.source}</p>
                      </div>
                      <div>
                        <strong>{item.value}</strong>
                        <span>{item.age}</span>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {detailTab === "Activity" && (
                <div className={`${styles.detailScroll} ${styles.secondaryTab}`}>
                  <div className={styles.tabIntro}>
                    <div className={styles.tabIcon}>
                      <Activity size={19} />
                    </div>
                    <div>
                      <h3>Decision history</h3>
                      <p>Every material evidence and workflow change is retained for audit.</p>
                    </div>
                  </div>
                  <div className={styles.timeline}>
                    <article>
                      <span className={styles.timelineDot} />
                      <div>
                        <strong>Priority increased from 84 to 92</strong>
                        <p>CISA KEV membership triggered the Tier 0 hard gate.</p>
                        <small>11:36 · Policy engine · v3.4</small>
                      </div>
                    </article>
                    <article>
                      <span className={styles.timelineDot} />
                      <div>
                        <strong>External route validated</strong>
                        <p>Cloud edge inventory confirmed HTTPS :443 from 0.0.0.0/0.</p>
                        <small>11:27 · AWS inventory connector</small>
                      </div>
                    </article>
                    {selectedOwner && (
                      <article>
                        <span className={styles.timelineDot} />
                        <div>
                          <strong>{selectedOwner} assigned</strong>
                          <p>Local demo assignment; no external system was updated.</p>
                          <small>This session · Alex Morgan</small>
                        </div>
                      </article>
                    )}
                    {packetReady && (
                      <article>
                        <span className={`${styles.timelineDot} ${styles.timelineDone}`} />
                        <div>
                          <strong>Demo Decision Packet created</strong>
                          <p>
                            Selected breakpoint: {selectedStrategyData.title}. No ticket was sent.
                          </p>
                          <small>This session · Alex Morgan</small>
                        </div>
                      </article>
                    )}
                  </div>
                </div>
              )}

              <footer className={styles.actionFooter}>
                <div className={styles.footerSelection}>
                  <span>Selected breakpoint</span>
                  <strong>{selectedStrategyData.title}</strong>
                  <small>{selectedStrategyData.reduction} removed · {selectedStrategyData.effort}</small>
                </div>

                <div className={styles.ownerControl}>
                  <span>Owner</span>
                  <div className={styles.ownerMenuWrap}>
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={ownerMenu}
                      onClick={() => setOwnerMenu((open) => !open)}
                      className={!selectedOwner ? styles.ownerButtonMissing : ""}
                    >
                      {selectedOwner ? (
                        <>
                          <span className={styles.ownerAvatar}>{selectedOwner.slice(0, 2)}</span>
                          {selectedOwner}
                        </>
                      ) : (
                        <>
                          <UserRoundPlus size={14} />
                          Assign owner
                        </>
                      )}
                      <ChevronDown size={13} />
                    </button>
                    {ownerMenu && (
                      <div className={styles.ownerDropdown} role="menu">
                        {["Platform Edge", "Cloud Security", "Developer Platform"].map((owner) => (
                          <button
                            type="button"
                            role="menuitem"
                            key={owner}
                            onClick={() => assignOwner(owner)}
                          >
                            <span className={styles.ownerAvatar}>{owner.slice(0, 2)}</span>
                            <span>
                              <strong>{owner}</strong>
                              <small>
                                {owner === "Platform Edge"
                                  ? "Suggested from cloud tags"
                                  : "Available team"}
                              </small>
                            </span>
                            {owner === "Platform Edge" && <Sparkles size={13} />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className={`${styles.packetButton} ${packetReady ? styles.packetReady : ""}`}
                  onClick={packetReady ? () => setDetailTab("Activity") : createPacket}
                  disabled={creating}
                >
                  {creating ? (
                    <>
                      <span className={styles.spinner} />
                      Assembling…
                    </>
                  ) : packetReady ? (
                    <>
                      <CheckCircle2 size={16} />
                      Packet ready
                    </>
                  ) : (
                    <>
                      Create demo packet
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </footer>
            </article>
          </section>
        </main>
      </div>

      <nav className={styles.bottomNav} aria-label="Mobile navigation">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon
          return (
            <button
              type="button"
              key={item.label}
              className={item.active ? styles.bottomNavActive : ""}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`} aria-live="polite">
        <CheckCircle2 size={16} />
        <span>{toast}</span>
      </div>
    </div>
  )
}
