# Auxiliares

Las plantillas sueltas que no encajan en ningún bloque: no son secuencia, no son
del embudo de reserva y no salen de una pantalla de Pagos. Cuando aparezca una
nueva de este tipo, su sitio es esta carpeta.

- `Accesos.html` — bienvenida al arrancar, con el formulario de recogida de accesos.
- `Propuesta.html` — envío de una propuesta, que viaja adjunta en PDF.
- `Tarea Pendiente.html` — recordatorio de una tarea que vence al día siguiente.

`Tarea Pendiente` es **informativa y sin botón**, como `Información del Pago
Automático`: una tarea de GHL no tiene URL pública que enseñarle al cliente, así
que el correo avisa y deja la respuesta al propio email como única salida.

## Para quién es `Tarea Pendiente`

Está escrita **para el cliente**, no para tu equipo: lleva cabecera de marca,
firma y footer con el «recibes este email porque…», igual que las otras 21. Si
lo que quieres es avisar a la persona que tiene la tarea asignada, esta no es la
plantilla — un aviso interno no necesita nada de eso y se resuelve con la
notificación nativa de GHL.

## Dónde se asigna en GHL

No hay pantalla de Settings para esto, como sí la hay en Contratos y
Facturación: **va en un workflow** (Automatización → Workflows), igual que
`Nutrición` y `Agenda`. El workflow tiene que dispararse **un día antes** de la
fecha de vencimiento de la tarea.

Comprueba en tu versión de GHL cuál de las dos rutas tienes disponible: un
trigger propio de recordatorio de tarea, o un trigger al crearse la tarea
seguido de un paso de espera calculado sobre la fecha de vencimiento.

El asunto y el preheader están en [`./asuntos.md`](./asuntos.md), junto con una
variante que mete el nombre de la tarea en el asunto.

## Valores personalizados que usa

Configúralos siguiendo
[`../valores-personalizados.md`](../valores-personalizados.md).

| Key | Dónde |
|---|---|
| `{{custom_values.logo_marca}}` | Cabecera |
| `{{custom_values.nombre_marca}}` | Cabecera, firma y footer |
| `{{custom_values.representante_empresa}}` | Firma |
| `{{custom_values.cargo_representante}}` | Firma |
| `{{custom_values.email_marca}}` | Footer, en el `mailto:` **y** en el texto visible |

Va por workflow, que es el contexto **ya probado** con `01 - Bienvenida`, así
que los valores personalizados deberían resolver sin sorpresas.

## Merge fields de `Tarea Pendiente`

| Campo | Qué pinta |
|---|---|
| `{{contact.first_name}}` | Nombre del cliente |
| `{{task.title}}` | Nombre de la tarea |
| `{{task.due_date}}` | Fecha de vencimiento |

La fecha va sola en la caja, sin un «Vence el» delante: si el correo sale de una
prueba sin tarea asociada y la fecha viene vacía, no queda una frase a medias.

---

## `Propuesta`

**No explica la propuesta, y es a propósito.** El documento va adjunto y es
quien lleva el alcance, los plazos y el precio; el correo solo dice que está
ahí, lo enmarca y pide respuesta. Si el email resumiera la propuesta, el cliente
decidiría sobre el resumen y no sobre el documento.

Tampoco lleva botón: un adjunto no se puede enlazar. La caja central hace de
señal visual de que hay un PDF que abrir, y por eso no usa ningún merge field —
así no puede salir vacía.

### Cómo adjuntar el PDF

En la acción *Send Email* del workflow hay campo de adjunto. Ahora bien, **si
cada propuesta es un PDF distinto, un adjunto fijo en el workflow no te vale**:
mandaría el mismo documento a todo el mundo. Dos salidas:

- Enviar el correo a mano desde *Conversaciones*, eligiendo esta plantilla y
  adjuntando el PDF de ese cliente. Es lo normal para propuestas.
- Subir el PDF a algún sitio y enlazarlo. Eso ya es otra plantilla: querrías
  botón, y la caja central pasaría a ser un enlace.

### Merge fields

| Campo | Qué pinta |
|---|---|
| `{{contact.first_name}}` | Nombre del cliente |

Solo ese, y es el mismo que ya funciona en las otras plantillas de workflow.
Nada que verificar aquí.

### Si quieres añadirle un botón

Tienes `{{custom_values.llamada_de_avance}}` configurado. Un CTA de «reservar
hueco para comentarla» encajaría justo debajo de la caja. No lo he puesto porque
no me lo pediste; dilo y lo añado.

---

## `Accesos`

El correo de bienvenida que abre el trabajo: da la entrada y pide, de una sola
vez, los accesos a las herramientas del cliente. El botón lleva a
`{{custom_values.enlace_formulario_accesos}}`.

Va **por workflow** (Automatización → Workflows), disparado cuando el cliente
pasa a activo: contrato firmado, primer pago, o la etiqueta que uses para
marcarlo. No hay pantalla de Settings que lo asigne.

### Decisiones de la copy

- **Avisa de que no manden contraseñas por email**, y explica por qué. Es la
  reacción natural del cliente —responder al correo con los datos— y la que
  quieres evitar: un email con credenciales se queda para siempre en dos
  bandejas de entrada.
- **Da salida a los accesos incompletos.** Si uno depende de un tercero, el
  cliente tiende a no enviar nada hasta tenerlo todo. La última línea le dice
  explícitamente que mande lo que tenga.
- **Sin adjetivos con género.** «Te damos la bienvenida» en vez de
  «bienvenido», porque la plantilla la va a usar cualquiera con cualquier
  cliente.

### Merge fields

| Campo | Qué pinta |
|---|---|
| `{{contact.first_name}}` | Nombre del cliente |

Igual que `Propuesta`: solo el nombre, que es el merge field ya probado en las
plantillas de workflow. Todo lo demás son valores personalizados.
