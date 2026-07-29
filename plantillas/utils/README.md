# Utils — Plantillas transaccionales

Plantillas HTML sueltas (no forman secuencia) que se disparan por un evento
concreto: envío de un contrato, de un documento, etc.

## Plantillas

- `Contrato Enviado.html` — envío del documento para firma.
- `Contrato Firmado.html` — confirmación al destinatario cuando ya lo ha firmado.

El asunto y el preheader de cada una están en [`../asuntos.md`](../asuntos.md),
listos para copiar y pegar.

## Cómo usarlas en GoHighLevel

El contenido y la asignación viven en sitios distintos, que es lo que despista:

1. **Marketing → Emails → Templates → Nueva plantilla → Código/HTML**. Pega el
   HTML. Repite para cada una.
2. **Payments → Documents & Contracts → Settings → Customer Notifications**.
   Ahí solo eliges asunto y plantilla de un desplegable:
   - *Document Received Notification* → `Contrato Enviado.html`
   - *Document Signed Notification* → `Contrato Firmado.html`

En esa pantalla hay dos avisos más que puedes cubrir si te hacen falta:
*Document Expiry Warning* (un día antes de caducar) y *Team: Document Signed
Alert* (interno para tu equipo).

## Merge fields usados

| Campo                              | Dónde        | Qué pinta                        |
|------------------------------------|--------------|----------------------------------|
| `{{document.recipient.firstName}}` | Las dos      | Nombre del destinatario          |
| `{{document.recipient.lastName}}`  | Contrato     | Apellidos del destinatario       |
| `{{document.name}}`                | Las dos      | Nombre del documento/contrato    |
| `{{document.url}}`                 | Contrato     | Enlace para ver y firmar         |
| `{{document.pdfLink}}`             | Firmado      | Descarga del PDF ya firmado      |

> **El enlace del documento es `{{document.url}}`, no `{{document.link}}`.**
> Confirmado mirando la plantilla **Default - Document Sent** de GHL: el campo
> *URL del enlace* de su botón usa `{{document.url}}`. Con `{{document.link}}`
> el botón llevaba a `http://""/`, porque GHL resuelve a cadena vacía los tokens
> que no reconoce, en vez de dejarlos literales.
>
> Aparece **tres veces** en la plantilla (botón MSO, botón normal y enlace de
> respaldo). Si alguna vez lo cambias, cámbialas las tres.

## Checklist de personalización

Busca y sustituye en `Contrato Enviado.html`:

| Placeholder         | Por                                                     |
|---------------------|---------------------------------------------------------|
| `URL_DE_TU_LOGO`    | URL **pública** de tu símbolo (ver abajo)               |
| `TU MARCA`          | Nombre de tu marca (1 vez, en la cabecera)              |
| `hola@tudominio.com`| Tu email de contacto (aparece 2 veces: href y texto)    |

## El logo de la cabecera

Cabecera de fondo blanco con el símbolo a 48px y el nombre de la marca debajo.

En un email **el `src` tiene que ser una URL pública `https://`**. Una ruta
local (`./logo.png`, `/public/logo.png`) o un adjunto no se ven en ningún
cliente, y base64 lo descarta Gmail. Súbelo a *Ajustes → Media Storage* en GHL,
copia el enlace público y pégalo en `URL_DE_TU_LOGO`.

**La cabecera es clara, así que el símbolo tiene que ser oscuro.** Un PNG blanco
desaparece; uno negro sobre fondo blanco opaco (como `public/logo.png` y
`public/sparkle.png` de este repo, donde solo las esquinas redondeadas son
transparentes) funciona bien aquí.

### Si prefieres la cabecera oscura

`assets/sparkle-white.png` (112×112, blanco sobre transparente, generado
invirtiendo `public/sparkle.png`) está para eso. Cambia `.logo-bar` a
`background-color: #1a1a1a`, `.logo-bar-text` a `color: #ffffff`, sube ese PNG
y usa su URL.

### Notas de maquetación del logo

- El `<img>` lleva `width`/`height` en atributo **y** en `style`: Outlook ignora
  el CSS y sin el atributo lo pintaría a 112px.
- `alt=""` a propósito: el nombre de la marca ya va en texto justo debajo, así
  que un `alt` con la marca lo diría dos veces con imágenes bloqueadas.
- Si no quieres imagen, borra el `<img>` y deja solo el
  `<p class="logo-bar-text">`. La banda sigue funcionando.

## Notas de maquetación

Mismo sistema que `../emails`: tablas + CSS inline-friendly, paleta
blanco/negro/gris, ancho 600px, botón con fallback VML para Outlook y media
query para móvil.
