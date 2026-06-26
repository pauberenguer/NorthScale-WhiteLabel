"use client";

import { Marquee, Sparkle } from "@/components/Marquee";
import { marqueeWords } from "@/lib/content";

export function MarqueeBand() {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <section
      aria-label="Capacidades clave"
      className="relative overflow-hidden border-y border-line bg-bg py-7 md:py-9"
    >
      <Marquee duration={50}>
        {items.map((w, i) => (
          <div key={`${w}-${i}`} className="flex items-center gap-7 pr-7 md:gap-10 md:pr-10">
            <span className="text-[clamp(14px,1.4vw,18px)] font-semibold uppercase tracking-[0.14em] text-ink whitespace-nowrap">
              {w}
            </span>
            <Sparkle className="h-3 w-3 text-ink md:h-4 md:w-4" />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
