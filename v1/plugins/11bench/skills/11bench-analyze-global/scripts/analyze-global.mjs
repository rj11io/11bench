#!/usr/bin/env node
import { resolve } from "node:path"
import { aggregateScope } from "../../../scripts/aggregate-analytics.mjs"
const target = resolve(process.argv[2] ?? ".")
console.log(JSON.stringify(aggregateScope("global", target), null, 2))
