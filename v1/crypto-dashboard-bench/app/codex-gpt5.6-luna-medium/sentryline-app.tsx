"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  ExternalLink,
  FileCheck2,
  LayoutDashboard,
  Menu,
  Network,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  WalletCards,
  X,
} from "lucide-react";
import styles from "./sentryline.module.css";

type Risk = {
  id: string;
  severity: "high" | "medium" | "low";
  title: string;
  detail: string;
  impact: string;
  source: string;
  time: string;
  icon: "alert" | "network" | "wallet";
};

const risks: Risk[] = [
  { id: "bridge", severity: "high", title: "Bridged USDC concentration", detail: "42% of spendable cash sits behind a single bridge route.", impact: "$186,240 exposed", source: "Policy P-04", time: "14 min ago", icon: "network" },
  { id: "signer", severity: "medium", title: "Signer quorum changed", detail: "2 of 5 Safe signers have not reviewed the new quorum.", impact: "Review before next spend", source: "Safe · 0x8a…41e", time: "1 hr ago", icon: "wallet" },
  { id: "oracle", severity: "medium", title: "Price source is stale", detail: "ETH/USD snapshot is outside the 15 minute freshness policy.", impact: "Valuation confidence reduced", source: "Chainlink feed", time: "2 hr ago", icon: "alert" },
  { id: "allowance", severity: "low", title: "Unlimited token allowance", detail: "An inactive lending adapter still has an open USDC allowance.", impact: "$0 currently utilized", source: "Ethereum · 0x2b…09c", time: "Yesterday", icon: "wallet" },
];

const assets = [
  { symbol: "USDC", name: "USD Coin", amount: "312,880.00", value: "$312,880", share: 51, color: "#8da9ff", liquidity: "Same-day" },
  { symbol: "ETH", name: "Ether", amount: "58.42", value: "$186,240", share: 30, color: "#c6b2ff", liquidity: "1–2 days" },
  { symbol: "DAI", name: "Dai", amount: "76,440.00", value: "$76,440", share: 12, color: "#e7a957", liquidity: "Same-day" },
  { symbol: "OP", name: "Optimism", amount: "41,200", value: "$42,016", share: 7, color: "#eb806f", liquidity: "48h+" },
];

const activity = [
  { type: "Outbound", label: "Vendor settlement · L2 fees", asset: "USDC", amount: "− 18,400.00", value: "$18,400", time: "Today, 09:42", status: "Finalized", hash: "0x7c8a…2f91" },
  { type: "Inbound", label: "Protocol revenue · mainnet", asset: "DAI", amount: "+ 4,280.00", value: "$4,280", time: "Yesterday, 16:18", status: "Finalized", hash: "0xa042…dd71" },
  { type: "Approval", label: "USDC allowance · Aave V3", asset: "USDC", amount: "Policy review", value: "Unlimited", time: "Yesterday, 12:06", status: "Needs review", hash: "0x3f21…a0ce" },
];

function TrendChart({ range }: { range: string }) {
  const points = range === "30d" ? "0,178 44,170 88,174 132,145 176,151 220,128 264,136 308,104 352,113 396,84 440,91 484,64 528,73 572,45 616,54 660,28 704,35 748,16" : range === "180d" ? "0,185 44,181 88,175 132,179 176,167 220,163 264,170 308,151 352,157 396,134 440,142 484,126 528,118 572,122 616,101 660,93 704,81 748,72" : "0,181 44,173 88,178 132,151 176,156 220,136 264,140 308,113 352,117 396,94 440,98 484,75 528,78 572,58 616,63 660,42 704,46 748,24";
  return (
    <div className={styles.chartWrap}>
      <svg viewBox="0 0 760 220" role="img" aria-label={`Spendable treasury trend over ${range}`} className={styles.chart} preserveAspectRatio="none">
        <defs>
          <linearGradient id="runwayFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#8da9ff" stopOpacity=".18" /><stop offset="100%" stopColor="#8da9ff" stopOpacity="0" /></linearGradient>
        </defs>
        {[40, 80, 120, 160, 200].map((y) => <line key={y} x1="0" x2="760" y1={y} y2={y} className={styles.gridLine} />)}
        <path d={`M ${points} L 748 220 L 0 220 Z`} fill="url(#runwayFill)" />
        <polyline points={points} fill="none" stroke="#f3efe7" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <line x1="0" x2="760" y1="143" y2="143" className={styles.policyLine} />
        <text x="600" y="137" className={styles.policyText}>policy floor · $420k</text>
      </svg>
      <div className={styles.chartLabels}><span>− {range === "30d" ? "30" : range === "90d" ? "90" : "180"} days</span><span>Today</span></div>
    </div>
  );
}

export function SentrylineApp() {
  const [active, setActive] = useState("Overview");
  const [range, setRange] = useState("90d");
  const [openRisk, setOpenRisk] = useState<string | null>("bridge");
  const [acknowledged, setAcknowledged] = useState<string[]>([]);
  const [showDemo, setShowDemo] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("sentryline-acknowledged");
    if (!saved) return;
    const timer = window.setTimeout(() => setAcknowledged(JSON.parse(saved) as string[]), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const markReviewed = (id: string) => {
    const next = [...new Set([...acknowledged, id])];
    setAcknowledged(next);
    window.localStorage.setItem("sentryline-acknowledged", JSON.stringify(next));
  };

  const openCount = risks.filter((risk) => !acknowledged.includes(risk.id)).length;
  const currentRisk = risks.find((risk) => risk.id === openRisk);
  const pageSubtitle = useMemo(() => active === "Overview" ? "Tuesday, 16 July 2026 · Weekly treasury review" : active === "Exposure" ? "Where capital is held · by asset, chain, and venue" : active === "Activity" ? "Review movements before the next signature" : "Workspace controls and read-only policy", [active]);

  return (
    <main className={styles.shell}>
      <aside className={`${styles.sidebar} ${mobileNav ? styles.sidebarOpen : ""}`}>
        <div className={styles.brand}><span className={styles.brandMark}>S</span><span>SENTRYLINE</span><span className={styles.brandBeta}>BETA</span></div>
        <div className={styles.workspaceSwitch}><div className={styles.workspaceGlyph}>N</div><div><strong>Northstar DAO</strong><small>Control workspace</small></div><ChevronDown size={14} /></div>
        <div className={styles.navLabel}>Workspace</div>
        <nav className={styles.nav} aria-label="Primary navigation">
          {[["Overview", LayoutDashboard], ["Exposure", BarChart3], ["Activity", Activity], ["Policies", ShieldCheck]].map(([label, Icon]) => (
            <button key={label as string} className={active === label ? styles.navItemActive : styles.navItem} onClick={() => { setActive(label as string); setMobileNav(false); }}><Icon size={16} /><span>{label as string}</span>{label === "Activity" && <span className={styles.navCount}>3</span>}</button>
          ))}
        </nav>
        <div className={styles.navLabel}>Workspace</div>
        <nav className={styles.nav} aria-label="Settings navigation">
          <button className={active === "Settings" ? styles.navItemActive : styles.navItem} onClick={() => setActive("Settings")}><Settings2 size={16} /><span>Settings</span></button>
          <button className={styles.navItem}><CircleHelp size={16} /><span>Help center</span><ExternalLink size={12} className={styles.external} /></button>
        </nav>
        <div className={styles.sidebarBottom}><div className={styles.readOnly}><span className={styles.liveDot}></span><div><strong>Watch-only mode</strong><small>No signing permissions</small></div></div><div className={styles.userRow}><div className={styles.avatar}>MC</div><div><strong>Maya Chen</strong><small>Reviewer</small></div><MoreDots /></div></div>
      </aside>

      <section className={styles.content}>
        <header className={styles.topbar}><button className={styles.mobileMenu} onClick={() => setMobileNav(!mobileNav)} aria-label="Open navigation"><Menu size={19} /></button><div className={styles.crumb}>Treasury <span>/</span> {active}</div><div className={styles.topActions}><span className={styles.demoPill}><span></span> Seeded demo</span><button className={styles.iconButton} aria-label="Notifications"><Bell size={17} /><i></i></button><button className={styles.avatarSmall}>MC</button></div></header>
        <div className={styles.pageHead}><div><div className={styles.kicker}>NORTHSTAR DAO / TREASURY CONTROL</div><h1>{active === "Overview" ? "Good morning, Maya" : active}</h1><p>{pageSubtitle}</p></div><div className={styles.snapshot}><Clock3 size={14} /><div><strong>Last verified snapshot</strong><span>16 Jul 2026, 10:02 UTC · 14m ago</span></div><span className={styles.sourceDot}>●</span></div></div>

        {showDemo && <div className={styles.demoBanner}><div className={styles.demoIcon}><ShieldCheck size={17} /></div><div><strong>Demo data · read-only workspace</strong><span>Values are seeded for evaluation. No wallet is connected, and no transaction can be signed from Sentryline.</span></div><button onClick={() => setShowDemo(false)} aria-label="Dismiss demo notice"><X size={16} /></button></div>}

        {active === "Overview" && <>
          <div className={styles.decisionCard}><div className={styles.decisionCopy}><div className={styles.eyebrow}><span className={styles.signalDot}></span> TREASURY HEALTH / POLICY P-04</div><div className={styles.decisionRow}><div><h2>Safe to spend</h2><div className={styles.bigNumber}>$384,120 <span>USD</span></div></div><div className={styles.healthTag}><Check size={14} /> Within policy</div></div><p>Available stablecoin value after reserved obligations. Keep a 60-day operating buffer before moving capital.</p><div className={styles.metaLine}><span>Updated 14m ago</span><span>•</span><span>Sources: Safe + Dune curated</span><span className={styles.confidence}><span></span> 96% confidence</span></div></div><div className={styles.runwayMini}><div className={styles.miniLabel}>Runway <CircleHelp size={13} /></div><strong>74 <small>days</small></strong><div className={styles.miniBar}><span></span></div><div className={styles.miniFoot}><span>Policy floor <b>60d</b></span><span>+14d headroom</span></div></div><button className={styles.primaryButton} onClick={() => setActive("Activity")}>Review risks <ArrowUpRight size={15} /></button></div>
          <div className={styles.kpiGrid}><Metric label="Total treasury" value="$617,576" change="+2.4%" direction="up" note="vs. previous snapshot" /><Metric label="Monthly burn" value="$156,420" change="−4.8%" direction="down" note="90d rolling average" /><Metric label="Open risk items" value={String(openCount).padStart(2, "0")} change={openCount > 2 ? "Needs review" : "In control"} direction="alert" note="across 4 policies" /><Metric label="Data freshness" value="14m" change="Good" direction="up" note="oldest source: 2h" /></div>
          <div className={styles.mainGrid}><section className={`${styles.panel} ${styles.chartPanel}`}><div className={styles.panelHead}><div><div className={styles.sectionLabel}>LIQUIDITY OUTLOOK</div><h3>Spendable treasury</h3></div><div className={styles.rangeGroup}>{["30d", "90d", "180d"].map((item) => <button key={item} className={range === item ? styles.rangeActive : styles.rangeButton} onClick={() => setRange(item)}>{item}</button>)}</div></div><div className={styles.chartLegend}><span><i className={styles.legendSpend}></i> Spendable value</span><span><i className={styles.legendPolicy}></i> Policy floor</span><span className={styles.staleLegend}>● Uncertainty band ±8%</span></div><TrendChart range={range} /><div className={styles.chartFoot}><span>Start <b>$528k</b></span><span>Current <b>$617.6k</b></span><span>Projected floor <b>04 Sep 2026</b></span></div></section><section className={`${styles.panel} ${styles.riskPanel}`}><div className={styles.panelHead}><div><div className={styles.sectionLabel}>ACTION QUEUE</div><h3>Risk items <span className={styles.openBadge}>{openCount} open</span></h3></div><button className={styles.textButton}>View all <ArrowUpRight size={14} /></button></div><div className={styles.riskList}>{risks.slice(0, 3).map((risk) => <RiskRow key={risk.id} risk={risk} selected={openRisk === risk.id} done={acknowledged.includes(risk.id)} onSelect={() => setOpenRisk(risk.id)} />)}</div>{currentRisk && <div className={styles.evidenceDrawer}><div className={styles.drawerTop}><span className={`${styles.severity} ${styles[currentRisk.severity]}`}>{currentRisk.severity === "high" ? "ACTION REQUIRED" : "REVIEW"}</span><button onClick={() => setOpenRisk(null)} aria-label="Close evidence"><X size={14} /></button></div><strong>{currentRisk.title}</strong><p>{currentRisk.detail}</p><div className={styles.evidenceMeta}><span><FileCheck2 size={13} /> {currentRisk.source}</span><span><Clock3 size={13} /> {currentRisk.time}</span></div><button className={styles.reviewButton} onClick={() => markReviewed(currentRisk.id)}>{acknowledged.includes(currentRisk.id) ? <><Check size={14} /> Acknowledged</> : <>Mark reviewed <ArrowUpRight size={14} /></>}</button></div>}</section></div>
          <div className={styles.bottomGrid}><section className={`${styles.panel} ${styles.allocationPanel}`}><div className={styles.panelHead}><div><div className={styles.sectionLabel}>CAPITAL MAP</div><h3>Allocation</h3></div><button className={styles.iconButton}><SlidersHorizontal size={16} /></button></div><div className={styles.assetBar}>{assets.map((asset) => <span key={asset.symbol} style={{ width: `${asset.share}%`, background: asset.color }} title={`${asset.symbol} ${asset.share}%`} />)}</div><div className={styles.assetList}>{assets.map((asset) => <div className={styles.assetRow} key={asset.symbol}><span className={styles.assetDot} style={{ background: asset.color }} /><div className={styles.assetName}><strong>{asset.symbol}</strong><span>{asset.name}</span></div><span className={styles.assetAmount}>{asset.amount}</span><span className={styles.assetValue}>{asset.value}</span><span className={styles.assetShare}>{asset.share}%</span><span className={styles.liquidity}>{asset.liquidity}</span></div>)}</div></section><section className={`${styles.panel} ${styles.activityPanel}`}><div className={styles.panelHead}><div><div className={styles.sectionLabel}>RECENT MOVEMENT</div><h3>Latest activity</h3></div><button className={styles.textButton} onClick={() => setActive("Activity")}>Open ledger <ArrowUpRight size={14} /></button></div><div className={styles.activityList}>{activity.map((item) => <div className={styles.activityRow} key={item.hash}><div className={`${styles.activityIcon} ${item.type === "Inbound" ? styles.inbound : item.type === "Approval" ? styles.approval : ""}`}>{item.type === "Approval" ? <ShieldCheck size={15} /> : item.type === "Inbound" ? <ArrowDownRight size={15} /> : <ArrowUpRight size={15} />}</div><div className={styles.activityLabel}><strong>{item.label}</strong><span>{item.time} · {item.hash}</span></div><div className={styles.activityAmount}><strong className={item.type === "Inbound" ? styles.positive : ""}>{item.amount}</strong><span>{item.value}</span></div></div>)}</div></section></div>
        </>}

        {active !== "Overview" && <ModulePlaceholder active={active} onBack={() => setActive("Overview")} />}
        <footer className={styles.footer}><span>Demo workspace · All values seeded</span><span>Data model v0.3 · <a href="https://docs.dune.com/data-catalog/overview" target="_blank" rel="noreferrer">Source methodology <ExternalLink size={11} /></a></span></footer>
      </section>
    </main>
  );
}

function Metric({ label, value, change, direction, note }: { label: string; value: string; change: string; direction: "up" | "down" | "alert"; note: string }) {
  return <div className={styles.metric}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={`${styles.metricChange} ${direction === "alert" ? styles.metricAlert : direction === "down" ? styles.metricDown : ""}`}>{direction === "up" ? <ArrowUpRight size={12} /> : direction === "down" ? <ArrowDownRight size={12} /> : <AlertTriangle size={12} />}{change}</span><span className={styles.metricNote}>{note}</span></div>;
}

function RiskRow({ risk, selected, done, onSelect }: { risk: Risk; selected: boolean; done: boolean; onSelect: () => void }) {
  return <button className={`${styles.riskRow} ${selected ? styles.riskSelected : ""} ${done ? styles.riskDone : ""}`} onClick={onSelect}><span className={`${styles.riskIcon} ${styles[risk.severity]}`}>{risk.icon === "network" ? <Network size={15} /> : risk.icon === "wallet" ? <WalletCards size={15} /> : <AlertTriangle size={15} />}</span><span className={styles.riskText}><strong>{risk.title}</strong><small>{done ? "Acknowledged by you" : risk.impact}</small></span><span className={`${styles.severity} ${styles[risk.severity]}`}>{done ? "DONE" : risk.severity === "high" ? "HIGH" : "MED"}</span><ChevronDown size={14} className={selected ? styles.chevronOpen : ""} /></button>;
}

function ModulePlaceholder({ active, onBack }: { active: string; onBack: () => void }) {
  return <div className={styles.modulePlaceholder}><div className={styles.moduleIcon}>{active === "Exposure" ? <BarChart3 size={24} /> : active === "Activity" ? <Activity size={24} /> : active === "Policies" ? <ShieldCheck size={24} /> : <Settings2 size={24} />}</div><div className={styles.sectionLabel}>MODULE PREVIEW</div><h2>{active} is ready for review</h2><p>This seeded demo keeps the Overview as the primary decision loop. In production, this module would preserve the same source, freshness, and watch-only semantics.</p><button className={styles.primaryButton} onClick={onBack}>Back to overview <ArrowUpRight size={15} /></button></div>;
}

function MoreDots() { return <span className={styles.moreDots}><i></i><i></i><i></i></span>; }
