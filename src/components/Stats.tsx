"use client";

import Reveal from "./Reveal";
import Tilt3DCard from "./Tilt3DCard";
import { stats } from "@/data/experience";

/**
 * STATS — quick credibility, genuine numbers only (point 30).
 */
export default function Stats() {
  return (
    <section id="stats" className="section !py-24 md:!py-32" aria-label="Stats">
      <div className="container-content">
        <Reveal>
          <div className="hairline mb-14" />
        </Reveal>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <Tilt3DCard maxTilt={10} scale={1.04} glowColor="rgba(255, 255, 255, 0.08)" className="rounded-2xl">
                <div className="glass relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 hover:border-white/30">
                  {/* Cosmic Reticle Accent */}
                  <span className="absolute top-2 right-3 font-mono text-[8px] tracking-widest text-amber-400/80">TELEMETRY 0{i + 1}</span>
                  <p className="display text-5xl text-gradient md:text-6xl">{s.value}</p>
                  <p className="label mt-3">{s.label}</p>
                </div>
              </Tilt3DCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="hairline mt-14" />
        </Reveal>
      </div>
    </section>
  );
}
