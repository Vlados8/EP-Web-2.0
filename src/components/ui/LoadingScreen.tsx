"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900"
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        filter: "blur(20px)",
                        transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                >
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-accent/20 blur-[80px] md:blur-[120px] rounded-full" />

                    <motion.div
                        className="relative z-10 flex flex-col items-center gap-4 md:gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* 2D Logo Container */}
                        <motion.div
                            className="relative w-32 h-32 md:w-48 md:h-48"
                            animate={{
                                scale: [1, 1.05, 1],
                                rotateY: [0, 180, 360]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Image
                                src="/logo-icon.png"
                                alt="Empire Premium Logo"
                                fill
                                className="object-contain"
                                style={{ filter: "brightness(0) invert(1)" }}
                                priority
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="flex flex-col items-center"
                        >
                            <h1 className="text-2xl md:text-3xl font-black text-white tracking-[0.2em] md:tracking-[0.3em] uppercase">
                                EMPIRE<span className="text-brand-accent">PREMIUM</span>
                            </h1>
                            <div className="w-32 md:w-48 h-[2px] bg-white/10 mt-4 overflow-hidden relative">
                                <motion.div
                                    className="absolute inset-0 bg-brand-accent"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Footer text */}
                    <motion.div
                        className="absolute bottom-12 text-slate-500 text-[10px] md:text-xs font-medium tracking-widest uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        Exzellenz in Energie
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
