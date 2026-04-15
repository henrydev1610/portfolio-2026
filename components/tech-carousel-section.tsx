"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type TechItem = {
  name: string;
  tagline: string;
  accent: string;
  Icon: () => React.JSX.Element;
};

function ReactIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12">
      <circle cx="32" cy="32" r="4.5" fill="#7BE7FF" />
      <ellipse cx="32" cy="32" rx="24" ry="10" stroke="#7BE7FF" strokeWidth="3" fill="none" />
      <ellipse cx="32" cy="32" rx="24" ry="10" stroke="#7BE7FF" strokeWidth="3" fill="none" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="24" ry="10" stroke="#7BE7FF" strokeWidth="3" fill="none" transform="rotate(120 32 32)" />
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12">
      <path d="M32 6 52 18v28L32 58 12 46V18Z" fill="none" stroke="#8FE36A" strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M24 26c0-5.8 3.6-9 8.4-9 3.8 0 6.3 1.5 8.1 4.1l-4 2.7c-1-1.4-2.1-2.1-4-2.1-2.6 0-4.2 1.9-4.2 4.9v11.2h-4.3Z" fill="#8FE36A" />
      <path d="M39.7 28.8c4.5 0 7.3 2.4 7.3 6.8 0 4.9-3.2 7.8-8.3 7.8-3.2 0-5.7-.9-7.7-2.7l2.5-3.4c1.7 1.3 3.2 1.9 5 1.9 2.4 0 3.9-1.2 3.9-3.2 0-1.8-1.1-2.9-4.3-2.9h-1.7v-3.4h3.3Z" fill="#8FE36A" />
    </svg>
  );
}

function ReactNativeIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12">
      <circle cx="32" cy="32" r="4.3" fill="#9AF2FF" />
      <ellipse cx="32" cy="32" rx="23" ry="8.8" stroke="#9AF2FF" strokeWidth="3" fill="none" />
      <ellipse cx="32" cy="32" rx="23" ry="8.8" stroke="#9AF2FF" strokeWidth="3" fill="none" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="23" ry="8.8" stroke="#9AF2FF" strokeWidth="3" fill="none" transform="rotate(120 32 32)" />
      <path d="M14 49 23 40M41 24l9-9" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function WordpressIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12">
      <circle cx="32" cy="32" r="24" fill="none" stroke="#9DB4FF" strokeWidth="3" />
      <path d="M18 24c2.8 0 4.5 1.8 5.4 4.7l5.1 16.3 3.8-11.5-2-6.2c-.7-2.2-2.1-3.3-4.3-3.3H18Zm20.4 0c3.7 0 6 2.6 6 6.6 0 2.4-.9 4.8-2 8l-4.2 12.2 6.2-1.6c3.8-3.8 6.1-9 6.1-14.7 0-10.6-8.6-19.2-19.2-19.2-4.9 0-9.4 1.8-12.9 4.7 1 .1 1.9.2 3 .2h17Z" fill="#9DB4FF" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12">
      <circle cx="32" cy="32" r="24" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.9" />
      <path d="M22 42V22l20 20V22" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M36 18 48 46" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function TypeScriptIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12">
      <rect x="10" y="10" width="44" height="44" rx="10" fill="#5EA8FF" />
      <path d="M20 25h20M30 25v22" stroke="#08111D" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M39 42c1.4 2.1 3.4 3.2 6 3.2 2.4 0 4.1-1.1 4.1-2.8 0-1.5-.9-2.3-4.2-3.4-3.5-1.2-5.9-2.8-5.9-6.5 0-3.5 2.8-5.9 6.8-5.9 2.9 0 5 .8 6.5 3l-3.6 2.3c-.8-1.3-1.8-1.9-2.9-1.9-1.4 0-2.4.9-2.4 2.1 0 1.4.9 2 3.6 2.9 4.2 1.4 6.6 3 6.6 6.8 0 4-3.2 6.7-7.6 6.7-4.2 0-6.9-1.6-8.2-4.3l4.1-2.2Z" fill="#08111D" />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12">
      <path d="M20 26c3-4.7 6.6-7 10.9-7 6.6 0 8.5 4.7 11.8 6.3 2.1 1 4.7.8 7.8-.7-3 4.7-6.6 7-10.9 7-6.6 0-8.5-4.7-11.8-6.3-2.1-1-4.7-.8-7.8.7Zm-8 12c3-4.7 6.6-7 10.9-7 6.6 0 8.5 4.7 11.8 6.3 2.1 1 4.7.8 7.8-.7-3 4.7-6.6 7-10.9 7-6.6 0-8.5-4.7-11.8-6.3-2.1-1-4.7-.8-7.8.7Z" fill="#7CF0F7" />
    </svg>
  );
}

const techItems: TechItem[] = [
  { name: "React.js", tagline: "Sistemas de componentes", accent: "#7BE7FF", Icon: ReactIcon },
  { name: "Node.js", tagline: "Runtime e APIs", accent: "#8FE36A", Icon: NodeIcon },
  { name: "React Native", tagline: "Apps multiplataforma", accent: "#9AF2FF", Icon: ReactNativeIcon },
  { name: "WordPress", tagline: "Plataformas editoriais", accent: "#9DB4FF", Icon: WordpressIcon },
  { name: "Next.js", tagline: "Experiências com App Router", accent: "#FFFFFF", Icon: NextIcon },
  { name: "TypeScript", tagline: "Arquitetura tipada", accent: "#5EA8FF", Icon: TypeScriptIcon },
  { name: "Tailwind CSS", tagline: "Velocidade de design", accent: "#7CF0F7", Icon: TailwindIcon },
];

export function TechCarouselSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;

    if (!section || !rail) {
      return;
    }

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".tech-card");
      const fogs = gsap.utils.toArray<HTMLElement>(".tech-fog");

      gsap.set(cards, {
        transformPerspective: 1000,
      });

      const scrollTween = gsap.to(rail, {
        x: () => {
          const overflow = Math.max(rail.scrollWidth - section.clientWidth, 0);
          return overflow === 0 ? 0 : -overflow;
        },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => {
            const overflow = Math.max(rail.scrollWidth - section.clientWidth, 0);
            return `+=${Math.max(overflow * 1.15, section.clientWidth * 1.15)}`;
          },
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0.42,
            scale: 0.92,
            rotateY: 10,
            yPercent: 8,
          },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            yPercent: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 88%",
              end: "center 50%",
              scrub: true,
            },
          },
        );
      });

      gsap.fromTo(
        fogs,
        { opacity: 0.55 },
        {
          opacity: 0.92,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="tech-section relative   mx-1 mt-10 overflow-hidden rounded-[30px] border border-white/6 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_28%),linear-gradient(180deg,rgba(7,7,8,0.96),rgba(11,11,12,0.98))] px-4 py-8 sm:mx-2 sm:px-5 sm:py-10 lg:mt-14 lg:px-7 lg:py-12"
      aria-labelledby="tech-carousel-title"
    >
      <div className="pointer-events-none  absolute inset-0 bg-[radial-gradient(circle_at_14%_48%,rgba(255,107,53,0.08),transparent_22%),radial-gradient(circle_at_86%_46%,rgba(255,255,255,0.05),transparent_18%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[4] w-[16%] min-w-20 bg-[linear-gradient(90deg,rgba(5,5,6,0.98)_0%,rgba(5,5,6,0.88)_24%,rgba(5,5,6,0.24)_78%,rgba(5,5,6,0)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[4] w-[16%] min-w-20 bg-[linear-gradient(270deg,rgba(5,5,6,0.98)_0%,rgba(5,5,6,0.88)_24%,rgba(5,5,6,0.24)_78%,rgba(5,5,6,0)_100%)]" />
      <div className="tech-fog pointer-events-none absolute left-[-8%] top-[18%] z-[3] h-[64%] w-[28%] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.6)_44%,rgba(0,0,0,0)_72%)] blur-[58px] sm:blur-[72px]" />
      <div className="tech-fog pointer-events-none absolute right-[-9%] top-[16%] z-[3] h-[66%] w-[30%] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.66)_44%,rgba(0,0,0,0)_74%)] blur-[62px] sm:blur-[78px]" />
      <div className="pointer-events-none absolute inset-x-[18%] top-[-8%] z-[1] h-40 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.14),transparent_72%)] blur-[86px]" />

      <div className="relative z-[5] mb-8 flex max-w-[560px] flex-col gap-4 sm:mb-10 lg:mb-12">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/58">
          Tecnologias principais
        </span>
        <h2
          id="tech-carousel-title"
          className="max-w-[10ch] text-[clamp(2.4rem,5vw,5rem)] leading-[0.92] font-medium tracking-[-0.06em] text-white"
        >
          Ferramental para experiências de produto de alto padrão
        </h2>
        <p className="max-w-[48ch] text-sm leading-7 text-white/50 sm:text-[0.98rem]">
          Uma travessia horizontal pelas tecnologias que sustentam interfaces premium, sistemas de movimento e produtos digitais com acabamento de estúdio.
        </p>
      </div>

      <div className="relative z-[5] overflow-hidden">
        <div
          ref={railRef}
          className="flex w-max min-w-full items-stretch gap-4 pr-[18vw] will-change-transform sm:gap-5 sm:pr-[16vw] lg:gap-6 lg:pr-[14vw]"
        >
          {techItems.map(({ name, tagline, accent, Icon }, index) => (
            <article
              key={name}
              className="tech-card group relative flex min-h-[320px] w-[min(82vw,320px)] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_28px_70px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:min-h-[360px] sm:w-[min(54vw,360px)] sm:p-6 lg:min-h-[420px] lg:w-[min(36vw,420px)] lg:p-7"
              style={{
                boxShadow: `0 28px 70px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px color-mix(in srgb, ${accent} 8%, transparent)`,
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%,rgba(0,0,0,0.14)_100%)]" />
              <div
                className="pointer-events-none absolute left-[-14%] top-[8%] h-36 w-36 rounded-full blur-3xl"
                style={{ background: `radial-gradient(circle, ${accent}33 0%, transparent 72%)` }}
              />
              <div
                className="pointer-events-none absolute bottom-[-10%] right-[-8%] h-32 w-32 rounded-full blur-3xl"
                style={{ background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)` }}
              />
              <div className="relative z-[2] flex items-start justify-between gap-4">
                <div
                  className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/10 bg-black/24 backdrop-blur-md sm:h-18 sm:w-18"
                  style={{ boxShadow: `0 14px 30px color-mix(in srgb, ${accent} 14%, transparent)` }}
                >
                  <Icon />
                </div>
                <span className="mt-1 text-[0.64rem] uppercase tracking-[0.22em] text-white/36">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative z-[2] mt-8 flex flex-1 flex-col justify-end">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-px flex-1 bg-white/10" />
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: accent, boxShadow: `0 0 14px ${accent}` }}
                  />
                </div>
                <p className="mb-3 text-[0.68rem] uppercase tracking-[0.22em] text-white/42">
                  {tagline}
                </p>
                <h3 className="max-w-[12ch] text-[1.8rem] leading-[0.95] font-medium tracking-[-0.05em] text-white sm:text-[2rem] lg:text-[2.35rem]">
                  {name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
