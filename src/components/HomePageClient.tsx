"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, motion, AnimatePresence, useTransform } from "framer-motion";
import { Header } from "./ui/Header";
import { LoadingScreen } from "./ui/LoadingScreen";
import { Footer } from "./ui/Footer";
import { HeroSection } from "./sections/HeroSection";
import { SolarSection } from "./sections/SolarSection";
import { HeatPumpSection } from "./sections/HeatPumpSection";
import { InteriorSection } from "./sections/InteriorSection";
import { SmartFormSection } from "./sections/SmartFormSection";
import { ROISection } from "./sections/ROISection";
import { EfficiencySection } from "./sections/EfficiencySection";
import { GallerySection } from "./sections/GallerySection";
import { FAQSection } from "./sections/FAQSection";
import { Scene } from "./3d/Scene";
import { Background2D } from "./ui/Background2D";

export const HomePageClient = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [isDetailMode, setIsDetailMode] = useState(false);

    // Слушаем скролл внутри snap-контейнера
    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

    // Scroll-based animations at top-level to comply with Hooks rules
    const detailControlsOpacity = useTransform(scrollYProgress, [0.47, 0.48], [1, 0]);
    const detailControlsPointerEvents = useTransform(scrollYProgress, (v: any) => v > 0.48 ? 'none' : 'auto');

    // Auto-exit detail mode if scrolling past the house visibility range
    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            if (latest > 0.48 && isDetailMode) {
                setIsDetailMode(false);
            }
        });
    }, [scrollYProgress, isDetailMode]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500); // 2.5s to match progress bar
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="relative h-screen overflow-hidden font-sans selection:bg-brand-accent selection:text-brand-graphite bg-brand-graphite">
            <AnimatePresence mode="wait">
                {loading && <LoadingScreen key="loader" />}
            </AnimatePresence>

            {/* 2D Фоновые иллюстрации (волны, градиенты), анимируемые по скроллу */}
            <Background2D scrollYProgress={scrollYProgress} />

            <Header />

            {/* Top-Right Toggle Button (Mobile Only) */}
            <AnimatePresence>
                {!loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-24 right-6 z-[100] md:hidden"
                        style={{
                            opacity: detailControlsOpacity,
                            pointerEvents: detailControlsPointerEvents
                        }}
                    >
                        <button
                            onClick={() => setIsDetailMode(!isDetailMode)}
                            className={`px-4 py-2 rounded-full font-bold text-xs transition-all shadow-xl border ${isDetailMode
                                ? 'bg-brand-accent text-brand-graphite border-brand-accent'
                                : 'bg-white text-brand-graphite border-brand-graphite/20'
                                }`}
                        >
                            {isDetailMode ? 'Text zeigen' : 'Haus-Details'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3D Canvas (Fixed background) */}
            <Scene scrollYProgress={scrollYProgress} isDetailMode={isDetailMode} setIsDetailMode={setIsDetailMode} />

            {/* Back to Overview Button (Mobile Only) */}
            <motion.div
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]"
                style={{
                    opacity: detailControlsOpacity,
                    pointerEvents: detailControlsPointerEvents
                }}
            >
                <AnimatePresence>
                    {isDetailMode && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            onClick={() => setIsDetailMode(false)}
                            className="px-6 py-3 bg-white text-brand-graphite border border-brand-graphite/20 rounded-full font-bold shadow-2xl active:scale-95 transition-transform flex items-center gap-2"
                        >
                            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                            Zurück zur Übersicht
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Scrollable Overlay containing the sections with CSS Scroll Snapping */}
            <motion.div
                ref={containerRef}
                animate={{
                    opacity: isDetailMode ? 0 : 1,
                    pointerEvents: isDetailMode ? 'none' : 'auto',
                    filter: isDetailMode ? 'blur(10px)' : 'blur(0px)'
                }}
                transition={{ duration: 0.5 }}
                className={`relative z-10 w-full h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth ${isDetailMode ? 'pointer-events-none invisible' : 'pointer-events-auto'}`}
            >
                <HeroSection />
                <SolarSection />
                <HeatPumpSection />
                <InteriorSection />
                <FAQSection />
                <SmartFormSection />
                <ROISection />
                <EfficiencySection />
                <GallerySection />
                <Footer />
            </motion.div>
        </main>
    );
};
