# PRD: StableOps Treasury Console

## Thesis

Stablecoin adoption is moving from speculation to business payment operations. Finance teams do not need another token terminal; they need a controlled decision loop for approving stablecoin settlement batches. StableOps helps a controller decide what to pay today, which stablecoin rail to use, what risks must be cleared, and what evidence belongs in the approval packet.

## Category and positioning

Category: stablecoin treasury operations and risk dashboard.  
Positioning: "Approve cross-border stablecoin payables with issuer, liquidity, compliance, and reconciliation context before funds move."  
Differentiated promise: combine treasury readiness, policy gating, data provenance, and approval evidence in one finance workflow.

## Users

Primary user: controller or treasury operations lead at a mid-market company with recurring cross-border vendors.  
Secondary users: CFO, compliance analyst, AP clerk, crypto operations lead, external auditor.

## Jobs, pains, and buying trigger

Jobs:

- Select payable batches due today.
- Compare USDC, USDT, EURC, chain, fee, spread, and ETA choices.
- Confirm sufficient liquidity before payment.
- Block payments with unresolved sanctions, KYC, wallet ownership, or policy exceptions.
- Export or prepare approval evidence for a custodian, multisig, or payment provider.

Pains:

- Stablecoin data is fragmented across wallets, exchanges, compliance vendors, and spreadsheets.
- "Fast and cheap" claims are hard to reconcile with compliance and audit requirements.
- Teams fear approving the wrong chain, wrong address, or wrong issuer exposure.
- Existing crypto dashboards emphasize market watching rather than operational close.

Buying trigger: finance has more than $500k per month in international payables, counterparties ask for stablecoins, or wire delays cause missed service-level agreements.

## Scope

Demo scope:

- Seeded payable queue with normal, volatile, empty, and blocked states.
- Select eligible invoices for a batch.
- Compare settlement rails by issuer, chain, balance, capacity, peg deviation, spread, fee, ETA, risk, and provenance.
- Show exposure and route capacity visualizations.
- Gate packet preparation when elevated policy exceptions or insufficient liquidity exist.
- Persist prepared packet metadata in localStorage.

Production scope:

- ERP/AP import, wallet/custody ledger sync, compliance vendor sync, pricing/liquidity source ingestion, policy engine, approval packet generation, audit log, and role-based permissions.

Non-goals:

- No trading execution.
- No yield optimization.
- No consumer portfolio tracking.
- No tax filing.
- No investment advice.
- No direct wallet connection in the benchmark demo.

## Workflows

1. Treasury close opens with latest data freshness and demo/live status.
2. User filters invoices by due date, region, counterparty, currency, risk, and amount.
3. User selects eligible payables.
4. StableOps calculates batch total, estimated cost, liquidity after settlement, and exception count.
5. User chooses a rail.
6. Policy engine marks clear, watch, approval required, or blocked.
7. If clear, user prepares an approval packet containing batch IDs, route, assumptions, provenance, and unresolved watch notes.
8. Compliance resolves exceptions outside the demo; production would store notes and evidence.

## Requirements and acceptance criteria

- The page must clearly state that data is seeded and not live.
- Every price, balance, exposure, and fee must have units.
- Every risk state must have a visible meaning.
- Blocked invoices cannot be selected.
- Elevated exceptions prevent approval packet creation.
- Empty state must be informative and not look broken.
- Volatile scenario must alter risk/cost semantics.
- Prepared state must persist locally after reload.
- Mobile width around 375px must avoid horizontal overflow.
- Desktop width around 1440px must present the full decision loop without requiring page navigation.

## Data sources and assumptions

Production integrations:

- Issuer disclosures: Circle reserve and attestation pages, issuer APIs where available.
- Market and stablecoin data: DeFiLlama stablecoins, exchange quotes, custody ledger balances, chain explorers, and internal quote providers.
- Compliance: Chainalysis, TRM, internal sanctions policy, KYC/KYB system.
- ERP/AP: NetSuite, QuickBooks, Xero, SAP, or CSV import.
- Custody/wallet: Fireblocks, Coinbase Prime, BitGo, Safe, or bank/payment provider ledgers.

Demo data is seeded and intentionally plausible, not factual. It models invoices, balances, route capacity, peg deviation, spreads, fees, ETA, provenance, and exceptions.

## Entity model

- Organization owns treasury accounts, policies, users, and approval roles.
- Counterparty has region, KYB status, wallets, preferred rails, and sanctions state.
- Invoice has amount, currency, due time, counterparty, and status.
- Rail combines issuer, stablecoin, chain, venue/custodian, capacity, quote, and risk.
- Batch has selected invoices, rail, approvers, policy result, packet evidence, and final transaction references.
- Risk event has severity, source, timestamp, affected entities, and required resolution.

## Security, privacy, permissions, and compliance

- Read-only dashboard access separate from approval permission.
- No private keys, seed phrases, or wallet credentials stored.
- Wallet ownership verification required for new counterparties.
- Address allowlists and chain-specific confirmations required before release.
- Sanctions and illicit exposure screening before packet creation.
- Full audit log for data source, policy version, user action, and timestamp.
- Privacy posture: store only business payment metadata needed for operations; redact wallet and counterparty details by role where possible.
- Compliance posture: support AML/BSA, sanctions, travel-rule, MiCA-relevant issuer checks, and stablecoin reserve disclosure review; do not claim to replace legal review.

## Onboarding and activation

Onboarding:

1. Connect AP source or upload payables CSV.
2. Connect read-only custody/wallet source.
3. Select approved stablecoins, issuers, chains, and jurisdictions.
4. Configure approval thresholds and blocked conditions.
5. Invite finance and compliance users.

Activation metric: first prepared approval packet with no unresolved critical exception.

Retention loops:

- Daily settlement close.
- Weekly exposure and liquidity review.
- Monthly audit evidence export.
- Counterparty wallet review.

Success metrics:

- Time from AP import to approval packet.
- Percent of batches with complete evidence.
- Avoided blocked payout attempts.
- Settlement cost variance versus quote.
- Days to reconcile.
- Active weekly finance users.

## Packaging, pricing, and GTM

Hypothesis:

- Starter: $499/month for CSV import, seeded policies, 3 seats, and manual packet export.
- Operations: $1,500-$3,000/month plus volume tier for ERP, custody, compliance integrations, 10 seats, and audit logs.
- Enterprise: custom for SSO, custom policies, regional compliance workflows, API access, and dedicated support.

Launch motion: partner with stablecoin issuers, custodians, and cross-border payment providers; sell to CFOs through "stablecoin controls for payables close" content and compliance-focused demos.

## Risks and unknowns

- Regulatory treatment differs by jurisdiction and may change.
- Issuer disclosures and data APIs have different cadence and legal meaning.
- Liquidity can disappear during stress.
- Counterparty wallet ownership remains operationally hard.
- Finance buyers may prefer bundled payment providers over standalone software.
- Compliance vendors may restrict redistribution of risk scores.

## Post-demo roadmap

- Approval packet PDF/export.
- ERP import mapper.
- Role-based redaction.
- Quote comparison across venues.
- Wallet allowlist workflow.
- Counterparty portal for wallet attestations.
- Custody execution handoff.
- Incident mode for depeg or issuer stress.
