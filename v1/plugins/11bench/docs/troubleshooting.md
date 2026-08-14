# Troubleshooting

## Frozen hash mismatch

Cause: prompt, inputs, template, or pinned skill changed after freezing. Fix: restore the frozen bytes or clone a new draft cohort. Never update hashes in place.

## Model is unpriced

Cause: no catalog pattern matches. Fix: use `11bench-update-pricing` with official sources, or explicitly prepare as unpriced and accept unknown cost.

## No task matched

Cause: execution used a different workspace, native metadata is unavailable, or the task predates preparation. Fix: confirm the workspace path, supply `--thread`, or finalize with unavailable analytics only when the limitation is accepted.

## Multiple tasks matched

Cause: the same candidate workspace was reused. Fix: choose the intended root with `--thread`, mark contamination if reuse affected execution, and use a new workspace for future retries.

## Run is tainted

Cause: isolation was not enforced or another violation was recorded. Fix: preserve the run, exclude it from clean comparisons, and prepare a new run under enforced scope.

## Candidate workspace still exists

Expected behavior. 11bench never deletes candidate workspaces. Verify result and analytics before considering deliberate manual cleanup. Never remove a parent workspace root.

## Parent analytics is stale

Cause: a child analysis was added or regenerated without cascade. Fix: run the cohort analyzer, then benchmark analyzer, then global analyzer for the affected chain.
