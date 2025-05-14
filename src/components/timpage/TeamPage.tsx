"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export default function TeamPage() {
  const directors = [
    {
      name: "A. Kurnia",
      position: "President Director",
      specialization: "Strategic Leadership & Business Development"
    },
    {
      name: "Eric NG",
      position: "Vice President Director",
      specialization: "Finance & Corporate Management"
    },
    {
      name: "Yohanes C. Wibowo",
      position: "Operation Director",
      specialization: "Mining Operations & Technical Excellence"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-black/80 backdrop-blur-lg text-white relative overflow-hidden border-y border-gray-800">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            <span className="relative z-10 text-white">Board of Directors</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0"></span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto italic">
            The Board of Directors comprises seasoned professionals who provide
            strategic direction, ensure good corporate governance, and uphold the
            company's values in achieving sustainable growth.
          </p>
        </div>

        {/* Org Chart */}
        <div className="flex flex-col items-center relative space-y-12 max-w-3xl mx-auto">
          {directors.map((director, index) => (
            <React.Fragment key={index}>
              <div className="w-full">
                <div className="bg-gray-900/80 rounded-lg p-8 border border-gray-800 hover:border-[#E85C23] transition-colors shadow-lg group relative overflow-hidden">
                  {/* Background accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E85C23] to-[#1FBFB8]"></div>
                  <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#E85C23]/5 rounded-full blur-md group-hover:bg-[#E85C23]/10 transition-all"></div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#E85C23] mb-2">{director.name}</h3>
                    <p className="text-white text-lg mb-3">{director.position}</p>
                    <div className="w-16 h-0.5 bg-[#1FBFB8]/50 mx-auto mb-3"></div>
                    <p className="text-gray-400 text-sm">{director.specialization}</p>
                  </div>
                </div>
              </div>
              
              {index < directors.length - 1 && (
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-10 bg-gradient-to-b from-[#E85C23] to-[#1FBFB8]"></div>
                  <ChevronDown className="w-6 h-6 text-[#1FBFB8] animate-bounce" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}