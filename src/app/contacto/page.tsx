import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos sobre tu negocio y cómo podemos ayudarte con IA, automatización o software a medida.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <section className="relative pt-32 pb-28 md:pt-40 md:pb-36">
      <div className="container-wide">
        <div className="mx-auto max-w-[720px]">
          <Reveal>
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                Contacto
              </p>
              <h1 className="mt-5 heading-display text-[clamp(36px,6vw,64px)] text-ink leading-[0.95]">
                Cuéntanos
                <span className="heading-display-italic text-ink/75"> tu Caso</span>
              </h1>
              <p className="mx-auto mt-6 max-w-[520px] text-[16px] leading-[1.65] text-ink/60 md:text-[17px]">
                Rellena el formulario y te respondemos en 24-48h laborables para valorar cómo podemos ayudarte.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
