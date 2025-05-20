"use client";

import React from "react";
import Image from "next/image";

interface LocationCardProps {
  type: "office" | "operation";
  title: string;
  location: string;
  address: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  type,
  title,
  location,
  address,
}) => {
  const iconSrc =
    type === "office" ? "/svg/office.svg" : "/svg/excaorange.svg";

  return (
    <div className="flex items-start gap-4 bg-[#1a1a1a]/50 p-6 rounded-lg border border-gray-700 hover:border-[#1FBFB8]/40 transition-all">
      <div className="w-12 h-12 relative">
        <Image
          src={iconSrc}
          alt={`${type} icon`}
          fill
          className="object-contain"
        />
      </div>
      <div>
        <h4 className="text-white font-semibold text-lg">{title}</h4>
        <p className="text-sm text-gray-400">{location}</p>
        <p className="text-sm text-gray-500 mt-1">{address}</p>
      </div>
    </div>
  );
};

export default LocationCard;
