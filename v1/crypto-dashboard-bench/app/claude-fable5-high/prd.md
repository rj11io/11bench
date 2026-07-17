# PRD: Glidepath — the treasury runway console for crypto-native organizations

**Status:** Draft 1 for demo build · **Owner:** benchmark run `claude-fable5-high`
**Date:** 2026-07-17 · **Companion docs:** [research.md](./research.md), [design.md](./design.md)

---

## 1. Thesis and positioning

**Thesis.** Thousands of organizations — DAOs, protocol foundations, and
crypto-native startups — pay salaries out of volatile on-chain reserves.
Their one recurring, high-stakes question is: *"How many months can we keep
paying people if the market turns, and are we inside the rules we set for
ourselves?"* Today they answer it with spreadsheets glued to block
explorers, or they pay $500+/month for accounting suites built to close the
books, not to make this decision. (Evidence in research.md §2–3.)

**Category.** Treasury risk and runway intelligence. Not accounting, not a
portfolio tracker, not custody.

**Positioning statement.** For the person who owns payroll at a crypto-native
organization, Glidepath is the weekly treasury review in one screen: runway
under stress, policy compliance, and the exact rebalance that fixes a
violation — handed off to the multisig your team already trusts.

**Differentiated promise.** *"Know your worst-case runway, always."*
Three things competitors don't combine:

1. **Runway as a range, not a number** — every projection shows the base
   case and stress cases side by side.
2. **A written policy, enforced by software** — concentration, issuer, and
   stable-floor rules checked continuously, with plain-language violations.
3. **Read-only by design** — Glidepath never holds keys or signs
   transactions. It produces reviewable rebalance proposals for the team's
   own multisig (a wallet requiring several keyholders to approve any move).

## 2. Users, jobs, pains, buying trigger

### Primary user & buyer: the operations/finance lead

Title varies: Head of Ops, treasury lead, COO, "the co-founder who owns
money." Manages $1M–$50M across multisigs, exchange accounts, and staking
positions. Reports to founders, a board, or token holders.

**Jobs to be done**
- Every week: check reserves, burn, and runway; spot anything drifting.
- Every month: report treasury health to founders/community; propose
  rebalances; get them approved and executed.
- Continuously: sleep at night knowing a 50% ETH drawdown doesn't mean
  missing payroll.

**Pains today**
- Balances live in 5+ places; the spreadsheet is stale the day it's built.
- Runway math ignores volatility — the number is fiction in a drawdown.
- Policies live in a governance post nobody re-reads; violations are
  discovered late.
- Accounting tools are priced and shaped for auditors, not weekly decisions.

**Buying trigger.** A scare: a sharp market drop, a stablecoin wobbling off
its dollar peg, a near-miss on payroll, or a new investor/board member asking
"what's our treasury policy?" — followed by the ops lead searching for
something between a spreadsheet and a $6k/year accounting contract.

### Secondary users

- **Multisig signers** (2–7 people): need to understand a proposal in plain
  words before signing it in their own wallet.
- **Founders / token-holder community:** consume the monthly report; in DAOs
  this is a public forum post.
- **External accountant/CFO-for-hire:** wants clean exports; a channel
  partner, not a blocker.

## 3. Scope

### In scope (v1, and demonstrated in the demo)

1. **Treasury overview** — total value, stable vs volatile split, burn,
   runway with stress range, active alerts, policy status.
2. **Positions ledger** — every position with custody location, chain,
   value, price change, liquidity note, risk tags, and provenance
   (source + as-of time). Filter by custody, chain, and asset class.
3. **Policy engine** — editable rules with continuous pass/fail:
   - Stable floor: ≥ N months of burn held in stablecoins.
   - Issuer cap: ≤ X% of stablecoins with any single issuer.
   - Volatile cap: ≤ Y% of treasury in volatile assets (own token counted
     separately).
   - Venue cap: ≤ Z% of treasury on any single exchange (off-chain custody).
4. **Stress testing** — interactive scenarios (crypto drawdown %, own-token
   drawdown %, stablecoin depeg, burn change) that reprice the treasury and
   recompute runway and policy status live.
5. **Rebalance planner** — from a violation or from scratch, compose moves
   (sell A for B, move venue), preview the post-trade policy/runway state
   including slippage estimates, and save a proposal with a signer-readable
   summary. Proposal statuses: draft → pending signatures → (executed —
   out of scope for v1; hand-off is the boundary).
6. **Workspace persistence** — policies, scenarios, and proposals persist
   locally (demo: `localStorage`; production: workspace DB).

### Non-goals (v1)

- No custody, key management, signing, or transaction execution.
- No accounting: no cost basis, tax lots, journal entries, or ERP sync.
- No yield strategy or investment advice; the product checks *your* policy,
  it does not recommend assets.
- No support for NFTs or long-tail LP positions (roadmap).
- No token-holder governance voting features.

## 4. Core workflow (the decision loop)

> Weekly review → spot violation or risk → stress-test it → compose
> rebalance → preview post-trade state → save proposal → signers approve in
> their own multisig → positions update → loop.

**Acceptance criteria (demo):**
- A user can see runway in months, with at least two stress cases, within
  one screen of landing. No number appears without an as-of time.
- Changing a policy rule immediately re-evaluates compliance everywhere.
- A stress scenario visibly reprices the treasury, changes runway, and can
  flip policies from pass to fail.
- A rebalance draft shows before/after for: runway, every policy rule, and
  the estimated slippage cost of each move.
- A saved proposal survives a page reload and shows a plain-language signer
  summary with named custody accounts (never raw addresses alone).
- An empty workspace shows a useful first-run state, not a broken dashboard.

## 5. Data: sources, freshness, provenance, calculations

### Entity model

- **Organization** → has one **policy set**, many **custody accounts**, many
  **proposals**.
- **Custody account** (Safe multisig, exchange account, staking contract) →
  chain, type, named label, many **positions**.
- **Position** → asset, quantity, custody account.
- **Asset** → class (stablecoin / majors / own-token / staked), issuer (for
  stables), regulatory status note, liquidity tier.
- **Price feed** → per asset: price, 24h/30d change, source, as-of.
- **Scenario** → shocks applied to price feed (drawdown %, depeg, burn Δ).
- **Proposal** → ordered moves, author, created-at, status, signer summary.

### Sources and freshness (production assumption)

- Balances: chain RPC / indexer per custody address, target < 2 min lag.
- Exchange balances: read-only API keys, target < 15 min lag.
- Prices: aggregated feed (e.g., CoinGecko-class VWAP aggregate; see
  research.md §4), target < 1 min lag; liquidity/depth refreshed hourly.
- Every displayed aggregate carries: source name, as-of timestamp, and a
  stale indicator when past 2× target lag.

**Demo:** all of the above is a seeded, fictional dataset labeled "Demo
data — seeded, not live" globally and "Simulated" on feeds. Timestamps are
seeded and rendered relative to a fixed demo clock, stated on screen.

### Calculations (v1 definitions)

- **Net burn** = trailing-3-month average monthly outflows − inflows
  (demo: seeded constant, editable in scenario panel).
- **Runway (base)** = spendable value ÷ net burn, where spendable = stables
  + majors at current prices (own token excluded by default — it is usually
  illiquid at size and selling it is a governance event).
- **Runway (stress)** = same with scenario-shocked prices; the default
  stress cases are −30% and −60% on volatile assets, configurable.
- **Stable-floor months** = stablecoin value ÷ net burn.
- **Concentration** = share of relevant total (issuer share of stables,
  venue share of treasury, volatile share of treasury).
- **Slippage estimate** = per-asset liquidity tier → bps curve by trade
  size (demo: seeded tiers; production: order-book depth feed).

## 6. Wallet/security, privacy, permissions, compliance

- **Read-only:** watch public addresses; exchange access via read-only API
  keys only. No private keys, no signing, no transaction construction in v1.
  This is the core trust stance (research.md §6).
- **Address safety:** all custody accounts display as verified named labels
  from the workspace address book plus checksummed prefix/suffix; the UI
  never asks anyone to copy a full address from history (address-poisoning
  defense).
- **Permissions:** workspace roles — Admin (edit policy, manage accounts),
  Editor (draft proposals, run scenarios), Viewer (read + export). Policy
  edits and proposal actions are audit-logged.
- **Privacy:** treasuries are public on-chain but the *grouping* of
  addresses into one org is sensitive. Address-set is encrypted at rest;
  no third-party analytics on workspace pages; exports are user-initiated.
- **Compliance posture:** analytics only — no custody or money
  transmission. Stablecoin issuer regulatory context (US GENIUS Act / EU
  MiCA status) is displayed as information, with an explicit "not legal or
  investment advice" line. Legal review of marketing claims is a launch
  dependency.

## 7. Onboarding, activation, retention, metrics

- **Onboarding:** paste one public address → instant free health report
  (runway estimate + default-policy check). Create workspace → add
  remaining accounts → confirm burn → adopt starter policy template.
  Time-to-first-runway target: **< 3 minutes**.
- **Activation event:** workspace with ≥ 2 custody accounts, a confirmed
  burn figure, and a saved policy. (Demo shows the post-activation state
  plus the empty first-run state.)
- **Retention loop:** weekly digest email/Slack ("runway 14.2 → 13.8 months;
  issuer cap at 48% of 50% limit"), plus threshold alerts (policy breach,
  depeg > 50 bps, venue outage). Monthly one-click treasury report for
  founders/community.
- **North-star metric:** weekly active workspaces running a review (viewed
  overview + any scenario/policy/proposal interaction).
- **Supporting metrics:** time-to-first-runway, % workspaces with custom
  policy, proposals created/month, digest open rate, logo retention at 6
  months. Analytics are first-party and page-level only.

## 8. Packaging, pricing, launch motion

**Pricing hypothesis** (between free trackers and $500+/mo accounting;
research.md §3, §9):

- **Health check — free.** One address, snapshot report, shareable. The
  growth loop: public treasuries mean prospects can be shown their own risk.
- **Core — $199/month.** Up to 10 custody accounts, policies, scenarios,
  alerts, 3 seats.
- **Plus — $499/month.** Unlimited accounts, roles/audit log, API export,
  Slack digests, priority support. Annual −20%.

**Launch motion.**
1. Free health-check tool seeded into DAO governance forums where treasury
   diversification is already being debated (public, high-intent threads).
2. Listing in the Safe ecosystem app directory — the multisig install base
   *is* the ICP (ideal customer profile).
3. Channel: crypto-CFO/accounting boutiques who need a decision layer to
   complement their books.
4. Content: a quarterly "State of DAO runway" report from public data.

**GTM narrative.** "Accounting tells you what happened. Glidepath tells you
whether you'll make payroll in a crash — before you have to find out."

## 9. Risks, dependencies, unknowns, roadmap

**Risks**
- *Market risk:* a deep bear market shrinks treasuries but *raises* urgency;
  pricing must not be treasury-size-indexed at entry.
- *Platform risk:* Safe could build "good-enough" runway views; mitigation
  is depth (policy engine, stress, proposals) and multi-custody neutrality.
- *Data risk:* price/liquidity feeds are estimates; mitigated by provenance
  UI and multi-source cross-checks (roadmap).
- *Trust risk:* any security incident is fatal in this market; read-only
  architecture bounds the blast radius and is auditable.

**Dependencies:** indexer/price vendor contracts; legal review (advice
disclaimers, data handling); SOC 2 path for Plus tier.

**Unknowns to test:** willingness-to-pay at $199 vs $299; whether signers
(not just ops leads) become a viral vector; demand for non-EVM chains.

**Post-demo roadmap:** live data integration → alerts/digests → multi-source
price cross-checks → proposal export as Safe transaction batch (still
unsigned) → RWA/T-bill position support → API.
