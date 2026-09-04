import type { Metadata } from "next";
import { brand } from "./brand";

/**
 * Open Graph por página.
 *
 * Next fusiona la metadata de forma superficial: si una página declara
 * `openGraph`, reemplaza el del layout entero en vez de completarlo. Por eso
 * este helper devuelve el objeto completo — así ninguna página se queda sin
 * `siteName` ni hereda la URL de otra.
 *
 * Y por eso importa declararlo: sin `url` propia, todas las páginas dicen que
 * su dirección es la home, y las redes sociales mandan ahí al visitante por
 * mucho que se comparta el enlace correcto.
 */
export function pageMeta({
  path,
  title,
  description,
  image,
}: {
  /** Ruta absoluta dentro del sitio, empezando por "/". */
  path: string;
  title: string;
  description: string;
  /** Por defecto, el banner del sitio. */
  image?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const img = image ?? "/banner.png";
  return {
    openGraph: {
      type: "website",
      locale: "es_ES",
      siteName: brand.name,
      url: path,
      title,
      description,
      images: [{ url: img, width: 1200, height: 630 }],
    },
    // La tarjeta de X heredaba la genérica por el mismo motivo que el resto.
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}
