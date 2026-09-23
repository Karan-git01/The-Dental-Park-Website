// src/components/hero/HeroTrustCards.jsx
import { Baby, Smile, ShieldCheck, SmilePlus } from "lucide-react";

const trust = [
  { icon: Baby, label: "Child\nSpecialist" },
  { icon: Smile, label: "Painless\nTreatment" },
  { icon: ShieldCheck, label: "Safe &\nHygienic" },
  { icon: SmilePlus, label: "Healthy Smiles\nAlways" },
];

/** Desktop: inline row under the hero copy. */
export function HeroTrustCards() {
  return (
    <ul className="mt-12 hidden grid-cols-2 gap-y-8 sm:grid-cols-4 lg:grid">
      {trust.map(({ icon: Icon, label }, i) => (
        <li
          key={label}
          className={`group flex items-center gap-3.5 ${
            i > 0 ? "sm:border-l sm:border-ink/[0.08] sm:pl-5" : ""
          }`}
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/10 transition-colors duration-300 group-hover:border-brand/40 group-hover:bg-brand/[0.06]">
            <Icon className="h-[17px] w-[17px] text-brand" strokeWidth={1.5} aria-hidden />
          </span>
          <span className="whitespace-pre-line text-[13px] font-medium leading-[1.35] tracking-tight text-ink/80">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Mobile: four uniform outlined cards in a 2x2 grid. */
export function HeroMobileTrustCards() {
  return (
    <div className="grid grid-cols-2 gap-2.5 px-4 lg:hidden">
      {trust.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex flex-col gap-3 rounded-2xl border border-ink/[0.08] bg-white px-4 py-5"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/10">
            <Icon className="h-4 w-4 text-brand" strokeWidth={1.5} aria-hidden />
          </span>
          <span className="whitespace-pre-line text-[13px] font-medium leading-[1.35] tracking-tight text-ink/80">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}