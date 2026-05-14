import type { Metadata } from "next";

import { ProjectsPage } from "@/components/projects-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Projetos de Desenvolvimento e UI",
  description:
    "Explore projetos de sites, plataformas e experiências digitais com foco em estratégia visual, performance e qualidade técnica.",
  path: "/projects",
  keywords: [
    "projetos de desenvolvimento web",
    "cases de sites",
    "portfolio de ui ux",
    "projetos next.js",
  ],
});

export default function Projects() {
  return <ProjectsPage />;
}
