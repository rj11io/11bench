# Design Specification: Harbor Treasury

## Product expression

Harbor should feel like a finance-grade operating console, not a neon trading terminal. The visual direction is warm, paper-like, and executive enough for treasury review, with strong density and explicit risk semantics.

## Information architecture

Single-route demo with four layers:

1. Hero and product framing
- Clear statement that this is a seeded, non-live treasury control tower.

2. Summary metrics
- Available capital.
- Ready-to-release volume.
- Capital under elevated scrutiny.
- Unresolved exceptions.

3. Control layer
- Density toggle: `Operations` versus `Risk`.
- Queue status filter.

4. Main workspace
- Left: payout release board and treasury topology.
- Right: selected payout decision detail, exception stack, and either rail health or reserve posture.

## Critical journeys

### Journey 1: release-ready payout

1. User opens queue.
2. Selects a `ready` payout.
3. Sees requested rail, suggested rail, and rationale.
4. Approves seeded release or exports decision log.

Demonstrated differentiator:
- Recommendation is tied to treasury and trust inputs, not just a raw status.

### Journey 2: compliance hold

1. User selects a `review` payout.
2. Interface shows sanctions review as a blocking condition.
3. User holds for compliance rather than forcing a release.

Demonstrated differentiator:
- Compliance state is part of the operational workflow, not an afterthought.

### Journey 3: liquidity rebalance awareness

1. User reviews treasury bucket cards.
2. Detects that Base/USDC has fallen below target floor.
3. Understands rebalancing need before approving too many fast-rail payouts.

Demonstrated differentiator:
- The product links payout decisions to treasury posture.

## Hierarchy and behavior

1. Selected payout is the main object of attention.
2. Exceptions remain persistent and close to the decision detail.
3. Trust inputs switch between `Operations` and `Risk` density modes rather than forcing one overloaded panel.
4. Alert acknowledgements persist in local storage to demonstrate operational continuity.

## Visualization choices

1. Metric cards instead of charts for top-level summary because the main decision is operational, not analytical.
2. Bucket utilization bars show available capital versus target floors.
3. Rail health uses compact status cards with ETA and fee posture.
4. Reserve posture uses structured fact cards emphasizing attestation lag, redemption context, and concentration notes.

Units and time:
- Money values use USD formatting with no fabricated cents.
- Due times are absolute timestamps.
- Reserve freshness is described as a dated snapshot, not a "real-time" feed.

Risk semantics:
- `low`, `medium`, `high` for rail/capital risk.
- `approved`, `watch`, `restricted` for issuer policy posture.
- `ready`, `review`, `queued` for payout execution state.

## Visual system

Typography:
- Large compressed-feel hero headline using system inheritance but tight tracking and scale.
- Dense panel typography for financial-console readability.

Color:
- Bone/paper background with teal as the control accent.
- Amber for caution.
- Red for blocking risk.
- Avoid crypto-exchange purple/black aesthetic.

Density:
- Panels are compact but not cramped at 1440x900.
- Mobile collapses to one column with preserved reading order.

Motion:
- Minimal hover lift only on interactive queue items.
- No decorative chart animation.

## Responsive behavior

Desktop:
- Two-column workspace.
- Metrics in four-up grid.

Tablet:
- Hero and workspace collapse to single column.

Mobile:
- Single-column flow.
- Metrics stack to one per row below 480px.
- Action buttons and filters remain thumb-reachable.

## Accessibility and states

Accessibility:
- Unique page title supplied via route metadata.
- All controls are native buttons.
- Status is not color-only; text labels remain visible.
- Reading order follows decision priority.

States represented:
- Normal: ready payouts and healthy rails.
- Volatile: Tron/USDT rail under watch.
- Risk-focused: sanctions review hold and below-target liquidity.
- Empty-like behavior: queue filter can narrow visible records while preserving decision panel fallback.

Loading and error strategy for production:
- Skeletons for queue and balance panels.
- Provenance banner if data sources are stale.
- Explicit partial-data state when one provider lags.

## How the demo proves the wedge

The demo proves the wedge by making the main user interaction a payout release decision. Each part of the UI supports that decision: treasury balances show what can fund it, alerts show what can block it, and trust panels show why one rail is preferable to another. That is materially different from a generic crypto dashboard full of market charts.
