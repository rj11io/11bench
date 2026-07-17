# Breakline design specification

## 1. Design intent

Breakline should feel like an **operator control room**, not a glossy executive dashboard and not a dark “cyberpunk” collage. The product needs warmth and seriousness at the same time: credible enough for security work, distinct enough to stand apart from generic blue enterprise SaaS.

The implementation uses:

- parchment and mineral tones instead of black/purple default security UI
- serif-led headline typography for strategic differentiation
- compact glass-like cards for dense operational sections
- explicit text labels for every color-coded state

## 2. Information architecture

### Primary hierarchy

1. Product framing and portfolio health
2. Queue filters
3. Priority queue of attack paths
4. Selected path detail
5. Remediation table
6. Portfolio pressure and trust trail

### Navigation model

Single-route workspace with no separate pages in the demo.

Why:

- the wedge is a daily operating screen
- the benchmark values coherence more than broad navigation coverage
- the full workflow can be understood in one route on both desktop and mobile

## 3. Critical user journeys

### Journey A: Find the next path to work

- User lands on overview cards and filters.
- User scans the queue.
- User selects a path and sees status, rationale, and blast radius.

### Journey B: Confirm the fix that matters most

- User reviews the path map and evidence.
- User identifies the choke point.
- User uses a quick action or table edit to move remediation forward.

### Journey C: Coordinate with owners

- User reassigns a step owner if the current one is wrong.
- User updates the step status.
- The path state updates to reflect real progress.

### Journey D: Explain progress upward

- User references the executive summary, note, and timeline.
- User points to chain-prevented status and owner pressure.

## 4. State model

### Normal state

- populated queue
- selected path detail visible
- editable remediation plan

### High-attention state

- selected path is critical and still open
- alert banner appears with plain-language risk framing

### Empty state

- filters/search can produce zero visible paths
- UI provides one-click recovery to “show all paths”

### Closed state

- resolved work is available under broader filters
- visually calmer than active work

## 5. Dashboard hierarchy and prioritization logic

### Queue logic

The queue sorts by:

1. open work before closed work
2. priority band
3. exposure score inside each band

This is intentionally simple and explainable for the demo.

### Selected-path logic

The detail pane always reflects the selected queue item. If a filter removes that item, the first remaining item becomes active. If the filter empties the queue, the detail pane shifts to a no-selection empty state.

### Portfolio cards

Top cards are not generic KPIs. They directly support the product promise:

- Open attack paths
- Crown-jewel paths
- Broken chains this sprint
- Near-term owner SLAs

## 6. Visualization choices

### Chosen visual forms

- **Stat cards** for queue health
- **Ranked queue cards** for path selection
- **Linear attack-path map** for comprehension
- **Semantic remediation table** for dense task data
- **Bar charts** for owner pressure
- **Mini cards** for exposure-domain mix
- **Timeline list** for trust trail

### Why these fit the data

- Attack paths are easiest to read in the demo as a focused chain, not a sprawling graph.
- The remediation plan is transactional and tabular, so table semantics are correct.
- Owner pressure benefits from simple bar comparisons rather than a complex charting library.
- The trust trail is chronological and best expressed as a timeline list.

### Explicitly rejected

- giant force-directed graph
- donut charts for severity shares
- fake realtime tickers
- map widgets or geolocation panels with no wedge relevance

## 7. Layout system

### Desktop

- two-column workspace
- fixed-width queue pane on the left
- flexible detail pane on the right
- sticky queue on desktop so the operating list remains in view

### Mobile

- all sections stack vertically
- queue appears before detail
- path nodes convert from horizontal track to vertical sequence
- tables stay in bounded containers so page-width overflow does not occur

## 8. Design system direction

### Typography

- Headlines: `"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif`
- Body/UI: `"Avenir Next", "Segoe UI", sans-serif`

Rationale:

- serif headline creates a more strategic, editorial visual identity
- humanist sans keeps operational text compact and readable

### Color semantics

- Critical: rust red
- Warning / active work: ochre
- Good / chain prevented / resolved: deep green
- Neutral / review / informational: slate blue

Rationale:

- supports severity without looking like a consumer finance app
- avoids overused neon or purple cyber aesthetics

### Density

- medium-dense
- enough data to feel operational
- enough spacing to stay readable at 1440x900

### Surfaces

- soft frosted cards over a lightly textured gradient background
- subtle grid overlay for control-room atmosphere

## 9. Component behavior

### Queue card

- hover: slight lift
- selected: warmer border and shadow
- content: priority, status, title, summary, metadata, three compact metrics

### Status badges

- always textual
- color is supplemental, not sole meaning

### Quick actions

- “Break next choke point” marks the next unfinished step `done`
- “Kick off next owner” marks the next `todo` step `in_progress`

### Remediation table

- owner and status use native selects for robustness
- table includes a caption for assistive technologies

### Operator brief

- multiline textarea
- persists locally
- supports the collaboration/trust angle in the thesis

## 10. Accessibility requirements

- use semantic headings and regions
- preserve table semantics with `table`, `thead`, `tbody`, `th`, and caption
- provide explicit labels for inputs and selects
- keep color contrast high enough for operational text
- avoid color-only severity encoding
- keep responsive layouts structurally equivalent on small screens

## 11. Loading, empty, and error handling

### Loading

The demo loads from local data, so no formal spinner is necessary.

### Empty

No-result queue state is intentional and informative, not alarming.

### Error

If local storage contains invalid state, the implementation silently falls back to the seeded defaults. This is acceptable for the demo and prevents a broken route.

## 12. Persistence behavior

Persist:

- selected path
- search/filter settings
- crown-jewel toggle
- owner edits
- step-status edits
- operator note

Do not persist:

- derived summary cards as separate state
- transient computed metrics

## 13. How the implementation proves the differentiator

The differentiator is not visual style alone. The implementation demonstrates the PRD promise by showing:

- path-first prioritization instead of issue-first prioritization
- explicit choke-point logic
- editable ownership directly in the remediation flow
- visible `Chain prevented` intermediate progress
- a trust layer with explanation, note, and activity history

If those interactions work, the product thesis is legible even without a backend.
