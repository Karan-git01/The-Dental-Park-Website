import { useNavigate } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { helpOptions } from "../../data/help";
import { Reveal } from "../shared/Reveal";
import { cn } from "../../lib/utils";
import { helpToTreatment, prefillAppointment } from "../../lib/appointmentPrefill";

export function HelpSelector() {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  // Clicking a card prefills the treatment and takes the visitor to the form.
  const goToForm = (id) => {
    const form = typeof document !== "undefined" ? document.getElementById("appointment") : null;
    if (!form) {
      navigate("/contact");
      return;
    }
    prefillAppointment(helpToTreatment[id] ?? "");
    form.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <section id="help" className="bg-background py-16 lg:py-24" aria-labelledby="help-heading">
      <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
        <Reveal as="header" className="text-center">
          <h2
            id="help-heading"
            className="font-display text-[28px] font-bold leading-tight text-ink sm:text-[36px] lg:text-[42px]"
          >
            How can we help you today?
          </h2>
          <span className="mx-auto mt-3 block h-[3px] w-10 rounded-full bg-brand" />
          <p className="mx-auto mt-4 max-w-[640px] text-[15px] leading-relaxed text-body sm:text-[17px]">
            Choose the option that best describes your need and we&rsquo;ll take you straight to the booking form.
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-11 lg:grid-cols-4">
          {helpOptions.map(({ id, icon: Icon, title, description }, i) => (
            <Reveal key={id} delay={(i % 4) * 90} className="h-full">
              <button
                type="button"
                onClick={() => goToForm(id)}
                className={cn(
                  "group relative flex h-full w-full flex-col items-start rounded-2xl border border-line bg-white px-4 py-6 text-left transition-all duration-300 active:scale-[0.98] sm:px-5 sm:py-7",
                  "hover:-translate-y-1 hover:border-brand/30 hover:shadow-card",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <ArrowRight
                  className="absolute right-4 top-4 h-4 w-4 text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="grid h-16 w-16 place-items-center rounded-full bg-neutral-100 transition-colors duration-300 group-hover:bg-brand-light">
                  <Icon
                    className="h-8 w-8 text-brand transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
                <span className="font-display mt-5 block text-[15px] font-semibold leading-snug text-ink sm:text-[17px]">
                  {title}
                </span>
                <span className="mt-2 block text-[13px] leading-[1.45] text-body sm:text-[14px]">
                  {description}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}