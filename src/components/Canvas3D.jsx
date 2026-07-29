import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveOrb({ isMobile }) {
  const pointsRef = useRef();
  const meshRef = useRef();
  const groupRef = useRef();

  // Generate particle positions in a spherical shell
  const [particlePositions, particleColors] = useMemo(() => {
    const count = isMobile ? 400 : 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorCyan = new THREE.Color('#00f0ff');
    const colorViolet = new THREE.Color('#7000ff');

    for (let i = 0; i < count; i++) {
      // Uniform distribution on sphere shell
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      // Radius shell between 1.2 and 1.6
      const r = 1.2 + Math.random() * 0.4;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Color interpolation based on position height
      const mixedColor = new THREE.Color().lerpColors(
        colorCyan,
        colorViolet,
        (positions[i * 3 + 1] + 1.6) / 3.2
      );
      
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    return [positions, colors];
  }, [isMobile]);

  useFrame((state) => {
    const { pointer } = state;
    
    // Smooth dampening towards cursor position
    const targetX = pointer.x * 0.4;
    const targetY = pointer.y * 0.4;
    
    if (groupRef.current) {
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
    }
    
    // Continuous idle rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.003;
      meshRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Outer Particle Shell */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.015 : 0.02}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 2. Inner Wireframe Low-Poly Sphere (Only if not mobile or high-perf) */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.9, isMobile ? 1 : 2]} />
        <meshBasicMaterial
          color="#7000ff"
          wireframe
          transparent
          opacity={isMobile ? 0.15 : 0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* 3. Tiny Core Glow Mesh */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial 
          color="#00f0ff"
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

export default function Canvas3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 60 }}
        gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#7000ff" />
        
        <InteractiveOrb isMobile={isMobile} />
        
        {/* Disable OrbitControls to allow page scroll, only capture hover */}
        {/* We can uncomment OrbitControls if we want the user to be able to drag the orb */}
        {/* <OrbitControls enableZoom={false} autoRotate={false} /> */}
      </Canvas>
    </div>
  );
}
