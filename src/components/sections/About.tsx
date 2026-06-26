"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, RevealLines } from "@/components/Reveal";
import { about } from "@/lib/content";

export function About() {
  return (
    <section id="nosotros" className="relative pt-20 pb-10 md:pt-28 md:pb-14">
      <div className="container-prose">
        <Reveal>
          <p className="text-center text-[11px] uppercase tracking-[0.18em] text-muted">
            {about.eyebrow}
          </p>
        </Reveal>

        <h2 className="mt-6 heading-display text-[clamp(40px,7vw,96px)] text-ink text-center">
          <RevealLines text={[about.title]} stagger={0.05} />
        </h2>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-[540px] text-center text-[16px] leading-[1.6] text-ink/65 md:text-[17px]">
            {about.intro}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {about.pillars.map((p, i) => (
            <Pillar
              key={p.number}
              number={p.number}
              title={p.title}
              description={p.description}
              delay={i * 0.08}
            />
          ))}
        </div>

        <Reveal>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {about.stats.map((s, i) => (
              <Stat key={s.label} value={s.value} label={s.label} delay={i * 0.08} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Pillar({
  number,
  title,
  description,
  delay,
}: {
  number: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
      }}
      viewport={{ once: true, amount: 0.4 }}
      className="relative flex flex-col gap-3 bg-bg p-8 md:p-10"
    >
      <span className="font-mono text-[12px] tracking-[0.12em] text-muted-2">
        {number}
      </span>
      <h3 className="heading-display text-[clamp(22px,2.4vw,30px)] text-ink leading-[1.1]">
        {title}
      </h3>
      <p className="mt-1 text-[15px] leading-[1.6] text-ink/65 md:text-[16px]">
        {description}
      </p>
    </motion.div>
  );
}

function Stat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState<string>(value);

  useEffect(() => {
    if (!inView) return;
    const numericMatch = value.match(/^([+\-]?)(\d+)(.*)$/);
    if (!numericMatch) return;
    const [, sign, numStr, suffix] = numericMatch;
    const target = parseInt(numStr, 10);
    const startTime = performance.now();
    const duration = 1100;
    let raf = 0;
    const animate = (t: number) => {
      const progress = Math.min(1, (t - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(target * eased);
      setDisplay(`${sign}${current}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
      }}
      viewport={{ once: true, amount: 0.5 }}
      className="relative bg-bg p-8 md:p-10"
    >
      <span className="heading-display text-[clamp(40px,4.5vw,64px)] text-ink leading-none tabular-nums">
        {display}
      </span>
      <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-muted">{label}</p>
    </motion.div>
  );
}
