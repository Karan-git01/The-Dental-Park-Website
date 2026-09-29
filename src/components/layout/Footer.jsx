import { Link } from "react-router-dom";
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Facebook, Instagram, Linkedin, Youtube } from "../shared/icons/BrandIcons";
import { footerColumns } from "../../data/footer";
import { contactInfo } from "../../data/navigation";
import logoDark from "../../assets/images/logos/logo_dark.webp";

// WhatsApp mark drawn in the same outline style as the other social icons
// (lucide has no brand icons).
function WhatsAppIcon({ className, strokeWidth = 1.7 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

// TODO: confirmed via the clinic's live site (thedentalpark.co.in) that
// it does not link out to any social accounts of its own — only
// WhatsApp. These four remain generic placeholder URLs, not real
// clinic handles. Replace with the real accounts once you have them,
// or drop the ones that don't exist.
const socials = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: WhatsAppIcon, label: "WhatsApp", href: contactInfo.whatsapp },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

const legal = [
  { label: "Privacy Policy", to: "/faq" },
  { label: "Terms of Use", to: "/faq" },
  { label: "Our Clinics", to: "/clinics" },
  { label: "Book Appointment", to: "/contact" },
];

const hours = ["Mon–Fri: 10 AM–9 PM", "Sat: 10 AM–5:30 PM", "Sun: Closed"];

const headingClass = "font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-gold";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* CTA */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-16">
          <div>
            <h2 className="font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.01em] text-white sm:text-[34px]">
              Ready for a smile you&rsquo;ll love?
            </h2>
            <p className="mt-5 max-w-[480px] text-[14.5px] leading-[1.7] text-white/65">
              Same-day appointments, transparent pricing and a specialist-led plan built around you.
            </p>
          </div>
          <div className="flex w-full flex-col gap-[12px] sm:w-auto sm:flex-row">
            <Link
              to="/contact"
              className="group inline-flex h-[48px] items-center justify-center gap-2 rounded-[4px]! bg-brand px-[26px] text-[14.5px] font-semibold text-white transition-colors duration-300 hover:bg-brand-hover"
            >
              Book an Appointment
              <ArrowRight
                className="h-[16px] w-[16px] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </Link>
            <a
              href={contactInfo.phoneHref}
              className="inline-flex h-[48px] items-center justify-center gap-2 rounded-[4px]! border border-white/25 px-[26px] text-[14.5px] font-semibold text-white transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <Phone className="h-[16px] w-[16px]" strokeWidth={1.9} aria-hidden />
              {contactInfo.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-10 lg:py-20">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img src={logoDark} alt="" className="h-14 w-auto shrink-0 object-contain" />
          <span className="leading-none">
            <span className="block font-display text-[13px] text-white/80">The</span>
            <span className="block font-display text-[26px] font-bold uppercase tracking-[0.04em] text-white">
              Dental Park
            </span>
            {/* <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
              Smile better. Live better.
            </span> */}
          </span>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))] lg:gap-10">
          {/* Connect */}
          <div>
            <h2 className={headingClass}>Connect With Us</h2>

            <div className="mt-6">
              <a
                href={contactInfo.phoneHref}
                className="group inline-flex items-center gap-3 text-white transition-colors duration-300 hover:text-gold"
              >
                <Phone className="h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={1.7} aria-hidden />
                <span className="text-[17px] font-medium">{contactInfo.phone}</span>
              </a>
              <ul className="mt-3 space-y-1 pl-[30px] text-[13.5px] text-white/60">
                {hours.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {socials.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="grid h-[40px] w-[40px] place-items-center rounded-[4px]! border border-white/15 text-white/80 transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-4 border-t border-white/10 pt-8 text-[14px]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={1.7} aria-hidden />
                <span>
                  <span className="block font-medium text-white">The Dental Park</span>
                  <Link to="/clinics" className="block leading-[1.6] text-white/70 transition-colors hover:text-gold">
                    Ground Floor, 113/1A, Hazra Rd, Kalighat, Kolkata
                  </Link>
                </span>
              </div>
              <a
                href="mailto:thedentalparksocials@gmail.com"
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-gold"
              >
                <Mail className="h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={1.7} aria-hidden />
                <span className="break-all">thedentalparksocials@gmail.com</span>
              </a>
              <a
                href="https://www.thedentalpark.co.in/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-gold"
              >
                <Globe className="h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={1.7} aria-hidden />
                thedentalpark.co.in
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className={headingClass}>{column.title}</h2>
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      to={link.to}
                      className="text-[14.5px] text-white/75 transition-colors duration-300 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Map */}
        <div className="mt-16 grid gap-8 border-t border-white/10 pt-14 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-14">
          <div>
            <h2 className={headingClass}>Visit Us</h2>
            <p className="mt-5 max-w-[420px] text-[14.5px] leading-[1.75] text-white/70">
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
          <div className="overflow-hidden rounded-xl border border-white/10">
            <iframe
              title="The Dental Park clinic map"
              src="https://www.google.com/maps?q=113/1A+Hazra+Rd,+Kalighat,+Kolkata,+West+Bengal+700026&output=embed"
              className="h-[220px] w-full lg:h-[260px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={1.7} aria-hidden />
              <span className="text-[14px]">
                <span className="block font-medium text-white">Your Smile, Our Priority.</span>
                <span className="block text-white/65">Trusted by Thousands of Happy Patients.</span>
              </span>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-white/60">
              {legal.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="transition-colors hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 border-t border-white/10 pt-6 text-[13px] text-white/50">
            © {new Date().getFullYear()} The Dental Park. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}