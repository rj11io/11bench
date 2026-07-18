# Design Specification: Strata

## Information architecture

Primary navigation stays within one route but divides the page into four operational bands:

1. Command bar: product identity, demo-data notice, role switch, and snapshot freshness.
2. Posture overview: compressed KPI cards for attack paths, choke points, crown-jewel exposure, and SLA pressure.
3. Operational workspace: priority queue on the left and selected exposure detail on the right.
4. Campaign rail and activity stream: active remediation work plus trust-building history.

This structure reflects the product thesis: compress, explain, mobilize, verify.

## Critical journeys

### Journey 1: Decide what to fix

- User scans headline metrics.
- User uses environment or status filters.
- User reviews ranked cards with visible rationale chips.
- User opens one card to inspect blast radius and affected assets.

### Journey 2: Mobilize remediation

- User starts a campaign from the selected exposure.
- User sets owner and due date in-place.
- UI immediately shows expected path reduction and task checklist.

### Journey 3: Verify progress

- User updates campaign state to verification or done.
- Metric cards and queue counts update.
- Activity feed documents the action.

## Hierarchy and prioritization logic

- The first screen should answer "Where is the highest leverage risk?" not "How many findings exist?"
- High-attention exposures surface first via color, score, and crown-jewel context.
- Queue cards emphasize fix package and blast radius before technical exhaust.
- Detail view uses a compact step path with controls and remediation tasks to maintain operator trust.

## Visualization choices

- KPI cards: single-value compression for posture.
- Horizontal urgency bars: good for comparing score, exposure age, and path count in limited width.
- Attack path strip: a readable linear path instead of a complex graph canvas; better for responsiveness and credibility in a seeded demo.
- Mini trend bars: show week-over-week pressure without needing full chart chrome.
- Native table for campaign tasks / asset list: preserves semantics and keyboard navigation.

## Design system direction

Visual direction: mission-control editorial rather than neon-hacker parody.

- Typography: condensed display feeling for numeric headers, sturdy sans for operations text.
- Color semantics:
  - `ink`: deep blue-black foundation
  - `signal`: warm amber for attention
  - `danger`: coral-red for urgent exploitable risk
  - `safe`: muted teal for mitigated state
  - `cloud`: cool slate for neutral containers
- Density: high information density with generous grouping, not cramped widget soup.
- Surfaces: layered panels with subtle gradients and hard borders to evoke operational confidence.

## Component behavior

- Queue cards are selectable buttons with visible keyboard focus.
- Filter chips toggle state and show counts.
- Campaign controls are inline and optimistic, with local persistence.
- Notes field saves locally and stamps the activity feed.
- Empty states appear when filters remove all matching exposures.
- High-attention state uses stronger contrast and stronger border accent, not animation overload.

## Responsive behavior

- Desktop: two-column workspace with sticky detail panel.
- Tablet: stacked workspace with detail following queue.
- Mobile: KPI cards collapse into a two-column grid; queue becomes primary; detail and campaigns stack below.
- No horizontal overflow. Tables convert to card-like stacked rows through CSS on narrow screens.

## Accessibility

- Page title and H1 are descriptive for route announcements.
- Reduced-motion users should not lose information; transitions stay subtle.
- Color is never the sole carrier of status; labels and icons back it up.
- Tables remain semantic with headers.
- Focus rings are high-contrast and visible against dark surfaces.
- Demo banner clearly states seeded data and avoids deceptive production language.

## Loading, empty, and error states

- Loading state is not necessary in seeded demo, but components visually imply snapshot freshness instead of pretending to stream.
- Empty queue state explicitly explains whether all items are mitigated or filters are excluding them.
- Error-like state is represented as "connector lag / weak confidence" chips on lower-confidence exposures.

## How the implementation demonstrates the differentiator

The implementation does not try to mimic a full platform. It demonstrates the differentiator by making the main interaction "launch a remediation campaign from a choke point" and by visibly reducing the queue and posture metrics as the operator acts. That shows Strata as a system of action rather than another dashboard of security numbers.
