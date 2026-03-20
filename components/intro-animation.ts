"use client";

import { gsap } from "gsap";

type IntroAnimationOptions = {
  onMidpoint?: () => void;
  onComplete?: () => void;
  compact?: boolean;
};

export function playIntroAnimation(root: HTMLElement, options: IntroAnimationOptions = {}) {
  const { onMidpoint, onComplete, compact = false } = options;

  const timeline = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete,
  });

  gsap.set(root, {
    autoAlpha: 1,
    pointerEvents: "auto",
  });

  gsap.set(root.querySelectorAll(".intro-word, .intro-caption, .intro-line"), {
    opacity: 0,
    y: 16,
  });

  gsap.set(root.querySelector(".intro-line"), {
    scaleX: 0.7,
    transformOrigin: "50% 50%",
  });

  gsap.set(root.querySelectorAll(".intro-glow"), {
    opacity: 0,
    scale: 0.9,
  });

  gsap.set(root.querySelector(".intro-content"), {
    opacity: 1,
    y: 0,
  });

  gsap.set(root.querySelector(".intro-backdrop"), {
    opacity: compact ? 0.82 : 0.72,
  });

  timeline
    .to(root.querySelector(".intro-backdrop"), {
      opacity: 1,
      duration: compact ? 0.22 : 0.3,
    }, 0)
    .to(root.querySelectorAll(".intro-glow"), {
      opacity: 1,
      scale: 1,
      duration: compact ? 0.42 : 0.72,
      stagger: 0.04,
    }, compact ? 0.02 : 0.06)
    .to(root.querySelector(".intro-word"), {
      opacity: 1,
      y: 0,
      duration: compact ? 0.42 : 0.72,
    }, compact ? 0.08 : 0.16)
    .to(root.querySelector(".intro-line"), {
      opacity: 1,
      y: 0,
      scaleX: 1,
      duration: compact ? 0.34 : 0.56,
    }, compact ? 0.12 : 0.24)
    .to(root.querySelector(".intro-caption"), {
      opacity: 1,
      y: 0,
      duration: compact ? 0.32 : 0.52,
    }, compact ? 0.18 : 0.34)
    .add(() => {
      onMidpoint?.();
    }, compact ? 0.36 : 0.52)
    .to({}, { duration: compact ? 0.16 : 0.44 })
    .to(root.querySelector(".intro-content"), {
      opacity: 0,
      y: -10,
      duration: compact ? 0.3 : 0.42,
      ease: "power2.inOut",
    })
    .to(root.querySelector(".intro-backdrop"), {
      opacity: 0,
      duration: compact ? 0.34 : 0.5,
      ease: "power2.inOut",
    }, "-=0.18")
    .to(root, {
      autoAlpha: 0,
      pointerEvents: "none",
      duration: compact ? 0.18 : 0.22,
    }, "-=0.06");

  return timeline;
}
