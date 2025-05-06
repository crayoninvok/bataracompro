// src/components/visi-misi/VisionSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function VisionSection() {
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
    <section id="vision-section" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div
            className={`lg:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
              Visi Kami
            </h2>
            <div className="w-16 h-1 bg-orange-500 mb-6" />

            <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500 mb-6">
              <p className="text-lg md:text-xl font-medium text-blue-900 italic">
                "Menjadi perusahaan transportasi batubara terdepan yang
                memberikan solusi logistik terintegrasi dengan standar keamanan
                dan efisiensi tertinggi di Indonesia."
              </p>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">
              PT. Batara Dharma Persada memiliki visi untuk tidak hanya menjadi
              penyedia jasa transportasi batubara, tetapi menjadi pemimpin
              industri yang dikenal dengan keunggulan operasional dan inovasi
              dalam layanan logistik terintegrasi.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Kami berkomitmen untuk menetapkan standar tertinggi dalam keamanan
              dan efisiensi operasional, memastikan bahwa setiap aspek layanan
              kami memberikan nilai tambah bagi klien kami dan industri secara
              keseluruhan.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Dengan fokus pada pengembangan berkelanjutan dan adaptasi terhadap
              perubahan kebutuhan pasar, kami bertujuan untuk terus memperluas
              kapabilitas kami serta memperkuat posisi kami sebagai mitra
              transportasi yang terpercaya di Indonesia.
            </p>
          </div>

          <div
            className={`lg:w-1/2 transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/vision-image.jpg" // Replace with actual image
                alt="Visi PT. Batara Dharma Persada"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl text-white font-bold mb-2">
                    Mencapai Visi Kami
                  </h3>
                  <p className="text-gray-200">
                    Melalui dedikasi, inovasi, dan kemitraan yang kuat
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                  Kepemimpinan Pasar
                </h4>
                <p className="text-gray-700 text-sm">
                  Menjadi pionir dalam teknologi dan standar layanan
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                  Keamanan Prioritas
                </h4>
                <p className="text-gray-700 text-sm">
                  Standar keamanan tertinggi dalam setiap operasi
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                  Efisiensi Operasional
                </h4>
                <p className="text-gray-700 text-sm">
                  Optimalisasi proses untuk layanan yang cepat dan andal
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                  Solusi Terintegrasi
                </h4>
                <p className="text-gray-700 text-sm">
                  Layanan komprehensif di seluruh rantai logistik
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
