# Manual runs

The operator does not need to know the native task id at launch.

1. Prepare the run.
2. Print its launch packet.
3. Create a fresh task with the printed candidate path as the only root.
4. Configure enforced permissions.
5. Submit the printed prompt exactly.
6. After completion, run the finalizer.

The finalizer scans Codex native task metadata after `preparedAt` for an exact canonical workspace-path match, then verifies recorded model and effort when available. One root match binds automatically and includes native descendants. Multiple roots stop and list candidate ids; rerun with `--thread`. Other harnesses currently require a recorded or explicit task selector. No match stops unless the operator accepts an analytics-unavailable record with `--allow-missing-analytics`.

Do not add an identifier to the prompt. Prompt mutation would change the experimental condition and is unnecessary because the unique workspace path is the identifier.
