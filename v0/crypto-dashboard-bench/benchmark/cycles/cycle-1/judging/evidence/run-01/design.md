# Design spec: Glidepath demo

**Route:** `/<ANONYMIZED_RUN>` · **Date:** 2026-07-17
**Companions:** [research.md](./research.md), [prd.md](./prd.md)

The demo implements the PRD's decision loop: *review → stress-test → fix via
proposal → hand off to the multisig.* Every design choice below serves that
loop or the trust posture around it.

---

## 1. Information architecture and navigation

```
Workspace bar (always visible)
├─ Org switcher: "Meridian Protocol Foundation" | "New workspace" (empty state)
├─ Global scenario chip (shows active stress scenario, if any)
├─ Demo-data badge: "Demo — seeded data, not live" (persistent, non-dismissable)
└─ Theme toggle (light/dark)

Primary nav (5 views — sidebar ≥1024px, top segmented scroll bar on mobile)
1. Overview    — the weekly review screen (default)
2. Positions   — the ledger: filter, sort, drill down
3. Stress test — scenario workbench
4. Policy      — the ruleset, editable
5. Proposals   — rebalance planner + saved proposals
```

Single Next.js route; views switch client-side (state in React, active view
not persisted — a fresh visit always lands on Overview, which is the review
habit we're building). Policies, scenarios, proposals, and workspace choice
persist in `localStorage` under the `glidepath:` prefix.

**Why one route:** the product is one continuous work session, not a site.
View switching must never lose scenario state — a stress scenario set in
Stress test stays applied while the user inspects Positions or drafts a
proposal. That cross-view persistence *is* the differentiator made tangible.

## 2. Critical journeys and states

### J1 — Weekly review (happy path)
Land on Overview → runway hero with stress range → policy strip all green →
scan movers and alerts → done in under a minute. **State: normal.**

### J2 — Volatile market
Toggle the "Correction" or "Crisis" preset (or land during one — demo seeds
an alert). Prices reprice everywhere; runway range compresses; one or more
policies flip to fail; alert banner explains in plain words what changed.
**State: volatile.** The scenario chip in the workspace bar makes the
counterfactual mode unmistakable.

### J3 — Fix a violation (core loop)
Policy card shows "Issuer cap: FAIL — 62% of stables are USDC (limit 50%)"
→ "Plan a fix" → Proposals view opens with a suggested move pre-staged →
user adjusts amount → before/after panel shows runway, every rule, and
slippage cost → "Save proposal" → proposal card with signer summary and
0-of-3 signature placeholders labeled "simulated." **State: risk-focused.**

### J4 — First run
"New workspace" org → every view renders a purposeful empty state: what the
view will show, and the one action that unblocks it ("Add a custody account
(demo)" seeds sample accounts). No dead grids, no NaN. **State: empty.**

### Loading and error
Demo data is local, so loading is a brief skeleton on view mount (200 ms,
honest about being cosmetic in code comments). Error state is designed for
the stale-feed case: any figure older than 2× its target lag gets an amber
"stale" chip; the demo seeds one stale exchange feed to show it.

## 3. Hierarchy, comparison, filtering, drill-down

- **Hierarchy:** each view has exactly one hero (Overview: runway; Positions:
  the table; Stress test: the projection chart; Policy: the rule list;
  Proposals: the draft composer). KPI tiles are secondary; charts never
  compete side-by-side at equal weight.
- **Comparison:** before/after is a two-column delta panel (proposals) or
  base-vs-stress paired figures (runway). Deltas always show sign, unit, and
  direction-is-good coloring (green up only when up is good).
- **Filtering:** Positions filters — custody account, chain, asset class —
  as a single row of comboboxes/segments above the table; filters never
  repaint series colors (color follows the entity).
- **Drill-down:** position rows expand in place: quantity, price + source +
  as-of, liquidity tier with slippage curve note, risk tags with one-line
  explanations, custody detail (named account, checksummed address
  prefix…suffix, signer threshold).

## 4. Visualization choices (form → color per the dataviz method)

| Data | Form | Color |
|---|---|---|
| Runway (headline) | Hero figure "13.9 months" + paired stress figures | ink; stress figures secondary ink |
| Projected treasury value under base/−30%/−60% | Multi-line with emphasis: base solid blue (`series-1`), stress lines muted gray, direct-labeled at line end; zero baseline; "stable floor" threshold hairline | emphasis (1 hue + grays) |
| Allocation by asset class | Single horizontal stacked bar, 4 classes (Stablecoins, Majors, Staked, Own token), 2px gaps, direct labels + legend | categorical slots 1–4, fixed order |
| Stablecoin issuer mix vs cap | Meter per issuer against the 50% limit line | sequential blue; limit as ink hairline; breach flips meter fill to status-critical with icon+label |
| Treasury value history (90d) | Single-series area, no legend (title names it) | series-1 blue |
| Peg deviation (per stablecoin drill-down) | Sparkline with ±50 bps band | line ink; band gridline gray; breach dot status-critical |
| Policy compliance | Status list: icon + label + plain sentence (never color alone) | status palette (good/warning/critical), reserved |
| Movers (24h) | Table column with signed deltas | delta green/red text tokens |

Chart chrome: hairline grids, recessive axes, tabular numerals in tables and
axes, tooltips on every plot (crosshair on lines, per-mark elsewhere), no
dual axes anywhere. Palette is the validated reference set from the dataviz
system, declared as CSS custom properties in the route's CSS module with
selected dark-mode steps (not auto-flipped), scoped under the route root.

**Units & time:** USD with SI abbreviations ($4.21M) and full values in
tooltips; months to one decimal for runway; bps for peg deviation and
slippage; all timestamps absolute ("as of 09:41 UTC · simulated") — the demo
runs on a fixed seeded clock, stated in the footer. Time ranges are labeled
on-chart (90d history; 24-month projection).

**Provenance semantics:** every aggregate carries a source chip
("Aggregated feed · simulated"), an as-of time, and — if stale — an amber
stale chip. Sellable-asset rows carry a liquidity tier (Deep/Moderate/Thin)
that drives slippage estimates in proposals.

**Risk semantics:** four plain-word tag types on positions — *issuer*,
*contract*, *market*, *concentration* — each expanding to one sentence
("Issuer: this token depends on Circle honoring redemptions"). Status colors
only ever mean state; series colors never encode risk.

## 5. Visual system

- **Direction:** calm instrument, not trading terminal. Generous whitespace,
  quiet surfaces, one accent. The tone says "your accountant's desk," and
  urgency is reserved for genuine policy failures — so when red appears, it
  means something.
- **Typography:** Inter (inherited `--font-sans`) for UI; Geist Mono
  (`--font-mono`) strictly for figures, addresses, and table numerics.
  Scale: 12/13/14 body sizes, 20 section titles, 44–56 hero figure.
- **Color:** neutral shadcn tokens for chrome; dataviz palette for data;
  status palette for state. Route-local accent (deep blue `series-1`) for
  primary actions. Both light and dark are first-class; dark uses selected
  darker-surface steps.
- **Density:** comfortable on Overview (decision screen), dense on Positions
  (work screen — 8px row padding, tabular nums, right-aligned figures).
- **Interaction:** every control is keyboard-reachable shadcn primitives;
  scenario sliders show live value labels; destructive-looking actions
  (delete proposal) confirm inline. Optimistic local writes (localStorage).

## 6. Responsive behavior

- **≥1280:** sidebar nav (icon+label), 12-col content grid; Overview is a
  2-column composition (runway hero spanning wide, policy strip right).
- **768–1279:** sidebar collapses to icons; cards stack to single column;
  table keeps all columns with horizontal scroll *inside the card*.
- **≤767 (375×812 target):** top scrollable segmented nav; KPI tiles 2-up;
  hero chart full-bleed within card; Positions becomes stacked row-cards
  (asset, value, change, chevron to expand); filter row becomes a sheet.
  No page-level horizontal overflow at any width — wide content scrolls
  inside its own container.

## 7. Accessibility

- Contrast: text tokens on tokens surfaces (AA); sub-3:1 series colors never
  carry meaning without a direct label; status always icon + word.
- Charts: every chart has a text equivalent (the adjacent figures/table);
  Positions *is* the table view for allocation data.
- Focus states via shadcn defaults; nav is real buttons with `aria-current`;
  live scenario changes announce via a polite `aria-live` region on the
  runway figure.
- Reduced motion: transitions gated behind `prefers-reduced-motion`.

## 8. How the demo proves the differentiator

1. **"Worst-case runway, always":** the runway hero never renders a single
   number — base and stress figures are one visual unit, and the projection
   chart draws all three paths with the stable floor threshold.
2. **Policy as software:** editing a limit in Policy re-evaluates the strip
   on Overview and the before/after panel in Proposals instantly — one
   engine, three surfaces.
3. **Scenario continuity:** an applied stress follows the user across all
   five views via the workspace-bar chip — the "what if" mode is ambient,
   not a modal calculator.
4. **Trust posture:** read-only framing in the UI copy, named custody
   accounts with truncated checksummed addresses, signer-readable proposal
   summaries, simulated-signature states clearly labeled, and the permanent
   demo-data badge. Nothing pretends to be live.
