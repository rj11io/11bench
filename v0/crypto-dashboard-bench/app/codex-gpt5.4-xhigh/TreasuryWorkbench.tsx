"use client"

import {
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useState,
  useTransition,
} from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  AlertTriangle,
  ArrowRightLeft,
  Building2,
  Check,
  ChevronRight,
  Clock3,
  DatabaseZap,
  Eye,
  Filter,
  Gauge,
  Landmark,
  ShieldAlert,
  ShieldCheck,
  Wallet,
} from "lucide-react"

import styles from "./dashboard.module.css"
import type {
  ActionPlan,
  DemoWorkspace,
  LensKey,
  PolicyStatus,
  Position,
  ScenarioKey,
  SegmentKey,
  Severity,
  WorkspaceMode,
} from "./types"

const scenarioOptions: Array<{ key: ScenarioKey; label: string }> = [
  { key: "steady", label: "Steady" },
  { key: "liquidityShock", label: "Liquidity Shock" },
  { key: "usdcStress", label: "USDC Stress" },
]

const lensOptions: Array<{ key: LensKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "breaches", label: "Only breaches" },
  { key: "stablecoins", label: "Stablecoins" },
  { key: "protocols", label: "Protocols" },
]

const segmentOptions: Array<{ key: SegmentKey; label: string }> = [
  { key: "issuer", label: "Issuer" },
  { key: "chain", label: "Chain" },
  { key: "venue", label: "Venue" },
  { key: "wallet", label: "Wallet" },
]

const storageKey = "helm-treasury-demo:v1"

const compactUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
})

const exactUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const percent = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
})

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

function severityRank(severity: Severity) {
  switch (severity) {
    case "critical":
      return 4
    case "high":
      return 3
    case "medium":
      return 2
    default:
      return 1
  }
}

function formatChange(value: number) {
  const sign = value > 0 ? "+" : ""
  return `${sign}${percent.format(value)}%`
}

function formatMonths(value: number) {
  return `${percent.format(value)} mo`
}

function readSegmentLabel(position: Position, segment: SegmentKey) {
  switch (segment) {
    case "issuer":
      return position.issuer
    case "chain":
      return position.chain
    case "venue":
      return position.venue
    case "wallet":
      return position.wallet
  }
}

function matchesLens(position: Position, lens: LensKey) {
  if (lens === "all") {
    return true
  }

  if (lens === "breaches") {
    return (
      position.riskLevel === "high" ||
      position.riskLevel === "critical" ||
      position.tags.includes("breach")
    )
  }

  if (lens === "stablecoins") {
    return position.asset !== "ETH"
  }

  return position.kind === "vault" || position.kind === "lending" || position.kind === "collateral"
}

function matchesSearch(position: Position, query: string) {
  if (!query.trim()) {
    return true
  }

  const text = [
    position.asset,
    position.issuer,
    position.chain,
    position.venue,
    position.wallet,
    position.notes,
  ]
    .join(" ")
    .toLowerCase()

  return text.includes(query.trim().toLowerCase())
}

function groupedPositions(positions: Position[], segment: SegmentKey) {
  const groups = new Map<
    string,
    { label: string; valueUsd: number; count: number; severity: Severity }
  >()

  for (const position of positions) {
    const label = readSegmentLabel(position, segment)
    const current = groups.get(label)

    if (!current) {
      groups.set(label, {
        label,
        valueUsd: position.valueUsd,
        count: 1,
        severity: position.riskLevel,
      })
      continue
    }

    groups.set(label, {
      label,
      valueUsd: current.valueUsd + position.valueUsd,
      count: current.count + 1,
      severity:
        severityRank(position.riskLevel) > severityRank(current.severity)
          ? position.riskLevel
          : current.severity,
    })
  }

  return Array.from(groups.values()).sort((left, right) => right.valueUsd - left.valueUsd)
}

function statusClass(status: PolicyStatus) {
  switch (status) {
    case "pass":
      return styles.statusPass
    case "warn":
      return styles.statusWarn
    case "breach":
      return styles.statusBreach
  }
}

function severityClass(severity: Severity) {
  switch (severity) {
    case "critical":
      return styles.severityCritical
    case "high":
      return styles.severityHigh
    case "medium":
      return styles.severityMedium
    default:
      return styles.severityLow
  }
}

function filterActions(actions: ActionPlan[], lens: LensKey, query: string) {
  return actions.filter((action) => {
    const lensMatch =
      lens === "all" ||
      action.tags.includes(lens) ||
      (lens === "breaches" &&
        (action.severity === "high" || action.severity === "critical"))

    if (!lensMatch) {
      return false
    }

    if (!query.trim()) {
      return true
    }

    const haystack = [
      action.title,
      action.summary,
      action.owner,
      action.impact,
      action.delivery,
    ]
      .join(" ")
      .toLowerCase()

    return haystack.includes(query.trim().toLowerCase())
  })
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number; name: string; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipLabel}>{label}</div>
      {payload.map((item) => (
        <div className={styles.tooltipRow} key={item.name}>
          <span
            className={styles.tooltipDot}
            style={{ backgroundColor: item.color }}
          />
          <span>{item.name}</span>
          <strong>{formatMonths(item.value)}</strong>
        </div>
      ))}
    </div>
  )
}

export default function TreasuryWorkbench({
  workspace,
}: {
  workspace: DemoWorkspace
}) {
  const [scenario, setScenario] = useState<ScenarioKey>("steady")
  const [lens, setLens] = useState<LensKey>("all")
  const [segment, setSegment] = useState<SegmentKey>("issuer")
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>("liveDemo")
  const [queuedActions, setQueuedActions] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("")
  const [hasHydrated, setHasHydrated] = useState(false)
  const [isPending, startTransition] = useTransition()
  const deferredSearch = useDeferredValue(search)

  const snapshot = workspace.scenarios[scenario]

  useEffect(() => {
    let cancelled = false

    const frame = window.requestAnimationFrame(() => {
      if (cancelled) {
        return
      }

      try {
        const stored = window.localStorage.getItem(storageKey)

        if (!stored) {
          setHasHydrated(true)
          return
        }

        const parsed = JSON.parse(stored) as {
          scenario?: ScenarioKey
          lens?: LensKey
          segment?: SegmentKey
          workspaceMode?: WorkspaceMode
          queuedActions?: string[]
        }

        if (parsed.scenario && parsed.scenario in workspace.scenarios) {
          setScenario(parsed.scenario)
        }

        if (parsed.lens) {
          setLens(parsed.lens)
        }

        if (parsed.segment) {
          setSegment(parsed.segment)
        }

        if (parsed.workspaceMode) {
          setWorkspaceMode(parsed.workspaceMode)
        }

        if (Array.isArray(parsed.queuedActions)) {
          setQueuedActions(parsed.queuedActions)
        }
      } catch {
        // Ignore invalid persisted demo state.
      } finally {
        setHasHydrated(true)
      }
    })

    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
    }
  }, [workspace.scenarios])

  const persistState = useEffectEvent(
    (next: {
      scenario: ScenarioKey
      lens: LensKey
      segment: SegmentKey
      workspaceMode: WorkspaceMode
      queuedActions: string[]
    }) => {
      window.localStorage.setItem(storageKey, JSON.stringify(next))
    }
  )

  useEffect(() => {
    if (!hasHydrated) {
      return
    }

    persistState({
      scenario,
      lens,
      segment,
      workspaceMode,
      queuedActions,
    })
  }, [
    hasHydrated,
    lens,
    queuedActions,
    scenario,
    segment,
    workspaceMode,
  ])

  const visiblePositions =
    workspaceMode === "empty"
      ? []
      : snapshot.positions.filter(
          (position) =>
            matchesLens(position, lens) && matchesSearch(position, deferredSearch)
        )

  const groups = groupedPositions(visiblePositions, segment)

  const activeGroup = groups.find((group) => group.label === selectedGroup) ?? groups[0]
  const detailPositions = activeGroup
    ? visiblePositions.filter(
        (position) => readSegmentLabel(position, segment) === activeGroup.label
      )
    : []

  const visibleActions =
    workspaceMode === "empty"
      ? []
      : filterActions(snapshot.actions, lens, deferredSearch)

  const queuedActionDetails = snapshot.actions.filter((action) =>
    queuedActions.includes(action.id)
  )

  const queuedT0Delta = queuedActionDetails.reduce(
    (total, action) => total + action.deltaT0Usd,
    0
  )
  const queuedIssuerDelta = queuedActionDetails.reduce(
    (total, action) => total + action.deltaIssuerPct,
    0
  )
  const queuedBreachesCleared = queuedActionDetails.reduce(
    (total, action) => total + action.breachesResolved,
    0
  )

  const projectedImmediateRunway =
    snapshot.metrics.immediateRunwayMonths +
    queuedT0Delta / snapshot.metrics.monthlyBurnUsd

  const scenarioTone =
    scenario === "steady"
      ? styles.toneCalm
      : scenario === "liquidityShock"
        ? styles.toneWarning
        : styles.toneCritical

  return (
    <main className={styles.shell}>
      <div className={styles.frame}>
        <section className={cx(styles.hero, scenarioTone)}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.heroEyebrow}>
                <span className={styles.productBadge}>Helm Treasury</span>
                <span className={styles.disclosureBadge}>Seeded demo workspace</span>
                {isPending ? <span className={styles.pendingBadge}>Recomputing stress case</span> : null}
              </div>

              <h1 className={styles.heroTitle}>
                Treasury control before the first signer approves.
              </h1>

              <p className={styles.heroText}>
                Scenario-aware liquidity, concentration, and policy monitoring for
                stablecoin-heavy on-chain finance teams.
              </p>

              <div className={styles.heroMeta}>
                <div className={styles.metaCard}>
                  <Building2 size={16} />
                  <span>{workspace.entity}</span>
                </div>
                <div className={styles.metaCard}>
                  <Wallet size={16} />
                  <span>{snapshot.metrics.wallets} monitored wallets</span>
                </div>
                <div className={styles.metaCard}>
                  <ShieldCheck size={16} />
                  <span>{workspace.signers} signers in policy template</span>
                </div>
                <div className={styles.metaCard}>
                  <Clock3 size={16} />
                  <span>{snapshot.asOf}</span>
                </div>
              </div>

              <p className={styles.bannerText}>{snapshot.banner}</p>
            </div>

            <aside className={styles.heroAside}>
              <div className={styles.asideCard}>
                <div className={styles.asideLabel}>Stress narrative</div>
                <p className={styles.asideText}>{snapshot.incident}</p>
              </div>

              <div className={styles.asideCard}>
                <div className={styles.asideLabel}>Next 7 days</div>
                <ul className={styles.inlineList}>
                  {workspace.upcoming.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>Scenario</div>
              <div className={styles.chips}>
                {scenarioOptions.map((option) => (
                  <button
                    className={cx(
                      styles.chip,
                      scenario === option.key && styles.chipActive
                    )}
                    key={option.key}
                    onClick={() => {
                      startTransition(() => {
                        setScenario(option.key)
                      })
                    }}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>Lens</div>
              <div className={styles.chips}>
                {lensOptions.map((option) => (
                  <button
                    className={cx(
                      styles.chip,
                      lens === option.key && styles.chipActive
                    )}
                    key={option.key}
                    onClick={() => {
                      startTransition(() => {
                        setLens(option.key)
                      })
                    }}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>Workspace</div>
              <div className={styles.chips}>
                <button
                  className={cx(
                    styles.chip,
                    workspaceMode === "liveDemo" && styles.chipActive
                  )}
                  onClick={() => {
                    startTransition(() => {
                      setWorkspaceMode("liveDemo")
                    })
                  }}
                  type="button"
                >
                  Seeded workspace
                </button>
                <button
                  className={cx(
                    styles.chip,
                    workspaceMode === "empty" && styles.chipActive
                  )}
                  onClick={() => {
                    startTransition(() => {
                      setWorkspaceMode("empty")
                    })
                  }}
                  type="button"
                >
                  Empty state
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.statsGrid}>
          <article className={styles.statCard}>
            <div className={styles.statLabel}>
              <Landmark size={16} />
              Treasury value
            </div>
            <div className={styles.statValue}>{compactUsd.format(snapshot.metrics.treasuryUsd)}</div>
            <div className={styles.statHint}>{formatChange(snapshot.metrics.netChange24hPct)} vs prior day seed</div>
          </article>

          <article className={styles.statCard}>
            <div className={styles.statLabel}>
              <ArrowRightLeft size={16} />
              T+0 liquidity
            </div>
            <div className={styles.statValue}>{compactUsd.format(snapshot.metrics.t0Usd)}</div>
            <div className={styles.statHint}>{formatMonths(snapshot.metrics.immediateRunwayMonths)} of immediate runway</div>
          </article>

          <article className={styles.statCard}>
            <div className={styles.statLabel}>
              <Gauge size={16} />
              Total runway
            </div>
            <div className={styles.statValue}>{formatMonths(snapshot.metrics.totalRunwayMonths)}</div>
            <div className={styles.statHint}>{exactUsd.format(snapshot.metrics.monthlyBurnUsd)} monthly burn</div>
          </article>

          <article className={styles.statCard}>
            <div className={styles.statLabel}>
              <ShieldAlert size={16} />
              Policy breaches
            </div>
            <div className={styles.statValue}>{snapshot.metrics.policyBreaches}</div>
            <div className={styles.statHint}>{compactUsd.format(snapshot.metrics.atRiskUsd)} tied to elevated-risk positions</div>
          </article>

          <article className={styles.statCard}>
            <div className={styles.statLabel}>
              <DatabaseZap size={16} />
              Data coverage
            </div>
            <div className={styles.statValue}>{percent.format(snapshot.metrics.coveragePct)}%</div>
            <div className={styles.statHint}>{snapshot.syncedAt}</div>
          </article>
        </section>

        {workspaceMode === "empty" ? (
          <section className={styles.emptyState}>
            <div className={styles.emptyCopy}>
              <div className={styles.emptyEyebrow}>Empty workspace</div>
              <h2 className={styles.sectionTitle}>Helm needs context before it can judge treasury risk.</h2>
              <p className={styles.sectionText}>
                This state represents a brand-new treasury workspace. Nothing is
                broken. There simply are no wallets, policy thresholds, or
                obligations yet.
              </p>
              <ul className={styles.inlineList}>
                {workspace.onboarding.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button
                className={styles.primaryButton}
                onClick={() => {
                  startTransition(() => {
                    setWorkspaceMode("liveDemo")
                  })
                }}
                type="button"
              >
                Load seeded workspace
              </button>
            </div>

            <div className={styles.emptyChecklist}>
              <div className={styles.sectionSubhead}>What Helm would generate next</div>
              <div className={styles.checkItem}>
                <Check size={16} />
                A first-pass liquidity ladder once the primary Safe is imported
              </div>
              <div className={styles.checkItem}>
                <Check size={16} />
                A default policy pack for stable reserve continuity
              </div>
              <div className={styles.checkItem}>
                <Check size={16} />
                A signer-ready action queue after the first breach is detected
              </div>
            </div>
          </section>
        ) : (
          <section className={styles.mainGrid}>
            <div className={styles.primaryColumn}>
              <article className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <div className={styles.sectionEyebrow}>Control tower</div>
                    <h2 className={styles.sectionTitle}>Runway versus policy floor</h2>
                  </div>
                  <div className={styles.panelNote}>
                    T+0 runway is separated from total runway so reserve quality is visible.
                  </div>
                </div>

                <div className={styles.chartWrap}>
                  {hasHydrated ? (
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                      minHeight={320}
                      minWidth={280}
                    >
                      <AreaChart data={snapshot.trend}>
                        <defs>
                          <linearGradient id="runwayFill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#f6b55a" stopOpacity={0.48} />
                            <stop offset="100%" stopColor="#f6b55a" stopOpacity={0.02} />
                          </linearGradient>
                          <linearGradient id="immediateFill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#7fd1bc" stopOpacity={0.32} />
                            <stop offset="100%" stopColor="#7fd1bc" stopOpacity={0.02} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          stroke="rgba(227, 221, 212, 0.12)"
                          vertical={false}
                        />
                        <XAxis
                          axisLine={false}
                          dataKey="label"
                          tick={{ fill: "#b8c4bf", fontSize: 12 }}
                          tickLine={false}
                        />
                        <YAxis
                          axisLine={false}
                          domain={[0, 18]}
                          tick={{ fill: "#b8c4bf", fontSize: 12 }}
                          tickFormatter={(value) => `${value}m`}
                          tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          dataKey="totalRunway"
                          fill="url(#runwayFill)"
                          name="Total runway"
                          stroke="#f6b55a"
                          strokeWidth={2.5}
                          type="monotone"
                        />
                        <Area
                          dataKey="immediateRunway"
                          fill="url(#immediateFill)"
                          name="Immediate runway"
                          stroke="#7fd1bc"
                          strokeWidth={2.2}
                          type="monotone"
                        />
                        <Area
                          dataKey="policyFloor"
                          fill="transparent"
                          name="Policy floor"
                          stroke="#ff8b6b"
                          strokeDasharray="6 6"
                          strokeWidth={2}
                          type="monotone"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className={styles.chartFallback}>
                      <div className={styles.chartFallbackBar} />
                      <div className={styles.chartFallbackBarShort} />
                      <div className={styles.chartFallbackCaption}>
                        Runway trend activates after hydration so the static build
                        does not rely on viewport measurement.
                      </div>
                    </div>
                  )}
                </div>
              </article>

              <article className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <div className={styles.sectionEyebrow}>Explorer</div>
                    <h2 className={styles.sectionTitle}>Risk grouped by {segment}</h2>
                  </div>
                  <div className={styles.explorerTools}>
                    <div className={styles.chips}>
                      {segmentOptions.map((option) => (
                        <button
                          className={cx(
                            styles.chip,
                            segment === option.key && styles.chipActive
                          )}
                          key={option.key}
                          onClick={() => {
                            startTransition(() => {
                              setSegment(option.key)
                            })
                          }}
                          type="button"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    <label className={styles.searchField}>
                      <Filter size={14} />
                      <input
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search asset, wallet, venue"
                        type="text"
                        value={search}
                      />
                    </label>
                  </div>
                </div>

                <div className={styles.explorerGrid}>
                  <div className={styles.groupList}>
                    {groups.map((group) => {
                      const width = Math.max(
                        14,
                        (group.valueUsd / snapshot.metrics.treasuryUsd) * 100
                      )

                      return (
                        <button
                          className={cx(
                            styles.groupButton,
                            activeGroup?.label === group.label && styles.groupButtonActive
                          )}
                          key={group.label}
                          onClick={() => setSelectedGroup(group.label)}
                          type="button"
                        >
                          <div className={styles.groupTop}>
                            <span>{group.label}</span>
                            <span>{compactUsd.format(group.valueUsd)}</span>
                          </div>
                          <div className={styles.groupBar}>
                            <span
                              className={cx(styles.groupFill, severityClass(group.severity))}
                              style={{ width: `${width}%` }}
                            />
                          </div>
                          <div className={styles.groupMeta}>
                            <span>{percent.format((group.valueUsd / snapshot.metrics.treasuryUsd) * 100)}% share</span>
                            <span>{group.count} positions</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <div className={styles.detailPane}>
                    <div className={styles.detailHeader}>
                      <div>
                        <div className={styles.sectionSubhead}>
                          {activeGroup ? activeGroup.label : "No matches"}
                        </div>
                        <div className={styles.detailCaption}>
                          {activeGroup
                            ? `${compactUsd.format(activeGroup.valueUsd)} across ${detailPositions.length} positions`
                            : "Refine the current search or lens."}
                        </div>
                      </div>
                    </div>

                    <div className={styles.positionStack}>
                      {detailPositions.map((position) => (
                        <div className={styles.positionCard} key={position.id}>
                          <div className={styles.positionTop}>
                            <div>
                              <div className={styles.positionTitle}>{position.asset}</div>
                              <div className={styles.positionCaption}>
                                {position.wallet} · {position.venue}
                              </div>
                            </div>

                            <div className={styles.positionValue}>
                              {compactUsd.format(position.valueUsd)}
                            </div>
                          </div>

                          <div className={styles.positionMeta}>
                            <span className={styles.metaTag}>{position.chain}</span>
                            <span className={styles.metaTag}>{position.liquidityBucket}</span>
                            <span className={styles.metaTag}>{position.walletType}</span>
                            <span className={cx(styles.metaTag, severityClass(position.riskLevel))}>
                              {position.riskLevel}
                            </span>
                          </div>

                          <p className={styles.positionText}>{position.notes}</p>

                          <div className={styles.positionFooter}>
                            <span>{position.source}</span>
                            <span>{position.updatedAt}</span>
                            {position.underlying ? <span>Underlying: {position.underlying}</span> : null}
                            {position.healthFactor ? (
                              <span>HF {percent.format(position.healthFactor)}</span>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              <article className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <div className={styles.sectionEyebrow}>Action queue</div>
                    <h2 className={styles.sectionTitle}>Queue a rebalance package</h2>
                  </div>
                  <div className={styles.panelNote}>
                    Actions persist locally in the demo so you can compare scenario packages.
                  </div>
                </div>

                <div className={styles.actionsGrid}>
                  <div className={styles.actionList}>
                    {visibleActions.map((action) => {
                      const isQueued = queuedActions.includes(action.id)

                      return (
                        <div className={styles.actionCard} key={action.id}>
                          <div className={styles.actionHeader}>
                            <div>
                              <div className={styles.actionTitle}>{action.title}</div>
                              <div className={styles.actionOwner}>
                                {action.owner} · {action.signerPolicy}
                              </div>
                            </div>
                            <span className={cx(styles.severityPill, severityClass(action.severity))}>
                              {action.severity}
                            </span>
                          </div>

                          <p className={styles.actionSummary}>{action.summary}</p>

                          <div className={styles.actionMeta}>
                            <span>{action.delivery}</span>
                            <span>{action.impact}</span>
                          </div>

                          <div className={styles.actionFooter}>
                            <button
                              className={cx(
                                styles.queueButton,
                                isQueued && styles.queueButtonActive
                              )}
                              onClick={() => {
                                setQueuedActions((current) =>
                                  current.includes(action.id)
                                    ? current.filter((id) => id !== action.id)
                                    : [...current, action.id]
                                )
                              }}
                              type="button"
                            >
                              {isQueued ? "Queued" : "Queue action"}
                            </button>

                            <span className={styles.deltaHint}>
                              {action.deltaT0Usd
                                ? `${compactUsd.format(action.deltaT0Usd)} T+0 delta`
                                : "Policy-only change"}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <aside className={styles.projectionCard}>
                    <div className={styles.sectionSubhead}>Projected if queued</div>
                    {queuedActionDetails.length ? (
                      <>
                        <div className={styles.projectionMetric}>
                          <span>Immediate runway</span>
                          <strong>{formatMonths(projectedImmediateRunway)}</strong>
                        </div>
                        <div className={styles.projectionMetric}>
                          <span>T+0 balance delta</span>
                          <strong>{queuedT0Delta ? compactUsd.format(queuedT0Delta) : "$0"}</strong>
                        </div>
                        <div className={styles.projectionMetric}>
                          <span>Circle concentration delta</span>
                          <strong>{queuedIssuerDelta ? `${percent.format(queuedIssuerDelta)} pts` : "0 pts"}</strong>
                        </div>
                        <div className={styles.projectionMetric}>
                          <span>Breaches cleared</span>
                          <strong>{queuedBreachesCleared}</strong>
                        </div>

                        <div className={styles.queuedList}>
                          {queuedActionDetails.map((action) => (
                            <div className={styles.queuedItem} key={action.id}>
                              <ChevronRight size={14} />
                              <span>{action.title}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className={styles.sectionText}>
                        Queue one or more actions to see how the package changes
                        immediate runway, issuer concentration, and breach count.
                      </p>
                    )}
                  </aside>
                </div>
              </article>
            </div>

            <div className={styles.sideColumn}>
              <article className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <div className={styles.sectionEyebrow}>Liquidity</div>
                    <h2 className={styles.sectionTitle}>Time-to-cash ladder</h2>
                  </div>
                </div>

                <div className={styles.ladder}>
                  {snapshot.liquidity.map((bucket) => {
                    const width = Math.max(
                      16,
                      (bucket.valueUsd / snapshot.metrics.treasuryUsd) * 100
                    )

                    return (
                      <div className={styles.ladderRow} key={bucket.label}>
                        <div className={styles.ladderHeader}>
                          <span>{bucket.label}</span>
                          <strong>{compactUsd.format(bucket.valueUsd)}</strong>
                        </div>
                        <div className={styles.ladderTrack}>
                          <span className={styles.ladderFill} style={{ width: `${width}%` }} />
                        </div>
                        <div className={styles.ladderMeta}>
                          <span>{bucket.settlement}</span>
                          <span>{bucket.haircut} haircut</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </article>

              <article className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <div className={styles.sectionEyebrow}>Policy watch</div>
                    <h2 className={styles.sectionTitle}>What is inside or outside guardrails</h2>
                  </div>
                </div>

                <div className={styles.policyStack}>
                  {snapshot.policies.map((policy) => (
                    <div className={styles.policyCard} key={policy.id}>
                      <div className={styles.policyTop}>
                        <div>
                          <div className={styles.policyTitle}>{policy.name}</div>
                          <div className={styles.policyOwner}>{policy.owner}</div>
                        </div>
                        <span className={cx(styles.statusPill, statusClass(policy.status))}>
                          {policy.status}
                        </span>
                      </div>
                      <div className={styles.policyValues}>
                        <span>Target: {policy.target}</span>
                        <strong>{policy.current}</strong>
                      </div>
                      <p className={styles.policyText}>{policy.note}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <div className={styles.sectionEyebrow}>Alerts</div>
                    <h2 className={styles.sectionTitle}>Fresh issues worth reviewing</h2>
                  </div>
                </div>

                <div className={styles.alertStack}>
                  {snapshot.alerts.map((alert) => (
                    <div className={styles.alertCard} key={alert.id}>
                      <div className={styles.alertTop}>
                        <span className={cx(styles.severityPill, severityClass(alert.severity))}>
                          {alert.severity}
                        </span>
                        <span className={styles.alertTime}>{alert.time}</span>
                      </div>
                      <div className={styles.alertTitle}>{alert.title}</div>
                      <p className={styles.alertText}>{alert.detail}</p>
                      <div className={styles.alertSource}>{alert.source}</div>
                    </div>
                  ))}
                </div>
              </article>

              <article className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <div className={styles.sectionEyebrow}>Provenance</div>
                    <h2 className={styles.sectionTitle}>How much trust each number deserves</h2>
                  </div>
                </div>

                <div className={styles.sourceStack}>
                  {snapshot.sources.map((source) => (
                    <div className={styles.sourceCard} key={source.id}>
                      <div className={styles.sourceTop}>
                        <div>
                          <div className={styles.sourceName}>{source.name}</div>
                          <div className={styles.sourceCategory}>{source.category}</div>
                        </div>
                        <span className={styles.sourceConfidence}>{source.confidence}</span>
                      </div>
                      <p className={styles.sourceText}>{source.detail}</p>
                      <div className={styles.sourceFooter}>
                        <span>{source.updatedAt}</span>
                        <span>{source.freshness}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>
        )}

        <footer className={styles.footer}>
          <div className={styles.footerItem}>
            <Eye size={14} />
            Not live: seeded demo values only
          </div>
          <div className={styles.footerItem}>
            <AlertTriangle size={14} />
            Scenario modes are simulated treasury outcomes, not forecasts
          </div>
          <div className={styles.footerItem}>
            <ShieldCheck size={14} />
            Design intent: decision support before execution, not custody
          </div>
        </footer>
      </div>
    </main>
  )
}
