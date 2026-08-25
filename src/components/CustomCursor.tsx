"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Context-aware custom cursor (points 36, 35).
 * - Normal: small dot + trailing ring
 * - Hovering [data-cursor="view"]  → "VIEW" pill (project cards)
 * - Hovering links / [data-cursor="link"] → arrow ↗
 * Disabled on touch devices and under reduced motion.
 */
export default function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"default" | "view" | "link" | "drag">("default");
  const [hidden, setHidden] = useState(true);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!fine || reduced) return;
    document.body.classList.add("custom-cursor");

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let currentMode: "default" | "view" | "link" | "drag" = "default";
    let isHidden = true;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (isHidden) {
        isHidden = false;
        setHidden(false);
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      const target = (e.target as HTMLElement).closest?.(
        "[data-cursor], a, button"
      ) as HTMLElement | null;
      
      let nextMode: "default" | "view" | "link" | "drag" = "default";
      if (target) {
        if (target.dataset.cursor === "view") nextMode = "view";
        else if (target.dataset.cursor === "drag") nextMode = "drag";
        else nextMode = "link";
      }

      if (nextMode !== currentMode) {
        currentMode = nextMode;
        setMode(nextMode);
      }
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.14;
      ring.y += (pos.y - ring.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      {/* dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-opacity duration-200"
        style={{ opacity: hidden ? 0 : 1 }}
        aria-hidden
      />
      {/* ring / label */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[119] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 transition-[width,height,background-color,border-color,opacity] duration-300"
        style={{
          opacity: hidden ? 0 : 1,
          width: mode === "view" ? 72 : mode === "drag" ? 72 : 36,
          height: mode === "view" ? 72 : mode === "drag" ? 72 : 36,
          background: mode === "view" || mode === "drag" ? "rgba(18, 18, 24, 0.85)" : "transparent",
          borderColor: mode === "view" || mode === "drag" ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.25)",
        }}
        aria-hidden
      >
        {mode === "view" && (
          <span className="font-display text-[10px] font-semibold tracking-[0.18em] text-white">VIEW</span>
        )}
        {mode === "drag" && (
          <span className="font-display text-[10px] font-semibold tracking-[0.18em] text-white">DRAG</span>
        )}
        {mode === "link" && (
          <span className="text-sm text-white/80 transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
        )}
      </div>
    </>
  );
}
