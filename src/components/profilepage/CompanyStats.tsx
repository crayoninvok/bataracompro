// src/components/profile/CompanyStats.tsx
"use client";

import React, { useState, useEffect } from "react";

export default function CompanyStats() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("stats-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      id="stats-section"
      className="py-16 md:py-24 bg-blue-900 text-white"
    >
      <div
        className={`container mx-auto px-4 md:px-6 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Pencapaian Kami
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-6" />
          <p className="text-blue-100">
            Perjalanan dan pencapaian PT. Batara Dharma Persada hingga saat ini
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6">
            <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
              2015
            </div>
            <p className="text-blue-100">Tahun Berdiri</p>
          </div>

          <div className="p-6">
            <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
              50+
            </div>
            <p className="text-blue-100">Proyek Selesai</p>
          </div>

          <div className="p-6">
            <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
              120+
            </div>
            <p className="text-blue-100">Karyawan</p>
          </div>

          <div className="p-6">
            <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
              25+
            </div>
            <p className="text-blue-100">Armada Truk</p>
          </div>
        </div>
      </div>
    </section>
  );
}
