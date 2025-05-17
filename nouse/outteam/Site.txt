"use client";

import React from "react";

interface SiteManager {
  name: string;
  position: string;
  description: string;
  image: string;
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
  onSelect 
}) => {
  return (
    <section className="py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 border-l-4 border-[#0bbfb3] pl-4">Project Site</h2>
        
        <div className="bg-[#444444] rounded-md p-6 mt-8 max-w-3xl mx-auto mb-16">
          <div className="flex items-center mb-2">
            <span className="text-white text-lg mr-3">Project site</span>
            <span className="text-[#FF5722] text-xl">🔥</span>
            <span className="text-white font-bold ml-2 text-xl">{siteCompany}</span>
          </div>
          <p className="text-[#0bbfb3] mb-8">{siteLocation}</p>

          {/* Site Managers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {siteManagers.map((manager, idx) => (
              <div 
                key={idx} 
                className="w-full h-24 rounded-xl bg-[#171717] shadow-lg flex flex-col justify-center px-6 border-l-4 border-[#0bbfb3] cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={() => onSelect(manager)}
              >
                <h3 className="text-[#FF5722] text-xl font-bold">{manager.name}</h3>
                <p className="text-white text-lg italic">{manager.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteManagersSection;