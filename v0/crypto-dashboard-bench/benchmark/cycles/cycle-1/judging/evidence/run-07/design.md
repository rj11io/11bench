# Design Specification: Treasury Sentinel

## Information architecture

Route: `/<ANONYMIZED_RUN>`

Primary layout:

- Header: product name, demo/live status, data freshness, scenario controls.
- Decision strip: runway, underfunded rails, high-severity signals, evidence confidence.
- Main workspace:
  - Left/primary: payout readiness and exposure analytics.
  - Right/context: action memo and evidence checklist.
- Detail sections:
  - Stablecoin exposure matrix.
  - Liquidity route table.
  - Risk signal timeline.
  - Data provenance panel.

Navigation is intentionally shallow for the demo. The real product would have top-level areas:

- Monitor
- Payouts
- Exposure
- Routes
- Signals
- Memos
- Evidence
- Policies

## Critical journeys

### Journey 1: Daily payout readiness

1. User selects entity and window (7 days or 30 days).
2. User selects scenario (base, volatile, depeg, bridge incident).
3. Decision strip updates coverage, runway, signals, and confidence.
4. User reviews underfunded corridors and route constraints.
5. User accepts or edits memo recommendation.
6. User marks memo state as draft, ready for approval, or approved.

States:

- Normal: all corridors funded, no high-severity signals.
- Volatile: liquidity capacity drops, slippage rises, confidence decreases.
- Risk-focused: depeg/bridge scenario highlights exposure and route pauses.
- Empty: when filters remove all relevant risk signals, show a plain empty state with next action.

### Journey 2: Exposure drill-down

1. User inspects exposure by issuer/chain.
2. User compares concentration, reserve report age, stress loss, and jurisdiction.
3. User opens affected actions in the memo panel.

Demo implementation: exposure cards and matrix are visible without modal drill-down to keep the benchmark route fast and inspectable.

### Journey 3: Evidence review

1. User checks evidence checklist.
2. Each item shows source, timestamp, confidence, and status.
3. User can persist memo notes and status.

## Hierarchy and behavior

- The highest hierarchy is operational: "Can we run the next payout window?"
- Monetary values are primary; percentages support them.
- Risk is presented as severity plus impact, not generic red badges.
- Filters update all dependent panels.
- Suggested actions are sorted by decision urgency, then amount impacted.
- Drill-down information is present as compact rows/cards with source and timestamp.

## Visualization choices

- Area chart: treasury runway trend and stress impact over 30 days. Shows direction and scenario effect.
- Stacked bars: issuer/chain concentration. Helps compare exposure distribution.
- Exposure matrix/table: finance-grade details with units, reserve report age, and status.
- Route table: capacity, slippage, ETA, confidence, and review status.
- Risk timeline: sequence of risk events with owner and status.

Units:

- USD amounts use compact display for summaries and full display in tables.
- Stablecoin depeg stress uses basis points and USD impact.
- Slippage uses basis points.
- Time uses UTC timestamps for data and local relative labels for UI copy.
- Freshness uses exact source time plus "seeded demo".

## Provenance and risk semantics

Every metric has:

- Source type: seeded demo, wallet indexer, market data, reserve disclosure, policy engine, or compliance import.
- Freshness: timestamp or report date.
- Confidence: high, medium, low, or unknown.
- Limitation: shown when data is stale, estimated, or insufficient.

Risk severity:

- Critical: payout/blocking condition or policy breach requiring approval before funds move.
- High: material exposure or route degradation requiring owner review.
- Watch: monitor and include in memo.
- Clear: no exception under selected policy.
- Unknown: insufficient data; never treated as safe.

## Visual system

Direction: institutional operations cockpit, not consumer trading app.

Palette:

- Background: warm off-white and graphite panels.
- Accent: teal for healthy/confirmed operations.
- Risk: red for critical, amber for watch, blue for informational/unknown.
- Supporting: neutral grays with restrained border contrast.

Typography:

- Inherits root Inter/Geist setup.
- Dense but readable. No oversized landing-page hero.
- Tabular numeric styles for financial values.

Density:

- Desktop uses a two-column operations layout with compact cards.
- Mobile stacks the memo below summary and converts tables into scroll-contained blocks/cards.

Interaction:

- Segmented controls for scenario and window.
- Select for entity.
- Buttons with icons for memo status, reset, and export-like simulated action.
- Tooltips are represented in copy via visible source labels rather than hover-only content.

## Responsive behavior

Desktop at about 1440x900:

- Header, decision strip, main grid, exposure table, and route table visible with minimal scrolling.
- Memo panel remains in the right column.

Mobile at about 375x812:

- Header controls wrap.
- Decision strip becomes a single-column stack.
- Main grid becomes one column.
- Tables use contained horizontal overflow only where necessary.
- Buttons remain at least 40px tall.
- No body-level horizontal overflow.

## Accessibility

- Semantic buttons and labels.
- No color-only status communication.
- Focus-visible outlines.
- Sufficient contrast in panels and badges.
- Reduced motion friendly; no essential animation.
- Chart information is also present in text/table form.

## Loading, empty, and error states

Demo has no remote loading, but production states are specified:

- Loading: skeleton rows with source label "loading latest source".
- Empty wallets: prompt to import read-only wallets or CSV.
- Empty risks: "No signals match this filter" with reset filter action.
- Stale data: keep stale value visible with warning and timestamp.
- Source error: show affected metric as unknown; do not silently reuse old data.
- Insufficient liquidity data: show unknown/insufficient depth, not zero risk.

## Implementation demonstration

The demo proves the differentiator by implementing an end-to-end decision loop:

1. Select scenario and obligation window.
2. See payout readiness and exposure change.
3. Review liquidity routes and risk signals.
4. Generate and persist an action memo with evidence.

The experience is coherent because charts, tables, signals, and memo all respond to the same treasury decision model.

