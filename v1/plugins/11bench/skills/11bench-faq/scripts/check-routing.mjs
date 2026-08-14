#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const skillRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const routingPath = resolve(skillRoot, "references/routing.json")
const routing = JSON.parse(readFileSync(routingPath, "utf8"))
const failures = []
for (const [topic, files] of Object.entries(routing)) {
  if (!Array.isArray(files) || !files.length) failures.push(`${topic}: no sources`)
  for (const file of files ?? []) {
    const path = resolve(skillRoot, file)
    if (!existsSync(path)) failures.push(`${topic}: missing ${file}`)
  }
}
if (failures.length) {
  console.error(failures.join("\n"))
  process.exit(1)
}
console.log(`FAQ routing valid: ${Object.keys(routing).length} topics.`)
