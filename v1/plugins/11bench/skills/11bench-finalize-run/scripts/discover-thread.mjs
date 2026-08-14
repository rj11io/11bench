#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs"
import { homedir } from "node:os"
import { basename, extname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { canonicalPath, parseArgs, readJson } from "../../../scripts/core.mjs"

export function discoverCodexThreads({ workspacePath, preparedAt, codexHome = process.env.CODEX_HOME ?? join(homedir(), ".codex") }) {
  const workspace = canonicalPath(workspacePath)
  const threshold = new Date(preparedAt).getTime() - 5_000
  const files = [join(codexHome, "sessions"), join(codexHome, "archived_sessions")].flatMap(walkJsonl)
  const matches = []
  for (const file of files) {
    let records
    try { records = readFileSync(file, "utf8").split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line)) } catch { continue }
    const meta = records.find((record) => record?.type === "session_meta")?.payload
    if (!meta?.cwd || canonicalPath(meta.cwd) !== workspace) continue
    const timestamp = new Date(meta.timestamp ?? records[0]?.timestamp ?? 0).getTime()
    if (Number.isFinite(threshold) && timestamp < threshold) continue
    const context = records.filter((record) => record?.type === "turn_context").at(-1)?.payload ?? {}
    const sourceSubagent = meta?.source?.subagent
    const isSubagent = meta?.thread_source === "subagent" || Boolean(sourceSubagent)
    matches.push({
      threadId: String(meta.id ?? meta.session_id ?? basename(file, extname(file))),
      sourcePath: resolve(file),
      cwd: workspace,
      startedAt: new Date(timestamp).toISOString(),
      model: context.model ?? null,
      effort: context.effort ?? context.reasoning_effort ?? null,
      role: isSubagent ? "subagent" : "root",
      parentThreadId: meta.parent_thread_id ?? sourceSubagent?.thread_spawn?.parent_thread_id ?? null,
    })
  }
  return matches.sort((a, b) => a.startedAt.localeCompare(b.startedAt))
}

function walkJsonl(root) {
  if (!existsSync(root)) return []
  const files = []
  const visit = (dir) => {
    let entries = []
    try { entries = readdirSync(dir, { withFileTypes: true }) } catch { return }
    for (const entry of entries) {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) visit(path)
      else if (entry.isFile() && entry.name.endsWith(".jsonl")) files.push(path)
    }
  }
  visit(root)
  return files
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2))
  if (args.has("help")) {
    console.log("usage: node discover-thread.mjs <run-dir> [--codex-home dir]")
    process.exit(0)
  }
  const runDir = resolve(args.positionals[0] ?? ".")
  const metadata = readJson(join(runDir, "_run", "metadata.json"))
  console.log(JSON.stringify(discoverCodexThreads({ workspacePath: metadata.workspace.path, preparedAt: metadata.preparedAt, codexHome: args.get("codex-home") ?? undefined }), null, 2))
}
