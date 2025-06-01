// GalleryItem.tsx
import React from "react";
import Image from "next/image";

interface GalleryItemProps {
  imageSrc: string;
  title: string;
  location: string;
  alt: string;
}

export default function GalleryItem({ imageSrc, title, location, alt }: GalleryItemProps): React.ReactNode {
  return (
    <div className="group relative rounded-lg shadow-lg border border-gray-800 h-64 md:h-80">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-300">{location}</p>
      </div>
    </div>
  );
}