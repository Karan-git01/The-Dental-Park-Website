import {
  Baby,
  HeartHandshake,
  Microscope,
  Siren,
  Sparkles,
  Stethoscope,
  ShieldCheck,
  Sofa,
} from "lucide-react";
const badges = [
  { icon: Stethoscope, label: "Experienced Doctors" },
  { icon: Microscope, label: "Modern Technology" },
  { icon: ShieldCheck, label: "Sterilized Equipment" },
  { icon: HeartHandshake, label: "Patient-Centric Care" },
  { icon: Siren, label: "Emergency Dental Care" },
  { icon: Sparkles, label: "Digital Dentistry" },
  { icon: Baby, label: "Personalized Treatment" },
  { icon: Sofa, label: "Comfortable Environment" },
];
/** Thin trust strip that scrolls infinitely and pauses on hover/focus.
 *  Falls back to a static, wrapped, single-copy row under
 *  prefers-reduced-motion instead of leaving the duplicated content
 *  visible with no animation to justify it. */
export function TrustBadgeMarquee() {
  return (
    <div className="border-y border-line bg-white py-3.5 marquee-pause" aria-label="Why patients choose us">
      <div className="overflow-hidden edge-fade-x motion-reduce:[mask-image:none]">
        <div className="flex w-max items-center whitespace-nowrap marquee-track motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-2 motion-reduce:whitespace-normal">
          {[0, 1].map((dup) => (
            <div
              key={dup}
              className="flex items-center motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-2 motion-reduce:last:hidden"
              aria-hidden={dup === 1}
            >
              {badges.map(({ icon: Icon, label }) => (
                <span key={`${dup}-${label}`} className="flex items-center">
                  <span className="flex items-center gap-2.5 px-5 text-[14px] font-medium text-ink lg:px-7">
                    <Icon className="h-[18px] w-[18px] shrink-0 text-brand" strokeWidth={1.6} aria-hidden />
                    {label}
                  </span>
                  <span className="h-3.5 w-px bg-gold/60 motion-reduce:last:hidden" aria-hidden />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}