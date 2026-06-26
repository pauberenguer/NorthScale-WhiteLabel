"use client";

import { Reveal, RevealLines } from "@/components/Reveal";
import { manifesto } from "@/lib/content";

export function Manifesto() {
  return (
    <section id="manifesto" className="relative py-20 md:py-28">
      <div className="container-wide">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                {manifesto.eyebrow}
              </p>
            </Reveal>
            <h2 className="mt-5 heading-display text-[clamp(36px,5.5vw,72px)] text-ink">
              <RevealLines
                text={["Hacemos que", "tu Negocio", "Funcione Mejor."]}
                stagger={0.06}
              />
            </h2>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.15}>
              <p className="text-[18px] leading-[1.55] text-ink/80 md:text-[20px]">
                {manifesto.body}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <ul className="mt-10 flex flex-col divide-y divide-line border-y border-line">
                {manifesto.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="group flex items-center justify-between gap-4 py-5 text-ink"
                    >
                      <span className="text-[18px] font-medium md:text-[20px]">
                        {l.label}
                      </span>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:bg-ink group-hover:border-ink group-hover:text-bg">
                        <Arrow className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={className} aria-hidden="true">
      <path
        d="M2 12 L12 2 M12 2 H4 M12 2 V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
