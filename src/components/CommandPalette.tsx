"use client";

import { useEffect, useState } from "react";
import { Search, Sparkles, FolderGit2, Cpu, User, Mail, FileText, ArrowRight, X, ExternalLink, Terminal, Award } from "lucide-react";
import { featuredProjectIds, projects } from "@/data/projects";
import { site } from "@/data/site";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md transition-all">
      {/* Backdrop overlay */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden />

      {/* Main Command Box */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-[#0a0b12] text-white shadow-2xl backdrop-blur-2xl">
        {/* Search Header */}
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <Search size={18} className="text-amber-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search project, or jump to section..."
            className="w-full bg-transparent font-body text-sm text-white placeholder:text-white/40 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all"
          >
            <X size={14} />
          </button>
        </div>

        {/* Command Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Quick Jump Navigation */}
          <div>
            <div className="px-3 pb-2 font-mono text-[10px] tracking-widest text-amber-400/80 uppercase">
              QUICK NAVIGATION
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { label: "ABOUT", id: "about", icon: User },
                { label: "SKILLS", id: "skills", icon: Cpu },
                { label: "PROJECTS", id: "work", icon: FolderGit2 },
                { label: "SERVICES", id: "services", icon: Sparkles },
                { label: "CERTIFICATES", id: "certificates", icon: Award },
                { label: "CONTACT", id: "contact", icon: Mail },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onClose();
                    scrollToId(item.id);
                  }}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 font-mono text-xs text-white/80 transition-all hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300"
                >
                  <item.icon size={14} className="text-amber-400" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="px-3 pb-2 font-mono text-[10px] tracking-widest text-amber-400/80 uppercase">
              EXECUTIVE ACTIONS
            </div>
            <div className="space-y-1.5">
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left font-body text-xs text-white/90 transition-all hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <Mail size={15} className="text-amber-400" />
                  <span>Copy Primary Contact Email ({site.email})</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 font-semibold">
                  {copied ? "COPIED! ✓" : "COPY"}
                </span>
              </button>

              <a
                href="https://github.com/SourabhJoshi1904"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left font-body text-xs text-white/90 transition-all hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink size={15} className="text-amber-400" />
                  <span>Open GitHub Repository Profile</span>
                </div>
                <ArrowRight size={13} className="text-white/40" />
              </a>
            </div>
          </div>

          {/* Filtered Projects Search Results */}
          <div>
            <div className="px-3 pb-2 font-mono text-[10px] tracking-widest text-amber-400/80 uppercase">
              FEATURED PROJECTS ({filteredProjects.length})
            </div>
            <div className="space-y-1.5">
              {filteredProjects.slice(0, 5).map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onClose();
                    scrollToId("work");
                  }}
                  className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition-all hover:border-amber-400/30 hover:bg-white/10"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xs font-semibold text-white">{p.title}</span>
                      <span className="rounded-full bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 font-mono text-[9px] text-amber-300">
                        {p.category}
                      </span>
                    </div>
                    <p className="font-body text-xs text-white/60 line-clamp-1 mt-0.5">{p.oneLiner}</p>
                  </div>
                  <ArrowRight size={14} className="text-white/40 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between border-t border-white/10 bg-black/40 px-5 py-3 font-mono text-[10px] text-white/40">
          <span>PRESS <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-white/80">ESC</kbd> TO CLOSE</span>
          <span>SOURABH JOSHI // COMMAND SYSTEM</span>
        </div>
      </div>
    </div>
  );
}
