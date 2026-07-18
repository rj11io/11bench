"use client"

import { useEffect, useMemo, useState } from "react"
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  ExternalLink,
  Filter,
  Layers3,
  Lock,
  RefreshCcw,
  ShieldAlert,
  Sparkles,
  SquareActivity,
  TimerReset,
  UserRound,
  Workflow,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type Status = "Critical" | "High" | "Medium" | "Low"
type WorkState = "New" | "Assigned" | "In progress" | "Mitigated" | "Accepted risk" | "Resolved"
type Environment = "Prod" | "Prod + Internet" | "Corp" | "Dev"
type Domain = "Cloud" | "Endpoint" | "Identity" | "App" | "Container"

type Exposure = {
  id: string
  title: string
  status: Status
  workState: WorkState
  env: Environment
  domain: Domain
  source: string
  kev: boolean
  internetExposed: boolean
  asset: string
  owner: string
  due: string
  score: number
  rationale: string[]
  remediation: string
  evidence: string[]
  chain: string[]
  coverage: number
  ageDays: number
  tags: string[]
}

type Filters = {
  env: string
  domain: string
  status: string
  sort: "risk" | "age" | "owner"
}

const STORAGE_KEY = "codex-gpt5.4mini-light.exposures"

const initialItems: Exposure[] = [
  {
    id: "EXP-2048",
    title: "Internet-facing VPN gateway linked to KEV-tracked auth bypass",
    status: "Critical",
    workState: "New",
    env: "Prod + Internet",
    domain: "Identity",
    source: "Tenable + CISA KEV",
    kev: true,
    internetExposed: true,
    asset: "vpn-nyc-01",
    owner: "Network Security",
    due: "2026-07-17",
    score: 97,
    rationale: ["Observed in KEV", "Externally reachable", "Controls gap: no compensating WAF", "Internet-adjacent identity plane"],
    remediation: "Patch now and rotate any cached credentials; add temporary access control if patching requires downtime.",
    evidence: ["CVE matches active exploit list", "Public IP present", "Admin portal reachable", "No MFA enforcement on legacy path"],
    chain: ["Internet", "VPN gateway", "Identity provider", "Privileged admin workspace"],
    coverage: 92,
    ageDays: 4,
    tags: ["KEV", "externally exposed", "no MFA"],
  },
  {
    id: "EXP-2091",
    title: "Production Kubernetes cluster allows privilege escalation through vulnerable admission controller",
    status: "High",
    workState: "Assigned",
    env: "Prod",
    domain: "Container",
    source: "Wiz + internal scanner",
    kev: false,
    internetExposed: false,
    asset: "k8s-prod-east",
    owner: "Platform Engineering",
    due: "2026-07-22",
    score: 88,
    rationale: ["Critical service", "Pod breakout path", "Service account over-permissioned", "Patch available"],
    remediation: "Roll forward the admission controller update and tighten service account scope before the next deployment window.",
    evidence: ["Namespace has cluster-admin bindings", "Admission controller version below fixed release", "Privileged pod template detected"],
    chain: ["External package ingress", "Admission controller", "Namespace takeover", "Secrets access"],
    coverage: 86,
    ageDays: 9,
    tags: ["privilege escalation", "cluster-admin"],
  },
  {
    id: "EXP-2110",
    title: "Crown-jewel finance SaaS token lacks rotation policy",
    status: "Medium",
    workState: "In progress",
    env: "Corp",
    domain: "App",
    source: "CASB + app audit",
    kev: false,
    internetExposed: false,
    asset: "finance-ops",
    owner: "Business Applications",
    due: "2026-07-25",
    score: 74,
    rationale: ["Sensitive data access", "Long-lived token", "Service owner exists", "Moderate blast radius"],
    remediation: "Rotate token, enforce expiry, and move to scoped service credentials with quarterly review.",
    evidence: ["Last rotation 181 days ago", "Read/write scope broader than needed", "Used by finance automation only"],
    chain: ["SaaS API", "Finance workflows", "Ledger export", "Sensitive records"],
    coverage: 79,
    ageDays: 12,
    tags: ["token hygiene", "sensitive data"],
  },
  {
    id: "EXP-2128",
    title: "Shadow admin account with stale MFA enrollment on privileged portal",
    status: "High",
    workState: "Assigned",
    env: "Corp",
    domain: "Identity",
    source: "Entra ID + IAM audit",
    kev: false,
    internetExposed: true,
    asset: "priv-portal",
    owner: "Identity Engineering",
    due: "2026-07-18",
    score: 84,
    rationale: ["Privileged account", "Stale MFA", "Externally reachable portal", "Unused for 63 days"],
    remediation: "Disable inactive admin, re-enroll MFA, and require conditional access on every privileged sign-in.",
    evidence: ["Last sign-in 63 days ago", "MFA device removed", "Conditional access exception present"],
    chain: ["Portal", "Admin auth", "Directory roles", "Tenant-wide settings"],
    coverage: 88,
    ageDays: 6,
    tags: ["privileged", "MFA gap"],
  },
  {
    id: "EXP-2144",
    title: "Dev container image with high CVSS but isolated blast radius",
    status: "Low",
    workState: "Resolved",
    env: "Dev",
    domain: "Container",
    source: "Scanner only",
    kev: false,
    internetExposed: false,
    asset: "dev-buildkit",
    owner: "Developer Experience",
    due: "2026-08-03",
    score: 31,
    rationale: ["Non-production", "No reachable path", "Patch scheduled", "No sensitive secrets mounted"],
    remediation: "Patch in the next base-image refresh and keep this item in the low-priority maintenance lane.",
    evidence: ["Container isolated", "No internet exposure", "No privileged runtime flags"],
    chain: ["Dev container", "Build agent", "Artifact cache"],
    coverage: 64,
    ageDays: 18,
    tags: ["maintenance", "no reachability"],
  },
  {
    id: "EXP-2160",
    title: "Public storage bucket with customer files reachable from a misconfigured policy",
    status: "Critical",
    workState: "Mitigated",
    env: "Prod + Internet",
    domain: "Cloud",
    source: "CSPM + DLP",
    kev: false,
    internetExposed: true,
    asset: "customer-archive",
    owner: "Cloud Operations",
    due: "2026-07-16",
    score: 95,
    rationale: ["Sensitive data present", "Public access path", "Misconfigured policy", "Fast fix available"],
    remediation: "Lock down the bucket policy, review access logs, and confirm no external distribution before closure.",
    evidence: ["Public ACL detected", "DLP found PII", "No approved exception", "Access path from web"],
    chain: ["Public internet", "Storage policy", "Customer archive", "PII exposure"],
    coverage: 94,
    ageDays: 2,
    tags: ["PII", "public bucket"],
  },
]

const envOptions = ["All", ...new Set(initialItems.map((item) => item.env))]
const domainOptions = ["All", ...new Set(initialItems.map((item) => item.domain))]
const statusOptions = ["All", ...new Set(initialItems.map((item) => item.status))]

const stateLabelTone: Record<WorkState, string> = {
  New: "border-red-500/25 bg-red-500/10 text-red-200",
  Assigned: "border-amber-500/25 bg-amber-500/10 text-amber-200",
  "In progress": "border-sky-500/25 bg-sky-500/10 text-sky-200",
  Mitigated: "border-teal-500/25 bg-teal-500/10 text-teal-200",
  "Accepted risk": "border-violet-500/25 bg-violet-500/10 text-violet-200",
  Resolved: "border-emerald-500/25 bg-emerald-500/10 text-emerald-200",
}

function readLocalState(): Exposure[] {
  if (typeof window === "undefined") return initialItems
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialItems
    const parsed = JSON.parse(raw) as Exposure[]
    return Array.isArray(parsed) && parsed.length ? parsed : initialItems
  } catch {
    return initialItems
  }
}

function scoreBand(score: number) {
  if (score >= 90) return "Critical"
  if (score >= 75) return "High"
  if (score >= 50) return "Medium"
  return "Low"
}

function dueTone(due: string) {
  const days = Math.ceil((new Date(due).getTime() - new Date("2026-07-16").getTime()) / 86400000)
  if (days < 0) return "text-red-300"
  if (days <= 3) return "text-amber-200"
  return "text-slate-300"
}

function MiniBars({ values }: { values: number[] }) {
  const max = Math.max(...values, 1)
  return (
    <div className="flex h-11 items-end gap-1.5">
      {values.map((value, index) => (
        <div
          key={index}
          className="flex-1 rounded-t-md bg-gradient-to-t from-slate-500/30 to-cyan-300/80"
          style={{ height: `${Math.max(20, (value / max) * 100)}%` }}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function MetricCard({
  label,
  value,
  sublabel,
  icon,
  delta,
}: {
  label: string
  value: string
  sublabel: string
  icon: React.ReactNode
  delta?: string
}) {
  return (
    <Card className="border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur">
      <CardContent className="flex items-start gap-4 p-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-cyan-200">{icon}</div>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
          <div className="mt-2 flex items-end gap-2">
            <p className="text-2xl font-semibold text-slate-50">{value}</p>
            {delta ? <span className="pb-1 text-xs text-emerald-300">{delta}</span> : null}
          </div>
          <p className="mt-1 text-sm text-slate-300">{sublabel}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function Dashboard() {
  const [items, setItems] = useState<Exposure[]>(initialItems)
  const [selectedId, setSelectedId] = useState(initialItems[0].id)
  const [filters, setFilters] = useState<Filters>({ env: "All", domain: "All", status: "All", sort: "risk" })
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setItems(readLocalState())
      setHydrated(true)
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [hydrated, items])

  const filtered = useMemo(() => {
    const subset = items.filter((item) => {
      const envOk = filters.env === "All" || item.env === filters.env
      const domainOk = filters.domain === "All" || item.domain === filters.domain
      const statusOk = filters.status === "All" || item.status === filters.status
      return envOk && domainOk && statusOk
    })
    const sorted = [...subset].sort((a, b) => {
      if (filters.sort === "risk") return b.score - a.score
      if (filters.sort === "age") return b.ageDays - a.ageDays
      return a.owner.localeCompare(b.owner)
    })
    return sorted
  }, [items, filters])

  const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? items[0]

  const summary = useMemo(() => {
    const total = filtered.length
    const critical = filtered.filter((item) => item.status === "Critical").length
    const overdue = filtered.filter((item) => new Date(item.due) < new Date("2026-07-16")).length
    const unowned = filtered.filter((item) => !item.owner).length
    const average = total ? Math.round(filtered.reduce((sum, item) => sum + item.score, 0) / total) : 0
    const kevCount = filtered.filter((item) => item.kev).length
    return { total, critical, overdue, unowned, average, kevCount }
  }, [filtered])

  const chartData = useMemo(() => {
    return [68, 54, 61, 44, 39, 32, 26]
  }, [])

  const empty = filtered.length === 0

  function updateExposure(id: string, patch: Partial<Exposure>) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }

  const attention = summary.overdue > 0 || filtered.some((item) => item.kev && item.status === "Critical")

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-[1600px] flex-col px-4 py-4 text-slate-100 sm:px-6 lg:px-8">
      <header className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_90px_rgba(0,0,0,0.32)] backdrop-blur md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-cyan-400/25 bg-cyan-400/10 text-cyan-100">
                Exposure Command Center
              </Badge>
              <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                Demo data only
              </Badge>
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Prioritize what attackers can actually reach, explain why, and push the fix into action.
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-[15px]">
              This demo models a sales-led exposure management product for lean security teams. It deduplicates findings, ranks exploitable risk, and turns the top items into owned remediation work.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 self-start">
            <Button variant="outline" className="border-white/10 bg-white/5 text-slate-100 hover:bg-white/10">
              <Filter className="size-4" />
              Filters
            </Button>
            <Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
              <Sparkles className="size-4" />
              Build remediation plan
            </Button>
          </div>
        </div>

        {attention ? (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-3 text-amber-50">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-medium">High-attention state</p>
              <p className="text-sm text-amber-100/85">
                {summary.overdue} overdue exposures and {summary.kevCount} KEV-tagged items are in scope. The queue is sorted to keep the highest-risk work visible first.
              </p>
            </div>
          </div>
        ) : null}
      </header>

      <section className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <div className="xl:col-span-2">
          <MetricCard label="Open exposures" value={String(summary.total)} sublabel="Filtered queue after dedupe and enrichment." icon={<SquareActivity className="size-5" />} />
        </div>
        <div className="xl:col-span-1">
          <MetricCard label="Critical" value={String(summary.critical)} sublabel="Items needing immediate attention." icon={<ShieldAlert className="size-5" />} />
        </div>
        <div className="xl:col-span-1">
          <MetricCard label="Avg risk" value={String(summary.average)} sublabel="Blended risk score for the filtered set." icon={<TimerReset className="size-5" />} delta="+6 vs last review" />
        </div>
        <div className="xl:col-span-1">
          <MetricCard label="KEV-backed" value={String(summary.kevCount)} sublabel="Known exploited vulnerabilities in the queue." icon={<CircleAlert className="size-5" />} />
        </div>
        <div className="xl:col-span-1">
          <MetricCard label="Unowned" value={String(summary.unowned)} sublabel="Items that still need assignment." icon={<UserRound className="size-5" />} />
        </div>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_440px]">
        <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-100">Workspace</p>
            <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-300">
              {hydrated ? "live demo state" : "loading"}
            </Badge>
          </div>

          <div className="mt-4 space-y-3">
            {[
              { label: "Overview", icon: <Layers3 className="size-4" /> },
              { label: "Queue", icon: <Workflow className="size-4" /> },
              { label: "Exceptions", icon: <BookOpen className="size-4" /> },
              { label: "Reporting", icon: <BadgeCheck className="size-4" /> },
            ].map((item, index) => (
              <button
                key={item.label}
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left transition",
                  index === 1
                    ? "border-cyan-400/25 bg-cyan-400/10 text-cyan-50"
                    : "border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/7"
                )}
              >
                <span className="flex items-center gap-3">
                  <span className="rounded-lg border border-white/10 bg-white/5 p-2">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </span>
                <ChevronRight className="size-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">7-day trend</p>
              <span className="text-xs text-slate-400">queue pressure</span>
            </div>
            <div className="mt-3">
              <MiniBars values={chartData} />
            </div>
            <p className="mt-3 text-sm text-slate-300">
              Backlog pressure is easing, but the top of queue remains dominated by externally reachable items.
            </p>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">Source coverage</span>
              <span className="font-mono text-slate-100">91%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[91%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" />
            </div>
            <p className="text-xs leading-5 text-slate-400">
              Coverage confidence is visible so the operator knows whether the queue is complete or still partial.
            </p>
          </div>
        </aside>

        <section className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-100">Prioritized queue</p>
              <p className="mt-1 text-sm text-slate-400">
                Ranked by exploitability, internet exposure, criticality, and compensating controls.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                aria-label="Filter environment"
                value={filters.env}
                onChange={(e) => setFilters((current) => ({ ...current, env: e.target.value }))}
                className="h-9 rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none"
              >
                {envOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <select
                aria-label="Filter domain"
                value={filters.domain}
                onChange={(e) => setFilters((current) => ({ ...current, domain: e.target.value }))}
                className="h-9 rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none"
              >
                {domainOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <select
                aria-label="Filter status"
                value={filters.status}
                onChange={(e) => setFilters((current) => ({ ...current, status: e.target.value }))}
                className="h-9 rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none"
              >
                {statusOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <select
                aria-label="Sort queue"
                value={filters.sort}
                onChange={(e) =>
                  setFilters((current) => ({ ...current, sort: e.target.value as Filters["sort"] }))
                }
                className="h-9 rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none"
              >
                <option value="risk">Sort: risk</option>
                <option value="age">Sort: age</option>
                <option value="owner">Sort: owner</option>
              </select>
            </div>
          </div>

          {empty ? (
            <div className="flex h-[560px] items-center justify-center">
              <div className="max-w-sm rounded-3xl border border-dashed border-white/15 bg-slate-950/30 p-8 text-center">
                <p className="text-base font-medium text-slate-100">No exposures match this filter.</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Reset filters or broaden the environment scope to return items to the queue.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-white/10 bg-white/5 text-slate-100"
                  onClick={() => setFilters({ env: "All", domain: "All", status: "All", sort: "risk" })}
                >
                  Reset filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {filtered.map((item) => {
                const active = item.id === selected.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={cn(
                      "group w-full rounded-3xl border p-4 text-left transition",
                      active
                        ? "border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
                        : "border-white/10 bg-slate-950/35 hover:border-white/20 hover:bg-white/[0.06]"
                    )}
                  >
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-300">
                            {item.id}
                          </Badge>
                          <Badge variant="outline" className={cn("border-white/10", stateLabelTone[item.workState])}>
                            {item.workState}
                          </Badge>
                          <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-300">
                            {item.env}
                          </Badge>
                          <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-300">
                            {item.domain}
                          </Badge>
                          {item.kev ? (
                            <Badge variant="destructive" className="bg-red-500/10 text-red-100">
                              KEV
                            </Badge>
                          ) : null}
                        </div>
                        <p className="mt-3 text-base font-medium text-slate-50">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {item.source} · {item.asset} · owner {item.owner}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col items-start gap-2 xl:items-end">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "rounded-2xl border px-3 py-1 text-sm font-semibold",
                              item.score >= 90
                                ? "border-red-400/20 bg-red-400/10 text-red-100"
                                : item.score >= 75
                                  ? "border-amber-400/20 bg-amber-400/10 text-amber-100"
                                  : "border-slate-400/20 bg-slate-400/10 text-slate-100"
                            )}
                          >
                            {scoreBand(item.score)} {item.score}
                          </span>
                          <ArrowRight className={cn("size-4 text-slate-500 transition group-hover:translate-x-0.5", active && "text-cyan-200")} />
                        </div>
                        <p className={cn("text-sm font-medium", dueTone(item.due))}>
                          Due {item.due}
                        </p>
                        <p className="text-xs text-slate-400">{item.ageDays} days old</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </section>

        <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-100">Detail workspace</p>
              <p className="text-xs text-slate-400">Selected exposure and remediation controls</p>
            </div>
            <Button variant="ghost" size="icon-sm" className="border border-white/10 bg-white/5 text-slate-100" onClick={() => setItems(initialItems)}>
              <RefreshCcw className="size-4" />
            </Button>
          </div>

          <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/40 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-cyan-400/20 bg-cyan-400/10 text-cyan-100">
                {selected.id}
              </Badge>
              <Badge variant="outline" className={cn("border-white/10", stateLabelTone[selected.workState])}>
                {selected.workState}
              </Badge>
              <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-300">
                {selected.score} risk score
              </Badge>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-slate-50">{selected.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{selected.remediation}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Owner</p>
                <p className="mt-1 text-sm font-medium text-slate-100">{selected.owner}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Due</p>
                <p className={cn("mt-1 text-sm font-medium", dueTone(selected.due))}>{selected.due}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="why" className="mt-4">
            <TabsList className="grid w-full grid-cols-3 bg-slate-950/40">
              <TabsTrigger value="why">Why now</TabsTrigger>
              <TabsTrigger value="evidence">Evidence</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>
            <TabsContent value="why" className="mt-4">
              <div className="space-y-3">
                {selected.rationale.map((line) => (
                  <div key={line} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3">
                    <BadgeCheck className="mt-0.5 size-4 text-cyan-200" />
                    <p className="text-sm leading-6 text-slate-200">{line}</p>
                  </div>
                ))}
                <div className="rounded-2xl border border-white/10 bg-emerald-400/10 p-3 text-sm text-emerald-100">
                  Attack path: {selected.chain.join(" → ")}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="evidence" className="mt-4">
              <div className="space-y-3">
                {selected.evidence.map((line) => (
                  <div key={line} className="rounded-2xl border border-white/10 bg-slate-950/35 p-3 text-sm leading-6 text-slate-200">
                    {line}
                  </div>
                ))}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300">
                  Source coverage: {selected.coverage}% with corroboration from {selected.source}.
                </div>
              </div>
            </TabsContent>
            <TabsContent value="actions" className="mt-4">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {["Patch now", "Mitigate", "Rotate credential", "Accept risk"].map((label) => (
                    <Button
                      key={label}
                      variant="outline"
                      className="justify-start border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                      onClick={() =>
                        updateExposure(selected.id, {
                          workState:
                            label === "Accept risk"
                              ? "Accepted risk"
                              : label === "Patch now"
                                ? "In progress"
                                : "Assigned",
                        })
                      }
                    >
                      <ArrowRight className="size-4" />
                      {label}
                    </Button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    className="bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                    onClick={() => updateExposure(selected.id, { workState: "Resolved", score: Math.max(18, selected.score - 26) })}
                  >
                    <CheckCircle2 className="size-4" />
                    Mark resolved
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/10 bg-white/5 text-slate-100"
                    onClick={() => updateExposure(selected.id, { workState: "Mitigated", score: Math.max(22, selected.score - 14) })}
                  >
                    <Lock className="size-4" />
                    Apply mitigation
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 space-y-3 rounded-3xl border border-white/10 bg-slate-950/35 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-100">Remediation panel</p>
              <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-300">
                collaborative
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <UserRound className="size-4 text-slate-400" />
              <span>Assigned to {selected.owner}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CalendarDays className="size-4 text-slate-400" />
              <span>Due {selected.due}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Bell className="size-4 text-slate-400" />
              <span>{selected.tags.join(" · ")}</span>
            </div>
            <div className="mt-2 grid gap-2">
              <Button
                variant="outline"
                className="justify-start border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                onClick={() => updateExposure(selected.id, { workState: "Assigned" })}
              >
                <Workflow className="size-4" />
                Create remediation task
              </Button>
              <Button
                variant="outline"
                className="justify-start border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                onClick={() => updateExposure(selected.id, { workState: "Accepted risk" })}
              >
                <ShieldAlert className="size-4" />
                Record accepted risk
              </Button>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.03] to-violet-400/10 p-4">
            <p className="text-sm font-medium text-slate-50">Demo note</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              All findings, owners, and workflow state are simulated. The interface demonstrates how a production exposure-management dashboard could prioritize and route work.
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm text-cyan-100">
              <ExternalLink className="size-4" />
              <span>Built around KEV, exposure context, and remediation handoff</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}
