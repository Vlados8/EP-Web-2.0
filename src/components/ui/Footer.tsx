import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, MapPin, Phone, CheckCircle2, User, MessageSquare } from "lucide-react";

export const Footer = () => {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Empire Premium Bau GmbH",
        "image": "https://empire-premium-bau.de/logo.png",
        "@id": "https://empire-premium-bau.de",
        "url": "https://empire-premium-bau.de",
        "telephone": "+4917661951823",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Hastedter Heerstraße 63",
            "addressLocality": "Bremen",
            "postalCode": "28207",
            "addressCountry": "DE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 53.0722,
            "longitude": 8.8744
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "08:00",
            "closes": "18:00"
        }
    };

    return (
        <footer id="footer" className="bg-slate-900 border-t border-white/5 text-white py-24 px-6 snap-end relative z-10 overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 relative pointer-events-auto">
                {/* Contact Info */}
                <div className="space-y-12">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 bg-white/10 rounded-2xl p-2 flex items-center justify-center backdrop-blur-xl border border-white/10">
                                <Image
                                    src="/logo-icon.png"
                                    alt="Empire Premium"
                                    fill
                                    className="object-contain p-2"
                                    style={{ filter: "brightness(0) invert(1)" }}
                                />
                            </div>
                            <span className="font-black text-4xl tracking-tight uppercase group">
                                EMPIRE<span className="text-brand-accent group-hover:text-brand-accent/80 transition-colors">PREMIUM</span>
                            </span>
                        </div>
                        <p className="text-slate-400 max-w-md text-xl leading-relaxed font-medium">
                            Premium-Lösungen für Photovoltaik, Wärmepumpen und exklusiven Innenausbau. Wir gestalten die Energie-Zukunft.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-12">
                        <div className="space-y-4">
                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-brand-accent">Zentrale</h4>
                            <div className="flex items-start gap-4 text-slate-300">
                                <MapPin className="w-5 h-5 mt-1 shrink-0 text-brand-accent" />
                                <span className="leading-relaxed">Hastedter Heerstraße 63,<br />28207 Bremen</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-brand-accent">Kontakt</h4>
                            <div className="space-y-3">
                                <a href="tel:+4917661951823" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                                    <Phone className="w-5 h-5 shrink-0 text-brand-accent group-hover:scale-110 transition-transform" />
                                    <span>+49 176 6195 1823</span>
                                </a>
                                <a href="mailto:info@empire-premium-bau.de" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                                    <Mail className="w-5 h-5 shrink-0 text-brand-accent group-hover:scale-110 transition-transform" />
                                    <span>info@empire-premium-bau.de</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-slate-500 font-medium">
                        <div>&copy; {new Date().getFullYear()} Empire Premium Bau GmbH. Alle Rechte vorbehalten.</div>
                        <div className="flex gap-8">
                            <a href="/impressum" className="hover:text-brand-accent transition-colors">Impressum</a>
                            <a href="/datenschutz" className="hover:text-brand-accent transition-colors">Datenschutz</a>
                        </div>
                    </div>
                </div>

                {/* Support Form */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent/20 to-brand-accent/0 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10 shadow-3xl">
                        <div className="mb-10">
                            <h3 className="text-3xl font-black mb-3 flex items-center gap-3">
                                <Send className="w-8 h-8 text-brand-accent" />
                                Support-Anfrage
                            </h3>
                            <p className="text-slate-400 font-medium">Haben Sie eine Frage oder ein Problem? Wir helfen Ihnen sofort.</p>
                        </div>
                        <SupportForm />
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SupportForm = () => {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "Allgemeine Anfrage",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://admin.empire-premium.de/api";
            const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
            
            const response = await fetch(`${API_BASE_URL}/v1/support`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY
                },
                body: JSON.stringify({
                    company_id: null,
                    subject: formData.subject,
                    description: formData.message,
                    client_name: formData.name,
                    client_email: formData.email,
                    client_phone: formData.phone,
                    priority: "normal"
                })
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", subject: "Allgemeine Anfrage", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Support form error:", error);
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
            >
                <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto shadow-inner border border-brand-accent/20">
                    <CheckCircle2 className="w-10 h-10 text-brand-accent" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-3xl font-black">Ticket erstellt!</h4>
                    <p className="text-slate-400 font-medium">Ihre Anfrage wurde registriert. Unsere Experten melden sich schnellstmöglich.</p>
                </div>
                <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all font-bold"
                >
                    Neue Nachricht senden
                </button>
            </motion.div>
        );
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-accent transition-colors" />
                    <input
                        type="text"
                        required
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-slate-800/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none w-full transition-all backdrop-blur-sm"
                    />
                </div>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-accent transition-colors" />
                    <input
                        type="email"
                        required
                        placeholder="E-Mail"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-slate-800/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none w-full transition-all backdrop-blur-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-accent transition-colors" />
                    <input
                        type="tel"
                        placeholder="Telefon (optional)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-slate-800/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none w-full transition-all backdrop-blur-sm"
                    />
                </div>
                <div className="relative group">
                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-accent transition-colors" />
                    <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="bg-slate-800/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none w-full appearance-none transition-all backdrop-blur-sm"
                    >
                        <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
                        <option value="Technischer Defekt">Technischer Defekt</option>
                        <option value="Frage zur PV-Anlage">Frage zur PV-Anlage</option>
                        <option value="Wartung & Service">Wartung & Service</option>
                        <option value="Sonstiges">Sonstiges</option>
                    </select>
                </div>
            </div>

            <textarea
                required
                placeholder="Wie können wir Ihnen helfen?"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-slate-800/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none w-full resize-none transition-all backdrop-blur-sm"
            ></textarea>

            {status === "error" && (
                <p className="text-red-400 text-sm font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    Fehler beim Senden. Bitte versuchen Sie es erneut.
                </p>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full py-5 bg-brand-accent text-slate-900 rounded-2xl font-black text-lg hover:shadow-[0_0_30px_rgba(242,101,34,0.4)] transition-all active:scale-[0.98] disabled:opacity-50 overflow-hidden relative group`}
            >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="relative flex items-center justify-center gap-3">
                    {status === "loading" ? (
                        <>
                            <div className="w-5 h-5 border-3 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                            <span>Wird gesendet...</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            <span>Ticket erstellen</span>
                        </>
                    )}
                </div>
            </button>
        </form>
    );
};
