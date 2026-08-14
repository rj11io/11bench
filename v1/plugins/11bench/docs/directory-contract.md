# Directory contract

## Sorting convention

Operator-owned control data and derived views start with `_`. Experimental units and model outputs do not. This keeps normal directory sorting readable:

```text
_cohort/
_analytics/
_batches/
codex-gpt5.6-high/
claude-opus-high/
```

## Benchmark

```text
<benchmark>/
├── _benchmark/
│   ├── config.json
│   └── template/
├── _analytics/{data.json,analysis.md,report.html,manifest.json}
└── <cohort>/
```

## Cohort

```text
<cohort>/
├── _cohort/
│   ├── config.json
│   ├── prompt.md
│   └── inputs/
├── _batches/                   # absent unless parallel preparation occurs
├── _analytics/
├── _judging/                   # reserved only
└── <run>/
```

## Run

```text
<run>/
├── result/
├── _run/{metadata.json,launch.json}
├── _evidence/manifest.json
└── _analytics/{data.json,analysis.md,report.html,raw-thread-data.json}
```

Normal ids use lowercase letters, digits, dots, and hyphens. They cannot start with `_`. Do not store candidates inside a benchmark tree.

Persistent candidate workspaces live in `v1/_workspaces` by default. They are outside every benchmark tree, ignored by git, and never automatically deleted.
