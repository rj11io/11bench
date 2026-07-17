# Tideguard design specification

## 1. Experience intent

Tideguard should feel like a calm operations room during an unstable market: decisive, evidence-rich, and restrained. The interface is not a trading terminal. It prioritizes “can we pay, what can fail, and who acts next?” over price excitement.

The implementation demonstrates the product differentiator by keeping a persistent relationship between:

**exposure → failure mechanism → operating impact → policy → action**

## 2. Information architecture

### Desktop navigation

Persistent left rail:

1. **Command** — current resilience posture, runway, obligations, decision brief, exposure.
2. **Stress lab** — presets, custom shocks, impact attribution, recommended actions.
3. **Controls** — policy coverage, action owners, approvals, control checklist.
4. **Sources** — data registry, freshness, methodology, calculation notes.

Bottom of rail:

- organization/workspace;
- fixed demo status;
- data snapshot time;
- privacy/read-only note.

### Mobile navigation

- compact top bar with Tideguard mark, demo badge, and overflow-safe workspace label;
- fixed bottom navigation for the four primary views;
- main content clears the bottom navigation and uses one-column cards.

## 3. Critical journeys

### Journey 1 — morning command check

1. User sees overall status, base runway, stressed runway, and 30-day coverage.
2. Decision brief surfaces only material items.
3. User opens the bridged-USDC item and sees dollars affected, mechanism, evidence age, and proposed control.
4. User moves to Stress lab with the relevant preset.

### Journey 2 — board stress

1. Select “Board stress.”
2. Inspect assumptions: USDC shock, ETH shock, bridge unavailability, expense increase, custodian freeze.
3. Observe changes in accessible funds, runway, loss, and coverage.
4. Read impact attribution, not only the resulting number.
5. Save scenario and open controls.

### Journey 3 — close a control gap

1. Controls view shows policy health and exceptions.
2. User checks completed workflow items.
3. Progress and completion persist locally.
4. Copy states that checklist completion does not verify an on-chain transaction.

### Journey 4 — verify a number

1. User opens Sources.
2. Sees balance, price, Safe, forecast, and reserve-evidence sources with different timestamps.
3. Opens methodology notes for identity, valuation, liquidity, and confidence.

## 4. View specifications

### Command

Header:

- “Treasury command”
- workspace and reporting currency;
- fixed snapshot;
- export button with demo feedback.

Status band:

- status icon and plain-language result;
- current base and board-stress runway;
- direct CTA to Stress lab.

Metric cards:

- operating runway in months;
- 30-day coverage in `x` and dollars;
- same-day liquidity;
- data confidence.

Decision brief:

- filter `Attention`, `All`, `Cleared`;
- severity, title, decision sentence, affected amount, deadline/horizon;
- empty state for a seeded filter with no records.

Resilience composition:

- stacked horizontal exposure composition with direct legend;
- separate rows for issuer, chain/bridge, custody, and protocol/control;
- exact dollars + percentage.

Liquidity timeline:

- same day, 1–7d, 8–30d, >30d;
- obligations overlay / comparison;
- explanatory caption that value and accessibility differ.

### Stress lab

Preset segmented control:

- Operating plan;
- Board stress;
- Severe event.

Inputs:

- USDC price shock, `%`;
- ETH price shock, `%`;
- expense/burn increase, `%`;
- bridge availability horizon, days;
- custodian freeze toggle.

Each slider shows:

- current value;
- affected seeded exposure;
- minimum/maximum labels.

Impact panel:

- stressed runway;
- change from base;
- accessible funds;
- 30-day coverage;
- data confidence;
- compact runway comparison bars.

Impact attribution:

- valuation loss;
- temporarily inaccessible value;
- incremental monthly burn;
- note preventing double counting.

Action plan:

- priority, action, rationale, affected amount, policy effect;
- “Open controls” CTA.

### Controls

Policy summary:

- policy coverage score;
- count of breaches / attention / within-policy items.

Policy rows:

- metric;
- current versus limit;
- mechanism;
- status;
- proportional bar where useful.

Control checklist:

- interactive completion;
- owner, due date, approver;
- persisted status;
- explicit demo-only / no execution label.

Approval packet:

- concise description of proposed movement;
- required roles / threshold;
- no “execute” button in the demo.

### Sources

Registry rows:

- source name and class;
- scope;
- observed time;
- freshness status;
- reliability / caveat.

Source states:

- current (green text/icon);
- aging (amber);
- stale/unknown (red or neutral warning);
- demo snapshot (violet/blue).

Methodology cards:

- identity;
- valuation;
- liquidity;
- stress;
- confidence.

## 5. Hierarchy and density

- Primary decision outcome appears within the first 220px of content on desktop.
- Large figures are reserved for runway and coverage, not total portfolio vanity.
- Card titles are 12–13px uppercase or semibold; supporting copy is short.
- Exact numbers use tabular figures.
- Desktop density supports scanning at 1440×900 without tiny type.
- Tables become stacked rows on mobile, preserving labels and values.

## 6. Visualization choices

### Runway

Use horizontal comparison bars instead of a line chart. Base and stress are two states, not a time series. Label months directly.

### Exposure

Use a compact stacked bar plus direct legend. This communicates part-to-whole while the adjacent exact values enable comparison.

### Liquidity ladder

Use four time buckets with an obligation marker. Time-to-access is the relevant dimension; a market-price chart would be misleading.

### Policy

Use current/limit text and small progress bars. A single score is never sufficient; rows remain inspectable.

### Risk semantics

- red: critical current breach / near-term obligation threat;
- amber: attention / target breach;
- green: within configured policy;
- blue/violet: neutral demo, source, or selection state;
- gray: unknown, unavailable, or background.

Color is always paired with text/icon. “Unknown” is gray/amber, never green.

## 7. Units and formatting

- Base reporting currency: USD.
- Large values: `$4.82M`, `$880K`; detail views may show full dollars.
- Runway: one decimal month, e.g. `9.4 mo`.
- Coverage: one decimal multiple, e.g. `2.8×`.
- Percent: one decimal only when decision-relevant.
- Time: absolute `2026-07-16 09:42 UTC`; relative age may follow.
- Addresses: named label plus shortened identifier, e.g. `Operating Safe · 0x71B4…91A2`.
- Chain and representation always included for bridged assets.

## 8. Provenance behavior

- A global fixed snapshot is visible in header/rail.
- Values derived from multiple inputs state that fact.
- Source details distinguish block observation, price time, forecast import, and evidence publication.
- The Sources view contains no fake live spinner.
- Any demo “refresh” affordance is omitted to avoid implying live data.

## 9. Visual system

### Direction

Warm off-white canvas with dark ink, deep navy/violet action color, restrained mint success, amber warning, and coral critical. Cards use subtle borders and soft shadows; high-risk areas use tinted surfaces rather than neon.

This gives the product institutional calm without copying bank software or using stereotypical black/green trading-terminal styling.

### Typography

- Existing route/root font: Inter for UI and Geist Mono for data.
- Headings: compact, slightly tight tracking.
- Data: tabular numerals and mono for addresses/source IDs.
- Minimum body size: 13px desktop, 14px mobile where space allows.

### Tokens

- canvas: `#f3f1ec`;
- surface: `#fbfaf7`;
- ink: `#18201d`;
- muted: `#69736f`;
- line: `#d9ddd8`;
- accent: `#5147d9`;
- success: `#1f7a5a`;
- warning: `#b56a13`;
- critical: `#c84e49`;
- radius: 16–22px cards; 10–12px controls.

## 10. Interaction

- All buttons have hover, active, and keyboard focus-visible states.
- Navigation changes content without a full page load.
- Sliders update outputs continuously.
- Presets set all stress inputs and the active label.
- Toggle uses a full text label and state.
- Checklist rows use native checkbox semantics.
- Export/save actions show a transient in-product confirmation.
- No destructive action exists in the demo.

## 11. Responsive behavior

### ≥ 1180px

- 236px sidebar;
- two- and three-column content grids;
- Stress lab input column ~380px and flexible impact column.

### 768–1179px

- compact sidebar or narrower rail;
- three metric cards can wrap;
- tables remain two-column where readable.

### ≤ 767px

- sidebar removed;
- fixed bottom navigation;
- one-column layout;
- header actions wrap;
- stacked bars and sliders remain full width;
- exact values move below labels;
- no fixed card widths;
- content padding 16px;
- touch targets at least 44px.

Target mobile viewport: 375×812 with no horizontal scroll.

## 12. Accessibility

- semantic `nav`, `main`, `section`, headings, buttons, labels, and tables/lists;
- visible focus ring with sufficient contrast;
- status conveyed by text and icon, not color only;
- slider has associated label and value;
- toggle uses `aria-pressed`;
- decorative SVGs are hidden;
- chart-like bars include textual equivalents;
- reduced-motion media query removes transitions;
- responsive reading order matches visual order.

## 13. Loading, empty, and error states

### Loading

Production: show skeletal card geometry and per-source progress. Never show a fake completed total while positions are still resolving.

Demo: no artificial loading delay.

### Empty

- no accounts: “Add a read-only address or load sample workspace”;
- no obligations: runway withheld; prompt to import;
- no items in filter: quiet empty state explaining the filter;
- no scenario saved: preset CTA.

The demo includes an accessible empty Decision Brief filter state.

### Error / stale

- source error remains as a named row with last good observation;
- affected totals show reduced confidence;
- unpriced asset stays visible with `Value unavailable`;
- partial data is not presented as complete.

The demo includes an aging protocol position source and explains its effect.

## 14. Trust copy

Persistent:

- `Seeded demo · not live`
- `Read-only analysis`
- `No wallet connected`

Scenario:

- `User-configured stress; not a forecast`

Actions:

- `Workflow completion does not verify an on-chain transfer`

Sources:

- `Values are fixed demonstration data as of 2026-07-16 09:42 UTC`

## 15. Demo differentiator checklist

- The first screen leads with operating survival, not portfolio value.
- Bridged USDC is distinct from native USDC.
- Stress separates price loss from inaccessible funds.
- Obligations alter coverage and runway.
- A signer-control issue sits beside market/bridge risk.
- Recommendations map to policy and an owner.
- Sources use different clocks and caveats.
- Navigation, stress controls, filters, save/export feedback, and checklists are interactive.
- Persistent demo labeling prevents any live-data implication.

