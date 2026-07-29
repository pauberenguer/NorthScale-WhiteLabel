# Secuencia de Emails

Plantillas HTML para GoHighLevel (GHL) con nombres ordenados.

## Asuntos y preheaders

En [`../asuntos.md`](../asuntos.md), en bloques listos para copiar y pegar.

## Checklist de personalización

Las 12 comparten la misma cabecera de marca (símbolo + nombre), igual que
`../utils/Contrato Enviado.html`. Busca y sustituye en **todas**:

| Placeholder      | Por                                                        |
|------------------|------------------------------------------------------------|
| `URL_DE_TU_LOGO` | URL **pública** de tu símbolo (1 vez por fichero)          |
| `TU MARCA`       | Nombre de tu marca (cabecera, firma y footer)              |
| `tudominio.com`  | Tu dominio en los enlaces de CTA                           |

Sobre el logo, mismas reglas que en [`../utils/README.md`](../utils/README.md):
tiene que ser una URL `https://` pública (súbelo a *Ajustes → Media Storage* en
GHL) y el símbolo debe ser oscuro, porque la cabecera es blanca.

```bash
# desde plantillas/emails/
sed -i '' 's|URL_DE_TU_LOGO|https://tu-url-publica.png|g; s|TU MARCA|Tu Marca|g' *.html
```

## Nota de uso en GHL

- Secuencia principal recomendada: `1` a `10`.
- Plantillas variables según evento: `Confirmacion` (cuando hay cita) y `Recordatorio` (si no se agenda o según tu lógica). Van sin número precisamente porque no ocupan un lugar fijo en la secuencia.
