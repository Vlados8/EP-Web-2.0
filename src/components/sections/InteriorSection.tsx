export const InteriorSection = () => {
    return (
        <section id="interior" className="relative w-full h-screen snap-start snap-always pointer-events-none flex items-center">
            <div className="w-full max-w-7xl mx-auto px-6 flex justify-center lg:justify-end">
                <div className="w-full sm:w-[80%] md:w-1/2 lg:w-1/3 glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden pointer-events-auto">
                    {/* Декоративное теплое свечение */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full"></div>

                    <h2 className="text-3xl md:text-4xl font-bold text-brand-graphite mb-4 relative z-10">
                        Exklusiver Ausbau & <br />
                        <span className="text-orange-500">Smart Living</span>
                    </h2>
                    <p className="text-brand-graphite/80 text-base md:text-lg leading-relaxed relative z-10 mb-6">
                        Wir vereinen handwerkliche Präzision mit intelligenten Wohnkonzepten für gehobene Ansprüche.
                    </p>

                    <div className="space-y-3 relative z-10 mb-8">
                        <div className="bg-brand-graphite/5 border border-brand-graphite/10 p-3 md:p-4 rounded-xl flex items-center gap-4">
                            <div className="w-8 h-8 rounded bg-orange-500/20 text-orange-600 flex items-center justify-center font-bold text-sm shadow-sm">1</div>
                            <div className="text-brand-graphite font-semibold text-sm md:text-base">Maler- & Trockenbau</div>
                        </div>
                        <div className="bg-brand-graphite/5 border border-brand-graphite/10 p-3 md:p-4 rounded-xl flex items-center gap-4">
                            <div className="w-8 h-8 rounded bg-brand-graphite/10 text-brand-graphite flex items-center justify-center font-bold text-sm shadow-sm">2</div>
                            <div className="text-brand-graphite font-semibold text-sm md:text-base">Ganzheitliche Vernetzung</div>
                        </div>
                    </div>

                    <a
                        href="#smart-form"
                        className="relative z-10 inline-flex items-center justify-center w-full py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg active:scale-95 translate-y-0 hover:-translate-y-1 shadow-orange-500/20"
                    >
                        Projekt planen
                    </a>
                </div>
            </div>
        </section>
    );
};
