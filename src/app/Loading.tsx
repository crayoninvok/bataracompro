// Loading.tsx
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="w-56 h-56 relative mb-8">
        {/* Mining truck animation */}
        <div className="absolute w-full h-full">
          <div className="relative w-40 h-24 mx-auto mt-12 bg-[#1a1a1a] rounded-sm shadow-lg animate-bounce-slow">
            {/* Truck body */}
            <div className="absolute bottom-0 w-full h-5 bg-[#E85C23] rounded-b-sm"></div>
            <div className="absolute left-0 top-0 w-12 h-10 bg-[#1FBFB8] rounded-t-sm"></div>
            
            {/* Wheels */}
            <div className="absolute -bottom-4 left-4 w-8 h-8 bg-gray-800 rounded-full border-4 border-gray-600 animate-spin-slow"></div>
            <div className="absolute -bottom-4 right-4 w-8 h-8 bg-gray-800 rounded-full border-4 border-gray-600 animate-spin-slow"></div>
            
            {/* Truck bed with animated coal */}
            <div className="absolute top-2 right-2 w-20 h-16 bg-[#222] rounded-sm overflow-hidden">
              <div className="absolute bottom-0 w-full h-6 bg-[#333] rounded-sm"></div>
              <div className="absolute bottom-4 left-2 w-4 h-4 bg-[#444] rounded-full animate-pulse"></div>
              <div className="absolute bottom-3 left-8 w-5 h-5 bg-[#444] rounded-full animate-pulse delay-150"></div>
              <div className="absolute bottom-5 right-3 w-3 h-3 bg-[#444] rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>

        {/* Ground with mining elements */}
        <div className="absolute bottom-4 w-full">
          <div className="h-4 bg-[#333] rounded-lg"></div>
          <div className="absolute -top-6 left-10 w-6 h-6 bg-[#E85C23] opacity-70 rounded-full animate-pulse"></div>
          <div className="absolute -top-4 right-12 w-4 h-4 bg-[#1FBFB8] opacity-70 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>

      {/* Company name and loading text */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#E85C23] to-[#1FBFB8] bg-clip-text text-transparent">
          PT. Batara Dharma Persada
        </h1>
        <div className="flex items-center justify-center text-gray-300 text-xl">
          <span>Loading</span>
          <span className="ml-1 animate-bounce-dots">.</span>
          <span className="ml-1 animate-bounce-dots animation-delay-300">.</span>
          <span className="ml-1 animate-bounce-dots animation-delay-600">.</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;