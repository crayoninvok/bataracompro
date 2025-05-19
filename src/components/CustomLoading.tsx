"use client";

import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/90">
      <div className="relative w-16 h-16 loader">
        <Image
          src="/nobgbtr.png"
          alt="Batara Logo"
          width={32}
          height={32}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <style jsx>{`
        .loader {
          position: relative;
        }

        .loader::before,
        .loader::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 3px solid transparent;
          box-sizing: border-box;
          animation: rotation 1.5s ease-in-out infinite;
        }

        .loader::before {
          border-top-color: #e85c23;
        }

        .loader::after {
          border-bottom-color: #1fbfb8;
          animation-delay: 0.75s;
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
