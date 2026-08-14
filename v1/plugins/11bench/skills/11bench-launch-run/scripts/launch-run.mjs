#!/usr/bin/env node

import { existsSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { now, parseArgs, preparedCohortDrift, readJson, writeJsonAtomic } from "../../../scripts/core.mjs"

const args = parseArgs(process.argv.slice(2))
if (args.has("help")) {
  console.log("usage: node launch-run.mjs <run-dir> [--task id] [--thread id] [--isolation enforced|partial|advisory|unsupported] [--mark-running]")
  console.log("       node launch-run.mjs --batch <manifest.json> [--isolation status] [--mark-running]")
  console.log("manual mode prints exact launch packets; it does not create tasks")
  process.exit(0)
}

const batchPath = args.get("batch") ? resolve(args.get("batch")) : null
if (batchPath) {
  if (args.get("task") || args.get("thread")) throw new Error("batch launch cannot apply one task or thread id to multiple runs")
  if (args.has("mark-running")) throw new Error("batch packets cannot prove that tasks launched; record each launched run individually")
  const batch = readJson(batchPath)
  const packets = batch.runs.map((run) => launchOne(resolve(run.runPath)))
  console.log(JSON.stringify({ mode: "parallel-manual-launch-packets", batchPath, status: batch.status, packets, instructions: ["Create one fresh task per packet and launch candidates concurrently when capacity allows.", "Never place multiple candidates in one task or workspace.", "Record each native task id against its individual run when available."], cleanupWarning: "Every candidate workspace is retained; batch completion never deletes one." }, null, 2))
} else {
  const runDir = resolve(args.positionals[0] ?? args.get("run") ?? ".")
  console.log(JSON.stringify(launchOne(runDir), null, 2))
}

function launchOne(runDir) {
  const metadataPath = join(runDir, "_run", "metadata.json")
  const launchPath = join(runDir, "_run", "launch.json")
  if (!existsSync(metadataPath) || !existsSync(launchPath)) throw new Error(`prepared run metadata is missing: ${runDir}`)
  const metadata = readJson(metadataPath)
  const packet = readJson(launchPath)
  if (metadata.status !== "prepared" && metadata.status !== "running") throw new Error(`run cannot launch from status: ${metadata.status}`)
  const drift = preparedCohortDrift(dirname(runDir), metadata)
  if (drift.length) throw new Error(`prepared cohort changed; do not launch this candidate: ${drift.join("; ")}`)

  const isolationStatus = args.get("isolation", metadata.isolationStatus)
  if (!["pending", "enforced", "partial", "advisory", "unsupported"].includes(isolationStatus)) throw new Error(`invalid isolation status: ${isolationStatus}`)
  const started = args.has("mark-running") || args.get("task") || args.get("thread")
  const updated = {
    ...metadata,
    status: started ? "running" : metadata.status,
    launchedAt: started ? (metadata.launchedAt ?? now()) : metadata.launchedAt,
    taskId: args.get("task", metadata.taskId),
    rootThreadId: args.get("thread", metadata.rootThreadId),
    isolationStatus,
  }
  writeJsonAtomic(metadataPath, updated)

  return {
    runId: metadata.runId,
    runDir,
    status: updated.status,
    mode: started ? "recorded-launch" : "manual-launch-packet",
    workspacePath: packet.workspacePath,
    model: packet.model,
    effort: packet.effort,
    skills: packet.skills,
    permissions: packet.permissions,
    promptSha256: packet.promptSha256,
    prompt: packet.prompt,
    cleanupWarning: packet.cleanupWarning,
    instructions: [
      "Create a fresh task with the candidate workspace as its only project root.",
      "Apply the declared permissions before submitting the prompt.",
      "Submit the prompt byte-for-byte with no introduction or run identifier.",
      "Do not grant permission expansion beyond the frozen cohort policy.",
      "The execution must not read, list, search, or write any parent, sibling, repository, home, prior-run, or undeclared external path.",
      "Network, connectors, apps, subagents, and skills are denied unless the frozen cohort explicitly allows them; subagents inherit the same boundary.",
    ],
  }
}
