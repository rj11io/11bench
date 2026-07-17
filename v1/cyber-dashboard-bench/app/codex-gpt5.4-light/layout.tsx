import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Strata Exposure Ops Demo",
  description:
    "Demo cybersecurity dashboard for attack-path remediation operations.",
}

export default function RunLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
