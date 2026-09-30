// src/components/sections/FAQSection.jsx
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { faqs } from "../../data/faqs";
import { Reveal } from "../shared/Reveal";
import { cn } from "../../lib/utils";

const EASE = [0.16, 1, 0.3, 1]; // ease-out-expo — used across the accordion's open/close motion

export function FAQSection({ showHeading = true }) {
  const [open, setOpen] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="faq" className="bg-white py-16 lg:py-28" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-[1180px] px-5 lg:px-10">
        <div className={cn(showHeading && "lg:grid lg:grid-cols-[360px_1fr] lg:gap-16")}>
          {/* Left: sticky intro column. On the FAQ page the page header already shows this text,
              so only a screen-reader heading remains there and the list uses the full width. */}
          {showHeading ? (
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <h2
                id="faq-heading"
                className="font-display text-[28px] font-bold leading-[1.12] tracking-[-0.01em] text-ink sm:text-[40px] lg:text-[44px]"
              >
                Frequently asked questions
              </h2>
              <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.75] text-body">
                Everything you need to know about our services, appointments and treatments.
              </p>
              <div className="mt-8 hidden h-px w-16 bg-brand/30 lg:block" />
            </Reveal>
          ) : (
            <h2 id="faq-heading" className="sr-only">
              Frequently asked questions
            </h2>
          )}

          {/* Right: accordion list */}
          <div className={cn(showHeading ? "mt-12 lg:mt-0" : "mx-auto max-w-[820px]")}>
            {faqs.map((faq, i) => {
              const Icon = faq.icon;
              const isOpen = open === i;
              return (
                <Reveal
                  key={faq.question}
                  delay={i * 60}
                  className={cn("border-line border-b", i === 0 && "border-t")}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start gap-4 py-7 text-left"
                  >
                    <Icon
                      className={cn(
                        "mt-0.5 h-5 w-5 shrink-0 transition-colors duration-300",
                        isOpen ? "text-brand" : "text-brand/60 group-hover:text-brand",
                      )}
                      strokeWidth={1.6}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "min-w-0 flex-1 text-[17px] leading-snug transition-[color,font-weight] duration-300 sm:text-[19px]",
                        isOpen ? "font-semibold text-ink" : "font-medium text-ink/80 group-hover:text-ink",
                      )}
                    >
                      {faq.question}
                    </span>
                    <span className="relative mt-1.5 grid h-6 w-6 shrink-0 place-items-center text-brand">
                      <motion.span
                        className="absolute inset-0 grid place-items-center"
                        animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: EASE }}
                      >
                        <Plus className="h-6 w-6" strokeWidth={2} aria-hidden />
                      </motion.span>
                      <motion.span
                        className="absolute inset-0 grid place-items-center"
                        animate={{ rotate: isOpen ? 0 : -90, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: EASE }}
                      >
                        <Minus className="h-6 w-6" strokeWidth={2} aria-hidden />
                      </motion.span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={prefersReducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: prefersReducedMotion ? 0 : 0.45, ease: EASE },
                          opacity: { duration: prefersReducedMotion ? 0.15 : 0.35, ease: "easeOut" },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[62ch] pb-7 pl-9 text-[14.5px] leading-[1.75] text-body">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}