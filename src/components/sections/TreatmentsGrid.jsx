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
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-colors duration-300 hover:border-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Media */}
      <div className="overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={treatment.title}
            width={800}
            height={600}
            loading="lazy"
            className="h-[200px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:h-[220px]"
          />
        ) : (
          <span className="grid h-[200px] w-full place-items-center bg-brand-light sm:h-[220px]">
            <Icon className="h-10 w-10 text-brand" strokeWidth={1.2} aria-hidden />
          </span>
        )}
      </div>

      {/* Gold-centred hairline — this site's own established divider motif,
          not a generic gray border. */}
      <span aria-hidden className="hairline block" />

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <span className="text-[12.5px] text-muted-ink">{treatment.category}</span>
        <h3 className="font-display mt-1 text-[19px] font-semibold leading-[1.2] tracking-tight text-ink transition-colors duration-300 group-hover:text-brand">
          {treatment.title}
        </h3>
        <p className="mt-3 text-[13.5px] leading-[1.6] text-body">{treatment.tagline}</p>

        <span className="mt-4 inline-flex items-center gap-1.5 self-start text-[13px] font-medium text-ink">
          <span className="relative">
            Learn more
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 ease-out group-hover:w-full" />
          </span>
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
      <section id="treatments" className="bg-background py-16 lg:py-24" aria-labelledby="treatments-heading">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
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
    <section id="treatments" className="bg-background py-16 lg:py-24" aria-labelledby="treatments-heading">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[340px_minmax(0,1fr)]">
          <Reveal variant="left" className="lg:sticky lg:top-28 lg:pr-4">
            <h2
              id="treatments-heading"
              className="font-display text-[28px] font-bold leading-[1.15] text-ink sm:text-[34px] lg:text-[38px]"
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
              className="group/cta my-7 inline-flex h-[52px] items-center gap-2.5 rounded-xl bg-brand px-7 text-[15px] font-semibold text-white glow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View All Treatments
              <ArrowRight
                className="h-[18px] w-[18px] transition-transform duration-300 group-hover/cta:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </Link>
          </Reveal>

          <div className="min-w-0">
            <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
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