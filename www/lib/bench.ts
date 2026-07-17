import fs from "node:fs"
import path from "node:path"

/**
 * Build-time scanner over the 11bench repository. Every number and name the
 * site shows comes from here — never hardcode counts, versions, or run ids
 * in page copy.
 */

export type RunCost = {
  id: string
  harness: string
  model?: string | null
  costUsd: number | null
  tokens: number | null
  cacheHitRate: number | null
  wallTimeMinutes: number | null
  ranAt: string | null
}

export type Benchmark = {
  slug: string
  title: string
  pitch: string
  deployedUrl: string | null
  readme: string
  githubPath: string
  runs: RunCost[]
  totalRunCostUsd: number | null
  totalRunTokens: number | null
}

export type RepoMeta = {
  version: string | null
  githubUrl: string
}

const FALLBACK_GITHUB_URL = "https://github.com/rj11io/11bench"

/**
 * The site builds from `www/`, but tooling sometimes runs from the repo
 * root — try both before giving up.
 */
function repoRoot(): string {
  const candidates = [path.join(process.cwd(), ".."), process.cwd()]
  for (const candidate of candidates) {
    if (
      fs.existsSync(path.join(candidate, "v1")) &&
      fs.existsSync(path.join(candidate, "README.md"))
    ) {
      return candidate
    }
  }
  return candidates[0]
}

function readTextIfExists(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf8")
  } catch {
    return null
  }
}

export function getRepoMeta(): RepoMeta {
  const changelog = readTextIfExists(path.join(repoRoot(), "CHANGELOG.md"))
  const version = changelog?.match(/^#+ \[(\d+\.\d+\.\d+)\]/m)?.[1] ?? null
  const repoSlug = changelog?.match(
    /github\.com\/([\w.-]+\/[\w.-]+?)(?:\/|$)/m,
  )?.[1]
  return {
    version,
    githubUrl: repoSlug ? `https://github.com/${repoSlug}` : FALLBACK_GITHUB_URL,
  }
}

/** Elevator pitch: the first prose paragraph of the root README. */
export function getRepoPitch(): string {
  const readme = readTextIfExists(path.join(repoRoot(), "README.md"))
  return readme ? parsePitch(readme) : ""
}

/** First `# Title` line of a README, or the directory name as fallback. */
function parseTitle(readme: string, fallback: string): string {
  return readme.match(/^# (.+)$/m)?.[1]?.trim() ?? fallback
}

/**
 * First plain-prose paragraph after the title: skips headings, link-only
 * "Deployed at" lines, and blank lines, then joins one paragraph.
 */
function parsePitch(readme: string): string {
  const lines = readme.split("\n")
  const paragraph: string[] = []
  let pastTitle = false
  for (const line of lines) {
    const trimmed = line.trim()
    if (!pastTitle) {
      if (trimmed.startsWith("# ")) pastTitle = true
      continue
    }
    if (paragraph.length === 0) {
      if (
        trimmed === "" ||
        trimmed.startsWith("#") ||
        /^deployed at/i.test(trimmed)
      ) {
        continue
      }
      paragraph.push(trimmed)
    } else {
      if (trimmed === "") break
      paragraph.push(trimmed)
    }
  }
  return paragraph.join(" ")
}

function parseDeployedUrl(readme: string): string | null {
  return readme.match(/deployed at\s+\[?.*?(https?:\/\/\S+?)[)\s\]]/im)?.[1] ?? null
}

type SummaryRun = {
  costUsd?: number | null
  tokens?: number | null
  kind?: string
  harness?: string
  cacheHitRate?: number
  wallTimeMinutes?: number | null
  ranAt?: string | null
}

/**
 * Measured run costs from a benchmark's `benchmark/costs/summary.json`.
 * Lenient on purpose: a missing or malformed file yields no runs, never a
 * broken build.
 */
function parseRuns(benchmarkDir: string): RunCost[] {
  const raw = readTextIfExists(
    path.join(benchmarkDir, "benchmark", "costs", "summary.json"),
  )
  if (!raw) return []
  try {
    const summary = JSON.parse(raw) as { runs?: Record<string, SummaryRun> | Array<SummaryRun & { id: string }> }
    const entries = Array.isArray(summary.runs)
      ? summary.runs.map((run) => [run.id, run] as const)
      : Object.entries(summary.runs ?? {})
    return entries
      .filter(([, run]) => !((run as SummaryRun).kind) || (run as SummaryRun).kind === "benchmark-run")
      .map(([id, run]) => ({
        id,
        harness: run.harness ?? "unknown",
        model: (run as SummaryRun & { model?: string | null }).model ?? null,
        costUsd: typeof run.costUsd === "number" ? run.costUsd : null,
        tokens: typeof run.tokens === "number" ? run.tokens : null,
        cacheHitRate:
          typeof run.cacheHitRate === "number" ? run.cacheHitRate : null,
        wallTimeMinutes:
          typeof run.wallTimeMinutes === "number" ? run.wallTimeMinutes : null,
        ranAt: typeof run.ranAt === "string" ? run.ranAt : null,
      }))
      .sort((a, b) => (b.costUsd ?? -1) - (a.costUsd ?? -1))
  } catch {
    return []
  }
}

/**
 * Every directory under `v1/` with a README is a benchmark. Directories
 * whose names start with `_` (like `_app-boilerplate_`) are internal
 * tooling and stay off the site.
 */
export function getBenchmarks(): Benchmark[] {
  const v1Dir = path.join(repoRoot(), "v1")
  let entries: fs.Dirent[]
  try {
    entries = fs.readdirSync(v1Dir, { withFileTypes: true })
  } catch {
    return []
  }

  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .flatMap((entry) => {
      const dir = path.join(v1Dir, entry.name)
      const readme = readTextIfExists(path.join(dir, "README.md"))
      if (!readme) return []
      const runs = parseRuns(dir)
      return [
        {
          slug: entry.name,
          title: parseTitle(readme, entry.name),
          pitch: parsePitch(readme),
          deployedUrl: parseDeployedUrl(readme),
          readme,
          githubPath: `v1/${entry.name}`,
          runs,
          totalRunCostUsd:
            runs.some((run) => run.costUsd != null)
              ? runs.reduce((sum, run) => sum + (run.costUsd ?? 0), 0)
              : null,
          totalRunTokens: runs.some((run) => run.tokens != null)
            ? runs.reduce((sum, run) => sum + (run.tokens ?? 0), 0)
            : null,
        },
      ]
    })
    .sort((a, b) => b.runs.length - a.runs.length || a.slug.localeCompare(b.slug))
}

export function getBenchmark(slug: string): Benchmark | null {
  return getBenchmarks().find((benchmark) => benchmark.slug === slug) ?? null
}

export type Totals = {
  benchmarks: number
  runs: number
  runCostUsd: number
  runTokens: number
}

export function getTotals(): Totals {
  const benchmarks = getBenchmarks()
  const runs = benchmarks.flatMap((benchmark) => benchmark.runs)
  return {
    benchmarks: benchmarks.length,
    runs: runs.length,
    runCostUsd: runs.reduce((sum, run) => sum + (run.costUsd ?? 0), 0),
    runTokens: runs.reduce((sum, run) => sum + (run.tokens ?? 0), 0),
  }
}

export function formatUsd(value: number | null): string {
  return value == null ? "—" : `$${value.toFixed(2)}`
}

export function formatTokens(value: number | null): string {
  if (value == null) return "—"
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000) return `${Math.round(value / 1_000)}k`
  return value.toLocaleString("en-US")
}

export function formatDate(iso: string | null): string {
  if (!iso) return "—"
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}
