# Design Specification: Breachline Exposure Command

## Information Architecture

Single-route demo with five workspace zones:
- Command header: posture, demo-data disclosure, source freshness, and time window.
- Executive strip: exploited exposure, overdue KEV, SLA risk, and burn-down metrics.
- Triage queue: ranked exposures with filters and attention states.
- Detail workspace: selected exposure evidence, priority explanation, remediation action, and activity.
- Source health and owner workload: operational trust and collaboration context.

The route intentionally avoids broad navigation because the demo's core value is the daily triage workflow.

## Critical User Journeys

High-attention triage:
1. User sees overdue/high-attention exposure at top of queue.
2. User opens details and reviews risk factors and evidence.
3. User assigns remediation or records an evidence-backed exception.
4. Queue, metric cards, and activity log update.

Empty state:
1. User filters to a combination with no matching exposures.
2. Empty state explains that no demo exposures match and offers a reset.

Normal state:
1. User reviews all exposures and sees a mix of overdue, due soon, monitoring, and mitigated states.

## Dashboard Hierarchy and Prioritization

Priority score is displayed as a 0-100 number with factor bars:
- Exploit signal: KEV, active exploit telemetry, or public proof of concept.
- Business blast radius: critical services and asset count.
- Exposure: internet-facing or privileged path.
- SLA pressure: overdue or due soon.
- Control gap: missing EDR, WAF, segmentation, or patch validation.

The highest visual weight belongs to the queue and detail panel. Metrics support decisions but do not dominate the workspace.

## Visualization Choices

- Compact metric cards: fast posture scanning.
- Ranked queue: best fit for a task list requiring action.
- Factor bars: explain a score without implying false precision.
- Timeline: shows source lineage and auditability.
- Owner workload bars: shows collaboration bottlenecks.
- SLA chips: visible non-color status labels for accessibility.

## Design System Direction

Tone: dense, operational, sober, and trustworthy.

Typography:
- Uses inherited Inter and Geist Mono from the root layout.
- Small labels and compact cards for a security-operations tool.

Color semantics:
- Critical: red.
- Due soon/high attention: amber.
- Mitigated/healthy: green.
- Informational: cyan/blue.
- Neutral surfaces: near-white panels with dark text for readability.

Components:
- Buttons use icons where helpful, with visible text for primary commands.
- Filters are compact segmented buttons/selects.
- Cards have small radii and do not nest inside other cards.
- Table becomes stacked action cards on mobile.

## Responsive Behavior

Desktop 1440x900:
- Two-column operational layout: queue left, detail right.
- Side sections for source health and owner workload below/alongside detail.

Mobile 375x812:
- Header stacks.
- Metrics become a two-column grid.
- Queue cards stack above details.
- Sticky desktop sidebars are avoided.
- All controls wrap without horizontal overflow.

## Accessibility

- Semantic landmarks and headings.
- Buttons and filters use visible focus states.
- Severity is communicated by text and shape, not only color.
- Inputs have labels.
- Live status copy appears after disposition changes.
- Motion is minimal and not required to understand state.

## Loading, Empty, and Error States

The demo uses local seeded data, so there is no network loading. It still represents:
- Empty filter state with reset control.
- Source degradation state in the source-health panel.
- High-attention state through overdue KEV and active exploit exposure.
- Persisted local action state with reset demo control.

## Demonstrating the Differentiator

The implementation makes the differentiator visible in every selected exposure:
- A ranked score with reason bars.
- Evidence from multiple source types.
- Business service and owner context.
- Action buttons that change workflow state.
- Exception and "not exploitable" handling to reduce alert fatigue.
- Source health so users can judge trust before acting.
