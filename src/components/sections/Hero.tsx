"use client";

import Link from "next/link";
import { Reveal, RevealLines } from "@/components/Reveal";
import { Marquee, Sparkle } from "@/components/Marquee";
import { Button } from "@/components/ui/Button";
import { hero, site } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100dvh] flex-col justify-between overflow-hidden bg-bg pt-32 pb-12 md:pt-40 md:pb-16"
    >
      {/* Background marquee gigante con el nombre de la marca */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-center"
      >
        <Marquee duration={70} pauseOnHover={false} className="py-2">
          <div className="flex shrink-0 items-center gap-8 pr-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="heading-display text-[clamp(120px,22vw,320px)] leading-[0.85] whitespace-nowrap text-ink/[0.05]"
              >
                {site.name}
                <span className="inline-block px-6 align-middle">
                  <Sparkle className="h-14 w-14 text-ink/[0.04] md:h-24 md:w-24" />
                </span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(10,10,10,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* Spacer top */}
      <div />

      {/* Middle: headline + supporting layout */}
      <div className="container-wide">
        <h1 className="heading-display text-[clamp(60px,9.5vw,168px)] leading-[0.92] text-ink">
          <RevealLines
            text={["Potencia tu Negocio"]}
            stagger={0.06}
            linePb="0.12em"
          />
          <span className="heading-display-italic text-ink/80">
            <RevealLines
              text={["con IA."]}
              stagger={0.06}
              linePb="0.12em"
            />
          </span>
        </h1>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <Reveal delay={0.5}>
              <p className="max-w-[520px] text-[18px] leading-[1.55] text-ink/70 md:text-[20px]">
                {hero.subtitle}
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:flex md:items-end">
            <Reveal delay={0.65}>
              <div className="inline-flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  href="/auditoria"
                  variant="primary"
                  size="lg"
                >
                  Consultoría Gratuita
                </Button>
                <Button
                  href="/#servicios"
                  variant="outline"
                  size="lg"
                >
                  Ver Servicios
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Bottom: stats line (estilo B) */}
      <div className="container-wide mt-10 md:mt-0">
        <Reveal delay={0.8}>
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
            <div className="flex flex-wrap items-baseline gap-x-10 gap-y-3">
              <Stat number="+40" label="Procesos automatizados" />
              <Stat number="+15" label="Sectores con experiencia" />
              <Stat number="100%" label="Soluciones a medida" />
            </div>
            <Link
              href="/#manifesto"
              className="hidden items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink md:inline-flex"
            >
              Scroll
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="translate-y-px"
                style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="heading-display text-[24px] text-ink md:text-[28px]">
        {number}
      </span>
      <span className="text-[12px] text-muted md:text-[13px]">{label}</span>
    </div>
  );
}
