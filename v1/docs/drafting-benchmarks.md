# Drafting benchmarks

## Required decisions

Before scaffolding, write down:

- Task goal and intended audience.
- Result contract, including required filenames and offline behavior.
- Inputs and whether they are fictional, synthetic, or licensed.
- Template contents and dependency policy.
- Allowed skills, network, connectors, apps, package installation, and subagents.
- Evidence requirements.
- What change requires a new cohort.

Use `11bench-draft-benchmark`. It creates `_benchmark/config.json`, `_benchmark/template/`, and a `baseline` draft. The baseline remains editable and cannot produce runs.

## Benchmark boundaries

Create a new benchmark when the task family or result contract changes. Create a new cohort when the experimental condition changes but results remain the same kind of artifact. Add a run when only the candidate model configuration changes.
