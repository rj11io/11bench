# Patchline design specification

## Experience thesis

Patchline should feel like a calm morning operations desk, not a wall of alarms. The hierarchy is **decision → evidence → accountable action**. High-attention color is scarce, every score is decomposable, and the main screen is bounded by actual remediation capacity.

## Information architecture

- **Today:** daily decision queue, portfolio pulse, capacity, changed evidence.
- **Campaigns:** grouped patches and coordinated maintenance (represented in demo navigation).
- **Assets:** service/owner context (represented).
- **Policy:** action-band rules and SLAs (represented).
- **Integrations:** source freshness and sync health (represented).

Desktop uses a 224px left rail. Mobile uses a compact header and four-item bottom navigation; non-core destinations collapse into More.

## Critical journeys and states

### Daily triage

Land on Today → read high-attention summary → filter queue → select exposure → inspect “Why now” → start remediation. Selection updates the right-hand detail panel on desktop and an in-flow detail card on mobile.

### Owner handoff

Open exposure → choose owner → review prepared fix brief → Start remediation → receive feedback → queue/status/activity update. Demo changes persist in `localStorage`.

### Empty / normal / high-attention

- **High-attention:** default data has overdue/unowned Act-now decisions.
- **Normal:** mixed queue plus positive burn-down.
- **Empty:** filter to Resolved; a useful empty state offers “Show active work.”
- **Loading:** production skeletons preserve card/table geometry.
- **Error:** source-specific inline error with last successful sync and retry; existing decisions remain visible but marked stale.

## Dashboard hierarchy

1. Demo-data disclosure and source freshness.
2. Page title plus one high-attention statement (“2 actions need ownership”).
3. Four outcome metrics: Act now, urgent exposure days, SLA, capacity.
4. Two-column work area: ranked queue (dominant) and selected exposure (supporting).
5. Trend and activity are secondary evidence below the fold/queue.

Ranking order is action band → breached/near SLA → changed exploitation evidence → business consequence → ability to fit remaining capacity. The UI shows the reason, not the composite calculation.

## Visualizations

- **Burn-down sparkline:** direction over six weeks; paired with text delta.
- **Capacity bar:** used/available engineering hours is a part-to-whole relationship and benefits from a single linear scale.
- **Factor rail:** named evidence chips and a four-row reason chain, not a radar chart.
- **Attack path:** four horizontally connected nodes (Internet → edge asset → workload identity → customer data) because topology is the message; mobile stacks it vertically.
- **Queue:** structured rows/cards support exact comparison and action.

All visuals have labels/text equivalents and do not encode meaning by color alone.

## Design system

### Direction

Light operational canvas inspired by technical notebooks: warm off-white background, crisp white surfaces, navy ink, electric indigo for selection/action, restrained coral for urgency, amber for attention, and teal for verified improvement. Thin borders, minimal shadows, 10–16px radii.

### Typography

Inherited Inter for UI; Geist Mono for CVEs, timestamps, counts, and source labels. Page title 28px desktop / 24px mobile; body 13–14px; compact labels 11–12px. Tabular numerals for operational metrics.

### Semantic color

- coral + alert icon + “Act now” label;
- amber + clock + “Attend”;
- slate + eye + “Track”;
- teal + check + “Verified”;
- indigo for focus, selection, and primary action.

Muted text maintains AA contrast against its actual background. Color never stands alone.

### Components and behavior

- Buttons: 44px minimum hit area where primary/mobile; visible hover, active, focus, disabled.
- Segmented filters: count labels; keyboard-native buttons with `aria-pressed`.
- Exposure rows: whole-row button, selected border/background, summary accessible name.
- Tooltips are supplementary only; key evidence is always inline.
- Toast-like feedback is an `aria-live` status message.
- Owner select has a persistent label.

## Responsive specification

### ≥1180px

Fixed rail; content grid with 1.55fr queue / 1fr detail; four metric cards. Approximate viewport target 1440×900 fits title, metrics, filters, and three queue items without feeling compressed.

### 760–1179px

Rail collapses to icon/brand header; metrics become two columns; queue and detail stack.

### ≤759px

Single column; 16px gutters; metric cards use two columns; filter row scrolls only within its own control region if needed (page never horizontally overflows); queue rows become labeled cards; attack path stacks; bottom nav reserves safe-area padding. Secondary descriptions shorten, but evidence and actions remain.

At 375×812 the user can see disclosure, title, first metrics, filters, and begin the action queue; selecting an item exposes full detail below.

## Accessibility

- semantic `main`, `nav`, `section`, headings, lists, labels;
- skip link and unique document metadata;
- keyboard-operable native controls; 2px high-contrast focus ring with offset;
- status communicated through icon + text + color;
- 4.5:1 normal text contrast target; 3:1 UI boundaries;
- 44px primary touch targets and no drag-only gestures;
- responsive reflow without page-level horizontal scrolling;
- `prefers-reduced-motion` disables transitions;
- chart summary in prose and SVG has accessible label;
- live action confirmation without moving focus unexpectedly.

## Trust, loading, and feedback

Every data-bearing view shows **Demo data** and a fixed “snapshot generated” time. Factor timestamps and sources are visible. “Start remediation” is explicitly a modeled workflow; copy never claims that a ticket, patch, or security control is live.

Optimistic status changes are acceptable in the demo and persist locally. Production would show sync pending, synced, and failed states separately. Destructive/exception actions require confirmation and reason; starting work is reversible and gives immediate inline feedback.

## Differentiator demonstrated

The implementation places the daily capacity-constrained queue beside a selected decision’s complete evidence chain. A user can move from “why is this first?” to “who fixes it, by when, and how?” without leaving the screen. The demo’s owner/status changes update the operational metrics and activity, proving Patchline is a remediation decision product rather than a passive reporting dashboard.

