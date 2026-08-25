"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/site";
import { useFinePointer } from "@/hooks/useMediaQuery";

/**
 * Vertical progress rail (point 11 — "where am I?").
 * Desktop only; disabled for touch devices and reduced motion.
 */
export default function SectionRail() {
  const fine = useFinePointer();
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (!fine) return;
    const ids = ["home", ...navLinks.map((l) => l.id), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [fine]);

  if (!fine) return null;

  const sections = [
    { id: "home", num: "00", label: "HOME" },
    ...navLinks.map((l) => ({ id: l.id, num: l.num, label: l.label.toUpperCase() })),
  ];

  return (
    <nav
      className="fixed right-7 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      aria-label="Section navigation"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-3"
            data-cursor="link"
            aria-label={`Go to ${s.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`font-display text-[9px] tracking-[0.2em] transition-all duration-300 ${
                isActive ? "text-accent" : "text-white/25 group-hover:text-white/60"
              }`}
            >
              {s.num}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                isActive ? "w-7 bg-accent" : "w-3 bg-white/20 group-hover:w-5 group-hover:bg-white/40"
              }`}
            />
            <span
              className={`label !tracking-[0.2em] transition-all duration-300 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
              }`}
              style={{ fontSize: 9 }}
            >
              {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
