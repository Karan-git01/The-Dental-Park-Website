import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { treatments } from "../../data/treatments";
import { treatmentImages } from "../../data/treatmentImages";
import { Reveal } from "../shared/Reveal";


function TreatmentCard({ treatment }) {
  const Icon = treatment.icon;
  const image = treatmentImages[treatment.slug];

  return (
    <Link
      to={`/treatments/${treatment.slug}`}
      className="group flex h-full flex-col rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {/* Media: short, rectangular crop */}
      <div className="aspect-[16/10] overflow-hidden rounded-[4px] bg-brand-light">
        {image ? (
          <img
            src={image}
            alt={treatment.title}
            width={800}
            height={600}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <span className="grid h-full w-full place-items-center">
            <Icon className="h-9 w-9 text-brand" strokeWidth={1.2} aria-hidden />
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col pt-4">
        <span className="text-[12.5px] text-muted-ink">{treatment.category}</span>
        <h3 className="font-display mt-1 text-[19px] font-semibold leading-[1.2] tracking-tight text-ink transition-colors duration-300 group-hover:text-brand motion-reduce:transition-none">
          {treatment.title}
        </h3>
        <p className="mt-2 text-[13.5px] leading-[1.6] text-body">{treatment.tagline}</p>

        <span className="mt-auto inline-flex items-center gap-1.5 self-start pt-4 text-[13px] font-medium text-ink">
          <span className="relative">
            Learn more
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:transition-none" />
          </span>
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            strokeWidth={2}
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}


export function TreatmentsGrid({ compact = false }) {

  if (compact) {
    return (
      <section id="treatments" className="bg-background py-16 lg:pt-24" aria-labelledby="treatments-heading">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
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
    <section id="treatments" className="bg-background py-16 lg:pt-24 lg:pb-24" aria-labelledby="treatments-heading">
      <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
        <div className="grid gap-9 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* Header block: centred while stacked (mobile/tablet), left-aligned beside the grid on lg+ */}
          <Reveal variant="left" className="max-lg:text-center lg:sticky lg:top-28">
            <h2
              id="treatments-heading"
              className="font-display text-[28px] font-bold leading-tight tracking-[-0.015em] text-ink sm:text-[36px] lg:text-[42px]"
            >
              Advanced Dental Care
            </h2>
            <span aria-hidden className="mt-4 md:mt-5 flex items-center gap-2 max-lg:justify-center">
              <span className="block h-[3px] w-10 rounded-full bg-brand" />
              <span className="block h-[3px] w-[3px] rounded-full bg-gold" />
            </span>
            <p className="my-4 md:my-5 max-w-[40ch] md:max-w-[46ch] text-[15px] leading-relaxed text-body max-lg:mx-auto sm:text-[14px]">
              From preventive dentistry to complete smile transformations, explore our comprehensive range of
              treatments performed by experienced specialists using modern technology.
            </p>
            <Link
              to="/treatments"
              className="group/cta relative mt-4 md:mt-8 inline-flex h-[52px] items-center gap-3 overflow-hidden rounded-full bg-brand pl-7 pr-2 text-[15px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:scale-x-100 motion-reduce:transition-none"
              />
              <span className="relative">View All Treatments</span>
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white/12 ring-1 ring-white/25">
                <ArrowRight
                  className="h-[16px] w-[16px] transition-transform duration-300 group-hover/cta:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover/cta:translate-x-0"
                  strokeWidth={2}
                  aria-hidden
                />
              </span>
            </Link>
          </Reveal>

          <div className="min-w-0">
            <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
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