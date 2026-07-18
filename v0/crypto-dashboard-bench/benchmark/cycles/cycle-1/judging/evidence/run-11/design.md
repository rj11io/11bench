# Design specification — Cairn Treasury Control

## Information architecture

The app is a compact operating console, not a market terminal.

- **Overview:** morning decision, spendable liquidity, coverage/runway, open exceptions, source health.
- **Liquidity map:** exact wallet/venue rows, buckets, networks, purpose, and drill-down.
- **Controls:** policies, thresholds, approvals, and source permissions.
- **Reconciliation:** observed vs. expected, unmatched movements, close status.
- **Reports:** evidence-pack history and export affordances.

The demo implements Overview and the core Liquidity map / Controls / Reconciliation states in one route so the main decision loop is visible without pretending to have backend pages.

## Critical journeys and states

1. **Morning review:** scan header → read coverage card → inspect open decision queue → review an exception → memo/mark reviewed.
2. **Liquidity drill-down:** choose network filter → compare spendable/reserved/pending/locked → open a wallet drawer → inspect source, purpose, policy, and as-of timestamp.
3. **Stress check:** switch to Scenario → select 10%, 20%, or 30% shock → observe derived coverage change → return to Snapshot with observed state intact.
4. **Trust state:** persistent Demo data banner; each card has source and timestamp; a stale source appears in amber; pending is not styled as available.
5. **Empty/error states:** no source shows a connect-read-only CTA; stale source shows “refresh required”; no exceptions shows “clear — nothing awaiting review”; errors explain what failed and preserve last known snapshot.

## Hierarchy, comparison, and drill-down

The header establishes context: “Northstar Labs / Treasury control”, Demo data, and “as of 09:42 UTC”. The primary row is the decision summary: spendable liquidity, runway, coverage band, and safe release. The next row puts the exception queue beside policy guardrails so action and constraint are adjacent.

The liquidity table is the exact comparison surface. It uses rows for wallet/venue, network tag, purpose, four bucket values, total, and a semantic health label. Filters are compact chips; on mobile they scroll horizontally. Clicking a row opens a right-side detail drawer on desktop and an inset sheet on mobile.

## Visualization choices and semantics

- **Coverage band:** horizontal bar for spendable vs. 30-day burn and policy floor. It gives a ratio and a clear threshold; no false precision.
- **Liquidity distribution:** mini stacked bars show spendable/reserved/pending/locked proportions. Exact amounts remain in the table.
- **Scenario chart:** a small SVG line/area chart with labeled time axis and a dotted “policy floor” line. It shows a derived coverage range, not price action.
- **Policy bars:** progress toward a limit, with text labels such as “Hot wallet cap · 14.2% / 18%”.
- **Status language:** red “Breach”, amber “Review”, blue “Informational”, gray “Pending”. Color is paired with words and icons.
- **Units:** USD with `$` and compact millions; token units with symbol; weeks with `w`; every derived metric has a visible method/source disclosure.

## Visual system

Direction: **quiet control room** — warm bone background, ink text, deep navy panels, cobalt blue for selected/derived information, amber for attention, coral-red for breaches, and mint only for a confirmed clear state. The visual idea is a “cairn” marker: small stacked signal blocks and thin rules that help a finance operator orient without visual noise.

Typography uses the global Inter for UI and route-local Geist Mono for numbers, timestamps, hashes, and source labels. Use 12–14px compact metadata, 16px body, 20–28px card values, and a 46px hero value. Rounded 14–20px cards, 1px low-contrast borders, 12-column desktop grid, and generous 24px outer padding. Dense data tables use zebra-free rows with separators rather than heavy card nesting.

Interaction: short 150ms transitions, visible focus rings, hover detail, no auto-refresh animation. Buttons say exactly what they do: “Review”, “Open source”, “Run scenario”, “Connect read-only”.

## Responsive and accessibility behavior

At ~1440×900: 240px fixed left rail, 1fr content column, 320px decision rail, two-column lower grid. At ~375×812: rail becomes a horizontal compact nav, header actions wrap, summary cards stack, decision queue moves above the table, table becomes a vertically scrollable region with the first identity column sticky, and drawers become full-width inset panels. No element relies on hover alone.

Use semantic headings, `aria-label` on icon buttons, `aria-pressed` for filters/tabs, keyboard-visible focus, sufficient contrast, and `role="status"` for state changes. Respect `prefers-reduced-motion`. Chart labels have text equivalents; numbers are not encoded by color alone.

## Differentiator in the demo

The demo’s center of gravity is not the chart. It is the explainable “safe to release” decision: a spendable number that excludes reserved/pending/locked buckets, connects to a coverage band, points to policy exceptions, and lets the operator review with a memo. The Scenario toggle makes the distinction between observed data and derived risk visible in one click.

