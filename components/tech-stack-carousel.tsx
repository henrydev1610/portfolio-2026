"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import { FloatingCodeGalaxyBackground } from "@/components/floating-code-galaxy-background";

gsap.registerPlugin(ScrollTrigger);

type TechStackItem = {
  name: string;
  tagline: string;
  category: "Front-end" | "Back-end";
  accent: string;
  Icon: () => React.JSX.Element;
};

function JavaIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <path d="M24 48c2.8 1.6 6.5 2.4 10.8 2.4 6.8 0 12.2-2.1 12.2-4.8 0-1.2-1.1-2.1-3-2.8-2.3 1.6-5.7 2.5-9.7 2.5-3.7 0-6.9-.6-9.4-1.9-.9.8-1.3 1.6-1.3 2.6Z" fill="#E88A2D" />
      <path d="M31 18c5.1 3 7.7 5.7 7.7 8.3 0 3.1-2.7 5.1-8.2 7.6 8.4-1.2 12.6-4 12.6-8.2 0-3-2.3-5.6-6.8-7.7 1.1-1.4 1.8-2.7 1.8-3.8 0-2.2-2.1-3.7-6.4-4.7 2.2 1.4 3.3 2.7 3.3 3.9 0 1.4-1.2 2.9-4 4.6Z" fill="#F25F3A" />
      <path d="M22 37.5c0 1.5 1.1 2.9 3 4.2" stroke="#8FD8FF" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 14c-2.5 2.2-3.8 4.2-3.8 6 0 1.8 1.1 3.6 3.4 5.4" stroke="#8FD8FF" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SpringIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <path d="M52 18c-7.4-.9-14.6 1.8-20.1 7.3-4.8 4.8-7.5 10.9-7.7 17.2 7.3.7 14.5-2 20-7.5 4.8-4.8 7.5-10.8 7.8-17Z" fill="#7CCF5A" />
      <path d="M22 43c7-2.6 12.5-7.8 16.6-15.5" stroke="#F6FFF2" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="43.5" cy="23.5" r="2.4" fill="#F6FFF2" />
    </svg>
  );
}

function PostgresIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <path d="M21 39c-3.8-4.7-4.5-11.4-1.8-17.1 2.9-6.1 8.9-9.9 15.3-9.9 7.4 0 13.3 4.6 15 11.6 1.7 6.9-.8 14.9-6.4 20.7-4.1 4.2-8.4 6.2-12.5 6.2-2.7 0-4.9-1-6.6-3.1Z" fill="#75B7FF" />
      <path d="M26 43c2.1 1.6 4.8 2.4 8 2.4M24 24c3.6-2 7.2-1.9 10.7.1M29 34c2.1 1.2 4.4 1.1 6.9-.1" stroke="#0B1525" strokeWidth="3" strokeLinecap="round" />
      <path d="M39 18c3.4 3.9 4.8 8.5 4.2 13.9" stroke="#E8F5FF" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

function JavaScriptIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <rect x="10" y="10" width="44" height="44" rx="10" fill="#FFD43B" />
      <path d="M28 22v19.1c0 4.3-2.6 6.8-6.6 6.8-3.6 0-5.7-1.9-6.8-4.2l4.1-2.5c.8 1.4 1.4 2.6 3 2.6 1.5 0 2.5-.6 2.5-2.8V22H28Zm7 18.8c1.1 1.8 2.5 3.2 5 3.2 2.1 0 3.4-1 3.4-2.5 0-1.7-1.3-2.3-3.6-3.3l-1.2-.5c-3.4-1.5-5.7-3.3-5.7-7.2 0-3.6 2.8-6.3 7-6.3 3 0 5.3 1.1 6.8 3.9l-3.7 2.4c-.8-1.5-1.7-2.1-3.1-2.1s-2.3.9-2.3 2.1c0 1.5.9 2 3 2.9l1.2.5c4 1.7 6.3 3.5 6.3 7.5 0 4.3-3.4 6.7-7.9 6.7-4.5 0-7.3-2.1-8.8-4.8l3.8-2.3Z" fill="#0D1117" />
    </svg>
  );
}

function TypeScriptIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <rect x="10" y="10" width="44" height="44" rx="10" fill="#5EA8FF" />
      <path d="M20 25h20M30 25v22" stroke="#08111D" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M39 42c1.4 2.1 3.4 3.2 6 3.2 2.4 0 4.1-1.1 4.1-2.8 0-1.5-.9-2.3-4.2-3.4-3.5-1.2-5.9-2.8-5.9-6.5 0-3.5 2.8-5.9 6.8-5.9 2.9 0 5 .8 6.5 3l-3.6 2.3c-.8-1.3-1.8-1.9-2.9-1.9-1.4 0-2.4.9-2.4 2.1 0 1.4.9 2 3.6 2.9 4.2 1.4 6.6 3 6.6 6.8 0 4-3.2 6.7-7.6 6.7-4.2 0-6.9-1.6-8.2-4.3l4.1-2.2Z" fill="#08111D" />
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <path d="M32 6 52 18v28L32 58 12 46V18Z" fill="none" stroke="#8FE36A" strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M24 26c0-5.8 3.6-9 8.4-9 3.8 0 6.3 1.5 8.1 4.1l-4 2.7c-1-1.4-2.1-2.1-4-2.1-2.6 0-4.2 1.9-4.2 4.9v11.2h-4.3Z" fill="#8FE36A" />
      <path d="M39.7 28.8c4.5 0 7.3 2.4 7.3 6.8 0 4.9-3.2 7.8-8.3 7.8-3.2 0-5.7-.9-7.7-2.7l2.5-3.4c1.7 1.3 3.2 1.9 5 1.9 2.4 0 3.9-1.2 3.9-3.2 0-1.8-1.1-2.9-4.3-2.9h-1.7v-3.4h3.3Z" fill="#8FE36A" />
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <circle cx="32" cy="32" r="4.5" fill="#7BE7FF" />
      <ellipse cx="32" cy="32" rx="24" ry="10" stroke="#7BE7FF" strokeWidth="3" fill="none" />
      <ellipse cx="32" cy="32" rx="24" ry="10" stroke="#7BE7FF" strokeWidth="3" fill="none" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="24" ry="10" stroke="#7BE7FF" strokeWidth="3" fill="none" transform="rotate(120 32 32)" />
    </svg>
  );
}

function ReactNativeIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <circle cx="32" cy="32" r="4.3" fill="#9AF2FF" />
      <ellipse cx="32" cy="32" rx="23" ry="8.8" stroke="#9AF2FF" strokeWidth="3" fill="none" />
      <ellipse cx="32" cy="32" rx="23" ry="8.8" stroke="#9AF2FF" strokeWidth="3" fill="none" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="23" ry="8.8" stroke="#9AF2FF" strokeWidth="3" fill="none" transform="rotate(120 32 32)" />
      <path d="M14 49 23 40M41 24l9-9" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <circle cx="32" cy="32" r="24" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.9" />
      <path d="M22 42V22l20 20V22" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M36 18 48 46" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <path d="M20 26c3-4.7 6.6-7 10.9-7 6.6 0 8.5 4.7 11.8 6.3 2.1 1 4.7.8 7.8-.7-3 4.7-6.6 7-10.9 7-6.6 0-8.5-4.7-11.8-6.3-2.1-1-4.7-.8-7.8.7Zm-8 12c3-4.7 6.6-7 10.9-7 6.6 0 8.5 4.7 11.8 6.3 2.1 1 4.7.8 7.8-.7-3 4.7-6.6 7-10.9 7-6.6 0-8.5-4.7-11.8-6.3-2.1-1-4.7-.8-7.8.7Z" fill="#7CF0F7" />
    </svg>
  );
}

function AwsIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <path d="M16 39c7 4.2 14.3 6.3 21.8 6.3 7.1 0 13.9-1.9 20.2-5.7" stroke="#FFB34F" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M44.3 45.6c2.8.4 5.1 1.4 6.8 3.1-3.7-1.1-6.4-.8-8.1.7" stroke="#FFB34F" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M20 32.4h5.7l3.9-11.5 4 11.5h5.7L32 13.7 20 32.4Zm25.7-2.1c1.6 0 2.7-.7 2.7-1.8 0-.9-.6-1.5-2.4-2.2l-1.3-.5c-2.9-1.1-4.7-2.5-4.7-5.4 0-3.1 2.6-5.2 6.4-5.2 2.7 0 4.8.9 6 2.8l-3.2 2.1c-.7-1-1.4-1.5-2.5-1.5-1.1 0-1.9.6-1.9 1.4 0 1 .7 1.4 2.5 2l1.2.5c3.3 1.2 5 2.8 5 5.8 0 3.5-2.8 5.5-6.6 5.5-3.6 0-5.8-1.7-6.9-3.9l3.4-1.9c.9 1.4 1.9 2.3 4.3 2.3Z" fill="#FFB34F" />
    </svg>
  );
}

function WordpressIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <circle cx="32" cy="32" r="24" fill="none" stroke="#9DB4FF" strokeWidth="3" />
      <path d="M18 24c2.8 0 4.5 1.8 5.4 4.7l5.1 16.3 3.8-11.5-2-6.2c-.7-2.2-2.1-3.3-4.3-3.3H18Zm20.4 0c3.7 0 6 2.6 6 6.6 0 2.4-.9 4.8-2 8l-4.2 12.2 6.2-1.6c3.8-3.8 6.1-9 6.1-14.7 0-10.6-8.6-19.2-19.2-19.2-4.9 0-9.4 1.8-12.9 4.7 1 .1 1.9.2 3 .2h17Z" fill="#9DB4FF" />
    </svg>
  );
}

function ElementorIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <rect x="10" y="10" width="44" height="44" rx="12" fill="#FF5A8A" />
      <path d="M23 20h18v4H23v-4Zm0 10h18v4H23v-4Zm0 10h8v4h-8v-4Zm12 0h6v4h-6v-4Z" fill="#FFF2F7" />
    </svg>
  );
}

const techStackItems: TechStackItem[] = [
  { name: "Java", tagline: "Bases de back-end", category: "Back-end", accent: "#F25F3A", Icon: JavaIcon },
  { name: "Spring Boot", tagline: "Arquitetura de APIs", category: "Back-end", accent: "#7CCF5A", Icon: SpringIcon },
  { name: "PostgreSQL", tagline: "Dados relacionais", category: "Back-end", accent: "#75B7FF", Icon: PostgresIcon },
  { name: "JavaScript", tagline: "Lógica de interface", category: "Front-end", accent: "#FFD43B", Icon: JavaScriptIcon },
  { name: "TypeScript", tagline: "Sistemas tipados", category: "Front-end", accent: "#5EA8FF", Icon: TypeScriptIcon },
  { name: "Node.js", tagline: "Runtime e serviços", category: "Back-end", accent: "#8FE36A", Icon: NodeIcon },
  { name: "React.js", tagline: "Sistemas de componentes", category: "Front-end", accent: "#7BE7FF", Icon: ReactIcon },
  { name: "Next.js", tagline: "Experiências com App Router", category: "Front-end", accent: "#FFFFFF", Icon: NextIcon },
  { name: "Tailwind CSS", tagline: "Velocidade de design", category: "Front-end", accent: "#7CF0F7", Icon: TailwindIcon },
  { name: "React Native", tagline: "Apps multiplataforma", category: "Front-end", accent: "#9AF2FF", Icon: ReactNativeIcon },
  { name: "AWS", tagline: "Entrega em nuvem", category: "Back-end", accent: "#FFB34F", Icon: AwsIcon },
  { name: "WordPress", tagline: "Plataformas editoriais", category: "Front-end", accent: "#9DB4FF", Icon: WordpressIcon },
  { name: "Elementor", tagline: "Sistemas para landing pages", category: "Front-end", accent: "#FF5A8A", Icon: ElementorIcon },
];

export function TechStackCarousel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const mobilePinRef = useRef<HTMLDivElement | null>(null);
  const mobileViewportRef = useRef<HTMLDivElement | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const mobilePin = mobilePinRef.current;
    const mobileViewport = mobileViewportRef.current;
    const mobileTrack = mobileTrackRef.current;

    if (!section || !viewport || !track || !mobilePin || !mobileViewport || !mobileTrack) {
      return;
    }

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isChrome = document.documentElement.dataset.browser === "chrome";
      const cards = gsap.utils.toArray<HTMLElement>(".tech-stack-card");
      const mobileCards = gsap.utils.toArray<HTMLElement>(".tech-stack-mobile-card");
      const lastCard = cards.at(-1);

      if (!lastCard) {
        return;
      }

      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          const getMobileTravel = () => Math.max(mobileTrack.scrollWidth - mobileViewport.clientWidth, 0);

          gsap.set(mobileTrack, {
            x: 0,
            force3D: true,
          });

          gsap.set(mobileCards, {
            opacity: 1,
            y: 0,
            scale: 1,
            force3D: true,
          });

          const mobileTween = gsap.to(mobileTrack, {
            x: () => -getMobileTravel(),
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: mobilePin,
              start: "top top",
              end: () => `+=${Math.max(getMobileTravel(), 1)}`,
              pin: true,
              pinSpacing: true,
              scrub: true,
              anticipatePin: 0.5,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          });

          if (!reduceMotion && !isChrome) {
            mobileCards.forEach((card) => {
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: card,
                  containerAnimation: mobileTween,
                  start: "left 88%",
                  end: "right 14%",
                  scrub: true,
                },
              })
              .fromTo(
                card,
                {
                  opacity: 0.72,
                  y: 10,
                  scale: 0.97,
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                    ease: "none",
                  },
                )
                .to(card, {
                  opacity: 0.72,
                  y: -6,
                  scale: 0.97,
                  ease: "none",
                });
            });
          }

          return () => {
            mobileTween.scrollTrigger?.kill();
            mobileTween.kill();
          };
        },
        "(min-width: 768px) and (max-width: 1023px)": () => {
          gsap.set(mobileTrack, {
            clearProps: "transform,willChange",
          });
          gsap.set(mobileCards, {
            clearProps: "transform,willChange,opacity",
          });
          gsap.set(cards, {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateY: 0,
            rotateZ: 0,
            clearProps: "transform,willChange",
          });
          gsap.set(track, {
            clearProps: "transform,willChange",
          });
          return undefined;
        },
        "(min-width: 1024px)": () => {
          const isCompactDesktop = window.matchMedia("(max-width: 1280px)").matches;

          const getTravel = () => {
            const viewportCenter = viewport.clientWidth / 2;
            const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
            const rawTravel = lastCardCenter - viewportCenter;

            return Math.max(rawTravel, 0);
          };

          gsap.set(cards, {
            transformPerspective: 1200,
            transformOrigin: "50% 50%",
            force3D: true,
          });

          gsap.set(track, {
            force3D: true,
          });

          const horizontalTween = gsap.to(track, {
            x: () => {
              const travel = getTravel();
              return travel > 0 ? -travel : 0;
            },
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${Math.max(getTravel(), 1)}`,
              pin: true,
              scrub: true,
              anticipatePin: 0.5,
              fastScrollEnd: true,
              invalidateOnRefresh: true,
            },
          });

          if (reduceMotion) {
            gsap.set(cards, { opacity: 1, scale: 1, y: 0, rotateY: 0, rotateZ: 0 });
            return () => {
              horizontalTween.scrollTrigger?.kill();
              horizontalTween.kill();
            };
          }

          cards.forEach((card) => {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              })
              .fromTo(
                card,
                {
                  opacity: 0.52,
                  scale: isCompactDesktop ? 0.95 : 0.92,
                  y: isCompactDesktop ? 10 : 14,
                  rotateY: isCompactDesktop ? 4 : 7,
                  rotateZ: isCompactDesktop ? -0.35 : -0.6,
                },
                {
                  opacity: 1,
                  scale: 1.01,
                  y: 0,
                  rotateY: 0,
                  rotateZ: 0,
                  ease: "none",
                  duration: 0.52,
                },
              )
              .to(card, {
                opacity: 0.52,
                scale: isCompactDesktop ? 0.95 : 0.92,
                y: isCompactDesktop ? 10 : 14,
                rotateY: isCompactDesktop ? -4 : -7,
                rotateZ: isCompactDesktop ? 0.35 : 0.6,
                ease: "none",
                duration: 0.48,
              });
          });

          return () => {
            horizontalTween.scrollTrigger?.kill();
            horizontalTween.kill();
          };
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-1 mt-10 overflow-hidden rounded-[34px] border border-white/6 bg-[linear-gradient(180deg,rgba(8,8,9,0.98),rgba(12,12,13,0.98))] sm:mx-2 lg:mt-14 lg:min-h-[100svh]"
      aria-labelledby="tech-stack-title"
    >
      <FloatingCodeGalaxyBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.28),rgba(0,0,0,0.18))]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[4] w-[22%] min-w-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,6,0.94)_0%,rgba(5,5,6,0.82)_16%,rgba(5,5,6,0.52)_38%,rgba(5,5,6,0.14)_76%,rgba(5,5,6,0)_100%)] backdrop-blur-[14px] sm:backdrop-blur-[18px]" />
        <div className="absolute inset-y-[8%] left-[10%] w-[72%] rounded-[28px] border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] opacity-70 [mask-image:linear-gradient(90deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.82)_32%,transparent_100%)] backdrop-blur-[20px]" />
        <div className="absolute inset-y-[14%] left-[-8%] w-[56%] rounded-[32px] bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_72%)] opacity-55 blur-[26px]" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[4] w-[22%] min-w-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(5,5,6,0.94)_0%,rgba(5,5,6,0.82)_16%,rgba(5,5,6,0.52)_38%,rgba(5,5,6,0.14)_76%,rgba(5,5,6,0)_100%)] backdrop-blur-[14px] sm:backdrop-blur-[18px]" />
        <div className="absolute inset-y-[8%] right-[10%] w-[72%] rounded-[28px] border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] opacity-70 [mask-image:linear-gradient(270deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.82)_32%,transparent_100%)] backdrop-blur-[20px]" />
        <div className="absolute inset-y-[14%] right-[-8%] w-[56%] rounded-[32px] bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_72%)] opacity-55 blur-[26px]" />
      </div>
      <div className="pointer-events-none absolute left-[-10%] top-1/2 z-[3] h-[56%] w-[30%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.99)_0%,rgba(0,0,0,0.78)_42%,rgba(0,0,0,0)_74%)] blur-[70px] sm:blur-[88px]" />
      <div className="pointer-events-none absolute right-[-10%] top-1/2 z-[3] h-[56%] w-[30%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.99)_0%,rgba(0,0,0,0.78)_42%,rgba(0,0,0,0)_74%)] blur-[70px] sm:blur-[88px]" />
      <div className="pointer-events-none absolute inset-x-[26%] top-[38%] z-[1] h-28 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.14),transparent_72%)] blur-[86px]" />

      <div className="relative z-[5] flex flex-col justify-center px-4 py-12 sm:px-6 lg:min-h-[100svh] lg:px-8">
        <div className="mx-auto mb-10 hidden w-full max-w-[1100px] flex-col items-center text-center md:flex sm:mb-12 lg:mb-14">
          <span className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/54">
            Tecnologias
          </span>
          <h2
            id="tech-stack-title"
            className= " w-full text-[clamp(2.2rem,4vw,4.4rem)] leading-[0.94] font-medium tracking-[-0.06em] text-white"
          >
            Principais tecnologias empregadas ao longo dos projetos
          </h2>
        </div>

        <div ref={mobilePinRef} className="relative h-[100svh] overflow-hidden md:hidden">
          <div className="relative flex h-[100svh] flex-col justify-center px-4 py-8">
            <div className="pointer-events-none absolute inset-y-[16%] left-[4%] w-28 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.12),transparent_72%)] blur-3xl" />
            <div className="pointer-events-none absolute inset-y-[12%] right-[2%] w-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_72%)] blur-3xl" />

            <div className="relative z-[2] mx-auto mb-8 flex w-full max-w-[22rem] flex-col items-center text-center">
              <span className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/54">
                Tecnologias
              </span>
              <h2
                className="w-full text-[clamp(2.1rem,8.2vw,3.15rem)] leading-[0.96] font-medium tracking-[-0.05em] text-white"
              >
                Principais tecnologias empregadas ao longo dos projetos
              </h2>
            </div>

            <div
              ref={mobileViewportRef}
              className="relative snap-x snap-mandatory overflow-hidden"
            >
              <div
              ref={mobileTrackRef}
                className="flex w-max items-stretch gap-3.5 px-[15vw]"
              >
                {techStackItems.map(({ name, category, Icon, accent }, index) => (
                  <article
                    key={`${name}-mobile`}
                    className="tech-stack-mobile-card group relative flex h-[172px] w-[68vw] max-w-[240px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 active:scale-[0.96] lg:backdrop-blur-xl"
                    style={{
                      boxShadow: `0 16px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px color-mix(in srgb, ${accent} 8%, transparent)`,
                    }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_40%,rgba(0,0,0,0.12)_100%)]" />
                    <div
                      className="pointer-events-none absolute left-[-14%] top-[6%] h-20 w-20 rounded-full blur-3xl"
                      style={{ background: `radial-gradient(circle, ${accent}26 0%, transparent 72%)` }}
                    />

                    <div className="relative z-[2] flex items-start justify-between gap-2.5">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10"
                        style={{ boxShadow: `0 8px 20px color-mix(in srgb, ${accent} 14%, transparent)` }}
                      >
                        <Icon />
                      </div>
                      <span className="mt-1 text-[0.56rem] uppercase tracking-[0.2em] text-white/28">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="relative z-[2] mt-5 flex flex-1 flex-col justify-end">
                      <h3 className="max-w-[12ch] text-[1.15rem] leading-[1.02] font-medium tracking-[-0.03em] text-white">
                        {name}
                      </h3>
                      <p className="mt-2 text-xs font-medium uppercase tracking-[0.22em] text-white/40">
                        {category}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div ref={viewportRef} className="relative hidden w-full items-center overflow-hidden md:flex">
          <div
            ref={trackRef}
            className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:flex lg:w-max lg:min-w-full lg:h-32 lg:items-center lg:gap-6 lg:px-[26vw]"
          >
            {techStackItems.map(({ name, Icon, accent }) => (
              <article
                key={name}
                className="tech-stack-card group relative flex min-h-[74px] items-center gap-3 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] px-4 py-3.5 shadow-[0_18px_50px_rgba(0,0,0,0.2)] backdrop-blur-md sm:min-h-[82px] sm:px-5 sm:py-4 lg:h-[84px] lg:shrink-0 lg:px-6"
                style={{
                  boxShadow: `0 18px 50px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px color-mix(in srgb, ${accent} 10%, transparent)`,
                }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_40%,rgba(0,0,0,0.12)_100%)]" />
                <div
                  className="relative z-[2] flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/24 sm:h-11 sm:w-11"
                  style={{ boxShadow: `0 10px 24px color-mix(in srgb, ${accent} 16%, transparent)` }}
                >
                  <Icon />
                </div>
                <span className="relative z-[2] text-sm font-medium tracking-[-0.03em] whitespace-nowrap text-white/86 sm:text-[0.98rem]">
                  {name}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
