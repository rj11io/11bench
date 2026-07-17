# Design Specification: BreachPath Command

## Design Intent

BreachPath Command is an operational security tool, not a marketing site. The first screen must feel like a workbench for repeated triage: dense, calm, scannable, and action-oriented. The primary screen should communicate urgency without theatrics and trust without hiding complexity.

## Information Architecture

Primary route: `/codex-gpt5.5-xhigh`

Navigation model in demo:

- Queue: ranked fix packages.
- Exposure: selected attack path and evidence.
- Remediation: owner, fix brief, status, note.
- Metrics: risk burndown, owner load, exceptions.

The demo uses one screen with anchored regions because the product wedge is the handoff between prioritization and remediation. A multi-page shell would dilute the core workflow.

## Critical User Journeys

### Journey 1: Triage an immediate exposure

1. User sees top metrics and ranked queue.
2. Immediate packages are visually and textually marked.
3. User selects a package.
4. Detail pane updates with attack path, score factors, blast radius, and evidence freshness.
5. User sees recommended fix and validation plan.

States:

- Normal: ranked packages visible.
- High attention: Immediate items with KEV/high EPSS/open exposure.
- Empty: search or filter returns no packages.

### Journey 2: Assign and create fix brief

1. User selects owner from allowed team list.
2. User clicks Create fix brief.
3. Status changes to Assigned/In progress and persists locally.
4. Decision receipt records owner, action, and timestamp.

### Journey 3: Close or accept risk

1. User clicks Mark fixed after validation or Accept risk 14d.
2. Fixed item reduces open risk debt.
3. Accepted item is visibly governed and no longer counted as immediate open risk.
4. Note persists.

## Dashboard Hierarchy

1. Header
   - Product name, demo-data badge, data freshness, current workspace.

2. Metric strip
   - Open exposure debt.
   - Immediate fix packages.
   - Risk due this week.
   - MTTR forecast.

3. Three-column work area on desktop
   - Left: ranked fix queue with filters and search.
   - Center: selected exposure details and path visualization.
   - Right: remediation controls and metrics.

4. Mobile
   - Header and metric strip stack.
   - Queue appears first.
   - Selected exposure detail follows.
   - Remediation and metrics stack below.

## Prioritization Logic Shown In UI

Every package exposes:

- KEV or active exploitation evidence.
- EPSS probability.
- CVSS severity, labeled as severity rather than risk.
- External reachability.
- Critical asset/service.
- Identity or privilege path.
- Number of attack paths reduced by the fix.
- Source freshness and confidence.

The UI uses "Decision receipt" rather than "AI says" language. This supports trust and auditability.

## Visualization Choices

- Ranked queue cards:
  - Supports fast scanning and comparison.
  - Shows score, status, due date, owner, and risk delta.

- Attack path diagram:
  - Shows entry point to critical asset and where the fix collapses the path.
  - Uses short node labels and edge labels.

- Signal strip:
  - Makes scoring explainable.
  - Color is paired with text.

- Risk burndown chart:
  - Shows risk debt trending after planned remediation.

- Owner load bars:
  - Prevents unrealistic assignment and exposes bottlenecks.

- Timeline/evidence list:
  - Shows freshness and supports audit confidence.

## Design System Direction

Style:

- Utilitarian, dense, and restrained.
- Light neutral surfaces with strong text contrast.
- Semantic accents: red for immediate/overdue, amber for attend/due soon, teal/green for fixed or validated, blue/cyan for informational graph context.
- Cards use 8px or smaller radius.
- No decorative blobs, oversized hero, or marketing illustration.

Typography:

- Use inherited Inter from root layout.
- Compact headings; no viewport-scaling fonts.
- Monospace only for CVE/source IDs and ticket IDs.

Components:

- Native buttons, select, input, textarea.
- Lucide icons for actions and status.
- CSS module for route-local styling.
- Recharts for simple responsive trend and bar charts.

## Component Behavior

Queue item:

- Button-like row/card.
- Selected state has left accent and text label.
- Shows priority label, rank, service, owner, due date, score, and risk delta.

Filter controls:

- Segmented buttons for All, Immediate, Assigned, Fixed.
- Search input for empty-state demonstration.

Detail pane:

- Updates immediately on selection.
- Contains attack path, business impact, ranked reasons, and evidence sources.

Action panel:

- Owner select changes local state.
- Create fix brief changes status and records decision.
- Mark fixed changes status and reduces risk debt.
- Accept risk records governed exception state.
- Notes persist locally.

Charts:

- Responsive width.
- Short axes and labels.
- Text summary before chart for screen readers and small screens.

## Responsive Behavior

Desktop 1440x900:

- Three-column grid: queue, detail, action/metrics.
- Metric cards in one row.
- Charts fit without internal page scrolling beyond normal viewport scroll.

Mobile 375x812:

- Single-column flow.
- Header actions wrap.
- Metric cards use two-column grid when space allows, then single-column.
- Queue rows become compact cards.
- Attack path nodes wrap vertically with visible connectors.
- No horizontal overflow.

## Accessibility Requirements

- Unique page title through route metadata.
- One `h1`.
- Labels for search, owner select, and notes.
- Buttons use visible text plus icons.
- Status messages are text, not color only.
- Focus styles preserved.
- `aria-live` region for workflow status changes.
- Chart sections include text summaries.
- Tables/graphs avoid relying on hover-only details.
- Meets WCAG 2.2-oriented goals for contrast, reflow, keyboard operation, focus visibility, and status messages.

## Loading, Empty, Error, And Feedback States

Loading:

- Production would show skeleton rows and source freshness placeholders.
- Demo is local seeded data, so no network loading state is necessary.

Empty:

- Search with no matches returns an explicit empty state with a clear reset action.

Error:

- Production connector errors would appear in the freshness row and reduce confidence.
- Demo includes stale/fresh evidence states to show the pattern.

Feedback:

- Workflow actions update status text and an `aria-live` region.
- Persisted changes survive refresh using localStorage.

## How The Implementation Demonstrates The Differentiator

The demo does not present a random set of security widgets. It demonstrates the full PRD workflow:

- A small ranked queue replaces alert volume.
- The selected item has an attack path and transparent score drivers.
- The remediation panel turns the decision into an owner-ready fix brief.
- Closure or acceptance changes state and risk metrics.
- Evidence and decision receipts reinforce trust.
- Demo labels prevent implying live security control behavior.

