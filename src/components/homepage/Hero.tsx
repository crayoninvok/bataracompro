"use client";

import React, { useState, useEffect } from "react";
import { ArrowDownCircle, Truck, Shield, Award } from "lucide-react";
import Link from "next/link";

export default function HeroWithVideo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector("section:nth-of-type(2)");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-white text-center pt-16 md:pt-20">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://res.cloudinary.com/djgsaixee/video/upload/v1746525539/truck_xmbvmn.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay with more dynamic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#5B5B5F]/60 to-black/80 z-0" />

      {/* Content */}
      <div
        className={`z-10 px-4 max-w-5xl mx-auto transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Coal Transportation Solutions
            <div className="mt-3">
              <span className="font-bold">PT. </span>
              <span className="text-[#E85C23] font-extrabold">
                Batara Dharma Persada
              </span>
            </div>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-100 mb-8 md:mb-10 leading-relaxed">
            A trusted partner for coal transportation needs with reliable
            fleets and management systems.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 mt-6 md:mt-8 mb-8 md:mb-10">
            <div className="flex items-center gap-3 justify-center bg-black/30 py-2 px-4 rounded-full backdrop-blur-sm">
              <div className="bg-[#E85C23]/30 p-2 rounded-full">
                <Truck className="w-5 h-5 md:w-6 md:h-6 text-[#E85C23]" />
              </div>
              <span className="text-base md:text-lg">Modern Fleet</span>
            </div>
            <div className="flex items-center gap-3 justify-center bg-black/30 py-2 px-4 rounded-full backdrop-blur-sm">
              <div className="bg-[#1FBFB8]/30 p-2 rounded-full">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#1FBFB8]" />
              </div>
              <span className="text-base md:text-lg">Guaranteed Safety</span>
            </div>
            <div className="flex items-center gap-3 justify-center bg-black/30 py-2 px-4 rounded-full backdrop-blur-sm">
              <div className="bg-[#E85C23]/30 p-2 rounded-full">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-[#E85C23]" />
              </div>
              <span className="text-base md:text-lg">Quality Service</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mt-8 md:mt-10">
            <Link
              href="/tentang/profil"
              className="group bg-[#E85C23] hover:bg-[#E85C23]/90 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-base md:text-lg font-medium transition-all duration-300 shadow-lg shadow-[#E85C23]/20 hover:shadow-[#E85C23]/40 relative overflow-hidden"
            >
              <span className="relative z-10">About Us</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#E85C23] to-[#d14b17] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link
              href="/proyek"
              className="group bg-transparent border-2 border-white/70 hover:border-[#1FBFB8] hover:bg-[#1FBFB8]/10 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-base md:text-lg font-medium transition-all duration-300 shadow-lg shadow-black/5 hover:shadow-[#1FBFB8]/20"
            >
              Our Project
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with pulsing effect */}
      <div
        className={`absolute bottom-8 md:bottom-10 z-10 cursor-pointer transition-opacity duration-1000 ${
          isVisible ? "opacity-90" : "opacity-0"
        }`}
        onClick={scrollToNextSection}
      >
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-[#E85C23]/30 animate-pulse"></div>
          <ArrowDownCircle className="w-10 h-10 md:w-12 md:h-12 text-[#E85C23] relative z-10 animate-bounce" />
        </div>
        <span className="sr-only">Scroll Down</span>
      </div>
    </section>
  );
}