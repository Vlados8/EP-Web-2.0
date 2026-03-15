"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { MotionValue, useTransform } from "framer-motion";
import * as THREE from "three";

interface HouseModelProps {
    scrollYProgress: MotionValue<number>;
    isMobile: boolean;
    isDetailMode?: boolean;
    setIsDetailMode?: (val: boolean) => void;
}

export const HouseModel = ({ scrollYProgress, isMobile, isDetailMode, setIsDetailMode }: HouseModelProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const houseGroupRef = useRef<THREE.Group>(null);
    const panelsRef = useRef<THREE.Group>(null);
    const pumpRef = useRef<THREE.Group>(null);
    const interiorRef = useRef<THREE.Group>(null);
    const inverterHtmlRef = useRef<HTMLDivElement>(null);
    const cable1Ref = useRef<THREE.Group>(null);
    const cable2Ref = useRef<THREE.Group>(null);
    const cable3Ref = useRef<THREE.Group>(null);

    const boilerHtmlRef = useRef<HTMLDivElement>(null);

    // Подготовка улучшенных материалов
    const materials = useMemo(() => {
        return {
            wall: new THREE.MeshStandardMaterial({
                color: "#F8FAFC",
                roughness: 0.9,
                transparent: true
            }),
            base: new THREE.MeshStandardMaterial({
                color: "#475569", // Цоколь
                roughness: 0.9,
                transparent: true
            }),
            wood: new THREE.MeshStandardMaterial({
                color: "#78350F", // Темное дерево
                roughness: 0.8,
                transparent: true
            }),
            glass: new THREE.MeshPhysicalMaterial({
                color: "#020617", // Стекло окон
                metalness: 0.9,
                roughness: 0.1,
                transparent: true,
                opacity: 0.8,
                transmission: 0.2,
                ior: 1.5,
            }),
            roof: new THREE.MeshStandardMaterial({
                color: "#0F172A", // Темная черепица
                roughness: 0.8,
                transparent: true
            }),
            frame: new THREE.MeshStandardMaterial({
                color: "#1E293B", // Рамы окон
                roughness: 0.8,
                transparent: true
            }),
            solar: new THREE.MeshPhysicalMaterial({
                color: "#020617", // Glass-Glass panel
                metalness: 0.9,
                roughness: 0.05,
                clearcoat: 1.0,
                clearcoatRoughness: 0.1,
            }),
            foxBase: new THREE.MeshStandardMaterial({
                color: "#1E293B", // FOX ESS темно-серый
                roughness: 0.7
            }),
            foxAccent: new THREE.MeshBasicMaterial({
                color: "#F97316" // FOX ESS оранжевый
            }),
            boschBase: new THREE.MeshStandardMaterial({
                color: "#F1F5F9", // Bosch светлый (ближе к белому матовому)
                roughness: 0.3,
                metalness: 0.1
            }),
            boschPanel: new THREE.MeshStandardMaterial({
                color: "#0F172A", // Bosch черная зона за решеткой
                roughness: 0.8
            }),
            boschGrill: new THREE.MeshStandardMaterial({
                color: "#94A3B8", // Серый цвет решетки вентилятора
                roughness: 0.6,
                metalness: 0.4
            }),
            boschLogo: new THREE.MeshStandardMaterial({
                color: "#CBD5E1", // Светло-серая вставка под логотип в центре
                roughness: 0.4
            }),
            pipeCopper: new THREE.MeshStandardMaterial({
                color: "#B45309", // Медный цвет для труб
                metalness: 0.8,
                roughness: 0.3
            })
        };
    }, []);

    // Геометрия дома (Двускатная крыша)
    const { houseShape, extrudeSettings } = useMemo(() => {
        const shape = new THREE.Shape();
        const w = 1.8; // половина ширины
        const h = 1.2; // половина высоты тела
        const rf = 1.6; // высота конька
        shape.moveTo(-w, -h);
        shape.lineTo(w, -h);
        shape.lineTo(w, h);
        shape.lineTo(0, h + rf);
        shape.lineTo(-w, h);
        shape.closePath();
        return { houseShape: shape, extrudeSettings: { depth: 4, bevelEnabled: false } };
    }, []);

    // Precise rotation mapping for the first 4 key stages (Refined v14)
    const targetRotationYValue = useTransform(
        scrollYProgress,
        [0, 0.125, 0.25, 0.375, 0.5],
        [
            Math.PI / 4,          // Hero (Isometric)
            Math.PI * 0.55,       // Solar (Subtle turn to Left side)
            Math.PI * 1.45,       // Pump (Subtle turn to Right side)
            Math.PI * 1.75,       // Interior (Isometric with transparency)
            Math.PI * 2.25        // Fade out transition
        ]
    );

    useFrame((state) => {
        if (!groupRef.current) return;

        const progress = scrollYProgress.get();
        const targetRotationY = targetRotationYValue.get();
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);

        // Аннотации FOX (Солнечные панели - Screen 1, progress ~ 0.14)
        if (inverterHtmlRef.current) {
            let op = 0;
            if (isDetailMode) op = 1;
            else if (progress > 0.08 && progress <= 0.12) op = (progress - 0.08) / 0.04;
            else if (progress > 0.12 && progress <= 0.17) op = 1;
            else if (progress > 0.17 && progress <= 0.20) op = 1 - (progress - 0.17) / 0.03;
            inverterHtmlRef.current.style.opacity = op.toString();
        }

        // Аннотации Boiler (Тепловые насосы - Screen 2, progress ~ 0.28)
        if (boilerHtmlRef.current) {
            let op = 0;
            if (isDetailMode) op = 1;
            else if (progress > 0.21 && progress <= 0.26) op = (progress - 0.21) / 0.05;
            else if (progress > 0.26 && progress <= 0.32) op = 1;
            else if (progress > 0.32 && progress <= 0.35) op = 1 - (progress - 0.32) / 0.03;
            boilerHtmlRef.current.style.opacity = op.toString();
        }

        const baseScale = isMobile ? 0.35 : 0.8;
        // Дом исчезает после секции Интерьера (ROI/Form начинаются после 0.5)
        const isPastHouse = progress > 0.52;
        const targetScale = isPastHouse ? 0.001 : (progress > 0.05 && progress < 0.48 ? baseScale * 1.2 : baseScale);
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));

        // Mobile offset: move down to make room for titles
        const targetYOffset = isMobile ? -1.8 : -0.2;
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetYOffset, 0.05);

        // Section-based X offset for mobile (to avoid overlapping with text if needed, or just stay centered)
        // For Solar (justify-end in section), maybe move house slightly left on mobile?
        // Actually, on mobile, sections are full width, so centering is better.
        let targetX = 0;
        if (isMobile) {
            if (progress > 0.1 && progress < 0.22) targetX = -0.2; // Solar
            if (progress > 0.24 && progress < 0.36) targetX = 0.2; // Pump
        }
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);

        if (houseGroupRef.current) {
            // Прозрачность интерьера (Interior - Screen 3, progress ~ 0.42)
            const isInterior = progress > 0.38;
            const targetOpacity = isInterior ? 0.15 : 1.0;
            const glassTargetOpacity = isInterior ? 0.05 : 0.7;

            materials.wall.opacity = THREE.MathUtils.lerp(materials.wall.opacity, targetOpacity, 0.05);
            materials.base.opacity = THREE.MathUtils.lerp(materials.base.opacity, targetOpacity, 0.05);
            materials.wood.opacity = THREE.MathUtils.lerp(materials.wood.opacity, targetOpacity, 0.05);
            materials.roof.opacity = THREE.MathUtils.lerp(materials.roof.opacity, targetOpacity, 0.05);
            materials.frame.opacity = THREE.MathUtils.lerp(materials.frame.opacity, targetOpacity, 0.05);
            materials.glass.opacity = THREE.MathUtils.lerp(materials.glass.opacity, glassTargetOpacity, 0.05);

            if (interiorRef.current) {
                interiorRef.current.visible = materials.wall.opacity < 0.8 && !isPastHouse;
            }
        }

        // Плавная анимация кабелей (Screen 1, Solar)
        let targetC1 = 0.001;
        let targetC2 = 0.001;
        let targetC3 = 0.001;

        if (progress > 0.08 && progress < 0.25) {
            targetC1 = 1;
            if (cable1Ref.current && cable1Ref.current.scale.y > 0.8) targetC2 = 1;
            if (cable2Ref.current && cable2Ref.current.scale.y > 0.8) targetC3 = 1;
        }

        // Если скроллим обратно - кабели плавно "втягиваются"
        const speedC1 = targetC1 === 1 ? 0.02 : 0.08;
        const speedC2 = targetC2 === 1 ? 0.02 : 0.08;
        const speedC3 = targetC3 === 1 ? 0.02 : 0.08;

        if (cable1Ref.current) cable1Ref.current.scale.y = THREE.MathUtils.lerp(cable1Ref.current.scale.y, targetC1, speedC1);
        if (cable2Ref.current) cable2Ref.current.scale.y = THREE.MathUtils.lerp(cable2Ref.current.scale.y, targetC2, speedC2);
        if (cable3Ref.current) cable3Ref.current.scale.y = THREE.MathUtils.lerp(cable3Ref.current.scale.y, targetC3, speedC3);

        if (progress < 0.1) {
            const mouseX = (state.pointer.x * Math.PI) / 10;
            const mouseY = (state.pointer.y * Math.PI) / 10;
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -mouseX * 0.1, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.1, 0.05);
        } else {
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.05);
        }
    });

    return (
        <group
            ref={groupRef}
            position={[0, -0.2, 0]}
        >
            <group ref={houseGroupRef}>
                {/* Цоколь (Фундамент) */}
                <mesh position={[0, -1.35, 0]} castShadow receiveShadow material={materials.base}>
                    <boxGeometry args={[3.8, 0.3, 4.2]} />
                </mesh>

                {/* Основное тело дома (штукатурка) */}
                {/* Центрируем ExtrudeGeometry, сдвигая по Z на -2 */}
                <mesh position={[0, 0, -2]} castShadow receiveShadow material={materials.wall}>
                    <extrudeGeometry args={[houseShape, extrudeSettings]} />
                </mesh>

                {/* Крыша Правая (+X) */}
                <group position={[0, 2.8, 0]} rotation={[0, 0, -0.726]}>
                    <mesh position={[1.57, 0, 0]} castShadow receiveShadow material={materials.roof}>
                        <boxGeometry args={[3.2, 0.08, 4.4]} />
                    </mesh>
                </group>

                {/* Крыша Левая (-X) со встроенными Glass-Glass Солнечными Панелями */}
                <group position={[0, 2.8, 0]} rotation={[0, 0, 0.726]}>
                    <mesh position={[-1.57, 0, 0]} castShadow receiveShadow material={materials.roof}>
                        <boxGeometry args={[3.2, 0.08, 4.4]} />
                    </mesh>
                    {/* Панели сдвигаем по локальной оси */}
                    <group ref={panelsRef} position={[-1.6, 0.05, 0]}>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <mesh key={i} position={[-0.6 + (i % 2) * 1.2, 0, -1.5 + Math.floor(i / 2) * 1.0]} castShadow material={materials.solar}>
                                <boxGeometry args={[1.15, 0.05, 0.95]} />
                            </mesh>
                        ))}
                    </group>
                </group>

                {/* Дымоход (Перенесен на правую сторону +X, как на видео) */}
                <mesh position={[1.0, 2.0, -1.0]} castShadow receiveShadow material={materials.wall}>
                    <boxGeometry args={[0.5, 1.0, 0.5]} />
                </mesh>
                <mesh position={[1.0, 2.5, -1.0]} castShadow receiveShadow material={materials.roof}>
                    <boxGeometry args={[0.6, 0.1, 0.6]} />
                </mesh>

                {/* Окно */}
                <mesh position={[-0.7, 0.0, 2.01]} material={materials.glass}>
                    <boxGeometry args={[1.2, 1.6, 0.05]} />
                </mesh>
                <mesh position={[-0.7, 0.8, 2.01]} material={materials.frame}><boxGeometry args={[1.3, 0.1, 0.1]} /></mesh>
                <mesh position={[-0.7, -0.8, 2.01]} material={materials.frame}><boxGeometry args={[1.3, 0.1, 0.1]} /></mesh>
                <mesh position={[-1.3, 0.0, 2.01]} material={materials.frame}><boxGeometry args={[0.1, 1.7, 0.1]} /></mesh>
                <mesh position={[-0.1, 0.0, 2.01]} material={materials.frame}><boxGeometry args={[0.1, 1.7, 0.1]} /></mesh>
                <mesh position={[-0.7, 0.0, 2.02]} material={materials.frame}><boxGeometry args={[1.2, 0.05, 0.06]} /></mesh>
                <mesh position={[-0.7, 0.0, 2.02]} material={materials.frame}><boxGeometry args={[0.05, 1.6, 0.06]} /></mesh>

                {/* Дверь */}
                <mesh position={[0.9, -0.2, 2.01]} material={materials.wood}>
                    <boxGeometry args={[1.0, 2.0, 0.05]} />
                </mesh>
                <mesh position={[0.9, 0.8, 2.02]} material={materials.frame}><boxGeometry args={[1.1, 0.1, 0.1]} /></mesh>
                <mesh position={[0.4, -0.2, 2.02]} material={materials.frame}><boxGeometry args={[0.1, 2.1, 0.1]} /></mesh>
                <mesh position={[1.4, -0.2, 2.02]} material={materials.frame}><boxGeometry args={[0.1, 2.1, 0.1]} /></mesh>

                {/* Оборудование FOX ESS (Левая стена -X) */}
                <group position={[-1.81, -0.4, 0.5]} rotation={[0, -Math.PI / 2, 0]}>
                    {/* Стек батарей FOX Energy Cube (Самый нижний и массивный) */}
                    <group position={[0, -0.6, 0]}>
                        {/* Изменяем геометрию - "расплющиваем" вдоль стены Z, глубина по Z становится минимальной */}
                        <mesh castShadow receiveShadow material={materials.foxBase}><boxGeometry args={[0.8, 1.0, 0.2]} /></mesh>
                        <mesh position={[-0.3, 0, 0.11]} material={materials.foxAccent}><boxGeometry args={[0.02, 1.0, 0.02]} /></mesh>
                        <mesh position={[0.3, 0, 0.11]} material={materials.foxAccent}><boxGeometry args={[0.02, 1.0, 0.02]} /></mesh>
                        <mesh position={[0, 0.2, 0.11]} material={materials.frame}><boxGeometry args={[0.7, 0.02, 0.02]} /></mesh>
                        <mesh position={[0, -0.2, 0.11]} material={materials.frame}><boxGeometry args={[0.7, 0.02, 0.02]} /></mesh>

                        <Html position={[0, isMobile ? 3.5 : 0, 0.2]} center>
                            <div ref={inverterHtmlRef} style={{ opacity: 0 }} className={`absolute top-0 left-0 ${isMobile ? 'w-[280px]' : 'w-[400px]'} pointer-events-none transition-opacity duration-500`}>
                                {/* Battery Annotation */}
                                <div className={`absolute ${isMobile ? 'top-[40px] left-[-140px]' : 'top-[-10px] left-[-420px]'}`}>
                                    <svg width={isMobile ? "300" : "450"} height="150" className="absolute top-0 left-0 overflow-visible z-0 pointer-events-none">
                                        <path d={isMobile ? "M 140 0 L 140 20 L 140 40" : "M 190 20 L 220 20 L 420 10"} stroke="#F97316" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                                        <circle cx={isMobile ? 140 : 420} cy={isMobile ? 0 : 10} r="4" fill="#F97316" />
                                    </svg>
                                    <div className={`bg-white/40 backdrop-blur-md border border-white/60 shadow-lg p-2 rounded-xl ${isMobile ? 'w-[160px]' : 'w-[190px]'} z-10 text-left mt-1`}>
                                        <div className="absolute top-0 right-0 w-1 h-full bg-[#F97316] rounded-r-xl"></div>
                                        <h4 className="font-bold text-brand-graphite text-[10px] mb-0 pl-2 uppercase">FOX Energy Cube</h4>
                                        <p className="text-[9px] text-brand-graphite/80 pl-2">Hochvolt-Batteriespeicher</p>
                                    </div>
                                </div>

                                {/* Inverter Annotation */}
                                <div className={`absolute ${isMobile ? 'top-[-40px] left-[-140px]' : 'top-[-70px] left-[-420px]'}`}>
                                    <svg width={isMobile ? "300" : "450"} height="150" className="absolute top-0 left-0 overflow-visible z-0 pointer-events-none">
                                        <path d={isMobile ? "M 140 80 L 140 60 L 140 40" : "M 190 20 L 220 20 L 295 48"} stroke="#F97316" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                                        <circle cx={isMobile ? 140 : 295} cy={isMobile ? 80 : 48} r="4" fill="#F97316" />
                                    </svg>
                                    <div className={`bg-white/40 backdrop-blur-md border border-white/60 shadow-lg p-2 rounded-xl ${isMobile ? 'w-[160px]' : 'w-[190px]'} z-10 text-left mt-1`}>
                                        <div className="absolute top-0 right-0 w-1 h-full bg-[#F97316] rounded-r-xl"></div>
                                        <h4 className="font-bold text-brand-graphite text-[10px] mb-0 pl-2 uppercase">FOX Hybrid</h4>
                                        <p className="text-[9px] text-brand-graphite/80 pl-2">Wechselrichter H3-Serie</p>
                                    </div>
                                </div>

                                {/* EPS Annotation */}
                                <div className={`absolute ${isMobile ? 'top-[-110px] left-[-140px]' : 'top-[-130px] left-[-420px]'}`}>
                                    <svg width={isMobile ? "300" : "450"} height="150" className="absolute top-0 left-0 overflow-visible z-0 pointer-events-none">
                                        <path d={isMobile ? "M 140 100 L 140 80 L 140 60" : "M 190 20 L 220 20 L 305 40"} stroke="#10B981" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                                        <circle cx={isMobile ? 140 : 305} cy={isMobile ? 100 : 40} r="4" fill="#10B981" />
                                    </svg>
                                    <div className={`bg-white/40 backdrop-blur-md border border-white/60 shadow-lg p-2 rounded-xl ${isMobile ? 'w-[160px]' : 'w-[190px]'} z-10 text-left mt-1`}>
                                        <div className="absolute top-0 right-0 w-1 h-full bg-[#10B981] rounded-r-xl"></div>
                                        <h4 className="font-bold text-brand-graphite text-[10px] mb-0 pl-2 uppercase">FOX EPS</h4>
                                        <p className="text-[9px] text-brand-graphite/80 pl-2">Notstrom-Versorgung</p>
                                    </div>
                                </div>
                            </div>
                        </Html>
                    </group>

                    {/* Инвертор FOX H3 (Выше батареи) */}
                    <group position={[-1, -0.3, 0]}>
                        <mesh castShadow receiveShadow material={materials.foxBase}><boxGeometry args={[0.5, 0.4, 0.15]} /></mesh>
                        <mesh position={[0, 0.1, 0.08]} material={materials.frame}><boxGeometry args={[0.4, 0.2, 0.01]} /></mesh>
                        <mesh position={[0, 0.1, 0.081]} material={new THREE.MeshBasicMaterial({ color: "#22C55E" })}><boxGeometry args={[0.04, 0.04, 0.01]} /></mesh>
                        <mesh position={[0, -0.1, 0.08]} material={materials.foxAccent}><boxGeometry args={[0.1, 0.02, 0.01]} /></mesh>
                    </group>

                    {/* Notstrom EPS Block (Самый верхний маленький) */}
                    <group position={[-1, 0.2, 0]}>
                        <mesh castShadow receiveShadow material={materials.foxBase}><boxGeometry args={[0.3, 0.2, 0.15]} /></mesh>
                        <mesh position={[0, 0, 0.08]} material={new THREE.MeshBasicMaterial({ color: "#10B981" })}><boxGeometry args={[0.1, 0.02, 0.01]} /></mesh>
                    </group>

                    {/* Красные соединительные кабели (Анимация вместе с аннотациями) */}
                    <group>
                        {/* Кабель сверху (от панелей) до EPS */}
                        <group position={[-0.95, 1.25, 0.05]} ref={cable1Ref}>
                            <mesh position={[0, -0.475, 0]}>
                                <cylinderGeometry args={[0.012, 0.012, 0.95]} />
                                <meshBasicMaterial color="#EF4444" />
                            </mesh>
                        </group>

                        {/* Кабель от EPS к Инвертору */}
                        <group position={[-0.95, 0.15, 0.05]} ref={cable2Ref}>
                            <mesh position={[0, -0.175, 0]}>
                                <cylinderGeometry args={[0.012, 0.012, 0.35]} />
                                <meshBasicMaterial color="#EF4444" />
                            </mesh>
                        </group>

                        {/* Кабель от Инвертора к Батарее (идет прямо вправо) */}
                        <group position={[-0.75, -0.4, 0.05]} rotation={[0, 0, -Math.PI / 2]} ref={cable3Ref}>
                            <mesh position={[0, 0.375, 0]}>
                                <cylinderGeometry args={[0.012, 0.012, 0.75]} />
                                <meshBasicMaterial color="#EF4444" />
                            </mesh>
                        </group>
                    </group>
                </group>
            </group>

            {/* Наружный тепловой насос (Bosch) Правая сторона (+X) */}
            {/* Сдвигаем еще сильнее вперед (Z=1.1) и делаем фундамент до земли */}
            <group ref={pumpRef} position={[2.6, -1, -1]}>
                {/* Основной белый корпус. Размеры: ширина 0.5 (X), высота 0.9 (Y), глубина 1.4 (Z) */}
                <mesh castShadow receiveShadow material={materials.boschBase} position={[0, 0.45, 0]}>
                    <boxGeometry args={[0.5, 0.9, 1.4]} />
                </mesh>

                {/* Серое бетонное основание (утолщенное до 0.3, чтобы точно касаться земли) */}
                <mesh position={[0, -0.18, 0]} material={materials.base}>
                    <boxGeometry args={[0.6, 0.3, 1.5]} />
                </mesh>

                {/* Лицевая панель с вентилятором (Смотрит НАРУЖУ от дома, то есть +X) */}
                <group position={[0.26, 0.45, 0]}>
                    {/* Черная впадина (фон для вентилятора) */}
                    <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]}>
                        <circleGeometry args={[0.38, 32]} />
                        <meshStandardMaterial color="#020617" />
                    </mesh>

                    {/* Центральная заглушка (логотип) */}
                    <mesh rotation={[0, 0, Math.PI / 2]} position={[0.01, 0, 0]} material={materials.boschBase}>
                        <cylinderGeometry args={[0.22, 0.2, 0.05, 32]} />
                    </mesh>

                    {/* Кольца решетки */}
                    <mesh rotation={[0, Math.PI / 2, 0]} position={[0.005, 0, 0]} material={materials.boschGrill}>
                        <torusGeometry args={[0.35, 0.015, 8, 32]} />
                    </mesh>
                    <mesh rotation={[0, Math.PI / 2, 0]} position={[0.005, 0, 0]} material={materials.boschGrill}>
                        <torusGeometry args={[0.25, 0.01, 8, 32]} />
                    </mesh>

                </group>

                {/* Скругленный угол крышки */}
                <mesh position={[0, 0.89, 0]} rotation={[0, 0, Math.PI / 4]} material={materials.boschBase}>
                    <boxGeometry args={[0.08, 0.08, 1.4]} />
                </mesh>
            </group>

            {/* Внутренности (Бойлер Bosch и проводка) */}
            <group ref={interiorRef} visible={false}>
                <group position={[1.2, -0.2, -1]}>
                    {/* Основной корпус - Прямоугольный премиальный шкаф (Compress 7000i) */}
                    <mesh castShadow receiveShadow material={materials.boschBase}>
                        <boxGeometry args={[0.6, 1.8, 0.6]} />
                    </mesh>

                    {/* Передняя глянцевая панель (Glass) */}
                    <mesh position={[0, 0, 0.301]} material={materials.glass}>
                        <boxGeometry args={[0.55, 1.7, 0.02]} />
                    </mesh>

                    {/* Панель управления Bosch */}
                    <mesh position={[0, 0.5, 0.315]} material={materials.boschPanel}>
                        <boxGeometry args={[0.35, 0.22, 0.01]} />
                    </mesh>
                    <mesh position={[0, 0.5, 0.322]}>
                        <boxGeometry args={[0.18, 0.1, 0.005]} />
                        <meshBasicMaterial color="#38BDF8" />
                    </mesh>

                    {/* Декоративные горизонтальные полосы как у наружного блока */}
                    {[...Array(5)].map((_, i) => (
                        <mesh key={i} position={[0, -0.6 + i * 0.15, 0.305]} material={materials.boschGrill}>
                            <boxGeometry args={[0.5, 0.005, 0.01]} />
                        </mesh>
                    ))}

                    <Html position={[0, isMobile ? 4.0 : 0.4, 0.45]} center>
                        <div ref={boilerHtmlRef} style={{ opacity: 0 }} className={`absolute top-0 left-0 ${isMobile ? 'w-[280px]' : 'w-[400px]'} pointer-events-none`}>
                            <svg width={isMobile ? "150" : "250"} height={isMobile ? "150" : "250"} className="absolute top-0 left-0 overflow-visible z-0">
                                <path d={isMobile ? "M 0 50 L 0 30 L 0 0" : "M 0 0 L 40 -30 L 90 -30"} stroke="#0F172A" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                                <circle cx="0" cy={isMobile ? 50 : 0} r="4" fill="#0F172A" />
                            </svg>
                            <div className={`absolute ${isMobile ? 'top-[-20px] left-[-110px] w-[220px]' : 'top-[-70px] left-[90px] w-[220px]'} bg-white/40 backdrop-blur-md border border-white/60 shadow-lg p-4 pb-5 rounded-xl z-10`}>
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#0F172A] rounded-l-xl"></div>
                                <h4 className="font-bold text-brand-graphite text-sm mb-1 pl-2 uppercase">Bosch Heizsystem</h4>
                                <p className="text-xs text-brand-graphite/70 pl-2">Inneneinheit mit intelligenter Steuerung</p>
                            </div>
                        </div>
                    </Html>
                </group>

                {/* Электропроводка */}
                <mesh position={[-0.5, 0, 0]}><cylinderGeometry args={[0.02, 0.02, 2.2]} /><meshBasicMaterial color="#F97316" /></mesh>
                <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.02, 0.02, 1.5]} /><meshBasicMaterial color="#F97316" /></mesh>
                <mesh position={[-0.5, -1.1, 0]}><boxGeometry args={[1.8, 0.1, 2.8]} /><meshBasicMaterial color="#EF4444" transparent opacity={0.5} /></mesh>
            </group>

            {/* Медные трубы Heat Pump (Соединение) - Вынесены для видимости снаружи */}
            <group position={[1.8, -0.6, -1]}>
                {/* Труба 1 (Flow) - Утолщенная с изоляцией */}
                <mesh rotation={[0, 0, Math.PI / 2]} position={[0.1, 0, 0.05]} material={materials.pipeCopper}>
                    <cylinderGeometry args={[0.025, 0.025, 1]} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]} position={[0.1, 0, 0.05]} material={materials.boschPanel}>
                    <cylinderGeometry args={[0.035, 0.035, 0.6]} />
                </mesh>

                {/* Труба 2 (Return) - Утолщенная с изоляцией */}
                <mesh rotation={[0, 0, Math.PI / 2]} position={[0.1, -0.1, -0.05]} material={materials.pipeCopper}>
                    <cylinderGeometry args={[0.025, 0.025, 1]} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]} position={[0.1, -0.1, -0.05]} material={materials.boschPanel}>
                    <cylinderGeometry args={[0.035, 0.035, 0.6]} />
                </mesh>

                {/* Внутренние части труб (идут к бойлеру) */}
                <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.6, 0.0, 0.0]} material={materials.pipeCopper}>
                    <cylinderGeometry args={[0.02, 0.02, 0.05]} />
                </mesh>
            </group>
        </group>
    );
};
