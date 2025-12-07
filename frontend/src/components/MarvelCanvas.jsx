
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Html, Icosahedron, Torus, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// A single holographic skill node
const SkillNode = ({ skill, position, color }) => {
    const ref = useRef();

    // Random gentle rotation for each node
    useFrame((state) => {
        ref.current.rotation.x += 0.005;
        ref.current.rotation.y += 0.005;
    });

    return (
        <group position={position} ref={ref}>
            {/* The Tech Node */}
            <Icosahedron args={[0.2, 0]}>
                <meshStandardMaterial
                    color={color}
                    wireframe
                    emissive={color}
                    emissiveIntensity={2}
                />
            </Icosahedron>

            {/* Connection Line to Center (Visual only) */}
            {/* <Line points={[[0,0,0], [0, -position[1], 0]]} color={color} lineWidth={1} /> */}

            {/* The Label */}
            <Html distanceFactor={10} position={[0.3, 0, 0]}>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00ffff]"></div>
                    <span
                        className="text-cyan-300 font-mono text-xs tracking-widest uppercase opacity-80"
                        style={{ textShadow: '0 0 5px #00ffff' }}
                    >
                        {skill}
                    </span>
                </div>
            </Html>
        </group>
    );
};

// The Central "Arc Reactor" Core
const TechCore = () => {
    const ref = useRef();
    const ring1 = useRef();
    const ring2 = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Core rotation
        ref.current.rotation.y = t * 0.5;
        ref.current.rotation.z = t * 0.2;

        // Ring rotations (Gyroscope feel)
        ring1.current.rotation.x = t * 0.8;
        ring1.current.rotation.y = t * 0.2;

        ring2.current.rotation.x = t * -0.6;
        ring2.current.rotation.z = t * 0.3;
    });

    return (
        <group>
            {/* Glowing Core */}
            <Icosahedron args={[1, 1]} ref={ref}>
                <meshStandardMaterial
                    color="#00ffff"
                    wireframe
                    transparent
                    opacity={0.3}
                    emissive="#00ffff"
                    emissiveIntensity={0.5}
                />
            </Icosahedron>

            {/* Solid Center */}
            <Icosahedron args={[0.5, 0]}>
                <meshStandardMaterial color="white" emissive="#00ffff" emissiveIntensity={5} toneMapped={false} />
            </Icosahedron>

            {/* Gyroscopic Rings */}
            <group ref={ring1}>
                <Torus args={[1.4, 0.02, 16, 100]}>
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
                </Torus>
            </group>

            <group ref={ring2}>
                <Torus args={[1.8, 0.02, 16, 100]}>
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
                </Torus>
            </group>
        </group>
    );
};

const StarkSystem = ({ skills = [] }) => {
    const skillNodes = useMemo(() => {
        const safeSkills = skills.length > 0 ? skills : ['Jarvis', 'React', 'Node', 'Cyber', 'AI'];
        return safeSkills.map((skill, i) => {
            // Fibonacci Sphere distribution for even spread
            const phi = Math.acos(-1 + (2 * i) / safeSkills.length);
            const theta = Math.sqrt(safeSkills.length * Math.PI) * phi;

            const radius = 5; // Distance from center
            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            return { skill, position: [x, y, z], color: "#00ffff" };
        });
    }, [skills]);

    return (
        <group>
            {/* Floating Core */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <TechCore />
            </Float>

            {/* Orbiting Skills */}
            <group rotation={[0, 0, 0]}> {/* Can add global rotation here if needed */}
                {skillNodes.map((node, i) => (
                    <SkillNode key={i} {...node} />
                ))}
            </group>
        </group>
    );
};

const MarvelCanvas = ({ skills }) => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 bg-black">
            {/* Subtle tech grid background in CSS can be added if requested, for now purely 3D */}
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />

                <StarkSystem skills={skills} />

                {/* Tech Particles */}
                <Sparkles count={200} scale={15} size={2} speed={0.2} opacity={0.5} color="#00ffff" />
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

export default MarvelCanvas;
