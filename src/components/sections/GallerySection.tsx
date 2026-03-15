import { motion } from "framer-motion";

const projects = [
    {
        title: "Villa Lumina",
        description: "Nachhaltiges Design mit maximaler Solarenergie-Integration.",
        image: "/projects/exterior.png",
        category: "Exterieur"
    },
    {
        title: "Modern Zen",
        description: "Minimalistisches Interieur mit intelligenter Lichtsteuerung.",
        image: "/projects/interior.png",
        category: "Interieur"
    }
];

export const GallerySection = () => {
    return (
        <section id="gallery" className="relative w-full h-screen snap-start snap-always flex items-center justify-center bg-white overflow-hidden py-16 md:py-24">
            <div className="max-w-7xl w-full px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-12 gap-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-6xl font-black text-slate-900 tracking-tight"
                        >
                            Unsere <span className="text-brand-accent">Projekte</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-sm md:text-xl text-slate-500 md:mt-4 max-w-xl"
                        >
                            Exzellenz in jedem Detail — entdecken Sie unsere neuesten Realisierungen.
                        </motion.p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative h-[220px] md:h-[500px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl"
                        >
                            {/* Image Background */}
                            <motion.img
                                src={project.image}
                                alt={`Empire Premium Bau Projekt: ${project.title} - ${project.description}`}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                            {/* Content */}
                            <div className="absolute inset-0 p-5 md:p-10 flex flex-col justify-end text-white">
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + index * 0.2 }}
                                    className="text-brand-accent font-bold uppercase tracking-widest text-[10px] md:text-sm mb-1"
                                >
                                    {project.category}
                                </motion.span>
                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.2 }}
                                    className="text-lg md:text-4xl font-black mb-1 md:mb-3"
                                >
                                    {project.title}
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.2 }}
                                    className="text-slate-300 text-xs md:text-lg max-w-md"
                                >
                                    {project.description}
                                </motion.p>
                            </div>

                            {/* Hover Border Effect */}
                            <div className="absolute inset-0 border-[1px] border-white/20 group-hover:border-brand-accent/50 transition-colors duration-500 rounded-[1.5rem] md:rounded-[2.5rem] pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
