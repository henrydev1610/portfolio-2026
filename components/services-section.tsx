"use client";

import { Cpu, LayoutPanelTop, Rocket, Target } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import {
  AnimatedServiceBackground,
  type ServiceBackgroundVariant,
} from "@/components/animated-service-background";
import { MagneticButton } from "@/components/magnetic-button";

gsap.registerPlugin(ScrollTrigger);

const services: Array<{
  title: string;
  description: string;
  tag: string;
  background: ServiceBackgroundVariant;
  Icon: typeof LayoutPanelTop;
}> = [
  {
    title: "Páginas de venda",
    description:
      "Criação de páginas modernas e altamente persuasivas focadas em conversão e performance.",
    tag: "Alta conversão",
    background: "landing",
    Icon: LayoutPanelTop,
  },
  {
    title: "Páginas de lançamento",
    description:
      "Estruturas completas para lançamentos digitais, infoprodutos e serviços escaláveis.",
    tag: "Escala",
    background: "launch",
    Icon: Rocket,
  },
  {
    title: "Automações com n8n",
    description:
      "Integração e automação de processos para otimizar fluxos e aumentar eficiência operacional.",
    tag: "Automação",
    background: "automation",
    Icon: Cpu,
  },
  {
    title: "Gestão de tráfego pago",
    description:
      "Criação e otimização de campanhas focadas em geração de leads e crescimento de receita.",
    tag: "Performance",
    background: "traffic",
    Icon: Target,
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set([".services-header", ".services-card", ".services-cta"], {
        opacity: 0,
        y: 34,
      });

      gsap.to(".services-header", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
        },
      });

      gsap.to(".services-card", {
        opacity: 1,
        y: 0,
        duration: 0.82,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 82%",
        },
      });

      gsap.to(".services-cta", {
        opacity: 1,
        y: 0,
        duration: 0.84,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-cta-wrap",
          start: "top 84%",
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-1 pb-5 pt-12 sm:px-2 lg:px-3 lg:pb-8 lg:pt-16"
      aria-labelledby="services-title"
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/7 bg-[linear-gradient(180deg,rgba(10,10,11,0.96),rgba(14,14,15,0.98))] px-5 py-12 shadow-[0_30px_90px_rgba(0,0,0,0.24)] sm:px-8 sm:py-14 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_26%),radial-gradient(circle_at_50%_16%,rgba(255,107,53,0.10),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.01),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:96px_96px]" />
        <div className="pointer-events-none absolute left-[-8%] top-[16%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.15),transparent_72%)] blur-[88px]" />
        <div className="pointer-events-none absolute right-[-6%] bottom-[8%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_72%)] blur-[100px]" />

        <div className="services-header relative z-[1] mx-auto max-w-[820px] text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/54">
            Serviços
          </span>
          <h2
            id="services-title"
            className="mx-auto max-w-250 text-[clamp(2.2rem,4.7vw,4.9rem)] leading-[0.95] font-medium tracking-[-0.06em] text-white"
          >
            Soluções digitais para posicionar, automatizar e escalar negócios.
          </h2>
          <p className="mx-auto mt-5 max-w-[650px] text-[0.98rem] leading-7 text-white/52 sm:text-[1.02rem]">
            Projetos pensados para gerar resultado real, com foco em conversão,
            performance e experiência.
          </p>
        </div>

        <div className="services-grid relative z-[1] mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 lg:gap-6">
          {services.map(({ title, description, tag, Icon, background }) => (
            <article
              key={title}
              className="services-card group relative overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition-[transform,border-color,box-shadow,background] duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_30px_80px_rgba(255,107,53,0.12)] sm:p-7 lg:min-h-[320px] lg:p-8"
            >
              <AnimatedServiceBackground variant={background} />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_42%,rgba(0,0,0,0.12)_100%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,7,0.06),rgba(6,6,7,0.22)_42%,rgba(6,6,7,0.52)_100%)]" />
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 [box-shadow:inset_0_0_0_1px_rgba(255,107,53,0.18)]" />

              <div className="relative z-[1] flex h-full flex-col">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition-transform duration-500 group-hover:scale-[1.05] group-hover:border-primary/25 group-hover:shadow-[0_16px_36px_rgba(255,107,53,0.14)]">
                  <Icon
                    className="h-6 w-6 text-white/88 transition-colors duration-500 group-hover:text-primary"
                    strokeWidth={1.8}
                  />
                </div>

                <div className="mt-8">
                  <h3 className="text-[1.55rem] leading-[1.02] font-medium tracking-[-0.05em] text-white">
                    {title}
                  </h3>
                  <p className="mt-4 max-w-[34ch] text-[0.97rem] leading-7 text-white/54">
                    {description}
                  </p>
                </div>

                <div className="mt-8 pt-6">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.18em] text-white/64 uppercase transition-colors duration-500 group-hover:border-primary/20 group-hover:text-white/78">
                    {tag}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div id="contact" className="services-cta-wrap relative z-[1] mt-10 lg:mt-14">
          <div className="services-cta relative mx-auto max-w-[860px] rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] px-6 py-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:px-8 sm:py-10">
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_center,rgba(255,107,53,0.10),transparent_48%)]" />
            <p className="relative z-[1] mx-auto max-w-[18ch] text-[clamp(1.75rem,3vw,3rem)] leading-[1] font-medium tracking-[-0.05em] text-white">
              Vamos tirar sua ideia do papel e transformar em resultado?
            </p>
            <div className="relative z-[1] mt-7 flex justify-center">
              <MagneticButton
                href="#projects"
                label="Solicitar projeto"
                className="px-6 py-3.5"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
