# Design specification — Sentryline

## Information architecture

Persistent left rail: logo, Overview, Exposure, Activity, Policies, Settings; workspace switcher and a Demo data status control. The main workspace uses a compact top bar with page title, snapshot timestamp, freshness legend, and a primary “Review risks” CTA.

Overview hierarchy: decision banner → KPI strip → runway chart and risk queue → allocation / recent activity. Exposure is comparison-first. Activity is evidence-first. Policies and Settings are intentionally low priority in the demo.

## Critical journeys and states

- Normal: “Safe to spend” headline, runway chart, three risk cards, asset allocation.
- Volatile: amber freshness strip, “last verified snapshot” language, widening risk band on chart, review queue promoted above allocation.
- Empty/onboarding: watch-only explanation and demo entry; no wallet connection claim.
- Error: source chip changes to “stale,” data cards retain last verified value, a recoverable “check source” action appears.
- Acknowledged: risk row becomes muted with “acknowledged by you” and persists in localStorage.

## Interaction and visualization

Range pills switch 30d / 90d / 180d chart paths. Nav tabs switch the core module without a full-page reload. Risk cards open a compact evidence drawer. “Review risk” acknowledges a selected item and reduces the open count. Allocation bars show share with a secondary liquidity label. The runway chart uses days on the x-axis, USD on the y-axis, a white spendable line, an amber policy floor, and a shaded uncertainty band.

Every value uses explicit USD or token units. Dates are absolute in the evidence view. Source and freshness sit adjacent to derived values. Risk semantics use text + icons + color: red = action required, amber = review, green = within policy, blue = informational.

## Visual system

Midnight ink (#0b0d12) canvas, raised graphite panels (#151820), warm paper text (#f3efe7), muted slate labels, amber signal (#e7a957), coral action (#eb806f), mint clear (#7fd1b2), and electric blue provenance (#8da9ff). Typography is a condensed display face for large figures and a neutral sans for labels. Density is information-rich but uses generous panel padding, 1px borders, and purposeful whitespace. Rounded corners are modest (10–14px); charts are thin and editorial, not neon trading UI.

## Responsive and accessibility

At ~1440px, use a 232px rail and a 12-column content grid. At ~900px, collapse the rail to icon buttons and stack the lower panels. At ~375px, convert the rail to a horizontal top strip, stack all cards, make chart horizontally safe with SVG viewBox scaling, and keep controls reachable. Use semantic landmarks, visible focus rings, `aria-label` on icon-only controls, table headers, keyboard-operable buttons, and text labels alongside color.

## Differentiator demonstration

The first screen answers “safe to spend?” before “what is the price?” The decision banner, policy-floor runway chart, and source-aware risk queue demonstrate the product wedge. The demo badge, seeded snapshot timestamp, and evidence drawer prevent a polished mock from masquerading as live financial infrastructure.
