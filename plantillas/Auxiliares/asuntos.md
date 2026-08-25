# Asuntos y preheaders — Auxiliares

Los **asuntos** (subject) y **preheaders** (preview text) de las plantillas de
esta carpeta. Al ir por workflow, los dos campos se escriben al montar el correo
dentro de la automatización.

Coinciden con el `<title>` y el `<span class="preheader">` del HTML. Si cambias
uno, cambia también el otro para que no se desincronicen. Las reglas comunes
(longitud, emojis, no repetir asunto y preheader) están en
[`../README.md`](../README.md).

---

### Tarea Pendiente.html

Asunto:
```
Recordatorio: tu tarea vence mañana
```
Preheader:
```
Vence mañana. Si ya la tienes resuelta, puedes ignorar este correo.
```

Variante con el nombre de la tarea dentro del asunto (concreta más, pero
comprueba antes que el merge field resuelve; si va vacío queda un asunto cojo):
```
Recordatorio: {{task.title}} vence mañana
```

### Accesos.html

Asunto:
```
Empezamos. Solo nos faltan tus accesos
```
Preheader:
```
Un formulario corto para darnos acceso a tus herramientas. Se rellena en cinco minutos.
```

### Propuesta.html

Asunto:
```
Aquí tienes tu propuesta
```
Preheader:
```
La tienes adjunta en PDF, con el alcance, los plazos y el precio.
```

Variante con el nombre del destinatario (mejora la apertura, y aquí el merge
field es seguro porque es el mismo que usa el saludo del correo):
```
{{contact.first_name}}, aquí tienes tu propuesta
```
