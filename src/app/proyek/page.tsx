"use client";

import { AnimationProvider } from "@/components/projects/AnimationContext";
import HeroHeader from "@/components/projects/HeroHeader";
import FeaturedProject from "@/components/projects/FeaturedProject";
import HaulingScope from "@/components/projects/HaulingScope";
import ImageGallery from "@/components/projects/ImageGalery";
import MapSection from "@/components/projects/MapSection";
import CompanyGoals from "@/components/projects/CompanyGoal";
import CTASection from "@/components/projects/CTASection";

export default function Projects() {
  return (
    <AnimationProvider>
      <main className="min-h-screen bg-black/80 backdrop-blur-lg font-nav">
        <HeroHeader
          badge="Coal Hauling Contractor"
          title="Our Projects"
          description="Trusted coal hauling partner for PT Indonesia Pratama (Bayan Resources Group) — active at Senyiur and preparing the Muara Pahu project for go-live in the 2nd week of July 2026."
          backgroundImage="/senyiur/sny2.jpeg"
        />
        <FeaturedProject />
        <HaulingScope />
        <ImageGallery />
        <MapSection />
        <CompanyGoals />
        <CTASection />
      </main>
    </AnimationProvider>
  );
}
