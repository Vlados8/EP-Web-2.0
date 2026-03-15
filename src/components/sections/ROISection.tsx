import { motion } from "framer-motion";
import { TrendingUp, Home, Clock } from "lucide-react";

export const ROISection = () => {
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="relative w-full h-screen snap-start snap-always flex items-center justify-center bg-brand-graphite text-white overflow-hidden">
            {/* Анимированный фон (сетка или частицы) */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 pointer-events-none"
            >
                <motion.div
                    animate={{
                        backgroundPosition: ["0px 0px", "40px 40px"],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"
                ></motion.div>
            </motion.div>

            <div className="max-w-6xl w-full px-6 flex flex-col items-center relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-6xl font-black mb-2 md:mb-6 tracking-tight"
                >
                    Finanzielle <span className="text-brand-accent">Sicherheit</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-6 md:mb-16"
                >
                    Investieren Sie in den Wert und die Effizienz Ihrer Immobilie
                </motion.p>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: {
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 w-full"
                >
                    {/* Stat Card 1 */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group text-left"
                    >
                        <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 group-hover:scale-125 transition-transform">
                            <TrendingUp size={48} className="md:w-16 md:h-16" />
                        </div>
                        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-sm mb-2 md:mb-4">Amortisation</h3>
                        <div className="text-4xl md:text-6xl font-black text-white mb-1 md:mb-2 tracking-tighter">5-7</div>
                        <div className="text-brand-accent text-base md:text-xl font-bold">Jahre</div>
                    </motion.div>

                    {/* Stat Card 2 */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group border-brand-accent/30 text-left"
                    >
                        <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 group-hover:scale-125 transition-transform text-brand-accent">
                            <Home size={48} className="md:w-16 md:h-16" />
                        </div>
                        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-sm mb-2 md:mb-4">Werterhalt</h3>
                        <div className="text-4xl md:text-6xl font-black text-white mb-1 md:mb-2 tracking-tighter">+25%</div>
                        <div className="text-brand-accent text-base md:text-xl font-bold">Marktanstieg</div>
                    </motion.div>

                    {/* Stat Card 3 */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group text-left"
                    >
                        <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 group-hover:scale-125 transition-transform">
                            <Clock size={48} className="md:w-16 md:h-16" />
                        </div>
                        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-sm mb-2 md:mb-4">Ersparnis</h3>
                        <div className="text-4xl md:text-6xl font-black text-white mb-1 md:mb-2 tracking-tighter">90%</div>
                        <div className="text-brand-accent text-base md:text-xl font-bold">bis zu</div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
