import { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MoveHorizontal, Sparkles } from "lucide-react";
import { galleryCategories, smileCases } from "../../data/gallery";
import { Reveal } from "../shared/Reveal";
import { cn } from "../../lib/utils";

/** Draggable before/after comparison slider for one case. */
function BeforeAfter({ item }) {
  const [position, setPosition] = useState(50);
  const frameRef = useRef(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX) => {
    const node = frameRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative h-[240px] w-full select-none overflow-hidden sm:h-[260px]"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img
        src={item.after}
        alt={`${item.title} — after treatment`}
        width={1024}
        height={768}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <img
        src={item.before}
        alt={`${item.title} — before treatment`}
        width={1024}
        height={768}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-brand/85 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
        After
      </span>

      {/* Handle */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-[2px] bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.35)]"
        style={{ left: `${position}%` }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand shadow-float"
        style={{ left: `${position}%` }}
      >
        <MoveHorizontal className="h-4 w-4" strokeWidth={2} />
      </span>

      <label className="sr-only" htmlFor={`slider-${item.id}`}>
        Reveal before and after for {item.title}
      </label>
      <input
        id={`slider-${item.id}`}
        type="range"
        min={0}
        max={100}
        value={Math.round(position)}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute bottom-0 left-0 h-8 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

function CaseCard({ item }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line/80 bg-white shadow-card lift-hover ring-glow-hover">
      <BeforeAfter item={item} />
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand">
          <Sparkles className="h-3 w-3 text-gold" strokeWidth={2} aria-hidden />
          {item.category}
        </span>
        <h2 className="mt-3 font-display text-[19px] font-semibold leading-[1.25] text-ink">{item.title}</h2>
        <p className="mt-2 text-[13.5px] leading-[1.65] text-body">{item.summary}</p>

        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4 text-[12.5px]">
          <div>
            <dt className="text-muted-ink">Treatment</dt>
            <dd className="mt-0.5 font-medium text-ink">{item.treatment}</dd>
          </div>
          <div>
            <dt className="text-muted-ink">Timeline</dt>
            <dd className="mt-0.5 font-medium text-ink">{item.duration}</dd>
          </div>
        </dl>

        {item.slug ? (
          <Link
            to={`/treatments/${item.slug}`}
            className="mt-auto inline-flex items-center gap-2 pt-5 text-[13.5px] font-semibold text-brand transition-colors hover:text-gold"
          >
            View this treatment
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export function SmileGallery() {
  const [active, setActive] = useState("All Cases");

  const visible = useMemo(
    () => (active === "All Cases" ? smileCases : smileCases.filter((c) => c.category === active)),
    [active],
  );

  return (
    <section className="bg-surface py-16 lg:py-24" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
        <h2 id="gallery-heading" className="sr-only">
          Smile transformations
        </h2>

        <div className="flex flex-wrap items-center gap-2.5">
          {galleryCategories.map((category) => {
            const count =
              category === "All Cases"
                ? smileCases.length
                : smileCases.filter((c) => c.category === category).length;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={active === category}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all duration-300",
                  active === category
                    ? "border-transparent bg-brand text-white shadow-card"
                    : "border-line bg-white text-ink hover:border-brand/50 hover:text-brand",
                )}
              >
                {category}
                <span className={cn("text-[11px]", active === category ? "text-white/70" : "text-muted-ink")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-5 flex items-center gap-2 text-[13px] text-body">
          <MoveHorizontal className="h-4 w-4 text-brand" strokeWidth={1.8} aria-hidden />
          Drag the handle on any case to compare before and after.
        </p>

        <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <Reveal as="li" key={item.id} delay={(i % 3) * 90} className="h-full">
              <CaseCard item={item} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}