"use client";

import React, { useState } from "react";
import Image from "next/image";

interface OrgNodeProps {
  title: string;
  name?: string;
  photoUrl?: string;
  description?: string;
  children?: React.ReactNode;
}

export const OrgNode: React.FC<OrgNodeProps> = ({
  title,
  name,
  photoUrl,
  description,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-center p-2">
      {/* Node */}
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer inline-block border border-gray-700 bg-gray-900/70 text-white px-4 py-3 rounded shadow-md min-w-[180px] hover:bg-gray-800 transition-colors backdrop-blur"
      >
        <div className="font-semibold text-sm">{title}</div>
        {name && <div className="text-xs text-[#1FBFB8] mt-1">{name}</div>}
      </div>

      {/* Child nodes */}
      {children && (
        <div className="mt-4 flex justify-center gap-4 flex-wrap border-l border-gray-700 pl-4">
          {children}
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>

            {photoUrl && (
              <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden border-4 border-[#E85C23]">
                <Image
                  src={photoUrl}
                  alt={name || "Photo"}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <h2 className="text-lg font-bold text-center mb-1">{name}</h2>
            <p className="text-sm text-center text-gray-700">{title}</p>
            {description && (
              <p className="text-sm text-center text-gray-600 mt-4">{description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
