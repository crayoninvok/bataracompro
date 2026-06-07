"use client";

import { AnimationProvider } from "@/components/projects/AnimationContext";
import HeroHeader from "@/components/projects/HeroHeader";
import ImageGallery from "@/components/projects/ImageGalery";

export default function ProjectsGallery() {
  return (
    <AnimationProvider>
      <main className="min-h-screen bg-black/80 backdrop-blur-lg">
        <HeroHeader
          title="Projects Gallery"
          description="Explore images from our mining and transportation operations"
          backgroundImage="/senyiur/sny1.jpeg"
        />
        <ImageGallery />
      </main>
    </AnimationProvider>
  );
}
