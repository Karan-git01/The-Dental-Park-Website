import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin, Phone, Stethoscope } from "lucide-react";
import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { Reveal } from "../components/shared/Reveal";
import { Seo } from "../components/seo/Seo";
import { physicianSchema, dentistSchema, breadcrumbSchema } from "../lib/schema";
import { contactInfo } from "../data/navigation";
import { clinic } from "../data/clinics";
import doctorImage from "../assets/images/doctors/lead-dentist.jpg";

// Confirmed clinic data. Add a years-of-practice figure, a bio quote or
// college names only after the doctor approves them.
const secondaryPhone = { display: "+91 91314 67829", href: "tel:+919131467829" };

const doctor = {
  name: "Dr. Pratik Singh",
  credentials: "BDS — Certified Medical Facial Cosmetologist",
  role: "Founder & Lead Dental Surgeon",
  bio: [
    "Dr. Pratik Singh is the founder and Lead Dental Surgeon of The Dental Park on Hazra Road, Kalighat, Kolkata. A Bachelor of Dental Surgery (BDS) graduate, he combines clinical dentistry with advanced facial aesthetics as a certified Medical Facial Cosmetologist.",
    "His practice focuses on complex, aesthetic and fixed restorative cases — from painless single-sitting root canal treatments to complete smile makeovers, zirconia and ceramic crowns, fixed bridges and surgical extractions.",
  ],
  expertise: [
    "Prosthodontics: zirconia, ceramic and metal-ceramic crowns",
    "Fixed dental bridges and tooth restorations",
    "Painless, single-sitting Root Canal Treatment (RCT)",
    "Full smile makeovers",
    "Professional teeth whitening",
    "Surgical extractions, including impacted wisdom teeth",
    "Facial aesthetics as a Medical Facial Cosmetologist",
  ],
  education: [
    { title: "BDS — Bachelor of Dental Surgery", detail: "Qualification to practise dentistry in India" },
    { title: "Certified Medical Facial Cosmetologist", detail: "Dental design combined with facial aesthetics" },
  ],
};

// Address, hours and map query come from the single source of truth in data/clinics.
const mapQuery = encodeURIComponent(clinic.mapQuery);

export function Doctors() {
  return (
    <SiteLayout>
      <Seo
        path="/doctors"
        type="profile"
        schema={[
          physicianSchema({
            image: doctorImage,
            description: doctor.bio[0],
            credentials: doctor.education.map((e) => e.title),
            knowsAbout: doctor.expertise,
          }),
          dentistSchema(),
          breadcrumbSchema("/doctors"),
        ]}
      />

      <PageHeader
        eyebrow="Our Doctor"
        title="One Specialist. Every Smile, Personally Planned."
        description="At The Dental Park your treatment is diagnosed, planned and performed by the same dentist from the first consultation to the final review."
        crumbs={[{ label: "Doctors" }]}
      />

      {/* Doctor profile */}
      <section className="bg-white py-14 lg:py-20" aria-labelledby="doctor-name">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-16">
            {/* Left column stretches to the full height so the inner block can stay sticky. */}
            <Reveal variant="left">
              <div className="lg:sticky lg:top-28">
                <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
                  <img
                    src={doctorImage}
                    alt={`${doctor.name}, ${doctor.role} at The Dental Park`}
                    width={1088}
                    height={1360}
                    loading="lazy"
                    className="h-[420px] w-full object-cover object-top sm:h-[500px] lg:h-[540px]"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"
                  />
                  <div className="absolute inset-x-4 bottom-4 rounded-xl px-4 py-3.5 glass-card">
                    <p className="font-display text-[18px] font-semibold text-ink">{doctor.name}</p>
                    <p className="text-[12.5px] text-brand">{doctor.credentials}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal variant="right">
              <span className="flex items-center gap-2 text-[14px] font-medium text-brand">
                <Stethoscope className="h-8 w-8 text-gold" strokeWidth={1.8} aria-hidden />
                {doctor.role}
              </span>
              <h2
                id="doctor-name"
                className="mt-4 font-display text-[28px] font-bold leading-[1.12] tracking-[-0.01em] text-ink sm:text-[40px] lg:text-[46px]"
              >
                {doctor.name}
              </h2>
              <p className="mt-2 text-[15px] font-medium text-brand">{doctor.credentials}</p>
              <span className="mt-5 block h-[3px] w-10 rounded-full bg-gold" />

              {doctor.bio.map((para, i) => (
                <p
                  key={para.slice(0, 24)}
                  className={
                    i === 0
                      ? "mt-6 text-[0.9rem] leading-[1.75] text-ink/85"
                      : "mt-4 text-[0.9rem] leading-[1.85] text-body"
                  }
                >
                  {para}
                </p>
              ))}

              <h3 className="mt-12 font-display text-[22px] font-bold text-ink">Areas of Expertise</h3>
              <ul className="mt-4 grid border-b border-line sm:grid-cols-2 sm:gap-x-10">
                {doctor.expertise.map((item) => (
                  <li key={item} className="border-t border-line py-3.5 text-[14.5px] leading-[1.6] text-body">
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="mt-12 font-display text-[22px] font-bold text-ink">Qualifications</h3>
              <ul className="mt-4 border-b border-line">
                {doctor.education.map((item) => (
                  <li
                    key={item.title}
                    className="border-t border-line py-4 sm:flex sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <span className="block text-[14.5px] font-semibold text-ink">{item.title}</span>
                    <span className="mt-1 block text-[13.5px] text-body sm:mt-0 sm:text-right">{item.detail}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-brand px-7 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <CalendarDays className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden />
                  Book a Consultation
                  <ArrowRight
                    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    strokeWidth={2}
                    aria-hidden
                  />
                </Link>
                <a
                  href={contactInfo.phoneHref}
                  className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full border border-ink/15 bg-white px-7 text-[15px] font-semibold text-ink transition-colors duration-300 hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <Phone className="h-[18px] w-[18px] text-brand" strokeWidth={1.8} aria-hidden />
                  {contactInfo.phone}
                </a>
                <a
                  href={secondaryPhone.href}
                  className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full border border-ink/15 bg-white px-7 text-[15px] font-semibold text-ink transition-colors duration-300 hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <Phone className="h-[18px] w-[18px] text-brand" strokeWidth={1.8} aria-hidden />
                  {secondaryPhone.display}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Clinic location + map */}
      <section className="border-t border-line bg-white py-14 lg:py-20" aria-labelledby="clinic-location">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          {/* Heading left, directions button right */}
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="flex items-center gap-2 text-[14px] font-medium text-brand">
                <MapPin className="h-8 w-8 text-gold" strokeWidth={1.8} aria-hidden />
                Visit the Clinic
              </span>
              <h2
                id="clinic-location"
                className="mt-3 font-display text-[28px] font-bold leading-[1.15] tracking-[-0.01em] text-ink sm:text-[36px] lg:text-[42px]"
              >
                Find Us on the Map
              </h2>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-[50px] w-fit items-center justify-center gap-2.5 rounded-full bg-brand px-7 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <MapPin className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden />
              Get Directions
              <ArrowRight
                className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] lg:gap-14">
            <Reveal variant="left" className="overflow-hidden rounded-2xl border border-line bg-surface">
              <iframe
                title="The Dental Park clinic location map"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[320px] w-full border-0 sm:h-[400px] lg:h-[440px]"
              />
            </Reveal>

            {/* Open column on white: no card, just hairline rows */}
            <Reveal variant="right">
              <h3 className="font-display text-[20px] font-bold text-ink">Clinic Address</h3>
              <p className="mt-3 flex items-start gap-3 text-[15.5px] leading-[1.7] text-body">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} aria-hidden />
                {clinic.address}
              </p>

              <h3 className="mt-10 font-display text-[20px] font-bold text-ink">Consultation Hours</h3>
              <ul className="mt-4 border-b border-line">
                {clinic.hours.map((slot) => (
                  <li
                    key={slot.day}
                    className="flex items-baseline justify-between gap-4 border-t border-line py-4 text-[14.5px]"
                  >
                    <span className="font-medium text-ink">{slot.day}</span>
                    <span className="text-right text-body">{slot.time}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}