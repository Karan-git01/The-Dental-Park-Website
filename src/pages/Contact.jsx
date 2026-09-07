import { Helmet } from "react-helmet-async";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { AppointmentForm } from "../components/sections/AppointmentForm";
import { contactInfo } from "../data/navigation";

export function Contact() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Contact & Book an Appointment | The Dental Park</title>
        <meta
          name="description"
          content={`Book a dental appointment at The Dental Park. Call ${contactInfo.phone}, chat on WhatsApp or send us your preferred slot — same-day visits available.`}
        />
        <meta property="og:title" content="Contact The Dental Park" />
        <meta
          property="og:description"
          content="Call, WhatsApp or book online — same-day dental appointments available."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <PageHeader
        eyebrow="Contact"
        title="Book Your Visit to The Dental Park"
        description="Tell us what you need and we'll confirm your appointment within minutes during clinic hours."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="bg-surface py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          <a href={contactInfo.phoneHref} className="rounded-3xl border border-line bg-white p-6 hover:border-brand/40">
            <Phone className="h-6 w-6 text-brand" strokeWidth={1.6} aria-hidden />
            <h2 className="mt-4 text-[16px] font-semibold text-ink">Call Us</h2>
            <p className="mt-1 text-[14px] text-body">{contactInfo.phone}</p>
          </a>
          <a href={contactInfo.whatsapp} className="rounded-3xl border border-line bg-white p-6 hover:border-brand/40">
            <MessageCircle className="h-6 w-6 text-brand" strokeWidth={1.6} aria-hidden />
            <h2 className="mt-4 text-[16px] font-semibold text-ink">WhatsApp</h2>
            <p className="mt-1 text-[14px] text-body">Chat with our care team</p>
          </a>
          {/* TODO: real email not confirmed anywhere in the PRD — see same TODO in Footer.jsx.
              "hello@dentalpark.in" was unconfirmed Lovable-reference content; replace before launch. */}
          <a
            href="mailto:TODO-CONFIRM-EMAIL@example.com"
            className="rounded-3xl border border-line bg-white p-6 hover:border-brand/40"
          >
            <Mail className="h-6 w-6 text-brand" strokeWidth={1.6} aria-hidden />
            <h2 className="mt-4 text-[16px] font-semibold text-ink">Email</h2>
            <p className="mt-1 text-[14px] text-body">TODO: confirm clinic email</p>
          </a>
          {/* Hours aligned with the confirmed hours already used in Footer.jsx
              (was hardcoded as "Mon - Sat | 9:00 AM - 8:00 PM" in the reference file). */}
          <div className="rounded-3xl border border-line bg-white p-6">
            <Clock className="h-6 w-6 text-brand" strokeWidth={1.6} aria-hidden />
            <h2 className="mt-4 text-[16px] font-semibold text-ink">Clinic Hours</h2>
            <p className="mt-1 text-[14px] text-body">Mon–Fri: 10 AM–9 PM · Sat: 10 AM–5:30 PM · Sun: Closed</p>
          </div>
          {/* Reference file said "multiple locations across India" — this project is a single
              Kolkata clinic, so this now points to the real address instead. */}
          <div className="rounded-3xl border border-line bg-white p-6 sm:col-span-2 lg:col-span-4">
            <p className="flex items-center gap-2.5 text-[14.5px] text-body">
              <MapPin className="h-5 w-5 shrink-0 text-brand" strokeWidth={1.7} aria-hidden />
              The Dental Park, Ground Floor, 113/1A, Hazra Rd, near Hotel Sidharth Building, Kalighat, Kolkata, West
              Bengal 700026.
            </p>
          </div>
        </div>
      </section>

      <AppointmentForm />
    </SiteLayout>
  );
}