# Patchline Design Specification

## Information Architecture

Primary navigation:

- Exposure queue: ranked work list and filters.
- Mobilize: owner, state, decision note, and handoff action.
- Evidence graph: risk drivers, attack path, source evidence, remediation.
- Program metrics: burn-down and integration freshness.

The desktop layout keeps the queue, selected exposure evidence, and mobilization controls visible together. This supports the main job: decide, explain, and assign without page hopping.

## Critical Journeys

### Triage the top exposure

User lands on the queue, sees critical count, selects the top row, reviews score drivers and evidence, then confirms whether it deserves immediate action.

States:

- High attention: critical risk score, KEV/ransomware/external exposure indicators.
- Normal: high or elevated risk with fewer urgent drivers.
- Empty: filter returns no matching exposures and explains how to recover.

### Mobilize an owner

User selects an exposure, changes owner if needed, adds a note, and prepares handoff. Demo state persists in localStorage to make the workflow tangible.

### Accept or mitigate risk

User changes status to accepted or mitigated. Accepted risk can be hidden by default but included with a filter, preventing risk acceptance from disappearing.

## Dashboard Hierarchy

Priority order:

1. What requires attention now: header and KPI strip.
2. What to work: ranked queue.
3. Why this matters: selected exposure detail, risk drivers, attack path, evidence.
4. Who owns it: mobilization panel.
5. Whether the program is improving: compact trend and integration freshness.

Prioritization logic shown in UI:

- Active exploitation or KEV evidence.
- Exploit probability.
- Internet exposure.
- Business service/data sensitivity.
- Identity or blast-radius reach.
- Ransomware association.
- Owner and SLA readiness.

## Visualization Choices

Ranked queue: best for operational triage where order matters more than distribution.

Risk driver cards: make the score explainable and easy to challenge.

Attack-path chain: shows why a vulnerability or misconfiguration matters in this environment.

Compact bar trend: communicates direction of high-attention exposure load without occupying primary workflow space.

Integration freshness list: trust cue for whether source data is current enough for decisions.

## Design System Direction

Tone: quiet, operational, and dense. The product is for repeated security work, not marketing.

Typography: inherited sans for most text, mono only for record ids. Heading scale is strong on desktop but constrained inside panels.

Color semantics:

- Deep green sidebar for stable security context.
- Lime accent only for brand signal.
- Red for critical exploitation risk.
- Amber for high risk or ownership warnings.
- Blue for accepted/neutral program signals.
- Green for positive progress.

Components:

- Buttons use icons when actions benefit from fast scanning.
- Segmented control switches queue views.
- Select controls handle owner/status.
- Checkbox exposes accepted-risk filter.
- Textarea captures decision notes.
- Cards are used only for repeated items and framed tool panels.

## Responsive Behavior

Desktop around 1440x900:

- Three-column workflow: queue, evidence, mobilization.
- KPI strip spans top.
- Sidebar remains fixed for context.

Tablet:

- Sidebar becomes top section.
- Detail panel moves above queue/action panels.

Mobile around 375x812:

- Single-column layout.
- Navigation stacks.
- Queue rows wrap status below content.
- Buttons wrap to full available width.
- Attack path becomes vertical cards.
- No horizontal tables or overflow-prone grids.

## Accessibility

- Descriptive page title from route metadata.
- Semantic `main`, `aside`, `nav`, `section`, labels, buttons, inputs, and selects.
- Color is reinforced with text labels and risk numbers.
- Focusable controls are native elements.
- Contrast uses dark text on light panels and white text on dark risk chips.
- No motion-dependent interactions.

## Loading, Empty, Error, and Feedback States

Loading: demo is static, so there is no remote loading state. A production version would skeleton the queue and show integration freshness.

Empty: queue displays an empty state when filters exclude all visible exposures.

Error: production integrations would show stale/error badges and disable automated handoff when evidence is stale. Demo represents source freshness as "Demo import/writeback."

Feedback: owner/status/note changes persist locally. Handoff preparation writes a visible note and advances state when possible.

## Demonstrating the Differentiator

The implementation demonstrates Patchline’s differentiator by connecting every exposure to:

- Ranked risk.
- Evidence and score rationale.
- Environment-specific attack path.
- Business service and owner.
- Recommended fix.
- Handoff and state progression.

This makes the demo a coherent exposure-management workflow rather than a static collection of cybersecurity widgets.
