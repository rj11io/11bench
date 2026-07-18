# Clearrail design specification

## Design intent

Clearrail should feel like a carefully operated financial control room, not a trading terminal. The main unit of attention is a **decision with evidence**. Dense information is organized with an opinionated reading order: what must happen, what is blocking it, which route is eligible, then the evidence/hand-off. The interface deliberately avoids candles, token logos as trust signals, and green performance language.

## Information architecture

| Area             | Purpose                                                      | Primary question                          |
| ---------------- | ------------------------------------------------------------ | ----------------------------------------- |
| Readiness (home) | Next run, funding capacity, exception queue, route readiness | “Can today’s payment run proceed?”        |
| Plans            | Draft/approved route plans and their immutable versions      | “What did we decide and why?”             |
| Corridors        | Route policy, source/destination inventory, route health     | “Which rails can we use?”                 |
| Evidence         | Issuer, route, recipient, and screening evidence             | “How fresh and complete is the evidence?” |
| Policies         | Gates, cutoff, approver and retention settings               | “What must be true before a handoff?”     |

The demo makes Readiness primary. Desktop navigation stays in a 232px left rail; mobile exposes a horizontally scrollable top nav. The shell header always exposes scenario status and a clearly labeled, non-live data provenance control.

## Critical journey

1. **Orient:** operator sees “Tuesday payout run,” the cutoff, available funding, and a seeded-scenario notice in the main header.
2. **Triage:** an exception queue names the exact affected condition and distinguishes “review” from “block.” The user can acknowledge ownership; acknowledgement persists locally but does not falsely resolve the condition.
3. **Choose:** selecting “Compare routes” opens a plan panel with three candidates. Each gives finality class, expected time, fee estimate, capacity, and specific readiness checks.
4. **Commit:** user selects an eligible route and saves a working plan. The UI records “local demo state saved” and makes no external request.
5. **Stress-test:** switching on the named demo scenario changes the same readiness signals to a risk-focused state, demonstrating that the product makes a recommendation reversible and explainable under degraded conditions.

## Hierarchy and visual system

- **Tone:** midnight navy base (`#07131c`), soft blue-black surfaces, calm mist text, and a restrained mineral/seafoam accent. This supports long operations sessions without generic “crypto neon.”
- **Signal colors:** seafoam means eligible/healthy, amber means review/estimated, coral means a blocking condition, and blue means informational. No status is color-only: every chip includes plain language and a small icon.
- **Typography:** Inter from the root baseline, 13px UI labels, 15px body, 22–30px operational headings; tabular figures and tracking on codes. Large values exist only when they change a payment decision.
- **Density:** 12-column content grid on desktop, 16–24px gaps, cards with 1px translucent borders, low-radius (12–18px) corners. Data labels use uppercase/letter spacing to create scan bands.
- **Trust treatment:** a persistent top-right stamp reads `Seeded scenario · no live connections`. Specific data tiles show “prepared 16 Jul 2026, 09:30 UTC” and the catalog card includes an evidence age. Risk language says `Review`, `Block`, `Estimated`, or `Unavailable`, never “safe.”

## Visualization choices and semantics

| Component          | Encoding                                            | Why it earns its space                                                                                                      |
| ------------------ | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Funding coverage   | Stacked horizontal bar, labeled funded/reserved/gap | Converts wallet fragments into the payment-relevant constraint. Uses USDC amount rather than a speculative fiat total.      |
| Route comparison   | Small route cards plus selected-row detail          | A route is multi-dimensional; cards preserve finality, ETA, fee, capacity, and policy gates without reducing it to a score. |
| Readiness timeline | Ordered stepper                                     | Makes pending compliance/review dependency distinct from chain transfer timing.                                             |
| Exception list     | Severity rail + entity + next action + evidence age | Supports triage and avoids alert count theatre.                                                                             |
| Evidence strip     | Date/source pills                                   | Data freshness/provenance stays attached to the decision, not in a separate disclaimer.                                     |

Time is UTC everywhere. Dollar amounts show `USDC` and use estimates only when explicitly described as such. Fees are named as an estimate; ETA uses an interval/expected time and finality class. Scenario values are crafted demo data, not price or liquidity assertions.

## Comparison, filters, and drill-down

- `All corridors`, `EU payout`, and `US contractor` filter the active payment context (the demo updates the visible label, without inventing new data).
- `Normal` and `Stress test` change only the local scenario. Stress explicitly injects a degraded route and increased review burden.
- Acknowledging a review item adds a “You own this” state and a local timestamp. It is persisted in local storage.
- Route selection changes the recommendation and full detail panel. The `Save working plan` action persists selected route and plan status in local storage; it displays a success message and no wallet connection dialog.
- Navigation moves between compact information panels. The deep product would use route-specific pages and immutable plan versions; the demo keeps it one responsive workspace.

## Responsive and accessible behavior

- **1440×900:** left rail, full header, two-column readiness grid; plan drawer appears as a fixed right panel with a scrim. The dashboard height supports an active work session without a long marketing page.
- **375×812:** no fixed desktop rail; top nav scrolls safely; grids collapse to a single column; cards use 16px internal spacing; the plan drawer becomes a full-width bottom sheet; action controls remain at least 40px high; no horizontal overflow.
- Buttons, chips, selects, and cards use semantic `button`/`select`/`label` controls. Keyboard focus has a visible high-contrast outline. Status is text + icon/color. Icons are `aria-hidden` when paired with text.
- Loading in production uses card skeletons that preserve layout. Empty corridors explain how to add read-only inventory. A stale/unavailable source remains a data-quality state, never a blank zero. Error states retain last-known data but mark its age and offer a retry/audit reference.

## Demo differentiator coverage

The implementation proves the product thesis through a route plan that contains gating evidence, a policy-impacting exception, and a non-executing handoff action. The stress switch demonstrates how Clearrail changes the operational recommendation without resorting to fake live charts. The route option, acknowledged review, and saved plan persist across refreshes so the demo reads as a working operations tool rather than a static dashboard.
