"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface HeroHeaderProps {
  title: string;
  description: string;
  backgroundImage: string;
}

export default function HeroHeader({
  title,
  description,
  backgroundImage,
}: HeroHeaderProps): React.ReactNode {
  return (
    <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden border-b border-gray-800">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48" />
      
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={backgroundImage}
          alt="Background image"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-[length:60px_60px] z-0" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="w-full h-0.5 bg-[#E85C23]/30 mt-2" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="relative inline-block">
              <span className="relative z-10">{title}</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-[#E85C23]/30 z-0" style={{ bottom: "5px" }} />
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="animate-bounce mt-8">
            <ChevronRight className="w-8 h-8 text-[#1FBFB8] transform rotate-90" />
          </div>
        </div>
      </div>
    </section>
  );
}
