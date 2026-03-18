"use client";

import { Menu, X } from "lucide-react";

type HeaderMenuButtonProps = {
  open?: boolean;
  onClick?: () => void;
  className?: string;
  label?: string;
};

export function HeaderMenuButton({
  open = false,
  onClick,
  className = "",
  label = "Abrir menu",
}: HeaderMenuButtonProps) {
  const Icon = open ? X : Menu;

  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={open}
      onClick={onClick}
      className={`glass-panel cursor-pointer flex h-12 w-12 items-center justify-center rounded-full text-white/86 transition-[transform,background,border-color,box-shadow,color] duration-300 hover:scale-[1.045] hover:border-white/14 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 sm:h-11 sm:w-11 ${className}`}
    >
      <Icon className="h-4.5 w-4.5 sm:h-4 sm:w-4" strokeWidth={1.7} />
    </button>
  );
}
