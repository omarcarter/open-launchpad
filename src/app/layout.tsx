import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "OpenLaunchpad",
  description: "Ship your next project faster with reusable launch templates and integrations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
