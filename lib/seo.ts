import type { Metadata } from "next";

export const siteConfig = {
  name: "Henry Dev",
  legalName: "Henry Dev",
  description:
    "Portfólio de Henry Dev, desenvolvedor de software focado em sites, interfaces e produtos digitais com performance, estratégia e design premium.",
  locale: "pt_BR",
  creator: "Henry Dev",
  publisher: "Henry Dev",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://henrybenjamin.dev",
  ogImage: "/opengraph-image",
  email: "henrybenjamin.dev@gmail.com",
  city: "São Paulo",
  country: "BR",
};

export function absoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, siteConfig.siteUrl).toString();
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: absoluteUrl(siteConfig.ogImage),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(siteConfig.ogImage)],
      creator: "@henrydev",
    },
  };
}
