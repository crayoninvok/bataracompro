"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { MapPin, Building, User, Award } from "lucide-react";

interface SiteManager {
  name: string;
  position: string;
  image: string;
  experience: string[];
}

interface SiteManagersSectionProps {
  siteManagers: SiteManager[];
  siteCompany: string;
  siteLocation: string;
  onSelect: (manager: SiteManager) => void;
}

const SiteManagersSection: React.FC<SiteManagersSectionProps> = ({
  siteManagers,
  siteCompany,
  siteLocation,
  onSelect,
}) => {
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

    const elements = document.querySelectorAll(".site-animate");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 md:px-8 bg-gradient-to-b from-[#2a2c2f] via-[#202124] to-[#1b1b1d] relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FF5722]/5 to-transparent rounded-full -mr-48 -mt-48 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#0bbfb3]/5 to-transparent rounded-full -ml-48 -mb-48 blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-[#0bbfb3]/3 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="site-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 inline-block relative">
            <span className="relative z-10">Project Site</span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#FF5722] to-[#FF5722]/20 rounded-full"></span>
          </h2>
          <p className="text-gray-400 mb-12 max-w-lg">
            On-location leadership managing day-to-day operations and site
            excellence
          </p>
        </div>

        {/* Info Box */}
        <div className="site-animate opacity-0 translate-y-8 transition-all duration-700 delay-200">
          <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-2xl p-8 border border-gray-800 shadow-2xl relative backdrop-blur-sm">
            {/* Project Info */}
            <div className="relative z-10 mb-10 border-b border-gray-800 pb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center mb-6">
                    <Building className="w-6 h-6 text-[#0bbfb3] mr-3" />
                    <h3 className="text-2xl font-bold text-white">
                      Project Information
                    </h3>
                  </div>
                  <div className="flex items-start mb-4">
                    <div className="flex items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/idpnologo.png"
                          alt="Indonesia Pratama Logo"
                          width={120}
                          height={40}
                        />
                        <p className="text-white font-bold text-xl">
                          {siteCompany}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-2.5 rounded-lg bg-[#0bbfb3]/10 border border-[#0bbfb3]/20 mr-4">
                      <MapPin className="w-5 h-5 text-[#0bbfb3]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm uppercase">
                        Location
                      </p>
                      <p className="text-white text-xl mt-1">{siteLocation}</p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-center">
                  <div className="py-3 px-5 rounded-lg bg-gray-900/80 border border-gray-800">
                    <Award className="w-6 h-6 text-[#FF5722] mr-2" />
                    <span className="text-white font-medium">
                      Active Project
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Site Managers */}
            <div>
              <div className="flex items-center mb-8">
                <User className="w-5 h-5 text-[#0bbfb3] mr-3" />
                <h3 className="text-xl font-bold text-white">
                  Site Leadership Team
                </h3>
                <div className="ml-3 h-px w-20 bg-gradient-to-r from-[#0bbfb3] to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {siteManagers.map((manager, idx) => (
                  <div
                    key={idx}
                    className={`site-animate opacity-0 translate-y-8 transition-all duration-700 delay-${
                      300 + idx * 100
                    }`}
                  >
                    <div
                      className="group bg-gradient-to-b from-[#101010] to-[#080808] rounded-xl border border-gray-800 hover:border-[#0bbfb3]/50 shadow-lg cursor-pointer overflow-hidden transition-all duration-300"
                      onClick={() => onSelect(manager)}
                    >
                      <div className="flex items-center p-5">
                        <div className="w-20 h-20 rounded-full bg-gray-900 p-1 mr-5 flex-shrink-0">
                          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-black">
                            <Image
                              src={manager.image}
                              alt={manager.name}
                              fill
                              className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white text-lg font-bold group-hover:text-[#FF5722] transition-colors">
                            {manager.name}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {manager.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteManagersSection;
