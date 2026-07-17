# Design Specification: AlertFlow Dashboard

## Information Architecture

### Navigation Structure

```
AlertFlow Dashboard
├── Triage Queue (default view)
│   ├── Alert list (prioritized)
│   └── Alert detail (modal/panel)
├── Incidents
│   ├── Incident list (filtered by status)
│   └── Incident detail (timeline + notes)
├── Rules & Tuning
│   ├── Rule health (false positive rates)
│   └── Rule editor (threshold, exceptions)
├── Team Metrics
│   ├── Health dashboard (MTTR, resolution rate, etc.)
│   └── Individual performance
└── Settings
    ├── Integrations
    ├── Team members
    └── Alert preferences
```

### Rationale

- **Primary surface: Triage Queue**: Analysts spend 60–80% of time here; default view should minimize cognitive load
- **Secondary: Incidents**: For the 1–5% of alerts that escalate to investigation; requires context and timeline
- **Management: Rules & Team Metrics**: For managers; hidden from analysts by default
- **Utilitarian: Settings**: For setup; infrequent access

---

## Critical User Journeys & States

### Journey 1: Triage Alert (Primary Workflow)

**Actor**: SOC Analyst  
**Trigger**: Analyst logs in; sees alert queue  
**Goal**: Dismiss false positives or escalate real threats  
**Time budget**: 30 seconds per alert

**Steps**:
1. **Queue view** shows top 10 alerts ranked by risk
   - State: Normal (alerts present), Empty (no alerts), Loading (fetching new alerts)
   - User action: Click alert to open detail

2. **Alert detail panel** opens (right side or modal)
   - State: Loading (fetching context), Loaded (ready to triage), Error (context unavailable)
   - User sees: Alert title, severity, contextual data (asset, user, threat intel, related events)
   - User action: Click decision button (Dismiss / Investigate / Remediate)

3. **Decision outcome**
   - State: Submitting (processing triage decision), Success (alert moved off queue), Error (network issue)
   - System action: Alert removed from queue; next alert in queue moves to top
   - User action: Continue to next alert or close panel

**Terminal states**:
- Dismissed → Alert marked false positive; rule tuning recommendation shown
- Investigated → Incident created; analyst assigned; incident view opens
- Remediated → Playbook opens in new panel; analyst executes steps

---

### Journey 2: Investigate Incident (Secondary Workflow)

**Actor**: SOC Analyst  
**Trigger**: Alert escalated to "Investigate"; analyst opens incident view  
**Goal**: Determine scope, impact, and remediation steps  
**Time budget**: 5–30 minutes (depending on incident complexity)

**Steps**:
1. **Incident detail view** opens
   - State: Loading (fetching timeline), Loaded (ready to investigate), Error
   - User sees: Incident summary, list of related alerts, timeline of events

2. **Timeline view** shows chronological events
   - State: Scrolling/Exploring (analyst browsing events)
   - User actions: 
     - Click event for details
     - Filter timeline (by type: endpoint, network, cloud, etc.)
     - Group events (by asset, user, threat type)

3. **Analyst notes & collaboration**
   - State: Viewing notes, Editing notes, Submitting notes
   - User actions: Add notes, tag team members, assign incident to response team

4. **Playbook view** shows remediation steps
   - State: Viewing playbook, Executing steps (mark step complete)
   - User actions: Click "Execute" for one-click remediation (disable account, isolate host, etc.)

**Terminal state**:
- Incident marked "Resolved" or "False Positive" and removed from active queue

---

### Journey 3: Review Team Health (Manager Workflow)

**Actor**: Security Manager  
**Trigger**: Manager logs in; views "Team Metrics" view  
**Goal**: Understand team capacity, alert quality, and alert rule performance  
**Time budget**: 5–15 minutes (daily check-in)

**Steps**:
1. **Dashboard view** shows health overview
   - Metrics cards: Alerts received (24h), MTTR, Resolution rate, Analyst utilization
   - Trends: Alert volume over time, Top firing rules
   - Team status: Who is online, workload distribution

2. **Drill into noisy rules**
   - Manager clicks "Alert Health" section
   - System shows top 10 rules by alert volume, ranked by false positive rate
   - Manager clicks a rule to see: Sample alerts, false positive rate, analyst feedback

3. **Adjust rule thresholds or disable**
   - Manager adjusts threshold (e.g., "Failed logins > 10/minute" instead of "> 3")
   - System requires confirmation ("This will suppress ~50 alerts/day")
   - Changes take effect immediately; system logs who changed what and when

**Terminal state**:
- Manager returns to dashboard to monitor impact of rule change

---

## Dashboard Hierarchy & Prioritization Logic

### Risk Score Calculation

**Risk Score** (0–100) combines:
1. **Alert severity** (30%): critical=90, high=70, medium=40, low=20
2. **Asset criticality** (30%): critical asset multiplier = 1.5x
3. **Threat intel match** (20%): known malware family, APT indicator, etc.
4. **Behavioral anomaly** (20%): user activity unusual for time/location/role

**Example**:
- Alert: Failed logins from unusual IP
- Severity: Medium (60 points, 30% = 18 pts)
- Asset: Production database (critical, +50%, = 27 pts)
- Threat intel: IP not in threat database (0 pts)
- Behavioral: User normally in office; alert at 2am from overseas IP (+25 pts)
- **Total: 70/100** → Ranked high in queue

### Prioritization Rules

1. **Critical & high severity**: Always at top
   - Even if recent (false positives still require triage decision)
   
2. **Medium & low severity**: Ranked by risk score
   - Asset criticality and behavioral anomaly can elevate a "low" alert
   
3. **Related alerts**: Grouped or deduplicated
   - If same rule fires 5 times for same user in 5 minutes, show as 1 alert with "5 occurrences"
   
4. **Analyst feedback**: Influences future ranking
   - If analyst marks alerts from rule X as "false positive" 80% of the time, lower future risk scores for that rule

### Information Density & Scanability

**Goal**: Show enough information to triage in <30 seconds; avoid overwhelming the user

**Alert list density**:
- Desktop (1440px): 8 columns; 12–15 alerts visible without scrolling
- Tablet (768px): 4 columns; 8–10 alerts visible
- Mobile (375px): 1 column; 3–5 alerts visible

**Alert card elements** (each row/card shows):
- Risk score indicator (large, color-coded)
- Alert title (single line; truncate if needed)
- Severity badge (icon + color)
- Asset name (hostname or IP)
- Timestamp (relative, e.g., "2 minutes ago")
- Status (new, investigating, dismissed, etc.)

**Optional details** (shown on hover or click):
- Rule name, description
- Affected user (AD username)
- Related incidents count
- Last analyst action

---

## Visualization Choices & Rationale

### Alert Queue (Table + Risk Cards)

**Choice**: Ranked table with risk score indicator  
**Why**:
- Table format familiar to analysts (they use Excel, SIEM tables daily)
- Risk score prominently shown (large number or color gradient)
- Sortable columns allow re-ranking (by time, severity, asset, etc.)
- Alternative rejected: "Card wall" (too much whitespace on dense dashboards)

### Timeline (Incident Investigation)

**Choice**: Vertical scrollable timeline with color-coded event types  
**Why**:
- Chronological order is critical for incident investigation
- Color coding (red=endpoint, blue=network, green=cloud, etc.) allows quick pattern spotting
- Event grouping (by asset, user, threat type) allows analyst to filter noise
- Hover details show event metadata without modal
- Alternative rejected: "Heat map" (poor for temporal investigation)

### Alert Volume Trends (Manager View)

**Choice**: Area chart showing alert volume over last 7 days, with rule breakdown  
**Why**:
- Area chart shows total volume at a glance
- Stacked areas (different rules in different colors) show which rules are noisiest
- Trend line shows if volume is increasing/decreasing
- Click on area to drill into specific rule
- Alternative rejected: "Bar chart" (harder to see daily trend)

### Rule False Positive Rate (Manager Tuning View)

**Choice**: Bar chart showing false positive rate (0–100%) for top 20 rules  
**Why**:
- Bars are easy to compare (analyst feedback: "which rules are noisiest?")
- Color coding: green=low FP rate (<10%), yellow=medium (10–40%), red=high (>40%)
- Sort by FP rate to identify top tuning targets
- Alternative rejected: "Table with percentages" (bars are faster to scan)

### Heatmap (Analyst Workload per Hour)

**Choice**: 24-hour heatmap showing alert volume per hour of day  
**Why**:
- Shows when team is busiest (e.g., 9am spike from batch jobs)
- Color intensity = alert volume; identifies slow vs. busy periods
- Helps manager schedule analyst shifts
- Alternative rejected: "Line chart" (heatmap is more scannable)

---

## Design System Direction

### Color Semantics

**Purpose**: Support color-blind users; avoid relying on color alone for meaning

**Color palette**:
- **Red (#EF4444)**: Critical severity, high risk, requires immediate action
- **Orange (#F97316)**: High severity, elevated risk, investigate soon
- **Yellow (#FACC15)**: Medium severity, moderate risk, triage needed
- **Blue (#3B82F6)**: Informational, neutral status (e.g., alert acknowledged)
- **Green (#22C55E)**: Success, resolved state, false positive dismissed
- **Gray (#6B7280)**: Disabled rules, archived alerts, low priority

**Icon + color together**:
- Critical = Red octagon icon + "CRITICAL" text
- High = Orange triangle icon + "HIGH" text
- etc.
- **Never use color alone** for meaning; always pair with icon, text, or shape

### Typography

**Font stack**: 
- Sans-serif: Inter (primary body copy)
- Monospace: Geist Mono (alert details, timestamps, code snippets)

**Hierarchy**:
- **Page title**: 28px, bold, dark text
- **Section header**: 18px, semibold, dark text
- **Card title**: 14px, semibold, dark text
- **Body copy**: 14px, regular, medium-gray text
- **Meta/secondary**: 12px, regular, light-gray text
- **Timestamp**: 12px, monospace, light-gray text

**Rationale**: Large primary titles anchor user context; secondary text is deferential but scannable

### Component Behavior & Interaction

#### Button States

- **Default**: Filled background, dark text
- **Hover**: Slight background brighten; pointer shows action available
- **Active/Pressed**: Darker background; shows pressed state
- **Disabled**: Gray background, disabled text; pointer shows unavailable

**Triage decision buttons** (large, primary actions):
- "Dismiss as benign" (green background, checkmark icon)
- "Investigate" (orange background, magnifying glass icon)
- "Remediate" (red background, shield icon)

#### Modal & Panel Behavior

- **Alert detail panel**: Slides in from right; can be dismissed with X or Escape
- **Incident investigation**: Full-screen modal or side panel (depends on screen size)
- **Playbook execution**: Modal with step-by-step walkthrough; each step has "Complete" button

#### Dropdown & Select Behavior

- **Status filter**: Click dropdown → show filter options → click option to filter → dropdown closes
- **Rule threshold editor**: Click rule → inline editor appears → change value → click Save → confirmation message

### Responsive Behavior

#### Desktop (1440×900 and larger)

- Two-column layout: Alert queue (left, 60%) + alert detail panel (right, 40%)
- Sidebar navigation always visible on left
- Metrics cards in 3-column grid

#### Tablet (768×1024)

- Single-column layout; alert list above, detail below
- Sidebar collapses to hamburger menu
- Metrics cards in 2-column grid
- Detail panel slides up from bottom (not from right)

#### Mobile (375×812)

- Single-column layout; full-screen views
- Alert list is primary view; click alert to open full-screen detail
- Sidebar navigation is hamburger menu (top-left)
- Metrics cards stack vertically (1 column)
- Swipe left/right to navigate between alerts (if multiple alerts in queue)

### Accessibility

**WCAG 2.1 Level AA compliance**:

1. **Color contrast**: All text meets 4.5:1 ratio (normal) or 3:1 (large text)
   - Background: Light mode (#FFFFFF), Dark mode (#1F2937)
   - Text: Dark mode (#F3F4F6), Light mode (#111827)

2. **Keyboard navigation**:
   - Tab order: Follows reading order (left to right, top to bottom)
   - Enter/Space: Activate buttons
   - Escape: Close modals and panels
   - Arrow keys: Navigate lists (Up/Down to select alert; Left/Right to navigate pages)

3. **Focus indicators**: Clear blue outline (3px) on focused elements
   - Visible in light and dark mode
   - Not removed on keyboard focus (bad practice; breaks accessibility)

4. **Screen reader support**:
   - Buttons have descriptive labels: "Dismiss alert as benign" (not "OK")
   - Form fields have labels: `<label htmlFor="threshold">Failed login threshold</label>`
   - Alerts use `role="alert"` for dynamic content (new alerts appearing)
   - Tables use `<th>` headers and `<caption>` for structure

5. **Motion & animation**:
   - No autoplay animations
   - Respect `prefers-reduced-motion` CSS media query
   - Animations are decorative (not required to understand the UI)

---

## Loading, Empty, and Error States

### Loading State (Alert Queue)

**Visual**:
- Alert list shows skeleton placeholders (shimmer effect)
- "Loading alerts..." message at top
- Spinner icon

**Duration**: Should load within 500ms; if >2s, show tooltip "This is taking longer than usual"

### Empty State (No Alerts)

**Visual**:
- Large icon (empty inbox or checkmark)
- Headline: "No alerts to review"
- Subheading: "Great job! Your queue is clear. All alerts are either dismissed or investigating."
- Action: "See archived alerts from last 24h" (link)

**When shown**:
- First load (no alerts in system)
- After analyst triages all alerts in queue
- After manager applies strict rule filters

### Error State (Alert Context Unavailable)

**Visual**:
- Alert shows in queue (don't hide errors)
- Alert detail panel shows warning banner: "Some context unavailable (network error or slow API)"
- Show partial data (alert summary available; related events/threat intel unavailable)
- Action: "Retry" button or "View in source tool" link (open Crowdstrike, Datadog, etc.)

**User action**: Analyst can still triage alert (Dismiss, Investigate) even if context is incomplete

### High-Attention States

**Critical Alert**:
- Large red icon + "CRITICAL" badge
- Alert appears at top of queue (always first)
- Optional: Audio notification (if enabled in settings)
- Pulsing animation (subtle, respects motion preferences)

**Incident Assigned to Me**:
- Badge appears on "Incidents" navigation (shows count)
- Incident card shows assignee and assignment time
- Team member can click "Open incident" to jump to detail

---

## Implementation Details

### State Management

**Alert Queue State**:
- `alerts`: Alert[]
- `selectedAlert`: Alert | null (which alert is detail panel showing)
- `filter`: { severity, status, assignedTo } (current filters)
- `sortBy`: "riskScore" | "timestamp" | "severity"

**Incident State**:
- `incidents`: Incident[]
- `selectedIncident`: Incident | null
- `timeline`: Event[] (all events in incident)

**Manager Metrics State**:
- `healthMetrics`: { mttr, resolutionRate, falsePositiveRate, etc. }
- `rules`: Rule[] (all rules with their stats)

**Persistence**: Use localStorage for UI state (selected tab, expanded sections, column widths)

### Performance Considerations

1. **Alert list virtualization**: Only render visible alerts (use React window or similar)
   - Support 1000+ alerts in queue without slowdown
   
2. **Lazy load details**: Alert detail panel loads context on-demand
   - Show alert summary immediately; fetch related events/threat intel in background
   
3. **Dedup alerts**: Server-side; client never sees duplicate alerts
   - Frontend assumes alert list is already deduplicated
   
4. **Pagination or infinite scroll**: 
   - Initial load: top 50 alerts
   - Scroll to bottom: load next 50
   - or: Use pagination buttons (5 alerts per page)

### Interactions with Real Data Feedback Loop

1. **Analyst marks alert false positive** → System captures this → Stores feedback → Rule's FP rate is updated
2. **Rule FP rate increases** → Manager sees rule is noisy → Manager adjusts threshold
3. **Manager adjusts threshold** → System logs change → Future alerts from that rule are suppressed → Queue becomes quieter

---

## How the Implementation Demonstrates the PRD's Differentiator

### Core Differentiator: Intelligent Alert Reduction + Guided Triage

**How the demo shows this**:

1. **Risk-based prioritization** (vs. time-based)
   - Queue shows alerts ranked by risk score, not arrival time
   - Manager can drill into why an alert is ranked high
   - Demonstrates: "Real threats bubble to top; noise sinks"

2. **Pre-fetched context** (vs. 5-click investigation)
   - Alert detail panel shows related activity, asset info, threat intel in one view
   - No clicks to source tool or external system
   - Demonstrates: "Analyst can triage in <30 seconds"

3. **Guided triage workflow** (vs. freestyle alert clicking)
   - Three clear options: Dismiss, Investigate, Remediate
   - Decision is obvious; minimal cognitive load
   - Demonstrates: "Even junior analysts can triage effectively"

4. **Rule tuning feedback loop** (vs. static, untuned rules)
   - Analyst marks alert false positive
   - Manager can see FP rate and adjust rule threshold
   - Future alerts are suppressed
   - Demonstrates: "Quality improves over time; alert noise decreases"

5. **Incident investigation with timeline** (vs. scattered logs)
   - Click "Investigate" → incident view shows all related activity in chronological order
   - Analyst can immediately see scope and pattern
   - Demonstrates: "Investigation is fast and systematic"

### Design Choices That Support Differentiation

- **Alert list is the hero**: Largest real estate; ranked by risk (not time)
- **Alert detail panel is context-rich**: No external tool access needed
- **Manager metrics are visible**: Enables rule tuning feedback loop
- **Playbooks are available**: One-click remediation (future-proof for SOAR integration)

