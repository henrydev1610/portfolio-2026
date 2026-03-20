"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { HeaderAvailabilityBadge } from "@/components/header-availability-badge";
import { HeaderMenuButton } from "@/components/header-menu-button";
import { navigationItems } from "@/components/navigation-items";

type StickyFloatingMenuProps = {
  targetSelector: string;
};

export function StickyFloatingMenu({ targetSelector }: StickyFloatingMenuProps) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reduceMotionRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const headerVisibleRef = useRef(true);
  const visibleRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lastScrollYRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    const target = document.querySelector<HTMLElement>(targetSelector);

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        headerVisibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          visibleRef.current = false;
          setVisible(false);
        }
      },
      {
        threshold: 0.02,
        rootMargin: "-12px 0px 0px 0px",
      },
    );

    observer.observe(target);

    const threshold = 10;
    const nearTopOffset = 24;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;

      if (Math.abs(delta) < threshold) {
        return;
      }

      const isScrollingUp = delta < 0;
      const shouldShow =
        !headerVisibleRef.current && isScrollingUp && currentY > nearTopOffset;

      if (visibleRef.current !== shouldShow) {
        visibleRef.current = shouldShow;
        setVisible(shouldShow);
      }

      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [targetSelector]);

  useEffect(() => {
    if (!visible && open) {
      setOpen(false);
    }
  }, [visible, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const shell = shellRef.current;
      if (!shell || shell.contains(event.target as Node)) {
        return;
      }
      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const panel = panelRef.current;

    if (!shell || !panel) {
      return;
    }

    gsap.set(shell, {
      autoAlpha: 0,
      y: -26,
      scale: 0.98,
      pointerEvents: "none",
    });

    gsap.set(panel, {
      autoAlpha: 0,
      y: -12,
      scale: 0.98,
      pointerEvents: "none",
    });
  }, []);

  useLayoutEffect(() => {
    const shell = shellRef.current;

    if (!shell) {
      return;
    }

    gsap.killTweensOf(shell);

    if (reduceMotionRef.current) {
      gsap.set(shell, {
        autoAlpha: visible ? 1 : 0,
        y: 0,
        scale: 1,
        pointerEvents: visible ? "auto" : "none",
      });
      return;
    }

    gsap.to(shell, {
      autoAlpha: visible ? 1 : 0,
      y: visible ? 0 : -22,
      scale: visible ? 1 : 0.985,
      duration: visible ? 0.42 : 0.28,
      ease: visible ? "power3.out" : "power2.inOut",
      pointerEvents: visible ? "auto" : "none",
      overwrite: true,
    });
  }, [visible]);

  useLayoutEffect(() => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    gsap.killTweensOf(panel);

    if (reduceMotionRef.current) {
      gsap.set(panel, {
        autoAlpha: open ? 1 : 0,
        y: 0,
        scale: 1,
        pointerEvents: open ? "auto" : "none",
      });
      return;
    }

    gsap.to(panel, {
      autoAlpha: open ? 1 : 0,
      y: open ? 0 : -10,
      scale: open ? 1 : 0.985,
      duration: open ? 0.34 : 0.24,
      ease: open ? "power3.out" : "power2.inOut",
      pointerEvents: open ? "auto" : "none",
      overwrite: true,
    });
  }, [open]);

  return (
    <div
      ref={shellRef}
      className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:top-5 sm:px-6"
      aria-hidden={!visible}
    >
      <div className="relative w-full max-w-max">
        <div className="relative flex items-center gap-3 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(16,16,17,0.78),rgba(16,16,17,0.54))] px-2.5 py-2 shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_58%)]" />
          <div className="relative z-[1]">
            <HeaderAvailabilityBadge />
          </div>
          <div className="relative z-[1]">
            <HeaderMenuButton
              open={open}
              onClick={() => setOpen((current) => !current)}
              label={open ? "Fechar menu" : "Abrir menu flutuante"}
            />
          </div>
        </div>

        <div
          ref={panelRef}
          className="absolute left-1/2 top-[calc(100%+12px)] w-[min(92vw,320px)] -translate-x-1/2 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,16,17,0.82),rgba(16,16,17,0.62))] p-3 shadow-[0_28px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_36%),linear-gradient(180deg,rgba(255,107,53,0.08),transparent_40%)]" />
          <nav className="relative z-[1] flex flex-col gap-1.5" aria-label="Navegação secundária">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[20px] px-4 py-3 text-[0.92rem] font-medium tracking-[-0.02em] text-white/78 transition-[background,color,transform] duration-300 hover:bg-white/[0.05] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
