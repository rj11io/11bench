import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Harbor · Exposure remediation",
  description: "Demo workspace for path-to-owner exposure remediation.",
};

export default function HarborLayout({ children }: { children: React.ReactNode }) {
  return children;
}
