// src/components/visi-misi/MissionSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export default function MissionSection() {
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

    const section = document.getElementById("mission-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const missions = [
    {
      title: "Best Services",
      engText: "To Deliver the Best Service to Our Customer in Mining Service industry.",
      idText: "Untuk Memberikan Layanan Terbaik kepada Pelanggan Kami di industri Jasa Pertambangan.",
      detail:
        "Kami berkomitmen untuk selalu memberikan layanan dengan standar tertinggi, memastikan kepuasan pelanggan, dan membangun reputasi sebagai penyedia jasa yang andal dan profesional dalam industri pertambangan.",
    },
    {
      title: "Making Values & Moves",
      engText: "To Create Value and Make a Difference to Provide Distinct and Beneficial Products and Services in Energy and Mining Business.",
      idText: "Menciptakan Nilai dan Membuat Perbedaan untuk Menyediakan Produk dan Layanan yang Bermanfaat dalam Bisnis Energi dan Pertambangan.",
      detail:
        "Kami terus berinovasi untuk menghadirkan solusi yang memberi nilai tambah bagi seluruh pemangku kepentingan, dengan fokus pada diferensiasi produk dan layanan yang memberikan keuntungan kompetitif.",
    },
    {
      title: "Human Resources Development",
      engText: "To Develop and Continuously Improve Human Capital for a Brighter Future.",
      idText: "Untuk Mengembangkan dan Terus Meningkatkan Sumber Daya Manusia untuk Masa Depan yang Lebih Cerah.",
      detail:
        "Kami menginvestasikan waktu dan sumber daya untuk mengembangkan talenta internal, menciptakan lingkungan kerja yang mendukung pertumbuhan profesional, dan mempersiapkan pemimpin masa depan yang akan membawa perusahaan ke tingkat berikutnya.",
    },
    {
      title: "Enhancement of Efeciency",
      engText: "To Continuously Improve Company Competence to Reach the Optimum Efficiency with the Latest Technology Implementation.",
      idText: "Terus Meningkatkan Kompetensi Perusahaan untuk Mencapai Efisiensi Optimal dengan Implementasi Teknologi Terbaru.",
      detail:
        "Kami selalu berupaya meningkatkan kapabilitas organisasi melalui adopsi teknologi terkini, penyempurnaan proses bisnis, dan pengembangan sistem manajemen yang efektif untuk mencapai efisiensi optimal dalam seluruh operasional.",
    },
  ];

  return (
    <section id="mission-section" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
            Misi Kami
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-6" />
          <p className="text-gray-700">
            Langkah-langkah strategis yang kami ambil untuk mewujudkan visi menjadi Grup Pertambangan dan Energi Terdepan
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {missions.map((mission, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-blue-600 h-2" />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-2 mt-1 flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3">
                      {mission.title}
                    </h3>
                    <p className="text-gray-700 mb-2 font-medium">
                      {mission.engText}
                    </p>
                    <p className="text-gray-600 mb-4 italic">
                      {mission.idText}
                    </p>
                    <p className="text-gray-600 text-sm">{mission.detail}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-12 p-6 bg-blue-900 rounded-lg text-white text-center max-w-3xl mx-auto shadow-lg transition-all duration-1000 delay-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h3 className="text-xl font-bold mb-4">STRIVE untuk Mencapai Misi</h3>
          <p className="text-blue-100 mb-4">
            Dalam mencapai misi-misi kami, kami menerapkan nilai-nilai STRIVE - Synergy, Trusted, Responsible, Integrity, Values, dan Extraordinary sebagai fondasi dalam setiap langkah yang kami ambil.
          </p>
          <p className="text-blue-100">
            Kami berkomitmen untuk bekerja secara sinergis, membangun kepercayaan, bertindak bertanggung jawab, menjunjung tinggi integritas, memegang teguh nilai-nilai perusahaan, dan selalu berusaha mencapai hasil yang luar biasa dalam perjalanan kami mewujudkan visi.
          </p>
        </div>
      </div>
    </section>
  );
}