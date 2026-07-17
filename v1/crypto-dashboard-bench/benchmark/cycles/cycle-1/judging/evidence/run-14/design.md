# Design specification: Northstar

## Product expression

Northstar should feel like an operating instrument: calm, exact and slightly
forensic. It is not a neon exchange terminal. The visual idea is **night watch**:
deep ink surfaces, cool mineral neutrals, a precise mint accent, and restrained
amber/red reserved for operational attention.

The implementation demonstrates the differentiator by placing a policy-adjusted
runway answer, a ranked decision queue and an interactive stress model above
asset tables. Prices support the decision; they are not the product.

## Information architecture

Desktop:

- Persistent left rail
  - Command
  - Positions
  - Activity
  - Controls
  - compact organization/source state
- Top context bar
  - organization
  - seeded-demo badge
  - snapshot/source health
  - reporting window
- Main workspace
  - outcome header
  - coverage/runway metrics
  - decision queue
  - liquidity trajectory
  - stablecoin/exposure breakdown
  - scenario panel

Mobile:

- compact top bar with product, demo state and scenario access;
- single-column content;
- persistent bottom navigation for the four sections;
- tables convert to stacked rows or horizontally self-contained cards—never page
  overflow.

## Critical journeys

### Daily review

1. User reads “14.2 months base / 11.1 stressed.”
2. Sees that the 90-day commitment coverage is still above policy.
3. Opens the largest decision: issuer concentration over 50%.
4. Reviews impact, evidence age and suggested transfer.
5. Marks it reviewing; state persists.

### Stress test

1. User opens Stress Lab or chooses a preset.
2. Adjusts stablecoin depeg and unexpected outflow.
3. Outcome numbers, delta and liquidity chart update immediately.
4. Assumption language makes clear that this is calculated, not observed.
5. User saves the custom scenario to local storage.

### Position drill-down

1. User switches to Positions.
2. Filters by canonical asset/chain/liquidity tier.
3. Reads value, location, policy eligibility and source time.
4. “Source” opens explanatory provenance in production; demo exposes it inline.

### Control review

1. User switches to Controls.
2. Sees enabled policies, threshold and current measurement.
3. Identifies breached/watching/passing states with text and symbols.
4. Reads last edit and scope; demo controls are read-only except breach status.

## Hierarchy and density

- The highest-level answer is a sentence, not a grid of KPIs.
- Large tabular numerals use `font-variant-numeric: tabular-nums`.
- Main cards use 16–20px internal gaps; dense rows use 10–12px.
- Labels are short, sentence case and muted.
- Decision items are ordered by severity, impact and time-to-obligation.
- Only one saturated accent competes with warning colors.

## Visualizations

### Liquidity trajectory

A compact stepped/area line chart compares:

- observed/base policy-adjusted liquidity;
- selected stress scenario;
- scheduled obligation drawdowns;
- a dotted minimum operating buffer.

Units are USD millions. Time range is 90 days in the demo. The chart uses direct
labels/legend and dash patterns in addition to color. Hover detail is optional for
the demo because supporting values are also in text.

### Coverage rail

Horizontal segmented bar: T0 now, T1 ≤1 day, T2 ≤7 days, restricted. This is more
decision-relevant than a pie chart because it emphasizes ordered liquidity.

### Stablecoin concentration

Ranked horizontal rows with proportional bars, issuer, backing model, price
observation and policy threshold. A threshold tick makes the breach spatially
visible.

### Exposure matrix

Desktop uses a compact chain × asset/account table. Mobile renders position cards.
Cells include values and text status; intensity is secondary.

### Risk semantics

- Critical: red octagon/icon + “Critical”; immediate solvency/security impact.
- High: coral/amber triangle + “High”; policy breached or deadline near.
- Watch: yellow dot + “Watch”; within 10% of threshold or degraded source.
- Pass: mint check + “Pass.”
- Info: blue-gray circle + “Info.”

Green is not used to claim “safe.” It means a configured control currently passes.

## Units, time and provenance

- Primary reporting currency: USD.
- Compact values show `$4.82m`; details expose full values.
- Asset quantities retain native units.
- Percent changes include direction and period.
- Every screen shows “Seeded demo · snapshot 16 Jul 2026, 08:40 UTC.”
- Each material metric can expose:
  - observed-at;
  - block or source timestamp;
  - provider/type (seeded analog in demo);
  - freshness classification;
  - formula/assumptions;
  - exclusions.
- Scenario outputs explicitly say “modeled” and remain visually paired with base.

## Interaction

- Target sizes ≥44px on touch layouts.
- Buttons have hover, active, focus-visible and disabled states.
- Scenario preset changes inputs and results; sliders include numeric output.
- “Review” changes breach state and persists.
- Navigation swaps coherent product views without a route reload.
- “Risk focus” hides low-priority noise and is reversible.
- Escape closes the scenario drawer/modal in production; the demo uses an
  in-layout panel on desktop and overlay sheet behavior on mobile.

## Visual system

- Background: near-black blue (`#07100f` / `#0b1514`).
- Panels: translucent deep green-gray.
- Primary text: warm off-white.
- Secondary text: desaturated gray-green.
- Accent: mint/seafoam for focus and selected state.
- Warning: warm amber.
- Danger: soft coral, avoiding pure red glare.
- Borders: 1px cool-white at 8–12% opacity.
- Shadows: broad, low-opacity; depth primarily through tonal layers.
- Radius: 14–20px cards; controls 8–12px.
- Typography: inherited Inter; monospaced root font for addresses/timestamps and
  compact technical labels.

Subtle grid/noise-like CSS backgrounds may reinforce the instrument feel without
obscuring content. Motion is 150–220ms and disabled under
`prefers-reduced-motion`.

## Responsive behavior

At ≥1180px:

- 220px rail;
- main outcome/visual area and 340px scenario/health column;
- decision and chart panels share a two-column row.

At 760–1179px:

- rail becomes icon/compact;
- scenario panel moves below the outcome;
- card grid is two columns where possible.

At <760px:

- rail hidden, bottom nav shown;
- cards are one column;
- metric strip is a 2×2 grid;
- chart retains a minimum internal plot width but scales inside the card;
- dense desktop headers collapse into labeled stacked rows;
- no horizontal page scroll.

## Accessibility

- WCAG AA text contrast target.
- Never rely on hue alone for severity or chart series.
- Visible 2px focus ring.
- Semantic buttons/nav/headings/lists/tables.
- `aria-pressed` for toggle/preset state; live region for scenario result changes.
- SVG chart has accessible title/description and a textual summary.
- Respect reduced motion.
- Avoid tiny text below 11px; body defaults 13–15px in the dense desktop UI.

## Loading, empty and error states

- Loading: retain layout with skeleton blocks and source-specific progress.
- Empty organization: welcome card, paste-address action, obligations CSV sample,
  and a non-interactive policy preview.
- No breaches: say “No open policy breaches in this snapshot,” still show watch
  items and next scheduled review—never celebratory “all safe.”
- Partial data: show last good value, stale age and excluded amount.
- Missing price: value is “Unpriced,” excluded from totals, visible at top.
- RPC/indexer error: preserve last confirmed snapshot and explain affected chains.
- Scenario error: clamp invalid values and state limits.

## Seeded demo states

- Normal: base runway and three open decisions.
- Volatile: one-click “Market shock” preset.
- Risk-focused: risk-only toggle.
- Partial/stale: one Solana/position feed represented as degraded.
- Resolved: user can mark an item reviewing; state persists after refresh.

