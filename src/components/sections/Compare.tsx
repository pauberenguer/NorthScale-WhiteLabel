"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, RevealLines } from "@/components/Reveal";
import { compare } from "@/lib/content";
import { cn } from "@/lib/utils";

type Mode = "with" | "without";

export function Compare() {
  const [mode, setMode] = useState<Mode>("with");
  const items = mode === "with" ? compare.withUs : compare.withoutUs;
  const accent = mode === "with" ? "var(--color-ink)" : "var(--color-warn)";

  return (
    <section className="relative bg-surface py-20 md:py-28">
      <div className="container-wide">
        <div className="text-center">
          <Reveal>
            <p className="text-[14px] uppercase tracking-[0.18em] text-muted">
              {compare.eyebrow}
            </p>
          </Reveal>
          <h2 className="mt-6 heading-display text-[clamp(40px,7vw,96px)] text-ink">
            <RevealLines text={[compare.title]} stagger={0.05} linePb="0.08em" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-[640px] text-[16px] leading-[1.6] text-ink/70 md:text-[17px]">
              {compare.intro}
            </p>
          </Reveal>
        </div>

        {/* Toggle */}
        <Reveal delay={0.3}>
          <div className="mt-12 flex justify-center">
            <div
              className="relative inline-flex rounded-full border border-line-strong bg-bg p-1 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.15)]"
              role="tablist"
              aria-label="Comparativa"
            >
              {/* Animated thumb */}
              <motion.span
                aria-hidden="true"
                animate={{ x: mode === "with" ? 0 : "100%" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-1 top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full"
                style={{ background: accent }}
              />
              <ToggleButton
                active={mode === "with"}
                onClick={() => setMode("with")}
                label={compare.toggle.withLabel}
              />
              <ToggleButton
                active={mode === "without"}
                onClick={() => setMode("without")}
                label={compare.toggle.withoutLabel}
              />
            </div>
          </div>
        </Reveal>

        {/* Items grid */}
        <div className="mt-14 md:mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="bg-bg p-7 md:p-8"
                >
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full"
                    style={{ background: accent, color: "#fff" }}
                  >
                    {mode === "with" ? <CheckIcon /> : <CrossIcon />}
                  </span>
                  <h3 className="mt-5 heading-display text-[clamp(20px,2.2vw,26px)] text-ink leading-[1.2]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.55] text-ink/65">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ToggleButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "relative z-10 inline-flex h-10 items-center justify-center rounded-full px-5 text-[13.5px] font-medium tracking-tight transition-colors duration-300",
        active ? "text-white" : "text-ink/70 hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M3 7.5 L6 10.5 L11 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M4 4 L10 10 M10 4 L4 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
