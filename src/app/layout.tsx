import type { Metadata, Viewport } from "next";
import { dmSans } from "@/lib/fonts";
import { site } from "@/lib/content";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — Inteligencia artificial, automatización y software a medida`,
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
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: `https://${site.domain}`,
    title: `${site.name} — IA, automatización y software a medida`,
    description:
      "Diseñamos e implementamos agentes de IA, automatizaciones y software a medida para empresas que quieren escalar mejor.",
    siteName: site.name,
    images: [{ url: "/banner.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — IA, automatización y software a medida`,
    description:
      "Sistemas de IA y automatización a medida para empresas serias.",
    images: ["/banner.png"],
  },
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
