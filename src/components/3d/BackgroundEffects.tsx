"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, Float, Stars } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import * as THREE from "three";

interface BackgroundEffectsProps {
    scrollYProgress: MotionValue<number>;
}

export const BackgroundEffects = ({ scrollYProgress }: BackgroundEffectsProps) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            const progress = scrollYProgress.get();
            // Вращаем и смещаем всю группу эффектов при скролле для параллакса
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, progress * Math.PI, 0.05);
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, progress * -5, 0.05);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Летающие блестящие частицы (пылинки на свету) */}
            <Sparkles count={150} scale={15} size={3} speed={0.4} opacity={0.6} color="#3B82F6" />
        </group>
    );
};
