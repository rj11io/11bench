# Design

## Information architecture

The product should feel like a focused security workbook, not a generic BI dashboard.

### Primary zones

1. Header summary
2. Queue controls
3. Prioritized exposure queue
4. Selected exposure detail
5. Attack-path view
6. Remediation board
7. Metrics and collaboration trace

### Navigation

- Top tabs switch between queue, attack paths, remediation board, and metrics.
- The selected exposure remains sticky across tabs.
- Filters live above the list so they are visible before the content.

## Critical journeys

### Triage an exposure

1. Open the queue.
2. Read the priority explanation.
3. Select the item.
4. Review evidence, attack path, and controls.
5. Move it to in progress or review.

### Accept a risk

1. Open the selected exposure.
2. Confirm why the item cannot be fixed now.
3. Move it to accepted.
4. Preserve the reason in the audit trail.

### Validate closure

1. Review recommended fixes.
2. Mark the item done after verification.
3. Confirm the item leaves the active queue but remains visible in history and metrics.

## Prioritization logic

Priority should be explained in the UI using three stacked signals:

1. exploitability or KEV relevance;
2. asset and identity criticality;
3. attack-path reach to a crown-jewel target.

The queue should make the reason visible in text, not only in score.

## Visualization choices

### Queue

- Use a semantic table-like card list with strong row grouping.
- Each row should show status, type, score, owner, and due date.
- Selected rows should be visibly active without relying only on color.

### Attack path

- Use a compact node-and-edge path with four steps: source, technique, control, target.
- The path should explain the chain in plain language and remain readable on mobile.

### Trend

- Use a line chart for exposure and prioritised work over time.
- The chart is appropriate because the question is directional change, not exact categorical comparison.

### Collaboration trace

- Use a timeline-like note stack.
- Show author, role, and timestamp so the audit trail feels real.

## Design system direction

### Visual language

- Dark control-room shell with warm neutral body tone.
- Accent colors: teal for progress, amber for caution, rose for danger, slate for inert context.
- Avoid purple as the primary accent.

### Typography

- Large expressive page title.
- Tight numeric cards for KPIs.
- Small uppercase labels for scanability.

### Density

- High information density, but keep spacing intentional.
- Cards should cluster related information and use subtle contrast rather than heavy borders everywhere.

### Components

- Buttons should be compact and action-oriented.
- Badges should communicate state with text and icon color together.
- Detail panels should remain stable when filters change.
- Notes and status changes should feel immediate but not noisy.

## Responsive behavior

- At desktop widths, use a two-column layout with a persistent detail pane.
- At tablet widths, stack the detail pane below the queue.
- At mobile widths, keep tabs and filters available at the top, collapse the queue into a vertical stack, and avoid page-level horizontal overflow.
- The attack-path diagram should switch to stacked nodes on small screens.

## Accessibility

- Use semantic headings and buttons for interactive controls.
- Use table-like structure or clearly labeled rows for dense lists.
- Never use color alone to convey status.
- Keep contrast high across text, badges, and backgrounds.
- Ensure keyboard focus is visible on every actionable control.
- Keep typography scalable and avoid fixed-width layouts that break under zoom.
- Use real labels for controls and persistent state so screen readers preserve context.

## Loading, empty, and error states

### Loading

- A loading skeleton is not necessary for the static demo, but the design should still reserve space for the major panels.

### Empty

- Show a deliberate empty state when the current search and filter combination returns no items.
- The empty state should explain what to change instead of looking broken.

### Error

- Since the demo is local-only, the main error case is corrupted persisted state.
- The route should ignore bad localStorage data and fall back to seeded values.

## Interaction feedback

- Selected exposures should get a strong background and border treatment.
- Status changes should immediately reflect in the queue.
- Briefing copy should show a temporary success label.
- Notes should appear in the collaboration trace after save.

## How the implementation demonstrates the PRD differentiator

The implementation is intentionally narrow:

- It does not try to be a general SOC portal.
- It focuses on exposure prioritization, attack-path explanation, and risk acceptance.
- The queue, detail pane, and collaboration trace are one workflow.
- Persisted state makes the demo feel like a real operations surface rather than a static mockup.

