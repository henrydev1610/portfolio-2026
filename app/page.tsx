import type { Metadata } from "next";

import { PortfolioHome } from "@/components/portfolio-home";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Henry Dev | Desenvolvedor Full Stack, Sites e Sistemas Web",
  description:
    "Desenvolvimento de sites, sistemas web e aplicacoes modernas com React, Next.js, Node.js e TypeScript, com foco em performance, design premium e experiencia do usuario.",
  path: "/",
  keywords: [
    "desenvolvedor full stack",
    "desenvolvimento de sites",
    "sistemas web",
    "react next.js node.js typescript",
  ],
});

export default function Home() {
  return <PortfolioHome />;
}

