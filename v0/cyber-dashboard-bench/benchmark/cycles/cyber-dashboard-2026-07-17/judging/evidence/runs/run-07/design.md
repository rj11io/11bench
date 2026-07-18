# Design specification: Clearline Exposure Desk

## 1. Product and visual direction

Clearline should feel like a calm command surface for security work: precise, high-signal, evidence-forward, and slightly opinionated. Use a warm off-white canvas for readability, a graphite navigation rail for structure, cobalt as the action color, amber for time-sensitive risk, and red only for confirmed urgent attention. Avoid neon “hacker” aesthetics and avoid treating every alert as an emergency.

The desktop target is approximately 1440×900. The mobile target is approximately 375×812. The route is self-contained inside the run folder and uses route-local React/CSS only.

## 2. Information architecture and navigation

### Desktop shell

- Dark 236px left rail with Clearline wordmark and small “Exposure desk” descriptor.
- Environment switcher: `Northstar / Production` with a `DEMO` badge.
- Primary navigation:
  - Operations: Exposure desk, Workstreams, Assets
  - Governance: Exceptions, Evidence
  - Configuration: Integrations, Settings
- Bottom rail: Demo workspace status, team avatars, Help / keyboard hint.
- Main content area with a compact top bar: breadcrumb, date window, source freshness, demo-data pill, search / command affordance, notification, avatar.

### Mobile shell

- No persistent rail. Top bar includes menu button, Clearline mark, environment pill, notification, avatar.
- Bottom navigation has four items: Desk, Work, Assets, More.
- Secondary items open as a sheet or inline section.

### Page hierarchy

1. Exposure desk overview.
2. Filtered action queue.
3. Action detail drawer.
4. Workstream / status history.
5. Evidence and source freshness.

## 3. Critical journeys and states

### Journey A: first-glance triage

Landing state shows `Demo workspace` plus “Last source refresh 9 min ago.” An amber active-exploit strip says what needs attention, why, and how many actions are affected. The user can jump straight to `Review urgent actions`.

The KPI row then answers four questions: How much exposure is open? How many actions make up the priority set? What is unassigned? What is awaiting verification?

The action queue is the primary surface. Rows contain rank, severity, exploit signal, title/CVE, asset/service, owner, due state, and status. The first row has a visible border accent and “Priority recipe” chips so the product’s differentiator is evident without opening a modal.

### Journey B: explain → assign → track

Selecting a row opens a right-side detail drawer on desktop and a bottom sheet on mobile. The drawer includes:

- Header: severity, KEV / exploit badge, CVE, title, close button.
- Action strip: Assign owner, Create workstream, Move to fixing / Awaiting verification / Mark verified.
- `Why this ranks here` priority recipe with five factors and a local outcome.
- Affected scope with asset name, environment, reachability, business criticality, data class, source freshness.
- Recommended fix / mitigation steps.
- Workstream / ticket placeholder.
- Activity timeline with human names and timestamps.

Controls update the queue immediately and persist demo state in local storage. Any fake ticket or integration action is labeled as a simulated demo action.

### Journey C: verified closure

The action state flow is:

`Needs triage → Assigned → Fix in progress → Awaiting verification → Verified`

Optional branch: `Exception requested` with required reason and review date. The demo implements the main path and exposes the exception concept in the navigation and detail states.

After verification, the row leaves the open queue, the verified count changes, and the 30-day “verified risk reduced” trend increases. The drawer activity log shows the verification note and source.

### State matrix

| State | Visible treatment | User feedback |
| --- | --- | --- |
| Normal | Light canvas, open queue, cool gray borders | Stable, scannable hierarchy |
| High attention | Amber exploit strip, red severity accents only on urgent rows | “Review urgent actions” action and due context |
| Loading | Skeleton blocks and “Syncing source…” copy | No false freshness claim |
| Empty filter | Centered icon, “No actions match this view” and reset link | Keeps filter context visible |
| Error / stale | Red or amber source-health panel with last successful refresh | Explain what is stale; preserve existing data |
| Verified | Muted row in activity / summary, green verification icon | “Verified in demo” plus evidence note |
| Mobile | Stacked cards, full-width queue, bottom-sheet detail | One-handed actions and no horizontal scroll |

## 4. Dashboard hierarchy and prioritization logic

The layout is deliberately asymmetric:

- **Top:** active exploit / urgency strip.
- **Next:** four KPI cards, with one primary KPI visually heavier.
- **Main left (about 64%):** action queue, because work is the product.
- **Main right (about 36%):** risk reduction trend, composition, source health / activity.
- **Overlay:** detail drawer for reasoning and handoff.

Queue order uses the product’s explicit recipe:

`KEV / confirmed exploit → public reachability → business criticality → technical impact → SLA / age → compensating controls`

The demo shows the factors as chips. It does not make a claim that the numeric score is a production risk calculation.

## 5. Visualization choices

- **KPI cards:** exact values and delta copy for operating decisions.
- **Verified risk-reduction trend:** area chart with 7 sample points and one highlighted “today” marker. Add a text summary under the chart so the insight is available without visual interpretation.
- **Queue composition:** stacked horizontal bar with four labeled bands; the bar is a compact comparison tool, not decoration.
- **Source health:** tiny integration list with status dot, last sync, and source name; no chart required.
- **Priority recipe:** horizontal sequence of labeled factors with colored emphasis for the factors that pushed the item higher.

## 6. Design system direction

### Type

- Interface / display: Inter from the root app, with medium or semibold weights for hierarchy.
- Data / CVEs / IDs: Geist Mono from the root app’s variable.
- Body: 14px desktop / 14px mobile, line-height 1.45.
- Page title: 30px desktop, 24px mobile.

### Color semantics

- Ink: `#17202c`.
- Muted text: `#667085`.
- Canvas: `#f6f8fb`.
- Surface: `#ffffff`.
- Border: `#e5e9f0`.
- Cobalt action: `#2f6df6`.
- Teal positive / verified: `#168a80`.
- Amber attention: `#c47b0a` with pale amber surface.
- Red urgent: `#c2464a` with pale red surface.
- Purple neutral insight: `#7257b5`.

Severity uses text labels, a color accent, and an icon / marker; color is never the only cue. Use red sparingly so a confirmed or SLA-breached issue earns attention.

### Component behavior

- Cards use 12–16px radius and subtle borders, with one primary call-to-action per region.
- Buttons have 40px minimum height, clear pressed / hover / focus states, and icon + label when ambiguity is possible.
- Row hover lifts contrast slightly; selected row uses a blue left border and subtle blue background.
- Drawer is 416px desktop width, full-height, with sticky header / action footer; mobile is a bottom sheet capped at 92vh.
- Pills communicate status, source, or context, not paragraphs.
- Tooltips explain unfamiliar icons; essential text is always visible.

## 7. Responsive behavior

### 1440px desktop

- Rail visible.
- Main content max width around 1180px with 24px gutter.
- KPI grid 4 columns.
- Main grid `minmax(0, 1.65fr) minmax(300px, .9fr)`.
- Queue rows show all metadata in one line with controlled wrapping.

### 900px tablet / narrow desktop

- Rail shrinks to 72px icon mode or becomes a top navigation.
- KPI grid becomes 2 columns.
- Main grid stacks trend below queue.

### 375px mobile

- Rail hidden; mobile header and bottom nav visible.
- KPI grid 2 columns with compact type, or one column when content width is constrained.
- Action rows stack title / asset / owner / status; rank and score remain aligned.
- Charts are full width and at least 160px tall.
- Drawer becomes bottom sheet; background scroll is locked while open.
- No table-like fixed width; all text wraps or truncates with accessible title attributes.

## 8. Accessibility and interaction feedback

- Use semantic `main`, `nav`, `section`, headings, buttons, and labels.
- Every icon-only button has an accessible label.
- Focus ring is 2px cobalt with offset; never remove the default keyboard path.
- Severity and status have text labels plus color / icon.
- Chart has a text summary: e.g. “Verified risk reduced from 18 to 31.4 in the last 30 days.”
- Live result count announces after filter changes.
- Touch targets are at least 40px high, with 44px preferred for high-frequency actions.
- Escape closes drawer and modal; focus should return to the selected row.
- Respect reduced motion by avoiding essential transitions; motion is limited to drawer / toast feedback.

## 9. Demo-specific implementation proof

The implementation demonstrates the thesis in the first viewport:

1. “Top actions” is a bounded queue, not an alert feed.
2. Every urgent row has visible exploit / reachability / criticality context.
3. The drawer makes the ranking recipe legible and shows evidence freshness.
4. Assignment, workstream creation, and verification update visible state.
5. A small 30-day trend moves after verification, connecting action to risk reduction.
6. A `Demo data only` status remains visible so seeded records are not mistaken for live security controls.
