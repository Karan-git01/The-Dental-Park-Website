import { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
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
      className="relative aspect-[16/10] w-full touch-pan-y select-none overflow-hidden rounded-[14px] bg-surface focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* Zoom layer: images and handle scale together so the divider stays on the clip edge */}
      <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        <img
          src={item.after}
          alt={`${item.title} — after treatment`}
          width={1024}
          height={768}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={item.before}
          alt={`${item.title} — before treatment`}
          width={1024}
          height={768}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />

        {/* Handle */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-white"
          style={{ left: `${position}%` }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand shadow-[0_2px_12px_rgba(0,0,0,0.18)]"
          style={{ left: `${position}%` }}
        >
          <MoveHorizontal className="h-8 w-8" strokeWidth={1.75} />
        </span>
      </div>

      <span className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-ink/70 px-2.5 py-1 text-[12px] font-medium text-white">
        Before
      </span>
      <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-brand/85 px-2.5 py-1 text-[12px] font-medium text-white">
        After
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
        className="absolute bottom-0 left-0 h-10 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

function CaseCard({ item }) {
  return (
    <article className=" group flex flex-col">
      <BeforeAfter item={item} />

      <div className="mt-6 flex flex-col">
        <p className="text-[13.5px] font-medium text-brand">{item.category}</p>

        <h2 className="mt-2 font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink lg:text-[28px]">
          {item.title}
        </h2>
        <p className="mt-3 max-w-[56ch] text-[15px] leading-[1.7] text-body">{item.summary}</p>

        {/* Spec-sheet rows instead of a boxed grid */}
        <dl className="mt-6 border-t border-line/70 text-[13.5px]">
          <div className="flex items-baseline justify-between gap-6 border-b border-line/70 py-3">
            <dt className="text-muted-ink">Treatment</dt>
            <dd className="text-right font-medium text-ink">{item.treatment}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-6 border-b border-line/70 py-3">
            <dt className="text-muted-ink">Timeline</dt>
            <dd className="text-right font-medium text-ink">{item.duration}</dd>
          </div>
        </dl>

        {item.slug ? (
          <Link
            to={`/treatments/${item.slug}`}
            className="mt-5 inline-flex w-fit items-center gap-1.5 text-[14.5px] font-semibold text-brand underline decoration-current/30 decoration-1 underline-offset-[5px] transition-colors duration-300 hover:text-gold hover:decoration-current focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4"
          >
            View this treatment
            <ArrowUpRight
              className="h-6 w-6 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5  motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
              strokeWidth={2}
              aria-hidden
            />
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
    <section className="bg-white px-1 py-10 mb-6 lg:py-36" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <h2 id="gallery-heading" className="sr-only">
          Smile transformations
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-5 lg:grid-cols-12 lg:items-center">
          <div className="flex flex-wrap items-center gap-2 lg:col-span-8">
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
                    "inline-flex items-baseline gap-1.5 rounded-lg border px-4 py-2.5 text-[14px] font-medium transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                    active === category
                      ? "border-transparent bg-brand text-white"
                      : "border-line bg-white text-ink hover:border-brand/50 hover:text-brand",
                  )}
                >
                  {category}
                  <span className={cn("text-[12px]", active === category ? "text-white/70" : "text-muted-ink")}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="flex items-start gap-3.5 text-[14px] text-body lg:col-span-4 lg:justify-end">
            <MoveHorizontal className="h-8 w-8 mt-1 ml-1 shrink-0 text-brand" strokeWidth={1.75} aria-hidden />
            Drag the handle on any case to compare before and after.
          </p>
        </div>

        {/* Middle column drops down on desktop for an uneven, hand-set rhythm */}
        <ul className="mt-12 grid items-start gap-x-6 gap-y-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-24">
          {visible.map((item, i) => (
            <Reveal as="li" key={item.id} delay={(i % 3) * 90} className="lg:[&:nth-child(3n+2)]:mt-20">
              <CaseCard item={item} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}