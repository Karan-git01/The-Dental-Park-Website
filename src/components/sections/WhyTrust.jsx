import trustImage from "../../assets/images/trust/why-trust-clinic.jpg";
import { trustPillars } from "../../data/trust";
import { Reveal } from "../shared/Reveal";
export function WhyTrust() {
  return (
    <section id="why-trust" className="bg-surface py-16 lg:py-24" aria-labelledby="why-trust-heading">
      <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
        <Reveal as="header" className="text-center">
          <span className="mx-auto flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-10 bg-brand" />
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-brand" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5c-1.6-1.4-4.2-1.7-5.8-.2C4.4 6.5 4.6 9.4 5.4 12c.7 2.3 1 5.4 2 6.6.9 1.1 2 .3 2.3-1.2.3-1.4.5-2.9 2.3-2.9s2 1.5 2.3 2.9c.3 1.5 1.4 2.3 2.3 1.2 1-1.2 1.3-4.3 2-6.6.8-2.6 1-5.5-.8-7.2C16.2 3.3 13.6 3.6 12 5Z" />
            </svg>
            <span className="h-px w-10 bg-brand" />
          </span>
          <h2 id="why-trust-heading" className="mt-4 font-display leading-tight">
            <span className="block text-[30px] font-bold text-ink sm:text-[40px] lg:text-[46px]">Why Trust</span>
            <span className="mt-1 block text-[30px] font-bold uppercase text-brand sm:text-[40px] lg:text-[46px]">
              The Dental Park
            </span>
          </h2>
          <span className="mx-auto mt-4 block h-[3px] w-12 rounded-full bg-brand" />
        </Reveal>
        <Reveal variant="scale" className="mt-9 overflow-hidden rounded-[22px] lg:mt-12">
        <img
          src={trustImage}
          alt="Dentist welcoming a patient at The Dental Park clinic"
          width={1600}
          height={1000}
          loading="lazy"
          className="h-[220px] w-full rounded-[22px] object-cover transition-transform duration-[900ms] ease-out hover:scale-[1.04] sm:h-[360px] lg:h-[520px]"
        />
        </Reveal>
        <div className="mt-6 grid gap-5 lg:mt-8 lg:grid-cols-2">
          {trustPillars.map(({ icon: Icon, title, points }, i) => (
            <Reveal as="article" key={title} delay={i * 120} className="group rounded-[22px] border border-line bg-white p-6 lift-hover hover:border-brand/30 lg:p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-light">
                  <Icon className="h-7 w-7 text-brand transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[19px] font-bold leading-snug text-ink sm:text-[22px]">{title}</h3>
                  <span className="mt-2 block h-[3px] w-14 rounded-full bg-brand" />
                </div>
              </div>
              <ul className="mt-5 space-y-2.5">
                {points.map((point) => (
                  <li key={point} className="flex gap-3 text-[14px] leading-[1.5] text-body sm:text-[15px]">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}