"use client"

import { useState } from "react"
import { AlertCircle, ChevronDown, ChevronRight, Eye, EyeOff } from "lucide-react"
import {
  demoAlerts,
  demoIncidents,
  demoRules,
  formatTime,
  getRiskColor,
  type Alert,
  type Incident,
  type Rule,
} from "./data"
import "./styles.css"

function getInitialView(): "triage" | "incident" | "metrics" {
  if (typeof window === "undefined") {
    return "triage"
  }
  const saved = localStorage.getItem("alertflow-view")
  if (saved === "triage" || saved === "incident" || saved === "metrics") {
    return saved
  }
  return "triage"
}

export default function AlertFlowDashboard() {
  const [view, setView] = useState<"triage" | "incident" | "metrics">(getInitialView)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(demoAlerts[0])
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [alerts, setAlerts] = useState(demoAlerts)
  const [incidents, setIncidents] = useState(demoIncidents)
  const [expandedRule, setExpandedRule] = useState<string | null>(null)
  const [analyticsVisible, setAnalyticsVisible] = useState(true)

  const handleTriage = (alertId: string, action: "dismiss" | "investigate" | "remediate") => {
    // Update alert status
    setAlerts(
      alerts.map((a) =>
        a.id === alertId
          ? {
              ...a,
              status: action === "dismiss" ? "false_positive" : action === "investigate" ? "investigating" : "resolved",
            }
          : a,
      ),
    )

    // Find next new alert
    const nextAlert = alerts.find((a) => a.id !== alertId && a.status === "new")
    if (nextAlert) {
      setSelectedAlert(nextAlert)
    } else {
      setSelectedAlert(null)
    }

    // If investigating, create/show incident
    if (action === "investigate") {
      const incident: Incident = {
        id: `incident-${Date.now()}`,
        title: `Investigation: ${alerts.find((a) => a.id === alertId)?.title}`,
        status: "open",
        severity: alerts.find((a) => a.id === alertId)?.severity || "medium",
        alertIds: [alertId],
        timelineEvents: [],
        notes: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setIncidents([...incidents, incident])
      setSelectedIncident(incident)
      setView("incident")
    }
  }

  const newAlertsCount = alerts.filter((a) => a.status === "new").length
  const investigatingCount = alerts.filter((a) => a.status === "investigating").length
  const resolvedCount = alerts.filter((a) => a.status !== "new").length

  return (
    <div className="alertflow-container">
      {/* Header */}
      <header className="alertflow-header">
        <div className="alertflow-header-content">
          <div>
            <h1 className="alertflow-title">AlertFlow</h1>
            <p className="alertflow-subtitle">Triage-First Security Dashboard (DEMO DATA)</p>
          </div>
          <div className="alertflow-header-status">
            <div className="status-badge new">
              <span>{newAlertsCount}</span> New
            </div>
            <div className="status-badge investigating">
              <span>{investigatingCount}</span> Investigating
            </div>
            <div className="status-badge resolved">
              <span>{resolvedCount}</span> Resolved
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="alertflow-nav">
          <button
            className={`nav-item ${view === "triage" ? "active" : ""}`}
            onClick={() => {
              setView("triage")
              localStorage.setItem("alertflow-view", "triage")
            }}
          >
            Triage Queue
          </button>
          <button
            className={`nav-item ${view === "incident" ? "active" : ""}`}
            onClick={() => {
              setView("incident")
              localStorage.setItem("alertflow-view", "incident")
            }}
          >
            Incidents {investigatingCount > 0 && `(${investigatingCount})`}
          </button>
          <button
            className={`nav-item ${view === "metrics" ? "active" : ""}`}
            onClick={() => {
              setView("metrics")
              localStorage.setItem("alertflow-view", "metrics")
            }}
          >
            Team Metrics & Rules
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="alertflow-main">
        {view === "triage" && <TriageView alert={selectedAlert} onTriage={handleTriage} alerts={alerts.filter((a) => a.status === "new")} onSelectAlert={setSelectedAlert} />}

        {view === "incident" && <IncidentView incident={selectedIncident} incidents={incidents} onSelectIncident={setSelectedIncident} />}

        {view === "metrics" && (
          <MetricsView
            rules={demoRules}
            alerts={alerts}
            expandedRule={expandedRule}
            onExpandRule={setExpandedRule}
            analyticsVisible={analyticsVisible}
            onToggleAnalytics={() => setAnalyticsVisible(!analyticsVisible)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="alertflow-footer">
        <p>
          This is a demo environment with synthetic data. No actual threats are present. Data persists in browser localStorage. Click &quot;Triage Queue&quot; to begin.
        </p>
      </footer>
    </div>
  )
}

// Triage View Component
function TriageView({
  alert,
  onTriage,
  alerts,
  onSelectAlert,
}: {
  alert: Alert | null
  onTriage: (id: string, action: "dismiss" | "investigate" | "remediate") => void
  alerts: Alert[]
  onSelectAlert: (alert: Alert) => void
}) {
  return (
    <div className="triage-view">
      {/* Alert Queue List */}
      <div className="alert-queue">
        <div className="queue-header">
          <h2>Alert Queue ({alerts.length} new)</h2>
          <p className="queue-subtitle">Ranked by risk score (highest first)</p>
        </div>

        <div className="alert-list">
          {alerts.length === 0 ? (
            <div className="empty-state">
              <AlertCircle className="empty-icon" />
              <h3>No new alerts</h3>
              <p>Your queue is clear. Great job!</p>
            </div>
          ) : (
            alerts
              .sort((a, b) => b.riskScore - a.riskScore)
              .map((a) => (
                <div
                  key={a.id}
                  className={`alert-card ${alert?.id === a.id ? "selected" : ""}`}
                  onClick={() => onSelectAlert(a)}
                >
                  <div className="alert-risk">
                    <div className="risk-score" style={{ backgroundColor: getRiskColor(a.riskScore) }}>
                      {a.riskScore}
                    </div>
                  </div>
                  <div className="alert-content">
                    <div className="alert-title">{a.title}</div>
                    <div className="alert-meta">
                      <span className={`severity-badge ${a.severity}`}>{a.severity.toUpperCase()}</span>
                      <span className="asset-name">{a.context.asset.hostname}</span>
                      <span className="timestamp">{formatTime(a.timestamp)}</span>
                    </div>
                  </div>
                  <div className="alert-indicator">{alert?.id === a.id ? <ChevronRight /> : null}</div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Alert Detail Panel */}
      {alert ? (
        <div className="alert-detail-panel">
          <div className="detail-header">
            <h2>Alert Details</h2>
          </div>

          <div className="detail-content">
            {/* Summary */}
            <section className="detail-section">
              <h3>Summary</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <label>Title</label>
                  <p className="summary-value">{alert.title}</p>
                </div>
                <div className="summary-item">
                  <label>Description</label>
                  <p className="summary-value">{alert.description}</p>
                </div>
                <div className="summary-item">
                  <label>Risk Score</label>
                  <div className="risk-badge" style={{ backgroundColor: getRiskColor(alert.riskScore) }}>
                    {alert.riskScore}/100
                  </div>
                </div>
                <div className="summary-item">
                  <label>Severity</label>
                  <span className={`severity-badge ${alert.severity}`}>{alert.severity.toUpperCase()}</span>
                </div>
                <div className="summary-item">
                  <label>Time</label>
                  <p className="summary-value">{alert.timestamp.toLocaleString()}</p>
                </div>
                <div className="summary-item">
                  <label>Source</label>
                  <p className="summary-value">{alert.sourceId.toUpperCase()}</p>
                </div>
              </div>
            </section>

            {/* Asset Information */}
            <section className="detail-section">
              <h3>Asset Information</h3>
              <div className="context-grid">
                <div className="context-item">
                  <label>Hostname</label>
                  <p>{alert.context.asset.hostname}</p>
                </div>
                <div className="context-item">
                  <label>IP Address</label>
                  <p className="font-mono">{alert.context.asset.ip}</p>
                </div>
                <div className="context-item">
                  <label>Operating System</label>
                  <p>{alert.context.asset.os}</p>
                </div>
                <div className="context-item">
                  <label>Asset Criticality</label>
                  <span className={`criticality-badge ${alert.context.asset.criticality}`}>
                    {alert.context.asset.criticality.toUpperCase()}
                  </span>
                </div>
              </div>
            </section>

            {/* User Information */}
            {alert.context.user && (
              <section className="detail-section">
                <h3>User Information</h3>
                <div className="context-grid">
                  <div className="context-item">
                    <label>Username</label>
                    <p>{alert.context.user.username}</p>
                  </div>
                  <div className="context-item">
                    <label>Email</label>
                    <p>{alert.context.user.email}</p>
                  </div>
                  <div className="context-item">
                    <label>Department</label>
                    <p>{alert.context.user.department}</p>
                  </div>
                  <div className="context-item">
                    <label>Privileged Account</label>
                    <p>{alert.context.user.isPrivileged ? "Yes" : "No"}</p>
                  </div>
                </div>
              </section>
            )}

            {/* Threat Intelligence */}
            {alert.context.threatIntel && alert.context.threatIntel.length > 0 && (
              <section className="detail-section">
                <h3>Threat Intelligence</h3>
                <div className="threat-list">
                  {alert.context.threatIntel.map((t, i) => (
                    <div key={i} className="threat-item">
                      {t}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related Activity */}
            <section className="detail-section">
              <h3>Related Activity</h3>
              <p className="activity-summary">{alert.context.relatedEventCount} related events in the last 24 hours</p>
              <button className="link-button">View timeline →</button>
            </section>

            {/* Triage Decision */}
            <section className="detail-section triage-section">
              <h3>Triage Decision</h3>
              <p className="triage-prompt">Is this alert a real threat, false positive, or needs investigation?</p>
              <div className="triage-buttons">
                <button className="triage-btn dismiss" onClick={() => onTriage(alert.id, "dismiss")}>
                  <span className="btn-check">✓</span>
                  <div className="btn-text">
                    <div className="btn-label">Dismiss</div>
                    <div className="btn-desc">False positive or benign</div>
                  </div>
                </button>
                <button className="triage-btn investigate" onClick={() => onTriage(alert.id, "investigate")}>
                  <span className="btn-icon">🔍</span>
                  <div className="btn-text">
                    <div className="btn-label">Investigate</div>
                    <div className="btn-desc">Needs further review</div>
                  </div>
                </button>
                <button className="triage-btn remediate" onClick={() => onTriage(alert.id, "remediate")}>
                  <span className="btn-shield">🛡️</span>
                  <div className="btn-text">
                    <div className="btn-label">Remediate</div>
                    <div className="btn-desc">Execute response</div>
                  </div>
                </button>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="alert-detail-panel empty">
          <div className="empty-state-large">
            <AlertCircle className="empty-icon-large" />
            <h3>No alerts to review</h3>
            <p>Select an alert from the queue or triage all pending alerts</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Incident View Component
function IncidentView({
  incident,
  incidents,
  onSelectIncident,
}: {
  incident: Incident | null
  incidents: Incident[]
  onSelectIncident: (incident: Incident) => void
}) {
  return (
    <div className="incident-view">
      <div className="incident-list">
        <div className="queue-header">
          <h2>Incidents ({incidents.length})</h2>
          <p className="queue-subtitle">Active investigations</p>
        </div>

        <div className="alert-list">
          {incidents.length === 0 ? (
            <div className="empty-state">
              <AlertCircle className="empty-icon" />
              <h3>No incidents</h3>
              <p>Triage alerts to create incidents</p>
            </div>
          ) : (
            incidents.map((inc) => (
              <div
                key={inc.id}
                className={`alert-card incident-card ${incident?.id === inc.id ? "selected" : ""}`}
                onClick={() => onSelectIncident(inc)}
              >
                <div className="alert-risk">
                  <div className="risk-score" style={{ backgroundColor: getRiskColor(70) }}>
                    {inc.severity === "critical" ? 95 : inc.severity === "high" ? 75 : 50}
                  </div>
                </div>
                <div className="alert-content">
                  <div className="alert-title">{inc.title}</div>
                  <div className="alert-meta">
                    <span className={`severity-badge ${inc.severity}`}>{inc.severity.toUpperCase()}</span>
                    <span className="asset-name">{inc.status}</span>
                    <span className="timestamp">{inc.alertIds.length} alerts</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Incident Detail */}
      {incident ? (
        <div className="alert-detail-panel">
          <div className="detail-header">
            <h2>Incident Timeline</h2>
          </div>

          <div className="detail-content">
            <section className="detail-section">
              <h3>Summary</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <label>Title</label>
                  <p className="summary-value">{incident.title}</p>
                </div>
                <div className="summary-item">
                  <label>Status</label>
                  <span className={`status-badge ${incident.status}`}>{incident.status.toUpperCase()}</span>
                </div>
                <div className="summary-item">
                  <label>Severity</label>
                  <span className={`severity-badge ${incident.severity}`}>{incident.severity.toUpperCase()}</span>
                </div>
                <div className="summary-item">
                  <label>Related Alerts</label>
                  <p>{incident.alertIds.length}</p>
                </div>
              </div>
            </section>

            <section className="detail-section">
              <h3>Timeline Events</h3>
              {incident.timelineEvents.length === 0 ? (
                <p className="timeline-empty">Loading events from related alerts...</p>
              ) : (
                <div className="timeline">
                  {incident.timelineEvents.map((event) => (
                    <div key={event.id} className="timeline-event">
                      <div className={`event-marker ${event.severity}`} />
                      <div className="event-content">
                        <div className="event-time">{event.timestamp.toLocaleTimeString()}</div>
                        <div className="event-type">{event.type}</div>
                        <div className="event-details">{event.details}</div>
                        <div className="event-source">Source: {event.source}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="detail-section">
              <h3>Investigation Notes</h3>
              <textarea className="notes-input" placeholder="Add investigation notes here..." defaultValue={incident.notes} />
            </section>

            <section className="detail-section">
              <h3>Recommended Response</h3>
              <div className="playbook-steps">
                <div className="step">
                  <span className="step-num">1</span>
                  <span>Verify threat by reviewing timeline and user behavior</span>
                </div>
                <div className="step">
                  <span className="step-num">2</span>
                  <span>If confirmed, reset user password and review recent access</span>
                </div>
                <div className="step">
                  <span className="step-num">3</span>
                  <span>Check for lateral movement or data exfiltration</span>
                </div>
                <div className="step">
                  <span className="step-num">4</span>
                  <span>Document findings and close incident</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="alert-detail-panel empty">
          <div className="empty-state-large">
            <AlertCircle className="empty-icon-large" />
            <h3>No incident selected</h3>
            <p>Click on an incident to view details and timeline</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Metrics View Component
function MetricsView({
  rules,
  alerts,
  expandedRule,
  onExpandRule,
  analyticsVisible,
  onToggleAnalytics,
}: {
  rules: Rule[]
  alerts: Alert[]
  expandedRule: string | null
  onExpandRule: (id: string | null) => void
  analyticsVisible: boolean
  onToggleAnalytics: () => void
}) {
  const mttr = 45 // minutes
  const resolutionRate = 0.92
  const falsePositiveRate = 0.54

  return (
    <div className="metrics-view">
      <div className="metrics-content">
        <div className="metrics-header">
          <h2>Team Metrics & Rule Health</h2>
          <button className="toggle-analytics" onClick={onToggleAnalytics} title="Toggle analytics visibility">
            {analyticsVisible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        {analyticsVisible && (
          <>
            {/* Key Metrics Cards */}
            <section className="metrics-cards">
              <div className="metric-card">
                <div className="metric-label">Alerts (24h)</div>
                <div className="metric-value">{alerts.length}</div>
                <div className="metric-detail">↓ 15% vs yesterday</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Mean Time to Respond</div>
                <div className="metric-value">{mttr}m</div>
                <div className="metric-detail">↓ 10% improvement</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Resolution Rate</div>
                <div className="metric-value">{(resolutionRate * 100).toFixed(0)}%</div>
                <div className="metric-detail">↑ 5% improvement</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">False Positive Rate</div>
                <div className="metric-value">{(falsePositiveRate * 100).toFixed(0)}%</div>
                <div className="metric-detail">↓ 8% improvement</div>
              </div>
            </section>

            {/* Alert Trend */}
            <section className="metrics-section">
              <h3>Alert Volume (Last 7 Days)</h3>
              <div className="alert-trend">
                <div className="trend-bar" style={{ height: "30%", opacity: 0.6 }} title="Day 1: 245 alerts" />
                <div className="trend-bar" style={{ height: "45%", opacity: 0.7 }} title="Day 2: 312 alerts" />
                <div className="trend-bar" style={{ height: "55%", opacity: 0.8 }} title="Day 3: 385 alerts" />
                <div className="trend-bar" style={{ height: "35%", opacity: 0.6 }} title="Day 4: 278 alerts" />
                <div className="trend-bar" style={{ height: "40%", opacity: 0.7 }} title="Day 5: 298 alerts" />
                <div className="trend-bar" style={{ height: "25%", opacity: 0.5 }} title="Day 6: 186 alerts" />
                <div className="trend-bar" style={{ height: "20%", opacity: 0.4 }} title="Day 7 (today): 142 alerts" />
              </div>
              <div className="trend-labels">
                <span>7d ago</span>
                <span>Today</span>
              </div>
            </section>
          </>
        )}

        {/* Rule Health */}
        <section className="metrics-section">
          <h3>Rule Health (False Positive Rates)</h3>
          <p className="section-subtitle">Click to adjust thresholds or disable rules</p>

          <div className="rules-grid">
            {rules
              .sort((a, b) => b.alertCount24h - a.alertCount24h)
              .map((rule) => (
                <div key={rule.id} className={`rule-card ${expandedRule === rule.id ? "expanded" : ""}`}>
                  <div className="rule-header" onClick={() => onExpandRule(expandedRule === rule.id ? null : rule.id)}>
                    <div className="rule-title-section">
                      <span className="rule-toggle">{expandedRule === rule.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
                      <div className="rule-info">
                        <div className="rule-name">{rule.name}</div>
                        <div className="rule-stats">
                          {rule.alertCount24h} alerts • {(rule.falsePositiveRate * 100).toFixed(0)}% FP rate
                        </div>
                      </div>
                    </div>
                    <div className={`fp-badge ${rule.falsePositiveRate > 0.7 ? "high" : rule.falsePositiveRate > 0.4 ? "medium" : "low"}`}>
                      {(rule.falsePositiveRate * 100).toFixed(0)}%
                    </div>
                  </div>

                  {expandedRule === rule.id && (
                    <div className="rule-details">
                      <p className="rule-desc">{rule.description}</p>
                      <div className="rule-actions">
                        <button className="action-btn">Adjust Threshold</button>
                        <button className="action-btn secondary">{rule.enabled ? "Disable Rule" : "Enable Rule"}</button>
                        <button className="action-btn secondary">View Sample Alerts</button>
                      </div>
                      <div className="rule-feedback">
                        <p className="feedback-label">Analyst Feedback:</p>
                        <p className="feedback-text">
                          {rule.falsePositiveRate > 0.7
                            ? "Most analysts mark these as false positives. Consider raising threshold or adding exceptions."
                            : "Reasonable false positive rate. Consider tuning after analyzing more samples."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  )
}
