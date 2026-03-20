"use client";

import { gsap } from "gsap";
import { useLayoutEffect, useRef, useState } from "react";

const INTRO_SESSION_KEY = "henry-dev-intro-seen";

export function PageIntro() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(true);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seenInSession = window.sessionStorage.getItem(INTRO_SESSION_KEY) === "true";

    if (reduceMotion || seenInSession) {
      setEnabled(false);
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const context = gsap.context(() => {
      gsap.set(".intro-word, .intro-caption, .intro-line", {
        opacity: 0,
        y: 16,
      });

      gsap.set(".intro-line", {
        scaleX: 0.7,
        transformOrigin: "50% 50%",
      });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
            document.body.style.overflow = originalOverflow;
            setEnabled(false);
          },
        })
        .fromTo(
          root,
          { autoAlpha: 1 },
          { autoAlpha: 1, duration: 0.01 },
        )
        .fromTo(
          ".intro-backdrop",
          { opacity: 0.72 },
          { opacity: 1, duration: 0.3 },
          0,
        )
        .fromTo(
          ".intro-glow",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.72 },
          0.06,
        )
        .to(
          ".intro-word",
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
          },
          0.16,
        )
        .to(
          ".intro-line",
          {
            opacity: 1,
            y: 0,
            scaleX: 1,
            duration: 0.56,
          },
          0.24,
        )
        .to(
          ".intro-caption",
          {
            opacity: 1,
            y: 0,
            duration: 0.52,
          },
          0.34,
        )
        .to({}, { duration: 0.44 })
        .to(
          ".intro-content",
          {
            opacity: 0,
            y: -10,
            duration: 0.42,
            ease: "power2.inOut",
          },
        )
        .to(
          ".intro-backdrop",
          {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "-=0.2",
        )
        .to(
          root,
          {
            autoAlpha: 0,
            duration: 0.22,
          },
          "-=0.08",
        );
    }, root);

    return () => {
      document.body.style.overflow = originalOverflow;
      context.revert();
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[60] overflow-hidden"
      aria-hidden="true"
    >
      <div className="intro-backdrop absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,10,0.98),rgba(12,12,13,0.98)),radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_24%)]" />
      <div className="intro-glow absolute inset-x-[22%] top-[24%] h-40 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.16),transparent_70%)] blur-[82px]" />
      <div className="intro-glow absolute inset-x-[28%] top-[18%] h-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_72%)] blur-[64px]" />
      <div className="absolute inset-0 opacity-[0.045] mix-blend-screen [background-image:radial-gradient(rgba(255,255,255,0.78)_0.7px,transparent_0.7px)] [background-size:5px_5px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_58%,rgba(0,0,0,0.28)_78%,rgba(0,0,0,0.5)_100%)]" />

      <div className="intro-content relative flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="intro-word text-[clamp(3.4rem,13vw,9rem)] leading-[0.84] font-semibold tracking-[-0.08em] text-white">
          HENRY.
        </div>
        <div className="intro-line mt-4 h-px w-[min(42vw,240px)] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)]" />
        <div className="intro-caption mt-5 text-[0.72rem] font-medium tracking-[0.32em] text-white/52 uppercase">
          Full Stack Developer
        </div>
      </div>
    </div>
  );
}
