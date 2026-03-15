"use client";

import { motion } from "framer-motion";

export const Preloader = () => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-brand-graphite/10 border-t-brand-accent rounded-full animate-spin"></div>
                <motion.p
                    className="mt-6 text-brand-graphite text-sm tracking-widest uppercase font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1,
                    }}
                >
                    Загрузка 3D сцены...
                </motion.p>
            </div>
        </motion.div>
    );
};
