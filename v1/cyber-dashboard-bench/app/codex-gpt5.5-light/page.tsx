"use client"

import {
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  RadioTower,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
  TicketCheck,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import styles from "./styles.module.css"

type ExposureStatus = "open" | "assigned" | "exception" | "mitigated" | "monitoring"

type Exposure = {
  id: string
  title: string
  cve: string
  product: string
  summary: string
  owner: string
  service: string
  status: ExposureStatus
  due: string
  severity: "Critical" | "High" | "Medium"
  exploit: "Active exploitation" | "Public PoC" | "Threat intel watch"
  score: number
  assets: number
  internetFacing: number
  confidence: number
  ticket: string
  attention: "High" | "Normal"
  factors: Array<{ label: string; value: number }>
  evidence: Array<{ source: string; text: string; time: string; confidence: string }>
  tactics: string[]
  recommendation: string
}

type ActionState = Record<
  string,
  {
    status: ExposureStatus
    note: string
    updatedAt: string
  }
>

const exposures: Exposure[] = [
  {
    id: "exp-001",
    title: "GeoServer WMS endpoint exposed on billing maps cluster",
    cve: "CVE-2025-58360",
    product: "OSGeo GeoServer",
    summary:
      "Internet-facing XML endpoint accepts crafted requests and maps to the customer billing analytics service.",
    owner: "Platform GIS",
    service: "Billing Analytics",
    status: "open",
    due: "2026-07-15",
    severity: "Critical",
    exploit: "Active exploitation",
    score: 96,
    assets: 18,
    internetFacing: 7,
    confidence: 94,
    ticket: "SEC-1842",
    attention: "High",
    factors: [
      { label: "KEV / exploit signal", value: 100 },
      { label: "Business blast radius", value: 92 },
      { label: "Internet exposure", value: 88 },
      { label: "SLA pressure", value: 100 },
      { label: "Control gap", value: 78 },
    ],
    evidence: [
      {
        source: "CISA KEV",
        text: "Catalog match with remediation due date now past.",
        time: "2026-07-16 08:40",
        confidence: "Authoritative",
      },
      {
        source: "CNAPP",
        text: "7 public load-balanced nodes expose /geoserver/wms.",
        time: "2026-07-16 07:58",
        confidence: "High",
      },
      {
        source: "EDR",
        text: "Two suspicious XML parser child-process attempts blocked.",
        time: "2026-07-15 22:11",
        confidence: "Medium",
      },
    ],
    tactics: ["Initial Access", "Execution", "Impact"],
    recommendation:
      "Patch GeoServer, temporarily block WMS XML entity resolution at the edge, and validate no suspicious child processes remain.",
  },
  {
    id: "exp-002",
    title: "VPN appliance vulnerable on partner access perimeter",
    cve: "CVE-2026-21418",
    product: "SecureGate VPN",
    summary:
      "Unauthenticated appliance bug affects partner SSO ingress with privileged directory reachability.",
    owner: "Network Edge",
    service: "Partner Access",
    status: "assigned",
    due: "2026-07-18",
    severity: "Critical",
    exploit: "Active exploitation",
    score: 91,
    assets: 4,
    internetFacing: 4,
    confidence: 89,
    ticket: "SEC-1837",
    attention: "High",
    factors: [
      { label: "KEV / exploit signal", value: 96 },
      { label: "Business blast radius", value: 82 },
      { label: "Internet exposure", value: 100 },
      { label: "SLA pressure", value: 84 },
      { label: "Control gap", value: 74 },
    ],
    evidence: [
      {
        source: "Threat intel",
        text: "Exploit observed in credential harvesting campaigns.",
        time: "2026-07-16 06:20",
        confidence: "High",
      },
      {
        source: "Scanner",
        text: "All 4 appliances report vulnerable firmware train.",
        time: "2026-07-15 23:04",
        confidence: "High",
      },
    ],
    tactics: ["Initial Access", "Credential Access", "Lateral Movement"],
    recommendation:
      "Upgrade firmware, rotate partner SSO secrets, and enforce geo-fenced emergency access policy until validation passes.",
  },
  {
    id: "exp-003",
    title: "Build runners carry vulnerable OpenSSL package",
    cve: "CVE-2026-10942",
    product: "OpenSSL",
    summary:
      "Private CI runners include a high-severity crypto library package, but no internet listener is present.",
    owner: "Developer Platform",
    service: "CI/CD",
    status: "monitoring",
    due: "2026-07-25",
    severity: "High",
    exploit: "Public PoC",
    score: 68,
    assets: 42,
    internetFacing: 0,
    confidence: 81,
    ticket: "SEC-1819",
    attention: "Normal",
    factors: [
      { label: "KEV / exploit signal", value: 62 },
      { label: "Business blast radius", value: 76 },
      { label: "Internet exposure", value: 12 },
      { label: "SLA pressure", value: 38 },
      { label: "Control gap", value: 58 },
    ],
    evidence: [
      {
        source: "SBOM",
        text: "Package appears in 42 runner images.",
        time: "2026-07-15 17:33",
        confidence: "High",
      },
      {
        source: "VEX",
        text: "Supplier status pending; exploitability not confirmed for batch workers.",
        time: "2026-07-15 16:42",
        confidence: "Medium",
      },
    ],
    tactics: ["Defense Evasion", "Impact"],
    recommendation:
      "Rebuild runner base images during the weekly platform window and attach VEX status before exception approval.",
  },
  {
    id: "exp-004",
    title: "Legacy file gateway isolated after compensating control",
    cve: "CVE-2025-33053",
    product: "WebDAV Gateway",
    summary:
      "Known exploited file-path weakness is still present on a legacy gateway now isolated behind allow-listed transfer jobs.",
    owner: "Enterprise Apps",
    service: "Finance Transfer",
    status: "exception",
    due: "2026-07-30",
    severity: "High",
    exploit: "Active exploitation",
    score: 57,
    assets: 3,
    internetFacing: 0,
    confidence: 76,
    ticket: "SEC-1798",
    attention: "Normal",
    factors: [
      { label: "KEV / exploit signal", value: 90 },
      { label: "Business blast radius", value: 70 },
      { label: "Internet exposure", value: 5 },
      { label: "SLA pressure", value: 20 },
      { label: "Control gap", value: 24 },
    ],
    evidence: [
      {
        source: "Firewall",
        text: "Only scheduled finance transfer subnet can reach service.",
        time: "2026-07-16 05:12",
        confidence: "High",
      },
      {
        source: "Ticketing",
        text: "Exception expires after vendor migration milestone.",
        time: "2026-07-14 11:00",
        confidence: "Medium",
      },
    ],
    tactics: ["Initial Access", "Exfiltration"],
    recommendation:
      "Keep exception time-bound, verify allow-list daily, and remove gateway after finance migration completes.",
  },
]

const sourceHealth = [
  { name: "CISA KEV", state: "Fresh", detail: "Synced 18 min ago" },
  { name: "Cloud inventory", state: "Fresh", detail: "Synced 42 min ago" },
  { name: "Ticketing", state: "Lagging", detail: "Last writeback 5 hr ago" },
  { name: "EDR telemetry", state: "Fresh", detail: "Streaming demo sample" },
]

const statuses: Array<ExposureStatus | "all"> = [
  "all",
  "open",
  "assigned",
  "exception",
  "mitigated",
  "monitoring",
]

export default function Page() {
  const [selectedId, setSelectedId] = useState(exposures[0].id)
  const [statusFilter, setStatusFilter] = useState<ExposureStatus | "all">("all")
  const [ownerFilter, setOwnerFilter] = useState("all")
  const [attentionOnly, setAttentionOnly] = useState(false)
  const [actions, setActions] = useState<ActionState>(() => {
    if (typeof window === "undefined") return {}
    const saved = window.localStorage.getItem("breachline-demo-actions")
    return saved ? (JSON.parse(saved) as ActionState) : {}
  })
  const [note, setNote] = useState("")

  useEffect(() => {
    window.localStorage.setItem("breachline-demo-actions", JSON.stringify(actions))
  }, [actions])

  const merged = useMemo(
    () =>
      exposures
        .map((exposure) => ({
          ...exposure,
          status: actions[exposure.id]?.status ?? exposure.status,
        }))
        .sort((a, b) => b.score - a.score),
    [actions]
  )

  const owners = Array.from(new Set(exposures.map((exposure) => exposure.owner)))
  const filtered = merged.filter((exposure) => {
    const statusMatch = statusFilter === "all" || exposure.status === statusFilter
    const ownerMatch = ownerFilter === "all" || exposure.owner === ownerFilter
    const attentionMatch = !attentionOnly || exposure.attention === "High"
    return statusMatch && ownerMatch && attentionMatch
  })

  const selected = merged.find((exposure) => exposure.id === selectedId) ?? merged[0]
  const highAttention = merged.filter((exposure) => exposure.attention === "High")
  const overdue = merged.filter(
    (exposure) =>
      new Date(exposure.due) < new Date("2026-07-16") &&
      exposure.status !== "mitigated"
  )
  const actionMessage = actions[selected.id]

  function updateSelected(status: ExposureStatus) {
    setActions((current) => ({
      ...current,
      [selected.id]: {
        status,
        note: note.trim() || `Analyst marked ${status}.`,
        updatedAt: new Date().toLocaleString(),
      },
    }))
    setNote("")
  }

  function resetDemo() {
    setActions({})
    setStatusFilter("all")
    setOwnerFilter("all")
    setAttentionOnly(false)
    setSelectedId(exposures[0].id)
    setNote("")
  }

  return (
    <main className={styles.shell}>
      <section className={styles.hero} aria-labelledby="page-title">
        <div>
          <p className={styles.eyebrow}>Demo data only · exploit-aware exposure operations</p>
          <h1 id="page-title">Breachline Exposure Command</h1>
          <p className={styles.heroCopy}>
            A focused triage workspace for security teams deciding which exploited
            exposures need ownership, remediation, or defensible exception today.
          </p>
        </div>
        <div className={styles.heroStatus} aria-label="Source freshness summary">
          <RadioTower size={18} />
          <div>
            <strong>Source confidence 88%</strong>
            <span>CISA, scanner, CNAPP, EDR, and ticketing signals are seeded demo samples.</span>
          </div>
        </div>
      </section>

      <section className={styles.metrics} aria-label="Exposure posture">
        <Metric icon={<ShieldAlert size={18} />} label="High attention" value={`${highAttention.length}`} detail="active exploit or due-date pressure" tone="danger" />
        <Metric icon={<Clock size={18} />} label="Overdue KEV" value={`${overdue.length}`} detail="past policy due date" tone="warning" />
        <Metric icon={<TicketCheck size={18} />} label="Owner coverage" value="100%" detail="all demo exposures mapped" tone="good" />
        <Metric icon={<ShieldCheck size={18} />} label="Risk burn-down" value="-31%" detail="simulated 14-day trend" tone="info" />
      </section>

      <section className={styles.workbench}>
        <div className={styles.queuePanel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.eyebrow}>Ranked queue</p>
              <h2>Today&apos;s decisions</h2>
            </div>
            <button className={styles.iconButton} type="button" onClick={resetDemo} aria-label="Reset demo">
              <RefreshCcw size={17} />
            </button>
          </div>

          <div className={styles.filters} aria-label="Queue filters">
            <label>
              <Filter size={15} />
              <span>Status</span>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as ExposureStatus | "all")}>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All" : titleCase(status)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Owner</span>
              <select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value)}>
                <option value="all">All owners</option>
                {owners.map((owner) => (
                  <option key={owner} value={owner}>
                    {owner}
                  </option>
                ))}
              </select>
            </label>
            <button
              className={`${styles.toggle} ${attentionOnly ? styles.toggleOn : ""}`}
              type="button"
              onClick={() => setAttentionOnly((value) => !value)}
              aria-pressed={attentionOnly}
            >
              High attention
            </button>
          </div>

          <div className={styles.queueList}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <FileText size={24} />
                <h3>No matching demo exposures</h3>
                <p>Adjust filters to return to the seeded triage queue.</p>
                <button type="button" onClick={resetDemo}>Reset filters</button>
              </div>
            ) : (
              filtered.map((exposure) => (
                <button
                  className={`${styles.queueItem} ${selected.id === exposure.id ? styles.queueItemActive : ""}`}
                  key={exposure.id}
                  type="button"
                  onClick={() => setSelectedId(exposure.id)}
                >
                  <span className={styles.score}>{exposure.score}</span>
                  <span className={styles.queueText}>
                    <strong>{exposure.title}</strong>
                    <span>{exposure.cve} · {exposure.service}</span>
                    <span className={styles.chipRow}>
                      <Chip label={exposure.exploit} tone={exposure.attention === "High" ? "danger" : "warning"} />
                      <Chip label={titleCase(exposure.status)} tone={statusTone(exposure.status)} />
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>
        </div>

        <article className={styles.detailPanel} aria-labelledby="detail-title">
          <div className={styles.detailTop}>
            <div>
              <p className={styles.eyebrow}>{selected.cve} · {selected.product}</p>
              <h2 id="detail-title">{selected.title}</h2>
              <p>{selected.summary}</p>
            </div>
            <div className={styles.scoreCard}>
              <span>{selected.score}</span>
              <strong>priority</strong>
              <small>{selected.confidence}% confidence</small>
            </div>
          </div>

          <div className={styles.detailGrid}>
            <Info label="Owner" value={selected.owner} />
            <Info label="Business service" value={selected.service} />
            <Info label="Due date" value={selected.due} />
            <Info label="Assets" value={`${selected.assets} affected / ${selected.internetFacing} public`} />
          </div>

          <section className={styles.factorPanel} aria-labelledby="factors-title">
            <h3 id="factors-title">Why this is ranked here</h3>
            {selected.factors.map((factor) => (
              <div className={styles.factor} key={factor.label}>
                <span>{factor.label}</span>
                <div>
                  <i style={{ width: `${factor.value}%` }} />
                </div>
                <b>{factor.value}</b>
              </div>
            ))}
          </section>

          <section className={styles.evidencePanel} aria-labelledby="evidence-title">
            <h3 id="evidence-title">Evidence and attack context</h3>
            <div className={styles.tactics}>
              {selected.tactics.map((tactic) => (
                <Chip key={tactic} label={tactic} tone="info" />
              ))}
            </div>
            <ol className={styles.timeline}>
              {selected.evidence.map((event) => (
                <li key={`${event.source}-${event.time}`}>
                  <strong>{event.source}</strong>
                  <span>{event.text}</span>
                  <small>{event.time} · {event.confidence}</small>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.actionPanel} aria-labelledby="action-title">
            <div>
              <h3 id="action-title">Recommended action</h3>
              <p>{selected.recommendation}</p>
            </div>
            <label>
              Analyst note
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Add owner context, mitigation evidence, or exception rationale."
              />
            </label>
            <div className={styles.actions}>
              <button type="button" onClick={() => updateSelected("assigned")}>Assign remediation</button>
              <button type="button" onClick={() => updateSelected("exception")}>Record exception</button>
              <button type="button" onClick={() => updateSelected("mitigated")}>Mark mitigated</button>
            </div>
            {actionMessage ? (
              <p className={styles.liveState} role="status">
                <CheckCircle2 size={16} /> Last action: {titleCase(actionMessage.status)} at {actionMessage.updatedAt}. Note: {actionMessage.note}
              </p>
            ) : null}
          </section>
        </article>
      </section>

      <section className={styles.lowerGrid}>
        <div className={styles.sidePanel}>
          <h2>Source health</h2>
          {sourceHealth.map((source) => (
            <div className={styles.sourceRow} key={source.name}>
              <span className={source.state === "Fresh" ? styles.dotGood : styles.dotWarn} />
              <div>
                <strong>{source.name}</strong>
                <small>{source.detail}</small>
              </div>
              <Chip label={source.state} tone={source.state === "Fresh" ? "good" : "warning"} />
            </div>
          ))}
        </div>
        <div className={styles.sidePanel}>
          <h2>Owner workload</h2>
          {owners.map((owner) => {
            const count = merged.filter((exposure) => exposure.owner === owner && exposure.status !== "mitigated").length
            return (
              <div className={styles.ownerRow} key={owner}>
                <span>{owner}</span>
                <div aria-hidden="true"><i style={{ width: `${Math.max(18, count * 34)}%` }} /></div>
                <strong>{count}</strong>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function Metric({
  icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: React.ReactNode
  label: string
  value: string
  detail: string
  tone: "danger" | "warning" | "good" | "info"
}) {
  return (
    <div className={`${styles.metric} ${styles[tone]}`}>
      <div>{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.info}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function Chip({ label, tone }: { label: string; tone: "danger" | "warning" | "good" | "info" | "neutral" }) {
  return <span className={`${styles.chip} ${styles[`chip-${tone}`]}`}>{label}</span>
}

function statusTone(status: ExposureStatus): "danger" | "warning" | "good" | "info" | "neutral" {
  if (status === "open") return "danger"
  if (status === "assigned") return "warning"
  if (status === "mitigated") return "good"
  if (status === "exception") return "info"
  return "neutral"
}

function titleCase(value: string) {
  return value.replace(/(^|\s|-)\S/g, (match) => match.toUpperCase())
}
