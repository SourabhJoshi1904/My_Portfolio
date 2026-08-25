"use client";

import { motion, useSpring } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/** Thin accent progress bar at the very top (point 11 — location awareness). */
export default function ScrollProgress() {
  const progress = useScrollProgress();
  const scaleX = useSpring(progress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[85] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
