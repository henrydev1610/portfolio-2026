"use client";

import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

export const floatingCodeGalaxySnippets = [
  'import React from "react"',
  "const server = createServer()",
  "async function fetchData() {}",
  "interface User { id: number; name: string }",
  "export default function Home() {}",
  'await db.query("SELECT * FROM users")',
  "useEffect(() => {}, [])",
  "type ApiResponse = { success: boolean }",
  'router.push("/dashboard")',
  "const [state, setState] = useState(null)",
  "const preview = composeInterface(tokens)",
  "const theme = { accent: '#ff6b35' }",
];

const particleOffsets = [
  { left: "8%", top: "20%", size: "h-1.5 w-1.5", glow: "bg-[#89d7ff]" },
  { left: "18%", top: "68%", size: "h-1 w-1", glow: "bg-white" },
  { left: "29%", top: "34%", size: "h-2 w-2", glow: "bg-[#ff8b5b]" },
  { left: "42%", top: "58%", size: "h-1.5 w-1.5", glow: "bg-[#8df7ff]" },
  { left: "54%", top: "24%", size: "h-1 w-1", glow: "bg-white" },
  { left: "67%", top: "70%", size: "h-2 w-2", glow: "bg-[#ffb06f]" },
  { left: "79%", top: "39%", size: "h-1.5 w-1.5", glow: "bg-[#92d7ff]" },
  { left: "88%", top: "60%", size: "h-1 w-1", glow: "bg-white" },
  { left: "10%", top: "84%", size: "h-1.5 w-1.5", glow: "bg-[#8cc6ff]" },
  { left: "24%", top: "12%", size: "h-1 w-1", glow: "bg-white" },
  { left: "36%", top: "80%", size: "h-2 w-2", glow: "bg-[#ff9a70]" },
  { left: "58%", top: "82%", size: "h-1 w-1", glow: "bg-[#9cefff]" },
  { left: "74%", top: "14%", size: "h-1.5 w-1.5", glow: "bg-white" },
  { left: "92%", top: "28%", size: "h-1 w-1", glow: "bg-[#ffb980]" },
];

const snippetGroups = [
  floatingCodeGalaxySnippets.slice(0, 4),
  floatingCodeGalaxySnippets.slice(4, 8),
  floatingCodeGalaxySnippets.slice(8, 12),
];

export function FloatingCodeGalaxyBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    let observer: IntersectionObserver | null = null;

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isCompact = window.matchMedia("(max-width: 1024px)").matches;
      const planes = gsap.utils.toArray<HTMLElement>("[data-galaxy-plane]");
      const clusters = gsap.utils.toArray<HTMLElement>("[data-galaxy-cluster]");
      const particles = gsap.utils.toArray<HTMLElement>("[data-galaxy-particle]");
      const halos = gsap.utils.toArray<HTMLElement>("[data-galaxy-halo]");
      const activeTweens: gsap.core.Tween[] = [];

      gsap.set([...planes, ...clusters, ...particles, ...halos], {
        force3D: true,
        willChange: "transform, opacity",
      });

      if (reduceMotion) {
        return;
      }

      planes.forEach((plane, index) => {
        const direction = index % 2 === 0 ? 1 : -1;

        activeTweens.push(gsap.to(plane, {
          xPercent: direction * (isCompact ? 1.4 : 2.8),
          yPercent: direction * (isCompact ? 3.2 : 6.4),
          rotateZ: direction * 1.2,
          duration: (isCompact ? 34 : 28) + index * 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }));
      });

      clusters.forEach((cluster, index) => {
        const direction = index % 2 === 0 ? -1 : 1;

        activeTweens.push(gsap.to(cluster, {
          xPercent: direction * (isCompact ? 1.2 : 2.2),
          yPercent: direction * (isCompact ? 4.4 : 8.2),
          rotateZ: direction * 0.8,
          duration: (isCompact ? 30 : 24) + index * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }));
      });

      particles.forEach((particle, index) => {
        const direction = index % 2 === 0 ? 1 : -1;

        activeTweens.push(gsap.to(particle, {
          x: direction * (isCompact ? 6 + (index % 2) * 4 : 12 + (index % 3) * 6),
          y: direction * (isCompact ? 10 + (index % 3) * 4 : 18 + (index % 4) * 6),
          opacity: 0.2 + (index % 3) * 0.06,
          scale: 1.14 + (index % 2) * 0.1,
          duration: (isCompact ? 16 : 13) + index * 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }));
      });

      halos.forEach((halo, index) => {
        activeTweens.push(gsap.to(halo, {
          opacity: 0.34 + index * 0.05,
          scale: 1.1 + index * 0.05,
          duration: 16 + index * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }));
      });

      observer = new IntersectionObserver(
        ([entry]) => {
          activeTweens.forEach((tween) => (entry.isIntersecting ? tween.resume() : tween.pause()));
        },
        { threshold: 0.08 },
      );

      observer.observe(root);
    }, root);

    return () => {
      observer?.disconnect();
      context.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_34%),radial-gradient(circle_at_50%_34%,rgba(255,140,84,0.09),transparent_30%),radial-gradient(circle_at_50%_42%,rgba(115,196,255,0.075),transparent_38%),linear-gradient(180deg,rgba(5,5,7,0.94),rgba(7,7,9,0.98))]" />

      <div className="absolute inset-0">
        <div className="absolute left-[-14%] top-[-10%] h-[38%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.035),transparent_72%)] blur-[120px]" />
        <div className="absolute right-[-12%] top-[2%] h-[44%] w-[38%] rounded-full bg-[radial-gradient(circle,rgba(255,126,78,0.06),transparent_72%)] blur-[118px]" />
        <div className="absolute left-[-10%] bottom-[-12%] h-[40%] w-[44%] rounded-full bg-[radial-gradient(circle,rgba(115,196,255,0.05),transparent_72%)] blur-[124px]" />
        <div className="absolute right-[-10%] bottom-[-14%] h-[42%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_72%)] blur-[124px]" />
      </div>

      <div className="absolute inset-x-[-2%] inset-y-[4%] [perspective:1700px]">
        <div
          data-galaxy-plane
          className="absolute left-[-4%] top-[5%] w-[42%] rounded-[36px] border border-white/[0.06] bg-white/[0.02] px-5 py-5 font-mono text-[9px] leading-[2.05] text-white/[0.13] shadow-[0_30px_80px_rgba(0,0,0,0.24)] backdrop-blur-[1.2px] sm:text-[10px]"
          style={{ transform: "rotateX(66deg) rotateY(24deg) rotateZ(-10deg) translateZ(-80px)" }}
        >
          {snippetGroups[0].map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>

        <div
          data-galaxy-plane
          className="absolute right-[-3%] top-[10%] w-[40%] rounded-[36px] border border-white/[0.05] bg-white/[0.016] px-5 py-5 font-mono text-[9px] leading-[2.05] text-white/[0.11] blur-[0.35px] sm:text-[10px]"
          style={{ transform: "rotateX(70deg) rotateY(-18deg) rotateZ(8deg) translateZ(-180px)" }}
        >
          {snippetGroups[1].map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>

        <div
          data-galaxy-plane
          className="absolute left-[24%] top-[24%] w-[34%] rounded-[32px] border border-white/[0.04] bg-white/[0.014] px-4 py-4 font-mono text-[8px] leading-[2.1] text-white/[0.085] blur-[1.15px] sm:text-[9px]"
          style={{ transform: "rotateX(73deg) rotateY(10deg) rotateZ(-4deg) translateZ(-280px)" }}
        >
          {snippetGroups[2].map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>

        <div
          data-galaxy-plane
          className="absolute left-[2%] bottom-[6%] w-[40%] rounded-[34px] border border-white/[0.045] bg-white/[0.015] px-5 py-5 font-mono text-[8px] leading-[2.08] text-white/[0.1] blur-[0.8px] sm:text-[9px]"
          style={{ transform: "rotateX(70deg) rotateY(20deg) rotateZ(-8deg) translateZ(-210px)" }}
        >
          {floatingCodeGalaxySnippets.slice(2, 8).map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>

        <div
          data-galaxy-plane
          className="absolute right-[4%] bottom-[9%] w-[34%] rounded-[30px] border border-white/[0.035] bg-white/[0.012] px-4 py-4 font-mono text-[8px] leading-[2.08] text-white/[0.075] blur-[1.3px] sm:text-[9px]"
          style={{ transform: "rotateX(74deg) rotateY(-16deg) rotateZ(6deg) translateZ(-330px)" }}
        >
          {floatingCodeGalaxySnippets.slice(5, 11).map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-[6%] left-[2%] right-[2%] [perspective:1900px]">
        <div
          data-galaxy-cluster
          className="absolute left-[2%] top-[14%] w-[24%] rounded-[28px] border border-white/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.024),rgba(255,255,255,0.008))] px-4 py-4 font-mono text-[8px] leading-[2] text-white/[0.07]"
          style={{ transform: "rotateX(18deg) rotateY(22deg) translateZ(-120px)" }}
        >
          {floatingCodeGalaxySnippets.slice(1, 7).map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>

        <div
          data-galaxy-cluster
          className="absolute left-[38%] top-[8%] w-[20%] rounded-[26px] border border-white/[0.035] bg-[linear-gradient(180deg,rgba(255,255,255,0.018),rgba(255,255,255,0.006))] px-4 py-4 font-mono text-[8px] leading-[2] text-white/[0.06] blur-[0.55px]"
          style={{ transform: "rotateX(14deg) rotateY(-6deg) translateZ(-220px)" }}
        >
          {floatingCodeGalaxySnippets.slice(6, 10).map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>

        <div
          data-galaxy-cluster
          className="absolute right-[2%] top-[20%] w-[22%] rounded-[28px] border border-white/[0.03] bg-[linear-gradient(180deg,rgba(255,255,255,0.014),rgba(255,255,255,0.004))] px-4 py-4 font-mono text-[8px] leading-[2] text-white/[0.052] blur-[1px]"
          style={{ transform: "rotateX(20deg) rotateY(-20deg) translateZ(-320px)" }}
        >
          {floatingCodeGalaxySnippets.slice(0, 5).map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>

        <div
          data-galaxy-cluster
          className="absolute left-[14%] bottom-[12%] w-[20%] rounded-[28px] border border-white/[0.035] bg-[linear-gradient(180deg,rgba(255,255,255,0.018),rgba(255,255,255,0.005))] px-4 py-4 font-mono text-[8px] leading-[2] text-white/[0.06] blur-[0.5px]"
          style={{ transform: "rotateX(18deg) rotateY(18deg) translateZ(-200px)" }}
        >
          {floatingCodeGalaxySnippets.slice(3, 8).map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>

        <div
          data-galaxy-cluster
          className="absolute right-[16%] bottom-[10%] w-[18%] rounded-[26px] border border-white/[0.028] bg-[linear-gradient(180deg,rgba(255,255,255,0.014),rgba(255,255,255,0.004))] px-4 py-4 font-mono text-[8px] leading-[2] text-white/[0.048] blur-[1.1px]"
          style={{ transform: "rotateX(16deg) rotateY(-14deg) translateZ(-280px)" }}
        >
          {floatingCodeGalaxySnippets.slice(7, 12).map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0">
        {particleOffsets.map((particle, index) => (
          <span
            key={`${particle.left}-${particle.top}`}
            data-galaxy-particle
            className={`absolute rounded-full opacity-[0.18] blur-[0.35px] ${particle.size} ${particle.glow}`}
            style={{
              left: particle.left,
              top: particle.top,
              boxShadow: index % 2 === 0 ? "0 0 18px rgba(255,255,255,0.22)" : "0 0 22px rgba(255,107,53,0.24)",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        <div
          data-galaxy-halo
          className="absolute left-[16%] top-[14%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(132,201,255,0.09),transparent_72%)] blur-[104px]"
        />
        <div
          data-galaxy-halo
          className="absolute right-[16%] top-[28%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,120,66,0.1),transparent_74%)] blur-[116px]"
        />
        <div
          data-galaxy-halo
          className="absolute left-1/2 top-[42%] h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.038),transparent_72%)] blur-[124px]"
        />
        <div
          data-galaxy-halo
          className="absolute left-[28%] bottom-[10%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,171,110,0.065),transparent_74%)] blur-[110px]"
        />
        <div
          data-galaxy-halo
          className="absolute right-[26%] bottom-[16%] h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(132,201,255,0.06),transparent_74%)] blur-[104px]"
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_54%,rgba(0,0,0,0.16)_74%,rgba(0,0,0,0.42)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.26),transparent_20%,transparent_78%,rgba(0,0,0,0.3)),linear-gradient(90deg,rgba(0,0,0,0.28),transparent_18%,transparent_82%,rgba(0,0,0,0.28))]" />
      <div className="absolute inset-0 opacity-[0.055] mix-blend-screen [background-image:radial-gradient(rgba(255,255,255,0.75)_0.7px,transparent_0.7px)] [background-size:5px_5px]" />
    </div>
  );
}
