import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ResolvePoint Exposure Command",
  description:
    "A demo exposure remediation command center for risk-based cybersecurity operations.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
