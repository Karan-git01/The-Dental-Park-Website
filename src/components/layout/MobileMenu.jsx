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
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
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
      document.body.style.overflow = previous;
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
      className="fixed inset-0 z-[100] flex animate-[fade-in_180ms_ease-out] flex-col bg-white"
    >
      <div className="flex h-[74px] items-center gap-3 bg-ink px-4">
        {showTreatments && (
          <button
            type="button"
            aria-label="Back"
            onClick={() => setShowTreatments(false)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/15 text-white transition-transform active:scale-90"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2} aria-hidden />
          </button>
        )}
        <Logo variant="dark" />
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/15 text-white transition-transform active:scale-90"
        >
          <X className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pb-6 pt-1">
        {showTreatments ? (
          <div className="animate-[slide-in-right_260ms_cubic-bezier(0.22,1,0.36,1)]">
            <div className="flex items-center gap-3 border-b border-black/10 py-4">
              <Smile className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
              <span className="text-[17px] font-semibold text-ink">Treatments</span>
            </div>
            <ul>
              {treatments.map((t, i) => (
                <li
                  key={t.slug}
                  className="animate-[fade-in_320ms_ease-out_both]"
                  style={{ animationDelay: `${i * 22}ms` }}
                >
                  <Link
                    to={`/treatments/${t.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-between border-b border-black/[0.07] py-[15px] text-left text-[15px] text-ink transition-colors active:text-brand"
                  >
                    {t.title}
                    <ChevronRight className="h-4 w-4 text-ink/50" strokeWidth={2} aria-hidden />
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
                className="animate-[fade-in_340ms_ease-out_both]"
                style={{ animationDelay: `${i * 28}ms` }}
              >
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => setShowTreatments(true)}
                    className="group flex w-full items-center gap-3.5 border-b border-black/[0.07] py-[17px] text-left"
                  >
                    <Icon className="h-[22px] w-[22px] text-brand" strokeWidth={1.6} aria-hidden />
                    <span className="text-[17px] font-medium text-ink">{label}</span>
                    <ChevronRight
                      className="ml-auto h-4 w-4 text-ink/50 transition-transform group-active:translate-x-1"
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
                      `flex w-full items-center gap-3.5 border-b border-black/[0.07] py-[17px] text-left transition-colors active:text-brand ${
                        isActive ? "text-brand" : "text-ink"
                      }`
                    }
                  >
                    <Icon className="h-[22px] w-[22px] text-brand" strokeWidth={1.6} aria-hidden />
                    <span className="text-[17px] font-medium">{label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 space-y-3">
          <a
            href={contactInfo.phoneHref}
            className="flex items-center gap-3.5 rounded-2xl bg-brand/10 px-4 py-3.5 transition-transform active:scale-[0.98]"
          >
            <Phone className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
            <span className="leading-tight">
              <span className="block text-[15px] font-semibold text-ink">Call Us Now</span>
              <span className="block text-[14px] text-ink/70">{contactInfo.phone}</span>
            </span>
            <ChevronRight className="ml-auto h-4 w-4 text-ink/50" strokeWidth={2} aria-hidden />
          </a>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3.5 rounded-2xl bg-brand px-4 py-3.5 transition-transform active:scale-[0.98]"
          >
            <CalendarDays className="h-5 w-5 text-white" strokeWidth={1.8} aria-hidden />
            <span className="leading-tight">
              <span className="block text-[15px] font-semibold text-white">Book Appointment</span>
              <span className="block text-[14px] text-white/85">Choose your convenient time</span>
            </span>
            <ChevronRight className="ml-auto h-4 w-4 text-white/80" strokeWidth={2} aria-hidden />
          </Link>
          <a
            href={contactInfo.whatsapp}
            className="flex items-center gap-3.5 rounded-2xl border border-black/10 px-4 py-3.5 transition-transform active:scale-[0.98]"
          >
            <MessageSquare className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
            <span className="leading-tight">
              <span className="block text-[15px] font-semibold text-ink">Chat on WhatsApp</span>
              <span className="block text-[14px] text-ink/70">We're online to help you</span>
            </span>
            <ChevronRight className="ml-auto h-4 w-4 text-ink/50" strokeWidth={2} aria-hidden />
          </a>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="grid h-11 w-11 place-items-center rounded-xl border border-black/10 text-ink transition-colors active:border-brand/50 active:text-brand"
      >
        <Menu className="h-5 w-5" strokeWidth={2} aria-hidden />
      </button>

      {open && typeof document !== "undefined" ? createPortal(panel, document.body) : null}
    </>
  );
}