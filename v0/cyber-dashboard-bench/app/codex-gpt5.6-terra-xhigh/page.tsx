"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity, AlertTriangle, ArrowRight, Bell, Check, CheckCircle2, ChevronDown,
  ChevronRight, CircleHelp, Clock3, Cloud, Compass, FileCheck2, Filter, Flame,
  LayoutDashboard, Menu, MoreHorizontal, Network, Search, Settings, ShieldAlert,
  ShieldCheck, SlidersHorizontal, Target, Timer, Users, X, Zap,
} from "lucide-react";
import styles from "./harbor.module.css";

type Status = "Needs owner" | "In progress" | "Ready to verify" | "Verified" | "Blocked";
type Priority = "Critical" | "Priority" | "Monitor";
type FilterName = "all" | "urgent" | "needs-owner" | "at-risk" | "verified";
type Tone = "violet" | "orange" | "blue" | "mint" | "slate";

type Path = {
  id: string; ticket: string; title: string; priority: Priority; status: Status;
  target: string; targetMeta: string; entry: string; transition: string; weakness: string;
  reason: string; owner: string; initials: string; tone: Tone; due: string;
  dueTone: "critical" | "warning" | "calm"; freshness: string; confidence: number;
  epss: string; cve: string; kev: boolean; assets: number; service: string; plan: string;
  recommendation: string; activity: { actor: string; detail: string; time: string; tone: "system" | "person" | "success" }[];
};

const seededPaths: Path[] = [
  {
    id: "path-4821", ticket: "HAR-4821", title: "Public API can reach Payments via CI role", priority: "Critical", status: "Needs owner",
    target: "Payments API", targetMeta: "Tier 0 · PCI scope", entry: "api-gateway-prod", transition: "ci-deploy-runner role", weakness: "CVE-2025-1974 · ingress controller",
    reason: "Known exploited · public ingress · Tier 0 path", owner: "Unassigned", initials: "?", tone: "slate", due: "Due in 18h", dueTone: "critical", freshness: "Observed 22m ago", confidence: 92, epss: "97th percentile", cve: "CVE-2025-1974", kev: true, assets: 4, service: "Payments",
    plan: "Remove the broad deploy policy; retain read-only artifact access.", recommendation: "Restrict the CI runner role from invoking the payments deploy path.",
    activity: [
      { actor: "Harbor", detail: "Path revalidated from AWS Security Hub evidence.", time: "22m", tone: "system" },
      { actor: "Nora Kim", detail: "Marked Payments API as a Tier 0 target.", time: "1h", tone: "person" },
      { actor: "Harbor", detail: "EPSS changed from 91st to 97th percentile.", time: "3h", tone: "system" },
    ],
  },
  {
    id: "path-4730", ticket: "INFRA-991", title: "Admin console has a public RDP route", priority: "Critical", status: "In progress",
    target: "Identity administration", targetMeta: "Tier 0 · workforce identity", entry: "legacy-bastion-01", transition: "public RDP / 3389", weakness: "Internet-exposed management port",
    reason: "Public entry · privileged target · owner plan active", owner: "Kai Foster", initials: "KF", tone: "orange", due: "Due tomorrow", dueTone: "warning", freshness: "Observed 1h ago", confidence: 88, epss: "N/A · configuration path", cve: "NET-038", kev: false, assets: 2, service: "Identity",
    plan: "Move admin access to the broker; validate break-glass before cutover.", recommendation: "Close public RDP and require the private access broker.",
    activity: [{ actor: "Kai Foster", detail: "Acknowledged ownership and started broker cutover.", time: "38m", tone: "person" }, { actor: "Harbor", detail: "Public reachability observed from two regions.", time: "1h", tone: "system" }],
  },
  {
    id: "path-4699", ticket: "DATA-664", title: "Support S3 bucket permits lateral data access", priority: "Priority", status: "Blocked",
    target: "Customer exports", targetMeta: "Tier 1 · restricted data", entry: "support-upload-bucket", transition: "overbroad analytics role", weakness: "Cross-account bucket policy",
    reason: "Reachable data path · exception review required", owner: "Maya Patel", initials: "MP", tone: "violet", due: "Blocked · review Fri", dueTone: "warning", freshness: "Observed 3h ago", confidence: 76, epss: "N/A · IAM path", cve: "IAM-145", kev: false, assets: 7, service: "Support data",
    plan: "Await data-retention sign-off before narrowing the role.", recommendation: "Constrain analytics role to its export prefix and account.",
    activity: [{ actor: "Maya Patel", detail: "Blocked: retention export dependency needs approval.", time: "3h", tone: "person" }, { actor: "Harbor", detail: "Path includes 7 reachable storage assets.", time: "4h", tone: "system" }],
  },
  {
    id: "path-4655", ticket: "PLAT-2188", title: "Stale GitHub token reaches deployment secrets", priority: "Priority", status: "Ready to verify",
    target: "Production deploy secrets", targetMeta: "Tier 1 · build integrity", entry: "github-actions-bot", transition: "stale organization token", weakness: "Long-lived token with secret-read scope",
    reason: "High privilege transition · corrective action complete", owner: "Mia Santos", initials: "MS", tone: "blue", due: "Verify today", dueTone: "calm", freshness: "Observed 4h ago", confidence: 84, epss: "N/A · identity path", cve: "ID-228", kev: false, assets: 3, service: "Developer platform",
    plan: "OIDC trust policy deployed; awaiting connector confirmation.", recommendation: "Revoke the token and replace it with a short-lived OIDC role.",
    activity: [{ actor: "Mia Santos", detail: "Marked ready for verification with change evidence.", time: "46m", tone: "success" }, { actor: "Harbor", detail: "Token last observed with secret-read scope 4h ago.", time: "4h", tone: "system" }],
  },
  {
    id: "path-4550", ticket: "OBS-419", title: "Test cluster exposes an old metrics endpoint", priority: "Monitor", status: "Verified",
    target: "Observability namespace", targetMeta: "Tier 3 · non-production", entry: "metrics-test.eu-1", transition: "anonymous metrics reader", weakness: "Unauthenticated endpoint",
    reason: "Non-production target · interruption verified", owner: "Devon Roy", initials: "DR", tone: "mint", due: "Verified yesterday", dueTone: "calm", freshness: "Verified 1d ago", confidence: 95, epss: "N/A · configuration path", cve: "CFG-067", kev: false, assets: 1, service: "Observability",
    plan: "Ingress policy deployed and observed closed.", recommendation: "Require workload identity for the metrics endpoint.",
    activity: [{ actor: "Nora Kim", detail: "Verified: external probe no longer reaches the endpoint.", time: "1d", tone: "success" }],
  },
];

const filters: { id: FilterName; label: string }[] = [
  { id: "all", label: "All work" }, { id: "urgent", label: "Urgent" }, { id: "needs-owner", label: "Needs owner" }, { id: "at-risk", label: "At risk" }, { id: "verified", label: "Verified" },
];

const avatarClass = (tone: Tone) => styles[`avatar${tone[0].toUpperCase()}${tone.slice(1)}`];
const classFor = (text: string) => styles[text.toLowerCase().replaceAll(" ", "-")];
const inFilter = (path: Path, filter: FilterName) => {
  if (filter === "urgent") return path.priority === "Critical" && path.status !== "Verified";
  if (filter === "needs-owner") return path.status === "Needs owner";
  if (filter === "at-risk") return path.status === "Blocked" || path.dueTone === "critical";
  if (filter === "verified") return path.status === "Verified";
  return true;
};

export default function HarborPage() {
  const [paths, setPaths] = useState<Path[]>(seededPaths);
  const [selectedId, setSelectedId] = useState(seededPaths[0].id);
  const [filter, setFilter] = useState<FilterName>("all");
  const [view, setView] = useState<"queue" | "coverage">("queue");
  const [filterMenu, setFilterMenu] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState("Demo workspace · simulated security data");
  useEffect(() => {
    const restore = window.setTimeout(() => {
      const stored = window.localStorage.getItem("harbor-demo-workspace");
      if (stored) try { const parsed = JSON.parse(stored) as Path[]; if (Array.isArray(parsed) && parsed.length === seededPaths.length) setPaths(parsed); } catch { window.localStorage.removeItem("harbor-demo-workspace"); }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);
  useEffect(() => { if (hydrated) window.localStorage.setItem("harbor-demo-workspace", JSON.stringify(paths)); }, [hydrated, paths]);
  const visiblePaths = useMemo(() => paths.filter((path) => inFilter(path, filter)), [paths, filter]);
  const storedSelected = paths.find((path) => path.id === selectedId) ?? paths[0];
  const selected = visiblePaths.find((path) => path.id === selectedId) ?? visiblePaths[0] ?? storedSelected;
  const urgent = paths.filter((path) => path.priority === "Critical" && path.status !== "Verified").length;
  const ownerless = paths.filter((path) => path.status === "Needs owner").length;
  const atRisk = paths.filter((path) => path.status === "Blocked" || path.dueTone === "critical").length;
  const update = (change: (path: Path) => Path) => setPaths((items) => items.map((path) => path.id === selected.id ? change(path) : path));
  const activity = (path: Path, detail: string, tone: "person" | "success" = "person") => [{ actor: tone === "success" ? "Nora Kim" : "Nora Kim", detail, time: "now", tone }, ...path.activity];
  const primaryAction = () => {
    if (selected.status === "Needs owner") { update((path) => ({ ...path, status: "In progress", owner: "Mia Santos", initials: "MS", tone: "blue", due: "Due tomorrow", dueTone: "warning", activity: activity(path, "Assigned Mia Santos and started the remediation plan.") })); setToast("Commitment created · Mia Santos owns the interruption"); return; }
    if (selected.status === "In progress" || selected.status === "Blocked") { update((path) => ({ ...path, status: "Ready to verify", due: "Verify today", dueTone: "calm", activity: activity(path, "Marked ready for verification with implementation evidence.", "success") })); setToast("Plan ready for security verification"); return; }
    if (selected.status === "Ready to verify") { update((path) => ({ ...path, status: "Verified", due: "Verified now", dueTone: "calm", freshness: "Verified now", activity: activity(path, "Verified in this demo: the selected interruption is recorded as effective.", "success") })); setToast("Interruption verified · path moved to completed work"); }
  };
  const toggleBlock = () => { const resuming = selected.status === "Blocked"; update((path) => ({ ...path, status: resuming ? "In progress" : "Blocked", due: resuming ? "Due tomorrow" : "Blocked · review Fri", dueTone: "warning", activity: activity(path, resuming ? "Removed blocker; plan is active again." : "Blocked the plan pending owner review.") })); setToast(resuming ? "Blocker cleared · plan resumed" : "Marked blocked · review is required"); };
  const resetDemo = () => { window.localStorage.removeItem("harbor-demo-workspace"); setPaths(seededPaths); setSelectedId(seededPaths[0].id); setFilter("all"); setToast("Demo workspace reset to seeded path data"); };
  const primaryLabel = selected.status === "Needs owner" ? "Assign & start plan" : selected.status === "Ready to verify" ? "Verify interruption" : selected.status === "Verified" ? "Verified interruption" : "Mark ready to verify";

  return <main className={styles.appShell}>
    <aside className={styles.sidebar} aria-label="Harbor primary navigation">
      <div className={styles.brand}><div className={styles.brandMark} aria-hidden="true"><span /><span /><span /></div><span>harbor</span></div>
      <div className={styles.workspaceSwitch}><span className={styles.workspaceDot} aria-hidden="true" /><span>Northstar Cloud</span><ChevronDown size={15} aria-hidden="true" /></div>
      <nav className={styles.navList}>
        <p className={styles.navCaption}>WORKSPACE</p>
        {[["Queue", LayoutDashboard, true], ["Services", Compass, false], ["Evidence", FileCheck2, false], ["Reports", Activity, false]].map(([name, Icon, active]) => { const NavIcon = Icon as typeof LayoutDashboard; return <button key={name as string} className={`${styles.navItem} ${active ? styles.navItemActive : ""}`} type="button" aria-current={active ? "page" : undefined} onClick={() => !active && setToast(`${name} is a preview destination in this demo.`)}><NavIcon size={17} /><span>{name as string}</span>{name === "Queue" && <b>{urgent}</b>}</button>; })}
        <p className={`${styles.navCaption} ${styles.navCaptionBottom}`}>MANAGE</p>
        <button className={styles.navItem} type="button" onClick={() => setToast("Service ownership is represented in every path decision packet.")}><Users size={17} /><span>Ownership</span></button>
        <button className={styles.navItem} type="button" onClick={() => setToast("Data source settings are simulated in this prototype.")}><Cloud size={17} /><span>Sources</span></button>
      </nav>
      <div className={styles.sidebarFoot}><button className={styles.helpLink} type="button" onClick={() => setToast("Harbor links risk evidence to an owned remediation commitment.")}><CircleHelp size={17} />Help & guidance</button><button className={styles.userCard} type="button" onClick={() => setToast("Signed in as Nora Kim · Security Lead (demo).") }><span className={`${styles.avatar} ${styles.avatarViolet}`}>NK</span><span><strong>Nora Kim</strong><small>Security Lead</small></span><MoreHorizontal size={17} /></button></div>
    </aside>
    <section className={styles.mainArea}>
      <header className={styles.topbar}><button className={styles.mobileBrand} type="button" aria-label="Open navigation" onClick={() => setToast("Navigation is compact on this viewport.")}><Menu size={20} /><span>harbor</span></button><div className={styles.breadcrumb}><span>Exposure operations</span><ChevronRight size={15} /><strong>Priority queue</strong></div><div className={styles.topActions}><span className={styles.demoPill}><span />SIMULATED DATA</span><button className={styles.iconButton} type="button" aria-label="Notifications" onClick={() => setToast("No new demo notifications.")}><Bell size={18} /></button><button className={styles.iconButton} type="button" aria-label="Settings" onClick={() => setToast("Settings are not connected in this demo.")}><Settings size={18} /></button></div></header>
      <div className={styles.content}>
        <section className={styles.pageIntro}><div><p className={styles.eyebrow}><span className={styles.liveDot} />OPERATIONAL VIEW</p><h1>Interrupt the paths that matter.</h1><p>Verified exposure paths, translated into an owner and a next action.</p></div><div className={styles.introActions}><div className={styles.viewToggle} aria-label="Dashboard view"><button type="button" className={view === "queue" ? styles.toggleActive : ""} aria-pressed={view === "queue"} onClick={() => setView("queue")}><LayoutDashboard size={15} />Queue</button><button type="button" className={view === "coverage" ? styles.toggleActive : ""} aria-pressed={view === "coverage"} onClick={() => { setView("coverage"); setToast("Coverage view summarizes the same simulated path data."); }}><Network size={15} />Coverage</button></div><button className={styles.secondaryButton} type="button" onClick={resetDemo}><SlidersHorizontal size={16} />Reset demo</button></div></section>
        <section className={`${styles.attentionBand} ${atRisk ? styles.attentionActive : ""}`} aria-label="Priority summary"><div className={styles.attentionLead}><span className={styles.attentionIcon}><Flame size={18} /></span><div><strong>{urgent} urgent paths need a decision</strong><span>One is actively exploited and has no service owner.</span></div></div><div className={styles.attentionStats}><button type="button" onClick={() => setFilter("needs-owner")}><b>{ownerless}</b><span>needs owner</span><ArrowRight size={14} /></button><button type="button" onClick={() => setFilter("at-risk")}><b>{atRisk}</b><span>at risk</span><ArrowRight size={14} /></button></div></section>
        <section className={styles.metrics} aria-label="Exposure overview"><article className={styles.metricCard}><div className={styles.metricLabel}><span>OPEN VERIFIED PATHS</span><span className={styles.metricTag}>7D</span></div><div className={styles.metricNumber}>12 <span className={styles.metricDelta}>↓ 3</span></div><p>Across 6 critical services</p><div className={styles.sparkline} aria-label="Open verified paths trended from 18 to 12 over seven days"><svg viewBox="0 0 230 42" aria-hidden="true"><defs><linearGradient id="harborFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#6c7cff" stopOpacity=".30" /><stop offset="100%" stopColor="#6c7cff" stopOpacity="0" /></linearGradient></defs><path d="M0 8 L32 13 L65 9 L99 22 L132 19 L165 31 L198 27 L230 36 V42 H0 Z" fill="url(#harborFill)" /><path d="M0 8 L32 13 L65 9 L99 22 L132 19 L165 31 L198 27 L230 36" fill="none" stroke="#8090ff" strokeWidth="2.2" /></svg></div></article><article className={styles.metricCard}><div className={styles.metricLabel}><span>OWNER COVERAGE</span><span className={styles.metricStatus}><Check size={11} />IMPROVING</span></div><div className={styles.metricNumber}>83<span className={styles.percent}>%</span></div><p>10 of 12 open paths have a named owner</p><div className={styles.coverageBar}><span style={{ width: "83%" }} /></div></article><article className={styles.metricCard}><div className={styles.metricLabel}><span>MEDIAN TO OWNER</span><span className={styles.metricTag}>30D</span></div><div className={styles.metricNumber}>3.2<span className={styles.unit}>h</span></div><p>From verified path to acknowledged owner</p><div className={styles.miniSteps}><span className={styles.stepDone} /><span className={styles.stepDone} /><span className={styles.stepDone} /><span /><span /></div></article></section>
        {view === "coverage" && <section className={styles.coverageNote}><ShieldCheck size={18} /><div><strong>Coverage is strongest where business context is complete.</strong><span>5 of 6 critical services have an attested owner and a fresh source observation. The active queue remains the place to make a commitment.</span></div><button type="button" onClick={() => setView("queue")}>Return to queue <ArrowRight size={14} /></button></section>}
        <section className={styles.workspace}>
          <div className={styles.queuePane}><div className={styles.sectionHeader}><div><p className={styles.eyebrow}>WORK TO DECIDE</p><h2>Priority queue <span>{visiblePaths.length}</span></h2></div><button className={styles.filterButton} type="button" onClick={() => setFilterMenu((open) => !open)} aria-expanded={filterMenu}><Filter size={15} />Filters {filter !== "all" && <b>1</b>}</button></div>
            <div className={styles.filterRow} aria-label="Queue filters">{filters.map((item) => <button key={item.id} type="button" className={filter === item.id ? styles.filterActive : ""} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}</div>
            {filterMenu && <div className={styles.filterMenu}><div><Search size={15} /><input aria-label="Search paths" placeholder="Search paths or services" /></div><p>Demo filters apply to the seeded queue.</p><button type="button" onClick={() => { setFilter("all"); setFilterMenu(false); }}>Clear filters</button></div>}
            <div className={styles.queueList}>{visiblePaths.length ? visiblePaths.map((path) => <button key={path.id} type="button" className={`${styles.pathCard} ${selected.id === path.id ? styles.pathSelected : ""}`} onClick={() => { setSelectedId(path.id); setToast(`Selected ${path.ticket} · evidence and ownership shown in the inspector`); }} aria-pressed={selected.id === path.id}><span className={`${styles.priorityRail} ${classFor(path.priority)}`} /><div className={styles.cardTopline}><span className={`${styles.priorityPill} ${classFor(path.priority)}`}>{path.priority === "Critical" ? <AlertTriangle size={12} /> : <Target size={12} />}{path.priority}</span><span className={`${styles.statusPill} ${classFor(path.status)}`}>{path.status}</span></div><div className={styles.pathMain}><div><h3>{path.title}</h3><p>{path.reason}</p></div><ChevronRight className={styles.cardChevron} size={18} /></div><div className={styles.pathFacts}><span><Target size={13} />{path.target}</span><span className={`${styles.due} ${styles[path.dueTone]}`}><Clock3 size={13} />{path.due}</span><span className={styles.ownerChip}><i className={`${styles.avatarTiny} ${avatarClass(path.tone)}`}>{path.initials}</i>{path.owner}</span></div></button>) : <div className={styles.emptyState}><div><CheckCircle2 size={22} /></div><h3>No matching paths</h3><p>This filter has no seeded work right now. Your urgent queue is not silently cleared.</p><button type="button" onClick={() => setFilter("all")}>Clear filters</button></div>}</div>
          </div>
          <aside className={styles.inspector} aria-label="Selected exposure path details"><div className={styles.inspectorTop}><div className={styles.inspectorLabel}><span className={`${styles.priorityPill} ${classFor(selected.priority)}`}>{selected.priority === "Critical" ? <AlertTriangle size={12} /> : <Target size={12} />}{selected.priority}</span><span className={styles.mono}>{selected.ticket}</span></div><button className={styles.iconButtonSmall} type="button" aria-label="Close selected path" onClick={() => setToast("The inspector remains available so the queue keeps its context.")}><X size={17} /></button></div><h2>{selected.title}</h2><div className={styles.targetLine}><Target size={15} /><span>Targets <strong>{selected.target}</strong></span><i>{selected.targetMeta}</i></div>
            <section className={styles.whyCard}><div className={styles.whyHeader}><span><Zap size={15} />WHY THIS IS IN YOUR QUEUE</span><span>{selected.confidence}% confidence</span></div><p>{selected.reason}. This path connects a reachable entry point to a business-critical target.</p><div className={styles.factorGrid}><span className={selected.kev ? styles.factorCritical : ""}>{selected.kev ? "KEV" : "SIGNAL"}<b>{selected.kev ? "Known exploited" : selected.epss}</b></span><span>REACHABILITY<b>Public entry</b></span><span>TARGET<b>{selected.targetMeta.split(" · ")[0]}</b></span><span>FRESHNESS<b>{selected.freshness}</b></span></div><button type="button" className={styles.textButton} onClick={() => setToast("Priority combines exploit signal, reachability, target tier, and source confidence—not CVSS alone.")}>How is this prioritized? <ChevronRight size={14} /></button></section>
            <section className={styles.routeSection}><div className={styles.subsectionHeader}><div><p>EXPOSURE ROUTE</p><h3>One route. One interruption.</h3></div><span>{selected.assets} assets</span></div><div className={styles.route} aria-label={`Exposure route: ${selected.entry}, then ${selected.transition}, then ${selected.target}`}><div className={styles.routeNode}><span className={styles.nodeIcon}><Cloud size={14} /></span><div><small>ENTRY</small><b>{selected.entry}</b></div></div><span className={styles.routeConnector}><ArrowRight size={14} /></span><div className={`${styles.routeNode} ${styles.routeChoke}`}><span className={styles.nodeIcon}><ShieldAlert size={14} /></span><div><small>CHOKE POINT</small><b>{selected.transition}</b></div></div><span className={styles.routeConnector}><ArrowRight size={14} /></span><div className={styles.routeNode}><span className={styles.nodeIcon}><Target size={14} /></span><div><small>TARGET</small><b>{selected.target}</b></div></div></div><div className={styles.recommendation}><span><ShieldCheck size={16} /></span><div><small>RECOMMENDED INTERRUPTION</small><strong>{selected.recommendation}</strong><p>Blocks the transition at the highest-leverage point.</p></div></div></section>
            <section className={styles.planSection}><div className={styles.subsectionHeader}><div><p>OWNED COMMITMENT</p><h3>{selected.status === "Needs owner" ? "No owner yet" : "Plan and verification"}</h3></div><span className={`${styles.statusPill} ${classFor(selected.status)}`}>{selected.status}</span></div><div className={styles.ownerPlan}><span className={`${styles.avatarLarge} ${avatarClass(selected.tone)}`}>{selected.initials}</span><div><small>ACCOUNTABLE OWNER</small><b>{selected.owner}</b><span>{selected.status === "Needs owner" ? "Assign an accountable service owner" : `${selected.service} service team`}</span></div><button type="button" aria-label="Change owner" onClick={() => setToast("In production this opens the scoped service-owner picker.")}><ChevronDown size={16} /></button></div><div className={styles.planDetail}><div><span><FileCheck2 size={14} />PLAN</span><p>{selected.plan}</p></div><div><span><Timer size={14} />COMMITMENT</span><p>{selected.due} · <a href="#evidence" onClick={(event) => { event.preventDefault(); setToast(`${selected.ticket} is a demo ticket reference.`); }}>{selected.ticket}</a></p></div></div><div className={styles.planActions}><button className={`${styles.primaryButton} ${selected.status === "Verified" ? styles.completedButton : ""}`} type="button" onClick={primaryAction} disabled={selected.status === "Verified"}>{selected.status === "Verified" ? <CheckCircle2 size={16} /> : <ShieldCheck size={16} />}{primaryLabel}</button>{selected.status !== "Verified" && <button className={styles.ghostButton} type="button" onClick={toggleBlock}>{selected.status === "Blocked" ? "Resume plan" : "Mark blocked"}</button>}</div></section>
            <section className={styles.evidenceSection} id="evidence"><div className={styles.subsectionHeader}><div><p>EVIDENCE & ACTIVITY</p><h3>Traceable, not opaque</h3></div><button type="button" onClick={() => setToast("Evidence export is a production capability; this demo keeps all data local.")}>View all</button></div><div className={styles.evidenceMeta}><span><b>{selected.cve}</b><i>{selected.kev ? "CISA KEV" : "Source evidence"}</i></span><span><b>{selected.epss}</b><i>Exploit likelihood</i></span><span><b>{selected.confidence}%</b><i>Path confidence</i></span></div><div className={styles.timeline}>{selected.activity.slice(0, 3).map((item, index) => <div className={styles.timelineEvent} key={`${item.detail}-${index}`}><span className={`${styles.timelineDot} ${styles[item.tone]}`} /><div><p><b>{item.actor}</b> {item.detail}</p><time>{item.time}</time></div></div>)}</div></section>
          </aside>
        </section>
      </div>
    </section>
    <div className={styles.toast} role="status" aria-live="polite"><span><Check size={14} /></span>{toast}</div>
  </main>;
}
