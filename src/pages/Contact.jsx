import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { Reveal } from "../components/shared/Reveal";
import { AppointmentForm } from "../components/sections/AppointmentForm";
import { Seo } from "../components/seo/Seo";
import { dentistSchema, breadcrumbSchema } from "../lib/schema";
import { contactInfo } from "../data/navigation";

/**
 * WhatsApp glyph drawn locally for the contact block (lucide-react has no brand icons).
 * Same artwork as the floating WhatsApp button, kept separate so the two files stay independent.
 */
function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// Shared presentation: compact bordered blocks, icon beside the text
const blockClass =
  "flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-6 lg:p-7";
const linkClass =
  "transition-colors duration-300 ease-out hover:border-brand/40 focus-visible:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none";
const circleClass = "grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand";
const iconClass = "h-7 w-7 text-white";
const titleClass = "text-[17px] font-semibold leading-[1.3] text-ink";
const descClass = "mt-1 text-[14.5px] leading-[1.6] text-body";

export function Contact() {
  return (
    <SiteLayout>
      <Seo path="/contact" schema={[dentistSchema(), breadcrumbSchema("/contact")]} />

      <PageHeader
        eyebrow="Contact"
        title="Book Your Visit to The Dental Park"
        description="Tell us what you need and we'll confirm your appointment within minutes during clinic hours."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-4 px-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5 lg:px-10">
          <Reveal className="h-full lg:col-span-4">
            <a href={contactInfo.phoneHref} className={`${blockClass} ${linkClass}`}>
              <span className={circleClass}>
                <Phone className={iconClass} strokeWidth={1.6} aria-hidden />
              </span>
              <span>
                <h2 className={titleClass}>Call Us</h2>
                <p className={descClass}>{contactInfo.phone}</p>
              </span>
            </a>
          </Reveal>

          <Reveal delay={80} className="h-full lg:col-span-4">
            <a href={contactInfo.whatsapp} className={`${blockClass} ${linkClass}`}>
              <span className={circleClass}>
                <WhatsAppIcon className={iconClass} />
              </span>
              <span>
                <h2 className={titleClass}>WhatsApp</h2>
                <p className={descClass}>Chat with our care team</p>
              </span>
            </a>
          </Reveal>

          {/* TODO: real email not confirmed anywhere in the PRD — see same TODO in Footer.jsx.
              "hello@dentalpark.in" was unconfirmed Lovable-reference content; replace before launch. */}
          <Reveal delay={160} className="h-full sm:col-span-2 lg:col-span-4">
            <a href="mailto:thedentalparksocials@gmail.com" className={`${blockClass} ${linkClass}`}>
              <span className={circleClass}>
                <Mail className={iconClass} strokeWidth={1.6} aria-hidden />
              </span>
              <span>
                <h2 className={titleClass}>Email</h2>
                <p className={descClass}>thedentalparksocials@gmail.com</p>
              </span>
            </a>
          </Reveal>

          {/* Hours aligned with the confirmed hours already used in Footer.jsx
              (was hardcoded as "Mon - Sat | 9:00 AM - 8:00 PM" in the reference file). */}
          <Reveal delay={240} className="h-full lg:col-span-5">
            <div className={blockClass}>
              <span className={circleClass}>
                <Clock className={iconClass} strokeWidth={1.6} aria-hidden />
              </span>
              <span>
                <h2 className={titleClass}>Clinic Hours</h2>
                <p className="mt-2 text-[14.5px] leading-[1.9] text-body">
                  <span className="block">Mon–Fri: 10 AM–9 PM</span>
                  <span className="block">Sat: 10 AM–5:30 PM</span>
                  <span className="block">Sun: Closed</span>
                </p>
              </span>
            </div>
          </Reveal>

          {/* Reference file said "multiple locations across India" — this project is a single
              Kolkata clinic, so this now points to the real address instead. */}
          <Reveal delay={320} className="h-full sm:col-span-2 lg:col-span-7">
            <div className={blockClass}>
              <span className={circleClass}>
                <MapPin className={iconClass} strokeWidth={1.7} aria-hidden />
              </span>
              <p className="max-w-[52ch] text-[15px] leading-[1.75] text-body lg:text-[16px]">
                The Dental Park, Ground Floor, 113/1A, Hazra Rd, near Hotel Sidharth Building, Kalighat, Kolkata, West
                Bengal 700026.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <AppointmentForm />
    </SiteLayout>
  );
}