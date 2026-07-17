import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Breakline — Exposure decision desk",
  description:
    "A demo exposure-remediation workspace that turns scattered security evidence into provable fix decisions.",
}

export default function BreaklineLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}

