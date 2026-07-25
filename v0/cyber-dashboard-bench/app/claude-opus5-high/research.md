# Research — choosing a cybersecurity dashboard worth building

**Run:** `claude-opus5-high` · **Research window:** 25 July 2026 · All URLs accessed
**2026-07-25** unless a different date is noted.

## How to read this document

A few words come up constantly, so here they are in plain English first.

- **SIEM** — "security information and event management". A big log database with
  alerting rules on top. It is where most companies decide whether something bad
  is happening.
- **Detection rule** (also **analytic**) — a saved query that fires an alert when
  logs match a pattern. Someone has to write it, and someone has to keep it working.
- **Log source** — a system that ships its logs into the SIEM: a laptop agent, a
  firewall, a cloud audit trail, an identity provider.
- **MITRE ATT&CK** — a free public catalogue of the specific things attackers do,
  each with an ID like `T1078.004` (Cloud Accounts). Teams use it as a checklist of
  behaviours they should be able to spot.
- **Detection engineer** — the person whose job is writing and maintaining those
  rules. A distinct role from the analyst who responds to the alerts.
- **MDR** — "managed detection and response". An outsourced team that watches your
  alerts for you.
- **Coverage** — the claim "we would notice if an attacker did this".

Every section below ends with **→ Decision**, which is the specific product,
design, or implementation choice the finding changed. Where I could not read a
source's full text, I say so rather than paraphrasing something I did not see.

---

## 1. The finding that set the direction: coverage claims are unfalsifiable

I started with a broad question — where is a security dashboard genuinely load
bearing rather than decorative? — and the strongest evidence pointed at one
uncomfortable gap: teams report coverage numbers they cannot back up.

**Source:** "Enterprise SIEMs Miss 79% of MITRE ATT&CK Techniques Used by
Adversaries, According to CardinalOps' 5th Annual Report" — CardinalOps, via
PR Newswire, published 5 June 2025.
<https://www.prnewswire.com/news-releases/enterprise-siems-miss-79-of-mitre-attck-techniques-used-by-adversaries-according-to-cardinalops-5th-annual-report-302473779.html>

Findings, drawn from an analysis the release describes as covering 2.5 million log
sources, more than 23,000 distinct log sources and more than 13,000 unique
detection rules across Splunk, Microsoft Sentinel, IBM QRadar, CrowdStrike
LogScale and Google SecOps:

- Companies actively detect about **21%** of relevant ATT&CK techniques — a 2 point
  improvement on 2024. So **79% is uncovered**.
- **13% of existing SIEM rules are broken** and will never fire, down 5 points from
  2024. The cause is mundane: a misconfigured data source, or a log field the rule
  references that no longer exists.
- The same environments already ingest enough telemetry to detect **over 90%** of
  ATT&CK techniques. The data is there. The working detections are not.
- A typical SIEM carries **259 log types** and close to **24,000** unique log sources.

A related write-up of an earlier edition puts the wasted share higher: **28% of
SIEM rules are either broken or unused** ("Understanding Detection Coverage Gaps in
SIEM Systems", kcyerrid.com, dated 22 March 2026,
<https://kcyerrid.com/2026/03/22/detection-coverage-measuring-what-you-can-actually-see/>;
secondary source, cited for the framing rather than the exact number).

The important thing is not the size of the gap. It is the **shape** of it. A broken
rule still counts as coverage on every dashboard I could find, because those
dashboards count rules, not working rules. The heatmap goes green either way.

→ **Decision.** Build the product around one refusal: a coverage claim does not
count until something dated proves it. That single idea became the product's
tagline and its central data primitive — the *assurance state* of a technique,
which can be "verified", "assumed", or "broken", and never collapses those into one
green box.

---

## 2. The category already exists — so the wedge has to be sharper than "measure coverage"

I checked whether someone already sells this before committing.

**Sources:**

- "Cisco completes SnapAttack acquisition" — Cisco corporate acquisitions page.
  <https://www.cisco.com/c/en/us/about/corporate-strategy-office/acquisitions/snapattack.html>
- "Cisco Intends to Acquire Threat Detection and Defense Company SnapAttack,
  Driving Further Splunk Innovation to Power the SOC of the Future" — Splunk blog.
  <https://www.splunk.com/en_us/blog/security/cisco-intends-to-acquire-threat-detection-and-defense-company-snapattack.html>
- "MSSP Market Update: Cisco to Acquire SnapAttack for Threat Detection" — MSSP Alert.
  <https://www.msspalert.com/news/mssp-market-update-cisco-to-acquire-snapattack-for-threat-detection>
- "Best CardinalOps Competitors and Alternatives for 2026" — Guardare.
  <https://www.guardare.com/exposure-management-resources/best-cardinalops-competitors-and-alternatives-for-2026>
- "2025 Gartner Market Guide for Adversarial Exposure Validation" — landing page,
  Picus Security. <https://www.picussecurity.com/resource/report/gartner-market-guide-for-adversarial-exposure-validation>
- "CTEM (Continuous Threat Exposure Management): 5 Stages + Practical Guide" — ctem.org.
  <https://ctem.org/docs/what-is-continuous-threat-exposure-management>
- "Rapid7 Named a Leader in the 2025 Gartner Exposure Assessment Platform Magic
  Quadrant" — Rapid7 blog.
  <https://www.rapid7.com/blog/post/em-rapid7-leader-2025-gartner-exposure-assessment-platform-magic-quadrant-mq-eap/>

Findings:

- A category called **detection posture management** exists. CardinalOps, SOC Prime,
  Anvilogic and SnapAttack all sit in it. Cisco bought SnapAttack in December 2024
  specifically to speed up Splunk's detection content and engineering roadmap.
- A second, separate category validates by attacking you: Gartner calls it
  **adversarial exposure validation** (AEV), and folds breach-and-attack simulation
  and automated penetration testing into it. Picus, SafeBreach, AttackIQ and
  Cymulate live here. AEV is one of the five stages of Gartner's **continuous threat
  exposure management** (CTEM) loop — scope, discover, prioritise, validate, mobilise.
- Gartner published a first Magic Quadrant for Exposure Assessment Platforms in
  late 2025, covering 20 vendors, which tells me buyers now have a procurement
  category to slot this spend into.

The two categories do not meet. Detection posture tools reason about **content**
(do you have a rule?). AEV tools reason about **proof** (did an attack get caught?).
Neither owns **telemetry health** (is the log source still alive?), and neither
issues an **owner, a due date and an expiry** for the gaps they surface. The CTEM
loop names "mobilise" as a stage, but the tooling I found treats it as a report
hand-off.

→ **Decision.** Do not build a coverage scanner and do not build an attack
simulator. Build the thin accountability layer that joins content, telemetry,
validation evidence and production fidelity into one state per technique, and then
forces a decision on it. Position explicitly as *on top of* the SIEM, the MDR and
whichever AEV tool the customer already bought — an integration story, not a
replacement story. This also keeps the demo honest: it consumes evidence, it does
not claim to detect anything itself.

---

## 3. Structure the product on ATT&CK v18, not on the old heatmap

This finding was luck of timing and it reshaped the data model.

**Sources:**

- "Updates — October 2025" — MITRE ATT&CK official updates page.
  <https://attack.mitre.org/resources/updates/updates-october-2025/>
- "What Comes After Detection Rules? Smarter Detection Strategies in ATT&CK" —
  Lex Crumpton, MITRE ATT&CK on Medium.
  <https://medium.com/mitre-attack/what-comes-after-detection-rules-smarter-detection-strategies-in-att-ck-7e6738fec31f>
- "What's New in MITRE ATT&CK v18: Detection Strategies and Analytics Unveiled" —
  Picus Security. <https://www.picussecurity.com/resource/blog/whats-new-in-mitre-attack-v18>
- "MITRE Unveils ATT&CK v18 With Updates to Detections, Mobile, ICS" — SecurityWeek.
  <https://www.securityweek.com/mitre-unveils-attck-v18-with-updates-to-detections-mobile-ics/>
- "From Text to Telemetry: How MITRE ATT&CK v18 Changes the Game for Detection
  Engineers" — Google Cloud Security community blog.
  <https://security.googlecloudcommunity.com/community-blog-42/from-text-to-telemetry-how-mitre-att-ck-v18-changes-the-game-for-detection-engineers-6453>

Findings:

- ATT&CK **v18 shipped 28 October 2025** and rebuilt how detection is described.
  Free-text "Detections" and "Data Sources" are gone. In their place: **Detection
  Strategies** (IDs like `DET0011`, "what behaviour to look for") which contain
  **Analytics** (IDs like `AN0042`, "how to see it on this platform"), which in turn
  name concrete **log sources** and **data components**.
- Enterprise ATT&CK now ships **691 Detection Strategies and 1,739 Analytics**.
  Mobile adds 124 and 211; ICS adds 83 and 82.
- Picus's walkthrough shows an Analytic naming real telemetry channels — for
  example `vpxd.log` from vCenter management, and data components `DC0009` (Process
  Creation), `DC0017` (Command Execution), `DC0025` (API Call).
- The practical effect, in Picus's words, is a testable path from **technique →
  strategy → analytic → data**.

That chain is exactly the chain that breaks in the real world, and every link fails
differently. No analytic at all is a content problem. An analytic whose log source
went quiet is a pipeline problem. An analytic nobody ever tested is an evidence
problem.

→ **Decision.** Model the domain as ATT&CK v18 does: technique → detection strategy
→ analytic → log source → data component. Derive the assurance state per link so
the product can say *which* link failed instead of showing one colour. The
implementation's evidence drawer is literally four stacked panels, one per link,
each with its own trail. Use v18-style IDs (`DET…`, `AN…`, `DC…`) in the demo data
so a detection engineer recognises the vocabulary immediately.

---

## 4. Green heatmaps are the thing practitioners already distrust

If I was going to show a coverage matrix, I needed to know how the existing ones
fail.

**Sources:**

- "What Does MITRE ATT&CK Coverage Really Mean?" — AttackIQ, dated 10 March 2026.
  <https://www.attackiq.com/2026/03/10/what-does-mitre-attack-coverage-really-mean/>
  (also syndicated at <https://securityboulevard.com/2026/03/what-does-mitre-attck-coverage-really-mean/>)
- "MITRE ATT&CK for Cloud: A Practitioner's Guide to Detection Coverage" — Cloud
  Security Alliance, dated 22 May 2026.
  <https://cloudsecurityalliance.org/blog/2026/05/22/mitre-att-ck-for-cloud-a-practitioner-s-guide-to-detection-coverage>
- "Security Layers — A Comprehensive Approach for Measuring MITRE ATT&CK Detection
  Coverage Across Your Entire Attack Surface" — CardinalOps.
  <https://cardinalops.com/blog/security-layers-a-comprehensive-approach-for-measuring-mitre-attck-detection-coverage-across-your-entire-attack-surface/>
- "MITRE ATT&CK Heatmap & Risk-Based ATT&CK Prioritization" — Bitsight.
  <https://www.bitsight.com/learn/cti/mitre-attack-heatmap>

Findings:

- **Coverage is a gradient, not a switch.** A noisy heuristic and a high-fidelity
  behavioural analytic both "cover" a technique, with wildly different outcomes.
- Heatmaps show gaps tolerably well but hide **depth, recency and quality**.
  Darker boxes everywhere does not mean safer.
- Practitioners recommend **scoring detections by confidence rather than presence**,
  stating **at what level, in what conditions, and how recently** a detection was
  validated, and **pushing back on 100% as a goal** in favour of deep validated
  coverage at the choke points that matter in your environment.

→ **Decisions, several:**

1. Keep a technique matrix, because it is the map practitioners think in — but
   colour it by **assurance state**, not by rule count, and give "never validated"
   its own deliberately unsatisfying colour so it can never read as success.
2. Never render a single "coverage %" alone. Always show **verified coverage
   beside claimed coverage**, and label the difference the **assurance gap**.
3. Put a **freshness clock** on every verified state, so confidence visibly decays
   with time since the last test rather than staying green forever.
4. Drop the ambition of 100%. The product's target is a user-set service level on
   the techniques that matter (see §8), not a full green wall.

---

## 5. Telemetry dies quietly, and nobody is watching the watcher

This is the failure mode that turns a green dashboard into a lie, and it is the
least-served link in the chain.

**Sources:**

- "Your SIEM Shouldn't Go Silent When Your Network Does" — Graylog, The Visibility
  Layer, May 2026.
  <https://medium.com/the-visibility-layer/your-siem-shouldnt-go-silent-when-your-network-does-c545a14eb51e>
- "SecOps API and Ingestion Health monitoring with Cloud Monitoring" — Google Cloud
  Security community blog.
  <https://security.googlecloudcommunity.com/community-blog-42/secops-api-and-ingestion-health-monitoring-with-cloud-monitoring-7627>
- "How to ensure SIEM health and data quality" — Expel CyberSpeak glossary.
  <https://expel.com/cyberspeak/how-to-ensure-siem-health-and-data-quality/>
  *Note: this page returned truncated content when I fetched it, so I cite it only
  as evidence that a major detection-and-response vendor treats SIEM health and
  data quality as a named discipline. No claim below rests on it.*

Findings:

- The dangerous failure is the **silent** one. Sources stop feeding, parsers start
  malforming events, and the SIEM keeps drawing dashboards while visibility goes
  dark. There is no error to see.
- The causes are boring and constant: an agent crashes, a config change removes a
  forwarding rule, a disk fills and logging suspends, an agent update breaks
  forwarding, a network change orphans a syslog collector, an EDR upgrade kills the
  connector.
- An attacker on a host whose logs stopped six weeks ago is simply invisible.
- **Heartbeat monitoring** is the most reliable detector because it tests the whole
  data path, not just connector status: each source emits a regular heartbeat or
  summary event, and you alert when a previously chatty source goes quiet for
  longer than its expected interval plus a tolerance window.
- Health metrics worth tracking: ingestion rate per source, heartbeat/connectivity,
  parse accuracy, query performance, storage use, alert generation rate.

→ **Decision.** Telemetry health is a first-class input to the assurance state, not
a separate ops dashboard. Every log source in the demo carries an expected
heartbeat interval, a last-event timestamp, a 14-day volume series and a parse
error rate. When a source goes silent, every analytic depending on it flips to
**broken**, and every technique depending on those analytics loses its verified
status — visibly, with the blast radius named. The seeded demo opens on exactly
this scenario: identity telemetry silent for 6 days, taking four top-ten techniques
down with it. That is the product's most persuasive 10 seconds.

---

## 6. Alert fatigue is real, but it is a symptom — so aim upstream

I considered building an alert triage product and decided against it. The research
is what talked me out of it.

**Sources:**

- "Alert Fatigue in Security Operations Centres: Research Challenges and
  Opportunities" — ACM Computing Surveys, DOI 10.1145/3723158.
  <https://dl.acm.org/doi/10.1145/3723158> *Note: the publisher returned HTTP 403,
  so I could not read the full text. Cited as evidence that alert fatigue is now a
  peer-reviewed research area with an open problem list, nothing more.*
- "Anton's Alert Fatigue: The Study" — Anton Chuvakin, Anton on Security.
  <https://medium.com/anton-on-security/antons-alert-fatigue-the-study-0ac0e6f5621c>
- "One-third of analysts ignore security alerts, survey finds" — Cybersecurity Dive.
  <https://www.cybersecuritydive.com/news/security-alert-analyst-SOC-idc-fireeye/595111/>
- "The State of AI in the SOC 2025" — The Hacker News, September 2025.
  <https://thehackernews.com/2025/09/the-state-of-ai-in-soc-2025-insights.html>
- "Does 'AI SOC' Solve Alert Fatigue?" — D3 Security / Security Boulevard, July 2026.
  <https://d3security.com/blog/ai-soc-alert-fatigue/> ·
  <https://securityboulevard.com/2026/07/does-ai-soc-solve-alert-fatigue/>
- "Alert fatigue: causes, real cost, and how to fix it" — Vectra AI.
  <https://www.vectra.ai/topics/alert-fatigue>

Findings (vendor-published numbers, so treat as directional, not as census data):

- Teams report ignoring alerts that later turned out to be real incidents; a
  large share of alerts are never investigated at all.
- Reported volumes sit in the low thousands of alerts per day, with a majority
  unaddressed and roughly half of investigated alerts turning out to be false
  positives.
- False positives are named the top detection challenge by a clear majority of
  teams, and alert fatigue is named a primary SOC concern.
- Analyst attrition is severe among people with under five years' experience.

Two things follow. First, this space is extremely crowded — every SIEM, XDR and
"AI SOC" vendor is already selling triage relief, so a dashboard that ranks alerts
has no wedge. Second, and more useful: **noise is a property of the detection, not
of the alert queue.** A rule with a bad true-positive rate is a detection
engineering defect that keeps costing analyst hours every day it stays on.

→ **Decision.** Do not build an alert queue. Instead make **production fidelity**
the fourth input to assurance: for each analytic, track fires over 30 days, the
true/false positive split, and whether it has fired at all. This creates two
states existing tools miss — an analytic that is *technically working but useless*
(high fire count, near-zero true positives) and an analytic that is *suspiciously
silent* (enabled, zero fires, which may be fine or may be broken and is honestly
labelled as ambiguous). The fix action for a noisy analytic is "tune", and tuning
work sits in the same queue as coverage work, because they compete for the same
engineer.

---

## 7. Explainability is a trust requirement, not a nice-to-have

Any product that ranks work has to defend its ranking to the person doing the work.

**Sources:**

- "Unlocking the Black Box: Transparency for ML-Based Incident Risk Scoring" —
  Palo Alto Networks blog.
  <https://www.paloaltonetworks.com/blog/security-operations/unlocking-the-black-box-transparency-for-ml-based-incident-risk-scoring/>
- "Survey Perspective: The Role of Explainable AI in Threat Intelligence" — arXiv
  preprint 2503.02065. <https://arxiv.org/html/2503.02065v1>
- "A comprehensive review of explainable AI in cybersecurity: Decoding the black
  box" — ScienceDirect.
  <https://www.sciencedirect.com/science/article/pii/S2405959525001584>
- "AI SOC Explainability: Evidence Trails, Accuracy Benchmarks, and Decision
  Accountability" — UnderDefense.
  <https://underdefense.com/blog/ai-soc-explainability-transparency/>

Findings:

- Analysts distrust opaque verdicts and re-investigate them by hand, which
  destroys the time saving the score was supposed to create.
- Analysts want the **factors behind a score**, not the score: attack attribution,
  confidence values, and per-feature contribution.
- Vendors describing good practice converge on **evidence trails** and named
  accountability for decisions.

→ **Decision.** The priority score is deliberately **arithmetic and legible**, not
machine-learned:

```
priority = threatWeight × blastRadius × assuranceDeficit × effortFactor
```

Every finding exposes a "Why this rank" panel listing each term, its value, its
source, and its contribution in points. Threat weight cites where it came from
(threat-intel ranking); blast radius names the asset groups; assurance deficit
shows which link failed; effort shows the fix class. A user who disagrees can see
exactly which input to argue with. No hidden model, and nothing in the demo claims
to be AI.

---

## 8. Borrow the reliability engineering frame: service levels and error budgets

Security metrics are notoriously bad — mean time to detect gets reported to boards
while nobody checks whether the detections exist. I looked for a better frame and
found it outside security.

**Sources:**

- "Embracing Risk" — Google SRE Book, chapter on service level objectives and
  error budgets. <https://sre.google/sre-book/embracing-risk/>
- "SOC Metrics Cheat Sheet" — Mark Orlando, SANS Institute, 1 May 2025.
  <https://www.sans.org/posters/soc-metrics-cheat-sheet> *Note: I could only read
  the landing page, not the poster PDF. It states the approach — build metrics from
  the organisation's mission top-down rather than bottom-up from whatever the tools
  emit — and aligns with SOC-CMM. I cite it for that stated approach only.*
- SOC-CMM, the SOC capability maturity model and self-assessment.
  <https://www.soc-cmm.com/>
- "MTTD & MTTR in the Modern SOC" — Ilyess Sellami, Medium.
  <https://medium.com/@ilyess-sellami/mttd-mttr-in-the-modern-soc-from-reactive-monitoring-to-measurable-resilience-31a432e617cf>

Findings:

- A **service level objective** is a stated target ("99.9% of requests succeed").
  The **error budget** is the allowed shortfall. Consuming budget is a fact both
  sides can watch, so decisions stop being political and become arithmetic.
- Google's key insight: when the budget nears empty, teams self-police and slow
  down without anyone ordering them to.
- SANS's stated position is that metrics should descend from the mission rather
  than ascend from tool output.
- Mean time to detect measures how long an attacker stayed invisible — useful, but
  it only exists after an incident, and it says nothing about the techniques you
  have never been tested against.

→ **Decision.** Give the product one headline number that is a **commitment, not a
vanity metric**: an assurance service level such as "≥ 85% of tier-1 techniques
verified within the last 30 days", with a burn-down of the remaining budget. This
solves three problems at once. It replaces the meaningless 100%-green goal. It gives
the detection lead a defensible answer to "are we doing enough?". And it gives the
weekly executive report a number that moves for real reasons. The demo makes the
target user-editable and persists it, because arguing about the target is the
healthiest conversation this product can start.

---

## 9. Validation evidence has to come from tools customers already run

The product's claim is "we hold the receipts", so the receipts must be real.

**Sources:**

- "Test your defenses with Red Canary's Atomic Red Team" — Red Canary.
  <https://redcanary.com/atomic-red-team/>
- Atomic Red Team — "Built on Atomic". <https://www.atomicredteam.io/built-on-atomic>
- "10 Best Adversary Emulation Tools (2026)" — FourCore.
  <https://fourcore.io/blogs/top-10-open-source-adversary-emulation-tools>
- "Detection Engineering: Practicing Detection-as-Code — Introduction, Part 1" —
  NVISO Labs, 8 July 2025.
  <https://blog.nviso.eu/2025/07/08/detection-engineering-practicing-detection-as-code-introduction-part-1/>

Findings:

- Atomic Red Team is an open-source library of small tests mapped to ATT&CK, run in
  under five minutes each, explicitly built to check whether you can observe and
  detect a behaviour. It is widely adopted and actively maintained by Red Canary.
- Atomic tests have stable IDs of the form `T1078.004-3`, and mappings exist from
  atomic tests to open detection rules such as Sigma and Splunk ESCU.
- Detection-as-code is the direction of travel: rules live in version control with
  review, tests and a deprecation policy, rather than being typed into a vendor
  console.

→ **Decision.** Validation records in the demo carry a **method** (atomic test,
breach-and-attack simulation, purple-team exercise, manual check), a real-shaped
test ID, a timestamp, the operator's name and a graded result. The result is not a
pass/fail boolean but a four-step ladder — **alerted → detected → logged only →
missed** — because "the log was there but no alert fired" is a completely different
defect from "we saw nothing". Analytics reference a repository path
(`detections/identity/T1078.004-impossible-travel.yml`) to fit the detection-as-code
world the buyer already lives in.

---

## 10. Who buys this, and what makes them buy it this quarter

**Sources:**

- "Detection Engineering Goes Mainstream: 80% of Surveyed Organizations Actively
  Investing" — Anvilogic. <https://www.anvilogic.com/learn/bg-sans>
- "2025 State of Detection Engineering Report" — Anvilogic.
  <https://www.anvilogic.com/report/2025-state-of-detection-engineering>
- "Detection Coverage Maturity" — Anvilogic.
  <https://www.anvilogic.com/detection-coverage-maturity>
- "Elastic releases the Detection Engineering Behavior Maturity Model" — Mika
  Ayenson, Terrance DeJesus, Samir Bousseaden, Elastic Security Labs, 6 September 2024.
  <https://www.elastic.co/security-labs/elastic-releases-debmm>
- Detection Engineering Maturity Matrix — Kyle Bailey, April 2021, updated
  September 2022. <https://detectionengineering.io/>
- "How Do You Compare? 2025 Comp and Budget Data for Small and Midmarket CISOs" —
  IANS Research, 17 June 2025.
  <https://www.iansresearch.com/resources/all-blogs/post/security-blog/2025/06/17/how-do-you-compare--2025-comp-and-budget-data-for-small-and-midmarket-cisos>
- "Security Information and Event Management Market Report" — Grand View Research.
  <https://www.grandviewresearch.com/industry-analysis/security-information-event-management-market-report>

Findings on the user:

- **80% of surveyed organisations are actively investing in detection engineering,
  regardless of size.** The role exists and has a budget line. Anvilogic's report
  also notes that detection engineering has become a dedicated, better-defined job.
- **Reporting is the weak spot and the sore spot.** Anvilogic reports that nearly
  half of detection engineers say their reporting needs improvement, and **41% say
  reporting is the part of the job they dislike most.**
- **Measurement without action is the norm:** 59% of teams track false positive
  rates but only 14% prioritise reducing them — a 45 point gap.
- **43% name cloud-native environments their number one coverage gap**, more than
  2.5× any other environment. Nearly half say they lack the data they need, and
  most operationalise only 1–5% of their log data.
- Elastic's maturity model (five tiers: Foundation, Basic, Intermediate, Advanced,
  Expert) measures exactly the behaviours my product would instrument: rule
  coverage per data source, share of production rules tested before deployment,
  rules with complete metadata, false-positive reduction targets, and count of
  external validation exercises per year. Kyle Bailey's matrix covers six
  dimensions — People, Process, Technology, Detection, Response Experience, Threat
  Operations — across Defined / Managed / Optimized.
- Mid-market security budgets average roughly $3.4M and scale with revenue; a
  large share (reported around 40–45%) goes to MDR or SOC-as-a-service.

Findings on the trigger:

- **PCI DSS v4.0 requirement 10.7** now requires *all* entities, not just service
  providers, to detect, alert on and promptly address **failures of critical
  security control systems**, with audit logging explicitly in scope.
  ("PCI DSS Requirement 10 — Changes from v3.2.1 to v4.0 Explained", VISTA InfoSec,
  <https://vistainfosec.com/blog/pci-dss-requirement-10-changes-from-v3-2-1-to-v4-0-explained/>;
  "PCI v4.0 — 10.7.2: Failure of Critical Security Control Systems Are Handled
  Appropriately", KirkpatrickPrice,
  <https://explore.kirkpatrickprice.com/videos/pci-v4-0-10-7-2-failure-of-critical-security-control-systems-are-handled-appropriately>.)
- **NIS2 Article 20 makes management bodies personally accountable** for approving
  and overseeing cyber risk measures, and DORA does the same for ICT risk
  governance, with DORA applying from 17 January 2025. Auditors reportedly want a
  visible governance trail, not a program that lives entirely inside IT.
  ("Managers are liable for NIS2 & DORA", Exeon,
  <https://exeon.com/blog/why-managers-are-liable-for-nis2-and-dora/>;
  "Personally on the Hook: The NIS2 October 2026 Deadline, DORA Enforcement, and
  Management-Body Liability", ComplianceHub,
  <https://compliancehub.wiki/nis2-october-2026-deadline-dora-management-liability-readiness/>.)
- **NIST CSF 2.0** gives the same idea a control vocabulary: DE.CM covers
  continuous monitoring for "protection deficiencies and failures", DE.AE covers
  adverse event analysis, and the new Govern function plus ID.IM (Improvement)
  push oversight and continuous improvement.
  (<https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf>)
- MDR buyers are told to verify that detections are mapped to ATT&CK and
  continuously tuned, and that agent-only providers go blind the moment an attacker
  moves to cloud or identity. ("How to Choose an MDR Provider: Buyer's Guide 2026",
  <https://cybermarkagency.com/how-to-choose-mdr-provider/>; "Best MDR providers in
  2026", Kaseya, <https://www.kaseya.com/blog/best-mdr-providers/>.) Yet the
  customer, not the provider, still carries the regulatory accountability.

→ **Decisions:**

1. **Primary user: the detection engineering lead** at a company of roughly
   1,000–10,000 people that runs its own SIEM, usually alongside an MDR. This
   person has budget, owns the failing metric, and hates the part of the job my
   product automates.
2. **Make the report a product surface, not an export button.** Since 41% dislike
   reporting most, the weekly assurance report is generated from the ledger and is
   a first-class tab in the demo. That is the retention mechanic.
3. **Weight cloud and identity techniques heavily in the seed data**, because that
   is where 43% of teams say their biggest gap is — and it makes the demo's opening
   incident land as recognisable rather than invented.
4. **Buying trigger stack:** PCI DSS 10.7.2 needs evidence that control failures
   get detected and addressed; NIS2/DORA put a named executive on the hook and
   demand a trail; and after any headline breach the board asks "would we have
   caught that?". All three are answered by the same ledger.
5. **Accept-a-gap needs a real approval flow**, because a governance trail that
   anyone can self-approve is worth nothing to an auditor. Requester ≠ approver is
   enforced in the demo.

---

## 11. What the threat data says to seed with

**Sources:**

- "Top ATT&CK Techniques" — Red Canary 2025 Threat Detection Report.
  <https://redcanary.com/threat-detection-report/techniques/>
- "Identity attacks and infostealers dominate the 2025 Threat Detection Report" —
  Red Canary. <https://redcanary.com/blog/threat-detection/2025-threat-detection-report/>
- "Threat Researchers Detect 4x More Identity-Enabled Attacks as Infostealers
  Continue to Surge" — Red Canary newsroom.
  <https://redcanary.com/news/2025-threat-detection-report/>
- "Methodology" — Red Canary Threat Detection Report.
  <https://redcanary.com/threat-detection-report/methodology/>
- "AI and browser threats stand out in the 2026 Threat Detection Report" — Red Canary.
  <https://redcanary.com/blog/threat-detection/2026-threat-detection-report/>

Findings — the 2025 report's top ten techniques, in rank order:

| Rank | ID | Technique |
| --- | --- | --- |
| 1 | T1078.004 | Cloud Accounts |
| 2 | T1059.001 | PowerShell |
| 3 | T1059.003 | Windows Command Shell |
| 4 | T1530 | Data from Cloud Storage |
| 5 | T1105 | Ingress Tool Transfer |
| 6 | T1114.003 | Email Forwarding Rule |
| 7 | T1047 | Windows Management Instrumentation |
| 8 | T1204.004 | Malicious Copy and Paste |
| 9 | T1564.008 | Email Hiding Rules |
| 10 | T1027 | Obfuscated Files or Information |

Context from the same report: it covers roughly 93,000 threats across more than
4 million identities, endpoints and cloud assets; identity-enabled attacks were up
about fourfold year over year; three of the top five techniques are cloud-native
and identity-enabled; and fake-CAPTCHA "paste and run" lures explain the arrival of
T1204.004.

→ **Decision.** Seed the demo with these exact technique IDs and names, ranked as
published, and use the ranking as the visible source behind each finding's threat
weight. When a user opens "Why this rank", the threat term cites Red Canary's 2025
ranking rather than showing an unexplained number. The opening incident is built on
T1078.004 and T1114.003 — the identity and email techniques that top the list — so
the scenario is grounded in published threat data instead of invented drama.

---

## 12. Information design for a dense operational console

**Sources:**

- "Using Preattentive Attributes in Dashboard Design" — Page Laubheimer,
  Nielsen Norman Group, 18 June 2017.
  <https://www.nngroup.com/articles/dashboards-preattentive/>
- "A UX Roadmap for Effective Dashboard Design" — insightsoftware guest post.
  <https://insightsoftware.com/blog/a-ux-roadmap-for-effective-dashboard-design/>
  (secondary; used for the operational-vs-analytical framing only)

Findings:

- The visual attributes the eye processes without conscious effort are **length,
  2D position, area, angle and colour**. Length and 2D position are the most
  accurately judged — people compare bar lengths and positions reliably.
- Therefore bar charts and line graphs are the right defaults for a quick read.
- **Colour should not carry quantitative meaning.** Use shape or proximity for
  grouping and let colour reinforce it.
- Avoid pie charts, donuts, tree maps and gauges for fast reading: they encode
  quantity as area or angle, which people judge badly, and gauges waste space.
- 3D distorts the very relationships that make length easy to judge.
- Operational dashboards serve immediate, time-sensitive decisions; analytical
  dashboards support exploration of history. They are different jobs.

→ **Decisions:**

1. **No donuts, no gauges, no pies, no 3D anywhere.** State composition is a
   horizontal stacked bar (length, common baseline). Trend is a stacked area over
   weeks. The budget burn-down is a line against a reference line — position
   against a threshold is the single easiest comparison to make.
2. **Colour never carries a quantity.** It carries a *category* — the assurance
   state — and every state also gets a text label and a distinct glyph, so the
   grid is readable in greyscale.
3. **Two surfaces, not one.** The Assurance tab is operational: what to do now,
   ranked. The Coverage and Report tabs are analytical: where we stand and how it
   changed. Splitting them keeps the operational view from filling up with history.
4. Numbers use tabular monospaced figures so columns of counts align and small
   changes are visible without re-reading.

---

## 13. Accessibility and density for a tool people stare at all day

**Sources:**

- Web Content Accessibility Guidelines (WCAG) 2.2 — W3C. <https://www.w3.org/TR/WCAG22/>
- "1.4.11 Non-Text Contrast (AA)" — Deque University.
  <https://dequeuniversity.com/resources/wcag2.1/1.4.11-non-text-contrast>
- "Contrast and Color Accessibility" — WebAIM. <https://webaim.org/articles/contrast/>
- "Data visualization accessibility: Focus on color" — Minnesota IT Services.
  <https://mn.gov/mnit/about-mnit/accessibility/news/?id=38-716215>
- "Contrast requirements for WCAG 2.2 Level AA" — Make Things Accessible.
  <https://www.makethingsaccessible.com/guides/contrast-requirements-for-wcag-2-2-level-aa/>

Findings:

- **1.4.1 Use of Color (Level A):** colour must not be the only way information is
  conveyed. Pair it with text, icons, patterns or position.
- **1.4.11 Non-Text Contrast (Level AA):** interface components and meaningful
  parts of graphics need at least **3:1** against adjacent colours — including
  lines in line graphs and slices in pie charts. Heatmaps where changing colour
  changes the meaning are exempt, but that exemption is about the data encoding,
  not about the surrounding controls.
- Text needs 4.5:1 at Level AA (3:1 for large text).
- For charts, include direct labels or patterns alongside colour, and provide the
  underlying data as a table where possible.
- A practical test: **view it in greyscale.** If you cannot tell components apart,
  neither can some of your users.

→ **Decisions:**

1. Every assurance state renders as **glyph + short text + colour**, never colour
   alone. The states get distinct glyphs (`✓ ◗ ○ ✕ ⋯ ▣`) and, in the matrix, the
   "no content" state also gets a diagonal hatch pattern so absence is visible in
   greyscale.
2. All interactive controls, chart strokes and cell borders are held at 3:1 or
   better against their background; body text at 4.5:1 or better.
3. The coverage matrix is a real `<table>` with row and column headers, so the
   data is available as a table by construction, and each cell's accessible name
   states technique, state and days since validation.
4. A **density toggle** (comfortable / compact) is a persisted setting rather than
   a fixed choice, because a 27-inch SOC monitor and a laptop want different row
   heights. Row height changes; type size and hit targets do not drop below
   accessible minimums in either mode.
5. Respect `prefers-reduced-motion`: the state-change flash and drawer transition
   collapse to instant.
6. The queue is keyboard operable end to end — arrow keys move the cursor, `Enter`
   opens, `Escape` closes, `⌘K` opens the command palette — because the people who
   live in these tools do not reach for a mouse.

---

## 14. Responsive behaviour for a tool that is desktop-first but phone-real

There is no primary research to cite here; this is a judgement call informed by
§12 and the shape of the data. Recording it because it changed the build.

A 14-column technique matrix cannot survive a 375px viewport. Squeezing it
produces either horizontal scroll or cells too small to read, and both are worse
than a different layout.

→ **Decision.** At narrow widths the matrix is **replaced, not shrunk**: tactics
become a vertical list of collapsible rows, each showing a state-count bar and
expanding to a list of techniques. The queue becomes stacked cards keyed by
priority. The evidence drawer becomes a full-height sheet. The desktop layout
targets 1440×900 with a three-region grid; nothing anywhere is allowed to
horizontally overflow.

---

## 15. Go-to-market patterns for this wedge

**Sources:**

- "How to pick the right GTM motion to reach $100M ARR" — Unusual Ventures field guide.
  <https://www.unusual.vc/field-guide/how-to-pick-the-right-gtm-motion-to-reach-100m-arr/>
- "Usage-Based vs. Seat-Based Pricing" — GTM Playbook.
  <https://discover.gtmplaybook.co/usage-based-vs-seat-based-pricing>
- "Cybersecurity Go-To-Market Strategy: 8-Step Framework" — SaaS Hero.
  <https://www.saashero.net/strategy/cybersecurity-go-to-market-strategy/>
- Grand View Research SIEM market report (as above), and DataHorizzon SIEM tools
  market sizing via OpenPR.
  <https://www.openpr.com/news/4518450/siem-tools-market-size-to-reach-usd-14-8-billion-by-2033-growing>

Findings:

- **Land and expand** is the dominant security motion: start with one workload or
  application, then spread until you become the standard.
- **Hybrid pricing** — a fixed platform fee plus a variable component — is where
  most enterprise renewals in 2025–26 land, as the market drifts from pure per-seat
  toward usage and outcomes.
- Security GTM guidance stresses CISO engagement, compliance-driven opportunity,
  and short payback.
- SIEM is a market on the order of **$6–7B in 2025**, forecast to roughly double by
  the early 2030s (figures vary by analyst — Grand View and DataHorizzon disagree on
  the exact base). The adjacent spend pool is large and already budgeted; this
  product is priced against a fraction of it, not against a new line item.
- Detection content is commoditising: thousands of ATT&CK-mapped rules are freely
  available in open repositories, which narrows the content-quality moat between
  big vendors and newcomers.

→ **Decisions:**

1. **Land on one thing that is embarrassing and provable in a week:** import the
   customer's existing rules and log-source inventory, and show them their assurance
   gap — how much of their "coverage" has never been tested and how much is broken.
   That is a free assessment, and it is the whole top-of-funnel.
2. **Expand along the ladder** the research already describes: from tier-1
   techniques to the full landscape, from one SIEM to a second, then to the MDR
   relationship, then to the auditor's evidence pack.
3. **Price hybrid:** a platform fee by band plus a variable component on the number
   of techniques under assurance. Do *not* price on log volume — the customer
   already resents paying their SIEM by volume, and volume-based pricing would
   punish them for sending more telemetry, which is the opposite of the behaviour
   this product wants.
4. **Because content is commoditising, the moat is not rules — it is the ledger:**
   the accumulated, timestamped, signed history of what was tested when, by whom,
   with what result. That history cannot be imported from a competitor, and it gets
   more valuable every quarter it exists. Switching cost grows on its own.
5. **Sell the report to the CISO and the tool to the engineer.** The engineer's
   pain is that reporting is manual and hated; the CISO's pain is being personally
   accountable under NIS2/DORA with no trail. One artefact serves both.

---

## 16. Options I rejected, and why

Recording the rejections because they are part of the judgement.

| Option considered | Why rejected |
| --- | --- |
| Alert triage / "AI SOC" copilot | Crowded by every SIEM, XDR and MDR vendor plus a wave of AI SOC startups (§6). No defensible wedge, and a demo would be indistinguishable from a dozen others. |
| Vulnerability remediation orchestration | Real pain, but the category consolidated hard — Tenable acquired Vulcan Cyber, Wiz acquired Dazz. Late. |
| Executive cyber risk quantification in dollars | Requires loss-model assumptions I cannot defend honestly in a demo, and the output is a number nobody can check — the exact failure mode §1 and §7 warn about. |
| Cloud security posture management | Dominated by Wiz, Palo Alto and Microsoft. A dashboard adds nothing. |
| Full exposure assessment platform | Gartner's 2025 Magic Quadrant already lists 20 vendors (§2). Building a narrow, honest layer that plugs into one is the better play than becoming the 21st. |
| Attack-path graph visualiser | Visually impressive, operationally thin. It shows what could happen, not what you should do on Tuesday. |

---

## 17. Research gaps I am carrying into the PRD

Stated plainly so the PRD's assumptions are traceable.

1. **Most volume statistics here are vendor-published.** CardinalOps, Anvilogic and
   Red Canary all publish from their own installed base, which is a real sample but
   not a random one. I use them for direction and shape, not as census data, and
   the product deliberately never depends on an industry benchmark number.
2. **Two sources were unreadable.** The ACM Computing Surveys alert-fatigue survey
   returned 403, and the SANS SOC metrics poster is behind a download. I cite both
   only for the existence and stated approach of their work, and no product decision
   rests on their contents.
3. **I have no primary interview data.** Everything about the detection engineer's
   day comes from published survey summaries and practitioner blogs. The PRD's
   first roadmap item is therefore design-partner discovery, and the riskiest
   assumption to test is whether teams will accept an assurance service level at all
   — or whether the honest number is so ugly that they refuse to look at it.
4. **Integration feasibility is assumed, not verified.** I did not read the API
   documentation for Splunk, Sentinel, CrowdStrike or Okta. The PRD marks connector
   depth as a dependency with an explicit unknown, and the demo labels every
   connector as a fixture rather than implying a working integration.
5. **ATT&CK v18 is young.** It shipped in October 2025 and vendor support for
   Detection Strategies and Analytics is still landing. Building the model on v18 is
   a bet that it becomes the shared vocabulary; the fallback is to keep mapping at
   technique level, which every tool already supports.
