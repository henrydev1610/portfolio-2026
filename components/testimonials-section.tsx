"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS_START_REFERENCE = 9220;

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  context: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "O projeto elevou completamente a percepcao da marca. O resultado ficou premium, fluido e muito acima do que imaginavamos.",
    name: "Andrea Krug",
    role: "Palestrante e Mentora Executiva",
    context: "Brand Experience / Site Oficial",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
  },
  {
    quote:
      "A experiencia uniu performance, design e clareza estrategica. O produto final transmitiu muito mais valor em cada ponto de contato.",
    name: "Cliente Projeto Digital",
    role: "Founder / Business Owner",
    context: "Produto Digital / Growth",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
  },
  {
    quote:
      "Cada detalhe foi pensado com direcao de arte, usabilidade e impacto visual. O resultado ficou memoravel do inicio ao fim.",
    name: "Parceiro de Produto",
    role: "Creative / Product Lead",
    context: "Interface System / Product Vision",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80",
  },
  {
    quote:
      "Nao foi apenas design bonito. Houve intencao, narrativa visual e uma entrega muito acima do padrao esperado.",
    name: "Cliente Premium",
    role: "Brand / Digital Experience",
    context: "High-End Launch / Experience",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const focusRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const pinWrap = pinWrapRef.current;
    const viewport = viewportRef.current;
    const rail = railRef.current;
    const focus = focusRef.current;

    if (!section || !header || !pinWrap || !viewport || !rail || !focus) {
      return;
    }

    const context = gsap.context(() => {
      const headerItems = Array.from(header.children);
      const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card", section);
      const setFocusX = gsap.quickTo(focus, "x", { duration: 0.38, ease: "power3.out" });
      const setFocusY = gsap.quickTo(focus, "y", { duration: 0.38, ease: "power3.out" });
      const setFocusOpacity = gsap.quickTo(focus, "opacity", { duration: 0.28, ease: "power2.out" });
      const setFocusScale = gsap.quickTo(focus, "scale", { duration: 0.32, ease: "power3.out" });

      gsap.set(headerItems, {
        opacity: 0,
        y: 28,
      });

      gsap.set(cards, {
        opacity: 0,
        y: 36,
      });
      gsap.set(focus, {
        opacity: 0,
        scale: 0.86,
      });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        })
        .to(headerItems, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
        })
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.92,
            stagger: 0.1,
          },
          "-=0.38",
        );

      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          const computeTrackState = () => {
            const viewportWidth = viewport.clientWidth;
            const railStyles = window.getComputedStyle(rail);
            const insetLeft = parseFloat(railStyles.paddingLeft) || 0;
            const insetRight = parseFloat(railStyles.paddingRight) || 0;
            const centeredStops = cards.map((card) => {
              const cardLeft = card.offsetLeft;
              const cardWidth = card.offsetWidth;
              const cardRight = cardLeft + cardWidth;
              const cardCenter = cardLeft + cardWidth / 2;
              const viewportCenter = viewportWidth / 2;
              const centeredX = viewportCenter - cardCenter;

              const visibleLeftBound = insetLeft - cardLeft;
              const visibleRightBound = viewportWidth - insetRight - cardRight;
              const localMinX = Math.min(visibleLeftBound, visibleRightBound);
              const localMaxX = Math.max(visibleLeftBound, visibleRightBound);

              return gsap.utils.clamp(localMinX, localMaxX, centeredX);
            });

            const startX = centeredStops[0] ?? 0;
            const endX = centeredStops.at(-1) ?? startX;
            const distance = Math.abs(endX - startX);

            return {
              startX,
              endX,
              distance,
            };
          };

          const initialState = computeTrackState();

          if (initialState.distance <= 0) {
            return undefined;
          }

          gsap.set(rail, {
            x: initialState.startX,
            force3D: true,
            willChange: "transform",
          });

          const horizontalTween = gsap.to(rail, {
            x: () => computeTrackState().endX,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: pinWrap,
              start: "top top",
              onRefreshInit: () => {
                const refreshedState = computeTrackState();
                gsap.set(rail, {
                  x: refreshedState.startX,
                });
              },
              end: () => `+=${Math.max(computeTrackState().distance, 1)}`,
              scrub: true,
              pin: true,
              anticipatePin: 0.5,
              invalidateOnRefresh: true,
            },
          });

          cards.forEach((card, index) => {
            gsap.fromTo(
              card,
              {
                opacity: index === 0 ? 1 : 0.58,
                scale: index === 0 ? 1 : 0.975,
                yPercent: 2,
              },
              {
                opacity: 1,
                scale: 1,
                yPercent: 0,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "center right",
                  end: "center center",
                  scrub: true,
                },
              },
            );
          });

          return () => {
            horizontalTween.scrollTrigger?.kill();
            horizontalTween.kill();
          };
        },
        "(min-width: 1024px)": () => {
          const getCalibratedStart = () => {
            const sectionTop = pinWrap.getBoundingClientRect().top + window.scrollY;
            const rawViewportOffset = sectionTop - TESTIMONIALS_START_REFERENCE;
            const minOffset = Math.round(window.innerHeight * 0.08);
            const maxOffset = Math.round(window.innerHeight * 0.9);
            const viewportOffset = gsap.utils.clamp(minOffset, maxOffset, rawViewportOffset);

            return `top top+=${viewportOffset}`;
          };

          const computeTrackState = () => {
            const viewportWidth = viewport.clientWidth;
            const railStyles = window.getComputedStyle(rail);
            const insetLeft = parseFloat(railStyles.paddingLeft) || 0;
            const insetRight = parseFloat(railStyles.paddingRight) || 0;
            const centeredStops = cards.map((card) => {
              const cardLeft = card.offsetLeft;
              const cardWidth = card.offsetWidth;
              const cardRight = cardLeft + cardWidth;
              const cardCenter = cardLeft + cardWidth / 2;
              const viewportCenter = viewportWidth / 2;
              const centeredX = viewportCenter - cardCenter;

              const visibleLeftBound = insetLeft - cardLeft;
              const visibleRightBound = viewportWidth - insetRight - cardRight;
              const localMinX = Math.min(visibleLeftBound, visibleRightBound);
              const localMaxX = Math.max(visibleLeftBound, visibleRightBound);

              return gsap.utils.clamp(localMinX, localMaxX, centeredX);
            });

            const startX = centeredStops[0] ?? 0;
            const endX = centeredStops.at(-1) ?? startX;
            const minX = Math.min(startX, endX);
            const maxX = Math.max(startX, endX);
            const stops = centeredStops.map((stop) => gsap.utils.clamp(minX, maxX, stop));
            const distance = Math.abs(endX - startX);

            return {
              startX,
              endX,
              stops,
              distance,
            };
          };

          const initialState = computeTrackState();
          const totalShift = initialState.distance;

          if (totalShift <= 0) {
            return undefined;
          }

          gsap.set(rail, {
            x: initialState.startX,
          });

          const getProgressStops = () => {
            const state = computeTrackState();
            const span = state.endX - state.startX;

            if (span === 0) {
              return [0];
            }

            return state.stops.map((stop) => (stop - state.startX) / span);
          };

          const snapToStop = (value: number) =>
            getProgressStops().reduce((closest, stop) =>
              Math.abs(stop - value) < Math.abs(closest - value) ? stop : closest,
            );

          const horizontalTween = gsap.to(rail, {
            x: () => {
              const refreshedState = computeTrackState();
              return refreshedState.endX;
            },
            ease: "none",
            scrollTrigger: {
              trigger: pinWrap,
              start: getCalibratedStart,
              onRefreshInit: () => {
                const refreshedState = computeTrackState();
                gsap.set(rail, {
                  x: refreshedState.startX,
                });
              },
              end: () => {
                const refreshedState = computeTrackState();
                return `+=${refreshedState.distance + window.innerWidth * 0.18}`;
              },
              scrub: true,
              pin: true,
              anticipatePin: 0.5,
              invalidateOnRefresh: true,
              snap: {
                snapTo: snapToStop,
                duration: { min: 0.1, max: 0.18 },
                ease: "power2.out",
              },
            },
          });

          cards.forEach((card, index) => {
            gsap.fromTo(
              card,
              {
                opacity: index === 0 ? 1 : 0.56,
                scale: index === 0 ? 1 : 0.97,
                yPercent: 2,
              },
              {
                opacity: 1,
                scale: 1,
                yPercent: 0,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "center right",
                  end: "center center",
                  scrub: true,
                },
              },
            );
          });

          return () => {
            horizontalTween.scrollTrigger?.kill();
            horizontalTween.kill();
          };
        },
      });

      const positionFocusAtCardCenter = (card: HTMLElement) => {
        const cardRect = card.getBoundingClientRect();
        const viewportRect = viewport.getBoundingClientRect();
        const centerX = cardRect.left - viewportRect.left + cardRect.width / 2;
        const centerY = cardRect.top - viewportRect.top + cardRect.height / 2;

        setFocusX(centerX);
        setFocusY(centerY);
        setFocusOpacity(1);
        setFocusScale(1);
      };

      const hideFocus = () => {
        setFocusOpacity(0);
        setFocusScale(0.86);
      };

      const cleanups = cards.map((card) => {
        const handleEnter = () => positionFocusAtCardCenter(card);
        const handleLeave = () => hideFocus();
        const handleFocus = () => positionFocusAtCardCenter(card);
        const handleBlur = () => hideFocus();

        card.addEventListener("pointerenter", handleEnter);
        card.addEventListener("pointerleave", handleLeave);
        card.addEventListener("focusin", handleFocus);
        card.addEventListener("focusout", handleBlur);

        return () => {
          card.removeEventListener("pointerenter", handleEnter);
          card.removeEventListener("pointerleave", handleLeave);
          card.removeEventListener("focusin", handleFocus);
          card.removeEventListener("focusout", handleBlur);
        };
      });

      window.addEventListener("blur", hideFocus);

      return () => {
        cleanups.forEach((cleanup) => cleanup());
        window.removeEventListener("blur", hideFocus);
      };
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative px-1 pb-5 pt-12 sm:px-2 lg:px-3 lg:pb-8 lg:pt-16"
      aria-labelledby="testimonials-title"
    >
      <div className="relative overflow-hidden rounded-[32px]  border border-white/7 bg-[linear-gradient(180deg,rgba(10,10,11,0.96),rgba(14,14,15,0.98))] px-5 py-12 shadow-[0_30px_90px_rgba(0,0,0,0.24)] sm:px-8 sm:py-14 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_26%),radial-gradient(circle_at_50%_16%,rgba(255,107,53,0.10),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.01),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:96px_96px]" />
        <div className="pointer-events-none absolute left-[-6%] top-[18%] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.11),transparent_72%)] blur-[48px] lg:left-[-8%] lg:h-48 lg:w-48 lg:bg-[radial-gradient(circle,rgba(255,107,53,0.14),transparent_72%)] lg:blur-[88px]" />
        <div className="pointer-events-none absolute right-[-4%] bottom-[10%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04),transparent_72%)] blur-[56px] lg:right-[-6%] lg:h-56 lg:w-56 lg:bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_72%)] lg:blur-[100px]" />
        <div className="pointer-events-none absolute inset-x-[24%] top-[16%] h-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_74%)] blur-[44px] lg:inset-x-[20%] lg:h-32 lg:bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_74%)] lg:blur-[72px]" />

        <div ref={pinWrapRef} className="relative">
          <div ref={headerRef} className="relative z-[2] mx-auto max-w-[860px] text-center">
            <span className="mb-4 inline-flex  items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/54">
              TESTEMUNHOS
            </span>
            <h2
              id="testimonials-title"
              className="mx-auto max-w-[30ch]   text-[clamp(2.35rem,5vw,5rem)] leading-[0.93] font-medium tracking-[-0.06em] text-white"
            >
              Resultados que constroem confiança.
            </h2>
            <p className="mx-auto mt-5 max-w-[760px] text-[0.98rem] leading-7 text-white/52 sm:text-[1.02rem]">
              Depoimentos de clientes, parceiros e projetos que viveram uma experiencia premium de produto, design e execucao.
            </p>
          </div>

          <div
            ref={viewportRef}
            className="relative z-[2] mt-10  overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] shadow-[0_24px_80px_rgba(0,0,0,0.24)] lg:mt-14"
          >
            <div
              ref={focusRef}
              className="pointer-events-none absolute  left-0 top-0 z-[2] hidden h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.14),rgba(255,107,53,0.05)_34%,transparent_72%)] opacity-0 blur-[42px] lg:block"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-[3] hidden w-24 bg-[linear-gradient(90deg,rgba(8,8,9,0.96),rgba(8,8,9,0.32),transparent)] lg:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-[3] hidden w-24 bg-[linear-gradient(270deg,rgba(8,8,9,0.96),rgba(8,8,9,0.32),transparent)] lg:block" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_52%)]" />

            <div
              ref={railRef}
              className="flex w-max min-w-full items-stretch gap-4 p-4 pr-[18vw] sm:p-6 md:flex-col md:w-full md:min-w-0 md:gap-5 lg:w-max lg:min-w-full lg:flex-row lg:gap-6 lg:p-8 lg:pr-[24vw]"
            >
              {testimonials.map((testimonial, index) => (
                <article
                  key={`${testimonial.name}-${index}`}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className={`testimonial-card group relative w-[78vw] max-w-[320px] shrink-0 overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.16)] backdrop-blur-md transition-[transform,border-color,box-shadow,filter] duration-500 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_24px_56px_rgba(255,107,53,0.12)] sm:p-7 md:w-auto md:max-w-none lg:min-h-[420px] lg:shadow-[0_24px_60px_rgba(0,0,0,0.18)] lg:backdrop-blur-xl lg:hover:-translate-y-1 lg:hover:shadow-[0_30px_80px_rgba(255,107,53,0.14)] ${
                    index === 0
                      ? "lg:w-[min(56vw,760px)] lg:p-9"
                      : "lg:w-[min(42vw,560px)]"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_34%,rgba(0,0,0,0.18)_100%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 [box-shadow:inset_0_0_0_1px_rgba(255,107,53,0.16)]" />
                  <div className="pointer-events-none absolute right-[-12%] top-[-6%] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.18),transparent_72%)] blur-3xl" />

                  <div className="relative z-[1] flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition-transform duration-500 group-hover:scale-[1.04] group-hover:border-primary/20">
                        <Quote className="h-6 w-6 text-white/82 transition-colors duration-500 group-hover:text-primary" strokeWidth={1.7} />
                      </div>
                      <span className="mt-1 text-[0.64rem] uppercase tracking-[0.24em] text-white/34">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="mt-8 flex-1">
                      <p className="max-w-[30ch] text-[1.3rem] leading-[1.28] tracking-[-0.03em] text-white/90 sm:text-[1.45rem] lg:text-[1.7rem]">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    <div className="mt-10 border-t border-white/8 pt-5">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/12 shadow-[0_10px_24px_rgba(0,0,0,0.22)] ring-1 ring-white/6 sm:h-14 sm:w-14">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <p className="text-[1rem] font-medium tracking-[-0.03em] text-white">
                            {testimonial.name}
                          </p>
                          <p className="mt-1 text-sm text-white/54">
                            {testimonial.role}
                          </p>
                          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.22em] text-white/38">
                            {testimonial.context}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
