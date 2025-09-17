"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Play, ArrowRight, X } from "lucide-react";

export default function ProfileHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showVideoModal, setShowVideoModal] = useState(false);

  const achievements = [
    "Leading coal hauling operations across Kalimantan",
    "Trusted partner for major mining corporations", 
    "Advanced fleet management and logistics",
    "Committed to sustainable mining practices"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxOffset = scrollPosition * 0.3;

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  return (
    <section className="relative min-h-screen pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden flex items-center">
      {/* Enhanced Background layers */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#3A3A3D] via-[#2A2A2D] to-[#1F1F23]"
        style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
      />
      
      {/* Interactive gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #E85C23 0%, transparent 50%)`
        }}
      />
      
      {/* Enhanced animated grid pattern */}
      <div 
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-[length:60px_60px]"
        style={{ 
          transform: `translateY(${parallaxOffset * 0.1}px) translateX(${parallaxOffset * 0.05}px)`,
          animation: 'gridMove 20s linear infinite'
        }} 
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'bg-[#E85C23]/40' : 
              i % 3 === 1 ? 'bg-[#1FBFB8]/30' : 'bg-white/20'
            }`}
            style={{
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float${i % 3} ${Math.random() * 12 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 8}s`
            }}
          />
        ))}
      </div>

      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-20 w-32 h-32 border border-[#1FBFB8]/20 rotate-45"
          style={{ 
            animation: 'spin-slow 30s linear infinite'
          }}
        />
        <div 
          className="absolute bottom-32 left-16 w-24 h-24 border border-[#E85C23]/20 rotate-12"
          style={{ 
            animation: 'float1 25s linear infinite',
            animationDelay: '5s'
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Content - Centered */}
          <div
            className={`text-center transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* Company Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1FBFB8]/10 border border-[#1FBFB8]/30 rounded-full text-[#1FBFB8] text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-[#1FBFB8] rounded-full animate-pulse" />
              Established Mining Leader
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10">Company</span>
                <span className="absolute bottom-0 left-0 w-full h-6 bg-[#1FBFB8]/30 -z-1" style={{ bottom: '10px' }} />
              </span>
              <br />
              <span className="text-[#E85C23]">Profile</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Discover how{" "}
              <span className="text-[#1FBFB8] font-semibold relative">
                PT Batara Dharma Persada
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1FBFB8]/50" />
              </span>{" "}
              became Indonesia's trusted mining and hauling partner.
            </p>

            {/* Key Achievements */}
            <div className="mb-12 max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-4 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700/50 transition-all duration-700 hover:border-[#1FBFB8]/50 ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 200 + 800}ms` }}
                  >
                    <div className="w-3 h-3 bg-[#E85C23] rounded-full flex-shrink-0" />
                    <span className="text-gray-300 text-left">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              <a 
                href="/kontak" 
                className="group px-10 py-5 bg-[#1FBFB8] text-white font-semibold rounded-xl hover:bg-[#1FBFB8]/90 transition-all duration-300 shadow-lg hover:shadow-[#1FBFB8]/25 hover:scale-105 flex items-center gap-3 text-lg"
              >
                Contact Our Team
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <button 
                onClick={openVideoModal}
                className="group px-10 py-5 border-2 border-[#E85C23] text-[#E85C23] hover:bg-[#E85C23]/10 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 text-lg font-semibold"
              >
                <Play className="w-5 h-5" />
                Watch Overview
              </button>
            </div>

            {/* Company Video - Autoplay */}
            <div
              className={`max-w-2xl mx-auto transition-all duration-1000 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="relative group">
                <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-600">
                  {/* YouTube Video with Autoplay */}
                  <iframe
                    src="https://www.youtube.com/embed/yydW0al4t5w?autoplay=1&mute=1&loop=1&playlist=yydW0al4t5w&rel=0&modestbranding=1&controls=1&showinfo=0"
                    title="PT Batara Dharma Persada - Company Overview"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  
                  {/* Overlay with company info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                    <h3 className="text-white font-semibold text-lg mb-1">PT Batara Dharma Persada</h3>
                    <p className="text-gray-300 text-sm">Mining Excellence Journey</p>
                  </div>
                  
                  {/* Fullscreen button */}
                  <button
                    onClick={openVideoModal}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors duration-300"
                    title="Open fullscreen"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full aspect-video">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 z-10 bg-white/10 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* YouTube Embed */}
            <iframe
              src="https://www.youtube.com/embed/yydW0al4t5w?autoplay=1&mute=1&rel=0&modestbranding=1&enablejsapi=1"
              title="PT Batara Dharma Persada - Tambang Kalimantan Official"
              className="w-full h-full rounded-xl border border-gray-600"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '1.2s' }}
      >
        <span className="text-sm font-medium">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float1 {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-15px) translateX(8px) rotate(120deg); }
          66% { transform: translateY(5px) translateX(-5px) rotate(240deg); }
          100% { transform: translateY(0) translateX(0) rotate(360deg); }
        }
        @keyframes float2 {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-25px) translateX(15px) rotate(180deg); }
          100% { transform: translateY(0) translateX(0) rotate(360deg); }
        }
        @keyframes float0 {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}