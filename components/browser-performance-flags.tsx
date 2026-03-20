"use client";

import { useEffect } from "react";

export function BrowserPerformanceFlags() {
  useEffect(() => {
    const root = document.documentElement;
    const userAgent = navigator.userAgent;
    const isBrave = typeof navigator !== "undefined" && "brave" in navigator;
    const isChrome =
      /Chrome|CriOS/.test(userAgent) &&
      !/Edg|OPR|Opera/.test(userAgent) &&
      !isBrave;

    if (isChrome) {
      root.dataset.browser = "chrome";
    } else {
      delete root.dataset.browser;
    }

    return () => {
      delete root.dataset.browser;
    };
  }, []);

  return null;
}
