#!/usr/bin/env node

import { existsSync, mkdirSync } from "node:fs"
import { join, resolve } from "node:path"
import { assertId, now, parseArgs, writeJsonAtomic, writeTextExclusive } from "../../../scripts/core.mjs"

const args = parseArgs(process.argv.slice(2))
if (args.has("help")) {
  console.log("usage: node draft-benchmark.mjs --v1 <v1-root> --id <benchmark-id> [--title text] [--description text] [--prototype]")
  process.exit(0)
}

const v1Root = resolve(args.get("v1", join(process.cwd(), "v1")))
const benchmarkId = assertId(args.get("id") ?? args.positionals[0], "benchmark id")
const benchmarkDir = join(v1Root, "benchmarks", benchmarkId)
if (existsSync(benchmarkDir)) throw new Error(`benchmark already exists: ${benchmarkDir}`)

const title = args.get("title", benchmarkId)
const description = args.get("description", "Draft benchmark. Complete the baseline cohort before freezing it.")
const benchmarkControl = join(benchmarkDir, "_benchmark")
const cohortControl = join(benchmarkDir, "baseline", "_cohort")
mkdirSync(join(benchmarkControl, "template"), { recursive: true })
mkdirSync(join(cohortControl, "inputs"), { recursive: true })

writeJsonAtomic(join(benchmarkControl, "config.json"), {
  schemaVersion: 1,
  id: benchmarkId,
  title,
  description,
  createdAt: now(),
  prototype: args.has("prototype"),
  analyticsSchemaVersion: 1,
})
writeJsonAtomic(join(cohortControl, "config.json"), {
  schemaVersion: 1,
  id: "baseline",
  benchmarkId,
  status: "draft",
  createdAt: now(),
  frozenAt: null,
  sourceRef: null,
  prompt: { path: "prompt.md", sha256: null },
  inputs: { path: "inputs", sha256: null },
  template: { path: "../../_benchmark/template", sha256: null },
  skills: [],
  permissions: {
    requiredIsolation: "enforced",
    network: "deny",
    packageInstall: "deny",
    gitHistory: "deny",
    declaredSkillsOnly: true,
    connectors: [],
    externalApps: [],
  },
  analyticsSchemaVersion: 1,
})
writeTextExclusive(join(cohortControl, "prompt.md"), `Complete the requested task using the provided inputs.\n\nWrite all candidate-owned files under \`result/\`.\n`)
writeTextExclusive(join(cohortControl, "inputs", "README.md"), "Replace this file with frozen benchmark inputs before freezing the cohort.\n")
writeTextExclusive(join(benchmarkControl, "template", "README.md"), "Replace this file with the candidate application template before freezing the cohort.\n")

console.log(JSON.stringify({ benchmarkId, benchmarkDir, baselineCohort: join(benchmarkDir, "baseline"), status: "draft" }, null, 2))
