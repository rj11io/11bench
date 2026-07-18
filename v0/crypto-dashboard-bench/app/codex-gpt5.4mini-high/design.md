# Design Spec: Reserve Desk

## Information Architecture

Primary navigation:

- Overview
- Wallets
- Protocols
- Risk
- Evidence

Secondary controls:

- scenario selector;
- balance basis selector;
- time range selector;
- search;
- board-pack generation;
- review-state reset.

The dashboard should feel like a control room, not a consumer wallet.

## Critical Journeys

### 1. Daily Treasury Review

1. User opens the dashboard.
2. Sees treasury value, liquid coverage, risk score, and open items.
3. Checks whether the selected basis is reported or calculated.
4. Skims the decision queue.
5. Switches into wallets or protocols if something looks off.

### 2. Balance Reconciliation

1. User searches a wallet or filters by chain.
2. Sees reported and calculated balances side by side.
3. Notices a mismatch badge or freshness warning.
4. Marks the issue reviewed or leaves it open for follow-up.

### 3. Board-Pack Preparation

1. User opens the evidence view.
2. Reviews sources, timestamps, and open items.
3. Generates a snapshot for a board pack.
4. Confirms that the snapshot reflects the chosen basis and time range.

## Hierarchy and Drill-Down

- Hero metrics should sit above everything else.
- The selected basis should always be visible in the primary card.
- Wallets should be the first drill-down after overview because they answer “what do we hold?”
- Protocols should come next because they answer “what is locked, yielding, or at risk?”
- Risk and evidence should remain visible as separate review layers, not buried in a settings menu.

Drill-down behavior:

- Click or tap an alert to mark it reviewed locally.
- Search should filter all non-summary content.
- Sections should collapse to an empty state if the filter removes everything.

## Visualization Choices

### Treasury Trend

- Use a line chart for reported vs calculated treasury value.
- Keep the time range explicit.
- Use a tooltip with basis, value, and timestamp.

### Protocol Mix

- Use a bar chart for protocol sleeve composition and concentration.
- Label APY, TVL, and risk tier directly in the row or card.

### Coverage and Confidence

- Use progress or meter UI for liquid coverage.
- Show freshness and provenance as badges, not hidden metadata.

### Unit Conventions

- USD values should use abbreviated millions or billions where helpful.
- Coverage should be shown as a ratio.
- APY should be shown as a percentage.
- Freshness should be shown as minutes or an explicit timestamp.
- Risk should be shown as a score with a textual label.

## Provenance and Risk Semantics

- Every source row should include method, freshness, and what it powers.
- Any trust badge must be accompanied by text that it is informational only.
- Any mismatch should explain whether it is likely a ledger issue, a staking effect, or stale upstream data.
- Demo data must be labeled as seeded and non-live.

## Visual System Direction

Tone:

- boardroom-grade;
- compact;
- technical;
- credible;
- slightly cinematic.

Color:

- base: slate / graphite / near-black;
- positive: emerald;
- warning: amber;
- critical: rose;
- informational: cyan.

Avoid purple-forward financial UI defaults.

Typography:

- use the existing sans font for body and headings;
- use monospace for numbers, timestamps, and source codes;
- keep headings tight and numerically dense.

Density:

- cards should be information-rich but not crowded;
- tables should fit at desktop width and remain scrollable on mobile;
- use short labels and strong hierarchy rather than large decorative imagery.

Motion:

- a soft entry animation for the main surface;
- subtle movement on the background glows;
- no excessive micro-animations.

## Responsive Behavior

Desktop:

- 12-column grid feel;
- hero metrics in a multi-card row;
- side-by-side charts and decision panels;
- wallet/protocol tables visible without horizontal overflow.

Mobile:

- single-column stacking;
- navigation chips wrap or scroll;
- filters collapse into a sheet;
- tables remain horizontally scrollable;
- chart heights stay compact.

## Accessibility

- Buttons need clear labels and focus states.
- Section navigation should use `aria-pressed` or comparable state.
- Risk badges need text, not color alone.
- Empty states should explain why there is no content and how to recover.
- The demo should work without hover.

## Loading, Empty, and Error States

Loading:

- show a brief refresh state when the user recomputes the demo snapshot.
- summary cards and a small part of the evidence panel may show skeleton or spinner treatment during refresh.

Empty:

- show an empty state when the search filter removes all wallets or protocols.

Error:

- show stale-source or unavailable-source treatment as a product state, not a crash.
- the UI should degrade to cached or last-known seeded values rather than failing open.

## Implementation Notes

- Persist scenario, balance basis, search, active section, and reviewed alerts in localStorage.
- Keep the implementation entirely route-local.
- Use seeded data only.
- Make the read-only boundary explicit.

## Demonstrated Differentiator

The implementation should prove three things visually:

1. Numbers are reconciled, not assumed.
2. Risk is contextualized with source freshness and provenance.
3. The user can turn a noisy multi-source crypto balance into a decision-ready review and board-pack snapshot in one screen.
