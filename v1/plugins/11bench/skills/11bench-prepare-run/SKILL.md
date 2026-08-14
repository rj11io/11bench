---
name: 11bench-prepare-run
description: Prepare one or many isolated candidate workspaces from a frozen cohort, with immutable run metadata and pricing preflight. Use immediately before manual or automated launch.
---

# Prepare run

Preparation materializes candidates. It does not submit a prompt or execute a model.

## Candidate workspace contract

Read `../../docs/candidate-workspaces.md` before acting. Each workspace contains only copied template files, `inputs/`, empty `result/`, and `.runtime/`. It must not expose the repository, previous runs, parent paths, home data, or git history.

Candidate workspaces are durable evidence. `autoDelete` is always false and cleanup is manual only. Never delete one automatically, after success, during finalization, or after a batch.

## Single candidate

```sh
node scripts/prepare-run.mjs <cohort-dir> --run <run-id> --provider <provider> --model <model> --effort <effort> --harness <harness>
```

## Parallel candidates

Pass `--candidates candidates.json`. A `_batches/<batch-id>.json` manifest is created only when more than one candidate is prepared. Review every workspace and cleanup warning before launch.
