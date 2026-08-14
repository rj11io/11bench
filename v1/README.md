# 11bench v1

11bench is an append-only, cohort-based framework for progressively benchmarking AI models. A cohort freezes one experiment contract. New models become new runs inside that cohort. Changed prompts, inputs, templates, skills, or permissions become a new cohort.

## Core rules

- Never edit a frozen cohort or finalized run.
- Never reuse a task or candidate workspace.
- Run execution receives only its candidate workspace and declared permissions.
- Metadata and derived views use `_` prefixes. Cohorts, runs, and `result/` do not.
- Candidate workspaces persist. 11bench never deletes them automatically.
- Judging is intentionally not implemented in v1.

## Quick start

1. Draft a benchmark and its baseline cohort with `11bench-draft-benchmark`.
2. Review the baseline prompt, inputs, template, skills, and permissions.
3. Freeze it with `11bench-freeze-cohort`.
4. Prepare one or many candidates with `11bench-prepare-run`.
5. Launch each candidate in a fresh, enforced-sandbox task with `11bench-launch-run`.
6. Let the model execute the frozen prompt.
7. Finalize the run or batch with `11bench-finalize-run`.
8. Inspect `result/`, `_evidence/`, `_run/metadata.json`, and `_analytics/` together.

Try the draft prototype at [`benchmarks/proto-bench`](benchmarks/proto-bench). Start with the [documentation index](docs/README.md), [run protocol](docs/run-protocol.md), [candidate workspace policy](docs/candidate-workspaces.md), and [glossary](docs/glossary.md).

## Layout

```text
v1/
├── _analytics/                 # global derived view
├── _workspaces/                # persistent, git-ignored candidate workspaces
├── benchmarks/
│   └── <benchmark>/
│       ├── _benchmark/         # benchmark contract and candidate template
│       ├── _analytics/         # benchmark derived view
│       └── <cohort>/
│           ├── _cohort/        # frozen or draft cohort contract
│           ├── _batches/       # optional parallel-operation manifests
│           ├── _analytics/     # cohort derived view
│           ├── _judging/       # reserved, not implemented
│           └── <run>/
│               ├── result/     # model result
│               ├── _run/       # provenance and state
│               ├── _evidence/  # captured evidence
│               └── _analytics/ # exact-task metrics and reports
├── docs/
└── plugins/11bench/
```

The plugin is self-contained. Its run analytics and pricing catalog have no runtime dependency on another analytics plugin.
