// src/components/profile/ProfilePage.tsx
"use client";

import React from "react";
import ProfileHero from "./ProfileHero";
import AboutSection from "./AboutSection";
import CoreValues from "./CoreValues";

export default function ProfilePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <ProfileHero />
      <AboutSection />
      <CoreValues />
    </main>
  );
}
