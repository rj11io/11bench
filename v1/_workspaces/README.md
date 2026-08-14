# Candidate workspace store

Prepared candidates are created here by default, outside benchmark and cohort records. Each candidate is ignored by git and referenced by its run metadata.

11bench never deletes these workspaces automatically. Do not add cleanup hooks, timers, finalizer deletion, batch deletion, or broad recursive cleanup commands. Inspect the finalized result and analytics before any deliberate, explicit manual cleanup.
