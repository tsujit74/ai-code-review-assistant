import type { ReactNode } from "react";
import "./globals.css";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}