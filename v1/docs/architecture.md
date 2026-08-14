# Architecture

## Design goal

11bench favors loose, append-only experiment records over a central orchestration platform. The filesystem is the database. JSON contracts make state machine transitions inspectable. Markdown and HTML reports keep analytics portable.

## Hierarchy

```text
benchmark → cohort → run
                 ↘ optional batch manifest
run analytics → cohort analytics → benchmark analytics → global analytics
```

A benchmark defines the product or task family. A cohort freezes one comparable experimental condition. A run applies one candidate model configuration to that condition. Therefore the cohort belongs above the model run:

```text
cv-redesign-bench/baseline/codex-gpt5.6-high
cv-redesign-bench/baseline/claude-opus-high
cv-redesign-bench/accessibility-skill/codex-gpt5.6-high
```

This placement allows adding models without cloning cohort configuration and allows skill variants without mixing incomparable runs.

## Source and derived data

- Source: `_benchmark`, `_cohort`, `_run`, `result`, `_evidence`, and retained candidate workspace.
- Derived: every `_analytics` folder above run scope.
- Sealed: frozen cohort sources and finalized run sources.
- Regenerable: cohort, benchmark, and global analytics.

## Scope boundaries

Execution and analysis are separate trust domains. Candidate execution sees only candidate inputs. Finalization may read its run metadata, candidate output, explicitly supplied evidence, and native task ledger needed for exact-task analytics. Aggregate analytics read child analytics only.
