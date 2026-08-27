"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const { t, isRTL } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const services = [
    {
      style: "card-white",
      tag_ar: "المحور الأول • البنية التحتية",
      tag_fr: "Axe 1 • Infrastructures",
      title_ar: "تحديث شبكة الطرق والمرافق الحضرية",
      title_fr: "Modernisation des Routes & Équipements",
      desc_ar: "تأهيل البنيات التحتية الأساسية وتطوير المحاور الطرقية لربط أحياء الداخلة والمراكز الاقتصادية برؤية عصرية مستدامة.",
      desc_fr: "Développement des axes routiers et modernisation des équipements urbains pour fluidifier la mobilité et stimuler l'économie.",
    },
    {
      style: "card-blue",
      tag_ar: "المحور الثاني • الاقتصاد البحري",
      tag_fr: "Axe 2 • Économie Bleue",
      title_ar: "دعم مهنيي الصيد والمقاولات الصغرى",
      title_fr: "Appui à la Pêche & Entrepreneuriat",
      desc_ar: "مبادرات نوعية لتمكين مهنيي الصيد التقليدي وتشجيع الشباب حاملي المشاريع والتعاونيات لخلق دينامية اقتصادية واعدة بالجهة.",
      desc_fr: "Programmes ciblés pour moderniser la pêche artisanale et encourager les coopératives et TPE créatrices d'emplois durables.",
    },
    {
      style: "card-navy",
      tag_ar: "المحور الثالث • العمل التضامني",
      tag_fr: "Axe 3 • Action Sociale",
      title_ar: "دعم التمدرس والتضامن الإنساني المستمر",
      title_fr: "Soutien Scolaire & Solidarité Humaine",
      desc_ar: "دعم التمدرس ومحاربة الهدر المدرسي، وإطلاق قوافل اجتماعية وطبية متواصلة تلامس الاحتياجات اليومية للأسر والناشئة.",
      desc_fr: "Caravanes médicales, bourses d'études et actions solidaires continues au service des familles vulnérables et des jeunes talents.",
    },
  ];

  return (
    <section id="services" className="section-spacious bg-gradient-to-b from-[var(--bg-main)] via-[var(--bg-surface)] to-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header (Matching Reference: Small Tag + Big Clean Title) */}
        <motion.div 
          className="text-center mb-16 sm:mb-24 space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span variants={itemVariants} className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-accent block">
            {isRTL ? "مجالات العمل والمبادرات" : "DOMAINES D'ACTION & IMPACT"}
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)]">
            {isRTL ? "مكرسون لخدمة ساكنة الداخلة دائماً" : "Dédiés au service des citoyens toujours"}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {isRTL
              ? "ثلاث ركائز استراتيجية توجه كافة البرامج والمشاريع الميدانية لضمان ازدهار جهة الداخلة وادي الذهب."
              : "Trois piliers stratégiques qui guident l'ensemble des programmes de développement dans la région."}
          </motion.p>
        </motion.div>

        {/* 3 Signature Cards (Matching Reference: White, Blue, Dark Navy) with GENEROUS INTERNAL PADDING */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 lg:gap-10 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((srv, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`${srv.style} p-8 sm:p-10 lg:p-12 rounded-[32px] flex flex-col justify-between transition-all duration-300 shadow-xl min-h-[420px] hover:shadow-2xl hover:shadow-accent/10`}
            >
              {/* Top Subtitle & Big Bold Title with generous vertical gap */}
              <div className="space-y-5 pt-2">
                <span className="text-xs sm:text-sm font-bold opacity-75 uppercase tracking-wider block">
                  {isRTL ? srv.tag_ar : srv.tag_fr}
                </span>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black leading-snug tracking-tight">
                  {isRTL ? srv.title_ar : srv.title_fr}
                </h3>
              </div>

              {/* Divider & Description with generous top margin */}
              <div className="pt-8 mt-auto">
                <div className="w-16 h-1 bg-current opacity-30 mb-6 rounded-full" />
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  {isRTL ? srv.desc_ar : srv.desc_fr}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
