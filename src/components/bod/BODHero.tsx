"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  showToggle?: boolean;
  showOrgChart?: boolean;
  onToggleView?: () => void;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  showToggle = false, 
  showOrgChart = false,
  onToggleView
}) => {
  return (
    <section className="relative py-28 overflow-hidden border-b border-gray-800">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48" />
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747206106/IMG_0002_rjugv5.jpg"
          alt="Mining operations"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="relative inline-block">
              <span className="relative z-10">{title}</span>
              <span
                className="absolute bottom-0 left-0 w-full h-3 bg-[#E85C23]/30 z-0"
                style={{ bottom: "5px" }}
              />
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          
          {showToggle && onToggleView && (
            <div className="flex justify-center space-x-4 mb-8">
              <button 
                onClick={onToggleView}
                className={`px-4 py-2 rounded-md ${!showOrgChart ? 'bg-[#1FBFB8] text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Card View
              </button>
              <button 
                onClick={onToggleView}
                className={`px-4 py-2 rounded-md ${showOrgChart ? 'bg-[#1FBFB8] text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Org Chart
              </button>
            </div>
          )}
          
          <div className="animate-bounce mt-4">
            <ChevronRight className="w-8 h-8 text-[#1FBFB8] transform rotate-90" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;