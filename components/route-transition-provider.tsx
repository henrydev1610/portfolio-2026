"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

import { IntroOverlayShell } from "@/components/intro-overlay-shell";
import { playIntroAnimation } from "@/components/intro-animation";

type RouteTransitionContextValue = {
  navigate: (href: string) => void;
};

const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(null);

function scrollToHash(hash: string, behavior: ScrollBehavior) {
  const id = hash.replace(/^#/, "");
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior,
    block: "start",
  });
}

export function RouteTransitionProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const isTransitioningRef = useRef(false);
  const pendingHrefRef = useRef<string | null>(null);

  useEffect(() => {
    const root = overlayRef.current;

    if (!root) {
      return;
    }

    gsap.set(root, {
      autoAlpha: 0,
      pointerEvents: "none",
    });
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) {
      return;
    }

    const timeout = window.setTimeout(() => {
      scrollToHash(hash, "smooth");
    }, 80);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  const navigate = useCallback((href: string) => {
    const root = overlayRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!root || reduceMotion) {
      router.push(href);
      return;
    }

    if (isTransitioningRef.current) {
      return;
    }

    isTransitioningRef.current = true;
    pendingHrefRef.current = href;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    playIntroAnimation(root, {
      compact: true,
      onMidpoint: () => {
        if (pendingHrefRef.current) {
          router.push(pendingHrefRef.current);
        }
      },
      onComplete: () => {
        pendingHrefRef.current = null;
        isTransitioningRef.current = false;
        document.body.style.overflow = originalOverflow;
      },
    });
  }, [router]);

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <RouteTransitionContext.Provider value={value}>
      {children}
      <IntroOverlayShell ref={overlayRef} />
    </RouteTransitionContext.Provider>
  );
}

export function useRouteTransition() {
  const context = useContext(RouteTransitionContext);

  if (!context) {
    throw new Error("useRouteTransition must be used within RouteTransitionProvider");
  }

  return context;
}
