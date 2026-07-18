# Research: what a high-quality cybersecurity dashboard should be

**Author:** Claude (run `claude-fable5-high`)
**Research window:** 2026-07-17. All sources were accessed on 2026-07-17 via live web search and page fetches. No sources are fabricated. Where a primary source blocked automated access, that is stated and a secondary source is used.

---

## 1. How this research is organized

Each section covers one of the required research areas. Every section ends with a **"Decision this changed"** note, because research that doesn't change a decision is decoration. The final section states the product wedge the evidence points to.

A few terms used throughout, defined once in plain words:

- **SOC** — security operations center: the team (often tiny) that watches for and responds to attacks.
- **Finding / vulnerability** — a specific weakness a scanning tool reports, e.g. "this server runs a version of OpenSSL with a known flaw."
- **CVE** — the public ID number a known software flaw gets (e.g. CVE-2026-1234).
- **CVSS** — a 0–10 severity score attached to each CVE. It describes how bad the flaw *could* be, not whether anyone is actually attacking it.
- **EPSS** — a daily-updated probability (0–100%) that a flaw will actually be exploited in the next 30 days, published by FIRST.org.
- **KEV** — CISA's "Known Exploited Vulnerabilities" catalog: a US-government list of flaws confirmed to be under real attack.
- **SLA** — a deadline policy, e.g. "critical flaws must be fixed within 15 days."
- **MTTR** — mean time to remediate: how long fixes actually take on average.

---

## 2. Buyer/user segments and painful workflows

### Findings

**Alert and finding overload is the defining pain, and it is getting worse, not better.**

- The 2025 SANS Detection & Response Survey (summarized by Stamus Networks) found **73% of security teams name false positives as their top detection challenge**, and roughly **46% of all alerts turn out to be false positives** — nearly half of analyst workload produces no security value. It also reports that ~70% of analysts with under five years' experience leave their roles within three years.
  - Source: "What the 2025 SANS Detection & Response Survey Reveals: False Positives & Alert Fatigue Are Worsening," Stamus Networks — https://www.stamus-networks.com/blog/what-the-2025-sans-detection-response-survey-reveals-false-positives-alert-fatigue-are-worsening (accessed 2026-07-17)
- Aggregated industry statistics (Vectra AI's alert-fatigue explainer) put average alert volume near **3,000 alerts per day**, with a majority going unaddressed, and cite surveys where **61% of teams admit they ignored alerts that later turned out to be real incidents**.
  - Source: "Alert fatigue: causes, real cost, and how to fix it," Vectra AI — https://www.vectra.ai/topics/alert-fatigue (accessed 2026-07-17)
- An IDC survey (reported by Cybersecurity Dive) found **about one-third of analysts ignore alerts outright** because volume exceeds capacity.
  - Source: "One-third of analysts ignore security alerts, survey finds," Cybersecurity Dive — https://www.cybersecuritydive.com/news/security-alert-analyst-SOC-idc-fireeye/595111/ (accessed 2026-07-17)
- Alert fatigue is now an active academic research area, with a 2025 ACM Computing Surveys paper cataloguing its causes (false positives, redundant alerts, missing context) and open problems.
  - Source: "Alert Fatigue in Security Operations Centres: Research Challenges and Opportunities," ACM Computing Surveys — https://dl.acm.org/doi/full/10.1145/3723158 (accessed 2026-07-17)
- Anton Chuvakin (ex-Gartner, Google Cloud security) frames the root cause bluntly: fatigue is not a tuning problem, it's a **structural mismatch between alert supply and analyst capacity**, so products that only "show more" make it worse.
  - Source: "Anton's Alert Fatigue: The Study," Anton Chuvakin, Medium — https://medium.com/anton-on-security/antons-alert-fatigue-the-study-0ac0e6f5621c (accessed 2026-07-17)

**Who feels this pain hardest:** mid-market companies (~200–2,000 employees). They have real attack surface (cloud, SaaS, endpoints, code) and real compliance pressure (SOC 2, customer questionnaires, cyber insurance), but a security "team" of 1–5 people who cannot staff a 24/7 SOC. Enterprise teams buy platforms and MDR services; mid-market teams live in spreadsheets and Jira tickets.

### Decision this changed

The product must **reduce the number of decisions per day**, not add another feed. The primary user is a **security engineer or head of security in a 1–5 person team**, not a tier-1 SOC analyst at an enterprise. This ruled out building a SIEM-style live alert console (a workflow that assumes staffing mid-market teams don't have).

---

## 3. The prioritization gap: severity scores don't predict attacks

### Findings

- Only **2–3% of all CVEs are ever exploited in the wild**, yet most teams still queue work by CVSS severity. Filtering by "CVSS 7+" both floods the queue and misses real attacks: in Q1 2025, **28% of exploited vulnerabilities carried only a Medium CVSS score**.
  - Source: "Vulnerability Prioritization in 2026: Why CVSS Isn't Enough," Picus Security — https://www.picussecurity.com/resource/blog/vulnerability-prioritization-why-cvss-isnt-enough (accessed 2026-07-17)
- EPSS (Exploit Prediction Scoring System) is a machine-learning model maintained by a special interest group at FIRST.org. It publishes, daily and for free, the probability each CVE will be exploited within 30 days. It exists precisely because CVSS describes potential harm, not attacker behavior.
  - Source: "Exploit Prediction Scoring System (EPSS)," FIRST.org — https://www.first.org/epss/ (fetched directly, accessed 2026-07-17)
- Practitioner guidance now layers signals: CVSS (potential impact) + EPSS (exploitation probability) + KEV (confirmed exploitation) + asset context (is it internet-facing? does it hold sensitive data?). Combining an EPSS threshold with CVSS typically **cuts the urgent list by 60–80%**.
  - Sources: "EPSS vs. CVSS: what's the best approach to vulnerability prioritization?," Intruder — https://www.intruder.io/blog/epss-vs-cvss (accessed 2026-07-17); "Comparing CVSS, EPSS, KEV, SSVC, LEV, and PXS," Picus Security — https://www.picussecurity.com/resource/blog/comparing-cvss-epss-kev-ssvc-lev-and-pxs-from-scores-to-security-proof (accessed 2026-07-17); "What is Vulnerability Prioritization?," Wiz Academy — https://www.wiz.io/academy/vulnerability-management/vulnerability-prioritization (accessed 2026-07-17)
- CISA's KEV catalog is the canonical "confirmed under attack" list; its companion directive (BOD 22-01) requires US federal agencies to fix listed flaws on fixed deadlines. *Note: cisa.gov blocked automated fetching during this research (HTTP 403), so specifics here are corroborated through the Picus and Elasticito sources rather than the primary page. The canonical URL is https://www.cisa.gov/known-exploited-vulnerabilities-catalog.*
  - Corroborating source: "Does Slow Patching Predict a Breach?," Elasticito — https://elasticito.com/patching-latency-how-long-suppliers-take-to-patch-a-critical-vulnerability-and-why-it-predicts-a-breach/ (accessed 2026-07-17)

**Fixes are slow, and the gap between attacker speed and defender speed is widening.**

- Edgescan's 2025 Vulnerability Statistics Report measures mean time to remediate **critical application flaws at ~74 days** and critical network flaws at ~65 days; internet-facing criticals go faster (~35 days) but still far slower than attacker timelines.
  - Source: "2025 Vulnerability Statistics Report (10th Edition)," Edgescan — https://info.edgescan.com/hubfs/23DOWNLOADABLE%20CONTENT/Vulnerability%20Statistics%20Reports/Edgescan_VulnerabilityStatsReport_2025.pdf (accessed 2026-07-17)
- Analysis of Verizon's 2026 Data Breach Investigations Report shows **median patch time rose from 32 to 43 days** while exploitation as an initial breach vector keeps growing — defenders are getting slower while attackers get faster. The 2025 DBIR found only ~54% of exploited edge-device flaws were ever fully remediated.
  - Source: "The Remediation Paradox: Verizon's 2026 DBIR Shows Exploitation Winning While Defenders Patch Slower," Security Boulevard — https://securityboulevard.com/2026/05/the-remediation-paradox-verizons-2026-dbir-shows-exploitation-winning-while-defenders-patch-slower/ (accessed 2026-07-17)

### Decision this changed

Ranking must be **evidence-first**: KEV membership, EPSS probability, internet exposure, and asset criticality — not raw CVSS. And because remediation speed (not detection) is the failing metric, the product's core objects are **fixes with owners and deadlines**, and its headline metric is **time-to-remediate against an SLA policy**, not alert counts. This finding also set the demo's "high-attention" scenario: a new KEV entry landing on fleet-wide software, because that is the moment this product earns its keep.

---

## 4. Product categories and representative competitors

### Findings

The space between "scanners that find problems" and "engineers who fix them" has consolidated into a recognized category (variously called unified vulnerability management, remediation operations, or exposure management):

- **Wiz acquired Dazz for ~$450M (Nov 2024)** explicitly to own "unified security remediation" — turning findings into prioritized, routed fixes. Wiz's own announcement frames the problem as: security teams drown in findings from dozens of tools with no unified way to remediate.
  - Sources: "Wiz acquires Dazz for $450M to expand its cybersecurity platform," TechCrunch — https://techcrunch.com/2024/11/21/wiz-acquires-dazz-for-450m-to-expand-its-cybersecurity-platform/ (accessed 2026-07-17); "Wiz to acquire Dazz, transforming risk remediation from cloud to code," Wiz blog — https://www.wiz.io/blog/wiz-to-acquire-dazz-transforming-risk-remediation-from-cloud-to-code (accessed 2026-07-17)
- **Zscaler acquired Avalor** (a "data fabric" that aggregates and prioritizes findings, March 2024); **Armis acquired Silk Security** (remediation routing) the same year.
  - Source: Zscaler Form 8-K announcing the Avalor acquisition, SEC EDGAR — https://www.sec.gov/Archives/edgar/data/1713683/000171368324000072/zs-04302024_991.htm (accessed 2026-07-17)
- Independent players still serving the workflow directly: **Nucleus Security** (deep Jira/ServiceNow ticket orchestration and fix verification) and **Vulcan Cyber** (risk-based prioritization plus remediation orchestration); adjacent platform giants: Qualys VMDR, Tenable, CrowdStrike Exposure Management, Brinqa.
  - Sources: "Top 10 vulnerability management platforms for 2026," Vicarius — https://www.vicarius.io/articles/top-10-vulnerability-management-platforms-for-2026 (accessed 2026-07-17); "Top 10 Unified Vulnerability Management Alternatives," PeerSpot — https://www.peerspot.com/products/avalor-alternatives-and-competitors (accessed 2026-07-17)
- Scale Venture Partners' post-Wiz market analysis argues the remaining open opportunities are in **workflow depth and underserved segments**, not another scanner.
  - Source: "A world after Wiz: Emerging opportunities in cloud security," Scale Venture Partners — https://www.scalevp.com/blog/a-world-after-wiz-emerging-opportunities-in-cloud-security (accessed 2026-07-17)

**Framework tailwind:** Gartner's CTEM ("continuous threat exposure management") model — scope, discover, **prioritize**, validate, **mobilize** — is the framing enterprises now use for this work. Gartner predicted organizations running such programs would be three times less likely to be breached, and surveys show ~60% of organizations pursuing or considering one.

- Sources: "CTEM explained: Gartner's 5 stages and 2026 prediction," Vectra AI — https://www.vectra.ai/topics/ctem (accessed 2026-07-17); "Strategic Roadmap for Continuous Threat Exposure Management," Gartner (document listing) — https://www.gartner.com/en/documents/6884566 (accessed 2026-07-17); "What is CTEM?," CTEM.org — https://ctem.org/docs/what-is-continuous-threat-exposure-management (accessed 2026-07-17)

### Decision this changed

Three of the four best independent products in this category were **acquired by platforms that sell to enterprises**, and the survivors (Nucleus, Vulcan, Brinqa) sell enterprise-priced, services-heavy deployments. That leaves the **mid-market remediation workflow effectively unserved** — validated demand, vacated segment. This set the wedge: a self-serve remediation-operations product for lean teams, positioned on the CTEM "prioritize → mobilize" stages. It also sharpened the non-goals: no scanning (scanners are commoditized inputs), no detection/response (staffing mismatch).

---

## 5. Dashboard and security-ops information architecture

### Findings

- The "single pane of glass" — one dashboard aggregating everything — is widely criticized by practitioners: it serves no specific role well, surfaces risks **without remediation steps**, shows inconsistent scores across tools, and ends up ignored.
  - Sources: "Why the 'Single Pane of Glass' in Monitoring Is a Myth," Checkly — https://www.checklyhq.com/blog/broken-windows-why-the-single-pane-of-glass-is-imp/ (accessed 2026-07-17); "The Elusive 'Single Pane of Glass'," Reclaim Security — https://reclaim.security/blog/elusive-single-pane/ (accessed 2026-07-17)
- Chris Sanders (SOC practitioner and author of *Practical Threat Hunting*) argues useful SOC dashboards answer **a specific recurring question** rather than displaying status; a dashboard nobody makes decisions from is wall art.
  - Source: "Three Useful SOC Dashboards," Chris Sanders — https://chrissanders.org/2016/10/three-useful-soc-dashboards/ (accessed 2026-07-17)
- Dashboard-UX pattern research (Pencil & Paper) and information-architecture guidance (GoodData) converge on the same rules: one primary question per screen, progressive disclosure ("show the right thing first, everything else one click away"), role-based views instead of one view for all roles, and visual hierarchy that mirrors decision priority.
  - Sources: "Dashboard Design UX Patterns Best Practices," Pencil & Paper — https://www.pencilandpaper.io/articles/ux-pattern-analysis-data-dashboards (accessed 2026-07-17); "Six key principles of information architecture," GoodData — https://www.gooddata.ai/blog/six-principles-of-dashboard-information-architecture/ (accessed 2026-07-17)

### Decision this changed

The home screen is **a ranked work queue, not a wall of charts**. Each screen answers exactly one question: Queue → "what do we fix next?"; Detail → "why this, and who fixes it?"; SLA view → "are we keeping our promises?"; Executive view → "is risk going down?". Charts appear only where a trend answers the screen's question. This is the single most load-bearing design decision in the build.

---

## 6. Explainability, trust, and collaboration in remediation

### Findings

- Analysts distrust opaque scores. Survey research on explainable AI in security operations finds the **most pressing adoption blocker is lack of transparency** — analysts want to see which evidence drove a score before they act on it, and explanations measurably increase trust and triage speed.
  - Sources: "Survey Perspective: The Role of Explainable AI in Threat Intelligence," arXiv — https://arxiv.org/html/2503.02065v1 (accessed 2026-07-17); "Too Much to Trust? Measuring the Security and Cognitive Impacts of Explainability in AI-Driven SOCs," arXiv — https://arxiv.org/html/2503.02065v2 (accessed 2026-07-17)
- Even vendors with strong ML teams (Palo Alto Networks) publish about decomposing incident risk scores into visible contributing factors, because black-box scores don't get used.
  - Source: "Unlocking the Black Box: Transparency for ML-Based Incident Risk Scoring," Palo Alto Networks — https://www.paloaltonetworks.com/blog/security-operations/unlocking-the-black-box-transparency-for-ml-based-incident-risk-scoring/ (accessed 2026-07-17)
- Collaboration reality: security finds the problems, but **engineering owns the fixes**. Nucleus's differentiation (per the category reviews above) is exactly ticket-system depth — create Jira/ServiceNow tickets, track them, verify closure. Remediation is a cross-team accountability problem, not an analysis problem.

### Decision this changed

Explainability became the product's **differentiated promise**: every priority score decomposes into named, sourced evidence factors ("in KEV since July 2", "EPSS 94%", "internet-facing", "asset holds customer data") with the math visible. No unexplained numbers anywhere in the UI. It also drove the data model: findings group into **fix-level units** (one upgrade closes N findings) with an owner, a deadline, and an auditable activity trail — because the unit of collaboration is the fix, not the finding.

---

## 7. Metrics and visualizations appropriate to this domain

### Findings

Synthesizing the SLA/MTTR sources (§3) and the dashboard-question principle (§5), the metrics that answer real questions in a remediation product are:

| Question | Metric | Visualization |
|---|---|---|
| Are we keeping promises? | SLA compliance %, breach count, time-to-breach per item | Countdown chips, compliance bar by team |
| Is risk going down? | Open critical exposure over time | Burndown/trend line (time series) |
| Where is work stuck? | Age of open fixes by owner/team | Sorted horizontal bars |
| What changed today? | New KEV/EPSS movements affecting us | Ranked list with deltas, not a chart |

Anti-patterns the sources warn against: gauges and "risk speedometers" (no decision follows from them), world-map attack visualizations (decoration), and pie charts of severity distribution (the queue already is that information, ranked).

### Decision this changed

The demo ships exactly three chart types — trend line (exposure burndown), stacked/sorted bars (SLA and aging), and inline sparklines — all in service of screen-level questions. Everything else is ranked lists and countdown chips, because lists with deadlines are what people act on.

---

## 8. Accessibility and responsiveness for dense operational tools

### Findings

- Reviews of dashboard accessibility repeatedly find **color-only encoding** is the dominant failure: roughly 1 in 12 men has a color-vision deficiency, and severity conveyed by color alone is unreadable to them. One audit of 200 dashboards (reported by ChartGen) found 94% had at least one critical accessibility issue, color-only encoding most common.
  - Sources: "Data Visualization Accessibility," Mass.gov — https://www.mass.gov/info-details/data-visualization-accessibility (accessed 2026-07-17); "Chart Accessibility Guide: Inclusive Data Visualization," ChartGen — https://chartgen.ai/resources/blog/chart-accessibility-inclusive-data-visualization (accessed 2026-07-17); "How to Create Accessibility Data Visualizations," Accessible.org — https://accessible.org/visualize-accessibility-data-audit-report/ (accessed 2026-07-17)
- Concrete guidance: pair every color with a **text label or icon**; keep one hue with lightness steps for ordered scales rather than a rainbow; direct-label charts instead of relying on legends; accept that the most accessible layout is slightly less dense.

### Decision this changed

Severity in the demo is always **color + label** (a "KEV" chip says KEV; a critical row shows the word, not just a red dot). Ordered data uses one hue ramp. Interactive rows are real buttons with focus states and aria labels. On mobile (375px) the queue collapses from a table to stacked cards rather than shrinking — density is sacrificed before legibility.

---

## 9. Market positioning and GTM patterns for this wedge

### Findings

- OpenView's analysis of product-led growth (PLG) in cybersecurity: pure self-serve revenue is rare in security, but **practitioner-led trials that generate product-qualified leads** work well in the segment where the user is the buyer — which is exactly the mid-market head-of-security profile.
  - Source: "Analyzing 3 Cybersecurity Customer Segments: Is PLG Right for Your Business?," OpenView Partners — https://openviewpartners.com/blog/analyzing-3-cybersecurity-customer-segments-plg/ (accessed 2026-07-17)
- Early-stage security GTM playbooks converge on: 5–10 design partners from founder/VC networks and CISO communities, then a repeatable mid-market motion; buyers suffer vendor fatigue and pre-reject category noise, so positioning must name a **specific workflow outcome**, not "visibility."
  - Sources: "The 8 GTM stages for building a cybersecurity startup," Cyber Building Blocks — https://cyberbuildingblocks.substack.com/p/the-8-gtm-stages-for-building-a-cybersecurity (accessed 2026-07-17); "Cybersecurity Go-to-Market Strategy: The 2026 Data-Driven Guide," CyberDB — https://www.cyberdb.co/cybersecurity-go-to-market-strategy-the-2026-data-driven-guide/ (accessed 2026-07-17)
- Compliance and insurance events (SOC 2 audits, customer security questionnaires, cyber-insurance renewals) are the natural buying triggers in mid-market — they force the "show me your vulnerability-management process" question that a spreadsheet answers badly.

### Decision this changed

GTM in the PRD is practitioner-first: free connector-limited tier → self-serve trial on real data → sales-assist expansion, with design partners recruited around a concrete promise ("cut your urgent list 60–80% and prove SLA compliance to your auditor"). Pricing anchors to asset count, not seats, because a 3-person team should not be penalized for adding engineering collaborators — collaborators are how the product spreads.

---

## 10. Conclusion: the wedge

The evidence lines up on one product:

1. The pain is overload, and the failing metric is **remediation speed**, not detection (§2, §3).
2. The prioritization fix is known — evidence-layered ranking (KEV + EPSS + exposure + asset context) — but it lives in enterprise platforms (§3, §4).
3. The best independent products in this exact workflow were acquired into enterprise platforms, vacating the mid-market (§4).
4. Winning UX is a decision queue with explainable ranking and cross-team accountability, not a wall of charts (§5, §6).
5. The buyer profile (practitioner = buyer, trigger = audit/insurance/incident) supports a practitioner-led GTM (§9).

**The product:** a remediation-operations tool for lean security teams — one evidence-ranked queue of deduplicated, owner-routed, deadline-tracked fixes, where every priority shows its receipts. The PRD (prd.md) defines it; design.md specifies the experience; the demo implements the core workflow.
