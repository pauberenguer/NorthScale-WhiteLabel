import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Reveal, RevealLines } from "@/components/Reveal";
import { AuditForm } from "@/components/AuditForm";
import { auditoria, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Auditoría gratuita",
  description:
    "Solicita una auditoría gratuita de 30-45 minutos para detectar dónde la IA o la automatización pueden ahorrarte tiempo y mejorar tu operación.",
  alternates: { canonical: "/auditoria" },
  ...pageMeta({
    path: "/auditoria",
    title: "Auditoría gratuita",
    description:
      "Reserva una auditoría gratuita de 30-45 minutos: repasamos tus procesos y te decimos qué se puede automatizar y qué no.",
  }),
};

export default function AuditoriaPage() {
  return (
    <section className="relative pt-32 pb-28 md:pt-40 md:pb-36">
      <div className="container-wide">
        <div className="grid gap-8 md:grid-cols-12 md:gap-16 md:items-start">
          {/* Top-left: title + body */}
          <div className="order-1 md:col-span-5 md:sticky md:top-32">
            <Reveal>
              <p className="text-[14px] uppercase tracking-[0.18em] text-muted">
                {auditoria.eyebrow}
              </p>
            </Reveal>

            <h1 className="mt-4 heading-display text-[clamp(60px,8vw,100px)] text-ink leading-[0.85]">
              <RevealLines text={[auditoria.title]} stagger={0.06} />
              <span className="block heading-display-italic text-ink/85">
                <RevealLines text={[auditoria.titleAccent]} stagger={0.06} />
              </span>
            </h1>

            <Reveal delay={0.4}>
              <p className="mt-6 max-w-[440px] text-[16px] leading-[1.6] text-ink/70 md:text-[17px]">
                {auditoria.body}
              </p>
            </Reveal>

            <Reveal delay={0.55} className="hidden md:block">
              <ul className="mt-10 space-y-5 border-t border-line pt-8">
                <Row label="Duración">30 — 45 min</Row>
                <Row label="Coste">Sin Compromiso · Gratuito</Row>
                <Row label="Formato">Llamada 1 a 1</Row>
                <Row label="Contacto">
                  <a
                    href={`mailto:${site.email}`}
                    className="underline underline-offset-4 decoration-line-strong hover:decoration-ink"
                  >
                    {site.email}
                  </a>
                </Row>
              </ul>
            </Reveal>
          </div>

          {/* Right: form. En móvil el formulario cierra la página: el resumen
              de duración/coste/formato solo se muestra en la barra lateral de
              escritorio, para no repetirlo debajo del propio formulario. */}
          <div className="order-2 md:col-span-7">
            <Reveal delay={0.3}>
              <AuditForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
      <span className="w-32 shrink-0 text-[11px] uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      <span className="heading-display text-[clamp(20px,2.2vw,28px)] text-ink leading-[1.2]">
        {children}
      </span>
    </li>
  );
}
