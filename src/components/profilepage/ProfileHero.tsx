"use client";

import React, { useState, useEffect } from "react";

export default function ProfileHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-[#5B5B5F]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#3F3F42] to-[#5B5B5F] opacity-90" />
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Company Profile
          </h1>
          <p className="text-xl text-gray-100 mb-8 leading-relaxed">
          Get to know PT. Batara Dharma Persada as a trusted mining and hauling partner in Indonesia.
          </p>
          <div className="w-24 h-1 bg-[#E85C23] mx-auto" />
        </div>
      </div>
    </section>
  );
}