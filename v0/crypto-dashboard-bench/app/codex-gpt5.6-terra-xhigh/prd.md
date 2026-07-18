# Clearrail PRD — stablecoin settlement control room

## 1. Product thesis

**Category:** treasury-operations and settlement-risk decision software.

**Promise:** Clearrail gives an operations lead a defensible answer to “Can this stablecoin payment leave on time, through which approved route, with what evidence and owner?” before any external system moves money.

**Positioning:** the decision layer between a company’s wallet/custody, issuer/route information, and existing compliance tooling. It is not a custodian, trading venue, wallet connection, transaction broadcaster, money transmitter, screening provider, or legal/compliance determination engine.

The differentiated loop is **observe → decide → evidence → hand off → learn**. A run starts at payment readiness, compares only policy-eligible routes, makes uncertainty visible, saves a signed-off planning record, then attaches execution events from an external system later.

## 2. Users and decision context

| Role                                       | Primary job                                      | Pain                                                                         | Buying trigger                                                          |
| ------------------------------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Treasury operations lead (primary)         | Get a payment run funded, approved, and on time. | Fragmented balances and evidence; surprise route delays; unclear escalation. | A late settlement or a cross-chain incident forces an executive review. |
| Finance controller (secondary)             | Control risk appetite and explain exceptions.    | Spreadsheet snapshots do not show evidence age, policy version, or owner.    | Audit, board, or risk committee wants a repeatable control.             |
| Compliance operations reviewer (secondary) | Confirm the required review was completed.       | Case status and payment intent are split across systems.                     | A payment corridor expands into a new jurisdiction or partner.          |

**Primary persona:** Ana, a treasury ops lead for a global platform. She must fund $2.4m of vendor payouts on an approved destination rail before a 15:00 UTC cutoff. She needs a route recommendation that distinguishes a fast estimate from finalized delivery and flags stale or missing evidence.

## 3. Scope and non-goals

### In scope for production

- Read-only inventory snapshots from approved custody/wallet sources.
- Policy-aware payment plans: amount, asset, beneficiary, destination, cutoff, route candidates, evidence, reviewer, and status.
- A route comparison that surfaces finality class, fee estimate, expected time, capacity, evidence age, and policy exceptions.
- Evidence-backed readiness queue, incident/exception management, acknowledgment, assignment, and activity log.
- Export/API handoff to the customer’s existing approval/signing/payment tool; later, execution reconciliation.
- Tenant-level policy configuration, RBAC, audit log, and data freshness monitoring.

### Explicit non-goals

- No key custody, signing, transaction broadcast, token swap, bridge execution, or recipient onboarding in v1.
- No investment advice, P&L optimization, “best yield,” or price prediction.
- No guarantee of finality, price, liquidity, transfer completion, sanctions clearance, or legal compliance.
- No replacement for a compliance vendor, law firm, issuer documentation, accounting system, or chain explorer.

## 4. Core workflows and acceptance criteria

### A. Payment readiness → route plan (the demo’s core workflow)

1. Operator sees the next payment run, cutoff, funded amount, and concise exceptions.
2. Operator opens a plan and compares eligible routes using the customer policy.
3. Operator selects a route only after viewing route method, finality class, estimated timing/fee, capacity, and required checks.
4. Operator acknowledges/assigns a non-blocking exception or resolves a blocker externally.
5. Operator saves the plan for review. Clearrail records policy version and evidence snapshot, then hands it to the customer’s approval/signing system.

Acceptance criteria:

- A plan cannot be marked “Ready for approval” when funding, recipient, travel-rule, screening, required approver, or blocking policy evidence is missing/expired.
- Every displayed balance, quote, risk signal, and route status carries source, as-of, and freshness state.
- UI differentiates unavailable, stale, estimated, confirmed, and finalized; it never maps all to “green.”
- Saving preserves an immutable versioned snapshot and creates an audit event; edits create a new version.
- The demo says “seeded scenario” at least once in the primary viewport and performs no wallet or network action.

### B. Exception response

1. A feed or operator creates a route, issuer-evidence, inventory, recipient, or compliance exception.
2. The system calculates policy impact: informational, review, or block.
3. An owner acknowledges, assigns a next step, and records resolution evidence.
4. The readiness queue and plan status re-evaluate against the current policy.

Acceptance criteria:

- An exception always has severity, affected entity, evidence/source, raised time, owner, policy impact, and a reversible/immutable status history.
- Acknowledging does not clear a block; it only records ownership.
- The demo’s stress simulation visibly changes risk state without pretending it came from a live source.

### C. Handoff and reconciliation (post-demo)

1. Approved plan is sent to the configured execution system as a non-executable instruction payload.
2. The execution system returns a reference ID and lifecycle events.
3. Clearrail aligns route legs against plan amount, beneficiary, asset representation, and finality target; an exception is created for mismatch.

## 5. Data, calculations, and entities

### Entity model

`Workspace → LegalEntity → Policy → PaymentPlan → RouteCandidate → RouteLeg → EvidenceItem / RiskSignal / Approval / TransferEvent`.

`WalletAccount` owns `InventorySnapshot` records. An `AssetRepresentation` is `(issuer, token, contract, chain, native/bridged flag)`, never merely “USDC.” `Beneficiary` stores verification and allowed-destination state separately from its address. Every external value records provider, source identifier, observed time, received time, and a data-quality state.

### Freshness and provenance requirements

| Domain                  | Proposed source class                           | Target freshness                                              | UI contract                                                                              |
| ----------------------- | ----------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Inventory               | Custody API, on-chain indexer, wallet export    | 5 minutes for operations; manual import marked at import time | Snapshot timestamp, block/custody reference, source, native units.                       |
| Routes/network          | Protocol/provider API + status feed             | 1 minute while active; 15 minutes in planning                 | Estimated fee/ETA, finality target, provider status, last checked.                       |
| Issuer/reserve evidence | Issuer transparency/public report               | At publisher cadence                                          | Publisher/source date and scope; never a live “reserve score.”                           |
| Counterparty risk       | Customer-selected screening/compliance provider | Per customer policy                                           | Provider, coverage, result time, disposition; “review required” over binary safe/unsafe. |
| Fiat valuation          | Licensed market-data provider                   | 60 seconds when used                                          | Quote source/time/currency; omit if unavailable rather than calculate a stale total.     |

### Calculations

- **Funded amount:** sum of policy-eligible source inventory in the requested asset representation minus committed/outstanding plan reservations; display source snapshot age.
- **Concentration:** source/chain/issuer value ÷ eligible total value, where both values share quote time/currency. Not shown without an aligned valuation.
- **Route readiness:** deterministic policy rules, not an opaque risk score. A route is `Blocked`, `Review`, `Eligible`, or `Unavailable` based on checks; the UI names failing checks.
- **ETA:** a provider estimate/range or historical percentile with evidence; never a guarantee. `Finalized` is a state reported by an integration, not inferred from an elapsed timer.
- **Risk score:** no universal numeric score in v1. Severity is an explainable policy impact: information, review, or block.

## 6. Security, privacy, permissions, and compliance

- Read-only integrations use scoped, tenant-owned credentials stored by an audited secret manager; no private keys, seed phrases, or wallet signatures are requested.
- Roles: Viewer (read), Operator (draft/acknowledge), Controller (policy/approval), Compliance Reviewer (review disposition), Administrator (integrations/RBAC). Enforce least privilege, SSO/SAML, MFA, and SCIM for enterprise.
- Append-only audit events retain actor, role, time, tenant, previous/new state, policy version, and source evidence IDs. Export is access-controlled and watermarked.
- Encrypt in transit and at rest; tenant-isolate records; minimize beneficiary personal data; configurable retention and deletion; no address data used for model training.
- Compliance integrations are advisory workflow inputs. Clearrail must disclose coverage/latency, allow customer policy to determine blocks, and require customer legal/compliance owners to configure jurisdictional rules.
- For virtual-asset transfers, preserve the customer-defined evidence that required originator/beneficiary and travel-rule workflow was completed. Do not claim legal sufficiency.
- Incident response: revoke connector access, preserve audit log, notify tenant admins, and separately investigate compromised data vs. a false signal.

## 7. Onboarding, activation, analytics, and retention

**Onboarding:** choose legal entity and policy template → connect/import read-only inventory → select 1–3 corridors → map owners and cutoff → complete a dry-run plan → invite controller/reviewer.

**Activation event:** a policy-eligible plan with all required evidence is saved for approval within 14 days. Supporting events: first source snapshot, first named owner, first exception assignment, first dry-run export.

**Product metrics:** time from plan creation to ready; % plans with evidence within policy freshness; exception acknowledgment time; late-settlement rate (customer-reported); route plan reuse; weekly active operators; policy override rate; false-positive/false-negative review feedback. Never optimize for “funds moved” because Clearrail does not move funds.

**Retention loop:** next-day readiness brief, weekly corridor evidence digest, exception postmortem, and policy review at scheduled cadence.

## 8. Packaging, launch, and GTM

| Package    | Hypothesis                                                           | Indicative price |
| ---------- | -------------------------------------------------------------------- | ---------------- |
| Team       | 3 corridors, 5 users, manual/read-only imports, basic plan history   | $1,500/month     |
| Operations | Multi-entity, policy workflows, API exports, SSO, 25 users           | $5,000/month     |
| Enterprise | Custom integrations, retention, DPA/security review, premium support | Annual contract  |

Launch as a design-partner program for payment companies and treasury teams with recurring stablecoin settlement, beginning with a **read-only settlement-readiness audit**. Use custodian/issuer/payment-implementation partners for warm introductions. The wedge narrative is operational: “Every payment run gets a decision record before it becomes an incident.” Do not lead with speculative return or universal crypto analytics.

## 9. Risks, dependencies, unknowns, and roadmap

| Risk / dependency                                                     | Mitigation                                                                                                     |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Inconsistent chain, issuer, route, and screening data                 | Contract-level provenance; data-quality states; connector health; customers choose authoritative providers.    |
| Product is mistaken for a transaction executor or compliance approval | Strong labels, read-only integration design, scoped permissions, and sales/legal review.                       |
| Policy logic becomes jurisdiction-specific too early                  | Policy engine has customer-owned controls; start with generic evidence gates, not legal rules.                 |
| Buyer has entrenched spreadsheet workflow                             | Import-first onboarding and exportable decision packet; quantify exceptions and time saved in design partners. |
| Sensitive beneficiary/address data                                    | Data minimization, tenant isolation, RBAC, retention controls, and security review.                            |

**Post-demo roadmap:** 0–3 months: inventory, plans, policies, audit export, daily readiness brief. 3–6 months: execution-status reconciliation, integrations, policy simulator, incident timeline. 6–12 months: multi-entity liquidity forecast, customer-owned scoring, configurable attestations, auditor portal. Execution, custody, and legal advice remain out of scope.
