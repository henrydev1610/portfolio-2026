import type { Metadata } from "next";

import { PortfolioHome } from "@/components/portfolio-home";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Portfólio de Desenvolvimento Web Premium",
  description:
    "Conheça projetos, serviços e soluções digitais criadas por Henry Dev com foco em performance, experiência do usuário e conversão.",
  path: "/",
  keywords: [
    "portfolio desenvolvedor web",
    "criacao de sites premium",
    "next.js freelancer",
    "desenvolvedor frontend brasil",
  ],
});

export default function Home() {
  return <PortfolioHome />;
}
