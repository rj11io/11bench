# Design Specification

## Information Architecture

The dashboard is organized around one primary workflow: weekly exposure review.

Top level order:
1. Posture summary.
2. Priority lenses and filters.
3. Ranked exposure queue.
4. Detail pane for the selected exposure.
5. Trend, queue mix, and lifecycle analytics.
6. Collaboration log and coverage matrix.

The interface is intentionally queue-first. Charts support the review, but they do not replace it.

## Navigation

- No deep multi-page navigation in the demo.
- The user stays in one workspace and changes lens, surface, sort, and item selection.
- The detail pane acts as the primary drill-down surface.

## Critical Journeys

### 1. Triage an urgent exposure

1. Open the queue.
2. Switch to the critical lens.
3. Select the highest-risk item.
4. Read the attack path and evidence.
5. Assign an owner and set status to planned or in progress.

### 2. Record a risk decision

1. Select an accepted-risk item.
2. Review the rationale and control.
3. Add a note.
4. Keep the history visible for audit.

### 3. Clear the queue

1. Filter the queue to see only due-soon or unowned items.
2. Resolve or plan each item.
3. Watch the queue mix and trend charts update.

### 4. Handle an empty state

1. Apply a narrow lens or search term.
2. See the empty-state card.
3. Reset the workspace from the empty view.

## Dashboard Hierarchy

The hierarchy is:
- Posture label and top KPIs.
- Priority lenses and surface filters.
- Ranked queue cards.
- Selected exposure detail.
- Risk driver explanation.
- Attack path and evidence.
- Remediation actions and note capture.
- Analytics and coverage matrix.

This ordering keeps the operational decision above the analytical decoration.

## Prioritization Logic

The queue prioritization should feel explainable:
- Critical items outrank high and medium.
- KEV-like or due-soon items rise above lower-risk exposures.
- Unowned items become more visible.
- Resolved items stay available but do not dominate the queue.
- Sort modes should be obvious and reversible.

The selected exposure always shows why it is prioritized:
- Exploitability.
- Business impact.
- Exposure.
- SLA pressure.

## Visualization Choices

### KPI cards

Use compact cards for visible count, critical count, due-soon count, and accepted risk.

Why:
- They answer the first question immediately.
- They work on small screens.

### Area chart

Use an area chart for the eight-week pressure trend.

Why:
- Trend is more important than point-in-time precision.
- A single smooth line is easier to scan than a dense table.

### Bar chart

Use a bar chart for the visible queue mix by status.

Why:
- Status counts are categorical and change with user actions.
- Bar charts are easier to read than gauges or pie charts in dense tooling.

### Lifecycle cards

Use stage cards with progress bars for discovery, prioritization, validation, and mobilization.

Why:
- The lifecycle is sequential and operational.
- Progress bars make the maturity model concrete.

### Coverage matrix

Use a compact horizontal bar list for visible exposures by surface.

Why:
- It is readable, dense, and responsive.
- It avoids the ambiguity of a donut chart.

## Design System Direction

### Visual tone

- Deep navy base.
- Cyan for information and movement.
- Amber for caution.
- Rose for urgent risk.
- Emerald for accepted or completed work.

### Typography

- Use the existing sans font for labels and body.
- Use monospace for scores, counts, and audit-like data.
- Keep headings tight and assertive.

### Density

- Dense enough for analysts.
- Not cramped enough to lose scanability.
- Cards should have breathing room and clear border separation.

### Components

- Rounded cards with translucent dark surfaces.
- Chips for states and filters.
- Strong selected-row highlighting.
- Buttons large enough for quick triage.
- Sticky detail pane on large screens.

### Motion

- Subtle ambient background drift.
- Gentle state transitions on selected cards.
- No distracting animation loops in the content itself.

## Responsive Behavior

Desktop:
- Two-column layout.
- Queue on the left, detail pane on the right.
- Analytics below the queue.

Mobile:
- Single-column stack.
- Filters wrap onto multiple lines.
- Charts keep fixed heights and remain legible.
- Sticky behavior is removed so the page scrolls naturally.

Responsive constraints:
- No horizontal overflow.
- Filter chips must wrap.
- Buttons and select controls must remain reachable without side-scrolling.

## Accessibility

- Use semantic buttons, inputs, and select controls.
- Every chip and button needs a readable label, not color alone.
- Chart cards should be paired with text counts and summaries.
- Focus states must be obvious.
- Interactive targets should be large enough for touch.
- Empty, loading, and error states need visible copy, not silent failure.
- The color palette should remain legible in both high and low contrast conditions.

## Loading, Empty, and Error States

### Loading

- While local state is being restored, show a clear restoring badge.
- Controls should still render with safe defaults.

### Empty

- When no exposures match the filters, show a centered empty state with a reset action.

### Error

- If saved state cannot be parsed, reset to defaults and show a visible recovery message.

## Interaction Feedback

- Selected exposures receive a highlighted card treatment.
- Status changes should be immediate and persist locally.
- Copy brief should confirm success.
- Notes should appear in the collaboration log immediately.
- Reset should restore the baseline and clear local storage.

## How the Implementation Demonstrates the Differentiator

The demo is not a generic widget grid. It demonstrates the product thesis in four ways:
- The queue explains why an item matters.
- The risk score is broken down into readable drivers.
- Ownership and status are editable in-place.
- Collaboration and audit history remain visible after the action.

That combination is the wedge: explainable prioritization plus remediation coordination.

