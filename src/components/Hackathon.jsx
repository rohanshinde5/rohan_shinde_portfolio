import React, { useRef, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Award, Compass, Map, Cpu, ArrowRight } from 'lucide-react';
import * as THREE from 'three';

// 3D Transit Network Visualization
function TransitNetwork() {
  const pointsRef = useRef();
  const lineRef = useRef();
  
  const [nodes, nodeColors, linePositions] = useMemo(() => {
    const count = 16;
    const tempNodes = [];
    const colors = new Float32Array(count * 3);
    const colorCyan = new THREE.Color('#00f0ff');
    const colorViolet = new THREE.Color('#7000ff');
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 3;
      const y = (Math.random() - 0.5) * 2;
      const z = (Math.random() - 0.5) * 2;
      tempNodes.push(new THREE.Vector3(x, y, z));
      
      const mixedColor = new THREE.Color().lerpColors(colorCyan, colorViolet, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const lines = [];
    for (let i = 0; i < count; i++) {
      const distances = tempNodes
        .map((node, index) => ({ dist: tempNodes[i].distanceTo(node), idx: index }))
        .filter((item) => item.idx !== i)
        .sort((a, b) => a.dist - b.dist);
        
      for (let j = 0; j < Math.min(2, distances.length); j++) {
        lines.push(tempNodes[i].x, tempNodes[i].y, tempNodes[i].z);
        const target = tempNodes[distances[j].idx];
        lines.push(target.x, target.y, target.z);
      }
    }
    
    const linePositionsArr = new Float32Array(lines);
    
    return [tempNodes, colors, linePositionsArr];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.08;
      pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    }
    if (lineRef.current) {
      lineRef.current.rotation.y = time * 0.08;
      lineRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    }
  });

  const pointsPositions = useMemo(() => {
    const pos = new Float32Array(nodes.length * 3);
    nodes.forEach((node, i) => {
      pos[i * 3] = node.x;
      pos[i * 3 + 1] = node.y;
      pos[i * 3 + 2] = node.z;
    });
    return pos;
  }, [nodes]);

  return (
    <group>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#7000ff" transparent opacity={0.25} />
      </lineSegments>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointsPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nodeColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function Hackathon() {
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowStyle, setGlowStyle] = useState({ opacity: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Max 8 degrees rotation for this large card
    const rX = -((mouseY - height / 2) / height) * 8;
    const rY = ((mouseX - width / 2) / width) * 8;
    
    setRotateX(rX);
    setRotateY(rY);

    setGlowStyle({
      opacity: 1,
      background: `radial-gradient(circle 220px at ${mouseX}px ${mouseY}px, rgba(0, 255, 157, 0.15), transparent 80%)`,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowStyle({ opacity: 0 });
  };

  return (
    <section id="hackathon" className="py-24 relative overflow-hidden bg-obsidian">
      {/* Background Glows */}
      <div className="absolute top-[40%] left-[-15%] w-[450px] h-[450px] pulsing-glow-green opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-emeraldGreen mb-3 flex items-center gap-1.5">
            <Award size={14} /> SELECTIVE RECOGNITION
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Smart India <span className="text-transparent bg-clip-text bg-gradient-to-r from-emeraldGreen to-neonCyan">Hackathon (SIH)</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-emeraldGreen to-neonCyan mt-4 rounded-full"></div>
        </div>

        {/* Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context Card with 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s ease-out',
              }}
              className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 bg-obsidian-light/40 relative select-none cursor-pointer"
            >
              {/* Dynamic Cursor Light Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10 rounded-3xl"
                style={glowStyle}
              />

              {/* Corner accent glow */}
              <div className="absolute -top-[1px] -left-[1px] w-24 h-24 bg-gradient-to-br from-emeraldGreen/20 to-transparent blur-md rounded-tl-3xl pointer-events-none z-0"></div>

              <div 
                style={{ transform: 'translateZ(20px)' }}
                className="relative z-20"
              >
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3.5 py-1.5 rounded-full border border-emeraldGreen/25 bg-emeraldGreen/5 text-emeraldGreen text-xs font-bold uppercase tracking-wider shadow-glowGreen">
                    National Finalist
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-gray-400 text-xs">
                    Kerala State NATPAC
                  </span>
                </div>

                <h4 className="text-3xl font-extrabold text-white mb-4">
                  National Travel Infrastructure Solution
                </h4>
                
                <p className="text-gray-400 text-base font-light leading-relaxed mb-6">
                  Represented Datta Meghe College of Engineering at the prestigious Smart India Hackathon (SIH). Developed an optimized web-based travel routing framework for the Kerala State National Transportation Planning and Research Centre (NATPAC) to optimize transit pathways.
                </p>

                {/* Specs */}
                <div className="space-y-4 mb-8">
                  <div className="flex gap-4 items-start">
                    <div className="p-2 rounded-xl bg-emeraldGreen/10 border border-emeraldGreen/20 text-emeraldGreen mt-0.5">
                      <Compass size={18} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white text-sm">Optimal Pathway Routing</h5>
                      <p className="text-xs text-gray-500 font-light mt-0.5">Engineered routing modules mapping alternative paths to relieve transit choke points.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-2 rounded-xl bg-neonCyan/10 border border-neonCyan/20 text-neonCyan mt-0.5">
                      <Map size={18} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white text-sm">Geospatial Data Processing</h5>
                      <p className="text-xs text-gray-500 font-light mt-0.5">Rendered real-time GIS mapping layers to locate coordinates and infrastructure delays.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-2 rounded-xl bg-electricViolet/10 border border-electricViolet/20 text-electricViolet mt-0.5">
                      <Cpu size={18} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white text-sm">High Concurrent Scaling</h5>
                      <p className="text-xs text-gray-500 font-light mt-0.5">Optimized relational data queries and path-finding execution runs for concurrent access.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6">
                  <span className="text-xs font-semibold text-gray-500 tracking-wider">
                    ROLE: Full-Stack Architect & System Designer
                  </span>
                  <span className="flex items-center gap-1 text-xs text-emeraldGreen font-semibold">
                    Internal SIH Selection <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Network Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 h-[350px] md:h-[450px] relative flex items-center justify-center"
          >
            {/* Glowing background halo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emeraldGreen/10 to-neonCyan/10 rounded-full filter blur-[60px] opacity-60"></div>
            
            <div className="w-full h-full border border-white/5 rounded-3xl overflow-hidden glass-panel bg-obsidian-light/20 relative">
              {/* Overlay HUD text */}
              <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-emeraldGreen/60 select-none">
                NATPAC_CORE_ROUTING_NETWORK_V1<br />
                NODE_COUNT: 16 // STATUS: STABLE<br />
                COORD_GRID: KERALA_STATE_TRANSIT
              </div>
              <Canvas camera={{ position: [0, 0, 2.5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#00ff9d" />
                <TransitNetwork />
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
