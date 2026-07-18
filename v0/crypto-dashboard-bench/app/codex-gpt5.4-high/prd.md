# PRD — Helm Treasury

## 1. Product thesis

**Helm Treasury** is a policy-led stablecoin treasury cockpit for crypto-native finance teams and payment operators.

Its promise is simple:

> Know whether your reserve is still safe and movable before something breaks, and know exactly which balances to rotate first if it does.

This is not a generic crypto super-app. It is a focused treasury product for teams that:

- hold reserves across multiple wallets, chains, venues, and stablecoins;
- need 24/7 operational liquidity;
- care about provenance, approvals, and compliance posture;
- cannot afford ambiguous “available balance” semantics.

### Positioning

- **Category:** Stablecoin treasury and risk operations
- **Alternative buyers compare against:** spreadsheets, fragmented custody/exchange dashboards, internal ops tools, treasury modules from wallet infrastructure vendors
- **Differentiated promise:** “Policy, provenance, and operational liquidity in one view”

## 2. Primary and secondary users

### Primary user

**Treasury lead / finance ops manager** at a crypto-native company or stablecoin payment operator.

Responsibilities:

- keep working capital liquid enough for payroll, vendor payouts, merchant settlement, and conversion;
- manage venue, issuer, and chain concentration;
- coordinate with compliance and operations during incidents;
- defend treasury decisions to CFO / COO / risk committee.

### Secondary users

- Controller or finance manager
- Compliance / risk lead
- Payments operations lead
- CFO / COO reviewing policy exceptions

## 3. Jobs to be done

### Functional jobs

- See reserve exposure across wallets, venues, chains, and asset provenance.
- Check whether treasury is still inside policy.
- Identify which obligations still clear if conditions deteriorate.
- Decide how to rebalance without guessing which balances are truly liquid.

### Emotional jobs

- Reduce the fear of being surprised by a venue, chain, or provenance issue.
- Give finance teams language they can use with operators and executives.

### Buying trigger

- Stablecoin or onchain payment volume has grown past “spreadsheet + wallet tabs.”
- Treasury spans more than one chain, venue, or reserve asset.
- A recent near-miss exposed concentration, latency, or bridged-asset confusion.

## 4. Scope

### In scope for v1

- Unified seeded position register by wallet / venue / chain / asset
- Policy threshold editor
- Policy breach scoring
- Liquidity bucket view: `instant`, `same-day`, `T+1`
- Venue × chain exposure matrix
- Scenario-based incident review
- Recommended rebalance actions
- Provenance and control posture disclosure
- Browser-local persistence for thresholds and acknowledgements

### Explicit non-goals

- Live wallet connection
- Transaction signing or execution
- Portfolio performance analytics / returns
- Tax accounting
- Token discovery or trading signal generation
- Full compliance automation or Travel Rule messaging

## 5. Core workflows

### Workflow A: daily treasury review

1. Open the dashboard.
2. Read current policy posture and open findings.
3. Confirm whether reserve mix remains inside policy.
4. Inspect any concentration drift before new capital is routed.

### Workflow B: incident or drill review

1. Enter a scenario such as bridge exposure, venue concentration, or depeg drill.
2. See which policy thresholds break.
3. Inspect affected positions and their control / provenance context.
4. Choose the fastest acceptable rebalance plan.

### Workflow C: policy calibration

1. Tighten or loosen thresholds.
2. Re-score the current reserve instantly.
3. Save the threshold set locally for follow-up discussion.

## 6. Requirements

### Functional requirements

1. The product must show whether each scenario is inside or outside treasury policy.
2. The product must separate nominal balance from operational liquidity.
3. The product must expose venue, chain, and single-asset concentration.
4. The product must distinguish native, bridged, and yield-sleeve assets.
5. The product must surface control context such as quorum, allowlist, or venue policy.
6. The product must provide a recommended move list for each risk scenario.
7. The product must preserve local user state in `localStorage`.
8. The product must make demo/live status obvious at all times.

### Risk and trust requirements

1. Never imply balances, prices, or transactions are live.
2. Never imply transactions can be executed from the demo.
3. Clearly label simulations as drills.
4. Show timestamps and units for all key metrics.
5. Use risk labels and explanatory copy instead of unexplained colors alone.

### Accessibility requirements

1. Keyboard-accessible buttons and sliders
2. Text labels for all major controls
3. Mobile-safe layouts without horizontal overflow
4. Sufficient contrast for alerts and selected states

## 7. Acceptance criteria

- A reviewer can identify the selected wedge and primary user within 15 seconds.
- A reviewer can tell whether the current treasury scenario is inside policy.
- A reviewer can identify at least one provenance-related risk and one liquidity-related risk.
- Changing a threshold updates policy breaches immediately.
- Scenario choice, action checklist state, and acknowledged alerts persist in the browser.
- The page clearly states that data is seeded and not live.
- Desktop and mobile layouts remain usable without broken overflow.

## 8. Entity model

### Core entities

- **Asset**
  - symbol
  - asset type: native stablecoin / bridged stablecoin / decentralized stablecoin / yield sleeve / cash rail
- **Chain**
  - network
  - settlement assumption
- **Venue**
  - issuer rail / MPC custody / multisig / exchange
- **Position**
  - asset + chain + venue + amount + liquidity bucket + control metadata
- **Policy**
  - concentration and liquidity thresholds
- **Alert**
  - policy breach or scenario-specific risk state
- **Action**
  - suggested rebalance step with amount, source, destination, ETA, and impact

## 9. Calculations

### Instant liquidity %

`sum(position amount where liquidity bucket = instant) / total treasury`

### Largest venue share %

`max(total amount grouped by venue) / total treasury`

### Bridged exposure %

`sum(position amount where asset type = bridged stablecoin) / total treasury`

### Largest stablecoin share %

`max(total amount grouped by asset symbol or reserve asset family) / total treasury`

### Runway days

`treasury available for operations / average daily operating burn`

For the demo, this is seeded and not implied to be GAAP cash forecasting.

### Weighted settlement minutes

Weighted estimate using seeded chain / venue settlement assumptions for positions currently treated as operationally available.

## 10. Data sources and freshness assumptions

### Intended live inputs

| Domain | Intended source type | Freshness target | Product use |
| --- | --- | --- | --- |
| Stablecoin chain distribution | DeFiLlama-class dataset | Hourly | Chain and issuer exposure context |
| Asset reference metadata | CoinGecko-class reference feed | Daily / intraday | Asset labeling, supply reference, market metadata |
| Native support / contracts / confirmations | Circle docs and issuer rails | As published + monitored | Provenance and settlement assumptions |
| Wallet / custody / venue balances | Safe / Fireblocks / exchange APIs | Near real-time | Position register |
| Compliance / screening | AML / sanctions / Travel Rule tools | Event-driven | Risk labels and hold states |
| Internal finance data | ERP / treasury burn inputs | Daily | Runway and obligation coverage |

### Demo assumptions

- No live integrations
- No real prices, balances, or returns
- Seeded scenarios shaped by real product conventions and source semantics

## 11. Security, permissions, privacy, and compliance

### Security

- Read-only by default
- No signing, no private keys, no seed phrases
- Display approval quorum and control posture as part of every critical view

### Permissions

- Product should eventually support role-based views:
  - viewer
  - operator
  - approver
  - admin

The demo stays read-only and explanatory.

### Privacy

- In production, wallet labels, counterparty names, and compliance notes may be sensitive
- The demo stores only route-local UI state in `localStorage`

### Compliance

- Product assists with monitoring and decision support
- Product does not itself claim to satisfy AML/CFT, safeguarding, or MiCA obligations
- In production, client asset segregation, custody policy, screening, and audit export are required integrations and workflows

## 12. Onboarding and activation

### Onboarding hypothesis

1. Map treasury structure:
   - wallets
   - venues
   - chains
   - reserve asset types
2. Define policy thresholds:
   - max venue concentration
   - max bridged exposure
   - min instant liquidity
   - max single stablecoin share
3. Import first reserve snapshot.
4. Review one drill scenario and approve action playbook.

### Activation event

User configures policy and successfully uses the dashboard to classify one reserve state or drill as inside/outside policy.

## 13. Retention model

### High-frequency loop

- Daily treasury check
- Pre-payout / pre-settlement review
- Incident review

### Sticky outputs

- Policy history
- Incident notes
- Rebalance templates
- Audit-friendly exposure snapshots

## 14. Success metrics

### Product metrics

- Weekly active treasury workspaces
- Percentage of workspaces with policy configured
- Percentage of reviews resulting in no spreadsheet export
- Time from alert detection to chosen rebalance plan
- Percentage of positions labeled by provenance and liquidity bucket

### Business metrics

- Design partners converted to paid workspaces
- Net revenue retention by treasury volume tier
- Expansion from treasury cockpit into compliance / reporting / execution add-ons

## 15. Packaging and pricing hypothesis

This is explicitly a **hypothesis**, not a claim about current market pricing.

### Package structure

- **Core**
  - policy board
  - reserve register
  - basic scenarios
- **Ops**
  - multi-entity treasury
  - approval-aware views
  - richer drill libraries
- **Enterprise**
  - SSO
  - audit exports
  - custom connectors
  - dedicated implementation support

### Commercial shape

- B2B SaaS with annual contracts
- Pricing likely tied to entity count, connector count, or treasury complexity
- Founder-led / sales-assisted motion at launch, not product-led self-serve

## 16. GTM narrative

### Why this can launch

The timing is credible because stablecoins are increasingly framed as real treasury infrastructure, while the tooling layer is still fragmented across issuer rails, custody, exchanges, and internal spreadsheets.

### Initial ICP

- Crypto-native payment operators
- Remittance / merchant-settlement platforms
- Exchanges or fintechs with meaningful stablecoin reserves

### Entry message

“Your treasury is not just a balance. It is a set of policy and provenance decisions that determine whether money still moves when conditions degrade.”

### Channel hypothesis

- Design partners from stablecoin-heavy operators
- Partnerships with custody / issuer / treasury-system vendors
- Thought leadership around stablecoin treasury policy and incident playbooks

## 17. Risks, dependencies, unknowns

### Risks

- Buyer may default to incumbent wallet infrastructure vendors with bundled treasury modules
- Data normalization across venues and wallet types can become messy
- Teams may resist another dashboard unless it replaces real spreadsheet work

### Dependencies

- Reliable custody / venue connectivity
- Asset provenance classification
- Internal finance data for runway / obligations
- Compliance tooling integrations

### Unknowns

- Whether buyers want deep drill tooling or just daily risk scoring first
- How much automation treasury teams will trust before execution controls are added
- Whether accounting and audit outputs should be part of the initial bundle

## 18. Post-demo roadmap

### Near-term

- Multi-entity and multi-workspace views
- Policy version history
- Counterparty and corridor-level segmentation
- Audit and board-ready exports

### Mid-term

- Scenario library with configurable assumptions
- ERP / TMS sync
- Exception routing and approvals
- Draft rebalance plans that can hand off to execution systems

### Long-term

- Embedded treasury recommendations driven by policy history and corridor patterns
- Cross-functional cockpit spanning treasury, compliance, and reconciliation
