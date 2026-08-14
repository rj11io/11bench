---
name: 11bench-analyze-cohort
description: Regenerate cohort-wide analytics from finalized run analytics. Use after runs are added or run analytics change; never rescan unrelated task logs.
---

# Analyze cohort

```sh
node scripts/analyze-cohort.mjs <cohort-dir>
```

The command reads child `_analytics/data.json` files only and atomically rewrites the cohort, affected benchmark, and global views. Coverage reports expected, analyzed, missing, and unavailable children. Use `--local-only` only when a caller owns the remaining cascade. See `../../docs/analytics.md`.
