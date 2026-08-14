---
name: 11bench-draft-benchmark
description: Draft a new 11bench benchmark project with its required metadata, template, and editable baseline cohort. Use when starting a benchmark or prototype before any cohort is frozen.
---

# Draft benchmark

Create only editable source material. Do not freeze or launch runs.

## Workflow

1. Read `../../docs/drafting-benchmarks.md` and `../../docs/directory-contract.md`.
2. Confirm the benchmark id, title, goal, input data, result contract, and permissions.
3. Run:

```sh
node scripts/draft-benchmark.mjs --v1 <v1-root> --id <benchmark-id> --title <title> [--prototype]
```

4. Edit the generated `template/`, `baseline/_cohort/prompt.md`, inputs, and policy.
5. Keep `baseline/_cohort/config.json` at `status: draft` until review.

Never create `_batches`, runs, or analytics for an unused draft.
