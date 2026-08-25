# Asuntos y preheaders — Facturación

Los **asuntos** (subject) y **preheaders** (preview text) de las siete
plantillas de esta carpeta. En Facturación el asunto no se escribe al enviar: se
configura una sola vez en *Pagos → Invoices & Estimates → Settings*, en el campo
que hay junto a cada desplegable de plantilla.

Coinciden con el `<title>` y el `<span class="preheader">` de cada HTML. Si
cambias uno, cambia también el otro para que no se desincronicen. Las reglas
comunes (longitud, emojis, no repetir asunto y preheader) están en
[`../README.md`](../README.md).

---

### Factura Enviada.html

Asunto:
```
Tu factura está lista
```
Preheader:
```
Puedes verla y pagarla online en un par de clics, sin registros ni descargas.
```

### Estimación Enviada.html

Asunto:
```
Tu estimación está lista
```
Preheader:
```
Revisa el detalle y el importe online. Si quieres ajustar algo, responde y lo vemos.
```

### Error en la Factura.html

Asunto:
```
Tu pago no se ha completado
```
Preheader:
```
No se ha realizado ningún cargo. Puedes reintentar el pago online en un minuto.
```

### Información del Pago Automático.html

Asunto:
```
Tu próximo pago automático
```
Preheader:
```
Importe, fecha y tarjeta del próximo cargo. No tienes que hacer nada.
```

### Cambio en el Pago Automático.html

Asunto:
```
El importe de tu pago automático ha cambiado
```
Preheader:
```
Te confirmamos el nuevo importe por escrito. Se aplica a partir del próximo cargo.
```

### Error en el Pago Automático.html

Asunto:
```
Tu pago automático no se ha completado
```
Preheader:
```
El cargo automático ha fallado y no se ha cobrado nada. Puedes completar el pago online.
```

### Programación de Pago Recibida.html

Asunto:
```
Recordatorio de tu plan de pagos
```
Preheader:
```
Tu próximo plazo está al caer: aquí tienes el importe, la fecha y el enlace para pagarlo.
```
