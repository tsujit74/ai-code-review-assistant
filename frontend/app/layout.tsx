"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/projects") ||
    pathname.startsWith("/auth");

  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100">
        {!hideLayout && <Navbar />}

        <main className="min-h-screen">{children}</main>

        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}