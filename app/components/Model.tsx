"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import * as THREE from "three";

const ModelMesh = () => {
    const groupRef = useRef<THREE.Group | null>(null);

    const baseRotation = useRef({ x: 0, y: 0 });
    const mousePosition = useRef({ x: 0, y: 0 });
    const smoothedMouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            mousePosition.current = { x, y };
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame((_, delta: number) => {
        if (!groupRef.current) return;

        smoothedMouse.current.x += (mousePosition.current.x - smoothedMouse.current.x) * 0.05;
        smoothedMouse.current.y += (mousePosition.current.y - smoothedMouse.current.y) * 0.05;

        baseRotation.current.x += delta * 0.5;
        baseRotation.current.y += delta * 0.5;

        const mouseInfluenceX = smoothedMouse.current.y * Math.PI * 0.5;
        const mouseInfluenceY = smoothedMouse.current.x * Math.PI * 0.5;

        const targetX = baseRotation.current.x + mouseInfluenceX;
        const targetY = baseRotation.current.y + mouseInfluenceY;

        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.1;
        groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.1;
    });

    return (
        <>
            <fog attach="fog" args={["#ededed", 2, 6]} />
            <group ref={groupRef} scale={1.2}>
                <mesh scale={[1.5, 0.1, 0.1]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="#ededed" roughness={0.5} metalness={0.7} />
                </mesh>

                <mesh scale={[0.1, 1.5, 0.1]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="#ededed" roughness={0.5} metalness={0.7} />
                </mesh>

                <mesh scale={[0.1, 0.1, 1.5]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="#ededed" roughness={0.5} metalness={0.7} />
                </mesh>
            </group>
        </>
    );
};

const Model = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
            <Stage adjustCamera={false} />
            <ModelMesh />
        </Canvas>
    );
};

export default Model;
