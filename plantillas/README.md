# plantillas

Las 24 plantillas de email HTML, listas para pegar en GoHighLevel y ordenadas
por tipo. **Cada carpeta se corresponde con una carpeta de GHL y con la pantalla
donde se configura ese tipo de plantilla**, así que lo que ves aquí es lo mismo
que verás allí, y en el mismo orden alfabético.

| Carpeta | Qué contiene | Dónde se configura en GHL |
|---|---|---|
| `Agenda/` | `Formulario Rellenado` y `Llamada Agendada` | Automatización → Workflows |
| `Auxiliares/` | Las que no encajan en ningún bloque: `Accesos`, `Propuesta` y `Tarea Pendiente` | Automatización → Workflows |
| `Contratos/` | `Contrato Enviado` y `Contrato Firmado` | Pagos → Documents & Contracts → Settings |
| `Facturación/` | Las 7 de facturas, estimaciones y pagos automáticos | Pagos → Invoices & Estimates → Settings |
| `Nutrición/` | Los 10 correos de la secuencia, de `01 - Bienvenida` a `10 - Cierre` | Automatización → Workflows |

Dentro de cada carpeta, junto a las plantillas, hay un `README.md` con lo suyo
(dónde se asigna, qué valores personalizados usa, qué merge fields resuelve) y
un `asuntos.md` con los asuntos y preheaders de esa carpeta, en bloques para
copiar y pegar.

Y en la raíz, lo común a todas:

| Fichero | Qué contiene |
|---|---|
| `valores-personalizados.md` | **Los 8 valores personalizados de GHL** que hay que configurar para que queden white label |
| `assets/` | `sparkle-white.png`, por si prefieres la cabecera oscura |

## Cómo se cargan

El contenido y la asignación viven en sitios distintos, que es lo que despista.
Primero se sube el HTML, una sola vez:

**Marketing → Correos electrónicos → Plantillas → Nuevo → Código/HTML.** Pega el
HTML y guarda dentro de la carpeta que le toque. Repite para cada plantilla.

Después, cada tipo se asigna en su pantalla, que es la de la última columna de
la tabla de arriba. En las de Pagos solo eliges asunto y plantilla de un
desplegable; el detalle está en el README de cada carpeta.

## Personalización

**No hay placeholders que buscar y sustituir.** Todo lo que cambia de una marca
a otra (logo, nombre, firma, email de contacto y enlaces) sale de valores
personalizados de GHL, así que quien importe el snapshot los rellena una vez y
no toca el HTML. Cómo configurarlos, en
[`valores-personalizados.md`](./valores-personalizados.md).

## Notas de maquetación

Las 24 comparten el mismo sistema: tablas HTML compatibles con Outlook, paleta
blanco/negro/gris, ancho de 600px, cabecera de marca (símbolo + nombre), botón
con fallback VML para Outlook y media query para móvil.

## Asuntos y preheaders

El HTML no lleva el asunto dentro: el `<title>` no es lo que lee el cliente de
correo, lo lee la pestaña del navegador cuando abres el fichero. Por eso los
asuntos viven aparte, en el `asuntos.md` de cada carpeta, y hay que escribirlos
en GHL a mano.

Dónde se escriben cambia según el tipo: en Agenda, Auxiliares y Nutrición, al
montar el correo en el workflow; en Contratos y Facturación, una sola vez en la
pantalla de Settings, junto al desplegable de cada plantilla.

Reglas comunes a los 24, para cuando escribas los tuyos:

- **Longitud.** Gmail y Outlook cortan el asunto sobre los **45-50 caracteres en
  móvil**. Los actuales están todos por debajo salvo `05 - Testimonios`, que se
  ve entero en escritorio pero se corta en móvil — la primera mitad ya se
  entiende.
- **Sin emojis ni mayúsculas gritadas.** Es correo B2B y la plantilla es sobria;
  un 🚀 en el asunto desentona con el diseño y dispara filtros de spam.
- **No repitas asunto y preheader.** Si el cliente ve la misma frase dos veces
  pierdes la segunda línea de venta, que es la que decide la apertura.
- **Mantén sincronizados asunto y `<title>`, y preheader y `<span
  class="preheader">`.** El `<title>` no lo ve nadie, pero es la referencia de
  qué asunto lleva cada plantilla cuando abres el HTML.
