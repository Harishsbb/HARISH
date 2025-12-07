
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Sphere, Center, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const Ring = ({ args, color, speed, rotationOffset }) => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.z = t * speed + rotationOffset;
        meshRef.current.rotation.x = Math.cos(t * 0.5) * 0.2;
        meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    });

    return (
        <Torus args={args} ref={meshRef}>
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                roughness={0.1}
                metalness={0.8}
            />
        </Torus>
    );
};

const ReactorCore = () => {
    const coreRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const scale = 1 + Math.sin(t * 5) * 0.05; // Pulsing effect
        coreRef.current.scale.set(scale, scale, scale);
    });

    return (
        <Sphere args={[0.5, 32, 32]} ref={coreRef}>
            <meshBasicMaterial color="#00ffff" />
        </Sphere>
    );
};

const MarvelCanvas = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <group scale={1.5}>
                        <ReactorCore />
                        {/* Inner Ring */}
                        <Ring args={[1.2, 0.05, 16, 100]} color="#00ffff" speed={1} rotationOffset={0} />
                        {/* Middle Ring */}
                        <Ring args={[1.8, 0.05, 16, 100]} color="#0088ff" speed={-0.8} rotationOffset={Math.PI / 4} />
                        {/* Outer Ring */}
                        <Ring args={[2.5, 0.08, 16, 100]} color="#00ffff" speed={0.5} rotationOffset={Math.PI / 2} />

                        {/* Decorative Particles */}
                        <Sparkles count={50} scale={6} size={2} speed={0.4} opacity={0.5} color="#00ffff" />
                    </group>
                </Float>

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

export default MarvelCanvas;
