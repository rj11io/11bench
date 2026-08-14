# Candidate workspaces

> Cleanup warning: candidate workspaces remain after preparation, execution, and finalization. 11bench never deletes them automatically. Inspect and remove a workspace manually only after its finalized result and analytics are verified.

## Purpose

The candidate workspace is both an isolation boundary and durable provenance artifact. It prevents a model from learning from benchmark documentation, previous candidates, prior results, git history, or unrelated local files. It also preserves the exact working state for debugging.

## Creation

`11bench-prepare-run` creates a unique directory under persistent `v1/_workspaces` or an explicit `--workspace-root`. The store is git-ignored but not temporary or automatically purged by 11bench. The random suffix prevents collision and makes the canonical path a reliable manual-task discovery key.

```text
11bench-<benchmark>-<cohort>-<run-id>-<random>/
├── <copied template files>
├── inputs/       # frozen inputs copied read-only in intent
├── result/       # model writes deliverables here
└── .runtime/     # candidate-local scratch only
```

The workspace must not contain `_benchmark`, `_cohort`, `_run`, `_analytics`, `_batches`, `_judging`, previous results, repository docs, `.git`, or symlinks. Template and input copies are verified against frozen hashes before preparation.

## Prepared run versus candidate workspace

A prepared run is the reserved record inside the cohort: `<run>/_run/metadata.json` and `launch.json`. A candidate workspace is the separate execution directory referenced by that metadata. The run record persists in the benchmark. The workspace persists at its candidate-store path. Neither implies that a task has launched.

## Execution boundary

The workspace must be the task's only visible project root. Enforced controls must deny parent and sibling traversal, home data, repository access, prior runs, git history, undeclared skills, apps, connectors, and network. Prompt text is not a security boundary. If the harness cannot enforce the declared policy, record `partial`, `advisory`, or `unsupported`; the run becomes tainted.

Subagents, shell commands, browsers, and external tools inherit the same boundary. A candidate cannot request or receive expanded access during execution unless the frozen cohort already permits it.

## Finalization and persistence

Finalization copies `workspace/result/` into the run's `result/`, calculates a digest, and marks `cleanupEligible: true`. It does not move or delete the workspace. Metadata permanently records:

```json
{
  "autoDelete": false,
  "cleanupPolicy": "manual-only",
  "cleanupEligible": true,
  "cleanupWarning": "Candidate workspace retained. 11bench never deletes candidate workspaces automatically. Inspect and remove it manually only after the finalized run is verified."
}
```

`cleanupEligible` means the operator may evaluate cleanup. It is not a deletion request. It never triggers a timer, hook, finalizer behavior, batch behavior, or background cleanup.

## Manual cleanup checklist

11bench deliberately provides no automatic cleanup command. If an operator later cleans up outside 11bench:

1. Verify run status, result digest, and expected files.
2. Open the finalized result and evidence.
3. Verify `_analytics/data.json` and report availability.
4. Confirm the workspace path belongs to exactly that run.
5. Retain the path and cleanup policy in `_run/metadata.json`.
6. Remove only the explicit candidate directory, never a parent or workspace root.

Failed, tainted, unfinalized, ambiguous-task, and analytics-unavailable workspaces are especially valuable for diagnosis and should normally remain.
