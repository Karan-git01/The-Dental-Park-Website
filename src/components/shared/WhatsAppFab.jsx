// src/components/shared/WhatsAppFab.jsx
import { MessageCircle } from "lucide-react";
import { contactInfo } from "../../data/navigation";

/**
 * Floating WhatsApp action button — a fixed circle, bottom-right, with
 * the icon centered inside it.
 */
export function WhatsAppFab() {
  return (
    <a
      href={contactInfo.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 grid h-[50px] w-[50px] place-items-center rounded-full bg-brand text-white shadow-[0_16px_34px_-14px_var(--brand)] outline-none ring-1 ring-inset ring-white/20 transition-[box-shadow,background-color,transform,ring-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_24px_50px_-14px_var(--brand)] hover:ring-gold/50 focus-visible:ring-4 focus-visible:ring-gold/40 md:bottom-7 md:right-7"
    >
      <MessageCircle
        className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
        strokeWidth={1.8}
        aria-hidden
      />
    </a>
  );
}