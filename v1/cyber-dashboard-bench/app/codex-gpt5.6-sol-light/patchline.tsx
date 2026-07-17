"use client"

import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  Boxes,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  Database,
  ExternalLink,
  FileCheck2,
  Gauge,
  LayoutDashboard,
  Menu,
  Network,
  Radar,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TicketCheck,
  UserRound,
  UsersRound,
  X,
  Zap,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import styles from "./patchline.module.css"

type Status = "Needs decision" | "In progress" | "Mitigated" | "Resolved"
type Band = "Act now" | "Attend" | "Track"
type Owner = "Unassigned" | "Edge Platform" | "Payments SRE" | "Data Platform"

type Exposure = {
  id: string
  cve: string
  title: string
  band: Band
  status: Status
  owner: Owner
  due: string
  overdue?: boolean
  assets: number
  effort: number
  reason: string
  service: string
  epss: string
  cvss: string
  kev: boolean
  path: string[]
  fix: string
}

const seed: Exposure[] = [
  {
    id: "exp-01",
    cve: "CVE-2026-21704",
    title: "Remote code execution in edge gateway",
    band: "Act now",
    status: "Needs decision",
    owner: "Unassigned",
    due: "6h",
    overdue: true,
    assets: 3,
    effort: 4,
    reason: "New KEV · public path to checkout",
    service: "Checkout API",
    epss: "94.2%",
    cvss: "9.8",
    kev: true,
    path: ["Internet", "edge-gw-03", "checkout-role", "Customer PII"],
    fix: "Upgrade EdgeGate to 8.4.3, rotate the gateway token, then validate the public health endpoint and authenticated checkout flow.",
  },
  {
    id: "exp-02",
    cve: "CVE-2025-55182",
    title: "Privilege escalation in container runtime",
    band: "Act now",
    status: "In progress",
    owner: "Payments SRE",
    due: "18h",
    assets: 12,
    effort: 7,
    reason: "Reachable workload · payment authority",
    service: "Payments Core",
    epss: "71.8%",
    cvss: "8.8",
    kev: false,
    path: ["Partner VPN", "pay-node pool", "runtime socket", "Payment keys"],
    fix: "Roll the patched runtime image through the payment node pool and confirm socket permissions before restoring full capacity.",
  },
  {
    id: "exp-03",
    cve: "CVE-2026-10971",
    title: "Authentication bypass in admin console",
    band: "Attend",
    status: "Needs decision",
    owner: "Edge Platform",
    due: "2d",
    assets: 1,
    effort: 2,
    reason: "High exploit probability · access limited by VPN",
    service: "Admin Console",
    epss: "82.6%",
    cvss: "9.1",
    kev: false,
    path: ["Corporate VPN", "admin-console", "support role", "Tenant controls"],
    fix: "Deploy vendor hotfix AC-14 and require a fresh privileged session. Validate SSO and break-glass access.",
  },
  {
    id: "exp-04",
    cve: "CVE-2024-6387",
    title: "Signal handler race in OpenSSH",
    band: "Track",
    status: "Mitigated",
    owner: "Data Platform",
    due: "8d",
    assets: 28,
    effort: 10,
    reason: "Compensating control verified · no public path",
    service: "Analytics Grid",
    epss: "14.1%",
    cvss: "8.1",
    kev: false,
    path: ["Private subnet", "bastion", "analytics nodes", "Internal data"],
    fix: "Maintain the connection-rate control, then roll the patched OpenSSH package during the next maintenance window.",
  },
]

const owners: Owner[] = [
  "Unassigned",
  "Edge Platform",
  "Payments SRE",
  "Data Platform",
]

export default function Patchline() {
  const [items, setItems] = useState(seed)
  const [selectedId, setSelectedId] = useState(seed[0].id)
  const [filter, setFilter] = useState<"Active" | Band | "Resolved">("Active")
  const [query, setQuery] = useState("")
  const [mobileMenu, setMobileMenu] = useState(false)
  const [notice, setNotice] = useState("")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem("patchline-demo-v1")
      if (stored) {
        try {
          setItems(JSON.parse(stored) as Exposure[])
        } catch {
          window.localStorage.removeItem("patchline-demo-v1")
        }
      }
      setReady(true)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (ready) window.localStorage.setItem("patchline-demo-v1", JSON.stringify(items))
  }, [items, ready])

  const visible = useMemo(() => {
    const q = query.toLowerCase()
    return items.filter((item) => {
      const matchesFilter =
        filter === "Active"
          ? item.status !== "Resolved"
          : filter === "Resolved"
            ? item.status === "Resolved"
            : item.band === filter && item.status !== "Resolved"
      return (
        matchesFilter &&
        (!q ||
          `${item.cve} ${item.title} ${item.service} ${item.owner}`
            .toLowerCase()
            .includes(q))
      )
    })
  }, [items, filter, query])

  const selected = items.find((item) => item.id === selectedId) ?? items[0]
  const active = items.filter((item) => item.status !== "Resolved")
  const actNow = active.filter((item) => item.band === "Act now")
  const usedHours = active
    .filter((item) => item.status === "In progress")
    .reduce((sum, item) => sum + item.effort, 0)
  const unowned = actNow.filter((item) => item.owner === "Unassigned").length

  function updateSelected(patch: Partial<Exposure>, message: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === selected.id ? { ...item, ...patch } : item
      )
    )
    setNotice(message)
    window.setTimeout(() => setNotice(""), 3000)
  }

  function resetDemo() {
    setItems(seed)
    setSelectedId(seed[0].id)
    setFilter("Active")
    setNotice("Demo state reset")
  }

  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#main">Skip to main content</a>
      <aside className={`${styles.sidebar} ${mobileMenu ? styles.open : ""}`}>
        <div className={styles.brand}>
          <span className={styles.logo}><ShieldCheck size={19} /></span>
          <span>Patchline</span>
          <button className={styles.closeMenu} onClick={() => setMobileMenu(false)} aria-label="Close menu"><X size={20} /></button>
        </div>
        <div className={styles.workspace}>
          <span className={styles.workspaceMark}>N</span>
          <span><strong>Northstar Labs</strong><small>Demo workspace</small></span>
          <ChevronDown size={14} />
        </div>
        <nav className={styles.nav} aria-label="Primary">
          <a className={styles.navActive} href="#today"><LayoutDashboard size={17} />Today<span>4</span></a>
          <a href="#campaigns"><Target size={17} />Campaigns</a>
          <a href="#assets"><Boxes size={17} />Assets</a>
          <a href="#policy"><FileCheck2 size={17} />Policy</a>
        </nav>
        <p className={styles.navLabel}>Workspace</p>
        <nav className={styles.nav} aria-label="Workspace">
          <a href="#integrations"><Network size={17} />Integrations<span className={styles.goodDot} /></a>
          <a href="#activity"><Activity size={17} />Activity</a>
          <a href="#settings"><Settings2 size={17} />Settings</a>
        </nav>
        <div className={styles.sidebarFoot}>
          <div className={styles.sourceHealth}><span /><div><strong>Sources healthy</strong><small>4 synced · 09:42 UTC</small></div></div>
          <button onClick={resetDemo}>Reset demo state</button>
        </div>
      </aside>

      <main className={styles.main} id="main">
        <div className={styles.mobileHead}>
          <button onClick={() => setMobileMenu(true)} aria-label="Open menu"><Menu size={21} /></button>
          <div className={styles.brand}><span className={styles.logo}><ShieldCheck size={18} /></span>Patchline</div>
          <span className={styles.avatar}>RL</span>
        </div>
        <div className={styles.demoBar}>
          <span><Sparkles size={13} /> Demo data</span>
          <p>Seeded product simulation · no live scanning or ticketing</p>
          <time>Snapshot 16 Jul, 09:42 UTC</time>
        </div>
        <div className={styles.content}>
          <header className={styles.pageHeader} id="today">
            <div>
              <p className={styles.eyebrow}>THURSDAY · 16 JULY</p>
              <h1>Good morning, Ricardo.</h1>
              <p>{unowned > 0 ? `${unowned} urgent action needs an owner.` : "Every urgent action has an owner."} The queue fits this week’s capacity.</p>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.iconButton} aria-label="Search exposures" onClick={() => document.getElementById("queue-search")?.focus()}><Search size={18} /></button>
              <span className={styles.avatar}>RL</span>
            </div>
          </header>

          <section className={styles.metrics} aria-label="Portfolio metrics">
            <article className={styles.metricCard}>
              <div className={styles.metricTop}><span className={styles.alertIcon}><Zap size={16} /></span><small>ACT NOW</small><span className={styles.deltaBad}>+1 today</span></div>
              <strong>{actNow.length}</strong>
              <p>{unowned} unowned · 1 due in 6h</p>
            </article>
            <article className={styles.metricCard}>
              <div className={styles.metricTop}><span className={styles.tealIcon}><ArrowDownRight size={16} /></span><small>URGENT EXPOSURE DAYS</small><span className={styles.deltaGood}>−18%</span></div>
              <strong>46</strong>
              <p>Down 10 days this month</p>
            </article>
            <article className={styles.metricCard}>
              <div className={styles.metricTop}><span className={styles.blueIcon}><Gauge size={16} /></span><small>ACT-NOW SLA</small><span className={styles.deltaGood}>On track</span></div>
              <strong>91%</strong>
              <p>10 of 11 closed in policy</p>
            </article>
            <article className={styles.metricCard}>
              <div className={styles.metricTop}><span className={styles.amberIcon}><UsersRound size={16} /></span><small>WEEKLY CAPACITY</small><span>{usedHours}/24h</span></div>
              <strong>{Math.round((usedHours / 24) * 100)}%</strong>
              <div className={styles.capacity}><span style={{ width: `${Math.max(8, (usedHours / 24) * 100)}%` }} /></div>
            </article>
          </section>

          <section className={styles.workGrid}>
            <div className={styles.queuePanel}>
              <div className={styles.panelHeading}>
                <div><h2>Today’s decisions</h2><p>Ranked by urgency, impact, and remaining capacity.</p></div>
                <div className={styles.searchBox}><Search size={15} /><input id="queue-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search decisions" /></div>
              </div>
              <div className={styles.filters} aria-label="Filter decisions">
                {(["Active", "Act now", "Attend", "Track", "Resolved"] as const).map((option) => (
                  <button key={option} aria-pressed={filter === option} onClick={() => setFilter(option)}>
                    {option}
                    {option === "Active" && <span>{active.length}</span>}
                  </button>
                ))}
              </div>

              {visible.length === 0 ? (
                <div className={styles.empty}>
                  <span><Check size={22} /></span>
                  <h3>No decisions here</h3>
                  <p>{query ? "Try a broader search." : "There are no resolved items in this demo yet."}</p>
                  <button onClick={() => { setFilter("Active"); setQuery("") }}>Show active work</button>
                </div>
              ) : (
                <div className={styles.exposureList}>
                  {visible.map((item) => (
                    <button
                      key={item.id}
                      className={`${styles.exposureRow} ${selected.id === item.id ? styles.selectedRow : ""}`}
                      onClick={() => setSelectedId(item.id)}
                      aria-pressed={selected.id === item.id}
                    >
                      <span className={`${styles.bandMark} ${styles[item.band.replace(" ", "").toLowerCase()]}`} />
                      <span className={styles.rowMain}>
                        <span className={styles.rowMeta}><span className={`${styles.bandBadge} ${styles[item.band.replace(" ", "").toLowerCase()]}`}>{item.band === "Act now" ? <Zap size={11} /> : item.band === "Attend" ? <Clock3 size={11} /> : <Radar size={11} />}{item.band}</span><code>{item.cve}</code></span>
                        <strong>{item.title}</strong>
                        <small>{item.reason}</small>
                      </span>
                      <span className={styles.rowStat}><small>ASSETS</small><strong>{item.assets}</strong></span>
                      <span className={styles.rowStat}><small>OWNER</small><strong className={item.owner === "Unassigned" ? styles.ownerWarn : ""}>{item.owner === "Unassigned" ? <><AlertTriangle size={13} /> Unassigned</> : item.owner}</strong></span>
                      <span className={styles.rowStat}><small>DUE</small><strong className={item.overdue ? styles.dueWarn : ""}>{item.due}</strong></span>
                      <span className={styles.rowArrow}><ArrowRight size={17} /></span>
                    </button>
                  ))}
                </div>
              )}
              <div className={styles.queueFoot}>
                <span><CircleDot size={13} /> 4 of 1,284 grouped exposures shown</span>
                <span>Policy v3.2 · evaluated 3m ago</span>
              </div>
            </div>

            <aside className={styles.detailPanel} aria-label="Selected exposure detail">
              <div className={styles.detailHead}>
                <div className={styles.rowMeta}><span className={`${styles.bandBadge} ${styles[selected.band.replace(" ", "").toLowerCase()]}`}><Zap size={11} />{selected.band}</span><code>{selected.cve}</code></div>
                <h2>{selected.title}</h2>
                <p>Affects <strong>{selected.service}</strong> · {selected.assets} assets · estimated {selected.effort}h</p>
              </div>
              <div className={styles.whyBox}>
                <div className={styles.sectionLabel}><span><Sparkles size={14} /> Why now</span><small>HIGH CONFIDENCE</small></div>
                <p>{selected.reason}. A reachable path connects the vulnerable service to business-sensitive data.</p>
                <div className={styles.factorGrid}>
                  <span><small>EXPLOITATION</small><strong>{selected.kev ? "CISA KEV" : "Not in KEV"}</strong></span>
                  <span><small>EPSS · 30 DAYS</small><strong>{selected.epss}</strong></span>
                  <span><small>CVSS SEVERITY</small><strong>{selected.cvss}</strong></span>
                  <span><small>POLICY RESULT</small><strong>{selected.band}</strong></span>
                </div>
                <button className={styles.textButton}>View decision evidence <ArrowRight size={14} /></button>
              </div>

              <section className={styles.pathSection}>
                <div className={styles.sectionTitle}><h3>Reachable attack path</h3><span>Validated 12m ago</span></div>
                <div className={styles.path} aria-label={`Attack path: ${selected.path.join(" to ")}`}>
                  {selected.path.map((node, index) => (
                    <div key={node} className={styles.pathWrap}>
                      <span className={styles.pathNode}>{index === 0 ? <ExternalLink size={14} /> : index === selected.path.length - 1 ? <Database size={14} /> : <Boxes size={14} />}<small>{node}</small></span>
                      {index < selected.path.length - 1 && <ArrowRight size={14} />}
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.fixSection}>
                <div className={styles.sectionTitle}><h3>Owner-ready fix brief</h3><span><TicketCheck size={13} /> Draft</span></div>
                <p>{selected.fix}</p>
                <div className={styles.ownerControl}>
                  <label htmlFor="owner"><UserRound size={14} /> Owner</label>
                  <select id="owner" value={selected.owner} onChange={(event) => updateSelected({ owner: event.target.value as Owner }, `Owner set to ${event.target.value}`)}>
                    {owners.map((owner) => <option key={owner}>{owner}</option>)}
                  </select>
                </div>
              </section>

              <div className={styles.detailActions}>
                {selected.status === "Resolved" ? (
                  <button className={styles.primaryButton} disabled><Check size={16} /> Verified resolved</button>
                ) : selected.status === "In progress" ? (
                  <>
                    <button className={styles.primaryButton} onClick={() => updateSelected({ status: "Resolved" }, "Marked resolved in demo · awaiting real scanner verification")}><Check size={16} /> Mark resolved</button>
                    <button className={styles.secondaryButton} onClick={() => updateSelected({ status: "Mitigated" }, "Compensating control recorded")}>Record mitigation</button>
                  </>
                ) : (
                  <>
                    <button className={styles.primaryButton} onClick={() => updateSelected({ status: "In progress", owner: selected.owner === "Unassigned" ? "Edge Platform" : selected.owner }, "Remediation started in this demo")}><TicketCheck size={16} /> Start remediation</button>
                    <button className={styles.secondaryButton}>Request exception</button>
                  </>
                )}
              </div>
              <div className={styles.auditLine}><Activity size={13} /><span><strong>{selected.status}</strong> · decision refreshed 3m ago · source evidence current</span></div>
            </aside>
          </section>

          <section className={styles.lowerGrid}>
            <article className={styles.trendCard}>
              <div><p className={styles.eyebrow}>OUTCOME TREND</p><h2>Urgent exposure is burning down</h2><p>46 open exposure days, down from 73 six weeks ago.</p></div>
              <svg viewBox="0 0 400 92" role="img" aria-label="Urgent exposure days declined from 73 to 46 over six weeks">
                <defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5d62e8" stopOpacity=".22" /><stop offset="1" stopColor="#5d62e8" stopOpacity="0" /></linearGradient></defs>
                <path d="M5 18 C55 21 70 35 115 31 S175 48 210 44 S275 58 310 55 S355 70 395 68 L395 90 L5 90Z" fill="url(#fill)" />
                <path d="M5 18 C55 21 70 35 115 31 S175 48 210 44 S275 58 310 55 S355 70 395 68" fill="none" stroke="#5d62e8" strokeWidth="3" strokeLinecap="round" />
                <circle cx="395" cy="68" r="4" fill="#fff" stroke="#5d62e8" strokeWidth="3" />
              </svg>
            </article>
            <article className={styles.activityCard} id="activity">
              <div className={styles.sectionTitle}><h2>Recent movement</h2><button>View all</button></div>
              <ul>
                <li><span className={styles.activityIcon}><Check size={13} /></span><p><strong>Log4Shell campaign verified</strong><small>8 assets · scanner evidence · 28m ago</small></p></li>
                <li><span className={styles.activityIcon}><UserRound size={13} /></span><p><strong>Payments SRE accepted ownership</strong><small>CVE-2025-55182 · 1h ago</small></p></li>
                <li><span className={styles.activityIcon}><FileCheck2 size={13} /></span><p><strong>Policy v3.2 published</strong><small>Risk approver · yesterday</small></p></li>
              </ul>
            </article>
          </section>
        </div>
        <div className={styles.liveRegion} role="status" aria-live="polite">{notice}</div>
      </main>
      <nav className={styles.bottomNav} aria-label="Mobile navigation">
        <a className={styles.bottomActive} href="#today"><LayoutDashboard size={18} /><span>Today</span></a>
        <a href="#campaigns"><Target size={18} /><span>Campaigns</span></a>
        <a href="#assets"><Boxes size={18} /><span>Assets</span></a>
        <a href="#settings"><Settings2 size={18} /><span>More</span></a>
      </nav>
    </div>
  )
}
