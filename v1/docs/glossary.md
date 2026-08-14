# Glossary

## Analytics

Metrics and reports produced from a run's exact native task ledger. Parent analytics are derived aggregates of child analytics.

## Baseline

The editable cohort draft created with every new benchmark. It represents the first intended condition, not a privileged scoring standard.

## Batch

An optional JSON control manifest under `_batches` for preparing, tracking, and finalizing multiple independent candidates together. A batch is not an experiment level and never owns results.

## Benchmark

A project that defines one broad task and result contract, such as redesigning a CV or building a model dashboard.

## Candidate

One provider, model, effort, harness, and skill configuration being run against a frozen cohort.

## Candidate workspace

A unique persistent directory materialized under `v1/_workspaces` during preparation and used as the execution's only project root. It contains copied template files, inputs, result, and runtime scratch. It remains after finalization and is never automatically deleted.

## Clean run

A run whose frozen hashes match, workspace is unique, execution isolation was enforced, scope and permissions were respected, and output was finalized without a known contamination event.

## Cohort

One immutable experimental condition after freezing. It binds the prompt, inputs, template, skills, permissions, and source revision. New candidates may be appended as runs.

## Draft

An editable benchmark or cohort state. Draft material cannot prepare runs.

## Execute

The model performs the frozen prompt inside the launched candidate task. Execution is model work, not lifecycle bookkeeping.

## Finalize

Copy and hash candidate results, bind the exact task, record provenance and evidence, generate run analytics, and refresh affected parent analytics. Finalization retains the candidate workspace.

## Freeze

Validate a cohort and record hashes and source revision, converting the draft into an immutable run contract. Freeze does not create a workspace.

## Launch

Create or record a fresh task rooted at a prepared candidate workspace, apply permissions, and submit the frozen prompt. Launch starts execution but does not prepare files.

## Prepare

Verify a frozen cohort and pricing, reserve run metadata, and materialize one or more candidate workspaces. Prepare does not contact a model.

## Result

The model-produced artifact copied from candidate `result/` into a finalized run's unprefixed `result/` folder.

## Run

One candidate's append-only execution record inside a cohort. Prepared runs already have `_run` metadata; finalized runs additionally have result, evidence, and analytics.

## Tainted run

A completed run with known comparability or isolation problems. It remains visible and analyzable but must not silently enter clean comparisons.

## Task

The native AI harness conversation or thread used for one execution. A clean run uses a fresh task. Exact-task analytics include its native subagents.

## Judging

A future assessment phase that may consume sealed results and evidence. It is intentionally absent from v1 execution and analytics.
