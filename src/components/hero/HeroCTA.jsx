// src/components/hero/HeroCTA.jsx
import { CalendarDays, Phone } from "lucide-react";
import { CTAButton } from "../shared/CTAButton";
import { contactInfo } from "../../data/navigation";

export function HeroCTA() {
  return (
    <div className="flex w-full flex-col items-start gap-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
      <CTAButton
        as="a"
        href="#appointment"
        size="lg"
        className="h-[44px] whitespace-nowrap px-3.5 text-[13px] md:h-[56px] md:px-6 md:text-base"
        icon={<CalendarDays className="h-6 w-6 md:h-[18px] md:w-[18px]" strokeWidth={1.8} aria-hidden />}
      >
        Book Appointment
      </CTAButton>
      <CTAButton
        as="a"
        href={contactInfo.phoneHref}
        size="lg"
        variant="outline"
        className="h-[44px] whitespace-nowrap px-3.5 text-[13px] md:h-[56px] md:px-6 md:text-base"
        icon={<Phone className="h-6 w-6 text-brand md:h-[18px] md:w-[18px]" strokeWidth={1.8} aria-hidden />}
      >
        Call Now
      </CTAButton>
    </div>
  );
}