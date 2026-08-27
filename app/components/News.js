"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function News() {
  const { t, isRTL } = useLanguage();

  const tagColors = {
    "لقاءات تواصلية": "bg-blue-500/15 text-blue-400 border-blue-500/30",
    "Rencontres Citoyennes": "bg-blue-500/15 text-blue-400 border-blue-500/30",
    "اقتصاد بحري": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    "Économie Bleue": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    "تضامن اجتماعي": "bg-rose-500/15 text-rose-400 border-rose-500/30",
    "Solidarité Sociale": "bg-rose-500/15 text-rose-400 border-rose-500/30",
  };

  const articles = [1, 2, 3].map((i) => ({
    title: t(`news_${i}_title`),
    desc: t(`news_${i}_desc`),
    date: t(`news_${i}_date`),
    tag: t(`news_${i}_tag`),
  }));

  return (
    <section id="news" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="newspaper-ornament mb-3.5">
            <span className="text-accent text-xs sm:text-sm font-extrabold tracking-wider uppercase">
              {t("news_title")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black gold-text mb-3 tracking-tight">
            {t("news_title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t("news_subtitle")}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <article
              key={i}
              className="glass-card overflow-hidden group flex flex-col justify-between"
            >
              {/* Top Accent Gradient Line */}
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

              <div className="p-6 sm:p-7">
                {/* Meta: Date + Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[var(--text-secondary)] text-xs flex items-center gap-1.5 font-medium">
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    {article.date}
                  </span>
                  <span className={`text-[11px] px-3 py-1 rounded-full border font-bold ${tagColors[article.tag] || "bg-accent/10 text-accent border-accent/30"}`}>
                    {article.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-extrabold text-[var(--text-primary)] mb-3 group-hover:text-accent transition-colors leading-snug">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {article.desc}
                </p>
              </div>

              {/* Read More & Share Link */}
              <div className="p-6 pt-0">
                <a
                  href="https://www.facebook.com/profile.php?id=61593182381752"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-accent hover:bg-accent/10 text-accent text-xs sm:text-sm font-bold transition-all duration-300 inline-flex items-center justify-between group/btn"
                >
                  <span>{t("news_read_more")}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isRTL ? "rotate-180 group-hover/btn:-translate-x-1" : "group-hover/btn:translate-x-1"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
