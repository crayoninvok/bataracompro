"use client";

import React, { useEffect, useRef } from "react";

interface CommissionerSectionProps {
  commissioners: {
    name: string;
    position: string;
    experience: string[];
  }[];
}

const CommissionerSection: React.FC<CommissionerSectionProps> = ({ commissioners }) => {
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

    const section = sectionRef.current;
    const targets = section?.querySelectorAll(".comm-animate");

    targets?.forEach((el) => observer.observe(el));

    return () => {
      targets?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 md:px-8 bg-gradient-to-b from-[#1b1b1d] via-[#202124] to-[#2a2c2f] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#0bbfb3]/5 to-transparent rounded-full -mr-48 -mt-48 blur-xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#FF5722]/5 to-transparent rounded-full -ml-48 -mb-48 blur-xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="comm-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 inline-block relative">
            <span className="relative z-10">Commissioner</span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#0bbfb3] to-[#0bbfb3]/20 rounded-full" />
          </h2>
          <p className="text-gray-400 mb-12 max-w-lg">
            Leadership providing strategic guidance and oversight for company operations.
          </p>
        </div>

        {/* List of Commissioners */}
        <div className="space-y-6 mb-16">
          {commissioners.map((commissioner, idx) => (
            <div
              key={idx}
              className={`comm-animate opacity-0 translate-y-8 transition-all duration-700 ease-out delay-[${(idx + 1) * 150}ms]`}
            >
              <div className="w-full md:w-2/3 rounded-xl bg-gradient-to-r from-gray-900 to-[#121212] shadow-lg border border-gray-800 p-6">
                <h3 className="text-[#FF5722] text-xl font-bold mb-2">{commissioner.name}</h3>
                <p className="text-gray-300">{commissioner.position}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Separator */}
        <div className="comm-animate opacity-0 translate-y-8 transition-all duration-700 delay-500 flex items-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          <div className="w-3 h-3 rounded-full bg-[#0bbfb3] mx-4" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-700 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default CommissionerSection;
