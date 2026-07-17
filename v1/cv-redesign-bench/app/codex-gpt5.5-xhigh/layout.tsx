import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Ricardo Jorge - AI Product Engineer CV",
  description:
    "A two-page AI product engineering CV for Ricardo Jorge, redesigned for screen and print.",
}

export default function CvLayout({ children }: { children: ReactNode }) {
  return children
}
