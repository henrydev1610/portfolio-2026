import type { Metadata } from "next";
import { Archivo } from "next/font/google";

import { BrowserPerformanceFlags } from "@/components/browser-performance-flags";
import { GlobalCursor } from "@/components/global-cursor";
import { RouteTransitionProvider } from "@/components/route-transition-provider";
import { SiteFooter } from "@/components/site-footer";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Henry Dev | Portfólio 2026",
  description: "Portifólio Atualizado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${archivo.variable} min-h-screen bg-background font-sans text-white antialiased`}>
        <RouteTransitionProvider>
          <BrowserPerformanceFlags />
          <GlobalCursor />
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </RouteTransitionProvider>
      </body>
    </html>
  );
}
