# Breakline design specification

## 1. Experience intent

Breakline should feel like a calm operational briefing, not a wall of alarms.
The user opens it to answer one question:

> What is the smallest safe change we should make next, and how much reachable
> exposure will it remove?

The product’s visual character is precise, sober, and collaborative. It uses a
light workspace for legibility, a deep ink navigation rail, and restrained
semantic color. The hierarchy moves from attention state to outcome to work.

## 2. Information architecture

### Primary navigation

1. **Command** — daily brief, outcome trend, priority missions, team focus, and
   policy attention.
2. **Missions** — full queue with search, filters, saved views, lifecycle, and
   bulk ownership actions.
3. **Coverage** — connected sources, freshness, scope, ownership coverage, and
   missing evidence.
4. **Reports** — operational and leadership outcome views.

Secondary navigation in the profile/workspace menu:

- Critical services
- Policies
- Remediation templates
- Team and permissions
- Audit log
- Settings
- Reset seeded demo

### Page structure

Desktop:

- 228px fixed left rail.
- 64px top utility bar.
- Flexible main canvas constrained to approximately 1480px.
- Mission detail is a 560–640px right sheet above the canvas.

Mobile:

- Compact 58px top bar with wordmark, demo label, and utility menu.
- Single-column content.
- Fixed four-item bottom navigation.
- Mission detail becomes a full-viewport dialog/sheet.

### Object hierarchy

`Organization → Source / Service / Owner → Attack path → Break point → Mission → Verification`

Users usually enter through a mission. Paths and raw findings are supporting
evidence, not top-level destinations in the demo.

## 3. Critical journeys

### Journey 1: Choose the next mission

1. User lands on Command.
2. A high-attention strip appears only if a policy deadline or data-quality
   issue needs intervention.
3. Hero statement summarizes leverage: “4 fixes can break 23 paths.”
4. Four KPI cards show reachable critical paths, active missions, ownership
   coverage, and median verification time.
5. Priority mission list ranks owner-ready work.
6. User searches, filters, or opens a mission.

Design requirement: the first viewport at 1440×900 must show the hero, KPI row,
the start of the mission queue, and the path trend. The action queue is not
buried below decorative charts.

### Journey 2: Understand “why now”

1. User opens a mission.
2. Header states action decision, expected path reduction, deadline, owner, and
   demo status.
3. “Why now” factor bars separate:
   - observed exploit evidence;
   - internet/runtime reachability;
   - privilege/lateral movement;
   - target/business impact.
4. Each factor has a source badge and freshness.
5. Missing/stale evidence is visibly different from low evidence.

Design requirement: never collapse all reasoning into one gauge. The
composite priority can be shown, but individual factors and policy action remain
primary.

### Journey 3: Inspect and break the path

1. User selects Path.
2. Desktop shows a horizontal node-link narrative from origin to critical target.
3. The recommended break node/edge is emphasized with a labeled “Fastest break”
   marker.
4. Mobile converts this to a vertical sequence with connective rules.
5. User selects Fix to review change, affected resources, expected paths removed,
   effort, rollback, alternatives, and verification.

Design requirement: the graph must answer how the exposure chains together. It
must not be a force-directed hairball or require panning for the seeded path.

### Journey 4: Start, submit, and verify

1. Proposed mission primary action is **Start mission**.
2. In progress primary action is **Submit for verification**.
3. In review primary action is **Verify demo fix**.
4. Verified primary action becomes **View evidence** and displays paths removed.
5. A compact confirmation/toast and timeline event acknowledge every transition.
6. State persists after reload.

Design requirement: buttons explicitly say the action is simulated in nearby
copy. The product never suggests a cloud change has occurred.

### Journey 5: Resolve an ownership gap

1. Unassigned mission uses a neutral “Needs owner” label, not a red critical
   status.
2. User opens the mission and chooses an inferred team.
3. UI explains which tags/repository mapping produced the suggestion.
4. Assignment updates queue and local state.

### Journey 6: Inspect integration health

1. User opens Coverage.
2. Healthy AWS and finding sources show scope and recent timestamp.
3. GitHub ownership appears stale.
4. Azure/GCP appear not connected.
5. The page separates data freshness from security posture; a connector error
   does not masquerade as a risk increase.

## 4. Dashboard hierarchy and prioritization

### Layer 1: Attention

A narrow strip directly under the utility bar appears for:

- action policy breached;
- verification failed;
- critical evidence stale;
- material scope disconnected.

It contains one sentence, exact object count, and one action. It uses an icon and
label in addition to color.

### Layer 2: Outcome

The hero contains:

- eyebrow: environment/time context;
- headline: number of top fixes and paths expected removed;
- supporting sentence describing critical targets protected;
- scenario control and optional queue action.

The hero avoids an abstract “security score.”

### Layer 3: Decision metrics

Four compact cards:

1. Reachable critical paths, including seven-day delta.
2. Missions in action, segmented by lifecycle in text.
3. Ownership coverage, with gap count.
4. Median verification time, with target.

Cards use exact numbers, brief comparison, and tiny sparklines/progress only
where they add meaning.

### Layer 4: Work and trend

The main grid is approximately 1.55:1:

- left: priority mission queue;
- right: reachable critical paths trend and team focus.

The mission queue has greater area because it is the primary action surface.

### Ranking presentation

Each mission row/card shows:

- action label and mission ID;
- plain-language change;
- affected service/environment;
- paths expected removed;
- critical target count;
- effort estimate;
- owner;
- policy deadline;
- lifecycle status;
- a chevron/open action.

The rank is not presented as infallible. Detail shows the factors and
alternatives.

### Scenario states

- **High attention (default):** one breached action policy, urgent mission at
  top, coral attention strip.
- **Normal:** no breach; smaller active queue; blue informational strip or no
  strip; metrics show controlled improvement.
- **All clear:** no active actionable missions; teal success summary and a
  designed empty queue with links to verified missions and coverage review.

The scenario selector is labeled “Demo scenario,” stored only for the session,
and does not alter production claims.

## 5. Visualization choices

### Reachable-path trend

**Type:** monotone line/area chart with seven weekly points and a labeled target.

**Why:** the question is whether active reachable critical paths are moving
toward the target. The line preserves direction without implying category
composition.

**Rules**

- Exact current value and delta appear in text above the chart.
- Y-axis begins at zero in the production version; the compact demo may suppress
  labels but retains a visible baseline and textual values.
- Target is a dashed neutral line with label.
- Teal is used for improvement; coral only for values above an explicit action
  threshold.
- Tooltip shows date and exact count.
- Screen-reader summary: current count, period change, best/worst value.

### Factor explanation

**Type:** four horizontal bars on the same 0–100 evidence-strength scale.

**Why:** users need to compare independent inputs. Bars are easier to compare
than radial gauges, and labels can hold source/freshness metadata.

**Rules**

- Bar length is redundant with numeric value and plain-language state.
- Factor colors are mostly one accent; semantic warning appears on stale/missing,
  not simply on high risk.
- A “How this was decided” note names the policy version.

### Attack path

**Type:** deterministic node-link sequence with grouped node types.

Node treatments:

- origin/external: globe icon, neutral dark;
- compute/workload: server icon, blue;
- identity: key icon, violet;
- critical data/service: database/shield icon, warm dark;
- recommended break: teal ring and callout;
- dangerous edge: coral arrow/label.

**Why:** the sequence explains reachability and trust. Only the selected path is
shown; related paths are summarized in a count.

### Team focus

**Type:** short ranked list with owner avatar/initials, active mission count, and
policy state.

**Why:** exact accountability matters more than a categorical pie chart.

## 6. Design system direction

### Visual language

- Operational, quiet, high-contrast.
- Flat surfaces with one-pixel borders and minimal shadow.
- Medium corner radius (10–14px), not pill-heavy.
- Pills reserved for compact state labels, sources, and filters.
- Dense but breathable: 12–14px metadata, 14–16px body, 28–38px hero.

### Color tokens

Light workspace:

- Canvas: `#F4F6F2`
- Surface: `#FFFFFF`
- Surface subdued: `#EEF1EC`
- Ink: `#12201D`
- Muted ink: `#64706C`
- Border: `#DCE2DD`

Navigation:

- Rail: `#0B1715`
- Rail raised: `#12231F`
- Rail text: `#EAF1ED`
- Rail muted: `#8FA39D`

Semantic:

- Teal / verified / primary: `#087F6B`
- Teal pale: `#E3F3EE`
- Coral / action breached: `#C84A3D`
- Coral pale: `#FAE9E6`
- Amber / due soon: `#B36A08`
- Amber pale: `#FAF0D8`
- Blue / information: `#3468A8`
- Blue pale: `#E8F0FA`
- Violet / identity: `#6D5BA8`

Color semantics are consistent and never substitute for labels.

### Typography

Use the baseline Inter variable for UI and headings and Geist Mono for:

- mission IDs;
- ATT&CK technique IDs;
- source timestamps;
- resource identifiers;
- compact metric labels where alignment matters.

Heading style is sentence case. Numeric metrics use tabular figures.

### Spacing and density

- 4px base grid.
- Page gutter: 28px desktop, 16px tablet/mobile.
- Card padding: 18–20px desktop, 14–16px mobile.
- Mission row minimum height: 76px desktop; card content expands naturally on
  mobile.
- Interactive target: ≥ 40px desktop and ≥ 44px mobile for primary controls.

### Component behavior

**Buttons**

- Primary teal fill for the single next action.
- Secondary white/border for reversible navigation.
- Quiet/text button for low-priority utilities.
- Destructive coral only for destructive operations, not “urgent security.”

**Badges**

- Include text and optional icon/dot.
- Severity/action and lifecycle are distinct badge groups.

**Filters**

- Search field plus high-value quick filters.
- Active filters appear as removable chips.
- Mobile opens a bottom sheet; the demo can use a compact row that wraps.

**Cards/rows**

- Entire mission row is clickable, with a visible focus state.
- Nested action buttons stop row activation.
- Hover changes border/background slightly; no large lift animation.

**Sheet/dialog**

- Traps focus, closes with Escape, has explicit close label, restores focus.
- Desktop sheet leaves enough background context to preserve queue location.
- Mobile is full screen and does not create sideways scroll.

## 7. Responsive specification

### ≥ 1200px

- Full rail and top utility bar.
- 4-column KPI grid.
- Two-column main grid.
- Horizontal path.
- Right detail sheet approximately min(620px, 46vw).

### 768–1199px

- Rail collapses to 76px icon rail or hides behind menu.
- 2×2 KPI grid.
- Main sections stack.
- Mission metadata reduces to top six fields.

### < 768px

- No desktop rail.
- Bottom navigation.
- Hero actions stack; scenario control scrolls internally only if necessary.
- KPI cards become a 2-column grid; at 375px they remain readable with compact
  values.
- Mission list is cards; no table or page-level horizontal scrolling.
- Trend chart uses reduced ticks and 160–190px height.
- Team focus moves below the queue.
- Detail sheet is full viewport with sticky header and action footer.
- Path is vertical.

### 375×812 target

First screen shows:

- compact header with demo label;
- scenario/high-attention strip;
- hero statement;
- first two KPIs;
- start of next section after a short scroll.

Bottom navigation uses safe-area padding. Content bottom padding prevents it from
being obscured.

## 8. Accessibility

- One `h1` per view; hierarchical `h2`/`h3`.
- `nav`, `main`, `section`, and `aside/dialog` landmarks.
- Skip link to main content.
- Buttons use accessible names; icon-only controls have `aria-label`.
- Mission rows are native buttons or links, not clickable `div`s.
- Tabs follow the ARIA tab pattern; arrow-key behavior is optional for the demo
  but focus and selected state are explicit.
- Dialog uses `role="dialog"`, `aria-modal`, title/description association, focus
  trap, Escape handling, and focus return.
- Status is icon + text + color.
- Minimum 4.5:1 body text contrast; key borders/focus indicators meet non-text
  contrast.
- `:focus-visible` uses a 2–3px outline separated from component border.
- Dynamic status updates use a polite live region.
- Chart has an adjacent textual summary and is marked decorative where the text
  fully substitutes.
- Animations are short (120–180ms) and removed with
  `prefers-reduced-motion: reduce`.
- Content remains functional at 200% zoom and with increased text spacing.

## 9. Loading, empty, error, and edge states

### Loading

- Skeletons preserve card and queue geometry.
- Source collection progress says which scope is being processed.
- A mission can show stale prior evidence while refresh runs, clearly labeled.
- No indefinite generic spinner without context.

### Empty

**All-clear queue**

- Shield/check illustration made from existing icons/CSS, not an image.
- “No active missions in this demo scenario.”
- Explain what can still be done: review verified work, coverage, or restore
  seeded high-attention state.

**No filter results**

- Name search/filter state.
- One-click clear.
- Do not use the celebratory all-clear language.

**New connection**

- Explain expected collection time and next onboarding action.

### Error

- Connector card states exact source, last good data, failure class, and retry or
  configuration action.
- Mission recommendation remains viewable if backed by prior data, with stale
  warning.
- Verification failure explains whether the condition remains, evidence is
  stale, or collection failed.

### Permission

- Disabled actions say which role/approval is required.
- Do not hide risk acceptance from unauthorized users if its existence helps
  explain workflow; hide sensitive data fields where required.

## 10. Interaction feedback and persistence

- Scenario changes update summary, attention strip, queue, and metrics
  immediately.
- Search filters as the user types.
- Mission click opens detail without page navigation.
- Lifecycle action updates the sheet and underlying queue atomically.
- A polite live region announces “Mission M-1042 moved to In progress,” etc.
- Local storage key is versioned and contains only mission status/owner and
  scenario preferences.
- Reset requires one confirmation in production; demo uses a clearly labeled
  reset utility and toast.
- No optimistic claim of verification before the simulated verification action
  completes.

## 11. Demo data and content rules

- Persistent top-level badge: **Seeded demo data**.
- Utility text: “No live cloud or ticketing systems are connected.”
- Integration cards use “Demo connection” and “Not connected.”
- Mission actions use “simulated” in explanatory copy.
- Product copy uses “expected to break 11 paths” before verification and “11
  demo paths marked prevented” after simulated verification.
- Sources displayed inside the product are a demo signal snapshot, not a claim
  of current threat status.
- Resource names are invented but plausible and avoid real customer names.

## 12. How the implementation proves the differentiator

The implementation must make the following sequence visible and interactive:

1. The home summary compresses many findings into a few fixes and quantifies
   expected path reduction.
2. A mission shows independent source-backed reasons instead of only a severity
   number.
3. The path calls out the fastest break point.
4. The Fix view translates security evidence into a small change with effort,
   alternatives, rollback, owner, and verification.
5. Lifecycle actions update the operational queue and persist.
6. Simulated verification changes the outcome from expected to prevented.
7. Scenario states demonstrate that Breakline can be urgent without being
   perpetually alarming.

If the evaluator remembers only one interaction, it should be opening the first
mission, seeing “patch one public workload → break 11 paths to two critical
services,” then moving it through the evidence-backed workflow.

