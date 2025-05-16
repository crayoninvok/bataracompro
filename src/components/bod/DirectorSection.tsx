"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface Director {
  name: string;
  position: string;
  description: string;
  image: string;
}

interface DirectorsSectionProps {
  directors: Director[];
  onSelect: (director: Director) => void;
}

const DirectorsSection: React.FC<DirectorsSectionProps> = ({ directors, onSelect }) => {
  return (
    <section className="py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 border-l-4 border-[#0bbfb3] pl-4">Directors</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {directors.map((director, idx) => (
            <div 
              key={idx}
              className="w-full h-24 rounded-xl bg-[#171717] shadow-lg flex flex-col justify-center px-6 border-l-4 border-[#0bbfb3] cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
              onClick={() => onSelect(director)}
            >
              <h3 className="text-[#FF5722] text-xl font-bold">{director.name}</h3>
              <p className="text-white text-lg italic">{director.position}</p>
            </div>
          ))}
        </div>

        {/* Dotted line separator */}
        <div className="border-b border-gray-700 border-dashed mb-16"></div>
      </div>
    </section>
  );
};

export default DirectorsSection;