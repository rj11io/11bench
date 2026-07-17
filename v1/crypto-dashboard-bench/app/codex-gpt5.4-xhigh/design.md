# Design Spec: Helm Treasury

Date: July 16, 2026  
Route: `/codex-gpt5.4-xhigh`

## Product Differentiator To Show In The Demo

The demo should prove one thing clearly:

`Helm is not a crypto wallpaper of prices. It is a treasury decision surface that turns holdings into risk-aware action packages.`

Everything in the design supports that:

- scenario switching changes the meaning of the page, not just colors;
- policy status is always visible;
- liquidity is shown by time-to-cash, not only by mark-to-market value;
- action queueing has projected treasury impact;
- provenance and freshness are treated as product features.

## Information Architecture

Single-route control tower with five visible layers:

1. `Hero`
   Demo/live disclosure, workspace identity, scenario controls, risk lens, and workspace mode.
2. `Top metrics`
   Treasury value, T+0 liquidity, runway, breach count, and data coverage.
3. `Control tower`
   Runway trend and liquidity ladder.
4. `Decision tools`
   Exposure explorer and action queue.
5. `Trust stack`
   Policy watch, alerts, and provenance sources.

This keeps the page readable as one continuous operating flow rather than a menu maze.

## Navigation And Interaction Model

There is no heavy sidebar. The route behaves like a control board:

- scenario chips: `Steady`, `Liquidity Shock`, `USDC Stress`
- lens chips: `All`, `Only Breaches`, `Stablecoins`, `Protocols`
- explorer grouping chips: `Issuer`, `Chain`, `Venue`, `Wallet`
- workspace toggle: seeded workspace versus empty state

The interaction model is intentionally lightweight so the operator can answer a question in one screen:

- choose stress mode;
- filter to the risky slice;
- queue remediations;
- inspect sources and freshness.

## Critical Journeys

### 1. Morning review

- User lands on the steady-state dashboard.
- Metrics and alerts answer whether the treasury is inside policy.
- Upcoming obligations and same-day liquidity are visible immediately.

### 2. Incident drill

- User switches to a stress scenario.
- Incident banner changes tone and policy breaches expand.
- Explorer is filtered to `Only Breaches`.
- User drills into the largest issuer or venue concentration.

### 3. Rebalance planning

- User reviews suggested actions.
- Queues one or more packages.
- Projected impact summary updates.
- The UI makes signer implications visible before execution.

### 4. Empty workspace

- User switches to a clean state.
- Instead of a dead blank, the route explains what must be imported and what policies Helm needs.
- One action restores the seeded demo workspace.

## Hierarchy, Comparison, Filtering, And Drill-Down

### Hierarchy

- Highest emphasis: treasury health and breach count
- Next: liquidity by settlement window and scenario
- Next: where risk sits by issuer / chain / venue / wallet
- Next: how to fix it
- Supporting layer: provenance and freshness

### Comparison behavior

- Trend comparisons use a line chart with a policy floor.
- Exposure comparisons use ranked categorical bars and cards.
- Policy checks compare current state against explicit threshold text.
- Queued actions compare current versus projected outcome.

### Filtering behavior

- Risk lens changes the entire reading mode of the page.
- Explorer grouping changes the categorical frame without losing context.
- Search narrows positions and actions without altering headline numbers.

### Drill-down behavior

- Clicking a grouped exposure reveals the underlying positions.
- Position cards expose venue, liquidity bucket, wallet, and freshness metadata.
- Risk semantics stay visible at the child level.

## Visualization Choices

### Runway chart

- Chart type: area + line
- Why: total runway and immediate runway are temporal metrics
- Data range: recent multi-week history
- Reference line: policy floor

### Liquidity ladder

- Chart type: horizontal progress bars
- Why: settlement windows are discrete categories and easier to read as stepped liquidity
- Units: USD plus settlement label and haircut

### Exposure explorer

- Chart type: ranked categorical bars with detail cards
- Why: issuer, chain, venue, and wallet are categorical comparisons
- Units: USD and treasury share

### Policy watch

- Chart type: structured status list
- Why: threshold interpretation matters more than graphic novelty

### Action queue

- Chart type: recommendation cards with projected summary
- Why: this is workflow, not passive reporting

## Units, Time Ranges, Provenance, And Risk Semantics

### Units

- USD for treasury value and liquidity
- Months for runway
- Percent for concentration and price change
- T+0 / T+1 / T+3 labels for accessibility to cash
- Health factor where relevant to DeFi collateral risk

### Time ranges

- Runway trend: multi-week context
- Alerts: timestamped near-term events
- Sources: explicit last-updated timestamps

### Provenance semantics

- `Confirmed`: block-indexed or finalized on-chain state
- `Estimated`: market-priced or scenario-adjusted values
- `Attested`: reserve or off-chain backing evidence
- `Screened`: sanctions / risk-screen output

### Risk semantics

- Green: in policy
- Amber: near limit or watch state
- Coral / red: active breach or stress condition
- Scenario banner color shifts to reinforce state without hiding text legibility

## Visual System Direction

### Mood

Calm institutional control, not casino energy.

### Typography

- Display: `Space Grotesk`
- Body: `Manrope`

The display face gives the dashboard a sharper, intentional control-room feel without looking like a consumer trading app.

### Color

- Base background: warm paper and fog gradients
- Primary surfaces: deep ink / slate panels
- Accent: citrus-gold for decisions and highlights
- Positive: muted mint
- Warning: amber
- Breach: coral-red

Avoid purple. Avoid generic pure-black dark mode. The visual tone should feel financial and serious, but still custom.

### Density

- Compact enough for 1440x900 review meetings
- Spacious enough that each card still reads on mobile

### Motion

- Meaningful transitions on scenario and queue changes
- No decorative motion loops
- Pending state should imply recomputation, not entertainment

## Responsive Behavior

### Desktop

- Hero uses a two-column split
- Control-tower chart and explorer dominate the main column
- Policy, alerts, and sources stack in a right rail

### Mobile

- Hero stacks vertically
- Chips scroll horizontally when needed
- Explorer details collapse into stacked cards
- Right-rail content moves below the main tools

The route must remain usable at about `375x812` with no page-level horizontal overflow.

## Accessibility

- Semantic buttons for all chips and toggles
- High-contrast text over dark panels
- States expressed by text and icon, not color alone
- Clear focus rings
- No reliance on hover for critical information
- Data cards keep labels visible even on narrow screens

## Loading, Empty, And Error States

### Loading / recompute

- A subtle “recomputing stress case” indicator appears during scenario transitions.

### Empty

- Show a treasury onboarding checklist, not a blank table.
- Explain what Helm needs: wallet import, burn rate, and a policy template.

### Error semantics for later production

- Stale data should degrade to explicit freshness warnings.
- Missing classifications should appear as unresolved data coverage, not silently omitted balances.

## How The Demo Proves The Thesis

The implementation demonstrates the differentiator by combining:

- a seeded but clearly labeled treasury workspace;
- scenario-aware changes to liquidity, breach count, and recommendations;
- grouping by issuer / chain / venue / wallet;
- projected action outcomes;
- explicit provenance and freshness treatment.

If the route works, an evaluator should be able to say:

`This team chose a real crypto buyer, understood the trust layer, and built the UI around an actual treasury decision loop.`
