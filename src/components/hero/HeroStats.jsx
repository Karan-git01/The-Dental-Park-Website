// src/components/hero/HeroStats.jsx
import { Heart } from "lucide-react";
import { heroStatistics } from "../../data/statistics";
import { CountUp } from "../shared/CountUp";
import { Reveal } from "../shared/Reveal";

export function HeroStats() {
  return (
    <div className="relative z-20 mx-auto mt-8 w-full max-w-[1500px] px-0 md:mt-0 md:px-8 lg:-mt-16 lg:px-10">
      {/* Mobile: auto-scrolling marquee of stat panels (pauses on touch/hover) */}
      <div className="marquee-pause overflow-hidden px-5 pb-2 edge-fade-x md:hidden">
        <div className="marquee-track flex w-max gap-2.5">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-2.5" aria-hidden={dup === 1}>
              {heroStatistics.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex min-w-[150px] flex-col gap-2 rounded-2xl bg-white px-4 py-4"
                >
                  <span className="flex items-center gap-2">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10">
                      <Icon className="h-[18px] w-[18px] text-brand" strokeWidth={1.75} aria-hidden />
                    </span>
                    <CountUp value={value} className="font-display text-[22px] font-bold leading-none text-ink" />
                  </span>
                  <span className="block truncate text-[11.5px] leading-snug text-body">{label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Tablet & desktop: filled green icon circle beside each number/label
          pair, matching the trust-row treatment, with hairline dividers
          between stats instead of separate card chrome. */}
      <div className="hidden rounded-2xl bg-white px-6 py-8 md:block lg:px-10 lg:py-9">
        <div className="flex items-center justify-between gap-4">
          {heroStatistics.map(({ icon: Icon, value, label }, i) => (
            <Reveal
              key={label}
              delay={i * 100}
              className={`flex min-w-0 flex-1 flex-col gap-2 ${
                i > 0 ? "border-l border-ink/10 pl-6 lg:pl-8" : ""
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 lg:h-12 lg:w-12">
                  <Icon className="h-5 w-5 text-brand lg:h-[22px] lg:w-[22px]" strokeWidth={1.75} aria-hidden />
                </span>
                <CountUp
                  value={value}
                  className="font-display text-[22px] font-bold leading-none text-ink lg:text-[26px]"
                />
              </span>
              <span className="block truncate text-[13px] font-medium text-body lg:text-[14px]">{label}</span>
            </Reveal>
          ))}
          <p className="hidden shrink-0 self-center border-l border-ink/10 pl-8 font-script text-[22px] leading-tight text-brand xl:block">
            Happy Smiles
            <br />
            <span className="pl-5">Stronger Tomorrows</span>
          </p>
        </div>
      </div>
      <p className="mt-7 flex items-center justify-center gap-2.5 px-5 text-center md:hidden">
        <span className="font-script text-[18px] leading-tight text-brand">
          Happy Smiles, <span className="text-gold">Stronger Tomorrows</span>
        </span>
        <Heart
          className="h-5 w-5 shrink-0 animate-pulse fill-gold text-gold"
          strokeWidth={1.5}
          aria-hidden
        />
      </p>
    </div>
  );
}