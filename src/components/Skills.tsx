"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Tilt3DCard from "./Tilt3DCard";
import { skillGroups } from "@/data/skills";

/**
 * SKILLS — grouped by discipline, no meaningless percentages (point 18).
 * Hovering a skill shows which real projects it was used in (point 19).
 */
export default function Skills() {
  const [active, setActive] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="container-content">
        <SectionHeading
          index="02"
          label="Skills & Tech Stack"
          title={
            <span id="skills-heading">
              The tools behind <span className="text-accent">the work.</span>
            </span>
          }
        />

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2" onMouseLeave={() => setActive(null)}>
          {skillGroups.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 0.06}>
              <Tilt3DCard maxTilt={8} scale={1.025} glowColor="rgba(255, 255, 255, 0.08)" className="h-full rounded-2xl">
                <div className="glass relative overflow-hidden h-full rounded-2xl p-7 transition-all duration-300 hover:border-white/30">
                  {/* Cosmic background orbital line decor */}
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border border-dashed border-amber-400/20 animate-spin-slow" aria-hidden />
                  <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="label flex items-center gap-3">
                      <span className="font-display text-sm text-amber-400">{String(gi + 1).padStart(2, "0")}</span>
                      {group.group.toUpperCase()}
                    </h3>
                    <span className="font-mono text-[10px] tracking-widest text-amber-400/80 uppercase">ORBITAL SECTOR 0{gi + 1}</span>
                  </div>
                  <ul className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="group relative cursor-default flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 font-body text-sm text-white/85 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
                        onMouseEnter={(e) => {
                          setActive(item.name);
                          const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                          setPos({ x: r.left + r.width / 2, y: r.top - 10 });
                        }}
                        onMouseLeave={() => setActive(null)}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white/40 transition-all group-hover:scale-150 group-hover:bg-white" />
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt3DCard>
            </Reveal>
          ))}
        </div>

        {/* hover tooltip: where this skill was actually used */}
        {active && (
          <div
            className="pointer-events-none fixed z-[70] -translate-x-1/2 -translate-y-full rounded-xl border border-amber-400/40 bg-[#0a0b12]/95 px-4 py-2.5 font-body text-xs text-white/90 shadow-[0_8px_30px_rgba(245,158,11,0.25)] backdrop-blur-md"
            style={{ left: pos.x, top: pos.y }}
            role="tooltip"
          >
            <span className="font-mono text-[10px] text-amber-400 font-semibold block uppercase">PROVEN PRODUCTION IMPACT</span>
            Used in:{" "}
            <span className="text-amber-300 font-semibold">
              {skillGroups.flatMap((g) => g.items).find((i) => i.name === active)?.usedIn}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
