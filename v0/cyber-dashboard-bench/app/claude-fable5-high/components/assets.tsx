"use client"

import { cn } from "@/lib/utils"

import { ASSETS } from "../lib/data"
import { useStore } from "../lib/store"
import { SectionLabel } from "./bits"

export function AssetsView() {
  const { state, packs } = useStore()

  if (state.scenario === "first-run") {
    return (
      <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/50 px-6 py-24 text-center">
        <h1 className="font-heading text-lg font-semibold">No assets yet</h1>
        <p className="max-w-sm text-[13px] text-muted-foreground">
          Assets appear when a scanner or cloud connector is added. Exposure and
          criticality tags on assets are what the priority score points at.
        </p>
      </div>
    )
  }

  const openBy = (assetId: string) =>
    packs.filter(
      (p) =>
        p.assetIds.includes(assetId) &&
        p.status !== "verified" &&
        p.status !== "accepted"
    ).length

  const sorted = [...ASSETS].sort((a, b) => openBy(b.id) - openBy(a.id))

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <header>
        <h1 className="font-heading text-lg font-semibold">Assets</h1>
        <p className="text-[13px] text-muted-foreground">
          What we protect, and why it weighs in scoring — every criticality tier
          carries a written reason, because the score inherits it as evidence.
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div
          aria-hidden
          className="hidden border-b border-border px-3 py-2 text-[10.5px] font-semibold tracking-wider text-muted-foreground/80 uppercase md:grid md:grid-cols-[minmax(0,1.2fr)_64px_118px_110px_minmax(0,2fr)_80px] md:gap-3"
        >
          <span>Asset</span>
          <span>Env</span>
          <span>Exposure</span>
          <span>Criticality</span>
          <span>Why this tier</span>
          <span className="text-right">Open fixes</span>
        </div>
        <ul className="divide-y divide-border">
          {sorted.map((a) => {
            const open = openBy(a.id)
            return (
              <li
                key={a.id}
                className="px-3 py-2.5 md:grid md:grid-cols-[minmax(0,1.2fr)_64px_118px_110px_minmax(0,2fr)_80px] md:items-center md:gap-3"
              >
                <p className="min-w-0 truncate font-mono text-xs font-medium">
                  {a.name}
                  <span className="ml-2 rounded bg-muted/60 px-1.5 py-px font-sans text-[10px] text-muted-foreground">
                    {a.kind}
                  </span>
                </p>
                <span className="mt-1 inline-block text-[11px] text-muted-foreground md:mt-0">
                  {a.environment}
                </span>
                <span className="mt-1 md:mt-0">
                  {a.internetFacing ? (
                    <span className="rounded border border-[#ff9f43]/35 bg-[#ff9f43]/10 px-1.5 py-px font-mono text-[10px] whitespace-nowrap text-[#ffbe7d]">
                      internet-facing
                    </span>
                  ) : (
                    <span className="text-[11px] text-muted-foreground/70">internal</span>
                  )}
                </span>
                <span className="mt-1 md:mt-0">
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
                </span>
                <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground md:mt-0">
                  {a.criticalityReason}
                </p>
                <p className="mt-1 font-mono text-xs tabular-nums md:mt-0 md:text-right">
                  {open === 0 ? (
                    <span className="text-muted-foreground/50">0</span>
                  ) : (
                    <span>{open}</span>
                  )}
                </p>
              </li>
            )
          })}
        </ul>
      </div>

      <section className="rounded-xl border border-border bg-card px-4 py-3.5">
        <SectionLabel>Owner directory</SectionLabel>
        <p className="mt-2 text-[13px] text-muted-foreground">
          Fixes route to owning teams: Platform (Jonas Weber), Payments (Priya
          Sharma), Web (Sam Ortiz), Data (Lena Fischer), IT Ops (Marcus Reid).
          In production this syncs from your identity provider and service catalog.
        </p>
      </section>

      <p className="text-center text-[11px] text-muted-foreground/60">
        Fictional demo inventory — no live connector is attached.
      </p>
    </div>
  )
}
