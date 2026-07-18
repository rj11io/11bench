# Harbor design specification

## Design intent

Harbor should feel like a calm morning risk review, not a trading terminal. The differentiator is the connection between a visible policy breach, the evidence supporting it, and a non-executable action brief. The interface privileges decisions, provenance, and control state over market spectacle.

## Information architecture

Desktop:

- Left rail: Harbor mark, Overview, Findings, Accounts, Policy, Briefs, Evidence; bottom workspace/user.
- Top utility bar: organization, seeded-demo status, snapshot time, search/help.
- Overview:
  - posture header and scenario switcher;
  - KPI strip;
  - main grid: treasury composition + runway;
  - findings queue;
  - right decision panel for selected finding and brief composer.

Mobile:

- Compact top bar with mark, demo badge, menu.
- Horizontal view switcher: Overview, Findings, Brief.
- KPI cards scroll/snap horizontally.
- Charts stack.
- Finding list uses cards; selected detail opens as an in-flow panel.
- Sticky bottom action opens/continues the brief.

## Critical journey

1. User sees “2 decisions need review,” snapshot status, and data freshness.
2. User scans dollars affected and runway.
3. User selects the highest-ranked issuer concentration finding.
4. Detail shows 46% observed vs 40% hard limit and the positions forming it.
5. Evidence distinguishes a fresh market observation from an older issuer document.
6. User opens “Draft response.”
7. A recommended $420k move reduces concentration to 38%; user can adjust amount.
8. User adds rationale and marks the brief “Ready for signer review.”
9. State persists and the finding indicates a linked brief. Nothing executes.

## Hierarchy and behavior

- Primary headline: decision count and one-sentence posture.
- KPIs provide scale, not navigation.
- The findings queue is the core control surface.
- Selecting a finding updates the right panel without losing list context.
- Severity filters and scenario control are always visible.
- “Show policy math” expands formulas and exclusions.
- A provenance popover/panel shows source, observation time, method, and limitation.
- Tables collapse to labeled rows/cards below 720px.

Comparison:

- Policy bars show actual, warning, and hard limit on the same scale.
- Exposure composition shows issuer/asset share plus dollar value.
- Before/after action state uses solid current and outlined projected bars.
- Risk colors are never used for positive/negative market performance.

## Visualizations and semantics

### Treasury composition

A horizontal segmented bar and ranked legend. Unit toggle is unnecessary in demo; always show USD and percentage. Segment order is descending. Wrapped/bridged assets retain distinct labels but roll into issuer totals.

### Policy distance

Bullet bars:

- neutral track = allowed range;
- amber marker = warning threshold;
- red marker = hard threshold;
- filled measure = observed;
- hatched/outlined measure = projected after draft.

### Runway

Simple 18-month band with operating floor and planned spend, not a market price area chart. Show “16.8 months,” monthly burn assumption, and eligible-value definition.

### Finding severity

- Critical: filled deep red lozenge + alert icon.
- High: red text/line with explicit label.
- Watch: amber label.
- Healthy: teal label and check, worded “Inside policy.”
- Unknown/stale: slate/violet with clock or gap icon.

No semantic meaning relies on color alone.

## Data display rules

- Currency: `$12.84m`, with full value in detail; negative never implied by color alone.
- Percent: one decimal where it changes decisions.
- Price: four decimals near peg; avoid more than meaningful source precision.
- Time: absolute UTC in detail; relative age in lists.
- Addresses: label first, shortened address second, copy affordance.
- Every observed value can reveal provider/method/time.
- Global banner: “Seeded demo · fixed snapshot · no wallet connected.”
- “Live” is never used in demo.
- Estimated liquidity and projected outcomes use qualifiers and distinct styling.

## Visual system

Direction: editorial financial instrument with soft parchment canvas, ink typography, crisp white cards, and dark navy decision surfaces.

- Background: warm `#f3f1eb`.
- Surface: `#fbfaf7` / white.
- Ink: `#17201f`; muted `#66706d`.
- Navy: `#132f35`.
- Teal: `#2f746b`; pale teal `#dceae5`.
- Amber: `#b77922`; pale amber `#f6e8cb`.
- Risk: `#b8493f`; pale risk `#f4ddd8`.
- Violet for unknown/stale: `#6c6384`.
- Borders: warm gray `#dcd8ce`.

Typography:

- Inter inherited from root for UI.
- Geist Mono inherited for numeric values, timestamps, addresses, source labels.
- Headline 28–34px desktop, 24px mobile.
- Dense UI text 12–14px, line-height ≥1.4.
- Tabular numbers where supported.

Cards use 14–18px radius, one-pixel borders, minimal shadow. Controls have 40px minimum height; primary targets 44px on mobile.

## Interaction

- 140–180ms transitions for selection, panel changes, and bar projection.
- Scenario switch updates values and findings with a clear “seeded scenario” label.
- Buttons have hover, focus-visible, active, and disabled states.
- No automatic carousel or motion-dependent comprehension.
- Toast-like inline confirmation for brief status, readable by assistive technology.
- localStorage saves scenario, severity filter, selected finding, amount, rationale, and review status after hydration.

## Responsive behavior

At ≥1180px: 88px rail + flexible content + 360px decision panel.  
At 800–1179px: icon rail, two-column charts, decision panel below queue.  
At ≤799px: no fixed rail; single column; top tabs and sticky action.  
At 375×812:

- 16px page gutters;
- no element wider than viewport;
- KPI row scrolls internally with snap;
- legends wrap;
- findings use cards, not a squeezed table;
- detail/brief fields are full width;
- minimum 44px touch targets.

## Accessibility

- WCAG 2.2 AA contrast target.
- Semantic headings, nav, buttons, form labels, table/list relationships.
- `aria-current` for selected nav; `aria-pressed` for filters/scenarios.
- Charts include text equivalents and values.
- Visible focus rings.
- Color-independent labels/icons/patterns.
- Respect `prefers-reduced-motion`.
- Status updates use `aria-live="polite"`.

## Loading, empty, partial, and error

- Loading: skeletons preserve layout; snapshot label says “Loading sources.”
- Empty: illustration-free guided checklist—add read-only account, set policy, invite reviewer.
- Partial: amber data-health banner, list unavailable source, mark affected metrics “Incomplete,” retain last valid values with time.
- Error: do not blank the dashboard; show last known snapshot, failure scope, retry, and export option.
- Unsupported asset: visible unclassified bucket excluded from eligible runway and policy health.

## Demo proof of differentiation

The demo must visibly connect:

`finding → rule math → affected positions → source evidence → before/after draft → review state`

This chain is more important than breadth. Scenario switching proves the same policy produces different decisions under normal, volatile, and stale-evidence states. Persistent brief state proves it is a workflow rather than a static dashboard.

