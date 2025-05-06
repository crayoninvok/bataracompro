"use client";

import React, { useState, useEffect } from "react";
import { ArrowDownCircle, Truck, Shield } from "lucide-react";
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40 z-0" />

      {/* Content */}
      <div
        className={`z-10 px-4 max-w-5xl mx-auto transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
          Solusi Transportasi Batubara
          <div className="mt-2">
            <span className="font-bold">PT. </span>
            <span className="text-orange-400 font-extrabold">
              Batara Dharma Persada
            </span>
          </div>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-100 mb-6 md:mb-8 leading-relaxed">
          Mitra terpercaya untuk kebutuhan transportasi batubara dengan armada
          dan sistem manajemen yang handal
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-4 md:mt-6 mb-6 md:mb-10">
          <div className="flex items-center gap-2 justify-center">
            <div className="bg-orange-500/30 p-2 rounded-full">
              <Truck className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
            </div>
            <span className="text-base md:text-lg">Armada Modern</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <div className="bg-orange-500/30 p-2 rounded-full">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
            </div>
            <span className="text-base md:text-lg">Keamanan Terjamin</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-6 md:mt-8">
          <Link
            href="/tentang/profil"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md text-base md:text-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            Tentang Kami
          </Link>
          <Link
            href="/layanan"
            className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md text-base md:text-lg font-medium transition-all duration-300"
          >
            Layanan Kami
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-6 md:bottom-8 z-10 cursor-pointer animate-bounce transition-opacity duration-1000 ${
          isVisible ? "opacity-80" : "opacity-0"
        }`}
        onClick={scrollToNextSection}
      >
        <ArrowDownCircle className="w-8 h-8 md:w-10 md:h-10" />
        <span className="sr-only">Scroll Down</span>
      </div>
    </section>
  );
}
