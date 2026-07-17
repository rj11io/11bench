# crypto-dashboard-bench

A clean end-to-end product benchmark. Every coding agent independently
researches crypto users, market structure, portfolio/on-chain workflows, and
trust requirements; chooses a defensible product wedge; creates
production- and GTM-ready documentation; and builds a high-fidelity frontend
demo.

Research, product thinking, design thinking, domain correctness, and execution
are all first-class judged outputs.

## Required outputs per run

Each run owns `app/<run-id>/`:

| Artifact | Purpose |
| --- | --- |
| `research.md` | Users, workflows, competitors, market/data, trust, compliance, and design research |
| `prd.md` | Product thesis, requirements, data model, metrics, GTM, and risks |
| `design.md` | IA, workflows, visualization system, responsive behavior, and accessibility |
| `layout.tsx` and `page.tsx` | The frontend product demo |
| Supporting files | Route-local components, data, state, CSS modules, and assets |

The final demo must be evaluable without wallets, credentials, paid APIs, or a
backend. Realistic seeded data and `localStorage` are allowed.

## Lifecycle

Cycle 1 is published as an interim result: 26 ledger runs were audited, 16
eligible runs were judged anonymously, and 10 runs were retained as excluded
after route/build failures. The campaign remains open for later runs or a
final cycle.

Canonical outputs are under `benchmark/cycles/cycle-1/`, including the reviewed
data, report, anonymized evidence, judge artifact, aggregate, and current
pointer. Transcript token counts are reconciled under `benchmark/costs/`; USD
pricing is explicitly unavailable for this historical run.

## Local development

```bash
npm install
npm run dev
```

Checks:

```bash
npm run lint
npm run typecheck
npm run build
```
