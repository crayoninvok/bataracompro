// src/components/profile/VisionMission.tsx
"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, Trophy } from "lucide-react";

export default function VisionMission() {
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

    const section = document.getElementById("vision-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="vision-section" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
            Visi & Misi
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-6" />
          <p className="text-gray-700">
            Kami berkomitmen untuk menjadi perusahaan transportasi batubara
            terdepan di Indonesia
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div
            className={`bg-white p-6 rounded-lg shadow-md md:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 text-center mb-4">
              Visi
            </h3>
            <p className="text-gray-700 text-center leading-relaxed">
              Menjadi perusahaan transportasi batubara terdepan yang memberikan
              solusi logistik terintegrasi dengan standar keamanan dan efisiensi
              tertinggi di Indonesia.
            </p>
          </div>

          <div
            className={`bg-white p-6 rounded-lg shadow-md md:w-1/2 transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 text-center mb-4">
              Misi
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>
                  Menyediakan layanan transportasi batubara yang aman, tepat
                  waktu, dan efisien
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>
                  Mengembangkan sistem manajemen operasional yang terintegrasi
                  dan berkelanjutan
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>
                  Membangun hubungan jangka panjang dengan klien melalui layanan
                  berkualitas tinggi
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>
                  Mengedepankan praktik bisnis yang bertanggung jawab terhadap
                  lingkungan
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
