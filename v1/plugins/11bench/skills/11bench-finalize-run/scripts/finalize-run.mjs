#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync, readdirSync, renameSync } from "node:fs"
import { basename, dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { spawnSync } from "node:child_process"
import { canonicalPath, copyTree, hashPath, now, parseArgs, preparedCohortDrift, readJson, writeJsonAtomic } from "../../../scripts/core.mjs"
import { cascadeFromRun } from "../../../scripts/aggregate-analytics.mjs"
import { discoverCodexThreads } from "./discover-thread.mjs"

const CLEANUP_WARNING = "Candidate workspace retained. 11bench never deletes candidate workspaces automatically. Inspect and remove it manually only after the finalized run is verified."
const args = parseArgs(process.argv.slice(2))
if (args.has("help")) {
  console.log("usage: node finalize-run.mjs <run-dir> [--thread id] [--isolation enforced|partial|advisory|unsupported] [--evidence file] [--allow-missing-analytics] [--codex-home dir]")
  console.log("       node finalize-run.mjs --batch <manifest.json> [same options except --thread]")
  console.log("finalization copies results and refreshes analytics; it never deletes candidate workspaces")
  process.exit(0)
}

const batchPath = args.get("batch") ? resolve(args.get("batch")) : null
if (batchPath) {
  if (args.get("thread")) throw new Error("--thread cannot apply to a batch; record per-run task ids in metadata or finalize ambiguous runs individually")
  const batch = readJson(batchPath)
  let successfulRun = null
  for (const run of batch.runs) {
    if (["complete", "tainted"].includes(run.status)) continue
    try {
      const outcome = finalizeOne(resolve(run.runPath), { deferCascade: true })
      run.status = outcome.status
      run.threadId = outcome.rootThreadId
      run.error = null
      successfulRun = resolve(run.runPath)
    } catch (error) {
      run.status = "failed"
      run.error = error.message
    }
  }
  batch.finishedAt = now()
  const finished = batch.runs.filter((run) => ["complete", "tainted"].includes(run.status)).length
  batch.status = finished === batch.runs.length ? "complete" : finished > 0 ? "partial" : "failed"
  writeJsonAtomic(batchPath, batch)
  const cascade = successfulRun ? cascadeFromRun(successfulRun) : null
  console.log(JSON.stringify({ batchPath, status: batch.status, runs: batch.runs, cascade, cleanupWarning: CLEANUP_WARNING }, null, 2))
} else {
  const runDir = resolve(args.positionals[0] ?? args.get("run") ?? ".")
  console.log(JSON.stringify(finalizeOne(runDir, { deferCascade: false }), null, 2))
}

function finalizeOne(runDir, { deferCascade }) {
  const metadataPath = join(runDir, "_run", "metadata.json")
  if (!existsSync(metadataPath)) throw new Error(`run metadata is missing: ${runDir}`)
  let metadata = readJson(metadataPath)
  const resuming = ["complete", "tainted"].includes(metadata.status) && existsSync(join(runDir, "result"))
  if (!["prepared", "running", "complete", "tainted"].includes(metadata.status)) throw new Error(`run cannot finalize from status: ${metadata.status}`)
  const workspace = canonicalPath(metadata.workspace.path)
  const workspaceResult = join(workspace, "result")
  if (!existsSync(workspaceResult)) throw new Error(`candidate result is missing: ${workspaceResult}`)
  if (!containsFile(workspaceResult)) throw new Error(`candidate result is empty: ${workspaceResult}`)
  if (existsSync(join(runDir, "result")) && !resuming) throw new Error(`final run result already exists: ${join(runDir, "result")}`)

  const explicitThread = args.get("thread")
  let rootThreadId = explicitThread ?? metadata.rootThreadId
  let subagentThreadIds = metadata.subagentThreadIds ?? []
  if (!rootThreadId) {
    const discovered = discoverCodexThreads({ workspacePath: workspace, preparedAt: metadata.preparedAt, codexHome: args.get("codex-home") ?? undefined })
    const roots = discovered.filter((thread) => thread.role === "root")
    const compatible = roots.filter((thread) => taskMatchesRun(thread, metadata))
    if (roots.length === 1 && compatible.length === 0) throw new Error(`workspace task metadata does not match prepared model/effort: ${roots[0].threadId}`)
    if (compatible.length > 1 || (roots.length > 1 && compatible.length !== 1)) throw new Error(`multiple root tasks match this candidate workspace; rerun each ambiguous run with --thread. Candidates: ${roots.map((thread) => `${thread.threadId} (${thread.model ?? "unknown"}/${thread.effort ?? "unknown"})`).join(", ")}`)
    if (compatible.length === 1) {
      rootThreadId = compatible[0].threadId
      subagentThreadIds = descendantsOf(rootThreadId, discovered)
    }
  }
  if (!rootThreadId && !args.has("allow-missing-analytics")) {
    throw new Error("no root task matched the candidate workspace; pass --thread <id> or --allow-missing-analytics")
  }

  if (!resuming) {
    const staging = join(runDir, "_run", `result-staging-${process.pid}-${Date.now()}`)
    copyTree(workspaceResult, staging)
    renameSync(staging, join(runDir, "result"))
  }
  const evidence = resuming && !args.get("evidence") && existsSync(join(runDir, "_evidence", "manifest.json"))
    ? readJson(join(runDir, "_evidence", "manifest.json"))
    : captureEvidence(runDir, args.get("evidence"))
  const isolationStatus = args.get("isolation", metadata.isolationStatus)
  const taintReasons = [...new Set(metadata.taintReasons ?? [])]
  if (isolationStatus !== "enforced") taintReasons.push(`execution isolation was ${isolationStatus}; clean status requires enforced isolation`)
  taintReasons.push(...preparedCohortDrift(dirname(runDir), metadata))
  const uniqueTaintReasons = [...new Set(taintReasons)]
  metadata = {
    ...metadata,
    status: uniqueTaintReasons.length ? "tainted" : "complete",
    finishedAt: now(),
    rootThreadId: rootThreadId ?? null,
    subagentThreadIds,
    isolationStatus,
    taintReasons: uniqueTaintReasons,
    resultSha256: hashPath(join(runDir, "result")),
    evidence,
    workspace: { ...metadata.workspace, autoDelete: false, cleanupPolicy: "manual-only", cleanupEligible: true, cleanupWarning: CLEANUP_WARNING },
  }
  writeJsonAtomic(metadataPath, metadata)

  const analyzer = fileURLToPath(new URL("../../11bench-analyze-run/scripts/analyze-run.mjs", import.meta.url))
  const analyzerArgs = [analyzer, runDir]
  analyzerArgs.push("--no-cascade")
  if (rootThreadId) analyzerArgs.push("--thread", rootThreadId)
  else analyzerArgs.push("--unavailable", "No native task was discoverable for this manual run.")
  if (args.get("codex-home")) analyzerArgs.push("--codex-home", resolve(args.get("codex-home")))
  const analyzed = spawnSync(process.execPath, analyzerArgs, { encoding: "utf8" })
  if (analyzed.status !== 0) throw new Error(`run analytics failed: ${analyzed.stderr || analyzed.stdout}`)
  const cascade = deferCascade ? null : cascadeFromRun(runDir)
  return { runDir, runId: metadata.runId, status: metadata.status, rootThreadId: metadata.rootThreadId, resultSha256: metadata.resultSha256, analytics: join(runDir, "_analytics"), cascade, candidateWorkspace: workspace, cleanupWarning: CLEANUP_WARNING }
}

function taskMatchesRun(thread, metadata) {
  const normalize = (value) => String(value).trim().toLowerCase().replaceAll("_", "-")
  if (thread.model && metadata.model && normalize(thread.model) !== normalize(metadata.model)) return false
  if (thread.effort && metadata.effort && normalize(thread.effort) !== normalize(metadata.effort)) return false
  return true
}

function containsFile(root) {
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (entry.isFile()) return true
    if (entry.isDirectory() && containsFile(join(root, entry.name))) return true
  }
  return false
}

function descendantsOf(rootThreadId, threads) {
  const selected = new Set([String(rootThreadId)])
  let changed = true
  while (changed) {
    changed = false
    for (const thread of threads) {
      if (thread.role !== "subagent" || !thread.parentThreadId || !selected.has(String(thread.parentThreadId)) || selected.has(thread.threadId)) continue
      selected.add(thread.threadId)
      changed = true
    }
  }
  selected.delete(String(rootThreadId))
  return [...selected]
}

function captureEvidence(runDir, values) {
  const paths = values ? (Array.isArray(values) ? values : [values]) : []
  const items = []
  for (const value of paths) {
    const source = resolve(value)
    if (!existsSync(source)) throw new Error(`evidence file is missing: ${source}`)
    const name = basename(source)
    const destination = join(runDir, "_evidence", name)
    if (existsSync(destination)) throw new Error(`duplicate evidence name: ${name}`)
    mkdirSync(dirname(destination), { recursive: true })
    copyFileSync(source, destination)
    items.push({ path: `_evidence/${name}`, sha256: hashPath(destination) })
  }
  const manifest = { capturedAt: now(), captureStatus: items.length ? "provided" : "not-provided", items }
  writeJsonAtomic(join(runDir, "_evidence", "manifest.json"), manifest)
  return manifest
}
