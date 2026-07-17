# PRD: Northstar

**Status:** Demo-ready product definition  
**Category:** Onchain treasury risk and liquidity decisioning  
**Primary market:** Crypto-native operating companies and protocols  
**Demo organization:** Northstar Labs (fictional), seeded snapshot at
2026-07-16 08:40 UTC

## 1. Thesis and promise

Crypto treasuries do not fail because a team lacks another price chart. They fail
when balances, obligations, liquidity constraints and wallet controls are
reviewed in separate systems. Northstar creates one recurring decision loop:

> **See what is covered → stress what can break → resolve the highest-impact
> breach → hand signers an evidence-backed action packet.**

Positioning: the non-custodial control plane between wallets and finance systems.
Differentiated promise: **know how many policy-adjusted months you can operate,
and the next action that improves that number, with every input traceable.**

## 2. Users and jobs

### Primary user

Finance/operations lead at a 5–50 person crypto-native company or protocol.
Manages several Safe accounts across chains, stablecoin-heavy working capital,
monthly payroll/vendors and a board or token-holder reporting obligation.

Pains:

- spreadsheet snapshots go stale;
- the same stablecoin exposure is fragmented across chains and protocols;
- “liquid” balances may be bridged, lent, delayed or below policy quality;
- signers receive transaction requests without treasury context;
- no single record explains why an action was taken.

Buying trigger: multi-chain expansion, fundraise, near-miss, depeg, audit, new
CFO/finance lead, or a board request for a formal treasury policy.

### Secondary users

- CFO/controller: approves policy and reviews runway.
- Safe signer: reviews proposed actions and evidence.
- Accountant/advisor: reconciles and prepares reporting.
- Executive/board observer: consumes a read-only weekly brief.

## 3. Scope

### Demo / v1 scope

1. Read-only account aggregation for supported EVM/Safe accounts.
2. Canonical asset normalization across chain-specific contracts.
3. Stablecoin-focused risk breakdown.
4. Obligations schedule and 30/90/180-day coverage.
5. Policy-adjusted liquidity and runway calculation.
6. Concentration, freshness and coverage breach queue.
7. Stress scenario editor with depeg, market drawdown and outflow shocks.
8. Alert disposition: open, reviewing, resolved/accepted.
9. Action packet preview: rationale, amount, source/destination, policy impact,
   assumptions and required approvals.
10. Exportable time-stamped report/evidence trail.

### Non-goals

- Custody, private-key management or wallet recovery.
- Executing or signing transactions in the first release.
- Tax lot accounting or general ledger replacement.
- Full AML/KYT investigation platform.
- Trading terminal, alpha signals or yield recommendations.
- Guaranteed asset safety, solvency or regulatory compliance.
- Non-EVM and centralized exchange coverage at initial launch.

## 4. Core workflows

### A. Activate a treasury

1. Create organization; set reporting currency, timezone and monthly burn.
2. Add public Safe/account addresses and label their purpose.
3. Verify discovered assets and canonical mappings.
4. Import obligations CSV or connect AP/accounting.
5. Choose a policy template; review thresholds.
6. Land on command center with first three breaches explained.

Activation event: at least one account and one future obligation loaded, policy
saved, and first scenario run within 30 minutes.

### B. Daily risk review

1. Read policy-adjusted runway and next 90-day coverage.
2. Review decision queue sorted by severity × financial impact × due time.
3. Open a breach; inspect evidence, freshness and affected positions.
4. Assign/acknowledge, model a suggested action, or accept with rationale.
5. Export or hand off action packet to signers.

### C. Stress and plan

1. Choose base, volatile or custom scenario.
2. Adjust stablecoin depeg, market drawdown and unexpected 30-day outflow.
3. See policy-adjusted liquid value, coverage, runway and new breaches update.
4. Save scenario with assumptions and timestamp.
5. Compare against base; create a review task.

## 5. Functional requirements and acceptance criteria

### Command center

- Must display total observed value and policy-adjusted liquid value separately.
- Must show reporting currency, snapshot time, demo/live state and source health.
- Must display runway in base and selected stress scenario.
- Must show upcoming obligations by time bucket.
- Must rank breaches and explain threshold, current measurement, impact, evidence
  age and owner.
- Acceptance: a new user can identify the largest breach and its recommended next
  step in under 30 seconds without opening documentation.

### Positions

- Group by canonical asset, issuer, chain, account and liquidity tier.
- Each row exposes quantity, price, value, 24-hour change (if available), source
  time, confidence and policy eligibility.
- Asset identity uses chain ID + contract; symbol alone is never authoritative.
- Acceptance: cross-chain USDC is aggregated by issuer but drillable to
  chain-specific contracts and accounts.

### Obligations and runway

- Support committed, forecast and optional obligation confidence.
- Convert with time-stamped FX/asset observations; preserve source currency.
- Runway calculation shows formula and exclusions.
- Acceptance: changing a scenario or monthly burn visibly updates runway and
  coverage without implying that observed balances changed.

### Policies and alerts

- Policy types: issuer/asset/chain/venue concentration, liquidity coverage,
  signer resilience, stale data, unknown asset and obligation coverage.
- Every breach has severity, state, owner, created time and evidence.
- Acknowledgement persists locally in the demo.
- Acceptance: acknowledged items remain findable and do not disappear without a
  status label.

### Scenarios

- Inputs have explicit units and plausible guarded ranges.
- Results distinguish observed, calculated and assumed values.
- Saving persists the scenario name/values and last saved time.
- Acceptance: refresh restores the saved scenario; reset returns to documented
  seeded base assumptions.

### Action packets

- Include source/destination account, chain, canonical asset, amount, estimated
  post-action policy effects, decoded intent, simulation state and approvals.
- Never label an unexecuted packet “complete” or “safe.”
- Acceptance: the packet can be reviewed without granting Northstar a signing
  permission.

## 6. Data architecture

### Sources

Production assumptions:

- EVM RPC/indexer for blocks, logs, transactions and native/token balances.
- Safe Transaction Service for configuration, proposals, confirmations and
  execution state.
- Primary/secondary price providers with venue/methodology metadata.
- Issuer disclosures for backing/redemption metadata.
- AP/accounting or CSV for obligations.
- Optional specialist KYT/address screening provider.

The demo calls no external service. All figures are seeded and visibly labeled.

### Freshness targets

- Account balances/proposals: target <60 seconds; stale warning at 5 minutes.
- Prices: target <60 seconds; stale warning at 5 minutes.
- Decoded/enriched positions: target <15 minutes; warning at 60 minutes.
- Issuer disclosures: display publication date and assurance period.
- Obligations: display last import/sync and owner.

No composite metric can appear fresher than its stalest material input.

### Calculations

- `observed_value = quantity × selected_price`
- `eligible_value = observed_value × policy_eligibility × scenario_haircut`
- `liquid_90d = Σ eligible_value for liquidity tiers T0–T2`
- `coverage_90d = liquid_90d / committed_outflows_90d`
- `runway_months = eligible_operating_resources / monthly_net_burn`
- `concentration = scoped_exposure / scoped_observed_value`

Rounding happens only for display. Missing prices are excluded and surfaced.
Negative balances/debt are modeled explicitly, not netted invisibly.

### Entity relationships

Organization owns accounts, obligations, policies, scenarios and members.
Accounts contain positions and proposals. Positions reference chain-specific
assets, which map to canonical assets and issuers. Observations price positions.
Policies evaluate measurements and create breaches. Actions target breaches and
may later map to external transaction proposals.

## 7. Security, privacy and permissions

- Read-only onboarding first; signature proof is optional and purpose-scoped.
- Never collect seed phrases/private keys.
- Encrypt integration secrets and customer metadata; isolate tenants.
- Least privilege and separate roles: viewer, operator, policy admin, auditor.
- Policy edits and breach dispositions are append-only audit events.
- Show exact chain and checksummed address at high-risk moments.
- Require step-up auth for policy and integration changes.
- Treat public wallet addresses plus labels as sensitive business data.
- Do not train shared models on customer transaction data without opt-in.
- Document data retention and deletion; support regional controls at enterprise.
- External execution integrations require transaction simulation, decoded calls,
  allowlists, spend caps, signer confirmation and an emergency disable path.

## 8. Compliance and risk requirements

- Northstar v1 is analytics/workflow software, not custody or execution.
- Do not market outputs as personalized investment advice.
- “Policy breach” means an organization-configured threshold, not illegality.
- Specialist risk labels show provider, methodology/version and timestamp.
- Preserve Travel Rule/counterparty records only when a regulated customer
  configures an authorized integration.
- Legal review is required before adding transfer, routing, discretionary
  rebalancing, custody, yield optimization or advice features.
- Customer disclosures: crypto assets can lose value; stablecoins can depeg;
  blockchain data can reorganize; prices, labels and decoded calls can be wrong;
  no dashboard guarantees solvency or transaction safety.

## 9. States and resilience

- **Normal:** all material sources fresh; policy-adjusted values available.
- **Volatile:** stress assumptions active; orange scenario banner; base values
  remain visible for comparison.
- **Risk-focused:** only high/medium breaches and affected positions are shown.
- **Empty:** guided address/import actions and sample policy preview.
- **Partial:** missing price/metadata excluded with count and impact.
- **Stale:** source age, affected metrics and last good snapshot shown.
- **Error:** preserve last good data; never replace values with zeros.
- **Offline demo:** all interaction still works from seeded local data.

## 10. Metrics and analytics

North Star: **weekly policy decisions completed with traceable evidence**.

Activation:

- time to first account connected;
- time to first obligation imported;
- time to first scenario;
- % reaching first resolved/accepted breach.

Retention:

- organizations reviewing command center weekly;
- weekly report open/share rate;
- scenarios run before large payment batches;
- breach median time-to-disposition;
- obligation coverage maintained above policy.

Quality:

- source freshness SLA;
- position reconciliation difference;
- unknown/unpriced asset share;
- false/low-value alert dismissal rate;
- decoded-call coverage;
- support incidents involving misleading data.

Business:

- stress-test to qualified workspace conversion;
- partner-sourced pipeline;
- trial-to-paid;
- gross retention and expansion by accounts/seats.

Event names include `account_added`, `obligation_imported`,
`policy_breach_opened`, `breach_dispositioned`, `scenario_run`,
`scenario_saved`, `action_packet_exported`. Analytics must not capture full wallet
addresses or counterparty memo text.

## 11. Packaging and GTM

- Preview: free, two accounts, one scenario.
- Team: hypothesized $349/month, 10 accounts, policies, obligations, alerts,
  report and five seats.
- Control: hypothesized $999/month, unlimited accounts, workflow, audit/API and
  advisor access.
- Enterprise: SSO, private data plane, custom SLA/retention and integrations.

Launch narrative: **“Your treasury is not a balance. It is a set of obligations
under stress.”**

Motion:

1. Free public-address Treasury Stress Test.
2. Founder-led design partners: 20 crypto-native teams.
3. Crypto CFO/accounting partner program.
4. Safe ecosystem templates and content.
5. Publish practical playbooks: payroll coverage, issuer concentration,
   multi-chain operating cash.

## 12. Dependencies, risks and unknowns

Dependencies:

- reliable canonical asset mapping and price provenance;
- Safe/indexer coverage and reorg handling;
- obligation integrations;
- legal classification by jurisdiction;
- credible screening partner for regulated buyers.

Risks:

- false precision in runway;
- users mistaking policy score for asset safety;
- bad token metadata or spoofed symbols;
- incomplete DeFi position decoding;
- alert fatigue;
- public-address privacy leakage;
- category expansion into regulated execution/advice.

Unknowns to validate:

- strongest willingness to pay: protocols vs operating companies vs advisors;
- whether obligations import is sufficient or accounting integration is required
  for activation;
- ideal policy template breadth;
- whether signers will consume a Northstar packet inside Safe or by PDF/link;
- tolerance for a read-only product before execution integrations.

## 13. Post-demo roadmap

1. Production read-only Safe/EVM ingestion and CSV obligations.
2. Reconciliation, evidence drawer and signed weekly snapshot.
3. Accounting/AP integrations and multi-organization advisor workspace.
4. Action packet handoff into Safe proposal creation (still user-signed).
5. Specialist compliance/transaction simulation integrations.
6. Non-EVM, exchanges and fiat accounts.
7. Carefully scoped automated controls only after security audit and legal review.

