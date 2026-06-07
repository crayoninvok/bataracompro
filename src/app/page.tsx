"use client";

import HeroWithVideo from "@/components/homepage/Hero";
import AboutCompany from "@/components/homepage/AboutCompany";
import ServicesSection from "@/components/homepage/ServicesHero";
import CTASection from "@/components/homepage/CTAHero";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
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
      <CTASection />
    </main>
  );
}
