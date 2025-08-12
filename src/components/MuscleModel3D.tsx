import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface MuscleModel3DProps {
  hoveredMuscle: string | null;
  muscleScores: { [key: string]: number };
}

interface MuscleGroupProps {
  position: [number, number, number];
  geometry: THREE.BufferGeometry;
  muscleType: string;
  hoveredMuscle: string | null;
  score: number;
}

const MuscleGroup = ({ position, geometry, muscleType, hoveredMuscle, score }: MuscleGroupProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const isActive = hoveredMuscle === muscleType;
  const intensity = score / 100;
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      // Glow effect when hovered
      if (isActive) {
        const glowIntensity = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 0.7;
        (meshRef.current.material as THREE.MeshStandardMaterial).emissive.setHSL(0.33, 1, glowIntensity * 0.3);
      } else {
        (meshRef.current.material as THREE.MeshStandardMaterial).emissive.setHSL(0.33, 1, intensity * 0.1);
      }
    }
  });

  const baseColor = new THREE.Color(0x00ff44);
  const emissiveColor = new THREE.Color(0x004411);

  return (
    <mesh
      ref={meshRef}
      position={position}
      geometry={geometry}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={isActive ? 1.05 : 1}
    >
      <meshStandardMaterial
        color={baseColor}
        emissive={emissiveColor}
        emissiveIntensity={isActive ? 0.4 : intensity * 0.2}
        roughness={0.3}
        metalness={0.1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const HumanModel = ({ hoveredMuscle, muscleScores }: { hoveredMuscle: string | null, muscleScores: { [key: string]: number } }) => {
  // Create simplified geometries for each muscle group
  const chestGeometry = new THREE.CylinderGeometry(0.8, 0.6, 0.4, 8);
  const backGeometry = new THREE.CylinderGeometry(0.7, 0.5, 0.4, 8);
  const shouldersGeometry = new THREE.SphereGeometry(0.4, 8, 6);
  const armsGeometry = new THREE.CylinderGeometry(0.2, 0.15, 1.2, 8);
  const legsGeometry = new THREE.CylinderGeometry(0.3, 0.25, 1.5, 8);
  const coreGeometry = new THREE.CylinderGeometry(0.6, 0.7, 0.8, 8);

  return (
    <group>
      {/* Chest */}
      <MuscleGroup
        position={[0, 1.5, 0.3]}
        geometry={chestGeometry}
        muscleType="chest"
        hoveredMuscle={hoveredMuscle}
        score={muscleScores.chest || 0}
      />
      
      {/* Back */}
      <MuscleGroup
        position={[0, 1.5, -0.3]}
        geometry={backGeometry}
        muscleType="back"
        hoveredMuscle={hoveredMuscle}
        score={muscleScores.back || 0}
      />
      
      {/* Shoulders */}
      <MuscleGroup
        position={[-0.9, 2.1, 0]}
        geometry={shouldersGeometry}
        muscleType="shoulders"
        hoveredMuscle={hoveredMuscle}
        score={muscleScores.shoulders || 0}
      />
      <MuscleGroup
        position={[0.9, 2.1, 0]}
        geometry={shouldersGeometry}
        muscleType="shoulders"
        hoveredMuscle={hoveredMuscle}
        score={muscleScores.shoulders || 0}
      />
      
      {/* Arms */}
      <MuscleGroup
        position={[-1.1, 1.2, 0]}
        geometry={armsGeometry}
        muscleType="arms"
        hoveredMuscle={hoveredMuscle}
        score={muscleScores.arms || 0}
      />
      <MuscleGroup
        position={[1.1, 1.2, 0]}
        geometry={armsGeometry}
        muscleType="arms"
        hoveredMuscle={hoveredMuscle}
        score={muscleScores.arms || 0}
      />
      
      {/* Core */}
      <MuscleGroup
        position={[0, 0.8, 0]}
        geometry={coreGeometry}
        muscleType="core"
        hoveredMuscle={hoveredMuscle}
        score={muscleScores.core || 0}
      />
      
      {/* Legs */}
      <MuscleGroup
        position={[-0.35, -0.2, 0]}
        geometry={legsGeometry}
        muscleType="legs"
        hoveredMuscle={hoveredMuscle}
        score={muscleScores.legs || 0}
      />
      <MuscleGroup
        position={[0.35, -0.2, 0]}
        geometry={legsGeometry}
        muscleType="legs"
        hoveredMuscle={hoveredMuscle}
        score={muscleScores.legs || 0}
      />
    </group>
  );
};

export const MuscleModel3D = ({ hoveredMuscle, muscleScores }: MuscleModel3DProps) => {
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden bg-gradient-to-b from-background to-muted">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#00ff44" />
        
        <HumanModel hoveredMuscle={hoveredMuscle} muscleScores={muscleScores} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};