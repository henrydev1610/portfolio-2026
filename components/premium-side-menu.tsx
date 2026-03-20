"use client";

import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";

import { AppLink } from "@/components/app-link";
import { HeaderAvailabilityBadge } from "@/components/header-availability-badge";
import { navigationItems } from "@/components/navigation-items";

type PremiumSideMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function PremiumSideMenu({ open, onClose }: PremiumSideMenuProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;

    if (!overlay || !panel) {
      return;
    }

    gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
    gsap.set(panel, {
      autoAlpha: 0,
      x: 34,
      scale: 0.985,
      filter: "blur(10px)",
      pointerEvents: "none",
    });
  }, []);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;

    if (!overlay || !panel) {
      return;
    }

    gsap.killTweensOf([overlay, panel]);

    if (reduceMotionRef.current) {
      gsap.set(overlay, {
        autoAlpha: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
      });
      gsap.set(panel, {
        autoAlpha: open ? 1 : 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        pointerEvents: open ? "auto" : "none",
      });
      return;
    }

    gsap.to(overlay, {
      autoAlpha: open ? 1 : 0,
      duration: open ? 0.34 : 0.22,
      ease: open ? "power2.out" : "power2.inOut",
      pointerEvents: open ? "auto" : "none",
      overwrite: true,
    });

    gsap.to(panel, {
      autoAlpha: open ? 1 : 0,
      x: open ? 0 : 28,
      scale: open ? 1 : 0.985,
      filter: open ? "blur(0px)" : "blur(8px)",
      duration: open ? 0.42 : 0.26,
      ease: open ? "power3.out" : "power2.inOut",
      pointerEvents: open ? "auto" : "none",
      overwrite: true,
    });
  }, [open]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-[linear-gradient(180deg,rgba(4,4,5,0.42),rgba(4,4,5,0.72))] backdrop-blur-[4px]"
      onClick={onClose}
      aria-hidden={!open}
    >
      <div
        ref={panelRef}
        className="absolute inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom,0px))] top-[max(12px,env(safe-area-inset-top,0px))] rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,16,17,0.88),rgba(16,16,17,0.7))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:inset-y-5 sm:right-5 sm:left-auto sm:w-[min(92vw,420px)] sm:p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_34%),linear-gradient(180deg,rgba(255,107,53,0.08),transparent_34%)]" />
        <div className="relative z-[1] flex h-full flex-col">
          <div className="flex justify-center">
            <HeaderAvailabilityBadge />
          </div>

          <nav className="mt-8 flex flex-1 flex-col justify-center gap-2.5 sm:mt-10 sm:gap-2" aria-label="Menu lateral">
            {navigationItems.map((item) => (
              <AppLink
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="group rounded-[24px] px-5 py-4.5 text-[clamp(1.05rem,2vw,1.35rem)] font-medium tracking-[-0.04em] text-white/82 transition-[background,color,transform] duration-300 hover:bg-white/[0.05] hover:text-white"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/0 transition-colors duration-300 group-hover:bg-primary/80" />
                  {item.label}
                </span>
              </AppLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
