import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CalendarDays, ChevronDown, Phone, Search, X } from "lucide-react";
import { Logo } from "../shared/Logo";
import { MobileMenu } from "./MobileMenu";
import { TreatmentsMegaMenu } from "./TreatmentsMegaMenu";
import { contactInfo, navItems } from "../../data/navigation";
import { treatments } from "../../data/treatments";
import { cn } from "../../lib/utils";

/* ---------- Search suggestion helpers (added) ---------- */
const GENERIC_WORDS = new Set([
  "treatment",
  "treatments",
  "service",
  "services",
  "procedure",
  "procedures",
  "dental",
  "dentistry",
  "all",
]);
const stem = (w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w);
const tokenize = (q) =>
  q
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.replace(/[^a-z0-9]/g, ""))
    .filter(Boolean)
    .map(stem);

const searchIndex = treatments.map((t) => ({
  treatment: t,
  title: t.title.toLowerCase(),
  meta: `${t.tagline} ${t.category}`.toLowerCase(),
  body: `${t.summary} ${t.whoNeedsIt} ${t.benefits.join(" ")}`.toLowerCase(),
}));

function getSuggestions(query) {
  const tokens = tokenize(query);
  if (tokens.length === 0) return treatments;
  if (tokens.every((t) => GENERIC_WORDS.has(t))) return treatments;
  const specific = tokens.filter((t) => !GENERIC_WORDS.has(t));

  return searchIndex
    .map(({ treatment, title, meta, body }) => {
      let score = 0;
      for (const tok of specific) {
        if (title.startsWith(tok) || title.includes(` ${tok}`)) score += 20;
        else if (title.includes(tok)) score += 12;
        else if (meta.includes(tok)) score += 5;
        else if (body.includes(tok)) score += 1;
        else return null;
      }
      return { treatment, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.treatment);
}
/* ------------------------------------------------------- */

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1); // added
  const searchInputRef = useRef(null);
  const searchWrapRef = useRef(null);
  const suggestionsRef = useRef(null); // added

  const suggestions = useMemo(() => getSuggestions(searchValue), [searchValue]); // added

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    const onClickOutside = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [searchOpen]);

  // added: reset highlighted suggestion when typing
  useEffect(() => {
    setActiveIndex(-1);
  }, [searchValue]);

  // added: keep highlighted suggestion visible while using arrow keys
  useEffect(() => {
    if (activeIndex < 0) return;
    suggestionsRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  // added: go straight to a treatment page
  const goToTreatment = (t) => {
    navigate(`/treatments/${t.slug}`);
    setSearchOpen(false);
    setSearchValue("");
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const q = searchValue.trim();
    if (!q) return;
    // added: Enter opens the highlighted (or top) suggestion
    const pick = suggestions[activeIndex >= 0 ? activeIndex : 0];
    if (pick) {
      goToTreatment(pick);
      return;
    }
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setSearchValue("");
  };

  // added: arrow-key navigation inside the input
  const onInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (suggestions.length ? (i + 1) % suggestions.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        suggestions.length ? (i <= 0 ? suggestions.length - 1 : i - 1) : -1,
      );
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 px-0 transition-all duration-300 ease-out lg:px-5",
        scrolled ? "pt-0 lg:pt-2" : "pt-0 lg:pt-3",
      )}
    >
      <div
        aria-hidden
        className="scroll-progress absolute inset-x-0 top-0 z-[60] h-[3px] brand-gradient transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />

      <nav
        data-site-header
        aria-label="Main"
        onMouseLeave={() => setOpenMenu(null)}
        className={cn(
          "relative mx-auto flex max-w-[1560px] items-center gap-4 rounded-none bg-white/95 px-4 shadow-nav backdrop-blur-md transition-all duration-300 ease-out lg:rounded-2xl lg:px-6",
          scrolled ? "h-[58px] lg:h-[64px] shadow-float" : "h-[64px] lg:h-[70px]",
        )}
      >
        <Logo className="shrink-0" />

        <div className="ml-1 hidden h-8 w-px bg-black/10 xl:block" />

        <ul className="hidden flex-1 items-center justify-center gap-[16px] xl:flex 2xl:gap-[22px]">
          {navItems.map((item, index) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li
                key={item.label}
                className={cn(index >= 6 && "hidden 2xl:block")}
                onMouseEnter={() => setOpenMenu(item.hasDropdown ? item.label : null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "group relative inline-flex items-center gap-1 whitespace-nowrap py-2 text-[13.5px] transition-colors duration-200 2xl:text-[14px]",
                    isActive
                      ? "font-semibold text-ink"
                      : "text-ink/85 hover:text-brand",
                    item.hasDropdown && openMenu === item.label && "font-semibold text-brand",
                  )}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        openMenu === item.label && "rotate-180",
                      )}
                      strokeWidth={2}
                      aria-hidden
                    />
                  )}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-[2px] w-7 origin-left rounded-full bg-brand transition-all duration-300",
                      isActive || openMenu === item.label
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden shrink-0 items-center gap-2.5 xl:flex">
          <a
            href={contactInfo.phoneHref}
            className="hidden h-11 [@media(min-width:1760px)]:inline-flex items-center gap-2 rounded-full border border-black/10 px-4 text-[13.5px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50"
          >
            <Phone className="h-3.5 w-3.5 text-brand" strokeWidth={2} aria-hidden />
            {contactInfo.phone}
          </a>

          <a
            href="/contact"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-[13.5px] font-medium text-white shadow-[0_14px_28px_-12px_var(--brand)] glow-hover hover:-translate-y-0.5 hover:bg-brand-hover"
          >
            <CalendarDays
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6"
              strokeWidth={1.8}
              aria-hidden
            />
            Book Appointment
          </a>

          <div ref={searchWrapRef} className="relative flex items-center">
            <form
              onSubmit={submitSearch}
              className={cn(
                "flex items-center overflow-hidden rounded-full border border-black/10 bg-white transition-all duration-300 ease-out",
                searchOpen ? "w-56 pl-4 pr-1 opacity-100" : "w-11 px-0 opacity-100",
              )}
              style={{ height: "44px" }}
            >
              {searchOpen && (
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  autoComplete="off"
                  placeholder="Search treatments..."
                  className="h-full w-full bg-transparent text-[13.5px] text-ink outline-none placeholder:text-ink/40"
                />
              )}
              <button
                type={searchOpen ? "submit" : "button"}
                aria-label={searchOpen ? "Submit search" : "Open search"}
                onClick={() => {
                  if (!searchOpen) setSearchOpen(true);
                }}
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink transition-all duration-300",
                  !searchOpen && "hover:-translate-y-0.5 hover:text-brand",
                )}
              >
                <Search className="h-5 w-5" strokeWidth={2} aria-hidden />
              </button>
            </form>
            {searchOpen && (
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="ml-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink/50 transition-colors duration-200 hover:text-ink"
              >
                <X className="h-5 w-5" strokeWidth={2} aria-hidden />
              </button>
            )}

            {/* Suggestions dropdown (added) */}
            {searchOpen && (
              <div className="absolute right-0 top-full z-[70] mt-2 w-[22rem] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-float">
                {suggestions.length > 0 ? (
                  <ul
                    ref={suggestionsRef}
                    role="listbox"
                    data-lenis-prevent
                    className="max-h-[360px] overflow-y-auto overscroll-contain p-2"
                  >
                    {suggestions.map((t, i) => {
                      const Icon = t.icon;
                      return (
                        <li
                          key={t.slug}
                          data-index={i}
                          role="option"
                          aria-selected={i === activeIndex}
                        >
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => goToTreatment(t)}
                            onMouseEnter={() => setActiveIndex(i)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                              i === activeIndex ? "bg-brand/10" : "hover:bg-black/[0.03]",
                            )}
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                              <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-[14px] font-medium text-ink">
                                {t.title}
                              </span>
                              <span className="block truncate text-[12px] text-ink/55">
                                {t.category}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="px-4 py-5 text-center text-[13px] text-ink/60">
                    No treatments found for “{searchValue}”
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile-only cluster: phone icon button enlarged from h-11/w-11
            (44px) with a h-4/w-4 (16px) icon to a h-8/w-8 (32px) icon so it
            reads clearly at nav size, matching the MobileMenu trigger. */}
        <div className="ml-auto flex items-center gap-2 xl:hidden">
          <a
            href={contactInfo.phoneHref}
            aria-label={`Call ${contactInfo.phone}`}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-black/10 text-brand"
          >
            <Phone className="h-8 w-8" strokeWidth={2} aria-hidden />
          </a>
          <a
            href="/contact"
            className="hidden h-11 items-center gap-2 rounded-full bg-brand px-4 text-[13px] font-medium text-white shadow-[0_10px_22px_-10px_var(--brand)] sm:inline-flex"
          >
            <CalendarDays className="h-4 w-4" strokeWidth={1.8} aria-hidden />
            Book Appointment
          </a>
          <MobileMenu />
        </div>

        <div
          className={cn(
            "absolute left-0 right-0 top-full hidden pt-3 xl:block",
            openMenu === "Treatments"
              ? "pointer-events-auto opacity-100 translate-y-0"
              : "pointer-events-none opacity-0 -translate-y-2",
          )}
          style={{ transition: "opacity 240ms cubic-bezier(0.22,1,0.36,1), transform 240ms cubic-bezier(0.22,1,0.36,1)" }}
        >
          <TreatmentsMegaMenu />
        </div>
      </nav>
    </header>
  );
}