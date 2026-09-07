// src/components/hero/HeroStats.jsx
import { Heart } from "lucide-react";
import { heroStatistics } from "../../data/statistics";
import { CountUp } from "../shared/CountUp";
import { Reveal } from "../shared/Reveal";

export function HeroStats() {
  return (
    <div className="relative z-20 mx-auto mt-8 w-full max-w-[1500px] px-0 md:mt-0 md:px-8 lg:-mt-16 lg:px-10">
      {/* Mobile: auto-scrolling marquee of stat cards (pauses on touch/hover) */}
      <div className="marquee-pause overflow-hidden px-5 pb-2 edge-fade-x md:hidden">
        <div className="marquee-track flex w-max gap-3">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-3" aria-hidden={dup === 1}>
              {heroStatistics.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex min-w-[170px] items-center gap-3 rounded-[24px] border border-line/70 bg-white px-4 py-5 shadow-card"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-light">
                    <Icon className="h-5 w-5 text-brand" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="leading-tight">
                    <CountUp value={value} className="block font-display text-[20px] font-bold text-brand" />
                    <span className="block text-[13px] leading-[1.3] text-body">{label}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Tablet & desktop: floating strip */}
      <div className="hidden rounded-[28px] border border-line/70 bg-white px-6 py-7 shadow-float md:block lg:px-10 lg:py-8">
        <div className="flex items-center justify-between gap-4">
          {heroStatistics.map(({ icon: Icon, value, label }, i) => (
            <Reveal
              key={label}
              delay={i * 100}
              className="group flex min-w-0 flex-1 items-center gap-3.5 border-l border-line pl-6 first:border-l-0 first:pl-0"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-light transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 lg:h-12 lg:w-12">
                <Icon className="h-5 w-5 text-brand lg:h-6 lg:w-6" strokeWidth={1.5} aria-hidden />
              </span>
              <span className="min-w-0 leading-tight">
                <CountUp
                  value={value}
                  className="block font-display text-[22px] font-bold text-brand lg:text-[26px]"
                />
                <span className="block truncate text-[13px] font-medium text-body lg:text-[15px]">{label}</span>
              </span>
            </Reveal>
          ))}
          <p className="hidden shrink-0 font-script text-[26px] leading-tight text-brand xl:block xl:pl-8">
            Happy Smiles
            <br />
            <span className="pl-6">Stronger Tomorrows</span>
          </p>
        </div>
      </div>
      <p className="mt-6 flex items-center justify-center gap-2 px-5 font-script text-[22px] leading-tight text-brand md:hidden">
        Happy Smiles, Stronger Tomorrows
        <Heart className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
      </p>
    </div>
  );
}