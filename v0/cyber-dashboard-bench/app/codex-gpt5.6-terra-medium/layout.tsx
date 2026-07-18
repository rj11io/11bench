import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terra | Exposure command center",
  description: "Demo exposure-to-remediation workspace",
};

export default function TerraLayout({ children }: { children: React.ReactNode }) {
  return children;
}
