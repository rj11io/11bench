import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signalbank — Stablecoin readiness",
  description: "A seeded demo for stablecoin treasury readiness.",
};

export default function SignalbankLayout({ children }: { children: React.ReactNode }) {
  return children;
}
