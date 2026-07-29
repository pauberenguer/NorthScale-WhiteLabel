"use client";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { finalCTA, site } from "@/lib/content";

export function FinalCTA() {
  return (
    <section id="contacto" className="relative bg-surface text-ink py-20 md:py-28">
      <div className="container-wide">
        <div className="mx-auto max-w-[980px]">
          <div className="text-center">
            <Reveal>
              <p className="text-[14px] uppercase tracking-[0.18em] text-muted">
                {finalCTA.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-6 heading-display text-[clamp(40px,6vw,80px)] leading-[0.95]">
                {finalCTA.title}{" "}
                <span className="heading-display-italic text-ink/65">{finalCTA.titleAccent}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.35}>
              <p className="mx-auto mt-7 max-w-[560px] text-[16px] leading-[1.65] text-ink/60 md:text-[18px]">
                {finalCTA.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.45}>
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {/* Option 1: Auditoría */}
              <div className="group relative rounded-2xl border border-line-strong bg-surface/50 p-8 transition-colors hover:bg-surface">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ink/[0.06] text-ink">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                  </svg>
                </div>
                <h3 className="heading-display text-[22px] text-ink md:text-[24px]">
                  Auditoría Gratuita
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-ink/55">
                  Cuéntanos tu caso y agenda una llamada de 30-45 min para detectar oportunidades reales. Sin compromiso.
                </p>
                <div className="mt-6">
                  <Button href="/auditoria" variant="primary" size="md">
                    Solicitar Auditoría
                  </Button>
                </div>
              </div>

              {/* Option 2: WhatsApp */}
              <div className="group relative rounded-2xl border border-line-strong bg-surface/50 p-8 transition-colors hover:bg-surface">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ink/[0.06] text-ink">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <h3 className="heading-display text-[22px] text-ink md:text-[24px]">
                  Escríbenos
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-ink/55">
                  ¿Prefieres escribirnos directamente? Cuéntanos tu caso por WhatsApp y te respondemos al momento.
                </p>
                <div className="mt-6">
                  <Button href={site.whatsappUrl} variant="outline" size="md">
                    Abrir WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
