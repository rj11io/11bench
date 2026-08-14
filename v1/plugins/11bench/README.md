# 11bench plugin

Standalone skills for reproducible AI benchmark operations and analytics.

## Lifecycle

1. `11bench-draft-benchmark`
2. `11bench-draft-cohort`
3. `11bench-freeze-cohort`
4. `11bench-prepare-run`
5. `11bench-launch-run`
6. Candidate execution
7. `11bench-finalize-run`

## Analytics

- `11bench-analyze-run`
- `11bench-analyze-cohort`
- `11bench-analyze-benchmark`
- `11bench-analyze-global`
- `11bench-update-pricing`

Use `11bench-faq` for source-backed answers. Operator documentation is packaged in
`docs/`; `scripts/check-docs-drift.mjs` rejects stale copies while developing in this repository.

Candidate workspaces are intentionally retained after finalization. No skill deletes them
automatically. See `docs/candidate-workspaces.md` before manual cleanup.
