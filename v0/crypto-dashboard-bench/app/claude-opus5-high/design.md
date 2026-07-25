# Waterline — design specification

**Run:** `claude-opus5-high` · **Route:** `/claude-opus5-high`
**Reads with:** [prd.md](./prd.md) · [research.md](./research.md)

The whole design answers one question in one screen and lets you push on it. If a
control does not help someone decide whether they can pay their bills, it is not
here.

---

## 1. Information architecture

A single workspace, six places, in the order of the decision loop. Left rail on
desktop, a horizontally scrollable tab strip on mobile.

```
Waterline
├── Readiness   Can we cover it?          ← default, the answer
├── Holdings    What is holding us back?  ← diagnosis, drill-down
├── Stress      What breaks it?           ← scenarios with cited anchors
├── Plan        What do we do?            ← levers, cost, policy check, packet
├── Policy      What are our rules?       ← guardrails, live re-evaluation
└── Log         What did we decide?       ← frozen numbers + provenance
```

Nav order *is* the workflow. Each view answers the question in its subtitle, and
each hands off explicitly: Readiness links the breach to Holdings, Holdings links
a haircut to Stress, Stress links a shortfall to Plan, Plan writes to Log.

### Global header — always visible, never decorative

| Element | Behaviour |
| --- | --- |
| Product mark + workspace switcher | Two seeded workspaces: Meridian (populated) and Northwind (empty, to be onboarded) |
| **Seeded demo data** marker | Permanent. Not dismissible. Never says live, streaming or connected. |
| Snapshot control | *Calm book* / *Stressed book*. Both labelled as seeded snapshots. Switching re-runs everything. |
| "As of" stamp | The snapshot's timestamp, in UTC, with a data-health popover: every source, its tier, its age, and whether it is stale against its expected refresh. |
| Density toggle | Comfortable / compact. Persisted. |

The as-of stamp sits next to the headline number, not in a footer. A treasury
figure without a timestamp is a guess, and the design should make that
impossible to forget.

---

## 2. Critical journeys

### J1 — Weekly readiness check (30 seconds)

Land on Readiness → read the coverage figure and the first breach month → glance
at the cushion chart to see the shape of the decline → done, or click through.

The screen is built so the first three things read in order are: **the ratio**,
**the month it breaks**, **the size of the shortfall**. Everything else is
support.

### J2 — Post-shock re-answer (2 minutes)

Switch the snapshot control to *Stressed book* → every figure on the page
recomputes → a delta strip appears showing what moved and by how much → the
breach month jumps forward and the buffer check flips to a warning.

The delta strip is the whole point of this journey: not "here is the stressed
number" but "here is what changed".

### J3 — Diagnosis (3 minutes)

Holdings, sorted by effective haircut → the native token family is at the top →
open the drawer → read the exit-cost curve, the depth ladder behind it, each
route with its own fee and settlement time, and the binding constraint in words →
see the restriction schedule for the locked tranche.

### J4 — Stress comparison (2 minutes)

Stress → pick a scenario → pick a comparison → two cushion lines on one chart,
with each scenario's cited historical anchor beneath. The anchor is a link, not a
claim.

### J5 — Build and approve a plan (5 minutes)

Plan → *Suggest cheapest plan*, or select levers by hand → watch coverage, cost
and policy verdicts update on every toggle → read the policy panel → *Prepare
signing packet* → read the decoded calls and the security notice → approve, with
a second approver above the threshold → the entry lands in Log.

### J6 — First-run onboarding (under a minute in the demo)

Switch to Northwind → an empty state with a three-step checklist, not a blank
dashboard → complete each step → the coverage answer appears. Each step says what
it does and what it does not do ("read-only, we never ask for a key").

---

## 3. Hierarchy, comparison, filtering, drill-down

### Hierarchy

Three levels, consistently:

1. **Answer** — one figure, largest type on the page, with its qualifier
   ("tightest month") and its timestamp. One per view, never two.
2. **Structure** — the chart or table that explains the answer.
3. **Evidence** — provenance chips, binding-constraint labels, source links,
   method notes. Always available, never in the way.

### Comparison — always paired, never absolute

Every measure appears next to the thing it should be judged against:

| Measure | Compared against |
| --- | --- |
| Realisable value | Mark value (as a nested bar, so the gap is a visible length) |
| Coverage ratio | The policy floor (drawn as a reference line) |
| Cushion | Zero (the chart's spine) |
| Concentration | The policy limit (a tick on the bar) |
| Health factor | The policy floor and the 1.00 liquidation line |
| Scenario | Another scenario, on the same axes |
| Plan | The same treasury without the plan |

### Filtering and sorting

Holdings filters by asset class and by settlement bucket, and sorts by mark
value, realisable value, effective haircut or time to cash. Default sort is
**effective haircut, descending** — the product's own opinion about what matters,
expressed as a default.

### Drill-down

Three steps deep, no further. Ladder bucket → holding row → holding drawer. The
drawer is the terminal surface: exit curve, depth ladder table, routes,
restriction, provenance, method note. Nothing opens on top of the drawer.

---

## 4. Visualisation choices

Chart forms are chosen from the relationship being shown, following the
Financial Times' Visual Vocabulary categories, not from habit.

### The hero — liquidity cushion by month (Deviation)

Cumulative realisable cash minus cumulative committed spend, per month, on a
zero baseline. Surplus fills above the line in the liquid accent; deficit fills
below in the breach colour, through a single gradient whose hand-over point is
computed from the data so the colour changes exactly at zero. A dashed vertical
marker, labelled "cash runs short", names the first breach month. On the Stress
and Plan views a second, dashed line overlays a comparison series on the same
axes.

*Why this form:* the question is "surplus or shortfall against a fixed reference
of zero", which is exactly what a deviation chart is for. A coverage-ratio line
would bury the magnitude, and a magnitude of $7.18m is the thing that gets a
decision made.

**Not a price chart.** There is no candlestick anywhere in this product. It
answers no question in this loop.

### The signature — time-to-cash ladder (Part-to-Whole + Magnitude)

Horizontal bars, one per settlement bucket, ordered by days: same day, 1–2 days,
3–7 days, 8–30 days, 31–90 days, locked. Each bar is drawn twice, nested: the
full length is mark value, the inner solid length is realisable value. The gap
between them is the effective haircut, rendered as distance.

Built in CSS rather than a charting library, because the nesting has to be exact
and the labels have to reflow on a 375px screen.

*Why this form:* it is the one chart in the product that does not exist in the
products we looked at, and it is the fastest way to see that $75.6m "available
today" is $26.5m of cash.

### The proof — exit-cost curve (response curve)

In the holding drawer. Order size on the x-axis, price concession in basis points
on the y-axis, drawn from the merged depth ladder. A horizontal reference line
marks the policy slippage cap, and a vertical marker with a dot sits at the
largest slice that stays inside it. The segment beyond the deepest observed
band is drawn dashed and in the modelled colour, because it is extrapolated
rather than seen. The panel beneath restates the same figures as text: slice
size, per day, per month, the binding rule, and the whole position at once.

*Why this form:* it makes the cost of impatience visible and it shows its own
uncertainty. The dashed tail is the honesty.

### Supporting forms

| Question | Form |
| --- | --- |
| Where does each month's cash come from? | Stacked column by asset, per month |
| How concentrated are we? | Ranked bars with policy-limit ticks |
| Which scenario is worse? | Two cushion lines, one chart, shared axes |
| Did the plan work? | Before and after cushion, overlaid |
| Is a rule passing? | Pass / warn / fail row with actual against limit, both shown as text |

### Units, ranges, and semantics

- **Currency**: USD, always marked. Compact above a million (`$38.2m`), exact in
  tables and drawers. Negative uses a true minus sign, never a hyphen.
- **Percentages of price**: basis points, always written `bps`, because a
  treasurer thinks in basis points and 0.0075 is unreadable.
- **Time**: days for settlement, months for the horizon, UTC for timestamps.
- **Horizon**: fixed at 12 months. Not a range selector — the horizon is the
  planning period, not a zoom level. Ranges belong to price charts, and there are
  none.
- **Quantities**: token units with their symbol, never bare numbers.

### Risk semantics — one meaning per colour, everywhere

| Colour | Means | Used for |
| --- | --- | --- |
| Teal (liquid) | Realisable, spendable, passing | Realisable bars, surplus fill, pass verdicts |
| Neutral grey | Mark value only; not yet cash | Outer ladder bars, mark totals |
| Amber (latency) | Reachable, but not yet — a queue or a warning | 8–30 day buckets, warn verdicts, stretched queues |
| Red (breach) | A limit is crossed or cash runs short | Deficit fill, breach markers, fail verdicts |
| Violet (modelled) | This is an assumption, not an observation | Extrapolated curve segments, modelled tiers |
| Struck / faded | Stale beyond its expected refresh | Data-health rows, stale source chips |

Colour never carries meaning alone. Every state also has a label, an icon or a
pattern: modelled values are dashed as well as violet, breaches are labelled as
well as red.

### Provenance, on the surface

A snapshot is a point in time, so most sources are as of the snapshot itself.
A genuinely slow feed is expressed as a *lag* in minutes behind it, which is why
the demo shows exactly one stale source in both the calm and the stressed
snapshot rather than everything going stale when the clock moves.

A **provenance chip** appears next to any figure whose origin is not obvious:
tier (observed / derived / modelled / input), source name, and age. Chips are
quiet by default and reveal the full source, the "as of" time, the expected
refresh interval and the method on hover or tap. Stale sources are struck
through, and the data-health popover lists them.

---

## 5. Visual system

### Direction

An instrument panel, not a trading terminal and not a marketing page. Calm, dense
where density earns its place, and typographically serious. The reference points
are a printed risk report and an aircraft primary flight display: everything
labelled, nothing decorative, one thing obviously most important.

### Colour

Route-local custom properties, defined on a `.tokens` class in a CSS module and
also applied to portalled surfaces (drawers render outside the page tree, so
tokens set on the app root would not reach them). Both light and dark are
first-class; the surrounding theme provider owns the switch.

| Token | Light | Dark |
| --- | --- | --- |
| `--wl-liquid` | `oklch(0.60 0.10 196)` | `oklch(0.74 0.11 196)` |
| `--wl-mark` | `oklch(0.74 0.01 250)` | `oklch(0.48 0.02 250)` |
| `--wl-latency` | `oklch(0.70 0.13 72)` | `oklch(0.79 0.13 78)` |
| `--wl-breach` | `oklch(0.56 0.19 22)` | `oklch(0.70 0.17 22)` |
| `--wl-modelled` | `oklch(0.58 0.15 300)` | `oklch(0.72 0.14 300)` |
| `--wl-surplus` | `oklch(0.58 0.11 158)` | `oklch(0.72 0.12 158)` |

Surfaces, text and hairlines inherit the baseline shadcn tokens so the route sits
inside the repo's theme instead of fighting it. The accents above are the only
new hues, and each one has exactly one meaning.

### Typography

- **Interface**: Inter (already loaded by the root layout).
- **Every number**: the mono family, with `font-variant-numeric: tabular-nums`,
  so columns of figures align and a changing value does not shift its neighbours.
- **Hero figure**: 44px, weight 600, tracking −0.02em, mono.
- **Section labels**: 11px, uppercase, tracking 0.09em, muted. The label style
  does the work a heavier heading would do, without the visual weight.
- **Table body**: 13px comfortable, 12px compact.

No display face is added. The seriousness comes from restraint and alignment, and
a fourth font family would be decoration.

### Density and interaction

Two densities, persisted, applied through a `data-density` attribute on the token
class. Compact tightens row height and padding without changing type size below
12px.

Interaction rules: hover reveals evidence, never moves layout. Every control
changes something visible on the same screen. Transitions are 120ms and are
disabled under `prefers-reduced-motion`. Chart animation is off — an operational
panel should not flash on every state change.

---

## 6. Responsive behaviour

**1440×900 (primary).** Left rail 232px fixed. Content column capped so long
lines stay readable. Readiness runs a 12-column grid: headline block spans 4,
cushion chart spans 8, ladder spans 7, alerts span 5. Tables show every column.

**1024–1439.** Rail persists, the grid collapses to 8 columns, the cushion chart
takes full width above the ladder.

**768–1023.** Rail becomes a top tab strip. Single column. Tables drop
lower-priority columns (chain, custody) and keep symbol, mark, realisable,
haircut, time to cash.

**375×812 (must be usable).** Single column throughout. The headline figure stays
full size — it is the reason the page exists. The cushion chart keeps its height
and shows every other month label. The ladder becomes stacked rows with the
mark/realisable pair on a second line. Tables become cards: one holding per card,
label-value pairs, no horizontal scroll. Where a wide table genuinely cannot
degrade (the depth ladder in the drawer), it scrolls **inside its own
container**, never the page. The drawer becomes a bottom sheet at full width.

The page body never scrolls horizontally at any width. That is a hard rule and it
is checked at both target sizes.

---

## 7. States

Every view specifies four states, and all four appear in the demo.

### Empty

The Northwind workspace. Not a blank dashboard with zeros — a three-step
checklist that says what each step does, why it is needed, and what we will
never ask for. Readiness stays locked with an explanation until committed spend
is imported, because a coverage number without obligations is meaningless and
showing zero would be a lie.

Holdings, Stress, Plan and Log each get their own empty copy explaining what will
appear and which step unlocks it.

### Normal

The Meridian workspace on the calm snapshot. Coverage below its floor, one policy
breach on concentration, buffer passing. This is deliberately not an
everything-is-fine state: a treasury tool showing all-green teaches nothing.

### Volatile

The stressed snapshot. The header marks it, a delta strip quantifies what moved,
queue times stretch, holdings change settlement bucket, the buffer check flips to
warning and the stablecoin disclosure check flips to failing. The scenario view
adds the March 2023 depeg shape, which takes one holding to roughly $0.88.

Nothing about this state implies a live market. The snapshot is labelled seeded
in the control, in the stamp and in the popover.

### Risk-focused

Any state where a policy check fails. Failures surface in three places at once:
the header check summary, the Readiness alert list, and the Policy view. A
failing check always states the actual value, the limit, and the one action most
likely to fix it.

### Loading

The route renders synchronously from seeded data, so there is no fetch to wait
for and inventing a spinner would be dishonest. Skeletons are specified for
production, where depth and balances arrive over the network: chart areas hold
their height with a shimmer-free placeholder, figures show a dashed rule rather
than a zero, and no figure is ever shown before its "as of" time is known.

### Error

Specified for production and represented in the demo through the data-health
model: a source older than its expected refresh is marked stale and the affected
figures carry a degraded chip. Following Chainlink's guidance for stale feeds,
the plan builder refuses to produce a signing packet on degraded inputs without
an explicit acknowledgement, and says why.

---

## 8. Accessibility

- **Contrast**: body text and all figures meet 4.5:1 in both themes; chart
  strokes and reference lines meet 3:1. The accents were picked in oklch with
  fixed lightness targets per theme for this reason.
- **Colour independence**: every colour-coded state carries a text label, an icon
  or a pattern. Modelled segments are dashed; verdicts are words; the ladder
  labels its own bars.
- **Keyboard**: full tab order through nav, controls, table rows and the drawer.
  Table rows are real buttons. The drawer traps focus, restores it on close and
  closes on Escape. No route-local single-key shortcuts, because the surrounding
  theme provider already binds a bare key and stealing another would be rude.
- **Screen readers**: each view is a landmark with a heading. Every chart has a
  text summary immediately before it that states the same conclusion in words —
  a sighted user reads the chart, a screen-reader user reads the sentence, and
  neither gets a worse answer. Charts are `aria-hidden` once their summary
  exists. Tables use proper headers and scope. Verdicts and figures announce
  units.
- **Motion**: `prefers-reduced-motion` disables all transitions; chart animation
  is off for everyone.
- **Target size**: 44px minimum on touch, which drives the compact density floor.
- **Zoom**: layout holds to 200% without horizontal scroll.

---

## 9. How the implementation shows the differentiator

The promise is *mark value tells you what you own; we tell you what you can
spend, and when.* Six specific design decisions carry it, and each one is
falsifiable by looking at the screen.

1. **The two numbers are never separated.** The headline pairs $113.1m of mark
   value with $38.2m realisable, labelled "accounting mark, no size discount"
   and "convertible inside policy in 12 months". A reader cannot see one without
   the other.

2. **The ladder makes the haircut a distance.** In the same-day bucket, the outer
   bar runs to $75.6m and the inner bar stops at $26.5m. Nobody needs the concept
   explained after seeing that.

3. **Unlocking changes nothing, and the product says so.** The restricted tranche
   releases in month 8 and 12-month realisable value does not move, because
   capacity is shared across the token family. The drawer states it: *unlocking
   adds inventory, not capacity.* That single sentence is the domain insight the
   category misses.

4. **The binding constraint is always named.** Not a liquidity score — "limited by
   6% of $640k daily volume". Change the participation cap in Policy and the
   sentence, the capacity and the coverage number all move together.

5. **Latency is a first-class axis.** Settlement time is a column, a filter, a
   chart axis and a policy input. The stressed snapshot moves holdings between
   buckets, which is the visual proof that time to cash is data, not a caveat.

6. **The security posture is visible, not claimed.** There is no wallet-connect
   button to be found. The signing packet decodes calls into plain English, names
   the operation type in words, warns when a call is a `delegatecall` — the exact
   field behind the largest theft in the industry — and states that Waterline
   holds no keys and cannot submit anything.

### Component inventory

```
layout.tsx                  route metadata + token scope
page.tsx                    client entry
waterline.module.css        tokens, layout, ladder, tables, drawer
components/
  app.tsx                   shell: header, rail, view switch, data-health popover
  bits.tsx                  Stat, Delta, ProvChip, Verdict, Meter, LabelRow, Note
  charts.tsx                CushionChart, SupplyStack, ExitCurve, ScenarioCompare
  ladder.tsx                the CSS time-to-cash ladder
  asset-drawer.tsx          holding drill-down
  signing-packet.tsx        decoded calls + security notice + approval
  views/readiness.tsx
  views/holdings.tsx
  views/stress.tsx
  views/plan.tsx
  views/policy.tsx
  views/log.tsx
lib/
  engine.ts                 all arithmetic, no React, independently checkable
  seed.ts                   seeded fiction, with the documentation it is modelled on
  format.ts                 pinned-locale formatting
  store.tsx                 external store + localStorage
```

Arithmetic lives entirely in `engine.ts` with no React and no I/O, so the numbers
can be verified on their own — which is how the coverage figures in the PRD were
produced and checked before any interface existed.
