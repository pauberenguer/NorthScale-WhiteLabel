"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, RevealLines } from "@/components/Reveal";
import { faq } from "@/lib/content";

export function FAQ() {
  return (
    <section id="faq" className="relative pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="container-prose">
        <div className="text-center">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              {faq.eyebrow}
            </p>
          </Reveal>
          <h2 className="mt-6 heading-display text-[clamp(40px,7vw,96px)] text-ink">
            <RevealLines text={[faq.title]} stagger={0.05} linePb="0.08em" />
          </h2>
        </div>

        <div className="mt-14 md:mt-16">
          {faq.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <AccordionItem
                question={item.question}
                answer={item.answer}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
        aria-expanded={open}
      >
        <span className="heading-display text-[clamp(17px,2vw,22px)] text-ink leading-[1.3]">
          {question}
        </span>
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors duration-300 hover:bg-surface-2">
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            <svg
              viewBox="0 0 14 14"
              className="h-3.5 w-3.5 text-ink"
              aria-hidden="true"
            >
              <path
                d="M7 2v10M2 7h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.25, delay: 0.1 } },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.15 } },
            }}
            className="overflow-hidden"
          >
            <p className="pb-7 pr-14 text-[15px] leading-[1.65] text-ink/65 md:text-[16px]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
