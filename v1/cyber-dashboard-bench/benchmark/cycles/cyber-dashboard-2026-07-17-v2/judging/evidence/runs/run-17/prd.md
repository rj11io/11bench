# PRD: Chokepoint

## Product thesis

Chokepoint is a **campaign-based exposure operations workspace** for lean security teams at cloud-native companies. It converts fragmented findings from cloud, identity, and vulnerability tools into a small set of prioritized remediation campaigns that break the attack paths most likely to impact critical services.

### Category

Exposure management with a narrow focus on remediation operations and proof of risk reduction.

### Positioning

For security teams that already have scanners and posture tools but still run remediation through spreadsheets and disconnected tickets, Chokepoint provides a single operating workflow that prioritizes true exposure paths, routes work to the right owners, and proves verified closure.

### Differentiated promise

**Stop managing findings. Start breaking attack paths.**

## Users

### Primary user

Security engineering manager or vulnerability / exposure program owner.

### Secondary users

- Platform engineering manager
- Cloud infrastructure owner
- Security operations leader
- CISO / CTO consuming proof and trend views

## Jobs to be done

### Primary user jobs

- Determine which exposures deserve immediate action.
- Convert noisy findings into a manageable remediation plan.
- Assign work with enough evidence that engineering teams can act without a second discovery pass.
- Track SLA risk, proof of closure, and reopened work.
- Explain to leadership why these fixes matter.

### Secondary user jobs

- Understand exactly what to change and why.
- Batch work into realistic change windows.
- Verify whether the fix actually closed the exposure.
- Avoid duplicate or contradictory tickets from multiple security tools.

## Core pains

- Thousands of findings, very few high-confidence remediation priorities.
- No single owner for cross-domain attack paths.
- Difficulty proving that security work reduced exposure, rather than shuffled counts.
- Weak explainability when severity, exploitability, business impact, and reachability conflict.
- Executive reporting still anchored to backlog volume instead of attack-path reduction.

## Buying trigger

- Rapid cloud growth created scanner sprawl and backlog growth.
- A recent audit, near miss, or board ask exposed the inability to prove remediation effectiveness.
- Security and platform teams are fighting over prioritization quality.
- Existing CNAPP / VM tooling is good at discovery but weak at campaign execution and evidence.

## Scope

### In scope for v1

- Unified exposure inbox
- Attack-path oriented prioritization
- Explainable score breakdown
- Campaign creation and management
- Owner routing and due dates
- Verification and reopened state tracking
- Executive proof view for trends and SLA posture

### Non-goals

- Acting as a live scanner
- Performing real-time blocking or endpoint control
- Full incident response case management
- Replacing ticketing systems or CMDBs
- Long-tail compliance reporting across every framework

## Core workflows

### 1. Triage exposure paths

The user opens Chokepoint and sees a ranked queue of exposure paths, not raw findings. Each record shows service impact, KEV presence, EPSS, asset reachability, owner, and recommended fix motion.

### 2. Convert exposure into campaign

The user chooses one or more exposures and creates or updates a remediation campaign. Chokepoint proposes the change window, accountable owner, due date, and expected path break.

### 3. Coordinate execution

Security and platform teams track progress through statuses such as draft, planned, in change, validating, and verified. Notes and rationale stay attached to the campaign and its linked exposures.

### 4. Prove reduction

The user reviews verification status, reopened items, trend movement, and executive proof statements showing what risk was reduced and what remains open.

## Functional requirements

### Exposure inbox

- The system shall group low-level findings into exposure records.
- The system shall show a score composed of exploitability, reachability, identity path risk, service criticality, and remediation effort.
- The system shall explicitly flag KEV-backed exposures.
- The system shall present in-context guidance explaining why the exposure matters now.

### Campaign management

- The system shall allow an exposure to be attached to a remediation campaign.
- The system shall support campaign statuses: `draft`, `planned`, `in-change`, `validating`, `verified`, `stalled`.
- The system shall show owner, due date, validation method, and change window.
- The system shall allow notes to persist across sessions in the frontend demo.

### Proof and trust

- The system shall show verified closures separately from claims of closure.
- The system shall track reopened issues and overdue work.
- The system shall expose the score inputs rather than a single opaque risk number.
- The system shall label all seeded demo data as demo data.

### State handling

- The system shall represent normal, quiet, and high-attention states.
- The system shall remain usable on desktop and mobile.
- The system shall persist selected campaign and note state in `localStorage`.

## Acceptance criteria

- A user can identify the highest-priority exposure path in under 30 seconds.
- A user can move an exposure into a campaign and see the campaign update immediately.
- Campaign status, owner-facing notes, and acknowledgements persist after refresh.
- The product clearly distinguishes open, validating, verified, and reopened work.
- Quiet and surge scenarios render intentionally rather than degenerating into blank or broken layouts.
- The UI clearly states that the environment is demo-only and integrations are simulated.

## Information and data model

### Entities

- `Service`: critical business service, owner, environment, sensitivity
- `AssetGroup`: asset cluster affected by an exposure
- `IdentityPath`: privileged or excessive-permission chain linked to the exposure
- `Exposure`: deduped security problem tied to one or more findings
- `Evidence`: KEV, EPSS, CVSS, external reachability, identity, config, ticket history
- `Campaign`: grouped remediation initiative tied to one or more exposures
- `TaskState`: workflow status, due date, owner, notes, verification method
- `ProofSnapshot`: trend values, MTTR, reopened count, verified closures

### Integration assumptions

- Inbound: CNAPP, vulnerability scanners, identity / directory context, CMDB or service catalog
- Outbound: Jira / ServiceNow / change-management systems
- Verification: rescan or connector refresh, represented in the demo as seeded evidence

## Security, privacy, permissions, and auditability

- Role model assumptions:
  - security managers can prioritize and create campaigns
  - remediation owners can update execution state and notes
  - executive viewers can see proof dashboards but not alter campaigns
- Every closure should retain supporting evidence and timestamp history.
- Any future suppression or defer action should require a reason and expiry.
- The product must never imply that seeded data is live telemetry.
- Sensitive production details should be redactable in a real implementation; the demo uses fictionalized records only.

## Onboarding and activation

### Initial onboarding hypothesis

1. Connect one cloud security source and one vulnerability source.
2. Map 5-20 critical services and their owners.
3. Define crown-jewel services and risk SLA targets.
4. Review top ten exposure paths.
5. Launch first remediation campaign within the first session.

### Activation moment

The team sees a previously fragmented set of findings compressed into 3-5 campaigns with clear owners and proof targets.

## Retention model

- Weekly remediation reviews use the campaign view.
- Daily triage uses the exposure inbox.
- Monthly leadership check-ins use the proof view.

## Success metrics

### Product metrics

- Time from landing to first campaign created
- Percentage of top exposures assigned within SLA
- Percentage of campaign-linked exposures verified closed
- Reopened exposure rate
- Median days from exposure creation to verified closure

### Business outcome metrics

- Reduction in active KEV-backed exposure paths
- Reduction in critical services with open attack paths
- Reduction in duplicated remediation tickets
- Improvement in executive confidence / reporting readiness

## Packaging and pricing hypothesis

- Base platform priced by protected active assets or service tiers.
- Campaign and proof workflow included in core, to avoid splitting the value proposition.
- Higher tiers unlock deeper integrations, automated verification, and executive reporting exports.

## Launch motion

### Initial GTM narrative

“Your scanners found the issues. Chokepoint gets them fixed. We turn exposure sprawl into a small number of accountable campaigns and show exactly which attack paths you broke.”

### Sales motion

- land with security engineering
- prove value through a 30-day exposure burn-down pilot
- expand via platform operations and leadership reporting

### Recommended launch surface

Mid-market cloud-native companies that already run Wiz, Tenable, ServiceNow, Jira, or equivalent tooling and feel remediation friction despite decent visibility.

## Risks and dependencies

- The category is crowded; differentiation must stay tightly focused on workflow and proof.
- Poor ownership metadata in customer environments can limit routing quality.
- If proof is based on weak verification, trust erodes quickly.
- The product depends on usable upstream finding quality and service mapping.

## Unknowns

- Whether buyers prefer per-asset or per-service pricing for this workflow layer.
- How much automation remediation owners actually want before trust drops.
- Which integration pair lands most often: Wiz + Jira, Tenable + ServiceNow, or another combination.

## Post-demo roadmap

### Near-term

- bi-directional ticket sync
- evidence attachments and screenshots
- suppression / exception workflow with expiry
- per-team workload balancing

### Medium-term

- automated campaign suggestions from repeating path motifs
- verification hooks tied to real rescans
- executive scorecards and quarterly planning packs

### Long-term

- attack-path simulation across change proposals
- remediation capacity forecasting
- agentic drafting of change requests with human approval gates
