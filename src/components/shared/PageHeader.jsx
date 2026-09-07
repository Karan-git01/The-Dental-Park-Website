import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
export function PageHeader({ eyebrow, title, description, crumbs = [], image, imageAlt }) {
  const hasImage = Boolean(image);
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-line",
        hasImage ? "bg-brand" : "surface-gradient",
      )}
    >
      {hasImage && (
        <>
          <img
            src={image}
            alt={imageAlt ?? ""}
            width={1280}
            height={1024}
            loading="lazy"
            className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover object-center"
          />
          <span
            className="absolute inset-0 -z-10 bg-gradient-to-r from-brand via-brand/85 to-brand/40"
            aria-hidden
          />
        </>
      )}
      <div className="mx-auto max-w-[1280px] px-5 py-12 lg:px-10 lg:py-20">
        {crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={cn(
              "mb-5 flex flex-wrap items-center gap-1.5 text-[13px]",
              hasImage ? "text-white/80" : "text-body",
            )}
          >
            <Link to="/" className={hasImage ? "hover:text-gold" : "hover:text-brand"}>
              Home
            </Link>
            {crumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight
                  className={cn("h-3.5 w-3.5", hasImage ? "text-white/60" : "text-muted-ink")}
                  strokeWidth={2}
                  aria-hidden
                />
                {crumb.to ? (
                  <Link to={crumb.to} className={hasImage ? "hover:text-gold" : "hover:text-brand"}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={cn("font-medium", hasImage ? "text-white" : "text-ink")}>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em]",
            hasImage ? "bg-white/15 text-gold backdrop-blur-sm" : "bg-brand-light text-brand",
          )}
        >
          {eyebrow}
        </span>
        <h1
          className={cn(
            "mt-4 font-display text-[30px] font-bold leading-[1.15] sm:text-[42px] lg:text-[48px]",
            hasImage ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "mt-4 max-w-[680px] text-[15px] leading-[1.75] lg:text-[16px]",
            hasImage ? "text-white/85" : "text-body",
          )}
        >
          {description}
        </p>
      </div>
    </section>
  );
}