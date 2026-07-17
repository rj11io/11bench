"use client"

import { useEffect, useMemo, useState } from "react"
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Database,
  FileText,
  Filter,
  Gauge,
  Landmark,
  Layers3,
  LockKeyhole,
  Menu,
  Network,
  PanelRightOpen,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  WalletCards,
  X,
  Zap,
} from "lucide-react"
import styles from "./cairn.module.css"

type View = "overview" | "liquidity" | "controls" | "reconciliation" | "reports"
type Scenario = "base" | "shock10" | "shock20" | "shock30"

type Wallet = {
  id: string
  name: string
  network: string
  purpose: string
  custody: string
  total: number
  spendable: number
  reserved: number
  pending: number
  locked: number
  health: "Within policy" | "Review" | "Breach"
  source: string
  updated: string
  note: string
}

type ReviewItem = {
  id: string
  severity: "high" | "medium" | "info"
  eyebrow: string
  title: string
  detail: string
  time: string
  action: string
}

const wallets: Wallet[] = [
  {
    id: "base-ops",
    name: "Operations wallet",
    network: "Base",
    purpose: "Vendor settlement",
    custody: "Fireblocks vault",
    total: 1184200,
    spendable: 312400,
    reserved: 640000,
    pending: 26800,
    locked: 205000,
    health: "Review",
    source: "Fireblocks snapshot",
    updated: "09:39 UTC",
    note: "Spendable stablecoins are below the configured 30-day floor after two scheduled vendor runs.",
  },
  {
    id: "eth-treasury",
    name: "Treasury vault",
    network: "Ethereum",
    purpose: "Strategic reserve",
    custody: "Multisig · 3 of 5",
    total: 1648200,
    spendable: 0,
    reserved: 0,
    pending: 0,
    locked: 1648200,
    health: "Within policy",
    source: "Public address snapshot",
    updated: "09:41 UTC",
    note: "ETH reserve is held outside the operating cash policy and is excluded from spendable coverage.",
  },
  {
    id: "coinbase-usdc",
    name: "Settlement account",
    network: "Coinbase",
    purpose: "Fiat on-ramp",
    custody: "Exchange account",
    total: 742100,
    spendable: 742100,
    reserved: 0,
    pending: 0,
    locked: 0,
    health: "Within policy",
    source: "Coinbase Prime export",
    updated: "09:42 UTC",
    note: "USD equivalent from last provider snapshot; this is not a bank balance or a live quote.",
  },
  {
    id: "arb-payments",
    name: "Payments hot wallet",
    network: "Arbitrum",
    purpose: "Customer payouts",
    custody: "MPC hot vault",
    total: 486500,
    spendable: 426500,
    reserved: 60000,
    pending: 0,
    locked: 0,
    health: "Breach",
    source: "Fireblocks snapshot",
    updated: "09:37 UTC",
    note: "Hot wallet concentration is 22.1%, above the 18% policy cap for this operating entity.",
  },
]

const reviewItems: ReviewItem[] = [
  {
    id: "hot-cap",
    severity: "high",
    eyebrow: "Policy breach · Arbitrum",
    title: "Hot wallet concentration above cap",
    detail: "Payments hot wallet is 22.1% of spendable liquidity. Policy limit is 18%.",
    time: "12 min ago",
    action: "Review allocation",
  },
  {
    id: "base-floor",
    severity: "medium",
    eyebrow: "Liquidity floor · Base",
    title: "Vendor wallet below 30-day floor",
    detail: "$312.4k spendable vs. $350k required after scheduled outflows.",
    time: "28 min ago",
    action: "Open wallet",
  },
  {
    id: "unmatched",
    severity: "info",
    eyebrow: "Reconciliation · Coinbase",
    title: "One movement needs a label",
    detail: "0.48 ETH transfer has no accounting purpose in the latest export.",
    time: "1h ago",
    action: "Label movement",
  },
]

const activity = [
  { time: "09:38", asset: "USDC", amount: "$84,200", from: "Settlement account", to: "Vendor batch · 14 recipients", status: "Pending review", tone: "amber" },
  { time: "08:55", asset: "ETH", amount: "0.48 ETH", from: "Treasury vault", to: "0x7A…91c2", status: "Unmatched", tone: "coral" },
  { time: "Yesterday", asset: "USDC", amount: "$120,000", from: "Settlement account", to: "Payroll reserve", status: "Approved", tone: "blue" },
]

const nav = [
  { id: "overview" as View, label: "Overview", icon: BarChart3 },
  { id: "liquidity" as View, label: "Liquidity map", icon: Layers3 },
  { id: "controls" as View, label: "Controls", icon: SlidersHorizontal },
  { id: "reconciliation" as View, label: "Reconciliation", icon: ClipboardCheck },
  { id: "reports" as View, label: "Reports", icon: FileText },
]

function formatMoney(value: number, digits = 1) {
  if (Math.abs(value) >= 1000000) return `$${(value / 1000000).toFixed(digits)}m`
  return `$${Math.round(value / 1000)}k`
}

function LogoMark() {
  return (
    <div className={styles.logoMark} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  )
}

function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "amber" | "coral" | "mint" | "blue" }) {
  return <span className={`${styles.statusPill} ${styles[`status${tone[0].toUpperCase()}${tone.slice(1)}`]}`}>{children}</span>
}

function MiniStack({ wallet }: { wallet: Wallet }) {
  const total = Math.max(wallet.total, 1)
  return (
    <div className={styles.miniStack} aria-label={`${wallet.name}: ${formatMoney(wallet.spendable)} spendable, ${formatMoney(wallet.reserved)} reserved, ${formatMoney(wallet.pending)} pending, ${formatMoney(wallet.locked)} locked`}>
      <span style={{ width: `${(wallet.spendable / total) * 100}%` }} className={styles.stackSpendable} />
      <span style={{ width: `${(wallet.reserved / total) * 100}%` }} className={styles.stackReserved} />
      <span style={{ width: `${(wallet.pending / total) * 100}%` }} className={styles.stackPending} />
      <span style={{ width: `${(wallet.locked / total) * 100}%` }} className={styles.stackLocked} />
    </div>
  )
}

function ScenarioChart({ scenario }: { scenario: Scenario }) {
  const values: Record<Scenario, number[]> = {
    base: [72, 69, 67, 64, 62, 60, 58, 57, 55, 54, 52, 50],
    shock10: [69, 65, 62, 59, 55, 52, 50, 48, 46, 44, 42, 40],
    shock20: [65, 60, 56, 52, 47, 44, 41, 38, 35, 33, 30, 28],
    shock30: [61, 55, 49, 44, 38, 33, 29, 25, 22, 19, 17, 15],
  }
  const points = values[scenario].map((value, index) => `${index * 32},${116 - value * 1.15}`).join(" ")
  const last = values[scenario][values[scenario].length - 1]
  return (
    <div className={styles.chartWrap}>
      <div className={styles.chartLegend}>
        <span><i className={styles.legendLine} /> coverage under scenario</span>
        <span><i className={styles.legendFloor} /> policy floor</span>
      </div>
      <svg viewBox="0 0 352 136" role="img" aria-label={`Coverage scenario ending at ${last} percent`} className={styles.chart} preserveAspectRatio="none">
        <defs>
          <linearGradient id="cairnFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#75a7ff" stopOpacity=".28" />
            <stop offset="100%" stopColor="#75a7ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" x2="352" y1="81" y2="81" stroke="#d69645" strokeDasharray="4 4" />
        <polygon points={`0,136 ${points} 352,136`} fill="url(#cairnFill)" />
        <polyline points={points} fill="none" stroke="#75a7ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="352" cy={116 - last * 1.15} r="4.5" fill="#f8fafc" stroke="#75a7ff" strokeWidth="3" />
      </svg>
      <div className={styles.chartAxis}><span>Today</span><span>2w</span><span>4w</span><span>6w</span><span>8w</span></div>
    </div>
  )
}

export default function CairnPage() {
  const [view, setView] = useState<View>("overview")
  const [scenario, setScenario] = useState<Scenario>("base")
  const [network, setNetwork] = useState("All networks")
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)
  const [reviewed, setReviewed] = useState<string[]>([])
  const [toast, setToast] = useState("")
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem("cairn-reviewed")
    if (saved) {
      window.setTimeout(() => setReviewed(JSON.parse(saved) as string[]), 0)
    }
  }, [])

  const openItems = reviewItems.filter((item) => !reviewed.includes(item.id))
  const filteredWallets = network === "All networks" ? wallets : wallets.filter((wallet) => wallet.network === network)
  const scenarioRunway = { base: "10.8", shock10: "8.9", shock20: "6.4", shock30: "4.1" }[scenario]
  const coverage = { base: 72, shock10: 61, shock20: 49, shock30: 37 }[scenario]
  const title = {
    overview: "Operating snapshot",
    liquidity: "Liquidity map",
    controls: "Control room",
    reconciliation: "Reconciliation",
    reports: "Evidence reports",
  }[view]

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(""), 3200)
  }

  function markReviewed(id: string) {
    const next = [...reviewed, id]
    setReviewed(next)
    window.localStorage.setItem("cairn-reviewed", JSON.stringify(next))
    notify("Review recorded locally · demo audit log updated")
  }

  const totalSpendable = useMemo(() => wallets.reduce((sum, wallet) => sum + wallet.spendable, 0), [])

  return (
    <main className={styles.appShell}>
      <aside className={`${styles.sidebar} ${mobileNav ? styles.sidebarOpen : ""}`}>
        <div className={styles.brand}><LogoMark /><div><strong>cairn</strong><span>treasury control</span></div><button className={styles.closeNav} onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={16} /></button></div>
        <div className={styles.entityPicker}><span className={styles.entityDot} /><div><small>Workspace</small><strong>Northstar Labs</strong></div><ChevronDown size={14} /></div>
        <nav className={styles.primaryNav} aria-label="Primary navigation">
          <span className={styles.navLabel}>Workspace</span>
          {nav.map((item) => { const Icon = item.icon; return <button key={item.id} className={`${styles.navItem} ${view === item.id ? styles.navActive : ""}`} onClick={() => { setView(item.id); setMobileNav(false) }}><Icon size={17} strokeWidth={1.8} /><span>{item.label}</span>{item.id === "overview" && openItems.length > 0 && <b>{openItems.length}</b>}</button> })}
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.sourceStatus}><span className={styles.pulse} /><div><strong>4 sources synced</strong><span>Last check 09:42 UTC</span></div><RefreshCw size={14} /></div>
          <button className={styles.navItem}><Settings2 size={17} strokeWidth={1.8} /><span>Settings</span></button>
          <div className={styles.userBlock}><div className={styles.avatar}>AM</div><div><strong>Alex Morgan</strong><span>Finance lead</span></div><MoreDots /></div>
        </div>
      </aside>

      <section className={styles.content}>
        <header className={styles.topbar}>
          <button className={styles.mobileMenu} onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={19} /></button>
          <div className={styles.breadcrumb}><span>Northstar Labs</span><span>/</span><strong>{title}</strong></div>
          <div className={styles.topActions}><div className={styles.demoBadge}><span /> Demo data</div><button className={styles.iconButton} aria-label="Search"><Search size={17} /></button><button className={styles.iconButton} aria-label="Notifications"><Bell size={17} /><i /></button><button className={styles.helpButton}><CircleHelp size={15} /> Help</button></div>
        </header>

        <div className={styles.pageBody}>
          <div className={styles.mobileTitle}><div><span className={styles.kicker}>THU, 16 JUL 2026 · MORNING REVIEW</span><h1>{title}</h1></div><button className={styles.moreButton}><MoreDots /></button></div>
          <div className={styles.contextBar}><div className={styles.contextCopy}><Database size={15} /><span>Illustrative workspace · no wallets connected</span><button onClick={() => notify("Read-only connection flow is disabled in this demo")}>Learn about sources</button></div><div className={styles.asOf}><Clock3 size={14} /> Snapshot as of 09:42 UTC <span>·</span> refreshed 3m ago</div></div>

          {view === "overview" && <>
            <div className={styles.pageHeading}><div><span className={styles.kicker}>THU, 16 JUL 2026 · MORNING REVIEW</span><h1>Operating snapshot</h1><p>What can move today, and what needs a decision first.</p></div><div className={styles.headingActions}><button className={styles.secondaryButton} onClick={() => notify("Snapshot export queued · demo only")}><FileText size={15} /> Export snapshot</button><button className={styles.primaryButton} onClick={() => notify("Read-only connection flow is disabled in this demo")}><Zap size={15} /> Connect source</button></div></div>
            <section className={styles.metricGrid} aria-label="Treasury summary">
              <article className={`${styles.metricCard} ${styles.metricHero}`}><div className={styles.cardTop}><span>Spendable liquidity <InfoDot /></span><StatusPill tone="blue">Derived</StatusPill></div><div className={styles.metricValue}>{formatMoney(totalSpendable, 2)}</div><div className={styles.metricSub}><ArrowUpRight size={14} /> 4.8% vs. previous snapshot <span>·</span> USD equivalent</div><div className={styles.metricFoot}><span>Gross tracked value</span><strong>$4.06m</strong></div></article>
              <article className={styles.metricCard}><div className={styles.cardTop}><span>Coverage</span><StatusPill tone="amber">Review</StatusPill></div><div className={styles.metricValue}>{scenarioRunway}<small>w</small></div><div className={styles.coverageBar}><span style={{ width: `${coverage}%` }} /><i /></div><div className={styles.metricSub}>30-day floor <strong>$1.09m</strong><span>·</span> {coverage}% covered</div><div className={styles.metricFoot}><span>Forecast burn</span><strong>$258k / wk</strong></div></article>
              <article className={styles.metricCard}><div className={styles.cardTop}><span>Safe to release</span><StatusPill tone="mint">Within plan</StatusPill></div><div className={styles.metricValue}>$142<small>k</small></div><div className={styles.metricSub}>After reserve floor + pending outflows</div><div className={styles.metricFoot}><span>Next review</span><strong>in 3 days</strong></div></article>
            </section>

            <div className={styles.mainGrid}>
              <section className={styles.panel}>
                <div className={styles.panelHeader}><div><div className={styles.panelTitle}><h2>Liquidity by source</h2><InfoDot /></div><p>Observed balances, bucketed by spendability</p></div><div className={styles.filterGroup}><Filter size={14} />{["All networks", "Base", "Ethereum", "Coinbase", "Arbitrum"].map((item) => <button key={item} className={network === item ? styles.filterActive : ""} onClick={() => setNetwork(item)}>{item}</button>)}</div></div>
                <div className={styles.bucketLegend}><span><i className={styles.dotBlue} /> Spendable</span><span><i className={styles.dotViolet} /> Reserved</span><span><i className={styles.dotAmber} /> Pending</span><span><i className={styles.dotSlate} /> Locked</span></div>
                <div className={styles.walletTable} role="table" aria-label="Liquidity by source">
                  <div className={styles.tableHead} role="row"><span>Source / purpose</span><span>Distribution</span><span>Spendable</span><span>Total</span><span>Status</span><span /></div>
                  {filteredWallets.map((wallet) => <button className={styles.tableRow} key={wallet.id} onClick={() => setSelectedWallet(wallet)} role="row"><span className={styles.walletIdentity}><span className={styles.networkIcon}><Network size={15} /></span><span><strong>{wallet.name}</strong><small>{wallet.network} · {wallet.purpose}</small></span></span><span><MiniStack wallet={wallet} /></span><span className={styles.amountStrong}>{formatMoney(wallet.spendable)}</span><span className={styles.amount}>{formatMoney(wallet.total)}</span><span><StatusPill tone={wallet.health === "Breach" ? "coral" : wallet.health === "Review" ? "amber" : "mint"}>{wallet.health}</StatusPill></span><PanelRightOpen size={16} /></button>)}
                </div>
                <button className={styles.tableFooter} onClick={() => setView("liquidity")}>View full liquidity map <ArrowUpRight size={14} /></button>
              </section>

              <aside className={styles.decisionRail}>
                <section className={styles.panel}>
                  <div className={styles.panelHeader}><div><div className={styles.panelTitle}><h2>Decision queue</h2><span className={styles.queueCount}>{openItems.length}</span></div><p>Items that need a human call</p></div><button className={styles.textButton} onClick={() => setView("controls")}>Manage</button></div>
                  <div className={styles.queue}>{openItems.length === 0 ? <div className={styles.emptyState}><CheckCircle2 size={22} /><strong>Queue is clear</strong><span>No unresolved treasury reviews.</span></div> : openItems.map((item) => <div className={styles.queueItem} key={item.id}><div className={`${styles.severity} ${styles[`severity${item.severity[0].toUpperCase()}${item.severity.slice(1)}`]}`}><AlertTriangle size={14} /></div><div className={styles.queueCopy}><span>{item.eyebrow}</span><strong>{item.title}</strong><p>{item.detail}</p><button onClick={() => item.id === "base-floor" ? setSelectedWallet(wallets[0]) : markReviewed(item.id)}>{item.action} <ArrowUpRight size={13} /></button></div><button className={styles.dismissButton} aria-label={`Mark ${item.title} reviewed`} onClick={() => markReviewed(item.id)}><Check size={15} /></button></div>)}</div>
                </section>
                <section className={`${styles.panel} ${styles.guardrailPanel}`}><div className={styles.panelHeader}><div><div className={styles.panelTitle}><h2>Policy guardrails</h2><ShieldCheck size={15} /></div><p>Configured for Northstar Labs</p></div><button className={styles.iconButton} aria-label="Policy settings" onClick={() => setView("controls")}><Settings2 size={15} /></button></div><div className={styles.guardrails}><Guardrail label="Stablecoin floor" value="$1.09m" progress={78} status="On track" /><Guardrail label="Hot wallet cap" value="18%" progress={92} status="22.1% observed" danger /><Guardrail label="Approval threshold" value="$50k" progress={64} status="3 pending" /></div><button className={styles.tableFooter} onClick={() => setView("controls")}>Open control settings <ArrowUpRight size={14} /></button></section>
              </aside>
            </div>

            <div className={styles.lowerGrid}>
              <section className={styles.panel}><div className={styles.panelHeader}><div><div className={styles.panelTitle}><h2>Coverage scenario</h2><StatusPill tone="blue">Derived only</StatusPill></div><p>What happens if volatile assets move against the plan?</p></div><div className={styles.scenarioSelect}><select value={scenario} onChange={(event) => setScenario(event.target.value as Scenario)} aria-label="Choose scenario"><option value="base">Base plan</option><option value="shock10">10% asset shock</option><option value="shock20">20% asset shock</option><option value="shock30">30% asset shock</option></select><ChevronDown size={14} /></div></div><div className={styles.scenarioHeadline}><strong>{scenarioRunway} weeks</strong><span>projected coverage at week 8</span><span className={scenario === "base" ? styles.scenarioDeltaBlue : styles.scenarioDeltaRed}>{scenario === "base" ? "Stable plan" : `${scenario.replace("shock", "")} drawdown`}</span></div><ScenarioChart scenario={scenario} /><div className={styles.disclosure}><CircleHelp size={13} /> Scenario applies to volatile asset value and forecast burn. Observed balances remain unchanged.</div></section>
              <section className={styles.panel}><div className={styles.panelHeader}><div><div className={styles.panelTitle}><h2>Recent activity</h2><StatusPill tone="neutral">Last 24h</StatusPill></div><p>Movement states from connected snapshots</p></div><button className={styles.textButton} onClick={() => setView("reconciliation")}>View all</button></div><div className={styles.activityList}>{activity.map((item) => <div className={styles.activityRow} key={`${item.time}-${item.asset}`}><span className={`${styles.activityIcon} ${item.tone === "coral" ? styles.activityCoral : item.tone === "amber" ? styles.activityAmber : styles.activityBlue}`}>{item.tone === "coral" ? <ArrowUpRight size={14} /> : item.tone === "amber" ? <Clock3 size={14} /> : <ArrowDownRight size={14} />}</span><div><strong>{item.asset} <span>{item.amount}</span></strong><p>{item.from} <ArrowUpRight size={11} /> {item.to}</p></div><div className={styles.activityMeta}><StatusPill tone={item.tone === "coral" ? "coral" : item.tone === "amber" ? "amber" : "blue"}>{item.status}</StatusPill><small>{item.time}</small></div></div>)}</div></section>
            </div>
          </>}

          {view !== "overview" && <SubView view={view} wallets={filteredWallets} onWallet={setSelectedWallet} onBack={() => setView("overview")} onToast={notify} network={network} setNetwork={setNetwork} openItems={openItems.length} />}
        </div>
      </section>

      {selectedWallet && <div className={styles.drawerBackdrop} onClick={() => setSelectedWallet(null)}><aside className={styles.drawer} onClick={(event) => event.stopPropagation()}><div className={styles.drawerHeader}><div><span className={styles.kicker}>{selectedWallet.network} · {selectedWallet.custody}</span><h2>{selectedWallet.name}</h2></div><button className={styles.iconButton} onClick={() => setSelectedWallet(null)} aria-label="Close wallet details"><X size={18} /></button></div><div className={styles.drawerCallout}><div className={selectedWallet.health === "Breach" ? styles.calloutCoral : selectedWallet.health === "Review" ? styles.calloutAmber : styles.calloutBlue}><Gauge size={17} /></div><div><strong>{selectedWallet.health}</strong><p>{selectedWallet.note}</p></div></div><div className={styles.detailList}><Detail label="Purpose" value={selectedWallet.purpose} /><Detail label="Source" value={selectedWallet.source} /><Detail label="Last observed" value={selectedWallet.updated} /><Detail label="Read permission" value="Public balance only" /><Detail label="Policy bucket" value={selectedWallet.spendable > 0 ? "Operating liquidity" : "Strategic reserve"} /></div><div className={styles.drawerSection}><span className={styles.kicker}>BALANCE BREAKDOWN</span><div className={styles.breakdown}><Breakdown label="Spendable" value={selectedWallet.spendable} tone="blue" /><Breakdown label="Reserved" value={selectedWallet.reserved} tone="violet" /><Breakdown label="Pending" value={selectedWallet.pending} tone="amber" /><Breakdown label="Locked" value={selectedWallet.locked} tone="slate" /></div></div><div className={styles.drawerFooter}><button className={styles.secondaryButton} onClick={() => notify("Source details are illustrative in this demo")}>Open source record</button><button className={styles.primaryButton} onClick={() => { setSelectedWallet(null); notify("Wallet review recorded locally") }}><Check size={15} /> Mark reviewed</button></div></aside></div>}
      {toast && <div className={styles.toast} role="status"><CheckCircle2 size={16} /> {toast}</div>}
    </main>
  )
}

function MoreDots() { return <span className={styles.moreDots}><i /><i /><i /></span> }
function InfoDot() { return <span className={styles.infoDot}>i</span> }
function Guardrail({ label, value, progress, status, danger = false }: { label: string; value: string; progress: number; status: string; danger?: boolean }) { return <div className={styles.guardrail}><div><span>{label}</span><strong>{value}</strong></div><div className={styles.guardrailTrack}><span style={{ width: `${progress}%` }} className={danger ? styles.guardrailDanger : ""} /></div><small className={danger ? styles.dangerText : ""}>{status}</small></div> }
function Detail({ label, value }: { label: string; value: string }) { return <div className={styles.detailRow}><span>{label}</span><strong>{value}</strong></div> }
function Breakdown({ label, value, tone }: { label: string; value: number; tone: string }) { return <div className={styles.breakdownRow}><span><i className={`${styles[`dot${tone[0].toUpperCase()}${tone.slice(1)}`]}`} /> {label}</span><strong>{formatMoney(value)}</strong></div> }

function SubView({ view, wallets, onWallet, onBack, onToast, network, setNetwork, openItems }: { view: Exclude<View, "overview">; wallets: Wallet[]; onWallet: (wallet: Wallet) => void; onBack: () => void; onToast: (message: string) => void; network: string; setNetwork: (value: string) => void; openItems: number }) {
  const copy = {
    liquidity: { kicker: "OBSERVED SOURCES", title: "Liquidity map", body: "A source-level view of what is spendable, reserved, pending, and locked." },
    controls: { kicker: "POLICY ENGINE", title: "Control room", body: "Guardrails make the operating envelope explicit before money moves." },
    reconciliation: { kicker: "CLOSE READINESS", title: "Reconciliation", body: "Trace observed holdings and movements to an accounting-ready state." },
    reports: { kicker: "EVIDENCE TRAIL", title: "Evidence reports", body: "A reviewable snapshot for finance, security, and the next board packet." },
  }[view]
  return <><div className={styles.pageHeading}><div><span className={styles.kicker}>{copy.kicker}</span><h1>{copy.title}</h1><p>{copy.body}</p></div><div className={styles.headingActions}><button className={styles.secondaryButton} onClick={onBack}><ArrowDownRight size={15} /> Back to overview</button><button className={styles.primaryButton} onClick={() => onToast("This route is illustrative · no backend connected")}><Sparkles size={15} /> {view === "reports" ? "Generate report" : "Run check"}</button></div></div>{view === "liquidity" && <section className={styles.panel}><div className={styles.panelHeader}><div><div className={styles.panelTitle}><h2>All tracked sources</h2><StatusPill tone="blue">Read-only</StatusPill></div><p>Four illustrative sources · no live balances</p></div><div className={styles.filterGroup}><Filter size={14} />{["All networks", "Base", "Ethereum", "Coinbase", "Arbitrum"].map((item) => <button key={item} className={network === item ? styles.filterActive : ""} onClick={() => setNetwork(item)}>{item}</button>)}</div></div><div className={styles.liquiditySummary}><StatBlock label="Spendable" value="$1.48m" sub="36.4% of tracked" tone="blue" /><StatBlock label="Reserved" value="$700k" sub="Scheduled obligations" tone="violet" /><StatBlock label="Pending" value="$26.8k" sub="Needs finality" tone="amber" /><StatBlock label="Locked" value="$1.85m" sub="Excluded by policy" tone="slate" /></div><div className={styles.walletTable}>{<div className={styles.tableHead}><span>Source / purpose</span><span>Distribution</span><span>Spendable</span><span>Total</span><span>Status</span><span /></div>}{wallets.map((wallet) => <button className={styles.tableRow} key={wallet.id} onClick={() => onWallet(wallet)}><span className={styles.walletIdentity}><span className={styles.networkIcon}><Network size={15} /></span><span><strong>{wallet.name}</strong><small>{wallet.network} · {wallet.purpose}</small></span></span><span><MiniStack wallet={wallet} /></span><span className={styles.amountStrong}>{formatMoney(wallet.spendable)}</span><span className={styles.amount}>{formatMoney(wallet.total)}</span><span><StatusPill tone={wallet.health === "Breach" ? "coral" : wallet.health === "Review" ? "amber" : "mint"}>{wallet.health}</StatusPill></span><PanelRightOpen size={16} /></button>)}</div></section>}{view === "controls" && <div className={styles.controlGrid}><section className={styles.panel}><div className={styles.panelHeader}><div><div className={styles.panelTitle}><h2>Guardrails</h2><ShieldCheck size={15} /></div><p>Rules are evaluated against the latest snapshot.</p></div></div><div className={styles.guardrailLarge}><Guardrail label="Stablecoin floor" value="$1.09m" progress={78} status="Current spendable $1.48m" /><Guardrail label="Hot wallet cap" value="18%" progress={92} status="Observed 22.1% · breach" danger /><Guardrail label="Approval threshold" value="$50k" progress={64} status="3 movements pending" /><Guardrail label="Stale source SLA" value="30 min" progress={21} status="All within freshness window" /></div></section><section className={styles.panel}><div className={styles.panelHeader}><div><div className={styles.panelTitle}><h2>Source permissions</h2><LockKeyhole size={15} /></div><p>Every connection is read-only in this demo.</p></div></div><div className={styles.permissionList}><Permission icon={<WalletCards size={16} />} name="Public address snapshots" status="4 connected" /><Permission icon={<Landmark size={16} />} name="Custodian exports" status="2 connected" /><Permission icon={<Database size={16} />} name="Accounting ledger" status="Not connected" muted /></div><button className={styles.secondaryButton} onClick={() => onToast("Connection wizard is disabled in the demo")}>Connect read-only source</button></section></div>}{view === "reconciliation" && <div className={styles.reconGrid}><section className={styles.panel}><div className={styles.panelHeader}><div><div className={styles.panelTitle}><h2>Close readiness</h2><StatusPill tone="amber">2 items open</StatusPill></div><p>Latest snapshot · 16 Jul 2026</p></div><button className={styles.textButton} onClick={() => onToast("Export is illustrative in the demo")}>Export evidence</button></div><div className={styles.reconScore}><div className={styles.scoreRing}><strong>92</strong><span>/100</span></div><div><strong>Good control, two follow-ups</strong><p>Most holdings have a source and purpose. One transfer is unmatched and one hot-wallet allocation is over policy.</p></div></div><div className={styles.reconRows}><ReconRow label="Holdings matched" value="18 / 18" tone="mint" /><ReconRow label="Movements labeled" value="41 / 42" tone="amber" /><ReconRow label="Sources fresh" value="4 / 4" tone="mint" /><ReconRow label="Policy exceptions" value={`${openItems} open`} tone="coral" /></div></section><section className={styles.panel}><div className={styles.panelHeader}><div><div className={styles.panelTitle}><h2>Unmatched movements</h2><span className={styles.queueCount}>1</span></div><p>Needs a purpose before close.</p></div></div><div className={styles.unmatched}><div className={styles.activityIcon + " " + styles.activityCoral}><ArrowUpRight size={14} /></div><div><strong>0.48 ETH <span>· 16 Jul, 08:55</span></strong><p>Treasury vault <ArrowUpRight size={11} /> 0x7A…91c2</p><button onClick={() => onToast("Label editor is illustrative in the demo")}>Assign purpose <ArrowUpRight size={13} /></button></div></div></section></div>}{view === "reports" && <div className={styles.reportGrid}><ReportCard icon={<FileText size={18} />} title="Morning treasury snapshot" detail="Coverage, sources, and open exceptions" date="Today · 09:42 UTC" action="Preview" onToast={onToast} /><ReportCard icon={<BookOpen size={18} />} title="Monthly close packet" detail="Holdings, movements, and review trail" date="30 Jun 2026 · archived" action="View packet" onToast={onToast} /><ReportCard icon={<ShieldCheck size={18} />} title="Policy evidence" detail="Rules, approvals, and source permissions" date="Policy version 0.8" action="Preview" onToast={onToast} /></div>}</>
}
function StatBlock({ label, value, sub, tone }: { label: string; value: string; sub: string; tone: string }) { return <div className={styles.statBlock}><i className={`${styles[`dot${tone[0].toUpperCase()}${tone.slice(1)}`]}`} /><span>{label}</span><strong>{value}</strong><small>{sub}</small></div> }
function Permission({ icon, name, status, muted = false }: { icon: React.ReactNode; name: string; status: string; muted?: boolean }) { return <div className={styles.permission}><span className={muted ? styles.permissionIconMuted : styles.permissionIcon}>{icon}</span><div><strong>{name}</strong><small>{status}</small></div><CheckCircle2 size={15} className={muted ? styles.muted : styles.checkIcon} /></div> }
function ReconRow({ label, value, tone }: { label: string; value: string; tone: string }) { return <div className={styles.reconRow}><span>{label}</span><strong>{value}</strong><StatusPill tone={tone === "coral" ? "coral" : tone === "amber" ? "amber" : "mint"}>{tone === "coral" ? "Review" : tone === "amber" ? "Review" : "Clear"}</StatusPill></div> }
function ReportCard({ icon, title, detail, date, action, onToast }: { icon: React.ReactNode; title: string; detail: string; date: string; action: string; onToast: (message: string) => void }) { return <article className={styles.reportCard}><div className={styles.reportIcon}>{icon}</div><div><span className={styles.kicker}>DEMO REPORT</span><h2>{title}</h2><p>{detail}</p><small>{date}</small></div><button className={styles.secondaryButton} onClick={() => onToast(`${action} is illustrative in the demo`)}>{action} <ArrowUpRight size={14} /></button></article> }
