---
name: 11bench-draft-cohort
description: Create or clone an editable 11bench cohort while preserving prior frozen cohorts and runs. Use for prompt, input, template, skill, or permission variants.
---

# Draft cohort

## Workflow

1. Read `../../docs/cohort-lifecycle.md`.
2. Decide the single variable or coherent variant the cohort represents.
3. Create a fresh draft:

```sh
node scripts/draft-cohort.mjs <benchmark-dir> --id <cohort-id> [--from <source-cohort>]
```

4. Edit only the new cohort. Never mutate a frozen cohort.
5. Review prompt, inputs, template, pinned skills, and enforced permissions before freezing.

A clone copies cohort source material only. It never copies runs, batches, analytics, evidence, or judging data.
