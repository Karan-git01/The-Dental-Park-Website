import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEADER_OFFSET = 96;

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

    if (!scroll()) {
      const t = setTimeout(scroll, 100);
      return () => clearTimeout(t);
    }
  }, [hash, pathname]);
}