"use client";

import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

export function StatementVideoShowcase() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const launchButtonRef = useRef<HTMLDivElement | null>(null);
  const wireframeCardRef = useRef<HTMLDivElement | null>(null);
  const motionCardRef = useRef<HTMLDivElement | null>(null);
  const refineCardRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const cursor = cursorRef.current;
    const launchButton = launchButtonRef.current;
    const wireframeCard = wireframeCardRef.current;
    const motionCard = motionCardRef.current;
    const refineCard = refineCardRef.current;

    if (!root) {
      return;
    }

    let handleResize: (() => void) | null = null;
    let observer: IntersectionObserver | null = null;

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isCompact = window.matchMedia("(max-width: 1024px)").matches;
      if (!stage || !cursor || !launchButton || !wireframeCard || !motionCard || !refineCard) {
        return;
      }

      const getCursorPosition = (target: HTMLElement) => {
        const stageRect = stage.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const cursorRect = cursor.getBoundingClientRect();

        return {
          x: targetRect.left - stageRect.left + targetRect.width / 2 - cursorRect.width / 2,
          y: targetRect.top - stageRect.top + targetRect.height / 2 - cursorRect.height / 2,
        };
      };

      const moveCursorTo = (target: HTMLElement, duration = 0.82) =>
        timeline.to(cursor, {
          x: () => getCursorPosition(target).x,
          y: () => getCursorPosition(target).y,
          duration,
          ease: "power3.out",
        });

      const clickCursor = (target: HTMLElement, activeState: gsap.TweenVars, restState: gsap.TweenVars) =>
        timeline
          .to({}, { duration: 0.12 })
          .to(
            target,
            {
              ...activeState,
              duration: 0.22,
              ease: "power3.out",
            },
            ">",
          )
          .to(
            cursor,
            {
              scale: 0.9,
              duration: 0.12,
              ease: "power3.out",
              yoyo: true,
              repeat: 1,
            },
            "<",
          )
          .to(
            target,
            {
              ...restState,
              duration: 0.3,
              ease: "power3.out",
            },
            ">-0.03",
          );

      gsap.set(".build-grid line, .build-grid .col-guide", { opacity: 0 });
      gsap.set(
        [
          ".browser-shell",
          ".browser-top",
          ".nav-build",
          ".hero-block",
          ".hero-kicker",
          ".hero-title-line",
          ".hero-copy-line",
          ".hero-cta-build",
          ".hero-preview",
          ".feature-card-build",
          ".floating-chip",
          ".build-cursor",
        ],
        {
          opacity: 0,
          y: 18,
        },
      );

      gsap.set(".hero-preview, .feature-card-build", {
        scale: 0.96,
      });

      gsap.set(cursor, {
        x: -36,
        y: 0,
        scale: 1,
        transformOrigin: "50% 50%",
      });

      if (reduceMotion) {
        gsap.set(".build-grid line, .build-grid .col-guide", { opacity: 0.1 });
        gsap.set(
          [
            ".browser-shell",
            ".browser-top",
            ".nav-build",
            ".hero-block",
            ".hero-kicker",
            ".hero-title-line",
            ".hero-copy-line",
            ".hero-cta-build",
            ".hero-preview",
            ".feature-card-build",
            ".floating-chip",
            ".build-cursor",
          ],
          { opacity: 1, y: 0, clearProps: "transform" },
        );
        gsap.set(".hero-preview, .feature-card-build", { scale: 1 });
        gsap.set(cursor, { opacity: 0, x: 0, y: 0 });
        return;
      }

      const timeline = gsap.timeline({
        repeat: -1,
        repeatDelay: isCompact ? 1.1 : 0.7,
        repeatRefresh: true,
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .to(".build-grid line, .build-grid .col-guide", {
          opacity: (index) => (index % 3 === 0 ? 0.28 : 0.14),
          stagger: 0.025,
          duration: 0.28,
        })
        .to(
          ".browser-shell",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.1",
        )
        .to(
          ".browser-top",
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
          },
          "-=0.24",
        )
        .to(
          ".nav-build",
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          "-=0.12",
        )
        .to(
          ".hero-block",
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
          },
          "-=0.16",
        )
        .to(
          ".hero-kicker, .hero-title-line, .hero-copy-line",
          {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.4,
          },
          "-=0.25",
        )
        .to(
          ".hero-preview",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.52,
          },
          "-=0.26",
        )
        .to(
          ".hero-cta-build",
          {
            opacity: 1,
            y: 0,
            duration: 0.36,
          },
          "-=0.2",
        )
        .to(
          ".feature-card-build",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            duration: 0.42,
          },
          "-=0.18",
        )
        .to(
          ".floating-chip",
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.36,
          },
          "-=0.22",
        )
        .to(
          cursor,
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 0.28,
          },
          "-=0.18",
        )
        .add(() => void 0, "+=0.06");

      moveCursorTo(launchButton, 0.88);
      clickCursor(
        launchButton,
        {
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 18px 40px rgba(255,107,53,0.34)",
          backgroundColor: "rgba(255,107,53,0.96)",
          scale: 0.97,
        },
        {
          boxShadow: "0 14px 28px rgba(255,107,53,0.16)",
          backgroundColor: "rgba(255,107,53,0.88)",
          scale: 1,
        },
      );

      moveCursorTo(wireframeCard, 0.8);
      clickCursor(
        wireframeCard,
        {
          y: -6,
          scale: 1,
          borderColor: "rgba(255,255,255,0.14)",
          boxShadow: "0 12px 28px rgba(255,255,255,0.05)",
        },
        {
          y: 0,
          scale: 0.96,
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
        },
      );

      moveCursorTo(motionCard, 0.8);
      clickCursor(
        motionCard,
        {
          y: -8,
          scale: 1,
          borderColor: "rgba(255,107,53,0.32)",
          boxShadow: "0 16px 36px rgba(255,107,53,0.12)",
        },
        {
          y: 0,
          scale: 0.96,
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
        },
      );

      moveCursorTo(refineCard, 0.84);
      clickCursor(
        refineCard,
        {
          y: -6,
          scale: 1,
          borderColor: "rgba(255,255,255,0.14)",
          boxShadow: "0 12px 28px rgba(255,255,255,0.05)",
        },
        {
          y: 0,
          scale: 0.96,
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
        },
      );

      timeline
        .to(
          ".feature-card-build",
          {
            y: (index) => (index % 2 === 0 ? -4 : 4),
            duration: 1.3,
            ease: "sine.inOut",
            stagger: 0.06,
            yoyo: true,
            repeat: 1,
          },
          "-=1.15",
        )
        .to(
          [
            ".browser-shell",
            ".browser-top",
            ".nav-build",
            ".hero-block",
            ".hero-kicker",
            ".hero-title-line",
            ".hero-copy-line",
            ".hero-cta-build",
            ".hero-preview",
            ".feature-card-build",
            ".floating-chip",
            ".build-cursor",
          ],
          {
            opacity: 0,
            y: -12,
            stagger: 0.03,
            duration: 0.28,
          },
          "+=0.35",
        )
        .to(
          ".build-grid line, .build-grid .col-guide",
          {
            opacity: 0,
            stagger: 0.02,
            duration: 0.2,
          },
          "-=0.1",
        )
        .set(
          [
            ".browser-shell",
            ".browser-top",
            ".nav-build",
            ".hero-block",
            ".hero-kicker",
            ".hero-title-line",
            ".hero-copy-line",
            ".hero-cta-build",
            ".hero-preview",
            ".feature-card-build",
            ".floating-chip",
            ".build-cursor",
          ],
          {
            clearProps: "all",
          },
        )
        .set(
          [
            ".browser-shell",
            ".browser-top",
            ".nav-build",
            ".hero-block",
            ".hero-kicker",
            ".hero-title-line",
            ".hero-copy-line",
            ".hero-cta-build",
            ".hero-preview",
            ".feature-card-build",
            ".floating-chip",
            ".build-cursor",
          ],
          {
            opacity: 0,
            y: 18,
          },
        )
        .set(".hero-preview, .feature-card-build", {
          scale: 0.96,
        })
        .set(cursor, {
          x: -36,
          y: 0,
          scale: 1,
        });

      gsap.to(".ambient-orb-left", {
        xPercent: 6,
        yPercent: -8,
        duration: isCompact ? 6.6 : 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const orbRightTween = gsap.to(".ambient-orb-right", {
        xPercent: -8,
        yPercent: 10,
        duration: isCompact ? 7.4 : 5.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const orbLeftTween = gsap.getTweensOf(".ambient-orb-left")[0];
      timeline.play(0);

      observer = new IntersectionObserver(
        ([entry]) => {
          const method = entry.isIntersecting ? "play" : "pause";
          timeline[method]();
          orbLeftTween?.[method]?.();
          orbRightTween?.[method]?.();
        },
        { threshold: 0.18 },
      );

      observer.observe(root);

      handleResize = () => {
        timeline.invalidate();
      };

      window.addEventListener("resize", handleResize);
    }, root);

    return () => {
      if (handleResize) {
        window.removeEventListener("resize", handleResize);
      }
      observer?.disconnect();
      context.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="statement-visual relative order-2 mx-auto w-full max-w-full translate-y-8 scale-[0.965] overflow-hidden sm:max-w-[42rem] md:max-w-[46rem] lg:order-1 lg:max-w-none"
    >
      <div className="statement-visual-shell relative isolate mx-auto w-full max-w-full overflow-hidden">
        <div className="statement-visual-card relative w-full max-w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#060708]/90 p-2.5 shadow-[0_28px_72px_rgba(0,0,0,0.34)] backdrop-blur-md sm:rounded-[30px] sm:p-3.5 md:p-4 lg:rounded-[34px] lg:p-10 lg:shadow-[0_38px_100px_rgba(0,0,0,0.42)]">
          <div className="ambient-orb-left pointer-events-none absolute inset-x-[14%] top-[4%] h-20 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.16),transparent_72%)] blur-3xl sm:h-24 lg:inset-x-[10%] lg:h-28" />
          <div className="ambient-orb-right pointer-events-none absolute bottom-[5%] right-[4%] h-16 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_72%)] blur-3xl sm:h-20 sm:w-28 lg:h-24 lg:w-32" />

          <div className="relative overflow-hidden rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,#090b0f_0%,#050607_100%)] sm:rounded-[24px]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_24%,rgba(0,0,0,0.2)_100%)]" />

            <svg
              className="build-grid pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 900 1100"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {[120, 220, 320, 420, 520, 620, 720, 820].map((x) => (
                <line key={`v-${x}`} x1={x} y1="84" x2={x} y2="1016" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
              ))}
              {[170, 280, 390, 500, 610, 720, 830, 940].map((y) => (
                <line key={`h-${y}`} x1="66" y1={y} x2="834" y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              ))}
              {[130, 385, 640].map((x) => (
                <rect
                  key={`c-${x}`}
                  className="col-guide"
                  x={x}
                  y="120"
                  width="130"
                  height="860"
                  rx="28"
                  fill="rgba(255,255,255,0.025)"
                  stroke="rgba(255,255,255,0.05)"
                />
              ))}
            </svg>

            <div
              ref={stageRef}
              data-build-stage
              className="relative aspect-[10/12] min-h-[420px] w-full max-w-full overflow-hidden px-2.5 py-2.5 sm:min-h-[500px] sm:px-3 sm:py-3 md:min-h-[560px] md:px-4 md:py-4 lg:aspect-[9/11] lg:min-h-[680px] lg:px-5 lg:py-5 xl:min-h-[760px]"
            >
              <div className="browser-shell absolute inset-[2.6%] rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,rgba(12,14,18,0.96),rgba(7,8,11,0.94))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:rounded-[24px] lg:rounded-[30px]" />

              <div className="relative z-10 flex h-full flex-col gap-2.5 px-[5.6%] py-[5.8%] sm:gap-3 md:gap-4 lg:gap-5">
                <div className="browser-top flex h-8 items-center justify-between rounded-[14px] border border-white/8 bg-white/[0.035] px-2.5 backdrop-blur-md sm:h-9 sm:px-3 md:h-10 md:px-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#ff6b35] sm:h-2.5 sm:w-2.5" />
                    <span className="h-2 w-2 rounded-full bg-white/60 sm:h-2.5 sm:w-2.5" />
                    <span className="h-2 w-2 rounded-full bg-white/28 sm:h-2.5 sm:w-2.5" />
                  </div>
                  <div className="h-1.5 w-16 rounded-full bg-white/10 sm:h-2 sm:w-[5.5rem] md:w-28" />
                </div>

                <div className="nav-build flex items-center justify-between rounded-[14px] border border-white/7 bg-white/[0.03] px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-[#ff6b35] shadow-[0_0_14px_rgba(255,107,53,0.55)] sm:h-2.5 sm:w-2.5" />
                    <span className="h-2 w-10 rounded-full bg-white/14 sm:h-2.5 sm:w-14 md:w-16" />
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="h-1.5 w-6 rounded-full bg-white/9 sm:h-2 sm:w-8 md:w-10" />
                    <span className="h-1.5 w-6 rounded-full bg-white/9 sm:h-2 sm:w-8 md:w-10" />
                    <span className="hidden h-2 w-10 rounded-full bg-white/9 md:block" />
                  </div>
                </div>

                <div className="hero-block grid gap-3 rounded-[18px] border border-white/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-3 sm:gap-4 sm:rounded-[20px] sm:p-4 md:gap-5 md:p-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] lg:items-stretch lg:rounded-[26px] lg:p-6">
                  <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
                    <div className="hero-kicker inline-flex w-fit rounded-full border border-[#ff6b35]/18 bg-[#ff6b35]/10 px-2.5 py-1 text-[0.5rem] uppercase tracking-[0.18em] text-[#ffd2c0] sm:px-3 sm:text-[0.56rem] sm:tracking-[0.2em]">
                      Interface build
                    </div>
                    <div className="space-y-2.5 sm:space-y-3">
                      <div className="hero-title-line h-3.5 w-[88%] rounded-full bg-white/16 sm:h-4" />
                      <div className="hero-title-line h-3.5 w-[76%] rounded-full bg-white/16 sm:h-4" />
                      <div className="hero-title-line h-3.5 w-[64%] rounded-full bg-white/16 sm:h-4" />
                    </div>
                    <div className="space-y-2 sm:space-y-2.5">
                      <div className="hero-copy-line h-2 w-[86%] rounded-full bg-white/10 sm:h-2.5" />
                      <div className="hero-copy-line h-2 w-[78%] rounded-full bg-white/10 sm:h-2.5" />
                      <div className="hero-copy-line h-2 w-[68%] rounded-full bg-white/10 sm:h-2.5" />
                    </div>
                    <div
                      ref={launchButtonRef}
                      data-cursor-target="launch"
                      className="hero-cta-build inline-flex w-fit rounded-full border border-[#ff6b35]/20 bg-[#ff6b35]/88 px-3.5 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_14px_28px_rgba(255,107,53,0.16)] sm:px-4 sm:text-[0.62rem] sm:tracking-[0.18em]"
                    >
                      Launch block
                    </div>
                  </div>

                  <div className="hero-preview relative min-h-[132px] rounded-[18px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-2.5 sm:min-h-[160px] sm:rounded-[20px] sm:p-3 md:min-h-[188px] lg:min-h-[210px] lg:rounded-[22px]">
                    <div className="absolute inset-x-[16%] top-[14%] h-12 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.22),transparent_72%)] blur-2xl sm:h-16" />
                    <div className="relative h-full overflow-hidden rounded-[16px] border border-white/7 bg-[#0b0e12] sm:rounded-[18px]">
                      <div className="absolute left-2.5 top-2.5 h-1.5 w-10 rounded-full bg-white/12 sm:left-3 sm:top-3 sm:h-2 sm:w-12" />
                      <div className="absolute left-2.5 top-7 h-[4.5rem] w-[56%] rounded-[12px] border border-white/6 bg-white/[0.03] sm:left-3 sm:top-8 sm:h-24 sm:rounded-[14px]" />
                      <div className="absolute right-2.5 top-7 h-8 w-[32%] rounded-[10px] bg-[#ff6b35]/18 sm:right-3 sm:top-8 sm:h-10 sm:rounded-[12px]" />
                      <div className="absolute bottom-2.5 right-2.5 h-11 w-[34%] rounded-[12px] border border-white/6 bg-white/[0.03] sm:bottom-3 sm:right-3 sm:h-14 sm:rounded-[14px]" />
                    </div>
                  </div>
                </div>

                <div className="min-h-0 flex-1" />

                <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3.5 xl:gap-6">
                  {["Wireframe", "Motion", "Refine"].map((label, index) => (
                    <div
                      key={label}
                      ref={
                        index === 0
                          ? wireframeCardRef
                          : index === 1
                            ? motionCardRef
                            : refineCardRef
                      }
                      data-cursor-target={label.toLowerCase()}
                      className={`feature-card-build ${index === 1 ? "is-active" : ""} rounded-[18px] border border-white/8 bg-white/[0.03] p-3 sm:rounded-[20px] sm:p-3.5 md:rounded-[22px] md:p-4`}
                    >
                      <div className="mb-3 h-16 rounded-[14px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] sm:mb-4 sm:h-20 md:h-24 md:rounded-[16px]" />
                      <div className="h-2 w-14 rounded-full bg-white/12 sm:h-2.5 sm:w-16" />
                      <div className="mt-2 h-2 w-[72%] rounded-full bg-white/9 sm:h-2.5" />
                      <div className="mt-3 inline-flex rounded-full border border-white/8 px-2.5 py-1 text-[0.48rem] uppercase tracking-[0.16em] text-white/54 sm:mt-4 sm:text-[0.52rem] sm:tracking-[0.18em]">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="floating-chip absolute bottom-[3.8%] left-[5%] max-w-[calc(100%-1.5rem)] rounded-full border border-[#ff6b35]/16 bg-[#ff6b35]/10 px-2.5 py-1 text-[0.46rem] uppercase tracking-[0.16em] text-[#ffd4c4] backdrop-blur-md sm:left-auto sm:right-[7%] sm:top-[16%] sm:bottom-auto sm:max-w-none sm:px-3 sm:py-1.5 sm:text-[0.52rem] sm:tracking-[0.2em]">
                UI reveal
              </div>

              <div ref={cursorRef} data-build-cursor className="build-cursor absolute left-0 top-0 h-7 w-7 rounded-full border border-white/10 bg-white/[0.08] p-1.5 shadow-[0_14px_30px_rgba(0,0,0,0.26)] backdrop-blur-md sm:h-8 sm:w-8">
                <div className="h-full w-full [clip-path:polygon(0_0,74%_46%,45%_52%,57%_100%,38%_100%,28%_56%,0_74%)] bg-white/86" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
