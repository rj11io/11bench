# Waterline — product requirements

**Run:** `claude-opus5-high` · **Route:** `/claude-opus5-high` · **Written:** 2026-07-25
**Research behind every claim:** [research.md](./research.md)

> **Every number in the demo is invented.** The organisations, tokens, venues,
> balances and order books are fiction, labelled as such on every screen. The
> *shapes* and the settlement timings are taken from primary documentation.

---

## 1. Thesis

A crypto treasury's balance sheet is not allowed to tell it what it can spend.

US accounting rules require crypto holdings to be measured at price × quantity,
and explicitly forbid discounting for the fact that your position is too big for
the market to absorb (ASC 820's ban on "blockage factors"). Separately, the new
crypto standard ASU 2023-08 makes you disclose which holdings you are locked out
of, and for how long. Nobody joins those two facts into one operating number.

So a foundation sits on a treasury reported at $113m, and cannot answer whether
it can pay $45m of committed bills over the next year. In the seeded demo, it
cannot: at its own policy limits it can convert only **$38.2m** inside twelve
months, and the money runs out in **May 2027**.

**Waterline is the number in between.** One question, asked every week and after
every shock: *can we cover what we owe, from what we can actually sell, by the
day each payment is due?* Then: what is the cheapest compliant way to fix it.

**Positioning statement.** Waterline is treasury liquidity assurance for
crypto-native organisations. Not a portfolio tracker (those answer "what do we
hold"), not a payments tool (those answer "how do we pay"), not accounting
software (that answers "what do we report"). It answers "can we pay", and proves
the answer to a council, a board or an auditor.

**Differentiated promise.** *Mark value tells you what you own. Waterline tells
you what you can spend, and when.*

**Category.** We are naming a new one — **liquidity assurance** — because the
existing labels (treasury management system, portfolio tracker, on-chain
analytics) all describe products that show mark value and stop. If the category
name does not stick, the fallback positioning is "the liquidity layer next to
your Safe".

---

## 2. Users and buyers

### Primary user — Head of Treasury / Finance Lead

At a crypto-native organisation holding roughly $20m–$500m on-chain: a protocol
foundation, a DAO with a service-provider treasury manager, or an on-chain fund.
They sign from a multi-signature wallet (several named people must approve each
transaction). They report to a council, a board or a set of delegates — token
holders who vote on others' behalf and whose job includes disagreeing with them.

**Jobs to be done**

| # | Job | Cadence |
| --- | --- | --- |
| J1 | Know whether the next 12 months of committed spend is covered by assets I can actually convert | Weekly |
| J2 | Re-answer J1 within minutes of a market shock, without rebuilding a spreadsheet | On event |
| J3 | Decide what to sell, in what size, on which route, by which date — and know what it costs | Monthly / on breach |
| J4 | Prove the answer, with sources and timestamps, to people who will push back | Monthly / quarterly |
| J5 | Disclose restricted holdings and their remaining duration for the financial statements | Quarterly |

**Pains today**

- The treasury spreadsheet values the native token at market price and assumes
  it can all be sold. Nobody writes down the daily capacity constraint.
- Settlement latency is invisible. Staked assets in a 21-day exit queue, bridged
  stablecoins behind a 7-day challenge window and T+2 fund redemptions all show
  up in the same "stablecoins and liquid assets" row.
- Collateral pledged against a loan is counted as treasury value, when only the
  part above the liquidation buffer can actually leave.
- After a shock, producing a defensible answer takes days. The question is asked
  in hours.
- Every governance thread relitigates the same numbers because no artefact
  carries its own provenance.

**Buying trigger.** One of four, in the order we see them:

1. **The question you could not answer.** A delegate asks "what happens to
   runway if the token halves?" in a public forum and the answer is a guess.
2. **The near-miss.** Payroll or a grant tranche almost missed because the money
   was in a queue, or would have cost hundreds of basis points to exit.
3. **The audit ask.** Adopting ASU 2023-08 requires disclosing restricted
   holdings with the nature and remaining duration of each restriction. Nobody
   has that in one place.
4. **The mandate.** A council adopts a treasury policy with limits, and someone
   must now demonstrate compliance every month.

### Secondary user — Treasury service-provider analyst

Manages several client treasuries and is paid to publish defensible reports.
Buys seats, cares most about the exportable artefact and the audit trail, and is
our highest-leverage distribution channel: one analyst carries the method into
every treasury they advise.

### Secondary user — Council member, delegate or auditor

Read-only. Wants the published snapshot, the sources, the timestamps and the
decision log. Never edits anything. This user has no login in v1: they get a
link.

### Explicit non-user

Retail traders, and anyone whose main question is "what is the price". The
product has no price chart. That is a deliberate exclusion, not an omission.

---

## 3. Scope

### In scope for v1

- **Readiness**: coverage of committed spend by realisable cash, per month, over
  a 12-month horizon, with the first breach month named.
- **Time-to-cash ladder**: treasury value grouped by how many days it takes to
  become spendable, showing mark and realisable value side by side.
- **Holdings**: per-asset mark value, realisable value, effective haircut, time
  to cash, exit-cost curve, route list, restrictions and provenance.
- **Stress**: a scenario library with named historical anchors, run against the
  same engine, with before/after coverage.
- **Plan**: a de-risking playbook of costed levers, a cheapest-first suggester,
  a policy check, and a signing packet for a human to take to their wallet.
- **Policy**: editable guardrails that re-evaluate everything live.
- **Log**: an append-only decision record with the numbers frozen at decision
  time and their sources.

### Non-goals for v1 — stated so they stay out

| Not doing | Why |
| --- | --- |
| Holding keys or submitting transactions | The Bybit loss of $1.5bn happened to signers using a standard multisig, through a rewritten transaction. Removing signing authority removes that entire attack class. We produce a packet; the customer's own wallet executes. |
| Order execution or routing | Different product, different licences. We size and schedule; venues and solvers execute. |
| Price prediction or alpha | We model liquidity and latency, never direction. |
| Tax lots and general ledger | Adjacent and crowded. We export the restricted-holdings schedule and hand off. |
| Yield optimisation | Chasing yield is how treasuries end up illiquid. Out of scope on purpose. |
| Every chain and every asset | v1 covers EVM chains, major assets, one lending market, one liquid-staking design and tokenised T-bill funds. |
| NFTs and illiquid positions | No credible depth data, so no credible realisable value. |

---

## 4. Core workflow

Four steps. The demo implements all four.

**Step 1 — Position.** Open Readiness. One headline: realisable coverage at its
tightest month, plus the first month cash runs short. Beneath it, the cushion
chart (cash available minus cash owed, per month) and the time-to-cash ladder.
In the seeded demo: **0.84× coverage, first breach May 2027**, and a T+0 bucket
holding **$75.6m of mark value that is worth $26.5m in realisable terms**.

**Step 2 — Diagnose.** Open Holdings, sort by effective haircut, open the worst
offender. The drawer shows the exit-cost curve (price concession against order
size), the depth ladder it came from, every route with its own fee and
settlement time, the restriction if there is one, and the provenance of each
number. In the demo the diagnosis is: 69.5% of the treasury is one token family,
against a 50% policy limit, in books that absorb $38k a day at policy limits.

**Step 3 — Stress.** Open Stress. Pick a scenario, compare against another. Each
carries a named historical anchor — the June 2022 liquid-staking discount, the
March 2023 stablecoin depeg, the August 2024 slippage spike. The stressed book
takes coverage to **0.75× with the breach pulled forward to March 2027** and the
7-day operating buffer down to 5.0 months, below its 6-month floor.

**Step 4 — Act.** Open Plan. Select levers or press *Suggest cheapest plan*. The
suggester takes the lowest cost per dollar of shortfall removed until coverage
clears its floor. In the demo it clears a **$7.18m gap for $815k**, and says
which $675k of that is a single negotiated discount. Run the policy check, then
produce a signing packet: a plain-English decode of every call, the operation
type named in words, a loud warning if any call is a `delegatecall`, the
verification hash, and an explicit statement that Waterline holds no keys.
Approving writes a log entry with the numbers and sources frozen.

---

## 5. Requirements and acceptance criteria

### R1 — Realisable value, never mark value alone

Every place a value appears, the realisable figure appears with it, or the value
is explicitly labelled as a mark.

*Realisable* means: proceeds after price impact and fees, for the part of the
position that can be sold inside the policy's slippage cap and daily
participation cap, credited in the month it settles.

**Accept when:** no screen shows a total that implies a position is worth price ×
quantity in cash. The ladder shows both lengths for every bucket. The headline
mark value is labelled "accounting mark, no size discount".

### R2 — Time to cash on every holding

Each holding carries a settlement time in days, a note on what drives it, and a
link to the documentation the figure is modelled on where one exists.

**Accept when:** the ladder assigns every holding to a settlement bucket; a
holding with a 21-day exit queue never appears in the same bucket as a
stablecoin; changing to the stressed snapshot moves holdings between buckets.

### R3 — Market capacity is shared, not per holding

Liquid, staked and pooled units of the same token compete for the same daily
capacity. Unlocking or unstaking adds inventory, never capacity.

**Accept when:** unstaking in the demo does not increase 12-month realisable
value; the restricted tranche's release in month 8 adds no capacity; venue depth
is counted once even though four holdings quote the same venues.

### R4 — Modelled numbers look modelled

Values are tiered: **observed** (from a feed or a book), **derived**
(arithmetic on observed values), **modelled** (an assumption, such as
extrapolating impact beyond the visible book) and **input** (a human typed it).

**Accept when:** every figure on screen can be traced to a tier; extrapolated
impact is visually distinct; a hover or drawer names the source and the "as of"
time.

### R5 — Staleness changes behaviour, not just colour

Following Chainlink's guidance for consuming a price feed: track how old the
answer is against how often it should refresh, and degrade instead of showing a
confident stale number.

**Accept when:** each holding declares an expected refresh interval; a source
older than its interval is marked stale in the data-health panel; the demo shows
what a degraded state looks like.

### R6 — Collateral is split

Pledged collateral separates into withdrawable and pinned, where pinned is
whatever the policy's health-factor floor requires. Health factor follows Aave's
published definition: collateral × liquidation threshold ÷ debt, liquidation
below 1.00.

**Accept when:** the demo's lending position shows gross collateral, debt, health
factor, withdrawable and pinned as separate figures; raising the health-factor
floor in Policy reduces withdrawable immediately.

### R7 — Restricted holdings produce the disclosure

Each restriction records fair value, nature, remaining duration and lapse
condition — the four things ASU 2023-08 asks for.

**Accept when:** a restricted-holdings schedule can be read off the Holdings
view without further work.

### R8 — Plans are costed, checked, and cost nothing to abandon

Every lever states its cost in dollars, whether it is reversible, and whose
consent it needs. The policy check runs before any signing packet is produced.

**Accept when:** selecting levers updates coverage, cost and policy verdicts
live; a plan that breaches policy still produces a packet but with the breach
stated on it; nothing in the product can execute anything.

### R9 — The product never implies live data or a wallet connection

**Accept when:** a persistent marker states the data is seeded and static; every
snapshot carries its "as of" time; no copy anywhere says connected, live,
streaming or real-time; there is no wallet-connect control.

### R10 — Decisions leave a record

**Accept when:** approving a plan or changing policy appends an entry holding the
numbers as they stood, the sources, the approver and, above the dual-approval
threshold, a second approver; the log survives a page reload.

### R11 — Works at both sizes

**Accept when:** the layout is strong at 1440×900 and usable at 375×812, with no
horizontal overflow at either size, and wide tables scroll inside their own
container rather than the page.

---

## 6. Data model

### Entities

```
Organisation ──┬── Holding ──┬── Route (venue, fee, ADV, depth ladder)
               │             ├── Restriction (kind, lapse date, condition)
               │             └── DebtLeg (protocol, amount, liquidation threshold)
               ├── Obligation (amount, schedule, commitment strength, counterparty)
               ├── Policy (the guardrails)
               ├── PlanAction (a costed lever)
               └── LogEntry (frozen numbers + provenance + approvers)

Snapshot (calm | stressed)  — the market state everything is evaluated against
Scenario                    — shocks layered on a snapshot, with a cited anchor
```

**Holding** carries quantity, unit, mark price, price source, expected refresh
interval, settlement days (calm and stressed), what drives the settlement time,
whether it is sale-constrained, its capacity group, its routes, and optional
restriction, debt leg, reserve-disclosure grade and peg deviation.

**Route** is one venue: kind (exchange, automated market maker, off-market
block, issuer redemption), fee in basis points, average daily volume, and a
cumulative depth ladder in basis-point bands — the shape Kaiko's market-depth
endpoint returns.

**Obligation** is a committed outflow with a monthly schedule, a commitment
strength (contracted / approved / discretionary) and a counterparty note.
Commitment strength is what makes a lever available: you can cut a discretionary
programme on notice, and you cannot cut payroll.

### Calculations

| Quantity | Definition |
| --- | --- |
| Mark value | quantity × price. No size discount, matching ASC 820. |
| Average impact | Walk the merged depth ladder; fill each rung at the average of its band edges. Beyond the observed book, extend the marginal concession with a square-root law and tag the result **modelled**. |
| Marginal impact | Concession on the last unit. This is what the slippage cap is tested against. |
| Daily capacity | min(participation cap × average daily volume, size at the slippage cap × slices per day). The binding rule is named on screen. |
| Realisable proceeds | notional × (1 − (average impact + fee) ÷ 10,000) |
| Withdrawable collateral | max(0, collateral − debt × health-factor floor ÷ liquidation threshold) |
| Time to cash | Settlement days on the chosen route, including queues and challenge windows. Restricted holdings use the lapse date. |
| Available cash, month *m* | Sum of realisable proceeds credited in month *m*: unconstrained holdings in full once settled; constrained holdings drawn against shared monthly capacity, oldest-ready first. |
| Cushion, month *m* | cumulative available − cumulative committed. The hero chart. |
| Coverage ratio | cumulative available ÷ cumulative committed. Headline is the minimum across the horizon. |
| First breach | earliest month where cushion goes negative. |
| Operating buffer | cash raisable within the buffer window, expressed in months of average committed spend. A twelve-month programme contributes only the slice that fits inside the window. |
| Concentration | share of mark value per asset family, plus a Herfindahl index (above 2,500 reads as concentrated). |
| Effective haircut | 1 − realisable ÷ mark. The number accounting is not allowed to show. |

### Freshness and provenance assumptions

| Input | Assumed cadence | Tier | Basis |
| --- | --- | --- | --- |
| Order-book depth | 30 seconds | observed | Kaiko documents snapshots "generated every 30 seconds" |
| Aggregated prices | 20 minutes for majors, 5 for the native token | observed | Deviation-threshold-and-heartbeat feeds, per Chainlink's model |
| Stablecoin par value | 60 minutes | observed | Redemption at par; secondary mark for reference |
| Fund net asset value | daily | observed | Struck once per day |
| Average daily volume | trailing 30 days, daily | derived | — |
| Queue length | hourly | observed | Protocol queue state |
| Impact beyond the visible book | — | **modelled** | Square-root extrapolation, flagged in the interface |
| Off-market block price | — | **input** | Negotiated, unverifiable against a public quote |
| Obligations | on change | **input** | Entered or imported by the customer |

In production, depth and prices come from a market-data vendor (Kaiko or
equivalent) plus direct venue APIs; balances from an indexer plus direct RPC
reads; queue state from protocol contracts; obligations from CSV import, an
accounting integration, or governance-proposal parsing.

---

## 7. Security, privacy, permissions and compliance

### The security posture in one line

**Waterline never holds a key, never asks for a seed phrase, never requests a
signature, and cannot move money.** It reads public addresses and produces
documents.

That is a product decision taken directly from the Bybit incident: the attackers
did not steal keys, they changed what the signers were shown — flipping the
operation type to `delegatecall`, pointing at their own contract, and rewriting
the wallet's implementation pointer. The signers approved with a
standard multisig and hardware wallets. Anything that can request a signature is
part of that attack surface. We opt out.

### Requirements

| # | Requirement |
| --- | --- |
| S1 | Read-only by construction: watched addresses, no signing capability, no private keys, no seed phrases, no wallet-connect flow. |
| S2 | Signing packets decode every call into plain English, name the operation type in words, and warn loudly when a call is a `delegatecall`. NCC Group's Bybit analysis notes the signers should have caught exactly that field. |
| S3 | Packets carry a verification hash the signer re-checks on their hardware device screen, and instructions to compare it there rather than in a browser. |
| S4 | Policy checks run before a human is asked to approve — NCC's recommended "internal service that checks transactions against predefined policies". |
| S5 | Each policy rule declares whether it is **enforceable** on-chain (expressible as a Safe Guard or Allowance Module) or **advisory** (checked in our product only). We never imply software-only checks are enforcement. |
| S6 | Role separation: Viewer (read), Analyst (model and plan), Approver (approve a plan), Owner (edit policy). Plans above the dual-approval threshold need a second named approver who is not the author. |
| S7 | Address labels, obligations, counterparty names and plans are customer data, encrypted at rest, never used to train anything, never shared between workspaces. |
| S8 | Published snapshots are opt-in per snapshot, redact counterparty names and address labels by default, and state exactly what they contain. |
| S9 | Full audit log of every policy change, plan approval and published snapshot, with actor, timestamp and the values before and after. |
| S10 | No custody, no execution, no brokerage. We are not a regulated financial intermediary and the product must not drift into becoming one. |
| S11 | The product gives no investment advice. Levers are modelled consequences of the customer's own policy, never recommendations to buy or sell an asset. |

### Compliance features that come free from the data model

- **Restricted-holdings schedule** (ASU 2023-08): fair value, nature of
  restriction, remaining duration, lapse condition — exported per period.
- **Fair value reconciliation**: mark value as reported, alongside our realisable
  value, with the difference explained. The mark is the audited number; the
  difference is management information. We are explicit that a blockage discount
  is **not** permitted in the financial statements.
- **Stablecoin reserve-disclosure grade**: whether an issuer publishes a monthly,
  accountant-examined reserve report of the kind the GENIUS Act and MiCA now
  require of permitted issuers, with a policy limit on holdings that do not.
- **Counterparty and venue register**: every venue and bridge the treasury
  depends on, with its share of capacity — the input to a concentration limit.

### Risk communication rules

1. Never state a realisable value without the assumption that produced it.
2. Never show a single number where a range is honest. The ladder always shows
   mark and realisable; scenarios always show a comparison.
3. Name the binding constraint. "Limited by 6% of $640k daily volume" beats a
   colour.
4. Say when data is old, and change what the product does about it.
5. Say when a number is modelled, every time it appears.

---

## 8. Onboarding, activation, retention, metrics

### Onboarding — three steps, under ten minutes, no wallet

1. **Add watched addresses.** Paste addresses or a Safe URL. Read-only; we say
   so. Holdings, routes and depth populate. *(In the demo, the Northwind
   workspace starts empty and step 1 seeds it.)*
2. **Import committed spend.** CSV, or a template with payroll, infrastructure,
   grants and one-off commitments. This is the step that makes us different from
   a portfolio tracker, and it is the step users will skip if we let them, so it
   is required before Readiness unlocks.
3. **Adopt a policy.** Start from a default template, adjust the two numbers that
   matter (slippage cap, participation cap), and the coverage answer appears.

**Activation** = a workspace with at least one address, at least three months of
committed spend, and a policy adopted → a coverage number on screen. Target:
within one session.

### Retention loop

Weekly is the natural rhythm, and volatility supplies the interrupts. Retention
comes from three things: the **weekly readiness digest** (coverage, what moved,
what breached), the **breach alert** (fires when a shock or a policy change
pushes coverage below its floor), and the **monthly published snapshot** the
customer has to produce anyway for their council.

### Success metrics

| Layer | Metric | Target |
| --- | --- | --- |
| Activation | Workspaces reaching a coverage number in session 1 | 60% |
| Core value | Weekly active treasuries viewing Readiness | 70% of paid workspaces |
| Depth | Workspaces that have run a stress scenario in the last 30 days | 55% |
| The habit that matters | Plans built per workspace per quarter | ≥ 2 |
| Proof of value | Approved plans with a signing packet produced | ≥ 1 per workspace per quarter |
| Distribution | Published snapshots per paid workspace per quarter | ≥ 3 |
| Commercial | Net revenue retention | 115% |
| Trust | Median time from a market shock to a re-run coverage number | < 15 minutes |

### Analytics events

`workspace_created`, `address_added`, `obligations_imported`,
`policy_adopted`, `policy_changed{field, from, to}`, `coverage_viewed`,
`ladder_bucket_expanded{bucket}`, `holding_drawer_opened{asset}`,
`exit_curve_inspected{asset, size}`, `scenario_run{scenario, snapshot}`,
`scenario_compared{a, b}`, `plan_action_toggled{action}`,
`plan_suggested{actions, cost, gap_closed}`, `policy_check_failed{rule}`,
`signing_packet_generated{value, delegatecall_present}`,
`plan_approved{value, second_approver}`, `snapshot_published{redactions}`,
`stale_source_shown{source, age}`, `restricted_schedule_exported`.

Every event carries workspace id, snapshot id and the coverage ratio at the
time, so we can tell whether the product changed a decision — the only outcome
worth measuring.

---

## 9. Packaging, pricing and go-to-market

### Pricing hypothesis

Self-serve crypto analytics tops out near $1,000/month. This is not analytics; it
is an assurance artefact for a finance function moving tens of millions. So we
price on treasury size, annually, with seats included.

| Tier | Who | Price | Includes |
| --- | --- | --- | --- |
| **Public snapshot** | Anyone | Free | One published, permalinked coverage report per workspace. Read-only, provenance stamped, our name on it. |
| **Core** | Treasuries under $50m | $2,000/month annual | Readiness, ladder, holdings, 3 scenarios, policy, log, 5 seats |
| **Assurance** | $50m–$500m | $5,500/month annual | Full scenario library, plan builder, signing packets, restricted-holdings export, alerting, 15 seats, quarterly review |
| **Multi-treasury** | Service providers | From $9,000/month | Unlimited client workspaces, white-labelled published snapshots, API |

**Why annual, not usage-based.** The value is delivered on a weekly cadence and
proved quarterly. Usage pricing would punish exactly the behaviour we want —
running more scenarios.

### The launch motion

The free tier is not a trial, it is the distribution channel. Treasury reporting
in this category is already public: service providers publish dashboards for
delegates. A **published snapshot** — permalinked, timestamped, sources attached
— is a thing the customer *wants* to post in a governance forum. Every post
carries our method to the next treasurer.

1. **Design partners (weeks 0–8).** Five treasuries, hand-built workspaces, free.
   Requirement: we publish one snapshot each with their name on it.
2. **The wedge content (weeks 4–12).** Publish the analysis, not the product: a
   liquidity study of the twenty largest public treasuries showing mark value
   against realisable value, using only public data. Each entry is a
   permalinked snapshot. This is the launch.
3. **Service providers (weeks 8–20).** They manage many treasuries and publish
   for a living. Multi-treasury tier, co-branded snapshots.
4. **The audit pull (quarter 2).** Restricted-holdings disclosure is now a
   requirement. Brief the crypto practices at the accounting firms; be the tool
   that produces the schedule.
5. **Inbound from breach events (ongoing).** After every market dislocation, the
   question "was anyone actually short?" gets asked publicly. Answer it with
   data, from the free tier, within a day.

### The narrative, three ways

- **To a treasurer:** "Your balance sheet says $113m. You can convert $38m this
  year. Here is the month it matters."
- **To a council or delegate:** "Every number here carries its source and its
  timestamp. Disagree with the assumption, not the arithmetic."
- **To an auditor:** "Fair value, as reported, with no blockage discount. Plus the
  restricted-holdings schedule, with remaining durations. Plus what management
  did about it, and when."

### Competitive position

| They answer | Products | Why we are not competing |
| --- | --- | --- |
| What do we hold | Portfolio dashboards, on-chain analytics | They show mark value and stop. We start there. |
| How do we pay | Payments, payroll, invoicing tools | Downstream of us. Natural integration partners. |
| What do we report | Crypto accounting and tax | Adjacent. We hand them the schedule. |
| Who is moving what | Blockchain intelligence | Different buyer entirely. |
| How do we execute | Solvers, brokers, execution algorithms | Downstream. We size and schedule; they fill. |

The defensible part is not the coverage arithmetic, which is straightforward. It
is the **liquidity and latency corpus**: depth histories per venue per asset,
observed queue behaviour under stress, realised impact against modelled impact,
and the growing library of what actually happened in past dislocations. That
compounds, and a portfolio tracker cannot bolt it on.

---

## 10. Risks, dependencies, unknowns

### Risks

| Risk | Severity | Response |
| --- | --- | --- |
| **Model credibility.** A treasurer disputes our impact estimate and the whole product loses authority. | High | Show the ladder the estimate came from, tier every value, publish the method, and record realised impact against modelled impact so the model is auditable and improves. Never hide behind a score. |
| **"We have a spreadsheet."** The status quo is free. | High | Lead with the shock: coverage recomputed in minutes, not days. The spreadsheet cannot do J2. |
| **Market-data cost.** Depth history across venues and assets is expensive. | High | Start with a narrow allowlist of assets and venues per customer; price to cover it; supplement with free on-chain depth read directly from pools. |
| **Small market.** The number of treasuries in the target range is in the hundreds, not thousands. | Medium | Accept it; price accordingly. Expand later to on-chain funds, exchange treasuries, and corporate holders of crypto on the balance sheet. |
| **Obligations data never arrives.** Users add addresses and skip the spend import. | Medium | Gate Readiness behind it, ship a good template, and offer to build the first import by hand for design partners. |
| **Being read as advice.** Modelled sell plans look like recommendations. | Medium | Levers are consequences of the customer's own policy, always labelled as modelled, never ranked as "should". Legal review of every string in the plan builder. |
| **Depth data lies during stress.** Quoted liquidity vanishes precisely when it matters. | Medium | Stress scenarios thin the book by design; never present a single-point estimate; record realised-vs-modelled during real events. |
| **A published snapshot embarrasses a customer.** | Medium | Publishing is opt-in per snapshot with a redaction preview. Never publish by default. |

### Dependencies

Market-data vendor for depth and volume; a balance indexer plus direct RPC
reads; protocol contract reads for queue state and lending positions; the
customer's own wallet for execution; an accounting or CSV path for obligations.

### Open unknowns

1. Do treasurers accept a modelled impact number, or do they need realised fills
   before they trust it? *(Test with design partners in weeks 0–8.)*
2. Is the buyer the treasurer or the council? The council feels the pain; the
   treasurer holds the budget.
3. Does the published snapshot actually get shared, or does it feel like
   airing weakness? *(This is the growth loop; if it fails, we need paid
   acquisition and the model changes.)*
4. How much do service providers want white-labelling versus co-branding?
5. Is the ASU 2023-08 disclosure a real pull or a nice-to-have? Depends on who
   is being audited and how hard.

### Post-demo roadmap

**Next (0–3 months).** Real address ingestion and balance reads. CSV obligation
import. Alerting on breach. The published snapshot with redaction preview.
Restricted-holdings export.

**Then (3–6 months).** Realised-versus-modelled impact tracking, which turns the
model into a credibility asset. Depth history so scenarios can be calibrated to
this treasury's own past. Safe Guard generation for the rules that are actually
enforceable. Multi-treasury workspaces.

**Later (6–12 months).** Obligations from governance proposals. Multi-currency
reporting for non-USD reporting currencies. Solver and execution integrations so
a plan becomes a working order elsewhere. Counterparty concentration across
venues, bridges and custodians as a first-class view.

**Deliberately never.** Custody. Execution. Yield products. Anything that can
move customer money.

---

## 11. What the demo proves, and what it does not

**Proves:** the thesis is legible in under a minute; the four-step loop works
end to end; realisable value and time to cash change decisions; stress moves the
answer; the plan closes the gap at a stated cost; policy re-evaluates live; state
persists; the security posture is stated and honoured.

**Does not prove:** that the impact model matches real fills; that the market-data
economics work; that treasuries will import their committed spend; that anyone
will pay. Those need design partners, not a demo.

**Honest about:** every number is seeded. The organisations, tokens, venues and
counterparties are fiction. Nothing is live and nothing updates. The interface
says so on every screen.
