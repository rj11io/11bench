---
name: 11bench-analyze-global
description: Regenerate the v1-wide analytics view from benchmark analytics. Use after any benchmark aggregate changes or for a global consistency refresh.
---

# Analyze global

```sh
node scripts/analyze-global.mjs <v1-root>
```

The command reads only benchmark `_analytics/data.json` files and atomically rewrites `v1/_analytics`. Missing or unavailable child coverage stays explicit. See `../../docs/analytics.md`.
