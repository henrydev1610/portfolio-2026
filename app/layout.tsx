import type { Metadata } from "next";
import { Archivo } from "next/font/google";

import { BrowserPerformanceFlags } from "@/components/browser-performance-flags";
import { GlobalCursor } from "@/components/global-cursor";
import { RouteTransitionProvider } from "@/components/route-transition-provider";
import { SiteFooter } from "@/components/site-footer";
import { absoluteUrl, siteConfig } from "@/lib/seo";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Henry Dev | Desenvolvedor de Software e Experiencias Digitais",
    template: "%s | Henry Dev",
  },
  description: siteConfig.description,
  keywords: [
    "desenvolvedor web",
    "desenvolvedor next.js",
    "criacao de sites profissionais",
    "desenvolvimento de landing page",
    "portfolio desenvolvedor",
    "freelancer desenvolvimento web",
  ],
  authors: [{ name: siteConfig.creator, url: siteConfig.siteUrl }],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.siteUrl,
    title: "Henry Dev | Desenvolvedor de Software e Experiencias Digitais",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: "Henry Dev - Portfolio de desenvolvimento web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry Dev | Desenvolvedor de Software e Experiencias Digitais",
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
    creator: "@henrydev",
  },
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/apple-icon",
  },
  category: "technology",
};

const globalJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.siteUrl,
    logo: absoluteUrl("/favicon.ico"),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.email,
        areaServed: "BR",
        availableLanguage: ["pt-BR"],
      },
    ],
    sameAs: [
      "https://www.linkedin.com/in/antoniorangelmarq/",
      "https://www.instagram.com/ohenrybenjamin/",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Henry Dev",
    url: siteConfig.siteUrl,
    jobTitle: "Desenvolvedor de Software",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressCountry: siteConfig.country,
    },
    sameAs: [
      "https://www.linkedin.com/in/antoniorangelmarq/",
      "https://www.instagram.com/ohenrybenjamin/",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    inLanguage: "pt-BR",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${archivo.variable} min-h-screen bg-background font-sans text-white antialiased`}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
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
