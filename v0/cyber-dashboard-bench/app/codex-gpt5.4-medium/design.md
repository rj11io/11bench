# Design spec: Chokepoint

## Design goal

Demonstrate a product that feels like a real exposure-operations workspace: dense, explainable, accountable, and calm under pressure. The design should feel more like an intentional operations board than a generic analytics page.

## Information architecture

### Primary navigation

- `Operate`: ranked exposure inbox and remediation queue
- `Campaigns`: grouped change programs with status, owners, and validation
- `Proof`: trend, SLA, verification, and audit perspective

### Secondary controls

- scenario switcher: `normal`, `surge`, `quiet`
- environment filter
- owner filter
- quick actions on selected exposure

## Critical journeys

### Journey 1: Decide what matters now

1. User lands on `Operate`.
2. Summary strip establishes open critical paths, KEV-backed exposures, SLA pressure, and proof posture.
3. Ranked exposure list shows the smallest possible set of “work that matters.”
4. Selecting one exposure opens an explainability panel with score composition, findings, recommended fix, and expected blast-radius reduction.

### Journey 2: Turn a risk into action

1. User clicks `Move to campaign`.
2. The linked campaign becomes the visible execution container.
3. User updates status and note.
4. State persists locally to demonstrate continuity.

### Journey 3: Prove the work changed risk

1. User opens `Proof`.
2. Trend and status views show verified closures, overdue work, reopened items, and burn-down.
3. The language remains outcome-oriented: attack paths broken, not just findings counted.

## Dashboard hierarchy and prioritization logic

Top-to-bottom priority:

1. **Orientation strip**: what changed since the operator last looked
2. **Risk now**: top exposure queue and high-attention banner in surge mode
3. **Explainability**: why the selected item is ranked where it is
4. **Execution**: live campaign state and notes
5. **Operational queue**: semantic table for broad backlog review
6. **Proof**: trend and audit context

Prioritization logic shown in-product:

- exploitability evidence: KEV, EPSS
- reachability and external exposure
- identity path risk
- critical service impact
- remediation effort / batching feasibility

## Visualization choices

- Scorecards for orientation because they are scannable at a glance.
- Ranked cards for attack paths because the user is making comparative decisions, not reading raw logs.
- Composition bars for score breakdown because they make explainability concrete without pretending statistical precision.
- Simple bar-trend strips for burn-down because they work well in dense spaces and remain legible on mobile.
- Real tables for remediation queues because the user must compare fields across rows.

## Design system direction

### Look and feel

- warm light control-room palette rather than default dark SOC styling
- editorial serif headings paired with compact operational sans and mono labels
- parchment / graphite / rust / signal-green color direction
- subtle grid and radial background textures to avoid flatness

### Typography

- headings: serif stack to make the product feel more deliberate and productized
- operational labels: mono or condensed feel through existing mono variable
- body text: route inherits app sans for readability

### Density

- dense but breathable
- strong card borders and section labels
- mobile collapses side-by-side panels into a linear narrative instead of tiny columns

### Color semantics

- rust / ember for urgent risk
- ochre for caution and validation
- green for verified reduction
- slate for neutral system state

## Component behavior

- Exposure cards must show rank, service, owner, severity, and top rationale without opening the detail view.
- Selected cards gain a pronounced border and shadow shift.
- Campaign cards must display status as an operational state, not decorative tag noise.
- Notes area should feel like part of the workflow and persist locally.
- Quiet mode should render a reassuring empty state with proof that the system is healthy, not broken.

## Responsive behavior

### Desktop

- three-column hero workspace on `Operate`
- scorecards in four-up layout
- backlog table visible without collapsing field relationships

### Mobile

- header stacks
- tabs remain prominent
- exposure queue becomes horizontal-free vertical cards
- detail and campaign panels follow the selected item sequentially
- proof visuals switch to single-column strips with hidden accessible data tables preserved

## Accessibility

- all charts include plain-language summaries
- queue uses semantic table markup with caption and scoped headers
- selected-state contrast does not rely on color alone
- interactive chips and buttons stay keyboard reachable
- demo notices remain visible and not buried in tooltips

## Loading, empty, and error states

- No true network loading is required in the benchmark demo, so the implementation focuses on:
  - normal state
  - quiet empty state
  - high-attention surge state
- Empty state must still surface proof, last review, and guardrails.
- Surge state adds a top banner and more severe visual weighting, but does not change layout structure enough to disorient users.

## Interaction feedback

- status changes should update immediately
- notes save implicitly through local persistence
- selected exposure should remain stable when possible across state changes
- “mark reviewed” should acknowledge session progress without hiding risk

## How the implementation demonstrates the differentiator

The differentiator is not “more findings” or “more integrations.” It is that Chokepoint acts like an exposure-operations layer:

- The landing view is exposure-path-first.
- Every important record explains its score and expected effect of remediation.
- Work is converted into campaigns, not left as isolated alerts.
- Proof and verification are visible peers to prioritization, not afterthoughts.

If the implementation succeeds, the user should immediately understand that this product is about **operationalizing risk reduction** rather than merely observing risk.
