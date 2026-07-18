# Design Spec: Treasury Risk Cockpit

## Information architecture

Primary layout:

- Top bar: workspace label, freshness badge, time range, risk filter, export action.
- Left rail: treasury overview, wallets, approvals, alerts, audit trail.
- Main stage:
  - KPI strip,
  - exposure chart,
  - transfer review queue,
  - selected wallet detail,
  - activity and provenance timeline.

The experience should feel like an operator console, not a consumer dashboard.

## Navigation

- One-page route with anchored sections.
- Tabs are acceptable only if they change the detail panel or focus state, not because the page needs more decoration.
- Wallet selection should act like a drill-down, not a separate page.

## Critical journeys

### 1. Executive scan

User lands on the dashboard and reads:

- treasury value,
- stablecoin runway,
- concentration,
- and highest-risk pending action.

Expected state:

- one alert should be obvious,
- one safe area should be obvious,
- one data freshness cue should be obvious.

### 2. Transfer review

User opens a pending transfer and sees:

- destination label,
- policy outcome,
- screening result,
- required approvals,
- recommended action.

Expected state:

- the primary decision action is visible without scrolling;
- the rationale is plain-language and severity-coded.

### 3. Wallet drill-down

User selects a wallet to see:

- custody mode,
- last refreshed time,
- balances by asset,
- counterparties,
- recent activity,
- and relevant alerts.

Expected state:

- wallet detail should update instantly;
- selection should persist on reload.

## Comparison, hierarchy, and drill-down

- Compare at the portfolio level by:
  - stablecoins,
  - majors,
  - yield positions,
  - operational tokens,
  - idle funds.
- Compare wallets by:
  - custody type,
  - chain coverage,
  - freshness,
  - risk score,
  - and concentration share.
- Drill-down should always preserve the parent context so users never lose the treasury summary.

## Visualization choices

- Use a segmented horizontal bar for asset mix and concentration.
- Use a compact line chart for runway and exposure over time.
- Use a timeline list for approvals and alerts.
- Use status badges for screening/policy outcomes.
- Use sparklines sparingly for wallet-level drift, not as decoration.

Semantics:

- Values are in USD unless explicitly labeled otherwise.
- Time ranges should be in days or weeks, not generic “custom” ranges.
- Freshness timestamps must be shown next to derived values.
- Risk states need explanatory labels:
  - `Clear`,
  - `Review`,
  - `Escalated`,
  - `Blocked`.

## Visual system

- Typography:
  - use a crisp sans-serif with strong numerals,
  - emphasize tabular figures for balances and percentages.
- Color:
  - dark, high-contrast shell with warm brass and cyan accents;
  - green is reserved for safe/approved states;
  - amber is for review;
  - red is for blocked or high-risk states.
- Density:
  - compact but not cramped,
  - controls should read like an internal tool, not a marketing page.
- Motion:
  - subtle panel transitions and row highlight changes,
  - no excessive animation.

## Responsive behavior

### Desktop

- Use a 12-column-like composition with a persistent left rail.
- The transfer review queue and wallet detail should sit side by side.

### Mobile

- Collapse the left rail into stacked cards.
- Prioritize:
  - top KPI strip,
  - active alert,
  - wallet picker,
  - transfer review.
- Avoid horizontal overflow.

## Accessibility

- All interactive elements must have visible focus states.
- Risk status should not rely on color alone; labels must accompany color.
- Table-like views should remain readable with wrap-safe labels.
- Contrast must remain readable in both light and dark text contexts.

## Loading, empty, and error states

- Loading:
  - use skeletons for KPI cards and wallet rows.
- Empty:
  - explain that seeded demo data is shown until a wallet is selected.
- Error:
  - represent source failures as explicit provenance warnings, not silent blanks.

## How the implementation proves the differentiator

The demo should visibly combine:

- treasury composition,
- wallet custody posture,
- policy approval state,
- counterparty risk,
- and freshness/provenance.

That combination is the product differentiator. The interface should make it possible to answer:

“Can we move this money, and can we explain why?”

