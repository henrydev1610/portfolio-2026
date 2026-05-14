import type { Metadata } from "next";

import { AboutPage } from "@/components/about-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sobre Henry Dev",
  description:
    "Veja a trajetória, abordagem de trabalho e especialidades de Henry Dev em engenharia de software, interfaces e produtos digitais.",
  path: "/about",
  keywords: [
    "sobre desenvolvedor web",
    "henry dev",
    "especialista next.js",
    "portfolio desenvolvedor sao paulo",
  ],
});

export default function About() {
  return <AboutPage />;
}
