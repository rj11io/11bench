import type { Metadata } from "next"
import { Source_Serif_4 } from "next/font/google"

import { contactLinks, person } from "./content"

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif-display",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: `${person.name} — ${person.title}`,
  description:
    "CV of Ricardo Jorge, AI Product Engineer — a decade of TypeScript, React, and Next.js experience building dashboards, data platforms, and AI agent systems.",
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  alternateName: person.nickname,
  jobTitle: person.title,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lisbon",
    addressCountry: "PT",
  },
  email: "ricardojorgexyz@gmail.com",
  url: "https://rj11.io",
  sameAs: contactLinks
    .filter((link) => !link.href.startsWith("mailto:"))
    .map((link) => link.href),
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={sourceSerif.variable}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {children}
    </div>
  )
}
