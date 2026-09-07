// src/components/shared/WhatsAppFab.jsx
import { MessageCircle } from "lucide-react";
import { contactInfo } from "../../data/navigation";

/**
 * Floating WhatsApp action button.
 * Collapsed: a round pill anchored bottom-right.
 * On hover/focus it grows towards the left, revealing the label before the icon.
 */
export function WhatsAppFab() {
  return (
    <a
      href={contactInfo.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-[36px] items-center overflow-hidden rounded-full bg-brand pl-[13px] pr-[13px] text-white shadow-[0_16px_34px_-14px_var(--brand)] outline-none transition-[padding,box-shadow,background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-brand-hover hover:pl-6 hover:shadow-[0_24px_50px_-14px_var(--brand)] focus-visible:ring-4 focus-visible:ring-gold/40 md:bottom-7 md:right-7"
    >
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 transition-colors duration-500 group-hover:ring-gold/50" />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-full bg-brand/30 opacity-0 transition-opacity duration-500 group-hover:animate-none group-hover:opacity-0 motion-safe:animate-[pulse_2.6s_cubic-bezier(0.4,0,0.6,1)_infinite] motion-safe:opacity-100"
      />
      <span className="relative grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
        <span className="overflow-hidden whitespace-nowrap">
          <span className="block pr-2.5 text-[14.5px] font-semibold leading-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            Chat on WhatsApp
          </span>
        </span>
      </span>
      <span className="relative grid h-8 w-8 shrink-0 place-items-center">
        <MessageCircle
          className="h-[22px] w-[22px] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110"
          strokeWidth={1.9}
          aria-hidden
        />
      </span>
    </a>
  );
}