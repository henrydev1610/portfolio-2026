"use client";

import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "[role='button']",
  "input[type='button']",
  "input[type='submit']",
  "input[type='reset']",
  "summary",
  "[data-cursor='interactive']",
  ".cursor-pointer",
].join(", ");

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  const interactiveAncestor = target.closest(INTERACTIVE_SELECTOR);
  if (interactiveAncestor) {
    return true;
  }

  return window.getComputedStyle(target).cursor === "pointer";
}

export function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<SVGSVGElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const finePointerQuery = window.matchMedia("(pointer: fine)");

    if (!finePointerQuery.matches) {
      return;
    }

    const cursor = cursorRef.current;
    const icon = iconRef.current;
    const label = labelRef.current;

    if (!cursor || !icon || !label) {
      return;
    }

    let isVisible = false;
    let isInteractive = false;

    const context = gsap.context(() => {
      gsap.set(cursor, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        opacity: 0,
        scale: 0.82,
      });

      gsap.set(label, {
        opacity: 0,
        scale: 0.94,
        y: 2,
      });

      gsap.set(icon, {
        opacity: 0.92,
        scale: 1,
      });

      const moveX = gsap.quickTo(cursor, "x", {
        duration: 0.22,
        ease: "power3.out",
      });
      const moveY = gsap.quickTo(cursor, "y", {
        duration: 0.22,
        ease: "power3.out",
      });

      const setInteractiveState = (interactive: boolean) => {
        if (interactive === isInteractive) {
          return;
        }

        isInteractive = interactive;

        gsap.to(cursor, {
          duration: 0.28,
          ease: "power3.out",
          backgroundColor: interactive ? "rgba(255, 107, 53, 0.18)" : "rgba(255, 255, 255, 0.06)",
          borderColor: interactive ? "rgba(255, 107, 53, 0.36)" : "rgba(255, 255, 255, 0.16)",
          boxShadow: interactive
            ? "0 18px 44px rgba(255, 107, 53, 0.18)"
            : "0 0 0 rgba(255, 107, 53, 0)",
        });

        gsap.to(label, {
          duration: 0.24,
          ease: "power3.out",
          opacity: interactive ? 1 : 0,
          scale: interactive ? 1 : 0.94,
          y: interactive ? 0 : 2,
        });

        gsap.to(icon, {
          duration: 0.24,
          ease: "power3.out",
          opacity: interactive ? 0.3 : 0.92,
          scale: interactive ? 0.88 : 1,
        });
      };

      const showCursor = () => {
        if (isVisible) {
          return;
        }

        isVisible = true;

        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          duration: 0.28,
          ease: "power3.out",
        });
      };

      const hideCursor = () => {
        if (!isVisible) {
          return;
        }

        isVisible = false;
        setInteractiveState(false);

        gsap.to(cursor, {
          opacity: 0,
          scale: 0.82,
          duration: 0.24,
          ease: "power3.out",
        });
      };

      const handlePointerMove = (event: PointerEvent) => {
        moveX(event.clientX);
        moveY(event.clientY);
        showCursor();
        setInteractiveState(isInteractiveTarget(event.target));
      };

      const handlePointerLeave = () => {
        hideCursor();
      };

      const handleWindowBlur = () => {
        hideCursor();
      };

      document.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.addEventListener("pointerleave", handlePointerLeave);
      window.addEventListener("blur", handleWindowBlur);

      return () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("blur", handleWindowBlur);
      };
    });

    return () => context.revert();
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 scale-[0.82] items-center justify-center rounded-full border border-white/16 bg-white/[0.06] opacity-0 backdrop-blur-md md:flex"
      aria-hidden="true"
    >
      <svg
        ref={iconRef}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute z-[1] h-6 w-6"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
      <div
        ref={labelRef}
        className="absolute z-[2] text-[0.68rem] uppercase tracking-[0.18em] text-white"
      >
        Clicar
      </div>
    </div>
  );
}
