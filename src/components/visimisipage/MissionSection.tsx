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
      title: "Keamanan dan Ketepatan Waktu",
      description:
        "Menyediakan layanan transportasi batubara yang aman, tepat waktu, dan efisien untuk memastikan kepuasan klien dan kelancaran operasional.",
      detail:
        "Keselamatan adalah prioritas utama kami di setiap tahap transportasi. Dengan armada modern dan pemeliharaan rutin, kami memastikan setiap pengiriman tiba tepat waktu tanpa mengorbankan aspek keamanan.",
    },
    {
      title: "Manajemen Operasional Terintegrasi",
      description:
        "Mengembangkan sistem manajemen operasional yang terintegrasi dan berkelanjutan untuk meningkatkan efisiensi dan efektivitas layanan.",
      detail:
        "Kami mengimplementasikan teknologi terkini dalam sistem manajemen operasional untuk memberikan visibilitas real-time, pelacakan pengiriman, dan analisis data yang memungkinkan pengambilan keputusan yang lebih baik.",
    },
    {
      title: "Hubungan Jangka Panjang",
      description:
        "Membangun hubungan jangka panjang dengan klien melalui layanan berkualitas tinggi dan komunikasi yang transparan.",
      detail:
        "Lebih dari sekadar penyedia layanan, kami berupaya menjadi mitra strategis yang memahami kebutuhan spesifik klien dan memberikan solusi yang disesuaikan untuk mendukung keberhasilan bisnis mereka.",
    },
    {
      title: "Praktik Bisnis Berkelanjutan",
      description:
        "Mengedepankan praktik bisnis yang bertanggung jawab terhadap lingkungan dan masyarakat sekitar.",
      detail:
        "Kami berkomitmen untuk mengurangi dampak lingkungan melalui efisiensi bahan bakar, pengelolaan limbah yang bertanggung jawab, dan program CSR yang mendukung komunitas di sekitar area operasional kami.",
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
            Langkah-langkah strategis yang kami ambil untuk mewujudkan visi
            perusahaan
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
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3">
                      {mission.title}
                    </h3>
                    <p className="text-gray-700 mb-4 font-medium">
                      {mission.description}
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
          <h3 className="text-xl font-bold mb-4">Komitmen Terhadap Misi</h3>
          <p className="text-blue-100">
            Setiap langkah yang kami ambil, setiap keputusan yang kami buat, dan
            setiap layanan yang kami berikan didasarkan pada misi-misi ini. Kami
            memahami bahwa mewujudkan visi kami membutuhkan dedikasi yang
            konsisten terhadap nilai-nilai dan tujuan yang telah kami tetapkan.
          </p>
        </div>
      </div>
    </section>
  );
}
