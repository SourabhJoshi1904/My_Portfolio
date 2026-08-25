"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Tilt3DCard from "./Tilt3DCard";
import { journey } from "@/data/experience";

/**
 * JOURNEY — honest timeline, no invented roles (point 28).
 * The line progressively fills as you scroll (point 29).
 */
export default function Journey() {
  return (
    <section id="journey" className="section" aria-labelledby="journey-heading">
      <div className="container-content">
        <SectionHeading
          index="04"
          label="My Journey"
          title={
            <span id="journey-heading">
              From first lines to <span className="text-accent">full-stack.</span>
            </span>
          }
        />

        <div className="relative mt-14 md:mt-20">
          {/* the rail that fills as you scroll */}
          <motion.div
            className="absolute left-[7px] top-0 h-full w-px bg-white/10 md:left-1/2"
            aria-hidden
          >
            <motion.div
              className="w-full origin-top bg-gradient-to-b from-accent to-[#2dd4bf]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              style={{ height: "100%" }}
            />
          </motion.div>

          <div className="flex flex-col gap-12 md:gap-16">
            {journey.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={step.year} delay={0.05} className="relative md:grid md:grid-cols-2 md:gap-16">
                  {/* Cosmic Orbital Beacon Node */}
                  <div
                    className={`absolute left-0 top-6 flex items-center justify-center h-[18px] w-[18px] rounded-full border-2 border-amber-400 bg-[#050505] shadow-[0_0_20px_rgba(251,191,36,0.8)] md:left-1/2 md:-translate-x-1/2`}
                    aria-hidden
                  >
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping opacity-75" />
                  </div>
                  <div className={`pl-10 md:pl-0 ${left ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}`}>
                    <Tilt3DCard maxTilt={8} scale={1.03} glowColor="rgba(255, 255, 255, 0.08)" className="rounded-2xl">
                      <div className="glass relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-white/30">
                        <div className="mb-2 flex items-center gap-2 justify-between">
                          <p className="font-display text-4xl font-semibold tracking-tight text-gradient md:text-5xl">
                            {step.year}
                          </p>
                          <span className="font-mono text-[9px] tracking-widest text-amber-400/90 uppercase rounded-full bg-amber-400/10 px-2.5 py-1 border border-amber-400/20">
                            LOG // SECTOR 0{i + 1}
                          </span>
                        </div>
                        <h3 className="mt-2 font-display text-xl text-white md:text-2xl">{step.title}</h3>
                        <p className="mt-2 font-body text-[15px] leading-relaxed text-muted">{step.detail}</p>
                      </div>
                    </Tilt3DCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
