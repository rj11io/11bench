---
name: 11bench-launch-run
description: Launch or print a launch packet for prepared 11bench candidates under enforced scope and permission boundaries. Use to start fresh manual or automated benchmark tasks without contaminating prior runs.
---

# Launch run

Read `../../docs/run-protocol.md`, `../../docs/manual-runs.md`, and `../../docs/permissions-and-isolation.md`.

## Required boundary

The candidate workspace is the task's only project root. The task must not read, list, search, write, or infer from parent, sibling, repository, home, previous-run, connector, network, app, or skill resources unless the frozen cohort explicitly allows them. Subagents inherit the boundary. Prompt instructions alone are insufficient. Use an enforced sandbox or record the run as tainted.

## Manual launch

```sh
node scripts/launch-run.mjs <run-dir>
```

Create a fresh task at the printed workspace. Apply permissions first. Submit the frozen prompt byte-for-byte with no injected identifier. The candidate path is the discovery key, so the operator does not need to know the task id.

Record known launch state with `--task`, `--thread`, `--isolation`, and `--mark-running`. Never reuse a task, workspace, or result folder.

## Parallel launch

```sh
node scripts/launch-run.mjs --batch <cohort-dir>/_batches/<batch-id>.json
```

Create one fresh task per packet and dispatch them concurrently when capacity allows. Never combine candidates in one task. The same frozen prompt and candidate-specific workspace rules apply. Single-run launch remains valid without a batch.
