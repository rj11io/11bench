# Design specification — Signalbank

## Product frame

Signalbank is a calm, high-density operating desk rather than a retail trading screen. The interface speaks in **cash readiness**, policy and evidence. Every key data point carries a frozen-demo or source/time cue; green never means guaranteed safe.

## Information architecture

Top rail: workspace identity, snapshot state, notification/command affordances. Left navigation: Readiness (current), Holdings, Policies, Routes, Decisions. The demo keeps the core journey on one route and lets the navigation communicate the production information model.

The Readiness page is ordered for a finance lead’s decision:

1. **Posture header:** status, total operating cash, scenario selector, and source/snapshot clarity.
2. **Actionable headline:** policy posture and the one or two conditions needing review.
3. **Exposure map:** issuer/chain concentration and calculated policy headroom.
4. **Evidence:** peg trace with $1 reference, source/method note, and alert feed.
5. **Scenario workbench:** allocation control, constrained recommendation, assumptions, and a copyable decision record.

## Critical interactions and states

* Select Normal, Peg drift, or Chain congestion. Content, posture color, score, recommendation, and assumed exit cost update. All state remains labelled simulated.
* Move the allocation range slider. The recommendation compares desired USDC allocation with the 55% policy target and updates the residual across USDT/DAI.
* Acknowledge a risk item. It persists in `localStorage` only and changes the alert state. It neither resolves the risk nor makes an approval.
* Copy decision record uses browser clipboard when available and falls back to a visible success state.

Normal state is informational. Peg drift uses amber and calls out quote deviation. Chain congestion uses coral/red and increases route cost / lowers available exit. Empty state (specified for production) invites a read-only import and explains no signing is required. Loading uses skeleton cards and source-level loading labels. Error/stale state retains the last good value, stamps it, and removes it from automated posture calculations after the configured freshness ceiling.

## Visual language

Dark ink/navy ground (#0a1020) with warm off-white surfaces (#f5f2eb) gives finance-tool seriousness without terminal nostalgia. An acid-lime signal (#b8f500) denotes available policy headroom, amber denotes review, and coral denotes material constraint. Typography: a compact grotesk for UI; a high-contrast serif-style heading treatment via system Georgia for decisive statements. Figures use tabular numerals. Cards have thin blue-black borders, 12px radii, modest shadows, and intentional whitespace.

Dense desktop grid: 248px sidebar; a 2-column content stage; main evidence/workbench left and alerts right. Mobile hides the sidebar, stacks cards, preserves 44px interactive targets, and makes the scenario selector horizontally scrollable. No content depends on hover.

## Visualization and semantics

The peg trace uses $0.9980–$1.0020 scale, 24h window, dots on observations, a $1 baseline, and `USD / composite quote` unit. Concentration uses a segmented bar with a 55% policy marker, labelled values and headroom. “Policy posture 72/100” is explicitly a deterministic rules score, with a disclosure that it is not a loss probability. Risk colors are duplicated by icon/text, and all scenario changes are announced via an `aria-live` region.

Implementation uses route-local React, CSS module, and inline SVG; no remote assets or data. It demonstrates the differentiator by tying a risk condition to an explicit, policy-bound allocation decision and its evidence record.
