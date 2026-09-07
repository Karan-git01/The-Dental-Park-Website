import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { Reveal } from "../components/shared/Reveal";
import { clinics } from "../data/clinics";

// clinic.hours can be a plain string, a single { day, time } object,
// or an array of { day, time } objects. Normalize to an array of
// display-ready strings so JSX never receives a raw object.
function getHoursLines(hours) {
  if (!hours) return [];
  if (typeof hours === "string") return [hours];
  if (Array.isArray(hours)) {
    return hours.map((h) =>
      typeof h === "string" ? h : `${h.day}: ${h.time}`
    );
  }
  if (typeof hours === "object") {
    return [`${hours.day}: ${hours.time}`];
  }
  return [String(hours)];
}

// schema.org Dentist.openingHours expects a string or array of strings
// like "Mo-Sa 10:00-20:00", not { day, time } objects.
function getOpeningHoursSchema(hours) {
  const lines = getHoursLines(hours);
  return lines.length === 1 ? lines[0] : lines;
}

export function Clinics() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Visit The Dental Park | Kolkata Dental Clinic</title>
        <meta
          name="description"
          content="Visit The Dental Park at Hazra Rd, Kalighat, Kolkata — address, timings, directions and same-day appointments."
        />
        <meta property="og:title" content="Visit The Dental Park" />
        <meta
          property="og:description"
          content="The Dental Park's Kolkata clinic — address, timings, directions and appointment booking."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/clinics" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/clinics" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            name: clinics[0]?.name,
            address: clinics[0]?.address,
            telephone: clinics[0]?.phone,
            openingHours: getOpeningHoursSchema(clinics[0]?.hours),
          })}
        </script>
      </Helmet>

      <PageHeader
        eyebrow="Visit Us"
        title="The Dental Park, Kolkata"
        description="Drop by for a consultation or call ahead and we'll keep a slot ready for you."
        crumbs={[{ label: "Clinics" }]}
      />

      <section className="bg-background py-14 lg:py-20" aria-labelledby="clinic-list-heading">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <h2 id="clinic-list-heading" className="sr-only">
            Clinic location
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clinics.map((clinic, i) => {
              const hoursLines = getHoursLines(clinic.hours);

              return (
                <Reveal key={clinic.id} delay={(i % 3) * 90} className="h-full">
                  <article className="card-premium flex h-full flex-col rounded-[22px] border border-line p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-float">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-brand">
                      <MapPin className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                      {clinic.city}
                    </span>
                    <h3 className="mt-4 font-display text-[20px] font-semibold leading-snug text-ink">{clinic.name}</h3>
                    <p className="mt-2 text-[14.5px] leading-[1.7] text-body">{clinic.address}</p>

                    <div className="mt-4 flex items-start gap-2 text-[14px] text-body">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={1.7} aria-hidden />
                      <div className="flex flex-col gap-0.5">
                        {hoursLines.map((line, idx) => (
                          <span key={idx}>{line}</span>
                        ))}
                      </div>
                    </div>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {clinic.services.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-line px-3 py-1 text-[12.5px] font-medium text-body"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2.5 border-t border-line pt-5">
                      <a
                        href={clinic.phoneHref}
                        className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand px-4 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-brand-hover"
                      >
                        <Phone className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                        Call
                      </a>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapQuery)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 items-center gap-2 rounded-xl border border-line px-4 text-[14px] font-semibold text-ink transition-all duration-300 hover:border-brand/45 hover:text-brand"
                      >
                        <Navigation className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                        Directions
                      </a>
                      <Link
                        to="/contact"
                        className="inline-flex h-11 items-center gap-2 rounded-xl px-4 text-[14px] font-semibold text-brand transition-all duration-300 hover:gap-3"
                      >
                        Book
                        <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 lg:py-20" aria-labelledby="clinic-map-heading">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <h2
            id="clinic-map-heading"
            className="font-display text-[26px] font-bold leading-tight text-ink sm:text-[34px]"
          >
            Find Us on the Map
          </h2>
          <span className="mt-3 block h-[3px] w-10 rounded-full bg-brand" />
          <div className="mt-7 overflow-hidden rounded-[22px] border border-line bg-white shadow-card">
            <iframe
              title="The Dental Park clinic location map"
              src="https://www.google.com/maps?q=113/1A+Hazra+Rd,+Kalighat,+Kolkata,+West+Bengal+700026&output=embed"
              className="h-[340px] w-full lg:h-[460px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}