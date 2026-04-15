"use client";

import { forwardRef } from "react";

export const IntroOverlayShell = forwardRef<HTMLDivElement>(function IntroOverlayShell(_, ref) {
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[90] overflow-hidden"
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
          Desenvolvedor de software
        </div>
      </div>
    </div>
  );
});
