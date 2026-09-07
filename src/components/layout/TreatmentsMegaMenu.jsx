// src/components/layout/TreatmentsMegaMenu.jsx
import {
  ArrowRight,
  Baby,
  Bell,
  CalendarDays,
  ChevronRight,
  IndianRupee,
  PhoneCall,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { treatmentCategories, menuFeatures } from "../../data/treatmentsMenu";
import { treatments } from "../../data/treatments";
import clinicImage from "../../assets/images/menu/clinic-reception.jpg";
import { contactInfo } from "../../data/navigation";

const categoryIcons = {
  cosmetic: Sparkles,
  general: Stethoscope,
  orthodontics: Smile,
  children: Baby,
  restorative: Wrench,
};

const featureIcons = {
  calendar: CalendarDays,
  bell: Bell,
  shield: ShieldCheck,
  rupee: IndianRupee,
  phone: PhoneCall,
};

function slugFor(label) {
  const match = treatments.find(
    (t) => t.title.toLowerCase() === label.toLowerCase() || label.toLowerCase().includes(t.title.toLowerCase()),
  );
  return match?.slug;
}

export function TreatmentsMegaMenu() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)]">
      <div className="grid grid-cols-[1fr_300px] gap-0 px-8 pt-9">
        <div className="grid grid-cols-5">
          {treatmentCategories.map((category, index) => {
            const Icon = categoryIcons[category.icon];
            return (
              <div
                key={category.title}
                className={`px-6 ${index === 0 ? "pl-0" : ""} ${
                  index < treatmentCategories.length - 1 ? "border-r border-black/[0.07]" : ""
                }`}
              >
                <div className="grid h-[58px] w-[58px] place-items-center rounded-full bg-brand/10">
                  <Icon className="h-7 w-7 text-brand" strokeWidth={1.6} aria-hidden />
                </div>
                <h3 className="mt-6 text-[14px] font-semibold uppercase tracking-[0.02em] text-ink">
                  {category.title}
                </h3>
                <p className="mt-4 text-[13.5px] leading-[1.75] text-ink/70">{category.description}</p>
                <div className="my-6 h-px bg-black/[0.08]" />
                <ul className="space-y-[14px]">
                  {category.links.map((link) => (
                    <li key={link}>
                      <MenuLink label={link}>
                        <span>{link}</span>
                        <ChevronRight
                          className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </MenuLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="ml-6 rounded-2xl bg-brand-surface/70 p-5">
          <img
            src={clinicImage}
            alt="The Dental Park clinic reception"
            width={760}
            height={560}
            loading="lazy"
            className="h-[190px] w-full rounded-xl object-cover"
          />
          <h3 className="mt-6 font-serif text-[24px] leading-[1.25] text-ink">
            World-Class Care
            <br />
            For Your Smile
          </h3>
          <p className="mt-4 text-[13.5px] leading-[1.75] text-ink/70">
            Advanced technology, experienced specialists and a patient-first approach for exceptional dental care.
          </p>
          <Link
            to="/treatments"
            className="mt-6 flex h-[52px] items-center justify-between rounded-xl border border-brand/60 bg-white px-5 text-[15px] font-medium text-brand transition-colors hover:bg-brand hover:text-white"
          >
            View All Treatments
            <span className="flex items-center gap-4">
              <span className="h-6 w-px bg-current opacity-40" />
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-8 px-8 pb-8">
        <div className="grid grid-cols-5 rounded-2xl bg-brand-surface/70 px-6 py-7">
          {menuFeatures.map((feature, index) => {
            const Icon = featureIcons[feature.icon];
            return (
              <div
                key={feature.title}
                className={`flex items-start gap-4 px-6 ${
                  index < menuFeatures.length - 1 ? "border-r border-black/[0.07]" : ""
                }`}
              >
                <div className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-brand/10">
                  <Icon className="h-[22px] w-[22px] text-brand" strokeWidth={1.7} aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="whitespace-pre-line text-[14.5px] font-semibold leading-[1.35] text-ink">
                    {feature.title}
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.6] text-ink/65">{feature.description}</p>
                  {feature.highlight && (
                    <a
                      href={contactInfo.phoneHref}
                      className="mt-1 block text-[15px] font-semibold text-brand"
                    >
                      {feature.highlight}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MenuLink({ label, children }) {
  const slug = slugFor(label);
  const className =
    "group flex items-center justify-between gap-3 text-[13.5px] text-ink/85 transition-colors hover:text-brand";
  return slug ? (
    <Link to={`/treatments/${slug}`} className={className}>
      {children}
    </Link>
  ) : (
    <Link to="/treatments" className={className}>
      {children}
    </Link>
  );
}