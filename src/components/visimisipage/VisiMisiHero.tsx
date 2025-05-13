"use client";

import React, { useState, useEffect } from "react";

export default function VisiMisiHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 bg-[#1A1A1A]">
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1FBFB8]/30 to-[#1A1A1A] opacity-80 z-0" />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-10 z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-[#E85C23] mb-4 tracking-wide drop-shadow-md">
            Vision & Mission
          </h1>
          <p className="text-lg md:text-xl text-[#D1D5DB] mb-8 leading-relaxed font-light">
            The direction and goals that guide the journey of{" "}
            <span className="font-semibold text-white">PT. Batara Dharma Persada</span>.
          </p>
          <div className="w-24 h-1 bg-[#E85C23] mx-auto rounded-full" />
        </div>
      </div>
    </section>
  );
}
