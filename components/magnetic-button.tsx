"use client";

import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

import { AppLink } from "@/components/app-link";

type MagneticButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "ghost";
  className?: string;
};

export function MagneticButton({
  href,
  label,
  variant = "primary",
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const moveXRef = useRef<((value: number) => gsap.core.Tween) | null>(null);
  const moveYRef = useRef<((value: number) => gsap.core.Tween) | null>(null);

  useLayoutEffect(() => {
    const button = ref.current;

    if (!button || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    moveXRef.current = gsap.quickTo(button, "x", {
      duration: 0.24,
      ease: "power3.out",
    });
    moveYRef.current = gsap.quickTo(button, "y", {
      duration: 0.24,
      ease: "power3.out",
    });

    return () => {
      moveXRef.current = null;
      moveYRef.current = null;
    };
  }, []);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const button = ref.current;
    if (!button || !moveXRef.current || !moveYRef.current) {
      return;
    }

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    moveXRef.current(x * 0.16);
    moveYRef.current(y * 0.16);
  };

  const handleLeave = () => {
    if (!ref.current) {
      return;
    }

    moveXRef.current?.(0);
    moveYRef.current?.(0);
  };

  const baseClasses =
    "inline-flex min-h-12 items-center gap-2 rounded-full px-5 py-3.5 text-[0.74rem] font-semibold tracking-[0.18em] uppercase transition-transform duration-300 sm:min-h-13";
  const variantClasses =
    variant === "primary"
      ? "bg-primary text-white shadow-[0_18px_40px_rgba(255,107,53,0.2)]"
      : "glass-panel text-white/92";

  return (
    <AppLink
      ref={ref}
      href={href}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
    </AppLink>
  );
}
