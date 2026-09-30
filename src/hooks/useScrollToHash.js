import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEADER_OFFSET = 96;

// Handles /#anchor links only. Scroll-to-top on page change now happens in
// App.jsx (after the exit animation), so the old page never visibly jumps.
export function useScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");
    const scroll = () => {
      const el = document.getElementById(id);
      if (!el) return false;
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
      return true;
    };

    if (scroll()) return;

    // The new page may not be mounted yet (exit animation runs first), so
    // keep trying for ~1.5s.
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      if (scroll() || tries >= 15) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, [hash, pathname]);
}