# Cinder PRD

**Status:** Demo-ready product definition  
**Version:** 0.1  
**Category:** Exposure remediation operations  
**Primary buyer:** CISO / VP Engineering / COO at a 100–1,000-person SaaS company  
**Primary user:** Security program lead or security engineer  
**Demo route:** `/codex-gpt5.6-luna-high`

## Product thesis and positioning

Security tools are good at finding things and work-management tools are good at assigning things. Lean teams still lose time deciding whether a finding is real, whether it is reachable, who should own it, and what proof will close it.

**Cinder turns fragmented security findings into a small, explainable remediation queue.** Each work item is a “remediation brief” containing the affected asset, the business impact, the evidence chain, the owner, a due date, the recommended fix, and the verification proof. Cinder is the neutral decision-and-coordination layer between security telemetry and the engineering/IT workflow already in use.

**Differentiated promise:** “Close the work that changes risk, and show your reasoning.”

**Category wedge:** evidence-backed remediation operations, initially focused on cloud and production SaaS exposures with cross-domain context.

**Positioning statement:** For lean SaaS security teams that have more findings than people, Cinder is the remediation operations layer that ranks risk using business context and reachability, packages the reason into owner-ready work, and preserves proof after the fix. Unlike a scanner dashboard or a generic ticketing queue, Cinder is designed around the decision between finding and verified closure.

## Users, jobs, pains, trigger

### Primary: Maya, security program lead

- **Job to be done:** Every Monday, identify the 3–5 fixes that reduce meaningful exposure, route them to the right team, and report progress with confidence.
- **Pains:** duplicate findings, generic CVSS severity, stale asset ownership, manual Jira tickets, no clean “why this” explanation, weak proof after remediation.
- **Success:** queue is short, decision rationale is visible, work is owned within one business day, verified closure can be shown to leadership or a customer.

### Secondary: platform / application / IT owner

- **Job to be done:** Understand exactly what to change, why now, how to test it, and when it is due.
- **Pains:** vague security tickets, security jargon, unclear blast radius, surprise escalations.
- **Success:** a ticket is executable without another meeting; verification evidence is clear.

### Economic buyer and trigger

The CISO/VP Engineering/COO buys after a customer questionnaire, audit, major cloud migration, or exploited vulnerability exposes that the team cannot prove remediation velocity. The compelling event is not another alert; it is the risk of missing a consequential fix or being unable to demonstrate control.

## Scope

### In scope for v1

- Connectors for Microsoft Defender for Cloud, Wiz/Tenable/Rapid7 exports, GitHub code scanning, and Jira/Linear/ServiceNow handoff.
- Normalized exposure record with source, source URL, asset, environment, owner, data class, criticality, exploitability, evidence freshness, status, and due date.
- Deduplication of repeated signals into one work item with source links.
- Transparent priority model: business criticality + reachability + active exploitation + blast radius + evidence confidence + age/SLA.
- Queue views: assigned to me, all open, needs decision, verified.
- Remediation brief with evidence chain, recommended action, owner, ticket preview, and verification checklist.
- Human-controlled status transitions: triage, ready, in progress, blocked, verified, accepted risk.
- Jira/Linear ticket creation and two-way status sync as the first integration pattern.
- Audit trail and exportable “proof packet” for each verified or accepted item.
- Demo mode with seeded data and no external credentials.

### Non-goals

- A SIEM, endpoint detection product, or incident containment system.
- Autonomous patching, kill switches, or destructive remediation.
- Replacing a scanner’s raw findings or a company’s source-of-truth CMDB.
- A compliance certification engine or a promise of regulatory compliance.
- AI-generated decisions with no evidence, provenance, or human review.

## Core workflows

### 1. Morning risk review

1. Maya opens Overview and sees the open queue, SLA state, risk trend, and data freshness.
2. She filters to “Assigned to me” or “Needs decision.”
3. She opens the highest-priority item and scans the evidence chain.
4. She accepts the suggested owner/due date or changes them.
5. She creates a Jira ticket, copies the brief, or accepts risk with a reason and expiry.

### 2. Owner handoff

1. An owner receives a ticket containing what to fix, why it matters, affected assets, and a verification checklist.
2. Owner changes status to In progress or Blocked and can add a note.
3. Cinder shows the last evidence sync and avoids claiming a fix solely because a ticket was closed.

### 3. Verification and proof

1. Source scan or connector sync reports the exposure is gone.
2. Cinder moves the item to “Ready to verify” and shows the new evidence timestamp.
3. A security reviewer clicks Verify, records the evidence, and closes the item.
4. The weekly trend and proof packet reflect the risk reduction.

## Functional requirements and acceptance criteria

| ID | Requirement | Acceptance criteria |
| --- | --- | --- |
| FR-01 | Normalize findings | Findings from at least two source types map to one shared record shape with stable ID, source, asset, owner, and last-seen timestamp. |
| FR-02 | Explain priority | Each open item shows a 0–100 score plus at least three contributing factors and a plain-language “why now.” |
| FR-03 | Prioritized queue | User can sort/filter by status, owner, severity, source, due date, and “needs decision”; counts update without a page reload. |
| FR-04 | Evidence brief | Detail view shows asset, environment, data class, evidence chain, source links, recommended action, and verification checklist. |
| FR-05 | Handoff | User can preview a ticket and create a simulated Jira ticket; the item visibly records the ticket ID and timestamp. |
| FR-06 | Human review | User can verify, snooze, or accept risk; accept-risk requires reason and expiry in production. Demo shows the decision state. |
| FR-07 | Auditability | Status changes, ownership changes, ticket actions, dismissals, and verification are append-only events with actor/time/source. |
| FR-08 | Demo safety | UI labels demo data and never implies that source integrations are live. No credentials are required. |
| FR-09 | Responsive | At 375×812 there is no horizontal overflow; table becomes stacked cards, nav becomes a compact bar, and detail view becomes a full-screen sheet. |
| FR-10 | Accessible operations | All actions are keyboard reachable, have accessible names, preserve visible focus, and do not rely on color alone. |

## Information and data model

```text
Organization
  └─ Workspace
      ├─ SourceConnection { provider, scopes, lastSyncAt, health }
      ├─ Asset { id, name, type, environment, owner, dataClass, criticality }
      ├─ Exposure { id, normalizedKey, title, source, sourceRef, assetIds,
      │              severity, exploitability, reachability, blastRadius,
      │              score, status, owner, dueAt, evidence, lastSeenAt }
      ├─ WorkItem { exposureId, destination, ticketRef, assignee, dueAt, status }
      └─ AuditEvent { actor, action, objectId, timestamp, metadata }
```

The demo seeds one workspace, four source types, 47 open exposures, and a small queue. Production assumptions: connectors emit source-native IDs; a normalized key deduplicates repeats; ownership is derived from asset tags plus a manual override; source data is immutable once ingested; display state is derived from the latest source evidence plus human decisions.

## Security, privacy, permissions, and trust

- SSO/SAML and SCIM are required before general availability; local demo mode has no authentication.
- Roles: Viewer (read/export), Contributor (assign, comment, create tickets), Reviewer (verify/accept risk), Admin (connectors, policies, roles).
- Connector tokens use least privilege, are encrypted at rest, are never shown after creation, and can be revoked. Jira scopes should be limited to issue create/read/update in mapped projects.
- Tenant isolation is a hard requirement; all objects carry an organization/workspace boundary and server-side authorization checks.
- Sensitive evidence is minimized. Cinder stores pointers and normalized metadata by default; raw logs and secrets stay in the source system.
- Every score records its model version and inputs. Users can see why an item is prioritized and override it with a reason.
- Verification never means “ticket closed.” It requires fresh source evidence or an explicit reviewer assertion with actor/time and optional attachment/link.
- Export and deletion events are audited. Retention policy is configurable; default is 12 months for audit events and source metadata.

## Onboarding, activation, retention, analytics

**Onboarding:** create workspace → choose primary workflow → connect Jira/Linear → connect one security source → confirm asset owners → review first five briefs. The first-run checklist should show data freshness and expected sync scope.

**Activation event:** a team creates its first owner-ready remediation brief and closes/ verifies one item within 14 days.

**Retention loop:** weekly risk review, owner reminders, SLA escalation, evidence-refresh nudges, and a monthly executive proof packet. Cinder should become the durable record of “what changed and why.”

**North-star metric:** verified risk reduction per security-owner hour. Supporting metrics: time to owner, time to verified, percent of high-priority items with fresh evidence, SLA breach rate, duplicate rate, accepted-risk expiry completion, weekly active reviewers, and proof-packet exports. Do not optimize for raw alert count.

**Analytics events:** `workspace_created`, `connector_connected`, `first_sync_completed`, `queue_filter_used`, `brief_opened`, `owner_changed`, `ticket_previewed`, `ticket_created`, `status_changed`, `risk_accepted`, `verification_requested`, `item_verified`, `proof_packet_exported`.

## Packaging and GTM hypothesis

- **Starter:** €1,200/month for one workspace, up to 500 assets, two connectors, Jira/Linear handoff, weekly proof packet.
- **Growth:** €3,500/month for up to 2,500 assets, unlimited source connectors, custom scoring factors, SSO/SCIM, SLA policies, and reviewer workflows.
- **Enterprise:** annual contract with private networking, data residency, custom retention, API/SIEM integrations, and support.

Pricing is a hypothesis to validate with design partners; value is tied to asset/workflow scope rather than number of alerts.

**Launch motion:** founder-led design-partner program with 5–8 SaaS companies, starting from an urgent exploited-vulnerability or audit backlog. Offer a two-week “risk closure sprint”: connect one source and Jira, produce a ranked top-five queue, and report verified reduction. The GTM narrative is “from scanner output to proof of closure in one week.” Content should show the transparent ranking model and a before/after remediation packet, not generic threat dashboards.

## Risks, dependencies, unknowns

- Connector APIs and field semantics vary; start with exports/webhooks and one live source plus Jira.
- “Business criticality” is often stale; require owner confirmation and freshness badges.
- Risk-score disputes can erode trust; log model versions and show factors/overrides.
- Engineers may resist another queue; make tickets the delivery surface and keep briefs concise.
- Verification can be ambiguous; separate ticket status from source evidence and reviewer verification.
- Enterprise security requirements (residency, SSO, private networking) can slow sales; validate with design partners before building.
- Unknown: which source pairing has the strongest activation rate (Defender + Jira, GitHub + Jira, or Wiz + Jira).
- Unknown: whether the primary buyer is security leadership or platform engineering; test both narratives in discovery.

## Post-demo roadmap

1. **Design partner v1:** live Jira integration, CSV/webhook ingestion, evidence model, reviewer roles, and audit export.
2. **v1.5:** GitHub and cloud connectors, owner discovery, Slack/Teams notifications, score override policy, evidence freshness monitors.
3. **v2:** cross-domain attack-path summaries, ServiceNow/Linear bidirectional sync, exception lifecycle, historical trend exports, and API.
4. **Later:** policy-as-code verification hooks, managed remediation playbooks, and executive risk narratives mapped to customer-selected NIST CSF 2.0 outcomes.
