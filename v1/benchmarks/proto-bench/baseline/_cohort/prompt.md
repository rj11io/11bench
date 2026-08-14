# Models dashboard

Build a polished, responsive dashboard that helps a small AI team compare recent model runs.

Use only `inputs/models.json`. Write the complete artifact under `result/`:

- `result/index.html`
- `result/styles.css`
- `result/app.js`

Requirements:

- Work offline by opening `index.html` directly. No build step or server.
- Show summary cards for run count, average quality, total tokens, and known cost.
- Show all runs in a readable table or card grid with model, provider, effort, task, quality, latency, tokens, cost, and status.
- Add working provider and status filters plus model/task text search.
- Make missing cost visibly unknown, never `$0`.
- Explain metric units and fictional-data status in the interface.
- Support desktop and narrow mobile widths.
- Use semantic HTML, visible keyboard focus, labelled controls, and sufficient contrast.
- Do not use network access, packages, frameworks, external assets, data fabrication, or files outside this workspace.

Make reasonable visual decisions without asking questions. Do not write outside `result/` except candidate-local scratch in `.runtime/`.
