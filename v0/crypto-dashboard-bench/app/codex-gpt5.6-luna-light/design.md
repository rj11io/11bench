# Cairn design specification

## IA and navigation

Desktop shell: left rail with Cairn mark, vault selector, Overview, Risk queue, Reports, Settings, and a seeded-demo status footer. Mobile collapses to a top bar and horizontal navigation. Overview is the daily brief; Risk queue is the action surface; Reports is the shareable evidence surface.

## Hierarchy and interaction

Header establishes “Monday brief”, vault, snapshot date, and status. Four metric cards answer value, change, runway, and review count. The main canvas pairs NAV trend with allocation. Right rail keeps “Needs review” actionable. Clicking a review item opens an in-page detail panel; the payment check opens a focused calculator dialog. Tabs are implemented as stateful filters; report preview is a stateful mode. Preferences persist locally.

## Visual system

Warm paper background, ink typography, ink-blue actions, sea-glass positive, amber attention, and coral block. Use Fraunces for editorial headings and Geist/system for compact operational text. Medium density, 12px–16px radii, hairline borders, restrained shadow. Numbers use tabular figures. Positive does not mean “safe”; amber and coral always include text labels.

## Visualization and states

NAV line: USD, 7D / 30D toggle, line chart with a visible zero-change baseline and “illustrative snapshot” label. Allocation: horizontal bars with percentage and USD; risk list: severity pill + evidence. Every chart shows snapshot time/provider nearby. Loading uses skeletons, empty state explains how to add a watch-only vault, error state preserves last known snapshot with a stale badge, and volatile state raises a “stress case” note.

Responsive: at ≤900px, right rail moves below charts; at ≤600px, two-column cards become one, chart height reduces, table rows become cards, and no control depends on hover. Focus rings, semantic buttons, 4.5:1 text contrast, non-color severity labels, and reduced-motion-friendly transitions are required.

The differentiator is demonstrated by the “Can we pay?” readiness card and detail drawer: both combine policy, liquidity, provenance, and safe next action in one decision rather than showing a disconnected market feed.
