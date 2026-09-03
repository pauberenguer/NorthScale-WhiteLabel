# Valores personalizados

Las plantillas **ya no llevan placeholders para buscar y sustituir**. Todo lo que
cambia de una marca a otra se resuelve con *valores personalizados* de GHL, así
que quien importe el snapshot rellena estos nueve campos una sola vez y los 26
correos quedan listos, sin tocar una línea de HTML.

Se configuran en **Configuración → Valores personalizados**.

## Los que usan las plantillas

| Valor personalizado | Key | Qué poner |
|---|---|---|
| Logo Marca | `{{custom_values.logo_marca}}` | URL **pública** `https://` de tu símbolo (ver abajo) |
| Nombre Marca | `{{custom_values.nombre_marca}}` | Nombre de tu marca |
| Representante Empresa | `{{custom_values.representante_empresa}}` | Quien firma los correos |
| Cargo Representante | `{{custom_values.cargo_representante}}` | Su cargo: `Fundador`, `CEO`… |
| Email Marca | `{{custom_values.email_marca}}` | Email de contacto |
| Auditoría Estratégica | `{{custom_values.enlace}}` | Enlace del calendario de auditoría |
| WhatsApp Marca | `{{custom_values.whatsapp_marca}}` | Enlace `https://wa.me/34XXXXXXXXX` |
| Formulario Accesos | `{{custom_values.formulario_accesos}}` | Enlace al formulario de recogida de accesos |
| Metodo Pago | `{{custom_values.metodo_pago}}` | Enlace donde el cliente actualiza su forma de pago |

Dónde aparece cada uno:

| Key | Dónde |
|---|---|
| `logo_marca` | Cabecera de las 26 |
| `nombre_marca` | Cabecera, firma y footer de las 26 |
| `representante_empresa` | Firma de las 26 |
| `cargo_representante` | Firma de las 26 |
| `email_marca` | Footer de `Contratos`, `Facturación` y `Auxiliares` (en el `mailto:` y en el texto visible) |
| `enlace` | Botón de `Nutrición` y de `Formulario Rellenado` |
| `whatsapp_marca` | Enlace «Necesito Reagendar» de `Llamada Agendada` |
| `formulario_accesos` | Botón de `Accesos` |
| `metodo_pago` | Botón de `Método de Pago` y de `Segundo Aviso` |

## Dónde está probado

Los valores personalizados resuelven seguro en los correos que envía un
workflow. En los que salen del módulo de Pagos está por confirmar, y conviene
hacerlo porque **un fallo ahí sería silencioso**: GHL resuelve a cadena vacía lo
que no reconoce, así que no verías un `{{...}}` en el correo, verías un logo
roto y un footer sin email.

| Carpeta | Cómo se envía | Estado |
|---|---|---|
| `Agenda` | Workflow | Mismo contexto que Nutrición. Falta comprobar `whatsapp_marca`, haciendo clic en el enlace |
| `Auxiliares` | Workflow | Mismo contexto que Nutrición |
| `Contratos` | Pagos → Documents & Contracts | ⚠️ Sin probar |
| `Facturación` | Pagos → Invoices & Estimates | ⚠️ Sin probar |
| `Nutrición` | Workflow | ✅ Probado con `01 - Bienvenida` |

Contratos y Facturación se configuran en pantallas distintas, así que que
funcione en una **no** garantiza que funcione en la otra: hay que probar las
dos. En cada prueba mira siempre lo mismo — que aparezca el logo, que la marca
salga en cabecera y footer, que la firma tenga nombre **y** cargo, que el email
del footer no esté en blanco, y que el botón lleve a donde debe.

## Detalles que importan

**El key no se puede cambiar después.** GHL lo genera a partir del nombre la
primera vez y lo conserva aunque renombres el valor: por eso *Auditoría
Estratégica* sigue teniendo el key `enlace`, de cuando se llamaba así. Si
recreas un valor para «arreglarle» el key, rompes todo lo que lo usaba.

**Escribe los nombres sin acentos ni barras.** GHL se los come al generar el
key, que es como en esta cuenta *Teléfono Marca* acabó siendo `telfono` y
*Dirección Empresa*, `direccin_empresa`. Los nueve de arriba están elegidos para
que el key salga limpio. Por eso *Metodo Pago* va escrito así, sin tilde y sin
el «de»: *Método de Pago* daría `mtodo_de_pago`.

**El de WhatsApp es un enlace completo, no un número.** `Teléfono Marca` guarda
el número en formato de lectura (`+34 624 78 05 65`) y un `wa.me` necesita solo
dígitos, sin `+` ni espacios. Guardando el enlace ya montado no hay forma de
equivocarse. La plantilla le añade detrás el `?text=…` con el mensaje
prellenado, así que **el valor no debe llevar parámetros**.

**Un valor sin rellenar no se ve como texto literal, se ve como un hueco.** GHL
resuelve a cadena vacía lo que no reconoce (es lo que pasó con
`{{document.link}}`, ver [`Contratos/README.md`](./Contratos/README.md)). Si te dejas
`logo_marca`, no aparece un `{{...}}` en el correo: aparece un logo roto. Repasa
que los nueve tengan valor antes de enviar nada.

## El logo de la cabecera

Cabecera de fondo blanco con el símbolo a 48px y el nombre de la marca debajo.

En un email **el `src` tiene que ser una URL pública `https://`**. Una ruta local
(`./logo.png`, `/public/logo.png`) o un adjunto no se ven en ningún cliente, y
base64 lo descarta Gmail. Súbelo a *Ajustes → Media Storage* en GHL, copia el
enlace público y pégalo como valor de `Logo Marca`.

**La cabecera es clara, así que el símbolo tiene que ser oscuro.** Un PNG blanco
desaparece; uno negro sobre fondo blanco opaco (como `public/logo.png` y
`public/sparkle.png` de este repo, donde solo las esquinas redondeadas son
transparentes) funciona bien aquí.

Si prefieres la cabecera oscura, `assets/sparkle-white.png` (112×112,
blanco sobre transparente) está para eso: cambia `.logo-bar` a
`background-color: #1a1a1a`, `.logo-bar-text` a `color: #ffffff`, sube ese PNG y
usa su URL como valor.

### Notas de maquetación del logo

- El `<img>` lleva `width`/`height` en atributo **y** en `style`: Outlook ignora
  el CSS y sin el atributo lo pintaría a 112px.
- `alt=""` a propósito: el nombre de la marca ya va en texto justo debajo, así
  que un `alt` con la marca lo diría dos veces con imágenes bloqueadas.
- Si no quieres imagen, borra el `<img>` y deja solo el
  `<p class="logo-bar-text">`. La banda sigue funcionando.
