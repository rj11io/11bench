#!/usr/bin/env node

import { existsSync, mkdirSync, mkdtempSync, readFileSync } from "node:fs"
import { basename, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import {
  assertId,
  benchmarkFromCohort,
  canonicalPath,
  copyTree,
  findV1Root,
  hashPath,
  now,
  parseArgs,
  pricingMatch,
  readJson,
  writeJsonAtomic,
} from "../../../scripts/core.mjs"

const CLEANUP_WARNING = "Candidate workspace retained. 11bench never deletes candidate workspaces automatically. Inspect and remove it manually only after the finalized run is verified."
const args = parseArgs(process.argv.slice(2))
if (args.has("help")) {
  console.log("usage: node prepare-run.mjs <cohort-dir> --run <id> --provider <provider> --model <model> [--effort level] [--harness name] [--allow-unpriced] [--workspace-root dir]")
  console.log("       node prepare-run.mjs <cohort-dir> --candidates file.json [--batch-id id] [--allow-unpriced] [--workspace-root dir]")
  console.log("preparation creates persistent candidate workspaces; it does not launch tasks")
  process.exit(0)
}

const cohortDir = resolve(args.positionals[0] ?? args.get("cohort") ?? ".")
const benchmarkDir = benchmarkFromCohort(cohortDir)
const benchmark = readJson(join(benchmarkDir, "_benchmark", "config.json"))
const cohortConfigPath = join(cohortDir, "_cohort", "config.json")
const cohort = readJson(cohortConfigPath)
if (cohort.status !== "frozen") throw new Error(`cannot prepare runs from a ${cohort.status} cohort`)

const control = join(cohortDir, "_cohort")
const promptPath = resolve(control, cohort.prompt.path)
const inputsPath = resolve(control, cohort.inputs.path)
const templatePath = resolve(control, cohort.template.path)
for (const reserved of ["inputs", "result", ".runtime", ".git", "_benchmark", "_cohort", "_run", "_analytics", "_batches", "_judging"]) {
  if (existsSync(join(templatePath, reserved))) throw new Error(`candidate template contains reserved path: ${reserved}`)
}
const verified = {
  prompt: hashPath(promptPath),
  inputs: hashPath(inputsPath),
  template: hashPath(templatePath),
}
for (const key of Object.keys(verified)) {
  if (verified[key] !== cohort[key].sha256) throw new Error(`frozen ${key} hash mismatch; clone a new draft cohort instead of modifying this one`)
}
for (const skill of cohort.skills ?? []) {
  const actual = hashPath(resolve(control, skill.path))
  if (actual !== skill.sha256) throw new Error(`frozen skill hash mismatch: ${skill.name}`)
}

const candidatesFile = args.get("candidates")
const candidates = candidatesFile
  ? JSON.parse(readFileSync(resolve(candidatesFile), "utf8"))
  : [{
      runId: args.get("run"),
      provider: args.get("provider", "unknown"),
      model: args.get("model"),
      effort: args.get("effort"),
      harness: args.get("harness", "unknown"),
    }]
if (!Array.isArray(candidates) || candidates.length === 0) throw new Error("at least one candidate is required")

const pricingPath = fileURLToPath(new URL("../../11bench-analyze-run/references/pricing.json", import.meta.url))
const pricing = readJson(pricingPath)
const workspaceRoot = resolve(args.get("workspace-root", join(findV1Root(benchmarkDir), "_workspaces")))
mkdirSync(workspaceRoot, { recursive: true })
const prepared = []

const normalizedCandidates = candidates.map((candidate) => {
  const runId = assertId(candidate.runId, "run id")
  if (!candidate.model) throw new Error(`candidate '${runId}' requires a model`)
  const provider = candidate.provider ?? "unknown"
  const price = pricingMatch(pricing, provider, candidate.model)
  if (!price && !args.has("allow-unpriced")) {
    throw new Error(`model is not priced: ${provider}/${candidate.model}; run 11bench-update-pricing or pass --allow-unpriced`)
  }
  const runDir = join(cohortDir, runId)
  if (existsSync(runDir)) throw new Error(`run already exists: ${runDir}`)
  return { ...candidate, runId, provider, price, runDir }
})
if (new Set(normalizedCandidates.map((candidate) => candidate.runId)).size !== normalizedCandidates.length) throw new Error("candidate run ids must be unique")

for (const candidate of normalizedCandidates) {
  const { runId, provider, price, runDir } = candidate
  mkdirSync(join(runDir, "_run"), { recursive: true })
  const workspacePath = canonicalPath(mkdtempSync(join(workspaceRoot, `11bench-${benchmark.id}-${cohort.id}-${runId}-`)))
  copyTree(templatePath, workspacePath)
  copyTree(inputsPath, join(workspacePath, "inputs"))
  mkdirSync(join(workspacePath, "result"), { recursive: true })
  mkdirSync(join(workspacePath, ".runtime"), { recursive: true })
  const metadata = {
    schemaVersion: 1,
    runId,
    benchmarkId: benchmark.id,
    cohortId: cohort.id,
    status: "prepared",
    provider,
    model: candidate.model,
    effort: candidate.effort ?? null,
    harness: candidate.harness ?? "unknown",
    preparedAt: now(),
    launchedAt: null,
    finishedAt: null,
    taskId: null,
    rootThreadId: null,
    subagentThreadIds: [],
    isolationStatus: "pending",
    taintReasons: [],
    cohortConfigSha256: hashPath(cohortConfigPath),
    cohortHashes: verified,
    cohortArtifactPaths: { prompt: cohort.prompt.path, inputs: cohort.inputs.path, template: cohort.template.path },
    cohortSkillHashes: (cohort.skills ?? []).map(({ name, path, sha256 }) => ({ name, path, sha256 })),
    pricing: { matched: Boolean(price), catalogVersion: pricing.version, catalogUpdatedAt: pricing.updatedAt },
    workspace: {
      path: workspacePath,
      autoDelete: false,
      cleanupPolicy: "manual-only",
      cleanupEligible: false,
      cleanupWarning: CLEANUP_WARNING,
    },
  }
  writeJsonAtomic(join(runDir, "_run", "metadata.json"), metadata)
  writeJsonAtomic(join(runDir, "_run", "launch.json"), {
    schemaVersion: 1,
    runId,
    workspacePath,
    model: candidate.model,
    provider,
    effort: candidate.effort ?? null,
    harness: candidate.harness ?? "unknown",
    skills: cohort.skills ?? [],
    permissions: cohort.permissions,
    promptPath,
    promptSha256: cohort.prompt.sha256,
    cohortConfigSha256: hashPath(cohortConfigPath),
    prompt: readFileSync(promptPath, "utf8"),
    cleanupWarning: CLEANUP_WARNING,
  })
  prepared.push({ runId, runDir, workspacePath, model: candidate.model, effort: candidate.effort ?? null, priced: Boolean(price), status: "prepared" })
}

let batchPath = null
if (prepared.length > 1) {
  const batchId = assertId(args.get("batch-id", `batch-${new Date().toISOString().replace(/[:.]/g, "-").toLowerCase()}`), "batch id")
  batchPath = join(cohortDir, "_batches", `${batchId}.json`)
  writeJsonAtomic(batchPath, {
    schemaVersion: 1,
    batchId,
    benchmarkId: benchmark.id,
    cohortId: cohort.id,
    status: "prepared",
    createdAt: now(),
    finishedAt: null,
    runs: prepared.map((run) => ({ runId: run.runId, runPath: run.runDir, workspacePath: run.workspacePath, taskId: null, threadId: null, status: "prepared", error: null })),
  })
}

console.log(JSON.stringify({ cohort: basename(cohortDir), prepared, batchPath, cleanupWarning: CLEANUP_WARNING }, null, 2))
