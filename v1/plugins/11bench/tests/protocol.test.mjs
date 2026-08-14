import test from "node:test"
import assert from "node:assert/strict"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import { discoverCodexThreads } from "../skills/11bench-finalize-run/scripts/discover-thread.mjs"

const pluginRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const script = (...parts) => join(pluginRoot, ...parts)

test("candidate workspace persists through finalization and analytics cascade", () => {
  const root = mkdtempSync(join(tmpdir(), "11bench-test-"))
  try {
    const v1 = join(root, "v1")
    mkdirSync(join(v1, "benchmarks"), { recursive: true })
    run(script("skills", "11bench-draft-benchmark", "scripts", "draft-benchmark.mjs"), ["--v1", v1, "--id", "smoke-bench", "--prototype"])
    const cohort = join(v1, "benchmarks", "smoke-bench", "baseline")
    run(script("skills", "11bench-freeze-cohort", "scripts", "freeze-cohort.mjs"), [cohort])
    const prepared = run(script("skills", "11bench-prepare-run", "scripts", "prepare-run.mjs"), [cohort, "--run", "candidate-a", "--provider", "openai", "--model", "gpt-5.6-sol", "--effort", "high", "--workspace-root", root])
    const packet = JSON.parse(prepared)
    const workspace = packet.prepared[0].workspacePath
    const runDir = packet.prepared[0].runDir
    run(script("skills", "11bench-launch-run", "scripts", "launch-run.mjs"), [runDir, "--isolation", "enforced", "--mark-running"])
    writeFileSync(join(workspace, "result", "index.html"), "<!doctype html><title>result</title>\n")
    const codexHome = join(root, "empty-codex-home")
    mkdirSync(codexHome)
    run(script("skills", "11bench-finalize-run", "scripts", "finalize-run.mjs"), [runDir, "--isolation", "enforced", "--allow-missing-analytics", "--codex-home", codexHome])

    assert.equal(existsSync(workspace), true)
    assert.equal(existsSync(join(runDir, "result", "index.html")), true)
    const metadata = JSON.parse(readFileSync(join(runDir, "_run", "metadata.json"), "utf8"))
    assert.equal(metadata.workspace.autoDelete, false)
    assert.equal(metadata.workspace.cleanupPolicy, "manual-only")
    assert.equal(metadata.workspace.cleanupEligible, true)
    assert.match(metadata.workspace.cleanupWarning, /never deletes/i)
    assert.equal(JSON.parse(readFileSync(join(runDir, "_analytics", "data.json"), "utf8")).availability, "unavailable")
    assert.equal(existsSync(join(cohort, "_analytics", "data.json")), true)
    assert.equal(existsSync(join(v1, "benchmarks", "smoke-bench", "_analytics", "data.json")), true)
    assert.equal(existsSync(join(v1, "_analytics", "data.json")), true)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("manual task discovery uses unique candidate workspace", () => {
  const root = mkdtempSync(join(tmpdir(), "11bench-discovery-"))
  try {
    const workspace = join(root, "candidate")
    const codexHome = join(root, "codex")
    const sessionDir = join(codexHome, "sessions", "2026", "08", "14")
    mkdirSync(workspace)
    mkdirSync(sessionDir, { recursive: true })
    const records = [
      { timestamp: "2026-08-14T10:00:00.000Z", type: "session_meta", payload: { id: "task-123", cwd: workspace, timestamp: "2026-08-14T10:00:00.000Z" } },
      { timestamp: "2026-08-14T10:00:01.000Z", type: "turn_context", payload: { model: "gpt-5.6-sol", effort: "high" } },
    ]
    writeFileSync(join(sessionDir, "task-123.jsonl"), `${records.map(JSON.stringify).join("\n")}\n`)
    const matches = discoverCodexThreads({ workspacePath: workspace, preparedAt: "2026-08-14T09:59:00.000Z", codexHome })
    assert.equal(matches.length, 1)
    assert.equal(matches[0].threadId, "task-123")
    assert.equal(matches[0].role, "root")
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("standalone exact-task analytics binds a Codex task and refreshes parents", () => {
  const root = mkdtempSync(join(tmpdir(), "11bench-analytics-"))
  try {
    const v1 = join(root, "v1")
    const benchmark = join(v1, "benchmarks", "analytics-bench")
    const cohort = join(benchmark, "baseline")
    const runDir = join(cohort, "candidate-a")
    const workspace = join(v1, "_workspaces", "candidate-a")
    const codexHome = join(root, "codex")
    const sessionDir = join(codexHome, "sessions", "2026", "08", "14")
    mkdirSync(join(benchmark, "_benchmark"), { recursive: true })
    mkdirSync(join(cohort, "_cohort"), { recursive: true })
    mkdirSync(join(runDir, "_run"), { recursive: true })
    mkdirSync(join(runDir, "result"), { recursive: true })
    mkdirSync(join(workspace, "result"), { recursive: true })
    mkdirSync(sessionDir, { recursive: true })
    writeFileSync(join(benchmark, "_benchmark", "config.json"), '{"schemaVersion":1,"id":"analytics-bench","title":"Analytics","createdAt":"2026-08-14T00:00:00.000Z"}\n')
    writeFileSync(join(cohort, "_cohort", "config.json"), '{"schemaVersion":1,"id":"baseline","benchmarkId":"analytics-bench","status":"frozen"}\n')
    writeFileSync(join(runDir, "_run", "metadata.json"), `${JSON.stringify({ schemaVersion: 1, runId: "candidate-a", benchmarkId: "analytics-bench", cohortId: "baseline", status: "complete", provider: "openai", model: "gpt-5.6-sol", effort: "high", harness: "codex", preparedAt: "2026-08-14T09:59:00.000Z", rootThreadId: "task-exact", subagentThreadIds: [], isolationStatus: "enforced", taintReasons: [], workspace: { path: workspace, autoDelete: false, cleanupPolicy: "manual-only", cleanupEligible: true, cleanupWarning: "retained" } }, null, 2)}\n`)
    const records = [
      { timestamp: "2026-08-14T10:00:00.000Z", type: "session_meta", payload: { id: "task-exact", cwd: workspace, timestamp: "2026-08-14T10:00:00.000Z" } },
      { timestamp: "2026-08-14T10:00:01.000Z", type: "turn_context", payload: { model: "gpt-5.6-sol", effort: "high" } },
      { timestamp: "2026-08-14T10:00:05.000Z", type: "event_msg", payload: { type: "token_count", info: { total_token_usage: { input_tokens: 1000, cached_input_tokens: 200, output_tokens: 400, reasoning_output_tokens: 100, total_tokens: 1400 } } } },
    ]
    writeFileSync(join(sessionDir, "task-exact.jsonl"), `${records.map(JSON.stringify).join("\n")}\n`)
    run(script("skills", "11bench-analyze-run", "scripts", "analyze-run.mjs"), [runDir, "--thread", "task-exact", "--codex-home", codexHome])
    const data = JSON.parse(readFileSync(join(runDir, "_analytics", "data.json"), "utf8"))
    assert.equal(data.availability, "available")
    assert.equal(data.summary.threadCount, 1)
    assert.equal(data.summary.tokens, 1400)
    assert.equal(typeof data.summary.costUsd, "number")
    assert.equal(existsSync(join(v1, "_analytics", "data.json")), true)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("parallel candidates use a batch manifest and retain every workspace", () => {
  const root = mkdtempSync(join(tmpdir(), "11bench-batch-"))
  try {
    const v1 = join(root, "v1")
    mkdirSync(join(v1, "benchmarks"), { recursive: true })
    run(script("skills", "11bench-draft-benchmark", "scripts", "draft-benchmark.mjs"), ["--v1", v1, "--id", "batch-bench"])
    const cohort = join(v1, "benchmarks", "batch-bench", "baseline")
    run(script("skills", "11bench-freeze-cohort", "scripts", "freeze-cohort.mjs"), [cohort])
    const candidatesPath = join(root, "candidates.json")
    writeFileSync(candidatesPath, `${JSON.stringify([{ runId: "candidate-a", provider: "openai", model: "gpt-5.6-sol", effort: "high", harness: "codex" }, { runId: "candidate-b", provider: "anthropic", model: "claude-opus-4-6", effort: "high", harness: "claude" }], null, 2)}\n`)
    const prepared = JSON.parse(run(script("skills", "11bench-prepare-run", "scripts", "prepare-run.mjs"), [cohort, "--candidates", candidatesPath, "--batch-id", "batch-smoke", "--workspace-root", root]))
    assert.equal(prepared.prepared.length, 2)
    assert.equal(existsSync(prepared.batchPath), true)
    const launch = JSON.parse(run(script("skills", "11bench-launch-run", "scripts", "launch-run.mjs"), ["--batch", prepared.batchPath, "--isolation", "enforced"]))
    assert.equal(launch.packets.length, 2)
    for (const candidate of prepared.prepared) writeFileSync(join(candidate.workspacePath, "result", "index.html"), `<!doctype html><title>${candidate.runId}</title>\n`)
    const codexHome = join(root, "empty-codex-home")
    mkdirSync(codexHome)
    run(script("skills", "11bench-finalize-run", "scripts", "finalize-run.mjs"), ["--batch", prepared.batchPath, "--isolation", "enforced", "--allow-missing-analytics", "--codex-home", codexHome])
    const batch = JSON.parse(readFileSync(prepared.batchPath, "utf8"))
    assert.equal(batch.status, "complete")
    assert.deepEqual(batch.runs.map((item) => item.status), ["complete", "complete"])
    assert.equal(prepared.prepared.every((candidate) => existsSync(candidate.workspacePath)), true)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

function run(file, args) {
  const result = spawnSync(process.execPath, [resolve(file), ...args], { encoding: "utf8" })
  assert.equal(result.status, 0, result.stderr || result.stdout)
  return result.stdout
}
