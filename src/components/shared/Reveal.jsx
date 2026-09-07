// src/components/shared/Reveal.jsx
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

const variants = {
  up: "translate-y-4",
  down: "-translate-y-4",
  left: "translate-x-4",
  right: "-translate-x-4",
};

/**
 * Scroll-triggered fade + directional slide wrapper. Fires once the
 * element enters the viewport, then stays revealed.
 *
 * AUTHORED STAND-IN — not sourced from the original Lovable project.
 * Timing/easing/threshold are reasonable defaults; replace if the real
 * component becomes available.
 */
export function Reveal({ children, variant = "up", delay = 0, duration = 600, once = true, className }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn(
        "motion-safe:transition-all motion-safe:ease-out",
        visible ? "opacity-100 translate-x-0 translate-y-0" : `motion-safe:opacity-0 motion-safe:${variants[variant] ?? variants.up}`,
        className,
      )}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}