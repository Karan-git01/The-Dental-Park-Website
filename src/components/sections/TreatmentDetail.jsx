import { Link } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Minus,
  Phone,
  Plus,
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

// Laptop and up (lg, 1024px+): the FAQ sits in a bordered white container, matching the other cards.
const laptopCard = "lg:rounded-xl lg:border lg:border-line lg:bg-white lg:p-6";

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
          {/* Top row: Book Appointment / Call Now only. CTAs side by side on one line (wrap on very
              narrow screens). Primary is solid brand, secondary is outlined. */}
          <div className="flex flex-wrap items-center gap-3 lg:pl-16">
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

          <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3 lg:pl-16">
            {quickPoints.map(({ icon: PointIcon, label }) => (
              <li key={label} className="flex items-center gap-2 text-[14px] text-body">
                <PointIcon className="h-[18px] w-[18px] text-brand" strokeWidth={1.8} aria-hidden />
                {label}
              </li>
            ))}
          </ul>

          {/* LAPTOP AND UP (lg, 1024px+): one row, two equal halves (50 / 50), both starting
              on the same top line. The left container is sticky: it stays in view while the
              taller right column scrolls past, and releases when the right column ends.
                LEFT  (one container): What is / Who needs it, then Treatment Process
                RIGHT (three containers, stacked): image, Benefits, Why Choose
              Below lg: unchanged (text in two columns, sidebar underneath). */}
          <div className="mt-10 grid gap-12 lg:mt-6 lg:grid-cols-2 lg:items-start lg:gap-10 lg:px-6 lg:py-8">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-1 lg:sticky lg:top-28 lg:gap-8 lg:rounded-xl lg:border lg:border-line lg:bg-white lg:p-10">
              <div>
                <h2 className="font-display text-[22px] font-bold text-ink">What is {treatment.title}?</h2>
                <p className="mt-3 text-[14.5px] leading-[1.8] text-body">{treatment.summary}</p>
                <h3 className="mt-7 font-display text-[20px] font-bold text-ink">Who needs it?</h3>
                <p className="mt-3 text-[14.5px] leading-[1.8] text-body">{treatment.whoNeedsIt}</p>
              </div>

              <div className="lg:border-t lg:border-line lg:pt-8">
                <h2 className="font-display text-[22px] font-bold text-ink">Treatment Process</h2>
                <ol className="relative mt-8 lg:mt-8 space-y-5 border-l border-transparent pl-6 before:absolute before:inset-y-0 before:left-[9px] before:w-px before:bg-line">
                  {treatment.process.map((step, i) => (
                    <li key={step.title} className="relative">
                      <span className="absolute -left-[14px] grid h-[22px] w-[22px] place-items-center rounded-full bg-brand text-[11px] font-semibold text-white">
                        {i + 1}
                      </span>
                      <p className="text-[15px] pl-8 font-semibold text-ink">{step.title}</p>
                      <p className="mt-2 pl-8 text-[13.5px] leading-[1.7] text-body">{step.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="space-y-6 lg:space-y-6">
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

              {/* Image sits in the middle of the three containers (Benefits, image, Why Choose). */}
              <figure className="sheen-hover overflow-hidden rounded-xl border border-line bg-brand-light">
                <img
                  src={treatmentImages[treatment.slug]}
                  alt={`${treatment.title} at The Dental Park`}
                  loading="lazy"
                  className="h-[200px] w-full object-cover transition-transform duration-700 hover:scale-[1.04] lg:h-[260px]"
                />
              </figure>

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

          <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:mt-20 lg:grid-cols-6">
            {treatmentHighlights.map(({ value, label, icon: HighlightIcon }) => (
              <li key={label} className="bg-white px-4 py-6 text-center">
                <HighlightIcon className="mx-auto h-6 w-6 text-brand" strokeWidth={1.6} aria-hidden />
                <p className="mt-3 text-[15px] font-semibold text-ink">{value}</p>
                <p className="whitespace-pre-line text-[12.5px] leading-[1.5] text-body">{label}</p>
              </li>
            ))}
          </ul>

          {/* FAQ: same design as the site's FAQSection. Left: sticky intro (heading, brand/gold accent,
              short line). Right: hairline accordion with a Plus/Minus toggle. */}
          <div
            className={cn(
              "mt-14 lg:mt-20 lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12 lg:p-8 xl:grid-cols-[360px_minmax(0,1fr)] xl:gap-16",
              laptopCard,
            )}
          >
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2
                id="treatment-faq-heading"
                className="font-display lg:pt-8 text-[28px] font-bold leading-[1.12] tracking-[-0.01em] text-ink max-lg:text-center sm:text-[40px] lg:text-[28px]"
              >
                Frequently Asked Questions
              </h2>
              <span aria-hidden className="mt-4 flex items-center gap-2 max-lg:justify-center md:mt-5">
                <span className="block h-[3px] w-10 rounded-full bg-brand" />
                <span className="block h-[3px] w-[3px] rounded-full bg-gold" />
              </span>
              <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.75] text-body max-lg:mx-auto max-lg:text-center">
                Everything you need to know about {treatment.title}.
              </p>
            </div>

            <div className="mt-12 lg:mt-0" role="list" aria-labelledby="treatment-faq-heading">
              {treatment.faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                const buttonId = `faq-button-${i}`;
                const panelId = `faq-panel-${i}`;
                return (
                  <div key={faq.question} role="listitem" className={cn("border-b border-line", i === 0 && "border-t")}>
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="group flex w-full items-start gap-4 py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                      >
                        <span
                          className={cn(
                            "min-w-0 flex-1 text-[17px] leading-snug transition-[color,font-weight] duration-300 sm:text-[19px]",
                            isOpen ? "font-semibold text-ink" : "font-medium text-ink/80 group-hover:text-ink",
                          )}
                        >
                          {faq.question}
                        </span>
                        <span aria-hidden className="relative mt-1.5 grid h-6 w-6 shrink-0 place-items-center text-brand">
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
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          animate={prefersReducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                          exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: prefersReducedMotion ? 0 : 0.45, ease: EASE },
                            opacity: { duration: prefersReducedMotion ? 0.15 : 0.35, ease: "easeOut" },
                          }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[62ch] pb-7 pr-10 text-[14.5px] leading-[1.75] text-body">{faq.answer}</p>
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
      <section className="border-t border-line bg-white py-14 lg:py-20 lg:px-6" aria-labelledby="related-heading">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <h2
            id="related-heading"
            className="font-display text-[28px] font-bold leading-[1.1] tracking-[-0.015em] text-ink sm:text-[36px] lg:text-[28px]"
          >
            Related Treatments
          </h2>
          <span aria-hidden className="mt-4 flex items-center gap-2 md:mt-5">
            <span className="block h-[3px] w-10 rounded-full bg-brand" />
            <span className="block h-[3px] w-[3px] rounded-full bg-gold" />
          </span>

          <motion.ul
            variants={relatedList}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:[grid-template-columns:repeat(auto-fill,minmax(210px,250px))] sm:gap-x-6 lg:mt-10"
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