"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";

/**
 * 2.5D cinematic fallback (points 45, 81).
 * Used on mobile and when WebGL is unavailable — the user should never
 * notice the switch. Drifting starfield, nebula glows, orbiting planets.
 */
export default function Hero2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Star = { x: number; y: number; r: number; s: number; p: number; layer: number };
    let stars: Star[] = [];

    const makeStars = () => {
      const count = Math.min(180, Math.floor((w * h) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2,
        s: Math.random() * 0.18 + 0.03,
        p: Math.random() * Math.PI * 2,
        layer: Math.random() > 0.7 ? 2 : 1,
      }));
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeStars();
    };

    const planets = [
      { rx: 0.16, ry: 0.05, size: 4, color: "#4f9cf7", speed: 0.12, ring: false },
      { rx: 0.24, ry: 0.075, size: 6, color: "#d8a86a", speed: 0.08, ring: true },
      { rx: 0.32, ry: 0.1, size: 4, color: "#d96a4a", speed: 0.05, ring: false },
    ];

    let t = 0;
    let raf = 0;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;

      ctx.clearRect(0, 0, w, h);
      // nebula glows
      const neb1 = ctx.createRadialGradient(w * 0.2, h * 0.15, 0, w * 0.2, h * 0.15, w * 0.45);
      neb1.addColorStop(0, "rgba(124,92,255,0.10)");
      neb1.addColorStop(1, "rgba(124,92,255,0)");
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, w, h);
      const neb2 = ctx.createRadialGradient(w * 0.85, h * 0.8, 0, w * 0.85, h * 0.8, w * 0.5);
      neb2.addColorStop(0, "rgba(56,120,255,0.07)");
      neb2.addColorStop(1, "rgba(56,120,255,0)");
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, w, h);

      // stars with twinkle + drift
      for (const s of stars) {
        const tw = 0.45 + 0.55 * Math.abs(Math.sin(t * 0.8 + s.p));
        ctx.globalAlpha = tw * (s.layer === 2 ? 0.9 : 0.5);
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, (s.y + t * s.s * 12) % h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const sx = w * 0.62;
      const sy = h * 0.36;

      // sun glow
      const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, w * 0.14);
      glow.addColorStop(0, "rgba(255,190,110,0.55)");
      glow.addColorStop(0.25, "rgba(255,150,70,0.18)");
      glow.addColorStop(1, "rgba(255,150,70,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(sx, sy, w * 0.14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffd9a0";
      ctx.beginPath();
      ctx.arc(sx, sy, w * 0.014, 0, Math.PI * 2);
      ctx.fill();

      // planets
      for (const p of planets) {
        const a = t * p.speed;
        const px = sx + Math.cos(a) * p.rx * w;
        const py = sy + Math.sin(a) * p.ry * w;
        ctx.strokeStyle = "rgba(255,255,255,0.10)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(sx, sy, p.rx * w, p.ry * w, 0, 0, Math.PI * 2);
        ctx.stroke();
        if (p.ring) {
          ctx.strokeStyle = "rgba(226,197,143,0.5)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(px, py, p.size * 1.7, p.size * 0.55, -0.4, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      draw(now);
      if (!reduced) raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
