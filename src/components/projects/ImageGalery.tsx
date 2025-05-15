// ImageGallery.jsx
import React from "react";
import Image from "next/image";

export default function ImageGallery() {
  const galleryItems = [
    {
      imageSrc: "https://res.cloudinary.com/dysmj8esf/image/upload/v1747207936/DJI_0671_waz5wb.jpg",
      title: "Mining Operations",
      location: "Tabang, East Kalimantan",
      alt: "Mining Operations Pitstop"
    },
    {
      imageSrc: "https://res.cloudinary.com/dysmj8esf/image/upload/v1747208321/IMG_0003_t168bm.jpg",
      title: "Coal Transportation",
      location: "Hauling Operations",
      alt: "Coal Transportation"
    },
    {
      imageSrc: "https://res.cloudinary.com/dysmj8esf/image/upload/v1747208062/IMG20241231091819_mktl7d.jpg",
      title: "Equipment Fleet",
      location: "Heavy Machinery",
      alt: "Equipment Fleet"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-24 relative border-b border-gray-800">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#1FBFB8]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            <span className="relative z-10 text-white">Project Gallery</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0"></span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Images from our mining and transportation operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-project opacity-0 translate-y-6 transition-all duration-700">
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
      </div>
    </section>
  );
}

// Import GalleryItem component
import GalleryItem from './GaleryItem';