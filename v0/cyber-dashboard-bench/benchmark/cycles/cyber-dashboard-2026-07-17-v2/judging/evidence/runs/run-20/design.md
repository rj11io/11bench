# Harbor — design specification

## Intent

Harbor is designed for a security operator who must make a defensible decision quickly and carry enough context into an engineering handoff. The interface should feel like a calm, precise operations workspace—not a theatrical “hacker” dashboard. Its visual differentiator is the visible bridge between an exposure path and an owned commitment.

## Information architecture

**Global navigation (desktop rail):** Queue (default), Services, Evidence, Reports, and Settings. In the demo, Queue is the active working surface; inactive destinations are visually honest navigation affordances rather than fake fully-built products.

**Queue page hierarchy:**

1. Workspace header: organization name, demo-data disclosure, selected time range, notification/help/avatar utilities.
2. Page headline and utility view selector: `Priority queue` versus `Coverage`.
3. Actionable top panel: urgent-path count, owned/at-risk commitments, a small weekly path trend, and an explicit data-freshness label.
4. Filter rail: all work / urgent / needs owner / at risk / verified; filters update queue and summary.
5. Path queue: high-signal, selectable rows with lane, title, business target, strongest evidence reason, owner, deadline, and state.
6. Inspector: the selected path’s “why now,” route, evidence factors, recommended interruption, owner plan, activity timeline, and control actions.

On a wide screen, queue and inspector sit beside each other. Selection is not a modal because comparison and queue context matter. On a phone, the selected item becomes a stack beneath the queue; selecting a row scrolls to the inspector, preserving native back/forward and keyboard behavior.

## Primary journey and states

### 1. Triage and assign

An analyst enters the Priority queue, selects a “Critical” card, and reads the `Why this is in your queue` callout. The callout states input facts in plain language—such as “CISA KEV, public ingress, and a route to Payments API”—with confidence and source timestamp. The analyst follows the route from entry to target, checks the interruption recommendation, selects an owner, and presses **Assign & start plan**. The button shifts to **Plan active**; a durable owner badge and recent activity item confirm the action.

### 2. Track a remediation

The owner sees the plan block with scope, due date, target, and ticket reference. They may move it to `Blocked` or `Ready to verify`. `Blocked` uses amber plus a text label and exposes a reason. `Ready to verify` changes the action to **Verify interruption** only for a security reviewer in the production design; the demo illustrates that state transition and labels it simulated.

### 3. Empty/high-attention/data states

- **High attention:** a dark red-tinted top panel appears when a KEV path is due within 48 hours or lacks an owner. It states the condition and provides a filter shortcut.
- **Filter-empty:** a friendly inline state explains that no paths match and provides Clear filters.
- **True empty:** “No verified urgent paths right now,” explains the last ingestion time and encourages coverage review.
- **Loading:** preserve panel geometry with text skeletons and announce loading through a polite live region.
- **Source stale/error:** retain cached path data, badge it as stale, state which connector failed and when, provide retry/connector status—not a misleading all-clear.

## Prioritization logic in the interface

The lane is a recommendation based on discrete visible inputs, not an unexplained risk score:

- **Critical:** actively exploited or very high exploit-likelihood *and* public/reachable path to a tagged critical target; or a broad high-leverage choke point with tight deadline.
- **Priority:** material path with a defined interruption and critical/service context, but not confirmed active exploitation.
- **Monitor:** incomplete context, lower exposure, or a non-production path; shown only when asked so it cannot dilute urgent work.

The inspector separates `Known exploited`, `EPSS`, `Public reachability`, `Target criticality`, and `Path confidence`. A language-based explanation tells the analyst why those factors combine. This follows the PRD’s rule that EPSS is likelihood, not a risk score, and makes it straightforward to dispute a faulty input.

## Visualization choices

| Visual | Data / behavior | Why it fits |
| --- | --- | --- |
| Weekly line / area trace | Count of currently open verified paths, sampled by day. | A small trend gives orientation without pretending it measures total security. The value is the current queue. |
| Route strip | Ordered nodes: public entry → vulnerability / permission transition → target service, with one highlighted choke point. | A focused linear path is easier to scan than a graph canvas for this one decision and makes the recommended interruption legible. |
| Signal chips + factor bars | KEV flag, EPSS likelihood, public reachability, service tier, confidence, freshness. | Preserves the evidence ingredients and avoids false precision from a composite score. |
| Queue card severity bar | Priority lane, owner, SLA, status. | Enables fast scanning and retains a plain-text label for non-color interpretation. |
| Activity timeline | Human and connector events in time order. | Provides handoff trust, collaboration context, and auditability. |

## Design system direction

### Personality and visual language

The canvas is a deep ink navy with slightly raised graphite surfaces, a high-contrast warm-white content layer, and sparing neon mint for healthy/verified state. Critical is vermilion, at-risk is amber, informational state is electric blue, and indeterminate/stale is muted slate. Color is backed by words, icons, and borders. Thin grid rules, a scanline-like trend fill, small monospaced evidence labels, and node connectors establish technical credibility without resorting to generic cyber imagery.

### Typography, density, and components

- UI font: system sans stack with 14–15 px working text, 12 px metadata, 20–28 px task headings, and tabular numerals for metrics.
- Evidence strings/IDs: a restrained monospace treatment to make provenance scannable.
- Dense desktop list rows are 78–92 px; their full semantic label remains in the accessible name. Mobile cards are 96+ px and separate facts vertically.
- Components: rail nav, metric card, segmented filter, selectable path card, status pill, avatar/owner control, route node, evidence chip, progress/plan block, activity event, button, select, disclosure, and toast.
- Cards use 14–18 px radii, low-elevation borders, and a crisp 2 px blue keyboard focus ring. Motion is 160–220 ms and disabled under `prefers-reduced-motion`.

## Responsive behavior

At 1100 px the inspector narrows but remains paired with the queue. At 880 px the rail becomes a compact top brand bar and the metrics collapse from three columns to a stack. At 720 px the queue is full width, inspector follows it in document flow, filters horizontally scroll with fade affordance, and action buttons become full-width/stacked. No desktop table is forced into a 375 px viewport; cards surface concise labels and the route strip scrolls only within its own bounded area when necessary. Header buttons retain at least 24 px target size and practical 36–40 px hit areas.

## Accessibility and interaction feedback

- Use semantic `button` for selectable cards and actions, `nav` with labels, headings in sequence, named controls, `aria-pressed` for filters, `aria-current` for nav, `aria-live="polite"` for action confirmation, and status text in addition to color.
- All focusable items visibly focus; focus is never removed on selection. Card selection supplies a textual “Selected” cue to assistive tech.
- Route nodes include an ordered textual representation; decorative connector lines are hidden from screen readers. Sparkline gets a text equivalent.
- Tooltips only supplement visible labels. Hover cannot be the only way to read explanation.
- The demo uses a “Simulated workspace data” banner at the top and labels state actions as demo actions. It never implies current live detections or production controls.

## Demo proof of differentiator

The implemented demo starts on a critical `Public API → CI runner role → Payments API` path. The inspector makes its evidence and smaller break-point clear, then lets the evaluator assign it, activate the plan, mark it ready to verify, or filter to a no-work state. The selected card, owner/plan status, and activity result persist through `localStorage`, demonstrating that Harbor is not a static dashboard: the decision packet becomes an operating commitment. Seeded rows include an ownerless urgent item, an at-risk in-progress item, a monitored item, and a verified path to demonstrate meaningful normal, high-attention, and resolved states.
