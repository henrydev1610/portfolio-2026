"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";

import andreaImage from "@/app/krug.png";
import devBrazukaImage from "@/app/dev-brazuca.png";
import vagasDevImage from "@/app/vagas-dev.png";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  tag: string;
  descriptor: string;
  image: string | StaticImageData;
  href: string;
  accent: string;
};

type CardController = {
  rotateX: (value: number) => gsap.core.Tween;
  rotateY: (value: number) => gsap.core.Tween;
  scale: (value: number) => gsap.core.Tween;
  imageX: (value: number) => gsap.core.Tween;
  imageY: (value: number) => gsap.core.Tween;
  contentY: (value: number) => gsap.core.Tween;
  glowX: (value: number) => gsap.core.Tween;
  glowY: (value: number) => gsap.core.Tween;
  glowOpacity: (value: number) => gsap.core.Tween;
};

const projects: Project[] = [
  {
    title: "Andrea Krug",
    tag: "landing page",
    descriptor:
      'Site oficial de Andrea Krug, palestrante, mentora executiva e autora do livro "Vai Encarar". O site apresenta uma experiencia digital imersiva com design futurista, destacando sua trajetoria profissional, eventos, e promovendo seu trabalho de transformacao pessoal e corporativa.',
    image: andreaImage,
    href: "https://andrea-krug-website.vercel.app/",
    accent: "from-[#f08b64]/50 via-[#ffb58d]/24 to-transparent",
  },
  {
    title: "Dev Brazuka",
    tag: "Projeto fullstack",
    descriptor:
      "Dev Brazuka e uma plataforma completa de blog tecnico desenvolvida para a comunidade de desenvolvedores brasileiros.",
    image: devBrazukaImage,
    href: "https://devbrazuka-hub.vercel.app/",
    accent: "from-white/30 via-white/12 to-transparent",
  },
  {
    title: "Vagas Dev",
    tag: "Projeto fullstack",
    descriptor:
      "DevVagas e uma plataforma de recrutamento focada em desenvolvedores, conectando talentos tech a empresas inovadoras. ",
    image: vagasDevImage,
    href: "https://vagas-para-devs-liard.vercel.app/",
    accent: "from-[#d7e2ff]/26 via-white/10 to-transparent",
  },
];

const layoutByIndex = [
  "md:col-span-2 xl:col-span-7 xl:row-span-2",
  "md:col-span-1 xl:col-span-5 xl:row-span-1",
  "md:col-span-1 xl:col-span-5 xl:row-span-1",
];

export function ProjectCards() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLSpanElement | null>(null);
  const titleLineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const glowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const controllersRef = useRef<Array<CardController | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = cardRefs.current.filter(Boolean);
      const titleLines = titleLineRefs.current.filter(Boolean);

      gsap.set(badgeRef.current, {
        opacity: 0,
        y: 16,
        filter: "blur(10px)",
      });
      gsap.set(titleLines, {
        opacity: 0,
        y: 34,
        filter: "blur(18px)",
      });
      gsap.set(cards, {
        opacity: 0,
        y: 72,
      });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 76%",
          },
        })
        .to(badgeRef.current, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.72,
        })
        .to(
          titleLines,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.02,
            stagger: 0.14,
          },
          "-=0.26",
        )
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.14,
          },
          "-=0.45",
        );

      if (!reduceMotion) {
        gsap.to(cards, {
          yPercent: (index) => (index === 0 ? -2.5 : index % 2 === 0 ? 2.2 : -1.8),
          ease: "none",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.18,
          },
        });
      }

      cards.forEach((card, index) => {
        const image = imageRefs.current[index];
        const content = contentRefs.current[index];
        const glow = glowRefs.current[index];

        if (!card || !image || !content || !glow) {
          return;
        }

        controllersRef.current[index] = {
          rotateX: gsap.quickTo(card, "rotateX", { duration: 0.45, ease: "power3.out" }),
          rotateY: gsap.quickTo(card, "rotateY", { duration: 0.45, ease: "power3.out" }),
          scale: gsap.quickTo(card, "scale", { duration: 0.45, ease: "power3.out" }),
          imageX: gsap.quickTo(image, "x", { duration: 0.55, ease: "power3.out" }),
          imageY: gsap.quickTo(image, "y", { duration: 0.55, ease: "power3.out" }),
          contentY: gsap.quickTo(content, "y", { duration: 0.45, ease: "power3.out" }),
          glowX: gsap.quickTo(glow, "x", { duration: 0.55, ease: "power3.out" }),
          glowY: gsap.quickTo(glow, "y", { duration: 0.55, ease: "power3.out" }),
          glowOpacity: gsap.quickTo(glow, "opacity", { duration: 0.35, ease: "power2.out" }),
        };
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  const resetCard = (index: number) => {
    const controller = controllersRef.current[index];
    if (!controller) {
      return;
    }

    controller.rotateX(0);
    controller.rotateY(0);
    controller.scale(1);
    controller.imageX(0);
    controller.imageY(0);
    controller.contentY(0);
    controller.glowX(0);
    controller.glowY(0);
    controller.glowOpacity(0);
  };

  const handlePointerEnter = (index: number) => {
    setActiveIndex(index);

    const controller = controllersRef.current[index];
    if (!controller) {
      return;
    }

    controller.scale(1.018);
    controller.contentY(-6);
    controller.glowOpacity(0.9);
  };

  const handlePointerMove = (index: number, event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const card = cardRefs.current[index];
    const controller = controllersRef.current[index];
    if (!card || !controller) {
      return;
    }

    const bounds = card.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const deltaX = relativeX / bounds.width - 0.5;
    const deltaY = relativeY / bounds.height - 0.5;

    controller.rotateX(deltaY * -8);
    controller.rotateY(deltaX * 10);
    controller.imageX(deltaX * 22);
    controller.imageY(deltaY * 18);
    controller.glowX(deltaX * 34);
    controller.glowY(deltaY * 28);
  };

  const handlePointerLeave = (index: number) => {
    setActiveIndex((current) => (current === index ? null : current));
    resetCard(index);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-1 pb-5 pt-12 sm:px-2 lg:px-3 lg:pb-8 lg:pt-16"
    >
      <div className="projects-stage relative overflow-hidden rounded-[32px] border border-white/7 bg-[linear-gradient(180deg,rgba(10,10,11,0.96),rgba(14,14,15,0.98))] px-5 py-12 shadow-[0_30px_90px_rgba(0,0,0,0.24)] sm:px-8 sm:py-14 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_26%),radial-gradient(circle_at_50%_16%,rgba(255,107,53,0.10),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.01),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:96px_96px]" />
        <div className="pointer-events-none absolute left-[-8%] top-[16%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.15),transparent_72%)] blur-[88px]" />
        <div className="pointer-events-none absolute right-[-6%] bottom-[8%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_72%)] blur-[100px]" />
        <div className="pointer-events-none absolute inset-x-[7%] top-10 h-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_72%)] blur-3xl" />

        <div
          ref={introRef}
          className="relative z-[2] mb-10 flex flex-col items-center gap-5 text-center lg:mb-12"
        >
          <span
            ref={badgeRef}
            className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-white/58 backdrop-blur-md"
          >
            PROJETOS
          </span>

          <div className="max-w-400 mt-10 mb-10">
            <h2 className="balanced-text text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-white">
              <span
                ref={(node) => {
                  titleLineRefs.current[0] = node;
                }}
                className="block"
              >
                Projetos que elevam
              </span>
              <span
                ref={(node) => {
                  titleLineRefs.current[1] = node;
                }}
                className="mt-1 block sm:mt-2"
              >
                o padrão da experiência digital.
              </span>
            </h2>
          </div>

          <div className="max-w-[38rem] rounded-[28px] border mb-8 border-white/8 bg-white/[0.025] p-5 backdrop-blur-sm">
            <p className="text-sm leading-6 text-white/56 sm:text-[0.95rem]">
              Cada projeto agora entra como uma peça em direção de arte: foco hierarquico, profundidade controlada
              que valoriza o produto em vez de apenas decorar a interface.
            </p>
          </div>
        </div>
        <div
          ref={gridRef}
          className="projects-grid relative z-[2] grid auto-rows-[minmax(320px,auto)] gap-5 md:grid-cols-2 xl:grid-cols-12"
        >
          {projects.map((project, index) => {
            const isActive = activeIndex === index;
            const isDimmed = activeIndex !== null && !isActive;

            return (
              <Link
                href={project.href}
                key={project.title}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                aria-label={`Abrir projeto ${project.title}`}
                className={`project-card-shell project-card group relative block overflow-hidden rounded-[30px] border border-white/10 bg-[#131313] opacity-0 shadow-[0_28px_90px_rgba(0,0,0,0.32)] transition-[filter,opacity,box-shadow,border-color] duration-500 [transform-style:preserve-3d] ${
                  layoutByIndex[index]
                } ${
                  isActive
                    ? "z-20 border-white/18 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
                    : "shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                } ${isDimmed ? "opacity-60 saturate-[0.72] contrast-[0.88] blur-[0.6px]" : "opacity-100"}`}
                onPointerEnter={() => handlePointerEnter(index)}
                onPointerMove={(event) => handlePointerMove(index, event)}
                onPointerLeave={() => handlePointerLeave(index)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => {
                  setActiveIndex((current) => (current === index ? null : current));
                  resetCard(index);
                }}
                style={{ perspective: "1600px" }}
              >
                <div className="absolute inset-[1px] rounded-[29px] border border-white/8 opacity-80" />
                <div
                  ref={(node) => {
                    glowRefs.current[index] = node;
                  }}
                  className={`pointer-events-none absolute inset-x-[18%] top-[10%] z-[1] h-[36%] rounded-full bg-gradient-to-b ${project.accent} opacity-0 blur-3xl`}
                />

                <div className="relative h-full min-h-[420px] overflow-hidden xl:min-h-0">
                  <div
                    ref={(node) => {
                      imageRefs.current[index] = node;
                    }}
                    className={`absolute inset-[-3%] ${index === 0 ? "scale-[1.04]" : "scale-[1.08]"}`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes={
                        index === 0
                          ? "(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 60vw"
                          : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 34vw"
                      }
                      className={`object-cover transition-[transform,filter] duration-700 ${
                        index === 0
                          ? "object-center brightness-[0.8] contrast-[1.06] saturate-[0.92]"
                          : "object-center brightness-[0.78] contrast-[1.08] saturate-[0.86]"
                      } ${isActive ? "scale-[1.04]" : "scale-100"}`}
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_26%),radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.55),transparent_38%),linear-gradient(180deg,rgba(8,8,8,0.04)_0%,rgba(8,8,8,0.1)_30%,rgba(8,8,8,0.82)_100%)]" />
                  <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.06)_38%,rgba(0,0,0,0.76)_82%,rgba(0,0,0,0.94)_100%)]" />
                  <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,transparent_52%,rgba(0,0,0,0.42)_100%)]" />

                  <div className="absolute inset-x-5 top-5 z-[3] flex items-start justify-between">
                    <div className="rounded-full border border-white/10 bg-black/18 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.24em] text-white/56 backdrop-blur-md">
                      {project.tag}
                    </div>
                    <div className="font-serif text-[1.9rem] leading-none tracking-[-0.08em] text-white/28">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div
                    ref={(node) => {
                      contentRefs.current[index] = node;
                    }}
                    className="absolute inset-x-0 bottom-0 z-[3] p-5 sm:p-6 lg:p-7"
                  >
                    <div className="max-w-[36rem]">
                      
                      <h3
                        className={`max-w-[12ch] text-[2rem] leading-[0.94] font-medium tracking-[-0.06em] text-white sm:text-[2.2rem] ${
                          index === 0 ? "lg:text-[3.3rem]" : "lg:text-[2.45rem]"
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p className="mt-3 max-w-[40ch] text-sm leading-6 text-white/58 sm:text-[0.95rem]">
                        {project.descriptor}
                      </p>

                      <div className="mt-6 flex items-center justify-between gap-4">
                        

                        <div
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[0.72rem] uppercase tracking-[0.2em] transition-all duration-500 ${
                            isActive
                              ? "border-white/18 bg-white/[0.09] text-white"
                              : "border-white/10 bg-black/18 text-white/58"
                          }`}
                        >
                          Ver Site
                          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
