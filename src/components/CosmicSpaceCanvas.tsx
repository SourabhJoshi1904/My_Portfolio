"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function BackgroundStars() {
  const count = 550;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const c1 = new THREE.Color("#7c5cff");
    const c2 = new THREE.Color("#2dd4bf");
    const c3 = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 85;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 130;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 55 - 12;

      const rand = Math.random();
      const c = rand < 0.4 ? c3 : rand < 0.75 ? c1 : c2;
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: cols };
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.012;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.11}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingOrbitalRings() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z += delta * 0.015;
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.15;
    ref.current.rotation.y = Math.cos(t * 0.3) * 0.15;
  });

  return (
    <group ref={ref} position={[0, -5, -22]}>
      {/* Outer Holographic Trajectory Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[19, 19.08, 48]} />
        <meshBasicMaterial color="#7c5cff" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>
      {/* Inner Telemetry Ring */}
      <mesh rotation={[-Math.PI / 4, 0.35, 0]}>
        <ringGeometry args={[27, 27.1, 48]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.16} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function CosmicSpaceCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-60" aria-hidden>
      <Canvas
        camera={{ fov: 60, position: [0, 0, 30] }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <BackgroundStars />
        <FloatingOrbitalRings />
      </Canvas>
    </div>
  );
}
