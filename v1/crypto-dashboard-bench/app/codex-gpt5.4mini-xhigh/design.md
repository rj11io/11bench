# Design Specification

## Information architecture

The route is a single-screen treasury control room with a small set of deliberate states.

### Shell

- dark, full-bleed route-local shell;
- strong top-level header with product name, demo disclaimer, and freshness markers;
- snapshot selector and time-range controls near the top;
- three content tabs:
  - Overview;
  - Actions;
  - Ledger.

### Content model

- **Overview** answers "what is the state of treasury?"
- **Actions** answers "what do we do next?"
- **Ledger** answers "which wallets, counterparties, or policies drive the state?"

## Critical journeys

### 1) Normal review

1. open the dashboard;
2. read runway, policy health, and liquid balance;
3. inspect the runway trend and asset mix;
4. confirm that the top alerts are informational or low urgency.

### 2) Volatility triage

1. switch to the volatile snapshot;
2. inspect the runway drop and the open alerts;
3. adjust the stress assumption;
4. queue rebalancing or screening actions.

### 3) Risk-focused escalation

1. switch to the risk-focused snapshot;
2. scan the policy breach states and restricted wallets;
3. drill into the wallet table;
4. identify the wallet or counterparty that is compressing runway;
5. export or narrate the risk posture.

### 4) Empty onboarding

1. switch to the empty snapshot;
2. review the onboarding checklist;
3. see that charts and tables are replaced by setup guidance;
4. understand immediately that no live data is connected.

## Comparison and drill-down behavior

- Snapshot selection changes the whole dashboard state.
- Time-range selection changes chart granularity and chart window.
- Wallet readiness filters narrow the ledger table to the relevant operational bucket.
- Clicking a wallet row updates the detail panel without leaving the page.
- Alerts and actions have explicit open, resolved, queued, and undone states.

## Visualization choices

### Runway

- Use a line or area chart for runway over time.
- The chart should use months as the primary unit.
- The chart should show observed and stressed values separately.
- The tooltip should state whether the value is observed, estimated, or simulated.

### Asset and liquidity mix

- Use a donut or categorical chart for asset-class mix or liquidity readiness.
- Keep the legend visible and text-labeled.
- Use percentages for share and USD for supplemental totals.

### Summary

- Use compact metric cards for runway, policy health, stablecoin mix, and at-risk capital.
- Use progress bars for policy and readiness scores.
- Use badges for urgency and provenance tags.

## Risk semantics

- **Green:** healthy / ready / within policy.
- **Amber:** watch / approaching threshold / pending action.
- **Red:** breach / blocked / needs escalation.
- **Slate:** empty / no data / not connected.

The design must not rely on color alone. Every state also uses a label, icon, or status text.

## Units and time

- USD values should use explicit currency formatting.
- runway should be shown in months with one decimal place;
- percent values should be labeled as percentages;
- timestamps should be shown in UTC;
- the UI should clearly note the lag between the simulated snapshot and the current view.

## Visual system direction

- **Mood:** a night-shift control room, not a retail trading app.
- **Surface language:** deep charcoal panels, thin borders, subtle glow, and crisp shadows.
- **Typography:** dense, information-first hierarchy; monospaced numerals for money and counts; uppercase micro-labels for metadata.
- **Color:** cool neutrals with emerald, cyan, amber, and rose accents; no purple-heavy palette.
- **Density:** compact but not cramped; information should scan quickly at 1440px while remaining legible at mobile width.
- **Motion:** light transitions for tab changes, resolution states, and stress controls only.

## Responsive behavior

### Desktop

- two-column layout in the primary content area;
- charts and summary cards share the top half of the page;
- the ledger view can support a detail rail next to the table;
- controls stay visible without becoming a toolbar wall.

### Mobile

- content stacks vertically;
- tabs remain the main navigation;
- the selected-wallet detail panel appears below the table or selected section;
- the table can scroll horizontally only if the viewport is too narrow, but the preferred layout should avoid overflow by stacking columns.

## Accessibility

- all interactive controls need labels;
- selected states must be keyboard navigable;
- chart tooltips should not be the only place where critical information appears;
- alert state should also be conveyed with text and iconography;
- contrast must remain strong in dark mode;
- the empty state should be readable without relying on motion;
- status updates should be understandable to screen readers.

## Loading, empty, and error states

### Loading

- if a loading skeleton is ever added, it should preserve the card layout and not collapse the hierarchy.

### Empty

- empty snapshot replaces numeric claims with setup guidance and muted placeholders;
- no fake balances or charts should appear in the empty state;
- onboarding checklist should explain how the first useful snapshot will be created.

### Error

- if a local data issue occurs, the UI should fail gracefully with a single callout rather than a broken dashboard;
- errors should distinguish between data unavailability and actual runtime bugs.

## How the implementation demonstrates the differentiator

The implementation should make the wedge obvious in one glance:

- the header names the product as a treasury-risk cockpit;
- the summary emphasizes runway, policy health, and at-risk capital;
- the charts show runway and mix, not a generic price collage;
- alerts and actions are the center of the workflow;
- wallet drill-down shows provenance, screening, and liquidity readiness;
- the empty state reinforces that this is a controlled operational tool, not a live trading page.

