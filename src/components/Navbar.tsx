"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { Sparkle } from "@/components/Marquee";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={cn(
          "flex w-full max-w-[1100px] items-center justify-between gap-6 rounded-full px-6 py-3 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          scrolled
            ? "border border-line bg-bg/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl saturate-[1.8]"
            : "border border-transparent bg-transparent",
        )}
      >
        <Link
          href="/"
          className="group flex items-center"
          aria-label={`${site.name} — Inicio`}
        >
          <Logo variant="dark" />
          <Sparkle className="ml-px h-3.5 w-3.5 self-end text-ink/40 transition-transform duration-500 group-hover:rotate-90" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-500"
              style={{ color: "var(--color-ink)" }}
            >
              <span className="relative z-10">{item.label}</span>
              <span
                className={cn(
                  "absolute inset-0 -z-0 scale-90 rounded-full opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100",
                  "bg-surface-2",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/auditoria" variant="primary" size="sm">
            Consultoría Gratuita
          </Button>
        </div>

        <button
          className={cn(
            "relative z-50 flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 md:hidden",
            scrolled
              ? "border-line-strong bg-bg"
              : "border-line-strong bg-transparent",
          )}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <span className="relative h-3 w-4">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-full transition-all duration-300",
                "bg-ink",
                open && "translate-y-1.5 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 h-px w-full transition-all duration-300",
                "bg-ink",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-3 h-px w-full transition-all duration-300",
                "bg-ink",
                open && "-translate-y-1.5 -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto" as const },
          closed: { opacity: 0, pointerEvents: "none" as const },
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 top-0 z-40 flex flex-col bg-bg pt-20 md:hidden"
      >
        <div className="container-wide flex flex-col gap-1 py-8">
          {nav.map((item, i) => (
            <motion.div
              key={item.href}
              variants={{
                open: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.1 + i * 0.05 },
                },
                closed: { opacity: 0, y: 20 },
              }}
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="heading-display block border-b border-line py-3 text-5xl text-ink"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <div className="mt-8">
            <Button
              href="/auditoria"
              variant="primary"
              size="lg"
              onClick={() => setOpen(false)}
            >
              Consultoría Gratuita
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
