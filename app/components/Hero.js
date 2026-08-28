"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { t, isRTL } = useLanguage();

  // Animation variants for staggered text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section
      id="home"
      className="relative w-full h-[90vh] min-h-[750px] max-h-[1050px] bg-[var(--bg-hero)] text-white overflow-hidden flex items-center pt-24 pb-12"
    >
      {/* Background with subtle ambient lighting & slow scale animation */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <Image
          src="/backg.png"
          alt="جهة الداخلة وادي الذهب"
          fill
          className="object-cover object-center opacity-30 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-hero)] via-[var(--bg-hero)]/85 to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full relative z-10 h-full">

        {/* Main Grid: Typography only */}
        <div className="grid lg:grid-cols-12 gap-8 items-center h-full">

          {/* Typography & Stats Column - Using translate-y to physically push it down */}
          <motion.div
            className={`lg:col-span-7 ${isRTL ? "text-right" : "text-left"} space-y-6 sm:space-y-8 z-20 translate-y-8 sm:translate-y-16 lg:translate-y-20`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >

            {/* Party Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <div className="w-5 h-5 rounded-full bg-white p-0.5 overflow-hidden flex items-center justify-center">
                <Image src="/logo2.png" alt="PAM" width={20} height={20} className="object-contain" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-amber-300">
                {isRTL ? "الخطاط ينجى — حزب الأصالة والمعاصرة (PAM)" : "El Khattat Yenja — Parti PAM"}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black tracking-tight leading-[1.1] text-white drop-shadow-lg relative z-20">
              {isRTL ? (
                <>
                  <span className="block">أفعال حقيقية في الميدان</span>
                  <span className="gold-text block mt-2">من أجل مستقبل الداخلة</span>
                </>
              ) : (
                <>
                  <span className="block">Des actions sur le terrain</span>
                  <span className="gold-text block mt-2">pour l'avenir de Dakhla</span>
                </>
              )}
            </motion.h1>

            {/* Bottom Subtitle Descriptor */}
            <motion.p variants={itemVariants} className="hidden md:block text-sm md:text-base text-slate-300 max-w-lg leading-relaxed pt-2 relative z-20">
              {isRTL
                ? "رؤية تنموية طموحة ومشاريع مهيكلة تضع ساكنة الداخلة وادي الذهب في قلب الأولويات بكل مسؤولية ووفاء."
                : "Une vision de développement claire et des projets structurants pour la région Dakhla-Oued Ed-Dahab."}
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4 relative z-20">
              <a
                href="https://www.facebook.com/profile.php?id=61593182381752"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 rounded-2xl bg-[#1877F2] overflow-hidden text-white text-sm md:text-base font-black transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 shadow-[0_10px_40px_-10px_rgba(24,119,242,0.6)] hover:shadow-[0_20px_50px_-15px_rgba(24,119,242,0.8)]"
                style={{ padding: '12px 32px' }}
              >
                {/* Sweeping Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                {/* Inner Glow Ring */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20 group-hover:ring-white/40 transition-colors" />

                <svg className="relative w-6 h-6 fill-current drop-shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="relative drop-shadow-md">{isRTL ? "متابعة الصفحة على فيسبوك" : "Suivre sur Facebook"}</span>
              </a>

              <a href="#services" className="btn-outline">
                <span>{isRTL ? "استكشف محاور العمل" : "Découvrir les Axes"}</span>
              </a>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* ABSOLUTELY POSITIONED CANDIDATE CUTOUT */}
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute ${isRTL ? 'left-[-35%] sm:left-[-5%] lg:left-0' : 'right-[-35%] sm:right-[-5%] lg:right-0'} bottom-10 sm:bottom-0 w-[140%] sm:w-[90%] lg:w-[900px] xl:w-[1000px] h-[65vh] sm:h-[75vh] min-h-[450px] sm:min-h-[500px] lg:h-[90vh] pointer-events-none z-[5] opacity-100`}
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
        }}
      >
        <Image
          src="/yenja.png"
          alt="الخطاط ينجى - El Khattat Yenja"
          fill
          sizes="(max-width: 1024px) 800px, 1200px"
          className="object-contain object-bottom scale-105 drop-shadow-[0_0_50px_rgba(0,0,0,0.6)]"
          priority
        />
      </motion.div>

    </section>
  );
}
