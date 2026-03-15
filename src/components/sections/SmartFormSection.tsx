"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SolarPanel,
    ThermometerSun,
    CircuitBoard,
    Sparkles,
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    Shield,
    Battery,
    Cpu,
    Zap,
    Wind,
    Loader2,
    Mail,
    User,
    Phone,
    MapPin
} from "lucide-react";

interface Answer {
    id: number;
    answer_text: string;
}

interface Question {
    id: number;
    question_text: string;
    field_type: "radio" | "text" | "checkbox" | "slider";
    answers: Answer[];
    config?: any;
    unit?: string;
}

interface SubCategory {
    id: number;
    name: string;
    description: string;
    questions: Question[];
}

interface APICategory {
    id: number;
    name: string;
    description: string;
    icon?: string;
    subcategories: SubCategory[];
}

interface UICategory {
    id: number;
    title: string;
    icon: React.ReactNode;
    color: string;
    apiData: APICategory;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://admin.empire-premium.de/api/v1";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const iconMap: Record<string, React.ReactNode> = {
    "Photovoltaik (PV)": <SolarPanel className="w-8 h-8" />,
    "Wärmepumpe (WP)": <ThermometerSun className="w-8 h-8" />,
    "Elektroinstallation": <Zap className="w-8 h-8" />,
    "Sanitär & Heizung": <Sparkles className="w-8 h-8" />,
    "Dach & Fassade": <SolarPanel className="w-8 h-8" />,
    "Maler & Trockenbau": <Sparkles className="w-8 h-8" />,
    "Garten & Landschaftsbau": <Sparkles className="w-8 h-8" />,
    "Innenausbau": <Sparkles className="w-8 h-8" />,
};

const colorMap: Record<string, string> = {
    "Photovoltaik (PV)": "from-amber-400 to-orange-600",
    "Wärmepumpe (WP)": "from-cyan-400 to-blue-600",
    "Elektroinstallation": "from-indigo-400 to-purple-600",
    "Sanitär & Heizung": "from-blue-400 to-indigo-600",
    "Dach & Fassade": "from-orange-400 to-red-600",
    "Maler & Trockenbau": "from-emerald-400 to-teal-600",
    "Garten & Landschaftsbau": "from-green-400 to-emerald-600",
    "Innenausbau": "from-rose-400 to-pink-600",
};

export const SmartFormSection = () => {
    const [categories, setCategories] = useState<UICategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<UICategory | null>(null);
    const [step, setStep] = useState<"select" | "questions" | "contact" | "success">("select");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, any>>({});
    const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "", location: "" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/categories`, {
                    headers: { "x-api-key": API_KEY }
                });
                const json = await response.json();
                if (json.status === "success") {
                    // Deduplicate categories by name, keeping the one with subcategories/questions
                    const uniqueMap = new Map<string, APICategory>();
                    json.data.categories.forEach((cat: APICategory) => {
                        const existing = uniqueMap.get(cat.name);
                        if (!existing || (cat.subcategories && cat.subcategories.length > (existing.subcategories?.length || 0))) {
                            uniqueMap.set(cat.name, cat);
                        }
                    });

                    const mapped: UICategory[] = Array.from(uniqueMap.values()).map((cat: APICategory) => ({
                        id: cat.id,
                        title: cat.name,
                        icon: iconMap[cat.name] || <Sparkles className="w-8 h-8" />,
                        color: colorMap[cat.name] || "from-slate-400 to-slate-600",
                        apiData: cat
                    }));
                    setCategories(mapped);
                }
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const questions = selectedCategory?.apiData.subcategories[0]?.questions || [];

    const handleAnswer = (questionId: number, value: any) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setStep("contact");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload = {
                company_id: null,
                title: `Anfrage: ${selectedCategory?.title}`,
                category_id: selectedCategory?.id,
                subcategory_id: selectedCategory?.apiData.subcategories[0]?.id,
                contact_name: contactInfo.name,
                contact_email: contactInfo.email,
                contact_phone: contactInfo.phone,
                location: contactInfo.location,
                source_website: typeof window !== "undefined" ? window.location.origin : "empire-premium-bau.de",
                answers: Object.entries(answers).map(([qId, val]) => ({
                    question_id: parseInt(qId),
                    answer_value: val.toString()
                }))
            };

            const response = await fetch(`${API_BASE_URL}/inquiries`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY 
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setStep("success");
            }
        } catch (err) {
            console.error("Submission failed:", err);
        } finally {
            setSubmitting(false);
        }
    };

    const reset = () => {
        setSelectedCategory(null);
        setStep("select");
        setCurrentQuestionIndex(0);
        setAnswers({});
        setContactInfo({ name: "", email: "", phone: "", location: "" });
    };

    return (
        <section id="smart-form" className="h-screen w-full snap-start relative flex flex-col items-center justify-center px-6 overflow-hidden bg-[#f8fafc]">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-50 rounded-full blur-3xl opacity-30" />

            <div className="max-w-4xl w-full z-10">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div key="loading" className="flex flex-col items-center py-20">
                            <Loader2 className="w-12 h-12 text-slate-400 animate-spin mb-4" />
                            <p className="text-slate-500 font-medium">Lade Konfigurationsdaten...</p>
                        </motion.div>
                    ) : step === "select" ? (
                        <motion.div key="select" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2 md:mb-4 font-display">Wählen Sie Ihre Services</h2>
                                <p className="text-sm md:text-lg text-slate-600 max-w-2xl mx-auto">Stellen Sie Ihr individuelles Paket für Ihr intelligentes Zuhause zusammen</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 md:gap-8">
                                {categories.map((cat) => (
                                    <motion.button
                                        key={cat.id}
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setStep("questions");
                                        }}
                                        className="group relative h-40 md:h-64 bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-[2rem] p-6 text-left shadow-lg flex flex-col items-center text-center overflow-hidden"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-[0.05] transition-opacity`} />
                                        <div className="relative mb-4 p-4 bg-white shadow-md rounded-2xl group-hover:scale-110 transition-transform">
                                            {cat.icon}
                                        </div>
                                        <h3 className="text-sm md:text-xl font-black text-slate-800">{cat.title}</h3>
                                        <div className="mt-auto flex items-center justify-center w-full py-2 bg-slate-900/5 rounded-xl text-slate-600 font-bold group-hover:bg-slate-900 group-hover:text-white transition-all text-xs md:text-sm">
                                            Starten <ChevronRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    ) : step === "questions" ? (
                        <motion.div key="questions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
                            <button onClick={reset} className="flex items-center text-slate-400 hover:text-slate-900 mb-8 transition-colors group">
                                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Zurück zur Auswahl
                            </button>

                            <div className="mb-10 text-center">
                                <span className="inline-block px-4 py-1.5 bg-slate-100 rounded-full text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Schritt {currentQuestionIndex + 1} von {questions.length}</span>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{questions[currentQuestionIndex].question_text}</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                                {questions[currentQuestionIndex].answers.map((ans) => (
                                    <button
                                        key={ans.id}
                                        onClick={() => handleAnswer(questions[currentQuestionIndex].id, ans.answer_text)}
                                        className="w-full p-5 bg-white border border-slate-200 rounded-2xl text-left hover:border-slate-900 hover:bg-slate-50 transition-all font-bold text-slate-700 flex justify-between items-center group"
                                    >
                                        {ans.answer_text}
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                                    </button>
                                ))}
                                {questions[currentQuestionIndex].field_type === "slider" && (
                                    <div className="py-8">
                                        <input
                                            type="range"
                                            min={questions[currentQuestionIndex].config?.min || 0}
                                            max={questions[currentQuestionIndex].config?.max || 10000}
                                            step={questions[currentQuestionIndex].config?.step || 100}
                                            onChange={(e) => handleAnswer(questions[currentQuestionIndex].id, e.target.value)}
                                            className="w-full accent-slate-900"
                                        />
                                        <div className="flex justify-between mt-4 text-sm font-bold text-slate-500">
                                            <span>{questions[currentQuestionIndex].config?.min || 0} {questions[currentQuestionIndex].unit}</span>
                                            <span>{questions[currentQuestionIndex].config?.max || 10000} {questions[currentQuestionIndex].unit}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : step === "contact" ? (
                        <motion.div key="contact" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                            <div className="text-center mb-10">
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Fast geschafft!</h3>
                                <p className="text-slate-500">Bitte teilen Sie uns Ihre Kontaktdaten mit, damit wir Ihnen ein unverbindliches Angebot erstellen können.</p>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input required placeholder="Vollständiger Name" value={contactInfo.name} onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input required type="email" placeholder="E-Mail Adresse" value={contactInfo.email} onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input required placeholder="Telefonnummer" value={contactInfo.phone} onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                                    </div>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input placeholder="PLZ / Ort" value={contactInfo.location} onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                                    </div>
                                </div>
                                <button disabled={submitting} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl active:scale-[0.98] disabled:opacity-50">
                                    {submitting ? "Sende Anfrage..." : "Angebot anfordern"}
                                </button>
                                <button type="button" onClick={() => setStep("questions")} className="w-full text-slate-400 text-sm hover:text-slate-900 transition-colors">Zurück zu den Fragen</button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] p-12 md:p-20 shadow-2xl text-center">
                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <CheckCircle2 className="w-12 h-12" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Anfrage gesendet!</h3>
                            <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto">Vielen Dank für Ihr Vertrauen. Ein Experte von Empire Premium wird Ihre Daten prüfen und sich innerhalb von 24 Stunden bei Ihnen melden.</p>
                            <button onClick={reset} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl">Schließen</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
