import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { Reveal } from "../components/shared/Reveal";
import { Seo } from "../components/seo/Seo";
import { dentistSchema, breadcrumbSchema } from "../lib/schema";
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

// Shared presentation
const circleClass = "grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand";
const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

export function Clinics() {
  return (
    <SiteLayout>
      <Seo path="/clinics" schema={[dentistSchema(), breadcrumbSchema("/clinics")]} />

      <PageHeader
        eyebrow="Visit Us"
        title="The Dental Park, Kolkata"
        description="Drop by for a consultation or call ahead and we'll keep a slot ready for you."
        crumbs={[{ label: "Clinics" }]}
      />

      <section className="bg-white pb-16 pt-16 lg:pb-20 lg:pt-24" aria-labelledby="clinic-list-heading">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <h2 id="clinic-list-heading" className="sr-only">
            Clinic location
          </h2>
          <div className="grid gap-6">
            {clinics.map((clinic, i) => {
              const hoursLines = getHoursLines(clinic.hours);

              return (
                <Reveal key={clinic.id} delay={(i % 3) * 90} className="h-full">
                  <article className="grid gap-10 rounded-[24px] border border-line bg-white p-7 lg:grid-cols-12 lg:gap-8 lg:p-12">
                    {/* Left: where */}
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3">
                        <span className={circleClass}>
                          <MapPin className="h-7 w-7 text-white" strokeWidth={1.8} aria-hidden />
                        </span>
                        <span className="text-[14px] font-semibold text-brand">{clinic.city}</span>
                      </div>
                      <h3 className="mt-8 font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink lg:text-[36px]">
                        {clinic.name}
                      </h3>
                      <p className="mt-4 max-w-[46ch] text-[15.5px] leading-[1.75] text-body">{clinic.address}</p>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <a
                          href={clinic.phoneHref}
                          className={`inline-flex h-11 items-center gap-2 rounded-xl bg-brand px-8 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-brand-hover ${focusClass}`}
                        >
                          <Phone className="h-6 w-6" strokeWidth={1.9} aria-hidden />
                          Call
                        </a>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapQuery)}`}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex h-11 items-center gap-2 rounded-xl border border-line px-5 text-[14px] font-semibold text-ink transition-colors duration-300 hover:border-brand/45 hover:text-brand ${focusClass}`}
                        >
                          <Navigation className="h-6 w-6" strokeWidth={1.9} aria-hidden />
                          Directions
                        </a>
                        <Link
                          to="/contact"
                          className={`group inline-flex h-11 items-center gap-2 rounded-xl px-8 text-[14px] font-semibold text-brand transition-[gap] duration-300 hover:gap-3 motion-reduce:transition-none ${focusClass}`}
                        >
                          Book
                          <ArrowRight className="h-6 w-6" strokeWidth={2} aria-hidden />
                        </Link>
                      </div>
                    </div>

                    {/* Right: when + what */}
                    <div className="flex flex-col gap-8 lg:col-span-5">
                      <div className="flex items-start gap-4">
                        <span className={circleClass}>
                          <Clock className="h-7 w-7 text-white" strokeWidth={1.8} aria-hidden />
                        </span>
                        <div className="flex flex-col gap-1 text-[15px] leading-[1.7] text-body">
                          {hoursLines.map((line, idx) => (
                            <span key={idx}>{line}</span>
                          ))}
                        </div>
                      </div>

                      <ul className="flex flex-wrap gap-2">
                        {clinic.services.map((s) => (
                          <li
                            key={s}
                            className="rounded-lg border border-line px-3 py-1.5 text-[13px] font-medium text-body"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 lg:pb-28" aria-labelledby="clinic-map-heading">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <h2
            id="clinic-map-heading"
            className="font-display text-[28px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[36px]"
          >
            Find Us on the Map
          </h2>
          <div className="mt-8 overflow-hidden rounded-[24px] border border-line bg-white">
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