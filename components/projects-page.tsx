"use client";

import Image from "next/image";
import { ArrowUpRight, Code2, Layers3, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";

import { AppLink } from "@/components/app-link";
import { FloatingActionButtons } from "@/components/floating-action-buttons";
import { MagneticButton } from "@/components/magnetic-button";
import { NoiseOverlay } from "@/components/noise-overlay";
import { SiteNavbar } from "@/components/site-navbar";
import { StickyFloatingMenu } from "@/components/sticky-floating-menu";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { useProjectCardMotion } from "@/components/use-project-card-motion";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof projectCategories)[number]>("Todos");
  const gridRef = useRef<HTMLDivElement | null>(null);

  const filteredProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const {
    activeIndex,
    setActiveIndex,
    cardRefs,
    imageRefs,
    contentRefs,
    glowRefs,
    handlePointerEnter,
    handlePointerMove,
    handlePointerLeave,
    resetCard,
  } = useProjectCardMotion(projects.length);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(
        [
          ".projects-page-kicker",
          ".projects-page-title-line",
          ".projects-page-copy",
          ".projects-page-hero-card",
          ".projects-page-filter-bar",
          ".projects-page-card",
          ".projects-page-cta",
        ],
        {
          opacity: 0,
          y: 26,
        },
      );

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".nav-float", {
          y: -24,
          opacity: 0,
          duration: 0.64,
        })
        .to(
          [
            ".projects-page-kicker",
            ".projects-page-title-line",
            ".projects-page-copy",
            ".projects-page-hero-card",
            ".projects-page-filter-bar",
          ],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
          },
          "-=0.18",
        );

      if (!reduceMotion) {
        gsap.to(".projects-page-card", {
          opacity: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-page-grid",
            start: "top 76%",
          },
        });

        gsap.to(".projects-page-card", {
          yPercent: (index) => (index % 2 === 0 ? 1.1 : -0.9),
          ease: "none",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".projects-page-cta", {
          opacity: 1,
          y: 0,
          duration: 0.84,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-page-cta-shell",
            start: "top 82%",
          },
        });
      } else {
        gsap.set([".projects-page-card", ".projects-page-cta"], { opacity: 1, y: 0 });
      }
    });

    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        ".projects-page-card",
        {
          opacity: 0,
          y: 72,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.14,
          ease: "power3.out",
          overwrite: true,
        },
      );
    });

    return () => context.revert();
  }, [activeCategory]);

  return (
    <main id="top" className="page-shell">
      <NoiseOverlay />
      <FloatingActionButtons />
      <StickyFloatingMenu targetSelector="#site-navbar" />

      <div className="app-shell-mobile mx-auto min-h-screen max-w-[1600px] px-3 py-3 sm:px-5 sm:py-5 lg:px-6">
        <div className="relative overflow-hidden rounded-[38px] border border-white/8 bg-[#111111] px-3.5 pb-8 pt-3.5 shadow-[0_32px_100px_rgba(0,0,0,0.28)] sm:px-6 sm:pb-10 sm:pt-6 lg:rounded-[34px] lg:border-white/6 lg:px-10 lg:pb-14">
          <SiteNavbar />

          <section className="hero-shell relative overflow-hidden rounded-[36px] border border-white/8 bg-[linear-gradient(180deg,rgba(9,9,10,0.98),rgba(12,12,13,0.98))] px-4 py-10 sm:px-5 sm:py-12 lg:min-h-[620px] lg:rounded-[34px] lg:px-10 lg:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_24%),radial-gradient(circle_at_50%_18%,rgba(255,107,53,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:96px_96px]" />
            <div className="pointer-events-none absolute inset-x-[10%] top-[12%] h-[34%] rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.14),transparent_62%)] blur-3xl" />

            <div className="relative z-[1] grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.8fr)] lg:items-end lg:gap-10">
              <div className="text-center lg:text-left">
                <div className="projects-page-kicker inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-white/58">
                  <Sparkles className="h-3 w-3 text-primary" strokeWidth={1.7} />
                  Seleção de projetos
                </div>

                <div className="mt-5 space-y-1 text-[clamp(2.35rem,7vw,5.8rem)] leading-[0.92] font-medium tracking-[-0.07em] text-white">
                  <div className="projects-page-title-line">Projetos construídos</div>
                  <div className="projects-page-title-line">com foco em design,</div>
                  <div className="projects-page-title-line">performance e experiência</div>
                </div>

                <p className="projects-page-copy mx-auto mt-6 max-w-[40rem] text-[0.98rem] leading-7 text-white/58 sm:text-[1.02rem] lg:mx-0 lg:text-[1.06rem]">
                  Uma seleção de produtos, interfaces e aplicações desenvolvidas com diferentes tecnologias, linguagens e objetivos, sempre mantendo direção visual forte e fluidez de uso.
                </p>
              </div>

              <div className="projects-page-hero-card relative mx-auto w-full max-w-[28rem] lg:ml-auto">
                <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-md sm:p-6">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_36%),linear-gradient(180deg,rgba(255,107,53,0.08),transparent_34%)]" />

                  <div className="relative z-[1] grid gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                        <Layers3 className="h-5 w-5 text-white/84" strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-white/38">Curadoria</p>
                        <p className="mt-1 text-sm text-white/74">Projetos com diferentes tecnologias e objetivos.</p>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                      <div className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-white/42">
                        <Code2 className="h-4 w-4 text-primary" strokeWidth={1.8} />
                        Categorias
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/58">
                        WordPress, React Native, React e Express.js organizados em uma experiência visual consistente e filtrável.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-1 pb-5 pt-12 sm:px-2 lg:px-3 lg:pt-16">
            <div className="projects-page-filter-bar flex flex-wrap justify-center gap-2.5 lg:justify-start">
              {projectCategories.map((category) => {
                const isActive = category === activeCategory;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-4 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-[transform,border-color,background,color,box-shadow] duration-300 ${
                      isActive
                        ? "border-primary/28 bg-primary/14 text-white shadow-[0_14px_34px_rgba(255,107,53,0.14)]"
                        : "border-white/10 bg-white/[0.03] text-white/54 hover:-translate-y-0.5 hover:border-white/16 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div ref={gridRef} className="projects-page-grid mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => {
                const projectIndex = projects.indexOf(project);

                return (
                <article
                  key={`${project.title}-${project.category}`}
                  ref={(node) => {
                    cardRefs.current[projectIndex] = node;
                  }}
                  className={`projects-page-card project-card-shell group relative overflow-hidden rounded-[30px] border border-white/10 bg-[#131313] shadow-[0_28px_90px_rgba(0,0,0,0.32)] transition-[filter,opacity,box-shadow,border-color] duration-500 [transform-style:preserve-3d] ${
                    activeIndex === projectIndex
                      ? "z-20 border-white/18 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
                      : "shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                  } ${
                    activeIndex !== null && activeIndex !== projectIndex
                      ? "opacity-60 saturate-[0.72] contrast-[0.88] blur-[0.6px]"
                      : "opacity-100"
                  }`}
                  onPointerEnter={() => handlePointerEnter(projectIndex)}
                  onPointerMove={(event) => handlePointerMove(projectIndex, event)}
                  onPointerLeave={() => handlePointerLeave(projectIndex)}
                  onFocusCapture={() => setActiveIndex(projectIndex)}
                  onBlurCapture={() => {
                    setActiveIndex((current) => (current === projectIndex ? null : current));
                    resetCard(projectIndex);
                  }}
                  style={{ perspective: "1600px" }}
                >
                  <div className="absolute inset-[1px] rounded-[29px] border border-white/8 opacity-80" />
                  <div
                    ref={(node) => {
                      glowRefs.current[projectIndex] = node;
                    }}
                    className={`pointer-events-none absolute inset-x-[18%] top-[10%] z-[1] h-[36%] rounded-full bg-gradient-to-b ${project.accent} opacity-0 blur-3xl`}
                  />

                  <div className="relative h-full min-h-[420px] overflow-hidden">
                    <div
                      ref={(node) => {
                        imageRefs.current[projectIndex] = node;
                      }}
                      className="absolute inset-[-3%] scale-[1.05]"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        quality={75}
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                        className={`object-cover object-center brightness-[0.8] contrast-[1.06] saturate-[0.9] transition-[transform,filter] duration-700 ${
                          activeIndex === projectIndex ? "scale-[1.04]" : "scale-100"
                        }`}
                      />
                    </div>

                    <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.55),transparent_38%),linear-gradient(180deg,rgba(8,8,8,0.04)_0%,rgba(8,8,8,0.12)_28%,rgba(8,8,8,0.84)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.08)_34%,rgba(0,0,0,0.76)_82%,rgba(0,0,0,0.94)_100%)]" />

                    <div className="absolute inset-x-5 top-5 z-[3] flex items-start justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/10 bg-black/18 px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.22em] text-white/58 backdrop-blur-md">
                          {project.category}
                        </span>
                        <span className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-white/36">
                          {project.tag}
                        </span>
                      </div>
                      <div className="font-serif text-[1.7rem] leading-none tracking-[-0.08em] text-white/28">
                        {String(projects.indexOf(project) + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div
                      ref={(node) => {
                        contentRefs.current[projectIndex] = node;
                      }}
                      className="absolute inset-x-0 bottom-0 z-[3] p-5 sm:p-6 lg:p-7"
                    >
                      <div className="max-w-[36rem]">
                        <h3 className="max-w-[12ch] text-[1.9rem] leading-[0.95] font-medium tracking-[-0.06em] text-white sm:text-[2.15rem]">
                          {project.title}
                        </h3>
                        <p className="mt-3 max-w-[42ch] text-sm leading-6 text-white/58 sm:text-[0.95rem]">
                          {project.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.stack.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-white/42"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6">
                          <AppLink
                            href={project.href}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/18 px-3.5 py-2.5 text-[0.72rem] uppercase tracking-[0.2em] text-white/62 transition-[transform,border-color,background,color] duration-300 hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.08] hover:text-white"
                          >
                            Ver projeto
                            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </AppLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )})}
            </div>
          </section>

          <section className="projects-page-cta-shell px-1 pb-4 pt-12 sm:px-2 lg:px-3 lg:pb-6 lg:pt-16">
            <div className="projects-page-cta relative overflow-hidden rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,13,0.96),rgba(14,14,15,0.98))] px-5 py-12 shadow-[0_30px_90px_rgba(0,0,0,0.24)] sm:px-8 sm:py-14 lg:px-10 lg:py-18">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_28%),radial-gradient(circle_at_50%_28%,rgba(255,107,53,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent_34%)]" />

              <div className="relative z-[1] mx-auto max-w-[820px] text-center">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/54">
                  Próximo projeto
                </span>
                <h2 className="mt-5 text-[clamp(2.2rem,5vw,4.8rem)] leading-[0.93] font-medium tracking-[-0.06em] text-white">
                  Quer construir um projeto assim?
                </h2>
                <p className="mx-auto mt-5 max-w-[640px] text-[0.98rem] leading-7 text-white/54 sm:text-[1.04rem]">
                  Posso desenhar, estruturar e implementar uma experiência digital alinhada com estética premium, performance e estratégia de produto.
                </p>

                <div className="mt-8 flex justify-center">
                  <MagneticButton href="/#contact" label="Entrar em contato" className="w-full justify-center sm:w-auto" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
