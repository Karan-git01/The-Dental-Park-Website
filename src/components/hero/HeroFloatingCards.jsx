// src/components/hero/HeroFloatingCards.jsx
import { ShieldCheck, Smile } from "lucide-react";
import { CountUp } from "../shared/CountUp";
import { Reveal } from "../shared/Reveal";

const cards = [
  { icon: ShieldCheck, value: "1700+", label: "Happy\nPatients" },
  { icon: Smile, value: "715+", label: "Successful\nTreatments" },
];

/** Desktop only: two floating glass statistic cards overlaying the hero image. */
export function HeroFloatingCards() {
  return (
    <div className="pointer-events-none absolute right-6 top-10 z-20 hidden w-[228px] flex-col gap-4 xl:right-10 xl:w-[240px] lg:flex">
      {cards.map(({ icon: Icon, value, label }, i) => (
        <Reveal
          key={value}
          variant="right"
          delay={i * 140}
          className="pointer-events-auto flex items-center gap-3 rounded-2xl px-4 py-4 shadow-float glass-card lift-hover"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-light">
            <Icon className="h-5 w-5 text-brand" strokeWidth={1.5} aria-hidden />
          </span>
          <span className="leading-tight">
            <CountUp value={value} className="block font-display text-[20px] font-bold text-brand" />
            <span className="block whitespace-pre-line text-[13px] text-body">{label}</span>
          </span>
        </Reveal>
      ))}
    </div>
  );
}