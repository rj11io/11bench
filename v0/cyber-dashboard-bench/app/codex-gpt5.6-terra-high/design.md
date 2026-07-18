# Design specification — Relay

## Structure and hierarchy

Desktop uses a slim dark rail, a contextual top bar, and a three-part decision surface: compact risk posture at top, ranked commitment queue at left, and persistent evidence/action drawer at right. Navigation: Command center, Exposure queue, Assets, Exceptions, Reports. The demo intentionally keeps the operator in the “decide → commit → verify” path rather than simulating every product surface.

The first visual priority is the **Act now** count, followed by an owned, ordered queue. The selected work item gets a full explanation: why now, affected asset, attack path, action recommendation, provenance, and activity. A calm “All clear” treatment replaces the queue when urgent work is completed.

## Journeys and states

1. Operator sees 3 act-now exposures, filters to them, and opens the highest-risk item.
2. Operator reads factor chips (KEV, public exposure, tier 0) and recommendation; chooses/affirms a mitigation and assigns the accountable service owner.
3. Operator marks the item in progress or resolved. The queue, posture count, and activity trail update; the decision persists locally.
4. If all urgent demo work resolves, the empty state shows verified calm with a reset action. A banner always says demo data/no live connections.

## Visual system

Relay uses a midnight-blue canvas, near-black rail, ink panels, and a restrained electric-mint action color. Semantics: coral = immediate/exploited, amber = attention, mint = resolved/healthy, muted blue = informational. Color never carries meaning alone: severity has an icon/text label, and status has readable text. Inter is inherited for UI; mono is reserved for CVEs, hosts, and numeric evidence. Density is deliberately operational: 12–14px supporting text, 16px row titles, generous 12–16px spacing around decisions.

The only chart is a seven-day line/area exposure trend, appropriate for direction over time; ranking uses a list, which better supports action. Score is an explainable 0–100 meter with factor chips rather than a decorative gauge.

## Interaction and accessibility

All interactions are native buttons/selects with visible focus. Status feedback uses an aria-live region. The queue remains keyboard navigable, the drawer uses semantic sections and headings, and contrast targets WCAG AA. Widths use minmax and content wraps; at ≤980px the drawer flows below the queue, and at ≤640px the rail becomes a top navigation strip, dashboard metrics stack, and action controls span the width. No desktop-only hover dependency. The line chart is paired with a textual trend value.

## Demo differentiator

The implementation makes Relay’s thesis concrete by updating an exposure’s scorecard, owner, workflow state, audit trail, top-line count, and empty state from one operator decision. The explanation is the interface: it exposes the signals behind the recommendation rather than asking the user to trust an unexplained severity score.
