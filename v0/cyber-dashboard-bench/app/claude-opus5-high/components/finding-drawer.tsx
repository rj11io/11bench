"use client"

import * as React from "react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"

import styles from "../assay.module.css"
import {
  compact,
  formatDate,
  fromDateInput,
  relative,
  toDateInput,
} from "../lib/format"
import {
  FIX_META,
  METHOD_LABEL,
  REASON_LABEL,
  RESULT_LABEL,
  STATE_META,
} from "../lib/scoring"
import { DAY, NOW } from "../lib/seed"
import { PERMISSIONS, actorFor } from "../lib/store"
import type {
  AcceptanceReason,
  DerivedFinding,
  LogSource,
  Role,
  ValidationMethod,
  ValidationResult,
} from "../lib/types"
import {
  Btn,
  FreshnessPips,
  Sparkline,
  StateChip,
  cx,
  stateClass,
} from "./primitives"

type PanelKey = "content" | "telemetry" | "validation" | "fidelity" | "why"

const PANEL_TITLES: Record<PanelKey, string> = {
  content: "Content — is there an enabled analytic?",
  telemetry: "Telemetry — are its log sources alive?",
  validation: "Validation — did a test produce an alert?",
  fidelity: "Fidelity — is it useful when it fires?",
  why: "Why this rank",
}

const ACCEPT_REASONS: AcceptanceReason[] = [
  "compensating-control",
  "telemetry-unavailable",
  "not-applicable",
  "accepted-business-risk",
  "vendor-limitation",
]

export interface DrawerActions {
  assign: (ids: string[], owner: string, dueAt: number) => void
  validate: (input: {
    techniqueId: string
    analyticId: string | null
    method: ValidationMethod
    testId: string
    result: ValidationResult
  }) => void
  requestAcceptance: (input: {
    findingId: string
    techniqueId: string
    reason: AcceptanceReason
    justification: string
    expiresAt: number
  }) => void
  approveAcceptance: (findingId: string) => void
  withdrawAcceptance: (findingId: string) => void
  restoreTelemetry: (logSourceId: string) => void
}

export function FindingDrawer({
  finding,
  logSources,
  blockedSiblings,
  role,
  density,
  onClose,
  actions,
}: {
  finding: DerivedFinding | null
  logSources: LogSource[]
  blockedSiblings: DerivedFinding[]
  role: Role
  density: string
  onClose: () => void
  actions: DrawerActions
}) {
  const perms = PERMISSIONS[role]

  return (
    <Sheet
      open={Boolean(finding)}
      onOpenChange={(next) => {
        if (!next) {
          onClose()
        }
      }}
    >
      <SheetContent
        side="right"
        data-density={density}
        className={cx(
          styles.tokens,
          styles.drawer,
          "data-[side=right]:w-full data-[side=right]:sm:max-w-[43rem] gap-0 p-0"
        )}
      >
        {finding ? (
          /* Keyed so panel and form state reset for each finding, which keeps
             the "expand the failing input" rule out of an effect. */
          <DrawerInner
            key={finding.id}
            finding={finding}
            logSources={logSources}
            blockedSiblings={blockedSiblings}
            role={role}
            actions={actions}
            canWrite={perms.write}
            canApprove={perms.approve}
          />
        ) : (
          <>
            <SheetTitle className={styles.srOnly}>No finding selected</SheetTitle>
            <SheetDescription className={styles.srOnly}>
              Select a finding from the queue.
            </SheetDescription>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

/* -------------------------------------------------------------------------- */

function DrawerInner({
  finding,
  logSources,
  blockedSiblings,
  role,
  actions,
  canWrite,
  canApprove,
}: {
  finding: DerivedFinding
  logSources: LogSource[]
  blockedSiblings: DerivedFinding[]
  role: Role
  actions: DrawerActions
  canWrite: boolean
  canApprove: boolean
}) {
  // The failing input opens first — it is the answer to the question the user
  // arrived with.
  const [open, setOpen] = React.useState<Record<PanelKey, boolean>>(() => ({
    content: finding.failingInput === "content",
    telemetry: finding.failingInput === "telemetry",
    validation: finding.failingInput === "validation",
    fidelity: finding.failingInput === "fidelity",
    why: finding.failingInput === "none",
  }))
  const [form, setForm] = React.useState<"none" | "assign" | "validate" | "accept">(
    "none"
  )
  const sourceById = new Map(logSources.map((s) => [s.id, s]))
  const enabled = finding.analytics.filter((a) => a.analytic.enabled)
  const toggle = (key: PanelKey) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }))

  const acceptance = finding.acceptance
  const pending = acceptance && !acceptance.approvedBy ? acceptance : null
  const actor = actorFor(role)
  const selfApproval = pending?.requestedBy === actor

  return (
    <>
      <header className={styles.drawerHead}>
        <div className={styles.drawerTitleRow}>
          <span className={cx(styles.techId, styles.mono)}>
            {finding.technique.id}
          </span>
          <span className={styles.tierTag} data-tier={finding.technique.tier}>
            {`T${finding.technique.tier}`}
          </span>
          <StateChip
            state={finding.state}
            ageDays={finding.evidenceAgeDays}
            size="lg"
          />
          {finding.state === "verified" || finding.state === "decaying" ? (
            <FreshnessPips
              confidence={finding.confidence}
              state={finding.state}
            />
          ) : null}
        </div>
        <SheetTitle className={styles.drawerTitle}>
          {finding.technique.name}
        </SheetTitle>
        <SheetDescription className={styles.drawerReason}>
          {finding.reason}
        </SheetDescription>
      </header>

      <div className={styles.drawerScroll}>
        {finding.blockingLogSourceIds.length > 0 && blockedSiblings.length > 1 ? (
          <div className={styles.blockNote}>
            <span aria-hidden="true">◆</span>
            <span>
              <strong>{`Blast radius: ${blockedSiblings.length} findings`}</strong> share
              this failing dependency. Restoring{" "}
              <span className={styles.mono}>
                {finding.blockingLogSourceIds[0]}
              </span>{" "}
              clears all of them in one action.
              {canWrite ? (
                <>
                  {" "}
                  <button
                    type="button"
                    className={styles.linkBtn}
                    onClick={() =>
                      actions.restoreTelemetry(finding.blockingLogSourceIds[0])
                    }
                  >
                    Restore telemetry now
                  </button>
                </>
              ) : null}
            </span>
          </div>
        ) : null}

        {acceptance ? (
          <div className={styles.blockNote} data-tone="info">
            <span aria-hidden="true">▣</span>
            <span>
              {acceptance.approvedBy ? (
                <>
                  <strong>Gap accepted.</strong>{" "}
                  {`${REASON_LABEL[acceptance.reason]}. Requested by ${acceptance.requestedBy}, approved by ${acceptance.approvedBy}, expires ${formatDate(acceptance.expiresAt)} (${relative(acceptance.expiresAt, NOW)}).`}
                </>
              ) : (
                <>
                  <strong>Acceptance pending approval.</strong>{" "}
                  {`Requested by ${acceptance.requestedBy}. Someone other than the requester must approve it.`}
                </>
              )}
              <span className={styles.quote} style={{ display: "block" }}>
                {acceptance.justification}
              </span>
            </span>
          </div>
        ) : null}

        {/* 1 — Content */}
        <EvidencePanel
          index={1}
          panelKey="content"
          open={open.content}
          onToggle={toggle}
          failing={finding.failingInput === "content"}
          status={
            finding.analytics.length === 0
              ? "No analytic mapped"
              : `${enabled.length} of ${finding.analytics.length} enabled`
          }
          state={finding.analytics.length === 0 ? "blind" : undefined}
        >
          {finding.analytics.length === 0 ? (
            <p className={styles.hint}>
              Nothing is mapped to this technique in the SIEM inventory or the
              detection repository. Fix class:{" "}
              <strong>{FIX_META[finding.fixClass].label}</strong>.
            </p>
          ) : (
            <>
              <dl className={styles.dl}>
                <dt>Detection strategy</dt>
                <dd className={styles.mono}>{finding.technique.strategyId}</dd>
                <dt>Platforms</dt>
                <dd>{finding.technique.platforms.join(" · ")}</dd>
              </dl>
              {finding.analytics.map((h) => (
                <div className={styles.analyticCard} key={h.analytic.id}>
                  <div className={styles.analyticTop}>
                    <span className={cx(styles.mono, styles.techId)}>
                      {h.analytic.id}
                    </span>
                    <strong style={{ fontSize: "0.8125rem" }}>
                      {h.analytic.title}
                    </strong>
                    <span
                      className={cx(
                        styles.statusDot,
                        stateClass(
                          h.status === "healthy"
                            ? "verified"
                            : h.status === "degraded"
                              ? "decaying"
                              : "broken"
                        )
                      )}
                      data-status={h.status}
                      style={{ marginLeft: "auto" }}
                    >
                      {h.status}
                    </span>
                  </div>
                  <p className={styles.pathTag}>{h.analytic.repoPath}</p>
                  <dl className={styles.dl}>
                    <dt>Source system</dt>
                    <dd>{h.analytic.sourceSystem}</dd>
                    <dt>Data components</dt>
                    <dd>{h.analytic.dataComponents.join(", ") || "—"}</dd>
                    <dt>Assessment</dt>
                    <dd>{h.reason}</dd>
                  </dl>
                </div>
              ))}
            </>
          )}
        </EvidencePanel>

        {/* 2 — Telemetry */}
        <EvidencePanel
          index={2}
          panelKey="telemetry"
          open={open.telemetry}
          onToggle={toggle}
          failing={finding.failingInput === "telemetry"}
          status={
            finding.blockingLogSourceIds.length > 0
              ? `${finding.blockingLogSourceIds.length} silent`
              : "All reporting"
          }
          state={finding.blockingLogSourceIds.length > 0 ? "broken" : undefined}
        >
          {enabled.length === 0 ? (
            <p className={styles.hint}>No enabled analytic, so no dependency to check.</p>
          ) : (
            <div className={styles.miniWrap}>
            <table className={styles.miniTable}>
              <thead>
                <tr>
                  <th scope="col">Log source</th>
                  <th scope="col">14-day volume</th>
                  <th scope="col">Last event</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(
                  new Set(enabled.flatMap((h) => h.analytic.logSourceIds))
                ).map((id) => {
                  const source = sourceById.get(id)
                  if (!source) return null
                  const tone =
                    source.status === "silent"
                      ? "var(--broken)"
                      : source.status === "degraded"
                        ? "var(--decaying)"
                        : "var(--verified)"
                  return (
                    <tr key={id}>
                      <th scope="row" style={{ fontWeight: 500 }}>
                        {source.name}
                        <span
                          className={styles.pathTag}
                          style={{ display: "block" }}
                        >
                          {`heartbeat ${source.expectedIntervalMin}m · ${(source.parseErrorRate * 100).toFixed(1)}% parse errors`}
                        </span>
                      </th>
                      <td>
                        <Sparkline
                          values={source.volume14d}
                          tone={tone}
                          label={`${source.name}: 14-day volume, last day ${compact(source.volume14d[13])} events`}
                        />
                      </td>
                      <td className={styles.num}>
                        {relative(source.lastEventAt, NOW)}
                      </td>
                      <td>
                        <span
                          className={cx(
                            styles.statusDot,
                            stateClass(
                              source.status === "healthy"
                                ? "verified"
                                : source.status === "degraded"
                                  ? "decaying"
                                  : "broken"
                            )
                          )}
                          data-status={source.status}
                        >
                          {source.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </div>
          )}
        </EvidencePanel>

        {/* 3 — Validation */}
        <EvidencePanel
          index={3}
          panelKey="validation"
          open={open.validation}
          onToggle={toggle}
          failing={finding.failingInput === "validation"}
          status={
            finding.latestPass
              ? `Last pass ${finding.evidenceAgeDays}d ago`
              : "Never proven"
          }
          state={finding.latestPass ? undefined : "assumed"}
        >
          <p className={styles.hint}>
            {`Freshness window for tier ${finding.technique.tier}: ${finding.freshnessWindowDays} days. Confidence falls to zero at ${finding.freshnessWindowDays * 2} days.`}
          </p>
          {finding.validations.length === 0 ? (
            <p className={styles.hint}>
              <strong>No validation record exists.</strong> A rule is present and
              its telemetry is healthy, which is exactly the situation most tools
              count as coverage. Assay does not.
            </p>
          ) : (
            <div className={styles.miniWrap}>
            <table className={styles.miniTable}>
              <thead>
                <tr>
                  <th scope="col">When</th>
                  <th scope="col">Method</th>
                  <th scope="col">Test</th>
                  <th scope="col">Operator</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                {finding.validations.slice(0, 6).map((v) => (
                  <tr key={v.id}>
                    <td className={styles.num}>{formatDate(v.ranAt)}</td>
                    <td>{METHOD_LABEL[v.method]}</td>
                    <td className={styles.mono}>{v.testId}</td>
                    <td>{v.operator}</td>
                    <td>
                      <span
                        className={cx(
                          styles.chip,
                          stateClass(v.result === "alerted" ? "verified" : "broken")
                        )}
                      >
                        {RESULT_LABEL[v.result]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
          {finding.validations[0]?.notes ? (
            <p className={styles.quote}>{finding.validations[0].notes}</p>
          ) : null}
        </EvidencePanel>

        {/* 4 — Fidelity */}
        <EvidencePanel
          index={4}
          panelKey="fidelity"
          open={open.fidelity}
          onToggle={toggle}
          failing={finding.failingInput === "fidelity"}
          status={
            finding.fidelity === "ok"
              ? "Acceptable"
              : finding.fidelity === "noisy"
                ? "Too noisy to count"
                : finding.fidelity === "never-fired"
                  ? "Never fired"
                  : "Unknown"
          }
          state={
            finding.fidelity === "noisy"
              ? "decaying"
              : finding.fidelity === "never-fired"
                ? "assumed"
                : undefined
          }
        >
          <p className={styles.hint}>{finding.fidelityNote}</p>
          {enabled.length > 0 ? (
            <div className={styles.miniWrap}>
            <table className={styles.miniTable}>
              <thead>
                <tr>
                  <th scope="col">Analytic</th>
                  <th scope="col" className={styles.right}>
                    Fires 30d
                  </th>
                  <th scope="col" className={styles.right}>
                    True pos.
                  </th>
                  <th scope="col" className={styles.right}>
                    Precision
                  </th>
                  <th scope="col">Last fired</th>
                </tr>
              </thead>
              <tbody>
                {enabled.map((h) => (
                  <tr key={h.analytic.id}>
                    <th scope="row" className={styles.mono} style={{ fontWeight: 500 }}>
                      {h.analytic.id}
                    </th>
                    <td className={cx(styles.num, styles.right)}>
                      {h.analytic.fires30d}
                    </td>
                    <td className={cx(styles.num, styles.right)}>
                      {h.analytic.truePositives30d}
                    </td>
                    <td className={cx(styles.num, styles.right)}>
                      {h.precision === null
                        ? "—"
                        : `${(h.precision * 100).toFixed(1)}%`}
                    </td>
                    <td className={styles.num}>
                      {h.analytic.lastFiredAt
                        ? relative(h.analytic.lastFiredAt, NOW)
                        : "never"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : null}
        </EvidencePanel>

        {/* Why this rank */}
        <EvidencePanel
          index={5}
          panelKey="why"
          open={open.why}
          onToggle={toggle}
          failing={false}
          status={`Priority ${finding.priority}`}
        >
          <p className={styles.hint}>
            The score is a product of four terms. Each row shows the term, where
            it came from, and the running score after applying it. The last row is
            the number in the queue — so you can check the arithmetic.
          </p>
          <div className={styles.whyRow}>
            {finding.terms.map((term) => (
              <div className={styles.whyTerm} key={term.label}>
                <span className={styles.whyLabel}>{term.label}</span>
                <span className={cx(styles.num, styles.right)}>
                  {`× ${term.display}`}
                </span>
                <span className={styles.whySource}>
                  {term.source}
                  <br />
                  {term.note}
                </span>
                <span className={cx(styles.num, styles.right)}>
                  {term.running}
                </span>
              </div>
            ))}
          </div>
          <div className={styles.whyTotal}>
            <span className={styles.chainMath}>
              {`100 × ${finding.terms.map((t) => t.display).join(" × ")} = ${finding.priority}`}
            </span>
            <strong className={styles.num}>{finding.priority}</strong>
          </div>
          <dl className={styles.dl}>
            <dt>Fix class</dt>
            <dd>
              {`${FIX_META[finding.fixClass].label} — ${FIX_META[finding.fixClass].verb.toLowerCase()}`}
            </dd>
            <dt>Asset groups</dt>
            <dd>{finding.technique.assetGroups.join(", ")}</dd>
            <dt>Owner</dt>
            <dd>
              {finding.owner
                ? `${finding.owner}${finding.dueAt ? ` · due ${formatDate(finding.dueAt)}` : ""}`
                : "Unassigned"}
            </dd>
          </dl>
        </EvidencePanel>
      </div>

      <footer className={styles.drawerFoot}>
        {!canWrite ? (
          <div className={styles.blockNote}>
            <span aria-hidden="true">🔒</span>
            <span>
              You are viewing as <strong>internal audit</strong>. This role reads
              everything and changes nothing, so the decision controls are
              disabled. Switch role in the header to act.
            </span>
          </div>
        ) : null}

        <div className={styles.actionRow}>
          <Btn
            variant={form === "assign" ? "accent" : undefined}
            disabled={!canWrite}
            aria-disabled={!canWrite}
            onClick={() => setForm(form === "assign" ? "none" : "assign")}
            title={canWrite ? undefined : "Read-only role"}
          >
            Assign fix
          </Btn>
          <Btn
            variant={form === "validate" ? "accent" : undefined}
            disabled={!canWrite}
            aria-disabled={!canWrite}
            onClick={() => setForm(form === "validate" ? "none" : "validate")}
            title={canWrite ? undefined : "Read-only role"}
          >
            Record validation
          </Btn>
          {pending ? (
            <Btn
              variant="caution"
              disabled={!canApprove || selfApproval}
              aria-disabled={!canApprove || selfApproval}
              title={
                selfApproval
                  ? "You requested this acceptance. Someone else must approve it."
                  : canApprove
                    ? undefined
                    : "Only the security operations manager role can approve"
              }
              onClick={() => actions.approveAcceptance(finding.id)}
            >
              Approve acceptance
            </Btn>
          ) : acceptance?.approvedBy ? (
            <Btn
              disabled={!canWrite}
              aria-disabled={!canWrite}
              onClick={() => actions.withdrawAcceptance(finding.id)}
            >
              Withdraw acceptance
            </Btn>
          ) : (
            <Btn
              variant={form === "accept" ? "accent" : "caution"}
              disabled={!canWrite}
              aria-disabled={!canWrite}
              onClick={() => setForm(form === "accept" ? "none" : "accept")}
              title={canWrite ? undefined : "Read-only role"}
            >
              Accept gap
            </Btn>
          )}
          {pending && selfApproval ? (
            <Btn onClick={() => actions.withdrawAcceptance(finding.id)}>
              Withdraw request
            </Btn>
          ) : null}
        </div>

        {form === "assign" && canWrite ? (
          <AssignForm
            finding={finding}
            onSubmit={(owner, dueAt) => {
              actions.assign([finding.id], owner, dueAt)
              setForm("none")
            }}
          />
        ) : null}
        {form === "validate" && canWrite ? (
          <ValidateForm
            finding={finding}
            role={role}
            onSubmit={(input) => {
              actions.validate(input)
              setForm("none")
            }}
          />
        ) : null}
        {form === "accept" && canWrite ? (
          <AcceptForm
            finding={finding}
            actor={actor}
            onSubmit={(input) => {
              actions.requestAcceptance(input)
              setForm("none")
            }}
          />
        ) : null}
      </footer>
    </>
  )
}

/* -------------------------------------------------------------------------- */

function EvidencePanel({
  index,
  panelKey,
  open,
  onToggle,
  failing,
  status,
  state,
  children,
}: {
  index: number
  panelKey: PanelKey
  open: boolean
  onToggle: (key: PanelKey) => void
  failing: boolean
  status: string
  state?: "verified" | "decaying" | "assumed" | "broken" | "blind"
  children: React.ReactNode
}) {
  const id = `evidence-${panelKey}`
  return (
    <section
      className={styles.evidence}
      data-open={open ? "true" : "false"}
      data-failing={failing ? "true" : "false"}
    >
      <button
        type="button"
        className={styles.evidenceHead}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => onToggle(panelKey)}
      >
        <span className={styles.evidenceNum} aria-hidden="true">
          {index}
        </span>
        <span className={styles.evidenceTitle}>{PANEL_TITLES[panelKey]}</span>
        <span
          className={cx(styles.evidenceStatus, state ? stateClass(state) : undefined)}
        >
          {status}
        </span>
        <span aria-hidden="true" className={styles.mono}>
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <div className={styles.evidenceBody} id={id}>
          {children}
        </div>
      ) : null}
    </section>
  )
}

/* -------------------------------------------------------------------------- */

const OWNERS = ["P. Raman", "J. Alvarez", "M. Okonjo", "Identity platform", "Cloud platform"]

function AssignForm({
  finding,
  onSubmit,
}: {
  finding: DerivedFinding
  onSubmit: (owner: string, dueAt: number) => void
}) {
  const [owner, setOwner] = React.useState(finding.owner ?? OWNERS[0])
  const [due, setDue] = React.useState(toDateInput(NOW + 7 * DAY))
  return (
    <div className={styles.form}>
      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label htmlFor="assign-owner">Owner</label>
          <select
            id="assign-owner"
            className={styles.select}
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          >
            {OWNERS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formField}>
          <label htmlFor="assign-due">Due</label>
          <input
            id="assign-due"
            type="date"
            className={styles.input}
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
        </div>
        <div className={styles.formField} style={{ flex: "0 0 auto" }}>
          <Btn
            variant="primary"
            size="lg"
            onClick={() => onSubmit(owner, fromDateInput(due))}
          >
            Assign
          </Btn>
        </div>
      </div>
      <p className={styles.hint}>
        {`Fix class ${FIX_META[finding.fixClass].label.toLowerCase()}. In production this also opens a linked ticket; the demo keeps it inside Assay.`}
      </p>
    </div>
  )
}

function ValidateForm({
  finding,
  role,
  onSubmit,
}: {
  finding: DerivedFinding
  role: Role
  onSubmit: (input: {
    techniqueId: string
    analyticId: string | null
    method: ValidationMethod
    testId: string
    result: ValidationResult
  }) => void
}) {
  const [method, setMethod] = React.useState<ValidationMethod>("atomic")
  const [result, setResult] = React.useState<ValidationResult>("alerted")
  const defaultTest = `${finding.technique.id}-1`
  const [testId, setTestId] = React.useState(defaultTest)

  return (
    <div className={styles.form}>
      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label htmlFor="val-method">Method</label>
          <select
            id="val-method"
            className={styles.select}
            value={method}
            onChange={(e) => setMethod(e.target.value as ValidationMethod)}
          >
            {(["atomic", "bas", "purple", "manual"] as ValidationMethod[]).map(
              (m) => (
                <option key={m} value={m}>
                  {METHOD_LABEL[m]}
                </option>
              )
            )}
          </select>
        </div>
        <div className={styles.formField}>
          <label htmlFor="val-test">Test reference</label>
          <input
            id="val-test"
            className={styles.input}
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="val-result">Graded result</label>
          <select
            id="val-result"
            className={styles.select}
            value={result}
            onChange={(e) => setResult(e.target.value as ValidationResult)}
          >
            {(
              ["alerted", "detected", "logged-only", "missed"] as ValidationResult[]
            ).map((r) => (
              <option key={r} value={r}>
                {RESULT_LABEL[r]}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formField} style={{ flex: "0 0 auto" }}>
          <Btn
            variant="primary"
            size="lg"
            disabled={testId.trim().length === 0}
            onClick={() =>
              onSubmit({
                techniqueId: finding.technique.id,
                analyticId: finding.analytics[0]?.analytic.id ?? null,
                method,
                testId: testId.trim(),
                result,
              })
            }
          >
            Record
          </Btn>
        </div>
      </div>
      <p className={styles.hint}>
        {`Recorded against ${actorFor(role)} at the demo clock. Only "alerted" sets the state to verified — "logged only" means the telemetry was there and no alert fired, which is a different defect. Nothing is executed anywhere; this is a demo.`}
      </p>
    </div>
  )
}

function AcceptForm({
  finding,
  actor,
  onSubmit,
}: {
  finding: DerivedFinding
  actor: string
  onSubmit: (input: {
    findingId: string
    techniqueId: string
    reason: AcceptanceReason
    justification: string
    expiresAt: number
  }) => void
}) {
  const [reason, setReason] = React.useState<AcceptanceReason>(
    "compensating-control"
  )
  const [justification, setJustification] = React.useState("")
  const maxDate = toDateInput(NOW + 90 * DAY)
  const [expires, setExpires] = React.useState(toDateInput(NOW + 60 * DAY))
  const tooLong = fromDateInput(expires) > NOW + 90 * DAY
  const valid = justification.trim().length >= 20 && !tooLong

  return (
    <div className={styles.form}>
      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label htmlFor="acc-reason">Reason</label>
          <select
            id="acc-reason"
            className={styles.select}
            value={reason}
            onChange={(e) => setReason(e.target.value as AcceptanceReason)}
          >
            {ACCEPT_REASONS.map((r) => (
              <option key={r} value={r}>
                {REASON_LABEL[r]}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formField}>
          <label htmlFor="acc-expires">Expires (90 days maximum)</label>
          <input
            id="acc-expires"
            type="date"
            className={styles.input}
            value={expires}
            max={maxDate}
            onChange={(e) => setExpires(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.formField}>
        <label htmlFor="acc-just">Justification</label>
        <textarea
          id="acc-just"
          className={styles.textarea}
          value={justification}
          placeholder="What compensates for this gap, who agreed, and what has to change before it can be closed?"
          onChange={(e) => setJustification(e.target.value)}
        />
      </div>
      <p className={styles.hint}>
        {`Requested by ${actor}. Approval must come from someone else — Assay blocks self-approval, because a trail you can sign yourself is worth nothing to an auditor. On ${formatDate(fromDateInput(expires))} this reverts to ${STATE_META[finding.state === "accepted" ? "assumed" : finding.state].label.toLowerCase()} and returns to the queue.`}
        {justification.trim().length < 20
          ? " A justification of at least 20 characters is required."
          : ""}
      </p>
      <div className={styles.formRow}>
        <Btn
          variant="primary"
          size="lg"
          disabled={!valid}
          onClick={() =>
            onSubmit({
              findingId: finding.id,
              techniqueId: finding.technique.id,
              reason,
              justification: justification.trim(),
              expiresAt: fromDateInput(expires),
            })
          }
        >
          Request acceptance
        </Btn>
      </div>
    </div>
  )
}
