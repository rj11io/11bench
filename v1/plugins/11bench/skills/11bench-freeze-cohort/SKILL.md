---
name: 11bench-freeze-cohort
description: Validate and cryptographically freeze an 11bench cohort before run preparation. Use after draft review to make prompt, inputs, template, skills, permissions, and source revision immutable.
---

# Freeze cohort

Freezing establishes the comparable experiment contract. It does not create a candidate workspace or launch a model.

## Workflow

1. Read `../../docs/cohort-lifecycle.md` and `../../docs/permissions-and-isolation.md`.
2. Verify the cohort is a reviewed draft and requires enforced isolation.
3. Run:

```sh
node scripts/freeze-cohort.mjs <cohort-dir>
```

4. Review recorded hashes and source revision.

After freezing, any source change requires a new draft cohort. Never unfreeze, edit hashes, or rewrite prior runs.
