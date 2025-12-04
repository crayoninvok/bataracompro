// Main Projects Page
"use client";

import React from "react";
import HeroHeader from "@/components/projects/HeroHeader";
import MapSection from "@/components/projects/MapSection";
import ImageGallery from "@/components/projects/ImageGalery";
import CTASection from "@/components/projects/CTASection";
import { AnimationProvider } from "@/components/projects/AnimationContext";
import OurUnits from "@/components/profilepage/OurUnits";
import CompanyGoals from "@/components/projects/CompanyGoal";

export default function Projects(): React.ReactNode {
  return (
    <AnimationProvider>
      <main className="min-h-screen bg-black/80 backdrop-blur-lg">
        <HeroHeader
          title="Project Sites"
          description="Strategic locations across Indonesia delivering excellence in mining and hauling operations"
          backgroundImage="https://res.cloudinary.com/dg1chwpuo/image/upload/v1764811142/WhatsApp_Image_2024-12-23_at_11.34.03_et4qvl.jpg"
        />
        <MapSection />
        <OurUnits />
        <CompanyGoals />
        <ImageGallery />
        <CTASection />
      </main>
    </AnimationProvider>
  );
}
