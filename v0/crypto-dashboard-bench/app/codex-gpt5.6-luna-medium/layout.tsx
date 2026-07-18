import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sentryline · Treasury control",
  description: "A seeded demo of a read-only crypto treasury risk workspace.",
};

export default function SentrylineLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
