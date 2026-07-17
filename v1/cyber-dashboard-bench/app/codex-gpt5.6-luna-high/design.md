# Cinder design specification

## Experience north star

Cinder should feel like a calm security lead’s Monday review: sparse enough to see the next move, detailed enough to trust it. The screen is not an alarm wall. It is a decision surface that moves from “what changed” to “who owns it” to “what proof closes it.”

## Information architecture

Desktop navigation is a persistent left rail:

1. **Overview** — shortest path to lower risk: top queue, risk trend, coverage, and work pulse.
2. **Work queue** — all remediation briefs with views for Assigned to me, All open, Needs decision, and Verified.
3. **Assets** — business-critical assets, owner health, and freshness.
4. **Reports** — weekly proof packet and trend exports.

Secondary workspace controls live at the bottom of the rail: source connections, team and role settings, and help. The top bar contains global search, notifications, a “Demo workspace” label, and the signed-in user.

The route-local demo focuses on Overview and simulates Work queue, Assets, Reports, and Integrations with lightweight state panels so the nav is meaningful without pretending there is a backend.

## Critical journeys and states

### Morning review

1. Overview loads with a “3 exposures need a decision” attention banner.
2. Maya scans the “Priority work” queue and opens the highest-priority row.
3. A right-side evidence drawer shows the score factors, attack-path summary, asset context, and suggested action.
4. She creates a Jira ticket from the brief; the CTA becomes “Ticket created · CND-184.”

### Verify a fix

1. Maya opens an item in progress.
2. The drawer shows “Last seen 18 min ago” and a verification checklist.
3. She clicks “Mark verified.” The item leaves the open queue, the verified count increments, and the action is persisted in `localStorage`.
4. The drawer timeline shows the verification event and the overview trend/metric reflects progress.

### Accept risk / snooze

The detail drawer provides a secondary menu for “Snooze 7 days” and “Accept risk.” The demo uses a compact confirmation state; production would require reason, approver, expiry, and audit event.

### Normal, high-attention, and empty states

- **Normal:** overview with a healthy 92% evidence coverage badge, weekly risk trend, and actionable queue.
- **High attention:** amber attention banner, red priority chips, and SLA countdown on an overdue item.
- **Empty:** the “Verified” queue view shows a clear completion state when no local demo items have been verified; its copy explains how new verified items will appear.
- **Loading/error:** the source-health strip includes skeleton-ready layout guidance and an explicit “Data freshness” warning if a source sync is older than its threshold. The demo’s refresh action displays a temporary syncing state.

## Dashboard hierarchy and prioritization logic

The hierarchy is:

1. **What needs a decision today?** — attention banner and queue.
2. **Are we moving risk?** — KPI cards and trend.
3. **Where does the recommendation come from?** — evidence drawer.
4. **Can another team act?** — ticket preview and owner context.

Queue ordering is score descending, then SLA urgency, then evidence freshness. The score is not presented as truth; it is a compact summary of:

`business criticality × reachability × exploitation signal × blast radius × confidence`, with age and due date used for escalation.

The detail drawer uses “why this” factor rows rather than exposing a black-box formula. The demo’s high score is justified by “public entry,” “production,” “customer data,” and “known exploited.”

## Visualization choices

- **KPI cards:** exact numbers with change/target context; they support quick scanning and are not interactive charts.
- **Risk trend line:** lightweight SVG line chart across seven weeks, with a dotted target line. It communicates direction, not false precision.
- **Risk mix ring:** CSS conic-gradient ring plus text legend for open / in progress / verified. It is secondary to the queue and still readable without color.
- **Evidence chain:** stepped nodes and connectors (`Internet → api-prod → role → customer PII`) because the relationship matters more than aggregate volume.
- **Queue:** table on desktop, stacked cards on mobile. Columns are priority, work, owner, due, and status; source and asset context appear in the row body.

## Design system

**Direction:** “quiet precision.” Dark graphite navigation, warm off-white canvas, white cards, hairline borders, and one vivid signal color (amber) plus restrained red/green semantics. This makes urgency legible without turning every surface into an alert.

**Typography:** Inter from the root app for UI, with tight numeric styling and small uppercase labels for metadata. Headings use semibold 26–32px desktop, 24px mobile. Body text is 13–15px. Numbers use tabular numerals.

**Color semantics:**

- ink/navy `#142033` — primary text and navigation
- muted slate `#667085` — secondary text
- border `#E4E8EF` — structure
- canvas `#F6F8FB` — page background
- amber `#D97706` / pale amber — needs decision, due soon
- red `#C2413B` / pale red — urgent or overdue
- green `#2E7D5A` / pale green — verified / healthy
- blue `#3978C5` / pale blue — informative/source state

Every semantic color is paired with text or an icon. Focus rings use a visible blue/ink outline.

**Components:** rail nav, workspace switcher, pill badge, KPI card, segmented queue tabs, filter button, priority row, source badge, owner avatar, timeline, evidence chain, drawer, toast, and full-screen mobile sheet.

## Responsive behavior

- At ≥ 1100px: 232px rail, 2-column dashboard with 1fr queue + 340px insight rail; drawer is 440px wide.
- At 768–1099px: rail compresses to icon + tooltip or becomes a slide-over; insight cards stack below queue.
- At ≤ 767px: top bar keeps menu, search, and avatar; nav becomes a compact bottom strip; KPI cards become a 2×2 grid; queue rows become cards; detail drawer becomes a full-height sheet with sticky action footer.
- At 375×812: main content has 16px side padding, no fixed-width table, no horizontal scroll, and the evidence chain wraps into a vertical timeline.

## Accessibility and feedback

- Use semantic `nav`, `main`, `header`, `section`, `table`, and dialog-like drawer structure.
- All icon-only controls have `aria-label` and a tooltip/title.
- Keyboard focus is visible; Escape closes drawer; Enter/Space activate cards and controls.
- Drawer opening moves focus to its heading in production; demo preserves a close button and keyboard access.
- Status and priority are expressed via words and icons, not color alone.
- Contrast target is WCAG 2.2 AA. Text never sits on low-contrast muted fills.
- Refresh uses an `aria-live` status; action feedback appears in a toast and in the item timeline.
- Loading uses skeleton blocks with labels in the accessibility tree; empty states state what happens next; errors state whether data is stale or action failed.

## Demonstrating the differentiator

The demo makes “evidence-backed” visible in three places: (1) the queue’s “why now” subline, (2) the drawer’s factor list and attack-path chain, and (3) ticket creation content that includes the acceptance/verification step. The user can complete the loop from recommendation → work item → verified closure and see the state persist after refresh.
