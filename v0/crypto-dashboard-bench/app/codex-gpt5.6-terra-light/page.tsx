"use client"

import { useEffect, useMemo, useState } from "react"
import { AlertTriangle, ArrowUpRight, Check, ChevronRight, CircleHelp, Database, ShieldCheck, WalletCards } from "lucide-react"
import styles from "./pulse.module.css"

type Scenario = "normal" | "volatile" | "focus" | "empty"
type Finding = { id: string; title: string; body: string; level: "review" | "risk" | "clear"; amount: string; tag: string }

const scenarios: Record<Exclude<Scenario, "empty">, { protected: string; runway: string; concentration: string; findings: Finding[] }> = {
  normal: { protected: "$1.94m", runway: "8.2", concentration: "62%", findings: [
    { id: "usdc", title: "USDC issuer concentration", body: "62% of protected cash is in one issuer across three venues.", level: "review", amount: "$1.20m", tag: "Policy: 60%" },
    { id: "base", title: "Base operational float", body: "7-day payable buffer is 1.4× the approved operating minimum.", level: "clear", amount: "$336k", tag: "Within band" },
    { id: "yield", title: "Yield position needs owner", body: "Morpho USDC vault has no recorded weekly reviewer.", level: "review", amount: "$184k", tag: "6.1% variable" },
  ] },
  volatile: { protected: "$1.76m", runway: "7.4", concentration: "68%", findings: [
    { id: "depeg", title: "USDC concentration exceeds policy", body: "Stress view: 68% in one issuer while the policy ceiling is 60%.", level: "risk", amount: "$1.20m", tag: "Act today" },
    { id: "liquidity", title: "7-day liquidity has narrowed", body: "Two exchange withdrawals are pending confirmation in this seeded scenario.", level: "review", amount: "$214k", tag: "Coverage 82%" },
    { id: "yield", title: "Yield position needs owner", body: "Morpho USDC vault has no recorded weekly reviewer.", level: "review", amount: "$184k", tag: "6.1% variable" },
  ] },
  focus: { protected: "$1.94m", runway: "8.2", concentration: "62%", findings: [
    { id: "yield", title: "Yield position needs owner", body: "Morpho USDC vault has no recorded weekly reviewer. Smart-contract and liquidity risk remain.", level: "risk", amount: "$184k", tag: "Review this week" },
    { id: "usdc", title: "USDC issuer concentration", body: "62% of protected cash is in one issuer across three venues.", level: "review", amount: "$1.20m", tag: "Policy: 60%" },
    { id: "base", title: "Base operational float", body: "7-day payable buffer is 1.4× the approved operating minimum.", level: "clear", amount: "$336k", tag: "Within band" },
  ] },
}

export default function Page() {
  const [scenario, setScenario] = useState<Scenario>("normal")
  const [selected, setSelected] = useState("usdc")
  const [reviewed, setReviewed] = useState<string[]>(() => {
    if (typeof window === "undefined") return []
    try { return JSON.parse(localStorage.getItem("northstar-reviewed") || "[]") as string[] } catch { return [] }
  })
  useEffect(() => { localStorage.setItem("northstar-reviewed", JSON.stringify(reviewed)) }, [reviewed])
  const current = scenario === "empty" ? null : scenarios[scenario]
  const active = useMemo(() => current?.findings.find((f) => f.id === selected) || current?.findings[0], [current, selected])
  const markReviewed = () => active && setReviewed((old) => old.includes(active.id) ? old : [...old, active.id])

  return <main className={styles.shell}>
    <aside className={styles.rail}><div className={styles.logo}>N<span>◆</span></div><nav><button className={styles.navActive}><WalletCards /> Pulse</button><button><Database /> Evidence</button><button><ShieldCheck /> Policy</button></nav><div className={styles.avatar}>SR</div></aside>
    <section className={styles.app}>
      <header className={styles.top}><div className={styles.mobileLogo}>N<span>◆</span> northstar</div><span className={styles.demo}><span /> SEEDED DEMO — NOT LIVE</span><div className={styles.source}><Database size={14} /> Sample treasury ledger · as of 16 Jul 2026, 09:30 UTC <CircleHelp size={14} /></div></header>
      <div className={styles.content}>
        <div className={styles.titleRow}><div><p className={styles.eyebrow}>AURELIA LABS · WEEKLY TREASURY REVIEW</p><h1>Protect the next <em>90 days.</em></h1><p className={styles.subtitle}>A policy-aware view of stablecoin runway. Values are seeded estimates for product demonstration.</p></div><div className={styles.scenarios}>{(["normal", "volatile", "focus", "empty"] as Scenario[]).map(s => <button key={s} onClick={() => { setScenario(s); if(s !== "empty") setSelected(scenarios[s].findings[0].id) }} className={scenario === s ? styles.chosen : ""}>{s}</button>)}</div></div>
        {current ? <>
          <section className={styles.metrics}><Metric label="Protected cash" value={current.protected} note="89% mapped · USD estimate" tone="green" /><Metric label="Operating runway" value={`${current.runway} mo`} note="at $238k monthly cash burn" /><Metric label="Issuer concentration" value={current.concentration} note="USDC across all venues" tone="amber" /><div className={styles.trust}><ShieldCheck /><div><b>Read-only by design</b><span>No wallet connected · no signing authority</span></div><ChevronRight size={18} /></div></section>
          <section className={styles.workspace}><div className={styles.queue}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>DECISION QUEUE</p><h2>What needs a human?</h2></div><span>{current.findings.filter(f => !reviewed.includes(f.id)).length} open</span></div>{current.findings.map(f => <button key={f.id} className={`${styles.finding} ${active?.id === f.id ? styles.selected : ""}`} onClick={() => setSelected(f.id)}><i className={styles[f.level]}>{f.level === "risk" ? <AlertTriangle size={16} /> : f.level === "clear" ? <Check size={16} /> : "!"}</i><div><b>{f.title}</b><p>{f.body}</p><small>{reviewed.includes(f.id) ? "Reviewed locally" : f.tag}</small></div><strong>{f.amount}<ChevronRight size={17} /></strong></button>)}</div>
            {active && <aside className={styles.detail}><p className={styles.eyebrow}>REVIEW BRIEF</p><div className={styles.detailTitle}><i className={styles[active.level]}><AlertTriangle size={17} /></i><h2>{active.title}</h2></div><p className={styles.detailBody}>{active.body}</p><div className={styles.evidence}><div><span>Policy threshold</span><b>{active.id === "usdc" ? "≤ 60% / issuer" : active.id === "yield" ? "Named owner weekly" : "≥ 1.0× buffer"}</b></div><div><span>Evidence</span><b>Sample ledger · 09:30 UTC</b></div><div><span>Coverage</span><b>{active.id === "liquidity" ? "82% — partial" : "89% mapped"}</b></div></div><div className={styles.allocation}><div className={styles.sectionHead}><span>Protected-cash mix</span><b>{current.protected}</b></div><div className={styles.bar}><i style={{width:"62%"}} /><i style={{width:"21%"}} /><i style={{width:"17%"}} /></div><div className={styles.legend}><span><i /> USDC 62%</span><span><i /> USDT 21%</span><span><i /> EURC 17%</span></div></div><button className={styles.primary} onClick={markReviewed}>{reviewed.includes(active.id) ? <><Check size={17} /> Reviewed on this device</> : <>Mark reviewed <ArrowUpRight size={17} /></>}</button><p className={styles.disclaimer}>A review records an internal workflow state only. It is not a trade, compliance approval, or recommendation.</p></aside>}</section>
        </> : <section className={styles.empty}><div><Database size={28}/><p className={styles.eyebrow}>NO ACCOUNTS MAPPED</p><h2>Start with evidence, not a guess.</h2><p>This demo state represents an organization with no imported or authorized read-only sources. No zero balance is inferred.</p><button className={styles.primary} onClick={() => setScenario("normal")}>Restore seeded workspace <ArrowUpRight size={17}/></button></div></section>}
        <footer><span>Northstar demo · values are illustrative</span><span>Coverage: 89% of known accounts · 3 sources</span></footer>
      </div>
    </section>
  </main>
}

function Metric({label, value, note, tone}: {label:string; value:string; note:string; tone?:string}) { return <article className={styles.metric}><p>{label}</p><strong>{value}</strong><span className={tone ? styles[tone] : ""}>{note}</span></article> }
