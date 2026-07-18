# Design specification — Harbor

## IA and hierarchy

Desktop uses a compact left rail (Overview, Risk queue, Policies, Activity) and a focused workspace. The Overview has: provenance/status bar; large policy-buffer signal; prioritized risk queue; a position detail/runbook panel. Mobile collapses the rail into a top label and stacks the panels. The primary hierarchy is: required decision → evidence/assumptions → proposed next step. It intentionally deprioritizes market noise.

## Core journey and states

The operator lands on a seeded normal snapshot, chooses **Volatile** or **At risk** to inspect how prioritization changes, selects a scenario (spot / ETH −15% / ETH −25%), then drafts the recommended action. Creating/reviewing the draft persists locally and visibly remains a draft. Empty state says no monitored positions; volatile state adds freshness caution; at-risk state uses an unmistakable escalation banner and action prompt.

## Visualization and semantics

The buffer card displays health factor, policy target and numeric delta; the adjacent segmented rail labels “liquidation <1.00,” “team buffer 1.35,” and current value. It avoids a misleading continuous precision gauge. Scenario cards show assumed collateral shock and resulting *illustrative* HF. Values use USD with compact notation, token units where meaningful, basis-point-style threshold precision only where needed. Each critical result shows source/observed time/demo status. Amber means review, rose means action required; labels and icons carry the meaning too.

## Visual system and interaction

Direction: quiet institutional workspace, warm off-white background, ink text, a deep navy workspace, emerald for verified/ready, amber/rose for risk. Typography is system sans with monospace for amounts and identifiers. Dense but breathable cards use 16–24px spacing, hairline borders, 12px radius. Interactive elements have hover, focus and selected states. Scenario controls are buttons; the action drawer opens in-place rather than as a disruptive modal.

## Accessibility and resilience

Text contrast is primary; color is never the only signal. Buttons use native controls with labels and focus rings. On 375px, cards stack and tables become rows; no horizontal scrolling. Loading would use structural skeletons; data failure retains last-known values with age and disables recommendations; empty import is instructional; missing assumptions are marked “unknown.” This demo demonstrates the differentiator through working policy/scenario/action states, but labels every value as seeded demonstration data.
