---
name: 11bench-finalize-run
description: Finalize one completed 11bench candidate or a parallel batch by sealing results, binding the exact task, generating analytics, refreshing aggregates, and retaining source workspaces. Use after model execution finishes.
---

# Finalize run

## Workflow

1. Read `../../docs/run-protocol.md` and `../../docs/candidate-workspaces.md`.
2. Confirm `result/` is complete and record the true isolation status.
3. Finalize one run:

```sh
node scripts/finalize-run.mjs <run-dir> --isolation enforced [--evidence screenshot.png]
```

4. Or finalize independent candidates in bulk:

```sh
node scripts/finalize-run.mjs --batch <cohort-dir>/_batches/<batch-id>.json --isolation enforced
```

The finalizer finds a unique Codex task from candidate workspace path, preparation time, model, and effort. Other harnesses require a recorded or explicit selector. Multiple matches stop for `--thread`; no match stops unless `--allow-missing-analytics` is explicit. Failures in a batch are isolated and recorded.

## Cleanup alert

Finalization copies and hashes results but never deletes the candidate workspace. The workspace remains the operator's durable debugging and provenance artifact. Inspect the finalized result and analytics first. Any later cleanup is deliberate and manual outside 11bench.
