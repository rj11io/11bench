---
name: 11bench-analyze-benchmark
description: Regenerate benchmark-wide analytics from cohort analytics. Use after an affected cohort view changes; preserve unrelated benchmarks.
---

# Analyze benchmark

```sh
node scripts/analyze-benchmark.mjs <benchmark-dir>
```

The command aggregates normal cohort folders with `_cohort/config.json` and writes the benchmark and global derived views atomically. It never scans native task logs. Use `--local-only` only when a caller owns global refresh. See `../../docs/analytics.md`.
