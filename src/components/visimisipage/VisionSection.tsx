"use client";

import React, { useState, useEffect } from "react";

export default function VisionMissionSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-[#1FBFB8]/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-tr from-[#E85C23]/5 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div 
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Vision Section */}
          <div className="max-w-5xl mx-auto mb-24">
            <div className="flex items-center mb-8">
              <div className="w-12 h-1 bg-[#E85C23]" />
              <h2 className="text-4xl md:text-5xl font-bold text-[#E85C23] ml-4">VISION</h2>
            </div>
            <div className="bg-gray-800/40 p-10 rounded-xl border-l-4 border-[#1FBFB8] shadow-lg backdrop-blur-sm">
              <p className="text-2xl text-white leading-relaxed font-light">
                To be a <span className="font-medium text-[#1FBFB8]">Leading Mining and Energy Group</span> to built a Better Living.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="w-12 h-1 bg-[#E85C23]" />
              <h2 className="text-4xl md:text-5xl font-bold text-[#E85C23] ml-4">MISSION</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800/40 p-8 rounded-xl border-l-4 border-[#1FBFB8] shadow-lg backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1FBFB8]/20 flex items-center justify-center mr-3">
                    <span className="text-[#1FBFB8] font-bold">01</span>
                  </div>
                  <h3 className="text-lg font-medium text-white/90">Create Value</h3>
                </div>
                <p className="text-lg text-white/80 leading-relaxed">
                  To Create Value and Make a Difference to Provide Distinct and 
                  Beneficial Products and Services in Energy and Mining Business.
                </p>
              </div>
              
              <div className="bg-gray-800/40 p-8 rounded-xl border-l-4 border-[#1FBFB8] shadow-lg backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1FBFB8]/20 flex items-center justify-center mr-3">
                    <span className="text-[#1FBFB8] font-bold">02</span>
                  </div>
                  <h3 className="text-lg font-medium text-white/90">Deliver Excellence</h3>
                </div>
                <p className="text-lg text-white/80 leading-relaxed">
                  To Deliver the Best Service to Our Customer in Mining Service Industry.
                </p>
              </div>
              
              <div className="bg-gray-800/40 p-8 rounded-xl border-l-4 border-[#1FBFB8] shadow-lg backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1FBFB8]/20 flex items-center justify-center mr-3">
                    <span className="text-[#1FBFB8] font-bold">03</span>
                  </div>
                  <h3 className="text-lg font-medium text-white/90">Develop Human Capital</h3>
                </div>
                <p className="text-lg text-white/80 leading-relaxed">
                  To Develop and Continously Improve Human Capital for a Brighter Future.
                </p>
              </div>
              
              <div className="bg-gray-800/40 p-8 rounded-xl border-l-4 border-[#1FBFB8] shadow-lg backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1FBFB8]/20 flex items-center justify-center mr-3">
                    <span className="text-[#1FBFB8] font-bold">04</span>
                  </div>
                  <h3 className="text-lg font-medium text-white/90">Optimize Efficiency</h3>
                </div>
                <p className="text-lg text-white/80 leading-relaxed">
                  To Continuously Improve Company Competence to Reach the Optimum Efficiency with 
                  the Lastest Technology Implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}