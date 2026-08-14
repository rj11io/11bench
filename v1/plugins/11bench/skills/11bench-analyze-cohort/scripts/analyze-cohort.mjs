#!/usr/bin/env node
import { resolve } from "node:path"
import { aggregateScope, cascadeFromCohort } from "../../../scripts/aggregate-analytics.mjs"
const target = resolve(process.argv[2] ?? ".")
const result = process.argv.includes("--local-only") ? aggregateScope("cohort", target) : cascadeFromCohort(target)
console.log(JSON.stringify(result, null, 2))
