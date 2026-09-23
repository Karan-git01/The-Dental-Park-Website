// src/components/layout/MobileMenu.jsx
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  HelpCircle,
  Home,
  Image as ImageIcon,
  Menu,
  MessageSquare,
  Monitor,
  Phone,
  Smile,
  User,
  Users,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "../shared/Logo";
import { treatments } from "../../data/treatments";
import { contactInfo } from "../../data/navigation";

// Fallback if the real header can't be measured on mount (see effect below).
const HEADER_HEIGHT_FALLBACK = "4.5rem"; // 72px

const menuIcons = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Treatments", icon: Smile, to: "/treatments", hasChildren: true },
  { label: "About Us", icon: User, to: "/about" },
  { label: "Doctors", icon: Users, to: "/doctors" },
  { label: "Smile Gallery", icon: ImageIcon, to: "/gallery" },
  { label: "Technology", icon: Monitor, to: "/technology" },
  { label: "Testimonials", icon: MessageSquare, to: "/testimonials" },
  { label: "FAQs", icon: HelpCircle, to: "/faq" },
  { label: "Contact Us", icon: Phone, to: "/contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [showTreatments, setShowTreatments] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(HEADER_HEIGHT_FALLBACK);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  // Measure the real site header instead of hard-coding a value, so the
  // panel's top bar is always exactly the same height as the header it
  // covers. [data-site-header] is on Navbar's <nav> — that's the element
  // that actually carries the height classes (h-[58/64/70px] depending on
  // scroll state); the outer <header> wrapper does not, so it was measuring
  // the wrong box before. ResizeObserver also re-fires when the scrolled
  // class swaps the nav's height, so this stays in sync live, not just on
  // mount.
  useEffect(() => {
    const header =
      document.querySelector("[data-site-header]") || document.querySelector("header");
    if (!header) return;
    const update = () => setHeaderHeight(`${header.getBoundingClientRect().height}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  // Body-scroll lock. Plain `overflow: hidden` on the body is not reliable
  // on iOS Safari — the background can still rubber-band/scroll behind a
  // fixed overlay via touch. Pinning the body to `position: fixed` at its
  // current scroll offset (and restoring scrollTo on close) is what
  // actually prevents that on iOS, and `overscroll-behavior: contain` on
  // the panel itself stops scroll chaining from the menu list back up to
  // the page once the menu content is scrolled to its own edge.
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const { style } = document.body;
    const previous = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
      overflow: style.overflow,
    };

    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    panelRef.current?.querySelector("button, a")?.focus();
    window.addEventListener("keydown", onKey);
    return () => {
      style.position = previous.position;
      style.top = previous.top;
      style.left = previous.left;
      style.right = previous.right;
      style.width = previous.width;
      style.overflow = previous.overflow;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) setShowTreatments(false);
  }, [open]);

  const panel = (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[100] flex animate-[fade-in_160ms_ease-out] flex-col bg-white"
    >
      {/* Header bar: fixed to HEADER_HEIGHT so it lines up exactly with the
          real page header sitting underneath — no jump on open/close. */}
      <div
        className="flex shrink-0 items-center gap-3 bg-ink px-4"
        style={{
          height: headerHeight,
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        {showTreatments && (
          <button
            type="button"
            aria-label="Back to menu"
            onClick={() => setShowTreatments(false)}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/10 active:scale-90"
          >
            <ArrowLeft className="h-7 w-7" strokeWidth={1.75} aria-hidden />
          </button>
        )}
        {/* Logo's text switches to white via variant="light"; the tooth
            icon keeps its original colors (no filter/invert applied). */}
        <Logo variant="light" />
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="ml-auto grid h-12 w-12 shrink-0 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/10 active:scale-90"
        >
          <X className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        </button>
      </div>

      <nav
        aria-label="Mobile"
        className="flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-2"
        style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom, 0px))" }}
      >
        {showTreatments ? (
          <div className="animate-[slide-in-right_240ms_cubic-bezier(0.22,1,0.36,1)]">
            <div className="flex items-center gap-3 border-b border-ink/10 py-5">
              <Smile className="h-7 w-7 text-brand" strokeWidth={1.5} aria-hidden />
              <span className="text-[17px] font-medium tracking-tight text-ink">
                Treatments
              </span>
            </div>
            <ul>
              {treatments.map((t, i) => (
                <li
                  key={t.slug}
                  className="animate-[fade-in_280ms_ease-out_both]"
                  style={{ animationDelay: `${i * 18}ms` }}
                >
                  <Link
                    to={`/treatments/${t.slug}`}
                    onClick={() => setOpen(false)}
                    className="group flex w-full items-center justify-between border-b border-ink/[0.06] py-4 text-left text-[15px] text-ink/90 transition-colors active:text-brand"
                  >
                    {t.title}
                    <ChevronRight
                      className="h-8 w-8 shrink-0 text-ink/30 transition-transform group-active:translate-x-0.5"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul>
            {menuIcons.map(({ label, icon: Icon, to, hasChildren }, i) => (
              <li
                key={label}
                className="animate-[fade-in_300ms_ease-out_both]"
                style={{ animationDelay: `${i * 24}ms` }}
              >
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => setShowTreatments(true)}
                    className="group flex w-full items-center gap-4 border-b border-ink/[0.06] py-[18px] text-left"
                  >
                    <Icon className="h-7 w-7 shrink-0 text-brand" strokeWidth={1.5} aria-hidden />
                    <span className="text-[17px] font-medium tracking-tight text-ink">
                      {label}
                    </span>
                    <ChevronRight
                      className="ml-auto h-8 w-8 shrink-0 text-ink/30 transition-transform group-active:translate-x-0.5"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </button>
                ) : (
                  <NavLink
                    to={to}
                    end={to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex w-full items-center gap-4 border-b border-ink/[0.06] py-[18px] text-left transition-colors active:text-brand ${
                        isActive ? "text-brand" : "text-ink"
                      }`
                    }
                  >
                    <Icon className="h-7 w-7 shrink-0 text-brand" strokeWidth={1.5} aria-hidden />
                    <span className="text-[17px] font-medium tracking-tight">{label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 space-y-2.5">
          
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-8 rounded-xl bg-brand px-6 py-6 transition-transform active:scale-[0.98]"
          >
            <CalendarDays className="h-7 w-7 shrink-0 text-white" strokeWidth={1.5} aria-hidden />
            <span className="leading-tight">
              <span className="block text-[15px] font-medium text-white">Book an appointment</span>
              <span className="block text-[13.5px] text-white/80">Pick a time that works</span>
            </span>
            <ChevronRight className="ml-auto h-8 w-8 shrink-0 text-white/70" strokeWidth={2} aria-hidden />
          </Link>
          <a
            href={contactInfo.phoneHref}
            className="flex items-center gap-8 rounded-xl bg-brand/[0.08] px-6 py-6 transition-transform active:scale-[0.98]"
          >
            <Phone className="h-7 w-7 shrink-0 text-brand" strokeWidth={1.5} aria-hidden />
            <span className="leading-tight">
              <span className="block text-[15px] font-medium text-ink">Call us now</span>
              <span className="block text-[13.5px] text-ink/60">{contactInfo.phone}</span>
            </span>
            <ChevronRight className="ml-auto h-8 w-8 shrink-0 text-ink/30" strokeWidth={2} aria-hidden />
          </a>
          <a
            href={contactInfo.whatsapp}
            className="flex items-center gap-8 rounded-xl border border-ink/10 px-6 py-6 transition-transform active:scale-[0.98]"
          >
            <MessageSquare className="h-7 w-7 shrink-0 text-brand" strokeWidth={1.5} aria-hidden />
            <span className="leading-tight">
              <span className="block text-[15px] font-medium text-ink">Chat on WhatsApp</span>
              <span className="block text-[13.5px] text-ink/60">We're online to help</span>
            </span>
            <ChevronRight className="ml-auto h-8 w-8 shrink-0 text-ink/30" strokeWidth={2} aria-hidden />
          </a>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Closed-state trigger button — enlarged from h-12/w-12 (48px) to
          h-14/w-14 (56px) and the icon from h-7/w-7 to h-8/w-8 so it reads
          clearly at nav size. */}
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="grid h-14 w-14 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 active:scale-90"
      >
        <Menu className="h-8 w-8" strokeWidth={1.75} aria-hidden />
      </button>

      {open && typeof document !== "undefined" ? createPortal(panel, document.body) : null}
    </>
  );
}