# Research: what should a high-quality crypto dashboard be?

**Author:** Claude (benchmark run `claude-fable5-high`)
**Research window:** 2026-07-17 (all sources accessed this day)
**Method:** web search plus direct reads of vendor pages, provider methodology
docs, practitioner guides, and market reports. Every claim below names its
source. Where a number comes from a secondary write-up rather than the primary
publisher, I say so.

---

## 1. The question behind the question

"Crypto dashboard" is not a product. It is a surface. The product is the
**decision the screen helps someone make repeatedly**. So the research plan
was: find the user segments with the most valuable *recurring* decisions,
check which of those decisions are badly served today, and then design for
that one loop instead of building a wall of prices.

---

## 2. Segments, jobs, and recurring decisions

### 2.1 Individual holders and traders (consumer)

- CoinStats reports over 1.2 million monthly active users; Zerion, DeBank,
  and Zapper track on-chain balances for free. The consumer tracker space is
  crowded, free at the entry tier, and differentiated mainly by chain
  coverage and speed.
  - "Portfolio Trackers Reviewed: DeBank vs Zerion vs Octav vs CoinStats,"
    CryptoAdventure, https://cryptoadventure.com/portfolio-trackers-reviewed-debank-vs-zerion-vs-octav-vs-coinstats/ (accessed 2026-07-17)
  - "Crypto Portfolio Trackers: 12 Best Tested 2026," CoinCodeCap,
    https://coincodecap.com/top-portfolio-trackers-overview (accessed 2026-07-17)
- a16z's *State of Crypto 2025* estimates roughly 40–70 million active
  crypto users and a total market cap that crossed $4 trillion in 2025 — a
  big but consumer-priced market where free products set the floor.
  - "State of Crypto 2025," a16z crypto,
    https://a16zcrypto.com/posts/article/state-of-crypto-report-2025/ (accessed 2026-07-17)

**Finding → decision:** consumer portfolio tracking is a red ocean with a
price of zero. I ruled it out as the wedge.

### 2.2 Organizations that hold crypto as working capital (the chosen segment)

Three sub-groups share one job: **keep the organization solvent while its
reserves sit in volatile, on-chain assets.**

- **DAOs** (decentralized autonomous organizations — internet-native groups
  that govern shared funds by token vote): DeepDAO data reported by
  Cointelegraph puts total DAO treasuries above **$25 billion** as of March
  2026, spread over 5,000+ listed organizations, with an average treasury
  around $1.2 million and heavy concentration in the top five.
  - "DAO treasuries top $25 billion for the first time: DeepDAO,"
    Cointelegraph, https://cointelegraph.com/news/dao-treasuries-top-25-billion-for-the-first-time-deepdao (accessed 2026-07-17)
  - "DAO Treasury Holdings Statistics 2025," CoinLaw,
    https://coinlaw.io/dao-treasury-holdings-statistics/ (accessed 2026-07-17)
- **Crypto-native startups and protocol foundations** that raised in tokens
  or stablecoins and pay salaries from those reserves.
- **Ordinary businesses adopting stablecoins** (tokens pegged to the dollar)
  for payments and cash management. Eco's 2026 practitioner guide describes
  the standard posture: 60–90% of an operating treasury in cash-equivalent
  stablecoins, diversified across issuers (USDC, USDT, USDS, PYUSD), with
  the rest in BTC/ETH/governance tokens.
  - "Stablecoin Treasury Management: 2026 Best Practices," Eco,
    https://eco.com/support/en/articles/14799675-stablecoin-treasury-management-2026-best-practices (accessed 2026-07-17)

Their recurring decisions, per practitioner guides:

1. **Runway check** — "net burn" is monthly expenses minus revenue; runway
   is how many months reserves cover that burn. Request Finance's guide
   recommends a conservative "cash ratio" view that counts only stablecoins
   and fiat as spendable.
   - "Crypto Treasury Management: The Ultimate Guide," Request Finance,
     https://www.requestfinance.com/blog/crypto-treasury-management (accessed 2026-07-17)
2. **Diversification / rebalancing** — PatentPC's DAO dataset says about
   60% of large DAOs now run active diversification across stablecoins,
   ETH, and real-world assets; the common rule of thumb is one to two years
   of stable assets to protect payroll.
   - "DAO Growth Stats," PatentPC,
     https://patentpc.com/blog/dao-growth-stats-treasury-sizes-governance-votes-activity (accessed 2026-07-17)
3. **Approval and reporting** — treasuries run on multisig wallets (wallets
   that need m-of-n keyholders to approve a transaction). Eco reports that
   as of Q1 2026, 180+ DAOs and ~240 corporate treasuries publish recurring
   on-chain reports, and Safe (the dominant multisig) is used by roughly
   130 DAOs including Frax, Gitcoin, and ENS.
   - "Onchain Treasury Reporting: Tools and Standards," Eco,
     https://eco.com/support/en/articles/14799683-onchain-treasury-reporting-tools-and-standards (accessed 2026-07-17)
   - Professional managers like karpatkey operate under governance-approved
     policy mandates with monthly reporting (e.g., the SafeDAO treasury
     core unit proposal). "karpatkey — SAFE DAO Treasury Management Core
     Unit," Safe forum, https://forum.safe.global/t/sep-24-karpatkey-safe-dao-treasury-management-core-unit/4893 (accessed 2026-07-17)

**Finding → decision:** the segment exists, the decisions repeat weekly-to-
monthly, and the decisions move real money. This became the target segment.
The buyer is the operations/finance lead; the users also include multisig
signers who need to understand what they are approving.

---

## 3. Representative products and the gap

| Product | What it is | Signal found |
|---|---|---|
| Cryptio, Bitwave | Enterprise crypto accounting/subledger | Start around **$500/month**, enterprise contracts into tens of thousands per year. Built for closing the books, not for weekly decisions. Source: "Best Crypto Accounting & Subledger Tools for 2025," Breezing, https://breezing.io/blog/best-crypto-accounting-subledger-tools-2025/ (accessed 2026-07-17) |
| TRES Finance | Web3 accounting/reporting | Acquired by Fireblocks in January 2026 for a reported $130M (per Breezing's 2026 guide, https://breezing.io/blog/best-crypto-accounting-subledger-tools/ accessed 2026-07-17) — accounting is consolidating into custody platforms. |
| Coinshift | Was a DAO treasury-ops platform | Its pricing URL (https://www.coinshift.xyz/pricing, accessed 2026-07-17) now serves a page titled "iUSPC — Institutional Credit Yield, Onchain": the company has pivoted from treasury-ops software to a yield product. |
| Safe | Multisig custody + transaction approval | The execution layer; it approves transactions but does not tell a team whether the *plan* is safe. Source: Eco tooling overview above. |
| karpatkey, Steakhouse | Human treasury managers for large DAOs | Serve the top of the market under bespoke mandates; too expensive for the ~$1–50M treasury. Sources: Safe forum proposal above; Eco tooling overview. |
| DeBank, Zerion, Zapper | Free wallet/portfolio trackers | Great "what do I hold" answers for individuals; no burn, runway, policy, or approval concepts. Sources: CryptoAdventure and CoinCodeCap comparisons above. |

**Finding → decision (the wedge):** between free trackers and $500+/month
accounting suites sits an underserved loop: *"Given our burn and our policy,
are we safe — and if not, what exact rebalance fixes it?"* Incumbents either
moved upmarket (accounting), got absorbed into custody (TRES→Fireblocks), or
pivoted away (Coinshift). I chose to build a **treasury runway and risk
console** for organizations holding roughly $1M–$50M on-chain, priced in the
gap, with the multisig as the hand-off point rather than a competitor.

---

## 4. Data models the product must respect

- **Market data is aggregated, not observed.** CoinGecko computes prices as
  volume-weighted averages across exchanges after outlier filtering, anchored
  by a Bitcoin reference index; it scores venues with a "Trust Score."
  - "Methodology," CoinGecko, https://www.coingecko.com/en/methodology (accessed 2026-07-17)
- CoinMarketCap's Liquidity Score measures order-book depth as the slippage a
  trader would incur on orders between $100 and $10,000 — meaning *liquidity
  is a first-class number, separate from price*.
  - "Liquidity Score (Methodology)," CoinMarketCap Support,
    https://support.coinmarketcap.com/hc/en-us/articles/360035679972-Liquidity-Score-Methodology (accessed 2026-07-17)
- **Portfolio data is a graph, not a list:** wallet → chain → venue/custody →
  asset → position, with staked and LP positions wrapping underlying assets
  (pattern visible across DeBank/Zerion/Zapper comparisons above).

**Finding → decision:** every number in the product carries **provenance**
(where it came from), an **as-of timestamp**, and — for anything that could
be sold — a **liquidity/slippage note**. The entity model in the PRD is
organization → custody account → position → asset, with prices as a separate
sourced feed.

---

## 5. Communicating volatility, risk, and uncertainty

- Visualization research shows the *form* of a risk display changes the
  decisions people make, not just their comprehension ("Let's Gamble:
  Uncovering the Impact of Visualization on Risk Perception and
  Decision-Making," Kale et al., arXiv, https://arxiv.org/pdf/1910.09725,
  accessed 2026-07-17). Best-practice guides converge on: show ranges rather
  than single points, visualize thresholds and tolerance limits explicitly,
  and prefer concrete framings over abstract probabilities.
  - "Visualizing Uncertainty: Best Practices for Complex Data," Think Design
    on Medium, https://medium.com/@marketingtd64/visualizing-uncertainty-best-practices-for-complex-data-eadfc9d3546f (accessed 2026-07-17)
- DeFi risk frameworks converge on a handful of categories — smart contract,
  financial, counterparty, operational, governance — refreshed continuously
  rather than assessed once.
  - "How to Build a DeFi Protocol Risk Scoring Model," Chainscore Labs,
    https://www.chainscorelabs.com/en/guides/economic-impact-and-financial-systems/defi-risk-frameworks/launching-a-comprehensive-defi-risk-scoring-methodology (accessed 2026-07-17)
- Stablecoin-specific risk means watching the peg (depeg risk — the token
  drifting from $1, as UST did fatally in May 2022), reserve quality, and
  issuer/counterparty exposure.
  - "Risks of Yield-Bearing Stablecoins 2026," Eco,
    https://eco.com/support/en/articles/15253999-risks-of-yield-bearing-stablecoins-2026-depeg-smart-contract-counterparty (accessed 2026-07-17)

**Finding → decision:** the product's core visual is **runway as a range**
("14 months at today's prices; 9 months if volatile assets fall 50%"), not a
portfolio value as a point. Policy limits render as visible threshold lines.
Risk tags on positions use the standard categories (issuer, contract, market,
concentration) in plain words.

---

## 6. Wallet and security trust patterns

- Address poisoning (attackers planting look-alike addresses in your history
  so you copy the wrong one) is industrial-scale: Blockaid reports 225M+
  detected attacks and $500M+ confirmed stolen. Defenses: verified address
  books and destination checks.
  - "Address Poisoning: The Growing Threat," Blockaid,
    https://www.blockaid.io/blog/address-poisoning-the-growing-threat-draining-millions-from-crypto-users (accessed 2026-07-17)
- The Security Alliance's multisig best practices stress that signers must
  independently verify what they sign; the hardware wallet screen — not the
  web UI — is the source of truth.
  - "Secure Multisig Best Practices," SEAL Frameworks,
    https://frameworks.securityalliance.org/wallet-security/secure-multisig-best-practices/ (accessed 2026-07-17)

**Finding → decision:** the product is **read-only by design**. It watches
addresses; it never holds keys and never signs. Rebalance plans export as
human-readable proposals for the team's existing multisig, with named
address-book entries instead of raw hex addresses, and signer-facing plain
descriptions of intent. This is both a safety posture and a trust-building
sales feature ("we cannot lose your funds").

## 7. Regulatory and compliance backdrop

- The **GENIUS Act** (signed July 18, 2025) created the first US federal
  framework for payment stablecoins: licensed issuers, 100% reserves in cash
  and short-dated Treasuries, monthly public reserve disclosure.
  - "How will the GENIUS Act work in the US and impact the world?," World
    Economic Forum, https://www.weforum.org/stories/2025/07/stablecoin-regulation-genius-act/ (accessed 2026-07-17)
- The EU's **MiCA** regime treats fiat-pegged stablecoins as e-money tokens
  that only licensed institutions may issue, with 30% (60% for "significant"
  tokens) of reserves in EU bank deposits. The two regimes differ enough that
  issuer choice is now a compliance decision, not just a risk one.
  - "GENIUS Act vs MiCA: The 2026 Stablecoin Compliance Map," Interexy,
    https://interexy.com/genius-act-vs-mica-the-2026-stablecoin-compliance-map-a-regulatory-deep-dive (accessed 2026-07-17)
  - "Global stablecoin regulations 2026," BVNK,
    https://bvnk.com/blog/global-stablecoin-regulations-2026 (accessed 2026-07-17)
- Scale context: a16z reports stablecoins settled ~$9T adjusted volume in the
  trailing year (raw $46T), supply above $300B, with USDT+USDC at ~87% of
  supply (State of Crypto 2025, cited above).

**Finding → decision:** issuer concentration limits are a **first-class
policy rule** in the product (e.g., "no more than 50% of stables with one
issuer"), and issuer regulatory status (GENIUS/MiCA) is displayed as
context on stablecoin positions. The product itself stays an analytics
tool — no custody, no execution — which keeps it outside money-transmitter
licensing in the demo scope (flagged as a legal-review dependency in the PRD).

## 8. Visualization patterns worth copying

From the financial/crypto viz sources above plus the tracker teardowns:

- **Ranges beat points** for anything uncertain (runway, projected value).
- **Threshold lines on charts** make policy limits legible at a glance.
- **Small multiples / sparklines** for per-asset history; one hero chart per
  screen, not six competing ones.
- **Tables are the workhorse** for positions — sortable, with change columns
  and risk tags — because treasury users reconcile, they don't browse.
- **Provenance chips** (source + as-of time) on every aggregate, borrowed
  from how CoinGecko/CMC expose methodology and how on-chain reporting tools
  cite addresses.

## 9. Positioning, monetization, and GTM for the wedge

- Pricing anchor: enterprise accounting starts ~$500/month (Breezing, cited
  above); free trackers set the consumer floor at $0. A $149–$399/month
  self-serve product sits in open space.
- Distribution: 2026 B2B SaaS playbooks emphasize ecosystem-led growth —
  meeting buyers inside the platforms they already use rather than cold
  outbound.
  - "Ecosystem-Led Growth: The SaaS GTM Strategy for 2026," SaaS Mag,
    https://www.saasmag.com/ecosystem-led-growth-saas-revenue-engine/ (accessed 2026-07-17)
  - For this wedge the "ecosystem" is concrete: the Safe app directory,
    DAO governance forums (where treasury proposals are debated in public),
    and the accountants/CFO-for-hire firms serving crypto startups.
- A free, shareable **treasury health report** (runway + policy check on a
  public address) is the natural product-led hook: treasuries are public,
  so the top of the funnel needs no signup.

**Finding → decision:** the PRD's GTM leads with a free public-address
health check, converts to a paid workspace (policies, alerts, proposals),
and distributes through the Safe ecosystem and governance forums.

---

## 10. Decision log (findings → choices)

| # | Finding | Decision it changed |
|---|---|---|
| 1 | Consumer trackers are free and crowded | Rejected consumer portfolio wedge |
| 2 | $25B+ in DAO treasuries; 60% of large DAOs actively diversify; runway/burn is the named practitioner metric | Chose org-treasury segment; runway is the hero metric |
| 3 | Accounting tools start ~$500/mo; TRES absorbed by Fireblocks; Coinshift pivoted to yield | Positioned as mid-market *decision* console, not accounting; $149–$399/mo hypothesis |
| 4 | Risk-viz research: form changes decisions; show ranges and thresholds | Runway shown as base/stress range; policy limits drawn on charts |
| 5 | Multisig best practice: UI is not the source of truth; address poisoning is rampant | Read-only architecture; named address book; proposals hand off to the team's own multisig |
| 6 | GENIUS/MiCA make issuer choice a compliance decision | Issuer concentration is a built-in policy rule; issuer status shown on positions |
| 7 | Price/liquidity are aggregated estimates (CoinGecko/CMC methodology) | Every figure carries source + as-of; sellable assets carry slippage notes |
| 8 | Ecosystem-led GTM; treasuries are public data | Free public health-check funnel; Safe-app and forum distribution |

## 11. Honesty notes

- Numbers above are as reported by the cited sources on 2026-07-17; I did not
  independently verify DeepDAO's or a16z's figures.
- The TRES/Fireblocks acquisition price comes from a secondary source
  (Breezing) and is marked as such.
- The demo built from this research uses **seeded fictional data only** and
  says so on screen; nothing in the demo is a live price, balance, or
  transaction.
