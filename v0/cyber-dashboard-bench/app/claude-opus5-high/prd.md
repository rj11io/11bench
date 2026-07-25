# PRD — Assay

**Detection assurance for security teams. Unverified is not covered.**

Version 1.0 · 25 July 2026 · Owner: product · Status: approved for demo build
Companion documents: [`research.md`](./research.md), [`design.md`](./design.md)

---

## 0. Words this document uses

Defined once, in plain English, so the rest reads without a glossary.

- **SIEM** — the log database with alerting rules on top, where a company decides
  whether something bad is happening.
- **Analytic** (or **detection rule**) — a saved query that raises an alert when
  logs match a pattern.
- **Log source** — something that ships logs into the SIEM: a laptop agent, a cloud
  audit trail, an identity provider.
- **MITRE ATT&CK** — the free public catalogue of attacker behaviours, each with an
  ID like `T1078.004`. Teams treat it as the checklist of things they should spot.
- **MDR** — an outsourced team that watches your alerts for you.
- **Atomic test** — a small, safe, repeatable script that performs one attacker
  behaviour so you can check whether your tools noticed.
- **Assurance state** — Assay's core idea: what we actually know about whether a
  behaviour would be caught, and how recently we checked.

---

## 1. Thesis

Security teams report coverage they cannot prove.

The mechanism is simple. A detection rule exists, so a dashboard counts it, so the
technique turns green, so the board is told "we would catch that". Nobody checks
whether the rule still works. Published analysis of thousands of real rules found
**13% are broken and will never fire**, and separate write-ups put broken-or-unused
at **28%** ([research.md §1](./research.md)). Log sources go silent without an error
message. Most rules are never tested at all.

So the number that gets reported is not wrong by a little. It is a different kind of
statement than everyone believes it is.

**Assay's thesis: a coverage claim is worthless without a date on it.** Every
attacker behaviour a team cares about carries a state that says what is actually
known — verified, decaying, assumed, broken, blind, or formally accepted — plus who
owns it, when it was last proven, and when that proof expires. Nothing is green
because a rule exists. Things are green because something tested them, recently, and
the test is on file.

**Category:** detection assurance — a thin accountability layer above the SIEM, the
MDR and whichever attack-simulation tool is already in place.

**Positioning statement.** For detection engineering leads who are asked "would we
have caught that?", Assay is the ledger that answers with evidence instead of a
heatmap. Unlike detection-posture tools that count rules, and unlike
attack-simulation tools that produce one-off test reports, Assay joins content,
telemetry health, validation evidence and production fidelity into a single dated
state per technique — and turns every gap into owned, expiring work.

**Differentiated promise.** *Every coverage claim in Assay carries an evidence date,
a confidence tier, an owner and an expiry. If it has none of those, Assay calls it
assumed — and assumed is not covered.*

### 1.1 Why this is defensible

1. **The refusal is the product.** Competitors cannot adopt "unverified is not
   covered" without making their own headline number drop, because their number is
   built on rule inventory. That is a genuine incumbent constraint, not a feature gap.
2. **The moat is the ledger, not the rules.** Detection content is commoditising —
   thousands of ATT&CK-mapped rules are freely available
   ([research.md §15](./research.md)). What cannot be imported from a competitor is
   two years of timestamped, signed history of what was tested, when, by whom, with
   what result. Switching cost compounds by itself.
3. **We sit above the money, not in front of it.** Assay never asks a customer to
   replace a SIEM or drop an MDR. It makes both look accountable. That removes the
   hardest objection in security sales.

---

## 2. Users

### 2.1 Primary user — Priya, detection engineering lead

Runs a team of three at a 4,000-person fintech. Owns the SIEM's detection content.
Reports to the head of security operations.

**Jobs to be done**

- Decide what my team works on this week, and defend that choice to my boss.
- Know within the hour when something I rely on has quietly stopped working.
- Prove that a technique is covered, to someone who does not trust me by default.
- Produce the weekly and quarterly report without spending Friday on it.

**Pains, each traceable to research**

| Pain | Evidence |
| --- | --- |
| My coverage number is a guess and I know it | 13% of rules broken; 79% of techniques uncovered ([§1](./research.md)) |
| Rules break silently and I find out during an incident | Log sources stop feeding with no visible error ([§5](./research.md)) |
| I track false-positive rates but never get to fix them | 59% track, 14% prioritise — a 45-point gap ([§10](./research.md)) |
| Reporting is manual and I hate it | 41% of detection engineers name reporting the worst part of the job ([§10](./research.md)) |
| Cloud and identity are my worst gaps and hardest to test | 43% name cloud-native their number one gap ([§10](./research.md)) |

**What success looks like to Priya:** she opens Assay on Monday, sees a ranked
queue she agrees with, and can explain any item's rank in one sentence.

### 2.2 Secondary users

**Marcus, head of security operations (economic buyer).** Signs the contract.
Personally exposed under NIS2 Article 20 and DORA, both of which put named
accountability on management ([§10](./research.md)). Needs one page he can take to
the board that will not fall apart under a follow-up question. Lives in the Report
tab and the accepted-gap register, not the queue.

**Sam, SOC analyst (influencer, not buyer).** Wants to know, mid-incident, whether
the silence they are seeing means "nothing happened" or "we are blind here". Uses
one thing: the technique lookup and its telemetry state. Never files a finding.

**Dana, internal audit / GRC (gatekeeper).** Needs evidence that failures of
critical security controls get detected and addressed — the substance of PCI DSS
v4.0 requirement 10.7 ([§10](./research.md)). Read-only. Cares only that the trail
is complete, immutable and attributable.

**The MDR account team (external, read-limited).** Where a customer outsources
detection, Assay is where the two parties agree what is actually covered. This is
scoped as roadmap, not v1.

### 2.3 Buying trigger

Three events open the budget, and all three are answered by the same ledger:

1. **A headline breach in their sector.** The board asks "would we have caught
   that?" and the honest answer today is "probably, we think".
2. **An audit finding.** PCI DSS 10.7.2 requires that failures of critical security
   control systems are detected, alerted and promptly addressed. A team with 13% of
   rules broken and no record of noticing has no answer.
3. **A regulatory deadline with a name attached.** NIS2 transposition and DORA
   enforcement make a specific executive personally accountable, and auditors want a
   governance trail rather than a program that lives inside IT.

**The demo's opening state dramatises trigger 1 deliberately**: identity telemetry
silent for six days, taking eight techniques — including the top-ranked one — down
with it.

---

## 3. Scope

### 3.1 In scope for v1

1. **Assurance ledger** — one derived state per technique in the customer's scoped
   landscape, computed from four independent inputs, with full derivation visible.
2. **Assurance queue** — the ranked work list, with an explainable score and bulk
   actions.
3. **Evidence drawer** — per-finding proof: the analytic, its log-source health, the
   validation history, and production fidelity.
4. **Three decisions** — assign a fix, run a validation, or formally accept the gap
   with an approver and an expiry.
5. **Coverage map** — the technique landscape by tactic, coloured by assurance
   state, never by rule count.
6. **Assurance service level** — a user-set target plus a burn-down of the
   remaining budget.
7. **Scenario replay** — "would we have caught this?" answered per step across a
   published attack chain.
8. **Report and audit** — a generated assurance report, the accepted-gap register
   with expiries, and an append-only audit log.
9. **Roles and permissions** — engineer, manager, auditor, with requester ≠ approver
   enforced on accepted gaps.

### 3.2 Explicit non-goals

Written as refusals, because each one is a thing a reviewer will ask for.

| Non-goal | Why |
| --- | --- |
| **We do not detect anything.** No log ingestion, no rule execution, no alerting. | Assay reasons about other systems' evidence. The moment it detects, it becomes a SIEM competitor and inherits every objection. |
| **We do not write detections for you.** | That is CardinalOps' and SnapAttack's business, and detection content is commoditising anyway ([§15](./research.md)). We link out to the repo. |
| **We do not run attacks.** | We orchestrate and record what the customer's existing attack-simulation tool or purple team runs. Owning the exploit path adds risk, procurement friction and a security review we do not need. |
| **No alert queue and no case management.** | Crowded and adjacent ([§6](./research.md)). We connect a gap to a ticket in the customer's tracker and stop there. |
| **No risk quantification in currency.** | Requires loss assumptions we cannot defend, and produces exactly the uncheckable number this product exists to reject ([§16](./research.md)). |
| **No machine-learned priority score in v1.** | Analysts distrust opaque verdicts and re-do the work by hand ([§7](./research.md)). Arithmetic we can explain beats a model we cannot. |
| **No mobile authoring.** | Read, triage and acknowledge on a phone. Accepting a gap or approving one requires a desktop session. |

---

## 4. The assurance model

This section is the product. Everything else is a view onto it.

### 4.1 Four independent inputs

Each input can fail on its own, and each failure means something different. The
structure follows ATT&CK v18's chain — technique → detection strategy → analytic →
log source → data component ([§3](./research.md)).

| Input | Question | Source | Failure looks like |
| --- | --- | --- | --- |
| **Content** | Is there a mapped, enabled analytic? | SIEM rule export, detection-as-code repository | No analytic; analytic disabled; mapped to the wrong technique |
| **Telemetry** | Are the log sources it depends on alive, parsing and complete? | Ingest health API, heartbeat events | Source silent past its heartbeat window; parse errors; field missing from schema |
| **Validation** | Did a test actually produce the alert, and when? | Atomic test runner, attack-simulation tool, purple-team record | Never tested; last test older than the freshness window; test produced a log but no alert |
| **Fidelity** | When it fires for real, is it useful? | Case outcomes from the SIEM or ticketing | High fire count with near-zero true positives; enabled but never fired at all |

### 4.2 Six assurance states

Ordered by what is actually known. Each has a glyph so the interface never relies on
colour alone ([§13](./research.md)).

| State | Glyph | Means | Counts as covered? |
| --- | --- | --- | --- |
| **Verified** | `✓` | Content healthy, telemetry flowing, validation passed inside the freshness window, fidelity acceptable | **Yes** |
| **Decaying** | `◗` | Was verified; the validation is now past its freshness window | **No** — reported separately, not folded into verified |
| **Assumed** | `○` | Content exists and telemetry looks fine, but nothing has ever tested it | **No.** This is the state most tools miscount as coverage |
| **Broken** | `✕` | Content exists but a hard dependency has failed | **No** |
| **Blind** | `⋯` | No mapped content at all | **No** |
| **Accepted** | `▣` | A named person accepted the gap, with a reason, an expiry and a second approver | **No** — but it is *decided*, which is the point |

Two rules make the model honest:

- **Decaying is never rounded up to verified.** A test from four months ago is not
  the same claim as a test from Tuesday.
- **Accepted expires.** Maximum 90 days. On expiry the finding reverts to its
  underlying state and re-enters the queue automatically. A permanent exception is
  not a decision, it is a way of hiding.

### 4.3 Freshness and decay

Each technique tier carries a freshness window: **tier 1 → 30 days, tier 2 → 60,
tier 3 → 90**. Confidence declines linearly from 1.0 at the moment of validation to
0 at twice the window, and the interface shows the age in days on every verified
and decaying state. Age is a fact, so it is never hidden behind a hover.

### 4.4 Priority: arithmetic, not a model

```
priority = threatWeight × blastRadius × assuranceDeficit × effortFactor × 100
```

| Term | Range | Where it comes from |
| --- | --- | --- |
| `threatWeight` | 0–1 | Threat-intelligence ranking for the technique. In the demo, Red Canary's published 2025 top-ten ranking ([§11](./research.md)), cited on screen. |
| `blastRadius` | 0–1 | Share of the customer's crown-jewel asset groups the technique touches. |
| `assuranceDeficit` | 0–1 | 0 verified · 0.3–0.7 decaying, scaled by staleness · 0.75 assumed · 0.9 broken · 1.0 blind. |
| `effortFactor` | 0.6–1.3 | Inverse of estimated fix cost by class, so cheap wins float up. |

**Acceptance criterion:** every finding must expose a panel listing each term, its
value, its source, and its contribution in points, and the four contributions must
sum to the displayed score. A user who disagrees with a rank must be able to point
at the specific term they dispute ([§7](./research.md)).

### 4.5 Assurance service level

The single headline commitment, modelled on error budgets from reliability
engineering ([§8](./research.md)).

- **Objective:** *at least N% of tier-1 techniques verified within their freshness
  window.* Default 85%, user-editable, persisted.
- **Budget:** the allowed shortfall. At an 85% target across 40 tier-1 techniques,
  six may be unverified.
- **Burn-down:** the chart shows verified share against the target line over 12
  weeks, so the team sees whether they are gaining or losing ground.
- **Why a target and not 100%:** practitioners explicitly recommend rejecting 100%
  in favour of deep validated coverage at the choke points that matter
  ([§4](./research.md)). A target you can hit is a target you will argue about
  honestly.

---

## 5. Core workflows

### W1 — Monday triage *(primary, and what the demo leads with)*

1. Priya opens Assay. A banner states any open assurance incident — in the seeded
   demo, identity telemetry silent 6 days, 9 analytics affected, 8 techniques
   downgraded. The banner picks the incident with the widest blast radius, not
   simply the oldest one.
2. Four tiles read: verified coverage (38%), the assurance gap (46 points: 84%
   claimed against 38% verified), broken dependencies (15 analytics, 3 silent log
   sources), and budget remaining (exhausted, 10 over).
3. The queue is ranked by priority. She filters to tier 1.
4. She opens the top finding. The drawer shows four evidence panels and the score
   derivation.
5. She assigns it — owner, due date, fix class — or runs a validation, or accepts it.
6. Tiles, chart, map and audit log all update. The finding leaves the open queue.

**Acceptance:** from a cold load, a first decision is reachable in **under four
interactions** (open finding → choose action → confirm).

### W2 — Silent-telemetry response

1. The incident banner names the silent source and its blast radius.
2. One click opens the affected findings as a filtered set.
3. Every affected analytic shows `broken`, with the specific reason: source silent
   since a stated timestamp, past its expected heartbeat interval.
4. Priya restores the telemetry once, and one action clears all eight findings
   rather than being filed eight times.
5. **The honest part:** the eight techniques do not become verified. They become
   *decaying*, because their last passing test is still weeks old. Fixing the pipe
   does not re-prove the detection, and Assay refuses to pretend it does.

**Acceptance:** a single telemetry fix resolves every finding whose only failing
input was that source, and the audit log records one action with its full fan-out.

### W3 — Validate and record

1. From a finding, Priya runs a validation: method, atomic test ID, target scope.
2. Assay records who ran it, when, against what, and grades the result on four
   steps: **alerted → detected → logged only → missed**.
3. `alerted` sets verified and starts the freshness clock. `logged only` is *not* a
   pass — the telemetry exists but no alert fired, which is a different defect and
   keeps the state at broken with that reason.
4. The evidence record is immutable and appears in the report.

**Acceptance:** the result grade determines the resulting state deterministically,
the mapping is visible in the interface, and no path exists to mark something
verified without a validation record.

### W4 — Accept a gap, properly

1. Priya requests acceptance: reason from a controlled list (compensating control
   in place · telemetry not available · not applicable to our estate · accepted
   business risk · vendor limitation), free-text justification, expiry date up to
   90 days.
2. Assay blocks self-approval. A different person with the manager role approves.
3. The accepted gap lands in the register with both names, both timestamps, the
   reason and the expiry.
4. On expiry it reverts to its underlying state and re-enters the queue.

**Acceptance:** requester ≠ approver is enforced in the interface and in the audit
record; an auditor role can never approve or request, only read; and no accepted gap
can be created without a reason, a justification and an expiry.

### W5 — "Would we have caught it?"

1. Marcus picks a published attack chain — an identity-led cloud intrusion, a
   ransomware precursor chain, a business-email-compromise chain.
2. Assay renders it as an ordered strip, one cell per step, each carrying that
   technique's live assurance state.
3. The verdict is stated in words, not a score: *"Steps 1 and 4 are verified. Step 2
   is broken — identity telemetry silent. Steps 3 and 5 have never been tested. We
   would likely have seen the entry and the exfiltration attempt, and missed the
   middle."*
4. Any step opens its finding.

**Acceptance:** the chain reflects current state — fixing a step's finding changes
the verdict text without a reload — and the verdict never claims certainty the
underlying evidence does not support.

### W6 — Report out

1. The Report tab generates the current assurance report: service level status,
   what changed this period, the accepted-gap register, what expires next, and the
   full audit trail.
2. It is copy-ready and shows its own generation timestamp and scope.
3. The auditor role sees the same document, read-only.

**Acceptance:** the report contains no number that is not derivable from the ledger
on screen, and it always states the scope and the generation time.

---

## 6. Functional requirements

Each is testable against the demo.

**Ledger and states**

- FR-1 Every technique in scope resolves to exactly one of six assurance states.
- FR-2 The state derivation is visible per finding, input by input, with the reason
  a failing input failed.
- FR-3 Verified and decaying states always display the age of their evidence in days.
- FR-4 Decaying is never counted as verified in any figure anywhere.
- FR-5 Claimed coverage and verified coverage are always shown together; their
  difference is labelled the assurance gap.

**Queue and prioritisation**

- FR-6 The queue ranks by the §4.4 formula and shows the score.
- FR-7 Every score expands into its four terms with values, sources and the
  running product after each term, ending at the displayed score, with the full
  multiplication chain printed so the arithmetic can be checked.
- FR-8 Filters cover tier, state, tactic, platform, owner and text search;
  selections persist across reloads.
- FR-9 The queue is fully keyboard operable: arrows move, `Enter` opens, `Escape`
  closes, `⌘K`/`Ctrl+K` opens the command palette.
- FR-10 Multi-select supports bulk assign and bulk validate, and writes one audit
  entry per affected finding.

**Evidence**

- FR-11 Each finding shows its analytics with ID, repository path, enabled state,
  platform and source system.
- FR-12 Each analytic shows its log-source dependencies with status, last event
  time, expected heartbeat interval, parse error rate and a 14-day volume trend.
- FR-13 Each finding shows its validation history: method, test ID, operator,
  timestamp, graded result.
- FR-14 Each analytic shows 30-day fires, true and false positive counts, and a
  computed precision, or states plainly that it has never fired.

**Decisions**

- FR-15 Assign captures owner, due date and fix class, and moves the finding to
  assigned.
- FR-16 Validate records a graded result that deterministically sets the resulting
  state.
- FR-17 Accept requires reason, justification, expiry ≤ 90 days, and an approver who
  is not the requester.
- FR-18 Resolving a telemetry fix updates every dependent finding in one action.
- FR-19 Every state-changing action writes an append-only audit entry with actor,
  role, timestamp, target and detail.

**Permissions**

- FR-20 Three roles. **Engineer:** assign, validate, request acceptance.
  **Manager:** all of that plus approve acceptance and edit the service level.
  **Auditor:** read everything, change nothing.
- FR-21 Controls a role cannot use are visibly disabled with the reason stated, not
  hidden — so a user learns the model instead of wondering where the button went.

**Reporting**

- FR-22 The accepted-gap register lists every acceptance with both names, reason,
  justification and expiry, and flags anything expiring within 14 days.
- FR-23 The audit log is filterable by actor and action and is never editable.
- FR-24 The report states its scope and generation time.

**Honesty**

- FR-25 Every screen carries a persistent demo notice. No integration is described
  as connected. Every connector is labelled a fixture.
- FR-26 No figure is displayed without the state basis it was computed from being
  reachable in at most two clicks.

---

## 7. Information and data model

Entities and the fields that matter. Types are the shape the demo actually
implements.

```
Technique       id (T####[.###]) · name · tacticId · tier 1|2|3 · platforms[]
                threatWeight 0–1 · threatRank? · threatSource
                assetGroups[] · strategyIds[]
DetectionStrategy  id (DET####) · name · techniqueId · analyticIds[]
Analytic        id (AN####) · title · strategyId · techniqueIds[] · platform
                enabled · sourceSystem (siem-native|sigma|mdr)
                repoPath · logSourceIds[] · dataComponents[] (DC####)
                missingFields[] · fires30d · truePositives30d
                falsePositives30d · lastFiredAt
LogSource       id · name · vendor · kind (identity|endpoint|cloud-audit|
                network|email|saas) · status (healthy|degraded|silent)
                lastEventAt · expectedIntervalMin · parseErrorRate
                volume14d[] · owner
Validation      id · techniqueId · analyticId · method (atomic|bas|purple|manual)
                testId · operator · ranAt · result (alerted|detected|
                logged-only|missed) · evidenceRef · notes
Finding         id · techniqueId · derivedState · status (open|assigned|
                validating|accepted|resolved) · priority · terms[]
                owner? · dueAt? · fixClass · blockedBy? (logSourceId)
                history[]
Acceptance      findingId · reason (enum) · justification · requestedBy
                requestedAt · approvedBy · approvedAt · expiresAt
AuditEvent      id · at · actor · role · action · targetType · targetId · detail
Scenario        id · name · sourceLabel · sourceUrl · steps[{techniqueId, label}]
ServiceLevel    scope (tier-1) · targetPct · windowDays · history[]
```

**Derived, never stored:** assurance state, priority score, coverage percentages,
budget remaining. All recomputed from inputs so the ledger cannot drift from its
evidence.

### 7.1 Integration assumptions

Stated as assumptions because none were verified against vendor documentation
([research.md §17](./research.md)).

| Connector | We read | We write | Assumption |
| --- | --- | --- | --- |
| Splunk ES / Sentinel / Google SecOps / CrowdStrike | Rule inventory, ATT&CK mappings, enabled state, fire counts | Nothing | Rule metadata and search-time fire counts are available over API without needing raw log access |
| Detection-as-code repository (Git) | Rule files, ATT&CK mappings, commit history | Nothing | Rules are in version control with parseable front-matter, per the detection-as-code norm |
| Ingest health | Per-source event counts, last event time, parse error rates | Nothing | Health telemetry is queryable per source; where it is not, we fall back to a summary heartbeat event |
| Attack simulation (Picus, SafeBreach, AttackIQ, Cymulate) | Test runs, technique mapping, results | Trigger a run | Results are retrievable with a technique mapping and timestamp |
| Atomic Red Team runner | Test catalogue and results | Trigger a test | Customer-operated runner; we never execute on customer hosts ourselves |
| Ticketing (Jira, ServiceNow, Linear) | Ticket status | Create and link a ticket | Standard issue-creation API |
| Identity provider (SSO/SCIM) | Users, groups, role mapping | Nothing | SAML or OIDC with group claims |

**Read-only by default is a product decision, not a limitation.** Assay asks for no
write access to the SIEM and no access to raw logs. It is a governance layer, and
the smallest possible permission footprint is what gets it through a security review.

---

## 8. Security, privacy, permissions, auditability, trust

### 8.1 Data handling

- **Never ingest raw logs or event bodies.** Assay stores rule metadata, log-source
  health counters, validation results and decisions. Cardholder data, personal data
  and message contents never enter the system, which keeps it out of PCI and most
  data-residency scope.
- **Per-tenant isolation** with tenant-scoped keys; encryption in transit and at
  rest.
- **Credentials** for connectors are stored in a managed secrets service, scoped to
  the minimum read permission, and rotatable by the customer without support
  involvement.
- **Retention:** decisions, validation evidence and the audit log are retained for
  seven years by default because they are audit artefacts. Health counters roll up
  after 13 months.

### 8.2 Permissions

Three roles in v1, mapped from the identity provider's groups. Least privilege, and
the separation of duties on acceptance is the load-bearing part:

| Capability | Engineer | Manager | Auditor |
| --- | --- | --- | --- |
| View ledger, evidence, report | ✓ | ✓ | ✓ |
| Assign a fix | ✓ | ✓ | — |
| Record a validation | ✓ | ✓ | — |
| Request acceptance | ✓ | ✓ | — |
| **Approve acceptance** | — | ✓ (and never own request) | — |
| Edit the service level | — | ✓ | — |
| Export the report | ✓ | ✓ | ✓ |

### 8.3 Auditability

- **Append-only.** No edit, no delete. A correction is a new entry that references
  the one it supersedes.
- Every entry records actor, role, timestamp, action, target and detail.
- Production adds a hash chain so the log is tamper-evident. *The demo does not
  simulate hashing — it would be a claim without substance.*
- The audit log is exportable and is the primary artefact for PCI DSS 10.7 and
  NIS2/DORA evidence requests.

### 8.4 Trust requirements

These exist because §7 of the research says analysts abandon tools whose verdicts
they cannot check.

- **No unexplainable numbers.** Every score, percentage and state derives from
  inputs reachable within two clicks.
- **Uncertainty is displayed, not smoothed.** "Never validated" and "silent, could
  be fine" are shown as themselves. No confidence interval is invented.
- **Sources are cited in-product.** Threat weight names the ranking it came from.
- **Staleness is visible by default.** Age in days, on the state, always.
- **Absence is visible.** A technique with no analytic renders as a distinct state
  with a hatch pattern, not as an empty cell that reads as fine.

---

## 9. Onboarding, activation, retention

### 9.1 Onboarding — the first 30 minutes

The activation moment is a number that makes the customer wince. Nothing else in
the first session matters.

1. **Connect one SIEM, read-only** (5 min). SSO, one API token, minimum scope.
2. **Import rules and map to ATT&CK** (10 min, automatic). We read what exists;
   nothing is authored.
3. **Scope the landscape** (5 min). Pick a tier-1 set: the published top-20
   techniques for your sector, or your own list.
4. **Connect ingest health** (5 min). This is the step that produces the surprise.
5. **See the assurance gap** (immediate). *"You claim coverage on 62 techniques.
   Nine have never been tested. Four are broken right now. One log source has been
   silent for six days."*
6. **Set a service level** (2 min). Default 85% of tier 1 within 30 days.

**Activation is defined as:** service level set **and** one decision recorded
(assign, validate or accept) within the first session. Everything in the onboarding
flow is instrumented against that single definition.

### 9.2 Retention mechanics

Three loops, each tied to something in the research:

1. **Weekly (the engineer).** Freshness decay guarantees new work every week
   without any new threat appearing. The queue refills on its own, which is unusual
   and is the point — it is a maintenance product, so a quiet week is still a week
   with work in it.
2. **Weekly (the manager).** The generated report replaces the manual one that 41%
   of engineers say they hate most. Once the report ships from Assay, leaving means
   going back to building it by hand.
3. **Quarterly (the auditor).** The accepted-gap register and audit trail become the
   evidence pack for PCI, NIS2 or DORA. Audit dependency is the stickiest retention
   there is.

**Anti-pattern we design against:** a product that only surfaces bad news gets
closed. So the report leads with *what improved this period*, and the burn-down
chart shows progress against the target rather than distance from perfection.

### 9.3 Success metrics

| Layer | Metric | Target |
| --- | --- | --- |
| Activation | Service level set + first decision in session 1 | 60% of started onboardings |
| Activation | Time to first assurance gap shown | < 30 min |
| Engagement | Weekly active detection engineers per tenant | ≥ 2 |
| Engagement | Findings decided per week | ≥ 8 |
| **Core outcome** | **Verified coverage of tier 1, day 0 → day 90** | **+25 percentage points** |
| Core outcome | Median age of validation evidence on tier 1 | < 30 days |
| Core outcome | Median time from telemetry going silent to a fix being assigned | < 24 hours |
| Governance | Accepted gaps with an approver ≠ requester | 100% |
| Governance | Accepted gaps past expiry and unreviewed | 0 |
| Commercial | Report shared outside the security team, monthly | ≥ 1 per tenant |
| Commercial | Net revenue retention | ≥ 120% |

**The metric we refuse to report:** raw claimed coverage percentage. Making that
number go up is the behaviour this product exists to stop rewarding.

### 9.4 Analytics plan

Event taxonomy: `finding_opened`, `derivation_expanded`, `score_explained`,
`fix_assigned`, `validation_recorded`, `acceptance_requested`,
`acceptance_approved`, `acceptance_expired`, `scenario_viewed`,
`report_generated`, `report_shared`, `sl_edited`, `filter_applied`,
`density_changed`, `role_switched`.

Each carries tenant, role, technique tier and elapsed-time-in-session. Two funnels
matter: **connect → gap shown → service level set → first decision**, and
**finding opened → derivation expanded → decision recorded**. The second is the
trust funnel: if people decide without expanding the derivation, either they trust
us or they have stopped reading, and cohort retention tells us which.

---

## 10. Packaging and pricing hypothesis

Hybrid, matching where enterprise renewals are landing ([§15](./research.md)), and
deliberately **not** priced on log volume — customers already resent volume pricing
from their SIEM, and charging by volume would punish the exact behaviour we want.

| | **Assess** | **Assure** | **Assure+Governance** |
| --- | --- | --- | --- |
| Price | Free, 14 days | **$3,000/mo** billed annually | **$7,500/mo** billed annually |
| Scope | 1 SIEM, 25 techniques | 2 connectors, 100 techniques under assurance | Unlimited connectors, 300 techniques |
| Ledger and queue | Read-only | Full | Full |
| Validation orchestration | — | ✓ | ✓ |
| Service level and burn-down | — | ✓ | ✓ |
| Scenario replay | 1 sample | ✓ | ✓ |
| Accepted-gap governance | — | Basic | Approval chains, expiry escalation, custom reasons |
| Audit export, hash chain | — | ✓ | ✓ + SIEM-forwarded audit stream |
| Auditor seats | — | 2 | Unlimited |
| MDR shared view | — | — | ✓ (roadmap) |

- **Value metric: techniques under assurance.** It grows with the customer's
  ambition, it is countable, it is what the customer is buying, and it cannot be
  gamed by sending fewer logs.
- **Seats are unlimited for read.** Nothing should stop an analyst checking whether
  we are blind mid-incident. Charging for that would be indefensible.
- **Anchor:** at $3,000/month this is roughly 1% of an average $3.4M mid-market
  security budget ([§10](./research.md)) and a small fraction of the SIEM line it
  makes accountable. It is priced as insurance on existing spend, not as a new
  platform.

---

## 11. Go-to-market

### 11.1 The narrative

> Your dashboard says you are covered. It is counting rules.
>
> One rule in eight never fires. Log sources go quiet with no error. Most rules have
> never been tested. So the green square does not mean "we would catch this" — it
> means "someone wrote something, once".
>
> Assay puts a date on every claim. Verified means tested, recently, with the
> evidence on file. Anything else says what it actually is: assumed, decaying,
> broken, blind, or accepted by a named person until a named date.
>
> When your board asks "would we have caught that?", you answer with a trail.

### 11.2 Launch motion

**Phase 1 — the free assessment (weeks 0–12).** One connector, read-only, 30
minutes, one output: your assurance gap. This is the entire top of funnel. It works
because the number is surprising and it is *their* number. Target eight design
partners: mid-market fintech, healthcare and SaaS, all running their own SIEM
alongside an MDR.

**Phase 2 — practitioner-led distribution (weeks 4–24).** The buyer is a
practitioner who reads practitioners, so we publish rather than advertise:

- An open **assurance state model** specification — the six states and the
  freshness rules — released publicly so it can be adopted without buying anything.
  Category definition beats feature marketing when you are defining the category.
- A quarterly **State of Detection Assurance** report from aggregated, anonymised
  tenant data: what share of claimed coverage is assumed, which techniques decay
  fastest, how long silent sources stay silent. This is the same playbook CardinalOps
  and Anvilogic used to define their categories ([§10](./research.md)), and it
  produces a number only we can publish.
- Conference talks aimed at detection engineers, not buyers.

**Phase 3 — the compliance handshake (month 6+).** Map the ledger to PCI DSS 10.7,
NIS2 Article 20 and NIST CSF 2.0 DE.CM, and get in front of auditors and
assessors. When an assessor starts asking for this evidence shape, the sale
inverts — the customer arrives asking for us.

**Phase 4 — MDR channel (month 9+).** Transparent MDR providers can offer Assay as
proof of what they cover. Their differentiation becomes our distribution.

### 11.3 Land and expand

Land on the tier-1 technique set for one SIEM. Expand along four axes, in the order
customers actually walk them: more techniques → a second SIEM or data lake → the MDR
relationship → the auditor's evidence pack. Each step raises techniques under
assurance, so pricing and value expand together without a renegotiation.

### 11.4 Competitive answers

| They say | We say |
| --- | --- |
| "CardinalOps already shows ATT&CK coverage." | They count content. We refuse to count content as coverage. Run both — we will grade what they generate. |
| "Our attack-simulation tool already validates." | It produces a point-in-time report. We hold the standing ledger, and we notice when the result goes stale or the log source dies between runs. |
| "Splunk/Cisco will build this." | They cannot lead with "unverified is not covered" — their own headline number depends on the old definition. |
| "Our MDR handles detection." | Then ask them for a dated list of what they verified last month. The accountability under NIS2 is still yours. |
| "We can build this internally." | Some teams will — it is a spreadsheet for the first quarter. It stops being one at the second SIEM, the first audit, and the first person who leaves. |

---

## 12. Risks, dependencies, unknowns

### 12.1 Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| **The honest number is too ugly to look at.** A team shown "9% verified" may reject the tool rather than the situation. | **High** | Frame as a starting line, not a grade. Default the service level to something reachable. Lead the report with what improved. This is the single riskiest assumption and design-partner question one. |
| Buyer says "this is a spreadsheet". | High | True for one quarter and one SIEM. The wedge is decay, fan-out and separation of duties — all of which break a spreadsheet fast. Show the expiry mechanic in the first demo. |
| Validation coverage is thin — many techniques have no safe automated test. | High | Support manual and purple-team evidence as first-class, not as a fallback. A dated human attestation beats an undated assumption. Never claim automation we do not have. |
| Incumbents add a "validated" badge. | Medium | Likely, and partly good — it validates the category. Our defence is the ledger's accumulated history and the separation-of-duties governance, neither of which is a badge. |
| Assumed-state findings overwhelm the queue at onboarding. | Medium | Scope tier 1 first, cap the initial queue, and rank by the priority formula so the top of the list is always defensible. |
| Accept-a-gap becomes a rubber stamp. | Medium | Hard 90-day cap, no self-approval, expiry escalation to the manager, and a report metric that counts acceptances as a governance signal — so an accepting culture is visible. |
| Connector maintenance becomes the whole roadmap. | Medium | Ship a documented generic import (CSV and JSON) on day one so a customer is never blocked on our connector queue. |

### 12.2 Dependencies

- **ATT&CK v18 adoption.** The model is built on Detection Strategies and Analytics,
  which shipped October 2025 and is still being adopted by tools. Fallback: map at
  technique level, which every tool already supports.
- **SIEM API access to rule metadata and fire counts.** Assumed, not verified.
- **Per-source ingest health telemetry.** Available in the major platforms; depth
  varies. Fallback: summary heartbeat events.
- **Customer-operated attack simulation.** We orchestrate, we never execute.
- **Identity provider group claims** for role mapping.

### 12.3 Open unknowns

1. Will teams accept a service level on assurance, or is any published target a
   political liability? *(Design-partner question one.)*
2. What is the natural freshness window? 30 days for tier 1 is an assumption, not a
   finding. Real decay curves come from tenant data.
3. Who signs — the detection lead with a tools budget, or the head of operations?
   Changes price point and sales cycle.
4. Does the MDR channel work, or do providers see transparency as a threat?
5. Does the report actually reach the board, or stop at the operations manager?

---

## 13. Roadmap after the demo

**Now — the demo in this folder.** The ledger, queue, evidence, three decisions,
coverage map, service level, scenario replay, report, audit trail, three roles. All
data is seeded fixtures.

**Quarter 1 — earn the first number.** One connector each for Splunk ES and
Microsoft Sentinel, read-only. Git import for detection-as-code. Ingest health for
both. Generic CSV/JSON import. Eight design partners on the free assessment. Ship
the open assurance state model specification. *Exit criterion: five partners have
seen their own assurance gap and three have set a service level.*

**Quarter 2 — close the loop.** Atomic Red Team runner integration and one
commercial simulation vendor. Jira and ServiceNow ticket creation. Scheduled
validation with automatic decay alerts. Acceptance approval chains. First paid
conversions. *Exit criterion: a partner's verified coverage rises 15 points from
work Assay queued.*

**Quarter 3 — make it the record.** Hash-chained audit export and SIEM-forwarded
audit stream. PCI DSS 10.7, NIS2 Article 20 and NIST CSF 2.0 DE.CM control mappings.
Scheduled board reporting. SSO/SCIM with custom roles. First quarterly State of
Detection Assurance report.

**Quarter 4 — widen the frame.** Second data-lake connector. MDR shared view with
scoped external access. Detection fidelity trending with tuning recommendations that
cite their own evidence. Sector-specific tier-1 technique templates.

**Deliberately later, and why:** anything that authors detections (we would become
a content vendor competing with commoditised free rules), anything that runs
attacks (procurement and blast-radius risk we do not need), and anything
machine-learned in the priority score until the arithmetic version has earned enough
trust to be worth replacing.

---

## 14. Acceptance criteria for this demo build

The demo is done when all of these hold. Each maps to a functional requirement.

1. Every technique resolves to one of six states, and the derivation is visible
   input by input with failure reasons. *(FR-1, FR-2)*
2. Verified coverage and claimed coverage are shown together and the gap is
   labelled. Decaying is never counted as verified. *(FR-4, FR-5)*
3. Every priority score expands into four terms and a running product that ends
   at the displayed score, with the multiplication chain shown. *(FR-7)*
4. All three decisions work end to end and change downstream state: tiles, chart,
   map, scenario verdict, register, audit log. *(FR-15 to FR-19)*
5. Accepting a gap requires reason, justification and expiry, and blocks
   self-approval. Switching to the auditor role disables every write control with
   the reason stated. *(FR-17, FR-20, FR-21)*
6. A single telemetry fix resolves every finding blocked only by that source, in one
   action, with the fan-out audited. *(FR-18)*
7. Decisions, filters, density, role and service level survive a page reload.
8. Empty, normal and high-attention states are all reachable: a cleared queue, the
   ordinary ranked queue, and the seeded silent-telemetry incident.
9. Every screen states it is demo data, and every connector is labelled a fixture.
   *(FR-25)*
10. The layout works at 1440×900 and at 375×812 with no horizontal overflow, the
    queue is keyboard operable, and the route logs no console errors.
