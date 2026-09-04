import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: `Términos y condiciones de uso de ${site.name}.`,
  alternates: { canonical: "/terminos" },
  ...pageMeta({
    path: "/terminos",
    title: "Términos y Condiciones",
    description:
      "Condiciones de uso del sitio.",
  }),
};

export default function TerminosPage() {
  return (
    <section className="relative pt-32 pb-28 md:pt-40 md:pb-36">
      <div className="container-prose">
        <div className="mx-auto max-w-[720px]">
          <p className="text-[14px] uppercase tracking-[0.18em] text-muted">
            Legal
          </p>
          <h1 className="mt-5 heading-display text-[clamp(36px,6vw,64px)] text-ink leading-[0.95]">
            Términos y Condiciones
          </h1>
          <p className="mt-6 text-[14px] text-ink/50">
            Última actualización: Mayo 2026
          </p>

          <div className="legal-content mt-12 space-y-10 text-[15.5px] leading-[1.75] text-ink/75">
            <Section title="1. Información General">
              <p>
                Este sitio web es propiedad y está operado por <strong>{site.legalEntity}</strong>,
                que opera bajo la marca comercial <strong>{site.name}</strong>. Al acceder y utilizar
                este sitio web, aceptas cumplir y estar sujeto a los siguientes términos y
                condiciones. Si no estás de acuerdo con alguno de estos términos, te rogamos que
                no utilices el sitio.
              </p>
              <p className="mt-3">
                Para cualquier comunicación legal, puedes contactar con nosotros en{" "}
                <a href={`mailto:${site.email}`} className="underline underline-offset-4 decoration-ink/20 hover:decoration-ink/50">
                  {site.email}
                </a>.
              </p>
            </Section>

            <Section title="2. Servicios">
              <p>
                {site.name} ofrece servicios de consultoría en inteligencia artificial,
                automatización de procesos y desarrollo de software a medida. La información
                presentada en este sitio web tiene carácter informativo y no constituye una
                oferta contractual vinculante.
              </p>
              <p className="mt-3">
                Las condiciones específicas de cada proyecto (alcance, plazos, precio y
                entregables) se acuerdan individualmente con cada cliente mediante un contrato
                o propuesta formal separada.
              </p>
            </Section>

            <Section title="3. Propiedad Intelectual">
              <p>
                Todo el contenido de este sitio web — incluyendo textos, diseño, logotipos,
                gráficos, código y estructura — es propiedad de {site.name} o se utiliza con
                la debida autorización. Queda prohibida su reproducción, distribución o
                modificación sin autorización previa por escrito.
              </p>
              <p className="mt-3">
                Respecto a los proyectos realizados para clientes: la propiedad intelectual del
                código y los entregables se transfiere al cliente según lo estipulado en cada
                contrato de servicios.
              </p>
            </Section>

            <Section title="4. Uso del Sitio Web">
              <p>Te comprometes a utilizar este sitio web de forma lícita y a no:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Utilizar el sitio para fines ilegales o no autorizados.</li>
                <li>Intentar acceder a áreas restringidas del servidor o la infraestructura.</li>
                <li>Enviar información falsa o engañosa a través de los formularios.</li>
                <li>Interferir con el funcionamiento normal del sitio.</li>
              </ul>
            </Section>

            <Section title="5. Limitación de Responsabilidad">
              <p>
                {site.name} no garantiza que el sitio web esté disponible de forma
                ininterrumpida ni libre de errores. No nos hacemos responsables de daños
                directos o indirectos derivados del uso o la imposibilidad de uso de este sitio.
              </p>
              <p className="mt-3">
                La información publicada en el sitio se proporciona &ldquo;tal cual&rdquo; y puede
                contener imprecisiones técnicas o errores tipográficos. Nos reservamos el derecho
                de modificar el contenido en cualquier momento.
              </p>
            </Section>

            <Section title="6. Enlaces Externos">
              <p>
                Este sitio puede contener enlaces a sitios web de terceros. Estos enlaces se
                proporcionan únicamente para tu comodidad y no implican aprobación o
                responsabilidad sobre su contenido, políticas de privacidad o prácticas.
              </p>
            </Section>

            <Section title="7. Confidencialidad">
              <p>
                Toda la información que nos compartas a través de formularios, emails o reuniones
                será tratada como confidencial. No divulgaremos datos de tu proyecto, operativa
                o estrategia a terceros sin tu consentimiento expreso, salvo obligación legal.
              </p>
            </Section>

            <Section title="8. Política de Cancelación">
              <p>
                Las auditorías gratuitas pueden cancelarse o reprogramarse sin coste alguno con
                al menos 24 horas de antelación. Para proyectos en curso, las condiciones de
                cancelación se detallan en el contrato de servicios correspondiente.
              </p>
            </Section>

            <Section title="9. Legislación Aplicable">
              <p>
                Sin perjuicio de la nacionalidad de la entidad operadora, las partes acuerdan
                expresamente someter cualquier disputa derivada del uso de este sitio web o de
                los servicios prestados bajo la marca {site.name} a la legislación española.
                La jurisdicción competente serán los juzgados y tribunales de Barcelona, España,
                renunciando a cualquier otro fuero que pudiera corresponderles.
              </p>
              <p className="mt-3">
                Lo anterior se entiende sin perjuicio de los derechos de los consumidores que la
                legislación imperativa de su país de residencia les reconozca.
              </p>
            </Section>

            <Section title="10. Modificaciones">
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los
                cambios entrarán en vigor desde su publicación en esta página. El uso continuado
                del sitio tras la publicación de cambios implica la aceptación de los mismos.
              </p>
            </Section>

            <Section title="Contacto">
              <p>
                Para cualquier consulta sobre estos términos, escríbenos a{" "}
                <a href={`mailto:${site.email}`} className="underline underline-offset-4 decoration-ink/20 hover:decoration-ink/50">
                  {site.email}
                </a>.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="heading-display text-[20px] text-ink leading-[1.3] md:text-[22px]">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
