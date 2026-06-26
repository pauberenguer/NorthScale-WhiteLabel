"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  amount = 0.25,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
      }}
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealLines({
  text,
  className,
  lineClassName,
  stagger = 0.08,
  linePb = "0.25em",
}: {
  text: string | string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  linePb?: string;
}) {
  const lines = Array.isArray(text) ? text : text.split("\n");
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((l, i) => (
          <span key={i} className={`block ${lineClassName ?? ""}`}>{l}</span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden" style={{ paddingBottom: linePb }}>
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: 0,
                transition: {
                  duration: 0.95,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * stagger,
                },
              },
            }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
