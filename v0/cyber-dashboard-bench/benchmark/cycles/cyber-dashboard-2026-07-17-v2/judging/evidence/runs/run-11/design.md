# Design Spec

## Information architecture

The product is organized around one job: **move from raw exposure data to a prioritized remediation queue**.

Primary sections:

1. Overview
2. Prioritized queue
3. Exposure detail
4. Owner backlog
5. Audit trail

The route should feel like an operational workbench, not a report page.

## Navigation and hierarchy

- Top hero: product framing, synthetic-data notice, and the current queue state.
- KPI strip: exposure score, critical count, owner coverage, and SLA pressure.
- Main work area:
  - left: prioritized queue;
  - center: selected exposure detail;
  - right: trends and owner backlog.
- Lower section: audit trail and backlog table.

The queue is the primary interaction surface. Everything else supports the decision to act.

## Critical journeys

### 1. Morning triage

The user opens the dashboard, sees the top critical exposure, and scans the explanation chips to understand why it is first.

### 2. Assignment

The user opens the detail panel, assigns an owner, adds a note, and moves the item to an in-progress state.

### 3. Verification

The user marks the exposure resolved or suppressed, then reviews the backlog and trend to confirm the queue is shrinking.

### 4. Executive review

The user reads the summary metrics and backlog table to answer, “Are the highest-risk exposures being closed?”

## Prioritization logic

Rank the queue using a composite score that weights:

1. Active exploitation evidence or KEV membership
2. EPSS probability
3. Internet exposure
4. Asset criticality
5. Attack-path depth or blast radius
6. Ownership gaps and SLA age

The interface should not hide this model behind a single number. Every selected item needs visible reasons and supporting evidence.

## Visualization choices

### Exposure trend

- Use an area or line chart to show open critical exposures and resolved items over time.
- Why it fits: leadership needs a directional signal, not a dense technical breakdown.

### Signal mix

- Use a bar-style or stacked visualization for KEV, EPSS, internet exposure, and ownership gaps.
- Why it fits: it explains what is driving the queue today.

### Owner backlog

- Use a table for open items by owner and due date.
- Why it fits: owners need exact numbers, not approximate visuals.

### Queue

- Use dense cards or a table-like list with clear badges and score chips.
- Why it fits: the triage surface must scan quickly and remain readable on mobile.

## Design system direction

- Tone: controlled, technical, and high-contrast.
- Color semantics:
  - emerald for resolved or healthy states;
  - amber for attention and SLA pressure;
  - rose for critical or overdue states;
  - cyan for informative signals;
  - slate/ink backgrounds for the shell.
- Density: compact, but not cramped. This is an operations tool.
- Typography: strong numeric hierarchy, muted supporting labels, monospace for identifiers and counts.
- Motion: minimal, limited to selection feedback and state changes.

## Component behavior

- The queue rows must show selected, hover, and keyboard-focus states.
- Buttons that change owner or state should update immediately and toast a confirmation.
- Filters should read like operational facets, not marketing chips.
- Tabs in the detail panel should preserve context while switching from evidence to remediation to audit.

## Responsive behavior

- Desktop:
  - three-column work area;
  - queue and detail are visible at the same time;
  - charts and backlog sit in the right column.
- Tablet:
  - queue and detail stack first;
  - charts collapse below them.
- Mobile:
  - single-column stack;
  - cards expand vertically;
  - table surfaces must remain horizontally scrollable or convert to stacked rows.

## Accessibility

- Use semantic tables for owner/backlog data.
- Keep badge labels textual so color is not the only cue.
- Provide strong focus states and keyboard-operable buttons.
- Ensure screen-reader readable labels for status changes, filters, and tabs.
- Preserve heading structure so the route has a clear landmark hierarchy.

## Loading, empty, and error states

- Loading:
  - show skeleton placeholders or a muted panel if data is still hydrating.
- Empty:
  - if filters produce no results, show a clear empty state with a reset action.
- Error:
  - if persisted demo state cannot be read, fall back to defaults and present a recovery toast.
- High-attention:
  - if critical unresolved exposures exist, show a banner that explains the operational urgency.

## Implementation fit

The implementation should demonstrate the differentiator by:

- ranking the queue around exploitability and ownership quality;
- exposing the reason code for each item;
- letting the user perform a triage action without leaving the dashboard;
- preserving state so the demo feels like a real workspace, not a screenshot.

