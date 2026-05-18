import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aethel Data Ops — Autonomous Self-Healing Data Platform",
  description:
    "A high-density observability and autonomous operations dashboard for the Aethel self-healing data pipeline platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
