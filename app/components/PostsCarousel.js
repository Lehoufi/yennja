"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { postsData } from "@/app/data/posts";
import { motion } from "framer-motion";

export default function PostsCarousel() {
  const { t, isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only show 5 posts + 1 "See More" card = 6 total
  const posts = postsData.slice(0, 5);
  const totalSlides = posts.length + 1; // +1 for "See More"

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, totalSlides - 2));
    }, 4000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, totalSlides - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, totalSlides - 2)) % Math.max(1, totalSlides - 2));
  };

  // Calculate the translateX percentage for sliding
  // Mobile: 1 card visible (100% per step), Desktop: 3 cards visible (33.3% per step)
  const cardsVisible = isMobile ? 1 : 3;
  const shiftPercent = currentIndex * (100 / cardsVisible);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="posts" className="py-20 sm:py-28 bg-[var(--bg-main)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-24"
          style={{ marginBottom: '64px' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="space-y-3">
            <motion.span
              variants={itemVariants}
              className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-accent block"
            >
              {isRTL ? "مستجدات الميدان والأنشطة" : "ACTUALITÉS & COUVERTURE DE TERRAIN"}
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight"
            >
              {isRTL ? "أحدث منشورات وتغطيات الجريدة" : "Dernières Publications Partagées"}
            </motion.h2>
          </div>

          {/* Navigation Controls */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            {/* See All Button */}
            <Link
              href="/posts"
              className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent text-[#070F1E] font-bold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all duration-300"
              style={{ padding: '12px 24px' }}
            >
              <span>{isRTL ? "عرض الكل" : "Voir Tout"}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Arrows */}
            <button
              onClick={isRTL ? nextSlide : prevSlide}
              className="w-11 h-11 rounded-full border border-[var(--border-subtle)] hover:border-accent hover:text-accent transition-colors flex items-center justify-center text-[var(--text-secondary)]"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
              </svg>
            </button>
            <button
              onClick={isRTL ? prevSlide : nextSlide}
              className="w-11 h-11 rounded-full border border-[var(--border-subtle)] hover:border-accent hover:text-accent transition-colors flex items-center justify-center text-[var(--text-secondary)]"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>
          </motion.div>
        </motion.div>

        {/* Carousel Track */}
        <motion.div
          className="overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div
            ref={trackRef}
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: isRTL
                ? `translateX(${shiftPercent}%)`
                : `translateX(-${shiftPercent}%)`,
            }}
          >
            {/* Post Cards */}
            {posts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="flex-shrink-0 px-3 md:px-5"
                style={{ width: isMobile ? '100%' : '33.333%', flexShrink: 0, paddingLeft: '12px', paddingRight: '12px' }}
              >
                <div className="group">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full border-[1.5px] border-dashed border-slate-300 dark:border-slate-600 p-0.5 flex items-center justify-center overflow-hidden bg-white shrink-0">
                        <Image src="/logo2.png" alt="Avatar" width={36} height={36} className="object-contain" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[var(--text-primary)] text-sm leading-tight">
                            {isRTL ? "الخطاط ينجى" : "El Khattat Yenja"}
                          </span>
                          <svg className="w-4 h-4 text-[#1DA1F2]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.465 13.18 1.59 11.6 1.59c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965-.238 1.4C1.635 9.55.76 10.92.76 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238.65 1.273 2.02 2.148 3.6 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-10.46 4.3L7.79 12.55l1.41-1.41 2.84 2.84 5.66-5.66 1.41 1.41-7.07 7.07z" />
                          </svg>
                        </div>
                        <span className="text-[11px] text-[var(--text-secondary)] font-semibold">
                          {isRTL ? `نشر في ${post.date_ar}` : `Publié le ${post.date_fr}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Text — fixed height for alignment */}
                  <div className="h-14 mb-6 text-sm text-[var(--text-primary)] leading-relaxed font-medium overflow-hidden">
                    <span>{isRTL ? post.title_ar : post.title_fr}</span>
                    <a
                      href={post.fbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-accent hover:underline mx-1"
                    >
                      {isRTL ? "...قراءة المزيد" : "...lire plus"}
                    </a>
                  </div>

                  {/* Image */}
                  <a
                    href={post.fbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={post.image}
                      alt={isRTL ? post.title_ar : post.title_fr}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Hover Stats Overlay */}
                    <div className="absolute inset-0 bg-[#070F1E]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <div className="flex gap-8">
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-black text-white">{post.likes}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            {isRTL ? "إعجاب" : "Likes"}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-black text-white">{post.comments}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            {isRTL ? "تعليق" : "Comments"}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-black text-white">{post.shares}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            {isRTL ? "مشاركة" : "Shares"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </motion.div>
            ))}

            {/* See More Card */}
            <motion.div variants={itemVariants} className="flex-shrink-0 px-3 md:px-5" style={{ width: isMobile ? '100%' : '33.333%', flexShrink: 0, paddingLeft: '12px', paddingRight: '12px' }}>
              <div className="flex flex-col h-full">
                {/* Empty space to align with header height */}
                <div className="h-11 mb-5" />
                <div className="h-14 mb-6" />
                {/* See More Card content */}
                <Link
                  href="/posts"
                  className="group relative flex flex-col items-center justify-center aspect-[4/5] rounded-2xl border-2 border-dashed border-accent/30 hover:border-accent/60 bg-accent/5 hover:bg-accent/10 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-accent text-[#070F1E] flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(255,215,0,0.25)] group-hover:scale-110 transition-transform duration-500">
                    <svg
                      className={`w-7 h-7 ${isRTL ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-[var(--text-primary)] mb-1">
                    {isRTL ? "اكتشف المزيد" : "Découvrir Plus"}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] font-medium text-center px-6">
                    {isRTL
                      ? "تصفح جميع المنشورات والتغطيات الميدانية"
                      : "Parcourez toutes les publications"}
                  </p>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
