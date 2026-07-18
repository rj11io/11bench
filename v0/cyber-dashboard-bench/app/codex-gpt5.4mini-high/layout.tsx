import type { Metadata } from "next"

import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Aegis Exposure Board",
  description:
    "A cloud exposure prioritization workspace for turning exploited, reachable risk into an auditable remediation queue.",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={cn(
        "relative min-h-svh overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.11),_transparent_28%),linear-gradient(180deg,_#020712_0%,_#07121f_40%,_#03060c_100%)] text-slate-100"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-400/10 to-transparent" />
      <div className="relative mx-auto flex min-h-svh w-full max-w-[1700px] flex-col px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        {children}
      </div>
    </div>
  )
}

