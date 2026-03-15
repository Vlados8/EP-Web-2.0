"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Solar", href: "#solar" },
        { name: "Heizung", href: "#heat-pump" },
        { name: "Smart Home", href: "#interior" },
        { name: "Galerie", href: "#gallery" },
        { name: "Support", href: "#footer" },
    ];

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "py-3 bg-white/70 backdrop-blur-xl shadow-lg" : "py-6 bg-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
                        <Image
                            src="/logo-icon.png"
                            alt="Empire Premium Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-brand-graphite tracking-tighter leading-none">
                            EMPIRE<span className="text-brand-accent">PREMIUM</span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-graphite/40 font-bold">
                            Exzellenz in Energie
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold text-brand-graphite/70 hover:text-brand-accent transition-colors uppercase tracking-widest"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <a
                        href="tel:+4917661951823"
                        className="hidden md:flex items-center gap-3 bg-brand-graphite text-white px-6 py-3 rounded-full hover:bg-black transition-all shadow-lg hover:shadow-brand-accent/20 active:scale-95 border border-white/10"
                    >
                        <Phone className="w-4 h-4 text-brand-accent" />
                        <span className="text-sm font-bold">+49 176 6195 1823</span>
                    </a>

                    <Link
                        href="#smart-form"
                        className="hidden md:flex items-center gap-3 bg-brand-accent text-brand-graphite px-8 py-3 rounded-full hover:bg-brand-accent/90 transition-all shadow-lg hover:shadow-brand-accent/40 active:scale-95 font-black uppercase tracking-wider text-sm"
                    >
                        Anfrage stellen
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-3 bg-white/50 backdrop-blur-md border border-slate-200 rounded-2xl text-brand-graphite shadow-sm"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="lg:hidden bg-white/90 backdrop-blur-2xl border-b border-slate-200 overflow-hidden"
                    >
                        <nav className="flex flex-col p-8 gap-6">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-2xl font-black text-brand-graphite hover:text-brand-accent transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: (navLinks.length + 1) * 0.1 }}
                                className="pt-6 border-t border-slate-100 flex flex-col gap-4"
                            >
                                <a
                                    href="tel:+4917661951823"
                                    className="flex items-center justify-center gap-3 bg-brand-graphite text-white w-full py-5 rounded-3xl font-bold shadow-xl active:scale-95"
                                >
                                    <Phone className="w-5 h-5 text-brand-accent" />
                                    JETZT ANRUFEN
                                </a>
                                <Link
                                    href="#smart-form"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-center bg-brand-accent text-brand-graphite w-full py-5 rounded-3xl font-black uppercase tracking-wider shadow-xl active:scale-95"
                                >
                                    Anfrage stellen
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};
