# Contratos

Las dos plantillas del ciclo de firma de documentos.

- `Contrato Enviado.html` — envío del documento para firma.
- `Contrato Firmado.html` — confirmación al destinatario cuando ya lo ha firmado.

## Dónde se asignan en GHL

**Pagos → Documents & Contracts → Settings → Customer Notifications.** Ahí solo
eliges asunto y plantilla de un desplegable:

- *Document Received Notification* → `Contrato Enviado.html`
- *Document Signed Notification* → `Contrato Firmado.html`

En esa misma pantalla hay dos avisos más que puedes cubrir si te hacen falta:
*Document Expiry Warning* (un día antes de caducar) y *Team: Document Signed
Alert* (interno para tu equipo).

El asunto y el preheader de cada una están en [`./asuntos.md`](./asuntos.md),
junto con la variante del asunto con el nombre del destinatario.

## Valores personalizados que usan

Configúralos siguiendo
[`../valores-personalizados.md`](../valores-personalizados.md).

| Key | Dónde |
|---|---|
| `{{custom_values.logo_marca}}` | Cabecera de las dos |
| `{{custom_values.nombre_marca}}` | Cabecera, firma y footer |
| `{{custom_values.representante_empresa}}` | Firma de las dos |
| `{{custom_values.cargo_representante}}` | Firma de las dos |
| `{{custom_values.email_marca}}` | Footer de las dos, en el `mailto:` **y** en el texto visible |

> **Estos correos no salen de un workflow, sino del módulo de Pagos**, y no está
> garantizado que GHL resuelva ahí `{{custom_values...}}`. Como resuelve a
> cadena vacía lo que no reconoce, un fallo no se vería como texto literal: se
> vería como un logo roto y un footer sin email. Envíate un contrato de prueba
> antes de darlas por buenas. Estado de las pruebas en
> [`../valores-personalizados.md`](../valores-personalizados.md).

## Merge fields de GHL

| Campo | Dónde | Qué pinta |
|---|---|---|
| `{{document.recipient.firstName}}` | Las dos | Nombre del destinatario |
| `{{document.recipient.lastName}}` | Enviado | Apellidos del destinatario |
| `{{document.name}}` | Las dos | Nombre del documento/contrato |
| `{{document.url}}` | Enviado | Enlace para ver y firmar |
| `{{document.pdfLink}}` | Firmado | Descarga del PDF ya firmado |

> **El enlace del documento es `{{document.url}}`, no `{{document.link}}`.**
> Confirmado mirando la plantilla **Default - Document Sent** de GHL: el campo
> *URL del enlace* de su botón usa `{{document.url}}`. Con `{{document.link}}`
> el botón llevaba a `http://""/`, porque GHL resuelve a cadena vacía los tokens
> que no reconoce, en vez de dejarlos literales.
>
> Aparece **tres veces** en la plantilla (botón MSO, botón normal y enlace de
> respaldo). Si alguna vez lo cambias, cámbialas las tres.
