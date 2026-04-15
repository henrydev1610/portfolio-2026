"use client";

import { ArrowUp, RefreshCcw } from "lucide-react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

function animateButton(button: HTMLButtonElement, active: boolean) {
  gsap.to(button, {
    scale: active ? 1.06 : 1,
    rotate: active ? 6 : 0,
    duration: 0.35,
    ease: "power3.out",
  });
}

export function FloatingActionButtons() {
  const topShellRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLButtonElement | null>(null);
  const bottomRef = useRef<HTMLButtonElement | null>(null);
  const refreshIconRef = useRef<SVGSVGElement | null>(null);
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    const topShell = topShellRef.current;
    const hero = document.querySelector<HTMLElement>(".hero-shell");

    if (!topShell || !hero) {
      return;
    }

    gsap.set(topShell, {
      autoAlpha: 0,
      y: 10,
      pointerEvents: "none",
    });

    const setVisibility = (visible: boolean) => {
      gsap.killTweensOf(topShell);
      gsap.to(topShell, {
        autoAlpha: visible ? 1 : 0,
        y: visible ? 0 : 10,
        duration: visible ? 0.26 : 0.22,
        ease: visible ? "power3.out" : "power2.out",
        pointerEvents: visible ? "auto" : "none",
        overwrite: true,
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibility(!entry.isIntersecting);
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(topShell);
    };
  }, []);

  const handleScrollToHero = () => {
    const hero = document.querySelector<HTMLElement>(".hero-shell");
    const top = hero ? window.scrollY + hero.getBoundingClientRect().top : 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const handleReload = () => {
    const button = bottomRef.current;
    const icon = refreshIconRef.current;

    if (!button || !icon || isRefreshingRef.current) {
      return;
    }

    isRefreshingRef.current = true;
    button.disabled = true;

    gsap.killTweensOf(button);
    gsap.killTweensOf(icon);

    gsap
      .timeline({
        defaults: {
          overwrite: true,
        },
        onComplete: () => {
          window.location.reload();
        },
      })
      .to(button, {
        scale: 0.96,
        duration: 0.11,
        ease: "power2.out",
      })
      .to(
        icon,
        {
          rotate: 540,
          duration: 0.58,
          ease: "power2.inOut",
          transformOrigin: "50% 50%",
        },
        0,
      )
      .to(
        button,
        {
          scale: 1,
          duration: 0.24,
          ease: "power3.out",
        },
        0.14,
      );
  };

  return (
    <div className="fixed bottom-[max(14px,env(safe-area-inset-bottom,0px))] right-[max(14px,env(safe-area-inset-right,0px))] z-30 flex flex-col gap-3 md:bottom-5 md:right-5">
      <div ref={topShellRef}>
        <button
          ref={topRef}
          type="button"
          aria-label="Voltar para a seção principal"
          className="glass-panel flex h-14 w-14 items-center justify-center rounded-[20px] text-white/90 transition-colors duration-300 hover:text-white sm:h-16 sm:w-16 sm:rounded-[24px] md:h-20 md:w-20 md:rounded-[28px]"
          onClick={handleScrollToHero}
          onMouseEnter={() => topRef.current && animateButton(topRef.current, true)}
          onMouseLeave={() => topRef.current && animateButton(topRef.current, false)}
        >
          <ArrowUp className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.5} />
        </button>
      </div>
      <button
        ref={bottomRef}
        type="button"
        aria-label="Recarregar a página"
        className="glass-panel flex h-14 w-14 items-center justify-center rounded-[20px] text-white/90 transition-colors duration-300 hover:text-white sm:h-16 sm:w-16 sm:rounded-[24px] md:h-20 md:w-20 md:rounded-[28px]"
        onClick={handleReload}
        onMouseEnter={() => {
          if (!isRefreshingRef.current && bottomRef.current) {
            animateButton(bottomRef.current, true);
          }
        }}
        onMouseLeave={() => {
          if (!isRefreshingRef.current && bottomRef.current) {
            animateButton(bottomRef.current, false);
          }
        }}
      >
        <RefreshCcw ref={refreshIconRef} className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.5} />
      </button>
    </div>
  );
}
