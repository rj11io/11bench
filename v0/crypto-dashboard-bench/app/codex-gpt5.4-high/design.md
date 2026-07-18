# Design Spec — Helm Treasury

## 1. Design intent

Helm Treasury should feel like a **serious operating surface**, not a crypto marketing site and not a trader terminal.

The visual system is built around:

- dark mineral background with warm paper foreground tones;
- teal as “controlled / native / safe enough,”
- amber as “watch closely,”
- coral as “breach / stress / degraded optionality,”
- editorial serif headlines to emphasize judgment and consequence,
- compact sans-serif data UI for scan speed.

The product differentiator is not decoration. It is the feeling that every screen element exists to answer:

> “If we had to move money right now, what is actually safe and available?”

## 2. Information architecture

### Primary page structure

1. **Header**
   - product identity
   - seeded / non-live status
2. **Scenario hero**
   - current operating state
   - decision prompt
   - scenario switcher
3. **Metric row**
   - treasury balance
   - instant liquidity
   - venue concentration
   - stablecoin concentration
4. **Policy board**
   - local thresholds
   - current breaches / empty state
5. **Recommended moves**
   - concrete action checklist
6. **Analysis views**
   - settlement latency over time
   - reserve mix
7. **Position register**
   - filter by liquidity bucket
   - select a holding for drill-down
8. **Exposure matrix**
   - venue × chain view
9. **Provenance / event log / product-fit footer**

## 3. Critical journeys

### Journey A: confirm normal state

- User lands in “Within Policy”
- Sees no open breach
- Reviews reserve mix and control posture
- Optionally tightens thresholds for next review

### Journey B: resolve a bridge-provenance issue

- User switches to “Bridge Exposure”
- Policy board shows bridged-asset breach
- Position register makes the affected wallet obvious
- Selected-position panel explains why bridged provenance is operationally weaker
- Action list shows how to rotate back to native reserve

### Journey C: run a depeg drill

- User opens “Depeg Drill”
- Metrics show single-asset concentration and instant-liquidity compression
- Latency chart and liquidity ladder show degraded optionality
- Action list prioritizes obligations and reserve diversification

## 4. States the implementation must represent

### Normal state

- No open breach
- Soft confidence language
- Empty-state panel in the policy board

### Risk-focused state

- One or more open findings
- Severity badges
- Specific affected positions and action steps

### Volatile / drill state

- Clearly labeled simulation
- More severe color treatment
- Warnings about stressed liquidity and approvals

### Empty state

- Policy board explains when no open finding exists
- The empty state is informative, not blank

## 5. Comparison and drill-down behavior

### Comparison principles

- Use metric cards for big-status comparisons.
- Use stacked bars for share-of-total views.
- Use a time-series line only for change over time.
- Use a matrix for two-dimensional exposure comparison.

### Drill-down behavior

- Clicking a position in the register updates the selected-position detail card.
- The detail card shows asset type, chain, venue, settlement assumption, control, and provenance note.
- The selected state must remain obvious on both desktop and mobile.

## 6. Visualization choices

### Metric cards

- Best for fast status comprehension
- Carry notes so numbers never float without interpretation

### Liquidity ladder

- Horizontal stacked bar
- Shows `instant`, `same-day`, `T+1`
- Includes a vertical marker for current policy threshold

### Settlement latency trend

- Line chart with subtle filled area
- Dotted reference line at policy band
- Appropriate because the metric changes over review windows

### Reserve mix

- Stacked bar plus labeled legend
- Better than pie for compact, scannable percentage comparison

### Venue × chain matrix

- Heat-style cells
- Reveals where concentration and optionality overlap
- This is one of the core visual differentiators

### Position register

- Desktop: table for density
- Mobile: selectable cards for readability

## 7. Units, time ranges, and semantics

- Monetary values: USD
- Concentrations: percent of total treasury
- Settlement assumptions: minutes
- Runway: days
- Time series: last seven seeded review windows
- Scenario timestamps: absolute timestamp string, not “just now”

### Risk semantics

- **Low / teal:** inside policy or operationally healthy
- **Medium / amber:** caution, still usable but not ideal
- **High / coral:** breach or materially degraded optionality

These semantics must always be accompanied by text labels.

## 8. Provenance and demo honesty

The implementation must repeatedly communicate:

- seeded demo
- no live wallets
- no live prices
- no execution
- local browser persistence only

It should also explain what would be live in production:

- stablecoin supply / chain distribution
- issuer support and confirmation data
- custody / venue balances
- screening and compliance states

## 9. Responsive behavior

### Desktop target: ~1440 × 900

- Wide hero with side trust panel
- Four-card metric row
- Two-column analysis and detail sections
- Table-based position register

### Mobile target: ~375 × 812

- Sections stack vertically
- Scenario controls remain tappable
- Table collapses into cards
- No horizontal overflow
- Detail card remains directly below the register for continuity

## 10. Accessibility

- Buttons and sliders are keyboard accessible
- Text labels are present on range inputs
- Severity is not color-only
- Dense data views keep readable line height and contrast
- Empty and selected states have explicit copy

## 11. Interaction notes

- Scenario selection updates the entire page state.
- Policy sliders update breach logic immediately.
- `localStorage` persists:
  - selected scenario
  - thresholds
  - acknowledged alerts
  - completed action checklist items
- Filter chips reduce the visible position set by liquidity bucket.

## 12. How the implementation demonstrates the differentiator

The differentiator is not “nice charts.” It is **policy + provenance + liquidity** shown together.

The implementation demonstrates that by combining:

- breach scoring tied to user-adjustable thresholds;
- clear separation of native, bridged, venue, and yield positions;
- exposure matrix across venue and chain;
- action-oriented incident states;
- explicit control posture and demo honesty.

If the reviewer can quickly understand why a bridged Base wallet is riskier than native reserve at an issuer rail, and can see what to move first, the design succeeds.
