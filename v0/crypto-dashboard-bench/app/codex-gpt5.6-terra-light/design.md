# Design specification — Northstar Treasury Pulse

## Structure and hierarchy

Desktop uses a narrow identity rail, a top “demo / source / as-of” trust bar, then a decision header. The main grid puts runway, protected cash and concentration first; a review queue carries the most actionable signal; a compact allocation composition and evidence panel explain it. On mobile, the rail collapses to a top wordmark and all cards stack.

## Core journey

The user starts with the weekly question and an explicit seeded-data disclaimer. They can switch Normal/Volatile/Focus/Empty scenarios. Selecting a review item updates the detail pane. “Mark reviewed” records a local timestamp and changes the item state; a scenario switch deliberately does not masquerade as a market update. A reset appears in empty state.

## Visualization semantics

Runway is expressed in months plus a labeled $238k monthly-burn assumption. Composition uses a stacked horizontal bar because the question is proportion, not a time series. The cash ladder compares immediate / 7-day / policy hold, with USD values. Severity is not green/red alone: labels, icons, copy and pattern/border convey status. Sources, timestamps and coverage stay adjacent to values. Data is sample data prepared for the demo as of 16 Jul 2026 09:30 UTC.

## Visual system

Direction: quiet, editorial operations console. Ink navy, warm paper, electric cobalt for selected state, moss for protected, amber for review and coral for risk. Inter/host sans hierarchy, mono numerals for financial values, generous 18–24px card gaps, 14px corner radius. Button and tab controls have visible focus rings and 44px mobile targets.

## States and accessibility

Skeleton/loading would reserve card height; an unavailable connector displays “stale / unknown,” never zero. Empty state explains no accounts are mapped and offers reset sample. Semantic buttons, live status text, sufficient contrast, no color-only meaning, responsive grid and reduced-motion-friendly transitions support accessible use. The implementation demonstrates differentiation through the decision queue, coverage/provenance line and persisted review action.
