"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useLanguage } from "@/app/context/LanguageContext";
import { postsData } from "@/app/data/posts";
import { motion, AnimatePresence } from "framer-motion";

export default function PostsPage() {
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const postsPerPage = 9;

  // Handle ESC key and scroll lock for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    if (selectedVideo) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedVideo]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set();
    postsData.forEach((p) => {
      cats.add(isRTL ? p.category_ar : p.category_fr);
    });
    return ["all", ...Array.from(cats)];
  }, [isRTL]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return postsData.filter((post) => {
      const title = isRTL ? post.title_ar : post.title_fr;
      const content = isRTL ? post.content_ar : post.content_fr;
      const cat = isRTL ? post.category_ar : post.category_fr;
      const matchesCat = selectedCategory === "all" || cat === selectedCategory;
      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery, isRTL]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300">
      <Navbar />

      <main className="pt-32 sm:pt-40 pb-32 sm:pb-44" style={{ paddingTop: '160px', paddingBottom: '160px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ─── Page Header ─── */}
          <motion.div
            className="mb-14"
            style={{ marginBottom: '32px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-secondary)] mb-6">
              <Link href="/" className="hover:text-accent font-bold transition-colors">
                {isRTL ? "الرئيسية" : "Accueil"}
              </Link>
              <svg className="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
              </svg>
              <span className="text-accent font-bold">
                {isRTL ? "أرشيف المنشورات" : "Archives des Publications"}
              </span>
            </div>

            {/* Title Row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[var(--border-subtle)]">
              <div>
                <h1 className="text-3xl sm:text-5xl font-black gold-text tracking-tight mb-3">
                  {isRTL ? "منشورات ومستجدات الميدان" : "Publications & Couverture de Terrain"}
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                  {isRTL
                    ? "تغطية شاملة وموثقة لكافة الأنشطة والمبادرات الميدانية"
                    : "Toutes les publications et actions citoyennes partagées sur Facebook"}
                </p>
              </div>

            </div>
          </motion.div>

          {/* ─── Search & Filters ─── */}
          <motion.div
            className="mb-14"
            style={{ marginBottom: '48px' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Search Input — premium design with search button */}
            <div className="relative max-w-2xl mb-8">
              <div className="flex items-stretch gap-0 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm hover:shadow-md hover:border-accent/30 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15 transition-all overflow-hidden">
                <div className="flex items-center px-5">
                  <svg className="w-5 h-5 text-[var(--text-secondary)] opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder={isRTL ? "ابحث في عناوين ومواضيع المنشورات..." : "Rechercher par mot-clé..."}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 py-4 bg-transparent text-sm font-medium focus:outline-none placeholder:text-[var(--text-secondary)] placeholder:opacity-50"
                  style={{ paddingTop: '16px', paddingBottom: '16px' }}
                />
                <button
                  className="px-6 bg-accent text-[#070F1E] font-bold text-sm hover:bg-accent/90 transition-colors flex items-center gap-2 shrink-0"
                  style={{ paddingLeft: '24px', paddingRight: '24px' }}
                  onClick={() => {}}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <span className="hidden sm:inline">{isRTL ? "بحث" : "Rechercher"}</span>
                </button>
              </div>
            </div>


          </motion.div>

          {/* ─── Posts Grid ─── */}
          {currentPosts.length > 0 ? (
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
              style={{ gap: '56px 32px' }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              key={currentPage + selectedCategory + searchQuery}
            >
              {currentPosts.map((post) => (
                <motion.div key={post.id} variants={itemVariants} className="group">
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

                  {/* Body Text */}
                  <div className="mb-5 text-sm text-[var(--text-primary)] leading-relaxed font-medium overflow-hidden" style={{ height: '110px' }}>
                    <span>{isRTL ? post.title_ar : post.title_fr}</span>
                    <a
                      href={post.fbUrl}
                      target={post.isVideo ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (post.isVideo) {
                          e.preventDefault();
                          setSelectedVideo(post);
                        }
                      }}
                      className="font-bold text-accent hover:underline mx-1 block mt-1 cursor-pointer"
                    >
                      {post.isVideo ? (isRTL ? "تشغيل الفيديو..." : "lire la vidéo...") : (isRTL ? "قراءة المزيد..." : "lire plus...")}
                    </a>
                  </div>

                  {/* Image / Video Card */}
                  <div
                    onClick={() => {
                      if (post.isVideo) {
                        setSelectedVideo(post);
                      } else {
                        window.open(post.fbUrl, "_blank");
                      }
                    }}
                    className="relative block w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg cursor-pointer group/card"
                  >
                    <img
                      src={post.image}
                      alt={isRTL ? post.title_ar : post.title_fr}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/backg.png";
                      }}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Play Badge for Video Posts */}
                    {post.isVideo && (
                      <>
                        <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                          <span>{isRTL ? "فيديو" : "Vidéo"}</span>
                        </div>

                        {/* Center Play Button Overlay */}
                        <div className="absolute inset-0 z-15 flex items-center justify-center pointer-events-none">
                          <div className="w-16 h-16 rounded-full bg-accent text-[#070F1E] shadow-[0_0_35px_rgba(255,215,0,0.5)] flex items-center justify-center group-hover/card:scale-110 group-hover/card:shadow-[0_0_45px_rgba(255,215,0,0.7)] transition-all duration-300">
                            <svg className="w-7 h-7 fill-current translate-x-0.5" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Hover Stats */}
                    <div className="absolute inset-0 bg-[#070F1E]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-20">
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
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-20 text-center rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
              <svg className="w-16 h-16 mx-auto mb-4 text-[var(--text-secondary)] opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <p className="text-base text-[var(--text-secondary)] font-medium">
                {isRTL ? "لم يتم العثور على منشورات تطابق بحثك." : "Aucune publication ne correspond à votre recherche."}
              </p>
            </div>
          )}

          {/* ─── Pagination ─── */}
          {totalPages > 1 && (
            <motion.div
              className="flex items-center justify-center gap-2 mt-20"
              style={{ marginTop: '40px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Previous */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] disabled:opacity-30 disabled:cursor-not-allowed text-sm font-bold transition-all hover:border-accent hover:text-accent"
                style={{ padding: '12px 20px' }}
              >
                <svg className={`w-4 h-4 transition-transform group-hover:-translate-x-0.5 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span>{isRTL ? "السابق" : "Précédent"}</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1.5 mx-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-11 h-11 rounded-xl text-sm font-black transition-all duration-200 ${
                      currentPage === pageNum
                        ? "bg-accent text-[#070F1E] shadow-lg shadow-accent/30 scale-110"
                        : "bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-accent hover:border-accent/50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] disabled:opacity-30 disabled:cursor-not-allowed text-sm font-bold transition-all hover:border-accent hover:text-accent"
                style={{ padding: '12px 20px' }}
              >
                <span>{isRTL ? "التالي" : "Suivant"}</span>
                <svg className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          )}

          {/* Always show page indicator even with 1 page */}
          {totalPages <= 1 && filteredPosts.length > 0 && (
            <div className="flex items-center justify-center mt-16">
              <span className="px-6 py-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-sm font-bold text-[var(--text-secondary)]">
                {isRTL
                  ? `عرض ${filteredPosts.length} من ${filteredPosts.length} منشور`
                  : `Affichage de ${filteredPosts.length} sur ${filteredPosts.length} publications`}
              </span>
            </div>
          )}

        </div>
      </main>

      {/* Video Modal Player - Direct Fullscreen */}
      <AnimatePresence>
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 w-screen h-screen bg-black flex flex-col items-center justify-center p-0 m-0 overflow-hidden"
          >
            {/* Top Bar */}
            <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/85 to-transparent pointer-events-auto">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white p-0.5 border border-accent flex items-center justify-center shrink-0">
                  <Image src="/logo2.png" alt="PAM" width={24} height={24} className="object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {isRTL ? "الخطاط ينجى" : "El Khattat Yenja"}
                  </h3>
                  <span className="text-[11px] text-accent font-semibold">
                    {isRTL ? `نشر في ${selectedVideo.date_ar}` : `Publié le ${selectedVideo.date_fr}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={selectedVideo.fbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-sm text-white transition-all duration-200 shadow-lg hover:scale-105 active:scale-95"
                  style={{ background: '#1877F2', boxShadow: '0 4px 15px rgba(24,119,242,0.4)' }}
                >
                  {/* Facebook Icon */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>{isRTL ? "فتح على فيسبوك" : "Ouvrir sur Facebook"}</span>
                </a>

                <button
                  onClick={() => setSelectedVideo(null)}
                  type="button"
                  aria-label="Close"
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-red-500 hover:text-white text-white flex items-center justify-center transition-all duration-200 border border-white/20 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Direct Fullscreen Video Embed */}
            <div className="relative w-full h-full flex items-center justify-center bg-black pt-16 pb-4 px-2">
              <iframe
                src={selectedVideo.embedUrl}
                className="w-full h-full max-w-5xl border-0 rounded-2xl shadow-2xl"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen={true}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
