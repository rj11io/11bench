import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Patchline — Remediation command",
  description:
    "A demo remediation command center that turns vulnerability noise into explainable, owner-ready action.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
