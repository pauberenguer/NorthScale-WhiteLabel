# Asuntos y preheaders — Contratos

Los **asuntos** (subject) y **preheaders** (preview text) de las dos plantillas
de esta carpeta. En Contratos el asunto no se escribe al enviar: se configura
una sola vez en *Pagos → Documents & Contracts → Settings → Customer
Notifications*, en el campo que hay junto a cada desplegable de plantilla.

Las reglas comunes (longitud, emojis, no repetir asunto y preheader) están en
[`../README.md`](../README.md).

---

### Contrato Enviado.html

Asunto:
```
Tu contrato está listo para firmar
```
Preheader:
```
Tienes un documento listo para revisar y firmar. Se abre desde el navegador, sin instalar nada.
```

Variante con el nombre del destinatario (mejora la apertura, pero comprueba
antes que el merge field resuelve; si va vacío queda un asunto cojo):
```
{{document.recipient.firstName}}, tu contrato está listo para firmar
```

### Contrato Firmado.html

Asunto:
```
Documento firmado, aquí tienes tu copia
```
Preheader:
```
Tu firma ha quedado registrada. Aquí tienes tu copia en PDF, lista para descargar.
```

---

> **Ojo con el `<title>` de estas dos.** El preheader sí coincide con el HTML,
> pero el `<title>` no: dice «Tienes un documento pendiente de firma» y
> «Documento firmado correctamente», que no es lo que hay aquí arriba. No afecta
> a lo que ve el cliente (el asunto real es el que pongas en GHL, el `<title>`
> no lo lee ningún cliente de correo), pero si algún día unificas los textos,
> acuérdate de tocar los dos sitios.
