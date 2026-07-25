"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import styles from "../assay.module.css"
import { formatDateTime, plural, relative } from "../lib/format"
import { STATE_META } from "../lib/scoring"
import { LOG_SOURCES, NOW, TENANT } from "../lib/seed"
import {
  DEFAULT_FILTERS,
  PERMISSIONS,
  actions,
  actorFor,
  applyFilters,
  findingsBlockedBy,
  selectAcceptances,
  selectAudit,
  selectFindings,
  selectLogSources,
  selectOpenQueue,
  selectSummary,
  useMutations,
} from "../lib/store"
import type {
  AssuranceState,
  DerivedFinding,
  Role,
  TabId,
  Tier,
} from "../lib/types"
import { AssuranceQueue } from "./assurance-queue"
import { CommandPalette, type Command } from "./command-palette"
import { CoverageMatrix } from "./coverage-matrix"
import { FindingDrawer } from "./finding-drawer"
import {
  CompositionPanel,
  ConnectorsPanel,
  KpiRow,
  ServiceLevelPanel,
  TelemetryPanel,
} from "./rail"
import { Btn, Panel, cx, useHydrated } from "./primitives"
import { ReportView } from "./report-view"
import { ScenarioReplay } from "./scenario-replay"

const TABS: { id: TabId; label: string; key: string }[] = [
  { id: "assurance", label: "Assurance", key: "1" },
  { id: "coverage", label: "Coverage", key: "2" },
  { id: "scenarios", label: "Scenarios", key: "3" },
  { id: "report", label: "Report", key: "4" },
]

const PAGE_COPY: Record<TabId, { title: string; sub: string }> = {
  assurance: {
    title: "Assurance",
    sub: "What to do now, ranked. Every claim on this page carries an evidence date; anything without one is called assumed, not covered.",
  },
  coverage: {
    title: "Coverage",
    sub: "The technique landscape coloured by what is actually known — not by how many rules exist. Assumed gets a deliberately unrewarding colour, because that is the state the industry miscounts.",
  },
  scenarios: {
    title: "Scenarios",
    sub: "The board's question, answered per step from the current ledger and written in sentences rather than a readiness score.",
  },
  report: {
    title: "Report",
    sub: "Generated from the ledger, not exported from it. Service level, what changed, the accepted-gap register, and the append-only trail.",
  },
}

interface Toast {
  id: number
  text: string
  undo?: () => void
}

export function AssayApp() {
  const m = useMutations()
  const hydrated = useHydrated()
  const { resolvedTheme, setTheme } = useTheme()

  const findings = React.useMemo(() => selectFindings(m), [m])
  const logSources = React.useMemo(() => selectLogSources(m), [m])
  const summary = React.useMemo(() => selectSummary(m, findings), [m, findings])
  const audit = React.useMemo(() => selectAudit(m), [m])
  const acceptances = React.useMemo(() => selectAcceptances(m), [m])
  const actor = actorFor(m.role)
  const perms = PERMISSIONS[m.role]

  const openQueue = React.useMemo(() => selectOpenQueue(findings), [findings])
  const rows = React.useMemo(
    () => applyFilters(openQueue, m.filters, actor),
    [openQueue, m.filters, actor]
  )

  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [selection, setSelection] = React.useState<string[]>([])
  const [cursor, setCursor] = React.useState(0)
  const [paletteOpen, setPaletteOpen] = React.useState(false)
  const [helpOpen, setHelpOpen] = React.useState(false)
  const [toasts, setToasts] = React.useState<Toast[]>([])
  const [settling, setSettling] = React.useState<string[]>([])
  const toastSeq = React.useRef(0)

  const selectedFinding =
    findings.find((f) => f.id === selectedId) ?? null

  const dependents = React.useMemo(() => {
    const out: Record<string, number> = {}
    for (const source of LOG_SOURCES) {
      out[source.id] = findings.filter((f) =>
        f.analytics.some((a) => a.analytic.logSourceIds.includes(source.id))
      ).length
    }
    return out
  }, [findings])

  const blockedSiblings = React.useMemo(() => {
    if (!selectedFinding || selectedFinding.blockingLogSourceIds.length === 0) {
      return []
    }
    return findingsBlockedBy(findings, selectedFinding.blockingLogSourceIds[0])
  }, [findings, selectedFinding])

  const pushToast = React.useCallback((text: string, undo?: () => void) => {
    toastSeq.current += 1
    const id = toastSeq.current
    setToasts((prev) => [...prev, { id, text, undo }].slice(-3))
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 6000)
  }, [])

  const markSettling = React.useCallback((ids: string[]) => {
    setSettling(ids)
    window.setTimeout(() => setSettling([]), 320)
  }, [])

  /* ---------------------------------------------------------------- actions */

  const drawerActions = React.useMemo(
    () => ({
      assign: (ids: string[], owner: string, dueAt: number) => {
        const labels = Object.fromEntries(
          findings.map((f) => [f.id, f.technique.id])
        )
        actions.assign(ids, owner, dueAt, m.role, labels)
        markSettling(ids)
        pushToast(
          `${plural(ids.length, "finding")} assigned to ${owner}, due ${relative(dueAt, NOW)}.`,
          () => actions.undo()
        )
        setSelection([])
      },
      validate: (input: Parameters<typeof actions.recordValidation>[0]) => {
        actions.recordValidation(input, m.role)
        markSettling([`F-${input.techniqueId}`])
        pushToast(
          input.result === "alerted"
            ? `${input.testId} recorded as alerted. ${input.techniqueId} is now verified, and the freshness clock has restarted.`
            : `${input.testId} recorded as ${input.result}. That is evidence of a defect, so ${input.techniqueId} stays out of verified. Validation records cannot be undone.`
        )
        setSelectedId(null)
      },
      requestAcceptance: (
        input: Parameters<typeof actions.requestAcceptance>[0]
      ) => {
        actions.requestAcceptance(input, m.role)
        pushToast(
          `Acceptance requested for ${input.techniqueId}. It needs approval from someone other than ${actor} before it counts.`
        )
      },
      approveAcceptance: (findingId: string) => {
        actions.approveAcceptance(findingId, m.role)
        markSettling([findingId])
        pushToast(
          `Acceptance approved and written to the audit trail. Approvals cannot be undone.`
        )
        setSelectedId(null)
      },
      withdrawAcceptance: (findingId: string) => {
        actions.withdrawAcceptance(findingId, m.role)
        pushToast(`Acceptance withdrawn. The finding returns to the queue.`)
      },
      restoreTelemetry: (logSourceId: string) => {
        const affected = findingsBlockedBy(findings, logSourceId)
        actions.restoreLogSource(
          logSourceId,
          affected.map((f) => f.id),
          m.role
        )
        markSettling(affected.map((f) => f.id))
        pushToast(
          `${logSourceId} restored. One fix cleared ${plural(affected.length, "finding")}.`,
          () => actions.undo()
        )
        setSelectedId(null)
      },
    }),
    [actor, findings, m.role, markSettling, pushToast]
  )

  const openFinding = React.useCallback((finding: DerivedFinding) => {
    setSelectedId(finding.id)
  }, [])

  /* -------------------------------------------------------------- shortcuts */

  const commands: Command[] = React.useMemo(
    () => [
      ...TABS.map((t) => ({
        id: `tab-${t.id}`,
        label: `Go to ${t.label}`,
        kind: "navigate",
        run: () => actions.setTab(t.id),
      })),
      ...(["engineer", "manager", "auditor"] as Role[]).map((r) => ({
        id: `role-${r}`,
        label: `Switch role to ${PERMISSIONS[r].label}`,
        kind: "role",
        run: () => actions.setRole(r),
      })),
      {
        id: "density",
        label: `Density: switch to ${m.density === "comfortable" ? "compact" : "comfortable"}`,
        kind: "view",
        run: () =>
          actions.setDensity(
            m.density === "comfortable" ? "compact" : "comfortable"
          ),
      },
      {
        id: "theme",
        label: `Theme: switch to ${resolvedTheme === "dark" ? "light" : "dark"}`,
        kind: "view",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "clear",
        label: "Clear all queue filters",
        kind: "view",
        run: () => actions.clearFilters(),
      },
      {
        id: "broken",
        label: "Filter queue to broken findings",
        kind: "view",
        run: () => {
          actions.setTab("assurance")
          actions.setFilters({ state: "broken" })
        },
      },
      {
        id: "help",
        label: "Show keyboard shortcuts",
        kind: "help",
        run: () => setHelpOpen(true),
      },
      {
        id: "reset",
        label: "Reset demo data to the seed",
        kind: "demo",
        run: () => {
          actions.reset()
          pushToast("Demo reset. Every decision from this session is cleared.")
        },
      },
    ],
    [m.density, pushToast, resolvedTheme, setTheme]
  )

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const typing =
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT"

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setPaletteOpen((v) => !v)
        return
      }
      if (event.key === "Escape") {
        setPaletteOpen(false)
        setHelpOpen(false)
        return
      }
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return
      if (paletteOpen || selectedId) return

      if (event.key === "?") {
        event.preventDefault()
        setHelpOpen((v) => !v)
        return
      }
      const tab = TABS.find((t) => t.key === event.key)
      if (tab) {
        event.preventDefault()
        actions.setTab(tab.id)
        return
      }
      if (m.tab !== "assurance") return

      if (event.key === "ArrowDown" || event.key === "j") {
        event.preventDefault()
        setCursor((c) => Math.min(c + 1, rows.length - 1))
      } else if (event.key === "ArrowUp" || event.key === "k") {
        event.preventDefault()
        setCursor((c) => Math.max(c - 1, 0))
      } else if (event.key === "Enter") {
        const row = rows[Math.min(cursor, rows.length - 1)]
        if (row) {
          event.preventDefault()
          setSelectedId(row.id)
        }
      } else if (event.key === "x") {
        const row = rows[Math.min(cursor, rows.length - 1)]
        if (row) {
          event.preventDefault()
          setSelection((prev) =>
            prev.includes(row.id)
              ? prev.filter((id) => id !== row.id)
              : [...prev, row.id]
          )
        }
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [cursor, m.tab, paletteOpen, rows, selectedId])

  /* ------------------------------------------------------------------ views */

  // The incident worth interrupting for is the one with the widest blast radius,
  // not simply the oldest.
  const topIncident = logSources
    .filter((s) => s.status === "silent" && !m.ackIncidents.includes(s.id))
    .map((s) => ({ source: s, affected: findingsBlockedBy(findings, s.id).length }))
    .sort(
      (a, b) =>
        b.affected - a.affected || a.source.lastEventAt - b.source.lastEventAt
    )[0]?.source
  const incidentAffected = topIncident
    ? findingsBlockedBy(findings, topIncident.id)
    : []

  return (
    <div className={cx(styles.tokens, styles.app)} data-density={m.density}>
      <div className={styles.demoBar}>
        <span className={styles.demoBarTag}>Demo data</span>
        <span className={styles.hideSm}>
          Every technique, analytic, log source and validation record on this page
          is a fixture in this route&apos;s source. No integration is connected and
          nothing here detects anything.
        </span>
        <span className={styles.showSm}>
          Fixtures only. Nothing is connected and nothing here detects anything.
        </span>
        <span className={cx(styles.mono, styles.hideSm)} style={{ marginLeft: "auto" }}>
          {`demo clock ${formatDateTime(NOW)} UTC`}
        </span>
      </div>

      <header className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>
            {"assay"}
            <span>.</span>
          </span>
          <span className={styles.brandTag}>
            {`detection assurance · ${TENANT}`}
          </span>
        </div>

        <nav className={styles.tabs} aria-label="Sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={styles.tab}
              aria-current={m.tab === t.id ? "page" : undefined}
              onClick={() => actions.setTab(t.id)}
            >
              {t.label}
              <span className={cx(styles.tabKey, styles.hideSm)}>{t.key}</span>
            </button>
          ))}
        </nav>

        <span className={styles.spacer} />

        <div className={styles.chromeGroup}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
          >
            <span aria-hidden="true">⌕</span>
            <span className={styles.hideMd}>⌘K</span>
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            data-active={m.density === "compact" ? "true" : undefined}
            aria-pressed={m.density === "compact"}
            onClick={() =>
              actions.setDensity(
                m.density === "comfortable" ? "compact" : "comfortable"
              )
            }
          >
            <span aria-hidden="true">≡</span>
            <span className={styles.hideMd}>
              {m.density === "compact" ? "Compact" : "Comfortable"}
            </span>
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle light and dark theme"
          >
            <span aria-hidden="true">
              {hydrated && resolvedTheme === "dark" ? "☾" : "☀"}
            </span>
          </button>
          <div className={styles.roleSelect}>
            <span
              className={styles.roleDot}
              style={{
                background:
                  m.role === "auditor"
                    ? "var(--assumed)"
                    : m.role === "manager"
                      ? "var(--accepted)"
                      : "var(--verified)",
              }}
              aria-hidden="true"
            />
            <label htmlFor="role" className={styles.srOnly}>
              Acting as
            </label>
            <select
              id="role"
              value={m.role}
              onChange={(e) => actions.setRole(e.target.value as Role)}
            >
              <option value="engineer">Detection engineer</option>
              <option value="manager">Ops manager</option>
              <option value="auditor">Internal audit (read-only)</option>
            </select>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.pageHead}>
          <div>
            <h1 className={styles.h1}>{PAGE_COPY[m.tab].title}</h1>
            <p className={styles.pageSub}>{PAGE_COPY[m.tab].sub}</p>
          </div>
          <span className={styles.micro}>
            {`acting as ${actor} · ${PERMISSIONS[m.role].label}${perms.write ? "" : " · read-only"}`}
          </span>
        </div>

        <div aria-live="polite" className={styles.srOnly}>
          {hydrated
            ? `${summary.verifiedPct}% verified coverage, ${summary.gapPoints} point assurance gap, ${openQueue.length} open findings.`
            : ""}
        </div>

        {helpOpen ? (
          <div style={{ marginBottom: "0.875rem" }}>
            <Panel
              id="help"
              title="Keyboard"
              actions={<Btn onClick={() => setHelpOpen(false)}>Close</Btn>}
            >
              <div className={styles.keyGrid}>
                {[
                  ["↑ ↓ / j k", "move the queue cursor"],
                  ["↵", "open the focused finding"],
                  ["x", "select the focused finding"],
                  ["1 – 4", "switch section"],
                  ["⌘K / Ctrl K", "command palette"],
                  ["Esc", "close drawer or palette"],
                  ["?", "this panel"],
                ].map(([key, what]) => (
                  <span className={styles.keyRow} key={key}>
                    <kbd className={styles.kbd}>{key}</kbd>
                    {what}
                  </span>
                ))}
              </div>
            </Panel>
          </div>
        ) : null}

        {m.tab === "assurance" ? (
          <>
            {topIncident ? (
              <div className={styles.incident} role="status">
                <div className={styles.incidentBody}>
                  <p className={styles.incidentTitle}>
                    {`Assurance incident — ${topIncident.name} has been silent for ${Math.floor((NOW - topIncident.lastEventAt) / 86_400_000)} days`}
                  </p>
                  <p className={styles.incidentText}>
                    {`Its heartbeat window is ${topIncident.expectedIntervalMin} minutes. ${plural(incidentAffected.length, "technique")} lost verified status because ${incidentAffected.length === 1 ? "its analytic" : "their analytics"} cannot fire without it. ${topIncident.note ?? ""} One telemetry fix clears all of them.`}
                  </p>
                </div>
                <div className={styles.incidentActions}>
                  <Btn
                    variant="primary"
                    onClick={() => {
                      actions.setFilters({ blockedBy: topIncident.id, state: "all" })
                      setCursor(0)
                    }}
                  >
                    Show affected
                  </Btn>
                  <Btn
                    disabled={!perms.write}
                    aria-disabled={!perms.write}
                    title={perms.write ? undefined : "Read-only role"}
                    onClick={() => drawerActions.restoreTelemetry(topIncident.id)}
                  >
                    {`Restore telemetry (${incidentAffected.length})`}
                  </Btn>
                  <Btn onClick={() => actions.acknowledge(topIncident.id)}>
                    Acknowledge
                  </Btn>
                </div>
              </div>
            ) : null}

            <div className={styles.split}>
              <div className={styles.stack}>
                <KpiRow
                  summary={summary}
                  hydrated={hydrated}
                  onFilterState={(state) => actions.setFilters({ state })}
                  onShowBroken={() => actions.setFilters({ state: "broken" })}
                />
                <AssuranceQueue
                  rows={rows}
                  totalOpen={openQueue.length}
                  filters={m.filters}
                  onFilters={(patch) => {
                    actions.setFilters(patch)
                    setCursor(0)
                  }}
                  onClearFilters={() => {
                    actions.clearFilters()
                    setCursor(0)
                  }}
                  cursor={cursor}
                  onCursor={setCursor}
                  selected={selection}
                  onToggleSelect={(id) =>
                    setSelection((prev) =>
                      prev.includes(id)
                        ? prev.filter((x) => x !== id)
                        : [...prev, id]
                    )
                  }
                  onClearSelection={() => setSelection([])}
                  onOpen={openFinding}
                  onBulkAssign={() =>
                    drawerActions.assign(
                      selection,
                      actor,
                      NOW + 7 * 86_400_000
                    )
                  }
                  settling={settling}
                  canWrite={perms.write}
                  hydrated={hydrated}
                />
              </div>

              <aside className={styles.rail} aria-label="Context">
                <ServiceLevelPanel
                  summary={summary}
                  targetPct={m.targetPct}
                  canEdit={perms.editServiceLevel}
                  onTarget={(value) => {
                    actions.setTarget(value, m.role)
                    pushToast(`Assurance target set to ${value}%.`)
                  }}
                />
                <TelemetryPanel
                  sources={logSources}
                  dependents={dependents}
                  onPick={(id) => {
                    actions.setFilters({ blockedBy: id, state: "all" })
                    setCursor(0)
                  }}
                />
                <CompositionPanel
                  summary={summary}
                  activeState={m.filters.state}
                  onPick={(state) => {
                    // The composition covers the whole landscape, including
                    // states that never appear in the open queue — so a legend
                    // click belongs on the map, not in the queue.
                    actions.setFilters({ state, tier: "all" })
                    actions.setTab("coverage")
                  }}
                />
                <ConnectorsPanel
                  onReset={() => {
                    actions.reset()
                    setSelection([])
                    setCursor(0)
                    pushToast("Demo reset to the seeded state.")
                  }}
                />
              </aside>
            </div>
          </>
        ) : null}

        {m.tab === "coverage" ? (
          <CoverageMatrix
            findings={findings}
            tier={m.filters.tier}
            onTier={(tier: "all" | Tier) => actions.setFilters({ tier })}
            stateFilter={m.filters.state}
            onStateFilter={(state: "all" | AssuranceState) =>
              actions.setFilters({ state })
            }
            onOpen={openFinding}
          />
        ) : null}

        {m.tab === "scenarios" ? (
          <ScenarioReplay
            findings={findings}
            scenarioId={m.scenario}
            onScenario={(id) => actions.setScenario(id)}
            onOpen={openFinding}
          />
        ) : null}

        {m.tab === "report" ? (
          <ReportView
            summary={summary}
            findings={findings}
            acceptances={acceptances}
            audit={audit}
            targetPct={m.targetPct}
            role={m.role}
            registerFilter={m.registerFilter}
            onRegisterFilter={(f) => actions.setRegisterFilter(f)}
            onOpen={openFinding}
            onApprove={drawerActions.approveAcceptance}
            canApprove={perms.approve}
            actor={actor}
          />
        ) : null}
      </main>

      <FindingDrawer
        finding={selectedFinding}
        logSources={logSources}
        blockedSiblings={blockedSiblings}
        role={m.role}
        density={m.density}
        onClose={() => setSelectedId(null)}
        actions={drawerActions}
      />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commands}
        findings={findings}
        onOpenFinding={openFinding}
      />

      {toasts.length > 0 ? (
        <div className={styles.toastWrap}>
          {toasts.map((t) => (
            <div className={styles.toast} key={t.id} role="status">
              <span className={styles.toastText}>{t.text}</span>
              {t.undo ? (
                <Btn
                  onClick={() => {
                    t.undo?.()
                    setToasts((prev) => prev.filter((x) => x.id !== t.id))
                    pushToast("Reverted.")
                  }}
                >
                  Undo
                </Btn>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      <footer className={styles.main} style={{ paddingTop: 0 }}>
        <p className={styles.kpiSub}>
          {`Assay — a demo built for the cyber-dashboard benchmark. Six assurance states: ${Object.values(
            STATE_META
          )
            .map((s) => `${s.glyph} ${s.label.toLowerCase()}`)
            .join(" · ")}. Read research.md, prd.md and design.md in this route folder for the thinking behind it.`}
        </p>
      </footer>
    </div>
  )
}

export { DEFAULT_FILTERS }
