"use client";

import { forwardRef, useState } from "react";

import { HeaderAvailabilityBadge } from "@/components/header-availability-badge";
import { HeaderMenuButton } from "@/components/header-menu-button";
import { PremiumSideMenu } from "@/components/premium-side-menu";

export const SiteNavbar = forwardRef<HTMLElement>(function SiteNavbar(_, ref) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        ref={ref}
        className="nav-float mb-6 flex items-center justify-between px-1 pt-1 sm:mb-8 sm:px-0 sm:pt-0"
      >
        <HeaderAvailabilityBadge />
        <HeaderMenuButton
          open={open}
          onClick={() => setOpen((current) => !current)}
          label={open ? "Fechar menu lateral" : "Abrir menu lateral"}
        />
      </header>
      <PremiumSideMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
});
