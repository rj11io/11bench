#!/usr/bin/env node

import { existsSync, mkdirSync } from "node:fs"
import { basename, join, resolve } from "node:path"
import { assertId, benchmarkFromCohort, copyTree, now, parseArgs, readJson, writeJsonAtomic, writeTextExclusive } from "../../../scripts/core.mjs"

const args = parseArgs(process.argv.slice(2))
if (args.has("help")) {
  console.log("usage: node draft-cohort.mjs --benchmark <dir> --id <cohort-id> [--from <cohort-dir>]")
  process.exit(0)
}

const benchmarkDir = resolve(args.get("benchmark") ?? args.positionals[0] ?? ".")
const cohortId = assertId(args.get("id") ?? args.positionals[1], "cohort id")
const destination = join(benchmarkDir, cohortId)
if (existsSync(destination)) throw new Error(`cohort already exists: ${destination}`)
if (!existsSync(join(benchmarkDir, "_benchmark", "config.json"))) throw new Error(`invalid benchmark directory: ${benchmarkDir}`)
const benchmark = readJson(join(benchmarkDir, "_benchmark", "config.json"))

const sourceArg = args.get("from")
const source = sourceArg ? resolve(sourceArg) : null
if (source) {
  benchmarkFromCohort(source)
  copyTree(join(source, "_cohort"), join(destination, "_cohort"))
  const configPath = join(destination, "_cohort", "config.json")
  const config = readJson(configPath)
  writeJsonAtomic(configPath, {
    ...config,
    id: cohortId,
    benchmarkId: benchmark.id,
    status: "draft",
    createdAt: now(),
    frozenAt: null,
    sourceRef: null,
    prompt: { ...config.prompt, sha256: null },
    inputs: { ...config.inputs, sha256: null },
    template: { ...config.template, sha256: null },
    skills: (config.skills ?? []).map((skill) => ({ ...skill, sha256: null })),
  })
} else {
  const control = join(destination, "_cohort")
  mkdirSync(join(control, "inputs"), { recursive: true })
  writeJsonAtomic(join(control, "config.json"), {
    schemaVersion: 1,
    id: cohortId,
    benchmarkId: benchmark.id,
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
  writeTextExclusive(join(control, "prompt.md"), "Complete the requested task. Write all candidate-owned files under `result/`.\n")
  writeTextExclusive(join(control, "inputs", "README.md"), "Replace this file with cohort inputs before freezing.\n")
}

console.log(JSON.stringify({ benchmark: basename(benchmarkDir), cohortId, cohortDir: destination, status: "draft", clonedFrom: source }, null, 2))
