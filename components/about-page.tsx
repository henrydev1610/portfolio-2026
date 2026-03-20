"use client";

import Image from "next/image";
import { ArrowUpRight, Compass, Cpu, Layers3, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

import { AppLink } from "@/components/app-link";
import aboutBackground from "@/app/bg-about.jpeg";
import { FloatingActionButtons } from "@/components/floating-action-buttons";
import { MagneticButton } from "@/components/magnetic-button";
import { NoiseOverlay } from "@/components/noise-overlay";
import { SiteNavbar } from "@/components/site-navbar";
import { StickyFloatingMenu } from "@/components/sticky-floating-menu";

gsap.registerPlugin(ScrollTrigger);

const approachItems = [
  {
    title: "Design First",
    description: "Interfaces com direção de arte, hierarquia clara e leitura instantânea em qualquer viewport.",
    Icon: Sparkles,
  },
  {
    title: "Performance Driven",
    description: "Arquitetura de front-end orientada a fluidez, rendering consistente e percepção premium.",
    Icon: Cpu,
  },
  {
    title: "Experiência do Usuário",
    description: "Microinterações, motion systems e cadência visual pensadas para transmitir valor real.",
    Icon: Compass,
  },
  {
    title: "Engenharia Escalável",
    description: "Código modular, manutenção previsível e base técnica pronta para evoluir com o produto.",
    Icon: Layers3,
  },
] as const;

const journeyItems = [
  {
    year: "Início",
    title: "Base técnica e curiosidade visual",
    description: "Comecei desenvolvendo interfaces e entendendo como design e código podem trabalhar como um único sistema.",
  },
  {
    year: "Evolução",
    title: "Full stack com foco em produto",
    description: "Passei a construir experiências completas, do front-end premium à lógica de negócio e integração.",
  },
  {
    year: "Refino",
    title: "Performance, motion e direção visual",
    description: "Aprofundei o trabalho em animações fluidas, ergonomia visual e acabamento de alto nível.",
  },
  {
    year: "Hoje",
    title: "Experiências digitais memoráveis",
    description: "Crio sites, interfaces e produtos que equilibram estética, clareza, estratégia e performance.",
  },
] as const;

export function AboutPage() {
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      gsap.set(
        [
          ".about-kicker",
          ".about-title-line",
          ".about-copy",
          ".about-name",
          ".about-hero-card",
          ".about-hero-cta",
          ".about-approach-card",
          ".about-timeline-item",
          ".about-cta-block",
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
          ".about-kicker, .about-title-line, .about-copy, .about-name, .about-hero-card, .about-hero-cta",
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.72 : 0.86,
            stagger: 0.08,
          },
          "-=0.18",
        );

      if (!reduceMotion) {
        gsap.fromTo(
          ".about-hero-image",
          { yPercent: -1.6, scale: 1.04 },
          {
            yPercent: 2.2,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-shell",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      gsap.to(".about-approach-card", {
        opacity: 1,
        y: 0,
        duration: 0.82,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-approach-grid",
          start: "top 76%",
        },
      });

      gsap.to(".about-timeline-item", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-timeline-grid",
          start: "top 76%",
        },
      });

      gsap.to(".about-cta-block", {
        opacity: 1,
        y: 0,
        duration: 0.88,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-cta-shell",
          start: "top 80%",
        },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <main id="top" className="page-shell">
      <NoiseOverlay />
      <FloatingActionButtons />
      <StickyFloatingMenu targetSelector="#site-navbar" />

      <div className="app-shell-mobile mx-auto min-h-screen max-w-[1600px] px-3 py-3 sm:px-5 sm:py-5 lg:px-6">
        <div className="relative overflow-hidden rounded-[38px] border border-white/8 bg-[#111111] px-3.5 pb-8 pt-3.5 shadow-[0_32px_100px_rgba(0,0,0,0.28)] sm:px-6 sm:pb-10 sm:pt-6 lg:rounded-[34px] lg:border-white/6 lg:px-10 lg:pb-14">
          <SiteNavbar />

          <section className="hero-shell relative overflow-hidden rounded-[36px] px-1.5 pt-2.5 sm:px-2 sm:pt-2 lg:min-h-[860px] lg:rounded-[34px]">
            <div className="about-hero-image absolute inset-0 z-0 overflow-hidden rounded-[36px] lg:rounded-[34px]">
              <Image
                src={aboutBackground}
                alt="Background cinematográfico da página Sobre"
                fill
                priority
                quality={82}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 z-[1] rounded-[36px] bg-[linear-gradient(180deg,rgba(9,9,10,0.7)_0%,rgba(9,9,10,0.42)_22%,rgba(9,9,10,0.84)_100%)] lg:rounded-[34px]" />
            <div className="pointer-events-none absolute inset-0 z-[2] rounded-[36px] bg-[linear-gradient(90deg,rgba(9,9,10,0.92)_0%,rgba(9,9,10,0.72)_24%,rgba(9,9,10,0.2)_52%,rgba(9,9,10,0.84)_100%)] lg:rounded-[34px]" />
            <div className="pointer-events-none absolute inset-0 z-[3] rounded-[36px] bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,0.14),transparent_18%),linear-gradient(180deg,transparent_20%,rgba(0,0,0,0.18)_46%,rgba(0,0,0,0.48)_100%)] lg:rounded-[34px]" />
            <div className="pointer-events-none absolute inset-x-[8%] top-[10%] z-[4] h-[36%] rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.11),transparent_62%)] blur-3xl" />

            <div className="relative z-[5] px-4 pb-7 pt-5 sm:px-5 sm:pb-8 sm:pt-5 lg:px-0 lg:pb-0 lg:pt-0">
              <div className="mt-2 px-2 sm:mt-3 lg:hidden">
                <h1 className="about-name text-center text-[clamp(3.65rem,17vw,12.6rem)] leading-[0.88] font-semibold tracking-[-0.09em] text-white">
                  Henry
                </h1>
              </div>

              <div className="grid gap-6 pt-5 sm:gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.78fr)] lg:items-end lg:gap-10 lg:pt-0">
                <div className="pt-2 text-center lg:max-w-[760px] lg:pt-18 lg:text-left">
                  <div className="about-kicker inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-white/58">
                    <Sparkles className="h-3 w-3 text-primary" strokeWidth={1.7} />
                    Construindo marcas e produtos digitais
                  </div>

                  <div className="mt-5 space-y-1 text-[clamp(2.45rem,8vw,6rem)] leading-[0.92] font-medium tracking-[-0.07em] text-white">
                    <div className="about-title-line">Construindo experiências</div>
                    <div className="about-title-line">digitais que combinam</div>
                    <div className="about-title-line">design, tecnologia e estratégia</div>
                  </div>

                  <p className="about-copy mx-auto mt-6 max-w-[34rem] text-[0.98rem] leading-7 text-white/60 sm:text-[1.02rem] lg:mx-0 lg:text-[1.08rem]">
                    Sou Henry, desenvolvedor focado em criar interfaces premium, produtos digitais modernos e experiências imersivas com direção visual, performance e intenção.
                  </p>

                  <div className="about-hero-cta mt-7 flex justify-center lg:justify-start">
                    <MagneticButton href="/#contact" label="Entrar em contato" className="w-full justify-center sm:w-auto" />
                  </div>
                </div>

                <div className="about-hero-card relative mx-auto w-full max-w-[26rem] lg:ml-auto lg:max-w-[29rem]">
                  <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-md sm:p-6 lg:p-7">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_34%),linear-gradient(180deg,rgba(255,107,53,0.08),transparent_32%)]" />
                    <div className="pointer-events-none absolute right-[-8%] top-[-8%] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.18),transparent_72%)] blur-3xl" />

                    <div className="relative z-[1]">
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/42">
                        Minha abordagem
                      </p>
                      <p className="mt-4 text-[1.45rem] leading-[1.05] font-medium tracking-[-0.04em] text-white sm:text-[1.7rem]">
                        UI/UX, engenharia full stack e performance como uma mesma linguagem.
                      </p>
                      <p className="mt-4 text-[0.95rem] leading-7 text-white/56">
                        Meu trabalho une estratégia visual, implementação cuidadosa e acabamento técnico para transformar ideias em produtos que parecem sofisticados, rápidos e confiáveis.
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3">
                          <p className="text-[0.66rem] uppercase tracking-[0.22em] text-white/38">Foco</p>
                          <p className="mt-2 text-sm text-white/78">UX premium e interfaces com identidade forte</p>
                        </div>
                        <div className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3">
                          <p className="text-[0.66rem] uppercase tracking-[0.22em] text-white/38">Entrega</p>
                          <p className="mt-2 text-sm text-white/78">Produtos digitais com fluidez e clareza</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-[5] mt-6 hidden px-2 lg:mt-[-48px] lg:block lg:px-0">
              <h1 className="about-name text-center text-[clamp(3.65rem,17vw,12.6rem)] leading-[0.88] font-semibold tracking-[-0.09em] text-white">
                Henry
              </h1>
            </div>
          </section>

          <section className="px-1 pb-5 pt-12 sm:px-2 lg:px-3 lg:pt-16">
            <div className="relative overflow-hidden rounded-[32px] border border-white/7 bg-[linear-gradient(180deg,rgba(10,10,11,0.96),rgba(14,14,15,0.98))] px-5 py-12 shadow-[0_30px_90px_rgba(0,0,0,0.24)] sm:px-8 sm:py-14 lg:px-10 lg:py-18">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_26%),radial-gradient(circle_at_50%_14%,rgba(255,107,53,0.1),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.01),transparent_34%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:96px_96px]" />

              <div className="relative z-[1] mx-auto max-w-[860px] text-center">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/54">
                  Metodologia
                </span>
                <h2 className="mt-5 text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.93] font-medium tracking-[-0.06em] text-white">
                  Minha abordagem para construir experiências premium
                </h2>
                <p className="mx-auto mt-5 max-w-[720px] text-[0.98rem] leading-7 text-white/52 sm:text-[1.02rem]">
                  Cada projeto nasce de uma combinação entre direção visual, percepção de performance e engenharia consistente para entregar valor além da estética.
                </p>
              </div>

              <div className="about-approach-grid relative z-[1] mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
                {approachItems.map(({ title, description, Icon }) => (
                  <article
                    key={title}
                    className="about-approach-card group relative overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-md transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-primary/24 hover:shadow-[0_28px_72px_rgba(255,107,53,0.12)] sm:p-7"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_40%,rgba(0,0,0,0.14)_100%)]" />
                    <div className="pointer-events-none absolute right-[-10%] top-[-8%] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.14),transparent_72%)] blur-3xl" />

                    <div className="relative z-[1]">
                      <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/84 shadow-[0_12px_28px_rgba(0,0,0,0.16)]">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <h3 className="mt-6 text-[1.35rem] leading-[1.04] font-medium tracking-[-0.04em] text-white">
                        {title}
                      </h3>
                      <p className="mt-4 text-[0.94rem] leading-7 text-white/54">
                        {description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-1 pb-5 pt-12 sm:px-2 lg:px-3 lg:pt-16">
            <div className="relative overflow-hidden rounded-[32px] border border-white/7 bg-[linear-gradient(180deg,rgba(10,10,11,0.96),rgba(14,14,15,0.98))] px-5 py-12 shadow-[0_30px_90px_rgba(0,0,0,0.24)] sm:px-8 sm:py-14 lg:px-10 lg:py-18">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_26%),radial-gradient(circle_at_36%_16%,rgba(255,107,53,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.01),transparent_34%)]" />

              <div className="relative z-[1] grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
                <div className="max-w-[34rem]">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/54">
                    Jornada
                  </span>
                  <h2 className="mt-5 text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.94] font-medium tracking-[-0.06em] text-white">
                    Uma trajetória orientada por produto, estética e evolução técnica.
                  </h2>
                  <p className="mt-5 max-w-[32rem] text-[0.98rem] leading-7 text-white/52 sm:text-[1.02rem]">
                    Meu caminho foi moldado pela busca por experiências digitais que sejam não apenas bonitas, mas também rápidas, claras e estrategicamente construídas.
                  </p>
                </div>

                <div className="about-timeline-grid relative pl-5 sm:pl-6">
                  <div className="pointer-events-none absolute bottom-0 left-[10px] top-0 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,107,53,0.4),rgba(255,255,255,0.04))] sm:left-[12px]" />

                  <div className="grid gap-5">
                    {journeyItems.map((item) => (
                      <article
                        key={item.title}
                        className="about-timeline-item relative overflow-hidden rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-5 shadow-[0_22px_54px_rgba(0,0,0,0.18)] backdrop-blur-md sm:p-6"
                      >
                        <div className="absolute left-[-18px] top-7 h-5 w-5 rounded-full border border-primary/30 bg-[#121212] shadow-[0_0_0_6px_rgba(17,17,17,0.9)] sm:left-[-20px]" />
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_38%,rgba(0,0,0,0.14)_100%)]" />

                        <div className="relative z-[1]">
                          <p className="text-[0.66rem] uppercase tracking-[0.24em] text-primary/84">
                            {item.year}
                          </p>
                          <h3 className="mt-3 text-[1.28rem] leading-[1.06] font-medium tracking-[-0.04em] text-white">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-[0.95rem] leading-7 text-white/54">
                            {item.description}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="about-cta-shell px-1 pb-4 pt-12 sm:px-2 lg:px-3 lg:pb-6 lg:pt-16">
            <div className="about-cta-block relative overflow-hidden rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,13,0.96),rgba(14,14,15,0.98))] px-5 py-12 shadow-[0_30px_90px_rgba(0,0,0,0.24)] sm:px-8 sm:py-14 lg:px-10 lg:py-18">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_28%),radial-gradient(circle_at_50%_28%,rgba(255,107,53,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent_34%)]" />
              <div className="pointer-events-none absolute inset-x-[16%] top-[16%] h-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_74%)] blur-[76px]" />

              <div className="relative z-[1] mx-auto max-w-[820px] text-center">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/54">
                  Vamos conversar
                </span>
                <h2 className="mt-5 text-[clamp(2.2rem,5vw,4.8rem)] leading-[0.93] font-medium tracking-[-0.06em] text-white">
                  Vamos construir algo incrível juntos.
                </h2>
                <p className="mx-auto mt-5 max-w-[640px] text-[0.98rem] leading-7 text-white/54 sm:text-[1.04rem]">
                  Se você busca uma experiência digital premium, com direção visual forte e execução técnica refinada, podemos criar algo realmente memorável.
                </p>

                <div className="mt-8 flex justify-center">
                  <MagneticButton href="/#contact" label="Entrar em contato" className="w-full justify-center sm:w-auto" />
                </div>

                <div className="mt-8 inline-flex items-center gap-2 text-sm text-white/42">
                  Ver projetos recentes
                  <AppLink href="/#projects" className="inline-flex items-center gap-1 text-white/72 transition-colors hover:text-white">
                    Explorar
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                  </AppLink>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
