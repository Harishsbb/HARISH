
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const FlyingHero = () => {
    const groupRef = useRef();
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Fly in a figure-8 or orbital pattern
        if (groupRef.current) {
            groupRef.current.position.x = Math.sin(t * 0.5) * 6;
            groupRef.current.position.y = Math.cos(t * 0.3) * 4 + 2;
            groupRef.current.position.z = Math.sin(t * 0.3) * 5;

            // Rotate to face direction roughly
            groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.5;
            groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={5} rotationIntensity={0.5} floatIntensity={1}>
                {/* Iron Man-esque Trail */}
                <Trail
                    width={1.2}
                    length={12}
                    color="#fbbf24" // Gold
                    attenuation={(t) => t * t}
                >
                    <Trail
                        width={0.6}
                        length={6}
                        color="#ef4444" // Red
                        attenuation={(t) => t}
                    >
                        {/* Abstract Iron Man Representation (Glowing Core) */}
                        <mesh ref={meshRef}>
                            <octahedronGeometry args={[0.5, 0]} />
                            <meshStandardMaterial
                                color="#ef4444"
                                emissive="#fbbf24"
                                emissiveIntensity={2}
                                toneMapped={false}
                            />
                        </mesh>
                    </Trail>
                </Trail>

                {/* Propulsion Particles */}
                <Sparkles
                    count={20}
                    scale={2}
                    size={3}
                    speed={2}
                    opacity={0.5}
                    color="#fbbf24"
                    noise={0.2}
                />

                {/* Point Light for Glow */}
                <pointLight intensity={2} distance={10} color="#fbbf24" />
            </Float>
        </group>
    );
};

export default FlyingHero;
