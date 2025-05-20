"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface Manager {
  name: string;
  position: string;
  image: string;
  experience: string[];
}

interface ManagersSectionProps {
  managers: Manager[];
  onSelect: (manager: Manager) => void;
}

const ManagersSection: React.FC<ManagersSectionProps> = ({ managers, onSelect }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".man-animate");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 md:px-8 bg-gradient-to-b from-[#2a2c2f] via-[#202124] to-[#2a2c2f] relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#0bbfb3]/5 to-transparent rounded-full -ml-48 -mt-48 blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-[#FF5722]/5 to-transparent rounded-full -mr-48 -mb-48 blur-xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="man-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 inline-block relative">
            <span className="relative z-10">Managers</span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#0bbfb3] to-[#0bbfb3]/20 rounded-full"></span>
          </h2>
          <p className="text-gray-400 mb-12 max-w-lg">
            Experienced professionals leading day-to-day operational execution across the organization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {managers.map((manager, idx) => (
            <div
              key={idx}
              className={`man-animate opacity-0 translate-y-8 transition-all duration-700 delay-[${idx * 100}ms]`}
            >
              <div
                className="group h-full rounded-xl bg-gradient-to-b from-[#171717] to-[#0b0b0b] shadow-lg hover:shadow-xl border border-gray-800 hover:border-[#FF5722]/50 cursor-pointer transition-all duration-300 overflow-hidden"
                onClick={() => onSelect(manager)}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={manager.image}
                    alt={manager.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                </div>

                <div className="relative p-6">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FF5722]/10 to-transparent rounded-bl-full"></div>

                  <h3 className="text-[#0bbfb3] text-xl font-bold group-hover:text-white transition-colors duration-300">
                    {manager.name}
                  </h3>
                  <p className="text-gray-300 text-lg mt-1 font-medium">
                    {manager.position}
                  </p>
                </div>

                <div className="w-full h-1 bg-gradient-to-r from-[#FF5722] via-[#0bbfb3]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative separator */}
        <div className="man-animate opacity-0 translate-y-8 transition-all duration-700 delay-500 flex items-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <div className="w-3 h-3 rounded-full bg-[#0bbfb3] mx-4"></div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-700 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default ManagersSection;
