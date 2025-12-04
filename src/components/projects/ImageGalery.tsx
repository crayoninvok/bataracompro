// ImageGallery.jsx
"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import GalleryItem from "./GaleryItem";

export default function ImageGallery() {
  const galleryItems = [
    {
      imageSrc:
        "https://res.cloudinary.com/dg1chwpuo/image/upload/v1764811142/WhatsApp_Image_2024-12-23_at_11.34.03_et4qvl.jpg",
      title: "Mining Operations",
      location: "Tabang, East Kalimantan",
      alt: "Mining Operations Pitstop",
    },
    {
      imageSrc:
        "https://res.cloudinary.com/dg1chwpuo/image/upload/v1764812493/62379ef0-5edf-4882-a4f5-9eac99705dc9_lpbvcj.jpg",
      title: "Our Unit Maintenance",
      location: "Batara Plant Workshop",
      alt: "Plant Maintenance",
    },
    {
      imageSrc:
        "https://res.cloudinary.com/dg1chwpuo/image/upload/v1764664824/IMG_8466_gcbbvh.jpg",
      title: "Equipment Fleet",
      location: "Heavy Machinery",
      alt: "Equipment Fleet",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-24 relative border-b border-gray-800">
      {/* Background Gradient Circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#1FBFB8]/10 to-transparent rounded-full -mr-48 -mt-48"></div>

      {/* Section Content */}
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            <span className="relative z-10 text-white">Project Gallery</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0"></span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Images from our mining and transportation operations
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full reveal-project ...">
          {galleryItems.map((item, index) => (
            <GalleryItem
              key={index}
              imageSrc={item.imageSrc}
              title={item.title}
              location={item.location}
              alt={item.alt}
            />
          ))}
        </div>

        {/* See More Button */}
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
