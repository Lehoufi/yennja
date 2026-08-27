"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Video() {
  const { t, isRTL } = useLanguage();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="video" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-main)] via-[var(--bg-surface)] to-[var(--bg-main)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="newspaper-ornament mb-3.5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-accent/15 text-accent border border-accent/30 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              {t("video_badge")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black gold-text mb-3 tracking-tight">
            {t("video_title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {t("video_subtitle")}
          </p>
        </div>

        {/* Video Cinema Showcase Player */}
        <div className="glass-card p-3 sm:p-5 rounded-3xl border-2 border-accent/40 shadow-2xl overflow-hidden relative group">
          
          {/* Top Cinema Player Bar */}
          <div className="flex items-center justify-between px-3 py-2 mb-3 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-bold text-[var(--text-primary)] px-2">
                {t("video_tag")} — الداخلة
              </span>
            </div>
            <div className="flex items-center gap-2 text-accent font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              <span>{t("video_duration")}</span>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center">
            <video
              ref={videoRef}
              controls
              playsInline
              preload="metadata"
              poster="/backg.png"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain rounded-2xl"
            >
              <source
                src="/WhatsApp Video 2026-08-25 at 22.37.07.mp4"
                type="video/mp4"
              />
              متصفحك لا يدعم تشغيل الفيديو.
            </video>

            {/* Custom Overlay Play Button when paused */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent text-[#070F1E] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group/play border-4 border-white/20"
                aria-label="Play video"
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}
          </div>

          {/* Video Footer Metadata & Direct Share */}
          <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[var(--text-secondary)]">
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white p-0.5 border border-accent">
                <Image src="/logo2.png" alt="PAM" width={28} height={28} className="object-contain" />
              </div>
              <span className="font-semibold text-[var(--text-primary)]">
                {isRTL ? "مبادرة وتواصل ميداني مستمر" : "Initiative & Contact de Terrain"}
              </span>
            </div>

            <a
              href="https://www.facebook.com/profile.php?id=61593182381752"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent hover:text-accent-light font-bold transition-colors"
            >
              <span>{isRTL ? "شارك الفيديو على فيسبوك" : "Partager sur Facebook"}</span>
              <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
