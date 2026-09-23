import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CalendarDays, ChevronDown, Phone, Search, X } from "lucide-react";
import { Logo } from "../shared/Logo";
import { MobileMenu } from "./MobileMenu";
import { TreatmentsMegaMenu } from "./TreatmentsMegaMenu";
import { contactInfo, navItems } from "../../data/navigation";
import { cn } from "../../lib/utils";

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef(null);
  const searchWrapRef = useRef(null);

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

  const submitSearch = (e) => {
    e.preventDefault();
    const q = searchValue.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setSearchValue("");
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