import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * 404 — on-theme: LOST IN SPACE (point 67).
 */
export default function NotFound() {
  return (
    <main className="bg-universe flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
        <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]" />
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_20px_rgba(124,92,255,0.9)]" />
        <span className="absolute left-[16%] top-[30%] h-1.5 w-1.5 rounded-full bg-white/40" />
        <span className="absolute right-[22%] top-[24%] h-1 w-1 rounded-full bg-white/30" />
        <span className="absolute bottom-[28%] left-[24%] h-1 w-1 rounded-full bg-white/25" />
        <span className="absolute bottom-[22%] right-[18%] h-1.5 w-1.5 rounded-full bg-white/35" />
      </div>

      <p className="label mb-6 text-accent">ERROR 404</p>
      <h1 className="display text-6xl md:text-8xl">
        LOST IN <span className="text-gradient">SPACE</span>
      </h1>
      <p className="mt-6 max-w-md font-body text-base leading-relaxed text-muted md:text-lg">
        The page you're looking for has drifted beyond the known universe.
      </p>
      <Link href="/" className="btn-primary mt-10" data-cursor="link">
        <ArrowLeft size={15} />
        Return Home
      </Link>
    </main>
  );
}
