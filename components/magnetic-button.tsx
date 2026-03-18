"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useRef } from "react";

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

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const button = ref.current;
    if (!button || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.16,
      y: y * 0.16,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    if (!ref.current) {
      return;
    }

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: "elastic.out(1, 0.45)",
    });
  };

  const baseClasses =
    "inline-flex min-h-12 items-center gap-2 rounded-full px-5 py-3.5 text-[0.74rem] font-semibold tracking-[0.18em] uppercase transition-transform duration-300 sm:min-h-13";
  const variantClasses =
    variant === "primary"
      ? "bg-primary text-white shadow-[0_18px_40px_rgba(255,107,53,0.2)]"
      : "glass-panel text-white/92";

  return (
    <Link
      ref={ref}
      href={href}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
    </Link>
  );
}
