"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface Background2DProps {
    scrollYProgress: MotionValue<number>;
}

export const Background2D = ({ scrollYProgress }: Background2DProps) => {
    // Расширенные цветовые переходы для 9 секций (включая Галерею и Футер)
    // 0: Hero, 0.125: Solar, 0.25: Pump, 0.375: Interior, 0.5: Form, 0.625: ROI, 0.75: Efficiency, 0.875: Gallery, 1.0: Footer
    const bgGradient = useTransform(
        scrollYProgress,
        [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
        [
            "radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F8FAFC 100%)", // Hero
            "radial-gradient(circle at 80% 20%, #FEF9C3 0%, #FFFFFF 100%)", // Solar
            "radial-gradient(circle at 20% 80%, #DBEAFE 0%, #FFFFFF 100%)", // Pump
            "radial-gradient(circle at 50% 50%, #FFEDD5 0%, #FFFFFF 100%)", // Interior
            "radial-gradient(circle at 80% 80%, #F0F9FF 0%, #F8FAFC 100%)", // Smart Form
            "radial-gradient(circle at 50% 50%, #1E293B 0%, #0F172A 100%)", // ROI (Deep Dark)
            "radial-gradient(circle at 20% 20%, #F0FDFA 0%, #FFFFFF 100%)", // Efficiency (Eco)
            "radial-gradient(circle at 50% 50%, #F8FAFC 0%, #E2E8F0 100%)", // Gallery (Clean Neutral)
            "radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F8FAFC 100%)", // Footer/End
        ]
    );

    // Анимации для декоративных блобов
    const blob1Opacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 0.4]);
    const blob1Scale = useTransform(scrollYProgress, [0.5, 1], [0.8, 1.5]);
    const blob1X = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    const blob2Opacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 0.3]);
    const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    return (
        <motion.div
            className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
            style={{ background: bgGradient }}
        >
            {/* Анимированные фоновые пятна (Blobs) для глубины */}
            <motion.div
                style={{ opacity: blob1Opacity, scale: blob1Scale, x: blob1X }}
                className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-400/20 blur-[120px] rounded-full"
            />
            <motion.div
                style={{ opacity: blob2Opacity, y: blob2Y }}
                className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-emerald-400/20 blur-[120px] rounded-full"
            />

            {/* Старые добрые волны, адаптированные под скролл */}
            <motion.svg
                style={{
                    y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]),
                    rotate: useTransform(scrollYProgress, [0, 1], [0, 10])
                }}
                className="absolute top-[-5%] left-[-5%] w-[110%] h-auto opacity-[0.05] drop-shadow-2xl"
                viewBox="0 0 1440 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="url(#gradient-wave-1)"
                    d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,218.7C672,235,768,213,864,181.3C960,149,1056,107,1152,106.7C1248,107,1344,149,1392,170.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                />
                <defs>
                    <linearGradient id="gradient-wave-1" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>
                </defs>
            </motion.svg>

            {/* Декоративная линия градиента */}
            <motion.div
                className="absolute right-[5%] top-0 w-[1px] bg-gradient-to-b from-transparent via-brand-graphite/10 to-transparent"
                style={{
                    height: useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]),
                    opacity: useTransform(scrollYProgress, [0, 0.7], [1, 0])
                }}
            />
        </motion.div>
    );
};

