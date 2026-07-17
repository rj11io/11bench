# Design specification — Cairn Treasury Control Room

## Product surface

Cairn is a dark, calm, high-density operations workspace for finance leads. Its primary visual promise is **decision clarity under uncertainty**: the number is visible, its policy consequence is near it, and the evidence is one click away.

The UI is a seeded demo. It must never imply live market data, live balances, live wallet connections, or execution.

## Information architecture

### Global shell

- **Left navigation:** Cairn mark; workspace selector; Overview, Positions, Flows, Policies, Reports; bottom links for data sources and settings.
- **Top command bar:** `DEMO DATA` status, as-of timestamp, global search, alert count, read-only scope button, user avatar.
- **Main content:** route title, one sentence of decision context, compact metric strip, primary analysis grid, evidence / review footer.
- **Mobile:** sidebar becomes a top bar with menu button and a horizontally wrapping nav row; the workspace name remains visible.

### Views

1. **Overview:** the daily / weekly decision loop.
2. **Positions:** exact holdings, location, chain, allocation, source age, and drill-down.
3. **Flows:** burn, inflows, outflows, and recurring commitments.
4. **Policies:** reserve floor, concentration cap, venue exposure, monthly outflow cap, and current exceptions.
5. **Reports:** the weekly pulse preview and export / share entry point.

## Critical journeys and states

### Journey 1 — Review the morning brief

Default state opens on Overview with:

- health label `Within policy · 2 items to review`;
- metric strip: Covered NAV, Deployable capital, Runway, Policy coverage;
- `Decision queue` with named alerts and severity;
- NAV / runway chart with 30D / 90D / 180D range buttons;
- Treasury mix and runway / burn comparison;
- Evidence ledger with source, age, and coverage.

The user can mark the workspace reviewed. The button changes to `Reviewed just now` and persists locally.

### Journey 2 — Investigate a risk

Selecting a queue item opens a right-side panel on desktop and a bottom sheet-like block on mobile. It contains:

- alert title, severity, status, and affected policy;
- “why it matters” sentence in plain language;
- observed input values and scenario delta;
- source badge, observed time, data age, and confidence;
- actions `Acknowledge`, `Keep open`, and `View positions`.

Acknowledge changes the queue state and stores the state in `localStorage`; it does not hide the alert from the evidence ledger.

### Journey 3 — Stress the decision

The `Scenario lab` control is always visible beside the primary chart. Options are `Base case`, `ETH −30%`, `Volatile token −50%`. Switching options updates the hero metrics, chart annotation, runway comparison, and stress callout. A microcopy label says `Modelled scenario · not a forecast`.

### Journey 4 — Inspect a position

Positions supports a search input and a row click. The selected row reveals:

- exact amount and USD value;
- asset / contract / chain;
- custody location;
- allocation and policy contribution;
- source and last observed block / time;
- classification state such as `Recognized`, `Manual`, or `Needs review`.

## Hierarchy, comparison, and drill-down behavior

- Use one dominant “decision state” above the fold; do not make the user infer health from colors alone.
- Use a short metric strip, then the risk queue, then charts. Exact values live in tables and detail panels.
- Keep Base / Stress as a single control state, not three duplicated dashboards.
- Use selected rows, drawers, and detail expansion for secondary metadata.
- Keep primary numbers in USD with units; show token quantities only in Positions detail.
- Severity is redundant: icon + word label + color. `Action` uses coral; `Watch` uses amber; `Clear` uses mint.

## Visualization choices

### NAV / runway chart

An SVG line chart uses 30D / 90D / 180D points from the seeded snapshot. The y-axis is `$M`; the x-axis labels are relative dates; a dashed line marks the scenario output. The chart is a decision aid, not a trading chart. Tooltip content is accessible via an adjacent text summary.

### Treasury mix

A stacked horizontal bar shows stable, BTC / ETH, and protocol token buckets. A table / legend names the bucket, percent, and policy status. Use one stable color per bucket and never rely on color alone.

### Runway and burn

A horizontal progress treatment compares base runway to stress runway, with a reserve-floor marker. Under it, show committed monthly burn and next 30-day outflow. This directly supports a cash planning decision.

### Evidence ledger

A compact table uses source, dataset, last observed, age, coverage, and state. It is intentionally explicit about seeded data and can be used as the visual trust anchor.

## Visual system

- **Canvas:** deep ink `#07111a`, blue-black panels `#0c1924`, elevated navy `#122332`.
- **Text:** warm white `#f4f7f5`, muted blue-gray `#8ea2b3`.
- **Signal:** mint `#73f0c0` for in-policy / positive; amber `#e6b96b` for watch; coral `#f17c78` for action; ice blue `#86bdf2` for informational data.
- **Borders:** low-contrast blue-gray, 1px; surfaces are bounded only when the content needs containment.
- **Typography:** Inter from the root layout for UI; monospace for timestamps, asset symbols, and exact values.
- **Density:** 4px spacing unit; compact labels at 11–12px; values at 20–32px; line-height around 1.2 for metric blocks.
- **Interaction:** 150–220ms transitions, selected states use border / background plus an icon or label, never color only.
- **Brand motif:** a cairn / stacked-stone mark made from small geometric blocks, evoking a durable reference point without using a coin logo.

## Responsive behavior

### Desktop ~1440×900

- 224px left rail; main content max-width 1440px with 24px gutters.
- Hero metric strip and decision queue fit above the fold.
- Main analysis grid is two columns; evidence spans full width.
- Alert details panel occupies 360px on the right without shifting the chart beyond the viewport.

### Mobile ~375×812

- 16px page gutters, 12px gaps, one-column sections.
- Sidebar collapses to top bar; nav controls wrap.
- Metric strip becomes a 2×2 grid.
- Decision queue appears before charts so the action loop remains first.
- Charts maintain a minimum visual height but use width `100%`; no horizontal page overflow.
- Tables become stacked rows with labels; exact metadata moves into the selected detail block.
- Alert panel becomes an inline block below the queue; close and acknowledge controls remain reachable.

## Accessibility and semantics

- Use semantic `nav`, `main`, `header`, `section`, `table`, and `button` elements.
- Every icon-only control has an `aria-label` and a visible tooltip-like label where space permits.
- Buttons have clear focus styles inherited from the baseline; selected state uses `aria-pressed` where relevant.
- Risk colors are paired with words and icons; do not use green / red alone.
- Charts include a text summary and visible units.
- Inputs have labels or accessible placeholders; empty search results have a reset action.
- Reading order follows: decision state → queue → scenario / chart → mix / runway → evidence.

## Loading, empty, stale, and error states

- **Loading:** skeleton blocks with the label `Loading seeded snapshot`; never show a fake “live” spinner.
- **Empty:** `No recognized positions yet` with supported onboarding options and no invented totals.
- **Stale:** amber `Stale · 2h 14m` chip on the exact value and an action `Review source`.
- **Unclassified:** neutral `Needs review` chip; exclude from covered NAV and explain why.
- **Error:** inline `Source unavailable` row with last successful observation and retry / export options.
- **Volatile:** scenario badge and policy exception state, not a red 24-hour price flare.

## Demonstrating the differentiator

The initial Overview deliberately composes the product wedge in one screen:

1. “Deployable capital” subtracts reserve floor and near-term outflow, so it is more decision-ready than total balance.
2. “Decision queue” names policy / runway consequences, not just price changes.
3. Scenario lab changes the same numbers and chart without leaving the context.
4. Evidence ledger shows source, time, age, and coverage beside the conclusion.
5. Review / acknowledge state persists locally, demonstrating a real operating loop rather than a static collage.

