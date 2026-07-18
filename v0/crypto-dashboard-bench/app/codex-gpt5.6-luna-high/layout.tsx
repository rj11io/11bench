import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cairn · Treasury control",
  description: "A read-only crypto treasury control plane demo.",
}

export default function CairnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}

