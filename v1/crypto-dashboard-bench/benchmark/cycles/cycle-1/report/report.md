# crypto-dashboard-bench — cycle-1

**Status:** published interim · **Cohort:** 16 eligible runs · **AI judges:** 1

This report compares the frozen cohort under rubric v1. It is not an absolute model grade. Ten additional ledger runs were excluded after route/build audit failures.

## Scoreboard

| Rank | Run | Total | Research | PRD/GTM | Design | Crypto trust | Visual | Frontend |
|---:|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | codex-gpt5.6-sol-medium | 8.55 | 9 | 9 | 9 | 9 | 9 | 6 |
| 2 | codex-gpt5.5-xhigh | 8.40 | 8 | 9 | 9 | 9 | 9 | 6 |
| 3 | codex-gpt5.6-sol-high | 8.40 | 9 | 9 | 9 | 9 | 9 | 5 |
| 4 | codex-gpt5.6-sol-xhigh | 8.35 | 9 | 9 | 9 | 9 | 8 | 6 |
| 5 | codex-gpt5.5-high | 8.35 | 8 | 9 | 9 | 9 | 8 | 7 |
| 6 | codex-gpt5.5-medium | 8.05 | 8 | 9 | 9 | 9 | 8 | 5 |
| 7 | codex-gpt5.6-luna-xhigh | 7.90 | 8 | 8 | 8 | 9 | 9 | 5 |
| 8 | codex-gpt5.4mini-light | 7.85 | 9 | 8 | 8 | 9 | 8 | 5 |
| 9 | codex-gpt5.4-light | 7.70 | 7 | 8 | 8 | 8 | 8 | 7 |
| 10 | codex-gpt5.4-medium | 7.70 | 8 | 8 | 8 | 9 | 8 | 5 |
| 11 | codex-gpt5.6-terra-xhigh | 7.70 | 8 | 8 | 8 | 9 | 8 | 5 |
| 12 | claude-fable5-high | 7.55 | 8 | 8 | 7 | 8 | 8 | 6 |
| 13 | codex-gpt5.5-light | 7.25 | 7 | 8 | 7 | 8 | 8 | 5 |
| 14 | codex-gpt5.4-high | 7.10 | 8 | 8 | 6 | 8 | 8 | 4 |
| 15 | claude-haiku4.5 | 6.55 | 8 | 8 | 6 | 7 | 6 | 4 |
| 16 | codex-gpt5.6-luna-high | 4.50 | 7 | 7 | 3 | 6 | 2 | 2 |

## Method and caveats

- Scores are one identity-blinded AI judge submission, `judge-codex-gpt5.6-luna-high`, aggregated with the frozen weighted rubric.
- Evidence included identical 1440×900 desktop and 375×812 mobile screenshots plus `research.md`, `prd.md`, and `design.md`.
- A shared React hydration warning was observed during capture; per-route attribution was not isolated.
- Interaction probes were unavailable.
- Transcript accounting recovered 48 usage-bearing threads and 153,076,710 tokens. Matched runs have verified API-equivalent costs; the benchmark run subtotal is $102.20, judge cost is $3.23, and a small synthetic-operation subset remains unpriced.
- External deployment was not performed.

## Published artifacts

- Reviewed data: `benchmark/cycles/cycle-1/review/data.json`
- Evidence: `benchmark/cycles/cycle-1/judging/evidence.json`
- Aggregate: `benchmark/cycles/cycle-1/judging/aggregate.json`
