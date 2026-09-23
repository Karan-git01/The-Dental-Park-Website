// src/components/shared/WhatsAppFab.jsx
import { MessageCircle } from "lucide-react";
import { contactInfo } from "../../data/navigation";

/**
 * Floating WhatsApp action button.
 * Collapsed: a true 64px circle anchored bottom-right (fixed width, not
 * content-derived, and the icon is pinned by absolute position rather than
 * flex layout — its bounding box sits at an exact 18px/18px margin inside
 * the circle). On hover/focus it grows to a fixed wider size, revealing
 * the label before the icon.
 */
export function WhatsAppFab() {
  return (
    <a
      href={contactInfo.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 h-16 w-16 rounded-full bg-brand text-white shadow-[0_16px_34px_-14px_var(--brand)] outline-none transition-[width,box-shadow,background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:w-[226px] hover:bg-brand-hover hover:shadow-[0_24px_50px_-14px_var(--brand)] focus-visible:ring-4 focus-visible:ring-gold/40 md:bottom-7 md:right-7"
    >
      {/* Decorative ring lives on the outer box itself, so it's never
          clipped by the content-clipping layer below. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 transition-colors duration-500 group-hover:ring-gold/50"
      />

      {/* Clipping layer, purely for the sliding label — kept separate from
          the outer box so the outer box's own shadow is never cut off, and
          it does not participate in positioning the icon. */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute right-[54px] top-1/2 -translate-y-1/2 whitespace-nowrap text-[14.5px] font-semibold leading-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          Chat on WhatsApp
        </span>
      </span>

      {/* Icon: the wrapper box sits at an exact 18px/18px margin in the
          64px circle (mathematically centered). The MessageCircle glyph
          itself has a small tail cut into its path, which shifts its
          *visual* weight left of its own bounding box — a one-pixel nudge
          on the glyph corrects for that so it reads as centered, without
          touching the (already-correct) wrapper position. */}
      <span className="absolute right-[18px] top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center">
        <MessageCircle
          className="h-7 w-7 translate-x-[9px] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110"
          strokeWidth={1.8}
          aria-hidden
        />
      </span>
    </a>
  );
}