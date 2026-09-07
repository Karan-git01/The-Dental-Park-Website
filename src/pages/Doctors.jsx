import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Award,
  CalendarDays,
  Clock,
  GraduationCap,
  MapPin,
  Phone,
  Quote,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { Reveal } from "../components/shared/Reveal";
import { contactInfo } from "../data/navigation";
import doctorImage from "../assets/images/doctors/lead-dentist.jpg";

// NOTE: bio, stats, education, expertise and quote below are unedited
// Lovable-reference content — not yet confirmed against the PRD.
// Kept as-is per instruction; replace with approved copy before launch.
const doctor = {
  name: "Dr. Arvind Sharma",
  credentials: "BDS, MDS — Orthodontics & Implantology",
  role: "Founder & Chief Dental Surgeon",
  bio: [
    "Dr. Arvind Sharma founded The Dental Park with a single belief — that world-class dentistry should feel calm, clear and completely personal. Over 16 years he has planned and delivered more than 7,000 treatments, from single-visit root canals to complete full-mouth rehabilitations.",
    "Every case begins with a digital diagnosis, an honest conversation and a plan you understand before anything is started. He personally performs each surgical and cosmetic case at the clinic, supported by a trained clinical team and fully digital workflow.",
  ],
  quote:
    "A great smile is never rushed. It is measured, planned and then crafted — exactly the way it deserves to be.",
  stats: [
    { icon: Award, value: "16+", label: "Years of practice" },
    { icon: Users, value: "7,000+", label: "Treatments delivered" },
    { icon: Sparkles, value: "1,200+", label: "Smile makeovers" },
    { icon: Stethoscope, value: "100%", label: "Doctor-led care" },
  ],
  expertise: [
    "Full-arch & single tooth dental implants",
    "Digital smile design and porcelain veneers",
    "Clear aligner and fixed orthodontic treatment",
    "Single-visit painless root canal therapy",
    "Full mouth rehabilitation and bite correction",
    "Laser gum contouring and soft tissue surgery",
  ],
  education: [
    { title: "MDS — Orthodontics & Dentofacial Orthopaedics", detail: "Government Dental College" },
    { title: "BDS — Bachelor of Dental Surgery", detail: "Manipal College of Dental Sciences" },
    { title: "Fellowship in Oral Implantology", detail: "International Congress of Oral Implantologists" },
    { title: "Certified Clear Aligner Provider", detail: "Advanced digital orthodontics programme" },
  ],
  hours: [
    { day: "Monday – Saturday", time: "9:30 AM – 8:30 PM" },
    { day: "Sunday", time: "10:00 AM – 2:00 PM" },
    { day: "Emergency care", time: "Available on call, 24×7" },
  ],
};

// Confirmed clinic address (single Kolkata location) — matches Footer.jsx / Clinics.jsx.
const address = "The Dental Park, Ground Floor, 113/1A, Hazra Rd, Kalighat, Kolkata, West Bengal 700026";
const mapQuery = encodeURIComponent("113/1A Hazra Rd, Kalighat, Kolkata, West Bengal 700026");

export function Doctors() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Dr. Arvind Sharma | Chief Dental Surgeon — The Dental Park</title>
        <meta
          name="description"
          content="Meet Dr. Arvind Sharma, founder and chief dental surgeon at The Dental Park — 16+ years in implantology, orthodontics and digital smile design."
        />
        <meta property="og:title" content="Meet Dr. Arvind Sharma | The Dental Park" />
        <meta
          property="og:description"
          content="Doctor-led dentistry: implants, aligners and smile design planned and performed by one specialist."
        />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="/doctors" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/doctors" />
      </Helmet>

      <PageHeader
        eyebrow="Our Doctor"
        title="One Specialist. Every Smile, Personally Planned."
        description="At The Dental Park your treatment is diagnosed, planned and performed by the same dentist from the first consultation to the final review."
        crumbs={[{ label: "Doctors" }]}
      />

      {/* Doctor profile */}
      <section className="bg-white py-16 lg:py-24" aria-labelledby="doctor-name">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:items-start lg:gap-16">
            <Reveal variant="left" className="relative">
              <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface shadow-float">
                <img
                  src={doctorImage}
                  alt={`${doctor.name}, ${doctor.role} at The Dental Park`}
                  width={1088}
                  height={1360}
                  loading="lazy"
                  className="h-[420px] w-full object-cover object-top sm:h-[520px] lg:h-[620px]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl px-4 py-3.5 glass-card">
                  <p className="font-display text-[19px] font-semibold text-ink">{doctor.name}</p>
                  <p className="text-[12.5px] text-brand">{doctor.credentials}</p>
                </div>
              </div>

              <ul className="mt-5 grid grid-cols-2 gap-3">
                {doctor.stats.map(({ icon: Icon, value, label }) => (
                  <li key={label} className="rounded-2xl border border-line bg-surface px-4 py-4">
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.6} aria-hidden />
                    <p className="mt-2 font-display text-[20px] font-bold text-brand">{value}</p>
                    <p className="text-[12.5px] text-body">{label}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="right">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                <Stethoscope className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} aria-hidden />
                {doctor.role}
              </span>
              <h1
                id="doctor-name"
                className="mt-5 font-display text-[32px] font-bold leading-[1.12] text-ink sm:text-[40px] lg:text-[46px]"
              >
                {doctor.name}
              </h1>
              <p className="mt-2 text-[15px] font-medium text-brand">{doctor.credentials}</p>
              <span className="mt-5 block h-[3px] w-16 rounded-full bg-gold" />

              {doctor.bio.map((para) => (
                <p key={para.slice(0, 24)} className="mt-5 text-[15px] leading-[1.8] text-body">
                  {para}
                </p>
              ))}

              <figure className="mt-7 rounded-2xl border border-line bg-surface p-6">
                <Quote className="h-6 w-6 text-gold" strokeWidth={1.6} aria-hidden />
                <blockquote className="mt-3 font-display text-[19px] leading-[1.5] text-ink">
                  “{doctor.quote}”
                </blockquote>
              </figure>

              <h2 className="mt-9 font-display text-[22px] font-bold text-ink">Areas of Expertise</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {doctor.expertise.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-body">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.8} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="mt-9 font-display text-[22px] font-bold text-ink">Education & Training</h2>
              <ul className="mt-4 space-y-3.5">
                {doctor.education.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} aria-hidden />
                    <span>
                      <span className="block text-[14.5px] font-semibold text-ink">{item.title}</span>
                      <span className="block text-[13.5px] text-body">{item.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-brand px-7 text-[15px] font-semibold text-white glow-hover"
                >
                  <CalendarDays className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden />
                  Book a Consultation
                </Link>
                <a
                  href={contactInfo.phoneHref}
                  className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl border border-line bg-white px-7 text-[15px] font-semibold text-ink transition-colors hover:border-brand/50 hover:text-brand"
                >
                  <Phone className="h-[18px] w-[18px] text-brand" strokeWidth={1.8} aria-hidden />
                  {contactInfo.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Clinic location + map */}
      <section className="surface-gradient py-16 lg:py-24" aria-labelledby="clinic-location">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-brand">
              <MapPin className="h-4 w-4 text-gold" strokeWidth={1.8} aria-hidden />
              Visit the Clinic
            </span>
            <h2
              id="clinic-location"
              className="mt-3 font-display text-[28px] font-bold leading-[1.15] text-ink sm:text-[34px]"
            >
              Find Us on the Map
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] lg:gap-8">
            <Reveal variant="left" className="overflow-hidden rounded-[24px] border border-line bg-white shadow-card">
              <iframe
                title="The Dental Park clinic location map"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 sm:h-[400px] lg:h-[460px]"
              />
            </Reveal>

            <Reveal variant="right" className="rounded-[24px] border border-line bg-white p-6 shadow-card lg:p-7">
              <h3 className="font-display text-[20px] font-bold text-ink">Clinic Address</h3>
              <p className="mt-3 flex items-start gap-3 text-[14.5px] leading-[1.7] text-body">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} aria-hidden />
                {address}
              </p>

              <h3 className="mt-7 font-display text-[20px] font-bold text-ink">Consultation Hours</h3>
              <ul className="mt-3 space-y-3">
                {doctor.hours.map((slot) => (
                  <li key={slot.day} className="flex items-start gap-3 text-[14px] text-body">
                    <Clock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" strokeWidth={1.7} aria-hidden />
                    <span>
                      <span className="block font-semibold text-ink">{slot.day}</span>
                      {slot.time}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex h-[50px] w-full items-center justify-center gap-2.5 rounded-xl bg-brand px-6 text-[15px] font-semibold text-white glow-hover"
              >
                <MapPin className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden />
                Get Directions
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}