// src/components/visi-misi/VisiMisiHero.tsx
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
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 bg-blue-900">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 to-blue-800 opacity-90" />
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Visi & Misi
          </h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Arah dan tujuan yang membimbing perjalanan PT. Batara Dharma Persada
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto" />
        </div>
      </div>
    </section>
  );
}
