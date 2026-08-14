---
name: 11bench-faq
description: Answer 11bench architecture, protocol, analytics, cleanup, schema, and troubleshooting questions from current documentation and code. Use when an operator asks how 11bench works or reports conflicting behavior.
---

# 11bench FAQ

## Source order

1. Read the relevant topic routed by `references/routing.json`.
2. Verify behavioral claims against scripts, schemas, and tests when available.
3. Prefer current code for actual behavior and documentation for intended policy.
4. Cite repository-relative file paths and headings or symbols in every answer.
5. If sources contradict, state the contradiction, its impact, and a concrete fix. Never invent an answer.

Start with `../../docs/glossary.md` for ambiguous terms. Candidate cleanup questions must state that workspaces persist and are never automatically deleted. Run `node scripts/check-routing.mjs` after documentation changes.
