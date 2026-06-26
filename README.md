# Web de Agencia de IA — Plantilla White Label

Plantilla completa de una web corporativa para una **agencia / consultora de
Inteligencia Artificial**, automatización y software a medida. Está pensada para
que la clones, cambies un puñado de placeholders y la tengas en producción en
minutos.

Construida con un stack moderno orientado a calidad de animación, SEO y
mantenibilidad.

**Demo en vivo:** [https://northscale.es](https://northscale.es) — esta es la web
real construida con este mismo código (con la marca NorthScale). La plantilla que
descargas viene sin esos datos para que la hagas tuya.

> Esta es una versión **white label**: todos los datos de marca, contactos y
> webhooks están como placeholders (`TU MARCA`, `tudominio.com`,
> `PEGA_AQUI_TU_WEBHOOK_URL`, etc.). Sustitúyelos por los tuyos siguiendo el
> [checklist de personalización](#checklist-de-personalizacion).

## Stack

- **Next.js 16** (App Router, RSC, Turbopack) con TypeScript estricto
- **Tailwind CSS v4** con design tokens centralizados en `globals.css`
- **Framer Motion** para reveals, transiciones y micro-interacciones
- **GSAP** + **Swiper** para el carrusel de proceso
- **Lenis** para smooth scroll global
- **react-hook-form + zod** para los formularios de auditoría y contacto

## Arranque rápido

```bash
npm install     # instala dependencias
npm run dev     # arranca en http://localhost:3000
npm run build   # build de producción
npm run start   # sirve la build
npm run lint    # lint
```

## Checklist de personalización

Casi todo se cambia desde **un solo archivo**:
[`src/lib/content.ts`](./src/lib/content.ts). Ahí vive el objeto `site` y toda
la copy de la web.

### 1. Datos de marca y contacto (`src/lib/content.ts` → objeto `site`)

| Campo            | Qué es                                              |
|------------------|-----------------------------------------------------|
| `name`           | Nombre de tu marca (aparece en logo, hero, footer)  |
| `legalEntity`    | Razón social (páginas de privacidad y términos)     |
| `domain`         | Tu dominio, sin `https://` (usado en SEO/metadata)  |
| `email`          | Email de contacto                                   |
| `webhookUrl`     | **Webhook que recibe los formularios** (ver abajo)  |
| `whatsappNumber` | Tu número de WhatsApp                                |
| `whatsappUrl`    | Enlace `wa.me` con mensaje pre-rellenado            |

### 2. Calendario y redes sociales (`src/lib/content.ts`)

- `finalCTA.calendarUrl` → URL pública de tu calendario de reservas
  (GoHighLevel, Calendly, etc.).
- `footer.columns` → enlaces de **LinkedIn**, **YouTube** e **Instagram**
  (cambia `TU_USUARIO` / `TU_CANAL`).

### 3. Conexión del formulario (webhook)

Los formularios ([`AuditForm`](./src/components/AuditForm.tsx) y
[`ContactForm`](./src/components/ContactForm.tsx)) hacen un `POST` con los datos
a `site.webhookUrl`. Solo tienes que pegar ahí la URL de tu webhook (por
ejemplo el "Inbound Webhook" de un workflow de GoHighLevel) y empezarás a
recibir los leads.

Si prefieres recibir los leads por email en lugar de (o además de) un webhook,
el endpoint [`src/app/api/contact/route.ts`](./src/app/api/contact/route.ts)
valida los datos con zod y trae un bloque comentado listo para **Resend**:

1. `npm install resend`
2. Descomenta el bloque y añade en `.env.local`:
   ```bash
   RESEND_API_KEY=re_...
   CONTACT_TO=hola@tudominio.com
   ```

### 4. Assets de marca (`public/`)

Reemplaza estas imágenes por las tuyas (manteniendo el nombre de archivo):

- `favicon.png` y `apple-touch-icon.png` → tu favicon
- `banner.png` → imagen Open Graph (1200×630) para redes
- `logo.png` → logo opcional (el logo del header es texto vía `site.name`, así
  que cambiarlo no es obligatorio)

> El logo del header se renderiza como texto a partir de `site.name`, por lo que
> con cambiar `site.name` ya queda actualizado en toda la web.

### 5. Contenido y diseño

- **Textos**: toda la copy (servicios, FAQ, testimonios, casos, proceso...) está
  en [`src/lib/content.ts`](./src/lib/content.ts).
- **Colores y fuentes**: design tokens en
  [`src/app/globals.css`](./src/app/globals.css) dentro del bloque `@theme`.
- **Imágenes decorativas**: vienen de Unsplash. El dominio está permitido en
  [`next.config.ts`](./next.config.ts); si usas otra fuente, añádela ahí.

## Estructura

```
src/
  app/
    layout.tsx               Layout root, metadata SEO, fuentes, smooth scroll
    page.tsx                 Home (compone todas las secciones)
    globals.css              Design tokens (Tailwind v4) + utilidades + animaciones
    not-found.tsx            Página 404
    auditoria/page.tsx       Página de auditoría con formulario completo
    contacto/page.tsx        Página de contacto
    privacidad/page.tsx      Política de privacidad
    terminos/page.tsx        Términos y condiciones
    api/contact/route.ts     Endpoint del formulario (POST /api/contact)
  components/
    Navbar.tsx               Header sticky con menú móvil
    Footer.tsx               Footer con marquesina y columnas
    Logo.tsx                 Wordmark basado en site.name
    SmoothScroll.tsx         Wrapper Lenis
    Reveal.tsx               Animaciones de aparición al scroll
    Marquee.tsx              Marquesina infinita reusable
    AuroraCanvas.tsx         Fondo animado en canvas
    AuditForm.tsx            Formulario de auditoría
    ContactForm.tsx          Formulario de contacto
    ExitIntentModal.tsx      Modal al intentar salir
    WhatsAppFloat.tsx        Botón flotante de WhatsApp
    ui/Button.tsx            Botón con variantes
    sections/                Secciones de la home (Hero, About, Services, etc.)
  lib/
    content.ts               Config (objeto site) + TODA la copy de la web
    fonts.ts                 Carga de fuentes vía next/font
    utils.ts                 Helper cn() (clsx + tailwind-merge)
public/                      Logos, favicon, banner OG
```

## Despliegue

Optimizado para [Vercel](https://vercel.com):

1. Sube el proyecto a tu repositorio de GitHub.
2. Impórtalo en Vercel y despliega — sin configuración adicional.
3. (Opcional) Añade las variables de entorno `RESEND_API_KEY` y `CONTACT_TO`
   si activas el envío de emails con Resend.

## Notas

- No incluye ningún script de tracking ni píxeles de publicidad. Si quieres
  analítica (Google Analytics, Meta Pixel, etc.) tendrás que añadirla tú.
- `prefers-reduced-motion` se respeta: smooth scroll y animaciones se desactivan
  para usuarios que lo prefieren.
