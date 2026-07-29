"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, RevealLines } from "@/components/Reveal";
import { process } from "@/lib/content";

export function ProcessCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalCards = process.steps.length;
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    function measure() {
      const track = trackRef.current;
      if (!track) return;
      const viewW = track.parentElement?.clientWidth ?? 0;
      setMaxScroll(Math.max(0, track.scrollWidth - viewW));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  return (
    <section id="proceso" ref={containerRef} className="relative bg-ink text-bg" style={{ height: `${totalCards * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="container-wide shrink-0 pt-20 pb-10 md:pt-28 md:pb-14">
            <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-12">
              <div className="md:col-span-7">
                <Reveal>
                  <p className="text-[14px] uppercase tracking-[0.18em] text-bg/50">
                    {process.eyebrow}
                  </p>
                </Reveal>
                <h2 className="mt-5 heading-display text-[clamp(48px,7vw,96px)]">
                  <RevealLines text={[process.title]} stagger={0.05} linePb="0.08em" />
                  <span className="block heading-display-italic text-bg/85">
                    <RevealLines text={[process.titleAccent]} stagger={0.05} linePb="0.08em" />
                  </span>
                </h2>
              </div>
              <Reveal delay={0.2} className="md:col-span-4 md:col-start-9">
                <p className="text-[16px] leading-[1.6] text-bg/65 md:text-[17px]">
                  {process.intro}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="relative min-h-0 flex-1">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex h-full gap-6 px-5 md:gap-8 md:px-10 lg:px-16"
            >
              {process.steps.map((step) => (
                <div
                  key={step.number}
                  className="h-full w-[85vw] max-w-[480px] shrink-0 md:w-[45vw] md:max-w-[520px]"
                >
                  <StepCard step={step} />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="container-wide shrink-0 py-6 md:py-8">
            <ProgressBar progress={scrollYProgress} total={totalCards} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressBar({
  progress,
  total,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-px flex-1 bg-bg/15">
        <motion.div
          style={{ width }}
          className="absolute inset-y-0 left-0 bg-bg/60"
        />
      </div>
      <span className="font-mono text-[12px] tracking-[0.12em] text-bg/40">
        {String(total).padStart(2, "0")} pasos
      </span>
    </div>
  );
}

export function StepCard({
  step,
}: {
  step: (typeof process.steps)[number];
}) {
  return (
    <article className="relative h-full overflow-hidden rounded-3xl bg-ink-soft">
      <div className="grid h-full grid-rows-[280px_1fr] md:grid-rows-[320px_1fr]">
        <div className="relative">
          <Image
            src={step.image}
            alt=""
            fill
            sizes="(min-width:768px) 60vw, 100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-soft via-ink-soft/30 to-transparent" />
          <span className="absolute right-6 top-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-bg/10 text-bg backdrop-blur-md font-mono text-[12px] tracking-[0.18em]">
            {step.number}
          </span>
        </div>

        <div className="flex flex-col gap-5 p-7 md:p-9">
          <h3 className="heading-display text-bg text-[clamp(28px,3.4vw,42px)] leading-[1.05]">
            {step.title}
          </h3>
          <p className="text-[15px] leading-[1.6] text-bg/70">{step.description}</p>
          <ul className="mt-1 flex flex-col gap-2.5 border-t border-bg/10 pt-5">
            {step.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[14px] text-bg/85">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
