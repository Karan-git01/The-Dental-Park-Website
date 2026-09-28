import trustImage from "../../assets/images/trust/why-trust-clinic.jpg";
import { trustPillars } from "../../data/trust";
import { Reveal } from "../shared/Reveal";
import { cn } from "../../lib/utils";

export function WhyTrust() {
  return (
    <section id="why-trust" className="bg-white py-16 lg:py-24" aria-labelledby="why-trust-heading">
      <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
        <Reveal as="header">
          <h2
            id="why-trust-heading"
            className="font-display text-[30px] font-bold leading-tight text-ink sm:text-[40px] lg:text-[46px]"
          >
            Why Trust The Dental Park
          </h2>
          <span className="mt-4 block h-[3px] w-10 rounded-full bg-brand" />
        </Reveal>

        <Reveal variant="scale" className="mt-9 overflow-hidden rounded-lg lg:mt-12">
          <img
            src={trustImage}
            alt="Dentist welcoming a patient at The Dental Park clinic"
            width={1600}
            height={1000}
            loading="lazy"
            className="h-[220px] w-full object-cover transition-transform duration-[900ms] ease-out hover:scale-[1.03] sm:h-[360px] lg:h-[480px]"
          />
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-10">
          {trustPillars.map(({ icon: Icon, title, points }, i) => {
            const dark = i % 2 === 1;
            return (
              <Reveal
                as="article"
                key={title}
                delay={i * 120}
                className={cn(
                  "rounded-xl p-7 transition-all duration-300 lg:p-8",
                  dark
                    ? "border border-brand bg-brand shadow-sm shadow-brand/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/25"
                    : "border border-line bg-white shadow-sm shadow-black/[0.03] hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-black/[0.06]",
                )}
              >
                <span
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-lg",
                    dark ? "bg-white" : "bg-brand",
                  )}
                >
                  <Icon
                    className={cn("h-6 w-6", dark ? "text-brand" : "text-white")}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
                <h3
                  className={cn(
                    "mt-4 text-[19px] font-bold leading-snug sm:text-[21px]",
                    dark ? "text-white" : "text-ink",
                  )}
                >
                  {title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {points.map((point) => (
                    <li
                      key={point}
                      className={cn(
                        "flex items-baseline gap-3 text-[14px] leading-[1.6] sm:text-[15px]",
                        dark ? "text-white/80" : "text-body",
                      )}
                    >
                      <span
                        className={cn(
                          "h-[2px] w-3 shrink-0 translate-y-[-3px] rounded-full",
                          dark ? "bg-white/70" : "bg-brand",
                        )}
                        aria-hidden
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}