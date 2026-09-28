import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { helpOptions } from "../../data/help";
import { Reveal } from "../shared/Reveal";
import { cn } from "../../lib/utils";
import { helpToTreatment, prefillAppointment } from "../../lib/appointmentPrefill";

export function HelpSelector() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

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
                    "group relative flex h-full w-full flex-col items-start rounded-2xl border bg-white px-4 py-6 text-left transition-all duration-300 active:scale-[0.98] sm:px-5 sm:py-7",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    active
                      ? "border-brand shadow-card"
                      : "border-line hover:-translate-y-1 hover:border-brand/30 hover:shadow-card",
                  )}
                >
                  {active && (
                    <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-brand">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                    </span>
                  )}
                  <span
                    className={cn(
                      "grid h-16 w-16 place-items-center rounded-full transition-colors duration-300",
                      active
                        ? "bg-brand"
                        : "bg-neutral-100 group-hover:bg-brand-light",
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
                  <span className="font-display mt-5 block text-[15px] font-semibold leading-snug text-ink sm:text-[17px]">
                    {title}
                  </span>
                  <span className="mt-2 block text-[13px] leading-[1.45] text-body sm:text-[14px]">
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
              "group/cta inline-flex h-[48px] items-center justify-center gap-3 rounded-xl px-10 text-[16px] font-semibold transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              selected
                ? "text-white brand-gradient glow-hover hover:brightness-110"
                : "cursor-not-allowed border border-line bg-transparent text-muted-ink",
            )}
          >
            Continue
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/cta:translate-x-1" strokeWidth={2} aria-hidden />
          </button>
          <p className="text-[13.5px] mt-2 text-muted-ink" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={selected ? "active" : "idle"}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {selected ? "Great — continue to book your appointment." : "Select an option above to continue."}
              </motion.span>
            </AnimatePresence>
          </p>
        </div>
      </div>
    </section>
  );
}