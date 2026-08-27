"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TestimonialsSection() {
  const { isRTL } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name_ar: "محمد الشيخ",
      name_fr: "Mohammed Cheikh",
      role_ar: "فاعل جمعوي بمدينة الداخلة",
      role_fr: "Acteur associatif à Dakhla",
      quote_ar: "لقد شهدنا تحولاً جذرياً في وتيرة الإنجاز بفضل المشاريع المهيكلة التي تم إطلاقها. السيد الخطاط ينجى يمثل نموذجاً للمسؤول القريب من هموم المواطنين والملتزم بالوعود.",
      quote_fr: "Nous avons assisté à une transformation radicale grâce aux projets structurants lancés. M. El Khattat Yenja représente le modèle du responsable proche des citoyens.",
    },
    {
      id: 2,
      name_ar: "فاطمة الزهراء",
      name_fr: "Fatima Zahra",
      role_ar: "رئيسة تعاونية حرفية",
      role_fr: "Présidente de coopérative artisanale",
      quote_ar: "الدعم المباشر الذي تلقيناه كنساء حرفيات كان له وقع كبير في تحسين مستوى عيشنا. نحن ممتنون لهذه الرؤية التنموية التي تضع العنصر البشري في صلب اهتماماتها.",
      quote_fr: "Le soutien direct que nous avons reçu en tant qu'artisanes a eu un grand impact. Nous sommes reconnaissants de cette vision qui place l'humain au centre.",
    },
    {
      id: 3,
      name_ar: "عبد الله بيرة",
      name_fr: "Abdellah Bira",
      role_ar: "شاب مقاول",
      role_fr: "Jeune entrepreneur",
      quote_ar: "بفضل البرامج الموجهة للشباب، استطعت إطلاق مشروعي الخاص. الثقة في شباب الجهة وتوفير الدعم اللازم هما مفتاح النجاح الذي نلتمسه اليوم على أرض الواقع.",
      quote_fr: "Grâce aux programmes dédiés aux jeunes, j'ai pu lancer mon projet. La confiance en la jeunesse de la région et le soutien apporté sont la clé du succès.",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[var(--bg-main)]">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs sm:text-sm tracking-widest uppercase mb-4">
            {isRTL ? "شهادات حية" : "Témoignages"}
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight mb-6">
            {isRTL ? "ماذا يقولون عن حصيلة العمل؟" : "Ce qu'ils disent de notre bilan"}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg leading-relaxed">
            {isRTL 
              ? "شهادات من ساكنة الداخلة وادي الذهب تعكس الأثر الملموس للمشاريع والبرامج التنموية على أرض الواقع." 
              : "Des témoignages des habitants reflétant l'impact tangible des projets de développement sur le terrain."}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="group relative p-8 sm:p-10 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Quote Icon */}
              <div className="mb-8">
                <svg className="w-10 h-10 text-accent/40 group-hover:text-accent transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Quote Text */}
              <p className="relative z-10 text-[var(--text-primary)] text-sm sm:text-base leading-loose font-medium mb-8 grow">
                "{isRTL ? testimonial.quote_ar : testimonial.quote_fr}"
              </p>

              {/* Author Info */}
              <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-[var(--border-subtle)]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center shrink-0 border-2 border-[var(--bg-surface)] shadow-md overflow-hidden p-2">
                   <Image src="/logo2.png" alt="Avatar" width={30} height={30} className="object-contain opacity-50 grayscale" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-primary)] text-sm sm:text-base">
                    {isRTL ? testimonial.name_ar : testimonial.name_fr}
                  </h4>
                  <span className="text-[11px] sm:text-xs font-semibold text-accent block mt-0.5 uppercase tracking-wide">
                    {isRTL ? testimonial.role_ar : testimonial.role_fr}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
