// src/components/visi-misi/VisiMisiPage.tsx
"use client";

import React from "react";
import VisiMisiHero from "./VisiMisiHero";
import VisionSection from "./VisionSection";
import MissionSection from "./MissionSection";
import ValuesSection from "./ValuesSection";
import GoalsSection from "./GoalsSection";
import VisiMisiCTA from "./VisiMisiCTA";

export default function VisiMisiPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <VisiMisiHero />
      <VisionSection />
      <MissionSection />
      <ValuesSection />
      <GoalsSection />
      <VisiMisiCTA />
    </main>
  );
}

