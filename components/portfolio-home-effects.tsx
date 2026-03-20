"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioHomeEffects() {
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobileOrTablet = window.matchMedia("(max-width: 1023px)").matches;

      gsap.set(
        [
          ".hero-left",
          ".hero-right",
          ".hero-cta",
          ".hero-name",
          ".partner-item",
          ".statement-visual",
          ".statement-copy",
          ".statement-cta",
        ],
        { opacity: 0 },
      );

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".nav-float", {
          y: -26,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".hero-image",
          {
            scale: 0.92,
            opacity: 0,
            duration: 1.1,
          },
          "-=0.25",
        )
        .to(
          ".hero-left, .hero-right, .hero-cta",
          {
            opacity: 1,
            y: 0,
            duration: isMobileOrTablet ? 0.72 : 0.85,
            stagger: 0.12,
            from: "start",
          },
          "-=0.55",
        )
        .to(
          ".hero-name",
          {
            opacity: 1,
            y: 0,
            duration: isMobileOrTablet ? 0.82 : 1,
          },
          "-=0.45",
        )
        .to(
          ".partner-item",
          {
            opacity: 0.4,
            y: 0,
            stagger: 0.06,
            duration: 0.7,
          },
          "-=0.45",
        );

      if (!reduceMotion) {
        gsap.fromTo(
          ".hero-image",
          { yPercent: isMobileOrTablet ? -0.25 : -0.9 },
          {
            yPercent: isMobileOrTablet ? 0.9 : 2.4,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-shell",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          ".hero-name",
          { yPercent: 0 },
          {
            yPercent: isMobileOrTablet ? 0.8 : 2.8,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-shell",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      gsap.to(".statement-visual", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".statement-copy-wrap",
          start: "top 84%",
        },
      });

      gsap.to(".statement-title .line", {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".statement-title",
          start: "top 80%",
        },
      });

      gsap.to(".statement-copy, .statement-cta", {
        opacity: 1,
        y: 0,
        stagger: 0.14,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".statement-copy-wrap",
          start: "top 82%",
        },
      });

      if (!reduceMotion) {
        gsap.to(".statement-visual-card", {
          yPercent: isMobileOrTablet ? -0.35 : -0.9,
          duration: isMobileOrTablet ? 2.6 : 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.fromTo(
          ".statement-visual-shell",
          { yPercent: isMobileOrTablet ? -0.2 : -0.8 },
          {
            yPercent: isMobileOrTablet ? 0.55 : 1.4,
            ease: "none",
            scrollTrigger: {
              trigger: ".statement-copy-wrap",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    }, document.body);

    return () => context.revert();
  }, []);

  return null;
}
