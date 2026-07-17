import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Helm Treasury",
  description:
    "A seeded demo of a policy-led stablecoin treasury risk cockpit for finance and operations teams.",
};

export default function RouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
