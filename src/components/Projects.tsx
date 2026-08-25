"use client";

import { featuredProjectIds, projects, type Project } from "@/data/projects";
import { ArrowUpRight, ExternalLink, Sparkles, LayoutGrid, MonitorPlay, CheckCircle2, Cpu, Zap, Activity, Clock } from "lucide-react";
import { useState, useMemo } from "react";
import CaseStudy from "./CaseStudy";
import ProjectVisual from "./ProjectVisual";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Tilt3DCard from "./Tilt3DCard";

const CATEGORIES = ["ALL", "AI · FULL STACK", "FINTECH", "ENTERPRISE", "ENTERTAINMENT"] as const;

const isRealLiveLink = (url?: string) => Boolean(url && url.trim() !== "" && !url.includes("example.com"));

/**
 * FEATURED WORK — Executive Bento Grid & Interactive Spotlight Stage.
 * Ultra-high-end presentation featuring asymmetric Bento cards, category filtering,
 * live telemetry badges, and interactive Spotlight Stage view mode.
 */
export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"bento" | "spotlight">("bento");
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);

  const featured = useMemo(() => {
    return featuredProjectIds
      .map((id) => projects.find((p) => p.id === id))
      .filter((p): p is Project => Boolean(p));
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "ALL") return featured;
    return featured.filter((p) =>
      p.category.toUpperCase().includes(activeCategory.toUpperCase())
    );
  }, [featured, activeCategory]);

  const openProject = featured.find((p) => p.id === openId) ?? null;
  const currentSpotlight = filteredProjects[spotlightIndex] || filteredProjects[0] || featured[0];

  return (
    <section id="work" className="section relative overflow-hidden" aria-labelledby="work-heading">
      {/* Background ambient lighting grid accent */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-accent/5 blur-[160px]" />
      <div className="pointer-events-none absolute right-0 top-3/4 -z-10 h-[450px] w-[450px] rounded-full bg-indigo-500/5 blur-[140px]" />

      <div className="container-content">
        {/* Section Header with View Mode Switcher */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="03"
            label="Selected Work"
            title={
              <span id="work-heading">
                Featured <span className="text-accent">projects.</span>
              </span>
            }
          />
          
          <div className="flex flex-wrap items-center gap-4">
            {/* View Mode Toggle: Bento vs Spotlight Stage */}
            <div className="flex items-center rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setViewMode("bento")}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-medium transition-all duration-300 ${
                  viewMode === "bento"
                    ? "border border-white/30 bg-white/15 text-white shadow-sm"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <LayoutGrid size={13} />
                BENTO GRID
              </button>

              <button
                type="button"
                onClick={() => setViewMode("spotlight")}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-medium transition-all duration-300 ${
                  viewMode === "spotlight"
                    ? "border border-white/30 bg-white/15 text-white shadow-sm"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <MonitorPlay size={13} />
                SPOTLIGHT STAGE
              </button>
            </div>

            <Reveal delay={0.15}>
              <a
                href="https://github.com/SourabhJoshi1904"
                target="_blank"
                rel="noopener noreferrer"
                className="label flex items-center gap-2 text-white/60 transition-colors hover:text-white"
                data-cursor="link"
              >
                GITHUB
                <ArrowUpRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <Reveal delay={0.2} className="mt-8 md:mt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setSpotlightIndex(0);
                    }}
                    className={`rounded-full px-4 py-1.5 font-mono text-[11px] font-medium transition-all duration-300 ${
                      isActive
                        ? "border border-white/40 bg-white/15 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        : "border border-white/10 bg-white/5 text-white/60 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="hidden font-mono text-[10px] tracking-widest text-white/40 md:block">
              EXECUTIVE MODULES ({filteredProjects.length} AVAILABLE)
            </div>
          </div>
        </Reveal>

        {/* MODE 1: BENTO SHOWCASE GRID */}
        {viewMode === "bento" && (
          <div className="mt-10 flex flex-col gap-8 md:mt-12">
            {/* 1. Flagship Featured Project (Full-Width Split Bento Hero Card) */}
            {filteredProjects.length > 0 && (
              <Reveal delay={0.05}>
                <Tilt3DCard maxTilt={4} scale={1.01} glowColor="rgba(255, 255, 255, 0.08)" className="w-full rounded-2xl">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setOpenId(filteredProjects[0].id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenId(filteredProjects[0].id);
                      }
                    }}
                    className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-[#090a10]/90 text-left backdrop-blur-xl transition-all duration-500 hover:border-white/35 shadow-2xl"
                    data-cursor="view"
                    aria-label={`Open case study: ${filteredProjects[0].title}`}
                  >
                    {/* Ambient radial accent lighting */}
                    <div
                      className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-25 blur-[100px] transition-opacity duration-500 group-hover:opacity-40"
                      style={{ background: filteredProjects[0].accent }}
                    />

                    {/* Top Telemetry Header */}
                    <div className="flex items-center justify-between border-b border-white/10 bg-black/50 px-6 py-3.5 backdrop-blur-md md:px-8">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-xs tracking-[0.25em] text-white/50">
                          FLAGSHIP // {filteredProjects[0].index}
                        </span>
                        <span className="h-3.5 w-px bg-white/20" />
                        <span className="rounded-full bg-accent/20 px-3 py-0.5 font-mono text-[9px] font-semibold tracking-widest text-accent uppercase border border-accent/40">
                          {filteredProjects[0].category}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-[10px] font-mono text-white/60">
                        <span className="hidden sm:inline">SYSTEM: <strong className="text-emerald-400 font-normal">OPERATIONAL</strong></span>
                        <span className="hidden sm:inline h-3 w-px bg-white/10" />
                        <span>TIMELINE: <strong className="text-white font-normal">{filteredProjects[0].timeline}</strong></span>
                      </div>
                    </div>

                    {/* Split 2-Column Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                      {/* Left: Interactive Visual Frame (7 cols) */}
                      <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[360px] lg:min-h-[440px] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
                        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                          <ProjectVisual projectId={filteredProjects[0].id} />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090a10] via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-30" />
                      </div>

                      {/* Right: Technical Executive Overview (5 cols) */}
                      <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 mb-2">
                            <Zap size={12} className="text-accent" />
                            <span>FEATURED ARCHITECTURE</span>
                          </div>
                          
                          <h3 className="display text-3xl md:text-4xl font-bold tracking-tight text-white transition-transform duration-500 group-hover:-translate-y-0.5">
                            {filteredProjects[0].title}
                          </h3>
                          
                          <p className="mt-3 font-body text-sm leading-relaxed text-muted md:text-base">
                            {filteredProjects[0].description}
                          </p>

                          {/* Architecture Bullets */}
                          <div className="mt-5 space-y-2 border-t border-b border-white/10 py-4">
                            {filteredProjects[0].features.slice(0, 3).map((feat, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs font-body text-white/85">
                                <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>

                          {/* Tech Stack Tags */}
                          <div className="mt-5 flex flex-wrap gap-2">
                            {filteredProjects[0].tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-body text-[11px] text-white/85 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Dual Action CTAs */}
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                          {isRealLiveLink(filteredProjects[0].live) ? (
                            <a
                              href={filteredProjects[0].live}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-mono text-xs font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/15"
                              data-cursor="link"
                            >
                              LIVE DEMO
                              <ExternalLink size={13} />
                            </a>
                          ) : (
                            <span
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-mono text-xs font-semibold text-white/40 cursor-not-allowed select-none"
                            >
                              <Clock size={13} />
                              DEVELOPMENT
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => setOpenId(filteredProjects[0].id)}
                            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/15 px-6 py-3 font-mono text-xs font-semibold text-white transition-all duration-300 group-hover:border-white/60 group-hover:bg-white/25"
                          >
                            <Sparkles size={13} className="text-accent" />
                            EXPLORE CASE STUDY
                            <ArrowUpRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt3DCard>
              </Reveal>
            )}

            {/* 2. Secondary & Tertiary Projects Bento Grid (2-Columns Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
              {filteredProjects.slice(1).map((project, i) => (
                <Reveal key={project.id} delay={0.06 * (i + 1)}>
                  <Tilt3DCard maxTilt={5} scale={1.015} glowColor="rgba(255, 255, 255, 0.08)" className="h-full rounded-2xl">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setOpenId(project.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpenId(project.id);
                        }
                      }}
                      className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#090a10]/90 text-left backdrop-blur-xl transition-all duration-500 hover:border-white/30"
                      data-cursor="view"
                      aria-label={`Open case study: ${project.title}`}
                    >
                      {/* Ambient light glow */}
                      <div
                        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-[80px] transition-opacity duration-500 group-hover:opacity-35"
                        style={{ background: project.accent }}
                      />

                      {/* Header bar */}
                      <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-5 py-3 backdrop-blur-md">
                        <div className="flex items-center gap-2.5">
                          <span className="font-display text-xs tracking-widest text-white/50">{project.index}</span>
                          <span className="h-3 w-px bg-white/20" />
                          <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[9px] text-white/80 uppercase">
                            {project.category}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-white/40">{project.timeline}</span>
                      </div>

                      {/* Screenshot Visual Frame */}
                      <div className="relative aspect-[16/8] w-full overflow-hidden border-b border-white/10">
                        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                          <ProjectVisual projectId={project.id} />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090a10] via-transparent to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-30" />
                      </div>

                      {/* Content zone */}
                      <div className="p-6 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="display text-2xl font-bold text-white transition-transform duration-500 group-hover:-translate-y-0.5">
                            {project.title}
                          </h3>
                          <p className="mt-2 font-body text-sm leading-relaxed text-muted line-clamp-2">
                            {project.oneLiner}
                          </p>

                          {/* Tech Pills */}
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.tags.slice(0, 4).map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-body text-[10px] text-white/80 transition-colors group-hover:border-white/25"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                          {isRealLiveLink(project.live) ? (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 font-mono text-xs font-semibold text-white/70 hover:text-white transition-colors"
                              data-cursor="link"
                            >
                              LIVE LINK
                              <ExternalLink size={12} />
                            </a>
                          ) : (
                            <span
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 font-mono text-xs font-semibold text-white/40 select-none"
                            >
                              <Clock size={12} />
                              DEVELOPMENT
                            </span>
                          )}

                          <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-white transition-all duration-300 group-hover:gap-2">
                            CASE STUDY
                            <ArrowUpRight size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Tilt3DCard>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* MODE 2: SPOTLIGHT STAGE VIEW */}
        {viewMode === "spotlight" && (
          <div className="mt-10 flex flex-col gap-8 md:mt-12">
            {/* Interactive Spotlight Stage Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur-md">
              {filteredProjects.map((p, idx) => {
                const isSelected = spotlightIndex === idx;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSpotlightIndex(idx)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-medium transition-all duration-300 ${
                      isSelected
                        ? "border border-white/40 bg-white/20 text-white shadow-lg"
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="font-display text-[10px] opacity-60">{p.index}</span>
                    <span>{p.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Cinema Stage Spotlight Container */}
            {currentSpotlight && (
              <Reveal key={currentSpotlight.id} delay={0.05}>
                <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-[#08090e] p-6 md:p-10 shadow-2xl backdrop-blur-2xl">
                  <div
                    className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full opacity-30 blur-[120px]"
                    style={{ background: currentSpotlight.accent }}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Visual Showcase (7 cols) */}
                    <div className="lg:col-span-7 relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/15 shadow-2xl">
                      <ProjectVisual projectId={currentSpotlight.id} />
                    </div>

                    {/* Technical Stage Info (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-accent">
                          <Cpu size={14} />
                          <span>SPOTLIGHT SYSTEM // {currentSpotlight.index}</span>
                        </div>

                        <h3 className="display text-3xl md:text-4xl font-bold text-white mt-2">
                          {currentSpotlight.title}
                        </h3>

                        <p className="mt-3 font-body text-sm text-muted leading-relaxed">
                          {currentSpotlight.description}
                        </p>

                        <div className="mt-6 space-y-3">
                          <h4 className="label text-[10px] tracking-widest text-white/50">SYSTEM HIGHLIGHTS</h4>
                          {currentSpotlight.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs font-body text-white/90">
                              <Activity size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {currentSpotlight.tags.map((t) => (
                            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                        {isRealLiveLink(currentSpotlight.live) ? (
                          <a
                            href={currentSpotlight.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 font-mono text-xs font-semibold text-white hover:bg-white/20 transition-all"
                          >
                            LAUNCH LIVE <ExternalLink size={13} />
                          </a>
                        ) : (
                          <span
                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 font-mono text-xs font-semibold text-white/40 cursor-not-allowed select-none"
                          >
                            <Clock size={13} /> DEVELOPMENT
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => setOpenId(currentSpotlight.id)}
                          className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-6 py-2.5 font-mono text-xs font-semibold text-white hover:bg-white/30 transition-all"
                        >
                          FULL CASE STUDY <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        )}
      </div>

      {/* Case study modal */}
      <CaseStudy project={openProject} onClose={() => setOpenId(null)} />
    </section>
  );
}
