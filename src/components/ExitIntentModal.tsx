"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/content";

const STORAGE_KEY = "ns_exit_shown";
const MOBILE_DELAY_MS = 50_000;
const SKIP_PATHS = ["/auditoria"];

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const shown = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (SKIP_PATHS.includes(pathname)) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    function trigger() {
      if (shown.current) return;
      shown.current = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    }

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) trigger();
    }

    document.addEventListener("mouseleave", handleMouseLeave);

    const mobileTimer = setTimeout(trigger, MOBILE_DELAY_MS);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [pathname]);

  function close() {
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[620px] rounded-2xl border border-line bg-bg p-10 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.2)] md:p-14"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-surface-2 hover:text-ink"
              aria-label="Cerrar"
            >
              <svg viewBox="0 0 14 14" className="h-[18px] w-[18px]" aria-hidden="true">
                <path
                  d="M4 4 L10 10 M10 4 L4 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <p className="text-[12px] uppercase tracking-[0.18em] text-muted">
              Antes de irte
            </p>

            <h2 className="mt-5 heading-display text-[clamp(28px,5vw,42px)] text-ink leading-[1.05]">
              ¿Quieres que Analicemos
              <span className="heading-display-italic text-ink/75"> tu&nbsp;Caso?</span>
            </h2>

            <p className="mt-5 text-[16px] leading-[1.65] text-ink/60 md:text-[17px]">
              Reserva una auditoría gratuita de 30 minutos o cuéntanos tu proyecto. Sin compromiso.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/auditoria"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                onClick={close}
              >
                Auditoría Gratuita
              </Button>
              <Button
                href={site.whatsappUrl}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={close}
              >
                WhatsApp
              </Button>
            </div>

            <p className="mt-6 text-[13px] text-ink/35">
              O escríbenos a{" "}
              <a
                href={`mailto:${site.email}`}
                className="underline underline-offset-4 decoration-ink/15 hover:decoration-ink/40"
              >
                {site.email}
              </a>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
