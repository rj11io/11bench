# PRD: Patchbay — remediation operations for lean security teams

**Status:** v1, demo-scoped. **Author:** Claude (run `claude-fable5-high`). **Date:** 2026-07-17.
**Basis:** every claim about the market traces to [research.md](./research.md); section references below point there.

---

## 1. Thesis, category, positioning

**Thesis.** Security tools are excellent at finding problems and terrible at getting them fixed. Mid-market security teams (1–5 people) drown in thousands of scanner findings, rank them with a severity score that doesn't predict real attacks, and track fixes in spreadsheets. Meanwhile median patch time is rising (32 → 43 days) while attackers exploit new flaws in about 15 (research §3). The scarce resource is not detection — it's **decision and follow-through capacity**. A product that turns finding-noise into a short, evidence-ranked, owner-routed fix queue directly attacks the failing metric: time to remediate.

**Category.** Remediation operations (the "prioritize" and "mobilize" stages of Gartner's continuous threat exposure management model — research §4). Not a scanner, not a SIEM, not detection.

**Positioning.** The best products in this workflow — Dazz, Avalor, Silk — were acquired into enterprise platforms (Wiz, Zscaler, Armis), and the independents left (Nucleus, Vulcan, Brinqa) sell enterprise-priced deployments. Patchbay serves the vacated segment: **self-serve remediation operations for teams too small for a platform and too exposed for a spreadsheet** (research §4).

**Differentiated promise — "every priority shows its receipts."** Every rank in Patchbay decomposes into named, sourced evidence: confirmed-exploitation status (KEV), exploitation probability (EPSS), internet exposure, asset criticality, and blast radius, with the scoring math visible on demand. Research shows opaque scores are the top adoption blocker for prioritization tools — analysts won't act on numbers they can't verify (research §6). Competitors sell risk scores; Patchbay sells *defensible decisions* — the same explanation the user reads is the one they forward to the engineer who owns the fix and the auditor who reviews the process.

One sentence for the website: **"Patchbay turns thousands of security findings into a short list of fixes with evidence, owners, and deadlines."**

## 2. Users, jobs, pains, buying trigger

**Primary user: the lean security lead.** Title: security engineer, head of security, or "the person who owns security" at a 200–2,000-employee software or tech-enabled company. They run 3–6 scanning tools, and they personally answer for both the risk and the audit.

Jobs to be done:
1. *Decide* — "Of 4,000 open findings, tell me the handful that actually matter this week, and show me why so I can trust it."
2. *Mobilize* — "Get each fix to the right engineering owner with enough context that I don't spend my day writing Jira tickets and Slack reminders."
3. *Prove* — "Show my auditor, my insurer, and my CEO that we fix what matters within our stated deadlines."

Pains today: severity-score queues that are 60–80% ignorable (research §3); duplicate findings for the same root cause across tools; no ownership — fixes die in engineering backlogs; SLA tracking by hand; exec reporting assembled in slides quarterly.

**Secondary users.**
- *Engineering owner* (team lead who receives fixes): wants one clear ask — what, why, how urgent, how to verify — not 40 raw CVE tickets.
- *Executive/auditor* (CEO, board, auditor, insurer): wants trend and SLA proof, quarterly, in plain language.

**Buying trigger.** A forcing event that makes "show me your vulnerability management process" unavoidable: SOC 2 / ISO 27001 audit, a major customer's security questionnaire, a cyber-insurance renewal, or a near-miss incident (research §9).

## 3. Scope, non-goals

**In scope (v1):**
1. Ingest findings from existing scanners via API connectors (read-only).
2. Deduplicate and group findings into **Fix Packs** — units of work where one action (e.g. "upgrade OpenSSL to 3.0.17 on the payments fleet") closes many findings.
3. Rank Fix Packs with a transparent, factor-based priority score.
4. Route: assign owners, set status, push/track tickets in Jira/Linear.
5. Enforce SLA policy: per-severity deadlines, countdowns, breach flags.
6. Record every state change in an audit trail; support risk acceptance with mandatory reason and expiry.
7. Report: exposure burndown, SLA compliance, exec summary.

**Non-goals (explicit, permanent for v1):**
- No scanning or detection of any kind — scanners are commoditized inputs (research §4).
- No auto-patching or agents on customer machines; Patchbay orchestrates people and tickets, not machines.
- No SIEM/alert triage — different user, different staffing model (research §2).
- No enterprise ceremony in v1: no on-prem deployment, no custom RBAC hierarchies, no professional services.

## 4. Core workflow and functional requirements

The core loop, which the demo implements end to end:

**Triage → Explain → Assign → Track → Prove.**

| # | Requirement | Acceptance criteria |
|---|---|---|
| F1 | Evidence-ranked queue | Queue lists Fix Packs sorted by priority score. Each row shows: title, score, evidence chips (KEV / EPSS / exposure / asset), findings count, assets count, owner, SLA countdown, status. Sortable and filterable by status, severity band, and owner. |
| F2 | Glass-box explanation | Opening a Fix Pack shows the score decomposed into factors, each with weight, contribution, and source (e.g. "CISA KEV, added Jul 2"). Sum of visible contributions equals the score. No unexplained numbers. |
| F3 | Fix Pack detail | Detail view shows: grouped findings (CVE list), affected assets with exposure/criticality, concrete remediation steps, verification step, and full activity trail. |
| F4 | Assignment & status | User can assign an owner and move status through open → in progress → fix submitted → verified. Every change writes an audit-trail entry with actor and timestamp. |
| F5 | Risk acceptance | User can accept a risk only with a written reason and an expiry date; accepted items leave the active queue but stay visible under a filter and reappear at expiry. |
| F6 | SLA policy | Per-severity deadlines (default: critical 7d, high 30d, medium 90d). Queue rows show live countdowns; breached items are flagged and float upward within their band. |
| F7 | Reporting | A reports view shows open-exposure burndown over time, SLA compliance by team, and aging of open fixes. An exec summary states, in plain sentences, what changed and what's at risk. |
| F8 | New-evidence events | When ranking evidence changes (e.g. a CVE enters KEV), affected Fix Packs re-rank, are visibly marked, and the change is recorded — the "what changed while you slept" moment. |

## 5. Information/data model and integration assumptions

Entities (all demo data in the build is seeded from this model):

- **Asset** — id, name, kind (service, host, repo, database), environment, `internetFacing`, `criticality` (crown-jewel / standard / low) with a stated reason.
- **Finding** — id, CVE, title, source tool, CVSS, EPSS, `kev` (+ date), affected asset, first-seen, fix version.
- **Fix Pack** — id, title, one remediation action, member findings, affected assets, computed score + factor breakdown, severity band, status, owner, SLA due date, activity trail.
- **Person/Team** — owner directory (security + engineering teams).
- **SLA Policy** — per-band day counts.
- **Activity event** — timestamp, actor, action, detail (append-only).

Scoring model (v1, deliberately simple and fully disclosed in-product): weighted sum of five factors — confirmed exploitation (KEV, weight 35), exploitation probability (EPSS, 25), internet exposure (15), asset criticality (15), blast radius (10) — normalized to 0–100. Simplicity is a feature: the model must fit in the user's head, because trust is the product (research §6).

Integration assumptions: read-only connectors to scanner APIs (Tenable/Qualys/Wiz/Snyk/Trivy class), enrichment from free public feeds (CISA KEV, FIRST EPSS, NVD), two-way ticket sync (Jira, Linear), Slack for nudges, SSO via Google/Okta. The demo simulates connectors with seeded data and says so on screen.

## 6. Security, privacy, permissions, auditability, trust

A security product is bought through its own security review, so these are launch requirements, not roadmap:

- **Data minimization.** Patchbay stores findings metadata and asset names only — no source code, no credentials, no packet data. Connectors are read-only.
- **Tenant isolation** with per-tenant encryption keys; encryption in transit and at rest.
- **Permissions.** v1 keeps three roles: admin (policy, connectors), editor (triage, assign), viewer (exec/auditor read-only). Auditor access is a first-class read-only role because "prove" is a core job.
- **Auditability.** Append-only activity trail on every Fix Pack; risk acceptances require reason + expiry + approver; exports for audit evidence.
- **Trust posture.** SOC 2 Type II pursued from day one (we sell to people who ask for it); public trust page; no training ML models on customer data.

## 7. Onboarding, activation, retention, metrics

**Onboarding (target: first value in under 30 minutes).** Connect one scanner → Patchbay imports findings, groups them, and shows the queue with a banner stating the headline: "4,112 findings became 37 fixes; 5 need attention this week." That sentence *is* the aha moment. Sample-data mode (like the demo) lets a buyer evaluate without connecting anything.

**Activation definition.** A workspace is activated when it has ≥1 connector, ≥1 assigned Fix Pack, and an SLA policy confirmed — i.e., the loop has started.

**Retention mechanics.** The SLA clock is the natural comeback trigger (weekly digest: what's due, what breached, what's new). New-evidence events (F8) create urgency the user didn't have to hunt for. The exec report is a monthly artifact the buyer forwards upward, which entrenches the product with the budget holder.

**Success metrics.**
- North star: **median time-to-remediate for critical Fix Packs** across active workspaces (the metric the industry is failing — research §3).
- Product: activation rate, weekly triage sessions per workspace, % Fix Packs with owner within 48h, SLA compliance trend, evidence-panel open rate (are people using the receipts?).
- Business: trial→paid conversion, net revenue retention, security-review pass rate.

## 8. Packaging, pricing hypothesis, launch motion

**Packaging (asset-based, seats free).** Collaborators must be free or routing dies — an engineer who can't open their assigned fix is churn. Pricing scales with assets under management:
- **Free** — 1 connector, 50 assets, 2 editors. Purpose: practitioner-led evaluation on real data (research §9).
- **Team, ~$1,250/mo** — 500 assets, unlimited viewers/owners, Jira/Linear sync, SLA reporting, audit export.
- **Growth, ~$3,500/mo** — 2,500 assets, SSO/SCIM, API, custom SLA policies, priority support.

Hypothesis to validate with design partners: asset-count is the fairest proxy for value; the audit-export feature is the paywall that converts.

**Launch motion.** (1) 5–10 design partners from security communities and investor networks, recruited on a measurable promise: "cut your urgent list 60–80% and prove SLA compliance at your next audit" (research §3, §9). (2) Public launch with self-serve free tier + the interactive demo as top-of-funnel. (3) Content wedge: publish our scoring model and an open "explainable prioritization" spec — the transparency story is also the marketing story. (4) Later: MSP/vCISO channel, since fractional security leaders run this exact workflow for many clients at once (research §9).

**GTM narrative (the pitch in four sentences).** Your scanners already found everything; that's the problem. Patchbay turns thousands of findings into a short list of fixes with evidence, owners, and deadlines. Every priority shows its receipts, so your engineers stop arguing and your auditor stops asking. Teams cut their urgent list by more than half in the first session — before they've changed a single SLA.

## 9. Risks, dependencies, unknowns, roadmap

**Risks.**
- *Platform squeeze:* Wiz/Zscaler/CrowdStrike bundle "good enough" remediation. Mitigation: stay scanner-neutral (platforms only prioritize their own findings well), win on workflow depth and mid-market price.
- *Connector treadmill:* value depends on integration breadth. Mitigation: launch with the top 6 scanners by mid-market share; publish an open ingest schema so tools can push to us.
- *Scoring credibility:* one bad ranking in a demo kills trust. Mitigation: transparency is the hedge — a visible model invites correction instead of distrust; user-adjustable weights are on the near roadmap.
- *Single-champion churn:* the buyer is one person who may leave. Mitigation: exec reports and engineering-owner touchpoints spread the product beyond the champion.

**Dependencies.** Free evidence feeds (KEV, EPSS, NVD) remaining free and timely; Jira/Linear API stability; SOC 2 timeline.

**Unknowns to resolve with design partners.** Where dedup/grouping precision must be before trust breaks; whether asset-based pricing survives contact with procurement; how much auto-assignment (code-ownership inference) v1 needs.

**Post-demo roadmap.**
1. **Now (demo):** the core loop — evidence-ranked queue, glass-box explanations, assignment, SLA clocks, risk acceptance, burndown reporting, new-evidence events.
2. **Next (v1 GA):** real connectors (6 scanners, Jira/Linear, Slack), SSO, audit-evidence export, weekly digest, adjustable score weights.
3. **Later:** ownership inference from repo/service catalogs, fix verification via rescan diffing, MSP multi-tenant views, insurance-report templates.
