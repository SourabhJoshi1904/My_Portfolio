"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Quick, branded preloader (point 41 — a loader must never outstay its welcome).
 * It hides the 3D asset spin-up, then hands over to the hero intro.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const hasVisited = typeof window !== "undefined" && sessionStorage.getItem("sj_visited");
    const DURATION = hasVisited ? 150 : 350;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 2);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("sj_visited", "true");
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          aria-hidden={done}
        >
          <motion.span
            className="display text-5xl tracking-tight md:text-6xl"
            initial={reduced ? {} : { opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.05em" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            SJ
          </motion.span>
          <span className="label mt-4">LOADING EXPERIENCE</span>
          <div className="mt-6 h-px w-48 overflow-hidden bg-white/10 md:w-64">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <span className="mt-3 font-body text-xs tabular-nums text-muted">{progress}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
