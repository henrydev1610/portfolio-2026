"use client";

import { gsap } from "gsap";
import { useLayoutEffect, useRef, useState } from "react";

type CardController = {
  rotateX: (value: number) => gsap.core.Tween;
  rotateY: (value: number) => gsap.core.Tween;
  scale: (value: number) => gsap.core.Tween;
  imageX: (value: number) => gsap.core.Tween;
  imageY: (value: number) => gsap.core.Tween;
  contentY: (value: number) => gsap.core.Tween;
  glowX: (value: number) => gsap.core.Tween;
  glowY: (value: number) => gsap.core.Tween;
  glowOpacity: (value: number) => gsap.core.Tween;
};

export function useProjectCardMotion(count: number) {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const glowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const controllersRef = useRef<Array<CardController | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    for (let index = 0; index < count; index += 1) {
      const card = cardRefs.current[index];
      const image = imageRefs.current[index];
      const content = contentRefs.current[index];
      const glow = glowRefs.current[index];

      if (!card || !image || !content || !glow) {
        continue;
      }

      controllersRef.current[index] = {
        rotateX: gsap.quickTo(card, "rotateX", { duration: 0.45, ease: "power3.out" }),
        rotateY: gsap.quickTo(card, "rotateY", { duration: 0.45, ease: "power3.out" }),
        scale: gsap.quickTo(card, "scale", { duration: 0.45, ease: "power3.out" }),
        imageX: gsap.quickTo(image, "x", { duration: 0.55, ease: "power3.out" }),
        imageY: gsap.quickTo(image, "y", { duration: 0.55, ease: "power3.out" }),
        contentY: gsap.quickTo(content, "y", { duration: 0.45, ease: "power3.out" }),
        glowX: gsap.quickTo(glow, "x", { duration: 0.55, ease: "power3.out" }),
        glowY: gsap.quickTo(glow, "y", { duration: 0.55, ease: "power3.out" }),
        glowOpacity: gsap.quickTo(glow, "opacity", { duration: 0.35, ease: "power2.out" }),
      };
    }
  }, [count]);

  const resetCard = (index: number) => {
    const controller = controllersRef.current[index];
    if (!controller) {
      return;
    }

    controller.rotateX(0);
    controller.rotateY(0);
    controller.scale(1);
    controller.imageX(0);
    controller.imageY(0);
    controller.contentY(0);
    controller.glowX(0);
    controller.glowY(0);
    controller.glowOpacity(0);
  };

  const handlePointerEnter = (index: number) => {
    setActiveIndex(index);

    const controller = controllersRef.current[index];
    if (!controller) {
      return;
    }

    controller.scale(1.018);
    controller.contentY(-6);
    controller.glowOpacity(0.9);
  };

  const handlePointerMove = (index: number, event: React.PointerEvent<HTMLElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const card = cardRefs.current[index];
    const controller = controllersRef.current[index];
    if (!card || !controller) {
      return;
    }

    const bounds = card.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const deltaX = relativeX / bounds.width - 0.5;
    const deltaY = relativeY / bounds.height - 0.5;

    controller.rotateX(deltaY * -8);
    controller.rotateY(deltaX * 10);
    controller.imageX(deltaX * 22);
    controller.imageY(deltaY * 18);
    controller.glowX(deltaX * 34);
    controller.glowY(deltaY * 28);
  };

  const handlePointerLeave = (index: number) => {
    setActiveIndex((current) => (current === index ? null : current));
    resetCard(index);
  };

  return {
    activeIndex,
    setActiveIndex,
    cardRefs,
    imageRefs,
    contentRefs,
    glowRefs,
    handlePointerEnter,
    handlePointerMove,
    handlePointerLeave,
    resetCard,
  };
}
