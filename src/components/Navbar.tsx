"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import CommandPalette from "./CommandPalette";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Minimal sticky navbar: transparent at top, subtle blur on scroll.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onLogoClick = () => {
    const n = logoClicks + 1;
    setLogoClicks(n);
    if (n === 5) {
      setToast("Developer mode engaged. The accent has shifted. 🛸");
      document.documentElement.style.setProperty("--accent", "#2dd4bf");
      setTimeout(() => {
        document.documentElement.style.setProperty("--accent", "#f59e0b");
        setToast(null);
      }, 6000);
      setLogoClicks(0);
    }
  };

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
          scrolled ? "border-b border-[var(--border)] bg-[rgba(5,5,5,0.72)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="container-content flex h-[72px] items-center justify-between">
          <button
            onClick={onLogoClick}
            aria-label={`${site.name} — back to top`}
            className="display flex items-center gap-3 text-lg tracking-tight"
            data-cursor="link"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm text-accent transition-colors hover:border-white/30">
              {site.initials}
            </span>
            <span className="hidden sm:inline font-bold">SOURABH</span>
          </button>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="group relative font-body text-[13px] font-medium text-muted transition-colors hover:text-white"
                data-cursor="link"
              >
                <span className="mr-1.5 font-display text-[10px] text-amber-400/80">{l.num}</span>
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}

            {/* Cmd + K Command Palette Trigger */}
            <button
              onClick={() => setCmdOpen(true)}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-white/60 transition-all hover:border-amber-400/40 hover:bg-white/10 hover:text-white"
              title="Search & Quick Commands (Cmd + K)"
              data-cursor="link"
            >
              <Search size={13} className="text-amber-400" />
              <span>SEARCH</span>
              <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold text-white/80">⌘K</kbd>
            </button>

            <a
              href={`mailto:${site.email}`}
              className="btn-ghost !px-5 !py-2.5 text-[13px]"
              data-cursor="link"
            >
              Let's talk
            </a>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setCmdOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-white/80"
              aria-label="Search"
            >
              <Search size={16} className="text-amber-400" />
            </button>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)]"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Command Palette Modal */}
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Mobile full-screen menu (point 78) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col justify-between bg-[rgba(5,5,5,0.97)] px-8 py-8 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(140% at 92% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <span className="display text-lg">{site.initials}</span>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)]"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {navLinks.map((l, i) => (
                <motion.button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="display flex items-baseline gap-4 py-3 text-left text-5xl tracking-tight"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                >
                  <span className="font-body text-xs tracking-[0.2em] text-accent">{l.num}</span>
                  {l.label}
                </motion.button>
              ))}
            </nav>
            <div className="flex items-center justify-between">
              <span className="label">SOURABH JOSHI</span>
              <a href={`mailto:${site.email}`} className="label text-accent">
                EMAIL →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter-egg toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-full border border-[var(--border)] bg-[rgba(5,5,5,0.9)] px-5 py-3 font-body text-sm backdrop-blur-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
