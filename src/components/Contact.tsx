"use client";

import { ArrowRight, CheckCircle2, Github, Instagram, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import Reveal from "./Reveal";
import Tilt3DCard from "./Tilt3DCard";
import { site } from "@/data/site";

const icons = { github: Github, linkedin: Linkedin, instagram: Instagram, mail: Mail } as const;

type FormState = { name: string; email: string; type: string; message: string };
const initial: FormState = { name: "", email: "", type: "Web Application", message: "" };

/**
 * CONTACT — a CTA, not a form dump (point 32). Simple 5-field form (point 33).
 * Posts to /api/contact (server-side, keys never leave the server — point 73).
 * Falls back to the visitor's mail client if no backend is configured.
 */
export default function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set =
    (k: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mkjwvdyz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm(initial);
      } else {
        // Fallback to internal API route
        const apiRes = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (apiRes.ok) {
          setStatus("sent");
          setForm(initial);
        } else {
          throw new Error("Failed to send message");
        }
      }
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 font-body text-sm text-white placeholder:text-white/30 transition-all duration-300 focus:border-accent/80 focus:shadow-[0_0_20px_rgba(124,92,255,0.3)] focus:outline-none";

  return (
    <section id="contact" className="section !pt-24 md:!pt-32" aria-labelledby="contact-heading">
      <div className="container-content">
        <Tilt3DCard maxTilt={4} scale={1.01} glowColor="rgba(255, 255, 255, 0.08)" className="rounded-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[#08080d] px-6 py-16 shadow-2xl md:px-14 md:py-24">
          {/* transmission-signal decoration (point 86) */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#2dd4bf]/5 blur-3xl" />
            <div className="absolute right-8 top-8 flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-pulse-soft" style={{ animationDelay: `${i * 0.4}s` }} />
              ))}
            </div>
          </div>

          <div className="relative grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            {/* CTA copy */}
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <p className="label">07 — Contact</p>
                <span className="h-3 w-px bg-white/20" />
                <span className="font-mono text-[9px] tracking-widest text-accent font-semibold uppercase rounded-full bg-accent/10 px-2.5 py-1 border border-accent/20">
                  SUB-SPACE UPLINK
                </span>
              </div>
              <h2 id="contact-heading" className="display text-[clamp(38px,5vw,64px)]">
                Have an idea?
                <br />
                <span className="text-gradient">Let's turn it into something worth remembering.</span>
              </h2>
              <p className="mt-6 max-w-md font-body text-base leading-relaxed text-muted">
                Tell me what you're building — or what you wish existed. I usually
                reply within 24 hours.
              </p>

              <div className="mt-10 flex flex-col gap-3">
                <div className="flex gap-3">
                  {site.socials
                    .filter((s) => s.icon !== "mail")
                    .map((s) => {
                      const Icon = icons[s.icon as keyof typeof icons];
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          title={s.label}
                          className="glass flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
                          data-cursor="link"
                        >
                          <Icon size={17} />
                        </a>
                      );
                    })}
                </div>
              </div>
            </Reveal>

            {/* form */}
            <Reveal delay={0.12}>
              <form onSubmit={onSubmit} className="flex flex-col gap-4" aria-label="Contact form">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cf-name" className="label mb-2 block !text-[10px]">NAME</label>
                    <input id="cf-name" required value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls} autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="cf-email" className="label mb-2 block !text-[10px]">EMAIL</label>
                    <input id="cf-email" required type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" className={inputCls} autoComplete="email" />
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-type" className="label mb-2 block !text-[10px]">PROJECT TYPE</label>
                  <select id="cf-type" value={form.type} onChange={set("type")} className={inputCls}>
                    {["Web Application", "Interactive Website", "AI-Powered Product", "Dashboard System", "E-commerce", "Something else"].map((o) => (
                      <option key={o} value={o} className="bg-[#0d0d12]">{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="cf-message" className="label mb-2 block !text-[10px]">MESSAGE</label>
                  <textarea
                    id="cf-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="What are you building?"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary mt-1 justify-center disabled:opacity-60"
                  data-cursor="link"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : status === "sent" ? (
                    <>
                      <CheckCircle2 size={16} /> Message ready
                    </>
                  ) : (
                    <>
                      Send Message <Send size={14} />
                    </>
                  )}
                </button>
                {status === "sent" && (
                  <p className="font-body text-xs text-emerald-400" role="status">
                    Your message is on its way — talk soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="font-body text-xs text-red-400" role="alert">
                    Message couldn't be sent. Please try again — or email {site.email} directly.
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
        </Tilt3DCard>
      </div>
    </section>
  );
}
