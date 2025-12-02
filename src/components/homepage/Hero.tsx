"use client";

import React, { useState, useEffect } from "react";
import { ArrowDownCircle, Truck, Shield, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
    <section className="relative min-h-screen flex flex-col items-center justify-center text-white text-center pt-24 md:pt-28 pb-10 md:pb-0">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://res.cloudinary.com/dg1chwpuo/video/upload/v1764650558/90mb_hy9jhc.mp4"
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
        <div className="bg-black/40 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-lg border border-gray-800">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
            A Trusted Partner in the Mining Industry
          </h1>
          <div className="mt-1 sm:mt-2 text-[#1FBFB8] font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 leading-tight">
            PT Batara Dharma Persada
          </div>
          <p className="text-base sm:text-lg md:text-lg max-w-4xl mx-auto text-gray-200 mb-4 md:mb-6 leading-relaxed">
            We're committed to delivering the best solutions by prioritizing
            safety, productivity and efficiency
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 md:mt-5 mb-5 md:mb-6">
            <div className="flex items-center gap-2 justify-center bg-black/50 py-2 px-3 rounded-md backdrop-blur-sm border border-gray-800">
              <div className="bg-[#E85C23]/20 p-1.5 rounded">
                <Image
                  src="/svg/trailer.svg"
                  alt="Trailer Icon"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </div>

              <span className="text-sm sm:text-base">Modern Fleet</span>
            </div>
            <div className="flex items-center gap-2 justify-center bg-black/50 py-2 px-3 rounded-md backdrop-blur-sm border border-gray-800">
              <div className="bg-[#1FBFB8]/20 p-1.5 rounded">
                <Shield className="w-4 h-4 text-[#E85C23]" />
              </div>
              <span className="text-sm sm:text-base">Guaranteed Safety</span>
            </div>
            <div className="flex items-center gap-2 justify-center bg-black/50 py-2 px-3 rounded-md backdrop-blur-sm border border-gray-800">
              <div className="bg-[#E85C23]/20 p-1.5 rounded">
                <Award className="w-4 h-4 text-[#1FBFB8]" />
              </div>
              <span className="text-sm sm:text-base">Quality Service</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-5 md:mt-6 mb-8 sm:mb-4">
            <Link
              href="/tentang/profil"
              className="bg-[#1FBFB8] hover:bg-[#d14b17] text-black px-5 sm:px-6 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-medium transition-all duration-300 shadow-md"
            >
              About Us
            </Link>
            <Link
              href="/proyek"
              className="bg-transparent border border-gray-700 hover:border-[#1FBFB8] hover:bg-[#1FBFB8]/10 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-medium transition-all duration-300 flex items-center justify-center"
            >
              <span>Our Project</span>
              <ArrowDownCircle className="ml-2 w-4 h-4 rotate-270 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with pulsing effect - hidden on mobile */}
      <div
        className={`absolute bottom-5 md:bottom-8 z-10 cursor-pointer transition-opacity duration-1000 hidden md:block ${
          isVisible ? "opacity-80" : "opacity-0"
        }`}
        onClick={scrollToNextSection}
      >
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-[#E85C23]/20 animate-pulse"></div>
          <ArrowDownCircle className="w-10 h-10 text-[#1FBFB8] relative z-10 animate-bounce" />
        </div>
        <span className="sr-only">Scroll Down</span>
      </div>
    </section>
  );
}
