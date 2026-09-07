// src/lib/smoothScroll.js
//
// Centralized Lenis smooth-scroll setup (Section 35).
//
// Rules this follows:
// - One global smooth-scroll instance (module-level singleton, not
//   re-created per component).
// - No duplicate initialization — calling initSmoothScroll() again while
//   an instance already exists just returns the existing one.
// - Clean lifecycle handling — destroySmoothScroll() tears down the RAF
//   loop and listeners.
// - Does not interfere with native accessibility behavior or break anchor
//   navigation — anchors: true lets in-page `#hash` links keep working,
//   scrolled smoothly instead of jumping.
// - Respects prefers-reduced-motion: Lenis v2 does this automatically
//   (respectReducedMotion defaults to true) — when the user has reduced
//   motion enabled, lerp is forced to 1 and scrolling tracks input 1:1,
//   so we don't need to duplicate that check here.

import Lenis from "lenis";

let lenisInstance = null;

/**
 * Returns the current Lenis instance, or null if it hasn't been
 * initialized (or has been destroyed). Use this from anywhere that needs
 * to read scroll state or call lenis.scrollTo(...) without re-initializing.
 */
export function getLenis() {
  return lenisInstance;
}

/**
 * Initializes the single global Lenis instance if one doesn't already
 * exist. Safe to call multiple times (e.g. from React StrictMode's
 * double-invoked effects) — subsequent calls are no-ops that return the
 * existing instance.
 */
export function initSmoothScroll(options = {}) {
  if (typeof window === "undefined") {
    // SSR / non-browser environment — nothing to attach to.
    return null;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Keep touch scrolling native — smoothing touch scroll tends to feel
    // laggy/unnatural on mobile unless heavily tuned.
    smoothTouch: false,
    // Let anchor links (`<a href="#section">`) keep working, scrolled
    // smoothly to the target instead of the browser's instant jump.
    anchors: true,
    // Lenis manages its own requestAnimationFrame loop internally, so we
    // don't need a separate manual raf() call/cleanup here.
    autoRaf: true,
    ...options,
  });

  return lenisInstance;
}

/**
 * Tears down the global Lenis instance and its RAF loop. Call this from
 * the cleanup of whatever effect called initSmoothScroll (see
 * useSmoothScroll.js) — not from every component that merely wants to
 * read scroll state.
 */
export function destroySmoothScroll() {
  if (!lenisInstance) {
    return;
  }
  lenisInstance.destroy();
  lenisInstance = null;
}