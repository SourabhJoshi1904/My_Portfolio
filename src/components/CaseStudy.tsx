"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, X, Clock } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";

const isRealLiveLink = (url?: string) => Boolean(url && url.trim() !== "" && !url.includes("example.com"));

/**
 * Full case-study modal (point 23): Problem → Solution → Architecture
 * → How it works → Challenges → Result. Focus-trapped, ESC to close.
 */
export default function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* focus + scroll lock */
  useEffect(() => {
    if (project) {
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  /* ESC to close + focus trap */
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label={`Case study: ${project.title}`}
        >
          <motion.div
            ref={panelRef}
            className="relative flex max-h-[92svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-[var(--border)] bg-[#07070a] md:max-h-[88svh] md:rounded-2xl"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* header */}
            <div className="relative shrink-0 overflow-hidden border-b border-[var(--border)]">
              <div
                className="h-24 w-full md:h-32"
                style={{
                  background: `radial-gradient(ellipse 90% 130% at 20% 0%, ${project.accent}33, transparent 60%), #0a0a0f`,
                }}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-7">
                <div>
                  <p className="label mb-2 flex items-center gap-2">
                    <span className="text-accent">{project.index}</span>
                    <span>{project.category}</span>
                  </p>
                  <h3 className="display text-3xl md:text-5xl">{project.title}</h3>
                  <p className="mt-2 max-w-xl font-body text-sm text-muted md:text-base">
                    {project.description}
                  </p>
                </div>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-white/70 transition-colors hover:border-white/40 hover:text-white"
                  aria-label="Close case study"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* scrollable body */}
            <div className="overflow-y-auto overscroll-contain px-5 py-7 md:px-8 md:py-9">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { k: "ROLE", v: project.role },
                  { k: "TIMELINE", v: project.timeline },
                  { k: "TYPE", v: project.category },
                ].map((f) => (
                  <div key={f.k} className="glass rounded-xl px-4 py-3.5">
                    <p className="label !text-[10px]">{f.k}</p>
                    <p className="mt-1.5 font-body text-sm text-white/85">{f.v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="label mb-2">TECH</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span key={t} className="rounded-full border border-[var(--border)] px-3 py-1.5 font-body text-xs text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <CaseBlock title="Problem" body={project.problem} />
              <CaseBlock title="Solution" body={project.solution} />

              <div className="mt-9">
                <p className="label mb-4">FEATURES</p>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 font-body text-sm text-white/75">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-9">
                <p className="label mb-4">ARCHITECTURE</p>
                <div className="glass flex flex-col overflow-hidden rounded-xl">
                  {project.architecture.map((layer, i) => (
                    <div key={layer.label}>
                      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5">
                        <span className="font-display text-sm font-semibold tracking-wide text-accent">
                          {layer.label}
                        </span>
                        <span className="font-body text-xs text-muted">{layer.detail}</span>
                      </div>
                      {i < project.architecture.length - 1 && (
                        <div className="flex items-center justify-center border-y border-[var(--border)]/60 bg-white/[0.015] py-1">
                          <ArrowDown size={11} className="text-white/30" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-9">
                <p className="label mb-4">HOW IT WORKS</p>
                <ol className="grid gap-0 sm:grid-cols-2 sm:gap-x-8">
                  {project.howItWorks.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 border-b border-[var(--border)] py-3 font-body text-sm text-white/75">
                      <span className="font-display text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <CaseBlock title="Challenges" body={project.challenges} />
              <CaseBlock title="Result" body={project.result} accent />

              <div className="mt-10 flex flex-wrap items-center gap-3">
                {isRealLiveLink(project.live) ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    data-cursor="link"
                  >
                    Live Demo
                    <ArrowUpRight size={15} />
                  </a>
                ) : (
                  <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 font-mono text-xs font-semibold text-white/40 cursor-not-allowed select-none">
                    <Clock size={14} />
                    Development
                  </span>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  data-cursor="link"
                >
                  <Github size={15} />
                  View Code
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CaseBlock({ title, body, accent = false }: { title: string; body: string; accent?: boolean }) {
  return (
    <div className="mt-9">
      <p className="label mb-3">{title}</p>
      <p className={`font-body text-[15px] leading-relaxed ${accent ? "text-white/90" : "text-white/70"}`}>
        {body}
      </p>
    </div>
  );
}
