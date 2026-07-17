# Research — Relay: exploited exposure response

Accessed 2026-07-16. Relay is a narrow **exploited-exposure response cockpit** for a security engineer at a 250–2,000 person organization. It turns noisy vulnerability inventory into a defensible, owned, time-bound mitigation queue.

| Source | Finding | Decision changed |
|---|---|---|
| [NIST Cybersecurity Framework 2.0](https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20) | CSF 2.0 frames cybersecurity risk across Govern, Identify, Protect, Detect, Respond, and Recover. | The UI connects asset evidence, action, owner, and audit trail rather than treating a CVSS list as a dashboard. |
| [CISA: Reducing the Significant Risk of Known Exploited Vulnerabilities](https://www.cisa.gov/sites/default/files/publications/Reducing_the_Significant_Risk_of_Known_Exploited_Vulnerabilities_20211103.pdf) | CISA’s KEV catalog concentrates vulnerabilities with evidence of exploitation and supports continuous prioritization. | KEV is a decisive signal; a KEV on an internet-facing crown-jewel is shown as an “act now” decision, not merely “critical.” |
| [CISA Cybersecurity Performance Goals report](https://www.cisa.gov/sites/default/files/publications/2022_00092_CISA_CPG_Report_508c.pdf) | Internet-facing KEVs should be patched or mitigated in a risk-informed time frame, prioritizing critical assets. | The priority model exposes reachability and business criticality, and supports compensating controls when a patch window is unsafe. |
| [MITRE ATT&CK Enterprise tactics](https://attack.mitre.org/tactics/) | ATT&CK tactics describe an adversary’s objective and give a shared analytical vocabulary. | Exposure cards use a concise attack-path explanation (initial access → credential access) so an owner understands consequence, not only a CVE. |
| [Microsoft Defender Vulnerability Management overview](https://learn.microsoft.com/en-us/defender-vulnerability-management/defender-vulnerability-management) | Representative vulnerability-management products combine discovery, prioritization, remediation, and reporting. | Position Relay as the decision and collaboration layer across existing scanners/EDR—not a replacement scanner. |
| [Tenable Vulnerability Priority Rating](https://docs.tenable.com/vulnerability-management/Content/Explore/Findings/VPR.htm) | Representative vendors combine technical severity with threat/exploit intelligence. | The score is explainable: exploit status, exposure, criticality, and control gap are visible as named factors. |
| [NIST SP 800-61r3 Incident Response Recommendations](https://csrc.nist.gov/pubs/sp/800/61/r3/final) | Incident response should be integrated with broader cyber-risk management, including preparation, detection, response, and recovery. | A suspected exploitation flag pivots the work item to incident validation, preserving the evidence trail. |
| [W3C WAI ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) | Operational controls need semantic names, keyboard support, focus management, and status feedback. | Buttons are real controls; status changes use live feedback; color is paired with labels/icons; the small-screen view becomes a focused work queue. |

## Segment and workflow judgment

**Buyer:** CISO / head of security at a lean, tool-rich mid-market company. **Daily user:** vulnerability-management lead or security engineer. The pain is not detecting more CVEs; it is proving which exposure materially matters, gaining the right asset owner’s commitment, retaining exception evidence, and being able to report credible risk reduction.

Established categories split this workflow: vulnerability scanners and EDR inventory (Tenable, Qualys, Rapid7, Microsoft), CNAPP/attack-path products, ticketing systems, and executive reporting. Relay’s wedge is the handoff between them: an operator can explain why the next action matters, assign it with a deadline, select a safe mitigation, and show the residual-risk decision.

## Information architecture and measurement implications

The operating view should answer, in order: “What needs action now?”, “Why is it prioritized?”, “Who is committing to it?”, and “What reduced?” Thus the home view is a ranked commitment queue plus an evidence drawer—not a grid of equal widgets. Supporting views are Queue, Assets, Exceptions, and Reports.

Useful signals are: active exploitation/KEV, internet exposure, asset criticality, identity or crown-jewel reachability, compensating controls, owner acknowledgment, due date, and validated closure. Avoid count-only “risk scores,” raw CVSS as the sole order, or pie charts for operational ranking. Use sparklines only for a compact exposure trend, and make every score inspectable.

## GTM implication

Land alongside the customer’s existing scanner/EDR and service desk. The activation promise is “connect two sources, identify the top five exploited paths, and assign a verified action in one working session.” A time-boxed design-partner motion can validate score calibration and asset-owner adoption before claiming autonomous remediation.
