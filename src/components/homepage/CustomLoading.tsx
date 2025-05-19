"use client";

import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

function CustomLoading() {
  const rotation = useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    config: { duration: 4000 },
    loop: true
  });

  const fadeInLeft = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 500 }
  });

  const fadeInTopRight = useSpring({
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
    config: { duration: 500 },
    delay: 300
  });

  const fadeInBottomRight = useSpring({
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
    config: { duration: 500 },
    delay: 600
  });

  const logoFade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 800,
    config: { duration: 500 }
  });

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32">
        <animated.div 
          className="relative w-full h-full"
          style={rotation}
        >
          {/* Orange part (left vertical) */}
          <animated.div
            className="absolute w-6 sm:w-8 h-full bg-[#E85C23] rounded-md"
            style={fadeInLeft}
          />

          {/* Teal part (top right curve) */}
          <animated.div
            className="absolute right-0 top-0 w-16 sm:w-20 h-12 sm:h-16 bg-[#1FBFB8] rounded-tr-full rounded-bl-full"
            style={fadeInTopRight}
          />

          {/* Gray part (bottom right curve) */}
          <animated.div
            className="absolute right-0 bottom-0 w-16 sm:w-20 h-12 sm:h-16 bg-[#5B5B5F] rounded-br-full rounded-tl-full"
            style={fadeInBottomRight}
          />

          {/* Logo in center */}
          <animated.div 
            className="absolute inset-0 flex items-center justify-center"
            style={logoFade}
          >
            <img 
              src="/nobgbtr.png" 
              alt="Logo" 
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />
          </animated.div>
        </animated.div>
      </div>
    </div>
  );
}

export default CustomLoading;