"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import * as THREE from "three";

interface FloatingModelsProps {
    scrollYProgress: MotionValue<number>;
    isMobile: boolean;
}

export const FloatingModels = ({ scrollYProgress, isMobile }: FloatingModelsProps) => {
    const solarRef = useRef<THREE.Group>(null);
    const pumpRef = useRef<THREE.Group>(null);
    const solarHtmlRef = useRef<HTMLDivElement>(null);
    const pumpHtmlRef = useRef<HTMLDivElement>(null);

    useFrame((state) => {
        const progress = scrollYProgress.get();
        const time = state.clock.getElapsedTime();

        // Update Opacities directly to avoid R3F + Framer Motion context issues
        if (solarHtmlRef.current) {
            let op = 0;
            if (progress > 0.08 && progress <= 0.12) op = (progress - 0.08) / 0.04;
            else if (progress > 0.12 && progress <= 0.16) op = 1;
            else if (progress > 0.16 && progress <= 0.19) op = 1 - (progress - 0.16) / 0.03;
            solarHtmlRef.current.style.opacity = op.toString();
        }

        if (pumpHtmlRef.current) {
            let op = 0;
            if (progress > 0.21 && progress <= 0.25) op = (progress - 0.21) / 0.04;
            else if (progress > 0.25 && progress <= 0.29) op = 1;
            else if (progress > 0.29 && progress <= 0.32) op = 1 - (progress - 0.29) / 0.03;
            pumpHtmlRef.current.style.opacity = op.toString();
        }

        // Solar Panel Logic (Active around Screen 2, progress ~ 0.125)
        if (solarRef.current) {
            const isSolarActive = progress > 0.05 && progress <= 0.19;
            // Target position: sliding in from the left
            const targetX = isSolarActive ? (isMobile ? 0 : -3.5) : -15;
            const targetY = isSolarActive ? (isMobile ? 2.2 : 0.5) : 3;
            const targetScale = isSolarActive ? (isMobile ? 0.25 : 0.8) : 0;

            solarRef.current.position.x = THREE.MathUtils.lerp(solarRef.current.position.x, targetX, 0.05);
            solarRef.current.position.y = THREE.MathUtils.lerp(solarRef.current.position.y, targetY + Math.sin(time) * 0.1, 0.05);
            solarRef.current.scale.setScalar(THREE.MathUtils.lerp(solarRef.current.scale.x, targetScale, 0.1));

            if (isSolarActive) {
                solarRef.current.rotation.y += 0.005;
                solarRef.current.rotation.x = THREE.MathUtils.lerp(solarRef.current.rotation.x, 0, 0.05);
            } else {
                solarRef.current.rotation.y = THREE.MathUtils.lerp(solarRef.current.rotation.y, Math.PI / 4, 0.05);
                solarRef.current.rotation.x = THREE.MathUtils.lerp(solarRef.current.rotation.x, -Math.PI / 8, 0.05);
            }
        }

        // Heat Pump Logic (Active around Screen 3, progress ~ 0.25)
        if (pumpRef.current) {
            const isPumpActive = progress > 0.19 && progress < 0.32;
            // Target position: sliding in from the right
            const targetX = isPumpActive ? (isMobile ? 0 : 3.5) : 15;
            const targetY = isPumpActive ? (isMobile ? 1.8 : 1) : -3;
            const targetScale = isPumpActive ? (isMobile ? 0.25 : 0.8) : 0;

            pumpRef.current.position.x = THREE.MathUtils.lerp(pumpRef.current.position.x, targetX, 0.05);
            pumpRef.current.position.y = THREE.MathUtils.lerp(pumpRef.current.position.y, targetY + Math.sin(time + Math.PI) * 0.1, 0.05);
            pumpRef.current.scale.setScalar(THREE.MathUtils.lerp(pumpRef.current.scale.x, targetScale, 0.1));

            if (isPumpActive) {
                pumpRef.current.rotation.y -= 0.005;
                pumpRef.current.rotation.x = THREE.MathUtils.lerp(pumpRef.current.rotation.x, 0, 0.05);
            } else {
                pumpRef.current.rotation.y = THREE.MathUtils.lerp(pumpRef.current.rotation.y, -Math.PI / 4, 0.05);
                pumpRef.current.rotation.x = THREE.MathUtils.lerp(pumpRef.current.rotation.x, Math.PI / 8, 0.05);
            }
        }
    });

    return (
        <group>
            {/* Солнечная панель Glass-Glass */}
            <group ref={solarRef} position={[-8, 3, 2]} scale={isMobile ? 0.25 : 0.8}>
                <group rotation={[-Math.PI / 6, 0, 0]}>
                    {/* Каркас (алюминиевый) */}
                    <mesh castShadow>
                        <boxGeometry args={[2.2, 0.1, 3.2]} />
                        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.5} />
                    </mesh>
                    {/* Сама панель (Сплошное черное стекло Glass-Glass) */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
                        <planeGeometry args={[2, 3]} />
                        <meshPhysicalMaterial color="#020617" metalness={0.9} roughness={0.05} clearcoat={1.0} clearcoatRoughness={0.1} />
                    </mesh>
                </group>
                {/* Крепление/стойка */}
                <mesh position={[0, -0.6, 0]} castShadow>
                    <cylinderGeometry args={[0.08, 0.08, 1.2]} />
                    <meshStandardMaterial color="#64748B" />
                </mesh>
                <mesh position={[0, -1.2, 0]} castShadow>
                    <boxGeometry args={[1, 0.1, 1]} />
                    <meshStandardMaterial color="#64748B" />
                </mesh>

                {/* Информационная аннотация (появляется при скролле) */}
                <Html position={[0, -0.2, 0]} center>
                    <div ref={solarHtmlRef} style={{ opacity: 0 }} className={`absolute top-0 left-0 ${isMobile ? 'w-[280px]' : 'w-[400px]'} pointer-events-none`}>
                        <svg width={isMobile ? "150" : "250"} height={isMobile ? "150" : "250"} className="absolute top-0 left-0 overflow-visible z-0">
                            <path d={isMobile ? "M 0 0 L 20 -20 L 40 -20" : "M 0 0 L 40 -40 L 100 -40"} stroke="#EAB308" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                            <circle cx="0" cy="0" r="4" fill="#EAB308" />
                        </svg>

                        <div className={`absolute ${isMobile ? 'top-[-50px] left-[40px] w-[200px]' : 'top-[-80px] left-[100px] w-[240px]'} bg-white/40 backdrop-blur-md border border-white/60 shadow-lg p-3 pb-4 rounded-xl z-10`}>
                            <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent rounded-l-xl"></div>
                            <h4 className="font-bold text-brand-graphite text-[10px] md:text-sm mb-1 pl-2 uppercase tracking-wide">Монокристалл 500W</h4>
                            <p className="text-[9px] md:text-xs text-brand-graphite/70 pl-2 leading-relaxed">Высокая генерация энергии. Защита от града.</p>
                        </div>
                    </div>
                </Html>
            </group>

            {/* Тепловой насос (Bosch Boiler Premium Styling) */}
            <group ref={pumpRef} position={[8, -3, 2]} scale={isMobile ? 0.25 : 0.8}>
                {/* Основной корпус - Прямоугольный премиальный шкаф (Compress 7000i) */}
                <mesh castShadow>
                    <boxGeometry args={[0.8, 2.2, 0.8]} />
                    <meshStandardMaterial color="#F8FAFC" roughness={0.3} metalness={0.1} />
                </mesh>

                {/* Передняя глянцевая панель (Glass) */}
                <mesh position={[0, 0, 0.401]}>
                    <boxGeometry args={[0.74, 2.1, 0.02]} />
                    <meshPhysicalMaterial
                        color="#020617"
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        opacity={0.8}
                        transmission={0.2}
                        ior={1.5}
                    />
                </mesh>

                {/* Панель управления Bosch */}
                <mesh position={[0, 0.6, 0.415]}>
                    <boxGeometry args={[0.45, 0.28, 0.01]} />
                    <meshStandardMaterial color="#0F172A" roughness={0.8} />
                </mesh>
                <mesh position={[0, 0.6, 0.422]}>
                    <boxGeometry args={[0.22, 0.12, 0.005]} />
                    <meshBasicMaterial color="#38BDF8" />
                </mesh>

                {/* Декоративные горизонтальные полосы как у наружного блока */}
                {[...Array(6)].map((_, i) => (
                    <mesh key={i} position={[0, -0.8 + i * 0.2, 0.405]}>
                        <boxGeometry args={[0.65, 0.008, 0.01]} />
                        <meshStandardMaterial color="#94A3B8" roughness={0.6} metalness={0.4} />
                    </mesh>
                ))}

                {/* Голубое свечение из-под стекла */}
                <pointLight position={[0, 0.6, 0.5]} color="#38BDF8" intensity={2} distance={4} />

                {/* Информационная аннотация (появляется при скролле) */}
                <Html position={[0, 0.2, 0.65]} center>
                    <div ref={pumpHtmlRef} style={{ opacity: 0 }} className={`absolute top-0 left-0 ${isMobile ? 'w-[280px]' : 'w-[400px]'} pointer-events-none`}>
                        <svg width={isMobile ? "150" : "250"} height={isMobile ? "150" : "250"} className="absolute top-0 left-0 overflow-visible z-0">
                            <path d={isMobile ? "M 0 0 L -20 -20 L -40 -20" : "M 0 0 L -40 -40 L -100 -40"} stroke="#3B82F6" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                            <circle cx="0" cy="0" r="4" fill="#3B82F6" />
                        </svg>

                        <div className={`absolute ${isMobile ? 'top-[-50px] left-[-180px] w-[180px]' : 'top-[-80px] left-[-340px] w-[240px]'} bg-white/40 backdrop-blur-md border border-white/60 shadow-lg p-3 pb-4 rounded-xl z-10 text-right`}>
                            <div className="absolute top-0 right-0 w-1 h-full bg-blue-500 rounded-r-xl"></div>
                            <h4 className="font-bold text-brand-graphite text-[10px] md:text-sm mb-1 pr-2 uppercase tracking-wide">BOSCH OTOПЛЕНИЕ</h4>
                            <p className="text-[9px] md:text-xs text-brand-graphite/70 pr-2 leading-relaxed">Внутренний монтажный блок.</p>
                        </div>
                    </div>
                </Html>
            </group>
        </group>
    );
};

