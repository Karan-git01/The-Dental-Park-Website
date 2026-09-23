// src/components/hero/Hero.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Heart } from "lucide-react";
import { heroSlides } from "../../data/heroSlides";
import { HeroCTA } from "./HeroCTA";
import { HeroTrustCards } from "./HeroTrustCards";
import { HeroFloatingCards } from "./HeroFloatingCards";
import { HeroStats } from "./HeroStats";
import { HeroMarquee } from "./HeroMarquee";
import { usePrefersReducedMotion } from "../../hooks/useReveal";
import { cn } from "../../lib/utils";

export function Hero() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [offset, setOffset] = useState(0);
  const slide = heroSlides[index];
  const touchX = useRef(null);
  const sectionRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  const go = useCallback((dir) => {
    setIndex((i) => (i + dir + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [go]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /** Gentle image parallax — transform only, throttled to animation frames. */
  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const node = sectionRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
        setOffset(progress * 42);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  // Static delay classes so Tailwind can see them at build time.
  const delays = ["delay-0", "delay-100", "delay-150", "delay-200", "delay-300", "delay-500"];
  const reveal = (step) =>
    cn(
      "motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out",
      delays[step] ?? "delay-0",
      mounted ? "opacity-100 translate-y-0" : "motion-safe:opacity-0 motion-safe:translate-y-4",
    );

  // Feather only the image's LEFT edge (where it meets the text column) with a
  // CSS mask, instead of relying on a perfectly-aligned hard crop. A soft fade
  // has no single pixel row where a 1px misalignment can show up as a seam —
  // and unlike restructuring the layout, this doesn't touch the image's width
  // or height at all, so its on-screen size stays exactly as it was.
  // Top/bottom/right edges are left fully solid.
  //
  // --img-shift-x: mobile-only rightward pan of the photo INSIDE its existing
  // overflow-hidden frame (the frame's own size/position never changes, so
  // there's no overflow or reflow risk). Set via Tailwind arbitrary-property
  // classes below and reset to 0 at md:, so tablet/desktop are untouched.
  const imageMaskStyle = {
    transform: `translate3d(var(--img-shift-x, 0px), ${offset * 0.35}px, 0) scale(1.02)`,
    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 14%, black 100%)",
    maskImage: "linear-gradient(to right, transparent 0%, black 14%, black 100%)",
  };

  const slideImages = (
    <div
      className="absolute inset-0 will-change-transform [--img-shift-x:40px] sm:[--img-shift-x:28px] md:[--img-shift-x:0px]"
      style={imageMaskStyle}
    >
      {heroSlides.map((s, i) => (
        <img
          key={s.id}
          src={s.image}
          alt={s.alt}
          width={1088}
          height={1440}
          loading={i === 0 ? "eager" : "lazy"}
          className={cn(
            "absolute inset-0 h-full w-full -scale-x-100 object-cover transition-opacity duration-700 ease-out",
            s.mobileObjectClass ?? "object-[48%_14%]",
            s.desktopObjectClass ?? "md:object-[50%_18%]",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  );

  const dots = (
    <div className="flex items-center gap-2">
      {heroSlides.map((s, i) => (
        <button
          key={s.id}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === index}
          onClick={() => setIndex(i)}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            i === index ? "w-7 bg-brand" : "w-1.5 bg-brand/25 hover:bg-brand/50",
          )}
        />
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} className="relative hero-gradient grain pb-0 md:pb-24 lg:pb-28" aria-label="Hero">
      <div className="relative mx-auto grid max-w-[1640px] grid-cols-1 items-center gap-0 px-0 pt-0 md:min-h-[640px] md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] md:px-8 md:pt-8 lg:min-h-[780px] lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-10 lg:px-10 lg:pt-10">
        {/* Image column — full-bleed right half on every breakpoint (original sizing, unchanged) */}
        <div className="absolute inset-y-0 right-0 w-[72%] sm:w-[64%] md:left-auto md:w-[58%] md:px-0 lg:w-[58%] xl:w-[60%]">
          <div
            className="relative h-full overflow-hidden md:rounded-none md:shadow-none"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            {slideImages}

            {/* Warm fade so the copy stays readable over the image */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-surface via-surface/85 to-transparent md:w-40 md:via-surface/70 lg:w-56" />

            {/* Emergency card */}
            <div className="absolute bottom-6 right-4 z-40 hidden items-center gap-2.5 rounded-2xl px-4 py-2.5 shadow-float glass-card md:flex lg:bottom-28 lg:right-6">
              <Clock className="h-5 w-5 text-brand" strokeWidth={1.5} aria-hidden />
              <span className="leading-tight">
                <span className="block text-[12px] font-semibold uppercase tracking-wide text-ink">
                  Emergency Dental Care
                </span>
                <span className="block text-[12px] text-gold">Available Today</span>
              </span>
            </div>

            {/* Arrows sit inside the image, beside the patient (md and up) */}
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-30 hidden h-[46px] w-[46px] -translate-y-1/2 place-items-center rounded-full bg-white/95 text-brand shadow-float backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-brand hover:text-white active:scale-95 md:grid lg:left-5 lg:h-[54px] lg:w-[54px]"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-30 hidden h-[46px] w-[46px] -translate-y-1/2 place-items-center rounded-full bg-white/95 text-brand shadow-float backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-brand hover:text-white active:scale-95 md:grid lg:right-5 lg:h-[54px] lg:w-[54px]"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden />
            </button>
          </div>

          {/* Floating cards — desktop only */}
          <HeroFloatingCards />
        </div>

        {/* Copy — overlays the image fade on mobile */}
        <div className="relative z-10 w-[64%] pt-14 md:pt-0 py-7 pl-5 pr-2 sm:w-[58%] md:w-auto md:px-0 md:py-10 md:pb-24 lg:pb-32 lg:pl-4 xl:pl-10">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-line bg-white/90 px-6 py-2 mb-4 md:mb-0 text-[9px] font-semibold uppercase tracking-[0.06em] text-brand shadow-card backdrop-blur-sm sm:text-[11px] md:gap-2 md:px-4 md:py-2",
              reveal(0),
            )}
          >
            <Heart className="h-4 w-4  fill-gold text-gold md:h-4.5 md:w-4.5" strokeWidth={1.5} aria-hidden />
            {slide.eyebrow}
          </span>

          <h1 className="mt-4 min-h-[104px] font-display text-brand sm:min-h-[136px] md:mt-6 md:min-h-[212px] lg:mt-8 lg:min-h-[300px]">
            <span
              className={cn(
                "block py-1 text-[15px] font-bold leading-[1.2] sm:text-[20px] md:text-[30px] lg:text-[40px]",
                reveal(1),
              )}
            >
              {slide.titleTop}
            </span>
            {slide.titleAccent.map((line, i) => (
              <span
                key={line}
                className={cn(
                  "block py-1 text-[26px] font-bold uppercase leading-[1] tracking-[-0.01em] sm:text-[36px] md:text-[54px] lg:text-[72px] lg:leading-[0.9] xl:text-[78px]",
                  i === slide.titleAccent.length - 1 ? "text-gold" : "text-brand",
                  reveal(2 + i),
                )}
              >
                {line}
              </span>
            ))}
          </h1>

          <span className="mt-6 block h-[2px] mb-6 w-14 rounded-full bg-gold" />

          <p
            className={cn(
              "mt-3 min-h-[84px] max-w-[440px] text-[13px] leading-[1.6] text-body sm:min-h-[72px] sm:text-[15px] md:mt-6 md:min-h-[84px] md:text-[17px] lg:mt-7 lg:min-h-[90px] lg:text-[18px]",
              reveal(4),
            )}
          >
            {slide.description}
          </p>

          <div className={cn("mt-3 md:mt-8", reveal(5))}>
            <HeroCTA />
          </div>

          {/* Slider dots — under the CTAs on mobile */}
          <div className="mt-5 flex md:hidden">{dots}</div>

          <HeroTrustCards />
        </div>

        {/* Desktop dots */}
        <div className="absolute bottom-6 left-10 z-20 hidden md:flex xl:left-14">{dots}</div>
      </div>

      <HeroStats />
      <HeroMarquee />
    </section>
  );
}