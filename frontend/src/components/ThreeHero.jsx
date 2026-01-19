import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedSphere = () => {
    const meshRef = useRef(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = time * 0.2;
            meshRef.current.rotation.y = time * 0.3;
        }
    });

    return (
        <Sphere args={[1, 100, 200]} scale={2} ref={meshRef}>
            <MeshDistortMaterial
                color="#38bdf8"
                attach="material"
                distort={0.3}
                speed={1.5}
                roughness={0.2}
            />
        </Sphere>
    );
};

const ThreeHero = () => {
    return (
        <div className="h-[500px] w-full bg-primary relative overflow-hidden">
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <h1 className="text-6xl font-bold text-white text-center drop-shadow-lg">
                    Harish K <br />
                    <span className="text-accent text-4xl">Full Stack Developer</span>
                </h1>
            </div>
            <Canvas className="absolute inset-0 z-0">
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <AnimatedSphere />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
};

export default ThreeHero;
