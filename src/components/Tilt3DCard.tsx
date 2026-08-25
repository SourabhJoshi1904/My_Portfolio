"use client";

import React, { useRef, ReactNode } from "react";

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glowColor?: string;
}

export default function Tilt3DCard({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.02,
  glowColor = "rgba(255, 255, 255, 0.08)",
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    const rotateX = -mouseY * maxTilt * 2;
    const rotateY = mouseX * maxTilt * 2;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
    cardRef.current.style.transition = "transform 0.08s ease-out";

    if (shineRef.current) {
      const shineX = (mouseX + 0.5) * 100;
      const shineY = (mouseY + 0.5) * 100;
      shineRef.current.style.opacity = "1";
      shineRef.current.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, ${glowColor}, transparent 65%)`;
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      cardRef.current.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    }
    if (shineRef.current) {
      shineRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Specular Shine Reflection */}
      <div
        ref={shineRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)`,
        }}
        aria-hidden
      />
      {children}
    </div>
  );
}
