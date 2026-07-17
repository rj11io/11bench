"use client"

import { Activity, AlertTriangle, ArrowRight, CheckCircle2, ClipboardCheck, FileText, Layers, ShieldCheck } from "lucide-react"
import { useMemo, useState } from "react"
import styles from "./page.module.css"

type Mode = "normal" | "volatile" | "risk"
type Scenario = "spot" | "stress15" | "stress25"

const scenarioData: Record<Scenario, { name: string; shock: string; hf: number; note: string }> = {
  spot: { name: "Spot snapshot", shock: "No price shock", hf: 1.58, note: "Current seeded inputs" },
  stress15: { name: "ETH −15%", shock: "Collateral price shock", hf: 1.34, note: "Illustrative scenario" },
  stress25: { name: "ETH −25%", shock: "Collateral price shock", hf: 1.18, note: "Illustrative scenario" },
}

export default function Page() {
  const [mode, setMode] = useState<Mode>("normal")
  const [scenario, setScenario] = useState<Scenario>("spot")
  const [drawer, setDrawer] = useState(false)
  const [draft, setDraft] = useState(() => typeof window !== "undefined" && localStorage.getItem("harbor-demo-draft") === "reviewed")
  const current = scenarioData[scenario]
  const baseHF = mode === "risk" ? 1.18 : mode === "volatile" ? 1.39 : current.hf
  const buffer = baseHF - 1.35
  const atRisk = buffer < 0
  const railSpot = `${Math.max(12, Math.min(91, (baseHF - 0.85) * 92))}%`

  const positionState = useMemo(() => atRisk ? "Action required" : mode === "volatile" ? "Review today" : "Within policy", [atRisk, mode])
  function saveDraft() { localStorage.setItem("harbor-demo-draft", "reviewed"); setDraft(true); setDrawer(false) }

  return <main className={styles.shell}>
    <div className={styles.top}><span className={styles.brand}>HARBOR / TREASURY OS</span><span className={styles.demo}>SEEDED DEMO · NOT LIVE DATA</span><span>Snapshot: 16 Jul 2026 · 14:32 UTC</span></div>
    <div className={styles.layout}>
      <aside className={styles.side}><div className={styles.logo}>harbor<i>·</i></div><nav className={styles.nav}>
        <button className={styles.active}><Activity size={16}/>Overview</button><button><AlertTriangle size={16}/>Risk queue <b>2</b></button><button><ShieldCheck size={16}/>Policies</button><button><FileText size={16}/>Activity</button>
      </nav><div className={styles.bottom}>Northstar Foundation<br/><span>Operator workspace</span></div></aside>
      <section className={styles.workspace}>
        <div className={styles.mobileNav}><strong>harbor<span>·</span></strong><span className={styles.demo}>DEMO</span></div>
        <header className={styles.heading}><div><div className={styles.eyebrow}>Tuesday risk review</div><h1>Your next decision is in DeFi credit.</h1><p>Policy-relative exposure, evidence, and an approval-ready next step.</p></div><div className={styles.seg}>{(["normal","volatile","risk"] as Mode[]).map(v=><button key={v} onClick={()=>setMode(v)} className={mode===v?styles.selected:""}>{v === "risk" ? "At risk" : v[0].toUpperCase()+v.slice(1)}</button>)}</div></header>
        <div className={`${styles.notice} ${atRisk ? styles.risk : ""}`}>{atRisk ? <AlertTriangle size={16}/>:<CheckCircle2 size={16}/>}<span><b>{atRisk ? "Policy buffer breached." : mode === "volatile" ? "Volatility watch." : "Snapshot verified."}</b> {atRisk ? "ETH collateral is below your 1.35 health-factor policy target. Review the proposed repay action." : "Values are seeded demonstration inputs; no wallet or transaction is connected."}</span></div>
        <div className={styles.grid}>
          <div className={styles.stack}>
            <section className={`${styles.card} ${styles.riskcard}`}><div className={styles.riskhead}><div className={styles.label}>Policy buffer · Aave-style ETH / USDC</div><span className={`${styles.pill} ${atRisk?styles.danger:mode==="volatile"?styles.warn:""}`}>{positionState}</span></div><div className={styles.hf}>{baseHF.toFixed(2)}</div><div className={styles.sub}>Health factor · policy target <b>1.35</b> · {buffer >= 0 ? "+" : ""}{buffer.toFixed(2)} buffer</div><div className={styles.rail}><span className={styles.dot} style={{"--spot":railSpot} as React.CSSProperties}/></div><div className={styles.railnotes}><span>Liquidation &lt; 1.00</span><span>Team policy 1.35</span><span>Current {baseHF.toFixed(2)}</span></div></section>
            <section className={styles.card}><div className={styles.sectionhead}><div><h2>Risk queue</h2><p>Ordered by policy buffer, not portfolio size.</p></div><span className={styles.source}><i className={styles.dotlive}/> Seeded inputs</span></div><div className={styles.queue}>
              <div className={styles.queueRow}><div className={styles.asset}>ETH / USDC credit<small>Ethereum · aave-style market</small></div><div className={styles.num}>{baseHF.toFixed(2)} HF</div><div className={`${styles.state} ${atRisk?styles.danger:mode==="volatile"?styles.warn:styles.ok}`}>{positionState}</div><ArrowRight className={styles.arrow} size={16}/></div>
              <div className={styles.queueRow}><div className={styles.asset}>USDC reserve<small>Ethereum · operating wallet</small></div><div className={styles.num}>72%</div><div className={`${styles.state} ${styles.warn}`}>Concentrated</div><ArrowRight className={styles.arrow} size={16}/></div>
              <div className={styles.queueRow}><div className={styles.asset}>ARB operating float<small>Arbitrum · no borrow</small></div><div className={styles.num}>—</div><div className={`${styles.state} ${styles.ok}`}>Monitor</div><ArrowRight className={styles.arrow} size={16}/></div>
            </div></section>
          </div>
          <div className={styles.stack}>
            <section className={styles.card}><div className={styles.sectionhead}><div><h2>Shock check</h2><p>Illustrative only — protocol oracle values may differ.</p></div><Layers size={17} color="#5e7068"/></div><div className={styles.scenarios}>{(Object.keys(scenarioData) as Scenario[]).map(key=>{const s=scenarioData[key];return <button onClick={()=>setScenario(key)} className={`${styles.scenario} ${scenario===key?styles.active:""}`} key={key}><strong>{s.name}</strong><span>{s.shock}</span><b>{(mode === "risk" ? Math.min(s.hf,1.18) : s.hf).toFixed(2)} HF</b></button>})}</div><p className={styles.footnote}>Scenario model: collateral price moves while borrow value and risk parameters are held constant. Not a liquidation forecast.</p></section>
            <section className={styles.card}><div className={styles.positionHeader}><div><h2>Position evidence</h2><span className={styles.source}><i className={styles.dotlive}/> Seeded snapshot · 14:32 UTC</span></div><span className={styles.tag}>READ-ONLY</span></div><div className={styles.facts}><div className={styles.fact}><span>Collateral</span><strong>84.20 ETH · $287.7k</strong></div><div className={styles.fact}><span>Borrow</span><strong>182,000 USDC</strong></div><div className={styles.fact}><span>Liquidation threshold</span><strong>80.0% <small>(demo assumption)</small></strong></div><div className={styles.fact}><span>Observed source</span><strong>Seeded protocol/oracle</strong></div></div><div className={styles.explain}><b>Why this matters:</b> {atRisk ? "The position is below Northstar’s internal 1.35 policy target, though above the 1.00 liquidation boundary. A 14.6% collateral decline would cross 1.00 under this simple model." : `At ${baseHF.toFixed(2)}, the position remains ${buffer.toFixed(2)} above policy. ${current.note} should be reviewed against canonical protocol data before action.`}</div><button className={styles.action} onClick={()=>setDrawer(true)}>{atRisk ? "Draft $28k USDC repay for approval" : "Draft a precautionary action"}</button>{draft&&<div className={styles.draft}><ClipboardCheck size={14} style={{verticalAlign:"middle",marginRight:6}}/>Draft saved locally as <b>reviewed</b> — no transaction created.</div>}</section>
          </div>
        </div>
        <p className={styles.footnote}>Harbor demo uses synthetic values and hypothetical policy thresholds. It does not connect wallets, request keys, send transactions, or provide investment, legal, tax, or compliance advice.</p>
      </section>
    </div>
    {drawer && <div className={styles.drawer} role="dialog" aria-label="Action draft"><h3>Reviewable action draft</h3><p>Prepared from seeded data only. Confirm live position, market parameters, and transaction simulation in your established custody flow.</p><label>Proposed action<input defaultValue={atRisk ? "Repay 28,000 USDC" : "Set alert at 1.40 HF"}/></label><label>Owner<input defaultValue="Maya · Treasury operator"/></label><label>Rationale<textarea defaultValue={atRisk ? "Restore policy buffer above 1.35 after verification." : "Create a buffer before the weekly risk review."}/></label><div className={styles.drawerBtns}><button onClick={()=>setDrawer(false)}>Cancel</button><button className={styles.primary} onClick={saveDraft}>Mark reviewed</button></div></div>}
  </main>
}
