"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { useEffect, useState, Suspense } from "react";
import { MotionValue } from "framer-motion";
import { HouseModel } from "./HouseModel";
import { BackgroundEffects } from "./BackgroundEffects";
import { FloatingModels } from "./FloatingModels";

interface SceneProps {
    scrollYProgress: MotionValue<number>;
    isDetailMode: boolean;
    setIsDetailMode: (val: boolean) => void;
}

export const Scene = ({ scrollYProgress, isDetailMode, setIsDetailMode }: SceneProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-auto">
            <Canvas
                camera={{ position: [0, 2, 8], fov: 45 }}
                dpr={isMobile ? [1, 1.5] : [1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <Environment preset="city" />

                    <ambientLight intensity={0.5} />
                    <directionalLight
                        position={[5, 5, 5]}
                        intensity={1.5}
                        castShadow
                        shadow-mapSize={[1024, 1024]}
                    />

                    {/* Фоновые эффекты */}
                    <BackgroundEffects scrollYProgress={scrollYProgress} />

                    {/* Дом */}
                    <HouseModel
                        scrollYProgress={scrollYProgress}
                        isMobile={isMobile}
                        setIsDetailMode={setIsDetailMode}
                    />

                    {/* Дополнительные плавающие модели при скролле */}
                    <FloatingModels scrollYProgress={scrollYProgress} isMobile={isMobile} />

                    <ContactShadows
                        position={[0, -1.5, 0]}
                        opacity={0.5}
                        scale={15}
                        blur={2}
                        far={4}
                        color="#0A1128"
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};
