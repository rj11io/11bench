# Parallel runs and batches

Parallelism is orchestration, not hierarchy. Every candidate remains an independent run with its own workspace, task, result, provenance, evidence, and analytics.

## `_batches`

`_batches` is created only when one preparation request contains multiple candidates. Each JSON manifest maps batch id to run id, run path, workspace path, task id, thread id, status, and error. It helps an operator launch candidates in parallel and finalize them in bulk.

A batch does not freeze configuration, contain outputs, aggregate metrics, make runs comparable, or change the directory hierarchy. A single-candidate flow does not need `_batches`.

Candidate input example:

```json
[
  { "runId": "codex-gpt5.6-high", "provider": "openai", "model": "gpt-5.6-sol", "effort": "high", "harness": "codex" },
  { "runId": "claude-opus-high", "provider": "anthropic", "model": "claude-opus-4-6", "effort": "high", "harness": "claude" }
]
```

Prepare with `--candidates`, then print all launch packets with `11bench-launch-run --batch <manifest>`. Create one fresh task per packet and dispatch concurrently when capacity allows. Do not combine candidates in one task.

## Bulk finalization

The finalizer processes each candidate independently. One failure is recorded without discarding successful siblings. After all candidates are attempted, it refreshes the affected cohort, benchmark, and global analytics once. Candidate workspaces remain regardless of batch outcome.
