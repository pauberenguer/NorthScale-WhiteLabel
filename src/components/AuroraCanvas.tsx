"use client";

import { useRef, useEffect } from "react";

/* ── Aurora curtains: each is a vertical light column that ──
   ── drifts horizontally using a stable sum of sine waves.  ── */
interface Curtain {
  baseX: number;        // 0..1, normalized base X position
  width: number;        // px, base width before blur
  height: number;       // 0..1 of canvas height
  yCenter: number;      // 0..1, vertical center of the curtain
  hue: number;          // 0..360
  saturation: number;   // 0..100
  lightness: number;    // 0..100
  alpha: number;        // 0..1
  // 3 sine waves per curtain – frequencies and phases stay constant,
  // so the motion is always smooth and "fluid" without random jumps.
  freq: [number, number, number];
  amp:  [number, number, number];
  phase: [number, number, number];
  speed: number;
  pulseSpeed: number;
  pulsePhase: number;
}

/* Evenly spaced curtains across the viewport, slightly varied colors */
const CURTAINS: Curtain[] = [
  {
    baseX: 0.10, width: 240, height: 0.95, yCenter: 0.50,
    hue: 210, saturation: 100, lightness: 55, alpha: 0.30,
    freq: [0.20, 0.55, 1.10], amp: [70, 28, 14], phase: [0.0, 1.4, 3.2],
    speed: 0.18, pulseSpeed: 0.30, pulsePhase: 0.0,
  },
  {
    baseX: 0.25, width: 280, height: 0.92, yCenter: 0.48,
    hue: 200, saturation: 100, lightness: 60, alpha: 0.26,
    freq: [0.18, 0.60, 1.20], amp: [80, 32, 12], phase: [1.2, 0.6, 2.7],
    speed: 0.16, pulseSpeed: 0.27, pulsePhase: 1.3,
  },
  {
    baseX: 0.40, width: 320, height: 0.95, yCenter: 0.52,
    hue: 215, saturation: 100, lightness: 58, alpha: 0.34,
    freq: [0.22, 0.50, 1.05], amp: [75, 30, 15], phase: [2.4, 1.8, 0.9],
    speed: 0.20, pulseSpeed: 0.24, pulsePhase: 2.6,
  },
  {
    baseX: 0.55, width: 260, height: 0.93, yCenter: 0.49,
    hue: 195, saturation: 100, lightness: 62, alpha: 0.24,
    freq: [0.19, 0.58, 1.15], amp: [85, 26, 13], phase: [0.7, 2.9, 1.6],
    speed: 0.17, pulseSpeed: 0.31, pulsePhase: 3.7,
  },
  {
    baseX: 0.70, width: 300, height: 0.95, yCenter: 0.51,
    hue: 220, saturation: 95,  lightness: 56, alpha: 0.28,
    freq: [0.21, 0.53, 1.08], amp: [72, 34, 14], phase: [3.0, 0.4, 2.1],
    speed: 0.19, pulseSpeed: 0.26, pulsePhase: 0.8,
  },
  {
    baseX: 0.85, width: 250, height: 0.94, yCenter: 0.50,
    hue: 205, saturation: 100, lightness: 60, alpha: 0.25,
    freq: [0.20, 0.57, 1.12], amp: [78, 30, 12], phase: [1.9, 2.2, 0.5],
    speed: 0.16, pulseSpeed: 0.29, pulsePhase: 2.0,
  },
];

/* Combine 3 sines into one smooth offset – guaranteed continuous & fluid */
function smoothOffset(c: Curtain, t: number): number {
  const tt = t * c.speed;
  return (
    Math.sin(tt * c.freq[0] * Math.PI * 2 + c.phase[0]) * c.amp[0] +
    Math.sin(tt * c.freq[1] * Math.PI * 2 + c.phase[1]) * c.amp[1] +
    Math.sin(tt * c.freq[2] * Math.PI * 2 + c.phase[2]) * c.amp[2]
  );
}

/* ── Component ────────────────────────────────────────────── */
export function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, active: false, smoothX: 0.5, smoothY: 0.5 });
  const raf = useRef(0);
  const dpr = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    dpr.current = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas!.width = w * dpr.current;
      canvas!.height = h * dpr.current;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = (e.clientY - rect.top) / rect.height;
      mouse.current.active = true;
    }

    function onMouseLeave() {
      mouse.current.active = false;
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.parentElement?.addEventListener("mousemove", onMouseMove);
    canvas.parentElement?.addEventListener("mouseleave", onMouseLeave);

    const startTime = performance.now();

    function drawCurtain(c: Curtain, t: number, w: number, h: number) {
      const drift = smoothOffset(c, t);

      // Cursor influence – smooth bell falloff, never abrupt.
      let cursorBoost = 0;
      let cursorPush = 0;
      if (mouse.current.active) {
        const baseXNorm = c.baseX + drift / w;
        const dx = baseXNorm - mouse.current.smoothX;
        const dist = Math.abs(dx);
        const fall = Math.exp(-dist * dist * 18);
        cursorBoost = fall * 0.18;
        cursorPush = -dx * fall * 50;
      }

      const cx = c.baseX * w + drift + cursorPush;
      const halfHeight = (c.height * h) / 2;
      const yTop = c.yCenter * h - halfHeight;
      const yBot = c.yCenter * h + halfHeight;

      // Slow alpha pulse – breathes naturally.
      const pulse = 0.85 + 0.15 * Math.sin(t * c.pulseSpeed * Math.PI * 2 + c.pulsePhase);
      const alpha = Math.min(c.alpha * 1.4, (c.alpha + cursorBoost * 0.15) * pulse);

      // Vertical gradient – soft top, brighter middle, soft bottom.
      const grad = ctx!.createLinearGradient(0, yTop, 0, yBot);
      const col = (a: number) =>
        `hsla(${c.hue}, ${c.saturation}%, ${c.lightness}%, ${a})`;
      grad.addColorStop(0.00, col(0));
      grad.addColorStop(0.20, col(alpha * 0.35));
      grad.addColorStop(0.50, col(alpha));
      grad.addColorStop(0.80, col(alpha * 0.35));
      grad.addColorStop(1.00, col(0));

      ctx!.fillStyle = grad;
      ctx!.fillRect(cx - c.width / 2, yTop, c.width, c.height * h);
    }

    function frame() {
      const w = canvas!.width;
      const h = canvas!.height;
      const t = (performance.now() - startTime) / 1000;

      // Smooth the mouse so jittery movements don't translate to jumpy curtains.
      mouse.current.smoothX += (mouse.current.x - mouse.current.smoothX) * 0.08;
      mouse.current.smoothY += (mouse.current.y - mouse.current.smoothY) * 0.08;

      ctx!.clearRect(0, 0, w, h);
      ctx!.save();
      ctx!.scale(dpr.current, dpr.current);
      ctx!.globalCompositeOperation = "lighter";

      const lw = w / dpr.current;
      const lh = h / dpr.current;

      for (const c of CURTAINS) {
        drawCurtain(c, t, lw, lh);
      }

      ctx!.restore();
      raf.current = requestAnimationFrame(frame);
    }

    raf.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("mousemove", onMouseMove);
      canvas.parentElement?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full animate-[aurora-fade-in_2.5s_ease-out_0.3s_both]"
      style={{ filter: "blur(60px) saturate(1.2)" }}
    />
  );
}
