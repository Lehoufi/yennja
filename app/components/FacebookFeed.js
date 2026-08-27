"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

export default function FacebookFeed() {
  const { t, isRTL } = useLanguage();

  const FB_PAGE_URL = "https://www.facebook.com/profile.php?id=61593182381752";
  const FB_SHARE_URL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(FB_PAGE_URL)}`;

  return (
    <section id="facebook" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-main)] via-[var(--bg-surface)] to-[var(--bg-main)]" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-[#1877F2]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="newspaper-ornament mb-3.5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#1877F2]/15 text-[#1877F2] border border-[#1877F2]/30 uppercase tracking-wider">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              {t("nav_facebook")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black gold-text mb-3 tracking-tight">
            {t("fb_title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {t("fb_subtitle")}
          </p>
        </div>

        {/* Facebook Hub Glass Card */}
        <div className="glass-card overflow-hidden rounded-3xl border border-[var(--border-subtle)] shadow-2xl">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#1877F2]/20 via-[#1877F2]/10 to-transparent p-5 sm:p-6 border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-2xl bg-white p-1 shadow-md border-2 border-[#1877F2] overflow-hidden flex items-center justify-center">
                <Image src="/logo2.png" alt="PAM Logo" width={48} height={48} className="object-contain" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-[var(--text-primary)]">
                  {t("fb_page_name")}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  {t("fb_followers_count")} · الداخلة – وادي الذهب
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href={FB_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs sm:text-sm font-extrabold transition-all duration-300 shadow-md shadow-blue-600/30 flex items-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>{t("fb_follow")}</span>
              </a>
              <a
                href={FB_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:px-3 sm:py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-white/10 text-[var(--text-primary)] text-xs font-bold transition-all"
                title={t("fb_share")}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Facebook Embed iframe container */}
          <div className="p-4 sm:p-6 flex justify-center bg-black/5 dark:bg-black/30 overflow-x-auto">
            <div className="w-full max-w-[500px] flex justify-center overflow-hidden rounded-2xl shadow-inner border border-[var(--border-subtle)]">
              <iframe
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                  FB_PAGE_URL
                )}&tabs=timeline&width=500&height=650&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                width="500"
                height="650"
                style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
                title="Facebook Timeline"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
