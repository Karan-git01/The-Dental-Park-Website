// src/hooks/useSmoothScroll.js
//
// Mounts the global Lenis smooth-scroll instance for the lifetime of the
// component that calls this hook. Per Section 35, call this ONCE from the
// top-level layout shell (App.jsx) — not from individual pages or
// sections, which would create/destroy the scroll instance on every
// route change and fight over a single global resource.

import { useEffect } from "react";
import { initSmoothScroll, destroySmoothScroll } from "../lib/smoothScroll";

export function useSmoothScroll(options) {
  useEffect(() => {
    initSmoothScroll(options);
    return () => {
      destroySmoothScroll();
    };
    // Intentionally empty dep array: Lenis is initialized once for the
    // app's lifetime, not re-created on every render/options change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}