"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import styles from "../assay.module.css"
import { formatDate, formatDateTime, plural, relative } from "../lib/format"
import { REASON_LABEL } from "../lib/scoring"
import { DAY, HISTORY, NOW, TENANT } from "../lib/seed"
import type {
  Acceptance,
  AuditEvent,
  CoverageSummary,
  DerivedFinding,
  Role,
} from "../lib/types"
import { Btn, Empty, Panel, StateChip, cx, stateClass } from "./primitives"

export function ReportView({
  summary,
  findings,
  acceptances,
  audit,
  targetPct,
  role,
  registerFilter,
  onRegisterFilter,
  onOpen,
  onApprove,
  canApprove,
  actor,
}: {
  summary: CoverageSummary
  findings: DerivedFinding[]
  acceptances: Acceptance[]
  audit: AuditEvent[]
  targetPct: number
  role: Role
  registerFilter: "active" | "expiring" | "expired"
  onRegisterFilter: (f: "active" | "expiring" | "expired") => void
  onOpen: (finding: DerivedFinding) => void
  onApprove: (findingId: string) => void
  canApprove: boolean
  actor: string
}) {
  const docRef = React.useRef<HTMLDivElement>(null)
  const [copied, setCopied] = React.useState<string | null>(null)
  const byId = new Map(findings.map((f) => [f.id, f]))
  const improved = HISTORY[HISTORY.length - 1].verifiedPct - HISTORY[0].verifiedPct
  const expiringSoon = acceptances.filter(
    (a) => a.approvedBy && a.expiresAt - NOW <= 14 * DAY && a.expiresAt > NOW
  )
  const nextExpiry = findings
    .filter((f) => f.state === "verified" && f.latestPass)
    .map((f) => ({
      finding: f,
      at: f.latestPass!.ranAt + f.freshnessWindowDays * DAY,
    }))
    .sort((a, b) => a.at - b.at)[0]

  const trend = HISTORY.map((h) => ({
    week: h.week,
    Verified: h.verified,
    Decaying: h.decaying,
    Assumed: h.assumed,
    Broken: h.broken,
    Blind: h.blind,
    Accepted: h.accepted,
  }))

  const filteredRegister = acceptances.filter((a) => {
    if (registerFilter === "expired") return a.expiresAt <= NOW
    if (registerFilter === "expiring")
      return a.approvedBy !== null && a.expiresAt - NOW <= 14 * DAY && a.expiresAt > NOW
    return a.expiresAt > NOW
  })

  return (
    <div className={styles.stack}>
      <div className={styles.reportGrid}>
        <Panel
          id="report"
          title="Assurance report"
          meta="generated from the ledger"
          actions={
            <Btn
              onClick={() => {
                const text = docRef.current?.innerText
                if (text && navigator.clipboard) {
                  void navigator.clipboard.writeText(text).then(
                    () => setCopied("Copied"),
                    () => setCopied("Copy blocked")
                  )
                } else {
                  setCopied("Copy blocked")
                }
              }}
            >
              {copied ?? "Copy as text"}
            </Btn>
          }
        >
          <div className={styles.reportDoc} ref={docRef}>
            <div className={styles.reportMeta}>
              <span>{`tenant: ${TENANT} (demo)`}</span>
              <span>{`scope: tier 1–3, ${summary.scopedTotal} techniques`}</span>
              <span>{`generated: ${formatDateTime(NOW)} UTC`}</span>
              <span>{`by: ${actor} · ${role}`}</span>
            </div>

            <h3>What improved this period</h3>
            <p>
              {`Tier-1 verified coverage moved from ${HISTORY[0].verifiedPct}% to ${HISTORY[HISTORY.length - 1].verifiedPct}% across twelve weeks — ${improved} points. Assumed coverage fell from ${HISTORY[0].assumed} techniques to ${HISTORY[HISTORY.length - 1].assumed}, which is the number that matters: those were claims nobody had tested.`}
            </p>

            <h3>Where we stand now</h3>
            <p>
              {`Of ${summary.scopedTotal} techniques in scope, ${summary.verified} are verified (${summary.verifiedPct}%). ${summary.claimedPct}% have a mapped, enabled analytic — the figure a rule-counting dashboard would report. The difference, ${summary.gapPoints} points, is the assurance gap.`}
            </p>
            <ul>
              <li>
                {`${plural(summary.broken, "technique")} broken — content exists but a dependency has failed.`}
              </li>
              <li>
                {`${plural(summary.assumed, "technique")} assumed — a rule exists and nothing has ever tested it.`}
              </li>
              <li>
                {`${plural(summary.decaying, "technique")} decaying — proven once, now past the freshness window.`}
              </li>
              <li>
                {`${plural(summary.blind, "technique")} blind — no detection content at all.`}
              </li>
              <li>
                {`${plural(summary.accepted, "technique")} formally accepted, each with a named approver and an expiry date.`}
              </li>
            </ul>

            <h3>Service level</h3>
            <p>
              {`The commitment is ${targetPct}% of tier-1 techniques verified inside a 30-day window. Current: ${summary.tierOneVerifiedPct}% (${summary.tierOneVerified} of ${summary.tierOneTotal}). `}
              {summary.budgetUsed > summary.budgetTotal
                ? `The budget of ${summary.budgetTotal} unverified techniques is exhausted; we are ${summary.budgetUsed - summary.budgetTotal} over.`
                : `${summary.budgetTotal - summary.budgetUsed} of ${summary.budgetTotal} budget remains.`}
            </p>

            <h3>Open control failures</h3>
            <p>
              {`${plural(summary.brokenAnalytics, "analytic")} cannot fire, and ${plural(summary.brokenLogSources, "log source")} ${summary.brokenLogSources === 1 ? "is" : "are"} silent past its heartbeat window. This section is the evidence an assessor asks for under PCI DSS v4.0 requirement 10.7 — that failures of critical security control systems are detected and addressed.`}
            </p>

            <h3>What expires next</h3>
            <p>
              {nextExpiry
                ? `${nextExpiry.finding.technique.id} (${nextExpiry.finding.technique.name}) leaves its freshness window on ${formatDate(nextExpiry.at)} — ${relative(nextExpiry.at, NOW)}. `
                : "No verified technique is inside its window, so there is nothing to expire. "}
              {expiringSoon.length > 0
                ? `${plural(expiringSoon.length, "accepted gap")} ${expiringSoon.length === 1 ? "expires" : "expire"} within 14 days and will return to the queue automatically.`
                : "No accepted gap expires within 14 days."}
            </p>

            <h3>What this report does not claim</h3>
            <p>
              Every figure above is derived from the four inputs shown in the
              product: content, telemetry, validation and fidelity. Nothing here
              is modelled, extrapolated or benchmarked against an industry
              average. Where evidence is missing, the state says so rather than
              filling the gap with an estimate. All data is a demo fixture.
            </p>
          </div>
        </Panel>

        <div className={styles.stack}>
          <Panel
            id="trend"
            title="How the composition changed"
            meta="12 weeks · tier 1"
          >
            <div className={styles.chartBox} style={{ height: "11rem" }}>
              <ResponsiveContainer
                width="100%"
                height="100%"
                initialDimension={{ width: 360, height: 176 }}
              >
                <AreaChart
                  data={trend}
                  margin={{ top: 6, right: 6, bottom: 0, left: -24 }}
                >
                  <CartesianGrid
                    stroke="var(--line)"
                    strokeDasharray="2 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 9, fill: "var(--faint)" }}
                    tickLine={false}
                    axisLine={{ stroke: "var(--line-2)" }}
                    interval={2}
                  />
                  <YAxis
                    tick={{ fontSize: 9, fill: "var(--faint)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--panel)",
                      border: "1px solid var(--line-2)",
                      borderRadius: 6,
                      fontSize: 11,
                      color: "var(--text)",
                    }}
                    labelStyle={{ color: "var(--dim)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Verified"
                    stackId="1"
                    isAnimationActive={false}
                    stroke="var(--verified)"
                    strokeWidth={1}
                    fill="var(--verified)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="Decaying"
                    stackId="1"
                    isAnimationActive={false}
                    stroke="var(--decaying)"
                    strokeWidth={1}
                    fill="var(--decaying)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="Assumed"
                    stackId="1"
                    isAnimationActive={false}
                    stroke="var(--assumed)"
                    strokeWidth={1}
                    fill="var(--assumed)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="Broken"
                    stackId="1"
                    isAnimationActive={false}
                    stroke="var(--broken)"
                    strokeWidth={1}
                    fill="var(--broken)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="Blind"
                    stackId="1"
                    isAnimationActive={false}
                    stroke="var(--blind)"
                    strokeWidth={1}
                    fill="var(--blind)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="Accepted"
                    stackId="1"
                    isAnimationActive={false}
                    stroke="var(--accepted)"
                    strokeWidth={1}
                    fill="var(--accepted)"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className={cx(styles.legend, styles.legendInline)}>
              {(
                [
                  ["verified", "Verified"],
                  ["decaying", "Decaying"],
                  ["assumed", "Assumed"],
                  ["broken", "Broken"],
                  ["blind", "Blind"],
                  ["accepted", "Accepted"],
                ] as const
              ).map(([state, label]) => (
                <span
                  key={state}
                  className={cx(styles.legendItem, stateClass(state))}
                  data-active="true"
                  data-static="true"
                >
                  <span className={styles.legendSwatch} aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
            <p className={styles.kpiSub}>
              The shape that matters is assumed shrinking while verified grows.
              The last two weeks show broken climbing as telemetry failed.
            </p>
          </Panel>

          <Panel
            id="register"
            title="Accepted-gap register"
            meta={plural(filteredRegister.length, "entry", "entries")}
            actions={
              <label className={styles.field}>
                <span>Show</span>
                <select
                  value={registerFilter}
                  onChange={(e) =>
                    onRegisterFilter(
                      e.target.value as "active" | "expiring" | "expired"
                    )
                  }
                >
                  <option value="active">Active</option>
                  <option value="expiring">Expiring ≤ 14d</option>
                  <option value="expired">Expired</option>
                </select>
              </label>
            }
          >
            {filteredRegister.length === 0 ? (
              <Empty
                glyph="▣"
                title={
                  registerFilter === "expired"
                    ? "Nothing has expired"
                    : registerFilter === "expiring"
                      ? "Nothing expires in the next 14 days"
                      : "No accepted gaps"
                }
              >
                {registerFilter === "active"
                  ? "Every gap is either being worked or is still unowned. Accepting one requires a reason, a justification, an expiry date, and an approver who is not the requester."
                  : "Accepted gaps revert to their underlying state on expiry and return to the queue automatically, so this list does not stay empty by accident."}
              </Empty>
            ) : (
              <div className={styles.stack}>
                {filteredRegister.map((a) => {
                  const finding = byId.get(a.findingId)
                  const expiring =
                    a.approvedBy !== null &&
                    a.expiresAt - NOW <= 14 * DAY &&
                    a.expiresAt > NOW
                  return (
                    <div
                      className={styles.registerItem}
                      key={a.findingId}
                      data-expiring={expiring ? "true" : undefined}
                      data-pending={a.approvedBy ? undefined : "true"}
                    >
                      <div className={styles.registerTop}>
                        <button
                          type="button"
                          className={styles.linkBtn}
                          onClick={() => finding && onOpen(finding)}
                        >
                          {a.techniqueId}
                        </button>
                        <span className={styles.micro}>
                          {REASON_LABEL[a.reason]}
                        </span>
                        {finding ? (
                          <StateChip state={finding.state} size="sm" />
                        ) : null}
                        <span
                          className={cx(
                            styles.micro,
                            stateClass(expiring ? "decaying" : "accepted")
                          )}
                          style={{ marginLeft: "auto", color: "var(--s)" }}
                        >
                          {a.approvedBy
                            ? `expires ${formatDate(a.expiresAt)} · ${relative(a.expiresAt, NOW)}`
                            : "pending approval"}
                        </span>
                      </div>
                      <p className={styles.quote}>{a.justification}</p>
                      <p className={styles.kpiSub} style={{ marginTop: "0.375rem" }}>
                        {a.approvedBy
                          ? `Requested by ${a.requestedBy} on ${formatDate(a.requestedAt)} · approved by ${a.approvedBy} on ${formatDate(a.approvedAt ?? a.requestedAt)}`
                          : `Requested by ${a.requestedBy} on ${formatDate(a.requestedAt)} · awaiting a second approver`}
                      </p>
                      {!a.approvedBy ? (
                        <div
                          className={styles.actionRow}
                          style={{ marginTop: "0.5rem" }}
                        >
                          <Btn
                            variant="caution"
                            disabled={!canApprove || a.requestedBy === actor}
                            aria-disabled={!canApprove || a.requestedBy === actor}
                            title={
                              a.requestedBy === actor
                                ? "You requested this. Someone else must approve it."
                                : canApprove
                                  ? undefined
                                  : "Only the security operations manager role can approve"
                            }
                            onClick={() => onApprove(a.findingId)}
                          >
                            Approve
                          </Btn>
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            )}
          </Panel>
        </div>
      </div>

      <Panel
        id="audit"
        title="Audit trail"
        meta="append-only · never editable"
      >
        <p className={styles.panelNote}>
          Every state change writes one entry with actor, role, action, target and
          detail. Production adds a hash chain so the log is tamper-evident; this
          demo does not simulate hashing, because a fake hash would be a claim
          with nothing behind it.
        </p>
        <ol className={styles.auditList}>
          {audit.slice(0, 40).map((e) => (
            <li className={styles.auditItem} key={e.id}>
              <span className={styles.auditTime}>{formatDateTime(e.at)}</span>
              <span>
                <span className={styles.auditAction}>{e.action}</span>{" "}
                <span className={styles.auditActor}>{e.actor}</span>
                <span className={styles.techId}>{` · ${e.role}`}</span>
                <span className={styles.auditDetail} style={{ display: "block" }}>
                  {e.detail}
                </span>
                {e.fanOut && e.fanOut.length > 0 ? (
                  <span className={styles.fanOut}>
                    {`fan-out: ${e.fanOut.join(", ")}`}
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  )
}
