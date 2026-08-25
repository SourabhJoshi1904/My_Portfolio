"use client";

import { useIsMobile } from "@/hooks/useMediaQuery";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Hero2D from "./Hero2D";
import type { PlanetDef } from "./Hero3D";

/* 3D scene is lazy-loaded: only the hero pays for it (point 44) */
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false, loading: () => null });

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [webgl, setWebgl] = useState(true);
  const [ready, setReady] = useState(reduced);
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetDef | null>(null);
  const tooltipEl = useRef<HTMLDivElement>(null);

  /* WebGL support probe — silent 2D fallback if unavailable (point 81) */
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setWebgl(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setWebgl(false);
    }
  }, []);

  const use3D = webgl;

  return (
    <section id="home" className="relative h-[100svh] min-h-[620px] overflow-hidden" aria-label="Introduction">
      {/* background: 3D universe with WebGL, 2.5D canvas fallback */}
      {use3D ? (
        <Hero3D
          onReady={() => setReady(true)}
          tooltipEl={tooltipEl}
          hoveredPlanet={hoveredPlanet}
          onHoverPlanet={setHoveredPlanet}
        />
      ) : (
        <Hero2D />
      )}

      {/* legibility scrim */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.4) 34%, transparent 60%), radial-gradient(ellipse 90% 70% at 50% 100%, rgba(5,5,5,0.55), transparent)",
        }}
      />

      {/* planet tooltip — positioned by the 3D scene */}
      <div
        ref={tooltipEl}
        className="pointer-events-none absolute left-0 top-0 z-20 opacity-0 transition-opacity duration-200 block"
        aria-hidden
      >
        <AnimatePresence>
          {hoveredPlanet && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="glass flex items-center gap-3 whitespace-nowrap rounded-full px-5 py-2.5 shadow-2xl border border-amber-400/40"
            >
              <span className="font-display text-xs font-semibold tracking-[0.2em] text-amber-400">
                {hoveredPlanet.name}
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="font-body text-xs text-white/80">{hoveredPlanet.label}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* hero content — appears only after the cinematic settle */}
      <div className="container-content pointer-events-none relative z-10 flex h-full flex-col justify-end pb-14 md:pb-24">
        <motion.div
          className="pointer-events-none"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 34 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="mb-4 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono text-[10px] font-medium tracking-widest text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AVAILABLE FOR PROJECTS
            </span>
            <span className="h-3 w-px bg-white/20 hidden sm:inline" />
            <span className="font-mono text-[10px] tracking-widest text-amber-400/90 font-medium">
              FULL-STACK DEVELOPER
            </span>
          </motion.div>

          <h1 className="display text-[clamp(40px,8.5vw,115px)] select-none">
            <span className="text-gradient block font-bold tracking-tight">SOURABH JOSHI</span>
            <span className="mt-2 block text-[clamp(18px,3.2vw,42px)] leading-tight text-white/90">
              Building digital experiences
              <br className="hidden sm:block" /> for the modern web.
            </span>
          </h1>

          <motion.p
            className="mt-5 max-w-xl font-body text-sm leading-relaxed text-muted md:text-lg select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
          >
            Full-stack developer crafting interactive web applications, intelligent
            AI tools and immersive 3D digital products.
          </motion.p>

          {/* Tech Stack Pills Ticker */}
          <motion.div
            className="mt-5 flex flex-wrap items-center gap-1.5 md:gap-2 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
          >
            {["Next.js 15", "React 19", "Three.js 3D", "TypeScript", "Node.js", "TailwindCSS"].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 md:px-3 md:py-1 font-mono text-[10px] text-white/75 backdrop-blur-md transition-colors hover:border-amber-400/40 hover:text-white"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-7 md:mt-9 flex flex-wrap items-center gap-3.5 pointer-events-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button className="btn-primary group" onClick={() => scrollToId("work")} data-cursor="link">
              View My Work
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button className="btn-ghost" onClick={() => scrollToId("contact")} data-cursor="link">
              Let's Connect
            </button>
          </motion.div>

          {/* planet hint — responsive for both mobile touch and desktop */}
          {use3D && (
            <motion.p
              className="mt-7 font-body text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-white/45 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              TOUCH & DRAG TO ROTATE 3D SPACE 360° • TAP PLANETS TO NAVIGATE
              <br />
              SCROLL DOWN TO EXPLORE
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollToId("about")}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition-colors hover:text-white/80 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.3, duration: 1 }}
        aria-label="Scroll to about section"
        data-cursor="link"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
