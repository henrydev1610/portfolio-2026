"use client";

import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

const codeColumns = [
  [
    "import React from 'react'",
    "const server = createServer()",
    "async function fetchData() {",
    "  return await db.query(sql)",
    "}",
    "interface User {",
    "  id: string",
    "  role: 'admin' | 'guest'",
    "}",
  ],
  [
    "type ApiResponse<T> = Promise<T>",
    "export default function Dashboard() {",
    "  const [state, setState] = useState(null)",
    "  useEffect(() => {",
    "    startTransition(syncPreview)",
    "  }, [])",
    "  return <Shell />",
    "}",
  ],
  [
    "await db.query('select * from projects')",
    "const preview = composeInterface(tokens)",
    "router.prefetch('/work')",
    "motionValue.set(progress)",
    "const ui = buildProductExperience()",
    "export const metadata = {",
    "  title: 'Henry Dev'",
    "}",
  ],
  [
    "import type { Metadata } from 'next'",
    "const timeline = gsap.timeline()",
    "timeline.to(card, { opacity: 1 })",
    "const theme = { accent: '#ff6b35' }",
    "const response = await fetch('/api/projects')",
    "return response.json()",
  ],
];

export function CodeWall3DCinematic() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const context = gsap.context(() => {
      const planes = gsap.utils.toArray<HTMLElement>("[data-code-plane]");
      const columns = gsap.utils.toArray<HTMLElement>("[data-code-column]");
      const glows = gsap.utils.toArray<HTMLElement>("[data-code-glow]");

      gsap.set(planes, {
        force3D: true,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      });

      gsap.set(columns, {
        force3D: true,
        willChange: "transform, opacity",
      });

      planes.forEach((plane, index) => {
        const direction = index % 2 === 0 ? 1 : -1;

        gsap.to(plane, {
          yPercent: direction * 3.2,
          xPercent: direction * 1.4,
          rotateZ: direction * 0.9,
          duration: 28 + index * 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      columns.forEach((column, index) => {
        const direction = index % 2 === 0 ? -1 : 1;

        gsap.to(column, {
          yPercent: direction * 7,
          duration: 24 + index * 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      glows.forEach((glow, index) => {
        gsap.to(glow, {
          opacity: 0.28 + index * 0.08,
          scale: 1.08 + index * 0.03,
          duration: 16 + index * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_34%),radial-gradient(circle_at_center,rgba(255,107,53,0.08),transparent_48%),linear-gradient(180deg,rgba(4,4,5,0.88),rgba(7,7,8,0.96))]" />

      <div className="absolute inset-x-[-8%] top-[9%] h-[82%] [perspective:1600px]">
        <div
          data-code-plane
          className="absolute left-[-6%] top-[7%] w-[64%] rounded-[44px] border border-white/[0.045] bg-white/[0.02] px-5 py-6 font-mono text-[10px] leading-[1.95] text-white/[0.16] shadow-[0_0_120px_rgba(0,0,0,0.34)] backdrop-blur-[2px] sm:px-7 sm:text-[11px]"
          style={{ transform: "rotateX(67deg) rotateY(26deg) rotateZ(-12deg) translateZ(-40px)" }}
        >
          <div className="space-y-2">
            {codeColumns[0].map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>

        <div
          data-code-plane
          className="absolute right-[-3%] top-[18%] w-[60%] rounded-[44px] border border-white/[0.04] bg-white/[0.018] px-5 py-6 font-mono text-[10px] leading-[1.95] text-white/[0.12] blur-[0.2px] sm:px-7 sm:text-[11px]"
          style={{ transform: "rotateX(70deg) rotateY(-22deg) rotateZ(10deg) translateZ(-120px)" }}
        >
          <div className="space-y-2">
            {codeColumns[1].map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>

        <div
          data-code-plane
          className="absolute left-[16%] top-[31%] w-[54%] rounded-[40px] border border-white/[0.035] bg-black/16 px-5 py-5 font-mono text-[9px] leading-[2] text-white/[0.08] blur-[1.4px] sm:px-6 sm:text-[10px]"
          style={{ transform: "rotateX(74deg) rotateY(14deg) rotateZ(-6deg) translateZ(-220px)" }}
        >
          <div className="space-y-2">
            {codeColumns[2].map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-y-[14%] left-[7%] right-[7%] [perspective:1800px]">
        <div
          data-code-column
          className="absolute left-[2%] top-[8%] w-[24%] rounded-[28px] border border-white/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.008))] px-4 py-5 font-mono text-[9px] leading-[2] text-white/[0.09] backdrop-blur-[1px]"
          style={{ transform: "rotateX(12deg) rotateY(18deg) translateZ(-40px)" }}
        >
          {codeColumns[0].concat(codeColumns[3]).map((line, index) => (
            <div key={`${line}-${index}`}>{line}</div>
          ))}
        </div>

        <div
          data-code-column
          className="absolute left-[38%] top-[18%] w-[24%] rounded-[28px] border border-white/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.006))] px-4 py-5 font-mono text-[9px] leading-[2] text-white/[0.075] blur-[0.5px]"
          style={{ transform: "rotateX(10deg) rotateY(-8deg) translateZ(-140px)" }}
        >
          {codeColumns[1].concat(codeColumns[2]).map((line, index) => (
            <div key={`${line}-${index}`}>{line}</div>
          ))}
        </div>

        <div
          data-code-column
          className="absolute right-[4%] top-[10%] w-[22%] rounded-[28px] border border-white/[0.03] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.006))] px-4 py-5 font-mono text-[9px] leading-[2] text-white/[0.07] blur-[1px]"
          style={{ transform: "rotateX(14deg) rotateY(-18deg) translateZ(-220px)" }}
        >
          {codeColumns[3].concat(codeColumns[0]).map((line, index) => (
            <div key={`${line}-${index}`}>{line}</div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0">
        <div
          data-code-glow
          className="absolute left-[10%] top-[18%] h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_70%)] blur-[90px]"
        />
        <div
          data-code-glow
          className="absolute right-[12%] top-[42%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.08),transparent_72%)] blur-[110px]"
        />
        <div className="absolute inset-x-[18%] top-[22%] h-[56%] rounded-[50%] bg-[radial-gradient(circle,rgba(0,0,0,0.22),rgba(0,0,0,0.02)_58%,transparent_76%)] blur-[80px]" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_52%,rgba(0,0,0,0.28)_78%,rgba(0,0,0,0.54)_100%)]" />
      <div className="absolute inset-0 opacity-[0.055] mix-blend-screen [background-image:radial-gradient(rgba(255,255,255,0.7)_0.7px,transparent_0.7px)] [background-size:5px_5px]" />
    </div>
  );
}
