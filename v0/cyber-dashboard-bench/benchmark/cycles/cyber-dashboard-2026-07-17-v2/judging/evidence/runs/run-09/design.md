# Breakline design specification

**Product:** Breakline  
**Experience:** Mission Control + breach-path decision workspace  
**Target:** 1440×900 primary, fully usable at 375×812  
**Tone:** calm, evidence-led, precise; high attention without alarmism

## 1. Design intent

The demo must make the product thesis visible within ten seconds:

1. the estate has a small number of paths that deserve attention;
2. the top recommendation explains the business target and why now;
3. the user can choose a “Control Cut” and preview how many paths it breaks;
4. the user can route a safe, specific change to an accountable owner.

The interface should feel like an operational decision tool, not a generic analytics dashboard. High density is acceptable when hierarchy, whitespace, labels, and interaction states remain deliberate.

## 2. Information architecture

### Global navigation

- **Mission Control** — daily outcome dashboard and recommended cuts.
- **Breach paths** — all modeled paths, saved views, filters.
- **Control cuts** — deduplicated remediation portfolio.
- **Critical assets** — business targets, owners, coverage.
- **Activity** — assignments, verification, decisions.

Only Mission Control is fully implemented in the demo. Other navigation items update the active shell and show an intentional contextual preview/toast rather than pretending to be complete.

### Desktop shell

- 72px icon-and-label rail on the left.
- Sticky top command bar across the workspace.
- Main canvas with:
  - attention/context strip;
  - outcome cards;
  - compact trend and recommended cut;
  - breach-path list;
  - selected path workspace.
- Selected path uses an in-page two-column composition rather than a modal, preserving context.

### Mobile shell

- Compact sticky header with logo, current section, and scenario control.
- Content becomes a single flow.
- Bottom navigation provides five 44px targets.
- The selected path appears below the list; selecting a path scrolls the workspace into view.
- Secondary details use disclosure regions.

## 3. Critical journeys

### Journey 1 — Understand today's change

1. Land on Mission Control.
2. Read “Demo data” notice and source freshness.
3. See an urgent summary: a new identity pivot has increased one path.
4. Scan outcomes and the top Control Cut.
5. Select the top path.

Feedback:

- The selected row/card gains a strong outline and left marker.
- The workspace title, target, score, and graph update without a page navigation.
- `aria-live` announces the selected path.

### Journey 2 — Prove a remediation decision

1. Inspect the path sequence.
2. Read “Why this is first” and score factors.
3. Expand evidence for a path step.
4. Toggle a Control Cut.
5. View modeled before/after outcomes.

Feedback:

- A selected cut uses check state, text, and color.
- The affected graph step changes from exposed to “cut in preview.”
- Before/after numbers animate subtly unless reduced motion is requested.
- A persistent label says “Modeled preview — no production change.”

### Journey 3 — Mobilize an owner

1. Select an owner from the remediation card.
2. Click “Start remediation.”
3. Status becomes In progress.
4. The list row, summary counts, and decision timeline update.
5. Refresh preserves the state.

Feedback:

- Inline success confirmation, not a blocking modal.
- Button changes to “In progress.”
- Timeline adds a local-demo assignment event.
- Copy explicitly states that no external ticket was created.

### Journey 4 — Inspect estate states

A scenario switch exposes:

- **High attention:** multiple open critical paths, overdue item, new evidence.
- **Steady:** fewer paths, all owned, healthy sources.
- **Cleared:** no open paths to critical assets, next actions are coverage and verification.

This ensures empty, normal, and high-attention states are first-class and reviewable without hidden setup.

## 4. Dashboard hierarchy

### Level 0 — Trust and context

- “Seeded demo data — no live systems connected.”
- Coverage percentage and source recency.
- Scenario selector.

This is visually present but not louder than the actual decision.

### Level 1 — Outcome and urgency

- open critical paths;
- critical assets reachable;
- selected simulated reduction;
- remediation SLA/ownership.

No metric is shown without a noun, time frame, and comparison.

### Level 2 — Best next action

The recommended Control Cut receives the strongest card hierarchy:

- action title;
- owner domain;
- paths broken;
- targets isolated;
- effort;
- confidence;
- simulate control.

### Level 3 — Queue

The breach-path list is operational:

- priority index and semantic level;
- path title;
- target;
- key evidence (KEV/EPSS/identity);
- status/owner;
- change since last review.

### Level 4 — Evidence and audit

The selected workspace contains detailed factors, source evidence, and timeline. These are available on demand and never replace the top action.

## 5. Prioritization presentation

### Priority language

- **Act now** — immediate cross-functional decision; not a claim of active compromise.
- **Attend** — act sooner than standard workflow.
- **Track** — monitor or handle in standard cycle.
- **Verified** — fresh source evidence confirms the enabling relationship is removed.

These labels borrow the action-oriented shape of SSVC but are Breakline workflow labels, not a claim of official SSVC calculation.

### Score explanation

Show five labeled horizontal meters:

- Reachability
- Threat evidence
- Business impact
- Convergence
- Evidence confidence

Each has:

- factor value;
- plain-language reason;
- source badge and freshness when relevant.

Color is supportive only. Labels and values convey the state.

## 6. Visualizations

### Selected breach path

Use a bounded node-link diagram with 4–5 nodes:

`Internet → vulnerable workload → exposed workload identity → admin role → critical data`

Reasons:

- sequence and relationship are the primary question;
- the path is small enough to avoid a graph hairball;
- the diagram can highlight the exact edge a Control Cut removes.

Accessibility:

- `role="img"` with concise accessible name;
- equivalent ordered step list immediately below/within the DOM;
- icons plus text labels;
- cut step uses a barrier icon and “cut in preview” text.

### Trend

A small SVG line/area chart shows open critical paths across seven days, with:

- direct end labels;
- a single annotation for new evidence;
- no hidden tooltip dependency;
- text summary available to assistive technology.

### Outcome comparison

Before/after uses two columns and proportional bars, not a donut:

- open critical paths;
- reachable critical assets;
- weighted exposure.

Exact values remain visible at all times.

## 7. Design system

### Direction

Dark operational canvas with warm off-white typography and a restrained electric-lime action accent. The aesthetic should feel like a modern infrastructure console, not “hacker green.”

### Color tokens

- Canvas: near-black blue `#080d12`
- Raised surface: `#10171e`
- Raised hover: `#151f28`
- Border: `#26313b`
- Primary text: `#f3f6f1`
- Secondary text: `#98a6b3`
- Accent / selected / verified change: `#b7f34a`
- Informational cyan: `#58c8e8`
- Attention amber: `#f4b85a`
- Critical coral: `#ff6b62`
- Violet identity context: `#a78bfa`

Semantic colors are always paired with labels/icons.

### Typography

- Root uses inherited Inter from the repository.
- Titles: 600–700 weight, compact tracking.
- Body: 13–14px desktop operational density, 14px mobile.
- Data/IDs: inherited Geist Mono via `var(--font-mono)`.
- Large outcome figures: 26–34px with tabular numerals.

### Shape and depth

- 12–16px radii on major surfaces.
- 8–10px on controls and small cards.
- Mostly borders and tonal elevation; shadows reserved for sticky/mobile navigation.
- Grid texture and accent glows remain subtle and non-essential.

### Density

- Desktop row heights: 58–68px.
- Controls: 36–40px desktop, 42–44px mobile.
- Primary gutters: 20–24px desktop, 14–16px mobile.
- Use progressive disclosure for evidence rather than shrinking text.

## 8. Components and behavior

### Scenario segmented control

- Three labeled buttons: High attention, Steady, Cleared.
- `aria-pressed` state.
- Switching scenarios resets selected path if it no longer exists but does not erase persisted workflow data.

### Metric card

- Label, exact value, comparison, compact icon.
- Optional semantic top border.
- Never clickable unless it has clear hover/focus affordance and accessible name.

### Breach-path row/card

- Entire row is a button-like selection target.
- Nested actions are avoided to prevent conflicting targets.
- Desktop uses a CSS grid; mobile uses stacked labeled groups.
- Selected state includes an accent marker, border, and `aria-current`.

### Evidence badge

Examples: `CISA KEV`, `EPSS 93rd pct`, `Observed`, `Inferred`, `Fresh 12m`.
- Badge includes text.
- Tooltip/expanded evidence provides source date and interpretation.

### Control Cut card

- Checkbox/toggle control.
- Action, owner team, effort, paths broken, target effect.
- “Best cut” badge when highest ranked.
- Selected state explains which path step is removed.

### Remediation action

- Owner selector.
- Start remediation button.
- In-progress state with timestamp and local-demo clarification.
- Reset demo workflow is available in the utility menu/footer.

### Toast/live region

- Short confirmation after starting or resetting workflow.
- `aria-live="polite"`.
- Does not obscure bottom navigation on mobile.

## 9. Responsive behavior

### ≥ 1200px

- Persistent rail.
- Four metric cards.
- Dashboard top grid: trend (2/3) + best cut (1/3).
- Queue and workspace remain full width but workspace uses graph/detail columns.

### 768–1199px

- Rail reduces to icons.
- Metric cards use two columns.
- Workspace graph and detail stack.

### ≤ 767px

- No side rail.
- Sticky mobile header and fixed bottom nav.
- Single-column metrics, with a compact two-up arrangement where content remains readable.
- Top dashboard cards stack.
- Breach paths become cards.
- Graph becomes a vertical sequence with connecting line.
- Score factors, Control Cuts, and remediation stack.
- Sticky elements reserve safe space; bottom padding prevents obscured content.

### 375×812 safeguards

- `min-width: 0` on grid/flex children.
- identifiers use `overflow-wrap: anywhere`.
- no fixed content widths.
- no horizontal table; mobile cards carry labels.
- interactive controls remain at least 40px tall.
- bottom nav labels remain visible.

## 10. Accessibility

- Semantic landmarks: `nav`, `header`, `main`, `section`, `aside`.
- One `h1`; nested headings follow order.
- Skip link to main content.
- Visible focus ring at least 2px, high contrast.
- All buttons have accessible names.
- Scenario and filters expose selected state.
- Source/evidence disclosures use native buttons and `aria-expanded`.
- SVG charts have accessible names and nearby text summaries.
- Color is never the only state signal.
- Critical/attention icons are decorative when adjacent text already names the state.
- Use tabular numerals for easy comparison.
- Respect `prefers-reduced-motion`.
- Minimum contrast targets: WCAG AA for text and meaningful UI graphics.

## 11. Loading, empty, error, and feedback states

### Loading

- Preserve layout with skeleton blocks.
- Announce “Updating exposure model.”
- Do not show stale numbers as newly calculated.

### Empty / cleared

Message:

> No modeled paths currently reach a confirmed critical asset.

Follow with:

- last evidence refresh;
- coverage caveat;
- awaiting-verification count;
- actions: review coverage, review critical assets, inspect verified changes.

Avoid celebratory “You are secure” language.

### No search/filter results

- Explain which filters are active.
- Offer Clear filters.
- Do not reuse the cleared-estate message.

### Partial source error

- Keep usable results.
- Show affected source, last successful refresh, and which paths may be incomplete.
- Lower confidence visibly.

### Action error

- Keep the user's edits.
- Explain what failed and how to retry.
- Never silently duplicate a ticket.

### Success

- Confirm assignment and state change.
- State that the demo made no external change.
- Update summary and timeline immediately.

## 12. How the demo proves the differentiator

The implementation must connect all four moments in one coherent screen:

1. **Explain:** the selected path shows entry, pivot, target, evidence, and score factors.
2. **Optimize:** candidate Control Cuts show paths broken per effort, not only severity.
3. **Preview:** toggles update a modeled before/after outcome with an explicit non-production label.
4. **Mobilize:** owner selection and “Start remediation” change status, update the timeline, and persist locally.

If a reviewer only sees a set of security widgets, the design has failed. If they can articulate “Breakline helps me choose the smallest defensible fix and get it owned,” the design has succeeded.

