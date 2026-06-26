"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, RevealLines } from "@/components/Reveal";
import { gallery } from "@/lib/content";
import { Marquee } from "@/components/Marquee";

const tileShape: Record<string, string> = {
  wide: "md:col-span-2 aspect-[16/10]",
  tall: "md:row-span-2 aspect-[3/4] md:aspect-auto",
  square: "aspect-square",
};

export function Gallery() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-wide">
        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-12">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                {gallery.eyebrow}
              </p>
            </Reveal>
            <h2 className="mt-5 heading-display text-[clamp(48px,7vw,96px)] text-ink">
              <RevealLines text={[gallery.title]} stagger={0.05} linePb="0.08em" />
              <span className="block heading-display-italic">
                <RevealLines text={[gallery.titleAccent]} stagger={0.05} linePb="0.08em" />
              </span>
            </h2>
          </div>
          <Reveal delay={0.2} className="md:col-span-4 md:col-start-9">
            <p className="text-[16px] leading-[1.6] text-ink/70 md:text-[17px]">
              {gallery.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-20 md:grid-cols-4 md:grid-rows-2 md:gap-4">
          {gallery.bento.map((img, i) => (
            <motion.div
              key={img.src + i}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 0.95, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
              }}
              viewport={{ once: true, amount: 0.2 }}
              className={`relative overflow-hidden rounded-[18px] bg-surface ${tileShape[img.w] ?? "aspect-square"}`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="(min-width:768px) 33vw, 50vw"
                className="object-cover object-center"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 md:mt-8">
        <Marquee duration={60} pauseOnHover={false}>
          <div className="flex shrink-0 items-center gap-4 pr-4">
            {gallery.marquee.map((src, i) => (
              <div
                key={src + i}
                className="relative h-[220px] w-[300px] shrink-0 overflow-hidden rounded-[18px] md:h-[280px] md:w-[400px]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
