"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Eye, Target, Award, Users, Zap, Globe } from "lucide-react";

export default function VisionSection() {
  const sectionRef = useRef(null);
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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const missionItems = [
    {
      title: "Layanan Terbaik",
      text: "Untuk Memberikan Layanan Terbaik kepada Pelanggan Kami di industri Jasa Pertambangan.",
      engText: "To Deliver the Best Service to Our Customer in Mining Service industry.",
      icon: <Award className="w-6 h-6 text-[#E85C23]" />,
    },
    {
      title: "Menciptakan Nilai",
      text: "Menciptakan Nilai dan Membuat Perbedaan untuk Menyediakan Produk dan Layanan yang Bermanfaat dalam Bisnis Energi dan Pertambangan.",
      engText: "To Create Value and Make a Difference to Provide Distinct and Beneficial Products and Services in Energy and Mining Business.",
      icon: <Globe className="w-6 h-6 text-[#1FBFB8]" />,
    },
    {
      title: "Pengembangan SDM",
      text: "Untuk Mengembangkan dan Terus Meningkatkan Sumber Daya Manusia untuk Masa Depan yang Lebih Cerah.",
      engText: "To Develop and Continuously Improve Human Capital for a Brighter Future.",
      icon: <Users className="w-6 h-6 text-[#E85C23]" />,
    },
    {
      title: "Efisiensi Optimal",
      text: "Terus Meningkatkan Kompetensi Perusahaan untuk Mencapai Efisiensi Optimal dengan Implementasi Teknologi Terbaru.",
      engText: "To Continuously Improve Company Competence to Reach the Optimum Efficiency with the Latest Technology Implementation.",
      icon: <Zap className="w-6 h-6 text-[#1FBFB8]" />,
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="vision-section" 
      className="py-20 md:py-28 bg-black/80 backdrop-blur-lg text-white relative overflow-hidden border-y border-gray-800"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12 xl:gap-16">
          {/* Vision Column */}
          <div
            className={`lg:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 text-[#E85C23] mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Vision
              </h2>
            </div>
            <div className="w-24 h-1 bg-[#E85C23] mb-8" />

            <div className="p-8 bg-gray-900/60 rounded-lg border-l-4 border-[#E85C23] mb-12 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <p className="text-xl md:text-2xl font-medium text-white italic">
                "To be a Leading Mining and Energy Group to build a Better Living."
              </p>
              <p className="text-md font-medium text-gray-300 italic mt-4">
                "Menjadi Grup Pertambangan dan Energi Terdepan untuk Membangun Kehidupan yang Lebih Baik."
              </p>
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-xl mb-6 group">
              <Image
                src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747206305/IMG_8579_g4f2tm.jpg"
                alt="Vision - Mining and Energy Group"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl text-white font-bold mb-2">
                    Building a Better Living
                  </h3>
                  <div className="flex items-center">
                    <div className="w-12 h-0.5 bg-[#1FBFB8] mr-3" />
                    <p className="text-gray-200">
                      Through leadership in Mining and Energy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {missionItems.slice(2, 4).map((item, index) => (
                <div key={index} className="p-6 bg-gray-900/60 rounded-lg border border-gray-800 hover:border-[#1FBFB8]/50 transition-colors shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#1FBFB8]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-300 text-sm mb-1">
                        {item.engText}
                      </p>
                      <p className="text-gray-400 text-sm italic">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Column */}
          <div
            className={`lg:w-1/2 transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-[#1FBFB8] mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Mission
              </h2>
            </div>
            <div className="w-24 h-1 bg-[#1FBFB8] mb-8" />

            <div className="space-y-6">
              {missionItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-6 bg-gray-900/60 rounded-lg border border-gray-800 hover:border-${index % 2 === 0 ? '[#E85C23]' : '[#1FBFB8]'}/50 transition-all duration-300 shadow-md transform hover:-translate-y-1`}
                >
                  <div className="flex items-start">
                    <div className={`w-14 h-14 bg-${index % 2 === 0 ? '[#E85C23]' : '[#1FBFB8]'}/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-3">
                        {item.title}
                      </h4>
                      <p className="text-gray-300 text-base mb-2 leading-relaxed">
                        {item.engText}
                      </p>
                      <p className="text-gray-400 text-sm italic leading-relaxed">
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