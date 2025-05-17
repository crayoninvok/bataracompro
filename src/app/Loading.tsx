"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32">
        {/* Orange part (left vertical) */}
        <motion.div
          className="absolute w-6 sm:w-8 h-full bg-[#E85C23] rounded-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
          }}
        />

        {/* Teal part (top right curve) */}
        <motion.div
          className="absolute right-0 top-0 w-16 sm:w-20 h-12 sm:h-16 bg-[#1FBFB8] rounded-tr-full rounded-bl-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { delay: 0.3, duration: 0.5 },
          }}
        />

        {/* Gray part (bottom right curve) */}
        <motion.div
          className="absolute right-0 bottom-0 w-16 sm:w-20 h-12 sm:h-16 bg-gray-600 rounded-br-full rounded-tl-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { delay: 0.6, duration: 0.5 },
          }}
        />

        {/* Pulsing animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [0.95, 1, 0.95],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="absolute bottom-16 text-white text-lg font-medium"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.8, duration: 0.5 },
        }}
      >
        <div className="flex items-center">
          <span>Loading</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="ml-1"
          >
            ...
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
