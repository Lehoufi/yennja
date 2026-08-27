"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref} className="gold-text text-3xl sm:text-4xl lg:text-5xl font-black tabular-nums block">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Impact() {
  const { t, isRTL } = useLanguage();

  const stats = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21" />
        </svg>
      ),
      value: 45,
      suffix: "+",
      label: t("impact_projects"),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: 15,
      suffix: "+",
      label: t("impact_years"),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      value: 120,
      suffix: "+",
      label: t("impact_initiatives"),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      ),
      value: 10000,
      suffix: "+",
      label: t("impact_beneficiaries"),
    },
  ];

  return (
    <section id="impact" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - NON-REDUNDANT */}
        <div className="text-center mb-14 sm:mb-18">
          <div className="newspaper-ornament mb-3.5">
            <span className="text-accent text-xs sm:text-sm font-extrabold tracking-wider uppercase">
              {isRTL ? "حصيلة العمل الميداني" : "Bilan d'Action"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black gold-text mb-3 tracking-tight">
            {t("impact_title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t("impact_subtitle")}
          </p>
        </div>

        {/* Stats Grid - GENEROUS PADDING */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card p-7 sm:p-9 rounded-3xl text-center group border-2 border-[var(--border-subtle)] hover:border-accent shadow-xl"
            >
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent/25 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  {stat.icon}
                </div>
              </div>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-[var(--text-secondary)] text-xs sm:text-sm mt-3 font-extrabold leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
