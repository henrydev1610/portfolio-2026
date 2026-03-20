import type { StaticImageData } from "next/image";

import andreaImage from "@/app/krug.png";
import devBrazukaImage from "@/app/dev-brazuca.png";
import vagasDevImage from "@/app/vagas-dev.png";

export type ProjectCategory = "WordPress" | "React Native" | "React" | "Express.js";

export type ProjectItem = {
  title: string;
  category: ProjectCategory;
  tag: string;
  description: string;
  image: string | StaticImageData;
  href: string;
  accent: string;
  stack: string[];
};

export const projectCategories: Array<"Todos" | ProjectCategory> = [
  "Todos",
  "WordPress",
  "React Native",
  "React",
  "Express.js",
];

export const projects: ProjectItem[] = [
  {
    title: "Andrea Krug",
    category: "WordPress",
    tag: "Site institucional premium",
    description:
      'Site oficial de Andrea Krug com direção visual sofisticada, narrativa forte e foco em autoridade, eventos e posicionamento digital.',
    image: andreaImage,
    href: "https://andrea-krug-website.vercel.app/",
    accent: "from-[#f08b64]/50 via-[#ffb58d]/24 to-transparent",
    stack: ["WordPress", "Elementor", "UI Direction"],
  },
  {
    title: "Dev Brazuka",
    category: "React",
    tag: "Plataforma editorial",
    description:
      "Plataforma de blog técnico com foco em performance, leitura fluida e experiência moderna para desenvolvedores brasileiros.",
    image: devBrazukaImage,
    href: "https://devbrazuka-hub.vercel.app/",
    accent: "from-white/30 via-white/12 to-transparent",
    stack: ["React", "TypeScript", "Content UX"],
  },
  {
    title: "Vagas Dev",
    category: "Express.js",
    tag: "Produto full stack",
    description:
      "Plataforma de recrutamento orientada ao universo tech, conectando empresas e talentos com clareza visual e navegação objetiva.",
    image: vagasDevImage,
    href: "https://vagas-para-devs-liard.vercel.app/",
    accent: "from-[#d7e2ff]/26 via-white/10 to-transparent",
    stack: ["Express.js", "APIs", "Product Design"],
  },
  {
    title: "Studio Commerce",
    category: "React",
    tag: "E-commerce experience",
    description:
      "Landing commerce com foco em conversão, vitrine editorial, motion sutil e sensação de produto high-end.",
    image: andreaImage,
    href: "/#projects",
    accent: "from-[#f8c8a4]/32 via-white/10 to-transparent",
    stack: ["React", "Next.js", "Conversion UX"],
  },
  {
    title: "Field Ops Mobile",
    category: "React Native",
    tag: "Aplicativo operacional",
    description:
      "Aplicação mobile pensada para velocidade de uso em campo, fluxo claro, toques amplos e leitura imediata.",
    image: devBrazukaImage,
    href: "/#contact",
    accent: "from-[#8fd8ff]/28 via-white/10 to-transparent",
    stack: ["React Native", "Mobile UX", "Design System"],
  },
  {
    title: "API Control Hub",
    category: "Express.js",
    tag: "Backoffice e integrações",
    description:
      "Painel e camada de serviços voltados a integrações, monitoramento de rotas e arquitetura previsível para escala.",
    image: vagasDevImage,
    href: "/#contact",
    accent: "from-[#9fb5ff]/24 via-white/10 to-transparent",
    stack: ["Express.js", "Node.js", "Scalable Engineering"],
  },
];
