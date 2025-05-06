// src/components/profile/ProfilePage.tsx
"use client";

import React from "react";
import ProfileHero from "./ProfileHero";
import AboutSection from "./AboutSection";
import VisionMission from "./VisionMission";
import CoreValues from "./CoreValues";
import CompanyStats from "./CompanyStats";
import ProfileCTA from "./ProfileCTA";

export default function ProfilePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <ProfileHero />
      <AboutSection />
      <VisionMission />
      <CoreValues />
      <CompanyStats />
      <ProfileCTA />
    </main>
  );
}
