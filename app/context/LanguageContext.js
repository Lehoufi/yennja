"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import translations from "@/app/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ar");
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("yenja_lang");
    if (savedLang && (savedLang === "ar" || savedLang === "fr")) {
      setLang(savedLang);
    }
    const savedTheme = localStorage.getItem("yenja_theme");
    if (savedTheme && (savedTheme === "dark" || savedTheme === "light")) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("yenja_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.style.fontFamily = lang === "ar"
      ? "'Noto Kufi Arabic', sans-serif"
      : "'Inter', sans-serif";
  }, [lang, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("yenja_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme, mounted]);

  const toggleLang = useCallback(() => {
    setLang(prev => (prev === "ar" ? "fr" : "ar"));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  }, []);

  const t = useCallback(
    (key) => {
      return translations[lang]?.[key] || key;
    },
    [lang]
  );

  const isRTL = lang === "ar";
  const isDark = theme === "dark";

  return (
    <LanguageContext.Provider
      value={{ lang, toggleLang, theme, toggleTheme, isDark, t, isRTL, mounted }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
