import type { Metadata, Viewport } from "next";
import { dmSans } from "@/lib/fonts";
import { site } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  // `default` lo usa la home; `template` deja que cada página aporte el suyo
  // ("Contacto · TU MARCA"). Una página sin `title` cae en el `default`.
  title: {
    default: `${site.name} — ${site.tagline.replace(/\.$/, "")}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Consultora especializada en IA, automatización y desarrollo de software a medida para empresas. Diseñamos e implementamos sistemas reales que ahorran tiempo, mejoran procesos y escalan tu negocio.",
  applicationName: site.name,
  keywords: [
    "consultora IA",
    "agentes de IA",
    "automatización empresarial",
    "software a medida",
    "asistentes virtuales",
    "automatización de procesos",
    "consultoría inteligencia artificial",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  // El de la home. Cada página declara el suyo con `openGraph()`: si no lo
  // hiciera, heredaría este y diría que su dirección es la home, que es lo
  // que hace que las redes sociales manden ahí al visitante.
  ...pageMeta({
    path: "/",
    title: `${site.name} — IA, automatización y software a medida`,
    description:
      "Diseñamos e implementamos agentes de IA, automatizaciones y software a medida para empresas que quieren escalar mejor.",
  }),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={dmSans.variable}
      suppressHydrationWarning
    >
      <body className="bg-bg text-ink font-sans antialiased selection:bg-ink selection:text-bg">
        <SmoothScroll>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
          <ExitIntentModal />
          <WhatsAppFloat />
        </SmoothScroll>
      </body>
    </html>
  );
}
