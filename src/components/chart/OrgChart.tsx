"use client";

import React from "react";

const OrgChart = () => {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Commissioner */}
        <div className="flex justify-start mb-16">
          <div className="w-80 h-24 rounded-xl bg-[#171717] shadow-lg flex flex-col justify-center px-6 border-l-4 border-[#0bbfb3]">
            <h3 className="text-[#FF5722] text-xl font-bold">Lauw Lie In</h3>
            <p className="text-white text-lg italic">Commissioner</p>
          </div>
        </div>

        {/* Dotted line separator */}
        <div className="border-b border-gray-300 border-dashed mb-16"></div>

        {/* Directors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="w-full h-24 rounded-xl bg-[#171717] shadow-lg flex flex-col justify-center px-6 border-l-4 border-[#0bbfb3]">
            <h3 className="text-[#FF5722] text-xl font-bold">A. Kurnia</h3>
            <p className="text-white text-lg italic">President Director</p>
          </div>
          <div className="w-full h-24 rounded-xl bg-[#171717] shadow-lg flex flex-col justify-center px-6 border-l-4 border-[#0bbfb3]">
            <h3 className="text-[#FF5722] text-xl font-bold">Eric Ng</h3>
            <p className="text-white text-lg italic">Director</p>
          </div>
          <div className="w-full h-24 rounded-xl bg-[#171717] shadow-lg flex flex-col justify-center px-6 border-l-4 border-[#0bbfb3]">
            <h3 className="text-[#FF5722] text-xl font-bold">Yohanes C. Wibowo</h3>
            <p className="text-white text-lg italic">Operations Director</p>
          </div>
        </div>

        {/* Dotted line separator */}
        <div className="border-b border-gray-300 border-dashed mb-16"></div>

        {/* Managers */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="w-full h-24 rounded-xl bg-[#171717] shadow-lg flex flex-col justify-center px-6 border-l-4 border-[#0bbfb3] relative">
            <h3 className="text-[#FF5722] text-xl font-bold">Dio Tragitza Rescha</h3>
            <p className="text-white text-lg italic">Operations Manager</p>
            {/* Vertical connecting line below this manager */}
            <div className="absolute bottom-0 left-1/2 w-0.5 h-16 bg-[#0bbfb3] transform -translate-x-1/2 translate-y-full"></div>
          </div>
          <div className="w-full h-24 rounded-xl bg-[#171717] shadow-lg flex flex-col justify-center px-6 border-l-4 border-[#0bbfb3]">
            <h3 className="text-[#FF5722] text-xl font-bold">Dadang Setyawan</h3>
            <p className="text-white text-lg italic">Manager</p>
          </div>
          <div className="w-full h-24 rounded-xl bg-[#171717] shadow-lg flex flex-col justify-center px-6 border-l-4 border-[#0bbfb3]">
            <h3 className="text-[#FF5722] text-xl font-bold">A. Heru Prastowo</h3>
            <p className="text-white text-lg italic">Manager</p>
          </div>
          <div className="w-full h-24 rounded-xl bg-[#171717] shadow-lg flex flex-col justify-center px-6 border-l-4 border-[#0bbfb3]">
            <h3 className="text-[#FF5722] text-xl font-bold">Susanto</h3>
            <p className="text-white text-lg italic">Manager</p>
          </div>
        </div>

        {/* Project Site Box */}
        <div className="bg-[#444444] rounded-md p-6 mt-8 max-w-3xl mx-auto">
          <div className="flex items-center mb-2">
            <span className="text-white text-lg mr-3">Project site</span>
            <span className="text-[#FF5722] text-xl">🔥</span>
            <span className="text-white font-bold ml-2 text-xl">PT INDONESIA PRATAMA</span>
          </div>
          <p className="text-[#0bbfb3] mb-8">Senyiur, East Kalimantan</p>

          {/* Site Managers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full h-24 rounded-xl bg-[#171717] shadow-lg flex flex-col justify-center px-6 border-l-4 border-[#0bbfb3]">
              <h3 className="text-[#FF5722] text-xl font-bold">Anggi Okta Yudha P.</h3>
              <p className="text-white text-lg italic">Project Site Manager</p>
            </div>
            <div className="w-full h-24 rounded-xl bg-[#171717] shadow-lg flex flex-col justify-center px-6 border-l-4 border-[#0bbfb3]">
              <h3 className="text-[#FF5722] text-xl font-bold">Zulfahmi</h3>
              <p className="text-white text-lg italic">Deputy Site Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgChart;