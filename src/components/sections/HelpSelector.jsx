import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { helpOptions } from "../../data/help";
import { Reveal } from "../shared/Reveal";
import { cn } from "../../lib/utils";
import { helpToTreatment, prefillAppointment } from "../../lib/appointmentPrefill";

export function HelpSelector() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

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
            Select one option that best describes your need, then click &lsquo;Continue&rsquo;
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-11 lg:grid-cols-4">
          {helpOptions.map(({ id, icon: Icon, title, description }, i) => {
            const active = selected === id;
            return (
              <Reveal key={id} delay={(i % 4) * 90} className="h-full">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(id)}
                  className={cn(
                    "card-premium group relative flex h-full w-full flex-col items-center overflow-hidden rounded-2xl border px-4 py-6 text-center transition-all duration-300 sm:px-5 sm:py-7",
                    active
                      ? "border-gold/60 shadow-float ring-1 ring-gold/40"
                      : "border-line hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-float",
                  )}
                >
                  {active && (
                    <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-brand">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                    </span>
                  )}
                  <span
                    className={cn(
                      "grid h-16 w-16 place-items-center rounded-full ring-1 ring-inset transition-all duration-300",
                      active
                        ? "brand-gradient ring-gold/40"
                        : "bg-brand-light/70 ring-brand/10 group-hover:bg-brand-light",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-8 w-8 transition-transform duration-300 group-hover:scale-110",
                        active ? "text-white" : "text-brand",
                      )}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </span>
                  <span className="mt-5 block text-[15px] font-semibold leading-snug text-ink sm:text-[17px]">
                    {title}
                  </span>
                  <span className="mt-2 block max-w-[190px] text-[13px] leading-[1.45] text-body sm:text-[14px]">
                    {description}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-9 flex flex-col items-center gap-3 lg:mt-10">
          <button
            type="button"
            disabled={!selected}
            onClick={() => {
              if (!selected) return;
              const treatment = helpToTreatment[selected] ?? "";
              if (typeof document !== "undefined" && !document.getElementById("appointment")) {
                navigate("/contact");
                return;
              }
              prefillAppointment(treatment);
            }}
            className={cn(
              "group/cta inline-flex h-[58px] items-center justify-center gap-3 rounded-xl px-12 text-[17px] font-semibold text-white transition-all duration-300",
              selected
                ? "brand-gradient glow-hover hover:brightness-110"
                : "cursor-not-allowed bg-brand/35",
            )}
          >
            Continue
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/cta:translate-x-1" strokeWidth={2} aria-hidden />
          </button>
          <p className="text-[13.5px] text-muted-ink" aria-live="polite">
            {selected ? "Great — continue to book your appointment." : "Select an option above to continue."}
          </p>
        </div>
      </div>
    </section>
  );
}