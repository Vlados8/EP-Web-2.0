export const HeatPumpSection = () => {
    return (
        <section id="heat-pump" className="relative w-full h-screen snap-start snap-always pointer-events-none flex items-center">
            <div className="w-full max-w-7xl mx-auto px-6 flex justify-center lg:justify-start">
                <div className="w-full sm:w-[80%] md:w-1/2 lg:w-1/3 glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden pointer-events-auto">
                    {/* Декоративное синее свечение */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full"></div>

                    <h2 className="text-3xl md:text-4xl font-bold text-brand-graphite mb-4 relative z-10">
                        Zukunftssichere <span className="text-blue-500">Heizsysteme</span>
                    </h2>
                    <ul className="text-brand-graphite/80 space-y-4 text-base md:text-lg relative z-10 mb-8 font-medium">
                        <li className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></div>
                            Maximale Effizienz (COP bis 5.0)
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></div>
                            Flüsterleise Außeneinheiten
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></div>
                            Bis zu 70% staatliche Förderung
                        </li>
                    </ul>

                    <a
                        href="#smart-form"
                        className="relative z-10 inline-flex items-center justify-center w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 translate-y-0 hover:-translate-y-1 shadow-blue-500/20"
                    >
                        System wählen
                    </a>
                </div>
            </div>
        </section>
    );
};
