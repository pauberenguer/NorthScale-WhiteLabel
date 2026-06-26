"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Reveal, RevealLines } from "@/components/Reveal";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="servicios" className="relative bg-ink text-bg py-20 md:py-28">
      <div className="container-wide">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bg/45">
                {services.eyebrow}
              </p>
            </Reveal>
            <h2 className="mt-6 heading-display text-[clamp(40px,6.5vw,88px)] leading-[0.98]">
              <RevealLines
                text={[services.title, services.titleAccent]}
                lineClassName="last:italic last:text-bg/80"
                stagger={0.08}
                linePb="0.08em"
              />
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.3}>
              <p className="text-[15px] leading-[1.65] text-bg/70">{services.intro}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-bg/12 bg-bg/12 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {services.items.map((s, i) => (
            <ServiceCard key={s.number} index={i} {...s} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-[15px] text-bg/50">
            ¿Tu caso no encaja en ninguno?
            <br />
            <Link href="/#contacto" className="underline underline-offset-4 text-bg/70 transition-colors hover:text-bg">
              Cuéntanoslo
            </Link>{" "}
            y vemos cómo ayudarte.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({
  number,
  title,
  description,
  tags,
  index,
}: {
  number: string;
  title: string;
  description: string;
  tags: string[];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex h-full flex-col bg-ink p-8 transition-colors duration-500 hover:bg-ink-soft md:p-10"
    >
      <header className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bg/40">
          {number}
        </span>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bg/15 transition-all duration-500 group-hover:border-bg group-hover:bg-bg group-hover:text-ink">
          <svg viewBox="0 0 14 14" className="h-3 w-3">
            <path
              d="M3 11 L11 3 M11 3 H5 M11 3 V9"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </span>
      </header>

      <h3 className="mt-5 heading-display text-[clamp(26px,2.8vw,30px)] text-bg leading-[1.05]">
        {title}
      </h3>
      <p className="mt-5 text-[15px] leading-[1.6] text-bg/70">
        {description}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-bg/15 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-bg/65"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
