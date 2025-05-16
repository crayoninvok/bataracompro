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
          src="https://res.cloudinary.com/dysmj8esf/video/upload/v1747203665/btr2_dmvtlk.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay with more dynamic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-0" />

      {/* Content */}
      <div
        className={`z-10 px-4 max-w-5xl mx-auto transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-lg border border-gray-800">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 leading-tight">
            Coal Transportation Solutions
            <div className="mt-2">
              <span className="font-bold">PT. </span>
              <span className="text-[#1FBFB8] font-extrabold">
                Batara Dharma Persada
              </span>
            </div>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 mb-6 md:mb-8 leading-relaxed">
            A trusted partner for Indonesia-based mining contractor with reliable
            fleets and management systems.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-5 md:mt-6 mb-6 md:mb-8">
            <div className="flex items-center gap-3 justify-center bg-black/50 py-2 px-4 rounded-md backdrop-blur-sm border border-gray-800">
              <div className="bg-[#E85C23]/20 p-2 rounded">
                <Truck className="w-5 h-5 text-[#1FBFB8]" />
              </div>
              <span className="text-base">Modern Fleet</span>
            </div>
            <div className="flex items-center gap-3 justify-center bg-black/50 py-2 px-4 rounded-md backdrop-blur-sm border border-gray-800">
              <div className="bg-[#1FBFB8]/20 p-2 rounded">
                <Shield className="w-5 h-5 text-[#E85C23]" />
              </div>
              <span className="text-base">Guaranteed Safety</span>
            </div>
            <div className="flex items-center gap-3 justify-center bg-black/50 py-2 px-4 rounded-md backdrop-blur-sm border border-gray-800">
              <div className="bg-[#E85C23]/20 p-2 rounded">
                <Award className="w-5 h-5 text-[#1FBFB8]" />
              </div>
              <span className="text-base">Quality Service</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 md:mt-8">
            <Link
              href="/tentang/profil"
              className="bg-[#1FBFB8] hover:bg-[#d14b17] text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-base font-medium transition-all duration-300 shadow-md"
            >
              About Us
            </Link>
            <Link
              href="/proyek"
              className="bg-transparent border border-gray-700 hover:border-[#1FBFB8] hover:bg-[#1FBFB8]/10 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-base font-medium transition-all duration-300"
            >
              Our Project
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with pulsing effect */}
      <div
        className={`absolute bottom-6 md:bottom-8 z-10 cursor-pointer transition-opacity duration-1000 ${
          isVisible ? "opacity-80" : "opacity-0"
        }`}
        onClick={scrollToNextSection}
      >
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-[#E85C23]/20 animate-pulse"></div>
          <ArrowDownCircle className="w-8 h-8 md:w-10 md:h-10 text-[#1FBFB8] relative z-10 animate-bounce" />
        </div>
        <span className="sr-only">Scroll Down</span>
      </div>
    </section>
  );
}