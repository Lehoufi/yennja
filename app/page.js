"use client";

import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import ServicesSection from "@/app/components/ServicesSection";
import VideoBanner from "@/app/components/VideoBanner";
import PostsCarousel from "@/app/components/PostsCarousel";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300">
      <Navbar />
      <main className="w-full">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Editorial Posts Carousel with Hover Stats - Moved directly under Hero */}
        <PostsCarousel />

        {/* 3. Services / 3 Signature Cards Section */}
        <ServicesSection />

        {/* 4. Ambient Video Background Section */}
        <VideoBanner />

        {/* 5. Testimonials Section (Replacing Facebook Feed) - HIDDEN FOR NOW */}
        {/* <TestimonialsSection /> */}
      </main>
      <Footer />
    </div>
  );
}
