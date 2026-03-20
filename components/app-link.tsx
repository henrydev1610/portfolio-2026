"use client";

import Link, { type LinkProps } from "next/link";
import { forwardRef } from "react";
import type { AnchorHTMLAttributes } from "react";
import { usePathname } from "next/navigation";

import { useRouteTransition } from "@/components/route-transition-provider";

type AppLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

function splitHref(href: string) {
  const [pathPart, hashPart] = href.split("#");

  return {
    path: pathPart || "",
    hash: hashPart ? `#${hashPart}` : "",
  };
}

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(function AppLink(
  { href, onClick, children, ...props },
  ref,
) {
  const pathname = usePathname();
  const { navigate } = useRouteTransition();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank" ||
      !isInternalHref(href)
    ) {
      return;
    }

    const { path, hash } = splitHref(href);
    const targetPath = path || pathname;
    const isSamePath = targetPath === pathname;

    if (hash && isSamePath) {
      event.preventDefault();
      window.history.pushState(null, "", `${pathname}${hash}`);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const target = document.getElementById(hash.slice(1));
      target?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      return;
    }

    if (path && path !== pathname) {
      event.preventDefault();
      navigate(href);
    }
  };

  return (
    <Link ref={ref} href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
});
