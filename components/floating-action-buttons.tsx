"use client";

import { ArrowUpRight, RefreshCcw } from "lucide-react";
import { gsap } from "gsap";
import { useRef } from "react";

function animateButton(button: HTMLButtonElement, active: boolean) {
  gsap.to(button, {
    scale: active ? 1.06 : 1,
    rotate: active ? 6 : 0,
    duration: 0.35,
    ease: "power3.out",
  });
}

export function FloatingActionButtons() {
  const topRef = useRef<HTMLButtonElement | null>(null);
  const bottomRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="fixed bottom-[max(14px,env(safe-area-inset-bottom,0px))] right-[max(14px,env(safe-area-inset-right,0px))] z-30 flex flex-col gap-3 md:bottom-5 md:right-5">
      <button
        ref={topRef}
        type="button"
        aria-label="Abrir projeto selecionado"
        className="glass-panel flex h-14 w-14 items-center justify-center rounded-[20px] text-white/90 transition-colors duration-300 hover:text-white sm:h-16 sm:w-16 sm:rounded-[24px] md:h-20 md:w-20 md:rounded-[28px]"
        onMouseEnter={() => topRef.current && animateButton(topRef.current, true)}
        onMouseLeave={() => topRef.current && animateButton(topRef.current, false)}
      >
        <ArrowUpRight className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.5} />
      </button>
      <button
        ref={bottomRef}
        type="button"
        aria-label="Atualizar destaques do portfólio"
        className="glass-panel flex h-14 w-14 items-center justify-center rounded-[20px] text-white/90 transition-colors duration-300 hover:text-white sm:h-16 sm:w-16 sm:rounded-[24px] md:h-20 md:w-20 md:rounded-[28px]"
        onMouseEnter={() => bottomRef.current && animateButton(bottomRef.current, true)}
        onMouseLeave={() => bottomRef.current && animateButton(bottomRef.current, false)}
      >
        <RefreshCcw className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.5} />
      </button>
    </div>
  );
}
