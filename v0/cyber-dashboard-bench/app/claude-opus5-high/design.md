# Design — Assay

Design specification for the detection assurance console described in
[`prd.md`](./prd.md). Research citations refer to sections of
[`research.md`](./research.md).

---

## 1. The one thing this design has to do

The product's claim is *unverified is not covered*. So the interface has one job
above all others: **make the difference between "proven" and "assumed" impossible
to miss, and impossible to accidentally round up.**

Every decision below is checked against that. Where a conventional dashboard
pattern would blur the two — a single coverage percentage, a green heatmap cell, a
progress ring — the pattern is rejected, not restyled.

Three rules fall out of it, and they govern the whole system:

1. **A number never appears without its basis.** Any figure on screen can be
   expanded, in at most two clicks, into the inputs it came from.
2. **Colour never carries a quantity.** It carries the assurance state, which is a
   category. Every state also has a glyph and a word, so the console reads in
   greyscale ([research §12, §13](./research.md)).
3. **Absence is drawn.** A technique with no detection is not an empty cell. It is a
   hatched cell that says `⋯ blind`, because an empty cell reads as fine.

---

## 2. Information architecture

Four surfaces. The split is deliberate: **operational** views answer "what do I do
now", **analytical** views answer "where do we stand and how did it change"
([research §12](./research.md)). Mixing them is what makes most security dashboards
useless for both.

```
Assay  ·  demo tenant: Northwind Financial
│
├── Assurance          [operational · default]
│     Service level status · four honest counters
│     The ranked assurance queue
│     Right rail: service level burn-down · telemetry health ·
│                 state composition · data sources (all fixtures)
│
├── Coverage           [analytical]
│     Technique landscape by ATT&CK tactic, coloured by assurance state
│     Filters: tier · state · legend acts as a state filter
│
├── Scenarios          [decision support]
│     "Would we have caught this?" — three published attack chains
│     Per-step assurance, plus a verdict written in words
│
└── Report             [governance]
      Generated assurance report · accepted-gap register with expiries
      · append-only audit log
```

**Global chrome, present on every surface**

- Brand and tenant name (both clearly labelled demo).
- Tab navigation — four items, current tab marked with `aria-current="page"`.
- Command palette trigger (`⌘K` / `Ctrl+K`).
- Density toggle (comfortable / compact).
- Light/dark toggle.
- **Role switcher** — engineer / manager / auditor. This is not a demo gimmick; it
  is how the permission model is made visible (§7.4).
- **Demo-data notice** — a persistent bar, never dismissible.

**Cross-cutting surface: the evidence drawer.** Opens over any view, from the
queue, the matrix, or a scenario step. It is the same component everywhere, because
"the evidence for this technique" is one idea.

### 2.1 Why not a sidebar

A left sidebar costs 220px of horizontal room, and the queue and the matrix both
want that room. Four destinations do not need a sidebar. Top tabs cost 40px of
vertical space and collapse cleanly to a scrollable segmented control on a phone.

---

## 3. Critical journeys and every state they pass through

### J1 — Monday triage (the primary journey)

| Step | What the user sees | State shown |
| --- | --- | --- |
| 1. Land | Incident banner: Okta System Log silent 6 days, 9 analytics affected, 8 techniques downgraded. Counters read 38% verified against 84% claimed. | **High attention** |
| 2. Scan | Queue ranked by priority — 29 open findings. Top item is `T1078.004 Valid Accounts: Cloud Accounts`, broken, priority 63.4. | Normal |
| 3. Open | Drawer: four evidence panels stacked — content, telemetry, validation, fidelity. Telemetry panel is the one that is red, and says why. | Normal |
| 4. Check the rank | "Why this rank" expands into four terms, each with its value, its source, and the running score after it — `100 × 1.00 × 0.80 × 0.90 × 0.88 = 63.4`. | Normal |
| 5. Decide | Assign · Validate · Accept. Each opens a small form in the drawer footer. | Normal |
| 6. Confirm | Row animates out of the open queue, counters step, burn-down redraws, audit entry appears, toast confirms with an undo path. | **Feedback** |

**Four interactions from cold load to a recorded decision.** That is the number the
design is tuned against.

### J2 — Silent telemetry, one fix, many findings

The banner's "Show affected" filters the queue to the eight findings blocked by
`okta-system-log`. The drawer for any of them shows a **blast radius** block naming
all eight and offering the one fix. Restoring the telemetry once clears all eight,
and the audit log records a single action with its fan-out listed. The interface says
this out loud before the click: *"Restoring `okta-system-log` clears all of them in
one action."*

**The part that proves the thesis:** those eight techniques do not turn green. They
turn *decaying* — the pipe is fixed, but the last passing test is still weeks old, so
the claim is not re-earned. Verified coverage moves 38% → 40%, not 38% → 54%. A tool
that counts content would have shown the bigger jump, and it would have been wrong.

### J3 — Accept a gap, with the approval actually enforced

As an **engineer**, "Accept gap" opens a form: reason (a fixed list), justification
(free text, required), expiry (date, capped at 90 days). Submitting creates a
*pending* acceptance and says plainly: *"Awaiting approval from someone other than
you."* The approve button is present and disabled, with the reason on it.

Switch the role to **manager** and the same pending acceptance can be approved. The
register now shows two names and two timestamps. Switch to **auditor** and every
write control on every surface is disabled with a reason.

This journey exists because a governance trail anyone can self-approve is worth
nothing to an auditor ([research §10](./research.md)).

### J4 — "Would we have caught it?"

Pick a chain. Read it left to right. Each step is a cell with its technique's live
state. Below it, a verdict in sentences — not a score — that names which steps are
proven, which are broken, and which were never tested. Fix a step and the verdict
sentence changes.

### J5 — Report out

The Report tab is already generated; there is no "run report" button, because a
report you have to remember to run is a report that does not get run. It states its
own scope and generation time, leads with what improved, then lists what is
outstanding, then the register, then the trail.

### 3.1 State coverage

Every one of these is reachable in the built demo.

| State | Where | How it is presented |
| --- | --- | --- |
| **High attention** | Default landing state | Incident banner with a left accent bar, an affected count, and one action. Not a full-screen alarm — the analyst still needs the rest of the page. |
| **Normal** | After acknowledging | Ranked queue, ordinary counters. |
| **Empty — queue cleared** | Every open finding decided | A worked-through state, not a shrug: says that decay refills the queue on a clock and points at the coverage map for what is closest to the edge. |
| **Empty — no filter matches** | Over-narrow filters | Distinguished from "cleared", names how many findings are open behind the filter, and offers exactly one action: clear filters. |
| **Empty — nothing assigned to you** | Tick "Mine" while owning nothing | Its own state rather than a filter shrug: how many findings are open across the team, and the note that unowned work is the normal starting point. |
| **Empty — register** | Report tab, register filtered to "Expired" | "Nothing has expired", plus the reason the list will not stay empty: acceptances revert on expiry and return to the queue. |
| **Empty — nothing connected** | Data-sources panel, always | A designed state, not a footer disclaimer: every connector is labelled a fixture, with what it is a fixture of. |
| **Loading** | First paint of the queue and the drawer | Skeleton rows that match the real row height so nothing shifts when data lands. |
| **Optimistic + settle** | Every decision | Row dims and marks immediately; the counters and chart step 220ms later so the change is legible as cause and effect. |
| **Blocked / not permitted** | Auditor role, or self-approval | Control stays visible and disabled, with the reason as its accessible label. Never hidden. |
| **Expiring soon** | Acceptance within 14 days of expiry | Amber marker in the register and a line in the report. |
| **Reverted** | Acceptance past expiry | Returns to its underlying state, re-enters the queue, audit entry written. |

---

## 4. Dashboard hierarchy and prioritisation logic

### 4.1 Reading order on the Assurance tab

The eye goes down the left and across the top, so that is where the load-bearing
content sits ([research §12](./research.md)).

```
┌──────────────────────────────────────────────────────┬──────────────────┐
│ [ incident banner — only when an incident is open ]  │                  │
├──────────────────────────────────────────────────────┤   RIGHT RAIL     │
│ 1  Four counters                                     │   336px          │
│    verified · assurance gap · broken · budget        │                  │
├──────────────────────────────────────────────────────┤ 5 Service level  │
│ 2  Queue toolbar: search · tier · state · tactic ·   │   + burn-down    │
│    mine                                              │ 6 Telemetry      │
├──────────────────────────────────────────────────────┤   health         │
│ 3  THE QUEUE — ranked, scrollable, keyboard-driven   │ 7 State          │
│    priority · technique · state · why · fix · owner  │   composition    │
│                                                      │ 8 Data sources   │
│ 4  Footer: counts, bulk actions when rows selected   │   (all fixtures) │
└──────────────────────────────────────────────────────┴──────────────────┘
```

The queue gets the most space because it is the product. The rail holds context that
changes slowly, ordered so the two panels someone would check on a phone — the
service level and telemetry health — come first. The rail keeps that order at every
width; below 1280px it simply moves under the queue and reflows into as many columns
as fit.

### 4.2 The four counters, and why these four

| Counter | Value | Why it earns a tile |
| --- | --- | --- |
| **Verified coverage** | `38%` with `19 of 50 techniques proven inside their freshness window` beneath | The only coverage number that means anything. |
| **Assurance gap** | `46 pts`, with two stacked bars — `claimed 84%` above `verified 38%` | The product's thesis as a number. The comparison is drawn inside the tile so it cannot be avoided. |
| **Broken dependencies** | `15` analytics that cannot fire, `3 silent log sources` | The actionable failure, and today's fire. Links straight into a filtered queue. |
| **Assurance budget** | `10 over` — `13 of 23 tier-1 techniques unverified · budget allows 3` | The service level's slack. In the seeded state it is already spent, which is the point: the number has to be allowed to read badly. |

Deliberately absent: total alert count, mean time to detect, a single "security
score". Each would be either noise or an unfalsifiable claim
([research §8, PRD §9.3](./prd.md)).

### 4.3 Queue ordering and its explanation

Rows are ordered by the score from [PRD §4.4](./prd.md):

```
priority = threatWeight × blastRadius × assuranceDeficit × effortFactor × 100
```

The score sits in the first column as a monospaced number with a small four-segment
bar beneath it. **The segments are the four terms**, widths proportional to each
term's contribution, in a fixed order and a fixed hue per term. So the bar is not
decoration — someone who reads the queue daily learns to see *why* an item is high
before opening it. "Threat-driven" and "cheap-fix-driven" items look different at a
glance.

Opening "Why this rank" gives the table: term, value, source, points. The four
point values sum to the displayed score, and that is stated on screen so a
sceptical user can check the arithmetic themselves ([research §7](./research.md)).

**Ties** break by state severity (blind → broken → assumed → decaying), then by
evidence age, then by technique ID, so ordering is stable across reloads. A queue
that reshuffles on refresh destroys the muscle memory of a daily user.

---

## 5. Visualisation choices

Chosen for how accurately people judge each visual encoding, following the
preattentive-attribute guidance in [research §12](./research.md). **No pie chart,
donut, gauge, tree map, or 3D anything appears anywhere in this product.**

| Where | Encoding | Why this one |
| --- | --- | --- |
| **Service level burn-down** | Line, verified % over 12 weeks, with a dashed reference line at the target | Position against a threshold is the easiest comparison the eye makes. "Are we above the line and heading up?" is answered without reading a number. |
| **State composition (now)** | Single horizontal stacked bar, 100%, with counts in a legend below | Length on a common baseline. One bar, six segments, no axis — a composition read in under a second. A donut of the same data would be strictly worse. |
| **State composition (history)** | Stacked area, 12 weeks, in the Report tab | Shows the shape that matters: *assumed* shrinking as *verified* grows. Area is acceptable here because the question is trend, not precise value, and the analytical tab is where exploration belongs. |
| **Log-source volume** | Hand-drawn SVG sparkline, 14 days, with a marker at the last event | Small multiples let ten sources be compared in one glance. A silent source shows a flat tail — a shape, which is preattentive, rather than a number to read. |
| **Priority contribution** | Four-segment horizontal bar, fixed term order | Turns an opaque score into a legible composition, and makes two items with the same score visibly different. |
| **Technique landscape** | Table-based matrix, one column per tactic, cell = assurance state | Not a chart. It is the map practitioners already think in, so keep it — but colour it by state, never by rule count ([research §4](./research.md)). |
| **Evidence age** | Number of days, plus a four-step freshness pip | Age is a fact, not a feeling. It is never hidden behind a hover. |
| **Attack chain** | Ordered strip of state cells with connectors | Sequence is spatial, so draw it spatially. The break in the chain is where the eye lands first. |

### 5.1 The matrix, specifically

The usual ATT&CK heatmap has two failure modes: it implies coverage is binary, and
it treats "never tested" as success ([research §4](./research.md)). This one fixes
both:

- Cells are coloured by **assurance state**, so *assumed* gets a deliberately dull,
  unrewarding slate — it can never read as a win.
- **Blind** cells carry a diagonal hatch, so absence survives greyscale and
  colour-blind viewing.
- Each cell shows the technique ID in mono plus the state glyph. At compact density
  the ID drops and the glyph stays; the glyph is the load-bearing part.
- Tier-1 techniques carry a thin top marker, so the columns that matter most are
  identifiable without a filter.
- The whole thing is a real `<table>`: one row per ATT&CK tactic, with the tactic
  name as a `<th scope="row">` carrying its own state-count bar and an `n/m verified`
  reading, and the techniques as focusable cells inside that row's single data cell.
  So the data exists as a table by construction — the accessibility recommendation
  from [research §13](./research.md) satisfied by structure rather than by a bolted-on
  alternative view. Each cell's accessible name states technique, name, state, and
  days since validation.
- **Clicking a state in the composition legend on the Assurance tab jumps here**
  with that state filtered. The composition covers the whole landscape including
  states that never appear in the open queue, so the legend belongs to the map.

---

## 6. Design system

### 6.1 Direction

**A dated instrument, not a glowing threat wall.** Every security product reaches
for neon-on-black and a world map with arcs. That aesthetic signals excitement,
which is precisely wrong for a product whose message is "calm down and check the
date". So: a quiet graphite console, generous use of hairlines instead of shadows,
monospaced numerals everywhere a number carries meaning, and colour spent only on
state. The one place saturation is allowed is the state palette, because state is
the only thing that should catch the eye.

Works in both light and dark; dark is what a SOC will use, so dark is where the
palette was tuned first.

### 6.2 Typography

| Role | Family | Detail |
| --- | --- | --- |
| Display — headings, tab labels, KPI figures | **Space Grotesk** (`--font-display`, loaded in the route layout) | Slightly technical grotesque. Tight tracking on large numerals. |
| Body — prose, form labels, table text | **Inter** (inherited from the root layout) | The workhorse. |
| Data — IDs, timestamps, counts, scores, paths | **Geist Mono** (`--font-mono`, inherited) | `font-variant-numeric: tabular-nums` everywhere, so columns of digits align and a change of one digit is visible. |

Scale: `11px` micro-label (uppercase, `0.08em` tracking) · `12px` dense table body ·
`13px` default body · `15px` panel title · `20px` counter value · `30px` hero
figure. Line height 1.45 for prose, 1.2 for figures.

Adding a third family is justified by one thing: an ID like `AN0042` and a
timestamp like `06:12 · 6d ago` must not be mistaken for prose. Mono does that
work, and Space Grotesk keeps headings from reading as more body text.

### 6.3 Colour semantics

State colour is the system's only strong colour. Each state has a foreground, a
tinted background at roughly 12–16% mix, and a border at roughly 35%.

| State | Glyph | Hue | Intent |
| --- | --- | --- | --- |
| Verified | `✓` | teal-green | Earned. The only state that is allowed to feel good. |
| Decaying | `◗` | amber | Was proven, now stale. A half-filled glyph, so the meaning is in the shape too. |
| Assumed | `○` | desaturated slate | **Deliberately unrewarding.** This is the state the industry miscounts as coverage; it must never look like success. |
| Broken | `✕` | red | Something failed. Today's work. |
| Blind | `⋯` | near-neutral violet + diagonal hatch | Nothing exists. Hatch makes absence visible without colour. |
| Accepted | `▣` | indigo, dashed border | A decision, not a fix. Dashed because it is temporary by construction. |

Supporting colour: a single cyan accent for interactive affordances — focus rings,
selected rows, active tab. Nothing else in the interface is cyan, so cyan always
means "you can act here".

**Contrast commitments** ([research §13](./research.md)): body text ≥ 4.5:1;
micro-labels and dim text ≥ 4.5:1 (they are small, so they get no exemption);
borders, chart strokes, sparklines, cell edges and focus rings ≥ 3:1 against their
adjacent surface. The state palette was checked in greyscale — the six states remain
distinguishable by glyph and hatch alone.

### 6.4 Density

Hairlines and spacing do the separating, not cards-in-cards. Panels are a 1px border
and a flat surface; elevation is reserved for things that genuinely float (drawer,
palette, popover).

Two persisted density modes:

| | Comfortable | Compact |
| --- | --- | --- |
| Queue row height | 44px | 32px |
| Table font size | 13px | 12px |
| Panel padding | 16px | 12px |
| Matrix cell | 34px, shows ID + glyph | 26px, glyph only |
| Rows visible at 900px tall | ~11 | ~16 |

Type never drops below 12px and hit targets never below 28px in either mode. A SOC
wall display and a 13-inch laptop want different answers, so this is a setting, not
a fixed choice ([research §13](./research.md)).

### 6.5 Component behaviour

- **State chip** — glyph + word + optional age. Three sizes. Never renders colour
  without the word, except in the matrix where the cell's accessible name carries it.
- **Queue row** — hover raises the surface slightly; the keyboard cursor is a 2px
  left accent bar *plus* a background change, so it is not colour-only; selection is
  a checkbox, distinct from the cursor. Cursor and selection are separate concepts
  and never share a visual.
- **Evidence drawer** — right side at ≥ 640px (`688px` wide), full-height sheet
  below. Four collapsible evidence panels; the failing one is expanded on open,
  because that is the answer to the question the user came with.
- **Decision forms** — inline in the drawer footer, never a nested modal. A dialog
  on top of a drawer is where interfaces go to die.
- **Toast** — every state change confirms with what changed and an undo where undo
  is meaningful. Records that are audit evidence (a validation result, an approval)
  cannot be undone, and the toast says so instead of offering a lie.
- **Command palette** — `⌘K`. Jump to a technique by ID or name, switch tab, switch
  role, toggle density or theme, filter to broken, show shortcuts, reset the demo.
- **Report actions** — the report is already generated, so the only action is
  "Copy as text", which puts the whole document on the clipboard and reports back in
  the button label. No print dialog, because a browser print of a dark console is not
  the artefact anyone wants.
- **Buttons** — one primary action per region. Destructive-ish actions (accept a
  gap) use an outline treatment with a warning-coloured label, not a red fill; the
  action is legitimate, it just needs a second's thought.

### 6.6 Keyboard model

The people who live in these tools do not reach for a mouse.

| Key | Action |
| --- | --- |
| `↑` `↓` / `j` `k` | Move the queue cursor |
| `Enter` | Open the focused finding |
| `Esc` | Close drawer or palette |
| `⌘K` / `Ctrl+K` | Command palette |
| `x` | Toggle selection on the focused row |
| `1`–`4` | Switch tab |
| `?` | Shortcut help |

`d` is deliberately unused — the surrounding application already binds it to the
theme toggle. Every shortcut is suppressed while focus is in a text field.

---

## 7. Responsive, accessible, and every in-between state

### 7.1 Breakpoints

| Width | Layout |
| --- | --- |
| **≥ 1280px** (target 1440×900) | Two columns: content + 336px rail. Drawer 688px on the right. Queue as a table, all columns. Report as two columns. |
| **1024–1279px** | Rail moves below the content and reflows into as many ≥ 272px columns as fit. Report goes single-column. Queue keeps every column. |
| **768–1023px** | Counters go to two-up. Queue drops the reason and owner columns — the two that repeat what the state chip and the drawer already say. Telemetry status words collapse to their shape markers. |
| **< 768px** (target 375×812) | Tabs become a horizontally scrollable segmented control. **Queue becomes stacked cards** — priority and state on the first line, technique on the second, fix class and owner on the third. **The matrix is restructured, not shrunk**: each tactic becomes a stacked block — name, state-count bar, `n/m verified` — with its technique cells wrapping underneath, so nothing is squeezed and nothing scrolls sideways. Drawer becomes a full-height sheet. The demo notice swaps its long sentence for a short one. Report tables become label/value stacks. |

**The matrix decision is the important one.** Twelve tactic columns cannot be made
readable at 375px — squeezing gives either horizontal scroll or unreadable cells,
and both are worse than a different layout ([research §14](./research.md)). So the
matrix is built as tactic *rows* from the start: at 1440px the row header sits beside
a wide wrapping strip of technique cells, and at 375px the header stacks above the
strip. Same markup, same data, no second component to keep in sync. Wide tables that
genuinely must stay tabular (the queue, the audit log) scroll inside their own
container; the page body never scrolls sideways. Verified at 375×812:
`document.scrollWidth === clientWidth === 375`.

### 7.2 Accessibility

- **Semantics:** one `<h1>`; `<nav>` with `aria-current` on the active tab; the
  queue is a `<table>` with `<caption>` and scoped headers; the matrix is a `<table>`
  with row and column headers; the audit log is an ordered list; the drawer is a
  dialog with a labelled title and focus trapped and restored.
- **Colour is never alone.** Every state carries a glyph and a word. Sparklines
  carry a text last-event value. The matrix adds a hatch for blind cells. Verified in
  greyscale.
- **Contrast** as specified in §6.3, with focus rings at ≥ 3:1 and never removed.
- **Live regions:** counter changes and decision confirmations announce through a
  polite live region. The incident banner is `role="status"`, not `role="alert"` —
  it is a standing condition, not an interruption, and an alert role would be a lie
  that also steals focus.
- **Accessible names carry the meaning:** a matrix cell announces "T1078.004 Cloud
  Accounts — broken, last validated 41 days ago", not "cell".
- **Motion:** under `prefers-reduced-motion` the drawer, toast, row exit and counter
  step all become instant. No parallax, no shimmer, no pulsing anywhere — a pulsing
  red element in a security tool is fatigue by design.
- **Text scaling:** the layout survives 200% zoom because it is grid- and
  flex-based, with no fixed-height text containers.
- **Keyboard:** every action reachable without a pointer (§6.6), and disabled
  controls keep their accessible name plus the reason they are disabled, so a
  screen-reader user learns the permission model the same way a sighted one does.

### 7.3 Loading, empty, error

| State | Treatment |
| --- | --- |
| **First paint** | Skeleton rows matched to real row height; counters show a dashed placeholder rather than `0`, because a wrong number is worse than no number. |
| **Optimistic action** | Row marks immediately; counters and chart settle 220ms later so the causal link is visible. |
| **Empty — cleared queue** | Verified count, next expiry date, and the honest note that decay refills the queue. Not a celebration graphic. |
| **Empty — no filter match** | Names the active filters and offers one button: clear them. |
| **Empty — no acceptances** | Explains what the register is for. |
| **Blocked by permission** | Disabled control, reason on the control. |
| **Fixture notice** | Connector panel states plainly that every connector is a fixture with a sample date, and nothing is connected. This is a designed state, not a disclaimer in the footer. |
| **Reset** | Both the data-sources panel and the command palette offer a reset, which clears persistence and restores the seed. |

### 7.4 Interaction feedback ladder

Four distinct levels, so importance is legible:

1. **Immediate** (< 16ms) — hover, focus ring, cursor move, checkbox.
2. **Optimistic** (instant) — the row changes before anything else does.
3. **Settle** (220ms) — counters step, chart redraws, composition bar re-flows.
4. **Record** (toast + audit line) — the durable statement of what happened, with
   undo only where undo is honest.

---

## 8. How the build demonstrates the differentiator

The PRD's promise is *"every coverage claim carries an evidence date, a confidence
tier, an owner and an expiry — and assumed is not covered."* Here is where each half
of that is visible on screen, so the claim can be checked rather than taken on
trust.

| Promise | Where it shows up | What would break it |
| --- | --- | --- |
| **Assumed is not covered** | Six-state model everywhere. Verified and claimed coverage sit side by side with the gap named. *Assumed* has a deliberately dull colour. | Any single coverage percentage shown alone. |
| **Evidence has a date** | Age in days on every verified and decaying chip. Validation panel lists method, test ID, operator, timestamp, graded result. The freshness pip decays. | A green cell with no date. |
| **Four inputs fail differently** | The drawer is four panels — content, telemetry, validation, fidelity — and names the failing one with its reason. | One aggregate "health" score. |
| **Telemetry health is coverage** | Silent source flips its dependent analytics to broken; the rail shows sparklines with a flat tail; blast radius is named before the click. | Log-source health living on a separate ops page. |
| **No black box** | "Why this rank" lists four terms with values, sources and points that sum to the score, and says so. | A score with a tooltip that says "based on multiple factors". |
| **Decisions have owners and expiries** | Assign captures owner and due date. Acceptance captures reason, justification, expiry ≤ 90 days, and two names. | An acknowledge button. |
| **Separation of duties** | Requester cannot approve. Auditor cannot write anything. Controls disabled with reasons, not hidden. | A single all-powerful demo user. |
| **Auditable** | Append-only log with actor, role, action, target, detail. Never editable. Fan-out of a bulk action listed. | An activity feed you can clear. |
| **It answers the board's question** | Scenario replay produces a verdict in sentences that names proven, broken and never-tested steps. | A percentage labelled "readiness". |
| **It is honest about being a demo** | Persistent notice; connectors labelled fixtures; nothing described as live; production-only features (hash-chained audit) named as absent rather than faked. | Faking a hash chain to look thorough. |

---

## 9. Implementation notes that follow from this specification

Recorded so the design and the code do not drift.

- **State is derived, never stored.** Assurance state, priority, coverage
  percentages and budget are all computed from inputs on every render, so a mutation
  cannot leave the ledger disagreeing with its own evidence ([PRD §7](./prd.md)).
- **One external store, `useSyncExternalStore`.** Persistence writes a mutations
  slice to `localStorage` — decisions, acceptances, audit entries, role, density,
  filters, service level target, acknowledgements — never the seed. Hydration
  happens on subscribe, so the server and first client render agree and the route
  logs no hydration error.
- **Seeded data is deterministic.** Sparkline series come from a seeded pseudorandom
  generator at module load, and all timestamps derive from one fixed reference
  instant, so server and client render identically.
- **Route-local styling.** One CSS module holds the token set and layout; the
  state palette is defined once as custom properties and consumed by class name, so
  a state's colour is defined in exactly one place.
- **Charts:** Recharts for the burn-down and the stacked area, with an explicit
  `initialDimension` so no zero-dimension warning reaches the console during server
  rendering, and entry animation switched off so a re-render never flashes the data
  in from zero. Sparklines, composition bar, term-profile bar and matrix are
  hand-built — they need less code than configuring a chart library, and they get to
  be exactly right.
- **The dialog primitive portals to `document.body`,** outside the app root, so the
  design tokens live on a separate `.tokens` class applied to both the app root and
  the drawer. Anything that portals must carry that class or it inherits no colour.
- **The demo has a fixed clock** (24 Jul 2026 09:12 UTC), shown in the header. No
  `Date.now()` or `Math.random()` runs anywhere, so the server and client renders are
  identical and every relative date in the fixtures stays meaningful.
- **`d` stays unbound** (§6.6).
