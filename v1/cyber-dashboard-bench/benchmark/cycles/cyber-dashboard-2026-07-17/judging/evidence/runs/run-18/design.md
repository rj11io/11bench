# Design spec - Chokepoint

## 1. Product framing

Chokepoint is designed as a remediation cockpit, not a passive dashboard. The visual system should make one idea obvious within seconds:

- fix the few attack paths that meaningfully reduce business risk.

The interface should feel like an operational planning tool for cloud exposure missions:

- compact
- evidence-rich
- calm by default
- sharply escalatory when SLA or crown-jewel risk is breached

## 2. Information architecture

### Primary navigation

Use route-local tab navigation with four sections:

- Overview
- Missions
- Owners
- Audit

### Section purpose

#### Overview

- Risk load snapshot
- Burn-down trend
- Top choke points
- Entry-point distribution
- High-attention callout

#### Missions

- Ranked queue
- Search and state filters
- Desktop table plus mobile card list
- Detail panel for selected mission

#### Owners

- Team queues
- SLA pressure by team
- Coverage confidence
- Unassigned or ambiguous ownership warnings

#### Audit

- Chronological event log
- Reopen visibility
- Exception rationale trail

## 3. Critical journeys

### Journey A: Triage the day

1. User lands on Overview.
2. They see the top breached or highest-risk missions.
3. They move into Missions and select the top mission.
4. They review why it is prioritized and decide on next action.

Success condition:

- The user can explain the top mission in under 30 seconds.

### Journey B: Hand off a mission

1. User selects a mission with owner ambiguity or no owner.
2. They assign a team.
3. They move it to "Owner notified" or "Fix in progress."
4. The queue, owner view, and audit log all update.

Success condition:

- Ownership and workflow state are reflected consistently everywhere.

### Journey C: Prove burn-down

1. User resolves or suppresses a mission.
2. Overview metrics update immediately.
3. Trend and counts reflect changed risk posture.
4. Audit trail records the action with timestamp and actor.

Success condition:

- The dashboard gives immediate feedback that a real operational decision happened.

## 4. Prioritization logic in the UI

The hierarchy is:

1. Missions with breached SLA and crown-jewel impact
2. Missions on internet-reachable paths with strong exploit signals
3. Missions with identity pivot plus sensitive data target
4. Missions already assigned and in progress
5. Accepted exceptions and resolved work

Every selected mission should show its score decomposition:

- exploitability
- blast radius
- business impact
- control gap

This makes the system explainable and prevents "mystery ranking."

## 5. Visualization choices

### Risk status bar

- A segmented bar communicates current workload mix across states.
- Chosen because the user needs proportions fast, not analytical precision.

### Burn-down trend

- A compact line or sparkline communicates change over time.
- Chosen because trend matters more than exact point comparison.

### Choke-point ranking

- Horizontal bars communicate concentration around shared pivots.
- Chosen because ranked comparison is the primary question.

### Mission queue

- Semantic table on desktop for dense scanning
- Card list on mobile for readable stacking

### Attack path strip

- A horizontal path of nodes and edges inside the detail panel
- Chosen because the differentiator is not just score but the chain from entry point to crown jewel

### Why not use

- Radar charts: too interpretive
- Pie charts: poor for ranked operational comparison
- Decorative network hairballs: visually impressive but low-value for action

## 6. Layout strategy

### Desktop

- Top utility bar with demo notice and reset action
- Hero header with product thesis and counts
- Main content as two-column mission workspace in the Missions tab
- Left column for queue and filters
- Right column for selected mission detail

### Mobile

- Tabs become horizontally scrollable pills
- Filters stack above the queue
- Selected mission detail appears below the queue instead of as a side-by-side panel
- Sticky action area appears near the selected mission summary

## 7. Design system direction

### Visual language

- Light operational canvas with dark inset panels for high-focus areas
- Safety colors used semantically, never decoratively
- Monospace accents for IDs, scores, and timestamps
- Tight but breathable spacing to support dense scanning

### Typography

- Use the existing global sans family for readability
- Use mono styling for system metadata
- Headlines should be compact and directive, not marketing-heavy

### Color semantics

- Ink navy for structure and detail panels
- Warm sand or mist background for contrast against risk surfaces
- Red-orange for breached urgency
- Amber for warning and owner-notified states
- Teal or green for resolved states
- Slate for accepted exception or suppressed states

### Density

- Compact rows with strong grouping
- Avoid giant empty cards
- Preserve enough whitespace to separate mission summary, evidence, and actions

## 8. Component behavior

### Filters

- State chips toggle quickly
- Search narrows queue content without affecting detail state until selection changes

### Queue rows

- Entire row is readable and keyboard reachable
- Selected row receives a strong visual anchor
- Risk score and SLA pressure are visible before opening detail

### Detail panel

- Shows mission summary first
- Then attack path
- Then evidence and fix bundle
- Then workflow actions
- Then audit context

### Workflow buttons

- Notify owner
- Start fix
- Resolve
- Accept exception
- Reset demo data

Buttons should provide immediate visual confirmation.

## 9. States

### Normal state

- Multiple active missions, one selected, healthy overview data

### High-attention state

- At least one breached SLA mission
- Breach banner at overview
- Risk badge and due-date styling intensified

### Empty state

- A filter combination yields no missions
- Copy should say the queue is clear for that view, not that the app failed

### Accepted-exception state

- Mission remains visible in lower-priority views
- Rationale and reviewer stay visible

### Loading and error handling

- Because the demo is seeded client-side, loading should be minimal
- Any localStorage parse failure should safely fall back to seed data
- Error copy should frame this as a demo-state reset, not a production incident

## 10. Accessibility

### Requirements

- Keyboard-reachable tabs, filters, rows, and action buttons
- Real table semantics on desktop queue
- Clear visible focus states
- Text labels on color-coded states
- Chart meaning available in prose, not only visual encoding
- No horizontal overflow on mobile

### Specific implementation guidance

- Use `caption`, `th`, and `scope` on tabular structures where appropriate
- Avoid custom ARIA data-grid behavior in v1
- Keep attack-path nodes understandable in reading order

## 11. Persistence and feedback

Persist in localStorage:

- Workflow state per mission
- Owner assignment per mission
- Selected mission
- Audit events appended during the session

Feedback expectations:

- State change updates overview metrics immediately
- Audit log adds a new item
- Selected mission stays in context after action
- Reset action restores seed data and clears session changes

## 12. How the implementation demonstrates the differentiator

The demo must prove the thesis in concrete UI terms:

- The queue is mission-based, not raw-finding-based.
- The detail view explains a toxic combination path end to end.
- Actions are about owner handoff and remediation progress, not just acknowledgment.
- Overview metrics show concentration and burn-down, not vanity charts.
- The product labels simulated exposure clearly so trust is preserved.

If these are visible and interactive, the route demonstrates the core product wedge successfully.
