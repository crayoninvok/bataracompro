// LocationCard.tsx
import React from "react";
import { MapPin, Building, Truck } from "lucide-react";

interface LocationCardProps {
  type: "office" | "operation";
  title: string;
  location: string;
  address: string;
}

export default function LocationCard({ type, title, location, address }: LocationCardProps): React.ReactNode {
  const isOffice = type === "office";
  const accentColor = isOffice ? "[#1FBFB8]" : "[#E85C23]";
  const secondaryColor = isOffice ? "[#E85C23]" : "[#1FBFB8]";
  const Icon = isOffice ? Building : Truck;

  return (
    <div className={`bg-black/40 p-6 rounded-lg border border-gray-800 hover:border-${accentColor} transition-colors group`}>
      <div className="flex items-start">
        <div className={`bg-${accentColor}/20 p-4 rounded-lg mr-4 group-hover:bg-${accentColor}/30 transition-colors`}>
          <Icon className={`w-6 h-6 text-${accentColor}`} />
        </div>
        <div>
          <h4 className={`font-bold text-xl mb-2 text-white group-hover:text-${accentColor} transition-colors`}>{title}</h4>
          <p className="text-gray-300 mb-3 flex items-center">
            <MapPin className={`w-4 h-4 mr-1 text-${secondaryColor}`} />
            {location}
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            {address}
          </p>
        </div>
      </div>
    </div>
  );
}