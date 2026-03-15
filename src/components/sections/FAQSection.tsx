"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Wie viel kostet eine Photovoltaikanlage bei Empire Premium Bau?",
        answer: "Die Kosten hängen von der Größe der Anlage и den gewählten Komponenten ab. Eine durchschnittliche Anlage amortisiert sich jedoch bereits nach 5 bis 7 Jahren. Kontaktieren Sie uns für ein präzises Angebot."
    },
    {
        question: "Bieten Sie auch staatliche Förderungen für Wärmepumpen an?",
        answer: "Ja, wir unterstützen Sie vollumfänglich bei der Beantragung von BAFA- und KfW-Förderungen. Aktuell sind bis zu 70% Förderung für moderne Wärmepumpen-Systeme möglich."
    },
    {
        question: "Wie lange dauert die Installation einer Solaranlage?",
        answer: "In der Regel benötigen wir für die reine Montage auf dem Dach nur 1-2 Tage. Die gesamte Projektabwicklung inklusive Netzanschluss dauert meist 4 bis 8 Wochen."
    },
    {
        question: "Welche Marken verwenden Sie für Ihre Projekte?",
        answer: "Wir setzen auf Premium-Qualität und arbeiten eng mit zertifizierten Partnern wie FOX ESS, Bosch und anderen Marktführern zusammen, um maximale Langlebigkeit zu garantieren."
    }
];

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Schema.org JSON-LD for FAQ
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <section id="faq" className="w-full py-24 bg-slate-50 relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Häufig gestellte <span className="text-brand-accent">Fragen</span></h2>
                    <p className="text-slate-500 text-lg">Alles, was Sie über unsere Energie-Lösungen wissen müssen.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <h3 className="text-lg font-bold text-slate-800 pr-8">{faq.question}</h3>
                                {openIndex === index ? (
                                    <Minus className="w-5 h-5 text-brand-accent shrink-0" />
                                ) : (
                                    <Plus className="w-5 h-5 text-slate-400 shrink-0" />
                                )}
                            </button>
                            <motion.div
                                initial={false}
                                animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
