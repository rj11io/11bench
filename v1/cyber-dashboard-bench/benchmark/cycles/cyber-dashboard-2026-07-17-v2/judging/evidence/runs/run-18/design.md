# Design spec: Patchbay demo

**Author:** Claude (run `claude-fable5-high`). **Date:** 2026-07-17.
**Implements:** the PRD's core loop (Triage → Explain → Assign → Track → Prove) at route `/claude-fable5-high`.

---

## 1. Information architecture and navigation

Three destinations plus one overlay, each answering exactly one question (research §5: a screen that doesn't answer a recurring question is wall art):

| Surface | Question it answers | Content |
|---|---|---|
| **Fix Queue** (home) | "What do we fix next?" | Attention strip (due/breached/new-evidence counts), evidence-ranked Fix Pack list, filters |
| **Fix Pack detail** (side panel over the queue) | "Why this, and who fixes it?" | Score receipts, findings, assets, remediation steps, actions, activity trail |
| **Reports** | "Are we keeping our promises, and is risk going down?" | Exposure burndown, SLA compliance by team, aging, plain-language exec summary |
| **Assets** | "What are we protecting, and why does it weigh in scoring?" | Asset inventory with exposure/criticality — the context the score factors point at |

Navigation: fixed left sidebar at desktop (product name, three nav items, SLA policy summary, demo controls); at mobile the sidebar becomes a top bar with the same three destinations. The detail panel is a right-side sheet on desktop and a full-screen sheet on mobile.

A persistent **"Demo data" badge** sits in the header, and the footer of every view states that all data is fictional and seeded — nothing implies live integrations (hard rule 6).

**Demo scenario switcher** (clearly marked as a demo control, in the sidebar): three seeded states —
- **First run** (empty): no connector yet → empty state with sample-data call to action.
- **Steady state** (normal): 18 Fix Packs consolidating ~2,700 findings, mixed statuses, healthy SLA.
- **KEV morning** (high attention): overnight a CVE entered CISA's confirmed-exploited list; affected packs re-ranked with visible "evidence changed" markers, breach flags, and an attention banner.

This gives evaluators the empty / normal / high-attention states as first-class, reachable UI, not screenshots.

## 2. Critical user journeys and states

**Journey A — Monday triage (core).** Open queue → attention strip says "2 breached, 3 due this week, 1 evidence change" → sort is already by priority → open top Fix Pack → read receipts (why score 92: KEV + EPSS 94% + internet-facing + crown-jewel) → assign to Platform team → status to *in progress* → next. Every step ≤1 click from the queue.

**Journey B — Defend a decision.** Engineer pushes back ("why now?") → security lead opens the evidence panel → factor table shows each signal, its source and date, its weight and contribution, summing to the score → the same panel is the answer. No number appears anywhere without this trail.

**Journey C — Accept a risk properly.** Low-value internal service, compensating control exists → "Accept risk" → dialog *requires* a reason and an expiry date → pack leaves the active queue, remains under the "Accepted" filter, audit trail records actor/reason/expiry.

**Journey D — Prove it.** Reports → burndown shows critical exposure falling; SLA compliance by team; exec summary in sentences ("This week the team closed 6 fixes; 2 criticals are past deadline, both owned and in progress"). This is the artifact forwarded to a CEO or auditor.

**States per surface:** every list and chart has empty ("all clear" is a designed, celebratory state — an empty queue is the product working), loading (skeleton rows; brief simulated load on scenario switch so the pattern is visible), and high-attention variants. Errors: destructive/irreversible actions don't exist in the demo; validation errors appear inline in the accept-risk dialog (reason and expiry required).

## 3. Dashboard hierarchy and prioritization logic

Hierarchy mirrors decision priority (research §5), top to bottom:
1. **Attention strip** — three or four numbers that demand action today (breached, due soon, new evidence, unassigned). These are buttons that filter the queue, not passive stats.
2. **The queue** — the product. Ranked by score; SLA-breached items float to the top of their severity band. Each row: severity band (color + word), title + one-line action, evidence chips, findings→packs compression ("12 findings"), owner avatar, SLA countdown, status.
3. **Everything else** lives one level down (detail panel, reports) — progressive disclosure, "right thing first, rest one click away."

Ranking logic shown in-product (PRD §5): weighted factors — KEV 35, EPSS 25, internet exposure 15, asset criticality 15, blast radius 10 → 0–100. Bands: Critical ≥80, High 60–79, Medium 40–59, Low <40.

## 4. Visualization choices and why they fit

| Data | Choice | Why |
|---|---|---|
| Score explanation | Horizontal contribution bars with labels + numbers | Part-to-whole where parts must be read precisely; bars beat a donut for label space and comparison |
| Exposure over time | Line/area burndown, direct-labeled | Time series; the question is direction, a line answers direction |
| SLA compliance by team | Sorted horizontal bars with % labels | Ranked comparison across few categories; sorting is the message |
| Fix aging | Stacked horizontal bars by age bucket | Distribution where the tail (old items) is the story |
| SLA per item | Countdown chip (text), not a gauge | A deadline is a number and a state, not an angle |
| 7-day trend on stat tiles | Sparkline with delta text | Ambient context, no axis needed |

Deliberately excluded (research §7): gauges, world maps, severity pie charts — none of them changes a decision the queue hasn't already presented better.

## 5. Design system direction

**Mood:** calm control room, not hacker theater. The product's promise is trust and clarity, so the visual language is quiet, precise, and evidence-dense — closer to Linear/Datadog-dark than to green-on-black.

- **Surface palette (dark, scoped to the route):** graphite backgrounds in 3 elevation steps (`#0b0e14` page, `#11151d` panel, `#161b26` raised), 1px hairline borders (`rgba` white ~8%), no drop-shadow soup. The route wrapper redefines the shadcn CSS variables locally, so the demo renders identically whether the host site is in light or dark mode.
- **Text:** near-white primary, ~65% secondary, ~45% tertiary. Type: Inter (UI) with Geist Mono for identifiers, scores, and countdowns — monospace signals "machine fact" and aligns digits.
- **Accent:** single restrained cyan (`#4cc2ff` family) for interaction and selection only — never for severity, so meaning stays unambiguous.
- **Severity semantics (always color + word, never color alone — research §8):** Critical `#ff5d5d`, High `#ff9f43`, Medium `#e8c547`, Low `#8b95a7`. Ordered data in charts uses one hue with lightness steps.
- **Status is shape+text:** neutral outline (open), accent (in progress), violet (fix submitted), green `#3ecf8e` (verified), gray strikethrough context (accepted).
- **Density:** compact by default (13px table body, 40px rows) because the user is an operator; generous spacing is reserved for reports, which are read, not worked.
- **Component behavior:** rows are real buttons (full keyboard path: focus ring, Enter opens); chips with tooltips explaining each evidence source; optimistic UI on status changes with toast confirmation (sonner); detail panel traps focus and closes on Esc.

## 6. Responsive behavior and accessibility

- **1440×900 (primary):** sidebar + queue + on-demand detail panel; reports as 2-column grid. No horizontal scroll anywhere.
- **375×812:** sidebar → top bar; queue table → stacked cards keeping the same decision data (severity word, score, countdown, owner, chips); detail sheet full-screen; charts resize fluidly (recharts responsive containers); tap targets ≥44px. Density is sacrificed before legibility (research §8).
- **Accessibility:** every color pairing meets WCAG AA contrast on its surface; severity/status always carry text; icons are decorative (`aria-hidden`) with text doing the work; all interactive elements are native buttons/inputs with visible focus; the detail sheet uses proper dialog semantics; charts get text summaries adjacent, not only pixels; countdown chips include full due-date in accessible labels/tooltips.

## 7. How the implementation demonstrates the differentiator

The differentiator is **glass-box prioritization** ("every priority shows its receipts"), and the build makes it unavoidable:

1. Every score in the UI opens into the same **Receipts panel**: factor table with source, date, weight, contribution — visibly summing to the score. No number in the product lacks this trail.
2. The **KEV morning scenario** shows evidence *changing* the ranking: re-ranked packs carry an "evidence changed" marker whose explanation names the new fact ("CVE-2026-21847 added to CISA KEV on Jul 16"), demonstrating that ranks move because facts moved — not because a model twitched.
3. The **compression headline** ("2,747 raw findings became 18 fixes") is computed live from the seeded data, demonstrating dedup/grouping — the second half of the promise.
4. **Accountability surfaces** — owner, countdown, audit trail on every pack, mandatory reason+expiry on risk acceptance — implement "defensible decisions" end to end, and all of it persists in `localStorage` so an evaluator's triage survives reload.
