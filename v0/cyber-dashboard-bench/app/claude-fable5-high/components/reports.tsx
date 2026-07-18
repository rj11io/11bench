"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { FileDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import {
  AGING_BUCKETS,
  BURNDOWN_KEV,
  BURNDOWN_STEADY,
  PEOPLE,
  SLA_BY_TEAM,
} from "../lib/data"
import { formatCount, OK_COLOR, SEVERITY_COLOR } from "../lib/format"
import { useStore } from "../lib/store"
import { SectionLabel } from "./bits"

const AXIS_TICK = { fill: "#96a0b5", fontSize: 11 } as const
const GRID_STROKE = "rgba(226,236,255,0.07)"

export function ReportsView() {
  const { state, packs } = useStore()

  if (state.scenario === "first-run") {
    return (
      <EmptyReports />
    )
  }

  const active = packs.filter((p) => p.status !== "verified" && p.status !== "accepted")
  const breached = active.filter((p) => p.breached)
  const criticals = active.filter((p) => p.severity === "critical")
  const verifiedCount = packs.filter((p) => p.status === "verified").length
  const totalFindings = packs.reduce((s, p) => s + p.findingCount, 0)
  const burndown = state.scenario === "kev-morning" ? BURNDOWN_KEV : BURNDOWN_STEADY
  const compliance = Math.round(
    ((packs.length - breached.length) / Math.max(1, packs.length)) * 100
  )

  const breachedOwners = [
    ...new Set(
      breached
        .map((p) => PEOPLE.find((person) => person.id === p.ownerId)?.team)
        .filter(Boolean)
    ),
  ]

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="font-heading text-lg font-semibold">Reports</h1>
          <p className="text-[13px] text-muted-foreground">
            SLA performance and risk trend — the view you forward to your CEO or auditor
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast.info("Demo build", {
              description:
                "In production this exports a signed PDF audit-evidence report.",
            })
          }
        >
          <FileDownIcon aria-hidden />
          Export audit evidence
        </Button>
      </header>

      {/* Exec summary — plain sentences first, charts second */}
      <section
        aria-label="Executive summary"
        className="rounded-xl border border-border bg-card px-4 py-3.5"
      >
        <SectionLabel>This week, in plain language</SectionLabel>
        <p className="mt-2 max-w-3xl text-[13.5px] leading-relaxed">
          {formatCount(totalFindings)} raw scanner findings are consolidated into{" "}
          {packs.length} fixes; {active.length} are active and {verifiedCount} are
          verified closed. {criticals.length === 0
            ? "No critical fixes are open."
            : `${criticals.length} critical ${criticals.length === 1 ? "fix is" : "fixes are"} open, ${
                criticals.filter((p) => p.ownerId).length
              } of them owned.`}{" "}
          {breached.length === 0
            ? "Nothing is past its deadline."
            : `${breached.length} ${breached.length === 1 ? "fix is" : "fixes are"} past deadline${
                breachedOwners.length ? ` (with ${breachedOwners.join(", ")})` : ""
              } — flagged at the top of the queue.`}{" "}
          {state.scenario === "kev-morning" &&
            "Overnight, CISA confirmed active exploitation of two flaws that affect us; both re-ranked to the top of the queue and one is newly under emergency SLA."}
        </p>
      </section>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Stat label="SLA compliance" value={`${compliance}%`} good={compliance >= 90} />
        <Stat label="Open critical fixes" value={String(criticals.length)} good={criticals.length === 0} />
        <Stat label="Past deadline" value={String(breached.length)} good={breached.length === 0} />
        <Stat label="Verified closed (all time)" value={String(verifiedCount)} good />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section
          aria-label="Exposure burndown"
          className="rounded-xl border border-border bg-card p-4"
        >
          <SectionLabel>Open critical + high fixes, last 12 weeks</SectionLabel>
          <p className="mt-1 text-xs text-muted-foreground">
            {state.scenario === "kev-morning"
              ? "Trending down for 11 weeks; this week's KEV additions put 3 back on the board."
              : "Trending down 11 of 12 weeks — the burndown your board asks about."}
          </p>
          <div className="mt-3 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={burndown} margin={{ top: 4, right: 8, bottom: 0, left: -18 }}>
                <CartesianGrid stroke={GRID_STROKE} vertical={false} />
                <XAxis
                  dataKey="week"
                  tick={AXIS_TICK}
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis tick={AXIS_TICK} tickLine={false} axisLine={false} width={40} />
                <Area
                  type="monotone"
                  dataKey="high"
                  name="High"
                  stackId="1"
                  stroke={SEVERITY_COLOR.high}
                  fill={SEVERITY_COLOR.high}
                  fillOpacity={0.18}
                  strokeWidth={1.5}
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="critical"
                  name="Critical"
                  stackId="1"
                  stroke={SEVERITY_COLOR.critical}
                  fill={SEVERITY_COLOR.critical}
                  fillOpacity={0.28}
                  strokeWidth={1.5}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1.5 flex gap-4 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="size-2 rounded-[3px]" style={{ background: SEVERITY_COLOR.critical }} />
              Critical
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="size-2 rounded-[3px]" style={{ background: SEVERITY_COLOR.high }} />
              High
            </span>
          </p>
        </section>

        <section
          aria-label="SLA compliance by team"
          className="rounded-xl border border-border bg-card p-4"
        >
          <SectionLabel>SLA compliance by owning team, trailing 90 days</SectionLabel>
          <p className="mt-1 text-xs text-muted-foreground">
            Sorted worst-last — IT Ops and Web are where fixes stall.
          </p>
          <div className="mt-3 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={SLA_BY_TEAM}
                layout="vertical"
                margin={{ top: 0, right: 36, bottom: 0, left: -8 }}
              >
                <CartesianGrid stroke={GRID_STROKE} horizontal={false} />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  type="category"
                  dataKey="team"
                  tick={{ ...AXIS_TICK, fill: "#dbe2ee" }}
                  tickLine={false}
                  axisLine={false}
                  width={72}
                />
                <Bar
                  dataKey="compliance"
                  radius={[3, 3, 3, 3]}
                  barSize={18}
                  isAnimationActive={false}
                  label={{
                    position: "right",
                    fill: "#96a0b5",
                    fontSize: 11,
                    formatter: (v: unknown) => `${v}%`,
                  }}
                >
                  {SLA_BY_TEAM.map((row) => (
                    <Cell
                      key={row.team}
                      fill={row.compliance >= 90 ? OK_COLOR : row.compliance >= 80 ? "#4cc2ff" : SEVERITY_COLOR.high}
                      fillOpacity={0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            Green ≥90% · blue ≥80% · orange below 80%. Labels show exact values.
          </p>
        </section>
      </div>

      <section
        aria-label="Aging of open fixes"
        className="rounded-xl border border-border bg-card p-4"
      >
        <SectionLabel>Age of open fixes by severity</SectionLabel>
        <p className="mt-1 text-xs text-muted-foreground">
          The right-hand tail is the risk story: anything critical living past 30 days
          needs a decision — fix it or formally accept it.
        </p>
        <div className="mt-3 h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={AGING_BUCKETS} margin={{ top: 4, right: 8, bottom: 0, left: -24 }}>
              <CartesianGrid stroke={GRID_STROKE} vertical={false} />
              <XAxis dataKey="bucket" tick={AXIS_TICK} tickLine={false} axisLine={false} />
              <YAxis tick={AXIS_TICK} tickLine={false} axisLine={false} allowDecimals={false} />
              <Bar dataKey="critical" name="Critical" stackId="a" fill={SEVERITY_COLOR.critical} fillOpacity={0.85} barSize={40} isAnimationActive={false} />
              <Bar dataKey="high" name="High" stackId="a" fill={SEVERITY_COLOR.high} fillOpacity={0.75} isAnimationActive={false} />
              <Bar dataKey="medium" name="Medium" stackId="a" fill={SEVERITY_COLOR.medium} fillOpacity={0.55} radius={[3, 3, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-1.5 flex flex-wrap gap-4 text-[11px] text-muted-foreground">
          {(["critical", "high", "medium"] as const).map((sev) => (
            <span key={sev} className="inline-flex items-center gap-1.5">
              <span aria-hidden className="size-2 rounded-[3px]" style={{ background: SEVERITY_COLOR[sev] }} />
              {sev[0].toUpperCase() + sev.slice(1)}
            </span>
          ))}
        </p>
      </section>

      <p className="text-center text-[11px] text-muted-foreground/60">
        Trend series are seeded demo data; stat tiles compute live from the queue state.
      </p>
    </div>
  )
}

function Stat({ label, value, good }: { label: string; value: string; good?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className="mt-1 font-mono text-2xl font-semibold tabular-nums"
        style={{ color: good ? OK_COLOR : SEVERITY_COLOR.high }}
      >
        {value}
      </p>
    </div>
  )
}

function EmptyReports() {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/50 px-6 py-24 text-center">
      <h1 className="font-heading text-lg font-semibold">No data to report yet</h1>
      <p className="max-w-sm text-[13px] text-muted-foreground">
        Reports light up once a scanner is connected and the first fixes flow
        through the queue. Load the sample workspace from the Fix Queue to see them.
      </p>
    </div>
  )
}
