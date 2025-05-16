"use client";

import React, { useState, useEffect, useRef } from "react";
import { Eye, Target, Award, Users, Zap, Globe } from "lucide-react";

interface MissionItem {
  title: string;
  text: string;
  engText: string;
  icon: React.ReactNode;
  color: "orange" | "teal";
}

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const missionItems: MissionItem[] = [
    {
      title: "Layanan Terbaik",
      text: "Untuk Memberikan Layanan Terbaik kepada Pelanggan Kami di industri Jasa Pertambangan.",
      engText: "To Deliver the Best Service to Our Customer in Mining Service industry.",
      icon: <Award className="w-6 h-6 text-orange-500" />,
      color: "orange"
    },
    {
      title: "Menciptakan Nilai",
      text: "Menciptakan Nilai dan Membuat Perbedaan untuk Menyediakan Produk dan Layanan yang Bermanfaat dalam Bisnis Energi dan Pertambangan.",
      engText: "To Create Value and Make a Difference to Provide Distinct and Beneficial Products and Services in Energy and Mining Business.",
      icon: <Globe className="w-6 h-6 text-teal-400" />,
      color: "teal"
    },
    {
      title: "Pengembangan SDM",
      text: "Untuk Mengembangkan dan Terus Meningkatkan Sumber Daya Manusia untuk Masa Depan yang Lebih Cerah.",
      engText: "To Develop and Continuously Improve Human Capital for a Brighter Future.",
      icon: <Users className="w-6 h-6 text-orange-500" />,
      color: "orange"
    },
    {
      title: "Efisiensi Optimal",
      text: "Terus Meningkatkan Kompetensi Perusahaan untuk Mencapai Efisiensi Optimal dengan Implementasi Teknologi Terbaru.",
      engText: "To Continuously Improve Company Competence to Reach the Optimum Efficiency with the Latest Technology Implementation.",
      icon: <Zap className="w-6 h-6 text-teal-400" />,
      color: "teal"
    },
  ];

  const renderMissionItem = (item: MissionItem, index: number) => (
    <div 
      key={index} 
      className={`p-6 bg-gray-900/60 rounded-lg border border-gray-800 hover:border-${item.color === 'orange' ? 'orange-500' : 'teal-400'}/50 transition-all duration-300 shadow-lg transform hover:-translate-y-1`}
    >
      <div className="flex items-start">
        <div className={`w-14 h-14 bg-${item.color === 'orange' ? 'orange-500' : 'teal-400'}/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
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
  );

  return (
    <section 
      ref={sectionRef} 
      id="vision-section" 
      className="py-20 md:py-28 bg-black/90 backdrop-blur-xl text-white relative overflow-hidden border-y border-gray-800"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full -mr-48 -mt-48 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-400/10 to-transparent rounded-full -ml-48 -mb-48 blur-xl"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className={`absolute w-${i % 3 === 0 ? '6' : i % 3 === 1 ? '4' : '2'} h-${i % 3 === 0 ? '6' : i % 3 === 1 ? '4' : '2'} rounded-full 
              ${i % 2 === 0 ? 'bg-orange-500/20' : 'bg-teal-400/20'} 
              animate-float-slow`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

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
              <Eye className="w-8 h-8 text-orange-500 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Vision
              </h2>
            </div>
            <div className="w-24 h-1 bg-orange-500 mb-8" />

            <div className="p-8 bg-gray-900/60 rounded-lg border-l-4 border-orange-500 mb-12 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <p className="text-xl md:text-2xl font-medium text-white italic">
                "To be a Leading Mining and Energy Group to build a Better Living."
              </p>
              <p className="text-md font-medium text-gray-300 italic mt-4">
                "Menjadi Grup Pertambangan dan Energi Terdepan untuk Membangun Kehidupan yang Lebih Baik."
              </p>
            </div>

            {/* Vision Animation */}
            <div className="h-64 mb-8 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                {/* Mining drill animation */}
                <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/2">
                  <div className="w-8 h-32 bg-gray-700 relative animate-pulse">
                    <div className="absolute w-12 h-12 bg-gray-600 -top-12 left-1/2 transform -translate-x-1/2 rounded-t-lg"></div>
                    <div className="absolute w-16 h-2 bg-orange-500 bottom-0 left-1/2 transform -translate-x-1/2 animate-ping opacity-75"></div>
                  </div>
                </div>
                
                {/* Mining landscape */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-800 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-800"></div>
                
                {/* Excavation lines */}
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute bottom-8 left-0 right-0 h-px bg-gray-700"
                    style={{ bottom: `${8 + i * 3}px`, opacity: 0.5 - i * 0.05 }}
                  ></div>
                ))}
                
                {/* Mining vehicles */}
                <div className="absolute bottom-8 right-1/4 w-24 h-12 animate-mining-vehicle">
                  <div className="w-16 h-6 bg-yellow-600 rounded-t-sm"></div>
                  <div className="w-24 h-6 bg-yellow-700 rounded-sm mt-px"></div>
                  <div className="w-6 h-2 bg-black absolute -bottom-2 left-2 rounded-full"></div>
                  <div className="w-6 h-2 bg-black absolute -bottom-2 right-2 rounded-full"></div>
                </div>
                
                {/* Orange glow effects */}
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-orange-500/10 rounded-full filter blur-xl animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-teal-400/10 rounded-full filter blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
                
                {/* Particle effects */}
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-1 h-1 bg-orange-500/40 rounded-full animate-float-fast"
                    style={{
                      top: `${50 + Math.random() * 20}%`,
                      left: `${30 + Math.random() * 10}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Overlay text */}
              <div className="absolute inset-0 flex items-end justify-start p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div>
                  <h3 className="text-xl text-white font-bold mb-2">
                    Building a Better Living
                  </h3>
                  <div className="flex items-center">
                    <div className="w-12 h-0.5 bg-teal-400 mr-3" />
                    <p className="text-gray-200">
                      Through leadership in Mining and Energy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {missionItems.slice(2, 4).map((item, index) => (
                <div key={index} className="p-6 bg-gray-900/60 rounded-lg border border-gray-800 hover:border-teal-400/50 transition-colors shadow-md">
                  <div className="flex items-start">
                    <div className={`w-12 h-12 bg-${item.color === 'orange' ? 'orange-500' : 'teal-400'}/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
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
              <Target className="w-8 h-8 text-teal-400 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Mission
              </h2>
            </div>
            <div className="w-24 h-1 bg-teal-400 mb-8" />

            {/* Mission Animation */}
            <div className="h-64 mb-8 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-cols-8 gap-0">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-full border-r border-teal-400/10"></div>
                  ))}
                </div>
                <div className="absolute inset-0 grid grid-rows-8 gap-0">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-full border-b border-teal-400/10"></div>
                  ))}
                </div>
                
                {/* Circular elements */}
                <div className="absolute top-1/4 left-1/4 w-12 h-12 border-2 border-teal-400/40 rounded-full animate-spin-slow"></div>
                <div className="absolute top-1/3 right-1/3 w-16 h-16 border border-orange-500/30 rounded-full animate-reverse-spin"></div>
                <div className="absolute bottom-1/4 right-1/4 w-10 h-10 border-2 border-teal-400/40 rounded-full animate-ping opacity-60"></div>
                
                {/* Connected lines */}
                <div className="absolute top-1/3 left-1/2 w-1/3 h-px bg-teal-400/30 animate-pulse"></div>
                <div className="absolute top-2/3 right-1/4 w-1/4 h-px bg-orange-500/30 animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-1/3 left-1/4 w-1/4 h-px bg-teal-400/30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                
                {/* Data points */}
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i}
                    className={`absolute w-2 h-2 ${i % 2 === 0 ? 'bg-teal-400/50' : 'bg-orange-500/50'} rounded-full animate-pulse`}
                    style={{
                      top: `${10 + Math.random() * 80}%`,
                      left: `${10 + Math.random() * 80}%`,
                      animationDelay: `${Math.random() * 3}s`
                    }}
                  ></div>
                ))}
                
                {/* Central element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400/20 to-orange-500/20 flex items-center justify-center animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400/30 to-orange-500/30 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white/10"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Overlay text */}
              <div className="absolute inset-0 flex items-end justify-start p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div>
                  <h3 className="text-xl text-white font-bold mb-2">
                    Excellence in Mining Services
                  </h3>
                  <div className="flex items-center">
                    <div className="w-12 h-0.5 bg-orange-500 mr-3" />
                    <p className="text-gray-200">
                      Commitment to quality and innovation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {missionItems.map(renderMissionItem)}
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-40px) translateX(-15px);
            opacity: 0.3;
          }
          75% {
            transform: translateY(-20px) translateX(5px);
            opacity: 0.6;
          }
        }
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        @keyframes float-fast {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-15px);
            opacity: 0.3;
          }
        }
        .animate-float-fast {
          animation: float-fast 2s ease-in-out infinite;
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        
        @keyframes reverse-spin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-reverse-spin {
          animation: reverse-spin 20s linear infinite;
        }
        
        @keyframes mining-vehicle {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-100px);
          }
        }
        .animate-mining-vehicle {
          animation: mining-vehicle 15s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}