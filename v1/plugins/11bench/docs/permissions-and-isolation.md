# Permissions and isolation

## Default policy

- Required isolation: enforced.
- Network: denied.
- Package installation: denied.
- Git history: denied.
- Skills: declared only.
- Connectors and external apps: empty allowlists.

## Enforcement

The launch environment, not the prompt, must enforce scope. The candidate may read frozen copies in its workspace and write candidate-local `result/` and `.runtime/`. It may not inspect or mutate parents, siblings, the repository, prior runs, home data, unrelated temporary directories, native task ledgers, or undeclared external systems.

If a benchmark genuinely requires a capability, declare it before freezing and apply the smallest allowlist. Record the actual enforcement status at launch or finalization. `partial`, `advisory`, `unsupported`, and unverified `pending` runs are tainted.

Analytics is a separate post-execution phase. Exact-task analysis may read the bound native ledger. Aggregate analysis may read only child analytics. This access is never granted to the model execution.
