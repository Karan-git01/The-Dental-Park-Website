import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";
import { useState } from "react";
import { treatmentBySlug, treatmentHighlights } from "../../data/treatments";
import { treatmentImages } from "../../data/treatmentImages";
import { contactInfo } from "../../data/navigation";
import { PageHeader } from "../shared/PageHeader";
import { CTAButton } from "../shared/CTAButton";
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

export function TreatmentDetail({ treatment }) {
  const [openFaq, setOpenFaq] = useState(0);
  const related = treatment.related
    .map(treatmentBySlug)
    .filter((t) => Boolean(t));

  return (
    <>
      <PageHeader
        eyebrow={treatment.category}
        title={treatment.title}
        description={treatment.tagline}
        crumbs={[{ label: "Treatments", to: "/treatments" }, { label: treatment.title }]}
        image={treatmentImages[treatment.slug]}
        imageAlt={treatment.title}
      />

      <section className="bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="flex flex-wrap gap-3">
                <CTAButton
                  as="a"
                  href="/contact"
                  icon={<CalendarDays className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden />}
                >
                  Book Appointment
                </CTAButton>
                <CTAButton
                  as="a"
                  href={contactInfo.phoneHref}
                  variant="outline"
                  icon={<Phone className="h-[18px] w-[18px] text-brand" strokeWidth={1.8} aria-hidden />}
                >
                  Call Now
                </CTAButton>
              </div>

              <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
                {quickPoints.map(({ icon: PointIcon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-[14px] text-body">
                    <PointIcon className="h-[18px] w-[18px] text-brand" strokeWidth={1.8} aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid gap-8 md:grid-cols-2">
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
                        <span className="absolute -left-[31px] grid h-[22px] w-[22px] place-items-center rounded-full bg-brand text-[11px] font-semibold text-white">
                          {i + 1}
                        </span>
                        <p className="text-[15px] font-semibold text-ink">{step.title}</p>
                        <p className="mt-1 text-[13.5px] leading-[1.7] text-body">{step.description}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <aside className="space-y-5">
              <figure className="sheen-hover overflow-hidden rounded-3xl border border-line bg-brand-light">
                <img
                  src={treatmentImages[treatment.slug]}
                  alt={`${treatment.title} at The Dental Park`}
                  loading="lazy"
                  className="h-[260px] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </figure>


              <div className="rounded-3xl border border-line bg-white p-6">
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

              <div className="rounded-3xl border border-line bg-white p-6">
                <h2 className="font-display text-[20px] font-bold text-ink">Why Choose The Dental Park?</h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {whyChoose.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[14px] text-body">
                      <Sparkles className="h-[18px] w-[18px] shrink-0 text-brand" strokeWidth={1.7} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
            {treatmentHighlights.map(({ value, label, icon: HighlightIcon }) => (
              <li key={label} className="bg-white px-4 py-6 text-center">
                <HighlightIcon className="mx-auto h-6 w-6 text-brand" strokeWidth={1.6} aria-hidden />
                <p className="mt-3 text-[15px] font-semibold text-ink">{value}</p>
                <p className="whitespace-pre-line text-[12.5px] leading-[1.5] text-body">{label}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-[22px] font-bold text-ink">Frequently Asked Questions</h2>
              <div className="mt-4 space-y-3">
                {treatment.faqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={faq.question}
                      className={cn(
                        "rounded-xl border bg-white",
                        isOpen ? "border-brand/40" : "border-line",
                      )}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-[14.5px] font-medium text-ink"
                      >
                        {faq.question}
                        <span className="text-brand">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <p className="px-4 pb-4 text-[14px] leading-[1.7] text-body">{faq.answer}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="font-display text-[22px] font-bold text-ink">Related Treatments</h2>
              <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/treatments/${item.slug}`}
                      className="card-premium group block overflow-hidden rounded-2xl border border-line p-3 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-float"
                    >
                      <span className="block overflow-hidden rounded-xl">
                        <img
                          src={treatmentImages[item.slug]}
                          alt={item.title}
                          loading="lazy"
                          className="h-[86px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </span>
                      <span className="mt-3 flex items-center justify-between gap-2 text-[13.5px] font-medium text-ink">
                        {item.title}
                        <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
                      </span>
                    </Link>
                  </li>
                ))}

              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}