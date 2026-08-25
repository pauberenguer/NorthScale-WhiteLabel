# Facturación

Las siete plantillas del ciclo de cobro. Sustituyen a las *Default* de GHL, que
van en inglés y con otro diseño.

- `Factura Enviada.html` — envío de una factura, con botón de pago.
- `Estimación Enviada.html` — envío de una estimación, con botón para revisarla.
- `Error en la Factura.html` — un pago manual ha fallado; botón para reintentar.
- `Información del Pago Automático.html` — aviso previo de un cargo automático
  (importe, fecha y tarjeta). Solo informativo, sin botón.
- `Cambio en el Pago Automático.html` — el importe de la suscripción ha
  cambiado. Solo informativo, sin botón.
- `Error en el Pago Automático.html` — un cargo automático ha fallado; botón
  para completar el pago desde la factura.
- `Programación de Pago Recibida.html` — recordatorio del siguiente plazo de un
  plan de pagos, con desglose (total, pagado, plazo actual) y botón de pago.

## Dónde se asignan en GHL

**Pagos → Invoices & Estimates → Settings** (la URL acaba en
`/payments/invoice/settings`). Cada evento tiene su desplegable de plantilla y
su campo de asunto:

| Evento | Plantilla |
|---|---|
| Factura enviada | `Factura Enviada.html` |
| Estimación enviada | `Estimación Enviada.html` |
| Error en la factura | `Error en la Factura.html` |
| Información de pago automático | `Información del Pago Automático.html` |
| El importe del pago automático ha cambiado | `Cambio en el Pago Automático.html` |
| Error en el pago automático | `Error en el Pago Automático.html` |
| Programación de pago recibida | `Programación de Pago Recibida.html` |

El asunto y el preheader de cada una están en [`./asuntos.md`](./asuntos.md).

## Valores personalizados que usan

Configúralos siguiendo
[`../valores-personalizados.md`](../valores-personalizados.md).

| Key | Dónde |
|---|---|
| `{{custom_values.logo_marca}}` | Cabecera de las 7 |
| `{{custom_values.nombre_marca}}` | Cabecera, firma y footer de las 7 |
| `{{custom_values.representante_empresa}}` | Firma de las 7 |
| `{{custom_values.cargo_representante}}` | Firma de las 7 |
| `{{custom_values.email_marca}}` | Footer de las 7, en el `mailto:` **y** en el texto visible |

> **Estos correos no salen de un workflow, sino del módulo de Pagos**, y no está
> garantizado que GHL resuelva ahí `{{custom_values...}}`. Como resuelve a
> cadena vacía lo que no reconoce, un fallo no se vería como texto literal: se
> vería como un logo roto y un footer sin email. Envíate una factura de prueba
> antes de darlas por buenas. Estado de las pruebas en
> [`../valores-personalizados.md`](../valores-personalizados.md).

## Merge fields de GHL

Cada evento resuelve sus propios campos, así que **cada plantilla usa solo los
que GHL rellena en su plantilla *Default* equivalente** (comprobado plantilla a
plantilla). Los botones llevan `{{invoiceURL}}` o `{{estimateURL}}`; como con
`{{document.url}}`, la URL aparece **tres veces** por plantilla (botón MSO,
botón normal y enlace de respaldo).

| Campo | Dónde | Qué pinta |
|---|---|---|
| `{{receiverFirstName}}` | Las 7 | Nombre del cliente |
| `{{subAccountName}}` | Factura, Estimación, Programación | Nombre de tu negocio |
| `{{invoiceNumber}}` | Factura Enviada | Número de factura |
| `{{estimateNumber}}` | Estimación Enviada | Número de estimación |
| `{{invoiceName}}` | Errores y pagos automáticos | Nombre de la factura |
| `{{totalAmount}}` | Las 7 | Importe total |
| `{{dueDate}}` | Factura, pagos automáticos | Fecha de vencimiento/cargo |
| `{{expiryDate}}` | Estimación Enviada | Validez de la estimación |
| `{{currentTimestamp}}` | Error en la Factura | Momento del intento fallido |
| `{{cardName}}` / `{{cardLast4}}` | Información del Pago Automático | Tarjeta y últimos 4 dígitos |
| `{{invoice.amount_paid}}` | Programación de Pago | Pagado hasta ahora |
| `{{invoice.paymentSchedule.currentScheduleNumber}}` | Programación | Número del plazo |
| `{{invoice.paymentSchedule.currentScheduleDueDate}}` | Programación | Vencimiento del plazo |
| `{{invoice.paymentSchedule.amountDue}}` | Programación | Importe del plazo |
| `{{invoiceURL}}` | Botones de factura | Enlace para ver/pagar |
| `{{estimateURL}}` | Botón de estimación | Enlace para revisar/aceptar |

En `Factura Enviada` y `Estimación Enviada` el vencimiento va dentro de un
condicional `{{#if dueDate}}…{{/if}}` / `{{#if expiryDate}}…{{/if}}` (igual que
en las *Default* de GHL): si la factura no tiene vencimiento, la frase
desaparece en vez de quedar coja. Merece la pena probar una factura con fecha y
otra sin ella.

`Programación de Pago Recibida` es la única que usa rutas con punto
(`{{invoice.paymentSchedule.amountDue}}`) en lugar del formato plano del resto,
así que es la que más conviene probar si vas a usar planes de pago en serio.
