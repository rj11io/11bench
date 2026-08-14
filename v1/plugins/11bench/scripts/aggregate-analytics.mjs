#!/usr/bin/env node

import { existsSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { findV1Root, listScopeDirs, mergeSummaries, now, readJson, sha256, simpleReports, stableStringify, writeJsonAtomic, writeTextAtomic } from "./core.mjs"

export function aggregateScope(scope, target) {
  const dir = resolve(target)
  const childFiles = sourceFiles(scope, dir)
  const sources = childFiles.map((file) => {
    const data = readJson(file)
    return { path: relative(dir, file).replaceAll("\\", "/"), sourceDigest: data.sourceDigest, scope: data.scope, summary: data.summary, availability: data.availability ?? "available", status: data.run?.status ?? null }
  })
  const data = {
    schemaVersion: 1,
    scope,
    generatedAt: now(),
    sourceDigest: sha256(stableStringify(sources.map(({ path, sourceDigest }) => ({ path, sourceDigest })))),
    sources,
    coverage: coverage(scope, dir, sources),
    summary: mergeSummaries(sources.map((source) => source.summary)),
  }
  const analyticsDir = join(dir, "_analytics")
  const reports = simpleReports(data, `11bench ${scope} analytics`)
  writeJsonAtomic(join(analyticsDir, "data.json"), data)
  writeJsonAtomic(join(analyticsDir, "manifest.json"), { scope, generatedAt: data.generatedAt, sourceDigest: data.sourceDigest, sourceCount: sources.length })
  writeTextAtomic(join(analyticsDir, "analysis.md"), reports.markdown)
  writeTextAtomic(join(analyticsDir, "report.html"), reports.html)
  return data
}

function sourceFiles(scope, dir) {
  if (scope === "cohort") return listScopeDirs(dir, join("_run", "metadata.json")).map((run) => join(run, "_analytics", "data.json")).filter(existsSync)
  if (scope === "benchmark") return listScopeDirs(dir, join("_cohort", "config.json")).map((cohort) => join(cohort, "_analytics", "data.json")).filter(existsSync)
  if (scope === "global") return listScopeDirs(join(dir, "benchmarks"), join("_benchmark", "config.json")).map((benchmark) => join(benchmark, "_analytics", "data.json")).filter(existsSync)
  throw new Error(`unsupported aggregate scope: ${scope}`)
}

function coverage(scope, dir, sources) {
  const expected = scope === "cohort"
    ? listScopeDirs(dir, join("_run", "metadata.json")).length
    : scope === "benchmark"
      ? listScopeDirs(dir, join("_cohort", "config.json")).length
      : listScopeDirs(join(dir, "benchmarks"), join("_benchmark", "config.json")).length
  return { expectedChildren: expected, analyzedChildren: sources.length, missingChildren: expected - sources.length, unavailableChildren: sources.filter((source) => source.availability === "unavailable").length, taintedChildren: sources.filter((source) => source.status === "tainted").length }
}

export function cascadeFromRun(runDir) {
  const cohortDir = dirname(resolve(runDir))
  return cascadeFromCohort(cohortDir)
}

export function cascadeFromCohort(cohortDir) {
  const resolvedCohort = resolve(cohortDir)
  const benchmarkDir = dirname(resolvedCohort)
  const v1Root = findV1Root(benchmarkDir)
  const cohort = aggregateScope("cohort", resolvedCohort)
  const benchmark = aggregateScope("benchmark", benchmarkDir)
  const global = aggregateScope("global", v1Root)
  return { cohort: cohort.sourceDigest, benchmark: benchmark.sourceDigest, global: global.sourceDigest }
}

export function cascadeFromBenchmark(benchmarkDir) {
  const resolvedBenchmark = resolve(benchmarkDir)
  const v1Root = findV1Root(resolvedBenchmark)
  const benchmark = aggregateScope("benchmark", resolvedBenchmark)
  const global = aggregateScope("global", v1Root)
  return { benchmark: benchmark.sourceDigest, global: global.sourceDigest }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const scope = process.argv[2]
  const target = process.argv[3] ?? "."
  const data = aggregateScope(scope, target)
  console.log(JSON.stringify({ scope, target: resolve(target), sourceDigest: data.sourceDigest, summary: data.summary, coverage: data.coverage }, null, 2))
}
