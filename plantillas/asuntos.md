# Asuntos y preheaders

Fuente única de los **asuntos** (subject) y **preheaders** (preview text) de todas
las plantillas. GHL te pide los dos campos justo antes de enviar, así que aquí
están juntos y en bloques sueltos para copiar y pegar sin arrastrar formato.

Coinciden con el `<title>` y el `<span class="preheader">` de cada HTML. Si
cambias uno, cambia también el otro para que no se desincronicen.

---

## Secuencia de nutrición (`emails/`)

### 01 - Bienvenida.html

Asunto:
```
Hemos recibido tu solicitud de auditoría
```
Preheader:
```
Tu auditoría gratuita está reservada para ti. Solo falta que elijas el hueco que mejor te venga.
```

### 02 - Problemas.html

Asunto:
```
Si te pasa esto, te entendemos perfectamente
```
Preheader:
```
Tu equipo pierde horas en tareas que una máquina haría sola. No es culpa vuestra.
```

### 03 - Error.html

Asunto:
```
El error más común con la IA
```
Preheader:
```
Comprar la herramienta de moda antes de entender el problema. El error que más caro sale.
```

### 04 - Dudas.html

Asunto:
```
Las 5 dudas más comunes
```
Preheader:
```
¿Necesito equipo técnico? ¿Cuánto tarda? ¿Cuánto cuesta? Respuesta directa, sin rodeos.
```

### 05 - Testimonios.html

Asunto:
```
Lo que dicen las empresas con las que trabajamos
```
Preheader:
```
Equipos reales que recuperaron horas cada semana. Esto es lo que dicen.
```

### 06 - Enfoque.html

Asunto:
```
Por qué lo hacemos así
```
Preheader:
```
Si algo no aporta valor, te lo decimos. Esa es la regla con la que trabajamos.
```

### 07 - Limites.html

Asunto:
```
Lo que NO vas a conseguir con nosotros
```
Preheader:
```
No hacemos magia ni IA para todo. Pero sí construimos sistemas que funcionan de verdad.
```

### 08 - Motivo.html

Asunto:
```
No es por la tecnología
```
Preheader:
```
Automatizar no va de la tecnología. Va de devolverle a tu equipo el tiempo y la cabeza.
```

### 09 - Origen.html

Asunto:
```
Cómo empezamos
```
Preheader:
```
No nacimos vendiendo IA. Nacimos hartos de ver a buenos equipos perder el tiempo.
```

### 10 - Cierre.html

Asunto:
```
Si no es para ti, no pasa nada
```
Preheader:
```
Gracias por haber llegado hasta aquí. Si cambia el contexto, la puerta sigue abierta.
```

### Confirmacion.html

Asunto:
```
Tu auditoría está confirmada
```
Preheader:
```
Auditoría confirmada. Conéctate 2 minutos antes con auriculares y ven con tu caso en mente.
```

### Recordatorio.html

Asunto:
```
Tu auditoría sigue reservada
```
Preheader:
```
30 minutos para ver qué puedes automatizar. Antes de que la semana te coma la agenda.
```

---

## Transaccionales (`utils/`)

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

## Notas

- **Longitud.** Gmail y Outlook cortan el asunto sobre los **45-50 caracteres en
  móvil**. Los de arriba están todos por debajo salvo `5-testimonios`, que se ve
  entero en escritorio pero se corta en móvil — la primera mitad ya se entiende.
- **Sin emojis ni mayúsculas gritadas.** Es correo B2B y la plantilla es sobria;
  un 🚀 en el asunto desentona con el diseño y dispara filtros de spam.
- **No repitas asunto y preheader.** Si el cliente ve la misma frase dos veces
  pierdes la segunda línea de venta, que es la que decide la apertura.
