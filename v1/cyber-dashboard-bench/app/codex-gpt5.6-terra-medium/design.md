# Terra design specification

## Architecture and hierarchy

Desktop navigation is a thin brand rail (Command, Exposure queue, Services, Decisions, Reports) and a working header. Command is the decision surface: an urgent “focus exposure” sits above a posture/trend, a compact queue and activity. The primary interaction opens a right-side decision drawer. This preserves scanability while keeping action close to evidence. “Demo workspace” is persistent in the chrome.

Priority is explainable rather than opaque: confirmed exploitation (KEV), public reachability, service tier, EPSS, active related signal and remediation window contribute to the score. The highest current item is promoted only if it is unowned, overdue, or materially more consequential; score and reasons are rendered together.

## Journeys and states

1. Security lead lands on Command, sees an 84/100 publicly exposed KEV and understands it in one sentence.
2. They open the brief, inspect the evidence and choose Patch or Mitigate, owner and due date; save feedback updates the queue.
3. After verification, they resolve it. The trend/metric update and activity feed evidence the risk reduction.
4. Resolving all seeded items renders a calm empty state with a “restore demo queue” affordance. Loading, error and source freshness are specified for production, while demo is explicitly static.

## Visual system

Terra uses a midnight ink canvas, elevated blue-black panels, mineral-blue accents and a restrained signal palette: coral = urgent, amber = attention, mint = resolved/healthy, slate = neutral. Color is never the only cue. A warm off-white text tone prevents the clinical, saturated “hacker dashboard” trope. IBM Plex-like system typography, 12px labels, 14px body, generous 24px panel pads and 12px radii balance dense operation with calm focus. The risk trend is an SVG area chart (time series); evidence uses compact labeled chips; the queue is a table where aligned columns support comparison.

Buttons have hover/focus/disabled feedback, tooltips are replaced with visible labels where essential, and the drawer uses a clear close affordance. On mobile the rail becomes a compact top mark, the dashboard becomes a single column, queue rows become cards, and the decision drawer becomes a bottom-oriented full-width sheet. Semantic buttons, labelled controls, focus rings, 4.5:1 text contrast targets, icon+text statuses and live status text support accessibility.

The implementation makes the differentiator tangible by keeping a human-readable “why now” stack, a selected mitigation path, owner, deadline and audit trail in the same decision surface—not behind dashboards or ticket links.
