import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ricardo Jorge — AI Product Engineer",
  description:
    "The CV of Ricardo Jorge, an AI product engineer specialising in frontend systems, data products, and agent engineering.",
}

export default function CvLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

