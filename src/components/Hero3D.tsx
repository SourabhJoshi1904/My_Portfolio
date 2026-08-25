// Hero3D.tsx - Photorealistic Solar System with Star-Like Diagonal Meteors Behind Solar System
"use client";

import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Planet Definitions */
/* ------------------------------------------------------------------ */
export type PlanetDef = {
  id: string;
  name: string;
  label: string;
  section: string;
  radius: number;
  distance: number;
  color: string;
  speed: number;
  hasRing?: boolean;
  atmosphere?: boolean;
};

const PLANETS: PlanetDef[] = [
  { id: "mercury", name: "MERCURY", label: "About • Solar Flare Core", section: "about", radius: 0.28, distance: 3.8, color: "#b8a99a", speed: 0.55 },
  { id: "venus", name: "VENUS", label: "Skills • Cloud Swirl Engine", section: "skills", radius: 0.42, distance: 4.9, color: "#e6bd7e", speed: 0.42, atmosphere: true },
  { id: "earth", name: "EARTH", label: "Selected Works • Satellite Network", section: "work", radius: 0.48, distance: 6.2, color: "#4f9cf7", speed: 0.33, atmosphere: true },
  { id: "mars", name: "MARS", label: "Journey • Red Dust Storm", section: "journey", radius: 0.35, distance: 7.5, color: "#d96a4a", speed: 0.26 },
  { id: "jupiter", name: "JUPITER", label: "Stats • Magnetic Field & 79 Moons", section: "stats", radius: 0.82, distance: 9.0, color: "#d8a86a", speed: 0.2 },
  { id: "saturn", name: "SATURN", label: "Services • Ice Ring Accelerator", section: "services", radius: 0.65, distance: 10.6, color: "#e2c58f", speed: 0.15, hasRing: true },
  { id: "uranus", name: "URANUS", label: "Certificates • Cyan Ice Giant & Internships", section: "certificates", radius: 0.55, distance: 12.2, color: "#4deeea", speed: 0.12, atmosphere: true, hasRing: true },
  { id: "neptune", name: "NEPTUNE", label: "Contact • Deep Space Shockwave", section: "contact", radius: 0.48, distance: 13.8, color: "#5a7bd8", speed: 0.10 },
];

/* Shared mutable state */
const pointerState = { x: 0, y: 0, gyroX: 0, gyroY: 0 };
const meshRegistry = new Map<string, THREE.Mesh>();

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* Radial Glow Generator */
function makeGlowTexture(inner: string, mid: string) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.35, mid);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/* ------------------------------------------------------------------ */
/* Star-Like Shooting Meteor (Random Diagonal Paths Deep Behind Solar System) */
/* ------------------------------------------------------------------ */
function ShootingMeteor() {
  const groupRef = useRef<THREE.Group>(null);

  const [active, setActive] = useState(false);
  const progress = useRef(0);
  const startPos = useRef(new THREE.Vector3());
  const endPos = useRef(new THREE.Vector3());
  const dirRef = useRef(new THREE.Vector3());

  // Star flare core & sleek micro starlight tail textures
  const headTex = useMemo(() => makeGlowTexture("rgba(255,255,255,1)", "rgba(186,230,253,0.6)"), []);

  const tailTex = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = 32;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, size, 0);
    g.addColorStop(0, "rgba(255, 255, 255, 1)");
    g.addColorStop(0.2, "rgba(186, 230, 253, 0.85)");
    g.addColorStop(0.6, "rgba(56, 189, 248, 0.35)");
    g.addColorStop(1, "rgba(14, 165, 233, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, 32);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const sparkPositions = useMemo(() => {
    const count = 20;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.06;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.06;
      pos[i * 3 + 2] = -Math.random() * 1.4;
    }
    return pos;
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const scheduleNext = () => {
      // Random delay between 3.5s and 6.5s (~5s average)
      const delay = 3500 + Math.random() * 3000;
      timer = setTimeout(() => {
        // Pick random entry side (0: TOP, 1: RIGHT, 2: BOTTOM, 3: LEFT)
        const startSide = Math.floor(Math.random() * 4);
        let startX = 0, startY = 0;

        if (startSide === 0) {
          // TOP
          startX = (Math.random() - 0.5) * 60;
          startY = 22 + Math.random() * 8;
        } else if (startSide === 1) {
          // RIGHT
          startX = 35 + Math.random() * 10;
          startY = (Math.random() - 0.5) * 35;
        } else if (startSide === 2) {
          // BOTTOM
          startX = (Math.random() - 0.5) * 60;
          startY = -(22 + Math.random() * 8);
        } else {
          // LEFT
          startX = -(35 + Math.random() * 10);
          startY = (Math.random() - 0.5) * 35;
        }

        // Pick a guaranteed DIFFERENT exit side for steep falling, diagonal & crosswise trajectories
        const endSide = (startSide + 1 + Math.floor(Math.random() * 3)) % 4;
        let endX = 0, endY = 0;

        if (endSide === 0) {
          endX = (Math.random() - 0.5) * 60;
          endY = 22 + Math.random() * 8;
        } else if (endSide === 1) {
          endX = 35 + Math.random() * 10;
          endY = (Math.random() - 0.5) * 35;
        } else if (endSide === 2) {
          endX = (Math.random() - 0.5) * 60;
          endY = -(22 + Math.random() * 8);
        } else {
          endX = -(35 + Math.random() * 10);
          endY = (Math.random() - 0.5) * 35;
        }

        // Deep behind solar system (z = -22 to -36)
        const z = -22 - Math.random() * 14;

        startPos.current.set(startX, startY, z);
        endPos.current.set(endX, endY, z + (Math.random() - 0.5) * 4);
        dirRef.current.subVectors(endPos.current, startPos.current).normalize();

        progress.current = 0;
        setActive(true);
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => clearTimeout(timer);
  }, []);

  useFrame((_, delta) => {
    if (!active) return;
    // 5% slower speed (0.95 * 0.95 = 0.9025)
    progress.current += delta * 0.9025;

    if (progress.current >= 1) {
      setActive(false);
      return;
    }

    const currentPos = new THREE.Vector3().lerpVectors(startPos.current, endPos.current, progress.current);

    if (groupRef.current) {
      groupRef.current.position.copy(currentPos);
      const targetLook = new THREE.Vector3().addVectors(currentPos, dirRef.current);
      groupRef.current.lookAt(targetLook);
    }
  });

  if (!active) return null;

  return (
    <group ref={groupRef}>
      {/* 50% smaller micro star nucleus */}
      <mesh>
        <sphereGeometry args={[0.025, 10, 10]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>

      {/* 50% smaller star flare glow */}
      <sprite scale={[0.55, 0.55, 1]}>
        <spriteMaterial map={headTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.95} />
      </sprite>

      {/* 50% smaller sleek starlight tail */}
      <mesh position={[0, 0, -0.9]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.8, 0.21]} />
        <meshBasicMaterial map={tailTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} opacity={0.88} />
      </mesh>

      {/* 50% smaller trailing micro sparks */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sparkPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.022} color="#e0f2fe" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

/* Floating Space Dust Particles */
function SpaceDust() {
  const count = 480;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 58;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 55;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y += delta * 0.018;
    ref.current.position.y = Math.sin(t * 0.7) * 0.35;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.075} color="#e0f2fe" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* 3D Asteroid Belt (850 rocky asteroids orbiting between Mars & Jupiter) */
function AsteroidBelt() {
  const ref = useRef<THREE.Group>(null);
  const count = 850;

  const { positions, scales, rotations } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const rotations = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 8.1 + Math.random() * 0.7; // Between Mars (7.5) and Jupiter (9.0)
      const height = (Math.random() - 0.5) * 0.45; // Vertical dispersion

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      scales[i] = 0.02 + Math.random() * 0.04;

      rotations[i * 3] = Math.random() * Math.PI;
      rotations[i * 3 + 1] = Math.random() * Math.PI;
      rotations[i * 3 + 2] = Math.random() * Math.PI;
    }
    return { positions, scales, rotations };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.rotation.set(rotations[i * 3], rotations[i * 3 + 1], rotations[i * 3 + 2]);
      dummy.scale.setScalar(scales[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, dummy, positions, rotations, scales]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.035;
  });

  return (
    <group ref={ref}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#8a8075" roughness={0.88} metalness={0.15} />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* High-Fidelity Solar Texture Generator */
/* ------------------------------------------------------------------ */
function makeSunSurfaceTexture() {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#ff4500";
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = 1 + Math.random() * 4;
    ctx.fillStyle = Math.random() > 0.4 ? "#ffa500" : "#ffeb3b";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 24; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = 8 + Math.random() * 22;
    const penG = ctx.createRadialGradient(x, y, r * 0.3, x, y, r);
    penG.addColorStop(0, "#2b0a00");
    penG.addColorStop(0.5, "#802000");
    penG.addColorStop(1, "rgba(255,100,0,0)");
    ctx.fillStyle = penG;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#0c0200";
    ctx.beginPath();
    ctx.arc(x, y, r * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 45; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = 14 + Math.random() * 32;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(255, 255, 220, 0.95)");
    g.addColorStop(0.4, "rgba(255, 140, 0, 0.6)");
    g.addColorStop(1, "rgba(255, 60, 0, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/* ------------------------------------------------------------------ */
/* Realistic Planet Textures & Bump Maps */
/* ------------------------------------------------------------------ */
function makePlanetMaps(id: string): { map: THREE.CanvasTexture; bump?: THREE.CanvasTexture; roughnessMap?: THREE.CanvasTexture } {
  const w = 2048;
  const h = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  let bumpCanvas: HTMLCanvasElement | undefined;
  let bumpCtx: CanvasRenderingContext2D | undefined;
  let roughCanvas: HTMLCanvasElement | undefined;
  let roughCtx: CanvasRenderingContext2D | undefined;

  const createBump = () => {
    bumpCanvas = document.createElement("canvas");
    bumpCanvas.width = w;
    bumpCanvas.height = h;
    bumpCtx = bumpCanvas.getContext("2d")!;
    bumpCtx.fillStyle = "#808080";
    bumpCtx.fillRect(0, 0, w, h);
  };

  const createRough = () => {
    roughCanvas = document.createElement("canvas");
    roughCanvas.width = w;
    roughCanvas.height = h;
    roughCtx = roughCanvas.getContext("2d")!;
    roughCtx.fillStyle = "#cccccc";
    roughCtx.fillRect(0, 0, w, h);
  };

  if (id === "mercury") {
    createBump();
    ctx.fillStyle = "#69635c";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 1200; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 3 + Math.random() * 22;
      ctx.fillStyle = Math.random() > 0.5 ? "#4a453f" : "#8c8479";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      if (bumpCtx) {
        bumpCtx.fillStyle = "#ffffff";
        bumpCtx.beginPath();
        bumpCtx.arc(x, y, r, 0, Math.PI * 2);
        bumpCtx.fill();
        bumpCtx.fillStyle = "#222222";
        bumpCtx.beginPath();
        bumpCtx.arc(x, y, r * 0.7, 0, Math.PI * 2);
        bumpCtx.fill();
      }
    }
  } else if (id === "venus") {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#cf9e58");
    g.addColorStop(0.25, "#f3d298");
    g.addColorStop(0.5, "#b8833d");
    g.addColorStop(0.75, "#e5c387");
    g.addColorStop(1, "#9e6925");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 160; i++) {
      const y = Math.random() * h;
      ctx.fillStyle = "rgba(255, 248, 220, 0.25)";
      ctx.beginPath();
      ctx.ellipse(Math.random() * w, y, 120 + Math.random() * 280, 16 + Math.random() * 40, Math.random() * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (id === "earth") {
    createRough();
    createBump();

    ctx.fillStyle = "#0d3b66";
    ctx.fillRect(0, 0, w, h);

    if (roughCtx) {
      roughCtx.fillStyle = "#222222";
      roughCtx.fillRect(0, 0, w, h);
    }

    const drawLand = (cx: number, cy: number, rx: number, ry: number) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, Math.random() * 0.4, 0, Math.PI * 2);
      ctx.fill();
      if (roughCtx) {
        roughCtx.beginPath();
        roughCtx.ellipse(cx, cy, rx, ry, Math.random() * 0.4, 0, Math.PI * 2);
        roughCtx.fill();
      }
      if (bumpCtx) {
        bumpCtx.beginPath();
        bumpCtx.ellipse(cx, cy, rx, ry, Math.random() * 0.4, 0, Math.PI * 2);
        bumpCtx.fill();
      }
    };

    ctx.fillStyle = "#2d6a4f";
    if (roughCtx) roughCtx.fillStyle = "#ffffff";
    if (bumpCtx) bumpCtx.fillStyle = "#b0b0b0";

    for (let i = 0; i < 70; i++) {
      const x = Math.random() * w;
      const y = 160 + Math.random() * (h - 320);
      drawLand(x, y, 80 + Math.random() * 180, 50 + Math.random() * 120);
    }

    ctx.fillStyle = "#8a6642";
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * w;
      const y = 200 + Math.random() * (h - 400);
      drawLand(x, y, 40 + Math.random() * 90, 24 + Math.random() * 60);
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, 80);
    ctx.fillRect(0, h - 80, w, 80);
    if (roughCtx) {
      roughCtx.fillStyle = "#888888";
      roughCtx.fillRect(0, 0, w, 80);
      roughCtx.fillRect(0, h - 80, w, 80);
    }
  } else if (id === "mars") {
    createBump();
    ctx.fillStyle = "#b84a1d";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "#5c240e";
    if (bumpCtx) bumpCtx.fillStyle = "#444444";
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 50 + Math.random() * 140;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      if (bumpCtx) {
        bumpCtx.beginPath();
        bumpCtx.arc(x, y, r, 0, Math.PI * 2);
        bumpCtx.fill();
      }
    }

    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, w, 56);
    ctx.fillRect(0, h - 56, w, 56);
  } else if (id === "jupiter") {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0.0, "#c89456");
    g.addColorStop(0.12, "#e5c596");
    g.addColorStop(0.24, "#9e481b");
    g.addColorStop(0.38, "#eedbb8");
    g.addColorStop(0.52, "#bd5e22");
    g.addColorStop(0.68, "#783414");
    g.addColorStop(0.84, "#c89456");
    g.addColorStop(1.0, "#e5c596");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 140; i++) {
      const y = Math.random() * h;
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.22)" : "rgba(80,30,8,0.25)";
      ctx.beginPath();
      ctx.ellipse(Math.random() * w, y, 90 + Math.random() * 220, 10 + Math.random() * 24, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const rx = w * 0.65;
    const ry = h * 0.62;
    const spotG = ctx.createRadialGradient(rx, ry, 0, rx, ry, 90);
    spotG.addColorStop(0, "#d02a10");
    spotG.addColorStop(0.65, "#a01e0a");
    spotG.addColorStop(1, "rgba(180, 80, 40, 0)");
    ctx.fillStyle = spotG;
    ctx.beginPath();
    ctx.ellipse(rx, ry, 110, 64, 0.08, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 230, 200, 0.4)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(rx, ry, 84, 44, 0.08, 0, Math.PI * 2);
    ctx.stroke();
  } else if (id === "saturn") {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#c4a065");
    g.addColorStop(0.2, "#e5cf9b");
    g.addColorStop(0.4, "#b39454");
    g.addColorStop(0.6, "#e8d6b0");
    g.addColorStop(0.8, "#aa8a4a");
    g.addColorStop(1, "#c4a065");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  } else if (id === "uranus") {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#38bdf8");
    g.addColorStop(0.3, "#7dd3fc");
    g.addColorStop(0.6, "#0284c7");
    g.addColorStop(1, "#0369a1");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 70; i++) {
      const y = Math.random() * h;
      ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
      ctx.beginPath();
      ctx.ellipse(Math.random() * w, y, 100 + Math.random() * 200, 6 + Math.random() * 16, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (id === "neptune") {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#284cb3");
    g.addColorStop(0.35, "#3d68e6");
    g.addColorStop(0.7, "#1f3d99");
    g.addColorStop(1, "#152a75");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 60; i++) {
      const y = Math.random() * h;
      ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
      ctx.beginPath();
      ctx.ellipse(Math.random() * w, y, 90 + Math.random() * 190, 8 + Math.random() * 16, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const dx = w * 0.4;
    const dy = h * 0.55;
    ctx.fillStyle = "rgba(10, 25, 75, 0.6)";
    ctx.beginPath();
    ctx.ellipse(dx, dy, 80, 48, 0.1, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = "#888888";
    ctx.fillRect(0, 0, w, h);
  }

  const configureTex = (tex: THREE.CanvasTexture) => {
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 16;
    tex.generateMipmaps = true;
  };

  const mapTex = new THREE.CanvasTexture(canvas);
  configureTex(mapTex);

  let bumpTex: THREE.CanvasTexture | undefined;
  if (bumpCanvas) {
    bumpTex = new THREE.CanvasTexture(bumpCanvas);
    configureTex(bumpTex);
  }

  let roughTex: THREE.CanvasTexture | undefined;
  if (roughCanvas) {
    roughTex = new THREE.CanvasTexture(roughCanvas);
    configureTex(roughTex);
  }

  return { map: mapTex, bump: bumpTex, roughnessMap: roughTex };
}

/* Independent Swirling Cloud Texture for Earth */
function makeEarthCloudsTexture() {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, w, h);

  for (let i = 0; i < 90; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    ctx.beginPath();
    ctx.ellipse(x, y, 35 + Math.random() * 90, 6 + Math.random() * 16, Math.random() * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/* Photorealistic 3D Saturn Ring System with 1,600 Orbiting Micro-Ice Particles */
function Saturn3DRing({ innerRadius, outerRadius, hovered }: { innerRadius: number; outerRadius: number; hovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1600;

  // High-resolution 1024x1024 radial ring texture (Cassini Division, A-Ring, B-Ring, C-Ring, Encke Gap)
  const ringTexture = useMemo(() => {
    const size = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const center = size / 2;
    const maxR = size / 2;

    const g = ctx.createRadialGradient(center, center, 0, center, center, maxR);
    // Inner gap (planet surface space)
    g.addColorStop(0.0, "rgba(0, 0, 0, 0)");
    g.addColorStop(0.48, "rgba(0, 0, 0, 0)");

    // C-Ring (Inner translucent ring)
    g.addColorStop(0.51, "rgba(160, 140, 110, 0.25)");
    g.addColorStop(0.57, "rgba(180, 155, 120, 0.45)");

    // B-Ring (Main dense bright golden ring)
    g.addColorStop(0.59, "rgba(235, 205, 155, 0.95)");
    g.addColorStop(0.72, "rgba(215, 185, 135, 0.88)");

    // Cassini Division (Authentic empty dark space gap!)
    g.addColorStop(0.73, "rgba(0, 0, 0, 0)");
    g.addColorStop(0.765, "rgba(0, 0, 0, 0)");

    // A-Ring (Outer ring)
    g.addColorStop(0.77, "rgba(210, 180, 135, 0.82)");
    g.addColorStop(0.87, "rgba(185, 155, 115, 0.70)");

    // Encke Gap (Faint outer gap line)
    g.addColorStop(0.88, "rgba(5, 5, 5, 0.05)");
    g.addColorStop(0.89, "rgba(185, 155, 115, 0.6)");

    // F-Ring (Thin outer strand)
    g.addColorStop(0.94, "rgba(160, 135, 100, 0.3)");
    g.addColorStop(1.0, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(center, center, maxR, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // 1,600 Orbiting 3D Ice & Rock Micro-Particles
  const { positions, colors, radii, angles, speeds } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const radii = new Float32Array(particleCount);
    const angles = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    const cInner = new THREE.Color("#f5e5c8");
    const cOuter = new THREE.Color("#b59875");

    for (let i = 0; i < particleCount; i++) {
      let normR = Math.random();
      // Skip Cassini gap
      if (normR > 0.46 && normR < 0.55) normR += 0.12;

      const r = innerRadius + normR * (outerRadius - innerRadius);
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 0.04;

      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * r;

      radii[i] = r;
      angles[i] = angle;
      // Keplerian speed: inner orbits faster than outer
      speeds[i] = 0.35 / Math.sqrt(r);

      const mixed = cInner.clone().lerp(cOuter, normR);
      cols[i * 3] = mixed.r;
      cols[i * 3 + 1] = mixed.g;
      cols[i * 3 + 2] = mixed.b;
    }
    return { positions: pos, colors: cols, radii, angles, speeds };
  }, [innerRadius, outerRadius, particleCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;
    const t = state.clock.elapsedTime;
    const speedMult = hovered ? 3.5 : 1;

    for (let i = 0; i < particleCount; i++) {
      angles[i] += delta * speeds[i] * speedMult;
      const r = radii[i];
      const waveHeight = Math.sin(r * 4.5 + t * (hovered ? 6 : 2.5)) * 0.025;
      array[i * 3] = Math.cos(angles[i]) * r;
      array[i * 3 + 1] = waveHeight;
      array[i * 3 + 2] = Math.sin(angles[i]) * r;
    }
    posAttr.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (hovered ? 0.35 : 0.06);
    }
  });

  return (
    <group ref={groupRef} rotation={[0.46, 0.1, 0.38]}>
      {/* High-Resolution Radial Texture Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[outerRadius * 2.15, outerRadius * 2.15]} />
        <meshStandardMaterial
          map={ringTexture}
          transparent
          side={THREE.DoubleSide}
          roughness={0.5}
          metalness={0.1}
          depthWrite={false}
        />
      </mesh>

      {/* 1,600 Orbiting 3D Ice & Rock Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.032}
          vertexColors
          transparent
          opacity={0.88}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Galaxy Spiral */
/* ------------------------------------------------------------------ */
function Galaxy({ opacityRef }: { opacityRef: RefObject<number> }) {
  const matRef = useRef<THREE.PointsMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { positions, colors } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color("#7c5cff");
    const c2 = new THREE.Color("#2dd4bf");
    for (let i = 0; i < count; i++) {
      const arm = i % 3;
      const r = 6 + Math.random() * 16;
      const spin = r * 0.42 + arm * ((Math.PI * 2) / 3);
      const spread = (Math.random() - 0.5) * (0.6 + r * 0.14);
      positions[i * 3] = Math.cos(spin + spread) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.6 * (r / 14);
      positions[i * 3 + 2] = Math.sin(spin + spread) * r;
      const mix = Math.random();
      const col = c1.clone().lerp(c2, mix);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, colors };
  }, []);

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.opacity = opacityRef.current;
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.03;
  });

  return (
    <group ref={groupRef} position={[0, 0, -14]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={matRef}
          size={0.16}
          vertexColors
          transparent
          opacity={opacityRef.current}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function Nebula({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const tex = useMemo(() => makeGlowTexture(color, "rgba(0,0,0,0)"), [color]);
  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial map={tex} transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  );
}

/* ------------------------------------------------------------------ */
/* 3D Moon Component */
/* ------------------------------------------------------------------ */
function Moon({ orbitRadius, speed, size, color }: { orbitRadius: number; speed: number; size: number; color: string }) {
  const moonRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    if (!moonRef.current) return;
    angleRef.current += delta * speed;
    moonRef.current.position.set(
      Math.cos(angleRef.current) * orbitRadius,
      Math.sin(angleRef.current * 0.6) * 0.18, // 3D orbital inclination
      Math.sin(angleRef.current) * orbitRadius
    );
    moonRef.current.rotation.y += delta * 0.6;
  });

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
    </mesh>
  );
}

/* 3D Radial Solar Light Rays */
function SunBeams() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.04;
  });

  const beamTex = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(255, 210, 140, 0.65)");
    g.addColorStop(0.35, "rgba(255, 120, 30, 0.2)");
    g.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <group ref={ref}>
      {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((angle, i) => (
        <sprite key={i} rotation={[0, 0, angle]} scale={[19, 19, 1]}>
          <spriteMaterial map={beamTex} transparent opacity={0.22} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      ))}
    </group>
  );
}

/* 3D Foreground Space Debris for dramatic Depth of Field */
function ForegroundAsteroids() {
  const ref = useRef<THREE.Group>(null);
  const count = 14;

  const asteroids = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 18,
        8 + Math.random() * 18, // Close to camera lens!
      ] as [number, number, number],
      scale: 0.12 + Math.random() * 0.28,
      rotationSpeed: (Math.random() - 0.5) * 0.4,
    }));
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.01;
    ref.current.position.y = Math.sin(t * 0.8) * 0.25;
  });

  return (
    <group ref={ref}>
      {asteroids.map((ast, i) => (
        <mesh key={i} position={ast.position} scale={ast.scale}>
          <dodecahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#6e6860" roughness={0.9} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Sun Component */
/* ------------------------------------------------------------------ */
function Sun({ ready }: { ready: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const sunMeshRef = useRef<THREE.Mesh>(null);
  const loopsRef = useRef<THREE.Mesh>(null);

  const sunTex = useMemo(() => makeSunSurfaceTexture(), []);
  const glowTex = useMemo(() => makeGlowTexture("rgba(255,200,130,0.7)", "rgba(255,140,50,0.25)"), []);
  const loopsGlowTex = useMemo(() => makeGlowTexture("rgba(255,180,80,0.8)", "rgba(255,100,50,0.25)"), []);

  const flarePositions = useMemo(() => {
    const count = 60;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      const r = 1.95 + Math.random() * 0.45;
      arr[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      arr[i * 3 + 1] = r * Math.cos(theta);
      arr[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.scale.setScalar(1);

    if (sunMeshRef.current) sunMeshRef.current.rotation.y += delta * 0.08;
    if (loopsRef.current) {
      loopsRef.current.rotation.z += delta * 0.18;
      loopsRef.current.rotation.x = Math.sin(t * 0.8) * 0.35;
      const pulse = 1.05 + Math.sin(t * 2.2) * 0.04;
      loopsRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef} scale={1}>
      {/* Main sun sphere */}
      <mesh ref={sunMeshRef}>
        <sphereGeometry args={[1.9, 64, 64]} />
        <meshBasicMaterial map={sunTex} toneMapped={false} />
      </mesh>

      {/* 3D Solar Light Ray Beams */}
      <SunBeams />

      {/* Inner flare glow (softened opacity) */}
      <sprite scale={[9.8, 9.8, 1]}>
        <spriteMaterial map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.65} />
      </sprite>

      {/* Magnetic loops */}
      <mesh ref={loopsRef} scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[1.9, 48, 48]} />
        <meshBasicMaterial map={loopsGlowTex} transparent opacity={0.25} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>

      {/* Coronal flare particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[flarePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.055} color={0xffd9a0} transparent opacity={0.65} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      {/* Outer coronal eruption glow (softened opacity) */}
      <sprite scale={[15.5, 15.5, 1]}>
        <spriteMaterial map={loopsGlowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.3} />
      </sprite>

      {/* Central solar point light illuminating planets */}
      <pointLight intensity={2.2} distance={55} decay={1.2} color="#fff2e0" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Planet Component */
/* ------------------------------------------------------------------ */
type PlanetProps = {
  def: PlanetDef;
  index: number;
  ready: boolean;
  hovered: boolean;
  onHover: (def: PlanetDef | null) => void;
  onClick: (def: PlanetDef) => void;
  tooltipEl: RefObject<HTMLDivElement | null>;
};

function Planet({ def, index, ready, hovered, onHover, onClick, tooltipEl }: PlanetProps) {
  const planetGroupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(index * 0.9);
  const camera = useThree((s) => s.camera);

  const glowTex = useMemo(() => makeGlowTexture("rgba(255,255,255,0.35)", "rgba(255,255,255,0.08)"), []);
  const { map: planetTex, bump: planetBumpTex, roughnessMap: planetRoughTex } = useMemo(() => makePlanetMaps(def.id), [def.id]);
  const earthCloudTex = useMemo(() => (def.id === "earth" ? makeEarthCloudsTexture() : null), [def.id]);

  useEffect(() => {
    if (meshRef.current) meshRegistry.set(def.id, meshRef.current);
    return () => {
      meshRegistry.delete(def.id);
    };
  }, [def.id]);

  useFrame((state, delta) => {
    const group = planetGroupRef.current;
    if (!group) return;

    const t = state.clock.elapsedTime;
    const floatY = Math.sin(t * 1.6 + index * 0.9) * 0.18;

    // 1. Solar system intro assembly: planets emerge & expand into orbits on page load
    const introProgress = ready ? 1 : THREE.MathUtils.smoothstep(t, 0.2 + index * 0.2, 2.0 + index * 0.25);
    const currentDist = def.distance * introProgress;

    angleRef.current += delta * def.speed * 0.22;
    group.position.set(
      Math.cos(angleRef.current) * currentDist,
      floatY,
      Math.sin(angleRef.current) * currentDist
    );

    // 2. Axis self-rotation for planet sphere and cloud sphere (accelerates when hovered!)
    if (meshRef.current) meshRef.current.rotation.y += delta * (hovered ? 1.4 : 0.35);
    if (cloudRef.current) cloudRef.current.rotation.y += delta * (hovered ? 1.8 : 0.42);

    // 3. Smooth scale & hover scale with assemble grow
    const hoverScale = hovered ? 1.35 : 1;
    const targetScale = ready ? hoverScale : introProgress * hoverScale;
    const s = THREE.MathUtils.damp(group.scale.x, targetScale, 8, delta);
    group.scale.setScalar(s);

    // 4. Update floating tooltip on hover
    if (hovered && tooltipEl.current && planetGroupRef.current) {
      const v = new THREE.Vector3();
      planetGroupRef.current.getWorldPosition(v);
      v.project(state.camera);
      if (v.z < 1 && Math.abs(v.x) < 2.2 && Math.abs(v.y) < 2.2) {
        const x = (v.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-v.y * 0.5 + 0.5) * window.innerHeight;
        tooltipEl.current.style.transform = `translate(-50%, -170%) translate(${x}px, ${y}px)`;
        tooltipEl.current.style.opacity = "1";
      } else {
        tooltipEl.current.style.opacity = "0";
      }
    }
  });

  return (
    <group ref={planetGroupRef}>
      {/* Massive Magnetic Raycast Hit Area (Easy target even when beside planet, behind text, tilted, or zoomed out) */}
      <mesh
        visible={false}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(def);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(null);
          document.body.style.cursor = "";
          if (tooltipEl.current) tooltipEl.current.style.opacity = "0";
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          onClick(def);
        }}
      >
        <sphereGeometry args={[Math.max(def.radius * 4.8, 2.4), 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Planet Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[def.radius, 128, 128]} />
        <meshStandardMaterial
          map={planetTex}
          bumpMap={planetBumpTex}
          bumpScale={def.id === "mercury" || def.id === "mars" ? 0.04 : 0.02}
          roughnessMap={planetRoughTex}
          roughness={def.id === "earth" ? 0.4 : 0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Earth Independent Swirling Cloud Layer */}
      {def.id === "earth" && earthCloudTex && (
        <mesh ref={cloudRef}>
          <sphereGeometry args={[def.radius * 1.018, 128, 128]} />
          <meshStandardMaterial
            map={earthCloudTex}
            transparent
            opacity={0.82}
            blending={THREE.NormalBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Atmosphere Rim Glow */}
      {def.atmosphere && (
        <mesh scale={def.radius * 1.22}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={def.id === "earth" ? "#3b82f6" : "#e6bd7e"}
            transparent
            opacity={0.18}
            side={THREE.BackSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Photorealistic 3D Ring System for Saturn & Uranus */}
      {def.id === "saturn" && (
        <Saturn3DRing innerRadius={def.radius * 1.32} outerRadius={def.radius * 2.35} hovered={hovered} />
      )}
      {def.id === "uranus" && (
        <group rotation={[Math.PI / 2.2, 0.3, 0]}>
          <Saturn3DRing innerRadius={def.radius * 1.22} outerRadius={def.radius * 1.85} hovered={hovered} />
        </group>
      )}

      {/* 3D Moons for Earth & Jupiter */}
      {def.id === "earth" && (
        <Moon orbitRadius={def.radius * 1.85} speed={hovered ? 4.2 : 1.2} size={0.09} color="#d4d4d8" />
      )}
      {def.id === "jupiter" && (
        <>
          <Moon orbitRadius={def.radius * 1.55} speed={hovered ? 5.5 : 1.5} size={0.08} color="#e4e4e7" />
          <Moon orbitRadius={def.radius * 2.15} speed={hovered ? 3.5 : 0.9} size={0.10} color="#a1a1aa" />
          {hovered && (
            <Moon orbitRadius={def.radius * 2.75} speed={7.2} size={0.07} color="#7c5cff" />
          )}
        </>
      )}

      {/* Interactive Planet Energy Shockwave Aura Ring on Hover */}
      {hovered && (
        <group>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <ringGeometry args={[def.radius * 1.25, def.radius * 1.55, 48]} />
            <meshBasicMaterial
              color={def.color}
              transparent
              opacity={0.65}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 4, 0.4, 0]}>
            <ringGeometry args={[def.radius * 1.65, def.radius * 1.8, 48]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}

      {/* Faint Point Glow */}
      <sprite scale={[def.radius * 6, def.radius * 6, 1]}>
        <spriteMaterial map={glowTex} transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Intro Camera Choreography */
/* ------------------------------------------------------------------ */
function cameraTargetFor(t: number): THREE.Vector3 {
  const isMobileView = typeof window !== "undefined" && window.innerWidth < 768;
  if (t < 1.2) return new THREE.Vector3(0, 6.5, 72);
  if (t < 2.5) return new THREE.Vector3(0, 4.0, 42);
  if (t < 3.8) return new THREE.Vector3(0, 2.2, 28);
  return new THREE.Vector3(0, isMobileView ? 1.4 : 1.15, isMobileView ? 21.5 : 16.8);
}

function Scene({ onReady, tooltipEl, hoveredPlanet, onHoverPlanet }: { onReady: () => void; tooltipEl: RefObject<HTMLDivElement | null>; hoveredPlanet: PlanetDef | null; onHoverPlanet: (def: PlanetDef | null) => void; }) {
  const camera = useThree((s) => s.camera);
  const entireUniverseRef = useRef<THREE.Group>(null);
  const mainGroupRef = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(reduced ? true : false);
  const readyRef = useRef(ready);
  readyRef.current = ready;
  const [flying, setFlying] = useState<{ planet: PlanetDef; t0: number; done: boolean } | null>(null);
  const galaxyOpacity = useRef(0);
  const introCutRef = useRef(false);

  useEffect(() => {
    if (ready) onReady();
  }, [ready]);

  useEffect(() => {
    const cut = () => {
      introCutRef.current = true;
      setFlying(null);
    };
    window.addEventListener("wheel", cut, { passive: true });
    window.addEventListener("touchmove", cut, { passive: true });
    window.addEventListener("touchstart", cut, { passive: true });
    window.addEventListener("scroll", cut, { passive: true });
    return () => {
      window.removeEventListener("wheel", cut);
      window.removeEventListener("touchmove", cut);
      window.removeEventListener("touchstart", cut);
      window.removeEventListener("scroll", cut);
    };
  }, []);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const gx = THREE.MathUtils.clamp(e.gamma / 40, -1, 1) * 0.25;
        const gy = THREE.MathUtils.clamp((e.beta - 30) / 40, -1, 1) * 0.25;
        pointerState.gyroX = gx;
        pointerState.gyroY = gy;
      }
    };
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  const handleClick = (def: PlanetDef) => {
    if (!readyRef.current) return;
    setFlying({ planet: def, t0: performance.now(), done: false });
    scrollToId(def.section);
  };

  useFrame((state, delta) => {
    // 1. Tilt the ENTIRE space system (stars, galaxy, nebulae, meteors, solar system, everything!) on hover/gyro
    if (entireUniverseRef.current) {
      const targetTiltX = (pointerState.y * 0.35) + pointerState.gyroY;
      const targetTiltZ = (pointerState.x * 0.35) + pointerState.gyroX;

      entireUniverseRef.current.rotation.x = THREE.MathUtils.damp(
        entireUniverseRef.current.rotation.x,
        targetTiltX,
        4,
        delta
      );
      entireUniverseRef.current.rotation.z = THREE.MathUtils.damp(
        entireUniverseRef.current.rotation.z,
        targetTiltZ,
        4,
        delta
      );
    }

    // 2. Slow continuous orbital rotation for solar system
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y += delta * 0.02;
    }

    const t = state.clock.elapsedTime;
    if (!readyRef.current && (introCutRef.current || t >= 4.2)) setReady(true);

    const target = !readyRef.current ? THREE.MathUtils.smoothstep(t, 0.9, 2.1) - THREE.MathUtils.smoothstep(t, 2.7, 3.4) : 0;
    galaxyOpacity.current = THREE.MathUtils.damp(galaxyOpacity.current, Math.max(0, target), 3, delta);

    if (flying) {
      const f = flying;
      const now = performance.now();
      const k = Math.min(1, (now - f.t0) / 750);
      const eased = 1 - Math.pow(1 - k, 3);
      const mesh = meshRegistry.get(f.planet.id);
      if (mesh) {
        const targetPos = mesh.getWorldPosition(new THREE.Vector3()).multiplyScalar(0.62);
        targetPos.y = 1.4;
        const speed = 2 + eased * 4;
        camera.position.lerp(targetPos, 1 - Math.exp(-speed * delta));
        camera.lookAt(0, 0, 0);
      }
      if (k >= 1) {
        setFlying(null);
      }
    } else if (!readyRef.current) {
      const base = cameraTargetFor(t);
      const targetPos = new THREE.Vector3(base.x, base.y, base.z);
      camera.position.lerp(targetPos, 1 - Math.exp(-2.1 * delta));
      camera.lookAt(0, 0.2, 0);
    }
  });

  return (
    <>
      <OrbitControls
        makeDefault
        enabled={ready && !flying}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.8}
        enableZoom={false}
        minDistance={10}
        maxDistance={110}
      />
      <ambientLight intensity={0.25} />
      <directionalLight position={[10, 12, 8]} intensity={0.6} color="#ffffff" />

      {/* Entire Space System Group — tilts whole universe on side hover & mobile gyroscope */}
      <group ref={entireUniverseRef}>
        <Stars radius={90} depth={45} count={1800} factor={3.4} saturation={0} fade speed={0.5} />
        <SpaceDust />
        <ForegroundAsteroids />
        <ShootingMeteor />
        <Galaxy opacityRef={galaxyOpacity} />
        <Nebula position={[9, 2, 2]} color="rgba(124,92,255,0.6)" scale={16} />
        <Nebula position={[-8, -3, -6]} color="rgba(56,189,248,0.5)" scale={14} />

        <group ref={mainGroupRef} rotation={[0.55, 0.15, -0.12]}>
          <Sun ready={ready} />
          {/* Orbit lines */}
          {PLANETS.map((p) => (
            <mesh key={`orbit-${p.id}`} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[p.distance - 0.015, p.distance + 0.015, 48]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.13} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
          ))}
          {/* 3D Asteroid Belt between Mars & Jupiter */}
          <AsteroidBelt />
          {/* Planets */}
          {PLANETS.map((p, i) => (
            <Planet
              key={p.id}
              def={p}
              index={i}
              ready={ready}
              hovered={hoveredPlanet?.id === p.id}
              onHover={onHoverPlanet}
              onClick={handleClick}
              tooltipEl={tooltipEl}
            />
          ))}
        </group>
      </group>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Export — Canvas Wrapper */
/* ------------------------------------------------------------------ */
export default function Hero3D({ onReady, tooltipEl, onHoverPlanet, hoveredPlanet }: { onReady: () => void; tooltipEl: RefObject<HTMLDivElement | null>; onHoverPlanet: (def: PlanetDef | null) => void; hoveredPlanet: PlanetDef | null; }) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-[#050505]"
      onPointerMove={(e) => {
        pointerState.x = e.clientX / window.innerWidth - 0.5;
        pointerState.y = e.clientY / window.innerHeight - 0.5;
      }}
    >
      <Canvas
        camera={{ fov: 60, position: reduced ? [0, 1.15, 16.8] : [0, 3.4, 58], near: 0.1, far: 200 }}
        dpr={1}
        frameloop={isInView ? "always" : "never"}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
        onCreated={({ gl }) => gl.setClearColor("#050505", 1)}
      >
        <Suspense fallback={null}>
          <Scene onReady={onReady} tooltipEl={tooltipEl} hoveredPlanet={hoveredPlanet} onHoverPlanet={onHoverPlanet} />
        </Suspense>
      </Canvas>
    </div>
  );
}
