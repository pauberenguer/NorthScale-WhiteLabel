"use client";

import { useState } from "react";
import Link from "next/link";
import { Marquee, Sparkle } from "@/components/Marquee";
import { Logo } from "@/components/Logo";
import { footer, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative bg-ink text-bg">
      {/* Giant brand marquee */}
      <div className="overflow-hidden bg-surface border-b border-line">
        <Marquee duration={50} className="py-12 md:py-16">
          <div className="flex shrink-0 items-center gap-10 pr-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="heading-display text-[clamp(72px,14vw,220px)] leading-[0.9] whitespace-nowrap text-ink"
              >
                {site.name}
                <span className="inline-block px-6 align-middle">
                  <Sparkle className="h-10 w-10 text-ink/40 md:h-14 md:w-14" />
                </span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      {/* Top: brand + newsletter + columns */}
      <div className="container-wide grid gap-14 py-20 md:grid-cols-12 md:gap-10">
        {/* Brand */}
        <div className="md:col-span-4">
          <Link href="/" className="inline-flex">
            <Logo variant="light" />
          </Link>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-bg/70">
            {footer.description}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-center gap-3 text-bg group"
          >
            <span className="text-[20px] font-medium underline-offset-4 decoration-bg/30 group-hover:underline md:text-[22px]">
              {site.email}
            </span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-bg/30 transition-transform duration-500 group-hover:rotate-45">
              <svg viewBox="0 0 14 14" className="h-3 w-3">
                <path
                  d="M3 11 L11 3 M11 3 H5 M11 3 V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </span>
          </a>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-4">
          <h3 className="heading-display text-[clamp(28px,3vw,40px)] text-bg leading-[1.1]">
            {footer.newsletter.title}
          </h3>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-bg/65">
            {footer.newsletter.body}
          </p>
          <NewsletterForm />
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-4">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] uppercase tracking-[0.18em] text-bg/40">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => {
                  const isInternal = link.href.startsWith("/");
                  return (
                    <li key={link.label}>
                      {isInternal ? (
                        <Link
                          href={link.href}
                          className="text-[14.5px] text-bg/85 transition-colors hover:text-bg"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-[14.5px] text-bg/85 transition-colors hover:text-bg"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="border-t border-bg/10">
        <div className="container-wide flex flex-col gap-3 py-6 text-[12px] text-bg/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {site.name}, marca comercial de {site.legalEntity}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 uppercase tracking-[0.18em]">
            <Link href="/privacidad" className="transition-colors hover:text-bg">Privacidad</Link>
            <Link href="/terminos" className="transition-colors hover:text-bg">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) {
      setStatus("err");
      return;
    }
    setStatus("ok");
    setEmail("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-7 flex w-full items-center gap-2 rounded-full border border-bg/15 bg-bg/5 p-1.5 backdrop-blur"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={footer.newsletter.placeholder}
        aria-label="Email"
        className="h-10 flex-1 bg-transparent px-4 text-[14px] text-bg placeholder:text-bg/40 focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex h-10 items-center rounded-full bg-bg px-5 text-[13px] font-medium text-ink transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        {status === "ok" ? "¡Hecho!" : footer.newsletter.cta}
      </button>
    </form>
  );
}
