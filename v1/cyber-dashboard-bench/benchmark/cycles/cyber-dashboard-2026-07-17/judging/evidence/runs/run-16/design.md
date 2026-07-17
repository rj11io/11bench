# Breakline design specification

Last updated: 2026-07-16

## 1. Experience intent

Breakline should feel like a calm decision desk inside a noisy category. The interface is dense but not frantic: warm light surfaces, ink-like typography, restrained indigo for product action, vermilion only for urgent exposure, and green only for verified outcomes.

The design must make one claim visible within five seconds:

> There are three decisions that matter today, and each has a provable path, a recommended breakpoint, and an owner state.

The demo is not a generic security posture page. Its center is a working decision-to-packet flow.

## 2. Information architecture

### Primary navigation

- Today — bounded daily queue and selected decision.
- Decisions — complete decision inventory and saved views.
- Campaigns — grouped remediation efforts and recurring causes.
- Services — critical business services, crown jewels, and coverage.
- Evidence — integrations, freshness, conflicts, and provenance.

### Utility navigation

- Global search / command palette.
- Demo environment indicator.
- Notifications.
- Help.
- User/account menu.

### Today page hierarchy

1. Persistent demo-data notice.
2. Page title, time scope, environment freshness.
3. Operational metrics:
   - Decisions needing action.
   - Critical-path coverage.
   - Median decision time.
   - Paths verified closed.
4. Queue/detail workspace:
   - Left: ranked decisions and filters.
   - Right: selected Decision Packet.
5. On narrow screens, queue and detail become a single drill-in flow with a Back to queue control.

## 3. Critical journeys

### Journey A: understand today

- Land on Today.
- Read the “3 decisions need you” headline.
- Scan queue status and affected services.
- Select the top item.
- Outcome: user understands why it is urgent without opening raw evidence.

### Journey B: trust the recommendation

- Read the decision conclusion.
- Trace the compact path from internet origin through vulnerable workload and excessive identity permission to the patient-data store.
- Inspect the factor bars and evidence ledger.
- Compare three breakpoints.
- Outcome: user can explain both the priority and uncertainty.

### Journey C: route the fix

- Choose the recommended network restriction or another breakpoint.
- Assign Platform Edge.
- Review the packet contents.
- Create the demo packet.
- UI changes status to “Packet ready,” records the owner, and shows a confirmation status.
- Refresh retains the state through localStorage.

### Journey D: inspect alternate states

- Filter to “Needs owner” to see ownership risk.
- Filter to “Watch” to see controlled/stale lower-attention items.
- Filter to a state with no matches to see a clear empty view and reset action.
- Outcome: high-attention, normal, watch, and empty states are represented.

## 4. Prioritization presentation

### Queue order

1. Hard-policy action state: Act now, Schedule, Watch.
2. Estimated path reduction of the preferred breakpoint.
3. SLA.
4. Time without owner.

### Queue item anatomy

- Action label and priority score.
- Decision statement (verb + condition).
- Business service and crown jewel.
- Evidence chips such as KEV, external, Tier 0, stale.
- Recommended breakpoint in one line.
- Owner/status and due time.

### Detail order

1. Plain-language recommendation.
2. Business consequence.
3. Path.
4. Breakpoint options.
5. Reasoning/evidence.
6. Owner and packet action.

This deliberately places the decision before the data dump while keeping all evidence one interaction away.

## 5. Visualization specification

### Attack path

- A horizontal stepped node-link diagram at desktop widths.
- Origin, workload, identity bridge, and crown jewel are distinct node types.
- The preferred breakpoint is drawn across the relevant edge, not as a detached legend.
- Mobile uses the same semantic order vertically.
- Each step has a visible text label; shape/color are supplementary.

Why: topology and causality are the question. A node-link view is appropriate only for the selected, simplified path.

### Priority composition

- Five horizontal contribution bars with exact points and labels.
- Total score is presented as “Decision priority,” never probability.
- Hard-gate callout sits above the bars.

Why: aligned bars support factor comparison and make the composite inspectable.

### Trend

- A small 30-day path-closure sparkline in the metrics region.
- Exact summary sits beside it.

Why: shows direction without taking attention from daily work.

### Avoided charts

- No donut for risk posture.
- No world threat map.
- No decorative event stream.
- No red/green-only heatmap.

## 6. Design system

### Typography

- Product/body: inherited Inter from the root layout.
- Evidence IDs, timestamps, values: inherited Geist Mono.
- Page title: 28px/34px desktop, 24px/30px mobile, 650 weight.
- Section heading: 14–16px, 650 weight.
- Body: 13–14px with 1.45–1.55 line height.
- Metadata: 11–12px, never below 11px.

### Color semantics

- Canvas: `#f4f4f1` warm neutral.
- Surface: `#ffffff`.
- Primary ink: `#161719`.
- Muted ink: `#686b72`.
- Border: `#deded8`.
- Product/action: indigo `#4f46d9`.
- Urgent: vermilion `#c83b2d`, with text/icon label.
- Attention: amber `#b26a10`.
- Verified: green `#18794e`.
- Information: blue `#1769aa`.

Colors are paired with icons, labels, patterns, or positioning. Large tinted fields are preferred to neon text on dark backgrounds.

### Geometry

- 8px base spacing with 4px micro-grid.
- Surface radius: 12–16px.
- Buttons: 9–10px radius.
- 1px borders; shadows only for overlays/active packet footer.
- Maximum main content width: 1600px; at 1440 the workspace fills the viewport.

### Density

- Queue row: 126–146px desktop depending on content.
- Detail tabs and sections use compact 12–16px padding.
- Progressive disclosure hides raw evidence until requested.
- Desktop should show at least three queue records and the complete path at 900px viewport height.

## 7. Component behavior

### Sidebar

- 224px desktop, persistent.
- Active item uses a light indigo field and dark text.
- Collapses below 980px into a compact top bar and five-item bottom navigation.

### Filters

- Segmented chips: All, Act now, Needs owner, Watch.
- `aria-pressed` communicates selection.
- The result count updates in text.

### Decision row

- Entire row is a button with an internal semantic hierarchy.
- Selected state has indigo inset border and tinted background.
- Hover cannot be the only affordance.
- Focus ring is 2px and visible on all surfaces.

### Breakpoint option

- Radio-card pattern.
- Contains path reduction, effort, disruption, and verification.
- Recommended option gets a product-colored label, not automatic selection after the user has chosen another.

### Sticky action footer

- Shows selected option and owner.
- Primary action reads “Create demo packet.”
- After creation, it becomes “Packet ready” and exposes a Reset demo action.
- Footer is not sticky on small screens to avoid obscuring content/focus.

### Feedback

- Local updates are immediate.
- An ARIA live toast confirms owner and packet changes.
- Buttons use a short busy state for simulated packet assembly.
- No fake network latency longer than 700ms.

## 8. Responsive behavior

### Desktop ≥ 1180px

- Sidebar + main content.
- Queue/detail split approximately 36/64.
- Attack path horizontal.
- Metrics in four columns.

### Tablet 760–1179px

- Compact top navigation.
- Metrics in two columns.
- Queue/detail stays split above 900px if space permits; otherwise stacked.

### Mobile ≤ 759px

- Top app bar and bottom navigation.
- Single-column content with 16px gutters.
- Metrics become a horizontally wrapping 2×2 grid, not a horizontal scroller.
- Queue first; selecting a decision opens detail and places a “Back to queue” control at top.
- Path becomes vertical.
- Breakpoint cards stack.
- Action controls are full-width and at least 44px high.
- No data table or fixed-width element may cause page-level horizontal overflow.

## 9. Accessibility

- Target WCAG 2.2 AA.
- Semantic landmarks: nav, header, main, section, aside.
- One H1; section headings follow order.
- Queue and cards use buttons/radios rather than clickable divs.
- All controls keyboard operable with visible focus.
- Minimum 4.5:1 body-text contrast and 3:1 non-text/UI contrast.
- Severity never communicated by color alone.
- `aria-live="polite"` for status changes.
- `prefers-reduced-motion` disables non-essential transitions.
- Graph includes a textual path summary and ordered list semantics.
- Icons with no independent meaning are `aria-hidden`.
- Mobile target sizes meet or exceed WCAG 2.2 minimum, generally 44px.

## 10. States

### Loading

- Preserve the page skeleton: metric blocks, queue rows, path, and detail headings.
- Do not show zero values during loading.
- Announce “Updating evidence” when initiated by the user.

### Empty

- Filter empty: “No decisions match this view” plus Reset filters.
- Cleared daily queue: verified illustration/icon, “Today’s primary queue is clear,” and next sync time.
- No integrations: guided connector and service-modeling checklist.

### Error

- Integration/source error is scoped to the affected evidence and shows last-known freshness.
- Decision ranking that depends on failed evidence displays reduced confidence.
- Whole-page fatal state includes retry and support reference.

### Stale

- Stale evidence gets a clock icon, exact age, and effect on confidence.
- Stale does not automatically mean safe or urgent.

### High attention

- A slim urgent band and “Act now” label.
- Avoid flashing, pulsing, alarms, or full-page red.

## 11. How the demo proves the differentiator

The top seeded decision is not merely “CVE critical.” It shows:

- CISA KEV and EPSS as separate evidence.
- A reachable path from public ingress to a Tier 0 patient-data service.
- A transparent 92/100 decision priority with factor contributions.
- Three valid breakpoints:
  - restrict public ingress (recommended, fast and reversible);
  - remove excessive role permission;
  - patch the vulnerable package.
- Tradeoffs that explain why the fastest path break can be safer than emergency patching.
- An owner assignment and locally persisted demo Decision Packet.
- Verification criteria that require a fresh network-policy evaluation and graph recompute.

This turns the product thesis into an interaction: the user moves from evidence to a defensible cross-team decision and sees the workflow state change.

