---
name: 11bench-analyze-run
description: Generate standalone exact-task token, cost, timing, model, effort, harness, and subagent analytics for one 11bench run. Use during finalization or to regenerate a bound run report.
---

# Analyze run

Read `../../docs/analytics.md` and `references/harnesses.md`.

```sh
node scripts/analyze-run.mjs <run-dir> [--thread <root-task-id>]
```

The analyzer selects the root task and its native descendants only. It writes `_analytics/data.json`, `analysis.md`, `report.html`, and raw exact-task data. Unknown or unavailable usage remains null, never zero.

Regeneration refreshes the affected cohort, benchmark, and global views. Use `--no-cascade` only when a bulk finalizer will refresh the chain once.

This skill is standalone. It uses only bundled parsers, harness semantics, pricing history, and pricing catalog. Do not import another plugin or analytics installation at runtime.
