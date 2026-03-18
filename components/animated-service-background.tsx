"use client";

import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

export type ServiceBackgroundVariant = "landing" | "launch" | "automation" | "traffic";

type AnimatedServiceBackgroundProps = {
  variant: ServiceBackgroundVariant;
};

function LandingBackground() {
  return (
    <>
      <div
        className="absolute inset-[12%] rounded-[26px] border border-white/[0.05] bg-white/[0.012] [transform:perspective(1100px)_rotateX(68deg)_rotateY(-18deg)]"
        data-depth-layer
      />
      <div
        className="absolute left-[9%] top-[15%] h-[52%] w-[54%] rounded-[24px] border border-white/[0.075] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_20px_40px_rgba(0,0,0,0.14)] [transform:perspective(1100px)_rotateX(54deg)_rotateY(16deg)]"
        data-panel
      />
      <div
        className="absolute right-[9%] top-[17%] h-[22%] w-[28%] rounded-[18px] border border-white/[0.055] bg-white/[0.018] [transform:perspective(1000px)_rotateX(56deg)_rotateY(-14deg)]"
        data-panel
      />
      <div
        className="absolute right-[14%] bottom-[20%] h-[28%] w-[34%] rounded-[20px] border border-white/[0.06] bg-white/[0.02] [transform:perspective(1000px)_rotateX(58deg)_rotateY(-15deg)]"
        data-panel
      />
      <div className="absolute left-[14%] top-[20%] h-[10%] w-[30%] rounded-[12px] border border-white/[0.07] bg-white/[0.028]" data-ui-block />
      <div className="absolute left-[14%] top-[34%] h-[4%] w-[22%] rounded-full bg-white/[0.12]" data-ui-block />
      <div className="absolute left-[14%] top-[41%] h-[4%] w-[30%] rounded-full bg-white/[0.09]" data-ui-block />
      <div className="absolute left-[14%] top-[48%] h-[18%] w-[40%] rounded-[14px] border border-white/[0.06] bg-white/[0.02]" data-ui-block />
      <div className="absolute left-[14%] top-[70%] h-[7%] w-[20%] rounded-full bg-[#ff6b35]/16" data-ui-block />
      <div className="absolute left-[38%] top-[70%] h-[7%] w-[12%] rounded-full bg-white/[0.08]" data-ui-block />
      <div className="absolute right-[13%] top-[22%] h-[10%] w-[18%] rounded-[12px] border border-white/[0.06] bg-white/[0.018]" data-ui-block />
      <div className="absolute right-[13%] top-[36%] h-[16%] w-[22%] rounded-[12px] border border-white/[0.06] bg-white/[0.018]" data-ui-block />
      <div className="absolute right-[17%] bottom-[28%] h-[12%] w-[18%] rounded-[12px] border border-white/[0.06] bg-white/[0.018]" data-ui-block />
      <div className="absolute inset-x-[8%] top-[26%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]" data-grid-line />
      <div className="absolute inset-x-[12%] top-[44%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" data-grid-line />
      <div className="absolute inset-x-[18%] top-[62%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)]" data-grid-line />
      <div className="absolute left-[24%] top-[14%] h-[58%] w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.1),transparent)]" data-grid-line />
      <div className="absolute left-[54%] top-[18%] h-[48%] w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.08),transparent)]" data-grid-line />
      <div className="absolute right-[24%] top-[22%] h-[40%] w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.07),transparent)]" data-grid-line />
      <div
        className="absolute left-[10%] top-[10%] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.11),transparent_74%)] blur-[44px] transition-opacity duration-500 group-hover:opacity-100"
        data-glow
      />
      <div
        className="absolute right-[12%] bottom-[12%] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_74%)] blur-[40px] transition-opacity duration-500 group-hover:opacity-100"
        data-glow
      />
    </>
  );
}

function LaunchBackground() {
  return (
    <>
      <div className="absolute left-[10%] right-[12%] bottom-[18%] h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.03),rgba(255,255,255,0.12),rgba(255,255,255,0.03))]" />
      <div className="absolute left-[12%] bottom-[20%] h-[40%] w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.1),transparent)]" />
      <div
        className="absolute left-[10%] top-[62%] h-[2px] w-[56%] origin-left rounded-full bg-[linear-gradient(90deg,rgba(255,107,53,0.28),rgba(255,255,255,0.02))]"
        data-streak
      />
      <div
        className="absolute left-[14%] top-[50%] h-[2px] w-[42%] origin-left rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.16),rgba(255,255,255,0.01))]"
        data-streak
      />
      <div
        className="absolute left-[20%] top-[38%] h-[2px] w-[34%] origin-left rounded-full bg-[linear-gradient(90deg,rgba(255,107,53,0.18),rgba(255,255,255,0.01))]"
        data-streak
      />
      <svg className="absolute inset-[10%] h-[74%] w-[78%] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M6 86 C 22 74, 24 70, 36 58 S 60 42, 76 28 S 88 18, 96 10"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeLinecap="round"
          data-growth-line
        />
        <path
          d="M6 84 C 22 72, 24 68, 36 56 S 60 40, 76 26 S 88 16, 96 8"
          fill="none"
          stroke="rgba(255,107,53,0.16)"
          strokeWidth="1.2"
          strokeLinecap="round"
          data-growth-line
        />
        <circle cx="18" cy="76" r="2.1" fill="rgba(255,255,255,0.22)" data-growth-point />
        <circle cx="38" cy="56" r="2.3" fill="rgba(255,255,255,0.22)" data-growth-point />
        <circle cx="60" cy="40" r="2.6" fill="rgba(255,107,53,0.28)" data-growth-point />
        <circle cx="79" cy="24" r="3" fill="rgba(255,107,53,0.36)" data-growth-point />
        <circle cx="94" cy="10" r="3.2" fill="rgba(255,107,53,0.48)" data-growth-point />
        <rect x="18" y="78" width="6" height="10" rx="2" fill="rgba(255,255,255,0.07)" />
        <rect x="31" y="66" width="6" height="22" rx="2" fill="rgba(255,255,255,0.08)" />
        <rect x="45" y="54" width="6" height="34" rx="2" fill="rgba(255,255,255,0.09)" />
        <rect x="59" y="42" width="6" height="46" rx="2" fill="rgba(255,107,53,0.10)" />
      </svg>
      <div
        className="absolute right-[10%] top-[12%] h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.18),rgba(255,107,53,0.03)_46%,transparent_72%)] blur-[20px] transition-opacity duration-500 group-hover:opacity-100"
        data-core
      />
      <div className="absolute inset-0" data-particles>
        <span className="absolute left-[18%] top-[68%] h-1 w-1 rounded-full bg-white/50" />
        <span className="absolute left-[34%] top-[54%] h-1.5 w-1.5 rounded-full bg-primary/65" />
        <span className="absolute left-[50%] top-[42%] h-1 w-1 rounded-full bg-white/45" />
        <span className="absolute left-[70%] top-[26%] h-1.5 w-1.5 rounded-full bg-primary/60" />
        <span className="absolute left-[84%] top-[14%] h-1 w-1 rounded-full bg-white/50" />
      </div>
    </>
  );
}

function AutomationBackground() {
  return (
    <>
      <div className="absolute left-[16%] top-[18%] h-[58%] w-[68%] rounded-[24px] border border-white/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.008))] [transform:perspective(1000px)_rotateX(58deg)_rotateY(-10deg)]" data-depth-layer />
      <svg
        className="absolute inset-[8%] h-[78%] w-[84%] opacity-75 [transform:perspective(1000px)_rotateX(58deg)_rotateY(-12deg)]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M12 72 L 34 56 L 54 64 L 76 44 L 92 50" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.9" strokeLinecap="round" data-flow-line />
        <path d="M12 26 L 28 40 L 48 34 L 62 50 L 86 24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.9" strokeLinecap="round" data-flow-line />
        <path d="M22 84 L 38 68 L 58 74 L 72 60 L 90 66" fill="none" stroke="rgba(255,107,53,0.11)" strokeWidth="0.9" strokeLinecap="round" data-flow-line />
        <path d="M34 56 L 28 40" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" strokeLinecap="round" data-flow-line />
        <path d="M54 64 L 58 74" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" strokeLinecap="round" data-flow-line />
        <circle cx="12" cy="72" r="2.1" fill="rgba(255,255,255,0.18)" data-node />
        <circle cx="34" cy="56" r="2.6" fill="rgba(255,107,53,0.24)" data-node />
        <circle cx="54" cy="64" r="2.4" fill="rgba(255,255,255,0.18)" data-node />
        <circle cx="76" cy="44" r="2.8" fill="rgba(255,107,53,0.26)" data-node />
        <circle cx="92" cy="50" r="2.2" fill="rgba(255,255,255,0.18)" data-node />
        <circle cx="12" cy="26" r="2" fill="rgba(255,255,255,0.16)" data-node />
        <circle cx="28" cy="40" r="2.4" fill="rgba(255,255,255,0.16)" data-node />
        <circle cx="48" cy="34" r="2.2" fill="rgba(255,107,53,0.22)" data-node />
        <circle cx="62" cy="50" r="2.4" fill="rgba(255,255,255,0.16)" data-node />
        <circle cx="86" cy="24" r="2.5" fill="rgba(255,107,53,0.24)" data-node />
        <circle cx="22" cy="84" r="1.8" fill="rgba(255,255,255,0.14)" data-node />
        <circle cx="38" cy="68" r="2.1" fill="rgba(255,255,255,0.16)" data-node />
        <circle cx="58" cy="74" r="2.1" fill="rgba(255,107,53,0.2)" data-node />
        <circle cx="72" cy="60" r="2.1" fill="rgba(255,255,255,0.14)" data-node />
        <circle cx="90" cy="66" r="1.9" fill="rgba(255,255,255,0.14)" data-node />
      </svg>
      <div className="absolute left-[18%] top-[24%] h-[10%] w-[16%] rounded-[10px] border border-white/[0.05] bg-white/[0.03]" data-node-card />
      <div className="absolute left-[40%] top-[40%] h-[12%] w-[18%] rounded-[10px] border border-white/[0.05] bg-white/[0.028]" data-node-card />
      <div className="absolute right-[16%] top-[28%] h-[10%] w-[14%] rounded-[10px] border border-white/[0.05] bg-white/[0.026]" data-node-card />
      <div className="absolute right-[22%] bottom-[24%] h-[11%] w-[16%] rounded-[10px] border border-white/[0.05] bg-white/[0.024]" data-node-card />
      <span className="absolute left-[28%] top-[38%] h-2 w-2 rounded-full bg-primary/80 blur-[1px]" data-pulse />
      <span className="absolute left-[50%] top-[52%] h-2 w-2 rounded-full bg-white/70 blur-[1px]" data-pulse />
      <span className="absolute left-[74%] top-[34%] h-2 w-2 rounded-full bg-primary/75 blur-[1px]" data-pulse />
      <div className="absolute right-[10%] top-[18%] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.11),transparent_72%)] blur-[34px]" data-glow />
      <div className="absolute left-[12%] bottom-[16%] h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_72%)] blur-[28px]" data-glow />
    </>
  );
}

function TrafficBackground() {
  return (
    <>
      <div className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]" data-ring />
      <div className="absolute left-1/2 top-1/2 h-[32%] w-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" data-ring />
      <div className="absolute left-1/2 top-1/2 h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/[0.22]" data-ring />
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/70 blur-[0.4px]" data-core />
      <div className="absolute left-1/2 top-1/2 h-[58%] w-px -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.12),transparent)]" data-axis />
      <div className="absolute left-1/2 top-1/2 h-px w-[58%] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]" data-axis />
      <div className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2" data-orbit-wrap>
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/65 shadow-[0_0_10px_rgba(255,255,255,0.18)]" data-orbit-dot />
      </div>
      <div className="absolute right-[18%] top-[26%] h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.10),transparent_74%)] blur-[34px]" data-glow />
    </>
  );
}

export function AnimatedServiceBackground({ variant }: AnimatedServiceBackgroundProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCompact = window.matchMedia("(max-width: 820px)").matches;
    const card = root.closest("article");
    let observer: IntersectionObserver | null = null;

    const context = gsap.context(() => {
      const master = gsap.timeline({ repeat: -1, yoyo: true, paused: reduceMotion });
      const hoverTweens: gsap.core.Tween[] = [];

      gsap.set(root, { force3D: true, willChange: "transform, opacity" });

      if (variant === "landing") {
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
        const lines = gsap.utils.toArray<HTMLElement>("[data-grid-line]");
        const depth = gsap.utils.toArray<HTMLElement>("[data-depth-layer]");
        const glows = gsap.utils.toArray<HTMLElement>("[data-glow]");
        const uiBlocks = gsap.utils.toArray<HTMLElement>("[data-ui-block]");

        master
          .to(panels, { xPercent: (index) => (index % 2 === 0 ? (isCompact ? 1.2 : 2.5) : (isCompact ? -1.2 : -2.5)), yPercent: (index) => (index + 1) * (isCompact ? -0.9 : -1.8), duration: isCompact ? 14 : 11, stagger: 0.12, ease: "sine.inOut" }, 0)
          .to(lines, { xPercent: isCompact ? -1.2 : -2.5, opacity: 0.72, duration: isCompact ? 14 : 11, stagger: 0.04, ease: "sine.inOut" }, 0)
          .to(depth, { yPercent: isCompact ? 1.4 : 3, rotation: -0.6, duration: isCompact ? 15 : 13, ease: "sine.inOut" }, 0)
          .to(uiBlocks, { xPercent: (index) => (index % 2 === 0 ? 2 : -2), yPercent: (index) => (index % 2 === 0 ? -1.5 : 1.5), duration: isCompact ? 12 : 9, stagger: 0.08, ease: "sine.inOut" }, 0)
          .to(glows, { scale: 1.12, opacity: 0.8, duration: 9, ease: "sine.inOut" }, 0);
      }

      if (variant === "launch") {
        const streaks = gsap.utils.toArray<HTMLElement>("[data-streak]");
        const particles = gsap.utils.toArray<HTMLElement>("[data-particles] span");
        const core = gsap.utils.toArray<HTMLElement>("[data-core]");
        const growthLines = gsap.utils.toArray<SVGPathElement>("[data-growth-line]");
        const growthPoints = gsap.utils.toArray<SVGCircleElement>("[data-growth-point]");

        master
          .to(streaks, { xPercent: isCompact ? 4 : 8, scaleX: 1.08, duration: isCompact ? 10 : 8, stagger: 0.08, ease: "sine.inOut" }, 0)
          .to(particles, { x: (index) => (isCompact ? 5 : 10) + index * 3, y: (index) => (index % 2 === 0 ? (isCompact ? -5 : -10) : isCompact ? 4 : 8), opacity: 0.9, duration: isCompact ? 10 : 8, stagger: 0.04, ease: "sine.inOut" }, 0)
          .to(growthPoints, { scale: (index) => 1.08 + index * 0.05, transformOrigin: "center center", duration: isCompact ? 8 : 6.8, stagger: 0.05, ease: "sine.inOut" }, 0)
          .to(core, { scale: 1.18, opacity: 0.9, duration: 7, ease: "sine.inOut" }, 0);

        growthLines.forEach((line) => {
          const length = line.getTotalLength();
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length * 0.24 });
          master.to(line, { strokeDashoffset: 0, duration: isCompact ? 10 : 7.8, ease: "none" }, 0);
        });
      }

      if (variant === "automation") {
        const lines = gsap.utils.toArray<SVGPathElement>("[data-flow-line]");
        const nodes = gsap.utils.toArray<SVGCircleElement>("[data-node]");
        const pulses = gsap.utils.toArray<HTMLElement>("[data-pulse]");
        const glows = gsap.utils.toArray<HTMLElement>("[data-glow]");
        const nodeCards = gsap.utils.toArray<HTMLElement>("[data-node-card]");
        const depth = gsap.utils.toArray<HTMLElement>("[data-depth-layer]");

        lines.forEach((line) => {
          const length = line.getTotalLength();
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length * 0.28 });
          master.to(line, { strokeDashoffset: 0, duration: isCompact ? 11 : 8.4, ease: "none" }, 0);
        });

        master
          .to(depth, { yPercent: isCompact ? 1.2 : 2.2, xPercent: isCompact ? 0.6 : 1.2, duration: isCompact ? 12 : 9, ease: "sine.inOut" }, 0)
          .to(nodeCards, { yPercent: (index) => (index % 2 === 0 ? -2 : 2), xPercent: (index) => (index % 2 === 0 ? 1.6 : -1.6), duration: isCompact ? 10 : 8, stagger: 0.08, ease: "sine.inOut" }, 0)
          .to(nodes, { scale: (index) => (index % 4 === 0 ? 1.2 : 1.08), transformOrigin: "center center", opacity: 1, duration: 4.8, stagger: 0.08, ease: "sine.inOut" }, 0)
          .to(pulses, { xPercent: isCompact ? 56 : 90, yPercent: isCompact ? -18 : -30, duration: isCompact ? 8.4 : 6.5, stagger: 0.22, ease: "sine.inOut" }, 0)
          .to(glows, { scale: 1.16, opacity: 0.9, duration: 8, ease: "sine.inOut" }, 0);
      }

      if (variant === "traffic") {
        const rings = gsap.utils.toArray<HTMLElement>("[data-ring]");
        const axis = gsap.utils.toArray<HTMLElement>("[data-axis]");
        const orbitWrap = gsap.utils.toArray<HTMLElement>("[data-orbit-wrap]");
        const core = gsap.utils.toArray<HTMLElement>("[data-core]");
        const glows = gsap.utils.toArray<HTMLElement>("[data-glow]");

        master
          .to(rings, { scale: (index) => 1.03 + index * 0.018, opacity: 0.92, duration: 10, stagger: 0.08, ease: "sine.inOut" }, 0)
          .to(axis, { opacity: 0.75, duration: 8, ease: "sine.inOut" }, 0)
          .to(orbitWrap, { rotation: 360, duration: isCompact ? 16 : 13, ease: "none" }, 0)
          .to(core, { scale: 1.15, opacity: 1, duration: 6.5, ease: "sine.inOut" }, 0)
          .to(glows, { scale: 1.14, opacity: 0.88, duration: 7, ease: "sine.inOut" }, 0);
      }

      if (!card || reduceMotion) {
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            master.play();
          } else {
            master.pause();
          }
        },
        { threshold: 0.12 },
      );

      observer.observe(card);

      const handleEnter = () => {
        hoverTweens.push(
          gsap.to(master, { timeScale: 1.45, duration: 0.45, ease: "power2.out" }),
          gsap.to(root, { opacity: 1, duration: 0.45, ease: "power2.out" }),
        );
      };

      const handleLeave = () => {
        hoverTweens.push(
          gsap.to(master, { timeScale: 1, duration: 0.55, ease: "power2.out" }),
          gsap.to(root, { opacity: 0.82, duration: 0.55, ease: "power2.out" }),
        );
      };

      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);

      return () => {
        hoverTweens.forEach((tween) => tween.kill());
        card.removeEventListener("mouseenter", handleEnter);
        card.removeEventListener("mouseleave", handleLeave);
      };
    }, root);

    return () => {
      observer?.disconnect();
      context.revert();
    };
  }, [variant]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-[0.82] transition-opacity duration-500 [mask-image:linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.94)_48%,rgba(0,0,0,0.52)_78%,transparent_100%)]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.04),transparent_26%),radial-gradient(circle_at_80%_76%,rgba(255,107,53,0.06),transparent_28%)] transition-opacity duration-500 group-hover:opacity-100" />
      {variant === "landing" && <LandingBackground />}
      {variant === "launch" && <LaunchBackground />}
      {variant === "automation" && <AutomationBackground />}
      {variant === "traffic" && <TrafficBackground />}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,7,8,0.08)_52%,rgba(7,7,8,0.5)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,9,0.14),rgba(8,8,9,0.46)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,9,0.2),transparent_18%,transparent_82%,rgba(8,8,9,0.2))]" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_72%_24%,rgba(255,107,53,0.08),transparent_34%)]" />
    </div>
  );
}
