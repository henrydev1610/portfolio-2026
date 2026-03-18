"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import { FloatingActionButtons } from "@/components/floating-action-buttons";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { NoiseOverlay } from "@/components/noise-overlay";
import { PageIntro } from "@/components/page-intro";
import { ProjectCards } from "@/components/project-cards";
import { ServicesSection } from "@/components/services-section";
import { SiteNavbar } from "@/components/site-navbar";
import { StatementSection } from "@/components/statement-section";
import { StickyFloatingMenu } from "@/components/sticky-floating-menu";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TechStackCarousel } from "@/components/tech-stack-carousel";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioHome() {
  const root = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLElement | null>(null);

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
          { yPercent: isMobileOrTablet ? -0.6 : -1.5 },
          {
            yPercent: isMobileOrTablet ? 1.8 : 4.5,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-shell",
              start: "top top",
              end: "bottom top",
              scrub: 0.18,
            },
          },
        );

        gsap.fromTo(
          ".hero-name",
          { yPercent: 0 },
          {
            yPercent: isMobileOrTablet ? 1.6 : 5,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-shell",
              start: "top top",
              end: "bottom top",
              scrub: 0.14,
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
          yPercent: isMobileOrTablet ? -0.6 : -1.5,
          duration: isMobileOrTablet ? 3.2 : 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (!reduceMotion) {
        gsap.fromTo(
          ".statement-visual-shell",
          { yPercent: isMobileOrTablet ? -0.4 : -1.5 },
          {
            yPercent: isMobileOrTablet ? 1.1 : 2.5,
            ease: "none",
            scrollTrigger: {
              trigger: ".statement-copy-wrap",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.16,
            },
          },
        );
      }
    }, root);

    return () => context.revert();
  }, []);

  return (
    <main id="top" ref={root} className="page-shell">
      <PageIntro />
      <NoiseOverlay />
      <FloatingActionButtons />
      <StickyFloatingMenu targetRef={navbarRef} />

      <div className="app-shell-mobile mx-auto min-h-screen max-w-[1600px] px-3 py-3 sm:px-5 sm:py-5 lg:px-6">
        <div className="relative rounded-[38px] border border-white/8 bg-[#111111] px-3.5 pb-8 pt-3.5 shadow-[0_32px_100px_rgba(0,0,0,0.28)] sm:px-6 sm:pb-10 sm:pt-6 lg:rounded-[34px] lg:border-white/6 lg:px-10 lg:pb-14">
          <SiteNavbar ref={navbarRef} />
          <HeroSection />
          <StatementSection />
          <TechStackCarousel />
          <ServicesSection />
          <TestimonialsSection />
          <ProjectCards />
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
