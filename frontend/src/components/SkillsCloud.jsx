import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Word({ children, position, color }) {
    const fontProps = { fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
    const ref = useRef(null)
    const [hovered, setHovered] = useState(false)
    const over = (e) => (e.stopPropagation(), setHovered(true))
    const out = () => setHovered(false)

    // Animate the word to always face the camera
    useFrame(({ camera }) => {
        if (ref.current) {
            ref.current.quaternion.copy(camera.quaternion)
        }
    })

    return (
        <Text ref={ref} onPointerOver={over} onPointerOut={out} {...fontProps} position={position} color={color}>
            {children}
        </Text>
    )
}

function Cloud({ words, radius = 20 }) {
    const group = useRef(null)

    useFrame((state, delta) => {
        // Constant rotation
        if (group.current) {
            group.current.rotation.y += delta * 0.1
            group.current.rotation.x += delta * 0.05
        }
    })

    const wordsWithPosition = useMemo(() => {
        const temp = []
        const phiSpan = Math.PI * (3 - Math.sqrt(5))

        for (let i = 0; i < words.length; i++) {
            const y = 1 - (i / (words.length - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phiSpan * i;

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            temp.push([new THREE.Vector3(x, y, z).multiplyScalar(radius), words[i]])
        }
        return temp
    }, [words, radius])

    return (
        <group ref={group}>
            {wordsWithPosition.map(([pos, word], index) => (
                <Word key={index} position={pos} color="#38bdf8">
                    {word}
                </Word>
            ))}
        </group>
    )
}

const SkillsCloud = ({ skills }) => {
    // Fallback if no skills are passed
    const safeSkills = skills && skills.length > 0 ? skills : ["React", "Three.js", "Node.js", "TypeScript"];

    return (
        <div className="h-[500px] w-full cursor-pointer">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
                <fog attach="fog" args={['#0f172a', 0, 80]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Cloud words={safeSkills} radius={20} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
            </Canvas>
        </div>
    );
};

export default SkillsCloud;
