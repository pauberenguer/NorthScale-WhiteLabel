"use client";

import { Reveal, RevealLines } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const half = Math.ceil(testimonials.items.length / 2);
  const row1 = testimonials.items.slice(0, half);
  const row2 = testimonials.items.slice(half);

  return (
    <section id="testimonios" className="relative pt-20 pb-10 md:pt-28 md:pb-14 overflow-hidden">
      <div className="container-wide text-center">
        <Reveal>
          <p className="text-[14px] uppercase tracking-[0.18em] text-muted">
            {testimonials.eyebrow}
          </p>
        </Reveal>
        <h2 className="mt-6 heading-display text-[clamp(40px,7vw,96px)] text-ink">
          <RevealLines
            text={[testimonials.title]}
            stagger={0.05}
            linePb="0.08em"
          />
          <span className="block heading-display-italic text-ink/85">
            <RevealLines
              text={[testimonials.titleAccent]}
              stagger={0.05}
              linePb="0.08em"
            />
          </span>
        </h2>
      </div>

      <Reveal delay={0.3}>
        <div className="mt-14 flex flex-col gap-4 md:mt-18">
          <Marquee duration={40} className="py-1">
            <div className="flex shrink-0 gap-4 pr-4">
              {[...row1, ...row1].map((t, i) => (
                <TestimonialCard key={`r1-${i}`} {...t} />
              ))}
            </div>
          </Marquee>

          <Marquee duration={45} reverse className="py-1">
            <div className="flex shrink-0 gap-4 pr-4">
              {[...row2, ...row2].map((t, i) => (
                <TestimonialCard key={`r2-${i}`} {...t} />
              ))}
            </div>
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  company,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
}) {
  return (
    <div className="relative flex w-[340px] shrink-0 flex-col justify-between rounded-2xl border border-line bg-bg p-7 md:w-[400px] md:p-8">
      <QuoteIcon />
      <p className="mt-4 text-[14.5px] leading-[1.6] text-ink/75 md:text-[15px]">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-[13px] font-semibold text-ink/70">
          {author
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="text-[13.5px] font-medium text-ink">{author}</p>
          <p className="text-[12px] text-ink/50">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-ink/15"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  );
}
