"use client"

import * as React from "react"

import styles from "../assay.module.css"
import { STATE_META } from "../lib/scoring"
import { SCENARIOS } from "../lib/seed"
import type { DerivedFinding } from "../lib/types"
import { Panel, StateChip, cx, stateClass } from "./primitives"

/**
 * "Would we have caught it?" — the board's question, answered per step and then
 * in sentences. The verdict never claims more certainty than the evidence holds.
 */
export function ScenarioReplay({
  findings,
  scenarioId,
  onScenario,
  onOpen,
}: {
  findings: DerivedFinding[]
  scenarioId: string
  onScenario: (id: string) => void
  onOpen: (finding: DerivedFinding) => void
}) {
  const byTechnique = new Map(findings.map((f) => [f.technique.id, f]))
  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0]
  const steps = scenario.steps.map((step, i) => ({
    ...step,
    index: i + 1,
    finding: byTechnique.get(step.techniqueId) ?? null,
  }))

  const proven = steps.filter((s) => s.finding?.state === "verified")
  const brokenSteps = steps.filter((s) => s.finding?.state === "broken")
  const untested = steps.filter(
    (s) => s.finding?.state === "assumed" || s.finding?.state === "blind"
  )
  const stale = steps.filter((s) => s.finding?.state === "decaying")
  const acceptedSteps = steps.filter((s) => s.finding?.state === "accepted")

  return (
    <div className={styles.stack}>
      <Panel
        id="scenario"
        title="Would we have caught it?"
        meta={`${scenario.steps.length} steps`}
        actions={
          <label className={styles.field}>
            <span>Chain</span>
            <select
              value={scenario.id}
              onChange={(e) => onScenario(e.target.value)}
            >
              {SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
        }
      >
        <p className={styles.panelNote}>{scenario.summary}</p>

        <div className={styles.chain}>
          {steps.map((step, i) => (
            <React.Fragment key={step.techniqueId}>
              {i > 0 ? (
                <span className={styles.chainArrow} aria-hidden="true">
                  →
                </span>
              ) : null}
              <button
                type="button"
                className={cx(
                  styles.chainStep,
                  stateClass(step.finding?.state ?? "blind")
                )}
                data-state={step.finding?.state ?? "blind"}
                onClick={() => step.finding && onOpen(step.finding)}
                aria-label={`Step ${step.index}: ${step.label}. ${step.techniqueId} is ${
                  step.finding ? STATE_META[step.finding.state].label : "unknown"
                }.`}
              >
                <span className={styles.chainIndex}>
                  {`step ${step.index} · ${step.techniqueId}`}
                </span>
                {step.finding ? (
                  <StateChip
                    state={step.finding.state}
                    ageDays={step.finding.evidenceAgeDays}
                  />
                ) : null}
                <span className={styles.chainLabel}>{step.label}</span>
              </button>
            </React.Fragment>
          ))}
        </div>

        <div className={styles.verdict}>
          <p className={styles.micro} style={{ marginBottom: "0.375rem" }}>
            Verdict, from the current ledger
          </p>
          <p className={styles.verdictText}>
            {verdictSentences({
              total: steps.length,
              proven: proven.length,
              broken: brokenSteps.map((s) => s.index),
              untested: untested.map((s) => s.index),
              stale: stale.map((s) => s.index),
              accepted: acceptedSteps.map((s) => s.index),
              brokenReason: brokenSteps[0]?.finding?.reason ?? null,
            })}
          </p>
        </div>

        <p className={styles.kpiSub}>
          {`Source: ${scenario.sourceLabel} — `}
          <a href={scenario.sourceUrl} target="_blank" rel="noreferrer">
            {scenario.sourceUrl}
          </a>
          {". The chain is a demo construction; the technique rankings behind it are published."}
        </p>
      </Panel>

      <Panel id="scenario-steps" title="Step detail" meta="click a row to open its evidence" bodyless>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>
              Each step of the selected attack chain with its technique, assurance
              state, evidence age and the reason for that state.
            </caption>
            <thead>
              <tr>
                <th scope="col">Step</th>
                <th scope="col">Technique</th>
                <th scope="col">State</th>
                <th scope="col">What we know</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step) => (
                <tr
                  key={step.techniqueId}
                  className={cx(
                    styles.row,
                    stateClass(step.finding?.state ?? "blind")
                  )}
                  onClick={() => step.finding && onOpen(step.finding)}
                >
                  <td className={styles.num}>{step.index}</td>
                  <td className={styles.techCell}>
                    <span className={styles.techId}>{step.techniqueId}</span>
                    <span className={styles.techName}>{step.label}</span>
                  </td>
                  <td>
                    {step.finding ? (
                      <StateChip
                        state={step.finding.state}
                        ageDays={step.finding.evidenceAgeDays}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className={styles.reasonCell}>
                    {step.finding?.reason ?? "Not in scope."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}

function list(nums: number[]) {
  if (nums.length === 1) return `step ${nums[0]}`
  return `steps ${nums.slice(0, -1).join(", ")} and ${nums[nums.length - 1]}`
}

function verdictSentences({
  total,
  proven,
  broken,
  untested,
  stale,
  accepted,
  brokenReason,
}: {
  total: number
  proven: number
  broken: number[]
  untested: number[]
  stale: number[]
  accepted: number[]
  brokenReason: string | null
}) {
  const parts: string[] = []

  if (proven === total) {
    parts.push(
      `Every one of the ${total} steps is verified inside its freshness window. On the evidence we hold, we would have seen this chain.`
    )
  } else if (proven === 0) {
    parts.push(
      `Not one of the ${total} steps is currently verified. We cannot claim we would have seen any part of this.`
    )
  } else {
    parts.push(
      `${proven} of ${total} steps are verified — those we can defend with a dated test.`
    )
  }

  if (broken.length > 0) {
    parts.push(
      `${list(broken).replace(/^s/, "S")} ${broken.length === 1 ? "is" : "are"} broken right now.${brokenReason ? ` Starting with step ${broken[0]}: ${brokenReason.charAt(0).toLowerCase()}${brokenReason.slice(1)}` : ""}`
    )
  }
  if (stale.length > 0) {
    parts.push(
      `${list(stale).replace(/^s/, "S")} ${stale.length === 1 ? "was" : "were"} proven once but the evidence is past its window, so treat it as unproven until re-tested.`
    )
  }
  if (untested.length > 0) {
    parts.push(
      `${list(untested).replace(/^s/, "S")} ${untested.length === 1 ? "has" : "have"} never been tested. Anything said about ${untested.length === 1 ? "it" : "them"} is a guess.`
    )
  }
  if (accepted.length > 0) {
    parts.push(
      `${list(accepted).replace(/^s/, "S")} ${accepted.length === 1 ? "is" : "are"} a formally accepted gap with a named approver and an expiry date — a decision, not coverage.`
    )
  }
  if (broken.length > 0 || untested.length > 0) {
    parts.push(
      "An attacker only has to succeed at the weakest link, so the honest summary is that this chain would probably reach its objective."
    )
  }

  return parts.join(" ")
}
