# Design specification — Luna Exposure Triage

## IA and navigation

The desktop shell has a slim dark navy rail: workspace switcher, Overview, Exposure queue (active), Assets, Reports, and Settings. A teal live-data indicator and “Demo workspace” label establish trust. The page header carries “Exposure / Triage queue”, date window, search, and a low-noise refresh affordance. Mobile collapses the rail into a top bar with the active section and menu button.

## Key journey and states

The default state is an actionable overview with four metric cards, a seven-day open-critical trend, and a ranked queue. Selecting a queue row updates the right evidence panel without navigation. High-attention state is the red “SLA risk” bar and one highlighted KEV row. Normal state shows progress and healthy evidence freshness. Empty state (filter with no matches) explains how to clear filters. Error/loading are represented as inline UI patterns in the code and keep the action surface stable.

## Hierarchy and visualization

Priority order is score → title/asset → due date → owner → state. The main queue uses rows because comparison and scanning matter more than decoration. A 7-day sparkline is a compact temporal read with accessible summary text. Severity is encoded by label and shape/icon as well as color; teal means active/fresh, amber means attention, red means urgent, slate means neutral. The factor bars deliberately expose the decision recipe: asset criticality, internet exposure, exploit evidence, and recency.

## System direction

Visual language: “calm control room” — deep ink canvas, warm white cards, a mint/teal accent, and a restrained coral for urgent signals. Typography uses the provided sans for readable product copy and monospace for IDs, timestamps, CVEs, and data provenance. 12px radius, 1px borders, subtle shadows only for the active detail panel. Density is compact but breathable: 16–20px page gutters, 12–16px row padding, clear dividers.

## Responsive, accessibility, feedback

At ≥1100px, two-column workbench is 1.2fr / .8fr. At 760–1099px the detail panel moves beneath the queue. At ≤560px, metrics become a 2×2 grid, the trend is full width, queue rows become cards, and the detail panel is inline. All interactive elements are real buttons with accessible names, focus-visible outlines, and 44px minimum touch targets. Chart summaries are rendered as text. Reduced motion removes row/detail transitions.

## Differentiator demonstration

The “Why this is #1” panel is the product thesis in one glance: observed exploit evidence, internet-facing asset, business tier, and evidence timestamp are visible. “Copy remediation brief” is the owner handoff; “Mark in progress” and “Snooze” demonstrate stateful collaboration. The demo badge and source labels make clear that signals are seeded, not live controls.

