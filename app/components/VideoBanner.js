"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";

export default function VideoBanner() {
  const { t, isRTL } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section
      id="video-banner"
      className="relative min-h-[400px] sm:min-h-[500px] flex items-center justify-center overflow-hidden my-10 sm:my-16 rounded-3xl mx-4 sm:mx-6 lg:mx-auto max-w-7xl shadow-2xl"
    >
      {/* Background Video (Muted Autoplay Loop) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/backg.png"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source
          src="/WhatsApp Video 2026-08-25 at 22.37.07.mp4"
          type="video/mp4"
        />
      </video>

      {/* Always Dark Overlay for Cinematic Feel & Text Readability */}
      <div className="absolute inset-0 bg-[#040914]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#040914] via-transparent to-[#040914]/50" />

      {/* Content on top of Background Video */}
      <motion.div 
        className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-4xl text-center space-y-6 sm:space-y-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        

        {/* Subtitle (formerly badge) */}
        <motion.div variants={itemVariants} className="text-accent font-black tracking-widest uppercase text-sm mb-4">
          {isRTL ? "رسالة الميدان والتنمية" : "Message de Terrain & Vision"}
        </motion.div>

        {/* Powerful Quote / Headline */}
        <motion.h2 variants={itemVariants} className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
          <span className="gold-text block mb-2">
            {isRTL ? "«خدمة ساكنة الداخلة شرف وأمانة»" : "« Servir Dakhla est un Honneur »"}
          </span>
          <span className="text-base sm:text-xl lg:text-2xl font-bold text-slate-200">
            {isRTL
              ? "مواصلة تنزيل المشاريع المهيكلة لتعزيز ريادة جهة الداخلة وادي الذهب"
              : "Poursuivre les projets structurants pour le rayonnement de Dakhla-Oued Ed-Dahab"}
          </span>
        </motion.h2>

        <motion.p variants={itemVariants} className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {isRTL
            ? "العمل الميداني اليومي، القرب من المواطنين، وتحقيق تطلعات الساكنة هي البوصلة الحقيقية التي توجه كل خطوة في مسيرة البناء والتنمية."
            : "L'action de terrain quotidienne et la proximité avec les citoyens constituent la boussole guidant chaque initiative de développement."}
        </motion.p>

      </motion.div>
    </section>
  );
}
