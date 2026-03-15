"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ImpressumPage() {
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
                    <h1 className="text-4xl font-black mb-8 tracking-tight">Impressum</h1>

                    <section className="space-y-8 text-slate-600 leading-relaxed">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Angaben gemäß § 5 TMG</h2>
                            <p>
                                Empire Premium Bau GmbH<br />
                                Hastedter Heerstraße 63<br />
                                28207 Bremen<br />
                                Deutschland
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Vertreten durch</h2>
                            <p>Arkadi Saribekian (Geschäftsführer)</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Kontakt</h2>
                            <p>
                                Telefon: +49 17661951823<br />
                                E-Mail: info@empire-premium-bau.de
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Registereintrag</h2>
                            <p>
                                Eintragung im Handelsregister.<br />
                                Registergericht: Amtsgericht Bremen<br />
                                Registernummer: HRB 40235
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Umsatzsteuer-ID</h2>
                            <p>
                                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                                DE123456789
                            </p>
                        </div>

                        <div className="pt-8 border-t border-slate-100 italic text-sm">
                            <p>Haftungsausschluss: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
                        </div>
                    </section>
                </motion.div>
            </div>
        </main>
    );
}
