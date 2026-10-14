// src/components/hero/HeroCTA.jsx
import { CalendarDays, Phone } from "lucide-react";
import { CTAButton } from "../shared/CTAButton";
import { contactInfo } from "../../data/navigation";

/* Same language as the "View All Treatments" CTA: full pill, an ink panel that
   sweeps in from the left on hover (transform only, via ::before), and the
   icon seated in a small circular chip. */
/* Sizing knobs: edit these two lines to resize the icon chip (the green
   circle) and the icon inside it. First value is mobile, md: is desktop. */
const CHIP_SIZE = "h-14 w-14 md:h-14 md:w-14";
const ICON_SIZE = "h-[18px] w-[18px] md:h-5 md:w-5";

const ctaBase = [
  "group/cta relative isolate h-[44px] overflow-hidden whitespace-nowrap gap-2.5 pl-1.5 pr-5 text-[13px] font-semibold",
  "md:h-[52px] md:gap-3 md:pl-2 md:pr-8 md:text-[15px]",
  "rounded-full!",
  "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-ink",
  "before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)]",
  "hover:before:scale-x-100 focus-visible:before:scale-x-100 motion-reduce:before:transition-none",
  "transition-colors duration-300 motion-reduce:transition-none",
  "hover:text-white! focus-visible:text-white!",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
].join(" ");

const chipBase =
  `grid ${CHIP_SIZE} shrink-0 place-items-center rounded-full ring-1 transition-colors duration-300 motion-reduce:transition-none`;

export function HeroCTA() {
  return (
    <div className="flex w-full flex-col items-start gap-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
      <CTAButton
        as="a"
        href="#appointment"
        size="lg"
        className={ctaBase}
        icon={
          <span className={`${chipBase} bg-white/12 ring-white/25`}>
            <CalendarDays
              className={`${ICON_SIZE} transition-transform duration-300 group-hover/cta:translate-x-0 group-focus-visible/cta:translate-x-0 motion-reduce:transition-none motion-reduce:group-hover/cta:translate-x-0`}
              strokeWidth={1.8} aria-hidden />
          </span>
        }
      >
        Book Appointment
      </CTAButton>
      <CTAButton
        as="a"
        href={contactInfo.phoneHref}
        size="lg"
        variant="outline"
        className={`${ctaBase} border border-brand/30 text-ink`}
        icon={
          <span
            className={`${chipBase} bg-brand-light text-brand ring-brand/15 group-hover/cta:bg-white/12 group-hover/cta:text-white group-hover/cta:ring-white/25 group-focus-visible/cta:bg-white/12 group-focus-visible/cta:text-white group-focus-visible/cta:ring-white/25`}
          >
            <Phone
              className={`${ICON_SIZE} transition-transform duration-300 group-hover/cta:translate-x-0 group-focus-visible/cta:translate-x-0 motion-reduce:transition-none motion-reduce:group-hover/cta:translate-x-0`}
              strokeWidth={1.8} aria-hidden />
          </span>
        }
      >
        Call Now
      </CTAButton>
    </div>
  );
}