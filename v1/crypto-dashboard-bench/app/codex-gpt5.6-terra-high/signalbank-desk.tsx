"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clipboard,
  Command,
  Database,
  Ellipsis,
  FileText,
  Layers3,
  LockKeyhole,
  Menu,
  MoveRight,
  Network,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  WalletCards,
} from "lucide-react";
import styles from "./signalbank.module.css";

type Scenario = "normal" | "peg" | "congestion";

const scenarios: Record<Scenario, { label: string; score: number; tone: string; title: string; detail: string; cost: string; available: string }> = {
  normal: { label: "Normal", score: 86, tone: "ready", title: "Ready with one watch item", detail: "Cash is within the issuer policy. Maintain the current split while monitoring USDT venue concentration.", cost: "0.08%", available: "$3.42m" },
  peg: { label: "Peg drift", score: 72, tone: "review", title: "Review before the next payout", detail: "USDT’s seeded composite quote is below the review band. Keep transfers staged until the deviation closes or the policy owner documents an exception.", cost: "0.31%", available: "$2.78m" },
  congestion: { label: "Chain congestion", score: 58, tone: "risk", title: "Reduce route dependency", detail: "Ethereum settlement is simulated as congested. Preserve a second route and avoid treating quoted depth as immediately executable.", cost: "0.68%", available: "$1.96m" },
};

const pegPoints = [1.0001, 1.0000, 1.0003, 0.9999, 1.0002, 1.0001, 0.9998, 1.0000, 0.9997, 0.9995, 0.9996, 0.9994, 0.9993, 0.9995, 0.9992, 0.9994, 0.9996, 0.9995, 0.9997, 0.9996];

function Dollar({ value }: { value: number }) {
  return <>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)}</>;
}

function StatusPill({ tone, children }: { tone: string; children: React.ReactNode }) {
  return <span className={`${styles.statusPill} ${styles[tone]}`}>{children}</span>;
}

function PegChart({ scenario }: { scenario: Scenario }) {
  const plotted = pegPoints.map((point, i) => scenario === "peg" && i > 12 ? point - 0.0005 : point);
  const path = plotted.map((point, i) => {
    const x = 18 + (i / (plotted.length - 1)) * 564;
    const y = 83 - ((point - 0.998) / 0.004) * 62;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const last = plotted[plotted.length - 1];
  const lastY = 83 - ((last - 0.998) / 0.004) * 62;

  return (
    <div className={styles.chartWrap} role="img" aria-label={`Seeded 24 hour USDT composite quote trace, ending at ${last.toFixed(4)} dollars`}>
      <svg viewBox="0 0 600 126" className={styles.chart} preserveAspectRatio="none">
        <defs>
          <linearGradient id="pegFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#baef39" stopOpacity=".25" />
            <stop offset="100%" stopColor="#baef39" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="18" y1="52" x2="582" y2="52" className={styles.referenceLine} />
        <text x="22" y="46" className={styles.referenceText}>$1.0000 reference</text>
        <path d={`${path} L582,108 L18,108 Z`} fill="url(#pegFill)" />
        <path d={path} className={styles.pegPath} />
        <circle cx="582" cy={lastY} r="4.5" className={scenario === "normal" ? styles.chartDot : styles.chartDotWarn} />
      </svg>
      <div className={styles.chartAxis}><span>24h ago</span><span>18h</span><span>12h</span><span>6h</span><span>Now</span></div>
    </div>
  );
}

export default function SignalbankDesk() {
  const [scenario, setScenario] = useState<Scenario>("peg");
  const [allocation, setAllocation] = useState(55);
  const [acknowledged, setAcknowledged] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("signalbank-usdt-review") === "acknowledged";
  });
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const view = scenarios[scenario];
  const remaining = 100 - allocation;
  const usdt = Math.round(remaining * 0.62);
  const dai = remaining - usdt;
  const totalCash = 4862400;
  const usdcValue = Math.round(totalCash * allocation / 100);
  const posture = useMemo(() => {
    const allocationPenalty = allocation > 55 ? (allocation - 55) * 1.2 : 0;
    return Math.max(42, Math.round(view.score - allocationPenalty));
  }, [allocation, view.score]);

  const acknowledgement = () => {
    window.localStorage.setItem("signalbank-usdt-review", "acknowledged");
    setAcknowledged(true);
  };

  const copyRecord = async () => {
    const record = `Signalbank demo decision record\nScenario: ${view.label} (seeded simulation)\nUSDC target: ${allocation}% | USDT: ${usdt}% | DAI: ${dai}%\nPolicy posture: ${posture}/100\nAssumed exit cost: ${view.cost}\nSnapshot: 16 Jul 2026 09:42 UTC — frozen demo data`;
    try { await navigator.clipboard.writeText(record); } catch { /* browser may deny clipboard access */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}><span className={styles.brandMark}><span></span><span></span><span></span></span><span>signalbank</span></div>
        <button className={styles.workspace}><span className={styles.workspaceAvatar}>AB</span><span><b>Arc &amp; Beam</b><small>Operating treasury</small></span><ChevronDown size={15} /></button>
        <nav className={styles.nav} aria-label="Product sections">
          <a className={styles.navActive} href="#readiness"><Sparkles size={17} />Readiness</a>
          <a href="#holdings"><WalletCards size={17} />Holdings</a>
          <a href="#policies"><ShieldCheck size={17} />Policies</a>
          <a href="#routes"><Network size={17} />Routes</a>
          <a href="#decisions"><BookOpen size={17} />Decisions</a>
        </nav>
        <div className={styles.sidebarFoot}>
          <div className={styles.demoCard}><div><Database size={15} /><span>DEMO WORKSPACE</span></div><p>Frozen sample data.<br />No wallet or execution.</p><a href="#sources">View sources <MoveRight size={14} /></a></div>
          <button className={styles.userButton}><span className={styles.userAvatar}>RS</span><span>Rina Shah<small>Finance lead</small></span><Ellipsis size={17} /></button>
        </div>
      </aside>

      <section className={styles.content} id="readiness">
        <header className={styles.topbar}>
          <button className={styles.mobileMenu} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Menu size={20} /></button>
          <div className={styles.crumb}><span>Readiness</span><ChevronRight size={15} /><b>Operating cash</b></div>
          <div className={styles.topActions}><button className={styles.snapshot}><span></span>Snapshot · 09:42 UTC</button><button aria-label="Notifications" className={styles.iconButton}><Bell size={18} /><i></i></button><button aria-label="Command menu" className={styles.iconButton}><Command size={17} /></button></div>
        </header>
        {menuOpen && <div className={styles.mobileNav}>{["Readiness", "Holdings", "Policies", "Routes", "Decisions"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}</div>}

        <div className={styles.mainBody}>
          <div className={styles.pageIntro}>
            <div><div className={styles.eyebrow}><span></span>SEED DATA · READ-ONLY</div><h1>Is your on-chain cash<br /><em>ready to move?</em></h1></div>
            <div className={styles.introMeta}><span>16 JUL 2026</span><p>Assess issuer, chain and exit-route constraints before the next operating decision.</p></div>
          </div>

          <section className={styles.heroGrid} aria-label="Cash readiness summary">
            <article className={styles.postureCard}>
              <div className={styles.cardTop}><span className={styles.label}>POLICY POSTURE</span><button aria-label="Posture details"><Ellipsis size={18} /></button></div>
              <div className={styles.postureContent}><div className={`${styles.scoreRing} ${styles[view.tone]}`}><strong>{posture}</strong><small>/ 100</small></div><div><StatusPill tone={view.tone}>{scenario === "normal" ? "MONITORED" : scenario === "peg" ? "REVIEW" : "CONSTRAINED"}</StatusPill><h2>{view.title}</h2><p>{view.detail}</p></div></div>
              <div className={styles.scoreFooter}><span><i className={styles.dotLime}></i>Issuer policy</span><span><i className={styles.dotAmber}></i>Quote deviation</span><span><i className={styles.dotSlate}></i>Route capacity</span></div>
            </article>
            <article className={styles.cashCard}>
              <div className={styles.cardTop}><span className={styles.label}>ELIGIBLE OPERATING CASH</span><button aria-label="Cash details"><Ellipsis size={18} /></button></div>
              <div className={styles.cashNumber}><Dollar value={totalCash} /><span>USD</span></div><div className={styles.cashDelta}><ArrowUpRight size={15} /> 1.8% <span>vs. prior snapshot</span></div>
              <div className={styles.cashDivider}></div><div className={styles.cashFoot}><span>3 issuers · 4 networks</span><span>Last balance scan <b>09:40 UTC</b></span></div>
            </article>
          </section>

          <div className={styles.sectionHead}><div><span className={styles.sectionKicker}>DECISION WORKBENCH</span><h2>Constrained allocation</h2></div><div className={styles.scenarioToggle} aria-label="Seeded scenario selector">{(Object.keys(scenarios) as Scenario[]).map((item) => <button key={item} className={scenario === item ? styles.selectedScenario : ""} onClick={() => setScenario(item)}>{scenarios[item].label}</button>)}</div></div>

          <section className={styles.workbench} id="holdings">
            <article className={styles.allocationCard}>
              <div className={styles.cardTop}><div><span className={styles.label}>SUGGESTED POLICY SPLIT</span><p className={styles.cardDescription}>Set a target for next-cycle operating cash. This is a seeded simulation, not an instruction.</p></div><StatusPill tone="seeded">SIMULATED</StatusPill></div>
              <div className={styles.allocationNumber}><strong>{allocation}%</strong><span>USDC target</span><span className={allocation > 55 ? styles.overLimit : styles.withinLimit}>{allocation > 55 ? `${allocation - 55}% above` : `${55 - allocation}% below`} 55% issuer target</span></div>
              <input className={styles.range} type="range" min="35" max="70" value={allocation} onChange={(e) => setAllocation(Number(e.target.value))} aria-label="USDC allocation target" />
              <div className={styles.rangeLabels}><span>35%</span><span>Policy target · 55%</span><span>70%</span></div>
              <div className={styles.allocationStack}><div style={{ width: `${allocation}%` }} className={styles.usdcSegment}><b>USDC</b><span>{allocation}%</span></div><div style={{ width: `${usdt}%` }} className={styles.usdtSegment}><b>USDT</b><span>{usdt}%</span></div><div style={{ width: `${dai}%` }} className={styles.daiSegment}>{dai > 11 && <><b>DAI</b><span>{dai}%</span></>}</div></div>
              <div className={styles.allocationLegend}><span><i className={styles.legendUsdc}></i>USDC <b><Dollar value={usdcValue} /></b></span><span><i className={styles.legendUsdt}></i>USDT <b>{usdt}%</b></span><span><i className={styles.legendDai}></i>DAI <b>{dai}%</b></span></div>
            </article>
            <article className={styles.decisionCard} id="decisions">
              <div className={styles.cardTop}><div><span className={styles.label}>DECISION NOTE</span><p className={styles.cardDescription}>Generated from the active demo scenario and policy inputs.</p></div><button className={styles.copyButton} onClick={copyRecord}>{copied ? <Check size={15} /> : <Clipboard size={15} />}{copied ? "Copied" : "Copy record"}</button></div>
              <div className={styles.decisionStatement}><span className={styles.decisionIcon}><ShieldCheck size={20} /></span><div><h3>{scenario === "normal" ? "Maintain the policy split" : scenario === "peg" ? "Stage a modest USDT reduction" : "Keep two viable settlement routes"}</h3><p>{scenario === "normal" ? "No simulated constraint requires rebalancing. Keep a documented review cadence." : scenario === "peg" ? "Direct next discretionary inflows to USDC until the quote returns inside the review band." : "Retain a non-Ethereum settlement route for the next payout window; do not infer executable depth from this demo."}</p></div></div>
              <div className={styles.decisionMetrics}><div><span>EST. AVAILABLE EXIT</span><b>{view.available}</b><small>within 30 min · seeded</small></div><div><span>ASSUMED EXIT COST</span><b>{view.cost}</b><small>route estimate · seeded</small></div></div>
              <div className={styles.assumption}><CircleAlert size={16} /><span>Assumptions: approved venues only; 1% max slippage; no execution, custody, or compliance determination.</span></div>
            </article>
          </section>

          <section className={styles.lowerGrid} id="policies">
            <article className={styles.pegCard}><div className={styles.cardTop}><div><span className={styles.label}>PEG OBSERVATION</span><h2>USDT / USD composite</h2></div><div className={styles.quoteValue}><b>{scenario === "peg" ? "$0.9991" : "$0.9996"}</b><span className={scenario === "normal" ? styles.goodText : styles.warnText}>{scenario === "normal" ? "−4 bps" : "−9 bps"}</span></div></div><PegChart scenario={scenario} /><div className={styles.pegMeta}><span><i className={styles.dotAmber}></i>{scenario === "peg" ? "Outside 5 bps review band" : "Inside 5 bps review band"}</span><span>USD · composite quote · 3 sources</span></div></article>
            <article className={styles.exposureCard}><div className={styles.cardTop}><div><span className={styles.label}>ISSUER EXPOSURE</span><h2>Policy headroom</h2></div><button className={styles.linkButton}>View policy <ChevronRight size={15} /></button></div><div className={styles.headroom}><b>11.2%</b><span>below issuer limit</span></div><div className={styles.exposureBar}><div className={styles.exposureUsdc} style={{ width: `${allocation}%` }}></div><div className={styles.exposureUsdt} style={{ width: `${usdt}%` }}></div><div className={styles.exposureDai} style={{ width: `${dai}%` }}></div><i style={{ left: "55%" }} title="55% policy target"></i></div><div className={styles.exposureRows}><span><i className={styles.legendUsdc}></i>Circle / USDC <b>{allocation}%</b></span><span><i className={styles.legendUsdt}></i>Tether / USDT <b>{usdt}%</b></span><span><i className={styles.legendDai}></i>Sky / DAI <b>{dai}%</b></span></div><p className={styles.exposureNote}>Target marker at 55%. Limit: no issuer above 66.2% of eligible operating cash.</p></article>
          </section>

          <section className={styles.alertSection} id="routes"><div className={styles.sectionHead}><div><span className={styles.sectionKicker}>MONITORING</span><h2>Conditions needing attention</h2></div><button className={styles.linkButton}>View all signals <ChevronRight size={15} /></button></div><div className={styles.alertGrid}>
            <article className={`${styles.alertCard} ${acknowledged ? styles.acknowledged : ""}`}><div className={styles.alertTop}><span className={styles.alertIcon}><TriangleAlert size={18} /></span><StatusPill tone="review">REVIEW</StatusPill><span className={styles.alertTime}>09:41 UTC</span></div><h3>USDT composite quote crossed the review band</h3><p>Seeded observation is −9 bps from $1.0000 across three quote sources. Price is not a redemption guarantee.</p><div className={styles.alertActions}>{acknowledged ? <span className={styles.ackText}><Check size={15} /> Reviewed in this browser</span> : <button onClick={acknowledgement}>Acknowledge review <ChevronRight size={14} /></button>}<button className={styles.sourceButton}>Evidence <FileText size={14} /></button></div></article>
            <article className={styles.alertCard}><div className={styles.alertTop}><span className={styles.alertIconSlate}><Layers3 size={18} /></span><StatusPill tone="watch">WATCH</StatusPill><span className={styles.alertTime}>08:57 UTC</span></div><h3>USDT is concentrated in one withdrawal venue</h3><p>42% of simulated USDT exit capacity relies on one venue. Route capacity is an estimate, not a quote.</p><div className={styles.alertActions}><button>Inspect routes <ChevronRight size={14} /></button><button className={styles.sourceButton}>Method <FileText size={14} /></button></div></article>
          </div></section>

          <footer className={styles.dataFooter} id="sources"><LockKeyhole size={15} /><span><b>Demo provenance:</b> values are deliberately frozen sample data as of 16 Jul 2026 · 09:42 UTC. Production design would attribute composite quotes, chain snapshots, route estimates, and issuer disclosures separately.</span><a href="#readiness">Back to top <ArrowUpRight size={14} /></a></footer>
        </div>
      </section>
      <div className={styles.liveRegion} aria-live="polite">{view.label} scenario active. Policy posture {posture} out of 100.</div>
    </main>
  );
}
