# Cyber Dashboard Benchmark — interim review

- Cycle: cyber-dashboard-2026-07-17-v2 (publication sequence 2)
- Release: interim; campaign remains open
- Eligible cohort: 24 of 26 completed runs
- Judge: 1 AI judge (judge-codex-gpt5.6-luna-high)
- Evidence: desktop 1440×900 and mobile 375×812
- Review source digest: 4bc239b544b33bf3f45164b75af74c2acea3b4c3b7c39479723e7f1d760b85b2

## Scoreboard

| Rank | Run | Model | Effort | Total | Research | Product | Design | Cyber | Info | Frontend | Audit |
|---:|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | codex-gpt5.6-sol-xhigh | codex-gpt5.6-sol | xhigh | 9.50 | 10 | 10 | 10 | 10 | 9 | 8 | pass |
| 2 | codex-gpt5.5-xhigh | codex-gpt5.5 | xhigh | 9.35 | 10 | 10 | 9 | 10 | 9 | 8 | pass |
| 3 | codex-gpt5.4-xhigh | codex-gpt5.4 | xhigh | 9.00 | 9 | 9 | 9 | 9 | 9 | 9 | pass |
| 4 | codex-gpt5.6-sol-medium | codex-gpt5.6-sol | medium | 9.00 | 9 | 9 | 9 | 9 | 9 | 9 | pass |
| 5 | codex-gpt5.4-high | codex-gpt5.4 | high | 9.00 | 9 | 9 | 9 | 9 | 9 | 9 | pass |
| 6 | codex-gpt5.6-luna-xhigh | codex-gpt5.6-luna | xhigh | 8.85 | 9 | 9 | 9 | 9 | 9 | 8 | pass |
| 7 | codex-gpt5.4-light | codex-gpt5.4 | light | 8.85 | 9 | 9 | 9 | 9 | 9 | 8 | pass |
| 8 | codex-gpt5.6-sol-high | codex-gpt5.6-sol | high | 8.85 | 9 | 9 | 9 | 9 | 9 | 8 | pass |
| 9 | codex-gpt5.5-high | codex-gpt5.5 | high | 8.85 | 9 | 9 | 9 | 9 | 9 | 8 | pass |
| 10 | codex-gpt5.4mini-medium | codex-gpt5.4mini | medium | 8.85 | 9 | 9 | 9 | 9 | 9 | 8 | pass |
| 11 | codex-gpt5.4mini-light | codex-gpt5.4mini | light | 8.50 | 9 | 9 | 8 | 9 | 8 | 8 | pass |
| 12 | codex-gpt5.4-medium | codex-gpt5.4 | medium | 8.35 | 8 | 8 | 8 | 9 | 9 | 8 | pass |
| 13 | codex-gpt5.6-sol-light | codex-gpt5.6-sol | light | 8.35 | 8 | 8 | 8 | 9 | 9 | 8 | pass |
| 14 | codex-gpt5.4mini-high | codex-gpt5.4mini | high | 8.00 | 8 | 8 | 8 | 8 | 8 | 8 | pass |
| 15 | codex-gpt5.6-terra-xhigh | codex-gpt5.6-terra | xhigh | 7.85 | 8 | 8 | 8 | 8 | 8 | 7 | pass |
| 16 | codex-gpt5.5-medium | codex-gpt5.5 | medium | 7.85 | 8 | 8 | 8 | 8 | 8 | 7 | pass |
| 17 | claude-fable5-high | claude-fable5 | high | 7.70 | 8 | 8 | 7 | 8 | 8 | 7 | pass |
| 18 | codex-gpt5.5-light | codex-gpt5.5 | light | 7.35 | 7 | 7 | 7 | 8 | 8 | 7 | pass |
| 19 | codex-gpt5.6-luna-high | codex-gpt5.6-luna | high | 4.35 | 8 | 8 | 7 | 1 | 1 | 1 | pass |
| 20 | codex-gpt5.6-terra-medium | codex-gpt5.6-terra | medium | 2.35 | 4 | 4 | 3 | 1 | 1 | 1 | pass |
| 21 | codex-gpt5.6-terra-light | codex-gpt5.6-terra | light | 2.35 | 4 | 4 | 3 | 1 | 1 | 1 | pass |
| 22 | codex-gpt5.6-terra-high | codex-gpt5.6-terra | high | 2.35 | 4 | 4 | 3 | 1 | 1 | 1 | pass |
| 23 | codex-gpt5.6-luna-medium | codex-gpt5.6-luna | medium | 2.00 | 3 | 3 | 3 | 1 | 1 | 1 | pass |
| 24 | codex-gpt5.6-luna-light | codex-gpt5.6-luna | light | 2.00 | 3 | 3 | 3 | 1 | 1 | 1 | pass |

## Excluded runs

- claude-haiku4.5: excluded because the required rendering audit failed (rendering).
- codex-gpt5.4mini-xhigh: excluded because the required rendering audit failed (rendering).

## Gate and caveats

- PASS: Configuration, frozen cycle membership, release sequence, hashes, and IDs are valid.
- PASS: All 24 included runs are complete and have passing required audits; 2 completed runs remain excluded for rendering failures.
- PASS: Frozen rubric, anonymized evidence, exact judge prompt hashes, one complete AI judge, and deterministic aggregate agree.
- PASS: Desktop 1440x900 and mobile 375x812 evidence exists for every included run; runtime metadata is preserved.
- PASS: 48 usage-bearing transcript threads reconcile; 138,661,098 tokens are measured. Matched benchmark runs total $94.82 API-equivalent, the judge is $3.80, and synthetic operations without a verified model price remain explicitly unavailable.
- PASS: Interim release sequence, previous cycle link, canonical run route, report paths, and campaign-open status are present.
- Warning: A subset of synthetic review-operation threads has no verified provider model price; those costs remain null rather than being inferred.
- Warning: Aggregate contains one AI judge; no human judge or multi-judge dispersion is available.
- Warning: External deployment/publication is unavailable and is not attempted.

## Accounting

- Benchmark-operation scope: 47 threads; 121,201,649 tokens; matched run costs $94.82 plus $0.91 priced operations.
- Judge scope: 1 thread; 17,459,449 tokens; $3.80.
- Benchmark + judge total: 48 threads; 138,661,098 tokens; reconciliation passed.
- Unavailable values remain null only for synthetic operations without a verified price.

## Provenance

Canonical reviewed data: ../review/data.json
Judge artifact: ../judging/judges/judge-codex-gpt5.6-luna-high.json
Aggregate: ../judging/aggregate.json
Evidence: ../judging/evidence.json
