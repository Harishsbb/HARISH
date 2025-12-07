
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Cloud, Float, Sparkles } from '@react-three/drei';
import FlyingHero from './FlyingHero';
import * as THREE from 'three';

const FogLayer = () => {
    const ref = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.z = t * 0.05; // Very slow rotation
    });
    return (
        <group ref={ref}>
            <Cloud opacity={0.1} speed={0.2} width={10} depth={1.5} segments={20} color="#0a0a1a" />
        </group>
    );
};

const FloatingParticles = () => {
    return (
        <group>
            {/* Distant subtle dust */}
            <Sparkles count={500} scale={20} size={2} speed={0.2} opacity={0.4} color="#4a4a6a" />
            {/* Closer faint stars */}
            <Sparkles count={100} scale={10} size={1} speed={0.1} opacity={0.6} color="#ffffff" />
        </group>
    );
};

const Dark3DBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <ambientLight intensity={0.2} />
                <fog attach="fog" args={['#000000', 5, 25]} />

                {/* Deep Space Background */}
                <color attach="background" args={['#050510']} />

                <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                    <FogLayer />
                </Float>

                <FloatingParticles />

                <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={0.5} />
                <FlyingHero />
            </Canvas>
        </div>
    );
};

export default Dark3DBackground;
