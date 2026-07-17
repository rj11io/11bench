import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ricardo Jorge | AI Product Engineer",
  description:
    "Two-page editorial CV for Ricardo Jorge, focused on AI product engineering, frontend systems, and data-rich product work.",
}

export default function CvLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
