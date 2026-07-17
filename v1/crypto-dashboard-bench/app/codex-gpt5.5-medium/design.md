# Design Specification: StableOps Radar

## Information architecture

Top-level route: `/codex-gpt5.5-medium`

Primary regions:

- Header: product identity, seeded demo status, snapshot timestamp, read-only wallet posture.
- Scenario/corridor band: current operating scenario and corridor selector.
- KPI row: monitored balance, corridor coverage, active alerts, weighted risk.
- Left rail: issuer filter, risk threshold controls, selected corridor policy.
- Main workspace: position health table, flow forecast, issuer exposure.
- Right rail: alerts and rebalance workflow.

This IA supports a treasury operator's natural order: context, readiness, exceptions, evidence, action.

## Critical journeys and states

Journey 1: Fund a corridor

1. Select corridor.
2. Review total coverage and policy-safe coverage.
3. Inspect eligible/blocked positions.
4. Draft approval from eligible balances.

Journey 2: Investigate risk

1. Switch to volatile or incident scenario.
2. Read alert card.
3. Inspect affected position row and provenance.
4. Adjust thresholds to match risk policy.
5. Acknowledge alert or draft a plan.

Journey 3: Empty or filtered state

1. Select no-data scenario or restrictive filter.
2. UI shows empty state in table/chart regions.
3. Controls remain usable and layout remains stable.

Represented states:

- Normal: inside policy with minor warning.
- Volatile: depeg/liquidity drift and multiple warnings.
- Incident: critical breach with risk-off action.
- Empty: no eligible matching records.
- Persisted: thresholds and acknowledged alerts survive reload through `localStorage`.

## Hierarchy, filtering, and drill-down

Hierarchy:

1. Scenario headline.
2. Corridor readiness KPIs.
3. Position table and alerts.
4. Flow forecast and issuer mix.
5. Rebalance plan.

Filtering:

- Issuer filter supports all, USDC, USDT, PYUSD, USDP.
- Corridor selector changes eligibility and policy-safe coverage.
- Threshold sliders change breach semantics.

Drill-down behavior in demo:

- Position rows expose the most important details inline: balance, peg, depth, settlement time, risk score, eligibility, provenance.
- Provenance is also available through native title hover for longer source text.
- Production version would add row-level drawer with source events, wallet addresses, transaction history, reserve evidence, and alert lineage.

## Visualization choices

KPI cards:

- Use large numerals for readiness and risk.
- Include secondary line for availability, eligibility, acknowledged alerts, and maximum severity.

Position table:

- Operational table rather than chart wall because treasury users need source/action auditability.
- Risk score badge uses discrete severity color.
- Peg shown as price and basis points.
- Liquidity shown as executable depth in USD plus settlement minutes.

Flow forecast:

- Bar triplets show inflow, outflow, and buffer by hour.
- Units are USD millions.
- Negative buffer uses a patterned red treatment.

Issuer mix:

- Horizontal stacked bar plus percentages.
- Purpose is concentration detection, not price performance.

Alerts:

- Severity-colored cards with source, age, detail, and action.
- Acknowledge action persists locally.

Units and semantics:

- Balances and depth in USD.
- Peg deviation in basis points.
- Settlement in minutes.
- Risk score 0-100, demo composite.
- Timestamps in UTC.
- Data status always "Seeded demo, not live data."

## Visual system

Direction:

- Quiet institutional operations workspace.
- Dense but readable.
- No marketing hero, no decorative chart collage.
- White and slate base with blue, green, orange, red, and purple used by meaning.

Typography:

- Inherits root Inter/Geist setup.
- No viewport-based font scaling beyond `clamp` for the route headline.
- Tight panel headings and compact table text for scanning.

Color:

- Background: light slate/white.
- Primary action: dark slate.
- USDC: blue.
- USDT: green.
- PYUSD: purple.
- USDP: amber.
- Warning: orange.
- High/critical: red/dark red.
- Positive/clear: green.

Density:

- Cards use 8-10px radius.
- Tables use fixed minimum row height.
- Controls use stable dimensions.
- No cards inside cards except repeated alert/metric items.

Interaction:

- Segmented scenario control.
- Native select for corridor.
- Token filter chips.
- Range sliders for thresholds.
- Buttons for acknowledge and draft approval.

## Responsive behavior

Desktop around 1440x900:

- Three-column workbench: left controls, main data, right alerts/actions.
- KPI row has four cards.
- Position rows display as table-like grid.

Tablet:

- Right rail moves below main workspace in two columns.
- Position provenance moves to its own row when needed.

Mobile around 375x812:

- Single-column layout.
- KPI cards stack.
- Scenario control wraps to two columns.
- Position rows stack into compact record cards.
- Charts retain fixed vertical space and avoid horizontal overflow.

## Accessibility

- Route has unique metadata title.
- Native buttons, select, labels, and range inputs are used.
- Status is communicated with text and color, not color alone.
- Text contrast targets WCAG-friendly slate/white combinations.
- Empty states contain text and icon.
- No hover-only critical workflow.
- Chart has accompanying labels and legend.

## Loading, empty, and error states

Demo:

- No async loading because all data is seeded route-local data.
- Empty scenario and filters display "No matching seeded records."
- Draft approval explicitly says no transaction was created.

Production:

- Loading skeletons by source family: ledger, market, risk, issuer, custody.
- Stale source banner when source timestamp exceeds SLA.
- Source disagreement state when market feeds diverge beyond tolerance.
- Permission error state with source-specific remediation.

## Implementation demonstration of differentiator

The frontend demonstrates the product thesis by making the stablecoin decision loop visible:

- The user picks a business corridor, not a token chart.
- The dashboard computes total versus policy-safe coverage.
- Rows expose why funds are usable or blocked.
- Alerts connect risk observations to operating actions.
- Risk thresholds are adjustable and persistent.
- The approval workflow drafts an action without pretending to transact.
- Seeded demo status and provenance are visible throughout.

