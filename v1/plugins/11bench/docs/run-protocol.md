# Run protocol

## State sequence

```text
draft cohort → freeze cohort → prepare candidate → launch task → execute prompt → finalize run
```

Each verb has one responsibility:

| Phase | Changes | Does not do |
| --- | --- | --- |
| Draft | Editable prompt, inputs, template, skills, permissions | Hash, launch, or run |
| Freeze | Validate and hash the cohort contract | Create a candidate workspace |
| Prepare | Create run metadata and unique workspace | Submit a prompt or contact a model |
| Launch | Create or record a fresh task and submit the frozen prompt | Copy final results or analyze usage |
| Execute | Model works inside the candidate scope | Modify cohort or prior runs |
| Finalize | Seal result and evidence, bind task, analyze, refresh aggregates | Delete the candidate workspace |

## Non-taint protocol

1. Use a reviewed frozen cohort whose hashes still match.
2. Prepare a never-before-used run id and workspace.
3. Confirm provider/model pricing or explicitly record unpriced status.
4. Reverify frozen hashes at launch, then start a fresh task with the workspace as its only root.
5. Enforce the frozen permissions before submitting the prompt.
6. Submit the prompt byte-for-byte. Do not inject run ids, reminders, or coaching.
7. Do not intervene unless the cohort defines an interaction protocol.
8. Finalize with the true isolation status and supplied evidence.
9. Review result, provenance, and analytics together.
10. Retain the candidate workspace. Cleanup is never automatic.

## Failure handling

Do not overwrite, restart, or silently repair a run. Preserve failure metadata. If a retry is valid, prepare a new run id and new workspace. Mark scope or permission violations as taint reasons.
