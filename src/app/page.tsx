"use client";

import HeroWithVideo from "@/components/homepage/Hero";
import AboutCompany from "@/components/homepage/AboutCompany";
import ServicesSection from "@/components/homepage/ServicesHero";
import TestimonialsSection from "@/components/homepage/TestimonialsHero";
import CTASection from "@/components/homepage/CTAHero";
import { useEffect } from "react";

export default function Home() {
  // Add smooth scrolling for the entire page
  useEffect(() => {
    // This ensures smooth scrolling works globally
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroWithVideo />
      <AboutCompany />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}