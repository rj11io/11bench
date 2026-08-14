# Analytics

## Outputs

Every scope writes `_analytics/data.json`, `analysis.md`, and `report.html`. Aggregate scopes also write a compact manifest. JSON is canonical, Markdown is inspectable, and HTML is portable.

## Run scope

Run analytics binds one root task and its native subagents. It reports provider, model, effort, harness, tokens, known cost, active time, wall time, throughput, latency, pricing coverage, anomalies, and source coverage when the harness exposes them. Unavailable metrics are null, not zero.

The analyzer and temporal pricing catalog are bundled with 11bench. No runtime import, path, signature, or installation from another analytics plugin is required.

## Parent scopes

- Cohort reads finalized child run analytics.
- Benchmark reads cohort analytics.
- Global reads benchmark analytics.

Parent scopes never rescan native tasks. They record child source digests and coverage counts. When a new run appears or a child analysis regenerates, refresh only the affected chain: run → cohort → benchmark → global. Atomic replacement preserves the previous parent view until a complete new view is ready.

## Taint and availability

Taint is provenance, not missing data. Reports retain tainted runs but expose their status so later comparison logic can exclude them. An analytics-unavailable run remains a finalized result whose usage fields are unknown.
