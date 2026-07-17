"use client"

import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Database,
  FileCheck2,
  Gauge,
  Info,
  Landmark,
  Menu,
  MoreHorizontal,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  WalletCards,
  X,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import styles from "./harbor.module.css"

type ScenarioKey = "normal" | "volatile" | "review"
type Severity = "high" | "watch" | "healthy"

type Finding = {
  id: string
  severity: Severity
  eyebrow: string
  title: string
  description: string
  value: string
  metric: number
  limit: number
  warning: number
  affected: string
  evidence: string
  owner: string
  account: string
  action: string
}

const scenarios: Record<
  ScenarioKey,
  {
    label: string
    posture: string
    note: string
    treasury: string
    runway: string
    coverage: string
    breaches: number
    composition: { name: string; detail: string; value: string; share: number }[]
    findings: Finding[]
  }
> = {
  normal: {
    label: "Normal",
    posture: "Treasury is inside hard limits",
    note: "Two watch items should be discussed at the next weekly review.",
    treasury: "$12.91m",
    runway: "17.2 mo",
    coverage: "96%",
    breaches: 0,
    composition: [
      { name: "USDC", detail: "Circle · 3 chains", value: "$4.91m", share: 38 },
      { name: "USDT", detail: "Tether · Ethereum", value: "$3.36m", share: 26 },
      { name: "USDS", detail: "Sky · Ethereum", value: "$2.58m", share: 20 },
      { name: "DAI", detail: "Sky · Base", value: "$1.29m", share: 10 },
      { name: "Other", detail: "Bank + gas reserve", value: "$0.77m", share: 6 },
    ],
    findings: [],
  },
  volatile: {
    label: "Volatile",
    posture: "Liquidity needs review",
    note: "USDS exit coverage fell below policy after a seeded liquidity shock.",
    treasury: "$12.77m",
    runway: "16.9 mo",
    coverage: "71%",
    breaches: 1,
    composition: [
      { name: "USDC", detail: "Circle · 3 chains", value: "$4.77m", share: 37 },
      { name: "USDT", detail: "Tether · Ethereum", value: "$3.36m", share: 26 },
      { name: "USDS", detail: "Sky · Ethereum", value: "$2.57m", share: 20 },
      { name: "DAI", detail: "Sky · Base", value: "$1.29m", share: 10 },
      { name: "Other", detail: "Bank + gas reserve", value: "$0.78m", share: 7 },
    ],
    findings: [],
  },
  review: {
    label: "Risk review",
    posture: "2 decisions need review",
    note: "$6.04m is affected by a hard issuer limit and stale evidence.",
    treasury: "$12.84m",
    runway: "16.8 mo",
    coverage: "82%",
    breaches: 2,
    composition: [
      { name: "USDC", detail: "Circle · 3 chains", value: "$5.91m", share: 46 },
      { name: "USDT", detail: "Tether · Ethereum", value: "$3.08m", share: 24 },
      { name: "USDS", detail: "Sky · Ethereum", value: "$1.93m", share: 15 },
      { name: "DAI", detail: "Sky · Base", value: "$1.16m", share: 9 },
      { name: "Other", detail: "Bank + gas reserve", value: "$0.76m", share: 6 },
    ],
    findings: [],
  },
}

const baseFindings: Finding[] = [
  {
    id: "issuer",
    severity: "high",
    eyebrow: "Issuer concentration",
    title: "Circle exposure exceeds the 40% hard limit",
    description:
      "USDC across three chains represents 46.0% of eligible treasury. The policy limit is 40.0%.",
    value: "$5.91m",
    metric: 46,
    warning: 35,
    limit: 40,
    affected: "$5.91m",
    evidence: "Market 2m · issuer 12d",
    owner: "Maya",
    account: "Operating Safe + Growth Safe",
    action: "Move at least $771k out of Circle issuer exposure",
  },
  {
    id: "evidence",
    severity: "high",
    eyebrow: "Evidence freshness",
    title: "USDC issuer evidence is past the internal review date",
    description:
      "The seeded issuer assurance record is 12 days beyond this workspace’s 30-day review cadence.",
    value: "42 days",
    metric: 42,
    warning: 25,
    limit: 30,
    affected: "$5.91m",
    evidence: "Issuer record · 42d",
    owner: "Jon",
    account: "All USDC positions",
    action: "Obtain and review the current assurance record",
  },
  {
    id: "venue",
    severity: "watch",
    eyebrow: "Venue concentration",
    title: "Exchange balance is approaching the warning band",
    description:
      "Atlas Exchange holds 18.2% of eligible treasury; the warning threshold is 20.0%.",
    value: "$2.34m",
    metric: 18.2,
    warning: 20,
    limit: 25,
    affected: "$2.34m",
    evidence: "Account snapshot · 4m",
    owner: "Maya",
    account: "Atlas Exchange",
    action: "Review the next payroll funding cycle",
  },
  {
    id: "runway",
    severity: "healthy",
    eyebrow: "Operating runway",
    title: "Eligible liquidity covers 16.8 months",
    description:
      "Runway remains above the 12-month floor using a seeded monthly burn of $642k.",
    value: "16.8 mo",
    metric: 16.8,
    warning: 14,
    limit: 12,
    affected: "$10.78m",
    evidence: "Plan confirmed · 9d",
    owner: "Jon",
    account: "Operating treasury",
    action: "No action required",
  },
]

scenarios.normal.findings = [
  { ...baseFindings[2], metric: 17.4, value: "$2.25m" },
  { ...baseFindings[3], metric: 17.2, value: "17.2 mo" },
]
scenarios.volatile.findings = [
  {
    ...baseFindings[0],
    id: "liquidity",
    eyebrow: "Exit liquidity",
    title: "USDS 1% exit coverage fell below the 80% limit",
    description:
      "Seeded pool depth covers an estimated 71% of the position within 1% slippage. This is not an executable quote.",
    value: "71%",
    metric: 71,
    warning: 90,
    limit: 80,
    affected: "$2.57m",
    evidence: "DEX pools · 90s",
    action: "Review staged exit options and source quality",
  },
  { ...baseFindings[2], metric: 19.3, value: "$2.47m" },
  { ...baseFindings[3], metric: 16.9, value: "16.9 mo" },
]
scenarios.review.findings = baseFindings

const colors = ["#2f746b", "#405d72", "#8e7b58", "#b77922", "#b9b5aa"]

function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={`${styles.severity} ${styles[severity]}`}>
      {severity === "healthy" ? <Check size={12} /> : <AlertTriangle size={12} />}
      {severity === "high" ? "High" : severity === "watch" ? "Watch" : "Inside policy"}
    </span>
  )
}

function PolicyBar({
  metric,
  warning,
  limit,
  projected,
  inverse = false,
}: {
  metric: number
  warning: number
  limit: number
  projected?: number
  inverse?: boolean
}) {
  const max = inverse ? Math.max(warning, metric, projected ?? 0) * 1.25 : Math.max(limit, metric) * 1.35
  return (
    <div className={styles.policyWrap}>
      <div className={styles.policyBar}>
        <span
          className={styles.policyFill}
          style={{ width: `${Math.min(100, (metric / max) * 100)}%` }}
        />
        {projected !== undefined && (
          <span
            className={styles.projected}
            style={{ width: `${Math.min(100, (projected / max) * 100)}%` }}
          />
        )}
        <span
          className={styles.warningMark}
          style={{ left: `${(warning / max) * 100}%` }}
        />
        <span
          className={styles.limitMark}
          style={{ left: `${(limit / max) * 100}%` }}
        />
      </div>
      <div className={styles.policyLabels}>
        <span>Observed {metric}%</span>
        <span>Warn {warning}% · Limit {limit}%</span>
      </div>
    </div>
  )
}

export default function HarborPage() {
  const [scenario, setScenario] = useState<ScenarioKey>("review")
  const [filter, setFilter] = useState<"all" | Severity>("all")
  const [selectedId, setSelectedId] = useState("issuer")
  const [amount, setAmount] = useState(820)
  const [rationale, setRationale] = useState(
    "Restore issuer diversification before the August signer review."
  )
  const [ready, setReady] = useState(false)
  const [composer, setComposer] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = localStorage.getItem("harbor-demo-state")
      if (saved) {
        try {
          const state = JSON.parse(saved)
          setScenario(state.scenario ?? "review")
          setFilter(state.filter ?? "all")
          setSelectedId(state.selectedId ?? "issuer")
          setAmount(state.amount ?? 820)
          setRationale(state.rationale ?? "")
          setReady(Boolean(state.ready))
        } catch {
          // Ignore invalid local demo state.
        }
      }
      setHydrated(true)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(
      "harbor-demo-state",
      JSON.stringify({ scenario, filter, selectedId, amount, rationale, ready })
    )
  }, [scenario, filter, selectedId, amount, rationale, ready, hydrated])

  const current = scenarios[scenario]
  const visibleFindings = current.findings.filter(
    (finding) => filter === "all" || finding.severity === filter
  )
  const selected =
    current.findings.find((finding) => finding.id === selectedId) ??
    current.findings[0]
  const projected = Math.max(0, 46 - (amount / 12840) * 100)

  const hardCount = useMemo(
    () => current.findings.filter((item) => item.severity === "high").length,
    [current.findings]
  )

  function changeScenario(next: ScenarioKey) {
    setScenario(next)
    setSelectedId(scenarios[next].findings[0]?.id ?? "")
    setComposer(false)
  }

  return (
    <main className={styles.app}>
      <aside className={`${styles.sidebar} ${mobileNav ? styles.mobileOpen : ""}`}>
        <div className={styles.brand}>
          <span className={styles.brandMark}><Landmark size={20} /></span>
          <span>Harbor</span>
          <button
            className={styles.closeNav}
            onClick={() => setMobileNav(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>
        <nav aria-label="Primary navigation">
          <button className={styles.navActive}><Gauge size={18} /><span>Overview</span></button>
          <button><AlertTriangle size={18} /><span>Findings</span><b>{hardCount}</b></button>
          <button><WalletCards size={18} /><span>Accounts</span></button>
          <button><SlidersHorizontal size={18} /><span>Policy</span></button>
          <button><ClipboardCheck size={18} /><span>Briefs</span>{ready && <i />}</button>
          <button><Database size={18} /><span>Evidence</span></button>
        </nav>
        <div className={styles.sideBottom}>
          <button><CircleHelp size={18} /><span>Help & methodology</span></button>
          <div className={styles.workspace}>
            <span>NR</span>
            <div><strong>Northstar Labs</strong><small>Finance workspace</small></div>
            <MoreHorizontal size={17} />
          </div>
        </div>
      </aside>

      <section className={styles.shell}>
        <header className={styles.topbar}>
          <button
            className={styles.menuButton}
            onClick={() => setMobileNav(true)}
            aria-label="Open navigation"
          ><Menu size={21} /></button>
          <div className={styles.mobileBrand}>Harbor</div>
          <div className={styles.demoStatus}>
            <span><Sparkles size={13} /> Seeded demo</span>
            <small>Fixed snapshot · no wallet connected</small>
          </div>
          <div className={styles.topActions}>
            <button aria-label="Search"><Search size={18} /></button>
            <button aria-label="Settings"><Settings2 size={18} /></button>
            <span className={styles.avatar}>MR</span>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.pageHead}>
            <div>
              <p className={styles.kicker}>Thursday review · 16 Jul 2026</p>
              <h1>{current.posture}</h1>
              <p>{current.note}</p>
            </div>
            <div className={styles.headControls}>
              <div className={styles.scenarioControl} aria-label="Seeded scenario">
                {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => changeScenario(key)}
                    aria-pressed={scenario === key}
                    className={scenario === key ? styles.selectedScenario : ""}
                  >
                    {scenarios[key].label}
                  </button>
                ))}
              </div>
              <button className={styles.snapshotButton}>
                Snapshot 08:40 UTC <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <div className={styles.healthBar}>
            <div><ShieldCheck size={17} /><strong>Data health: complete</strong><span>5 accounts reconciled</span></div>
            <div><Clock3 size={15} /><span>Balances 4m</span><span>Markets 2m</span><span>Issuer evidence 42d</span></div>
            <button><Info size={15} /> View provenance</button>
          </div>

          <section className={styles.kpis} aria-label="Treasury summary">
            <article><span>Eligible treasury</span><strong>{current.treasury}</strong><small>Seeded USD value</small></article>
            <article><span>Operating runway</span><strong>{current.runway}</strong><small>$642k monthly plan</small></article>
            <article className={current.breaches ? styles.riskKpi : ""}>
              <span>Hard-limit breaches</span><strong>{current.breaches}</strong><small>{current.breaches ? "$6.04m affected" : "No hard breaches"}</small>
            </article>
            <article><span>1% exit coverage</span><strong>{current.coverage}</strong><small>Estimated, not a quote</small></article>
          </section>

          <section className={styles.overviewGrid}>
            <article className={styles.card}>
              <div className={styles.cardHead}>
                <div><p className={styles.kicker}>Composition</p><h2>Treasury by stablecoin</h2></div>
                <button>By issuer <ChevronDown size={14} /></button>
              </div>
              <div className={styles.segmented} aria-label="Treasury composition">
                {current.composition.map((item, index) => (
                  <span
                    key={item.name}
                    style={{ width: `${item.share}%`, background: colors[index] }}
                    title={`${item.name}: ${item.share}%`}
                  />
                ))}
              </div>
              <div className={styles.legend}>
                {current.composition.map((item, index) => (
                  <div key={item.name}>
                    <span className={styles.dot} style={{ background: colors[index] }} />
                    <div><strong>{item.name}</strong><small>{item.detail}</small></div>
                    <b>{item.value}</b><em>{item.share}%</em>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.card}>
              <div className={styles.cardHead}>
                <div><p className={styles.kicker}>Policy distance</p><h2>Limits at a glance</h2></div>
                <button>Policy v3.2 <ChevronDown size={14} /></button>
              </div>
              <div className={styles.limitRows}>
                <div>
                  <span><b>Issuer · Circle</b><small>All USDC deployments</small></span>
                  <strong className={scenario === "review" ? styles.riskText : ""}>
                    {scenario === "review" ? "46.0%" : scenario === "volatile" ? "37.4%" : "38.0%"}
                  </strong>
                  <PolicyBar metric={scenario === "review" ? 46 : scenario === "volatile" ? 37.4 : 38} warning={35} limit={40} />
                </div>
                <div>
                  <span><b>Venue · Atlas</b><small>Custodial exchange</small></span>
                  <strong>{scenario === "volatile" ? "19.3%" : "18.2%"}</strong>
                  <PolicyBar metric={scenario === "volatile" ? 19.3 : 18.2} warning={20} limit={25} />
                </div>
                <div>
                  <span><b>Operating runway</b><small>Eligible liquid assets</small></span>
                  <strong>{current.runway}</strong>
                  <div className={styles.runwayTrack}>
                    <span style={{ width: scenario === "normal" ? "72%" : "70%" }} />
                    <i style={{ left: "50%" }} /><b style={{ left: "50%" }}>12m floor</b>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <section className={styles.findingsSection}>
            <div className={styles.sectionHead}>
              <div><p className={styles.kicker}>Decision queue</p><h2>Findings</h2></div>
              <div className={styles.filters}>
                {(["all", "high", "watch", "healthy"] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    aria-pressed={filter === key}
                    className={filter === key ? styles.filterActive : ""}
                  >
                    {key === "all" ? `All ${current.findings.length}` : key === "high" ? `High ${hardCount}` : key === "watch" ? "Watch" : "Inside"}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.workspaceGrid}>
              <div className={styles.findingList}>
                {visibleFindings.length ? visibleFindings.map((finding) => (
                  <button
                    key={finding.id}
                    className={`${styles.findingRow} ${selected?.id === finding.id ? styles.findingSelected : ""}`}
                    onClick={() => { setSelectedId(finding.id); setComposer(false) }}
                  >
                    <SeverityBadge severity={finding.severity} />
                    <div className={styles.findingCopy}>
                      <span>{finding.eyebrow}</span>
                      <strong>{finding.title}</strong>
                      <small>{finding.account} · {finding.evidence}</small>
                    </div>
                    <div className={styles.findingValue}><strong>{finding.value}</strong><small>{finding.affected} affected</small></div>
                    <span className={styles.owner}>{finding.owner.slice(0, 1)}</span>
                    <ArrowRight className={styles.rowArrow} size={18} />
                  </button>
                )) : (
                  <div className={styles.emptyState}>
                    <FileCheck2 size={28} />
                    <strong>No findings in this filter</strong>
                    <span>Try another severity or seeded scenario.</span>
                  </div>
                )}
              </div>

              {selected && (
                <aside className={styles.decisionPanel}>
                  {!composer ? (
                    <>
                      <div className={styles.panelTop}>
                        <SeverityBadge severity={selected.severity} />
                        <button aria-label="More actions"><MoreHorizontal size={18} /></button>
                      </div>
                      <p className={styles.kicker}>{selected.eyebrow}</p>
                      <h2>{selected.title}</h2>
                      <p className={styles.panelDescription}>{selected.description}</p>

                      <div className={styles.observed}>
                        <span><small>Observed</small><strong>{selected.value}</strong></span>
                        <span><small>Policy limit</small><strong>{selected.limit}{selected.id === "evidence" ? " days" : "%"}</strong></span>
                      </div>
                      {selected.id !== "runway" && (
                        <PolicyBar metric={selected.metric} warning={selected.warning} limit={selected.limit} />
                      )}

                      <div className={styles.recommendation}>
                        <span><BookOpen size={16} /> Suggested decision</span>
                        <strong>{selected.action}</strong>
                        <small>Policy-derived suggestion · review required</small>
                      </div>

                      <div className={styles.evidenceBlock}>
                        <div><span><Database size={15} /> Evidence</span><button>Open all</button></div>
                        <p><b>Market observation</b><span>Aggregated · 08:38 UTC</span></p>
                        <p><b>Issuer record</b><span className={selected.id === "issuer" || selected.id === "evidence" ? styles.stale : ""}>Seeded · 42 days old</span></p>
                        <p><b>Policy v3.2</b><span>Approved 02 Jul</span></p>
                      </div>

                      {selected.severity !== "healthy" && (
                        <button className={styles.primaryButton} onClick={() => setComposer(true)}>
                          Draft response <ArrowRight size={16} />
                        </button>
                      )}
                      <button className={styles.secondaryButton}>Acknowledge finding</button>
                    </>
                  ) : (
                    <div className={styles.composer}>
                      <button className={styles.backButton} onClick={() => setComposer(false)}>← Finding detail</button>
                      <div className={styles.briefTitle}>
                        <span><BriefcaseBusiness size={17} /> Draft brief</span>
                        <b className={ready ? styles.readyBadge : ""}>{ready ? "Ready for review" : "Not executable"}</b>
                      </div>
                      <h2>Reduce Circle issuer concentration</h2>
                      <p className={styles.panelDescription}>A review artifact for Northstar signers. Harbor cannot execute this action.</p>

                      <label className={styles.field}>
                        <span>Move amount</span>
                        <div><b>$</b><input type="number" min={0} max={5910} value={amount} onChange={(e) => setAmount(Number(e.target.value))} /><em>k</em></div>
                        <small>Minimum suggested: $771k · available: $5.91m</small>
                      </label>

                      <div className={styles.routeBox}>
                        <div><span className={styles.token}>U</span><p><small>From</small><b>USDC · Operating Safe</b></p></div>
                        <ArrowRight size={18} />
                        <div><span className={`${styles.token} ${styles.altToken}`}>T</span><p><small>To</small><b>USDT · Growth Safe</b></p></div>
                      </div>

                      <div className={styles.projection}>
                        <div><span>Issuer exposure after draft</span><strong>{projected.toFixed(1)}%</strong></div>
                        <PolicyBar metric={46} warning={35} limit={40} projected={projected} />
                        <small>Projection uses the fixed seeded snapshot and excludes fees, slippage, and price movement.</small>
                      </div>

                      <label className={styles.field}>
                        <span>Rationale for signers</span>
                        <textarea value={rationale} onChange={(e) => setRationale(e.target.value)} rows={3} />
                      </label>

                      <div className={styles.briefMeta}>
                        <span><Clock3 size={14} /> Expires in 24h</span>
                        <span><Building2 size={14} /> 2-of-3 Safe review</span>
                      </div>

                      <button className={styles.primaryButton} onClick={() => setReady(true)}>
                        {ready ? <><Check size={16} /> Brief ready</> : <>Mark ready for signer review <ArrowRight size={16} /></>}
                      </button>
                      <button className={styles.secondaryButton}>Copy review summary</button>
                      <p className={styles.noExecute}><ShieldCheck size={14} /> No wallet permission or signature requested</p>
                    </div>
                  )}
                </aside>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
