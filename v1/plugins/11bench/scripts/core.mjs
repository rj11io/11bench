import { createHash } from "node:crypto"
import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { dirname, join, relative, resolve, sep } from "node:path"

export const now = () => new Date().toISOString()

export function parseArgs(argv) {
  const values = new Map()
  const positionals = []
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (!arg.startsWith("--")) {
      positionals.push(arg)
      continue
    }
    const key = arg.slice(2)
    const next = argv[index + 1]
    if (!next || next.startsWith("--")) {
      values.set(key, true)
      continue
    }
    if (values.has(key)) {
      const prior = values.get(key)
      values.set(key, Array.isArray(prior) ? [...prior, next] : [prior, next])
    } else {
      values.set(key, next)
    }
    index += 1
  }
  return {
    get: (key, fallback = null) => values.has(key) ? values.get(key) : fallback,
    has: (key) => values.has(key),
    positionals,
  }
}

export function assertId(value, label = "id") {
  if (typeof value !== "string" || !/^[a-z0-9][a-z0-9.-]*$/.test(value) || value.startsWith("_")) {
    throw new Error(`${label} must use lower-case letters, digits, dots, or hyphens and cannot start with '_'`)
  }
  return value
}

export function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"))
}

export function writeJsonAtomic(file, value) {
  mkdirSync(dirname(file), { recursive: true })
  const temporary = `${file}.tmp-${process.pid}-${Date.now()}`
  writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, { flag: "wx" })
  renameSync(temporary, file)
}

export function writeTextExclusive(file, value) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, value.endsWith("\n") ? value : `${value}\n`, { flag: "wx" })
}

export function writeTextAtomic(file, value) {
  mkdirSync(dirname(file), { recursive: true })
  const temporary = `${file}.tmp-${process.pid}-${Date.now()}`
  writeFileSync(temporary, value.endsWith("\n") ? value : `${value}\n`, { flag: "wx" })
  renameSync(temporary, file)
}

export const sha256 = (value) => createHash("sha256").update(value).digest("hex")

export function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`
  }
  return JSON.stringify(value)
}

export function hashPath(target) {
  if (!existsSync(target)) throw new Error(`cannot hash missing path: ${target}`)
  const root = resolve(target)
  const entries = []
  const visit = (file) => {
    const info = lstatSync(file)
    if (info.isSymbolicLink()) throw new Error(`symbolic links are forbidden in frozen inputs: ${file}`)
    if (info.isDirectory()) {
      for (const name of readdirSync(file).sort()) {
        if (name === ".DS_Store") continue
        visit(join(file, name))
      }
      return
    }
    if (!info.isFile()) return
    const path = relative(root, file).replaceAll("\\", "/") || "."
    entries.push([path, sha256(readFileSync(file))])
  }
  visit(root)
  return sha256(stableStringify(entries))
}

export function isWithin(parent, child) {
  const rel = relative(resolve(parent), resolve(child))
  return rel === "" || (!rel.startsWith("..") && !rel.includes(`..${sep}`))
}

export function copyTree(source, destination) {
  const root = resolve(source)
  if (!existsSync(root) || !statSync(root).isDirectory()) throw new Error(`source directory is missing: ${root}`)
  const visit = (from, to) => {
    const info = lstatSync(from)
    if (info.isSymbolicLink()) throw new Error(`symbolic links are forbidden in candidate inputs: ${from}`)
    if (info.isDirectory()) {
      mkdirSync(to, { recursive: true })
      for (const name of readdirSync(from).sort()) {
        if (name === ".DS_Store") continue
        if (name === ".git") throw new Error(`git history is forbidden in candidate copies: ${join(from, name)}`)
        visit(join(from, name), join(to, name))
      }
      return
    }
    if (info.isFile()) copyFileSync(from, to)
  }
  visit(root, resolve(destination))
}

export function canonicalPath(file) {
  try {
    return realpathSync(file)
  } catch {
    return resolve(file)
  }
}

export function findV1Root(start) {
  let current = resolve(start)
  while (true) {
    if (current.endsWith(`${sep}v1`) && existsSync(join(current, "benchmarks"))) return current
    if (existsSync(join(current, "v1", "benchmarks"))) return join(current, "v1")
    const parent = dirname(current)
    if (parent === current) throw new Error(`could not locate v1 root from ${start}`)
    current = parent
  }
}

export function benchmarkFromCohort(cohortDir) {
  const benchmarkDir = dirname(resolve(cohortDir))
  if (!existsSync(join(benchmarkDir, "_benchmark", "config.json"))) {
    throw new Error(`cohort is not inside a benchmark: ${cohortDir}`)
  }
  return benchmarkDir
}

export function cohortControl(cohortDir) {
  return join(resolve(cohortDir), "_cohort")
}

export function runControl(runDir) {
  return join(resolve(runDir), "_run")
}

export function preparedCohortDrift(cohortDir, metadata) {
  const control = cohortControl(cohortDir)
  const reasons = []
  const checks = [
    ["cohort config", join(control, "config.json"), metadata.cohortConfigSha256],
    ...Object.entries(metadata.cohortArtifactPaths ?? {}).map(([name, path]) => [name, resolve(control, path), metadata.cohortHashes?.[name]]),
    ...(metadata.cohortSkillHashes ?? []).map((skill) => [`skill ${skill.name}`, resolve(control, skill.path), skill.sha256]),
  ]
  for (const [name, path, expected] of checks) {
    if (!expected) continue
    if (!existsSync(path)) {
      reasons.push(`${name} is missing after preparation`)
      continue
    }
    try {
      if (hashPath(path) !== expected) reasons.push(`${name} changed after preparation`)
    } catch (error) {
      reasons.push(`${name} cannot be verified: ${error.message}`)
    }
  }
  return reasons
}

export function listScopeDirs(parent, marker) {
  if (!existsSync(parent)) return []
  return readdirSync(parent, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_") && existsSync(join(parent, entry.name, marker)))
    .map((entry) => join(parent, entry.name))
    .sort()
}

export function wildcardMatch(pattern, value) {
  const escaped = pattern.split("*").map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*")
  return new RegExp(`^${escaped}$`, "i").test(value)
}

export function pricingMatch(catalog, provider, model) {
  return catalog.models.find((entry) => (!entry.provider || entry.provider === provider) && entry.match.some((pattern) => wildcardMatch(pattern, model))) ?? null
}

export function summarizeThreads(threads = []) {
  const finite = (value) => typeof value === "number" && Number.isFinite(value)
  const sum = (values) => values.filter(finite).reduce((total, value) => total + value, 0)
  const providers = [...new Set(threads.map((thread) => thread.provider).filter(Boolean))].sort()
  const models = [...new Set(threads.map((thread) => thread.model).filter(Boolean))].sort()
  const efforts = [...new Set(threads.map((thread) => thread.effort).filter(Boolean))].sort()
  const tokenValues = threads.map((thread) => thread.tokens?.providerTotal)
  const costValues = threads.map((thread) => thread.cost?.totalUsd)
  const wallValues = threads.map((thread) => thread.wallTimeMs)
  const activeValues = threads.map((thread) => thread.activeTimeMs)
  return {
    runCount: 1,
    threadCount: threads.length,
    tokens: tokenValues.some(finite) ? sum(tokenValues) : null,
    costUsd: costValues.some(finite) ? sum(costValues) : null,
    wallTimeMs: wallValues.some(finite) ? sum(wallValues) : null,
    activeTimeMs: activeValues.some(finite) ? sum(activeValues) : null,
    providers,
    models,
    efforts,
  }
}

export function mergeSummaries(items) {
  const finite = (value) => typeof value === "number" && Number.isFinite(value)
  const sumAvailable = (key) => items.some((item) => finite(item?.[key]))
    ? items.reduce((total, item) => total + (finite(item?.[key]) ? item[key] : 0), 0)
    : null
  return {
    runCount: items.reduce((sum, item) => sum + (item?.runCount ?? 0), 0),
    threadCount: items.reduce((sum, item) => sum + (item?.threadCount ?? 0), 0),
    tokens: sumAvailable("tokens"),
    costUsd: sumAvailable("costUsd"),
    wallTimeMs: sumAvailable("wallTimeMs"),
    activeTimeMs: sumAvailable("activeTimeMs"),
    providers: [...new Set(items.flatMap((item) => item?.providers ?? []))].sort(),
    models: [...new Set(items.flatMap((item) => item?.models ?? []))].sort(),
    efforts: [...new Set(items.flatMap((item) => item?.efforts ?? []))].sort(),
  }
}

export function simpleReports(data, title) {
  const summary = data.summary ?? {}
  const unavailable = (value) => value === null || value === undefined ? "n/a" : value
  const markdown = [
    `# ${title}`,
    "",
    `Generated: ${data.generatedAt}`,
    "",
    "## Summary",
    "",
    "| Metric | Value |",
    "| --- | ---: |",
    `| Runs | ${unavailable(summary.runCount)} |`,
    `| Threads | ${unavailable(summary.threadCount)} |`,
    `| Tokens | ${unavailable(summary.tokens)} |`,
    `| Known cost USD | ${unavailable(summary.costUsd)} |`,
    `| Wall time ms | ${unavailable(summary.wallTimeMs)} |`,
    `| Active time ms | ${unavailable(summary.activeTimeMs)} |`,
    "",
    "## Coverage",
    "",
    `- Providers: ${(summary.providers ?? []).join(", ") || "n/a"}`,
    `- Models: ${(summary.models ?? []).join(", ") || "n/a"}`,
    `- Efforts: ${(summary.efforts ?? []).join(", ") || "n/a"}`,
    `- Source digest: ${data.sourceDigest ?? "n/a"}`,
    "",
    "_Generated by 11bench._",
    "",
  ].join("\n")
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(title)}</title><style>body{font:14px/1.5 system-ui;margin:32px;background:#111;color:#eee}main{max-width:1000px;margin:auto}table{border-collapse:collapse;width:100%}th,td{border:1px solid #444;padding:8px;text-align:left}code{font-family:ui-monospace,monospace}</style><main><h1>${escapeHtml(title)}</h1><p>Generated: ${escapeHtml(data.generatedAt)}</p><h2>Summary</h2><table><tbody>${Object.entries(summary).filter(([,value]) => !Array.isArray(value)).map(([key,value]) => `<tr><th>${escapeHtml(key)}</th><td>${escapeHtml(unavailable(value))}</td></tr>`).join("")}</tbody></table><h2>Sources</h2><pre>${escapeHtml(JSON.stringify(data.sources ?? [], null, 2))}</pre><p><em>Generated by 11bench.</em></p></main></html>\n`
  return { markdown, html }
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char])
}
