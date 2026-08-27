"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const { t, lang, toggleLang, theme, toggleTheme, isDark, isRTL, mounted } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { key: "nav_home", label_ar: "الرئيسية", label_fr: "Accueil", href: "/#home" },
    { key: "nav_services", label_ar: "محاور التنمية", label_fr: "Piliers d'Action", href: "/#services" },
    { key: "nav_video", label_ar: "رسالة الميدان", label_fr: "Message de Terrain", href: "/#video-banner" },
    { key: "nav_posts", label_ar: "منشورات الجريدة", label_fr: "Publications", href: "/posts" },
    { key: "nav_facebook", label_ar: "المجتمع والصفحة", label_fr: "Communauté", href: "/#facebook" },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060D1A]/95 backdrop-blur-2xl shadow-xl shadow-black/20 py-3 border-b border-white/5"
          : "bg-gradient-to-b from-black/60 to-transparent py-4 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* PAM Logo & Candidate Title - BIGGER & PROMINENT */}
          <motion.div variants={itemVariants}>
            <Link href="/" className="flex items-center gap-3.5 group flex-shrink-0">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1.5 shadow-lg border-2 border-accent group-hover:border-accent-light group-hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo2.png"
                  alt="حزب الأصالة والمعاصرة - PAM"
                  width={80}
                  height={80}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl sm:text-2xl md:text-3xl tracking-tight text-white group-hover:text-accent transition-colors">
                    {isRTL ? "الخطاط ينجى" : "El Khattat Yenja"}
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-black bg-accent/20 text-accent border border-accent/30">
                    PAM
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-slate-300 font-bold">
                  {isRTL ? "جهة الداخلة – وادي الذهب" : "Région Dakhla – Oued Ed-Dahab"}
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <motion.a
                variants={itemVariants}
                key={link.key}
                href={link.href}
                className="px-4 py-2.5 text-sm font-extrabold text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-xl"
              >
                {isRTL ? link.label_ar : link.label_fr}
              </motion.a>
            ))}
          </nav>

          {/* Action Controls: Premium Toggles + FB */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            
            {/* Sleek Language Toggle (Segmented Pill) */}
            <div className="flex items-center bg-white/10 border border-white/10 rounded-full backdrop-blur-md overflow-hidden p-0.5">
              <button
                onClick={() => lang !== "ar" && toggleLang()}
                className={`w-10 h-8 flex items-center justify-center rounded-full text-xs font-black transition-all duration-300 ${
                  lang === "ar" ? "bg-accent text-[#070F1E] shadow-md" : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                AR
              </button>
              <button
                onClick={() => lang !== "fr" && toggleLang()}
                className={`w-10 h-8 flex items-center justify-center rounded-full text-xs font-black transition-all duration-300 ${
                  lang === "fr" ? "bg-accent text-[#070F1E] shadow-md" : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                FR
              </button>
            </div>

            {/* Sleek Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all duration-300 backdrop-blur-md flex items-center justify-center"
                title={isDark ? "Light Mode" : "Dark Mode"}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-indigo-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            )}

            {/* Removed Facebook CTA Button per user request */}

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-full bg-white/10 border border-white/10 text-white hover:text-accent transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </motion.div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-[500px] opacity-100 mt-4 pb-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#060D1A]/95 backdrop-blur-xl rounded-3xl p-5 space-y-2 border border-white/10 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-bold text-slate-200 hover:text-accent hover:bg-white/5 transition-colors rounded-xl"
              >
                {isRTL ? link.label_ar : link.label_fr}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="https://www.facebook.com/profile.php?id=61593182381752"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-[#1877F2] text-white text-sm font-black shadow-md"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>{isRTL ? "متابعة الصفحة على فيسبوك" : "Suivre sur Facebook"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
