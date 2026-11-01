import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import PageLoader from "@/components/Layout/PageLoader";

export const metadata: Metadata = {
  title: "VYONCUT | CNC Laser & Plasma Cutting Machines",
  description:
    "Explore VYONCUT CNC laser and plasma cutting machines, with installation, training and lifetime support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-zinc-900 antialiased">
        <PageLoader>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-zinc-950 focus:px-5 focus:py-3 focus:text-white"
          >
            Skip to content
          </a>

          <Header />

          <div className="flex flex-1 flex-col">
            {children}
          </div>

          <Footer />
        </PageLoader>
      </body>
    </html>
  );
}
