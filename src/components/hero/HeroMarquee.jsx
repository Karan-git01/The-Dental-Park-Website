// src/components/hero/HeroMarquee.jsx
import { useRef, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame, animate } from "motion/react";
import { cn } from "../../lib/utils";

const items = [
  "Advanced Digital Dentistry",
  "Painless Root Canal",
  "Same Day Appointments",
  "Invisible Aligners",
  "Dental Implants",
  "Kids Dentistry",
  "24x7 Dental Emergency",
  "Smile Makeover",
];

const SPEED = 42; // px/sec, constant idle drift
const LIGHT_RADIUS = 160; // px, size of the reveal
const FADE_WIDTH = 48; // px, edge fade — was too wide before, now a tight vignette

function Strip({ widthRef, x, className }) {
  return (
    <motion.div className={cn("flex w-max items-center whitespace-nowrap", className)} style={{ x }}>
      {[0, 1].map((dup) => (
        <div
          key={dup}
          ref={
            dup === 0
              ? (el) => {
                  if (el) widthRef.current = el.offsetWidth;
                }
              : undefined
          }
          className="flex items-center"
          aria-hidden={dup > 0}
        >
          {items.map((item) => (
            <span key={`${dup}-${item}`} className="flex items-center">
              <span className="px-6 font-display text-[13px] font-medium uppercase tracking-[0.1em] lg:px-9 lg:text-[14.5px]">
                {item}
              </span>
              <span aria-hidden className="h-[3px] w-[3px] shrink-0 rounded-full bg-gold/60" />
            </span>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

/**
 * Auto-scrolling strip. Text sits dim/uniform by default; a soft
 * cursor-tracked light reveals the bright/gold version as it passes
 * over — same weight and size throughout, no per-word emphasis.
 * Edge fade is a fixed-width vignette (FADE_WIDTH) rather than a wide
 * percentage-based fade, so it stays tight regardless of strip width.
 */
export function HeroMarquee() {
  const containerRef = useRef(null);
  const widthRef = useRef(0);
  const x = useMotionValue(0);
  const dragging = useRef(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useAnimationFrame((_, delta) => {
    if (dragging.current || reducedMotion.current) return;
    let next = x.get() - (SPEED * delta) / 1000;
    const w = widthRef.current;
    if (w && next <= -w) next += w;
    x.set(next);
  });

  const handlePointerMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    containerRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    containerRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handlePointerLeave = () => {
    containerRef.current.style.setProperty("--mx", "-9999px");
  };

  return (
    <div
      ref={containerRef}
      role="marquee"
      aria-label="Our services"
      className="relative mt-8 overflow-hidden bg-brand py-[18px] lg:mt-14 lg:py-5"
      style={{ "--mx": "-9999px", "--my": "50%" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* dim base layer */}
      <Strip widthRef={widthRef} x={x} className="text-white/35" />

      {/* bright overlay, revealed only inside the light radius */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center overflow-hidden text-gold"
        style={{
          maskImage: `radial-gradient(${LIGHT_RADIUS}px ${LIGHT_RADIUS}px at var(--mx) var(--my), black, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(${LIGHT_RADIUS}px ${LIGHT_RADIUS}px at var(--mx) var(--my), black, transparent 100%)`,
        }}
      >
        <Strip widthRef={{ current: 0 }} x={x} />
      </motion.div>

      {/* edge vignette — fixed px width, not a wide percentage fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 bg-gradient-to-r from-brand to-transparent"
        style={{ width: FADE_WIDTH }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 bg-gradient-to-l from-brand to-transparent"
        style={{ width: FADE_WIDTH }}
      />

      {/* drag layer, invisible, just to grab and fling the shared x value */}
      <motion.div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -Infinity, right: Infinity }}
        dragElastic={0.02}
        style={{ x: 0 }}
        onDragStart={() => (dragging.current = true)}
        onDrag={(_, info) => x.set(x.get() + info.delta.x)}
        onDragEnd={(_, info) => {
          dragging.current = false;
          animate(x, x.get(), {
            type: "inertia",
            velocity: info.velocity.x,
            power: 0.35,
            timeConstant: 260,
          });
        }}
      />
    </div>
  );
}