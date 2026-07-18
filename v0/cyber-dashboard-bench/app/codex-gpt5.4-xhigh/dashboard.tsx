"use client"

import {
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
  startTransition,
  type ChangeEvent,
} from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FolderKanban,
  Gauge,
  NotebookPen,
  Radar,
  RefreshCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Siren,
  TriangleAlert,
  Users,
} from "lucide-react"

import {
  BURN_DOWN_BASELINE,
  DEMO_OPERATOR,
  DEMO_REFRESH,
  FILTER_OPTIONS,
  OWNER_TEAMS,
  STORAGE_KEY,
  STORAGE_VERSION,
  TAB_LABELS,
  WORKFLOW_LABELS,
  buildInitialState,
  getOwnerTeam,
  getSlaState,
  isOpenWorkflowState,
  sortMissions,
} from "./data"
import styles from "./page.module.css"
import type {
  ExposureMission,
  FilterKey,
  OwnerTeam,
  PersistedDashboardState,
  TabKey,
  WorkflowState,
} from "./types"

const TAB_ICONS: Record<TabKey, LucideIcon> = {
  overview: Radar,
  missions: FolderKanban,
  owners: Users,
  audit: NotebookPen,
}

const STATE_CLASS_MAP: Record<WorkflowState, string> = {
  new: styles.pillDanger,
  notified: styles.pillWarning,
  in_progress: styles.pillAccent,
  resolved: styles.pillSuccess,
  accepted: styles.pillMuted,
}

const SEVERITY_CLASS_MAP = {
  critical: styles.pillDanger,
  high: styles.pillWarning,
  medium: styles.pillMuted,
} as const

const NODE_CLASS_MAP = {
  entry: styles.nodeEntry,
  application: styles.nodeApplication,
  identity: styles.nodeIdentity,
  compute: styles.nodeCompute,
  control: styles.nodeControl,
  data: styles.nodeData,
  service: styles.nodeService,
  network: styles.nodeNetwork,
  software: styles.nodeSoftware,
} as const

export default function Dashboard() {
  const initialState = useMemo(() => buildInitialState(), [])
  const [activeTab, setActiveTab] = useState<TabKey>(initialState.activeTab)
  const [activeFilter, setActiveFilter] = useState<FilterKey>(
    initialState.activeFilter
  )
  const [selectedMissionId, setSelectedMissionId] = useState(
    initialState.selectedMissionId
  )
  const [search, setSearch] = useState(initialState.search)
  const [missions, setMissions] = useState(initialState.missions)
  const hasLoadedRef = useRef(false)

  const deferredSearch = useDeferredValue(search.trim().toLowerCase())

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)

      if (!raw) {
        hasLoadedRef.current = true
        return
      }

      const parsed = JSON.parse(raw) as PersistedDashboardState

      if (
        parsed.version !== STORAGE_VERSION ||
        !Array.isArray(parsed.missions) ||
        typeof parsed.selectedMissionId !== "string"
      ) {
        hasLoadedRef.current = true
        return
      }

      startTransition(() => {
        setActiveTab(parsed.activeTab)
        setActiveFilter(parsed.activeFilter)
        setSearch(parsed.search)
        setSelectedMissionId(parsed.selectedMissionId)
        setMissions(parsed.missions)
      })
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    } finally {
      hasLoadedRef.current = true
    }
  }, [])

  const persistState = useEffectEvent((nextState: PersistedDashboardState) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
  })

  useEffect(() => {
    if (!hasLoadedRef.current) {
      return
    }

    persistState({
      version: STORAGE_VERSION,
      activeTab,
      activeFilter,
      search,
      selectedMissionId,
      missions,
    })
  }, [
    activeFilter,
    activeTab,
    missions,
    search,
    selectedMissionId,
  ])

  const orderedMissions = useMemo(() => sortMissions(missions), [missions])

  const visibleMissions = useMemo(() => {
    return orderedMissions.filter((mission) => {
      if (activeFilter === "breached" && getSlaState(mission) !== "breached") {
        return false
      }

      if (
        activeFilter === "unassigned" &&
        !(
          mission.ownerTeamId === "unassigned" &&
          isOpenWorkflowState(mission.workflowState)
        )
      ) {
        return false
      }

      if (
        activeFilter !== "all" &&
        activeFilter !== "breached" &&
        activeFilter !== "unassigned" &&
        mission.workflowState !== activeFilter
      ) {
        return false
      }

      if (!deferredSearch) {
        return true
      }

      const haystack = [
        mission.id,
        mission.title,
        mission.businessService,
        mission.crownJewel,
        mission.attackPath.entryPoint,
        mission.attackPath.chokePoint,
        getOwnerTeam(mission.ownerTeamId)?.name ?? "Unassigned",
      ]
        .join(" ")
        .toLowerCase()

      return haystack.includes(deferredSearch)
    })
  }, [activeFilter, deferredSearch, orderedMissions])

  const effectiveSelectedMissionId =
    visibleMissions.length > 0 &&
    !visibleMissions.some((mission) => mission.id === selectedMissionId)
      ? visibleMissions[0].id
      : selectedMissionId

  const selectedMission =
    orderedMissions.find((mission) => mission.id === effectiveSelectedMissionId) ??
    orderedMissions[0] ??
    null

  const openMissions = useMemo(
    () => orderedMissions.filter((mission) => isOpenWorkflowState(mission.workflowState)),
    [orderedMissions]
  )

  const breachedMissions = useMemo(
    () => openMissions.filter((mission) => getSlaState(mission) === "breached"),
    [openMissions]
  )

  const openRisk = sumRisk(openMissions)
  const ownerMappedCount = openMissions.filter(
    (mission) => mission.ownerTeamId !== "unassigned"
  ).length
  const ownerCoverage =
    openMissions.length === 0
      ? 100
      : Math.round((ownerMappedCount / openMissions.length) * 100)

  const workflowCounts = useMemo(() => {
    return {
      new: orderedMissions.filter((mission) => mission.workflowState === "new")
        .length,
      notified: orderedMissions.filter(
        (mission) => mission.workflowState === "notified"
      ).length,
      in_progress: orderedMissions.filter(
        (mission) => mission.workflowState === "in_progress"
      ).length,
      resolved: orderedMissions.filter(
        (mission) => mission.workflowState === "resolved"
      ).length,
      accepted: orderedMissions.filter(
        (mission) => mission.workflowState === "accepted"
      ).length,
    }
  }, [orderedMissions])

  const burnDownSeries = [...BURN_DOWN_BASELINE, openRisk]
  const burnDownDelta =
    burnDownSeries[burnDownSeries.length - 1] -
    burnDownSeries[burnDownSeries.length - 2]

  const chokepoints = useMemo(() => {
    const map = new Map<string, { label: string; count: number; risk: number }>()

    for (const mission of openMissions) {
      const current = map.get(mission.attackPath.chokePoint) ?? {
        label: mission.attackPath.chokePoint,
        count: 0,
        risk: 0,
      }

      current.count += 1
      current.risk += mission.riskScore
      map.set(mission.attackPath.chokePoint, current)
    }

    return [...map.values()].sort((left, right) => right.risk - left.risk)
  }, [openMissions])

  const entryPoints = useMemo(() => {
    const map = new Map<string, { label: string; count: number }>()

    for (const mission of openMissions) {
      const current = map.get(mission.attackPath.entryPoint) ?? {
        label: mission.attackPath.entryPoint,
        count: 0,
      }

      current.count += 1
      map.set(mission.attackPath.entryPoint, current)
    }

    return [...map.values()].sort((left, right) => right.count - left.count)
  }, [openMissions])

  const ownerLoad = useMemo(() => {
    return OWNER_TEAMS.map((team) => {
      const teamMissions = orderedMissions.filter(
        (mission) => mission.ownerTeamId === team.id
      )

      return {
        ...team,
        activeCount: teamMissions.filter((mission) =>
          isOpenWorkflowState(mission.workflowState)
        ).length,
        breachedCount: teamMissions.filter(
          (mission) => getSlaState(mission) === "breached"
        ).length,
        resolvedCount: teamMissions.filter(
          (mission) => mission.workflowState === "resolved"
        ).length,
        activeRisk: sumRisk(
          teamMissions.filter((mission) => isOpenWorkflowState(mission.workflowState))
        ),
      }
    }).sort((left, right) => right.activeRisk - left.activeRisk)
  }, [orderedMissions])

  const auditEvents = useMemo(() => {
    return orderedMissions
      .flatMap((mission) =>
        mission.timeline.map((event) => ({
          ...event,
          missionId: mission.id,
          missionTitle: mission.title,
        }))
      )
      .sort((left, right) => right.timestamp.localeCompare(left.timestamp))
  }, [orderedMissions])

  const attentionMission = breachedMissions[0] ?? openMissions[0] ?? null

  const applyMissionUpdate = (
    missionId: string,
    updater: (mission: ExposureMission) => ExposureMission
  ) => {
    startTransition(() => {
      setMissions((currentMissions) =>
        currentMissions.map((mission) =>
          mission.id === missionId ? updater(mission) : mission
        )
      )
    })
  }

  const handleOwnerChange = (
    missionId: string,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const nextOwner = event.target.value

    applyMissionUpdate(missionId, (mission) => {
      const previousOwner = getOwnerTeam(mission.ownerTeamId)?.name ?? "Unassigned"
      const ownerName = getOwnerTeam(nextOwner)?.name ?? "Unassigned"

      return {
        ...mission,
        ownerTeamId: nextOwner,
        timeline: appendTimelineEvent(mission.timeline, {
          actor: DEMO_OPERATOR,
          action: "Owner updated",
          details: `Routing changed from ${previousOwner} to ${ownerName}.`,
        }),
      }
    })
  }

  const handleWorkflowChange = (
    missionId: string,
    workflowState: WorkflowState,
    details: string
  ) => {
    applyMissionUpdate(missionId, (mission) => ({
      ...mission,
      workflowState,
      timeline: appendTimelineEvent(mission.timeline, {
        actor: DEMO_OPERATOR,
        action: WORKFLOW_LABELS[workflowState],
        details,
      }),
    }))
  }

  const handleResetDemo = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    const nextState = buildInitialState()

    startTransition(() => {
      setActiveTab(nextState.activeTab)
      setActiveFilter(nextState.activeFilter)
      setSearch(nextState.search)
      setSelectedMissionId(nextState.selectedMissionId)
      setMissions(nextState.missions)
    })
  }

  const openMission = (missionId: string) => {
    startTransition(() => {
      setActiveTab("missions")
      setSelectedMissionId(missionId)
    })
  }

  const openBreachedQueue = () => {
    startTransition(() => {
      setActiveTab("missions")
      setActiveFilter("breached")
      if (breachedMissions[0]) {
        setSelectedMissionId(breachedMissions[0].id)
      }
    })
  }

  return (
    <main className={styles.dashboard}>
      <div className={styles.utilityBar}>
        <div className={styles.utilityMeta}>
          <span className={`${styles.pill} ${styles.pillMuted}`}>Demo data only</span>
          <span className={styles.utilityCopy}>
            Simulated refresh cadence {DEMO_REFRESH}. All missions below are seeded demo data and do not represent live controls.
          </span>
        </div>
        <button className={styles.ghostButton} onClick={handleResetDemo} type="button">
          <RefreshCcw aria-hidden="true" />
          Reset demo state
        </button>
      </div>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Chokepoint / cloud exposure missions</p>
          <h1 className={styles.heroTitle}>
            Turn attack paths into owner-ready remediation missions.
          </h1>
          <p className={styles.heroBody}>
            A remediation cockpit for lean cloud security teams that already have
            findings, but still need a defensible answer to what gets fixed this sprint.
          </p>
          <div className={styles.heroTags}>
            <span className={`${styles.pill} ${styles.pillInk}`}>2 to 10 person security team fit</span>
            <span className={`${styles.pill} ${styles.pillWarning}`}>Attack-path prioritization</span>
            <span className={`${styles.pill} ${styles.pillAccent}`}>Owner handoff + SLA tracking</span>
          </div>
        </div>

        <div className={styles.heroAside}>
          <div className={styles.heroAsidePanel}>
            <p className={styles.panelLabel}>Today&apos;s pressure</p>
            <div className={styles.attentionValueRow}>
              <Siren aria-hidden="true" className={styles.attentionIcon} />
              <div>
                <p className={styles.attentionValue}>{breachedMissions.length}</p>
                <p className={styles.attentionCaption}>breached missions</p>
              </div>
            </div>
            <p className={styles.panelCopy}>
              {breachedMissions.length > 0
                ? `${attentionMission?.businessService ?? "Top service"} needs action first. Two clicks should move the right owner, not another spreadsheet.`
                : "No breached missions right now. The queue is active but within current SLA boundaries."}
            </p>
            <button
              className={styles.primaryButton}
              onClick={openBreachedQueue}
              type="button"
            >
              Open breached queue
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <nav className={styles.tabRail} aria-label="Chokepoint views">
        {(
          Object.entries(TAB_LABELS) as Array<[TabKey, string]>
        ).map(([tab, label]) => {
          const Icon = TAB_ICONS[tab]

          return (
            <button
              key={tab}
              type="button"
              className={`${styles.tabButton} ${
                activeTab === tab ? styles.tabButtonActive : ""
              }`}
              onClick={() => setActiveTab(tab)}
              aria-pressed={activeTab === tab}
            >
              <Icon aria-hidden="true" />
              {label}
            </button>
          )
        })}
      </nav>

      <div className={styles.shell}>
        {activeTab === "overview" ? (
          <OverviewTab
            attentionMission={attentionMission}
            breachedMissions={breachedMissions}
            burnDownDelta={burnDownDelta}
            burnDownSeries={burnDownSeries}
            chokepoints={chokepoints}
            entryPoints={entryPoints}
            onOpenMission={openMission}
            onOpenBreachedQueue={openBreachedQueue}
            openMissions={openMissions}
            openRisk={openRisk}
            ownerCoverage={ownerCoverage}
            workflowCounts={workflowCounts}
          />
        ) : null}

        {activeTab === "missions" ? (
          <MissionsTab
            activeFilter={activeFilter}
            filterOptions={FILTER_OPTIONS}
            missions={visibleMissions}
            onFilterChange={setActiveFilter}
            onOwnerChange={handleOwnerChange}
            onSearchChange={setSearch}
            onSelectMission={setSelectedMissionId}
            onWorkflowChange={handleWorkflowChange}
            ownerTeams={OWNER_TEAMS}
            search={search}
            selectedMission={selectedMission}
          />
        ) : null}

        {activeTab === "owners" ? (
          <OwnersTab
            ownerLoad={ownerLoad}
            onOpenMission={openMission}
            unresolvedMissions={openMissions.filter(
              (mission) => mission.ownerTeamId === "unassigned"
            )}
          />
        ) : null}

        {activeTab === "audit" ? (
          <AuditTab auditEvents={auditEvents} />
        ) : null}
      </div>
    </main>
  )
}

function OverviewTab({
  attentionMission,
  breachedMissions,
  burnDownDelta,
  burnDownSeries,
  chokepoints,
  entryPoints,
  onOpenMission,
  onOpenBreachedQueue,
  openMissions,
  openRisk,
  ownerCoverage,
  workflowCounts,
}: {
  attentionMission: ExposureMission | null
  breachedMissions: ExposureMission[]
  burnDownDelta: number
  burnDownSeries: number[]
  chokepoints: Array<{ label: string; count: number; risk: number }>
  entryPoints: Array<{ label: string; count: number }>
  onOpenMission: (missionId: string) => void
  onOpenBreachedQueue: () => void
  openMissions: ExposureMission[]
  openRisk: number
  ownerCoverage: number
  workflowCounts: Record<WorkflowState, number>
}) {
  const crownJewelCount = openMissions.filter(
    (mission) => mission.targetType === "data_store" || mission.severity === "critical"
  ).length
  const topMissions = openMissions.slice(0, 3)
  const totalWorkflowCount =
    workflowCounts.new +
    workflowCounts.notified +
    workflowCounts.in_progress +
    workflowCounts.resolved +
    workflowCounts.accepted

  return (
    <section className={styles.overviewSection}>
      <div className={styles.summaryGrid}>
        <SummaryCard
          icon={Gauge}
          label="Open risk"
          value={String(openRisk)}
          detail="Risk points still in active remediation flow."
        />
        <SummaryCard
          icon={ShieldAlert}
          label="Breached missions"
          value={String(breachedMissions.length)}
          detail="Past-due items that still reach crown-jewel targets."
        />
        <SummaryCard
          icon={Users}
          label="Owner coverage"
          value={`${ownerCoverage}%`}
          detail="Open missions already routed to a named team."
        />
        <SummaryCard
          icon={ShieldCheck}
          label="Crown-jewel paths"
          value={String(crownJewelCount)}
          detail="Active paths that terminate in sensitive data or critical control planes."
        />
      </div>

      <div className={styles.overviewGrid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelLabel}>Risk burn-down</p>
              <h2 className={styles.panelTitle}>Trend is moving down, but exposure still clusters around identity and build systems.</h2>
            </div>
            <span className={`${styles.pill} ${burnDownDelta <= 0 ? styles.pillSuccess : styles.pillDanger}`}>
              {burnDownDelta <= 0 ? `${Math.abs(burnDownDelta)} down` : `${burnDownDelta} up`}
            </span>
          </div>
          <Sparkline values={burnDownSeries} />
          <p className={styles.panelCopy}>
            Since the last simulated review, open risk moved{" "}
            <strong>{burnDownDelta <= 0 ? "down" : "up"}</strong> by{" "}
            <strong>{Math.abs(burnDownDelta)}</strong> points. The remaining
            concentration sits in public-to-identity and build-to-signing paths.
          </p>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelLabel}>Workflow mix</p>
              <h2 className={styles.panelTitle}>Queue health at a glance</h2>
            </div>
          </div>
          <div className={styles.segmentBar} aria-hidden="true">
            <div
              className={`${styles.segment} ${styles.segmentDanger}`}
              style={{ width: percentWidth(workflowCounts.new, totalWorkflowCount) }}
            />
            <div
              className={`${styles.segment} ${styles.segmentWarning}`}
              style={{
                width: percentWidth(workflowCounts.notified, totalWorkflowCount),
              }}
            />
            <div
              className={`${styles.segment} ${styles.segmentAccent}`}
              style={{
                width: percentWidth(workflowCounts.in_progress, totalWorkflowCount),
              }}
            />
            <div
              className={`${styles.segment} ${styles.segmentSuccess}`}
              style={{
                width: percentWidth(workflowCounts.resolved, totalWorkflowCount),
              }}
            />
            <div
              className={`${styles.segment} ${styles.segmentMuted}`}
              style={{
                width: percentWidth(workflowCounts.accepted, totalWorkflowCount),
              }}
            />
          </div>
          <ul className={styles.workflowLegend}>
            {(
              Object.entries(WORKFLOW_LABELS) as Array<[WorkflowState, string]>
            ).map(([state, label]) => (
              <li key={state} className={styles.workflowLegendItem}>
                <span className={`${styles.legendSwatch} ${STATE_CLASS_MAP[state]}`} />
                <span>{label}</span>
                <strong>{workflowCounts[state]}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelLabel}>Top choke points</p>
              <h2 className={styles.panelTitle}>One fix should collapse more than one path.</h2>
            </div>
          </div>
          <ul className={styles.rankList}>
            {chokepoints.slice(0, 4).map((item) => (
              <li key={item.label} className={styles.rankItem}>
                <div>
                  <p className={styles.rankLabel}>{item.label}</p>
                  <p className={styles.rankMeta}>
                    {item.count} mission{item.count === 1 ? "" : "s"} anchored here
                  </p>
                </div>
                <strong className={styles.rankValue}>{item.risk}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelLabel}>Top entry points</p>
              <h2 className={styles.panelTitle}>Where the next sprint should reduce initial footholds.</h2>
            </div>
          </div>
          <ul className={styles.rankList}>
            {entryPoints.slice(0, 4).map((item) => (
              <li key={item.label} className={styles.rankItem}>
                <div>
                  <p className={styles.rankLabel}>{item.label}</p>
                </div>
                <strong className={styles.rankValue}>{item.count}</strong>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className={styles.overviewGrid}>
        <section className={`${styles.panel} ${styles.panelWide}`}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelLabel}>Focus mission</p>
              <h2 className={styles.panelTitle}>
                {attentionMission?.title ?? "No active mission selected"}
              </h2>
            </div>
            {attentionMission ? (
              <button
                className={styles.ghostButton}
                onClick={() => onOpenMission(attentionMission.id)}
                type="button"
              >
                Open mission
                <ChevronRight aria-hidden="true" />
              </button>
            ) : null}
          </div>
          {attentionMission ? (
            <div className={styles.spotlightGrid}>
              <div>
                <div className={styles.metaRow}>
                  <span className={`${styles.pill} ${SEVERITY_CLASS_MAP[attentionMission.severity]}`}>
                    {attentionMission.severity}
                  </span>
                  <span className={`${styles.pill} ${STATE_CLASS_MAP[attentionMission.workflowState]}`}>
                    {WORKFLOW_LABELS[attentionMission.workflowState]}
                  </span>
                  <span className={`${styles.pill} ${getSlaState(attentionMission) === "breached" ? styles.pillDanger : styles.pillMuted}`}>
                    due {formatShortDate(attentionMission.dueDate)}
                  </span>
                </div>
                <p className={styles.panelCopy}>{attentionMission.summary}</p>
                <p className={styles.panelCopy}>
                  <strong>Choke point:</strong> {attentionMission.attackPath.chokePoint}
                </p>
              </div>
              <div className={styles.highlightPanel}>
                <p className={styles.highlightLabel}>Why it is first</p>
                <ul className={styles.highlightList}>
                  {attentionMission.scoreFactors.slice(0, 3).map((factor) => (
                    <li key={factor.label}>
                      <strong>{factor.label}</strong>
                      <span>{factor.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className={styles.panelCopy}>No active missions remain.</p>
          )}
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelLabel}>Next actions</p>
              <h2 className={styles.panelTitle}>Start with the few missions that actually move risk.</h2>
            </div>
          </div>
          <ul className={styles.previewList}>
            {topMissions.map((mission) => (
              <li key={mission.id} className={styles.previewItem}>
                <div>
                  <p className={styles.previewTitle}>{mission.id}</p>
                  <p className={styles.previewBody}>{mission.title}</p>
                </div>
                <button
                  className={styles.inlineButton}
                  onClick={() => onOpenMission(mission.id)}
                  type="button"
                >
                  Open
                </button>
              </li>
            ))}
          </ul>
          <button
            className={styles.secondaryButton}
            onClick={onOpenBreachedQueue}
            type="button"
          >
            Prioritize breached items
          </button>
        </section>
      </div>
    </section>
  )
}

function MissionsTab({
  activeFilter,
  filterOptions,
  missions,
  onFilterChange,
  onOwnerChange,
  onSearchChange,
  onSelectMission,
  onWorkflowChange,
  ownerTeams,
  search,
  selectedMission,
}: {
  activeFilter: FilterKey
  filterOptions: Array<{ id: FilterKey; label: string }>
  missions: ExposureMission[]
  onFilterChange: (filter: FilterKey) => void
  onOwnerChange: (
    missionId: string,
    event: ChangeEvent<HTMLSelectElement>
  ) => void
  onSearchChange: (value: string) => void
  onSelectMission: (missionId: string) => void
  onWorkflowChange: (
    missionId: string,
    workflowState: WorkflowState,
    details: string
  ) => void
  ownerTeams: OwnerTeam[]
  search: string
  selectedMission: ExposureMission | null
}) {
  const selectedMissionVisible = missions.some(
    (mission) => mission.id === selectedMission?.id
  )

  return (
    <section className={styles.missionWorkspace}>
      <div className={styles.queuePanel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelLabel}>Mission queue</p>
            <h2 className={styles.panelTitle}>Collapse noisy findings into fixable work.</h2>
          </div>
          <span className={`${styles.pill} ${styles.pillInk}`}>{missions.length} visible</span>
        </div>

        <div className={styles.searchBar}>
          <Search aria-hidden="true" className={styles.searchIcon} />
          <input
            aria-label="Search missions"
            className={styles.searchInput}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search mission, service, owner, or choke point"
            type="search"
            value={search}
          />
        </div>

        <div className={styles.filterRail} role="toolbar" aria-label="Mission filters">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`${styles.filterButton} ${
                activeFilter === option.id ? styles.filterButtonActive : ""
              }`}
              onClick={() => onFilterChange(option.id)}
              aria-pressed={activeFilter === option.id}
            >
              {option.label}
            </button>
          ))}
        </div>

        {missions.length === 0 ? (
          <EmptyQueueState />
        ) : (
          <>
            <div className={styles.tableWrap}>
              <table className={styles.missionTable}>
                <caption className={styles.srOnly}>
                  Ranked mission queue for exposure remediation.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Mission</th>
                    <th scope="col">Score</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Due</th>
                    <th scope="col">State</th>
                    <th scope="col">Target</th>
                  </tr>
                </thead>
                <tbody>
                  {missions.map((mission) => (
                    <tr
                      key={mission.id}
                      className={
                        mission.id === selectedMission?.id ? styles.tableRowSelected : ""
                      }
                    >
                      <td>
                        <button
                          className={styles.rowButton}
                          onClick={() => onSelectMission(mission.id)}
                          type="button"
                        >
                          <span className={styles.rowButtonHeader}>
                            <span className={styles.rowMissionId}>{mission.id}</span>
                            <span
                              className={`${styles.pill} ${SEVERITY_CLASS_MAP[mission.severity]}`}
                            >
                              {mission.severity}
                            </span>
                          </span>
                          <span className={styles.rowMissionTitle}>{mission.title}</span>
                          <span className={styles.rowMissionMeta}>
                            {mission.findingCount} findings / {mission.attackPath.chokePoint}
                          </span>
                        </button>
                      </td>
                      <td className={styles.numericCell}>{mission.riskScore}</td>
                      <td>
                        {getOwnerTeam(mission.ownerTeamId)?.name ?? "Unassigned"}
                      </td>
                      <td>{formatShortDate(mission.dueDate)}</td>
                      <td>
                        <span
                          className={`${styles.pill} ${STATE_CLASS_MAP[mission.workflowState]}`}
                        >
                          {WORKFLOW_LABELS[mission.workflowState]}
                        </span>
                      </td>
                      <td>{mission.crownJewel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className={styles.mobileMissionList}>
              {missions.map((mission) => (
                <li key={mission.id}>
                  <button
                    className={`${styles.mobileMissionCard} ${
                      mission.id === selectedMission?.id ? styles.mobileMissionCardActive : ""
                    }`}
                    onClick={() => onSelectMission(mission.id)}
                    type="button"
                  >
                    <div className={styles.mobileMissionHeader}>
                      <span className={styles.rowMissionId}>{mission.id}</span>
                      <span className={styles.mobileMissionScore}>{mission.riskScore}</span>
                    </div>
                    <p className={styles.mobileMissionTitle}>{mission.title}</p>
                    <div className={styles.mobileMissionMeta}>
                      <span>{getOwnerTeam(mission.ownerTeamId)?.name ?? "Unassigned"}</span>
                      <span>{formatShortDate(mission.dueDate)}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className={styles.detailPanel}>
        {selectedMission && selectedMissionVisible ? (
          <MissionDetail
            mission={selectedMission}
            onOwnerChange={onOwnerChange}
            onWorkflowChange={onWorkflowChange}
            ownerTeams={ownerTeams}
          />
        ) : (
          <div className={styles.emptyDetail}>
            <TriangleAlert aria-hidden="true" />
            <h3>No mission in this view</h3>
            <p>
              The current filter is clear. That is a valid operational state, not a product error.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function OwnersTab({
  ownerLoad,
  onOpenMission,
  unresolvedMissions,
}: {
  ownerLoad: Array<
    OwnerTeam & {
      activeCount: number
      breachedCount: number
      resolvedCount: number
      activeRisk: number
    }
  >
  onOpenMission: (missionId: string) => void
  unresolvedMissions: ExposureMission[]
}) {
  return (
    <section className={styles.overviewSection}>
      <div className={styles.ownerGrid}>
        {ownerLoad.map((team) => (
          <article key={team.id} className={styles.ownerCard}>
            <div className={styles.ownerCardHeader}>
              <div>
                <p className={styles.panelLabel}>{team.name}</p>
                <h2 className={styles.ownerCardTitle}>{team.domain}</h2>
              </div>
              <span
                className={`${styles.pill} ${
                  team.id === "unassigned" ? styles.pillDanger : styles.pillInk
                }`}
              >
                {team.coverageConfidence}% confidence
              </span>
            </div>
            <div className={styles.ownerMetrics}>
              <div>
                <span>Active</span>
                <strong>{team.activeCount}</strong>
              </div>
              <div>
                <span>Breached</span>
                <strong>{team.breachedCount}</strong>
              </div>
              <div>
                <span>Resolved</span>
                <strong>{team.resolvedCount}</strong>
              </div>
              <div>
                <span>Risk</span>
                <strong>{team.activeRisk}</strong>
              </div>
            </div>
            <p className={styles.panelCopy}>
              Lead: <strong>{team.lead}</strong>. Default SLA:{" "}
              <strong>{team.defaultSlaDays} days</strong>.
            </p>
          </article>
        ))}
      </div>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelLabel}>Needs routing</p>
            <h2 className={styles.panelTitle}>
              Owner ambiguity is still a product problem, not only a data problem.
            </h2>
          </div>
        </div>
        {unresolvedMissions.length > 0 ? (
          <ul className={styles.previewList}>
            {unresolvedMissions.map((mission) => (
              <li key={mission.id} className={styles.previewItem}>
                <div>
                  <p className={styles.previewTitle}>{mission.id}</p>
                  <p className={styles.previewBody}>{mission.title}</p>
                </div>
                <button
                  className={styles.inlineButton}
                  onClick={() => onOpenMission(mission.id)}
                  type="button"
                >
                  Route
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.panelCopy}>All open missions have a routed owner.</p>
        )}
      </section>
    </section>
  )
}

function AuditTab({
  auditEvents,
}: {
  auditEvents: Array<{
    id: string
    timestamp: string
    actor: string
    action: string
    details: string
    missionId: string
    missionTitle: string
  }>
}) {
  return (
    <section className={styles.auditSection}>
      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelLabel}>Audit trail</p>
            <h2 className={styles.panelTitle}>
              Trust comes from visible evidence, reversible state, and preserved history.
            </h2>
          </div>
        </div>
        <ol className={styles.auditList}>
          {auditEvents.map((event) => (
            <li key={event.id} className={styles.auditItem}>
              <div className={styles.auditMarker} />
              <div className={styles.auditBody}>
                <div className={styles.auditHeader}>
                  <span className={styles.auditMission}>{event.missionId}</span>
                  <span className={styles.auditTime}>{formatDateTime(event.timestamp)}</span>
                </div>
                <p className={styles.auditAction}>
                  <strong>{event.action}</strong> by {event.actor}
                </p>
                <p className={styles.auditDetails}>{event.details}</p>
                <p className={styles.auditTitle}>{event.missionTitle}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </section>
  )
}

function MissionDetail({
  mission,
  onOwnerChange,
  onWorkflowChange,
  ownerTeams,
}: {
  mission: ExposureMission
  onOwnerChange: (
    missionId: string,
    event: ChangeEvent<HTMLSelectElement>
  ) => void
  onWorkflowChange: (
    missionId: string,
    workflowState: WorkflowState,
    details: string
  ) => void
  ownerTeams: OwnerTeam[]
}) {
  const ownerTeam = getOwnerTeam(mission.ownerTeamId)
  const isOwnerMissing = mission.ownerTeamId === "unassigned"
  const slaState = getSlaState(mission)

  return (
    <article className={styles.detailCard}>
      <header className={styles.detailHeader}>
        <div>
          <div className={styles.metaRow}>
            <span className={styles.detailMissionId}>{mission.id}</span>
            <span className={`${styles.pill} ${SEVERITY_CLASS_MAP[mission.severity]}`}>
              {mission.severity}
            </span>
            <span className={`${styles.pill} ${STATE_CLASS_MAP[mission.workflowState]}`}>
              {WORKFLOW_LABELS[mission.workflowState]}
            </span>
            <span
              className={`${styles.pill} ${
                slaState === "breached"
                  ? styles.pillDanger
                  : slaState === "due_today"
                    ? styles.pillWarning
                    : styles.pillMuted
              }`}
            >
              due {formatShortDate(mission.dueDate)}
            </span>
          </div>
          <h3 className={styles.detailTitle}>{mission.title}</h3>
          <p className={styles.detailSummary}>{mission.summary}</p>
        </div>
        <div className={styles.detailRiskBlock}>
          <span className={styles.detailRiskLabel}>Risk score</span>
          <strong className={styles.detailRiskValue}>{mission.riskScore}</strong>
        </div>
      </header>

      <div className={styles.detailMetaGrid}>
        <DetailMetric label="Business service" value={mission.businessService} />
        <DetailMetric label="Crown jewel" value={mission.crownJewel} />
        <DetailMetric
          label="Owner"
          value={ownerTeam?.name ?? "Unassigned"}
          warning={isOwnerMissing}
        />
        <DetailMetric
          label="Validated"
          value={formatDateTime(mission.lastValidatedAt)}
        />
      </div>

      <section className={styles.detailSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.panelLabel}>Attack path</p>
          <span className={`${styles.pill} ${styles.pillInk}`}>
            {mission.attackPath.entryPoint}
          </span>
        </div>
        <div className={styles.pathStrip}>
          {mission.attackPath.nodes.map((node, index) => (
            <div key={node.id} className={styles.pathStep}>
              <div className={`${styles.pathNode} ${NODE_CLASS_MAP[node.kind]}`}>
                <span className={styles.pathNodeLabel}>{node.label}</span>
                <span className={styles.pathNodeDetail}>{node.detail}</span>
              </div>
              {index < mission.attackPath.nodes.length - 1 ? (
                <ChevronRight className={styles.pathArrow} aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>
        <p className={styles.panelCopy}>{mission.attackPath.simulationLabel}</p>
      </section>

      <section className={styles.detailSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.panelLabel}>Why it is prioritized</p>
          <span className={`${styles.pill} ${styles.pillMuted}`}>
            {mission.findingCount} findings collapsed
          </span>
        </div>
        <ul className={styles.factorList}>
          {mission.scoreFactors.map((factor) => (
            <li key={factor.label} className={styles.factorItem}>
              <div className={styles.factorHeader}>
                <span>{factor.label}</span>
                <strong>{factor.score}</strong>
              </div>
              <div className={styles.factorBar}>
                <div
                  className={styles.factorFill}
                  style={{ width: `${factor.score}%` }}
                />
              </div>
              <p className={styles.factorDescription}>{factor.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.detailSplit}>
        <div className={styles.detailSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.panelLabel}>Evidence signals</p>
          </div>
          <ul className={styles.evidenceList}>
            {mission.evidence.map((signal) => (
              <li key={signal.label} className={styles.evidenceItem}>
                <span>{signal.label}</span>
                <strong>{signal.impactLabel}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.detailSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.panelLabel}>Compensating controls</p>
          </div>
          <ul className={styles.controlList}>
            {mission.controls.map((control) => (
              <li key={control.id} className={styles.controlItem}>
                <div className={styles.controlHeader}>
                  <span>{control.label}</span>
                  <span
                    className={`${styles.pill} ${
                      control.status === "strong"
                        ? styles.pillSuccess
                        : control.status === "partial"
                          ? styles.pillWarning
                          : styles.pillDanger
                    }`}
                  >
                    {control.status}
                  </span>
                </div>
                <p className={styles.factorDescription}>{control.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.detailSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.panelLabel}>Recommended fix bundle</p>
          <span className={`${styles.pill} ${styles.pillAccent}`}>
            {mission.remediationSteps.length} steps
          </span>
        </div>
        <ol className={styles.stepList}>
          {mission.remediationSteps.map((step) => (
            <li key={step.id} className={styles.stepItem}>
              <div>
                <p className={styles.stepTitle}>{step.title}</p>
                <p className={styles.stepMeta}>Best owner: {step.ownerHint}</p>
              </div>
              <strong className={styles.stepReduction}>{step.reduction}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.detailSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.panelLabel}>Owner routing</p>
          {isOwnerMissing ? (
            <span className={`${styles.pill} ${styles.pillDanger}`}>map owner first</span>
          ) : null}
        </div>
        <label className={styles.selectLabel}>
          <span>Primary owner</span>
          <select
            className={styles.ownerSelect}
            onChange={(event) => onOwnerChange(mission.id, event)}
            value={mission.ownerTeamId}
          >
            {ownerTeams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className={styles.detailSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.panelLabel}>Workflow actions</p>
        </div>
        <div className={styles.actionRow}>
          {mission.workflowState === "resolved" || mission.workflowState === "accepted" ? (
            <button
              className={styles.secondaryButton}
              onClick={() =>
                onWorkflowChange(
                  mission.id,
                  "new",
                  "Reopened for review after operator request."
                )
              }
              type="button"
            >
              Reopen mission
            </button>
          ) : (
            <>
              <button
                className={styles.secondaryButton}
                disabled={isOwnerMissing}
                onClick={() =>
                  onWorkflowChange(
                    mission.id,
                    "notified",
                    `Owner ${getOwnerTeam(mission.ownerTeamId)?.name ?? "route pending"} notified with the current fix bundle.`
                  )
                }
                type="button"
              >
                Notify owner
              </button>
              <button
                className={styles.secondaryButton}
                disabled={isOwnerMissing}
                onClick={() =>
                  onWorkflowChange(
                    mission.id,
                    "in_progress",
                    `Work moved into active remediation under ${getOwnerTeam(mission.ownerTeamId)?.name ?? "route pending"}.`
                  )
                }
                type="button"
              >
                Start fix
              </button>
              <button
                className={styles.primaryButton}
                onClick={() =>
                  onWorkflowChange(
                    mission.id,
                    "resolved",
                    "Operator marked the mission resolved pending the next validation cycle."
                  )
                }
                type="button"
              >
                Resolve
              </button>
              <button
                className={styles.ghostButton}
                onClick={() =>
                  onWorkflowChange(
                    mission.id,
                    "accepted",
                    "Accepted as a documented exception with explicit review trail."
                  )
                }
                type="button"
              >
                Accept exception
              </button>
            </>
          )}
        </div>
      </section>

      <section className={styles.detailSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.panelLabel}>Source systems</p>
        </div>
        <div className={styles.sourceRow}>
          {mission.sourceSystems.map((source) => (
            <span key={source} className={`${styles.pill} ${styles.pillMuted}`}>
              {source}
            </span>
          ))}
        </div>
      </section>
    </article>
  )
}

function SummaryCard({
  detail,
  icon: Icon,
  label,
  value,
}: {
  detail: string
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <article className={styles.summaryCard}>
      <div className={styles.summaryIcon}>
        <Icon aria-hidden="true" />
      </div>
      <p className={styles.summaryLabel}>{label}</p>
      <strong className={styles.summaryValue}>{value}</strong>
      <p className={styles.summaryDetail}>{detail}</p>
    </article>
  )
}

function DetailMetric({
  label,
  value,
  warning = false,
}: {
  label: string
  value: string
  warning?: boolean
}) {
  return (
    <div className={`${styles.detailMetric} ${warning ? styles.detailMetricWarning : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100
      const y = max === min ? 20 : 36 - ((value - min) / (max - min)) * 30
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg
      aria-hidden="true"
      className={styles.sparkline}
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
    >
      <polyline
        fill="none"
        points={points}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.6"
      />
    </svg>
  )
}

function EmptyQueueState() {
  return (
    <div className={styles.emptyState}>
      <CheckCircle2 aria-hidden="true" />
      <h3>Nothing matches this filter</h3>
      <p>
        This queue is clear for the current view. Try another state filter to inspect
        active or historical work.
      </p>
    </div>
  )
}

function appendTimelineEvent(
  currentTimeline: ExposureMission["timeline"],
  nextEvent: {
    actor: string
    action: string
    details: string
  }
) {
  return [
    ...currentTimeline,
    {
      id: `evt-${Math.random().toString(36).slice(2, 10)}`,
      timestamp: new Date().toISOString(),
      actor: nextEvent.actor,
      action: nextEvent.action,
      details: nextEvent.details,
    },
  ]
}

function percentWidth(value: number, total: number) {
  const normalized = total === 0 ? 0 : (value / total) * 100
  return `${Math.max(normalized, value > 0 ? 6 : 0)}%`
}

function sumRisk(missions: ExposureMission[]) {
  return missions.reduce((total, mission) => total + mission.riskScore, 0)
}

function formatShortDate(input: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${input}T12:00:00Z`))
}

function formatDateTime(input: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(input))
}
