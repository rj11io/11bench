import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ricardo Jorge - AI Product Engineer CV",
  description:
    "A redesigned two-page CV for Ricardo Jorge, AI Product Engineer in Lisbon.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
