"use client";

import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Tilt3DCard from "./Tilt3DCard";
import { services } from "@/data/services";

/**
 * SERVICES — exactly what I build, no "world-class revolutionary" fluff (points 26–27).
 */
export default function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-heading">
      <div className="container-content">
        <SectionHeading
          index="05"
          label="Services"
          title={
            <span id="services-heading">
              What I <span className="text-accent">build.</span>
            </span>
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <Tilt3DCard maxTilt={8} scale={1.03} glowColor="rgba(255, 255, 255, 0.08)" className="h-full rounded-2xl">
                <div className="group glass relative overflow-hidden flex h-full flex-col rounded-2xl p-7 transition-all duration-500 hover:border-white/30">
                  {/* Cosmic Module Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-display text-xs tracking-[0.3em] text-amber-400 font-semibold">
                      MODULE 0{i + 1}
                    </span>
                    <span className="font-mono text-[9px] tracking-widest text-emerald-400 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVE
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl text-white">{service.title}</h3>
                  <p className="mt-1.5 font-body text-sm text-muted">{service.description}</p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 font-body text-[13px] text-white/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-auto flex items-center gap-2 pt-6 font-body text-xs tracking-wide text-white/50 transition-colors group-hover:text-white"
                    data-cursor="link"
                  >
                    DEPLOY MODULE
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </Tilt3DCard>
            </Reveal>
          ))}

          {/* CTA tile to keep the grid balanced */}
          <Reveal delay={0.3}>
            <Tilt3DCard maxTilt={8} scale={1.03} glowColor="rgba(255, 255, 255, 0.3)" className="h-full rounded-2xl">
              <div className="flex h-full min-h-[220px] flex-col justify-between rounded-2xl bg-accent p-7 shadow-[0_0_40px_rgba(124,92,255,0.4)]">
                <p className="font-display text-xl leading-snug text-white">
                  Have something else in mind?
                </p>
                <a
                  href="mailto:hello@sourabhjoshi.dev"
                  className="flex items-center gap-2 font-body text-sm font-medium text-white transition-transform hover:translate-x-1"
                  data-cursor="link"
                >
                  Let's talk about it
                  <ArrowRight size={14} />
                </a>
              </div>
            </Tilt3DCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
