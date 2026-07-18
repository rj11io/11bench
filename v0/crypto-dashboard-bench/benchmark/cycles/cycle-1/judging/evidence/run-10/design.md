# Design Specification: Treasury Risk Control Room

## Information architecture

Primary route: `/<ANONYMIZED_RUN>`

Navigation:

- Control room: summary, scenario switcher, risk queue, selected decision, runbook, local saved drafts.
- Exposure: asset table, category filters, custody wallet inventory, counterparty limits.
- Stablecoins: peg monitor, policy checks, and stablecoin-specific risk semantics.
- Evidence: source freshness, provenance, selected-alert evidence, affected entities.

Persistent global elements:

- Product title and seeded-demo status.
- No-wallet-connection trust panel.
- Scenario selector for normal, volatile, depeg, and empty onboarding states.
- Treasury summary cards with health, runway, risk budget, and exception count.

## Critical journeys

### Journey 1: Daily treasury risk triage

1. User opens Control room.
2. Reads demo/live status and as-of timestamp.
3. Reviews health, runway, risk budget, and exception count.
4. Selects highest-severity alert.
5. Reviews policy, summary, and recommended decision.
6. Selects runbook steps.
7. Adds signer note.
8. Saves local approval draft.

### Journey 2: Depeg response

1. User switches to "Depeg" scenario.
2. Sees USDC peg floor breach and critical alerts.
3. Opens Stablecoins view.
4. Reviews peg line chart with $0.985 policy floor.
5. Confirms which rules are critical.
6. Returns to Control room and saves response runbook.

### Journey 3: Exposure review

1. User opens Exposure.
2. Filters assets by category.
3. Reviews source, value, share, and status.
4. Reviews wallet custody and liquidity.
5. Reviews counterparty share against policy caps.

### Journey 4: Evidence review

1. User opens Evidence.
2. Confirms freshness and provenance by source group.
3. Reviews selected-alert evidence rows.
4. Uses affected entity chips to understand blast radius.

### Journey 5: Empty onboarding

1. User switches to "Empty".
2. Product shows no hidden balances.
3. Empty states explain which imports are needed.
4. Summary cards avoid fabricated runway or exposure.

## States

Normal:

- Moderate health score.
- Non-urgent policy drift and signer review.
- Runway and liquidity charts populated.

Volatile:

- Lower treasury value.
- Runway below preference.
- Liquidity depth thinned.
- Critical runbook focuses on staged hedge and payroll protection.

Depeg:

- USDC below policy floor.
- Stablecoin-specific alert becomes top priority.
- Peg chart and policy rules communicate floor breach.

Empty:

- No asset, wallet, alert, peg, or runway data.
- Empty states explain missing imports.
- No hidden or default live claims.

Loading/error expectations for production:

- Loading rows show source name and expected cadence.
- Error state must distinguish source outage, permission failure, stale data, and unsupported chain.
- Stale data must remain visible but visually marked; do not silently delete last known balances.

## Hierarchy and interaction

Priority order:

1. Demo/live trust status.
2. Treasury health and exception count.
3. Scenario control.
4. Risk queue.
5. Selected policy decision.
6. Evidence and runbook.
7. Supporting charts/tables.

Interaction rules:

- Scenario changes reset selected alert and default runbook steps.
- Alert selection updates decision details and evidence.
- Runbook checkboxes update risk-reduction estimate.
- Save stores only a local approval draft in localStorage.
- Asset filters never hide source or status columns.
- Empty state never fabricates values.

## Visualization choices

Runway chart:

- Area/line chart in months.
- Shows base runway, stress runway, and liquidity ceiling.
- Purpose: board-level operating resilience, not investment return.

Peg chart:

- Multi-line chart for USDC, USDT, DAI.
- Reference line at $1 and policy floor at $0.985.
- Purpose: communicate stablecoin stress and response trigger.

Counterparty limits:

- Horizontal bar chart.
- Shows current share; policy caps are listed in adjacent text and wallet bars.
- Purpose: exposure governance.

Asset table:

- Dense tabular layout with value, share, 24h move, source, and status.
- Purpose: inspectability and provenance.

Wallet inventory:

- Repeated rows with custody model, chain, total value, 24h liquidity, and limit bar.
- Purpose: custody and liquidity context.

Evidence panel:

- Source cards and evidence bullets.
- Purpose: auditability and approval confidence.

Units:

- USD values are compact currency.
- Shares are percentages.
- Stablecoin prices are USD.
- Runway is months.
- Timestamps are UTC.
- All values are seeded demo data.

## Risk semantics

Status levels:

- OK: within policy, fresh enough, no action required.
- Monitor: within hard limit but close, stale, or needs scheduled review.
- Warning: policy drift or stress condition requiring finance review.
- Critical: hard policy breach or incident-mode trigger.

Risk categories:

- Market: price move, liquidity depth, slippage.
- Stablecoin: peg, issuer, redemption, reserve/disclosure evidence.
- Custody/venue: custodian, exchange, prime/custody concentration.
- Protocol: DeFi position, smart contract, bridge, collateral dependency.
- Governance: signer readiness, Safe threshold, module/guard changes.
- Compliance: sanctions/KYT and jurisdictional rules.
- Data: freshness, source caveat, null/unknown rows.

## Visual system

Direction:

- Quiet institutional operations surface.
- Dense enough for repeated finance work.
- No marketing hero, no decorative illustration, no fake live trading energy.

Typography:

- Uses inherited Inter/Geist baseline from root layout.
- Compact headings inside panels.
- No viewport-based font scaling beyond constrained responsive heading clamp.

Color:

- Neutral light surfaces with teal, blue, amber, and red used only for identity/status.
- Red is reserved for critical risk.
- Amber is warning.
- Blue is monitor/data freshness.
- Teal is OK/primary action.

Density:

- Cards use 8px radius.
- Panels have compact padding.
- Tables remain inspectable on desktop and horizontally scroll only inside their own wrapper on mobile.

Interaction:

- Native buttons, checkboxes, textarea.
- `aria-pressed` on segmented controls and tabs.
- Browser focus styles retained.

## Responsive behavior

Desktop 1440x900:

- Sidebar and workspace side by side.
- Summary cards across the top.
- Control room uses two-column risk queue and decision panel.
- Exposure view uses table plus right-side wallet/counterparty stack.

Mobile 375x812:

- Sidebar becomes top band.
- Nav collapses to icon buttons.
- Scenario selector becomes two columns.
- Summary cards stack.
- Main content becomes one column.
- Asset table scrolls within table wrapper, not the page.
- Buttons become full width where needed.

## Accessibility

- Semantic `main`, `aside`, `nav`, `section`, `article`, `table`, `button`, `label`.
- Native form controls for runbook and notes.
- Status is text plus color.
- Icon-only mobile nav retains accessible button text in DOM.
- Contrast is kept high on light surfaces.
- Empty states use text, not only icons.

## Implementation differentiator

The implementation demonstrates the product thesis through the core workflow:

- A scenario changes market/risk context.
- Risk queue prioritizes concrete decisions.
- Selected alert exposes policy and evidence.
- User creates a signer-ready runbook.
- Saved runbooks persist locally.
- Provenance and demo status are always visible.

This shows a focused treasury risk product rather than a generic crypto dashboard.
