import { motion } from "framer-motion";
import { CheckCircle, Leaf } from "lucide-react";

export const EfficiencySection = () => {
    return (
        <section className="relative w-full h-screen snap-start snap-always flex items-center justify-center bg-slate-50 text-slate-900 overflow-hidden">
            <div className="max-w-6xl w-full px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-6 font-display">
                    Maximale <span className="text-green-600">Effizienz</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 items-center">
                    <div className="bg-white p-5 md:p-8 rounded-3xl shadow-xl border border-slate-100">
                        <div className="flex justify-between items-end mb-4 md:mb-8">
                            <div>
                                <h3 className="text-slate-400 font-bold uppercase text-[10px] md:text-xs mb-0.5 md:mb-1">CO₂-Reduzierung pro Jahr</h3>
                                <div className="text-2xl md:text-4xl font-black text-slate-900">12.5 <span className="text-green-600 text-base md:text-xl">Tonnen</span></div>
                            </div>
                            <Leaf className="text-green-500 w-8 h-8 md:w-10 md:h-10 mb-1" />
                        </div>

                        <div className="space-y-3 md:space-y-4">
                            {[
                                { label: "Standard-Haus", val: 100, color: "bg-slate-200" },
                                { label: "Empire Premium Haus", val: 15, color: "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]" }
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-[10px] md:text-xs font-bold mb-1 uppercase tracking-tighter">
                                        <span>{item.label}</span>
                                        <span>{item.val}% Verbrauch</span>
                                    </div>
                                    <div className="h-3 md:h-4 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.val}%` }}
                                            transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                                            className={`h-full ${item.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3 md:space-y-6">
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800">Ihre Vorteile</h3>
                        <div className="grid grid-cols-1 gap-2 md:gap-4">
                            {[
                                "Energieautarkie-Garantie",
                                "Bosch zertifizierter Partner",
                                "Vollständige KfW-Förderung",
                                "10 Jahre Systemgarantie"
                            ].map((text, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3 bg-white/50 p-2.5 md:p-4 rounded-2xl border border-slate-200/50 hover:bg-white transition-colors cursor-default"
                                >
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle size={18} />
                                    </div>
                                    <span className="font-semibold text-slate-700 text-sm md:text-base">{text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
