# Auxiliares

Las plantillas sueltas que no encajan en ningún bloque: no son secuencia, no son
del embudo de reserva y no salen de una pantalla de Pagos. Cuando aparezca una
nueva de este tipo, su sitio es esta carpeta.

- `Accesos.html` — bienvenida al arrancar, con el formulario de recogida de accesos.
- `Método de Pago.html` — pide al cliente que cambie o actualice la forma de
  pago de un cobro recurrente, con enlace a la pasarela.
- `Propuesta.html` — envío de una propuesta, que viaja adjunta en PDF.
- `Segundo Aviso.html` — el seguimiento de `Método de Pago`, a los dos días,
  para quien no la ha resuelto.
- `Tarea Pendiente.html` — recordatorio de una tarea que vence al día siguiente.

`Tarea Pendiente` es **informativa y sin botón**, como `Información del Pago
Automático`: una tarea de GHL no tiene URL pública que enseñarle al cliente, así
que el correo avisa y deja la respuesta al propio email como única salida.

## Para quién es `Tarea Pendiente`

Está escrita **para el cliente**, no para tu equipo: lleva cabecera de marca,
firma y footer con el «recibes este email porque…», igual que las otras 23. Si
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
| `{{custom_values.metodo_pago}}` | Botón de `Método de Pago` y de `Segundo Aviso` |

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
`{{custom_values.formulario_accesos}}`.

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

---

## `Método de Pago`

Pide al cliente que cambie los datos con los que se le cobra un pago
recurrente. El botón lleva a `{{custom_values.metodo_pago}}`.

**No es lo mismo que `Error en el Pago Automático`.** Aquella la dispara el
módulo de Pagos cuando un cargo ya ha fallado, y manda a la factura para
pagarla. Esta es la proactiva: se envía *antes* de que haya un problema —una
tarjeta que caduca el mes que viene, un cliente que te avisa de que cambia de
banco— y manda a actualizar la forma de pago, no a pagar nada.

Va **por workflow** (Automatización → Workflows). No hay pantalla de Settings
que la asigne, porque los siete huecos de *Invoices & Estimates* son eventos
fijos de GHL y ninguno es este.

### A dónde apunta el enlace

`metodo_pago` guarda **una URL donde el cliente introduce sus datos él mismo**.
De dónde la sacas depende de tu pasarela: el portal de cliente de Stripe genera
un enlace para esto, y si cobras de otra forma sirve cualquier página tuya que
recoja los datos de forma segura.

**Si no tienes una URL así, esta plantilla no es la que quieres.** Un valor sin
rellenar no se ve como texto literal: se ve como un botón que no lleva a ningún
sitio, y en un correo de pagos eso parece una estafa. Dilo y te la dejo sin
botón, pidiendo que respondan al correo para que les llames.

### Decisiones de la copy

- **Sirva para los tres motivos.** Tarjeta caducada, tarjeta bloqueada o cambio
  pedido por el cliente. El correo los nombra los tres y resuelve igual, así no
  hacen falta tres plantillas ni un merge field que explique el porqué.
- **Avisa de que no manden la tarjeta por email**, igual que `Accesos` hace con
  las contraseñas y por lo mismo: Responder al correo con los datos es la
  reacción natural, y deja un número de tarjeta guardado para siempre en dos
  bandejas de entrada.
- **Dice que no cambia ni el importe ni la fecha.** Es lo primero que teme
  quien lee un correo tuyo hablando de su forma de pago.
- **Da salida a que la facturación la lleve otra persona.** En una empresa el
  que firma no suele ser el que paga, así que el correo invita a reenviarlo.
- **El footer no cierra con el «si no esperabas este correo» de las demás.**
  Este email es exactamente lo que imita un phishing, así que dice lo contrario
  de lo que diría un phishing: Si dudas, no abras el enlace y escríbenos.

### Merge fields

| Campo | Qué pinta |
|---|---|
| `{{contact.first_name}}` | Nombre del cliente |

Solo ese, como `Accesos` y `Propuesta`. Todo lo demás son valores
personalizados.

---

## `Segundo Aviso`

El segundo toque, **dos días después** de `Método de Pago`, para quien no ha
actualizado todavía. Mismo enlace, mismo botón y misma caja: lo que cambia es
la copy.

### Cómo se monta el retraso

**En el mismo workflow que la primera, no en uno aparte.** Debajo de la acción
que envía `Método de Pago`, encadena:

1. **Wait — 2 días.** Ábrele la ventana horaria del paso de espera (por ejemplo
   de 9:00 a 18:00, de lunes a viernes) o el recordatorio saldrá a la hora a la
   que entró el contacto, que puede ser las tres de la mañana de un domingo.
2. **If/Else — ¿ya lo ha resuelto?** La rama de «sí» termina el workflow; la de
   «no» envía el recordatorio.
3. **Send Email — `Segundo Aviso`.**

### Cómo sabe GHL que ya lo ha hecho

Aquí está la parte fea, y conviene saberla antes de montarlo: **GHL no se entera
por su cuenta de que el cliente ha cambiado la tarjeta en tu pasarela.** Tienes
que decírselo tú. Dos formas, de mejor a peor:

- **Una etiqueta.** Cuando veas el método de pago nuevo, le pones al contacto
  una etiqueta (`pago-actualizado` o como la llames) y la condición del paso 2
  la mira. Es manual, pero es lo único que de verdad significa «resuelto».
- **El clic en el enlace**, si montas `metodo_pago` como *trigger link* de GHL.
  Se automatiza solo, pero **un clic no es un cambio**: alguien que abre el
  enlace y abandona a mitad se queda sin recordatorio justo cuando más falta le
  hace.

Y en cualquiera de los dos casos, **añade la etiqueta a un paso de *Remove From
Workflow*.** Sin eso, un cliente que actualiza el mismo día que le pediste el
cambio recibe igualmente el recordatorio dos días después, diciéndole que sigue
pendiente. Es el fallo que más caro sale en un correo de pagos: le estás
diciendo a alguien que te ha pagado que no te ha pagado.

### Uno, y solo uno

**No encadenes un tercer correo.** A los cuatro días de silencio el problema ya
no es que no haya visto el email; es que no lo va a resolver por email. Ahí toca
una llamada, y por eso el recordatorio da salida a responder al correo.

### Decisiones de la copy

- **Es más corto que el primero**, a propósito: unos 800 caracteres frente a
  1.000. Nadie lee dos veces el mismo correo, así que el segundo va al grano y
  se apoya en que el contexto ya lo dio el primero.
- **Abre dando por buena la posibilidad de que ya esté hecho.** «Si ya lo has
  hecho, ignora este correo», igual que `Tarea Pendiente`. Cubre el hueco entre
  lo que sabe tu CRM y lo que ha hecho el cliente, que con la etiqueta manual
  puede ser de horas.
- **Dice qué pasa si no lo resuelve, sin amenazar.** Describe la consecuencia
  real y encadenada: El cargo fallará y le llegará el correo de
  `Error en el Pago Automático`, ese sí con una factura sin pagar dentro.
- **Ofrece salir del email.** Después de dos días de silencio, lo que convierte
  es dar otra vía: responder al correo. Con el recordatorio de que la tarjeta,
  por ahí, no.

### Merge fields

| Campo | Qué pinta |
|---|---|
| `{{contact.first_name}}` | Nombre del cliente |

Los mismos que `Método de Pago`, porque es el mismo correo en segunda vuelta.
