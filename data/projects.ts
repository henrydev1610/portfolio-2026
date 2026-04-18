import type { StaticImageData } from "next/image";

import andreaImage from "@/app/krug.png";
import devBrazukaImage from "@/app/dev-brazuca.png";
import sempreBelaImage from "@/app/sempre-bela.png";
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
    stack: ["WordPress", "Elementor", "Direção de UI"],
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
    stack: ["React", "TypeScript", "UX de conteúdo"],
  },
  {
    title: "Clinica Estetica Sempre Bela",
    category: "React",
    tag: "Site para clinica de estetica premium",
    description:
      "Site para clinica de estetica alto padrao com direcao visual sofisticada, foco em conversao e experiencia elegante.",
    image: sempreBelaImage,
    href: "https://clinica-estetica-nu.vercel.app/",
    accent: "from-[#f6c9ad]/34 via-white/10 to-transparent",
    stack: ["React", "Site institucional", "UI premium"],
  },
  {
    title: "Vagas Dev",
    category: "Express.js",
    tag: "Produto completo",
    description:
      "Plataforma de recrutamento orientada ao universo de tecnologia, conectando empresas e talentos com clareza visual e navegação objetiva.",
    image: vagasDevImage,
    href: "https://vagas-para-devs-liard.vercel.app/",
    accent: "from-[#d7e2ff]/26 via-white/10 to-transparent",
    stack: ["Express.js", "APIs", "Design de produto"],
  },
  {
    title: "Studio Commerce",
    category: "React",
    tag: "Experiência de e-commerce",
    description:
      "Página comercial com foco em conversão, vitrine editorial, movimento sutil e percepção de produto de alto padrão.",
    image: andreaImage,
    href: "/#projects",
    accent: "from-[#f8c8a4]/32 via-white/10 to-transparent",
    stack: ["React", "Next.js", "UX de conversão"],
  },
  {
    title: "Field Ops Mobile",
    category: "React Native",
    tag: "Aplicativo operacional",
    description:
      "Aplicação para dispositivos móveis pensada para velocidade de uso em campo, fluxo claro, toques amplos e leitura imediata.",
    image: devBrazukaImage,
    href: "/#contact",
    accent: "from-[#8fd8ff]/28 via-white/10 to-transparent",
    stack: ["React Native", "UX para dispositivos móveis", "Sistema de design"],
  },
  {
    title: "API Control Hub",
    category: "Express.js",
    tag: "Painel administrativo e integrações",
    description:
      "Painel e camada de serviços voltados a integrações, monitoramento de rotas e arquitetura previsível para escala.",
    image: vagasDevImage,
    href: "/#contact",
    accent: "from-[#9fb5ff]/24 via-white/10 to-transparent",
    stack: ["Express.js", "Node.js", "Engenharia escalável"],
  },
];


