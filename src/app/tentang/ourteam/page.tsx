"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

// Hero component included directly to avoid import issues
const Hero = ({ 
  title, 
  subtitle
}: { 
  title: string; 
  subtitle: string;
}) => {
  return (
    <section className="relative py-28 overflow-hidden border-b border-gray-800">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48" />
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747206106/IMG_0002_rjugv5.jpg"
          alt="Mining operations"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="relative inline-block">
              <span className="relative z-10">{title}</span>
              <span
                className="absolute bottom-0 left-0 w-full h-3 bg-[#E85C23]/30 z-0"
                style={{ bottom: "5px" }}
              />
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default function OurTeam() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string>("");
  const [activeTitle, setActiveTitle] = useState<string>("");

  const openModal = (imagePath: string, title: string) => {
    setActiveImage(imagePath);
    setActiveTitle(title);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-black/90">
      <Hero 
        title="Our Team Structure" 
        subtitle="Our organization is built for operational excellence and strategic growth" 
      />
      
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-[#0bbfb3] pl-4">
            Organizational Structure
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Head Office Structure */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative h-96 group">
                <Image
                  src="/teamoffice.png"
                  alt="Head Office Organizational Structure"
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => openModal("/teamoffice.png", "Head Office Structure")}
                    className="bg-[#0bbfb3] text-white p-3 rounded-full hover:bg-[#0aa9a4]"
                  >
                    <ZoomIn size={24} />
                  </button>
                </div>
              </div>
              <div className="p-4 bg-[#171717] border-l-4 border-[#0bbfb3]">
                <h3 className="text-xl font-bold text-[#FF5722]">Head Office Structure</h3>
                <p className="text-gray-300 mt-1">Our corporate leadership and support teams</p>
              </div>
            </div>
            
            {/* Operation Site Structure */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative h-96 group">
                <Image
                  src="/sosite.jpeg"
                  alt="Operation Site Organizational Structure"
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => openModal("/sosite.jpeg", "Operation Site Structure")}
                    className="bg-[#0bbfb3] text-white p-3 rounded-full hover:bg-[#0aa9a4]"
                  >
                    <ZoomIn size={24} />
                  </button>
                </div>
              </div>
              <div className="p-4 bg-[#171717] border-l-4 border-[#0bbfb3]">
                <h3 className="text-xl font-bold text-[#FF5722]">Operation Site Structure</h3>
                <p className="text-gray-300 mt-1">Our field operations and project management teams</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl h-[90vh]">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/70 text-white p-2 rounded-full hover:bg-black/90"
            >
              <X size={24} />
            </button>
            
            <div className="absolute top-4 left-4 z-10 bg-black/70 text-white py-2 px-4 rounded-md">
              <h3 className="font-medium">{activeTitle}</h3>
            </div>
            
            <div className="relative w-full h-full">
              <Image
                src={activeImage}
                alt={activeTitle}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}