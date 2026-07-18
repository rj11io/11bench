# Design Specification: ResolvePoint Exposure Command

## Product Experience Summary

ResolvePoint is a dense operational tool for exposure management leads. The first screen should answer: "What must be fixed today, why does it matter, who owns it, and what do I do next?" The design prioritizes decision confidence over visual spectacle.

## Information Architecture

### Primary Navigation

- **Command:** daily focus queue and selected exposure detail.
- **Assets:** source freshness, critical assets, ownership gaps.
- **Risk:** business-unit risk movement and SLA reporting.
- **Exceptions:** accepted risk, expiry dates, compensating controls.
- **Audit:** assignment, status, and model-change history.

The demo implements the Command view and previews the other navigation areas as disabled/secondary items.

### Page Hierarchy

1. **Header:** product name, demo data disclosure, environment summary, reset action.
2. **Signal strip:** action-needed count, overdue count, verified risk reduction, source confidence.
3. **Risk movement:** 30-day risk trend and remediation-capacity summary.
4. **Focus queue:** ranked exposure packs with search/filter.
5. **Exposure detail:** priority rationale, attack path, evidence, remediation steps, status controls.
6. **Systemic insights:** root-cause bars and owner workload.

## Critical User Journeys

### Journey A: Decide What To Fix First

- User lands on Command view.
- Top queue item is visually high-attention.
- User can compare score, action bucket, business service, owner, due date, KEV/EPSS/internet-exposed evidence.
- Selecting a row updates the detail pane without navigation.

### Journey B: Explain Priority to an Owner

- User opens an exposure pack.
- Detail pane shows why it was prioritized: exploit signal, internet exposure, asset criticality, blast radius, identity path, affected data.
- Attack path diagram translates abstract risk into a concrete chain.
- Remediation steps are written as owner-facing actions.

### Journey C: Assign or Defer

- User chooses "Assign owner," "Mark exception," or "Mark verified."
- Status changes persist in localStorage for the demo.
- Exception remains visible and clearly marked as residual risk.

### Journey D: See Empty and Filtered States

- User filters to Verified or searches for text.
- If no results match, a clear empty state explains that no demo packs match the filter.

## Prioritization Logic

Priority is displayed as an explainable score, not an opaque truth. The modeled contributors are:

- Known exploited vulnerability or confirmed exploitation.
- EPSS probability and percentile.
- Internet exposure.
- Asset/business criticality.
- Privileged identity path.
- Sensitive data or regulated service.
- Ransomware association.
- Number of affected assets and recurrence.
- SLA/due-date urgency.
- Compensating controls and source confidence.

Action buckets:

- **Act now:** exploited, externally reachable, or business-critical with near SLA breach.
- **Schedule:** important but not immediate.
- **Investigate:** incomplete evidence or possible false positive.
- **Exception review:** deferred risk requiring governance.
- **Verified:** remediated and confirmed.

## Visualization Choices

- **Area chart for risk trend:** shows direction and risk reduction over time. Counts alone would reward closing low-risk issues.
- **Ranked cards/table for queue:** operational users need sortable, scannable work items more than a high-level KPI grid.
- **Attack path diagram:** best fit for explaining why an exposure is reachable and consequential.
- **Horizontal bars for root causes:** supports systemic remediation planning and avoids pie-chart ambiguity.
- **Signal chips:** evidence is discrete and should be readable without relying only on color.

## Design System Direction

- **Tone:** quiet, precise, operational.
- **Layout density:** compact but not cramped; 8px card radius; no nested card stacks.
- **Typography:** system sans inherited from root, small labels for metadata, restrained headings sized to panel context.
- **Color semantics:**
  - Red: actively exploited or overdue.
  - Amber: exception, scheduling risk, pending action.
  - Teal: verified reduction and healthy signals.
  - Violet: identity/data path context.
  - Neutral graphite/off-white: base surfaces and text.
- **Iconography:** lucide icons for commands and signal categories.
- **Interaction feedback:** selected queue item, pressed buttons, focus-visible ring, status chips that update immediately.

## Responsive Behavior

### Desktop: 1440x900

- Left rail navigation.
- Main work area with metrics and charts.
- Two-column operational area: queue on the left, detail pane on the right.
- Systemic insight bars visible below.

### Mobile: 375x812

- Navigation becomes a horizontal scroll strip.
- Header stacks.
- Metrics become a two-column grid.
- Queue and detail stack vertically.
- Cards replace wide table behavior.
- No horizontal overflow; charts use responsive containers and minimum heights.

## Accessibility

- All controls are native buttons or inputs.
- Status never relies on color alone; labels are explicit.
- Focus-visible outline is high contrast.
- Chart values are summarized in text near the chart.
- Hit targets for primary buttons are at least 40px high where space allows.
- No drag-only interaction.
- Search input has a visible label.

## Loading, Empty, and Error States

- **Loading:** production would show skeleton rows while integrations refresh. Demo uses static data, so no network loading state is required.
- **Empty:** filter/search state shows a dashed panel with reset guidance.
- **Error:** production would show stale-source banners per integration. Demo includes source freshness indicators and trust notes.
- **High-attention:** overdue and Act now packs use strong left-border and text indicators.

## Demo Differentiator

The implementation demonstrates the PRD differentiator by making the user operate through an exposure decision workflow, not by passively viewing widgets. The seeded data contains realistic risk signals, asset ownership, attack paths, remediation steps, and business context. Assignment, exception, and verification actions mutate state and persist locally, showing how ResolvePoint compresses scanner noise into auditable remediation decisions.
