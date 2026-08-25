"use client";

import { ArrowUp, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";

const icons = { github: Github, linkedin: Linkedin, instagram: Instagram, mail: Mail } as const;

/**
 * FOOTER — minimal, with a little personality (point 34).
 */
export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)]">
      <div className="container-content flex flex-col items-center gap-8 py-12 md:py-14">
        <div className="flex flex-col items-center gap-3">
          <span className="display text-2xl tracking-tight">{site.name.toUpperCase()}</span>
          <span className="label">DEVELOPER • CREATOR • BUILDER</span>
        </div>

        <div className="flex items-center gap-5">
          {site.socials.map((s) => {
            const Icon = icons[s.icon as keyof typeof icons];
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="text-white/45 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
                data-cursor="link"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        <div className="hairline w-full max-w-md" />

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-body text-xs text-white/35">
            © 2026 {site.name} · Built with Headaches & Crying ·
          </p>
          <p className="font-body text-[11px] italic text-white/25">
            Designed somewhere between logic and chaos.
          </p>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="glass flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:text-white"
          aria-label="Back to top"
          data-cursor="link"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
