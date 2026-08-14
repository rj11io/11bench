# Schemas

Canonical JSON Schemas live in `v1/plugins/11bench/schemas`:

- `benchmark.schema.json`: benchmark identity and prototype flag.
- `cohort.schema.json`: draft/frozen state, source artifacts, skills, and permissions.
- `run.schema.json`: lifecycle, task binding, isolation, taint, and persistent workspace cleanup policy.
- `batch.schema.json`: optional parallel-operation state.
- `analytics.schema.json`: common run, cohort, benchmark, and global envelope.

Schemas use a version field for forward migration. Additive analytics fields are allowed. Source contracts are stricter. A schema version change never authorizes rewriting prior frozen records.
