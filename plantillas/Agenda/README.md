# Agenda

Las dos confirmaciones del embudo de reserva. Se disparan por un evento
concreto, no por su posición en la secuencia, y por eso no van numeradas ni
viven en [`../Nutrición/`](../Nutrición/).

- `Formulario Rellenado.html` — al enviar el formulario de auditoría. Confirma
  la solicitud y empuja a elegir hueco.
- `Llamada Agendada.html` — cuando el contacto reserva. Confirma la sesión y da
  salida para reagendar por WhatsApp.

## Asuntos y preheaders

En [`./asuntos.md`](./asuntos.md), en bloques listos para copiar y pegar.

## Valores personalizados que usan

Configúralos siguiendo
[`../valores-personalizados.md`](../valores-personalizados.md).

| Key | Dónde |
|---|---|
| `{{custom_values.logo_marca}}` | Cabecera de las dos |
| `{{custom_values.nombre_marca}}` | Cabecera, firma y footer de las dos |
| `{{custom_values.representante_empresa}}` | Firma de las dos |
| `{{custom_values.cargo_representante}}` | Firma de las dos |
| `{{custom_values.enlace}}` | Botón de `Formulario Rellenado` |
| `{{custom_values.whatsapp_marca}}` | Enlace «Necesito Reagendar» de `Llamada Agendada` |

## Merge fields de GHL

| Campo | Dónde | Qué pinta |
|---|---|---|
| `{{appointment.meeting_location}}` | `Llamada Agendada` | Sala de la reunión |

`Llamada Agendada` no usa `{{custom_values.enlace}}` en su botón precisamente
por esto: el enlace no es el del calendario, es el de la sala ya reservada.

> **Prueba el enlace de WhatsApp haciendo clic, no mirando el correo.** Es el
> único sitio donde aparece `whatsapp_marca`, y la plantilla le añade detrás el
> `?text=…` con el mensaje prellenado. Si el valor estuviera vacío, el enlace
> quedaría en `?text=Hola…` y no llevaría a ninguna parte, pero a simple vista
> el correo se vería perfecto.
