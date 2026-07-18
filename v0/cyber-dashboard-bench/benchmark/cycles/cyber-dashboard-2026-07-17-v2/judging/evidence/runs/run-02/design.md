# Design Specification

## Information architecture

The route is organized as a single-screen command center with four layers:

1. **Header and mission state**: product name, demo disclosure, active filters, and snapshot of queue health.
2. **Priority summary**: counts, risk reduction trend, due-soon exposures, and coverage confidence.
3. **Action queue**: ranked exposures with a reasoned risk model and quick actions.
4. **Detail workspace**: selected exposure, evidence, attack path, ownership, and remediation controls.

This mirrors the way analysts actually work: scan, narrow, inspect, act.

## Navigation

- Left rail for product sections: Overview, Queue, Exceptions, Reporting, Settings.
- Main content remains anchored on the queue because prioritization is the product wedge.
- A compact mobile bottom sheet style panel replaces the wide workspace on small screens.

## Critical user journeys

### Journey 1: decide what to fix now

1. User opens the dashboard.
2. Top cards show the current pressure points.
3. Ranked queue sorts by risk.
4. User filters to internet-exposed KEV items.
5. User selects the highest-risk item.

### Journey 2: explain the ranking

1. User opens the detail workspace.
2. The product shows why the item is prioritized.
3. Evidence, attack path, and control coverage are visible together.
4. User can defend the recommendation to leadership or IT.

### Journey 3: turn exposure into work

1. User assigns an owner and due date.
2. User picks patch, mitigate, or exception.
3. Status changes to in progress or accepted risk.
4. Queue and metrics update immediately.

## Prioritization logic

The UI should surface a blended risk score made from:

- KEV presence,
- internet exposure,
- asset criticality,
- exploitability,
- compensating control weakness,
- business service importance,
- age / SLA pressure.

The visual hierarchy should reflect that logic:

- KEV and exposed items get the strongest badge treatment.
- Critical items always outrank medium and low items.
- Items lacking an owner are visually louder.
- Overdue items surface in a separate danger band.

## Visualization choices

| Data | Visualization | Why it fits |
|---|---|---|
| Queue size by severity and status | Stacked summary chips and compact bar | Fast scan, low cognitive load. |
| Trend in risk reduction | Sparkline / line chart | Shows whether the team is winning over time. |
| Aging by severity | Horizontal banded bars | Easy to compare backlog pressure. |
| Source coverage | Donut or segmented progress indicator | Communicates completeness and confidence quickly. |
| Exposure detail | Timeline / evidence cards | Makes the explanation concrete. |
| Attack path | Linear chain / node strip | Good enough for a demo without full graph complexity. |

## Design system direction

### Visual tone

- Serious, high-contrast, command-center aesthetic.
- No playful branding.
- Dark shell with warm warning accents and restrained teal/green for good states.
- Dense but not cramped.

### Typography

- Use the existing sans stack with strong hierarchy.
- Section titles: compact, semibold, slightly tightened tracking.
- Monospace labels for IDs, due dates, and source tags.

### Color semantics

- Red: immediate risk, overdue, blocked, exploitable.
- Amber: due soon, watch, partial control.
- Teal/green: contained, remediated, covered.
- Slate: neutral context and metadata.

### Component behavior

- Rows highlight on hover and selected state.
- Filters are sticky and persist.
- Detail panel updates without a full page transition.
- Status actions trigger optimistic local state changes.

## Responsive behavior

### Desktop

- Three-column feel: nav, queue, detail.
- Summary cards align in a single row.
- Detail panel stays visible as a sticky workspace.

### Mobile

- Rail collapses into a compact header.
- Summary cards stack two per row.
- Queue becomes a single column list.
- Detail panel expands below the selected row.

## Accessibility

- Use semantic buttons, lists, and labels.
- Preserve keyboard focus rings.
- Keep contrast compliant for text and status indicators.
- Do not encode meaning by color alone.
- Ensure content reflows without horizontal overflow at 375 px width.
- Provide visible text for every icon-only action.

## Loading, empty, and error states

- **Loading**: skeleton cards in the summary and queue.
- **Empty**: “No exposures match this filter” state with a reset action.
- **High-attention**: top-of-page warning band for overdue KEV exposures.
- **Error**: demo-safe failure copy if local state cannot load.

## Interaction feedback

- Filter changes animate the queue update and maintain selection when possible.
- Remediation actions immediately update state and recalculate summary metrics.
- Snooze and accept-risk actions require explicit user intent and a visible reason.

## How the implementation demonstrates the differentiator

The route is not just a board of metrics. It demonstrates the thesis by:

- ranking exposures by explainable urgency,
- collapsing multiple signals into one prioritized queue,
- making ownership and due dates first-class,
- and showing the remediation workflow all in one place.

