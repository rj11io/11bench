# Design specification — Terra Exposure Command

## IA and hierarchy

Primary navigation: Command, Exposure queue, Assets, Controls, Reports; secondary: Integrations and Audit trail. Command is the daily work surface. It prioritizes (1) one decision requiring attention, (2) four operational outcome metrics, (3) a filtered, ranked remediation queue, and (4) the selected exposure brief. The score is never standalone: an explanation decomposes exploit signal, reachability, and business impact, followed by named evidence.

## Key journey and states

Analyst opens the command → reviews the highest priority path → opens brief → validates evidence and proposed owner → starts remediation or accepts risk → writes an analyst note. Starting a fix changes status to In progress; accepting risk changes status and removes it from the Open count; filters show each queue state. These changes persist with browser local storage. Empty state for any filter is “No exposures in this state; revisit All exposures”; loading uses structure-matched skeleton rows; data-source errors show source name, last successful sync, and a retry/continue-with-stale-data decision. The demo normal state contains open, in-progress, and accepted-risk examples; the signal strip is the high-attention state.

## Visual system

The system is a dark, calm operations surface: ink `#08110f`, panels `#0d1916`, one lime action/signal `#b9f66b`, and restrained coral for critical-path risk. Typography uses compact sans metadata and a Georgia editorial face for decision framing. Borders, fine labels, and generous grouping create density without visual noise. Status uses a text label plus hue. Interactive controls have visible hover/focus states, target sizes near 32–40px, and understandable verbs.

The remediation queue uses a rank + title + context pattern because comparison across a small list is more useful than an invented chart. The compact horizontal bars explain relative contributors rather than asserting false quantitative accuracy. The service-path strip turns a technical issue into business-relevant reachability.

## Responsive and accessibility

At desktop the layout is 235px navigation, queue, and detail column optimized for 1440×900. Under 900px navigation becomes a toggled overlay and queue/detail stack. Under 560px the metrics become two columns, the path can scroll within itself, metadata hides before content, and rows allow wrapping. No page-level horizontal overflow is introduced. Buttons are semantic buttons; labels are present for inputs; color is paired with text; contrast is high; tab/filter state is visually visible. Production should add complete keyboard focus testing, Escape-to-close mobile nav, ARIA live confirmation for action status, and chart table alternatives.

## Differentiator demonstrated

The implementation does not simulate a broad cybersecurity platform. Its daily decision, evidence-backed score, proposed owner, and explicit remediation/risk actions demonstrate Terra’s differentiator: a defendable path from exposure signal to accountable remediation. The footer explicitly identifies all data as demo data.
