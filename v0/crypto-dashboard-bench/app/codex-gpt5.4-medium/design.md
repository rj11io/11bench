# Design Specification: Sentinel Treasury

## 1. Product expression

Sentinel should look like a **finance command desk built for crypto volatility**, not like a trading terminal and not like a generic SaaS admin table.

Visual direction:

- dark, atmospheric top section for urgency and focus
- warm paper-toned working surface below to feel deliberate and readable
- serif display typography for thesis and decision weight
- compact UI cards with strong hierarchy and restrained color accents
- risk color semantics used sparingly so red means something

## 2. Information architecture

### Top level

- Hero / current desk state
- Scenario switcher
- 3 workspace tabs:
  - Command
  - Exposures
  - Controls

### Command tab

- top-line metrics
- prioritized risk queue
- recommended actions
- recent flow events

### Exposures tab

- issuer concentration
- chain allocation
- venue/counterparty concentration

### Controls tab

- policy thresholds
- resulting breach counts
- trust-boundary explanations

## 3. Critical journeys

### Journey A: Daily treasury review

1. User opens Command.
2. Reads scenario banner and snapshot timestamp.
3. Checks 4 metrics for liquidity and concentration.
4. Reviews unacknowledged high-severity alerts.
5. Marks actions complete or acknowledges risks.

### Journey B: Investigate policy breach

1. User switches to Exposures.
2. Sees which issuer or venue exceeds threshold.
3. Understands why the system considers it risky.
4. Returns to Command or Controls to act.

### Journey C: Tune policy assumptions

1. User opens Controls.
2. Adjusts threshold sliders.
3. Watches breach counts change in real time.
4. Uses the result to pressure-test policy posture.

### Journey D: First-time or no-data setup

1. User switches to Empty scenario.
2. Product explains what must be configured first.
3. User learns that no live discovery is implied.

## 4. State model

### Normal state

- Desk is within policy or close to it.
- Warnings are amber, not red.
- Actions feel preventive.

### Volatile state

- At least one policy breach.
- Copy emphasizes rebalancing and concentration control.
- Metrics compress to reflect lower confidence in immediate liquidity.

### Incident state

- Multiple high-severity items.
- Product shifts from optimization to containment.
- Immediate liquidity excludes downgraded balances.

### Empty state

- No holdings shown.
- Product teaches setup prerequisites instead of inventing data.

## 5. Hierarchy and comparison behavior

### Hierarchy rules

- The hero states the desk condition and demo status first.
- Metrics summarize posture, not market trivia.
- Risks outrank charts.
- Actions are adjacent to risks so the dashboard closes the decision loop.

### Comparison behavior

- Issuers compared by share, reserve score, and redeemability semantics.
- Chains compared by operational role, not only by balance.
- Venues compared by share and status to make counterparty dependence legible.

## 6. Filtering and drill-down behavior

### Filters

- Scenario switcher changes the entire treasury posture.
- Tab selection changes decision context.
- Policy sliders act like a dynamic "what counts as risky" filter.

### Drill-down

- Command to Exposures is the main drill-down path.
- Controls explains why something becomes a breach under current assumptions.

The demo does not implement deep modal drill-downs because that would weaken clarity at benchmark scope.

## 7. Visualization choices

### Metrics

- Large numeric callouts with one concise interpretive subtitle.

### Issuer concentration

- Horizontal bars:
  - easiest to compare shares quickly
  - works well on desktop and mobile
  - allows reserve and redeemability labels beside the bar

### Flow events

- Event tape:
  - better than a fake time-series chart when the product decision is operational sequence, not price prediction

### Policy impact

- Small count cards:
  - immediate comprehension
  - no chart needed

## 8. Units, timestamps, provenance, and risk semantics

### Units

- USD for treasury figures
- percentages for concentration
- qualitative reserve score on a 0-100 internal scale

### Timestamps

- Snapshot time displayed at hero level
- event times shown in UTC

### Provenance

- Every scenario includes a provenance note
- footer reinforces seeded-demo status

### Risk semantics

- "Liquid in 15 min" means internal confidence, not legal guarantee
- reserve score is an internal composite signal, not an external rating
- venue status is operational shorthand, not a legal determination

## 9. Visual system

### Typography

- Display: Georgia/serif for headlines and section titles
- Interface: inherited app sans for control labels and dense metadata

### Color

- Ink navy background: urgency and focus
- warm sand panels: contrast and readability
- electric blue: product accent / primary informational emphasis
- amber: caution
- rose/red: breach / incident
- green: confirmed or contained state

### Density

- Medium density on desktop
- compressed but readable cards on mobile
- enough whitespace to avoid "terminal clutter"

### Interaction

- Buttons and tabs use distinct state changes, not subtle ambiguity
- Acknowledgements and completed actions visibly change card tone
- Reset control is always available to restore demo clarity

## 10. Responsive behavior

### Desktop target: ~1440x900

- Two-column decision layout
- command content left, side support right
- four-up metric row

### Mobile target: ~375x812

- Single-column stack
- tabs become full-width buttons
- risk and venue rows stack their metadata vertically
- no horizontal scrolling required

## 11. Accessibility

- Semantic buttons and inputs throughout
- no reliance on color alone; breaches and warnings also use text
- high contrast between panel background and body text
- large tap targets for scenarios, tabs, and action controls

## 12. Loading, empty, and error states

### Loading

- Not needed in this seeded demo, but production would use skeletons for balance and event panels.

### Empty

- Explicit onboarding empty state included as a full scenario.

### Error

- Not simulated as a separate view, but incident copy and provenance semantics are designed to make uncertainty obvious instead of hiding it.

## 13. Differentiator demonstration

The demo proves the wedge in three ways:

1. It prioritizes **treasury decision quality** over price voyeurism.
2. It communicates crypto-native trust boundaries clearly: reserve quality, venue dependence, and approval/custody nuance.
3. It gives the user an operational loop: see posture, inspect breaches, act, and document progress.

That is the core differentiator: not "more data," but **more defensible treasury decisions under crypto-specific uncertainty**.
