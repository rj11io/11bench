# StableOps Design Specification

## Information architecture

Single-page operations console for the benchmark demo:

1. Header: product identity, decision promise, demo/live status, data timestamp, and trust posture.
2. Scenario controls: normal close, volatile market, and empty batch.
3. KPI row: selected batch, estimated cost, liquidity after settlement, and policy status.
4. Settlement queue: invoice selection with due time, amount, region, and risk status.
5. Rail decision panel: selected rail, issuer, chain, peg deviation, ETA, balance, provenance, and packet action.
6. Analytics: stablecoin exposure by issuer and route capacity.
7. Risk tape: exceptions requiring finance or compliance action.

## Critical journeys and states

- Normal: user selects ready invoices, sees cost/liquidity/policy update, chooses a rail, and prepares an approval packet.
- Watch: user can include a watch invoice but sees exception count and risk context.
- Elevated: missing KYC or elevated rail risk disables packet preparation.
- Blocked: blocked invoice cannot be selected.
- Volatile: spread and peg deviation increase so the cost semantics visibly change.
- Empty: no payables state explains that the close is clear rather than broken.

## Hierarchy and interaction

The page prioritizes the approval decision:

- H1 states the product promise.
- KPIs show consequences of current selection.
- Queue and rail decision sit side-by-side on desktop.
- Charts support the decision rather than dominate it.
- Risk tape uses operational language and timestamps.

Controls:

- Segmented buttons for scenario state.
- Native select for rail choice.
- Invoice rows act as large selection controls.
- Primary action is disabled when policy or liquidity prevents approval.

## Visualization choices

- Area chart: stablecoin exposure over seven days by issuer/currency family. Stacked areas make concentration visible.
- Bar chart: 24h route capacity by chain/rail, supporting liquidity decisions.
- KPI cards: show units and short explanatory detail.
- Risk badges: low, watch, elevated, blocked.

Units and semantics:

- Amounts are USD/EUR with no cents for operational clarity.
- Spread and peg deviation use basis points.
- ETA uses minutes.
- Data freshness uses explicit local demo timestamps.
- Provenance text appears in the rail decision panel.

## Visual system

Direction: finance operations, not consumer crypto. Dense, bright, quiet, and auditable.

- Typography: inherited Inter/Geist stack from the app shell.
- Color: neutral page background, white work surfaces, blue for primary action, green for clear, amber for watch, orange for elevated, red for blocked.
- Radius: 8px maximum for cards and controls.
- Density: compact cards and rows that fit a 1440x900 operations view.
- Icons: lucide icons for status, wallet, policy, data, refresh, and controls.

## Responsive behavior

- Desktop: 4 KPI columns; settlement queue plus decision side panel; three analytics panels.
- Tablet: major sections stack; KPI grid becomes two columns.
- Mobile: single column; invoice row metadata wraps into stable rows; no horizontal overflow.

## Accessibility

- Unique page metadata.
- Semantic headings and main landmark.
- Buttons have text or aria-labels.
- Risk is communicated by text as well as color.
- Native select is labeled.
- Disabled actions provide explanatory copy below the button.
- Charts are supplemental; the core numbers appear outside charts.

## Loading, empty, and error states

Demo has no remote loading state because there is no backend. Production should use skeleton rows for AP and wallet sync, stale-data warnings when a source exceeds freshness SLA, and source-specific error banners. The demo includes empty and blocked states and models stale/uncertain data through provenance and timestamp copy.

## Implementation proof of differentiator

The frontend demonstrates the differentiator by linking invoice selection, rail choice, cost, liquidity, policy state, provenance, and approval packet creation. It avoids a generic token dashboard: charts and metrics serve the finance decision of whether the current batch can be safely prepared for approval.
