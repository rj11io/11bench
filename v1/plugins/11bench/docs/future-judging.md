# Future judging

Judging is intentionally excluded from v1 implementation. No lifecycle skill, score schema, ranking, or judge prompt exists.

The reserved location is `<cohort>/_judging/<round-id>/`. A future judge should consume sealed `result/`, `_evidence`, `_run` provenance, and optionally run analytics. It must never mutate cohort sources, runs, evidence, or analytics. Different rubric or judge configurations should become distinct rounds with their own provenance.

This reservation allows adding judging after finalization without changing the benchmark → cohort → run hierarchy.
