import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { treatments } from "../../data/treatments";
import { treatmentImages } from "../../data/treatmentImages";
import { Reveal } from "../shared/Reveal";


function TreatmentCard({ treatment }) {
  const Icon = treatment.icon;
  const image = treatmentImages[treatment.slug];

  return (
    <Link
      to={`/treatments/${treatment.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line/80 bg-white shadow-card lift-hover ring-glow-hover"
    >
      {/* Media */}
      <div className="relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={treatment.title}
            width={800}
            height={600}
            loading="lazy"
            className="h-[196px] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.09] sm:h-[212px]"
          />
        ) : (
          <span className="grid h-[196px] w-full place-items-center bg-brand-light sm:h-[212px]">
            <Icon className="h-12 w-12 text-brand" strokeWidth={1.3} aria-hidden />
          </span>
        )}

        {/* Deep brand scrim for legibility + premium depth */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent opacity-90"
        />

        {/* Number chip */}
        <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/15 font-display text-[15px] font-semibold text-white ring-1 ring-white/40 backdrop-blur-md">
          {treatment.number}
        </span>

        {/* Category pill */}
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand backdrop-blur">
          <Sparkles className="h-3 w-3 text-gold" strokeWidth={2} aria-hidden />
          {treatment.category}
        </span>

        {/* Title over image */}
        <h3 className="absolute inset-x-4 bottom-4 font-display text-[19px] font-semibold leading-[1.25] text-white">
          {treatment.title}
        </h3>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-4">
        <span aria-hidden className="mb-3 block h-px w-full bg-gradient-to-r from-gold/70 via-line to-transparent" />
        <p className="text-[13.5px] leading-[1.65] text-body">{treatment.tagline}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="inline-flex items-center gap-2 text-[13px] font-medium text-brand">
            <Icon className="h-[18px] w-[18px] text-gold" strokeWidth={1.7} aria-hidden />
            Explore treatment
          </span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brand/25 text-brand transition-all duration-300 group-hover:border-transparent group-hover:bg-brand group-hover:text-white">
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
              aria-hidden
            />
          </span>
        </div>
      </div>

      {/* Gold hairline that draws in on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold via-brand to-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </Link>
  );
}


export function TreatmentsGrid({ compact = false }) {


  if (compact) {
    return (
      <section id="treatments" className="surface-gradient py-16 lg:py-24" aria-labelledby="treatments-heading">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {treatments.map((treatment, i) => (
              <Reveal as="li" key={treatment.slug} delay={(i % 4) * 90} className="h-full">
                <TreatmentCard treatment={treatment} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section id="treatments" className="surface-gradient py-16 lg:py-24" aria-labelledby="treatments-heading">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[340px_minmax(0,1fr)]">
          <Reveal variant="left" className="lg:sticky lg:top-28 lg:pr-4">
            <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-brand">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M12 5c-1.6-1.4-4.2-1.7-5.8-.2C4.4 6.5 4.6 9.4 5.4 12c.7 2.3 1 5.4 2 6.6.9 1.1 2 .3 2.3-1.2.3-1.4.5-2.9 2.3-2.9s2 1.5 2.3 2.9c.3 1.5 1.4 2.3 2.3 1.2 1-1.2 1.3-4.3 2-6.6.8-2.6 1-5.5-.8-7.2C16.2 3.3 13.6 3.6 12 5Z" />
              </svg>
              Our Treatments
            </span>
            <h2
              id="treatments-heading"
              className="mt-4 font-display text-[28px] font-bold leading-[1.15] text-ink sm:text-[34px] lg:text-[38px]"
            >
              Advanced Dental Care for Every Smile
            </h2>
            <span className="mt-4 block h-[3px] w-14 rounded-full bg-gold" />
            <p className="mt-4 text-[14.5px] leading-[1.7] text-body">
              From preventive dentistry to complete smile transformations, explore our comprehensive range of
              treatments performed by experienced specialists using modern technology.
            </p>
            <Link
              to="/treatments"
              className="mt-7 inline-flex h-[52px] items-center gap-3 rounded-xl bg-brand px-7 text-[15px] font-semibold text-white glow-hover"
            >
              View All Treatments
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </span>
            </Link>
          </Reveal>

          <div className="min-w-0">
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {treatments.map((treatment, i) => (
                <Reveal as="li" key={treatment.slug} delay={(i % 3) * 90} className="h-full">
                  <TreatmentCard treatment={treatment} />
                </Reveal>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}