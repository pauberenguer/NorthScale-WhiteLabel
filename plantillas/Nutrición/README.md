# Nutrición

La secuencia de nutrición, de `01 - Bienvenida` a `10 - Cierre`. Se envían en
orden desde un workflow, después de que el contacto pida la auditoría.

Los correos de confirmación que se disparan por un evento concreto del embudo
(formulario enviado, llamada reservada) no están aquí, están en
[`../Agenda/`](../Agenda/): no ocupan un lugar fijo en la
secuencia.

## Asuntos y preheaders

En [`./asuntos.md`](./asuntos.md), en bloques listos para copiar y pegar.

## Valores personalizados que usan

Configúralos siguiendo
[`../valores-personalizados.md`](../valores-personalizados.md) y las diez quedan
listas, sin tocar el HTML.

| Key | Dónde |
|---|---|
| `{{custom_values.logo_marca}}` | Cabecera de las 10 |
| `{{custom_values.nombre_marca}}` | Cabecera, firma y footer de las 10 |
| `{{custom_values.representante_empresa}}` | Firma de las 10 |
| `{{custom_values.cargo_representante}}` | Firma de las 10 |
| `{{custom_values.enlace}}` | Botón de las 10 |

`09 - Origen` usa `nombre_marca` una cuarta vez, dentro del texto.

Es el bloque que **ya está probado**: las plantillas salen de un workflow y los
valores personalizados resuelven sin problema.
