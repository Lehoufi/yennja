"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { key: "nav_home", href: "#home" },
    { key: "nav_impact", href: "#impact" },
    { key: "nav_video", href: "#video" },
    { key: "nav_achievements", href: "#achievements" },
    { key: "nav_news", href: "#news" },
    { key: "nav_facebook", href: "#facebook" },
  ];

  return (
    <footer
      className="relative bg-[var(--bg-main)] border-t border-[var(--border-subtle)] pt-16 sm:pt-20 lg:pt-24 mt-24 transition-colors duration-300"
      style={{ marginTop: '20px', paddingTop: '40px' }}
    >

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Main Brand Info - 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-2.5 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.15)] overflow-hidden flex items-center justify-center flex-shrink-0 group hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] transition-all duration-500">
                <Image src="/logo2.png" alt="PAM Logo" width={90} height={90} className="object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="space-y-1">
                <h3 className="gold-text text-2xl sm:text-3xl font-black tracking-tight">
                  {isRTL ? "الخطاط ينجى" : "El Khattat Yenja"}
                </h3>
                <p className="text-sm sm:text-base font-extrabold text-[var(--text-primary)]">
                  {t("hero_party")}
                </p>
                <p className="text-xs sm:text-sm text-accent/80 font-bold uppercase tracking-widest">
                  {t("edition_region")}
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-lg font-medium">
              {t("footer_desc")}
            </p>

            {/* Quick social badge - USING NEW btn-facebook CLASS FOR BULLETPROOF RENDER */}
            <div className="pt-4 pb-12 flex justify-start" style={{ marginBottom: '2rem' }}>
              <a
                href="https://www.facebook.com/profile.php?id=61593182381752"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-facebook"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>{isRTL ? "متابعة الصفحة الرسمية" : "Suivre la page officielle"}</span>
              </a>
            </div>
          </div>

          {/* Quick Links - 3 cols */}
          <div className="lg:col-span-3 lg:px-6">
            <h4 className="text-accent font-black text-sm mb-6 uppercase tracking-[0.2em] opacity-90">
              {t("footer_links")}
            </h4>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold transition-all duration-300 inline-flex items-center gap-3 group w-fit"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] group-hover:bg-accent/20 flex items-center justify-center transition-colors shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-secondary)] group-hover:bg-accent transition-colors" />
                    </span>
                    <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">{t(link.key)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Region and Location Info - 4 cols */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h4 className="text-accent font-black text-sm mb-0 lg:mb-2 uppercase tracking-[0.2em] opacity-90">
              {t("footer_social")}
            </h4>
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-sm sm:text-base text-[var(--text-secondary)] shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />

              <div className="relative z-10 flex items-start gap-4 text-[var(--text-primary)] font-bold text-lg">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center shrink-0 border border-accent/20 shadow-lg shadow-accent/5" style={{ width: '48px', height: '48px', borderRadius: '16px' }}>
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ width: '24px', height: '24px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="pt-1">
                  <span className="block mb-1 text-base sm:text-lg">{isRTL ? "الداخلة — وادي الذهب" : "Dakhla — Oued Ed-Dahab"}</span>
                  <p className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed">
                    {isRTL
                      ? "المملكة المغربية — حزب الأصالة والمعاصرة."
                      : "Royaume du Maroc — PAM."}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Ribbon - 100% width, separated from grid */}
      <div className="relative z-20 w-full bg-[var(--bg-card)] border-t border-[var(--border-subtle)] py-6 sm:py-8 mt-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[var(--text-secondary)] font-medium">
          <p className="flex items-center gap-2 text-center md:text-left rtl:md:text-right">
            © {currentYear} {t("footer_supporters")}. {t("footer_rights")}.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <span className="px-5 py-2.5 rounded-full bg-[var(--bg-main)] border border-[var(--border-subtle)] transition-all cursor-default flex items-center gap-2">
              <span className="text-lg">🇲🇦</span>
              <span className="font-bold text-[var(--text-primary)]">{isRTL ? "الداخلة في الصدارة دائماً" : "Dakhla Toujours en Avant"}</span>
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}
