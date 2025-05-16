"use client";

import React, { useState } from "react";

interface OrgNodeProps {
  title: string;
  name: string;
  color?: string;
  photoUrl?: string;
  description?: string;
}

const OrgNode: React.FC<OrgNodeProps> = ({ 
  title, 
  name, 
  color = "#FF6B35", 
  photoUrl = "/api/placeholder/120/120",
  description = "No additional information available."
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="inline-block">
      <div 
        className="bg-[#181818] rounded-md px-6 py-4 shadow-lg min-w-[240px] border-l-4 cursor-pointer transition-all hover:shadow-xl hover:translate-y-[-2px]" 
        style={{ borderLeftColor: color }}
        onClick={() => setIsOpen(true)}
      >
        <div className="text-xl font-medium" style={{ color }}>
          {name}
        </div>
        <div className="text-white text-sm italic mt-1">{title}</div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 mb-4" style={{ borderColor: color }}>
                <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
              </div>
              
              <h2 className="text-2xl font-bold mb-1" style={{ color: "#181818" }}>{name}</h2>
              <p className="text-gray-700 font-medium mb-4">{title}</p>
              
              <div className="w-16 h-1 mb-4" style={{ backgroundColor: color }}></div>
              
              <div className="text-gray-600">
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgNode;