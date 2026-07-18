# Design Specification

## Information architecture

The interface uses one page with four major regions:

1. Top trust banner
2. Vault selector sidebar
3. Main analytics workspace
4. Alerts and audit sections

Navigation is intentionally simple because the product is a decision cockpit, not a content library.

## Critical journeys

### 1. Choose a vault

- Left rail lists seeded treasury vaults.
- The selected vault becomes the active analytical context.
- All cards, charts, and alerts update together.

### 2. Check whether treasury is safe to move

- Review status badge.
- Read runway and policy headroom.
- Inspect balance trajectory against the emergency floor.
- Inspect risk trend against threshold.

### 3. Triage risk

- Use the alert sensitivity filter to show all, watch-level, or critical issues.
- Mark specific alerts reviewed.
- Confirm that reviewed events are preserved in the audit log.

### 4. Investigate route or counterparties

- Switch to Wallets or Controls.
- Inspect chain split, holdings, and counterparties.
- Verify that the UI labels where exposure comes from.

## Comparison and drill-down behavior

- Vault cards are comparable by runway, risk, and status.
- Alerts are comparable by severity, source, and timestamp.
- Counterparty cards show exposure, last touch, and risk.
- Charts are linked to the active vault and time range.
- The selected vault resets the top-level view to Overview to avoid stale contextual states.

## Visualization choices

- Treasury value uses an area chart with a visible emergency floor.
- Risk uses a line chart with an explicit threshold line.
- Chain allocation uses a bar chart because absolute comparison matters more than part-to-whole decoration.
- Counterparties remain in cards so the risk label, exposure, and note are readable.

## Units and semantics

- Dollar amounts use USD.
- Runway uses days.
- Concentration, cash-like mix, and policy headroom use percentages.
- Risk is shown as a 0-100 composite, not as a promise of truth.
- Time ranges use 24h, 7d, and 30d labels.
- Freshness is called out in the banner and audit notes.

## Visual system direction

- Mood: institutional, alert, precise.
- Palette: deep navy base with cyan, emerald, amber, and rose accents.
- Density: medium-high, but with clear card grouping and generous internal padding.
- Typography: expressive sans for headlines, monospace for technical or audit references.
- Surfaces: glassy panels, soft borders, and layered gradients instead of flat white cards.

## Interaction design

- Buttons and chips change immediately and persist via localStorage.
- Review actions update the audit feed so the product feels stateful.
- The demo reset control clears the persisted state.
- Hover states are subtle, not flashy.
- There are no fake live-refresh animations that would imply backend data polling.

## Responsive behavior

### Desktop

- Two-column layout with a fixed-feeling vault selector and a wide workspace.
- Charts sit side by side in Overview.
- Wallet and control panels can expand into two columns where space allows.

### Mobile

- The layout collapses into a single column.
- Vault cards remain tap targets.
- Tabs and range controls wrap cleanly.
- Cards stack vertically with no horizontal overflow.

## Accessibility

- All interactive elements are buttons, not divs.
- Status is communicated with text, not color alone.
- Alert severity is labeled in text.
- The empty state explains why no alerts appear.
- Text contrast is kept high against dark surfaces.

## Loading, empty, and error states

- Loading: initial seeded state renders immediately, then localStorage rehydrates after mount.
- Empty: the filtered alert queue can legitimately show no items.
- Error: malformed persisted state is ignored and the seeded demo state is restored.
- Reset: localStorage can be cleared from the UI.

## How the implementation demonstrates the differentiator

The differentiator is not pretty charting. It is that the dashboard answers the treasury question:

**What can move, what should not move, and why?**

The implementation demonstrates that through:

- runway plus burn
- balance floor versus actual balance
- policy headroom
- counterparty exposure
- alert severity filtering
- audit trail of review actions

Those elements are what make the product useful for a treasury team and distinct from a market dashboard or consumer portfolio tracker.

