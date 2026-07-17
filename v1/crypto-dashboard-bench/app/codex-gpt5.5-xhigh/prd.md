# PRD: Treasury Risk Control Room

## Product thesis

Crypto-native treasuries do not need another token chart wall. They need a daily control room that converts fragmented wallet, custody, market, stablecoin, protocol, and policy data into approval-ready decisions.

Product: Treasury Risk Control Room  
Category: crypto treasury risk operations and governance  
Positioning: approval-ready crypto treasury risk control for protocol finance teams  
Differentiated promise: "Know what requires signer action today, why it matters, and what evidence supports the response."

## Users

Primary user:

- Head of treasury, CFO, finance lead, or operations lead at a protocol foundation or crypto-native company with $10M+ in digital assets.

Secondary users:

- Controller or fund administrator preparing board/audit materials.
- Risk/compliance lead reviewing sanctions, issuer, venue, and liquidity exposure.
- Safe/Fireblocks/Coinbase Prime signers approving movement after separate custody-system review.
- Board observer or grants lead consuming summary exports.

Jobs to be done:

- "When market conditions change, show me whether runway, liquidity, or policy caps are breached."
- "Before I ask signers to approve a transfer, give me the evidence and the policy reason."
- "When stablecoins move off peg, tell me which issuer, venue, protocol, and payout dependencies are affected."
- "Before the board meeting, produce a defensible risk report with timestamps and source caveats."

Pain points:

- Balances live across Safe, custody, exchange, hot wallets, and DeFi protocols.
- Stablecoins are treated as cash in spreadsheets even though issuer, peg, redemption, and compliance risks differ.
- On-chain transfer data is easy to misread without labels and source caveats.
- Approvals happen in custody tools, but decision evidence sits in chats, spreadsheets, dashboards, and SQL notebooks.
- Finance teams lack a shared policy register connected to actual exposure.

Buying trigger:

- Depeg scare, venue/custodian incident, audit request, board request, governance signer incident, institutional investor diligence, or treasury size outgrowing spreadsheets.

## Scope

Demo scope:

- Route-local frontend demo at `/codex-gpt5.5-xhigh`.
- Seeded data only, clearly labeled.
- Scenario switching for normal, volatile, depeg, and empty onboarding states.
- Risk queue with selectable alerts.
- Evidence and policy panel for selected alert.
- Approval runbook checklist with localStorage persistence.
- Exposure, wallet, counterparty, stablecoin, and provenance views.

Production MVP scope:

- Read-only imports from Safe, Fireblocks, Coinbase Prime/custody systems, exchange/custody CSVs, market/reference price APIs, and on-chain warehouse tables.
- Policy register for concentration, liquidity, venue, issuer, peg, signer, source freshness, sanctions/KYT, and protocol exposure rules.
- Alert queue with severity, evidence, affected entities, and required reviewer.
- Runbook drafts that can be exported or pushed into approval systems without signing in-product.
- Board/audit report export with source freshness and caveats.

Non-goals:

- No custody, private key handling, transaction signing, trading, exchange, or money transmission.
- No investment advice or performance promises.
- No tax lot accounting as the primary workflow.
- No open-ended SQL workbench in the core product.
- No unsupported claim that stablecoin balances are risk-free cash.

## Core workflow

1. Finance lead opens daily control room.
2. Product shows demo/live status, source freshness, treasury health, and priority risk queue.
3. User selects the top alert.
4. Product explains the policy, affected assets/wallets, source evidence, and recommended decision.
5. User selects runbook steps, adds signer note, and saves an approval draft.
6. Saved draft persists locally in the demo; in production it would export to governance/custody approval workflow.

## Requirements

Functional requirements:

- Show all values with units and timestamps.
- Show demo/live state above the fold.
- Provide scenario control for normal, volatile, stablecoin depeg, and empty state.
- Render a prioritized risk queue with severity.
- Selecting an alert updates evidence, policy, affected assets, and runbook steps.
- Runbook step selection changes estimated risk reduction.
- Save runbook to localStorage and show saved drafts.
- Filter exposure by asset category.
- Show empty states when no wallets/assets are imported.
- Render source freshness and provenance for all high-level data groups.

Acceptance criteria:

- A user can identify the top treasury risk in under 30 seconds.
- A user can explain why a recommended action is tied to policy.
- A user can distinguish seeded demo data from live data.
- A user can see whether data is stale, modeled, or missing.
- A user can save and clear a local approval draft.
- Normal, volatile, depeg, and empty states are visible.
- Desktop 1440x900 and mobile 375x812 have no horizontal page overflow.
- Route has no console errors.
- `npm run lint`, `npm run typecheck`, and `npm run build` pass.

## Data model

Entities:

- LegalEntity: id, name, jurisdiction, policySetId, baseCurrency.
- Account: id, legalEntityId, type, provider, chain, address/account id, custody model, signer group.
- Asset: id, symbol, name, category, token classification, issuer, chain, contract, decimals.
- BalanceObservation: accountId, assetId, amount, usdValue, priceSource, blockTime, observedAt, confidence.
- PriceObservation: assetId, source, price, bid, ask, volume, venueClass, observedAt, latency.
- TransferEvent: chain, txHash, logIndex, from, to, label, amount, amountUsd, classification, caveat.
- Counterparty: id, type, name, jurisdiction, dependencyType, evidenceUrl.
- PolicyRule: scope, threshold, unit, severity, action, reviewer, evidenceRequired.
- Alert: policyRuleId, severity, sourceFacts, affectedEntities, recommendedDecision, status.
- Runbook: alertId, steps, amount, source, destination, expectedRiskReduction, signerNote, approvalStatus.

Freshness assumptions:

- Market/reference data: target 5-15 minutes; stale after 20 minutes for market-sensitive decisions.
- On-chain warehouse data: target 15-60 minutes; finality and decoding caveats shown.
- Custody balances: hourly or on-demand during incident mode.
- Manual NAV/reserve evidence: same day, reviewer stamped.
- Sanctions/KYT: source timestamp and screening vendor status required.

Calculations:

- Net treasury: sum of latest balance observations by legal entity and asset after de-duplication.
- Liquid runway: liquid USD-equivalent assets divided by monthly operating burn.
- Stress runway: liquid assets after configured price shocks, haircut, and liquidity discount divided by burn.
- Issuer concentration: issuer-linked assets divided by net treasury.
- Venue concentration: venue/custody exposure divided by net treasury.
- Peg deviation: observed stablecoin price minus reference peg.
- Liquidity depth: modeled executable depth at configured slippage band.
- Risk budget used: weighted share of triggered policy thresholds, source freshness, and severity.

## Security, privacy, permissions, and compliance

- Read-only integrations by default.
- No private keys, seed phrases, signing, transfer execution, or browser wallet requirement.
- API scopes must be least privilege and clearly visible.
- User roles: viewer, analyst, policy editor, approver, admin.
- Sensitive account labels can be redacted in shared reports.
- All exported recommendations include "decision support, not investment/legal/tax advice."
- Stablecoin rules must track issuer, reserve disclosure, redemption policy, peg, venue, and sanctions/KYT evidence.
- U.S. compliance assumptions: virtual currency sanctions obligations apply; BSA/MSB boundaries matter if a product accepts/transmits value. This product is scoped as read-only decision support.

## Onboarding and activation

Onboarding:

1. Create legal entity.
2. Import policy template.
3. Add read-only wallet/account sources.
4. Map assets to issuer, category, and accounting treatment.
5. Confirm monthly burn and runway policy.
6. Review first risk queue.

Activation event:

- User saves first approval-ready runbook or exports first board risk report.

Retention loops:

- Daily exception digest.
- Weekly treasury policy drift report.
- Monthly board/audit export.
- Incident-mode stablecoin/venue playbooks.
- Signer readiness and policy review reminders.

Success metrics:

- Time from alert to approval packet.
- Percentage of treasury covered by fresh data.
- Number of stale or unmapped assets.
- Policy breaches resolved within SLA.
- Board report exports per month.
- Saved runbooks that result in approved custody-system actions.
- Reduction in manual spreadsheet reconciliations.

Analytics:

- Scenario/filter usage.
- Alert selection and dwell time.
- Evidence expansion.
- Runbook save, edit, clear.
- Empty-state completion.
- Export/share actions in production.

## Packaging and pricing hypothesis

Starter: $1,500/month

- Up to 5 wallets/accounts.
- CSV imports.
- Policy templates.
- Basic board report export.

Growth: $4,000/month

- Up to 25 wallets/accounts.
- Read-only Safe, Fireblocks, Coinbase Prime, market, and warehouse integrations.
- Custom policy rules.
- Runbook templates.
- Audit evidence.

Enterprise: $10,000+/month

- Multi-entity support.
- SSO and role controls.
- Data warehouse sync.
- KYT/compliance integrations.
- SLA, custom policies, private deployment options.

## GTM narrative

Narrative:

"Your treasury already has custody, dashboards, and spreadsheets. Treasury Risk Control Room turns them into a daily decision queue with evidence, policy, and signer-ready runbooks."

Launch motion:

- Publish crypto treasury incident templates: depeg response, venue cap breach, signer readiness, runway stress.
- Partner with accounting firms and DAO operations advisors.
- Integrate with Safe and custody ecosystems via read-only connectors.
- Land with board reporting; expand into continuous controls.

Sales proof points:

- Reduces manual treasury reconciliation.
- Makes stablecoin and custody risk visible.
- Creates a defensible audit trail.
- Keeps execution in approved custody/prime systems.

## Risks, dependencies, and unknowns

Risks:

- Data quality and label mistakes can create false confidence.
- Integration permissions vary across custody providers.
- Legal treatment of assets and stablecoins varies by jurisdiction.
- Users may expect signing or execution; product must maintain scope boundaries.
- Policy templates can become stale after regulatory changes.

Dependencies:

- Custody and wallet APIs.
- Market/reference data provider.
- On-chain warehouse or indexer.
- Compliance/KYT provider for production.
- Legal review for jurisdiction-specific product language.

Unknowns:

- How much buyers will pay for read-only control without embedded execution.
- Whether policy owners prefer export-first or workflow-system integration.
- Which integrations are mandatory for first 10 design partners.
- How much customization is needed across foundations versus trading firms.

## Post-demo roadmap

1. Exportable PDF/CSV board report.
2. Read-only Safe import and signer attestation model.
3. Fireblocks policy mirror and approval packet export.
4. Stablecoin reserve disclosure tracker.
5. KYT/sanctions provider integration.
6. Multi-entity consolidation.
7. Data warehouse sync and API.
8. Policy simulation before large transfer or sale.
