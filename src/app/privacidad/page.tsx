import type { Metadata } from "next";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: `Política de privacidad de ${site.name}. Información sobre el tratamiento de datos personales.`,
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <section className="relative pt-32 pb-28 md:pt-40 md:pb-36">
      <div className="container-prose">
        <div className="mx-auto max-w-[720px]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
            Legal
          </p>
          <h1 className="mt-5 heading-display text-[clamp(36px,6vw,64px)] text-ink leading-[0.95]">
            Política de Privacidad
          </h1>
          <p className="mt-6 text-[14px] text-ink/50">
            Última actualización: Mayo 2026
          </p>

          <div className="legal-content mt-12 space-y-10 text-[15.5px] leading-[1.75] text-ink/75">
            <Section title="1. Responsable del Tratamiento">
              <p>
                El responsable del tratamiento de los datos personales recogidos a través de este
                sitio web es <strong>{site.legalEntity}</strong>, que opera bajo la marca
                comercial <strong>{site.name}</strong>, con correo electrónico de contacto{" "}
                <a href={`mailto:${site.email}`} className="underline underline-offset-4 decoration-ink/20 hover:decoration-ink/50">
                  {site.email}
                </a>.
              </p>
              <p className="mt-3">
                Aunque la entidad responsable está constituida fuera de la Unión Europea, al ofrecer
                servicios a residentes en la UE aplicamos plenamente el Reglamento General de
                Protección de Datos (RGPD, UE 2016/679) y la normativa española de protección de
                datos.
              </p>
            </Section>

            <Section title="2. Datos que Recogemos">
              <p>Recogemos datos personales que nos proporcionas voluntariamente a través de:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Formularios de contacto y solicitud de auditoría (nombre, apellidos, email, empresa, rol, mensaje, etc.).</li>
                <li>Suscripción al newsletter (dirección de email).</li>
                <li>Comunicaciones directas por correo electrónico.</li>
              </ul>
              <p className="mt-4">
                También podemos recoger datos de navegación de forma anónima (cookies técnicas y
                analíticas) para mejorar la experiencia de uso del sitio.
              </p>
            </Section>

            <Section title="3. Finalidad del Tratamiento">
              <p>Utilizamos tus datos personales para:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Responder a tus solicitudes de información, auditorías y consultas.</li>
                <li>Enviarte comunicaciones comerciales si te has suscrito voluntariamente al newsletter.</li>
                <li>Gestionar la relación comercial y prestación de servicios contratados.</li>
                <li>Mejorar nuestros servicios y la experiencia de usuario.</li>
              </ul>
            </Section>

            <Section title="4. Base Legal">
              <p>
                El tratamiento de tus datos se basa en tu consentimiento expreso al enviar un formulario,
                en la ejecución de un contrato o precontrato cuando solicitas nuestros servicios, y en
                nuestro interés legítimo para mejorar la calidad del servicio.
              </p>
            </Section>

            <Section title="5. Conservación de Datos">
              <p>
                Conservamos tus datos personales durante el tiempo necesario para cumplir con la
                finalidad para la que fueron recogidos. Los datos de contacto se mantienen mientras exista
                una relación comercial activa o un interés legítimo. Los datos del newsletter se conservan
                hasta que solicites la baja.
              </p>
            </Section>

            <Section title="6. Cesión de Datos">
              <p>
                No cedemos tus datos personales a terceros, salvo obligación legal o cuando sea necesario
                para la prestación del servicio (por ejemplo, proveedores de infraestructura tecnológica
                que actúan como encargados del tratamiento bajo acuerdos de confidencialidad).
              </p>
            </Section>

            <Section title="7. Tus Derechos">
              <p>
                Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación
                del tratamiento y portabilidad enviando un email a{" "}
                <a href={`mailto:${site.email}`} className="underline underline-offset-4 decoration-ink/20 hover:decoration-ink/50">
                  {site.email}
                </a>{" "}
                con el asunto &ldquo;Derechos RGPD&rdquo;. Responderemos en un plazo máximo de 30 días.
              </p>
              <p className="mt-3">
                También tienes derecho a presentar una reclamación ante la Agencia Española de
                Protección de Datos (AEPD) si consideras que tus derechos no han sido atendidos.
              </p>
            </Section>

            <Section title="8. Cookies">
              <p>
                Este sitio puede utilizar cookies técnicas y analíticas. Las cookies técnicas son
                necesarias para el funcionamiento del sitio. Las cookies analíticas nos ayudan a
                entender cómo se utiliza el sitio de forma agregada y anónima. Puedes configurar tu
                navegador para rechazar cookies, aunque algunas funcionalidades podrían verse limitadas.
              </p>
            </Section>

            <Section title="9. Seguridad">
              <p>
                Adoptamos medidas técnicas y organizativas adecuadas para proteger tus datos personales
                contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Toda la
                comunicación entre tu navegador y nuestros servidores se realiza mediante cifrado SSL/TLS.
              </p>
            </Section>

            <Section title="10. Cambios en esta Política">
              <p>
                Nos reservamos el derecho de actualizar esta política de privacidad. Cualquier cambio
                será publicado en esta página con la fecha de última actualización. Te recomendamos
                revisarla periódicamente.
              </p>
            </Section>

            <Section title="Contacto">
              <p>
                Para cualquier consulta sobre privacidad, escríbenos a{" "}
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
