export const SolarSection = () => {
    return (
        <section id="solar" className="relative w-full h-screen snap-start snap-always pointer-events-none flex items-center">
            <div className="w-full max-w-7xl mx-auto px-6 flex justify-center lg:justify-end">
                <div className="w-full sm:w-[80%] md:w-1/2 lg:w-1/3 glass-panel p-6 md:p-8 rounded-3xl pointer-events-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-graphite mb-4">
                        Photovoltaik-<span className="text-brand-accent">Exzellenz</span>
                    </h2>
                    <p className="text-brand-graphite/80 text-base md:text-lg leading-relaxed mb-6">
                        Maximale Energie-Autarkie für Ihr Zuhause. Wir installieren hocheffiziente Glas-Glas Module der neuesten Generation für langlebige Erträge und höchste Ästhetik.
                    </p>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center shrink-0">
                            <span className="text-brand-accent font-bold text-lg md:text-xl">-40%</span>
                        </div>
                        <span className="text-brand-graphite text-xs md:text-sm font-medium uppercase tracking-wide">
                            Unabhängigkeit vom Strommarkt
                        </span>
                    </div>

                    <a
                        href="#smart-form"
                        className="inline-flex items-center justify-center w-full py-4 bg-brand-graphite text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg active:scale-95 transition-transform"
                    >
                        Anlage berechnen
                    </a>
                </div>
            </div>
        </section>
    );
};
