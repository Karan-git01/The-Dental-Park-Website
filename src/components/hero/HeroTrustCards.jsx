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
    <ul className="mt-9 hidden grid-cols-2 gap-y-5 sm:grid-cols-4 lg:grid">
      {trust.map(({ icon: Icon, label }, i) => (
        <li
          key={label}
          className={`flex items-center gap-2.5 ${i > 0 ? "sm:border-l sm:border-black/10 sm:pl-4" : ""}`}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10">
            <Icon className="h-[18px] w-[18px] text-brand" strokeWidth={1.5} aria-hidden />
          </span>
          <span className="whitespace-pre-line text-[13px] leading-[1.3] text-ink">{label}</span>
        </li>
      ))}
    </ul>
  );
}

/** Mobile: two white cards, each holding two stacked trust rows. */
export function HeroMobileTrustCards() {
  const columns = [trust.slice(0, 2), trust.slice(2)];
  return (
    <div className="grid grid-cols-2 gap-3 px-4 lg:hidden">
      {columns.map((column, ci) => (
        <div key={ci} className="rounded-2xl bg-white shadow-card">
          {column.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className={`flex min-h-[92px] items-center gap-3 px-3.5 py-4 ${i > 0 ? "border-t border-black/[0.07]" : ""}`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10">
                <Icon className="h-5 w-5 text-brand" strokeWidth={1.5} aria-hidden />
              </span>
              <span className="min-w-0 text-[14px] leading-[1.3] text-ink">{label.replace("\n", " ")}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}