import { Link } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { useState } from "react";
import { treatmentBySlug, treatmentHighlights } from "../../data/treatments";
import { treatmentImages } from "../../data/treatmentImages";
import { contactInfo } from "../../data/navigation";
import { PageHeader } from "../shared/PageHeader";
import { cn } from "../../lib/utils";

const quickPoints = [
  { icon: CheckCircle2, label: "Painless Procedure" },
  { icon: Timer, label: "Long Lasting Results" },
  { icon: ShieldCheck, label: "Precise & Safe" },
];

const whyChoose = [
  "Experienced Specialists",
  "Advanced Technology",
  "Strict Sterilization",
  "Transparent Pricing",
  "Patient Comfort",
  "Comprehensive Care",
];

const EASE = [0.16, 1, 0.3, 1];

const relatedList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const relatedItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function TreatmentDetail({ treatment }) {
  const [openFaq, setOpenFaq] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  // Image unmasks top-to-bottom while settling from a slight zoom. Reduced
  // motion gets no clip/scale at all.
  const relatedImage = prefersReducedMotion
    ? { hidden: {}, show: {} }
    : {
        hidden: { clipPath: "inset(0 0 100% 0)", scale: 1.14 },
        show: {
          clipPath: "inset(0 0 0% 0)",
          scale: 1,
          transition: { duration: 1.2, ease: EASE },
        },
      };
  const related = treatment.related
    .map(treatmentBySlug)
    .filter((t) => Boolean(t));

  return (
    <MotionConfig reducedMotion="user">
      <PageHeader
        eyebrow={treatment.category}
        title={treatment.title}
        description={treatment.tagline}
        crumbs={[{ label: "Treatments", to: "/treatments" }, { label: treatment.title }]}
        image={treatmentImages[treatment.slug]}
        imageAlt={treatment.title}
      />

      <section className="bg-background py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
            <div>
              {/* CTAs side by side on one line (wrap on very narrow screens). Primary is
                  solid brand, secondary is outlined. */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/contact"
                  className="group flex h-[52px] items-center gap-3 rounded-full bg-brand px-5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <CalendarDays className="h-[18px] w-[18px] shrink-0" strokeWidth={1.8} aria-hidden />
                  Book Appointment
                  <ArrowRight
                    className="ml-1 h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    strokeWidth={2}
                    aria-hidden
                  />
                </a>
                <a
                  href={contactInfo.phoneHref}
                  className="group flex h-[52px] items-center gap-3 rounded-full border border-ink/15 px-5 text-[15px] font-semibold text-ink transition-colors duration-300 hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <Phone className="h-[18px] w-[18px] shrink-0 text-brand" strokeWidth={1.8} aria-hidden />
                  Call Now
                  <ArrowRight
                    className="ml-1 h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    strokeWidth={2}
                    aria-hidden
                  />
                </a>
              </div>

              <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
                {quickPoints.map(({ icon: PointIcon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-[14px] text-body">
                    <PointIcon className="h-[18px] w-[18px] text-brand" strokeWidth={1.8} aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid gap-10 md:grid-cols-2 lg:mt-12 lg:gap-12">
                <div>
                  <h2 className="font-display text-[22px] font-bold text-ink">What is {treatment.title}?</h2>
                  <p className="mt-3 text-[14.5px] leading-[1.8] text-body">{treatment.summary}</p>
                  <h3 className="mt-7 font-display text-[20px] font-bold text-ink">Who needs it?</h3>
                  <p className="mt-3 text-[14.5px] leading-[1.8] text-body">{treatment.whoNeedsIt}</p>
                </div>

                <div>
                  <h2 className="font-display text-[22px] font-bold text-ink">Treatment Process</h2>
                  <ol className="mt-4 space-y-5 border-l border-line pl-6">
                    {treatment.process.map((step, i) => (
                      <li key={step.title} className="relative">
                        <span className="absolute -left-[24px] grid h-[22px] w-[22px] place-items-center rounded-full bg-brand text-[11px] font-semibold text-white">
                          {i + 1}
                        </span>
                        <p className="text-[15px] pl-2 font-semibold text-ink">{step.title}</p>
                        <p className="mt-2 pl-2 text-[13.5px] leading-[1.7] text-body">{step.description}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <figure className="sheen-hover overflow-hidden rounded-xl border border-line bg-brand-light">
                <img
                  src={treatmentImages[treatment.slug]}
                  alt={`${treatment.title} at The Dental Park`}
                  loading="lazy"
                  className="h-[200px] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </figure>


              <div className="rounded-xl border border-line bg-white p-6">
                <h2 className="font-display text-[20px] font-bold text-ink">Benefits</h2>
                <ul className="mt-4 space-y-3">
                  {treatment.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-[14px] text-body">
                      <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand" strokeWidth={1.8} aria-hidden />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why Choose: plain brand-green panel, no icons or dividers.
                  Rows have fixed whole-pixel heights and the dash is a solid
                  2px bar, so every dash renders identically. */}
              <div className="rounded-xl bg-brand px-7 pb-6 pt-8">
                <h2 className="font-display text-[20px] font-bold leading-[26px] text-white">
                  Why Choose The Dental Park?
                </h2>
                <ul className="mt-6">
                  {whyChoose.map((item) => (
                    <li
                      key={item}
                      className="group mt-2 flex h-10 items-center gap-4 text-[15px] leading-[24px] text-white/85 transition-colors duration-300 hover:text-white"
                    >
                      <span
                        aria-hidden
                        className="h-[2px] w-4 shrink-0 rounded-full bg-gold transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-7 motion-reduce:transition-none motion-reduce:group-hover:w-4"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:mt-16 lg:grid-cols-6">
            {treatmentHighlights.map(({ value, label, icon: HighlightIcon }) => (
              <li key={label} className="bg-white px-4 py-6 text-center">
                <HighlightIcon className="mx-auto h-6 w-6 text-brand" strokeWidth={1.6} aria-hidden />
                <p className="mt-3 text-[15px] font-semibold text-ink">{value}</p>
                <p className="whitespace-pre-line text-[12.5px] leading-[1.5] text-body">{label}</p>
              </li>
            ))}
          </ul>

          {/* FAQ: heading left, hairline accordion right */}
          <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-14">
            <h2 className="font-display text-[28px] font-bold leading-[1.15] text-ink lg:text-[34px]">
              Frequently Asked Questions
            </h2>
            <div className="border-b border-line">
              {treatment.faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={faq.question} className="border-t border-line">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className={cn(
                        "flex w-full items-center justify-between gap-6 py-5 text-left text-[16px] font-medium transition-colors duration-300 hover:text-brand",
                        isOpen ? "text-brand" : "text-ink",
                      )}
                    >
                      {faq.question}
                      <span aria-hidden className="relative h-4 w-4 shrink-0">
                        <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current" />
                        <span
                          className={cn(
                            "absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-300 motion-reduce:transition-none",
                            isOpen && "scale-y-0",
                          )}
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[60ch] pb-6 text-[15px] leading-[1.8] text-body">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Related treatments */}
      <section className="border-t border-line bg-white py-14 lg:py-20" aria-labelledby="related-heading">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <h2
            id="related-heading"
            className="font-display text-[28px] font-bold leading-[1.1] tracking-[-0.015em] text-ink sm:text-[36px] lg:text-[42px]"
          >
            Related Treatments
          </h2>

          <motion.ul
            variants={relatedList}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:[grid-template-columns:repeat(auto-fill,minmax(210px,250px))] sm:gap-x-6 lg:mt-10"
          >
            {related.map((item) => (
              <motion.li key={item.slug} variants={relatedItem}>
                <Link
                  to={`/treatments/${item.slug}`}
                  className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-lg bg-brand-light ring-1 ring-inset ring-ink/5">
                    <motion.span variants={relatedImage} className="absolute inset-0 block">
                      <img
                        src={treatmentImages[item.slug]}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    </motion.span>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
                    />
                  </span>

                  <span className="mt-3.5 block font-display text-[15px] font-semibold leading-snug text-ink sm:text-[17px]">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_1.5px] group-hover:text-brand motion-reduce:transition-none">
                      {item.title}
                    </span>
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </MotionConfig>
  );
}