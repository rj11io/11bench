# Research — choosing the wedge for a crypto dashboard

**Run:** `claude-opus5-high`
**All sources accessed:** 2026-07-25 (single research session).
**Method:** I searched the open web, then read the primary page for anything I
wanted to quote. Where a page blocked me, I say so and I mark the finding as
second-hand instead of quoting it. Nothing below is invented. Every number in
the product demo is seeded fiction and is labelled as such in the interface —
the numbers in *this* file are the researched ones.

A note on words. This file is written for a reader who does not work in crypto,
so I define each term the first time I use it. Where the industry word is
unavoidable (a "multisig", an "AMM"), the plain meaning comes first.

---

## 1. Where I started, and how the answer changed

I began with the obvious guess: a portfolio dashboard for a crypto treasury —
what do we hold, what is it worth, how did it move. Two findings killed that
guess and pointed somewhere much sharper.

**Finding one.** The accounting rulebook that crypto treasuries now report
under *deliberately refuses* to account for the thing treasurers most need to
know. US accounting standard ASC 820 (the rule for measuring "fair value") bans
what it calls a **blockage factor** — a discount you might want to apply because
your holding is so big that selling it would push the price down. Deloitte's
codification reference quotes the rule directly: fair value must not include

> "Premiums or discounts that reflect size as a characteristic of the reporting
> entity's holding (specifically, a blockage factor that adjusts the quoted
> price of an asset or a liability because the market's normal daily trading
> volume is not sufficient to absorb the quantity held by the entity"

— [10.4 Inputs to Valuation Techniques, Deloitte Accounting Research Tool (ASC 820-10 Roadmap)](https://dart.deloitte.com/USDART/home/codification/broad-transactions/asc820-10/roadmap-fair-value-measurements-disclosures/chapter-10-subsequent-measurement/10-4-inputs-valuation-techniques), accessed 2026-07-25.

The same source states the consequence plainly: "you measure fair value by
multiplying the quoted price by the quantity held—without discounting for the
fact that selling the entire position might move the market."

So the balance-sheet number for a governance token — the token that lets holders
vote on a protocol's decisions, and the asset that dominates most crypto-native
treasuries — is *price × quantity*, by rule, no matter how thin the market is.
That is the right answer for a financial statement and the wrong answer for a
treasury decision.

**Finding two.** The *other* number treasurers need is time, and the rules do
ask for that one. The new US crypto accounting standard, ASU 2023-08, requires
companies to disclose, for holdings they are contractually barred from selling,
"the fair value of restricted assets, the 'nature and remaining duration of the
restrictions,' and circumstances permitting restrictions to lapse"
— [FASB Issues Final Standard on Crypto Assets, Deloitte *Heads Up*](https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2023/fasb-issues-asu-crypto-assets), accessed 2026-07-25.
The same source gives the effective date: "fiscal years beginning after
December 15, 2024, with early adoption permitted," and confirms the measurement
rule: crypto assets in scope are measured at fair value with "changes in fair
value recorded in net income in each reporting period."

Put those two findings side by side and a product falls out of them. Accounting
now demands fair value with **no** size discount, plus a separate note about
**how long** you are locked up. Nobody joins those two facts into a single
operating number. That join — *what can we actually turn into spendable dollars,
at what cost, and by which date* — is the wedge.

**Decision this changed:** I dropped "portfolio dashboard" and committed to
**treasury liquidity assurance**: one number, "can we cover what we owe from
what we can actually sell", and one loop around it. Every later research question
was asked in service of that.

---

## 2. Users, buyers, and the decisions they repeat

### 2.1 Who holds crypto treasuries, and how concentrated they are

Crypto-native organisations — protocol foundations, DAOs (member-governed
organisations that vote on how to spend a shared pot of money), and on-chain
funds — hold most of their money in the token they themselves issued.

I could not verify a hard concentration percentage from a primary dataset in
this session. Two attempts failed: `https://defillama.com/treasuries` returned
**HTTP 403** and the DefiLlama treasuries API endpoint
`https://api.llama.fi/treasuries` returned **HTTP 402 Payment Required**
(both accessed 2026-07-25). So I record the concentration claim as second-hand
and did not build any product number on it.

What I *can* cite is DefiLlama's own published methodology, which shows how the
whole category counts value and what it leaves out
— [DefiLlama methodology docs](https://docs.llama.fi/), accessed 2026-07-25.
Two lines matter for my data model: DefiLlama prices assets mostly from
"CoinGecko's API", and it "exclude[s] tokens not yet released or locked in
vesting contracts". That is an important convention: the category's headline
treasury numbers already treat locked tokens as *not counted*, while accounting
counts them at fair value with a restriction note. Two respected sources, two
different answers, and a treasurer sitting between them.

Search-level (not primary, flagged as such) commentary in the same area:
- [Why DAOs are cashing out their tokens just as prices rise — DL News](https://www.dlnews.com/articles/defi/uniswap-arbitrum-daos-selling-tokens-to-diversify-treasuries/), accessed 2026-07-25 — treasuries selling native tokens to diversify.
- [DAO Treasuries: Are billions really billions? — Shift (Medium)](https://medium.com/@SHIFT_DeFi/dao-treasuries-are-billions-really-billions-9c21f49a46a0), accessed 2026-07-25 — the headline-vs-realisable gap, argued years before I got here. I read the title and framing from search results only.

**Decision this changed:** the demo shows *both* numbers — a mark value and a
realisable value — and never shows one without the other. It also shows locked
holdings as a distinct bucket with a lapse date, matching the ASU 2023-08
disclosure shape rather than DefiLlama's "exclude it" shape.

### 2.2 Who does the work

The people who run these treasuries are often specialist service providers
rather than in-house staff. Search results consistently name the same set —
Karpatkey (GnosisDAO, Balancer, ENS), Steakhouse Financial (Sky, Lido), Block
Analitica (Sky), Llama (Uniswap) — as the firms who manage and report on DAO
treasuries, and note they publish dashboards that update every block
([search-level finding, accessed 2026-07-25](https://www.riseworks.io/blog/diversified-treasury-management-for-daos)).
I treat the specific client pairings as second-hand.

Two things about that shape are load-bearing for the product:

1. The buyer and the operator are often **different organisations**. A service
   provider is paid to produce a defensible answer for a council or a set of
   delegates (token holders who vote on others' behalf). So the output of the
   product is a *published, timestamped artefact*, not just an internal screen.
2. Every report is read adversarially. A delegate's job includes disagreeing.
   That pushes hard toward showing the method and the source of each number
   inline, not in a footnote.

### 2.3 The tooling that already exists, and the hole in it

I found search-level evidence that the treasury-tooling market has consolidated
around two things: **Safe** smart accounts on Ethereum-compatible chains, and
Squads on Solana, with Coinshift retiring its treasury product in March 2026 to
pivot to yield-bearing stablecoins
([search-level, accessed 2026-07-25](https://stablecoininsider.org/top-8-tools-powering-the-next-generation-of-stablecoin-finance-in-2026/)).
Request Finance covers invoicing and payroll rather than wallet infrastructure,
and reportedly passed $1.3bn of all-time payment volume in January 2026 with
over 90% of payments in stablecoins (same source, second-hand).

The pattern in the category is consistent and it is the hole I am aiming at.
Existing tools answer **"what do we hold"** (portfolio trackers), **"how do we
pay"** (payments and payroll), and **"what do we owe the tax authority"**
(accounting). None of them answers **"can we pay, from what we can actually
sell, by the day each payment is due"**. That is a liquidity question and the
category treats it as a spreadsheet exercise.

**Decision this changed:** I positioned the product as a layer *next to* Safe
rather than a replacement for it. The product plans and proves; Safe executes.
That also removes the need for the demo to touch a wallet at all.

### 2.4 The recurring decisions I am designing for

From the above, the primary user's calendar has four repeating moments:

| When | Decision | What they need |
| --- | --- | --- |
| Weekly | Are we still covered for the next 12 months? | One coverage number, plus the first month it breaks |
| On a market shock | Did the shock break coverage? | Same number recomputed against a stressed snapshot, in minutes |
| Monthly / quarterly | Do we need to sell, and what exactly? | A sized, dated, costed sell plan that respects policy |
| Reporting date | Prove the above to a council, board, or auditor | A frozen artefact with sources, timestamps, and a decision trail |

---

## 3. Market, liquidity, and on-chain data models

### 3.1 Order-book depth and slippage: the exact shape of the data

Kaiko is a crypto market-data provider whose documentation defines the exact
metric my product needs. Their market-depth endpoint documentation states:

> "Market Depth provides insight into the 'depth' of an exchange's order book by
> aggregating the volume of bids and asks within 0-10% of the best bid or ask,
> respectively."

and, on freshness:

> "Snapshots show a point-in-time view generated every 30 seconds."

The bands returned are 0.1%, 0.2%, 0.3%, 0.4%, 0.5%, 0.6%, 0.7%, 0.8%, 0.9%,
1%, 1.5%, 2%, 4%, 6%, 8% and 10%
— [Market depth (snapshot), Kaiko Developer Hub](https://docs.kaiko.com/rest-api/data-feeds/level-1-and-level-2-data/level-2-aggregations/market-depth-snapshot), accessed 2026-07-25.

Kaiko's own analysis of large sell orders adds the caution that a single metric
is not enough:

> "It's not simply a case of looking at volumes or market depth in isolation; it
> requires a combination of several indicators."

and gives a concrete stress figure: during the August 2024 crash, on 5 August,
"slippage for BTC-USD on major US exchanges tripled within hours", while
stablecoin pairs on some venues saw "increases of more than 3 basis points
compared to normal market conditions". It also notes slippage on a $100,000
sell order "tends to increase at the start and end of U.S. market hours (15:00
UTC and 20:00 UTC, respectively)"
— [Moving Markets: Liquidity and Large Sell Orders, Kaiko](https://www.kaiko.com/resources/moving-markets-liquidity-and-large-sell-orders), accessed 2026-07-25.

**Decisions this changed:**
- The demo's seeded liquidity data is a **cumulative depth ladder in
  basis-point bands**, the same shape Kaiko returns, not a single "liquidity
  score". A basis point (bp) is one hundredth of a percent.
- Depth carries an **"as of" time and a 30-second cadence**, and the interface
  shows it, because a depth number without a timestamp is meaningless.
- Because slippage can triple within hours, the product ships a **stressed
  snapshot** as a first-class view rather than treating stress as an edge case.
- Because one indicator is not enough, the exit model combines **three**:
  book depth, average daily volume, and a per-trade slippage cap.

### 3.2 On-chain liquidity: why depth is not a single number

On automated market makers (AMMs — trading pools where a formula, not an order
book, sets the price), liquidity is not spread evenly across prices. Uniswap's
developer documentation describes concentrated liquidity as "liquidity that is
allocated within a custom price range", divided into **ticks**, where "an
increase or decrease of 1 tick represents a 0.01% increase or decrease in price
at any point in price space". Their own example of the old uniform model shows
how little capital was actually useful: for a DAI/USDC pair, only "~0.50% of
total available capital" sat in the $0.99–$1.01 band where the volume was
— [Concentrated liquidity, Uniswap developer docs](https://developers.uniswap.org/concepts/protocol/concentrated-liquidity), accessed 2026-07-25.
The docs also confirm the direction of the effect: deeper liquidity inside a
range "may lower swap price impact, improving execution quality".

**Decision this changed:** the per-asset drill-down in the demo shows a **route
list** (each venue as a separate row with its own depth and fee) rather than a
blended market number, because a sell of one size may be best on a centralised
venue and a sell of another size best on an AMM. It also means one tick of an
AMM range can vanish; the model treats on-chain depth as less reliable than
exchange depth and labels it accordingly.

### 3.3 Settlement latency: the number nobody puts on a dashboard

This is where I found the strongest primary evidence, and it is the heart of the
product. "Time to cash" is not a vibe; the protocols publish it.

**Ethereum validator exits.** Ethereum's own documentation gives the queue
arithmetic: "A maximum of 16 withdrawals can be processed in a single block. At
that rate, 115,200 validator withdrawals can be processed per day," and it
tabulates the resulting wait — 400,000 withdrawals takes 3.5 days, 500,000 takes
4.3 days, 700,000 takes 6.1 days
— [Staking withdrawals, ethereum.org](https://ethereum.org/en/staking/withdrawals/), accessed 2026-07-25.

**Liquid staking withdrawals.** Lido's help centre states: "Under normal
circumstances, the stETH or wstETH withdrawal period can take anywhere between
1-5 days." It names four drivers: a first-in-first-out queue ("the more stETH is
locked in the withdrawal request queue, the longer a staker is supposed to
wait"), "Bunker mode" during mass slashing or outages when "withdrawal requests
would be processed more slowly", the beacon-chain exit queue, and net staking
demand
— [How long does an Ethereum withdrawal take?, Lido Help](https://help.lido.fi/en/articles/7858315-how-long-does-an-ethereum-withdrawal-take), accessed 2026-07-25.

**Decisions this changed:**
- Every holding in the model carries a **`timeToCash`** field in days, sourced
  from documentation like the above, plus a **stressed** value for the same
  field. A queue that is 1–5 days normally and longer in Bunker mode is exactly
  a "calm value and a stressed value" data shape.
- The hero visual became a **time-to-cash ladder**: treasury value stacked by
  settlement bucket (same day, 1–2 days, 3–7 days, 8–30 days, 31–90 days,
  locked). That chart does not exist in the products I looked at, and the
  numbers to fill it are published.

### 3.4 The historical case that proves the thesis

Two events show mark value and realisable value coming apart, badly, in public.

**stETH, June 2022.** stETH is a token representing staked ETH; at the time it
could not be redeemed for ETH at all, because Ethereum had not yet enabled
withdrawals — so the only exit was the secondary market. CoinDesk reported "The
discount shot to a record 8% on Monday" (13 June 2022), after opening "around
2-3% since early May, with a spike to 5% on May 12" during the Terra collapse.
Celsius held "409,260 stETH tokens, worth about $470 million at current prices"
while facing redemption requests of roughly 50,000 ETH weekly after freezing
withdrawals. Three Arrows Capital "withdrew nearly $400 million of stETH and ETH
from the Curve protocol in May", and on 14 June a wallet attributed to 3AC
"withdrew 80,000 stETH from decentralized lending protocol Aave Tuesday and
converted 38,900 stETH (some $45 million)" at a 5.6–5.9% discount
— [Staked Ether Becomes Focus of Crypto Stress, From Celsius to Three Arrows, CoinDesk](https://www.coindesk.com/markets/2022/06/14/staked-ether-becomes-focus-of-crypto-stress-from-celsius-to-three-arrows), accessed 2026-07-25.

That is the whole product in one paragraph. Celsius's balance sheet said
$470 million. Their realisable value, at the size they needed, on the only route
available, was several percent less and falling as they sold.

**USDC, March 2023.** A stablecoin is a token meant to hold a fixed value,
usually one US dollar. USDC broke that on 11 March 2023 after Circle disclosed
$3.3bn of reserves at the failing Silicon Valley Bank; it traded to roughly
$0.88 and recovered over about three days once regulators said SVB depositors
would be made whole
— [USDC Stablecoin Regains Dollar Peg After Silicon Valley Bank-Induced Chaos, CoinDesk](https://www.coindesk.com/business/2023/03/13/usdc-stablecoin-regains-dollar-peg-after-silicon-valley-bank-induced-chaos), accessed 2026-07-25 (headline and framing read from search results; the $0.88 low and the ~3-day recovery are corroborated by [CNBC, 11 March 2023](https://www.cnbc.com/2023/03/11/stablecoin-usdc-breaks-dollar-peg-after-firm-reveals-it-has-3point3-billion-in-svb-exposure.html), search-level).

**Decision this changed:** the demo's stress scenarios are **named after these
two events and cite them in the interface**, with the magnitudes taken from the
reporting above (an 8% liquid-staking-token discount; a stablecoin trading
several cents below par for about three days). Inventing scenario magnitudes
would have been easy and worthless.

### 3.5 Borrowing: collateral you own but cannot spend

If a treasury has borrowed against its assets, some of what it holds is not
available at all. Aave, the largest such lending market, publishes the formula:

> "Health Factor = (Total Collateral Value * Weighted Average Liquidation
> Threshold) / Total Borrow Value"

Liquidation — a forced sale of the collateral — "happens when a borrower's
health factor falls below 1". The liquidation threshold is "the maximum
percentage of value that can be borrowed against" a collateral asset and is "set
by Aave Governance for each collateral asset". Aave also documents how much can
be seized: up to 50% of the debt when the health factor is above 0.95 and both
collateral and debt exceed $2,000, and up to 100% at or below 0.95, or when
either side is under $2,000; partial liquidations "must leave at least $1,000
worth of both collateral and debt remaining"
— [Health Factor & Liquidations, Aave](https://aave.com/help/borrowing/liquidations), accessed 2026-07-25.

**Decision this changed:** collateral in the model is split into
**withdrawable** and **pinned**. Given a policy floor for the health factor, the
model solves for how much collateral can leave without crossing it; the rest is
shown as pinned, with the debt that pins it. A dashboard that shows gross
collateral as treasury value is lying by omission.

### 3.6 Freshness and provenance: borrow the oracle discipline

Chainlink publishes price feeds that smart contracts rely on, and its guidance
on trusting them is directly reusable as a product rule. Feeds update on two
triggers: a **deviation threshold** (the price moved more than a set percentage)
and a **heartbeat** (a maximum idle time). The docs then tell integrators what
to do about it:

> "Your application should track the `latestTimestamp` variable or use the
> `updatedAt` value from the `latestRoundData()` function to make sure that the
> latest answer is recent enough for your application to use it."

and, if it is not, to "pause operation or switch to an alternate operation mode
while identifying the cause of the delay", noting that "some heartbeats are
configured to last several hours"
— [Data Feeds, Chainlink docs](https://docs.chain.link/data-feeds), accessed 2026-07-25.

**Decision this changed:** this became the demo's provenance system, more or
less verbatim. Every displayed number carries a source, an "as of" time, and a
tier: **observed** (came from a feed or a book), **derived** (arithmetic on
observed values), **modelled** (an assumption, e.g. extrapolating impact beyond
the visible book), or **input** (a human typed it). If a source is older than its
expected refresh, the interface degrades it visibly rather than showing a
confident stale number. And the product refuses to produce a plan on degraded
data without an explicit acknowledgement — Chainlink's "pause operation",
translated to a treasury workflow.

### 3.7 Executing a large sell without moving the market

CoW Protocol documents the standard tool: a TWAP (time-weighted average price)
order, which "allow[s] you to split a large trade into smaller parts, executed
at regular intervals", and gives a worked example — "buying $1M of ETH over
3 hours in 6 parts; the TWAP will place an order of $166k every 30min,
significantly reducing the price impact and allowing the market to recover"
— [TWAP orders, CoW Protocol documentation](https://docs.cow.fi/cow-protocol/tutorials/cow-swap/twap), accessed 2026-07-25.

**Decision this changed:** a sell in the demo's plan builder is not a single
trade, it is a **programme** with a size, a route, a number of parts and a
duration — because that is how the size actually gets done. "Let the market
recover" is also why the model applies a per-day participation cap rather than
letting a treasury eat the whole book at once.

---

## 4. Security, trust, and what the product must never do

### 4.1 The scale of the problem

Chainalysis recorded "Over $3.4 billion in theft from January through early
December 2025", the second-worst year on record, with the February 2025 Bybit
attack alone at "$1.5 billion". Centralised services took 88% of Q1 2025 losses,
"driven by sophisticated attacks on private key infrastructure and signing
processes", three hacks accounted for 69% of all service losses, and personal
wallet compromises made up 20% of the year's total value stolen ($713 million)
— [2025 Crypto Theft Reaches $3.4 Billion, Chainalysis](https://www.chainalysis.com/blog/crypto-hacking-stolen-funds-2026/), accessed 2026-07-25.

### 4.2 What Bybit actually teaches

This matters more than the headline number, because Bybit's signers were using
the industry-standard setup — a Safe multisig wallet, where several people must
approve a transaction — and it did not save them.

NCC Group's technical analysis shows the attackers changed three fields in the
transaction the signers approved: **operation** from 0 (a normal call) to 1
(**delegatecall**, which lets another contract run *as* yours), **to** to an
attacker contract, and **data** to a fake token-transfer payload. Executed, the
attacker's code "simply wrote a new address into storage slot 0—the location
where the proxy stores its masterCopy (implementation contract) address",
handing over the whole wallet. Their recommendations are specific: hardware
wallets "that support EIP-712 messages can allow users to review the data to be
signed, which can mitigate scenarios even when the signers' laptops are fully
compromised"; wallets should decode what `to` and `data` actually execute,
because "EIP-712 does not address the challenge of rendering nested operations
in a human-readable way"; signers should have noticed the "operation type was set
to 1 (delegatecall)"; and an "internal service that checks transactions against
predefined policies" could have blocked it
— [In-Depth Technical Analysis of the Bybit Hack, NCC Group](https://www.nccgroup.com/research/in-depth-technical-analysis-of-the-bybit-hack/), accessed 2026-07-25.

Search-level corroboration of the delivery mechanism — malicious JavaScript
introduced into the Safe web interface via a compromised developer machine, so
the screen showed a routine transfer while the underlying transaction was
rewritten — is consistent across
[Sygnia's investigation](https://www.sygnia.co/blog/sygnia-investigation-bybit-hack/)
and [Certora's write-up](https://www.certora.com/blog/bybit-hack-multisig-wallet-security), accessed 2026-07-25.

**Decisions this changed.** Three, and they shaped the product's whole security
posture:
1. **The product never holds keys and never submits transactions.** It is a
   planning and evidence layer. Removing signing authority removes the entire
   class of attack above. It also means the demo needs no wallet extension.
2. **Whatever it hands to a signer must be human-readable and must name the
   scary parts.** The demo's signing packet decodes each call, states the
   operation type in words, and shows a loud warning when the operation is a
   delegatecall — the exact field that cost Bybit $1.5bn.
3. **A policy check runs before a human is asked to sign**, which is NCC's own
   "internal service that checks transactions against predefined policies".

### 4.3 Where policy can actually be enforced on-chain

Safe documents the two extension points. **Modules** add capability — the
Allowance Module "lets a Safe designate an address as a delegate with permission
to spend up to a configured token amount per refill period". **Guards** add
restriction — a Guard is called "before and after every `execTransaction`, with
the ability to revert and block the transaction", implementing
`checkTransaction` before and `checkAfterExecution` after
— [Safe Modules](https://docs.safe.global/advanced/smart-account-modules) and [Building a Guard for Safe Smart Account](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial), Safe docs, accessed 2026-07-25.

**Decision this changed:** the product's policy rules are written so each one
states whether it is **advisory** (checked in the product only) or
**enforceable** (expressible as a Safe Guard or Allowance Module). Claiming
software-only enforcement is real enforcement would be a lie a treasurer would
catch in the first sales call.

### 4.4 Regulation that touches this workflow

**Stablecoin reserves — GENIUS Act (US).** Signed into law 18 July 2025 after
Senate (68–30) and House (308–122) votes on 17 June 2025. Issuers of payment
stablecoins must hold reserves backed at least 1:1 in a restricted list of
high-quality liquid assets (cash, insured demand deposits, short-term
Treasuries, Treasury repo, qualifying money market funds, and tokenised forms of
those). They must publish their redemption policy and, monthly, the "amount and
composition of reserves by category, including the average tenor and geographic
location of custody of each category", examined by a registered public
accounting firm and certified by the CEO and CFO.
Sources: [S.1582, 119th Congress, Congress.gov](https://www.congress.gov/bill/119th-congress/senate-bill/1582);
[White House fact sheet, July 2025](https://www.whitehouse.gov/fact-sheets/2025/07/fact-sheet-president-donald-j-trump-signs-genius-act-into-law/);
[Stablecoins and the GENIUS Act, Richmond Fed](https://www.richmondfed.org/banking/banker_resources/news_flash/2025/20251118_genius_act);
[FDIC implementing rule, Federal Register, 10 April 2026](https://www.federalregister.gov/documents/2026/04/10/2026-06974/genius-act-requirements-and-standards-for-fdic-supervised-permitted-payment-stablecoin-issuers-and).
All accessed 2026-07-25; the specific provisions above are search-level readings
of these pages, not verbatim quotes from the statute text.

**Stablecoin reserves — MiCA (EU).** Asset-referenced and e-money token rules
came into force 30 June 2024, with reserve requirements, mandatory redemption
rights and a ban on paying interest to holders. Search-level reading indicates
e-money token issuers must hold reserves matching tokens in circulation with at
least 30% in commercial bank deposits (60% for "significant" tokens), the rest in
highly liquid instruments, with daily reconciliation and monthly public
attestations; the transitional period for crypto-asset service providers ends
1 July 2026. Sources:
[Asset-referenced and e-money tokens (MiCA), European Banking Authority](https://www.eba.europa.eu/regulation-and-policy/asset-referenced-and-e-money-tokens-mica);
[MiCA Regulation and EU Crypto Rules: What Changes in 2026, Sumsub](https://sumsub.com/blog/crypto-regulations-in-the-european-union-markets-in-crypto-assets-mica).
Accessed 2026-07-25, search-level.

**Decision this changed:** the demo grades each stablecoin holding on
**reserve transparency** — whether the issuer publishes a monthly, accountant-
examined reserve report of the kind both regimes now require — and treats a
low-transparency stablecoin as a concentration risk with its own policy limit.
That is a defensible, rules-anchored reason to distinguish two tokens that both
show a price of $1.00. It is *not* a claim about any real issuer; the demo's
issuers are fictional.

**Accounting.** Covered in §1: ASU 2023-08 (fair value; restricted-holding
disclosure with "nature and remaining duration"; effective for fiscal years
beginning after 15 December 2024) and ASC 820's blockage-factor ban.

**Decision this changed:** the product exports a **restricted-holdings
schedule** — fair value, nature of restriction, remaining duration, lapse
condition — because that is now a disclosure requirement and the product already
holds exactly those fields. It is the cheapest possible expansion from
"operating tool" to "thing finance cannot cancel".

---

## 5. Visualisation research

### 5.1 Choosing chart forms on purpose

The Financial Times' Visual Vocabulary organises chart types by the
*relationship* being shown rather than by the chart's name, across categories
including Deviation, Correlation, Ranking, Distribution, Change over Time,
Part-to-Whole, Magnitude and Spatial. Deviation charts "emphasise a variation
(+/-) from a fixed reference point"; magnitude charts "show size comparisons";
change-over-time charts "give emphasis to changing trends"
— [Visual Vocabulary, Financial Times Chart Doctor (GitHub)](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary), accessed 2026-07-25 (categories and definitions read from search-result summaries of the poster and its README, not from the PDF itself). The EU's data-visualisation guide reproduces the same taxonomy
— [Visual vocabulary, data.europa.eu](https://data.europa.eu/apps/data-visualisation-guide/visual-vocabulary), accessed 2026-07-25.

**Decisions this changed.** I picked each chart from its category, not from
habit:
- The hero question is "surplus or shortfall against a fixed reference of
  zero" → **Deviation**. So the hero is a *cushion* chart — cash available minus
  cash owed, per month, above and below a zero line — not the ratio line I first
  sketched, and not a price chart.
- "How much value sits in each settlement bucket" is **Part-to-Whole** and
  **Magnitude** → a stacked bar, ordered by time to cash, with mark and
  realisable shown as nested lengths so the gap is a visible length.
- "What does selling more cost" is **Change over Time**'s cousin — a monotonic
  response curve → a line of slippage against size, with the policy cap drawn
  as a reference line and the position's own size marked on it.
- I deliberately did **not** include a candlestick price chart. It answers no
  question in this decision loop.

### 5.2 Communicating uncertainty and provenance

Two rules came out of the sources rather than taste. From Kaiko: any liquidity
figure must carry its snapshot time, because a 30-second snapshot is a
photograph, not a state. From Chainlink: an application must check freshness and
change behaviour when data is stale. Together they argue for a visual
distinction between *observed* and *modelled* values everywhere, not a single
confidence badge in a corner. The demo uses a consistent dotted/hatched
treatment for modelled quantities and a muted, struck treatment for stale ones.

---

## 6. Positioning, monetisation, and go-to-market

### 6.1 What comparable tools charge

Primary pricing pages were largely rendered client-side and did not yield
figures to my fetch (`https://dune.com/pricing` returned only the page shell,
accessed 2026-07-25). So these are **search-level** anchors, accessed
2026-07-25, and I use them only as order-of-magnitude context:

- Nansen: free tier plus a Pro plan around $49–69/month, reportedly reduced from
  $150/month during 2025 — [Nansen review, NFTevening](https://nftevening.com/nansen-review/).
- Dune: free tier with limited credits and delayed refresh; Analyst around
  $75/month; Plus around $399/month; Premium around $999/month —
  [Dune Analytics review, ComparEdge](https://comparedge.com/tools/dune-analytics).

**Decision this changed:** self-serve analytics pricing tops out around
$1k/month, which tells me *not* to price this as analytics. The product's output
is a board-facing assurance artefact for an organisation moving tens of millions
of dollars, and the buyer is a finance function, not an analyst. So the pricing
hypothesis is an annual platform fee scaled by treasury size, with the free tier
being a read-only public snapshot — which doubles as the acquisition channel.

### 6.2 The acquisition channel the category hands you

Two research facts combine into a growth loop. First, treasury reporting in this
category is **public** — service providers publish dashboards for delegates and
token holders (§2.2). Second, those reports are read by exactly the people who
buy this product at other organisations. So the free tier is not a trial, it is
a **published, permalinked, provenance-stamped coverage report** that the
customer *wants* to share, carrying the product's method into every governance
forum where a treasury is discussed.

**Decision this changed:** the demo makes the shareable artefact a real feature —
a frozen snapshot with sources and timestamps, produced from the same view the
treasurer works in, not a separate export path bolted on later.

### 6.3 The narrative

Everything above collapses into one sentence I can defend line by line:

> Your balance sheet says what you own, because the accounting rules forbid it
> from saying anything else. We say what you can spend, and when.

---

## 7. What I could not verify, and what that cost

Honest limits of this research session, all 2026-07-25:

| Wanted | What happened | How I handled it |
| --- | --- | --- |
| Primary treasury composition data | `defillama.com/treasuries` 403; `api.llama.fi/treasuries` 402 | No product number relies on it; the concentration claim is marked second-hand |
| Verbatim ASC 820 text from PwC Viewpoint | Redirect loop (>10 hops) | Quoted the same codification paragraph from Deloitte DART instead |
| Primary pricing tables | Dune's page renders client-side | Pricing anchors marked search-level and used only as magnitude |
| Verbatim statute text for GENIUS reserve list | Read summaries, not the bill text | Provisions marked as search-level readings of Congress.gov / Richmond Fed / Federal Register |
| Kaiko's stressed-market depth numbers for a mid-cap governance token | Behind a paid product | The demo's depth ladders are **seeded fiction in Kaiko's documented shape**, and the interface says so |

The last row is the one that matters most, so it is worth stating plainly: I
researched the *shape*, the *cadence* and the *stress behaviour* of liquidity
data from primary documentation, and then invented the values. The demo labels
every number as seeded demo data, on every screen.

---

## 8. Source index

Read in full and quoted:

1. [10.4 Inputs to Valuation Techniques — Deloitte DART, ASC 820-10 Roadmap](https://dart.deloitte.com/USDART/home/codification/broad-transactions/asc820-10/roadmap-fair-value-measurements-disclosures/chapter-10-subsequent-measurement/10-4-inputs-valuation-techniques) — blockage-factor ban (ASC 820-10-35-36B).
2. [FASB Issues Final Standard on Crypto Assets — Deloitte *Heads Up*](https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2023/fasb-issues-asu-crypto-assets) — ASU 2023-08 scope, measurement, disclosures, effective date.
3. [Market depth (snapshot) — Kaiko Developer Hub](https://docs.kaiko.com/rest-api/data-feeds/level-1-and-level-2-data/level-2-aggregations/market-depth-snapshot) — depth definition, bands, 30-second cadence.
4. [Moving Markets: Liquidity and Large Sell Orders — Kaiko](https://www.kaiko.com/resources/moving-markets-liquidity-and-large-sell-orders) — multi-indicator liquidity, Aug 2024 slippage tripling, time-of-day effects.
5. [Concentrated liquidity — Uniswap developer docs](https://developers.uniswap.org/concepts/protocol/concentrated-liquidity) — ticks, range liquidity, price-impact relationship.
6. [Staking withdrawals — ethereum.org](https://ethereum.org/en/staking/withdrawals/) — exit queue throughput and day estimates.
7. [How long does an Ethereum withdrawal take? — Lido Help](https://help.lido.fi/en/articles/7858315-how-long-does-an-ethereum-withdrawal-take) — 1–5 days, FIFO queue, Bunker mode.
8. [Health Factor & Liquidations — Aave](https://aave.com/help/borrowing/liquidations) — health factor formula, liquidation trigger, close factors.
9. [Data Feeds — Chainlink docs](https://docs.chain.link/data-feeds) — deviation threshold, heartbeat, `updatedAt` staleness handling.
10. [TWAP orders — CoW Protocol docs](https://docs.cow.fi/cow-protocol/tutorials/cow-swap/twap) — splitting large orders, worked example.
11. [2025 Crypto Theft Reaches $3.4 Billion — Chainalysis](https://www.chainalysis.com/blog/crypto-hacking-stolen-funds-2026/) — theft totals and concentration.
12. [In-Depth Technical Analysis of the Bybit Hack — NCC Group](https://www.nccgroup.com/research/in-depth-technical-analysis-of-the-bybit-hack/) — delegatecall/masterCopy mechanics and signer recommendations.
13. [Staked Ether Becomes Focus of Crypto Stress — CoinDesk, 14 June 2022](https://www.coindesk.com/markets/2022/06/14/staked-ether-becomes-focus-of-crypto-stress-from-celsius-to-three-arrows) — stETH discount, Celsius and 3AC positions.
14. [DefiLlama methodology](https://docs.llama.fi/) — pricing source, exclusion of locked/vesting tokens.

Consulted at search-result level and labelled as such above:
[Safe Modules](https://docs.safe.global/advanced/smart-account-modules) ·
[Safe Guard tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial) ·
[S.1582 GENIUS Act, Congress.gov](https://www.congress.gov/bill/119th-congress/senate-bill/1582) ·
[White House GENIUS fact sheet](https://www.whitehouse.gov/fact-sheets/2025/07/fact-sheet-president-donald-j-trump-signs-genius-act-into-law/) ·
[Richmond Fed on GENIUS](https://www.richmondfed.org/banking/banker_resources/news_flash/2025/20251118_genius_act) ·
[FDIC GENIUS rule, Federal Register](https://www.federalregister.gov/documents/2026/04/10/2026-06974/genius-act-requirements-and-standards-for-fdic-supervised-permitted-payment-stablecoin-issuers-and) ·
[EBA ART/EMT under MiCA](https://www.eba.europa.eu/regulation-and-policy/asset-referenced-and-e-money-tokens-mica) ·
[Sumsub MiCA 2026 update](https://sumsub.com/blog/crypto-regulations-in-the-european-union-markets-in-crypto-assets-mica) ·
[FT Visual Vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary) ·
[data.europa.eu visual vocabulary](https://data.europa.eu/apps/data-visualisation-guide/visual-vocabulary) ·
[CoinDesk USDC repeg](https://www.coindesk.com/business/2023/03/13/usdc-stablecoin-regains-dollar-peg-after-silicon-valley-bank-induced-chaos) ·
[CNBC USDC depeg](https://www.cnbc.com/2023/03/11/stablecoin-usdc-breaks-dollar-peg-after-firm-reveals-it-has-3point3-billion-in-svb-exposure.html) ·
[Sygnia Bybit investigation](https://www.sygnia.co/blog/sygnia-investigation-bybit-hack/) ·
[Certora on Bybit](https://www.certora.com/blog/bybit-hack-multisig-wallet-security) ·
[DL News on DAO diversification](https://www.dlnews.com/articles/defi/uniswap-arbitrum-daos-selling-tokens-to-diversify-treasuries/) ·
[Shift: are DAO billions really billions?](https://medium.com/@SHIFT_DeFi/dao-treasuries-are-billions-really-billions-9c21f49a46a0) ·
[Rise: diversified treasury management for DAOs](https://www.riseworks.io/blog/diversified-treasury-management-for-daos) ·
[Stablecoin Insider: 2026 stablecoin finance tools](https://stablecoininsider.org/top-8-tools-powering-the-next-generation-of-stablecoin-finance-in-2026/) ·
[Nansen review — NFTevening](https://nftevening.com/nansen-review/) ·
[Dune Analytics review — ComparEdge](https://comparedge.com/tools/dune-analytics).
