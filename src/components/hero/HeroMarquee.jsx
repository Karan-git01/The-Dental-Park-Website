// src/components/hero/HeroMarquee.jsx
import { useState } from "react";
import { cn } from "../../lib/utils";

const items = [
  "Advanced Digital Dentistry",
  "Painless Root Canal",
  "Same Day Appointments",
  "Invisible Aligners",
  "Dental Implants",
  "Kids Dentistry",
  "24x7 Dental Emergency",
  "Smile Makeover",
];

/** Auto-scrolling strip that can also be swiped/dragged horizontally. */
export function HeroMarquee() {
  const [dragging, setDragging] = useState(false);
  return (
    <div
      className="mt-8 overflow-x-auto overscroll-x-contain bg-brand py-4 no-scrollbar marquee-pause lg:mt-14"
      style={{ touchAction: "pan-x" }}
      onTouchStart={() => setDragging(true)}
      onTouchEnd={() => setDragging(false)}
      onTouchCancel={() => setDragging(false)}
    >
      <div
        className={cn(
          "flex w-max items-center whitespace-nowrap",
          dragging ? "" : "marquee-track",
        )}
      >
        {[0, 1, 2].map((dup) => (
          <div key={dup} className="flex items-center">
            {items.map((item) => (
              <span key={`${dup}-${item}`} className="flex items-center">
                <span className="px-6 font-display text-[15px] tracking-wide text-white/90 transition-colors duration-300 hover:text-gold lg:px-9 lg:text-[17px]">
                  {item}
                </span>
                <span className="h-4 w-px bg-gold/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}