# Design — Yield Scout DeFi Opportunity Discovery

## Information architecture and navigation

**Primary sections:**

1. **Discover** (home): yield comparison table, filter by chain/risk, quick stats
2. **Protocol** (protocol detail): team, audits, hacks timeline, governance, TVL concentration
3. **Tools** (utilities): IL calculator, gas impact analysis, alert preferences
4. **Portfolio** (optional): import read-only address, position tracking, rebalancing scenario
5. **About** (meta): data sources, methodology, disclaimer

Navigation is top-level tabs at desktop (1440px), collapsible drawer at mobile (375px). All sections are stateless except Portfolio; filters in Discover reset on navigation.

## Critical journeys and acceptance criteria

### Journey 1: Discover yields and compare protocols

1. User lands on Discover, sees top 10 yielding pools sorted by APY, each row shows: protocol name, chain, pool (token pair/fee), APY (base | reward breakdown), TVL, volume (7d), volatility estimate, risk badge (Blue/Amber/Red).
2. User filters by Chain (Ethereum / Arbitrum / Optimism) or Risk Level (Blue / Amber / Red).
3. User sorts by APY, TVL, Volume, or Risk.
4. User clicks a protocol name or risk badge to drill into Protocol detail.
5. User returns to Discover; filter state is preserved during the session.

**Acceptance criteria:**
- Table is sortable on all numeric columns.
- Filter state is URL query params or session state (preserved on back).
- APY decomposition (base vs. reward) is visible in the table, not hidden in a popover.
- No horizontal scroll at any viewport width.
- Risk badge is semantic color and text (Red = critical risk, Amber = caution, Blue = info).

### Journey 2: Understand protocol risk before allocating capital

1. User clicks a protocol name (e.g., "Aave") to open Protocol detail.
2. User sees:
   - **Team section**: name, GitHub link, 30-day commit count, past protocol launches, team size estimate.
   - **Audit section**: list of audits (auditor name, date, severity findings, link).
   - **Hacks timeline**: grid or list of past incidents (date, severity, resolution summary, link).
   - **Governance section**: top voting power (as %), voting quorum, proposal age distribution.
   - **TVL concentration**: top 5 liquidity providers (as %), top 5 tokens (as % of TVL).
3. User returns to Discover.
4. User clicks "Calculator" button on a pool row, triggering the IL calculator modal.

**Acceptance criteria:**
- Protocol detail loads instantly from demo data (no API call).
- Team GitHub stats are real (sample data from 2026-07-15 snapshot).
- Audits list is real (sample audits from public reports).
- Hacks timeline is sortable by date; each incident shows resolution summary.
- Governance and concentration data are clearly labeled as snapshots (no real-time update).

### Journey 3: Calculate impermanent loss and estimate net return

1. User clicks "Calculator" on a pool or selects Tools > IL Calculator.
2. Modal opens pre-populated with the selected pool or empty if from Tools menu.
3. User selects:
   - Pool (protocol + token pair + fee tier)
   - Holding period (24h / 7d / 30d / custom)
   - Liquidity amount ($)
4. Tool displays:
   - Estimated IL (%): numeric value based on historical volatility.
   - Fee offset: annual fees minus IL over holding period.
   - Net return after IL and fees (%).
   - Historical volatility context: "Volatility has ranged from X% to Y% in the past 30 days."
5. User adjusts holding period; values update instantly.
6. User closes modal and returns to Discover or Portfolio.

**Acceptance criteria:**
- IL calculation is deterministic based on volatility estimate (not random).
- Result shows IL, fees, and net return as separate line items.
- Historical volatility context is shown to explain IL estimate.
- Disclaimer: "IL is an estimate based on historical volatility; actual results vary."
- Modal is keyboard-closeable (ESC key).

### Journey 4: Calculate gas cost impact on position profitability

1. User selects Tools > Gas Impact or clicks a pool row and selects "Gas Analysis".
2. Modal opens with:
   - Chain (auto-filled from pool or user selectable)
   - Position size ($)
   - Action (deposit / withdraw / both)
3. Tool displays:
   - Current gas price (gwei)
   - Estimated gas cost (USD)
   - Gas cost as % of expected annual yield
   - Warning if gas exceeds 30% of yield
   - Impact summary: "This $5k position will cost ~$80 to deposit + withdraw, equal to 8.5% of expected 12% annual yield."
4. User adjusts position size; values update instantly.
5. User closes modal.

**Acceptance criteria:**
- Gas cost is shown in both gwei and USD equivalent.
- Calculation is clear: (gas_gwei × gas_price_gwei × eth_price / position_size_usd) × 100.
- Warning threshold is explicitly 30% of expected yield.
- All inputs and outputs are labeled; no magic numbers.

### Journey 5: (Optional) Portfolio tracking with unrealized IL and rebalancing scenario

1. User opens Portfolio section.
2. User can paste a wallet address (read-only, e.g., "0x123...") or import CSV with positions.
3. For each position, dashboard shows:
   - Protocol, chain, pool, units, entry price, current price, unrealized IL, gas cost to exit.
   - Time-weighted performance: "Entered 30 days ago at $1800; current $2100; with 15% IL, net return is 18%."
4. User clicks "Scenario: Rebalance", selects a new pool, and amount to move.
5. Dashboard shows:
   - Gas cost to exit position + enter new pool.
   - IL impact on exiting position vs. entering new position.
   - Net change in portfolio IL and yield.
6. User can save scenarios to localStorage for later review.

**Acceptance criteria:**
- No wallet connection or private key required.
- Portfolio state persists in localStorage (survives page refresh).
- Scenarios are saved locally; no server storage.
- All calculations show assumptions and sources.

## Visualization choices, units, time ranges, and risk semantics

### Yield table (Discover section)

- **Columns**: Protocol | Chain | Pool | APY (Base / Reward) | TVL | Vol (7d) | Volatility | Risk
- **APY display**: "12.5% (9% base, 3.5% reward)" — always decompose.
- **TVL, Volume**: "$42.3M", "$128K" with suffix; show freshness "TVL as of 2026-07-15".
- **Volatility**: estimated from 30-day price history; show as "Low (8%) / Medium (25%) / High (45%)" with context.
- **Risk badge**: Color + text.
  - **Blue**: "Low Risk" = audited, team track record, <20% governance concentration.
  - **Amber**: "Caution" = recent audit, new protocol, >30% governance concentration, or past minor incident.
  - **Red**: "Critical Risk" = unaudited, team has multiple exits, ongoing exploit, or high smart contract risk.

### Protocol detail cards

**Team card:**
```
Team @ Aave
- 20+ core developers
- GitHub: 45 commits in last 30 days
- Team track record: Aave Protocol (launched 2020), dYdX integration (2021)
- Data as of: 2026-07-15
```

**Audits card:**
```
Security Audits (3)
✓ Trail of Bits (May 2025) — Low severity findings, all resolved
✓ CertiK (Jan 2025) — Medium finding in governance, documented
✓ OpenZeppelin (Aug 2024) — No critical issues
```

**Hacks timeline card:**
```
Incident History
2023-10 Flash loan attack — $18M recovered, governance process improved
2022-04 Oracle failure — 6h downtime, oracle migration completed
```

**Governance card:**
```
Governance Snapshot
Top voting power: AAVE token holders 45%, Aave Labs 12%, Ecosystem DAO 8%
Proposal age: 20 active proposals, avg 15 days to execution
Quorum: 80% AAVE required (vs. TVL lock of 3% baseline)
```

### IL and gas impact display

**IL calculator result:**
```
Impermanent Loss Estimate (Ethereum USDC/ETH, 7-day hold)

Estimated IL: -8.2%
  (Based on 45% volatility over past 30 days)

Fee offset: +1.4%
  (Annual 0.3% fee × 7/365 days)

Net return after IL and fees: -6.8%

Context: Volatility has ranged from 25% to 65% in the past 30 days.
If volatility returns to 35%, IL would be ~5%.

⚠️ This is an estimate, not a guarantee.
```

**Gas impact result:**
```
Gas Cost Analysis (Arbitrum, $5,000 position, deposit + withdraw)

Gas cost estimate: $12 USD
  (~0.5 gwei × $2400/ETH)

Gas as % of expected yield: 1.2%
  (Expected 12% annual yield on $5k = $600 annual = $50 monthly)

✓ Gas cost is reasonable for this position size.

Assumption: Gas prices stable at current rate.
```

### Risk semantics

Color palette (accessible and semantic):
- **Blue (#3B82F6)**: Informational, low priority. "New pool" or "Interesting opportunity". 
- **Amber (#F59E0B)**: Caution, review needed. "Governance risk" or "Recent change".
- **Red (#EF4444)**: Critical, action needed. "Unaudited" or "Ongoing exploit".
- Never use green; it implies safety, which is false in crypto.

All severity labels are text + color, never color alone. Example: "🔴 Critical Risk — Unaudited smart contract (as of 2026-07-15)".

## Visual system direction, typography, color, density, and interaction

### Visual hierarchy

- **Primary**: yield comparison table, main discovery interface.
- **Secondary**: protocol details, team/audit cards.
- **Tertiary**: calculators, filters, scenario results.

### Typography

- **Heading 1 (h1)**: "Yield Scout" — Inter Bold 28px.
- **Heading 2 (h2)**: Section title (Discover, Protocol) — Inter Bold 20px.
- **Body**: Yield values, team names, audit dates — Inter Regular 14px.
- **Mono**: Wallet addresses, GitHub links, transaction hashes — Geist Mono 12px.

### Color palette

- **Neutral backgrounds**: 
  - Light theme: #FFFFFF (content), #F3F4F6 (secondary background).
  - Dark theme: #0F1117 (content), #1C1F26 (secondary background).
- **Text**:
  - Light theme: #111827 (primary), #6B7280 (secondary).
  - Dark theme: #E5E7EB (primary), #9CA3AF (secondary).
- **Semantic**:
  - Blue (Low Risk): #3B82F6.
  - Amber (Caution): #F59E0B.
  - Red (Critical): #EF4444.
- **Charts**: Recharts default colors, adapted for dark mode.

### Density and spacing

- Table rows: 48px tall (includes label + value + risk badge).
- Cards: 16px padding, 8px gap between elements.
- Modal dialogs: max-width 500px, center-aligned.
- Responsive breakpoints:
  - Mobile (375px): single-column, stacked cards, drawer navigation.
  - Tablet (768px): two-column where applicable, side-by-side calculator + result.
  - Desktop (1440px): multi-column, split-pane protocol detail.

### Interactions and microinteractions

- **Sortable table**: Click column header to sort ascending/descending; visual indicator (▲/▼).
- **Filter dropdown**: "Chain: All (▼)" expands a checkbox list; selection updates table instantly.
- **Row expansion**: Hover over risk badge to preview risk summary; click to drill into protocol detail.
- **Modal interactions**: 
  - Focus first input on open.
  - Submit button disabled until valid inputs.
  - ESC key closes modal.
  - Overlay click outside modal does not close (prevent accidental dismissal).
- **Calculator inputs**: Debounce 300ms before re-calculation to avoid lag.

## Responsive behavior, accessibility, loading/empty/error states

### Mobile-first responsive layout

**375px (mobile):**
- Navigation: bottom tab bar or hamburger drawer (hidden by default, slide in on tap).
- Yield table: simplified columns (Protocol, APY, Risk) with row expansion for details.
- Cards: full-width, stacked vertically.
- Modals: full-width with top padding for safe area (if needed).

**768px (tablet):**
- Navigation: horizontal tab bar.
- Yield table: all columns visible, horizontal scroll if needed (last-resort fallback; preferred: responsively hide low-priority columns).
- Cards: two-column grid where applicable.

**1440px (desktop):**
- Navigation: top nav or sidebar.
- Yield table: all columns, sticky header, optional side-by-side split view for protocol detail.
- Cards: three-column or grid layout as appropriate.

### Accessibility

- All semantic HTML: `<table>` for tabular data, `<button>` for interactive elements, `<a>` for links.
- ARIA labels for icon buttons: `<button aria-label="Filter by risk level">Filter</button>`.
- Color is not the only indicator: use text labels in addition to color (e.g., "Red: Critical Risk" not just red dot).
- Keyboard navigation: Tab to focus, Enter to activate, Escape to close modals.
- Focus indicators: visible border or outline on focused elements.
- Screen reader: table headers have scope="col"; risk badges have aria-label describing severity.

### Loading state

Skeleton loaders for table rows and cards while data loads:
```
<div className="animate-pulse">
  <div className="h-12 bg-gray-200 rounded"></div>
</div>
```

Estimated load time: 1–2 seconds for full demo (static data, no real API).

### Empty state

If filters result in no yields:
```
No yields found for your criteria.

Try:
- Widening your risk level filter
- Selecting a different chain
- Clearing filters to see all pools
```

### Error state

If data fails to load (rare in demo, but prepared):
```
⚠️ Data unavailable

We encountered an issue loading yield data.
Refresh the page or try again in a few moments.

Data source: DefiLlama
Last updated: 2026-07-15 20:00 UTC
```

## How the implementation demonstrates the product differentiator

The key differentiators are:

1. **Transparent yield decomposition**: Every yield is split into base (sustainable) and reward (temporary) components, preventing users from chasing evaporating incentives.

2. **Contextual IL and gas impact**: Instead of showing APY in isolation, IL calculator and gas analysis show the actual expected return after all costs.

3. **Protocol risk transparency**: Team track record, audit history, governance concentration, and hacks timeline are all visible and attributed, so users make informed decisions.

4. **Non-technical interface**: No SQL, no wallet connection, no complex math visible—just clear comparisons and estimates with sources and assumptions.

The demo prioritizes these elements: a sortable, filterable yield table with APY decomposition as the primary interface; a protocol detail view showing team/audit/governance signals; and calculator tools that show the full math behind IL and gas impact. The visual design emphasizes semantic color and clear attribution, reinforcing that this is a research tool, not a trading platform.

