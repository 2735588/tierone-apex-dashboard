import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Preload, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import React, { useMemo, useRef, useState, useEffect } from "react";

function useMaxAnisotropy() {
  const { gl } = useThree();
  return useMemo(() => gl.capabilities.getMaxAnisotropy?.() ?? 1, [gl]);
}

function makeRadialTexture(color = "#22c55e") {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(256, 256, 0, 256, 256, 256);
  grd.addColorStop(0, `${color}33`); // 0x33 = ~0.2 alpha
  grd.addColorStop(1, "#00000000");
  g.fillStyle = grd; g.fillRect(0, 0, 512, 512);
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  return tex;
}

function T1Plane({
  src = "/t1-mark-1024.png",
  aspect = 1.4,        // width:height (use 1 for square app icon)
  reducedMotion = false,
  pointer = { x: 0, y: 0 },
}: {
  src?: string;
  aspect?: number;
  reducedMotion?: boolean;
  pointer: { x: number; y: number };
}) {
  const tex = useTexture(src);
  const maxAniso = useMaxAnisotropy();

  // Ensure crisp sampling
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = Math.min(maxAniso, 8);

  const mat = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: tex,
    transparent: true,
    alphaTest: 0.01,
    roughness: 0.35,
    metalness: 0.0,
    clearcoat: 0.6,
    clearcoatRoughness: 0.25,
    emissive: new THREE.Color("#22c55e"),
    emissiveIntensity: 0.35,
    emissiveMap: tex,
    side: THREE.DoubleSide,
  }), [tex]);

  const group = useRef<THREE.Group>(null!);
  const glow  = useRef<THREE.Sprite>(null!);
  const tiltX = 0.22;                 // base tilt

  // Idle swing + pointer parallax (subtle & lerped)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const targetY = (reducedMotion ? 0 : Math.sin(t * 0.5) * 0.25) + pointer.x * 0.18; // yaw
    const targetX = tiltX + (reducedMotion ? 0 : pointer.y * 0.12);                    // pitch
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.08;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.08;

    const s = 1.05 + (reducedMotion ? 0 : Math.sin(t * 1.2) * 0.02);
    glow.current.scale.set(2.2 * s, 2.2 * s, 1);
    glow.current.material.opacity = 0.22 + (reducedMotion ? 0 : Math.sin(t * 1.2) * 0.03);
  });

  const glowTex = useMemo(() => makeRadialTexture("#22c55e"), []);
  const glowMat = useMemo(() => new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false }), [glowTex]);

  return (
    <group ref={group}>
      {/* Radial glow sprite (GPU-cheap, looks great on black UI) */}
      <sprite ref={glow} material={glowMat} position={[0, 0, -0.01]} scale={[2.2, 2.2, 1]} />

      {/* Logo plane */}
      <mesh material={mat} renderOrder={1}>
        <planeGeometry args={[aspect, 1]} />
      </mesh>
    </group>
  );
}

export default function T1LogoThreePro({
  src = "/t1-mark-1024.png",
  height = 240,
  icon = false, // set true if using square app icon
}: { src?: string; height?: number; icon?: boolean }) {
  const [reduced, setReduced] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return (
    <div
      style={{ height }}
      className="w-full relative select-none"
      onPointerMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width  * 2 - 1;
        const ny = (e.clientY - r.top)  / r.height * 2 - 1;
        setPointer({ x: nx, y: -ny });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      {/* Soft brand glow behind the canvas */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(60% 60% at 50% 10%, rgba(16,185,129,0.18), rgba(0,0,0,0) 70%)", filter: "blur(18px)" }}
      />
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 2.6], fov: 35 }}
      >
        {/* Lights (emissive map keeps edges bright even at low light) */}
        <ambientLight intensity={0.45} />
        <directionalLight intensity={1.0} position={[2, 3, 4]} />
        <directionalLight intensity={0.6} position={[-3, -2, 2]} />

        {/* The logo */}
        <T1Plane
          src={src}
          aspect={icon ? 1 : 1.4}
          reducedMotion={reduced}
          pointer={pointer}
        />

        {/* Subtle reflections without heavy cost */}
        <Environment preset="city" />
        <Preload all />

        {/* Tasteful bloom + slight vignette (no fuzz) */}
        {false && !reduced && (
          <EffectComposer enableNormalPass={false} multisampling={2}>
            <Bloom intensity={0.5} luminanceThreshold={0.2} luminanceSmoothing={0.35} radius={0.85} />
            <Vignette eskil={false} offset={0.2} darkness={0.7} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
