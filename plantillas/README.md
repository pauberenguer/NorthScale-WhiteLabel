# plantillas

Plantillas de email HTML listas para pegar en GoHighLevel.

| Fichero / carpeta | Qué contiene                                                        |
|-------------------|---------------------------------------------------------------------|
| `emails/`         | Secuencia de nutrición: `01 - Bienvenida` → `10 - Cierre`, más `Confirmacion` y `Recordatorio` (por evento, sin número) |
| `utils/`          | Transaccionales sueltas por evento (envío de contratos y documentos) |
| `asuntos.md`      | **Asuntos y preheaders de todas las plantillas**, para copiar y pegar |

Todas comparten el mismo sistema de maquetación: tablas HTML compatibles con
Outlook, paleta blanco/negro/gris, ancho de 600px y placeholders white label
(`TU MARCA`, `tudominio.com`) que debes sustituir por los tuyos.

El HTML no lleva el asunto dentro (el `<title>` no es lo que lee el cliente de
correo), así que los asuntos viven aparte en [`asuntos.md`](./asuntos.md).

Detalle de cada bloque en su propio README: [emails](./emails/README.md) ·
[utils](./utils/README.md).
