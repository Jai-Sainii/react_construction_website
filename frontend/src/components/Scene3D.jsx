import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ConstructionSite = () => {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Building Structure */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 3, 2]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>

      {/* Crane */}
      <mesh position={[3, 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4]} />
        <meshStandardMaterial color="#f56500" />
      </mesh>

      {/* Crane Arm */}
      <mesh position={[3, 4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 3]} />
        <meshStandardMaterial color="#f56500" />
      </mesh>

      {/* Ground */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 3, 0]} intensity={0.5} color="#f56500" />
    </group>
  );
};

const Scene3D = ({ className = '' }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={75} />
        <Environment preset="sunset" />
        <ConstructionSite />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;