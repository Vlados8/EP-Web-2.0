"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DatenschutzPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-brand-accent hover:underline mb-12 font-bold">
                    <ArrowLeft size={20} />
                    Zurück zur Startseite
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-slate-200"
                >
                    <h1 className="text-4xl font-black mb-8 tracking-tight">Datenschutzerklärung</h1>

                    <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Datenschutz auf einen Blick</h2>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Allgemeine Hinweise</h3>
                            <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Datenerfassung auf dieser Website</h2>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
                            <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
                            <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Hosting</h2>
                            <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
                            <p><strong>Vercel Inc.</strong><br />440 N Barranca Ave #4133<br />Covina, CA 91723</p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
