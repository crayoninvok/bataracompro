"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function ProfileHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Parallax effect calculation
  const parallaxOffset = scrollPosition * 0.3;

  return (
    <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
      {/* Background layers */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#3A3A3D] to-[#1F1F23]"
        style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
      />
      
      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-[length:60px_60px]"
        style={{ 
          transform: `translateY(${parallaxOffset * 0.1}px)`,
          animation: 'gridMove 20s linear infinite'
        }} 
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#E85C23]/30"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-block mb-6">
            <div className="w-full h-0.5 bg-[#E85C23]/30 mt-2" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="relative inline-block">
              <span className="relative z-10">Company Profile</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-[#1BABA5]/30 -z-1" style={{ bottom: '5px' }} />
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover how <span className="text-[#1FBFB8] font-medium">PT Batara Dharma Persada</span> became a trusted mining and hauling partner across Indonesia's resource sector.
          </p>
          
          <div className="flex justify-center space-x-3">
            <a 
              href="/kontak" 
              className="px-6 py-3 border-2 border-[#1FBFB8] text-[#1FBFB8] hover:bg-[#1FBFB8]/10 rounded-md transition-all"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
      `}</style>
    </section>
  );
}