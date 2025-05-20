"use client";

import React, { useState, useEffect, useRef } from "react";
import { Compass, Sparkles } from "lucide-react";

export default function VisionMissionSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-gradient-to-br from-[#1A1A1D] via-gray-900 to-black overflow-hidden"
    >
      {/* Optional: Keep only one accent background */}
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-[#E85C23]/10 to-transparent" />

      {/* Subtle animated hexagon pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute w-full h-full"
          style={{
            backgroundImage: "url('/hex-pattern.svg')",
            backgroundSize: "120px",
            opacity: 0.08,
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Vision Section */}
          <div className="max-w-5xl mx-auto mb-32">
            <div className="flex items-center mb-10">
              <div className="w-16 h-1 bg-gradient-to-r from-[#E85C23] to-[#1FBFB8]" />
              <h2 className="text-4xl md:text-5xl font-bold text-white ml-6">
                <span className="text-[#E85C23]">VISION</span>
              </h2>
            </div>
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/70 p-12 rounded-2xl border-l-4 border-[#1FBFB8] shadow-xl backdrop-blur-lg transform hover:scale-[1.01] transition-all duration-300">
              <div className="absolute -bottom-4 -right-4">
                <Compass className="w-16 h-16 text-[#1FBFB8]/10" />
              </div>
              <p className="text-3xl text-white leading-relaxed font-light">
                To be a{" "}
                <span className="font-semibold text-[#1FBFB8] relative">
                  Leading Mining and Energy Group
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-[#1FBFB8]/30"></span>
                </span>{" "}
                to build a Better Living.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-10">
              <div className="w-16 h-1 bg-gradient-to-r from-[#E85C23] to-[#1FBFB8]" />
              <h2 className="text-4xl md:text-5xl font-bold text-white ml-6">
                <span className="text-[#E85C23]">MISSION</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Item 1 */}
              <div className="group bg-gradient-to-r from-gray-800/30 to-gray-900/50 p-10 rounded-2xl border-l-4 border-[#1FBFB8] shadow-xl backdrop-blur-lg hover:bg-gray-800/60 transition-all duration-500 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#1FBFB8]/20 flex items-center justify-center mr-4 group-hover:bg-[#1FBFB8]/30 transition-all duration-300">
                    <Sparkles className="w-6 h-6 text-[#1FBFB8]" />
                  </div>
                  <div>
                    <span className="text-[#1FBFB8] text-xs font-medium tracking-wider">
                      01
                    </span>
                    <h3 className="text-xl font-semibold text-white/90">Create Value</h3>
                  </div>
                </div>
                <p className="text-lg text-white/80 leading-relaxed pl-16">
                  To Create Value and Make a Difference to Provide Distinct and Beneficial Products and Services in Energy and Mining Business.
                </p>
              </div>

              {/* Mission Item 2 */}
              <div className="group bg-gradient-to-r from-gray-800/30 to-gray-900/50 p-10 rounded-2xl border-l-4 border-[#1FBFB8] shadow-xl backdrop-blur-lg hover:bg-gray-800/60 transition-all duration-500 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#1FBFB8]/20 flex items-center justify-center mr-4 group-hover:bg-[#1FBFB8]/30 transition-all duration-300">
                    <Sparkles className="w-6 h-6 text-[#1FBFB8]" />
                  </div>
                  <div>
                    <span className="text-[#1FBFB8] text-xs font-medium tracking-wider">
                      02
                    </span>
                    <h3 className="text-xl font-semibold text-white/90">Deliver Excellence</h3>
                  </div>
                </div>
                <p className="text-lg text-white/80 leading-relaxed pl-16">
                  To Deliver the Best Service to Our Customer in Mining Service Industry.
                </p>
              </div>

              {/* Mission Item 3 */}
              <div className="group bg-gradient-to-r from-gray-800/30 to-gray-900/50 p-10 rounded-2xl border-l-4 border-[#1FBFB8] shadow-xl backdrop-blur-lg hover:bg-gray-800/60 transition-all duration-500 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#1FBFB8]/20 flex items-center justify-center mr-4 group-hover:bg-[#1FBFB8]/30 transition-all duration-300">
                    <Sparkles className="w-6 h-6 text-[#1FBFB8]" />
                  </div>
                  <div>
                    <span className="text-[#1FBFB8] text-xs font-medium tracking-wider">
                      03
                    </span>
                    <h3 className="text-xl font-semibold text-white/90">Develop Human Capital</h3>
                  </div>
                </div>
                <p className="text-lg text-white/80 leading-relaxed pl-16">
                  To Develop and Continously Improve Human Capital for a Brighter Future.
                </p>
              </div>

              {/* Mission Item 4 */}
              <div className="group bg-gradient-to-br from-gray-800/30 to-gray-900/50 p-10 rounded-2xl border-l-4 border-[#1FBFB8] shadow-xl backdrop-blur-lg hover:bg-gray-800/60 transition-all duration-500 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#1FBFB8]/20 flex items-center justify-center mr-4 group-hover:bg-[#1FBFB8]/30 transition-all duration-300">
                    <Sparkles className="w-6 h-6 text-[#1FBFB8]" />
                  </div>
                  <div>
                    <span className="text-[#1FBFB8] text-xs font-medium tracking-wider">
                      04
                    </span>
                    <h3 className="text-xl font-semibold text-white/90">Optimize Efficiency</h3>
                  </div>
                </div>
                <p className="text-lg text-white/80 leading-relaxed pl-16">
                  To Continuously Improve Company Competence to Reach the Optimum Efficiency with the Latest Technology Implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
