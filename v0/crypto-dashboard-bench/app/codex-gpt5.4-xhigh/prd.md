# PRD: Helm Treasury

Version: Demo v1  
Date: July 16, 2026  
Category: crypto treasury risk control tower

## Product Thesis

`Helm Treasury` is a scenario-aware treasury operating system for crypto-native finance teams and DAO treasuries. It helps operators understand whether stablecoin-heavy reserves remain liquid, policy-compliant, and signer-ready before they move funds.

It is not another price dashboard, wallet, or accounting package. It sits between them.

## Positioning

For treasury teams running multi-chain stablecoin balances across Safe accounts, watch-only wallets, and DeFi venues, Helm Treasury is the control tower that turns fragmented wallet visibility into policy-aware rebalance decisions.

### Differentiated promise

`Know before the first signer approves whether your treasury still meets policy.`

### Category framing

- Not a trading terminal
- Not a generic portfolio tracker
- Not a crypto ERP
- Yes: a treasury risk and liquidity decision surface

## Primary And Secondary Users

### Primary user

Head of Treasury or Treasury Operations Lead at a protocol, DAO, foundation, or crypto-native finance team.

### Secondary users

- CFO / COO / Head of Finance
- Treasury committee members
- Safe signers and approvers
- Risk and compliance reviewers
- Auditors or external advisors reviewing treasury actions

## Jobs To Be Done

### Functional jobs

- See total treasury exposure by issuer, chain, venue, and wallet.
- Confirm same-day liquidity against known burn and obligations.
- Stress-test the treasury against depeg, liquidity, and counterparty scenarios.
- Detect policy breaches before rebalances, grants, payroll, or market-making top-ups.
- Queue recommended actions and hand them to signers with context.

### Emotional jobs

- Reduce fear that the team is missing a silent concentration risk.
- Give finance leaders a committee-ready explanation, not just a number.
- Let signers approve with confidence instead of relying on spreadsheet folklore.

### Buying trigger

- Recent stablecoin or venue stress event.
- Treasury spread across too many wallets and protocols.
- Weekly rebalance still depends on spreadsheets.
- CFO or treasury committee asks for policy evidence and faster incident response.

## Problem Statement

Crypto treasury operators can usually answer `what do we hold?` but often cannot quickly answer:

- what is liquid today versus visible but delayed;
- which balances are overconcentrated by issuer or chain;
- which DeFi positions are safe only under calm markets;
- whether screening, reserve evidence, or policy context is fresh enough to trust.

That gap creates slow decisions, brittle governance, and surprise risk.

## Product Scope

### In scope for v1

1. Watch-only treasury workspace
2. Exposure explorer by issuer, chain, venue, and wallet
3. T+0 / T+1 / T+3 liquidity ladder
4. Policy engine for concentration, liquidity, protocol, and operational controls
5. Scenario switcher for stress testing
6. Recommended action queue with signer implications
7. Provenance and freshness panel for balances, prices, reserve evidence, and screening

### Non-goals

- Holding private keys
- Executing transactions directly on-chain
- Replacing Safe, Fireblocks, or custody tooling
- Full accounting close, journal entry generation, or tax reporting
- Alpha generation or token discovery
- Consumer retail portfolio tracking

## Core Workflows

### Workflow 1: Morning treasury review

1. Open workspace
2. See total treasury, immediate runway, and unresolved policy breaches
3. Review incident banner and fresh alerts
4. Confirm whether today’s obligations are still safe to fund

### Workflow 2: Stress and diagnose

1. Switch from steady state to a liquidity or depeg scenario
2. See which policies newly fail
3. Filter explorer to `Only breaches`
4. Drill into the concentrated issuer, chain, venue, or wallet

### Workflow 3: Queue a rebalance package

1. Review recommended actions
2. Queue one or more changes
3. See projected impact on T+0 liquidity, issuer concentration, and breach count
4. Hand off to the wallet/custody execution layer with signer context

## Functional Requirements

### 1. Workspace and holdings model

- The product must model legal entity, wallet/account, chain, venue, token, and position.
- The product must distinguish liquid spot balances from vault shares, lending positions, and volatile collateral.
- The product must support both Safe-style accounts and watch-only wallets.

Acceptance criteria:

- A user can understand where value sits without opening a second system.
- A vault share is never displayed as if it were identical to native spot stablecoin.

### 2. Exposure explorer

- Grouping modes: issuer, chain, venue, wallet.
- Exposure cards must show absolute USD value and share of treasury.
- Drill-down must show the underlying positions behind each grouped bar.

Acceptance criteria:

- A user can identify the largest concentration in one click.
- The drill-down reveals which exact wallets or venues create that concentration.

### 3. Liquidity and runway

- The product must calculate same-day liquidity and delayed liquidity separately.
- It must show immediate runway and total runway.
- It must visually separate T+0, T+1, and T+3 accessible value.

Acceptance criteria:

- A user can tell whether payroll or vendor obligations can be funded without forced unwinds.

### 4. Policy engine

- Support minimum T+0 runway.
- Support max issuer concentration.
- Support max protocol deployment.
- Support max non-primary-chain concentration.
- Support operational rules such as signer thresholds or screened counterparties.

Acceptance criteria:

- Each policy row shows target, current state, owner, and pass / warn / breach status.

### 5. Scenario engine

- Support at least three modes: steady state, liquidity shock, and issuer stress.
- Scenario mode must be explicit and visually unmistakable.
- Every scenario must recompute metrics, policy status, and recommended actions.

Acceptance criteria:

- A user can see how many new breaches appear under stress without leaving the page.

### 6. Action queue

- The product must recommend concrete remediations.
- Each recommendation must include expected impact, owner, and signer or workflow implication.
- Queued actions must persist locally in the demo.

Acceptance criteria:

- Selecting a package visibly changes the projected outcome summary.

### 7. Provenance, freshness, and trust

- Every important dataset must show source type and last updated time.
- The product must separate confirmed on-chain data from attested or estimated data.
- Screening and reserve evidence freshness must be visible.

Acceptance criteria:

- A user can tell which numbers are block-confirmed, which are market-priced, and which are reserve-attested.

## Data Sources And Freshness Assumptions

### Production source strategy

- On-chain balances: chain indexers and Safe Transaction Service-compatible sources
- Price data: CoinGecko / Coin Metrics / oracle feeds
- Reserve evidence: issuer transparency pages, attestations, and proof-of-reserve feeds when available
- Protocol risk parameters: protocol docs and governance-published parameters
- Sanctions and address screening: specialized compliance vendor

### Freshness assumptions

- Balances: target under 2 minutes from canonical chain head, with visible confirmation state
- Price data: target under 60 seconds for core assets, always displayed with timestamp
- Reserve evidence: clearly labeled by cadence, often weekly or monthly unless a real-time reserve feed exists
- Screening outcomes: event-driven with periodic rescan

### Demo assumptions

- All balances, prices, and scenarios are seeded and clearly marked as non-live.
- Timestamps shown in the demo describe seeded recency semantics, not a live backend.

## Calculations

### Treasury value

Sum of all visible positions at scenario-adjusted USD value.

### Immediate runway

`T+0 accessible USD / monthly burn`

### Total runway

`total treasury USD / monthly burn`

### Issuer concentration

`net USD exposure to a stablecoin issuer / total treasury USD`

### Protocol exposure

Gross capital deployed in DeFi venues as a share of treasury, not just net PnL.

### Scenario-adjusted liquidity

Value after scenario-specific price marks and exit haircuts for the relevant settlement window.

## Entity Model

- Workspace
- Legal entity
- Wallet / account
- Signer policy
- Position
- Token / issuer
- Chain
- Venue / protocol
- Obligation
- Policy rule
- Alert
- Action package
- Source and freshness record

## Wallet, Security, Privacy, Permissions, And Compliance

### Wallet and security requirements

- Watch-only by default
- No private key custody in v1
- Signer handoff only, not transaction execution
- Role-aware visibility for admin, operator, signer, reviewer, and auditor
- Immutable action log and policy state history

### Privacy requirements

- Least-privilege access to workspace data
- Clear separation between entity-level and wallet-level visibility
- Redaction options for auditors or board-facing views in later phases

### Compliance and risk requirements

- Sanctions and high-risk counterparty indicators
- Reserve-provenance labels for asset backing claims
- Policy evidence export suitable for regulated buyers
- Clear disclaimers when data is stale, estimated, seeded, or attested rather than live

## Onboarding, Activation, Retention, And Success Metrics

### Onboarding

- Import first Safe or watch-only address
- Set monthly burn
- Select or edit a policy template
- Review first policy breach or clear workspace

### Activation event

A user has activated when they:

- add at least one wallet,
- set at least one treasury policy,
- and queue or review at least one recommended action.

### Retention loop

- Weekly treasury review
- Pre-payout or pre-grant check
- Stress review after major market incidents
- Committee review before a rebalance

### Product success metrics

- Time to first policy breach detected
- Time from incident to proposed rebalance package
- Percentage of treasury under policy coverage
- Percentage of actions reviewed before signer approval
- Monthly active treasury workspaces

### Demo analytics to instrument later

- Scenario switched
- Lens filtered to breaches
- Explorer grouping changed
- Action queued or removed
- Empty-state workspace recovered

## Packaging And Pricing Hypothesis

### Packaging

- `Team`: small treasury teams and DAO operators
- `Treasury`: mature crypto-native finance teams with policies, scenario stress, and audit exports
- `Enterprise`: banks, issuers, and larger institutions with SSO, custom policies, and dedicated integrations

### Pricing hypothesis

- `Team`: `$1,500/mo` for up to 25 wallets and 3 entities
- `Treasury`: `$5,000/mo` for policy engine, stress packs, exports, and role controls
- `Enterprise`: custom annual contract

### Pricing rationale

- Price by monitored operational complexity, not AUM.
- Avoid custody-style AUM rent because the buyer already pays for execution, custody, or wallet infrastructure elsewhere.

## GTM Narrative

### Beachhead narrative

Helm is the product for teams that already survived the first phase of on-chain operations and no longer trust spreadsheets to police stablecoin risk.

### Launch motion

- Safe ecosystem distribution and integration partnerships
- Treasury advisory and finance-ops consultancies
- DAO treasury committees and foundation finance leads
- Content marketing around stablecoin incident preparedness and treasury policy benchmarks

### Core message

`You already know what you hold. Helm tells you whether it is still safe to hold it there.`

## Risks, Dependencies, And Unknowns

### Risks

- Cross-chain labeling and entity classification can be noisy.
- Reserve transparency is uneven across issuers and often not real-time.
- Default policy thresholds may need segment-specific tuning.
- False-positive screening or over-warning could reduce trust.

### Dependencies

- Reliable indexers and price feeds
- Compliance screening provider
- Wallet and custody export or integration surfaces
- Strong audit logging and permissions architecture

### Unknowns

- Best default policy pack by customer segment
- Whether buyers prefer workspace-based or entity-based packaging
- How much DeFi protocol risk depth is required for MVP vs later phases

## Post-Demo Roadmap

1. Safe export for queued action packages
2. Board and treasury committee report generation
3. Vendor and counterparty policy packs
4. Custom scenario builder
5. Accounting and ERP reconciliation hooks
6. Approval history and policy drift timelines
7. Cross-entity treasury rollups for holding companies or foundations
