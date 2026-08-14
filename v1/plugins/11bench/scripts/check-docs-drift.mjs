#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { sha256 } from "./core.mjs"

const pluginRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const source = resolve(pluginRoot, "../../docs")
const packaged = resolve(pluginRoot, "docs")
if (!existsSync(source)) {
  console.log("Source documentation is not present in this installed plugin; packaged documentation is authoritative.")
  process.exit(0)
}
const list = (root) => readdirSync(root, { withFileTypes: true }).flatMap((entry) => entry.isFile() && entry.name.endsWith(".md") ? [entry.name] : [])
const names = [...new Set([...list(source), ...(existsSync(packaged) ? list(packaged) : [])])].sort()
const failures = names.filter((name) => !existsSync(join(source, name)) || !existsSync(join(packaged, name)) || sha256(readFileSync(join(source, name))) !== sha256(readFileSync(join(packaged, name))))
if (failures.length) {
  console.error(`Packaged docs differ from v1/docs:\n${failures.map((name) => `- ${name}`).join("\n")}`)
  console.error("Synchronize v1/docs to v1/plugins/11bench/docs before release.")
  process.exit(1)
}
console.log(`Packaged documentation synchronized: ${names.length} files.`)
