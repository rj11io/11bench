#!/usr/bin/env node

import { existsSync, renameSync } from "node:fs"
import { join, resolve } from "node:path"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import { now, parseArgs, readJson, sha256, stableStringify, summarizeThreads, writeJsonAtomic, writeTextAtomic } from "../../../scripts/core.mjs"
import { cascadeFromRun } from "../../../scripts/aggregate-analytics.mjs"

const args = parseArgs(process.argv.slice(2))
if (args.has("help")) {
  console.log("usage: node analyze-run.mjs <run-dir> [--thread id] [--unavailable reason] [--codex-home dir] [--no-cascade]")
  console.log("default behavior refreshes affected cohort, benchmark, and global analytics")
  process.exit(0)
}
const runDir = resolve(args.positionals[0] ?? ".")
const metadataPath = join(runDir, "_run", "metadata.json")
const metadata = readJson(metadataPath)
if (!["complete", "tainted"].includes(metadata.status)) throw new Error(`run analytics require a finalized run, found status: ${metadata.status}`)
const analyticsDir = join(runDir, "_analytics")
const markdownPath = join(analyticsDir, "analysis.md")
const analyzer = join(fileURLToPath(new URL(".", import.meta.url)), "analyze-thread.mjs")
const threadId = args.get("thread", metadata.rootThreadId)

if (!threadId || args.get("unavailable")) {
  const reason = args.get("unavailable", "No root task could be bound to this run.")
  const data = {
    schemaVersion: 1,
    scope: "run",
    generatedAt: now(),
    availability: "unavailable",
    reason,
    sourceDigest: sha256(stableStringify({ runId: metadata.runId, reason })),
    sources: [],
    run: pickRun(metadata),
    summary: { runCount: 1, threadCount: 0, tokens: null, costUsd: null, wallTimeMs: null, activeTimeMs: null, providers: [], models: [metadata.model], efforts: metadata.effort ? [metadata.effort] : [] },
    threads: [],
  }
  const reports = unavailableReports(data)
  writeJsonAtomic(join(analyticsDir, "data.json"), data)
  writeTextAtomic(markdownPath, reports.markdown)
  writeTextAtomic(join(analyticsDir, "report.html"), reports.html)
  const cascade = args.has("no-cascade") ? null : cascadeFromRun(runDir)
  console.log(JSON.stringify({ runDir, availability: "unavailable", reason, cascade }, null, 2))
  process.exit(0)
}

const analyzerArgs = [analyzer, metadata.workspace.path, "--thread", threadId, "--output", markdownPath]
if (args.get("codex-home")) analyzerArgs.push("--codex-home", resolve(args.get("codex-home")))
const invocation = spawnSync(process.execPath, analyzerArgs, { encoding: "utf8" })
if (invocation.status !== 0) throw new Error(`exact-thread analyzer failed: ${invocation.stderr || invocation.stdout}`)
const analyzerJson = join(analyticsDir, "analysis.json")
const analyzerHtml = join(analyticsDir, "analysis.html")
const dataset = readJson(analyzerJson)
const source = {
  rootThreadId: String(threadId),
  sourcePaths: [...new Set((dataset.threads ?? []).map((thread) => thread.sourcePath).filter(Boolean))].sort(),
}
const run = pickRun(metadata)
const data = {
  ...dataset,
  schemaVersion: Math.max(3, dataset.schemaVersion ?? 0),
  scope: "run",
  availability: "available",
  sourceDigest: sha256(stableStringify({ source, pricingCatalog: dataset.pricingCatalog, threads: dataset.threads ?? [], run })),
  sources: [source],
  run,
  summary: summarizeThreads(dataset.threads ?? []),
}
writeJsonAtomic(join(analyticsDir, "data.json"), data)
if (existsSync(analyzerJson)) renameSync(analyzerJson, join(analyticsDir, "raw-thread-data.json"))
if (existsSync(analyzerHtml)) renameSync(analyzerHtml, join(analyticsDir, "report.html"))
const cascade = args.has("no-cascade") ? null : cascadeFromRun(runDir)
console.log(JSON.stringify({ runDir, rootThreadId: threadId, threads: data.summary.threadCount, costUsd: data.summary.costUsd, output: analyticsDir, cascade }, null, 2))

function pickRun(value) {
  return { runId: value.runId, benchmarkId: value.benchmarkId, cohortId: value.cohortId, status: value.status, provider: value.provider, model: value.model, effort: value.effort, harness: value.harness, rootThreadId: value.rootThreadId, isolationStatus: value.isolationStatus, taintReasons: value.taintReasons }
}

function unavailableReports(data) {
  const markdown = `# 11bench run analytics\n\nGenerated: ${data.generatedAt}\n\n## Availability\n\nUnavailable. ${data.reason}\n\nRun output remains valid. Thread-derived tokens, cost, timing, and task metadata are unknown, not zero.\n`
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>11bench run analytics</title><main><h1>11bench run analytics</h1><p><strong>Unavailable.</strong> ${data.reason}</p><p>Unknown metrics are not zero.</p></main></html>\n`
  return { markdown, html }
}
