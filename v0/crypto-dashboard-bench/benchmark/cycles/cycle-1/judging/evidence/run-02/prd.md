# PRD — Yield Scout DeFi Opportunity Discovery

## Product thesis and positioning

Retail DeFi users cannot easily compare yields across protocols and chains without spreadsheets, multiple tabs, and guessing about impermanent loss and gas costs. Yield Scout is a **non-technical yield discovery and risk research tool** that turns protocol data into capital allocation decisions.

**Differentiated promise:** in under three minutes, a DeFi user can compare yields across 5+ protocols, understand which yields are sustainable vs. incentive-driven, estimate impermanent loss impact, calculate gas cost impact, and assess protocol risk from team history and audits—without SQL, without wallet connection, and without a recommendation engine that hides assumptions.

**Category:** yield discovery and risk assessment for retail DeFi capital allocation.  
**Primary user:** retail DeFi liquidity provider actively managing positions across 2–10 protocols and chains.  
**Secondary users:** DeFi explorer entering a new protocol/chain, DAO treasury allocator, risk-aware yield farmer, protocol risk researcher.

## Jobs, pains, buying trigger

- "Before adding liquidity to a pool, understand whether the 50% APY is real (protocol fees) or temporary (expiring emissions)."
- "Compare yields across Ethereum, Arbitrum, and Optimism while accounting for gas costs, so a $5k position makes sense."
- "Assess whether this new protocol is trustworthy by looking at team history, audits, and past incidents—without reading Discord."
- "Estimate impermanent loss for my current positions so I can decide whether to rebalance or add more capital."

Pain is fragmented data sources, missing gas-cost math, opaque yield components, and risk assessment requiring external research. The buying trigger is entering a new chain, spotting an outsized yield claim, or recovering from a bad allocation decision.

## Scope and non-goals

### MVP scope

1. Yield comparison table: protocol, chain, pool, APY (decomposed: base vs. reward), yield period (current day, 7d avg, 30d avg), TVL, volume, volatility estimate, and risk level.
2. Protocol risk cards: audit history, team history (previous launches, GitHub activity), hacks timeline, governance concentration, TVL concentration, and smart contract risk summary.
3. Impermanent loss calculator: select a pool and holding period (24h, 7d, 30d); see IL estimate, historical volatility, fee offset, and net return after IL.
4. Gas impact analysis: select a chain and position size; see gas cost for deposit, withdrawal, and swap; show gas as % of yield; warn if gas exceeds 30% of expected return.
5. Portfolio tracking (optional): import a read-only wallet address or paste positions; show unrealized IL, gas cost to exit, and total opportunity cost.
6. Alerts and favorites: bookmark protocols, set price/yield change alerts (mockup only, not live notifications).
7. Protocol deep-dive: drill into any protocol to see team members, GitHub stats, funding history, governance snapshot, and past incidents.

### Non-goals

No wallet signing, no transaction execution, no yield farming automation, no robo-advisor, no price prediction, no investment advice, no lending/borrowing analysis. The demo is read-only and shows no live data; all sources are clearly labeled as demo or historical snapshots.

## Critical workflow and acceptance criteria

### Yield discovery and comparison flow

1. User opens Yield Scout and sees a discovery table of 10–20 top yielding pools across popular chains (Ethereum, Arbitrum, Optimism).
2. User sorts by yield or filters by risk level; each row shows APY (base vs. reward breakdown), TVL, 7-day volume, and risk badge.
3. User clicks a protocol name or risk badge to see audit history, team details, past hacks, and governance concentration.
4. User selects an IL calculator action, enters a holding period (7 days), sees projected IL, fee offset, and net return estimate.
5. User selects a position size ($5k) and sees gas cost for the selected chain; the UI calculates gas as % of yield and warns if problematic.

### Portfolio impact flow

1. User opens Portfolio (if available); they can paste a wallet address or CSV of positions.
2. For each position, the tool shows unrealized IL, gas cost to exit, and how yield has changed since entry.
3. User can run a scenario: "If I rebalance 50% to the Aave USDC pool on Arbitrum, what is my new portfolio IL and gas impact?"

**Acceptance criteria:**
- Yield table is sortable and filterable by chain, risk level, and minimum TVL without horizontal scroll.
- APY is visibly decomposed (base yield visible separately from reward yield).
- Protocol risk is communicated via text summaries and semantic color (red = critical, amber = caution, blue = info).
- IL calculator shows a numerical estimate, historical volatility context, and fee offset.
- Gas cost is shown as a percentage of expected yield; small positions (<$1k) are flagged if gas exceeds yield.
- Every yield, risk, and price metric shows source and timestamp (e.g., "APY: 12.5% (source: DefiLlama, 2026-07-15 20:00 UTC)").
- The workflow requires no wallet connection, seed phrase, or private key.
- All data are labeled DEMO DATA and clearly not live.
- No horizontal overflow at 375px width; readable at 1440px width.
- All interactive elements work with keyboard navigation.

## Data sources, freshness, provenance, calculations

**Data sources:** Public Etherscan and chain RPC for on-chain balances and fee data; DefiLlama for yield rankings, TVL, and hacks timeline; GitHub API for team activity and repository stats; public audit reports (Trail of Bits, CertiK, OpenZeppelin); governance block explorers for voting power concentration; CoinGecko for price data and volatility; gas tracker APIs for current network costs.

Each observation stores `source`, `source_url`, `snapshot_time`, `freshness_sla` (e.g., "6 hours"), and `confidence_level` (high for on-chain observations, medium for yield averages, low for extrapolated gas costs).

**Derived calculations:**

- `base_yield = annual_fee_revenue / TVL`. On-chain observation.
- `reward_yield = annual_emission_value / TVL`. Depends on current emission schedule; flagged as temporary if incentive program has known end date.
- `total_apy = base_yield + reward_yield`.
- `yield_sustainability_score = (base_yield / total_apy)`. High score (>70%) indicates stable, low score (<30%) indicates incentive-driven.
- `estimated_il = 2 * sqrt(price_ratio) / (1 + price_ratio) - 1`. Math.abs() and applied to holding period volatility.
- `il_offset_by_fees = estimated_il - (annual_fee_rate * holding_period_days / 365)`. Positive = net gain, negative = net loss even after fees.
- `gas_cost_percent = (gas_cost_usd / (initial_position_usd * expected_yield_rate)) * 100`. Flags if >30%.
- `protocol_risk_score = weighted_sum(audit_recency, team_track_record, governance_concentration, past_incidents, tvl_concentration)`. Displayed as Red / Amber / Blue, not as a number.

All yield projections are explicitly labeled as projections, not forecasts. Gas cost estimates are based on current network conditions and may change.

## Entity model

`Chain` → `Protocol` → `Pool` (or Vault). `Pool` contains `Yield` (base, reward, period), `Liquidity` (TVL, volume), `RiskSignals` (audit, team, hacks, governance, contract). `User` (optional) has `Portfolio` → `Position` (pool, units, entry_price, entry_date). `Alert` stores preference (price, yield change, protocol milestone) and user choice (enabled/disabled).

## Trust, privacy, permissions, compliance

- No authentication or wallet connection required for yield comparison and protocol risk lookup.
- Portfolio features (if enabled) use read-only public addresses; no private key import.
- All audit data are from public sources (GitHub, audit firms' published reports); any summary is attributed with source URL and date.
- Team history is aggregated from public GitHub, LinkedIn (if scrapped), and past protocol launches; no private inference about individuals.
- Protocol risk signals are presented as separate observations (audits, hacks, governance %), not a black-box risk score.
- Alerts are client-side in the MVP; no email or push notification infrastructure.
- Product copy explicitly states: "Not investment advice. Yields change. Audits do not guarantee safety. Governance risk is real."

## Onboarding, activation, retention, analytics

**Onboarding:** User lands on Yield Scout, sees top 10 yielding pools with risk context, and can filter by chain or risk level within 30 seconds. Activation is "first protocol deep-dive (click to see audits/team)" or "first IL calculation."

**Retention loops:** daily yield ranking check, weekly rebalancing scenario (IL + gas impact), monthly protocol risk review (hacks timeline), and alerts for yield collapses or team events.

**Metrics:** time-to-first-yield-comparison, activation rate, weekly active users, average pools compared per session, portfolio import rate, IL calculator usage rate, alert set rate, average session duration, feature adoption by secondary user type (DAO treasuries, protocol researchers).

## Packaging, launch, and GTM

**Pricing hypothesis:** Free tier with yield comparison (top 50 pools), protocol risk summaries, and 1 IL calculation per day; Scout Plus at $9/month (50+ pools, unlimited IL calculations, portfolio import, yield alerts for 10 protocols, email digests); Scout Pro at $29/month (200+ pools, advanced risk analytics, multi-chain portfolio rebalancing scenarios, governance voting calendar).

**Launch GTM:** organic growth through DeFi educator communities and yield farming Discord channels; partnership with DefiLlama for "protocol deep-dive" links; lead magnet: "DeFi Risk Checklist" (5 questions to ask before adding liquidity). Narrative: **"Find yields that last, not yields that evaporate when incentives end."** Success is free-tier conversion to Scout Plus after first rebalancing decision, combined with retention through alerts and weekly rankings.

## Risks, dependencies, unknowns, roadmap

**Risks:** yield data lag (6+ hour updates not sufficient for active traders), false-positive risk signals (team member departure misinterpreted as exit risk), gas cost variance by transaction type (deposit IL vs. swap not identical), protocol risk algorithm bias (recent incidents weighted too heavily, past audits ignored). 

**Mitigations:** show data freshness timestamps and SLA, attribute team events to source and context, show gas cost ranges, weigh risk signals by recency and severity, and always present as separate signals, not an aggregated score.

**Dependencies:** DefiLlama API access, Etherscan or Alchemy RPC for balance data, GitHub API for team activity, audit report archives, gas price APIs, CoinGecko for volatility, protocol governance explorers.

**Unknowns to test:** minimum useful pool count (is 50 enough or do users want 200+?), preferred risk communication format (traffic light vs. narrative summary), willingness to pay (free tier sufficient for 80% of users?), portfolio feature adoption, alert utility (do users act on yield change alerts?).

**Post-demo roadmap:** 
- Protocol notification calendar (governance votes, incentive program changes, team announcements)
- AI-powered risk narrative (auto-generate summary of why this protocol is amber risk)
- Multi-chain portfolio rebalancing optimizer (suggest moves to optimize yield + gas)
- Institutional risk reports (for DAO treasuries and fund teams)
- Integration with portfolio trackers (Zerion, DeBank) for live position sync

