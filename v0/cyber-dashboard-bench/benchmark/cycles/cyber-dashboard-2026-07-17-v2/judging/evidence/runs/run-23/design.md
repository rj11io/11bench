# Design specification — Signalroom

## IA and journeys

Persistent dark rail: Overview, Triage, Attack surface, Owners, Activity; workspace controls below. Overview opens with date context, one urgent callout, four metrics, queue/detail split, then trend and source coverage. The primary journey is Overview → priority queue → selected finding → explainability → recommended owner → next best action → mark remediated. Secondary journey is filter/search → inspect result → assign.

The queue is the visual center of gravity. Severity is a text label plus tint; ranking rationale is never encoded by color alone. The detail panel is a compact “decision card” with explicit evidence and status. Empty results should retain controls and say “No findings match this view”; loading uses skeleton rows; connector failures should show a source-specific error with retry and last-known timestamp.

## Visual system

Warm off-white canvas (#f5f8f7), white panels, ink navy, muted slate, and a dark blue-green navigation rail. Signal green means healthy/closed/actionable; coral means urgent; amber means attention; gray means neutral. Manrope supports legibility, with DM Mono for IDs, timestamps and metric labels. Borders are quiet, radii 7–10px, shadows omitted to preserve an operational feel. Tables use 11–12px text and generous row height for scanability.

The implementation demonstrates the differentiator through the “Why this is prioritized” card, the recommended owner, a concrete next best action, and live queue count changes after remediation. Search, severity filters, nav, time range, row selection and demo sync state are interactive.

## Responsive and accessibility

At ≤900px the rail collapses to an icon rail and content becomes one column. At ≤560px, metrics become two columns, row metadata collapses, and the action button spans the width; no horizontal scrolling is required. Controls are native buttons/inputs/selects with visible focus via browser defaults; semantic text accompanies status color; target sizes are ≥28px. Future work must add keyboard-visible focus tokens, screen-reader live announcements for queue changes, reduced-motion support, and full WCAG contrast validation.
