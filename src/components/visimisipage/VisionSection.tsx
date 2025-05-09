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

  const missionItems = [
    {
      title: "Layanan Terbaik",
      text: "Untuk Memberikan Layanan Terbaik kepada Pelanggan Kami di industri Jasa Pertambangan.",
      engText: "To Deliver the Best Service to Our Customer in Mining Service industry.",
      icon: (
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
      ),
    },
    {
      title: "Menciptakan Nilai",
      text: "Menciptakan Nilai dan Membuat Perbedaan untuk Menyediakan Produk dan Layanan yang Bermanfaat dalam Bisnis Energi dan Pertambangan.",
      engText: "To Create Value and Make a Difference to Provide Distinct and Beneficial Products and Services in Energy and Mining Business.",
      icon: (
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
      ),
    },
    {
      title: "Pengembangan SDM",
      text: "Untuk Mengembangkan dan Terus Meningkatkan Sumber Daya Manusia untuk Masa Depan yang Lebih Cerah.",
      engText: "To Develop and Continuously Improve Human Capital for a Brighter Future.",
      icon: (
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: "Efisiensi Optimal",
      text: "Terus Meningkatkan Kompetensi Perusahaan untuk Mencapai Efisiensi Optimal dengan Implementasi Teknologi Terbaru.",
      engText: "To Continuously Improve Company Competence to Reach the Optimum Efficiency with the Latest Technology Implementation.",
      icon: (
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
      ),
    },
  ];

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
              Visi
            </h2>
            <div className="w-16 h-1 bg-orange-500 mb-6" />

            <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500 mb-6">
              <p className="text-lg md:text-xl font-medium text-blue-900 italic">
                "To be a Leading Mining and Energy Group to build a Better Living."
              </p>
              <p className="text-md font-medium text-gray-700 italic mt-2">
                "Menjadi Grup Pertambangan dan Energi Terdepan untuk Membangun Kehidupan yang Lebih Baik."
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4 mt-8">
              Misi
            </h2>
            <div className="w-16 h-1 bg-orange-500 mb-6" />

            <div className="space-y-4">
              {missionItems.slice(0, 2).map((item, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-blue-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-700 text-sm mb-1">
                        {item.engText}
                      </p>
                      <p className="text-gray-700 text-sm italic">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`lg:w-1/2 transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl mb-8">
              <Image
                src="/vision-image.jpg" // Replace with actual image
                alt="Vision - Mining and Energy Group"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl text-white font-bold mb-2">
                    Building a Better Living
                  </h3>
                  <p className="text-gray-200">
                    Through leadership in Mining and Energy
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {missionItems.slice(2, 4).map((item, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-blue-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-700 text-sm mb-1">
                        {item.engText}
                      </p>
                      <p className="text-gray-700 text-sm italic">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}