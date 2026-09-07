import { Link } from "react-router-dom";
import {
  ArrowRight,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Facebook, Instagram, Linkedin, Youtube } from "../shared/icons/BrandIcons";
import { footerColumns } from "../../data/footer";
import { contactInfo } from "../../data/navigation";

// TODO: confirmed via the clinic's live site (thedentalpark.co.in) that
// it does not link out to any social accounts of its own — only
// WhatsApp. These four remain generic placeholder URLs, not real
// clinic handles. Replace with the real accounts once you have them,
// or drop the ones that don't exist.
const socials = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: MessageCircle, label: "WhatsApp", href: contactInfo.whatsapp },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

const legal = [
  { label: "Privacy Policy", to: "/faq" },
  { label: "Terms of Use", to: "/faq" },
  { label: "Our Clinics", to: "/clinics" },
  { label: "Book Appointment", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      {/* Layered premium background — subtle brand glow + grain */}
      <span
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[130px]"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-[380px] w-[380px] rounded-full bg-gold/15 blur-[130px]"
        aria-hidden
      />
      <span className="pointer-events-none absolute inset-0 -z-10 grain opacity-60" aria-hidden />

      {/* CTA band */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-12">
          <div>
            <h2 className="font-display text-[26px] font-semibold leading-tight text-white sm:text-[32px]">
              Ready for a smile you&rsquo;ll love?
            </h2>
            <p className="mt-2 max-w-[520px] text-[14.5px] leading-[1.7] text-white/70">
              Same-day appointments, transparent pricing and a specialist-led plan built around you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="group inline-flex h-[54px] items-center gap-2.5 rounded-xl bg-brand px-7 text-[15.5px] font-semibold text-white transition-all duration-300 hover:bg-brand-hover hover:shadow-float"
            >
              Book an Appointment
              <ArrowRight
                className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </Link>
            <a
              href={contactInfo.phoneHref}
              className="inline-flex h-[54px] items-center gap-2.5 rounded-xl border border-white/25 px-7 text-[15.5px] font-semibold text-white transition-all duration-300 hover:border-gold hover:text-gold"
            >
              <Phone className="h-4.5 w-4.5" strokeWidth={1.9} aria-hidden />
              {contactInfo.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-10 lg:py-18">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand/20 ring-1 ring-gold/25">
            <ShieldCheck className="h-6 w-6 text-gold" strokeWidth={1.6} aria-hidden />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[13px] text-white/80">The</span>
            <span className="block font-display text-[26px] font-bold uppercase tracking-[0.04em] text-white">
              Dental Park
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
              Smile better. Live better.
            </span>
          </span>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.15fr_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div>
            <h2 className="font-display text-[20px] font-semibold text-white">Connect With Us</h2>
            <span className="mt-2 block h-[3px] w-10 rounded-full bg-gold" />

            <a href={contactInfo.phoneHref} className="group mt-6 flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/20 transition-colors duration-300 group-hover:border-gold">
                <Phone className="h-4 w-4 text-gold" strokeWidth={1.8} aria-hidden />
              </span>
              <span>
                <span className="block text-[17px] font-medium text-white">{contactInfo.phone}</span>
                <span className="block text-[13px] text-white/60">Mon–Fri: 10 AM–9 PM · Sat: 10 AM–5:30 PM · Sun: Closed</span>
              </span>
            </a>

            <ul className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 text-white/85 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold/10 hover:text-gold"
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-7 space-y-4 border-t border-white/10 pt-7 text-[14px]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.7} aria-hidden />
                <span>
                  <span className="block font-medium text-white">The Dental Park</span>
                  <Link to="/clinics" className="block text-white/70 transition-colors hover:text-gold">
                    Ground Floor, 113/1A, Hazra Rd, Kalighat, Kolkata
                  </Link>
                </span>
              </div>
              <a href="mailto:thedentalparksocials@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-gold">
                <Mail className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.7} aria-hidden />
                thedentalparksocials@gmail.com
              </a>
              <a
                href="https://www.thedentalpark.co.in/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-gold"
              >
                <Globe className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.7} aria-hidden />
                thedentalpark.co.in
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-display text-[19px] font-semibold text-white">{column.title}</h2>
              <span className="mt-2 block h-[3px] w-10 rounded-full bg-gold" />
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-1.5 text-[14.5px] text-white/75 transition-colors duration-300 hover:text-gold"
                    >
                      <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Map strip */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <h2 className="font-display text-[20px] font-semibold text-white">Visit Us</h2>
            <span className="mt-2 block h-[3px] w-10 rounded-full bg-gold" />
            <p className="mt-4 max-w-[420px] text-[14.5px] leading-[1.75] text-white/70">
              Our clinic is located on the ground floor at 113/1A, Hazra Road, near Hotel Sidharth Building,
              Kalighat, Kolkata, West Bengal 700026.
            </p>
            <Link
              to="/clinics"
              className="group mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-gold"
            >
              View clinic details
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </Link>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-white/12 shadow-float">
            <iframe
              title="The Dental Park clinic map"
              src="https://www.google.com/maps?q=113/1A+Hazra+Rd,+Kalighat,+Kolkata,+West+Bengal+700026&output=embed"
              className="h-[220px] w-full lg:h-[260px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/20">
              <ShieldCheck className="h-[18px] w-[18px] text-gold" strokeWidth={1.7} aria-hidden />
            </span>
            <span className="text-[14.5px]">
              <span className="block font-medium text-white">Your Smile, Our Priority.</span>
              <span className="block text-white/70">Trusted by Thousands of Happy Patients.</span>
            </span>
          </div>
          <p className="text-[14px] leading-[1.7] text-white/60 md:text-right">
            © {new Date().getFullYear()} The Dental Park. All Rights Reserved.
          </p>
        </div>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-[13.5px] text-white/60">
          {legal.map((item) => (
            <li key={item.label}>
              <Link to={item.to} className="transition-colors hover:text-gold">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}