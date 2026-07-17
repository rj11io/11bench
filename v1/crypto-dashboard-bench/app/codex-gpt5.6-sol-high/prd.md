# Tideguard product requirements document

**Status:** Demo-ready product definition  
**Owner:** Product  
**Last updated:** 2026-07-16

## 1. Product thesis

Crypto-native finance teams cannot answer a basic treasury question with confidence: **how long can the company keep operating if part of its crypto infrastructure fails?**

Balances are fragmented across wallets, chains, bridged assets, protocols, custodians, and banks. Existing portfolio products optimize for holdings and returns; custody products optimize for secure execution; accounting products optimize for books and close. None makes obligations, accessibility, failure surfaces, and controls the center of the daily decision.

Tideguard is a **treasury resilience and control platform**. It combines read-only balances, operating forecasts, signer posture, and transparent risk evidence to calculate base and stressed runway, then turns material exposures into accountable actions.

## 2. Positioning

**For** finance and operations leaders at crypto-native organizations  
**who** must fund payroll and vendors across wallets and chains  
**Tideguard** is a treasury resilience cockpit  
**that** shows how long operations survive a depeg, bridge outage, counterparty freeze, market fall, or signer failure  
**unlike** portfolio trackers and execution wallets  
**because** every result is tied to obligations, liquidity horizons, provenance, policy, and an actionable control.

Promise: **Know what fails, how many months it costs, and what to fix before the next payment run.**

## 3. Users

### Primary user: finance / operations lead

- Organization: crypto startup, protocol company, foundation, or operational DAO.
- Scale: 20–250 people; approximately $1M–$50M treasury.
- Stack: one or more Safe accounts, custodian/exchange, stablecoin payroll or AP, ERP/accounting tool, spreadsheets.
- Technical comfort: understands addresses and chains but may not audit contracts.
- Authority: can prepare transfers and policies; larger movements need CFO, founder, or multisig approval.

Jobs:

- maintain 30/90-day operating liquidity;
- forecast runway in reporting currency;
- keep exposure inside board-approved limits;
- coordinate remediation with signers;
- produce evidence for board, accounting, audit, and compliance.

Pains:

- manual wallet exports and spreadsheets;
- the same ticker hides different contracts and bridge risks;
- mark-to-market balance overstates spendable funds;
- forecasts and on-chain balances use different clocks;
- risk tools give technical scores without business impact;
- action lives in chat with no owner or audit trail.

Buying triggers:

- adoption of stablecoin payroll or vendor payments;
- expansion from one to multiple wallets/chains;
- a depeg, exploit, signer departure, or counterparty concern;
- board or investor demand for treasury policy;
- audit, fundraising, or finance leadership hire.

### Secondary users

- **CFO / founder / board observer:** reviews runway, stress assumptions, policy breaches, and remediation.
- **Treasury approver / Safe signer:** receives a concise action packet with amount, destination class, rationale, and approvals.
- **Controller / accountant:** validates valuation lineage and reconciles the risk view to books.
- **Security / compliance lead:** reviews address, counterparty, contract, and signer-control evidence.

## 4. Product principles

1. **Obligations before assets.** Treasury exists to fund operations.
2. **Accessible is not the same as valuable.** Liquidity horizon and control path matter.
3. **Unknown is not safe.** Missing and stale evidence are visible and reduce confidence.
4. **Mechanism before grade.** Explain why funds can fail.
5. **Read-only by default.** Execution remains in established custody systems.
6. **Scenario, not prophecy.** User-defined stresses are assumptions, not forecasts.
7. **No silent normalization.** Native and bridged assets remain distinct.

## 5. Scope

### V1 production scope

- read-only import of public wallet/Safe addresses;
- scoped connectors for supported custodians/exchanges;
- CSV/manual import for bank balances and obligations;
- canonical asset and bridged-representation mapping;
- consolidated positions by account, asset, chain, protocol, issuer, and counterparty;
- base runway and time-bucketed liquidity;
- scenario lab for peg, market, bridge, counterparty, signer, and burn shocks;
- policy engine for exposure caps and liquidity minimums;
- signer/threshold posture for supported Safe accounts;
- decision brief and action tracking;
- source registry, freshness, calculation detail, and audit log;
- board-ready PDF/CSV export;
- alerts by email/Slack after opt-in.

### Demo scope

- seeded fictional workspace for Aperture Labs;
- interactive Command, Stress lab, Controls, and Sources views;
- preset and custom scenarios;
- dynamic risk-adjusted runway, loss, coverage, and confidence;
- action checklist and saved scenario persistence in `localStorage`;
- visibly labeled demo data and fixed timestamp;
- normal, empty, volatile, and risk-focused states.

### Non-goals

- custody, private-key storage, seed phrase handling;
- transaction creation, signing, routing, swaps, or yield execution;
- tax-lot accounting or general ledger;
- individualized investment advice;
- probabilistic loss prediction or depeg forecasting;
- full KYT/AML case management;
- universal protocol coverage at launch;
- consumer P&L, trading, or token discovery.

## 6. Critical workflows

### Workflow A — onboard and establish truth

1. Create organization and reporting currency.
2. Add public addresses / supported connections.
3. Label accounts and assign custody/control type.
4. Import 90 days of obligations and expected inflows.
5. Review identity conflicts, missing prices, unsupported positions, and stale sources.
6. Confirm or amend default policy pack.
7. Land on the Command view.

Acceptance criteria:

- no write/signature request is required for public addresses;
- address, chain, and source are visible before import confirmation;
- unsupported assets remain visible and are not valued as zero;
- user can reconcile total by source;
- demo completes the equivalent workflow with seeded data and no external service.

### Workflow B — run a treasury stress

1. Select a preset or change individual shocks.
2. See each assumption with affected exposure.
3. Calculate stressed value, accessible funds, runway, 30-day coverage, and policy breaches.
4. Compare with base case.
5. Save and name the scenario.
6. Open the resulting action plan.

Acceptance criteria:

- results update immediately;
- loss from price shock is separate from temporarily inaccessible funds;
- burn increase affects obligations/runway, not asset value;
- assumptions remain visible with outputs;
- scenario is labeled user-configured and not a forecast;
- saved scenario persists locally in the demo.

### Workflow C — resolve a material exposure

1. Open a decision brief item.
2. Inspect affected positions and evidence.
3. Review recommended control and expected policy effect.
4. Assign owner and required approver.
5. Mark planned/in progress/complete or export an approval packet.
6. Preserve history.

Acceptance criteria:

- recommendation names the policy or obligation it protects;
- completion never claims an on-chain move occurred without confirmed source evidence;
- demo checklist status persists and is explicitly “workflow only.”

### Workflow D — answer “can we pay?”

1. Select 30, 60, or 90-day horizon.
2. Compare obligations with funds accessible inside the same horizon.
3. Inspect exclusions: locked, stale, unpriced, policy-blocked, or shock-affected.
4. Export the coverage detail.

Acceptance criteria:

- numerator and denominator are disclosed;
- obligations include amount, date, confidence, and source;
- accessible assets include withdrawal and approval assumptions;
- result never uses gross portfolio value as cash coverage.

## 7. Functional requirements

### Portfolio and exposure

- FR-1: normalize balances by canonical asset while retaining chain contract and representation.
- FR-2: show gross assets, debt, net value, and accessible value separately.
- FR-3: group exposure by asset, issuer, chain, protocol, custody, bridge, and signer set.
- FR-4: allow custom labels with immutable raw identifiers available.
- FR-5: display pending transfers separately.

### Runway and obligations

- FR-6: calculate base runway = eligible accessible assets / average configured monthly net burn.
- FR-7: support monthly burn from historical actuals, forecast, or manual override with provenance.
- FR-8: show obligation coverage by time bucket.
- FR-9: exclude non-operating and policy-restricted assets unless explicitly included.
- FR-10: allow inflows but show confidence and a toggle to exclude them.

### Stress engine

- FR-11: support asset-specific price shocks.
- FR-12: support temporary unavailability by account, counterparty, bridge, chain, or protocol.
- FR-13: support expense/burn shocks.
- FR-14: support signer/quorum unavailability as an access constraint.
- FR-15: attribute impact into value loss, inaccessible funds, higher obligations, and total runway change.
- FR-16: save, compare, duplicate, and share scenarios.

### Policy and action

- FR-17: configure issuer/asset/chain/protocol/custody caps.
- FR-18: configure minimum days of same-day and 30-day liquidity.
- FR-19: configure signer threshold and signer-freshness requirements.
- FR-20: generate explainable recommended actions; do not auto-execute.
- FR-21: track owner, approver, due date, status, note, and evidence.

### Provenance

- FR-22: every balance stores source, observed block/cursor, observed time, and indexed time.
- FR-23: every price stores source, methodology, timestamp, and confidence.
- FR-24: every forecast stores source file/connection, owner, imported time, and confidence.
- FR-25: stale/missing inputs reduce calculation confidence and are inspectable.
- FR-26: no failed input is silently converted to zero.

## 8. Calculations

### Base values

`position value = quantity × approved price observation`

`eligible operating assets = sum(position value × eligibility flag)`

`base runway months = eligible operating assets / monthly net burn`

`horizon coverage = assets accessible by horizon / obligations due by horizon`

### Stress

For each price-shocked position:

`stressed value = base value × (1 + configured shock)`

For an unavailable surface:

`accessible stressed value = 0 until configured recovery horizon`

`stressed burn = base monthly burn × (1 + expense shock)`

`stressed runway = sum(accessible stressed eligible value) / stressed burn`

Impact attribution:

- **valuation loss:** base value minus stressed value;
- **temporarily inaccessible:** stressed value excluded due to availability scenario;
- **incremental obligations:** stressed burn minus base burn over selected horizon;
- do not add inaccessible funds to permanent loss.

### Confidence

Confidence is a coverage indicator, not a probability:

- high: all material inputs inside freshness policy and directly sourced;
- medium: one or more non-critical derived/manual inputs;
- low: material stale, unsupported, or unresolved identity inputs.

The demo uses an illustrative 0–100 completeness score but labels it “data confidence,” not model accuracy.

## 9. Seeded demo model

Fictional organization: **Aperture Labs**  
Reporting currency: USD  
Data snapshot: **2026-07-16 09:42 UTC**  
Seeded total: **$4.82M**  
Monthly operating burn: **$376K**  
Next 30-day obligations: **$880K**

Assets:

- native USDC: $1.78M;
- bridged USDC.e: $470K;
- USDT: $1.18M;
- EURC: $420K;
- ETH: $610K;
- wstETH: $240K;
- bank USD: $120K.

The figures are fictional demonstration data and are not fetched live.

## 10. Security, privacy, and permissions

### Wallet/security

- never request, transmit, or store seed phrases/private keys;
- public-address import is the preferred first-run path;
- authenticated connectors request minimum read scopes;
- any future signing is initiated and completed in the custody provider;
- render clear transaction effects for any future handoff;
- warn that blockchain transfers are irreversible;
- detect and show domain/account verification as a fallible signal.

### Application security

- SSO/SAML and MFA for Scale/Enterprise;
- tenant isolation and row-level authorization;
- encryption in transit and at rest;
- secrets in managed vault;
- append-only audit events for policy and source changes;
- least-privilege service accounts;
- dependency scanning, penetration test, incident response, backup and restore tests.

### Roles

- **Viewer:** read dashboards and exports.
- **Finance editor:** accounts, forecasts, scenarios, actions.
- **Policy admin:** policies, integrations, material overrides.
- **Auditor:** read plus immutable evidence exports.
- **Organization admin:** users, roles, security, retention.

Separation of duties: a user cannot approve their own policy exception in production.

### Privacy

- public addresses can become personal data when labeled;
- minimize counterparties and payroll detail in shared views;
- support redaction in board links/exports;
- configurable retention and deletion where legally possible;
- do not expose salary-level data to general viewers;
- avoid enriching addresses with third-party identity labels without contract, purpose, and review.

## 11. Compliance requirements

- Product copy states analytics, not legal, accounting, tax, or investment advice.
- Maintain jurisdiction-specific provider and asset metadata as evidence, not a guarantee of eligibility.
- Legal review before adding transfer orchestration, custody, exchange, advice, or portfolio management.
- Connector terms and data licenses must permit storage, derived metrics, and customer exports.
- Accounting output must identify applied valuation policy and remain reconcilable.
- Sanctions/KYT integration, if added, presents provider result, timestamp, and scope; Tideguard does not invent a universal “compliant” badge.

## 12. Onboarding and activation

### Onboarding

- choose reporting currency and organization type;
- add a Safe/public address or load the sample workspace;
- label operating, reserve, investment, and restricted accounts;
- upload the provided obligations template;
- review three highest-confidence exposures;
- run “Board stress” preset;
- assign one action.

### Activation event

An organization is activated when, within seven days:

- at least 80% of declared treasury value is mapped;
- at least 60 days of obligations are imported;
- one scenario is saved;
- one policy is confirmed;
- one action has an owner.

## 13. Retention and notifications

- weekly resilience digest;
- alert on material balance, issuer, chain, signer, policy, or source-freshness change;
- monthly pre-payment-run review;
- quarterly board brief;
- scenario re-run when underlying exposure changes materially;
- action reminders by owner/due date.

No notification may imply a loss or exploit occurred unless observed evidence supports it.

## 14. Success metrics

### North star

**Protected operating value under active policy:** eligible treasury value in workspaces with current obligations, current sources, and no unowned critical breach.

### Product metrics

- time to first complete resilience view;
- percent of value mapped and current;
- percent of obligations mapped;
- scenario completion and save rate;
- critical findings with assigned owner;
- median time from breach to planned control;
- monthly active finance workspaces;
- board brief exports;
- alert precision / dismissed-as-not-useful rate.

### Business metrics

- free stress-check to qualified workspace conversion;
- paid activation rate;
- sales cycle by segment;
- expansion from Observe to Control/Scale;
- gross retention and net revenue retention;
- partner-sourced pipeline;
- support/security review burden.

### Guardrails

- zero seed phrase/private key collection;
- zero falsely labeled live values;
- no silent stale-price use;
- no cross-tenant disclosure;
- recommendation override and disagreement rate;
- percentage of “unknown” states correctly surfaced.

## 15. Analytics events

- `workspace_sample_loaded`
- `account_import_started/completed/failed`
- `obligations_imported`
- `identity_conflict_reviewed`
- `scenario_preset_selected`
- `scenario_input_changed`
- `scenario_saved`
- `risk_item_opened`
- `action_assigned/status_changed`
- `policy_confirmed/edited/breached`
- `source_detail_opened`
- `board_brief_exported`
- `stale_data_acknowledged`

Events must exclude raw addresses, counterparties, balances, and salary data unless strictly needed and consented.

## 16. Packaging and pricing hypothesis

- **Observe — free:** one workspace, three addresses, current snapshot, one saved scenario.
- **Control — $499/month:** 25 accounts, forecasts, policies, alerts, board brief, five users.
- **Scale — $1,500/month:** 100 accounts, SSO, audit log, standard custody/accounting connectors, 15 users.
- **Enterprise — custom:** private connectivity, data residency, advanced roles, SLA, security review.

Annual plans receive onboarding and a policy workshop. Validate willingness-to-pay with 15 design partners before final packaging.

## 17. Launch and GTM

### Beachhead

Crypto-native companies and foundations with:

- $2M–$20M in treasury;
- at least two chains/accounts;
- stablecoin operating expenses;
- a finance/ops owner;
- existing Safe usage.

### Narrative

“Your wallet says what you own. Tideguard says what your company can survive.”

### Motion

1. Launch a free read-only treasury stress check.
2. Recruit 10–15 design partners through fractional CFOs, crypto accounting firms, and Safe ecosystem operators.
3. Publish a practical treasury policy pack and incident-derived stress presets.
4. Convert teams that add obligations, policies, and recurring alerts.
5. Expand to accounting and custody connectors after the risk workflow retains.

### Sales proof

- time saved preparing a board/payment-run view;
- exposures found that were absent from the spreadsheet;
- improvement in accessible 90-day coverage;
- reduction in unowned policy breaches;
- auditability and source coverage.

Do not sell with hypothetical loss-prevention claims.

## 18. Risks, dependencies, and unknowns

| Risk / unknown | Impact | Mitigation / test |
|---|---|---|
| Users already solve this in spreadsheets | weak willingness to pay | design-partner tests focused on recurring alerts, provenance, and board output |
| Risk recommendations could resemble advice | regulatory and trust risk | user-configured policies, factual mechanisms, legal review, no execution |
| Protocol/bridge risk metadata ages quickly | false confidence | review cadence, source timestamp, unknown state, materiality-first coverage |
| Balance coverage across chains is incomplete | incorrect runway | reconcile totals, supported-universe disclosure, manual source with owner |
| Forecast quality is weak | misleading runway | confidence bands, exclude uncertain inflows by default, source/version history |
| Public address labels expose sensitive context | privacy risk | RBAC, redaction, minimal third-party enrichment |
| Custody vendors expand into the wedge | competitive pressure | remain system-agnostic and superior at cross-provider obligation-aware analysis |
| Action does not close the loop | low retention | owner/due date, evidence verification, Safe/custody handoff roadmap |
| Finance buyers demand accounting | scope expansion | exports first; partner with rather than replace subledger systems |

Dependencies:

- reliable chain indexers and canonical asset registry;
- price/reference-rate licensing;
- bridge/protocol metadata review process;
- supported custodian APIs;
- secure multi-tenant platform;
- legal/compliance review by launch jurisdiction.

## 19. Post-demo roadmap

### Phase 1 — trustworthy read model

- address import, source registry, reconciliation, obligations CSV, base runway.

### Phase 2 — stress and controls

- scenario engine, policy packs, action workflow, alerts, board brief.

### Phase 3 — integrations

- Safe transaction status, custody/exchange read APIs, accounting exports, Slack.

### Phase 4 — verified handoff

- human-readable approval packet, destination allowlist verification, transaction simulation deep link; execution remains external.

### Phase 5 — benchmarking

- opt-in anonymized policy/risk benchmarks by organization type; minimum cohort and privacy controls required.

## 20. Demo acceptance criteria

- route renders at `/codex-gpt5.6-sol-high`;
- all data is visibly labeled seeded/demo and fixed as-of;
- desktop 1440×900 communicates the thesis above the fold;
- mobile 375×812 has no horizontal overflow and retains core navigation;
- Command, Stress lab, Controls, and Sources controls work;
- scenario changes update impact and recommendations;
- action and scenario state persist in `localStorage`;
- empty, normal, volatile, and risk-focused states are accessible;
- units, price/forecast assumptions, and provenance are inspectable;
- no wallet, backend, credential, or external service is needed;
- no console errors;
- lint, typecheck, and build pass.

