# Holdfast design specification

## Experience objective

The demo should feel like a finance operator’s morning control surface, not a
crypto trading terminal. The first screen answers:

1. Are the next 90 days covered?
2. What breaks the answer?
3. What needs review today?

The implementation demonstrates the differentiator by keeping total portfolio
value secondary and placing **payment-ready days, the policy gap, dated
obligations, and stress impact** at the top.

## Information architecture

### Desktop shell

- Persistent left rail:
  - Holdfast mark and workspace.
  - Overview.
  - Exposure.
  - Scenarios.
  - Sources.
  - Policy.
  - demo/legal note.
- Top bar:
  - page title;
  - seeded-demo badge;
  - snapshot timestamp;
  - source health;
  - demo-state control;
  - avatar/team affordance.
- Main canvas:
  1. state / source warning;
  2. coverage headline and action queue;
  3. coverage chart and obligation calendar;
  4. exposure explorer;
  5. provenance footer.

### Mobile shell

- Compact sticky header with brand, demo badge, source button.
- Content in a single column.
- A four-item bottom navigation for Overview, Exposure, Stress, and Sources.
- Demo-state selector remains near the top of content.
- Dialogs become full-height bottom sheets / edge-to-edge panels.

## Critical journeys

### Journey A — weekly coverage review

1. User lands on baseline.
2. Reads “83 days ready / 90-day policy”.
3. Sees first gap and next obligation.
4. Opens the top action.
5. Reviews affected accounts and policy.
6. Opens stress lab.
7. Runs the scenario.
8. Opens coverage plan.
9. Marks reviewed and exports JSON.

Success: the whole decision loop is understandable without visiting a generic
asset-price page.

### Journey B — investigate concentration

1. User selects Exposure.
2. Toggles Asset / Venue / Chain.
3. Compares percentage, value, readiness, limit, and freshness.
4. Selects a row to reveal dependency detail.
5. Opens the related plan or scenario.

### Journey C — data incident

1. User selects Source outage demo state.
2. Warning states that two sources are stale.
3. Affected confidence and chart precision are suppressed.
4. Source drawer shows last successful observation and what is excluded.
5. User returns to baseline.

### Journey D — first-time workspace

1. User selects New workspace.
2. Empty state explains the safe sequence:
   public wallets → read-only sources → obligations → policy.
3. No wallet-signing CTA appears.
4. “Load seeded workspace” returns to the demo.

## States

### Baseline / normal

- Seeded snapshot is healthy.
- Coverage is below policy but not in immediate failure.
- One medium concentration breach and two watch items.
- Primary CTA: “Stress this gap”.

### Volatile

- Scenario path is visible by default.
- Coverage falls materially.
- Risk copy uses “exposed / shortfall / assumption”, not panic language.
- Primary CTA: “Review coverage plan”.

### Risk-focused

This is not a separate empty red screen. The default screen is already
risk-focused:

- readiness before market value;
- ranked action queue;
- first uncovered obligation;
- concentration against policy;
- plan and approval context.

### Source outage / error

- Amber/neutral alert with explicit stale providers.
- Affected numbers use “last observed” or “not reliable”.
- Chart shows an explanatory panel instead of a precise stress path.
- Healthy sources remain available.

### Empty

- Large, calm empty state.
- Four-step onboarding sequence.
- Security copy: “No signing. Read-only first.”
- Secondary link to data model/sample CSV can be represented as inactive demo
  affordance; the primary working action loads seeded data.

### Loading (production specification)

- Keep shell and section headings.
- Skeleton exact metric positions, not a full-page spinner.
- Maintain previous observation with “refreshing” only when safe.
- Source sync can progress independently.

## Hierarchy

### Level 1 — decision

- Payment-ready days.
- Policy target and gap.
- First uncovered obligation.
- Primary action.

### Level 2 — drivers

- Ready value by horizon.
- Issuer/venue/chain concentration.
- Scenario impact.
- Source health.

### Level 3 — evidence

- Exact positions.
- Addresses/accounts.
- price and liquidity source;
- observation time/block;
- calculation assumptions;
- approval threshold.

## Layout at 1440×900

- Left rail: 224 px.
- Main max width: fluid, roughly 1216 px remaining.
- Content padding: 28–32 px.
- Header: 64–72 px.
- Hero grid: 2fr coverage card / 1fr action queue.
- Analysis grid: 1.45fr coverage chart / 0.75fr obligations.
- Exposure card: full width.
- Cards use 16–20 px internal gaps; no excessive white space.

The viewport should show the complete headline, action queue, chart, and the
start of the exposure explorer without feeling compressed.

## Responsive behaviour

### ≤1100 px

- Left rail narrows or collapses.
- Hero may use equal columns.
- Exposure table reduces secondary metadata.

### ≤860 px

- Hide desktop rail.
- Single-column cards.
- Sticky mobile header and fixed bottom navigation.
- Action queue becomes horizontally contained stacked buttons, never a page
  scroller.

### 375×812

- 16 px page padding.
- Metric uses 48–56 px numerals rather than desktop 64–72 px.
- State control wraps into a 2×2 grid.
- Exposure switches from table-like rows to cards.
- Dialog uses the viewport with safe bottom padding.
- Main content reserves bottom-nav space.

No fixed-width table, SVG, button row, or code/address string may create
horizontal overflow.

## Navigation behaviour

- Left/mobile nav buttons scroll to anchored sections within the demo.
- Active section is shown by text, icon, and surface treatment.
- Source opens a drawer/overlay with data provenance.
- Scenario opens a dedicated dialog.
- Browser URL does not change for demo interactions.

## Coverage headline

### Content

- Label: “Payment-ready coverage”.
- Value: `83 days`.
- Comparison: `7 days below policy`.
- Secondary: `$4.86M marked value · 12.9 months book runway`.
- Explanation: “Ready value applies price, availability, and policy haircuts
  to the next 90 days of critical obligations.”
- CTA: “Stress this gap”.

### Visual

- Oversized tabular numerals.
- A target track from 0 to 90+ days.
- Current position and policy marker with direct labels.
- Warm warning accent because below target; no bright alarm red in baseline.

## Action queue

Each item is a button with:

- severity icon and text;
- concise decision statement;
- impact/due time;
- affected dependency chips;
- acknowledgement state.

Selected item expands a detail region with:

- evidence;
- policy threshold;
- affected amount;
- suggested next review;
- link to scenario or plan.

Order:

1. next uncovered/at-risk obligation;
2. policy breach with near-term impact;
3. source or operational watch item.

## Coverage visualisation

### Chart choice

A simple area/line chart shows available payment-ready USD through the next 90
days:

- horizontal axis: weeks/dates;
- vertical axis: USD, zero baseline;
- baseline ready liquidity: solid dark line with soft area;
- stressed path: dashed coral line;
- policy/obligation annotations;
- direct endpoint labels.

Why:

- the key relationship is change over time;
- it avoids the misleading implication of a price chart;
- a common baseline supports comparison;
- the stress path is legible without a dual axis.

### Uncertainty

- Scenario result states a modelled settlement range in days.
- If source quality is insufficient, replace the line with an explanatory
  state rather than rendering a precise path.
- The chart’s accessible label summarises start, end, first gap, and stress
  effect.

## Obligation calendar

Use a sorted vertical list, not a calendar month grid:

- due date / relative timing;
- obligation type and criticality;
- amount and accepted settlement rail;
- covered / exposed state.

This makes the first shortfall obvious on mobile and desktop.

## Exposure explorer

### Group controls

Segmented control:

- Asset
- Venue
- Chain

### Row fields

- name + type;
- value in USD;
- percentage of total;
- horizontal magnitude bar from zero;
- ready horizon;
- policy/status label;
- data age.

### Drill-down

Selecting a row reveals:

- included accounts/positions;
- canonical contracts/chains;
- issuer or custodian;
- price source/time;
- withdrawal/settlement assumption;
- policies affected;
- related action/scenario.

### Sorting and filtering (production)

- default: descending value;
- sort by value, readiness, policy distance, or age;
- filter by entity, chain, account, and status;
- filters are visible and resettable;
- applied filter count appears in the control.

The demo implements grouping and selection; broader filters are specified for
production.

## Stress lab

### Structure

Right-side desktop dialog / full-screen mobile sheet:

1. Header: “Stress lab” + seeded what-if label.
2. Scenario toggles:
   - USDC -4%;
   - Coinbase Prime withdrawals unavailable 7d;
   - Base unavailable 48h.
3. Result card:
   - stressed days;
   - range;
   - shortfall to 90-day target;
   - first exposed obligation.
4. Affected positions list.
5. Assumptions and limitations.
6. Actions: Reset, Save scenario / Review plan.

### Interaction

- Toggle changes results immediately.
- “Run scenario” persists the selection and closes with the volatile state
  active.
- Focus styles are prominent.
- Escape and backdrop close.

## Coverage plan

### Plan item anatomy

- sequence number and objective;
- exact amount/asset;
- source alias → destination alias;
- chain;
- rationale;
- expected policy impact;
- approval threshold;
- data as-of time;
- status: draft / reviewed.

### Trust semantics

Persistent banner:

> Draft only. Holdfast cannot sign, send, swap, bridge, or reserve liquidity.
> Verify destination, price, fees, and policy in your execution system.

Buttons:

- `Mark reviewed`
- `Export JSON`
- never “Execute”, “Approve”, or “Connect wallet”.

## Provenance and freshness

### Global source control

Compact top-bar button:

- `5/5 sources healthy` baseline;
- `3/5 · 2 stale` outage;
- includes icon and text.

### Source drawer

Rows:

- source / integration;
- data supplied;
- permission type;
- observed time;
- status;
- effect when stale.

Footer:

- demo statement;
- calculation version;
- reporting currency;
- link-style “View methodology” affordance.

### Metric-level provenance

- Short timestamp near top-line values.
- Detailed explanation in selected exposure/action/source view.
- Avoid repeating long citations in every card.

## Visual system

### Direction

“Calm control room”: warm, tactile finance surfaces with a deep navy shell.
The product should feel credible in a CFO review but native to on-chain
operations.

### Palette

- Canvas: warm limestone `#F4F1EA`.
- Card: near-white `#FFFEFB`.
- Shell: ink navy `#101B22`.
- Primary text: `#172127`.
- Secondary text: `#667078`.
- Border: `#DDD8CE`.
- Positive/healthy: deep teal `#1F776D`.
- Warning: ochre `#B16B24`.
- Risk: brick/coral `#C24F43`.
- Accent/selection: chartreuse-lime `#C9F26B` used sparingly.
- Info: indigo `#5965A8`.

Colour always pairs with icon, text, line style, or pattern.

### Typography

- Inherit route’s Inter for UI and headings.
- Inherit Geist Mono for numerals, addresses, timestamps, and labels.
- Headings are sentence case, compact, and not crypto-marketing slogans.
- Tabular numerals for money and days.

### Shape and elevation

- Card radius: 14–18 px.
- Buttons: 10–12 px radius.
- Borders carry most separation; shadows are subtle.
- Selected/primary surfaces use contrast and a 1 px outline, not heavy glow.

### Density

- Compact enough for 1440×900 operational use.
- 44 px minimum touch targets on mobile.
- Exact data rows remain readable at 13–14 px.
- Avoid tiny grey metadata below 12 px.

## Iconography

Use simple Lucide line icons:

- ShieldCheck / ShieldAlert: readiness/risk.
- WalletCards: positions.
- Landmark: venue/custodian.
- Network: chain.
- CalendarClock: obligations.
- FlaskConical: scenarios.
- Database: sources.
- FileCheck: plan/review.

No token logo wall is needed; asset initials in small labelled marks are more
consistent and avoid external assets.

## Motion

- 140–220 ms transitions for hover, panel, and state changes.
- No looping market animation.
- Chart paths can fade, not “draw” theatrically.
- Respect `prefers-reduced-motion`.

## Accessibility

- One `h1`: “Treasury readiness”.
- Logical heading hierarchy.
- Semantic `button`, `nav`, `main`, `section`, and `dialog`.
- Visible 2 px focus ring with offset.
- Labels for all icon buttons.
- `aria-pressed` for segmented controls/toggles.
- Chart has `role="img"` plus a detailed accessible label.
- Status includes readable words and icons.
- Text contrast targets WCAG AA.
- Truncated addresses expose full value in an accessible label/title.
- Dialog closes with Escape and returns to a sensible workflow.

## Loading, empty, and error copy

### Loading

- “Refreshing Base Ops Safe…”
- “Using the last confirmed snapshot while this source refreshes.”

### Empty

- Heading: “Start read-only.”
- Body: “Add public wallets and the next 30 days of obligations. Holdfast does
  not need a signature to calculate a first coverage view.”
- CTA: “Load seeded workspace” in the demo.

### Source error

- Heading: “Coverage precision is reduced.”
- Body: “Coinbase Prime and market-depth observations are outside their
  freshness limits. Last-known values are visible for context but excluded
  from the high-confidence result.”

### No obligations

- “Balances are mapped, but coverage needs dated obligations.”
- CTA: “Import obligations.”

### No price

- Show units and account.
- Market value: `—`.
- Readiness: `Excluded · no current reference price`.

## Demo fidelity notes

- Seeded data uses plausible entity/asset structures but no claim of current
  prices, yields, balances, or provider status.
- The as-of timestamp is intentionally fixed.
- Source-health names illustrate source classes; they do not imply an active
  commercial integration.
- Scenario math is deterministic and disclosed.
- Local storage persists only selected shocks and review/acknowledgement state.
- JSON export is a local browser download.

## Implementation mapping

The route will contain:

- `layout.tsx` — route metadata;
- `page.tsx` — server entry;
- `dashboard.tsx` — client interaction and local persistence;
- `data.ts` — typed seeded data and deterministic scenario helpers;
- `dashboard.module.css` — route-local responsive visual system.

The implementation proves the thesis through:

1. payment-ready days as the largest number;
2. a working stress lab that changes coverage;
3. exposure grouping by dependency;
4. a plan that carries approval context and is explicitly non-executable;
5. visible provenance and a real stale-source state;
6. a safe read-only empty onboarding state.
