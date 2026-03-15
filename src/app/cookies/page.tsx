"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CookiesPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-brand-accent hover:underline mb-12 font-bold">
                    <ArrowLeft size={20} />
                    Zurück zur Startseite
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-slate-200"
                >
                    <h1 className="text-4xl font-black mb-8 tracking-tight">Cookie-Richtlinie</h1>

                    <section className="space-y-6 text-slate-600 leading-relaxed">
                        <p>Diese Website verwendet Cookies, um die Benutzererfahrung zu verbessern und bestimmte Funktionen bereitzustellen.</p>

                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Was sind Cookies?</h2>
                            <p>Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Sie dienen dazu, die Nutzung der Website komfortabler zu gestalten oder bestimmte Analysen zu ermöglichen.</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Arten von Cookies</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Notwendige Cookies:</strong> Diese sind für den Betrieb der Website technisch erforderlich.</li>
                                <li><strong>Analyse-Cookies:</strong> Helfen uns zu verstehen, wie Besucher mit der Website interagieren.</li>
                            </ul>
                        </div>
                    </section>
                </motion.div>
            </div>
        </main>
    );
}
