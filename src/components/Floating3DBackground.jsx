import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingShape({ geometry, position, color, speed, size }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Float up and down slightly
      meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.15;
      // Rotate continuously
      meshRef.current.rotation.x += 0.003 * speed;
      meshRef.current.rotation.y += 0.005 * speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[size, size, size]}>
      {geometry === 'torus' && <torusGeometry args={[1, 0.3, 8, 24]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[1]} />}
      {geometry === 'tetrahedron' && <tetrahedronGeometry args={[1]} />}
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function Floating3DBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        {/* Torus on left */}
        <FloatingShape
          geometry="torus"
          position={[-3, 1, 0]}
          color="#00f0ff"
          speed={1.2}
          size={0.6}
        />
        {/* Octahedron on right */}
        <FloatingShape
          geometry="octahedron"
          position={[3, -1.2, 0]}
          color="#7000ff"
          speed={0.8}
          size={0.7}
        />
        {/* Tetrahedron centered deep */}
        <FloatingShape
          geometry="tetrahedron"
          position={[0.5, 1.8, -2]}
          color="#00ff9d"
          speed={1.5}
          size={0.5}
        />
      </Canvas>
    </div>
  );
}
