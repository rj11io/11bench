#!/usr/bin/env node

import { execFileSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { benchmarkFromCohort, hashPath, now, parseArgs, readJson, writeJsonAtomic } from "../../../scripts/core.mjs"

const args = parseArgs(process.argv.slice(2))
if (args.has("help")) {
  console.log("usage: node freeze-cohort.mjs <cohort-dir>")
  process.exit(0)
}

const cohortDir = resolve(args.positionals[0] ?? args.get("cohort") ?? ".")
const benchmarkDir = benchmarkFromCohort(cohortDir)
const configPath = join(cohortDir, "_cohort", "config.json")
const config = readJson(configPath)
if (config.status !== "draft") throw new Error(`cohort must be draft, found: ${config.status}`)

const control = dirname(configPath)
const promptPath = resolve(control, config.prompt.path)
const inputsPath = resolve(control, config.inputs.path)
const templatePath = resolve(control, config.template.path)
if (!existsSync(promptPath) || !readFileSync(promptPath, "utf8").trim()) throw new Error("cohort prompt is missing or empty")
if (!existsSync(inputsPath)) throw new Error("cohort inputs are missing")
if (!existsSync(templatePath)) throw new Error("benchmark template is missing")
if (config.permissions?.requiredIsolation !== "enforced") throw new Error("clean cohorts must require enforced isolation")

const skills = (config.skills ?? []).map((skill) => {
  if (!skill.name) throw new Error("every declared skill requires a name")
  if (!skill.path) throw new Error(`declared skill '${skill.name}' requires a path before freezing`)
  const skillPath = resolve(control, skill.path)
  if (!existsSync(skillPath)) throw new Error(`declared skill is missing: ${skillPath}`)
  return { ...skill, sha256: hashPath(skillPath) }
})
let sourceRef = null
try {
  sourceRef = execFileSync("git", ["rev-parse", "HEAD"], { cwd: benchmarkDir, encoding: "utf8" }).trim()
} catch {
  sourceRef = null
}

const frozen = {
  ...config,
  status: "frozen",
  frozenAt: now(),
  sourceRef,
  prompt: { ...config.prompt, sha256: hashPath(promptPath) },
  inputs: { ...config.inputs, sha256: hashPath(inputsPath) },
  template: { ...config.template, sha256: hashPath(templatePath) },
  skills,
}
writeJsonAtomic(configPath, frozen)
console.log(JSON.stringify({ cohortDir, status: "frozen", sourceRef, hashes: { prompt: frozen.prompt.sha256, inputs: frozen.inputs.sha256, template: frozen.template.sha256, skills: skills.map(({ name, sha256 }) => ({ name, sha256 })) } }, null, 2))
