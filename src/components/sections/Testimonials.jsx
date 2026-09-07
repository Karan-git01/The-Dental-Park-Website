import { MapPin, Quote, Star } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import { trustStrip } from "../../data/trust";
import { CountUp } from "../shared/CountUp";
import { Reveal } from "../shared/Reveal";

function TestimonialCard({ t }) {
  return (
    <article className="flex h-full w-[300px] shrink-0 flex-col rounded-[18px] border border-line bg-white p-6 lift-hover hover:border-brand/40 sm:w-[340px]">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-light">
        <Quote className="h-4 w-4 fill-brand" strokeWidth={0} aria-hidden />
      </span>
      <p className="mt-5 flex-1 text-[15px] leading-[1.6] text-body">{t.quote}</p>
      <span className="mt-5 flex gap-1" aria-label="5 out of 5 stars">
        {[0, 1, 2, 3, 4].map((s) => (
          <Star key={s} className="h-4 w-4 fill-brand text-brand" strokeWidth={0} aria-hidden />
        ))}
      </span>
      <div className="mt-5 flex items-center gap-3 border-t border-line pt-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-light text-[15px] font-semibold text-brand">
          {t.name.charAt(0)}
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-[15px] font-semibold text-ink">{t.name}</span>
          <span className="block truncate text-[13px] text-body">{t.role}</span>
          <span className="mt-0.5 flex items-center gap-1 text-[13px] text-body">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" strokeWidth={1.8} aria-hidden />
            {t.city}
          </span>
        </span>
      </div>
    </article>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-background py-16 lg:py-24" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal as="header" className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-2 text-[13px] font-medium text-brand">
            <Quote className="h-4 w-4 fill-brand" strokeWidth={0} aria-hidden />
            Trusted by Thousands
          </span>
          <h2 id="testimonials-heading" className="mt-5 font-display leading-tight">
            <span className="block text-[28px] font-bold text-ink sm:text-[38px] lg:text-[44px]">
              Loved by Our Patients,
            </span>
            <span className="mt-1 block text-[28px] font-bold text-brand sm:text-[38px] lg:text-[44px]">
              Proven by Their Smiles
            </span>
          </h2>
          <span className="mx-auto mt-4 block h-[3px] w-12 rounded-full bg-brand" />
          <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-[1.6] text-body sm:text-[16px]">
            Real stories from real patients who experienced exceptional dental care with us.
          </p>
        </Reveal>
      </div>

      {/* Infinite marquee of testimonials — pauses on hover/focus, fades at both ends */}
      <div className="mt-10 marquee-pause">
        <div className="overflow-hidden edge-fade-x">
          <div className="flex w-max gap-5 px-5 marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex gap-5" aria-hidden={dup === 1}>
                {testimonials.map((t) => (
                  <TestimonialCard key={`${dup}-${t.id}`} t={t} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 marquee-pause">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="overflow-hidden rounded-[22px] bg-brand-light/50 py-6 edge-fade-x">
            <div className="flex w-max items-center marquee-track">
              {[0, 1, 2].map((dup) => (
                <div key={dup} className="flex items-center" aria-hidden={dup > 0}>
                  {trustStrip.map(({ icon: Icon, value, label, star }) => (
                    <span key={`${dup}-${label}`} className="flex items-center">
                      <span className="flex min-w-[210px] flex-col items-center gap-2 px-6 text-center lg:min-w-[250px]">
                        <Icon className="h-8 w-8 text-brand" strokeWidth={1.4} aria-hidden />
                        {value && (
                          <span className="flex items-center gap-1 text-[20px] font-bold leading-none text-ink">
                            <CountUp value={value} />
                            {star && <Star className="h-4 w-4 fill-brand text-brand" strokeWidth={0} aria-hidden />}
                          </span>
                        )}
                        <span className="block whitespace-nowrap text-[14px] leading-[1.3] text-body">{label}</span>
                      </span>
                      <span className="h-10 w-px bg-gold/50" aria-hidden />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}