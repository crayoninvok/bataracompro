// ImageGallery.jsx
"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import GalleryItem from "./GaleryItem";
import { muaraPahuPhotos, senyiurPhotos } from "@/constants/projectPhotos";

export default function ImageGallery() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-24 relative border-b border-gray-800">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#1FBFB8]/10 to-transparent rounded-full -mr-48 -mt-48" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            <span className="relative z-10 text-white">Operations in the Field</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0" />
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Active coal hauling at Senyiur and on-site preparation for the upcoming
            Muara Pahu project with PT Indonesia Pratama
          </p>
        </div>

        <div className="mb-12 reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <h3 className="text-lg font-semibold text-[#E85C23] uppercase tracking-[0.12em] mb-4">
            Senyiur — Active Operations
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {senyiurPhotos.map((item) => (
              <GalleryItem
                key={item.src}
                imageSrc={item.src}
                title={item.caption}
                location={item.location}
                alt={item.alt}
              />
            ))}
          </div>
        </div>

        <div className="reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <h3 className="text-lg font-semibold text-[#1FBFB8] uppercase tracking-[0.12em] mb-4">
            Muara Pahu — Site Preparation
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {muaraPahuPhotos.map((item) => (
              <GalleryItem
                key={item.src}
                imageSrc={item.src}
                title={item.caption}
                location={item.location}
                alt={item.alt}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <a
            href="/tentang/projects-gallery"
            className="inline-flex items-center bg-[#1FBFB8] hover:bg-[#1BABA5] text-black px-8 py-4 rounded-md transition-colors shadow-lg text-lg group"
          >
            <span>See More</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
