"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  CircleCheckIcon,
  GitPullRequestIcon,
  HammerIcon,
  HistoryIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ASSETS, PEOPLE } from "../lib/data"
import { formatDueDate, formatTime, SEVERITY_COLOR, SEVERITY_LABEL } from "../lib/format"
import { useStore } from "../lib/store"
import type { ScoredPack } from "../lib/types"
import { Countdown, EvidenceChips, ScoreBadge, SectionLabel, SeverityTag, StatusTag, statusLabel } from "./bits"
import styles from "../patchbay.module.css"

export function PackSheet({
  packId,
  onClose,
}: {
  packId: string | null
  onClose: () => void
}) {
  const { packs, dispatch, now } = useStore()
  const pack = packs.find((p) => p.id === packId) ?? null
  const [acceptOpen, setAcceptOpen] = React.useState(false)

  return (
    <>
      <Sheet open={packId !== null} onOpenChange={(open) => !open && onClose()}>
        <SheetContent
          side="right"
          className={cn(
            styles.theme,
            "w-full gap-0 overflow-y-auto border-l border-border bg-background text-foreground sm:max-w-full lg:max-w-[620px]!"
          )}
          aria-describedby={undefined}
        >
          {pack && (
            <PackDetail
              pack={pack}
              now={now}
              onAssign={(ownerId) => {
                dispatch({ type: "assign", packId: pack.id, ownerId })
                const person = PEOPLE.find((p) => p.id === ownerId)
                toast.success(
                  person ? `Assigned to ${person.name}` : "Owner cleared",
                  { description: pack.title }
                )
              }}
              onStatus={(status) => {
                dispatch({ type: "set-status", packId: pack.id, status })
                toast.success(statusLabel(status), { description: pack.title })
              }}
              onAcceptRisk={() => setAcceptOpen(true)}
            />
          )}
        </SheetContent>
      </Sheet>
      {pack && acceptOpen && (
        <AcceptRiskDialog
          open={acceptOpen}
          onOpenChange={setAcceptOpen}
          packTitle={pack.title}
          onConfirm={(reason, until) => {
            dispatch({ type: "accept-risk", packId: pack.id, reason, until })
            setAcceptOpen(false)
            toast.success("Risk accepted with audit trail", {
              description: `Re-surfaces ${until}`,
            })
          }}
        />
      )}
    </>
  )
}

function PackDetail({
  pack,
  now,
  onAssign,
  onStatus,
  onAcceptRisk,
}: {
  pack: ScoredPack
  now: number
  onAssign: (ownerId: string | null) => void
  onStatus: (status: ScoredPack["status"]) => void
  onAcceptRisk: () => void
}) {
  const assets = pack.assetIds
    .map((id) => ASSETS.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
  const maxWeight = Math.max(...pack.factors.map((f) => f.weight))
  const sum = pack.factors.map((f) => f.contribution).join(" + ")

  return (
    <div className="flex flex-col">
      <SheetHeader className="border-b border-border pr-12">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <ScoreBadge score={pack.score} severity={pack.severity} />
          <SeverityTag severity={pack.severity} />
          <StatusTag status={pack.status} />
          <Countdown pack={pack} now={now} />
        </div>
        <SheetTitle className="mt-1.5 text-[15px] leading-snug">{pack.title}</SheetTitle>
        <SheetDescription className="text-[13px]">
          {pack.action} · <span className="font-mono text-xs">{pack.packageOrArea}</span>
        </SheetDescription>
        <div className="mt-1">
          <EvidenceChips pack={pack} />
        </div>
      </SheetHeader>

      <div className="flex flex-col gap-6 p-4">
        {pack.evidenceChanged && (
          <div className="flex gap-2.5 rounded-lg border border-[#ff5d5d]/30 bg-[#ff5d5d]/8 px-3 py-2.5">
            <ZapIcon aria-hidden className="mt-0.5 size-4 shrink-0 text-[#ff8a8a]" />
            <p className="text-[13px] leading-relaxed">
              <span className="font-semibold text-[#ff8a8a]">Evidence changed. </span>
              {pack.evidenceChanged}
            </p>
          </div>
        )}

        {/* ——— Receipts: the glass-box score ——— */}
        <section aria-label="Why this score">
          <div className="flex items-baseline justify-between">
            <SectionLabel>Why score {pack.score} — the receipts</SectionLabel>
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
              {sum} = {pack.score}
            </span>
          </div>
          <ul className="mt-2.5 flex flex-col gap-2.5">
            {pack.factors.map((f) => (
              <li key={f.id} className="rounded-lg border border-border bg-card px-3 py-2.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[13px] font-medium">{f.label}</span>
                  <span className="font-mono text-[12px] tabular-nums">
                    <span
                      className={f.contribution > 0 ? "text-foreground" : "text-muted-foreground/60"}
                    >
                      {f.contribution}
                    </span>
                    <span className="text-muted-foreground/60"> / {f.weight}</span>
                  </span>
                </div>
                <div
                  className="mt-1.5 h-1.5 rounded-full bg-muted"
                  style={{ width: `${(f.weight / maxWeight) * 100}%` }}
                  role="img"
                  aria-label={`${f.label}: ${f.contribution} of ${f.weight} points`}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${f.value * 100}%`,
                      background: SEVERITY_COLOR[pack.severity],
                      opacity: f.value === 0 ? 0 : 0.9,
                    }}
                  />
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{f.evidence}</p>
                <p className="mt-0.5 text-[10.5px] text-muted-foreground/60">Source: {f.source}</p>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground/70">
            Patchbay never shows an unexplained number. The same weighted model
            applies to every fix, and the weights are part of your workspace policy.
          </p>
        </section>

        {/* ——— Actions ——— */}
        <section aria-label="Actions" className="rounded-lg border border-border bg-card p-3">
          <SectionLabel>Route this fix</SectionLabel>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <Select
              items={ownerItems}
              value={pack.ownerId ?? "unassigned"}
              onValueChange={(v) => onAssign(v === "unassigned" ? null : (v as string))}
            >
              <SelectTrigger size="sm" aria-label="Assign owner" className="min-w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={styles.theme}>
                {ownerItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {pack.status === "open" && (
              <Button size="sm" onClick={() => onStatus("in_progress")}>
                <HammerIcon aria-hidden />
                Start work
              </Button>
            )}
            {pack.status === "in_progress" && (
              <Button size="sm" onClick={() => onStatus("submitted")}>
                <GitPullRequestIcon aria-hidden />
                Mark fix submitted
              </Button>
            )}
            {pack.status === "submitted" && (
              <Button size="sm" onClick={() => onStatus("verified")}>
                <CircleCheckIcon aria-hidden />
                Mark verified
              </Button>
            )}
            {(pack.status === "verified" || pack.status === "accepted") && (
              <Button size="sm" variant="outline" onClick={() => onStatus("open")}>
                <RotateCcwIcon aria-hidden />
                Reopen
              </Button>
            )}
            {pack.status !== "verified" && pack.status !== "accepted" && (
              <Button size="sm" variant="outline" onClick={onAcceptRisk}>
                <ShieldCheckIcon aria-hidden />
                Accept risk…
              </Button>
            )}
          </div>
          {pack.status === "accepted" && pack.acceptedReason && (
            <p className="mt-2.5 rounded-md bg-muted/50 px-2.5 py-2 text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Accepted</span>
              {pack.acceptedUntil ? ` until ${pack.acceptedUntil}` : ""} — {pack.acceptedReason}
            </p>
          )}
          <p className="mt-2.5 text-[11px] text-muted-foreground/70">
            In production this creates or updates the linked Jira/Linear ticket.
            Demo build: state is stored locally in your browser.
          </p>
        </section>

        {/* ——— Remediation ——— */}
        <section aria-label="Remediation">
          <SectionLabel>Remediation — one action closes {pack.findingCount} findings</SectionLabel>
          <ol className="mt-2 flex list-none flex-col gap-1.5">
            {pack.remediation.map((step, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed">
                <span className="mt-px font-mono text-[11px] text-muted-foreground tabular-nums">
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-2 flex gap-2.5 rounded-md border border-[#3ecf8e]/25 bg-[#3ecf8e]/6 px-2.5 py-2 text-xs leading-relaxed text-muted-foreground">
            <CircleCheckIcon aria-hidden className="mt-0.5 size-3.5 shrink-0 text-[#3ecf8e]" />
            <span>
              <span className="font-medium text-[#3ecf8e]">Verify: </span>
              {pack.verification}
            </span>
          </p>
        </section>

        {/* ——— Assets ——— */}
        <section aria-label="Affected assets">
          <SectionLabel>
            Affected assets ({assets.length})
          </SectionLabel>
          <ul className="mt-2 flex flex-col gap-1.5">
            {assets.map((a) => (
              <li
                key={a.id}
                className="rounded-lg border border-border bg-card px-3 py-2"
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-mono text-xs font-medium">{a.name}</span>
                  <span className="rounded bg-muted/60 px-1.5 py-px text-[10px] text-muted-foreground">
                    {a.environment}
                  </span>
                  {a.internetFacing && (
                    <span className="rounded border border-[#ff9f43]/35 bg-[#ff9f43]/10 px-1.5 py-px font-mono text-[10px] text-[#ffbe7d]">
                      internet-facing
                    </span>
                  )}
                  <span
                    className={cn(
                      "rounded px-1.5 py-px font-mono text-[10px]",
                      a.criticality === "crown"
                        ? "border border-[#ff9f43]/35 bg-[#ff9f43]/10 text-[#ffbe7d]"
                        : "bg-muted/60 text-muted-foreground"
                    )}
                  >
                    {a.criticality === "crown" ? "crown-jewel" : a.criticality}
                  </span>
                </div>
                <p className="mt-1 text-[11.5px] text-muted-foreground">{a.criticalityReason}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ——— Findings ——— */}
        <section aria-label="Member findings">
          <SectionLabel>
            Representative findings ({pack.findings.length} of {pack.findingCount})
          </SectionLabel>
          <div className="mt-2 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[440px] text-left text-xs">
              <thead>
                <tr className="border-b border-border text-[10.5px] tracking-wider text-muted-foreground/80 uppercase">
                  <th className="px-2.5 py-1.5 font-semibold">CVE</th>
                  <th className="px-2.5 py-1.5 font-semibold">Finding</th>
                  <th className="px-2.5 py-1.5 font-semibold">Source</th>
                  <th className="px-2.5 py-1.5 text-right font-semibold">CVSS</th>
                  <th className="px-2.5 py-1.5 text-right font-semibold">EPSS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pack.findings.map((f) => (
                  <tr key={f.cve + f.title}>
                    <td className="px-2.5 py-2 font-mono whitespace-nowrap">
                      {f.kev ? (
                        <span className="text-[#ff8a8a]" title="In CISA KEV">
                          {f.cve} ★
                        </span>
                      ) : (
                        f.cve
                      )}
                    </td>
                    <td className="px-2.5 py-2 text-muted-foreground">{f.title}</td>
                    <td className="px-2.5 py-2 whitespace-nowrap text-muted-foreground">{f.source}</td>
                    <td className="px-2.5 py-2 text-right font-mono tabular-nums">
                      {f.cvss.toFixed(1)}
                    </td>
                    <td className="px-2.5 py-2 text-right font-mono tabular-nums">
                      {Math.round(f.epss * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-1.5 text-[10.5px] text-muted-foreground/60">
            ★ = listed in CISA KEV. Fictional demo findings — CVE IDs in the 2026 range are invented.
          </p>
        </section>

        {/* ——— Activity ——— */}
        <section aria-label="Activity trail">
          <SectionLabel>Activity trail</SectionLabel>
          <ul className="mt-2 flex flex-col gap-2">
            {pack.activity.map((event, i) => (
              <li key={i} className="flex gap-2.5 text-xs">
                <HistoryIcon aria-hidden className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/60" />
                <span className="leading-relaxed">
                  <span className="font-medium">{event.action}</span>
                  {event.detail && (
                    <span className="text-muted-foreground"> — {event.detail}</span>
                  )}
                  <span className="text-muted-foreground/70">
                    {" "}
                    · {event.actor} · {formatTime(event.at)}
                  </span>
                </span>
              </li>
            ))}
            <li className="flex gap-2.5 text-xs">
              <HistoryIcon aria-hidden className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/60" />
              <span className="leading-relaxed text-muted-foreground">
                Pack assembled from scanner findings
                <span className="text-muted-foreground/70">
                  {" "}
                  · Patchbay · {pack.firstSeenDaysAgo === 0
                    ? "today"
                    : `${pack.firstSeenDaysAgo}d ago`}{" "}
                  · SLA due {formatDueDate(pack.dueAt)} ({SEVERITY_LABEL[pack.severity]} ={" "}
                  {pack.slaDays}d policy)
                </span>
              </span>
            </li>
          </ul>
          <p className="mt-2 text-[11px] text-muted-foreground/70">
            Every change is recorded and exportable — this trail is your audit evidence.
          </p>
        </section>
      </div>
    </div>
  )
}

const ownerItems = [
  { value: "unassigned", label: "Unassigned" },
  ...PEOPLE.filter((p) => p.id !== "maya").map((p) => ({
    value: p.id,
    label: `${p.name} · ${p.team}`,
  })),
]

function AcceptRiskDialog({
  open,
  onOpenChange,
  packTitle,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  packTitle: string
  onConfirm: (reason: string, until: string) => void
}) {
  // The dialog is mounted only while open, so field state starts fresh each time.
  const [reason, setReason] = React.useState("")
  const [until, setUntil] = React.useState("")
  const [touched, setTouched] = React.useState(false)

  const reasonError = touched && reason.trim().length < 10
  const untilError = touched && !until

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(styles.theme, "bg-popover text-popover-foreground sm:max-w-md")}>
        <DialogHeader>
          <DialogTitle>Accept this risk</DialogTitle>
          <DialogDescription>
            {packTitle}. Accepting removes it from the active queue but keeps it
            on the record — a reason and an expiry date are required so the
            decision stays auditable and gets re-reviewed.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5 text-xs font-medium">
            Reason (required)
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="e.g. Internal-only service behind VPN; compensating WAF rule 4412 in place; decommission scheduled Q4."
              className={cn(
                "rounded-lg border bg-transparent px-2.5 py-2 text-[13px] font-normal outline-none placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-ring",
                reasonError ? "border-destructive" : "border-input"
              )}
              aria-invalid={reasonError || undefined}
            />
            {reasonError && (
              <span className="font-normal text-destructive">
                Give at least a sentence — this is your audit evidence.
              </span>
            )}
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-medium">
            Re-review date (required)
            <input
              type="date"
              value={until}
              onChange={(e) => setUntil(e.target.value)}
              className={cn(
                "w-fit rounded-lg border bg-transparent px-2.5 py-1.5 font-mono text-[13px] font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring",
                untilError ? "border-destructive" : "border-input"
              )}
              aria-invalid={untilError || undefined}
            />
            {untilError && (
              <span className="font-normal text-destructive">
                Accepted risks must expire — pick a re-review date.
              </span>
            )}
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setTouched(true)
              if (reason.trim().length >= 10 && until) onConfirm(reason.trim(), until)
            }}
          >
            Accept with audit trail
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
