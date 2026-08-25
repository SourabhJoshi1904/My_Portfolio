"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  className?: string;
};

export default function SectionHeading({ index, label, title, className = "" }: SectionHeadingProps) {
  return (
    <Reveal className={className}>
      <div className="mb-4 flex items-center gap-4">
        <span className="label text-accent">{index}</span>
        <span className="hairline w-10" />
        <span className="label">{label}</span>
      </div>
      <h2 className="display text-[40px] leading-[1.05] md:text-[64px]">{title}</h2>
    </Reveal>
  );
}
