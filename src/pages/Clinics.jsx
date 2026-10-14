import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Navigation, Phone, Stethoscope } from "lucide-react";
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

// "Mon–Fri: 10 AM–9 PM" -> { day: "Mon–Fri", time: "10 AM–9 PM" }. A line with no
// "Day: time" shape is kept whole as the day.
function splitHoursLine(line) {
  const i = line.indexOf(": ");
  if (i === -1) return { day: line, time: "" };
  return { day: line.slice(0, i), time: line.slice(i + 2) };
}

// Shared presentation
const circleClass = "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand";
const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

// Brand bar + gold dot, same accent used under the other section headings
function Accent({ className = "" }) {
  return (
    <span aria-hidden className={`flex items-center gap-2 ${className}`}>
      <span className="block h-[3px] w-10 rounded-full bg-brand" />
      <span className="block h-[3px] w-[3px] rounded-full bg-gold" />
    </span>
  );
}

export function Clinics() {
  const primary = clinics[0];

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
                  <article className="overflow-hidden rounded-[24px] border border-line bg-white transition-colors duration-300 hover:border-brand/30 motion-reduce:transition-none lg:grid lg:grid-cols-12">
                    {/* Left: where */}
                    <div className="p-7 lg:col-span-7 lg:p-12">
                      <div className="flex items-center gap-3">
                        <span className={circleClass}>
                          <MapPin className="h-6 w-6 text-white" strokeWidth={1.8} aria-hidden />
                        </span>
                        <span className="text-[14px] font-semibold uppercase tracking-[0.12em] text-brand">
                          {clinic.city}
                        </span>
                      </div>

                      <h3 className="mt-8 font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink lg:text-[36px]">
                        {clinic.name}
                      </h3>
                      <Accent className="mt-4 md:mt-5" />
                      <p className="mt-5 max-w-[46ch] text-[15.5px] leading-[1.75] text-body">{clinic.address}</p>

                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <a
                          href={clinic.phoneHref}
                          className={`inline-flex h-11 items-center gap-2 rounded-xl bg-brand px-6 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-brand-hover ${focusClass}`}
                        >
                          <Phone className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden />
                          Call
                        </a>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapQuery)}`}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex h-11 items-center gap-2 rounded-xl border border-line px-5 text-[14px] font-semibold text-ink transition-colors duration-300 hover:border-brand/45 hover:text-brand ${focusClass}`}
                        >
                          <Navigation className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden />
                          Directions
                        </a>
                        <Link
                          to="/contact"
                          className={`group inline-flex h-11 items-center gap-2 rounded-xl px-4 text-[14px] font-semibold text-brand transition-[gap] duration-300 hover:gap-3 motion-reduce:transition-none ${focusClass}`}
                        >
                          Book
                          <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
                        </Link>
                      </div>
                    </div>

                    {/* Right: when + what, on a soft panel */}
                    <div className="flex flex-col gap-10 border-t border-line bg-brand-light/50 p-7 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-12">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className={circleClass}>
                            <Clock className="h-6 w-6 text-white" strokeWidth={1.8} aria-hidden />
                          </span>
                          <h4 className="font-display text-[20px] font-semibold text-ink">Opening Hours</h4>
                        </div>
                        <dl className="mt-5 border-t border-line/70 text-[14.5px]">
                          {hoursLines.map((line, idx) => {
                            const { day, time } = splitHoursLine(line);
                            return (
                              <div
                                key={idx}
                                className="flex items-baseline justify-between gap-6 border-b border-line/70 py-3"
                              >
                                <dt className="text-body">{day}</dt>
                                {time ? <dd className="text-right font-medium text-ink">{time}</dd> : null}
                              </div>
                            );
                          })}
                        </dl>
                      </div>

                      <div>
                        <div className="flex items-center gap-3">
                          <span className={circleClass}>
                            <Stethoscope className="h-6 w-6 text-white" strokeWidth={1.8} aria-hidden />
                          </span>
                          <h4 className="font-display text-[20px] font-semibold text-ink">Services</h4>
                        </div>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {clinic.services.map((s) => (
                            <li
                              key={s}
                              className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-medium text-body"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
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
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="clinic-map-heading"
                  className="font-display text-[28px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[36px]"
                >
                  Find Us on the Map
                </h2>
                <Accent className="mt-4 md:mt-5" />
              </div>
              {primary?.mapQuery ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(primary.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex h-11 w-fit items-center gap-2 rounded-xl border border-line px-5 text-[14px] font-semibold text-ink transition-colors duration-300 hover:border-brand/45 hover:text-brand ${focusClass}`}
                >
                  <Navigation className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden />
                  Open in Google Maps
                </a>
              ) : null}
            </div>

            <div className="mt-8 overflow-hidden rounded-[24px] border border-line bg-white">
              <iframe
                title="The Dental Park clinic location map"
                src="https://www.google.com/maps?q=113/1A+Hazra+Rd,+Kalighat,+Kolkata,+West+Bengal+700026&output=embed"
                className="h-[340px] w-full lg:h-[460px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}