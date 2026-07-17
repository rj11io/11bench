import type { ReactNode } from "react"

import styles from "./shell.module.css"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[#04101f] text-slate-100">
      <div className={styles.orbA} aria-hidden="true" />
      <div className={styles.orbB} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1600px] flex-col px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <header className="mb-4 flex items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.18)]">
              <span className="font-mono text-sm font-semibold">ED</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/75">
                  Exposure Desk
                </span>
                <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-amber-100">
                  Demo data only
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-300">
                Weekly exposure review for security, cloud, identity, and
                remediation teams.
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              No live integrations
            </span>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
              Local state persists
            </span>
          </div>
        </header>
        <div className="relative flex-1">{children}</div>
      </div>
    </div>
  )
}
