/**
 * La marca, en un solo sitio.
 *
 * Este es el ÚNICO archivo que cambia de una instalación a otra. Rellena estos
 * campos con tus datos y la web entera —logo, hero, footer, formularios, avisos
 * legales y metadatos de SEO— se actualiza sola. No hace falta tocar nada más.
 *
 * El resto de la copy (títulos, servicios, FAQ, testimonios) vive en
 * `content.ts`, que ya no contiene ningún dato de marca.
 */
export const brand = {
  name: "TU MARCA",
  // Entidad legal que aparece en las páginas de privacidad y términos.
  legalEntity: "TU ENTIDAD LEGAL S.L.",
  domain: "tudominio.com",
  email: "hola@tudominio.com",
  tagline: "Inteligencia artificial, automatización y software a medida.",

  // Pega aquí la URL del webhook (p. ej. GoHighLevel) que recibe los formularios.
  webhookUrl: "PEGA_AQUI_TU_WEBHOOK_URL",
  // Webhook de la automatización de nutrición (secuencia de emails). Se dispara
  // en paralelo al enviar el formulario. Déjalo vacío ("") si no quieres usarlo.
  nurtureWebhookUrl: "PEGA_AQUI_TU_WEBHOOK_DE_NUTRICION",
  // URL pública de tu calendario de reservas (p. ej. GoHighLevel, Calendly...).
  calendarUrl: "PEGA_AQUI_TU_URL_DE_CALENDARIO",

  whatsappNumber: "+340000000000",
  // Sustituye el número (sin "+") y el texto pre-rellenado del mensaje.
  // Genérico: botón flotante, modal de salida y CTA final.
  whatsappUrl:
    "https://wa.me/340000000000?text=Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n.",
  // Se abre solo al enviar la auditoría. Va aparte porque ahí el visitante
  // acaba de darnos sus datos y pedir "más información" no tendría sentido.
  // Texto: "Hola, acabo de rellenar el formulario de auditoría."
  whatsappUrlAfterForm:
    "https://wa.me/340000000000?text=Hola%2C%20acabo%20de%20rellenar%20el%20formulario%20de%20auditor%C3%ADa.",

  // El menú de la cabecera. El orden es el que ve el visitante; si añades
  // páginas propias, se añaden aquí.
  nav: [
    { label: "Nosotros", href: "/#nosotros" },
    { label: "Casos", href: "/#casos" },
    { label: "Servicios", href: "/#servicios" },
    { label: "Proceso", href: "/#proceso" },
  ],

  // Rutas donde NO debe aparecer el modal de salida. Tiene sentido excluir
  // las que ya piden datos, y cualquier página cuyo argumento sea justamente
  // que no pides nada a cambio.
  exitIntentSkipPaths: ["/auditoria"],

  // Aparecen en la columna "Contacto" del footer. Deja en "" las que no uses.
  social: {
    linkedin: "https://www.linkedin.com/in/TU_USUARIO/",
    youtube: "https://www.youtube.com/@TU_CANAL",
    instagram: "https://www.instagram.com/TU_USUARIO/",
  },
};
