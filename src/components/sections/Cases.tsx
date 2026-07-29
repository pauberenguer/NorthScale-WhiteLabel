"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, RevealLines } from "@/components/Reveal";
import { cases } from "@/lib/content";

export function Cases() {
  return (
    <section id="casos" className="relative pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="container-wide">
        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-12">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-[14px] uppercase tracking-[0.18em] text-muted">
                {cases.eyebrow}
              </p>
            </Reveal>
            <h2 className="mt-5 heading-display text-[clamp(48px,7vw,96px)] text-ink">
              <RevealLines text={[cases.title]} stagger={0.05} linePb="0.08em" />
              <span className="block heading-display-italic">
                <RevealLines text={[cases.titleAccent]} stagger={0.05} linePb="0.08em" />
              </span>
            </h2>
          </div>
          <Reveal delay={0.2} className="md:col-span-4 md:col-start-9">
            <p className="text-[16px] leading-[1.6] text-ink/70 md:text-[17px]">
              {cases.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {cases.items.map((item, i) => (
            <CaseCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({
  item,
  index,
}: {
  item: { name: string; description: string; image: string };
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.85,
          delay: 0.05 + (index % 3) * 0.08,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative overflow-hidden rounded-[20px] bg-surface"
    >
      <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width:768px) 33vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
          <h3 className="heading-display text-white text-[clamp(22px,2.4vw,30px)]">
            {item.name}
          </h3>
          <p className="mt-2 max-w-[28ch] text-[13.5px] leading-[1.5] text-white/85 md:text-[14px]">
            {item.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
