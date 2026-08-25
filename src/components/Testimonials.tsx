"use client";

import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Tilt3DCard from "./Tilt3DCard";
import { testimonials } from "@/data/testimonials";

/**
 * TESTIMONIALS — only genuine quotes belong here (point 31).
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section" aria-labelledby="testimonials-heading">
      <div className="container-content">
        <SectionHeading
          index="06"
          label="Testimonials"
          title={
            <span id="testimonials-heading">
              What people <span className="text-accent">say.</span>
            </span>
          }
        />

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <Tilt3DCard maxTilt={8} scale={1.025} glowColor="rgba(255, 255, 255, 0.08)" className="h-full rounded-2xl">
                <figure className="glass relative overflow-hidden flex h-full flex-col rounded-2xl p-8 transition-all duration-300 hover:border-white/30">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <Quote size={24} className="text-amber-400" aria-hidden />
                    <span className="font-mono text-[9px] tracking-widest text-amber-400/90 uppercase">
                      SIGNAL RECEIVED // 0{i + 1}
                    </span>
                  </div>
                  <blockquote className="mt-5 flex-1 font-body text-lg leading-relaxed text-white/85">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-7 border-t border-white/10 pt-5 flex items-center justify-between">
                    <div>
                      <p className="font-display text-sm font-semibold text-white">{t.name}</p>
                      <p className="mt-0.5 font-body text-xs text-muted">{t.role}</p>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  </figcaption>
                </figure>
              </Tilt3DCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
