"use client"

import {
  Activity,
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Clock3,
  Command,
  FileCheck2,
  Gauge,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Route,
  ShieldCheck,
  Wallet,
  X,
  Zap,
} from "lucide-react"
import { useEffect, useState } from "react"
import styles from "./workspace.module.css"

type View = "readiness" | "plans" | "corridors" | "evidence" | "policies"
type Scenario = "normal" | "stress"

type RouteOption = {
  id: "native" | "finalized" | "fast"
  name: string
  short: string
  status: "Eligible" | "Review" | "Unavailable"
  tone: "mint" | "amber" | "slate"
  finality: string
  eta: string
  fee: string
  capacity: string
  note: string
}

const routes: RouteOption[] = [
  {
    id: "native",
    name: "Native inventory",
    short: "Base → Base",
    status: "Eligible",
    tone: "mint",
    finality: "Single-chain",
    eta: "~45 sec",
    fee: "~0.18 USDC",
    capacity: "3.92M available",
    note: "Fastest path; destination and source are on the same approved rail.",
  },
  {
    id: "finalized",
    name: "CCTP Standard",
    short: "Ethereum → Base",
    status: "Eligible",
    tone: "mint",
    finality: "Finalized",
    eta: "12–20 min est.",
    fee: "2.4 USDC est.",
    capacity: "8.10M available",
    note: "Use only if Base inventory is reserved; requires finalized source-chain attestation.",
  },
  {
    id: "fast",
    name: "CCTP Fast",
    short: "Ethereum → Base",
    status: "Review",
    tone: "amber",
    finality: "Confirmed",
    eta: "2–5 min est.",
    fee: "16.8 USDC est.",
    capacity: "4.00M allowance",
    note: "Faster estimate with a lower finality threshold; controller review required by policy.",
  },
]

const nav: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "readiness", label: "Readiness", icon: LayoutDashboard },
  { id: "plans", label: "Plans", icon: FileCheck2 },
  { id: "corridors", label: "Corridors", icon: Route },
  { id: "evidence", label: "Evidence", icon: ShieldCheck },
  { id: "policies", label: "Policies", icon: Gauge },
]

const storageKey = "clearrail-seeded-workspace-v1"

function Signal({
  tone,
  children,
}: {
  tone: "mint" | "amber" | "coral" | "slate" | "blue"
  children: React.ReactNode
}) {
  return (
    <span className={`${styles.signal} ${styles[`signal_${tone}`]}`}>
      {children}
    </span>
  )
}

function Metric({
  label,
  value,
  meta,
  icon,
}: {
  label: string
  value: string
  meta: string
  icon: React.ReactNode
}) {
  return (
    <div className={styles.metric}>
      <div className={styles.metricTop}>
        <span>{label}</span>
        <span className={styles.metricIcon}>{icon}</span>
      </div>
      <strong>{value}</strong>
      <p>{meta}</p>
    </div>
  )
}

export function ClearrailWorkspace() {
  const [view, setView] = useState<View>("readiness")
  const [scenario, setScenario] = useState<Scenario>("normal")
  const [corridor, setCorridor] = useState("EU payout · Base")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] =
    useState<RouteOption["id"]>("native")
  const [acknowledged, setAcknowledged] = useState(false)
  const [planSaved, setPlanSaved] = useState(false)
  const [toast, setToast] = useState("")

  useEffect(() => {
    try {
      const saved = JSON.parse(
        window.localStorage.getItem(storageKey) || "{}"
      ) as {
        scenario?: Scenario
        selectedRoute?: RouteOption["id"]
        acknowledged?: boolean
        planSaved?: boolean
      }
      const restore = window.setTimeout(() => {
        if (saved.scenario === "normal" || saved.scenario === "stress")
          setScenario(saved.scenario)
        if (saved.selectedRoute) setSelectedRoute(saved.selectedRoute)
        if (typeof saved.acknowledged === "boolean")
          setAcknowledged(saved.acknowledged)
        if (typeof saved.planSaved === "boolean") setPlanSaved(saved.planSaved)
      }, 0)
      return () => window.clearTimeout(restore)
    } catch {
      // A malformed local demo preference should never prevent the workspace loading.
    }
  }, [])

  function persist(
    next: Partial<{
      scenario: Scenario
      selectedRoute: RouteOption["id"]
      acknowledged: boolean
      planSaved: boolean
    }>
  ) {
    const current = {
      scenario,
      selectedRoute,
      acknowledged,
      planSaved,
      ...next,
    }
    window.localStorage.setItem(storageKey, JSON.stringify(current))
  }

  function changeScenario(next: Scenario) {
    setScenario(next)
    persist({ scenario: next })
    setToast(
      next === "stress"
        ? "Stress scenario applied locally"
        : "Returned to normal seeded scenario"
    )
  }

  function acknowledge() {
    setAcknowledged(true)
    persist({ acknowledged: true })
    setToast("Review ownership saved locally")
  }

  function savePlan() {
    setPlanSaved(true)
    persist({ planSaved: true, selectedRoute })
    setToast("Working plan saved locally — no transfer created")
  }

  const stress = scenario === "stress"
  const selected =
    routes.find((route) => route.id === selectedRoute) ?? routes[0]
  const primaryException = stress
    ? {
        tone: "coral" as const,
        title: "Base payout route is below your buffer",
        body: "Scenario injects a 1.15M USDC route-capacity reduction. Fund from an approved source or defer this payment run.",
        meta: "Affected: Base / EU vendor corridor · seeded at 09:30 UTC",
      }
    : {
        tone: "amber" as const,
        title: "Fast route needs controller review",
        body: "Policy P-08 requires an explicit review when a route uses confirmed rather than finalized delivery.",
        meta: "Affected: CCTP Fast · policy version 2.4",
      }

  const shellHeader = (
    <>
      <header className={styles.topbar}>
        <div className={styles.mobileBrand}>
          <span className={styles.mark}>
            <span />
            <i />
          </span>
          <span>clearrail</span>
        </div>
        <button
          className={styles.workspaceButton}
          type="button"
          aria-label="Select workspace"
        >
          <span className={styles.workspaceGlyph}>N</span>
          <span>Northstar Finance</span>
          <ChevronDown size={15} aria-hidden="true" />
        </button>
        <div className={styles.topbarRight}>
          <button
            className={styles.scenarioButton}
            type="button"
            onClick={() => changeScenario(stress ? "normal" : "stress")}
          >
            <Zap size={14} aria-hidden="true" />
            {stress ? "Exit stress test" : "Simulate stress"}
          </button>
          <span className={styles.demoStamp}>
            <span className={styles.pulse} /> Seeded scenario · no live
            connections
          </span>
          <button
            className={styles.iconButton}
            type="button"
            aria-label="Notifications"
          >
            <Bell size={17} />
          </button>
          <button
            className={styles.avatar}
            type="button"
            aria-label="Open user menu"
          >
            AR
          </button>
        </div>
      </header>
      <nav className={styles.mobileNav} aria-label="Workspace navigation">
        {nav.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              aria-current={view === item.id ? "page" : undefined}
              className={view === item.id ? styles.mobileNavActive : ""}
            >
              <Icon size={15} />
              {item.label}
            </button>
          )
        })}
      </nav>
    </>
  )

  function readinessContent() {
    return (
      <>
        <section className={styles.hero}>
          <div>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} /> Settlement readiness
            </div>
            <h1>
              {stress
                ? "Protect today’s payout run"
                : "Your next payment run is nearly ready"}
            </h1>
            <p>
              {stress
                ? "A local stress case is degrading the Base corridor. Review the intervention before the cutoff."
                : "Reconcile the route, evidence, and owner before releasing the approval packet."}
            </p>
          </div>
          <div className={styles.heroControls}>
            <label className={styles.selectWrap}>
              <span className={styles.visuallyHidden}>Payment corridor</span>
              <select
                value={corridor}
                onChange={(event) => setCorridor(event.target.value)}
              >
                <option>EU payout · Base</option>
                <option>US contractor · Ethereum</option>
                <option>All approved corridors</option>
              </select>
              <ChevronDown size={15} aria-hidden="true" />
            </label>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={() => setDrawerOpen(true)}
            >
              <Plus size={16} aria-hidden="true" /> Compare routes
            </button>
          </div>
        </section>

        <section className={styles.runCard} aria-label="Next payment run">
          <div className={styles.runMain}>
            <div className={styles.runBadge}>
              <Clock3 size={18} aria-hidden="true" />
            </div>
            <div>
              <div className={styles.runKicker}>NEXT PAYMENT RUN</div>
              <h2>Tuesday vendor payout</h2>
              <p>
                32 recipients · 2.40M USDC target · selected corridor:{" "}
                {corridor}
              </p>
            </div>
          </div>
          <div className={styles.runStats}>
            <div>
              <span>Cutoff</span>
              <strong>15:00 UTC</strong>
              <small>5h 30m remaining</small>
            </div>
            <div>
              <span>Policy state</span>
              <strong>{stress ? "Blocked" : "1 review"}</strong>
              <small>{stress ? "buffer rule P-12" : "route rule P-08"}</small>
            </div>
            <button
              type="button"
              className={styles.runAction}
              onClick={() => setDrawerOpen(true)}
            >
              Open plan <ArrowRight size={15} />
            </button>
          </div>
        </section>

        <section className={styles.metricGrid} aria-label="Settlement metrics">
          <Metric
            label="Eligible funding"
            value={stress ? "1.25M" : "3.92M"}
            meta={stress ? "1.15M below run target" : "1.52M above run target"}
            icon={<Wallet size={16} />}
          />
          <Metric
            label="Route readiness"
            value={stress ? "1 / 3" : "2 / 3"}
            meta={
              stress ? "one route policy-blocked" : "one route needs review"
            }
            icon={<Route size={16} />}
          />
          <Metric
            label="Evidence freshness"
            value="98 min"
            meta="oldest required record"
            icon={<RefreshCw size={16} />}
          />
          <Metric
            label="Approval coverage"
            value="2 / 2"
            meta="roles assigned for this run"
            icon={<ShieldCheck size={16} />}
          />
        </section>

        <section className={styles.dashboardGrid}>
          <div className={styles.mainColumn}>
            <div className={styles.sectionHeading}>
              <div>
                <span>FUNDING COVERAGE</span>
                <h2>Where this run is funded</h2>
              </div>
              <button
                type="button"
                className={styles.quietButton}
                onClick={() => setView("corridors")}
              >
                View inventory <ChevronRight size={15} />
              </button>
            </div>
            <article className={styles.coverageCard}>
              <div className={styles.coverageTopline}>
                <div>
                  <span>Available across approved Base accounts</span>
                  <strong>{stress ? "1.25M USDC" : "3.92M USDC"}</strong>
                </div>
                <Signal tone={stress ? "coral" : "mint"}>
                  {stress ? "Funding gap" : "Funded"}
                </Signal>
              </div>
              <div
                className={styles.coverageBar}
                aria-label={
                  stress
                    ? "1.25 million USDC funded, 1.15 million USDC gap"
                    : "2.4 million USDC funded, 1.52 million USDC free"
                }
              >
                <span
                  className={styles.coverageReserved}
                  style={{ width: stress ? "52%" : "61%" }}
                />
                <span
                  className={stress ? styles.coverageGap : styles.coverageFree}
                />
              </div>
              <div className={styles.legendRow}>
                <span>
                  <i className={styles.legendReserved} /> Run target{" "}
                  <b>2.40M</b>
                </span>
                <span>
                  <i
                    className={stress ? styles.legendGap : styles.legendFree}
                  />{" "}
                  {stress ? "Funding gap" : "Free after run"}{" "}
                  <b>{stress ? "1.15M" : "1.52M"}</b>
                </span>
              </div>
              <div className={styles.accountRows}>
                <div>
                  <span className={styles.chainDot}>B</span>
                  <p>
                    <b>Fireblocks · Base operating</b>
                    <small>Snapshot 09:28 UTC · approved source</small>
                  </p>
                  <strong>
                    {stress ? "1.25M" : "2.18M"} <em>USDC</em>
                  </strong>
                </div>
                <div>
                  <span className={styles.chainDot}>B</span>
                  <p>
                    <b>Safe · Base reserve</b>
                    <small>Snapshot 09:27 UTC · two signer policy</small>
                  </p>
                  <strong>
                    {stress ? "0.00" : "1.74M"} <em>USDC</em>
                  </strong>
                </div>
              </div>
            </article>

            <div className={styles.sectionHeading}>
              <div>
                <span>RECOMMENDED PATH</span>
                <h2>Route decision</h2>
              </div>
              <button
                type="button"
                className={styles.quietButton}
                onClick={() => setDrawerOpen(true)}
              >
                Compare all <ChevronRight size={15} />
              </button>
            </div>
            <article className={styles.routeSummary}>
              <div className={styles.routeDiagram} aria-hidden="true">
                <span>Base</span>
                <i />
                <i />
                <span>EU vendors</span>
              </div>
              <div className={styles.routeSummaryText}>
                <div className={styles.routeNameLine}>
                  <h3>
                    {stress
                      ? "No automatic recommendation"
                      : "Use native Base inventory"}
                  </h3>
                  <Signal tone={stress ? "coral" : "mint"}>
                    {stress ? "Blocked" : "Eligible"}
                  </Signal>
                </div>
                <p>
                  {stress
                    ? "The scenario leaves this run under the required buffer. Move approved funds or pick a smaller run before approval."
                    : "Keeps delivery on the same approved rail; no cross-chain transfer or finality tradeoff is needed."}
                </p>
                <div className={styles.routeFacts}>
                  <span>
                    <b>{stress ? "1.25M" : "3.92M"}</b> capacity
                  </span>
                  <span>
                    <b>~45 sec</b> expected
                  </span>
                  <span>
                    <b>0.18 USDC</b> fee est.
                  </span>
                </div>
              </div>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => setDrawerOpen(true)}
              >
                {stress ? "Review options" : "Use in plan"}
                <ArrowRight size={15} />
              </button>
            </article>
          </div>

          <aside className={styles.sideColumn}>
            <div className={styles.sectionHeading}>
              <div>
                <span>EXCEPTION QUEUE</span>
                <h2>Needs a decision</h2>
              </div>
              <span className={styles.countBadge}>{stress ? "2" : "1"}</span>
            </div>
            <article
              className={`${styles.exceptionCard} ${styles[`exception_${primaryException.tone}`]}`}
            >
              <div className={styles.exceptionHead}>
                <Signal tone={primaryException.tone}>
                  {primaryException.tone === "coral" ? (
                    <CircleAlert size={13} />
                  ) : (
                    <Clock3 size={13} />
                  )}
                  {primaryException.tone === "coral" ? "Block" : "Review"}
                </Signal>
                <button type="button" aria-label="More exception actions">
                  <MoreHorizontal size={17} />
                </button>
              </div>
              <h3>{primaryException.title}</h3>
              <p>{primaryException.body}</p>
              <div className={styles.exceptionMeta}>
                {primaryException.meta}
              </div>
              {acknowledged ? (
                <div className={styles.ownedState}>
                  <Check size={14} /> Owned by you · 09:31 UTC
                </div>
              ) : (
                <button
                  className={styles.ackButton}
                  type="button"
                  onClick={acknowledge}
                >
                  <Check size={15} /> Acknowledge review
                </button>
              )}
            </article>
            {stress && (
              <article
                className={`${styles.exceptionCard} ${styles.exception_amber}`}
              >
                <div className={styles.exceptionHead}>
                  <Signal tone="amber">
                    <Clock3 size={13} /> Review
                  </Signal>
                  <button type="button" aria-label="More exception actions">
                    <MoreHorizontal size={17} />
                  </button>
                </div>
                <h3>Finalized route is inside cutoff buffer</h3>
                <p>
                  The standard cross-chain option remains policy-eligible but
                  its estimated range consumes 20 minutes of the 30-minute
                  operating buffer.
                </p>
                <div className={styles.exceptionMeta}>
                  Affected: Ethereum → Base · route quote 09:29 UTC
                </div>
              </article>
            )}
            <article className={styles.evidenceCard}>
              <div className={styles.evidenceHeader}>
                <span>DECISION EVIDENCE</span>
                <button type="button" onClick={() => setView("evidence")}>
                  View all <ChevronRight size={14} />
                </button>
              </div>
              <div className={styles.evidenceRow}>
                <span className={styles.evidenceMark}>
                  <ShieldCheck size={15} />
                </span>
                <p>
                  <b>Issuer reserve disclosure</b>
                  <small>Publisher evidence dated 14 Jul 2026</small>
                </p>
                <Signal tone="slate">2d old</Signal>
              </div>
              <div className={styles.evidenceRow}>
                <span className={styles.evidenceMark}>
                  <Route size={15} />
                </span>
                <p>
                  <b>Route status & fees</b>
                  <small>Prepared by demo provider at 09:29 UTC</small>
                </p>
                <Signal tone="mint">1m old</Signal>
              </div>
              <div className={styles.evidenceRow}>
                <span className={styles.evidenceMark}>
                  <FileCheck2 size={15} />
                </span>
                <p>
                  <b>Recipient verification</b>
                  <small>Customer record · reviewed 15 Jul</small>
                </p>
                <Signal tone="mint">Current</Signal>
              </div>
            </article>
          </aside>
        </section>
      </>
    )
  }

  function secondaryView() {
    const content: Record<
      Exclude<View, "readiness">,
      {
        eyebrow: string
        title: string
        description: string
        cards: {
          label: string
          value: string
          text: string
          tone: "mint" | "amber" | "blue"
        }[]
      }
    > = {
      plans: {
        eyebrow: "PAYMENT PLANS",
        title: "Decision records before execution",
        description:
          "Plans preserve the policy and evidence snapshot that informed the handoff. This seeded workspace does not submit payments.",
        cards: [
          {
            label: "Tuesday vendor payout",
            value: planSaved ? "Working plan saved" : "Draft",
            text: planSaved
              ? `Selected: ${selected.name} · saved in this browser`
              : "Open the route comparison to create a working plan.",
            tone: planSaved ? "mint" : "amber",
          },
          {
            label: "Friday contractor run",
            value: "Awaiting inventory",
            text: "No run is created from this demo card.",
            tone: "blue",
          },
        ],
      },
      corridors: {
        eyebrow: "APPROVED CORRIDORS",
        title: "Inventory and route guardrails",
        description:
          "A corridor binds the allowed asset representation, source accounts, beneficiary type, policy, and evidence requirements.",
        cards: [
          {
            label: "EU vendor · Base",
            value: stress ? "Buffer breached" : "Ready",
            text: stress
              ? "Stress scenario reduces native capacity below target."
              : "Base native inventory is the preferred source.",
            tone: stress ? "amber" : "mint",
          },
          {
            label: "US contractor · Ethereum",
            value: "Monitoring",
            text: "No payment run is scheduled in this seeded scenario.",
            tone: "blue",
          },
        ],
      },
      evidence: {
        eyebrow: "EVIDENCE CATALOG",
        title: "Signals stay attached to their source",
        description:
          "Evidence is data with scope, provider, observation time, and expiry—not a blanket trust score.",
        cards: [
          {
            label: "Route provider snapshot",
            value: "Prepared 09:29 UTC",
            text: "Fee, allowance, and finality assumptions are demo-only estimates.",
            tone: "mint",
          },
          {
            label: "Issuer disclosure record",
            value: "Dated 14 Jul 2026",
            text: "Presentation only; review the primary issuer source for current information.",
            tone: "amber",
          },
        ],
      },
      policies: {
        eyebrow: "POLICY LIBRARY",
        title: "Explainable gates, not an opaque score",
        description:
          "Clearrail evaluates customer-authored rules and names the reason a route is eligible, review-only, or blocked.",
        cards: [
          {
            label: "P-08 · finality",
            value: "Controller review",
            text: "Required when a plan selects confirmed rather than finalized delivery.",
            tone: "amber",
          },
          {
            label: "P-12 · funding buffer",
            value: "30 min operating buffer",
            text: "Blocks a route when available inventory is below the run target plus required buffer.",
            tone: "mint",
          },
        ],
      },
    }
    const item = content[view as Exclude<View, "readiness">]
    return (
      <section className={styles.secondaryView}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} /> {item.eyebrow}
        </div>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <div className={styles.secondaryCards}>
          {item.cards.map((card) => (
            <article className={styles.secondaryCard} key={card.label}>
              <div>
                <span>{card.label}</span>
                <Signal tone={card.tone}>{card.value}</Signal>
              </div>
              <h2>{card.value}</h2>
              <p>{card.text}</p>
              <button
                type="button"
                onClick={() =>
                  view === "plans" ? setDrawerOpen(true) : setView("readiness")
                }
              >
                {view === "plans"
                  ? "Open route comparison"
                  : "Return to readiness"}{" "}
                <ArrowRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </section>
    )
  }

  return (
    <main className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.mark}>
            <span />
            <i />
          </span>
          <span>clearrail</span>
        </div>
        <div className={styles.sidebarLabel}>WORKSPACE</div>
        <nav className={styles.sidebarNav} aria-label="Workspace navigation">
          {nav.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                className={view === item.id ? styles.navActive : ""}
                onClick={() => setView(item.id)}
                aria-current={view === item.id ? "page" : undefined}
              >
                <Icon size={17} aria-hidden="true" />
                <span>{item.label}</span>
                {item.id === "readiness" && <i className={styles.navPip}>1</i>}
              </button>
            )
          })}
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.sidebarLabel}>SYSTEM</div>
          <button type="button">
            <Activity size={17} aria-hidden="true" />
            Data health <span className={styles.healthDot} />
          </button>
          <button type="button">
            <Command size={17} aria-hidden="true" />
            Command menu <kbd>⌘K</kbd>
          </button>
          <div className={styles.helpBox}>
            <span>
              <CircleCheck size={15} />
            </span>
            <p>
              <b>Need a hand?</b>
              <small>Read the payment-run guide.</small>
            </p>
            <ChevronRight size={15} />
          </div>
        </div>
      </aside>

      <div className={styles.stage}>
        {shellHeader}
        <div className={styles.content}>
          {view === "readiness" ? readinessContent() : secondaryView()}
        </div>
      </div>

      {toast && (
        <div className={styles.toast} role="status">
          <CircleCheck size={16} />
          {toast}
          <button
            type="button"
            onClick={() => setToast("")}
            aria-label="Dismiss message"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {drawerOpen && (
        <div
          className={styles.overlay}
          role="presentation"
          onMouseDown={() => setDrawerOpen(false)}
        >
          <section
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={styles.drawerHeader}>
              <div>
                <span>CREATE WORKING PLAN</span>
                <h2 id="plan-title">Tuesday vendor payout</h2>
                <p>Seeded scenario only · no transaction will be created.</p>
              </div>
              <button
                className={styles.iconButton}
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close route comparison"
              >
                <X size={18} />
              </button>
            </div>
            <div className={styles.planSummary}>
              <div>
                <span>AMOUNT</span>
                <strong>
                  2.40M <em>USDC</em>
                </strong>
              </div>
              <div>
                <span>CUTOFF</span>
                <strong>
                  15:00 <em>UTC</em>
                </strong>
              </div>
              <div>
                <span>POLICY</span>
                <strong>P-08 / P-12</strong>
              </div>
            </div>
            <div className={styles.drawerSectionHead}>
              <div>
                <span>ROUTE CANDIDATES</span>
                <p>Choose a path after reviewing its finality and gates.</p>
              </div>
              <button type="button" className={styles.textButton}>
                Why these routes?
              </button>
            </div>
            <div className={styles.routeOptions}>
              {routes.map((route) => {
                const isSelected = route.id === selectedRoute
                const unavailable = stress && route.id === "native"
                return (
                  <button
                    key={route.id}
                    type="button"
                    className={`${styles.routeOption} ${isSelected ? styles.routeOptionSelected : ""} ${unavailable ? styles.routeOptionDisabled : ""}`}
                    onClick={() => {
                      if (!unavailable) {
                        setSelectedRoute(route.id)
                        persist({ selectedRoute: route.id })
                      }
                    }}
                    aria-pressed={isSelected}
                    disabled={unavailable}
                  >
                    <span className={styles.radio}>
                      {isSelected && <Check size={12} />}
                    </span>
                    <span className={styles.optionBody}>
                      <span className={styles.optionTop}>
                        <b>{route.name}</b>
                        <Signal tone={unavailable ? "coral" : route.tone}>
                          {unavailable ? "Blocked" : route.status}
                        </Signal>
                      </span>
                      <small>
                        {route.short} · {route.finality}
                      </small>
                      <span className={styles.optionMetrics}>
                        <span>{route.eta}</span>
                        <span>{route.fee}</span>
                        <span>{route.capacity}</span>
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
            <article className={styles.selectedExplanation}>
              <div className={styles.selectedIcon}>
                <Route size={17} />
              </div>
              <div>
                <div className={styles.selectedHeadline}>
                  <h3>{selected.name}</h3>
                  <Signal
                    tone={
                      stress && selected.id === "native"
                        ? "coral"
                        : selected.tone
                    }
                  >
                    {stress && selected.id === "native"
                      ? "Cannot select"
                      : selected.status}
                  </Signal>
                </div>
                <p>
                  {stress && selected.id === "native"
                    ? "The selected route was invalidated by the local stress scenario. Choose a remaining path or return to readiness."
                    : selected.note}
                </p>
                <div className={styles.gateList}>
                  <span>
                    <Check size={14} /> Recipient verified
                  </span>
                  <span>
                    <Check size={14} /> Policy matched
                  </span>
                  <span
                    className={selected.id === "fast" ? styles.gateReview : ""}
                  >
                    {selected.id === "fast" ? (
                      <Clock3 size={14} />
                    ) : (
                      <Check size={14} />
                    )}
                    {selected.id === "fast"
                      ? "Controller review required"
                      : "Evidence within policy"}
                  </span>
                </div>
              </div>
            </article>
            <div className={styles.drawerFooter}>
              <p>
                <ShieldCheck size={15} /> Saving records a local working plan
                only. Approval and execution stay external.
              </p>
              <button
                className={styles.primaryButton}
                type="button"
                onClick={savePlan}
                disabled={stress && selected.id === "native"}
              >
                {planSaved ? (
                  <>
                    <Check size={16} /> Working plan saved
                  </>
                ) : (
                  <>
                    Save working plan <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
