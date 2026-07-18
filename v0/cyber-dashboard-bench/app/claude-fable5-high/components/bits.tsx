"use client"

import * as React from "react"
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotIcon,
  FlameIcon,
  GitPullRequestIcon,
  GlobeIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  formatCountdown,
  formatDueDate,
  SEVERITY_COLOR,
  SEVERITY_LABEL,
} from "../lib/format"
import { PEOPLE } from "../lib/data"
import type { PackStatus, ScoredPack, Severity } from "../lib/types"
import styles from "../patchbay.module.css"

export function SeverityTag({ severity }: { severity: Severity }) {
  const color = SEVERITY_COLOR[severity]
  return (
    <span
      className="inline-flex w-[74px] shrink-0 items-center gap-1.5 text-xs font-semibold"
      style={{ color }}
    >
      <span
        aria-hidden
        className="size-2 rounded-[3px]"
        style={{ background: color }}
      />
      {SEVERITY_LABEL[severity]}
    </span>
  )
}

const STATUS_META: Record<
  PackStatus,
  { label: string; icon: React.ComponentType<{ className?: string }>; className: string }
> = {
  open: {
    label: "Open",
    icon: CircleDashedIcon,
    className: "text-muted-foreground border-border",
  },
  in_progress: {
    label: "In progress",
    icon: CircleDotIcon,
    className: "text-[#4cc2ff] border-[#4cc2ff]/30 bg-[#4cc2ff]/8",
  },
  submitted: {
    label: "Fix submitted",
    icon: GitPullRequestIcon,
    className: "text-[#a78bfa] border-[#a78bfa]/30 bg-[#a78bfa]/8",
  },
  verified: {
    label: "Verified",
    icon: CircleCheckIcon,
    className: "text-[#3ecf8e] border-[#3ecf8e]/30 bg-[#3ecf8e]/8",
  },
  accepted: {
    label: "Accepted",
    icon: ShieldCheckIcon,
    className: "text-muted-foreground border-border bg-muted/40",
  },
}

export function StatusTag({ status }: { status: PackStatus }) {
  const meta = STATUS_META[status]
  const Icon = meta.icon
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium whitespace-nowrap",
        meta.className
      )}
    >
      <Icon aria-hidden className="size-3" />
      {meta.label}
    </span>
  )
}

export function statusLabel(status: PackStatus) {
  return STATUS_META[status].label
}

export function ScoreBadge({ score, severity }: { score: number; severity: Severity }) {
  return (
    <span
      className="inline-flex h-7 w-9 shrink-0 items-center justify-center rounded-md font-mono text-[13px] font-semibold tabular-nums"
      style={{
        color: SEVERITY_COLOR[severity],
        background: `${SEVERITY_COLOR[severity]}14`,
        border: `1px solid ${SEVERITY_COLOR[severity]}33`,
      }}
      aria-label={`Priority score ${score} out of 100`}
    >
      {score}
    </span>
  )
}

function Chip({
  children,
  tooltip,
  tone = "neutral",
}: {
  children: React.ReactNode
  tooltip: string
  tone?: "neutral" | "danger" | "warn"
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span
            tabIndex={0}
            className={cn(
              "inline-flex cursor-default items-center gap-1 rounded border px-1.5 py-px font-mono text-[10.5px] font-medium whitespace-nowrap",
              tone === "danger" &&
                "border-[#ff5d5d]/35 bg-[#ff5d5d]/10 text-[#ff8a8a]",
              tone === "warn" &&
                "border-[#ff9f43]/35 bg-[#ff9f43]/10 text-[#ffbe7d]",
              tone === "neutral" && "border-border bg-muted/40 text-muted-foreground"
            )}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent className={cn(styles.theme, "max-w-64")}>{tooltip}</TooltipContent>
    </Tooltip>
  )
}

export function EvidenceChips({
  pack,
  max,
}: {
  pack: ScoredPack
  max?: number
}) {
  const chips: React.ReactNode[] = []
  if (pack.kev)
    chips.push(
      <Chip
        key="kev"
        tone="danger"
        tooltip="This pack contains a CVE in CISA's Known Exploited Vulnerabilities catalog — exploitation is confirmed in the wild, not predicted."
      >
        <FlameIcon aria-hidden className="size-3" />
        KEV
      </Chip>
    )
  chips.push(
    <Chip
      key="epss"
      tone={pack.epss >= 0.5 ? "warn" : "neutral"}
      tooltip={`EPSS ${Math.round(pack.epss * 100)}%: the FIRST.org model's probability that this flaw is exploited within 30 days.`}
    >
      EPSS {Math.round(pack.epss * 100)}%
    </Chip>
  )
  if (pack.factors.find((f) => f.id === "exposure")!.value > 0)
    chips.push(
      <Chip
        key="net"
        tone="warn"
        tooltip="At least one affected asset is reachable from the internet."
      >
        <GlobeIcon aria-hidden className="size-3" />
        internet-facing
      </Chip>
    )
  if (pack.factors.find((f) => f.id === "criticality")!.value >= 1)
    chips.push(
      <Chip
        key="crown"
        tone="warn"
        tooltip="An affected asset is tagged crown-jewel in the asset inventory (holds customer data or credentials)."
      >
        <ShieldAlertIcon aria-hidden className="size-3" />
        crown-jewel
      </Chip>
    )
  const shown = max ? chips.slice(0, max) : chips
  return <span className="inline-flex flex-wrap items-center gap-1">{shown}</span>
}

export function Countdown({
  pack,
  now,
}: {
  pack: ScoredPack
  now: number
}) {
  if (pack.status === "verified" || pack.status === "accepted") {
    return (
      <span className="font-mono text-[11px] text-muted-foreground">—</span>
    )
  }
  const { text, tone } = formatCountdown(pack.dueAt, now)
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span
            tabIndex={0}
            className={cn(
              "inline-flex cursor-default items-center rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold whitespace-nowrap tabular-nums",
              tone === "breached" && "bg-[#ff5d5d]/12 text-[#ff8a8a]",
              tone === "urgent" && "bg-[#ff9f43]/12 text-[#ffbe7d]",
              tone === "ok" && "text-muted-foreground"
            )}
            aria-label={`SLA: ${text}, due ${formatDueDate(pack.dueAt)}`}
          />
        }
      >
        {tone === "breached" ? `SLA ${text}` : text}
      </TooltipTrigger>
      <TooltipContent className={styles.theme}>
        {pack.slaDays}-day SLA for {SEVERITY_LABEL[pack.severity].toLowerCase()} fixes — due{" "}
        {formatDueDate(pack.dueAt)}
      </TooltipContent>
    </Tooltip>
  )
}

export function OwnerBadge({ ownerId }: { ownerId: string | null }) {
  const owner = PEOPLE.find((p) => p.id === ownerId)
  if (!owner)
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/70 italic">
        <span
          aria-hidden
          className="flex size-5 items-center justify-center rounded-full border border-dashed border-border text-[9px]"
        >
          ?
        </span>
        Unassigned
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
      <span
        aria-hidden
        className="flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[9px] font-semibold text-secondary-foreground"
      >
        {owner.initials}
      </span>
      <span className="truncate">{owner.team}</span>
    </span>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
      {children}
    </h3>
  )
}
