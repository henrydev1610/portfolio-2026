"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { IntroOverlayShell } from "@/components/intro-overlay-shell";
import { playIntroAnimation } from "@/components/intro-animation";

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
    const timeline = playIntroAnimation(root, {
      onComplete: () => {
        window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
        document.body.style.overflow = originalOverflow;
        setEnabled(false);
      },
    });

    return () => {
      timeline.kill();
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <IntroOverlayShell ref={rootRef} />;
}
