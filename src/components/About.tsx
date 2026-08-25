"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Tilt3DCard from "./Tilt3DCard";
import TerminalModule from "./TerminalModule";
import { Terminal as TerminalIcon, UserCheck } from "lucide-react";

/**
 * ABOUT — short, confident, structured with interactive Terminal CLI switcher.
 */
export default function About() {
  const [activeTab, setActiveTab] = useState<"visual" | "terminal">("visual");

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container-content">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="01"
            label="About"
            title={
              <span id="about-heading">
                I turn ideas into <span className="text-accent">digital products.</span>
              </span>
            }
          />

          {/* Mode Switcher: Holographic Profile vs Developer CLI */}
          <div className="flex items-center rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab("visual")}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] font-medium transition-all duration-300 ${
                activeTab === "visual"
                  ? "border border-amber-400/40 bg-amber-400/15 text-amber-300 shadow-sm"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <UserCheck size={13} />
              VISUAL PROFILE
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("terminal")}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] font-medium transition-all duration-300 ${
                activeTab === "terminal"
                  ? "border border-amber-400/40 bg-amber-400/15 text-amber-300 shadow-sm"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <TerminalIcon size={13} />
              SOURABH-OS CLI
            </button>
          </div>
        </div>

        {activeTab === "visual" ? (
          <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-[1.15fr_0.85fr] md:gap-20">
            <div className="space-y-10">
              <Reveal delay={0.05}>
                <h3 className="label mb-3">WHO I AM</h3>
                <p className="font-body text-lg leading-relaxed text-white/85 md:text-xl">
                  Developer focused on building modern web applications and interactive
                  experiences — where interface craft, engineering discipline and a
                  little cinematic flair meet.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h3 className="label mb-3">WHAT I DO</h3>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {[
                    "Frontend engineering",
                    "Full-stack development",
                    "AI integrations",
                    "Interactive UI",
                    "3D experiences",
                    "Performance & accessibility",
                  ].map((item) => (
                    <li key={item} className="group flex items-center gap-3 font-body text-[15px] text-muted transition-colors hover:text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 transition-all duration-300 group-hover:scale-150" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.15}>
                <h3 className="label mb-3">HOW I WORK</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {["Design", "Build", "Test", "Optimize", "Ship"].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="glass rounded-full px-4 py-2 font-body text-sm text-white/85 transition-all duration-300 hover:border-white/30 hover:bg-white/5">
                        {step}
                      </span>
                      {i < 4 && <span className="text-amber-400/80" aria-hidden>→</span>}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Holographic portrait card with 3D Tilt & Cosmic Orbital HUD */}
            <Reveal delay={0.12} className="mx-auto w-full max-w-sm">
              <Tilt3DCard maxTilt={10} scale={1.0} glowColor="rgba(255, 255, 255, 0.08)" className="rounded-2xl">
                <div className="relative">
                  {/* 3D Cosmic Orbital Rings & Radar Grid */}
                  <div className="absolute -inset-8 rounded-full border border-dashed border-accent/20 animate-spin-slow" aria-hidden />
                  <div className="absolute -inset-12 rounded-full border border-white/5 animate-reverse-spin" aria-hidden />
                  <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-accent/25 blur-3xl" aria-hidden />
                  <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-[#2dd4bf]/20 blur-3xl" aria-hidden />

                  <div className="glass relative overflow-hidden rounded-2xl p-3 shadow-[0_0_50px_rgba(124,92,255,0.2)]">
                    <div className="relative overflow-hidden rounded-xl">
                      <Image
                        src="/images/portrait.jpg"
                        alt="Portrait of Sourabh Joshi, full-stack developer"
                        width={1000}
                        height={1250}
                        sizes="(max-width: 768px) 90vw, 400px"
                        className="h-auto w-full object-cover scale-[1.5] -translate-x-[10%] origin-center contrast-[1.01] brightness-[1.01]"
                        priority={false}
                      />
                      {/* Subtly tinted top gradient only, no bottom obscure overlay */}
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(160deg, rgba(124,92,255,0.15), transparent 40%)",
                        }}
                      />
                      {/* Cosmic HUD Top Tag */}
                      <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10 font-mono text-[9px] tracking-widest text-accent">
                        ORBITAL HUB // 01
                      </div>

                      {/* Clean & Fully Visible Bottom HUD Bar */}
                      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                        <div className="flex items-center justify-between gap-2 px-1">
                          <div>
                            <span className="block font-display text-sm font-bold tracking-widest text-white">
                              SOURABH JOSHI
                            </span>
                            <span className="block font-mono text-[10px] tracking-wider text-amber-400 font-medium">
                              Full-Stack Architect
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-1 font-mono text-[10px] font-semibold text-emerald-400 backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            ONLINE
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt3DCard>
            </Reveal>
          </div>
        ) : (
          <Reveal delay={0.05} className="mt-10 md:mt-14">
            <TerminalModule />
          </Reveal>
        )}
      </div>
    </section>
  );
}
