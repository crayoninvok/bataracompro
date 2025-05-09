// src/components/visi-misi/VisiMisiPage.tsx
"use client";

import React from "react";
import VisiMisiHero from "./VisiMisiHero";
import VisionSection from "./VisionSection";
import VisiMisiCTA from "./VisiMisiCTA";

export default function VisiMisiPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <VisiMisiHero />
      <VisionSection />
      <VisiMisiCTA />
    </main>
  );
}

