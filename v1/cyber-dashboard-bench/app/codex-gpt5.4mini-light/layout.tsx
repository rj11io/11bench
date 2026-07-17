import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-svh bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(34,197,94,0.1),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(2,6,23,0.92))] text-slate-50">
      {children}
    </section>
  )
}

