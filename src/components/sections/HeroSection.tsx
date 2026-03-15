"use client";

import { motion } from "framer-motion";

export const HeroSection = () => {
    return (
        <section className="relative w-full h-screen snap-start snap-always flex items-center justify-center pointer-events-none">
            <div className="absolute top-[25%] md:top-[30%] left-6 md:left-[15%] max-w-[280px] sm:max-w-md md:max-w-xl z-20">
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-7xl font-bold text-brand-graphite leading-[1.1]"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    Die Zukunft der <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-200">
                        Energieeffizienz
                    </span>
                </motion.h1>
                <motion.p
                    className="mt-4 md:mt-6 text-base md:text-xl text-brand-graphite/80 max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    Exklusive Lösungen für Photovoltaik, Wärmepumpen und Innenausbau. Wir gestalten die Energie-Zukunft Ihres Zuhauses – hocheffizient, nachhaltig und wertsteigernd.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.6 }}
                    className="mt-10 pointer-events-auto"
                >
                    <a
                        href="#smart-form"
                        className="inline-block bg-brand-accent text-brand-graphite px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)]"
                    >
                        Anfrage stellen
                    </a>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <span className="text-brand-graphite text-xs uppercase tracking-widest mb-2">Scrollen</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-brand-accent to-transparent"></div>
            </motion.div>
        </section>
    );
};
