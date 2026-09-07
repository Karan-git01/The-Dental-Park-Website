// src/components/sections/FAQSection.jsx
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { faqs } from "../../data/faqs";
import { Reveal } from "../shared/Reveal";
import { cn } from "../../lib/utils";

export function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-surface py-16 lg:py-24" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-[1180px] px-5 lg:px-10">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand">FAQ</span>
          <h2
            id="faq-heading"
            className="mt-3 font-display text-[28px] font-bold leading-[1.2] text-ink sm:text-[36px] lg:text-[42px]"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-[15px] leading-[1.75] text-body">
            Everything you need to know about our services, appointments and treatments.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {faqs.map((faq, i) => {
            const Icon = faq.icon;
            const isOpen = open === i;
            return (
              <Reveal
                key={faq.question}
                delay={(i % 2) * 90}
                className={cn(
                  "rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300",
                  isOpen ? "border-brand/40 shadow-card" : "border-line hover:border-brand/25",
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center gap-4 p-5 text-left"
                >
                  <span
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-light transition-transform duration-300",
                      isOpen ? "scale-105" : "group-hover:scale-105",
                    )}
                  >
                    <Icon className="h-5 w-5 text-brand" strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1 text-[15.5px] font-medium text-ink transition-colors group-hover:text-brand">
                    {faq.question}
                  </span>
                  <span className="relative grid h-8 w-8 shrink-0 place-items-center border-l border-line pl-3 text-brand">
                    <Plus
                      className={cn(
                        "absolute h-4 w-4 transition-all duration-300",
                        isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
                      )}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <Minus
                      className={cn(
                        "absolute h-4 w-4 transition-all duration-300",
                        isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
                      )}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-400 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pl-[76px] text-[14.5px] leading-[1.75] text-body">{faq.answer}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}